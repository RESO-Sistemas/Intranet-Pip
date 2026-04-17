var NodeCutter = /** @class */ (function () {
    function NodeCutter() {
    }
    /**
     * Split node at both selection boundaries (start and end).
     *
     * After this method:
     * - Start boundary: content before selection is isolated from selected content
     * - End boundary: selected content is isolated from content after
     * Result: Selected content can be cleanly operated on
     *
     * @param {Range} range - The selection range
     * @param {Node} node - The node to split
     * @returns {Node} - The node containing the selected content
     */
    NodeCutter.prototype.getSpliceNode = function (range, node) {
        // First pass: split at START boundary
        node = this.splitNode(range, node, true);
        // Second pass: split at END boundary
        node = this.splitNode(range, node, false);
        return node;
    };
    /**
     * Split a single node at one boundary of the range.
     *
     * If isStart is true: Splits at the START boundary
     *   - Moves content before selection out of the node
     *   - Leaves selected content and content after in the node
     *
     * If isStart is false: Splits at the END boundary
     *   - Moves content after selection out of the node
     *   - Leaves content before and selected content in the node
     *
     * @param {Range} range - The selection range
     * @param {Node} node - The node to split
     * @param {boolean} isStart - If true, split at start boundary; if false, split at end boundary
     * @returns {Node} - The node after splitting
     */
    NodeCutter.prototype.splitNode = function (range, node, isStart) {
        var clone = range.cloneRange();
        var parent = node.parentNode;
        var index = this.getNodeIndex(node);
        // Set up cloned range to extract content
        clone.collapse(isStart);
        if (isStart) {
            // For start split: we want everything from node start to selection start
            clone.setStartBefore(node);
        }
        else {
            // For end split: we want everything from selection end to node end
            clone.setEndAfter(node);
        }
        // Extract the content
        var fragment = clone.extractContents();
        // After extraction, get reference to current node in parent
        if (isStart) {
            // After start split, selected content is at original index
            node = parent.childNodes[index];
        }
        else {
            // After end split, find the node (it might have moved)
            node = parent.childNodes.length > 1
                ? parent.childNodes[index]
                : parent.childNodes[0];
        }
        // Insert the extracted fragment back (this is the part that's NOT selected)
        if (fragment && fragment.childNodes.length > 0) {
            var isEmpty = this.isEmptyFragment(fragment);
            var refNode = (isStart ? node : node.nextSibling);
            if (!isEmpty) {
                parent.insertBefore(fragment, refNode);
            }
        }
        return node;
    };
    /**
     * Check if a fragment is effectively empty (only contains whitespace, no meaningful content)
     *
     * @param {DocumentFragment} fragment - Fragment to check
     * @returns {boolean} - Whether the fragment is empty
     */
    NodeCutter.prototype.isEmptyFragment = function (fragment) {
        if (!fragment || !fragment.textContent) {
            return true;
        }
        return fragment.textContent.trim() === '';
    };
    /**
     * Get the index of a node among its siblings
     *
     * @param {Node} node - The node to get index for.
     * @returns {number} - The index of the node
     */
    NodeCutter.prototype.getNodeIndex = function (node) {
        var index = 0;
        var sibling = node.previousSibling;
        while (sibling) {
            index++;
            sibling = sibling.previousSibling;
        }
        return index;
    };
    /**
     * Splits the content of a block at a specified node and offset.
     * Used for block operations like Enter key (splitting paragraphs) and paste operations.
     *
     * @param {HTMLElement} contentElement - The content element of the block
     * @param {Node} splitNode - The node at which to split the content
     * @param {number} splitOffset - The offset within the split node at which to split
     * @returns {ISplitContentData} - Contains beforeFragment and afterFragment
     * @hidden
     */
    NodeCutter.prototype.splitContent = function (contentElement, splitNode, splitOffset) {
        var beforeFragment = document.createDocumentFragment();
        var afterFragment = document.createDocumentFragment();
        var isSplitting = false;
        var processNode = function (node, container, parentChain, isAfter) {
            if (parentChain === void 0) { parentChain = []; }
            if (isAfter === void 0) { isAfter = false; }
            if (node.nodeType === Node.TEXT_NODE) {
                var textNode = node;
                var fullText = textNode.textContent;
                if (!isAfter && node === splitNode) {
                    var beforeText = fullText.slice(0, splitOffset);
                    var afterText = fullText.slice(splitOffset);
                    if (beforeText) {
                        container.appendChild(document.createTextNode(beforeText));
                    }
                    if (afterText) {
                        // Build after tree from deepest to root
                        var afterNode = document.createTextNode(afterText);
                        for (var i = parentChain.length - 1; i >= 0; i--) {
                            var cloned = parentChain[i]
                                .cloneNode(false);
                            cloned.appendChild(afterNode);
                            afterNode = cloned;
                        }
                        afterFragment.appendChild(afterNode);
                    }
                    isSplitting = true;
                }
                else {
                    container.appendChild(document.createTextNode(fullText));
                }
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                var element = node;
                var clone = element.cloneNode(false);
                var newParentChain = parentChain.concat([element]);
                if (!isAfter && (element.contains(splitNode) || element === splitNode)) {
                    for (var _i = 0, _a = Array.from(element.childNodes); _i < _a.length; _i++) {
                        var child = _a[_i];
                        if (!isSplitting && (child.contains(splitNode) || child === splitNode)) {
                            processNode(child, clone, newParentChain);
                        }
                        else {
                            processNode(child, clone, newParentChain, isSplitting);
                        }
                    }
                    container.appendChild(clone);
                }
                else {
                    if (isAfter) {
                        container.appendChild(element.cloneNode(true));
                    }
                    else {
                        container.appendChild(clone);
                        for (var _b = 0, _c = Array.from(element.childNodes); _b < _c.length; _b++) {
                            var child = _c[_b];
                            processNode(child, clone, newParentChain, isAfter);
                        }
                    }
                }
            }
        };
        for (var _i = 0, _a = Array.from(contentElement.childNodes); _i < _a.length; _i++) {
            var node = _a[_i];
            if (!isSplitting) {
                processNode(node, beforeFragment, []);
            }
            else {
                afterFragment.appendChild(node.cloneNode(true));
            }
        }
        return { beforeFragment: beforeFragment, afterFragment: afterFragment, splitOffset: splitOffset };
    };
    return NodeCutter;
}());
export { NodeCutter };
