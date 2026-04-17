import { BlockModel } from '../../../models/index';
import { CalloutRenderer, CommonBlocksRenderer, HeadingRenderer, ListRenderer, ParagraphRenderer, QuoteRenderer, CodeRenderer, ImageRenderer, CollapsibleRenderer, TableRenderer } from '../../renderer/blocks/index';
import { BlockManager } from '../../base/block-manager';
import { ContentRenderer } from '../../renderer/content/content-renderer';
/**
 * Manages all block rendering operations in the BlockEditor
 */
export declare class BlockRenderer {
    private parent;
    /** @hidden */
    contentRenderer: ContentRenderer;
    /** @hidden */
    paragraphRenderer: ParagraphRenderer;
    /** @hidden */
    headingRenderer: HeadingRenderer;
    /** @hidden */
    listRenderer: ListRenderer;
    /** @hidden */
    codeRenderer: CodeRenderer;
    /** @hidden */
    imageRenderer: ImageRenderer;
    /** @hidden */
    quoteRenderer: QuoteRenderer;
    /** @hidden */
    calloutRenderer: CalloutRenderer;
    /** @hidden */
    collapsibleRenderer: CollapsibleRenderer;
    /** @hidden */
    commonBlocksRenderer: CommonBlocksRenderer;
    /** @hidden */
    tableRenderer: TableRenderer;
    /** @hidden */
    isEntireBlocksRendering: boolean;
    /**
     * Creates a new BlockRendererManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    /**
     * Initializes all the renderers used by this manager
     *
     * @returns {void}
     */
    private initializeRenderers;
    /**
     * Creates a new block element based on the given block model.
     *
     * @param {BlockModel} block - The block model to create the element for.
     * @returns {HTMLElement} The created block element.
     * @hidden
     */
    createBlockElement(block: BlockModel): HTMLElement;
    /**
     * Creates a new block element based on the given model and replaces it with current element.
     *
     * @param {string} currentBlockId - The current block Id to replace
     * @param {string} newBlockId - The new block Id to create element for.
     * @returns {HTMLElement} The replaced block element.
     * @hidden
     */
    createAndReplaceBlockElement(currentBlockId: string, newBlockId: string): HTMLElement;
    /**
     * Inserts a new block element into the DOM.
     *
     * @param {HTMLElement} blockElement - The block element to insert.
     * @param {HTMLElement} targetElement - The target element to insert the block element relative to.
     * @param {boolean} isAfter - Whether to insert the block element after the target element.
     * @returns {void}
     * @hidden
     */
    insertBlockElementInDOM(blockElement: HTMLElement, targetElement?: HTMLElement, isAfter?: boolean): void;
    /**
     * Renders the content of a block element based on the given block model.
     *
     * @param {BlockModel} block - The block model to render.
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @returns {void}
     * @hidden
     */
    renderBlockContent(block: BlockModel, blockElement: HTMLElement): void;
    private populateClassListsForContent;
    /**
     * Renders the content for nested type blocks (e.g., Callout, Toggle).
     *
     * @param {BlockModel} block - The block model to render.
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @returns {void}
     * @hidden
     */
    renderNestedTypeBlockContent(block: BlockModel, blockElement: HTMLElement): void;
    /**
     * Re-renders the content of a block
     *
     * @param {BlockModel} block The block model to re-render
     * @returns {void}
     * @hidden
     */
    reRenderBlockContent(block: BlockModel): void;
    /**
     * Renders multiple blocks
     *
     * @param {BlockModel} blocks Array of block models to render
     * @returns {void}
     * @hidden
     */
    renderBlocks(blocks: BlockModel[]): void;
    /**
     * Updates the CSS class for a block
     *
     * @param {HTMLElement} blockElement The block element to update
     * @param {string} customClass The CSS class to apply
     * @returns {void}
     * @hidden
     */
    updateBlockCssClass(blockElement: HTMLElement, customClass: string): void;
    /**
     * Updates the indentation attribute for a block
     *
     * @param {HTMLElement} blockElement The block element to update
     * @param {number} indentValue The indentation value to set
     * @returns {void}
     * @hidden
     */
    updateBlockIndentAttribute(blockElement: HTMLElement, indentValue: number): void;
    /**
     * Inserts a block element into the DOM
     *
     * @param {HTMLElement} blockElement The block element to insert
     * @param {HTMLElement} afterElement Optional element to insert after
     * @returns {void}
     * @hidden
     */
    private insertBlockIntoDOM;
    /**
     * Clears the editor and renders the default block
     *
     * @returns {void}
     * @hidden
     */
    clearEditorAndRenderDefaultBlock(): void;
    handleBlockUIUpdates(options: any): void;
    private getParentElementToInsert;
    destroy(): void;
}
