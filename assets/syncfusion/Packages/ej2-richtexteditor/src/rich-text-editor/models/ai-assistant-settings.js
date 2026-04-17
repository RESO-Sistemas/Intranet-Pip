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
import { DEFAULT_AI_COMMANDS } from './items';
/**
 * Configures AI Assistant functionality for the Rich Text Editor component.
 * This class provides options to customize the appearance, behavior, and content of the AI Assistant feature.
 */
var AIAssistantSettings = /** @class */ (function (_super) {
    __extends(AIAssistantSettings, _super);
    function AIAssistantSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(DEFAULT_AI_COMMANDS)
    ], AIAssistantSettings.prototype, "commands", void 0);
    __decorate([
        Property('400px')
    ], AIAssistantSettings.prototype, "popupMaxHeight", void 0);
    __decorate([
        Property('600px')
    ], AIAssistantSettings.prototype, "popupWidth", void 0);
    __decorate([
        Property('Ask AI to rewrite or generate content.')
    ], AIAssistantSettings.prototype, "placeholder", void 0);
    __decorate([
        Property(['AIcommands', 'Close'])
    ], AIAssistantSettings.prototype, "headerToolbarSettings", void 0);
    __decorate([
        Property(['Edit', 'Copy'])
    ], AIAssistantSettings.prototype, "promptToolbarSettings", void 0);
    __decorate([
        Property(['Regenerate', 'Copy', '|', 'Insert'])
    ], AIAssistantSettings.prototype, "responseToolbarSettings", void 0);
    __decorate([
        Property([])
    ], AIAssistantSettings.prototype, "prompts", void 0);
    __decorate([
        Property([])
    ], AIAssistantSettings.prototype, "suggestions", void 0);
    __decorate([
        Property('')
    ], AIAssistantSettings.prototype, "bannerTemplate", void 0);
    __decorate([
        Property(20)
    ], AIAssistantSettings.prototype, "maxPromptHistory", void 0);
    return AIAssistantSettings;
}(ChildProperty));
export { AIAssistantSettings };
