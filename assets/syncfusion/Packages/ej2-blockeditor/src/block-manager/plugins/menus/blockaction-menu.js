import { detach } from '@syncfusion/ej2-base';
import { getBlockIndexById, getBlockModelById, isListTypeBlock } from '../../../common/utils/block';
import { events } from '../../../common/constant';
import { getNormalizedKey } from '../../../common/utils/common';
import * as constants from '../../../common/constant';
/**
 * `BlockActionMenuModule` is used to handle the block action menu in the BlockEditor.
 *
 * @hidden
 */
var BlockActionMenuModule = /** @class */ (function () {
    function BlockActionMenuModule(manager) {
        this.isPopupOpened = false;
        this.shortcutMap = new Map();
        this.parent = manager;
        this.addEventListeners();
    }
    BlockActionMenuModule.prototype.addEventListeners = function () {
        this.parent.observer.on(events.keydown, this.onKeyDown, this);
        this.parent.observer.on('actionMenuCreated', this.handleMenuCreated, this);
        this.parent.observer.on('popupWidthChanged', this.handlePopupWidthChanges, this);
        this.parent.observer.on('popupHeightChanged', this.handlePopupHeightChanges, this);
        this.parent.observer.on('blockActionsMenuSelect', this.handleBlockActionMenuSelect, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    BlockActionMenuModule.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.keydown, this.onKeyDown);
        this.parent.observer.off('actionMenuCreated', this.handleMenuCreated);
        this.parent.observer.off('popupWidthChanged', this.handlePopupWidthChanges);
        this.parent.observer.off('popupHeightChanged', this.handlePopupHeightChanges);
        this.parent.observer.off('blockActionsMenuSelect', this.handleBlockActionMenuSelect);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    BlockActionMenuModule.prototype.handleMenuCreated = function () {
        this.menuWrapperElement = this.parent.rootEditorElement.querySelector("." + constants.BLOCKACTION_MENUBAR_CLS);
        this.init();
        this.buildShortcutMap();
    };
    BlockActionMenuModule.prototype.init = function () {
        var popupElement = document.querySelector("#" + (this.parent.rootEditorElement.id + constants.BLOCKACTION_POPUP_ID));
        var args = {
            relateTo: this.parent.rootEditorElement,
            element: popupElement,
            content: this.menuWrapperElement,
            width: this.parent.blockActionMenuSettings.popupWidth,
            height: this.parent.blockActionMenuSettings.popupHeight
        };
        this.popupObj = this.parent.popupRenderer.renderPopup(args);
    };
    BlockActionMenuModule.prototype.buildShortcutMap = function () {
        var _this = this;
        this.shortcutMap.clear();
        this.parent.blockActionMenuSettings.items.forEach(function (item) {
            _this.shortcutMap.set(item.shortcut.toLowerCase(), item);
        });
    };
    BlockActionMenuModule.prototype.onKeyDown = function (e) {
        var normalizedKey = getNormalizedKey(e);
        var isTable = this.parent.currentFocusedBlock &&
            this.parent.currentFocusedBlock.closest("." + constants.TABLE_BLOCK_CLS);
        if (!normalizedKey || isTable) {
            return;
        }
        var actionItem = this.shortcutMap.get(normalizedKey);
        if (actionItem) {
            e.preventDefault();
            this.handleBlockActions(actionItem, this.parent.currentHoveredBlock, e);
        }
    };
    /**
     * Toggles the block action popup based on the provided flag.
     *
     * @param {boolean} shouldHide - Flag indicating whether to hide or show the popup.
     * @param {Event} e - Optional event object.
     * @returns {void}
     * @hidden
     */
    BlockActionMenuModule.prototype.toggleBlockActionPopup = function (shouldHide, e) {
        var _this = this;
        setTimeout(function () {
            if (_this.parent && _this.parent.inlineToolbarModule) {
                _this.parent.inlineToolbarModule.hideInlineToolbar();
            }
        }, 10);
        if (this.popupObj) {
            if (shouldHide) {
                var closeEventArgs = {
                    event: e,
                    items: this.parent.blockActionMenuSettings.items,
                    cancel: false,
                    callback: function (args) {
                        if (args.cancel) {
                            return;
                        }
                        _this.parent.selectionOverlay.clearSelectionOverlay();
                        _this.popupObj.hide();
                        _this.isPopupOpened = false;
                    }
                };
                this.parent.observer.notify('blockActionsMenuClose', closeEventArgs);
            }
            else {
                var openEventArgs = {
                    event: e,
                    items: this.parent.blockActionMenuSettings.items,
                    cancel: false,
                    callback: function (args) {
                        if (args.cancel) {
                            return;
                        }
                        _this.toggleDisabledItems(_this.parent.currentHoveredBlock);
                        _this.popupObj.show();
                        _this.isPopupOpened = true;
                        setTimeout(function () {
                            var items = _this.popupObj.element.querySelectorAll('.e-menu-item');
                            if (items.length > 0) {
                                items[0].focus();
                                items[0].classList.add('e-focused');
                            }
                        });
                    }
                };
                this.parent.observer.notify('blockActionsMenuOpen', openEventArgs);
            }
        }
    };
    BlockActionMenuModule.prototype.getParentBlock = function (parentId) {
        return getBlockModelById(parentId, this.parent.getEditorBlocks());
    };
    BlockActionMenuModule.prototype.isFirstChildBlock = function (block, parentBlock) {
        var children = parentBlock.properties.children;
        return (children.length > 0 && children[0].id === block.id);
    };
    BlockActionMenuModule.prototype.isLastChildBlock = function (block, parentBlock) {
        var children = parentBlock.properties.children;
        return (children.length > 0 && children[children.length - 1].id === block.id);
    };
    BlockActionMenuModule.prototype.toggleMenuItemClass = function (itemId, disable) {
        var listElement = this.popupObj.element.querySelector("#" + itemId);
        if (listElement) {
            listElement.classList.toggle(constants.DISABLED_CLS, disable);
        }
    };
    BlockActionMenuModule.prototype.getBlockPositionInfo = function (blockElement) {
        var allBlocks = this.parent.getEditorBlocks();
        var currentBlock = getBlockModelById(blockElement.id, allBlocks);
        var currentBlockParent = this.getParentBlock(currentBlock.parentId);
        var currentBlockIndex = getBlockIndexById(blockElement.id, allBlocks);
        var isFirstBlock = currentBlockIndex === 0;
        var isLastBlock = currentBlockIndex === (currentBlockParent
            ? currentBlockParent.properties.children.length - 1
            : allBlocks.length - 1);
        var hasOnlyOneBlock = allBlocks.length === 1;
        return { currentBlock: currentBlock, currentBlockParent: currentBlockParent, isFirstBlock: isFirstBlock, isLastBlock: isLastBlock, hasOnlyOneBlock: hasOnlyOneBlock };
    };
    BlockActionMenuModule.prototype.toggleDisabledItems = function (blockElement) {
        if (!blockElement) {
            return;
        }
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (selectedBlocks && selectedBlocks.length > 1) {
            for (var _i = 0, _a = this.parent.blockActionMenuSettings.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.toggleMenuItemClass(item.id, true);
            }
            return;
        }
        var _b = this.getBlockPositionInfo(blockElement), currentBlock = _b.currentBlock, currentBlockParent = _b.currentBlockParent, isFirstBlock = _b.isFirstBlock, isLastBlock = _b.isLastBlock, hasOnlyOneBlock = _b.hasOnlyOneBlock;
        for (var _c = 0, _d = this.parent.blockActionMenuSettings.items; _c < _d.length; _c++) {
            var item = _d[_c];
            var disable = item.disabled;
            switch (item.id) {
                case 'moveup':
                    disable = hasOnlyOneBlock || isFirstBlock;
                    if (currentBlockParent && this.isFirstChildBlock(currentBlock, currentBlockParent)) {
                        disable = true;
                    }
                    break;
                case 'movedown':
                    disable = hasOnlyOneBlock || isLastBlock;
                    if (currentBlockParent && this.isLastChildBlock(currentBlock, currentBlockParent)) {
                        disable = true;
                    }
                    break;
            }
            this.toggleMenuItemClass(item.id, disable);
        }
    };
    BlockActionMenuModule.prototype.handleBlockActionMenuSelect = function (args) {
        this.handleBlockActions(args.item, this.parent.currentHoveredBlock, args.event);
    };
    BlockActionMenuModule.prototype.handlePopupWidthChanges = function (data) {
        this.popupObj.width = this.parent.blockActionMenuSettings.popupWidth = data.value.toString();
    };
    BlockActionMenuModule.prototype.handlePopupHeightChanges = function (data) {
        this.popupObj.height = this.parent.blockActionMenuSettings.popupWidth = data.value.toString();
    };
    BlockActionMenuModule.prototype.handleBlockActions = function (item, blockElement, e) {
        var selectedItem = item.label.replace(' ', '').toLowerCase();
        var toBlockElement;
        var toBlockModel;
        switch (selectedItem) {
            case 'duplicate':
                this.parent.execCommand({ command: 'DuplicateBlock', state: {
                        blockElement: blockElement, direction: 'below'
                    } });
                break;
            case 'delete': {
                var adjacentBlock = (blockElement.nextElementSibling || blockElement.previousElementSibling);
                if (adjacentBlock) {
                    this.parent.setFocusAndUIForNewBlock(adjacentBlock);
                }
                this.parent.execCommand({ command: 'DeleteBlock', state: { blockElement: blockElement } });
                break;
            }
            case 'moveup':
            case 'movedown': {
                this.toggleDisabledItems(blockElement);
                if (!blockElement || this.isItemDisabled(item.id)) {
                    return;
                }
                toBlockElement = (selectedItem === 'moveup' ? blockElement.previousElementSibling : blockElement.nextElementSibling);
                if (toBlockElement) {
                    toBlockModel = getBlockModelById(toBlockElement.id, this.parent.getEditorBlocks());
                    this.parent.execCommand({ command: 'MoveBlock', state: {
                            fromBlockIds: [blockElement.id],
                            toBlockId: toBlockElement.id
                        } });
                }
                break;
            }
        }
        var currentBlockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        if ((currentBlockModel && isListTypeBlock(currentBlockModel.blockType)) ||
            (toBlockModel && isListTypeBlock(toBlockModel.blockType))) {
            this.parent.listPlugin.recalculateMarkersForListItems();
        }
        this.toggleBlockActionPopup(true, e);
    };
    BlockActionMenuModule.prototype.isItemDisabled = function (itemId) {
        var listElement = this.popupObj.element.querySelector('#' + itemId);
        return listElement && listElement.classList.contains(constants.DISABLED_CLS);
    };
    /**
     * Checks whether the block action popup is opened or not.
     *
     * @returns {boolean} - Returns true if the block action popup is opened, otherwise false.
     * @hidden
     */
    BlockActionMenuModule.prototype.isPopupOpen = function () {
        return this.isPopupOpened;
    };
    BlockActionMenuModule.prototype.destroy = function () {
        this.removeEventListeners();
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
            this.popupObj = null;
        }
        this.shortcutMap = null;
    };
    return BlockActionMenuModule;
}());
export { BlockActionMenuModule };
