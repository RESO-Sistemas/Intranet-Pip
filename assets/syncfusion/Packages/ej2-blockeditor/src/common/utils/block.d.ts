import { BlockModel, TableCellModel, ContentModel } from '../../models/index';
import { BlockType } from '../../models/enums';
import { IBlocksContainerInfo } from '../interface';
/**
 * Gets a block type from the element
 *
 * @param {HTMLElement} blockElement - The block element.
 * @returns {string} The block type
 */
export declare function extractBlockTypeFromElement(blockElement: HTMLElement): string;
/**
 * Finds a block by its ID.
 *
 * Searches recursively through the list of blocks to find a block with the specified ID.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {BlockModel | null} The matching block or null if not found.
 */
export declare function getBlockModelById(blockId: string, blocks: BlockModel[]): BlockModel | null;
/**
 * Gets the index of a specific block element within the blocks array.
 *
 * @param {string} id - The id of the block element.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {number} The index of the block element in the blocks array, or -1 if not found.
 */
export declare function getBlockIndexById(id: string, blocks: BlockModel[]): number;
/**
 * Retrieves the content model associated with a specific DOM node within the block structure.
 *
 * @param {Node | null} node - The DOM node for which to find the corresponding content model.
 * @param {BlockModel[]} blocks - The list of blocks to search within.
 * @returns {ContentModel | null} - The content model corresponding to the node, or null if not found.
 */
export declare function getContentModelByNode(node: Node | null, blocks: BlockModel[]): ContentModel | null;
/**
 * Calculates the absolute offset of a target node within a content element.
 *
 * @param {Node} targetNode - The DOM node whose offset is to be calculated.
 * @param {HTMLElement} contentElement - The root content element containing the target node.
 * @returns {number} - The absolute offset position of the target node, or -1 if not found.
 */
export declare function getAbsoluteOffsetOfNode(targetNode: Node, contentElement: HTMLElement): number;
/**
 * Finds the model within a block that corresponds to a specific text offset.
 * Traverses the content array of the block to locate the model containing the offset.
 *
 * @param {BlockModel} block - The block containing content models.
 * @param {number} offset - The absolute text offset to locate.
 * @returns {ContentModel | null} - The content model at the specified offset or null if not found.
 */
export declare function findModelByTextOffset(block: BlockModel, offset: number): ContentModel | null;
/**
 * Gets the content models that span the specified node within the blocks.
 *
 * @param {Node} node - The DOM node inside a block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {ContentModel[]} - An array of ContentModel objects that the node spans.
 */
export declare function getContentModelsByNode(node: Node, blocks: BlockModel[]): ContentModel[];
/**
 * Returns the blocks array that directly contains the given block id.
 * This may be the root blocks, a container block's children, or a table cell's blocks.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {BlockModel[]} The corresponding container array or null if not found.
 */
export declare function getParentBlocksArray(blockId: string, blocks: BlockModel[]): BlockModel[];
/**
 * Returns container info for the array that contains the given block id.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {IBlocksContainerInfo} The block container info or null if not found.
 */
export declare function getContainerInfo(blockId: string, blocks: BlockModel[]): IBlocksContainerInfo;
/**
 * Locate a table cell by its id and return the Cell model.
 *
 * @param {string} cellId - Id of the cell
 * @param {BlockModel[]} blocks - Collection of blocks
 * @returns {TableCellModel} - An object of cell model
 */
export declare function findCellById(cellId: string, blocks: BlockModel[]): TableCellModel;
/**
 * Gets the parent block.
 *
 * @param {HTMLElement | Node} element - The element for which you need to find the parent.
 * @returns {HTMLElement | null} The parent element if found, otherwise null.
 */
export declare function getParentBlock(element: HTMLElement | Node): HTMLElement | null;
/**
 * Gets the adjacent block of the current block based on the direction.
 *
 * @param {HTMLElement} currentBlock - The current block element.
 * @param {string} direction - The direction to find the adjacent block ('previous' or 'next').
 * @returns {HTMLElement | null} The adjacent block element if found, otherwise null.
 */
export declare function getAdjacentBlock(currentBlock: HTMLElement, direction: string): HTMLElement | null;
/**
 * Gets the actual content element inside the block.
 *
 * @param {HTMLElement} blockElement - The block element.
 * @returns {HTMLElement | null} The content element inside the block if found, otherwise null.
 */
export declare function getBlockContentElement(blockElement: HTMLElement): HTMLElement | null;
/**
 * Gets the adjacent cell of the current cell based on the direction.
 *
 * @param {HTMLElement} table - The table element.
 * @param {string} direction - The direction to find the adjacent cell ('up', 'down', 'left', 'right').
 * @param {HTMLTableCellElement} currentCell - The current cell element.
 * @returns {HTMLElement | null} The adjacent cell element if found, otherwise null.
 */
export declare function getAdjacentCell(table: HTMLElement, direction: string, currentCell: HTMLTableCellElement): HTMLElement | null;
/**
 * Specifies whether the given block is a list type block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a list type block, otherwise false.
 */
export declare function isListTypeBlock(blockType: string | BlockType): boolean;
/**
 * Specifies whether the given block is a children type block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a children type block, otherwise false.
 */
export declare function isChildrenTypeBlock(blockType: string | BlockType): boolean;
/**
 * Specifies whether the given element is a divider block.
 *
 * @param {HTMLElement} blockElement - The block element to check.
 * @returns {boolean} - Returns true if the block is a divider block, otherwise false.
 */
export declare function isDividerBlock(blockElement: HTMLElement): boolean;
/**
 * Specifies whether the given block is a non content editable block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a non content editable block, otherwise false.
 */
export declare function isNonContentEditableBlock(blockType: string | BlockType): boolean;
/**
 * Specifies whether the cursor is at edge of the block.(start or end)
 *
 * @param {HTMLElement} contentElement - The content element to check.
 * @param {boolean} isStart - Specifies whether to check for start or end of the block.
 * @returns {boolean} - Returns true if the cursor is at edge of the block, otherwise false.
 */
export declare function isCursorAtEdge(contentElement: HTMLElement, isStart: boolean): boolean;
/**
 * Returns true if the current selection is at the start of the block.
 *
 * @param {HTMLElement} element - The block element to check.
 * @returns {boolean} True if the selection is at the start of the block, false otherwise.
 */
export declare function isAtStartOfBlock(element: HTMLElement): boolean;
/**
 * Returns true if the current selection is at the end of the block.
 *
 * @param {HTMLElement} element - The block element to check.
 * @returns {boolean} True if the selection is at the end of the block, false otherwise.
 */
export declare function isAtEndOfBlock(element: HTMLElement): boolean;
/**
 * Normalizes an element into a content element.
 *
 * @param {HTMLElement | Node} element - The element to normalize.
 * @returns {HTMLElement | Node} The normalized content element.
 *
 */
export declare function normalizeIntoContentElement(element: HTMLElement | Node): HTMLElement | Node;
/**
 * Removes empty text nodes from the given element.
 *
 * @param {HTMLElement | Node} element - The element to remove empty nodes from.
 * @returns {HTMLElement | Node} The normalized content element.
 *
 */
export declare function removeEmptyTextNodes(element: HTMLElement | Node): void;
export declare function cleanCheckmarkElement(blockElement: HTMLElement): void;
export declare function isEmptyString(id: string): boolean;
export declare function isChildrenProp(block: BlockModel): boolean;
export declare function isAlwaysOnPlaceHolderBlk(blockType: string): boolean;
export declare function isNonMergableBlock(blockElement: HTMLElement): boolean;
/**
 * Gets the adjacent block of the current block based on the direction.
 *
 * @param {HTMLElement} currentBlock - The current block element.
 * @param {string} direction - The direction to find the adjacent block ('previous' or 'next').
 * @returns {HTMLElement | null} The adjacent block element if found, otherwise null.
 */
export declare function getTargetBlock(currentBlock: HTMLElement, direction: string): HTMLElement | null;
export declare function getBlockSpecificRange(globalRange: Range, blockElement: HTMLElement): Range;
