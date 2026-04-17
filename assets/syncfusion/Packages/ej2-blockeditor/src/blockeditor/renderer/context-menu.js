import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getContextMenuItems } from '../../common/utils/data';
import { events } from '../../common/constant';
import { sanitizeContextMenuItems } from '../../common/utils/transform';
import * as constants from '../../common/constant';
/**
 * `ContextMenuModule` is used to handle the context menu actions in the BlockEditor.
 *
 * @hidden
 */
var ContextMenuModule = /** @class */ (function () {
    function ContextMenuModule(editor) {
        this.editor = editor;
        this.init();
        this.addEventListeners();
    }
    ContextMenuModule.prototype.addEventListeners = function () {
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.blockManager.observer.on('enableDisableContextMenuItems', this.enableMenuItems, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    ContextMenuModule.prototype.removeEventListeners = function () {
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.blockManager.observer.off('enableDisableContextMenuItems', this.enableMenuItems);
        this.editor.off(events.destroy, this.destroy);
    };
    ContextMenuModule.prototype.init = function () {
        this.menuElement = this.editor.createElement('ul', {
            id: (this.editor.element.id + constants.BLOCKEDITOR_CONTEXTMENU_ID)
        });
        document.body.appendChild(this.menuElement);
        var itemTemplate = '${if(!separator)}' +
            '<div class="e-ctmenu-item-template">' +
            '<div class="e-ctmenu-content">' +
            '<span class="e-ctmenu-icon ${iconCss}"></span>' +
            '<span class="e-ctmenu-text">${text}</span>' +
            '</div>' +
            '${if(shortcut)}' +
            '<div class="e-ctmenu-shortcut">${shortcut}</div>' +
            '${/if}' +
            '</div>' +
            '${/if}';
        this.contextMenuObj = this.editor.menubarRenderer.renderContextMenu({
            target: '#' + this.editor.element.id,
            cssClass: constants.BLOCKEDITOR_CONTEXTMENU_CLS,
            element: this.menuElement,
            items: this.getMenuItems(),
            showItemOnClick: this.editor.contextMenuSettings.showItemOnClick,
            itemTemplate: itemTemplate,
            fields: { text: 'text', iconCss: 'iconCss', itemId: 'id' },
            select: this.handleContextMenuSelection.bind(this),
            beforeOpen: this.handleContextMenuBeforeOpen.bind(this),
            beforeClose: this.handleContextMenuBeforeClose.bind(this),
            open: this.handleContextMenuOpen.bind(this),
            close: this.handleContextMenuClose.bind(this)
        });
        this.editor.blockManager.observer.notify('contextMenuCreated');
    };
    ContextMenuModule.prototype.getMenuItems = function () {
        var menuItems = this.editor.contextMenuSettings.items.length > 0
            ? sanitizeContextMenuItems(this.editor.contextMenuSettings.items)
            : getContextMenuItems();
        if (this.editor.contextMenuSettings.items.length <= 0) {
            var prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.contextMenuSettings.items = menuItems;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        return menuItems;
    };
    ContextMenuModule.prototype.handleContextMenuBeforeOpen = function (args) {
        var eventArgs = {
            event: args.event,
            items: this.editor.contextMenuSettings.items,
            parentItem: args.parentItem,
            cancel: !this.editor.contextMenuSettings.enable
        };
        if (this.editor.contextMenuSettings.beforeOpen) {
            this.editor.contextMenuSettings.beforeOpen.call(this, eventArgs);
        }
        args.cancel = eventArgs.cancel;
        if (this.editor.readOnly) {
            args.cancel = true;
        }
        if (!args.cancel) {
            this.editor.blockManager.observer.notify('contextMenuBeforeOpen', args);
        }
    };
    ContextMenuModule.prototype.handleContextMenuBeforeClose = function (args) {
        var eventArgs = {
            event: args.event,
            items: this.editor.contextMenuSettings.items,
            parentItem: args.parentItem,
            cancel: false
        };
        if (this.editor.contextMenuSettings.beforeClose) {
            this.editor.contextMenuSettings.beforeClose.call(this, eventArgs);
        }
        args.cancel = eventArgs.cancel;
    };
    ContextMenuModule.prototype.handleContextMenuOpen = function (args) {
        this.editor.blockManager.observer.notify('updateContextMenuState', { value: { isOpen: true } });
    };
    ContextMenuModule.prototype.handleContextMenuClose = function (args) {
        this.editor.blockManager.observer.notify('updateContextMenuState', { value: { isOpen: false } });
    };
    ContextMenuModule.prototype.handleContextMenuSelection = function (args) {
        var clickEventArgs = {
            item: args.item,
            event: args.event,
            cancel: false
        };
        if (this.editor.contextMenuSettings.itemSelect) {
            this.editor.contextMenuSettings.itemSelect.call(this, clickEventArgs);
        }
        if (!clickEventArgs.cancel) {
            this.editor.blockManager.observer.notify('contextMenuSelection', args);
        }
    };
    ContextMenuModule.prototype.enableMenuItems = function (menuState) {
        var _this = this;
        if (this.contextMenuObj) {
            var itemIds = Object.keys(menuState);
            itemIds.forEach(function (item) {
                _this.contextMenuObj.enableItems([item], menuState[item], true);
            });
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    ContextMenuModule.prototype.getModuleName = function () {
        return 'contextMenuSettings';
    };
    /**
     * Destroys the ContextMenu module.
     *
     * @returns {void}
     */
    ContextMenuModule.prototype.destroy = function () {
        if (this.contextMenuObj) {
            this.contextMenuObj.destroy();
            this.contextMenuObj = null;
            detach(this.menuElement);
            this.menuElement = null;
        }
        this.removeEventListeners();
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    ContextMenuModule.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var newProp = e.newProp.contextMenuSettings;
        if (!isNullOrUndefined(newProp)) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'showItemOnClick':
                        this.contextMenuObj.showItemOnClick = this.editor.blockManager.contextMenuSettings.showItemOnClick =
                            newProp.showItemOnClick;
                        break;
                    case 'items':
                        this.contextMenuObj.items = this.editor.blockManager.contextMenuSettings.items =
                            sanitizeContextMenuItems(newProp.items);
                        break;
                    case 'itemTemplate':
                        this.contextMenuObj.itemTemplate = newProp.itemTemplate;
                        break;
                }
            }
        }
    };
    return ContextMenuModule;
}());
export { ContextMenuModule };
