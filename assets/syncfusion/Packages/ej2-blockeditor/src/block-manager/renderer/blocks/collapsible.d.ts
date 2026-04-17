import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class CollapsibleRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders a initial level Collapsible block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered Collapsible block element.
     */
    renderCollapsibleBlock(block: BlockModel, blockElement: HTMLElement): HTMLElement;
    /**
     * Updates the expansion state of a collapsible block.
     *
     * @param {HTMLElement} blockElement - The block element to update.
     * @param {boolean} newState - The new expansion state.
     * @param {boolean} isUndoRedoAction - Whether it is invoked through UndoRedo
     * @returns {void}
     */
    updateCollapsibleBlockExpansion: (blockElement: HTMLElement, newState: boolean, isUndoRedoAction?: boolean) => void;
    private renderToggleIcon;
}
