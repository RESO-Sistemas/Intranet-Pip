import { BlockModel, ContentModel, StyleModel } from '../../models/index';
import { IAddBlockOptions, IRemoveBlockOptions, IDuplicateBlockOptions, IIndentBlockOptions, IMoveBlockOptions, IFromBlockData, LinkData } from '../../common/interface';
/**
 * Service responsible for core block-related logics that updates model
 */
export declare class BlockService {
    blocks: BlockModel[];
    constructor(blocks: BlockModel[]);
    /**
     * Adds a new block to the provided blocks array
     *
     * @param {IAddBlockOptions} options - Options for creating the block
     * @returns {BlockModel} - The newly added block model
     * @hidden
     */
    addBlock(options: IAddBlockOptions): BlockModel;
    /**
     * Removes a block model from the blocks array
     *
     * @param {IRemoveBlockOptions} options - Options for removing the block
     * @returns {{ removedBlock: BlockModel, blockIndex: number }} The removed block and its index
     * @hidden
     */
    removeBlock({ blockId }: IRemoveBlockOptions): {
        removedBlock: BlockModel;
        blockIndex: number;
    };
    /**
     * Updates a block with the provided properties
     *
     * @param {string} blockId - The ID of the block to update
     * @param {Partial<BlockModel>} properties - The properties to update
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {BlockModel} Updated block and blocks array
     * @hidden
     */
    updateBlock(blockId: string, properties: Partial<BlockModel>): BlockModel;
    /**
     * Duplicates the given block model
     *
     * @param {IDuplicateBlockOptions} options - Options for duplicating the block
     * @returns {BlockModel} The duplicated block model or null
     * @hidden
     */
    duplicateBlock({ blockId }: IDuplicateBlockOptions): BlockModel;
    /**
     * Moves the given block model to a new position
     *
     * @param {IMoveBlockOptions} options - Options for moving the block}
     * @returns {void}
     * @hidden
     */
    moveBlocks(options: IMoveBlockOptions): IFromBlockData[];
    /**
     * Handles the indent/outdent of block
     *
     * @param {IIndentBlockOptions} options - Options to indent/unindent block
     * @returns {BlockModel} - The updated block model
     * @hidden
     */
    applyIndentation(options: IIndentBlockOptions): BlockModel;
    /**
     * Handles the line break of block
     *
     * @param {number} insertOffset - The offset at which to insert the line break
     * @param {ContentModel} contentModel - The content model to update
     * @returns {void}
     * @hidden
     */
    applyLineBreak(insertOffset: number, contentModel: ContentModel): void;
    /**
     * Updates the block content with given data
     *
     * @param {string} blockId The id of the block
     * @param {ContentModel[]} content The content to update
     * @returns {void}
     * @hidden
     */
    updateContent(blockId: string, content: ContentModel[]): void;
    /**
     * Toggles formatting style on content model
     *
     * @param {ContentModel} content - The content model to update
     * @param {any} format - The format to toggle (eg. Bold, Italic)
     * @param {boolean} force - Whether to force the format intent
     * @param {boolean} formatIntent - Whether to apply or remove the format
     * @param {string} value - The value for non-boolean styles
     * @returns {ContentModel} - The updated content model
     * @hidden
     */
    toggleContentStyles(content: ContentModel, format: keyof StyleModel, force?: boolean, formatIntent?: boolean, value?: string): ContentModel;
    /**
     * Applies link formatting to content model
     *
     * @param {ContentModel} content - The content model to update
     * @param {LinkData} linkData - The link data containing URL, text, and other properties
     * @returns {ContentModel} - The updated content model
     * @hidden
     */
    applyLinkFormatting(content: ContentModel, linkData: LinkData): ContentModel;
    /**
     * Assigns parent ID to multiple blocks
     *
     * @param {BlockModel[]} blocks - The blocks to update
     * @param {string} parentId - The parent ID to assign
     * @returns {void}
     * @hidden
     */
    assignParentIdToBlocks(blocks: BlockModel[], parentId: string): void;
    /**
     * Gets the index to adjust the block based on the given targetBlock.
     *
     * @param {BlockModel[]} insertionArray The target collection of blocks to insert.
     * @param {BlockModel} targetBlock The block after which the new block should be inserted.
     * @param {boolean} isAfter Specifies whether the new block should be inserted after the targetBlock.
     * @returns {number} The index at which the new block should be inserted.
     * @hidden
     */
    getIndexToAdjust(insertionArray: BlockModel[], targetBlock?: BlockModel, isAfter?: boolean): number;
    /**
     * Gathers information about blocks to be moved
     *
     * @param {string[]} fromBlockIds Array of block IDs to move
     * @returns {IFromBlockData[]} Array of block information objects
     * @hidden
     */
    gatherBlocksInfoForMove(fromBlockIds: string[]): IFromBlockData[];
    /**
     * Removes blocks from their current position in the model
     *
     * @param {IFromBlockData[]} fromEntries Array of block information objects
     * @returns {IFromBlockData[]} Array of removed block models
     * @hidden
     */
    removeBlocksForMove(fromEntries: IFromBlockData[]): IFromBlockData[];
    /**
     * Inserts blocks at the target position in the model
     *
     * @param {IFromBlockData[]} movedBlocks Array of block models to insert
     * @param {string} toBlockId Target block ID
     * @param {boolean} isMovingUp Whether blocks are moving up or down
     * @returns {void}
     * @hidden
     */
    private insertBlocksAtTarget;
    /**
     * Replaces a block at specific index in parent's children or root blocks array
     *
     * @param {string} originalBlockId - The ID of the block to replace
     * @param {BlockModel} newBlock - The new block to insert
     * @returns {void}
     * @hidden
     */
    replaceBlock(originalBlockId: string, newBlock: BlockModel): void;
    /**
     * Generates new IDs for the block and its content.
     *
     * @param {BlockModel} block The block model to generate new IDs for.
     * @param {string} parentId The parent ID of the block.
     * @returns {void} The block model with new IDs.
     * @hidden
     */
    generateNewIdsForBlock(block: BlockModel, parentId?: string): BlockModel;
    private generateNewIdsForTableBlock;
    /**
     * Merges partial block properties with an existing block
     *
     * @param {BlockModel} block - Original block model
     * @param {Partial<BlockModel>} properties - Partial properties to merge
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {BlockModel} Merged block model
     * @hidden
     */
    private mergeBlockProperties;
    /**
     * Merges a primitive type model with it's partial updates
     *
     * @param {any} existing - Existing model
     * @param {Partial<any>} updates - Partial updates
     * @returns {any} Merged model
     * @hidden
     */
    private mergePrimitiveTypes;
    /**
     * Gets the editor blocks data
     *
     * @returns {BlockModel[]} The editor blocks data
     * @hidden
     */
    getBlocks(): BlockModel[];
    /**
     * Sets the editor blocks data with the given blocks
     *
     * @param {BlockModel[]} blocks The blocks to set for the editor
     * @returns {void}
     * @hidden
     */
    setBlocks(blocks: BlockModel[]): void;
}
