import { findClosestParent } from './dom';
var FormattingHelper = /** @class */ (function () {
    function FormattingHelper() {
    }
    /**
     * isBold method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isBold = function (node) {
        var nodeName = node.nodeName.toLowerCase();
        if (this.validBoldTags.has(nodeName)) {
            return true;
        }
        else if (this.inlineTagsSet.has(nodeName) && node.style) {
            var fontWeight = node.style.fontWeight;
            return fontWeight && (fontWeight === 'bold' || parseInt(fontWeight, 10) >= 600);
        }
        return false;
    };
    /**
     * isItalic method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isItalic = function (node) {
        var nodeName = node.nodeName.toLowerCase();
        if (this.validItalicTags.has(nodeName)) {
            return true;
        }
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            return node.style.fontStyle === 'italic';
        }
        return false;
    };
    /**
     * isUnderline method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isUnderline = function (node) {
        var nodeName = node.nodeName.toLowerCase();
        if (this.validUnderlineTags.has(nodeName)) {
            return true;
        }
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            var style = node.style;
            return style.textDecoration === 'underline' || style.textDecorationLine === 'underline';
        }
        return false;
    };
    /**
     * isStrikethrough method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isStrikethrough = function (node) {
        var nodeName = node.nodeName.toLowerCase();
        if (this.validStrikethroughTags.has(nodeName)) {
            return true;
        }
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            var style = node.style;
            return style.textDecoration === 'line-through' || style.textDecorationLine === 'line-through';
        }
        return false;
    };
    /**
     * isSuperscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isSuperscript = function (node) {
        return this.validSuperscriptTags.has(node.nodeName.toLowerCase());
    };
    /**
     * isSubscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isSubscript = function (node) {
        return this.validSubscriptTags.has(node.nodeName.toLowerCase());
    };
    /**
     * isInlineCode method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isInlineCode = function (node) {
        var nodeName = node.nodeName.toLowerCase();
        if (this.validInlineCodeTags.has(nodeName)) {
            return true;
        }
        return false;
    };
    /**
     * isLink method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    FormattingHelper.isLink = function (node) {
        return node.tagName === 'A' && node.hasAttribute('href');
    };
    FormattingHelper.getLinkUrl = function (node) {
        var url = node.getAttribute('href');
        return url;
    };
    FormattingHelper.getFontColor = function (node) {
        var color = this.getStyleProperty(node, 'color');
        return this.normalizeColor(color);
    };
    FormattingHelper.getBackgroundColor = function (node) {
        var color = this.getStyleProperty(node, 'backgroundColor');
        return this.normalizeColor(color);
    };
    FormattingHelper.getStyleProperty = function (node, property) {
        var nodeName = node.nodeName.toLowerCase();
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            return node.style[property] || '';
        }
        return '';
    };
    /**
     * Converts RGB/RGBA color to hex format. If already hex or other format, returns as-is.
     *
     * @param {string} color - The color string (e.g., 'rgb(255, 0, 0)' or '#FF0000')
     * @returns {string} - The normalized color in hex format
     */
    FormattingHelper.normalizeColor = function (color) {
        if (!color) {
            return '';
        }
        // If already hex format, return as-is
        if (color.startsWith('#')) {
            return color.toUpperCase();
        }
        // Handle rgb(...) or rgba(...) by simple parsing (avoid complex regex to prevent unsafe-regex lint)
        if (color.startsWith('rgb')) {
            var start = color.indexOf('(');
            var end = color.lastIndexOf(')');
            if (start > -1 && end > start) {
                var parts = color.substring(start + 1, end).split(',').map(function (p) { return p.trim(); });
                var r = parseInt(parts[0] || '0', 10);
                var g = parseInt(parts[1] || '0', 10);
                var b = parseInt(parts[2] || '0', 10);
                var toHex = function (n) {
                    var hex = n.toString(16).toUpperCase();
                    return hex.length === 1 ? '0' + hex : hex;
                };
                if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                    return "#" + toHex(r) + toHex(g) + toHex(b);
                }
            }
        }
        // No match or not rgb/rgba, return as-is
        // Return as-is if not recognized format
        return color;
    };
    /**
     * Check if a node has a specific format by traversing UP the DOM tree.
     *
     * @param {Node} node - The node to check
     * @param {string} format - The format to search for
     * @param {Node} endNode - Stop traversing at this node (usually block boundary)
     * @returns {HTMLElement | null} - The format element if found, null otherwise
     */
    FormattingHelper.getFormattedNode = function (node, format, endNode) {
        var element = node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : node;
        while (element && (endNode === undefined || element !== endNode)) {
            if (this.isFormattedNode(element, format)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    };
    /**
     * Count how many nodes in an array have a specific format.
     *
     * Used for deciding: apply or remove?
     * - If count === nodes.length: all have format → remove
     * - If count < nodes.length: some lack format → apply
     *
     * @param {Node[]} nodes - Array of nodes to check
     * @param {string} format - Format to count
     * @param {Node} endNode - Stop traversing at this node
     * @returns {number} - Count of nodes with the format
     */
    FormattingHelper.countFormatted = function (nodes, format, endNode) {
        var count = 0;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            var isMentionNode = findClosestParent(node, '.e-mention-chip');
            if (this.getFormattedNode(node, format, endNode) || isMentionNode) {
                count++;
            }
        }
        return count;
    };
    /**
     * Checks if a given HTMLElement has the specified format applied.
     *
     * @param {HTMLElement} element - The element to check
     * @param {string} format - The format to verify
     * @returns {boolean} - True if the element has the format, false otherwise
     */
    FormattingHelper.isFormattedNode = function (element, format) {
        if (!element || !element.tagName) {
            return false;
        }
        switch (format) {
            case 'bold':
                return FormattingHelper.isBold(element);
            case 'italic':
                return FormattingHelper.isItalic(element);
            case 'underline':
                return FormattingHelper.isUnderline(element);
            case 'strikethrough':
                return FormattingHelper.isStrikethrough(element);
            case 'subscript':
                return FormattingHelper.isSubscript(element);
            case 'superscript':
                return FormattingHelper.isSuperscript(element);
            case 'inlineCode':
                return FormattingHelper.isInlineCode(element);
            case 'color':
                return !!FormattingHelper.getFontColor(element);
            case 'backgroundColor':
                return !!FormattingHelper.getBackgroundColor(element);
            case 'uppercase':
                return element.style.textTransform === 'uppercase';
            case 'lowercase':
                return element.style.textTransform === 'lowercase';
            case 'link':
                return FormattingHelper.isLink(element);
            default:
                return false;
        }
    };
    /**
     * Determine if should apply or remove format
     * Based on whether all selected nodes have the format
     *
     * @param {Node[]} nodes - Nodes to perform check
     * @param {string} format - format to toggle
     * @param {Node} endNode - Optional node to limit traversal
     * @returns {boolean} - Whether to remove format or not
     */
    FormattingHelper.shouldRemoveFormat = function (nodes, format, endNode) {
        // Value-based styles should never be "removed" in the toggle sense
        // They should be replaced with a new value instead
        var valueBasedFormats = ['color', 'backgroundColor', 'link'];
        if (valueBasedFormats.indexOf(format) !== -1) {
            return false; // Never auto-remove; let applyFormat handle the replacement
        }
        // For boolean styles (bold, italic, underline, etc.): remove if all nodes have it
        var formattedCount = this.countFormatted(nodes, format, endNode);
        return formattedCount === nodes.length;
    };
    FormattingHelper.validBoldTags = new Set(['strong', 'b']);
    FormattingHelper.validItalicTags = new Set(['em', 'i']);
    FormattingHelper.validUnderlineTags = new Set(['u']);
    FormattingHelper.validStrikethroughTags = new Set(['del', 'strike', 's']);
    FormattingHelper.validSuperscriptTags = new Set(['sup']);
    FormattingHelper.validSubscriptTags = new Set(['sub']);
    FormattingHelper.validInlineCodeTags = new Set(['code']);
    FormattingHelper.inlineTagsSet = new Set(['a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'cite', 'code', 'dfn', 'em',
        'font', 'i', 'kbd', 'label', 'q', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'tt', 'u', 'var', 'del']);
    return FormattingHelper;
}());
export { FormattingHelper };
