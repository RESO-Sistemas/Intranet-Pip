var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { generateUniqueId } from '../../common/utils/common';
import { isChildrenProp, isEmptyString } from '../../common/utils/block';
import { sanitizeHeadingProps } from '../../common/utils/transform';
import * as constants from '../../common/constant';
import { BlockType, ContentType } from '../../models/enums';
/**
 * Factory class for creating block models and content
 */
var BlockFactory = /** @class */ (function () {
    function BlockFactory() {
    }
    BlockFactory.createBlockFromPartial = function (block) {
        switch (block.blockType) {
            case BlockType.Paragraph:
                return this.createParagraphBlock(block, block.properties);
            case BlockType.Heading:
                return this.createHeadingBlock(block, block.properties);
            case BlockType.Checklist:
                return this.createChecklistBlock(block, block.properties);
            case BlockType.BulletList:
                return this.createBulletListBlock(block, block.properties);
            case BlockType.NumberedList:
                return this.createNumberedListBlock(block, block.properties);
            case BlockType.Code:
                return this.createCodeBlock(block, block.properties);
            case BlockType.Quote:
                return this.createQuoteBlock(block, block.properties);
            case BlockType.Callout:
                return this.createCalloutBlock(block, block.properties);
            case BlockType.Divider:
                return this.createDividerBlock(block, block.properties);
            case BlockType.CollapsibleParagraph:
                return this.createCollapsibleParagraphBlock(block, block.properties);
            case BlockType.CollapsibleHeading:
                return this.createCollapsibleHeadingBlock(block, block.properties);
            case BlockType.Image:
                return this.createImageBlock(block, block.properties);
            case BlockType.Table:
                return this.createTableBlock(block, block.properties);
            case BlockType.Template:
                return this.createTemplateBlock(block, block.properties);
            default:
                return null;
        }
    };
    BlockFactory.createContentFromPartial = function (content) {
        switch (content.contentType) {
            case ContentType.Text:
                return this.createTextContent(content, content.properties);
            case ContentType.Link:
                return this.createLinkContent(content, content.properties);
            case ContentType.Mention:
                return this.createMentionContent(content, content.properties);
            case ContentType.Label:
                return this.createLabelContent(content, content.properties);
            default:
                return null;
        }
    };
    /**
     * Creates a checklist block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {Partial<IChecklistBlockSettings>} innerProps Optional props for the checklist
     * @returns {BlockModel} A new checklist block
     */
    BlockFactory.createChecklistBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.Checklist }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({ isChecked: false }, this.defaultInnerBlockProps, innerProps) });
    };
    /**
     * Creates a paragraph block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {Partial<IParagraphBlockSettings>} innerProps Optional props for the paragraph
     * @returns {BlockModel} A new paragraph block
     */
    BlockFactory.createParagraphBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.Paragraph }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({}, this.defaultInnerBlockProps, innerProps) });
    };
    /**
     * Creates a heading block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IHeadingBlockSettings>} innerProps Optional content for the heading
     * @returns {BlockModel} new heading block
     */
    BlockFactory.createHeadingBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        var sanitizedInnerProps = sanitizeHeadingProps(innerProps);
        return __assign({ blockType: BlockType.Heading }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({ level: 1 }, this.defaultInnerBlockProps, sanitizedInnerProps) });
    };
    /**
     * Creates an image block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IImageBlockSettings>} innerProps Optional props for the image
     * @returns {BlockModel} A new image block
     */
    BlockFactory.createImageBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.Image }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { content: [], properties: __assign({ src: '', altText: '', width: '', height: '' }, innerProps) });
    };
    /**
     * Creates a code block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICodeBlockSettings>} innerProps Optional props for the code
     * @returns {BlockModel} A new code block
     */
    BlockFactory.createCodeBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.Code }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({ language: 'plaintext' }, innerProps) });
    };
    /**
     * Creates a bullet list block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IBulletListBlockSettings>} innerProps Optional props for the bullet list
     * @returns {BlockModel} A new bullet list block
     */
    BlockFactory.createBulletListBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.BulletList }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({}, this.defaultInnerBlockProps, innerProps) });
    };
    /**
     * Creates a numbered list block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<INumberedListBlockSettings>} innerProps Optional props for the numbered list
     * @returns {BlockModel} A new bullet list block
     */
    BlockFactory.createNumberedListBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.NumberedList }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({}, this.defaultInnerBlockProps, innerProps) });
    };
    /**
     * Creates a quote block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IQuoteBlockSettings>} innerProps Optional props for the quote
     * @returns {BlockModel} A new quote block
     */
    BlockFactory.createQuoteBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        var blockId = isEmptyString(rootProps.id) ? generateUniqueId(constants.BLOCK_ID_PREFIX) : rootProps.id;
        return __assign({ blockType: BlockType.Quote }, this.defaultRootBlockProps, rootProps, { id: blockId, content: [], properties: __assign({ children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, innerProps) });
    };
    /**
     * Creates a Collapsible paragraph block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICollapsibleBlockSettings>} innerProps Optional props for the Collapsible paragraph
     * @returns {BlockModel} A new Collapsible paragraph block
     */
    BlockFactory.createCollapsibleParagraphBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        var blockId = isEmptyString(rootProps.id) ? generateUniqueId(constants.BLOCK_ID_PREFIX) : rootProps.id;
        return __assign({ blockType: BlockType.CollapsibleParagraph }, this.defaultRootBlockProps, rootProps, { id: blockId, properties: __assign({ isExpanded: false, children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, this.defaultInnerBlockProps, innerProps) });
    };
    /**
     * Creates a collapsible heading block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICollapsibleHeadingBlockSettings>} innerProps Optional props for the collapsible heading
     * @returns {BlockModel} A new collapsible heading block
     */
    BlockFactory.createCollapsibleHeadingBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        var sanitizedInnerProps = sanitizeHeadingProps(innerProps);
        var blockId = isEmptyString(rootProps.id) ? generateUniqueId(constants.BLOCK_ID_PREFIX) : rootProps.id;
        return __assign({ blockType: BlockType.CollapsibleHeading }, this.defaultRootBlockProps, rootProps, { id: blockId, properties: __assign({ isExpanded: false, level: 1, children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, this.defaultInnerBlockProps, sanitizedInnerProps) });
    };
    /**
     * Creates a callout block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICalloutBlockSettings>} innerProps Optional props for the callout
     * @returns {BlockModel} A new callout block
     */
    BlockFactory.createCalloutBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        var blockId = isEmptyString(rootProps.id) ? generateUniqueId(constants.BLOCK_ID_PREFIX) : rootProps.id;
        return __assign({ blockType: BlockType.Callout }, this.defaultRootBlockProps, rootProps, { id: blockId, content: [], properties: __assign({ children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, innerProps) });
    };
    /**
     * Creates a divider block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IDividerBlockSettings>} innerProps Optional props for the divider
     * @returns {BlockModel} A new divider block
     */
    BlockFactory.createDividerBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: BlockType.Divider }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { content: [], properties: __assign({}, innerProps) });
    };
    /**
     * Creates a template block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {any} innerProps Optional props for the template
     * @returns {BlockModel} A new template block
     */
    BlockFactory.createTemplateBlock = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ blockType: 'Template' }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { content: [], properties: __assign({}, innerProps) });
    };
    /**
     * Creates an table block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ITableBlockSettings>} innerProps Optional props for the image
     * @returns {BlockModel} A new image block
     */
    BlockFactory.createTableBlock = function (rootProps, innerProps) {
        var _this = this;
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        // ParentIds for inner blocks will be assigned by the caller/state manager as needed
        var tableBlock = __assign({ blockType: BlockType.Table }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(constants.BLOCK_ID_PREFIX) } : {}), { properties: __assign({ width: '100%', cssClass: '', enableHeader: true, enableRowNumbers: true, readOnly: false }, this.getDefaultRowsAndColumns(), innerProps) });
        tableBlock.properties.columns.forEach(function (column, idx) {
            if (!column.id) {
                column.id = generateUniqueId('col_');
            }
            if (!column.type) {
                column.type = 'Text';
            }
            if (!column.headerText) {
                column.headerText = "Column " + (idx + 1);
            }
            if (column.width) {
                var value = parseInt(column.width.toString(), 10);
                value = value < constants.TABLE_COL_MIN_WIDTH ? constants.TABLE_COL_MIN_WIDTH : value;
            }
        });
        tableBlock.properties.rows.forEach(function (r) {
            if (!r.id) {
                r.id = generateUniqueId('row_');
            }
            r.cells.forEach(function (cell, idx) {
                if (!cell.id) {
                    cell.id = generateUniqueId('cell_');
                }
                if (!cell.columnId) {
                    cell.columnId = tableBlock.properties.columns[idx].id;
                }
                cell.blocks = _this.populateBlockProperties(cell.blocks, cell.id);
            });
        });
        return tableBlock;
    };
    BlockFactory.getDefaultRowsAndColumns = function () {
        // Defaults for new table structure: 2 columns, 2 rows (data), header enabled
        var col1Id = generateUniqueId('col_');
        var col2Id = generateUniqueId('col_');
        var row1Id = generateUniqueId('row_');
        var row2Id = generateUniqueId('row_');
        var cell11Id = generateUniqueId('cell_');
        var cell12Id = generateUniqueId('cell_');
        var cell21Id = generateUniqueId('cell_');
        var cell22Id = generateUniqueId('cell_');
        return {
            columns: [
                { id: col1Id, type: 'Text', headerText: 'Column 1' },
                { id: col2Id, type: 'Text', headerText: 'Column 2' }
            ],
            rows: [
                {
                    id: row1Id,
                    cells: [
                        { id: cell11Id, columnId: col1Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] },
                        { id: cell12Id, columnId: col2Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] }
                    ]
                },
                {
                    id: row2Id,
                    cells: [
                        { id: cell21Id, columnId: col1Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] },
                        { id: cell22Id, columnId: col2Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] }
                    ]
                }
            ]
        };
    };
    /**
     * Populates blocks with missing properties if they don't have them
     *
     * @param {BlockModel[]} blocks Array of block models
     * @param {string} parentId The id of the parent block
     * @returns {BlockModel[]} Updated array of block models
     */
    BlockFactory.populateBlockProperties = function (blocks, parentId) {
        var _this = this;
        var populatedBlocks = blocks.map(function (block) {
            if (parentId) {
                block.parentId = parentId;
            }
            var updatedBlock = BlockFactory.createBlockFromPartial(block);
            if (updatedBlock.content && updatedBlock.content.length > 0) {
                updatedBlock.content = updatedBlock.content.map(function (originalContent) {
                    return BlockFactory.createContentFromPartial(originalContent);
                });
            }
            var props = updatedBlock.properties;
            if ((isChildrenProp(updatedBlock)) && props.children.length > 0) {
                props.children = _this.populateBlockProperties(props.children, block.id);
            }
            return updatedBlock;
        });
        return populatedBlocks;
    };
    /**
     * Creates a text content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ITextContentSettings>} innerProps Optional props for the text content
     * @returns {ContentModel} A new text content
     */
    BlockFactory.createTextContent = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ contentType: ContentType.Text }, this.defaultRootContentProps, rootProps, { properties: __assign({ styles: {} }, innerProps) });
    };
    /**
     * Creates a link content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ILinkContentSettings>} innerProps Optional props for the link content
     * @returns {ContentModel} A new link content
     */
    BlockFactory.createLinkContent = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ contentType: ContentType.Link }, this.defaultRootContentProps, rootProps, { properties: __assign({ styles: {}, url: '' }, innerProps) });
    };
    /**
     * Creates a mention content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<IMentionContentSettings>} innerProps Optional props for the mention content
     * @returns {ContentModel} A new mention content
     */
    BlockFactory.createMentionContent = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ contentType: ContentType.Mention }, this.defaultRootContentProps, rootProps, { properties: __assign({ userId: '' }, innerProps) });
    };
    /**
     * Creates a label content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ILabelContentSettings>} innerProps Optional props for the label content
     * @returns {ContentModel} A new label content
     */
    BlockFactory.createLabelContent = function (rootProps, innerProps) {
        if (rootProps === void 0) { rootProps = {}; }
        if (innerProps === void 0) { innerProps = {}; }
        return __assign({ contentType: ContentType.Label }, this.defaultRootContentProps, rootProps, { properties: __assign({ labelId: '' }, innerProps) });
    };
    BlockFactory.defaultInnerBlockProps = {
        placeholder: ''
    };
    BlockFactory.defaultRootContentProps = {
        content: ''
    };
    BlockFactory.defaultRootBlockProps = {
        parentId: '',
        indent: 0,
        content: [BlockFactory.createTextContent()],
        cssClass: '',
        template: ''
    };
    return BlockFactory;
}());
export { BlockFactory };
