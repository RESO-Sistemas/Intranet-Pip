import { Tooltip } from '@syncfusion/ej2-popups';
import { BlockEditor } from '../base/blockeditor';
export declare class FloatingIconRenderer {
    private editor;
    addIconTooltip: Tooltip;
    dragIconTooltip: Tooltip;
    floatingIconContainer: HTMLElement;
    /**
     * Creates a new FloatingIconManager instance
     *
     * @param {BlockEditor} editor The parent BlockEditor instance
     */
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    /**
     * Creates the floating icons for the editor
     *
     * @returns {void}
     * @hidden
     */
    createFloatingIcons(): void;
    private renderFloatingIconTooltips;
    private getTooltipContent;
    /**
     * Updates the tooltip content for the floating icons.
     *
     * @returns {void}
     * @hidden
     */
    updateFloatingIconTooltipContent(): void;
    destroy(): void;
}
