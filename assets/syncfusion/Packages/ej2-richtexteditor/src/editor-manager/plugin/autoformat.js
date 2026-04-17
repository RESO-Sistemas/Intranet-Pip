import * as EVENTS from './../../common/constant';
import * as CONSTANT from './../base/constant';
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { SelectionCommands } from './selection-commands';
import { DOMMethods } from './dom-tree';
/**
 * Auto Format internal component
 *
 * @hidden
 * @private
 */
var AutoFormatPlugin = /** @class */ (function () {
    /**
     * Constructor for creating the Auto Format plugin
     *
     * @param {IEditorModel} parent - specifies the parent element.
     * @returns {void}
     * @hidden
     * @private
     */
    function AutoFormatPlugin(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    AutoFormatPlugin.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.AUTO_FORMAT_ACTIONS, this.autoFormat, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    AutoFormatPlugin.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.AUTO_FORMAT_ACTIONS, this.autoFormat);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    AutoFormatPlugin.prototype.findAutoFormatCommandInRange = function (range, text) {
        if (text === void 0) { text = null; }
        var commandsArray = ['*', '~', '`', '_'];
        // Early return if range is null/undefined, use text-based check
        if (!range) {
            return commandsArray.some(function (command) { return text.includes(command); });
        }
        var startContainer = range.startContainer;
        // Early return if not a text node
        if (startContainer.nodeType !== Node.TEXT_NODE) {
            return false;
        }
        var textContent = startContainer.textContent || '';
        var cursorPos = range.startOffset;
        // Early return if no text before cursor
        if (cursorPos <= 0) {
            return false;
        }
        var textBeforeCursor = textContent.substring(0, cursorPos); // converting without space
        // Use some() to exit early on first match
        return commandsArray.some(function (command) { return textBeforeCursor.endsWith(command); });
    };
    AutoFormatPlugin.prototype.findBlockAutoFormatCommandInRange = function (range, text) {
        if (text === void 0) { text = null; }
        var editorValue = range.startContainer.textContent.slice(0, range.startOffset - 1);
        var result = this.isValidBlockAutoFormatCommand(editorValue, range);
        return result;
    };
    AutoFormatPlugin.prototype.autoFormat = function (e) {
        var eventArgs = e.event;
        eventArgs.preventDefault();
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var isCollapsed = range && range.startContainer === range.endContainer && range.startOffset === range.endOffset;
        if (!range || !isCollapsed) {
            return; // Ensure cursor is in a valid, collapsed range
        }
        var startContainer = range.startContainer;
        var cursorPos = range.startOffset;
        // Find the nearest parent element
        var firstBlockParent = this.findFirstBlockParent(startContainer);
        if (!firstBlockParent) {
            return; // No valid inline parent found
        }
        if (firstBlockParent.nodeName === 'PRE' && !(isNullOrUndefined(firstBlockParent.getAttribute('data-language')))) {
            return; // Not processing the inline auto formats for code block elements
        }
        // Get text and nodes for the current line
        var textAndOffset = this.getLineTextAndNodes(firstBlockParent, startContainer, cursorPos);
        var text = textAndOffset.text;
        if (!text) {
            return; // No text to process
        }
        // Find Markdown pattern match
        var matchInfo = this.findMarkdownMatch(text.slice(0, text.length)); // converting without space
        if (!matchInfo) {
            return; // No Markdown pattern matched
        }
        var matchedRange = this.findMarkdownStartEndNodes(textAndOffset.nodes, matchInfo);
        if (!matchedRange) {
            return;
        }
        this.processMarkdownMatch(matchInfo, textAndOffset.nodes, matchedRange);
        this.callBack(e, e.subCommand);
    };
    AutoFormatPlugin.prototype.callBack = function (event, action) {
        if (event.callBack) {
            event.callBack({
                requestType: action,
                event: event.event,
                editorMode: 'HTML',
                isKeyboardEvent: event.name === EVENTS.KEY_DOWN_HANDLER ? true : false,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    AutoFormatPlugin.prototype.findFirstBlockParent = function (startContainer) {
        var node = startContainer;
        while (node && CONSTANT.BLOCK_TAGS.indexOf(node.nodeName.toLocaleLowerCase()) < 0) {
            node = node.parentNode;
        }
        return node;
    };
    AutoFormatPlugin.prototype.getLineTextAndNodes = function (firstBlockParent, startContainer, cursorPos) {
        var text = '';
        var adjustedCursorPos = cursorPos;
        var nodes = [];
        var foundTarget = false;
        var result = this.traverseNodes(firstBlockParent, startContainer, cursorPos, text, adjustedCursorPos, nodes, foundTarget, firstBlockParent);
        return { text: result.text, adjustedCursorPos: result.adjustedCursorPos, nodes: result.nodes };
    };
    AutoFormatPlugin.prototype.traverseNodes = function (firstBlockParent, startContainer, cursorPos, text, adjustedCursorPos, nodes, foundTarget, currentParent) {
        var nodeName = firstBlockParent.nodeName;
        if (nodeName === 'BR') {
            if (!foundTarget) {
                nodes = [];
                text = '';
                adjustedCursorPos = 0;
            }
        }
        if (firstBlockParent.nodeType === Node.TEXT_NODE) {
            var nodeText = firstBlockParent.textContent || '';
            nodes.push(firstBlockParent);
            if (firstBlockParent === startContainer) {
                text += nodeText.slice(0, cursorPos);
                foundTarget = true;
                return { text: text, adjustedCursorPos: adjustedCursorPos, nodes: nodes, foundTarget: foundTarget }; // Stop at cursor position
            }
            else {
                text += nodeText;
                adjustedCursorPos += nodeText.length;
            }
        }
        else if (firstBlockParent.nodeType === Node.ELEMENT_NODE) {
            var childNodes = firstBlockParent.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var childResult = this.traverseNodes(childNodes[i], startContainer, cursorPos, text, adjustedCursorPos, nodes, foundTarget, currentParent);
                text = childResult.text;
                adjustedCursorPos = childResult.adjustedCursorPos;
                nodes = childResult.nodes;
                foundTarget = childResult.foundTarget;
                if (foundTarget) {
                    return { text: text, adjustedCursorPos: adjustedCursorPos, nodes: nodes, foundTarget: foundTarget }; // Stop if target found or no progress
                }
            }
        }
        return { text: text, adjustedCursorPos: adjustedCursorPos, nodes: nodes, foundTarget: foundTarget };
    };
    AutoFormatPlugin.prototype.findMarkdownMatch = function (text) {
        // Define Markdown patterns/
        var patterns = [
            { regex: /\*\*\*([^*]+)\*\*\*$/, tag: 'em-strong', syntax: '***' },
            { regex: /___([^_]+)___$/, tag: 'em-strong', syntax: '___' },
            { regex: /\*\*([^*]+)\*\*$/, tag: 'strong', syntax: '**' },
            { regex: /__([^_]+)__$/, tag: 'strong', syntax: '__' },
            { regex: /\*([^*]+)\*$/, tag: 'em', syntax: '*' },
            { regex: /_([^_]+)_$/, tag: 'em', syntax: '_' },
            { regex: /`([^`]+)`$/, tag: 'code', syntax: '`' },
            { regex: /~~([^~]+)~~$/, tag: 's', syntax: '~~' } // ~~strikethrough~~
        ];
        var notAllowedMatches = [
            { regex: /\*+[^*]+\*+$/ },
            { regex: /_+[^_]+_+$/ }
        ];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            var match = text.match(pattern.regex);
            if (match && match[1]) {
                if (pattern.tag === 'strong' || pattern.tag === 'em') {
                    for (var j = 0; j < notAllowedMatches.length; j++) {
                        var notAllowedMatch = notAllowedMatches[j];
                        var notAllowedMatchResult = text.match(notAllowedMatch.regex);
                        if (notAllowedMatchResult && notAllowedMatchResult[0] === match[0]) {
                            return { match: match, tag: pattern.tag, syntax: pattern.syntax };
                        }
                    }
                }
                else {
                    return { match: match, tag: pattern.tag, syntax: pattern.syntax };
                }
            }
        }
        return null;
    };
    AutoFormatPlugin.prototype.isValidBlockAutoFormatCommand = function (editorValue, range) {
        var patterns = [
            { regex: /^#$/, tag: 'h1', format: 'Formats' },
            { regex: /^##$/, tag: 'h2', format: 'Formats' },
            { regex: /^###$/, tag: 'h3', format: 'Formats' },
            { regex: /^####$/, tag: 'h4', format: 'Formats' },
            { regex: /^#####$/, tag: 'h5', format: 'Formats' },
            { regex: /^######$/, tag: 'h6', format: 'Formats' },
            { regex: /^>$/, tag: 'blockquote', format: 'Formats' },
            { regex: /^(---|___)$/, tag: 'hr', format: 'InsertHtml' },
            { regex: /^```$/, tag: 'CodeBlock', format: 'CodeBlock' }
        ];
        var domMethods = new DOMMethods(this.parent.editableElement);
        var parentElement = (CONSTANT.BLOCK_TAGS.indexOf(range.startContainer.nodeName.toLocaleLowerCase()) > -1) ?
            range.startContainer : domMethods.getParentBlockNode(range.startContainer);
        var headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        var notAllowedInCodeBlock = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'CodeBlock'];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            var match = editorValue.match(pattern.regex);
            if (match && (pattern.tag !== parentElement.tagName.toLowerCase() || pattern.tag === 'blockquote')
                && !(parentElement.tagName === 'PRE' && !isNullOrUndefined(parentElement.getAttribute('data-language')) && notAllowedInCodeBlock.indexOf(pattern.tag) > -1)) {
                if (pattern.tag === 'CodeBlock' && isNullOrUndefined(this.parent.codeBlockObj)) {
                    return null;
                }
                // Remove the text content
                range.startContainer.textContent = range.startContainer.textContent.slice(range.startOffset, range.startContainer.textContent.length);
                // If the text node is now empty, replace it with a <br> element
                var emptyTextNode = range.startContainer;
                if (emptyTextNode.nodeType === Node.TEXT_NODE && emptyTextNode.textContent === '') {
                    var brElement = createElement('br');
                    var parentNode = emptyTextNode.parentNode;
                    if (parentNode) {
                        parentNode.replaceChild(brElement, emptyTextNode);
                    }
                }
                return { tag: pattern.tag, format: pattern.format };
            }
            else if (match && headingTags.indexOf(pattern.tag) > -1 && pattern.tag === parentElement.tagName.toLowerCase()) {
                range.startContainer.textContent = range.startContainer.textContent.slice(range.startOffset, range.startContainer.textContent.length);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, parentElement, 0);
                return { tag: 'p', format: pattern.format };
            }
        }
        return null;
    };
    AutoFormatPlugin.prototype.findMarkdownStartEndNodes = function (textNodes, matchInfo) {
        var match = matchInfo.match;
        var matchedText = match[0];
        var startIndex = match.index;
        var deleteLength = (matchedText.length - match[1].length) / 2;
        var syntax = matchInfo.syntax.slice(0, deleteLength > 1 ? deleteLength - 1 : 0);
        var endIndex = (startIndex + matchedText.length) - deleteLength;
        var cumulativeLength = 0;
        var startNodeIndex = -1;
        var endNodeIndex = -1;
        var startPosition = -1;
        var endPosition = -1;
        for (var i = 0; i < textNodes.length; i++) {
            var nodeText = textNodes[i].textContent || '';
            var nextCumulativeLength = cumulativeLength + nodeText.length;
            // Check if start index falls within this node
            if (startNodeIndex === -1 && startIndex >= cumulativeLength && startIndex < nextCumulativeLength) {
                startNodeIndex = i;
                startPosition = startIndex - cumulativeLength;
                nextCumulativeLength = nextCumulativeLength + this.deleteMarkerFromNodes(textNodes, i, startPosition, deleteLength, syntax);
            }
            // Check if end index falls within this nodes
            if (endIndex >= cumulativeLength && endIndex < nextCumulativeLength) {
                endNodeIndex = i;
                endPosition = endIndex - cumulativeLength;
                if (startNodeIndex === endNodeIndex) {
                    endPosition = endPosition - deleteLength;
                }
                nextCumulativeLength = nextCumulativeLength + this.deleteMarkerFromNodes(textNodes, i, endPosition, deleteLength, syntax);
                break; // End index found, no need to continue
            }
            cumulativeLength = nextCumulativeLength;
        }
        if (startNodeIndex === -1 || endNodeIndex === -1 || startPosition === -1 || endPosition === -1) {
            return null; // Match spans nodes incorrectly or not found
        }
        return { startNodeIndex: startNodeIndex, endNodeIndex: endNodeIndex, startPosition: startPosition, endPosition: endPosition };
    };
    AutoFormatPlugin.prototype.deleteMarkerFromNodes = function (textNodes, currentIndex, startPosition, deleteLength, syntax) {
        var currentNode = textNodes[currentIndex];
        var currentText = currentNode.textContent || '';
        // Ensure startPosition is within bounds
        if (startPosition < 0 || startPosition >= currentText.length) {
            return 0;
        }
        // Calculate portion to delete from current node
        var deleteFromCurrent = Math.min(deleteLength, currentText.length - startPosition);
        if (deleteFromCurrent > 0) {
            currentNode.deleteData(startPosition, deleteFromCurrent);
        }
        // Handle remaining length if marker spans to next node
        var remainingLength = deleteLength - deleteFromCurrent;
        if (remainingLength > 0 && currentIndex + 1 < textNodes.length) {
            var nextNode = textNodes[currentIndex + 1];
            var nextText = nextNode.textContent || '';
            if (nextText.startsWith(syntax.repeat(remainingLength))) {
                nextNode.deleteData(0, remainingLength);
            }
            return remainingLength;
        }
        return 0;
    };
    AutoFormatPlugin.prototype.processMarkdownMatch = function (matchInfo, textNodes, macthedRange) {
        var tag = matchInfo.tag;
        switch (tag) {
            case 'em-strong':
                // Wrap content with <em><strong> tags
                this.wrapContentWithTags(textNodes, macthedRange, 'italic', 'bold');
                break;
            case 'strong':
                // Wrap content with <strong> tag
                this.wrapContentWithTags(textNodes, macthedRange, 'bold');
                break;
            case 'em':
                // Wrap content with <em> tag
                this.wrapContentWithTags(textNodes, macthedRange, 'italic');
                break;
            case 'code':
                // Wrap content with <code> tag
                this.wrapContentWithTags(textNodes, macthedRange, 'inlinecode');
                break;
            case 's':
                // Wrap content with <s> tag for strikethrough
                this.wrapContentWithTags(textNodes, macthedRange, 'strikethrough');
                break;
        }
    };
    AutoFormatPlugin.prototype.wrapContentWithTags = function (textNodes, macthedRange) {
        var tags = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tags[_i - 2] = arguments[_i];
        }
        // Implementation to wrap content with specified tags
        // This is a placeholder; actual DOM manipulation would depend on your editor's API
        var range = document.createRange();
        var startNode = textNodes[macthedRange.startNodeIndex];
        var endNode = textNodes[macthedRange.endNodeIndex];
        if (startNode.textContent.length === macthedRange.startPosition) {
            startNode = textNodes[macthedRange.startNodeIndex + 1];
            macthedRange.startPosition = 0;
        }
        range.setStart(startNode, macthedRange.startPosition);
        range.setEnd(endNode, macthedRange.endPosition);
        this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, range.startContainer, range.endContainer, range.startOffset, range.endOffset);
        SelectionCommands.applyFormat(this.parent.currentDocument, tags[0], this.parent.editableElement, this.enterkey);
        if (!isNullOrUndefined(tags[1])) {
            SelectionCommands.applyFormat(this.parent.currentDocument, tags[1], this.parent.editableElement, this.enterkey);
        }
        var selectedNodes = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument);
        var selectedContent = selectedNodes[selectedNodes.length - 1];
        var isBoldItalic = tags.length === 2;
        var isRevert = this.isReverted(selectedContent, tags);
        this.setCursorPoint(selectedContent, isBoldItalic, isRevert);
    };
    AutoFormatPlugin.prototype.setCursorPoint = function (selectedContent, isBoldItalic, isRevert) {
        var doc = this.parent.currentDocument;
        if (isRevert) {
            this.parent.nodeSelection.setCursorPoint(doc, selectedContent, selectedContent.textContent.length);
        }
        else if (!isBoldItalic) {
            selectedContent.parentElement.insertAdjacentText('afterend', '\u200B'); // added a zero width space and focused
            this.parent.nodeSelection.setCursorPoint(doc, selectedContent.parentElement.nextSibling, 1);
        }
        else {
            selectedContent.parentElement.parentElement.insertAdjacentText('afterend', '\u200B'); // added a zero width space and focused
            this.parent.nodeSelection.setCursorPoint(doc, selectedContent.parentElement.parentElement.nextSibling, 1);
        }
    };
    AutoFormatPlugin.prototype.isReverted = function (selectedContent, tags) {
        var element = tags[tags.length - 1];
        var parentElement = selectedContent.parentElement;
        var appliedFormat;
        switch (element) {
            case 'bold':
                appliedFormat = 'STRONG';
                break;
            case 'italic':
                appliedFormat = 'EM';
                break;
            case 'inlinecode':
                appliedFormat = 'CODE';
                break;
            case 'strikethrough':
                appliedFormat = 'SPAN';
                break;
        }
        if (appliedFormat === 'SPAN') {
            if (parentElement.nodeName === 'SPAN' && parentElement.style.textDecoration === 'line-through') {
                return false;
            }
            else {
                return true;
            }
        }
        if (parentElement.nodeName === appliedFormat) {
            return false;
        }
        else {
            return true;
        }
    };
    AutoFormatPlugin.prototype.destroy = function () {
        this.removeEventListener();
    };
    return AutoFormatPlugin;
}());
export { AutoFormatPlugin };
