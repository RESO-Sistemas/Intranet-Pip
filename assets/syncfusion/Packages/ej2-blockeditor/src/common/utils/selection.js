import { getParentBlock } from './block';
/**
 * Returns the current text selection range.
 *
 * @returns {Range | null} The start and end indices of the selection range, or null if no selection is active.
 */
export function getSelectedRange() {
    var selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        return selection.getRangeAt(0);
    }
    return null;
}
/**
 * Sets the selection range in the editor.
 *
 * @param {Node} element - The HTML element to apply the selection range to.
 * @param {number} start - The start index of the selection.
 * @param {number} end - The end index of the selection.
 * @returns {void}
 */
export function setSelectionRange(element, start, end) {
    var range = document.createRange();
    var selection = window.getSelection();
    if (selection) {
        range.setStart(element, start);
        range.setEnd(element, end);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
/**
 * Moves the cursor to a specific position considering formatted content
 *
 * @param {HTMLElement} element The container element
 * @param {number} position Character position within entire content (not just text nodes)
 * @returns {void}
 */
export function setCursorPosition(element, position) {
    var selection = window.getSelection();
    if (!selection || !element) {
        return;
    }
    // Create a walker to traverse all text nodes
    var treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
        acceptNode: function (node) {
            return node.nodeType === Node.TEXT_NODE ||
                (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length === 0)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
        }
    });
    var currentPosition = 0;
    var targetNode;
    var targetOffset = 0;
    while (treeWalker.nextNode()) {
        var node = treeWalker.currentNode;
        var contentLength = node.textContent.length || 0;
        if (currentPosition + contentLength >= position) {
            targetNode = node;
            targetOffset = position - currentPosition;
            break;
        }
        currentPosition += contentLength;
    }
    // Fallback to end if position exceeds content length
    if (!targetNode) {
        targetNode = element;
        targetOffset = element.childNodes.length;
    }
    if (document.contains(targetNode)) {
        var range = document.createRange();
        if (targetNode.nodeType === Node.ELEMENT_NODE && targetNode.childNodes.length === 0) {
            range.setStart(targetNode, 0);
        }
        else {
            range.setStart(targetNode, Math.min(targetOffset, targetNode.textContent.length || 0));
        }
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
export function getTextOffset(node, within) {
    var offset = 0;
    var walker = document.createTreeWalker(within, NodeFilter.SHOW_TEXT, null);
    var current = walker.nextNode();
    while (current && current !== node) {
        offset += current.textContent.length || 0;
        current = walker.nextNode();
    }
    return offset;
}
/**
 * Captures the current selection state, including the start and end blocks and offsets.
 *
 * @returns {IBlockSelectionState | null} The selection state or null if no selection is active.
 */
export function captureSelectionState() {
    var range = getSelectedRange();
    if (!range) {
        return null;
    }
    var startBlock = getParentBlock(range.startContainer);
    var endBlock = getParentBlock(range.endContainer);
    if (!startBlock || !endBlock) {
        return null;
    }
    return {
        startBlockId: startBlock.id,
        endBlockId: endBlock.id,
        startContainerPath: getPathFromBlock(startBlock, range.startContainer),
        endContainerPath: getPathFromBlock(endBlock, range.endContainer),
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        isCollapsed: range.collapsed
    };
}
/**
 * Retrieves the path from a block element to a target node.
 *
 * @param {HTMLElement} blockElement - The block element to start from.
 * @param {Node} targetNode - The target node to find the path to.
 * @returns {number[]} - The path as an array of indices.
 */
export function getPathFromBlock(blockElement, targetNode) {
    var path = [];
    var currentNode = targetNode;
    while (currentNode && currentNode !== blockElement) {
        var parent_1 = currentNode.parentNode;
        if (parent_1) {
            var index = Array.prototype.indexOf.call(parent_1.childNodes, currentNode);
            path.unshift(index);
            currentNode = parent_1;
        }
        else {
            break;
        }
    }
    return path;
}
/**
 * Retrieves a node from a block element using a path.
 *
 * @param {HTMLElement} blockElement - The block element to start from.
 * @param {number[]} path - The path as an array of indices.
 * @returns {Node | null} - The node at the specified path, or null if not found.
 */
export function getNodeFromPath(blockElement, path) {
    var currentNode = blockElement;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var index = path_1[_i];
        if (!currentNode.childNodes || index >= currentNode.childNodes.length) {
            return null; // Path is invalid
        }
        currentNode = currentNode.childNodes[parseInt(index.toString(), 10)];
    }
    return currentNode;
}
