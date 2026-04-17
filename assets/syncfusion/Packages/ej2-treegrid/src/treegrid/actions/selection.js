import { isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { parentsUntil, getObject } from '@syncfusion/ej2-grids';
import * as events from '../base/constant';
import { getParentData, isRemoteData, isCheckboxcolumn } from '../utils';
/**
 * TreeGrid Selection module
 *
 * @hidden
 */
var Selection = /** @class */ (function () {
    /**
     * Creates an instance of Selection.
     *
     * @param {TreeGrid} parent - The TreeGrid instance this selection module is associated with.
     */
    function Selection(parent) {
        this.headerCheckboxFrameEl = null;
        this.checkboxColIndexCache = -2;
        this.parentSelectionCounters = {};
        this.selectedUidMap = new Map(); // Quick lookup for whether an item is selected
        this.totalSelectableCount = 0;
        this.headerSelectionState = 'uncheck';
        this.checkedItemCount = 0;
        this.visibleUidIndex = {};
        this.parent = parent;
        this.selectedItems = [];
        this.selectedIndexes = []; // Initialize here
        this.filteredList = [];
        this.searchingRecords = [];
        this.addEventListener();
    }
    /**
     * Gets the module name.
     *
     * @returns {string} The name of the module ('selection').
     */
    Selection.prototype.getModuleName = function () { return 'selection'; };
    /**
     * Builds a map from visible record uniqueID to its visible index.
     * This map is crucial for finding the *current visible index* of a record.
     *
     * @returns {void}
     */
    Selection.prototype.buildVisibleUidMap = function () {
        this.visibleUidIndex = {};
        var view = this.parent.grid.currentViewData;
        if (!view) {
            return;
        }
        for (var i = 0, len = view.length; i < len; i++) {
            var rec = view[parseInt(i.toString(), 10)];
            if (rec && rec.uniqueID) {
                this.visibleUidIndex[rec.uniqueID] = i; // Map uid -> visible row index
            }
        }
    };
    /**
     * Adds required event listeners for selection handling.
     *
     * @returns {void}
     */
    Selection.prototype.addEventListener = function () {
        this.parent.on('dataBoundArg', this.headerCheckbox, this);
        this.parent.on('columnCheckbox', this.columnCheckbox, this);
        this.parent.on('updateGridActions', this.updateGridActions, this);
        this.parent.grid.on('colgroup-refresh', this.headerCheckbox, this);
        this.parent.on('checkboxSelection', this.checkboxSelection, this);
    };
    /**
     * Removes previously added event listeners.
     *
     * @returns {void}
     */
    Selection.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('dataBoundArg', this.headerCheckbox);
        this.parent.off('columnCheckbox', this.columnCheckbox);
        this.parent.grid.off('colgroup-refresh', this.headerCheckbox);
        this.parent.off('checkboxSelection', this.checkboxSelection);
        this.parent.off('updateGridActions', this.updateGridActions);
    };
    /**
     * Destroys the selection module and clears internal caches.
     *
     * @returns {void}
     */
    Selection.prototype.destroy = function () {
        this.resetSelectionCaches();
        this.removeEventListener();
    };
    /**
     * Handles checkbox click events from the DOM and dispatches selection logic.
     *
     * @param {Object} args - Event args containing the click target.
     * @returns {void}
     */
    Selection.prototype.checkboxSelection = function (args) {
        var _a;
        var target = getObject('target', args);
        var checkWrap = parentsUntil(target, 'e-checkbox-wrapper');
        var checkBox;
        if (checkWrap && checkWrap.querySelectorAll('.e-treecheckselect').length > 0) {
            checkBox = checkWrap.querySelector('input[type="checkbox"]');
            var rowIndex = [];
            if (this.parent.frozenRows) {
                rowIndex.push(parseInt(target.closest('tr').getAttribute('aria-rowindex'), 10) - 1);
            }
            else {
                rowIndex.push(target.closest('tr').rowIndex);
            }
            this.selectCheckboxes(rowIndex);
            var newCheckState = checkBox.nextElementSibling.classList.contains('e-check');
            this.triggerChkChangeEvent(checkBox, newCheckState, target.closest('tr'));
        }
        else if (checkWrap && checkWrap.querySelectorAll('.e-treeselectall').length > 0 && this.parent.autoCheckHierarchy) {
            var frame = checkWrap.querySelector('.e-frame');
            var currentStateIsUncheck = !frame.classList.contains('e-check') && !frame.classList.contains('e-stop');
            var targetState = currentStateIsUncheck; // If currently uncheck, target state is to check all.
            this.headerSelection(targetState);
            checkBox = checkWrap.querySelector('input[type="checkbox"]');
            this.triggerChkChangeEvent(checkBox, targetState, target.closest('tr'));
        }
        if (!isNullOrUndefined(this.parent['parentQuery']) && this.parent.selectionSettings.persistSelection
            && this.parent['columnModel'].filter(function (col) { return col.type === 'checkbox'; }).length > 0
            && isRemoteData(this.parent)) {
            if (this.parent['parentQuery'].length > 0) {
                (_a = this.parent.query.queries).push.apply(_a, this.parent['parentQuery']);
                this.parent['parentQuery'] = [];
            }
        }
    };
    /**
     * Triggers the checkboxChange event with the appropriate arguments.
     *
     * @param {HTMLInputElement} checkBox - The checkbox input element that changed.
     * @param {boolean} checkState - The new checked state.
     * @param {HTMLTableRowElement} rowElement - The row element where the change occurred.
     * @returns {void}
     */
    Selection.prototype.triggerChkChangeEvent = function (checkBox, checkState, rowElement) {
        var data = this.parent.getCurrentViewRecords()[rowElement.rowIndex];
        var args = {
            checked: checkState, target: checkBox, rowElement: rowElement,
            rowData: checkBox.classList.contains('e-treeselectall')
                ? this.parent.getCheckedRecords() : data
        };
        this.parent.trigger(events.checkboxChange, args);
    };
    /**
     * Determines the index of the checkbox column in the header.
     *
     * @returns {number} The index of the checkbox column, or -1 if not found.
     */
    Selection.prototype.getCheckboxcolumnIndex = function () {
        if (this.checkboxColIndexCache !== -2) {
            return this.checkboxColIndexCache;
        }
        var mappingUid;
        var columnIndex = -1;
        var stackedHeader = 'stackedHeader';
        var columnModel = 'columnModel';
        var columns = this.parent["" + stackedHeader] ? this.parent["" + columnModel] : (this.parent.columns);
        for (var col = 0; col < columns.length; col++) {
            if (columns[parseInt(col.toString(), 10)].showCheckbox) {
                mappingUid = columns[parseInt(col.toString(), 10)].uid;
                break;
            }
        }
        var headerDivs = this.parent.getHeaderContent().querySelectorAll('.e-headercelldiv');
        for (var j = 0; j < headerDivs.length; j++) {
            var headercell = headerDivs[parseInt(j.toString(), 10)];
            if (headercell.getAttribute('data-mappinguid') === mappingUid) {
                columnIndex = j;
                break;
            }
        }
        this.checkboxColIndexCache = isNullOrUndefined(columnIndex) ? -1 : columnIndex;
        return this.checkboxColIndexCache;
    };
    /**
     * Renders and initializes the header checkbox element.
     *
     * @returns {void}
     */
    Selection.prototype.headerCheckbox = function () {
        this.buildVisibleUidMap();
        this.totalSelectableCount = this.countSelectableRecords(this.resolveHeaderSelectionList(true)); // Use all flatData for initial count
        this.columnIndex = this.getCheckboxcolumnIndex();
        if (this.columnIndex > -1) {
            var headerElement = this.parent.getHeaderContent().querySelectorAll('.e-headercelldiv')[this.columnIndex];
            if (headerElement && headerElement.querySelectorAll('.e-treeselectall').length === 0) {
                var value = false; // Initial state can be false.
                var rowChkBox = this.parent.createElement('input', { className: 'e-treeselectall', attrs: { 'type': 'checkbox' } });
                var checkWrap = createCheckBox(this.parent.createElement, false, { checked: value, label: ' ' });
                checkWrap.classList.add('e-hierarchycheckbox');
                checkWrap.insertBefore(rowChkBox.cloneNode(), checkWrap.firstChild);
                if (!isNullOrUndefined(headerElement)) {
                    headerElement.insertBefore(checkWrap, headerElement.firstChild);
                }
                this.headerCheckboxFrameEl = checkWrap.querySelector('.e-frame'); // Assign the frame element
                if (this.parent.autoCheckHierarchy) {
                    this.headerSelection();
                } // Update header state based on data
            }
            else if (headerElement && headerElement.querySelectorAll('.e-treeselectall').length > 0) {
                this.headerCheckboxFrameEl = headerElement.querySelector('.e-frame');
                if (this.parent.autoCheckHierarchy) {
                    this.headerSelection();
                } // Update status based on current selections
            }
        }
    };
    /**
     * Renders a checkbox element for a column cell.
     *
     * @param {QueryCellInfoEventArgs} args - The QueryCellInfoEventArgs for the cell.
     * @returns {Element} The rendered checkbox wrapper element.
     */
    Selection.prototype.renderColumnCheckbox = function (args) {
        var rowChkBox = this.parent.createElement('input', { className: 'e-treecheckselect', attrs: { 'type': 'checkbox', 'aria-label': 'checkbox' } });
        var data = args.data;
        args.cell.classList.add('e-treegridcheckbox');
        args.cell.setAttribute('aria-label', 'checkbox');
        var value = (data.checkboxState === 'check');
        var checkWrap = createCheckBox(this.parent.createElement, false, { checked: value, label: ' ' });
        checkWrap.classList.add('e-hierarchycheckbox');
        if (this.parent.allowTextWrap) {
            checkWrap.querySelector('.e-frame').style.width = '18px';
        }
        if (data.checkboxState === 'indeterminate') {
            var checkbox = checkWrap.querySelectorAll('.e-frame')[0];
            removeClass([checkbox], ['e-check', 'e-stop', 'e-uncheck']);
            checkWrap.querySelector('.e-frame').classList.add('e-stop');
        }
        else if (data.checkboxState === 'uncheck') {
            var checkbox = checkWrap.querySelectorAll('.e-frame')[0];
            removeClass([checkbox], ['e-check', 'e-stop', 'e-uncheck']);
            checkWrap.querySelector('.e-frame').classList.add('e-uncheck');
        }
        else if (data.checkboxState === 'check') {
            var checkbox = checkWrap.querySelectorAll('.e-frame')[0];
            removeClass([checkbox], ['e-check', 'e-stop', 'e-uncheck']);
            checkWrap.querySelector('.e-frame').classList.add('e-check');
        }
        checkWrap.insertBefore(rowChkBox.cloneNode(), checkWrap.firstChild);
        return checkWrap;
    };
    /**
     * Injects the checkbox into a column cell during QueryCellInfo.
     *
     * @param {QueryCellInfoEventArgs} container - The cell event args.
     * @returns {void}
     */
    Selection.prototype.columnCheckbox = function (container) {
        var checkWrap = this.renderColumnCheckbox(container);
        var containerELe = container.cell.querySelector('.e-treecolumn-container');
        if (!isNullOrUndefined(containerELe)) {
            if (!container.cell.querySelector('.e-hierarchycheckbox')) {
                containerELe.insertBefore(checkWrap, containerELe.querySelectorAll('.e-treecell')[0]);
            }
        }
        else {
            var spanEle = this.parent.createElement('span', { className: 'e-treecheckbox' });
            var data = container.cell.innerHTML;
            container.cell.innerHTML = '';
            spanEle.innerHTML = data;
            var divEle = this.parent.createElement('div', { className: 'e-treecheckbox-container' });
            divEle.appendChild(checkWrap);
            divEle.appendChild(spanEle);
            container.cell.appendChild(divEle);
        }
    };
    /**
     * Selects or toggles checkboxes for the provided row indexes.
     *
     * @param {number[]} rowIndexes - Array of row indexes to toggle selection for.
     * @returns {void}
     */
    Selection.prototype.selectCheckboxes = function (rowIndexes) {
        for (var i = 0; i < rowIndexes.length; i++) {
            var viewRec = this.parent.getCurrentViewRecords()[rowIndexes[parseInt(i.toString(), 10)]];
            var flatRec = getParentData(this.parent, viewRec.uniqueID);
            var nextState = (flatRec.checkboxState === 'check') ? 'uncheck' : 'check';
            flatRec.checkboxState = nextState;
            this.traverSelection(flatRec, nextState, false);
        }
    };
    /**
     * Traverses selection for a record and cascades selections to children/parents as necessary.
     *
     * @param {ITreeData} record - The record to process.
     * @param {string} checkboxState - The desired checkbox state ('check'|'uncheck'|'indeterminate').
     * @param {boolean} isChildItem - True if this invocation is for a child during recursion.
     * @returns {void}
     */
    Selection.prototype.traverSelection = function (record, checkboxState, isChildItem) {
        var previousState = record.checkboxState;
        if (!isChildItem) {
            this.buildVisibleUidMap();
        }
        var effectiveChildren = Array.isArray(record.childRecords) ? record.childRecords : [];
        if ((!effectiveChildren || effectiveChildren.length === 0) && this.parent.autoCheckHierarchy) {
            effectiveChildren = this.getChildrenFromFlat(record);
        }
        if (this.parent.filterModule && this.parent.filterModule.filteredResult.length > 0
            && effectiveChildren && effectiveChildren.length) {
            effectiveChildren = this.getFilteredChildRecords(effectiveChildren);
        }
        if (!this.parent.autoCheckHierarchy || !effectiveChildren || effectiveChildren.length === 0) {
            this.updateSelectedItems(record, checkboxState);
            if (!isChildItem) {
                if (record.parentItem && this.parent.autoCheckHierarchy) {
                    this.updateParentSelection(record.parentItem);
                }
                this.updateSelectedCollectionsAfterBulk(this.resolveHeaderSelectionList(), '');
                this.refreshVisibleCheckboxes();
                if (this.parent.autoCheckHierarchy) {
                    this.updateHeaderCheckboxState();
                }
            }
            return;
        }
        var childCount = 0;
        var checkedCount = 0;
        var indeterminateCount = 0;
        for (var i = 0; i < effectiveChildren.length; i++) {
            var child = effectiveChildren[parseInt(i.toString(), 10)];
            if (!child || child.isSummaryRow) {
                continue;
            }
            childCount++;
            this.updateSelectedItems(child, checkboxState, true);
            if (child.hasChildRecords) {
                this.traverSelection(child, checkboxState, true);
            }
            if (child.checkboxState === 'check') {
                checkedCount++;
            }
            else if (child.checkboxState === 'indeterminate') {
                indeterminateCount++;
            }
        }
        if (record.uniqueID) {
            this.parentSelectionCounters[record.uniqueID] = {
                total: childCount,
                checked: checkedCount,
                indeterminate: indeterminateCount
            };
        }
        var summary = this.parentSelectionCounters[record.uniqueID];
        var finalState = this.deriveParentState(record, summary);
        if (checkboxState === 'check' && summary.total > 0 && summary.checked === summary.total && summary.indeterminate === 0) {
            finalState = 'check';
        }
        this.updateSelectedItems(record, finalState);
        if (!isChildItem && record.parentItem && this.parent.autoCheckHierarchy) {
            this.updateParentSelection(record.parentItem, previousState, finalState);
        }
        if (!isChildItem) {
            var bulkList = this.resolveHeaderSelectionList();
            this.updateSelectedCollectionsAfterBulk(bulkList, ''); // This will rebuild selectedItems & selectedIndexes based on total state
            this.refreshVisibleCheckboxes();
            this.updateHeaderCheckboxState();
        }
    };
    /**
     * Filters provided child records against the current filter result.
     *
     * @param {ITreeData[]} childRecords - The array of child records to filter.
     * @returns {ITreeData[]} The filtered child records array.
     */
    Selection.prototype.getFilteredChildRecords = function (childRecords) {
        var _this = this;
        var filteredChildRecords = childRecords.filter(function (e) {
            return _this.parent.filterModule.filteredResult.indexOf(e) > -1;
        });
        return filteredChildRecords;
    };
    /**
     * Derives children for a record from flatData using the parentItem link.
     * Used when childRecords is missing or empty.
     *
     * @param {ITreeData} record - The record for which to find child elements.
     * @returns {ITreeData[]} An array of child records derived from flatData.
     */
    Selection.prototype.getChildrenFromFlat = function (record) {
        var all = (this.parent.flatData);
        if (!all || !record) {
            return [];
        }
        var pid = record.uniqueID;
        var out = [];
        for (var i = 0; i < all.length; i++) {
            var r = all[parseInt(i.toString(), 10)];
            if (!r || r.isSummaryRow) {
                continue;
            }
            var p = r.parentItem;
            if (p && p.uniqueID === pid) {
                out.push(r);
            }
        }
        return out;
    };
    /**
     * Updates parent selection by rebuilding summary and applying deltas, then bubbling up if required.
     *
     * @param {ITreeData} parentRecord - The parent record reference.
     * @param {string} [previousChildState] - Previous state of the child that changed.
     * @param {string} [nextChildState] - Next state of the child that changed.
     * @returns {void}
     */
    Selection.prototype.updateParentSelection = function (parentRecord, previousChildState, nextChildState) {
        var parent = getParentData(this.parent, parentRecord.uniqueID);
        if (!parent) {
            return;
        }
        var summary = this.buildSelectionSummary(parent);
        if (previousChildState) {
            this.applySummaryDelta(summary, previousChildState, -1);
        }
        if (nextChildState) {
            this.applySummaryDelta(summary, nextChildState, 1);
        }
        if (parent.uniqueID) {
            this.parentSelectionCounters[parent.uniqueID] = summary;
        }
        var desiredState = this.deriveParentState(parent, summary);
        if (parent.checkboxState === desiredState) {
            return;
        }
        var parentPrev = parent.checkboxState;
        parent.checkboxState = desiredState;
        this.updateSelectedItems(parent, desiredState);
        if (parent.parentItem) {
            this.updateParentSelection(parent.parentItem, parentPrev, desiredState);
        }
    };
    /**
     * Builds a selection summary for a record's children.
     *
     * @param {Object} record - The record whose children should be summarized.
     * @param {boolean} [ignoreFilter] - If true, ignore current filter when computing summary.
     * @returns {{ total: number, checked: number, indeterminate: number }} The computed summary.
     */
    Selection.prototype.buildSelectionSummary = function (record, ignoreFilter) {
        var summary = { total: 0, checked: 0, indeterminate: 0 };
        var children = [];
        if (record && Array.isArray(record.childRecords) && record.childRecords.length) {
            children = record.childRecords;
        }
        else {
            children = this.getChildrenFromFlat(record);
        }
        if (!ignoreFilter && this.parent.filterModule && this.parent.filterModule.filteredResult.length > 0) {
            children = this.getFilteredChildRecords(children);
        }
        for (var i = 0; i < children.length; i++) {
            var child = children[parseInt(i.toString(), 10)];
            if (!child || child.isSummaryRow) {
                continue;
            }
            summary.total++;
            if (child.checkboxState === 'check') {
                summary.checked++;
            }
            else if (child.checkboxState === 'indeterminate') {
                summary.indeterminate++;
            }
        }
        return summary;
    };
    /**
     * Applies a delta to a selection summary based on a state change.
     *
     * @param {Object} summary - The summary to modify. Object with numeric properties: total, checked, indeterminate.
     * @param {string} state - The state that changed ('check' | 'indeterminate').
     * @param {number} delta - The delta to apply (e.g. +1 or -1).
     * @returns {void}
     */
    Selection.prototype.applySummaryDelta = function (summary, state, delta) {
        if (state === 'check') {
            summary.checked = Math.max(0, summary.checked + delta);
        }
        else if (state === 'indeterminate') {
            summary.indeterminate = Math.max(0, summary.indeterminate + delta);
        }
    };
    /**
     * Derives the parent's checkbox state based on children summary counts.
     *
     * @param {ITreeData} record The parent record.
     * @param {{ total: number, checked: number, indeterminate: number }} summary The children summary.
     * @returns {'check'|'indeterminate'|'uncheck'} The derived checkbox state.
     */
    Selection.prototype.deriveParentState = function (record, summary) {
        var total = summary.total;
        var checked = summary.checked;
        var indeterminate = summary.indeterminate;
        if (indeterminate > 0 || (checked > 0 && checked !== total)) {
            return 'indeterminate';
        }
        if (checked === total && total > 0) {
            return 'check';
        }
        return 'uncheck';
    };
    /**
     * Handles header checkbox (select all / clear all) behavior.
     *
     * @param {boolean} [checkAll] - Optional explicit flag to check or uncheck all.
     * @returns {void}
     */
    Selection.prototype.headerSelection = function (checkAll) {
        if (!isNullOrUndefined(this.parent.filterModule) && this.parent.filterModule.filteredResult.length > 0) {
            var filterResult = this.parent.filterModule.filteredResult;
            if (this.filteredList.length === 0) {
                this.filteredList = filterResult;
            }
            if (this.parent.grid.searchSettings.key.length) {
                this.searchingRecords = filterResult;
            }
            else {
                if (this.filteredList !== filterResult && !this.parent.grid.searchSettings.key.length) {
                    this.filteredList = filterResult;
                    this.searchingRecords = [];
                }
            }
        }
        if (this.searchingRecords.length > 0 && !isNullOrUndefined(checkAll)) {
            this.filteredList = this.searchingRecords;
        }
        else if (this.filteredList.length > 0 && !this.parent.filterSettings.columns.length
            && !this.parent.grid.searchSettings.key.length) {
            this.filteredList = [];
        }
        var records = this.resolveHeaderSelectionList(true);
        if (!isNullOrUndefined(checkAll)) {
            this.resetSelectionCaches();
            var targetState = checkAll ? 'check' : 'uncheck';
            this.headerSelectionState = targetState;
            this.processHeaderSelection(records, targetState);
            this.finalizeParentsAfterBulk(records);
            this.updateSelectedCollectionsAfterBulk(records, '');
            this.refreshVisibleCheckboxes();
            this.updateHeaderCheckboxState();
            return;
        }
        this.totalSelectableCount = this.countSelectableRecords(records);
        this.updateHeaderCheckboxState();
    };
    /**
     * Finalizes parent states after a bulk header operation (e.g., Select All).
     * This ensures parent states (checked/indeterminate) are correct after cascades.
     *
     * @param {ITreeData[]} records - The records that were processed in the bulk operation.
     * @returns {void}
     */
    Selection.prototype.finalizeParentsAfterBulk = function (records) {
        var all = records;
        for (var i = 0; i < all.length; i++) {
            var rec = all[parseInt(i.toString(), 10)];
            if (!rec || !rec.hasChildRecords) {
                continue;
            }
            var summary = this.buildSelectionSummary(rec, true);
            this.parentSelectionCounters[rec.uniqueID] = summary;
            var finalState = this.deriveParentState(rec, summary);
            if (this.headerSelectionState === 'check' &&
                summary.total > 0 && summary.checked === summary.total && summary.indeterminate === 0) {
                finalState = 'check';
            }
            else if (this.headerSelectionState === 'uncheck') {
                finalState = 'uncheck';
            }
            if (rec.checkboxState !== finalState) {
                this.updateSelectedItems(rec, finalState);
            }
        }
    };
    /**
     * Processes header selection for each record, setting their state silently in the data model.
     * Called during bulk operations like "select all".
     *
     * @param {ITreeData[]} records - The records to process.
     * @param {string} targetState - The target state to set on each record.
     * @returns {void}
     */
    Selection.prototype.processHeaderSelection = function (records, targetState) {
        for (var i = 0; i < records.length; i++) {
            var record = records[parseInt(i.toString(), 10)];
            if (!record) {
                continue;
            }
            var previousState = record.checkboxState;
            if (previousState === targetState) {
                continue;
            }
            record.checkboxState = targetState;
            this.updateSelectedItems(record, targetState, true);
        }
    };
    /**
     * Rebuilds `selectedItems`, `selectedUidMap`, and `selectedIndexes` based on the current data states in the model.
     * This method is called after bulk operations (like headerSelection, grid actions, etc.) to synchronize internal collections.
     * It ensures `selectedItems` retains original selection order *as much as possible* for currently checked items
     * and `selectedIndexes` reflects their *current visible order*.
     *
     * @param {ITreeData[]} records - The records that were processed (or the full data set if re-evaluating everything).
     * @param {string} requestType - The data action type such as filtering, searching, refresh,etc.
     * @returns {void}
     */
    Selection.prototype.updateSelectedCollectionsAfterBulk = function (records, requestType) {
        var hasFilter = !!(this.parent.filterModule && this.parent.filterModule.filteredResult &&
            this.parent.filterModule.filteredResult.length);
        var hasSearch = !!(this.parent.grid && this.parent.grid.searchSettings &&
            this.parent.grid.searchSettings.key && this.parent.grid.searchSettings.key.length);
        var isFilterOrSearch = hasFilter || hasSearch || requestType === 'refresh' || requestType === 'searching';
        var currentlySelectedItemsInOrder = isFilterOrSearch ? records : this.selectedItems.slice();
        var newSelectedItems = [];
        var newSelectedUidMap = new Map();
        var newSelectedIndexes = [];
        for (var _i = 0, currentlySelectedItemsInOrder_1 = currentlySelectedItemsInOrder; _i < currentlySelectedItemsInOrder_1.length; _i++) {
            var item = currentlySelectedItemsInOrder_1[_i];
            if (item.hasChildRecords && isFilterOrSearch && item.level === 0 && this.parent.autoCheckHierarchy) {
                this.updateParentSelection(item);
            }
            if (item.uniqueID && item.checkboxState === 'check') {
                newSelectedItems.push(item);
                newSelectedUidMap.set(item.uniqueID, true);
            }
        }
        if (!isFilterOrSearch) {
            var allFlatData = this.parent.flatData;
            if (allFlatData) {
                for (var _a = 0, allFlatData_1 = allFlatData; _a < allFlatData_1.length; _a++) {
                    var record = allFlatData_1[_a];
                    if (!record || record.isSummaryRow) {
                        continue;
                    }
                    if (record.uniqueID && record.checkboxState === 'check' && !newSelectedUidMap.has(record.uniqueID)) {
                        newSelectedItems.push(record);
                        newSelectedUidMap.set(record.uniqueID, true);
                    }
                }
            }
        }
        this.selectedItems = newSelectedItems;
        this.selectedUidMap = newSelectedUidMap;
        this.buildVisibleUidMap();
        for (var _b = 0, _c = this.selectedItems; _b < _c.length; _b++) {
            var item = _c[_b];
            var visibleIdx = this.visibleUidIndex[item.uniqueID];
            if (visibleIdx !== undefined) {
                newSelectedIndexes.push(visibleIdx);
            }
        }
        this.selectedIndexes = newSelectedIndexes;
        this.checkedItemCount = this.selectedItems.length;
        this.totalSelectableCount =
            this.countSelectableRecords(records);
    };
    /**
     * Refreshes visible checkbox DOM elements to reflect the current data state.
     * This method exclusively updates the UI representation of checkboxes.
     *
     * @returns {void}
     */
    Selection.prototype.refreshVisibleCheckboxes = function () {
        this.buildVisibleUidMap();
        var data = this.parent.getCurrentViewRecords();
        var uidMap = this.parent.uniqueIDCollection;
        for (var i = 0; data && i < data.length; i++) {
            var viewRec = data[parseInt(i.toString(), 10)];
            if (!viewRec) {
                continue;
            }
            var uid = viewRec.uniqueID;
            var srcRec = (uidMap && uid != null) ? uidMap[String(uid)] : viewRec;
            var state = (srcRec && srcRec.checkboxState) ? srcRec.checkboxState : 'uncheck';
            var rowEl = null;
            var rowUid = viewRec.uid;
            if (rowUid) {
                rowEl = this.parent.grid.getRowElementByUID(rowUid);
            }
            if (!rowEl) {
                var rows = this.parent.getRows();
                rowEl = rows && rows[parseInt(i.toString(), 10)];
                if ((this.parent.frozenRows || this.parent.getFrozenColumns()) && !rowEl) {
                    var movableRows = this.parent.getDataRows();
                    rowEl = movableRows && movableRows[parseInt(i.toString(), 10)];
                }
            }
            if (rowEl) {
                var frame = rowEl.querySelector('.e-hierarchycheckbox .e-frame');
                if (frame) {
                    removeClass([frame], ['e-check', 'e-stop', 'e-uncheck']);
                    frame.classList.add(state === 'indeterminate' ? 'e-stop' : ('e-' + state));
                    var input = rowEl.querySelector('.e-treecheckselect');
                    if (input) {
                        input.setAttribute('aria-checked', state === 'check' ? 'true' :
                            (state === 'uncheck' ? 'false' : 'mixed'));
                    }
                }
            }
        }
    };
    /**
     * Resets internal selection caches to their initial state.
     * This is usually called before a bulk selection operation (like "select all").
     *
     * @returns {void}
     */
    Selection.prototype.resetSelectionCaches = function () {
        this.parentSelectionCounters = {};
        this.selectedUidMap = new Map();
        this.selectedItems = [];
        this.selectedIndexes = [];
        this.totalSelectableCount = 0;
        this.headerSelectionState = 'uncheck';
        this.checkedItemCount = 0;
    };
    /**
     * Counts selectable (non-summary) records in the provided array.
     *
     * @param {ITreeData[]} records - The records to count.
     * @returns {number} The number of selectable records.
     */
    Selection.prototype.countSelectableRecords = function (records) {
        var count = 0;
        if (!records) {
            return count;
        }
        for (var i = 0; i < records.length; i++) {
            var rec = records[parseInt(i.toString(), 10)];
            if (rec && !rec.isSummaryRow) {
                count++;
            }
        }
        return count;
    };
    /**
     * Resolves the list of records used for header selection operations (e.g., for `select all`).
     *
     * @param {boolean} [includeAll] - If true and data is local, returns flatData (all records for full dataset actions).
     * @returns {ITreeData[]} The array of records to consider for header operations.
     */
    Selection.prototype.resolveHeaderSelectionList = function (includeAll) {
        var dataToProcess = [];
        if (!isRemoteData(this.parent)) {
            var hasFilter = !!(this.parent.filterModule &&
                this.parent.filterModule.filteredResult &&
                this.parent.filterModule.filteredResult.length);
            var hasSearch = !!(this.parent.grid &&
                this.parent.grid.searchSettings &&
                this.parent.grid.searchSettings.key &&
                this.parent.grid.searchSettings.key.length);
            if (includeAll) {
                if (hasFilter) {
                    dataToProcess = this.filteredList && this.filteredList.length
                        ? this.filteredList
                        : this.parent.filterModule.filteredResult;
                }
                else if (hasSearch && this.searchingRecords && this.searchingRecords.length) {
                    dataToProcess = this.searchingRecords;
                }
                else {
                    dataToProcess = this.parent.flatData;
                }
            }
            else {
                if (hasFilter) {
                    dataToProcess = this.filteredList && this.filteredList.length
                        ? this.filteredList
                        : this.parent.filterModule.filteredResult;
                }
                else if (hasSearch && this.searchingRecords && this.searchingRecords.length) {
                    dataToProcess = this.searchingRecords;
                }
                else {
                    dataToProcess = this.parent.flatData;
                }
            }
        }
        else {
            dataToProcess = this.parent.getCurrentViewRecords();
        }
        return dataToProcess;
    };
    /**
     * Updates the header checkbox state (checked/indeterminate/unchecked) based on current selections.
     *
     * @returns {void}
     */
    Selection.prototype.updateHeaderCheckboxState = function () {
        var frame = this.headerCheckboxFrameEl;
        if (!frame) {
            return;
        }
        var recordsForHeaderLogic = this.resolveHeaderSelectionList(true);
        this.totalSelectableCount = this.countSelectableRecords(recordsForHeaderLogic);
        var checkedCountForHeaderLogic = 0;
        for (var _i = 0, recordsForHeaderLogic_1 = recordsForHeaderLogic; _i < recordsForHeaderLogic_1.length; _i++) {
            var record = recordsForHeaderLogic_1[_i];
            if (record && !record.isSummaryRow && record.checkboxState === 'check') {
                checkedCountForHeaderLogic++;
            }
        }
        removeClass([frame], ['e-check', 'e-stop', 'e-uncheck']);
        if (this.totalSelectableCount === 0) {
            frame.classList.add('e-uncheck');
        }
        else if (checkedCountForHeaderLogic === 0) {
            frame.classList.add('e-uncheck');
        }
        else if (checkedCountForHeaderLogic === this.totalSelectableCount) {
            frame.classList.add('e-check');
        }
        else {
            frame.classList.add('e-stop');
        }
    };
    /**
     * Updates selection arrays (selectedItems, selectedUidMap, selectedIndexes) and visible DOM for a single record.
     * This is the core method for managing the state of a single checkbox.
     *
     * @param {ITreeData} currentRecord - The record to update.
     * @param {string} checkState - The new checkbox state ('check' | 'uncheck' | 'indeterminate').
     * @param {boolean} [silent] - If true, update is silent (only updates data model, no collection management or DOM update).
     * @returns {void}
     */
    Selection.prototype.updateSelectedItems = function (currentRecord, checkState, silent) {
        this.buildVisibleUidMap();
        var uid = currentRecord.uniqueID;
        var uidMap = this.parent.uniqueIDCollection;
        var checkboxRecord = (uidMap && uid != null) ? (uidMap[String(uid)] ?
            uidMap[String(uid)] : currentRecord) : currentRecord;
        var isSummary = currentRecord.isSummaryRow === true;
        var previousState = checkboxRecord.checkboxState;
        var currentVisibleIndex = this.visibleUidIndex[String(uid)];
        checkboxRecord.checkboxState = checkState;
        if (silent) {
            return;
        }
        if (!isSummary && previousState !== checkState) {
            if (checkState === 'check') {
                this.checkedItemCount++;
                if (!this.selectedUidMap.has(String(uid))) {
                    if (checkboxRecord.uniqueID) {
                        this.selectedUidMap.set(String(checkboxRecord.uniqueID), true);
                    }
                    this.selectedItems.push(checkboxRecord);
                    if (currentVisibleIndex !== undefined && this.selectedIndexes.indexOf(currentVisibleIndex) === -1) {
                        this.selectedIndexes.push(currentVisibleIndex);
                    }
                }
            }
            else if (previousState === 'check' || previousState === 'indeterminate') {
                if (this.checkedItemCount > 0) {
                    this.checkedItemCount--;
                }
                if (checkboxRecord && checkboxRecord.uniqueID && this.selectedUidMap.has(String(checkboxRecord.uniqueID))) {
                    this.selectedUidMap.delete(String(checkboxRecord.uniqueID));
                    var itemIdx = this.selectedItems.indexOf(checkboxRecord);
                    if (itemIdx !== -1) {
                        this.selectedItems.splice(itemIdx, 1);
                    }
                    if (currentVisibleIndex !== undefined) {
                        var indexInSelectedIndexes = this.selectedIndexes.indexOf(currentVisibleIndex);
                        if (indexInSelectedIndexes > -1) {
                            this.selectedIndexes.splice(indexInSelectedIndexes, 1);
                        }
                    }
                }
            }
        }
        var rowEl = null;
        var rowUid = currentRecord.uid;
        if (rowUid) {
            rowEl = this.parent.grid.getRowElementByUID(rowUid);
        }
        if (!rowEl) {
            var recordVisibleIndex = currentVisibleIndex !== undefined ? currentVisibleIndex : (typeof this.visibleUidIndex[String(uid)] === 'number' ? this.visibleUidIndex[String(uid)] : -1);
            if (recordVisibleIndex > -1) {
                rowEl = this.parent.getRows()[parseInt(recordVisibleIndex.toString(), 10)];
                if (!rowEl && (this.parent.frozenRows || this.parent.getFrozenColumns())) {
                    rowEl = this.parent.getDataRows()[parseInt(recordVisibleIndex.toString(), 10)];
                }
            }
        }
        if (rowEl) {
            var frame = rowEl.querySelector('.e-hierarchycheckbox .e-frame');
            if (frame) {
                removeClass([frame], ['e-check', 'e-stop', 'e-uncheck']);
                frame.classList.add(checkState === 'indeterminate' ? 'e-stop' : ('e-' + checkState));
            }
            var input = rowEl.querySelector('.e-treecheckselect');
            if (input) {
                input.setAttribute('aria-checked', checkState === 'check' ? 'true' :
                    (checkState === 'uncheck' ? 'false' : 'mixed'));
            }
        }
    };
    /**
     * Handles various grid actions and updates selection state accordingly.
     * This method ensures that selection state is maintained and UI is refreshed after grid operations.
     *
     * @param {CellSaveEventArgs} args - Action arguments containing requestType and data.
     * @returns {void}
     */
    Selection.prototype.updateGridActions = function (args) {
        var requestType = args.requestType;
        if (isCheckboxcolumn(this.parent)) {
            if (this.parent.autoCheckHierarchy) {
                if ((requestType === 'sorting' || requestType === 'paging')) {
                    this.updateSelectedCollectionsAfterBulk(this.resolveHeaderSelectionList(), '');
                    this.refreshVisibleCheckboxes();
                    this.updateHeaderCheckboxState();
                }
                else if (requestType === 'delete' || args.action === 'add') {
                    var updatedData = [];
                    if (requestType === 'delete') {
                        updatedData = args.data;
                    }
                    else {
                        updatedData.push(args.data);
                    }
                    for (var i = 0; i < updatedData.length; i++) {
                        if (requestType === 'delete') {
                            this.updateSelectedItems(updatedData[parseInt(i.toString(), 10)], 'uncheck', false);
                        }
                        if (!isNullOrUndefined(updatedData[parseInt(i.toString(), 10)].parentItem)) {
                            this.updateParentSelection(updatedData[parseInt(i.toString(), 10)].parentItem);
                        }
                    }
                    this.updateSelectedCollectionsAfterBulk(this.resolveHeaderSelectionList(true), '');
                    this.refreshVisibleCheckboxes();
                    if (this.parent.autoCheckHierarchy) {
                        this.updateHeaderCheckboxState();
                    }
                }
                else if (args.requestType === 'add' && this.parent.autoCheckHierarchy) {
                    args.data.checkboxState = 'uncheck';
                }
                else if (requestType === 'filtering' || requestType === 'searching' || requestType === 'refresh') {
                    this.updateSelectedCollectionsAfterBulk(this.resolveHeaderSelectionList(), requestType);
                    this.refreshVisibleCheckboxes();
                    if (this.parent.autoCheckHierarchy) {
                        this.updateHeaderCheckboxState();
                    }
                }
            }
            else {
                if ((requestType === 'filtering' || requestType === 'searching' || requestType === 'refresh' ||
                    requestType === 'sorting' || requestType === 'paging' || requestType === 'expanding' ||
                    requestType === 'expand' || requestType === 'collapsing' || requestType === 'collapse') && !isRemoteData(this.parent)) {
                    if (!(isCheckboxcolumn(this.parent) && (requestType === 'refresh' && this.parent['isVirtualExpandCollapse']))) {
                        this.selectedItems = [];
                        this.selectedUidMap = new Map();
                        this.selectedIndexes = [];
                    }
                    if (requestType === 'filtering' || requestType === 'searching' || requestType === 'sorting') {
                        this.headerSelection(false);
                    }
                    this.refreshVisibleCheckboxes();
                    if (this.parent.autoCheckHierarchy) {
                        this.updateHeaderCheckboxState();
                    }
                }
            }
        }
    };
    /**
     * Retrieves checked record objects.
     * This array maintains the `ITreeData` objects in the order they were selected.
     *
     * @returns {ITreeData[]} Array of checked records.
     */
    Selection.prototype.getCheckedrecords = function () { return this.selectedItems; };
    /**
     * Retrieves visible indexes of checked rows in the current view, in the order they were selected.
     * This method dynamically generates the list of visible indexes by iterating through `selectedItems`
     * (which preserves selection order) and finding their *current* visible index.
     *
     * @returns {number[]} Array of checked row indexes in selection order.
     */
    Selection.prototype.getCheckedRowIndexes = function () {
        this.buildVisibleUidMap();
        var orderedVisibleIndexes = [];
        for (var _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
            var selectedItem = _a[_i];
            var uid = selectedItem.uniqueID;
            if (uid !== undefined && this.visibleUidIndex[uid] !== undefined) {
                orderedVisibleIndexes.push(this.visibleUidIndex[uid]);
            }
        }
        return orderedVisibleIndexes;
    };
    return Selection;
}());
export { Selection };
