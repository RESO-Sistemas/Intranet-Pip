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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../ai-assist-base/ai-assist-base-model.d.ts'/>
import { EventHandler, Property, NotifyPropertyChanges, Collection, Event, remove, L10n, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { ChildProperty, getUniqueID, isNullOrUndefined as isNOU, Complex, removeClass, addClass } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { ToolbarSettings, ToolbarItem } from '../interactive-chat-base/interactive-chat-base';
import { Uploader, SpeechToText } from '@syncfusion/ej2-inputs';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { ButtonSettings, TooltipSettings } from '@syncfusion/ej2-inputs';
import { Fab } from '@syncfusion/ej2-buttons';
import { AIAssistBase } from '../ai-assist-base/ai-assist-base';
var ASSISTHEADER = 'e-aiassist-header-text e-assist-view-header';
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
/**
 * The prompts property maps the list of the prompts and binds the data to the suggestions.
 */
var Prompt = /** @class */ (function (_super) {
    __extends(Prompt, _super);
    function Prompt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Prompt.prototype, "prompt", void 0);
    __decorate([
        Property('')
    ], Prompt.prototype, "response", void 0);
    __decorate([
        Property(null)
    ], Prompt.prototype, "isResponseHelpful", void 0);
    __decorate([
        Property(null)
    ], Prompt.prototype, "attachedFiles", void 0);
    return Prompt;
}(ChildProperty));
export { Prompt };
/**
 * Specifies the type of assist view.
 */
export var AssistViewType;
(function (AssistViewType) {
    /**
     * Represents the default assist view type.
     */
    AssistViewType["Assist"] = "Assist";
    /**
     * Represents a custom assist view type.
     */
    AssistViewType["Custom"] = "Custom";
})(AssistViewType || (AssistViewType = {}));
/**
 * The assistView property maps the customized AiAssistView.
 */
var AssistView = /** @class */ (function (_super) {
    __extends(AssistView, _super);
    function AssistView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Assist')
    ], AssistView.prototype, "type", void 0);
    __decorate([
        Property('')
    ], AssistView.prototype, "name", void 0);
    __decorate([
        Property()
    ], AssistView.prototype, "iconCss", void 0);
    __decorate([
        Property()
    ], AssistView.prototype, "viewTemplate", void 0);
    return AssistView;
}(ChildProperty));
export { AssistView };
/**
 * Configuration settings for rendering Syncfusion Speech-to-Text in the AssistView footer.
 * This property holds the settings required to initialize and display the Speech-to-Text component.
 *
 */
var SpeechToTextSettings = /** @class */ (function (_super) {
    __extends(SpeechToTextSettings, _super);
    function SpeechToTextSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], SpeechToTextSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], SpeechToTextSettings.prototype, "allowInterimResults", void 0);
    __decorate([
        Property('en-US')
    ], SpeechToTextSettings.prototype, "lang", void 0);
    __decorate([
        Property(false)
    ], SpeechToTextSettings.prototype, "disabled", void 0);
    __decorate([
        Complex({}, ButtonSettings)
    ], SpeechToTextSettings.prototype, "buttonSettings", void 0);
    __decorate([
        Property(true)
    ], SpeechToTextSettings.prototype, "showTooltip", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], SpeechToTextSettings.prototype, "tooltipSettings", void 0);
    __decorate([
        Property('')
    ], SpeechToTextSettings.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], SpeechToTextSettings.prototype, "transcript", void 0);
    __decorate([
        Property('Inactive')
    ], SpeechToTextSettings.prototype, "listeningState", void 0);
    __decorate([
        Event()
    ], SpeechToTextSettings.prototype, "onStart", void 0);
    __decorate([
        Event()
    ], SpeechToTextSettings.prototype, "onStop", void 0);
    __decorate([
        Event()
    ], SpeechToTextSettings.prototype, "transcriptChanged", void 0);
    __decorate([
        Event()
    ], SpeechToTextSettings.prototype, "onError", void 0);
    return SpeechToTextSettings;
}(ChildProperty));
export { SpeechToTextSettings };
/**
 * Represents settings for managing file attachments in the AI Assist View.
 * Includes configuration for URLs, file types, and size limitations.
 */
var AttachmentSettings = /** @class */ (function (_super) {
    __extends(AttachmentSettings, _super);
    function AttachmentSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], AttachmentSettings.prototype, "saveUrl", void 0);
    __decorate([
        Property('')
    ], AttachmentSettings.prototype, "removeUrl", void 0);
    __decorate([
        Property('')
    ], AttachmentSettings.prototype, "allowedFileTypes", void 0);
    __decorate([
        Property(2000000)
    ], AttachmentSettings.prototype, "maxFileSize", void 0);
    __decorate([
        Property(10)
    ], AttachmentSettings.prototype, "maximumCount", void 0);
    __decorate([
        Event()
    ], AttachmentSettings.prototype, "attachmentClick", void 0);
    return AttachmentSettings;
}(ChildProperty));
export { AttachmentSettings };
/**
 * The promptToolbarSettings property maps the list of the promptToolbarSettings and binds the data to the prompt.
 */
var PromptToolbarSettings = /** @class */ (function (_super) {
    __extends(PromptToolbarSettings, _super);
    function PromptToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], PromptToolbarSettings.prototype, "width", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], PromptToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], PromptToolbarSettings.prototype, "itemClicked", void 0);
    return PromptToolbarSettings;
}(ChildProperty));
export { PromptToolbarSettings };
/**
 * The responseToolbarSettings property maps the list of the responseToolbarSettings and binds the data to the output items.
 */
var ResponseToolbarSettings = /** @class */ (function (_super) {
    __extends(ResponseToolbarSettings, _super);
    function ResponseToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], ResponseToolbarSettings.prototype, "width", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], ResponseToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], ResponseToolbarSettings.prototype, "itemClicked", void 0);
    return ResponseToolbarSettings;
}(ChildProperty));
export { ResponseToolbarSettings };
/**
 * Represents a toolbar item model in the AIAssistview component.
 */
var FooterToolbarSettings = /** @class */ (function (_super) {
    __extends(FooterToolbarSettings, _super);
    function FooterToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Inline')
    ], FooterToolbarSettings.prototype, "toolbarPosition", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], FooterToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], FooterToolbarSettings.prototype, "itemClick", void 0);
    return FooterToolbarSettings;
}(ChildProperty));
export { FooterToolbarSettings };
/**
 * The `AIAssistView` component is designed to enhance user interaction by integrating AI driven assistance features.
 * It provides a seamless interface for incorporating suggestions & AI responses.
 *
 * ```html
 *  <div id='defaultAIAssistView'></div>
 * ```
 * ```typescript
 *  let aiAssistObj: AIAssistView = new AIAssistView();
 *  aiAssistObj.appendTo('#defaultAIAssistView');
 * ```
 */
var AIAssistView = /** @class */ (function (_super) {
    __extends(AIAssistView, _super);
    /**
     * Constructor for creating the component
     *
     * @param {AIAssistViewModel} options - Specifies the AIAssistViewModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function AIAssistView(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.toolbarItems = [];
        _this.displayContents = [];
        _this.preTagElements = [];
        _this.uploadedFiles = [];
        _this.sendToolbarItem = null;
        _this.clearToolbarItem = null;
        _this.attachmentToolbarItem = null;
        _this.speechToTextToolbarItem = null;
        _this.latestResponseMinHeight = null;
        return _this;
    }
    /**
     * Enhanced setup: Enforce viewport on .e-content + dynamic min-height on latest .e-output-container.
     * Preserves structure; only inline styles on existing elements. Scrolls to prompt top.
     * Also applies during loading by sizing the skeleton container when the final response item
     * isn't rendered yet.
     *
     * @private
     * @returns {void}
     */
    AIAssistView.prototype.setupViewportFilling = function () {
        if (!this.contentWrapper || this.prompts.length === 0) {
            return;
        }
        var lastIndex = this.prompts.length - 1;
        var allResponseItems = Array.from(this.contentWrapper.querySelectorAll('.e-output-container[id^="e-response-item_"]'));
        // Set auto for all previous .e-output-container (as in example)
        for (var i = 0; i < allResponseItems.length; i++) {
            var index = parseInt(allResponseItems[i].id.split('_')[1], 10);
            if (index < lastIndex) {
                allResponseItems[i].style.minHeight = 'auto';
                var footerEle = allResponseItems[i].querySelector('.e-content-footer');
                if (footerEle) {
                    footerEle.classList.remove('e-assist-toolbar-active');
                }
            }
        }
        // Compute dynamic min-height based on viewport and fixed chrome (header/footer/paddings)
        var contentWrapperHeight = this.contentWrapper.clientHeight;
        var promptEle = this.contentWrapper.querySelector("#e-prompt-item_" + lastIndex);
        var promptHeight = promptEle ? promptEle.offsetHeight : 0;
        // Get the actual height of uploaded files if they exist
        var promptFilesEle = promptEle ? promptEle.querySelector('.e-prompt-uploaded-files') : null;
        var promptFilesHeight = promptFilesEle ? promptFilesEle.offsetHeight : 0;
        // Get the actual height of prompt toolbar if it exists
        var promptToolbarEle = promptEle ? promptEle.querySelector('.e-prompt-toolbar') : null;
        var promptToolbarHeight = promptToolbarEle ? promptToolbarEle.offsetHeight : 0;
        // Get the actual height of response toolbar if it exists
        var lastResponseEle = this.contentWrapper.querySelector("#e-response-item_" + lastIndex);
        var responseToolbarEle = lastResponseEle ? lastResponseEle.querySelector('.e-response-toolbar') : null;
        var responseToolbarHeight = responseToolbarEle ? responseToolbarEle.offsetHeight : 0;
        // Check if suggestions are visible - if so, reserve space for them
        var suggestionsHeight = (this.suggestionsElement && !this.suggestionsElement.hidden) ?
            this.suggestionsElement.offsetHeight : 0;
        var scrollToBottomBtnHeight = 0;
        if (this.downArrowIcon.element) {
            scrollToBottomBtnHeight = this.downArrowIcon.element.offsetHeight;
        }
        // Calculate minHeight to fill the content wrapper viewport completely
        var dynamicMinHeight = Math.max(160, contentWrapperHeight - promptHeight - promptFilesHeight - promptToolbarHeight -
            responseToolbarHeight - suggestionsHeight - scrollToBottomBtnHeight);
        this.latestResponseMinHeight = dynamicMinHeight;
        // Apply to the actual latest response container if available; otherwise apply to loading skeleton
        if (lastResponseEle) {
            lastResponseEle.style.minHeight = dynamicMinHeight + "px";
        }
        else if (this.skeletonContainer) {
            // Ensure the loader occupies the viewport so previous chats don't remain visible while loading
            this.skeletonContainer.style.minHeight = dynamicMinHeight + "px";
        }
    };
    AIAssistView.prototype.renderContentElement = function () {
        if (this.enableScrollToBottom) {
            var scrollDownButton = this.createElement('button', { id: this.element.id + "-scrollDownButton", className: 'e-scroll-down-btn' });
            this.downArrowIcon = new Fab({
                iconCss: 'e-icons e-assist-scroll-down',
                position: 'BottomRight',
                target: this.outputElement.parentElement,
                isPrimary: false,
                visible: false
            });
            this.downArrowIcon.appendTo(scrollDownButton);
        }
    };
    AIAssistView.prototype.handleScroll = function () {
        var atBottom = this.checkScrollAtBottom(this.contentWrapper, 70);
        this.toggleScrollIcon(atBottom);
    };
    // Toggle button visibility (show if not at bottom and enableScrollToBottom=true)
    AIAssistView.prototype.toggleScrollIcon = function (atBottom) {
        if (this.isResponseRequested || !this.enableScrollToBottom || !this.downArrowIcon) {
            return;
        }
        this.downArrowIcon.visible = !atBottom;
        this.downArrowIcon.dataBind();
    };
    // Click handler to scroll to bottom
    AIAssistView.prototype.scrollBtnClick = function () {
        if (this.enableScrollToBottom) {
            this.scrollToBottom();
        }
    };
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    AIAssistView.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    AIAssistView.prototype.getDirective = function () {
        return 'EJS-AIASSISTVIEW';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    AIAssistView.prototype.getModuleName = function () {
        return 'aiassistview';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    AIAssistView.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    AIAssistView.prototype.render = function () {
        this.initializeLocale();
        this.renderPromptView();
    };
    AIAssistView.prototype.renderPromptView = function () {
        this.setDimension(this.element, this.width, this.height);
        this.renderViews();
        this.renderToolbar();
        this.updateFooterElementClass();
        this.wireEvents();
    };
    AIAssistView.prototype.renderToolbar = function () {
        this.updateHeaderToolbar();
        if (this.assistViewTemplateIndex < 0) {
            this.displayContents.unshift(this.contentWrapper);
        }
        else {
            this.displayContents.unshift(this.assistCustomSection);
        }
        this.previousElement = this.displayContents[this.activeView];
        this.renderHeaderToolbar();
        this.viewWrapper = this.element.querySelector('.e-view-content');
        this.updateActiveView();
        this.addCssClass(this.element, this.cssClass);
        this.updateHeader(this.showHeader, this.toolbarHeader, this.viewWrapper);
        this.aiAssistViewRendered = true;
        this.addRtlClass(this.element, this.enableRtl);
    };
    AIAssistView.prototype.renderViews = function () {
        this.assistViewTemplateIndex = -1;
        this.aiAssistViewRendered = false;
        this.isAssistView = false;
        this.isOutputRenderingStop = false;
        this.isResponseRequested = false;
        this.renderViewSections(this.element, 'e-view-header', 'e-view-content');
        var isAssistViewAssigned = false;
        var assistView;
        var customViewTemplate;
        var customViewCount = 1;
        if (this.views.length > 0) {
            for (var index = 0; index < this.views.length; index++) {
                if (this.views[parseInt(index.toString(), 10)].type.toLocaleLowerCase() === 'assist' && !isAssistViewAssigned) {
                    assistView = {
                        text: this.views[parseInt(index.toString(), 10)].name || 'AI Assist',
                        prefixIcon: this.views[parseInt(index.toString(), 10)].iconCss || 'e-icons e-assistview-icon',
                        cssClass: ASSISTHEADER,
                        htmlAttributes: { 'data-index': this.element.id + '_view_0' }
                    };
                    this.toolbarItems.unshift(assistView);
                    if (this.views[parseInt(index.toString(), 10)].viewTemplate) {
                        this.assistViewTemplateIndex = index;
                    }
                    isAssistViewAssigned = true;
                    this.isAssistView = true;
                }
                else if (this.views[parseInt(index.toString(), 10)].type.toLocaleLowerCase() === 'custom') {
                    customViewTemplate = this.createElement('div', { className: 'e-customview-content-section-' + customViewCount + ' e-custom-view' });
                    this.getContextObject('customViewTemplate', customViewTemplate, -1, index);
                    this.displayContents.push(customViewTemplate);
                    this.toolbarItems.push({
                        text: this.views[parseInt(index.toString(), 10)].name || '',
                        prefixIcon: this.views[parseInt(index.toString(), 10)].iconCss || '',
                        cssClass: 'e-aiassist-header-text e-custom-view-header',
                        htmlAttributes: { 'data-index': this.element.id + '_view_' + customViewCount.toString() }
                    });
                    customViewCount++;
                }
            }
        }
        if (this.views.length === 0 || !isAssistViewAssigned) {
            assistView = {
                text: 'AI Assist',
                prefixIcon: 'e-icons e-assistview-icon',
                cssClass: ASSISTHEADER,
                htmlAttributes: { 'data-index': this.element.id + '_view_0' }
            };
            this.toolbarItems.unshift(assistView);
            isAssistViewAssigned = true;
        }
        if (this.assistViewTemplateIndex >= 0 && this.views[this.assistViewTemplateIndex].viewTemplate) {
            this.assistCustomSection = this.createElement('div', { attrs: { class: 'e-assistview-content-section', 'data-index': this.element.id + '_view_0' } });
            this.getContextObject('assistViewTemplate', this.assistCustomSection, -1, this.assistViewTemplateIndex);
        }
        else {
            this.renderDefaultView();
        }
    };
    AIAssistView.prototype.renderHeaderToolbar = function () {
        var _this = this;
        this.toolbar = new Toolbar({
            items: this.toolbarItems,
            height: '100%',
            enableRtl: this.enableRtl,
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (_this.toolbarSettings.itemClicked) {
                    _this.toolbarSettings.itemClicked.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.htmlAttributes) {
                        var currentIndex = parseInt(args.item.htmlAttributes['data-index'].split(_this.element.id + '_view_')[1], 10);
                        if (currentIndex !== _this.activeView) {
                            var prevOnChange = _this.isProtectedOnChange;
                            _this.isProtectedOnChange = true;
                            var previousIndex = _this.getIndex(_this.activeView);
                            _this.activeView = parseInt(args.item.htmlAttributes['data-index'].split(_this.element.id + '_view_')[1], 10);
                            _this.updateActiveView(previousIndex);
                            _this.isProtectedOnChange = prevOnChange;
                        }
                    }
                }
            }
        });
        this.toolbarHeader = this.element.querySelector('.e-view-header');
        var toolbarEle = this.createElement('div');
        this.toolbar.appendTo(toolbarEle);
        this.toolbar.element.setAttribute('aria-label', 'assist-view-toolbar-header');
        this.toolbarHeader.appendChild(toolbarEle);
    };
    AIAssistView.prototype.updateHeaderToolbar = function () {
        if (this.toolbarSettings.items.length > 0) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var pushToolbar = this.toolbarSettings.items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                tabIndex: item.tabIndex
            }); });
            this.toolbarItems = this.toolbarItems.concat(pushToolbar);
        }
    };
    AIAssistView.prototype.getIndex = function (currentIndex) {
        return (((currentIndex) > (this.views.length - (this.isAssistView ? 1 : 0))) || (currentIndex < 0)) ?
            0 : currentIndex;
    };
    AIAssistView.prototype.updateActiveView = function (previousIndex) {
        var activeViewIndex = this.getIndex(this.activeView);
        if (!this.aiAssistViewRendered) {
            this.appendView(activeViewIndex);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)]) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)].classList.add('e-active');
            }
        }
        else if (previousIndex !== activeViewIndex) {
            this.removePreviousView(previousIndex, activeViewIndex);
            this.appendView(activeViewIndex);
        }
        this.previousElement = this.displayContents[parseInt(activeViewIndex.toString(), 10)];
    };
    AIAssistView.prototype.appendView = function (activeViewIndex) {
        //updating the new view section according to the activeView property
        if (activeViewIndex === 0 && this.assistViewTemplateIndex < 0) {
            this.viewWrapper.append(this.contentWrapper, this.footer);
        }
        else if (activeViewIndex === 0 && this.assistViewTemplateIndex >= 0) {
            this.viewWrapper.append(this.assistCustomSection);
        }
        else {
            this.viewWrapper.append(this.displayContents[parseInt(activeViewIndex.toString(), 10)]);
        }
    };
    AIAssistView.prototype.removePreviousView = function (previousIndex, activeViewIndex) {
        // removing the previously binded element
        this.viewWrapper.removeChild(this.previousElement);
        if (previousIndex === 0 && this.assistViewTemplateIndex < 0) {
            this.viewWrapper.removeChild(this.footer);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)].classList.add('e-active');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (previousIndex >= 0 && this.toolbar.tbarEle[parseInt(previousIndex.toString(), 10)]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.toolbar.tbarEle[parseInt(previousIndex.toString(), 10)].classList.remove('e-active');
        }
    };
    AIAssistView.prototype.renderDefaultView = function () {
        var viewWrapper = this.element.querySelector('.e-view-content');
        this.createViewComponents(viewWrapper);
        this.contentWrapper = this.element.querySelector('.e-views');
        this.contentWrapper.setAttribute('data-index', this.element.id + '_view_0');
        var contentContainer = this.element.querySelector('.e-view-container');
        this.content = this.getElement('contentContainer');
        this.getFooter();
        this.updateFooterClass(this.footerTemplate);
        this.renderContent();
        this.renderAssistViewFooter();
        this.updateBannerView(contentContainer);
        contentContainer.append(this.content);
        this.checkIsScrollable();
    };
    AIAssistView.prototype.checkIsScrollable = function () {
        if (this.enableScrollToBottom) {
            this.downArrowIcon.visible = this.contentWrapper.scrollHeight > this.contentWrapper.clientHeight;
        }
    };
    AIAssistView.prototype.initializeLocale = function () {
        this.l10n = new L10n('aiassistview', {
            stopResponseText: 'Stop Responding',
            fileSizeFailure: 'Upload failed: {0} files exceeded the maximum size',
            fileCountFailure: 'Upload limit reached: Maximum {0} files allowed. Remove extra files to proceed uploading',
            send: 'Send',
            attachments: 'Attach File',
            clear: 'Clear'
        }, this.locale);
        this.l10n.setLocale(this.locale);
    };
    AIAssistView.prototype.toggleStopRespondingButton = function (show) {
        var sendIconClass = 'e-assist-send';
        var stopIconClass = 'e-assist-stop';
        var stopTooltip = this.l10n.getConstant('stopResponseText');
        if (!this.footerTemplate) {
            var currentIconClass_1 = show ? sendIconClass : stopIconClass;
            var newIconClass = show ? stopIconClass : sendIconClass;
            var currentItem = this.footerToolbarEle.items.find(function (item) { return item.prefixIcon === "e-icons " + currentIconClass_1; });
            var itemIndex = this.footerToolbarEle.items.indexOf(currentItem);
            var currentToolbarItemElement = this.footerToolbarEle.element.querySelector(".e-tbar-btn ." + currentIconClass_1) ?
                this.footerToolbarEle.element.querySelector(".e-tbar-btn ." + currentIconClass_1).closest('.e-toolbar-item') : null;
            if (itemIndex !== -1 && currentItem && currentToolbarItemElement) {
                var newItem = {
                    prefixIcon: "e-icons " + newIconClass,
                    align: 'Right',
                    tooltipText: show ? stopTooltip : undefined
                };
                this.footerToolbarEle.addItems([newItem], itemIndex);
                this.footerToolbarEle.removeItems(currentToolbarItemElement);
            }
            this.refreshTextareaUI();
        }
        else {
            var currentIcon = this.footer.querySelector("." + (show ? sendIconClass : stopIconClass));
            if (currentIcon) {
                currentIcon.classList.replace(show ? sendIconClass : stopIconClass, show ? stopIconClass : sendIconClass);
                if (show) {
                    currentIcon.title = stopTooltip;
                    EventHandler.add(currentIcon, 'click', this.respondingStopper, this);
                }
                else {
                    currentIcon.removeAttribute('title');
                    EventHandler.remove(currentIcon, 'click', this.respondingStopper);
                }
            }
        }
    };
    AIAssistView.prototype.hasStopResponseButton = function () {
        if (!this.footerToolbarEle && this.footerTemplate) {
            return this.footer.querySelector('.e-assist-stop') ? true : false;
        }
        else if (this.footerToolbarEle) {
            return this.footerToolbarEle.element.querySelector('.e-assist-stop') ? true : false;
        }
        return false;
    };
    AIAssistView.prototype.renderContent = function () {
        this.renderOutputContent();
        this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
        this.renderContentElement();
        if (this.outputElement) {
            this.renderSkeleton();
        }
    };
    AIAssistView.prototype.renderOutputContent = function (isMethodCall) {
        var _this = this;
        this.outputElement = this.getElement('outputElement');
        if (this.responseToolbarSettings.items.length === 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.responseToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy', cssClass: 'check' },
                { iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
                { iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        if (this.prompts) {
            this.prompts.forEach(function (prompt, i) {
                _this.renderOutputContainer(SanitizeHtmlHelper.sanitize(prompt.prompt), SanitizeHtmlHelper.sanitize(prompt.response), prompt.attachedFiles, i, undefined, true);
            });
        }
        if (this.suggestionsElement && this.content.contains(this.suggestionsElement)) {
            this.content.insertBefore(this.outputElement, this.suggestionsElement);
        }
        else {
            this.content.appendChild(this.outputElement);
        }
        if (isMethodCall) {
            this.aiAssistViewRendered = true;
        }
    };
    AIAssistView.prototype.updateBannerView = function (contentContainer) {
        if (this.prompts.length === 0) {
            this.renderBannerView(this.bannerTemplate, contentContainer, 'bannerTemplate');
        }
    };
    AIAssistView.prototype.renderAssistViewFooter = function () {
        var textareaAndIconsWrapper = this.createElement('div', { attrs: { class: 'e-textarea-icons-wrapper' } });
        if (this.footerTemplate) {
            this.updateContent(this.footerTemplate, this.footer, {}, 'footerTemplate');
        }
        else {
            this.editableTextarea = this.createElement('div', {
                attrs: {
                    class: 'e-assist-textarea',
                    contenteditable: 'true',
                    placeholder: this.promptPlaceholder,
                    role: 'textbox',
                    'aria-multiline': 'true'
                },
                innerHTML: this.prompt
            });
            var hiddenTextarea = this.createElement('textarea', {
                attrs: {
                    class: 'e-hidden-textarea',
                    name: 'userPrompt',
                    value: this.prompt
                }
            });
            this.appendChildren(textareaAndIconsWrapper, this.editableTextarea, hiddenTextarea);
            this.footer.append(textareaAndIconsWrapper);
        }
        if (!this.footerTemplate) {
            var footerIconsWrapper = this.createElement('div', { attrs: { class: 'e-footer-icons-wrapper' } });
            this.renderFooterToolbar(footerIconsWrapper);
            textareaAndIconsWrapper.appendChild(footerIconsWrapper);
            this.footer.appendChild(textareaAndIconsWrapper);
            this.footer.classList.add('e-footer-focus-wave-effect');
            this.refreshTextareaUI();
            this.pushToUndoStack(this.prompt);
        }
    };
    AIAssistView.prototype.renderFooterToolbar = function (container) {
        var _this = this;
        var toolbarItems = [];
        var customItems = this.footerToolbarSettings.items || [];
        for (var _i = 0, customItems_1 = customItems; _i < customItems_1.length; _i++) {
            var customItem = customItems_1[_i];
            var isSttToolbarItem = customItem.iconCss.indexOf('e-assist-speech-to-text') !== -1;
            var mappedItem = {
                type: customItem.type,
                template: isSttToolbarItem && isNOU(customItem.template) ? '<button class="e-assistview-speech-to-text e-tbar-btn"></button>' : customItem.template,
                disabled: customItem.disabled,
                cssClass: customItem.cssClass,
                visible: customItem.visible,
                tooltipText: customItem.tooltip,
                prefixIcon: customItem.iconCss,
                text: customItem.text,
                align: customItem.align,
                tabIndex: customItem.tabIndex
            };
            toolbarItems.push(mappedItem);
        }
        if (this.enableAttachments && !this.isDuplicatedItem('e-icons e-assist-attachment-icon', toolbarItems)) {
            this.attachmentToolbarItem = {
                prefixIcon: 'e-icons e-assist-attachment-icon',
                tooltipText: this.l10n.getConstant('attachments'),
                align: 'Right'
            };
            toolbarItems.push(this.attachmentToolbarItem);
        }
        if (this.speechToTextSettings.enable && !this.isDuplicatedItem('e-icons e-assist-speech-to-text', toolbarItems)) {
            this.speechToTextToolbarItem = {
                id: this.element.id + '_speechtotext',
                template: '<button class="e-assistview-speech-to-text"></button>',
                prefixIcon: 'e-icons e-assist-speech-to-text',
                align: 'Right'
            };
            toolbarItems.push(this.speechToTextToolbarItem);
        }
        if (this.showClearButton && !this.isDuplicatedItem('e-icons e-assist-clear-icon', toolbarItems)) {
            this.clearToolbarItem = {
                prefixIcon: 'e-icons e-assist-clear-icon',
                tooltipText: this.l10n.getConstant('clear'),
                align: 'Right'
            };
            toolbarItems.push(this.clearToolbarItem);
        }
        if (!this.isDuplicatedItem('e-icons e-assist-send', toolbarItems)) {
            this.sendToolbarItem = {
                prefixIcon: 'e-icons e-assist-send',
                align: 'Right'
            };
            toolbarItems.push(this.sendToolbarItem);
        }
        this.footerToolbarEle = new Toolbar({
            items: toolbarItems,
            enableRtl: this.enableRtl,
            width: '100%',
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (_this.footerToolbarSettings.itemClick) {
                    _this.footerToolbarSettings.itemClick.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    switch (args.item.prefixIcon) {
                        case 'e-icons e-assist-send':
                            if (!_this.isResponseRequested && !args.item.disabled) {
                                _this.onSendIconClick();
                            }
                            break;
                        case 'e-icons e-assist-stop':
                            _this.respondingStopper(args.originalEvent);
                            break;
                        case 'e-icons e-assist-clear-icon':
                            _this.clearIconHandler();
                            break;
                        case 'e-icons e-assist-attachment-icon':
                            if (_this.uploaderObj && _this.attachmentToolbarItem) {
                                var uploaderElement = _this.footerToolbarEle.element.querySelector('.e-assist-file-upload');
                                if (!uploaderElement) {
                                    _this.updateAttachmentElement();
                                    uploaderElement = _this.footerToolbarEle.element.querySelector('.e-assist-file-upload');
                                }
                                if (uploaderElement) {
                                    uploaderElement.click();
                                }
                            }
                            break;
                    }
                }
            }
        });
        var toolbarContainer = this.createElement('div');
        this.footerToolbarEle.appendTo(toolbarContainer);
        this.footerToolbarEle.element.setAttribute('aria-label', 'assist-footer-toolbar');
        container.appendChild(toolbarContainer);
        this.updateAttachmentElement();
        this.renderSpeechToText();
    };
    AIAssistView.prototype.isDuplicatedItem = function (iconCss, toolbarItems) {
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            if ((item.prefixIcon || '') === iconCss) {
                switch (iconCss) {
                    case 'e-icons e-assist-send':
                        this.sendToolbarItem = item;
                        break;
                    case 'e-icons e-assist-clear-icon':
                        this.clearToolbarItem = item;
                        break;
                    case 'e-icons e-assist-attachment-icon':
                        this.attachmentToolbarItem = item;
                        break;
                }
                return true;
            }
        }
        return false;
    };
    AIAssistView.prototype.updateAttachmentElement = function () {
        if (this.enableAttachments && this.attachmentToolbarItem) {
            this.renderAttachmentIcon();
        }
        else {
            if (this.uploaderObj) {
                this.uploaderObj.destroy();
                this.dropArea.innerHTML = '';
                remove(this.dropArea);
            }
        }
    };
    AIAssistView.prototype.renderSpeechToText = function () {
        var _this = this;
        if (this.speechToTextObj) {
            this.speechToTextObj.destroy();
            this.speechToTextObj = null;
        }
        if (this.speechToTextSettings.enable) {
            this.speechToTextObj = new SpeechToText({
                allowInterimResults: this.speechToTextSettings.allowInterimResults,
                transcript: this.speechToTextSettings.transcript,
                lang: this.speechToTextSettings.lang,
                listeningState: this.speechToTextSettings.listeningState,
                disabled: this.speechToTextSettings.disabled,
                buttonSettings: this.speechToTextSettings.buttonSettings,
                showTooltip: this.speechToTextSettings.showTooltip,
                tooltipSettings: this.speechToTextSettings.tooltipSettings,
                cssClass: this.speechToTextSettings.cssClass,
                onStart: function (args) {
                    if (_this.speechToTextSettings.onStart) {
                        _this.speechToTextSettings.onStart.call(_this, args);
                    }
                },
                onStop: function (args) {
                    if (_this.speechToTextSettings.onStop) {
                        _this.speechToTextSettings.onStop.call(_this, args);
                    }
                },
                transcriptChanged: function (args) {
                    var prevOnChange = _this.isProtectedOnChange;
                    _this.isProtectedOnChange = true;
                    var value = _this.prompt.length > 0 ? _this.prompt + ' ' : '';
                    if (args.isInterimResult) {
                        _this.editableTextarea.innerHTML = value + SanitizeHtmlHelper.sanitize(args.transcript);
                    }
                    else {
                        var prevPrompt = _this.prompt;
                        _this.prompt = value + SanitizeHtmlHelper.sanitize(args.transcript);
                        _this.editableTextarea.innerHTML = _this.prompt;
                        _this.speechToTextObj.transcript = '';
                        _this.editableTextarea.focus();
                        _this.setFocusAtEnd(_this.editableTextarea);
                        _this.triggerPromptChanged(event, prevPrompt);
                    }
                    _this.refreshTextareaUI();
                    // Debounced push to undo stack
                    _this.scheduleUndoPush();
                    _this.redoStack = [];
                    _this.speechToTextSettings.transcript = args.transcript;
                    if (_this.speechToTextSettings.transcriptChanged) {
                        _this.speechToTextSettings.transcriptChanged.call(_this, args);
                    }
                    _this.isProtectedOnChange = prevOnChange;
                },
                onError: function (args) {
                    if (_this.speechToTextSettings.onError) {
                        _this.speechToTextSettings.onError.call(_this, args);
                    }
                }
            });
            var speechToTextButton = this.footerToolbarEle.element.querySelector('.e-assistview-speech-to-text');
            if (speechToTextButton) {
                this.speechToTextObj.appendTo(speechToTextButton);
            }
        }
    };
    AIAssistView.prototype.renderAttachmentIcon = function () {
        var _this = this;
        this.dropArea = this.createElement('div', { attrs: { class: 'e-assist-drop-area' } });
        this.footer.prepend(this.dropArea);
        var attachmentIcon = this.footerToolbarEle.element.querySelector('.e-assist-attachment-icon');
        var uploaderElement = this.createElement('input', { attrs: { class: 'e-assist-file-upload', type: 'file', name: 'UploadFiles', id: 'fileUpload' } });
        attachmentIcon.appendChild(uploaderElement);
        this.uploaderObj = new Uploader({
            asyncSettings: {
                saveUrl: this.attachmentSettings.saveUrl,
                removeUrl: this.attachmentSettings.removeUrl
            },
            maxFileSize: this.attachmentSettings.maxFileSize,
            allowedExtensions: this.attachmentSettings.allowedFileTypes,
            progress: this.onUploadProgress.bind(this),
            success: this.onUploadSuccess.bind(this),
            failure: this.onUploadFailure.bind(this),
            uploading: this.onUploadStart.bind(this),
            multiple: true,
            selected: function (args) {
                var oversized = args.filesData.filter(function (file) {
                    return file.status === _this.uploaderObj.l10n.getConstant('invalidMaxFileSize') && file.statusCode === '0';
                });
                if (oversized.length) {
                    _this.showFailureAlert('fileSizeFailure', oversized.length, 'e-size-failure');
                    uploaderElement.value = '';
                }
                var totalSelected = args.filesData.length + _this.uploadedFiles.length;
                if (totalSelected > _this.attachmentSettings.maximumCount) {
                    args.cancel = true;
                    _this.showFailureAlert('fileCountFailure', _this.attachmentSettings.maximumCount, 'e-count-failure');
                    uploaderElement.value = '';
                    return;
                }
            }
        });
        this.uploaderObj.appendTo(uploaderElement);
    };
    AIAssistView.prototype.showFailureAlert = function (localeConstantKey, fileCount, failureType) {
        var failureMessage = this.l10n.getConstant(localeConstantKey).replace('{0}', fileCount.toString());
        if (fileCount === 1) {
            failureMessage = failureMessage.replace('files', 'file');
        }
        this.createFailureAlert(failureMessage, failureType);
    };
    AIAssistView.prototype.createFailureAlert = function (failureMessage, failureType) {
        var _this = this;
        var failureAlert = this.renderFailureAlert(this.viewWrapper, failureMessage, failureType, 'e-assist-circle-close', 'e-assist-clear-icon');
        if (this.viewWrapper.contains(this.footer)) {
            this.viewWrapper.insertBefore(failureAlert, this.footer);
        }
        failureAlert.classList.add('e-show');
        setTimeout(function () {
            _this.handleFailureAlertRemove(_this.viewWrapper, failureAlert);
        }, 3000);
    };
    AIAssistView.prototype.onUploadStart = function (args) {
        this.trigger('beforeAttachmentUpload', args);
        this.uploadedFiles.push(args.fileData);
        var fileItem = this.createFileItem(args.fileData, true);
        this.dropArea.appendChild(fileItem);
    };
    AIAssistView.prototype.onUploadProgress = function (args) {
        var uploadProgress = args.e.loaded / args.e.total * 100;
        var progressFill = this.footer.querySelector("#e-assist-progress-" + CSS.escape(args.file.name));
        if (progressFill) {
            progressFill.style.width = uploadProgress + "%";
        }
    };
    AIAssistView.prototype.onUploadSuccess = function (args) {
        if (args.operation === 'upload') {
            this.trigger('attachmentUploadSuccess', args);
            var progressFill = this.footer.querySelector("#e-assist-progress-" + CSS.escape(args.file.name));
            if (progressFill) {
                progressFill.style.width = '100%';
                this.cleanupFileItem(args.file.name);
            }
            var progressBar = this.footer.querySelector('.e-assist-progress-fill');
            if (!progressBar) {
                this.checkAndActivateSendIcon();
            }
        }
        else if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
    };
    AIAssistView.prototype.cleanupFileItem = function (fileName) {
        var fileItem = this.footer.querySelector("#e-assist-progress-" + CSS.escape(fileName));
        if (fileItem) {
            fileItem.parentElement.remove();
        }
    };
    AIAssistView.prototype.onUploadFailure = function (args) {
        if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
        else {
            this.trigger('attachmentUploadFailure', args);
            this.uploaderObj.remove(args.file);
            this.uploadedFiles = this.uploadedFiles.filter(function (file) { return file.name !== args.file.name; });
            var progressFill = this.footer.querySelector("#e-assist-progress-" + CSS.escape(args.file.name));
            if (progressFill) {
                progressFill.style.width = '100%';
                progressFill.classList.add('e-assist-upload-failed');
            }
        }
    };
    AIAssistView.prototype.createFileItem = function (fileData, isForFooter) {
        var _this = this;
        var fileItem = this.createElement('div', { className: 'e-assist-uploaded-file-item' });
        var fileIcon = this.createElement('div', { className: 'e-icons e-assist-file-format-icon' });
        var fileDetails = this.createElement('div', { className: 'e-assist-file-details' });
        var fileName = this.createElement('span', { className: 'e-assist-file-name', innerHTML: fileData.name });
        var fileSize = this.createElement('span', { className: 'e-assist-file-size', innerHTML: (fileData.size / 1024).toFixed(2) + " KB" });
        var progressBar = this.createElement('div', { className: 'e-assist-progress-bar' });
        var progressFill = this.createElement('div', { id: "e-assist-progress-" + fileData.name, className: 'e-assist-progress-fill' });
        progressBar.appendChild(progressFill);
        fileDetails.append(fileName, fileSize);
        fileItem.append(fileIcon, fileDetails);
        var closeButton;
        if (isForFooter) {
            closeButton = this.createElement('span', { attrs: { class: 'e-icons e-assist-clear-icon', role: 'button', 'aria-label': 'Clear file', tabindex: '-1' } });
            EventHandler.add(closeButton, 'click', function () { return _this.handleRemoveUploadedFile(closeButton, fileData, fileItem); });
            fileItem.append(closeButton);
        }
        fileItem.append(progressBar);
        EventHandler.add(fileItem, 'click', function (event) {
            if (closeButton && (event.target === closeButton || event.target.classList.contains('e-assist-clear-icon'))) {
                return;
            }
            _this.handleAttachmentPreview(fileData);
        });
        return fileItem;
    };
    AIAssistView.prototype.handleAttachmentPreview = function (file) {
        var eventArgs = {};
        if (this.attachmentSettings.attachmentClick) {
            this.attachmentSettings.attachmentClick.call(this, eventArgs);
        }
    };
    AIAssistView.prototype.handleRemoveUploadedFile = function (closeButton, fileData, fileItem) {
        this.uploaderObj.remove(fileData);
        this.uploadedFiles = this.uploadedFiles.filter(function (file) { return file.name !== fileData.name; });
        EventHandler.remove(closeButton, 'click', this.handleRemoveUploadedFile);
        fileItem.remove();
        this.checkAndActivateSendIcon();
    };
    AIAssistView.prototype.applyPromptChange = function (newState, oldState, event) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = this.editableTextarea.innerHTML = newState.content;
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
        this.triggerPromptChanged(event, oldState.content);
    };
    AIAssistView.prototype.handleInput = function (event) {
        var textareaEle = event.target;
        var isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        var textContent = textareaEle.innerHTML;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var prevPrompt = this.prompt;
        this.prompt = SanitizeHtmlHelper.sanitize(textContent);
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.editableTextarea.focus();
        // Debounced push to undo stack
        this.scheduleUndoPush();
        this.redoStack = [];
        this.triggerPromptChanged(event, prevPrompt);
    };
    AIAssistView.prototype.triggerPromptChanged = function (event, prevPrompt) {
        var eventArgs = {
            value: this.prompt,
            previousValue: prevPrompt,
            event: event,
            element: (event && event.currentTarget) || this.editableTextarea
        };
        this.trigger('promptChanged', eventArgs);
    };
    AIAssistView.prototype.footerKeyHandler = function (e) {
        var targetElement = e.target;
        if (targetElement.classList.contains('e-tbar-btn') && targetElement.querySelector('.e-assist-attachment-icon')) {
            return;
        }
        this.keyHandler(e, 'footer');
    };
    AIAssistView.prototype.bindScroll = function () {
        if (this.contentWrapper) {
            EventHandler.add(this.contentWrapper, 'scroll', this.handleScroll, this);
        }
        if (this.enableScrollToBottom && this.downArrowIcon && this.downArrowIcon.element) {
            EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        }
    };
    AIAssistView.prototype.unBindScroll = function () {
        if (this.contentWrapper) {
            EventHandler.remove(this.contentWrapper, 'scroll', this.handleScroll);
        }
        if (this.enableScrollToBottom && this.downArrowIcon && this.downArrowIcon.element) {
            EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        }
    };
    AIAssistView.prototype.wireEvents = function () {
        this.wireFooterEvents(this.footerTemplate);
        if (this.editableTextarea) {
            var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.add(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown, this);
                // Optional fallback for environments without Pointer Events
                EventHandler.add(footerIconsWrapper, 'click', this.onFooterIconsClick, this);
                EventHandler.add(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut, this);
            }
        }
        if (this.enableScrollToBottom) {
            this.bindScroll();
        }
    };
    AIAssistView.prototype.unWireEvents = function () {
        this.unWireFooterEvents(this.footerTemplate);
        if (this.editableTextarea) {
            var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.remove(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown);
                EventHandler.remove(footerIconsWrapper, 'click', this.onFooterIconsClick);
                EventHandler.remove(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut);
            }
        }
        this.detachCodeCopyEventHandler();
        this.unBindScroll();
    };
    AIAssistView.prototype.onFocusEditableTextarea = function () {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
        this.toggleClearIcon();
    };
    AIAssistView.prototype.onBlurEditableTextarea = function (e) {
        var relatedTargetEle = e.relatedTarget;
        if (relatedTargetEle && relatedTargetEle.closest('.e-toolbar')) {
            return;
        }
        if (!relatedTargetEle) {
            if (this.footer) {
                this.footer.classList.remove('e-footer-focused');
            }
            if (this.clearToolbarItem) {
                this.toggleClearIcon();
            }
        }
        else {
            if (this.clearToolbarItem) {
                if (relatedTargetEle && !(relatedTargetEle.querySelector('.e-assist-clear-icon'))) {
                    this.toggleClearIcon();
                }
            }
            if (this.footer) {
                this.footer.classList.remove('e-footer-focused');
            }
        }
    };
    AIAssistView.prototype.detachCodeCopyEventHandler = function () {
        this.preTagElements.forEach(function (_a) {
            var preTag = _a.preTag, handler = _a.handler;
            var copyIcon = preTag.querySelector('.e-code-copy');
            EventHandler.remove(copyIcon, 'click', handler);
        });
        this.preTagElements = [];
    };
    AIAssistView.prototype.keyHandler = function (event, value) {
        if (event.key === 'Enter' && !event.shiftKey) {
            switch (value) {
                case 'footer':
                    this.pushToUndoStack(this.editableTextarea.innerText);
                    event.preventDefault();
                    if (!this.isResponseRequested) {
                        this.onSendIconClick();
                    }
                    else if (this.isResponseRequested && this.hasStopResponseButton()) {
                        this.respondingStopper(event);
                    }
                    break;
            }
        }
        else if (event.key === 'Backspace' || event.key === 'Delete') {
            if (this.speechToTextObj) {
                this.speechToTextObj.transcript = '';
            }
        }
        else {
            this.handleUndoRedo(event);
        }
    };
    AIAssistView.prototype.clearIconHandler = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.editableTextarea.innerText = this.prompt = '';
        if (this.speechToTextObj) {
            this.speechToTextObj.transcript = '';
        }
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.editableTextarea.focus();
        this.pushToUndoStack(this.prompt);
        this.checkAndActivateSendIcon();
    };
    AIAssistView.prototype.respondingStopper = function (event) {
        this.isOutputRenderingStop = true;
        this.isResponseRequested = false;
        this.lastStreamPrompt = '';
        if (this.outputElement.hasChildNodes) {
            var skeletonElement = this.element.querySelector('.e-loading-body');
            if (skeletonElement) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
        }
        this.toggleStopRespondingButton(false);
        var promptIndex = this.prompts ? this.prompts.length - 1 : -1;
        var eventArgs = {
            event: event,
            prompt: promptIndex >= 0 ? this.prompts[parseInt(promptIndex.toString(), 10)].prompt : '',
            dataIndex: this.prompts ? this.prompts.length - 1 : -1
        };
        this.trigger('stopRespondingClick', eventArgs);
        var outputContainer = this.element.querySelector("#e-response-item_" + promptIndex);
        if (outputContainer) {
            var outputContentBodyEle = this.element.querySelector("#e-response-item_" + (this.prompts.length - 1)).querySelector('.e-content-body');
            if (outputContentBodyEle) {
                this.renderPreTag(outputContentBodyEle);
            }
        }
    };
    AIAssistView.prototype.onSuggestionClick = function (e) {
        this.suggestionsElement.hidden = true;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = e.target.innerText;
        this.isProtectedOnChange = prevOnChange;
        this.onSendIconClick();
    };
    AIAssistView.prototype.onSendIconClick = function () {
        if (this.isResponseRequested || !(this.prompt.trim() || this.uploadedFiles.length)) {
            return;
        }
        if (!isNOU(this.speechToTextObj)) {
            this.speechToTextObj.stopListening();
        }
        this.isResponseRequested = true;
        this.lastStreamPrompt = '';
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = true;
        }
        this.isOutputRenderingStop = false;
        this.toggleStopRespondingButton(true);
        this.addPrompt();
        if (this.prompts.length === 1) {
            this.updateBannerTemplate('');
        }
        this.createOutputElement();
        var eventArgs = {
            cancel: false,
            responseToolbarItems: this.responseToolbarSettings.items,
            prompt: this.prompt,
            promptSuggestions: this.promptSuggestions,
            attachedFiles: this.uploadedFiles.slice()
        };
        this.clearUploadedFiles();
        if (!this.footerTemplate) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = this.editableTextarea.innerText = '';
            this.isProtectedOnChange = prevOnChange;
            this.refreshTextareaUI();
            this.pushToUndoStack(this.prompt);
        }
        this.setupViewportFilling();
        this.trigger('promptRequest', eventArgs);
        if (this.contentWrapper) {
            this.scrollToBottom();
        }
    };
    AIAssistView.prototype.clearUploadedFiles = function () {
        this.uploadedFiles = [];
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
        }
    };
    AIAssistView.prototype.addPrompt = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompts = this.prompts.concat([{ prompt: this.prompt, response: '', isResponseHelpful: null, attachedFiles: this.uploadedFiles }]);
        this.isProtectedOnChange = prevOnChange;
    };
    AIAssistView.prototype.getContextObject = function (templateName, contentElement, index, arrayPosition) {
        var template;
        var context = {};
        var contextIndex = index >= 0 ? index : -1;
        var contextPrompt = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].prompt : '';
        var contextOutput = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].response : '';
        switch (templateName.toLowerCase()) {
            case 'promptitemtemplate': {
                template = this.promptItemTemplate;
                context = {
                    prompt: contextPrompt,
                    toolbarItems: this.promptToolbarSettings.items,
                    index: contextIndex,
                    attachedFiles: this.uploadedFiles
                };
                break;
            }
            case 'responseitemtemplate': {
                template = this.responseItemTemplate;
                context = {
                    prompt: contextPrompt,
                    response: contextOutput,
                    index: contextIndex,
                    toolbarItems: this.responseToolbarSettings.items
                };
                break;
            }
            case 'customviewtemplate':
            case 'assistviewtemplate': {
                template = this.views[parseInt(arrayPosition.toString(), 10)].viewTemplate || '';
                break;
            }
        }
        this.updateContent(template, contentElement, context, templateName);
    };
    AIAssistView.prototype.createOutputElement = function () {
        this.outputSuggestionEle = this.createElement('div', { attrs: { id: "e-prompt-item_" + (this.prompts.length - 1), class: "e-prompt-container " + (this.promptItemTemplate ? 'e-prompt-item-template' : '') } });
        this.renderPrompt(this.prompt, this.prompts.length - 1, this.uploadedFiles);
        this.outputElement.append(this.outputSuggestionEle, this.skeletonContainer);
        this.skeletonContainer.hidden = false;
    };
    AIAssistView.prototype.renderOutputContainer = function (promptText, outputText, attachedFiles, index, isMethodCall, isFinalUpdate) {
        var outputContainer = this.createElement('div', { attrs: __assign({ id: "e-response-item_" + index, class: "e-output-container " + (this.responseItemTemplate ? 'e-response-item-template' : '') }, (this.latestResponseMinHeight != null ?
                { style: "min-height:" + this.latestResponseMinHeight + "px" } : {})) });
        this.renderOutput(outputContainer, promptText, outputText, attachedFiles, isMethodCall, index, isFinalUpdate);
        if (promptText) {
            this.outputElement.append(this.outputSuggestionEle);
        }
        this.outputElement.append(outputContainer);
        if (this.hasStopResponseButton() && isFinalUpdate) {
            this.toggleStopRespondingButton(false);
        }
        if (!this.isOutputRenderingStop && !this.content.contains(this.suggestionsElement) && this.suggestionsElement) {
            this.content.append(this.suggestionsElement);
        }
    };
    AIAssistView.prototype.renderOutput = function (outputContainer, promptText, outputText, attachedFiles, isMethodCall, index, isFinalUpdate) {
        var promptIcon = this.createElement('span', {
            className: 'e-output-icon e-icons ' + (this.responseIconCss || (this.isAssistView && this.views[0].iconCss) || 'e-assistview-icon')
        });
        var aiOutputEle = this.createElement('div', { className: 'e-output' });
        if (!this.aiAssistViewRendered || isMethodCall) {
            if (!isNOU(promptText) || (attachedFiles && attachedFiles.length > 0)) {
                this.outputSuggestionEle = this.createElement('div', { attrs: { id: "e-prompt-item_" + index, class: "e-prompt-container " + (this.promptItemTemplate ? 'e-prompt-item-template' : '') } });
                this.renderPrompt(promptText, index, attachedFiles);
            }
        }
        var lastPrompt = { prompt: promptText, response: outputText };
        if (lastPrompt.response) {
            if (this.responseItemTemplate) {
                this.getContextObject('responseItemTemplate', aiOutputEle, index);
                if (this.outputElement.querySelector('.e-skeleton')) {
                    this.outputElement.removeChild(this.skeletonContainer);
                }
                if (this.contentFooterEle) {
                    this.contentFooterEle.classList.remove('e-assist-toolbar-active');
                }
                this.renderOutputToolbarItems(index, isFinalUpdate);
                aiOutputEle.append(this.contentFooterEle);
                outputContainer.append(aiOutputEle);
            }
            else {
                this.renderOutputTextContainer(lastPrompt.response, aiOutputEle, index, false, isFinalUpdate);
                outputContainer.append(promptIcon, aiOutputEle);
            }
        }
        else if (this.aiAssistViewRendered) {
            if (this.outputElement.querySelector('.e-skeleton')) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
            if (this.suggestionsElement) {
                this.suggestionsElement.hidden = false;
            }
        }
    };
    AIAssistView.prototype.renderOutputTextContainer = function (response, aiOutputEle, index, isMethodCall, isFinalUpdate) {
        if (this.contentFooterEle) {
            this.contentFooterEle.classList.remove('e-assist-toolbar-active');
        }
        this.outputContentBodyEle = this.createElement('div', { attrs: { class: 'e-content-body', tabindex: '0' } });
        if (!isMethodCall) {
            if (!this.enableStreaming || isFinalUpdate) {
                var htmlResponse = MarkdownConverter.toHtml(response);
                this.outputContentBodyEle.innerHTML = htmlResponse;
            }
            else {
                this.outputContentBodyEle.innerHTML = response;
            }
            if (isFinalUpdate) {
                this.renderPreTag(this.outputContentBodyEle);
            }
        }
        if (this.outputElement.querySelector('.e-skeleton')) {
            this.outputElement.removeChild(this.skeletonContainer);
        }
        this.appendChildren(aiOutputEle, this.outputContentBodyEle);
        if (isFinalUpdate) {
            this.renderOutputToolbarItems(index, isFinalUpdate);
            this.appendChildren(aiOutputEle, this.contentFooterEle);
        }
    };
    AIAssistView.prototype.renderPreTag = function (outputContentEle) {
        var _this = this;
        var preTags = Array.from(outputContentEle.querySelectorAll('pre'));
        preTags.forEach(function (preTag) {
            var copyIcon = document.createElement('span');
            copyIcon.className = 'e-icons e-code-copy e-assist-copy';
            preTag.insertBefore(copyIcon, preTag.firstChild);
            _this.preTagElements.push({ preTag: preTag, handler: _this.getCopyHandler(preTag) });
            EventHandler.add(copyIcon, 'click', _this.preTagElements[_this.preTagElements.length - 1].handler);
        });
    };
    AIAssistView.prototype.getCopyHandler = function (preTag) {
        return function () {
            var preText = preTag.innerText;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.navigator.clipboard.writeText(preText);
            var copyIcon = preTag.querySelector('.e-code-copy');
            copyIcon.className = 'e-icons e-code-copy e-assist-check';
            setTimeout(function () {
                copyIcon.className = 'e-icons e-code-copy e-assist-copy';
            }, 1000);
        };
    };
    AIAssistView.prototype.renderOutputToolbarItems = function (index, isFinalUpdate) {
        this.contentFooterEle = this.createElement('div', { className: 'e-content-footer e-assist-toolbar-active' });
        var footerContent = this.createElement('div');
        this.renderResponseToolbar(index);
        if (this.aiAssistViewRendered) {
            if (this.outputElement.querySelector('.e-skeleton')) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
            if (isFinalUpdate && this.suggestionsElement) {
                this.suggestionsElement.hidden = false;
            }
        }
        this.responseToolbarEle.appendTo(footerContent);
        this.responseToolbarEle.element.setAttribute('aria-label', "response-toolbar-" + index);
        this.contentFooterEle.appendChild(footerContent);
    };
    AIAssistView.prototype.renderResponseToolbar = function (index) {
        var _this = this;
        var pushToolbar = this.responseToolbarSettings.items.map(function (item) {
            var toolbarItem = {
                type: item.type,
                visible: item.visible,
                disabled: item.disabled,
                tooltipText: item.tooltip,
                template: item.template,
                prefixIcon: item.iconCss,
                text: item.text,
                cssClass: item.cssClass,
                align: item.align,
                width: _this.responseToolbarSettings.width,
                tabIndex: item.tabIndex
            };
            if (toolbarItem.prefixIcon === 'e-icons e-assist-like' && _this.prompts[parseInt(index.toString(), 10)].isResponseHelpful) {
                toolbarItem.prefixIcon = 'e-icons e-assist-like-filled';
            }
            else if (toolbarItem.prefixIcon === 'e-icons e-assist-dislike' && _this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false) {
                toolbarItem.prefixIcon = 'e-icons e-assist-dislike-filled';
            }
            return toolbarItem;
        });
        this.responseToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: index
                };
                if (_this.responseToolbarSettings.itemClicked) {
                    _this.responseToolbarSettings.itemClicked.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    _this.handleItemClick(args, index);
                }
            }
        });
    };
    AIAssistView.prototype.handleItemClick = function (args, index) {
        var _this = this;
        if (args.item.prefixIcon === 'e-icons e-assist-copy') {
            this.getClipBoardContent(SanitizeHtmlHelper.sanitize(this.prompts[parseInt(index.toString(), 10)].response));
            args.item.prefixIcon = 'e-icons e-assist-check';
            this.responseToolbarEle.dataBind();
            setTimeout(function () {
                args.item.prefixIcon = 'e-icons e-assist-copy';
                _this.responseToolbarEle.dataBind();
            }, 1000);
        }
        var icon = args.item.prefixIcon;
        var isLikeInteracted = icon === 'e-icons e-assist-like-filled' || icon === 'e-icons e-assist-like';
        var isDislikeInteracted = icon === 'e-icons e-assist-dislike-filled' || icon === 'e-icons e-assist-dislike';
        if (isLikeInteracted || isDislikeInteracted) {
            var isHelpful = null;
            if (isLikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === true ? null : true;
            }
            else if (isDislikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false ? null : false;
            }
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompts[parseInt(index.toString(), 10)].isResponseHelpful = isHelpful;
            var promptItem = this.prompts[parseInt(index.toString(), 10)];
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            var controlParentItems = args.item.controlParent.items;
            var likeIndex = controlParentItems.findIndex(function (it) {
                return it.prefixIcon === 'e-icons e-assist-like' || it.prefixIcon === 'e-icons e-assist-like-filled';
            });
            var dislikeIndex = controlParentItems.findIndex(function (it) {
                return it.prefixIcon === 'e-icons e-assist-dislike' || it.prefixIcon === 'e-icons e-assist-dislike-filled';
            });
            if (isLikeInteracted) {
                if (promptItem.isResponseHelpful === true) {
                    args.item.prefixIcon = 'e-icons e-assist-like-filled';
                    if (controlParentItems && controlParentItems.length > 2) {
                        controlParentItems[parseInt(dislikeIndex.toString(), 10)].prefixIcon = 'e-icons e-assist-dislike';
                    }
                }
                else {
                    args.item.prefixIcon = 'e-icons e-assist-like';
                }
            }
            else if (isDislikeInteracted) {
                if (promptItem.isResponseHelpful === false) {
                    args.item.prefixIcon = 'e-icons e-assist-dislike-filled';
                    if (controlParentItems && controlParentItems.length > 1) {
                        controlParentItems[parseInt(likeIndex.toString(), 10)].prefixIcon = 'e-icons e-assist-like';
                    }
                }
                else {
                    args.item.prefixIcon = 'e-icons e-assist-dislike';
                }
            }
            this.responseToolbarEle.dataBind();
            this.isProtectedOnChange = prevOnChange;
        }
    };
    AIAssistView.prototype.renderPrompt = function (promptText, promptIndex, attachedFiles) {
        var _this = this;
        var outputPrompt = this.createElement('div', { attrs: { class: 'e-prompt-text', tabindex: '0' } });
        var promptFiles = this.createElement('div', { attrs: { class: 'e-prompt-uploaded-files' } });
        var promptContent = this.createElement('div', { className: 'e-prompt-content' });
        var promptDetails = this.createElement('div', { className: 'e-prompt-details' });
        var promptToolbarContainer = this.createElement('div', { className: 'e-prompt-toolbar' });
        var promptToolbar = this.createElement('div');
        var userIcon = this.createElement('span', { className: this.promptIconCss ? 'e-prompt-icon e-icons '
                + this.promptIconCss : '' });
        if (this.promptItemTemplate) {
            this.getContextObject('promptItemTemplate', this.outputSuggestionEle, promptIndex);
        }
        else {
            outputPrompt.innerHTML = promptText;
            var uploadedFiles = attachedFiles || this.uploadedFiles;
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach(function (file) {
                    promptFiles.appendChild(_this.createFileItem(file, false));
                });
                promptDetails.appendChild(promptFiles);
            }
            if (promptText.length > 0) {
                promptDetails.appendChild(outputPrompt);
            }
            promptContent.appendChild(promptDetails);
            if (this.promptIconCss) {
                promptContent.appendChild(userIcon);
            }
            this.outputSuggestionEle.append(promptContent);
        }
        this.renderPromptToolbar(promptToolbar, promptIndex);
        promptToolbarContainer.append(promptToolbar);
        this.appendChildren(this.outputSuggestionEle, promptToolbarContainer);
    };
    AIAssistView.prototype.renderPromptToolbar = function (element, promptIndex) {
        var _this = this;
        var pushToolbar = [];
        if (this.promptToolbarSettings.items.length === 0) {
            pushToolbar = [
                { prefixIcon: 'e-icons e-assist-edit', tooltipText: 'Edit' },
                { prefixIcon: 'e-icons e-assist-copy', tooltipText: 'Copy' }
            ];
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.promptToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-edit', tooltip: 'Edit' },
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        else {
            pushToolbar = this.promptToolbarSettings.items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: _this.promptToolbarSettings.width,
                tabIndex: item.tabIndex
            }); });
        }
        this.promptToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: promptIndex
                };
                if (_this.promptToolbarSettings.itemClicked) {
                    _this.promptToolbarSettings.itemClicked.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.prefixIcon === 'e-icons e-assist-edit') {
                        _this.onEditIconClick(promptIndex);
                    }
                    if (args.item.prefixIcon === 'e-icons e-assist-copy') {
                        _this.getClipBoardContent(SanitizeHtmlHelper.sanitize(_this.prompts[parseInt(promptIndex.toString(), 10)].prompt));
                        args.item.prefixIcon = 'e-icons e-assist-check';
                        _this.promptToolbarEle.dataBind();
                        setTimeout(function () {
                            args.item.prefixIcon = 'e-icons e-assist-copy';
                            _this.promptToolbarEle.dataBind();
                        }, 1000);
                    }
                }
            }
        });
        this.promptToolbarEle.appendTo(element);
        this.promptToolbarEle.element.setAttribute('aria-label', "prompt-toolbar-" + promptIndex);
    };
    AIAssistView.prototype.renderSkeleton = function () {
        this.skeletonContainer = this.createElement('div', { className: 'e-output-container' });
        var outputViewWrapper = this.createElement('div', { className: 'e-output', styles: 'width: 70%;' });
        var skeletonIconEle = this.createElement('span', { className: 'e-output-icon e-skeleton e-skeleton-text e-shimmer-wave' });
        var skeletonBodyEle = this.createElement('div', { className: 'e-loading-body' });
        var skeletonFooterEle = this.createElement('div', { className: 'e-loading-footer' });
        var _a = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 75%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 50%; height: 15px;' })
        ], skeletonLine1 = _a[0], skeletonLine2 = _a[1], skeletonLine3 = _a[2];
        var footerSkeleton = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 30px;' })
        ][0];
        this.appendChildren(skeletonBodyEle, skeletonLine1, skeletonLine2, skeletonLine3);
        skeletonFooterEle.append(footerSkeleton);
        this.appendChildren(outputViewWrapper, skeletonBodyEle, skeletonFooterEle);
        this.appendChildren(this.skeletonContainer, skeletonIconEle, outputViewWrapper);
    };
    AIAssistView.prototype.onEditIconClick = function (promptIndex) {
        if (this.editableTextarea) {
            if (this.suggestionsElement) {
                this.suggestionsElement.hidden = true;
            }
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.editableTextarea.innerHTML = this.prompt =
                SanitizeHtmlHelper.sanitize(this.prompts[parseInt(promptIndex.toString(), 10)].prompt);
            this.isProtectedOnChange = prevOnChange;
            this.refreshTextareaUI();
            this.editableTextarea.focus();
            this.setFocusAtEnd(this.editableTextarea);
            this.pushToUndoStack(this.prompt);
            this.redoStack = [];
        }
    };
    AIAssistView.prototype.refreshTextareaUI = function () {
        this.updateHiddenTextarea(this.prompt);
        this.checkAndActivateSendIcon();
        this.updateFooterElementClass();
        this.updateFooterType(this.footerToolbarSettings.toolbarPosition);
        this.toggleClearIcon();
    };
    AIAssistView.prototype.checkAndActivateSendIcon = function () {
        if (!this.footerToolbarEle) {
            return;
        }
        var length = this.prompt.length > 0 ? this.prompt.length : this.uploadedFiles.length;
        if (this.sendToolbarItem.prefixIcon === 'e-icons e-assist-send') {
            var sendItem = this.footerToolbarEle.element.querySelector('.e-assist-send');
            if (sendItem) {
                if (length > 0) {
                    removeClass([sendItem], 'disabled');
                    sendItem.setAttribute('title', this.l10n.getConstant('send'));
                }
                else {
                    addClass([sendItem], 'disabled');
                }
            }
        }
    };
    AIAssistView.prototype.toggleClearIcon = function () {
        if (this.clearToolbarItem && this.footerToolbarEle) {
            var isFocused = document.activeElement === this.editableTextarea;
            var hasContent = this.editableTextarea.textContent.length > 0;
            var clearItemElement = this.footerToolbarEle.element.querySelector('.e-toolbar-item .e-icons.e-assist-clear-icon')
                .closest('.e-toolbar-item');
            if (clearItemElement) {
                if (isFocused && hasContent) {
                    this.footerToolbarEle.hideItem(clearItemElement, false);
                }
                else {
                    this.footerToolbarEle.hideItem(clearItemElement, true);
                }
            }
        }
    };
    AIAssistView.prototype.updateIcons = function (newCss, isPromptIconCss) {
        if (isPromptIconCss === void 0) { isPromptIconCss = false; }
        var elements;
        if (this.outputElement) {
            if (isPromptIconCss) {
                newCss = 'e-prompt-icon e-icons ' + newCss;
                elements = this.outputElement.querySelectorAll('.e-prompt-icon');
            }
            else {
                newCss = ' e-output-icon e-icons ' + newCss;
                elements = this.outputElement.querySelectorAll('.e-output-icon');
            }
        }
        for (var index = 0; index < (elements && elements.length); index++) {
            removeClass([elements[parseInt(index.toString(), 10)]], elements[parseInt(index.toString(), 10)].classList.toString().trim().split(' '));
            addClass([elements[parseInt(index.toString(), 10)]], newCss.trim().split(' '));
        }
    };
    AIAssistView.prototype.updateToolbarSettings = function (previousToolbar) {
        var previousToolbarIndex = 0;
        for (var index = this.views.length; index < this.toolbarItems.length; index++) {
            if (previousToolbar.items[parseInt(previousToolbarIndex.toString(), 10)] === this.toolbarItems[parseInt(index.toString(), 10)]) {
                this.toolbarItems.splice(index, 1);
            }
        }
        this.updateHeaderToolbar();
        this.toolbar.items = this.toolbarItems;
    };
    AIAssistView.prototype.updateAttachmentToolbarItemInSettings = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var items = this.footerToolbarSettings.items;
        var attachmentItemIndex = items.findIndex(function (item) { return item.iconCss === 'e-icons e-assist-attachment-icon'; });
        if (this.enableAttachments && attachmentItemIndex === -1) {
            var attachmentItem = {
                iconCss: 'e-icons e-assist-attachment-icon',
                tooltip: this.l10n.getConstant('attachments'),
                align: 'Right'
            };
            var sendItemIndex = items.findIndex(function (item) { return item.iconCss === 'e-icons e-assist-send'; });
            items.splice(sendItemIndex !== -1 ? sendItemIndex : items.length, 0, attachmentItem);
        }
        else if (!this.enableAttachments && attachmentItemIndex !== -1) {
            items.splice(attachmentItemIndex, 1);
        }
        this.isProtectedOnChange = prevOnChange;
    };
    AIAssistView.prototype.updateClearToolbarItemInSettings = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var items = this.footerToolbarSettings.items;
        var clearItemIndex = items.findIndex(function (item) { return item.iconCss === 'e-icons e-assist-clear-icon'; });
        if (this.showClearButton && clearItemIndex === -1) {
            var clearItem = {
                iconCss: 'e-icons e-assist-clear-icon',
                tooltip: this.l10n.getConstant('clear'),
                align: 'Right'
            };
            var sendItemIndex = items.findIndex(function (item) { return item.iconCss === 'e-icons e-assist-send'; });
            items.splice(sendItemIndex !== -1 ? sendItemIndex : items.length, 0, clearItem);
        }
        else if (!this.showClearButton && clearItemIndex !== -1) {
            items.splice(clearItemIndex, 1);
        }
        this.isProtectedOnChange = prevOnChange;
    };
    AIAssistView.prototype.updateFooterToolbar = function () {
        var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
        if (footerIconsWrapper) {
            footerIconsWrapper.innerHTML = '';
            this.footerToolbarEle = null;
            this.sendToolbarItem = null;
            this.clearToolbarItem = null;
            this.attachmentToolbarItem = null;
            this.renderFooterToolbar(footerIconsWrapper);
            this.refreshTextareaUI();
        }
    };
    AIAssistView.prototype.updateResponse = function (response, index, isFinalUpdate, responseItem) {
        if (!this.responseItemTemplate && responseItem) {
            var outputEle = responseItem.querySelector('.e-output');
            var outputContentBodyEle = responseItem.querySelector('.e-content-body');
            if (outputContentBodyEle) {
                outputContentBodyEle.innerHTML = response;
            }
            if (isFinalUpdate && this.suggestionsElement) {
                this.suggestionsElement.hidden = false;
            }
            if (isFinalUpdate) {
                this.renderPreTag(outputContentBodyEle);
            }
            if (isFinalUpdate && outputEle.querySelector('.e-content-footer') === null) {
                this.renderOutputToolbarItems(index, isFinalUpdate);
                this.appendChildren(outputEle, this.contentFooterEle);
            }
        }
        else {
            this.renderOutputContainer(undefined, response, undefined, index, false, isFinalUpdate);
        }
    };
    AIAssistView.prototype.streamResponse = function (response, index) {
        var _this = this;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var i = 0;
        var words = response.split(' ');
        var wordCount = words.length;
        var lastResponse = '';
        var streamingResponse = function () {
            if (_this.isOutputRenderingStop) {
                return;
            }
            if (index >= _this.prompts.length) {
                return;
            }
            var responseItem = _this.element.querySelector("#e-response-item_" + index);
            lastResponse += (i === 0 ? '' : ' ') + words[parseInt(i.toString(), 10)];
            i++;
            if (_this.outputElement.querySelector('.e-skeleton')) {
                _this.outputElement.removeChild(_this.skeletonContainer);
            }
            _this.updateResponse(lastResponse, index, i === wordCount, responseItem);
            _this.scrollToBottom();
            _this.setupViewportFilling();
            if (i < wordCount) {
                setTimeout(function () {
                    streamingResponse();
                }, 15);
            }
            else {
                var isFinalUpdate = lastResponse.length === response.length;
                if (isFinalUpdate && _this.hasStopResponseButton()) {
                    _this.toggleStopRespondingButton(false);
                }
                _this.isResponseRequested = !isFinalUpdate;
            }
        };
        streamingResponse();
        this.isProtectedOnChange = prevOnChange;
    };
    AIAssistView.prototype.updateBannerTemplate = function (newTemplate) {
        if (!isNOU(newTemplate)) {
            var contentContainer = this.element.querySelector('.e-view-container');
            var existingTemplate = contentContainer.querySelector('.e-banner-view');
            if (existingTemplate) {
                existingTemplate.remove();
            }
            this.updateBannerView(contentContainer);
        }
    };
    AIAssistView.prototype.updatePromptSuggestionTemplate = function () {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!this.isOutputRenderingStop) {
            this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
        }
    };
    AIAssistView.prototype.updateFooterTemplate = function () {
        this.footer.innerHTML = '';
        this.updateFooterClass(this.footerTemplate);
        this.unWireFooterEvents(this.footerTemplate);
        this.renderAssistViewFooter();
        if (!this.footerTemplate) {
            this.wireFooterEvents(this.footerTemplate);
        }
    };
    AIAssistView.prototype.updateAttachmentSettings = function (newAttachment) {
        if (!isNOU(newAttachment.allowedFileTypes)) {
            this.uploaderObj.allowedExtensions = newAttachment.allowedFileTypes;
        }
        if (!isNOU(newAttachment.maxFileSize)) {
            this.uploaderObj.maxFileSize = newAttachment.maxFileSize;
        }
        this.uploaderObj.asyncSettings = {
            saveUrl: !isNOU(newAttachment.saveUrl) ? newAttachment.saveUrl : this.uploaderObj.asyncSettings.saveUrl,
            removeUrl: !isNOU(newAttachment.removeUrl) ? newAttachment.removeUrl : this.uploaderObj.asyncSettings.removeUrl
        };
    };
    AIAssistView.prototype.handleSTTDynamicChange = function (newProp, oldProp) {
        if (oldProp.enable !== newProp.enable) {
            this.updateFooterToolbar();
            this.updateSpeechToTextSettings(newProp);
        }
        if (isNOU(this.speechToTextObj)) {
            return;
        }
        if (oldProp.allowInterimResults !== newProp.allowInterimResults) {
            this.speechToTextObj.allowInterimResults = newProp.allowInterimResults;
        }
        if (oldProp.buttonSettings !== newProp.buttonSettings) {
            this.speechToTextObj.buttonSettings = newProp.buttonSettings;
        }
        if (oldProp.tooltipSettings !== newProp.tooltipSettings) {
            this.speechToTextObj.tooltipSettings = newProp.tooltipSettings;
        }
        if (oldProp.showTooltip !== newProp.showTooltip) {
            this.speechToTextObj.showTooltip = newProp.showTooltip;
        }
        if (oldProp.cssClass !== newProp.cssClass) {
            this.speechToTextObj.cssClass = newProp.cssClass;
        }
        if (oldProp.disabled !== newProp.disabled) {
            this.speechToTextObj.disabled = newProp.disabled;
        }
        if (oldProp.lang !== newProp.lang) {
            this.speechToTextObj.lang = newProp.lang;
        }
        if (oldProp.listeningState !== newProp.listeningState) {
            this.speechToTextObj.listeningState = newProp.listeningState;
        }
        this.speechToTextObj.dataBind();
    };
    AIAssistView.prototype.updateSpeechToTextSettings = function (newProps) {
        this.renderSpeechToText();
        if (this.speechToTextObj == null) {
            return;
        }
        this.speechToTextObj.allowInterimResults = newProps.allowInterimResults;
        this.speechToTextObj.transcript = newProps.transcript;
        if (!isNOU(newProps.lang)) {
            this.speechToTextObj.lang = newProps.lang || 'en-US';
        }
        if (!isNOU(newProps.disabled)) {
            this.speechToTextObj.disabled = newProps.disabled;
        }
        if (!isNOU(newProps.buttonSettings)) {
            this.speechToTextObj.buttonSettings = newProps.buttonSettings;
        }
        if (!isNOU(newProps.showTooltip)) {
            this.speechToTextObj.showTooltip = newProps.showTooltip;
        }
        if (!isNOU(newProps.tooltipSettings)) {
            this.speechToTextObj.tooltipSettings = newProps.tooltipSettings;
        }
        if (!isNOU(newProps.cssClass)) {
            this.speechToTextObj.cssClass = newProps.cssClass;
        }
    };
    AIAssistView.prototype.updateLocale = function () {
        // Update file upload failure locale
        this.l10n.setLocale(this.locale);
        var failureElement = this.viewWrapper.querySelector('.e-upload-failure-alert');
        if (failureElement) {
            var failureMessageEle = failureElement.querySelector('.e-failure-message');
            if (failureMessageEle.classList.contains('e-size-failure')) {
                failureMessageEle.textContent = this.l10n.getConstant('fileSizeFailure');
            }
            else {
                var failureText = this.l10n.getConstant('fileCountFailure');
                failureText = failureText.replace('{0}', this.attachmentSettings.maximumCount.toString());
                if (this.attachmentSettings.maximumCount === 1) {
                    failureText = failureText.replace('files', 'file');
                }
                failureMessageEle.textContent = failureText;
            }
        }
    };
    AIAssistView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.destroyAndNullify(this.responseToolbarEle);
        this.destroyAndNullify(this.promptToolbarEle);
        this.destroyAndNullify(this.footerToolbarEle);
        this.destroyAndNullify(this.downArrowIcon);
        this.destroyAndNullify(this.toolbar);
        this.destroyAndNullify(this.speechToTextObj);
        this.destroyAssistView();
        //private html elements nullify
        remove(this.viewWrapper);
        this.viewWrapper = null;
        this.aiAssistViewRendered = null;
        this.assistViewTemplateIndex = null;
        this.toolbarItems = [];
        this.displayContents = [];
        this.isOutputRenderingStop = null;
        this.isResponseRequested = null;
        this.suggestionHeader = null;
        this.previousElement = null;
        this.assistCustomSection = null;
        this.speechToTextToolbarItem = null;
        this.preTagElements = [];
        // properties nullify
        this.toolbarSettings = this.promptToolbarSettings = this.responseToolbarSettings = {};
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        this.element.classList.remove('e-rtl');
    };
    AIAssistView.prototype.destroyAssistView = function () {
        var properties = [
            'toolbarHeader',
            'sendIcon',
            'clearIcon',
            'suggestions',
            'skeletonContainer',
            'outputElement',
            'outputSuggestionEle',
            'contentFooterEle',
            'editableTextarea',
            'footer',
            'speechToTextToolbarItem',
            'assistCustomSection',
            'content',
            'stopResponding',
            'contentWrapper'
        ];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            var element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    };
    /**
     * Executes the specified prompt in the AIAssistView component. The method accepts a string representing the prompt.
     *
     * @param {string} prompt - The prompt text to be executed. It must be a non-empty string.
     *
     * @returns {void}
     */
    AIAssistView.prototype.executePrompt = function (prompt) {
        if (!isNOU(prompt) && prompt.trim().length > 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = prompt;
            this.isProtectedOnChange = prevOnChange;
            this.onSendIconClick();
        }
    };
    /**
     * Adds a response to the last prompt or appends a new prompt data in the AIAssistView component.
     *
     * @param {string | Object} outputResponse - The response to be added. Can be a string representing the response or an object containing both the prompt and the response.
     * - If `outputResponse` is a string, it updates the response for the last prompt in the prompts collection.
     * - If `outputResponse` is an object, it can either update the response of an existing prompt if the prompt matches or append a new prompt data.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    AIAssistView.prototype.addPromptResponse = function (outputResponse, isFinalUpdate) {
        var _this = this;
        if (isFinalUpdate === void 0) { isFinalUpdate = true; }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (!this.isOutputRenderingStop) {
            var responseItem_1 = this.element.querySelector("#e-response-item_" + (this.prompts.length - 1));
            var lastPrompt_1 = this.prompts[this.prompts.length - 1];
            var processResponse = function (rawResponse) {
                if (_this.enableStreaming) {
                    isFinalUpdate = false;
                    var htmlResponse = MarkdownConverter.toHtml(rawResponse);
                    lastPrompt_1.response = htmlResponse;
                    _this.streamResponse(lastPrompt_1.response, _this.prompts.length - 1);
                }
                else {
                    lastPrompt_1.response = rawResponse;
                    _this.updateResponse(lastPrompt_1.response, _this.prompts.length - 1, isFinalUpdate, responseItem_1);
                }
            };
            if (typeof outputResponse === 'string') {
                if (!this.isResponseRequested) {
                    this.prompts = this.prompts.concat([{ prompt: null, response: null, isResponseHelpful: null, attachedFiles: null }]);
                    lastPrompt_1 = this.prompts[this.prompts.length - 1];
                }
                processResponse(outputResponse);
            }
            if (typeof outputResponse === 'object') {
                var tPrompt = {
                    prompt: outputResponse.prompt,
                    attachedFiles: outputResponse.attachedFiles,
                    response: outputResponse.response,
                    isResponseHelpful: isNOU(outputResponse.isResponseHelpful) ? null :
                        outputResponse.isResponseHelpful
                };
                if (this.prompt === tPrompt.prompt || this.lastStreamPrompt === tPrompt.prompt) {
                    lastPrompt_1.attachedFiles = tPrompt.attachedFiles;
                    lastPrompt_1.isResponseHelpful = tPrompt.isResponseHelpful;
                    processResponse(tPrompt.response);
                }
                else {
                    this.prompts = this.prompts.concat([tPrompt]);
                    this.renderOutputContainer(tPrompt.prompt, tPrompt.response, tPrompt.attachedFiles, this.prompts.length - 1, true, isFinalUpdate);
                }
                if (!isFinalUpdate) {
                    this.lastStreamPrompt = tPrompt.prompt;
                }
            }
            if (isFinalUpdate) {
                this.setupViewportFilling();
            }
            if (!this.enableStreaming) {
                if (isFinalUpdate && this.hasStopResponseButton()) {
                    this.toggleStopRespondingButton(false);
                }
                this.isResponseRequested = !isFinalUpdate;
            }
        }
        this.isProtectedOnChange = prevOnChange;
        if (this.enableScrollToBottom && this.downArrowIcon && this.outputContentBodyEle && this.contentWrapper) {
            this.downArrowIcon.visible = this.outputContentBodyEle.scrollHeight > this.contentWrapper.clientHeight;
        }
    };
    /**
     * Scrolls the view to the bottom to display the most recent response in the AIAssistView component.
     *
     * This method programmatically scrolls the view to the bottom,
     * typically used when new responses are added or to refocus on the latest response.
     *
     * @returns {void}
     */
    AIAssistView.prototype.scrollToBottom = function () {
        this.updateScroll(this.contentWrapper);
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistViewModel} newProp - Specifies new properties
     * @param  {AIAssistViewModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    AIAssistView.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension(this.element, this.width, this.height);
                    break;
                case 'cssClass':
                    this.updateCssClass(this.element, newProp.cssClass, oldProp.cssClass);
                    break;
                case 'promptIconCss':
                    this.updateIcons(newProp.promptIconCss, true);
                    break;
                case 'responseIconCss':
                    this.updateIcons(newProp.responseIconCss);
                    break;
                case 'showHeader':
                    this.updateHeader(this.showHeader, this.toolbarHeader, this.viewWrapper);
                    break;
                case 'promptSuggestions':
                    this.updatePromptSuggestionTemplate();
                    break;
                case 'showClearButton':
                    if (this.footerTemplate) {
                        return;
                    }
                    else {
                        this.updateClearToolbarItemInSettings();
                        this.updateFooterToolbar();
                    }
                    break;
                case 'promptPlaceholder':
                    this.updatePlaceholder(this.promptPlaceholder);
                    break;
                case 'promptSuggestionsHeader': {
                    this.suggestionHeader.innerHTML = this.promptSuggestionsHeader;
                    var suggestionHeaderElem = this.element.querySelector('.e-suggestions .e-suggestion-header');
                    if (!suggestionHeaderElem) {
                        this.suggestionsElement.append(this.suggestionHeader);
                    }
                    break;
                }
                case 'activeView': {
                    var previousViewIndex = this.getIndex(oldProp.activeView);
                    this.updateActiveView(previousViewIndex);
                    break;
                }
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (!isNOU(this.toolbar)) {
                        this.toolbar.enableRtl = this.enableRtl;
                        this.toolbar.dataBind();
                    }
                    break;
                case 'toolbarSettings':
                    this.updateToolbarSettings(oldProp.toolbarSettings);
                    break;
                case 'footerToolbarSettings':
                    if (newProp.footerToolbarSettings.items) {
                        this.updateFooterToolbar();
                    }
                    if (newProp.footerToolbarSettings.toolbarPosition) {
                        this.updateFooterType(newProp.footerToolbarSettings.toolbarPosition);
                    }
                    break;
                case 'promptToolbarSettings':
                case 'responseToolbarSettings':
                case 'prompts':
                    this.isOutputRenderingStop = false;
                    if (this.outputElement) {
                        remove(this.outputElement);
                    }
                    if (this.hasStopResponseButton()) {
                        this.toggleStopRespondingButton(false);
                    }
                    this.aiAssistViewRendered = false;
                    this.latestResponseMinHeight = null;
                    this.renderOutputContent(true);
                    this.detachCodeCopyEventHandler();
                    if (this.bannerTemplate) {
                        this.updateBannerTemplate(this.bannerTemplate);
                    }
                    this.checkIsScrollable();
                    this.setupViewportFilling();
                    break;
                case 'prompt':
                    if (!this.footerTemplate) {
                        this.editableTextarea.innerText = this.prompt;
                        this.refreshTextareaUI();
                        this.pushToUndoStack(this.prompt);
                    }
                    break;
                case 'locale':
                    this.updateLocale();
                    break;
                case 'bannerTemplate': {
                    this.updateBannerTemplate(newProp.bannerTemplate);
                    break;
                }
                case 'promptSuggestionItemTemplate': {
                    if (!isNOU(newProp.promptSuggestionItemTemplate)) {
                        this.updatePromptSuggestionTemplate();
                    }
                    break;
                }
                case 'footerTemplate': {
                    this.updateFooterTemplate();
                    break;
                }
                case 'enableStreaming': {
                    this.enableStreaming = newProp.enableStreaming;
                    break;
                }
                case 'enableAttachments': {
                    if (!this.footerTemplate) {
                        this.updateAttachmentToolbarItemInSettings();
                        this.updateFooterToolbar();
                    }
                    break;
                }
                case 'enableScrollToBottom': {
                    if (this.enableScrollToBottom) {
                        this.bindScroll();
                    }
                    else {
                        this.unBindScroll();
                    }
                    break;
                }
                case 'attachmentSettings':
                    this.updateAttachmentSettings(newProp.attachmentSettings);
                    break;
                case 'speechToTextSettings':
                    this.handleSTTDynamicChange(newProp.speechToTextSettings, oldProp.speechToTextSettings);
                    break;
            }
        }
    };
    __decorate([
        Property('')
    ], AIAssistView.prototype, "prompt", void 0);
    __decorate([
        Property('Type prompt for assistance...')
    ], AIAssistView.prototype, "promptPlaceholder", void 0);
    __decorate([
        Collection([], Prompt)
    ], AIAssistView.prototype, "prompts", void 0);
    __decorate([
        Property([])
    ], AIAssistView.prototype, "promptSuggestions", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "promptSuggestionsHeader", void 0);
    __decorate([
        Property(true)
    ], AIAssistView.prototype, "showHeader", void 0);
    __decorate([
        Complex({ items: [] }, ToolbarSettings)
    ], AIAssistView.prototype, "toolbarSettings", void 0);
    __decorate([
        Property(0)
    ], AIAssistView.prototype, "activeView", void 0);
    __decorate([
        Property(null)
    ], AIAssistView.prototype, "promptIconCss", void 0);
    __decorate([
        Property(null)
    ], AIAssistView.prototype, "responseIconCss", void 0);
    __decorate([
        Property('100%')
    ], AIAssistView.prototype, "width", void 0);
    __decorate([
        Property('100%')
    ], AIAssistView.prototype, "height", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "cssClass", void 0);
    __decorate([
        Collection([], AssistView)
    ], AIAssistView.prototype, "views", void 0);
    __decorate([
        Complex({ width: null, items: [] }, PromptToolbarSettings)
    ], AIAssistView.prototype, "promptToolbarSettings", void 0);
    __decorate([
        Complex({ width: null, items: [] }, ResponseToolbarSettings)
    ], AIAssistView.prototype, "responseToolbarSettings", void 0);
    __decorate([
        Complex({ toolbarPosition: 'Inline', items: [] }, FooterToolbarSettings)
    ], AIAssistView.prototype, "footerToolbarSettings", void 0);
    __decorate([
        Complex({ enable: false }, SpeechToTextSettings)
    ], AIAssistView.prototype, "speechToTextSettings", void 0);
    __decorate([
        Property(false)
    ], AIAssistView.prototype, "enableAttachments", void 0);
    __decorate([
        Complex({ saveUrl: '', removeUrl: '', maxFileSize: 2000000, allowedFileTypes: '', maximumCount: 10 }, AttachmentSettings)
    ], AIAssistView.prototype, "attachmentSettings", void 0);
    __decorate([
        Property(false)
    ], AIAssistView.prototype, "showClearButton", void 0);
    __decorate([
        Property(true)
    ], AIAssistView.prototype, "enableScrollToBottom", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "footerTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "promptItemTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "responseItemTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "promptSuggestionItemTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "bannerTemplate", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "promptRequest", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "promptChanged", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "stopRespondingClick", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "beforeAttachmentUpload", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "attachmentUploadSuccess", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "attachmentUploadFailure", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "attachmentRemoved", void 0);
    AIAssistView = __decorate([
        NotifyPropertyChanges
    ], AIAssistView);
    return AIAssistView;
}(AIAssistBase));
export { AIAssistView };
