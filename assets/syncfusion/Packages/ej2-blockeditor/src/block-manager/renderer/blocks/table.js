import { createElement, formatUnit } from '@syncfusion/ej2-base';
import { events } from '../../../common/constant';
import * as constants from '../../../common/constant';
import { decoupleReference, extractBlockTypeFromElement, getBlockModelById, getColgroupChildren, setTableWidthMode } from '../../../common/utils/index';
import { TableUIManager } from '../../plugins/table/ui-manager';
var TableRenderer = /** @class */ (function () {
    function TableRenderer(editor) {
        this.uiManagers = new Map();
        this.nonEditableElements = [
            'e-row-insert-handle',
            'e-col-insert-handle',
            'e-row-action-handle',
            'e-col-action-handle',
            'e-row-dot',
            'e-col-dot',
            'e-row-dot-hit',
            'e-col-dot-hit',
            'e-row-number'
        ];
        this.parent = editor;
        this.addEventListener();
    }
    TableRenderer.prototype.addEventListener = function () {
        this.parent.observer.on('input', this.handleHeaderInput, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    TableRenderer.prototype.removeEventListener = function () {
        this.parent.observer.off('input', this.handleHeaderInput);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Renders the table block element in the editor
     *
     * @param {BlockModel} block - The data model of the block, used to determine available actions and state.
     * @param {HTMLElement} blockElement - The root DOM element representing the table block.
     * @returns {HTMLElement} - The table container element
     * @hidden
     */
    TableRenderer.prototype.renderTable = function (block, blockElement) {
        var _this = this;
        blockElement.classList.add(constants.TABLE_BLOCK_CLS);
        var props = block.properties;
        var blockId = block.id;
        var tableContainer = createElement('div', {
            className: 'e-table-container e-scrollable-block'
        });
        var table = createElement('table', {
            className: 'e-table-element',
            attrs: {
                'data-block-id': blockId,
                'data-col-counter': "" + (props.columns).length,
                'role': 'grid',
                'style': "width: " + formatUnit(props.width)
            }
        });
        tableContainer.appendChild(table);
        // Create colgroup for column width management
        var colgroup = createElement('colgroup');
        table.appendChild(colgroup);
        if (props.enableRowNumbers) {
            var rnCol = createElement('col');
            rnCol.classList.add('e-col-row-number');
            rnCol.style.width = '44px'; // fixed width for row numbers
            colgroup.appendChild(rnCol);
        }
        var colCount = props.columns.length;
        var newWidth = (100 / colCount).toLocaleString() + '%';
        // Add columns with specified widths or default
        for (var i = 0; i < colCount; i++) {
            var col = createElement('col');
            col.style.width = props.columns[i].width ? formatUnit(props.columns[i].width) : newWidth;
            colgroup.appendChild(col);
        }
        if (props.enableHeader && colCount > 0) {
            var thead = createElement('thead');
            var headerRow_1 = createElement('tr');
            if (props.enableRowNumbers) {
                var thRN = createElement('th', {
                    className: 'e-row-number',
                    attrs: { 'aria-hidden': 'true', tabindex: '-1', contenteditable: 'false' }
                });
                headerRow_1.appendChild(thRN);
            }
            props.columns.forEach(function (c, cIdx) {
                var th = createElement('th');
                th.textContent = c.headerText;
                th.dataset.row = '0';
                th.dataset.col = cIdx.toString();
                th.tabIndex = 0;
                th.setAttribute('role', 'columnheader');
                th.setAttribute('title', c.headerText);
                th.setAttribute('contenteditable', 'true');
                headerRow_1.appendChild(th);
            });
            thead.appendChild(headerRow_1);
            table.appendChild(thead);
        }
        var tbody = createElement('tbody');
        props.rows.forEach(function (row, rIdx) {
            var visualIndex = props.enableHeader ? rIdx + 1 : rIdx;
            tbody.appendChild(_this.parent.tableService.createRow(visualIndex, props, block, row));
        });
        table.appendChild(tbody);
        if (!props.readOnly) {
            this.attachHoverUI(table, blockElement, block);
            this.parent.tableSelectionManager.attachTableEvents(table, blockElement);
        }
        else {
            this.updateTableReadyOnlyState(table, props.readOnly);
        }
        return tableContainer;
    };
    /**
     * Refreshes the column width and it's mode based on available container width
     *
     * @param {BlockModel} block - The data model of the block.
     * @returns {void}
     * @hidden
     */
    TableRenderer.prototype.refreshColWidths = function (block) {
        var blockElement = this.parent.getBlockElementById(block.id);
        var props = block.properties;
        var colCount = props.columns.length;
        var table = blockElement.querySelector('table');
        // === NEW: Decide width mode on initial render ===
        var usePxMode = false;
        var defaultWidthsPx = [];
        if (colCount > 0) {
            var containerWidth = table.clientWidth;
            // Check if equal % would violate min width
            var projectedPx = containerWidth / colCount;
            if (projectedPx < constants.TABLE_NEW_COL_WIDTH) {
                usePxMode = true;
            }
            // Pre-compute px widths if switching to px mode
            if (usePxMode) {
                var equalPx = Math.max(constants.TABLE_NEW_COL_WIDTH, Math.floor(containerWidth / colCount));
                defaultWidthsPx = Array(colCount).fill(equalPx);
                setTableWidthMode(table, 'px');
            }
        }
        var dataCols = getColgroupChildren(table);
        // Apply columns with correct width mode
        dataCols.forEach(function (colEl, i) {
            // Respect the user provided width if any
            if (props.columns[i].width) {
                return;
            }
            if (usePxMode) {
                var widthPx = defaultWidthsPx[i];
                colEl.style.width = widthPx + "px";
                props.columns[i].width = widthPx + "px"; // sync model
            }
            else {
                var pct = (100 / colCount).toFixed(2) + '%';
                colEl.style.width = pct;
                props.columns[i].width = pct;
            }
        });
    };
    /**
     * Attaches unified hover UI elements (dots, hit-zones, drag lines, action menu, and insert handles)
     * to the specified block when the mouse hovers over it
     *
     * @param {HTMLTableElement} table - The table element associated with the block (used for certain block types).
     * @param {HTMLElement} blockElement - The root DOM element representing the table block.
     * @param {BlockModel} blockModel - The data model of the block, used to determine available actions and state.
     * @returns {void}
     * @hidden
     */
    TableRenderer.prototype.attachHoverUI = function (table, blockElement, blockModel) {
        var uiManager = this.registerUIManager(blockElement.id);
        uiManager.init(table, blockElement, blockModel);
    };
    /**
     * Removes the created ui manager instance for the particular block
     *
     * @param {string} blockId - The id of the table block
     * @returns {void}
     * @hidden
     */
    TableRenderer.prototype.removeHoverUI = function (blockId) {
        var uiManager = this.getManager(blockId);
        if (uiManager) {
            uiManager.destroy();
            this.uiManagers.delete(blockId);
        }
    };
    /**
     * Registers the UI manager instance in map for retrieving.
     *
     * @param {string} blockId - The id of the table block
     * @returns {TableUIManager} - Manager instance
     * @hidden
     */
    TableRenderer.prototype.registerUIManager = function (blockId) {
        var manager = new TableUIManager(this.parent);
        this.uiManagers.set(blockId, manager);
        return manager;
    };
    /**
     * Fetches the UI manager instance based on blockId.
     *
     * @param {string} blockId - The id of the table block
     * @returns {TableUIManager} - Manager instance
     * @hidden
     */
    TableRenderer.prototype.getManager = function (blockId) {
        return this.uiManagers.get(blockId);
    };
    /**
     * Updates the read-only state of a table block by toggling content editing capabilities.
     *
     * @param {HTMLTableElement} element - The table element to update.
     * @param {boolean} value - `true` to make the table read-only, `false` to make it editable.
     * @returns {void}
     * @hidden
     */
    TableRenderer.prototype.updateTableReadyOnlyState = function (element, value) {
        var _this = this;
        var editableElements = Array.from(element.querySelectorAll("[contenteditable='" + value + "']"));
        editableElements = editableElements.filter(function (element) {
            return !_this.nonEditableElements.some(function (className) { return element.classList.contains(className); });
        });
        editableElements.forEach(function (element) {
            element.contentEditable = (!value).toString();
            element.dataset.tableReadonlyProcessed = 'true';
        });
        element.classList.toggle('e-readonly', value);
    };
    /**
     * Based on current focused cell element, resolves the context and returns it.
     *
     * @returns {TableContext} - The context object containing details about current focused table
     * @hidden
     */
    TableRenderer.prototype.resolveTableContext = function () {
        var focusedEl = this.parent.currentFocusedBlock;
        var tableBlockEl = focusedEl && focusedEl.closest('.' + constants.TABLE_BLOCK_CLS);
        if (!tableBlockEl) {
            return null;
        }
        var tableEl = tableBlockEl.querySelector('table');
        var blockId = tableEl.getAttribute('data-block-id') || tableBlockEl.id;
        var tableBlock = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var props = tableBlock.properties;
        var td = focusedEl.closest('td') || tableEl.querySelector('.e-cell-focus');
        var startDataRow = props.enableHeader ? (parseInt(td.dataset.row, 10) - 1) : parseInt(td.dataset.row, 10);
        var startDataCol = parseInt(td.dataset.col, 10);
        return { tableBlockEl: tableBlockEl, tableEl: tableEl, props: props, startDataRow: startDataRow, startDataCol: startDataCol };
    };
    TableRenderer.prototype.handleHeaderInput = function () {
        var blockElement = this.parent.currentFocusedBlock;
        if (!blockElement || (blockElement && extractBlockTypeFromElement(blockElement) !== 'Table')) {
            return;
        }
        var blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        var props = blockModel.properties;
        var tableHeaders = blockElement.querySelectorAll('thead th:not(.e-row-number)');
        var oldColumns = decoupleReference(props.columns);
        tableHeaders.forEach(function (headerElement) {
            var colIndex = parseInt(headerElement.getAttribute('data-col'), 10);
            var updatedHeaderText = headerElement.textContent;
            props.columns[colIndex].headerText = updatedHeaderText;
        });
        var updatedColumns = decoupleReference(props.columns);
        this.parent.undoRedoAction.trackTableHeaderInputForUndoRedo({
            blockId: blockModel.id,
            oldColumns: oldColumns,
            updatedColumns: updatedColumns
        });
    };
    TableRenderer.prototype.destroyAllTableManagers = function () {
        if (this.uiManagers.size > 0) {
            this.uiManagers.forEach(function (manager) {
                manager.destroy();
            });
            this.uiManagers.clear();
        }
    };
    TableRenderer.prototype.destroy = function () {
        this.removeEventListener();
        this.destroyAllTableManagers();
    };
    return TableRenderer;
}());
export { TableRenderer };
