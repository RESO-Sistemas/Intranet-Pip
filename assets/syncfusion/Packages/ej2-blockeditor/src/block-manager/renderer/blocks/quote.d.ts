import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class QuoteRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders a quote block with container structure for children
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered quote block element.
     */
    renderQuote(block: BlockModel, blockElement: HTMLElement): HTMLElement;
}
