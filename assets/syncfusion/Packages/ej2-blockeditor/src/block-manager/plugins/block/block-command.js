var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isNullOrUndefined as isNOU, detach } from '@syncfusion/ej2-base';
import { generateUniqueId, decoupleReference, setCursorPosition, getSelectedRange, getAbsoluteOffset, captureSelectionState, convertInlineElementsToContentModels } from '../../../common/utils/index';
import { getBlockModelById, getBlockIndexById, getBlockContentElement, isListTypeBlock, cleanCheckmarkElement, isNonMergableBlock, getAdjacentBlock, getContainerInfo } from '../../../common/utils/block';
import * as constants from '../../../common/constant';
import { actionType, events } from '../../../common/constant';
import { BlockType } from '../../../models/enums';
import { DeletionType } from '../../../common/enums';
import { BlockFactory } from '../../services/block-factory';
import { removeNodesAfterSplit } from '../../../common/utils/dom';
/**
 * Manages all block-related commands in the BlockEditor
 */
var BlockCommand = /** @class */ (function () {
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    function BlockCommand(manager) {
        this.parent = manager;
        this.addEventListener();
    }
    BlockCommand.prototype.addEventListener = function () {
        this.parent.observer.on(constants.ADDBLOCK, this.addBlock, this);
        this.parent.observer.on(constants.DELETEBLOCK, this.deleteBlock, this);
        this.parent.observer.on(constants.DELETEATCURSOR, this.deleteBlockAtCursor, this);
        this.parent.observer.on(constants.SPLITBLOCK, this.splitBlock, this);
        this.parent.observer.on(constants.MOVEBLOCK, this.moveBlock, this);
        this.parent.observer.on(constants.DUPLICATEBLOCK, this.duplicateBlock, this);
        this.parent.observer.on(constants.INDENTBLOCK, this.handleBlockIndentation, this);
        this.parent.observer.on(constants.DELETE_NON_MERGABLEBLOCK, this.deleteNonMergableBlock, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    BlockCommand.prototype.removeEventListener = function () {
        this.parent.observer.off(constants.ADDBLOCK, this.addBlock);
        this.parent.observer.off(constants.DELETEBLOCK, this.deleteBlock);
        this.parent.observer.off(constants.DELETEATCURSOR, this.deleteBlockAtCursor);
        this.parent.observer.off(constants.SPLITBLOCK, this.splitBlock);
        this.parent.observer.off(constants.MOVEBLOCK, this.moveBlock);
        this.parent.observer.off(constants.DUPLICATEBLOCK, this.duplicateBlock);
        this.parent.observer.off(constants.INDENTBLOCK, this.handleBlockIndentation);
        this.parent.observer.off(constants.DELETE_NON_MERGABLEBLOCK, this.deleteNonMergableBlock);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Adds a new block to the editor
     *
     * @param {IAddBlockInteraction} args Options for adding new block
     * @returns {BlockModel} The newly created block model
     * @hidden
     */
    BlockCommand.prototype.addBlock = function (args) {
        var _a = args.isAfter, isAfter = _a === void 0 ? true : _a;
        this.populateTargetModelAndId(args);
        /* Process Model */
        var addedBlock = this.parent.blockService.addBlock({
            block: this.prepareBlock(args),
            targetBlockId: args.targetBlockId,
            isAfter: isAfter
        });
        this.parent.stateManager.updateManagerBlocks();
        this.parent.undoRedoAction.trackBlockAdditionForUndoRedo(args, addedBlock);
        this.parent.observer.notify('modelChanged', {
            type: 'AddBlock',
            state: __assign({}, args, { isAfter: isAfter, addedBlock: addedBlock })
        });
        return addedBlock;
    };
    /**
     * Deletes a block from the editor
     *
     * @param {IDeleteBlockInteraction} args Options for the deletion
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.deleteBlock = function (args) {
        if (!args.blockElement) {
            return;
        }
        var _a = this.parent.blockService.removeBlock({ blockId: args.blockElement.id }), removedBlock = _a.removedBlock, blockIndex = _a.blockIndex;
        this.parent.stateManager.updateManagerBlocks();
        if (!removedBlock) {
            return;
        }
        this.parent.undoRedoAction.trackBlockRemovalForUndoRedo(args, args.blockElement.id, removedBlock, blockIndex);
        this.parent.observer.notify('modelChanged', {
            type: 'DeleteBlock',
            state: __assign({}, args, { removedBlock: removedBlock,
                blockIndex: blockIndex })
        });
        if (!args.preventMinimumOne) {
            this.parent.blockCommand.createDefaultEmptyBlock(true);
        }
    };
    /**
     * Splits the current block at cursor position and creates a new block
     *
     * @param {IAddBlockInteraction} args - Options to split the block
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.splitBlock = function (args) {
        var newBlockContents = [];
        var blockElement = this.parent.currentFocusedBlock;
        var range = this.parent.nodeSelection.getRange();
        var blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        var blockBeforeSplit = decoupleReference(blockModel);
        var currBlockType = blockModel.blockType;
        var contentElement = getBlockContentElement(blockElement);
        var firstNode = contentElement.childNodes[0];
        var isCursorAtStartNode = firstNode
            ? (firstNode.contains(range.startContainer) || firstNode === range.startContainer)
            : (contentElement === range.startContainer);
        var splitOffset = range.startOffset;
        var isSplitAtStart = splitOffset === 0 && isCursorAtStartNode;
        if (!isSplitAtStart) {
            /* Get split fragment for new block */
            var afterFragment = this.parent.nodeCutter.splitContent(getBlockContentElement(blockElement), range.startContainer, range.startOffset).afterFragment;
            /* Split node at cursor and remove everything after the split point */
            this.parent.nodeCutter.getSpliceNode(range, range.startContainer);
            removeNodesAfterSplit(range.startContainer, contentElement);
            var currBlockContents = convertInlineElementsToContentModels(contentElement, true);
            newBlockContents = this.getContentModelForFragment(afterFragment);
            this.parent.blockService.updateContent(blockModel.id, currBlockContents.length > 0 ? currBlockContents : [BlockFactory.createTextContent()]);
            // Trigger content change for event tracking alone, no dom renders
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: blockModel, oldBlock: blockBeforeSplit }],
                    preventEventTrigger: true,
                    excludeDomUpdate: true
                } });
        }
        this.addBlock({
            blockType: isListTypeBlock(currBlockType) ? currBlockType : BlockType.Paragraph,
            isAfter: isSplitAtStart ? false : true,
            targetBlock: this.parent.getBlockElementById(blockElement.id),
            contentModel: newBlockContents,
            splitOffset: splitOffset,
            isSplitting: !isSplitAtStart,
            blockBeforeSplit: blockBeforeSplit,
            preventEventTrigger: args ? args.preventEventTrigger : false
        });
        this.parent.stateManager.updateManagerBlocks();
    };
    /**
     * Deletes block at cursor
     *
     * @param {IDeleteBlockInteraction} args Optional additional arguments
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.deleteBlockAtCursor = function (args) {
        var blockElement = args.blockElement, mergeDirection = args.mergeDirection;
        if (!blockElement) {
            return;
        }
        var editorBlocks = this.parent.getEditorBlocks();
        if (blockElement.getAttribute('data-block-type').startsWith('Collapsible')) {
            this.transformToggleBlocksAsRegular(blockElement);
            return;
        }
        var getAdjacentBlock = function (element, direction) {
            return (direction === 'previous' ? element.previousElementSibling : element.nextElementSibling);
        };
        var adjacentBlock = getAdjacentBlock(blockElement, mergeDirection);
        if (!adjacentBlock) {
            return;
        }
        /*
        sourceBlock - the block that will be deleted after merging its content with the targetBlock
        targetBlock - the block that will remain after merging
        */
        var sourceBlock = mergeDirection === 'previous' ? blockElement : adjacentBlock;
        var targetBlock = mergeDirection === 'previous' ? adjacentBlock : blockElement;
        var sourceBlockModel = getBlockModelById(sourceBlock.id, editorBlocks);
        var targetBlockModel = getBlockModelById(targetBlock.id, editorBlocks);
        var sourceContent = getBlockContentElement(sourceBlock);
        var targetContent = getBlockContentElement(targetBlock);
        var newCursorPos = targetContent.textContent.length;
        var blocksBeforeDelete = [decoupleReference(targetBlockModel), decoupleReference(sourceBlockModel)];
        // Source block is trying to merge into an empty block
        if (targetContent.textContent.trim().length === 0) {
            /* At this point, do not merge Source into Target.
            Instead, simply delete the Empty Target. This approach requires Zero Re-rendering */
            this.deleteBlock(__assign({}, args, { blockElement: targetBlock, isSplitting: false, isTargetDeletion: true }));
            // Update the source model
            var newContents_1 = convertInlineElementsToContentModels(sourceContent, true);
            this.parent.blockService.updateContent(sourceBlockModel.id, newContents_1);
            this.parent.setFocusAndUIForNewBlock(sourceBlock);
            return;
        }
        /* (Fallback to your standard merge logic for non-empty blocks) */
        var targetFragment = document.createDocumentFragment();
        while (sourceContent.firstChild) {
            targetFragment.appendChild(sourceContent.firstChild);
        }
        targetContent.appendChild(targetFragment);
        targetContent.normalize();
        var newContents = convertInlineElementsToContentModels(targetContent, true);
        this.parent.blockService.updateContent(targetBlockModel.id, newContents);
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: targetBlockModel, oldBlock: blocksBeforeDelete[0] }],
                preventEventTrigger: true,
                preventChangesTracking: args.preventChangesTracking,
                excludeDomUpdate: true
            } });
        this.parent.setFocusToBlock(targetBlock);
        setCursorPosition(targetContent, newCursorPos);
        this.parent.togglePlaceholder(targetBlock, true);
        this.parent.floatingIconAction.showFloatingIcons(targetBlock);
        /* Delete source block */
        this.deleteBlock(__assign({}, args, { blockElement: sourceBlock, isSplitting: true, blocksAfterSplit: blocksBeforeDelete, blockBeforeSplit: targetBlockModel, targetBlockModel: targetBlockModel }));
        if (isListTypeBlock(sourceBlockModel.blockType) || isListTypeBlock(targetBlockModel.blockType)) {
            this.parent.listPlugin.recalculateMarkersForListItems();
        }
    };
    /**
     * Deletes non mergable block
     *
     * @param {IDeleteBlockInteraction} args Optional additional arguments
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.deleteNonMergableBlock = function (args) {
        var _a = getContainerInfo(args.blockElement.id, this.parent.getEditorBlocks()), array = _a.array, containerType = _a.containerType;
        if ((containerType === 'cell' || containerType === 'children') && (array && array.length === 1)) {
            this.transformBlock({
                block: getBlockModelById(args.blockElement.id, this.parent.getEditorBlocks()),
                blockElement: args.blockElement,
                newBlockType: BlockType.Paragraph
            });
            return;
        }
        else {
            var adjacentBlockElement = getAdjacentBlock(args.blockElement, 'next')
                || getAdjacentBlock(args.blockElement, 'previous');
            this.deleteBlock(__assign({}, args, { blockElement: args.blockElement }));
            /* When there is only single block in editor, on deletion of it, we should create a default empty paragraph */
            if (!isNOU(adjacentBlockElement)) {
                this.parent.setFocusAndUIForNewBlock(adjacentBlockElement);
            }
            return;
        }
    };
    /**
     * Handles Clipboard paste of bulk blocks in to the editor
     *
     * @param {IAddBulkBlocksInteraction} args Options for the bulk block addition
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.addBulkBlocks = function (args) {
        var blocks = args.blocks, targetBlockId = args.targetBlockId, insertionType = args.insertionType;
        if (blocks.length === 0) {
            this.parent.undoRedoAction.trackClipboardPasteForUndoRedo(args);
            return;
        }
        var insertedBlock;
        for (var i = 0; i < blocks.length; i++) {
            insertedBlock = this.addBlock({
                block: blocks[i],
                targetBlock: this.parent.getBlockElementById(i === 0 ? targetBlockId : insertedBlock.id),
                isUndoRedoAction: true,
                preventEventTrigger: true,
                preventUpdateAction: true,
                forceIgnoreTargetUpdate: true
            });
        }
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.setCursorAfterBulkBlockAddition(insertionType);
        this.parent.undoRedoAction.trackClipboardPasteForUndoRedo(args);
    };
    /**
     * Duplicates a block and inserts it above or below the original
     *
     * @param {Object} args The options to duplicate
     * @param {HTMLElement} args.blockElement The block element to duplicate
     * @param {'below'|'above'} args.direction Direction to insert the duplicated block
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.duplicateBlock = function (args) {
        if (!args.blockElement) {
            return;
        }
        var duplicatedBlock = this.parent.blockService.duplicateBlock({ blockId: args.blockElement.id });
        this.parent.stateManager.updateManagerBlocks();
        if (duplicatedBlock) {
            this.addBlock({
                block: duplicatedBlock,
                targetBlockId: args.blockElement.id,
                isAfter: args.direction === 'below',
                forceIgnoreTargetUpdate: true
            });
        }
    };
    /**
     * Handles the indentation of blocks
     *
     * @param {IIndentOperation} args - The arguments for indenting blocks
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.handleBlockIndentation = function (args) {
        var _this = this;
        var blockIDs = args.blockIDs, shouldDecrease = args.shouldDecrease;
        blockIDs.forEach(function (blockId) {
            var oldBlock = decoupleReference(getBlockModelById(blockId, _this.parent.getEditorBlocks()));
            var updatedBlock = _this.parent.blockService.applyIndentation({
                blockId: blockId,
                shouldDecrease: shouldDecrease
            });
            _this.parent.observer.notify('modelChanged', {
                type: 'IndentBlock',
                state: {
                    blockId: blockId,
                    newIndent: updatedBlock.indent
                }
            });
            _this.parent.eventService.addChange({
                action: 'Update',
                data: {
                    block: updatedBlock,
                    prevBlock: oldBlock
                }
            });
        });
        this.parent.stateManager.updateManagerBlocks();
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.undoRedoAction.trackIndentActionForUndoRedo(args);
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    /**
     * Moves a block or group of blocks to a new position
     *
     * @param {IMoveBlocksInteraction} args Options for moving the block
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.moveBlock = function (args) {
        var _this = this;
        var _a = args.fromBlockIds, fromBlockIds = _a === void 0 ? [] : _a, toBlockId = args.toBlockId, _b = args.isInteracted, isInteracted = _b === void 0 ? true : _b;
        if (fromBlockIds.length === 0 || !toBlockId) {
            return;
        }
        var toBlockElement = this.parent.getBlockElementById(toBlockId);
        if (!toBlockElement) {
            return;
        }
        var allBlocks = Array.from(this.parent.blockContainer.children);
        var fromElements = fromBlockIds
            .map(function (id) { return _this.parent.getBlockElementById(id); })
            .filter(function (el) { return el instanceof HTMLElement; });
        var destination = this.getDestinationBlockDataForMove(toBlockId);
        var toBlockDOM = (destination.toParentBlockModel
            ? allBlocks[destination.toParentBlockIndex].querySelectorAll('.' + constants.BLOCK_CLS)[destination.toBlockIndex]
            : allBlocks[destination.toBlockIndex]);
        var isMovingUp = fromElements[0].getBoundingClientRect().top > toBlockDOM.getBoundingClientRect().top;
        var movedBlocks = this.parent.blockService.moveBlocks({
            blockIds: fromBlockIds,
            toBlockId: toBlockId,
            isMovingUp: isMovingUp
        });
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', {
            type: 'MoveBlock',
            state: {
                movedBlocks: movedBlocks,
                destination: destination,
                fromElements: fromElements,
                isInteracted: isInteracted,
                isMovingUp: isMovingUp,
                toBlockDOM: toBlockDOM
            }
        });
        this.parent.undoRedoAction.trackBlockMoveForUndoRedo(args, movedBlocks, destination.toBlockIndex, destination.toParentBlockModel ? destination.toParentBlockModel.id : '', isMovingUp);
        var selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
        this.parent.updateFocusAndCursor(fromElements.length > 0 ? fromElements[0] : null);
    };
    /**
     * Handles the selective deletion of blocks
     *
     * @param {KeyboardEvent} event The keyboard event
     * @returns {boolean} Whether the event was handled
     * @hidden
     */
    BlockCommand.prototype.handleSelectiveDeletions = function (event) {
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (selectedBlocks && selectedBlocks.length <= 0 || (getSelectedRange() && getSelectedRange().collapsed)) {
            return false;
        }
        this.parent.isEntireEditorSelected = this.parent.nodeSelection.checkIsEntireEditorSelected();
        if (this.parent.isEntireEditorSelected) {
            this.handleEntireBlockDeletion();
            event.preventDefault();
            return true;
        }
        else if (selectedBlocks && selectedBlocks.length > 1) {
            this.handleMultipleBlockDeletion(selectedBlocks, event.key === 'Backspace' ? 'previous' : 'next');
            event.preventDefault();
            return true;
        }
        return false;
    };
    /**
     * Handles the deletion of entire blocks
     *
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.handleEntireBlockDeletion = function () {
        var _this = this;
        var prevFocusedBlockid = this.parent.currentFocusedBlock.id;
        var allBlocks = this.parent.getEditorBlocks().map(function (block) {
            var decoupledBlock = decoupleReference(block);
            _this.parent.eventService.addChange({
                action: 'Deletion',
                data: { block: decoupledBlock }
            });
            return decoupledBlock;
        });
        this.parent.setEditorBlocks([]);
        this.parent.undoRedoAction.pushActionIntoUndoStack({
            action: actionType.multipleBlocksDeleted,
            oldBlockModel: this.createDefaultEmptyBlock(true),
            data: {
                deletedBlocks: allBlocks,
                deletionType: DeletionType.Entire,
                cursorBlockId: prevFocusedBlockid
            }
        });
        this.parent.isEntireEditorSelected = false;
    };
    /**
     * Handles multiple block deletion
     *
     * @param {BlockModel[]} selectedBlocks The selected blocks
     * @param {string} direction The direction of deletion ('previous' or 'next')
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {boolean} Whether the deletion was successful
     * @hidden
     */
    BlockCommand.prototype.handleMultipleBlockDeletion = function (selectedBlocks, direction, isUndoRedoAction) {
        if (direction === void 0) { direction = 'previous'; }
        var prevFocusedBlockid = this.parent.currentFocusedBlock ? this.parent.currentFocusedBlock.id : '';
        var selectedClones = selectedBlocks.map(function (block) { return decoupleReference(block); });
        var firstBlock = selectedBlocks[0];
        var firstBlockIndex = getBlockIndexById(firstBlock.id, this.parent.getEditorBlocks());
        var lastBlock = selectedBlocks[selectedBlocks.length - 1];
        var firstBlockElement = this.parent.getBlockElementById(firstBlock.id);
        var lastBlockElement = this.parent.getBlockElementById(lastBlock.id);
        var range = getSelectedRange();
        if (!range || !firstBlockElement || !lastBlockElement) {
            return false;
        }
        /* Middle blocks */
        for (var i = 1; i < selectedBlocks.length - 1; i++) {
            this.parent.execCommand({ command: 'DeleteBlock', state: {
                    blockElement: this.parent.getBlockElementById(selectedBlocks[parseInt(i.toString(), 10)].id),
                    isUndoRedoAction: true,
                    preventEventTrigger: true
                } });
        }
        // Trim suffix of first block
        var startRange = document.createRange();
        startRange.setStart(range.startContainer, range.startOffset);
        startRange.setEndAfter(getBlockContentElement(firstBlockElement).lastChild);
        startRange.deleteContents(); // Native DOM removal. Identity preserved!
        // Trim prefix of last block
        var endRange = document.createRange();
        endRange.setStartBefore(getBlockContentElement(lastBlockElement).firstChild);
        endRange.setEnd(range.endContainer, range.endOffset);
        endRange.deleteContents();
        /* Merge Last into First */
        this.deleteBlockAtCursor({
            blockElement: direction === 'previous' ? lastBlockElement : firstBlockElement,
            mergeDirection: direction,
            isUndoRedoAction: true,
            preventEventTrigger: true
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        if (!isUndoRedoAction) {
            this.parent.undoRedoAction.pushActionIntoUndoStack({
                action: actionType.multipleBlocksDeleted,
                data: {
                    deletedBlocks: selectedClones,
                    deletionType: DeletionType.Partial,
                    direction: direction,
                    firstBlockIndex: firstBlockIndex,
                    cursorBlockId: prevFocusedBlockid
                }
            });
        }
        return true;
    };
    BlockCommand.prototype.populateTargetModelAndId = function (args) {
        if (!args.targetBlockId && args.targetBlock) {
            args.targetBlockId = args.targetBlock.id;
        }
        if (!args.targetBlock && args.targetBlockId) {
            args.targetBlock = this.parent.getBlockElementById(args.targetBlockId);
        }
        args.targetBlockModel = args.targetBlockId
            ? getBlockModelById(args.targetBlockId, this.parent.getEditorBlocks())
            : null;
    };
    /**
     * Handles block transformation, converting one block type to another
     *
     * @param {string} newBlockType - The new block type to transform to
     * @param {BlockProperties} props - Optional properties for the new block type
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.transformBlocksForSelection = function (newBlockType, props) {
        var range = getSelectedRange();
        var currentRangeLength = range.toString().length;
        var blocksToTransform = this.resolveBlocksToTransform();
        var ignoredTypes = [BlockType.Callout, BlockType.Image, BlockType.Divider, BlockType.Code];
        if (currentRangeLength > 0) {
            this.parent.nodeSelection.saveSelection();
        }
        // Begin batch mode for multiple block transformations
        if (blocksToTransform.length > 1) {
            this.parent.undoRedoAction.beginBatchTransform();
        }
        for (var _i = 0, blocksToTransform_1 = blocksToTransform; _i < blocksToTransform_1.length; _i++) {
            var block = blocksToTransform_1[_i];
            var isIgnored = ignoredTypes.indexOf(block.blockType) !== -1;
            var blockEl = this.parent.getBlockElementById(block.id);
            if (isIgnored) {
                continue;
            }
            var model = getBlockModelById(block.id, this.parent.getEditorBlocks());
            this.handleBlockTransformation({
                block: model,
                blockElement: blockEl,
                newBlockType: newBlockType,
                props: props
            });
        }
        // End batch mode for multiple block transformations
        if (blocksToTransform.length > 1) {
            this.parent.undoRedoAction.endBatchTransform();
        }
        if (currentRangeLength > 0) {
            this.parent.nodeSelection.restoreSelection();
        }
    };
    BlockCommand.prototype.resolveBlocksToTransform = function () {
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        var range = getSelectedRange();
        if (selectedBlocks && selectedBlocks.length > 0) {
            return this.expandSelectedBlocks(selectedBlocks);
        }
        if ((!range) && (!selectedBlocks || selectedBlocks.length === 0)) {
            var cellBlocks = this.getSelectedCellBlocksFromTable();
            if (cellBlocks && cellBlocks.length > 0) {
                return cellBlocks;
            }
        }
        // Fallback: if no selection or range, use the currently focused block
        if (this.parent.currentFocusedBlock) {
            var focusedBlockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
            if (focusedBlockModel) {
                return [focusedBlockModel];
            }
        }
        return [];
    };
    BlockCommand.prototype.expandSelectedBlocks = function (selectedBlocks) {
        var result = [];
        for (var _i = 0, selectedBlocks_1 = selectedBlocks; _i < selectedBlocks_1.length; _i++) {
            var block = selectedBlocks_1[_i];
            if (block.blockType === BlockType.Table) {
                var tableEl = this.parent.getBlockElementById(block.id);
                result.push.apply(result, this.parent.tableSelectionManager.getAllCellBlocks(tableEl));
            }
            else {
                result.push(block);
            }
        }
        return result;
    };
    BlockCommand.prototype.getSelectedCellBlocksFromTable = function () {
        var tableCtx = this.parent.blockRenderer.tableRenderer.resolveTableContext();
        if (tableCtx && tableCtx.tableBlockEl) {
            return this.parent.tableSelectionManager.getSelectedCellBlocks(tableCtx.tableBlockEl);
        }
        return [];
    };
    BlockCommand.prototype.handleBlockTransformation = function (args) {
        var block = args.block, blockElement = args.blockElement, newBlockType = args.newBlockType, isUndoRedoAction = args.isUndoRedoAction;
        var rangePath = this.parent.nodeSelection.getStoredBackupRange();
        this.parent.mentionAction.cleanMentionArtifacts(blockElement, true);
        this.parent.mentionAction.removeMentionQueryKeysFromModel('/', args.isUndoRedoAction);
        var nestedTypes = new Set([BlockType.CollapsibleParagraph, BlockType.CollapsibleHeading,
            BlockType.Callout, BlockType.Quote, BlockType.Table]);
        var specialTypes = new Set([BlockType.Divider, BlockType.Code, BlockType.Image]);
        var nestedSelectors = "." + constants.CALLOUT_BLOCK_CLS + ", ." + constants.TOGGLE_BLOCK_CLS + ", ." + constants.QUOTE_BLOCK_CLS;
        var closestParentEle = blockElement.closest(nestedSelectors);
        var transformedElement = blockElement;
        var doesBlockHasContent = blockElement.textContent.length > 0;
        var nextSiblingOfTransformedEle;
        var isSpecialType = specialTypes.has(newBlockType) || specialTypes.has(block.blockType);
        var isNestedType = nestedTypes.has(newBlockType) || nestedTypes.has(block.blockType);
        // Proceed to add new block rather than transforming current block for below conditions
        if ((isSpecialType || isNestedType) && (doesBlockHasContent || (isNestedType && closestParentEle))) {
            var addedBlock = this.parent.blockCommand.addBlock({
                blockID: isUndoRedoAction ? block.id : '',
                targetBlock: isNestedType ? closestParentEle || blockElement : blockElement,
                blockType: newBlockType,
                properties: args.props,
                preventEventTrigger: true,
                forceIgnoreTargetUpdate: true,
                isUndoRedoAction: isUndoRedoAction
            });
            // Delete the special block dom after adding a block of it's older type
            if (isUndoRedoAction) {
                this.deleteBlock({ blockElement: blockElement, isUndoRedoAction: true });
            }
            transformedElement = this.parent.getBlockElementById(addedBlock.id);
        }
        else {
            cleanCheckmarkElement(blockElement);
            transformedElement = this.transformBlock({
                block: block,
                blockElement: blockElement,
                newBlockType: newBlockType,
                isUndoRedoAction: isUndoRedoAction,
                props: args.props,
                preventEventTrigger: true,
                oldBlockModel: args.oldBlockModel
            });
        }
        // Add a new paragraph block after the transformed block if it is a special type block.
        if ((isSpecialType || isNestedType) && !isUndoRedoAction) {
            var addedBlock = this.parent.blockCommand.addBlock({
                targetBlock: transformedElement,
                blockType: BlockType.Paragraph,
                preventUIUpdate: true,
                preventEventTrigger: true,
                forceIgnoreTargetUpdate: true
            });
            nextSiblingOfTransformedEle = this.parent.getBlockElementById(addedBlock.id);
        }
        var contentElement = getBlockContentElement(transformedElement);
        this.parent.togglePlaceholder(transformedElement, true);
        if (transformedElement.getAttribute('data-block-type') === BlockType.Callout ||
            transformedElement.getAttribute('data-block-type') === BlockType.Quote) {
            this.parent.setFocusToBlock(transformedElement.querySelector('.' + constants.BLOCK_CLS));
        }
        else {
            this.parent.setFocusToBlock(transformedElement);
        }
        if (rangePath && rangePath.endContainer && contentElement) {
            setCursorPosition(contentElement, getAbsoluteOffset(contentElement, rangePath.endContainer, rangePath.endOffset));
        }
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.floatingIconAction.showFloatingIcons(transformedElement);
        if ((newBlockType === BlockType.Divider || newBlockType === BlockType.Image) && nextSiblingOfTransformedEle) {
            this.parent.setFocusAndUIForNewBlock(nextSiblingOfTransformedEle);
        }
        else if (newBlockType === 'Table') {
            var firstCell = transformedElement.querySelector('tbody td:not(.e-row-number)');
            this.parent.tableService.addCellFocus(firstCell, true);
        }
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    /**
     * Transforms an existing block into a different type
     *
     * @param {ITransformBlockInteraction} args options for transforming block
     * @returns {HTMLElement} - The transformed block element
     * @hidden
     */
    BlockCommand.prototype.transformBlock = function (args) {
        this.parent.previousSelection = captureSelectionState();
        var newBlockType = args.newBlockType, isUndoRedoAction = args.isUndoRedoAction, props = args.props, shouldPreventUpdates = args.shouldPreventUpdates, preventEventTrigger = args.preventEventTrigger;
        var block = args.block;
        var oldBlockClone = decoupleReference(block);
        var blockModel = oldBlockClone;
        if (isUndoRedoAction) {
            var isOldBlockTypeNonMergable = isNonMergableBlock(args.blockElement);
            blockModel = isOldBlockTypeNonMergable ? args.oldBlockModel : oldBlockClone;
        }
        block.blockType = newBlockType;
        block.properties = props || {};
        block = this.parent.blockService.updateBlock(block.id, BlockFactory.createBlockFromPartial(__assign({}, blockModel, { blockType: newBlockType, properties: props || {} })));
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'TransformBlock', state: {
                block: block, shouldPreventUpdates: shouldPreventUpdates, oldBlockClone: oldBlockClone, isUndoRedoAction: isUndoRedoAction, preventEventTrigger: preventEventTrigger
            } });
        var newBlockElement = this.parent.getBlockElementById(block.id);
        if (!shouldPreventUpdates) {
            this.parent.setFocusAndUIForNewBlock(newBlockElement);
            this.parent.undoRedoAction.trackBlockTransformForUndoRedo(newBlockElement, block, oldBlockClone, isUndoRedoAction);
        }
        else {
            this.parent.togglePlaceholder(newBlockElement, false);
        }
        return newBlockElement;
    };
    /**
     * Transforms a block to normal paragraph block.
     *
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @param {BlockModel} blockModel - The block model to render.
     * @returns {void}
     * @hidden
     */
    BlockCommand.prototype.transformBlockToParagraph = function (blockElement, blockModel) {
        this.parent.floatingIconAction.showFloatingIcons(this.transformBlock({
            block: blockModel,
            blockElement: blockElement,
            newBlockType: BlockType.Paragraph
        }));
    };
    /**
     * Creates a default empty block
     *
     * @param {boolean} shouldUpdateDom Whether to update the DOM
     * @param {string} blockId Optional block ID to use
     * @returns {BlockModel} The created block model or null
     * @hidden
     */
    BlockCommand.prototype.createDefaultEmptyBlock = function (shouldUpdateDom, blockId) {
        if (this.parent.getEditorBlocks().length === 0) {
            var newBlock = this.prepareBlock({
                blockID: blockId,
                blockType: BlockType.Paragraph,
                contentModel: [BlockFactory.createTextContent()]
            });
            this.parent.setEditorBlocks([newBlock]);
            this.parent.stateManager.updateManagerBlocks();
            if (shouldUpdateDom) {
                this.parent.observer.notify('modelChanged', { type: 'DefaultEmptyBlock' });
            }
            return this.parent.getEditorBlocks()[0];
        }
        return null;
    };
    /**
     * Creates content models from a document fragment
     *
     * @param {DocumentFragment} fragment The document fragment
     * @returns {ContentModel[]} Array of content models
     * @hidden
     */
    BlockCommand.prototype.getContentModelForFragment = function (fragment) {
        var tempContainer = document.createElement('div');
        Array.from(fragment.childNodes).forEach(function (node) {
            tempContainer.appendChild(node.cloneNode(true));
        });
        var newContents = convertInlineElementsToContentModels(tempContainer, true);
        return newContents;
    };
    /**
     * Generates new IDs for the block and its content.
     *
     * @param {string} destinationBlockId The ID of the destination block.
     * @returns {IToBlockData | null} The destination block data or null if not found.
     * @hidden
     */
    BlockCommand.prototype.getDestinationBlockDataForMove = function (destinationBlockId) {
        var editorBlocks = this.parent.getEditorBlocks();
        var toBlockModel = getBlockModelById(destinationBlockId, editorBlocks);
        var toBlockIndex = getBlockIndexById(destinationBlockId, editorBlocks);
        var toParentBlockModel = getBlockModelById(toBlockModel.parentId, editorBlocks);
        var toParentBlockIndex = toParentBlockModel ? getBlockIndexById(toParentBlockModel.id, editorBlocks) : -1;
        return { toBlockModel: toBlockModel, toParentBlockModel: toParentBlockModel, toBlockIndex: toBlockIndex, toParentBlockIndex: toParentBlockIndex };
    };
    /**
     * Creates a new block model based on provided arguments
     *
     * @param {IAddBlockInteraction} args - Options for creating the block
     * @returns {BlockModel} - The new block model
     * @hidden
     */
    BlockCommand.prototype.prepareBlock = function (args) {
        var block = args.block, targetBlockModel = args.targetBlockModel, blockID = args.blockID, blockType = args.blockType, contentModel = args.contentModel, properties = args.properties;
        if (!block) {
            return BlockFactory.createBlockFromPartial({
                id: blockID || generateUniqueId(constants.BLOCK_ID_PREFIX),
                parentId: targetBlockModel ? targetBlockModel.parentId : '',
                blockType: (blockType || BlockType.Paragraph),
                content: (contentModel && contentModel.length > 0) ? contentModel : [BlockFactory.createTextContent()],
                indent: targetBlockModel ? targetBlockModel.indent : 0,
                properties: properties || {}
            });
        }
        if (!args.isUndoRedoAction) {
            this.parent.stateManager.populateUniqueIds([block]);
        }
        return block;
    };
    BlockCommand.prototype.transformToggleBlocksAsRegular = function (blockElement) {
        var editorBlocks = this.parent.getEditorBlocks();
        var block = getBlockModelById(blockElement.id, editorBlocks);
        if (!block || !block.blockType.startsWith('Collapsible')) {
            return;
        }
        var headerContentElement = blockElement.querySelector('.e-toggle-header .e-block-content');
        var toggleContentElement = blockElement.querySelector('.' + constants.TOGGLE_CONTENT_CLS);
        var childBlockElements = toggleContentElement.querySelectorAll('.' + constants.BLOCK_CLS);
        var newType = block.blockType.replace(/^Collapsible/, '');
        var children = block.properties.children;
        block.blockType = newType;
        children.forEach(function (childBlock) {
            if (childBlock) {
                childBlock.parentId = '';
            }
        });
        editorBlocks.splice.apply(editorBlocks, [getBlockIndexById(blockElement.id, editorBlocks) + 1, 0].concat(children));
        block.properties.children = [];
        blockElement.classList.remove('e-toggle-block');
        blockElement.setAttribute('data-block-type', newType);
        blockElement.removeAttribute('data-collapsed');
        var cloneMainBlock = blockElement.cloneNode(false);
        cloneMainBlock.appendChild(headerContentElement);
        blockElement.insertAdjacentElement('afterend', cloneMainBlock);
        childBlockElements.forEach(function (childBlockElement) {
            cloneMainBlock.insertAdjacentElement('afterend', childBlockElement);
        });
        detach(blockElement);
        setCursorPosition(cloneMainBlock, 0);
        this.parent.setFocusToBlock(cloneMainBlock);
        this.parent.stateManager.updateManagerBlocks();
    };
    BlockCommand.prototype.destroy = function () {
        this.removeEventListener();
    };
    return BlockCommand;
}());
export { BlockCommand };
