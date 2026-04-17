import { findClosestParent, getNodesInRange } from '../../../common/utils/dom';
import { FormattingHelper } from '../../../common/utils/isformatted';
import { getInverseStyle } from '../../../common/utils/common';
import { getBlockSpecificRange } from '../../../common/utils/block';
var FormattingHandler = /** @class */ (function () {
    function FormattingHandler(manager) {
        this.parent = manager;
    }
    /**
     * Applies or removes a specific formatting style to a given node within a selection range.
     *
     * This method handles the process of wrapping the target node with the appropriate formatting element
     * or unwrapping/removing styles if the formatting is already present. It ensures that the formatting
     * is correctly applied or removed without disrupting the document structure.
     *
     * @param {Range} range - Optional range object representing the current selection, used for precise node splicing.
     * @param {string} format - The style property to modify, such as 'bold', 'italic', 'color', etc.
     * @param {ExecCommandOptions} options - Options to apply formatting
     * @returns {void}
     */
    FormattingHandler.prototype.executeFormat = function (range, format, options) {
        var value = options.value, shouldRemoveGlobally = options.shouldRemoveGlobally;
        // STEP 1: Get all text nodes in selection
        var nodes = getNodesInRange(range);
        // STEP 2: Decide apply or remove based on format state
        var shouldRemove = shouldRemoveGlobally !== undefined
            ? shouldRemoveGlobally
            : FormattingHelper.shouldRemoveFormat(nodes, format);
        var valueBasedFormats = ['color', 'backgroundColor', 'link'];
        var isValueBased = valueBasedFormats.indexOf(format) !== -1;
        // STEP 3: Process each node
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            var isMentionNode = findClosestParent(node, '.e-mention-chip');
            if (isMentionNode) {
                continue;
            }
            var formatNode = FormattingHelper.getFormattedNode(node, format);
            if ((formatNode && shouldRemove) || (formatNode && isValueBased && !value)) {
                // Node HAS format and we're REMOVING (boolean styles)
                // Node HAS format, user intent to empty it so we're REMOVING (value based styles)
                this.removeFormatFromNode(node, format, range);
            }
            else if (formatNode && isValueBased && value) {
                // Node HAS format and we're REPLACING value (value-based styles)
                // Replace the value instead of wrapping again
                this.updateNodeValue(node, format, value, range);
            }
            else if (!formatNode && !shouldRemove) {
                // Node LACKS format and we're APPLYING
                this.applyFormatToNode(node, format, value, range);
            }
        }
        // STEP 4: Handle toggle pairs (superscript↔subscript, uppercase↔lowercase)
        // When applying a format that has a toggle pair, remove its opposite
        if (!shouldRemove) {
            var togglePairs = ['superscript', 'subscript', 'uppercase', 'lowercase'];
            if (togglePairs.indexOf(format) !== -1) {
                var oppositeFormat = getInverseStyle(format);
                for (var _a = 0, nodes_2 = nodes; _a < nodes_2.length; _a++) {
                    var node = nodes_2[_a];
                    var conflictNode = FormattingHelper.getFormattedNode(node, oppositeFormat);
                    if (conflictNode) {
                        this.parent.formattingAction.nodeSelection.restoreSelection();
                        var blockRange = getBlockSpecificRange(this.parent.nodeSelection.getRange(), findClosestParent(range.startContainer, '.e-block'));
                        this.removeFormatFromNode(node, oppositeFormat, blockRange);
                    }
                }
            }
        }
        // STEP 5: Final cleanup
        this.cleanupRange(range);
    };
    /**
     * Applies or removes a specific formatting style to a given node within a selection range.
     *
     * @param {Node} node - The DOM node to which the formatting will be applied or removed.
     * @param {string} format - The style property to modify, such as 'bold', 'italic', 'color', etc.
     * @param {string} value - Optional value for the style, e.g., color, bgColor or link.
     * @param {Range} range - Optional range object representing the current selection, used for precise node splicing.
     * @returns {void}
     */
    FormattingHandler.prototype.applyFormatToNode = function (node, format, value, range) {
        // Step 1: Split to isolate selected content
        var splitNode = this.parent.nodeCutter.getSpliceNode(range, node);
        // Step 2: Create format wrapper element
        var wrapper = this.createFormatElement(format, value);
        // Step 3: Wrap the split node
        var parent = splitNode.parentNode;
        if (parent) {
            parent.insertBefore(wrapper, splitNode);
            wrapper.appendChild(splitNode);
        }
    };
    /**
     * Remove formatting from a node by unwrapping or clearing styles.
     *
     * This method locates the formatted node within the selection,
     * then either unwraps it from its formatting element or clears inline styles.
     *
     * @param {Node} node - The node from which to remove formatting.
     * @param {string} format - The format type to remove.
     * @param {Range} [range] - Optional range to assist in node splicing.
     * @returns {void}
     */
    FormattingHandler.prototype.removeFormatFromNode = function (node, format, range) {
        var formatNode = FormattingHelper.getFormattedNode(node, format);
        var splitNode = this.parent.nodeCutter.getSpliceNode(range, formatNode);
        if (this.isStyleBased(format)) {
            this.removeStyleFromElement(splitNode, format);
            var elem = splitNode;
            if (elem.getAttribute('style') === '' || !elem.getAttribute('style')) {
                elem.removeAttribute('style');
                if (!elem.hasAttributes()) {
                    this.unwrapElement(elem);
                }
            }
        }
        else {
            this.unwrapElement(splitNode);
        }
    };
    FormattingHandler.prototype.unwrapElement = function (element) {
        var parent = element.parentNode;
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }
        element.remove();
        parent.normalize();
    };
    FormattingHandler.prototype.createFormatElement = function (format, value) {
        var tagMap = {
            'bold': 'strong',
            'italic': 'em',
            'underline': 'u',
            'strikethrough': 's',
            'subscript': 'sub',
            'superscript': 'sup',
            'inlineCode': 'code',
            'link': 'a'
        };
        var tagName = tagMap[format];
        if (this.isStyleBased(format)) {
            return this.createStyledSpan(format, value);
        }
        var elem = document.createElement(tagName);
        if (format === 'inlineCode') {
            elem.className = 'e-be-inline-code';
        }
        else if (format === 'link') {
            var linkData = value;
            if (linkData && !linkData.shouldRemoveLink) {
                elem.href = linkData.url;
                elem.target = '_blank';
                elem.title = linkData.url;
            }
        }
        return elem;
    };
    FormattingHandler.prototype.createStyledSpan = function (format, value) {
        var span = document.createElement('span');
        switch (format) {
            case 'color':
                span.style.color = value;
                break;
            case 'backgroundColor':
                span.style.backgroundColor = value;
                break;
            case 'uppercase':
                span.style.textTransform = 'uppercase';
                break;
            case 'lowercase':
                span.style.textTransform = 'lowercase';
                break;
        }
        return span;
    };
    /**
     * Update the style value of an element for value-based formats.
     * This replaces the existing value instead of removing and re-wrapping.
     *
     * @param {Node} node - The node containing the styled content
     * @param {string} format - The format to update
     * @param {string} value - The new value for the style
     * @param {Range} range - Optional range for node splicing
     * @returns {void}
     */
    FormattingHandler.prototype.updateNodeValue = function (node, format, value, range) {
        var formatNode = FormattingHelper.getFormattedNode(node, format);
        var splitNode = this.parent.nodeCutter.getSpliceNode(range, formatNode);
        if (!splitNode) {
            return;
        }
        // Update the style directly without unwrapping
        var elem = splitNode;
        switch (format) {
            case 'color':
                elem.style.color = value;
                break;
            case 'backgroundColor':
                elem.style.backgroundColor = value;
                break;
            case 'link':
                elem.href = value.url;
                elem.title = value.url;
        }
    };
    FormattingHandler.prototype.removeStyleFromElement = function (elem, format) {
        switch (format) {
            case 'color':
                elem.style.color = '';
                break;
            case 'backgroundColor':
                elem.style.backgroundColor = '';
                break;
            case 'uppercase':
            case 'lowercase':
                elem.style.textTransform = '';
                break;
        }
    };
    FormattingHandler.prototype.isStyleBased = function (format) {
        var styleBased = ['color', 'backgroundColor', 'uppercase', 'lowercase'];
        return styleBased.indexOf(format) !== -1;
    };
    FormattingHandler.prototype.cleanupRange = function (range) {
        var ancestor = range.commonAncestorContainer;
        var container = (ancestor.nodeType === Node.TEXT_NODE) ? ancestor.parentElement : ancestor;
        this.mergeAdjacentTags(container);
        container.normalize();
    };
    FormattingHandler.prototype.mergeAdjacentTags = function (container) {
        var children = Array.from(container.childNodes);
        var i = 0;
        while (i < children.length - 1) {
            var current = children[i];
            var next = children[(i + 1)];
            if (current.nodeType !== Node.ELEMENT_NODE || next.nodeType !== Node.ELEMENT_NODE) {
                i++;
                continue;
            }
            var currEl = current;
            var nextEl = next;
            if (currEl.tagName !== nextEl.tagName) {
                i++;
                continue;
            }
            if (currEl.tagName === 'SPAN' && currEl.style.cssText !== nextEl.style.cssText) {
                i++;
                continue;
            }
            while (nextEl.firstChild) {
                currEl.appendChild(nextEl.firstChild);
            }
            nextEl.remove();
            children.splice(i + 1, 1);
        }
    };
    return FormattingHandler;
}());
export { FormattingHandler };
