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
import { ChildProperty, Property } from '@syncfusion/ej2-base';
/**
 * Represents a command item model used in the command menu of the block editor component.
 *
 * Each command item defines an action that can be performed in the editor, such as inserting a block type.
 *
 */
var CommandItem = /** @class */ (function (_super) {
    __extends(CommandItem, _super);
    function CommandItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CommandItem.prototype, "id", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], CommandItem.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "label", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "groupBy", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "shortcut", void 0);
    return CommandItem;
}(ChildProperty));
export { CommandItem };
