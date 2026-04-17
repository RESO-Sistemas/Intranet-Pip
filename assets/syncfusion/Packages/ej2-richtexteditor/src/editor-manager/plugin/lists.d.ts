import { EditorManager } from './../base/editor-manager';
/**
 * Lists internal component
 *
 * @hidden
 * @private
 */
export declare class Lists {
    private parent;
    private startContainer;
    private endContainer;
    private saveSelection;
    private domNode;
    private currentAction;
    private commonLIParent;
    private listTabIndentation;
    /**
     * Constructor for creating the Lists plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private testList;
    private isOrderedList;
    private isUnOrderedList;
    private isCheckList;
    private createAutoList;
    private isInsideSameListType;
    private spaceList;
    private isCtrlEnterInChecklist;
    private enterList;
    private splitListAtCursor;
    private cleanupListElements;
    private ensureListItemContent;
    private isNodeInListNotTable;
    private applyFormattingFromRange;
    private handleNestedEnterKeyForLists;
    private backspaceList;
    private hasMediaElement;
    private handleNestedListRearrangement;
    private findPreviousElementForCursor;
    private handleCursorPositioningAfterListRemoval;
    private removeList;
    private onKeyUp;
    private firstListBackSpace;
    private isAtListStart;
    private getFirstTextNode;
    private keyDownHandler;
    private handleListIndentation;
    /**
     * Checks if inserting a tab would exceed the maxLength constraint.
     *
     * @param {IHtmlKeyboardEvent} e - The keyboard event containing the maxLength constraint
     * @returns {boolean} True if allowed, false if it would exceed maxLength.
     */
    private indentTab;
    private isCursorAtStartOfLI;
    private spaceKeyAction;
    private getAction;
    private revertClean;
    private noPreviousElement;
    private nestedList;
    private isCursorBeforeTable;
    private isCursorAtEndOfTable;
    private isListItemWithTableChild;
    private handleChecklistToggle;
    private isCaretImmediatelyBeforeTable;
    private applyListsHandler;
    private setSelectionBRConfig;
    private commonRevertList;
    private applyLists;
    private extractAllAttributes;
    private applyAllAttributes;
    private applyListStyles;
    private addCheckListClass;
    private applyCheckListClasses;
    private setStyle;
    private isRevert;
    private checkLists;
    private convertListType;
    private convertListTypeInternal;
    private applyListItemStyle;
    private transferAttributes;
    private cleanNode;
    private findUnSelected;
    revertChecklistItem(li: Element): void;
    private isListTag;
    private closeAncestorsBeforeSelection;
    private closeAncestorsAfterSelection;
    private reopenListStructure;
    private completeRevertList;
    private addAllAttributes;
    private processSplitedList;
    private addStyleForNestedList;
    private clearEmptyList;
    private updateInsertAfterMarker;
    private flushWrap;
    private createWrapElement;
    private wrapperAction;
    private replaceCustomSpans;
    private revertList;
    private revertCheckListClasses;
    private getClosestListParentMargin;
    private openTag;
    private closeTag;
    destroy(): void;
    private areAllListItemsSelected;
    private getListCursorInfo;
    private checkIsNestedList;
    private getListSelectionType;
    private isAllListNodesSelected;
    private formatListStyle;
}
