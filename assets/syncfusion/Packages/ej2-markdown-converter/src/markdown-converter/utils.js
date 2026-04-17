import { other } from './rules';
/**
 * Helpers
 */
var escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
var getEscapeReplacement = function (ch) { return escapeReplacements[ch]; };
export function escape(html, encode) {
    if (encode) {
        if (other.escapeTest.test(html)) {
            return html.replace(other.escapeReplace, getEscapeReplacement);
        }
    }
    else {
        if (other.escapeTestNoEncode.test(html)) {
            return html.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
        }
    }
    return html;
}
export function cleanUrl(href) {
    try {
        href = encodeURI(href).replace(other.percentDecode, '%');
    }
    catch (_a) {
        return null;
    }
    return href;
}
export function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(other.findPipe, function (match, offset, str) {
        var escaped = false;
        var curr = offset;
        while (--curr >= 0 && str[curr] === '\\') {
            escaped = !escaped;
        }
        if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
        }
        else {
            // add space before unescaped |
            return ' |';
        }
    });
    var cells = row.split(other.splitPipe);
    var i = 0;
    // First/last cell in a row cannot be empty if it has no leading/trailing pipe
    if (!cells[0].trim()) {
        cells.shift();
    }
    if (cells.length > 0 && cells[cells.length - 1].trim() === '') {
        cells.pop();
    }
    if (count) {
        if (cells.length > count) {
            cells.splice(count);
        }
        else {
            while (cells.length < count) {
                cells.push('');
            }
        }
    }
    for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(other.slashPipe, '|');
    }
    return cells;
}
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param {string} str The string
 * @param {string} c The character to trim
 * @param  {boolean} invert Remove suffix of non-c chars instead. Default falsey.
 * @returns {string} The trimmed string
 */
export function removeTrailingSpace(str, c, invert) {
    var l = str.length;
    if (l === 0) {
        return '';
    }
    // Length of suffix matching the invert condition.
    var suffLen = 0;
    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
        var currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
            suffLen++;
        }
        else if (currChar !== c && invert) {
            suffLen++;
        }
        else {
            break;
        }
    }
    return str.slice(0, l - suffLen);
}
export function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
        return -1;
    }
    var level = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === '\\') {
            i++;
        }
        else if (str[i] === b[0]) {
            level++;
        }
        else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
                return i;
            }
        }
    }
    if (level > 0) {
        return -2;
    }
    return -1;
}
// Gets the original marked default options.
export function getDefaults() {
    return {
        async: false,
        lineBreak: false,
        gfm: true,
        silent: false
    };
}
export function stringTrimStart(value) {
    return value.replace(/^\s+/, '');
}
export function stringTrimEnd(value) {
    return value.replace(/\s+$/, '');
}
export function arrayAt(arr, index) {
    // Normalize negative index
    if (index < 0) {
        index = arr.length + index;
    }
    // Return undefined if index is out of bounds
    if (index < 0 || index >= arr.length) {
        return undefined;
    }
    return arr[index];
}
