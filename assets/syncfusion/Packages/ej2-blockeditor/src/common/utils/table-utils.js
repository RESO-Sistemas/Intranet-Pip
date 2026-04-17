import { getBlockModelById } from './block';
import * as constants from '../../common/constant';
export function toDomCol(dataCol, rowNumberEnabled) {
    return rowNumberEnabled ? dataCol + 1 : dataCol;
}
export function toDomRow(dataRow, headerEnabled) {
    return headerEnabled ? dataRow + 1 : dataRow;
}
export function toModelRow(domRow, headerEnabled) {
    return headerEnabled ? domRow - 1 : domRow;
}
export function getDataCell(tableElement, row, col) {
    return tableElement.querySelector("td[data-row=\"" + row + "\"][data-col=\"" + col + "\"]")
        || tableElement.querySelector("th[data-row=\"" + row + "\"][data-col=\"" + col + "\"]");
}
export function getHeaderCell(tableElement, col) {
    var thead = tableElement.tHead;
    if (!thead) {
        return null;
    }
    // Try both dataset and index fallback
    var cell = thead.querySelector("th[data-row=\"0\"][data-col=\"" + col + "\"]");
    if (!cell) {
        cell = thead.querySelectorAll('th')[col];
    }
    return cell || null;
}
export function doesHtmlHasTable(html, text) {
    var htmlHasTable = !!(html && /<table[\s\S]*?>[\s\S]*?<\/table>/i.test(html));
    var textLooksTabular = !!(text && (text.indexOf('\t') !== -1 || /\r?\n.*\t/.test(text)));
    return htmlHasTable || textLooksTabular;
}
export function getTableElements(blockId, rootEditorElement, blocks) {
    var blockEl = rootEditorElement.querySelector("#" + blockId);
    if (!blockEl) {
        return null;
    }
    var table = blockEl.querySelector('table.e-table-element');
    if (!table) {
        return null;
    }
    var block = getBlockModelById(blockId, blocks);
    var props = (block && block.properties) || {};
    return { table: table, props: props };
}
/**
 * Focuses all editable cells in the table.
 * Useful for "Select All" (Ctrl+A) inside a table.
 *
 * @param {HTMLElement} tableEl - The <table> element inside the table block
 * @returns {void}
 *
 * @hidden
 */
export function focusAllCellsInTable(tableEl) {
    var cells = tableEl.querySelectorAll('td[role="gridcell"]');
    cells.forEach(function (cell) {
        if (cell.classList.contains('e-row-number')) {
            return;
        }
        cell.classList.add(constants.TABLE_CELL_FOCUS);
    });
}
/**
 * Removes the focus highlight from all cells in the given table.
 *
 * @param {Element} table - The table element
 * @returns {void}
 *
 * @hidden
 */
export function removeFocusFromAllCells(table) {
    var focusedCells = table.querySelectorAll('.' + constants.TABLE_CELL_FOCUS);
    if (focusedCells) {
        focusedCells.forEach(function (cell) {
            cell.classList.remove(constants.TABLE_CELL_FOCUS);
            cell.scrollLeft = 0;
        });
    }
}
/**
 * Returns the current width mode ('px' | 'percent')
 *
 * @param {HTMLTableElement} table - The table element
 * @returns {string} - width mode ('px' | 'percent')
 *
 * @hidden
 */
export function getWidthMode(table) {
    return table.getAttribute('data-col-width-mode') === 'px' ? 'px' : 'percent';
}
/**
 * Sets the table width mode ('px' | 'percent')
 *
 * @param {HTMLTableElement} table - The table element
 * @param {string} mode - mode ('px' | 'percent')
 * @returns {void}
 *
 * @hidden
 */
export function setTableWidthMode(table, mode) {
    table.setAttribute('data-col-width-mode', mode);
}
/**
 * Performs equal percentage distribution for all cols
 *
 * @param {HTMLTableElement} table - The table element
 * @param {ITableBlockSettings} props - The table settings
 * @returns {void}
 *
 * @hidden
 */
export function applyEqualPercent(table, props) {
    var colgroup = table.querySelector('colgroup');
    var n = props.columns.length;
    var pct = 100 / Math.max(1, n);
    for (var i = 0; i < n; i++) {
        var domIdx = props.enableRowNumbers ? i + 1 : i;
        var colEl = colgroup.children[domIdx];
        colEl.style.width = pct.toFixed(2) + "%";
        props.columns[i].width = pct.toFixed(2) + "%";
    }
    setTableWidthMode(table, 'percent');
}
/**
 * Checks whether equal percent fits within the container
 *
 * @param {number} containerWidthPx - The table container width
 * @param {number} nCols - Total number of cols
 * @param {number} minColPx - The minimum value of a column
 * @returns {boolean} - The boolean value
 *
 * @hidden
 */
export function projectEqualPercentFits(containerWidthPx, nCols, minColPx) {
    var pct = 100 / Math.max(1, nCols);
    var projectedPx = containerWidthPx * (pct / 100);
    return projectedPx >= minColPx;
}
/**
 * Changes width of all columns from percent to pixel units
 *
 * @param {HTMLTableElement} table - The table element
 * @param {ITableBlockSettings} props - The table settings
 * @param {object} defaultPxForNew - Default values of new col
 * @returns {void}
 *
 * @hidden
 */
export function changeColWidthToPxUnits(table, props, defaultPxForNew) {
    var dataCols = getColgroupChildren(table);
    for (var i = 0; i < dataCols.length; i++) {
        var w = dataCols[i].getBoundingClientRect().width;
        if (defaultPxForNew && defaultPxForNew.index === i) {
            w = defaultPxForNew.width;
        }
        dataCols[i].style.width = w.toFixed(0) + "px";
        props.columns[i].width = w.toFixed(0) + "px";
    }
    setTableWidthMode(table, 'px');
}
export function getColgroupChildren(table) {
    var colgroup = table.querySelector('colgroup');
    var dataCols = Array.from(colgroup.children)
        .filter(function (c) { return !c.classList.contains('e-col-row-number'); });
    return dataCols;
}
export function getSelectedCells(tableBlock) {
    var table = tableBlock.querySelector('table');
    // 1. Whole row selection
    if (table.querySelector('tr.e-row-selected')) {
        return table.querySelectorAll('tr.e-row-selected td:not(.e-row-number)');
    }
    // 2. Whole column selection
    if (table.querySelector('td.e-col-selected')) {
        return table.querySelectorAll('td.e-col-selected, th.e-col-selected');
    }
    // 3. Default: individually focused cells
    return table.querySelectorAll("td." + constants.TABLE_CELL_FOCUS + ", th." + constants.TABLE_CELL_FOCUS);
}
// Returns true if there is any visual selection in the table block
export function hasActiveTableSelection(tableBlockElement) {
    if (!tableBlockElement) {
        return false;
    }
    var selectedCells = getSelectedCells(tableBlockElement);
    // Rectangle selection
    if (selectedCells && selectedCells.length > 1) {
        return true;
    }
    // Row selection
    if (tableBlockElement.querySelector('tbody tr.e-row-selected')) {
        return true;
    }
    // Column selection
    if (tableBlockElement.querySelector('td.e-col-selected, th.e-col-selected')) {
        return true;
    }
    return false;
}
