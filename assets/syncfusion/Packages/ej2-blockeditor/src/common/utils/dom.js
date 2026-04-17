import { createElement, updateCSSText } from '@syncfusion/ej2-base';
import { ContentType } from '../../models/enums';
import { normalizeRange } from './common';
import { getBlockContentElement } from './block';
import * as constants from '../../common/constant';
/**
 * Finds the closest parent element that matches the specified selector.
 *
 * @param {Node | HTMLElement} element - The starting element
 * @param {string} selector - The CSS selector to match
 * @returns {HTMLElement | null} The closest matching parent element or null if not found
 */
export function findClosestParent(element, selector) {
    if (element.nodeType === Node.TEXT_NODE) {
        return element.parentElement.closest(selector) || null;
    }
    return element.closest(selector);
}
/**
 * Gets the computed absolute position of an element relative to the document.
 *
 * @param {HTMLElement} element - The element to get the position for
 * @returns {DOMRect} The element's position and dimensions
 */
export function getElementRect(element) {
    return element.getBoundingClientRect();
}
/**
 * Checks if a node is contained within a container element.
 *
 * @param {Node} node - The node to check
 * @param {HTMLElement} container - The container element
 * @returns {boolean} True if the node is inside the container, false otherwise
 */
export function isNodeInsideElement(node, container) {
    while (node) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
/**
 * Renders the given string in a temp element and returns the Dom text node.
 *
 * @param {string} content - The content to render
 * @returns {Node} - Rendered dom text node
 */
export function getDomTextNode(content) {
    var temp = document.createElement('div');
    temp.innerHTML = content;
    return temp.childNodes[0];
}
/**
 * Get all text nodes within a range
 *
 * @param {Range} range - Range to get nodes from
 * @returns {Node[]} - Collection of nodes
 */
export function getNodesInRange(range) {
    var textNodes = [];
    var normalizedRange = normalizeRange(range);
    var blockEle = findClosestParent(normalizedRange.startContainer, "." + constants.BLOCK_CLS);
    var contentEle = getBlockContentElement(blockEle);
    var walker = document.createTreeWalker(contentEle, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
            if (normalizedRange.intersectsNode(node)) {
                return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
        }
    });
    var node = walker.nextNode();
    while (node) {
        textNodes.push(node);
        node = walker.nextNode();
    }
    return textNodes;
}
/**
 * Creates formatting element based on the content model.
 *
 * @param {ContentModel} content - Content model.
 * @param {string | LinkData} value - Value to be set for the content.
 * @returns {Node} - Returns the formatted node.
 *
 */
export function createFormattingElement(content, value) {
    var isInlineCode = content.properties.styles.inlineCode;
    var textNode = document.createTextNode(content.content);
    var isLinkType = content.contentType === ContentType.Link;
    var styles = content.properties.styles;
    var keys = Object.keys(styles);
    // For code: preserve raw entities (&lt;, &gt;, &nbsp;, etc.)
    // For normal text: decode entities (allow &nbsp; → space)
    var formattedElement = isInlineCode ? (textNode) : (getDomTextNode(content.content) || textNode);
    // If no formatting at all (and not a link), return raw text node
    if (keys.length === 0 && !isLinkType) {
        return textNode;
    }
    if (keys.length > 0) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var styleType = keys_1[_i];
            switch (styleType.toLowerCase()) {
                case 'bold':
                    formattedElement = wrapNodeWithTag(formattedElement, 'strong');
                    break;
                case 'italic':
                    formattedElement = wrapNodeWithTag(formattedElement, 'em');
                    break;
                case 'underline':
                    formattedElement = wrapNodeWithTag(formattedElement, 'u');
                    break;
                case 'strikethrough':
                    formattedElement = wrapNodeWithTag(formattedElement, 's');
                    break;
                case 'subscript':
                    formattedElement = wrapNodeWithTag(formattedElement, 'sub');
                    break;
                case 'superscript':
                    formattedElement = wrapNodeWithTag(formattedElement, 'sup');
                    break;
                case 'inlinecode':
                    formattedElement = wrapNodeWithTag(formattedElement, 'code');
                    formattedElement.className = 'e-be-inline-code';
                    break;
                case 'color':
                case 'backgroundcolor':
                case 'uppercase':
                case 'lowercase':
                    {
                        var val = styles[styleType];
                        formattedElement = wrapNodeWithSpan(formattedElement, styleType, val);
                    }
                    break;
            }
        }
    }
    if (isLinkType) {
        var linkData = value;
        var props = content.properties;
        formattedElement = wrapNodeWithTag(formattedElement, 'a');
        if (linkData && !linkData.shouldRemoveLink) {
            formattedElement.href = props.url;
            formattedElement.target = '_blank';
            formattedElement.title = props.url;
        }
    }
    return formattedElement;
}
/**
 * Wraps a node with a specified HTML tag.
 *
 * @param {Node} node - The node to wrap
 * @param {string} tagName - The HTML tag to wrap with
 * @returns {HTMLElement} The created wrapper element
 */
export function wrapNodeWithTag(node, tagName) {
    var el = createElement(tagName);
    el.appendChild(node);
    return el;
}
/**
 * Wraps a node with a span and applies the specified style.
 *
 * @param {Node} node - The node to wrap
 * @param {string} styleType - The type of style to apply
 * @param {string | boolean} value - The style value
 * @returns {HTMLElement} The created span element
 */
export function wrapNodeWithSpan(node, styleType, value) {
    var span = createElement('span');
    switch (styleType.toLowerCase()) {
        case 'color':
            updateCSSText(span, "color: " + value + ";");
            break;
        case 'backgroundcolor':
            updateCSSText(span, "background-color: " + value + ";");
            break;
        case 'uppercase':
            updateCSSText(span, "text-transform: " + (value ? 'uppercase' : 'none') + ";");
            break;
        case 'lowercase':
            updateCSSText(span, "text-transform: " + (value ? 'lowercase' : 'none') + ";");
            break;
    }
    span.appendChild(node);
    return span;
}
/**
 * Removes all break tags from an HTML element.
 *
 * @param {HTMLElement} element - The element to clean
 * @returns {void}
 */
export function clearBreakTags(element) {
    element.innerHTML = element.innerHTML.replace(/<br>/g, '').trim();
}
/**
 * Checks if an element is empty (contains only whitespace or a single <br> tag).
 *
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is empty, false otherwise
 */
export function isElementEmpty(element) {
    return element.innerText.trim() === '' || element.innerHTML === '<br>';
}
/**
 * Removes all content after the split point from the current block.
 * Handles nested structures by walking up the tree and removing siblings after each level.
 *
 * @param {Node} splitPoint - The node where split occurred (startContainer after split)
 * @param {HTMLElement} contentElement - The top-level .e-block-content element (stop boundary)
 * @returns {void}
 */
export function removeNodesAfterSplit(splitPoint, contentElement) {
    var currentNode = splitPoint;
    while (currentNode && currentNode !== contentElement) {
        var parent_1 = currentNode.parentNode;
        // Remove currentNode and all its next siblings in this level
        var sibling = currentNode.nextSibling;
        while (sibling) {
            var nextSibling = sibling.nextSibling;
            parent_1.removeChild(sibling);
            sibling = nextSibling;
        }
        // Move up one level — now remove everything after this parent
        currentNode = parent_1;
    }
    contentElement.normalize();
}
export function getDeepestNodeAndOffset(container, offset) {
    if (container.nodeType === Node.TEXT_NODE) {
        var textNode_1 = container;
        var len = textNode_1.length;
        if (offset === len) {
            // At end → try to move to next text node
            var next = textNode_1.nextSibling;
            if (next) {
                return { node: next, offset: 0 };
            }
            // No next → stay at end
            return { node: textNode_1, offset: len };
        }
        return { node: textNode_1, offset: Math.min(offset, len) };
    }
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    var currentOffset = 0;
    var textNode = walker.nextNode();
    while (textNode) {
        var len = textNode.length;
        if (currentOffset + len > offset) {
            return { node: textNode, offset: offset - currentOffset };
        }
        currentOffset += len;
        textNode = walker.nextNode();
    }
    return null;
}
