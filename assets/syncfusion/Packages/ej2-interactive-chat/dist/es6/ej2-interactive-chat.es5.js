import { Property, ChildProperty, Collection, Event, isNullOrUndefined, formatUnit, removeClass, addClass, attributes, EventHandler, append, remove, select, compile, NotifyPropertyChanges, Component, Complex, getUniqueID, L10n, SanitizeHtmlHelper, Internationalization } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { ButtonSettings, TooltipSettings, SpeechToText, Uploader } from '@syncfusion/ej2-inputs';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { Fab } from '@syncfusion/ej2-buttons';
import { createSpinner, showSpinner, hideSpinner, Popup } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Mention } from '@syncfusion/ej2-dropdowns';

var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents a toolbar item model in the component.
 */
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "iconCss", void 0);
    __decorate([
        Property()
    ], ToolbarItem.prototype, "text", void 0);
    __decorate([
        Property('Button')
    ], ToolbarItem.prototype, "type", void 0);
    __decorate([
        Property('Left')
    ], ToolbarItem.prototype, "align", void 0);
    __decorate([
        Property(true)
    ], ToolbarItem.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], ToolbarItem.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], ToolbarItem.prototype, "template", void 0);
    __decorate([
        Property(-1)
    ], ToolbarItem.prototype, "tabIndex", void 0);
    return ToolbarItem;
}(ChildProperty));
/**
 * Represents the settings for the toolbar in the component.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], ToolbarItem)
    ], ToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], ToolbarSettings.prototype, "itemClicked", void 0);
    return ToolbarSettings;
}(ChildProperty));
/**
 * ChatBase component act as base class.
 */
var InterActiveChatBase = /** @class */ (function (_super) {
    __extends(InterActiveChatBase, _super);
    /**
     * * Constructor for Base class
     *
     * @param {InterActiveChatBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function InterActiveChatBase(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.undoStack = [];
        _this.redoStack = [];
        _this.undoDelayTimer = null;
        return _this;
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    InterActiveChatBase.prototype.preRender = function () {
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    InterActiveChatBase.prototype.getModuleName = function () {
        return 'interactivechatBase';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    InterActiveChatBase.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    InterActiveChatBase.prototype.render = function () {
    };
    /* To calculate the width when change via set model */
    InterActiveChatBase.prototype.setDimension = function (element, width, height) {
        element.style.width = !isNullOrUndefined(width) ? formatUnit(width) : element.style.width;
        element.style.height = !isNullOrUndefined(height) ? formatUnit(height) : element.style.height;
    };
    InterActiveChatBase.prototype.addCssClass = function (element, cssClass) {
        if (cssClass) {
            element.classList.add(cssClass);
        }
    };
    InterActiveChatBase.prototype.addRtlClass = function (element, isRtl) {
        if (isRtl) {
            element.classList.add('e-rtl');
        }
    };
    InterActiveChatBase.prototype.updateCssClass = function (element, newClass, oldClass) {
        if (oldClass) {
            removeClass([element], oldClass.trim().split(' '));
        }
        if (newClass) {
            addClass([element], newClass.trim().split(' '));
        }
    };
    InterActiveChatBase.prototype.updateHeader = function (showHeader, headerElement, viewWrapper) {
        if (!showHeader) {
            headerElement.hidden = true;
            viewWrapper.style.height = '100%';
        }
        else {
            headerElement.hidden = false;
            viewWrapper.style.height = '';
        }
    };
    InterActiveChatBase.prototype.renderViewSections = function (element, headerClassName, viewClassName) {
        var headerWrapper = this.createElement('div', { className: headerClassName });
        element.appendChild(headerWrapper);
        var viewWrapper = this.createElement('div', { className: viewClassName });
        element.appendChild(viewWrapper);
    };
    InterActiveChatBase.prototype.createViewComponents = function (viewWrapper) {
        var contentWrapper = this.createElement('div', { className: 'e-views' });
        var viewContainer = this.createElement('div', { className: 'e-view-container' });
        contentWrapper.appendChild(viewContainer);
        viewWrapper.appendChild(contentWrapper);
    };
    InterActiveChatBase.prototype.updateScroll = function (scrollElement) {
        scrollElement.scrollTo(0, scrollElement.scrollHeight);
    };
    InterActiveChatBase.prototype.getElement = function (element) {
        var className;
        switch (element) {
            case 'footer':
                className = 'e-footer';
                break;
            case 'contentContainer':
                className = 'e-content-container';
                break;
            case 'outputElement':
                className = 'e-content';
                break;
            default:
                className = '';
                break;
        }
        return this.createElement('div', { className: className });
    };
    InterActiveChatBase.prototype.getClipBoardContent = function (value) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = value;
        tempElement.style.top = '0';
        tempElement.style.left = '0';
        tempElement.style.position = 'fixed';
        tempElement.style.opacity = '0';
        document.body.appendChild(tempElement);
        navigator.clipboard.write([
            new ClipboardItem({
                'text/html': new Blob([tempElement.innerHTML], { type: 'text/html' }),
                'text/plain': new Blob([tempElement.innerText], { type: 'text/plain' })
            })
        ]);
        document.body.removeChild(tempElement);
    };
    InterActiveChatBase.prototype.writeFileToClipboard = function (file) {
        var _a;
        if (!document.hasFocus() || !('clipboard' in navigator)) {
            return;
        }
        var mimeType = file.type;
        var supportedTypes = ['image/png'];
        if (supportedTypes.includes(mimeType)) {
            void navigator.clipboard.write([
                new ClipboardItem((_a = {}, _a[mimeType] = file, _a))
            ]);
            return;
        }
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(function (blob) {
                var _a;
                if (blob) {
                    void navigator.clipboard.write([
                        new ClipboardItem((_a = {}, _a[blob.type] = blob, _a))
                    ]);
                }
            }, 'image/png');
        };
        img.src = URL.createObjectURL(file);
    };
    InterActiveChatBase.prototype.getFooter = function () {
        this.footer = this.getElement('footer');
    };
    InterActiveChatBase.prototype.createSuggestionElement = function (suggestionHeader) {
        var suggestionContainer = this.createElement('div', { className: 'e-suggestions' });
        var suggestionHeaderElement = this.createElement('div', { className: 'e-suggestion-header' });
        var suggestionListElement = this.createElement('div', { className: 'e-suggestion-list' });
        if (suggestionHeader) {
            suggestionContainer.appendChild(suggestionHeaderElement);
        }
        suggestionContainer.appendChild(suggestionListElement);
        return { suggestionContainer: suggestionContainer, suggestionHeaderElement: suggestionHeaderElement, suggestionListElement: suggestionListElement };
    };
    InterActiveChatBase.prototype.renderSuggestions = function (suggestionsArray, suggestionHeader, suggestionTemplate, contextName, templateName, onSuggestionClick) {
        var isSuggestionTemplate = suggestionTemplate ? true : false;
        if (suggestionsArray && suggestionsArray.length > 0) {
            var _a = this.createSuggestionElement(suggestionHeader), suggestionContainer = _a.suggestionContainer, suggestionHeaderElement = _a.suggestionHeaderElement, suggestionListElement = _a.suggestionListElement;
            this.suggestionsElement = suggestionContainer;
            var suggestionContainerClass = "e-suggestions " + (isSuggestionTemplate ? 'e-suggestion-item-template' : '');
            this.suggestionsElement.className = suggestionContainerClass;
            this.suggestionHeader = suggestionHeaderElement;
            var suggestionList = suggestionListElement;
            this.renderSuggestionList(suggestionsArray, suggestionList, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick);
            if (suggestionHeader) {
                this.suggestionHeader.innerHTML = suggestionHeader;
            }
            this.suggestionsElement.append(suggestionList);
            this.content.append(this.suggestionsElement);
        }
    };
    InterActiveChatBase.prototype.renderSuggestionList = function (suggestionsArray, suggestionWrapper, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick) {
        var _this = this;
        var suggestionsListElement = this.createElement('ul', { attrs: { 'tabindex': '-1' } });
        suggestionsArray.forEach(function (suggestion, i) {
            var _a;
            var suggestionList = _this.createElement('li');
            attributes(suggestionList, { 'tabindex': '0' });
            EventHandler.add(suggestionList, 'click', onSuggestionClick, _this);
            EventHandler.add(suggestionList, 'keydown', _this.suggestionItemHandler, _this);
            if (isSuggestionTemplate) {
                var suggestionContext = (_a = { index: i }, _a[contextName] = suggestionsArray[parseInt(i.toString(), 10)], _a);
                _this.updateContent(suggestionTemplate, suggestionList, suggestionContext, templateName);
            }
            else {
                suggestionList.innerHTML = suggestion;
            }
            suggestionsListElement.append(suggestionList);
        });
        suggestionWrapper.appendChild(suggestionsListElement);
    };
    InterActiveChatBase.prototype.suggestionItemHandler = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.onSuggestionClick(event);
        }
    };
    InterActiveChatBase.prototype.renderBannerView = function (bannerTemplate, parentElement, templateName) {
        if (bannerTemplate) {
            var className = templateName === 'emptyChatTemplate' ? 'e-empty-chat-template' : 'e-banner-view';
            var introContainer = this.createElement('div', { className: className });
            this.updateContent(bannerTemplate, introContainer, {}, templateName);
            parentElement.prepend(introContainer);
        }
    };
    InterActiveChatBase.prototype.updateContent = function (template, contentElement, context, templateName) {
        if (this.isReact) {
            this.clearTemplate([templateName]);
        }
        var notCompile = !(this.isReact || this.isVue);
        var ctn = this.getTemplateFunction(template, notCompile);
        if (typeof ctn === 'string') {
            contentElement.innerHTML = ctn;
        }
        else {
            append(ctn(context, this), contentElement);
        }
        this.renderReactTemplates();
    };
    InterActiveChatBase.prototype.renderFooterContent = function (footerTemplate, prompt, promptPlaceholder, showClearButton, className) {
        if (footerTemplate) {
            this.updateContent(footerTemplate, this.footer, {}, 'footerTemplate');
        }
        else {
            this.renderFooter(className, prompt, promptPlaceholder, showClearButton);
        }
    };
    InterActiveChatBase.prototype.renderFooter = function (className, prompt, promptPlaceholder, showClearButton) {
        this.editableTextarea = this.createElement('div', {
            attrs: {
                class: className,
                contenteditable: 'true',
                placeholder: promptPlaceholder,
                role: 'textbox',
                'aria-multiline': 'true'
            },
            innerHTML: prompt
        });
        var hiddenTextarea = this.createElement('textarea', {
            attrs: {
                class: 'e-hidden-textarea',
                name: 'userPrompt',
                value: prompt
            }
        });
        var textAreaIconsWrapper = this.createElement('div', { className: 'e-textarea-icons-wrapper' });
        this.appendChildren(textAreaIconsWrapper, this.editableTextarea, hiddenTextarea);
        this.footer.appendChild(textAreaIconsWrapper);
    };
    InterActiveChatBase.prototype.updateTextAreaObject = function (textareaObj) {
        if (isNullOrUndefined(textareaObj)) {
            return;
        }
        var textarea = textareaObj.element;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };
    InterActiveChatBase.prototype.renderSendIcon = function (sendIconClass) {
        var sendIcon = this.createElement('span', { attrs: { class: sendIconClass, role: 'button', 'aria-label': 'Submit', tabindex: '0' } });
        this.footer.appendChild(sendIcon);
        return sendIcon;
    };
    InterActiveChatBase.prototype.appendChildren = function (target) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        target.append.apply(target, children);
    };
    InterActiveChatBase.prototype.insertBeforeChildren = function (target) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        target.prepend.apply(target, children);
    };
    InterActiveChatBase.prototype.renderFooterIcons = function (sendIconClass, showClearButton, clearIconClass) {
        var footerIconsWrapper = this.createElement('div', { attrs: { class: 'e-footer-icons-wrapper' } });
        this.sendIcon = this.createElement('span', { attrs: { class: sendIconClass, role: 'button', 'aria-label': 'Submit', tabindex: '0' } });
        footerIconsWrapper.appendChild(this.sendIcon);
        if (showClearButton) {
            this.renderClearIcon(footerIconsWrapper, clearIconClass);
        }
        this.footer.firstChild.appendChild(footerIconsWrapper);
        this.footer.classList.add('e-footer-focus-wave-effect');
    };
    InterActiveChatBase.prototype.renderClearIcon = function (footerIconsWrapper, clearIconClass) {
        this.clearIcon = this.createElement('span', { attrs: { class: clearIconClass, role: 'button', 'aria-label': 'Close', tabindex: '-1' } });
        if (footerIconsWrapper) {
            footerIconsWrapper.prepend(this.clearIcon);
        }
    };
    InterActiveChatBase.prototype.checkScrollAtBottom = function (Element, fabHeight) {
        var scrollThreshold = 5;
        var scrollTop = Math.floor(Element.scrollTop);
        var scrollHeight = Math.floor(Element.scrollHeight);
        var clientHeight = Math.floor(Element.clientHeight);
        return scrollHeight - scrollTop <= clientHeight + scrollThreshold + fabHeight;
    };
    InterActiveChatBase.prototype.updateHiddenTextarea = function (prompt) {
        var hiddenTextarea = this.footer.querySelector('.e-hidden-textarea');
        hiddenTextarea.value = prompt;
    };
    InterActiveChatBase.prototype.activateSendIcon = function (value) {
        this.sendIcon.classList.toggle('disabled', value === 0);
        this.sendIcon.classList.toggle('enabled', value > 0);
    };
    InterActiveChatBase.prototype.updateFooterElementClass = function () {
        if (isNullOrUndefined(this.editableTextarea)) {
            return;
        }
        var textarea = this.editableTextarea;
        textarea.style.height = 'auto';
        this.footer.classList.remove('e-footer-expanded');
        this.footer.classList[textarea.scrollHeight > parseInt(getComputedStyle(textarea).minHeight, 10) ? 'add' : 'remove']('e-footer-expanded');
    };
    InterActiveChatBase.prototype.updatePlaceholder = function (placeholder) {
        if (this.editableTextarea) {
            this.editableTextarea.setAttribute('placeholder', placeholder);
        }
    };
    InterActiveChatBase.prototype.pushToUndoStack = function (value) {
        var _a = this.getCursorPosition(), start = _a.start, end = _a.end;
        var state = {
            content: value,
            selectionStart: start,
            selectionEnd: end
        };
        if (this.undoStack.length === 0 || this.undoStack[this.undoStack.length - 1].content !== value) {
            this.undoStack.push(state);
            if (this.undoStack.length > 100) {
                this.undoStack.shift();
            }
        }
    };
    InterActiveChatBase.prototype.handleUndoRedo = function (event) {
        var isUndo = (event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey;
        var isRedo = (event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey));
        if (isUndo) {
            event.preventDefault();
            this.undo(event);
        }
        else if (isRedo) {
            event.preventDefault();
            this.redo(event);
        }
    };
    InterActiveChatBase.prototype.undo = function (event) {
        if (this.undoStack.length <= 1) {
            return;
        }
        var current = this.undoStack.pop();
        var previous = this.undoStack[this.undoStack.length - 1];
        this.redoStack.push(current);
        this.applyPromptChange(previous, current, event);
    };
    InterActiveChatBase.prototype.redo = function (event) {
        if (this.redoStack.length === 0) {
            return;
        }
        var current = {
            content: this.editableTextarea.textContent,
            selectionStart: this.getCursorPosition().start,
            selectionEnd: this.getCursorPosition().end
        };
        var next = this.redoStack.pop();
        this.undoStack.push(next);
        this.applyPromptChange(next, current, event);
    };
    InterActiveChatBase.prototype.setFocusAtEnd = function (textArea) {
        var range = document.createRange();
        var selection = window.getSelection();
        range.selectNodeContents(textArea);
        range.collapse(false);
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    InterActiveChatBase.prototype.getCursorPosition = function () {
        var selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return { start: 0, end: 0 };
        }
        var range = selection.getRangeAt(0);
        var startContainer = range.startContainer, startOffset = range.startOffset, endContainer = range.endContainer, endOffset = range.endOffset;
        var charCount = 0;
        var start = -1;
        var end = -1;
        if (this.editableTextarea !== null) {
            var walker = document.createTreeWalker(this.editableTextarea, NodeFilter.SHOW_TEXT, null);
            var currentNode = walker.nextNode();
            while (currentNode !== null) {
                if (currentNode === startContainer) {
                    start = charCount + startOffset;
                }
                if (currentNode === endContainer) {
                    end = charCount + endOffset;
                }
                if (start !== -1 && end !== -1) {
                    break;
                }
                charCount += currentNode.textContent.length;
                currentNode = walker.nextNode();
            }
        }
        if (start === -1) {
            start = 0;
        }
        if (end === -1) {
            end = 0;
        }
        return { start: start, end: end };
    };
    InterActiveChatBase.prototype.findTextNodeAndOffset = function (element, targetOffset) {
        // TreeWalker is a robust way to traverse all text nodes in the element's subtree
        var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        var currentNode = walker.nextNode();
        var cumulativeOffset = 0;
        while (currentNode !== null) {
            var nodeLength = currentNode.textContent.length;
            if (cumulativeOffset + nodeLength >= targetOffset) {
                return { node: currentNode, offset: targetOffset - cumulativeOffset };
            }
            cumulativeOffset += nodeLength;
            currentNode = walker.nextNode();
        }
        walker.currentNode = element;
        var lastNode = walker.lastChild();
        if (lastNode) {
            return { node: lastNode, offset: lastNode.textContent.length };
        }
        return null; // Should not happen if the element is not empty
    };
    InterActiveChatBase.prototype.setCursorPosition = function (start, end) {
        var selection = window.getSelection();
        if (!selection) {
            return;
        }
        var startNodeInfo = this.findTextNodeAndOffset(this.editableTextarea, start);
        var endNodeInfo = this.findTextNodeAndOffset(this.editableTextarea, end);
        if (startNodeInfo && endNodeInfo) {
            var range = document.createRange();
            range.setStart(startNodeInfo.node, startNodeInfo.offset);
            range.setEnd(endNodeInfo.node, endNodeInfo.offset);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    InterActiveChatBase.prototype.clearBreakTags = function (element) {
        element.innerHTML = element.innerHTML.replace(/<br>/g, '').trim();
    };
    InterActiveChatBase.prototype.handlePaste = function (event) {
        event.preventDefault(); // Prevent default paste behavior
        var pasteContent = event.clipboardData.getData('text/plain') || '';
        var selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }
        var range = selection.getRangeAt(0);
        range.deleteContents(); // Delete any selected text
        // Handle line breaks with proper typing
        var lines = pasteContent.split(/\r?\n/);
        var fragment = document.createDocumentFragment();
        lines.forEach(function (line, index) {
            if (line) { // Only add non-empty lines
                fragment.appendChild(document.createTextNode(line));
            }
            if (index < lines.length - 1) {
                fragment.appendChild(document.createElement('br'));
            }
        });
        range.insertNode(fragment);
        this.setFocusAtEnd(this.editableTextarea);
        // Clear redo stack on new input
        this.redoStack = [];
        var inputEvent = new CustomEvent('input', {
            bubbles: true,
            cancelable: true,
            detail: {
                inputType: 'insertFromPaste',
                data: this.editableTextarea.innerText,
                isComposing: false
            }
        });
        this.editableTextarea.dispatchEvent(inputEvent);
        this.pushToUndoStack(this.editableTextarea.innerHTML);
        this.updateScroll(this.editableTextarea);
    };
    InterActiveChatBase.prototype.getCurrentState = function () {
        var position = this.getCursorPosition();
        return {
            content: this.editableTextarea !== null ? this.editableTextarea.innerHTML : '',
            selectionStart: position.start,
            selectionEnd: position.end
        };
    };
    InterActiveChatBase.prototype.scheduleUndoPush = function () {
        var _this = this;
        if (this.undoDelayTimer) {
            clearTimeout(this.undoDelayTimer);
        }
        this.undoDelayTimer = setTimeout(function () {
            var lastState = _this.undoStack[_this.undoStack.length - 1];
            var currentState = _this.getCurrentState();
            if (!lastState || lastState.content !== currentState.content) {
                _this.undoStack.push(currentState);
            }
        }, 400);
    };
    InterActiveChatBase.prototype.renderFailureAlert = function (viewWrapper, failureMessage, failureType, circleCloseIconClass, closeIconClass) {
        var _this = this;
        var alertElement = this.createElement('div', {
            className: 'e-upload-failure-alert',
            innerHTML: "\n                <span class=\"e-icons " + circleCloseIconClass + "\" aria-label=\"Upload failure\"></span>\n                <div class=\"e-failure-message " + failureType + "\">" + failureMessage + "</div>\n                <span class=\"e-icons " + closeIconClass + "\" role=\"button\" tabindex=\"0\" aria-label=\"Close\"></span>\n            "
        });
        EventHandler.add(alertElement, 'click', function () { _this.handleFailureAlertRemove(viewWrapper, alertElement); }, this);
        return alertElement;
    };
    InterActiveChatBase.prototype.handleFailureAlertRemove = function (viewWrapper, alertElement) {
        alertElement.classList.remove('e-show');
        EventHandler.remove(alertElement, 'click', this.handleFailureAlertRemove);
        if (viewWrapper && viewWrapper.contains(alertElement)) {
            viewWrapper.removeChild(alertElement);
        }
    };
    InterActiveChatBase.prototype.wireFooterEvents = function (footerTemplate) {
        if (this.sendIcon) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.add(this.sendIcon, 'click', this.onSendIconClick, this);
        }
        if (this.footer && !footerTemplate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.add(this.footer, 'keydown', this.footerKeyHandler, this);
        }
        if (this.editableTextarea) {
            EventHandler.add(this.editableTextarea, 'focus', this.onFocusEditableTextarea, this);
            EventHandler.add(this.editableTextarea, 'blur', this.onBlurEditableTextarea, this);
            EventHandler.add(this.editableTextarea, 'paste', this.handlePaste, this);
            EventHandler.add(this.editableTextarea, 'input', this.handleInput, this);
            EventHandler.add(window, 'resize', this.updateFooterElementClass, this);
        }
    };
    InterActiveChatBase.prototype.unWireFooterEvents = function (footerTemplate) {
        if (this.sendIcon) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.remove(this.sendIcon, 'click', this.onSendIconClick);
        }
        if (this.footer && !footerTemplate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.remove(this.footer, 'keydown', this.footerKeyHandler);
        }
        if (this.editableTextarea) {
            EventHandler.remove(this.editableTextarea, 'focus', this.onFocusEditableTextarea);
            EventHandler.remove(this.editableTextarea, 'blur', this.onBlurEditableTextarea);
            EventHandler.remove(this.editableTextarea, 'paste', this.handlePaste);
            EventHandler.remove(this.editableTextarea, 'input', this.handleInput);
            EventHandler.remove(window, 'resize', this.updateFooterElementClass);
        }
    };
    InterActiveChatBase.prototype.removeAndNullify = function (element) {
        if (element) {
            if (!isNullOrUndefined(element.parentNode)) {
                remove(element);
            }
            else {
                element.innerHTML = '';
            }
        }
    };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    InterActiveChatBase.prototype.destroyAndNullify = function (obj) {
        if (obj) {
            obj.destroy();
            obj = null;
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    InterActiveChatBase.prototype.getTemplateFunction = function (template, notCompile) {
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                    notCompile = false;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return notCompile ? content : compile(content);
        }
        else {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param  {InterActiveChatBaseModel} newProp - Specifies new properties
     * @param  {InterActiveChatBaseModel} oldProp - Specifies old properties
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    InterActiveChatBase.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    __decorate([
        Event()
    ], InterActiveChatBase.prototype, "created", void 0);
    InterActiveChatBase = __decorate([
        NotifyPropertyChanges
    ], InterActiveChatBase);
    return InterActiveChatBase;
}(Component));

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the type of footer.
 */
var ToolbarPosition;
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
    __extends$1(AIAssistBase, _super);
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
    __decorate$1([
        Property(false)
    ], AIAssistBase.prototype, "enableStreaming", void 0);
    AIAssistBase = __decorate$1([
        NotifyPropertyChanges
    ], AIAssistBase);
    return AIAssistBase;
}(InterActiveChatBase));

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __assign = (undefined && undefined.__assign) || function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ASSISTHEADER = 'e-aiassist-header-text e-assist-view-header';
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
/**
 * The prompts property maps the list of the prompts and binds the data to the suggestions.
 */
var Prompt = /** @class */ (function (_super) {
    __extends$2(Prompt, _super);
    function Prompt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(null)
    ], Prompt.prototype, "prompt", void 0);
    __decorate$2([
        Property('')
    ], Prompt.prototype, "response", void 0);
    __decorate$2([
        Property(null)
    ], Prompt.prototype, "isResponseHelpful", void 0);
    __decorate$2([
        Property(null)
    ], Prompt.prototype, "attachedFiles", void 0);
    return Prompt;
}(ChildProperty));
/**
 * Specifies the type of assist view.
 */
var AssistViewType;
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
    __extends$2(AssistView, _super);
    function AssistView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('Assist')
    ], AssistView.prototype, "type", void 0);
    __decorate$2([
        Property('')
    ], AssistView.prototype, "name", void 0);
    __decorate$2([
        Property()
    ], AssistView.prototype, "iconCss", void 0);
    __decorate$2([
        Property()
    ], AssistView.prototype, "viewTemplate", void 0);
    return AssistView;
}(ChildProperty));
/**
 * Configuration settings for rendering Syncfusion Speech-to-Text in the AssistView footer.
 * This property holds the settings required to initialize and display the Speech-to-Text component.
 *
 */
var SpeechToTextSettings = /** @class */ (function (_super) {
    __extends$2(SpeechToTextSettings, _super);
    function SpeechToTextSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(false)
    ], SpeechToTextSettings.prototype, "enable", void 0);
    __decorate$2([
        Property(true)
    ], SpeechToTextSettings.prototype, "allowInterimResults", void 0);
    __decorate$2([
        Property('en-US')
    ], SpeechToTextSettings.prototype, "lang", void 0);
    __decorate$2([
        Property(false)
    ], SpeechToTextSettings.prototype, "disabled", void 0);
    __decorate$2([
        Complex({}, ButtonSettings)
    ], SpeechToTextSettings.prototype, "buttonSettings", void 0);
    __decorate$2([
        Property(true)
    ], SpeechToTextSettings.prototype, "showTooltip", void 0);
    __decorate$2([
        Complex({}, TooltipSettings)
    ], SpeechToTextSettings.prototype, "tooltipSettings", void 0);
    __decorate$2([
        Property('')
    ], SpeechToTextSettings.prototype, "cssClass", void 0);
    __decorate$2([
        Property('')
    ], SpeechToTextSettings.prototype, "transcript", void 0);
    __decorate$2([
        Property('Inactive')
    ], SpeechToTextSettings.prototype, "listeningState", void 0);
    __decorate$2([
        Event()
    ], SpeechToTextSettings.prototype, "onStart", void 0);
    __decorate$2([
        Event()
    ], SpeechToTextSettings.prototype, "onStop", void 0);
    __decorate$2([
        Event()
    ], SpeechToTextSettings.prototype, "transcriptChanged", void 0);
    __decorate$2([
        Event()
    ], SpeechToTextSettings.prototype, "onError", void 0);
    return SpeechToTextSettings;
}(ChildProperty));
/**
 * Represents settings for managing file attachments in the AI Assist View.
 * Includes configuration for URLs, file types, and size limitations.
 */
var AttachmentSettings = /** @class */ (function (_super) {
    __extends$2(AttachmentSettings, _super);
    function AttachmentSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('')
    ], AttachmentSettings.prototype, "saveUrl", void 0);
    __decorate$2([
        Property('')
    ], AttachmentSettings.prototype, "removeUrl", void 0);
    __decorate$2([
        Property('')
    ], AttachmentSettings.prototype, "allowedFileTypes", void 0);
    __decorate$2([
        Property(2000000)
    ], AttachmentSettings.prototype, "maxFileSize", void 0);
    __decorate$2([
        Property(10)
    ], AttachmentSettings.prototype, "maximumCount", void 0);
    __decorate$2([
        Event()
    ], AttachmentSettings.prototype, "attachmentClick", void 0);
    return AttachmentSettings;
}(ChildProperty));
/**
 * The promptToolbarSettings property maps the list of the promptToolbarSettings and binds the data to the prompt.
 */
var PromptToolbarSettings = /** @class */ (function (_super) {
    __extends$2(PromptToolbarSettings, _super);
    function PromptToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('100%')
    ], PromptToolbarSettings.prototype, "width", void 0);
    __decorate$2([
        Collection([], ToolbarItem)
    ], PromptToolbarSettings.prototype, "items", void 0);
    __decorate$2([
        Event()
    ], PromptToolbarSettings.prototype, "itemClicked", void 0);
    return PromptToolbarSettings;
}(ChildProperty));
/**
 * The responseToolbarSettings property maps the list of the responseToolbarSettings and binds the data to the output items.
 */
var ResponseToolbarSettings = /** @class */ (function (_super) {
    __extends$2(ResponseToolbarSettings, _super);
    function ResponseToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('100%')
    ], ResponseToolbarSettings.prototype, "width", void 0);
    __decorate$2([
        Collection([], ToolbarItem)
    ], ResponseToolbarSettings.prototype, "items", void 0);
    __decorate$2([
        Event()
    ], ResponseToolbarSettings.prototype, "itemClicked", void 0);
    return ResponseToolbarSettings;
}(ChildProperty));
/**
 * Represents a toolbar item model in the AIAssistview component.
 */
var FooterToolbarSettings = /** @class */ (function (_super) {
    __extends$2(FooterToolbarSettings, _super);
    function FooterToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('Inline')
    ], FooterToolbarSettings.prototype, "toolbarPosition", void 0);
    __decorate$2([
        Collection([], ToolbarItem)
    ], FooterToolbarSettings.prototype, "items", void 0);
    __decorate$2([
        Event()
    ], FooterToolbarSettings.prototype, "itemClick", void 0);
    return FooterToolbarSettings;
}(ChildProperty));
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
    __extends$2(AIAssistView, _super);
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
                template: isSttToolbarItem && isNullOrUndefined(customItem.template) ? '<button class="e-assistview-speech-to-text e-tbar-btn"></button>' : customItem.template,
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
        if (!isNullOrUndefined(this.speechToTextObj)) {
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
            if (!isNullOrUndefined(promptText) || (attachedFiles && attachedFiles.length > 0)) {
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
        if (!isNullOrUndefined(newTemplate)) {
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
        if (!isNullOrUndefined(newAttachment.allowedFileTypes)) {
            this.uploaderObj.allowedExtensions = newAttachment.allowedFileTypes;
        }
        if (!isNullOrUndefined(newAttachment.maxFileSize)) {
            this.uploaderObj.maxFileSize = newAttachment.maxFileSize;
        }
        this.uploaderObj.asyncSettings = {
            saveUrl: !isNullOrUndefined(newAttachment.saveUrl) ? newAttachment.saveUrl : this.uploaderObj.asyncSettings.saveUrl,
            removeUrl: !isNullOrUndefined(newAttachment.removeUrl) ? newAttachment.removeUrl : this.uploaderObj.asyncSettings.removeUrl
        };
    };
    AIAssistView.prototype.handleSTTDynamicChange = function (newProp, oldProp) {
        if (oldProp.enable !== newProp.enable) {
            this.updateFooterToolbar();
            this.updateSpeechToTextSettings(newProp);
        }
        if (isNullOrUndefined(this.speechToTextObj)) {
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
        if (!isNullOrUndefined(newProps.lang)) {
            this.speechToTextObj.lang = newProps.lang || 'en-US';
        }
        if (!isNullOrUndefined(newProps.disabled)) {
            this.speechToTextObj.disabled = newProps.disabled;
        }
        if (!isNullOrUndefined(newProps.buttonSettings)) {
            this.speechToTextObj.buttonSettings = newProps.buttonSettings;
        }
        if (!isNullOrUndefined(newProps.showTooltip)) {
            this.speechToTextObj.showTooltip = newProps.showTooltip;
        }
        if (!isNullOrUndefined(newProps.tooltipSettings)) {
            this.speechToTextObj.tooltipSettings = newProps.tooltipSettings;
        }
        if (!isNullOrUndefined(newProps.cssClass)) {
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
        if (!isNullOrUndefined(prompt) && prompt.trim().length > 0) {
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
                    isResponseHelpful: isNullOrUndefined(outputResponse.isResponseHelpful) ? null :
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
                    if (!isNullOrUndefined(this.toolbar)) {
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
                    if (!isNullOrUndefined(newProp.promptSuggestionItemTemplate)) {
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
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "prompt", void 0);
    __decorate$2([
        Property('Type prompt for assistance...')
    ], AIAssistView.prototype, "promptPlaceholder", void 0);
    __decorate$2([
        Collection([], Prompt)
    ], AIAssistView.prototype, "prompts", void 0);
    __decorate$2([
        Property([])
    ], AIAssistView.prototype, "promptSuggestions", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "promptSuggestionsHeader", void 0);
    __decorate$2([
        Property(true)
    ], AIAssistView.prototype, "showHeader", void 0);
    __decorate$2([
        Complex({ items: [] }, ToolbarSettings)
    ], AIAssistView.prototype, "toolbarSettings", void 0);
    __decorate$2([
        Property(0)
    ], AIAssistView.prototype, "activeView", void 0);
    __decorate$2([
        Property(null)
    ], AIAssistView.prototype, "promptIconCss", void 0);
    __decorate$2([
        Property(null)
    ], AIAssistView.prototype, "responseIconCss", void 0);
    __decorate$2([
        Property('100%')
    ], AIAssistView.prototype, "width", void 0);
    __decorate$2([
        Property('100%')
    ], AIAssistView.prototype, "height", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "cssClass", void 0);
    __decorate$2([
        Collection([], AssistView)
    ], AIAssistView.prototype, "views", void 0);
    __decorate$2([
        Complex({ width: null, items: [] }, PromptToolbarSettings)
    ], AIAssistView.prototype, "promptToolbarSettings", void 0);
    __decorate$2([
        Complex({ width: null, items: [] }, ResponseToolbarSettings)
    ], AIAssistView.prototype, "responseToolbarSettings", void 0);
    __decorate$2([
        Complex({ toolbarPosition: 'Inline', items: [] }, FooterToolbarSettings)
    ], AIAssistView.prototype, "footerToolbarSettings", void 0);
    __decorate$2([
        Complex({ enable: false }, SpeechToTextSettings)
    ], AIAssistView.prototype, "speechToTextSettings", void 0);
    __decorate$2([
        Property(false)
    ], AIAssistView.prototype, "enableAttachments", void 0);
    __decorate$2([
        Complex({ saveUrl: '', removeUrl: '', maxFileSize: 2000000, allowedFileTypes: '', maximumCount: 10 }, AttachmentSettings)
    ], AIAssistView.prototype, "attachmentSettings", void 0);
    __decorate$2([
        Property(false)
    ], AIAssistView.prototype, "showClearButton", void 0);
    __decorate$2([
        Property(true)
    ], AIAssistView.prototype, "enableScrollToBottom", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "footerTemplate", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "promptItemTemplate", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "responseItemTemplate", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "promptSuggestionItemTemplate", void 0);
    __decorate$2([
        Property('')
    ], AIAssistView.prototype, "bannerTemplate", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "promptRequest", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "promptChanged", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "stopRespondingClick", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "beforeAttachmentUpload", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "attachmentUploadSuccess", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "attachmentUploadFailure", void 0);
    __decorate$2([
        Event()
    ], AIAssistView.prototype, "attachmentRemoved", void 0);
    AIAssistView = __decorate$2([
        NotifyPropertyChanges
    ], AIAssistView);
    return AIAssistView;
}(AIAssistBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MessageStatus = /** @class */ (function (_super) {
    __extends$3(MessageStatus, _super);
    function MessageStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('')
    ], MessageStatus.prototype, "iconCss", void 0);
    __decorate$3([
        Property('')
    ], MessageStatus.prototype, "text", void 0);
    __decorate$3([
        Property('')
    ], MessageStatus.prototype, "tooltip", void 0);
    return MessageStatus;
}(ChildProperty));
/**
 * Represents a user model for a messages in the chatUI component.
 */
var User = /** @class */ (function (_super) {
    __extends$3(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('')
    ], User.prototype, "id", void 0);
    __decorate$3([
        Property('Default')
    ], User.prototype, "user", void 0);
    __decorate$3([
        Property('')
    ], User.prototype, "avatarUrl", void 0);
    __decorate$3([
        Property('')
    ], User.prototype, "avatarBgColor", void 0);
    __decorate$3([
        Property('')
    ], User.prototype, "cssClass", void 0);
    __decorate$3([
        Property('')
    ], User.prototype, "statusIconCss", void 0);
    return User;
}(ChildProperty));
/**
 * Configures the toolbar displayed on each message in the Chat UI component.
 */
var MessageToolbarSettings = /** @class */ (function (_super) {
    __extends$3(MessageToolbarSettings, _super);
    function MessageToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('100%')
    ], MessageToolbarSettings.prototype, "width", void 0);
    __decorate$3([
        Collection([], ToolbarItem)
    ], MessageToolbarSettings.prototype, "items", void 0);
    __decorate$3([
        Event()
    ], MessageToolbarSettings.prototype, "itemClicked", void 0);
    return MessageToolbarSettings;
}(ChildProperty));
/**
 *  Represents a model for a reply messages in the chatUI component.
 */
var MessageReply = /** @class */ (function (_super) {
    __extends$3(MessageReply, _super);
    function MessageReply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Complex({}, User)
    ], MessageReply.prototype, "user", void 0);
    __decorate$3([
        Property('')
    ], MessageReply.prototype, "text", void 0);
    __decorate$3([
        Property([])
    ], MessageReply.prototype, "mentionUsers", void 0);
    __decorate$3([
        Property('')
    ], MessageReply.prototype, "messageID", void 0);
    __decorate$3([
        Property('')
    ], MessageReply.prototype, "timestamp", void 0);
    __decorate$3([
        Property('')
    ], MessageReply.prototype, "timestampFormat", void 0);
    __decorate$3([
        Property(null)
    ], MessageReply.prototype, "attachedFile", void 0);
    return MessageReply;
}(ChildProperty));
/**
 *  Represents a model for a messages in the chatUI component.
 */
var Message = /** @class */ (function (_super) {
    __extends$3(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('')
    ], Message.prototype, "id", void 0);
    __decorate$3([
        Property('')
    ], Message.prototype, "text", void 0);
    __decorate$3([
        Complex({}, User)
    ], Message.prototype, "author", void 0);
    __decorate$3([
        Property('')
    ], Message.prototype, "timeStamp", void 0);
    __decorate$3([
        Property('')
    ], Message.prototype, "timeStampFormat", void 0);
    __decorate$3([
        Complex({}, MessageStatus)
    ], Message.prototype, "status", void 0);
    __decorate$3([
        Property(false)
    ], Message.prototype, "isPinned", void 0);
    __decorate$3([
        Complex({}, MessageReply)
    ], Message.prototype, "replyTo", void 0);
    __decorate$3([
        Property(false)
    ], Message.prototype, "isForwarded", void 0);
    __decorate$3([
        Property(null)
    ], Message.prototype, "attachedFile", void 0);
    __decorate$3([
        Property([])
    ], Message.prototype, "mentionUsers", void 0);
    return Message;
}(ChildProperty));
var FileAttachmentSettings = /** @class */ (function (_super) {
    __extends$3(FileAttachmentSettings, _super);
    function FileAttachmentSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('')
    ], FileAttachmentSettings.prototype, "saveUrl", void 0);
    __decorate$3([
        Property('')
    ], FileAttachmentSettings.prototype, "removeUrl", void 0);
    __decorate$3([
        Property('')
    ], FileAttachmentSettings.prototype, "path", void 0);
    __decorate$3([
        Property(Blob)
    ], FileAttachmentSettings.prototype, "saveFormat", void 0);
    __decorate$3([
        Property('')
    ], FileAttachmentSettings.prototype, "allowedFileTypes", void 0);
    __decorate$3([
        Property(30000000)
    ], FileAttachmentSettings.prototype, "maxFileSize", void 0);
    __decorate$3([
        Property(true)
    ], FileAttachmentSettings.prototype, "enableDragAndDrop", void 0);
    __decorate$3([
        Property(10)
    ], FileAttachmentSettings.prototype, "maximumCount", void 0);
    __decorate$3([
        Property('')
    ], FileAttachmentSettings.prototype, "previewTemplate", void 0);
    __decorate$3([
        Property('')
    ], FileAttachmentSettings.prototype, "attachmentTemplate", void 0);
    __decorate$3([
        Event()
    ], FileAttachmentSettings.prototype, "attachmentClick", void 0);
    return FileAttachmentSettings;
}(ChildProperty));
var ChatUI = /** @class */ (function (_super) {
    __extends$3(ChatUI, _super);
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function ChatUI(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.multiplier = 3;
        _this.uploadedFiles = [];
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    ChatUI.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    ChatUI.prototype.getDirective = function () {
        return 'EJS-CHATUI';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    ChatUI.prototype.getModuleName = function () {
        return 'chat-ui';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    ChatUI.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    ChatUI.prototype.render = function () {
        this.renderChatUIView();
    };
    ChatUI.prototype.renderChatUIView = function () {
        this.intl = new Internationalization();
        this.setDimension(this.element, this.width, this.height);
        this.renderViewSections(this.element, 'e-chat-header', 'e-chat-content');
        this.viewWrapper = this.element.querySelector('.e-chat-content');
        this.chatHeader = this.element.querySelector('.e-chat-header');
        this.initializeLocale();
        this.renderChatHeader();
        this.renderChatContentElement();
        this.renderChatSuggestionsElement();
        this.renderChatFooterContent();
        this.addCssClass(this.element, this.cssClass);
        this.addRtlClass(this.element, this.enableRtl);
        this.updateHeader(this.showHeader, this.chatHeader, this.viewWrapper);
        this.updateEmptyChatTemplate();
        this.updateFooterElementClass();
        this.wireEvents();
        this.renderTypingIndicator();
        this.updateScrollPosition(false, 0);
        this.initializeCompactMode();
    };
    ChatUI.prototype.initializeLocale = function () {
        this.l10n = new L10n('chat-ui', {
            oneUserTyping: '{0} is typing',
            twoUserTyping: '{0} and {1} are typing',
            threeUserTyping: '{0}, {1}, and {2} other are typing',
            multipleUsersTyping: '{0}, {1}, and {2} others are typing',
            noRecordsTemplate: 'No records found',
            forwarded: 'Forwarded',
            send: 'Send',
            attachments: 'Attach File',
            close: 'Close',
            download: 'Download',
            filePreview: 'No Preview Available',
            fileCountFailure: 'Upload limit reached: Maximum {0} files allowed. Remove extra files to proceed uploading',
            fileSizeFailure: 'Upload failed: {0} files exceeded the maximum size',
            unpin: 'Unpin',
            viewChat: 'View in Chat'
        }, this.locale);
        this.l10n.setLocale(this.locale);
    };
    ChatUI.prototype.updateScrollPosition = function (isMethodCall, timeDelay) {
        var _this = this;
        if (this.isReact || this.isAngular) {
            setTimeout(function () {
                if (isMethodCall) {
                    _this.handleAutoScroll();
                }
                else {
                    _this.scrollToBottom();
                }
            }, timeDelay);
        }
        else {
            this.scrollToBottom();
        }
    };
    ChatUI.prototype.renderChatHeader = function () {
        if (this.headerText) {
            var headerContainer = this.createElement('div', { className: 'e-header' });
            if (this.headerIconCss) {
                var iconElement = this.createElement('span', { className: "e-header-icon e-icons " + this.headerIconCss });
                if (this.user.statusIconCss) {
                    iconElement.appendChild(this.chatStatus(this.user.statusIconCss));
                }
                headerContainer.appendChild(iconElement);
            }
            var headerTextElement = this.createElement('div', { className: 'e-header-text' });
            headerTextElement.innerHTML = this.headerText;
            headerContainer.appendChild(headerTextElement);
            this.chatHeader.appendChild(headerContainer);
            this.renderChatHeaderToolbar(headerContainer);
        }
    };
    ChatUI.prototype.renderChatHeaderToolbar = function (headerContainer) {
        var _this = this;
        if (!isNullOrUndefined(this.headerToolbar) && this.headerToolbar.items.length > 0) {
            var toolbarEle = this.createElement('div', { className: 'e-chat-toolbar' });
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var pushToolbar = this.headerToolbar.items.map(function (item) { return ({
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
            this.toolbar = new Toolbar({
                items: pushToolbar,
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
                    if (_this.headerToolbar.itemClicked) {
                        _this.headerToolbar.itemClicked.call(_this, eventArgs);
                    }
                }
            });
            if (this.isReact) {
                this.toolbar.isReact = this.isReact;
                this.toolbar.on('render-react-toolbar-template', this.addReactToolbarPortals, this);
            }
            this.toolbar.appendTo(toolbarEle);
            headerContainer.appendChild(toolbarEle);
        }
    };
    ChatUI.prototype.addReactToolbarPortals = function (args) {
        if (this.isReact && args) {
            this.portals = this.portals.concat(args);
        }
    };
    ChatUI.prototype.updateHeaderToolbar = function () {
        var headerContainer = this.chatHeader.querySelector('.e-header');
        if (!isNullOrUndefined(this.toolbar)) {
            var pushToolbar = this.headerToolbar.items.map(function (item) { return ({
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
            this.toolbar.items = pushToolbar;
        }
        else {
            this.renderChatHeaderToolbar(headerContainer);
        }
    };
    ChatUI.prototype.renderChatContentElement = function () {
        this.messageWrapper = this.createElement('div', { className: 'e-message-wrapper', attrs: { 'tabindex': '0' } });
        this.pinnedMessageWrapper = this.createElement('div', { className: 'e-pinned-message-wrapper' });
        this.renderPinnedMessage();
        this.viewWrapper.prepend(this.pinnedMessageWrapper, this.messageWrapper);
        this.content = this.createElement('div', { className: 'e-typing-suggestions' });
        this.viewWrapper.append(this.content);
        this.renderScrollDown();
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    };
    ChatUI.prototype.updateEmptyChatTemplate = function () {
        if (isNullOrUndefined(this.messages) || this.messages.length <= 0) {
            this.renderBannerView(this.emptyChatTemplate, this.messageWrapper, 'emptyChatTemplate');
            this.isEmptyChatTemplateRendered = isNullOrUndefined(this.messageWrapper.querySelector('.e-empty-chat-template')) ? false : true;
            if (this.pinnedMessageWrapper) {
                this.pinnedMessageWrapper.style.display = 'none';
            }
        }
    };
    ChatUI.prototype.renderChatMessageToolbar = function (messageItem, msg) {
        var _this = this;
        var messageOptionsToolbar = this.createElement('div', { className: 'e-chat-message-toolbar' });
        var pushToolbar = [];
        if (this.messageToolbarSettings.items.length > 0) {
            var items = this.messageToolbarSettings.items.filter(function (item) {
                var isCopyIcon = item.iconCss.includes('e-chat-copy');
                var hasFileAttachment = _this.hasAttachment(msg) && !(_this.isImageFile(msg.attachedFile.rawFile));
                if (isCopyIcon && hasFileAttachment) {
                    return false;
                }
                return (item.iconCss !== '' ||
                    item.text !== undefined ||
                    item.type !== 'Button' ||
                    item.align !== 'Left' ||
                    item.visible !== true ||
                    item.disabled !== false ||
                    item.tooltip !== '' ||
                    item.cssClass !== '' ||
                    item.template !== null ||
                    item.tabIndex !== -1);
            });
            pushToolbar = items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: _this.messageToolbarSettings.width,
                tabIndex: item.tabIndex
            }); });
        }
        var messageToolbar = new Toolbar({
            items: pushToolbar,
            clicked: function (args) {
                _this.handleMessageToolbarClick(args, messageToolbar, messageItem);
            }
        });
        messageToolbar.appendTo(messageOptionsToolbar);
        this.updatePinnedMessage(msg, messageToolbar);
        return messageOptionsToolbar;
    };
    ChatUI.prototype.handleMessageToolbarClick = function (args, messageToolbar, messageItem) {
        var messageID = messageItem.id;
        var message = this.messages.find(function (msg) { return msg.id === messageID; });
        var eventArgs = {
            item: args.item,
            event: args.originalEvent,
            cancel: false,
            message: message
        };
        if (this.messageToolbarSettings.itemClicked) {
            this.messageToolbarSettings.itemClicked.call(this, eventArgs);
        }
        if (!eventArgs.cancel) {
            switch (args.item.prefixIcon) {
                case 'e-icons e-chat-copy':
                    this.handleCopyAction(args, messageToolbar, message);
                    break;
                case 'e-icons e-chat-reply':
                    this.handleReplyAction(message);
                    break;
                case 'e-icons e-chat-trash':
                    this.handleDeleteAction(messageID);
                    break;
                case 'e-icons e-chat-pin':
                case 'e-icons e-chat-unpin':
                    this.togglePin(message, args, messageToolbar);
                    break;
            }
        }
    };
    ChatUI.prototype.togglePin = function (message, args, messageToolbar) {
        var pinnedText = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text');
        var currentlyPinnedId = pinnedText.getAttribute('data-index');
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (message.isPinned) {
            message.isPinned = false;
        }
        else {
            if (currentlyPinnedId && currentlyPinnedId !== message.id) {
                this.unpinMessage(currentlyPinnedId);
            }
            message.isPinned = true;
        }
        this.isProtectedOnChange = prevOnChange;
        args.item.prefixIcon = message.isPinned ? 'e-icons e-chat-unpin' : 'e-icons e-chat-pin';
        args.item.tooltipText = message.isPinned ? 'Unpin' : 'Pin';
        messageToolbar.dataBind();
        this.updatePinnedMessage(message, messageToolbar);
    };
    ChatUI.prototype.handleDeleteAction = function (messageID) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var messageToDelete = this.messages.find(function (msg) { return msg.id === messageID; });
        if (messageToDelete && messageToDelete.isPinned) {
            this.unpinMessage(messageID);
        }
        this.messages = this.messages.filter(function (msg) { return msg.id !== messageID; });
        this.isProtectedOnChange = prevOnChange;
        var messageItem = this.messageWrapper.querySelector("#" + messageID);
        if (!messageItem) {
            return;
        }
        var messageGroup = messageItem.closest('.e-message-group');
        if (!messageGroup) {
            return;
        }
        messageGroup.removeChild(messageItem);
        if (messageGroup.querySelector('.e-message-item') === null) {
            this.messageWrapper.removeChild(messageGroup);
        }
        this.cleanupTimeBreaks();
        this.updateEmptyChatTemplate();
    };
    ChatUI.prototype.cleanupTimeBreaks = function () {
        var _this = this;
        var timeBreaks = Array.from(this.messageWrapper.querySelectorAll('.e-timebreak'));
        var consecutiveBreaks = [];
        timeBreaks.forEach(function (timeBreak, index) {
            var nextElement = timeBreak.nextElementSibling;
            // Check if the current time break is the last element or if it's consecutive
            if ((!nextElement || !nextElement.classList.contains('e-timebreak')) && index === timeBreaks.length - 1) {
                _this.messageWrapper.removeChild(timeBreak);
            }
            else if (!nextElement || !nextElement.classList.contains('e-timebreak')) {
                if (consecutiveBreaks.length > 0) {
                    consecutiveBreaks.forEach(function (breakElem) {
                        _this.messageWrapper.removeChild(breakElem);
                    });
                }
                consecutiveBreaks = [];
            }
            else {
                consecutiveBreaks.push(timeBreak);
            }
        });
    };
    ChatUI.prototype.handleCopyAction = function (args, messageToolbar, msg) {
        if (msg.text) {
            this.getClipBoardContent(this.getMessageText(msg));
        }
        if (this.hasAttachment(msg)) {
            var file = msg.attachedFile.rawFile;
            this.writeFileToClipboard(file);
        }
        // Provide feedback to user
        args.item.prefixIcon = 'e-icons e-chat-check';
        messageToolbar.dataBind();
        setTimeout(function () {
            args.item.prefixIcon = 'e-icons e-chat-copy';
            messageToolbar.dataBind();
        }, 1000);
    };
    ChatUI.prototype.handleReplyAction = function (message) {
        var replyWrapper = this.footer.querySelector('.e-reply-wrapper');
        if (!replyWrapper) {
            replyWrapper = this.renderReplyElement(message, true);
            this.footer.prepend(replyWrapper);
        }
        else {
            var userElement = replyWrapper.querySelector('.e-reply-message-user');
            var timeElement = replyWrapper.querySelector('.e-reply-message-time');
            var textElement = replyWrapper.querySelector('.e-reply-message-text');
            if (userElement && textElement) {
                userElement.textContent = message.author.user;
                timeElement.textContent = this.showTimeStamp ? this.getFormattedTime(message.timeStamp, message.timeStampFormat) : '';
                textElement.innerHTML = this.getMessageText(message);
            }
            var previewContainer = replyWrapper.querySelector('.e-reply-media-preview');
            if (previewContainer) {
                previewContainer.remove();
            }
            if (this.hasAttachment(message)) {
                var file = message.attachedFile;
                if (file) {
                    var newReplyContent = this.createFileReplyContent(message);
                    var replyContent = replyWrapper.querySelector('.e-reply-content');
                    if (replyContent) {
                        if (textElement) {
                            replyContent.insertBefore(newReplyContent, textElement);
                        }
                    }
                }
            }
        }
        if (this.editableTextarea) {
            this.setFocusAtEnd(this.editableTextarea);
        }
        this.currentReplyTo = message;
    };
    ChatUI.prototype.renderReplyElement = function (message, withClearIcon) {
        var _this = this;
        if (withClearIcon === void 0) { withClearIcon = false; }
        if ((!message.replyTo || !message.replyTo.user || (!message.replyTo.text && !message.replyTo.attachedFile)
            || !message.replyTo.messageID) && !withClearIcon) {
            return null;
        }
        var replyWrapper = this.createElement('div', { className: 'e-reply-wrapper' });
        var time;
        var timeStampFormat;
        if (withClearIcon) {
            time = message.timeStamp ? message.timeStamp : new Date();
            timeStampFormat = message.timeStampFormat ? message.timeStampFormat : this.timeStampFormat;
        }
        else {
            time = message.replyTo.timestamp ? message.replyTo.timestamp : new Date();
            timeStampFormat = message.replyTo.timestampFormat ? message.replyTo.timestampFormat : this.timeStampFormat;
        }
        var formattedTime = this.getFormattedTime(time, timeStampFormat);
        var replyContent = this.createElement('div', {
            className: 'e-reply-content',
            innerHTML: "<span class='e-reply-message-text'>" + (withClearIcon ? this.getMessageText(message) : this.getMessageText(message.replyTo)) + "</span>"
        });
        var messageDetails = this.createElement('div', {
            className: 'e-reply-message-details',
            innerHTML: "\n                <span class='e-reply-message-user'>" + (withClearIcon ? message.author.user : message.replyTo.user.user) + "</span>\n                <span class='e-reply-message-time'>" + (this.showTimeStamp ? formattedTime : '') + "</span>"
        });
        if (this.hasAttachment(message.replyTo) || this.hasAttachment(message)) {
            var file = withClearIcon ? (this.hasAttachment(message) ? message.attachedFile : null)
                : (this.hasAttachment(message.replyTo) ? message.replyTo.attachedFile : null);
            var sourceMessage = withClearIcon ? message : message.replyTo;
            if (file) {
                var fileReplyContent = this.createFileReplyContent(sourceMessage);
                var textElement = replyContent.querySelector('.e-reply-message-text');
                if (textElement) {
                    replyContent.insertBefore(fileReplyContent, textElement);
                }
            }
        }
        replyContent.prepend(messageDetails);
        if (withClearIcon) {
            var clearIcon = this.createElement('span', {
                className: 'e-chat-close e-icons',
                attrs: { title: this.l10n.getConstant('close') }
            });
            EventHandler.add(clearIcon, 'click', this.clearReplyWrapper.bind(this));
            messageDetails.appendChild(clearIcon);
        }
        else {
            EventHandler.add(replyWrapper, 'click', function () { _this.scrollToMessage(message.replyTo.messageID); }, this);
        }
        replyWrapper.prepend(replyContent);
        return replyWrapper;
    };
    ChatUI.prototype.createFileReplyContent = function (message) {
        var fileReplyContent = this.createElement('div', { className: 'e-reply-media-preview' });
        var messageText = this.getMessageText(message);
        var hasText = messageText.trim() !== '';
        var file = message.attachedFile;
        if (this.isImageFile(file.rawFile)) {
            var thumbnailImage = this.createImageContent(file, 'e-reply-media-thumb');
            fileReplyContent.appendChild(thumbnailImage);
        }
        else if (this.isVideoFile(file.rawFile)) {
            var thumbnailvideo = this.createElement('video', {
                attrs: {
                    src: file.fileSource,
                    alt: file.name,
                    disablepictureinpicture: 'true',
                    playsinline: 'true'
                },
                className: 'e-reply-media-thumb'
            });
            fileReplyContent.appendChild(thumbnailvideo);
        }
        else {
            var fileIcon = this.createElement('span', { className: 'e-chat-file-icon e-icons' });
            fileReplyContent.appendChild(fileIcon);
        }
        if (!hasText) {
            var labelElement = this.createElement('span', {
                className: 'e-reply-file-name',
                innerHTML: file.name,
                attrs: { title: file.name }
            });
            fileReplyContent.appendChild(labelElement);
        }
        return fileReplyContent;
    };
    ChatUI.prototype.renderPinnedMessage = function () {
        var _this = this;
        var pinnedMessage = this.createElement('div', { className: 'e-pinned-message' });
        var pinIcon = this.createElement('span', { className: 'e-icons e-chat-pin' });
        var messageText = this.createElement('span', { className: 'e-pinned-message-text' });
        var pinDropdownButtonEle = this.createElement('button', { id: 'pinnedMessageDropdown' });
        this.dropDownButton = new DropDownButton({
            items: [
                { text: this.l10n.getConstant('viewChat'), iconCss: 'e-icons e-chat-view' },
                { text: this.l10n.getConstant('unpin'), iconCss: 'e-icons e-chat-unpin' }
            ],
            cssClass: 'e-pinned-dropdown-popup e-caret-hide',
            iconCss: 'e-icons e-more-vertical-1',
            select: function (args) {
                var messageId = _this.pinnedMessageWrapper.querySelector('.e-pinned-message-text').getAttribute('data-index');
                if (args.item.text === _this.l10n.getConstant('viewChat')) {
                    _this.scrollToMessage(messageId);
                }
                else if (args.item.text === _this.l10n.getConstant('unpin')) {
                    _this.unpinMessage(messageId);
                }
            }
        });
        this.dropDownButton.appendTo(pinDropdownButtonEle);
        pinnedMessage.append(pinIcon, messageText);
        this.pinnedMessageWrapper.append(pinnedMessage, pinDropdownButtonEle);
    };
    ChatUI.prototype.updatePinnedMessage = function (message, messageToolbar) {
        var pinnedText = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text');
        var currentlyPinnedId = pinnedText.getAttribute('data-index');
        if (message.isPinned) {
            if (currentlyPinnedId && currentlyPinnedId !== message.id) {
                var previousMessage = this.messages.find(function (msg) { return msg.id === currentlyPinnedId; });
                if (previousMessage) {
                    previousMessage.isPinned = false;
                }
            }
            this.togglePinnedIcon(messageToolbar);
            if (pinnedText) {
                if (this.hasAttachment(message)) {
                    pinnedText.innerHTML = '';
                    this.pinAttachmentMessage(pinnedText, message);
                }
                else {
                    pinnedText.innerHTML = this.getMessageText(message);
                }
                pinnedText.setAttribute('data-index', message.id);
            }
            this.pinnedMessageWrapper.style.display = 'flex';
            this.lastPinnedToolbar = messageToolbar;
        }
        else if (currentlyPinnedId === message.id) {
            this.pinnedMessageWrapper.style.display = 'none';
            this.togglePinnedIcon();
        }
    };
    ChatUI.prototype.pinAttachmentMessage = function (container, message) {
        var file = message.attachedFile;
        if (!file) {
            return;
        }
        var mediaElement;
        if (this.isImageFile(file.rawFile)) {
            mediaElement = this.createImageContent(file, 'e-pinned-img-thumb');
        }
        else if (this.isVideoFile(file.rawFile)) {
            mediaElement = this.createElement('video', {
                attrs: {
                    src: file.fileSource,
                    alt: file.name,
                    disablepictureinpicture: 'true',
                    playsinline: 'true'
                },
                className: 'e-pinned-img-thumb'
            });
        }
        else {
            mediaElement = this.createElement('span', { className: 'e-chat-file-icon e-icons' });
        }
        var messageText = this.getMessageText(message);
        var hasText = messageText.trim() !== '';
        var labelAttrs = {};
        if (!hasText) {
            labelAttrs.title = file.name;
        }
        var pinContent = this.createElement('span', {
            className: hasText ? 'e-pinned-message-content' : 'e-pinned-file-name',
            innerHTML: hasText ? messageText : file.name,
            attrs: labelAttrs
        });
        this.appendChildren(container, mediaElement, pinContent);
    };
    ChatUI.prototype.togglePinnedIcon = function (messageToolbar) {
        if (this.lastPinnedToolbar) {
            this.lastPinnedToolbar.items.forEach(function (item) {
                if (item.prefixIcon === 'e-icons e-chat-unpin') {
                    item.prefixIcon = 'e-icons e-chat-pin';
                    item.tooltipText = 'Pin';
                }
            });
            this.lastPinnedToolbar.dataBind();
        }
        if (messageToolbar) {
            messageToolbar.items.forEach(function (item) {
                if (item.prefixIcon === 'e-icons e-chat-pin') {
                    item.prefixIcon = 'e-icons e-chat-unpin';
                    item.tooltipText = 'Unpin';
                }
            });
            messageToolbar.dataBind();
            this.lastPinnedToolbar = messageToolbar;
        }
        else {
            this.lastPinnedToolbar = null;
        }
    };
    ChatUI.prototype.unpinMessage = function (messageID) {
        this.pinnedMessageWrapper.style.display = 'none';
        this.togglePinnedIcon();
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var message = this.messages.find(function (msg) { return msg.id === messageID; });
        if (message) {
            message.isPinned = false;
        }
        this.isProtectedOnChange = prevOnChange;
    };
    ChatUI.prototype.wireMessageToolbarEvents = function (messageItem, toolbarEle) {
        var _this = this;
        EventHandler.add(messageItem, 'mouseover', function () { _this.handleMessageMouseEvents(true, messageItem, toolbarEle); }, this);
        EventHandler.add(messageItem, 'mouseleave', function () { _this.handleMessageMouseEvents(false, messageItem, toolbarEle); }, this);
    };
    ChatUI.prototype.handleMessageMouseEvents = function (isMouseOver, messageItem, toolbarEle) {
        if (isMouseOver) {
            var isLeftMessage = messageItem.parentElement.classList.contains('e-left');
            toolbarEle.style.visibility = 'hidden';
            toolbarEle.style.display = 'block';
            var toolbarRect = toolbarEle.getBoundingClientRect();
            toolbarEle.style.visibility = '';
            toolbarEle.style.display = 'none';
            var messageContent = this.messageTemplate
                ? messageItem
                : isLeftMessage
                    ? messageItem.querySelector('.e-message-content')
                    : messageItem.querySelector('.e-status-wrapper');
            var messageItemRect = messageItem.getBoundingClientRect();
            var messageContentRect = messageContent.getBoundingClientRect();
            var topPosition = messageContentRect.top - messageItemRect.top - toolbarRect.height;
            if (!isLeftMessage) {
                topPosition += 4; // margin top
            }
            var messageWrapperRect = this.messageWrapper.getBoundingClientRect();
            if (messageContentRect.top - messageWrapperRect.top < toolbarRect.height) {
                topPosition = messageContentRect.bottom - messageItemRect.top;
            }
            toolbarEle.style.top = topPosition + "px";
            if (messageContentRect.width < toolbarRect.width && isLeftMessage) {
                toolbarEle.style.left = '0';
                toolbarEle.style.right = 'auto';
            }
            else {
                var statusIconElement = messageContent.querySelector('.e-status-icon');
                var statusIconWidth = statusIconElement ? statusIconElement.getBoundingClientRect().width + 2 : 0;
                var rightPosition = messageItemRect.right - messageContentRect.right + statusIconWidth;
                toolbarEle.style.right = rightPosition + "px";
            }
            toolbarEle.style.display = '';
            toolbarEle.classList.add('e-show');
        }
        else {
            toolbarEle.classList.remove('e-show');
        }
    };
    ChatUI.prototype.setChatMsgId = function () {
        var _this = this;
        if (this.messages && this.messages.length > 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages = this.messages.map(function (msg, index) {
                return __assign$1({}, msg, { id: msg.id || _this.element.id + "-message-" + (index + 1) });
            });
            this.isProtectedOnChange = prevOnChange;
        }
    };
    ChatUI.prototype.renderScrollDown = function () {
        var scrollDownButton = this.createElement('button', { id: 'scrollDownButton' });
        this.downArrowIcon = new Fab({
            iconCss: 'e-icons e-chat-scroll-down',
            position: 'BottomRight',
            target: this.content,
            isPrimary: false
        });
        this.downArrowIcon.appendTo(scrollDownButton);
    };
    ChatUI.prototype.loadBatch = function () {
        for (var i = this.startIndex - 1; i >= 0; i--) {
            var currIndex = i; // To pass the actual index of the reversed item.
            var prevIndex = i === this.messages.length - 1 ? -1 : currIndex + 1;
            this.updateMessageTimeFormats(this.messages[parseInt(i.toString(), 10)], currIndex);
            var currentMessageDate = this.getMessageDate(currIndex);
            currentMessageDate.setHours(0, 0, 0, 0);
            if (Math.min(currIndex, prevIndex) >= 0) {
                var lastMessageDate = this.getMessageDate(prevIndex);
                lastMessageDate.setHours(0, 0, 0, 0);
                if (currentMessageDate.getTime() === lastMessageDate.getTime()) {
                    var prevTimeBreak = this.messageWrapper.querySelectorAll('.e-timebreak')[0];
                    if (prevTimeBreak) {
                        prevTimeBreak.remove();
                    }
                }
            }
            this.renderGroup(this.messageWrapper, this.messages[parseInt(i.toString(), 10)], true, currIndex, prevIndex);
            if (this.showTimeBreak) {
                this.messageWrapper.prepend(this.createTimebreakElement(currentMessageDate));
            }
            var viewportHeight = window.innerHeight;
            var loadHeight = viewportHeight * this.multiplier;
            this.startIndex = i;
            if (this.messageWrapper.scrollHeight > loadHeight) {
                break;
            }
        }
    };
    ChatUI.prototype.renderMessageGroup = function (chatContentWrapper) {
        var _this = this;
        if (this.loadOnDemand) {
            if (this.messages && this.messages.length <= 0) {
                return;
            }
            createSpinner({ target: this.messageWrapper });
            this.startIndex = this.messages.length;
            this.loadBatch();
        }
        else {
            this.messages.forEach(function (msg, i) {
                _this.renderGroup(chatContentWrapper, msg, false, i, i - 1);
            });
        }
    };
    ChatUI.prototype.isTimeBreakAdded = function (chatContentWrapper, loadOldChat) {
        return loadOldChat ?
            chatContentWrapper.firstElementChild.classList.contains('e-timebreak') :
            chatContentWrapper.lastElementChild.classList.contains('e-timebreak');
    };
    ChatUI.prototype.getLastUser = function (prevIndex) {
        if (prevIndex >= 0) {
            return this.messages[parseInt(prevIndex.toString(), 10)].author.id;
        }
        return '';
    };
    ChatUI.prototype.initializeCompactMode = function () {
        this.element.classList.toggle('e-compact-mode', this.enableCompactMode);
    };
    ChatUI.prototype.renderGroup = function (chatContentWrapper, msg, loadOldChat, index, prevIndex) {
        var messageGroup;
        if (!loadOldChat) {
            this.updateMessageTimeFormats(msg, index);
            this.handleTimeBreak(prevIndex, index, loadOldChat);
        }
        if (!this.enableCompactMode && msg.author.id === this.user.id) {
            var hasTimeBreak = this.showTimeBreak && this.isTimeBreakAdded(chatContentWrapper, loadOldChat);
            if ((msg.author.id !== this.getLastUser(prevIndex)) || hasTimeBreak) {
                messageGroup = this.createElement('div', { className: "e-message-group e-right " + (this.messageTemplate ? 'e-message-item-template' : '') });
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
            else {
                var length_1 = this.element.querySelectorAll('.e-message-group.e-right').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-right')[loadOldChat ? 0 : length_1 - 1];
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
        }
        else {
            if (this.getLastUser(prevIndex) !== msg.author.id || this.isTimeVaries(index, prevIndex)) {
                messageGroup = this.createElement('div', { className: "e-message-group e-left " + (this.messageTemplate ? 'e-message-item-template' : '') });
                var avatarElement = this.createAvatarIcon(msg.author, false);
                if (!this.messageTemplate) {
                    messageGroup.prepend(avatarElement);
                }
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                if (this.loadOnDemand) {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
                else {
                    this.createLeftGroupItems(messageGroup, msg);
                    this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
                }
            }
            else {
                var length_2 = this.element.querySelectorAll('.e-message-group.e-left').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-left')[loadOldChat ? 0 : length_2 - 1];
                if (!loadOldChat) {
                    this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
                }
                else {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
            }
        }
    };
    ChatUI.prototype.isTimeVaries = function (index, prevIndex) {
        var currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        var lastMessageDate = this.getMessageDate(prevIndex);
        lastMessageDate.setHours(0, 0, 0, 0);
        return currentMessageDate.getTime() !== lastMessageDate.getTime();
    };
    ChatUI.prototype.loadLeftGroupOnDemand = function (msg, loadOldChat, index, messageGroup) {
        // To check if the previous author is the same as the current author. If not, create a group header.
        var isAnyMsgPresent = this.messages[parseInt((index - 1).toString(), 10)] ? true : false;
        var prevAuthorId = isAnyMsgPresent ? this.messages[parseInt((index - 1).toString(), 10)].author.id : '';
        var shouldCreateHeader = prevAuthorId !== msg.author.id ? true : false;
        if (shouldCreateHeader || this.isTimeVaries(index, index - 1)) {
            this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
            this.createLeftGroupItems(messageGroup, msg);
        }
        else {
            this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
        }
    };
    ChatUI.prototype.createLeftGroupItems = function (messageGroup, msg) {
        if (this.messageTemplate) {
            return;
        }
        var userHeaderContainer = this.createElement('div', {
            className: 'e-message-header-container'
        });
        var userHeader = this.createElement('div', {
            className: 'e-message-header'
        });
        userHeader.innerHTML = msg.author.user;
        var timeSpan = this.getTimeStampElement(msg.timeStamp
            ? msg.timeStamp
            : new Date(), msg.timeStampFormat ? msg.timeStampFormat : this.timeStampFormat);
        this.appendChildren(userHeaderContainer, userHeader, timeSpan);
        this.insertBeforeChildren(messageGroup, userHeaderContainer);
    };
    ChatUI.prototype.getInitials = function (name) {
        var nameParts = name.split(' ');
        var initials = nameParts.length > 1
            ? "" + nameParts[0][0] + nameParts[nameParts.length - 1][0]
            : name[0];
        return initials;
    };
    ChatUI.prototype.createAvatarIcon = function (author, isTypingUser) {
        var userName = author.user.trim();
        var initials = this.getInitials(userName);
        var iconClassName = !isTypingUser ? 'e-message-icon' : 'e-user-icon';
        var avatarIcon;
        if (iconClassName === 'e-message-icon') {
            avatarIcon = this.createElement('span', { className: " " + 'e-message-icon' + " " + author.cssClass });
            if (!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') {
                var imgElement = this.createElement('img', {
                    attrs: { src: author.avatarUrl, alt: 'Avatar' }
                });
                avatarIcon.appendChild(imgElement);
            }
        }
        else {
            avatarIcon = this.createElement((!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') ? 'img' : 'span', { className: " " + 'e-user-icon' + " " + author.cssClass });
        }
        if (author.avatarBgColor) {
            avatarIcon.style.backgroundColor = author.avatarBgColor;
        }
        if (!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') {
            avatarIcon.src = author.avatarUrl;
            avatarIcon.alt = userName;
        }
        else {
            avatarIcon.innerHTML = initials;
        }
        if (author.statusIconCss && !isTypingUser) {
            avatarIcon.appendChild(this.chatStatus(author.statusIconCss));
        }
        return avatarIcon;
    };
    ChatUI.prototype.chatStatus = function (statusIconCss) {
        var statusTitle;
        // Determine the title based on the statusIconCss
        if (statusIconCss.includes('e-user-online')) {
            statusTitle = 'Available';
        }
        else if (statusIconCss.includes('e-user-away')) {
            statusTitle = 'Away';
        }
        else if (statusIconCss.includes('e-user-busy')) {
            statusTitle = 'Busy';
        }
        else if (statusIconCss.includes('e-user-offline')) {
            statusTitle = 'Offline';
        }
        return this.createElement('span', { className: "e-user-status-icon " + statusIconCss,
            attrs: {
                'title': statusTitle
            }
        });
    };
    ChatUI.prototype.getTimeStampElement = function (timeStamp, timeStampFormat) {
        var formattedTime = this.getFormattedTime(timeStamp, timeStampFormat);
        return this.createElement('div', {
            className: 'e-time',
            innerHTML: this.showTimeStamp ? formattedTime : ''
        });
    };
    ChatUI.prototype.updateTimeFormats = function (timeStampFormat, fullTime, index) {
        if (this.messages[parseInt(index.toString(), 10)]) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages[parseInt(index.toString(), 10)].timeStamp = this.intl.parseDate(fullTime, { format: 'dd/MM/yyyy hh:mm a' });
            this.messages[parseInt(index.toString(), 10)].timeStampFormat = timeStampFormat;
            this.isProtectedOnChange = prevOnChange;
        }
    };
    ChatUI.prototype.getFormattedTime = function (timeStamp, timeStampFormat) {
        timeStamp = typeof timeStamp === 'string' ? new Date(timeStamp) : timeStamp;
        return this.intl.formatDate(timeStamp, { format: this.getFormat(timeStampFormat) });
    };
    ChatUI.prototype.getFormat = function (timeStampFormat) {
        var hasValue = !isNullOrUndefined(timeStampFormat) && timeStampFormat.length > 0;
        return hasValue ? timeStampFormat
            : (!isNullOrUndefined(this.timeStampFormat) && this.timeStampFormat.length) ? this.timeStampFormat : 'dd/MM/yyyy hh:mm a';
    };
    ChatUI.prototype.renderForwardElement = function (msg, textElement) {
        if (msg.isForwarded) {
            var forwardedIndicator = this.createElement('div', {
                className: 'e-forwarded-indicator'
            });
            var forwardedMessage = this.createElement('div', {
                className: 'e-forward-message',
                innerHTML: this.l10n.getConstant('forwarded')
            });
            var forwardIcon = this.createElement('span', { className: 'e-icons e-chat-forward' });
            this.appendChildren(forwardedIndicator, forwardIcon, forwardedMessage);
            textElement.prepend(forwardedIndicator);
        }
    };
    ChatUI.prototype.getMessageText = function (msg) {
        var mentionedUsers = msg.mentionUsers;
        if (!isNullOrUndefined(mentionedUsers) && mentionedUsers.length > 0) {
            // Regular expression to find placeholders like {0}, {10}, {-1}
            var placeholderRegex = /\{(-?\d+)\}/g;
            var messageText = msg.text;
            var match = void 0;
            // Find all placeholders in the text
            var placeholders = [];
            // eslint-disable-next-line no-cond-assign
            while ((match = placeholderRegex.exec(messageText)) !== null) {
                placeholders.push({
                    fullMatch: match[0],
                    index: parseInt(match[1], 10)
                });
            }
            // Replace placeholders with user names if the index exists in mentionedUsers
            for (var _i = 0, placeholders_1 = placeholders; _i < placeholders_1.length; _i++) {
                var placeholder = placeholders_1[_i];
                var userIndex = placeholder.index;
                // Check if there's a user at this index in the array
                if (userIndex < mentionedUsers.length || (mentionedUsers.length + userIndex) < mentionedUsers.length) {
                    var user = mentionedUsers[parseInt(userIndex.toString(), 10)];
                    if (user) {
                        messageText = messageText.replace(placeholder.fullMatch, this.getMentionChipElement(user));
                    }
                }
            }
            return SanitizeHtmlHelper.sanitize(messageText);
        }
        return SanitizeHtmlHelper.sanitize(msg.text);
    };
    ChatUI.prototype.getMentionChipElement = function (user) {
        var mentionChip = this.createElement('span', { className: 'e-mention-chip' });
        var mentionDisplayEle = this.createElement('span', { className: 'e-chat-mention-user-chip', innerHTML: user.user });
        mentionDisplayEle.setAttribute('data-user-id', user.id);
        mentionChip.append(mentionDisplayEle);
        return mentionChip.outerHTML;
    };
    ChatUI.prototype.addGroupItems = function (msg, messageGroup, isUserTimeStampRendered, showStatus, index, loadOldChat) {
        var messageItem = this.createElement('div', { className: 'e-message-item', id: "" + msg.id });
        var messageStatusWrapper = this.createElement('div', { className: 'e-status-wrapper' });
        var timeSpan = this.getTimeStampElement(msg.timeStamp ? msg.timeStamp : new Date(), msg.timeStampFormat ? msg.timeStampFormat : this.timeStampFormat);
        var messageContent = this.createElement('div', { className: 'e-message-content' });
        var textElement = this.createElement('div', {
            className: 'e-text',
            innerHTML: this.getMessageText(msg)
        });
        if (this.hasAttachment(msg)) {
            var fileElement = this.createAttachmentContent(msg);
            messageContent.appendChild(fileElement);
        }
        if (!isNullOrUndefined(textElement) && textElement.innerHTML !== '') {
            messageContent.appendChild(textElement);
        }
        this.updateForwardAndReplyElement(msg, messageContent);
        if (this.messageTemplate) {
            this.getContextObject('messageTemplate', messageItem, index, msg);
        }
        else {
            if (!isUserTimeStampRendered) {
                messageItem.appendChild(timeSpan);
            }
            if (showStatus) {
                var messageElement = this.createElement('div', { className: 'e-status-item' });
                var statusIcon = this.createElement('span', { attrs: { class: "e-status-icon " + (msg.status ? msg.status.iconCss : ''), title: "" + (msg.status ? msg.status.tooltip : '') } });
                var statusText = this.createElement('div', { innerHTML: msg.status ? msg.status.text : '', className: 'e-status-text' });
                this.appendChildren(messageElement, messageContent, statusIcon);
                this.appendChildren(messageStatusWrapper, messageElement, statusText);
                messageItem.appendChild(messageStatusWrapper);
            }
            else {
                messageItem.appendChild(messageContent);
            }
        }
        this.manageChatContent(loadOldChat, messageGroup, messageItem);
        var toolbarEle = this.renderChatMessageToolbar(messageItem, msg);
        this.wireMessageToolbarEvents(messageItem, toolbarEle);
        messageItem.prepend(toolbarEle);
    };
    ChatUI.prototype.createAttachmentContent = function (msg) {
        var _this = this;
        var fileElement = this.createElement('div', {
            className: 'e-attached-file'
        });
        var file = msg.attachedFile;
        var wrapper;
        if (this.isImageFile(file.rawFile)) {
            wrapper = this.createElement('div', {
                className: 'e-image-wrapper'
            });
            wrapper.appendChild(this.createImageContent(file, 'e-image'));
            fileElement.appendChild(wrapper);
        }
        else if (this.isVideoFile(file.rawFile)) {
            wrapper = this.createVideoContent(file);
            fileElement.appendChild(wrapper);
        }
        else {
            wrapper = this.createFileItem(msg.attachedFile, false);
            fileElement.appendChild(wrapper);
        }
        EventHandler.add(fileElement, 'click', function () { return _this.handleAttachmentPreview(file, true); });
        return fileElement;
    };
    ChatUI.prototype.createVideoContent = function (file) {
        var videoWrapper = this.createElement('div', {
            className: 'e-video-wrapper'
        });
        var videoElement = this.createElement('video', {
            attrs: {
                disablepictureinpicture: 'true',
                playsinline: 'true',
                preload: 'metadata',
                title: file.name
            },
            className: 'e-video'
        });
        var source = this.createElement('source', {
            attrs: {
                src: file.fileSource,
                type: file.rawFile.type
            }
        });
        videoElement.appendChild(source);
        var playIconWrapper = this.createElement('div', {
            className: 'e-play-icon-wrapper'
        });
        var playButton = this.createElement('span', {
            className: 'e-chat-video-play e-icons',
            attrs: {
                role: 'button',
                tabindex: '0',
                'aria-label': 'Play video',
                title: 'Play'
            }
        });
        playIconWrapper.appendChild(playButton);
        videoWrapper.appendChild(videoElement);
        videoWrapper.appendChild(playIconWrapper);
        return videoWrapper;
    };
    ChatUI.prototype.updateForwardAndReplyElement = function (msg, messageContent) {
        if (!msg.isForwarded) {
            var replyElement = this.renderReplyElement(msg, false);
            if (replyElement) {
                messageContent.prepend(replyElement);
            }
        }
        else {
            this.renderForwardElement(msg, messageContent);
        }
    };
    ChatUI.prototype.manageChatContent = function (loadOldChat, parentItem, ChildItem) {
        if (loadOldChat) {
            parentItem.prepend(ChildItem);
        }
        else {
            parentItem.appendChild(ChildItem);
        }
    };
    ChatUI.prototype.createTimebreakElement = function (date) {
        var timebreakDiv = this.createElement('div', { className: "e-timebreak " + (this.timeBreakTemplate ? 'e-timebreak-template' : '') });
        var formattedTime = this.getFormattedTime(date, 'MMMM d, yyyy');
        if (this.timeBreakTemplate) {
            this.getContextObject('timeBreakTemplate', timebreakDiv, null, null, date);
        }
        else {
            var timeStampEle = this.createElement('span', { className: 'e-timestamp' });
            timeStampEle.innerHTML = formattedTime;
            timebreakDiv.appendChild(timeStampEle);
        }
        return timebreakDiv;
    };
    ChatUI.prototype.handleTimeBreak = function (lastMsgIndex, index, loadOldChat) {
        if (!this.showTimeBreak) {
            return;
        }
        var currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        if (lastMsgIndex === -1) {
            this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
        }
        else if (index > 0) {
            var lastMessageDate = this.getMessageDate(lastMsgIndex);
            lastMessageDate.setHours(0, 0, 0, 0);
            if ((currentMessageDate.getTime() !== lastMessageDate.getTime()) && !loadOldChat) {
                this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
            }
        }
    };
    ChatUI.prototype.renderNewMessage = function (msg, index) {
        if (this.isEmptyChatTemplateRendered) {
            var introContainer = this.messageWrapper.querySelector('.e-empty-chat-template');
            this.messageWrapper.removeChild(introContainer);
            this.isEmptyChatTemplateRendered = false;
        }
        this.renderGroup(this.messageWrapper, msg, false, index, index - 1);
    };
    ChatUI.prototype.loadMoreMessages = function () {
        var _this = this;
        if (this.startIndex <= 0) {
            return;
        }
        var currentScrollOffset = this.messageWrapper.scrollHeight - this.messageWrapper.scrollTop;
        showSpinner(this.messageWrapper);
        setTimeout(function () {
            hideSpinner(_this.messageWrapper);
            _this.loadBatch();
            _this.messageWrapper.scrollTop = _this.messageWrapper.scrollHeight - currentScrollOffset;
        }, 1000);
    };
    ChatUI.prototype.updateMessageTimeFormats = function (msg, index) {
        var fullTime = this.getFormattedTime(msg.timeStamp
            ? msg.timeStamp
            : new Date(), 'dd/MM/yyyy hh:mm a');
        this.updateTimeFormats(msg.timeStampFormat, fullTime, index);
    };
    ChatUI.prototype.getMessageDate = function (index) {
        return new Date(this.messages[parseInt(index.toString(), 10)].timeStamp);
    };
    ChatUI.prototype.renderChatSuggestionsElement = function () {
        if (!isNullOrUndefined(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
    };
    ChatUI.prototype.handleSuggestionUpdate = function () {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!isNullOrUndefined(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
        this.toggleScrollIcon();
    };
    ChatUI.prototype.onSuggestionClick = function (e) {
        this.suggestionsElement.hidden = true;
        this.editableTextarea.innerText = e.target.innerText;
        this.onSendIconClick(e);
    };
    ChatUI.prototype.renderChatFooterContent = function () {
        this.getFooter();
        var footerClass = "e-footer " + (this.footerTemplate ? 'e-footer-template' : '');
        this.footer.className = footerClass;
        this.renderChatFooter();
        this.viewWrapper.append(this.footer);
        this.updateFooter(this.showFooter, this.footer);
    };
    ChatUI.prototype.renderChatFooter = function () {
        this.renderFooterContent(this.footerTemplate, '', this.placeholder, false, 'e-chat-textarea');
        var sendIconClass = 'e-chat-send e-icons disabled';
        if (!this.footerTemplate) {
            this.renderFooterIcons(sendIconClass, false, '');
            var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                this.sendIcon.setAttribute('title', this.l10n.getConstant('send'));
                this.updateAttachmentElement(footerIconsWrapper);
            }
            this.refreshTextareaUI();
            this.pushToUndoStack(this.editableTextarea.innerText);
            this.updateMentionObj();
        }
    };
    ChatUI.prototype.getMentionDataSource = function (mentionUsers) {
        var _this = this;
        var dataSource = mentionUsers.map(function (user) {
            var name = user.user.trim();
            var initials = _this.getInitials(name);
            return {
                id: user.id,
                user: name,
                avatarUrl: user.avatarUrl || '',
                avatarBgColor: user.avatarBgColor || '',
                cssClass: user.cssClass || '',
                statusIconCss: user.statusIconCss || '',
                initials: initials
            };
        });
        return dataSource;
    };
    ChatUI.prototype.initializeMention = function () {
        // Map UserModel to format expected by Mention component
        var dataSource = this.getMentionDataSource(this.mentionUsers);
        var cssClass = 'e-chat-mention';
        if (this.enableRtl) {
            cssClass += ' e-rtl';
        }
        if (dataSource.length > 0) {
            // Initialize Mention component
            this.mentionObj = new Mention({
                dataSource: dataSource,
                cssClass: cssClass,
                requireLeadingSpace: false,
                suffixText: '&nbsp;',
                noRecordsTemplate: this.l10n.getConstant('noRecordsTemplate'),
                fields: { text: 'user', value: 'id' },
                popupWidth: '250px',
                popupHeight: '200px',
                allowSpaces: true,
                mentionChar: this.mentionTriggerChar,
                displayTemplate: '<span class="e-chat-mention-user-chip" data-user-id="${id}">${user}</span>',
                itemTemplate: '<div class="e-chat-mention-item-template"><span class="e-chat-mention-user-icon ${cssClass}" style="background-color: ${avatarBgColor};">${if(avatarUrl)} <img src="${avatarUrl}" alt="${user}" class="em-img" /> ${else}${initials}${/if} </span><div class="e-chat-mention-user-name">${user}</div></div>',
                select: this.onMentionSelect.bind(this)
            }, this.editableTextarea);
        }
    };
    // Add method to handle mention selection
    ChatUI.prototype.onMentionSelect = function (args) {
        var eventArgs = {
            cancel: false,
            event: args.e,
            isInteracted: args.isInteracted,
            itemData: args.itemData
        };
        this.trigger('mentionSelect', eventArgs);
        args.cancel = eventArgs.cancel;
        this.activateSendIcon(this.editableTextarea.innerText.length);
    };
    ChatUI.prototype.hasAttachment = function (message) {
        return message.attachedFile !== undefined && message.attachedFile !== null;
    };
    ChatUI.prototype.isImageFile = function (file) {
        if (!file) {
            return false;
        }
        return file.type && typeof file.type === 'string' && file.type.startsWith('image/');
    };
    ChatUI.prototype.isVideoFile = function (file) {
        if (!file) {
            return false;
        }
        return file.type && typeof file.type === 'string' && file.type.startsWith('video/');
    };
    ChatUI.prototype.updateAttachmentElement = function (footerIconsWrapper) {
        if (this.enableAttachments) {
            this.renderAttachmentIcon(footerIconsWrapper);
        }
        else {
            if (this.uploaderObj) {
                this.uploaderObj.destroy();
                EventHandler.remove(this.attachmentIcon, 'keydown', this.triggerUploaderAction);
                this.attachmentIcon.innerHTML = '';
                this.dropArea.innerHTML = '';
                this.attachmentIcon.remove();
                remove(this.dropArea);
            }
            this.removeFilesPreview();
        }
    };
    ChatUI.prototype.renderAttachmentIcon = function (footerIconsWrapper) {
        var _this = this;
        this.dropArea = this.createElement('div', { attrs: { class: 'e-chat-drop-area' } });
        this.footer.prepend(this.dropArea);
        this.attachmentIcon = this.createElement('span', { attrs: { class: 'e-chat-attachment-icon e-icons', role: 'button', 'aria-label': 'Attach files', tabindex: '0', title: this.l10n.getConstant('attachments') } });
        var uploaderElement = this.createElement('input', { attrs: { class: 'e-chat-file-upload', type: 'file', name: 'UploadFiles', id: 'fileUpload' } });
        var dropAreaTarget;
        if (this.attachmentSettings.enableDragAndDrop) {
            dropAreaTarget = this.footer;
        }
        this.uploaderObj = new Uploader({
            asyncSettings: {
                saveUrl: this.attachmentSettings.saveUrl,
                removeUrl: this.attachmentSettings.removeUrl
            },
            maxFileSize: this.attachmentSettings.maxFileSize,
            allowedExtensions: this.attachmentSettings.allowedFileTypes,
            success: this.onUploadSuccess.bind(this),
            failure: this.onUploadFailure.bind(this),
            uploading: this.onUploadStart.bind(this),
            progress: this.onUploadProgress.bind(this),
            multiple: true,
            dropArea: dropAreaTarget,
            selected: function (args) {
                if (args.filesData.some(function (file) { return file.status === _this.uploaderObj.l10n.getConstant('invalidFileType'); })) {
                    args.cancel = true;
                    return;
                }
                var totalSelected = args.filesData.length + _this.uploadedFiles.length;
                if (totalSelected > _this.attachmentSettings.maximumCount) {
                    args.cancel = true;
                    _this.showFailureAlert('fileCountFailure', _this.attachmentSettings.maximumCount, 'e-count-failure');
                    uploaderElement.value = '';
                    return;
                }
                var oversized = args.filesData.filter(function (file) {
                    return file.status === _this.uploaderObj.l10n.getConstant('invalidMaxFileSize') && file.statusCode === '0';
                });
                if (oversized.length) {
                    _this.showFailureAlert('fileSizeFailure', oversized.length, 'e-size-failure');
                    uploaderElement.value = '';
                }
                _this.handleFileSelection(args);
            }
        });
        this.attachmentIcon.appendChild(uploaderElement);
        this.uploaderObj.appendTo(uploaderElement);
        this.attachmentIcon.addEventListener('click', function () { return uploaderElement.click(); });
        footerIconsWrapper.prepend(this.attachmentIcon);
        EventHandler.add(this.attachmentIcon, 'keydown', this.triggerUploaderAction, this);
    };
    ChatUI.prototype.triggerUploaderAction = function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var uploaderElement = this.footer.querySelector('.e-chat-file-upload');
            if (uploaderElement) {
                uploaderElement.click();
            }
        }
    };
    ChatUI.prototype.showFailureAlert = function (localeConstantKey, fileCount, failureType) {
        var failureMessage = this.l10n.getConstant(localeConstantKey).replace('{0}', fileCount.toString());
        if (fileCount === 1) {
            failureMessage = failureMessage.replace('files', 'file');
        }
        this.createFailureAlert(failureMessage, failureType);
    };
    ChatUI.prototype.createFailureAlert = function (failureMessage, failureType) {
        var _this = this;
        var failureAlert = this.renderFailureAlert(this.viewWrapper, failureMessage, failureType, 'e-chat-circle-close', 'e-chat-close');
        if (this.viewWrapper.contains(this.footer)) {
            this.viewWrapper.insertBefore(failureAlert, this.footer);
        }
        failureAlert.classList.add('e-show');
        setTimeout(function () {
            _this.handleFailureAlertRemove(_this.viewWrapper, failureAlert);
        }, 3000);
    };
    ChatUI.prototype.handleFileSelection = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, fileData, file, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = args.filesData;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        fileData = _a[_i];
                        file = fileData.rawFile;
                        if (!this.attachmentSettings.path) return [3 /*break*/, 2];
                        fileData.fileSource = this.attachmentSettings.path + "/" + fileData.name;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.attachmentSettings.saveFormat === 'Base64')) return [3 /*break*/, 4];
                        _b = fileData;
                        return [4 /*yield*/, this.readFileAsBase64(file)];
                    case 3:
                        _b.fileSource = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        fileData.fileSource = URL.createObjectURL(file);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.element.querySelector('#fileUpload').value = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatUI.prototype.readFileAsBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    ChatUI.prototype.onUploadStart = function (args) {
        this.trigger('beforeAttachmentUpload', args);
        this.uploadedFiles.push(args.fileData);
        var fileItem = this.createFileItem(args.fileData, true);
        this.dropArea.appendChild(fileItem);
    };
    ChatUI.prototype.onUploadProgress = function (args) {
        var uploadProgress = args.e.loaded / args.e.total * 100;
        var progressFill = this.element.querySelector("#e-chat-progress-" + CSS.escape(args.file.name));
        if (progressFill) {
            progressFill.style.width = uploadProgress + "%";
        }
    };
    ChatUI.prototype.onUploadSuccess = function (args) {
        if (args.operation === 'upload') {
            this.trigger('attachmentUploadSuccess', args);
            var progressFill = this.element.querySelector("#e-chat-progress-" + CSS.escape(args.file.name));
            if (progressFill) {
                progressFill.style.width = '100%';
                this.cleanupFileItem(args.file.name);
            }
            var progressBar = this.element.querySelector('.e-chat-progress-fill');
            if (!progressBar) {
                this.activateSendIcon(1);
            }
        }
        else if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
    };
    ChatUI.prototype.cleanupFileItem = function (fileName) {
        var fileItem = this.element.querySelector("#e-chat-progress-" + CSS.escape(fileName));
        if (fileItem) {
            fileItem.parentElement.remove();
        }
    };
    ChatUI.prototype.onUploadFailure = function (args) {
        if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
        else {
            this.trigger('attachmentUploadFailure', args);
            this.uploaderObj.remove(args.file);
            this.uploadedFiles = this.uploadedFiles.filter(function (file) { return file.name !== args.file.name; });
            var progressFill = this.footer.querySelector("#e-chat-progress-" + CSS.escape(args.file.name));
            if (progressFill) {
                progressFill.style.width = '100%';
                progressFill.classList.add('e-chat-upload-failed');
            }
        }
    };
    ChatUI.prototype.createFileItem = function (fileData, isForFooter) {
        var _this = this;
        var fileItem = this.createElement('div', { className: isForFooter ? 'e-chat-uploaded-file-item' : 'e-file-wrapper' });
        if (this.attachmentSettings.attachmentTemplate && isForFooter) {
            var introContainer = this.createElement('div', { className: 'e-attachment-template' });
            fileItem.appendChild(introContainer);
            this.getContextObject('attachmenttemplate', introContainer, null, null, null, fileData);
        }
        else {
            var fileIcon = this.createElement('div', { className: 'e-icons e-chat-file-icon' });
            var fileDetails = this.createElement('div', { className: 'e-chat-file-details' });
            var fileName = this.createElement('span', { className: 'e-chat-file-name', innerHTML: fileData.name });
            var fileSize = this.createElement('span', { className: 'e-chat-file-size', innerHTML: (fileData.size / 1024).toFixed(2) + " KB" });
            fileDetails.append(fileName, fileSize);
            fileItem.append(fileIcon, fileDetails);
        }
        if (isForFooter) {
            var closeButton_1 = this.createElement('span', { attrs: { class: 'e-icons e-chat-close', role: 'button', 'aria-label': 'Clear file', tabindex: '-1' } });
            EventHandler.add(closeButton_1, 'click', function () { return _this.handleRemoveUploadedFile(closeButton_1, fileData, fileItem); });
            fileItem.append(closeButton_1);
            var progressBar = this.createElement('div', { className: 'e-chat-progress-bar' });
            var progressFill = this.createElement('div', { id: "e-chat-progress-" + fileData.name, className: 'e-chat-progress-fill' });
            progressBar.appendChild(progressFill);
            fileItem.append(progressBar);
            EventHandler.add(fileItem, 'click', function (event) {
                if (closeButton_1 && (event.target === closeButton_1 || event.target.classList.contains('e-chat-close'))) {
                    return;
                }
                _this.handleAttachmentPreview(fileData, false);
            });
        }
        return fileItem;
    };
    ChatUI.prototype.handleRemoveUploadedFile = function (closeButton, fileData, fileItem) {
        this.uploaderObj.remove(fileData);
        this.uploadedFiles = this.uploadedFiles.filter(function (file) { return file.name !== fileData.name; });
        EventHandler.remove(closeButton, 'click', this.handleRemoveUploadedFile);
        fileItem.remove();
        var textLength = this.editableTextarea.innerText.length;
        var totalLength = textLength + this.uploadedFiles.length;
        this.activateSendIcon(totalLength);
    };
    ChatUI.prototype.handleAttachmentPreview = function (file, isAfterPreview) {
        var eventArgs = { cancel: false };
        if (this.attachmentSettings.attachmentClick) {
            this.attachmentSettings.attachmentClick.call(this, eventArgs);
        }
        else if (!eventArgs.cancel) {
            this.showMediaPreview(file, isAfterPreview);
        }
    };
    ChatUI.prototype.getFilePreview = function (file) {
        var sizeInKB = file.size / 1024;
        var sizeDisplay = sizeInKB < 1024 ? sizeInKB.toFixed(2) + " KB" : (sizeInKB / 1024).toFixed(2) + " MB";
        var filePreview = this.createElement('div', {
            className: 'e-file-preview'
        });
        var fileIcon = this.createElement('span', {
            className: 'e-icons e-file-document'
        });
        var previewText = this.createElement('div', {
            className: 'e-preview-file-text',
            innerHTML: this.l10n.getConstant('filePreview')
        });
        var filedetails = this.createElement('div', {
            className: 'e-file-details',
            innerHTML: '' + file.type + ' - ' + sizeDisplay
        });
        this.appendChildren(filePreview, fileIcon, previewText, filedetails);
        return filePreview;
    };
    ChatUI.prototype.removeFilesPreview = function () {
        var previewWrapper = this.messageWrapper.querySelector('.e-preview-overlay');
        if (previewWrapper) {
            previewWrapper.remove();
        }
    };
    ChatUI.prototype.renderPreviewTemplate = function (selectedFile, isAfterPreview) {
        var introContainer = this.createElement('div', { className: 'e-preview-template' });
        var fileIndex;
        if (isAfterPreview) {
            fileIndex = this.messages.findIndex(function (msg) { return msg.attachedFile === selectedFile; });
        }
        else {
            fileIndex = Array.isArray(this.uploadedFiles) && selectedFile ?
                this.uploadedFiles.findIndex(function (fileData) { return fileData.id === selectedFile.id; }) : -1;
        }
        this.getContextObject('previewtemplate', introContainer, fileIndex, null, null, selectedFile);
        return introContainer;
    };
    ChatUI.prototype.showMediaPreview = function (file, isAfterPreview) {
        var previewOverlay = this.createElement('div', {
            className: 'e-preview-overlay',
            attrs: {
                tabindex: '0'
            }
        });
        var previewHeader = this.createElement('div', {
            className: 'e-preview-header'
        });
        var closeButton = this.createElement('span', {
            className: 'e-chat-back-icon e-icons',
            attrs: {
                title: this.l10n.getConstant('close')
            }
        });
        previewHeader.appendChild(closeButton);
        var fileNameLabel = this.createElement('span', {
            className: 'e-preview-file-name',
            innerHTML: file.name
        });
        previewHeader.appendChild(fileNameLabel);
        if (isAfterPreview) {
            var downloadButton = this.createElement('a', {
                className: 'e-chat-download e-icons',
                attrs: {
                    href: file.fileSource,
                    download: file.name,
                    target: '_blank',
                    title: this.l10n.getConstant('download')
                }
            });
            previewHeader.appendChild(downloadButton);
        }
        var previewContent;
        if (this.attachmentSettings.previewTemplate) {
            previewContent = this.renderPreviewTemplate(file, isAfterPreview);
        }
        else {
            if (this.isImageFile(file.rawFile)) {
                previewContent = this.createImageContent(file, 'e-image-preview');
            }
            else if (this.isVideoFile(file.rawFile)) {
                previewContent = this.createElement('video', {
                    attrs: {
                        autoplay: 'true',
                        muted: 'true',
                        controls: 'true',
                        controlsList: 'nodownload noplaybackrate',
                        disablepictureinpicture: 'true',
                        preload: 'metadata',
                        title: file.name
                    },
                    className: 'e-video-preview'
                });
                var source = this.createElement('source', {
                    attrs: {
                        src: file.fileSource,
                        type: file.rawFile.type
                    }
                });
                previewContent.appendChild(source);
            }
            else {
                previewContent = this.getFilePreview(file);
            }
        }
        this.appendChildren(previewOverlay, previewHeader, previewContent);
        this.messageWrapper.appendChild(previewOverlay);
        previewOverlay.focus();
        var escKeyHandler = function (event) {
            if (event.key === 'Escape') {
                closePreview();
            }
        };
        var overlayClickHandler = function (event) {
            if (event.currentTarget === event.target) {
                closePreview();
            }
        };
        var closeClickHandler = function () {
            closePreview();
        };
        var closePreview = function () {
            EventHandler.remove(previewOverlay, 'keydown', escKeyHandler);
            EventHandler.remove(previewOverlay, 'click', overlayClickHandler);
            EventHandler.remove(closeButton, 'click', closeClickHandler);
            previewOverlay.remove();
        };
        EventHandler.add(previewOverlay, 'keydown', escKeyHandler);
        EventHandler.add(previewOverlay, 'click', overlayClickHandler);
        EventHandler.add(closeButton, 'click', closeClickHandler);
    };
    ChatUI.prototype.createImageContent = function (file, imageClass) {
        var imageElement = this.createElement('img', {
            attrs: {
                src: file.fileSource,
                alt: file.name
            },
            className: imageClass
        });
        return imageElement;
    };
    ChatUI.prototype.updateAttachmentSettings = function (newAttachment) {
        this.removeFilesPreview();
        this.uploaderObj.allowedExtensions = !isNullOrUndefined(newAttachment.allowedFileTypes) ? newAttachment.allowedFileTypes
            : this.attachmentSettings.allowedFileTypes;
        this.uploaderObj.maxFileSize = !isNullOrUndefined(newAttachment.maxFileSize) ? newAttachment.maxFileSize : this.attachmentSettings.maxFileSize;
        this.uploaderObj.asyncSettings = {
            saveUrl: !isNullOrUndefined(newAttachment.saveUrl) ? newAttachment.saveUrl : this.attachmentSettings.saveUrl,
            removeUrl: !isNullOrUndefined(newAttachment.removeUrl) ? newAttachment.removeUrl : this.attachmentSettings.removeUrl
        };
        if (!isNullOrUndefined(newAttachment.path)) {
            this.attachmentSettings.path = newAttachment.path;
        }
        if (!isNullOrUndefined(newAttachment.enableDragAndDrop)) {
            this.attachmentSettings.enableDragAndDrop = newAttachment.enableDragAndDrop;
        }
        this.uploaderObj.dropArea = this.attachmentSettings.enableDragAndDrop ? this.footer : '';
        if (!isNullOrUndefined(newAttachment.saveFormat)) {
            if (newAttachment.saveFormat === 'Base64' || newAttachment.saveFormat === 'Blob') {
                this.attachmentSettings.saveFormat = newAttachment.saveFormat;
            }
        }
        if (!isNullOrUndefined(newAttachment.maximumCount)) {
            this.attachmentSettings.maximumCount = newAttachment.maximumCount;
        }
    };
    ChatUI.prototype.clearUploadedFiles = function () {
        this.uploadedFiles = [];
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
        }
        this.refreshTextareaUI();
    };
    ChatUI.prototype.refreshTextareaUI = function () {
        var textLength = this.editableTextarea.innerText.length;
        var previewCount = this.uploadedFiles && this.uploadedFiles.length ? this.uploadedFiles.length : 0;
        var totalContent = textLength + previewCount;
        this.updateHiddenTextarea(this.editableTextarea.innerText);
        this.activateSendIcon(totalContent);
        this.updateFooterElementClass();
    };
    ChatUI.prototype.handleInput = function (event) {
        var textareaEle = event.target;
        var isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        var textContent = textareaEle.innerText;
        this.refreshTextareaUI();
        this.editableTextarea.focus();
        // Debounced push to undo stack
        this.scheduleUndoPush();
        this.redoStack = [];
        this.triggerUserTyping(event, textContent);
    };
    ChatUI.prototype.onFocusEditableTextarea = function () {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
    };
    ChatUI.prototype.onBlurEditableTextarea = function (e) {
        if (this.footer) {
            this.footer.classList.remove('e-footer-focused');
        }
        this.triggerUserTyping(e, e.target.innerText);
    };
    ChatUI.prototype.triggerUserTyping = function (event, value) {
        var eventArgs = {
            event: event,
            message: value,
            user: this.user,
            isTyping: event.type === 'blur' ? false : value.length > 0 ? true : false
        };
        this.trigger('userTyping', eventArgs);
    };
    ChatUI.prototype.renderTypingIndicator = function () {
        var _this = this;
        if (this.indicatorWrapper) {
            this.indicatorWrapper.remove();
        }
        if (!this.typingUsers || this.typingUsers.length === 0) {
            return;
        }
        this.indicatorWrapper = this.createElement('div', {
            className: "e-typing-indicator " + (this.typingUsersTemplate ? 'e-typing-indicator-template' : '')
        });
        if (this.typingUsersTemplate) {
            this.getContextObject('typingUsersTemplate', this.indicatorWrapper, null, null, null);
        }
        else {
            this.typingUsers.slice(0, 3).forEach(function (user) {
                var avatarElement = _this.createAvatarIcon(user, true);
                _this.indicatorWrapper.appendChild(avatarElement);
            });
            var typingMessage = this.createElement('span', { className: 'e-user-text' });
            this.indicatorWrapper.appendChild(typingMessage);
            this.updateUserText();
            var indicatorContainer = this.createElement('div', { className: 'e-indicator-wrapper' });
            for (var i = 0; i < 3; i++) {
                var indicator = this.createElement('span', {
                    className: 'e-indicator'
                });
                this.appendChildren(indicatorContainer, indicator);
            }
            this.indicatorWrapper.appendChild(indicatorContainer);
        }
        this.content.prepend(this.indicatorWrapper);
    };
    ChatUI.prototype.updateUserText = function () {
        var _this = this;
        if (this.typingUsersTemplate) {
            return;
        }
        var userNames = this.typingUsers.filter(function (user) { return user.user !== _this.user.user; })
            .map(function (user) { return user.user; });
        var displayText = this.getTypingMessage(userNames);
        var typingMessage = this.indicatorWrapper.querySelector('.e-user-text');
        typingMessage.innerHTML = displayText;
    };
    ChatUI.prototype.getTypingMessage = function (userNames) {
        if (userNames.length >= 3) {
            return this.l10n.getConstant(userNames.length > 3 ? 'multipleUsersTyping' : 'threeUserTyping')
                .replace('{0}', userNames[0].toString())
                .replace('{1}', userNames[1].toString())
                .replace('{2}', (userNames.length - 2).toString());
        }
        else {
            var userTemplate = this.l10n.getConstant(userNames.length === 2 ? 'twoUserTyping' : 'oneUserTyping');
            return userNames.length === 2
                ? userTemplate.replace('{0}', userNames[0].toString()).replace('{1}', userNames[1].toString())
                : userTemplate.replace('{0}', userNames[0].toString());
        }
    };
    ChatUI.prototype.updateTypingUsers = function (users) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.typingUsers = users;
        this.isProtectedOnChange = prevOnChange;
        this.renderTypingIndicator();
    };
    ChatUI.prototype.updateHeaderIcon = function () {
        var existingIconElement = this.element.querySelector('.e-header-icon');
        if (existingIconElement) {
            existingIconElement.className = "e-header-icon e-icons " + this.headerIconCss;
        }
        else {
            var headerContainer = this.element.querySelector('.e-header');
            if (headerContainer) {
                var iconElement = this.createElement('span', {
                    className: "e-header-icon e-icons " + this.headerIconCss
                });
                headerContainer.prepend(iconElement);
            }
        }
    };
    ChatUI.prototype.updateHeaderText = function () {
        if (this.headerText) {
            var headerTextEle = this.element.querySelector('.e-header-text');
            if (headerTextEle) {
                headerTextEle.innerHTML = this.headerText;
            }
        }
    };
    ChatUI.prototype.renderUpdatedMessage = function () {
        this.messageWrapper.innerHTML = '';
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
        this.updateEmptyChatTemplate();
    };
    ChatUI.prototype.getUserMentionFromContent = function () {
        var _this = this;
        var mentionChips = this.editableTextarea.querySelectorAll('.e-chat-mention-user-chip');
        var updatedMentionedUsers = [];
        mentionChips.forEach(function (chip) {
            var userId = chip.getAttribute('data-user-id');
            var mentionUser = _this.mentionUsers.find(function (user) { return user.id === userId; });
            if (mentionUser) {
                updatedMentionedUsers.push(mentionUser);
            }
            else {
                var mentionedUser = {
                    id: userId,
                    user: chip.textContent
                };
                updatedMentionedUsers.push(mentionedUser);
            }
        });
        return updatedMentionedUsers;
    };
    ChatUI.prototype.onSendIconClick = function (event) {
        var _this = this;
        if (this.editableTextarea && this.uploadedFiles.length === 0 && !this.editableTextarea.innerText.trim()) {
            return;
        }
        var repliedTO = this.currentReplyTo ? {
            user: this.currentReplyTo.author,
            text: this.currentReplyTo.text,
            timestamp: this.currentReplyTo.timeStamp,
            timestampFormat: this.currentReplyTo.timeStampFormat,
            messageID: this.currentReplyTo.id,
            mentionUsers: this.currentReplyTo.mentionUsers,
            attachedFile: this.currentReplyTo.attachedFile
        } : null;
        var messageText = this.replaceMentionChipsWithPlaceholders();
        var mentionUsers = this.getUserMentionFromContent();
        var prevOnChange = this.isProtectedOnChange;
        this.editableTextarea.innerText = '';
        this.clearReplyWrapper();
        this.refreshTextareaUI();
        this.pushToUndoStack(this.editableTextarea.innerText);
        this.triggerUserTyping(event, '');
        if (this.uploadedFiles && this.uploadedFiles.length > 0) {
            var filesCount_1 = this.uploadedFiles.length;
            this.uploadedFiles.forEach(function (file, index) {
                var newMessageObj = {
                    id: _this.element.id + "-message-" + (_this.messages.length + 1),
                    author: _this.user,
                    text: index === filesCount_1 - 1 ? messageText : '',
                    mentionUsers: index === filesCount_1 - 1 ? mentionUsers : [],
                    replyTo: index === filesCount_1 - 1 ? repliedTO : null,
                    attachedFile: file
                };
                var eventArgs = {
                    cancel: false,
                    message: newMessageObj
                };
                _this.trigger('messageSend', eventArgs, function (args) {
                    if (args.cancel) {
                        return;
                    }
                    newMessageObj = args.message;
                    _this.isProtectedOnChange = true;
                    _this.messages = _this.messages.concat([newMessageObj]);
                    _this.isProtectedOnChange = prevOnChange;
                    _this.renderNewMessage(newMessageObj, _this.messages.length - 1);
                });
            });
        }
        else {
            var newMessageObj_1 = {
                id: this.element.id + "-message-" + (this.messages.length + 1),
                author: this.user,
                text: messageText,
                mentionUsers: mentionUsers,
                replyTo: repliedTO,
                attachedFile: null
            };
            var eventArgs = {
                cancel: false,
                message: newMessageObj_1
            };
            this.trigger('messageSend', eventArgs, function (args) {
                if (args.cancel) {
                    return;
                }
                newMessageObj_1 = args.message;
                _this.isProtectedOnChange = true;
                _this.messages = _this.messages.concat([newMessageObj_1]);
                _this.isProtectedOnChange = prevOnChange;
                _this.renderNewMessage(newMessageObj_1, _this.messages.length - 1);
            });
        }
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = false;
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(false, 5);
        this.clearUploadedFiles();
    };
    ChatUI.prototype.replaceMentionChipsWithPlaceholders = function () {
        if (!this.editableTextarea.innerHTML) {
            return this.editableTextarea.innerHTML;
        }
        var tempEle = this.createElement('div');
        tempEle.innerHTML = this.editableTextarea.innerHTML;
        var mentionChips = tempEle.querySelectorAll('span.e-mention-chip');
        var mentionIndex = 0;
        mentionChips.forEach(function (chip) {
            var placeholder = document.createTextNode("{" + mentionIndex++ + "}");
            chip.replaceWith(placeholder);
        });
        return tempEle.innerHTML || '';
    };
    ChatUI.prototype.clearReplyWrapper = function () {
        var replyWrapper = this.footer.querySelector('.e-reply-wrapper');
        if (replyWrapper) {
            var clearIcon = replyWrapper.querySelector('.e-chat-close.e-icons');
            EventHandler.remove(clearIcon, 'click', this.clearReplyWrapper);
            this.footer.removeChild(replyWrapper);
            replyWrapper.remove();
        }
        this.currentReplyTo = null;
    };
    ChatUI.prototype.getContextObject = function (templateName, contentElement, index, message, currentMessagedate, file) {
        var template;
        var context = {};
        switch (templateName.toLowerCase()) {
            case 'messagetemplate': {
                template = this.messageTemplate;
                context = { message: message, index: index };
                break;
            }
            case 'timebreaktemplate': {
                template = this.timeBreakTemplate;
                context = { messageDate: currentMessagedate };
                break;
            }
            case 'typinguserstemplate': {
                template = this.typingUsersTemplate;
                context = { users: this.typingUsers };
                break;
            }
            case 'previewtemplate': {
                template = this.attachmentSettings.previewTemplate;
                context = { selectedFile: file, index: index };
                break;
            }
            case 'attachmenttemplate': {
                template = this.attachmentSettings.attachmentTemplate;
                context = { selectedFile: file };
                break;
            }
        }
        this.updateContent(template, contentElement, context, templateName);
    };
    ChatUI.prototype.handleAutoScroll = function () {
        if (this.isScrollAtBottom) {
            this.updateScroll(this.messageWrapper);
        }
        if (this.autoScrollToBottom) {
            this.updateScroll(this.messageWrapper);
        }
        this.toggleScrollIcon();
    };
    ChatUI.prototype.footerKeyHandler = function (e) {
        var targetElement = e.target;
        if (targetElement.classList.contains('e-chat-attachment-icon')) {
            return;
        }
        this.keyHandler(e, 'footer');
    };
    ChatUI.prototype.scrollBottomKeyHandler = function (e) {
        this.keyHandler(e, 'scrollBottom');
    };
    ChatUI.prototype.keyHandler = function (event, value) {
        if (event.key === 'Enter' && !event.shiftKey) {
            var mentionPopup = document.querySelector('.e-chat-mention.e-mention');
            if (mentionPopup && mentionPopup.classList.contains('e-popup-open')) {
                return;
            }
            switch (value) {
                case 'footer':
                    this.pushToUndoStack(this.editableTextarea.innerText);
                    event.preventDefault();
                    this.onSendIconClick(event);
                    break;
                case 'scrollBottom':
                    this.scrollToBottom();
                    break;
            }
        }
        else {
            this.handleUndoRedo(event);
        }
    };
    ChatUI.prototype.applyPromptChange = function (newState, oldState, event) {
        this.editableTextarea.innerHTML = newState.content;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
        this.triggerUserTyping(event, oldState.content);
    };
    ChatUI.prototype.updateFooter = function (showFooter, footerElement) {
        if (!showFooter) {
            footerElement.hidden = true;
        }
        else {
            footerElement.hidden = false;
        }
    };
    ChatUI.prototype.handleScroll = function () {
        this.messageWrapper.querySelectorAll('.e-chat-message-toolbar.e-show').forEach(function (toolbar) {
            toolbar.classList.remove('e-show');
        });
        var atBottom = this.checkScrollAtBottom(this.messageWrapper, 0);
        if (atBottom) {
            this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
            var suggestionEle = this.element.querySelector('.e-suggestions');
            if (suggestionEle) {
                this.toggleClassName(suggestionEle, atBottom, 'suggestion');
                if (!atBottom || !this.isScrollAtBottom) {
                    this.updateScroll(this.messageWrapper);
                }
            }
        }
        if (this.loadOnDemand && this.messageWrapper.scrollTop === 0) {
            this.multiplier += this.multiplier;
            this.loadMoreMessages();
        }
        this.isScrollAtBottom = atBottom;
    };
    ChatUI.prototype.toggleClassName = function (element, atBottom, name) {
        switch (name) {
            case 'downArrow':
                element.classList.toggle('e-arrowdown-hide', atBottom);
                element.classList.toggle('e-arrowdown-show', !atBottom);
                break;
            case 'suggestion':
                element.classList.toggle('e-show-suggestions', atBottom);
                element.classList.toggle('e-hide-suggestions', !atBottom);
                break;
            case 'scroll':
                element.classList.toggle('e-scroll-smooth', !atBottom);
                break;
        }
    };
    ChatUI.prototype.toggleScrollIcon = function () {
        var atBottom = this.checkScrollAtBottom(this.messageWrapper, 0);
        this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
        var suggestionEle = this.element.querySelector('.e-suggestions');
        if (suggestionEle) {
            this.toggleClassName(suggestionEle, atBottom, 'suggestion');
            if (atBottom) {
                this.updateScroll(this.messageWrapper);
            }
        }
        this.isScrollAtBottom = atBottom;
    };
    ChatUI.prototype.scrollBtnClick = function () {
        this.toggleClassName(this.messageWrapper, false, 'scroll');
        this.scrollToBottom();
        this.toggleClassName(this.messageWrapper, true, 'scroll');
    };
    ChatUI.prototype.updateMessageItem = function (message, msgId) {
        if (message.author || message.timeStamp || this.messageTemplate) {
            this.renderUpdatedMessage();
            return;
        }
        var messageItem = this.messageWrapper.querySelector("#" + msgId);
        if (!messageItem) {
            return;
        }
        if (message.id) {
            messageItem.id = message.id;
        }
        var messageContent = messageItem.querySelector('.e-message-content');
        if (messageContent && message.text) {
            var textElement = messageItem.querySelector('.e-text');
            if (textElement) {
                textElement.innerHTML = this.getMessageText(message);
            }
            this.updateForwardAndReplyElement(message, messageContent);
        }
        if (message.status) {
            var statusTextElement = messageItem.querySelector('.e-status-text');
            if (statusTextElement && message.status.text) {
                statusTextElement.innerHTML = message.status.text;
            }
            var statusIconElement = messageItem.querySelector('.e-status-icon');
            if (statusIconElement && message.status.iconCss) {
                var iconCss = message.status.iconCss;
                statusIconElement.className = "e-status-icon " + iconCss;
                if (message.status.tooltip) {
                    statusIconElement.title = message.status.tooltip;
                }
            }
        }
    };
    ChatUI.prototype.updateMentionObj = function () {
        if (isNullOrUndefined(this.mentionObj)) {
            this.initializeMention();
        }
        else {
            if (this.mentionUsers.length > 0) {
                this.mentionObj.dataSource = this.getMentionDataSource(this.mentionUsers);
            }
            else {
                this.destroyAndNullify(this.mentionObj);
                this.mentionObj = null;
            }
        }
    };
    ChatUI.prototype.updateLocale = function () {
        var _this = this;
        // Updated locale for forward message text.
        this.l10n.setLocale(this.locale);
        var messages = this.messageWrapper.querySelectorAll('.e-message-item');
        messages.forEach(function (message) {
            var forwardEle = message.querySelector('.e-forwarded-indicator');
            if (forwardEle) {
                forwardEle.querySelector('.e-forward-message').innerHTML = _this.l10n.getConstant('forwarded');
            }
        });
        if (this.mentionObj) {
            this.mentionObj.noRecordsTemplate = this.l10n.getConstant('noRecordsTemplate');
        }
        //update locale for icons
        if (this.sendIcon) {
            this.sendIcon.setAttribute('title', this.l10n.getConstant('send'));
        }
        if (this.attachmentIcon) {
            this.attachmentIcon.setAttribute('title', this.l10n.getConstant('attachments'));
        }
        var closeIcon = this.viewWrapper.querySelector('.e-chat-close');
        if (closeIcon) {
            closeIcon.setAttribute('title', this.l10n.getConstant('close'));
        }
        // Update locale for file preview
        var attachmentPreview = this.viewWrapper.querySelector('.e-preview-overlay');
        if (attachmentPreview) {
            var downloadIcon = attachmentPreview.querySelector('.e-chat-download');
            if (downloadIcon) {
                downloadIcon.setAttribute('title', this.l10n.getConstant('download'));
            }
            var backIcon = attachmentPreview.querySelector('.e-chat-back-icon');
            if (backIcon) {
                backIcon.setAttribute('title', this.l10n.getConstant('close'));
            }
            var filePreviewText = attachmentPreview.querySelector('.e-preview-file-text');
            if (filePreviewText) {
                filePreviewText.textContent = this.l10n.getConstant('filePreview');
            }
        }
        //update locale for failure message
        var failureMessageElem = this.viewWrapper.querySelector('.e-failure-message');
        if (failureMessageElem) {
            if (failureMessageElem.classList.contains('e-size-failure')) {
                failureMessageElem.textContent = this.l10n.getConstant('fileSizeFailure');
            }
            else {
                var failureText = this.l10n.getConstant('fileCountFailure');
                failureText = failureText.replace('{0}', this.attachmentSettings.maximumCount.toString());
                if (this.attachmentSettings.maximumCount === 1) {
                    failureText = failureText.replace('files', 'file');
                }
                failureMessageElem.textContent = failureText;
            }
        }
        // Update locale for typing users text.
        if (!this.typingUsers || this.typingUsers.length === 0) {
            return;
        }
        this.updateUserText();
    };
    ChatUI.prototype.wireEvents = function () {
        this.wireFooterEvents(this.footerTemplate);
        EventHandler.add(this.messageWrapper, 'scroll', this.handleScroll, this);
        EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        EventHandler.add(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler, this);
    };
    ChatUI.prototype.unwireEvents = function () {
        this.unWireFooterEvents(this.footerTemplate);
        EventHandler.remove(this.messageWrapper, 'scroll', this.handleScroll);
        EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        EventHandler.remove(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler);
        if (this.attachmentIcon) {
            EventHandler.clearEvents(this.attachmentIcon);
        }
    };
    ChatUI.prototype.destroyAttachments = function () {
        if (this.uploaderObj) {
            this.uploaderObj.destroy();
            this.uploaderObj = null;
        }
        if (this.attachmentIcon) {
            this.attachmentIcon.innerHTML = '';
            this.attachmentIcon.remove();
            this.attachmentIcon = null;
        }
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
            this.dropArea.remove();
            this.dropArea = null;
        }
        if (this.messageWrapper) {
            var previewOverlay = this.messageWrapper.querySelector('.e-preview-overlay');
            if (previewOverlay) {
                previewOverlay.remove();
            }
        }
        this.uploadedFiles = [];
    };
    ChatUI.prototype.destroyChatUI = function () {
        var properties = [
            'content',
            'sendIcon',
            'clearIcon',
            'editableTextarea',
            'footer',
            'indicatorWrapper',
            'messageWrapper',
            'viewWrapper',
            'chatHeader'
        ];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            var element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    };
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    ChatUI.prototype.scrollToBottom = function () {
        this.updateScroll(this.messageWrapper);
        this.toggleScrollIcon();
    };
    /**
     * Appends a new message to the end of the Chat UI conversation area.
     * This method adds the specified message as the latest entry in the chat:
     *
     * @function addMessage
     * @param {string | MessageModel} message - The message to be added to the conversation. Accepts either a plain text string or a `MessageModel` object.
     * - If `message` is a string, a `MessageModel` will be automatically created with the current user’s details, and the message will be appended.
     * - If `message` is an instance of `MessageModel`, it can represent a message from either the current user or another participant and will be appended directly.
     * @returns {void} No return value.
     */
    ChatUI.prototype.addMessage = function (message) {
        if (isNullOrUndefined(message)) {
            return;
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (typeof message === 'string') {
            var newMessageObj = {
                id: this.element.id + "-message-" + (this.messages.length + 1),
                author: this.user,
                text: message,
                timeStamp: new Date(),
                timeStampFormat: this.timeStampFormat,
                attachedFile: null
            };
            this.messages = this.messages.concat([newMessageObj]);
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        else {
            var newMessageObj = __assign$1({}, message, { id: message.id || this.element.id + "-message-" + (this.messages.length + 1), author: message.author || this.user, text: message.text || '', timeStamp: message.timeStamp || new Date(), timeStampFormat: message.timeStampFormat || this.timeStampFormat, status: message.status, mentionUsers: message.mentionUsers || [], isPinned: message.isPinned || false, replyTo: message.replyTo, isForwarded: message.isForwarded || false, attachedFile: message.attachedFile });
            this.messages = this.messages.concat([newMessageObj]);
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(true, 5);
        this.isProtectedOnChange = prevOnChange;
    };
    /**
     * Updates an existing message in the Chat UI component.
     * This method allows for modifying a message that has already been added to the conversation.
     * It requires the unique identifier of the message to be updated and the new message content as a `MessageModel`.
     *
     * @function updateMessage
     * @param {MessageModel} message - The updated message content represented as a `MessageModel`.
     * @param {string} msgId - The unique identifier of the message to be updated.
     * @returns {void} No return value.
     */
    ChatUI.prototype.updateMessage = function (message, msgId) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.messages = this.messages.map(function (messageItem) {
            return messageItem.id === msgId ? __assign$1({}, messageItem, message) : messageItem;
        });
        this.updateMessageItem(message, msgId);
        this.isProtectedOnChange = prevOnChange;
    };
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    ChatUI.prototype.scrollToMessage = function (messageId) {
        var messageElement = this.messageWrapper.querySelector("#" + messageId);
        if (!messageElement) {
            return;
        }
        messageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    ChatUI.prototype.focus = function () {
        if (this.editableTextarea) {
            this.setFocusAtEnd(this.editableTextarea);
        }
    };
    ChatUI.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unwireEvents();
        if (this.toolbar) {
            this.toolbar.off('render-react-toolbar-template', this.addReactToolbarPortals);
        }
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        this.element.classList.remove('e-rtl');
        this.destroyAndNullify(this.downArrowIcon);
        this.destroyAndNullify(this.toolbar);
        this.destroyAndNullify(this.dropDownButton);
        this.destroyAndNullify(this.mentionObj);
        this.destroyChatUI();
        this.destroyAttachments();
        this.intl = null;
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    ChatUI.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension(this.element, this.width, this.height);
                    break;
                case 'placeholder':
                    this.updatePlaceholder(this.placeholder);
                    break;
                case 'cssClass':
                    this.updateCssClass(this.element, newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (!isNullOrUndefined(this.toolbar)) {
                        this.toolbar.enableRtl = this.enableRtl;
                        this.toolbar.dataBind();
                    }
                    break;
                case 'showHeader':
                    this.updateHeader(this.showHeader, this.chatHeader, this.viewWrapper);
                    break;
                case 'enableCompactMode':
                    this.initializeCompactMode();
                    this.renderUpdatedMessage();
                    this.updateScrollPosition(true, 5);
                    break;
                case 'headerText':
                    this.updateHeaderText();
                    break;
                case 'headerIconCss':
                    this.updateHeaderIcon();
                    break;
                case 'messageToolbarSettings':
                case 'messages': {
                    this.renderUpdatedMessage();
                    // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
                    this.updateScrollPosition(true, 5);
                    break;
                }
                case 'user': {
                    var newUser = {
                        id: newProp.user.id ? newProp.user.id : this.user.id,
                        user: newProp.user.user ? newProp.user.user : this.user.user,
                        avatarUrl: newProp.user.avatarUrl ? newProp.user.avatarUrl : this.user.avatarUrl,
                        avatarBgColor: newProp.user.avatarBgColor ? newProp.user.avatarBgColor : this.user.avatarBgColor,
                        cssClass: newProp.user.cssClass ? newProp.user.cssClass : this.user.cssClass,
                        statusIconCss: newProp.user.statusIconCss ? newProp.user.statusIconCss : this.user.statusIconCss
                    };
                    this.user = __assign$1({}, this.user, newUser);
                    break;
                }
                case 'showTimeStamp':
                case 'timeStampFormat':
                case 'showTimeBreak':
                    if (this.messages.length > 0) {
                        this.renderUpdatedMessage();
                    }
                    break;
                case 'showFooter':
                    this.updateFooter(this.showFooter, this.footer);
                    break;
                case 'autoScrollToBottom':
                    this.handleAutoScroll();
                    break;
                case 'suggestions':
                    this.handleSuggestionUpdate();
                    break;
                case 'typingUsers':
                    this.updateTypingUsers(this.typingUsers);
                    break;
                case 'locale':
                    this.updateLocale();
                    break;
                case 'currencyCode':
                    this.refresh();
                    break;
                case 'mentionTriggerChar':
                    this.mentionObj.mentionChar = newProp.mentionTriggerChar;
                    break;
                case 'mentionUsers':
                    this.updateMentionObj();
                    break;
                case 'enableAttachments':
                    if (!this.footerTemplate) {
                        var footerIconsWrapper = this.element.querySelector('.e-footer-icons-wrapper');
                        this.updateAttachmentElement(footerIconsWrapper);
                    }
                    break;
                case 'attachmentSettings':
                    this.updateAttachmentSettings(newProp.attachmentSettings);
                    break;
            }
        }
    };
    __decorate$3([
        Property('100%')
    ], ChatUI.prototype, "width", void 0);
    __decorate$3([
        Property('100%')
    ], ChatUI.prototype, "height", void 0);
    __decorate$3([
        Complex({}, User)
    ], ChatUI.prototype, "user", void 0);
    __decorate$3([
        Property('Chat')
    ], ChatUI.prototype, "headerText", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "headerIconCss", void 0);
    __decorate$3([
        Property('Type your message…')
    ], ChatUI.prototype, "placeholder", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "cssClass", void 0);
    __decorate$3([
        Property(true)
    ], ChatUI.prototype, "showHeader", void 0);
    __decorate$3([
        Property(true)
    ], ChatUI.prototype, "showFooter", void 0);
    __decorate$3([
        Complex({ items: [] }, ToolbarSettings)
    ], ChatUI.prototype, "headerToolbar", void 0);
    __decorate$3([
        Property([])
    ], ChatUI.prototype, "suggestions", void 0);
    __decorate$3([
        Property(false)
    ], ChatUI.prototype, "showTimeBreak", void 0);
    __decorate$3([
        Collection([], Message)
    ], ChatUI.prototype, "messages", void 0);
    __decorate$3([
        Collection([], User)
    ], ChatUI.prototype, "typingUsers", void 0);
    __decorate$3([
        Property('dd/MM/yyyy hh:mm a')
    ], ChatUI.prototype, "timeStampFormat", void 0);
    __decorate$3([
        Property(true)
    ], ChatUI.prototype, "showTimeStamp", void 0);
    __decorate$3([
        Property(false)
    ], ChatUI.prototype, "autoScrollToBottom", void 0);
    __decorate$3([
        Property(false)
    ], ChatUI.prototype, "loadOnDemand", void 0);
    __decorate$3([
        Collection([], User)
    ], ChatUI.prototype, "mentionUsers", void 0);
    __decorate$3([
        Property('@')
    ], ChatUI.prototype, "mentionTriggerChar", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "suggestionTemplate", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "footerTemplate", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "emptyChatTemplate", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "messageTemplate", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "timeBreakTemplate", void 0);
    __decorate$3([
        Property('')
    ], ChatUI.prototype, "typingUsersTemplate", void 0);
    __decorate$3([
        Property(false)
    ], ChatUI.prototype, "enableCompactMode", void 0);
    __decorate$3([
        Complex({ width: '100%', items: [{ iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' }, { iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' }, { iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' }, { iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }] }, MessageToolbarSettings)
    ], ChatUI.prototype, "messageToolbarSettings", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "messageSend", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "userTyping", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "mentionSelect", void 0);
    __decorate$3([
        Property(false)
    ], ChatUI.prototype, "enableAttachments", void 0);
    __decorate$3([
        Complex({ saveUrl: '', removeUrl: '', maxFileSize: 30000000, allowedFileTypes: '', saveFormat: 'Blob', path: '', enableDragAndDrop: true, maximumCount: 10, previewTemplate: '', attachmentTemplate: '' }, FileAttachmentSettings)
    ], ChatUI.prototype, "attachmentSettings", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "beforeAttachmentUpload", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "attachmentUploadSuccess", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "attachmentUploadFailure", void 0);
    __decorate$3([
        Event()
    ], ChatUI.prototype, "attachmentRemoved", void 0);
    ChatUI = __decorate$3([
        NotifyPropertyChanges
    ], ChatUI);
    return ChatUI;
}(InterActiveChatBase));

var __extends$4 = (undefined && undefined.__extends) || (function () {
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
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the mode of inline ai assist.
 */
var ResponseMode;
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
    __extends$4(PromptResponse, _super);
    function PromptResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('')
    ], PromptResponse.prototype, "prompt", void 0);
    __decorate$4([
        Property('')
    ], PromptResponse.prototype, "response", void 0);
    return PromptResponse;
}(ChildProperty));
/**
 * Represents a command item model in the inline AI assist component.
 */
var CommandItem = /** @class */ (function (_super) {
    __extends$4(CommandItem, _super);
    function CommandItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('')
    ], CommandItem.prototype, "id", void 0);
    __decorate$4([
        Property(false)
    ], CommandItem.prototype, "disabled", void 0);
    __decorate$4([
        Property('')
    ], CommandItem.prototype, "iconCss", void 0);
    __decorate$4([
        Property('')
    ], CommandItem.prototype, "label", void 0);
    __decorate$4([
        Property('')
    ], CommandItem.prototype, "prompt", void 0);
    __decorate$4([
        Property('')
    ], CommandItem.prototype, "groupBy", void 0);
    __decorate$4([
        Property('')
    ], CommandItem.prototype, "tooltip", void 0);
    return CommandItem;
}(ChildProperty));
/**
 * Represents a response item model in the inline AI assist component.
 */
var ResponseItem = /** @class */ (function (_super) {
    __extends$4(ResponseItem, _super);
    function ResponseItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('')
    ], ResponseItem.prototype, "id", void 0);
    __decorate$4([
        Property(false)
    ], ResponseItem.prototype, "disabled", void 0);
    __decorate$4([
        Property('')
    ], ResponseItem.prototype, "iconCss", void 0);
    __decorate$4([
        Property('')
    ], ResponseItem.prototype, "label", void 0);
    __decorate$4([
        Property('')
    ], ResponseItem.prototype, "groupBy", void 0);
    __decorate$4([
        Property('')
    ], ResponseItem.prototype, "tooltip", void 0);
    return ResponseItem;
}(ChildProperty));
/**
 * Represents the settings for the command options in the InlineAIAssist component.
 */
var CommandSettings = /** @class */ (function (_super) {
    __extends$4(CommandSettings, _super);
    function CommandSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Event()
    ], CommandSettings.prototype, "itemSelect", void 0);
    __decorate$4([
        Collection([], CommandItem)
    ], CommandSettings.prototype, "commands", void 0);
    __decorate$4([
        Property('')
    ], CommandSettings.prototype, "popupHeight", void 0);
    __decorate$4([
        Property('')
    ], CommandSettings.prototype, "popupWidth", void 0);
    return CommandSettings;
}(ChildProperty));
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
var ResponseSettings = /** @class */ (function (_super) {
    __extends$4(ResponseSettings, _super);
    function ResponseSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Event()
    ], ResponseSettings.prototype, "itemSelect", void 0);
    __decorate$4([
        Collection([], ResponseItem)
    ], ResponseSettings.prototype, "items", void 0);
    return ResponseSettings;
}(ChildProperty));
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
var InlineToolbarSettings = /** @class */ (function (_super) {
    __extends$4(InlineToolbarSettings, _super);
    function InlineToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('Inline')
    ], InlineToolbarSettings.prototype, "toolbarPosition", void 0);
    __decorate$4([
        Collection([], ToolbarItem)
    ], InlineToolbarSettings.prototype, "items", void 0);
    __decorate$4([
        Event()
    ], InlineToolbarSettings.prototype, "itemClick", void 0);
    return InlineToolbarSettings;
}(ChildProperty));
var InlineAIAssist = /** @class */ (function (_super) {
    __extends$4(InlineAIAssist, _super);
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
        if (this.relateTo === '' || isNullOrUndefined(this.relateTo)) {
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
        if (!isNullOrUndefined(prompt) && prompt.trim().length > 0) {
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
    __decorate$4([
        Property('body')
    ], InlineAIAssist.prototype, "target", void 0);
    __decorate$4([
        Property('')
    ], InlineAIAssist.prototype, "relateTo", void 0);
    __decorate$4([
        Property('Popup')
    ], InlineAIAssist.prototype, "responseMode", void 0);
    __decorate$4([
        Property('')
    ], InlineAIAssist.prototype, "cssClass", void 0);
    __decorate$4([
        Property('')
    ], InlineAIAssist.prototype, "prompt", void 0);
    __decorate$4([
        Collection([], PromptResponse)
    ], InlineAIAssist.prototype, "prompts", void 0);
    __decorate$4([
        Property('Ask or generate AI content..')
    ], InlineAIAssist.prototype, "placeholder", void 0);
    __decorate$4([
        Property('en-US')
    ], InlineAIAssist.prototype, "locale", void 0);
    __decorate$4([
        Property('auto')
    ], InlineAIAssist.prototype, "popupHeight", void 0);
    __decorate$4([
        Property('400px')
    ], InlineAIAssist.prototype, "popupWidth", void 0);
    __decorate$4([
        Complex({ commands: [], popupHeight: '', popupWidth: '' }, CommandSettings)
    ], InlineAIAssist.prototype, "commandSettings", void 0);
    __decorate$4([
        Complex({ items: [] }, ResponseSettings)
    ], InlineAIAssist.prototype, "responseSettings", void 0);
    __decorate$4([
        Complex({ toolbarPosition: 'Inline', items: [] }, InlineToolbarSettings)
    ], InlineAIAssist.prototype, "inlineToolbarSettings", void 0);
    __decorate$4([
        Property('')
    ], InlineAIAssist.prototype, "responseTemplate", void 0);
    __decorate$4([
        Property('')
    ], InlineAIAssist.prototype, "editorTemplate", void 0);
    __decorate$4([
        Property(1000)
    ], InlineAIAssist.prototype, "zIndex", void 0);
    __decorate$4([
        Property(false)
    ], InlineAIAssist.prototype, "enableRtl", void 0);
    __decorate$4([
        Event()
    ], InlineAIAssist.prototype, "promptRequest", void 0);
    __decorate$4([
        Event()
    ], InlineAIAssist.prototype, "open", void 0);
    __decorate$4([
        Event()
    ], InlineAIAssist.prototype, "close", void 0);
    InlineAIAssist = __decorate$4([
        NotifyPropertyChanges
    ], InlineAIAssist);
    return InlineAIAssist;
}(AIAssistBase));

export { AIAssistBase, AIAssistView, AssistView, AssistViewType, AttachmentSettings, ChatUI, CommandItem, CommandSettings, FileAttachmentSettings, FooterToolbarSettings, InlineAIAssist, InlineToolbarSettings, InterActiveChatBase, Message, MessageReply, MessageStatus, MessageToolbarSettings, Prompt, PromptResponse, PromptToolbarSettings, ResponseItem, ResponseMode, ResponseSettings, ResponseToolbarSettings, SpeechToTextSettings, ToolbarItem, ToolbarPosition, ToolbarSettings, User };
//# sourceMappingURL=ej2-interactive-chat.es5.js.map
