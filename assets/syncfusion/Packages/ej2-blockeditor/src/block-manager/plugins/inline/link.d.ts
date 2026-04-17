import { BlockManager } from '../../base/block-manager';
/**
 * `LinkModule` module is used to handle hyperlinks in the block editor
 *
 * @hidden
 */
export declare class LinkModule {
    private parent;
    private selectionManager;
    private popupElement;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    private handleLinkCreated;
    private bindPopupEvents;
    private formattingPerformed;
    private handleDocumentClick;
    private handleEditorClick;
    /**
     * Shows the link popup dialog at cursor position
     *
     * @param {KeyboardEvent} e - Keyboard event that triggered the popup
     * @returns {void}
     * @hidden
     */
    showLinkPopup(e: KeyboardEvent): void;
    private getDialogPosition;
    private handleLinkPopupAfterOpen;
    private populateInputFields;
    private syncButtonsByUrlField;
    /**
     * Hides the link popup dialog and restores selection
     *
     * @returns {void}
     * @hidden
     */
    hideLinkPopup(): void;
    private clearInputValues;
    private handleLinkInsertDeletion;
    private handleLinkClick;
    private getLinkFromSelection;
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen(): boolean;
    /**
     * Destroys the link module and cleans up resources
     *
     * @returns {void}
     */
    destroy(): void;
}
