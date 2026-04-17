import { BlockManager } from '../../base/block-manager';
/**
 * `ContextMenuModule` is used to handle the context menu actions in the BlockEditor.
 *
 * @hidden
 */
export declare class ContextMenuModule {
    private parent;
    private isPopupOpened;
    private isClipboardEmptyCache;
    private shortcutMap;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    private handleContextMenuCreated;
    private buildShortcutMap;
    private onKeyDown;
    private handleContextMenuBeforeOpen;
    private updateContextMenuPopupState;
    private handleContextMenuSelection;
    private handleIndentationAction;
    private handleContextMenuActions;
    private toggleDisabledItems;
    /**
     * Checks whether the context menu is opened or not.
     *
     * @returns {boolean} - Returns true if the context menu is opened, otherwise false.
     * @hidden
     */
    isPopupOpen(): boolean;
    /**
     * Destroys the ContextMenu module.
     *
     * @returns {void}
     */
    destroy(): void;
}
