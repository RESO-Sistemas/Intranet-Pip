import { ISplitContentData } from '../interface';
export declare class NodeCutter {
    /**
     * Split node at both selection boundaries (start and end).
     *
     * After this method:
     * - Start boundary: content before selection is isolated from selected content
     * - End boundary: selected content is isolated from content after
     * Result: Selected content can be cleanly operated on
     *
     * @param {Range} range - The selection range
     * @param {Node} node - The node to split
     * @returns {Node} - The node containing the selected content
     */
    getSpliceNode(range: Range, node: Node): Node;
    /**
     * Split a single node at one boundary of the range.
     *
     * If isStart is true: Splits at the START boundary
     *   - Moves content before selection out of the node
     *   - Leaves selected content and content after in the node
     *
     * If isStart is false: Splits at the END boundary
     *   - Moves content after selection out of the node
     *   - Leaves content before and selected content in the node
     *
     * @param {Range} range - The selection range
     * @param {Node} node - The node to split
     * @param {boolean} isStart - If true, split at start boundary; if false, split at end boundary
     * @returns {Node} - The node after splitting
     */
    private splitNode;
    /**
     * Check if a fragment is effectively empty (only contains whitespace, no meaningful content)
     *
     * @param {DocumentFragment} fragment - Fragment to check
     * @returns {boolean} - Whether the fragment is empty
     */
    private isEmptyFragment;
    /**
     * Get the index of a node among its siblings
     *
     * @param {Node} node - The node to get index for.
     * @returns {number} - The index of the node
     */
    private getNodeIndex;
    /**
     * Splits the content of a block at a specified node and offset.
     * Used for block operations like Enter key (splitting paragraphs) and paste operations.
     *
     * @param {HTMLElement} contentElement - The content element of the block
     * @param {Node} splitNode - The node at which to split the content
     * @param {number} splitOffset - The offset within the split node at which to split
     * @returns {ISplitContentData} - Contains beforeFragment and afterFragment
     * @hidden
     */
    splitContent(contentElement: HTMLElement, splitNode: Node, splitOffset: number): ISplitContentData;
}
