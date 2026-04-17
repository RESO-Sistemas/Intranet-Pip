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
import { Collection, Event, Property, ChildProperty } from '@syncfusion/ej2-base';
import { BlockActionItem } from './blockaction-item';
/**
 * Represents BlockActionMenuSettings in the block editor component.
 */
var BlockActionMenuSettings = /** @class */ (function (_super) {
    __extends(BlockActionMenuSettings, _super);
    function BlockActionMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], BlockActionMenuSettings.prototype, "enable", void 0);
    __decorate([
        Collection([], BlockActionItem)
    ], BlockActionMenuSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], BlockActionMenuSettings.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], BlockActionMenuSettings.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], BlockActionMenuSettings.prototype, "itemSelect", void 0);
    __decorate([
        Property('230px')
    ], BlockActionMenuSettings.prototype, "popupWidth", void 0);
    __decorate([
        Property('auto')
    ], BlockActionMenuSettings.prototype, "popupHeight", void 0);
    __decorate([
        Property(true)
    ], BlockActionMenuSettings.prototype, "enableTooltip", void 0);
    return BlockActionMenuSettings;
}(ChildProperty));
export { BlockActionMenuSettings };
