import * as EVENTS from '../../common/constant';
import { createElement, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
/**
 * ClipBoardCleanup internal component
 *
 * @hidden
 */
var ClipBoardCleanupAction = /** @class */ (function () {
    /**
     * Constructor for creating the component
     *
     * @param {IEditorModel} parent - specifies the parent element
     * @hidden
     * @private
     */
    function ClipBoardCleanupAction(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /* Attaches event listeners for ClopBoard Cleanup operations */
    ClipBoardCleanupAction.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    /* Attaches event listeners for ClopBoard Cleanup operations */
    ClipBoardCleanupAction.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    /**
     * Handles the clipboard data processing for cut/copy operations
     *
     * @param {Range} range - The current selection range in the document
     * @param {Element} editableElement - The editable container element
     * @param {string} operation - The clipboard operation type ('cut', 'copy')
     * @returns {ClipboardWriteEventArgs} - An object containing HTML and plain text content for clipboard operations
     */
    ClipBoardCleanupAction.prototype.handleClipboardProcessing = function (range, editableElement, operation) {
        this.editableElement = editableElement;
        // Extract HTML and plain text from the selected range
        var _a = this.extractClipboardContentFromSelection(range), htmlContent = _a.htmlContent, plainTextContent = _a.plainTextContent;
        var isFullBlockSelection = this.isSelectionCoveringSingleBlock(range, htmlContent);
        var isFullLISelected = this.isFullLISelected(range, htmlContent);
        // Wrap list items if selection is within a list
        if (this.parent.domNode.isList(range.commonAncestorContainer)) {
            var formattedClipboardData = this.wrapListStructureForClipboard(range, htmlContent, plainTextContent);
            htmlContent = formattedClipboardData.htmlContent;
            plainTextContent = formattedClipboardData.plainTextContent;
        }
        else if (isFullLISelected) {
            // when whole li is selected
            var closestList = range.commonAncestorContainer;
            // If it's a text node, move to its parent
            if (closestList.nodeName === '#text') {
                closestList = closestList.parentElement;
            }
            // If it's an LI, use it; otherwise, find the closest LI
            var liElement = closestList.nodeName === 'LI' ? closestList : closestList.closest('li');
            // Get the parent list (UL or OL)
            var closestListParent = liElement.parentElement;
            var listContainer = createElement(closestListParent.tagName);
            listContainer.appendChild(createElement('li'));
            listContainer.firstElementChild.innerHTML = htmlContent;
            htmlContent = listContainer.outerHTML;
            var temporaryWrapper = createElement('div');
            temporaryWrapper.innerHTML = htmlContent;
            plainTextContent = this.extractTextFromHtmlNode(temporaryWrapper);
        }
        // Handle cut operation
        if (operation === 'cut') {
            //check if table is in selection
            var tables = this.collectTablesFromSelection(range);
            if (tables.length > 1 || (tables.length === 1 && !this.isSelectionInsideNestedTable(range))) {
                //handle table cut behavior
                this.isTableSelection = true;
                this.clearSelectedTableContent(range);
            }
            else {
                //check if a whole block level element is selected
                this.isTableSelection = false;
                var isSelectionSameBlock = (this.parent.domNode.getImmediateBlockNode(range.startContainer) ===
                    this.parent.domNode.getImmediateBlockNode(range.endContainer));
                //check if media element alone is selected
                var containsMediaContent = this.containsMediaElement(range);
                // Normalize inline elements at the boundaries
                this.cleanEmptyInlineBoundaries(range);
                //to get the nested list range end container
                var nestedListEndContainer = void 0;
                var rootParentLIElement = void 0;
                if (range.commonAncestorContainer.nodeName === 'LI') {
                    rootParentLIElement = range.commonAncestorContainer;
                    nestedListEndContainer = this.parent.domNode.getImmediateBlockNode(range.endContainer);
                }
                range.deleteContents();
                var sharedContainer = range.commonAncestorContainer;
                if (containsMediaContent) {
                    this.adjustCursorAfterMediaCut(range);
                }
                else if (isFullBlockSelection) {
                    this.fullBlockElementCursorPosition(sharedContainer);
                }
                else if (range.collapsed && sharedContainer.nodeName !== '#text' && !isSelectionSameBlock &&
                    !isNOU(range.startContainer.childNodes[range.startOffset])) {
                    this.restructureContentPostCut(range, rootParentLIElement, nestedListEndContainer);
                }
            }
        }
        return { htmlContent: htmlContent, plainTextContent: plainTextContent, operation: operation };
    };
    /* Sets the cursor position after a block-level element is cut*/
    ClipBoardCleanupAction.prototype.fullBlockElementCursorPosition = function (blockContainer) {
        var resolvedBlockElement = this.parent.domNode.getImmediateBlockNode(blockContainer);
        var brElement = document.createElement('br');
        if (resolvedBlockElement.childElementCount === 2) {
            var focusElement = this.getFirstBlockElement(resolvedBlockElement);
            focusElement.appendChild(brElement);
            resolvedBlockElement.innerHTML = resolvedBlockElement.firstElementChild.outerHTML;
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, resolvedBlockElement.firstElementChild, 0);
        }
        else {
            resolvedBlockElement.innerHTML = '<br>';
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, resolvedBlockElement, 0);
        }
    };
    /*Adjusts the cursor position after a media element is cut from the document*/
    ClipBoardCleanupAction.prototype.adjustCursorAfterMediaCut = function (selectionRange) {
        var startNode = selectionRange.startContainer;
        var isVideoWrapperSpan = startNode.nodeName === 'SPAN' && startNode.className === 'e-video-wrap';
        if (isVideoWrapperSpan) {
            var mediaContainer = startNode;
            var contentContainer = this.parent.domNode.getImmediateBlockNode(mediaContainer);
            var mediaIndex = void 0;
            for (var index = 0; index < contentContainer.childNodes.length; index++) {
                if (contentContainer.childNodes[index] === mediaContainer) {
                    mediaIndex = index;
                    break;
                }
            }
            if (mediaIndex === 0) {
                this.setCursorPosition(contentContainer);
            }
            else {
                this.setCursorPosition(contentContainer.childNodes[mediaIndex - 1]);
            }
            contentContainer.removeChild(mediaContainer);
        }
        else {
            var brElement = document.createElement('br');
            if (!isNOU(startNode.childNodes[selectionRange.startOffset]) &&
                startNode.childNodes[selectionRange.startOffset].textContent.trim() === '' &&
                this.isContentContainerEmpty(startNode)) {
                startNode.replaceChild(brElement, startNode.childNodes[selectionRange.startOffset]);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startNode, startNode.childElementCount);
            }
            else if (this.isContentContainerEmpty(startNode)) {
                startNode.appendChild(brElement);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startNode, startNode.childElementCount);
            }
            else {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startNode, selectionRange.startOffset);
            }
        }
    };
    /* Determines whether the li element is fully selected. */
    ClipBoardCleanupAction.prototype.isFullLISelected = function (range, htmlContent) {
        var selectedElement;
        if (range.commonAncestorContainer.nodeName === '#text') {
            selectedElement = range.commonAncestorContainer.parentElement;
        }
        else {
            selectedElement = range.commonAncestorContainer;
        }
        if ((selectedElement.nodeName === 'LI' || selectedElement.closest('li'))
            && this.isSelectionCoveringSingleBlock(range, htmlContent)) {
            return true;
        }
        return false;
    };
    /* Wraps list elements (UL/OL) with their parent container if the selection is inside <li> */
    ClipBoardCleanupAction.prototype.wrapListStructureForClipboard = function (selectionRange, htmlContent, plainTextContent) {
        var listContainerTag = selectionRange.commonAncestorContainer.nodeName.toLowerCase();
        var listContainer = createElement(listContainerTag);
        listContainer.innerHTML = htmlContent;
        var listItems = Array.from(listContainer.querySelectorAll('li'));
        if (listItems.length > 1) {
            htmlContent = listContainer.outerHTML;
        }
        var temporaryWrapper = createElement('div');
        temporaryWrapper.innerHTML = htmlContent;
        plainTextContent = this.extractTextFromHtmlNode(temporaryWrapper);
        return { htmlContent: htmlContent, plainTextContent: plainTextContent };
    };
    /* Extracts both HTML and plain text content from the current selection range. */
    ClipBoardCleanupAction.prototype.extractClipboardContentFromSelection = function (range) {
        var htmlContent = '';
        var plainTextContent = '';
        htmlContent = this.getHTMLFromSelectionRange(range);
        var startContainer = range.startContainer.nodeType === Node.TEXT_NODE ?
            range.startContainer.parentElement : range.startContainer;
        var endContainer = range.endContainer.nodeType === Node.TEXT_NODE ?
            range.endContainer.parentElement : range.endContainer;
        var startRootTableContainer = this.locateOutermostTableAncestor(range.startContainer, range);
        var endRootTableContainer = this.locateOutermostTableAncestor(range.endContainer, range);
        var isSelectionNestedTable = startRootTableContainer && endRootTableContainer &&
            startRootTableContainer === endRootTableContainer;
        //handle nested table html content retrival
        if (isSelectionNestedTable && startContainer.closest('table') !== endContainer.closest('table')) {
            var isStartEndBothNestedTable = startContainer.closest('table') !== startRootTableContainer &&
                startRootTableContainer !== endContainer.closest('table');
            var isStartInsideNestedTable = isStartEndBothNestedTable ? false :
                startRootTableContainer !== startContainer.closest('table') ? true : false;
            var nestedTable = isStartEndBothNestedTable ? null : isStartInsideNestedTable ?
                startContainer.closest('table') : endContainer.closest('table');
            htmlContent = this.handleNestedTableHtmlContent(startRootTableContainer, nestedTable, isStartInsideNestedTable, startContainer, endContainer, htmlContent);
        }
        var temporaryContainer = createElement('div');
        temporaryContainer.innerHTML = htmlContent;
        htmlContent = this.normalizeInlineElementWrapping(range, htmlContent);
        // If fails this operation will be handled in wrapListStructureForClipboard method
        if (!(this.parent.domNode.isList(range.commonAncestorContainer) ||
            this.isFullLISelected(range, htmlContent))) {
            plainTextContent = this.extractTextFromHtmlNode(temporaryContainer);
        }
        return { htmlContent: htmlContent, plainTextContent: plainTextContent };
    };
    /* Handle the outer html retrival when selection inside nested table */
    ClipBoardCleanupAction.prototype.handleNestedTableHtmlContent = function (rootTableContainer, nestedTable, isStartInsideNestedTable, startContainer, endContainer, htmlContent) {
        var tableContainer = createElement('table');
        tableContainer.classList.add('e-rte-table');
        var tableHeadContainer = createElement('thead');
        var tableBodyContainer = createElement('tbody');
        var tableChildElements = Array.from(rootTableContainer.childNodes);
        var rootHeadContainer;
        var rootBodyContainer;
        tableChildElements.forEach(function (childNode) {
            if (childNode.nodeName === 'THEAD') {
                rootHeadContainer = childNode;
            }
            else if (childNode.nodeName === 'TBODY') {
                rootBodyContainer = childNode;
            }
        });
        if (rootHeadContainer && rootHeadContainer.contains(startContainer) &&
            rootHeadContainer.contains(endContainer)) {
            //contain inside table header alone
            if (this.isClosestToSameTableCellEle(startContainer, endContainer, nestedTable, isStartInsideNestedTable, 'th')) {
                return htmlContent;
            }
            tableHeadContainer.innerHTML = htmlContent;
            tableContainer.appendChild(tableHeadContainer);
            htmlContent = tableContainer.outerHTML;
        }
        else if (rootBodyContainer && rootBodyContainer.contains(startContainer) &&
            rootBodyContainer.contains(endContainer)) {
            //contain inside table body alone
            if (this.isClosestToSameTableCellEle(startContainer, endContainer, nestedTable, isStartInsideNestedTable, 'td')) {
                return htmlContent;
            }
            tableBodyContainer.innerHTML = htmlContent;
            tableContainer.appendChild(tableBodyContainer);
            htmlContent = tableContainer.outerHTML;
        }
        else if (rootHeadContainer && rootBodyContainer &&
            rootHeadContainer.contains(startContainer) && rootBodyContainer.contains(endContainer)) {
            //contain inside table header and body both
            tableContainer.innerHTML = htmlContent;
            htmlContent = tableContainer.outerHTML;
        }
        return htmlContent;
    };
    /* Check if selection inside same table cell element ('th' or 'td').*/
    ClipBoardCleanupAction.prototype.isClosestToSameTableCellEle = function (startContainer, endContainer, nestedTable, isStartInsideNestedTable, tableCellNodeName) {
        if (nestedTable) {
            var processEle = !isStartInsideNestedTable ? startContainer : endContainer;
            return processEle.closest(tableCellNodeName) === nestedTable.parentElement;
        }
        else {
            return startContainer.closest('table').parentElement === endContainer.closest('table').parentElement;
        }
    };
    /* Extracts HTML content and ensures inline elements are properly wrapped if present in the selection.*/
    ClipBoardCleanupAction.prototype.normalizeInlineElementWrapping = function (selectionRange, htmlContent) {
        var startNode = selectionRange.startContainer;
        // Check if the selection starts with non-empty text
        if (startNode.textContent.trim() !== '') {
            var ancestorNode = selectionRange.commonAncestorContainer;
            var isTextNode = ancestorNode.nodeName === '#text';
            var isNonBlockNode = !this.parent.domNode.isBlockNode((isTextNode ? ancestorNode.parentNode : ancestorNode));
            if (isNonBlockNode) {
                htmlContent = this.getWrappedAroundInlineElement((isTextNode ? ancestorNode.parentNode : ancestorNode), htmlContent);
            }
        }
        // Special handling for video wrapper elements
        var isVideoWrapper = startNode.nodeName === 'SPAN' &&
            startNode.classList.length > 0 && startNode.classList.contains('e-video-wrap');
        if (isVideoWrapper) {
            htmlContent = startNode.outerHTML;
        }
        return htmlContent;
    };
    /* Extracts HTML content from the current selection range by wrapping it in a temporary container */
    ClipBoardCleanupAction.prototype.getHTMLFromSelectionRange = function (selectionRange) {
        var clonedSelection = selectionRange.cloneContents();
        var temporaryContainer = createElement('div');
        temporaryContainer.appendChild(clonedSelection);
        return temporaryContainer.innerHTML;
    };
    /* Returns the outer HTML of the nearest inline-level ancestor after replacing its inner content with the provided HTML content. */
    ClipBoardCleanupAction.prototype.getWrappedAroundInlineElement = function (inlineAncestor, contentToWrap) {
        var contentContainer = createElement('div');
        contentContainer.innerHTML = contentToWrap;
        //to retrieve only the wrapper inline element without any inner html in it
        do {
            var clonedInlineAncestor = inlineAncestor.cloneNode(true);
            //swapping the existing html and cloned inline wrapper
            clonedInlineAncestor.innerHTML = contentContainer.innerHTML;
            contentContainer.innerHTML = clonedInlineAncestor.outerHTML;
            inlineAncestor = inlineAncestor.parentElement;
        } while (!isNOU(inlineAncestor) && !this.parent.domNode.isBlockNode(inlineAncestor));
        return contentContainer.innerHTML;
    };
    /* Checks if the current selection range contains a media element (IMG, VIDEO, AUDIO). */
    ClipBoardCleanupAction.prototype.containsMediaElement = function (range) {
        var potentialMediaNode = !isNOU(range.commonAncestorContainer.childNodes[range.startOffset]) ?
            (range.commonAncestorContainer.childNodes[range.startOffset]) : null;
        return (!isNOU(potentialMediaNode) &&
            ((potentialMediaNode.nodeName === 'IMG') ||
                (potentialMediaNode.nodeName === 'VIDEO') || (potentialMediaNode.nodeName === 'AUDIO')));
    };
    /* Retrieves all unique table elements within the current selection range. */
    ClipBoardCleanupAction.prototype.collectTablesFromSelection = function (selectionRange) {
        var identifiedTables = [];
        // Get the parent table for startContainer
        var startTable = this.locateOutermostTableAncestor(selectionRange.startContainer, selectionRange);
        if (!isNOU(startTable) && identifiedTables.indexOf(startTable) < 0) {
            identifiedTables.push(startTable);
        }
        // Get the parent table for endContainer
        var endTable = this.locateOutermostTableAncestor(selectionRange.endContainer, selectionRange);
        if (!isNOU(endTable) && identifiedTables.indexOf(endTable) < 0) {
            identifiedTables.push(endTable);
        }
        return identifiedTables;
    };
    /* Locates the outermost parent table element that contains the given node. */
    ClipBoardCleanupAction.prototype.locateOutermostTableAncestor = function (currentNode, selectionRange) {
        var traversalNode = currentNode;
        var detectedTable = null;
        if (traversalNode === this.editableElement) {
            var offsetIndex = selectionRange.startContainer === traversalNode ?
                selectionRange.startOffset : selectionRange.endOffset;
            var candidateElement = selectionRange.commonAncestorContainer.childNodes[offsetIndex];
            return !isNOU(candidateElement) ? candidateElement.nodeName === 'TABLE' ? candidateElement : null : null;
        }
        else {
            traversalNode = this.parent.domNode.getImmediateBlockNode(traversalNode);
            while (!isNOU(traversalNode.closest('table')) &&
                this.editableElement.contains(traversalNode.closest('table'))) {
                traversalNode = detectedTable = traversalNode.closest('table');
                // to get the root parent element of table
                traversalNode = traversalNode.parentElement;
            }
            return detectedTable;
        }
    };
    /* Determines whether the current selection is within a nested table structure. */
    ClipBoardCleanupAction.prototype.isSelectionInsideNestedTable = function (selectionRange) {
        if (selectionRange.startContainer !== this.editableElement && selectionRange.endContainer !== this.editableElement) {
            var startContainer = selectionRange.startContainer.nodeName === '#text' ?
                selectionRange.startContainer.parentElement : selectionRange.startContainer;
            var endContainer = selectionRange.endContainer.nodeName === '#text' ?
                selectionRange.endContainer.parentElement : selectionRange.endContainer;
            return startContainer.closest('table') === endContainer.closest('table');
        }
        return false;
    };
    /* Clears selected content within tables and manages cursor positioning after cut operation. */
    ClipBoardCleanupAction.prototype.clearSelectedTableContent = function (selectionRange) {
        var _this = this;
        var activeSelection = window.getSelection();
        var tablesToClean = [];
        var selectedNodes = Array.from(selectionRange.commonAncestorContainer.childNodes).filter(function (childNode) {
            if (childNode.nodeName === 'TABLE') {
                tablesToClean.push(childNode);
            }
            return selectionRange.intersectsNode(childNode);
        });
        // Remove intermediate nodes
        selectedNodes.forEach(function (node) {
            _this.processSelectedContentWithinRange(node, selectionRange, tablesToClean);
        });
        // Clean up empty tables
        this.removeEmptyTables(tablesToClean);
        // Position cursor
        selectionRange.collapse(true);
        activeSelection.removeAllRanges();
        activeSelection.addRange(selectionRange);
        this.adjustCursorPostTableCut(selectionRange);
    };
    /* Removes intermediateNodes that are fully selected within the given range. */
    ClipBoardCleanupAction.prototype.removeSelectedNodes = function (inspectedElement, selectionRange) {
        if (!isNOU(inspectedElement) && selectionRange.intersectsNode(inspectedElement)) {
            var isFullySelected = this.isFullHTMLElementSelected(inspectedElement, selectionRange);
            if (isFullySelected) {
                // Entire element is selected
                inspectedElement.remove();
                return true;
            }
        }
        return false;
    };
    /*  Recursively filters and processes selected content within a range, including table cells and block-level elements. */
    ClipBoardCleanupAction.prototype.processSelectedContentWithinRange = function (contentFragment, selectionRange, tablesToClean) {
        var _this = this;
        if (!isNOU(contentFragment) && selectionRange.intersectsNode(contentFragment)) {
            var isElementRemoved = false;
            if (this.parent.domNode.isBlockNode(contentFragment) &&
                ['TD', 'TH'].indexOf(contentFragment.nodeName) < 0) {
                if (contentFragment.nodeName === 'TR' && isNOU(contentFragment.querySelector('th'))) {
                    isElementRemoved = this.removeSelectedNodes(contentFragment, selectionRange);
                }
                else if (contentFragment.nodeName !== 'TR') {
                    isElementRemoved = this.removeSelectedNodes(contentFragment, selectionRange);
                }
            }
            if (!isElementRemoved) {
                if (contentFragment.nodeName === 'TABLE') {
                    tablesToClean.push(contentFragment);
                    var parentTable_1 = contentFragment;
                    var selectedRows = Array.from(parentTable_1.querySelectorAll('tr')).filter(function (rowCandidate) {
                        return rowCandidate.nodeName === 'TR' && selectionRange.intersectsNode(rowCandidate) &&
                            rowCandidate.closest('table') === parentTable_1;
                    });
                    selectedRows.forEach(function (tableRow) {
                        _this.processSelectedContentWithinRange(tableRow, selectionRange, tablesToClean);
                    });
                }
                else if (contentFragment.nodeName === 'TR') {
                    var associatedTable_1 = contentFragment.closest('table');
                    var selectedCells = Array.from(contentFragment.childNodes).filter(function (cellCandidate) {
                        return cellCandidate.nodeName !== '#text' && ['TD', 'TH'].indexOf(cellCandidate.nodeName) >= 0 &&
                            selectionRange.intersectsNode(cellCandidate) &&
                            cellCandidate.closest('table') === associatedTable_1;
                    });
                    selectedCells.forEach(function (tableCell) {
                        _this.processSelectedContentWithinRange(tableCell, selectionRange, tablesToClean);
                    });
                }
                else if (this.parent.domNode.isBlockNode(contentFragment) &&
                    ['TD', 'TH'].indexOf(contentFragment.nodeName) >= 0 &&
                    this.isFullHTMLElementSelected(contentFragment, selectionRange)) {
                    contentFragment.innerHTML = '';
                }
                else if ((this.parent.domNode.isBlockNode(contentFragment) &&
                    contentFragment.nodeName !== 'TABLE' && this.hasContainsAnyBlockNode(contentFragment)) ||
                    (['TD', 'TH'].indexOf(contentFragment.nodeName) >= 0)) {
                    var selectedChildNodes = Array.from(contentFragment.childNodes);
                    selectedChildNodes.forEach(function (nestedNode) {
                        if (nestedNode.nodeName === 'TABLE') {
                            tablesToClean.push(nestedNode);
                            var parentTable = nestedNode;
                            var selectedRows = Array.from(parentTable.querySelectorAll('tr')).filter(function (rowCandidate) {
                                return rowCandidate.nodeName === 'TR' && selectionRange.intersectsNode(rowCandidate) &&
                                    rowCandidate.closest('table') === nestedNode;
                            });
                            selectedRows.forEach(function (tableRow) {
                                _this.processSelectedContentWithinRange(tableRow, selectionRange, tablesToClean);
                            });
                        }
                        else {
                            _this.processSelectedContentWithinRange(nestedNode, selectionRange, tablesToClean);
                        }
                    });
                }
                else if (contentFragment.nodeType === Node.ELEMENT_NODE &&
                    isNOU(contentFragment.closest('table')) &&
                    contentFragment !== this.parent.domNode.getImmediateBlockNode(selectionRange.startContainer) &&
                    contentFragment !== this.parent.domNode.getImmediateBlockNode(selectionRange.endContainer)) {
                    var partialRange = selectionRange.cloneRange();
                    partialRange.setEnd(contentFragment, contentFragment.childNodes.length);
                    partialRange.deleteContents();
                }
                else if (contentFragment.nodeType === Node.ELEMENT_NODE) {
                    this.traverseElementTextNodes(contentFragment, selectionRange);
                }
                else {
                    this.clearIntersectingContent(contentFragment, selectionRange);
                }
            }
        }
    };
    /* To retrive the text nodes in element and remove using the help of clearIntersectingContent method */
    ClipBoardCleanupAction.prototype.traverseElementTextNodes = function (elementNode, selectionRange) {
        var _this = this;
        // Traverse inline text nodes within the fragment
        var intersectingTextNodes = [];
        var textNodeIterator = document.createNodeIterator(elementNode, NodeFilter.SHOW_TEXT, {
            acceptNode: function (textCandidate) {
                // Filter out empty or whitespace-only text nodes
                return (selectionRange.intersectsNode(textCandidate) && textCandidate.textContent.trim()) ?
                    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        var currentTextNode = textNodeIterator.nextNode();
        while (currentTextNode) {
            intersectingTextNodes.push(currentTextNode);
            currentTextNode = textNodeIterator.nextNode();
        }
        intersectingTextNodes.forEach(function (textNode) {
            _this.clearIntersectingContent(textNode, selectionRange);
        });
    };
    /* To check and remove the element if full element is selected */
    ClipBoardCleanupAction.prototype.isFullHTMLElementSelected = function (blockElement, selectionRange) {
        var elementRange = document.createRange();
        elementRange.selectNode(blockElement);
        return selectionRange.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0 &&
            selectionRange.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
    };
    /* To check if any block level elements constains inside */
    ClipBoardCleanupAction.prototype.hasContainsAnyBlockNode = function (blockElement) {
        return !isNOU(blockElement) && this.parent.domNode.isBlockNode(blockElement) &&
            CONSTANT.BLOCK_TAGS.some(function (tag) { return blockElement.querySelector(tag) !== null; });
    };
    /* Iterates through table list and removes any table that is empty. */
    ClipBoardCleanupAction.prototype.removeEmptyTables = function (tableElements) {
        for (var tableIndex = tableElements.length - 1; tableIndex >= 0; tableIndex--) {
            this.removeEmptyTableElement(tableElements[tableIndex]);
        }
    };
    /* Sets the cursor position appropriately after a table cut operation within an editable container. */
    ClipBoardCleanupAction.prototype.adjustCursorPostTableCut = function (selectionRange) {
        var cursorElement = selectionRange.startContainer;
        if (this.isContentContainerEmpty(this.editableElement) &&
            this.editableElement.childElementCount === 0) {
            if (this.editableElement.innerHTML === '') {
                this.editableElement.innerHTML = '<p><br></p>';
            }
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, this.editableElement.firstChild, 0);
        }
        else if (cursorElement.nodeName === '#text' &&
            cursorElement.textContent === '' && this.isContentContainerEmpty(cursorElement.parentElement)) {
            cursorElement = this.parent.domNode.getImmediateBlockNode(cursorElement);
            cursorElement.appendChild(document.createElement('br'));
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorElement, cursorElement.childElementCount);
        }
        else if (cursorElement.nodeName === '#text' &&
            cursorElement.textContent.length > 0) {
            this.setCursorPosition(cursorElement);
        }
        else if (this.parent.domNode.isBlockNode(cursorElement)) {
            if (cursorElement.nodeName === 'TABLE') {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorElement, 0);
            }
            else {
                this.setCursorPosition(cursorElement);
            }
        }
        else {
            cursorElement = selectionRange.commonAncestorContainer.childNodes[selectionRange.startOffset];
            if (!isNOU(cursorElement)) {
                if (this.isContentContainerEmpty(cursorElement)) {
                    cursorElement.appendChild(document.createElement('br'));
                    this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorElement, cursorElement.childElementCount);
                }
                else {
                    this.setCursorPosition(cursorElement);
                }
            }
        }
    };
    /* Removes a table element if it lacks meaningful content. */
    ClipBoardCleanupAction.prototype.removeEmptyTableElement = function (tableElement) {
        if (!isNOU(tableElement.parentElement)) {
            var isContentInsignificant = this.isContentContainerEmpty(tableElement);
            var isElementAttached = tableElement.parentElement.contains(tableElement);
            if (isContentInsignificant && isElementAttached) {
                tableElement.parentElement.removeChild(tableElement);
                return true;
            }
        }
        return false;
    };
    /* Removes content from a given DOM fragment that intersects with the selection range. */
    ClipBoardCleanupAction.prototype.clearIntersectingContent = function (contentFragment, selectionRange) {
        if (!isNOU(contentFragment) && selectionRange.intersectsNode(contentFragment)) {
            var updatedTextContent = void 0;
            // Handle partial text node selection
            if (contentFragment.nodeName === '#text') {
                updatedTextContent = this.extractUnselectedTextContent(contentFragment, selectionRange);
                contentFragment.textContent = updatedTextContent;
            }
            var EndRangeBlockAncestor = this.parent.domNode.getImmediateBlockNode(selectionRange.endContainer);
            var inlineWrapperParent = this.parent.domNode.getImmediateBlockNode(contentFragment);
            // Cleanup if the updated text content is empty
            if (updatedTextContent === '' &&
                !this.parent.domNode.isBlockNode(contentFragment.parentElement)) {
                var inlineWrapper = contentFragment.parentElement;
                while (!this.parent.domNode.isBlockNode(inlineWrapper.parentElement)) {
                    if (inlineWrapper.parentElement.childNodes.length === 1) {
                        inlineWrapper = inlineWrapper.parentElement;
                    }
                    else {
                        break;
                    }
                }
                this.removeEmptyContentContainer(inlineWrapper);
            }
            if (this.parent.domNode.isBlockNode(inlineWrapperParent) && this.isContentContainerEmpty(inlineWrapperParent) &&
                inlineWrapperParent === EndRangeBlockAncestor &&
                this.isTableSelection && ['TD', 'TH'].indexOf(inlineWrapperParent.nodeName) < 0) {
                if ((!this.editableElement.contains(inlineWrapperParent.closest('table'))) ||
                    (this.editableElement.contains(inlineWrapperParent.closest('table')) &&
                        inlineWrapperParent.childElementCount === 0)) {
                    // remove element if it is not inside table selection
                    this.removeDomElement(inlineWrapperParent, inlineWrapperParent.parentElement);
                }
            }
        }
    };
    /* Removes a parent container from the DOM if it is empty and still attached. */
    ClipBoardCleanupAction.prototype.removeEmptyContentContainer = function (containerCandidate) {
        if (!isNOU(containerCandidate) && (['TD', 'TH'].indexOf(containerCandidate.nodeName) < 0) &&
            containerCandidate !== this.editableElement) {
            var isContainerEmpty = this.isContentContainerEmpty(containerCandidate);
            var isContainerAttached = containerCandidate.parentElement.contains(containerCandidate);
            if (isContainerEmpty && isContainerAttached) {
                containerCandidate.parentElement.removeChild(containerCandidate);
            }
        }
    };
    /* Preserves text outside the selection range in a partially selected text node. */
    ClipBoardCleanupAction.prototype.extractUnselectedTextContent = function (textFragment, range) {
        var fullText = textFragment.textContent;
        var startIndex = 0;
        var endIndex = fullText.length;
        if (range.startContainer === textFragment) {
            startIndex = range.startOffset;
        }
        if (range.endContainer === textFragment) {
            endIndex = range.endOffset;
        }
        var leadingText = fullText.substring(0, startIndex);
        var trailingText = fullText.substring(endIndex);
        return leadingText + trailingText;
    };
    /* Checks whether a given container is visually and semantically empty. */
    ClipBoardCleanupAction.prototype.isContentContainerEmpty = function (containerElement) {
        return !isNOU(containerElement) && containerElement.nodeName !== '#text' &&
            isNOU(containerElement.querySelector('video')) &&
            isNOU(containerElement.querySelector('audio')) &&
            isNOU(containerElement.querySelector('img')) &&
            containerElement.textContent.trim().length === 0;
    };
    /* Check if the element has more than one BR element */
    ClipBoardCleanupAction.prototype.hasMoreThanOneBRElement = function (currentEle) {
        var lastChild = !isNOU(currentEle) ? currentEle.lastChild : null;
        var previousSibling = !isNOU(lastChild) ? lastChild.previousSibling : null;
        return lastChild && lastChild.nodeName === 'BR' &&
            (!isNOU(previousSibling) && previousSibling.nodeName === 'BR');
    };
    /* Removes empty inline text nodes at the start and end of a selection range. */
    ClipBoardCleanupAction.prototype.cleanEmptyInlineBoundaries = function (selectionRange) {
        var isStartTextNode = selectionRange.startContainer.nodeName === '#text';
        var isEndTextNode = selectionRange.endContainer.nodeName === '#text';
        var startWrapperEle = selectionRange.startContainer.parentElement;
        var endWrapperEle = selectionRange.endContainer.parentElement;
        if (isStartTextNode && !this.parent.domNode.isBlockNode(startWrapperEle) &&
            this.extractUnselectedTextContent(selectionRange.startContainer, selectionRange) === '') {
            this.removeInlineWrapper(startWrapperEle, selectionRange);
        }
        if (isEndTextNode && !this.parent.domNode.isBlockNode(endWrapperEle) &&
            this.extractUnselectedTextContent(selectionRange.endContainer, selectionRange) === '') {
            this.removeInlineWrapper(endWrapperEle, selectionRange);
        }
    };
    /* To remove the inline element wrapper around it */
    ClipBoardCleanupAction.prototype.removeInlineWrapper = function (wrapperEle, selectionRange) {
        var partialRange = selectionRange.cloneRange();
        partialRange.setEnd(wrapperEle, wrapperEle.childNodes.length);
        partialRange.deleteContents();
        if (wrapperEle.textContent.trim() === '' && wrapperEle.childElementCount === 0 &&
            !isNOU(wrapperEle.parentElement)) {
            while (!this.parent.domNode.isBlockNode(wrapperEle.parentElement) &&
                this.isContentContainerEmpty(wrapperEle.parentElement) &&
                wrapperEle.parentElement.childElementCount === 1 &&
                wrapperEle.parentElement.firstElementChild === wrapperEle) {
                wrapperEle = wrapperEle.parentElement;
            }
            if (!isNOU(wrapperEle.parentElement) && wrapperEle.parentElement.contains(wrapperEle)) {
                wrapperEle.parentElement.removeChild(wrapperEle);
            }
        }
    };
    /* Updates the DOM structure and cursor position after cutting selected content. */
    ClipBoardCleanupAction.prototype.restructureContentPostCut = function (selectionRange, rootParentLIElement, nestedListEndContainer) {
        //range End container Element after cut
        var rangeEndContainer = selectionRange.startContainer.childNodes[selectionRange.startOffset];
        //range Start container Element after cut
        var rangeStartContainer = this.isParentLIEmpty(rootParentLIElement) ?
            rootParentLIElement : rangeEndContainer.previousSibling;
        // check if the start range element is empty
        var emptyElementAtStart = this.getStartRangeEmptyElement(this.parent.domNode.getImmediateBlockNode(rangeStartContainer), selectionRange);
        // check if the end range element is empty
        var emptyElementAtEnd = this.getEndRangeEmptyElement(rangeEndContainer, nestedListEndContainer);
        var brElement = document.createElement('br');
        if (!isNOU(emptyElementAtStart) && !isNOU(emptyElementAtEnd)) {
            // When both start and end range element empty, cursor placement and empty element removal
            if (this.isParentLIEmpty(rootParentLIElement)) {
                // Place cursor at parent LI element
                rootParentLIElement.insertBefore(brElement, rootParentLIElement.firstElementChild);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, rootParentLIElement, 0);
            }
            else {
                emptyElementAtStart.appendChild(brElement);
                // to set the cursor position at the last br element if element has n number of br element inside it
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, emptyElementAtStart, emptyElementAtStart.childElementCount);
            }
            this.removeDomElement(emptyElementAtEnd, emptyElementAtEnd.parentElement);
        }
        else if (!isNOU(emptyElementAtEnd) && !isNOU(rangeStartContainer)) {
            // When only end range element empty, cursor placement and empty element removal
            if (selectionRange.commonAncestorContainer.nodeName === 'LI') {
                // Place cursor at parent LI element
                this.setParentLICursorPosition(rangeStartContainer);
            }
            else {
                this.setCursorPosition(this.getDeeptestBlockElement(rangeStartContainer));
            }
            this.removeDomElement(emptyElementAtEnd, emptyElementAtEnd.parentElement);
        }
        else if (selectionRange.commonAncestorContainer.nodeName === 'LI') {
            // when nested cut selection is done
            this.mergeContentWithinSameContainer(rangeStartContainer, rangeEndContainer, nestedListEndContainer);
        }
        else {
            // Across elements cut selection is done
            this.mergeContentAcrossBlocks(rangeStartContainer, rangeEndContainer);
        }
    };
    /* To set cursor position at root parent list in nested selection use case */
    ClipBoardCleanupAction.prototype.setParentLICursorPosition = function (rangeStartContainer) {
        var rootParentLIElement = this.parent.domNode.getImmediateBlockNode(rangeStartContainer);
        var brElement = document.createElement('br');
        var nearestBlockElement = rootParentLIElement.querySelector('ul') ||
            rootParentLIElement.querySelector('ol');
        if (rangeStartContainer.nodeName === 'BR' || (rangeStartContainer.nodeName === '#text' &&
            rangeStartContainer.textContent.trim() === '' && !isNOU(rangeStartContainer.previousElementSibling) &&
            rangeStartContainer.previousElementSibling.nodeName === 'BR')) {
            // if parent li has br element as last child
            if (rangeStartContainer.nodeName === 'BR') {
                rootParentLIElement.insertBefore(brElement, nearestBlockElement);
            }
            else {
                rootParentLIElement.replaceChild(brElement, rangeStartContainer);
            }
            var cursorOffset = void 0;
            var cursorBRElement = nearestBlockElement.previousElementSibling;
            for (var index = 0; index < rootParentLIElement.childNodes.length; index++) {
                if (rootParentLIElement.childNodes[index] === cursorBRElement) {
                    cursorOffset = index;
                    break;
                }
            }
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, rootParentLIElement, cursorOffset);
        }
        else if (rangeStartContainer === rootParentLIElement) {
            rangeStartContainer.insertBefore(brElement, rangeStartContainer.firstElementChild);
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, rangeStartContainer, 0);
        }
        else {
            this.setCursorPosition(rangeStartContainer);
        }
    };
    /* To get the range Start container empty element */
    ClipBoardCleanupAction.prototype.getStartRangeEmptyElement = function (emptyElement, selectionRange) {
        if (!isNOU(emptyElement)) {
            var elementToRemove = void 0;
            if (selectionRange.commonAncestorContainer.nodeName === 'LI') {
                if (this.isParentLIEmpty(selectionRange.commonAncestorContainer)) {
                    elementToRemove = selectionRange.commonAncestorContainer;
                }
                else {
                    return null;
                }
            }
            else {
                elementToRemove = this.getDeeptestBlockElement(emptyElement);
                elementToRemove = this.isContentContainerEmpty(elementToRemove) ? elementToRemove : null;
            }
            return elementToRemove;
        }
        else {
            return null;
        }
    };
    /* To get the range end container empty element */
    ClipBoardCleanupAction.prototype.getEndRangeEmptyElement = function (emptyElement, nestedListEndContainer) {
        if (!isNOU(emptyElement)) {
            var elementToRemove = void 0;
            if (isNOU(nestedListEndContainer)) {
                elementToRemove = this.getFirstBlockElement(emptyElement);
            }
            else {
                elementToRemove = nestedListEndContainer;
            }
            elementToRemove = this.isContentContainerEmpty(elementToRemove) ? elementToRemove : null;
            return elementToRemove;
        }
        else {
            return null;
        }
    };
    /* To get the LI element which has UL as its first child */
    ClipBoardCleanupAction.prototype.isParentLIEmpty = function (liElement) {
        if (!isNOU(liElement) && liElement.nodeName === 'LI' && !isNOU(liElement.firstElementChild)) {
            if (this.parent.domNode.isList(liElement.firstElementChild)) {
                var nearestBlockElement = liElement.firstElementChild;
                if (isNOU(nearestBlockElement.previousSibling) || (nearestBlockElement.previousSibling.textContent.trim() === '' &&
                    nearestBlockElement.previousSibling.nodeName === '#text' &&
                    isNOU(nearestBlockElement.previousSibling.previousElementSibling))) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    /* Checks if the current selection range fully covers a single block-level element. */
    ClipBoardCleanupAction.prototype.isSelectionCoveringSingleBlock = function (selectionRange, htmlContent) {
        var blockContainer;
        if (!this.parent.domNode.isBlockNode(selectionRange.commonAncestorContainer)) {
            blockContainer = this.parent.domNode.getImmediateBlockNode(selectionRange.commonAncestorContainer);
        }
        else {
            blockContainer = selectionRange.commonAncestorContainer;
        }
        return blockContainer.innerHTML.trim() === htmlContent.trim();
    };
    /* Removes a specified DOM element from its container with special handling for <code> elements. */
    ClipBoardCleanupAction.prototype.removeDomElement = function (removableElement, containerElement) {
        if (!isNOU(removableElement) && !isNOU(containerElement) && removableElement !== this.editableElement) {
            if (this.hasMoreThanOneBRElement(removableElement)) {
                removableElement.removeChild(removableElement.lastChild);
            }
            else {
                //To get any parent element of container if they are empty
                while (this.isContentContainerEmpty(removableElement.parentElement) &&
                    removableElement.parentElement.childElementCount === 1 &&
                    removableElement.parentElement !== this.editableElement) {
                    removableElement = removableElement.parentElement;
                    containerElement = removableElement.parentElement;
                }
                if (!isNOU(removableElement.nodeName) && removableElement.nodeName === 'CODE' &&
                    removableElement.parentElement.nodeName === 'PRE') {
                    removableElement = containerElement;
                    containerElement = containerElement.parentElement;
                }
                if (containerElement.contains(removableElement)) {
                    containerElement.removeChild(removableElement);
                }
            }
        }
    };
    /* Extracts and removes inline elements from a block container while preserving their content. */
    ClipBoardCleanupAction.prototype.extractInlineContentFromBlock = function (blockContainer) {
        var inlineContentWrapper = createElement('div');
        var childNodesList = Array.from(blockContainer.childNodes);
        for (var index = 0; index < childNodesList.length; index++) {
            if (!this.parent.domNode.isBlockNode(childNodesList[index])) {
                if (childNodesList[index].nodeName === 'BR') {
                    // to remove first occuring br tag
                    this.removeDomElement(childNodesList[index], blockContainer);
                    break;
                }
                if (childNodesList[index].nodeName === 'CODE' &&
                    !isNOU(childNodesList[index].parentElement) &&
                    childNodesList[index].parentElement.nodeName === 'PRE') {
                    inlineContentWrapper.innerHTML += childNodesList[index].innerHTML;
                }
                else {
                    inlineContentWrapper.innerHTML += childNodesList[index].nodeName === '#text' ?
                        childNodesList[index].textContent :
                        childNodesList[index].outerHTML;
                }
                this.removeDomElement(childNodesList[index], blockContainer);
            }
        }
        if (this.isContentContainerEmpty(blockContainer)) {
            this.removeDomElement(blockContainer, blockContainer.parentElement);
        }
        blockContainer = inlineContentWrapper;
        return blockContainer;
    };
    /* Returns the inner most block element */
    ClipBoardCleanupAction.prototype.getDeeptestBlockElement = function (blockContainer) {
        if (!isNOU(blockContainer) && this.parent.domNode.isBlockNode(blockContainer)) {
            while (!isNOU(blockContainer.lastElementChild) &&
                this.parent.domNode.isBlockNode(blockContainer.lastElementChild)) {
                blockContainer = blockContainer.lastElementChild;
            }
            return blockContainer;
        }
        return null;
    };
    /* Returns the first occuring block element */
    ClipBoardCleanupAction.prototype.getFirstBlockElement = function (blockContainer) {
        if (!isNOU(blockContainer) && this.parent.domNode.isBlockNode(blockContainer)) {
            while (!isNOU(blockContainer.firstChild) && !isNOU(blockContainer.firstElementChild)) {
                if ((blockContainer.firstChild.nodeType === Node.TEXT_NODE &&
                    blockContainer.firstChild.textContent.trim().length > 0) ||
                    (blockContainer.firstChild.nodeType !== Node.TEXT_NODE &&
                        !this.parent.domNode.isBlockNode(blockContainer.firstChild))) {
                    break;
                }
                blockContainer = blockContainer.firstElementChild;
            }
            return blockContainer;
        }
        return null;
    };
    /* Merges content between two elements located in different block containers and handles cleanup. */
    ClipBoardCleanupAction.prototype.mergeContentAcrossBlocks = function (startBlockElement, endBlockElement) {
        // Traverse to the deepest inline element within the start block
        if (this.parent.domNode.isBlockNode(startBlockElement)) {
            startBlockElement = this.getDeeptestBlockElement(startBlockElement);
        }
        // Traverse to the shallowest inline element within the end block
        if (this.parent.domNode.isBlockNode(endBlockElement)) {
            endBlockElement = this.getFirstBlockElement(endBlockElement);
        }
        // Extract inline content from the end block if needed
        if (this.parent.domNode.isBlockNode(endBlockElement)) {
            endBlockElement = this.extractInlineContentFromBlock(endBlockElement);
        }
        if (!isNOU(startBlockElement)) {
            if (!isNOU(startBlockElement.lastChild)) {
                // Set cursor to the last child of the start block
                this.setCursorPosition(startBlockElement.lastChild);
            }
            else {
                this.setCursorPosition(startBlockElement);
            }
            // Merge content
            startBlockElement.insertAdjacentHTML('beforeend', endBlockElement.innerHTML);
        }
    };
    /* Merges content between two elements that share the same parent container and performs cleanup. */
    ClipBoardCleanupAction.prototype.mergeContentWithinSameContainer = function (startLiElement, endLiElement, nestedListEndContainer) {
        var canMergeListElement = startLiElement.nodeName !== 'LI' && (startLiElement.textContent.trim() !== '' ||
            (startLiElement.nodeName === '#text' && !isNOU(startLiElement.previousElementSibling) &&
                startLiElement.previousElementSibling.nodeName !== 'BR'));
        if (!isNOU(nestedListEndContainer) && this.isParentLIEmpty(nestedListEndContainer)) {
            this.setParentLICursorPosition(startLiElement);
        }
        else if (canMergeListElement) {
            // Traverse to the shallowest inline element within the end block
            if (this.parent.domNode.isBlockNode(endLiElement)) {
                endLiElement = this.getFirstBlockElement(endLiElement);
            }
            // Extract inline content if end element is still a block
            if (this.parent.domNode.isBlockNode(endLiElement)) {
                endLiElement = this.extractInlineContentFromBlock(endLiElement);
            }
            // Set cursor position at the start element
            this.setCursorPosition(startLiElement);
            var sharedContainer = startLiElement.parentElement;
            var contentFragment = document.createDocumentFragment();
            // Move all children from end element into the fragment
            while (!isNOU(endLiElement.firstChild)) {
                contentFragment.appendChild(endLiElement.firstChild);
            }
            // Insert the fragment after the start element
            sharedContainer.insertBefore(contentFragment, startLiElement.nextSibling);
        }
    };
    /* Sets the cursor position at the end of the specified element or its content. */
    ClipBoardCleanupAction.prototype.setCursorPosition = function (focusTarget) {
        var cursorOffset;
        if (!isNOU(focusTarget)) {
            if (focusTarget.nodeName === '#text') {
                if (focusTarget.textContent.length > 0) {
                    cursorOffset = focusTarget.textContent.length;
                }
                else {
                    var focusChildNodes = Array.from(focusTarget.parentElement.childNodes);
                    for (var index = 0; index < focusChildNodes.length; index++) {
                        if (focusChildNodes[index] === focusTarget) {
                            cursorOffset = index;
                            break;
                        }
                    }
                    focusTarget = focusTarget.parentElement;
                }
            }
            else {
                // Handle media or special wrappers
                if (focusTarget.nodeName !== '#text' && !isNOU(focusTarget.childNodes) &&
                    (focusTarget.nodeName === 'IMG' || focusTarget.classList.contains('e-audio-wrap') ||
                        focusTarget.classList.contains('e-video-wrap'))) {
                    cursorOffset = 1;
                }
                else {
                    if (this.parent.domNode.isBlockNode(focusTarget) && !isNOU(focusTarget.lastChild) &&
                        ((focusTarget.lastChild.nodeName === 'BR') || (focusTarget.lastChild.textContent.trim() === '' &&
                            !isNOU(focusTarget.lastChild.previousElementSibling) &&
                            focusTarget.lastChild.previousElementSibling.nodeName === 'BR'))) {
                        // if element has br tag as last element child
                        focusTarget.appendChild(document.createElement('br'));
                        for (var index = 0; index < focusTarget.childNodes.length; index++) {
                            if (focusTarget.childNodes[index].nodeName === 'BR') {
                                cursorOffset = index;
                            }
                        }
                    }
                    else {
                        // Traverse to the deepest valid child
                        while (!isNOU(focusTarget.lastChild)) {
                            focusTarget = focusTarget.lastChild;
                        }
                        cursorOffset = focusTarget.textContent.length;
                    }
                }
            }
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, focusTarget, cursorOffset);
        }
    };
    /* Recursively extracts plain text content from an HTML node hierarchy. */
    ClipBoardCleanupAction.prototype.extractTextFromHtmlNode = function (sourceNode) {
        var plainText = '';
        for (var _i = 0, _a = Array.from(sourceNode.childNodes); _i < _a.length; _i++) {
            var childNode = _a[_i];
            if (childNode.nodeType === Node.TEXT_NODE) {
                plainText += childNode.nodeValue;
            }
            else if (childNode.nodeType === Node.ELEMENT_NODE) {
                var tagName = childNode.nodeName.toLowerCase();
                switch (tagName) {
                    case 'br':
                        plainText += '\r\n';
                        break;
                    case 'p':
                    case 'div':
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                    case 'blockquote':
                    case 'li':
                    case 'pre':
                        plainText += this.extractTextFromHtmlNode(childNode) + '\r\n';
                        break;
                    case 'table':
                        if (tagName === 'table' && sourceNode.nodeName.toLowerCase() === 'td') {
                            plainText += this.serializeTableToPlainText(childNode);
                            continue;
                        }
                        else {
                            plainText += this.serializeTableToPlainText(childNode) + '\r\n';
                        }
                        break;
                    case 'img':
                    case 'audio':
                    case 'video': {
                        plainText += '';
                        break;
                    }
                    default:
                        plainText += this.extractTextFromHtmlNode(childNode);
                }
            }
        }
        return plainText;
    };
    /* Converts an HTML table element into a plain text format using tabs and newlines. */
    ClipBoardCleanupAction.prototype.serializeTableToPlainText = function (tableElement) {
        var plainText = '';
        var tableRows = Array.from(tableElement.querySelectorAll('tr')).filter(function (row) {
            return (row.closest('table') === tableElement);
        });
        var _loop_1 = function (index) {
            var tableCells = Array.from(tableRows[index].querySelectorAll('th, td')).filter(function (cell) {
                return (cell.closest('tr') === tableRows[index]);
            });
            var rowContent = '';
            for (var _i = 0, tableCells_1 = tableCells; _i < tableCells_1.length; _i++) {
                var cellNode = tableCells_1[_i];
                var cellText = this_1.extractTextFromHtmlNode(cellNode);
                rowContent += cellText.includes('\r\n') ? cellText : (cellText + '\t');
            }
            plainText += rowContent + '\r\n';
        };
        var this_1 = this;
        for (var index = 0; index < tableRows.length; index++) {
            _loop_1(index);
        }
        return plainText;
    };
    /**
     * Cleans up resources when the component is destroyed
     *
     * @returns {void} - No return value
     * @public
     */
    ClipBoardCleanupAction.prototype.destroy = function () {
        this.removeEventListener();
    };
    return ClipBoardCleanupAction;
}());
export { ClipBoardCleanupAction };
