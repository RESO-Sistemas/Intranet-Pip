import { getBlockContentElement, getSelectedRange } from '../common/utils/index';
import * as constants from '../common/constant';
import { findClosestParent } from '../common/utils/dom';
/**
 * Selection manager for the block editor.
 * This class handles the selection of blocks and text within blocks.
 * It also provides methods to save and restore the selection.
 *
 */
var NodeSelection = /** @class */ (function () {
    function NodeSelection(wrapper) {
        this.editorWrapper = wrapper;
    }
    /**
     * Saves the current selection state, supporting both single and multi-block selections
     *
     * @returns {void}
     */
    NodeSelection.prototype.saveSelection = function () {
        var range = this.getRange();
        if (!range) {
            return;
        }
        this.currentRange = range.cloneRange();
        var startBlockElement = findClosestParent(range.startContainer, ('.' + constants.BLOCK_CLS));
        var endBlockElement = findClosestParent(range.endContainer, ('.' + constants.BLOCK_CLS));
        if (!startBlockElement || !endBlockElement) {
            return;
        }
        this.savedSelectionState = {
            startBlockId: startBlockElement.id,
            endBlockId: endBlockElement.id,
            startOffset: this.calculateOffset(range, getBlockContentElement(startBlockElement), true),
            endOffset: this.calculateOffset(range, getBlockContentElement(endBlockElement), false)
        };
    };
    /**
     * Restores the previously saved selection
     *
     * @returns {void}
     */
    NodeSelection.prototype.restoreSelection = function () {
        if (!this.savedSelectionState) {
            return;
        }
        var startBlockElement = this.editorWrapper.querySelector('#' + this.savedSelectionState.startBlockId);
        var endBlockElement = this.editorWrapper.querySelector('#' + this.savedSelectionState.endBlockId);
        var startInfo = this.findNodeAndOffsetFromTextPosition(getBlockContentElement(startBlockElement), this.savedSelectionState.startOffset);
        var endInfo = this.findNodeAndOffsetFromTextPosition(getBlockContentElement(endBlockElement), this.savedSelectionState.endOffset);
        this.createRangeWithOffsets(startInfo.node, endInfo.node, startInfo.offset, endInfo.offset);
    };
    /**
     * Calculates offset within the selection
     *
     * @param {Range} globalRange The global selection range
     * @param {HTMLElement} contentElement The content element
     * @param {boolean} isStart Specifies whether it is start block
     * @returns {number} The calculated offset value
     */
    NodeSelection.prototype.calculateOffset = function (globalRange, contentElement, isStart) {
        var node = isStart ? globalRange.startContainer : globalRange.endContainer;
        var offset = isStart ? globalRange.startOffset : globalRange.endOffset;
        var range = document.createRange();
        range.selectNodeContents(contentElement);
        range.setEnd(node, offset);
        return range.toString().length;
    };
    /**
     * Finds the DOM node and offset that corresponds to a text position
     *
     * @param {HTMLElement} container The container to search in
     * @param {number} targetOffset The character offset to find
     * @returns {object|null} Object with node and offset, or null if not found
     */
    NodeSelection.prototype.findNodeAndOffsetFromTextPosition = function (container, targetOffset) {
        if (!container) {
            return null;
        }
        var treeWalker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        var currentOffset = 0;
        var currentNode = treeWalker.nextNode();
        while (currentNode) {
            var nodeLength = currentNode.textContent.length;
            if (currentOffset + nodeLength >= targetOffset) {
                return {
                    node: currentNode,
                    offset: targetOffset - currentOffset
                };
            }
            currentOffset += nodeLength;
            currentNode = treeWalker.nextNode();
        }
        return { node: container, offset: 0 };
    };
    /**
     * Gets the current selection
     *
     * @returns {Selection | null} The current selection or null
     * @hidden
     */
    NodeSelection.prototype.getSelection = function () {
        return window.getSelection();
    };
    /**
     * Clears the current selection in the editor
     *
     * @returns {void}
     * @hidden
     */
    NodeSelection.prototype.clearSelection = function () {
        var sel = this.getSelection();
        sel.removeAllRanges();
    };
    /**
     * Gets the stored range
     *
     * @returns {Range | null} The stored range or null
     * @hidden
     */
    NodeSelection.prototype.getStoredRange = function () {
        return this.currentRange;
    };
    /**
     * Gets the stored backup range
     *
     * @returns {RangePath} The stored range or null
     * @hidden
     */
    NodeSelection.prototype.getStoredBackupRange = function () {
        return this.rangeBackup;
    };
    /**
     * Stores the current range
     *
     * @returns {void}
     * @hidden
     */
    NodeSelection.prototype.storeCurrentRange = function () {
        this.currentRange = this.getRange();
        this.rangeBackup = {
            startContainer: this.currentRange.startContainer,
            startOffset: this.currentRange.startOffset,
            endContainer: this.currentRange.endContainer,
            endOffset: this.currentRange.endOffset,
            contentElement: findClosestParent(this.currentRange.startContainer, '.' + constants.CONTENT_CLS)
        };
    };
    /**
     * Gets the current range
     *
     * @returns {Range | null} The current range or null
     * @hidden
     */
    NodeSelection.prototype.getRange = function () {
        var selection = window.getSelection();
        return selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    };
    /**
     * Gets the position of the current selection
     *
     * @returns {Object} Position object with x and y coordinates
     * @hidden
     */
    NodeSelection.prototype.getSelectionPosition = function () {
        var range = this.getRange();
        if (!range) {
            return { x: 0, y: 0 };
        }
        var rect = range.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.bottom + window.scrollY + 10 // 10px below selection
        };
    };
    /**
     * Checks if the current selection is collapsed (cursor only)
     *
     * @returns {boolean} True if selection is collapsed
     * @hidden
     */
    NodeSelection.prototype.isCollapsed = function () {
        var selection = this.getSelection();
        return !selection || selection.isCollapsed;
    };
    /**
     * Gets the selected text
     *
     * @returns {string} Selected text or empty string
     * @hidden
     */
    NodeSelection.prototype.getSelectedText = function () {
        var selection = this.getSelection();
        return selection ? selection.toString() : '';
    };
    /**
     * Creates a range with the specified start, end nodes and offsets.
     *
     * @param {Node} startNode - The start node of the range.
     * @param {Node} endNode - The end node of the range.
     * @param {number} startOffset - The start offset of the range.
     * @param {number} endOffset - The end offset of the range.
     *
     * @returns {void} - Returns void
     * @hidden
     */
    NodeSelection.prototype.createRangeWithOffsets = function (startNode, endNode, startOffset, endOffset) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
        return range;
    };
    /**
     * Checks if selection contains or intersects with a specific node type
     *
     * @param {string} tagName - The tag name to check for.
     * @param {HTMLElement} container - The container to search within.
     * @returns {boolean} True if selection contains or intersects with the specified tag.
     * @hidden
     */
    NodeSelection.prototype.selectionContainsNodeType = function (tagName, container) {
        var selection = this.getSelection();
        if (!selection) {
            return false;
        }
        var range = selection.getRangeAt(0);
        var nodes = container.querySelectorAll(tagName);
        for (var i = 0; i < nodes.length; i++) {
            if (range.intersectsNode(nodes[parseInt(i.toString(), 10)])) {
                return true;
            }
        }
        return false;
    };
    /**
     * Gets a node of specific type from the current selection
     *
     * @param {string} tagName - The tag name of the node to find.
     * @returns {HTMLElement | null} The found node or null if not found.
     * @hidden
     */
    NodeSelection.prototype.getNodeFromSelection = function (tagName) {
        var selection = this.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return null;
        }
        var range = selection.getRangeAt(0);
        var commonAncestor = range.commonAncestorContainer;
        if (commonAncestor.nodeType === Node.ELEMENT_NODE &&
            commonAncestor.tagName.toLowerCase() === tagName.toLowerCase()) {
            return commonAncestor;
        }
        if (commonAncestor.nodeType === Node.TEXT_NODE &&
            commonAncestor.parentElement &&
            commonAncestor.parentElement.tagName.toLowerCase() === tagName.toLowerCase()) {
            return commonAncestor.parentElement;
        }
        if (commonAncestor.nodeType === Node.ELEMENT_NODE) {
            return commonAncestor.querySelector(tagName);
        }
        var startContainer = range.startContainer;
        var endContainer = range.endContainer;
        if (startContainer && endContainer) {
            var startElement = startContainer.nodeType === Node.ELEMENT_NODE
                ? startContainer
                : startContainer.parentElement;
            var endElement = endContainer.nodeType === Node.ELEMENT_NODE
                ? endContainer
                : endContainer.parentElement;
            return (startElement.closest(tagName) || endElement.closest(tagName));
        }
        return null;
    };
    /**
     * Checks whether the entire editor is selected or not.
     *
     * @returns {boolean} - Returns true if the entire editor is selected, otherwise false.
     * @hidden
     */
    NodeSelection.prototype.checkIsEntireEditorSelected = function () {
        var selection = this.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return false;
        }
        var range = getSelectedRange();
        if (!range) {
            return false;
        }
        var firstBlockElement = this.editorWrapper.firstElementChild;
        var lastBlockElement = this.editorWrapper.lastElementChild;
        var firstBlockContent = getBlockContentElement(firstBlockElement);
        var lastBlockContent = getBlockContentElement(lastBlockElement);
        var startContainer = range.startContainer;
        var endContainer = range.endContainer;
        var isFirstBlockEmpty = firstBlockContent.textContent.trim() === '';
        var isLastBlockEmpty = lastBlockContent.textContent.trim() === '';
        var firstBlockStartNode = firstBlockContent.childNodes[0];
        var lastBlockEndNode = lastBlockContent.childNodes[lastBlockContent.childNodes.length - 1];
        // Selection performed using selectAll method
        if (startContainer.nodeType === Node.ELEMENT_NODE && endContainer.nodeType === Node.ELEMENT_NODE &&
            startContainer.classList.contains(constants.BLOCK_CONTAINER_CLS) &&
            endContainer.classList.contains(constants.BLOCK_CONTAINER_CLS)) {
            return true;
        }
        var isEqualsStartContainer = (firstBlockStartNode && firstBlockStartNode.contains(startContainer) ||
            isFirstBlockEmpty && firstBlockElement.contains(startContainer));
        var isEqualsEndContainer = (lastBlockEndNode && lastBlockEndNode.contains(endContainer) ||
            isLastBlockEmpty && lastBlockElement.contains(endContainer));
        return (isEqualsStartContainer &&
            isEqualsEndContainer &&
            range.startOffset === 0 &&
            range.endOffset === endContainer.textContent.length);
    };
    return NodeSelection;
}());
export { NodeSelection };
