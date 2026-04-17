/**
 * Split the Node based on selection
 *
 * @hidden
 * @private
 */
export declare class NodeCutter {
    enterAction: string;
    position: number;
    private nodeSelection;
    /**
     * GetSpliceNode method
     *
     * @param {Range} range - specifies the range
     * @param {HTMLElement} node - specifies the node element.
     * @returns {Node} - returns the node value
     * @hidden
     * @private
     */
    GetSpliceNode(range: Range, node: HTMLElement): Node;
    /**
     * @param {Range} range - specifies the range
     * @param {HTMLElement} node - specifies the node element.
     * @param {boolean} isCollapsed - specifies the boolean value
     * @returns {HTMLElement} - returns the element
     * @hidden
     * @private
     */
    SplitNode(range: Range, node: HTMLElement, isCollapsed: boolean): HTMLElement;
    private isRteElm;
    private spliceEmptyNode;
    private GetCursorStart;
    /**
     * GetCursorRange method
     *
     * @param {Document} docElement - specifies the document
     * @param {Range} range - specifies the range
     * @param {Node} node - specifies the node.
     * @returns {Range} - returns the range value
     * @hidden
     * @private
     */
    GetCursorRange(docElement: Document, range: Range, node: Node): Range;
    /**
     * GetCursorNode method
     *
     * @param {Document} docElement - specifies the document
     * @param {Range} range - specifies the range
     * @param {Node} node - specifies the node.
     * @returns {Node} - returns the node value
     * @hidden
     * @private
     */
    GetCursorNode(docElement: Document, range: Range, node: Node): Node;
    /**
     * TrimLineBreak method
     *
     * @param {string} line - specifies the string value.
     * @returns {string} - returns the string
     * @hidden
     * @private
     */
    TrimLineBreak(line: string): string;
}
