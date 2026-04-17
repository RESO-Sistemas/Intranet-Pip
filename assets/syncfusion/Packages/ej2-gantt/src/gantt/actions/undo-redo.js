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
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
var UndoRedo = /** @class */ (function () {
    function UndoRedo(parent) {
        this.isUndoRedoPerformed = false;
        this.changedRecords = [];
        this.getRedoCollection = [];
        this.getUndoCollection = [];
        this.redoEnabled = false;
        this.previousSortedColumns = [];
        this.searchString = '';
        this.isFromUndoRedo = false;
        this.undoActionDetails = {};
        this.sortedColumnsLength = 0;
        this.isZoomingUndoRedoProgress = false;
        this.isPreventRowDeselectOnUndoRedo = false;
        // Initialize a collection to store only unique top-level deleted records
        this.uniqueDeletedRecords = [];
        this.parent = parent;
    }
    // Check if a record is a descendant (child or sub-child) of a potential parent record. This avoids re-adding nested tasks if the parent is already handled.
    UndoRedo.prototype.isInHierarchyOf = function (record, potentialParent) {
        var parent = record.parentItem;
        while (parent) {
            if (parent.taskId === (potentialParent.ganttProperties.taskId).toString()) {
                return true;
            }
            parent = parent.parentItem;
        }
        return false;
    };
    // Determines if a record is already covered by any of the records in uniqueRecords. This includes direct children and deep descendants.
    UndoRedo.prototype.isPartOfExistingHierarchy = function (record) {
        /* eslint-disable-next-line */
        return this.uniqueDeletedRecords.some(function (uniRecord) {
            // Case 1: Record is a descendant of a parent already added
            if (this.isInHierarchyOf(record.data, uniRecord.data)) {
                return true;
            }
            // Case 2: Record is directly present as a child of a parent already added
            if (uniRecord.data && uniRecord.data.childRecords && uniRecord.data.childRecords.some(function (subtask) {
                return subtask.ganttProperties.taskId === record.data.ganttProperties.taskId;
            })) {
                return true;
            }
            return false;
        }.bind(this));
    };
    /**
     *Initiates an undo action to revert the most recent change performed.
     *
     * @returns {void}
     * @public
     */
    UndoRedo.prototype.undoAction = function () {
        var _this = this;
        if (this.getUndoCollection.length > 0) {
            var updateAction = this.getUndoCollection[this.getUndoCollection.length - 1];
            var previousActions = {};
            if (updateAction['action'] === 'ZoomIn' || updateAction['action'] === 'ZoomOut' || updateAction['action'] === 'ZoomToFit') {
                previousActions['action'] = updateAction['action'];
                previousActions['previousZoomingLevel'] = extend({}, {}, this.parent.currentZoomingLevel, true);
            }
            else if (updateAction['action'] === 'NextTimeSpan' || updateAction['action'] === 'PreviousTimeSpan') {
                previousActions['action'] = updateAction['action'];
                previousActions['previousTimelineStartDate'] = extend([], [this.parent.timelineModule.timelineStartDate], [], true)[0];
                previousActions['previousTimelineEndDate'] = extend([], [this.parent.timelineModule.timelineEndDate], [], true)[0];
            }
            else if (updateAction['action'] === 'Sorting') {
                previousActions['action'] = 'Sorting';
                previousActions['sortColumns'] = this.previousSortedColumns;
            }
            else if (updateAction['action'] === 'Filtering') {
                previousActions['action'] = 'Filtering';
                previousActions['filteredColumns'] = updateAction['filteredColumns'];
            }
            else if (updateAction['action'] === 'ColumnReorder') {
                previousActions['action'] = updateAction['action'];
                previousActions['toColumn'] = updateAction['fromColumn'];
                previousActions['fromColumn'] = updateAction['toColumn'];
                previousActions['fromIndex'] = updateAction['toIndex'];
                previousActions['toIndex'] = updateAction['fromIndex'];
            }
            else if (updateAction['action'] === 'Search') {
                previousActions['action'] = updateAction['action'];
                previousActions['searchString'] = this.searchString;
            }
            else if (updateAction['action'] === 'ColumnState') {
                previousActions['action'] = updateAction['action'];
                previousActions['showhideColumns'] = updateAction['showhideColumns'];
            }
            else if (updateAction['action'] === 'ColumnResize') {
                previousActions['action'] = updateAction['action'];
                previousActions['resizedColumn'] = __assign({}, this.parent.treeGrid.columns[updateAction['resizedColumn'].index]);
            }
            else if (updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') {
                var rowItems = [];
                for (var i = 0; i < updateAction['beforeDrop'].length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        rowItems.push(this.parent.getRecordByID(updateAction['beforeDrop'][i]['data'].ganttProperties.taskId));
                    }
                    else {
                        rowItems.push(this.parent.flatData[this.getResourceViewRowIndex(updateAction['beforeDrop'][i]['data'])]);
                    }
                }
                previousActions['action'] = updateAction['action'];
                previousActions['beforeDrop'] = [];
                var previousDetails = {};
                var dropRecord = extend([], [], [this.parent.getRecordByID(updateAction['afterDrop'].dropRecord.ganttProperties.taskId)], true)[0];
                previousDetails['data'] = [];
                for (var i = 0; i < updateAction['afterDrop'].data.length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        previousDetails['data'].push(extend([], [], [this.parent.getRecordByID(updateAction['afterDrop'].data[i].ganttProperties.taskId)], true)[0]);
                    }
                    else {
                        previousDetails['data'].push(extend([], [], [this.parent.flatData[this.getResourceViewRowIndex(updateAction['afterDrop'].data[i])]], true)[0]);
                    }
                }
                previousDetails['dropRecord'] = extend([], [], [dropRecord], true)[0];
                previousDetails['dropPosition'] = updateAction['afterDrop'].dropPosition;
                previousActions['afterDrop'] = previousDetails;
                this['findPosition'](rowItems, previousActions, 'beforeDrop');
            }
            else if (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent') {
                previousActions['selectedRowIndexes'] = updateAction['selectedRowIndexes'];
                previousActions['droppedRecord'] = extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction['droppedRecord'].ganttProperties.taskId.toString())]], true)[0];
                previousActions['modifiedRecord'] = [];
                this.findPosition(extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction['modifiedRecord'][0].data.ganttProperties.taskId.toString())]], true), previousActions, 'modifiedRecord');
                previousActions['action'] = updateAction['action'];
            }
            else if (updateAction['action'] === 'Delete') {
                previousActions['action'] = 'Delete';
                previousActions['deleteRecords'] = [];
                for (var i = 0; i < updateAction['deletedRecordsDetails'].length; i++) {
                    var currentDeletedItem = updateAction['deletedRecordsDetails'][i];
                    // Check if the current record is already part of an existing hierarchy in the uniqueRecords array
                    var isRecordAlreadyPresent = this.isPartOfExistingHierarchy(currentDeletedItem);
                    // Add the record to the uniqueRecords array only if it hasn't already been added or doesn't belong to the same hierarchy
                    if (!isRecordAlreadyPresent) {
                        this.uniqueDeletedRecords.push(currentDeletedItem);
                    }
                }
                // Update the deletedRecordsDetails with the cleaned-up unique records list
                updateAction['deletedRecordsDetails'] = this.uniqueDeletedRecords;
                // Map the records data and store it in previousActions for future reference
                previousActions['deleteRecords'] = this.uniqueDeletedRecords.map(function (record) { return record.data; });
                // Clear the uniqueRecords array for future iterations
                this.uniqueDeletedRecords = [];
            }
            else if (updateAction['action'] === 'Add') {
                previousActions['action'] = 'Add';
                previousActions['deletedRecordsDetails'] = [];
                var rowItems = updateAction['addedRecords'];
                this.findPosition(rowItems, previousActions, 'deletedRecordsDetails');
            }
            else {
                previousActions['action'] = updateAction['action'];
                previousActions['modifiedRecords'] = [];
                for (var i = 0; i < updateAction['modifiedRecords'].length; i++) {
                    var index = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        index = this.findTaskRowIndex(updateAction['modifiedRecords'][i].ganttProperties.taskId.toString());
                    }
                    else {
                        index = this.parent.undoRedoModule['getResourceViewRowIndex'](updateAction['modifiedRecords'][i]);
                    }
                    previousActions['modifiedRecords'].push(extend([], [this.parent.flatData[index]], [], true)[0]);
                }
            }
            this.getRedoCollection.push(previousActions);
            this.isUndoRedoPerformed = true;
            this.changedRecords = [];
            this.currentAction = updateAction;
            if (updateAction['action'] === 'ZoomIn' || updateAction['action'] === 'ZoomOut' || updateAction['action'] === 'ZoomToFit') {
                this.parent.timelineSettings.timelineViewMode = updateAction['previousZoomingLevel'].timelineViewMode;
                this.parent.timelineSettings.timelineUnitSize = updateAction['previousZoomingLevel'].timelineUnitSize;
                this.parent.timelineSettings.updateTimescaleView = updateAction['previousZoomingLevel'].updateTimescaleView;
                this.parent.timelineSettings.topTier.unit = updateAction['previousZoomingLevel'].topTier.unit;
                this.parent.timelineSettings.topTier.count = updateAction['previousZoomingLevel'].topTier.count;
                this.parent.timelineSettings.topTier.format = updateAction['previousZoomingLevel'].topTier.format;
                this.parent.timelineSettings.bottomTier.unit = updateAction['previousZoomingLevel'].bottomTier.unit;
                this.parent.timelineSettings.bottomTier.count = updateAction['previousZoomingLevel'].bottomTier.count;
                this.parent.timelineSettings.bottomTier.format = updateAction['previousZoomingLevel'].bottomTier.format;
                this.parent.timelineSettings.weekStartDay = updateAction['previousZoomingLevel'].weekStartDay;
                this.parent.timelineSettings.weekendBackground = updateAction['previousZoomingLevel'].weekendBackground;
                this.isZoomingUndoRedoProgress = true;
                this.isUndoRedoPerformed = false;
            }
            else if (updateAction['action'] === 'NextTimeSpan' || updateAction['action'] === 'PreviousTimeSpan') {
                this.parent.updateProjectDates(updateAction['previousTimelineStartDate'], updateAction['previousTimelineEndDate'], false);
                this.isUndoRedoPerformed = false;
            }
            else if (updateAction['action'] === 'Sorting') {
                this.isFromUndoRedo = true;
                this.sortedColumnsLength = 0;
                if (updateAction['sortColumns'].length > 0) {
                    for (var i = 0; i < updateAction['sortColumns'].length; i++) {
                        this.parent.treeGrid.sortByColumn(updateAction['sortColumns'][i]['field'], updateAction['sortColumns'][i]['direction'], i > 0 ? true : false);
                    }
                }
                else {
                    this.parent.clearSorting();
                }
            }
            else if (updateAction['action'] === 'Filtering') {
                this.isFromUndoRedo = true;
                for (var i = this.getUndoCollection.length - 1; i >= 0; i--) {
                    if (this.getUndoCollection[i]['filteredColumns']) {
                        var columnsArray = [];
                        for (var j = 0; j < this.getUndoCollection[i]['filteredColumns'].length; j++) {
                            columnsArray.push(this.getUndoCollection[i]['filteredColumns'][j].field);
                        }
                        this.parent.clearFiltering(columnsArray);
                    }
                }
            }
            else if (updateAction['action'] === 'ColumnReorder') {
                this.isFromUndoRedo = true;
                var fromColumn = this.parent.treeGrid.columns[updateAction['fromIndex']]['field'];
                var toColumn = this.parent.treeGrid.columns[updateAction['toIndex']]['field'];
                this.parent.reorderColumns(fromColumn, toColumn);
            }
            else if (updateAction['action'] === 'Search') {
                this.isFromUndoRedo = true;
                this.parent.search(updateAction['searchString']);
            }
            else if (updateAction['action'] === 'ColumnState') {
                this.isFromUndoRedo = true;
                for (var i = 0; i < updateAction['showhideColumns'].length; i++) {
                    if (updateAction['showhideColumns'][i].visible) {
                        this.parent.hideColumn(updateAction['showhideColumns'][i].field, 'field');
                    }
                    else {
                        this.parent.showColumn(updateAction['showhideColumns'][i].field, 'field');
                    }
                }
                this.isUndoRedoPerformed = false;
            }
            else if (updateAction['action'] === 'ColumnResize') {
                this.parent.treeGrid.columns[updateAction['resizedColumn'].index]['width'] = updateAction['resizedColumn'].width;
                this.parent.treeGrid.refreshColumns();
            }
            else if (updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') {
                for (var i = 0; i < updateAction['beforeDrop'].length; i++) {
                    var fromIndex = this.findTaskRowIndex(updateAction['beforeDrop'][i].data.ganttProperties.taskId.toString());
                    var toIndex = this.findTaskRowIndex(updateAction['beforeDrop'][i]['id'].toString());
                    this.parent.reorderRows([fromIndex], toIndex, updateAction['beforeDrop'][i].position);
                }
            }
            else if (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent') {
                this.parent.selectRow(this.findTaskRowIndex(updateAction['modifiedRecord'][0].data.ganttProperties.taskId.toString()));
                if (updateAction['action'] === 'Indent') {
                    this.parent.outdent();
                }
                else {
                    this.parent.indent();
                }
            }
            else if (updateAction['action'] === 'Delete') {
                for (var i = 0; i < updateAction['deletedRecordsDetails'].length; i++) {
                    var rowIndex = this.findTaskRowIndex(updateAction['deletedRecordsDetails'][i].id.toString());
                    var position = void 0;
                    if (updateAction['deletedRecordsDetails'][i].position === 'above') {
                        position = 'Above';
                    }
                    if (updateAction['deletedRecordsDetails'][i].position === 'below') {
                        position = 'Below';
                    }
                    if (updateAction['deletedRecordsDetails'][i].position === 'child') {
                        position = 'Child';
                    }
                    if (isNullOrUndefined(position)) {
                        var deletePosition = updateAction['deletedRecordsDetails'][i].position;
                        position = deletePosition.charAt(0).toUpperCase() + deletePosition.slice(1);
                    }
                    if (updateAction['deletedRecordsDetails'][i].data.ganttProperties.predecessor &&
                        updateAction['deletedRecordsDetails'][i].data.ganttProperties.predecessor.length > 0) {
                        updateAction['deletedRecordsDetails'][i].data.ganttProperties.predecessor.forEach(function (predecessor) {
                            var restoredToRecord = _this.parent.connectorLineModule.getRecordByID(predecessor.to);
                            if (restoredToRecord) {
                                restoredToRecord.ganttProperties.predecessor.push(predecessor);
                                var predecessorStringValue = _this.parent.predecessorModule.getPredecessorStringValue(restoredToRecord);
                                restoredToRecord.ganttProperties.predecessorsName = predecessorStringValue;
                            }
                        });
                    }
                    this.parent.addRecord(updateAction['deletedRecordsDetails'][i].data, position, rowIndex);
                }
            }
            else if (updateAction['action'] === 'Add') {
                var isShowDeleteConfirmDialog = extend([], [this.parent.editSettings.showDeleteConfirmDialog], [], true)[0];
                this.parent.editSettings.showDeleteConfirmDialog = false;
                var deleteRec = updateAction['addedRecords'];
                if (this.parent.viewType === 'ResourceView' && updateAction['addedRecords'].length === 1 && updateAction['addedRecords'][0].parentItem) {
                    var parentRec = this.parent.getTaskByUniqueID(updateAction['addedRecords'][0].parentItem.uniqueID);
                    if (parentRec.childRecords.length === 1 && parentRec.ganttProperties.taskName === 'Unassigned Task') {
                        deleteRec = parentRec;
                    }
                }
                this.parent.deleteRecord(deleteRec);
                if (this.parent.enableVirtualization && this.parent.treeGrid['virtualScrollModule'] &&
                    !isNullOrUndefined(this.parent.treeGrid['virtualScrollModule'].ganttEndIndex)) {
                    this.parent.treeGrid['virtualScrollModule'].ganttEndIndex = this.parent.flatData.length;
                }
                this.parent.editSettings.showDeleteConfirmDialog = isShowDeleteConfirmDialog;
            }
            else {
                this.parent.updateRecordByID(this.getUndoCollection[this.getUndoCollection.length - 1]['modifiedRecords'][0]);
                if (updateAction['connectedRecords'] && this.parent.viewType === 'ProjectView') {
                    for (var i = 0; i < updateAction['connectedRecords'].length; i++) {
                        this.parent.updateRecordByID(updateAction['connectedRecords'][i]);
                    }
                }
                this.isUndoRedoPerformed = false;
            }
            var args = {};
            args = extend([], [], [this.getUndoCollection[this.getUndoCollection.length - 1]], true)[0];
            args['requestType'] = 'afterUndoAction';
            this.parent.trigger('onAfterUndo', args);
            if ((updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') ||
                (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent')) {
                this.undoActionDetails = this.getUndoCollection[this.getUndoCollection.length - 1];
            }
            if (this.getRedoCollection.length > 0) {
                if (this.parent.toolbarModule) {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], true);
                }
                this.redoEnabled = true;
            }
            this.getUndoCollection.splice(this.getUndoCollection.length - 1, 1);
            if (this.getUndoCollection.length === 0 && this.parent.toolbarModule) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], false);
            }
        }
        else {
            this.getUndoCollection.splice(this.getUndoCollection.length - 1, 1);
            if (this.getUndoCollection.length === 0 && this.parent.toolbarModule) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], false);
            }
        }
    };
    /**
     *Initiates an redo action to reapply the most recent undone change performed.
     *
     * @returns {void}
     * @public
     */
    UndoRedo.prototype.redoAction = function () {
        if (this.getRedoCollection.length > 0) {
            var updateAction = this.getRedoCollection[this.getRedoCollection.length - 1];
            var previousActions = {};
            if (updateAction['action'] === 'ZoomIn' || updateAction['action'] === 'ZoomOut' || updateAction['action'] === 'ZoomToFit') {
                previousActions['action'] = updateAction['action'];
                previousActions['previousZoomingLevel'] = extend({}, {}, this.parent.currentZoomingLevel, true);
                previousActions['previousZoomingLevel'].bottomTier.format = this.parent.timelineModule.customTimelineSettings.bottomTier.format;
                previousActions['previousZoomingLevel'].topTier.format = this.parent.timelineModule.customTimelineSettings.topTier.format;
            }
            else if (updateAction['action'] === 'NextTimeSpan' || updateAction['action'] === 'PreviousTimeSpan') {
                previousActions['action'] = updateAction['action'];
                previousActions['previousTimelineStartDate'] = extend([], [this.parent.timelineModule.timelineStartDate], [], true)[0];
                previousActions['previousTimelineEndDate'] = extend([], [this.parent.timelineModule.timelineEndDate], [], true)[0];
            }
            else if (updateAction['action'] === 'Sorting') {
                previousActions['action'] = 'Sorting';
                previousActions['sortColumns'] = extend([], this.parent.sortSettings.columns, [], true);
            }
            else if (updateAction['action'] === 'Filtering') {
                previousActions['action'] = 'Filtering';
                previousActions['filteredColumns'] = updateAction['filteredColumns'];
            }
            else if (updateAction['action'] === 'ColumnReorder') {
                previousActions['action'] = updateAction['action'];
                previousActions['toColumn'] = updateAction['fromColumn'];
                previousActions['fromColumn'] = updateAction['toColumn'];
                previousActions['fromIndex'] = updateAction['toIndex'];
                previousActions['toIndex'] = updateAction['fromIndex'];
            }
            else if (updateAction['action'] === 'Search') {
                previousActions['action'] = updateAction['action'];
                previousActions['searchString'] = extend([], [this.parent.searchSettings.key], [], true)[0];
            }
            else if (updateAction['action'] === 'ColumnState') {
                previousActions['action'] = updateAction['action'];
                previousActions['showhideColumns'] = updateAction['showhideColumns'];
            }
            else if (updateAction['action'] === 'ColumnResize') {
                previousActions['action'] = updateAction['action'];
                previousActions['resizedColumn'] = __assign({}, this.parent.treeGrid.columns[updateAction['resizedColumn'].index]);
            }
            else if (updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') {
                var rowItems = [];
                for (var i = 0; i < updateAction['beforeDrop'].length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        rowItems.push(this.parent.getRecordByID(updateAction['beforeDrop'][i]['data'].ganttProperties.taskId));
                    }
                    else {
                        rowItems.push(this.parent.flatData[this.getResourceViewRowIndex(updateAction['beforeDrop'][i]['data'])]);
                    }
                }
                previousActions['action'] = updateAction['action'];
                previousActions['beforeDrop'] = [];
                var previousDetails = {};
                var dropRecord = void 0;
                if (updateAction['afterDrop'].dropRecord) {
                    dropRecord = extend([], [], [this.parent.getRecordByID(updateAction['afterDrop'].dropRecord.ganttProperties.taskId)], true)[0];
                }
                previousDetails['data'] = [];
                for (var i = 0; i < updateAction['afterDrop'].data.length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        previousDetails['data'].push(extend([], [], [this.parent.getRecordByID(updateAction['afterDrop'].data[i].ganttProperties.taskId)], true)[0]);
                    }
                    else {
                        if (updateAction['afterDrop'].data[i] !== undefined) {
                            previousDetails['data'].push(extend([], [], [this.parent.flatData[this.getResourceViewRowIndex(updateAction['afterDrop'].data[i])]], true)[0]);
                        }
                    }
                }
                previousDetails['dropRecord'] = extend([], [], [dropRecord], true)[0];
                previousDetails['dropPosition'] = updateAction['afterDrop'].dropPosition;
                previousActions['afterDrop'] = previousDetails;
                this['findPosition'](rowItems, previousActions, 'beforeDrop');
            }
            else if (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent') {
                previousActions['selectedRowIndexes'] = updateAction['selectedRowIndexes'];
                previousActions['droppedRecord'] = extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction['droppedRecord'].ganttProperties.taskId.toString())]], true)[0];
                previousActions['modifiedRecord'] = [];
                this.findPosition(extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction['modifiedRecord'][0].data.ganttProperties.taskId.toString())]], true), previousActions, 'modifiedRecord');
                previousActions['action'] = updateAction['action'];
            }
            else if (updateAction['action'] === 'Delete') {
                previousActions['action'] = 'Delete';
                previousActions['deletedRecordsDetails'] = [];
                this['findPosition'](extend([], [], updateAction['deleteRecords'], true), previousActions, 'deletedRecordsDetails');
            }
            else if (updateAction['action'] === 'Add') {
                previousActions['action'] = 'Add';
                previousActions['addedRecords'] = [updateAction['deletedRecordsDetails'][0].data];
            }
            else {
                previousActions['action'] = updateAction['action'];
                previousActions['modifiedRecords'] = [];
                for (var i = 0; i < updateAction['modifiedRecords'].length; i++) {
                    var index = this.findTaskRowIndex(updateAction['modifiedRecords'][i].ganttProperties.taskId.toString());
                    previousActions['modifiedRecords'].push(extend([], [this.parent.flatData[index]], [], true)[0]);
                }
            }
            this.getUndoCollection.push(previousActions);
            this.isUndoRedoPerformed = true;
            this.currentAction = updateAction;
            if (updateAction['action'] === 'ZoomIn' || updateAction['action'] === 'ZoomOut' || updateAction['action'] === 'ZoomToFit') {
                if (updateAction['action'] === 'ZoomToFit') {
                    this.parent.fitToProject();
                }
                else {
                    this.parent.timelineSettings.timelineViewMode = updateAction['previousZoomingLevel'].timelineViewMode;
                    this.parent.timelineSettings.timelineUnitSize = updateAction['previousZoomingLevel'].timelineUnitSize;
                    this.parent.timelineSettings.updateTimescaleView = updateAction['previousZoomingLevel'].updateTimescaleView;
                    this.parent.timelineSettings.topTier.unit = updateAction['previousZoomingLevel'].topTier.unit;
                    this.parent.timelineSettings.topTier.count = updateAction['previousZoomingLevel'].topTier.count;
                    this.parent.timelineSettings.topTier.format = updateAction['previousZoomingLevel'].topTier.format;
                    this.parent.timelineSettings.bottomTier.unit = updateAction['previousZoomingLevel'].bottomTier.unit;
                    this.parent.timelineSettings.bottomTier.count = updateAction['previousZoomingLevel'].bottomTier.count;
                    this.parent.timelineSettings.bottomTier.format = updateAction['previousZoomingLevel'].bottomTier.format;
                    this.parent.timelineSettings.weekStartDay = updateAction['previousZoomingLevel'].weekStartDay;
                    this.parent.timelineSettings.weekendBackground = updateAction['previousZoomingLevel'].weekendBackground;
                    this.isZoomingUndoRedoProgress = true;
                }
                this.isUndoRedoPerformed = false;
            }
            else if (updateAction['action'] === 'NextTimeSpan' || updateAction['action'] === 'PreviousTimeSpan') {
                this.parent.updateProjectDates(updateAction['previousTimelineStartDate'], updateAction['previousTimelineEndDate'], false);
                this.isUndoRedoPerformed = false;
            }
            else if (updateAction['action'] === 'Sorting') {
                this.isFromUndoRedo = true;
                this.sortedColumnsLength = 0;
                if (updateAction['sortColumns'].length === 0) {
                    this.parent.clearSorting();
                }
                else {
                    for (var i = 0; i < updateAction['sortColumns'].length; i++) {
                        this.parent.treeGrid.sortByColumn(updateAction['sortColumns'][i]['field'], updateAction['sortColumns'][i]['direction'], (updateAction['sortColumns'].length > 1 ? true : false));
                    }
                }
            }
            else if (updateAction['action'] === 'ColumnState') {
                this.isFromUndoRedo = true;
                for (var i = 0; i < updateAction['showhideColumns'].length; i++) {
                    if (updateAction['showhideColumns'][i].visible) {
                        this.parent.hideColumn(updateAction['showhideColumns'][i].field, 'field');
                    }
                    else {
                        this.parent.showColumn(updateAction['showhideColumns'][i].field, 'field');
                    }
                }
                this.isUndoRedoPerformed = false;
            }
            else if (updateAction['action'] === 'Filtering') {
                for (var j = 0; j < updateAction['filteredColumns'].length; j++) {
                    this.isFromUndoRedo = true;
                    this.parent.filterByColumn(updateAction['filteredColumns'][j].field, updateAction['filteredColumns'][j].operator, updateAction['filteredColumns'][j].value, updateAction['filteredColumns'][j].predicate, updateAction['filteredColumns'][j].matchCase, updateAction['filteredColumns'][j].ignoreAccent);
                }
            }
            else if (updateAction['action'] === 'ColumnReorder') {
                this.isFromUndoRedo = true;
                var fromColumn = this.parent.treeGrid.columns[updateAction['fromIndex']]['field'];
                var toColumn = this.parent.treeGrid.columns[updateAction['toIndex']]['field'];
                this.parent.reorderColumns(fromColumn, toColumn);
            }
            else if (updateAction['action'] === 'Search') {
                this.isFromUndoRedo = true;
                this.parent.search(updateAction['searchString']);
            }
            else if (updateAction['action'] === 'ColumnResize') {
                this.parent.treeGrid.columns[updateAction['resizedColumn'].index]['width'] = updateAction['resizedColumn'].width;
                this.parent.treeGrid.refreshColumns();
            }
            else if (updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') {
                for (var i = 0; i < updateAction['beforeDrop'].length; i++) {
                    var fromIndex = this.findTaskRowIndex(updateAction['beforeDrop'][i].data.ganttProperties.taskId.toString());
                    var toIndex = this.findTaskRowIndex(updateAction['beforeDrop'][i]['id'].toString());
                    this.parent.reorderRows([fromIndex], toIndex, updateAction['beforeDrop'][i].position);
                }
            }
            else if (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent') {
                this.parent.selectRow(updateAction['selectedRowIndexes'][0]);
                if (updateAction['action'] === 'Indent') {
                    this.parent.indent();
                }
                if (updateAction['action'] === 'Outdent') {
                    this.parent.outdent();
                }
            }
            else if (updateAction['action'] === 'Delete') {
                var isShowDeleteConfirmDialog = extend([], [this.parent.editSettings.showDeleteConfirmDialog], [], true)[0];
                this.parent.editSettings.showDeleteConfirmDialog = false;
                this.parent.deleteRecord(updateAction['deleteRecords']);
                this.parent.editSettings.showDeleteConfirmDialog = isShowDeleteConfirmDialog;
            }
            else if (updateAction['action'] === 'Add') {
                if (this.parent.viewType === 'ResourceView' && updateAction['deletedRecordsDetails'].length > 1) {
                    this.parent.editModule.addRecord(extend([], [], updateAction['deletedRecordsDetails'], true));
                }
                else {
                    for (var i = 0; i < updateAction['deletedRecordsDetails'].length; i++) {
                        var rowIndex = this.findTaskRowIndex(updateAction['deletedRecordsDetails'][i].id.toString());
                        var position = void 0;
                        if (updateAction['deletedRecordsDetails'][i].position === 'above') {
                            position = 'Above';
                        }
                        if (updateAction['deletedRecordsDetails'][i].position === 'below') {
                            position = 'Below';
                        }
                        if (updateAction['deletedRecordsDetails'][i].position === 'child') {
                            position = 'Child';
                        }
                        if (updateAction['deletedRecordsDetails'][i].position === 'bottom') {
                            position = 'Bottom';
                        }
                        this.parent.editModule.addRecord(updateAction['deletedRecordsDetails'][i].data, position, rowIndex);
                    }
                }
            }
            else {
                this.parent.updateRecordByID(updateAction['modifiedRecords'][0]);
                this.isUndoRedoPerformed = false;
            }
            if (this.getUndoCollection.length > 0 && this.parent.toolbarModule) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true);
            }
            this.getRedoCollection.splice(this.getRedoCollection.length - 1, 1);
            if (this.getRedoCollection.length === 0 && this.parent.toolbarModule) {
                this.redoEnabled = false;
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], false);
            }
        }
    };
    UndoRedo.prototype.findTaskRowIndex = function (taskId) {
        var _this = this;
        return this.parent.updatedRecords.findIndex(function (data) {
            var dataTaskId = data.ganttProperties.taskId.toString();
            if (_this.parent.viewType === 'ProjectView') {
                return dataTaskId === taskId;
            }
            else {
                var prefixedId = ((data.level === 0 || data.ganttProperties.taskName === 'Unassigned Task') ? 'R' : 'T') + dataTaskId;
                // Support both prefixed and raw taskId for ResourceView
                return dataTaskId === taskId || prefixedId === taskId;
            }
        });
    };
    UndoRedo.prototype.getResourceViewRowIndex = function (data) {
        if (data) {
            var prefix = data.level === 0 ? 'R' : 'T';
            return this.parent.taskIds.indexOf(prefix + data.ganttProperties.taskId.toString());
        }
        return -1;
    };
    UndoRedo.prototype.createUndoCollection = function () {
        if (this.parent['totalUndoAction'] + 1 > this.parent.undoRedoStepsCount && this.getUndoCollection.length === this.parent['totalUndoAction']) {
            this.getUndoCollection.splice(0, 1);
            this.disableRedo();
        }
        if (this.parent.toolbarModule) {
            this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true);
        }
        if (this.getUndoCollection.length === 0) {
            this.getUndoCollection[0] = [];
            if (this.parent['totalUndoAction'] + 1 <= this.parent.undoRedoStepsCount) {
                this.parent['totalUndoAction']++;
            }
        }
        else if (Object.keys(this['getUndoCollection'][this['getUndoCollection'].length - 1])['length'] > 0) {
            this.getUndoCollection[this.getUndoCollection.length] = [];
            if (this.parent['totalUndoAction'] + 1 <= this.parent.undoRedoStepsCount) {
                this.parent['totalUndoAction']++;
            }
        }
    };
    UndoRedo.prototype.disableRedo = function () {
        this.redoEnabled = false;
        this.getRedoCollection = [];
        if (this.parent.toolbarModule) {
            this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], false);
        }
    };
    UndoRedo.prototype.findPosition = function (rowItems, records, detail) {
        var _loop_1 = function (i) {
            var record = {};
            record['data'] = rowItems[i];
            if (this_1.parent.viewType === 'ProjectView') {
                if (!rowItems[i].hasChildRecords && rowItems[i].parentItem) {
                    var parentItem = this_1.parent.getRecordByID(rowItems[i].parentItem.taskId);
                    if (parentItem.childRecords.length > 1) {
                        var recIndex = this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString());
                        var previousRecord = this_1.parent.flatData[recIndex - 1];
                        if (previousRecord.parentItem &&
                            previousRecord.parentItem.taskId.toString() === parentItem.ganttProperties.taskId.toString()) {
                            record['position'] = 'below';
                            record['id'] = extend([], [this_1.parent.flatData[this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) - 1].ganttProperties.taskId], [], true)[0];
                        }
                        else {
                            record['position'] = 'above';
                            var currentData = this_1.parent.flatData[this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) + 1];
                            var index = this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) + 1;
                            var rowIndex = i;
                            do {
                                var rowData = rowItems[rowIndex + 1];
                                if (!rowData ||
                                    (rowData && currentData.ganttProperties.taskId.toString() !==
                                        rowData.ganttProperties.taskId.toString())) {
                                    if (currentData && currentData.parentItem) {
                                        record['id'] = extend([], [currentData.ganttProperties.taskId], [], true)[0];
                                    }
                                    else {
                                        record['id'] = extend([], [rowItems[i].parentItem.taskId], [], true)[0];
                                        record['position'] = 'child';
                                    }
                                }
                                else {
                                    rowIndex++;
                                    index++;
                                    currentData = this_1.parent.flatData[index];
                                }
                            } while (!record['id']);
                        }
                    }
                    else {
                        record['position'] = 'child';
                        record['id'] = extend([], [parentItem.ganttProperties.taskId], [], true)[0];
                    }
                }
                else if (!rowItems[i].hasChildRecords && !rowItems[i].parentItem) {
                    if (this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) === this_1.parent.ids.length - 1) {
                        record['position'] = 'below';
                    }
                    else {
                        record['position'] = 'above';
                    }
                    var parentIndex = void 0;
                    var currentData = void 0;
                    var prevInd = void 0;
                    for (var k = 0; k < this_1.parent.treeGrid.parentData.length; k++) {
                        if (this_1.parent.treeGrid.parentData[k]['ganttProperties'].taskId.toString() === rowItems[i].ganttProperties.taskId.toString()) {
                            parentIndex = k;
                            currentData = this_1.parent.treeGrid.parentData[k + 1];
                            prevInd = k + 1;
                            break;
                        }
                    }
                    var rowIndex = i;
                    do {
                        var rowData = rowItems[rowIndex + 1];
                        if (!rowData || (rowData && currentData['ganttProperties'].taskId.toString() !== rowData.ganttProperties.taskId.toString())) {
                            if (currentData) {
                                record['id'] = extend([], [currentData['ganttProperties'].taskId], [], true)[0];
                            }
                            else {
                                currentData = this_1.parent.treeGrid.parentData[parentIndex - 1];
                                if (!currentData) {
                                    currentData = this_1.parent.treeGrid.parentData[parentIndex];
                                }
                                record['id'] = extend([], [currentData['ganttProperties'].taskId], [], true)[0];
                            }
                        }
                        else {
                            rowIndex++;
                            prevInd++;
                            currentData = this_1.parent.treeGrid.parentData[prevInd];
                        }
                    } while (!record['id']);
                }
                else if (rowItems[i].hasChildRecords && !rowItems[i].parentItem) {
                    var parentIndex = void 0;
                    var currentData = void 0;
                    var prevInd = void 0;
                    for (var k = 0; k < this_1.parent.treeGrid.parentData.length; k++) {
                        if (this_1.parent.treeGrid.parentData[k]['ganttProperties'].taskId.toString() === rowItems[i].ganttProperties.taskId.toString()) {
                            parentIndex = k;
                            currentData = this_1.parent.treeGrid.parentData[k + 1];
                            prevInd = k + 1;
                            break;
                        }
                    }
                    if (parentIndex !== -1) {
                        if (parentIndex === 0) {
                            record['position'] = 'above';
                            var rowIndex = i;
                            do {
                                var rowData = rowItems[rowIndex + 1];
                                if (!rowData || (rowData && currentData['ganttProperties'].taskId.toString() !== rowData.ganttProperties.taskId.toString())) {
                                    if (!currentData) {
                                        currentData = this_1.parent.treeGrid.parentData[parentIndex];
                                    }
                                    record['id'] = extend([], [currentData['ganttProperties'].taskId], [], true)[0];
                                }
                                else {
                                    rowIndex++;
                                    prevInd++;
                                    currentData = this_1.parent.treeGrid.parentData[prevInd];
                                }
                            } while (!record['id']);
                        }
                        else {
                            record['position'] = 'below';
                            record['id'] = extend([], [this_1.parent.treeGrid.parentData[parentIndex - 1].ganttProperties.taskId], [], true)[0];
                        }
                    }
                }
                else if (rowItems[i].hasChildRecords && rowItems[i].parentItem) {
                    var parentItem = this_1.parent.getRecordByID(rowItems[i].parentItem.taskId);
                    var childRecords = parentItem.childRecords;
                    var childCount = childRecords.length;
                    var currentTaskId_1 = rowItems[i].ganttProperties.taskId.toString();
                    if (childCount === 1) {
                        record['position'] = 'child';
                        record['id'] = extend([], [parentItem.ganttProperties.taskId], [], true)[0];
                    }
                    else {
                        var childIndex = childRecords.findIndex(function (child) {
                            return child.ganttProperties.taskId.toString() === currentTaskId_1;
                        });
                        if (childIndex !== -1) {
                            if (childIndex === 0) {
                                record['position'] = 'above';
                                record['id'] = childRecords[1].ganttProperties.taskId;
                            }
                            else {
                                record['position'] = 'below';
                                record['id'] = childRecords[childIndex - 1].ganttProperties.taskId;
                            }
                        }
                    }
                }
            }
            else {
                if (rowItems[i].parentItem) {
                    var parentRecord = void 0;
                    if (rowItems[i].parentItem.index) {
                        parentRecord = this_1.parent.flatData[rowItems[i].parentItem.index];
                    }
                    else {
                        parentRecord = this_1.parent.flatData[this_1.parent.ids.indexOf(rowItems[i].parentItem.taskId)];
                    }
                    if (parentRecord.childRecords.length === 1) {
                        record['position'] = 'child';
                        record['id'] = 'R' + parentRecord.ganttProperties.taskId;
                        if (detail === 'deletedIndexes') {
                            record['position'] = 'child';
                            record['index'] = parentRecord.index;
                        }
                    }
                    else {
                        var currentIndex = void 0;
                        for (var j = 0; j < parentRecord.childRecords.length; j++) {
                            if (parentRecord.childRecords[j].ganttProperties.taskId.toString() ===
                                rowItems[i].ganttProperties.taskId.toString()) {
                                currentIndex = j;
                                break;
                            }
                        }
                        var previousRecord = parentRecord.childRecords[currentIndex - 1];
                        if (previousRecord && previousRecord.parentItem && previousRecord.parentUniqueID === parentRecord.uniqueID) {
                            record['position'] = 'below';
                            record['id'] = extend([], ['T' + this_1.parent.flatData[this_1.parent.taskIds.indexOf('T' + rowItems[i].ganttProperties.taskId.toString()) - 1].ganttProperties.taskId], [], true)[0];
                            if (detail === 'deletedIndexes') {
                                record['index'] = this_1.parent.taskIds.indexOf('T' + rowItems[i].ganttProperties.taskId.toString()) - 1;
                            }
                        }
                        else {
                            var index = void 0;
                            if (currentIndex !== parentRecord.childRecords.length - 1) {
                                record['position'] = 'above';
                                if (currentIndex === 0 && parentRecord.childRecords[1]) {
                                    index = parentRecord.childRecords[1].index;
                                }
                                else if (parentRecord.childRecords[currentIndex - 1]) {
                                    index = parentRecord.childRecords[currentIndex - 1].index;
                                }
                                var currentData = this_1.parent.flatData[index];
                                var recIndex = index;
                                var rowIndex = i;
                                do {
                                    var rowData = rowItems[rowIndex + 1];
                                    if (!rowData ||
                                        (rowData && currentData.ganttProperties.taskId.toString() !==
                                            rowData.ganttProperties.taskId.toString())) {
                                        if (currentData && currentData.parentItem) {
                                            record['id'] = extend([], ['T' + currentData.ganttProperties.taskId], [], true)[0];
                                            if (detail === 'deletedIndexes') {
                                                record['index'] = extend([], [currentData.index], [], true)[0];
                                                if (currentIndex === 0 && parentRecord.childRecords[1].ganttProperties.taskId ===
                                                    currentData.ganttProperties.taskId) {
                                                    record['index'] = record['index'] - 1;
                                                }
                                            }
                                        }
                                        else {
                                            record['id'] = extend([], ['R' + rowItems[i].parentItem.taskId], [], true)[0];
                                            record['position'] = 'child';
                                            if (detail === 'deletedIndexes') {
                                                record['index'] = rowItems[i].parentItem.index;
                                            }
                                        }
                                    }
                                    else {
                                        rowIndex++;
                                        recIndex++;
                                        currentData = this_1.parent.flatData[recIndex];
                                    }
                                } while (!record['id']);
                            }
                            else {
                                if (currentIndex === parentRecord.childRecords.length - 1) {
                                    record['position'] = 'below';
                                }
                                else {
                                    record['position'] = 'above';
                                }
                                record['id'] = 'T' + parentRecord.childRecords[currentIndex - 1].ganttProperties.taskId;
                                if (detail === 'deletedIndexes') {
                                    record['index'] = parentRecord.childRecords[currentIndex - 1].index;
                                }
                            }
                        }
                    }
                }
                else {
                    var parentData = this_1.parent.treeGrid.parentData.filter(function (parentData) {
                        return parentData.ganttProperties.taskId === rowItems[i].ganttProperties.taskId;
                    })[0];
                    var parentDataIndex = this_1.parent.treeGrid.parentData.indexOf(parentData);
                    if (parentDataIndex === 0) {
                        record['position'] = 'above';
                        var currentData = void 0;
                        var prevInd = void 0;
                        for (var k = 0; k < this_1.parent.treeGrid.parentData.length; k++) {
                            if (this_1.parent.treeGrid.parentData[k]['ganttProperties'].taskId === rowItems[i].ganttProperties.taskId) {
                                currentData = this_1.parent.treeGrid.parentData[k + 1];
                                prevInd = k + 1;
                                break;
                            }
                        }
                        var rowIndex = i;
                        do {
                            var rowData = rowItems[rowIndex + 1];
                            if (!rowData || (rowData && currentData['ganttProperties'].taskId !== rowData.ganttProperties.taskId)) {
                                record['id'] = 'R' + currentData['ganttProperties'].taskId;
                                if (detail === 'deletedIndexes') {
                                    record['index'] = currentData['index'];
                                }
                            }
                            else {
                                rowIndex++;
                                prevInd++;
                                currentData = this_1.parent.treeGrid.parentData[prevInd];
                            }
                        } while (!record['id']);
                    }
                    else {
                        record['position'] = 'below';
                        record['id'] = 'R' + this_1.parent.treeGrid.parentData[parentDataIndex - 1]['ganttProperties']['taskId'];
                        if (detail === 'deletedIndexes') {
                            record['index'] = this_1.parent.treeGrid.parentData[parentDataIndex - 1]['index'];
                        }
                    }
                }
            }
            if (detail === 'deletedIndexes') {
                var parent_1 = this_1.parent.getTaskByUniqueID(record['data'].parentUniqueID);
                if (this_1.parent.editModule.dialogModule.ganttResources.length === 0 && records[detail].indexOf(record) === -1) {
                    records[detail].push(record);
                }
                else {
                    for (var j = 0; j < this_1.parent.editModule.dialogModule.ganttResources.length; j++) {
                        if (this_1.parent.editModule.dialogModule.ganttResources[j][this_1.parent.resourceFields.id] !==
                            parent_1.ganttProperties.taskId && records[detail].indexOf(record) === -1) {
                            records[detail].push(record);
                        }
                    }
                }
            }
            else {
                if (!records[detail].some(function (existingRecord) { return existingRecord.data.ganttProperties.taskId === record['data'].ganttProperties.taskId; })) {
                    records[detail].push(record);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < rowItems.length; i++) {
            _loop_1(i);
        }
    };
    UndoRedo.prototype.getModuleName = function () {
        return 'undoRedo';
    };
    /**
     * Destroys the UndoRedo of Gantt.
     *
     * @returns {void} .
     * @private
     */
    UndoRedo.prototype.destroy = function () {
        if (!this.parent.enableUndoRedo && this.parent.undoRedoModule) {
            this.parent.undoRedoModule = undefined;
        }
    };
    return UndoRedo;
}());
export { UndoRedo };
