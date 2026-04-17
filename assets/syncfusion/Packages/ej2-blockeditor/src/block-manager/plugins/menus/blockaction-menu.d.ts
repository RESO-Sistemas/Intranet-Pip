import { Popup } from '@syncfusion/ej2-popups';
import { BlockManager } from '../../base/block-manager';
/**
 * `BlockActionMenuModule` is used to handle the block action menu in the BlockEditor.
 *
 * @hidden
 */
export declare class BlockActionMenuModule {
    private parent;
    private isPopupOpened;
    popupObj: Popup;
    private menuWrapperElement;
    private shortcutMap;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    private handleMenuCreated;
    private init;
    private buildShortcutMap;
    private onKeyDown;
    /**
     * Toggles the block action popup based on the provided flag.
     *
     * @param {boolean} shouldHide - Flag indicating whether to hide or show the popup.
     * @param {Event} e - Optional event object.
     * @returns {void}
     * @hidden
     */
    toggleBlockActionPopup(shouldHide: boolean, e?: Event): void;
    private getParentBlock;
    private isFirstChildBlock;
    private isLastChildBlock;
    private toggleMenuItemClass;
    private getBlockPositionInfo;
    private toggleDisabledItems;
    private handleBlockActionMenuSelect;
    private handlePopupWidthChanges;
    private handlePopupHeightChanges;
    private handleBlockActions;
    private isItemDisabled;
    /**
     * Checks whether the block action popup is opened or not.
     *
     * @returns {boolean} - Returns true if the block action popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen(): boolean;
    destroy(): void;
}
