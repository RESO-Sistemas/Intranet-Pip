import { StyleModel } from '../../models/index';
/**
 * Generates a unique ID with an optional prefix.
 *
 * @param {string} [prefix] - An optional prefix to differentiate models (e.g., "block", "user").
 * @returns {string} A unique ID consisting of a timestamp and random characters.
 */
export declare function generateUniqueId(prefix?: string): string;
/**
 * Calculates the absolute offset of a given node within its parent element.
 *
 * @param {HTMLElement} element - The parent element.
 * @param {Node} node - The node to calculate the offset for.
 * @param {number} relativeOffset - The offset relative to the node.
 * @returns {number} The absolute offset of the node within the parent element.
 */
export declare function getAbsoluteOffset(element: HTMLElement, node: Node, relativeOffset: number): number;
/**
 * Cleans up an HTML element by removing it from the DOM and setting its reference to null.
 *
 * @param {HTMLElement} element - The HTML element to clean up.
 * @returns {void}
 */
export declare function cleanupElement(element: HTMLElement | null): void;
/**
 * Returns the parent element if node is given or returns the element itself
 *
 * @param {Node} node - Node to get parent element.
 * @returns {HTMLElement} - The parent element
 */
export declare function getParentElement(node: Node): HTMLElement;
/**
 * Gets template content based on the template property value.
 *
 * @param {string | Function} template - Template property value.
 * @returns {Function} - Return template function.
 * @hidden
 */
export declare function getTemplateFunction(template: string | HTMLElement | Function): Function;
/**
 * Normalizes a selection range to ensure accurate text-node-based start/end.
 * Handles deep nesting, partial selections, and boundary cases without over-expansion.
 *
 * @param {Range} range - The raw selection range
 * @returns {void} Normalized range with text-node containers
 */
export declare function normalizeRange(range: Range): Range;
/**
 * Creates an isolated copy of a model with independent references for all nested objects.
 *
 * This function creates a new instance of a model where all nested objects (including props,
 * styles, and other references) are also copied, preventing unintended modifications to the
 * original model or shared references. Use this function when you need to manipulate a model
 * without affecting other parts of the application that may reference the same object.
 *
 * @template T The type of the model to isolate
 * @param {T} item The original model to create an isolated copy from
 * @returns {T} A new instance of the model with independent references
 */
export declare function decoupleReference<T>(item: T): T;
export declare function getInverseStyle(style: string): keyof StyleModel;
/**
 * Normalize URL by adding protocol if missing
 *
 * @param {string} url - URL to normalize.
 * @returns {string} - Normalized URL.
 */
export declare function normalizeUrl(url: string): string;
/**
 * Denormalize URL by removing protocol if present
 *
 * @param {string} url - URL to denormalize.
 * @returns {string} - Denormalized URL.
 */
export declare function denormalizeUrl(url: string): string;
/**
 * Checks whether the given node is around special elements.
 * Some special elements are 'a', etc.
 *
 * @param {Node | null} node - The node to check.
 * @returns {boolean} - True if the node is around special elements, false otherwise.
 */
export declare function isNodeAroundSpecialElements(node: Node | null): boolean;
/**
 * Gets the deepest text node within an element
 *
 * @param {HTMLElement} element - The container element
 * @returns {Node} - The deepest text node or null if no text node is found
 */
export declare function getDeepestTextNode(element: HTMLElement): Node;
/**
 * Returns the auto generated avatar color based on the seed.
 *
 * @param {string} seed - The seed string to generate the color.
 * @returns {string} - The generated color.
 */
export declare function getAutoAvatarColor(seed: string): string;
/**
 * Returns the user initials based on the name.
 *
 * @param {string} name - The name to generate initials from.
 * @returns {string} - The generated initials.
 */
export declare function getUserInitials(name: string): string;
/**
 * Returns the best accessible foreground color (black or white)
 * for a given background color to ensure good contrast.
 *
 * @param {string} backgroundColor - The background color in any CSS-supported format (hex, rgb, etc.)
 * @returns {string} - '#000000' or '#ffffff'
 */
export declare function getAccessibleTextColor(backgroundColor: string): string;
export declare function getNormalizedKey(e: KeyboardEvent): string;
export declare function normalizeCode(code: string): string;
export declare function createSvgElement<K extends keyof SVGElementTagNameMap>(tagName: K, attributes: {
    [key: string]: string | undefined;
}): SVGElementTagNameMap[K];
export declare function createBaseSvg(viewBox?: string): SVGSVGElement;
/**
 * @returns {number} A cryptographically secure random number.
 * @hidden
 */
export declare function getRandomNumber(): number;
