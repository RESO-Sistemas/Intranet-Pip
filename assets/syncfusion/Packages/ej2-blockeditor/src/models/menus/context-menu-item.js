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
import { ChildProperty, Collection, Property } from '@syncfusion/ej2-base';
/**
 * Represents a context menu item model in the block editor component.
 */
var ContextMenuItem = /** @class */ (function (_super) {
    __extends(ContextMenuItem, _super);
    function ContextMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], ContextMenuItem.prototype, "id", void 0);
    __decorate([
        Property('')
    ], ContextMenuItem.prototype, "text", void 0);
    __decorate([
        Property('')
    ], ContextMenuItem.prototype, "iconCss", void 0);
    __decorate([
        Property(false)
    ], ContextMenuItem.prototype, "separator", void 0);
    __decorate([
        Property('')
    ], ContextMenuItem.prototype, "shortcut", void 0);
    __decorate([
        Collection([], ContextMenuItem)
    ], ContextMenuItem.prototype, "items", void 0);
    return ContextMenuItem;
}(ChildProperty));
export { ContextMenuItem };
