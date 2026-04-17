import { BlockModel } from '../../../models/index';
import { IUndoRedoState } from '../../../common/interface';
import { UndoRedoAction } from '../../actions/undo';
import { BlockManager } from '../../base/block-manager';
import { ITableColumnInsertOptions, ITableRowInsertOptions } from '../../base/interface';
/**
 * Manages undo redo actions for the BlockEditor component
 */
export declare class UndoRedoManager {
    private parent;
    undoRedoAction: UndoRedoAction;
    constructor(manager: BlockManager, action: UndoRedoAction);
    /**
     * Renders the block with the previous state
     *
     * @param {string} blockId - Specifies the block id
     * @param {BlockModel} oldBlock - Specifies the old block model
     * @param {BlockModel} newBlock - Specifies the new block model
     * @returns {void} - Returns void
     * @hidden
     */
    reRenderWithPreviousState(blockId: string, oldBlock: BlockModel, newBlock: BlockModel): void;
    /**
     * Handles the undo redo for formatting action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleFormattingUndoRedo(currentState: IUndoRedoState): void;
    /**
     * Moves the blocks into its original position
     *
     * @param {IMoveBlocksInteraction} args - Specifies the arguments for moving the blocks
     * @returns {void} - Returns void
     * @hidden
     */
    private moveBlocksIntoOriginalPosition;
    /**
     * Handles the block movement undo redo action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleBlockMovement(currentState: IUndoRedoState): void;
    /**
     * Re-transforms the block with the previous state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    reTransformBlocks(currentState: IUndoRedoState): void;
    /**
     * Handles undo/redo action for image insertion (placeholder → uploaded image)
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleImageInsertion(currentState: IUndoRedoState): void;
    /**
     * Handles undo redo action for multiple block transformations
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    reTransformMultipleBlocks(currentState: IUndoRedoState): void;
    /**
     * Handles undo redo action for multiple block deletions
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleMultipleBlocksUndoRedo(currentState: IUndoRedoState): void;
    private restoreDeletedBlocks;
    private restoreEntireEditor;
    private restorePartialDeletion;
    private restoreSingleBlock;
    private restoreMiddleBlocks;
    private reDeleteBlocks;
    /**
     * Handles the clipboard undo redo action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleClipboardActions(currentState: IUndoRedoState): void;
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
    processRowAction(data: ITableRowInsertOptions, apply: 'insert' | 'delete'): void;
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
    processColumnAction(data: ITableColumnInsertOptions, apply: 'insert' | 'delete'): void;
    /**
     * Handles undo/redo for table cell clearing.
     * On undo: restores each affected cell's previous blocks.
     * On redo: clears the blocks for each affected cell.
     *
     * @param { IUndoRedoState } state that contains blockId and a list of cells with previous blocks
     * @returns {void} - Returns void
     * @hidden
     */
    handleTableCellsCleared(state: IUndoRedoState): void;
    handleTableCellsPasted(state: IUndoRedoState): void;
    handleBulkRowsDeleted(currentState: IUndoRedoState): void;
    handleBulkColumnsDeleted(currentState: IUndoRedoState): void;
    handleTableHeaderUndoRedo(state: IUndoRedoState): void;
    handleTableColumnResized(state: IUndoRedoState): void;
    private handleClipboardUndo;
    private handleClipboardRedo;
    /**
     * Handles undo redo for block addition and deletion
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    blockAdditionDeletionUndoRedo(currentState: IUndoRedoState): void;
    /**
     * Creates block with given state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    createBlock(currentState: IUndoRedoState): void;
    /**
     * Removes block with given state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    removeBlock(currentState: IUndoRedoState): void;
}
