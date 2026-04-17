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
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { getBlockContentElement, getBlockIndexById, getBlockModelById } from '../../common/utils/block';
import { setCursorPosition, getNodeFromPath, captureSelectionState, getTextOffset } from '../../common/utils/selection';
import { findClosestParent } from '../../common/utils/dom';
import { actionType, BLOCK_CLS, events } from '../../common/constant';
import { decoupleReference } from '../../common/utils/common';
import { BlockType } from '../../models/enums';
import { UndoRedoManager } from '../plugins/common/undo-manager';
/**
 * `UndoRedoManager` module is used to handle undo and redo actions.
 */
var UndoRedoAction = /** @class */ (function () {
    function UndoRedoAction(manager) {
        /** @hidden */
        this.undoRedoStack = [];
        /** @hidden */
        this.index = -1; // points to the last applied action; -1 means no actions applied
        /** @hidden */
        this.isUndoing = false;
        /** @hidden */
        this.isRedoing = false;
        this.preventRestores = new Set([
            actionType.tableRowInserted, actionType.tableRowDeleted, actionType.tableColumnDeleted, actionType.tableColumnInserted,
            actionType.tableCellsCleared,
            actionType.blockAdded, actionType.blockRemoved, actionType.blockMoved, actionType.formattingAction,
            actionType.blockTransformed, actionType.multipleBlocksTransformed
        ]);
        /** @hidden */
        this.isBatchMode = false;
        /** @hidden */
        this.batchedTransforms = [];
        this.parent = manager;
        this.undoRedoManager = new UndoRedoManager(this.parent, this);
        this.addEventListener();
    }
    UndoRedoAction.prototype.addEventListener = function () {
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    UndoRedoAction.prototype.removeEventListener = function () {
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Begins a batch mode for tracking multiple block transformations as a single undo action
     *
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.beginBatchTransform = function () {
        this.isBatchMode = true;
        this.batchedTransforms = [];
    };
    /**
     * Resets the batch mode state and clears batched transformations
     *
     * @returns {void}
     * @private
     */
    UndoRedoAction.prototype.resetBatchState = function () {
        this.isBatchMode = false;
        this.batchedTransforms = [];
    };
    /**
     * Ends batch mode and pushes all accumulated block transformations as a single undo entry
     *
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.endBatchTransform = function () {
        if (!this.isBatchMode || this.batchedTransforms.length === 0) {
            this.resetBatchState();
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.multipleBlocksTransformed,
            data: {
                transformedBlocks: decoupleReference(this.batchedTransforms)
            }
        });
        this.resetBatchState();
    };
    /**
     * Checks if batch mode is currently active
     *
     * @returns {boolean} True if in batch mode
     * @hidden
     */
    UndoRedoAction.prototype.getIsBatchMode = function () {
        return this.isBatchMode;
    };
    /**
     * Handles the undo operation.
     *
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.undo = function () {
        this.performUndoRedo(true, 'isUndoing');
    };
    /**
     * Handles the redo operation.
     *
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.redo = function () {
        this.performUndoRedo(false, 'isRedoing');
    };
    /**
     * Executes undo or redo operation, updating editor state and notifying observers.
     * Processes sibling actions for formatting or paste, then applies the target state.
     *
     * @param {boolean} isUndo - True for undo, false for redo.
     * @param {string} flagName - State flag ('isUndoing' or 'isRedoing') to prevent recursion.
     * @returns {void}
     */
    UndoRedoAction.prototype.performUndoRedo = function (isUndo, flagName) {
        this.parent.selectionOverlay.clearSelectionOverlay();
        this.parent.inlineToolbarModule.hideInlineToolbar();
        var canPerform = isUndo ? this.canUndo() : this.canRedo();
        if (!canPerform) {
            return;
        }
        this["" + flagName] = true;
        var siblingAction = this.undoRedoStack[this.index + 2];
        var shouldProcessSiblingAction = !isUndo && siblingAction !== undefined && (
        // Case 1: Formatting while typing (Press ctrlB and type)
        siblingAction.data.isTypingWithFormat ||
            // Case 2: Clipboard paste - (with blocks) or (selective paste)
            (siblingAction.action === 'clipboardPaste' &&
                siblingAction.data.type === 'blocks'
                ||
                    siblingAction.data.isSelectivePaste));
        this.index = shouldProcessSiblingAction ? this.index + 1 : this.index;
        var state = isUndo ? this.undoRedoStack[this.index] : this.undoRedoStack[this.index + 1];
        if (isUndo) {
            this.updateFileUploadPropsOnStack(state);
        }
        if (state) {
            // Process the action first
            this.processUndoRedoAction(state);
            // Then move the pointer
            this.index = isUndo ? this.index - 1 : this.index + 1;
            var eventArgs = {
                isUndo: isUndo,
                content: isUndo ? state.oldBlockModel : state.updatedBlockModel,
                previousContent: isUndo ? state.updatedBlockModel : state.oldBlockModel
            };
            this.parent.observer.notify('undoRedoPerformed', eventArgs);
            this.parent.listPlugin.recalculateMarkersForListItems();
            this.parent.stateManager.updateManagerBlocks();
        }
        this["" + flagName] = false;
    };
    /**
     * Pushes the given state into the undo stack
     *
     * @param {IUndoRedoState} state - The current state.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.pushActionIntoUndoStack = function (state) {
        var isSelectionPresent = !isNOU(this.parent.previousSelection);
        var isTextSelected = isSelectionPresent && !this.parent.previousSelection.isCollapsed;
        var currentState = __assign({}, state, { undoSelection: isSelectionPresent ? this.parent.previousSelection : captureSelectionState(), redoSelection: ((isTextSelected && !(state.action === actionType.formattingAction))
                || (isSelectionPresent && state.action === actionType.blockTransformed))
                ? this.parent.previousSelection
                : captureSelectionState() });
        // Truncate any future states if we are not at the end
        if (this.index < this.undoRedoStack.length - 1) {
            this.undoRedoStack = this.undoRedoStack.slice(0, this.index + 1);
        }
        // Push new state
        this.undoRedoStack.push(currentState);
        // Enforce max size
        if (this.undoRedoStack.length > this.parent.undoRedoStack) {
            var excess = this.undoRedoStack.length - this.parent.undoRedoStack;
            this.undoRedoStack = this.undoRedoStack.slice(excess);
            this.index = Math.max(this.index - excess, -1);
        }
        // Point to the last item
        this.index = this.undoRedoStack.length - 1;
        this.parent.previousSelection = undefined;
    };
    /**
     * Processes the undo/redo action.
     *
     * @param {IUndoRedoState} currentState - The current undo/redo state.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.processUndoRedoAction = function (currentState) {
        this.parent.floatingIconAction.hideFloatingIcons();
        /* Perform core actions */
        this.applyUndoRedoChange(currentState);
        /* UI and selection refresh */
        var action = currentState.action;
        var shouldPreventRestore = this.preventRestores.has(action);
        if (!shouldPreventRestore) {
            this.restoreSelectionState(currentState);
        }
        if ((action === actionType.contentChanged || action === actionType.lineBreakAdded) && this.parent.currentFocusedBlock) {
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
        }
        this.parent.refreshPlaceholder();
    };
    UndoRedoAction.prototype.applyUndoRedoChange = function (currentState) {
        switch (currentState.action) {
            case actionType.contentChanged: {
                var blockId = currentState.data ? currentState.data.blockId : '';
                this.undoRedoManager.reRenderWithPreviousState(blockId, currentState.oldBlockModel, currentState.updatedBlockModel);
                break;
            }
            case actionType.formattingAction:
                this.undoRedoManager.handleFormattingUndoRedo(currentState);
                break;
            case actionType.isExpanded: {
                var blockElement = this.parent.getBlockElementById(currentState.data.blockId);
                var updatedState = this.isUndoing ? !currentState.data.isExpanded
                    : currentState.data.isExpanded;
                this.parent.blockRenderer.collapsibleRenderer.updateCollapsibleBlockExpansion(blockElement, updatedState, true);
                break;
            }
            case actionType.indent: {
                if (this.isUndoing) {
                    this.parent.execCommand({ command: 'IndentBlock', state: {
                            blockIDs: currentState.data.blockIDs,
                            shouldDecrease: !currentState.data.shouldDecrease,
                            isUndoRedoAction: true
                        } });
                }
                else {
                    this.parent.execCommand({ command: 'IndentBlock', state: {
                            blockIDs: currentState.data.blockIDs,
                            shouldDecrease: currentState.data.shouldDecrease,
                            isUndoRedoAction: true
                        } });
                }
                break;
            }
            case actionType.checked: {
                var block = getBlockModelById(currentState.data.blockId, this.parent.getEditorBlocks());
                var updatedState = this.isUndoing ? !currentState.data.isChecked
                    : currentState.data.isChecked;
                this.parent.blockRenderer.listRenderer.toggleCheckedState(block, updatedState, true);
                break;
            }
            case actionType.lineBreakAdded: {
                var state = currentState.data;
                var blockModel = getBlockModelById(state.blockId, this.parent.getEditorBlocks());
                var oldBlock = decoupleReference(blockModel);
                this.parent.blockService.updateContent(blockModel.id, this.isUndoing ? currentState.oldContents : currentState.newContents);
                this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                        data: [{ block: blockModel, oldBlock: oldBlock }]
                    } });
                break;
            }
            case actionType.blockAdded:
            case actionType.blockRemoved:
                this.undoRedoManager.blockAdditionDeletionUndoRedo(currentState);
                this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
                break;
            case actionType.blockMoved:
                this.undoRedoManager.handleBlockMovement(currentState);
                break;
            case actionType.multipleBlocksDeleted:
                this.undoRedoManager.handleMultipleBlocksUndoRedo(currentState);
                break;
            case actionType.blockTransformed:
                this.undoRedoManager.reTransformBlocks(currentState);
                break;
            case actionType.multipleBlocksTransformed:
                this.undoRedoManager.reTransformMultipleBlocks(currentState);
                break;
            case actionType.imageInsertion:
                this.undoRedoManager.handleImageInsertion(currentState);
                break;
            case actionType.clipboardPaste:
                this.undoRedoManager.handleClipboardActions(currentState);
                break;
            case actionType.tableRowInserted:
                this.undoRedoManager.processRowAction(currentState.data, 'insert');
                break;
            case actionType.tableRowDeleted:
                this.undoRedoManager.processRowAction(currentState.data, 'delete');
                break;
            case actionType.tableColumnInserted:
                this.undoRedoManager.processColumnAction(currentState.data, 'insert');
                break;
            case actionType.tableColumnDeleted:
                this.undoRedoManager.processColumnAction(currentState.data, 'delete');
                break;
            case actionType.tableRowsDeleted:
                this.undoRedoManager.handleBulkRowsDeleted(currentState);
                break;
            case actionType.tableColumnsDeleted:
                this.undoRedoManager.handleBulkColumnsDeleted(currentState);
                break;
            case actionType.tableCellsCleared:
                this.undoRedoManager.handleTableCellsCleared(currentState);
                break;
            case actionType.tableCellsPasted:
                this.undoRedoManager.handleTableCellsPasted(currentState);
                break;
            case actionType.tableHeaderInput:
                this.undoRedoManager.handleTableHeaderUndoRedo(currentState);
                break;
            case actionType.tableColumnResized:
                this.undoRedoManager.handleTableColumnResized(currentState);
                break;
        }
    };
    /**
     * Restores the selection after undo/redo action.
     *
     * @param {IUndoRedoState} currentState - The current undo/redo state.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.restoreSelectionState = function (currentState) {
        var selection = this.isUndoing ? currentState.undoSelection : currentState.redoSelection;
        if (selection) {
            var startBlock = this.parent.rootEditorElement.querySelector('#' + selection.startBlockId);
            var endBlock = this.parent.rootEditorElement.querySelector('#' + selection.endBlockId);
            if (startBlock && endBlock) {
                var startNode = getNodeFromPath(startBlock, selection.startContainerPath);
                var endNode = getNodeFromPath(endBlock, selection.endContainerPath);
                var isSelectivePaste = currentState.action === actionType.clipboardPaste
                    && currentState.data.isSelectivePaste;
                var canRestoreForActions = currentState.action === actionType.indent
                    || currentState.action === actionType.formattingAction
                    || currentState.action === actionType.multipleBlocksDeleted;
                if ((this.isUndoing || (canRestoreForActions && this.isRedoing))
                    && !selection.isCollapsed && startNode && endNode) {
                    this.parent.nodeSelection.createRangeWithOffsets(startNode, endNode, selection.startOffset, selection.endOffset);
                }
                else if (!isSelectivePaste && ((this.isRedoing && startNode) || selection.isCollapsed && startNode)) {
                    var blockElement = findClosestParent(startNode, '.' + BLOCK_CLS);
                    this.parent.setFocusToBlock(blockElement);
                    var contentElement = getBlockContentElement(blockElement);
                    var nodeBaseOffset = getTextOffset(startNode, contentElement);
                    var absoluteOffset = nodeBaseOffset + selection.startOffset;
                    setCursorPosition(contentElement, absoluteOffset);
                }
            }
        }
        else {
            // Fallback
            if (this.parent.currentFocusedBlock && document.contains(this.parent.currentFocusedBlock)) {
                var contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
                if (contentElement) {
                    this.parent.setFocusToBlock(this.parent.currentFocusedBlock);
                    var position = contentElement.textContent.length;
                    setCursorPosition(contentElement, position);
                }
            }
        }
    };
    UndoRedoAction.prototype.updateFileUploadPropsOnStack = function (state) {
        /* The block model stored on stack might not have proper src since it is pushed before user uploads
            a file. Hence we are updating here as it surely has updated src in current block model in the editor */
        var validTypes = [BlockType.Image];
        var blockModel = state.action === actionType.blockAdded ?
            state.oldBlockModel : state.data.newBlockModel;
        var isValid = ((state.action === actionType.blockTransformed
            || state.action === actionType.blockAdded || state.action === actionType.imageInsertion)
            && validTypes.indexOf(blockModel.blockType) !== -1);
        if (isValid) {
            // Update the props such as src into the stack
            var currentUpdatedBlock = getBlockModelById(blockModel.id, this.parent.getEditorBlocks());
            blockModel.properties = __assign({}, currentUpdatedBlock.properties);
        }
    };
    UndoRedoAction.prototype.trackCheckedStateForUndoRedo = function (blockId, state) {
        this.pushActionIntoUndoStack({
            action: actionType.checked,
            data: { blockId: blockId, isChecked: state }
        });
    };
    UndoRedoAction.prototype.trackContentChangedForUndoRedo = function (oldBlock, updatedBlock) {
        this.pushActionIntoUndoStack({
            oldBlockModel: oldBlock,
            updatedBlockModel: updatedBlock,
            action: actionType.contentChanged,
            data: { blockId: updatedBlock.id }
        });
    };
    UndoRedoAction.prototype.trackFormattingForUndoRedo = function (blockIDs, oldBlockModels, updatedBlockModels, isTypingWithFormat, selection) {
        this.pushActionIntoUndoStack({
            action: actionType.formattingAction,
            data: {
                blockIDs: blockIDs,
                oldBlockModels: oldBlockModels,
                updatedBlockModels: updatedBlockModels,
                isTypingWithFormat: isTypingWithFormat,
                selectionState: selection
            }
        });
    };
    /**
     * Handles undo/redo recording for block addition
     *
     * @param {IAddBlockInteraction} args - The arguments for adding a block.
     * @param {BlockModel} blockModel - The block model.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackBlockAdditionForUndoRedo = function (args, blockModel) {
        if (args.isUndoRedoAction) {
            return;
        }
        var decoupledBlock = decoupleReference(blockModel);
        var targetBlockModel = args.targetBlockModel ? decoupleReference(args.targetBlockModel) : null;
        var blockBeforeSplit = args.blockBeforeSplit ? decoupleReference(args.blockBeforeSplit) : null;
        this.pushActionIntoUndoStack({
            action: actionType.blockAdded,
            data: {
                blockId: blockModel.id,
                currentIndex: getBlockIndexById(blockModel.id, this.parent.getEditorBlocks()),
                isSplitting: args.isSplitting,
                isAfter: args.isAfter,
                blockBeforeSplit: blockBeforeSplit,
                blocksAfterSplit: [targetBlockModel, decoupledBlock]
            },
            oldBlockModel: decoupledBlock
        });
    };
    /**
     * Records block removal for undo/redo
     *
     * @param {IDeleteBlockInteraction} args - The arguments for deleting a block.
     * @param {string} blockId - The ID of the block.
     * @param {BlockModel} blockModel - The block model.
     * @param {number} blockIndex - The index of the block.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackBlockRemovalForUndoRedo = function (args, blockId, blockModel, blockIndex) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.blockRemoved,
            data: {
                blockId: blockId,
                currentIndex: blockIndex,
                isSplitting: args.isSplitting,
                isTargetDeletion: args.isTargetDeletion,
                blocksAfterSplit: args.blocksAfterSplit,
                blockBeforeSplit: args.blockBeforeSplit
            },
            oldBlockModel: decoupleReference(blockModel)
        });
    };
    /**
     * Records a block move operation for undo/redo
     *
     * @param {IMoveBlocksInteraction} args - The arguments for moving a block.
     * @param {IFromBlockData[]} movedBlocks - The blocks that are moved.
     * @param {number} toBlockIndex - The index of the block to which the blocks are moved.
     * @param {string} toParentId - The ID of the parent block to which the blocks are moved.
     * @param {boolean} isMovingUp - Indicates whether the blocks are moved up.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackBlockMoveForUndoRedo = function (args, movedBlocks, toBlockIndex, toParentId, isMovingUp) {
        if (args.isUndoRedoAction) {
            return;
        }
        var reversedFromModels = movedBlocks.slice().reverse();
        this.pushActionIntoUndoStack({
            action: actionType.blockMoved,
            data: {
                blockIds: reversedFromModels.map(function (fromModel) { return fromModel.blockId; }),
                fromIndex: reversedFromModels.map(function (fromModel) { return fromModel.index; }),
                toBlockId: args.toBlockId,
                toIndex: toBlockIndex,
                fromParentId: reversedFromModels.map(function (fromModel) { return fromModel.parent ? fromModel.parent.id : ''; }),
                toParentId: toParentId,
                isMovedUp: isMovingUp
            }
        });
    };
    /**
     * Triggers event notification for block transformation
     *
     * @param {HTMLElement} blockElement The block element
     * @param {BlockModel} newBlock - The new transformed block
     * @param {BlockModel} oldBlock - The old block for reference
     * @param {boolean} isUndoRedoAction - Specifies whether it is undo redo action
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackBlockTransformForUndoRedo = function (blockElement, newBlock, oldBlock, isUndoRedoAction) {
        if (isUndoRedoAction) {
            return;
        }
        // If in batch mode, collect the transformation instead of pushing to stack
        if (this.isBatchMode) {
            this.batchedTransforms.push({
                blockId: blockElement.id,
                oldBlockModel: oldBlock,
                newBlockModel: decoupleReference(newBlock)
            });
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.blockTransformed,
            data: {
                blockId: blockElement.id,
                oldBlockModel: oldBlock,
                newBlockModel: decoupleReference(newBlock)
            }
        });
    };
    /**
     * Handles undo/redo recording for image insertion (placeholder → uploaded image)
     *
     * @param {string} blockId - The ID of the image block
     * @param {BlockModel} oldBlockModel - The block model before insertion (src empty)
     * @param {BlockModel} newBlockModel - The block model after insertion (src filled)
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackImageInsertionForUndoRedo = function (blockId, oldBlockModel, newBlockModel) {
        this.pushActionIntoUndoStack({
            action: actionType.imageInsertion,
            data: {
                blockId: blockId,
                oldBlockModel: oldBlockModel,
                newBlockModel: newBlockModel
            }
        });
    };
    /**
     * Handles undo/redo recording for clipboard paste
     *
     * @param {IAddBulkBlocksInteraction} args - The arguments of clipboard paste.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackClipboardPasteForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.clipboardPaste,
            oldBlockModel: args.oldBlockModel,
            data: {
                type: args.insertionType,
                blocks: decoupleReference(args.blocks.map(function (block) { return decoupleReference(block); })),
                targetBlockId: args.targetBlockId,
                isPastedAtStart: args.isPastedAtStart,
                isSelectivePaste: args.isSelectivePaste,
                cursorBlockAfterSplit: args.cursorBlockAfterSplit,
                clipboardData: {
                    blocks: args.clipboardBlocks
                }
            }
        });
    };
    /**
     * Handles indent action for undo redo
     *
     * @param {IIndentOperation} args - The arguments for indenting blocks
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackIndentActionForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.indent,
            data: {
                blockIDs: args.blockIDs,
                shouldDecrease: args.shouldDecrease,
                isUndoRedoAction: args.isUndoRedoAction
            }
        });
    };
    /**
     * Handles Line break action for undo redo
     *
     * @param {ILineBreakOperation} args - The arguments of inserted line breaks
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackLineBreakActionForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.lineBreakAdded,
            oldContents: args.oldContent,
            newContents: args.newContent,
            data: {
                blockId: args.blockId
            }
        });
    };
    /**
     * Handles expanded state of collapsible block for undo redo
     *
     * @param {string} blockId - The id of the block
     * @param {boolean} state - The collapsed state
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackExpandedStateForUndoRedo = function (blockId, state) {
        this.pushActionIntoUndoStack({
            action: actionType.isExpanded,
            data: { blockId: blockId, isExpanded: state }
        });
    };
    /**
     * Handles undo/redo recording for table block row addition
     *
     * @param {ITableRowInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableRowInsertionForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableRowInserted,
            data: { blockId: args.blockId, rowIndex: args.rowIndex, rowModel: args.rowModel }
        });
    };
    /**
     * Handles undo/redo recording for table block row deletion
     *
     * @param {ITableRowInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableRowDeletionForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableRowDeleted,
            data: { blockId: args.blockId, rowIndex: args.rowIndex, rowModel: args.rowModel }
        });
    };
    /**
     * Handles undo/redo recording for table block column addition
     *
     * @param {ITableColumnInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableColumnInsertionForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnInserted,
            data: {
                blockId: args.blockId,
                colIndex: args.colIndex,
                columnModel: args.columnModel,
                columnCells: args.columnCells
            }
        });
    };
    /**
     * Handles undo/redo recording for table block row deletion
     *
     * @param {ITableColumnInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableColumnDeletionForUndoRedo = function (args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnDeleted,
            data: {
                blockId: args.blockId,
                colIndex: args.colIndex,
                columnModel: args.columnModel,
                columnCells: args.columnCells
            }
        });
    };
    /**
     * Handles undo/redo recording for table cell clearance.
     *
     * @param {ITableCellsClearOperation} args - The arguments for table cell clearance.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableCellsClearForUndoRedo = function (args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableCellsCleared,
            data: {
                blockId: args.blockId,
                cells: args.cells
            }
        });
    };
    /**
     * Handles undo/redo recording for table cell level paste.
     *
     * @param {ITableCellsPasteOperation} args - The arguments for table cell paste.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableCellsPasteForUndoRedo = function (args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableCellsPasted,
            data: {
                blockId: args.blockId,
                cells: args.cells,
                structureDelta: args.structureDelta
            }
        });
    };
    /**
     * Handles undo/redo recording for table header input.
     *
     * @param {ITableHeaderInputOperation} args - The arguments for table header input.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableHeaderInputForUndoRedo = function (args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableHeaderInput,
            data: {
                blockId: args.blockId,
                oldColumns: args.oldColumns,
                updatedColumns: args.updatedColumns
            }
        });
    };
    /**
     * Handles undo/redo recording for table bulk row deletions
     *
     * @param {IBulkRowsDeleteOperation} args - The arguments for bulk rows deletion.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackBulkRowDeletionForUndoRedo = function (args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableRowsDeleted,
            data: { blockId: args.blockId, rows: args.rows }
        });
    };
    /**
     * Handles undo/redo recording for table bulk column deletions
     *
     * @param {IBulkColumnsDeleteOperation} args - The arguments for bulk column deletion.
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackBulkColumnDeletionForUndoRedo = function (args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnsDeleted,
            data: { blockId: args.blockId, cols: args.cols }
        });
    };
    /**
     * Handles undo/redo recording for table column resize operations
     *
     * @param {ITableColumnResizeOperation} data - The arguments for column resize
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.trackTableColumnResizeForUndoRedo = function (data) {
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnResized,
            data: data
        });
    };
    /**
     * Checks whether the undo stack is empty or not.
     *
     * @returns {boolean} Returns true if the undo stack is not empty.
     * @hidden
     */
    UndoRedoAction.prototype.canUndo = function () {
        return this.index >= 0 && this.undoRedoStack.length > 0;
    };
    /**
     * Checks whether the redo stack is empty or not.
     *
     * @returns {boolean} Returns true if the redo stack is not empty.
     * @hidden
     */
    UndoRedoAction.prototype.canRedo = function () {
        return this.undoRedoStack.length > 0 && this.index < this.undoRedoStack.length - 1;
    };
    /**
     * Clears the undo and redo stack.
     *
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.clear = function () {
        this.undoRedoStack = [];
        this.index = -1;
    };
    UndoRedoAction.prototype.destroy = function () {
        this.removeEventListener();
        this.clear();
        this.undoRedoManager = null;
    };
    /**
     * Adjusts undo and redo stacks to respect the new undoRedoStack limit
     *
     * @returns {void}
     * @hidden
     */
    UndoRedoAction.prototype.adjustUndoRedoStacks = function () {
        if (this.undoRedoStack.length > this.parent.undoRedoStack) {
            // Trim from the start to keep the most recent items
            var excess = this.undoRedoStack.length - this.parent.undoRedoStack;
            this.undoRedoStack = this.undoRedoStack.slice(excess);
            this.index = Math.max(this.index - excess, -1);
        }
        // Ensure index stays within bounds
        if (this.index >= this.undoRedoStack.length) {
            this.index = this.undoRedoStack.length - 1;
        }
    };
    /**
     * Applies the next future action during redo without emitting external push/pop changes.
     * Used internally for formatting flows to replay adjacent actions.
     *
     * @returns {void}
     */
    UndoRedoAction.prototype.applyNextRedoSibling = function () {
        // For redo, we don't need to increase the index values since those are handled automatically
        if (this.canRedo()) {
            var nextState = this.undoRedoStack[this.index];
            if (nextState) {
                this.processUndoRedoAction(nextState);
            }
        }
    };
    /**
     * Applies the previous action during undo without emitting external push/pop changes.
     * Used internally for formatting flows to replay adjacent actions.
     *
     * @returns {void}
     */
    UndoRedoAction.prototype.applyNextUndoSibling = function () {
        if (this.canUndo()) {
            var prevState = this.undoRedoStack[this.index - 1];
            if (prevState) {
                this.processUndoRedoAction(prevState);
                this.index--;
            }
        }
    };
    return UndoRedoAction;
}());
export { UndoRedoAction };
