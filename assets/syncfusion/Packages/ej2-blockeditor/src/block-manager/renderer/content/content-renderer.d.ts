import { BlockModel, ContentModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
/**
 * `Content renderer` module is used to render content in Blocks.
 *
 * @hidden
 */
export declare class ContentRenderer {
    private parent;
    constructor(manager: BlockManager);
    /**
     * Renders the actual content of a block.
     *
     * @param {BlockModel} block - The block model containing the content.
     * @param {HTMLElement} contentElement - The HTML element where the content will be rendered.
     * @returns {void}
     * @hidden
     */
    renderContent(block: BlockModel, contentElement: HTMLElement): void;
    /**
     * Invokes appropriate content renderer based on content type.
     * Pure function - creates and returns nodes without side effects.
     *
     * @param {BlockModel} block - The block model
     * @param {ContentModel} contentModel - The content model to render
     * @returns {Node} - The created node
     * @hidden
     */
    invokeContentRenderer(block: BlockModel, contentModel: ContentModel): Node;
    /**
     * Renders text content as a pure function.
     * Creates and returns text node with applied formatting.
     *
     * @param {ContentModel} content - The content model to render
     * @returns {Node} - The created text node
     * @hidden
     */
    renderText(content: ContentModel): Node;
    /**
     * Renders link/anchor content as a pure function.
     * Creates and returns anchor node with applied formatting.
     *
     * @param {ContentModel} content - The content model to render
     * @returns {Node} - The created anchor node
     * @hidden
     */
    renderAnchor(content: ContentModel): Node;
    /**
     * Renders mention/user chip as a pure function.
     * Creates and returns mention element without appending.
     *
     * @param {ContentModel} content - The content model with mention properties
     * @returns {Node} - The created mention element
     * @hidden
     */
    renderMention(content: ContentModel): Node;
    /**
     * Renders label/tag chip as a pure function.
     * Creates and returns label element without appending.
     *
     * @param {ContentModel} content - The content model with label properties
     * @returns {Node} - The created label element
     * @hidden
     */
    renderLabel(content: ContentModel): Node;
}
