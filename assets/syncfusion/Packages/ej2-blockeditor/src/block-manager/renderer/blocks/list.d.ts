import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class ListRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders a list item block
     *
     * This method creates and transforms list item elements based on the block type.
     * It handles both numbered and checklist types.
     *
     * @param {BlockModel} block - Specifies the block model containing data to render.
     * @param {HTMLElement} blockElement - The parent element that contains all block elements.
     * @returns {HTMLElement} - Returns the created or updated list container element.
     * @hidden
     */
    renderListItem(block: BlockModel, blockElement: HTMLElement): HTMLElement;
    /**
     * Renders a checklist item
     *
     * @param {BlockModel} block - Specifies the block model containing data to render.
     * @param {HTMLElement} blockElement - The parent element that contains all block elements.
     * @returns {void}
     * @hidden
     */
    renderChecklist(block: BlockModel, blockElement: HTMLElement): void;
    private checkmarkClickListener;
    /**
     * Toggles the checked state of a checklist item.
     *
     * @param {BlockModel} block - The block model of the checklist item.
     * @param {boolean} isChecked - The new checked state.
     * @param {boolean} isUndoRedoAction - specifies whether to track undo or redo action.
     * @returns {void}
     * @hidden
     */
    toggleCheckedState(block: BlockModel, isChecked: boolean, isUndoRedoAction?: boolean): void;
    private getUncheckedSvgElements;
    private getCheckedSvgElements;
    private renderUncheckedCheckmark;
}
