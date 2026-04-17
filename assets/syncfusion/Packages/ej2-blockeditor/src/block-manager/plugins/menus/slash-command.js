import { BlockType } from '../../../models/enums';
import { events } from '../../../common/constant';
import { getNormalizedKey } from '../../../common/utils/common';
/**
 * `SlashCommandModule` module is used to handle the slash command actions in the BlockEditor.
 *
 * @hidden
 */
var SlashCommandModule = /** @class */ (function () {
    function SlashCommandModule(manager) {
        this.isPopupOpened = false;
        this.shortcutMap = new Map();
        this.parent = manager;
        this.addEventListeners();
    }
    SlashCommandModule.prototype.addEventListeners = function () {
        this.parent.observer.on(events.keydown, this.onKeyDown, this);
        this.parent.observer.on('slashMenuCreated', this.handleSlashMenuCreated, this);
        this.parent.observer.on('slashCommandChange', this.handleSlashCommandChange, this);
        this.parent.observer.on('updateSlashMenuPopupState', this.updateSlashMenuPopupState, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    SlashCommandModule.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.keydown, this.onKeyDown);
        this.parent.observer.off('slashMenuCreated', this.handleSlashMenuCreated);
        this.parent.observer.off('slashCommandChange', this.handleSlashCommandChange);
        this.parent.observer.off('updateSlashMenuPopupState', this.updateSlashMenuPopupState);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    SlashCommandModule.prototype.handleSlashMenuCreated = function () {
        this.buildShortcutMap();
    };
    SlashCommandModule.prototype.buildShortcutMap = function () {
        var _this = this;
        this.shortcutMap.clear();
        this.parent.commandMenuSettings.commands.forEach(function (item) {
            _this.shortcutMap.set(item.shortcut.toLowerCase(), item);
        });
    };
    SlashCommandModule.prototype.onKeyDown = function (e) {
        var normalizedKey = getNormalizedKey(e);
        if (!normalizedKey) {
            return;
        }
        var commandItem = this.shortcutMap.get(normalizedKey);
        if (commandItem) {
            e.preventDefault();
            this.transformBlocks(commandItem);
        }
    };
    SlashCommandModule.prototype.handleSlashCommandChange = function (args) {
        this.transformBlocks(args.itemData);
    };
    SlashCommandModule.prototype.getHeadingProps = function (itemId) {
        var extractedType = itemId.replace('-command', '');
        var level = parseInt(extractedType.slice(-1), 10);
        return { level: level };
    };
    SlashCommandModule.prototype.transformBlocks = function (commandItem) {
        var selectedItem = commandItem.type;
        if (!selectedItem || !this.parent.currentFocusedBlock) {
            return;
        }
        var isHeadingType = selectedItem === BlockType.Heading || selectedItem === BlockType.CollapsibleHeading;
        var headingProps = isHeadingType ? this.getHeadingProps(commandItem.id) : undefined;
        this.parent.blockCommand.transformBlocksForSelection(selectedItem, headingProps);
    };
    SlashCommandModule.prototype.updateSlashMenuPopupState = function (options) {
        this.isPopupOpened = options.isOpen;
        if (!options.isOpen) {
            this.parent.isPopupOpenedOnAddIconClick = false;
        }
    };
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    SlashCommandModule.prototype.isPopupOpen = function () {
        var mentionPopupId = this.parent.blockContainer.id + "_popup";
        var commandPopupElement = document.querySelector("#" + mentionPopupId + ".e-blockeditor-command-menu");
        return this.isPopupOpened && (commandPopupElement && commandPopupElement.classList.contains('e-popup-open'));
    };
    /**
     * Hides the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.hidePopup = function () {
        this.parent.observer.notify('hideSlashMenuPopup');
    };
    /**
     * Shows the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    SlashCommandModule.prototype.showPopup = function () {
        this.parent.observer.notify('showSlashMenuPopup');
    };
    SlashCommandModule.prototype.filterCommands = function (text, xOffset, yOffset) {
        this.parent.observer.notify('filterSlashCommands', { text: text, offsetX: xOffset, offsetY: yOffset });
    };
    /**
     * Destroys the slash command module.
     *
     * @returns {void}
     */
    SlashCommandModule.prototype.destroy = function () {
        this.removeEventListeners();
        this.shortcutMap = null;
    };
    return SlashCommandModule;
}());
export { SlashCommandModule };
