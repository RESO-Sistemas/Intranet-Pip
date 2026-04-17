import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { getCommandMenuItems } from '../../common/utils/data';
import { BlockType } from '../../models/enums';
import { events } from '../../common/constant';
import { sanitizeCommandMenuItems } from '../../common/utils/transform';
import * as constants from '../../common/constant';
import { findClosestParent } from '../../common/utils/dom';
/**
 * `SlashCommandModule` module is used to handle the slash command actions in the BlockEditor.
 *
 * @hidden
 */
var SlashCommandModule = /** @class */ (function () {
    function SlashCommandModule(editor) {
        this.editor = editor;
        this.init();
        this.addEventListeners();
    }
    SlashCommandModule.prototype.addEventListeners = function () {
        this.editor.blockManager.observer.on('showSlashMenuPopup', this.showPopup, this);
        this.editor.blockManager.observer.on('hideSlashMenuPopup', this.hidePopup, this);
        this.editor.blockManager.observer.on('filterSlashCommands', this.filterCommands, this);
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    SlashCommandModule.prototype.removeEventListeners = function () {
        this.editor.blockManager.observer.off('showSlashMenuPopup', this.showPopup);
        this.editor.blockManager.observer.off('hideSlashMenuPopup', this.hidePopup);
        this.editor.blockManager.observer.off('filterSlashCommands', this.filterCommands);
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    };
    SlashCommandModule.prototype.init = function () {
        var mentionArgs = {
            element: this.editor.blockContainer,
            mentionChar: '/',
            dataSource: this.getCommandItems(),
            cssClass: 'e-blockeditor-command-menu e-blockeditor-mention-menu',
            highlight: true,
            fields: { text: 'label', value: 'label', iconCss: 'iconCss', groupBy: 'groupBy', disabled: 'disabled' },
            itemTemplate: '<div class="e-command-mention-item-template" title="${tooltip}"><div class="e-command-icon-info"><span class="e-command-icon ${iconCss}"></span></div><div class="e-command-item-info"><div class="e-command-title">${label}</div>${if(shortcut)}<div class="e-command-shortcut">${shortcut}</div>${/if}</div></div>',
            displayTemplate: '',
            popupWidth: this.editor.commandMenuSettings.popupWidth,
            popupHeight: this.editor.commandMenuSettings.popupHeight,
            change: this.handleSlashCommandChange.bind(this),
            beforeOpen: this.handleSlashCommandBeforeOpen.bind(this),
            opened: this.handleSlashCommandOpened.bind(this),
            beforeClose: this.handleSlashCommandBeforeClose.bind(this),
            select: this.handleSlashCommandSelect.bind(this),
            filtering: this.handleSlashCommandFiltering.bind(this)
        };
        this.mentionObj = this.editor.mentionRenderer.renderMention(mentionArgs);
        this.applyRtlSettings();
        this.editor.blockManager.observer.notify('slashMenuCreated');
    };
    SlashCommandModule.prototype.getCommandItems = function () {
        var slashMenuOptions = this.editor.commandMenuSettings.commands.length > 0
            ? sanitizeCommandMenuItems(this.editor.commandMenuSettings.commands)
            : getCommandMenuItems();
        if (this.editor.commandMenuSettings.commands.length <= 0) {
            var prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.commandMenuSettings.commands = slashMenuOptions;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        return slashMenuOptions;
    };
    SlashCommandModule.prototype.bindTooltipForSlashPopup = function (popupEle) {
        var _this = this;
        this.slashMenuTooltip = this.editor.tooltipRenderer.renderTooltip({
            cssClass: 'e-blockeditor-command-menu-tooltip',
            position: 'RightCenter',
            target: '.e-list-item',
            windowCollision: true,
            element: popupEle,
            beforeRender: function (args) {
                var target = args.target;
                var templateRoot = target.querySelector('.e-command-mention-item-template');
                if (target.classList.contains(constants.DISABLED_CLS) || !templateRoot) {
                    args.cancel = true;
                    return;
                }
                var tooltipVal = templateRoot.getAttribute('title');
                if (tooltipVal) {
                    _this.slashMenuTooltip.content = tooltipVal;
                }
                else {
                    args.cancel = true;
                }
            }
        });
    };
    SlashCommandModule.prototype.setActiveItem = function (popupEle) {
        var firstItem = popupEle.querySelector('.e-list-item');
        if (firstItem) {
            firstItem.classList.add('e-active');
        }
    };
    SlashCommandModule.prototype.clearTooltipState = function () {
        if (this.slashMenuTooltip) {
            this.slashMenuTooltip.destroy();
        }
    };
    SlashCommandModule.prototype.handleSlashCommandChange = function (args) {
        args.e.preventDefault();
        args.e.stopPropagation();
        this.editor.blockManager.observer.notify('slashCommandChange', args);
    };
    SlashCommandModule.prototype.handleSlashCommandFiltering = function (args) {
        var filterArgs = {
            commands: this.editor.commandMenuSettings.commands,
            text: args.text,
            event: args.baseEventArgs,
            cancel: false
        };
        if (this.editor.commandMenuSettings.filtering) {
            this.editor.commandMenuSettings.filtering.call(this, filterArgs);
            args.cancel = filterArgs.cancel;
            if (!args.cancel) {
                args.updateData(filterArgs.commands);
            }
        }
    };
    SlashCommandModule.prototype.handleSlashCommandSelect = function (args) {
        var itemClickArgs = {
            command: this.editor.commandMenuSettings.commands.find(function (c) { return c.id === args.itemData.id; }),
            element: args.item,
            event: args.e,
            isInteracted: true,
            cancel: false
        };
        if (this.editor.commandMenuSettings.itemSelect) {
            this.editor.commandMenuSettings.itemSelect.call(this, itemClickArgs);
        }
        args.cancel = itemClickArgs.cancel;
    };
    SlashCommandModule.prototype.handleSlashCommandOpened = function (args) {
        var mentionPopupId = this.editor.blockContainer.id + "_popup";
        var popupEle = document.querySelector("#" + mentionPopupId + ".e-blockeditor-command-menu");
        this.clearTooltipState();
        this.bindTooltipForSlashPopup(popupEle);
        this.setActiveItem(popupEle);
        var tableBlock = this.editor.blockManager.currentFocusedBlock
            ? findClosestParent(this.editor.blockManager.currentFocusedBlock, "." + constants.TABLE_BLOCK_CLS)
            : null;
        if (tableBlock) {
            this.restrictItemsOnSpecificBlock([BlockType.Table], popupEle);
        }
        this.editor.blockManager.observer.notify('updateSlashMenuPopupState', { isOpen: true });
    };
    SlashCommandModule.prototype.restrictItemsOnSpecificBlock = function (blockTypes, popupEle) {
        blockTypes.forEach(function (blockType) {
            var listItem = popupEle.querySelector("[data-value=" + blockType + "]");
            if (listItem) {
                listItem.classList.add(constants.HIDDEN_CLS);
            }
        });
    };
    SlashCommandModule.prototype.handleSlashCommandBeforeOpen = function (args) {
        if (this.editor.blockManager.currentFocusedBlock) {
            args.cancel = this.restrictPopupForBlockTypes(this.editor.blockManager.currentFocusedBlock.getAttribute('data-block-type'));
        }
    };
    SlashCommandModule.prototype.handleSlashCommandBeforeClose = function (args) {
        this.editor.blockManager.observer.notify('updateSlashMenuPopupState', { isOpen: false });
        this.clearTooltipState();
    };
    SlashCommandModule.prototype.restrictPopupForBlockTypes = function (blockType) {
        return blockType === BlockType.Code || blockType === BlockType.Image;
    };
    SlashCommandModule.prototype.applyRtlSettings = function () {
        this.mentionObj.enableRtl = this.editor.enableRtl;
        this.mentionObj.enablePersistence = this.editor.enablePersistence;
        this.mentionObj.locale = this.editor.locale;
        if (this.slashMenuTooltip) {
            this.slashMenuTooltip.position = this.editor.enableRtl ? 'LeftCenter' : 'RightCenter';
        }
    };
    /**
     * Hides the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.hidePopup = function () {
        if (this.mentionObj) {
            this.mentionObj.hidePopup();
        }
    };
    /**
     * Shows the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.showPopup = function () {
        var mentionPopupId = this.editor.blockContainer.id + "_popup";
        var popupElement = document.querySelector("#" + mentionPopupId + ".e-blockeditor-command-menu");
        if (popupElement && popupElement.classList.contains('e-popup-open')) {
            return;
        }
        if (this.mentionObj) {
            this.mentionObj.showPopup();
        }
    };
    /**
     * Filters the slash commands based on the given text.
     *
     * @param {{ text: string, offsetX: number, offsetY: number }} options - options to filter the slash commands.
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.filterCommands = function (options) {
        if (this.mentionObj) {
            if (options.text.length > SlashCommandModule.MAX_FILTER_TEXT_LENGTH) {
                this.hidePopup();
                return;
            }
            var rect = this.editor.floatingIconRenderer.floatingIconContainer.getBoundingClientRect();
            options.offsetX += rect.width;
            this.mentionObj.search(options.text, options.offsetX, options.offsetY);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.getModuleName = function () {
        return 'slashCommand';
    };
    /**
     * Destroys the slash command module.
     *
     * @returns {void}
     */
    SlashCommandModule.prototype.destroy = function () {
        this.removeEventListeners();
        if (this.mentionObj) {
            this.mentionObj.destroy();
            this.mentionObj = null;
        }
        if (this.slashMenuTooltip) {
            this.slashMenuTooltip.destroy();
            this.slashMenuTooltip = null;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var newProp = e.newProp.commandMenuSettings;
        if (!isNullOrUndefined(newProp)) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'popupWidth':
                        this.mentionObj.popupWidth = this.editor.blockManager.commandMenuSettings.popupWidth;
                        break;
                    case 'popupHeight':
                        this.mentionObj.popupHeight = this.editor.blockManager.commandMenuSettings.popupHeight;
                        break;
                    case 'commands':
                        this.mentionObj.dataSource = this.editor.blockManager.commandMenuSettings.commands =
                            sanitizeCommandMenuItems(newProp.commands);
                        break;
                }
            }
        }
    };
    SlashCommandModule.MAX_FILTER_TEXT_LENGTH = 6;
    return SlashCommandModule;
}());
export { SlashCommandModule };
