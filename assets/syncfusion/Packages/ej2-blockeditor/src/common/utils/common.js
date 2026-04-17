import { compile, select } from '@syncfusion/ej2-base';
import { getDeepestNodeAndOffset } from './dom';
/**
 * Generates a unique ID with an optional prefix.
 *
 * @param {string} [prefix] - An optional prefix to differentiate models (e.g., "block", "user").
 * @returns {string} A unique ID consisting of a timestamp and random characters.
 */
export function generateUniqueId(prefix) {
    var timestamp = Date.now().toString(36); // Base36 timestamp (millisecond precision)
    var randomPart = getRandomNumber().toString(36).substring(2, 10); // 8 random characters
    return ("" + (prefix ? prefix + '-' : '') + timestamp + randomPart).toLowerCase();
}
/**
 * Calculates the absolute offset of a given node within its parent element.
 *
 * @param {HTMLElement} element - The parent element.
 * @param {Node} node - The node to calculate the offset for.
 * @param {number} relativeOffset - The offset relative to the node.
 * @returns {number} The absolute offset of the node within the parent element.
 */
export function getAbsoluteOffset(element, node, relativeOffset) {
    var absoluteOffset = 0;
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
        var textNode = walker.currentNode;
        if (textNode === node) {
            return absoluteOffset + relativeOffset;
        }
        absoluteOffset += textNode.textContent.length || 0;
    }
    return absoluteOffset;
}
/**
 * Cleans up an HTML element by removing it from the DOM and setting its reference to null.
 *
 * @param {HTMLElement} element - The HTML element to clean up.
 * @returns {void}
 */
export function cleanupElement(element) {
    if (element) {
        element.remove();
    }
    element = null;
}
/**
 * Returns the parent element if node is given or returns the element itself
 *
 * @param {Node} node - Node to get parent element.
 * @returns {HTMLElement} - The parent element
 */
export function getParentElement(node) {
    return (node.nodeType === Node.TEXT_NODE) ? node.parentElement : node;
}
/**
 * Gets template content based on the template property value.
 *
 * @param {string | Function} template - Template property value.
 * @returns {Function} - Return template function.
 * @hidden
 */
export function getTemplateFunction(template) {
    if (typeof template === 'string') {
        var content = '';
        try {
            var tempEle = select(template);
            if (tempEle) {
                //Return innerHTML incase of jsrenderer script else outerHTML
                content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
            }
            else {
                content = template;
            }
        }
        catch (e) {
            content = template;
        }
        return compile(content);
    }
    else {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        return compile(template);
    }
}
/**
 * Normalizes a selection range to ensure accurate text-node-based start/end.
 * Handles deep nesting, partial selections, and boundary cases without over-expansion.
 *
 * @param {Range} range - The raw selection range
 * @returns {void} Normalized range with text-node containers
 */
export function normalizeRange(range) {
    if (range.collapsed) {
        return range.cloneRange();
    }
    var normalized = range.cloneRange();
    // Normalize start
    var start = getDeepestNodeAndOffset(range.startContainer, range.startOffset);
    normalized.setStart(start.node, start.offset);
    // Normalize end
    var end = getDeepestNodeAndOffset(range.endContainer, range.endOffset);
    normalized.setEnd(end.node, end.offset);
    // Preserve direction (forward/backward selection)
    if (normalized.collapsed && !range.collapsed) {
        normalized.collapse(range.startOffset <= range.endOffset);
    }
    return normalized;
}
/**
 * Creates an isolated copy of a model with independent references for all nested objects.
 *
 * This function creates a new instance of a model where all nested objects (including props,
 * styles, and other references) are also copied, preventing unintended modifications to the
 * original model or shared references. Use this function when you need to manipulate a model
 * without affecting other parts of the application that may reference the same object.
 *
 * @template T The type of the model to isolate
 * @param {T} item The original model to create an isolated copy from
 * @returns {T} A new instance of the model with independent references
 */
export function decoupleReference(item) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    var seen = new WeakMap();
    var cloneInternal = function (obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (seen.has(obj)) {
            return seen.get(obj);
        }
        var copy = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
        seen.set(obj, copy);
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy["" + key] = cloneInternal(obj["" + key]);
            }
        }
        return copy;
    };
    return cloneInternal(item);
    /* eslint-enable @typescript-eslint/no-explicit-any */
}
export function getInverseStyle(style) {
    var oppositeStyleMap = {
        superscript: 'subscript',
        subscript: 'superscript',
        uppercase: 'lowercase',
        lowercase: 'uppercase'
    };
    return oppositeStyleMap["" + style];
}
/**
 * Normalize URL by adding protocol if missing
 *
 * @param {string} url - URL to normalize.
 * @returns {string} - Normalized URL.
 */
export function normalizeUrl(url) {
    if (!url.match(/^https?:\/\//i) && !url.startsWith('/')) {
        return 'https://' + url;
    }
    return url;
}
/**
 * Denormalize URL by removing protocol if present
 *
 * @param {string} url - URL to denormalize.
 * @returns {string} - Denormalized URL.
 */
export function denormalizeUrl(url) {
    if (url.startsWith('https://')) {
        return url.slice(8);
    }
    else if (url.startsWith('http://')) {
        return url.slice(7);
    }
    return url;
}
/**
 * Checks whether the given node is around special elements.
 * Some special elements are 'a', etc.
 *
 * @param {Node | null} node - The node to check.
 * @returns {boolean} - True if the node is around special elements, false otherwise.
 */
export function isNodeAroundSpecialElements(node) {
    var specialElements = ['A'];
    var prevSibling = node.previousSibling;
    var nextSibling = node.nextSibling;
    return ((prevSibling && specialElements.indexOf(prevSibling.nodeName) > -1) ||
        (nextSibling && specialElements.indexOf(nextSibling.nodeName) > -1) ||
        (prevSibling && prevSibling.classList &&
            prevSibling.classList.contains('e-mention-chip')) ||
        (nextSibling && nextSibling.classList &&
            nextSibling.classList.contains('e-mention-chip')) ||
        (prevSibling && prevSibling.classList &&
            prevSibling.classList.contains('e-label-chip')) ||
        (nextSibling && nextSibling.classList &&
            nextSibling.classList.contains('e-label-chip')));
}
/**
 * Gets the deepest text node within an element
 *
 * @param {HTMLElement} element - The container element
 * @returns {Node} - The deepest text node or null if no text node is found
 */
export function getDeepestTextNode(element) {
    var treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    var deepestNode = null;
    while (treeWalker.nextNode()) {
        deepestNode = treeWalker.currentNode;
    }
    return deepestNode;
}
/**
 * Returns the auto generated avatar color based on the seed.
 *
 * @param {string} seed - The seed string to generate the color.
 * @returns {string} - The generated color.
 */
export function getAutoAvatarColor(seed) {
    var colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2'];
    var hash = 0;
    for (var i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}
/**
 * Returns the user initials based on the name.
 *
 * @param {string} name - The name to generate initials from.
 * @returns {string} - The generated initials.
 */
export function getUserInitials(name) {
    var parts = name.trim().split(' ');
    var initials = parts.length > 1
        ? "" + parts[0][0] + parts[parts.length - 1][0]
        : parts[0][0];
    return initials.toUpperCase();
}
/**
 * Returns the best accessible foreground color (black or white)
 * for a given background color to ensure good contrast.
 *
 * @param {string} backgroundColor - The background color in any CSS-supported format (hex, rgb, etc.)
 * @returns {string} - '#000000' or '#ffffff'
 */
export function getAccessibleTextColor(backgroundColor) {
    var rgb = parseColor(backgroundColor);
    if (!rgb) {
        return '#000000';
    }
    var luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.5 ? '#000000' : '#ffffff';
}
function parseColor(color) {
    if (color.startsWith('#')) {
        var hex = color.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(function (c) { return c + c; }).join('');
        }
        if (hex.length !== 6) {
            return null;
        }
        var bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }
    var rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
        return {
            r: parseInt(rgbMatch[1], 10),
            g: parseInt(rgbMatch[2], 10),
            b: parseInt(rgbMatch[3], 10)
        };
    }
    return null;
}
function getRelativeLuminance(r, g, b) {
    var _a = [r, g, b].map(function (channel) {
        var c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }), R = _a[0], G = _a[1], B = _a[2];
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
export function getNormalizedKey(e) {
    var keys = [];
    if (e.ctrlKey || e.metaKey) {
        keys.push('ctrl');
    }
    if (e.altKey) {
        keys.push('alt');
    }
    if (e.shiftKey) {
        keys.push('shift');
    }
    var key = normalizeCode(e.code);
    keys.push(key);
    return keys.join('+');
}
export function normalizeCode(code) {
    if (code.startsWith('Digit')) {
        return code.slice(5); // Digit1 -> 1
    }
    if (code.startsWith('Key')) {
        return code.slice(3).toLowerCase(); // KeyA -> a
    }
    var specialMap = {
        'Minus': '-',
        'Equal': '=',
        'Backquote': '`',
        'BracketLeft': '[',
        'BracketRight': ']',
        'Backslash': '\\',
        'Semicolon': ';',
        'Quote': '\'',
        'Comma': ',',
        'Period': '.',
        'Slash': '/',
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'Enter': 'enter',
        'Space': 'space',
        'Tab': 'tab'
    };
    return specialMap["" + code] || code.toLowerCase();
}
export function createSvgElement(tagName, attributes) {
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var element = document.createElementNS(SVG_NS, tagName);
    for (var key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            var value = attributes["" + key];
            element.setAttribute(key, value);
        }
    }
    return element;
}
export function createBaseSvg(viewBox) {
    if (viewBox === void 0) { viewBox = '0 0 24 24'; }
    return createSvgElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: viewBox,
        fill: 'none',
        width: '18',
        height: '18'
    });
}
/**
 * @returns {number} A cryptographically secure random number.
 * @hidden
 */
export function getRandomNumber() {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xFFFFFFFF + 1);
}
