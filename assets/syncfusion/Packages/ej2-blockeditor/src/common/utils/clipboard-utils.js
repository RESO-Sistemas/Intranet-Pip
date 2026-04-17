import { BlockType } from '../../models/enums';
import { BlockFactory } from '../../block-manager/services/block-factory';
import * as constants from '../../common/constant';
import { toDomCol, toModelRow } from './table-utils';
/**
 * Generates plain text representation of blocks for external clipboard
 *
 * @param {BlockModel[]} blocks - Block models to convert to plain text
 * @returns {string} Plain text representation of blocks
 */
export function generatePlainTextForExternalClipboard(blocks) {
    var textParts = [];
    blocks.forEach(function (block) {
        if (block.blockType === BlockType.BulletList) {
            textParts.push("\u2022 " + getBlockText(block) + "\n");
        }
        else if (block.blockType === BlockType.NumberedList) {
            var blockElement = document.getElementById(block.id);
            var listItem = blockElement.querySelector('li');
            var computedStyle = window.getComputedStyle(listItem);
            var marker = computedStyle.getPropertyValue('list-style-type');
            textParts.push("" + marker + getBlockText(block) + "\n");
        }
        else if (block.blockType === BlockType.Divider) {
            textParts.push('---\n');
        }
        else {
            textParts.push(getBlockText(block) + "\n");
        }
    });
    return textParts.join('');
}
/**
 * Creates block model from plain clipboard text
 *
 * @param {string} text - Text from clipboard
 * @returns {BlockModel[]} Array of block models
 */
export function createBlocksFromPlainText(text) {
    var lines = text.split(/\r?\n/);
    var blocks = [];
    lines.forEach(function (line) {
        if (line.trim() === '') {
            return;
        }
        var bulletMatch = line.match(/^[\s]*[•\-*]\s+(.*)/);
        if (bulletMatch) {
            blocks.push(BlockFactory.createBulletListBlock({
                content: [BlockFactory.createTextContent({ content: bulletMatch[1] })]
            }));
            return;
        }
        var numberedMatch = line.match(/^[\s]*(\d+)[.)]\s+(.*)/);
        if (numberedMatch) {
            blocks.push(BlockFactory.createNumberedListBlock({
                content: [BlockFactory.createTextContent({ content: numberedMatch[2] })]
            }));
            return;
        }
        blocks.push(BlockFactory.createParagraphBlock({
            content: [BlockFactory.createTextContent({ content: line })]
        }));
    });
    return blocks;
}
/**
 * Gets text content from a block model
 *
 * @param {BlockModel} block - Block model to extract text from
 * @returns {string} Plain text content from block
 */
export function getBlockText(block) {
    if (!block.content || block.content.length === 0) {
        return '';
    }
    return block.content.map(function (content) { return content.content; }).join('');
}
/**
 * Checks if HTML content contains block-level elements
 *
 * @param {HTMLElement} container - Container with HTML content
 * @returns {boolean} True if contains block-level elements
 */
export function isBlockLevelContent(container) {
    var blockTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'HR', 'TABLE', 'IMG'];
    return Array.from(container.querySelectorAll('*')).some(function (el) { return blockTags.indexOf(el.tagName) !== -1; });
}
/**
 * Unwraps container element if needed
 *
 * @param {HTMLElement} container - Container to potentially unwrap
 * @returns {HTMLElement} Unwrapped container or original
 */
export function unWrapContainer(container) {
    var firstChild = container.firstElementChild;
    if (container.childElementCount === 1
        && isBlockLevelContent(firstChild)
        && (firstChild.tagName === 'SPAN' || firstChild.tagName === 'DIV')) {
        var newContainer_1 = document.createElement('div');
        Array.from(firstChild.childNodes).forEach(function (child) { return newContainer_1.appendChild(child.cloneNode(true)); });
        return newContainer_1;
    }
    return container;
}
export function writeTableClipboardPayload(dt, payload, html, text) {
    dt.setData('text/blockeditor-table', JSON.stringify(payload));
    dt.setData('text/html', html);
    dt.setData('text/plain', text);
}
export function readTableClipboardPayload(dt) {
    try {
        var data = dt.getData('text/blockeditor-table');
        if (!data) {
            return null;
        }
        var parsed = JSON.parse(data);
        if (parsed && parsed.type === 'table') {
            return parsed;
        }
        return null;
    }
    catch (_a) {
        return null;
    }
}
export function buildTableClipboardPayload(tableBlockEl, blockModel) {
    if (!tableBlockEl || !blockModel) {
        return null;
    }
    var tableEl = tableBlockEl.querySelector('table');
    var props = blockModel.properties;
    var focusedCells = [];
    var selectedRows = tableEl.querySelectorAll('tr.e-row-selected');
    var selectedCols = tableBlockEl.querySelectorAll('td.e-col-selected, th.e-col-selected');
    var targetEle;
    var selector;
    if (selectedRows.length > 0) {
        // Multi-row: collect cells from ALL selected rows
        var allFocusedCells_1 = [];
        selectedRows.forEach(function (row) {
            allFocusedCells_1.push.apply(allFocusedCells_1, Array.from(row.querySelectorAll('td:not(.e-row-number)')));
        });
        targetEle = tableEl; // Use whole table as base
        selector = 'td:not(.e-row-number)';
        focusedCells = allFocusedCells_1;
    }
    else if (selectedCols.length > 0) {
        // skips header row for column copy
        focusedCells = [];
        // Loop only over body rows (tBodies[0])
        var bodyRows = tableEl.tBodies[0].rows;
        for (var i = 0; i < bodyRows.length; i++) {
            var row = bodyRows[parseInt(i.toString(), 10)];
            var colIndex = parseInt(selectedCols[0].dataset.col || '0', 10);
            var domCol = toDomCol(colIndex, props.enableRowNumbers);
            var cell = row.cells[parseInt(domCol.toString(), 10)];
            if (cell && !cell.classList.contains('e-row-number')) {
                focusedCells.push(cell);
            }
        }
    }
    else {
        // Individual cell focus
        targetEle = tableEl;
        selector = "td." + constants.TABLE_CELL_FOCUS + ", th." + constants.TABLE_CELL_FOCUS;
        focusedCells = Array.from(targetEle.querySelectorAll(selector));
    }
    var dataPositions = focusedCells.map(function (td) { return ({
        r: toModelRow(parseInt(td.dataset.row, 10), props.enableHeader),
        c: parseInt(td.dataset.col, 10)
    }); });
    var minR = Math.min.apply(Math, dataPositions.map(function (p) { return p.r; }));
    var maxR = Math.max.apply(Math, dataPositions.map(function (p) { return p.r; }));
    var minC = Math.min.apply(Math, dataPositions.map(function (p) { return p.c; }));
    var maxC = Math.max.apply(Math, dataPositions.map(function (p) { return p.c; }));
    var height = maxR - minR + 1;
    var width = maxC - minC + 1;
    var cells = [];
    for (var r = 0; r < height; r++) {
        var rowCells = [];
        for (var c = 0; c < width; c++) {
            rowCells.push(props.rows[minR + r].cells[minC + c].blocks);
        }
        cells.push(rowCells);
    }
    return {
        type: 'table',
        mode: 'cells',
        cells: cells,
        meta: { rows: height, cols: width, enableHeader: !!props.enableHeader, enableRowNumbers: !!props.enableRowNumbers }
    };
}
export function extractPlainTextMatrixFromPayload(payload, blockModel) {
    var matrix = [];
    var p = (payload.mode === 'table' ? payload.table.props : blockModel.properties);
    if (p.enableHeader) {
        var headerRow = [];
        for (var i = 0; i < payload.meta.cols; i++) {
            var column = p.columns[i];
            var headerText = column.headerText;
            headerRow.push(headerText);
        }
        matrix.push(headerRow);
    }
    if (payload.mode === 'table' && payload.table && payload.table.props) {
        var colCount_1 = (p.columns).length;
        p.rows.forEach(function (row) {
            var cells = new Array(colCount_1).fill('');
            (row.cells).forEach(function (cell, idx) {
                var blocks = cell.blocks;
                var cellText = blocks.map(function (b) { return getBlockText(b); }).join(' ');
                cells[idx] = cellText;
            });
            matrix.push(cells);
        });
        return matrix;
    }
    // For non-table modes, approximate to rectangular text for fallback
    if (payload.cells && payload.cells.length) {
        payload.cells.forEach(function (rowCells) {
            var rowTexts = rowCells.map(function (cellBlocks) { return cellBlocks.map(function (b) { return getBlockText(b); }).join(' '); });
            matrix.push(rowTexts);
        });
    }
    return matrix;
}
export function createCellsPayloadFromExternal(html, text) {
    var matrix = [];
    if (html && /<table[\s\S]*?>[\s\S]*?<\/table>/i.test(html)) {
        var div = document.createElement('div');
        div.innerHTML = html;
        // For cell paste, always ignore headers
        var tbody = div.querySelector('table tbody');
        if (tbody) {
            var rows = Array.from(tbody.querySelectorAll('tr'));
            var tmp = [];
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var trow = rows_1[_i];
                var cells_1 = Array.from(trow.querySelectorAll('th,td'));
                var filtered = cells_1.filter(function (c) { return !c.classList.contains('e-row-number'); });
                if (filtered.length) {
                    tmp.push(filtered.map(function (c) { return (c.textContent).trim(); }));
                }
            }
            var maxCols_1 = Math.max.apply(Math, [0].concat(tmp.map(function (r) { return r.length; })));
            tmp.forEach(function (r) { while (r.length < maxCols_1) {
                r.push('');
            } });
            matrix = tmp;
        }
    }
    else if (text && (text.indexOf('\t') !== -1 || /\r?\n.*\t/.test(text))) {
        matrix = text.split(/\r?\n/).filter(function (l) { return l.length > 0; }).map(function (l) { return l.split('\t'); });
    }
    if (!matrix.length) {
        return null;
    }
    var cells = matrix.map(function (row) { return row.map(function (cell) {
        return [BlockFactory.createParagraphBlock({ content: [BlockFactory.createTextContent({ content: cell })] })];
    }); });
    return {
        type: 'table',
        mode: 'cells',
        meta: { rows: matrix.length, cols: matrix[0].length, enableHeader: false, enableRowNumbers: false },
        cells: cells
    };
}
export function tsvFromMatrix(matrix) {
    return matrix.map(function (row) { return row.map(function (c) { return c.replace(/\t/g, ' ').replace(/\r?\n/g, ' '); }).join('\t'); }).join('\n');
}
export function matrixFromTsv(text) {
    return text.split(/\r?\n/).filter(function (l) { return l.length > 0; }).map(function (l) { return l.split('\t'); });
}
export function htmlTableFromMatrix(matrix, options) {
    if (options === void 0) { options = {}; }
    var hasHeader = !!options.hasHeader;
    // const rn: boolean = !!options.hasRowNumbers;
    var rows = [];
    var bodyStart = hasHeader ? 1 : 0;
    if (hasHeader) {
        var hdrCells = matrix[0].map(function (text) { return "<th>" + escapeHtml(text) + "</th>"; });
        rows.push("<thead><tr>" + hdrCells.join('') + "</tr></thead>");
    }
    var bodyRows = [];
    for (var r = bodyStart; r < matrix.length; r++) {
        var tds = matrix[r].map(function (text) { return "<td>" + escapeHtml(text) + "</td>"; });
        bodyRows.push("<tr>" + tds.join('') + "</tr>");
    }
    rows.push("<tbody>" + bodyRows.join('') + "</tbody>");
    return "<table>" + rows.join('') + "</table>";
}
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
