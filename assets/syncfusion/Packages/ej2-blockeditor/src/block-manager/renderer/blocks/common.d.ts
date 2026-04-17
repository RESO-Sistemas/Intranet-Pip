import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class CommonBlocksRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders a divider block
     *
     * @param {HTMLElement} blockElement - The block element.
     * @returns {HTMLElement} - The created or updated element.
     */
    renderDivider(blockElement: HTMLElement): HTMLElement;
    /**
     * Renders a template block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered template block element.
     * @hidden
     */
    renderTemplateBlock(block: BlockModel, blockElement: HTMLElement): HTMLElement;
}
