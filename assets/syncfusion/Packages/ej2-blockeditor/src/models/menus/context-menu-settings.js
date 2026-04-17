var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Collection, ChildProperty, Property, Event } from '@syncfusion/ej2-base';
import { ContextMenuItem } from './context-menu-item';
/**
 * Represents ContextMenuSettings in the block editor component.
 */
var ContextMenuSettings = /** @class */ (function (_super) {
    __extends(ContextMenuSettings, _super);
    function ContextMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ContextMenuSettings.prototype, "enable", void 0);
    __decorate([
        Property(false)
    ], ContextMenuSettings.prototype, "showItemOnClick", void 0);
    __decorate([
        Collection([], ContextMenuItem)
    ], ContextMenuSettings.prototype, "items", void 0);
    __decorate([
        Property(null)
    ], ContextMenuSettings.prototype, "itemTemplate", void 0);
    __decorate([
        Event()
    ], ContextMenuSettings.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], ContextMenuSettings.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], ContextMenuSettings.prototype, "itemSelect", void 0);
    return ContextMenuSettings;
}(ChildProperty));
export { ContextMenuSettings };
