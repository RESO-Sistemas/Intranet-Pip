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
 * Configures the font color settings of the Block Editor component.
 * Use this class to customize text color options including default color, display mode (palette or picker), grid layout, and custom color palettes.
 */
var FontColorSettings = /** @class */ (function (_super) {
    __extends(FontColorSettings, _super);
    function FontColorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#ff0000')
    ], FontColorSettings.prototype, "default", void 0);
    __decorate([
        Property('Palette')
    ], FontColorSettings.prototype, "mode", void 0);
    __decorate([
        Property(10)
    ], FontColorSettings.prototype, "columns", void 0);
    __decorate([
        Property(null)
    ], FontColorSettings.prototype, "colorCode", void 0);
    __decorate([
        Property(false)
    ], FontColorSettings.prototype, "modeSwitcher", void 0);
    return FontColorSettings;
}(ChildProperty));
export { FontColorSettings };
