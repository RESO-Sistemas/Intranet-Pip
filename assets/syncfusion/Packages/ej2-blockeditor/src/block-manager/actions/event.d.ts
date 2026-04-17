import { BlockManager } from '../base/block-manager';
/**
 * Manages all event handlers for the BlockEditor component
 * This class centralizes event handling logic and provides a clean interface
 * for wiring and unwiring events across the editor
 */
export declare class EventAction {
    private parent;
    /**
     * Creates a new EventAction instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager: BlockManager);
    /**
     * Wires up all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    wireGlobalEvents(): void;
    /**
     * Unwires all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    unWireGlobalEvents(): void;
    private handleEditorSelection;
    private handleDocumentClickActions;
    private handleMouseMoveActions;
    private handleMouseUpActions;
    private handleMouseDownActions;
    private handleEditorInputActions;
    private processEntireEditorSelection;
    private updateUIAfterInput;
    private processFormattingActions;
    private throttleContentUpdate;
    private handleTextSelection;
    private filterSlashCommandOnUserInput;
    private handleKeydownActions;
    private validateKeyEventProcessability;
    private handleInlineTbarStates;
    private showInlineToolbarWithDelay;
    private processKeyboardShortcuts;
    isAnyPopupOpen(): boolean;
    private processListBlockEvents;
    private handleBlockKeyActions;
    private processEnterKey;
    private handleNormalEnterKey;
    private processSpecialContainerBlocks;
    private processToggleBlock;
    private processIndentIfBlockEmpty;
    private processBlockDeletions;
    private processTabKey;
    private handleHomeEndKeyActions;
    private handleLineBreaksOnBlock;
    private handleChildrenBlockExit;
    private handleArrowKeyActions;
    private moveCursorToAdjacentBlock;
    private togglePopupsOnDocumentClick;
    private clipboardActionHandler;
    private handleWindowResize;
    private wireUnWireDragEvents;
    destroy(): void;
}
