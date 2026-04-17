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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../interactive-chat-base/interactive-chat-base-model.d.ts'/>
import { NotifyPropertyChanges, Property } from '@syncfusion/ej2-base';
import { InterActiveChatBase } from '../interactive-chat-base/interactive-chat-base';
/**
 * Specifies the type of footer.
 */
export var ToolbarPosition;
(function (ToolbarPosition) {
    /**
     * Displays the toolbar inline with the content.
     */
    ToolbarPosition["Inline"] = "Inline";
    /**
     * Displays the toolbar at the bottom of the edit area.
     */
    ToolbarPosition["Bottom"] = "Bottom";
})(ToolbarPosition || (ToolbarPosition = {}));
/**
 * AIBase component act as base class.
 */
var AIAssistBase = /** @class */ (function (_super) {
    __extends(AIAssistBase, _super);
    function AIAssistBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    AIAssistBase.prototype.preRender = function () {
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    AIAssistBase.prototype.getModuleName = function () {
        return 'aiAssistBase';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    AIAssistBase.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    AIAssistBase.prototype.render = function () {
    };
    // Blur only when focus truly leaves the wrapper subtree.
    // Use FocusEvent for focusout. Do NOT blur on icon interaction if you want the caret to stay.
    AIAssistBase.prototype.onFooterIconsFocusOut = function (e) {
        var wrapper = e.currentTarget;
        var editable = this.editableTextarea;
        var next = e.relatedTarget;
        if (!editable) {
            return;
        }
        // Only blur when focus moves outside the entire wrapper
        if (!next || !wrapper.contains(next)) {
            // If you want the caret to remain even when leaving, remove this blur.
            editable.blur();
        }
    };
    // Focus the editable when clicking/tapping the empty area of the wrapper.
    // Do not cancel the event; do not use pointer capture, so toolbar icon clicks work.
    AIAssistBase.prototype.onFooterIconsPointerDown = function (e) {
        var _this = this;
        var editable = this.editableTextarea;
        var target = e.target;
        if (!editable) {
            return;
        }
        var selectors = '';
        if (this.getModuleName() === 'aiassistview') {
            selectors = '.e-tbar-btn, .e-assist-send, .e-assist-attachment-icon, .e-assist-clear-icon, button, [role="button"], input, [contenteditable="false"]';
        }
        else {
            selectors = '.e-tbar-btn, .e-send, button, [role="button"], input';
        }
        // If the press is on actionable elements (toolbar buttons/icons), let them handle it.
        if (target.closest(selectors)) {
            return;
        }
        // Focus and place caret at end
        requestAnimationFrame(function () {
            editable.focus();
            _this.setFocusAtEnd(editable);
        });
    };
    // Optional: support click as a fallback (some environments may not dispatch pointer events)
    AIAssistBase.prototype.onFooterIconsClick = function (e) {
        var _this = this;
        var editable = this.editableTextarea;
        var target = e.target;
        if (!editable) {
            return;
        }
        var selectors = '';
        if (this.getModuleName() === 'aiassistview') {
            selectors = '.e-tbar-btn, .e-assist-send, .e-assist-attachment-icon, .e-assist-clear-icon, button, [role="button"], input, [contenteditable="false"]';
        }
        else {
            selectors = '.e-tbar-btn, .e-send, .e-stop-rectangle, button, [role="button"], input';
        }
        if (target.closest(selectors)) {
            return;
        }
        if (document.activeElement !== editable) {
            requestAnimationFrame(function () {
                editable.focus();
                _this.setFocusAtEnd(editable);
            });
        }
    };
    AIAssistBase.prototype.updateFooterType = function (toolbarPosition) {
        if (toolbarPosition.toLocaleLowerCase() === 'bottom') {
            this.footer.classList.remove('e-toolbar-inline');
            this.footer.classList.add('e-toolbar-bottom');
        }
        else {
            this.footer.classList.remove('e-toolbar-bottom');
            this.footer.classList.add('e-toolbar-inline');
        }
    };
    AIAssistBase.prototype.updateFooterClass = function (footerTemplate) {
        var footerClass = "e-footer " + (footerTemplate ? 'e-footer-template' : '');
        this.footer.className = footerClass;
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistBaseModel} newProp - Specifies new properties
     * @param  {AIAssistBaseModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    AIAssistBase.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    __decorate([
        Property(false)
    ], AIAssistBase.prototype, "enableStreaming", void 0);
    AIAssistBase = __decorate([
        NotifyPropertyChanges
    ], AIAssistBase);
    return AIAssistBase;
}(InterActiveChatBase));
export { AIAssistBase };
