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
import { getIndex, isScheduledTask } from '../base/utils';
import { getValue, isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { ConstraintType } from '../base/enum';
var Dependency = /** @class */ (function () {
    function Dependency(gantt) {
        this.parentRecord = [];
        this.parentIds = [];
        this.parentPredecessors = [];
        this.validatedParentIds = [];
        this.storeId = [];
        this.isChildRecordValidated = [];
        this.validatedOffsetIds = [];
        this.predecessorsCollection = new Map();
        this.successorsCollection = new Map();
        this.parent = gantt;
        this.dateValidateModule = this.parent.dateValidationModule;
    }
    /**
     * Method to populate predecessor collections in records
     *
     * @returns {void} .
     * @private
     */
    Dependency.prototype.ensurePredecessorCollection = function () {
        var predecessorTasks = this.parent.predecessorsCollection;
        var flatData = this.parent.flatData;
        var flatDataMap = new Map();
        if (flatData != null) {
            for (var _i = 0, flatData_1 = flatData; _i < flatData_1.length; _i++) {
                var record = flatData_1[_i];
                flatDataMap.set(record.ganttProperties.rowUniqueID.toString(), record);
            }
        }
        for (var _a = 0, predecessorTasks_1 = predecessorTasks; _a < predecessorTasks_1.length; _a++) {
            var ganttData = predecessorTasks_1[_a];
            if ((!ganttData.hasChildRecords && !this.parent.allowParentDependency) || this.parent.allowParentDependency) {
                this.ensurePredecessorCollectionHelper(ganttData, ganttData.ganttProperties, flatDataMap);
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {ITaskData} ganttProp .
     * @param {Map<string, IGanttData>} flatDataMap .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.ensurePredecessorCollectionHelper = function (ganttData, ganttProp, flatDataMap) {
        if (flatDataMap === void 0) { flatDataMap = null; }
        var predecessorVal = ganttProp.predecessorsName;
        if (predecessorVal && (typeof predecessorVal === 'string' || typeof predecessorVal === 'number')) {
            this.parent.setRecordValue('predecessor', this.calculatePredecessor(predecessorVal, ganttData, flatDataMap), ganttProp, true);
        }
        else if (predecessorVal && typeof predecessorVal === 'object' && predecessorVal.length) {
            var preValues = [];
            for (var c = 0; c < predecessorVal.length; c++) {
                var predecessorItem = predecessorVal[c];
                var preValue = {};
                preValue.from = getValue('from', predecessorItem) ? getValue('from', predecessorItem) : predecessorVal[c];
                preValue.to = getValue('to', predecessorItem) ? getValue('to', predecessorItem) : ganttProp.rowUniqueID;
                preValue.type = getValue('type', predecessorItem) ? getValue('type', predecessorItem) : 'FS';
                var offsetUnits = getValue('offset', predecessorItem);
                if (isNullOrUndefined(offsetUnits)) {
                    preValue.offset = 0;
                    if (!isNullOrUndefined(this.parent.durationUnit)) {
                        preValue.offsetUnit = this.parent.durationUnit.toLocaleLowerCase();
                    }
                }
                else if (typeof offsetUnits === 'string') {
                    var tempOffsetUnits = this.getOffsetDurationUnit(getValue('offset', predecessorItem));
                    preValue.offset = tempOffsetUnits.duration;
                    preValue.offsetUnit = tempOffsetUnits.durationUnit;
                }
                else {
                    preValue.offset = parseFloat(offsetUnits.toString());
                    if (!isNullOrUndefined(this.parent.durationUnit)) {
                        preValue.offsetUnit = this.parent.durationUnit.toLocaleLowerCase();
                    }
                }
                var isOwnParent = this.checkIsParent(preValue.from.toString());
                if (!isOwnParent) {
                    preValues.push(preValue);
                }
            }
            this.parent.setRecordValue('predecessor', preValues, ganttProp, true);
        }
        this.parent.setRecordValue('predecessorsName', this.getPredecessorStringValue(ganttData), ganttProp, true);
        this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, ganttProp.predecessorsName, ganttData);
        this.parent.setRecordValue(this.parent.taskFields.dependency, ganttProp.predecessorsName, ganttData);
    };
    /**
     * To render unscheduled empty task with 1 day duration during predecessor map
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updateUnscheduledDependency = function (data) {
        var task = this.parent.taskFields;
        var prdList = !isNullOrUndefined(data[task.dependency]) ?
            data[task.dependency].toString().split(',') : [];
        for (var i = 0; i < prdList.length; i++) {
            var predId = parseInt(prdList[i], 10);
            if (!isNaN(predId)) {
                var predData = this.parent.connectorLineModule.getRecordByID(predId.toString());
                var record = !isNullOrUndefined(predData) ?
                    extend({}, {}, predData.taskData, true) : null;
                if (!isNullOrUndefined(record) && isNullOrUndefined(record[task.startDate])
                    && isNullOrUndefined(record[task.duration]) && isNullOrUndefined(record[task.endDate])) {
                    record[task.duration] = 1;
                    var startDate = void 0;
                    var parentItem = predData.parentItem;
                    if (parentItem) {
                        var parentTask = this.parent.getParentTask(predData.parentItem);
                        while (parentTask && !parentTask.ganttProperties.startDate) {
                            parentTask = this.parent.getParentTask(parentTask.parentItem);
                        }
                        startDate = parentTask ? parentTask.ganttProperties.startDate : this.parent.cloneProjectStartDate;
                    }
                    else {
                        startDate = this.parent.cloneProjectStartDate;
                    }
                    record[task.startDate] = startDate;
                    this.parent.updateRecordByID(record);
                }
            }
        }
    };
    /**
     *
     * @param {string} fromId .
     * @returns {boolean} .
     */
    Dependency.prototype.checkIsParent = function (fromId) {
        var boolValue = false;
        var task = this.parent.connectorLineModule.getRecordByID(fromId);
        if (task.hasChildRecords) {
            boolValue = true;
        }
        return boolValue;
    };
    // Get the root parent of the record
    Dependency.prototype.getRootParent = function (rec) {
        var parentRec = rec;
        if (rec.parentItem) {
            parentRec = this.parent.flatData.filter(function (item) {
                return item.uniqueID === rec.parentUniqueID;
            })[0];
            if (parentRec.parentItem) {
                parentRec = this.getRootParent(parentRec);
            }
            return parentRec;
        }
        return parentRec;
    };
    // To check whether the predecessor drawn is valid for parent task
    Dependency.prototype.validateParentPredecessor = function (fromRecord, toRecord) {
        if (fromRecord && toRecord) {
            if (toRecord.hasChildRecords && !fromRecord.hasChildRecords) {
                if (fromRecord.parentUniqueID === toRecord.uniqueID) {
                    return false;
                }
                else {
                    do {
                        if (fromRecord.parentItem) {
                            fromRecord = this.parent.flatData[this.parent.ids.indexOf(fromRecord.parentItem.taskId)];
                            if (fromRecord.uniqueID === toRecord.uniqueID) {
                                return false;
                            }
                        }
                    } while (fromRecord.parentItem);
                }
            }
            else if (!toRecord.hasChildRecords && fromRecord.hasChildRecords) {
                if (toRecord.parentUniqueID === fromRecord.uniqueID) {
                    return false;
                }
                else {
                    do {
                        if (toRecord.parentItem) {
                            toRecord = this.parent.flatData[this.parent.ids.indexOf(toRecord.parentItem.taskId)];
                            if (toRecord.uniqueID === fromRecord.uniqueID) {
                                return false;
                            }
                        }
                    } while (toRecord.parentItem);
                }
            }
            else if (toRecord.hasChildRecords && fromRecord.hasChildRecords) {
                if (toRecord.parentItem && fromRecord.parentItem) {
                    if (fromRecord.parentUniqueID === toRecord.uniqueID || fromRecord.uniqueID === toRecord.parentUniqueID) {
                        return false;
                    }
                }
                else {
                    if (!toRecord.parentItem && fromRecord.parentItem) {
                        var fromRootParent = this.getRootParent(fromRecord);
                        if (fromRootParent.uniqueID === toRecord.uniqueID) {
                            return false;
                        }
                    }
                    else if (toRecord.parentItem && !fromRecord.parentItem) {
                        var toRootParent = this.getRootParent(toRecord);
                        if (toRootParent.uniqueID === fromRecord.uniqueID) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };
    /**
     * Get predecessor collection object from predecessor string value
     *
     * @param {string | number} predecessorValue .
     * @param {IGanttData} ganttRecord .
     * @param {Map<string, IGanttData>} flatDataMap .
     * @returns {IPredecessor[]} .
     * @private
     */
    Dependency.prototype.calculatePredecessor = function (predecessorValue, ganttRecord, flatDataMap) {
        if (flatDataMap === void 0) { flatDataMap = null; }
        var predecessor = predecessorValue.toString();
        var collection = [];
        var parentRecords = [];
        var isResourceView = this.parent.viewType === 'ResourceView';
        var isProjectView = this.parent.viewType === 'ProjectView';
        var allowParentDependency = this.parent.allowParentDependency;
        var ids = isResourceView ? this.parent.getTaskIds() : this.parent.ids;
        var targetId = isResourceView
            ? ganttRecord.ganttProperties.taskId.toString()
            : ganttRecord.ganttProperties.rowUniqueID.toString();
        var guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        var alphaRegex = /[A-Za-z]/;
        var validTypes = new Set(['FS', 'FF', 'SF', 'SS']);
        var predecessorParts = predecessor.replace(/\s+/g, '').split(',');
        for (var _i = 0, predecessorParts_1 = predecessorParts; _i < predecessorParts_1.length; _i++) {
            var el = predecessorParts_1[_i];
            var result = this.processPredecessorElement(el, ids, isResourceView, guidRegex, alphaRegex, validTypes);
            if (!result) {
                continue;
            }
            var match = result.match, predecessorText = result.predecessorText, offsetValue = result.offsetValue, values = result.values;
            var tempOffset = values.length > 1 ? offsetValue + values[1] : '0';
            var offsetUnits = this.getOffsetDurationUnit(tempOffset);
            var obj = {
                from: match[0],
                type: predecessorText,
                isDrawn: false,
                to: targetId,
                offsetUnit: offsetUnits.durationUnit,
                offset: offsetUnits.duration
            };
            if (!allowParentDependency) {
                if (!this.checkIsParent(match[0])) {
                    collection.push(obj);
                }
            }
            else {
                this.handleParentDependency(obj, collection, parentRecords, flatDataMap, isProjectView);
            }
        }
        this.handleUndoRedoParentRecords(parentRecords);
        return this.removeDuplicatePredecessors(collection);
    };
    Dependency.prototype.processPredecessorElement = function (el, ids, isResourceView, guidRegex, alphaRegex, validTypes) {
        var values = [];
        var offsetValue = '+';
        var predecessorText = 'FS';
        var _a = this.processElementFormat(el, guidRegex, ids, isResourceView, validTypes), isGuid = _a.isGuid, processedValues = _a.processedValues, processedOffset = _a.processedOffset;
        values = processedValues;
        offsetValue = processedOffset;
        var match = this.extractAndValidateMatch(values[0], ids, isResourceView);
        if (!match) {
            return null;
        }
        predecessorText = this.determinePredecessorType(el, match, alphaRegex, validTypes);
        return { match: match, predecessorText: predecessorText, offsetValue: offsetValue, values: values };
    };
    Dependency.prototype.processElementFormat = function (el, guidRegex, ids, isResourceView, validTypes) {
        var elSplit = el.split('-');
        var values = [];
        var offsetValue = '+';
        var isGuid = false;
        if (elSplit.length >= 5) {
            var id = el.substring(0, 36);
            if (guidRegex.test(id)) {
                isGuid = true;
                var lastPart = elSplit[4] + (elSplit[5] ? '-' + elSplit[5] : '');
                if (lastPart.includes('+')) {
                    var split = lastPart.split('+');
                    values = [el.slice(0, -(split[1].length + 1)).trim(), split[1].trim()];
                    offsetValue = '+';
                }
                else if (lastPart.includes('-')) {
                    var split = lastPart.split('-');
                    if (split.length > 1) {
                        values = [el.slice(0, -(split[1].length + 1)).trim(), split[1].trim()];
                        offsetValue = '-';
                    }
                    else {
                        values = [el];
                    }
                }
                else {
                    values = [el];
                }
                return { isGuid: isGuid, processedValues: values, processedOffset: offsetValue };
            }
        }
        var operator = el.includes('+') ? '+' : (el.includes('-') ? '-' : null);
        if (operator !== null) {
            var lastOperatorIndex = el.lastIndexOf(operator);
            var base = el.substring(0, lastOperatorIndex);
            var suffix = el.substring(lastOperatorIndex + 1);
            var lastTwo = base.slice(-2).toUpperCase();
            var finalBase = base;
            if (!validTypes.has(lastTwo)) {
                finalBase = base + 'FS';
            }
            var prefix = finalBase.slice(0, -2).trim();
            var finalTestId = isResourceView ? 'T' + prefix : prefix;
            if (ids.indexOf(finalTestId) === -1 || suffix === '') {
                values = [el];
                offsetValue = '+';
            }
            else {
                values = [finalBase, suffix];
                offsetValue = operator;
            }
        }
        else {
            var lastTwo = el.slice(-2).toUpperCase();
            if (validTypes.has(lastTwo)) {
                var prefix = el.slice(0, -2);
                var finalTestId = isResourceView ? 'T' + prefix : prefix;
                if (ids.indexOf(finalTestId) === -1) {
                    values = [el];
                }
                else {
                    values = [el];
                }
            }
            else {
                values = [el];
            }
        }
        return { isGuid: isGuid, processedValues: values, processedOffset: offsetValue };
    };
    Dependency.prototype.extractAndValidateMatch = function (value, ids, isResourceView) {
        var testId = isResourceView ? 'T' + value : value;
        if (ids.indexOf(testId) !== -1) {
            return [value];
        }
        if (ids.indexOf(value) !== -1) {
            return [value];
        }
        var match = value.split(' ');
        if (match.length === 1) {
            if (value.indexOf(' ') !== -1) {
                match = value.match(/(\d+|[A-z]+)/g) || [];
            }
            else if (value.length > 2) {
                match = [value.slice(0, -2), value.slice(-2)];
            }
        }
        var finalTestId = isResourceView ? 'T' + match[0] : match[0];
        return ids.indexOf(finalTestId) !== -1 ? match : null;
    };
    Dependency.prototype.determinePredecessorType = function (el, match, alphaRegex, validTypes) {
        if (match.length > 1) {
            var type = match[1].toUpperCase();
            if (validTypes.has(type)) {
                return type;
            }
            else {
                var error = "The provided dependency type, " + type + ", is invalid. Please ensure that the Dependency Type is FS or FF or SS or SF";
                this.parent.trigger('actionFailure', { error: error });
                return 'FS';
            }
        }
        if (el.indexOf('-') !== -1 && alphaRegex.test(el)) {
            var type = el.slice(-2).toUpperCase();
            return validTypes.has(type) ? type : 'FS';
        }
        return 'FS';
    };
    Dependency.prototype.handleParentDependency = function (obj, collection, parentRecords, flatDataMap, isProjectView) {
        var fromData = null;
        var toData = null;
        if (isProjectView && flatDataMap && flatDataMap.size > 0) {
            fromData = flatDataMap.get(obj.from);
            toData = flatDataMap.get(obj.to);
        }
        else {
            fromData = this.parent.connectorLineModule.getRecordByID(obj.from);
            toData = this.parent.connectorLineModule.getRecordByID(obj.to);
        }
        if (toData && fromData) {
            var isValid = this.validateParentPredecessor(fromData, toData);
            if (isValid) {
                collection.push(obj);
                if (fromData.hasChildRecords &&
                    parentRecords.indexOf(fromData) === -1 &&
                    this.parent.editModule && this.parent.editModule.cellEditModule && this.parent.editModule.cellEditModule.isCellEdit) {
                    parentRecords.push(extend([], [], [fromData], true)[0]);
                }
            }
        }
        else {
            collection.push(obj);
        }
    };
    Dependency.prototype.handleUndoRedoParentRecords = function (parentRecords) {
        if (parentRecords.length > 0 &&
            this.parent.undoRedoModule &&
            this.parent.editModule && this.parent.editModule.cellEditModule &&
            this.parent.editModule.cellEditModule.isCellEdit) {
            var undoCollection = this.parent.undoRedoModule['getUndoCollection'];
            var lastUndo = undoCollection[undoCollection.length - 1];
            if (lastUndo) {
                lastUndo['connectedRecords'] = parentRecords;
            }
        }
    };
    Dependency.prototype.removeDuplicatePredecessors = function (collection) {
        var seen = new Map();
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var data = collection_1[_i];
            var key = data.from + "-" + data.to;
            seen.set(key, data);
        }
        return Array.from(seen.values());
    };
    Dependency.prototype.generatePredecessorValue = function (currentValue, temp) {
        if (currentValue.offset !== 0) {
            temp += currentValue.offset > 0 ? ('+' + currentValue.offset + ' ') : (currentValue.offset + ' ');
            var multiple = currentValue.offset !== 1;
            if (currentValue.offsetUnit === 'day') {
                temp += multiple ? this.parent.localeObj.getConstant('days') : this.parent.localeObj.getConstant('day');
            }
            else if (currentValue.offsetUnit === 'hour') {
                temp += multiple ? this.parent.localeObj.getConstant('hours') : this.parent.localeObj.getConstant('hour');
            }
            else {
                temp += multiple ? this.parent.localeObj.getConstant('minutes') : this.parent.localeObj.getConstant('minute');
            }
        }
        return temp;
    };
    /**
     * Get predecessor value as string with offset values
     *
     * @param {IGanttData} data .
     * @returns {string} .
     * @private
     */
    Dependency.prototype.getPredecessorStringValue = function (data) {
        var predecessors = data.ganttProperties.predecessor;
        var resultString = '';
        var temp1;
        var match = [];
        if (predecessors) {
            var length_1 = predecessors.length;
            for (var i = 0; i < length_1; i++) {
                var currentValue = predecessors[i];
                var temp = '';
                var id = this.parent.viewType === 'ResourceView' ? data.ganttProperties.taskId
                    : data.ganttProperties.rowUniqueID;
                if (currentValue.from !== id.toString()) {
                    temp = currentValue.from + currentValue.type;
                    if (typeof (data.ganttProperties.taskId) === 'string') {
                        match[0] = temp.slice(0, -2);
                        match[1] = temp.slice(-2);
                        temp1 = match[0] + ' ' + match[1];
                    }
                    else {
                        temp1 = temp;
                    }
                    temp = temp1;
                    if (currentValue.offset !== 0) {
                        temp += currentValue.offset > 0 ? ('+' + currentValue.offset + ' ') : (currentValue.offset + ' ');
                        var multiple = currentValue.offset !== 1;
                        if (currentValue.offsetUnit === 'day') {
                            temp += multiple ? this.parent.localeObj.getConstant('days') : this.parent.localeObj.getConstant('day');
                        }
                        else if (currentValue.offsetUnit === 'hour') {
                            temp += multiple ? this.parent.localeObj.getConstant('hours') : this.parent.localeObj.getConstant('hour');
                        }
                        else {
                            temp += multiple ? this.parent.localeObj.getConstant('minutes') : this.parent.localeObj.getConstant('minute');
                        }
                    }
                    if (resultString.length > 0) {
                        resultString = resultString + ',' + temp;
                    }
                    else {
                        resultString = temp;
                    }
                }
            }
        }
        return resultString;
    };
    /*Get duration and duration unit value from tasks*/
    Dependency.prototype.getOffsetDurationUnit = function (val) {
        var duration = 0;
        var durationUnit;
        if (!isNullOrUndefined(this.parent.durationUnit)) {
            durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        }
        var durationUnitLabels = this.parent.durationUnitEditText;
        if (typeof val === 'string') {
            var values = val.match(/[^0-9]+|[0-9]+/g);
            for (var x = 0; x < values.length; x++) {
                values[x] = (values[x]).trim();
            }
            if (values[0] === '-' && values[1]) {
                values[1] = values[0] + values[1];
                values.shift();
            }
            else if (values[0] === '+') {
                values.shift();
            }
            if (values[1] === '.' && !isNaN(parseInt(values[2], 10))) {
                values[0] += values[1] + values[2];
                values.splice(1, 2);
            }
            if (values && values.length <= 2) {
                duration = parseFloat(values[0]);
                durationUnit = values[1] ? (values[1].toLowerCase()).trim() : '';
                if (getValue('minute', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'minute';
                }
                else if (getValue('hour', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'hour';
                }
                else if (getValue('day', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'day';
                }
                else {
                    if (!isNullOrUndefined(this.parent.durationUnit)) {
                        durationUnit = this.parent.durationUnit.toLocaleLowerCase();
                    }
                }
            }
        }
        else {
            duration = val;
            if (!isNullOrUndefined(this.parent.durationUnit)) {
                durationUnit = this.parent.durationUnit.toLocaleLowerCase();
            }
        }
        if (isNaN(duration)) {
            var err = 'The provided value for the offset field is invalid.Please ensure the offset field contains only valid numeric values';
            this.parent.trigger('actionFailure', { error: err });
            duration = 0;
            if (!isNullOrUndefined(this.parent.durationUnit)) {
                durationUnit = this.parent.durationUnit.toLocaleLowerCase();
            }
        }
        return {
            duration: duration,
            durationUnit: durationUnit
        };
    };
    /**
     * Update predecessor object in both from and to tasks collection
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatePredecessors = function (flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var predecessorsCollection = this.parent.predecessorsCollection;
        var ganttRecord;
        var length = predecessorsCollection.length;
        for (var count = 0; count < length; count++) {
            ganttRecord = predecessorsCollection[count];
            if ((!ganttRecord.hasChildRecords && !this.parent.allowParentDependency) || this.parent.allowParentDependency) {
                this.updatePredecessorHelper(ganttRecord, predecessorsCollection, flatDataCollection);
                if (!this.parent.isInPredecessorValidation && this.parent.autoUpdatePredecessorOffset) {
                    this.calculateOffset(ganttRecord);
                }
                if (!ganttRecord.ganttProperties.isAutoSchedule && this.parent.editSettings.allowEditing) {
                    this.validatedOffsetIds = [];
                    this.calculateOffset(ganttRecord);
                }
            }
        }
    };
    /**
     * To update predecessor collection to successor tasks
     *
     * @param {IGanttData} ganttRecord .
     * @param {IGanttData[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatePredecessorHelper = function (ganttRecord, predecessorsCollection, flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var connectorsCollection = ganttRecord.ganttProperties.predecessor;
        var successorGanttRecord;
        var connectorCount = connectorsCollection.length;
        predecessorsCollection = isNullOrUndefined(predecessorsCollection) ? [] : predecessorsCollection;
        for (var i = 0; i < connectorCount; i++) {
            var connector = connectorsCollection[i];
            if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(flatDataCollection)) {
                successorGanttRecord = flatDataCollection.get(connector.from);
            }
            else {
                successorGanttRecord = this.parent.connectorLineModule.getRecordByID(connector.from);
            }
            var id = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
                : ganttRecord.ganttProperties.rowUniqueID;
            if (connector.from !== id.toString()) {
                if (successorGanttRecord) {
                    var predecessorCollection = void 0;
                    if (successorGanttRecord.ganttProperties.predecessor) {
                        predecessorCollection = (extend([], successorGanttRecord.ganttProperties.predecessor, [], true));
                        predecessorCollection.push(connector);
                        this.parent.setRecordValue('predecessor', predecessorCollection, successorGanttRecord.ganttProperties, true);
                        //  successorGanttRecord.ganttProperties.predecessor.push(connector);
                    }
                    else {
                        predecessorCollection = [];
                        predecessorCollection.push(connector);
                        this.parent.setRecordValue('predecessor', predecessorCollection, successorGanttRecord.ganttProperties, true);
                        // this.parent.setRecordValue('predecessor', [], successorGanttRecord.ganttProperties, true);
                        // successorGanttRecord.ganttProperties.predecessor.push(connector);
                        predecessorsCollection.push(successorGanttRecord);
                    }
                }
            }
        }
    };
    Dependency.prototype.traverseParents = function (record, isParent) {
        this.parent.dataOperation.updateParentItems(record, isParent);
    };
    /**
     * Method to validate date of tasks with predecessor values for all records
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatedRecordsDateByPredecessor = function (flatDataCollection) {
        var _this = this;
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (!this.parent.autoCalculateDateScheduling ||
            (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) {
            return;
        }
        var flatData = this.parent.flatData;
        var totLength = flatData.length;
        if (totLength === 0) {
            return;
        }
        if (isNullOrUndefined(flatDataCollection)) {
            flatDataCollection = new Map();
            for (var _i = 0, flatData_2 = flatData; _i < flatData_2.length; _i++) {
                var record = flatData_2[_i];
                flatDataCollection.set(record.ganttProperties.rowUniqueID.toString(), record);
            }
        }
        var parentsToUpdate = new Set();
        var isProjectView = this.parent.viewType === 'ProjectView';
        var allowParentDependency = this.parent.allowParentDependency;
        var validatedRecords = new Set();
        for (var count = 0; count < totLength; count++) {
            var currentTask = flatData[count];
            var properties = currentTask.ganttProperties;
            if (!properties.predecessorsName) {
                continue;
            }
            var currentTaskKey = currentTask.ganttProperties.taskId.toString();
            if (!validatedRecords.has(currentTaskKey)) {
                this.validatePredecessorDates(currentTask, flatDataCollection);
            }
            if (currentTask.hasChildRecords && properties.startDate && allowParentDependency) {
                this.updateChildItems(currentTask);
            }
            var predecessorCollection = properties.predecessor;
            if (predecessorCollection && predecessorCollection.length > 1) {
                var currentTaskId = currentTask.ganttProperties.taskId.toString();
                for (var _a = 0, predecessorCollection_1 = predecessorCollection; _a < predecessorCollection_1.length; _a++) {
                    var predecessor = predecessorCollection_1[_a];
                    var validateRecord = isProjectView
                        ? flatDataCollection.get(predecessor.to)
                        : this.parent.connectorLineModule.getRecordByID(predecessor.to);
                    if (validateRecord && validateRecord.ganttProperties.taskId.toString() !== currentTaskId) {
                        this.validatePredecessorDates(validateRecord, flatDataCollection);
                        validatedRecords.add(validateRecord.ganttProperties.taskId.toString());
                    }
                }
            }
            if (currentTask.parentItem || currentTask.hasChildRecords) {
                var parentId = currentTask.parentItem ? currentTask.parentItem.taskId : currentTask.ganttProperties.taskId;
                parentsToUpdate.add(parentId);
            }
        }
        if (!this.parent.isLoad) {
            parentsToUpdate.forEach(function (parentId) {
                if (!parentsToUpdate.has(parentId)) {
                    return;
                }
                var parentRecord = isProjectView
                    ? flatDataCollection.get(parentId)
                    : _this.parent.getRecordByID(parentId);
                if (parentRecord) {
                    _this.traverseParents(parentRecord, true);
                }
            });
        }
        this.parent.dataOperation['processedParentItems'].clear();
    };
    Dependency.prototype.updateParentPredecessor = function (flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (flatDataCollection.size === 0) {
            this.parentPredecessors = [];
            return;
        }
        if (this.parent.enablePredecessorValidation) {
            var parentPredecessorLength = this.parentPredecessors.length;
            for (var i = parentPredecessorLength - 1; i >= 0; i--) {
                var item = this.parentPredecessors[i];
                this.validatePredecessorDates(item, flatDataCollection);
                if (item.ganttProperties.startDate) {
                    this.updateChildItems(item);
                }
            }
        }
    };
    /**
     * To validate task date values with dependency
     *
     * @param {IGanttData} ganttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.validatePredecessorDates = function (ganttRecord, flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var predecessorsCollection = ganttRecord.ganttProperties.predecessor;
        if (!predecessorsCollection || predecessorsCollection.length === 0) {
            return;
        }
        var isResourceView = this.parent.viewType === 'ResourceView';
        var isProjectView = this.parent.viewType === 'ProjectView';
        var allowParentDependency = this.parent.allowParentDependency;
        var allowTaskbarDragAndDrop = this.parent.allowTaskbarDragAndDrop;
        var validateManualTasks = this.parent.validateManualTasksOnLinking;
        var isLoad = this.parent.isLoad;
        var hasValidFlatData = isProjectView && !isNullOrUndefined(flatDataCollection);
        var currentTaskId = isResourceView
            ? ganttRecord.ganttProperties.taskId.toString()
            : ganttRecord.ganttProperties.rowUniqueID.toString();
        var predecessors = predecessorsCollection.filter(function (data) {
            return data.to === currentTaskId;
        });
        if (predecessors.length === 0) {
            return;
        }
        var predecessor = predecessors[0];
        var parentGanttRecord;
        var record;
        var originalStartDate = null;
        var originalEndDate = null;
        if (hasValidFlatData) {
            parentGanttRecord = flatDataCollection.get(predecessor.from);
            record = flatDataCollection.get(predecessor.to);
        }
        else {
            parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
            record = this.parent.connectorLineModule.getRecordByID(predecessor.to);
        }
        var taskFields = this.parent.taskFields;
        if (this.parent.autoCalculateDateScheduling && this.parent.isLoad) {
            // Resolve and store original start date with working time applied
            if (record && record[taskFields.startDate]) {
                var naiveStartDate = record[taskFields.startDate];
                this.parent.dataOperation['resolveAndApplyWorkingTimes'](naiveStartDate);
                originalStartDate = new Date(naiveStartDate.getTime());
            }
            // Resolve and store original end date with working time applied
            if (record && record[taskFields.endDate]) {
                var naiveEndDate = record[taskFields.endDate];
                this.parent.dataOperation['resolveAndApplyWorkingTimes'](null, naiveEndDate);
                originalEndDate = new Date(naiveEndDate.getTime());
            }
        }
        if (allowParentDependency && parentGanttRecord && parentGanttRecord.hasChildRecords) {
            this.parent.dataOperation.updateParentItems(parentGanttRecord);
        }
        if (isProjectView && allowTaskbarDragAndDrop) {
            if (isNullOrUndefined(record)) {
                var index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.to);
                if (index !== -1) {
                    record = this.parent.editModule.taskbarEditModule.previousFlatData[index];
                }
            }
            else if (isNullOrUndefined(parentGanttRecord)) {
                var index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.from);
                if (index !== -1) {
                    parentGanttRecord = this.parent.editModule.taskbarEditModule.previousFlatData[index];
                }
            }
        }
        if (allowParentDependency && isLoad &&
            this.parentPredecessors.indexOf(ganttRecord) === -1 &&
            (ganttRecord.hasChildRecords || (record && record.hasChildRecords))) {
            this.parentPredecessors.push(ganttRecord);
        }
        if (record && (record.ganttProperties.isAutoSchedule || validateManualTasks)) {
            this.validateChildGanttRecord(parentGanttRecord, record, flatDataCollection, predecessors);
        }
        // Auto-schedule validation: check if dates were adjusted due to working time rules
        if (this.parent.autoCalculateDateScheduling && this.parent.isLoad &&
            isNullOrUndefined(record[taskFields.constraintDate]) &&
            ((record[taskFields.startDate] && originalStartDate &&
                originalStartDate.getTime() !== record[taskFields.startDate].getTime()) ||
                (record[taskFields.endDate] && originalEndDate &&
                    originalEndDate.getTime() !== record[taskFields.endDate].getTime()))) {
            this.parent.dataOperation['validatedGanttData'].set(record.ganttProperties.taskId, record);
        }
    };
    Dependency.prototype.getConstraintDate = function (constraintType, startDate, endDate, constraintDate) {
        var sourceDate = null;
        switch (constraintType) {
            case ConstraintType.AsSoonAsPossible:
            case ConstraintType.AsLateAsPossible:
                return null;
            case ConstraintType.MustStartOn:
            case ConstraintType.StartNoEarlierThan:
                if (!constraintDate) {
                    return startDate;
                }
                sourceDate = startDate;
                break;
            case ConstraintType.MustFinishOn:
            case ConstraintType.FinishNoEarlierThan:
            case ConstraintType.StartNoLaterThan:
            case ConstraintType.FinishNoLaterThan:
                if (!constraintDate) {
                    return endDate;
                }
                sourceDate = endDate;
                break;
            default:
                return null;
        }
        if (sourceDate) {
            if (typeof constraintDate === 'string') {
                constraintDate = new Date(constraintDate);
            }
            if (constraintDate instanceof Date) {
                constraintDate.setHours(sourceDate.getHours(), sourceDate.getMinutes(), sourceDate.getSeconds(), sourceDate.getMilliseconds());
            }
        }
        return constraintDate;
    };
    /**
     * Method to validate task with predecessor
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @param {IPredecessor[]} childPredecessorCollection .
     * @returns {void} .
     */
    Dependency.prototype.validateChildGanttRecord = function (parentGanttRecord, childGanttRecord, flatDataCollection, childPredecessorCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (this.parent.editedPredecessorRecords.indexOf(childGanttRecord) !== -1) {
            return;
        }
        if (parentGanttRecord && isNullOrUndefined(isScheduledTask(parentGanttRecord.ganttProperties))) {
            return;
        }
        if (childGanttRecord && isNullOrUndefined(isScheduledTask(childGanttRecord.ganttProperties))) {
            return;
        }
        var isInPredecessorValidation = this.parent.isInPredecessorValidation;
        var validateManualTasks = this.parent.validateManualTasksOnLinking;
        var childRecordProperty = childGanttRecord.ganttProperties;
        if (!isInPredecessorValidation || !(childRecordProperty.isAutoSchedule || validateManualTasks)) {
            return;
        }
        var isResourceView = this.parent.viewType === 'ResourceView';
        var taskFields = this.parent.taskFields;
        var hasConstraintFields = taskFields.constraintDate && taskFields.constraintType;
        var isLoad = this.parent.isLoad;
        var isFromOnPropertyChange = this.parent.isFromOnPropertyChange;
        var updateOffsetOnTaskbarEdit = this.parent.updateOffsetOnTaskbarEdit;
        var currentTaskId = isResourceView
            ? childRecordProperty.taskId.toString()
            : childRecordProperty.rowUniqueID.toString();
        var childPredecessor;
        if (!isNullOrUndefined(childPredecessorCollection)) {
            childPredecessor = childPredecessorCollection;
        }
        else {
            var predecessorsCollection = childRecordProperty.predecessor;
            childPredecessor = predecessorsCollection.filter(function (data) {
                return data.to === currentTaskId;
            });
        }
        if (childPredecessor.length === 0 && this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
            if (parentGanttRecord.ganttProperties.predecessor.length > 0) {
                childPredecessor = parentGanttRecord.ganttProperties.predecessor
                    .filter(function (pred) { return pred.to === childGanttRecord.ganttProperties.taskId.toString(); });
            }
        }
        var startDate = this.getPredecessorDate(childGanttRecord, childPredecessor, flatDataCollection);
        this.parent.setRecordValue('startDate', startDate, childRecordProperty, true);
        this.parent.dataOperation.updateMappingData(childGanttRecord, 'startDate');
        if (hasConstraintFields && updateOffsetOnTaskbarEdit) {
            this.calculateOffset(childGanttRecord);
        }
        var segments = childRecordProperty.segments;
        if (isNullOrUndefined(segments) || segments.length === 0) {
            this.dateValidateModule.calculateEndDate(childGanttRecord);
        }
        this.parent.dataOperation.updateWidthLeft(childGanttRecord);
        if (!isLoad && !isFromOnPropertyChange && childGanttRecord.parentItem &&
            isInPredecessorValidation &&
            this.parent.getParentTask(childGanttRecord.parentItem).ganttProperties.isAutoSchedule) {
            var parentUniqueID = childGanttRecord.parentItem.uniqueID;
            if (this.parentIds.indexOf(parentUniqueID) === -1) {
                this.parentIds.push(parentUniqueID);
                this.parentRecord.push(childGanttRecord.parentItem);
            }
        }
        if (hasConstraintFields) {
            var constraintType = childRecordProperty.constraintType;
            var startDate_1 = childRecordProperty.startDate;
            var endDate = childRecordProperty.endDate;
            var constraintDate = this.getConstraintDate(constraintType, startDate_1, endDate, childRecordProperty.constraintDate);
            this.parent.setRecordValue('constraintDate', constraintDate, childRecordProperty, true);
            if (this.parent.autoCalculateDateScheduling && this.parent.isLoad && childRecordProperty.constraintDate &&
                startDate_1.getTime() !== childRecordProperty.constraintDate.getTime()) {
                this.parent.dataOperation['validatedGanttData'].set(childGanttRecord.ganttProperties.taskId, childGanttRecord);
            }
            this.parent.dataOperation.updateMappingData(childGanttRecord, 'constraintDate');
        }
    };
    Dependency.prototype.filterPredecessorsByTarget = function (predecessorsCollection, ganttRecord, viewType) {
        if (!predecessorsCollection ||
            !Array.isArray(predecessorsCollection) ||
            !ganttRecord ||
            !ganttRecord.ganttProperties ||
            !viewType) {
            return [];
        }
        var targetId = viewType === 'ResourceView'
            ? ganttRecord.ganttProperties.taskId
            : ganttRecord.ganttProperties.rowUniqueID;
        return predecessorsCollection.filter(function (data) {
            return data.to === targetId.toString();
        });
    };
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {Date} .
     * @private
     */
    Dependency.prototype.getPredecessorDate = function (ganttRecord, predecessorsCollection, flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var validatedPredecessor = this.filterPredecessorsByTarget(predecessorsCollection, ganttRecord, this.parent.viewType);
        if (!validatedPredecessor || validatedPredecessor.length === 0) {
            return null;
        }
        var isProjectView = this.parent.viewType === 'ProjectView';
        var hasValidFlatData = isProjectView && !isNullOrUndefined(flatDataCollection);
        var allowTaskbarDragAndDrop = this.parent.allowTaskbarDragAndDrop;
        var isConstraintMapped = !isNullOrUndefined(this.parent.taskFields.constraintDate) &&
            !isNullOrUndefined(this.parent.taskFields.constraintType);
        var editModule = this.parent.editModule;
        var shouldCheckOffset = !isConstraintMapped && editModule && editModule.cellEditModule &&
            !editModule.cellEditModule.isCellEdit &&
            !editModule.dialogModule['isFromEditDialog'] &&
            !this.parent.updateOffsetOnTaskbarEdit &&
            !this.parent.isLoad;
        var maxStartDate = null;
        var length = validatedPredecessor.length;
        for (var i = 0; i < length; i++) {
            var predecessor = validatedPredecessor[i];
            var parentGanttRecord = void 0;
            var childGanttRecord = void 0;
            if (hasValidFlatData) {
                parentGanttRecord = flatDataCollection.get(predecessor.from);
                childGanttRecord = flatDataCollection.get(predecessor.to);
            }
            else {
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.to);
            }
            if (isProjectView && allowTaskbarDragAndDrop &&
                !(isNullOrUndefined(childGanttRecord) && isNullOrUndefined(parentGanttRecord))) {
                if (isNullOrUndefined(childGanttRecord)) {
                    childGanttRecord = this.getRecord(parentGanttRecord, childGanttRecord, predecessor);
                }
                if (isNullOrUndefined(parentGanttRecord)) {
                    parentGanttRecord = this.getRecord(parentGanttRecord, childGanttRecord, predecessor);
                }
            }
            if (shouldCheckOffset) {
                var offset = this.getOffsetForPredecessor(predecessor, this.parent.connectorLineModule.getRecordByID(predecessor.from), childGanttRecord);
                if (predecessor.offset <= offset && offset >= 0) {
                    var tempStartDate = childGanttRecord.ganttProperties.startDate;
                    if (maxStartDate === null || this.dateValidateModule.compareDates(tempStartDate, maxStartDate) === 1) {
                        maxStartDate = tempStartDate;
                    }
                }
            }
            if (childGanttRecord && parentGanttRecord) {
                var tempStartDate = this.getValidatedStartDate(childGanttRecord.ganttProperties, parentGanttRecord.ganttProperties, predecessor);
                if (maxStartDate === null || this.dateValidateModule.compareDates(tempStartDate, maxStartDate) === 1) {
                    maxStartDate = tempStartDate;
                }
            }
        }
        if (isConstraintMapped) {
            maxStartDate = this.dateValidateModule.getDateByConstraint(ganttRecord.ganttProperties, maxStartDate, length > 0);
        }
        return maxStartDate;
    };
    /**
     * Get validated start date as per predecessor type
     *
     * @param {ITaskData} ganttProperty .
     * @param {ITaskData} parentRecordProperty .
     * @param {IPredecessor} predecessor .
     * @returns {Date} .
     */
    Dependency.prototype.getValidatedStartDate = function (ganttProperty, parentRecordProperty, predecessor) {
        var type = predecessor.type;
        var offset = predecessor.offset;
        var tempDate;
        var returnStartDate;
        var calendarContext = ganttProperty.calendarContext;
        switch (type) {
            case 'FS':
                tempDate = this.dateValidateModule.getValidEndDate(parentRecordProperty);
                if (!ganttProperty.isMilestone || offset !== 0) {
                    tempDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    returnStartDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                else {
                    returnStartDate = tempDate;
                }
                break;
            case 'FF':
            case 'SF':
                tempDate = type === 'FF' ? this.dateValidateModule.getValidEndDate(parentRecordProperty) :
                    this.dateValidateModule.getValidStartDate(parentRecordProperty);
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    var date = new Date(tempDate);
                    date.setDate(date.getDate() - 1);
                    if (this.parent.allowUnscheduledTasks && isNullOrUndefined(ganttProperty.endDate) &&
                        isNullOrUndefined(ganttProperty.duration)) {
                        tempDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                    }
                    else {
                        tempDate = this.dateValidateModule.checkEndDate(tempDate, ganttProperty);
                    }
                }
                if (ganttProperty.segments && ganttProperty.segments.length !== 0) {
                    var duration = this.dateValidateModule.getDuration(ganttProperty.startDate, ganttProperty.endDate, ganttProperty.durationUnit, ganttProperty.isAutoSchedule, ganttProperty.isMilestone, undefined, calendarContext);
                    returnStartDate = this.dateValidateModule.getStartDate(tempDate, duration, ganttProperty.durationUnit, ganttProperty);
                }
                else {
                    returnStartDate = this.dateValidateModule.getStartDate(tempDate, ganttProperty.duration, ganttProperty.durationUnit, ganttProperty);
                }
                break;
            case 'SS':
                tempDate = this.dateValidateModule.getValidStartDate(parentRecordProperty);
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    returnStartDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                else {
                    returnStartDate = tempDate;
                }
                break;
        }
        return returnStartDate;
    };
    /**
     *
     * @param {Date} date .
     * @param {IPredecessor} predecessor .
     * @param {ITaskData} record .
     * @returns {void} .
     */
    Dependency.prototype.updateDateByOffset = function (date, predecessor, record) {
        var resultDate;
        var offsetValue = predecessor.offset;
        var durationUnit = predecessor.offsetUnit;
        if (offsetValue < 0 && !isNullOrUndefined(date)) {
            resultDate = this.dateValidateModule.getStartDate(this.dateValidateModule.checkEndDate(date, record), (offsetValue * -1), durationUnit, record, true);
        }
        else {
            if (!isNullOrUndefined(date)) {
                resultDate = this.dateValidateModule.getEndDate(date, offsetValue, durationUnit, record, false);
            }
            if (!record.isMilestone) {
                resultDate = this.dateValidateModule.checkStartDate(resultDate, record);
            }
        }
        return resultDate;
    };
    /**
     *
     * @param {IGanttData} records .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.createConnectorLinesCollection = function (records) {
        var ganttRecords = records ? records : this.parent.currentViewData;
        var pdfExportModule = this.parent.pdfExportModule;
        var isPdfExport = pdfExportModule && pdfExportModule.isPdfExport;
        if (isPdfExport) {
            var exportProps = pdfExportModule.helper && pdfExportModule.helper.exportProps;
            var fitToWidthSettings = exportProps && exportProps.fitToWidthSettings;
            if (exportProps && fitToWidthSettings && fitToWidthSettings.isFitToWidth) {
                var exportType = exportProps.exportType;
                var beforeSinglePageExport = pdfExportModule.helper.beforeSinglePageExport;
                ganttRecords = (exportType === 'CurrentViewData') ?
                    beforeSinglePageExport['cloneCurrentViewData'] :
                    beforeSinglePageExport['cloneFlatData'];
            }
        }
        var recordLength = ganttRecords.length;
        var count;
        var ganttRecord;
        var predecessorsCollection;
        if (this.parent.pdfExportModule && this.parent.pdfExportModule.isPdfExport && this.parent.pdfExportModule.helper.exportProps &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings.isFitToWidth && this.parent.pdfExportModule.isPdfExport) {
            this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
                this.parent.pdfExportModule.helper.beforeSinglePageExport['cloneFlatData'] : this.parent.getExpandedRecords(this.parent.pdfExportModule.helper.beforeSinglePageExport['cloneFlatData']);
        }
        else {
            this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
                this.parent.updatedRecords : this.parent.expandedRecords;
        }
        var flatData = this.parent.flatData;
        var flatDataCollection = isPdfExport ? null : new Map();
        if (!isPdfExport && !isNullOrUndefined(flatData)) {
            for (var _i = 0, flatData_3 = flatData; _i < flatData_3.length; _i++) {
                var record = flatData_3[_i];
                flatDataCollection.set(record.ganttProperties.rowUniqueID.toString(), record);
            }
        }
        var chartRows = this.parent.ganttChartModule.getChartRows();
        var rowHeight = !isNullOrUndefined(chartRows) && chartRows[0] && chartRows[0].offsetHeight;
        for (count = 0; count < recordLength; count++) {
            if (this.parent.editModule && this.parent.editModule.deletedTaskDetails.length > 0) {
                var parentRecord = ganttRecords[count].parentItem;
                if (parentRecord) {
                    var parentItem = !isNullOrUndefined(flatDataCollection) ?
                        flatDataCollection.get(parentRecord.taskId.toString()) : this.parent.getRecordByID(parentRecord.taskId.toString());
                    this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentItem), ganttRecords[count]);
                }
            }
            ganttRecord = ganttRecords[count];
            predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            if (predecessorsCollection) {
                this.addPredecessorsCollection(predecessorsCollection, flatDataCollection, rowHeight);
            }
        }
    };
    /**
     *
     * @param {object[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @param {number} rowHeight .
     * @returns {void} .
     */
    Dependency.prototype.addPredecessorsCollection = function (predecessorsCollection, flatDataCollection, rowHeight) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (rowHeight === void 0) { rowHeight = 0; }
        var predecessorsLength;
        var predecessorCount;
        var predecessor;
        var parentGanttRecord;
        var childGanttRecord;
        if (predecessorsCollection) {
            predecessorsLength = predecessorsCollection.length;
            for (predecessorCount = 0; predecessorCount < predecessorsLength; predecessorCount++) {
                predecessor = predecessorsCollection[predecessorCount];
                var from = 'from';
                var to = 'to';
                if (predecessor[from] === predecessor[to]) {
                    break;
                }
                if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(flatDataCollection)) {
                    parentGanttRecord = flatDataCollection.get(predecessor[from]);
                    childGanttRecord = flatDataCollection.get(predecessor[to]);
                }
                else {
                    parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[from]);
                    childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[to]);
                }
                var isValid = true;
                if (((parentGanttRecord && parentGanttRecord.hasChildRecords && !parentGanttRecord.expanded) ||
                    (childGanttRecord && childGanttRecord.hasChildRecords && !childGanttRecord.expanded)) &&
                    !this.parent.allowTaskbarOverlap && this.parent.viewType === 'ProjectView') {
                    isValid = false;
                }
                if (isValid && this.parent.connectorLineModule.expandedRecords &&
                    this.parent.connectorLineModule.expandedRecords.indexOf(parentGanttRecord) !== -1 &&
                    this.parent.connectorLineModule.expandedRecords.indexOf(childGanttRecord) !== -1) {
                    this.updateConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor, rowHeight);
                }
            }
        }
    };
    /**
     * To refresh connector line object collections
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor} predecessor .
     * @param {number} rowHeight .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updateConnectorLineObject = function (parentGanttRecord, childGanttRecord, predecessor, rowHeight) {
        if (rowHeight === void 0) { rowHeight = 0; }
        var connectorObj = this.parent.connectorLineModule.createConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor, rowHeight);
        if (connectorObj) {
            if (childGanttRecord.isCritical && parentGanttRecord.isCritical) {
                connectorObj.isCritical = true;
            }
            if ((this.parent.connectorLineIds.length > 0 && this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId) === -1) ||
                this.parent.connectorLineIds.length === 0) {
                this.parent.updatedConnectorLineCollection.push(connectorObj);
                this.parent.connectorLineIds.push(connectorObj.connectorLineId);
            }
            else if (this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId) !== -1) {
                var index = this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId);
                this.parent.updatedConnectorLineCollection[index] = connectorObj;
            }
            predecessor.isDrawn = true;
        }
        return connectorObj;
    };
    /**
     * Determines whether the dependent task should be updated based on its predecessor relationship,
     * considering the dependency type (FS, SS, SF, FF), predecessor offsets, and previous dates.
     *
     * @param {IGanttData} parentGanttRecord - The predecessor task.
     * @param {IGanttData} record - The dependent task to evaluate.
     * @param {Date} parentPreviousStart - The previous start date of the predecessor task.
     * @param {Date} parentPreviousEnd - The previous end date of the predecessor task.
     * @param {boolean} predecessorConnected - Optional flag indicating if the predecessor link is already established.
     * @returns {boolean} - Returns true if the dependent task requires an update; otherwise, false.
     */
    Dependency.prototype.shouldUpdatePredecessor = function (parentGanttRecord, record, parentPreviousStart, parentPreviousEnd, predecessorConnected) {
        if (isNullOrUndefined(record) ||
            isNullOrUndefined(record.ganttProperties) ||
            isNullOrUndefined(record.ganttProperties.taskId) ||
            isNullOrUndefined(parentGanttRecord) ||
            isNullOrUndefined(parentGanttRecord.ganttProperties)) {
            return false;
        }
        if (!predecessorConnected && isNullOrUndefined(parentPreviousStart) && isNullOrUndefined(parentPreviousEnd)) {
            return true;
        }
        var predecessors = parentGanttRecord.ganttProperties.predecessor;
        if (isNullOrUndefined(predecessors) || !Array.isArray(predecessors)) {
            return false;
        }
        var matchingPredecessor = predecessors
            .find(function (item) { return item.to === record.ganttProperties.taskId.toString(); });
        if (isNullOrUndefined(matchingPredecessor)) {
            return false;
        }
        var type = matchingPredecessor.type;
        var parentProps = parentGanttRecord.ganttProperties;
        var recordProps = record.ganttProperties;
        if (isNullOrUndefined(parentProps) || isNullOrUndefined(recordProps)) {
            return false;
        }
        var parentStart = parentProps.startDate;
        var parentEnd = parentProps.endDate;
        var recordStart = recordProps.startDate;
        var recordEnd = recordProps.endDate;
        var offset = matchingPredecessor.offset;
        var offsetUnit = matchingPredecessor.offsetUnit;
        if (offset !== 0) {
            if (offset > 0) {
                if (parentStart) {
                    parentStart = this.parent.dataOperation.getEndDate(parentStart, Math.abs(offset), offsetUnit, parentProps, false);
                }
                if (parentEnd) {
                    parentEnd = this.parent.dataOperation.getEndDate(parentEnd, Math.abs(offset), offsetUnit, parentProps, false);
                }
            }
            else {
                if (recordStart) {
                    recordStart = this.parent.dataOperation.getEndDate(recordStart, Math.abs(offset), offsetUnit, parentProps, false);
                }
                if (recordEnd) {
                    recordEnd = this.parent.dataOperation.getEndDate(recordEnd, Math.abs(offset), offsetUnit, parentProps, false);
                }
            }
        }
        switch (type) {
            case 'FS':
                return (recordStart != null ? recordStart : recordEnd) < (parentEnd != null ? parentEnd : parentStart);
            case 'SS':
                return (recordStart != null ? recordStart : recordEnd) < (parentStart != null ? parentStart : parentEnd);
            case 'SF':
                return (recordEnd != null ? recordEnd : recordStart) < (parentStart != null ? parentStart : parentEnd);
            case 'FF':
                return (recordEnd != null ? recordEnd : recordStart) < (parentEnd != null ? parentEnd : parentStart);
            default:
                return false;
        }
    };
    /**
     * Handles the update logic for a task's dependency and validates whether child tasks should be updated.
     * It retrieves the previous start and end dates from the stored records to determine if dependency validation is required.
     * If predecessor updates are needed or offset updates are enabled, it triggers child task validation.
     *
     * @param {IGanttData} parentGanttRecord - The parent task whose dependencies are being evaluated.
     * @param {IGanttData} record - The current task being updated.
     * @returns {void}
     */
    Dependency.prototype.handleTaskUpdate = function (parentGanttRecord, record) {
        var previousStartDate;
        var previousEndDate;
        var previousRecord = this.parent.previousRecords[parentGanttRecord.uniqueID];
        var previousGanttProps;
        if (previousRecord && previousRecord['ganttProperties']) {
            previousGanttProps = previousRecord['ganttProperties'];
            if (this.parent.editModule.isDialogEditing) {
                previousStartDate = null;
                previousEndDate = null;
                this.parent.editModule.isDialogEditing = false;
            }
            else {
                previousStartDate = previousGanttProps['startDate'];
                previousEndDate = previousGanttProps['endDate'];
            }
        }
        var isPredecessorDrawn = previousGanttProps && 'predecessor' in previousGanttProps;
        var isUpdateSucessorTask = this.shouldUpdatePredecessor(parentGanttRecord, record, previousStartDate, previousEndDate, isPredecessorDrawn);
        if (this.parent.updateOffsetOnTaskbarEdit || isUpdateSucessorTask) {
            this.validateChildGanttRecord(parentGanttRecord, record);
            if (record.hasChildRecords && record.ganttProperties.isAutoSchedule) {
                this.updateChildItems(record);
            }
        }
    };
    Dependency.prototype.validateAllChildPredecessorsWithUpdate = function (record) {
        var stack = [];
        // Start from all direct children
        for (var i = record.childRecords.length - 1; i >= 0; i--) {
            stack.push(record.childRecords[i]);
        }
        while (stack.length > 0) {
            var currentChild = stack.pop();
            var ganttProp = currentChild.ganttProperties;
            // === YOUR ORIGINAL CHECK — PRESERVED 100% ===
            if (this.isChildRecordValidated.indexOf(ganttProp.taskId) !== -1) {
                continue; // skip, already processed
            }
            this.isChildRecordValidated.push(ganttProp.taskId);
            // === YOUR ORIGINAL PREDECESSOR LOGIC — PRESERVED ===
            if (ganttProp.predecessor && ganttProp.predecessor.length > 0) {
                for (var j = 0; j < ganttProp.predecessor.length; j++) {
                    var pred = ganttProp.predecessor[j];
                    var linkedTaskId = void 0;
                    if (pred.to !== record.ganttProperties.taskId.toString()) {
                        linkedTaskId = pred.to;
                    }
                    else {
                        linkedTaskId = pred.from;
                    }
                    var childRec = this.parent.flatData[this.parent.ids.indexOf(linkedTaskId)];
                    if (childRec) {
                        {
                            this.validatePredecessor(childRec, [], '');
                            // === YOUR ORIGINAL updateChildItems CALL — PRESERVED ===
                            if (childRec.hasChildRecords && this.parent.editModule['editedRecord'].hasChildRecords) {
                                this.updateChildItems(childRec);
                            }
                            // === YOUR ORIGINAL assignment — PRESERVED ===
                            this.isValidatedParentTaskID = childRec.ganttProperties.taskId;
                        }
                    }
                }
            }
            // === PUSH NEXT LEVEL CHILDREN — THIS MAKES IT WORK FOR ALL LEVELS ===
            if (currentChild.hasChildRecords) {
                for (var i = currentChild.childRecords.length - 1; i >= 0; i--) {
                    stack.push(currentChild.childRecords[i]);
                }
            }
        }
    };
    Dependency.prototype.updateParentCollection = function (record, parentRecord, updateParentSet) {
        var parentRec;
        if (record.parentItem) {
            parentRec = this.parent.getTaskByUniqueID(record.parentItem.uniqueID);
            if (parentRec && !updateParentSet.has(parentRec.uniqueID)) {
                updateParentSet.add(parentRec.uniqueID);
                this.parent.editModule['updateParentRecords'].push(parentRec);
            }
        }
        if (parentRecord.parentItem) {
            parentRec = this.parent.getTaskByUniqueID(parentRecord.parentItem.uniqueID);
            if (parentRec && !updateParentSet.has(parentRec.uniqueID)) {
                updateParentSet.add(parentRec.uniqueID);
                this.parent.editModule['updateParentRecords'].push(parentRec);
            }
        }
    };
    /**
     *
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor[]} previousValue .
     * @param {string} validationOn .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.validatePredecessor = function (childGanttRecord, previousValue, validationOn) {
        if (!this.parent.isInPredecessorValidation) {
            return;
        }
        if (!childGanttRecord.ganttProperties.predecessor) {
            return;
        }
        var isResourceView = this.parent.viewType === 'ResourceView';
        var editedRecord = this.parent.editModule['editedRecord'];
        var taskBarModule = this.parent.editModule.taskbarEditModule;
        var ganttProp = taskBarModule ? taskBarModule.taskBarEditRecord : undefined;
        var predecessorsCollection = childGanttRecord.ganttProperties.predecessor;
        var currentTaskId = isResourceView
            ? childGanttRecord.ganttProperties.taskId.toString()
            : childGanttRecord.ganttProperties.rowUniqueID.toString();
        var predecessors = predecessorsCollection.filter(function (data) { return data.to === currentTaskId; });
        var successors = predecessorsCollection.filter(function (data) { return data.from === currentTaskId; });
        var updateParentSet = new Set(this.parent.editModule['updateParentRecords'].map(function (r) { return r.uniqueID; }));
        var parentGanttRecord;
        var record;
        for (var i = 0; i < predecessors.length; i++) {
            var predecessor = predecessors[i];
            parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
            record = this.parent.connectorLineModule.getRecordByID(predecessor.to);
            // Add parents to update list (using Set to avoid duplicates)
            this.updateParentCollection(record, parentGanttRecord, updateParentSet);
            // ProjectView fallback (unchanged logic)
            if (this.parent.viewType === 'ProjectView' && this.parent.allowTaskbarDragAndDrop &&
                !(record == null && parentGanttRecord == null)) {
                if (record == null) {
                    record = this.getRecord(parentGanttRecord, record, predecessor);
                }
                if (parentGanttRecord == null) {
                    parentGanttRecord = this.getRecord(parentGanttRecord, record, predecessor);
                }
            }
            this.parent.isValidationEnabled =
                this.parent.isInPredecessorValidation && (record.ganttProperties.isAutoSchedule);
            var id = isResourceView
                ? childGanttRecord.ganttProperties.taskId
                : childGanttRecord.ganttProperties.rowUniqueID;
            if ((id.toString() === predecessor.to || id.toString() === predecessor.from) &&
                (!validationOn || validationOn === 'predecessor')) {
                this.handleTaskUpdate(parentGanttRecord, record);
                if (editedRecord && editedRecord.hasChildRecords && !editedRecord.parentItem) {
                    this.isValidatedParentTaskID = record.ganttProperties.taskId;
                }
            }
        }
        for (var i = 0; i < successors.length; i++) {
            var successor = successors[i];
            parentGanttRecord = this.parent.connectorLineModule.getRecordByID(successor.from);
            record = this.parent.connectorLineModule.getRecordByID(successor.to);
            this.updateParentCollection(record, parentGanttRecord, updateParentSet);
            // ProjectView fallback (identical logic)
            if (this.parent.viewType === 'ProjectView' && this.parent.allowTaskbarDragAndDrop &&
                !(record == null && parentGanttRecord == null)) {
                if (record == null) {
                    record = this.getRecord(parentGanttRecord, record, successor);
                }
                if (parentGanttRecord == null) {
                    parentGanttRecord = this.getRecord(parentGanttRecord, record, successor);
                }
            }
            this.parent.isValidationEnabled =
                this.parent.isInPredecessorValidation && (record.ganttProperties.isAutoSchedule);
            if (validationOn !== 'predecessor' && this.parent.isValidationEnabled) {
                this.handleTaskUpdate(parentGanttRecord, record);
                if (editedRecord && record) {
                    var rootParent = parentGanttRecord.parentItem
                        ? this.getRootParent(parentGanttRecord)
                        : null;
                    if (record.hasChildRecords &&
                        (!editedRecord.hasChildRecords ||
                            (!record.parentItem &&
                                (!rootParent || rootParent.ganttProperties.taskId === editedRecord.ganttProperties.taskId))) &&
                        this.isValidatedParentTaskID !== record.ganttProperties.taskId) {
                        this.updateChildItems(record);
                        this.validateAllChildPredecessorsWithUpdate(record);
                        this.isValidatedParentTaskID = record.ganttProperties.taskId;
                    }
                    if (editedRecord.hasChildRecords && !editedRecord.parentItem) {
                        this.isValidatedParentTaskID = record.ganttProperties.taskId;
                    }
                }
            }
            else if (!record.ganttProperties.isAutoSchedule && this.parent.updateOffsetOnTaskbarEdit) {
                this.validatedOffsetIds = [];
                this.calculateOffset(record);
            }
            // Expanded check & recursion
            if ((parentGanttRecord.expanded === false || record.expanded === false) && record) {
                this.validatePredecessor(record, undefined, 'successor');
                continue;
            }
            if (record) {
                if (this.parent.editModule.isFirstCall) {
                    var taskIdsForView = isResourceView ? this.parent.getTaskIds() : this.parent.ids;
                    this.storeId = taskIdsForView.slice();
                    this.parent.editModule.isFirstCall = false;
                }
                if (this.storeId) {
                    var idAsString = record[this.parent.taskFields.id].toString();
                    var searchId = isResourceView ? "T" + idAsString : idAsString;
                    var index = this.storeId.indexOf(searchId);
                    if (index !== -1) {
                        this.storeId.splice(index, 1);
                        this.validatePredecessor(record, undefined, 'successor');
                    }
                }
                else {
                    this.validatePredecessor(record, undefined, 'successor');
                }
            }
        }
        if (record && !record.hasChildRecords && record.parentItem &&
            !this.validatedParentIds.indexOf(record.parentItem.taskId)) {
            this.validatedParentIds.push(record.parentItem.taskId);
        }
        var validUpdate = true;
        if (record && record.hasChildRecords &&
            this.validatedParentIds.indexOf(record.ganttProperties.taskId.toString())) {
            validUpdate = false;
        }
        if (validUpdate && record) {
            if (record.ganttProperties.taskId !== this.isValidatedParentTaskID && ganttProp) {
                if (taskBarModule.taskBarEditAction !== 'ParentDrag' &&
                    taskBarModule.taskBarEditAction !== 'ChildDrag') {
                    if (!ganttProp.hasChildRecords && record.hasChildRecords) {
                        this.updateChildItems(record);
                        this.isValidatedParentTaskID = record.ganttProperties.taskId;
                    }
                }
                if (record.parentItem) {
                    this.parent.dataOperation.updateParentItems(record, true);
                    var parentData = this.parent.getParentTask(record.parentItem);
                    if (this.storeId && parentData.ganttProperties.predecessor && parentData.ganttProperties.predecessor.length > 0) {
                        var parentIdStr = parentData[this.parent.taskFields.id].toString();
                        var index = this.storeId.indexOf(parentIdStr);
                        if (index !== -1) {
                            for (var i = 0; i < parentData.ganttProperties.predecessor.length; i++) {
                                var pred = parentData.ganttProperties.predecessor[i];
                                if (pred.to !== parentData.ganttProperties.taskId.toString()) {
                                    var childRec = this.parent.flatData[this.parent.ids.indexOf(pred.to)];
                                    if (childRec && childRec.parentItem) {
                                        this.validateChildGanttRecord(record, childRec);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (record.hasChildRecords &&
                this.isValidatedParentTaskID !== record.ganttProperties.taskId &&
                !ganttProp) {
                this.updateChildItems(record);
                this.isValidatedParentTaskID = record.ganttProperties.taskId;
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     */
    Dependency.prototype.updateChildItems = function (ganttRecord) {
        var _this = this;
        var calendarContext = ganttRecord.ganttProperties.calendarContext;
        if (ganttRecord.childRecords.length > 0 && this.validatedChildItems && this.validatedChildItems.length > 0) {
            var isPresent = true;
            isPresent = !ganttRecord.childRecords.some(function (record) {
                return _this.validatedChildItems['includes'](record);
            });
            if (!isPresent) {
                return;
            }
        }
        var previousData = this.parent.previousRecords[ganttRecord.uniqueID];
        var previousStartDate;
        if (isNullOrUndefined(previousData) ||
            (isNullOrUndefined(previousData) && !isNullOrUndefined(previousData.ganttProperties))) {
            previousStartDate = new Date(ganttRecord.ganttProperties.startDate.getTime());
        }
        else {
            if (!isNullOrUndefined(previousData.ganttProperties.startDate)) {
                previousStartDate = new Date(previousData.ganttProperties.startDate.getTime());
            }
        }
        var currentStartDate = ganttRecord.ganttProperties.startDate;
        var childRecords = [];
        var validStartDate;
        var validEndDate;
        var calcEndDate;
        var isRightMove;
        var durationDiff;
        this.getUpdatableChildRecords(ganttRecord, childRecords);
        if (childRecords.length === 0) {
            return;
        }
        if (!isNullOrUndefined(previousStartDate) && !isNullOrUndefined(currentStartDate) &&
            previousStartDate.getTime() > currentStartDate.getTime()) {
            validStartDate = this.parent.dateValidationModule.checkStartDate(currentStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(previousStartDate, ganttRecord.ganttProperties);
            isRightMove = false;
        }
        else {
            validStartDate = this.parent.dateValidationModule.checkStartDate(previousStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(currentStartDate, ganttRecord.ganttProperties);
            isRightMove = true;
        }
        //Get Duration
        if (!isNullOrUndefined(validStartDate) && !isNullOrUndefined(validEndDate) && validStartDate.getTime() >= validEndDate.getTime()) {
            durationDiff = 0;
        }
        else {
            durationDiff = this.parent.dateValidationModule.getDuration(validStartDate, validEndDate, ganttRecord.ganttProperties.durationUnit, true, false, undefined, calendarContext);
        }
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                if (durationDiff > 0) {
                    var startDate = isScheduledTask(childRecords[i].ganttProperties) ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.startDate ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.endDate ?
                        childRecords[i].ganttProperties.endDate : new Date(previousStartDate.toString());
                    if (isRightMove) {
                        calcEndDate = this.parent.dateValidationModule.getEndDate(this.parent.dateValidationModule.checkStartDate(startDate, childRecords[i].ganttProperties, childRecords[i].ganttProperties.isMilestone), durationDiff, childRecords[i].ganttProperties.durationUnit, childRecords[i].ganttProperties, false);
                    }
                    else {
                        calcEndDate = this.parent.dateValidationModule.getStartDate(this.parent.dateValidationModule.checkEndDate(startDate, childRecords[i].ganttProperties), durationDiff, childRecords[i].ganttProperties.durationUnit, childRecords[i].ganttProperties);
                    }
                    this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
                else if (isNullOrUndefined(previousData)) {
                    calcEndDate = previousStartDate;
                    if (childRecords[i].ganttProperties.startDate.getTime() <= calcEndDate.getTime()) {
                        this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    }
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
            }
        }
    };
    /**
     * To get updated child records.
     *
     * @param {IGanttData} parentRecord .
     * @param {IGanttData} childLists .
     * @returns {void} .
     */
    Dependency.prototype.getUpdatableChildRecords = function (parentRecord, childLists) {
        var childRecords = parentRecord.childRecords;
        for (var _i = 0, childRecords_1 = childRecords; _i < childRecords_1.length; _i++) {
            var childRecord = childRecords_1[_i];
            if (childRecord.ganttProperties.isAutoSchedule) {
                childLists.push(childRecord);
                if (childRecord.hasChildRecords) {
                    this.getUpdatableChildRecords(childRecord, childLists);
                }
            }
        }
    };
    /**
     *
     * @param {IGanttData} data .
     * @param {Date} newStartDate .
     * @returns {void} .
     */
    Dependency.prototype.calculateDateByRoundOffDuration = function (data, newStartDate) {
        var ganttRecord = data;
        var taskData = ganttRecord.ganttProperties;
        var projectStartDate = new Date(newStartDate.getTime());
        if (!isNullOrUndefined(taskData.endDate) && isNullOrUndefined(taskData.startDate)) {
            var endDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, null);
            this.parent.setRecordValue('endDate', this.parent.dateValidationModule.checkEndDate(endDate, ganttRecord.ganttProperties), taskData, true);
        }
        else {
            this.parent.setRecordValue('startDate', this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, false), taskData, true);
            if (!isNullOrUndefined(taskData.duration)) {
                this.parent.dateValidationModule.calculateEndDate(ganttRecord);
            }
        }
        this.parent.dataOperation.updateWidthLeft(data);
        this.parent.dataOperation.updateTaskData(ganttRecord);
    };
    Dependency.prototype.getRecord = function (parentGanttRecord, record, predecessor) {
        var index;
        var data;
        if (isNullOrUndefined(record)) {
            index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.to);
            data = this.parent.editModule.taskbarEditModule.previousFlatData[index];
        }
        else if (isNullOrUndefined(parentGanttRecord)) {
            index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.from);
            data = this.parent.editModule.taskbarEditModule.previousFlatData[index];
        }
        return data;
    };
    /**
     * Method to get validate able predecessor alone from record
     *
     * @param {IGanttData} record .
     * @returns {IPredecessor[]} .
     * @private
     */
    Dependency.prototype.getValidPredecessor = function (record) {
        var _this = this;
        var validPredecessor = [];
        if (!isNullOrUndefined(record)) {
            var recPredecessor = record.ganttProperties.predecessor;
            if (recPredecessor && recPredecessor.length > 0) {
                validPredecessor = recPredecessor.filter(function (value) {
                    var id = _this.parent.viewType === 'ResourceView' ? record.ganttProperties.taskId
                        : record.ganttProperties.rowUniqueID;
                    return value.from !== id.toString();
                });
            }
        }
        return validPredecessor;
    };
    Dependency.prototype.compareObjects = function (obj1, obj2) {
        var keys1 = Object.keys(obj1).filter(function (key) { return key !== 'offset'; });
        var keys2 = Object.keys(obj2).filter(function (key) { return key !== 'offset'; });
        if (keys1.length !== keys2.length) {
            return false;
        }
        return keys1.every(function (key) { return obj1[key] === obj2[key]; });
    };
    Dependency.prototype.getOffsetForPredecessor = function (predecessor, parentTask, record) {
        var offset = 0;
        if ((parentTask.ganttProperties.startDate || parentTask.ganttProperties.endDate) &&
            (record.ganttProperties.startDate || record.ganttProperties.endDate)) {
            var tempStartDate = void 0;
            var tempEndDate = void 0;
            var tempDuration = void 0;
            var isNegativeOffset = void 0;
            switch (predecessor.type) {
                case 'FS':
                    tempStartDate = new Date((parentTask.ganttProperties.endDate || parentTask.ganttProperties.startDate).getTime());
                    tempEndDate = new Date((record.ganttProperties.startDate || record.ganttProperties.endDate).getTime());
                    break;
                case 'SS':
                    tempStartDate = new Date((parentTask.ganttProperties.startDate || parentTask.ganttProperties.endDate).getTime());
                    tempEndDate = new Date((record.ganttProperties.startDate || record.ganttProperties.endDate).getTime());
                    break;
                case 'SF':
                    tempStartDate = new Date((parentTask.ganttProperties.startDate || parentTask.ganttProperties.endDate).getTime());
                    tempEndDate = new Date((record.ganttProperties.endDate || record.ganttProperties.startDate).getTime());
                    break;
                case 'FF':
                    tempStartDate = new Date((parentTask.ganttProperties.endDate || parentTask.ganttProperties.startDate).getTime());
                    tempEndDate = new Date((record.ganttProperties.endDate || record.ganttProperties.startDate).getTime());
                    break;
            }
            if (tempStartDate.getTime() < tempEndDate.getTime()) {
                tempStartDate = this.dateValidateModule.checkStartDate(tempStartDate);
                tempEndDate = this.dateValidateModule.checkEndDate(tempEndDate, null);
                isNegativeOffset = false;
            }
            else {
                var tempDate = new Date(tempStartDate.getTime());
                tempStartDate = this.dateValidateModule.checkStartDate(tempEndDate);
                tempEndDate = this.dateValidateModule.checkEndDate(tempDate, null);
                isNegativeOffset = true;
            }
            if (tempStartDate.getTime() < tempEndDate.getTime()) {
                tempDuration = this.dateValidateModule.getDuration(tempStartDate, tempEndDate, predecessor.offsetUnit, true, false, undefined, record.ganttProperties.calendarContext);
                if (this.parent.durationUnit === predecessor.offsetUnit &&
                    ((parentTask.ganttProperties.startDate && isNullOrUndefined(parentTask.ganttProperties.endDate)) ||
                        (isNullOrUndefined(parentTask.ganttProperties.startDate) && parentTask.ganttProperties.endDate))) {
                    tempDuration -= 1;
                }
                offset = isNegativeOffset ? -tempDuration : tempDuration;
            }
        }
        return offset;
    };
    Dependency.prototype.calculateOffset = function (record, isRecursive) {
        var _this = this;
        if (!this.parent.autoCalculateDateScheduling || (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand
            && this.parent.taskFields.hasChildMapping)) {
            return;
        }
        if (record && isScheduledTask(record.ganttProperties) !== null) {
            var prevPredecessor = extend([], record.ganttProperties.predecessor, [], true);
            var validPredecessor_1 = this.parent.predecessorModule.getValidPredecessor(record);
            if (validPredecessor_1.length > 0) {
                this.cumulativePredecessorChanges = prevPredecessor;
                var _loop_1 = function (i) {
                    var predecessor = validPredecessor_1[parseInt(i.toString(), 10)];
                    var parentTask = this_1.parent.connectorLineModule.getRecordByID(predecessor.from);
                    if (this_1.parent.undoRedoModule && this_1.parent.undoRedoModule['isUndoRedoPerformed'] && this_1.parent.viewType === 'ProjectView') {
                        var isPresent = parentTask.ganttProperties.predecessor.filter(function (pred) {
                            return pred.from === validPredecessor_1[i].from && pred.to === validPredecessor_1[i].to;
                        });
                        if (isPresent.length === 0) {
                            parentTask.ganttProperties.predecessor.push(validPredecessor_1[i]);
                        }
                    }
                    var offset = this_1.getOffsetForPredecessor(predecessor, parentTask, record);
                    var preIndex = getIndex(predecessor, 'from', prevPredecessor, 'to');
                    if (preIndex !== -1) {
                        prevPredecessor[preIndex].offset = offset;
                    }
                    // Update predecessor in predecessor task
                    var parentPredecessors = extend([], parentTask.ganttProperties.predecessor, [], true);
                    var parentPreIndex = getIndex(predecessor, 'from', parentPredecessors, 'to');
                    if (parentPreIndex !== -1) {
                        parentPredecessors[parentPreIndex].offset = offset;
                    }
                    this_1.parent.setRecordValue('predecessor', parentPredecessors, parentTask.ganttProperties, true);
                };
                var this_1 = this;
                for (var i = 0; i < validPredecessor_1.length; i++) {
                    _loop_1(i);
                }
            }
            else {
                var validPredecessor_2 = record.ganttProperties.predecessor;
                if (validPredecessor_2) {
                    if (validPredecessor_2.length > 0) {
                        validPredecessor_2.forEach(function (element) {
                            if (_this.validatedOffsetIds.indexOf(element.to) === -1) {
                                if (_this.parent.viewType === 'ResourceView') {
                                    _this.validatedOffsetIds.push(element.to);
                                    _this.calculateOffset(_this.parent.getRecordByID((_this.parent.taskIds.indexOf('T' + element.to)).toString()), true);
                                }
                                else {
                                    _this.calculateOffset(_this.parent.getRecordByID(element.to), true);
                                }
                            }
                        });
                    }
                }
            }
            if (!isRecursive) {
                if (validPredecessor_1.length === 0) {
                    this.cumulativePredecessorChanges = [];
                }
                if (prevPredecessor && prevPredecessor.length > 0 && this.cumulativePredecessorChanges &&
                    this.cumulativePredecessorChanges.length > 0) {
                    var matchingObjects = prevPredecessor.map(function (objectToCompare) {
                        var matchedObject = _this.cumulativePredecessorChanges.find(function (obj) { return _this.compareObjects(obj, objectToCompare); });
                        return matchedObject ? __assign({}, matchedObject) : null;
                    }).filter(function (matchedObject) { return matchedObject !== null; });
                    this.parent.setRecordValue('predecessor', matchingObjects, record.ganttProperties, true);
                }
            }
            else {
                this.parent.setRecordValue('predecessor', prevPredecessor, record.ganttProperties, true);
            }
            var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(record);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, record);
            this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, record);
            this.parent.setRecordValue('predecessorsName', predecessorString, record.ganttProperties, true);
            if (this.validatedOffsetIds.indexOf(record.ganttProperties.taskId.toString()) === -1) {
                this.validatedOffsetIds.push(record.ganttProperties.taskId.toString());
            }
            if (record.hasChildRecords) {
                for (var i = 0; i < record.childRecords.length; i++) {
                    if (this.validatedOffsetIds.indexOf(record.childRecords[i].ganttProperties.taskId.toString()) === -1 &&
                        record.childRecords[i].ganttProperties.predecessor &&
                        record.childRecords[i].ganttProperties.predecessor.length > 0) {
                        this.calculateOffset(record.childRecords[i]);
                    }
                }
            }
            if (record.parentItem) {
                var currentParent = record.parentItem;
                while (currentParent) {
                    var parentItem = this.parent.getRecordByID(currentParent.taskId);
                    var parentIdStr = parentItem.ganttProperties.taskId.toString();
                    if (this.validatedOffsetIds.indexOf(parentIdStr) === -1 &&
                        parentItem.ganttProperties.predecessor &&
                        parentItem.ganttProperties.predecessor.length > 0) {
                        this.calculateOffset(parentItem);
                        break;
                    }
                    currentParent = parentItem.parentItem;
                }
            }
        }
    };
    return Dependency;
}());
export { Dependency };
