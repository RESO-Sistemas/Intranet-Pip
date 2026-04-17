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
///<reference path='../ai-assist-base/ai-assist-base-model.d.ts'/>
import { Property, NotifyPropertyChanges, isNullOrUndefined as isNOU, getUniqueID, Event, L10n, SanitizeHtmlHelper, Collection, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Popup } from '@syncfusion/ej2-popups';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { EventHandler, addClass, removeClass, formatUnit } from '@syncfusion/ej2-base';
import { Mention } from '@syncfusion/ej2-dropdowns';
import { AIAssistBase } from '../ai-assist-base/ai-assist-base';
import { ToolbarItem } from '../interactive-chat-base/interactive-chat-base';
/**
 * Specifies the mode of inline ai assist.
 */
export var ResponseMode;
(function (ResponseMode) {
    /**
     * Represents the inline response updates for the component.
     */
    ResponseMode["Inline"] = "Inline";
    /**
     * Represents a popup based response update for the component.
     */
    ResponseMode["Popup"] = "Popup";
})(ResponseMode || (ResponseMode = {}));
/**
 * Represents a model for a prompt and its associated response in the Inline AI Assist component.
 */
var PromptResponse = /** @class */ (function (_super) {
    __extends(PromptResponse, _super);
    function PromptResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], PromptResponse.prototype, "prompt", void 0);
    __decorate([
        Property('')
    ], PromptResponse.prototype, "response", void 0);
    return PromptResponse;
}(ChildProperty));
export { PromptResponse };
/**
 * Represents a command item model in the inline AI assist component.
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
    ], CommandItem.prototype, "prompt", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "groupBy", void 0);
    __decorate([
        Property('')
    ], CommandItem.prototype, "tooltip", void 0);
    return CommandItem;
}(ChildProperty));
export { CommandItem };
/**
 * Represents a response item model in the inline AI assist component.
 */
var ResponseItem = /** @class */ (function (_super) {
    __extends(ResponseItem, _super);
    function ResponseItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], ResponseItem.prototype, "id", void 0);
    __decorate([
        Property(false)
    ], ResponseItem.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], ResponseItem.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], ResponseItem.prototype, "label", void 0);
    __decorate([
        Property('')
    ], ResponseItem.prototype, "groupBy", void 0);
    __decorate([
        Property('')
    ], ResponseItem.prototype, "tooltip", void 0);
    return ResponseItem;
}(ChildProperty));
export { ResponseItem };
/**
 * Represents the settings for the command options in the InlineAIAssist component.
 */
var CommandSettings = /** @class */ (function (_super) {
    __extends(CommandSettings, _super);
    function CommandSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Event()
    ], CommandSettings.prototype, "itemSelect", void 0);
    __decorate([
        Collection([], CommandItem)
    ], CommandSettings.prototype, "commands", void 0);
    __decorate([
        Property('')
    ], CommandSettings.prototype, "popupHeight", void 0);
    __decorate([
        Property('')
    ], CommandSettings.prototype, "popupWidth", void 0);
    return CommandSettings;
}(ChildProperty));
export { CommandSettings };
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
var ResponseSettings = /** @class */ (function (_super) {
    __extends(ResponseSettings, _super);
    function ResponseSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Event()
    ], ResponseSettings.prototype, "itemSelect", void 0);
    __decorate([
        Collection([], ResponseItem)
    ], ResponseSettings.prototype, "items", void 0);
    return ResponseSettings;
}(ChildProperty));
export { ResponseSettings };
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
var InlineToolbarSettings = /** @class */ (function (_super) {
    __extends(InlineToolbarSettings, _super);
    function InlineToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Inline')
    ], InlineToolbarSettings.prototype, "toolbarPosition", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], InlineToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], InlineToolbarSettings.prototype, "itemClick", void 0);
    return InlineToolbarSettings;
}(ChildProperty));
export { InlineToolbarSettings };
var InlineAIAssist = /** @class */ (function (_super) {
    __extends(InlineAIAssist, _super);
    /**
     * Constructor for creating the component
     *
     * @param {InlineAIAssistModel} options - Specifies the InlineAIAssistModel.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function InlineAIAssist(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.sendToolbarItem = null;
        _this.isResponseRequested = false;
        _this.responseContainerCreated = false;
        _this.isStopRequested = false;
        _this.commandOptionsData = [];
        _this.responseOptionsData = [];
        _this.typingIndicatorEl = null;
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    InlineAIAssist.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    InlineAIAssist.prototype.getDirective = function () {
        return 'EJS-INLINEAIASSIST';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    InlineAIAssist.prototype.getModuleName = function () {
        return 'inlineaiassist';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    InlineAIAssist.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Renders the component
     *
     * @returns {void}
     */
    InlineAIAssist.prototype.render = function () {
        this.initializeLocale();
        // Ensure target element is resolved before creating the popup
        this.resolveTargetElement();
        this.resolveRelateToElement();
        this.renderPopup();
        this.addRtlClass(this.element, this.enableRtl);
        this.wireEvents();
    };
    InlineAIAssist.prototype.initializeLocale = function () {
        this.l10n = new L10n('inline-ai-assist', {
            stopResponseText: 'Stop Responding',
            send: 'Send',
            thinkingIndicator: 'Thinking',
            editingIndicator: 'Editing'
        }, this.locale);
        this.l10n.setLocale(this.locale);
    };
    InlineAIAssist.prototype.renderPopup = function () {
        var _this = this;
        this.element.classList.add('e-inline-ai-assist');
        if (this.cssClass) {
            this.element.classList.add(this.cssClass);
        }
        this.contentWrapper = this.createElement('div', { className: 'e-inline-assist-container' });
        var content = this.createElement('div', { className: 'e-content' });
        this.contentWrapper.appendChild(content);
        this.footer = this.createElement('div', { className: 'e-footer' });
        this.updateFooterClass(this.editorTemplate);
        this.renderInlineFooter();
        this.contentWrapper.appendChild(this.footer);
        this.element.appendChild(this.contentWrapper);
        if (this.targetEl && this.targetEl !== document.body) {
            this.targetEl.appendChild(this.element);
        }
        this.popupObj = new Popup(this.element, {
            height: this.popupHeight ? formatUnit(this.popupHeight) : 'auto',
            width: this.popupWidth ? formatUnit(this.popupWidth) : '400px',
            relateTo: this.relateToEl,
            position: { X: 'left', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' },
            targetType: 'relative',
            close: function () {
                _this.trigger('close', {});
                _this.onPopupClose();
            },
            open: function () {
                _this.trigger('open', {});
                _this.attachPopupEventHandlers();
            },
            zIndex: this.zIndex
        });
        this.popupObj.hide();
    };
    InlineAIAssist.prototype.showPopupWithData = function (dataSource, width, height) {
        if (width === void 0) { width = '200px'; }
        if (height === void 0) { height = '400px'; }
        this.mentionPopupObj.dataSource = dataSource;
        this.mentionPopupObj.popupWidth = width;
        this.mentionPopupObj.popupHeight = height;
        this.mentionPopupObj.dataBind();
        this.mentionPopupObj.showPopup();
    };
    InlineAIAssist.prototype.showResponsePopup = function () {
        if (this.popupObj.element.classList.contains('e-popup-open')) {
            this.showPopupWithData(this.responseOptionsData, 'auto', '400px');
        }
    };
    InlineAIAssist.prototype.showCommandMenuPopup = function () {
        this.showPopupWithData(this.commandOptionsData, this.commandSettings.popupWidth || '200px', this.commandSettings.popupHeight || '400px');
    };
    InlineAIAssist.prototype.setCommandPopupData = function () {
        this.commandOptionsData = this.commandSettings.commands.map(function (cmd) { return ({
            label: cmd.label,
            iconCss: cmd.iconCss,
            id: cmd.id,
            disabled: cmd.disabled,
            groupBy: cmd.groupBy,
            tooltip: cmd.tooltip
        }); });
    };
    InlineAIAssist.prototype.setResponsePopupData = function () {
        var acceptItem = {
            label: 'Accept',
            iconCss: 'e-icons e-inline-accept'
        };
        var rejectItem = {
            label: 'Discard',
            iconCss: 'e-icons e-inline-discard'
        };
        var mentionDataSource = [acceptItem, rejectItem];
        if (this.responseSettings.items && this.responseSettings.items.length > 0) {
            var customItems = this.responseSettings.items.map(function (item) { return ({
                label: item.label,
                iconCss: item.iconCss,
                id: item.id,
                groupBy: item.groupBy,
                disabled: item.disabled,
                tooltip: item.tooltip
            }); });
            mentionDataSource = mentionDataSource.concat(customItems);
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.responseSettings.items = mentionDataSource;
        this.isProtectedOnChange = prevOnChange;
        this.responseOptionsData = mentionDataSource;
    };
    InlineAIAssist.prototype.renderMentionPopup = function () {
        var _this = this;
        var mentionEl = this.createElement('div', { attrs: { class: 'e-mention-container' } });
        this.element.appendChild(mentionEl);
        if (this.commandSettings.commands) {
            this.setCommandPopupData();
        }
        this.setResponsePopupData();
        var mentionDataSource = this.responseOptionsData;
        if (this.commandSettings.commands.length > 0) {
            mentionDataSource = this.commandOptionsData;
        }
        this.mentionPopupObj = new Mention({
            mentionChar: '',
            target: this.editableTextarea,
            dataSource: mentionDataSource,
            fields: { text: 'label', iconCss: 'iconCss' },
            popupWidth: this.commandSettings.commands.length > 0 ? this.commandSettings.popupWidth : '200px',
            popupHeight: this.commandSettings.commands.length > 0 ? this.commandSettings.popupHeight : '400px',
            select: function (args) {
                args.cancel = true;
                _this.onMentionCommandSelect(args);
            },
            locale: this.locale,
            opened: function () {
                _this.positionMentionPopup();
            }
        }, mentionEl);
    };
    InlineAIAssist.prototype.positionMentionPopup = function () {
        if (this.mentionPopupObj) {
            var mainPopupElement = this.popupObj.element;
            var mainRect = mainPopupElement.getBoundingClientRect();
            var popupObj = this.mentionPopupObj.popupObj;
            if (popupObj && this.element) {
                popupObj.actionOnScroll = 'reposition';
                popupObj.offsetX = 0;
                popupObj.offsetY = mainRect.height;
                popupObj.position = { X: 'left', Y: 'top' };
                popupObj.relateTo = this.element;
                popupObj.targetType = 'relative';
                popupObj.collision = { X: 'flip', Y: 'flip' };
                popupObj.refreshPosition();
                this.mentionPopupObj.element.style.display = 'block';
                this.mentionPopupObj.element.style.display = '';
            }
        }
    };
    InlineAIAssist.prototype.onMentionCommandSelect = function (args) {
        var selectedItem = args.itemData;
        var matchedCommand = this.commandSettings.commands.find(function (cmd) { return cmd.label === selectedItem.label; });
        if (matchedCommand) {
            var commandItemSelectEventArgs = {
                command: selectedItem,
                event: args.e,
                cancel: false,
                element: args.item
            };
            if (this.commandSettings.itemSelect) {
                this.commandSettings.itemSelect.call(this, commandItemSelectEventArgs);
            }
            if (!commandItemSelectEventArgs.cancel && matchedCommand.prompt) {
                this.executePrompt(matchedCommand.prompt);
            }
        }
        else {
            var responseItemSelectEventArgs = {
                command: selectedItem,
                event: args.e,
                cancel: false,
                element: args.item
            };
            if (this.responseSettings.itemSelect) {
                this.responseSettings.itemSelect.call(this, responseItemSelectEventArgs);
            }
        }
        this.mentionPopupObj.hidePopup();
    };
    InlineAIAssist.prototype.resolveTargetElement = function () {
        this.targetEl = typeof this.target === 'string'
            ? document.querySelector(this.target)
            : this.target instanceof HTMLElement ? this.target : document.body;
    };
    InlineAIAssist.prototype.resolveRelateToElement = function () {
        if (this.relateTo === '' || isNOU(this.relateTo)) {
            return;
        }
        this.relateToEl = (typeof this.relateTo === 'string'
            ? document.querySelector(this.relateTo)
            : this.relateTo);
    };
    InlineAIAssist.prototype.onPopupClose = function () {
        this.clearResponses();
        this.isResponseRequested = false;
        this.toggleStopRespondingButton(false);
        if (this.editableTextarea) {
            this.editableTextarea.setAttribute('contenteditable', 'true');
        }
        this.detachPopupEventHandlers();
        if (this.mentionPopupObj && this.mentionPopupObj.element) {
            this.mentionPopupObj.hidePopup();
        }
    };
    InlineAIAssist.prototype.renderInlineFooter = function () {
        var textareaAndIconsWrapper = this.createElement('div', { attrs: { class: 'e-textarea-icons-wrapper' } });
        if (this.editorTemplate) {
            this.updateContent(this.editorTemplate, this.footer, {}, 'editorTemplate');
        }
        else {
            this.editableTextarea = this.createElement('div', {
                attrs: {
                    class: 'e-assist-textarea',
                    contenteditable: 'true',
                    placeholder: this.placeholder,
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
            textareaAndIconsWrapper.appendChild(this.editableTextarea);
            textareaAndIconsWrapper.appendChild(hiddenTextarea);
            var footerIconsWrapper = this.createElement('div', { attrs: { class: 'e-footer-icons-wrapper' } });
            this.renderFooterToolbar(footerIconsWrapper);
            textareaAndIconsWrapper.appendChild(footerIconsWrapper);
            this.footer.appendChild(textareaAndIconsWrapper);
            this.footer.classList.add('e-footer-focus-wave-effect');
            this.refreshTextareaUI();
            this.pushToUndoStack(this.prompt);
            EventHandler.add(this.editableTextarea, 'keyup', this.keyUpHandler, this);
            this.editableTextarea.addEventListener('keydown', this.keyDownHandler.bind(this), true);
            this.renderMentionPopup();
        }
    };
    InlineAIAssist.prototype.keyDownHandler = function (e) {
        if (e.shiftKey && e.key === 'Enter') {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    };
    InlineAIAssist.prototype.updateEditorTemplate = function () {
        this.footer.innerHTML = '';
        this.updateFooterClass(this.editorTemplate);
        this.renderInlineFooter();
    };
    InlineAIAssist.prototype.renderFooterToolbar = function (container) {
        var _this = this;
        var toolbarItems = [];
        var customItems = this.inlineToolbarSettings.items || [];
        for (var _i = 0, customItems_1 = customItems; _i < customItems_1.length; _i++) {
            var customItem = customItems_1[_i];
            var mappedItem = {
                type: customItem.type,
                template: customItem.template,
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
        if (!this.isDuplicatedItem('e-icons e-inline-send', toolbarItems)) {
            this.sendToolbarItem = {
                prefixIcon: 'e-icons e-inline-send',
                align: 'Right'
            };
            toolbarItems.push(this.sendToolbarItem);
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var footerToolbarItems = toolbarItems.map(function (item) { return ({
            type: item.type,
            text: item.text,
            iconCss: item.prefixIcon,
            cssClass: item.cssClass,
            tooltip: item.tooltipText,
            template: item.template,
            disabled: item.disabled,
            visible: item.visible,
            align: item.align,
            tabIndex: item.tabIndex
        }); });
        this.inlineToolbarSettings.items = footerToolbarItems;
        this.isProtectedOnChange = prevOnChange;
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
                if (_this.inlineToolbarSettings.itemClick) {
                    _this.inlineToolbarSettings.itemClick.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    switch (args.item.prefixIcon) {
                        case 'e-icons e-inline-send':
                            if (!_this.isResponseRequested && !args.item.disabled) {
                                _this.onSendIconClick();
                            }
                            break;
                        case 'e-icons e-inline-stop':
                            if (_this.isResponseRequested) {
                                _this.respondingStopper();
                            }
                            break;
                    }
                }
            }
        });
        var toolbarContainer = this.createElement('div', { attrs: { class: 'e-footer-toolbar-wrapper' } });
        this.footerToolbarEle.appendTo(toolbarContainer);
        this.footerToolbarEle.element.setAttribute('aria-label', 'assist-footer-toolbar');
        container.appendChild(toolbarContainer);
    };
    InlineAIAssist.prototype.isDuplicatedItem = function (iconCss, toolbarItems) {
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            if ((item.prefixIcon || '') === iconCss) {
                switch (iconCss) {
                    case 'e-icons e-inline-send':
                        this.sendToolbarItem = item;
                        break;
                }
                return true;
            }
        }
        return false;
    };
    InlineAIAssist.prototype.keyUpHandler = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    InlineAIAssist.prototype.wireEvents = function () {
        this.wireFooterEvents(this.editorTemplate);
        // Ensure editableTextarea and footer are available in the DOM
        if (this.editableTextarea && this.footer) {
            var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.add(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown, this);
                // Optional fallback for environments without Pointer Events
                EventHandler.add(footerIconsWrapper, 'click', this.onFooterIconsClick, this);
                EventHandler.add(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut, this);
            }
        }
    };
    InlineAIAssist.prototype.unWireEvents = function () {
        this.unWireFooterEvents(this.editorTemplate);
        if (this.editableTextarea) {
            EventHandler.remove(this.editableTextarea, 'keyup', this.keyUpHandler);
            this.editableTextarea.removeEventListener('keydown', this.keyDownHandler.bind(this), true);
            var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.remove(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown);
                EventHandler.remove(footerIconsWrapper, 'click', this.onFooterIconsClick);
                EventHandler.remove(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut);
            }
        }
    };
    InlineAIAssist.prototype.attachPopupEventHandlers = function () {
        EventHandler.add(document, 'keydown', this.onPopupKeyDown, this);
        EventHandler.add(document, 'mousedown', this.onPopupOutsideClick, this);
    };
    InlineAIAssist.prototype.detachPopupEventHandlers = function () {
        EventHandler.remove(document, 'keydown', this.onPopupKeyDown);
        EventHandler.remove(document, 'mousedown', this.onPopupOutsideClick);
    };
    InlineAIAssist.prototype.onPopupKeyDown = function (e) {
        if (e.key === 'Escape' && this.popupObj && this.popupObj.element.offsetParent !== null) {
            e.preventDefault();
            this.hidePopup();
        }
    };
    InlineAIAssist.prototype.onPopupOutsideClick = function (e) {
        e.stopImmediatePropagation();
        if (!this.popupObj || this.popupObj.element.offsetParent === null) {
            return;
        }
        var target = e.target;
        var popupElement = this.popupObj.element;
        if (this.mentionPopupObj && this.mentionPopupObj.element) {
            var mentionPopupElement = this.mentionPopupObj.element;
            if (mentionPopupElement.contains(target)) {
                return;
            }
        }
        if (!popupElement.contains(target)) {
            this.hidePopup();
        }
    };
    InlineAIAssist.prototype.handleInput = function (event) {
        var textareaEle = event.target;
        var isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        var textContent = textareaEle.innerHTML;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = SanitizeHtmlHelper.sanitize(textContent);
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.scheduleUndoPush();
        this.redoStack = [];
        if (this.prompt && this.prompt.trim().length > 0) {
            this.hideCommandPopup();
        }
        else {
            if (this.commandSettings.commands && this.commandSettings.commands.length > 0 && !this.hasResponse) {
                this.showCommandMenuPopup();
            }
        }
    };
    InlineAIAssist.prototype.onFocusEditableTextarea = function () {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
    };
    InlineAIAssist.prototype.onBlurEditableTextarea = function () {
        if (this.footer) {
            this.footer.classList.remove('e-footer-focused');
        }
    };
    InlineAIAssist.prototype.showTypingIndicator = function (text) {
        if (!this.editableTextarea) {
            return;
        }
        this.editableTextarea.setAttribute('contenteditable', 'false');
        this.editableTextarea.classList.add('e-response-indicator-active');
        if (!this.typingIndicatorEl) {
            this.typingIndicatorEl = this.createElement('span', { className: 'e-response-indicator' });
        }
        this.typingIndicatorEl.innerHTML =
            '<span class="e-indicator-text">' + text + '</span>' +
                '<span class="e-indicator"></span>' +
                '<span class="e-indicator"></span>' +
                '<span class="e-indicator"></span>';
        this.editableTextarea.innerHTML = '';
        this.editableTextarea.appendChild(this.typingIndicatorEl);
    };
    InlineAIAssist.prototype.hideTypingIndicator = function () {
        if (!this.editableTextarea) {
            return;
        }
        this.editableTextarea.setAttribute('contenteditable', 'true');
        this.editableTextarea.classList.remove('e-typing-indicator-active');
        if (this.typingIndicatorEl && this.typingIndicatorEl.parentElement === this.editableTextarea) {
            this.editableTextarea.removeChild(this.typingIndicatorEl);
        }
        this.editableTextarea.innerHTML = '';
    };
    InlineAIAssist.prototype.onSendIconClick = function () {
        if (this.isResponseRequested || !this.prompt.trim()) {
            return;
        }
        this.isResponseRequested = true;
        this.isStopRequested = false;
        this.hasResponse = false;
        var prevOnChange = this.isProtectedOnChange;
        this.clearResponses();
        this.toggleStopRespondingButton(true);
        if (this.responseMode.toLowerCase() === 'inline') {
            this.showTypingIndicator(this.l10n.getConstant('thinkingIndicator'));
        }
        else {
            this.responseContainerCreated = false;
            this.createResponseContainer();
            this.renderSkeleton();
            if (this.responseContainer && this.skeletonContainer) {
                this.responseContainer.appendChild(this.skeletonContainer);
            }
        }
        var eventArgs = {
            cancel: false,
            prompt: this.prompt
        };
        if (!this.editorTemplate) {
            this.isProtectedOnChange = true;
            if (this.responseMode.toLowerCase() !== 'inline') {
                this.editableTextarea.innerText = '';
            }
            this.isProtectedOnChange = prevOnChange;
            this.pushToUndoStack('');
            this.refreshTextareaUI();
        }
        this.trigger('promptRequest', eventArgs);
    };
    InlineAIAssist.prototype.respondingStopper = function () {
        this.isResponseRequested = false;
        this.isStopRequested = true;
        var hasGeneratedResponse = false;
        if (this.responseMode.toLowerCase() === 'inline') {
            this.hideTypingIndicator();
            hasGeneratedResponse = this.hasResponse;
        }
        else {
            this.removeSkeleton();
            var responseTextElement = this.element.querySelector('.e-response-text');
            if (responseTextElement && responseTextElement.innerText && responseTextElement.innerText.trim().length > 0) {
                hasGeneratedResponse = true;
            }
        }
        this.toggleStopRespondingButton(false);
        if (hasGeneratedResponse) {
            this.showResponsePopup();
        }
    };
    InlineAIAssist.prototype.createResponseContainer = function () {
        if (!this.responseContainerCreated) {
            this.responseContainer = this.createElement('div', { className: "e-output-container " + (this.responseTemplate ? 'e-response-item-template' : '') });
            var responseText = this.createElement('div', { className: 'e-response-text' });
            this.responseContainer.appendChild(responseText);
            var content = this.element.querySelector('.e-content');
            if (content) {
                content.appendChild(this.responseContainer);
            }
            this.responseContainerCreated = true;
        }
    };
    InlineAIAssist.prototype.renderSkeleton = function () {
        this.skeletonContainer = this.createElement('div', { className: 'e-output-container' });
        var outputViewWrapper = this.createElement('div', { className: 'e-output', styles: 'width: 70%;' });
        var skeletonIconEle = this.createElement('span', { className: 'e-output-icon e-skeleton e-skeleton-text e-shimmer-wave' });
        var skeletonBodyEle = this.createElement('div', { className: 'e-loading-body' });
        var _a = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 75%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 50%; height: 15px;' })
        ], skeletonLine1 = _a[0], skeletonLine2 = _a[1], skeletonLine3 = _a[2];
        skeletonBodyEle.append(skeletonLine1, skeletonLine2, skeletonLine3);
        outputViewWrapper.append(skeletonBodyEle);
        this.skeletonContainer.append(skeletonIconEle, outputViewWrapper);
    };
    InlineAIAssist.prototype.removeSkeleton = function () {
        if (this.responseContainer && this.responseContainer.querySelector('.e-skeleton')) {
            this.skeletonContainer.remove();
        }
    };
    InlineAIAssist.prototype.applyPromptChange = function (newState, oldState, event) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = this.editableTextarea.innerHTML = newState.content;
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
    };
    InlineAIAssist.prototype.refreshTextareaUI = function () {
        this.updateHiddenTextarea(this.prompt);
        this.checkAndActivateSendIcon();
        this.updateFooterElementClass();
        this.updateFooterType(this.inlineToolbarSettings.toolbarPosition);
    };
    InlineAIAssist.prototype.checkAndActivateSendIcon = function () {
        if (!this.footerToolbarEle) {
            return;
        }
        var length = this.editableTextarea.innerText.length;
        if (this.sendToolbarItem && this.sendToolbarItem.prefixIcon === 'e-icons e-inline-send') {
            var sendItem = this.footerToolbarEle.element.querySelector('.e-inline-send');
            if (sendItem) {
                if (length > 0 && !this.isResponseRequested) {
                    removeClass([sendItem], 'disabled');
                    sendItem.setAttribute('title', this.l10n.getConstant('send'));
                }
                else {
                    addClass([sendItem], 'disabled');
                }
            }
        }
    };
    InlineAIAssist.prototype.toggleStopRespondingButton = function (show) {
        var sendIconClass = 'e-inline-send';
        var stopIconClass = 'e-inline-stop';
        var stopTooltip = this.l10n.getConstant('stopResponseText');
        if (!this.editorTemplate) {
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
    InlineAIAssist.prototype.updateFooterToolbar = function () {
        var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
        if (footerIconsWrapper) {
            footerIconsWrapper.innerHTML = '';
            this.footerToolbarEle = null;
            this.sendToolbarItem = null;
            this.renderFooterToolbar(footerIconsWrapper);
            this.refreshTextareaUI();
        }
    };
    InlineAIAssist.prototype.keyHandler = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.pushToUndoStack(this.editableTextarea.innerText);
            e.preventDefault();
            if (!this.isResponseRequested) {
                this.onSendIconClick();
            }
        }
        else {
            this.handleUndoRedo(e);
        }
    };
    InlineAIAssist.prototype.footerKeyHandler = function (e) {
        e.stopPropagation();
        var targetElement = e.target;
        if (targetElement.classList.contains('e-tbar-btn')) {
            return;
        }
        else if (e.key === 'Escape') {
            this.onPopupKeyDown(e);
            return;
        }
        this.keyHandler(e);
    };
    /**
     * Appends or sets the generated response content in the component.
     * Use this method to manually inject a response from cache, non-streaming APIs, or custom logic.
     *
     * @method addResponse
     * @param {string} response - The response content (plain text or Markdown) to render.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    InlineAIAssist.prototype.addResponse = function (response, isFinalUpdate) {
        if (isFinalUpdate === void 0) { isFinalUpdate = true; }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (this.isStopRequested) {
            this.isStopRequested = false;
            this.isResponseRequested = false;
            if (this.responseMode.toLowerCase() === 'inline') {
                this.hideTypingIndicator();
                this.toggleStopRespondingButton(false);
            }
            return;
        }
        var htmlResponse = MarkdownConverter.toHtml(response);
        this.prompts = this.prompts.concat([{ prompt: this.prompt, response: htmlResponse }]);
        this.prompt = '';
        this.hasResponse = true;
        if (this.responseMode.toLowerCase() === 'inline') {
            if (isFinalUpdate) {
                this.hideTypingIndicator();
                this.isResponseRequested = false;
                this.toggleStopRespondingButton(false);
                this.showResponsePopup();
            }
            else {
                if (!this.typingIndicatorEl) {
                    this.showTypingIndicator(this.l10n.getConstant('editingIndicator'));
                }
                else {
                    var indicatorTextElement = this.typingIndicatorEl.querySelector('.e-indicator-text');
                    indicatorTextElement.innerHTML = this.l10n.getConstant('editingIndicator');
                }
            }
        }
        else {
            if (!this.responseContainerCreated) {
                this.responseContainerCreated = false;
                this.createResponseContainer();
            }
            if (this.enableStreaming && !this.responseTemplate) {
                this.streamResponse(htmlResponse);
                return;
            }
            else {
                if (this.responseTemplate) {
                    this.renderResponseWithTemplate(response);
                }
                else {
                    this.removeSkeleton();
                    var responseItem = this.element.querySelector('.e-response-text');
                    if (!responseItem) {
                        return;
                    }
                    responseItem.innerHTML = htmlResponse;
                }
                if (isFinalUpdate) {
                    this.isResponseRequested = false;
                    this.toggleStopRespondingButton(false);
                    this.showResponsePopup();
                }
            }
        }
        this.isProtectedOnChange = prevOnChange;
    };
    InlineAIAssist.prototype.streamResponse = function (response) {
        var _this = this;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var i = 0;
        var words = response.split(' ');
        var wordCount = words.length;
        var lastResponse = '';
        var responseItem = this.element.querySelector('.e-response-text');
        var streamingResponse = function () {
            if (_this.isStopRequested) {
                return;
            }
            lastResponse += (i === 0 ? '' : ' ') + words[parseInt(i.toString(), 10)];
            i++;
            _this.removeSkeleton();
            if (responseItem) {
                responseItem.innerHTML = lastResponse;
            }
            if (i < wordCount) {
                setTimeout(function () {
                    streamingResponse();
                }, 15);
            }
            else {
                var isFinalUpdate = lastResponse.length === response.length;
                if (isFinalUpdate) {
                    _this.isResponseRequested = false;
                    _this.toggleStopRespondingButton(false);
                    _this.showResponsePopup();
                }
                _this.isProtectedOnChange = prevOnChange;
            }
        };
        streamingResponse();
    };
    /**
     * Executes the specified prompt as if the user typed and submitted it.
     * TUse this to run predefined commands, slash-menu actions, or external triggers.
     *
     * @method executePrompt
     * @param {string} prompt - The prompt text to execute; dispatched to the AI backend or via the promptRequest event.
     * @returns {void}
     */
    InlineAIAssist.prototype.executePrompt = function (prompt) {
        if (!isNOU(prompt) && prompt.trim().length > 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = prompt;
            this.isProtectedOnChange = prevOnChange;
            this.onSendIconClick();
        }
    };
    /**
     * Opens the popup UI and optionally positions it at the given screen coordinates.
     * When not provided, default positioning (caret/selection/target) is applied.
     *
     * @method showPopup
     * @param {number} [x] - X coordinate in pixels or CSS units (e.g., 300, '300px', '50%').
     * @param {number} [y] - Y coordinate in pixels or CSS units (e.g., 200, '200px', '50%').
     * @returns {void}
     */
    InlineAIAssist.prototype.showPopup = function (x, y) {
        if (this.popupObj) {
            // Determine positioning element: use target if provided, otherwise use selected text
            var positioningElement = this.relateToEl || document.body;
            this.popupObj.setProperties({ relateTo: positioningElement, targetType: 'relative', offsetX: x ? x : 0, offsetY: y ? y : 0 }, true);
            this.popupObj.refreshPosition();
            this.popupObj.show();
            if (this.editableTextarea) {
                this.editableTextarea.focus();
            }
            this.hasResponse = false;
            if (this.mentionPopupObj && this.commandSettings.commands.length > 0) {
                this.showCommandMenuPopup();
            }
        }
    };
    /**
     * Closes/hides the popup UI or collapses the inline response area.
     * Triggers the close event after the popup is hidden.
     *
     * @method hidePopup
     * @returns {void}
     */
    InlineAIAssist.prototype.hidePopup = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (this.mentionPopupObj) {
            this.mentionPopupObj.dataSource = this.commandOptionsData;
            this.mentionPopupObj.dataBind();
        }
        if (this.popupObj) {
            this.clearResponses();
            this.prompts = [];
            this.editableTextarea.innerHTML = '';
            this.refreshTextareaUI();
            this.popupObj.hide();
        }
        this.isProtectedOnChange = prevOnChange;
    };
    /**
     * Opens the command popup below the prompt input area.
     * Use to display available commands or suggestions for quick selection.
     *
     * @method showCommandPopup
     * @returns {void}
     */
    InlineAIAssist.prototype.showCommandPopup = function () {
        if (this.popupObj.element.classList.contains('e-popup-open')) {
            this.showCommandMenuPopup();
        }
    };
    /**
     * Hides the command popup displayed below the prompt input area.
     * Call this to dismiss the command chooser without selection.
     *
     * @method hideCommandPopup
     * @returns {void}
     */
    InlineAIAssist.prototype.hideCommandPopup = function () {
        if (this.mentionPopupObj && this.mentionPopupObj.element.classList.contains('e-popup-open')) {
            this.mentionPopupObj.hidePopup();
        }
    };
    InlineAIAssist.prototype.renderResponseWithTemplate = function (response) {
        var outputContainer = this.element.querySelector('.e-output-container');
        if (!outputContainer) {
            return;
        }
        outputContainer.innerHTML = '';
        var context = {
            response: response,
            responseItems: this.responseSettings.items
        };
        this.updateContent(this.responseTemplate, outputContainer, context, 'responseTemplate');
    };
    InlineAIAssist.prototype.clearResponses = function () {
        if (this.responseContainer) {
            this.responseContainer.remove();
        }
    };
    InlineAIAssist.prototype.destroy = function () {
        this.unWireEvents();
        this.destroyAndNullify(this.popupObj);
        this.destroyAndNullify(this.footerToolbarEle);
        this.destroyAndNullify(this.mentionPopupObj);
        this.removeAndNullify(this.responseContainer);
        this.removeAndNullify(this.skeletonContainer);
        this.removeAndNullify(this.contentWrapper);
        this.removeAndNullify(this.footer);
        this.removeAndNullify(this.editableTextarea);
        this.removeAndNullify(this.typingIndicatorEl);
        _super.prototype.destroy.call(this);
        if (this.mentionPopupObj) {
            this.mentionPopupObj.element.remove();
        }
        this.responseContainer = null;
        this.skeletonContainer = null;
        this.contentWrapper = null;
        this.footer = null;
        this.editableTextarea = null;
        this.typingIndicatorEl = null;
        this.sendToolbarItem = null;
        this.responseOptionsData = [];
        this.commandOptionsData = [];
        this.prompts = [];
        this.responseContainerCreated = false;
        this.isResponseRequested = false;
        this.isStopRequested = false;
        this.inlineToolbarSettings = this.responseSettings = this.commandSettings = {};
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        removeClass([this.element], ['e-inline-ai-assist']);
        this.element.classList.remove('e-rtl');
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param {InlineAIAssistModel} newProp - Specifies new properties
     * @param {InlineAIAssistModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    InlineAIAssist.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'popupWidth':
                case 'popupHeight':
                    if (this.popupObj) {
                        this.popupObj.width = formatUnit(this.popupWidth);
                        this.popupObj.height = formatUnit(this.popupHeight);
                    }
                    break;
                case 'prompt':
                    if (!this.editorTemplate) {
                        this.editableTextarea.innerText = this.prompt;
                        this.refreshTextareaUI();
                        this.pushToUndoStack(this.prompt);
                    }
                    break;
                case 'locale':
                    this.l10n.setLocale(this.locale);
                    break;
                case 'placeholder':
                    if (this.editableTextarea) {
                        this.editableTextarea.setAttribute('placeholder', this.placeholder);
                    }
                    break;
                case 'cssClass':
                    this.updateCssClass(this.element, newProp.cssClass, oldProp.cssClass);
                    break;
                case 'target':
                    this.resolveTargetElement();
                    break;
                case 'relateTo':
                    this.resolveRelateToElement();
                    if (this.popupObj) {
                        this.popupObj.setProperties({ relateTo: this.relateToEl }, true);
                        this.popupObj.refreshPosition();
                    }
                    break;
                case 'inlineToolbarSettings':
                    if (newProp.inlineToolbarSettings.items) {
                        this.updateFooterToolbar();
                    }
                    if (newProp.inlineToolbarSettings.toolbarPosition) {
                        this.updateFooterType(newProp.inlineToolbarSettings.toolbarPosition);
                    }
                    break;
                case 'responseSettings':
                    if (newProp.responseSettings.items) {
                        this.setResponsePopupData();
                    }
                    break;
                case 'commandSettings':
                    if (newProp.commandSettings) {
                        this.setCommandPopupData();
                        if (this.mentionPopupObj && this.mentionPopupObj.element.classList.contains('e-popup-open')) {
                            this.showCommandMenuPopup();
                        }
                    }
                    break;
                case 'responseTemplate': {
                    if (this.responseContainerCreated && this.prompts.length > 0) {
                        var outputContainer = this.element.querySelector('.e-output-container');
                        if (outputContainer) {
                            outputContainer.innerHTML = '';
                            this.renderResponseWithTemplate(this.prompts[this.prompts.length - 1].response);
                        }
                    }
                    break;
                }
                case 'editorTemplate': {
                    this.updateEditorTemplate();
                    break;
                }
                case 'enableStreaming': {
                    this.enableStreaming = newProp.enableStreaming;
                    break;
                }
                case 'zIndex':
                    if (this.popupObj) {
                        this.popupObj.zIndex = newProp.zIndex;
                        this.popupObj.dataBind();
                    }
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (this.footerToolbarEle) {
                        this.footerToolbarEle.enableRtl = this.enableRtl;
                        this.footerToolbarEle.dataBind();
                    }
                    break;
            }
        }
    };
    __decorate([
        Property('body')
    ], InlineAIAssist.prototype, "target", void 0);
    __decorate([
        Property('')
    ], InlineAIAssist.prototype, "relateTo", void 0);
    __decorate([
        Property('Popup')
    ], InlineAIAssist.prototype, "responseMode", void 0);
    __decorate([
        Property('')
    ], InlineAIAssist.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], InlineAIAssist.prototype, "prompt", void 0);
    __decorate([
        Collection([], PromptResponse)
    ], InlineAIAssist.prototype, "prompts", void 0);
    __decorate([
        Property('Ask or generate AI content..')
    ], InlineAIAssist.prototype, "placeholder", void 0);
    __decorate([
        Property('en-US')
    ], InlineAIAssist.prototype, "locale", void 0);
    __decorate([
        Property('auto')
    ], InlineAIAssist.prototype, "popupHeight", void 0);
    __decorate([
        Property('400px')
    ], InlineAIAssist.prototype, "popupWidth", void 0);
    __decorate([
        Complex({ commands: [], popupHeight: '', popupWidth: '' }, CommandSettings)
    ], InlineAIAssist.prototype, "commandSettings", void 0);
    __decorate([
        Complex({ items: [] }, ResponseSettings)
    ], InlineAIAssist.prototype, "responseSettings", void 0);
    __decorate([
        Complex({ toolbarPosition: 'Inline', items: [] }, InlineToolbarSettings)
    ], InlineAIAssist.prototype, "inlineToolbarSettings", void 0);
    __decorate([
        Property('')
    ], InlineAIAssist.prototype, "responseTemplate", void 0);
    __decorate([
        Property('')
    ], InlineAIAssist.prototype, "editorTemplate", void 0);
    __decorate([
        Property(1000)
    ], InlineAIAssist.prototype, "zIndex", void 0);
    __decorate([
        Property(false)
    ], InlineAIAssist.prototype, "enableRtl", void 0);
    __decorate([
        Event()
    ], InlineAIAssist.prototype, "promptRequest", void 0);
    __decorate([
        Event()
    ], InlineAIAssist.prototype, "open", void 0);
    __decorate([
        Event()
    ], InlineAIAssist.prototype, "close", void 0);
    InlineAIAssist = __decorate([
        NotifyPropertyChanges
    ], InlineAIAssist);
    return InlineAIAssist;
}(AIAssistBase));
export { InlineAIAssist };
