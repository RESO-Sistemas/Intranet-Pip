import { IEditorModel } from '../../common';
import { ClipboardWriteEventArgs } from '../../common/interface';
/**
 * ClipBoardCleanup internal component
 *
 * @hidden
 */
export declare class ClipBoardCleanupAction {
    private parent;
    private editableElement;
    private isTableSelection;
    /**
     * Constructor for creating the component
     *
     * @param {IEditorModel} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: IEditorModel);
    private addEventListener;
    private removeEventListener;
    /**
     * Handles the clipboard data processing for cut/copy operations
     *
     * @param {Range} range - The current selection range in the document
     * @param {Element} editableElement - The editable container element
     * @param {string} operation - The clipboard operation type ('cut', 'copy')
     * @returns {ClipboardWriteEventArgs} - An object containing HTML and plain text content for clipboard operations
     */
    handleClipboardProcessing(range: Range, editableElement: Element, operation: string): ClipboardWriteEventArgs;
    private fullBlockElementCursorPosition;
    private adjustCursorAfterMediaCut;
    private isFullLISelected;
    private wrapListStructureForClipboard;
    private extractClipboardContentFromSelection;
    private handleNestedTableHtmlContent;
    private isClosestToSameTableCellEle;
    private normalizeInlineElementWrapping;
    private getHTMLFromSelectionRange;
    private getWrappedAroundInlineElement;
    private containsMediaElement;
    private collectTablesFromSelection;
    private locateOutermostTableAncestor;
    private isSelectionInsideNestedTable;
    private clearSelectedTableContent;
    private removeSelectedNodes;
    private processSelectedContentWithinRange;
    private traverseElementTextNodes;
    private isFullHTMLElementSelected;
    private hasContainsAnyBlockNode;
    private removeEmptyTables;
    private adjustCursorPostTableCut;
    private removeEmptyTableElement;
    private clearIntersectingContent;
    private removeEmptyContentContainer;
    private extractUnselectedTextContent;
    private isContentContainerEmpty;
    private hasMoreThanOneBRElement;
    private cleanEmptyInlineBoundaries;
    private removeInlineWrapper;
    private restructureContentPostCut;
    private setParentLICursorPosition;
    private getStartRangeEmptyElement;
    private getEndRangeEmptyElement;
    private isParentLIEmpty;
    private isSelectionCoveringSingleBlock;
    private removeDomElement;
    private extractInlineContentFromBlock;
    private getDeeptestBlockElement;
    private getFirstBlockElement;
    private mergeContentAcrossBlocks;
    private mergeContentWithinSameContainer;
    private setCursorPosition;
    private extractTextFromHtmlNode;
    private serializeTableToPlainText;
    /**
     * Cleans up resources when the component is destroyed
     *
     * @returns {void} - No return value
     * @public
     */
    destroy(): void;
}
