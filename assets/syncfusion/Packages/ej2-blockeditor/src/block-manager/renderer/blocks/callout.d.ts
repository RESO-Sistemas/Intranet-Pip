import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class CalloutRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders a initial level callout block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered callout block element.
     * @hidden
     */
    renderCallout(block: BlockModel, blockElement: HTMLElement): HTMLElement;
    private renderCalloutIcon;
}
