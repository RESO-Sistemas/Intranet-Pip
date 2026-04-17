import { BlockType } from '../../../models/enums';
import { events } from '../../../common/constant';
import * as constants from '../../../common/constant';
import { getNormalizedKey } from '../../../common/utils/common';
import { getAdjacentBlock, getBlockModelById } from '../../../common/utils/block';
import { getSelectedRange } from '../../../common/utils/selection';
/**
 * `ContextMenuModule` is used to handle the context menu actions in the BlockEditor.
 *
 * @hidden
 */
var ContextMenuModule = /** @class */ (function () {
    function ContextMenuModule(manager) {
        this.isPopupOpened = false;
        this.isClipboardEmptyCache = true;
        this.shortcutMap = new Map();
        this.parent = manager;
        this.addEventListeners();
    }
    ContextMenuModule.prototype.addEventListeners = function () {
        this.parent.observer.on(events.keydown, this.onKeyDown, this);
        this.parent.observer.on('contextMenuCreated', this.handleContextMenuCreated, this);
        this.parent.observer.on('contextMenuBeforeOpen', this.handleContextMenuBeforeOpen, this);
        this.parent.observer.on('updateContextMenuState', this.updateContextMenuPopupState, this);
        this.parent.observer.on('contextMenuSelection', this.handleContextMenuSelection, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    ContextMenuModule.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.keydown, this.onKeyDown);
        this.parent.observer.off('contextMenuCreated', this.handleContextMenuCreated);
        this.parent.observer.off('contextMenuBeforeOpen', this.handleContextMenuBeforeOpen);
        this.parent.observer.off('updateContextMenuState', this.updateContextMenuPopupState);
        this.parent.observer.off('contextMenuSelection', this.handleContextMenuSelection);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    ContextMenuModule.prototype.handleContextMenuCreated = function () {
        this.buildShortcutMap();
    };
    ContextMenuModule.prototype.buildShortcutMap = function () {
        var _this = this;
        this.shortcutMap.clear();
        this.parent.contextMenuSettings.items.forEach(function (item) {
            _this.shortcutMap.set(item.shortcut.toLowerCase(), item);
        });
    };
    ContextMenuModule.prototype.onKeyDown = function (e) {
        var normalizedKey = getNormalizedKey(e);
        if (!normalizedKey) {
            return;
        }
        var menuItem = this.shortcutMap.get(normalizedKey);
        if (menuItem && menuItem.id !== 'cut' && menuItem.id !== 'copy' && menuItem.id !== 'paste') {
            e.preventDefault();
            this.handleContextMenuActions(menuItem, e);
        }
    };
    ContextMenuModule.prototype.handleContextMenuBeforeOpen = function (args) {
        var _this = this;
        if (!this.parent.currentFocusedBlock) {
            this.parent.setFocusAndUIForNewBlock(this.parent.currentHoveredBlock);
        }
        this.toggleDisabledItems();
        this.parent.blockActionMenuModule.toggleBlockActionPopup(true);
        this.parent.linkModule.hideLinkPopup();
        setTimeout(function () {
            if (_this.parent.inlineToolbarModule) {
                _this.parent.inlineToolbarModule.hideInlineToolbar(args.event);
            }
        }, 50);
    };
    ContextMenuModule.prototype.updateContextMenuPopupState = function (value) {
        this.isPopupOpened = value.isOpen;
    };
    ContextMenuModule.prototype.handleContextMenuSelection = function (args) {
        this.handleContextMenuActions(args.item, args.event);
    };
    ContextMenuModule.prototype.handleIndentationAction = function (shouldDecrease) {
        this.parent.execCommand({ command: 'IndentBlock', state: {
                blockIDs: this.parent.editorMethods.getSelectedBlocks().map(function (block) { return block.id; }),
                shouldDecrease: shouldDecrease
            } });
    };
    ContextMenuModule.prototype.handleContextMenuActions = function (menuItem, e) {
        var prop = menuItem.id.toLowerCase();
        switch (prop) {
            case 'undo':
                this.parent.undoRedoAction.undo();
                break;
            case 'redo':
                this.parent.undoRedoAction.redo();
                break;
            case 'cut':
                this.parent.clipboardAction.handleContextCut();
                break;
            case 'copy':
                this.parent.clipboardAction.handleContextCopy();
                break;
            case 'paste':
                this.parent.clipboardAction.handleContextPaste();
                break;
            case 'link':
                this.parent.linkModule.showLinkPopup(e);
                break;
            case 'increaseindent':
            case 'decreaseindent':
                this.handleIndentationAction(prop === 'decreaseindent');
                break;
        }
    };
    ContextMenuModule.prototype.toggleDisabledItems = function () {
        if (!getSelectedRange() || !this.parent.currentFocusedBlock) {
            return;
        }
        var blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        var tableBlk = this.parent.currentFocusedBlock.closest("." + constants.TABLE_BLOCK_CLS);
        var notAllowedTypes = [BlockType.Image, BlockType.Code];
        var isNotAllowedType = notAllowedTypes.indexOf(blockModel.blockType) !== -1;
        var previousBlockElement = getAdjacentBlock(this.parent.currentFocusedBlock, 'previous');
        var previousBlockModel = previousBlockElement
            ? getBlockModelById(previousBlockElement.id, this.parent.getEditorBlocks())
            : null;
        var canIndent = (!tableBlk && (!previousBlockModel ||
            (previousBlockModel && blockModel.indent <= previousBlockModel.indent) && !isNotAllowedType));
        var canOutdent = !tableBlk && (blockModel.indent > 0 && !isNotAllowedType);
        var isSelection = getSelectedRange().toString().trim().length > 0;
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        var canAllowLink = isSelection && !isNotAllowedType && (selectedBlocks && selectedBlocks.length === 1);
        var menuState = {
            'increaseindent': canIndent,
            'decreaseindent': canOutdent,
            'undo': this.parent.undoRedoAction.canUndo(),
            'redo': this.parent.undoRedoAction.canRedo(),
            'link': canAllowLink,
            'cut': isSelection,
            'copy': isSelection,
            'paste': true
        };
        this.parent.observer.notify('enableDisableContextMenuItems', menuState);
    };
    /**
     * Checks whether the context menu is opened or not.
     *
     * @returns {boolean} - Returns true if the context menu is opened, otherwise false.
     * @hidden
     */
    ContextMenuModule.prototype.isPopupOpen = function () {
        return this.isPopupOpened;
    };
    /**
     * Destroys the ContextMenu module.
     *
     * @returns {void}
     */
    ContextMenuModule.prototype.destroy = function () {
        this.removeEventListeners();
        this.shortcutMap = null;
    };
    return ContextMenuModule;
}());
export { ContextMenuModule };
