import { IBlockSelectionState } from '../../common/interface';
/**
 * Returns the current text selection range.
 *
 * @returns {Range | null} The start and end indices of the selection range, or null if no selection is active.
 */
export declare function getSelectedRange(): Range | null;
/**
 * Sets the selection range in the editor.
 *
 * @param {Node} element - The HTML element to apply the selection range to.
 * @param {number} start - The start index of the selection.
 * @param {number} end - The end index of the selection.
 * @returns {void}
 */
export declare function setSelectionRange(element: Node, start: number, end: number): void;
/**
 * Moves the cursor to a specific position considering formatted content
 *
 * @param {HTMLElement} element The container element
 * @param {number} position Character position within entire content (not just text nodes)
 * @returns {void}
 */
export declare function setCursorPosition(element: HTMLElement, position: number): void;
export declare function getTextOffset(node: Node, within: HTMLElement): number;
/**
 * Captures the current selection state, including the start and end blocks and offsets.
 *
 * @returns {IBlockSelectionState | null} The selection state or null if no selection is active.
 */
export declare function captureSelectionState(): IBlockSelectionState | null;
/**
 * Retrieves the path from a block element to a target node.
 *
 * @param {HTMLElement} blockElement - The block element to start from.
 * @param {Node} targetNode - The target node to find the path to.
 * @returns {number[]} - The path as an array of indices.
 */
export declare function getPathFromBlock(blockElement: HTMLElement, targetNode: Node): number[];
/**
 * Retrieves a node from a block element using a path.
 *
 * @param {HTMLElement} blockElement - The block element to start from.
 * @param {number[]} path - The path as an array of indices.
 * @returns {Node | null} - The node at the specified path, or null if not found.
 */
export declare function getNodeFromPath(blockElement: HTMLElement, path: number[]): Node | null;
