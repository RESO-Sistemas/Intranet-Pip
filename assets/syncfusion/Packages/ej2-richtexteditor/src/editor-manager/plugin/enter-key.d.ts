import { IEditorModel } from '../../common/interface';
export declare class EnterKeyAction {
    private parent;
    private range;
    private startNode;
    private endNode;
    private specialElementCursor;
    private enterKey;
    private shiftEnterKey;
    private nodeSelection;
    private isEntireRTE;
    private isEnterInCaption;
    constructor(parent: IEditorModel);
    private destroy;
    private addEventListener;
    private removeEventListener;
    private actionHandler;
    private enterHandler;
    private getRangeNode;
    /**
     * Returns the `.e-img-inner` container if both range start and end are inside the same caption.
     * Otherwise returns null.
     *
     * @returns {HTMLElement | null} The caption container when both ends are inside it, otherwise null.
     */
    private getCaptionContainerForRange;
    isEnterActionAllowed(originalEvent: KeyboardEvent): boolean;
    private enterAtTableSide;
    private enterKeyAtMediaSide;
    private triggerActionCompleteCallBack;
    private isCursorAtStart;
    private isCursorAtEnd;
    private getLastChild;
    /**
     * Clones the DOM up to the given range position, even if nothing is selected.
     * Ensures parent hierarchy is preserved (e.g., <p><strong></strong></p>).
     *
     * @param {Range} range - The range where the cursor is placed.
     * @param {boolean} skipBlock - Whether to generate only a block element based on enter key configuration or not.
     * @param {boolean} isShiftKey - Whether the Shift key is pressed.
     *
     * @returns {DocumentFragment} - A fragment with empty structure up to the cursor.
     */
    cloneNodePreservingStructure(range: Range, skipBlock: boolean, isShiftKey: boolean): DocumentFragment;
    cloneNodePreservingStructureBR(range: Range, skipBlock: boolean, isShiftKey: boolean): DocumentFragment;
    private isTableOrImageStart;
    private isTableOrImageEnd;
    private processedTableImageCursor;
    private shiftEnterHandler;
    private shiftEnterAtTableSide;
    private shiftEnterAtMediaSide;
    private getBRInsertReferenceNode;
    private isTextNodeInfrontOfImage;
    private isTextNodeAfterImage;
    private handleSelectionEnter;
    private hasMediaInSelectionRange;
    private isStartDirectRange;
    private isEndDirectRange;
    private getStartBlocKParent;
    private isSpecialElemDirectStartRange;
    private isSpecialElemDirectEndRange;
    private isValidSpecialElement;
    private getSpecialElementType;
    private isEmptyTextNodeAfterMentionChip;
    /**
     * Checks if there's only BR elements (and/or whitespace) before the cursor position.
     * Used to determine if content should be preserved when pressing Enter.
     *
     * @param {HTMLElement} blockParent - The block element containing the cursor.
     * @returns {boolean} - True if only BRs and whitespace exist before cursor, false otherwise.
     */
    private hasOnlyBRBeforeCursor;
    private enterAtHorizontalLine;
}
