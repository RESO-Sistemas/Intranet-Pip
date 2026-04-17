import { ContentModel } from '../../models/index';
import { LinkData } from '../../common/interface';
/**
 * Finds the closest parent element that matches the specified selector.
 *
 * @param {Node | HTMLElement} element - The starting element
 * @param {string} selector - The CSS selector to match
 * @returns {HTMLElement | null} The closest matching parent element or null if not found
 */
export declare function findClosestParent(element: Node | HTMLElement, selector: string): HTMLElement | null;
/**
 * Gets the computed absolute position of an element relative to the document.
 *
 * @param {HTMLElement} element - The element to get the position for
 * @returns {DOMRect} The element's position and dimensions
 */
export declare function getElementRect(element: HTMLElement): DOMRect;
/**
 * Checks if a node is contained within a container element.
 *
 * @param {Node} node - The node to check
 * @param {HTMLElement} container - The container element
 * @returns {boolean} True if the node is inside the container, false otherwise
 */
export declare function isNodeInsideElement(node: Node, container: HTMLElement): boolean;
/**
 * Renders the given string in a temp element and returns the Dom text node.
 *
 * @param {string} content - The content to render
 * @returns {Node} - Rendered dom text node
 */
export declare function getDomTextNode(content: string): Node;
/**
 * Get all text nodes within a range
 *
 * @param {Range} range - Range to get nodes from
 * @returns {Node[]} - Collection of nodes
 */
export declare function getNodesInRange(range: Range): Node[];
/**
 * Creates formatting element based on the content model.
 *
 * @param {ContentModel} content - Content model.
 * @param {string | LinkData} value - Value to be set for the content.
 * @returns {Node} - Returns the formatted node.
 *
 */
export declare function createFormattingElement(content: ContentModel, value?: string | LinkData): Node;
/**
 * Wraps a node with a specified HTML tag.
 *
 * @param {Node} node - The node to wrap
 * @param {string} tagName - The HTML tag to wrap with
 * @returns {HTMLElement} The created wrapper element
 */
export declare function wrapNodeWithTag(node: Node, tagName: string): HTMLElement;
/**
 * Wraps a node with a span and applies the specified style.
 *
 * @param {Node} node - The node to wrap
 * @param {string} styleType - The type of style to apply
 * @param {string | boolean} value - The style value
 * @returns {HTMLElement} The created span element
 */
export declare function wrapNodeWithSpan(node: Node, styleType: string, value: string | boolean): HTMLElement;
/**
 * Removes all break tags from an HTML element.
 *
 * @param {HTMLElement} element - The element to clean
 * @returns {void}
 */
export declare function clearBreakTags(element: HTMLElement): void;
/**
 * Checks if an element is empty (contains only whitespace or a single <br> tag).
 *
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is empty, false otherwise
 */
export declare function isElementEmpty(element: HTMLElement): boolean;
/**
 * Removes all content after the split point from the current block.
 * Handles nested structures by walking up the tree and removing siblings after each level.
 *
 * @param {Node} splitPoint - The node where split occurred (startContainer after split)
 * @param {HTMLElement} contentElement - The top-level .e-block-content element (stop boundary)
 * @returns {void}
 */
export declare function removeNodesAfterSplit(splitPoint: Node, contentElement: HTMLElement): void;
export declare function getDeepestNodeAndOffset(container: Node, offset: number): {
    node: Text;
    offset: number;
};
