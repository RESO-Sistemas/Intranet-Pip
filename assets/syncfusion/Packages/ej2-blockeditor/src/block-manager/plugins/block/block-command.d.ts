import { BlockModel, BlockProperties, ContentModel } from '../../../models/index';
import { IAddBlockInteraction, IAddBulkBlocksInteraction, IDeleteBlockInteraction, IToBlockData, IIndentOperation, IMoveBlocksInteraction, ITransformBlockInteraction } from '../../../common/interface';
import { BlockManager } from '../../base/block-manager';
/**
 * Manages all block-related commands in the BlockEditor
 */
export declare class BlockCommand {
    private parent;
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager: BlockManager);
    private addEventListener;
    private removeEventListener;
    /**
     * Adds a new block to the editor
     *
     * @param {IAddBlockInteraction} args Options for adding new block
     * @returns {BlockModel} The newly created block model
     * @hidden
     */
    addBlock(args: IAddBlockInteraction): BlockModel;
    /**
     * Deletes a block from the editor
     *
     * @param {IDeleteBlockInteraction} args Options for the deletion
     * @returns {void}
     * @hidden
     */
    deleteBlock(args: IDeleteBlockInteraction): void;
    /**
     * Splits the current block at cursor position and creates a new block
     *
     * @param {IAddBlockInteraction} args - Options to split the block
     * @returns {void}
     * @hidden
     */
    splitBlock(args?: IAddBlockInteraction): void;
    /**
     * Deletes block at cursor
     *
     * @param {IDeleteBlockInteraction} args Optional additional arguments
     * @returns {void}
     * @hidden
     */
    deleteBlockAtCursor(args: IDeleteBlockInteraction): void;
    /**
     * Deletes non mergable block
     *
     * @param {IDeleteBlockInteraction} args Optional additional arguments
     * @returns {void}
     * @hidden
     */
    deleteNonMergableBlock(args: IDeleteBlockInteraction): void;
    /**
     * Handles Clipboard paste of bulk blocks in to the editor
     *
     * @param {IAddBulkBlocksInteraction} args Options for the bulk block addition
     * @returns {void}
     * @hidden
     */
    addBulkBlocks(args: IAddBulkBlocksInteraction): void;
    /**
     * Duplicates a block and inserts it above or below the original
     *
     * @param {Object} args The options to duplicate
     * @param {HTMLElement} args.blockElement The block element to duplicate
     * @param {'below'|'above'} args.direction Direction to insert the duplicated block
     * @returns {void}
     * @hidden
     */
    duplicateBlock(args: {
        blockElement: HTMLElement;
        direction: 'below' | 'above';
    }): void;
    /**
     * Handles the indentation of blocks
     *
     * @param {IIndentOperation} args - The arguments for indenting blocks
     * @returns {void}
     * @hidden
     */
    handleBlockIndentation(args: IIndentOperation): void;
    /**
     * Moves a block or group of blocks to a new position
     *
     * @param {IMoveBlocksInteraction} args Options for moving the block
     * @returns {void}
     * @hidden
     */
    moveBlock(args: IMoveBlocksInteraction): void;
    /**
     * Handles the selective deletion of blocks
     *
     * @param {KeyboardEvent} event The keyboard event
     * @returns {boolean} Whether the event was handled
     * @hidden
     */
    handleSelectiveDeletions(event: KeyboardEvent): boolean;
    /**
     * Handles the deletion of entire blocks
     *
     * @returns {void}
     * @hidden
     */
    handleEntireBlockDeletion(): void;
    /**
     * Handles multiple block deletion
     *
     * @param {BlockModel[]} selectedBlocks The selected blocks
     * @param {string} direction The direction of deletion ('previous' or 'next')
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {boolean} Whether the deletion was successful
     * @hidden
     */
    handleMultipleBlockDeletion(selectedBlocks: BlockModel[], direction?: 'previous' | 'next', isUndoRedoAction?: boolean): boolean;
    private populateTargetModelAndId;
    /**
     * Handles block transformation, converting one block type to another
     *
     * @param {string} newBlockType - The new block type to transform to
     * @param {BlockProperties} props - Optional properties for the new block type
     * @returns {void}
     * @hidden
     */
    transformBlocksForSelection(newBlockType: string, props?: BlockProperties): void;
    private resolveBlocksToTransform;
    private expandSelectedBlocks;
    private getSelectedCellBlocksFromTable;
    handleBlockTransformation(args: ITransformBlockInteraction): void;
    /**
     * Transforms an existing block into a different type
     *
     * @param {ITransformBlockInteraction} args options for transforming block
     * @returns {HTMLElement} - The transformed block element
     * @hidden
     */
    transformBlock(args: ITransformBlockInteraction): HTMLElement;
    /**
     * Transforms a block to normal paragraph block.
     *
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @param {BlockModel} blockModel - The block model to render.
     * @returns {void}
     * @hidden
     */
    transformBlockToParagraph(blockElement: HTMLElement, blockModel: BlockModel): void;
    /**
     * Creates a default empty block
     *
     * @param {boolean} shouldUpdateDom Whether to update the DOM
     * @param {string} blockId Optional block ID to use
     * @returns {BlockModel} The created block model or null
     * @hidden
     */
    createDefaultEmptyBlock(shouldUpdateDom?: boolean, blockId?: string): BlockModel;
    /**
     * Creates content models from a document fragment
     *
     * @param {DocumentFragment} fragment The document fragment
     * @returns {ContentModel[]} Array of content models
     * @hidden
     */
    getContentModelForFragment(fragment: DocumentFragment): ContentModel[];
    /**
     * Generates new IDs for the block and its content.
     *
     * @param {string} destinationBlockId The ID of the destination block.
     * @returns {IToBlockData | null} The destination block data or null if not found.
     * @hidden
     */
    getDestinationBlockDataForMove(destinationBlockId: string): IToBlockData | null;
    /**
     * Creates a new block model based on provided arguments
     *
     * @param {IAddBlockInteraction} args - Options for creating the block
     * @returns {BlockModel} - The new block model
     * @hidden
     */
    private prepareBlock;
    transformToggleBlocksAsRegular(blockElement: HTMLElement): void;
    destroy(): void;
}
