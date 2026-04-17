import { addClass, createElement, detach } from '@syncfusion/ej2-base';
import { BlockType } from '../../../models/enums';
import { getBlockContentElement, getBlockModelById, isAlwaysOnPlaceHolderBlk, isChildrenTypeBlock, isListTypeBlock } from '../../../common/utils/block';
import { CalloutRenderer, CommonBlocksRenderer, HeadingRenderer, ListRenderer, ParagraphRenderer, QuoteRenderer, CodeRenderer, ImageRenderer, CollapsibleRenderer, TableRenderer } from '../../renderer/blocks/index';
import { setCursorPosition } from '../../../common/utils/selection';
import { events } from '../../../common/constant';
import * as constants from '../../../common/constant';
import { ContentRenderer } from '../../renderer/content/content-renderer';
/**
 * Manages all block rendering operations in the BlockEditor
 */
var BlockRenderer = /** @class */ (function () {
    /**
     * Creates a new BlockRendererManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    function BlockRenderer(manager) {
        this.parent = manager;
        this.contentRenderer = new ContentRenderer(this.parent);
        this.initializeRenderers();
        this.addEventListeners();
    }
    BlockRenderer.prototype.addEventListeners = function () {
        this.parent.observer.on('modelChanged', this.handleBlockUIUpdates, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    BlockRenderer.prototype.removeEventListeners = function () {
        this.parent.observer.off('modelChanged', this.handleBlockUIUpdates);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Initializes all the renderers used by this manager
     *
     * @returns {void}
     */
    BlockRenderer.prototype.initializeRenderers = function () {
        this.paragraphRenderer = new ParagraphRenderer(this.parent);
        this.headingRenderer = new HeadingRenderer(this.parent);
        this.listRenderer = new ListRenderer(this.parent);
        this.quoteRenderer = new QuoteRenderer(this.parent);
        this.codeRenderer = new CodeRenderer(this.parent);
        this.imageRenderer = new ImageRenderer(this.parent);
        this.calloutRenderer = new CalloutRenderer(this.parent);
        this.collapsibleRenderer = new CollapsibleRenderer(this.parent);
        this.commonBlocksRenderer = new CommonBlocksRenderer(this.parent);
        this.tableRenderer = new TableRenderer(this.parent);
    };
    /**
     * Creates a new block element based on the given block model.
     *
     * @param {BlockModel} block - The block model to create the element for.
     * @returns {HTMLElement} The created block element.
     * @hidden
     */
    BlockRenderer.prototype.createBlockElement = function (block) {
        var blockElement = createElement('div', {
            id: block.id,
            className: "e-block " + (isListTypeBlock(block.blockType) ? 'e-list-block' : '') + (block.cssClass ? ' ' + block.cssClass : ''),
            attrs: {
                'data-block-type': block.blockType
            }
        });
        this.updateBlockCssClass(blockElement, block.cssClass);
        this.updateBlockIndentAttribute(blockElement, block.indent);
        if (block.blockType === BlockType.Divider) {
            blockElement.setAttribute('contenteditable', 'false');
        }
        if (isChildrenTypeBlock(block.blockType)) {
            this.renderNestedTypeBlockContent(block, blockElement);
        }
        else {
            this.renderBlockContent(block, blockElement);
        }
        return blockElement;
    };
    /**
     * Creates a new block element based on the given model and replaces it with current element.
     *
     * @param {string} currentBlockId - The current block Id to replace
     * @param {string} newBlockId - The new block Id to create element for.
     * @returns {HTMLElement} The replaced block element.
     * @hidden
     */
    BlockRenderer.prototype.createAndReplaceBlockElement = function (currentBlockId, newBlockId) {
        var newBlockElement = this.createBlockElement(getBlockModelById(newBlockId, this.parent.getEditorBlocks()));
        var currentElement = this.parent.getBlockElementById(currentBlockId);
        currentElement.replaceWith(newBlockElement);
        return this.parent.getBlockElementById(newBlockId);
    };
    /**
     * Inserts a new block element into the DOM.
     *
     * @param {HTMLElement} blockElement - The block element to insert.
     * @param {HTMLElement} targetElement - The target element to insert the block element relative to.
     * @param {boolean} isAfter - Whether to insert the block element after the target element.
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.insertBlockElementInDOM = function (blockElement, targetElement, isAfter) {
        if (targetElement) {
            targetElement.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', blockElement);
        }
        else {
            this.parent.blockContainer.appendChild(blockElement);
        }
    };
    /**
     * Renders the content of a block element based on the given block model.
     *
     * @param {BlockModel} block - The block model to render.
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.renderBlockContent = function (block, blockElement) {
        blockElement.setAttribute('data-block-type', block.blockType);
        var contentElement;
        switch (block.blockType) {
            case BlockType.Paragraph:
                contentElement = this.paragraphRenderer.renderParagraph(block);
                break;
            case BlockType.Heading:
                contentElement = this.headingRenderer.renderHeading(block);
                break;
            case BlockType.BulletList:
            case BlockType.NumberedList:
            case BlockType.Checklist:
                contentElement = this.listRenderer.renderListItem(block, blockElement);
                break;
            case BlockType.Code:
                contentElement = this.codeRenderer.renderCodeBlock(block);
                break;
            case BlockType.Image:
                contentElement = this.imageRenderer.renderImage(block);
                break;
            case BlockType.Table:
                contentElement = this.tableRenderer.renderTable(block, blockElement);
                break;
            case BlockType.Divider:
                contentElement = this.commonBlocksRenderer.renderDivider(blockElement);
                break;
            case BlockType.Template:
                contentElement = this.commonBlocksRenderer.renderTemplateBlock(block, blockElement);
                break;
        }
        if (contentElement) {
            this.populateClassListsForContent(block, contentElement);
            blockElement.appendChild(contentElement);
        }
    };
    BlockRenderer.prototype.populateClassListsForContent = function (block, contentElement) {
        var notAllowedTypes = [BlockType.Code, BlockType.Callout, BlockType.Quote]; //Table, Code, Callout etc.
        if (isListTypeBlock(block.blockType)) {
            var listItem = contentElement.querySelector('li');
            if (listItem) {
                listItem.classList.add('e-block-content');
            }
        }
        else if (notAllowedTypes.indexOf(block.blockType) === -1) {
            contentElement.classList.add('e-block-content');
        }
    };
    /**
     * Renders the content for nested type blocks (e.g., Callout, Toggle).
     *
     * @param {BlockModel} block - The block model to render.
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.renderNestedTypeBlockContent = function (block, blockElement) {
        var contentElement;
        if (block.blockType === BlockType.Callout) {
            contentElement = this.calloutRenderer.renderCallout(block, blockElement);
        }
        else if (block.blockType === BlockType.Quote) {
            contentElement = this.quoteRenderer.renderQuote(block, blockElement);
        }
        else if (block.blockType.toString().startsWith('Collapsible')) {
            contentElement = this.collapsibleRenderer.renderCollapsibleBlock(block, blockElement);
        }
        if (contentElement) {
            blockElement.appendChild(contentElement);
        }
    };
    /**
     * Re-renders the content of a block
     *
     * @param {BlockModel} block The block model to re-render
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.reRenderBlockContent = function (block) {
        if (!block) {
            return;
        }
        var blockElement = this.parent.getBlockElementById(block.id);
        if (!blockElement) {
            return;
        }
        var contentElement = getBlockContentElement(blockElement);
        if (!contentElement) {
            return;
        }
        contentElement.innerHTML = '';
        this.contentRenderer.renderContent(block, contentElement);
    };
    /**
     * Renders multiple blocks
     *
     * @param {BlockModel} blocks Array of block models to render
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.renderBlocks = function (blocks) {
        var _this = this;
        if (blocks.length <= 0) {
            return;
        }
        this.isEntireBlocksRendering = true;
        blocks.forEach(function (block) {
            var blockElement = _this.createBlockElement(block);
            _this.insertBlockIntoDOM(blockElement);
            if (!isAlwaysOnPlaceHolderBlk(block.blockType)) {
                _this.parent.togglePlaceholder(blockElement, false);
            }
            if (isListTypeBlock(block.blockType)) {
                _this.parent.listPlugin.updateListItemMarkers(blockElement);
            }
            if (isChildrenTypeBlock(block.blockType) && block.properties.children.length > 0) {
                block.properties.children.forEach(function (childBlock) {
                    if (isListTypeBlock(childBlock.blockType)) {
                        _this.parent.listPlugin.updateListItemMarkers(blockElement.querySelector('#' + childBlock.id));
                    }
                });
            }
            if (block.blockType === BlockType.Table && _this.tableRenderer) {
                _this.tableRenderer.refreshColWidths(block);
            }
        });
        requestAnimationFrame(function () {
            if (_this.parent) {
                blocks.forEach(function (block) {
                    if (block.blockType === BlockType.Checklist && _this.listRenderer) {
                        _this.listRenderer.toggleCheckedState(block, block.properties.isChecked, true);
                    }
                });
                _this.isEntireBlocksRendering = false;
            }
        });
    };
    /**
     * Updates the CSS class for a block
     *
     * @param {HTMLElement} blockElement The block element to update
     * @param {string} customClass The CSS class to apply
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.updateBlockCssClass = function (blockElement, customClass) {
        if (customClass) {
            addClass([blockElement], customClass.trim().split(' '));
        }
    };
    /**
     * Updates the indentation attribute for a block
     *
     * @param {HTMLElement} blockElement The block element to update
     * @param {number} indentValue The indentation value to set
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.updateBlockIndentAttribute = function (blockElement, indentValue) {
        blockElement.style.setProperty(constants.INDENT_KEY, (indentValue * 20).toString());
        if (this.parent.rootEditorElement.contains(blockElement)) {
            this.parent.floatingIconAction.showFloatingIcons(blockElement);
        }
    };
    /**
     * Inserts a block element into the DOM
     *
     * @param {HTMLElement} blockElement The block element to insert
     * @param {HTMLElement} afterElement Optional element to insert after
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.insertBlockIntoDOM = function (blockElement, afterElement) {
        if (afterElement) {
            this.parent.blockContainer.insertBefore(blockElement, afterElement.nextSibling);
        }
        else {
            this.parent.blockContainer.appendChild(blockElement);
        }
    };
    /**
     * Clears the editor and renders the default block
     *
     * @returns {void}
     * @hidden
     */
    BlockRenderer.prototype.clearEditorAndRenderDefaultBlock = function () {
        this.parent.blockContainer.innerHTML = '';
        var blockElement = this.createBlockElement(this.parent.getEditorBlocks()[0]);
        this.parent.blockContainer.appendChild(blockElement);
        this.parent.setFocusToBlock(blockElement);
        setCursorPosition(getBlockContentElement(blockElement), 0);
        this.parent.floatingIconAction.showFloatingIcons(blockElement);
    };
    BlockRenderer.prototype.handleBlockUIUpdates = function (options) {
        var _this = this;
        switch (options.type) {
            case 'AddBlock': {
                var _a = options.state, addedBlock = _a.addedBlock, targetBlockModel = _a.targetBlockModel, preventUIUpdate = _a.preventUIUpdate, isAfter = _a.isAfter, preventEventTrigger = _a.preventEventTrigger;
                var blockElement = this.createBlockElement(addedBlock);
                var targetElement = targetBlockModel ? this.parent.getBlockElementById(targetBlockModel.id) : null;
                var blockToFocus = isAfter ? blockElement : targetElement;
                this.insertBlockElementInDOM(blockElement, targetElement, isAfter);
                // Hide placeholder for created block by default, let blockToFocus decide based on isAfter boolean
                this.parent.togglePlaceholder(blockElement, false);
                if (!preventUIUpdate) {
                    this.parent.setFocusAndUIForNewBlock(blockToFocus);
                }
                if (isListTypeBlock(addedBlock.blockType)) {
                    this.parent.listPlugin.recalculateMarkersForListItems();
                }
                this.parent.adjustViewForFocusedBlock();
                this.parent.eventService.addChange({
                    action: 'Insertion',
                    data: {
                        block: addedBlock,
                        targetId: targetBlockModel ? targetBlockModel.id : '',
                        isAfter: isAfter
                    }
                });
                if (!preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
            case 'DeleteBlock': {
                detach(options.state.blockElement);
                this.parent.eventService.addChange({
                    action: 'Deletion',
                    data: { block: options.state.removedBlock }
                });
                if (!options.state.preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
            case 'MoveBlock': {
                var _b = options.state, destination = _b.destination, fromElements = _b.fromElements, isMovingUp_1 = _b.isMovingUp, toBlockDOM_1 = _b.toBlockDOM, movedBlocks = _b.movedBlocks;
                var allBlocks = Array.from(this.parent.blockContainer.children);
                var parentElement_1 = this.getParentElementToInsert(destination, allBlocks);
                var targetToInsert_1 = (isMovingUp_1 ? toBlockDOM_1 : toBlockDOM_1.nextSibling);
                fromElements.forEach(function (el) {
                    parentElement_1.insertBefore(el, targetToInsert_1);
                });
                var reversedFromModels_1 = movedBlocks.slice().reverse();
                reversedFromModels_1.forEach(function (data) {
                    var prevParent = reversedFromModels_1.find(function (fromModel) { return fromModel.parent !== null; });
                    _this.parent.eventService.addChange({
                        action: 'Moved',
                        data: {
                            block: data.model,
                            targetId: toBlockDOM_1.id,
                            isMovingUp: isMovingUp_1,
                            prevParent: prevParent ? prevParent.model : undefined,
                            currentParent: options.state.destination.toParentBlockModel
                                ? options.state.destination.toParentBlockModel
                                : undefined
                        }
                    });
                });
                this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                break;
            }
            case 'TransformBlock': {
                var _c = options.state, block = _c.block, shouldPreventUpdates = _c.shouldPreventUpdates, oldBlockClone = _c.oldBlockClone, preventEventTrigger = _c.preventEventTrigger;
                var blockElement = this.parent.getBlockElementById(block.id);
                var newBlockElement = this.createBlockElement(block);
                blockElement.replaceWith(newBlockElement);
                if (!shouldPreventUpdates) {
                    this.parent.eventService.addChange({
                        action: 'Update',
                        data: {
                            block: block,
                            prevBlock: oldBlockClone
                        }
                    });
                    if (!preventEventTrigger) {
                        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                    }
                }
                break;
            }
            case 'IndentBlock':
                this.updateBlockIndentAttribute(this.parent.getBlockElementById(options.state.blockId), options.state.newIndent);
                break;
            case 'ReplaceBlock': {
                var _d = options.state, block = _d.block, oldBlock = _d.oldBlock, targetBlockId = _d.targetBlockId, preventEventTrigger = _d.preventEventTrigger;
                var blockElement = this.parent.getBlockElementById(targetBlockId);
                var newBlockElement = this.createBlockElement(block);
                blockElement.replaceWith(newBlockElement);
                this.parent.eventService.addChange({
                    action: 'Update',
                    data: {
                        block: block,
                        prevBlock: oldBlock
                    }
                });
                if (!preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
            case 'DefaultEmptyBlock':
                this.clearEditorAndRenderDefaultBlock();
                this.parent.eventService.addChange({
                    action: 'Insertion',
                    data: { block: this.parent.getEditorBlocks()[0] }
                });
                this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                break;
            case 'ReRenderBlockContent': {
                var data = options.state.data;
                data.forEach(function (data) {
                    if (!options.state.excludeDomUpdate) {
                        _this.reRenderBlockContent(data.block);
                    }
                    if (!options.state.preventChangesTracking) {
                        _this.parent.eventService.addChange({
                            action: 'Update',
                            data: {
                                block: data.block,
                                prevBlock: data.oldBlock
                            }
                        });
                    }
                });
                if (!options.state.preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
        }
    };
    BlockRenderer.prototype.getParentElementToInsert = function (destination, allBlocks) {
        var wrapperClassName = destination.toParentBlockModel
            ? (destination.toParentBlockModel.blockType === BlockType.Callout
                ? '.' + constants.CALLOUT_CONTENT_CLS
                : destination.toParentBlockModel.blockType.toString().startsWith('Collapsible')
                    ? '.' + constants.TOGGLE_CONTENT_CLS
                    : destination.toParentBlockModel.blockType === BlockType.Quote
                        ? '.' + constants.QUOTE_CONTENT_CLS
                        : '')
            : '';
        return wrapperClassName
            ? allBlocks[destination.toParentBlockIndex].querySelector(wrapperClassName)
            : this.parent.blockContainer;
    };
    BlockRenderer.prototype.destroy = function () {
        this.removeEventListeners();
        this.contentRenderer = null;
        this.paragraphRenderer = null;
        this.headingRenderer = null;
        this.listRenderer = null;
        this.codeRenderer = null;
        this.quoteRenderer = null;
        this.calloutRenderer = null;
        this.collapsibleRenderer = null;
        this.commonBlocksRenderer = null;
        this.tableRenderer = null;
    };
    return BlockRenderer;
}());
export { BlockRenderer };
