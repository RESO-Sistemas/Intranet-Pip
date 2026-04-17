import * as EVENTS from '../../common/constant';
import { Browser, createElement, detach, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { InsertMethods } from './insert-methods';
import { scrollToCursor } from '../../common/util';
import { NodeSelection } from '../../selection/selection';
var EnterKeyAction = /** @class */ (function () {
    function EnterKeyAction(parent) {
        this.parent = parent;
        this.addEventListener();
        this.nodeSelection = new NodeSelection(this.parent.editableElement);
    }
    EnterKeyAction.prototype.destroy = function () {
        this.removeEventListener();
        this.nodeSelection = null;
    };
    EnterKeyAction.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.ENTER_KEYDOWN_HANLDER, this.actionHandler, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    EnterKeyAction.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.ENTER_KEYDOWN_HANLDER, this.actionHandler);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    EnterKeyAction.prototype.actionHandler = function (args) {
        var keyboardArgs = args.event;
        this.isEntireRTE = args.isSelectAll;
        this.enterKey = args.enterAction;
        this.shiftEnterKey = args.shiftEnterAction;
        var isShiftEnter = !keyboardArgs.ctrlKey && !keyboardArgs.altKey && keyboardArgs.shiftKey;
        var captionContainer = this.getCaptionContainerForRange();
        this.isEnterInCaption = captionContainer ? true : false;
        if ((this.enterKey === 'BR' && !isShiftEnter) || (this.shiftEnterKey === 'BR' && isShiftEnter) || captionContainer) {
            this.shiftEnterHandler(keyboardArgs, args);
        }
        else if ((this.enterKey === 'P' && !isShiftEnter) || (this.enterKey === 'DIV' && !isShiftEnter) ||
            (this.shiftEnterKey === 'P' && isShiftEnter) || (this.shiftEnterKey === 'DIV' && isShiftEnter)) {
            this.enterHandler(keyboardArgs, args);
        }
    };
    EnterKeyAction.prototype.enterHandler = function (originalEvent, args) {
        var isValidSelection = !(this.range.startOffset === this.range.endOffset &&
            this.range.startContainer === this.range.endContainer);
        if (!this.range.collapsed && isValidSelection) {
            var stopProcessing = this.handleSelectionEnter(originalEvent);
            this.getRangeNode();
            this.specialElementCursor = this.processedTableImageCursor();
            if (stopProcessing) { // Partial selection of two nodes does not need inserting new node.
                originalEvent.preventDefault();
                this.triggerActionCompleteCallBack(args, args.event.shiftKey);
                return;
            }
        }
        if (this.specialElementCursor.start || this.specialElementCursor.end) {
            if (this.specialElementCursor.startName === 'TABLE' || this.specialElementCursor.endName === 'TABLE') { // Default browser action prevented and hanled manually.
                this.enterAtTableSide(originalEvent, this.specialElementCursor.start, this.specialElementCursor.end, args);
                return; // Early enter due to Edge case.
            }
            else {
                this.enterKeyAtMediaSide(originalEvent, this.specialElementCursor.start, this.specialElementCursor.end, args);
                return; // Early enter due to Edge case.
            }
        }
        else if ((this.range.startContainer.nodeName === 'HR') || (this.range.startContainer.nodeName !== '#text' && this.range.startContainer.childNodes[this.range.startOffset] && this.range.startContainer.childNodes[this.range.startOffset].nodeName === 'HR')) {
            this.enterAtHorizontalLine(originalEvent, args);
            return;
        }
        var isStart = this.isCursorAtStart();
        var isEnd = this.isCursorAtEnd();
        var startBlockParent = this.getStartBlocKParent();
        if (startBlockParent === this.parent.editableElement) {
            var startElement = this.range.startContainer;
            if (startElement !== this.parent.editableElement) {
                startBlockParent = startElement;
            }
            else {
                var fallbackElement = this.parent.editableElement.childNodes[this.range.startOffset];
                if (!isNOU(fallbackElement)) {
                    startBlockParent = fallbackElement;
                }
            }
        }
        var brBeforeTextNodeRange = this.hasOnlyBRBeforeCursor(startBlockParent); // Use case of <p><br>Content</p>, Cursort at C Text Node of zero.
        if (isEnd) {
            var insertElem = this.cloneNodePreservingStructure(this.range, true, originalEvent.shiftKey);
            var lastChild = this.getLastChild(insertElem);
            if (lastChild.nodeName !== 'BR') {
                lastChild.appendChild(this.parent.currentDocument.createElement('br'));
            }
            InsertMethods.AppendBefore(insertElem, startBlockParent, true);
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, lastChild, 0);
        }
        else if (isStart || brBeforeTextNodeRange) {
            var insertElem = this.cloneNodePreservingStructure(this.range, false, originalEvent.shiftKey);
            var lastChild = this.getLastChild(insertElem);
            lastChild.appendChild(this.parent.currentDocument.createElement('br'));
            InsertMethods.AppendBefore(insertElem, startBlockParent, false);
        }
        else { // Middle cursor
            if (startBlockParent.nodeName !== '#text') {
                this.parent.nodeCutter.SplitNode(this.range, startBlockParent, this.range.collapsed);
            }
            else { // when cursor at text node middle
                var startNode = startBlockParent;
                while (startNode.parentNode && startNode.parentNode !== this.parent.editableElement) {
                    startNode = startNode.parentNode;
                }
                var resultSplitNode = this.parent.nodeCutter.
                    SplitNode(this.range, startNode, this.range.collapsed);
                var firstSplitNode = resultSplitNode.previousSibling;
                var insertElem = createElement(originalEvent.shiftKey ? this.shiftEnterKey : this.enterKey);
                insertElem.appendChild(resultSplitNode);
                InsertMethods.AppendBefore(insertElem, firstSplitNode, true);
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, insertElem, 0);
            }
        }
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
    };
    EnterKeyAction.prototype.getRangeNode = function () {
        this.range = this.nodeSelection.getRange(this.parent.currentDocument);
        this.startNode = this.range.startContainer.nodeName === '#text' ? this.range.startContainer.parentElement :
            this.range.startContainer;
        this.endNode = this.range.endContainer.nodeName === '#text' ? this.range.endContainer.parentElement :
            this.range.endContainer;
    };
    /**
     * Returns the `.e-img-inner` container if both range start and end are inside the same caption.
     * Otherwise returns null.
     *
     * @returns {HTMLElement | null} The caption container when both ends are inside it, otherwise null.
     */
    EnterKeyAction.prototype.getCaptionContainerForRange = function () {
        var startElem = this.startNode;
        var endElem = this.endNode;
        var startCaption;
        var endCaption;
        if (!this.parent.isBlazor) {
            startCaption = (startElem && startElem.closest) ? startElem.closest('.e-img-caption-text') : null;
            endCaption = (endElem && endElem.closest) ? endElem.closest('.e-img-caption-text') : null;
        }
        else {
            startCaption = (startElem && startElem.closest) ? startElem.closest('.e-img-inner') : null;
            endCaption = (endElem && endElem.closest) ? endElem.closest('.e-img-inner') : null;
        }
        return (startCaption && endCaption && startCaption === endCaption) ? startCaption : null;
    };
    EnterKeyAction.prototype.isEnterActionAllowed = function (originalEvent) {
        if (!originalEvent.ctrlKey && !originalEvent.altKey && (!Browser.isDevice ? (originalEvent.code === 'Enter' || originalEvent.code === 'NumpadEnter') : originalEvent.key === 'Enter')) {
            this.getRangeNode();
            if (!this.parent.editableElement.contains(this.startNode)) {
                return false;
            }
            this.specialElementCursor = this.processedTableImageCursor();
            if (this.specialElementCursor.start || this.specialElementCursor.end) {
                if (this.specialElementCursor.startName === 'TABLE' || this.specialElementCursor.endName === 'TABLE') {
                    return true; // No need to further process since the cursor infront of the table and image has unique range thus early return.
                }
            }
            if (this.specialElementCursor.start || this.specialElementCursor.end || this.range.startContainer.nodeName === 'IMG') {
                return true; // No need to further process since the cursor infront of the table and image has unique range thus early return.
            }
            var preventedSelectors = 'li, ul, ol, pre, pre code, blockquote';
            if (this.startNode.closest('table, tbody, td, th')) {
                var closestBlockParent = this.parent.domTree.getParentBlockNode(this.startNode);
                var notAllowedTableElemTags = ['td', 'th', 'tbody'];
                if (notAllowedTableElemTags.indexOf(closestBlockParent.nodeName.toLowerCase()) > -1 ||
                    !isNOU(closestBlockParent.closest(preventedSelectors))) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (isNOU(this.startNode.closest(preventedSelectors)) && isNOU(this.endNode.closest(preventedSelectors))) {
                return true;
            }
            return false;
        }
        return false;
    };
    EnterKeyAction.prototype.enterAtTableSide = function (originalEvent, isStart, isEnd, args) {
        var newElement = createElement(this.enterKey);
        newElement.innerHTML = '<br>';
        var tableElement;
        if (isStart) {
            tableElement = this.range.startContainer.nodeName === 'TABLE' ? this.range.startContainer :
                this.range.startContainer.childNodes[this.range.startOffset];
            tableElement.parentElement.insertBefore(newElement, tableElement);
        }
        else if (isEnd) {
            var offset = this.range.startOffset > 0 ? this.range.startOffset - 1 : this.range.startOffset;
            tableElement = this.range.startContainer.childNodes[offset];
            if (!isNOU(tableElement)) {
                if (!isNOU(tableElement.nextSibling)) {
                    tableElement.parentElement.insertBefore(newElement, tableElement.nextSibling);
                }
                else if (isNOU(tableElement.nextSibling)) {
                    tableElement.parentElement.appendChild(newElement);
                }
            }
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, newElement, 0);
        }
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
    };
    EnterKeyAction.prototype.enterKeyAtMediaSide = function (originalEvent, isStart, isEnd, args) {
        var insertElem = createElement(this.enterKey);
        insertElem.appendChild(createElement('br'));
        var startBlockParent = this.parent.domTree.getParentBlockNode(this.range.startContainer);
        if (startBlockParent.nodeName === 'TD' || startBlockParent.nodeName === 'TR') {
            startBlockParent = this.range.startContainer;
        }
        if (this.isValidSpecialElement(this.range.startContainer)) {
            var isEnd_1 = this.range.startOffset === 1;
            InsertMethods.AppendBefore(insertElem, startBlockParent, isEnd_1);
            if (isEnd_1) {
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, insertElem, 0);
            }
        }
        else if (isStart) {
            var insertElem_1 = this.cloneNodePreservingStructure(this.range, false, originalEvent.shiftKey);
            var lastChild = this.getLastChild(insertElem_1);
            lastChild.appendChild(this.parent.currentDocument.createElement('br'));
            InsertMethods.AppendBefore(insertElem_1, startBlockParent, false);
        }
        else if (isEnd) {
            InsertMethods.AppendBefore(insertElem, startBlockParent, true);
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, insertElem, 0);
        }
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
    };
    EnterKeyAction.prototype.triggerActionCompleteCallBack = function (args, isShiftKey) {
        scrollToCursor(this.parent.currentDocument, this.parent.editableElement);
        this.parent.editableElement.dispatchEvent(new Event('input'));
        args.callBack({
            requestType: isShiftKey ? 'ShiftEnterAction' : 'EnterAction',
            event: args.event
        });
    };
    EnterKeyAction.prototype.isCursorAtStart = function () {
        var tempBlock = this.parent.domTree.getParentBlockNode(this.range.startContainer);
        var startBlockParent = tempBlock === this.parent.editableElement ?
            this.range.startContainer.parentElement : tempBlock;
        var isDirectBlockRange = this.range.startContainer.nodeType === Node.ELEMENT_NODE &&
            this.parent.domNode.isBlockNode(this.range.startContainer);
        if (isDirectBlockRange && this.range.startOffset === 0) {
            return true; // Edge case of P as start container and then offset of 0.
        }
        var firstPosition = this.nodeSelection.findFirstContentNode(startBlockParent);
        if (!isNOU(firstPosition)) {
            if (firstPosition.node.nodeName === 'BR') {
                var range = this.range.cloneRange();
                range.setStartBefore(firstPosition.node);
                range.setEndBefore(firstPosition.node);
                return (range.startContainer === this.range.startContainer && range.startOffset === this.range.startOffset);
            }
            if (this.range.startContainer.firstChild === firstPosition.node && this.range.startOffset === firstPosition.position) {
                return true; // Edge case of strong as start container and then offset of 0. When stong element is wrapped inside the div or p element , this is rare browser selction case
            }
            if (this.range.startContainer === firstPosition.node && this.range.startOffset === firstPosition.position) {
                return true;
            }
        }
        return false;
    };
    EnterKeyAction.prototype.isCursorAtEnd = function () {
        var tempBlock = this.isEnterInCaption ? this.startNode :
            this.parent.domTree.getParentBlockNode(this.range.startContainer);
        var startBlockParent = tempBlock === this.parent.editableElement ?
            this.range.startContainer.parentElement : tempBlock;
        if (this.enterKey === 'BR') {
            startBlockParent = startBlockParent === this.parent.editableElement ?
                this.range.startContainer : startBlockParent;
        }
        var lastPosition = this.nodeSelection.findLastTextPosition(startBlockParent);
        if (this.isEndDirectRange()) {
            return true;
        }
        if (!isNOU(lastPosition)) {
            var isEmptyTextNodeAfterMention = this.isEmptyTextNodeAfterMentionChip(lastPosition.node, lastPosition.offset);
            if (isEmptyTextNodeAfterMention) {
                return true;
            }
            if (lastPosition.node.nodeName === 'BR') {
                var range = this.range.cloneRange();
                range.setStartBefore(lastPosition.node);
                range.setEndBefore(lastPosition.node);
                if (range.startContainer === this.parent.editableElement &&
                    this.parent.editableElement.childNodes[range.startOffset] === lastPosition.node) {
                    return true; // Edge case when current range is Br and cloned range startoffset is 0
                }
                // Check if cursor is positioned AFTER the BR (at the end)
                var rangeAfterBR = this.range.cloneRange();
                rangeAfterBR.setStartAfter(lastPosition.node);
                rangeAfterBR.setEndAfter(lastPosition.node);
                if (rangeAfterBR.startContainer === this.range.startContainer && rangeAfterBR.startOffset === this.range.startOffset) {
                    return true;
                }
                // Check if cursor is positioned BEFORE the BR
                if (range.startContainer === this.range.startContainer && range.startOffset === this.range.startOffset) {
                    return true;
                }
            }
            return this.range.startContainer === lastPosition.node && this.range.startOffset === lastPosition.offset;
        }
        return false;
    };
    EnterKeyAction.prototype.getLastChild = function (node) {
        var currentNode = node;
        while (currentNode.lastChild) {
            currentNode = currentNode.lastChild;
        }
        return currentNode;
    };
    /**
     * Clones the DOM up to the given range position, even if nothing is selected.
     * Ensures parent hierarchy is preserved (e.g., <p><strong></strong></p>).
     *
     * @param {Range} range - The range where the cursor is placed.
     * @param {boolean} skipBlock - Whether to generate only a block element based on enter key configuration or not.
     * @param {boolean} isShiftKey - Whether the Shift key is pressed.
     *
     * @returns {DocumentFragment} - A fragment with empty structure up to the cursor.
     */
    EnterKeyAction.prototype.cloneNodePreservingStructure = function (range, skipBlock, isShiftKey) {
        var finalFragment = this.parent.currentDocument.createDocumentFragment();
        var textNode = range.startContainer;
        var currentNode = textNode;
        var isDirectRange = this.isStartDirectRange() || this.isEndDirectRange();
        if (isDirectRange) { // Direct range div with offset 1 where the element is Horizontal line.
            var tempStartNode = this.range.startContainer.childNodes[this.range.startOffset];
            var endOffset = this.range.startOffset > 0 ? this.range.startOffset - 1 : this.range.startOffset;
            var tempEndNode = this.range.startContainer.childNodes[endOffset];
            if ((!isNOU(tempStartNode) && tempStartNode.nodeName !== 'HR') || (!isNOU(tempEndNode) && tempEndNode.nodeName !== 'HR')) {
                currentNode = this.isStartDirectRange() ? tempStartNode : tempEndNode;
            }
        }
        var deepClone = (currentNode.nodeType !== Node.TEXT_NODE && !this.isEndDirectRange()) ? currentNode.cloneNode(false) : null;
        //Edge case when directly setting the range at the end of the editableElements childNodes
        if (isDirectRange && this.isEndDirectRange()) {
            var lastPosition = this.nodeSelection.findLastTextPosition(currentNode);
            if (!isNOU(lastPosition) && lastPosition.node.nodeName === '#text') {
                currentNode = lastPosition.node;
            }
        }
        while (currentNode !== null && !this.parent.domNode.isBlockNode(currentNode)) {
            var parent_1 = currentNode.parentNode;
            if (parent_1 === this.parent.editableElement) {
                currentNode = parent_1;
                break;
            }
            var shallowClone = parent_1.cloneNode(false);
            if (isNOU(deepClone)) {
                deepClone = shallowClone;
            }
            else {
                shallowClone.appendChild(deepClone);
                deepClone = shallowClone;
            }
            currentNode = parent_1;
            if (this.parent.domNode.isBlockNode(parent_1)) {
                break;
            }
        }
        if (!isNOU(deepClone) || currentNode === this.parent.editableElement) {
            if (skipBlock || isShiftKey) {
                var blockElem = this.parent.currentDocument.createElement(isShiftKey ? this.shiftEnterKey : this.enterKey);
                var attributes = !isNOU(deepClone) ? deepClone.attributes : null;
                if (attributes && attributes.length > 0 && currentNode !== this.parent.editableElement) { // Copy if there are attributes exsist.
                    for (var i = 0; i < attributes.length; i++) {
                        var attr = attributes[i];
                        blockElem.setAttribute(attr.name, attr.value);
                    }
                }
                if (deepClone && deepClone.childNodes.length > 0) {
                    blockElem.appendChild(deepClone.firstChild.cloneNode(true));
                    finalFragment.appendChild(blockElem);
                }
                else {
                    finalFragment.appendChild(blockElem);
                }
            }
            else {
                finalFragment.appendChild(deepClone);
            }
        }
        var deniedTags = 'a';
        var deniedElements = finalFragment.querySelectorAll(deniedTags);
        for (var i = 0; i < deniedElements.length; i++) {
            var element = deniedElements[i];
            element.remove();
        }
        return finalFragment;
    };
    EnterKeyAction.prototype.cloneNodePreservingStructureBR = function (range, skipBlock, isShiftKey) {
        var finalFragment = this.parent.currentDocument.createDocumentFragment();
        var textNode = range.startContainer;
        var currentNode = textNode;
        var deepClone = range.startContainer.nodeType !== Node.TEXT_NODE ? range.startContainer.cloneNode(false) : null;
        while (currentNode !== null && !this.parent.domNode.isBlockNode(currentNode)) {
            var parent_2 = currentNode.parentNode;
            if (this.parent.domNode.isBlockNode(parent_2) || parent_2 === this.parent.editableElement) {
                break;
            }
            var shallowClone = parent_2.cloneNode(false);
            if (isNOU(deepClone)) {
                deepClone = shallowClone;
            }
            else {
                shallowClone.appendChild(deepClone);
                deepClone = shallowClone;
            }
            currentNode = parent_2;
        }
        if (!isNOU(deepClone)) {
            if (skipBlock || isShiftKey) {
                var blockElem = this.parent.currentDocument.createElement(isShiftKey ? this.shiftEnterKey : this.enterKey);
                var attributes = deepClone.attributes;
                if (attributes.length > 0) { // Copy if there are attributes exsist.
                    for (var i = 0; i < attributes.length; i++) {
                        var attr = attributes[i];
                        blockElem.setAttribute(attr.name, attr.value);
                    }
                }
                if (deepClone.childNodes.length > 0) {
                    blockElem.appendChild(deepClone.firstChild.cloneNode(true));
                    finalFragment.appendChild(blockElem);
                }
                else {
                    finalFragment.appendChild(blockElem);
                }
            }
            else {
                finalFragment.appendChild(deepClone);
            }
        }
        var deniedTags = 'a';
        var deniedElements = finalFragment.querySelectorAll(deniedTags);
        for (var i = 0; i < deniedElements.length; i++) {
            var element = deniedElements[i];
            element.remove();
        }
        return finalFragment;
    };
    EnterKeyAction.prototype.isTableOrImageStart = function () {
        // 1) Range must be collapsed
        if (!this.range.collapsed && this.range.startContainer !== this.range.endContainer) {
            return { start: false };
        }
        var startContainer = this.range.startContainer;
        var isEmptyTextNodeInfrontOfImage = this.isTextNodeInfrontOfImage();
        if ((this.isValidSpecialElement(startContainer) && this.range.startOffset === 0) || isEmptyTextNodeInfrontOfImage) {
            var type = this.getSpecialElementType(startContainer);
            return { start: true, startName: type, startNode: startContainer };
        }
        // 2) Caret must be inside an editable element node
        if (startContainer.nodeType !== Node.ELEMENT_NODE || !startContainer.isContentEditable) {
            return { start: false };
        }
        // 3) Grab the child node at the caret position
        var child = startContainer.childNodes[this.range.startOffset];
        if (isNOU(child)) {
            return { start: false };
        }
        // 4) Check node type
        if (this.isValidSpecialElement(child)) {
            var type = this.getSpecialElementType(child);
            return { start: true, startName: type, startNode: child };
        }
        return { start: false };
    };
    EnterKeyAction.prototype.isTableOrImageEnd = function () {
        // 1) Range must be collapsed
        if (!this.range.collapsed && this.range.startContainer !== this.range.endContainer) {
            return { end: false };
        }
        var startContainer = this.range.startContainer;
        if (this.isValidSpecialElement(startContainer) || this.isTextNodeAfterImage()) {
            var type = this.getSpecialElementType(startContainer);
            return { end: true, endName: type, endNode: startContainer };
        }
        var startOffset = this.range.startOffset;
        // 2) Caret must be inside an editable element node
        if (startContainer.nodeType !== Node.ELEMENT_NODE || !startContainer.isContentEditable) {
            return { end: false };
        }
        // 3) For "end" check, we need the node just before the caret (startOffset - 1)
        if (startOffset <= 0) {
            return { end: false };
        }
        var child = startContainer.childNodes[startOffset - 1];
        if (isNOU(child)) {
            return { end: false };
        }
        // 4) Check node type and classes
        if (this.isValidSpecialElement(child) && isNOU(child.nextSibling)) {
            var type = this.getSpecialElementType(child);
            return { end: true, endName: type, endNode: child };
        }
        // 5) Check the cursor at the end of the table
        if (child.nodeName === 'TABLE' && startOffset !== 0) {
            return { end: true, endName: 'TABLE', endNode: child };
        }
        return { end: false };
    };
    EnterKeyAction.prototype.processedTableImageCursor = function () {
        var _a = this.isTableOrImageStart(), start = _a.start, startName = _a.startName, startNode = _a.startNode;
        var _b = this.isTableOrImageEnd(), end = _b.end, endName = _b.endName, endNode = _b.endNode;
        return { start: start, startName: startName, startNode: startNode, end: end, endName: endName, endNode: endNode };
    };
    EnterKeyAction.prototype.shiftEnterHandler = function (originalEvent, args) {
        // Ensure range info is current before handling caption or special elements
        this.getRangeNode();
        if ((this.specialElementCursor.start || this.specialElementCursor.end) && !this.isEntireRTE) {
            if (this.specialElementCursor.startName === 'TABLE' || this.specialElementCursor.endName === 'TABLE') { // Default browser action prevented and hanled manually.
                this.shiftEnterAtTableSide(originalEvent, this.specialElementCursor.start, this.specialElementCursor.end, args);
                return; // Early enter due to Edge case.
            }
            else {
                this.shiftEnterAtMediaSide(originalEvent, this.specialElementCursor.start, this.specialElementCursor.end, args);
                return; // Early enter due to Edge case.
            }
        }
        var isValidSelection = !(this.range.startOffset === this.range.endOffset &&
            this.range.startContainer === this.range.endContainer);
        if (!this.range.collapsed && isValidSelection) {
            var stopProcessing = this.handleSelectionEnter(originalEvent);
            this.getRangeNode();
            if (stopProcessing) { // Partial selection of two nodes does not need inserting new node.
                originalEvent.preventDefault();
                this.triggerActionCompleteCallBack(args, args.event.shiftKey);
                return;
            }
        }
        var isStart = this.isCursorAtStart() || (this.range.collapsed && this.isEnterInCaption && this.range.startOffset === 0);
        var isEnd = this.isCursorAtEnd();
        if (isStart) {
            var startNode = this.getBRInsertReferenceNode(this.range.startContainer, 'start');
            var fragment = this.parent.currentDocument.createDocumentFragment();
            fragment.appendChild(createElement('br'));
            InsertMethods.AppendBefore(fragment, startNode, false);
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, startNode, 0);
            this.isEnterInCaption = false;
        }
        else if (isEnd) {
            var startNode = this.getBRInsertReferenceNode(this.range.startContainer, 'end');
            var blockParent = this.parent.domNode.getImmediateBlockNode(startNode);
            var hasBlockParent = blockParent.nodeType === Node.TEXT_NODE || (startNode.nodeName === 'BR' && blockParent === this.parent.editableElement);
            var fragment = hasBlockParent || this.isEnterInCaption ?
                this.parent.currentDocument.createDocumentFragment()
                : this.cloneNodePreservingStructureBR(this.range, false, false);
            var lastChild = this.getLastChild(fragment);
            var insertElem = void 0;
            if (lastChild.nodeName === 'BR') {
                insertElem = lastChild;
            }
            else {
                insertElem = lastChild.appendChild(createElement('br'));
            }
            var afterElement = (this.enterKey === 'BR' && blockParent !== this.parent.editableElement && !args.event.shiftKey) ? blockParent : startNode;
            var isNextNodeBR = afterElement.nodeName === '#text' && afterElement.nextSibling && afterElement.nextSibling.nodeName === 'BR';
            var isLastChildHasValidBR = lastChild.childNodes.length === 1 &&
                this.parent.domNode.isBlockNode(lastChild) && lastChild.childNodes[0].nodeName === 'BR';
            if (afterElement === startNode && !isNextNodeBR && !isLastChildHasValidBR) {
                if (startNode.nodeName !== 'BR') {
                    fragment.prepend(createElement('br'));
                }
            }
            InsertMethods.AppendBefore(fragment, afterElement, true);
            var cursorElement = isNextNodeBR && insertElem.nextSibling && insertElem.nextSibling.nodeName === 'BR' ? insertElem.nextSibling : insertElem;
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorElement, 0);
            this.isEnterInCaption = false;
        }
        else { // Middle of the text. Split the text and then insert the Br before the splitted text and set the cursor at the start of the splitted text.
            var startNode = this.getBRInsertReferenceNode(this.range.startContainer, 'middle');
            var resultSplitNode = this.parent.nodeCutter.
                SplitNode(this.range, startNode, this.range.collapsed);
            var fragment = this.parent.currentDocument.createDocumentFragment();
            fragment.prepend(createElement('br'));
            resultSplitNode = !isNOU(resultSplitNode) ? resultSplitNode : (startNode.nodeName === 'BR' ? startNode : null);
            InsertMethods.AppendBefore(fragment, resultSplitNode, false);
            this.isEnterInCaption = false;
        }
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
    };
    EnterKeyAction.prototype.shiftEnterAtTableSide = function (originalEvent, isStart, isEnd, args) {
        var newElement = createElement(this.enterKey);
        newElement.innerHTML = '<br>';
        var tableElement;
        if (isStart) {
            tableElement = this.range.startContainer.nodeName === 'TABLE' ? this.range.startContainer :
                this.range.startContainer.childNodes[this.range.startOffset];
            tableElement.parentElement.insertBefore(newElement, tableElement);
        }
        else if (isEnd) {
            var offset = this.range.startOffset > 0 ? this.range.startOffset - 1 : this.range.startOffset;
            tableElement = this.range.startContainer.childNodes[offset];
            if (!isNOU(tableElement.nextSibling)) {
                tableElement.parentElement.insertBefore(newElement, tableElement.nextSibling);
            }
            else if (isNOU(tableElement.nextSibling)) {
                tableElement.parentElement.appendChild(newElement);
            }
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, newElement, 0);
        }
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
    };
    EnterKeyAction.prototype.shiftEnterAtMediaSide = function (originalEvent, isStart, isEnd, args) {
        var directRange = false;
        if (this.range.startContainer.nodeName === 'IMG' && this.range.startOffset === 0) {
            directRange = true;
        }
        var newElement = this.parent.currentDocument.createElement('br');
        var imageElement;
        if (directRange) {
            imageElement = this.range.startContainer;
            imageElement.parentElement.insertBefore(newElement, imageElement);
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, imageElement, 0);
        }
        else if (isStart) {
            imageElement = this.range.startContainer.childNodes[this.range.startOffset];
            imageElement.parentElement.insertBefore(newElement, imageElement);
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, imageElement, 0);
        }
        else if (isEnd) {
            var offset = this.range.startOffset > 0 ? this.range.startOffset - 1 : this.range.startOffset;
            imageElement = this.range.startContainer.childNodes[offset];
            if (!isNOU(imageElement.nextSibling)) {
                imageElement.parentElement.insertBefore(newElement, imageElement.nextSibling);
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, newElement.nextSibling, 0);
            }
            else if (isNOU(imageElement.nextSibling)) {
                imageElement.parentElement.appendChild(newElement);
                var brElement = this.parent.currentDocument.createElement('br');
                imageElement.parentElement.appendChild(brElement);
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, brElement, 0);
            }
        }
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
        return;
    };
    EnterKeyAction.prototype.getBRInsertReferenceNode = function (startNode, position) {
        if (this.isEnterInCaption) {
            return this.range.startContainer;
        }
        if ((startNode === this.parent.editableElement || position === 'start') && !isNOU(startNode.childNodes[this.range.startOffset])) {
            return (startNode.childNodes[this.range.startOffset]);
        }
        var inlineParent = this.parent.domTree.getTopMostNode(startNode);
        if (inlineParent.nodeType === Node.ELEMENT_NODE) {
            return inlineParent;
        }
        return startNode;
    };
    EnterKeyAction.prototype.isTextNodeInfrontOfImage = function () {
        var start = this.range.startContainer;
        if (start.nodeType === Node.TEXT_NODE) {
            return false;
        }
        if (start.childNodes.length === 0) {
            return false;
        }
        var text = start.childNodes[this.range.startOffset];
        if (!isNOU(text) && text.nodeType === Node.ELEMENT_NODE) {
            return false;
        }
        var isValid = !isNOU(start.childNodes[this.range.startOffset + 1]) &&
            this.isValidSpecialElement(start.childNodes[this.range.startOffset + 1]);
        if (isValid && !isNOU(text) && text.nodeValue.trim() === '') {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.isTextNodeAfterImage = function () {
        var start = this.range.startContainer;
        if (start.nodeType === Node.TEXT_NODE) {
            return false;
        }
        if (start.childNodes.length === 0) {
            return false;
        }
        var offset = this.range.startOffset > 0 ? this.range.startOffset - 1 :
            this.range.startOffset;
        var text = start.childNodes[offset + 1];
        if (!isNOU(text) && text.nodeType === Node.ELEMENT_NODE) {
            return false;
        }
        var isValid = !isNOU(start.childNodes[offset]) &&
            this.isValidSpecialElement(start.childNodes[offset]);
        if (isValid && !isNOU(text) && text.nodeValue.trim() === '') {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.handleSelectionEnter = function (keyboardArgs) {
        var shiftKey = keyboardArgs.shiftKey;
        var isEntireRTE = this.isEntireRTE;
        var hadMediaNode = this.hasMediaInSelectionRange();
        if (hadMediaNode && !isEntireRTE) {
            if (this.enterKey === 'BR') {
                this.range.startContainer.appendChild(this.parent.currentDocument.createElement('br'));
                var focusElem = this.parent.currentDocument.createElement('br');
                this.range.startContainer.appendChild(focusElem);
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, focusElem, 0);
                return true;
            }
            else {
                var startElement = this.range.startContainer;
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, startElement, 1);
                return false;
            }
        }
        this.range.deleteContents(); // After Deleting the contents the Range start and end container changes and the following if conditions handle them for different use cases.
        if (isEntireRTE && this.parent.editableElement.textContent === '') {
            // This is a true "Select All". Clear the editor completely.
            this.parent.editableElement.innerHTML = '';
            isEntireRTE = false;
        }
        if (this.range.startContainer.nodeName === '#text' && this.range.startContainer.textContent.length === 0 &&
            this.range.startContainer.parentElement !== this.parent.editableElement &&
            (this.range.startContainer.parentElement.textContent == null ||
                this.range.startContainer.parentElement.textContent.length === 0)) { // <p>First Paragraph</p> => Full text content selected.
            if (this.enterKey === 'BR') {
                this.range.startContainer.parentElement.innerHTML = '&#8203;';
            }
            else {
                this.range.startContainer.parentElement.innerHTML = '<br>';
                if (this.isEnterInCaption) {
                    this.isEnterInCaption = false;
                    return true;
                }
            }
        }
        else if (this.range.startContainer === this.parent.editableElement && this.range.startContainer.innerHTML === '') { // Ctrl + A , Enter use case.
            if (this.enterKey === 'P') {
                this.range.startContainer.innerHTML = '<p><br></p>';
            }
            else if (this.enterKey === 'DIV') {
                this.range.startContainer.innerHTML = '<div><br></div>';
            }
            else {
                this.range.startContainer.innerHTML = '<br>';
            }
            var focusElem = this.range.startContainer.childNodes[this.range.startOffset];
            this.nodeSelection.setCursorPoint(this.parent.currentDocument, focusElem, 0);
        }
        else if (this.parent.editableElement === this.range.startContainer) { // <p>First Paragraph</p><p>Second Paragraph</p> => Full text content selected additionally, second p tag 0 offset is selected.
            var focusElem = this.range.startContainer.childNodes[this.range.startOffset];
            if (focusElem.nodeName === '#text' && focusElem.textContent.length === 0) {
                var finalOffset = focusElem.textContent.length === 0 ? 0 : focusElem.previousSibling.textContent.length;
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, focusElem, finalOffset);
            }
            else {
                // eslint-disable-next-line max-len
                this.nodeSelection.setCursorPoint(this.parent.currentDocument, focusElem, focusElem.textContent.length >= 0 ? 0 : 1);
                if (focusElem.previousSibling.textContent.length === 0) {
                    detach(focusElem.previousSibling);
                    if (!shiftKey) {
                        var currentFocusElem = !isNOU(focusElem.lastChild) ? focusElem.lastChild : focusElem;
                        while (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== '#text' && currentFocusElem.nodeName !== 'BR') {
                            currentFocusElem = currentFocusElem.lastChild;
                        }
                        if (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== 'BR' && currentFocusElem.parentElement.textContent.length === 0 && currentFocusElem.parentElement.innerHTML.length === 0 &&
                            currentFocusElem.parentElement.nodeName !== 'BR') {
                            currentFocusElem.parentElement.appendChild(this.parent.currentDocument.createElement('BR'));
                        }
                        if (!isNOU(currentFocusElem)) {
                            this.nodeSelection.setCursorPoint(this.parent.currentDocument, currentFocusElem.nodeName === 'BR' ? currentFocusElem : currentFocusElem.parentElement, currentFocusElem.parentElement.textContent.length >= 0 || currentFocusElem.nodeName === 'BR' ? 0 : 1);
                        }
                    }
                }
                else if (focusElem.textContent.length === 0) {
                    var currentFocusElem = focusElem.previousSibling.nodeName === '#text' ? focusElem.previousSibling : focusElem.previousSibling.lastChild;
                    while (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== '#text') {
                        currentFocusElem = currentFocusElem.lastChild;
                    }
                    this.nodeSelection.setCursorPoint(this.parent.currentDocument, currentFocusElem, currentFocusElem.textContent.length);
                    detach(focusElem);
                }
                else if (this.enterKey !== 'BR' &&
                    focusElem.previousSibling.textContent.length !== 0 && focusElem.textContent.length !== 0) {
                    return true;
                }
            }
        }
        return false;
    };
    EnterKeyAction.prototype.hasMediaInSelectionRange = function () {
        if (this.isValidSpecialElement(this.range.startContainer) ||
            this.isValidSpecialElement(this.range.startContainer)) {
            return true;
        }
        if ((this.range.startContainer.nodeName === 'P' || this.range.endContainer.nodeName === 'DIV') && this.range.startContainer.nodeName !== '#text') {
            if (this.range.startContainer.querySelector('img,audio,video,.e-embed-video-wrap')) {
                return true;
            }
        }
        return false;
    };
    EnterKeyAction.prototype.isStartDirectRange = function () {
        var inputElement = this.parent.editableElement;
        var start = this.range.startContainer;
        if (start !== inputElement) {
            return false;
        }
        if (start.childNodes.length > 0 && start.childNodes.length > 0 && !isNOU(start.childNodes[this.range.startOffset])
            && this.parent.domNode.isBlockNode(start.childNodes[this.range.startOffset])) {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.isEndDirectRange = function () {
        var inputElement = this.parent.editableElement;
        var start = this.range.startContainer;
        if (start !== inputElement) {
            return false;
        }
        if (start.childNodes.length > 0 && start.childNodes.length > 0 && !isNOU(start.childNodes[this.range.startOffset - 1])
            && this.parent.domNode.isBlockNode(start.childNodes[this.range.startOffset - 1])) {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.getStartBlocKParent = function () {
        var isDirectStartRange = this.isStartDirectRange();
        var isDirectEndRange = this.isEndDirectRange();
        if (isDirectStartRange) {
            return this.range.startContainer.childNodes[this.range.startOffset];
        }
        if (isDirectEndRange) {
            return this.range.startContainer.childNodes[this.range.startOffset - 1];
        }
        return this.parent.domTree.getParentBlockNode(this.range.startContainer);
    };
    EnterKeyAction.prototype.isSpecialElemDirectStartRange = function () {
        var startContainer = this.range.startContainer;
        var start = !isNOU(startContainer.childNodes[this.range.startOffset]) ?
            startContainer.childNodes[this.range.startOffset] : null;
        if (isNOU(start)) {
            return false;
        }
        if (this.isValidSpecialElement(start)) {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.isSpecialElemDirectEndRange = function () {
        var startContainer = this.range.startContainer;
        var start = !isNOU(startContainer.childNodes[this.range.startOffset - 1]) ?
            startContainer.childNodes[this.range.startOffset] : null;
        if (isNOU(start)) {
            return false;
        }
        if (this.isValidSpecialElement(start)) {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.isValidSpecialElement = function (node) {
        if (node.nodeName === 'IMG' || node.nodeName === 'TABLE') {
            return true;
        }
        if (node.nodeName === 'SPAN' && node.classList.contains('e-video-wrap')) {
            return true;
        }
        if (node.nodeName === 'SPAN' && node.classList.contains('e-embed-video-wrap')) {
            return true;
        }
        if (node.nodeName === 'SPAN' && node.classList.contains('e-audio-wrap')) {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.getSpecialElementType = function (node) {
        if (node.nodeName === 'IMG') {
            return 'IMG';
        }
        if (node.nodeName === 'TABLE') {
            return 'TABLE';
        }
        if (node.nodeName === 'SPAN' && node.classList.contains('e-video-wrap')) {
            return 'VIDEO';
        }
        if (node.nodeName === 'SPAN' && node.classList.contains('e-embed-video-wrap')) {
            return 'EMBEDVIDEO';
        }
        if (node.nodeName === 'SPAN' && node.classList.contains('e-audio-wrap')) {
            return 'AUDIO';
        }
        return null;
    };
    // Method to check whether the current range is at the empty text node after the mention chip.
    EnterKeyAction.prototype.isEmptyTextNodeAfterMentionChip = function (node, offset) {
        if (offset === 0 && node.previousSibling && node.previousSibling.isContentEditable === false &&
            isNOU(node.nextSibling)) {
            return true;
        }
        return false;
    };
    /**
     * Checks if there's only BR elements (and/or whitespace) before the cursor position.
     * Used to determine if content should be preserved when pressing Enter.
     *
     * @param {HTMLElement} blockParent - The block element containing the cursor.
     * @returns {boolean} - True if only BRs and whitespace exist before cursor, false otherwise.
     */
    EnterKeyAction.prototype.hasOnlyBRBeforeCursor = function (blockParent) {
        var childNodes = blockParent.childNodes;
        // Iterate through child nodes up to cursor position
        for (var i = 0; i < blockParent.childNodes.length; i++) {
            var node = childNodes[i];
            // If we find a text node with non-whitespace content, return false
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent !== '' && blockParent.lastChild !== node) {
                    return false;
                }
            }
            // If we find an element that's not <br>, return false
            else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.nodeName !== 'BR') {
                    return false;
                }
            }
        }
        // If we only found <br> and/or whitespace, return true
        if (blockParent.childNodes.length > 1) {
            return true;
        }
        return false;
    };
    EnterKeyAction.prototype.enterAtHorizontalLine = function (originalEvent, args) {
        var hrElem;
        if (!isNOU(this.range.startContainer.childNodes[this.range.startOffset - 1]) && this.range.startContainer.childNodes[this.range.startOffset - 1].nodeName === 'HR') {
            hrElem = this.range.startContainer.childNodes[this.range.startOffset - 1];
        }
        else if (!isNOU(this.range.startContainer.childNodes[this.range.startOffset]) && this.range.startContainer.childNodes[this.range.startOffset].nodeName === 'HR') {
            hrElem = this.range.startContainer.childNodes[this.range.startOffset];
        }
        else if (this.range.startContainer.nodeName === 'HR' && this.range.endContainer === this.range.startContainer) {
            hrElem = this.range.startContainer;
        }
        var insertElem = this.parent.currentDocument.createElement(this.enterKey);
        insertElem.appendChild(this.parent.currentDocument.createElement('br'));
        InsertMethods.AppendBefore(insertElem, hrElem, true);
        this.nodeSelection.setCursorPoint(this.parent.currentDocument, insertElem, 0);
        originalEvent.preventDefault();
        this.triggerActionCompleteCallBack(args, args.event.shiftKey);
    };
    return EnterKeyAction;
}());
export { EnterKeyAction };
