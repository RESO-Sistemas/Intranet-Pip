import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class HeadingRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders heading block
     *
     * @param {BlockModel} block - specifies the block.
     * @returns {HTMLElement} - the created or updated element
     * @hidden
     */
    renderHeading(block: BlockModel): HTMLElement;
}
