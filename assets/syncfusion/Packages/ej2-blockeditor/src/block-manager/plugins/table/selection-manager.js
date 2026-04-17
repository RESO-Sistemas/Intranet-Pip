import * as constants from '../../../common/constant';
import { events } from '../../../common/constant';
import { findCellById, getAdjacentBlock, getAdjacentCell, getBlockContentElement, getBlockModelById, getDataCell, getDeepestTextNode, getSelectedCells, hasActiveTableSelection, isAtEndOfBlock, isAtStartOfBlock, setCursorPosition, toDomCol } from '../../../common/utils/index';
var TableSelectionManager = /** @class */ (function () {
    function TableSelectionManager(parent) {
        // rectangle selection anchors
        this.multiselectStartRow = null;
        this.multiselectEndRow = null;
        this.multiselectStartCol = null;
        this.multiselectEndCol = null;
        this.parent = parent;
        this.addEventListener();
    }
    TableSelectionManager.prototype.addEventListener = function () {
        this.parent.observer.on('keydown', this.handleKeyDown, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    TableSelectionManager.prototype.removeEventListener = function () {
        this.parent.observer.off('keydown', this.handleKeyDown);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    TableSelectionManager.prototype.attachTableEvents = function (table, blockElement) {
        var _this = this;
        var isMouseSelecting = false;
        var dragStartCell = null;
        var selectionRectActive = false;
        var onMouseDown = function (e) {
            var target = e.target;
            var cell = target.closest('td, th');
            if (!cell || cell.classList.contains('e-row-number')) {
                return;
            }
            isMouseSelecting = true;
            dragStartCell = cell;
            selectionRectActive = false;
            var startRow = parseInt(cell.dataset.row, 10);
            var startCol = parseInt(cell.dataset.col, 10);
            _this.multiselectStartRow = startRow;
            _this.multiselectStartCol = startCol;
            _this.multiselectEndRow = startRow;
            _this.multiselectEndCol = startCol;
        };
        var onMouseMove = function (e) {
            if (!isMouseSelecting) {
                return;
            }
            var target = e.target;
            var cell = target.closest('td, th');
            if (!cell || cell.classList.contains('e-row-number')) {
                return;
            }
            if (!selectionRectActive && dragStartCell && cell !== dragStartCell) {
                selectionRectActive = true;
                blockElement.style.userSelect = 'none';
                table.style.userSelect = 'none';
            }
            if (!selectionRectActive) {
                return;
            }
            var endRow = parseInt(cell.dataset.row, 10);
            var endCol = parseInt(cell.dataset.col, 10);
            // to avoid popup flicker
            if (endRow === _this.multiselectEndRow && endCol === _this.multiselectEndCol) {
                return;
            }
            _this.updateRectangleFocus(_this.multiselectStartRow, _this.multiselectStartCol, endRow, endCol, table);
            _this.multiselectEndRow = endRow;
            _this.multiselectEndCol = endCol;
            // Auto-scroll while dragging selection to keep current cell in view
            _this.ensureCellVisible(table, cell);
            // Clear any native selection range while dragging across cells
            _this.clearRangeAndSetCursor(table);
            var blockId = table.getAttribute('data-block-id');
            if (blockId) {
                var uiManager = _this.parent.blockRenderer.tableRenderer.getManager(blockId);
                if (uiManager) {
                    uiManager.hideRowGripper();
                    uiManager.hideAllPinnedColBars();
                    var minRow = Math.min(_this.multiselectStartRow, _this.multiselectEndRow);
                    var maxRow = Math.max(_this.multiselectStartRow, _this.multiselectEndRow);
                    var minCol = Math.min(_this.multiselectStartCol, _this.multiselectEndCol);
                    var maxCol = Math.max(_this.multiselectStartCol, _this.multiselectEndCol);
                    var block = getBlockModelById(blockId, _this.parent.getEditorBlocks());
                    var settings = block.properties;
                    var totalRows = settings.rows.length + (settings.enableHeader ? 1 : 0);
                    var totalCols = settings.columns.length;
                    var isFullRowSelection = minCol === 0 && maxCol >= totalCols - 1;
                    uiManager.removeRowColSelection(table);
                    if (isFullRowSelection) {
                        var first = true;
                        for (var r = minRow; r <= maxRow; r++) {
                            uiManager.showRowGripperForDomRow(r, first);
                            first = false;
                        }
                    }
                    else {
                        uiManager.hideRowGripper();
                        if (uiManager.popupObj) {
                            uiManager.handleRemovePopup();
                        }
                    }
                    var isFullColumnSelection = minRow === 0 && maxRow >= totalRows - 1;
                    if (isFullColumnSelection) {
                        var first = true;
                        for (var c = minCol; c <= maxCol; c++) {
                            uiManager.showColGripperForDomCol(c, first);
                            first = false;
                        }
                    }
                    else {
                        uiManager.hideAllPinnedColBars();
                    }
                }
            }
            e.preventDefault();
            e.stopPropagation();
        };
        var onMouseUp = function () {
            isMouseSelecting = false;
            dragStartCell = null;
            selectionRectActive = false;
            // Only clear multi-select if no selection rectangle is active (i.e., mouseup without drag)
            // If a selection rectangle is active, keep the multi-select state for shift+arrow
            if (_this.multiselectStartRow === _this.multiselectEndRow && _this.multiselectStartCol === _this.multiselectEndCol) {
                _this.multiselectStartRow = null;
                _this.multiselectStartCol = null;
                _this.multiselectEndRow = null;
                _this.multiselectEndCol = null;
            }
            blockElement.style.userSelect = '';
            table.style.userSelect = '';
        };
        table.addEventListener('mousedown', onMouseDown);
        table.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    // Ensure the given cell is visible inside the scrollable table container
    TableSelectionManager.prototype.ensureCellVisible = function (table, cell) {
        var container = table.parentElement;
        var margin = 12; // small breathing room
        var cRect = container.getBoundingClientRect();
        var cellRect = cell.getBoundingClientRect();
        // Horizontal scroll
        if (cellRect.left < cRect.left) {
            var dx = cRect.left - cellRect.left + margin;
            container.scrollLeft -= dx;
        }
        else if (cellRect.right > cRect.right) {
            var dx = cellRect.right - cRect.right + margin;
            container.scrollLeft += dx;
        }
    };
    TableSelectionManager.prototype.getAllCellBlocks = function (tableBlock) {
        var tableBlockModel = getBlockModelById(tableBlock.id, this.parent.getEditorBlocks());
        var allBlocks = [];
        tableBlockModel.properties.rows.forEach(function (row) {
            row.cells.forEach(function (cell) {
                allBlocks.push.apply(allBlocks, cell.blocks);
            });
        });
        return allBlocks;
    };
    TableSelectionManager.prototype.getSelectedCellBlocks = function (tableBlock) {
        var tableBlockModel = getBlockModelById(tableBlock.id, this.parent.getEditorBlocks());
        var selectedCells = getSelectedCells(tableBlock);
        var selectedBlocks = [];
        selectedCells.forEach(function (cell) {
            if (cell.tagName === 'TH') {
                return;
            }
            var cellId = cell.querySelector("." + constants.TABLE_CELL_BLK_CONTAINER).id;
            var cellModel = findCellById(cellId, [tableBlockModel]);
            selectedBlocks.push.apply(selectedBlocks, cellModel.blocks);
        });
        return selectedBlocks;
    };
    TableSelectionManager.prototype.isCaretAtHeaderBoundary = function (th, edge) {
        var sel = this.parent.nodeSelection.getSelection();
        if (!sel || sel.rangeCount === 0) {
            return true;
        }
        var range = sel.getRangeAt(0);
        if (!th.contains(range.startContainer) || !th.contains(range.endContainer)) {
            return true;
        }
        // Compute start: at beginning of th
        if (edge === 'start') {
            return range.collapsed && range.startOffset === 0;
        }
        // Compute end: at end of th
        // Try to use endContainer length
        var endNodeText = (range.endContainer && (range.endContainer.textContent || '')) || '';
        if (range.endOffset === endNodeText.length && th.contains(range.endContainer)) {
            return true;
        }
        var thTextLen = (th.textContent || '').length;
        return thTextLen === 0 || range.toString().length === 0;
    };
    TableSelectionManager.prototype.shouldMoveHorizFromHeader = function (direction, headerCell) {
        return direction === 'left'
            ? this.isCaretAtHeaderBoundary(headerCell, 'start')
            : this.isCaretAtHeaderBoundary(headerCell, 'end');
    };
    TableSelectionManager.prototype.handleKeyDown = function (e) {
        var targetEl = e.target;
        var focusedBlk = this.parent.currentFocusedBlock;
        var tableBlockElement = targetEl.closest("." + constants.TABLE_BLOCK_CLS)
            || (focusedBlk && focusedBlk.closest("." + constants.TABLE_BLOCK_CLS));
        if (!tableBlockElement) {
            return;
        }
        if (focusedBlk && this.parent.eventAction.isAnyPopupOpen()) {
            return;
        }
        var table = tableBlockElement.querySelector('table');
        var cell = targetEl.closest('td, th')
            || tableBlockElement.querySelector('td.e-cell-focus, th.e-cell-focus')
            || focusedBlk.closest('td, th');
        if (!cell) {
            return;
        }
        var blockId = tableBlockElement.id || tableBlockElement.getAttribute('data-block-id');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        if (!block) {
            return;
        }
        var settings = block.properties;
        var totalRows = settings.rows.length + (settings.enableHeader ? 1 : 0);
        var totalCols = settings.columns.length;
        var rowIdx = parseInt(cell.dataset.row || '-1', 10);
        var colIdx = parseInt(cell.dataset.col || '-1', 10);
        var tableGripperPopup = this.parent.rootEditorElement.querySelector('.e-table-gripper-action-popup');
        if (tableGripperPopup && tableGripperPopup.classList.contains('e-popup-open') && e.key === 'Escape') {
            this.parent.observer.notify('handleEscapeKey');
            return;
        }
        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                this.moveFocus(table, rowIdx, colIdx, !e.shiftKey, block);
                break;
            case 'Escape':
                e.preventDefault();
                this.exitTableNavigation(table, 'forward');
                break;
            case 'Enter':
            case 'Backspace':
            case 'Delete': {
                if (!hasActiveTableSelection(tableBlockElement)) {
                    break;
                }
                e.preventDefault();
                e.stopPropagation();
                var targetCells_1 = Array.from(table.querySelectorAll("td." + constants.TABLE_CELL_FOCUS + ", th." + constants.TABLE_CELL_FOCUS));
                // Gripper fallback if no rectangle focus
                if (targetCells_1.length === 0) {
                    // From selected rows
                    table.querySelectorAll('tr.e-row-selected').forEach(function (tr) {
                        Array.from(tr.cells).forEach(function (cell) {
                            if (!cell.classList.contains('e-row-number')) {
                                targetCells_1.push(cell);
                            }
                        });
                    });
                    // From selected columns
                    table.querySelectorAll('td.e-col-selected, th.e-col-selected').forEach(function (cell) {
                        if (targetCells_1.indexOf(cell) === -1) {
                            targetCells_1.push(cell);
                        }
                    });
                }
                if (targetCells_1.length <= 1) {
                    break;
                }
                var uiManager_1 = this.parent.blockRenderer.tableRenderer.getManager(blockId);
                var allEmpty = targetCells_1.every(function (cell) { return (cell.textContent || '').trim() === ''; });
                if (!allEmpty) {
                    // 1st Delete → clear contents
                    this.parent.tableService.clearCellContents(table, targetCells_1);
                    // Refocus last cell
                    var lastCell = targetCells_1[targetCells_1.length - 1];
                    if (lastCell.tagName.toLowerCase() === 'td') {
                        this.parent.tableService.shiftFocusToBlockInCell(lastCell, true);
                    }
                    else {
                        setCursorPosition(lastCell, 0);
                    }
                    return;
                }
                this.parent.lastHighlightedBlockId = blockId;
                var shouldDeleteRows = false;
                var shouldDeleteCols_1 = false;
                var rowIndicesToDelete_1 = [];
                // Rectangle mode
                if (this.multiselectStartRow !== null &&
                    this.multiselectEndRow !== null &&
                    this.multiselectStartCol !== null &&
                    this.multiselectEndCol !== null) {
                    var minRow = Math.min(this.multiselectStartRow, this.multiselectEndRow);
                    var maxRow = Math.max(this.multiselectStartRow, this.multiselectEndRow);
                    var minCol = Math.min(this.multiselectStartCol, this.multiselectEndCol);
                    var maxCol = Math.max(this.multiselectStartCol, this.multiselectEndCol);
                    var isFullRow = minCol === 0 && maxCol >= totalCols - 1;
                    var isFullCol = minRow === 0 && maxRow >= totalRows - 1;
                    if (isFullRow) {
                        shouldDeleteRows = true;
                        for (var r = minRow; r <= maxRow; r++) {
                            rowIndicesToDelete_1.push(r);
                        }
                    }
                    if (isFullCol) {
                        shouldDeleteCols_1 = true;
                    }
                }
                // Gripper mode
                var selectedRows = table.querySelectorAll('tr.e-row-selected');
                if (selectedRows.length > 0) {
                    shouldDeleteRows = true;
                    Array.from(selectedRows).forEach(function (tr) {
                        var index = parseInt(tr.dataset.row || '-1', 10);
                        if (index >= 0 && rowIndicesToDelete_1.indexOf(index) === -1) {
                            rowIndicesToDelete_1.push(index);
                        }
                    });
                }
                var selectedColCells = table.querySelectorAll('td.e-col-selected, th.e-col-selected');
                if (selectedColCells.length > 0) {
                    var colCount_1 = new Map();
                    Array.from(selectedColCells).forEach(function (cell) {
                        var col = parseInt(cell.dataset.col || '-1', 10);
                        if (col >= 0) {
                            colCount_1.set(col, (colCount_1.get(col) || 0) + 1);
                        }
                    });
                    colCount_1.forEach(function (count) {
                        if (count >= totalRows - (settings.enableHeader ? 1 : 0)) {
                            shouldDeleteCols_1 = true;
                        }
                    });
                }
                // Execute deletion
                if (shouldDeleteCols_1 && uiManager_1) {
                    uiManager_1.deleteSelectedColumns();
                    this.multiselectStartRow = this.multiselectEndRow =
                        this.multiselectStartCol = this.multiselectEndCol = null;
                }
                else if (shouldDeleteRows && uiManager_1) {
                    rowIndicesToDelete_1.sort(function (a, b) { return b - a; }); // bottom to top
                    rowIndicesToDelete_1.forEach(function (rowIdx) {
                        uiManager_1.deleteSelectedRows(rowIdx);
                    });
                    this.multiselectStartRow = this.multiselectEndRow =
                        this.multiselectStartCol = this.multiselectEndCol = null;
                }
                // Always clean UI
                uiManager_1.hideRowGripper();
                uiManager_1.hideAllPinnedColBars();
                uiManager_1.handleRemovePopup();
                break;
            }
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight': {
                var direction = e.key.replace('Arrow', '').toLowerCase();
                if (e.shiftKey) {
                    if (!this.canAllowMultiSelection(cell, direction)) {
                        return;
                    }
                    this.parent.tableService.removeCellFocus(table);
                    if (this.multiselectStartRow == null || this.multiselectStartCol == null) {
                        this.multiselectStartRow = rowIdx;
                        this.multiselectStartCol = colIdx;
                    }
                    if (this.multiselectEndRow == null || this.multiselectEndCol == null) {
                        this.multiselectEndRow = rowIdx;
                        this.multiselectEndCol = colIdx;
                    }
                    e.preventDefault();
                    this.handleMultiselect(direction, table);
                    this.ensureCellVisible(table, getDataCell(table, this.multiselectEndRow, this.multiselectEndCol));
                    this.clearRangeAndSetCursor(table);
                }
                else {
                    // Clearing multi-select state
                    this.multiselectStartRow = null;
                    this.multiselectStartCol = null;
                    this.multiselectEndRow = null;
                    this.multiselectEndCol = null;
                    // Clear all row & column visual selections
                    var blockId_1 = table.getAttribute('data-block-id');
                    var uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId_1);
                    if (uiManager) {
                        uiManager.removeRowColSelection(table);
                        uiManager.hideRowGripper(); // Hides row pinned bars
                        uiManager.hideAllPinnedColBars(); // Hides col pinned bars
                        uiManager.handleRemovePopup(); // Closes any popup if open
                    }
                    var selectedCells = getSelectedCells(tableBlockElement);
                    var cellName = cell.tagName.toLowerCase();
                    if (hasActiveTableSelection(tableBlockElement) && (selectedCells && selectedCells.length > 1)) {
                        if (cellName === 'td') {
                            this.parent.tableService.shiftFocusToBlockInCell(cell);
                        }
                        else {
                            // keep caret inside header cell (TH)
                            var th = cell;
                            // default position: keep current if selection is already inside th,
                            // else move caret to end (right/down) or start (left/up)
                            var moveToEnd = false;
                            setCursorPosition(th, moveToEnd ? (th.textContent || '').length : 0);
                        }
                    }
                    var isHorizontal = direction === 'left' || direction === 'right';
                    if (isHorizontal) {
                        var isHeader = cellName === 'th';
                        var shouldMoveHoriz = isHeader
                            ? this.shouldMoveHorizFromHeader(direction, cell)
                            : this.shouldMoveToAdjacentCell(direction, this.parent.currentFocusedBlock, block);
                        if (shouldMoveHoriz) {
                            e.preventDefault();
                            this.parent.tableService.removeCellFocus(table);
                            this.moveCellFocus(table, rowIdx, colIdx, direction);
                        }
                    }
                    else {
                        // Vertical navigation (up/down)
                        var isHeaderCell = cellName === 'th';
                        // From any header cell, ArrowUp exits the table backward
                        if (isHeaderCell && direction === 'up') {
                            e.preventDefault();
                            this.parent.tableService.removeCellFocus(table);
                            this.exitTableNavigation(table, 'backward');
                            return;
                        }
                        // Use the TH itself as the source when in header (no inner block exists)
                        // Use the currentFocusedBlock only for TD cells
                        var sourceForNav = isHeaderCell
                            ? cell
                            : this.parent.currentFocusedBlock;
                        var nextCellEl = this.shouldMoveCellFocus(direction, sourceForNav, table);
                        if (nextCellEl) {
                            e.preventDefault();
                            this.parent.tableService.removeCellFocus(table);
                            this.moveCellFocus(table, rowIdx, colIdx, direction);
                        }
                        else {
                            // Consider exiting the table if:
                            // - caret is at the correct boundary of the current focused block, AND
                            // - there is no adjacent block inside this cell in that direction, AND
                            // - we are at the first/last table row.
                            var settings_1 = block.properties;
                            var totalRows_1 = settings_1.rows.length + (settings_1.enableHeader ? 1 : 0);
                            var atBoundary = isHeaderCell
                                ? (direction === 'up'
                                    ? this.isCaretAtHeaderBoundary(cell, 'start')
                                    : this.isCaretAtHeaderBoundary(cell, 'end'))
                                : (direction === 'up'
                                    ? isAtStartOfBlock(this.parent.currentFocusedBlock)
                                    : isAtEndOfBlock(this.parent.currentFocusedBlock));
                            var isEdgeRow = direction === 'up'
                                ? rowIdx === 0
                                : rowIdx === (totalRows_1 - 1);
                            // For headers, there is no inner adjacent block constraint
                            var hasAdjacentBlockInCell = isHeaderCell
                                ? false
                                : !!getAdjacentBlock(this.parent.currentFocusedBlock, direction === 'up' ? 'previous' : 'next');
                            if (atBoundary && isEdgeRow && !hasAdjacentBlockInCell) {
                                e.preventDefault();
                                this.exitTableNavigation(table, direction === 'up' ? 'backward' : 'forward');
                                return;
                            }
                        }
                    }
                }
                break;
            }
        }
    };
    TableSelectionManager.prototype.clearRangeAndSetCursor = function (tableEle) {
        this.parent.nodeSelection.clearSelection();
        var lastSelectedCell = getDataCell(tableEle, this.multiselectEndRow, this.multiselectEndCol);
        if (lastSelectedCell) {
            setCursorPosition(lastSelectedCell, 0);
        }
    };
    TableSelectionManager.prototype.shouldMoveCellFocus = function (direction, cellBlock, table) {
        var isUp = direction === 'up';
        var isDown = direction === 'down';
        var isLeft = direction === 'left';
        if (!cellBlock) {
            return null;
        }
        var hostCell = cellBlock.closest('td, th');
        if (!hostCell) {
            return null;
        }
        var isHeader = hostCell.tagName.toLowerCase() === 'th';
        if (!isHeader) {
            var adjacentBlock = getAdjacentBlock(cellBlock, (isUp || isLeft) ? 'previous' : 'next');
            if (adjacentBlock) {
                return null;
            }
        }
        if (isUp || isDown) {
            return getAdjacentCell(table, direction, hostCell);
        }
        return null;
    };
    // Move to adjacent cell only when,
    // * caret is at boundary AND there is no adjacent block inside the cell
    // * cell is empty
    TableSelectionManager.prototype.shouldMoveToAdjacentCell = function (direction, cellBlock, blockModel) {
        var atStart = isAtStartOfBlock(cellBlock);
        var atEnd = isAtEndOfBlock(cellBlock);
        var isEmptyCell = cellBlock.textContent.trim() === '';
        if (isEmptyCell) {
            return true;
        }
        if (direction === 'left') {
            var prev = getAdjacentBlock(cellBlock, 'previous');
            var firstCellBlockId = blockModel.properties.rows[0].cells[0].blocks[0].id;
            return atStart && !prev && (cellBlock.id !== firstCellBlockId);
        }
        var next = getAdjacentBlock(cellBlock, 'next');
        return atEnd && !next;
    };
    // Helpers for keyboard shift selection behavior
    TableSelectionManager.prototype.isSelectionWithinCell = function (cell) {
        var sel = this.parent.nodeSelection.getSelection();
        var anchorNode = sel.anchorNode;
        var focusNode = sel.focusNode;
        return cell.contains(anchorNode) && cell.contains(focusNode);
    };
    TableSelectionManager.prototype.getCellBlockContentElements = function (cell) {
        var blocks = Array.from(cell.querySelectorAll('.e-block'));
        var contents = blocks
            .map(function (b) { return getBlockContentElement(b); })
            .filter(function (el) { return !!el; });
        return contents;
    };
    TableSelectionManager.prototype.canAllowMultiSelection = function (cell, direction) {
        if (this.multiselectEndRow || this.multiselectEndCol) {
            return true;
        }
        var sel = window.getSelection && window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            return false;
        }
        if (!this.isSelectionWithinCell(cell)) {
            return false;
        }
        var isLeft = direction === 'left';
        var isRight = direction === 'right';
        var isUpDown = direction === 'up' || direction === 'down';
        var range = sel.getRangeAt(0);
        if (cell.tagName === 'TH') {
            var startsAtFirst_1 = range.startOffset === 0 && (isLeft || isUpDown);
            var endsAtLast_1 = range.endOffset === cell.textContent.length && (isRight || isUpDown);
            return startsAtFirst_1 || endsAtLast_1;
        }
        var contents = this.getCellBlockContentElements(cell);
        var isFirstTextNode = (!contents[0].firstChild ||
            (contents[0].firstChild && contents[0].firstChild.nodeType === Node.TEXT_NODE));
        var firstChild = isFirstTextNode
            ? contents[0]
            : contents[0].firstChild;
        var lastContent = contents[contents.length - 1];
        var isLastTextNode = (!lastContent.lastChild ||
            (lastContent.lastChild && lastContent.lastChild.nodeType === Node.TEXT_NODE));
        var lastChild = isLastTextNode
            ? lastContent
            : lastContent.lastChild;
        var expectedStartNode = getDeepestTextNode(firstChild) || contents[0];
        var expectedEndNode = getDeepestTextNode(lastChild) || lastContent;
        var startsAtFirst = (expectedStartNode && expectedStartNode.contains(range.startContainer) &&
            range.startOffset === 0 && (isLeft || isUpDown));
        var endsAtLast = (expectedEndNode && expectedEndNode.contains(range.endContainer) &&
            range.endOffset === lastChild.textContent.length && (isRight || isUpDown));
        return startsAtFirst || endsAtLast;
    };
    TableSelectionManager.prototype.handleMultiselect = function (direction, table) {
        if (this.multiselectEndRow == null || this.multiselectEndCol == null) {
            return;
        }
        var blockId = table.getAttribute('data-block-id');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var settings = block.properties;
        var totalRows = (settings.rows).length + (settings.enableHeader ? 1 : 0);
        var totalCols = (settings.columns).length;
        var newEndRow = this.multiselectEndRow;
        var newEndCol = this.multiselectEndCol;
        switch (direction) {
            case 'up':
                newEndRow = Math.max(0, newEndRow - 1);
                break;
            case 'down':
                newEndRow = Math.min(totalRows - 1, newEndRow + 1);
                break;
            case 'left':
                newEndCol = Math.max(0, newEndCol - 1);
                break;
            case 'right':
                newEndCol = Math.min(totalCols - 1, newEndCol + 1);
                break;
        }
        this.updateRectangleFocus(this.multiselectStartRow, this.multiselectStartCol, newEndRow, newEndCol, table);
        this.multiselectEndRow = newEndRow;
        this.multiselectEndCol = newEndCol;
        // clear previous row/column selections
        var uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
        if (uiManager) {
            uiManager.removeRowColSelection(table);
            uiManager.hideRowGripper();
            uiManager.hideAllPinnedColBars();
        }
        var minRow = Math.min(this.multiselectStartRow, this.multiselectEndRow);
        var maxRow = Math.max(this.multiselectStartRow, this.multiselectEndRow);
        var minCol = Math.min(this.multiselectStartCol, this.multiselectEndCol);
        var maxCol = Math.max(this.multiselectStartCol, this.multiselectEndCol);
        // Re-check if full row selection (all columns selected)
        var isFullRowSelection = minCol === 0 && maxCol >= totalCols - 1;
        if (isFullRowSelection && uiManager) {
            var first = true;
            for (var r = minRow; r <= maxRow; r++) {
                uiManager.addRowSelection(table, r);
                uiManager.showRowGripperForDomRow(r, first);
                first = false;
            }
        }
        // Re-check if full column selection (all rows selected)
        var isFullColumnSelection = minRow === 0 && maxRow >= totalRows - 1;
        if (isFullColumnSelection && uiManager) {
            var first = true;
            for (var c = minCol; c <= maxCol; c++) {
                uiManager.addColumnSelection(table, c);
                uiManager.showColGripperForDomCol(c, first);
                first = false;
            }
        }
        if (!isFullRowSelection && !isFullColumnSelection) {
            uiManager.handleRemovePopup(); // Close popup when shrunk to single cell
        }
        this.ensureCellVisible(table, getDataCell(table, this.multiselectEndRow, this.multiselectEndCol));
        this.clearRangeAndSetCursor(table);
    };
    TableSelectionManager.prototype.moveCellFocus = function (table, rowIdx, colIdx, direction) {
        var blockId = table.getAttribute('data-block-id');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var settings = block.properties;
        var totalRows = (settings.rows).length + (settings.enableHeader ? 1 : 0);
        var totalCols = (settings.columns).length;
        var targetRow = rowIdx;
        var targetCol = colIdx;
        switch (direction) {
            case 'up':
                if (rowIdx > 0) {
                    targetRow = rowIdx - 1;
                }
                break;
            case 'down':
                if (rowIdx + 1 < totalRows) {
                    targetRow = rowIdx + 1;
                }
                break;
            case 'left':
                if (colIdx > 0) {
                    targetCol = colIdx - 1;
                }
                else if (rowIdx > 0) {
                    targetRow = rowIdx - 1;
                    targetCol = totalCols - 1;
                }
                break;
            case 'right':
                if (colIdx + 1 < totalCols) {
                    targetCol = colIdx + 1;
                }
                else if (rowIdx + 1 < totalRows) {
                    targetRow = rowIdx + 1;
                    targetCol = 0;
                }
                break;
        }
        if (targetRow === rowIdx && targetCol === colIdx) {
            return;
        }
        var domCol = toDomCol(targetCol, settings.enableRowNumbers);
        var rowEl = table.rows[targetRow];
        var nextCell = rowEl && rowEl.cells[domCol];
        var cursorAtStart = direction === 'right' || direction === 'up' || direction === 'down';
        if (nextCell) {
            this.parent.tableService.removeCellFocus(table);
            this.parent.tableService.addCellFocus(nextCell, true, cursorAtStart);
            // Ensure focused cell is visible when navigating with arrow keys
            this.ensureCellVisible(table, nextCell);
            // If header cell, set caret directly in TH so cursor doesn’t remain in previous row’s TD
            if (nextCell.tagName && nextCell.tagName.toLowerCase() === 'th') {
                var th_1 = nextCell;
                var placeAtEnd_1 = direction === 'left' ? true : false; // moving left -> end, right -> start
                // For vertical moves, default to start
                requestAnimationFrame(function () {
                    setCursorPosition(th_1, placeAtEnd_1 ? (th_1.textContent).length : 0);
                });
            }
        }
    };
    TableSelectionManager.prototype.updateRectangleFocus = function (row1, col1, row2, col2, table) {
        var blockId = table.getAttribute('data-block-id');
        var block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        var settings = block.properties;
        this.parent.tableService.removeCellFocus(table);
        var minRow = Math.min(row1, row2);
        var maxRow = Math.max(row1, row2);
        var minCol = Math.min(col1, col2);
        var maxCol = Math.max(col1, col2);
        for (var r = minRow; r <= maxRow; r++) {
            var tr = table.rows[r];
            for (var c = minCol; c <= maxCol; c++) {
                var domCol = toDomCol(c, settings.enableRowNumbers);
                var cellEl = tr.cells[domCol];
                if (cellEl) {
                    cellEl.classList.add(constants.TABLE_CELL_FOCUS);
                }
            }
        }
    };
    TableSelectionManager.prototype.moveFocus = function (table, row, col, forward, block) {
        var settings = block.properties;
        this.parent.tableService.removeCellFocus(table);
        var headerOffset = settings.enableHeader ? 1 : 0;
        var totalRows = (settings.rows).length + headerOffset;
        var totalCols = (settings.columns).length;
        var nextRow = row;
        var nextCol = col;
        if (forward) {
            nextCol++;
            if (nextCol >= totalCols) {
                nextRow++;
            }
        }
        else {
            nextCol--;
            if (nextCol < 0) {
                nextRow--;
            }
        }
        // Forward past the last cell -> add a new row
        if (nextRow >= totalRows && nextCol >= totalCols) {
            // Add new row and focus its first cell
            this.parent.tableService.addRowAt({
                blockId: block.id,
                rowIndex: totalRows - headerOffset
            });
            var newLastRow = table.rows[table.rows.length - 1];
            this.parent.tableService.addCellFocus(newLastRow.cells[toDomCol(0, settings.enableRowNumbers)], true);
            return;
        }
        // Backward past the header (or top when no header) -> exit table
        // Note: only exit when we went before row 0 entirely.
        if (!forward && nextRow < 0 && nextCol < 0) {
            this.exitTableNavigation(table, 'backward');
            return;
        }
        // Clamp candidate row into [0, totalRows-1] to allow selecting header row as well
        var targetDOMRowIndex = Math.max(0, Math.min(nextRow, totalRows - 1));
        var rowElement = table.rows[targetDOMRowIndex];
        if (rowElement && nextCol >= 0 && nextCol < totalCols) {
            var domCol = toDomCol(nextCol, settings.enableRowNumbers);
            var targetCell = rowElement.cells[domCol];
            if (targetCell) {
                this.parent.tableService.addCellFocus(targetCell, true);
                this.ensureCellVisible(table, targetCell);
                if (targetCell.tagName.toLowerCase() === 'th') {
                    var th_2 = targetCell;
                    // For Tab forward, place at start; for Shift+Tab, place at end
                    requestAnimationFrame(function () {
                        setCursorPosition(th_2, forward ? 0 : (th_2.textContent || '').length);
                    });
                }
                return;
            }
        }
        if (forward && targetDOMRowIndex < totalRows) {
            var domCol = toDomCol(0, settings.enableRowNumbers);
            var fallbackCell = table.rows[targetDOMRowIndex].cells[domCol];
            this.parent.tableService.addCellFocus(fallbackCell, true);
            this.ensureCellVisible(table, fallbackCell);
            if (fallbackCell && fallbackCell.tagName.toLowerCase() === 'th') {
                var th_3 = fallbackCell;
                requestAnimationFrame(function () { return setCursorPosition(th_3, 0); });
            }
        }
        else if (!forward && targetDOMRowIndex >= 0) {
            var domCol = toDomCol(totalCols - 1, settings.enableRowNumbers);
            var fallbackCell = table.rows[targetDOMRowIndex].cells[domCol];
            this.parent.tableService.addCellFocus(fallbackCell, true);
            this.ensureCellVisible(table, fallbackCell);
            if (fallbackCell && fallbackCell.tagName.toLowerCase() === 'th') {
                var th_4 = fallbackCell;
                requestAnimationFrame(function () { return setCursorPosition(th_4, (th_4.textContent || '').length); });
            }
        }
    };
    TableSelectionManager.prototype.exitTableNavigation = function (table, direction) {
        var blockEl = table.closest('.e-block');
        var nextBlock = (direction === 'forward'
            ? blockEl.nextElementSibling : blockEl.previousElementSibling);
        if (nextBlock) {
            setCursorPosition(getBlockContentElement(nextBlock), 0);
            this.parent.setFocusToBlock(nextBlock);
            this.parent.tableService.removeCellFocus(table);
        }
    };
    TableSelectionManager.prototype.destroy = function () {
        this.removeEventListener();
    };
    return TableSelectionManager;
}());
export { TableSelectionManager };
