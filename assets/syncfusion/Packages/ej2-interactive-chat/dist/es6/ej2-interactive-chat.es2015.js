import { ChildProperty, Property, Collection, Event, Component, isNullOrUndefined, formatUnit, removeClass, addClass, attributes, EventHandler, append, remove, select, compile, NotifyPropertyChanges, Complex, getUniqueID, L10n, SanitizeHtmlHelper, Internationalization } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { ButtonSettings, TooltipSettings, SpeechToText, Uploader } from '@syncfusion/ej2-inputs';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { Fab } from '@syncfusion/ej2-buttons';
import { createSpinner, showSpinner, hideSpinner, Popup } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Mention } from '@syncfusion/ej2-dropdowns';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents a toolbar item model in the component.
 */
class ToolbarItem extends ChildProperty {
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
/**
 * Represents the settings for the toolbar in the component.
 */
class ToolbarSettings extends ChildProperty {
}
__decorate([
    Collection([], ToolbarItem)
], ToolbarSettings.prototype, "items", void 0);
__decorate([
    Event()
], ToolbarSettings.prototype, "itemClicked", void 0);
/**
 * ChatBase component act as base class.
 */
let InterActiveChatBase = class InterActiveChatBase extends Component {
    /**
     * * Constructor for Base class
     *
     * @param {InterActiveChatBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.undoStack = [];
        this.redoStack = [];
        this.undoDelayTimer = null;
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    preRender() {
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    getModuleName() {
        return 'interactivechatBase';
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render() {
    }
    /* To calculate the width when change via set model */
    setDimension(element, width, height) {
        element.style.width = !isNullOrUndefined(width) ? formatUnit(width) : element.style.width;
        element.style.height = !isNullOrUndefined(height) ? formatUnit(height) : element.style.height;
    }
    addCssClass(element, cssClass) {
        if (cssClass) {
            element.classList.add(cssClass);
        }
    }
    addRtlClass(element, isRtl) {
        if (isRtl) {
            element.classList.add('e-rtl');
        }
    }
    updateCssClass(element, newClass, oldClass) {
        if (oldClass) {
            removeClass([element], oldClass.trim().split(' '));
        }
        if (newClass) {
            addClass([element], newClass.trim().split(' '));
        }
    }
    updateHeader(showHeader, headerElement, viewWrapper) {
        if (!showHeader) {
            headerElement.hidden = true;
            viewWrapper.style.height = '100%';
        }
        else {
            headerElement.hidden = false;
            viewWrapper.style.height = '';
        }
    }
    renderViewSections(element, headerClassName, viewClassName) {
        const headerWrapper = this.createElement('div', { className: headerClassName });
        element.appendChild(headerWrapper);
        const viewWrapper = this.createElement('div', { className: viewClassName });
        element.appendChild(viewWrapper);
    }
    createViewComponents(viewWrapper) {
        const contentWrapper = this.createElement('div', { className: 'e-views' });
        const viewContainer = this.createElement('div', { className: 'e-view-container' });
        contentWrapper.appendChild(viewContainer);
        viewWrapper.appendChild(contentWrapper);
    }
    updateScroll(scrollElement) {
        scrollElement.scrollTo(0, scrollElement.scrollHeight);
    }
    getElement(element) {
        let className;
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
    }
    getClipBoardContent(value) {
        const tempElement = document.createElement('div');
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
    }
    writeFileToClipboard(file) {
        if (!document.hasFocus() || !('clipboard' in navigator)) {
            return;
        }
        const mimeType = file.type;
        const supportedTypes = ['image/png'];
        if (supportedTypes.includes(mimeType)) {
            void navigator.clipboard.write([
                new ClipboardItem({ [mimeType]: file })
            ]);
            return;
        }
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    void navigator.clipboard.write([
                        new ClipboardItem({ [blob.type]: blob })
                    ]);
                }
            }, 'image/png');
        };
        img.src = URL.createObjectURL(file);
    }
    getFooter() {
        this.footer = this.getElement('footer');
    }
    createSuggestionElement(suggestionHeader) {
        const suggestionContainer = this.createElement('div', { className: 'e-suggestions' });
        const suggestionHeaderElement = this.createElement('div', { className: 'e-suggestion-header' });
        const suggestionListElement = this.createElement('div', { className: 'e-suggestion-list' });
        if (suggestionHeader) {
            suggestionContainer.appendChild(suggestionHeaderElement);
        }
        suggestionContainer.appendChild(suggestionListElement);
        return { suggestionContainer, suggestionHeaderElement, suggestionListElement };
    }
    renderSuggestions(suggestionsArray, suggestionHeader, suggestionTemplate, contextName, templateName, onSuggestionClick) {
        const isSuggestionTemplate = suggestionTemplate ? true : false;
        if (suggestionsArray && suggestionsArray.length > 0) {
            const { suggestionContainer, suggestionHeaderElement, suggestionListElement } = this.createSuggestionElement(suggestionHeader);
            this.suggestionsElement = suggestionContainer;
            const suggestionContainerClass = `e-suggestions ${isSuggestionTemplate ? 'e-suggestion-item-template' : ''}`;
            this.suggestionsElement.className = suggestionContainerClass;
            this.suggestionHeader = suggestionHeaderElement;
            const suggestionList = suggestionListElement;
            this.renderSuggestionList(suggestionsArray, suggestionList, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick);
            if (suggestionHeader) {
                this.suggestionHeader.innerHTML = suggestionHeader;
            }
            this.suggestionsElement.append(suggestionList);
            this.content.append(this.suggestionsElement);
        }
    }
    renderSuggestionList(suggestionsArray, suggestionWrapper, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick) {
        const suggestionsListElement = this.createElement('ul', { attrs: { 'tabindex': '-1' } });
        suggestionsArray.forEach((suggestion, i) => {
            const suggestionList = this.createElement('li');
            attributes(suggestionList, { 'tabindex': '0' });
            EventHandler.add(suggestionList, 'click', onSuggestionClick, this);
            EventHandler.add(suggestionList, 'keydown', this.suggestionItemHandler, this);
            if (isSuggestionTemplate) {
                const suggestionContext = { index: i, [contextName]: suggestionsArray[parseInt(i.toString(), 10)] };
                this.updateContent(suggestionTemplate, suggestionList, suggestionContext, templateName);
            }
            else {
                suggestionList.innerHTML = suggestion;
            }
            suggestionsListElement.append(suggestionList);
        });
        suggestionWrapper.appendChild(suggestionsListElement);
    }
    suggestionItemHandler(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.onSuggestionClick(event);
        }
    }
    renderBannerView(bannerTemplate, parentElement, templateName) {
        if (bannerTemplate) {
            const className = templateName === 'emptyChatTemplate' ? 'e-empty-chat-template' : 'e-banner-view';
            const introContainer = this.createElement('div', { className: className });
            this.updateContent(bannerTemplate, introContainer, {}, templateName);
            parentElement.prepend(introContainer);
        }
    }
    updateContent(template, contentElement, context, templateName) {
        if (this.isReact) {
            this.clearTemplate([templateName]);
        }
        const notCompile = !(this.isReact || this.isVue);
        const ctn = this.getTemplateFunction(template, notCompile);
        if (typeof ctn === 'string') {
            contentElement.innerHTML = ctn;
        }
        else {
            append(ctn(context, this), contentElement);
        }
        this.renderReactTemplates();
    }
    renderFooterContent(footerTemplate, prompt, promptPlaceholder, showClearButton, className) {
        if (footerTemplate) {
            this.updateContent(footerTemplate, this.footer, {}, 'footerTemplate');
        }
        else {
            this.renderFooter(className, prompt, promptPlaceholder, showClearButton);
        }
    }
    renderFooter(className, prompt, promptPlaceholder, showClearButton = false) {
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
        const hiddenTextarea = this.createElement('textarea', {
            attrs: {
                class: 'e-hidden-textarea',
                name: 'userPrompt',
                value: prompt
            }
        });
        const textAreaIconsWrapper = this.createElement('div', { className: 'e-textarea-icons-wrapper' });
        this.appendChildren(textAreaIconsWrapper, this.editableTextarea, hiddenTextarea);
        this.footer.appendChild(textAreaIconsWrapper);
    }
    updateTextAreaObject(textareaObj) {
        if (isNullOrUndefined(textareaObj)) {
            return;
        }
        const textarea = textareaObj.element;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    renderSendIcon(sendIconClass) {
        const sendIcon = this.createElement('span', { attrs: { class: sendIconClass, role: 'button', 'aria-label': 'Submit', tabindex: '0' } });
        this.footer.appendChild(sendIcon);
        return sendIcon;
    }
    appendChildren(target, ...children) {
        target.append(...children);
    }
    insertBeforeChildren(target, ...children) {
        target.prepend(...children);
    }
    renderFooterIcons(sendIconClass, showClearButton, clearIconClass) {
        const footerIconsWrapper = this.createElement('div', { attrs: { class: 'e-footer-icons-wrapper' } });
        this.sendIcon = this.createElement('span', { attrs: { class: sendIconClass, role: 'button', 'aria-label': 'Submit', tabindex: '0' } });
        footerIconsWrapper.appendChild(this.sendIcon);
        if (showClearButton) {
            this.renderClearIcon(footerIconsWrapper, clearIconClass);
        }
        this.footer.firstChild.appendChild(footerIconsWrapper);
        this.footer.classList.add('e-footer-focus-wave-effect');
    }
    renderClearIcon(footerIconsWrapper, clearIconClass) {
        this.clearIcon = this.createElement('span', { attrs: { class: clearIconClass, role: 'button', 'aria-label': 'Close', tabindex: '-1' } });
        if (footerIconsWrapper) {
            footerIconsWrapper.prepend(this.clearIcon);
        }
    }
    checkScrollAtBottom(Element, fabHeight) {
        const scrollThreshold = 5;
        const scrollTop = Math.floor(Element.scrollTop);
        const scrollHeight = Math.floor(Element.scrollHeight);
        const clientHeight = Math.floor(Element.clientHeight);
        return scrollHeight - scrollTop <= clientHeight + scrollThreshold + fabHeight;
    }
    updateHiddenTextarea(prompt) {
        const hiddenTextarea = this.footer.querySelector('.e-hidden-textarea');
        hiddenTextarea.value = prompt;
    }
    activateSendIcon(value) {
        this.sendIcon.classList.toggle('disabled', value === 0);
        this.sendIcon.classList.toggle('enabled', value > 0);
    }
    updateFooterElementClass() {
        if (isNullOrUndefined(this.editableTextarea)) {
            return;
        }
        const textarea = this.editableTextarea;
        textarea.style.height = 'auto';
        this.footer.classList.remove('e-footer-expanded');
        this.footer.classList[textarea.scrollHeight > parseInt(getComputedStyle(textarea).minHeight, 10) ? 'add' : 'remove']('e-footer-expanded');
    }
    updatePlaceholder(placeholder) {
        if (this.editableTextarea) {
            this.editableTextarea.setAttribute('placeholder', placeholder);
        }
    }
    pushToUndoStack(value) {
        const { start, end } = this.getCursorPosition();
        const state = {
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
    }
    handleUndoRedo(event) {
        const isUndo = (event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey;
        const isRedo = (event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey));
        if (isUndo) {
            event.preventDefault();
            this.undo(event);
        }
        else if (isRedo) {
            event.preventDefault();
            this.redo(event);
        }
    }
    undo(event) {
        if (this.undoStack.length <= 1) {
            return;
        }
        const current = this.undoStack.pop();
        const previous = this.undoStack[this.undoStack.length - 1];
        this.redoStack.push(current);
        this.applyPromptChange(previous, current, event);
    }
    redo(event) {
        if (this.redoStack.length === 0) {
            return;
        }
        const current = {
            content: this.editableTextarea.textContent,
            selectionStart: this.getCursorPosition().start,
            selectionEnd: this.getCursorPosition().end
        };
        const next = this.redoStack.pop();
        this.undoStack.push(next);
        this.applyPromptChange(next, current, event);
    }
    setFocusAtEnd(textArea) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(textArea);
        range.collapse(false);
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    getCursorPosition() {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return { start: 0, end: 0 };
        }
        const range = selection.getRangeAt(0);
        const { startContainer, startOffset, endContainer, endOffset } = range;
        let charCount = 0;
        let start = -1;
        let end = -1;
        if (this.editableTextarea !== null) {
            const walker = document.createTreeWalker(this.editableTextarea, NodeFilter.SHOW_TEXT, null);
            let currentNode = walker.nextNode();
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
        return { start, end };
    }
    findTextNodeAndOffset(element, targetOffset) {
        // TreeWalker is a robust way to traverse all text nodes in the element's subtree
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        let currentNode = walker.nextNode();
        let cumulativeOffset = 0;
        while (currentNode !== null) {
            const nodeLength = currentNode.textContent.length;
            if (cumulativeOffset + nodeLength >= targetOffset) {
                return { node: currentNode, offset: targetOffset - cumulativeOffset };
            }
            cumulativeOffset += nodeLength;
            currentNode = walker.nextNode();
        }
        walker.currentNode = element;
        const lastNode = walker.lastChild();
        if (lastNode) {
            return { node: lastNode, offset: lastNode.textContent.length };
        }
        return null; // Should not happen if the element is not empty
    }
    setCursorPosition(start, end) {
        const selection = window.getSelection();
        if (!selection) {
            return;
        }
        const startNodeInfo = this.findTextNodeAndOffset(this.editableTextarea, start);
        const endNodeInfo = this.findTextNodeAndOffset(this.editableTextarea, end);
        if (startNodeInfo && endNodeInfo) {
            const range = document.createRange();
            range.setStart(startNodeInfo.node, startNodeInfo.offset);
            range.setEnd(endNodeInfo.node, endNodeInfo.offset);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    clearBreakTags(element) {
        element.innerHTML = element.innerHTML.replace(/<br>/g, '').trim();
    }
    handlePaste(event) {
        event.preventDefault(); // Prevent default paste behavior
        const pasteContent = event.clipboardData.getData('text/plain') || '';
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Delete any selected text
        // Handle line breaks with proper typing
        const lines = pasteContent.split(/\r?\n/);
        const fragment = document.createDocumentFragment();
        lines.forEach((line, index) => {
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
        const inputEvent = new CustomEvent('input', {
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
    }
    getCurrentState() {
        const position = this.getCursorPosition();
        return {
            content: this.editableTextarea !== null ? this.editableTextarea.innerHTML : '',
            selectionStart: position.start,
            selectionEnd: position.end
        };
    }
    scheduleUndoPush() {
        if (this.undoDelayTimer) {
            clearTimeout(this.undoDelayTimer);
        }
        this.undoDelayTimer = setTimeout(() => {
            const lastState = this.undoStack[this.undoStack.length - 1];
            const currentState = this.getCurrentState();
            if (!lastState || lastState.content !== currentState.content) {
                this.undoStack.push(currentState);
            }
        }, 400);
    }
    renderFailureAlert(viewWrapper, failureMessage, failureType, circleCloseIconClass, closeIconClass) {
        const alertElement = this.createElement('div', {
            className: 'e-upload-failure-alert',
            innerHTML: `
                <span class="e-icons ${circleCloseIconClass}" aria-label="Upload failure"></span>
                <div class="e-failure-message ${failureType}">${failureMessage}</div>
                <span class="e-icons ${closeIconClass}" role="button" tabindex="0" aria-label="Close"></span>
            `
        });
        EventHandler.add(alertElement, 'click', () => { this.handleFailureAlertRemove(viewWrapper, alertElement); }, this);
        return alertElement;
    }
    handleFailureAlertRemove(viewWrapper, alertElement) {
        alertElement.classList.remove('e-show');
        EventHandler.remove(alertElement, 'click', this.handleFailureAlertRemove);
        if (viewWrapper && viewWrapper.contains(alertElement)) {
            viewWrapper.removeChild(alertElement);
        }
    }
    wireFooterEvents(footerTemplate) {
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
    }
    unWireFooterEvents(footerTemplate) {
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
    }
    removeAndNullify(element) {
        if (element) {
            if (!isNullOrUndefined(element.parentNode)) {
                remove(element);
            }
            else {
                element.innerHTML = '';
            }
        }
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    destroyAndNullify(obj) {
        if (obj) {
            obj.destroy();
            obj = null;
        }
    }
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    getTemplateFunction(template, notCompile) {
        if (typeof template === 'string') {
            let content = '';
            try {
                const tempEle = select(template);
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
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param  {InterActiveChatBaseModel} newProp - Specifies new properties
     * @param  {InterActiveChatBaseModel} oldProp - Specifies old properties
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    onPropertyChanged(newProp, oldProp) {
    }
};
__decorate([
    Event()
], InterActiveChatBase.prototype, "created", void 0);
InterActiveChatBase = __decorate([
    NotifyPropertyChanges
], InterActiveChatBase);

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
let AIAssistBase = class AIAssistBase extends InterActiveChatBase {
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    preRender() {
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    getModuleName() {
        return 'aiAssistBase';
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render() {
    }
    // Blur only when focus truly leaves the wrapper subtree.
    // Use FocusEvent for focusout. Do NOT blur on icon interaction if you want the caret to stay.
    onFooterIconsFocusOut(e) {
        const wrapper = e.currentTarget;
        const editable = this.editableTextarea;
        const next = e.relatedTarget;
        if (!editable) {
            return;
        }
        // Only blur when focus moves outside the entire wrapper
        if (!next || !wrapper.contains(next)) {
            // If you want the caret to remain even when leaving, remove this blur.
            editable.blur();
        }
    }
    // Focus the editable when clicking/tapping the empty area of the wrapper.
    // Do not cancel the event; do not use pointer capture, so toolbar icon clicks work.
    onFooterIconsPointerDown(e) {
        const editable = this.editableTextarea;
        const target = e.target;
        if (!editable) {
            return;
        }
        let selectors = '';
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
        requestAnimationFrame(() => {
            editable.focus();
            this.setFocusAtEnd(editable);
        });
    }
    // Optional: support click as a fallback (some environments may not dispatch pointer events)
    onFooterIconsClick(e) {
        const editable = this.editableTextarea;
        const target = e.target;
        if (!editable) {
            return;
        }
        let selectors = '';
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
            requestAnimationFrame(() => {
                editable.focus();
                this.setFocusAtEnd(editable);
            });
        }
    }
    updateFooterType(toolbarPosition) {
        if (toolbarPosition.toLocaleLowerCase() === 'bottom') {
            this.footer.classList.remove('e-toolbar-inline');
            this.footer.classList.add('e-toolbar-bottom');
        }
        else {
            this.footer.classList.remove('e-toolbar-bottom');
            this.footer.classList.add('e-toolbar-inline');
        }
    }
    updateFooterClass(footerTemplate) {
        const footerClass = `e-footer ${footerTemplate ? 'e-footer-template' : ''}`;
        this.footer.className = footerClass;
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistBaseModel} newProp - Specifies new properties
     * @param  {AIAssistBaseModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    onPropertyChanged(newProp, oldProp) {
    }
};
__decorate$1([
    Property(false)
], AIAssistBase.prototype, "enableStreaming", void 0);
AIAssistBase = __decorate$1([
    NotifyPropertyChanges
], AIAssistBase);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ASSISTHEADER = 'e-aiassist-header-text e-assist-view-header';
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
/**
 * The prompts property maps the list of the prompts and binds the data to the suggestions.
 */
class Prompt extends ChildProperty {
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
class AssistView extends ChildProperty {
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
/**
 * Configuration settings for rendering Syncfusion Speech-to-Text in the AssistView footer.
 * This property holds the settings required to initialize and display the Speech-to-Text component.
 *
 */
class SpeechToTextSettings extends ChildProperty {
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
/**
 * Represents settings for managing file attachments in the AI Assist View.
 * Includes configuration for URLs, file types, and size limitations.
 */
class AttachmentSettings extends ChildProperty {
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
/**
 * The promptToolbarSettings property maps the list of the promptToolbarSettings and binds the data to the prompt.
 */
class PromptToolbarSettings extends ChildProperty {
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
/**
 * The responseToolbarSettings property maps the list of the responseToolbarSettings and binds the data to the output items.
 */
class ResponseToolbarSettings extends ChildProperty {
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
/**
 * Represents a toolbar item model in the AIAssistview component.
 */
class FooterToolbarSettings extends ChildProperty {
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
let AIAssistView = class AIAssistView extends AIAssistBase {
    /**
     * Constructor for creating the component
     *
     * @param {AIAssistViewModel} options - Specifies the AIAssistViewModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.toolbarItems = [];
        this.displayContents = [];
        this.preTagElements = [];
        this.uploadedFiles = [];
        this.sendToolbarItem = null;
        this.clearToolbarItem = null;
        this.attachmentToolbarItem = null;
        this.speechToTextToolbarItem = null;
        this.latestResponseMinHeight = null;
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
    setupViewportFilling() {
        if (!this.contentWrapper || this.prompts.length === 0) {
            return;
        }
        const lastIndex = this.prompts.length - 1;
        const allResponseItems = Array.from(this.contentWrapper.querySelectorAll('.e-output-container[id^="e-response-item_"]'));
        // Set auto for all previous .e-output-container (as in example)
        for (let i = 0; i < allResponseItems.length; i++) {
            const index = parseInt(allResponseItems[i].id.split('_')[1], 10);
            if (index < lastIndex) {
                allResponseItems[i].style.minHeight = 'auto';
                const footerEle = allResponseItems[i].querySelector('.e-content-footer');
                if (footerEle) {
                    footerEle.classList.remove('e-assist-toolbar-active');
                }
            }
        }
        // Compute dynamic min-height based on viewport and fixed chrome (header/footer/paddings)
        const contentWrapperHeight = this.contentWrapper.clientHeight;
        const promptEle = this.contentWrapper.querySelector(`#e-prompt-item_${lastIndex}`);
        const promptHeight = promptEle ? promptEle.offsetHeight : 0;
        // Get the actual height of uploaded files if they exist
        const promptFilesEle = promptEle ? promptEle.querySelector('.e-prompt-uploaded-files') : null;
        const promptFilesHeight = promptFilesEle ? promptFilesEle.offsetHeight : 0;
        // Get the actual height of prompt toolbar if it exists
        const promptToolbarEle = promptEle ? promptEle.querySelector('.e-prompt-toolbar') : null;
        const promptToolbarHeight = promptToolbarEle ? promptToolbarEle.offsetHeight : 0;
        // Get the actual height of response toolbar if it exists
        const lastResponseEle = this.contentWrapper.querySelector(`#e-response-item_${lastIndex}`);
        const responseToolbarEle = lastResponseEle ? lastResponseEle.querySelector('.e-response-toolbar') : null;
        const responseToolbarHeight = responseToolbarEle ? responseToolbarEle.offsetHeight : 0;
        // Check if suggestions are visible - if so, reserve space for them
        const suggestionsHeight = (this.suggestionsElement && !this.suggestionsElement.hidden) ?
            this.suggestionsElement.offsetHeight : 0;
        let scrollToBottomBtnHeight = 0;
        if (this.downArrowIcon.element) {
            scrollToBottomBtnHeight = this.downArrowIcon.element.offsetHeight;
        }
        // Calculate minHeight to fill the content wrapper viewport completely
        const dynamicMinHeight = Math.max(160, contentWrapperHeight - promptHeight - promptFilesHeight - promptToolbarHeight -
            responseToolbarHeight - suggestionsHeight - scrollToBottomBtnHeight);
        this.latestResponseMinHeight = dynamicMinHeight;
        // Apply to the actual latest response container if available; otherwise apply to loading skeleton
        if (lastResponseEle) {
            lastResponseEle.style.minHeight = `${dynamicMinHeight}px`;
        }
        else if (this.skeletonContainer) {
            // Ensure the loader occupies the viewport so previous chats don't remain visible while loading
            this.skeletonContainer.style.minHeight = `${dynamicMinHeight}px`;
        }
    }
    renderContentElement() {
        if (this.enableScrollToBottom) {
            const scrollDownButton = this.createElement('button', { id: `${this.element.id}-scrollDownButton`, className: 'e-scroll-down-btn' });
            this.downArrowIcon = new Fab({
                iconCss: 'e-icons e-assist-scroll-down',
                position: 'BottomRight',
                target: this.outputElement.parentElement,
                isPrimary: false,
                visible: false
            });
            this.downArrowIcon.appendTo(scrollDownButton);
        }
    }
    handleScroll() {
        const atBottom = this.checkScrollAtBottom(this.contentWrapper, 70);
        this.toggleScrollIcon(atBottom);
    }
    // Toggle button visibility (show if not at bottom and enableScrollToBottom=true)
    toggleScrollIcon(atBottom) {
        if (this.isResponseRequested || !this.enableScrollToBottom || !this.downArrowIcon) {
            return;
        }
        this.downArrowIcon.visible = !atBottom;
        this.downArrowIcon.dataBind();
    }
    // Click handler to scroll to bottom
    scrollBtnClick() {
        if (this.enableScrollToBottom) {
            this.scrollToBottom();
        }
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    getDirective() {
        return 'EJS-AIASSISTVIEW';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'aiassistview';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    render() {
        this.initializeLocale();
        this.renderPromptView();
    }
    renderPromptView() {
        this.setDimension(this.element, this.width, this.height);
        this.renderViews();
        this.renderToolbar();
        this.updateFooterElementClass();
        this.wireEvents();
    }
    renderToolbar() {
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
    }
    renderViews() {
        this.assistViewTemplateIndex = -1;
        this.aiAssistViewRendered = false;
        this.isAssistView = false;
        this.isOutputRenderingStop = false;
        this.isResponseRequested = false;
        this.renderViewSections(this.element, 'e-view-header', 'e-view-content');
        let isAssistViewAssigned = false;
        let assistView;
        let customViewTemplate;
        let customViewCount = 1;
        if (this.views.length > 0) {
            for (let index = 0; index < this.views.length; index++) {
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
    }
    renderHeaderToolbar() {
        this.toolbar = new Toolbar({
            items: this.toolbarItems,
            height: '100%',
            enableRtl: this.enableRtl,
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (this.toolbarSettings.itemClicked) {
                    this.toolbarSettings.itemClicked.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.htmlAttributes) {
                        const currentIndex = parseInt(args.item.htmlAttributes['data-index'].split(this.element.id + '_view_')[1], 10);
                        if (currentIndex !== this.activeView) {
                            const prevOnChange = this.isProtectedOnChange;
                            this.isProtectedOnChange = true;
                            const previousIndex = this.getIndex(this.activeView);
                            this.activeView = parseInt(args.item.htmlAttributes['data-index'].split(this.element.id + '_view_')[1], 10);
                            this.updateActiveView(previousIndex);
                            this.isProtectedOnChange = prevOnChange;
                        }
                    }
                }
            }
        });
        this.toolbarHeader = this.element.querySelector('.e-view-header');
        const toolbarEle = this.createElement('div');
        this.toolbar.appendTo(toolbarEle);
        this.toolbar.element.setAttribute('aria-label', 'assist-view-toolbar-header');
        this.toolbarHeader.appendChild(toolbarEle);
    }
    updateHeaderToolbar() {
        if (this.toolbarSettings.items.length > 0) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const pushToolbar = this.toolbarSettings.items.map((item) => ({
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
            }));
            this.toolbarItems = [...this.toolbarItems, ...pushToolbar];
        }
    }
    getIndex(currentIndex) {
        return (((currentIndex) > (this.views.length - (this.isAssistView ? 1 : 0))) || (currentIndex < 0)) ?
            0 : currentIndex;
    }
    updateActiveView(previousIndex) {
        const activeViewIndex = this.getIndex(this.activeView);
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
    }
    appendView(activeViewIndex) {
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
    }
    removePreviousView(previousIndex, activeViewIndex) {
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
    }
    renderDefaultView() {
        const viewWrapper = this.element.querySelector('.e-view-content');
        this.createViewComponents(viewWrapper);
        this.contentWrapper = this.element.querySelector('.e-views');
        this.contentWrapper.setAttribute('data-index', this.element.id + '_view_0');
        const contentContainer = this.element.querySelector('.e-view-container');
        this.content = this.getElement('contentContainer');
        this.getFooter();
        this.updateFooterClass(this.footerTemplate);
        this.renderContent();
        this.renderAssistViewFooter();
        this.updateBannerView(contentContainer);
        contentContainer.append(this.content);
        this.checkIsScrollable();
    }
    checkIsScrollable() {
        if (this.enableScrollToBottom) {
            this.downArrowIcon.visible = this.contentWrapper.scrollHeight > this.contentWrapper.clientHeight;
        }
    }
    initializeLocale() {
        this.l10n = new L10n('aiassistview', {
            stopResponseText: 'Stop Responding',
            fileSizeFailure: 'Upload failed: {0} files exceeded the maximum size',
            fileCountFailure: 'Upload limit reached: Maximum {0} files allowed. Remove extra files to proceed uploading',
            send: 'Send',
            attachments: 'Attach File',
            clear: 'Clear'
        }, this.locale);
        this.l10n.setLocale(this.locale);
    }
    toggleStopRespondingButton(show) {
        const sendIconClass = 'e-assist-send';
        const stopIconClass = 'e-assist-stop';
        const stopTooltip = this.l10n.getConstant('stopResponseText');
        if (!this.footerTemplate) {
            const currentIconClass = show ? sendIconClass : stopIconClass;
            const newIconClass = show ? stopIconClass : sendIconClass;
            const currentItem = this.footerToolbarEle.items.find((item) => item.prefixIcon === `e-icons ${currentIconClass}`);
            const itemIndex = this.footerToolbarEle.items.indexOf(currentItem);
            const currentToolbarItemElement = this.footerToolbarEle.element.querySelector(`.e-tbar-btn .${currentIconClass}`) ?
                this.footerToolbarEle.element.querySelector(`.e-tbar-btn .${currentIconClass}`).closest('.e-toolbar-item') : null;
            if (itemIndex !== -1 && currentItem && currentToolbarItemElement) {
                const newItem = {
                    prefixIcon: `e-icons ${newIconClass}`,
                    align: 'Right',
                    tooltipText: show ? stopTooltip : undefined
                };
                this.footerToolbarEle.addItems([newItem], itemIndex);
                this.footerToolbarEle.removeItems(currentToolbarItemElement);
            }
            this.refreshTextareaUI();
        }
        else {
            const currentIcon = this.footer.querySelector(`.${show ? sendIconClass : stopIconClass}`);
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
    }
    hasStopResponseButton() {
        if (!this.footerToolbarEle && this.footerTemplate) {
            return this.footer.querySelector('.e-assist-stop') ? true : false;
        }
        else if (this.footerToolbarEle) {
            return this.footerToolbarEle.element.querySelector('.e-assist-stop') ? true : false;
        }
        return false;
    }
    renderContent() {
        this.renderOutputContent();
        this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
        this.renderContentElement();
        if (this.outputElement) {
            this.renderSkeleton();
        }
    }
    renderOutputContent(isMethodCall) {
        this.outputElement = this.getElement('outputElement');
        if (this.responseToolbarSettings.items.length === 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.responseToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy', cssClass: 'check' },
                { iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
                { iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        if (this.prompts) {
            this.prompts.forEach((prompt, i) => {
                this.renderOutputContainer(SanitizeHtmlHelper.sanitize(prompt.prompt), SanitizeHtmlHelper.sanitize(prompt.response), prompt.attachedFiles, i, undefined, true);
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
    }
    updateBannerView(contentContainer) {
        if (this.prompts.length === 0) {
            this.renderBannerView(this.bannerTemplate, contentContainer, 'bannerTemplate');
        }
    }
    renderAssistViewFooter() {
        const textareaAndIconsWrapper = this.createElement('div', { attrs: { class: 'e-textarea-icons-wrapper' } });
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
            const hiddenTextarea = this.createElement('textarea', {
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
            const footerIconsWrapper = this.createElement('div', { attrs: { class: 'e-footer-icons-wrapper' } });
            this.renderFooterToolbar(footerIconsWrapper);
            textareaAndIconsWrapper.appendChild(footerIconsWrapper);
            this.footer.appendChild(textareaAndIconsWrapper);
            this.footer.classList.add('e-footer-focus-wave-effect');
            this.refreshTextareaUI();
            this.pushToUndoStack(this.prompt);
        }
    }
    renderFooterToolbar(container) {
        const toolbarItems = [];
        const customItems = this.footerToolbarSettings.items || [];
        for (const customItem of customItems) {
            const isSttToolbarItem = customItem.iconCss.indexOf('e-assist-speech-to-text') !== -1;
            const mappedItem = {
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
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (this.footerToolbarSettings.itemClick) {
                    this.footerToolbarSettings.itemClick.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    switch (args.item.prefixIcon) {
                        case 'e-icons e-assist-send':
                            if (!this.isResponseRequested && !args.item.disabled) {
                                this.onSendIconClick();
                            }
                            break;
                        case 'e-icons e-assist-stop':
                            this.respondingStopper(args.originalEvent);
                            break;
                        case 'e-icons e-assist-clear-icon':
                            this.clearIconHandler();
                            break;
                        case 'e-icons e-assist-attachment-icon':
                            if (this.uploaderObj && this.attachmentToolbarItem) {
                                let uploaderElement = this.footerToolbarEle.element.querySelector('.e-assist-file-upload');
                                if (!uploaderElement) {
                                    this.updateAttachmentElement();
                                    uploaderElement = this.footerToolbarEle.element.querySelector('.e-assist-file-upload');
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
        const toolbarContainer = this.createElement('div');
        this.footerToolbarEle.appendTo(toolbarContainer);
        this.footerToolbarEle.element.setAttribute('aria-label', 'assist-footer-toolbar');
        container.appendChild(toolbarContainer);
        this.updateAttachmentElement();
        this.renderSpeechToText();
    }
    isDuplicatedItem(iconCss, toolbarItems) {
        for (const item of toolbarItems) {
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
    }
    updateAttachmentElement() {
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
    }
    renderSpeechToText() {
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
                onStart: (args) => {
                    if (this.speechToTextSettings.onStart) {
                        this.speechToTextSettings.onStart.call(this, args);
                    }
                },
                onStop: (args) => {
                    if (this.speechToTextSettings.onStop) {
                        this.speechToTextSettings.onStop.call(this, args);
                    }
                },
                transcriptChanged: (args) => {
                    const prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    const value = this.prompt.length > 0 ? this.prompt + ' ' : '';
                    if (args.isInterimResult) {
                        this.editableTextarea.innerHTML = value + SanitizeHtmlHelper.sanitize(args.transcript);
                    }
                    else {
                        const prevPrompt = this.prompt;
                        this.prompt = value + SanitizeHtmlHelper.sanitize(args.transcript);
                        this.editableTextarea.innerHTML = this.prompt;
                        this.speechToTextObj.transcript = '';
                        this.editableTextarea.focus();
                        this.setFocusAtEnd(this.editableTextarea);
                        this.triggerPromptChanged(event, prevPrompt);
                    }
                    this.refreshTextareaUI();
                    // Debounced push to undo stack
                    this.scheduleUndoPush();
                    this.redoStack = [];
                    this.speechToTextSettings.transcript = args.transcript;
                    if (this.speechToTextSettings.transcriptChanged) {
                        this.speechToTextSettings.transcriptChanged.call(this, args);
                    }
                    this.isProtectedOnChange = prevOnChange;
                },
                onError: (args) => {
                    if (this.speechToTextSettings.onError) {
                        this.speechToTextSettings.onError.call(this, args);
                    }
                }
            });
            const speechToTextButton = this.footerToolbarEle.element.querySelector('.e-assistview-speech-to-text');
            if (speechToTextButton) {
                this.speechToTextObj.appendTo(speechToTextButton);
            }
        }
    }
    renderAttachmentIcon() {
        this.dropArea = this.createElement('div', { attrs: { class: 'e-assist-drop-area' } });
        this.footer.prepend(this.dropArea);
        const attachmentIcon = this.footerToolbarEle.element.querySelector('.e-assist-attachment-icon');
        const uploaderElement = this.createElement('input', { attrs: { class: 'e-assist-file-upload', type: 'file', name: 'UploadFiles', id: 'fileUpload' } });
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
            selected: (args) => {
                const oversized = args.filesData.filter((file) => file.status === this.uploaderObj.l10n.getConstant('invalidMaxFileSize') && file.statusCode === '0');
                if (oversized.length) {
                    this.showFailureAlert('fileSizeFailure', oversized.length, 'e-size-failure');
                    uploaderElement.value = '';
                }
                const totalSelected = args.filesData.length + this.uploadedFiles.length;
                if (totalSelected > this.attachmentSettings.maximumCount) {
                    args.cancel = true;
                    this.showFailureAlert('fileCountFailure', this.attachmentSettings.maximumCount, 'e-count-failure');
                    uploaderElement.value = '';
                    return;
                }
            }
        });
        this.uploaderObj.appendTo(uploaderElement);
    }
    showFailureAlert(localeConstantKey, fileCount, failureType) {
        let failureMessage = this.l10n.getConstant(localeConstantKey).replace('{0}', fileCount.toString());
        if (fileCount === 1) {
            failureMessage = failureMessage.replace('files', 'file');
        }
        this.createFailureAlert(failureMessage, failureType);
    }
    createFailureAlert(failureMessage, failureType) {
        const failureAlert = this.renderFailureAlert(this.viewWrapper, failureMessage, failureType, 'e-assist-circle-close', 'e-assist-clear-icon');
        if (this.viewWrapper.contains(this.footer)) {
            this.viewWrapper.insertBefore(failureAlert, this.footer);
        }
        failureAlert.classList.add('e-show');
        setTimeout(() => {
            this.handleFailureAlertRemove(this.viewWrapper, failureAlert);
        }, 3000);
    }
    onUploadStart(args) {
        this.trigger('beforeAttachmentUpload', args);
        this.uploadedFiles.push(args.fileData);
        const fileItem = this.createFileItem(args.fileData, true);
        this.dropArea.appendChild(fileItem);
    }
    onUploadProgress(args) {
        const uploadProgress = args.e.loaded / args.e.total * 100;
        const progressFill = this.footer.querySelector(`#e-assist-progress-${CSS.escape(args.file.name)}`);
        if (progressFill) {
            progressFill.style.width = `${uploadProgress}%`;
        }
    }
    onUploadSuccess(args) {
        if (args.operation === 'upload') {
            this.trigger('attachmentUploadSuccess', args);
            const progressFill = this.footer.querySelector(`#e-assist-progress-${CSS.escape(args.file.name)}`);
            if (progressFill) {
                progressFill.style.width = '100%';
                this.cleanupFileItem(args.file.name);
            }
            const progressBar = this.footer.querySelector('.e-assist-progress-fill');
            if (!progressBar) {
                this.checkAndActivateSendIcon();
            }
        }
        else if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
    }
    cleanupFileItem(fileName) {
        const fileItem = this.footer.querySelector(`#e-assist-progress-${CSS.escape(fileName)}`);
        if (fileItem) {
            fileItem.parentElement.remove();
        }
    }
    onUploadFailure(args) {
        if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
        else {
            this.trigger('attachmentUploadFailure', args);
            this.uploaderObj.remove(args.file);
            this.uploadedFiles = this.uploadedFiles.filter((file) => file.name !== args.file.name);
            const progressFill = this.footer.querySelector(`#e-assist-progress-${CSS.escape(args.file.name)}`);
            if (progressFill) {
                progressFill.style.width = '100%';
                progressFill.classList.add('e-assist-upload-failed');
            }
        }
    }
    createFileItem(fileData, isForFooter) {
        const fileItem = this.createElement('div', { className: 'e-assist-uploaded-file-item' });
        const fileIcon = this.createElement('div', { className: 'e-icons e-assist-file-format-icon' });
        const fileDetails = this.createElement('div', { className: 'e-assist-file-details' });
        const fileName = this.createElement('span', { className: 'e-assist-file-name', innerHTML: fileData.name });
        const fileSize = this.createElement('span', { className: 'e-assist-file-size', innerHTML: `${(fileData.size / 1024).toFixed(2)} KB` });
        const progressBar = this.createElement('div', { className: 'e-assist-progress-bar' });
        const progressFill = this.createElement('div', { id: `e-assist-progress-${fileData.name}`, className: 'e-assist-progress-fill' });
        progressBar.appendChild(progressFill);
        fileDetails.append(fileName, fileSize);
        fileItem.append(fileIcon, fileDetails);
        let closeButton;
        if (isForFooter) {
            closeButton = this.createElement('span', { attrs: { class: 'e-icons e-assist-clear-icon', role: 'button', 'aria-label': 'Clear file', tabindex: '-1' } });
            EventHandler.add(closeButton, 'click', () => this.handleRemoveUploadedFile(closeButton, fileData, fileItem));
            fileItem.append(closeButton);
        }
        fileItem.append(progressBar);
        EventHandler.add(fileItem, 'click', (event) => {
            if (closeButton && (event.target === closeButton || event.target.classList.contains('e-assist-clear-icon'))) {
                return;
            }
            this.handleAttachmentPreview(fileData);
        });
        return fileItem;
    }
    handleAttachmentPreview(file) {
        const eventArgs = {};
        if (this.attachmentSettings.attachmentClick) {
            this.attachmentSettings.attachmentClick.call(this, eventArgs);
        }
    }
    handleRemoveUploadedFile(closeButton, fileData, fileItem) {
        this.uploaderObj.remove(fileData);
        this.uploadedFiles = this.uploadedFiles.filter((file) => file.name !== fileData.name);
        EventHandler.remove(closeButton, 'click', this.handleRemoveUploadedFile);
        fileItem.remove();
        this.checkAndActivateSendIcon();
    }
    applyPromptChange(newState, oldState, event) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = this.editableTextarea.innerHTML = newState.content;
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
        this.triggerPromptChanged(event, oldState.content);
    }
    handleInput(event) {
        const textareaEle = event.target;
        const isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        const textContent = textareaEle.innerHTML;
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const prevPrompt = this.prompt;
        this.prompt = SanitizeHtmlHelper.sanitize(textContent);
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.editableTextarea.focus();
        // Debounced push to undo stack
        this.scheduleUndoPush();
        this.redoStack = [];
        this.triggerPromptChanged(event, prevPrompt);
    }
    triggerPromptChanged(event, prevPrompt) {
        const eventArgs = {
            value: this.prompt,
            previousValue: prevPrompt,
            event: event,
            element: (event && event.currentTarget) || this.editableTextarea
        };
        this.trigger('promptChanged', eventArgs);
    }
    footerKeyHandler(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('e-tbar-btn') && targetElement.querySelector('.e-assist-attachment-icon')) {
            return;
        }
        this.keyHandler(e, 'footer');
    }
    bindScroll() {
        if (this.contentWrapper) {
            EventHandler.add(this.contentWrapper, 'scroll', this.handleScroll, this);
        }
        if (this.enableScrollToBottom && this.downArrowIcon && this.downArrowIcon.element) {
            EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        }
    }
    unBindScroll() {
        if (this.contentWrapper) {
            EventHandler.remove(this.contentWrapper, 'scroll', this.handleScroll);
        }
        if (this.enableScrollToBottom && this.downArrowIcon && this.downArrowIcon.element) {
            EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        }
    }
    wireEvents() {
        this.wireFooterEvents(this.footerTemplate);
        if (this.editableTextarea) {
            const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
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
    }
    unWireEvents() {
        this.unWireFooterEvents(this.footerTemplate);
        if (this.editableTextarea) {
            const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.remove(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown);
                EventHandler.remove(footerIconsWrapper, 'click', this.onFooterIconsClick);
                EventHandler.remove(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut);
            }
        }
        this.detachCodeCopyEventHandler();
        this.unBindScroll();
    }
    onFocusEditableTextarea() {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
        this.toggleClearIcon();
    }
    onBlurEditableTextarea(e) {
        const relatedTargetEle = e.relatedTarget;
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
    }
    detachCodeCopyEventHandler() {
        this.preTagElements.forEach(({ preTag, handler }) => {
            const copyIcon = preTag.querySelector('.e-code-copy');
            EventHandler.remove(copyIcon, 'click', handler);
        });
        this.preTagElements = [];
    }
    keyHandler(event, value) {
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
    }
    clearIconHandler() {
        const prevOnChange = this.isProtectedOnChange;
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
    }
    respondingStopper(event) {
        this.isOutputRenderingStop = true;
        this.isResponseRequested = false;
        this.lastStreamPrompt = '';
        if (this.outputElement.hasChildNodes) {
            const skeletonElement = this.element.querySelector('.e-loading-body');
            if (skeletonElement) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
        }
        this.toggleStopRespondingButton(false);
        const promptIndex = this.prompts ? this.prompts.length - 1 : -1;
        const eventArgs = {
            event: event,
            prompt: promptIndex >= 0 ? this.prompts[parseInt(promptIndex.toString(), 10)].prompt : '',
            dataIndex: this.prompts ? this.prompts.length - 1 : -1
        };
        this.trigger('stopRespondingClick', eventArgs);
        const outputContainer = this.element.querySelector(`#e-response-item_${promptIndex}`);
        if (outputContainer) {
            const outputContentBodyEle = this.element.querySelector(`#e-response-item_${this.prompts.length - 1}`).querySelector('.e-content-body');
            if (outputContentBodyEle) {
                this.renderPreTag(outputContentBodyEle);
            }
        }
    }
    onSuggestionClick(e) {
        this.suggestionsElement.hidden = true;
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = e.target.innerText;
        this.isProtectedOnChange = prevOnChange;
        this.onSendIconClick();
    }
    onSendIconClick() {
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
        const eventArgs = {
            cancel: false,
            responseToolbarItems: this.responseToolbarSettings.items,
            prompt: this.prompt,
            promptSuggestions: this.promptSuggestions,
            attachedFiles: [...this.uploadedFiles]
        };
        this.clearUploadedFiles();
        if (!this.footerTemplate) {
            const prevOnChange = this.isProtectedOnChange;
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
    }
    clearUploadedFiles() {
        this.uploadedFiles = [];
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
        }
    }
    addPrompt() {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompts = [...this.prompts, { prompt: this.prompt, response: '', isResponseHelpful: null, attachedFiles: this.uploadedFiles }];
        this.isProtectedOnChange = prevOnChange;
    }
    getContextObject(templateName, contentElement, index, arrayPosition) {
        let template;
        let context = {};
        const contextIndex = index >= 0 ? index : -1;
        const contextPrompt = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].prompt : '';
        const contextOutput = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].response : '';
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
    }
    createOutputElement() {
        this.outputSuggestionEle = this.createElement('div', { attrs: { id: `e-prompt-item_${this.prompts.length - 1}`, class: `e-prompt-container ${this.promptItemTemplate ? 'e-prompt-item-template' : ''}` } });
        this.renderPrompt(this.prompt, this.prompts.length - 1, this.uploadedFiles);
        this.outputElement.append(this.outputSuggestionEle, this.skeletonContainer);
        this.skeletonContainer.hidden = false;
    }
    renderOutputContainer(promptText, outputText, attachedFiles, index, isMethodCall, isFinalUpdate) {
        const outputContainer = this.createElement('div', { attrs: Object.assign({ id: `e-response-item_${index}`, class: `e-output-container ${this.responseItemTemplate ? 'e-response-item-template' : ''}` }, (this.latestResponseMinHeight != null ?
                { style: `min-height:${this.latestResponseMinHeight}px` } : {})) });
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
    }
    renderOutput(outputContainer, promptText, outputText, attachedFiles, isMethodCall, index, isFinalUpdate) {
        const promptIcon = this.createElement('span', {
            className: 'e-output-icon e-icons ' + (this.responseIconCss || (this.isAssistView && this.views[0].iconCss) || 'e-assistview-icon')
        });
        const aiOutputEle = this.createElement('div', { className: 'e-output' });
        if (!this.aiAssistViewRendered || isMethodCall) {
            if (!isNullOrUndefined(promptText) || (attachedFiles && attachedFiles.length > 0)) {
                this.outputSuggestionEle = this.createElement('div', { attrs: { id: `e-prompt-item_${index}`, class: `e-prompt-container ${this.promptItemTemplate ? 'e-prompt-item-template' : ''}` } });
                this.renderPrompt(promptText, index, attachedFiles);
            }
        }
        const lastPrompt = { prompt: promptText, response: outputText };
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
    }
    renderOutputTextContainer(response, aiOutputEle, index, isMethodCall, isFinalUpdate) {
        if (this.contentFooterEle) {
            this.contentFooterEle.classList.remove('e-assist-toolbar-active');
        }
        this.outputContentBodyEle = this.createElement('div', { attrs: { class: 'e-content-body', tabindex: '0' } });
        if (!isMethodCall) {
            if (!this.enableStreaming || isFinalUpdate) {
                const htmlResponse = MarkdownConverter.toHtml(response);
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
    }
    renderPreTag(outputContentEle) {
        const preTags = Array.from(outputContentEle.querySelectorAll('pre'));
        preTags.forEach((preTag) => {
            const copyIcon = document.createElement('span');
            copyIcon.className = 'e-icons e-code-copy e-assist-copy';
            preTag.insertBefore(copyIcon, preTag.firstChild);
            this.preTagElements.push({ preTag, handler: this.getCopyHandler(preTag) });
            EventHandler.add(copyIcon, 'click', this.preTagElements[this.preTagElements.length - 1].handler);
        });
    }
    getCopyHandler(preTag) {
        return function () {
            const preText = preTag.innerText;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.navigator.clipboard.writeText(preText);
            const copyIcon = preTag.querySelector('.e-code-copy');
            copyIcon.className = 'e-icons e-code-copy e-assist-check';
            setTimeout(() => {
                copyIcon.className = 'e-icons e-code-copy e-assist-copy';
            }, 1000);
        };
    }
    renderOutputToolbarItems(index, isFinalUpdate) {
        this.contentFooterEle = this.createElement('div', { className: 'e-content-footer e-assist-toolbar-active' });
        const footerContent = this.createElement('div');
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
        this.responseToolbarEle.element.setAttribute('aria-label', `response-toolbar-${index}`);
        this.contentFooterEle.appendChild(footerContent);
    }
    renderResponseToolbar(index) {
        const pushToolbar = this.responseToolbarSettings.items.map((item) => {
            const toolbarItem = {
                type: item.type,
                visible: item.visible,
                disabled: item.disabled,
                tooltipText: item.tooltip,
                template: item.template,
                prefixIcon: item.iconCss,
                text: item.text,
                cssClass: item.cssClass,
                align: item.align,
                width: this.responseToolbarSettings.width,
                tabIndex: item.tabIndex
            };
            if (toolbarItem.prefixIcon === 'e-icons e-assist-like' && this.prompts[parseInt(index.toString(), 10)].isResponseHelpful) {
                toolbarItem.prefixIcon = 'e-icons e-assist-like-filled';
            }
            else if (toolbarItem.prefixIcon === 'e-icons e-assist-dislike' && this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false) {
                toolbarItem.prefixIcon = 'e-icons e-assist-dislike-filled';
            }
            return toolbarItem;
        });
        this.responseToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: index
                };
                if (this.responseToolbarSettings.itemClicked) {
                    this.responseToolbarSettings.itemClicked.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    this.handleItemClick(args, index);
                }
            }
        });
    }
    handleItemClick(args, index) {
        if (args.item.prefixIcon === 'e-icons e-assist-copy') {
            this.getClipBoardContent(SanitizeHtmlHelper.sanitize(this.prompts[parseInt(index.toString(), 10)].response));
            args.item.prefixIcon = 'e-icons e-assist-check';
            this.responseToolbarEle.dataBind();
            setTimeout(() => {
                args.item.prefixIcon = 'e-icons e-assist-copy';
                this.responseToolbarEle.dataBind();
            }, 1000);
        }
        const icon = args.item.prefixIcon;
        const isLikeInteracted = icon === 'e-icons e-assist-like-filled' || icon === 'e-icons e-assist-like';
        const isDislikeInteracted = icon === 'e-icons e-assist-dislike-filled' || icon === 'e-icons e-assist-dislike';
        if (isLikeInteracted || isDislikeInteracted) {
            let isHelpful = null;
            if (isLikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === true ? null : true;
            }
            else if (isDislikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false ? null : false;
            }
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompts[parseInt(index.toString(), 10)].isResponseHelpful = isHelpful;
            const promptItem = this.prompts[parseInt(index.toString(), 10)];
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const controlParentItems = args.item.controlParent.items;
            const likeIndex = controlParentItems.findIndex((it) => it.prefixIcon === 'e-icons e-assist-like' || it.prefixIcon === 'e-icons e-assist-like-filled');
            const dislikeIndex = controlParentItems.findIndex((it) => it.prefixIcon === 'e-icons e-assist-dislike' || it.prefixIcon === 'e-icons e-assist-dislike-filled');
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
    }
    renderPrompt(promptText, promptIndex, attachedFiles) {
        const outputPrompt = this.createElement('div', { attrs: { class: 'e-prompt-text', tabindex: '0' } });
        const promptFiles = this.createElement('div', { attrs: { class: 'e-prompt-uploaded-files' } });
        const promptContent = this.createElement('div', { className: 'e-prompt-content' });
        const promptDetails = this.createElement('div', { className: 'e-prompt-details' });
        const promptToolbarContainer = this.createElement('div', { className: 'e-prompt-toolbar' });
        const promptToolbar = this.createElement('div');
        const userIcon = this.createElement('span', { className: this.promptIconCss ? 'e-prompt-icon e-icons '
                + this.promptIconCss : '' });
        if (this.promptItemTemplate) {
            this.getContextObject('promptItemTemplate', this.outputSuggestionEle, promptIndex);
        }
        else {
            outputPrompt.innerHTML = promptText;
            const uploadedFiles = attachedFiles || this.uploadedFiles;
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((file) => {
                    promptFiles.appendChild(this.createFileItem(file, false));
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
    }
    renderPromptToolbar(element, promptIndex) {
        let pushToolbar = [];
        if (this.promptToolbarSettings.items.length === 0) {
            pushToolbar = [
                { prefixIcon: 'e-icons e-assist-edit', tooltipText: 'Edit' },
                { prefixIcon: 'e-icons e-assist-copy', tooltipText: 'Copy' }
            ];
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.promptToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-edit', tooltip: 'Edit' },
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        else {
            pushToolbar = this.promptToolbarSettings.items.map((item) => ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: this.promptToolbarSettings.width,
                tabIndex: item.tabIndex
            }));
        }
        this.promptToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: promptIndex
                };
                if (this.promptToolbarSettings.itemClicked) {
                    this.promptToolbarSettings.itemClicked.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.prefixIcon === 'e-icons e-assist-edit') {
                        this.onEditIconClick(promptIndex);
                    }
                    if (args.item.prefixIcon === 'e-icons e-assist-copy') {
                        this.getClipBoardContent(SanitizeHtmlHelper.sanitize(this.prompts[parseInt(promptIndex.toString(), 10)].prompt));
                        args.item.prefixIcon = 'e-icons e-assist-check';
                        this.promptToolbarEle.dataBind();
                        setTimeout(() => {
                            args.item.prefixIcon = 'e-icons e-assist-copy';
                            this.promptToolbarEle.dataBind();
                        }, 1000);
                    }
                }
            }
        });
        this.promptToolbarEle.appendTo(element);
        this.promptToolbarEle.element.setAttribute('aria-label', `prompt-toolbar-${promptIndex}`);
    }
    renderSkeleton() {
        this.skeletonContainer = this.createElement('div', { className: 'e-output-container' });
        const outputViewWrapper = this.createElement('div', { className: 'e-output', styles: 'width: 70%;' });
        const skeletonIconEle = this.createElement('span', { className: 'e-output-icon e-skeleton e-skeleton-text e-shimmer-wave' });
        const skeletonBodyEle = this.createElement('div', { className: 'e-loading-body' });
        const skeletonFooterEle = this.createElement('div', { className: 'e-loading-footer' });
        const [skeletonLine1, skeletonLine2, skeletonLine3] = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 75%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 50%; height: 15px;' })
        ];
        const [footerSkeleton] = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 30px;' })
        ];
        this.appendChildren(skeletonBodyEle, skeletonLine1, skeletonLine2, skeletonLine3);
        skeletonFooterEle.append(footerSkeleton);
        this.appendChildren(outputViewWrapper, skeletonBodyEle, skeletonFooterEle);
        this.appendChildren(this.skeletonContainer, skeletonIconEle, outputViewWrapper);
    }
    onEditIconClick(promptIndex) {
        if (this.editableTextarea) {
            if (this.suggestionsElement) {
                this.suggestionsElement.hidden = true;
            }
            const prevOnChange = this.isProtectedOnChange;
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
    }
    refreshTextareaUI() {
        this.updateHiddenTextarea(this.prompt);
        this.checkAndActivateSendIcon();
        this.updateFooterElementClass();
        this.updateFooterType(this.footerToolbarSettings.toolbarPosition);
        this.toggleClearIcon();
    }
    checkAndActivateSendIcon() {
        if (!this.footerToolbarEle) {
            return;
        }
        const length = this.prompt.length > 0 ? this.prompt.length : this.uploadedFiles.length;
        if (this.sendToolbarItem.prefixIcon === 'e-icons e-assist-send') {
            const sendItem = this.footerToolbarEle.element.querySelector('.e-assist-send');
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
    }
    toggleClearIcon() {
        if (this.clearToolbarItem && this.footerToolbarEle) {
            const isFocused = document.activeElement === this.editableTextarea;
            const hasContent = this.editableTextarea.textContent.length > 0;
            const clearItemElement = this.footerToolbarEle.element.querySelector('.e-toolbar-item .e-icons.e-assist-clear-icon')
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
    }
    updateIcons(newCss, isPromptIconCss = false) {
        let elements;
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
        for (let index = 0; index < (elements && elements.length); index++) {
            removeClass([elements[parseInt(index.toString(), 10)]], elements[parseInt(index.toString(), 10)].classList.toString().trim().split(' '));
            addClass([elements[parseInt(index.toString(), 10)]], newCss.trim().split(' '));
        }
    }
    updateToolbarSettings(previousToolbar) {
        const previousToolbarIndex = 0;
        for (let index = this.views.length; index < this.toolbarItems.length; index++) {
            if (previousToolbar.items[parseInt(previousToolbarIndex.toString(), 10)] === this.toolbarItems[parseInt(index.toString(), 10)]) {
                this.toolbarItems.splice(index, 1);
            }
        }
        this.updateHeaderToolbar();
        this.toolbar.items = this.toolbarItems;
    }
    updateAttachmentToolbarItemInSettings() {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const items = this.footerToolbarSettings.items;
        const attachmentItemIndex = items.findIndex((item) => item.iconCss === 'e-icons e-assist-attachment-icon');
        if (this.enableAttachments && attachmentItemIndex === -1) {
            const attachmentItem = {
                iconCss: 'e-icons e-assist-attachment-icon',
                tooltip: this.l10n.getConstant('attachments'),
                align: 'Right'
            };
            const sendItemIndex = items.findIndex((item) => item.iconCss === 'e-icons e-assist-send');
            items.splice(sendItemIndex !== -1 ? sendItemIndex : items.length, 0, attachmentItem);
        }
        else if (!this.enableAttachments && attachmentItemIndex !== -1) {
            items.splice(attachmentItemIndex, 1);
        }
        this.isProtectedOnChange = prevOnChange;
    }
    updateClearToolbarItemInSettings() {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const items = this.footerToolbarSettings.items;
        const clearItemIndex = items.findIndex((item) => item.iconCss === 'e-icons e-assist-clear-icon');
        if (this.showClearButton && clearItemIndex === -1) {
            const clearItem = {
                iconCss: 'e-icons e-assist-clear-icon',
                tooltip: this.l10n.getConstant('clear'),
                align: 'Right'
            };
            const sendItemIndex = items.findIndex((item) => item.iconCss === 'e-icons e-assist-send');
            items.splice(sendItemIndex !== -1 ? sendItemIndex : items.length, 0, clearItem);
        }
        else if (!this.showClearButton && clearItemIndex !== -1) {
            items.splice(clearItemIndex, 1);
        }
        this.isProtectedOnChange = prevOnChange;
    }
    updateFooterToolbar() {
        const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
        if (footerIconsWrapper) {
            footerIconsWrapper.innerHTML = '';
            this.footerToolbarEle = null;
            this.sendToolbarItem = null;
            this.clearToolbarItem = null;
            this.attachmentToolbarItem = null;
            this.renderFooterToolbar(footerIconsWrapper);
            this.refreshTextareaUI();
        }
    }
    updateResponse(response, index, isFinalUpdate, responseItem) {
        if (!this.responseItemTemplate && responseItem) {
            const outputEle = responseItem.querySelector('.e-output');
            const outputContentBodyEle = responseItem.querySelector('.e-content-body');
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
    }
    streamResponse(response, index) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        let i = 0;
        const words = response.split(' ');
        const wordCount = words.length;
        let lastResponse = '';
        const streamingResponse = () => {
            if (this.isOutputRenderingStop) {
                return;
            }
            if (index >= this.prompts.length) {
                return;
            }
            const responseItem = this.element.querySelector(`#e-response-item_${index}`);
            lastResponse += (i === 0 ? '' : ' ') + words[parseInt(i.toString(), 10)];
            i++;
            if (this.outputElement.querySelector('.e-skeleton')) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
            this.updateResponse(lastResponse, index, i === wordCount, responseItem);
            this.scrollToBottom();
            this.setupViewportFilling();
            if (i < wordCount) {
                setTimeout(() => {
                    streamingResponse();
                }, 15);
            }
            else {
                const isFinalUpdate = lastResponse.length === response.length;
                if (isFinalUpdate && this.hasStopResponseButton()) {
                    this.toggleStopRespondingButton(false);
                }
                this.isResponseRequested = !isFinalUpdate;
            }
        };
        streamingResponse();
        this.isProtectedOnChange = prevOnChange;
    }
    updateBannerTemplate(newTemplate) {
        if (!isNullOrUndefined(newTemplate)) {
            const contentContainer = this.element.querySelector('.e-view-container');
            const existingTemplate = contentContainer.querySelector('.e-banner-view');
            if (existingTemplate) {
                existingTemplate.remove();
            }
            this.updateBannerView(contentContainer);
        }
    }
    updatePromptSuggestionTemplate() {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!this.isOutputRenderingStop) {
            this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
        }
    }
    updateFooterTemplate() {
        this.footer.innerHTML = '';
        this.updateFooterClass(this.footerTemplate);
        this.unWireFooterEvents(this.footerTemplate);
        this.renderAssistViewFooter();
        if (!this.footerTemplate) {
            this.wireFooterEvents(this.footerTemplate);
        }
    }
    updateAttachmentSettings(newAttachment) {
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
    }
    handleSTTDynamicChange(newProp, oldProp) {
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
    }
    updateSpeechToTextSettings(newProps) {
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
    }
    updateLocale() {
        // Update file upload failure locale
        this.l10n.setLocale(this.locale);
        const failureElement = this.viewWrapper.querySelector('.e-upload-failure-alert');
        if (failureElement) {
            const failureMessageEle = failureElement.querySelector('.e-failure-message');
            if (failureMessageEle.classList.contains('e-size-failure')) {
                failureMessageEle.textContent = this.l10n.getConstant('fileSizeFailure');
            }
            else {
                let failureText = this.l10n.getConstant('fileCountFailure');
                failureText = failureText.replace('{0}', this.attachmentSettings.maximumCount.toString());
                if (this.attachmentSettings.maximumCount === 1) {
                    failureText = failureText.replace('files', 'file');
                }
                failureMessageEle.textContent = failureText;
            }
        }
    }
    destroy() {
        super.destroy();
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
    }
    destroyAssistView() {
        const properties = [
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
        for (const prop of properties) {
            const element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    }
    /**
     * Executes the specified prompt in the AIAssistView component. The method accepts a string representing the prompt.
     *
     * @param {string} prompt - The prompt text to be executed. It must be a non-empty string.
     *
     * @returns {void}
     */
    executePrompt(prompt) {
        if (!isNullOrUndefined(prompt) && prompt.trim().length > 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = prompt;
            this.isProtectedOnChange = prevOnChange;
            this.onSendIconClick();
        }
    }
    /**
     * Adds a response to the last prompt or appends a new prompt data in the AIAssistView component.
     *
     * @param {string | Object} outputResponse - The response to be added. Can be a string representing the response or an object containing both the prompt and the response.
     * - If `outputResponse` is a string, it updates the response for the last prompt in the prompts collection.
     * - If `outputResponse` is an object, it can either update the response of an existing prompt if the prompt matches or append a new prompt data.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    addPromptResponse(outputResponse, isFinalUpdate = true) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (!this.isOutputRenderingStop) {
            const responseItem = this.element.querySelector(`#e-response-item_${this.prompts.length - 1}`);
            let lastPrompt = this.prompts[this.prompts.length - 1];
            const processResponse = (rawResponse) => {
                if (this.enableStreaming) {
                    isFinalUpdate = false;
                    const htmlResponse = MarkdownConverter.toHtml(rawResponse);
                    lastPrompt.response = htmlResponse;
                    this.streamResponse(lastPrompt.response, this.prompts.length - 1);
                }
                else {
                    lastPrompt.response = rawResponse;
                    this.updateResponse(lastPrompt.response, this.prompts.length - 1, isFinalUpdate, responseItem);
                }
            };
            if (typeof outputResponse === 'string') {
                if (!this.isResponseRequested) {
                    this.prompts = [...this.prompts, { prompt: null, response: null, isResponseHelpful: null, attachedFiles: null }];
                    lastPrompt = this.prompts[this.prompts.length - 1];
                }
                processResponse(outputResponse);
            }
            if (typeof outputResponse === 'object') {
                const tPrompt = {
                    prompt: outputResponse.prompt,
                    attachedFiles: outputResponse.attachedFiles,
                    response: outputResponse.response,
                    isResponseHelpful: isNullOrUndefined(outputResponse.isResponseHelpful) ? null :
                        outputResponse.isResponseHelpful
                };
                if (this.prompt === tPrompt.prompt || this.lastStreamPrompt === tPrompt.prompt) {
                    lastPrompt.attachedFiles = tPrompt.attachedFiles;
                    lastPrompt.isResponseHelpful = tPrompt.isResponseHelpful;
                    processResponse(tPrompt.response);
                }
                else {
                    this.prompts = [...this.prompts, tPrompt];
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
    }
    /**
     * Scrolls the view to the bottom to display the most recent response in the AIAssistView component.
     *
     * This method programmatically scrolls the view to the bottom,
     * typically used when new responses are added or to refocus on the latest response.
     *
     * @returns {void}
     */
    scrollToBottom() {
        this.updateScroll(this.contentWrapper);
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistViewModel} newProp - Specifies new properties
     * @param  {AIAssistViewModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
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
                    const suggestionHeaderElem = this.element.querySelector('.e-suggestions .e-suggestion-header');
                    if (!suggestionHeaderElem) {
                        this.suggestionsElement.append(this.suggestionHeader);
                    }
                    break;
                }
                case 'activeView': {
                    const previousViewIndex = this.getIndex(oldProp.activeView);
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
class MessageStatus extends ChildProperty {
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
/**
 * Represents a user model for a messages in the chatUI component.
 */
class User extends ChildProperty {
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
/**
 * Configures the toolbar displayed on each message in the Chat UI component.
 */
class MessageToolbarSettings extends ChildProperty {
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
/**
 *  Represents a model for a reply messages in the chatUI component.
 */
class MessageReply extends ChildProperty {
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
/**
 *  Represents a model for a messages in the chatUI component.
 */
class Message extends ChildProperty {
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
class FileAttachmentSettings extends ChildProperty {
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
let ChatUI = class ChatUI extends InterActiveChatBase {
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.multiplier = 3;
        this.uploadedFiles = [];
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    getDirective() {
        return 'EJS-CHATUI';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'chat-ui';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    render() {
        this.renderChatUIView();
    }
    renderChatUIView() {
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
    }
    initializeLocale() {
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
    }
    updateScrollPosition(isMethodCall, timeDelay) {
        if (this.isReact || this.isAngular) {
            setTimeout(() => {
                if (isMethodCall) {
                    this.handleAutoScroll();
                }
                else {
                    this.scrollToBottom();
                }
            }, timeDelay);
        }
        else {
            this.scrollToBottom();
        }
    }
    renderChatHeader() {
        if (this.headerText) {
            const headerContainer = this.createElement('div', { className: 'e-header' });
            if (this.headerIconCss) {
                const iconElement = this.createElement('span', { className: `e-header-icon e-icons ${this.headerIconCss}` });
                if (this.user.statusIconCss) {
                    iconElement.appendChild(this.chatStatus(this.user.statusIconCss));
                }
                headerContainer.appendChild(iconElement);
            }
            const headerTextElement = this.createElement('div', { className: 'e-header-text' });
            headerTextElement.innerHTML = this.headerText;
            headerContainer.appendChild(headerTextElement);
            this.chatHeader.appendChild(headerContainer);
            this.renderChatHeaderToolbar(headerContainer);
        }
    }
    renderChatHeaderToolbar(headerContainer) {
        if (!isNullOrUndefined(this.headerToolbar) && this.headerToolbar.items.length > 0) {
            const toolbarEle = this.createElement('div', { className: 'e-chat-toolbar' });
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const pushToolbar = this.headerToolbar.items.map((item) => ({
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
            }));
            this.toolbar = new Toolbar({
                items: pushToolbar,
                height: '100%',
                enableRtl: this.enableRtl,
                clicked: (args) => {
                    const eventItemArgs = {
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
                    const eventArgs = {
                        item: eventItemArgs,
                        event: args.originalEvent,
                        cancel: false
                    };
                    if (this.headerToolbar.itemClicked) {
                        this.headerToolbar.itemClicked.call(this, eventArgs);
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
    }
    addReactToolbarPortals(args) {
        if (this.isReact && args) {
            this.portals = this.portals.concat(args);
        }
    }
    updateHeaderToolbar() {
        const headerContainer = this.chatHeader.querySelector('.e-header');
        if (!isNullOrUndefined(this.toolbar)) {
            const pushToolbar = this.headerToolbar.items.map((item) => ({
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
            }));
            this.toolbar.items = pushToolbar;
        }
        else {
            this.renderChatHeaderToolbar(headerContainer);
        }
    }
    renderChatContentElement() {
        this.messageWrapper = this.createElement('div', { className: 'e-message-wrapper', attrs: { 'tabindex': '0' } });
        this.pinnedMessageWrapper = this.createElement('div', { className: 'e-pinned-message-wrapper' });
        this.renderPinnedMessage();
        this.viewWrapper.prepend(this.pinnedMessageWrapper, this.messageWrapper);
        this.content = this.createElement('div', { className: 'e-typing-suggestions' });
        this.viewWrapper.append(this.content);
        this.renderScrollDown();
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    }
    updateEmptyChatTemplate() {
        if (isNullOrUndefined(this.messages) || this.messages.length <= 0) {
            this.renderBannerView(this.emptyChatTemplate, this.messageWrapper, 'emptyChatTemplate');
            this.isEmptyChatTemplateRendered = isNullOrUndefined(this.messageWrapper.querySelector('.e-empty-chat-template')) ? false : true;
            if (this.pinnedMessageWrapper) {
                this.pinnedMessageWrapper.style.display = 'none';
            }
        }
    }
    renderChatMessageToolbar(messageItem, msg) {
        const messageOptionsToolbar = this.createElement('div', { className: 'e-chat-message-toolbar' });
        let pushToolbar = [];
        if (this.messageToolbarSettings.items.length > 0) {
            const items = this.messageToolbarSettings.items.filter((item) => {
                const isCopyIcon = item.iconCss.includes('e-chat-copy');
                const hasFileAttachment = this.hasAttachment(msg) && !(this.isImageFile(msg.attachedFile.rawFile));
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
            pushToolbar = items.map((item) => ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: this.messageToolbarSettings.width,
                tabIndex: item.tabIndex
            }));
        }
        const messageToolbar = new Toolbar({
            items: pushToolbar,
            clicked: (args) => {
                this.handleMessageToolbarClick(args, messageToolbar, messageItem);
            }
        });
        messageToolbar.appendTo(messageOptionsToolbar);
        this.updatePinnedMessage(msg, messageToolbar);
        return messageOptionsToolbar;
    }
    handleMessageToolbarClick(args, messageToolbar, messageItem) {
        const messageID = messageItem.id;
        const message = this.messages.find((msg) => msg.id === messageID);
        const eventArgs = {
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
    }
    togglePin(message, args, messageToolbar) {
        const pinnedText = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text');
        const currentlyPinnedId = pinnedText.getAttribute('data-index');
        const prevOnChange = this.isProtectedOnChange;
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
    }
    handleDeleteAction(messageID) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const messageToDelete = this.messages.find((msg) => msg.id === messageID);
        if (messageToDelete && messageToDelete.isPinned) {
            this.unpinMessage(messageID);
        }
        this.messages = this.messages.filter((msg) => msg.id !== messageID);
        this.isProtectedOnChange = prevOnChange;
        const messageItem = this.messageWrapper.querySelector(`#${messageID}`);
        if (!messageItem) {
            return;
        }
        const messageGroup = messageItem.closest('.e-message-group');
        if (!messageGroup) {
            return;
        }
        messageGroup.removeChild(messageItem);
        if (messageGroup.querySelector('.e-message-item') === null) {
            this.messageWrapper.removeChild(messageGroup);
        }
        this.cleanupTimeBreaks();
        this.updateEmptyChatTemplate();
    }
    cleanupTimeBreaks() {
        const timeBreaks = Array.from(this.messageWrapper.querySelectorAll('.e-timebreak'));
        let consecutiveBreaks = [];
        timeBreaks.forEach((timeBreak, index) => {
            const nextElement = timeBreak.nextElementSibling;
            // Check if the current time break is the last element or if it's consecutive
            if ((!nextElement || !nextElement.classList.contains('e-timebreak')) && index === timeBreaks.length - 1) {
                this.messageWrapper.removeChild(timeBreak);
            }
            else if (!nextElement || !nextElement.classList.contains('e-timebreak')) {
                if (consecutiveBreaks.length > 0) {
                    consecutiveBreaks.forEach((breakElem) => {
                        this.messageWrapper.removeChild(breakElem);
                    });
                }
                consecutiveBreaks = [];
            }
            else {
                consecutiveBreaks.push(timeBreak);
            }
        });
    }
    handleCopyAction(args, messageToolbar, msg) {
        if (msg.text) {
            this.getClipBoardContent(this.getMessageText(msg));
        }
        if (this.hasAttachment(msg)) {
            const file = msg.attachedFile.rawFile;
            this.writeFileToClipboard(file);
        }
        // Provide feedback to user
        args.item.prefixIcon = 'e-icons e-chat-check';
        messageToolbar.dataBind();
        setTimeout(() => {
            args.item.prefixIcon = 'e-icons e-chat-copy';
            messageToolbar.dataBind();
        }, 1000);
    }
    handleReplyAction(message) {
        let replyWrapper = this.footer.querySelector('.e-reply-wrapper');
        if (!replyWrapper) {
            replyWrapper = this.renderReplyElement(message, true);
            this.footer.prepend(replyWrapper);
        }
        else {
            const userElement = replyWrapper.querySelector('.e-reply-message-user');
            const timeElement = replyWrapper.querySelector('.e-reply-message-time');
            const textElement = replyWrapper.querySelector('.e-reply-message-text');
            if (userElement && textElement) {
                userElement.textContent = message.author.user;
                timeElement.textContent = this.showTimeStamp ? this.getFormattedTime(message.timeStamp, message.timeStampFormat) : '';
                textElement.innerHTML = this.getMessageText(message);
            }
            const previewContainer = replyWrapper.querySelector('.e-reply-media-preview');
            if (previewContainer) {
                previewContainer.remove();
            }
            if (this.hasAttachment(message)) {
                const file = message.attachedFile;
                if (file) {
                    const newReplyContent = this.createFileReplyContent(message);
                    const replyContent = replyWrapper.querySelector('.e-reply-content');
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
    }
    renderReplyElement(message, withClearIcon = false) {
        if ((!message.replyTo || !message.replyTo.user || (!message.replyTo.text && !message.replyTo.attachedFile)
            || !message.replyTo.messageID) && !withClearIcon) {
            return null;
        }
        const replyWrapper = this.createElement('div', { className: 'e-reply-wrapper' });
        let time;
        let timeStampFormat;
        if (withClearIcon) {
            time = message.timeStamp ? message.timeStamp : new Date();
            timeStampFormat = message.timeStampFormat ? message.timeStampFormat : this.timeStampFormat;
        }
        else {
            time = message.replyTo.timestamp ? message.replyTo.timestamp : new Date();
            timeStampFormat = message.replyTo.timestampFormat ? message.replyTo.timestampFormat : this.timeStampFormat;
        }
        const formattedTime = this.getFormattedTime(time, timeStampFormat);
        const replyContent = this.createElement('div', {
            className: 'e-reply-content',
            innerHTML: `<span class='e-reply-message-text'>${withClearIcon ? this.getMessageText(message) : this.getMessageText(message.replyTo)}</span>`
        });
        const messageDetails = this.createElement('div', {
            className: 'e-reply-message-details',
            innerHTML: `
                <span class='e-reply-message-user'>${withClearIcon ? message.author.user : message.replyTo.user.user}</span>
                <span class='e-reply-message-time'>${this.showTimeStamp ? formattedTime : ''}</span>`
        });
        if (this.hasAttachment(message.replyTo) || this.hasAttachment(message)) {
            const file = withClearIcon ? (this.hasAttachment(message) ? message.attachedFile : null)
                : (this.hasAttachment(message.replyTo) ? message.replyTo.attachedFile : null);
            const sourceMessage = withClearIcon ? message : message.replyTo;
            if (file) {
                const fileReplyContent = this.createFileReplyContent(sourceMessage);
                const textElement = replyContent.querySelector('.e-reply-message-text');
                if (textElement) {
                    replyContent.insertBefore(fileReplyContent, textElement);
                }
            }
        }
        replyContent.prepend(messageDetails);
        if (withClearIcon) {
            const clearIcon = this.createElement('span', {
                className: 'e-chat-close e-icons',
                attrs: { title: this.l10n.getConstant('close') }
            });
            EventHandler.add(clearIcon, 'click', this.clearReplyWrapper.bind(this));
            messageDetails.appendChild(clearIcon);
        }
        else {
            EventHandler.add(replyWrapper, 'click', () => { this.scrollToMessage(message.replyTo.messageID); }, this);
        }
        replyWrapper.prepend(replyContent);
        return replyWrapper;
    }
    createFileReplyContent(message) {
        const fileReplyContent = this.createElement('div', { className: 'e-reply-media-preview' });
        const messageText = this.getMessageText(message);
        const hasText = messageText.trim() !== '';
        const file = message.attachedFile;
        if (this.isImageFile(file.rawFile)) {
            const thumbnailImage = this.createImageContent(file, 'e-reply-media-thumb');
            fileReplyContent.appendChild(thumbnailImage);
        }
        else if (this.isVideoFile(file.rawFile)) {
            const thumbnailvideo = this.createElement('video', {
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
            const fileIcon = this.createElement('span', { className: 'e-chat-file-icon e-icons' });
            fileReplyContent.appendChild(fileIcon);
        }
        if (!hasText) {
            const labelElement = this.createElement('span', {
                className: 'e-reply-file-name',
                innerHTML: file.name,
                attrs: { title: file.name }
            });
            fileReplyContent.appendChild(labelElement);
        }
        return fileReplyContent;
    }
    renderPinnedMessage() {
        const pinnedMessage = this.createElement('div', { className: 'e-pinned-message' });
        const pinIcon = this.createElement('span', { className: 'e-icons e-chat-pin' });
        const messageText = this.createElement('span', { className: 'e-pinned-message-text' });
        const pinDropdownButtonEle = this.createElement('button', { id: 'pinnedMessageDropdown' });
        this.dropDownButton = new DropDownButton({
            items: [
                { text: this.l10n.getConstant('viewChat'), iconCss: 'e-icons e-chat-view' },
                { text: this.l10n.getConstant('unpin'), iconCss: 'e-icons e-chat-unpin' }
            ],
            cssClass: 'e-pinned-dropdown-popup e-caret-hide',
            iconCss: 'e-icons e-more-vertical-1',
            select: (args) => {
                const messageId = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text').getAttribute('data-index');
                if (args.item.text === this.l10n.getConstant('viewChat')) {
                    this.scrollToMessage(messageId);
                }
                else if (args.item.text === this.l10n.getConstant('unpin')) {
                    this.unpinMessage(messageId);
                }
            }
        });
        this.dropDownButton.appendTo(pinDropdownButtonEle);
        pinnedMessage.append(pinIcon, messageText);
        this.pinnedMessageWrapper.append(pinnedMessage, pinDropdownButtonEle);
    }
    updatePinnedMessage(message, messageToolbar) {
        const pinnedText = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text');
        const currentlyPinnedId = pinnedText.getAttribute('data-index');
        if (message.isPinned) {
            if (currentlyPinnedId && currentlyPinnedId !== message.id) {
                const previousMessage = this.messages.find((msg) => msg.id === currentlyPinnedId);
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
    }
    pinAttachmentMessage(container, message) {
        const file = message.attachedFile;
        if (!file) {
            return;
        }
        let mediaElement;
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
        const messageText = this.getMessageText(message);
        const hasText = messageText.trim() !== '';
        const labelAttrs = {};
        if (!hasText) {
            labelAttrs.title = file.name;
        }
        const pinContent = this.createElement('span', {
            className: hasText ? 'e-pinned-message-content' : 'e-pinned-file-name',
            innerHTML: hasText ? messageText : file.name,
            attrs: labelAttrs
        });
        this.appendChildren(container, mediaElement, pinContent);
    }
    togglePinnedIcon(messageToolbar) {
        if (this.lastPinnedToolbar) {
            this.lastPinnedToolbar.items.forEach((item) => {
                if (item.prefixIcon === 'e-icons e-chat-unpin') {
                    item.prefixIcon = 'e-icons e-chat-pin';
                    item.tooltipText = 'Pin';
                }
            });
            this.lastPinnedToolbar.dataBind();
        }
        if (messageToolbar) {
            messageToolbar.items.forEach((item) => {
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
    }
    unpinMessage(messageID) {
        this.pinnedMessageWrapper.style.display = 'none';
        this.togglePinnedIcon();
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const message = this.messages.find((msg) => msg.id === messageID);
        if (message) {
            message.isPinned = false;
        }
        this.isProtectedOnChange = prevOnChange;
    }
    wireMessageToolbarEvents(messageItem, toolbarEle) {
        EventHandler.add(messageItem, 'mouseover', () => { this.handleMessageMouseEvents(true, messageItem, toolbarEle); }, this);
        EventHandler.add(messageItem, 'mouseleave', () => { this.handleMessageMouseEvents(false, messageItem, toolbarEle); }, this);
    }
    handleMessageMouseEvents(isMouseOver, messageItem, toolbarEle) {
        if (isMouseOver) {
            const isLeftMessage = messageItem.parentElement.classList.contains('e-left');
            toolbarEle.style.visibility = 'hidden';
            toolbarEle.style.display = 'block';
            const toolbarRect = toolbarEle.getBoundingClientRect();
            toolbarEle.style.visibility = '';
            toolbarEle.style.display = 'none';
            const messageContent = this.messageTemplate
                ? messageItem
                : isLeftMessage
                    ? messageItem.querySelector('.e-message-content')
                    : messageItem.querySelector('.e-status-wrapper');
            const messageItemRect = messageItem.getBoundingClientRect();
            const messageContentRect = messageContent.getBoundingClientRect();
            let topPosition = messageContentRect.top - messageItemRect.top - toolbarRect.height;
            if (!isLeftMessage) {
                topPosition += 4; // margin top
            }
            const messageWrapperRect = this.messageWrapper.getBoundingClientRect();
            if (messageContentRect.top - messageWrapperRect.top < toolbarRect.height) {
                topPosition = messageContentRect.bottom - messageItemRect.top;
            }
            toolbarEle.style.top = `${topPosition}px`;
            if (messageContentRect.width < toolbarRect.width && isLeftMessage) {
                toolbarEle.style.left = '0';
                toolbarEle.style.right = 'auto';
            }
            else {
                const statusIconElement = messageContent.querySelector('.e-status-icon');
                const statusIconWidth = statusIconElement ? statusIconElement.getBoundingClientRect().width + 2 : 0;
                const rightPosition = messageItemRect.right - messageContentRect.right + statusIconWidth;
                toolbarEle.style.right = `${rightPosition}px`;
            }
            toolbarEle.style.display = '';
            toolbarEle.classList.add('e-show');
        }
        else {
            toolbarEle.classList.remove('e-show');
        }
    }
    setChatMsgId() {
        if (this.messages && this.messages.length > 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages = this.messages.map((msg, index) => {
                return Object.assign({}, msg, { id: msg.id || `${this.element.id}-message-${index + 1}` });
            });
            this.isProtectedOnChange = prevOnChange;
        }
    }
    renderScrollDown() {
        const scrollDownButton = this.createElement('button', { id: 'scrollDownButton' });
        this.downArrowIcon = new Fab({
            iconCss: 'e-icons e-chat-scroll-down',
            position: 'BottomRight',
            target: this.content,
            isPrimary: false
        });
        this.downArrowIcon.appendTo(scrollDownButton);
    }
    loadBatch() {
        for (let i = this.startIndex - 1; i >= 0; i--) {
            const currIndex = i; // To pass the actual index of the reversed item.
            const prevIndex = i === this.messages.length - 1 ? -1 : currIndex + 1;
            this.updateMessageTimeFormats(this.messages[parseInt(i.toString(), 10)], currIndex);
            const currentMessageDate = this.getMessageDate(currIndex);
            currentMessageDate.setHours(0, 0, 0, 0);
            if (Math.min(currIndex, prevIndex) >= 0) {
                const lastMessageDate = this.getMessageDate(prevIndex);
                lastMessageDate.setHours(0, 0, 0, 0);
                if (currentMessageDate.getTime() === lastMessageDate.getTime()) {
                    const prevTimeBreak = this.messageWrapper.querySelectorAll('.e-timebreak')[0];
                    if (prevTimeBreak) {
                        prevTimeBreak.remove();
                    }
                }
            }
            this.renderGroup(this.messageWrapper, this.messages[parseInt(i.toString(), 10)], true, currIndex, prevIndex);
            if (this.showTimeBreak) {
                this.messageWrapper.prepend(this.createTimebreakElement(currentMessageDate));
            }
            const viewportHeight = window.innerHeight;
            const loadHeight = viewportHeight * this.multiplier;
            this.startIndex = i;
            if (this.messageWrapper.scrollHeight > loadHeight) {
                break;
            }
        }
    }
    renderMessageGroup(chatContentWrapper) {
        if (this.loadOnDemand) {
            if (this.messages && this.messages.length <= 0) {
                return;
            }
            createSpinner({ target: this.messageWrapper });
            this.startIndex = this.messages.length;
            this.loadBatch();
        }
        else {
            this.messages.forEach((msg, i) => {
                this.renderGroup(chatContentWrapper, msg, false, i, i - 1);
            });
        }
    }
    isTimeBreakAdded(chatContentWrapper, loadOldChat) {
        return loadOldChat ?
            chatContentWrapper.firstElementChild.classList.contains('e-timebreak') :
            chatContentWrapper.lastElementChild.classList.contains('e-timebreak');
    }
    getLastUser(prevIndex) {
        if (prevIndex >= 0) {
            return this.messages[parseInt(prevIndex.toString(), 10)].author.id;
        }
        return '';
    }
    initializeCompactMode() {
        this.element.classList.toggle('e-compact-mode', this.enableCompactMode);
    }
    renderGroup(chatContentWrapper, msg, loadOldChat, index, prevIndex) {
        let messageGroup;
        if (!loadOldChat) {
            this.updateMessageTimeFormats(msg, index);
            this.handleTimeBreak(prevIndex, index, loadOldChat);
        }
        if (!this.enableCompactMode && msg.author.id === this.user.id) {
            const hasTimeBreak = this.showTimeBreak && this.isTimeBreakAdded(chatContentWrapper, loadOldChat);
            if ((msg.author.id !== this.getLastUser(prevIndex)) || hasTimeBreak) {
                messageGroup = this.createElement('div', { className: `e-message-group e-right ${this.messageTemplate ? 'e-message-item-template' : ''}` });
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
            else {
                const length = this.element.querySelectorAll('.e-message-group.e-right').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-right')[loadOldChat ? 0 : length - 1];
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
        }
        else {
            if (this.getLastUser(prevIndex) !== msg.author.id || this.isTimeVaries(index, prevIndex)) {
                messageGroup = this.createElement('div', { className: `e-message-group e-left ${this.messageTemplate ? 'e-message-item-template' : ''}` });
                const avatarElement = this.createAvatarIcon(msg.author, false);
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
                const length = this.element.querySelectorAll('.e-message-group.e-left').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-left')[loadOldChat ? 0 : length - 1];
                if (!loadOldChat) {
                    this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
                }
                else {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
            }
        }
    }
    isTimeVaries(index, prevIndex) {
        const currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        const lastMessageDate = this.getMessageDate(prevIndex);
        lastMessageDate.setHours(0, 0, 0, 0);
        return currentMessageDate.getTime() !== lastMessageDate.getTime();
    }
    loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup) {
        // To check if the previous author is the same as the current author. If not, create a group header.
        const isAnyMsgPresent = this.messages[parseInt((index - 1).toString(), 10)] ? true : false;
        const prevAuthorId = isAnyMsgPresent ? this.messages[parseInt((index - 1).toString(), 10)].author.id : '';
        const shouldCreateHeader = prevAuthorId !== msg.author.id ? true : false;
        if (shouldCreateHeader || this.isTimeVaries(index, index - 1)) {
            this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
            this.createLeftGroupItems(messageGroup, msg);
        }
        else {
            this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
        }
    }
    createLeftGroupItems(messageGroup, msg) {
        if (this.messageTemplate) {
            return;
        }
        const userHeaderContainer = this.createElement('div', {
            className: 'e-message-header-container'
        });
        const userHeader = this.createElement('div', {
            className: 'e-message-header'
        });
        userHeader.innerHTML = msg.author.user;
        const timeSpan = this.getTimeStampElement(msg.timeStamp
            ? msg.timeStamp
            : new Date(), msg.timeStampFormat ? msg.timeStampFormat : this.timeStampFormat);
        this.appendChildren(userHeaderContainer, userHeader, timeSpan);
        this.insertBeforeChildren(messageGroup, userHeaderContainer);
    }
    getInitials(name) {
        const nameParts = name.split(' ');
        const initials = nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
            : name[0];
        return initials;
    }
    createAvatarIcon(author, isTypingUser) {
        const userName = author.user.trim();
        const initials = this.getInitials(userName);
        const iconClassName = !isTypingUser ? 'e-message-icon' : 'e-user-icon';
        let avatarIcon;
        if (iconClassName === 'e-message-icon') {
            avatarIcon = this.createElement('span', { className: ` ${'e-message-icon'} ${author.cssClass}` });
            if (!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') {
                const imgElement = this.createElement('img', {
                    attrs: { src: author.avatarUrl, alt: 'Avatar' }
                });
                avatarIcon.appendChild(imgElement);
            }
        }
        else {
            avatarIcon = this.createElement((!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') ? 'img' : 'span', { className: ` ${'e-user-icon'} ${author.cssClass}` });
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
    }
    chatStatus(statusIconCss) {
        let statusTitle;
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
        return this.createElement('span', { className: `e-user-status-icon ${statusIconCss}`,
            attrs: {
                'title': statusTitle
            }
        });
    }
    getTimeStampElement(timeStamp, timeStampFormat) {
        const formattedTime = this.getFormattedTime(timeStamp, timeStampFormat);
        return this.createElement('div', {
            className: 'e-time',
            innerHTML: this.showTimeStamp ? formattedTime : ''
        });
    }
    updateTimeFormats(timeStampFormat, fullTime, index) {
        if (this.messages[parseInt(index.toString(), 10)]) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages[parseInt(index.toString(), 10)].timeStamp = this.intl.parseDate(fullTime, { format: 'dd/MM/yyyy hh:mm a' });
            this.messages[parseInt(index.toString(), 10)].timeStampFormat = timeStampFormat;
            this.isProtectedOnChange = prevOnChange;
        }
    }
    getFormattedTime(timeStamp, timeStampFormat) {
        timeStamp = typeof timeStamp === 'string' ? new Date(timeStamp) : timeStamp;
        return this.intl.formatDate(timeStamp, { format: this.getFormat(timeStampFormat) });
    }
    getFormat(timeStampFormat) {
        const hasValue = !isNullOrUndefined(timeStampFormat) && timeStampFormat.length > 0;
        return hasValue ? timeStampFormat
            : (!isNullOrUndefined(this.timeStampFormat) && this.timeStampFormat.length) ? this.timeStampFormat : 'dd/MM/yyyy hh:mm a';
    }
    renderForwardElement(msg, textElement) {
        if (msg.isForwarded) {
            const forwardedIndicator = this.createElement('div', {
                className: 'e-forwarded-indicator'
            });
            const forwardedMessage = this.createElement('div', {
                className: 'e-forward-message',
                innerHTML: this.l10n.getConstant('forwarded')
            });
            const forwardIcon = this.createElement('span', { className: 'e-icons e-chat-forward' });
            this.appendChildren(forwardedIndicator, forwardIcon, forwardedMessage);
            textElement.prepend(forwardedIndicator);
        }
    }
    getMessageText(msg) {
        const mentionedUsers = msg.mentionUsers;
        if (!isNullOrUndefined(mentionedUsers) && mentionedUsers.length > 0) {
            // Regular expression to find placeholders like {0}, {10}, {-1}
            const placeholderRegex = /\{(-?\d+)\}/g;
            let messageText = msg.text;
            let match;
            // Find all placeholders in the text
            const placeholders = [];
            // eslint-disable-next-line no-cond-assign
            while ((match = placeholderRegex.exec(messageText)) !== null) {
                placeholders.push({
                    fullMatch: match[0],
                    index: parseInt(match[1], 10)
                });
            }
            // Replace placeholders with user names if the index exists in mentionedUsers
            for (const placeholder of placeholders) {
                const userIndex = placeholder.index;
                // Check if there's a user at this index in the array
                if (userIndex < mentionedUsers.length || (mentionedUsers.length + userIndex) < mentionedUsers.length) {
                    const user = mentionedUsers[parseInt(userIndex.toString(), 10)];
                    if (user) {
                        messageText = messageText.replace(placeholder.fullMatch, this.getMentionChipElement(user));
                    }
                }
            }
            return SanitizeHtmlHelper.sanitize(messageText);
        }
        return SanitizeHtmlHelper.sanitize(msg.text);
    }
    getMentionChipElement(user) {
        const mentionChip = this.createElement('span', { className: 'e-mention-chip' });
        const mentionDisplayEle = this.createElement('span', { className: 'e-chat-mention-user-chip', innerHTML: user.user });
        mentionDisplayEle.setAttribute('data-user-id', user.id);
        mentionChip.append(mentionDisplayEle);
        return mentionChip.outerHTML;
    }
    addGroupItems(msg, messageGroup, isUserTimeStampRendered, showStatus, index, loadOldChat) {
        const messageItem = this.createElement('div', { className: 'e-message-item', id: `${msg.id}` });
        const messageStatusWrapper = this.createElement('div', { className: 'e-status-wrapper' });
        const timeSpan = this.getTimeStampElement(msg.timeStamp ? msg.timeStamp : new Date(), msg.timeStampFormat ? msg.timeStampFormat : this.timeStampFormat);
        const messageContent = this.createElement('div', { className: 'e-message-content' });
        const textElement = this.createElement('div', {
            className: 'e-text',
            innerHTML: this.getMessageText(msg)
        });
        if (this.hasAttachment(msg)) {
            const fileElement = this.createAttachmentContent(msg);
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
                const messageElement = this.createElement('div', { className: 'e-status-item' });
                const statusIcon = this.createElement('span', { attrs: { class: `e-status-icon ${msg.status ? msg.status.iconCss : ''}`, title: `${msg.status ? msg.status.tooltip : ''}` } });
                const statusText = this.createElement('div', { innerHTML: msg.status ? msg.status.text : '', className: 'e-status-text' });
                this.appendChildren(messageElement, messageContent, statusIcon);
                this.appendChildren(messageStatusWrapper, messageElement, statusText);
                messageItem.appendChild(messageStatusWrapper);
            }
            else {
                messageItem.appendChild(messageContent);
            }
        }
        this.manageChatContent(loadOldChat, messageGroup, messageItem);
        const toolbarEle = this.renderChatMessageToolbar(messageItem, msg);
        this.wireMessageToolbarEvents(messageItem, toolbarEle);
        messageItem.prepend(toolbarEle);
    }
    createAttachmentContent(msg) {
        const fileElement = this.createElement('div', {
            className: 'e-attached-file'
        });
        const file = msg.attachedFile;
        let wrapper;
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
        EventHandler.add(fileElement, 'click', () => this.handleAttachmentPreview(file, true));
        return fileElement;
    }
    createVideoContent(file) {
        const videoWrapper = this.createElement('div', {
            className: 'e-video-wrapper'
        });
        const videoElement = this.createElement('video', {
            attrs: {
                disablepictureinpicture: 'true',
                playsinline: 'true',
                preload: 'metadata',
                title: file.name
            },
            className: 'e-video'
        });
        const source = this.createElement('source', {
            attrs: {
                src: file.fileSource,
                type: file.rawFile.type
            }
        });
        videoElement.appendChild(source);
        const playIconWrapper = this.createElement('div', {
            className: 'e-play-icon-wrapper'
        });
        const playButton = this.createElement('span', {
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
    }
    updateForwardAndReplyElement(msg, messageContent) {
        if (!msg.isForwarded) {
            const replyElement = this.renderReplyElement(msg, false);
            if (replyElement) {
                messageContent.prepend(replyElement);
            }
        }
        else {
            this.renderForwardElement(msg, messageContent);
        }
    }
    manageChatContent(loadOldChat, parentItem, ChildItem) {
        if (loadOldChat) {
            parentItem.prepend(ChildItem);
        }
        else {
            parentItem.appendChild(ChildItem);
        }
    }
    createTimebreakElement(date) {
        const timebreakDiv = this.createElement('div', { className: `e-timebreak ${this.timeBreakTemplate ? 'e-timebreak-template' : ''}` });
        const formattedTime = this.getFormattedTime(date, 'MMMM d, yyyy');
        if (this.timeBreakTemplate) {
            this.getContextObject('timeBreakTemplate', timebreakDiv, null, null, date);
        }
        else {
            const timeStampEle = this.createElement('span', { className: 'e-timestamp' });
            timeStampEle.innerHTML = formattedTime;
            timebreakDiv.appendChild(timeStampEle);
        }
        return timebreakDiv;
    }
    handleTimeBreak(lastMsgIndex, index, loadOldChat) {
        if (!this.showTimeBreak) {
            return;
        }
        const currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        if (lastMsgIndex === -1) {
            this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
        }
        else if (index > 0) {
            const lastMessageDate = this.getMessageDate(lastMsgIndex);
            lastMessageDate.setHours(0, 0, 0, 0);
            if ((currentMessageDate.getTime() !== lastMessageDate.getTime()) && !loadOldChat) {
                this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
            }
        }
    }
    renderNewMessage(msg, index) {
        if (this.isEmptyChatTemplateRendered) {
            const introContainer = this.messageWrapper.querySelector('.e-empty-chat-template');
            this.messageWrapper.removeChild(introContainer);
            this.isEmptyChatTemplateRendered = false;
        }
        this.renderGroup(this.messageWrapper, msg, false, index, index - 1);
    }
    loadMoreMessages() {
        if (this.startIndex <= 0) {
            return;
        }
        const currentScrollOffset = this.messageWrapper.scrollHeight - this.messageWrapper.scrollTop;
        showSpinner(this.messageWrapper);
        setTimeout(() => {
            hideSpinner(this.messageWrapper);
            this.loadBatch();
            this.messageWrapper.scrollTop = this.messageWrapper.scrollHeight - currentScrollOffset;
        }, 1000);
    }
    updateMessageTimeFormats(msg, index) {
        const fullTime = this.getFormattedTime(msg.timeStamp
            ? msg.timeStamp
            : new Date(), 'dd/MM/yyyy hh:mm a');
        this.updateTimeFormats(msg.timeStampFormat, fullTime, index);
    }
    getMessageDate(index) {
        return new Date(this.messages[parseInt(index.toString(), 10)].timeStamp);
    }
    renderChatSuggestionsElement() {
        if (!isNullOrUndefined(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
    }
    handleSuggestionUpdate() {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!isNullOrUndefined(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
        this.toggleScrollIcon();
    }
    onSuggestionClick(e) {
        this.suggestionsElement.hidden = true;
        this.editableTextarea.innerText = e.target.innerText;
        this.onSendIconClick(e);
    }
    renderChatFooterContent() {
        this.getFooter();
        const footerClass = `e-footer ${this.footerTemplate ? 'e-footer-template' : ''}`;
        this.footer.className = footerClass;
        this.renderChatFooter();
        this.viewWrapper.append(this.footer);
        this.updateFooter(this.showFooter, this.footer);
    }
    renderChatFooter() {
        this.renderFooterContent(this.footerTemplate, '', this.placeholder, false, 'e-chat-textarea');
        const sendIconClass = 'e-chat-send e-icons disabled';
        if (!this.footerTemplate) {
            this.renderFooterIcons(sendIconClass, false, '');
            const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                this.sendIcon.setAttribute('title', this.l10n.getConstant('send'));
                this.updateAttachmentElement(footerIconsWrapper);
            }
            this.refreshTextareaUI();
            this.pushToUndoStack(this.editableTextarea.innerText);
            this.updateMentionObj();
        }
    }
    getMentionDataSource(mentionUsers) {
        const dataSource = mentionUsers.map((user) => {
            const name = user.user.trim();
            const initials = this.getInitials(name);
            return {
                id: user.id,
                user: name,
                avatarUrl: user.avatarUrl || '',
                avatarBgColor: user.avatarBgColor || '',
                cssClass: user.cssClass || '',
                statusIconCss: user.statusIconCss || '',
                initials
            };
        });
        return dataSource;
    }
    initializeMention() {
        // Map UserModel to format expected by Mention component
        const dataSource = this.getMentionDataSource(this.mentionUsers);
        let cssClass = 'e-chat-mention';
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
    }
    // Add method to handle mention selection
    onMentionSelect(args) {
        const eventArgs = {
            cancel: false,
            event: args.e,
            isInteracted: args.isInteracted,
            itemData: args.itemData
        };
        this.trigger('mentionSelect', eventArgs);
        args.cancel = eventArgs.cancel;
        this.activateSendIcon(this.editableTextarea.innerText.length);
    }
    hasAttachment(message) {
        return message.attachedFile !== undefined && message.attachedFile !== null;
    }
    isImageFile(file) {
        if (!file) {
            return false;
        }
        return file.type && typeof file.type === 'string' && file.type.startsWith('image/');
    }
    isVideoFile(file) {
        if (!file) {
            return false;
        }
        return file.type && typeof file.type === 'string' && file.type.startsWith('video/');
    }
    updateAttachmentElement(footerIconsWrapper) {
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
    }
    renderAttachmentIcon(footerIconsWrapper) {
        this.dropArea = this.createElement('div', { attrs: { class: 'e-chat-drop-area' } });
        this.footer.prepend(this.dropArea);
        this.attachmentIcon = this.createElement('span', { attrs: { class: 'e-chat-attachment-icon e-icons', role: 'button', 'aria-label': 'Attach files', tabindex: '0', title: this.l10n.getConstant('attachments') } });
        const uploaderElement = this.createElement('input', { attrs: { class: 'e-chat-file-upload', type: 'file', name: 'UploadFiles', id: 'fileUpload' } });
        let dropAreaTarget;
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
            selected: (args) => {
                if (args.filesData.some((file) => file.status === this.uploaderObj.l10n.getConstant('invalidFileType'))) {
                    args.cancel = true;
                    return;
                }
                const totalSelected = args.filesData.length + this.uploadedFiles.length;
                if (totalSelected > this.attachmentSettings.maximumCount) {
                    args.cancel = true;
                    this.showFailureAlert('fileCountFailure', this.attachmentSettings.maximumCount, 'e-count-failure');
                    uploaderElement.value = '';
                    return;
                }
                const oversized = args.filesData.filter((file) => file.status === this.uploaderObj.l10n.getConstant('invalidMaxFileSize') && file.statusCode === '0');
                if (oversized.length) {
                    this.showFailureAlert('fileSizeFailure', oversized.length, 'e-size-failure');
                    uploaderElement.value = '';
                }
                this.handleFileSelection(args);
            }
        });
        this.attachmentIcon.appendChild(uploaderElement);
        this.uploaderObj.appendTo(uploaderElement);
        this.attachmentIcon.addEventListener('click', () => uploaderElement.click());
        footerIconsWrapper.prepend(this.attachmentIcon);
        EventHandler.add(this.attachmentIcon, 'keydown', this.triggerUploaderAction, this);
    }
    triggerUploaderAction(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const uploaderElement = this.footer.querySelector('.e-chat-file-upload');
            if (uploaderElement) {
                uploaderElement.click();
            }
        }
    }
    showFailureAlert(localeConstantKey, fileCount, failureType) {
        let failureMessage = this.l10n.getConstant(localeConstantKey).replace('{0}', fileCount.toString());
        if (fileCount === 1) {
            failureMessage = failureMessage.replace('files', 'file');
        }
        this.createFailureAlert(failureMessage, failureType);
    }
    createFailureAlert(failureMessage, failureType) {
        const failureAlert = this.renderFailureAlert(this.viewWrapper, failureMessage, failureType, 'e-chat-circle-close', 'e-chat-close');
        if (this.viewWrapper.contains(this.footer)) {
            this.viewWrapper.insertBefore(failureAlert, this.footer);
        }
        failureAlert.classList.add('e-show');
        setTimeout(() => {
            this.handleFailureAlertRemove(this.viewWrapper, failureAlert);
        }, 3000);
    }
    handleFileSelection(args) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const fileData of args.filesData) {
                const file = fileData.rawFile;
                if (this.attachmentSettings.path) {
                    fileData.fileSource = `${this.attachmentSettings.path}/${fileData.name}`;
                }
                else if (this.attachmentSettings.saveFormat === 'Base64') {
                    fileData.fileSource = yield this.readFileAsBase64(file);
                }
                else {
                    fileData.fileSource = URL.createObjectURL(file);
                }
            }
            this.element.querySelector('#fileUpload').value = '';
        });
    }
    readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    onUploadStart(args) {
        this.trigger('beforeAttachmentUpload', args);
        this.uploadedFiles.push(args.fileData);
        const fileItem = this.createFileItem(args.fileData, true);
        this.dropArea.appendChild(fileItem);
    }
    onUploadProgress(args) {
        const uploadProgress = args.e.loaded / args.e.total * 100;
        const progressFill = this.element.querySelector(`#e-chat-progress-${CSS.escape(args.file.name)}`);
        if (progressFill) {
            progressFill.style.width = `${uploadProgress}%`;
        }
    }
    onUploadSuccess(args) {
        if (args.operation === 'upload') {
            this.trigger('attachmentUploadSuccess', args);
            const progressFill = this.element.querySelector(`#e-chat-progress-${CSS.escape(args.file.name)}`);
            if (progressFill) {
                progressFill.style.width = '100%';
                this.cleanupFileItem(args.file.name);
            }
            const progressBar = this.element.querySelector('.e-chat-progress-fill');
            if (!progressBar) {
                this.activateSendIcon(1);
            }
        }
        else if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
    }
    cleanupFileItem(fileName) {
        const fileItem = this.element.querySelector(`#e-chat-progress-${CSS.escape(fileName)}`);
        if (fileItem) {
            fileItem.parentElement.remove();
        }
    }
    onUploadFailure(args) {
        if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
        else {
            this.trigger('attachmentUploadFailure', args);
            this.uploaderObj.remove(args.file);
            this.uploadedFiles = this.uploadedFiles.filter((file) => file.name !== args.file.name);
            const progressFill = this.footer.querySelector(`#e-chat-progress-${CSS.escape(args.file.name)}`);
            if (progressFill) {
                progressFill.style.width = '100%';
                progressFill.classList.add('e-chat-upload-failed');
            }
        }
    }
    createFileItem(fileData, isForFooter) {
        const fileItem = this.createElement('div', { className: isForFooter ? 'e-chat-uploaded-file-item' : 'e-file-wrapper' });
        if (this.attachmentSettings.attachmentTemplate && isForFooter) {
            const introContainer = this.createElement('div', { className: 'e-attachment-template' });
            fileItem.appendChild(introContainer);
            this.getContextObject('attachmenttemplate', introContainer, null, null, null, fileData);
        }
        else {
            const fileIcon = this.createElement('div', { className: 'e-icons e-chat-file-icon' });
            const fileDetails = this.createElement('div', { className: 'e-chat-file-details' });
            const fileName = this.createElement('span', { className: 'e-chat-file-name', innerHTML: fileData.name });
            const fileSize = this.createElement('span', { className: 'e-chat-file-size', innerHTML: `${(fileData.size / 1024).toFixed(2)} KB` });
            fileDetails.append(fileName, fileSize);
            fileItem.append(fileIcon, fileDetails);
        }
        if (isForFooter) {
            const closeButton = this.createElement('span', { attrs: { class: 'e-icons e-chat-close', role: 'button', 'aria-label': 'Clear file', tabindex: '-1' } });
            EventHandler.add(closeButton, 'click', () => this.handleRemoveUploadedFile(closeButton, fileData, fileItem));
            fileItem.append(closeButton);
            const progressBar = this.createElement('div', { className: 'e-chat-progress-bar' });
            const progressFill = this.createElement('div', { id: `e-chat-progress-${fileData.name}`, className: 'e-chat-progress-fill' });
            progressBar.appendChild(progressFill);
            fileItem.append(progressBar);
            EventHandler.add(fileItem, 'click', (event) => {
                if (closeButton && (event.target === closeButton || event.target.classList.contains('e-chat-close'))) {
                    return;
                }
                this.handleAttachmentPreview(fileData, false);
            });
        }
        return fileItem;
    }
    handleRemoveUploadedFile(closeButton, fileData, fileItem) {
        this.uploaderObj.remove(fileData);
        this.uploadedFiles = this.uploadedFiles.filter((file) => file.name !== fileData.name);
        EventHandler.remove(closeButton, 'click', this.handleRemoveUploadedFile);
        fileItem.remove();
        const textLength = this.editableTextarea.innerText.length;
        const totalLength = textLength + this.uploadedFiles.length;
        this.activateSendIcon(totalLength);
    }
    handleAttachmentPreview(file, isAfterPreview) {
        const eventArgs = { cancel: false };
        if (this.attachmentSettings.attachmentClick) {
            this.attachmentSettings.attachmentClick.call(this, eventArgs);
        }
        else if (!eventArgs.cancel) {
            this.showMediaPreview(file, isAfterPreview);
        }
    }
    getFilePreview(file) {
        const sizeInKB = file.size / 1024;
        const sizeDisplay = sizeInKB < 1024 ? `${sizeInKB.toFixed(2)} KB` : `${(sizeInKB / 1024).toFixed(2)} MB`;
        const filePreview = this.createElement('div', {
            className: 'e-file-preview'
        });
        const fileIcon = this.createElement('span', {
            className: 'e-icons e-file-document'
        });
        const previewText = this.createElement('div', {
            className: 'e-preview-file-text',
            innerHTML: this.l10n.getConstant('filePreview')
        });
        const filedetails = this.createElement('div', {
            className: 'e-file-details',
            innerHTML: '' + file.type + ' - ' + sizeDisplay
        });
        this.appendChildren(filePreview, fileIcon, previewText, filedetails);
        return filePreview;
    }
    removeFilesPreview() {
        const previewWrapper = this.messageWrapper.querySelector('.e-preview-overlay');
        if (previewWrapper) {
            previewWrapper.remove();
        }
    }
    renderPreviewTemplate(selectedFile, isAfterPreview) {
        const introContainer = this.createElement('div', { className: 'e-preview-template' });
        let fileIndex;
        if (isAfterPreview) {
            fileIndex = this.messages.findIndex((msg) => msg.attachedFile === selectedFile);
        }
        else {
            fileIndex = Array.isArray(this.uploadedFiles) && selectedFile ?
                this.uploadedFiles.findIndex((fileData) => fileData.id === selectedFile.id) : -1;
        }
        this.getContextObject('previewtemplate', introContainer, fileIndex, null, null, selectedFile);
        return introContainer;
    }
    showMediaPreview(file, isAfterPreview) {
        const previewOverlay = this.createElement('div', {
            className: 'e-preview-overlay',
            attrs: {
                tabindex: '0'
            }
        });
        const previewHeader = this.createElement('div', {
            className: 'e-preview-header'
        });
        const closeButton = this.createElement('span', {
            className: 'e-chat-back-icon e-icons',
            attrs: {
                title: this.l10n.getConstant('close')
            }
        });
        previewHeader.appendChild(closeButton);
        const fileNameLabel = this.createElement('span', {
            className: 'e-preview-file-name',
            innerHTML: file.name
        });
        previewHeader.appendChild(fileNameLabel);
        if (isAfterPreview) {
            const downloadButton = this.createElement('a', {
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
        let previewContent;
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
                const source = this.createElement('source', {
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
        const escKeyHandler = (event) => {
            if (event.key === 'Escape') {
                closePreview();
            }
        };
        const overlayClickHandler = (event) => {
            if (event.currentTarget === event.target) {
                closePreview();
            }
        };
        const closeClickHandler = () => {
            closePreview();
        };
        const closePreview = () => {
            EventHandler.remove(previewOverlay, 'keydown', escKeyHandler);
            EventHandler.remove(previewOverlay, 'click', overlayClickHandler);
            EventHandler.remove(closeButton, 'click', closeClickHandler);
            previewOverlay.remove();
        };
        EventHandler.add(previewOverlay, 'keydown', escKeyHandler);
        EventHandler.add(previewOverlay, 'click', overlayClickHandler);
        EventHandler.add(closeButton, 'click', closeClickHandler);
    }
    createImageContent(file, imageClass) {
        const imageElement = this.createElement('img', {
            attrs: {
                src: file.fileSource,
                alt: file.name
            },
            className: imageClass
        });
        return imageElement;
    }
    updateAttachmentSettings(newAttachment) {
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
    }
    clearUploadedFiles() {
        this.uploadedFiles = [];
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
        }
        this.refreshTextareaUI();
    }
    refreshTextareaUI() {
        const textLength = this.editableTextarea.innerText.length;
        const previewCount = this.uploadedFiles && this.uploadedFiles.length ? this.uploadedFiles.length : 0;
        const totalContent = textLength + previewCount;
        this.updateHiddenTextarea(this.editableTextarea.innerText);
        this.activateSendIcon(totalContent);
        this.updateFooterElementClass();
    }
    handleInput(event) {
        const textareaEle = event.target;
        const isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        const textContent = textareaEle.innerText;
        this.refreshTextareaUI();
        this.editableTextarea.focus();
        // Debounced push to undo stack
        this.scheduleUndoPush();
        this.redoStack = [];
        this.triggerUserTyping(event, textContent);
    }
    onFocusEditableTextarea() {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
    }
    onBlurEditableTextarea(e) {
        if (this.footer) {
            this.footer.classList.remove('e-footer-focused');
        }
        this.triggerUserTyping(e, e.target.innerText);
    }
    triggerUserTyping(event, value) {
        const eventArgs = {
            event: event,
            message: value,
            user: this.user,
            isTyping: event.type === 'blur' ? false : value.length > 0 ? true : false
        };
        this.trigger('userTyping', eventArgs);
    }
    renderTypingIndicator() {
        if (this.indicatorWrapper) {
            this.indicatorWrapper.remove();
        }
        if (!this.typingUsers || this.typingUsers.length === 0) {
            return;
        }
        this.indicatorWrapper = this.createElement('div', {
            className: `e-typing-indicator ${this.typingUsersTemplate ? 'e-typing-indicator-template' : ''}`
        });
        if (this.typingUsersTemplate) {
            this.getContextObject('typingUsersTemplate', this.indicatorWrapper, null, null, null);
        }
        else {
            this.typingUsers.slice(0, 3).forEach((user) => {
                const avatarElement = this.createAvatarIcon(user, true);
                this.indicatorWrapper.appendChild(avatarElement);
            });
            const typingMessage = this.createElement('span', { className: 'e-user-text' });
            this.indicatorWrapper.appendChild(typingMessage);
            this.updateUserText();
            const indicatorContainer = this.createElement('div', { className: 'e-indicator-wrapper' });
            for (let i = 0; i < 3; i++) {
                const indicator = this.createElement('span', {
                    className: 'e-indicator'
                });
                this.appendChildren(indicatorContainer, indicator);
            }
            this.indicatorWrapper.appendChild(indicatorContainer);
        }
        this.content.prepend(this.indicatorWrapper);
    }
    updateUserText() {
        if (this.typingUsersTemplate) {
            return;
        }
        const userNames = this.typingUsers.filter((user) => user.user !== this.user.user)
            .map((user) => user.user);
        const displayText = this.getTypingMessage(userNames);
        const typingMessage = this.indicatorWrapper.querySelector('.e-user-text');
        typingMessage.innerHTML = displayText;
    }
    getTypingMessage(userNames) {
        if (userNames.length >= 3) {
            return this.l10n.getConstant(userNames.length > 3 ? 'multipleUsersTyping' : 'threeUserTyping')
                .replace('{0}', userNames[0].toString())
                .replace('{1}', userNames[1].toString())
                .replace('{2}', (userNames.length - 2).toString());
        }
        else {
            const userTemplate = this.l10n.getConstant(userNames.length === 2 ? 'twoUserTyping' : 'oneUserTyping');
            return userNames.length === 2
                ? userTemplate.replace('{0}', userNames[0].toString()).replace('{1}', userNames[1].toString())
                : userTemplate.replace('{0}', userNames[0].toString());
        }
    }
    updateTypingUsers(users) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.typingUsers = users;
        this.isProtectedOnChange = prevOnChange;
        this.renderTypingIndicator();
    }
    updateHeaderIcon() {
        const existingIconElement = this.element.querySelector('.e-header-icon');
        if (existingIconElement) {
            existingIconElement.className = `e-header-icon e-icons ${this.headerIconCss}`;
        }
        else {
            const headerContainer = this.element.querySelector('.e-header');
            if (headerContainer) {
                const iconElement = this.createElement('span', {
                    className: `e-header-icon e-icons ${this.headerIconCss}`
                });
                headerContainer.prepend(iconElement);
            }
        }
    }
    updateHeaderText() {
        if (this.headerText) {
            const headerTextEle = this.element.querySelector('.e-header-text');
            if (headerTextEle) {
                headerTextEle.innerHTML = this.headerText;
            }
        }
    }
    renderUpdatedMessage() {
        this.messageWrapper.innerHTML = '';
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
        this.updateEmptyChatTemplate();
    }
    getUserMentionFromContent() {
        const mentionChips = this.editableTextarea.querySelectorAll('.e-chat-mention-user-chip');
        const updatedMentionedUsers = [];
        mentionChips.forEach((chip) => {
            const userId = chip.getAttribute('data-user-id');
            const mentionUser = this.mentionUsers.find((user) => user.id === userId);
            if (mentionUser) {
                updatedMentionedUsers.push(mentionUser);
            }
            else {
                const mentionedUser = {
                    id: userId,
                    user: chip.textContent
                };
                updatedMentionedUsers.push(mentionedUser);
            }
        });
        return updatedMentionedUsers;
    }
    onSendIconClick(event) {
        if (this.editableTextarea && this.uploadedFiles.length === 0 && !this.editableTextarea.innerText.trim()) {
            return;
        }
        const repliedTO = this.currentReplyTo ? {
            user: this.currentReplyTo.author,
            text: this.currentReplyTo.text,
            timestamp: this.currentReplyTo.timeStamp,
            timestampFormat: this.currentReplyTo.timeStampFormat,
            messageID: this.currentReplyTo.id,
            mentionUsers: this.currentReplyTo.mentionUsers,
            attachedFile: this.currentReplyTo.attachedFile
        } : null;
        const messageText = this.replaceMentionChipsWithPlaceholders();
        const mentionUsers = this.getUserMentionFromContent();
        const prevOnChange = this.isProtectedOnChange;
        this.editableTextarea.innerText = '';
        this.clearReplyWrapper();
        this.refreshTextareaUI();
        this.pushToUndoStack(this.editableTextarea.innerText);
        this.triggerUserTyping(event, '');
        if (this.uploadedFiles && this.uploadedFiles.length > 0) {
            const filesCount = this.uploadedFiles.length;
            this.uploadedFiles.forEach((file, index) => {
                let newMessageObj = {
                    id: `${this.element.id}-message-${this.messages.length + 1}`,
                    author: this.user,
                    text: index === filesCount - 1 ? messageText : '',
                    mentionUsers: index === filesCount - 1 ? mentionUsers : [],
                    replyTo: index === filesCount - 1 ? repliedTO : null,
                    attachedFile: file
                };
                const eventArgs = {
                    cancel: false,
                    message: newMessageObj
                };
                this.trigger('messageSend', eventArgs, (args) => {
                    if (args.cancel) {
                        return;
                    }
                    newMessageObj = args.message;
                    this.isProtectedOnChange = true;
                    this.messages = [...this.messages, newMessageObj];
                    this.isProtectedOnChange = prevOnChange;
                    this.renderNewMessage(newMessageObj, this.messages.length - 1);
                });
            });
        }
        else {
            let newMessageObj = {
                id: `${this.element.id}-message-${this.messages.length + 1}`,
                author: this.user,
                text: messageText,
                mentionUsers: mentionUsers,
                replyTo: repliedTO,
                attachedFile: null
            };
            const eventArgs = {
                cancel: false,
                message: newMessageObj
            };
            this.trigger('messageSend', eventArgs, (args) => {
                if (args.cancel) {
                    return;
                }
                newMessageObj = args.message;
                this.isProtectedOnChange = true;
                this.messages = [...this.messages, newMessageObj];
                this.isProtectedOnChange = prevOnChange;
                this.renderNewMessage(newMessageObj, this.messages.length - 1);
            });
        }
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = false;
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(false, 5);
        this.clearUploadedFiles();
    }
    replaceMentionChipsWithPlaceholders() {
        if (!this.editableTextarea.innerHTML) {
            return this.editableTextarea.innerHTML;
        }
        const tempEle = this.createElement('div');
        tempEle.innerHTML = this.editableTextarea.innerHTML;
        const mentionChips = tempEle.querySelectorAll('span.e-mention-chip');
        let mentionIndex = 0;
        mentionChips.forEach((chip) => {
            const placeholder = document.createTextNode(`{${mentionIndex++}}`);
            chip.replaceWith(placeholder);
        });
        return tempEle.innerHTML || '';
    }
    clearReplyWrapper() {
        const replyWrapper = this.footer.querySelector('.e-reply-wrapper');
        if (replyWrapper) {
            const clearIcon = replyWrapper.querySelector('.e-chat-close.e-icons');
            EventHandler.remove(clearIcon, 'click', this.clearReplyWrapper);
            this.footer.removeChild(replyWrapper);
            replyWrapper.remove();
        }
        this.currentReplyTo = null;
    }
    getContextObject(templateName, contentElement, index, message, currentMessagedate, file) {
        let template;
        let context = {};
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
    }
    handleAutoScroll() {
        if (this.isScrollAtBottom) {
            this.updateScroll(this.messageWrapper);
        }
        if (this.autoScrollToBottom) {
            this.updateScroll(this.messageWrapper);
        }
        this.toggleScrollIcon();
    }
    footerKeyHandler(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('e-chat-attachment-icon')) {
            return;
        }
        this.keyHandler(e, 'footer');
    }
    scrollBottomKeyHandler(e) {
        this.keyHandler(e, 'scrollBottom');
    }
    keyHandler(event, value) {
        if (event.key === 'Enter' && !event.shiftKey) {
            const mentionPopup = document.querySelector('.e-chat-mention.e-mention');
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
    }
    applyPromptChange(newState, oldState, event) {
        this.editableTextarea.innerHTML = newState.content;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
        this.triggerUserTyping(event, oldState.content);
    }
    updateFooter(showFooter, footerElement) {
        if (!showFooter) {
            footerElement.hidden = true;
        }
        else {
            footerElement.hidden = false;
        }
    }
    handleScroll() {
        this.messageWrapper.querySelectorAll('.e-chat-message-toolbar.e-show').forEach((toolbar) => {
            toolbar.classList.remove('e-show');
        });
        const atBottom = this.checkScrollAtBottom(this.messageWrapper, 0);
        if (atBottom) {
            this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
            const suggestionEle = this.element.querySelector('.e-suggestions');
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
    }
    toggleClassName(element, atBottom, name) {
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
    }
    toggleScrollIcon() {
        const atBottom = this.checkScrollAtBottom(this.messageWrapper, 0);
        this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
        const suggestionEle = this.element.querySelector('.e-suggestions');
        if (suggestionEle) {
            this.toggleClassName(suggestionEle, atBottom, 'suggestion');
            if (atBottom) {
                this.updateScroll(this.messageWrapper);
            }
        }
        this.isScrollAtBottom = atBottom;
    }
    scrollBtnClick() {
        this.toggleClassName(this.messageWrapper, false, 'scroll');
        this.scrollToBottom();
        this.toggleClassName(this.messageWrapper, true, 'scroll');
    }
    updateMessageItem(message, msgId) {
        if (message.author || message.timeStamp || this.messageTemplate) {
            this.renderUpdatedMessage();
            return;
        }
        const messageItem = this.messageWrapper.querySelector(`#${msgId}`);
        if (!messageItem) {
            return;
        }
        if (message.id) {
            messageItem.id = message.id;
        }
        const messageContent = messageItem.querySelector('.e-message-content');
        if (messageContent && message.text) {
            const textElement = messageItem.querySelector('.e-text');
            if (textElement) {
                textElement.innerHTML = this.getMessageText(message);
            }
            this.updateForwardAndReplyElement(message, messageContent);
        }
        if (message.status) {
            const statusTextElement = messageItem.querySelector('.e-status-text');
            if (statusTextElement && message.status.text) {
                statusTextElement.innerHTML = message.status.text;
            }
            const statusIconElement = messageItem.querySelector('.e-status-icon');
            if (statusIconElement && message.status.iconCss) {
                const iconCss = message.status.iconCss;
                statusIconElement.className = `e-status-icon ${iconCss}`;
                if (message.status.tooltip) {
                    statusIconElement.title = message.status.tooltip;
                }
            }
        }
    }
    updateMentionObj() {
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
    }
    updateLocale() {
        // Updated locale for forward message text.
        this.l10n.setLocale(this.locale);
        const messages = this.messageWrapper.querySelectorAll('.e-message-item');
        messages.forEach((message) => {
            const forwardEle = message.querySelector('.e-forwarded-indicator');
            if (forwardEle) {
                forwardEle.querySelector('.e-forward-message').innerHTML = this.l10n.getConstant('forwarded');
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
        const closeIcon = this.viewWrapper.querySelector('.e-chat-close');
        if (closeIcon) {
            closeIcon.setAttribute('title', this.l10n.getConstant('close'));
        }
        // Update locale for file preview
        const attachmentPreview = this.viewWrapper.querySelector('.e-preview-overlay');
        if (attachmentPreview) {
            const downloadIcon = attachmentPreview.querySelector('.e-chat-download');
            if (downloadIcon) {
                downloadIcon.setAttribute('title', this.l10n.getConstant('download'));
            }
            const backIcon = attachmentPreview.querySelector('.e-chat-back-icon');
            if (backIcon) {
                backIcon.setAttribute('title', this.l10n.getConstant('close'));
            }
            const filePreviewText = attachmentPreview.querySelector('.e-preview-file-text');
            if (filePreviewText) {
                filePreviewText.textContent = this.l10n.getConstant('filePreview');
            }
        }
        //update locale for failure message
        const failureMessageElem = this.viewWrapper.querySelector('.e-failure-message');
        if (failureMessageElem) {
            if (failureMessageElem.classList.contains('e-size-failure')) {
                failureMessageElem.textContent = this.l10n.getConstant('fileSizeFailure');
            }
            else {
                let failureText = this.l10n.getConstant('fileCountFailure');
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
    }
    wireEvents() {
        this.wireFooterEvents(this.footerTemplate);
        EventHandler.add(this.messageWrapper, 'scroll', this.handleScroll, this);
        EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        EventHandler.add(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler, this);
    }
    unwireEvents() {
        this.unWireFooterEvents(this.footerTemplate);
        EventHandler.remove(this.messageWrapper, 'scroll', this.handleScroll);
        EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        EventHandler.remove(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler);
        if (this.attachmentIcon) {
            EventHandler.clearEvents(this.attachmentIcon);
        }
    }
    destroyAttachments() {
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
            const previewOverlay = this.messageWrapper.querySelector('.e-preview-overlay');
            if (previewOverlay) {
                previewOverlay.remove();
            }
        }
        this.uploadedFiles = [];
    }
    destroyChatUI() {
        const properties = [
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
        for (const prop of properties) {
            const element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    }
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    scrollToBottom() {
        this.updateScroll(this.messageWrapper);
        this.toggleScrollIcon();
    }
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
    addMessage(message) {
        if (isNullOrUndefined(message)) {
            return;
        }
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (typeof message === 'string') {
            const newMessageObj = {
                id: `${this.element.id}-message-${this.messages.length + 1}`,
                author: this.user,
                text: message,
                timeStamp: new Date(),
                timeStampFormat: this.timeStampFormat,
                attachedFile: null
            };
            this.messages = [...this.messages, newMessageObj];
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        else {
            const newMessageObj = Object.assign({}, message, { id: message.id || `${this.element.id}-message-${this.messages.length + 1}`, author: message.author || this.user, text: message.text || '', timeStamp: message.timeStamp || new Date(), timeStampFormat: message.timeStampFormat || this.timeStampFormat, status: message.status, mentionUsers: message.mentionUsers || [], isPinned: message.isPinned || false, replyTo: message.replyTo, isForwarded: message.isForwarded || false, attachedFile: message.attachedFile });
            this.messages = [...this.messages, newMessageObj];
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(true, 5);
        this.isProtectedOnChange = prevOnChange;
    }
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
    updateMessage(message, msgId) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.messages = this.messages.map((messageItem) => messageItem.id === msgId ? Object.assign({}, messageItem, message) : messageItem);
        this.updateMessageItem(message, msgId);
        this.isProtectedOnChange = prevOnChange;
    }
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    scrollToMessage(messageId) {
        const messageElement = this.messageWrapper.querySelector(`#${messageId}`);
        if (!messageElement) {
            return;
        }
        messageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    focus() {
        if (this.editableTextarea) {
            this.setFocusAtEnd(this.editableTextarea);
        }
    }
    destroy() {
        super.destroy();
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
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
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
                    const newUser = {
                        id: newProp.user.id ? newProp.user.id : this.user.id,
                        user: newProp.user.user ? newProp.user.user : this.user.user,
                        avatarUrl: newProp.user.avatarUrl ? newProp.user.avatarUrl : this.user.avatarUrl,
                        avatarBgColor: newProp.user.avatarBgColor ? newProp.user.avatarBgColor : this.user.avatarBgColor,
                        cssClass: newProp.user.cssClass ? newProp.user.cssClass : this.user.cssClass,
                        statusIconCss: newProp.user.statusIconCss ? newProp.user.statusIconCss : this.user.statusIconCss
                    };
                    this.user = Object.assign({}, this.user, newUser);
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
                        const footerIconsWrapper = this.element.querySelector('.e-footer-icons-wrapper');
                        this.updateAttachmentElement(footerIconsWrapper);
                    }
                    break;
                case 'attachmentSettings':
                    this.updateAttachmentSettings(newProp.attachmentSettings);
                    break;
            }
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
class PromptResponse extends ChildProperty {
}
__decorate$4([
    Property('')
], PromptResponse.prototype, "prompt", void 0);
__decorate$4([
    Property('')
], PromptResponse.prototype, "response", void 0);
/**
 * Represents a command item model in the inline AI assist component.
 */
class CommandItem extends ChildProperty {
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
/**
 * Represents a response item model in the inline AI assist component.
 */
class ResponseItem extends ChildProperty {
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
/**
 * Represents the settings for the command options in the InlineAIAssist component.
 */
class CommandSettings extends ChildProperty {
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
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
class ResponseSettings extends ChildProperty {
}
__decorate$4([
    Event()
], ResponseSettings.prototype, "itemSelect", void 0);
__decorate$4([
    Collection([], ResponseItem)
], ResponseSettings.prototype, "items", void 0);
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
class InlineToolbarSettings extends ChildProperty {
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
let InlineAIAssist = class InlineAIAssist extends AIAssistBase {
    /**
     * Constructor for creating the component
     *
     * @param {InlineAIAssistModel} options - Specifies the InlineAIAssistModel.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.sendToolbarItem = null;
        this.isResponseRequested = false;
        this.responseContainerCreated = false;
        this.isStopRequested = false;
        this.commandOptionsData = [];
        this.responseOptionsData = [];
        this.typingIndicatorEl = null;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    getDirective() {
        return 'EJS-INLINEAIASSIST';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'inlineaiassist';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * Renders the component
     *
     * @returns {void}
     */
    render() {
        this.initializeLocale();
        // Ensure target element is resolved before creating the popup
        this.resolveTargetElement();
        this.resolveRelateToElement();
        this.renderPopup();
        this.addRtlClass(this.element, this.enableRtl);
        this.wireEvents();
    }
    initializeLocale() {
        this.l10n = new L10n('inline-ai-assist', {
            stopResponseText: 'Stop Responding',
            send: 'Send',
            thinkingIndicator: 'Thinking',
            editingIndicator: 'Editing'
        }, this.locale);
        this.l10n.setLocale(this.locale);
    }
    renderPopup() {
        this.element.classList.add('e-inline-ai-assist');
        if (this.cssClass) {
            this.element.classList.add(this.cssClass);
        }
        this.contentWrapper = this.createElement('div', { className: 'e-inline-assist-container' });
        const content = this.createElement('div', { className: 'e-content' });
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
            close: () => {
                this.trigger('close', {});
                this.onPopupClose();
            },
            open: () => {
                this.trigger('open', {});
                this.attachPopupEventHandlers();
            },
            zIndex: this.zIndex
        });
        this.popupObj.hide();
    }
    showPopupWithData(dataSource, width = '200px', height = '400px') {
        this.mentionPopupObj.dataSource = dataSource;
        this.mentionPopupObj.popupWidth = width;
        this.mentionPopupObj.popupHeight = height;
        this.mentionPopupObj.dataBind();
        this.mentionPopupObj.showPopup();
    }
    showResponsePopup() {
        if (this.popupObj.element.classList.contains('e-popup-open')) {
            this.showPopupWithData(this.responseOptionsData, 'auto', '400px');
        }
    }
    showCommandMenuPopup() {
        this.showPopupWithData(this.commandOptionsData, this.commandSettings.popupWidth || '200px', this.commandSettings.popupHeight || '400px');
    }
    setCommandPopupData() {
        this.commandOptionsData = this.commandSettings.commands.map((cmd) => ({
            label: cmd.label,
            iconCss: cmd.iconCss,
            id: cmd.id,
            disabled: cmd.disabled,
            groupBy: cmd.groupBy,
            tooltip: cmd.tooltip
        }));
    }
    setResponsePopupData() {
        const acceptItem = {
            label: 'Accept',
            iconCss: 'e-icons e-inline-accept'
        };
        const rejectItem = {
            label: 'Discard',
            iconCss: 'e-icons e-inline-discard'
        };
        let mentionDataSource = [acceptItem, rejectItem];
        if (this.responseSettings.items && this.responseSettings.items.length > 0) {
            const customItems = this.responseSettings.items.map((item) => ({
                label: item.label,
                iconCss: item.iconCss,
                id: item.id,
                groupBy: item.groupBy,
                disabled: item.disabled,
                tooltip: item.tooltip
            }));
            mentionDataSource = [...mentionDataSource, ...customItems];
        }
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.responseSettings.items = mentionDataSource;
        this.isProtectedOnChange = prevOnChange;
        this.responseOptionsData = mentionDataSource;
    }
    renderMentionPopup() {
        const mentionEl = this.createElement('div', { attrs: { class: 'e-mention-container' } });
        this.element.appendChild(mentionEl);
        if (this.commandSettings.commands) {
            this.setCommandPopupData();
        }
        this.setResponsePopupData();
        let mentionDataSource = this.responseOptionsData;
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
            select: (args) => {
                args.cancel = true;
                this.onMentionCommandSelect(args);
            },
            locale: this.locale,
            opened: () => {
                this.positionMentionPopup();
            }
        }, mentionEl);
    }
    positionMentionPopup() {
        if (this.mentionPopupObj) {
            const mainPopupElement = this.popupObj.element;
            const mainRect = mainPopupElement.getBoundingClientRect();
            const popupObj = this.mentionPopupObj.popupObj;
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
    }
    onMentionCommandSelect(args) {
        const selectedItem = args.itemData;
        const matchedCommand = this.commandSettings.commands.find((cmd) => cmd.label === selectedItem.label);
        if (matchedCommand) {
            const commandItemSelectEventArgs = {
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
            const responseItemSelectEventArgs = {
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
    }
    resolveTargetElement() {
        this.targetEl = typeof this.target === 'string'
            ? document.querySelector(this.target)
            : this.target instanceof HTMLElement ? this.target : document.body;
    }
    resolveRelateToElement() {
        if (this.relateTo === '' || isNullOrUndefined(this.relateTo)) {
            return;
        }
        this.relateToEl = (typeof this.relateTo === 'string'
            ? document.querySelector(this.relateTo)
            : this.relateTo);
    }
    onPopupClose() {
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
    }
    renderInlineFooter() {
        const textareaAndIconsWrapper = this.createElement('div', { attrs: { class: 'e-textarea-icons-wrapper' } });
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
            const hiddenTextarea = this.createElement('textarea', {
                attrs: {
                    class: 'e-hidden-textarea',
                    name: 'userPrompt',
                    value: this.prompt
                }
            });
            textareaAndIconsWrapper.appendChild(this.editableTextarea);
            textareaAndIconsWrapper.appendChild(hiddenTextarea);
            const footerIconsWrapper = this.createElement('div', { attrs: { class: 'e-footer-icons-wrapper' } });
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
    }
    keyDownHandler(e) {
        if (e.shiftKey && e.key === 'Enter') {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }
    updateEditorTemplate() {
        this.footer.innerHTML = '';
        this.updateFooterClass(this.editorTemplate);
        this.renderInlineFooter();
    }
    renderFooterToolbar(container) {
        const toolbarItems = [];
        const customItems = this.inlineToolbarSettings.items || [];
        for (const customItem of customItems) {
            const mappedItem = {
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
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const footerToolbarItems = toolbarItems.map((item) => ({
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
        }));
        this.inlineToolbarSettings.items = footerToolbarItems;
        this.isProtectedOnChange = prevOnChange;
        this.footerToolbarEle = new Toolbar({
            items: toolbarItems,
            enableRtl: this.enableRtl,
            width: '100%',
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (this.inlineToolbarSettings.itemClick) {
                    this.inlineToolbarSettings.itemClick.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    switch (args.item.prefixIcon) {
                        case 'e-icons e-inline-send':
                            if (!this.isResponseRequested && !args.item.disabled) {
                                this.onSendIconClick();
                            }
                            break;
                        case 'e-icons e-inline-stop':
                            if (this.isResponseRequested) {
                                this.respondingStopper();
                            }
                            break;
                    }
                }
            }
        });
        const toolbarContainer = this.createElement('div', { attrs: { class: 'e-footer-toolbar-wrapper' } });
        this.footerToolbarEle.appendTo(toolbarContainer);
        this.footerToolbarEle.element.setAttribute('aria-label', 'assist-footer-toolbar');
        container.appendChild(toolbarContainer);
    }
    isDuplicatedItem(iconCss, toolbarItems) {
        for (const item of toolbarItems) {
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
    }
    keyUpHandler(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    wireEvents() {
        this.wireFooterEvents(this.editorTemplate);
        // Ensure editableTextarea and footer are available in the DOM
        if (this.editableTextarea && this.footer) {
            const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.add(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown, this);
                // Optional fallback for environments without Pointer Events
                EventHandler.add(footerIconsWrapper, 'click', this.onFooterIconsClick, this);
                EventHandler.add(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut, this);
            }
        }
    }
    unWireEvents() {
        this.unWireFooterEvents(this.editorTemplate);
        if (this.editableTextarea) {
            EventHandler.remove(this.editableTextarea, 'keyup', this.keyUpHandler);
            this.editableTextarea.removeEventListener('keydown', this.keyDownHandler.bind(this), true);
            const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                EventHandler.remove(footerIconsWrapper, 'pointerdown', this.onFooterIconsPointerDown);
                EventHandler.remove(footerIconsWrapper, 'click', this.onFooterIconsClick);
                EventHandler.remove(footerIconsWrapper, 'focusout', this.onFooterIconsFocusOut);
            }
        }
    }
    attachPopupEventHandlers() {
        EventHandler.add(document, 'keydown', this.onPopupKeyDown, this);
        EventHandler.add(document, 'mousedown', this.onPopupOutsideClick, this);
    }
    detachPopupEventHandlers() {
        EventHandler.remove(document, 'keydown', this.onPopupKeyDown);
        EventHandler.remove(document, 'mousedown', this.onPopupOutsideClick);
    }
    onPopupKeyDown(e) {
        if (e.key === 'Escape' && this.popupObj && this.popupObj.element.offsetParent !== null) {
            e.preventDefault();
            this.hidePopup();
        }
    }
    onPopupOutsideClick(e) {
        e.stopImmediatePropagation();
        if (!this.popupObj || this.popupObj.element.offsetParent === null) {
            return;
        }
        const target = e.target;
        const popupElement = this.popupObj.element;
        if (this.mentionPopupObj && this.mentionPopupObj.element) {
            const mentionPopupElement = this.mentionPopupObj.element;
            if (mentionPopupElement.contains(target)) {
                return;
            }
        }
        if (!popupElement.contains(target)) {
            this.hidePopup();
        }
    }
    handleInput(event) {
        const textareaEle = event.target;
        const isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        const textContent = textareaEle.innerHTML;
        const prevOnChange = this.isProtectedOnChange;
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
    }
    onFocusEditableTextarea() {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
    }
    onBlurEditableTextarea() {
        if (this.footer) {
            this.footer.classList.remove('e-footer-focused');
        }
    }
    showTypingIndicator(text) {
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
    }
    hideTypingIndicator() {
        if (!this.editableTextarea) {
            return;
        }
        this.editableTextarea.setAttribute('contenteditable', 'true');
        this.editableTextarea.classList.remove('e-typing-indicator-active');
        if (this.typingIndicatorEl && this.typingIndicatorEl.parentElement === this.editableTextarea) {
            this.editableTextarea.removeChild(this.typingIndicatorEl);
        }
        this.editableTextarea.innerHTML = '';
    }
    onSendIconClick() {
        if (this.isResponseRequested || !this.prompt.trim()) {
            return;
        }
        this.isResponseRequested = true;
        this.isStopRequested = false;
        this.hasResponse = false;
        const prevOnChange = this.isProtectedOnChange;
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
        const eventArgs = {
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
    }
    respondingStopper() {
        this.isResponseRequested = false;
        this.isStopRequested = true;
        let hasGeneratedResponse = false;
        if (this.responseMode.toLowerCase() === 'inline') {
            this.hideTypingIndicator();
            hasGeneratedResponse = this.hasResponse;
        }
        else {
            this.removeSkeleton();
            const responseTextElement = this.element.querySelector('.e-response-text');
            if (responseTextElement && responseTextElement.innerText && responseTextElement.innerText.trim().length > 0) {
                hasGeneratedResponse = true;
            }
        }
        this.toggleStopRespondingButton(false);
        if (hasGeneratedResponse) {
            this.showResponsePopup();
        }
    }
    createResponseContainer() {
        if (!this.responseContainerCreated) {
            this.responseContainer = this.createElement('div', { className: `e-output-container ${this.responseTemplate ? 'e-response-item-template' : ''}` });
            const responseText = this.createElement('div', { className: 'e-response-text' });
            this.responseContainer.appendChild(responseText);
            const content = this.element.querySelector('.e-content');
            if (content) {
                content.appendChild(this.responseContainer);
            }
            this.responseContainerCreated = true;
        }
    }
    renderSkeleton() {
        this.skeletonContainer = this.createElement('div', { className: 'e-output-container' });
        const outputViewWrapper = this.createElement('div', { className: 'e-output', styles: 'width: 70%;' });
        const skeletonIconEle = this.createElement('span', { className: 'e-output-icon e-skeleton e-skeleton-text e-shimmer-wave' });
        const skeletonBodyEle = this.createElement('div', { className: 'e-loading-body' });
        const [skeletonLine1, skeletonLine2, skeletonLine3] = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 75%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 50%; height: 15px;' })
        ];
        skeletonBodyEle.append(skeletonLine1, skeletonLine2, skeletonLine3);
        outputViewWrapper.append(skeletonBodyEle);
        this.skeletonContainer.append(skeletonIconEle, outputViewWrapper);
    }
    removeSkeleton() {
        if (this.responseContainer && this.responseContainer.querySelector('.e-skeleton')) {
            this.skeletonContainer.remove();
        }
    }
    applyPromptChange(newState, oldState, event) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = this.editableTextarea.innerHTML = newState.content;
        this.isProtectedOnChange = prevOnChange;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
    }
    refreshTextareaUI() {
        this.updateHiddenTextarea(this.prompt);
        this.checkAndActivateSendIcon();
        this.updateFooterElementClass();
        this.updateFooterType(this.inlineToolbarSettings.toolbarPosition);
    }
    checkAndActivateSendIcon() {
        if (!this.footerToolbarEle) {
            return;
        }
        const length = this.editableTextarea.innerText.length;
        if (this.sendToolbarItem && this.sendToolbarItem.prefixIcon === 'e-icons e-inline-send') {
            const sendItem = this.footerToolbarEle.element.querySelector('.e-inline-send');
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
    }
    toggleStopRespondingButton(show) {
        const sendIconClass = 'e-inline-send';
        const stopIconClass = 'e-inline-stop';
        const stopTooltip = this.l10n.getConstant('stopResponseText');
        if (!this.editorTemplate) {
            const currentIconClass = show ? sendIconClass : stopIconClass;
            const newIconClass = show ? stopIconClass : sendIconClass;
            const currentItem = this.footerToolbarEle.items.find((item) => item.prefixIcon === `e-icons ${currentIconClass}`);
            const itemIndex = this.footerToolbarEle.items.indexOf(currentItem);
            const currentToolbarItemElement = this.footerToolbarEle.element.querySelector(`.e-tbar-btn .${currentIconClass}`) ?
                this.footerToolbarEle.element.querySelector(`.e-tbar-btn .${currentIconClass}`).closest('.e-toolbar-item') : null;
            if (itemIndex !== -1 && currentItem && currentToolbarItemElement) {
                const newItem = {
                    prefixIcon: `e-icons ${newIconClass}`,
                    align: 'Right',
                    tooltipText: show ? stopTooltip : undefined
                };
                this.footerToolbarEle.addItems([newItem], itemIndex);
                this.footerToolbarEle.removeItems(currentToolbarItemElement);
            }
            this.refreshTextareaUI();
        }
        else {
            const currentIcon = this.footer.querySelector(`.${show ? sendIconClass : stopIconClass}`);
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
    }
    updateFooterToolbar() {
        const footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
        if (footerIconsWrapper) {
            footerIconsWrapper.innerHTML = '';
            this.footerToolbarEle = null;
            this.sendToolbarItem = null;
            this.renderFooterToolbar(footerIconsWrapper);
            this.refreshTextareaUI();
        }
    }
    keyHandler(e) {
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
    }
    footerKeyHandler(e) {
        e.stopPropagation();
        const targetElement = e.target;
        if (targetElement.classList.contains('e-tbar-btn')) {
            return;
        }
        else if (e.key === 'Escape') {
            this.onPopupKeyDown(e);
            return;
        }
        this.keyHandler(e);
    }
    /**
     * Appends or sets the generated response content in the component.
     * Use this method to manually inject a response from cache, non-streaming APIs, or custom logic.
     *
     * @method addResponse
     * @param {string} response - The response content (plain text or Markdown) to render.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    addResponse(response, isFinalUpdate = true) {
        const prevOnChange = this.isProtectedOnChange;
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
        const htmlResponse = MarkdownConverter.toHtml(response);
        this.prompts = [...this.prompts, { prompt: this.prompt, response: htmlResponse }];
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
                    const indicatorTextElement = this.typingIndicatorEl.querySelector('.e-indicator-text');
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
                    const responseItem = this.element.querySelector('.e-response-text');
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
    }
    streamResponse(response) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        let i = 0;
        const words = response.split(' ');
        const wordCount = words.length;
        let lastResponse = '';
        const responseItem = this.element.querySelector('.e-response-text');
        const streamingResponse = () => {
            if (this.isStopRequested) {
                return;
            }
            lastResponse += (i === 0 ? '' : ' ') + words[parseInt(i.toString(), 10)];
            i++;
            this.removeSkeleton();
            if (responseItem) {
                responseItem.innerHTML = lastResponse;
            }
            if (i < wordCount) {
                setTimeout(() => {
                    streamingResponse();
                }, 15);
            }
            else {
                const isFinalUpdate = lastResponse.length === response.length;
                if (isFinalUpdate) {
                    this.isResponseRequested = false;
                    this.toggleStopRespondingButton(false);
                    this.showResponsePopup();
                }
                this.isProtectedOnChange = prevOnChange;
            }
        };
        streamingResponse();
    }
    /**
     * Executes the specified prompt as if the user typed and submitted it.
     * TUse this to run predefined commands, slash-menu actions, or external triggers.
     *
     * @method executePrompt
     * @param {string} prompt - The prompt text to execute; dispatched to the AI backend or via the promptRequest event.
     * @returns {void}
     */
    executePrompt(prompt) {
        if (!isNullOrUndefined(prompt) && prompt.trim().length > 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = prompt;
            this.isProtectedOnChange = prevOnChange;
            this.onSendIconClick();
        }
    }
    /**
     * Opens the popup UI and optionally positions it at the given screen coordinates.
     * When not provided, default positioning (caret/selection/target) is applied.
     *
     * @method showPopup
     * @param {number} [x] - X coordinate in pixels or CSS units (e.g., 300, '300px', '50%').
     * @param {number} [y] - Y coordinate in pixels or CSS units (e.g., 200, '200px', '50%').
     * @returns {void}
     */
    showPopup(x, y) {
        if (this.popupObj) {
            // Determine positioning element: use target if provided, otherwise use selected text
            const positioningElement = this.relateToEl || document.body;
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
    }
    /**
     * Closes/hides the popup UI or collapses the inline response area.
     * Triggers the close event after the popup is hidden.
     *
     * @method hidePopup
     * @returns {void}
     */
    hidePopup() {
        const prevOnChange = this.isProtectedOnChange;
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
    }
    /**
     * Opens the command popup below the prompt input area.
     * Use to display available commands or suggestions for quick selection.
     *
     * @method showCommandPopup
     * @returns {void}
     */
    showCommandPopup() {
        if (this.popupObj.element.classList.contains('e-popup-open')) {
            this.showCommandMenuPopup();
        }
    }
    /**
     * Hides the command popup displayed below the prompt input area.
     * Call this to dismiss the command chooser without selection.
     *
     * @method hideCommandPopup
     * @returns {void}
     */
    hideCommandPopup() {
        if (this.mentionPopupObj && this.mentionPopupObj.element.classList.contains('e-popup-open')) {
            this.mentionPopupObj.hidePopup();
        }
    }
    renderResponseWithTemplate(response) {
        const outputContainer = this.element.querySelector('.e-output-container');
        if (!outputContainer) {
            return;
        }
        outputContainer.innerHTML = '';
        const context = {
            response: response,
            responseItems: this.responseSettings.items
        };
        this.updateContent(this.responseTemplate, outputContainer, context, 'responseTemplate');
    }
    clearResponses() {
        if (this.responseContainer) {
            this.responseContainer.remove();
        }
    }
    destroy() {
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
        super.destroy();
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
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param {InlineAIAssistModel} newProp - Specifies new properties
     * @param {InlineAIAssistModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
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
                        const outputContainer = this.element.querySelector('.e-output-container');
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

export { AIAssistBase, AIAssistView, AssistView, AssistViewType, AttachmentSettings, ChatUI, CommandItem, CommandSettings, FileAttachmentSettings, FooterToolbarSettings, InlineAIAssist, InlineToolbarSettings, InterActiveChatBase, Message, MessageReply, MessageStatus, MessageToolbarSettings, Prompt, PromptResponse, PromptToolbarSettings, ResponseItem, ResponseMode, ResponseSettings, ResponseToolbarSettings, SpeechToTextSettings, ToolbarItem, ToolbarPosition, ToolbarSettings, User };
//# sourceMappingURL=ej2-interactive-chat.es2015.js.map
