import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class ParagraphRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders paragraph block
     *
     * @param {BlockModel} block - specifies the block.
     * @returns {HTMLElement} - the created or updated element
     * @hidden
     */
    renderParagraph(block: BlockModel): HTMLElement;
}
