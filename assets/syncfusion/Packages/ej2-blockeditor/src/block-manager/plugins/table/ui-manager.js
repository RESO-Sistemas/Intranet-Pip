import { createElement } from '@syncfusion/ej2-base';
import * as constants from '../../../common/constant';
import { decoupleReference, getBlockContentElement, getBlockModelById, getDataCell, getSelectedCells, setCursorPosition, setTableWidthMode, toDomCol, toModelRow } from '../../../common/utils/index';
var TableUIManager = /** @class */ (function () {
    function TableUIManager(parent) {
        // State
        this.hoveredRow = null;
        this.hoveredColIndex = null;
        this.isMultiSelecting = false;
        this.isResizing = false;
        this.lastRowAnchorIndex = null;
        this.lastColAnchorIndex = null;
        this.parent = parent;
    }
    TableUIManager.prototype.init = function (table, blockElement, blockModel) {
        this.table = table;
        this.tableContainer = table.parentElement;
        this.blockElement = blockElement;
        this.blockModel = blockModel;
        this.blockId = table.getAttribute('data-block-id');
        this.createUiElements();
        this.mountUiElements();
        this.wireDelegatedMousemove();
        this.wireRowInsert();
        this.wireActionHandles();
        this.wireColInsert();
        this.wireColResize();
        this.wireFocusAndCleanup();
        this.wireObservers();
    };
    // 1) Create all UI elements
    TableUIManager.prototype.createUiElements = function () {
        this.rowInsertHandle = createElement('div', { className: 'e-row-insert-handle e-icons e-plus', attrs: { contenteditable: 'false' }, styles: 'display: none' });
        this.rowActionHandle = createElement('div', { className: 'e-row-action-handle e-action-handle', attrs: { contenteditable: 'false', 'data-block-id': this.blockId, 'data-icon-type': 'row' }, styles: 'display: none' });
        var rowActionHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        this.rowActionHandle.appendChild(rowActionHandleIcon);
        this.rowHoverLine = createElement('div', { className: 'e-row-hover-line', styles: 'display: none', attrs: { contenteditable: 'false' } });
        this.rowTopDot = createElement('div', { className: 'e-row-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.rowBottomDot = createElement('div', { className: 'e-row-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colInsertHandle = createElement('div', { className: 'e-col-insert-handle e-icons e-plus', attrs: { contenteditable: 'false' }, styles: 'display: none' });
        this.colActionHandle = createElement('div', { className: 'e-col-action-handle e-action-handle', attrs: { contenteditable: 'false', 'data-block-id': this.blockId, 'data-icon-type': 'col' }, styles: 'display: none' });
        var colActionHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        colActionHandleIcon.style.transform = 'rotate(90deg)';
        this.colActionHandle.appendChild(colActionHandleIcon);
        this.colHoverLine = createElement('div', { className: 'e-col-hover-line', styles: 'display: none', attrs: { contenteditable: 'false' } });
        this.colLeftDot = createElement('div', { className: 'e-col-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colRightDot = createElement('div', { className: 'e-col-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.rowPinned = createElement('div', { className: 'e-row-action-handle e-pinned e-action-handle', attrs: { contenteditable: 'false', 'data-icon-type': 'row' }, styles: 'display: none' });
        var rowPinnedHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        this.rowPinned.appendChild(rowPinnedHandleIcon);
        this.colPinned = createElement('div', { className: 'e-col-action-handle e-pinned e-action-handle', attrs: { contenteditable: 'false', 'data-icon-type': 'col' }, styles: 'display: none' });
        var colPinnedHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        colPinnedHandleIcon.style.transform = 'rotate(90deg)';
        this.colPinned.appendChild(colPinnedHandleIcon);
        this.rowTopHit = createElement('div', { className: 'e-row-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.rowBottomHit = createElement('div', { className: 'e-row-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colLeftHit = createElement('div', { className: 'e-col-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colRightHit = createElement('div', { className: 'e-col-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        // full-height column-resize handle (invisible until needed)
        this.colResizeHandle = createElement('div', {
            className: 'e-col-resize-handle',
            attrs: { contenteditable: 'false' },
            styles: 'display:none; position:absolute; pointer-events:auto;'
        });
    };
    // 2) Mount elements to block element in the same order
    TableUIManager.prototype.mountUiElements = function () {
        var _this = this;
        [this.rowInsertHandle, this.rowHoverLine, this.rowActionHandle, this.rowTopDot, this.rowBottomDot, this.colInsertHandle,
            this.colHoverLine, this.colActionHandle, this.colLeftDot, this.colRightDot, this.rowPinned, this.colPinned]
            .forEach(function (el) { return _this.blockElement.appendChild(el); });
        [this.rowTopHit, this.rowBottomHit, this.colLeftHit, this.colRightHit]
            .forEach(function (el) { return _this.blockElement.appendChild(el); });
        // mount the resize handle on top
        this.blockElement.appendChild(this.colResizeHandle);
    };
    // 3) Delegated mouse move handling (exact logic preserved)
    TableUIManager.prototype.wireDelegatedMousemove = function () {
        var _this = this;
        this.table.addEventListener('mousemove', function (e) {
            var target = e.target;
            var isRowNumberCell = target.closest('td.e-row-number, th.e-row-number') !== null;
            var isPlainHeaderCell = target.closest('th.e-row-number') !== null;
            var hasBodyRows = _this.table.tBodies[0].rows.length > 0 ? true : false;
            if (_this.isMultiSelecting || _this.isResizing || !target.closest('td, th')) {
                _this.hideRowUI();
                _this.hideColUI();
                _this.hideHitZones();
                return;
            }
            // Hide row UI only for plain header cell when body rows exist
            if (isPlainHeaderCell && hasBodyRows) {
                _this.hideRowUI();
                _this.hideColUI();
                _this.hideHitZones();
                return;
            }
            // hide the resize handle by default; we'll re-show if near a column boundary
            _this.colResizeHandle.style.display = 'none';
            var xLeft = _this.table.parentElement.offsetLeft - 8;
            // Row positioning (dots only)
            var row = target.closest('tr');
            _this.hoveredRow = row;
            var rowRect = row.getBoundingClientRect();
            var blockRect = _this.blockElement.getBoundingClientRect();
            _this.rowActionHandle.dataset.rowIndex = Array.from(_this.table.rows).indexOf(row).toString();
            _this.rowActionHandle.style.top = rowRect.top - blockRect.top + 'px';
            _this.rowActionHandle.style.height = "" + rowRect.height + 'px';
            _this.rowActionHandle.style.display = target.tagName === 'TH' ? 'none' : 'flex';
            var isHeaderRow = _this.hoveredRow && _this.hoveredRow.querySelector('th') !== null;
            var showTopDot = true;
            var showBottomDot = true;
            if (isHeaderRow) {
                if (hasBodyRows) {
                    // Normal case: header with body rows → hide both dots
                    showTopDot = false;
                    showBottomDot = false;
                }
                else {
                    // Only header exists → show ONLY bottom dot
                    showTopDot = false;
                    showBottomDot = true;
                }
            }
            else {
                // Body row → show both dots normally
                showTopDot = true;
                showBottomDot = true;
            }
            if (showTopDot || showBottomDot) {
                // Show row dots at left side (top and bottom of row)
                _this.rowTopDot.style.left = "" + (xLeft - 4) + 'px';
                _this.rowBottomDot.style.left = "" + (xLeft - 4) + 'px';
                _this.rowTopDot.style.top = "" + (rowRect.top - blockRect.top - 3) + 'px';
                _this.rowBottomDot.style.top = "" + (rowRect.bottom - blockRect.top - 3) + 'px';
                _this.rowTopDot.style.display = showTopDot ? 'block' : 'none';
                _this.rowBottomDot.style.display = showBottomDot ? 'block' : 'none';
            }
            else {
                _this.rowTopDot.style.display = 'none';
                _this.rowBottomDot.style.display = 'none';
            }
            // Hit zones at left side for dot
            var xLeftHit = xLeft - 12;
            _this.rowTopHit.style.left = "" + xLeftHit + 'px';
            _this.rowBottomHit.style.left = "" + xLeftHit + 'px';
            _this.rowTopHit.style.top = "" + (rowRect.top - blockRect.top - 15) + 'px';
            _this.rowBottomHit.style.top = "" + (rowRect.bottom - blockRect.top - 15) + 'px';
            _this.rowTopHit.style.display = 'block';
            _this.rowBottomHit.style.display = 'block';
            // Column positioning (dots only)
            var cell = target.closest('td, th');
            var cellRect = cell.getBoundingClientRect();
            var rowEl = cell.parentElement;
            var colIndex = Array.from(rowEl.cells).filter(function (c) { return !c.classList.contains('e-row-number'); }).indexOf(cell);
            _this.hoveredColIndex = colIndex;
            var dotY = _this.table.parentElement.offsetTop - 8;
            var dotHalfWidth = 3.2;
            var borderValue = Math.round(parseFloat(getComputedStyle(cell).borderWidth));
            var leftColX = cellRect.left - blockRect.left - borderValue - dotHalfWidth;
            var rightColX = cellRect.right - blockRect.left - borderValue - dotHalfWidth;
            _this.colLeftDot.style.left = "" + leftColX + 'px';
            _this.colRightDot.style.left = "" + rightColX + 'px';
            _this.colLeftDot.style.top = "" + (dotY - 4) + 'px';
            _this.colRightDot.style.top = "" + (dotY - 4) + 'px';
            _this.colLeftDot.style.display = 'block';
            _this.colRightDot.style.display = 'block';
            if (cell.classList.contains('e-row-number')) {
                _this.colLeftDot.style.display = 'none';
                _this.colRightDot.style.display = 'none';
            }
            _this.colLeftHit.style.left = "" + (leftColX - 10) + 'px';
            _this.colRightHit.style.left = "" + (rightColX - 10) + 'px';
            _this.colLeftHit.style.top = "" + (dotY - 12) + 'px';
            _this.colRightHit.style.top = "" + (dotY - 12) + 'px';
            _this.colLeftHit.style.display = 'block';
            _this.colRightHit.style.display = 'block';
            if (!isRowNumberCell) {
                var headerCell = _this.table.querySelectorAll('thead th:not(.e-row-number)')[colIndex];
                if (headerCell) {
                    var headerRect = headerCell.getBoundingClientRect();
                    var borderValue_1 = Math.round(parseFloat(getComputedStyle(headerCell).borderWidth));
                    _this.colActionHandle.style.left = "" + ((headerRect.left - borderValue_1) - blockRect.left) + 'px';
                    _this.colActionHandle.style.width = "" + (headerRect.width + borderValue_1) + 'px';
                }
                else {
                    _this.colActionHandle.style.left = "" + ((cellRect.left - borderValue) - blockRect.left) + 'px';
                    _this.colActionHandle.style.width = "" + (cellRect.width + borderValue) + 'px';
                }
                _this.colActionHandle.dataset.colIndex = colIndex.toString();
                _this.colActionHandle.style.display = 'flex';
                var proximity = 6;
                var distanceFromRight = cellRect.right - e.clientX;
                var distanceFromLeft = e.clientX - cellRect.left;
                var isNearColumnRightBoundary = distanceFromRight <= proximity;
                var isNearColumnLeftBoundary = distanceFromLeft <= proximity;
                if (isNearColumnLeftBoundary || isNearColumnRightBoundary) {
                    // Determine which two columns the boundary separates
                    var leftDataIdx = isNearColumnRightBoundary ? colIndex : colIndex - 1;
                    if (leftDataIdx < 0) {
                        // Do not show resize handle for first column
                        _this.colResizeHandle.style.display = 'none';
                    }
                    else {
                        var boundary = isNearColumnRightBoundary ? cellRect.right : cellRect.left;
                        var leftOffset = boundary - blockRect.left - 2.5;
                        _this.colResizeHandle.style.left = leftOffset + "px";
                        _this.colResizeHandle.style.top = _this.table.parentElement.offsetTop + "px";
                        _this.colResizeHandle.style.height = _this.table.offsetHeight + "px";
                        _this.colResizeHandle.style.display = 'block';
                        _this.colResizeHandle.setAttribute('data-resize-index', String(leftDataIdx));
                    }
                }
            }
            else {
                _this.colActionHandle.style.display = 'none';
            }
        });
    };
    // 4) Row insert UI and handlers
    TableUIManager.prototype.wireRowInsert = function () {
        var _this = this;
        var showRowLine = function (which) {
            if (!_this.hoveredRow) {
                return;
            }
            var rowRect = _this.hoveredRow.getBoundingClientRect();
            var blockRect = _this.blockElement.getBoundingClientRect();
            var tbody = _this.table.tBodies[0];
            var hasBodyRows = tbody && tbody.rows.length > 0;
            _this.rowHoverLine.style.top = "" + ((which === 'top' ? rowRect.top : rowRect.bottom) - blockRect.top - 2) + 'px';
            _this.rowHoverLine.style.left = "" + _this.table.parentElement.offsetLeft + 'px';
            _this.rowHoverLine.style.width = "" + _this.table.offsetWidth + 'px';
            _this.rowHoverLine.style.display = 'block';
            var dotTop = which === 'top' ? _this.rowTopDot : _this.rowBottomDot;
            var dotRect = dotTop.getBoundingClientRect();
            _this.rowInsertHandle.style.top = "" + (dotRect.top - blockRect.top - 7) + 'px';
            _this.rowInsertHandle.style.left = "" + (dotRect.left - blockRect.left - 7) + 'px';
            _this.rowInsertHandle.style.display = 'flex';
            // In header-only case, keep bottom dot visible
            if (!hasBodyRows && _this.hoveredRow.querySelector('th')) {
                // Only bottom dot visible → don't hide it when showing line
                if (which === 'top') {
                    _this.rowTopDot.style.visibility = 'hidden'; // top never shown anyway
                }
                else {
                    _this.rowBottomDot.style.visibility = ''; // keep visible
                }
            }
            else {
                dotTop.style.visibility = 'hidden';
            }
            var index = Array.from(tbody.rows).indexOf(_this.hoveredRow);
            _this.rowInsertHandle.dataset.rowIndex = (which === 'top' ? index : index + 1).toString();
        };
        var hideRowLine = function () {
            _this.rowHoverLine.style.display = 'none';
            _this.rowInsertHandle.style.display = 'none';
            // Restore visibility, but keep bottom dot visible if only header
            var tbody = _this.table.tBodies[0];
            var hasBodyRows = tbody && tbody.rows.length > 0;
            if (!hasBodyRows) {
                _this.rowTopDot.style.visibility = 'hidden'; // no top dot
                _this.rowTopHit.style.visibility = 'hidden';
                _this.rowBottomDot.style.visibility = ''; // keep bottom dot visible
            }
            else {
                _this.rowTopDot.style.visibility = '';
                _this.rowTopHit.style.visibility = '';
                _this.rowBottomDot.style.visibility = '';
            }
        };
        this.rowTopHit.addEventListener('mouseenter', function (e) {
            if (_this.isFromInsertHandle(e, _this.rowInsertHandle)) {
                return;
            }
            showRowLine('top');
        });
        this.rowBottomHit.addEventListener('mouseenter', function (e) {
            if (_this.isFromInsertHandle(e, _this.rowInsertHandle)) {
                return;
            }
            showRowLine('bottom');
        });
        this.rowInsertHandle.addEventListener('mouseleave', function (e) {
            if (_this.isFromInsertHandle(e, _this.rowBottomHit) || _this.isFromInsertHandle(e, _this.rowTopHit)) {
                return;
            }
            hideRowLine();
        });
        this.rowTopHit.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            if (_this.isFromInsertHandle(e, _this.rowInsertHandle)) {
                return;
            }
            hideRowLine();
        });
        this.rowBottomHit.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            if (_this.isFromInsertHandle(e, _this.rowInsertHandle)) {
                return;
            }
            hideRowLine();
        });
        this.rowInsertHandle.addEventListener('click', function (e) {
            e.preventDefault();
            var index = parseInt(_this.rowInsertHandle.dataset.rowIndex, 10);
            _this.parent.tableService.addRowAt({
                blockId: _this.blockElement.id,
                rowIndex: index
            });
            _this.hideRowGripper(); // Hides row pinned bars
            _this.hideAllPinnedColBars(); // Hides col pinned bars
            requestAnimationFrame(function () {
                _this.hideRowUI();
            });
            _this.rowTopHit.style.display = 'none';
            _this.rowBottomHit.style.display = 'none';
            _this.clearPinnedGripperSelection();
        });
    };
    // 5) Column insert UI and handlers
    TableUIManager.prototype.wireColInsert = function () {
        var _this = this;
        var showColLine = function (side) {
            if (_this.hoveredColIndex == null) {
                return;
            }
            var rows = Array.from(_this.table.rows);
            var cells = Array.from(rows[0].cells).filter((function (cell) { return !cell.classList.contains('e-row-number'); }));
            var anyRowCell = cells[_this.hoveredColIndex];
            var blockRect = _this.blockElement.getBoundingClientRect();
            var rect = anyRowCell.getBoundingClientRect();
            var boundary = side === 'right' ? rect.right : rect.left;
            _this.colHoverLine.style.left = "" + (boundary - blockRect.left - 2) + 'px';
            _this.colHoverLine.style.top = "" + _this.table.parentElement.offsetTop + 'px';
            _this.colHoverLine.style.height = "" + _this.table.offsetHeight + 'px';
            _this.colHoverLine.style.display = 'block';
            var dotEl = side === 'left' ? _this.colLeftDot : _this.colRightDot;
            var dotRect = dotEl.getBoundingClientRect();
            _this.colInsertHandle.style.left = "" + (dotRect.left - blockRect.left - 6) + 'px';
            _this.colInsertHandle.style.top = "" + (dotRect.top - blockRect.top - 7) + 'px';
            _this.colInsertHandle.style.display = 'flex';
            dotEl.style.visibility = 'hidden';
            _this.colInsertHandle.dataset.colIndex = (side === 'right' ? _this.hoveredColIndex + 1 : _this.hoveredColIndex).toString();
        };
        var hideColLine = function () {
            _this.colHoverLine.style.display = 'none';
            _this.colInsertHandle.style.display = 'none';
            _this.colLeftDot.style.visibility = '';
            _this.colRightDot.style.visibility = '';
        };
        this.colLeftHit.addEventListener('mouseenter', function (e) {
            if (_this.isFromInsertHandle(e, _this.colInsertHandle)) {
                return;
            }
            showColLine('left');
        });
        this.colRightHit.addEventListener('mouseenter', function (e) {
            if (_this.isFromInsertHandle(e, _this.colInsertHandle)) {
                return;
            }
            showColLine('right');
        });
        this.colInsertHandle.addEventListener('mouseleave', function (e) {
            if (_this.isFromInsertHandle(e, _this.colLeftHit) || _this.isFromInsertHandle(e, _this.colRightHit)) {
                return;
            }
            hideColLine();
        });
        this.colLeftHit.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            if (_this.isFromInsertHandle(e, _this.colInsertHandle)) {
                return;
            }
            hideColLine();
        });
        this.colRightHit.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            if (_this.isFromInsertHandle(e, _this.colInsertHandle)) {
                return;
            }
            hideColLine();
        });
        this.colInsertHandle.addEventListener('click', function (e) {
            e.preventDefault();
            var index = parseInt(_this.colInsertHandle.dataset.colIndex, 10);
            _this.parent.tableService.addColumnAt({
                blockId: _this.blockElement.id,
                colIndex: index
            });
            _this.hideRowGripper(); // Hides row pinned bars
            _this.hideAllPinnedColBars(); // Hides col pinned bars
            requestAnimationFrame(function () {
                _this.hideColUI();
            });
            _this.colLeftHit.style.display = 'none';
            _this.colRightHit.style.display = 'none';
            _this.clearPinnedGripperSelection();
        });
    };
    TableUIManager.prototype.isFromInsertHandle = function (e, insertHandle) {
        var relatedTarget = e.relatedTarget;
        return (relatedTarget !== null && insertHandle !== null && (relatedTarget === insertHandle));
    };
    /**
     * Displays a row gripper for the specified DOM row index.
     * Handles row selection, focus, pinned bar creation, and optional gripper popup.
     * Updates DOM elements, dataset attributes, and integrates with undo/redo tracking.
     *
     * @param {number} domRowIdx - The DOM/visual row index to show the gripper for.
     * @param {boolean} [isFirstRow=false] - Indicates if the row is the first row, triggering popup options.
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.showRowGripperForDomRow = function (domRowIdx, isFirstRow) {
        var _this = this;
        if (isFirstRow === void 0) { isFirstRow = false; }
        var rowEl = this.table.rows[parseInt(domRowIdx.toString(), 10)];
        var cellBlock = rowEl.querySelector('.e-block');
        var props = this.blockModel.properties;
        // No gripper or popup for header
        if (props.enableHeader && domRowIdx === 0) {
            return;
        }
        var rowRect = rowEl.getBoundingClientRect();
        var blockRect = this.blockElement.getBoundingClientRect();
        this.addRowSelection(this.table, domRowIdx);
        this.focusCellsInRows([domRowIdx]);
        // Focus first cell in the row
        setCursorPosition(getBlockContentElement(cellBlock), 0);
        this.parent.setFocusToBlock(cellBlock);
        // Create and position a new pinned bar for this row
        var rowPinned = this.createPinnedRowBar();
        rowPinned.style.top = Math.round(rowRect.top - blockRect.top - 1) + "px";
        rowPinned.style.height = rowRect.height + 1 + "px";
        rowPinned.classList.add('e-action-bar-active');
        rowPinned.style.display = 'flex';
        rowPinned.dataset.rowIndex = domRowIdx.toString();
        this.blockElement.appendChild(rowPinned);
        this.rowPinned = rowPinned;
        rowPinned.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var clickedDomRowIdx = parseInt(rowPinned.dataset.rowIndex, 10);
            // Clear all selections and grippers
            _this.resetAllTableSelectionUI();
            // Re-show gripper + popup for the clicked row
            _this.showRowGripperForDomRow(clickedDomRowIdx, true);
            // Refocus the clicked row (optional but good UX)
            var clickedRowEl = _this.table.rows[parseInt(clickedDomRowIdx.toString(), 10)];
            var cellBlock = clickedRowEl.querySelector('.e-block');
            if (cellBlock) {
                setCursorPosition(getBlockContentElement(cellBlock), 0);
                _this.parent.setFocusToBlock(cellBlock);
            }
        });
        this.rowActionHandle.style.display = 'none';
        this.colPinned.style.display = 'none';
        this.colPinned.classList.remove('e-action-bar-active');
        if (isFirstRow) {
            this.showGripperPopup(this.rowActionHandle, rowPinned, this.blockModel, {
                label: 'Delete Row',
                iconCss: 'e-trash',
                callback: function () { _this.deleteSelectedRows(domRowIdx); }
            });
        }
    };
    TableUIManager.prototype.deleteSelectedRows = function (domRowIdx) {
        var _this = this;
        var selectedRows = this.table.querySelectorAll('tr.e-row-selected');
        var selectedCount = selectedRows.length;
        var props = this.blockModel.properties;
        if (selectedCount === 0) {
            return; // nothing selected → no-op, no undo entry
        }
        if (selectedCount === 1) {
            var modelIdx = toModelRow(domRowIdx, props.enableHeader);
            this.parent.tableService.deleteRowAt({
                blockId: this.blockId,
                modelIndex: modelIdx
            });
        }
        else {
            var rowsMeta_1 = [];
            // Collect metadata for undo/redo
            Array.from(selectedRows)
                .map(function (row) { return parseInt(row.dataset.row, 10); })
                .sort(function (a, b) { return b - a; })
                .forEach(function (domRowIdx) {
                var modelIdx = toModelRow(domRowIdx, props.enableHeader);
                var rowModel = props.rows[parseInt(modelIdx.toString(), 10)];
                if (rowModel) {
                    rowsMeta_1.push({
                        index: modelIdx,
                        rowModel: decoupleReference(rowModel)
                    });
                }
            });
            // Track bulk undo/redo **once**
            this.parent.undoRedoAction.trackBulkRowDeletionForUndoRedo({
                blockId: this.blockId,
                rows: rowsMeta_1
            });
            // Perform deletions (skip internal single tracking)
            rowsMeta_1.forEach(function (_a) {
                var index = _a.index;
                _this.parent.tableService.deleteRowAt({
                    blockId: _this.blockId,
                    modelIndex: index,
                    isUndoRedoAction: true
                });
            });
        }
    };
    /**
     * Displays a column gripper for the specified DOM column index.
     * Handles column selection, focus, pinned bar creation, and optional gripper popup.
     * Updates DOM elements, dataset attributes, and integrates with undo/redo tracking.
     *
     * @param {number} domColIdx - The DOM/visual column index to show the gripper for.
     * @param {boolean} [isFirstCol=false] - Indicates if the column is the first column, triggering popup options.
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.showColGripperForDomCol = function (domColIdx, isFirstCol) {
        var _this = this;
        if (isFirstCol === void 0) { isFirstCol = false; }
        var props = this.blockModel.properties;
        // 1. Get top cell for popup positioning (header if exists, else first body)
        var topCell;
        if (props.enableHeader) {
            var headerCells = this.table.querySelectorAll('thead th:not(.e-row-number)');
            topCell = headerCells[parseInt(domColIdx.toString(), 10)];
        }
        else {
            topCell = getDataCell(this.table, 0, domColIdx);
        }
        // 2. Get target cell for focus + pinned bar positioning (body cell, or header if no body logic needed)
        var headerCell = props.enableHeader
            ? this.table.querySelectorAll('thead th:not(.e-row-number)')[parseInt(domColIdx.toString(), 10)]
            : null;
        var targetCell = getDataCell(this.table, (headerCell ? 1 : 0), domColIdx);
        var cellBlock = targetCell.querySelector('.e-block');
        var cellRect = targetCell.getBoundingClientRect();
        var blockRect = this.blockElement.getBoundingClientRect();
        // Add column selection without clearing others
        this.addColumnSelection(this.table, domColIdx);
        // add e-cell-focus class to selected col cells
        this.focusCellsInColumns([domColIdx]);
        // Focus
        setCursorPosition(getBlockContentElement(cellBlock), 0);
        this.parent.setFocusToBlock(cellBlock);
        var colPinnedLeftOffset = cellRect.left - blockRect.left;
        var colPinnedWidth = cellRect.width;
        if (headerCell) {
            var headerRect = headerCell.getBoundingClientRect();
            var headerBorderValue = Math.round(parseFloat(getComputedStyle(headerCell).borderWidth));
            colPinnedLeftOffset = (headerRect.left - headerBorderValue) - blockRect.left;
            colPinnedWidth = headerRect.width + headerBorderValue;
        }
        // Create and position pinned bar
        var colPinned = this.createPinnedColBar();
        colPinned.style.left = colPinnedLeftOffset + "px";
        colPinned.style.width = colPinnedWidth + "px";
        colPinned.classList.add('e-action-bar-active');
        colPinned.style.display = 'flex';
        colPinned.dataset.colIndex = domColIdx.toString();
        this.blockElement.appendChild(colPinned);
        this.colPinned = colPinned;
        colPinned.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var clickedDomColIdx = parseInt(colPinned.dataset.colIndex, 10);
            // Focus only this column (clear others + re-apply this one)
            _this.focusSinglePinnedColumn(clickedDomColIdx);
        });
        // Hide regular handles
        this.colActionHandle.style.display = 'none';
        if (isFirstCol) {
            this.showGripperPopup(this.colActionHandle, colPinned, this.blockModel, {
                label: 'Delete Column',
                iconCss: 'e-trash',
                callback: function () { _this.deleteSelectedColumns(); }
            });
        }
    };
    TableUIManager.prototype.deleteSelectedColumns = function () {
        var _this = this;
        var props = this.blockModel.properties;
        var selectedCells = this.blockElement.querySelectorAll('td.e-col-selected, th.e-col-selected');
        var uniqueColIndices = new Set();
        selectedCells.forEach(function (cell) {
            var colIdx = parseInt(cell.dataset.col || '-1', 10);
            if (colIdx >= 0) {
                uniqueColIndices.add(colIdx);
            }
        });
        var selectedCount = uniqueColIndices.size;
        var totalDataColumns = props.columns.length;
        if (selectedCount === totalDataColumns && totalDataColumns > 0) {
            // Full table columns selected → delete entire block directly
            var block = getBlockModelById(this.blockId, this.parent.getEditorBlocks());
            var blockElement = this.parent.getBlockElementById(this.blockId);
            var adjacentBlock = (blockElement.nextElementSibling || blockElement.previousElementSibling);
            if (adjacentBlock) {
                this.parent.setFocusAndUIForNewBlock(adjacentBlock);
            }
            if (block && blockElement) {
                this.parent.lastHighlightedBlockId = this.blockId;
                this.parent.execCommand({
                    command: 'DeleteBlock',
                    state: {
                        blockElement: blockElement,
                        isUndoRedoAction: false,
                        preventMinimumOne: true,
                        preventEventTrigger: false
                    }
                });
            }
            return;
        }
        var sortedIndices = Array.from(uniqueColIndices).sort(function (a, b) { return b - a; });
        if (sortedIndices.length > 1) {
            var colsMeta_1 = [];
            sortedIndices.forEach(function (dataColIdx) {
                var colModel = props.columns[parseInt(dataColIdx.toString(), 10)];
                var columnCells = props.rows.map(function (r) {
                    var cell = r.cells[parseInt(dataColIdx.toString(), 10)];
                    return decoupleReference(cell);
                });
                colsMeta_1.push({
                    index: dataColIdx,
                    columnModel: decoupleReference(colModel),
                    columnCells: columnCells
                });
            });
            this.parent.undoRedoAction.trackBulkColumnDeletionForUndoRedo({
                blockId: this.blockId,
                cols: colsMeta_1
            });
            sortedIndices.forEach(function (dataColIdx) {
                _this.parent.tableService.deleteColumnAt({
                    blockId: _this.blockId,
                    colIndex: dataColIdx,
                    isUndoRedoAction: true
                });
            });
        }
        else if (sortedIndices.length === 1) {
            // Single column — normal deletion
            this.parent.tableService.deleteColumnAt({
                blockId: this.blockId,
                colIndex: sortedIndices[0]
            });
        }
    };
    TableUIManager.prototype.focusSinglePinnedColumn = function (domColIdx) {
        // Clear everything first
        this.resetAllTableSelectionUI();
        // Re-select only the clicked column
        this.addColumnSelection(this.table, domColIdx);
        this.focusCellsInColumns([domColIdx]);
        // Re-show gripper + popup for the clicked column
        this.showColGripperForDomCol(domColIdx, true);
        // Refocus the first body cell in that column (or header if no body)
        var props = this.blockModel.properties;
        var startRow = props.enableHeader ? 1 : 0; // skip header if present
        var rowEl = this.table.tBodies[0].rows[parseInt(startRow.toString(), 10)];
        var domCol = toDomCol(domColIdx, props.enableRowNumbers);
        var cell = rowEl.cells[parseInt(domCol.toString(), 10)];
        this.parent.tableService.removeCellFocus(this.table);
        this.parent.tableService.addCellFocus(cell, true);
        var cellBlock = cell.querySelector('.e-block');
        setCursorPosition(getBlockContentElement(cellBlock), 0);
        this.parent.setFocusToBlock(cellBlock);
    };
    /**
     * Adds a selection state to the specified row in the table.
     * Does not clear previous selections, allowing multiple rows to be selected.
     *
     * @param {HTMLTableElement} table - The table element containing the row.
     * @param {number} rowIndex - The index of the row to mark as selected.
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.addRowSelection = function (table, rowIndex) {
        // Add selection without removing previous
        if (rowIndex == null || rowIndex < 0) {
            return;
        }
        var row = table.rows[rowIndex];
        if (row) {
            row.classList.add('e-row-selected');
        }
    };
    TableUIManager.prototype.createPinnedRowBar = function () {
        var pinned = createElement('div', { className: 'e-row-action-handle e-pinned e-action-handle', attrs: { contenteditable: 'false', 'data-icon-type': 'row' } });
        var pinnedIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        pinned.appendChild(pinnedIcon);
        return pinned;
    };
    /**
     * Hides all pinned row grippers from the table block element.
     * Removes pinned row action handles from the DOM and restores the default row action handle display.
     *
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.hideRowGripper = function () {
        var allPinnedRows = this.blockElement.querySelectorAll('.e-row-action-handle.e-pinned');
        allPinnedRows.forEach(function (pinned) {
            pinned.parentElement.removeChild(pinned);
        });
        if (this.rowActionHandle) {
            this.rowActionHandle.style.display = 'none';
        }
    };
    // 6) Row/Col action handle wiring
    TableUIManager.prototype.wireActionHandles = function () {
        var _this = this;
        // Row action
        this.rowActionHandle.addEventListener('click', function (e) {
            if (_this.rowInsertHandle.style.display !== 'none') {
                return;
            }
            e.preventDefault();
            var domRowIdx = parseInt(_this.rowActionHandle.dataset.rowIndex, 10);
            if (e.shiftKey) {
                var start = void 0;
                var end = void 0;
                // Case 1: Anchor already set from previous gripper click
                if (_this.lastRowAnchorIndex !== null) {
                    start = Math.min(_this.lastRowAnchorIndex, domRowIdx);
                    end = Math.max(_this.lastRowAnchorIndex, domRowIdx);
                }
                // Case 2: No anchor → fall back to currently selected rows (mouse drag / Shift+Arrow)
                else {
                    var selectedRows = _this.table.querySelectorAll('tr.e-row-selected');
                    if (selectedRows.length === 0) {
                        // No existing selection → treat as normal single click
                        start = end = domRowIdx;
                    }
                    else {
                        var indices = Array.from(selectedRows).map(function (tr) { return parseInt(tr.dataset.row, 10); });
                        start = Math.min.apply(Math, indices.concat([domRowIdx]));
                        end = Math.max.apply(Math, indices.concat([domRowIdx]));
                    }
                }
                _this.removeRowColSelection(_this.table);
                _this.hideRowGripper();
                _this.hideAllPinnedColBars();
                _this.parent.tableService.removeCellFocus(_this.table);
                var isFirst = true;
                for (var rowIndex = start; rowIndex <= end; rowIndex++) {
                    if (!_this.hasPinnedRowGripper(rowIndex)) {
                        _this.showRowGripperForDomRow(rowIndex, isFirst);
                        isFirst = false;
                    }
                }
            }
            else {
                // Normal single click (unchanged)
                _this.resetAllTableSelectionUI();
                _this.showRowGripperForDomRow(domRowIdx, true);
                // Remember this row as anchor for next Shift+click
                _this.lastRowAnchorIndex = domRowIdx;
            }
        });
        // Column action
        this.colActionHandle.addEventListener('mousedown', function (e) { return e.preventDefault(); });
        this.colActionHandle.addEventListener('click', function (e) {
            if (_this.colInsertHandle.style.display !== 'none') {
                return;
            }
            e.preventDefault();
            var domColIdx = parseInt(_this.colActionHandle.dataset.colIndex, 10);
            if (e.shiftKey) {
                var start = void 0;
                var end = void 0;
                // Case 1: Anchor already set from previous gripper click
                if (_this.lastColAnchorIndex !== null) {
                    start = Math.min(_this.lastColAnchorIndex, domColIdx);
                    end = Math.max(_this.lastColAnchorIndex, domColIdx);
                }
                // Case 2: No anchor → fall back to currently selected columns (mouse drag / Shift+Arrow)
                else {
                    var selectedColCells = _this.table.querySelectorAll('td.e-col-selected, th.e-col-selected');
                    if (selectedColCells.length === 0) {
                        // No existing selection → treat as normal single click
                        start = end = domColIdx;
                    }
                    else {
                        var indices_1 = [];
                        var colMap_1 = new Set(); // to deduplicate
                        Array.from(selectedColCells).forEach(function (cell) {
                            var col = parseInt(cell.dataset.col, 10);
                            if (!colMap_1.has(col)) {
                                colMap_1.add(col);
                                indices_1.push(col);
                            }
                        });
                        start = Math.min.apply(Math, indices_1.concat([domColIdx]));
                        end = Math.max.apply(Math, indices_1.concat([domColIdx]));
                    }
                }
                _this.resetAllTableSelectionUI();
                var isFirst = true;
                for (var colIndex = start; colIndex <= end; colIndex++) {
                    if (!_this.hasPinnedColGripper(colIndex)) {
                        _this.showColGripperForDomCol(colIndex, isFirst);
                        isFirst = false;
                    }
                }
            }
            else {
                // Normal single click (unchanged)
                _this.resetAllTableSelectionUI();
                _this.showColGripperForDomCol(domColIdx, true);
                // Remember this column as anchor for next Shift+click
                _this.lastColAnchorIndex = domColIdx;
            }
        });
    };
    TableUIManager.prototype.hasPinnedColGripper = function (colIndex) {
        return !!this.blockElement.querySelector(".e-col-action-handle.e-pinned[data-col-index=\"" + colIndex + "\"]");
    };
    TableUIManager.prototype.hasPinnedRowGripper = function (rowIndex) {
        return !!this.blockElement.querySelector(".e-row-action-handle.e-pinned[data-row-index=\"" + rowIndex + "\"]");
    };
    /**
     * Adds a selection state to the specified column in the table.
     * Does not clear previous selections, allowing multiple columns to be selected.
     *
     * @param {HTMLTableElement} table - The table element containing the column.
     * @param {number} colIndex - The index of the column to mark as selected.
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.addColumnSelection = function (table, colIndex) {
        if (colIndex == null || colIndex < 0) {
            return;
        }
        Array.from(table.rows).forEach(function (r) {
            var cells = Array.from(r.cells).filter(function (cell) { return !cell.classList.contains('e-row-number'); });
            if (cells[parseInt(colIndex.toString(), 10)]) {
                cells[parseInt(colIndex.toString(), 10)].classList.add('e-col-selected');
            }
        });
    };
    TableUIManager.prototype.createPinnedColBar = function () {
        var pinned = createElement('div', {
            className: 'e-col-action-handle e-pinned e-action-handle',
            attrs: { contenteditable: 'false', 'data-icon-type': 'col' }
        });
        var icon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        icon.style.transform = 'rotate(90deg)';
        pinned.appendChild(icon);
        return pinned;
    };
    /**
     * Removes all pinned column bars from the table block element.
     * Queries for pinned column action handles and deletes them from the DOM.
     *
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.hideAllPinnedColBars = function () {
        var allPinnedCols = this.blockElement.querySelectorAll('.e-col-action-handle.e-pinned');
        allPinnedCols.forEach(function (el) { return el.remove(); });
    };
    // 7) Table focus, mouseleave, and outside-click cleanup
    TableUIManager.prototype.wireFocusAndCleanup = function () {
        var _this = this;
        this.table.addEventListener('focusin', function () {
            _this.removeRowColSelection(_this.table);
            _this.rowPinned.style.display = 'none';
            _this.colPinned.style.display = 'none';
        });
        this.blockElement.addEventListener('mouseleave', function () {
            _this.hideRowUI();
            _this.hideColUI();
            _this.hideHitZones();
            _this.rowTopDot.style.visibility = '';
            _this.rowBottomDot.style.visibility = '';
            _this.colLeftDot.style.visibility = '';
            _this.colRightDot.style.visibility = '';
            _this.colResizeHandle.style.display = 'none';
        });
        this.table.addEventListener('mousedown', function (e) {
            var target = e.target;
            var cell = target.closest('td, th');
            if (!cell || (cell && cell.classList.contains('e-row-number'))) {
                return;
            }
            if (cell.classList.contains('e-cell-focus')) {
                var selectedCells = getSelectedCells(_this.blockElement);
                if (selectedCells && selectedCells.length === 1) {
                    return;
                }
            }
            _this.parent.tableService.removeCellFocus(_this.table);
            _this.parent.tableService.addCellFocus(cell, true);
            _this.hideRowGripper();
            _this.hideAllPinnedColBars();
        });
        var onDocClick = function (e) {
            var t = e.target;
            var inside = !!t.closest("table.e-table-element[data-block-id=\"" + _this.blockId + "\"]");
            var blkEl = t.closest('.e-table-block');
            var tableSlashItem = t.closest('.e-list-item[data-value="Table"]');
            if (inside || (blkEl && blkEl.contains(t)) || tableSlashItem) {
                return;
            }
            _this.removeRowColSelection(_this.table);
            document.querySelectorAll('.e-row-action-handle.e-pinned').forEach(function (node) { return (node.style.display = 'none'); });
            document.querySelectorAll('.e-col-action-handle.e-pinned').forEach(function (node) { return (node.style.display = 'none'); });
            if (_this.parent.tableService) {
                _this.parent.tableService.removeCellFocus(_this.table);
            }
        };
        document.addEventListener('click', onDocClick);
    };
    // 8) Observers and sync helpers
    TableUIManager.prototype.wireObservers = function () {
        var _this = this;
        var RO = window.ResizeObserver;
        if (RO) {
            var ro_1 = new RO(function () { _this.syncRowUI(); });
            ro_1.observe(this.table);
            Array.from(this.table.rows).forEach(function (r) { return ro_1.observe(r); });
            Array.from(this.table.querySelectorAll('th')).forEach(function (th) { return ro_1.observe(th); });
        }
        this.parent.observer.on('handleEscapeKey', this.handleEscapeAction, this);
    };
    // 9) Column resize wiring
    TableUIManager.prototype.wireColResize = function () {
        var _this = this;
        var startMouseX = 0;
        var initialColumnWidthPx = 0;
        var initialHoverLineLeft = 0;
        var resizingColumnIndex = -1; // data index of the column being resized
        var tableRect;
        var blockRect;
        // Clamp width and compute hover line position
        var computeResizedValues = function (deltaX) {
            var unclampedWidth = initialColumnWidthPx + deltaX;
            var newWidthPx = Math.max(constants.TABLE_COL_MIN_WIDTH, unclampedWidth);
            return newWidthPx;
        };
        var onMouseMove = function (e) {
            if (!_this.isResizing) {
                return;
            }
            e.preventDefault();
            _this.hideColUI();
            var deltaX = (e.clientX + _this.tableContainer.scrollLeft) - startMouseX;
            var props = _this.blockModel.properties;
            var colgroup = _this.table.querySelector('colgroup');
            var domColIndex = toDomCol(resizingColumnIndex, props.enableRowNumbers);
            var newWidthPx = computeResizedValues(deltaX);
            // Update left column width (Only DOM here)
            var leftColEl = colgroup.children[domColIndex];
            leftColEl.style.width = newWidthPx.toFixed(0) + "px";
            // Update hover line
            _this.colHoverLine.style.display = 'block';
            _this.colHoverLine.style.left = leftColEl.getBoundingClientRect().right - blockRect.left - 2 + "px";
            _this.colHoverLine.style.height = _this.table.getBoundingClientRect().height - 2 + 'px';
            _this.colResizeHandle.style.left = leftColEl.getBoundingClientRect().right - blockRect.left - 2 + "px";
            _this.colHoverLine.style.display = 'block';
            // Shrink table width when dragging left
            if (deltaX < 0) {
                var currentTableWidth = _this.table.offsetWidth;
                _this.table.style.width = currentTableWidth + deltaX + "px";
            }
        };
        var onMouseUp = function (e) {
            if (!_this.isResizing) {
                return;
            }
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            var deltaX = (e.clientX + _this.tableContainer.scrollLeft) - startMouseX;
            if (deltaX === 0) {
                _this.colHoverLine.style.display = 'none';
                setResizeStatus(false);
                return;
            }
            var newWidthPx = computeResizedValues(deltaX);
            var props = _this.blockModel.properties;
            var oldBlock = decoupleReference(getBlockModelById(_this.blockId, _this.parent.getEditorBlocks()));
            // Final update
            var colgroup = _this.table.querySelector('colgroup');
            var domColIndex = toDomCol(resizingColumnIndex, props.enableRowNumbers);
            var leftColEl = colgroup.children[domColIndex];
            leftColEl.style.width = newWidthPx.toFixed(0) + "px";
            props.columns[resizingColumnIndex].width = newWidthPx.toFixed(0) + "px";
            _this.colHoverLine.style.display = 'none';
            setResizeStatus(false);
            // Notify changes and track
            _this.parent.tableService.triggerBlockUpdate(_this.blockModel, oldBlock);
            _this.parent.undoRedoAction.trackTableColumnResizeForUndoRedo({
                blockId: _this.blockId,
                resizedColIndex: resizingColumnIndex,
                oldWidthValue: initialColumnWidthPx,
                newWidthValue: newWidthPx
            });
        };
        // Start resize
        this.colResizeHandle.addEventListener('mousedown', function (e) {
            var props = _this.blockModel.properties;
            if (props.readOnly) {
                return;
            }
            e.preventDefault();
            _this.clearPinnedGripperSelection();
            _this.hideColUI();
            _this.hideRowUI();
            _this.parent.tableService.removeCellFocus(_this.table);
            var colIndexAttr = _this.colResizeHandle.getAttribute('data-resize-index');
            if (!colIndexAttr) {
                return;
            }
            resizingColumnIndex = parseInt(colIndexAttr, 10);
            // Switch to px mode if not already
            if (_this.table.getAttribute('data-col-width-mode') !== 'px') {
                _this.convertColgroupToPxMode();
            }
            tableRect = _this.table.getBoundingClientRect();
            blockRect = _this.blockElement.getBoundingClientRect();
            var colgroup = _this.table.querySelector('colgroup');
            var domColIndex = toDomCol(resizingColumnIndex, props.enableRowNumbers);
            var columnEl = colgroup.children[domColIndex];
            initialColumnWidthPx = columnEl.getBoundingClientRect().width;
            startMouseX = e.clientX + _this.tableContainer.scrollLeft;
            initialHoverLineLeft = columnEl.getBoundingClientRect().right - blockRect.left - 2;
            // Show hover line
            _this.colHoverLine.style.top = tableRect.top - blockRect.top + "px";
            _this.colHoverLine.style.height = tableRect.height - 2 + "px";
            _this.colHoverLine.style.left = initialHoverLineLeft + "px";
            _this.colHoverLine.style.display = 'block';
            _this.colResizeHandle.style.left = initialHoverLineLeft + "px";
            _this.colHoverLine.style.display = 'block';
            document.body.style.userSelect = 'none';
            setResizeStatus(true);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        // Hide UI elements on horizontal scroll
        this.table.parentElement.addEventListener('scroll', function () {
            _this.hideColUI();
            _this.hideRowUI();
            _this.hideHitZones();
            _this.clearPinnedGripperSelection();
        });
        var setResizeStatus = function (value) {
            _this.isResizing = value;
            _this.table.setAttribute('data-resizing', value ? 'true' : 'false');
        };
    };
    TableUIManager.prototype.convertColgroupToPxMode = function () {
        var props = this.blockModel.properties;
        var colgroup = this.table.querySelector('colgroup');
        props.columns.forEach(function (col, i) {
            var domIdx = toDomCol(i, props.enableRowNumbers);
            var colEl = colgroup.children[domIdx];
            var currentWidthPx = colEl.getBoundingClientRect().width;
            var pxWidth = currentWidthPx.toFixed(0);
            colEl.style.width = pxWidth + "px";
            col.width = pxWidth + "px";
        });
        setTableWidthMode(this.table, 'px');
        this.parent.observer.on('handleEscapeKey', this.handleEscapeAction, this);
    };
    TableUIManager.prototype.syncRowUI = function () {
        if (!this.hoveredRow || (this.table && this.table.querySelectorAll('tr.e-row-selected').length > 1)) {
            return;
        }
        var rowRect = this.hoveredRow.getBoundingClientRect();
        var blockRect = this.blockElement.getBoundingClientRect();
        var xLeft = this.table.offsetLeft - 8;
        this.rowTopDot.style.left = "" + (xLeft - 4) + 'px';
        this.rowBottomDot.style.left = "" + (xLeft - 4) + 'px';
        this.rowTopDot.style.top = "" + (rowRect.top - blockRect.top - 3) + 'px';
        this.rowBottomDot.style.top = "" + (rowRect.bottom - blockRect.top - 3) + 'px';
        if (this.rowActionHandle.style.display !== 'none') {
            this.rowActionHandle.style.top = "" + (rowRect.top - blockRect.top) + 'px';
            this.rowActionHandle.style.height = "" + rowRect.height + 'px';
        }
        var pinnedRow = this.blockElement.querySelector('.e-row-action-handle.e-pinned');
        if (pinnedRow && pinnedRow.style.display !== 'none') {
            pinnedRow.style.top = "" + (rowRect.top - blockRect.top) + 'px';
            pinnedRow.style.height = "" + rowRect.height + 'px';
        }
    };
    TableUIManager.prototype.hideRowUI = function () {
        this.rowInsertHandle.style.display = 'none';
        this.rowHoverLine.style.display = 'none';
        this.rowActionHandle.style.display = 'none';
        this.rowTopDot.style.display = 'none';
        this.rowBottomDot.style.display = 'none';
    };
    TableUIManager.prototype.hideColUI = function () {
        this.colInsertHandle.style.display = 'none';
        this.colHoverLine.style.display = 'none';
        this.colActionHandle.style.display = 'none';
        this.colLeftDot.style.display = 'none';
        this.colRightDot.style.display = 'none';
    };
    TableUIManager.prototype.hideHitZones = function () {
        [this.rowTopHit, this.rowBottomHit, this.colLeftHit, this.colRightHit].forEach(function (el) { return el.style.display = 'none'; });
    };
    /**
     * Removes all row and column selection states from the given table.
     * Clears the `e-row-selected` class from rows and the `e-col-selected` class from cells.
     *
     * @param {HTMLTableElement} table - The table element to clear selections from.
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.removeRowColSelection = function (table) {
        Array.from(table.rows).forEach(function (r) { return r.classList.remove('e-row-selected'); });
        Array.from(table.querySelectorAll('td, th')).forEach(function (c) {
            var cell = c;
            cell.classList.remove('e-col-selected');
        });
        this.lastRowAnchorIndex = null;
        this.lastColAnchorIndex = null;
    };
    TableUIManager.prototype.clearPinnedGripperSelection = function () {
        // Clear selections
        this.removeRowColSelection(this.table);
        // hide pinned handles
        this.rowPinned.style.display = 'none';
        this.rowPinned.classList.remove('e-action-bar-active');
        this.colPinned.style.display = 'none';
        this.colPinned.classList.remove('e-action-bar-active');
        this.lastRowAnchorIndex = null;
        this.lastColAnchorIndex = null;
    };
    TableUIManager.prototype.showGripperPopup = function (actionHandle, pinnedActionHandle, blockModel, action) {
        var _this = this;
        var existingPopup = this.parent.rootEditorElement.querySelector('.e-table-gripper-action-popup');
        if (existingPopup && existingPopup.parentElement) {
            existingPopup.parentElement.removeChild(existingPopup);
        }
        var popup = createElement('div', {
            className: 'e-table-gripper-action-popup'
        });
        this.parent.rootEditorElement.appendChild(popup);
        var item = createElement('div', {
            className: "e-table-gripper-action-item e-icons " + action.iconCss
        });
        item.setAttribute('title', 'Delete');
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            try {
                action.callback();
            }
            finally {
                // Cleanup
                if (_this.popupObj && _this.parent && _this.parent.popupRenderer) {
                    _this.popupObj.hide();
                    _this.parent.popupRenderer.destroyPopup(_this.popupObj);
                    _this.popupObj = null;
                }
                actionHandle.style.display = 'none';
                pinnedActionHandle.style.display = 'none';
                _this.hideRowGripper();
                _this.hideAllPinnedColBars();
            }
        });
        popup.appendChild(item);
        var iconType = actionHandle.getAttribute('data-icon-type');
        var args = {
            element: popup,
            content: item,
            width: 'auto',
            height: 'auto',
            relateTo: actionHandle,
            position: { X: 'left', Y: 'top' },
            offsetX: iconType === 'col' ? 20 : -11,
            offsetY: iconType === 'col' ? -8 : 21
        };
        this.popupObj = this.parent.popupRenderer.renderPopup(args);
        this.popupObj.show();
        this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(pinnedActionHandle, this.popupObj);
        var removePopup = function (e) {
            var target = e.target;
            // Find the current popup from DOM (not from closure)
            var currentPopup = _this.parent.rootEditorElement.querySelector('.e-table-gripper-action-popup');
            if (currentPopup && !currentPopup.contains(target) && !target.closest('.e-action-handle')) {
                _this.handleRemovePopup();
                document.removeEventListener('mousedown', removePopup);
            }
        };
        document.addEventListener('mousedown', removePopup);
    };
    /**
     * Handles removal of the active popup instance.
     * Hides the popup, destroys it via the parent renderer, and clears the reference.
     *
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.handleRemovePopup = function () {
        if (this.popupObj && this.parent && this.parent.popupRenderer) {
            this.popupObj.hide();
            this.parent.popupRenderer.destroyPopup(this.popupObj);
            this.popupObj = null;
        }
    };
    TableUIManager.prototype.handleEscapeAction = function () {
        this.handleRemovePopup();
        var isColumnGripper = this.colPinned.classList.contains('e-action-bar-active');
        var isRowGripper = this.rowPinned.classList.contains('e-action-bar-active');
        if (isColumnGripper) {
            var focusCell = this.table.querySelector('thead th.e-col-selected');
            if (focusCell) {
                this.parent.tableService.addCellFocus(focusCell, true);
            }
        }
        else if (isRowGripper) {
            var selectedRow = this.table.querySelector('.e-row-selected');
            if (selectedRow) {
                var focusCell = selectedRow.querySelector('td:not(.e-row-number)');
                this.parent.tableService.addCellFocus(focusCell, true);
            }
        }
        this.clearPinnedGripperSelection();
    };
    TableUIManager.prototype.focusCellsInRows = function (rowIndices) {
        var _this = this;
        rowIndices.forEach(function (rowIndex) {
            var row = _this.table.rows[parseInt(rowIndex.toString(), 10)];
            if (!row) {
                return;
            }
            Array.from(row.cells).forEach(function (cell) {
                if (!cell.classList.contains('e-row-number')) {
                    cell.classList.add(constants.TABLE_CELL_FOCUS);
                }
            });
        });
    };
    TableUIManager.prototype.focusCellsInColumns = function (colIndices) {
        var _this = this;
        var props = this.blockModel.properties;
        var enableRowNumbers = props.enableRowNumbers;
        colIndices.forEach(function (colIndex) {
            var domCol = toDomCol(colIndex, enableRowNumbers);
            for (var r = 0; r < _this.table.rows.length; r++) {
                var cell = _this.table.rows[parseInt(r.toString(), 10)].cells[parseInt(domCol.toString(), 10)];
                if (cell && !cell.classList.contains('e-row-number')) {
                    cell.classList.add(constants.TABLE_CELL_FOCUS);
                }
            }
        });
    };
    /**
     * Resets all row/column selection UI states: clears visual selection classes,
     * hides floating and pinned grippers (both row and column), and removes cell focus.
     * @returns {void}
     *
     * @hidden
     */
    TableUIManager.prototype.resetAllTableSelectionUI = function () {
        this.removeRowColSelection(this.table); // clears .e-row-selected / .e-col-selected
        this.hideRowGripper(); // hides floating row gripper
        this.hideAllPinnedColBars(); // hides floating column grippers
        this.parent.tableService.removeCellFocus(this.table); // removes .e-cell-focus from all cells
    };
    TableUIManager.prototype.destroy = function () {
        this.rowInsertHandle = null;
        this.rowActionHandle = null;
        this.rowHoverLine = null;
        this.rowTopDot = null;
        this.rowBottomDot = null;
        this.colInsertHandle = null;
        this.colActionHandle = null;
        this.colHoverLine = null;
        this.colLeftDot = null;
        this.colRightDot = null;
        this.rowPinned = null;
        this.colPinned = null;
        this.rowTopHit = null;
        this.rowBottomHit = null;
        this.colLeftHit = null;
        this.colRightHit = null;
        // State
        this.hoveredRow = null;
        this.hoveredColIndex = null;
        this.isMultiSelecting = null;
        // Instance
        if (this.popupObj) {
            this.parent.popupRenderer.destroyPopup(this.popupObj);
            this.popupObj = null;
        }
        this.parent.observer.off('handleEscapeKey', this.handleEscapeAction);
    };
    return TableUIManager;
}());
export { TableUIManager };
