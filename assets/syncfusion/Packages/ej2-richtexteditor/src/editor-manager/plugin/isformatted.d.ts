/**
 * Is formatted or not.
 *
 * @hidden
 * @private
 */
export declare class IsFormatted {
    static inlineTags: string[];
    /**
     * getFormattedNode method
     *
     * @param {Node} node - specifies the node.
     * @param {string} format - specifies the string value.
     * @param {Node} endNode - specifies the end node
     * @returns {Node} - returns the node
     * @hidden
     * @private
     */
    getFormattedNode(node: Node, format: string, endNode: Node): Node;
    private getFormatParent;
    /**
     * Checks if the node is formatted with specified format
     *
     * @param {Node} node - specifies the node.
     * @param {string} format - specifies the format type.
     * @returns {boolean} - returns whether the node has the specified formatting
     * @hidden
     * @private
     */
    isFormattedNode(node: Node, format: string): boolean;
    /**
     * isBold method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isBold(node: Node): boolean;
    /**
     * isItalic method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isItalic(node: Node): boolean;
    /**
     * isUnderline method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isUnderline(node: Node): boolean;
    /**
     * isStrikethrough method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isStrikethrough(node: Node): boolean;
    /**
     * isSuperscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isSuperscript(node: Node): boolean;
    /**
     * isSubscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isSubscript(node: Node): boolean;
    private isFontColor;
    private isBackgroundColor;
    private isFontSize;
    private isFontName;
    /**
     * isCode method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    static isCode(node: Node): boolean;
}
