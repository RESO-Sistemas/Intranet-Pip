import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { getValue, createElement, extend } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { parentsUntil, formatString, getIndex } from '../base/utils';
import { Dialog } from '@syncfusion/ej2-popups';
import { RadioButton } from '@syncfusion/ej2-buttons';
/**
 * File for handling connector line edit operation in Gantt.
 *
 */
var ConnectorLineEdit = /** @class */ (function () {
    function ConnectorLineEdit(ganttObj) {
        /**
         * @private
         */
        this.validationPredecessor = null;
        /** @private */
        this.confirmPredecessorDialog = null;
        /** @private */
        this.predecessorIndex = null;
        /** @private */
        this.childRecord = null;
        this.validatedId = [];
        this.isPublicDependencyDelete = false;
        this.parent = ganttObj;
        this.dateValidateModule = this.parent.dateValidationModule;
        this.parent.on('initPredessorDialog', this.initPredecessorValidationDialog, this);
    }
    /**
     * To update connector line edit element.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.updateConnectorLineEditElement = function (e) {
        var element = this.getConnectorLineHoverElement(e.target);
        if (!getValue('editModule.taskbarEditModule.taskBarEditAction', this.parent)) {
            this.highlightConnectorLineElements(element);
        }
    };
    /**
     * To get hovered connector line element.
     *
     * @param {EventTarget} target .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.getConnectorLineHoverElement = function (target) {
        var isOnLine = parentsUntil(target, cls.connectorLineSVG);
        var isArrow = parentsUntil(target, cls.connectorLineArrow);
        var isCriticalLine = parentsUntil(target, cls.criticalConnectorLineSVG);
        var isCriticalArrow = parentsUntil(target, cls.criticalConnectorArrowSVG);
        if (isOnLine || isArrow || isCriticalLine || isCriticalArrow) {
            return parentsUntil(target, cls.connectorLineContainer);
        }
        else {
            return null;
        }
    };
    /**
     * To highlight connector line while hover.
     *
     * @param {Element} element .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.highlightConnectorLineElements = function (element) {
        if (element) {
            if (element !== this.connectorLineElement) {
                this.removeHighlight();
                this.addHighlight(element);
            }
        }
        else {
            this.removeHighlight();
        }
    };
    /**
     * To add connector line highlight class.
     *
     * @param {Element} element .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.addHighlight = function (element) {
        this.connectorLineElement = element;
        var pathElement = element.querySelector('.' + cls.connectorLineSVG);
        if (pathElement) {
            pathElement.setAttribute('stroke-width', (this.parent.connectorLineModule['lineStroke'] + 1).toString());
        }
    };
    /**
     * To remove connector line highlight class.
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.removeHighlight = function () {
        if (this.connectorLineElement) {
            var pathElement = this.connectorLineElement.querySelector('.' + cls.connectorLineSVG);
            if (pathElement) {
                pathElement.setAttribute('stroke-width', (this.parent.connectorLineModule['lineStroke']).toString());
            }
            this.connectorLineElement = null;
        }
    };
    /**
     * To remove connector line highlight class.
     *
     * @param {IGanttData[]} records .
     * @returns {DocumentFragment} .
     * @private
     */
    ConnectorLineEdit.prototype.getEditedConnectorLineString = function (records) {
        var ganttRecord;
        var predecessorsCollection;
        var parentGanttRecord;
        var childGanttRecord;
        var connectorObj;
        var idSet = new Set();
        var lineFragment = document.createDocumentFragment();
        for (var count = 0; count < records.length; count++) {
            ganttRecord = records[count];
            predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            if (!predecessorsCollection) {
                continue;
            }
            for (var predecessorCount = 0; predecessorCount < predecessorsCollection.length; predecessorCount++) {
                var predecessor = predecessorsCollection[predecessorCount];
                var from = 'from';
                var to = 'to';
                var connectorLineId = 'parent' + predecessor[from] + 'child' + predecessor[to];
                this.parent.connectorLineModule.removeConnectorLineById(connectorLineId);
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[from]);
                childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[to]);
                if ((!this.parent.allowParentDependency && ((parentGanttRecord && parentGanttRecord.expanded) ||
                    (childGanttRecord && childGanttRecord.expanded))) ||
                    (this.parent.allowParentDependency && (parentGanttRecord || childGanttRecord))) {
                    connectorObj = this.parent.predecessorModule.updateConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor);
                    if (!isNullOrUndefined(connectorObj) && !idSet.has(connectorObj.connectorLineId)) {
                        var lineElement = this.parent.connectorLineModule.getConnectorLineTemplate(connectorObj);
                        idSet.add(connectorObj.connectorLineId);
                        lineFragment.appendChild(lineElement);
                    }
                }
            }
        }
        return lineFragment;
    };
    /**
     * Tp refresh connector lines of edited records
     *
     * @param {IGanttData[]} editedRecord .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.refreshEditedRecordConnectorLine = function (editedRecord) {
        this.parent.connectorLineModule.removePreviousConnectorLines(this.parent.previousRecords);
        this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
            this.parent.updatedRecords : this.parent.expandedRecords;
        var editedConnectorElement = this.getEditedConnectorLineString(editedRecord);
        if (editedConnectorElement) {
            this.parent.connectorLineModule.svgObject.appendChild(editedConnectorElement);
        }
    };
    ConnectorLineEdit.prototype.idFromPredecessor = function (pre) {
        var preArray = pre.split(',');
        var preIdArray = [];
        var guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        /* eslint-disable */
        var suffixRegex = /\s*([A-Z]{1,2})([+-]\d*\.?\d+\s*(?:days|day|hours|hour|minutes|minute|[DHM])?)?$/i;
        var lagRegex = /([+-]\d*\.?\d+\s*(?:days|day|hours|hour|minutes|minute|[DHM])?)$/i;
        var ids = this.parent.ids;
        for (var j = 0; j < preArray.length; j++) {
            var predecessor = preArray[j].trim();
            var id = predecessor;
            if (guidRegex.test(predecessor.substring(0, 36))) {
                id = predecessor.substring(0, 36);
            }
            else {
                if (ids.indexOf(predecessor) !== -1) {
                    id = predecessor;
                }
                else {
                    var match = predecessor.match(suffixRegex);
                    if (match) {
                        var prefix = predecessor.substring(0, predecessor.length - match[0].length);
                        if (ids.indexOf(prefix) !== -1) {
                            id = prefix;
                        }
                    }
                    if (id === predecessor) {
                        var lagMatch = predecessor.match(lagRegex);
                        if (lagMatch) {
                            var prefix = predecessor.substring(0, predecessor.length - lagMatch[0].length);
                            if (ids.indexOf(prefix) !== -1) {
                                id = prefix;
                            }
                        }
                    }
                    if (id === predecessor) {
                        var splitChar = predecessor.includes('+') ? '+' : '-';
                        var parts = predecessor.split(splitChar);
                        if (parts[0] && ids.indexOf(parts[0]) !== -1) {
                            id = parts[0];
                        }
                    }
                }
            }
            preIdArray.push(id);
        }
        return preIdArray;
    };
    ConnectorLineEdit.prototype.predecessorValidation = function (predecessor, record) {
        var recordId = record.rowUniqueID;
        var currentId;
        var currentRecord;
        for (var count = 0; count < predecessor.length; count++) {
            currentId = predecessor[count];
            var visitedIdArray = [];
            var predecessorCollection = predecessor.slice(0);
            predecessorCollection.splice(count, 1);
            var _loop_1 = function () {
                var currentIdArray = [];
                if (visitedIdArray.indexOf(currentId) === -1) {
                    //Predecessor id not in records collection
                    if (isNullOrUndefined(this_1.parent.connectorLineModule.getRecordByID(currentId))) {
                        return { value: false };
                    }
                    currentRecord = this_1.parent.connectorLineModule.getRecordByID(currentId).ganttProperties;
                    if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                        currentRecord.predecessor.forEach(function (value) {
                            if (currentRecord.rowUniqueID.toString() !== value.from) {
                                currentIdArray.push(value.from.toString());
                            }
                        });
                    }
                    /* eslint-disable-next-line */
                    if (recordId.toString() === currentRecord.rowUniqueID.toString() || currentIdArray.indexOf(recordId.toString()) !== -1) {
                        return { value: false };
                    }
                    visitedIdArray.push(currentId);
                    if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                        currentId = currentRecord.predecessor[0].from;
                    }
                    else {
                        return "break";
                    }
                }
                else {
                    return "break";
                }
            };
            var this_1 = this;
            while (currentId !== null) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
                if (state_1 === "break")
                    break;
            }
        }
        return true;
    };
    /**
     * To validate predecessor relations
     *
     * @param {IGanttData} ganttRecord .
     * @param {string} predecessorString .
     * @returns {boolean} .
     * @private
     */
    ConnectorLineEdit.prototype.validatePredecessorRelation = function (ganttRecord, predecessorString) {
        var flag = true;
        var recordId = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
            : ganttRecord.ganttProperties.rowUniqueID;
        var predecessorIdArray;
        var currentId;
        if (!isNullOrUndefined(predecessorString) && predecessorString.length > 0) {
            predecessorIdArray = this.idFromPredecessor(predecessorString);
            var _loop_2 = function (count) {
                //Check edited item has parent item in predecessor collection
                if (!this_2.parent.allowParentDependency) {
                    var checkParent = this_2.checkParentRelation(ganttRecord, predecessorIdArray);
                    if (!checkParent) {
                        return { value: false };
                    }
                }
                else {
                    if (parseInt(predecessorIdArray[predecessorIdArray.length - 1], 10) !== ganttRecord[this_2.parent.taskFields.id]) {
                        var num = this_2.parent.ids.indexOf(predecessorIdArray[predecessorIdArray.length - 1]);
                        var fromRecord = this_2.parent.currentViewData[num];
                        if (fromRecord && ganttRecord) {
                            flag = this_2.parent.predecessorModule.validateParentPredecessor(fromRecord, ganttRecord);
                        }
                    }
                }
                // Check if predecessor exist more then one
                var tempIdArray = predecessorIdArray.slice(0);
                var checkArray = [];
                var countFlag = true;
                tempIdArray.forEach(function (value) {
                    if (checkArray.indexOf(value) === -1) {
                        checkArray.push(value);
                    }
                    else {
                        countFlag = false;
                    }
                });
                if (!countFlag) {
                    return { value: false };
                }
                //Cyclick check
                currentId = predecessorIdArray[count];
                var visitedIdArray = [];
                var predecessorCollection = predecessorIdArray.slice(0);
                predecessorCollection.splice(count, 1);
                var _loop_3 = function () {
                    var currentIdArray = [];
                    var currentIdIndex;
                    var currentRecord;
                    if (visitedIdArray.indexOf(currentId) === -1) {
                        //Predecessor id not in records collection
                        if (isNullOrUndefined(this_2.parent.connectorLineModule.getRecordByID(currentId.toString()))) {
                            return { value: false };
                        }
                        currentRecord = this_2.parent.connectorLineModule.getRecordByID(currentId.toString()).ganttProperties;
                        //  let currentPredecessor='';
                        if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                            currentRecord.predecessor.forEach(function (value, index) {
                                if (currentRecord.rowUniqueID.toString() !== value.from) {
                                    currentIdArray.push(value.from.toString());
                                    currentIdIndex = index;
                                }
                            });
                            //    currentPredecessor=currentRecord.predecessor[0].from
                        }
                        if (recordId.toString() === currentRecord.rowUniqueID.toString() ||
                            currentIdArray.indexOf(recordId.toString()) !== -1) {
                            return { value: false };
                        }
                        visitedIdArray.push(currentId);
                        if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                            var result = void 0;
                            if (currentIdArray.length > 1) {
                                result = this_2.predecessorValidation(currentIdArray, ganttRecord.ganttProperties);
                            }
                            else if (currentIdArray.length === 1) {
                                currentId = currentRecord.predecessor[currentIdIndex].from;
                            }
                            if (result === false) {
                                return { value: false };
                            }
                        }
                        else {
                            return "break";
                        }
                    }
                    else {
                        return "break";
                    }
                };
                while (currentId !== null) {
                    var state_3 = _loop_3();
                    if (typeof state_3 === "object")
                        return state_3;
                    if (state_3 === "break")
                        break;
                }
            };
            var this_2 = this;
            for (var count = 0; count < predecessorIdArray.length; count++) {
                var state_2 = _loop_2(count);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        }
        return flag;
    };
    /**
     * To add dependency for Task
     *
     * @param {IGanttData} ganttRecord .
     * @param {string} predecessorString .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.addPredecessor = function (ganttRecord, predecessorString) {
        var tempPredecessorString = isNullOrUndefined(ganttRecord.ganttProperties.predecessorsName) ||
            ganttRecord.ganttProperties.predecessorsName === '' ?
            predecessorString : (ganttRecord.ganttProperties.predecessorsName + ',' + predecessorString);
        this.updatePredecessorHelper(ganttRecord, tempPredecessorString);
    };
    /**
     * To remove dependency from task
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.removePredecessor = function (ganttRecord) {
        this.isPublicDependencyDelete = true;
        this.updatePredecessorHelper(ganttRecord, null);
    };
    /**
     * To modify current dependency values of Task
     *
     * @param {IGanttData} ganttRecord .
     * @param {string} predecessorString .
     * @param {ITaskbarEditedEventArgs} editedArgs .
     * @returns {boolean} .
     * @private
     */
    ConnectorLineEdit.prototype.updatePredecessor = function (ganttRecord, predecessorString, editedArgs) {
        return this.updatePredecessorHelper(ganttRecord, predecessorString, editedArgs);
    };
    ConnectorLineEdit.prototype.updatePredecessorHelper = function (ganttRecord, predecessorString, editedArgs) {
        if (isUndefined(predecessorString) || this.validatePredecessorRelation(ganttRecord, predecessorString)) {
            this.parent.isOnEdit = true;
            var predecessorCollection = [];
            if (!isNullOrUndefined(predecessorString) && predecessorString !== '') {
                predecessorCollection = this.parent.predecessorModule.calculatePredecessor(predecessorString, ganttRecord);
            }
            this.parent.setRecordValue('predecessor', predecessorCollection, ganttRecord.ganttProperties, true);
            var stringValue = this.parent.predecessorModule.getPredecessorStringValue(ganttRecord);
            this.parent.setRecordValue('predecessorsName', stringValue, ganttRecord.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, stringValue, ganttRecord);
            this.parent.setRecordValue(this.parent.taskFields.dependency, stringValue, ganttRecord);
            var args = {};
            args.action = editedArgs && editedArgs.action && editedArgs.action === 'CellEditing' ? editedArgs.action : ((this.parent.contextMenuModule && this.parent.contextMenuModule['isContextMenuDependencyDelete']) ||
                this.isPublicDependencyDelete) ? 'DeleteConnectorLine' : 'DrawConnectorLine';
            args.data = ganttRecord;
            this.parent.editModule.initiateUpdateAction(args);
            return true;
        }
        else {
            if (ganttRecord.taskData[this.parent.taskFields.dependency]) {
                ganttRecord.taskData[this.parent.taskFields.dependency] = null;
            }
            var err = predecessorString + " is an invalid relation for task " + this.parent.taskFields.id + ". Kindly ensure the " + this.parent.taskFields.dependency + " field contains only valid predecessor relations.";
            this.parent.trigger('actionFailure', { error: err });
            return false;
        }
    };
    ConnectorLineEdit.prototype.checkParentRelation = function (ganttRecord, predecessorIdArray) {
        var editingData = ganttRecord;
        var checkParent = true;
        if (editingData && editingData.parentItem) {
            if (predecessorIdArray.indexOf(editingData.parentItem.taskId.toString()) !== -1) {
                return false;
            }
        }
        var _loop_4 = function (p) {
            var record = this_3.parent.currentViewData.filter(function (item) {
                return item && item.ganttProperties.rowUniqueID.toString() === predecessorIdArray[p].toString();
            });
            if (record[0] && record[0].hasChildRecords) {
                return { value: false };
            }
        };
        var this_3 = this;
        for (var p = 0; p < predecessorIdArray.length; p++) {
            var state_4 = _loop_4(p);
            if (typeof state_4 === "object")
                return state_4.value;
        }
        return checkParent;
    };
    ConnectorLineEdit.prototype.initPredecessorValidationDialog = function () {
        if (this.parent.taskFields.dependency && this.parent.isInPredecessorValidation) {
            var dialogElement = createElement('div', {
                id: this.parent.element.id + '_dialogValidationRule'
            });
            this.parent.element.appendChild(dialogElement);
            this.renderValidationDialog();
        }
    };
    /**
     * To render validation dialog
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.renderValidationDialog = function () {
        var taskFields = this.parent.taskFields;
        var validationHeader = (taskFields.constraintType && taskFields.constraintDate)
            ? this.parent.localeObj.getConstant('schedulingConflicts')
            : this.parent.localeObj.getConstant('validateEditing');
        var containerId = this.parent.element.id + '_dialogValidationRule';
        var container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            container.style.zIndex = '2000';
        }
        else {
            container = document.createElement('div');
            container.id = containerId;
            container.style.zIndex = '2000'; // Set z-index here
            document.body.appendChild(container);
        }
        var validationDialog = new Dialog({
            header: validationHeader,
            isModal: true,
            enableRtl: this.parent.enableRtl,
            visible: false,
            width: '50%',
            showCloseIcon: true,
            zIndex: 2000,
            close: this.validationDialogClose.bind(this),
            content: '',
            buttons: [
                {
                    click: this.validationDialogOkButton.bind(this),
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('okText'),
                        isPrimary: true
                    }
                },
                {
                    click: this.validationDialogCancelButton.bind(this),
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('cancel')
                    }
                }
            ],
            target: document.body,
            animationSettings: { effect: 'None' }
        });
        validationDialog.isStringTemplate = true;
        validationDialog.appendTo('#' + containerId);
        this.parent.validationDialogElement = validationDialog;
    };
    ConnectorLineEdit.prototype.validationDialogOkButton = function () {
        var currentArgs = this.parent.currentEditedArgs;
        var addOffsetCheckbox = document.getElementById(this.parent.element.id + '_ValidationAddlineOffset');
        var removeLineCheckbox = document.getElementById(this.parent.element.id + '_ValidationRemoveline');
        var cancelCheckbox = document.getElementById(this.parent.element.id + '_ValidationCancel');
        var removeConstraintCheckbox = document.getElementById(this.parent.element.id + '_RemoveConstraint');
        var removeDependencyCheckbox = document.getElementById(this.parent.element.id + '_RemoveDependency');
        var cancelChangeCheckbox = document.getElementById(this.parent.element.id + '_CancelChange');
        var violationArgs = this.parent.editModule['violationArgs'];
        var modifiedTask = violationArgs['matchedModifiedTask'];
        var validationArgs = violationArgs['args'];
        var pairedTask = violationArgs['matchedParedRecord'] || null;
        if (removeConstraintCheckbox !== null && removeConstraintCheckbox.checked) {
            modifiedTask.ganttProperties.constraintType = 4;
            this.parent.constraintViolationType = '';
            this.parent.editModule.initiateSaveAction(validationArgs);
        }
        else if (removeDependencyCheckbox !== null && removeDependencyCheckbox.checked) {
            var matchedPredecessors = [];
            var currentTaskId = pairedTask
                ? pairedTask.ganttProperties.taskId
                : validationArgs.data.ganttProperties.taskId;
            if (modifiedTask && Array.isArray(modifiedTask.ganttProperties.predecessor)) {
                for (var _i = 0, _a = modifiedTask.ganttProperties.predecessor; _i < _a.length; _i++) {
                    var predecessor = _a[_i];
                    if (predecessor.from.toString() === currentTaskId.toString()) {
                        matchedPredecessors = [predecessor];
                        break;
                    }
                }
            }
            this.parent.editModule.reUpdatePreviousRecords(undefined, undefined, modifiedTask.uniqueID);
            if (modifiedTask.parentItem && modifiedTask.parentItem.taskId) {
                var parentItem = this.parent.getRecordByID(modifiedTask.parentItem.taskId);
                this.parent.dataOperation.updateParentItems(parentItem, true);
            }
            this.removePredecessors(modifiedTask, matchedPredecessors);
            this.parent.editModule.initiateSaveAction(validationArgs);
        }
        else if (cancelChangeCheckbox !== null && cancelChangeCheckbox.checked) {
            currentArgs.validateMode.respectLink = true;
            this.applyPredecessorOption();
        }
        var noPrimaryActionTaken = !(removeConstraintCheckbox !== null && removeConstraintCheckbox.checked) &&
            !(removeDependencyCheckbox !== null && removeDependencyCheckbox.checked) &&
            !(cancelChangeCheckbox !== null && cancelChangeCheckbox.checked);
        if (noPrimaryActionTaken) {
            currentArgs.validateMode.preserveLinkWithEditing =
                addOffsetCheckbox !== null && addOffsetCheckbox.checked;
            currentArgs.validateMode.removeLink =
                removeLineCheckbox !== null && removeLineCheckbox.checked;
            currentArgs.validateMode.respectLink =
                cancelCheckbox !== null && cancelCheckbox.checked;
            this.applyPredecessorOption();
        }
        this.parent.hideSpinner();
        this.parent.validationDialogElement.hide();
    };
    ConnectorLineEdit.prototype.validationDialogCancelButton = function () {
        this.parent.constraintViolationType = '';
        this.parent.currentEditedArgs.validateMode.respectLink = true;
        this.applyPredecessorOption();
        this.parent.hideSpinner();
        this.parent.validationDialogElement.hide();
    };
    ConnectorLineEdit.prototype.validationDialogClose = function (e) {
        this.parent.constraintViolationType = '';
        if (getValue('isInteracted', e)) {
            this.parent.currentEditedArgs.validateMode.respectLink = true;
            this.applyPredecessorOption();
            this.parent.hideSpinner();
        }
    };
    /**
     * Validate and apply the predecessor option from validation dialog
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.applyPredecessorOption = function () {
        var args = this.parent.currentEditedArgs;
        var ganttRecord = args.data;
        if (args.validateMode.respectLink) {
            this.parent.editModule.reUpdatePreviousRecords();
            this.parent.chartRowsModule.refreshRecords([args.data]);
        }
        else if (args.validateMode.removeLink) {
            this.checkChildRecords(ganttRecord);
            this.parent.editModule.updateEditedTask(args.editEventArgs);
        }
        else if (args.validateMode.preserveLinkWithEditing) {
            var connectedTaskId_1;
            if (this.parent.updateOffsetOnTaskbarEdit) {
                var taskId_1 = ganttRecord.ganttProperties.taskId.toString();
                if (ganttRecord.ganttProperties.predecessor) {
                    ganttRecord.ganttProperties.predecessor.forEach(function (predecessor) {
                        if (taskId_1 === predecessor.from) {
                            connectedTaskId_1 = predecessor.to;
                            return;
                        }
                    });
                }
            }
            this.parent.editModule.updateEditedTask(args.editEventArgs);
            var processedPredecessor = [];
            this.processPredecessor(connectedTaskId_1, processedPredecessor);
            processedPredecessor = [];
        }
    };
    ConnectorLineEdit.prototype.compareArrays = function (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        var str1 = JSON.stringify(arr1);
        var str2 = JSON.stringify(arr2);
        return str1 === str2;
    };
    ConnectorLineEdit.prototype.processPredecessor = function (parentId, processedPredecessor) {
        var _this = this;
        if (parentId) {
            var record_1 = this.parent.getRecordByID(parentId);
            if (record_1 && record_1.ganttProperties && record_1.ganttProperties.predecessor) {
                this.parent.predecessorModule['validatedOffsetIds'] = [];
                this.parent.predecessorModule['calculateOffset'](record_1);
                var isIdInclude_1 = true;
                /* eslint-disable-next-line */
                var matchedObject = this.validatedId.find(function (item) {
                    return item.id === record_1.ganttProperties.taskId;
                });
                if (matchedObject) {
                    var predecessorArray = matchedObject.value;
                    var areArraysEqual = this.compareArrays(predecessorArray, record_1.ganttProperties.predecessor);
                    if (areArraysEqual) {
                        isIdInclude_1 = false;
                    }
                }
                var predecessors = record_1.ganttProperties.predecessor;
                predecessors.forEach(function (predecessor) {
                    if (record_1.ganttProperties.taskId === predecessor.from && isIdInclude_1) {
                        if (processedPredecessor && processedPredecessor.indexOf(predecessor.to) === -1) {
                            _this.processPredecessor(predecessor.to, processedPredecessor);
                            processedPredecessor.push(predecessor.to);
                        }
                    }
                });
            }
        }
    };
    ConnectorLineEdit.prototype.checkChildRecords = function (ganttRecord) {
        var matchingPredecessors = [];
        var currentTaskId = ganttRecord.ganttProperties.taskId;
        var allPredecessors = ganttRecord.ganttProperties.predecessor;
        if (isNullOrUndefined(allPredecessors)) {
            this.validationPredecessor = allPredecessors;
        }
        else {
            for (var i = 0; i < allPredecessors.length; i++) {
                var predecessorLink = allPredecessors[i];
                if (predecessorLink.to.toString() === currentTaskId.toString()) {
                    matchingPredecessors.push(predecessorLink);
                }
            }
            this.validationPredecessor = matchingPredecessors;
        }
        if (!isNullOrUndefined(this.validationPredecessor)) {
            this.removePredecessors(ganttRecord, this.validationPredecessor);
        }
        if (ganttRecord.childRecords.length > 0) {
            for (var i = 0; i < ganttRecord.childRecords.length; i++) {
                var childRecord = ganttRecord.childRecords[i];
                this.validationPredecessor = childRecord.ganttProperties.predecessor;
                if (!isNullOrUndefined(this.validationPredecessor)) {
                    this.removePredecessors(childRecord, this.validationPredecessor);
                }
                if (childRecord.childRecords.length > 0) {
                    this.checkChildRecords(childRecord);
                }
            }
        }
        else if (!isNullOrUndefined(ganttRecord.parentItem)) {
            var parentRecord = this.parent.getRecordByID(ganttRecord.parentItem.taskId);
            this.validationPredecessor = parentRecord.ganttProperties.predecessor;
            this.removePredecessors(parentRecord, this.validationPredecessor);
        }
    };
    /**
     * Update predecessor value with user selection option in predecessor validation dialog
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessor .
     * @returns {void} .
     */
    ConnectorLineEdit.prototype.removePredecessors = function (ganttRecord, predecessor) {
        var prevPredecessor = extend([], [], ganttRecord.ganttProperties.predecessor, true);
        if (isNullOrUndefined(predecessor)) {
            return;
        }
        var preLength = predecessor.length;
        for (var i = 0; i < preLength; i++) {
            var parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[i].from);
            var parentPredecessor = extend([], [], parentGanttRecord.ganttProperties.predecessor, true);
            var index = getIndex(predecessor[i], 'from', prevPredecessor, 'to');
            prevPredecessor.splice(index, 1);
            var parentIndex = getIndex(predecessor[parseInt(i.toString(), 10)], 'from', parentPredecessor, 'to');
            parentPredecessor.splice(parentIndex, 1);
            this.parent.setRecordValue('predecessor', parentPredecessor, parentGanttRecord.ganttProperties, true);
        }
        if (prevPredecessor.length !== ganttRecord.ganttProperties.predecessor.length) {
            this.parent.setRecordValue('predecessor', prevPredecessor, ganttRecord.ganttProperties, true);
            var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(ganttRecord);
            this.parent.setRecordValue('predecessorsName', predecessorString, ganttRecord.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, ganttRecord);
            this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, ganttRecord);
        }
    };
    ConnectorLineEdit.prototype.formatViolationType = function (violationType) {
        return violationType.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
    ConnectorLineEdit.prototype.updateZIndex = function (ganttObj) {
        if (ganttObj &&
            ganttObj.editModule &&
            ganttObj.editModule.dialogModule &&
            ganttObj.editModule.dialogModule.dialog &&
            ganttObj.editModule.dialogModule.dialog.style &&
            ganttObj.editModule.dialogModule.dialog.style.zIndex !== '') {
            var zIndex = parseInt(ganttObj.editModule.dialogModule.dialog.style.zIndex, 10);
            var validationElement = ganttObj.validationDialogElement &&
                ganttObj.validationDialogElement.element;
            if (!isNaN(zIndex) && validationElement) {
                var newZIndex = (zIndex + 1).toString();
                validationElement.style.zIndex = newZIndex;
                if (validationElement.parentElement) {
                    validationElement.parentElement.style.zIndex = newZIndex;
                }
            }
        }
    };
    /**
     * To open predecessor validation dialog
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.openValidationDialog = function (args) {
        var ganttObj = this.parent;
        var contentTemplate = this.validationDialogTemplate(args);
        ganttObj.validationDialogElement.setProperties({ content: contentTemplate });
        var contentId = ganttObj.element.id + '_dialogValidationRule_dialog-content';
        var contentElement = ganttObj.validationDialogElement.element.querySelector('#' + contentId);
        contentElement.style.paddingTop = '10px';
        var headerId = ganttObj.element.id + '_dialogValidationRule_dialog-header';
        var headerElement = ganttObj.validationDialogElement.element.querySelector('#' + headerId);
        headerElement.style.padding = '8px 16px';
        this.updateZIndex(ganttObj);
        ganttObj.validationDialogElement.show();
    };
    /**
     * Predecessor link validation dialog template
     *
     * @param {object} args .
     * @returns {HTMLElement} .
     * @private
     */
    ConnectorLineEdit.prototype.validationDialogTemplate = function (args) {
        var ganttId = this.parent.element.id;
        var contentdiv = createElement('div', {
            className: 'e-ValidationContent'
        });
        var taskData = getValue('task', args);
        var parenttaskData = getValue('parentTask', args);
        var violationType = getValue('violationType', args);
        var recordName = taskData.ganttProperties.taskName;
        var dateFormat = !isNullOrUndefined(this.parent.dateFormat) ? this.parent.dateFormat : 'M/d/yyyy h:mm a';
        var recordNewStartDate = this.parent.getFormatedDate(taskData.ganttProperties.startDate, dateFormat);
        var parentName = parenttaskData.ganttProperties.taskName;
        var recordArgs = [recordName, parentName];
        var topContentText = '';
        if (violationType !== 'MustStartOn' &&
            violationType !== 'MustFinishOn' &&
            violationType !== 'StartNoLaterThan' &&
            violationType !== 'FinishNoLaterThan') {
            if (violationType === 'taskBeforePredecessor_FS') {
                topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_FS');
            }
            else if (violationType === 'taskAfterPredecessor_FS') {
                topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_FS');
            }
            else if (violationType === 'taskBeforePredecessor_SS') {
                topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_SS');
            }
            else if (violationType === 'taskAfterPredecessor_SS') {
                topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_SS');
            }
            else if (violationType === 'taskBeforePredecessor_FF') {
                topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_FF');
            }
            else if (violationType === 'taskAfterPredecessor_FF') {
                topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_FF');
            }
            else if (violationType === 'taskBeforePredecessor_SF') {
                topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_SF');
            }
            else if (violationType === 'taskAfterPredecessor_SF') {
                topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_SF');
            }
            topContentText = formatString(topContentText, recordArgs);
        }
        var topContent = '<div id="' + ganttId + '_ValidationText">' + topContentText + '</div>';
        var cancelText = this.parent.localeObj.getConstant('cancelLink');
        var removeLinkTextTemplate = this.parent.localeObj.getConstant('removeLink');
        var removeLinkText = formatString(removeLinkTextTemplate, [recordName, recordNewStartDate]);
        var removeConstraintTextTemplate = this.parent.localeObj.getConstant('removeConstraint');
        violationType = this.formatViolationType(violationType);
        var removeConstraintText = formatString(removeConstraintTextTemplate, [violationType, recordName]);
        var preserveLinkTextTemplate = this.parent.localeObj.getConstant('preserveLink');
        var preserveLinkText = formatString(preserveLinkTextTemplate, [recordName, recordNewStartDate]);
        var innerTable = "\n        <table>\n            <tr><td><input type=\"radio\" id=\"" + ganttId + "_ValidationCancel\" name=\"ValidationRule\" checked/></td></tr>\n            <tr><td><input type=\"radio\" id=\"" + ganttId + "_ValidationRemoveline\" name=\"ValidationRule\"/></td></tr>\n            <tr><td><input type=\"radio\" id=\"" + ganttId + "_RemoveConstraint\" name=\"ValidationRule\"/></td></tr>\n            <tr><td><input type=\"radio\" id=\"" + ganttId + "_ValidationAddlineOffset\" name=\"ValidationRule\"/></td></tr>\n        </table>";
        contentdiv.innerHTML = topContent + innerTable;
        var cancelInput = contentdiv.querySelector("#" + ganttId + "_ValidationCancel");
        var removeLinkInput = contentdiv.querySelector("#" + ganttId + "_ValidationRemoveline");
        var removeConstraintInput = contentdiv.querySelector("#" + ganttId + "_RemoveConstraint");
        var preserveLinkInput = contentdiv.querySelector("#" + ganttId + "_ValidationAddlineOffset");
        if (cancelInput) {
            new RadioButton({
                label: cancelText,
                name: 'ValidationRule',
                value: 'cancel',
                checked: true,
                cssClass: cls.constraintLabel
            }).appendTo(cancelInput);
        }
        if (removeLinkInput) {
            new RadioButton({
                label: removeLinkText,
                name: 'ValidationRule',
                value: 'removeLink',
                cssClass: cls.constraintLabel
            }).appendTo(removeLinkInput);
        }
        if (removeConstraintInput) {
            new RadioButton({
                label: removeConstraintText,
                name: 'ValidationRule',
                value: 'removeConstraint',
                cssClass: cls.constraintLabel
            }).appendTo(removeConstraintInput);
        }
        if (preserveLinkInput) {
            new RadioButton({
                label: preserveLinkText,
                name: 'ValidationRule',
                value: 'preserveLink',
                cssClass: cls.constraintLabel
            }).appendTo(preserveLinkInput);
        }
        var radioWrapper = contentdiv.querySelectorAll('.e-radio-wrapper');
        radioWrapper.forEach(function (wrapperElement) {
            wrapperElement.style.padding = '6px';
            wrapperElement.querySelector('span').style.fontWeight = 'normal';
        });
        return contentdiv;
    };
    /**
     * To open constraint validation dialog
     *
     * @param {object} args - { violationType: string, parentRecord: IGanttData, record: IGanttData }
     * @returns {void}
     * @private
     */
    ConnectorLineEdit.prototype.openConstraintValidationDialog = function (args) {
        var ganttObj = this.parent;
        var contentTemplate = this.constraintValidationDialogTemplate(args);
        var constraintConflictHeader = ganttObj.localeObj.getConstant('schedulingConflicts');
        ganttObj.validationDialogElement.setProperties({
            content: contentTemplate,
            header: constraintConflictHeader
        });
        var contentId = ganttObj.element.id + '_dialogValidationRule_dialog-content';
        var contentElement = ganttObj.validationDialogElement.element.querySelector('#' + contentId);
        contentElement.style.paddingTop = '10px';
        var headerId = ganttObj.element.id + '_dialogValidationRule_dialog-header';
        var headerElement = ganttObj.validationDialogElement.element.querySelector('#' + headerId);
        headerElement.style.padding = '8px 16px';
        this.updateZIndex(ganttObj);
        ganttObj.validationDialogElement.show();
    };
    /**
     * Constraint validation dialog template
     *
     * @param {object} args - { violationType: string, parentRecord: IGanttData, record: IGanttData }
     * @returns {HTMLElement} The HTML element representing the constraint validation dialog
     * @private
     */
    ConnectorLineEdit.prototype.constraintValidationDialogTemplate = function (args) {
        var ganttId = this.parent.element.id;
        var parentRecord = args.parentRecord, record = args.record, predecessorLink = args.predecessorLink;
        var violationType = args.violationType;
        var contentDiv = createElement('div', { className: 'e-ValidationContent' });
        var recordName = record.ganttProperties.taskName;
        var parentName = '';
        if (parentRecord && parentRecord.ganttProperties && parentRecord.ganttProperties.taskName) {
            parentName = parentRecord.ganttProperties.taskName;
        }
        var removeConstraintTemplate = this.parent.localeObj.getConstant('removeConstraint');
        var removeDependencyTemplate = this.parent.localeObj.getConstant('removeDependency');
        var cancelChangeText = this.parent.localeObj.getConstant('cancelChange');
        violationType = this.formatViolationType(violationType);
        var removeConstraintText = formatString(removeConstraintTemplate, [violationType, recordName]);
        var removeDependencyText = formatString(removeDependencyTemplate, [parentName, recordName]);
        var innerHtml = '<table>';
        innerHtml += "\n        <tr>\n            <td>\n                <input type=\"radio\" id=\"" + ganttId + "_RemoveConstraint\" name=\"ValidationRule\" />\n            </td>\n        </tr>";
        if (predecessorLink !== undefined) {
            innerHtml += "\n        <tr>\n            <td>\n                <input type=\"radio\" id=\"" + ganttId + "_RemoveDependency\" name=\"ValidationRule\"/>\n            </td>\n        </tr>";
        }
        innerHtml += "\n        <tr>\n            <td>\n                <input type=\"radio\" id=\"" + ganttId + "_CancelChange\" name=\"ValidationRule\"/>\n            </td>\n        </tr>";
        innerHtml += '</table>';
        contentDiv.innerHTML = innerHtml;
        var removeConstraintElem = contentDiv.querySelector("#" + ganttId + "_RemoveConstraint");
        if (removeConstraintElem) {
            new RadioButton({
                label: removeConstraintText,
                name: 'ValidationRule',
                value: 'removeConstraint',
                checked: true,
                cssClass: cls.constraintLabel
            }).appendTo(removeConstraintElem);
        }
        if (predecessorLink !== undefined) {
            var removeDependencyElem = contentDiv.querySelector("#" + ganttId + "_RemoveDependency");
            if (removeDependencyElem) {
                new RadioButton({
                    label: removeDependencyText,
                    name: 'ValidationRule',
                    value: 'removeDependency',
                    cssClass: cls.constraintLabel
                }).appendTo(removeDependencyElem);
            }
        }
        var cancelChangeElem = contentDiv.querySelector("#" + ganttId + "_CancelChange");
        if (cancelChangeElem) {
            new RadioButton({
                label: cancelChangeText,
                name: 'ValidationRule',
                value: 'cancelChange',
                cssClass: cls.constraintLabel
            }).appendTo(cancelChangeElem);
        }
        var radioWrapper = contentDiv.querySelectorAll('.e-radio-wrapper');
        radioWrapper.forEach(function (wrapperElement) {
            wrapperElement.style.padding = '6px';
            wrapperElement.querySelector('span').style.fontWeight = 'normal';
        });
        return contentDiv;
    };
    /**
     * To validate the types while editing the taskbar
     *
     * @param {IGanttData} ganttRecord .
     * @param {any} data .
     * @returns {boolean} .
     * @private
     */
    ConnectorLineEdit.prototype.validateTypes = function (ganttRecord, data) {
        var predecessor = this.parent.predecessorModule.getValidPredecessor(ganttRecord);
        var parentGanttRecord;
        this.validationPredecessor = [];
        var violatedParent;
        var ganttTaskData;
        var violateType;
        var calendarContext = ganttRecord && ganttRecord.ganttProperties && ganttRecord.ganttProperties.calendarContext
            ? ganttRecord.ganttProperties.calendarContext
            : this.parent.defaultCalendarContext;
        var startDate = this.parent.predecessorModule.getPredecessorDate(ganttRecord, predecessor, null);
        if (data) {
            ganttTaskData = data.ganttProperties;
        }
        else {
            ganttTaskData = ganttRecord.ganttProperties;
        }
        var endDate = this.parent.allowUnscheduledTasks && isNullOrUndefined(startDate) ?
            ganttTaskData.endDate :
            this.dateValidateModule.getEndDate(startDate, ganttTaskData.duration, ganttTaskData.durationUnit, ganttTaskData, false);
        for (var i = 0; i < predecessor.length; i++) {
            parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[i].from);
            var violationType = null;
            if (predecessor[i].type === 'FS') {
                var duration = this.parent.dateValidationModule.getDuration(startDate, ganttTaskData.startDate, this.parent.durationUnit, ganttTaskData.isAutoSchedule, ganttTaskData.isMilestone, true, calendarContext);
                if (duration !== 0 || (duration === 0 && this.parent.updateOffsetOnTaskbarEdit === false)) {
                    if (ganttTaskData.startDate < startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskBeforePredecessor_FS';
                    }
                    else if (ganttTaskData.startDate > startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskAfterPredecessor_FS';
                    }
                }
            }
            else if (predecessor[i].type === 'SS') {
                var endDateOlny = new Date(ganttTaskData.endDate);
                var startDateOlny = new Date(startDate);
                if (ganttTaskData.startDate < startDate) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskBeforePredecessor_SS';
                }
                else if (ganttTaskData.startDate > startDate) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskAfterPredecessor_SS';
                }
                else if (this.parent.allowUnscheduledTasks &&
                    isNullOrUndefined(ganttTaskData.startDate) &&
                    isNullOrUndefined(ganttTaskData.duration) &&
                    endDateOlny.setHours(0, 0, 0, 0) < startDateOlny.setHours(0, 0, 0, 0)) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskBeforePredecessor_SS';
                }
                else if (this.parent.allowUnscheduledTasks &&
                    isNullOrUndefined(ganttTaskData.startDate) &&
                    isNullOrUndefined(ganttTaskData.duration) &&
                    endDateOlny.setHours(0, 0, 0, 0) > startDateOlny.setHours(0, 0, 0, 0)) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskAfterPredecessor_SS';
                }
            }
            else if (predecessor[i].type === 'FF') {
                var duration = this.parent.dateValidationModule.getDuration(startDate, parentGanttRecord.ganttProperties.endDate, this.parent.durationUnit, parentGanttRecord.ganttProperties.isAutoSchedule, parentGanttRecord.ganttProperties.isMilestone, true, calendarContext);
                if (duration !== 0 || (duration === 0 && this.parent.updateOffsetOnTaskbarEdit === false)) {
                    if (endDate <= parentGanttRecord.ganttProperties.endDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskBeforePredecessor_FF';
                    }
                    else if (endDate > parentGanttRecord.ganttProperties.endDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskAfterPredecessor_FF';
                    }
                }
            }
            else if (predecessor[i].type === 'SF') {
                var duration = this.parent.dateValidationModule.getDuration(parentGanttRecord.ganttProperties.startDate, endDate, this.parent.durationUnit, parentGanttRecord.ganttProperties.isAutoSchedule, parentGanttRecord.ganttProperties.isMilestone, true, calendarContext);
                if (duration !== 0 || (duration === 0 && this.parent.updateOffsetOnTaskbarEdit === false)) {
                    if (endDate < parentGanttRecord.ganttProperties.startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskBeforePredecessor_SF';
                    }
                    else if (endDate >= parentGanttRecord.ganttProperties.startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskAfterPredecessor_SF';
                    }
                }
            }
            if (!isNullOrUndefined(violationType) && isNullOrUndefined(violateType)) {
                violatedParent = parentGanttRecord;
                violateType = violationType;
            }
        }
        if (!violateType && this.parent.constraintViolationType) {
            violateType = this.parent.constraintViolationType;
            var predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            var currentTaskId_1 = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId.toString()
                : ganttRecord.ganttProperties.rowUniqueID.toString();
            var predecessors = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_1) {
                    return data;
                }
                else {
                    return null;
                }
            });
            var maxViolation = -Infinity;
            if (predecessors.length > 0) {
                for (var i = 0; i < predecessors.length; i++) {
                    var fromId = predecessors[i].from;
                    var predecessorRecord = this.parent.getRecordByID(fromId);
                    if (predecessorRecord && predecessorRecord.ganttProperties.endDate && ganttRecord.ganttProperties.startDate) {
                        var violation = predecessorRecord.ganttProperties.endDate.getTime() - ganttRecord.ganttProperties.startDate.getTime();
                        if (violation > maxViolation) {
                            maxViolation = violation;
                            violatedParent = predecessorRecord;
                        }
                    }
                }
            }
        }
        var validateArgs = {
            parentTask: violatedParent,
            task: ganttRecord,
            violationType: violateType
        };
        return validateArgs;
    };
    /**
     * Method to remove and update new predecessor collection in successor record
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.addRemovePredecessor = function (data) {
        var prevData = this.parent.previousRecords[data.uniqueID];
        var newPredecessor = !isNullOrUndefined(data.ganttProperties.predecessor) ?
            data.ganttProperties.predecessor.slice() : data.ganttProperties.predecessor;
        // eslint-disable-next-line
        if (prevData && prevData.ganttProperties && prevData.ganttProperties.hasOwnProperty('predecessor')) {
            var prevPredecessor_1 = prevData.ganttProperties.predecessor;
            if (!isNullOrUndefined(prevPredecessor_1)) {
                var _loop_5 = function (p) {
                    var parentGanttRecord = this_4.parent.connectorLineModule.getRecordByID(prevPredecessor_1[parseInt(p.toString(), 10)].from);
                    if (parentGanttRecord === data) {
                        var isValid = data.ganttProperties.predecessor.filter(function (pred) {
                            return prevPredecessor_1[p].from === pred.from && prevPredecessor_1[p].to === pred.to;
                        });
                        if (isValid.length === 0) {
                            if (data.parentItem && this_4.parent.taskFields.dependency && data.ganttProperties.predecessor &&
                                this_4.parent.allowParentDependency) {
                                if (prevPredecessor_1[p].from !== data.parentItem.taskId &&
                                    prevPredecessor_1[p].to !== data.parentItem.taskId) {
                                    data.ganttProperties.predecessor.push(prevPredecessor_1[parseInt(p.toString(), 10)]);
                                }
                            }
                            else {
                                data.ganttProperties.predecessor.push(prevPredecessor_1[parseInt(p.toString(), 10)]);
                            }
                        }
                    }
                    else {
                        var parentPredecessor = extend([], [], parentGanttRecord.ganttProperties.predecessor, true);
                        var parentIndex = getIndex(prevPredecessor_1[parseInt(p.toString(), 10)], 'from', parentPredecessor, 'to');
                        if (parentIndex !== -1) {
                            parentPredecessor.splice(parentIndex, 1);
                            this_4.parent.setRecordValue('predecessor', parentPredecessor, parentGanttRecord.ganttProperties, true);
                        }
                    }
                };
                var this_4 = this;
                for (var p = 0; p < prevPredecessor_1.length; p++) {
                    _loop_5(p);
                }
            }
            if (!isNullOrUndefined(newPredecessor)) {
                var _loop_6 = function (n) {
                    var parentGanttRecord = this_5.parent.connectorLineModule.getRecordByID(newPredecessor[parseInt(n.toString(), 10)].from);
                    var parentPredecessor = extend([], [], parentGanttRecord.ganttProperties.predecessor, true);
                    var isValid = parentPredecessor.filter(function (pred) {
                        return newPredecessor[n].from === pred.from && newPredecessor[n].to === pred.to;
                    });
                    if (isValid.length === 0) {
                        parentPredecessor.push(newPredecessor[parseInt(n.toString(), 10)]);
                        this_5.parent.setRecordValue('predecessor', parentPredecessor, parentGanttRecord.ganttProperties, true);
                    }
                };
                var this_5 = this;
                for (var n = 0; n < newPredecessor.length; n++) {
                    _loop_6(n);
                }
            }
        }
    };
    /**
     * Method to remove a predecessor from a record.
     *
     * @param {IGanttData} childRecord .
     * @param {number} index .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.removePredecessorByIndex = function (childRecord, index) {
        if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed']) {
            if (this.parent.undoRedoModule['redoEnabled']) {
                this.parent.undoRedoModule['disableRedo']();
            }
            this.parent.undoRedoModule['createUndoCollection']();
            var details = {};
            details['action'] = 'DeleteDependency';
            details['modifiedRecords'] = extend([], [childRecord], [], true);
            this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = details;
        }
        var childPredecessor = childRecord.ganttProperties.predecessor;
        var predecessor = childPredecessor.splice(index, 1);
        var parentRecord = this.parent.connectorLineModule.getRecordByID(predecessor[0].from);
        var parentPredecessor = parentRecord.ganttProperties.predecessor;
        var parentIndex = getIndex(predecessor[0], 'from', parentPredecessor, 'to');
        parentPredecessor.splice(parentIndex, 1);
        var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(childRecord);
        childPredecessor.push(predecessor[0]);
        this.parent.connectorLineEditModule.updatePredecessor(childRecord, predecessorString);
    };
    /**
     * To render predecessor delete confirmation dialog
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.renderPredecessorDeleteConfirmDialog = function () {
        this.confirmPredecessorDialog = new Dialog({
            width: '320px',
            isModal: true,
            enableRtl: this.parent.enableRtl,
            content: this.parent.localeObj.getConstant('confirmPredecessorDelete'),
            buttons: [
                {
                    click: this.confirmOkDeleteButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('okText'), isPrimary: true }
                },
                {
                    click: this.confirmCloseDialog.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            target: this.parent.element,
            animationSettings: { effect: 'None' }
        });
        var confirmDialog = createElement('div', {
            id: this.parent.element.id + '_deletePredecessorConfirmDialog'
        });
        this.parent.element.appendChild(confirmDialog);
        this.confirmPredecessorDialog.isStringTemplate = true;
        this.confirmPredecessorDialog.appendTo(confirmDialog);
    };
    ConnectorLineEdit.prototype.confirmCloseDialog = function () {
        this.confirmPredecessorDialog.destroy();
    };
    ConnectorLineEdit.prototype.confirmOkDeleteButton = function () {
        this.removePredecessorByIndex(this.childRecord, this.predecessorIndex);
        this.confirmPredecessorDialog.destroy();
    };
    return ConnectorLineEdit;
}());
export { ConnectorLineEdit };
