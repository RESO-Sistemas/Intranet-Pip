import { ExecCommandOptions } from '../../../common/interface';
import { BlockManager } from '../../base/block-manager';
export declare class FormattingHandler {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Applies or removes a specific formatting style to a given node within a selection range.
     *
     * This method handles the process of wrapping the target node with the appropriate formatting element
     * or unwrapping/removing styles if the formatting is already present. It ensures that the formatting
     * is correctly applied or removed without disrupting the document structure.
     *
     * @param {Range} range - Optional range object representing the current selection, used for precise node splicing.
     * @param {string} format - The style property to modify, such as 'bold', 'italic', 'color', etc.
     * @param {ExecCommandOptions} options - Options to apply formatting
     * @returns {void}
     */
    executeFormat(range: Range, format: string, options: ExecCommandOptions): void;
    /**
     * Applies or removes a specific formatting style to a given node within a selection range.
     *
     * @param {Node} node - The DOM node to which the formatting will be applied or removed.
     * @param {string} format - The style property to modify, such as 'bold', 'italic', 'color', etc.
     * @param {string} value - Optional value for the style, e.g., color, bgColor or link.
     * @param {Range} range - Optional range object representing the current selection, used for precise node splicing.
     * @returns {void}
     */
    private applyFormatToNode;
    /**
     * Remove formatting from a node by unwrapping or clearing styles.
     *
     * This method locates the formatted node within the selection,
     * then either unwraps it from its formatting element or clears inline styles.
     *
     * @param {Node} node - The node from which to remove formatting.
     * @param {string} format - The format type to remove.
     * @param {Range} [range] - Optional range to assist in node splicing.
     * @returns {void}
     */
    private removeFormatFromNode;
    private unwrapElement;
    private createFormatElement;
    private createStyledSpan;
    /**
     * Update the style value of an element for value-based formats.
     * This replaces the existing value instead of removing and re-wrapping.
     *
     * @param {Node} node - The node containing the styled content
     * @param {string} format - The format to update
     * @param {string} value - The new value for the style
     * @param {Range} range - Optional range for node splicing
     * @returns {void}
     */
    private updateNodeValue;
    private removeStyleFromElement;
    private isStyleBased;
    private cleanupRange;
    private mergeAdjacentTags;
}
