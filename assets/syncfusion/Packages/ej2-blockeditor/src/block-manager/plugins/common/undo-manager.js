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
import { BlockType, ContentType } from '../../../models/enums';
import { DeletionType } from '../../../common/enums';
import { getAdjacentBlock, getBlockContentElement, getBlockModelById, isNonContentEditableBlock } from '../../../common/utils/block';
import * as constants from '../../../common/constant';
import { actionType } from '../../../common/constant';
import { setCursorPosition } from '../../../common/utils/selection';
import { decoupleReference, findCellById, getDataCell, getTableElements, toDomCol, toDomRow } from '../../../common/index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Manages undo redo actions for the BlockEditor component
 */
var UndoRedoManager = /** @class */ (function () {
    function UndoRedoManager(manager, action) {
        this.parent = manager;
        this.undoRedoAction = action;
    }
    /**
     * Renders the block with the previous state
     *
     * @param {string} blockId - Specifies the block id
     * @param {BlockModel} oldBlock - Specifies the old block model
     * @param {BlockModel} newBlock - Specifies the new block model
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.reRenderWithPreviousState = function (blockId, oldBlock, newBlock) {
        var targetBlockModel = getBlockModelById(blockId, this.parent.getEditorBlocks());
        if (!targetBlockModel) {
            return;
        }
        var blockToReplace = this.undoRedoAction.isUndoing ? oldBlock : newBlock;
        this.parent.blockService.replaceBlock(targetBlockModel.id, blockToReplace);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: blockToReplace, oldBlock: oldBlock }]
            } });
    };
    /**
     * Handles the undo redo for formatting action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.handleFormattingUndoRedo = function (currentState) {
        var _this = this;
        var data = currentState.data;
        // On Redo, restore the contentchange action first and proceed with formatting action(applicable only for format on user typing)
        if (this.undoRedoAction.isRedoing && data.isTypingWithFormat) {
            this.undoRedoAction.applyNextRedoSibling();
        }
        data.blockIDs.forEach(function (blockId) {
            _this.reRenderWithPreviousState(blockId, data.oldBlockModels.find(function (block) { return block.id === blockId; }), data.updatedBlockModels.find(function (block) { return block.id === blockId; }));
        });
        // On Undo, restore the contentchange action after processing formatting action(applicable only for format on user typing)
        if (this.undoRedoAction.isUndoing && data.isTypingWithFormat) {
            this.undoRedoAction.applyNextUndoSibling();
        }
        if (!data.isTypingWithFormat) {
            this.parent.formattingAction.nodeSelection.savedSelectionState = data.selectionState;
            this.parent.formattingAction.nodeSelection.restoreSelection();
            this.parent.setFocusToBlock(this.parent.getBlockElementById(data.selectionState.startBlockId));
        }
    };
    /**
     * Moves the blocks into its original position
     *
     * @param {IMoveBlocksInteraction} args - Specifies the arguments for moving the blocks
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.moveBlocksIntoOriginalPosition = function (args) {
        var _this = this;
        var fromBlockIds = args.fromBlockIds, fromIndex = args.fromIndex, fromParentId = args.fromParentId, toParentId = args.toParentId;
        var editorBlocks = this.parent.getEditorBlocks();
        // Collect current indexes before mutating the array
        var fromEntries = this.parent.blockService.gatherBlocksInfoForMove(fromBlockIds);
        var oldDatas = this.parent.blockService.removeBlocksForMove(fromEntries);
        // Collect the old data models
        oldDatas = fromEntries.slice().reverse()
            .map(function (fromEntry, i) {
            var index = fromIndex[parseInt(i.toString(), 10)];
            var parent = getBlockModelById(fromParentId[parseInt(i.toString(), 10)], editorBlocks);
            return __assign({}, fromEntry, { index: index, parent: parent });
        });
        var targetId = '';
        // insert in its old position
        for (var _i = 0, oldDatas_1 = oldDatas; _i < oldDatas_1.length; _i++) {
            var entry = oldDatas_1[_i];
            var entryModel = entry.model, index = entry.index, parent_1 = entry.parent;
            var insertToArray = parent_1 ? parent_1.properties.children : editorBlocks;
            if (targetId === '') {
                // to get the correct target id for the moved blocks.
                var targetBlockModel = insertToArray[args.isMovedUp ? index - 1 : index];
                targetId = targetBlockModel.id;
            }
            entryModel.parentId = parent_1 ? parent_1.id : '';
            insertToArray.splice(index, 0, entryModel);
        }
        this.parent.stateManager.updateManagerBlocks();
        oldDatas.forEach(function (data) {
            var prevParent = fromEntries.find(function (fromModel) { return fromModel.parent !== null; });
            var currParent = getBlockModelById(data.model.parentId, editorBlocks);
            _this.parent.eventService.addChange({
                action: 'Moved',
                data: {
                    block: data.model,
                    targetId: targetId,
                    isMovingUp: !args.isMovedUp,
                    prevParent: prevParent ? prevParent.model : undefined,
                    currentParent: currParent ? currParent : undefined
                }
            });
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        // DOM updates
        for (var _a = 0, _b = args.isMovedUp ? oldDatas.reverse() : oldDatas; _a < _b.length; _a++) {
            var entry = _b[_a];
            var blockId = entry.blockId, index = entry.index, parent_2 = entry.parent;
            var fromElement = this.parent.blockContainer.querySelector("#" + blockId);
            var allBlocks = Array.from(this.parent.blockContainer.children);
            // should reduce index only when any block is moved into a special block or last child block is moved outside from a special block (Callout, Toggle)
            var shouldReduceIndex = parent_2
                ? parent_2.properties.children[(parent_2.properties
                    .children.length - 1)].id === blockId
                : toParentId !== '';
            var indexVal = shouldReduceIndex ? index - 1 : index;
            var parentElement = (parent_2 ? this.parent.blockContainer.querySelector("#" + parent_2.id) : null);
            var toBlockDOM = (parent_2
                ? parentElement.querySelectorAll('.' + constants.BLOCK_CLS)[parseInt(indexVal.toString(), 10)]
                : allBlocks[parseInt(indexVal.toString(), 10)]);
            var wrapperClassName = '';
            if (parent_2) {
                switch (parent_2.blockType) {
                    case BlockType.Callout:
                        wrapperClassName = '.' + constants.CALLOUT_CONTENT_CLS;
                        break;
                    case BlockType.Quote:
                        wrapperClassName = '.' + constants.QUOTE_CONTENT_CLS;
                        break;
                    default:
                        if (parent_2.blockType.toString().startsWith('Collapsible')) {
                            wrapperClassName = '.' + constants.TOGGLE_CONTENT_CLS;
                        }
                        break;
                }
            }
            var wrapperElement = wrapperClassName
                ? parentElement.querySelector(wrapperClassName)
                : this.parent.blockContainer;
            var targetToInsert = void 0;
            if (!args.isMovedUp) {
                targetToInsert = (shouldReduceIndex
                    ? (toBlockDOM ? toBlockDOM.nextElementSibling : toBlockDOM)
                    : toBlockDOM);
            }
            else {
                targetToInsert = (toBlockDOM ? toBlockDOM.nextElementSibling : toBlockDOM);
            }
            wrapperElement.insertBefore(fromElement, targetToInsert);
        }
        var blockIdToFocus = fromBlockIds[0];
        var blockElementToFocus = this.parent.getBlockElementById(blockIdToFocus);
        this.parent.updateFocusAndCursor(blockElementToFocus);
    };
    /**
     * Handles the block movement undo redo action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.handleBlockMovement = function (currentState) {
        var moveData = currentState.data;
        var moveBlockArgs = {
            fromBlockIds: moveData.blockIds,
            fromIndex: moveData.fromIndex,
            toBlockId: moveData.toBlockId,
            toIndex: moveData.toIndex,
            fromParentId: moveData.fromParentId,
            toParentId: moveData.toParentId,
            isUndoRedoAction: true,
            isMovedUp: moveData.isMovedUp
        };
        if (this.undoRedoAction.isUndoing) {
            this.moveBlocksIntoOriginalPosition(moveBlockArgs);
        }
        else {
            this.parent.execCommand({ command: 'MoveBlock', state: moveBlockArgs });
        }
    };
    /**
     * Re-transforms the block with the previous state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.reTransformBlocks = function (currentState) {
        var transformedData = currentState.data;
        if (!transformedData) {
            return;
        }
        var currentBlockModel = transformedData.blockId
            ? getBlockModelById(transformedData.blockId, this.parent.getEditorBlocks()) : null;
        var storedBlockModel = this.undoRedoAction.isUndoing
            ? transformedData.oldBlockModel : transformedData.newBlockModel;
        var blockElement = this.parent.blockContainer.querySelector("#" + transformedData.blockId);
        var newBlockType = this.undoRedoAction.isUndoing
            ? transformedData.oldBlockModel.blockType : transformedData.newBlockModel.blockType;
        this.parent.blockCommand.handleBlockTransformation({
            block: currentBlockModel,
            blockElement: blockElement,
            newBlockType: newBlockType,
            isUndoRedoAction: true,
            props: storedBlockModel.properties,
            oldBlockModel: storedBlockModel
        });
    };
    /**
     * Handles undo/redo action for image insertion (placeholder → uploaded image)
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.handleImageInsertion = function (currentState) {
        var imageData = currentState.data;
        if (!imageData) {
            return;
        }
        var blockId = imageData.blockId;
        var blockElement = this.parent.blockContainer.querySelector("#" + blockId);
        if (!blockElement) {
            return;
        }
        // replace the block model in the editor
        this.parent.blockService.replaceBlock(blockId, this.undoRedoAction.isUndoing ? imageData.oldBlockModel : imageData.newBlockModel);
        this.parent.stateManager.updateManagerBlocks();
        // Re-render the block content to reflect the model change
        this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                targetBlockId: blockId,
                block: this.undoRedoAction.isUndoing ? imageData.oldBlockModel : imageData.newBlockModel,
                oldBlock: this.undoRedoAction.isUndoing ? imageData.newBlockModel : imageData.oldBlockModel
            } });
        // Set focus to the block
        this.parent.setFocusToBlock(blockElement);
    };
    /**
     * Handles undo redo action for multiple block transformations
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.reTransformMultipleBlocks = function (currentState) {
        var multiTransformData = currentState.data;
        if (!multiTransformData || !multiTransformData.transformedBlocks || multiTransformData.transformedBlocks.length === 0) {
            return;
        }
        // Prevent individual undo tracking during batch redo
        this.undoRedoAction.beginBatchTransform();
        for (var _i = 0, _a = multiTransformData.transformedBlocks; _i < _a.length; _i++) {
            var transform = _a[_i];
            var currentBlockModel = getBlockModelById(transform.blockId, this.parent.getEditorBlocks());
            var storedBlockModel = this.undoRedoAction.isUndoing
                ? transform.oldBlockModel : transform.newBlockModel;
            var blockElement = this.parent.blockContainer.querySelector("#" + transform.blockId);
            var newBlockType = this.undoRedoAction.isUndoing
                ? transform.oldBlockModel.blockType : transform.newBlockModel.blockType;
            if (currentBlockModel && blockElement) {
                this.parent.blockCommand.handleBlockTransformation({
                    block: currentBlockModel,
                    blockElement: blockElement,
                    newBlockType: newBlockType,
                    isUndoRedoAction: true,
                    props: storedBlockModel.properties,
                    oldBlockModel: storedBlockModel
                });
            }
        }
        // End batch mode without pushing to undo stack
        this.undoRedoAction.endBatchTransform();
    };
    /**
     * Handles undo redo action for multiple block deletions
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.handleMultipleBlocksUndoRedo = function (currentState) {
        if (this.undoRedoAction.isUndoing) {
            this.restoreDeletedBlocks(currentState);
        }
        else if (this.undoRedoAction.isRedoing) {
            this.reDeleteBlocks(currentState);
        }
    };
    UndoRedoManager.prototype.restoreDeletedBlocks = function (state) {
        var _this = this;
        var data = state.data;
        if (data.deletionType === DeletionType.Entire) {
            this.restoreEntireEditor(data.deletedBlocks);
            setTimeout(function () {
                _this.parent.editorMethods.selectAllBlocks();
            });
        }
        else if (data.deletionType === DeletionType.Partial) {
            this.restorePartialDeletion(state);
        }
        this.parent.stateManager.updateManagerBlocks();
    };
    UndoRedoManager.prototype.restoreEntireEditor = function (deletedBlocks) {
        this.parent.setEditorBlocks(deletedBlocks);
        this.parent.blockContainer.innerHTML = '';
        this.parent.blockRenderer.renderBlocks(deletedBlocks);
    };
    UndoRedoManager.prototype.restorePartialDeletion = function (state) {
        var _a = state.data, deletedBlocks = _a.deletedBlocks, firstBlockIndex = _a.firstBlockIndex;
        if (!deletedBlocks.length) {
            return;
        }
        var firstBlock = deletedBlocks[0], middleBlocks = deletedBlocks.slice(1);
        var lastBlock = middleBlocks.pop();
        var firstBlockParent = getBlockModelById(firstBlock.parentId, this.parent.getEditorBlocks())
            || findCellById(firstBlock.parentId, this.parent.getEditorBlocks());
        var targetIndex = (firstBlockIndex - 1) >= 0 ? (firstBlockIndex - 1) : 0;
        var targetBlockElement = this.parent.blockContainer.children[targetIndex];
        if (firstBlockParent) {
            var childBlocks = this.parent.getBlockElementById(firstBlockParent.id).querySelectorAll('.' + constants.BLOCK_CLS);
            targetBlockElement = childBlocks[targetIndex];
        }
        var firstBlockElement = this.restoreSingleBlock(firstBlock, firstBlockIndex, targetBlockElement, true);
        this.restoreSingleBlock(lastBlock, firstBlockIndex + 1, firstBlockElement);
        if (middleBlocks.length) {
            this.restoreMiddleBlocks(middleBlocks, firstBlockElement);
        }
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    UndoRedoManager.prototype.restoreSingleBlock = function (block, insertIndex, targetElement, isFirstBlock) {
        var editorBlocks = this.parent.getEditorBlocks();
        var blockElement = this.parent.getBlockElementById(block.id);
        var parent = getBlockModelById(block.parentId, editorBlocks);
        var tableParent = findCellById(block.parentId, editorBlocks);
        var deleteCount = isFirstBlock ? 1 : 0;
        var insertArray = parent
            ? parent.properties.children
            : (tableParent ? tableParent.blocks : editorBlocks);
        insertArray.splice(insertIndex, deleteCount, decoupleReference(block));
        if (blockElement) {
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: block }],
                    preventEventTrigger: true
                } });
            return blockElement;
        }
        this.parent.eventService.addChange({
            action: 'Insertion',
            data: { block: block }
        });
        blockElement = this.parent.blockRenderer.createBlockElement(block);
        this.parent.togglePlaceholder(blockElement, false);
        if (targetElement) {
            targetElement.insertAdjacentElement(insertIndex === 0 ? 'beforebegin' : 'afterend', blockElement);
        }
        return blockElement;
    };
    UndoRedoManager.prototype.restoreMiddleBlocks = function (middleBlocks, targetElement) {
        var currentInsertionPoint = targetElement;
        for (var _i = 0, middleBlocks_1 = middleBlocks; _i < middleBlocks_1.length; _i++) {
            var block = middleBlocks_1[_i];
            this.parent.execCommand({ command: 'AddBlock', state: {
                    block: block,
                    targetBlock: currentInsertionPoint,
                    isUndoRedoAction: true,
                    preventEventTrigger: true
                } });
            currentInsertionPoint = this.parent.getBlockElementById(block.id);
            this.parent.togglePlaceholder(currentInsertionPoint, false);
        }
    };
    UndoRedoManager.prototype.reDeleteBlocks = function (state) {
        var data = state.data;
        if (data.deletionType === DeletionType.Entire) {
            this.parent.setEditorBlocks([]);
            this.parent.blockCommand.createDefaultEmptyBlock(true, state.oldBlockModel ? state.oldBlockModel.id : '');
        }
        else if (data.deletionType === DeletionType.Partial) {
            var blocksToDelete = [];
            for (var i = 0; i < data.deletedBlocks.length; i++) {
                var block = data.deletedBlocks[i];
                var currentBlockModel = getBlockModelById(block.id, this.parent.getEditorBlocks());
                if (currentBlockModel) {
                    blocksToDelete.push(currentBlockModel);
                }
            }
            if (blocksToDelete.length > 0) {
                this.undoRedoAction.restoreSelectionState(state);
                this.parent.blockCommand.handleMultipleBlockDeletion(blocksToDelete, data.direction || 'previous', true);
            }
        }
    };
    /**
     * Handles the clipboard undo redo action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.handleClipboardActions = function (currentState) {
        if (this.undoRedoAction.isUndoing) {
            this.handleClipboardUndo(currentState);
        }
        else {
            this.handleClipboardRedo(currentState);
        }
    };
    /**
     * Applies a table row action for undo/redo.
     * Decides whether to insert or delete a row based on action intent and current undo/redo phase.
     * When apply is 'insert':
     *  - Undo => perform delete
     *  - Redo => perform insert
     * When apply is 'delete':
     *  - Undo => perform insert
     *  - Redo => perform delete
     *
     * @param { ITableRowInsertOptions } data Payload that includes blockId, rowIndex and optional rowModel
     * @param { string } apply Indicates target action recorded in the stack ('insert' | 'delete')
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.processRowAction = function (data, apply) {
        var shouldInsert = (apply === 'insert' && !this.undoRedoAction.isUndoing)
            || (apply === 'delete' && this.undoRedoAction.isUndoing);
        if (shouldInsert) {
            this.parent.tableService.addRowAt({
                blockId: data.blockId,
                rowIndex: data.rowIndex,
                rowModel: data.rowModel,
                isUndoRedoAction: true
            });
        }
        else {
            this.parent.tableService.deleteRowAt({
                blockId: data.blockId,
                modelIndex: data.rowIndex,
                isUndoRedoAction: true
            });
        }
    };
    /**
     * Applies a table column action for undo/redo.
     * Decides whether to insert or delete a column based on action intent and current undo/redo phase.
     * When apply is 'insert':
     *  - Undo => perform delete
     *  - Redo => perform insert
     * When apply is 'delete':
     *  - Undo => perform insert
     *  - Redo => perform delete
     *
     * @param { ITableColumnInsertOptions } data Payload that includes blockId, colIndex and optional columnModel
     * @param { string } apply Indicates target action recorded in the stack ('insert' | 'delete')
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.processColumnAction = function (data, apply) {
        var shouldInsert = (apply === 'insert' && !this.undoRedoAction.isUndoing)
            || (apply === 'delete' && this.undoRedoAction.isUndoing);
        if (shouldInsert) {
            this.parent.tableService.addColumnAt({
                blockId: data.blockId,
                colIndex: data.colIndex,
                columnModel: data.columnModel,
                columnCells: data.columnCells,
                isUndoRedoAction: true
            });
        }
        else {
            this.parent.tableService.deleteColumnAt({
                blockId: data.blockId,
                colIndex: data.colIndex,
                isUndoRedoAction: true
            });
        }
    };
    /**
     * Handles undo/redo for table cell clearing.
     * On undo: restores each affected cell's previous blocks.
     * On redo: clears the blocks for each affected cell.
     *
     * @param { IUndoRedoState } state that contains blockId and a list of cells with previous blocks
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.handleTableCellsCleared = function (state) {
        var _this = this;
        var data = state.data;
        var ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        var table = ctx.table;
        var oldBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        var mode = this.undoRedoAction.isUndoing ? 'restore' : 'clear';
        data.cells.forEach(function (cell) { return _this.parent.tableService.applyCellChange(table, cell, mode); });
        var updatedBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        this.parent.tableService.triggerBlockUpdate(updatedBlock, oldBlock);
        var blockId = data.blockId;
        var blockEle = this.parent.getBlockElementById(blockId);
        if (blockEle) {
            this.parent.selectionOverlay.show(blockId);
            if (this.parent.nodeSelection) {
                this.parent.nodeSelection.clearSelection();
            }
        }
    };
    UndoRedoManager.prototype.handleTableCellsPasted = function (state) {
        var _this = this;
        var data = state.data;
        var ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        var table = ctx.table, props = ctx.props;
        var oldBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        var applyBlocks = function (useNew) {
            data.cells.forEach(function (cell) {
                var blocks = useNew ? cell.newBlocks : cell.oldBlocks;
                _this.parent.tableService.setCellBlocks(table, cell.dataRow, cell.dataCol, blocks);
            });
        };
        if (this.undoRedoAction.isUndoing) {
            // Remove structure added on paste
            if (data.structureDelta) {
                if (data.structureDelta.colsAdded && data.structureDelta.colsAdded.length) {
                    data.structureDelta.colsAdded.slice().sort(function (a, b) { return b - a; }).forEach(function (c) {
                        _this.parent.tableService.deleteColumnAt({ blockId: data.blockId, colIndex: c, isUndoRedoAction: true });
                    });
                }
                if (data.structureDelta.rowsAdded && data.structureDelta.rowsAdded.length) {
                    data.structureDelta.rowsAdded.slice().sort(function (a, b) { return b - a; }).forEach(function (r) {
                        _this.parent.tableService.deleteRowAt({ blockId: data.blockId, modelIndex: r, isUndoRedoAction: true });
                    });
                }
            }
            applyBlocks(false);
        }
        else {
            // Rebuild structure before reapplying new blocks
            if (data.structureDelta) {
                if (data.structureDelta.rowsAdded && data.structureDelta.rowsAdded.length) {
                    data.structureDelta.rowsAdded.slice().sort(function (a, b) { return a - b; }).forEach(function (r) {
                        _this.parent.tableService.addRowAt({ blockId: data.blockId, rowIndex: r, isUndoRedoAction: true });
                    });
                }
                if (data.structureDelta.colsAdded && data.structureDelta.colsAdded.length) {
                    data.structureDelta.colsAdded.slice().sort(function (a, b) { return a - b; }).forEach(function (c) {
                        _this.parent.tableService.addColumnAt({ blockId: data.blockId, colIndex: c, isUndoRedoAction: true });
                    });
                }
            }
            applyBlocks(true);
        }
        // Restore cell focus to first cell
        if (data.cells[0]) {
            var cellToFocus = getDataCell(table, toDomRow(data.cells[0].dataRow, props.enableHeader), data.cells[0].dataCol);
            this.parent.tableService.removeCellFocus(table);
            this.parent.tableService.addCellFocus(cellToFocus, true);
        }
        var updatedBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        this.parent.tableService.triggerBlockUpdate(updatedBlock, oldBlock);
    };
    UndoRedoManager.prototype.handleBulkRowsDeleted = function (currentState) {
        var _this = this;
        var data = currentState.data;
        var ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        if (this.undoRedoAction.isUndoing) {
            // Re-insert rows at their original indices (ascending)
            data.rows.slice().sort(function (a, b) { return a.index - b.index; }).forEach(function (r) {
                _this.parent.tableService.addRowAt({
                    blockId: data.blockId,
                    rowIndex: r.index,
                    rowModel: r.rowModel,
                    isUndoRedoAction: true
                });
            });
        }
        else {
            // Re-delete rows (descending DOM order)
            data.rows.slice().sort(function (a, b) { return b.index - a.index; }).forEach(function (r) {
                _this.parent.tableService.deleteRowAt({
                    blockId: data.blockId,
                    modelIndex: r.index,
                    isUndoRedoAction: true
                });
            });
        }
    };
    UndoRedoManager.prototype.handleBulkColumnsDeleted = function (currentState) {
        var _this = this;
        var data = currentState.data;
        var ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        if (this.undoRedoAction.isUndoing) {
            // Re-insert columns (ascending index)
            data.cols.slice().sort(function (a, b) { return a.index - b.index; }).forEach(function (c) {
                _this.parent.tableService.addColumnAt({
                    blockId: data.blockId,
                    colIndex: c.index,
                    columnModel: c.columnModel,
                    columnCells: c.columnCells,
                    isUndoRedoAction: true
                });
            });
        }
        else {
            // Re-delete columns (descending index)
            data.cols.slice().sort(function (a, b) { return b.index - a.index; }).forEach(function (c) {
                _this.parent.tableService.deleteColumnAt({
                    blockId: data.blockId,
                    colIndex: c.index,
                    isUndoRedoAction: true
                });
            });
        }
    };
    UndoRedoManager.prototype.handleTableHeaderUndoRedo = function (state) {
        var data = state.data;
        var blockModel = getBlockModelById(data.blockId, this.parent.getEditorBlocks());
        if (!blockModel) {
            return;
        }
        var blockElement = this.parent.getBlockElementById(blockModel.id);
        var props = blockModel.properties;
        var tableHeaders = blockElement.querySelectorAll('thead th:not(.e-row-number)');
        var columnsToReplace = this.undoRedoAction.isUndoing ? data.oldColumns : data.updatedColumns;
        tableHeaders.forEach(function (headerElement) {
            var colIndex = parseInt(headerElement.getAttribute('data-col'), 10);
            var textToUpdate = columnsToReplace[colIndex].headerText;
            //DOM and Model
            headerElement.textContent = props.columns[colIndex].headerText = textToUpdate;
        });
    };
    UndoRedoManager.prototype.handleTableColumnResized = function (state) {
        var data = state.data;
        var blockModel = getBlockModelById(data.blockId, this.parent.getEditorBlocks());
        if (!blockModel) {
            return;
        }
        var props = blockModel.properties;
        var blockEl = this.parent.getBlockElementById(blockModel.id);
        var table = blockEl.querySelector('table.e-table-element');
        var colgroup = table.querySelector('colgroup');
        var useOld = this.undoRedoAction.isUndoing;
        var updatedWidth = useOld ? data.oldWidthValue : data.newWidthValue;
        // Update model
        props.columns[data.resizedColIndex].width = updatedWidth + "px";
        // Update DOM colgroup
        var domLeftIdx = toDomCol(data.resizedColIndex, props.enableRowNumbers);
        colgroup.children[domLeftIdx].style.width = updatedWidth + "px";
    };
    UndoRedoManager.prototype.handleClipboardUndo = function (currentState) {
        var _this = this;
        var _a = currentState.data, type = _a.type, blocks = _a.blocks, targetBlockId = _a.targetBlockId, clipboardData = _a.clipboardData, oldContent = _a.oldContent, isPastedAtStart = _a.isPastedAtStart, isSelectivePaste = _a.isSelectivePaste, cursorBlockAfterSplit = _a.cursorBlockAfterSplit;
        var targetBlock = getBlockModelById(targetBlockId, this.parent.getEditorBlocks());
        var oldTargetBlock = decoupleReference(targetBlock);
        if (type === 'blocks') {
            var clipboardBlocks = clipboardData.blocks;
            var nonMergableTypes = [BlockType.Table, BlockType.Image, BlockType.Divider];
            var isFirstBlkNonMergableType = clipboardBlocks ?
                nonMergableTypes.indexOf(clipboardData.blocks[0].blockType) !== -1 : false;
            var oldBlock = decoupleReference(currentState.oldBlockModel);
            var isEmptyTargetBlock = oldBlock && oldBlock.content
                && ((oldBlock.content.length === 1 && oldBlock.content[0].contentType === ContentType.Text &&
                    (oldBlock.content[0].content === '' || !oldBlock.content[0].content))
                    || !oldBlock.content.length);
            if (blocks && blocks.length > 0) {
                blocks.forEach(function (block) {
                    _this.parent.blockCommand.deleteBlock({
                        blockElement: _this.parent.getBlockElementById(block.id),
                        isUndoRedoAction: true,
                        preventEventTrigger: true
                    });
                });
            }
            if (isEmptyTargetBlock) {
                this.parent.blockService.replaceBlock(targetBlock.id, oldBlock);
                this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                        targetBlockId: targetBlockId,
                        block: oldBlock,
                        oldBlock: oldTargetBlock,
                        preventEventTrigger: true
                    } });
            }
            else if (!isFirstBlkNonMergableType) {
                this.parent.blockService.updateContent(targetBlock.id, cursorBlockAfterSplit.content);
                this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                        data: [{ block: targetBlock, oldBlock: oldTargetBlock }],
                        preventEventTrigger: true
                    } });
                if (!isSelectivePaste) {
                    this.undoRedoAction.applyNextUndoSibling();
                }
            }
        }
        else if (type === 'block') {
            this.parent.blockCommand.deleteBlock({
                blockElement: this.parent.getBlockElementById(blocks[0].id),
                isUndoRedoAction: true,
                preventEventTrigger: true
            });
        }
        else if (type === 'content') {
            this.parent.blockService.updateContent(targetBlock.id, oldContent);
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: targetBlock, oldBlock: oldTargetBlock }],
                    preventEventTrigger: true
                } });
        }
        // Pop the deletion action from the undo stack if user selected a content and pasted
        if (isSelectivePaste) {
            this.undoRedoAction.applyNextUndoSibling();
        }
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    UndoRedoManager.prototype.handleClipboardRedo = function (currentState) {
        var _a = currentState.data, type = _a.type, blocks = _a.blocks, targetBlockId = _a.targetBlockId, clipboardData = _a.clipboardData, newContent = _a.newContent, isPastedAtStart = _a.isPastedAtStart, isSelectivePaste = _a.isSelectivePaste;
        // Pop the deletion action from the redo stack if user selected a content and pasted
        if (isSelectivePaste) {
            this.undoRedoAction.applyNextRedoSibling();
        }
        var editorBlocks = this.parent.getEditorBlocks();
        var targetBlock = getBlockModelById(targetBlockId, editorBlocks);
        var oldTargetBlock = decoupleReference(targetBlock);
        var clipboardBlocks = clipboardData ? clipboardData.blocks : null;
        var nonMergableTypes = [BlockType.Table, BlockType.Image, BlockType.Divider];
        var isFirstBlkNonMergableType = clipboardBlocks ?
            nonMergableTypes.indexOf(clipboardData.blocks[0].blockType) !== -1 : false;
        var isFirstBlkProcessed = false;
        if (type === 'blocks') {
            var isEmptyTargetBlock = targetBlock && targetBlock.content
                && ((targetBlock.content.length === 1 && targetBlock.content[0].contentType === ContentType.Text &&
                    ((targetBlock.content[0].content === '' || !targetBlock.content[0].content)))
                    || !currentState.oldBlockModel.content.length);
            if (isEmptyTargetBlock) {
                isFirstBlkProcessed = true;
                var block = decoupleReference(clipboardBlocks[0]);
                this.parent.blockService.generateNewIdsForBlock(block);
                block.id = targetBlockId;
                this.parent.blockService.replaceBlock(targetBlock.id, block);
                this.parent.stateManager.updateManagerBlocks();
                var updatedBlockModel = getBlockModelById(block.id, this.parent.getEditorBlocks());
                this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                        targetBlockId: targetBlockId,
                        block: updatedBlockModel,
                        oldBlock: oldTargetBlock,
                        preventEventTrigger: true
                    } });
            }
            else if (!isFirstBlkNonMergableType) {
                isFirstBlkProcessed = true;
                if (!isSelectivePaste) {
                    this.undoRedoAction.applyNextRedoSibling();
                }
                var originalBlock = getBlockModelById(targetBlockId, this.parent.getEditorBlocks());
                var originalClone = decoupleReference(originalBlock);
                this.parent.blockService.updateContent(originalBlock.id, originalBlock.content.concat(clipboardBlocks[0].content));
                this.parent.stateManager.updateManagerBlocks();
                this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                        data: [{ block: originalBlock, oldBlock: originalClone }],
                        preventEventTrigger: true
                    } });
            }
            this.parent.blockCommand.addBulkBlocks({
                blocks: (clipboardBlocks.slice(!isFirstBlkProcessed ? 0 : 1)),
                targetBlockId: targetBlockId,
                isUndoRedoAction: true,
                insertionType: 'blocks'
            });
        }
        else if (type === 'block') {
            this.parent.blockCommand.addBulkBlocks({
                blocks: blocks,
                targetBlockId: targetBlockId,
                isUndoRedoAction: true,
                insertionType: 'block'
            });
        }
        else if (type === 'content') {
            this.parent.blockService.updateContent(targetBlock.id, newContent);
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: targetBlock, oldBlock: oldTargetBlock }],
                    preventEventTrigger: true
                } });
            var pasteEndOffset = currentState.data.pasteEndOffset;
            if (!isNullOrUndefined(pasteEndOffset)) {
                var blockElement = this.parent.getBlockElementById(targetBlock.id);
                if (blockElement) {
                    var contentEl = getBlockContentElement(blockElement);
                    this.parent.setFocusToBlock(blockElement);
                    setCursorPosition(contentEl, pasteEndOffset);
                }
            }
        }
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    /**
     * Handles undo redo for block addition and deletion
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.blockAdditionDeletionUndoRedo = function (currentState) {
        switch (currentState.action) {
            case actionType.blockAdded: {
                if (this.undoRedoAction.isUndoing) {
                    this.removeBlock(currentState);
                }
                else {
                    this.createBlock(currentState);
                }
                break;
            }
            case actionType.blockRemoved:
                if (this.undoRedoAction.isUndoing) {
                    this.createBlock(currentState);
                    // If last deletion was a soft-selected special block, restore overlay on undo
                    var restoredId = currentState.oldBlockModel && currentState.oldBlockModel.id;
                    if (restoredId && this.parent.lastHighlightedBlockId === restoredId) {
                        var blockEle = this.parent.getBlockElementById(restoredId);
                        if (blockEle) {
                            this.parent.selectionOverlay.show(currentState.oldBlockModel.id);
                            if (this.parent.nodeSelection) {
                                this.parent.nodeSelection.clearSelection();
                            }
                        }
                    }
                }
                else {
                    this.removeBlock(currentState);
                }
                break;
        }
    };
    /**
     * Creates block with given state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.createBlock = function (currentState) {
        var deletedBLockIndex = currentState.data ? currentState.data.currentIndex : -1;
        if (deletedBLockIndex < 0) {
            return;
        }
        var _a = (currentState.data), blockBeforeSplit = _a.blockBeforeSplit, blocksAfterSplit = _a.blocksAfterSplit, isSplitting = _a.isSplitting, isTargetDeletion = _a.isTargetDeletion;
        var parentId = blockBeforeSplit ? blockBeforeSplit.parentId : currentState.oldBlockModel.parentId;
        var parentBlock = getBlockModelById(parentId, this.parent.getEditorBlocks());
        var parentCell = findCellById(parentId, this.parent.getEditorBlocks());
        var targetIndex = deletedBLockIndex === 0 ? deletedBLockIndex : deletedBLockIndex - 1;
        var afterBlockModel = parentBlock
            ? parentBlock.properties.children[targetIndex]
            : (parentCell ? parentCell.blocks[targetIndex] : this.parent.getEditorBlocks()[targetIndex]);
        var currentBlockElement;
        var addedBlock = this.parent.blockCommand.addBlock({
            targetBlock: currentBlockElement || this.parent.blockContainer.querySelector('#' + afterBlockModel.id),
            blockType: isSplitting ? blocksAfterSplit[1].blockType : currentState.oldBlockModel.blockType,
            block: isSplitting ? blocksAfterSplit[1] : currentState.oldBlockModel,
            isAfter: deletedBLockIndex > 0,
            isUndoRedoAction: true,
            preventEventTrigger: true,
            forceIgnoreTargetUpdate: true
        });
        if (isSplitting && blocksAfterSplit) {
            var cursorBlock = blocksAfterSplit[0];
            this.parent.blockService.replaceBlock(cursorBlock.id, cursorBlock);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: getBlockModelById(cursorBlock.id, this.parent.getEditorBlocks()) }],
                    preventEventTrigger: true
                } });
        }
        else {
            var newBlockElement = this.parent.getBlockElementById(addedBlock.id);
            var direction = isTargetDeletion ? 'next' : 'previous';
            var adjacentBlock = getAdjacentBlock(newBlockElement, direction);
            var canSetFocusToAdjacent = (adjacentBlock &&
                (isTargetDeletion || isNonContentEditableBlock(currentState.oldBlockModel.blockType)));
            if (canSetFocusToAdjacent) {
                this.parent.setFocusAndUIForNewBlock(adjacentBlock);
            }
            else if (currentState.oldBlockModel.blockType === BlockType.Callout) {
                this.parent.setFocusAndUIForNewBlock(newBlockElement.querySelector('.' + constants.BLOCK_CLS));
            }
            else if (currentState.oldBlockModel.blockType === BlockType.Quote) {
                this.parent.setFocusAndUIForNewBlock(newBlockElement.querySelector('.' + constants.BLOCK_CLS));
            }
        }
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    /**
     * Removes block with given state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    UndoRedoManager.prototype.removeBlock = function (currentState) {
        var _a = (currentState.data), blockBeforeSplit = _a.blockBeforeSplit, isAfter = _a.isAfter, isSplitting = _a.isSplitting;
        var blockElement = this.parent.blockContainer.querySelector("#" + currentState.data.blockId);
        if (isSplitting) {
            var targetBlockElement = this.parent.getBlockElementById(blockBeforeSplit.id);
            var newCursorPos = getBlockContentElement(targetBlockElement).textContent.length;
            var newBlock = blockBeforeSplit;
            this.parent.blockCommand.deleteBlock({ blockElement: blockElement, isUndoRedoAction: true, preventEventTrigger: true });
            this.parent.blockService.replaceBlock(blockBeforeSplit.id, newBlock);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: getBlockModelById(blockBeforeSplit.id, this.parent.getEditorBlocks()) }],
                    preventEventTrigger: true
                } });
            this.parent.setFocusToBlock(targetBlockElement);
            setCursorPosition(getBlockContentElement(targetBlockElement), newCursorPos);
        }
        else {
            var direction = isAfter ? 'previous' : 'next';
            var adjacentBlock = getAdjacentBlock(blockElement, direction);
            if (!adjacentBlock) {
                // Fallback - try with opposite direction
                adjacentBlock = getAdjacentBlock(blockElement, (direction === 'previous' ? 'next' : 'previous'));
            }
            this.parent.setFocusAndUIForNewBlock(adjacentBlock);
            this.parent.blockCommand.deleteBlock({ blockElement: blockElement, isUndoRedoAction: true, preventEventTrigger: true });
        }
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    return UndoRedoManager;
}());
export { UndoRedoManager };
