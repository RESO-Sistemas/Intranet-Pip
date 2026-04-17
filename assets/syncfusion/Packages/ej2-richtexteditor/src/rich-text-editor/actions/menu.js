import { select } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import * as model from '../models/items';
import * as classes from '../base/classes';
import { RenderType } from '../base/enum';
import { getIndex } from '../base/util';
var MenuButton = /** @class */ (function () {
    function MenuButton(parent, serviceLocator) {
        this.isDestroyed = false;
        this.parent = parent;
        this.locator = serviceLocator;
        this.i10n = serviceLocator.getService('rteLocale');
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
        this.initRender = true;
    }
    MenuButton.prototype.addEventListener = function () {
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
    };
    MenuButton.prototype.renderMenu = function (toolbarItems, toolbarElement, containerType) {
        var _this = this;
        this.toolbarRenderer = this.renderFactory.getRenderer(RenderType.Toolbar);
        model.templateItems.forEach(function (item) {
            if (getIndex(item, toolbarItems) !== -1) {
                switch (item) {
                    case 'aicommands': {
                        var menuName = item;
                        var rootElement = select('#' + _this.parent.getID() + '_' + containerType.toLowerCase() + '_AICommandsDropDownMenu', toolbarElement);
                        var ulElement = _this.parent.createElement('ul', { id: _this.parent.getID() + '_' + containerType.toLowerCase() + '_AICommandsMenu' });
                        rootElement.appendChild(ulElement);
                        var argument = {
                            dropDownItems: {
                                iconCss: 'e-ai-chat e-icons',
                                cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_AI_COMMANDS_TBAR_BTN + ' ' + classes.CLS_DROPDOWN_MENU,
                                target: '#' + ulElement.id
                            },
                            menuItems: {
                                items: _this.parent.aiAssistantSettings.commands
                            },
                            name: menuName,
                            containerType: containerType,
                            toolbarElement: toolbarElement,
                            dropDownRoot: rootElement,
                            menuRoot: ulElement
                        };
                        var _a = _this.toolbarRenderer.renderMenu(argument), menu = _a.menu, dropDownButton = _a.dropDownButton;
                        _this.aiCommandsMenu = menu;
                        _this.aiCommandsDropDownButton = dropDownButton;
                        break;
                    }
                }
            }
        });
    };
    MenuButton.prototype.setRtl = function (args) {
        if (this.aiCommandsMenu) {
            this.aiCommandsMenu.setProperties({ enableRtl: args.enableRtl });
            this.aiCommandsDropDownButton.setProperties({ enableRtl: args.enableRtl });
        }
    };
    MenuButton.prototype.setCssClass = function (args) {
        if (this.aiCommandsMenu && !this.initRender) {
            this.aiCommandsMenu.setProperties({ cssClass: args.cssClass + ' e-rte-aicommands-menu' + 'e-rte-menu ' + classes.CLS_RTE_ELEMENTS });
            this.aiCommandsDropDownButton.setProperties({ cssClass: args.cssClass + '' + classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_AI_COMMANDS_TBAR_BTN + ' ' + classes.CLS_DROPDOWN_MENU });
        }
        else {
            this.initRender = false;
        }
    };
    MenuButton.prototype.destroyMenu = function () {
        if (this.aiCommandsMenu && !this.aiCommandsMenu.isDestroyed) {
            this.aiCommandsMenu.destroy();
            this.aiCommandsDropDownButton.destroy();
            this.aiCommandsMenu = null;
            this.aiCommandsDropDownButton = null;
        }
    };
    MenuButton.prototype.removeEventListener = function () {
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.bindCssClass, this.setCssClass);
    };
    MenuButton.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.destroyMenu();
        this.isDestroyed = true;
    };
    return MenuButton;
}());
export { MenuButton };
