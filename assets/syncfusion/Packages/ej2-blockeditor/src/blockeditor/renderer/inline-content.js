import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { BlockType } from '../../models/index';
import { extractBlockTypeFromElement, getAutoAvatarColor, getLabelMentionDisplayTemplate, getLabelMenuItems, getUserInitials, getUserMentionDisplayTemplate, sanitizeLabelItems } from '../../common/utils/index';
import { events } from '../../common/constant';
var InlineContentInsertionModule = /** @class */ (function () {
    function InlineContentInsertionModule(editor) {
        this.editor = editor;
        this.addEventListeners();
    }
    InlineContentInsertionModule.prototype.addEventListeners = function () {
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    InlineContentInsertionModule.prototype.removeEventListeners = function () {
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.destroy, this.destroy);
    };
    /**
     * Initializes the user mention module.
     *
     * @returns {void}
     * @hidden
     */
    InlineContentInsertionModule.prototype.initializeUserMention = function () {
        var _this = this;
        var mentionDataSource = this.editor.users.map(function (user) { return ({
            id: user.id,
            user: user.user.trim(),
            avatarUrl: user.avatarUrl,
            avatarBgColor: user.avatarBgColor || getAutoAvatarColor(user.id),
            initials: getUserInitials(user.user)
        }); });
        var mentionArgs = {
            element: this.editor.blockContainer,
            itemTemplate: '<div class="e-user-mention-item-template"><div class="em-avatar" style="background-color: ${avatarBgColor};">${if(avatarUrl)} <img src="${avatarUrl}" alt="${user}" class="em-img" /> ${else} <div class="em-initial">${initials}</div> ${/if} </div><div class="em-content"><div class="em-text">${user}</div></div></div>',
            displayTemplate: getUserMentionDisplayTemplate(),
            dataSource: mentionDataSource,
            popupWidth: '200px',
            cssClass: 'e-blockeditor-user-menu e-blockeditor-mention-menu',
            fields: { text: 'user', value: 'id' },
            change: this.handleInlineContentInsertion.bind(this),
            beforeOpen: function (args) {
                var focusedBlk = _this.editor.blockManager.currentFocusedBlock;
                args.cancel = (_this.editor.users.length === 0)
                    || (focusedBlk && extractBlockTypeFromElement(focusedBlk) === BlockType.Code);
            }
        };
        this.userMenuObj = this.editor.mentionRenderer.renderMention(mentionArgs);
    };
    /**
     * Initializes the label mention module.
     *
     * @returns {void}
     * @hidden
     */
    InlineContentInsertionModule.prototype.initializeLabelContent = function () {
        var _this = this;
        var items;
        if (this.editor.labelSettings.items.length > 0) {
            items = sanitizeLabelItems(this.editor.labelSettings.items);
        }
        else {
            items = getLabelMenuItems();
            var prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.labelSettings.items = items;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        var mentionArgs = {
            element: this.editor.blockContainer,
            mentionChar: this.editor.labelSettings.triggerChar,
            itemTemplate: '<div class="e-label-mention-item-template"><div class="em-avatar" style="background-color: ${labelColor};"> </div><div class="em-content"><span class="em-icon ${iconCss}"></span><div class="em-text">${text}</div></div></div>',
            displayTemplate: getLabelMentionDisplayTemplate(),
            dataSource: items,
            popupWidth: '200px',
            cssClass: 'e-blockeditor-label-menu e-blockeditor-mention-menu',
            fields: { text: 'text', value: 'id', groupBy: 'groupBy', iconCss: 'iconCss' },
            change: this.handleInlineContentInsertion.bind(this),
            beforeOpen: function (args) {
                var focusedBlk = _this.editor.blockManager.currentFocusedBlock;
                args.cancel = (focusedBlk && extractBlockTypeFromElement(focusedBlk) === BlockType.Code);
            }
        };
        this.labelMenuObj = this.editor.mentionRenderer.renderMention(mentionArgs);
    };
    InlineContentInsertionModule.prototype.handleInlineContentInsertion = function (args) {
        // args.e.preventDefault();
        // args.e.stopPropagation();
        this.editor.blockManager.observer.notify('inlineContentInsertion', args);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    InlineContentInsertionModule.prototype.getModuleName = function () {
        return 'inlineContent';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    InlineContentInsertionModule.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var newLabelProp = e.newProp.labelSettings;
        if (!isNullOrUndefined(newLabelProp)) {
            for (var _i = 0, _a = Object.keys(newLabelProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'items':
                        this.labelMenuObj.dataSource = newLabelProp.items;
                        break;
                    case 'triggerChar':
                        this.labelMenuObj.mentionChar = newLabelProp.triggerChar;
                        break;
                }
            }
        }
        if (!isNullOrUndefined(e.newProp.users)) {
            this.userMenuObj.dataSource = e.newProp.users;
        }
    };
    /**
     * Destroys the inline content module.
     *
     * @returns {void}
     */
    InlineContentInsertionModule.prototype.destroy = function () {
        if (this.userMenuObj) {
            this.userMenuObj.destroy();
        }
        if (this.labelMenuObj) {
            this.labelMenuObj.destroy();
        }
        this.removeEventListeners();
        this.userMenuObj = null;
        this.labelMenuObj = null;
    };
    return InlineContentInsertionModule;
}());
export { InlineContentInsertionModule };
