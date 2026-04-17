var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { escapeHTML, sanitizeHelper } from './security';
import { FormattingHelper } from './isformatted';
import { BlockFactory } from '../../block-manager/services/block-factory';
import { BlockType, ContentType } from '../../models/enums';
import { buildTableClipboardPayload, extractPlainTextMatrixFromPayload, htmlTableFromMatrix } from './clipboard-utils';
import { focusAllCellsInTable, removeFocusFromAllCells } from './table-utils';
var hasBlockElements = function (element) {
    var blockTags = ['H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'UL', 'OL', 'PRE', 'HR', 'IMG', 'TABLE'];
    return blockTags.some(function (tag) { return element.querySelector(tag) !== null; });
};
export function convertHtmlElementToBlocks(container, keepFormat) {
    var blocks = [];
    var processNode = function (node, indentLevel) {
        if (indentLevel === void 0) { indentLevel = 0; }
        var isBlockProcessed = false;
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
            return isBlockProcessed;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
            var element = node;
            var tag = element.tagName;
            if (tag === 'UL' || tag === 'OL') {
                var isOrdered = tag === 'OL';
                var children = Array.from(element.children);
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var child = children_1[_i];
                    if (child.tagName === 'LI') {
                        // Create list item block from <li> content
                        blocks.push(BlockFactory.createBlockFromPartial({
                            blockType: isOrdered ? BlockType.NumberedList : BlockType.BulletList,
                            content: convertInlineElementsToContentModels(child, keepFormat),
                            indent: indentLevel
                        }));
                        // Recurse into **nested lists** inside this <li>
                        Array.from(child.children).forEach(function (nested) {
                            if (nested.tagName === 'UL' || nested.tagName === 'OL') {
                                processNode(nested, indentLevel + 1);
                            }
                        });
                    }
                    if (child.tagName === 'UL' || child.tagName === 'OL') {
                        // Recurse into **nested lists** if any, inside this <ul>
                        processNode(child, indentLevel + 1);
                    }
                    isBlockProcessed = true;
                }
            }
            else if (tag.match(/^H[1-4]$/)) {
                var level = parseInt(tag.substring(1), 10);
                blocks.push(BlockFactory.createHeadingBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }, { level: level }));
                isBlockProcessed = true;
            }
            else if (tag === 'BLOCKQUOTE') {
                blocks.push(BlockFactory.createQuoteBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }));
                isBlockProcessed = true;
            }
            else if (tag === 'HR') {
                blocks.push(BlockFactory.createDividerBlock());
                isBlockProcessed = true;
            }
            else if (tag === 'IMG') {
                var sanitizedHtml = sanitizeHelper(element.outerHTML, true);
                var temp = document.createElement('div');
                temp.innerHTML = sanitizedHtml;
                var img = temp.firstChild;
                if (img) {
                    blocks.push(BlockFactory.createImageBlock({}, {
                        src: img.src,
                        altText: img.alt
                    }));
                }
                isBlockProcessed = true;
            }
            else if (tag === 'PRE' && element.querySelector('code')) {
                blocks.push(BlockFactory.createCodeBlock({ content: [BlockFactory.createTextContent({ content: element.textContent })] }));
                isBlockProcessed = true;
            }
            else if ((tag === 'P') && !hasBlockElements(element)) {
                blocks.push(BlockFactory.createParagraphBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }));
                isBlockProcessed = true;
            }
            else if (tag === 'TABLE') {
                var model = parseHtmlTableToBlock(element);
                if (model) {
                    blocks.push(model);
                }
                isBlockProcessed = true;
            }
            if ((tag === 'DIV') && !hasBlockElements(element)) {
                blocks.push(BlockFactory.createParagraphBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }));
                isBlockProcessed = true;
            }
        }
        else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            blocks.push(BlockFactory.createParagraphBlock({
                content: [BlockFactory.createTextContent({ content: node.textContent.trim() })]
            }));
            isBlockProcessed = true;
        }
        return isBlockProcessed;
    };
    var traverseDOM = function (element) {
        var isBlockProcessed = processNode(element);
        if (!isBlockProcessed && element.nodeType === Node.ELEMENT_NODE) {
            var tagName = element.tagName;
            // Skip traversing children for elements that are processed as whole units
            var ignorableNestedChildren = ['PRE', 'HR', 'IMG', 'TABLE'].indexOf(tagName) !== -1;
            if (!ignorableNestedChildren) {
                Array.from(element.childNodes).forEach(traverseDOM);
            }
        }
    };
    Array.from(container.childNodes).forEach(function (node) {
        traverseDOM(node);
    });
    return blocks;
}
export function convertInlineElementsToContentModels(element, keepFormat) {
    var content = [];
    if (!keepFormat) {
        if (element.textContent !== '') {
            return [BlockFactory.createTextContent({ content: element.textContent })];
        }
    }
    var styleStack = [{}];
    var linkProps;
    var processNode = function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
            var text = node.textContent;
            text = text.replace(/\n/g, '');
            if (text !== '') {
                content.push(createContentModel(text, styleStack[styleStack.length - 1], linkProps));
            }
            return;
        }
        var el = node;
        if (el.classList.contains('e-mention-chip')) {
            var chipModel = void 0;
            if (el.classList.contains('e-user-chip')) {
                var userId = el.getAttribute('data-user-id');
                chipModel = BlockFactory.createMentionContent({ content: el.textContent }, { userId: userId });
            }
            else {
                var labelId = el.getAttribute('data-label-id');
                chipModel = BlockFactory.createLabelContent({ content: el.textContent }, { labelId: labelId });
            }
            content.push(chipModel);
            return;
        }
        if (el.tagName === 'UL' || el.tagName === 'OL') {
            return;
        }
        if (el.tagName === 'A') {
            var prevLink = linkProps;
            linkProps = {
                url: el.getAttribute('href') || ''
            };
            processChildren(el);
            linkProps = prevLink;
            return;
        }
        // <br> → insert linebreak
        if (el.tagName === 'BR') {
            content.push(createContentModel('\n', styleStack[styleStack.length - 1], linkProps));
            return;
        }
        var newStyles = extractStylesFromElement(el, styleStack[styleStack.length - 1]);
        if (newStyles && Object.keys(newStyles).length > 0) {
            styleStack.push(newStyles);
            processChildren(el);
            styleStack.pop();
        }
        else {
            processChildren(el);
        }
    };
    var processChildren = function (parent) {
        Array.from(parent.childNodes).forEach(processNode);
    };
    var createContentModel = function (text, styles, link) {
        if (link) {
            return BlockFactory.createLinkContent({
                content: text
            }, {
                styles: __assign({}, styles),
                url: link.url
            });
        }
        return BlockFactory.createTextContent({ content: text }, { styles: __assign({}, styles) });
    };
    processChildren(element);
    return content;
}
export function extractStylesFromElement(element, styles) {
    if (styles === void 0) { styles = {}; }
    var newStyles = __assign({}, styles);
    var isBold = FormattingHelper.isBold(element);
    if (isBold) {
        newStyles.bold = isBold;
    }
    var isItalic = FormattingHelper.isItalic(element);
    if (isItalic) {
        newStyles.italic = isItalic;
    }
    var isUnderline = FormattingHelper.isUnderline(element);
    if (isUnderline) {
        newStyles.underline = isUnderline;
    }
    var isStrikethrough = FormattingHelper.isStrikethrough(element);
    if (isStrikethrough) {
        newStyles.strikethrough = isStrikethrough;
    }
    var isSuperscript = FormattingHelper.isSuperscript(element);
    if (isSuperscript) {
        newStyles.superscript = isSuperscript;
    }
    var isSubscript = FormattingHelper.isSubscript(element);
    if (isSubscript) {
        newStyles.subscript = isSubscript;
    }
    if (element.style.color) {
        newStyles.color = FormattingHelper.getFontColor(element);
    }
    if (element.style.backgroundColor) {
        newStyles.backgroundColor = FormattingHelper.getBackgroundColor(element);
    }
    var isInlineCode = FormattingHelper.isInlineCode(element);
    if (isInlineCode) {
        newStyles.inlineCode = isInlineCode;
    }
    var isUppercase = element.style.textTransform === 'uppercase';
    if (isUppercase) {
        newStyles.uppercase = isUppercase;
    }
    var isLowercase = element.style.textTransform === 'lowercase';
    if (isLowercase) {
        newStyles.lowercase = isLowercase;
    }
    var isLink = FormattingHelper.isLink(element);
    if (isLink) {
        newStyles.url = FormattingHelper.getLinkUrl(element);
    }
    return newStyles;
}
/**
 * Detects all active formats for a specific text node.
 * Traverses upward through DOM to find format-containing ancestors.
 *
 * @param {Text} node - The text node to analyze
 * @returns {Styles} - All detected formats on this node
 * @hidden
 */
export function detectFormatsForTextNode(node) {
    var merged = {};
    var currentElement = node.parentElement;
    while (currentElement) {
        // Stop at block boundary (element with id)
        if (currentElement.id) {
            break;
        }
        var newStyles = extractStylesFromElement(currentElement, merged);
        Object.assign(merged, newStyles);
        currentElement = currentElement.parentElement;
    }
    return merged;
}
export function parseHtmlTableToMatrix(root) {
    var table = (root.tagName === 'TABLE' ? root : root.querySelector('table'));
    if (!table) {
        return { matrix: [], hasHeader: false };
    }
    var thead = table.querySelector('thead');
    var tbody = table.querySelector('tbody');
    var hasHeader = !!thead && !!thead.rows && thead.rows.length > 0;
    var rows = [];
    var matrix = [];
    if (thead && thead.rows && thead.rows.length) {
        rows.push(thead.rows[0]);
    }
    if (tbody) {
        Array.from(tbody.querySelectorAll('tr')).forEach(function (tr) { return rows.push(tr); });
    }
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var tr = rows_1[_i];
        var cells = Array.from(tr.querySelectorAll('th,td'));
        // Ignore row-number column if present by class
        var filtered = cells.filter(function (c) { return !c.classList.contains('e-row-number'); });
        matrix.push(filtered);
    }
    // Normalize to rectangular grid by padding shorter rows
    var maxCols = Math.max.apply(Math, [0].concat(matrix.map(function (r) { return r.length; })));
    matrix.forEach(function (row) {
        while (row.length < maxCols) {
            row.push(document.createElement('td'));
        }
    });
    return { matrix: matrix, hasHeader: hasHeader };
}
export function parseHtmlTableToBlock(element) {
    var _a = parseHtmlTableToMatrix(element), matrix = _a.matrix, hasHeader = _a.hasHeader;
    if (!matrix.length) {
        return null;
    }
    var bodyStart = hasHeader ? 1 : 0;
    var colsCount = matrix[0].length;
    // Build columns with header text (plain for header)
    var columns = new Array(colsCount).fill(0).map(function (_, idx) { return ({
        id: "col_" + idx, width: '', headerText: hasHeader ? (matrix[0][idx].textContent).trim() : ''
    }); });
    // Build row models with blocks per cell using existing conversion
    var rows = [];
    for (var r = bodyStart; r < matrix.length; r++) {
        var cells = [];
        for (var c = 0; c < colsCount; c++) {
            var cellEl = matrix[r][c];
            var blocks = hasBlockElements(cellEl) ? convertHtmlElementToBlocks(cellEl, true) : [];
            // Fallback to plain text paragraph if no blocks detected
            var cellBlocks = blocks.length
                ? blocks
                : [BlockFactory.createParagraphBlock({ content: convertInlineElementsToContentModels(cellEl, true) })];
            cells.push({ columnId: columns[c].id, blocks: cellBlocks });
        }
        rows.push({ cells: cells });
    }
    var properties = {
        enableHeader: hasHeader,
        enableRowNumbers: true,
        columns: columns,
        rows: rows
    };
    return BlockFactory.createBlockFromPartial({ blockType: 'Table', properties: properties });
}
export function getBlockDataAsHTML(blocks, editorId) {
    if (!blocks || blocks.length === 0) {
        return '';
    }
    var htmlParts = [];
    var listStack = [];
    var currentIndent = -1;
    var closeListsToLevel = function (targetIndent) {
        while (listStack.length > 0 && listStack[parseInt((listStack.length - 1).toString(), 10)].indent >= targetIndent) {
            var finishedList = listStack.pop();
            var listHtml = "<" + finishedList.type + ">" + finishedList.items.map(function (item) {
                return item + '</li>';
            }).join('') + "</" + finishedList.type + ">";
            if (listStack.length > 0) {
                var parentList = listStack[parseInt((listStack.length - 1).toString(), 10)];
                var lastIdx = parentList.items.length - 1;
                parentList.items[parseInt(lastIdx.toString(), 10)] += listHtml;
            }
            else {
                htmlParts.push(listHtml);
            }
        }
    };
    for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
        var block = blocks_1[_i];
        if (!block) {
            continue;
        }
        var isList = ['bulletlist', 'numberedlist', 'checklist'].indexOf(block.blockType.toLowerCase()) !== -1;
        var listType = block.blockType.toLowerCase() === 'numberedlist' ? 'ol' : 'ul';
        var indent = block.indent || 0;
        if (isList) {
            // Close deeper lists when moving to a higher level (less indentation)
            if (listStack.length === 0 ||
                listStack[listStack.length - 1].type !== listType ||
                indent < currentIndent) {
                closeListsToLevel(indent);
            }
            // Start new list if:
            // 1. First list item
            // 2. Different list type
            // 3. Increased indentation
            if (listStack.length === 0 ||
                listStack[parseInt((listStack.length - 1).toString(), 10)].type !== listType ||
                indent > currentIndent) {
                listStack.push({
                    type: listType,
                    items: [],
                    indent: indent
                });
                currentIndent = indent;
            }
            var contentHtml = renderContentAsHTML(block.content);
            listStack[parseInt((listStack.length - 1).toString(), 10)].items.push("<li>" + contentHtml);
        }
        else {
            closeListsToLevel(0);
            currentIndent = -1;
            htmlParts.push(renderBlockAsHTML(block, editorId));
        }
    }
    closeListsToLevel(0);
    return htmlParts.join('');
}
export function renderContentAsHTML(content) {
    if (content === void 0) { content = []; }
    return content
        .map(function (item) {
        if (!item || !item.content) {
            return '';
        }
        var text = escapeHTML(item.content);
        var props = item.properties;
        var styles = (props && props.styles) ? props.styles : {};
        var keys = Object.keys(styles);
        if (keys.length > 0) {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var style = keys_1[_i];
                if (styles[style]) {
                    switch (style.toLowerCase()) {
                        case 'bold':
                            text = "<strong>" + text + "</strong>";
                            break;
                        case 'italic':
                            text = "<em>" + text + "</em>";
                            break;
                        case 'underline':
                            text = "<u>" + text + "</u>";
                            break;
                        case 'strikethrough':
                            text = "<s>" + text + "</s>";
                            break;
                        case 'superscript':
                            text = "<sup>" + text + "</sup>";
                            break;
                        case 'subscript':
                            text = "<sub>" + text + "</sub>";
                            break;
                        case 'uppercase':
                            text = "<span style=\"text-transform: uppercase;\">" + text + "</span>";
                            break;
                        case 'lowercase':
                            text = "<span style=\"text-transform: lowercase;\">" + text + "</span>";
                            break;
                        case 'color':
                            text = "<span style=\"color: " + styles.color + ";\">" + text + "</span>";
                            break;
                        case 'backgroundcolor':
                            text = "<span style=\"background-color: " + styles.backgroundColor + ";\">" + text + "</span>";
                            break;
                        case 'inlinecode':
                            text = "<code>" + text + "</code>";
                            break;
                    }
                }
            }
        }
        if (item.contentType === ContentType.Link && item.properties) {
            var props_1 = item.properties;
            var target = 'target="_blank"';
            text = "<a href=\"" + escapeHTML(props_1.url) + "\" " + target + ">" + text + "</a>";
        }
        return text;
    }).join('');
}
export function renderBlockAsHTML(block, editorId) {
    var contentHTML = renderContentAsHTML(block.content);
    switch (block.blockType.toLowerCase()) {
        case 'heading': {
            var level = block.properties.level;
            return renderElementWithWrapper("h" + level, contentHTML);
        }
        case 'paragraph':
            return renderElementWithWrapper('p', contentHTML);
        case 'quote': {
            var children = block.properties.children;
            var childrenHTML = children && children.map(function (child) { return renderBlockAsHTML(child); }).join('') || '';
            return renderElementWithWrapper('blockquote', childrenHTML);
        }
        case 'callout': {
            var children = block.properties.children;
            var childrenHTML = children && children.map(function (child) { return renderBlockAsHTML(child); }).join('') || '';
            return renderElementWithWrapper('div', childrenHTML, 'callout');
        }
        case 'divider':
            return '<hr />';
        case 'code':
            return "<pre><code>" + block.content[0].content + "</code></pre>";
        case 'image': {
            var props = block.properties;
            if (props && props.src === '') {
                return '';
            }
            return "<img src='" + props.src + "' alt='" + props.altText + "' />";
        }
        case 'collapsibleparagraph':
        case 'collapsibleheading': {
            var children = block.properties.children;
            var childrenHTML = children && children.map(function (child) { return renderBlockAsHTML(child); }).join('') || '';
            return renderElementWithWrapper('div', (contentHTML + ' ' + childrenHTML), 'collapsible');
        }
        case 'table': {
            var editorRoot = document.querySelector("#" + editorId);
            var tableBlockEl = editorRoot.querySelector("#" + block.id);
            focusAllCellsInTable(tableBlockEl);
            var payload = buildTableClipboardPayload(tableBlockEl, block);
            var matrixText = extractPlainTextMatrixFromPayload(payload, block);
            var html = htmlTableFromMatrix(matrixText, { hasHeader: payload.meta.enableHeader, hasRowNumbers: payload.meta.enableRowNumbers });
            removeFocusFromAllCells(tableBlockEl);
            return html;
        }
        default:
            return renderElementWithWrapper('div', contentHTML);
    }
}
export function renderElementWithWrapper(tagName, content, className) {
    var classAttr = className ? " class=\"" + className + "\"" : '';
    return "<" + tagName + classAttr + ">" + content + "</" + tagName + ">";
}
