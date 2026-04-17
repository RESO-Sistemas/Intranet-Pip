export declare class FormattingHelper {
    private static validBoldTags;
    private static validItalicTags;
    private static validUnderlineTags;
    private static validStrikethroughTags;
    private static validSuperscriptTags;
    private static validSubscriptTags;
    private static validInlineCodeTags;
    private static inlineTagsSet;
    /**
     * isBold method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isBold(node: Node): boolean;
    /**
     * isItalic method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isItalic(node: Node): boolean;
    /**
     * isUnderline method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isUnderline(node: Node): boolean;
    /**
     * isStrikethrough method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isStrikethrough(node: Node): boolean;
    /**
     * isSuperscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isSuperscript(node: Node): boolean;
    /**
     * isSubscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isSubscript(node: Node): boolean;
    /**
     * isInlineCode method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isInlineCode(node: Node): boolean;
    /**
     * isLink method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isLink(node: Node): boolean;
    static getLinkUrl(node: Node): string;
    static getFontColor(node: Node): string;
    static getBackgroundColor(node: Node): string;
    private static getStyleProperty;
    /**
     * Converts RGB/RGBA color to hex format. If already hex or other format, returns as-is.
     *
     * @param {string} color - The color string (e.g., 'rgb(255, 0, 0)' or '#FF0000')
     * @returns {string} - The normalized color in hex format
     */
    private static normalizeColor;
    /**
     * Check if a node has a specific format by traversing UP the DOM tree.
     *
     * @param {Node} node - The node to check
     * @param {string} format - The format to search for
     * @param {Node} endNode - Stop traversing at this node (usually block boundary)
     * @returns {HTMLElement | null} - The format element if found, null otherwise
     */
    static getFormattedNode(node: Node, format: string, endNode?: Node): HTMLElement | null;
    /**
     * Count how many nodes in an array have a specific format.
     *
     * Used for deciding: apply or remove?
     * - If count === nodes.length: all have format → remove
     * - If count < nodes.length: some lack format → apply
     *
     * @param {Node[]} nodes - Array of nodes to check
     * @param {string} format - Format to count
     * @param {Node} endNode - Stop traversing at this node
     * @returns {number} - Count of nodes with the format
     */
    static countFormatted(nodes: Node[], format: string, endNode?: Node): number;
    /**
     * Checks if a given HTMLElement has the specified format applied.
     *
     * @param {HTMLElement} element - The element to check
     * @param {string} format - The format to verify
     * @returns {boolean} - True if the element has the format, false otherwise
     */
    static isFormattedNode(element: HTMLElement, format: string): boolean;
    /**
     * Determine if should apply or remove format
     * Based on whether all selected nodes have the format
     *
     * @param {Node[]} nodes - Nodes to perform check
     * @param {string} format - format to toggle
     * @param {Node} endNode - Optional node to limit traversal
     * @returns {boolean} - Whether to remove format or not
     */
    static shouldRemoveFormat(nodes: Node[], format: string, endNode?: Node): boolean;
}
