import { detach } from '@syncfusion/ej2-base';
import { getBlockActionsMenuItems } from '../../common/utils/data';
import { events } from '../../common/constant';
import { sanitizeBlockActionItems } from '../../common/utils/transform';
import * as constants from '../../common/constant';
/**
 * `BlockActionMenuModule` is used to handle the block action menu in the BlockEditor.
 *
 * @hidden
 */
var BlockActionMenuModule = /** @class */ (function () {
    function BlockActionMenuModule(editor) {
        this.editor = editor;
        this.init();
        this.addEventListeners();
        this.bindTooltip();
    }
    BlockActionMenuModule.prototype.addEventListeners = function () {
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    BlockActionMenuModule.prototype.removeEventListeners = function () {
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    };
    BlockActionMenuModule.prototype.init = function () {
        this.menuElement = this.editor.createElement('ul', {
            id: (this.editor.element.id + constants.BLOCKACTION_MENUBAR_ID),
            styles: 'width: 100%'
        });
        this.editor.element.appendChild(this.menuElement);
        var itemTemplate = '<div class="e-blockaction-item-template">' +
            '<div class="e-action-icon-info">' +
            '<span class="e-action-icon ${iconCss}"></span>' +
            '</div>' +
            '<div class="e-action-item-info">' +
            '<div class="e-action-item-label">${label}</div>' +
            '${if(shortcut)}' +
            '<div class="e-action-item-shortcut">${shortcut}</div>' +
            '${/if}' +
            '</div>' +
            '</div>';
        this.menuObj = this.editor.menubarRenderer.renderMenubar({
            element: this.menuElement,
            cssClass: constants.BLOCKACTION_MENUBAR_CLS,
            items: this.getActionItems(),
            template: itemTemplate,
            orientation: 'Vertical',
            fields: { text: 'label', iconCss: 'iconCss' },
            select: this.handleBlockActionMenuSelect.bind(this)
        });
        var popupElement = this.editor.createElement('div', {
            id: (this.editor.element.id + constants.BLOCKACTION_POPUP_ID),
            className: constants.BLOCKACTION_POPUP_CLS
        });
        this.editor.element.appendChild(popupElement);
        this.editor.blockManager.observer.notify('actionMenuCreated');
    };
    BlockActionMenuModule.prototype.getActionItems = function () {
        var actionItems = this.editor.blockActionMenuSettings.items.length > 0
            ? sanitizeBlockActionItems(this.editor.blockActionMenuSettings.items)
            : getBlockActionsMenuItems();
        if (this.editor.blockActionMenuSettings.items.length <= 0) {
            var prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.blockActionMenuSettings.items = actionItems;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        return actionItems;
    };
    BlockActionMenuModule.prototype.bindTooltip = function () {
        if (!this.editor.blockActionMenuSettings.enableTooltip) {
            return;
        }
        this.blockActionTooltip = this.editor.tooltipRenderer.renderTooltip({
            cssClass: constants.BLOCKACTION_TOOLTIP_CLS,
            position: 'RightCenter',
            target: '.e-menu-item',
            windowCollision: true,
            element: document.querySelector('#' + this.editor.element.id + constants.BLOCKACTION_POPUP_ID)
        });
    };
    BlockActionMenuModule.prototype.applyRtlSettings = function () {
        if (this.menuObj) {
            this.menuObj.enableRtl = this.editor.enableRtl;
        }
        if (this.blockActionTooltip) {
            this.blockActionTooltip.position = this.editor.enableRtl ? 'LeftCenter' : 'RightCenter';
        }
    };
    BlockActionMenuModule.prototype.handleBlockActionMenuSelect = function (args) {
        var clickEventArgs = {
            item: args.item,
            element: args.element,
            isInteracted: (args.event && Object.keys(args.event).length > 0) ? true : false,
            cancel: false
        };
        if (this.editor.blockActionMenuSettings.itemSelect) {
            this.editor.blockActionMenuSettings.itemSelect.call(this, clickEventArgs);
        }
        if (!clickEventArgs.cancel) {
            this.editor.blockManager.observer.notify('blockActionsMenuSelect', args);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    BlockActionMenuModule.prototype.getModuleName = function () {
        return 'blockActionMenuSettings';
    };
    BlockActionMenuModule.prototype.destroy = function () {
        this.removeEventListeners();
        if (this.menuObj) {
            this.menuObj.destroy();
            detach(this.menuElement);
            this.menuObj = null;
            this.menuElement = null;
        }
        if (this.blockActionTooltip) {
            this.blockActionTooltip.destroy();
            this.blockActionTooltip = null;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    BlockActionMenuModule.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var newProp = e.newProp.blockActionMenuSettings;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'popupWidth':
                    this.editor.blockManager.observer.notify('popupWidthChanged', { value: newProp.popupWidth });
                    break;
                case 'popupHeight':
                    this.editor.blockManager.observer.notify('popupHeightChanged', { value: newProp.popupHeight });
                    break;
                case 'items':
                    this.menuObj.items = sanitizeBlockActionItems(newProp.items);
            }
        }
    };
    return BlockActionMenuModule;
}());
export { BlockActionMenuModule };
