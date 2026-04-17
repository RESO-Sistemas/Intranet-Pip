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
import { Observer, extend, isNullOrUndefined as isNOU, remove } from '@syncfusion/ej2-base';
import { getScrollableParent } from '@syncfusion/ej2-popups';
import { events } from '../../common/constant';
import * as constants from '../../common/constant';
import { BlockCommand } from '../plugins/block/block-command';
import { BlockFactory, BlockService, EventService, TableService } from '../services/index';
import { StateManager } from '../services/state-manager';
import { NodeSelection } from '../../selection/selection';
import { PopupRenderer } from '../renderer/common/popup-renderer';
import { BlockActionMenuModule, ContextMenuModule, SlashCommandModule } from '../plugins/menus/index';
import { FloatingIcon } from '../actions/floating-icon';
import { decode, encode, findCellById, getBlockContentElement, getBlockModelById, isAlwaysOnPlaceHolderBlk, NodeCutter, sanitizeHelper, setCursorPosition } from '../../common/utils/index';
import { BlockType } from '../../models/enums';
import { clearBreakTags, findClosestParent, isElementEmpty } from '../../common/utils/dom';
import { ListPlugin } from '../plugins/block/list';
import { UndoRedoAction } from '../actions/undo';
import { BlockEditorMethods } from '../actions/methods';
import { FormattingAction } from '../actions/formatting';
import { LinkModule } from '../plugins/inline/link';
import { InlineContentInsertionModule } from '../plugins/inline/inline-content';
import { ClipboardAction } from '../actions/clipboard';
import { MentionAction } from '../actions/mention';
import { DragAndDropAction } from '../actions/drag';
import { InlineToolbarModule } from '../actions/inline-toolbar';
import { EventAction } from '../actions/event';
import { BlockRenderer } from '../plugins/block/block-renderer';
import { TableSelectionManager } from '../plugins/table/selection-manager';
import { SelectionOverlay } from '../renderer/common/selection-overlay';
var BlockManager = /** @class */ (function () {
    function BlockManager() {
        this.defaultKeyConfig = {
            bold: 'ctrl+b',
            italic: 'ctrl+i',
            underline: 'ctrl+u',
            strikethrough: 'ctrl+shift+x',
            inlineCode: 'ctrl+`',
            link: 'ctrl+k',
            print: 'ctrl+p'
        };
        this.observer = new Observer(this);
    }
    BlockManager.prototype.updateContext = function (BlockEditorObj) {
        extend(this, this, BlockEditorObj);
    };
    BlockManager.prototype.initialize = function () {
        /* Populate all block level properties which are not provided on application end */
        var populatedBlocks = BlockFactory.populateBlockProperties(this.blocks);
        this.blocks = populatedBlocks.slice();
        this.observer.notify('updateEditorBlocks', { blocks: this.blocks });
        this.blockCommand = new BlockCommand(this);
        this.stateManager = new StateManager(this);
        this.blockService = new BlockService(this.blocks);
        this.eventService = new EventService(this);
        this.tableService = new TableService(this);
        this.tableSelectionManager = new TableSelectionManager(this);
        this.blockCommand.createDefaultEmptyBlock();
        this.popupRenderer = new PopupRenderer(this);
        this.blockRenderer = new BlockRenderer(this);
        this.listPlugin = new ListPlugin(this);
        this.nodeSelection = new NodeSelection(this.blockContainer);
        this.nodeCutter = new NodeCutter();
        this.selectionOverlay = new SelectionOverlay(this);
        this.lastHighlightedBlockId = '';
        this.eventAction = new EventAction(this);
        this.floatingIconAction = new FloatingIcon(this);
        this.undoRedoAction = new UndoRedoAction(this);
        this.formattingAction = new FormattingAction(this);
        this.clipboardAction = new ClipboardAction(this);
        this.dragAndDropAction = new DragAndDropAction(this);
        this.mentionAction = new MentionAction(this);
        this.editorMethods = new BlockEditorMethods(this);
        this.inlineContentInsertionModule = new InlineContentInsertionModule(this);
        this.linkModule = new LinkModule(this);
        this.inlineToolbarModule = new InlineToolbarModule(this);
        this.blockActionMenuModule = new BlockActionMenuModule(this);
        this.contextMenuModule = new ContextMenuModule(this);
        this.slashCommandModule = new SlashCommandModule(this);
        this.scrollParentElements = getScrollableParent(this.rootEditorElement);
        this.wireEvents();
        this.initializeKeyBindings();
    };
    BlockManager.prototype.wireEvents = function () {
        this.observer.on(events.destroy, this.destroy, this);
    };
    BlockManager.prototype.unwireEvents = function () {
        this.observer.off(events.destroy, this.destroy);
    };
    /**
     * Initializes the key bindings
     *
     * @returns {void}
     */
    BlockManager.prototype.initializeKeyBindings = function () {
        var config = __assign({}, this.defaultKeyConfig, this.keyConfig);
        var map = new Map();
        for (var command in config) {
            if (Object.prototype.hasOwnProperty.call(config, command)) {
                var keyCombo = config["" + command].toLowerCase().replace(/\s+/g, '');
                map.set(keyCombo, command);
            }
        }
        this.keyCommandMap = map;
    };
    BlockManager.prototype.execCommand = function (options) {
        switch (options.command) {
            case 'AddBlock':
                this.observer.notify(constants.ADDBLOCK, options.state);
                break;
            case 'SplitBlock':
                this.observer.notify(constants.SPLITBLOCK, options.state);
                break;
            case 'DeleteBlock':
                this.observer.notify(constants.DELETEBLOCK, options.state);
                break;
            case 'DeleteAtCursor':
                this.observer.notify(constants.DELETEATCURSOR, options.state);
                break;
            case 'DuplicateBlock':
                this.observer.notify(constants.DUPLICATEBLOCK, options.state);
                break;
            case 'IndentBlock':
                this.observer.notify(constants.INDENTBLOCK, options.state);
                break;
            case 'MoveBlock':
                this.observer.notify(constants.MOVEBLOCK, options.state);
                break;
            case 'FormattingAction':
                this.observer.notify(constants.FORMATTINGACTION, options.state);
                break;
            case 'DeleteNonMergableBlock':
                this.observer.notify(constants.DELETE_NON_MERGABLEBLOCK, options.state);
                break;
        }
    };
    /**
     * Sets focus to a block element
     *
     * @param {HTMLElement} block The block element to focus
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.setFocusToBlock = function (block) {
        if (block) {
            block.focus();
            this.currentFocusedBlock = block;
        }
    };
    /**
     * Fetches the editor blocks from service
     *
     * @returns {BlockModel[]} The editor blocks data
     * @hidden
     */
    BlockManager.prototype.getEditorBlocks = function () {
        if (!this.blockService) {
            return [];
        }
        return this.blockService.getBlocks();
    };
    /**
     * Populates the editor blocks data with the given blocks
     *
     * @param {BlockModel[]} blocks The blocks to set for the editor
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.setEditorBlocks = function (blocks) {
        if (!this.blockService) {
            return;
        }
        this.blockService.setBlocks(blocks);
    };
    /**
     * Gets a block element by ID
     *
     * @param {string} blockId The block ID
     * @returns {HTMLElement | null} The block element or null if not found
     * @hidden
     */
    BlockManager.prototype.getBlockElementById = function (blockId) {
        return this.blockContainer.querySelector("#" + blockId);
    };
    /**
     * Adjusts the view to focus on the current block
     *
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.adjustViewForFocusedBlock = function () {
        if (!this.currentFocusedBlock) {
            return;
        }
        var editorBlocks = this.getEditorBlocks();
        var lastBlock = editorBlocks[editorBlocks.length - 1];
        var containerRect = this.rootEditorElement.getBoundingClientRect();
        var blockRect = this.currentFocusedBlock.getBoundingClientRect();
        if (lastBlock && lastBlock.id === this.currentFocusedBlock.id) {
            this.rootEditorElement.scrollTo({ top: this.rootEditorElement.scrollHeight });
        }
        else if (blockRect.bottom > containerRect.bottom) {
            this.rootEditorElement.scrollTop += blockRect.bottom - containerRect.bottom;
        }
    };
    /**
     * Sets the focus and UI for a new block
     *
     * @param {HTMLElement} blockElement The block element to focus
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.setFocusAndUIForNewBlock = function (blockElement) {
        this.togglePlaceholder(this.currentFocusedBlock, false);
        this.setFocusToBlock(blockElement);
        setCursorPosition(getBlockContentElement(blockElement), 0);
        this.togglePlaceholder(this.currentFocusedBlock, true);
        this.floatingIconAction.showFloatingIcons(this.currentFocusedBlock);
    };
    /**
     * Removes the focus and UI for the given block
     *
     * @param {HTMLElement} blockElement The block element to remove focus
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.removeFocusAndUIForBlock = function (blockElement) {
        this.togglePlaceholder(blockElement, false);
        this.currentFocusedBlock = null;
        this.floatingIconAction.hideFloatingIcons();
    };
    /**
     * Gets the placeholder value for the given block element.
     *
     * @param {BlockModel} block The block model to get placeholder for.
     * @returns {string} The placeholder value for the given block type.
     * @hidden
     */
    BlockManager.prototype.getPlaceholderValue = function (block) {
        var props = block.properties;
        var tableCell = findCellById(block.parentId, this.getEditorBlocks());
        if (tableCell || (props && props.placeholder && props.placeholder !== '')) {
            return props.placeholder;
        }
        var constant = block.blockType.charAt(0).toLowerCase() + block.blockType.slice(1);
        if (block.blockType.endsWith(BlockType.Heading) && props && props.level) {
            constant += props.level.toString();
        }
        return this.localeJson[constant];
    };
    /**
     * Toggles the placeholder for a block element
     *
     * @param {HTMLElement} blockElement The block element
     * @param {boolean} isFocused Whether the block is currently focused
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.togglePlaceholder = function (blockElement, isFocused) {
        var blockModel = blockElement ? getBlockModelById(blockElement.id, this.getEditorBlocks()) : null;
        var isTableBlock = blockElement && findClosestParent(blockElement, "." + constants.TABLE_BLOCK_CLS);
        var isCalloutBlock = blockElement && findClosestParent(blockElement, "." + constants.CALLOUT_BLOCK_CLS);
        var isQuoteBlock = blockElement && findClosestParent(blockElement, "." + constants.QUOTE_BLOCK_CLS);
        var isCalloutHasOneChild = isCalloutBlock && isCalloutBlock.querySelectorAll("." + constants.BLOCK_CLS).length === 1;
        var isQuoteHasOneChild = isQuoteBlock && isQuoteBlock.querySelectorAll("." + constants.BLOCK_CLS).length === 1;
        var isAlwaysOnBlock = blockModel && isAlwaysOnPlaceHolderBlk(blockModel.blockType);
        var tableCriteria = (isTableBlock &&
            ((blockModel && !(blockModel.properties.placeholder)) || !isFocused));
        var isNullPlaceholder = (blockModel && (blockModel && !('placeholder' in blockModel.properties)));
        if (!blockModel || isNullPlaceholder || tableCriteria || (isAlwaysOnBlock && !isFocused) || (isCalloutHasOneChild && !isFocused) ||
            (isQuoteHasOneChild && !isFocused)) {
            return;
        }
        var blockType = blockElement.getAttribute('data-block-type');
        var placeholderValue = this.getPlaceholderValue(blockModel);
        var contentEle = getBlockContentElement(blockElement);
        var isEmptyContent = isElementEmpty(contentEle);
        contentEle.setAttribute('placeholder', isEmptyContent && isFocused ? placeholderValue : '');
        if (isEmptyContent && blockType !== BlockType.Code) {
            clearBreakTags(contentEle);
        }
    };
    /**
     * Removes all placeholder attributes from block contents
     * and refreshes the placeholder for the current focused block
     *
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.refreshPlaceholder = function () {
        var _this = this;
        this.rootEditorElement.querySelectorAll('.' + constants.CONTENT_CLS).forEach(function (el) {
            var blockEle = el.closest("." + constants.BLOCK_CLS);
            _this.togglePlaceholder(blockEle, false);
        });
        if (this.currentFocusedBlock) {
            this.togglePlaceholder(this.currentFocusedBlock, true);
        }
    };
    /**
     * Sets the cursor position after adding a bulk block (Clipboard paste)
     *
     * @param {string} insertionType - The type of insertion (blocks or text)
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.setCursorAfterBulkBlockAddition = function (insertionType) {
        var cursorElement = this.currentFocusedBlock;
        var cursorpos = cursorElement.textContent.length;
        if (insertionType === 'blocks') {
            cursorElement = (cursorElement.nextElementSibling || cursorElement);
            cursorpos = 0;
            this.togglePlaceholder(this.currentFocusedBlock, false);
            this.togglePlaceholder(cursorElement, true);
        }
        this.setFocusToBlock(cursorElement);
        setCursorPosition(getBlockContentElement(cursorElement), cursorpos);
    };
    /**
     * Updates focus and cursor position
     *
     * @param {HTMLElement} blockElement The block element to split
     * @returns {void}
     * @hidden
     */
    BlockManager.prototype.updateFocusAndCursor = function (blockElement) {
        if (blockElement) {
            var content = getBlockContentElement(blockElement);
            this.setFocusToBlock(blockElement);
            setCursorPosition(content, 0);
            this.floatingIconAction.showFloatingIcons(blockElement);
        }
    };
    /**
     * Serializes the given value for HTML encoding and sanitization
     *
     * @param {string} value The value to serialize
     * @returns {string} The serialized value
     * @hidden
     */
    BlockManager.prototype.serializeValue = function (value) {
        if (!isNOU(value) && value.trim() !== '') {
            if (this.enableHtmlEncode) {
                value = sanitizeHelper(decode(value), this.enableHtmlSanitizer);
                value = encode(value);
            }
            else {
                value = sanitizeHelper(value, this.enableHtmlSanitizer);
            }
        }
        return value;
    };
    BlockManager.prototype.removeAndNullify = function (element) {
        if (element) {
            if (!isNOU(element.parentNode)) {
                remove(element);
            }
            else {
                element.innerHTML = '';
            }
        }
    };
    BlockManager.prototype.destroyBlockEditor = function () {
        var properties = [
            'currentHoveredBlock',
            'currentFocusedBlock',
            'blockContainer'
        ];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            var element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    };
    BlockManager.prototype.destroy = function () {
        this.scrollParentElements = [];
        this.unwireEvents();
        if (!isNOU(this.updateTimer)) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
        this.popupRenderer = null;
        if (this.selectionOverlay) {
            this.selectionOverlay.destroy();
        }
        this.selectionOverlay = null;
        this.inlineToolbarModule = null;
        this.inlineContentInsertionModule = null;
        this.slashCommandModule = null;
        this.contextMenuModule = null;
        this.blockActionMenuModule = null;
        this.linkModule = null;
        this.nodeSelection = null;
        this.nodeCutter = null;
        this.popupRenderer = null;
        this.lastHighlightedBlockId = null;
        this.eventAction = null;
        this.formattingAction = null;
        this.listPlugin = null;
        this.editorMethods = null;
        this.mentionAction = null;
        this.stateManager = null;
        this.blockService = null;
        this.eventService = null;
        this.blockCommand = null;
        this.blockRenderer = null;
        this.tableService = null;
        this.tableSelectionManager = null;
        this.keyCommandMap = null;
        this.defaultKeyConfig = null;
        this.dragAndDropAction = null;
        this.undoRedoAction = null;
        this.updateTimer = null;
        this.destroyBlockEditor();
    };
    return BlockManager;
}());
export { BlockManager };
