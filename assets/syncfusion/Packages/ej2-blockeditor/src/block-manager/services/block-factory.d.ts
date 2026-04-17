import { BlockModel, IBulletListBlockSettings, ICalloutBlockSettings, IChecklistBlockSettings, ICodeBlockSettings, ICollapsibleHeadingBlockSettings, ICollapsibleBlockSettings, ContentModel, IDividerBlockSettings, IHeadingBlockSettings, IImageBlockSettings, ILabelContentSettings, ILinkContentSettings, IMentionContentSettings, INumberedListBlockSettings, IParagraphBlockSettings, IQuoteBlockSettings, TableColumnModel, ITableBlockSettings, TableRowModel, ITextContentSettings } from '../../models/index';
/**
 * Factory class for creating block models and content
 */
export declare class BlockFactory {
    private static defaultInnerBlockProps;
    private static defaultRootContentProps;
    private static defaultRootBlockProps;
    static createBlockFromPartial(block: Partial<BlockModel>): BlockModel;
    static createContentFromPartial(content: Partial<ContentModel>): ContentModel;
    /**
     * Creates a checklist block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {Partial<IChecklistBlockSettings>} innerProps Optional props for the checklist
     * @returns {BlockModel} A new checklist block
     */
    static createChecklistBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IChecklistBlockSettings>): BlockModel;
    /**
     * Creates a paragraph block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {Partial<IParagraphBlockSettings>} innerProps Optional props for the paragraph
     * @returns {BlockModel} A new paragraph block
     */
    static createParagraphBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IParagraphBlockSettings>): BlockModel;
    /**
     * Creates a heading block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IHeadingBlockSettings>} innerProps Optional content for the heading
     * @returns {BlockModel} new heading block
     */
    static createHeadingBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IHeadingBlockSettings>): BlockModel;
    /**
     * Creates an image block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IImageBlockSettings>} innerProps Optional props for the image
     * @returns {BlockModel} A new image block
     */
    static createImageBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IImageBlockSettings>): BlockModel;
    /**
     * Creates a code block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICodeBlockSettings>} innerProps Optional props for the code
     * @returns {BlockModel} A new code block
     */
    static createCodeBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<ICodeBlockSettings>): BlockModel;
    /**
     * Creates a bullet list block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IBulletListBlockSettings>} innerProps Optional props for the bullet list
     * @returns {BlockModel} A new bullet list block
     */
    static createBulletListBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IBulletListBlockSettings>): BlockModel;
    /**
     * Creates a numbered list block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<INumberedListBlockSettings>} innerProps Optional props for the numbered list
     * @returns {BlockModel} A new bullet list block
     */
    static createNumberedListBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<INumberedListBlockSettings>): BlockModel;
    /**
     * Creates a quote block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IQuoteBlockSettings>} innerProps Optional props for the quote
     * @returns {BlockModel} A new quote block
     */
    static createQuoteBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IQuoteBlockSettings>): BlockModel;
    /**
     * Creates a Collapsible paragraph block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICollapsibleBlockSettings>} innerProps Optional props for the Collapsible paragraph
     * @returns {BlockModel} A new Collapsible paragraph block
     */
    static createCollapsibleParagraphBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<ICollapsibleBlockSettings>): BlockModel;
    /**
     * Creates a collapsible heading block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICollapsibleHeadingBlockSettings>} innerProps Optional props for the collapsible heading
     * @returns {BlockModel} A new collapsible heading block
     */
    static createCollapsibleHeadingBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<ICollapsibleHeadingBlockSettings>): BlockModel;
    /**
     * Creates a callout block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICalloutBlockSettings>} innerProps Optional props for the callout
     * @returns {BlockModel} A new callout block
     */
    static createCalloutBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<ICalloutBlockSettings>): BlockModel;
    /**
     * Creates a divider block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IDividerBlockSettings>} innerProps Optional props for the divider
     * @returns {BlockModel} A new divider block
     */
    static createDividerBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<IDividerBlockSettings>): BlockModel;
    /**
     * Creates a template block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {any} innerProps Optional props for the template
     * @returns {BlockModel} A new template block
     */
    static createTemplateBlock(rootProps?: Partial<BlockModel>, innerProps?: any): BlockModel;
    /**
     * Creates an table block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ITableBlockSettings>} innerProps Optional props for the image
     * @returns {BlockModel} A new image block
     */
    static createTableBlock(rootProps?: Partial<BlockModel>, innerProps?: Partial<ITableBlockSettings>): BlockModel;
    static getDefaultRowsAndColumns(): {
        rows: TableRowModel[];
        columns: TableColumnModel[];
    };
    /**
     * Populates blocks with missing properties if they don't have them
     *
     * @param {BlockModel[]} blocks Array of block models
     * @param {string} parentId The id of the parent block
     * @returns {BlockModel[]} Updated array of block models
     */
    static populateBlockProperties(blocks: BlockModel[], parentId?: string): BlockModel[];
    /**
     * Creates a text content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ITextContentSettings>} innerProps Optional props for the text content
     * @returns {ContentModel} A new text content
     */
    static createTextContent(rootProps?: Partial<ContentModel>, innerProps?: Partial<ITextContentSettings>): ContentModel;
    /**
     * Creates a link content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ILinkContentSettings>} innerProps Optional props for the link content
     * @returns {ContentModel} A new link content
     */
    static createLinkContent(rootProps?: Partial<ContentModel>, innerProps?: Partial<ILinkContentSettings>): ContentModel;
    /**
     * Creates a mention content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<IMentionContentSettings>} innerProps Optional props for the mention content
     * @returns {ContentModel} A new mention content
     */
    static createMentionContent(rootProps?: Partial<ContentModel>, innerProps?: Partial<IMentionContentSettings>): ContentModel;
    /**
     * Creates a label content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ILabelContentSettings>} innerProps Optional props for the label content
     * @returns {ContentModel} A new label content
     */
    static createLabelContent(rootProps?: Partial<ContentModel>, innerProps?: Partial<ILabelContentSettings>): ContentModel;
}
