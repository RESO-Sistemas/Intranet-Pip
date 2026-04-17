import { Toolbar } from '@syncfusion/ej2-navigations';
import { Popup } from '@syncfusion/ej2-popups';
import { Styles } from '../../models/index';
import { BlockManager } from '../base/block-manager';
/**
 * InlineToolbarModule class is used to render the inline toolbar for the block editor.
 *
 * @hidden
 */
export declare class InlineToolbarModule {
    private parent;
    popupObj: Popup;
    toolbarObj: Toolbar;
    private toolbarEle;
    private popupElement;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    private handleToolbarCreated;
    private init;
    private onKeydown;
    private isSelectionInTableHeader;
    /**
     * Shows the inline toolbar at the current selection
     *
     * @param {Range} range - Selection range where the toolbar should appear
     * @param {Event} event - Optional event that triggered the toolbar
     * @returns {void}
     * @hidden
     */
    showInlineToolbar(range: Range, event?: Event): void;
    /**
     * Hides the inline toolbar
     *
     * @param {Event} e - Optional event that triggered hiding the toolbar
     * @returns {void}
     */
    hideInlineToolbar(e?: Event): void;
    private handleInlineToolbarItemClick;
    /**
     * Updates active state of toolbar buttons based on current selection formatting.
     *
     * @returns {void}
     * @hidden
     */
    toggleToolbarActiveState(): void;
    /**
     * Detects active formats from selected text nodes in DOM.
     *
     * @param {Range} range - The selection range
     * @returns {Styles} - Common styles across selection
     * @hidden
     */
    detectFormatsFromSelection(range: Range): Styles;
    /**
     * Finds common formats across multiple text nodes.
     * A format is "active" if ALL selected text nodes have it.
     *
     * @param {Styles[]} formatsByNode - Format styles for each text node
     * @returns {Styles} - Only formats that all nodes share
     */
    private getCommonFormatsAcrossNodes;
    private getBlocksInRange;
    private toggleActiveState;
    private setColors;
    private handleColorChange;
    private handlePopupWidthChanges;
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen(): boolean;
    /**
     * Destroys the inline toolbar module and cleans up resources
     *
     * @returns {void}
     */
    destroy(): void;
}
