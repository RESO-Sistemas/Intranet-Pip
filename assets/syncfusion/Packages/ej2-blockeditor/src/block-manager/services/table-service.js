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
import * as constants from '../../common/constant';
import { setCursorPosition, decoupleReference, generateUniqueId, getBlockContentElement, getBlockModelById, removeFocusFromAllCells, projectEqualPercentFits, applyEqualPercent, changeColWidthToPxUnits, getWidthMode, getColgroupChildren } from '../../common/utils/index';
import { createElement } from '@syncfusion/ej2-base';
import { BlockFactory } from './block-factory';
import { findClosestParent } from '../../common/utils/dom';
/**
 * Manages core table block actions
 *
 * @hidden
 */
var TableService = /** @class */ (function () {
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    function TableService(manager) {
        this.parent = manager;
    }
    /**
     * Creates and returns a fully rendered <tr> element for the given row model.
     *
     * @param {number} visualRowIndex - The visual row index in DOM (1-based, accounts for header if present)
     * @param {ITableBlockSettings} settings - Current table configuration (columns, enableHeader, enableRowNumbers, etc.)
     * @param {BlockModel} block - The parent table BlockModel
     * @param {TableRowModel} TableRowModel - The row data model to render
     * @returns {HTMLTableRowElement} The created <tr> element with all cells appended
     *
     * @hidden
     */
    TableService.prototype.createRow = function (visualRowIndex, settings, block, TableRowModel) {
        var _this = this;
        var rowEl = createElement('tr');
        var columns = settings.columns;
        rowEl.dataset.row = visualRowIndex.toString();
        // Row number cell
        if (settings.enableRowNumbers) {
            var rn = createElement('td', {
                className: 'e-row-number',
                attrs: { tabindex: '-1', 'aria-hidden': 'true', contenteditable: 'false' }
            });
            rn.textContent = (settings.enableHeader ? (visualRowIndex) : (visualRowIndex + 1)).toString();
            rowEl.appendChild(rn);
        }
        // Data cells
        columns.forEach(function (colModel, cIdx) {
            var td = createElement('td');
            td.dataset.row = visualRowIndex.toString();
            td.dataset.col = cIdx.toString();
            td.tabIndex = 0;
            td.setAttribute('role', 'gridcell');
            var cell = (TableRowModel.cells).find(function (c) { return c.columnId === colModel.id; });
            var cellBlockContainer = createElement('div', {
                id: cell.id,
                className: 'e-cell-blocks-container'
            });
            if (cell) {
                cell.blocks.forEach(function (innerBlock) {
                    var innerEl = _this.parent.blockRenderer.createBlockElement(innerBlock);
                    cellBlockContainer.appendChild(innerEl);
                });
            }
            td.appendChild(cellBlockContainer);
            rowEl.appendChild(td);
        });
        return rowEl;
    };
    /**
     * Inserts a new row at the specified position in both model and DOM.
     * Automatically updates row numbers and dataset indices.
     *
     * @param {ITableRowInsertOptions} options - arguments needed for row insertion in specified position.
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.addRowAt = function (options) {
        var blockId = options.blockId, rowIndex = options.rowIndex, rowModel = options.rowModel, isUndoRedoAction = options.isUndoRedoAction;
        var oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        var blockElement = this.parent.getBlockElementById(blockId);
        var table = blockElement.querySelector('table.e-table-element');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        this.removeCellFocus(table);
        var settings = block.properties;
        var tbody = table.tBodies[0];
        var newTableRowModel = rowModel || this.createRowModel(settings);
        settings.rows.splice(rowIndex, 0, newTableRowModel);
        // Render DOM row from model
        var newRowEl = this.createRow(rowIndex, settings, block, newTableRowModel);
        var rows = Array.from(tbody.rows);
        tbody.insertBefore(newRowEl, rows[rowIndex]);
        // Update dataset indices
        Array.from(tbody.rows).forEach(function (row, rIdx) {
            row.dataset.row = settings.enableHeader ? (rIdx + 1).toString() : rIdx.toString();
            Array.from(row.cells).forEach(function (cell) {
                if (cell.tagName === 'TD') {
                    cell.dataset.row = (rIdx + 1).toString();
                    cell.setAttribute('aria-rowindex', (rIdx + 1).toString());
                }
            });
        });
        this.addCellFocus(newRowEl.cells[0], true);
        this.updateRowNumbers(table, settings);
        var deCoupledRowModel = decoupleReference(newTableRowModel);
        this.parent.undoRedoAction.trackTableRowInsertionForUndoRedo({
            blockId: blockId, rowIndex: rowIndex, rowModel: deCoupledRowModel, isUndoRedoAction: isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    };
    /**
     * Inserts a new column at the specified position in both model and DOM.
     * Handles column model creation, width redistribution, and cell block containers.
     *
     * @param {ITableColumnInsertOptions} options - arguments needed for column insertion in specified position.
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.addColumnAt = function (options) {
        var _this = this;
        var blockId = options.blockId, colIndex = options.colIndex, columnModel = options.columnModel, columnCells = options.columnCells, isUndoRedoAction = options.isUndoRedoAction;
        var oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        var blockElement = this.parent.getBlockElementById(blockId);
        var table = blockElement.querySelector('table.e-table-element');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var tableBlockElement = findClosestParent(table, '.' + constants.TABLE_BLOCK_CLS);
        var targetColIndex = colIndex;
        var settings = block.properties;
        var colIndicator = tableBlockElement.querySelector('.e-col-insert-handle');
        var colLine = tableBlockElement.querySelector('.e-col-hover-line');
        var colResizeHandle = tableBlockElement.querySelector('.e-col-resize-handle');
        var mode = getWidthMode(table);
        var containerWidth = table.clientWidth;
        this.updateDataColCount(table, false);
        var newCount = parseInt(table.getAttribute('data-col-counter'), 10);
        table.setAttribute('data-col-counter', newCount.toString());
        colIndicator.style.display = 'none';
        colLine.style.display = 'none';
        colResizeHandle.style.display = 'none';
        // Insert TableColumnModel into settings.columns
        var newColModel = columnModel || this.createColumnModel(newCount);
        var newColCells = [];
        settings.columns.splice(targetColIndex, 0, newColModel);
        // Insert a new cell into each row model at the same index, populate blocks if provided
        (settings.rows).forEach(function (row, rIdx) {
            var newCell = columnModel ? columnCells[rIdx] : _this.createTableCell(newColModel.id);
            row.cells.splice(targetColIndex, 0, newCell);
            newColCells.push(decoupleReference(newCell));
        });
        // Update colgroup visuals
        var colgroup = table.querySelector('colgroup');
        var newColEl = createElement('col');
        colgroup.insertBefore(newColEl, colgroup.children[(settings.enableRowNumbers ? targetColIndex + 1 : targetColIndex)]);
        if (mode === 'percent') {
            // Decide if we can keep equal percent after insertion
            var n = settings.columns.length;
            var canStayPercent = projectEqualPercentFits(containerWidth, n, constants.TABLE_NEW_COL_WIDTH);
            if (canStayPercent) {
                // Equal % distribution
                applyEqualPercent(table, settings);
            }
            else {
                // Switch to px mode: keep existing px widths and give new column 120px
                changeColWidthToPxUnits(table, settings, { index: targetColIndex, width: constants.TABLE_NEW_COL_WIDTH });
            }
        }
        else {
            // Already in px mode: keep existing px widths, assign 120px to new col
            var dataCols = getColgroupChildren(table);
            dataCols[targetColIndex].style.width = constants.TABLE_NEW_COL_WIDTH + "px";
        }
        // Update rows DOM
        var rowsEl = Array.from(table.rows);
        rowsEl.forEach(function (rowEl, rIdx) {
            var isHeader = rowEl.parentElement.tagName === 'THEAD';
            var newCellEl = createElement(isHeader ? 'th' : 'td');
            newCellEl.dataset.row = isHeader ? '0' : (rIdx).toString();
            newCellEl.dataset.col = targetColIndex.toString();
            newCellEl.tabIndex = 0;
            if (isHeader) {
                newCellEl.textContent = newColModel.headerText;
                newCellEl.setAttribute('role', 'columnheader');
                newCellEl.setAttribute('contenteditable', 'true');
            }
            else {
                newCellEl.setAttribute('role', 'gridcell');
                var cellBlockContainer = createElement('div', {
                    id: (settings.rows[rIdx - (settings.enableHeader ? 1 : 0)].cells[targetColIndex]).id,
                    className: constants.TABLE_CELL_BLK_CONTAINER
                });
                var innerBlock = (settings.rows[rIdx - (settings.enableHeader ? 1 : 0)]
                    .cells[targetColIndex]).blocks[0];
                if (innerBlock) {
                    var innerEl = _this.parent.blockRenderer.createBlockElement(innerBlock);
                    cellBlockContainer.appendChild(innerEl);
                }
                newCellEl.appendChild(cellBlockContainer);
            }
            rowEl.insertBefore(newCellEl, rowEl.cells[(settings.enableRowNumbers ? targetColIndex + 1 : targetColIndex)]);
            // Shift col data attributes for cells to the right
            for (var i = targetColIndex + 1; i < rowEl.cells.length; i++) {
                var cell = rowEl.cells[(settings.enableRowNumbers ? i + 1 : i)];
                if (cell && cell.dataset.col) {
                    cell.dataset.col = i.toString();
                }
            }
        });
        this.assertColDataset(table);
        // Focus first cell of the newly added column in the first body row
        var firstBodyRow = table.tBodies[0].rows[0];
        if (firstBodyRow) {
            var domCol = settings.enableRowNumbers ? targetColIndex + 1 : targetColIndex;
            var focusCell = firstBodyRow.cells[domCol];
            if (focusCell) {
                this.removeCellFocus(table);
                this.addCellFocus(focusCell, true);
            }
        }
        var deCoupledColModel = decoupleReference(newColModel);
        this.parent.undoRedoAction.trackTableColumnInsertionForUndoRedo({
            blockId: blockId, colIndex: targetColIndex, columnModel: deCoupledColModel, columnCells: newColCells, isUndoRedoAction: isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    };
    /**
     * Deletes a row from the table at the given DOM/visual row index.
     * Updates model, DOM, row numbers, and dataset attributes.
     *
     * @param {ITableRowDeletionOptions} options - arguments needed for row deletion in specified index.
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.deleteRowAt = function (options) {
        var blockId = options.blockId, modelIndex = options.modelIndex, isUndoRedoAction = options.isUndoRedoAction;
        var oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        var blockElement = this.parent.getBlockElementById(blockId);
        var table = blockElement.querySelector('table');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var props = block.properties;
        var tbody = table.tBodies[0];
        if (modelIndex < 0 || modelIndex >= props.rows.length) {
            return;
        }
        var rowModel = props.rows[modelIndex];
        props.rows.splice(modelIndex, 1);
        var rowEl = tbody.rows[modelIndex];
        var previousRowEle = rowEl.previousElementSibling;
        this.removeCellFocus(table);
        if (rowEl) {
            rowEl.remove();
        }
        Array.from(tbody.rows).forEach(function (row, rIdx) {
            row.dataset.row = props.enableHeader ? (rIdx + 1).toString() : rIdx.toString();
            Array.from(row.cells).forEach(function (cell) {
                if (cell.tagName === 'TD') {
                    var vis = props.enableHeader ? rIdx + 1 : rIdx;
                    cell.dataset.row = vis.toString();
                    cell.setAttribute('aria-rowindex', (rIdx + 1).toString());
                }
            });
        });
        if (tbody.rows.length > 0) {
            this.addCellFocus(tbody.rows[modelIndex - (modelIndex > 0 ? 1 : 0)].cells[0], true);
        }
        else {
            if (props.enableHeader) {
                var headerRow = table.querySelector('thead tr');
                var firstHeaderCell = headerRow.cells[props.enableRowNumbers ? 1 : 0];
                this.addCellFocus(firstHeaderCell, true);
            }
            else {
                var nextBlock = blockElement.nextElementSibling;
                var previousBlock = blockElement.previousElementSibling;
                this.parent.setFocusToBlock(nextBlock || previousBlock);
            }
        }
        this.updateRowNumbers(table, props);
        var deCoupledRowModel = decoupleReference(rowModel);
        this.parent.undoRedoAction.trackTableRowDeletionForUndoRedo({
            blockId: blockId, rowIndex: modelIndex, rowModel: deCoupledRowModel, isUndoRedoAction: isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    };
    /**
     * Deletes a column from the table at the given data column index.
     * Updates model, colgroup, DOM cells, and dataset attributes.
     *
     * @param {HTMLTableElement} options - The table element
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.deleteColumnAt = function (options) {
        var blockId = options.blockId, colIndex = options.colIndex, isUndoRedoAction = options.isUndoRedoAction;
        var oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        var blockElement = this.parent.getBlockElementById(blockId);
        var table = blockElement.querySelector('table');
        var tbody = table.tBodies[0];
        var rowElToUpdateCellFocus = tbody.rows[0];
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var props = block.properties;
        var colModel = props.columns[colIndex];
        var deletedColCells = [];
        var mode = getWidthMode(table);
        // Model
        props.columns.splice(colIndex, 1);
        props.rows.forEach(function (r) {
            if (r.cells[colIndex]) {
                deletedColCells.push(decoupleReference(r.cells[colIndex]));
                r.cells.splice(colIndex, 1);
            }
        });
        //DOM
        this.removeCellFocus(table);
        var colgroup = table.querySelector('colgroup');
        var colChildren = Array.from(colgroup.children).filter(function (col) { return !col.classList.contains('e-col-row-number'); });
        if (colChildren[colIndex]) {
            colgroup.removeChild(colChildren[colIndex]);
        }
        if (mode === 'percent') {
            // Stay in percent: redistribute equally after deletion
            applyEqualPercent(table, props);
        }
        else {
            changeColWidthToPxUnits(table, props);
        }
        Array.from(table.rows).forEach(function (row) {
            var cells = Array.from(row.cells).filter(function (cell) { return !cell.classList.contains('e-row-number'); });
            var indexToDelete = Array.from(row.cells).indexOf(cells[colIndex]);
            if (indexToDelete >= 0) {
                row.deleteCell(indexToDelete);
            }
            // Shift col data attributes for cells to the right
            for (var i = colIndex; i < row.cells.length; i++) {
                var cell = row.cells[(props.enableRowNumbers ? i + 1 : i)];
                if (cell && cell.dataset.col) {
                    cell.dataset.col = i.toString();
                }
            }
        });
        this.assertColDataset(table);
        var uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
        if (uiManager) {
            uiManager.hideAllPinnedColBars(); // Removes all .e-col-action-handle.e-pinned
            uiManager.removeRowColSelection(table);
        }
        this.addCellFocus(rowElToUpdateCellFocus.cells[colIndex], true);
        this.updateDataColCount(table, true);
        var deCoupledColModel = decoupleReference(colModel);
        this.parent.undoRedoAction.trackTableColumnDeletionForUndoRedo({
            blockId: blockId, colIndex: colIndex, columnModel: deCoupledColModel, columnCells: deletedColCells, isUndoRedoAction: isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    };
    TableService.prototype.assertColDataset = function (table) {
        Array.from(table.rows).forEach(function (row) {
            var dataCells = Array.from(row.cells).filter(function (cell) { return !cell.classList.contains('e-row-number'); });
            dataCells.forEach(function (cell, dataColIdx) {
                cell.dataset.col = dataColIdx.toString();
            });
        });
    };
    /**
     * Clears the content of specified table cells (model + DOM).
     *
     * @param {HTMLTableElement} table - The table element
     * @param {HTMLTableCellElement[]} domCells - Collection of table cell elements to clear contents
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.clearCellContents = function (table, domCells) {
        var _this = this;
        var blockId = table.getAttribute('data-block-id');
        var oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var props = block.properties;
        var payloadCells = Array.from(domCells).map(function (cell) {
            if (!cell || cell.classList.contains('e-row-number')) {
                return { dataRow: -1, dataCol: -1, prevBlocks: [] };
            }
            var domRow = parseInt(cell.dataset.row, 10);
            var domCol = parseInt(cell.dataset.col, 10);
            var dataRow = props.enableHeader ? domRow - 1 : domRow;
            var dataCol = domCol;
            // Header
            if (domRow === 0 && props.enableHeader && cell.tagName === 'TH') {
                var prevHeaderText = props.columns[dataCol].headerText;
                return { dataRow: -1, dataCol: dataCol, prevBlocks: [], prevHeaderText: prevHeaderText, isHeader: true };
            }
            // Body
            var prevBlocks = props.rows[dataRow].cells[dataCol].blocks.map(function (b) { return (__assign({}, b)); });
            return { dataRow: dataRow, dataCol: dataCol, prevBlocks: prevBlocks };
        });
        payloadCells.forEach(function (cell) { return _this.applyCellChange(table, cell, 'clear'); });
        this.parent.undoRedoAction.trackTableCellsClearForUndoRedo({ blockId: blockId, cells: payloadCells });
        this.triggerBlockUpdate(block, oldBlock);
    };
    TableService.prototype.applyCellChange = function (table, cell, mode) {
        if (cell.isHeader) {
            var headerText = mode === 'restore' ? (cell.prevHeaderText) : '';
            this.setHeaderText(table, cell.dataCol, headerText);
        }
        else {
            var blocks = mode === 'restore' ? (cell.prevBlocks) : [BlockFactory.createParagraphBlock()];
            this.setCellBlocks(table, cell.dataRow, cell.dataCol, blocks);
        }
    };
    /**
     * Replaces the blocks inside a specific table cell with the provided blocks.
     * Updates both the data model and the DOM cell content.
     *
     * @param {HTMLTableElement} table - The table element
     * @param {number} dataRowIndex - The data row index in the model (0-based, excludes header)
     * @param {number} dataColIndex - The data column index in the model (0-based, excludes row-number column)
     * @param {BlockModel[]} blocks - Array of blocks to set as cell content
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.setCellBlocks = function (table, dataRowIndex, dataColIndex, blocks) {
        var _this = this;
        var blockId = table.getAttribute('data-block-id');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var props = block.properties;
        if (!props.rows[dataRowIndex] || !props.rows[dataRowIndex].cells[dataColIndex]) {
            return;
        }
        var cell = props.rows[dataRowIndex].cells[dataColIndex];
        cell.blocks = blocks && blocks.length
            ? BlockFactory.populateBlockProperties(blocks, cell.id)
            : [BlockFactory.createParagraphBlock({ parentId: cell.id })];
        var domColIndex = (props.enableRowNumbers ? dataColIndex + 1 : dataColIndex);
        var td = table.tBodies[0].rows[dataRowIndex].cells[domColIndex];
        if (!td) {
            return;
        }
        var container = td.querySelector('.' + constants.TABLE_CELL_BLK_CONTAINER);
        if (container) {
            container.innerHTML = '';
        }
        cell.blocks.forEach(function (innerBlock) {
            var innerEl = _this.parent.blockRenderer.createBlockElement(innerBlock);
            container.appendChild(innerEl);
        });
    };
    /**
     * Sets the header content with the provided value
     * Updates both the data model and the DOM cell content.
     *
     * @param {HTMLTableElement} table - The table element
     * @param {number} dataColIndex - The data column index in the model (0-based, excludes row-number column)
     * @param {string} text - Value to set
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.setHeaderText = function (table, dataColIndex, text) {
        var blockId = table.getAttribute('data-block-id');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var props = block.properties;
        if (!props.columns[dataColIndex]) {
            return;
        }
        // Model
        props.columns[dataColIndex].headerText = text;
        // DOM
        var th = table.querySelector("th[data-col=\"" + dataColIndex + "\"]");
        th.textContent = text;
    };
    /**
     * Applies visual focus to a table cell and optionally focuses its inner editable block.
     *
     * @param {HTMLElement} cell - The <td> or <th> element to focus
     * @param {boolean} focusInnerBlock - If true, places caret inside the last block of the cell
     * @param {boolean} cursorAtStart - If true and focusing inner block, places cursor at start instead of end
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.addCellFocus = function (cell, focusInnerBlock, cursorAtStart) {
        if (cell.classList.contains('e-row-number')) {
            // Find the next data cell in the same row
            var row = cell.closest('tr');
            if (row) {
                var next = Array.from(row.cells).find(function (cell) { return !cell.classList.contains('e-row-number'); });
                if (next) {
                    return this.addCellFocus(next, true);
                }
            }
            return;
        }
        cell.classList.add(constants.TABLE_CELL_FOCUS);
        if (focusInnerBlock) {
            var tag = cell.tagName.toLowerCase();
            if (tag === 'td') {
                this.shiftFocusToBlockInCell(cell, cursorAtStart);
                return;
            }
            if (tag === 'th') {
                var pos = cursorAtStart ? 0 : (cell.textContent).length;
                this.parent.setFocusToBlock((cell.closest('.' + constants.TABLE_BLOCK_CLS)));
                setCursorPosition(cell, pos);
            }
        }
    };
    /**
     * Removes the focus highlight from all cells in the given table.
     *
     * @param {Element} table - The table element or any element containing the table
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.removeCellFocus = function (table) {
        removeFocusFromAllCells(table);
    };
    /**
     * Triggers the block update event.
     *
     * @param {BlockModel} block - the block with updated changes.
     * @param {BlockModel} oldBlock - old block
     * @returns {void}
     *
     * @hidden
     */
    TableService.prototype.triggerBlockUpdate = function (block, oldBlock) {
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: block,
                prevBlock: oldBlock
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    TableService.prototype.shiftFocusToBlockInCell = function (cell, cursorAtStart) {
        var innerBlockEl = cell.querySelector('.e-block:last-child');
        if (innerBlockEl) {
            var contentEl = getBlockContentElement(innerBlockEl);
            this.parent.setFocusToBlock(innerBlockEl);
            setCursorPosition(contentEl, cursorAtStart ? 0 : contentEl.textContent.length);
        }
    };
    TableService.prototype.setColumnWidth = function (colgroup, isAdd) {
        var colChildren = Array.from(colgroup.children).filter(function (col) { return !col.classList.contains('e-col-row-number'); });
        var totalCols = colChildren.length + (isAdd ? 1 : 0);
        var newWidth = 100 / totalCols + '%';
        colChildren.forEach(function (col) {
            col.style.width = newWidth;
        });
        return newWidth;
    };
    TableService.prototype.createRowModel = function (settings) {
        var _this = this;
        var cells = settings.columns.map(function (column) { return _this.createTableCell(column.id); });
        return { id: generateUniqueId('row_'), cells: cells };
    };
    TableService.prototype.createColumnModel = function (newCount) {
        var newColId = generateUniqueId('col_');
        return { id: newColId, type: 'Text', headerText: "Column " + newCount };
    };
    TableService.prototype.updateDataColCount = function (table, isDeletion) {
        var currentCount = parseInt(table.getAttribute('data-col-counter'), 10);
        var newCount = currentCount + (isDeletion ? -1 : 1);
        table.setAttribute('data-col-counter', newCount.toString());
    };
    TableService.prototype.updateRowNumbers = function (table, settings) {
        if (!settings.enableRowNumbers) {
            return;
        }
        var tbody = table.tBodies[0];
        // Body rows: 1..n (independent of enableHeader)
        Array.from(tbody.rows).forEach(function (tr, i) {
            var rnTd = tr.querySelector('td.e-row-number');
            if (rnTd) {
                rnTd.textContent = String(i + 1);
            }
        });
    };
    TableService.prototype.createTableCell = function (columnId) {
        var cellId = generateUniqueId('cell_');
        return {
            id: cellId,
            columnId: columnId,
            blocks: [BlockFactory.createParagraphBlock({ parentId: cellId })]
        };
    };
    return TableService;
}());
export { TableService };
