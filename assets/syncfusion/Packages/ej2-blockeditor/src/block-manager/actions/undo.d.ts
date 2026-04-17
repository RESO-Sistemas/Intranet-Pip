import { BlockModel } from '../../models/index';
import { IUndoRedoState, IMoveBlocksInteraction, IBlockSelectionState, IIndentOperation, IAddBlockInteraction, IAddBulkBlocksInteraction, IDeleteBlockInteraction, IFromBlockData, ILineBreakOperation } from '../../common/interface';
import { BlockManager } from '../base/block-manager';
import { UndoRedoManager } from '../plugins/common/undo-manager';
import { IBulkColumnsDeleteOperation, IBulkRowsDeleteOperation, ITableCellsClearOperation, ITableCellsPasteOperation, ITableColumnInsertOptions, ITableColumnResizeOperation, ITableHeaderInputOperation, ITableRowInsertOptions } from '../base/interface';
/**
 * `UndoRedoManager` module is used to handle undo and redo actions.
 */
export declare class UndoRedoAction {
    private parent;
    /** @hidden */
    undoRedoManager: UndoRedoManager;
    /** @hidden */
    undoRedoStack: IUndoRedoState[];
    /** @hidden */
    index: number;
    /** @hidden */
    isUndoing: boolean;
    /** @hidden */
    isRedoing: boolean;
    private preventRestores;
    /** @hidden */
    private isBatchMode;
    /** @hidden */
    private batchedTransforms;
    constructor(manager: BlockManager);
    private addEventListener;
    private removeEventListener;
    /**
     * Begins a batch mode for tracking multiple block transformations as a single undo action
     *
     * @returns {void}
     * @hidden
     */
    beginBatchTransform(): void;
    /**
     * Resets the batch mode state and clears batched transformations
     *
     * @returns {void}
     * @private
     */
    private resetBatchState;
    /**
     * Ends batch mode and pushes all accumulated block transformations as a single undo entry
     *
     * @returns {void}
     * @hidden
     */
    endBatchTransform(): void;
    /**
     * Checks if batch mode is currently active
     *
     * @returns {boolean} True if in batch mode
     * @hidden
     */
    getIsBatchMode(): boolean;
    /**
     * Handles the undo operation.
     *
     * @returns {void}
     * @hidden
     */
    undo(): void;
    /**
     * Handles the redo operation.
     *
     * @returns {void}
     * @hidden
     */
    redo(): void;
    /**
     * Executes undo or redo operation, updating editor state and notifying observers.
     * Processes sibling actions for formatting or paste, then applies the target state.
     *
     * @param {boolean} isUndo - True for undo, false for redo.
     * @param {string} flagName - State flag ('isUndoing' or 'isRedoing') to prevent recursion.
     * @returns {void}
     */
    private performUndoRedo;
    /**
     * Pushes the given state into the undo stack
     *
     * @param {IUndoRedoState} state - The current state.
     * @returns {void}
     * @hidden
     */
    pushActionIntoUndoStack(state?: IUndoRedoState): void;
    /**
     * Processes the undo/redo action.
     *
     * @param {IUndoRedoState} currentState - The current undo/redo state.
     * @returns {void}
     * @hidden
     */
    processUndoRedoAction(currentState: IUndoRedoState): void;
    private applyUndoRedoChange;
    /**
     * Restores the selection after undo/redo action.
     *
     * @param {IUndoRedoState} currentState - The current undo/redo state.
     * @returns {void}
     * @hidden
     */
    restoreSelectionState(currentState: IUndoRedoState): void;
    private updateFileUploadPropsOnStack;
    trackCheckedStateForUndoRedo(blockId: string, state: boolean): void;
    trackContentChangedForUndoRedo(oldBlock: BlockModel, updatedBlock: BlockModel): void;
    trackFormattingForUndoRedo(blockIDs: string[], oldBlockModels: BlockModel[], updatedBlockModels: BlockModel[], isTypingWithFormat: boolean, selection: IBlockSelectionState): void;
    /**
     * Handles undo/redo recording for block addition
     *
     * @param {IAddBlockInteraction} args - The arguments for adding a block.
     * @param {BlockModel} blockModel - The block model.
     * @returns {void}
     * @hidden
     */
    trackBlockAdditionForUndoRedo(args: IAddBlockInteraction, blockModel: BlockModel): void;
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
    trackBlockRemovalForUndoRedo(args: IDeleteBlockInteraction, blockId: string, blockModel: BlockModel, blockIndex: number): void;
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
    trackBlockMoveForUndoRedo(args: IMoveBlocksInteraction, movedBlocks: IFromBlockData[], toBlockIndex: number, toParentId: string, isMovingUp: boolean): void;
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
    trackBlockTransformForUndoRedo(blockElement: HTMLElement, newBlock: BlockModel, oldBlock: BlockModel, isUndoRedoAction: boolean): void;
    /**
     * Handles undo/redo recording for image insertion (placeholder → uploaded image)
     *
     * @param {string} blockId - The ID of the image block
     * @param {BlockModel} oldBlockModel - The block model before insertion (src empty)
     * @param {BlockModel} newBlockModel - The block model after insertion (src filled)
     * @returns {void}
     * @hidden
     */
    trackImageInsertionForUndoRedo(blockId: string, oldBlockModel: BlockModel, newBlockModel: BlockModel): void;
    /**
     * Handles undo/redo recording for clipboard paste
     *
     * @param {IAddBulkBlocksInteraction} args - The arguments of clipboard paste.
     * @returns {void}
     * @hidden
     */
    trackClipboardPasteForUndoRedo(args: IAddBulkBlocksInteraction): void;
    /**
     * Handles indent action for undo redo
     *
     * @param {IIndentOperation} args - The arguments for indenting blocks
     * @returns {void}
     * @hidden
     */
    trackIndentActionForUndoRedo(args: IIndentOperation): void;
    /**
     * Handles Line break action for undo redo
     *
     * @param {ILineBreakOperation} args - The arguments of inserted line breaks
     * @returns {void}
     * @hidden
     */
    trackLineBreakActionForUndoRedo(args: ILineBreakOperation): void;
    /**
     * Handles expanded state of collapsible block for undo redo
     *
     * @param {string} blockId - The id of the block
     * @param {boolean} state - The collapsed state
     * @returns {void}
     * @hidden
     */
    trackExpandedStateForUndoRedo(blockId: string, state: boolean): void;
    /**
     * Handles undo/redo recording for table block row addition
     *
     * @param {ITableRowInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableRowInsertionForUndoRedo(args: ITableRowInsertOptions): void;
    /**
     * Handles undo/redo recording for table block row deletion
     *
     * @param {ITableRowInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableRowDeletionForUndoRedo(args: ITableRowInsertOptions): void;
    /**
     * Handles undo/redo recording for table block column addition
     *
     * @param {ITableColumnInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableColumnInsertionForUndoRedo(args: ITableColumnInsertOptions): void;
    /**
     * Handles undo/redo recording for table block row deletion
     *
     * @param {ITableColumnInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableColumnDeletionForUndoRedo(args: ITableColumnInsertOptions): void;
    /**
     * Handles undo/redo recording for table cell clearance.
     *
     * @param {ITableCellsClearOperation} args - The arguments for table cell clearance.
     * @returns {void}
     * @hidden
     */
    trackTableCellsClearForUndoRedo(args: ITableCellsClearOperation): void;
    /**
     * Handles undo/redo recording for table cell level paste.
     *
     * @param {ITableCellsPasteOperation} args - The arguments for table cell paste.
     * @returns {void}
     * @hidden
     */
    trackTableCellsPasteForUndoRedo(args: ITableCellsPasteOperation): void;
    /**
     * Handles undo/redo recording for table header input.
     *
     * @param {ITableHeaderInputOperation} args - The arguments for table header input.
     * @returns {void}
     * @hidden
     */
    trackTableHeaderInputForUndoRedo(args: ITableHeaderInputOperation): void;
    /**
     * Handles undo/redo recording for table bulk row deletions
     *
     * @param {IBulkRowsDeleteOperation} args - The arguments for bulk rows deletion.
     * @returns {void}
     * @hidden
     */
    trackBulkRowDeletionForUndoRedo(args: IBulkRowsDeleteOperation): void;
    /**
     * Handles undo/redo recording for table bulk column deletions
     *
     * @param {IBulkColumnsDeleteOperation} args - The arguments for bulk column deletion.
     * @returns {void}
     * @hidden
     */
    trackBulkColumnDeletionForUndoRedo(args: IBulkColumnsDeleteOperation): void;
    /**
     * Handles undo/redo recording for table column resize operations
     *
     * @param {ITableColumnResizeOperation} data - The arguments for column resize
     * @returns {void}
     * @hidden
     */
    trackTableColumnResizeForUndoRedo(data: ITableColumnResizeOperation): void;
    /**
     * Checks whether the undo stack is empty or not.
     *
     * @returns {boolean} Returns true if the undo stack is not empty.
     * @hidden
     */
    canUndo(): boolean;
    /**
     * Checks whether the redo stack is empty or not.
     *
     * @returns {boolean} Returns true if the redo stack is not empty.
     * @hidden
     */
    canRedo(): boolean;
    /**
     * Clears the undo and redo stack.
     *
     * @returns {void}
     * @hidden
     */
    clear(): void;
    destroy(): void;
    /**
     * Adjusts undo and redo stacks to respect the new undoRedoStack limit
     *
     * @returns {void}
     * @hidden
     */
    adjustUndoRedoStacks(): void;
    /**
     * Applies the next future action during redo without emitting external push/pop changes.
     * Used internally for formatting flows to replay adjacent actions.
     *
     * @returns {void}
     */
    applyNextRedoSibling(): void;
    /**
     * Applies the previous action during undo without emitting external push/pop changes.
     * Used internally for formatting flows to replay adjacent actions.
     *
     * @returns {void}
     */
    applyNextUndoSibling(): void;
}
