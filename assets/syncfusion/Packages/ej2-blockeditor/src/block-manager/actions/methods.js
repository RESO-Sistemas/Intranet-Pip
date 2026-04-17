import { Browser, createElement, detach, isNullOrUndefined, print as printWindow } from '@syncfusion/ej2-base';
import { BlockType, CommandName } from '../../models/enums';
import { decoupleReference, getBlockContentElement, getBlockModelById, getInlineToolbarItems, getSelectedRange, hasActiveTableSelection, isListTypeBlock, setCursorPosition, setSelectionRange } from '../../common/utils/index';
import { convertHtmlElementToBlocks, getBlockDataAsHTML } from '../../common/utils/html-parser';
import * as constants from '../../common/constant';
import { BlockFactory } from '../services/index';
var BlockEditorMethods = /** @class */ (function () {
    function BlockEditorMethods(manager) {
        this.parent = manager;
    }
    BlockEditorMethods.prototype.addBlock = function (block, targetId, isAfter, preventUIUpdate) {
        var targetBlockModel = getBlockModelById(targetId, this.parent.getEditorBlocks());
        var populatedBlock = BlockFactory.populateBlockProperties([block], targetBlockModel ? targetBlockModel.parentId : '');
        this.parent.execCommand({
            command: 'AddBlock',
            state: {
                block: populatedBlock[0],
                targetBlock: this.parent.blockContainer.querySelector("#" + targetId),
                isAfter: isAfter,
                preventUIUpdate: preventUIUpdate
            }
        });
    };
    BlockEditorMethods.prototype.removeBlock = function (blockId) {
        var blockElement = this.parent.blockContainer.querySelector("#" + blockId);
        this.parent.execCommand({
            command: 'DeleteBlock',
            state: {
                blockElement: blockElement,
                isMethod: true,
                isUndoRedoAction: false,
                preventMinimumOne: true
            }
        });
    };
    BlockEditorMethods.prototype.getBlock = function (blockId) {
        return getBlockModelById(blockId, this.parent.getEditorBlocks());
    };
    BlockEditorMethods.prototype.moveBlock = function (fromBlockId, toBlockId) {
        this.parent.execCommand({
            command: 'MoveBlock',
            state: {
                fromBlockIds: [fromBlockId],
                toBlockId: toBlockId,
                isInteracted: false
            }
        });
    };
    BlockEditorMethods.prototype.updateBlock = function (blockId, properties) {
        if (!blockId || !properties) {
            return false;
        }
        var block = this.getBlock(blockId);
        if (!block) {
            return false;
        }
        /* Model Updates */
        this.parent.blockService.updateBlock(blockId, properties);
        this.parent.stateManager.updateManagerBlocks();
        /* UI Updates */
        var updatedBlockModel = this.getBlock(blockId);
        var oldBlockElement = this.parent.getBlockElementById(blockId);
        var newBlockElement = this.parent.blockRenderer.createBlockElement(updatedBlockModel);
        var parentBlock = getBlockModelById(updatedBlockModel.parentId, this.parent.getEditorBlocks());
        var wrapper = this.parent.blockContainer;
        if (parentBlock) {
            var parentBlockElement = this.parent.getBlockElementById(parentBlock.id);
            var selector = '';
            switch (parentBlock.blockType) {
                case BlockType.Callout:
                    selector = '.' + constants.CALLOUT_CONTENT_CLS;
                    break;
                case BlockType.Quote:
                    selector = '.' + constants.QUOTE_CONTENT_CLS;
                    break;
                default:
                    if (parentBlock.blockType.toString().startsWith('Collapsible')) {
                        selector = '.' + constants.TOGGLE_CONTENT_CLS;
                    }
                    break;
            }
            if (selector) {
                wrapper = parentBlockElement.querySelector(selector);
            }
        }
        if (wrapper) {
            wrapper.insertBefore(newBlockElement, oldBlockElement);
            detach(oldBlockElement);
        }
        if (isListTypeBlock(updatedBlockModel.blockType)) {
            this.parent.listPlugin.recalculateMarkersForListItems();
            if (block.blockType === BlockType.Checklist) {
                if (this.parent.blockRenderer.listRenderer) {
                    this.parent.blockRenderer.listRenderer.toggleCheckedState(updatedBlockModel, updatedBlockModel.properties.isChecked);
                }
            }
        }
        return true;
    };
    BlockEditorMethods.prototype.executeToolbarAction = function (command, value) {
        var builtInCommands = Object.keys(CommandName);
        if (builtInCommands.indexOf(command) !== -1) {
            var convertedCommand = command.toLowerCase();
            this.parent.formattingAction.execCommand({ command: convertedCommand, value: value });
        }
    };
    BlockEditorMethods.prototype.setSelection = function (node, start, end) {
        if (node) {
            setSelectionRange(node, start, end);
        }
    };
    BlockEditorMethods.prototype.setCursorPosition = function (blockId, position) {
        var blockElement = this.parent.getBlockElementById(blockId);
        if (blockElement) {
            var contentElement = getBlockContentElement(blockElement);
            setCursorPosition(contentElement, position);
        }
    };
    BlockEditorMethods.prototype.getSelectedBlocks = function () {
        var _this = this;
        var range = this.getRange();
        if (!range) {
            return null;
        }
        var tableBlk = this.parent.currentFocusedBlock &&
            this.parent.currentFocusedBlock.closest("." + constants.TABLE_BLOCK_CLS);
        if (tableBlk && hasActiveTableSelection(tableBlk)) {
            return this.parent.tableSelectionManager.getSelectedCellBlocks(tableBlk);
        }
        var selectedBlocks = [];
        var editorBlocks = this.parent.getEditorBlocks();
        var blockElements = this.parent.blockContainer.querySelectorAll('.' + constants.BLOCK_CLS);
        var parent = range.commonAncestorContainer;
        var element = parent.nodeType === Node.ELEMENT_NODE
            ? parent
            : parent.parentElement;
        var isSelectionInsideChild = !!(element && element.closest("." + constants.CALLOUT_CONTENT_CLS + ", ." + constants.QUOTE_CONTENT_CLS + ", ." + constants.TOGGLE_CONTENT_CLS + ", ." + constants.TABLE_CELL_BLK_CONTAINER));
        blockElements.forEach(function (blockElement) {
            var blockRange = document.createRange();
            blockRange.selectNodeContents(blockElement);
            var block = getBlockModelById(blockElement.id, editorBlocks);
            var isChildrenRootParent = isSelectionInsideChild &&
                (blockElement.classList.contains(constants.CALLOUT_BLOCK_CLS) ||
                    blockElement.classList.contains(constants.QUOTE_BLOCK_CLS) ||
                    blockElement.classList.contains(constants.TOGGLE_BLOCK_CLS) ||
                    blockElement.classList.contains(constants.TABLE_BLOCK_CLS));
            var tableRootBlk = blockElement.closest("." + constants.TABLE_BLOCK_CLS);
            var isSelectionInsideTableCell = _this.parent.currentFocusedBlock &&
                !isNullOrUndefined(_this.parent.currentFocusedBlock.closest('.e-cell-blocks-container'));
            var canAllowTableBlks = (!tableRootBlk || blockElement.classList.contains('e-table-block')
                || isSelectionInsideTableCell);
            if (block && range.intersectsNode(blockElement) && !isChildrenRootParent && canAllowTableBlks) {
                selectedBlocks.push(block);
            }
        });
        return selectedBlocks;
    };
    BlockEditorMethods.prototype.getRange = function () {
        return getSelectedRange();
    };
    BlockEditorMethods.prototype.selectRange = function (range) {
        var selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    BlockEditorMethods.prototype.selectBlock = function (blockId) {
        var blockElement = this.parent.getBlockElementById(blockId);
        if (blockElement) {
            var range = document.createRange();
            range.selectNodeContents(blockElement);
            this.selectRange(range);
        }
    };
    BlockEditorMethods.prototype.selectAllBlocks = function () {
        var range = document.createRange();
        range.selectNodeContents(this.parent.blockContainer);
        this.selectRange(range);
    };
    BlockEditorMethods.prototype.focusIn = function () {
        var startBlock = this.parent.getEditorBlocks()[0];
        var startBlkEle = this.parent.getBlockElementById(startBlock.id);
        if (startBlkEle) {
            this.parent.setFocusAndUIForNewBlock(startBlkEle);
        }
    };
    BlockEditorMethods.prototype.focusOut = function () {
        this.parent.removeFocusAndUIForBlock(this.parent.currentFocusedBlock);
        if (this.parent.blockContainer) {
            this.parent.blockContainer.blur();
            var selection = window.getSelection();
            selection.removeAllRanges();
        }
    };
    BlockEditorMethods.prototype.getBlockCount = function () {
        return this.parent.blocks.length;
    };
    BlockEditorMethods.prototype.enableDisableToolbarItems = function (itemId, enable) {
        var toolbarPopup = document.querySelector('#' + this.parent.rootEditorElement.id + constants.INLINE_TBAR_POPUP_ID);
        var ids = typeof itemId === 'string' ? [itemId] : itemId;
        var parentToolbarElements = [];
        var tbarItemModels = [];
        var items = this.parent.inlineToolbarSettings.items;
        ids.forEach(function (id) {
            items.forEach(function (it) {
                if (typeof it === 'string') {
                    if (it.toLowerCase() === id.toLowerCase()) {
                        var defaults = getInlineToolbarItems();
                        var match = defaults.find(function (d) {
                            return d.command && d.command.toLowerCase() === it.toLowerCase();
                        });
                        if (match) {
                            tbarItemModels.push(match);
                        }
                    }
                }
                else {
                    if (it.id === id || it.command === id) {
                        tbarItemModels.push(it);
                    }
                }
            });
        });
        tbarItemModels.forEach(function (item) {
            if (!item || !item.command) {
                return;
            }
            var element = toolbarPopup.querySelector("[data-command=" + item.command + "]");
            if (element) {
                parentToolbarElements.push(element);
            }
        });
        if (parentToolbarElements.length > 0) {
            this.parent.observer.notify('enableDisableTbarItems', {
                items: parentToolbarElements,
                isEnable: enable
            });
        }
    };
    BlockEditorMethods.prototype.getDataAsJson = function (blockId) {
        if (blockId) {
            var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
            return block ? decoupleReference(block) : null;
        }
        else {
            return this.parent.getEditorBlocks().map(function (block) { return decoupleReference(block); });
        }
    };
    BlockEditorMethods.prototype.getDataAsHtml = function (blockId) {
        if (blockId) {
            var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
            return block ? getBlockDataAsHTML([block], this.parent.rootEditorElement.id) : null;
        }
        else {
            return getBlockDataAsHTML(this.parent.getEditorBlocks(), this.parent.rootEditorElement.id);
        }
    };
    BlockEditorMethods.prototype.parseHtmlToBlocks = function (html) {
        var container = createElement('div', { innerHTML: html });
        return convertHtmlElementToBlocks(container, true);
    };
    BlockEditorMethods.prototype.renderBlocksFromJson = function (json, replace, targetBlockId) {
        try {
            var blocksJson = typeof json === 'string' ? JSON.parse(json) : json;
            var blocks = this.extractBlocks(blocksJson);
            var sanitizedBlocks = blocks.map(function (block) { return decoupleReference(block); });
            this.parent.stateManager.populateUniqueIds(sanitizedBlocks);
            var populatedBlocks = BlockFactory.populateBlockProperties(sanitizedBlocks);
            if (replace) {
                return this.replaceAllBlocks(populatedBlocks);
            }
            else {
                return this.insertBlocksAtPosition(populatedBlocks, targetBlockId);
            }
        }
        catch (e) {
            console.error('Error rendering blocks from JSON:', e);
            return false;
        }
    };
    BlockEditorMethods.prototype.extractBlocks = function (blocksJson) {
        var blocks = [];
        if (Array.isArray(blocksJson)) {
            blocks = blocksJson;
        }
        else if (blocksJson && typeof blocksJson === 'object') {
            if (Array.isArray(blocksJson.blocks)) {
                blocks = blocksJson.blocks;
            }
            else {
                // Try to convert single object to block if it looks like a block
                if (blocksJson.blockType) {
                    blocks = [blocksJson];
                }
            }
        }
        return blocks;
    };
    /**
     * Replaces all blocks in the editor with the provided blocks.
     *
     * @param {BlockModel[]} blocks - The blocks to render
     * @returns {boolean} - True if operation was successful, false otherwise
     * @hidden
     */
    BlockEditorMethods.prototype.replaceAllBlocks = function (blocks) {
        this.parent.setEditorBlocks([]);
        this.parent.blockContainer.innerHTML = '';
        if (blocks.length === 0) {
            this.parent.blockCommand.createDefaultEmptyBlock(true);
            return true;
        }
        this.parent.setEditorBlocks(blocks);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.blockRenderer.renderBlocks(this.parent.getEditorBlocks());
        return true;
    };
    /**
     * Inserts blocks at a specific position in the editor.
     *
     * @param {BlockModel[]} blocks - The blocks to insert
     * @param {string} targetBlockId - ID of the block to insert after, uses focused block if not provided
     * @returns {boolean} - True if operation was successful, false otherwise
     * @private
     */
    BlockEditorMethods.prototype.insertBlocksAtPosition = function (blocks, targetBlockId) {
        if (blocks.length === 0) {
            return false;
        }
        var insertionPointId = targetBlockId;
        if (!insertionPointId) {
            if (this.parent.currentFocusedBlock) {
                insertionPointId = this.parent.currentFocusedBlock.id;
            }
            else {
                insertionPointId = this.parent.getEditorBlocks()[this.parent.getEditorBlocks().length - 1].id;
                var blockElement = this.parent.getBlockElementById(insertionPointId);
                this.parent.setFocusToBlock(blockElement);
            }
        }
        var lastInsertedElement;
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            var targetId = i === 0 ? insertionPointId : lastInsertedElement.id;
            var addedBlock = this.parent.blockCommand.addBlock({
                block: block,
                targetBlock: this.parent.getBlockElementById(targetId),
                isAfter: true,
                preventEventTrigger: true
            });
            lastInsertedElement = this.parent.getBlockElementById(addedBlock.id);
        }
        if (lastInsertedElement) {
            var contentElement = getBlockContentElement(lastInsertedElement);
            this.parent.setFocusToBlock(lastInsertedElement);
            setCursorPosition(contentElement, contentElement.innerText.length);
        }
        return true;
    };
    BlockEditorMethods.prototype.print = function () {
        var blockHtml = getBlockDataAsHTML(this.parent.blocks, this.parent.rootEditorElement.id);
        var tempDiv = createElement('div');
        tempDiv.innerHTML = blockHtml;
        var printWind = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth);
        if (Browser.info.name === 'msie') {
            printWind.resizeTo(screen.availWidth, screen.availHeight);
        }
        printWind = printWindow(tempDiv, printWind);
    };
    return BlockEditorMethods;
}());
export { BlockEditorMethods };
