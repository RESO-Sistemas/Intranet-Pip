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
import { BlockType } from '../../../models/enums';
import { setCursorPosition, getSelectedRange, captureSelectionState } from '../../../common/utils/selection';
import { getLanguageItems } from '../../../common/utils/data';
import { getBlockModelById, getParentBlock } from '../../../common/utils/block';
import { decoupleReference, getNormalizedKey } from '../../../common/utils/common';
import { events } from '../../../common/constant';
import { BlockFactory } from '../../services/index';
import { createElement } from '@syncfusion/ej2-base';
var CodeRenderer = /** @class */ (function () {
    function CodeRenderer(manager) {
        this.ctrlAPressed = false;
        this.INDENT_SIZE = 4;
        this.parent = manager;
        this.addEventListeners();
    }
    CodeRenderer.prototype.addEventListeners = function () {
        this.parent.observer.on(events.keydown, this.handleKeyDownActions, this);
        this.parent.observer.on(events.input, this.handleCodeBlockInput, this);
        this.parent.observer.on(events.localeChanged, this.handleLocaleChange, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    CodeRenderer.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.keydown, this.handleKeyDownActions);
        this.parent.observer.off(events.input, this.handleCodeBlockInput);
        this.parent.observer.off(events.localeChanged, this.handleLocaleChange);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Renders a code block
     *
     * @param {BlockModel} block - The block model containing data.
     * @returns {HTMLElement} - The rendered code block element.
     * @hidden
     */
    CodeRenderer.prototype.renderCodeBlock = function (block) {
        var codeBlockSettings = block.properties;
        var _a = this.createCodeContainer(block), container = _a.container, preElement = _a.preElement, codeElement = _a.codeElement;
        var _b = this.createCodeToolbar(), toolbar = _b.toolbar, copyButton = _b.copyButton;
        this.initializeLanguageSelector(codeBlockSettings, preElement, codeElement, toolbar);
        toolbar.appendChild(copyButton);
        container.appendChild(toolbar);
        container.appendChild(preElement);
        setCursorPosition(codeElement, 0);
        return container;
    };
    CodeRenderer.prototype.createCodeToolbar = function () {
        var toolbar = createElement('div', {
            className: 'e-code-block-toolbar',
            attrs: { contenteditable: 'false' }
        });
        var copyButton = createElement('button', {
            className: 'e-code-block-copy-button e-btn',
            innerHTML: '<span class="e-icons e-copy"></span>',
            attrs: {
                title: this.parent.localeJson['codeCopyTooltip'],
                type: 'button',
                contenteditable: 'false'
            }
        });
        this.addCopyButtonClick(toolbar, copyButton);
        return { toolbar: toolbar, copyButton: copyButton };
    };
    CodeRenderer.prototype.addCopyButtonClick = function (toolbar, copyButton) {
        copyButton.addEventListener('click', function () {
            var codeElement = toolbar.closest('.e-code-block-container').querySelector('code');
            if (codeElement) {
                var codeText = codeElement.textContent;
                window.navigator.clipboard.writeText(codeText)
                    .then(function () {
                    var iconElement = copyButton.querySelector('.e-icons');
                    if (iconElement) {
                        var originalClass_1 = iconElement.className;
                        iconElement.className = 'e-icons e-check-tick';
                        setTimeout(function () {
                            iconElement.className = originalClass_1;
                        }, 2000);
                    }
                })
                    .catch(function (err) {
                    console.error('Could not copy text: ', err);
                });
            }
        });
    };
    CodeRenderer.prototype.initializeLanguageSelector = function (codeBlockSettings, preElement, codeElement, targetElement) {
        var languageDataSource = getLanguageItems();
        if (this.parent.codeBlockSettings.languages.length === 0) {
            this.parent.codeBlockSettings.languages = languageDataSource;
        }
        this.renderDropDown(codeBlockSettings, preElement, codeElement, targetElement);
    };
    CodeRenderer.prototype.renderDropDown = function (codeBlockSettings, preElement, codeElement, targetElement) {
        this.parent.observer.notify('renderDropdownList', {
            targetElement: targetElement,
            dataSource: this.parent.codeBlockSettings.languages,
            fields: { text: 'label', value: 'language' },
            value: codeBlockSettings.language || this.parent.codeBlockSettings.defaultLanguage,
            change: function (e) {
                var newLanguage = e.value;
                if (codeElement && preElement) {
                    codeElement.className = "e-code-content e-block-content language-" + newLanguage;
                    preElement.setAttribute('data-language', newLanguage);
                    // Update in Model
                    codeBlockSettings.language = newLanguage;
                }
            }
        });
    };
    CodeRenderer.prototype.createCodeContainer = function (block) {
        var container = createElement('div', { className: 'e-code-block-container' });
        var preElement = createElement('pre', {
            className: 'e-code-block',
            attrs: {
                'data-language': this.parent.codeBlockSettings.defaultLanguage
            }
        });
        var hasContent = block.content && block.content.length > 0;
        var codeElement = createElement('code', {
            className: "e-code-content e-block-content language-" + this.parent.codeBlockSettings.defaultLanguage,
            attrs: { contenteditable: 'true' }
        });
        if (hasContent && block.content[0].content) {
            codeElement.textContent = block.content[0].content;
        }
        else {
            codeElement.textContent = '\n';
        }
        preElement.appendChild(codeElement);
        return { container: container, preElement: preElement, codeElement: codeElement };
    };
    CodeRenderer.prototype.handleKeyDownActions = function (e) {
        if (!this.parent.currentFocusedBlock) {
            return;
        }
        var codeElement = this.parent.currentFocusedBlock.querySelector('code');
        var block = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (!codeElement || (block && block.blockType !== BlockType.Code)) {
            return;
        }
        var normalizedKey = getNormalizedKey(e);
        if (normalizedKey === 'ctrl+a') {
            this.handleCtrlASelection(e, codeElement);
            return;
        }
        switch (e.key) {
            case 'Enter':
                this.handleEnterKey(e, codeElement, block);
                break;
            case 'Backspace':
                this.handleDeletion(e, codeElement, block, false);
                break;
            case 'Delete':
                this.handleDeletion(e, codeElement, block, true);
                break;
            case 'Tab':
                this.handleTabKey(e, codeElement);
                break;
        }
    };
    CodeRenderer.prototype.handleEnterKey = function (e, codeElement, block) {
        e.preventDefault();
        this.parent.previousSelection = captureSelectionState();
        var action = this.determineEnterAction(codeElement);
        if (action.shouldExit) {
            this.exitCodeBlock(codeElement, block);
            return;
        }
        // Store the old block state for undo/redo tracking
        var oldBlockModel = decoupleReference(block);
        // Insert single newline with indentation
        this.insertTextAtCursor(action.indentation);
        // Update the block model after inserting line breaks
        this.updateBlockModel(codeElement, block);
        // Track the change for undo/redo
        var clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
    };
    CodeRenderer.prototype.determineEnterAction = function (codeElement) {
        var cursorPosition = this.getCursorPosition(codeElement);
        var indentation = this.getCurrentLineIndentation(codeElement, cursorPosition);
        var shouldExit = this.shouldExitCodeBlock(codeElement);
        return { shouldExit: shouldExit, indentation: indentation };
    };
    CodeRenderer.prototype.handleDeletion = function (e, codeElement, block, isDeleteKey) {
        var cursorPosition = this.getCursorPosition(codeElement);
        var textContent = codeElement.textContent;
        var range = getSelectedRange();
        var shouldPreventDefault = isDeleteKey
            ? (cursorPosition >= textContent.length)
            : (cursorPosition === 0 || textContent.length === 0);
        if ((textContent.length === 1) || (range.toString() === textContent)) {
            e.preventDefault();
            // Store the old block state for undo/redo tracking
            var oldBlockModel = decoupleReference(block);
            codeElement.textContent = '\n';
            setCursorPosition(codeElement, 0);
            this.updateBlockModel(codeElement, block);
            // Track the change for undo/redo
            var clonedBlock = decoupleReference(block);
            this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
        }
        if (shouldPreventDefault) {
            e.preventDefault();
            return;
        }
    };
    CodeRenderer.prototype.handleTabKey = function (e, codeElement) {
        e.preventDefault();
        this.parent.previousSelection = captureSelectionState();
        var block = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (!block) {
            return;
        }
        // Store the old block state for undo/redo tracking
        var oldBlockModel = decoupleReference(block);
        if (e.shiftKey) {
            this.removeIndentation(codeElement);
        }
        else {
            this.addIndentation();
        }
        // Update block model after indentation change
        this.updateBlockModel(codeElement, block);
        // Track the change for undo/redo
        var clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
    };
    CodeRenderer.prototype.handleCodeBlockInput = function (e) {
        if (!this.parent.currentFocusedBlock) {
            return;
        }
        var codeElement = this.parent.currentFocusedBlock.querySelector('code');
        var block = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (!codeElement || block.blockType !== BlockType.Code) {
            return;
        }
        // Store the old block state for undo/redo tracking
        var oldBlockModel = decoupleReference(block);
        var textContent = codeElement.textContent || '';
        if (!textContent.trim() && codeElement.textContent !== '\n') {
            codeElement.textContent = '\n';
        }
        this.updateBlockModel(codeElement, block);
        // Track the change for undo/redo and notify block change event
        var clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: clonedBlock,
                prevBlock: oldBlockModel
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    CodeRenderer.prototype.handleCtrlASelection = function (e, codeElement) {
        var _this = this;
        if (!this.ctrlAPressed) {
            e.preventDefault();
            this.selectEntireCodeBlock(codeElement);
            this.ctrlAPressed = true;
            setTimeout(function () {
                _this.ctrlAPressed = false;
            }, 500);
        }
        else {
            this.ctrlAPressed = false;
        }
    };
    CodeRenderer.prototype.getCursorPosition = function (element) {
        var range = this.parent.nodeSelection.getRange();
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
    };
    CodeRenderer.prototype.insertTextAtCursor = function (indentValue) {
        var selection = window.getSelection();
        if (!selection.rangeCount) {
            return;
        }
        var codeElement = this.parent.currentFocusedBlock.querySelector('code');
        if (!codeElement) {
            return;
        }
        var range = selection.getRangeAt(0);
        var cursorPositionBefore = this.getCursorPosition(codeElement);
        var textContent = codeElement.textContent || '';
        // 1. Delete any selected text
        range.deleteContents();
        // 2. Determine if we're truly at the document end
        var atEnd = cursorPositionBefore >= textContent.length;
        var newlineToInsert = '\n';
        if (atEnd) {
            // Check the character right before the cursor (if any)
            if (cursorPositionBefore > 0 && textContent[cursorPositionBefore - 1] === '\n') {
                // Already ends with newline → just one more \n
                newlineToInsert = '\n';
            }
            else {
                // Does NOT end with newline → most editors insert double newline
                newlineToInsert = '\n\n';
            }
        }
        var textToInsert = newlineToInsert + (indentValue || '');
        var textNode = document.createTextNode(textToInsert);
        range.insertNode(textNode);
        // Calculate new cursor position and set it
        var newCursorPosition = cursorPositionBefore + textToInsert.length;
        codeElement.normalize();
        setCursorPosition(codeElement, newCursorPosition);
    };
    CodeRenderer.prototype.getCurrentLineIndentation = function (element, cursorPosition) {
        var textContent = element.textContent;
        var lines = textContent.substring(0, cursorPosition).split('\n');
        var currentLine = lines[lines.length - 1];
        var indentMatch = currentLine.match(/^(\s*)/);
        return indentMatch ? indentMatch[1] : '';
    };
    CodeRenderer.prototype.shouldExitCodeBlock = function (element) {
        var textContent = element.textContent;
        var cursorPosition = this.getCursorPosition(element);
        // Check if cursor is at the end of content
        if (cursorPosition !== textContent.length) {
            return false;
        }
        // Exit only when content ends with three newlines (user pressed Enter 3 times at the end)
        // This means there are two empty lines at the end
        return textContent.endsWith('\n\n\n');
    };
    CodeRenderer.prototype.exitCodeBlock = function (codeElement, block) {
        var _this = this;
        var blockElement = getParentBlock(codeElement);
        setTimeout(function () {
            var nextSibling = blockElement.nextElementSibling;
            if (nextSibling) {
                _this.parent.setFocusAndUIForNewBlock(nextSibling);
            }
            else {
                var newBlock = BlockFactory.createParagraphBlock();
                _this.parent.blockCommand.addBlock({ block: newBlock, targetBlock: blockElement });
            }
        });
    };
    CodeRenderer.prototype.addIndentation = function () {
        var indent = ' '.repeat(this.INDENT_SIZE);
        var range = this.parent.nodeSelection.getRange();
        range.insertNode(document.createTextNode(indent));
        var endContainer = range.endContainer;
        setCursorPosition(endContainer, range.startOffset + indent.length);
    };
    CodeRenderer.prototype.removeIndentation = function (element) {
        var cursorPosition = this.getCursorPosition(element);
        var textContent = element.textContent;
        // Check for spaces right before the cursor position
        var startCheckPos = Math.max(0, cursorPosition - this.INDENT_SIZE);
        var beforeCursor = textContent.substring(startCheckPos, cursorPosition);
        var spacesBeforeCursor = beforeCursor.match(/\s*$/)[0].length;
        if (spacesBeforeCursor > 0) {
            var removeStart = cursorPosition - spacesBeforeCursor;
            element.textContent = textContent.substring(0, removeStart) + textContent.substring(cursorPosition);
            setCursorPosition(element, removeStart);
        }
    };
    CodeRenderer.prototype.selectEntireCodeBlock = function (element) {
        var range = document.createRange();
        range.selectNodeContents(element);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };
    CodeRenderer.prototype.updateBlockModel = function (codeElement, block) {
        // Since we're using literal newlines now, just use textContent directly
        var textContent = codeElement.textContent || '';
        // Remove trailing newline if it's the only character or if there are multiple trailing newlines,
        // keep only the structure we want
        if (textContent === '\n') {
            textContent = '';
        }
        else if (textContent.endsWith('\n')) {
            // Preserve newlines in the middle of content, but trim excessive trailing newlines
            textContent = textContent.replace(/\n+$/, '');
        }
        if (!block.content || block.content.length === 0) {
            this.parent.blockService.replaceBlock(block.id, __assign({}, decoupleReference(block), { content: [BlockFactory.createTextContent({ content: textContent })] }));
        }
        else {
            block.content[0].content = textContent;
        }
        this.parent.stateManager.updateManagerBlocks();
    };
    CodeRenderer.prototype.handleLocaleChange = function () {
        var codeBlocks = this.parent.rootEditorElement.querySelectorAll('.e-code-block-container');
        for (var _i = 0, _a = Array.from(codeBlocks); _i < _a.length; _i++) {
            var codeBlock = _a[_i];
            var copyButton = codeBlock.querySelector('.e-code-block-copy-button');
            if (copyButton) {
                copyButton.setAttribute('title', this.parent.localeJson['codeCopyTooltip']);
            }
        }
    };
    CodeRenderer.prototype.destroy = function () {
        this.removeEventListeners();
    };
    return CodeRenderer;
}());
export { CodeRenderer };
