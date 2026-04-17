import { BlockEditor } from '../base/blockeditor';
/**
 * `LinkModule` module is used to handle hyperlinks in the block editor
 *
 * @hidden
 */
export declare class LinkModule {
    private editor;
    private linkDialog;
    private popupElement;
    constructor(editor: BlockEditor);
    private initializeModule;
    private addEventListeners;
    private removeEventListeners;
    private createLinkPopup;
    private createPopupElement;
    private initializeDialog;
    private updateTargetAndActionForPopup;
    private updateLinkPopupLocale;
    private updatePopupElementLocale;
    private applyRtlSettings;
    /**
     * Shows the link popup dialog at cursor position
     *
     * @param {{ x: string, y: string }} position - position(x and y) for displaying popup
     * @returns {void}
     * @hidden
     */
    showLinkPopup(position: {
        x: string;
        y: string;
    }): void;
    /**
     * Hides the link popup dialog and restores selection
     *
     * @returns {void}
     * @hidden
     */
    hideLinkPopup(): void;
    /**
     * Destroys the link module and cleans up resources
     *
     * @returns {void}
     */
    destroy(): void;
}
