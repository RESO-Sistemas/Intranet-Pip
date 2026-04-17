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
import { Component, select, compile, NotifyPropertyChanges, isNullOrUndefined as isNOU, formatUnit, Event, append, addClass, removeClass, Property, ChildProperty, Collection } from '@syncfusion/ej2-base';
import { attributes, EventHandler, remove } from '@syncfusion/ej2-base';
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
export { ToolbarItem };
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
export { ToolbarSettings };
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
        element.style.width = !isNOU(width) ? formatUnit(width) : element.style.width;
        element.style.height = !isNOU(height) ? formatUnit(height) : element.style.height;
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
        if (showClearButton === void 0) { showClearButton = false; }
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
        if (isNOU(textareaObj)) {
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
        if (isNOU(this.editableTextarea)) {
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
            if (!isNOU(element.parentNode)) {
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
export { InterActiveChatBase };
