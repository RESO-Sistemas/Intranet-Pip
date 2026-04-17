import { isNullOrUndefined, getValue, setValue } from '@syncfusion/ej2-base';
import { ConstraintType } from './enum';
/**
 *  Date processor is used to handle date of task data.
 */
var DateProcessor = /** @class */ (function () {
    function DateProcessor(parent) {
        this.fromSegments = false;
        this.mondayTimeRangeLength = 0;
        this.tuesdayTimeRangeLength = 0;
        this.wednesdayTimeRangeLength = 0;
        this.thursdayTimeRangeLength = 0;
        this.fridayTimeRangeLength = 0;
        this.saturdayTimeRangeLength = 0;
        this.sundayTimeRangeLength = 0;
        this.parent = parent;
    }
    /**
     * @param {ITaskData} ganttProp .
     * @returns {boolean} .
     */
    DateProcessor.prototype.isValidateNonWorkDays = function (ganttProp) {
        return (!isNullOrUndefined(ganttProp) && ganttProp.isAutoSchedule &&
            ((!this.parent.includeWeekend ||
                ganttProp.calendarContext.defaultHolidays.length > 0))) ||
            (isNullOrUndefined(ganttProp) &&
                (!this.parent.includeWeekend ||
                    this.parent.defaultCalendarContext.defaultHolidays.length > 0));
    };
    /**
     * Method to convert given date value as valid start date
     *
     * @param {Date} date .
     * @param {ITaskData} ganttProp - The Gantt properties related to the task.
     * @param {boolean} validateAsMilestone - Indicates whether the date should be validated as a milestone.
     * @param {boolean} isLoad - A flag indicating if the method is called during the loading process.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @param {boolean} ignoreAutoSchedule - Indicates whether to consider the autoschedule or not.
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.checkStartDate = function (date, ganttProp, validateAsMilestone, isLoad, isBaseline, ignoreAutoSchedule) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        var currentDay = new Date(date.getTime());
        var dayStartTime = this.parent['getCurrentDayStartTime'](currentDay);
        var dayEndTime = this.parent['getCurrentDayEndTime'](currentDay);
        var cloneStartDate = new Date(date.getTime());
        var hour = this.getSecondsInDecimal(cloneStartDate);
        validateAsMilestone = isNullOrUndefined(validateAsMilestone) ? !isNullOrUndefined(ganttProp) ?
            ganttProp.isMilestone : false : validateAsMilestone;
        if (hour < dayStartTime && (!validateAsMilestone || isLoad)) {
            this.setTime(dayStartTime, cloneStartDate);
        }
        else if (hour < dayStartTime && validateAsMilestone) {
            this.setTime(dayStartTime, cloneStartDate);
        }
        else if ((hour === dayEndTime && (!ganttProp || !validateAsMilestone)) || hour > dayEndTime) {
            cloneStartDate.setDate(cloneStartDate.getDate() + 1);
            dayStartTime = this.parent['getCurrentDayStartTime'](cloneStartDate);
            this.setTime(dayStartTime, cloneStartDate);
        }
        else if (hour > dayStartTime && hour < dayEndTime) {
            var workingRange = this.parent.workingTimeRanges;
            if (this.parent.weekWorkingTime.length > 0) {
                workingRange = this.parent['getWorkingRange'](cloneStartDate);
            }
            for (var index = 0; index < workingRange.length; index++) {
                var value = workingRange[index];
                if (hour >= value.to && (workingRange[index + 1] &&
                    hour < workingRange[index + 1].from)) {
                    // milestone can fall at end any interval time
                    if ((hour === value.to && (!ganttProp || !validateAsMilestone)) || hour !== value.to) {
                        this.setTime(workingRange[index + 1].from, cloneStartDate);
                    }
                    break;
                }
            }
        }
        var tStartDate;
        if (this.parent.autoCalculateDateScheduling && !ignoreAutoSchedule && !(this.parent.isLoad &&
            this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) {
            do {
                tStartDate = new Date(cloneStartDate.getTime());
                if (ganttProp && !ganttProp.calendarContext) {
                    ganttProp.calendarContext = this.parent.defaultCalendarContext;
                }
                var calendarContext = ganttProp
                    ? ganttProp.calendarContext
                    : this.parent.defaultCalendarContext;
                var holidayLength = calendarContext.defaultHolidays.length;
                // check holidays and weekends
                if (this.isValidateNonWorkDays(ganttProp)) {
                    dayStartTime = this.parent['getCurrentDayStartTime'](tStartDate);
                    if (ganttProp) {
                        if (!isBaseline) {
                            dayEndTime = this.parent['getCurrentDayEndTime'](ganttProp.endDate ? ganttProp.isAutoSchedule ? ganttProp.endDate : ganttProp.autoEndDate : tStartDate);
                        }
                        else {
                            dayEndTime = this.parent['getCurrentDayEndTime'](ganttProp.baselineEndDate ? ganttProp.baselineEndDate : tStartDate);
                        }
                    }
                    var startTime = (!validateAsMilestone || isLoad) ? dayStartTime : dayEndTime;
                    if (!this.parent.includeWeekend && !isBaseline) {
                        var tempDate = new Date(cloneStartDate.getTime());
                        cloneStartDate = this.getNextWorkingDay(cloneStartDate, calendarContext);
                        startTime = this.parent['getCurrentDayStartTime'](cloneStartDate);
                        if (tempDate.getTime() !== cloneStartDate.getTime() && !validateAsMilestone) {
                            this.setTime(startTime, cloneStartDate);
                        }
                    }
                    if (!isBaseline) {
                        for (var count = 0; count < holidayLength; count++) {
                            var holidayFrom = this.getDateFromFormat(new Date(calendarContext.defaultHolidays[count]));
                            var holidayTo = new Date(holidayFrom.getTime());
                            holidayFrom.setHours(0, 0, 0, 0);
                            holidayTo.setHours(23, 59, 59, 59);
                            if (cloneStartDate.getTime() >= holidayFrom.getTime() && cloneStartDate.getTime() < holidayTo.getTime()) {
                                cloneStartDate.setDate(cloneStartDate.getDate() + 1);
                                startTime = this.parent['getCurrentDayStartTime'](cloneStartDate);
                                this.setTime(startTime, cloneStartDate);
                            }
                        }
                    }
                }
            } while (tStartDate.getTime() !== cloneStartDate.getTime());
            return new Date(cloneStartDate.getTime());
        }
        else {
            return new Date(cloneStartDate.getTime());
        }
    };
    DateProcessor.prototype.getAdjustedStartDate = function (constraintDate, ganttProp) {
        var adjustedDate = new Date(constraintDate);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        var checkedEnd = this.parent.dateValidationModule.checkEndDate(adjustedDate);
        return this.parent.dateValidationModule.getStartDate(checkedEnd, ganttProp.duration, ganttProp.durationUnit, ganttProp);
    };
    DateProcessor.prototype.getDateByConstraint = function (ganttData, date, validPredecessor) {
        var ganttProp = ganttData['ganttProperties'] ? ganttData['ganttProperties'] : ganttData;
        var constraintDate = new Date(ganttProp.constraintDate);
        var isLoad = this.parent.isLoad;
        if (isNullOrUndefined(validPredecessor)) {
            validPredecessor = true;
        }
        if (validPredecessor && (!constraintDate || !date)) {
            return null;
        }
        if (this.parent.editModule && this.parent.editModule.dialogModule && this.parent.editModule.dialogModule['dialogConstraintDate']) {
            constraintDate = new Date(this.parent.editModule.dialogModule['dialogConstraintDate']);
        }
        else {
            constraintDate = this.parent['assignTimeToDate'](constraintDate, this.parent['getCurrentDayStartTime'](constraintDate));
        }
        switch (ganttProp.constraintType) {
            case ConstraintType.AsSoonAsPossible:
                if (isLoad) {
                    return date;
                }
                else {
                    ganttProp.constraintDate = null;
                    var parentRecord = null;
                    var record = this.parent.getRecordByID(ganttProp.taskId);
                    if (record && record.parentItem) {
                        parentRecord = record.parentItem;
                    }
                    if (ganttProp.predecessor && ganttProp.predecessor.length > 0) {
                        return this.parent['assignTimeToDate'](date, this.parent['getCurrentDayStartTime'](date));
                    }
                    else if (parentRecord) {
                        return this.parent.getRecordByID(parentRecord.taskId).ganttProperties.startDate;
                    }
                    else {
                        return this.parent.dateValidationModule.checkStartDate(new Date(this.parent.projectStartDate));
                    }
                }
            case ConstraintType.AsLateAsPossible:
                if (isLoad) {
                    return date;
                }
                else {
                    var parentRecord = this.parent.getRecordByID(ganttProp.taskId);
                    if (parentRecord && parentRecord.parentItem) {
                        var checkedEnd = this.parent.dateValidationModule.checkEndDate(this.parent.getRecordByID(parentRecord.parentItem.taskId).ganttProperties.endDate);
                        var start = this.parent.dateValidationModule.getStartDate(checkedEnd, ganttProp.duration, ganttProp.durationUnit, ganttProp);
                        return start;
                    }
                    else {
                        var checkedEnd = this.parent.dateValidationModule.checkEndDate(new Date(this.parent.projectEndDate));
                        var start = this.parent.dateValidationModule.getStartDate(checkedEnd, ganttProp.duration, ganttProp.durationUnit, ganttProp);
                        return start;
                    }
                }
            case ConstraintType.MustStartOn: {
                var isViolation = constraintDate.getTime() !== ganttProp.startDate.getTime();
                var constraintValue = void 0;
                if (this.parent.editModule && this.parent.editModule.dialogModule) {
                    constraintValue = this.parent.editModule.dialogModule['dialogConstraintValue'];
                }
                var isConstraintTypeRestricted = isNullOrUndefined(constraintValue) ||
                    constraintValue === 2 ||
                    constraintValue === 3;
                if (isViolation && !isLoad && isConstraintTypeRestricted) {
                    this.parent.constraintViolationType = 'MustStartOn';
                }
                constraintValue = null;
                if (isLoad) {
                    return this.parent.dateValidationModule.checkStartDate(new Date(constraintDate));
                }
                else {
                    return this.parent['assignTimeToDate'](date, this.parent['getCurrentDayStartTime'](date));
                }
            }
            case ConstraintType.MustFinishOn: {
                var isViolation = constraintDate.getTime() !== ganttProp.endDate.getTime();
                if (isViolation && !isLoad) {
                    this.parent.constraintViolationType = 'MustFinishOn';
                }
                return this.getAdjustedStartDate(constraintDate, ganttProp);
            }
            case ConstraintType.StartNoEarlierThan: {
                if (constraintDate.getTime() < date.getTime() || !isLoad) {
                    return this.parent['assignTimeToDate'](date, this.parent['getCurrentDayStartTime'](date));
                }
                return this.parent.dateValidationModule.checkStartDate(new Date(constraintDate));
            }
            case ConstraintType.StartNoLaterThan: {
                var isViolation = constraintDate.getTime() < date.getTime();
                if (isViolation && !isLoad) {
                    this.parent.constraintViolationType = 'StartNoLaterThan';
                }
                if (!isLoad) {
                    var cellEditModule = this.parent.editModule && this.parent.editModule.cellEditModule;
                    var constraintField = this.parent.taskFields && this.parent.taskFields.constraintDate;
                    if (cellEditModule &&
                        cellEditModule.isCellEdit &&
                        cellEditModule.editedColumn &&
                        isViolation &&
                        cellEditModule.editedColumn.field === constraintField) {
                        return constraintDate;
                    }
                    if (this.parent.editModule && this.parent.editModule.dialogModule && isViolation && this.parent.editModule.dialogModule['dialogConstraintDate']) {
                        return constraintDate;
                    }
                    return this.parent['assignTimeToDate'](date, this.parent['getCurrentDayStartTime'](date));
                }
                if (isLoad && isViolation) {
                    return this.parent.dateValidationModule.checkStartDate(new Date(constraintDate));
                }
                else {
                    return date;
                }
            }
            case ConstraintType.FinishNoEarlierThan: {
                var endDate = this.getEndDate(date, ganttProp.duration, ganttProp.durationUnit, ganttProp, false, false);
                if (endDate.getTime() < constraintDate.getTime()) {
                    return this.getAdjustedStartDate(constraintDate, ganttProp);
                }
                else {
                    return date;
                }
            }
            case ConstraintType.FinishNoLaterThan: {
                var endDate = this.getEndDate(date, ganttProp.duration, ganttProp.durationUnit, ganttProp, false, false);
                var isViolation = constraintDate.getTime() < endDate.getTime();
                if (isViolation && !isLoad) {
                    this.parent.constraintViolationType = 'FinishNoLaterThan';
                }
                if (!isLoad) {
                    if (isViolation) {
                        return this.getAdjustedStartDate(constraintDate, ganttProp);
                    }
                    return this.parent['assignTimeToDate'](date, this.parent['getCurrentDayEndTime'](date));
                }
                if (isViolation) {
                    return this.getAdjustedStartDate(constraintDate, ganttProp);
                }
                else {
                    return date;
                }
            }
            default:
                return date;
        }
    };
    /**
     * To update given date value to valid end date
     *
     * @param {Date} date .
     * @param {ITaskData} ganttProp .
     * @param {boolean} validateAsMilestone .
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @param {boolean} ignoreAutoSchedule - Indicates whether to consider the autoschedule or not.
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.checkEndDate = function (date, ganttProp, validateAsMilestone, isBaseline, ignoreAutoSchedule) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        var dayStartTime;
        var dayEndTime;
        if (ganttProp && !ganttProp.calendarContext) {
            ganttProp.calendarContext = this.parent.defaultCalendarContext;
        }
        var calendarContext = ganttProp
            ? ganttProp.calendarContext
            : this.parent.defaultCalendarContext;
        if (this.parent.weekWorkingTime.length > 0) {
            var currentDay = new Date(date.getTime());
            if (((!this.parent.includeWeekend) &&
                ganttProp &&
                ganttProp.isAutoSchedule) ||
                (this.parent.editModule &&
                    this.parent.editModule.taskbarEditModule &&
                    this.parent.editModule.taskbarEditModule.taskBarEditRecord &&
                    !this.parent.editModule.taskbarEditModule.taskBarEditRecord.ganttProperties.isAutoSchedule)) {
                currentDay = this.getNextWorkingDay(currentDay, calendarContext);
            }
            dayStartTime = this.parent['getStartTime'](currentDay);
            dayEndTime = this.parent['getEndTime'](currentDay);
        }
        else {
            dayStartTime = this.parent.defaultStartTime;
            dayEndTime = this.parent.defaultEndTime;
        }
        var cloneEndDate = new Date(date.getTime());
        var hour = this.getSecondsInDecimal(cloneEndDate);
        if (hour > dayEndTime) {
            this.setTime(dayEndTime, cloneEndDate);
        }
        else if (hour <= dayStartTime && dayEndTime !== 86400 && !validateAsMilestone) {
            var taskfields = this.parent.taskFields;
            if (this.parent.editModule && this.parent.editModule['editedRecord'] && (!this.parent.editModule['editedRecord'][taskfields.startDate] && this.parent.editModule['editedRecord'][taskfields.endDate])) {
                cloneEndDate.setDate(cloneEndDate.getDate());
            }
            else {
                cloneEndDate.setDate(cloneEndDate.getDate() - 1);
            }
            dayEndTime = this.parent['getCurrentDayEndTime'](cloneEndDate);
            this.setTime(dayEndTime, cloneEndDate);
        }
        else if (hour > dayStartTime && hour < dayEndTime) {
            for (var index = 0; index < this.parent.workingTimeRanges.length; index++) {
                var value = this.parent.workingTimeRanges[index];
                if (hour > value.to && (this.parent.workingTimeRanges[index + 1] &&
                    hour <= this.parent.workingTimeRanges[index + 1].from)) {
                    this.setTime(this.parent.workingTimeRanges[index].to, cloneEndDate);
                    break;
                }
            }
        }
        var tempCheckDate;
        if (this.parent.autoCalculateDateScheduling && !ignoreAutoSchedule &&
            !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
                this.parent.taskFields.hasChildMapping)) {
            do {
                tempCheckDate = new Date(cloneEndDate.getTime());
                var holidayLength = calendarContext.defaultHolidays.length;
                if (this.isValidateNonWorkDays(ganttProp) && !isBaseline) {
                    if (!this.parent.includeWeekend) {
                        var tempDate = new Date(cloneEndDate.getTime());
                        cloneEndDate = this.getPreviousWorkingDay(cloneEndDate, calendarContext);
                        dayEndTime = this.parent['getCurrentDayEndTime'](cloneEndDate);
                        if (tempDate.getTime() !== cloneEndDate.getTime()) {
                            this.setTime(dayEndTime, cloneEndDate);
                        }
                    }
                    for (var count = 0; count < holidayLength; count++) {
                        var holidayFrom = this.getDateFromFormat(new Date(calendarContext.defaultHolidays[count]));
                        var holidayTo = new Date(holidayFrom.getTime());
                        var tempHoliday = new Date(cloneEndDate.getTime());
                        tempHoliday.setMinutes(cloneEndDate.getMilliseconds() - 2);
                        holidayFrom.setHours(0, 0, 0, 0);
                        holidayTo.setHours(23, 59, 59, 59);
                        if (cloneEndDate.getTime() >= holidayFrom.getTime() && cloneEndDate.getTime() < holidayTo.getTime() ||
                            tempHoliday.getTime() >= holidayFrom.getTime() && tempHoliday.getTime() < holidayTo.getTime()) {
                            cloneEndDate.setDate(cloneEndDate.getDate() - 1);
                            dayEndTime = this.parent['getCurrentDayEndTime'](cloneEndDate);
                            if (!(cloneEndDate.getTime() === holidayFrom.getTime() && dayEndTime === 86400 &&
                                this.getSecondsInDecimal(cloneEndDate) === 0)) {
                                this.setTime(dayEndTime, cloneEndDate);
                            }
                        }
                    }
                }
            } while (tempCheckDate.getTime() !== cloneEndDate.getTime());
            return new Date(cloneEndDate.getTime());
        }
        else {
            if (!isNullOrUndefined(cloneEndDate) && this.parent.defaultEndTime !== 86400) {
                dayEndTime = this.parent['getCurrentDayEndTime'](date);
                this.setTime(dayEndTime, cloneEndDate);
            }
            return new Date(cloneEndDate.getTime());
        }
    };
    /**
     * To validate the baseline start date
     *
     * @param {Date} date .
     * @param {ITaskData} ganttProp .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.checkBaselineStartDate = function (date, ganttProp) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        else {
            var dayStartTime = this.parent['getCurrentDayStartTime'](date);
            var dayEndTime = this.parent['getCurrentDayEndTime'](ganttProp ? ganttProp.endDate ? ganttProp.isAutoSchedule ? ganttProp.endDate : ganttProp.autoEndDate : date : date);
            var cloneDate = new Date(date.getTime());
            var hour = this.getSecondsInDecimal(cloneDate);
            if (hour < dayStartTime) {
                this.setTime(dayStartTime, cloneDate);
            }
            else if (hour > dayEndTime) {
                cloneDate.setDate(cloneDate.getDate() + 1);
                if (this.parent.weekWorkingTime.length > 0) {
                    dayStartTime = this.parent['getStartTime'](cloneDate);
                }
                else {
                    dayStartTime = this.parent.defaultStartTime;
                }
                this.setTime(dayStartTime, cloneDate);
            }
            else if (hour > dayStartTime && hour < dayEndTime) {
                for (var i = 0; i < this.parent.workingTimeRanges.length; i++) {
                    var value = this.parent.workingTimeRanges[i];
                    if (hour > value.to && (this.parent.workingTimeRanges[i + 1] &&
                        hour < this.parent.workingTimeRanges[i + 1].from)) {
                        this.setTime(this.parent.workingTimeRanges[i + 1].from, cloneDate);
                        break;
                    }
                }
            }
            return cloneDate;
        }
    };
    /**
     * To validate baseline end date
     *
     * @param {Date} date .
     * @param {ITaskData} ganttProp .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.checkBaselineEndDate = function (date, ganttProp) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        else {
            var dayEndTime = this.parent['getCurrentDayEndTime'](date);
            var dayStartTime = this.parent['getCurrentDayStartTime'](ganttProp ? ganttProp.startDate ? ganttProp.isAutoSchedule ? ganttProp.startDate : ganttProp.autoStartDate : date : date);
            var cloneDate = new Date(date.getTime());
            var hour = this.getSecondsInDecimal(cloneDate);
            if (hour > dayEndTime) {
                this.setTime(dayEndTime, cloneDate);
            }
            else if (hour < dayStartTime && !isNullOrUndefined(ganttProp) && !ganttProp.isMilestone) {
                cloneDate.setDate(cloneDate.getDate() - 1);
                dayEndTime = this.parent['getCurrentDayEndTime'](cloneDate);
                this.setTime(dayEndTime, cloneDate);
            }
            else if (hour > dayStartTime && hour < dayEndTime) {
                for (var i = 0; i < this.parent.workingTimeRanges.length; i++) {
                    var value = this.parent.workingTimeRanges[i];
                    if (hour > value.to && (this.parent.workingTimeRanges[i + 1] && hour <= this.parent.workingTimeRanges[i + 1].from)) {
                        this.setTime(this.parent.workingTimeRanges[i].to, cloneDate);
                        break;
                    }
                }
            }
            if (ganttProp && ganttProp.baselineStartDate && cloneDate &&
                ganttProp.baselineStartDate.getTime() > cloneDate.getTime()) {
                cloneDate.setDate(cloneDate.getDate() + 1);
            }
            return cloneDate;
        }
    };
    /**
     * To calculate start date value from duration and end date
     *
     * @param {IGanttData} ganttData - Defines the gantt data.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     * @private
     */
    DateProcessor.prototype.calculateStartDate = function (ganttData, isBaseline) {
        var ganttProp = ganttData.ganttProperties;
        var tempStartDate = null;
        if (isBaseline) {
            if (!isNullOrUndefined(ganttProp.baselineEndDate) && !isNullOrUndefined(ganttProp.baselineDuration)) {
                tempStartDate = this.getStartDate(ganttProp.baselineEndDate, ganttProp.baselineDuration, ganttProp.durationUnit, ganttProp, undefined, true);
            }
            this.parent.setRecordValue('baselineStartDate', tempStartDate, ganttProp, true);
            if (this.parent.taskFields.baselineStartDate) {
                this.parent.dataOperation.updateMappingData(ganttData, 'baselineStartDate');
            }
        }
        else {
            if (!isNullOrUndefined(ganttProp.endDate) && !isNullOrUndefined(ganttProp.duration)) {
                tempStartDate = this.getStartDate(ganttProp.endDate, ganttProp.duration, ganttProp.durationUnit, ganttProp);
            }
            this.parent.setRecordValue('startDate', tempStartDate, ganttProp, true);
            if (this.parent.taskFields.startDate) {
                this.parent.dataOperation.updateMappingData(ganttData, 'startDate');
            }
        }
    };
    /**
     * Gets task field mappings based on baseline context.
     *
     * @param {boolean} isBaseline - Flag indicating if baseline fields should be used.
     * @returns {{ startdateField: string, enddateField: string, durationField: string }} - Object containing field names for start date, end date, and duration.
     */
    DateProcessor.prototype.getFieldMappings = function (isBaseline) {
        return {
            startdateField: isBaseline ? 'baselineStartDate' : 'startDate',
            enddateField: isBaseline ? 'baselineEndDate' : 'endDate',
            durationField: isBaseline ? 'baselineDuration' : 'duration'
        };
    };
    /**
     *
     * @param {IGanttData} ganttData - Defines the gantt data.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     * @public
     */
    /* eslint-disable */
    DateProcessor.prototype.calculateEndDate = function (ganttData, isBaseline) {
        var ganttProp = ganttData.ganttProperties;
        var tempEndDate = null;
        var dayStartTime;
        var dayEndTime;
        var _a = this.getFieldMappings(isBaseline), startdateField = _a.startdateField, enddateField = _a.enddateField, durationField = _a.durationField;
        if (!isNullOrUndefined(ganttProp[startdateField])) {
            if (!isNullOrUndefined(ganttProp[enddateField]) && isNullOrUndefined(ganttProp[durationField])) {
                if (this.compareDates(ganttProp[startdateField], ganttProp[enddateField]) === 1) {
                    this.parent.setRecordValue(startdateField, new Date(ganttProp[enddateField].getTime()), ganttProp, true);
                    dayStartTime = this.parent['getCurrentDayStartTime'](ganttProp.isAutoSchedule && !isBaseline ? ganttProp.autoStartDate : ganttProp[startdateField]);
                    dayEndTime = this.parent['getCurrentDayEndTime'](ganttProp.isAutoSchedule && !isBaseline ? ganttProp.autoEndDate : ganttProp[enddateField]);
                    this.setTime(dayStartTime, ganttProp[startdateField]);
                }
                this.calculateDuration(ganttData, isBaseline);
            }
            if (!isNullOrUndefined(ganttProp[durationField])) {
                var duration = !isBaseline && !isNullOrUndefined(ganttProp.segments) && ganttProp.segments.length > 1 ?
                    this.totalDuration(ganttProp.segments) : ganttProp[durationField];
                tempEndDate = this.getEndDate(ganttProp[startdateField], duration, ganttProp.durationUnit, ganttProp, false, isBaseline, ganttData);
            }
            this.parent.setRecordValue(enddateField, tempEndDate, ganttProp, true);
        }
        else {
            tempEndDate = ganttData[this.parent.taskFields[enddateField]];
            if (!isNullOrUndefined(tempEndDate)) {
                dayEndTime = this.parent['getCurrentDayEndTime'](tempEndDate);
                this.setTime(dayEndTime, tempEndDate);
            }
            this.parent.setRecordValue(enddateField, tempEndDate, ganttProp, true);
        }
        if (this.parent.taskFields[enddateField]) {
            this.parent.dataOperation.updateMappingData(ganttData, enddateField);
        }
    };
    /* eslint-enable */
    DateProcessor.prototype.totalDuration = function (segments) {
        var duration = 0;
        var unit;
        if (!isNullOrUndefined(this.parent.timelineSettings.bottomTier)) {
            unit = this.parent.timelineSettings.bottomTier.unit;
        }
        for (var i = 0; i < segments.length; i++) {
            var segmentOffset = segments[i].offsetDuration;
            if (unit === 'Hour') {
                segmentOffset = segmentOffset / 24;
            }
            else if (unit === 'Minutes') {
                segmentOffset = segmentOffset / (24 * 60);
            }
            duration += segments[i].duration + segmentOffset;
        }
        duration = Math.ceil(duration);
        return duration;
    };
    /**
     * To calculate duration from start date and end date
     *
     * @param {IGanttData} ganttData - Defines the gantt data.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     */
    DateProcessor.prototype.calculateDuration = function (ganttData, isBaseline) {
        var ganttProperties = ganttData.ganttProperties;
        var calendarContext = ganttProperties.calendarContext;
        var tDuration;
        if (!isBaseline && !isNullOrUndefined(ganttProperties.segments) && ganttProperties.segments.length > 0 &&
            !isNullOrUndefined(this.parent.editModule.taskbarEditModule)) {
            tDuration = this.parent.editModule.taskbarEditModule.sumOfDuration(ganttProperties.segments);
        }
        else {
            if (!isBaseline && (!isNullOrUndefined(this.parent.taskFields.milestone)) && (!isNullOrUndefined(ganttProperties.startDate))
                && !isNullOrUndefined(ganttProperties.endDate) &&
                (ganttProperties.startDate).getTime() === (ganttProperties.endDate).getTime()
                && (ganttData.taskData[this.parent.taskFields.milestone] === false)) {
                tDuration = 1;
            }
            else {
                var startDate = isBaseline ? ganttProperties.baselineStartDate : ganttProperties.startDate;
                var endDate = isBaseline ? ganttProperties.baselineEndDate : ganttProperties.endDate;
                var durationUnit = ganttProperties.durationUnit;
                var isAutoSchedule = isBaseline ? false : ganttProperties.isAutoSchedule;
                var isMilestone = isBaseline ? false : ganttProperties.isMilestone;
                tDuration = this.getDuration(startDate, endDate, durationUnit, isAutoSchedule, isMilestone, undefined, calendarContext);
            }
        }
        var duration = isBaseline ? 'baselineDuration' : 'duration';
        this.parent.setRecordValue(duration, tDuration, ganttProperties, true);
        var col = isBaseline ? this.parent.columnByField[this.parent.columnMapping.baselineDuration] :
            this.parent.columnByField[this.parent.columnMapping.duration];
        if (!isNullOrUndefined(this.parent.editModule) && !isNullOrUndefined(this.parent.editModule.cellEditModule) &&
            !this.parent.editModule.cellEditModule.isCellEdit && !isNullOrUndefined(col)) {
            if (!isNullOrUndefined(col.edit) && !isNullOrUndefined(col.edit.read)) {
                var dialog = this.parent.editModule.dialogModule.dialog;
                if (!isNullOrUndefined(dialog)) {
                    var textBoxElement = isBaseline ? dialog.querySelector('#' + this.parent.element.id + 'BaselineDuration') :
                        dialog.querySelector('#' + this.parent.element.id + 'Duration');
                    if (!isNullOrUndefined(textBoxElement)) {
                        var textBox = textBoxElement.ej2_instances[0];
                        if (!isNullOrUndefined(textBox) && textBox.value !== tDuration.toString()) {
                            textBox.value = tDuration.toString();
                            textBox.dataBind();
                        }
                    }
                }
            }
            if (this.parent.taskFields.duration || this.parent.taskFields.baselineDuration) {
                this.parent.dataOperation.updateMappingData(ganttData, duration);
                if (this.parent.taskFields.durationUnit) {
                    this.parent.dataOperation.updateMappingData(ganttData, 'durationUnit');
                }
            }
        }
    };
    /**
     *
     * @param {Date} sDate Method to get total nonworking time between two date values
     * @param {Date} eDate .
     * @param {boolean} isAutoSchedule .
     * @param {boolean} isCheckTimeZone .
     * @param {CalendarContext} calendarContext .
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @param {boolean} ignoreAutoSchedule - Indicates whether to consider the autoschedule or not.
     * @returns {number} .
     */
    DateProcessor.prototype.getNonworkingTime = function (sDate, eDate, isAutoSchedule, isCheckTimeZone, calendarContext, isBaseline, ignoreAutoSchedule) {
        var parent = this.parent;
        isCheckTimeZone = isNullOrUndefined(isCheckTimeZone) ? true : isCheckTimeZone;
        var shouldCheckWeekend = !isBaseline &&
            !parent.includeWeekend &&
            parent.autoCalculateDateScheduling &&
            !(parent.isLoad && parent.treeGrid.loadChildOnDemand && parent.taskFields.hasChildMapping) &&
            isAutoSchedule;
        var weekendCount = shouldCheckWeekend && !ignoreAutoSchedule ? this.getWeekendCount(sDate, eDate, calendarContext) : 0;
        var totalSeconds = this.getNumberOfSeconds(sDate, eDate, isCheckTimeZone);
        var shouldCheckHolidays = (isAutoSchedule && parent.autoCalculateDateScheduling &&
            !(parent.isLoad && parent.treeGrid.loadChildOnDemand && parent.taskFields.hasChildMapping)) && !isBaseline;
        var holidaysCount = shouldCheckHolidays && !ignoreAutoSchedule ? this.getHolidaysCount(sDate, eDate, calendarContext) : 0;
        var totalWorkDays = (totalSeconds - (weekendCount * 86400) - (holidaysCount * 86400)) / 86400;
        var nonWorkingSecondsOnDate = this.getNonWorkingSecondsOnDate(sDate, eDate, isAutoSchedule, isBaseline, calendarContext, ignoreAutoSchedule);
        var nonWorkingTime = parent.weekWorkingTime.length > 0 ?
            this.nonWorkingSeconds(sDate, eDate, isAutoSchedule, totalWorkDays, calendarContext, false, ignoreAutoSchedule) :
            (totalWorkDays * (86400 - parent.secondsPerDay));
        return nonWorkingTime + (weekendCount * 86400) + (holidaysCount * 86400) + nonWorkingSecondsOnDate;
    };
    DateProcessor.prototype.nonWorkingSeconds = function (sDate, eDate, isAutoSchedule, workDays, calendarContext, fromDuration, ignoreAutoSchedule) {
        var newStartDate = sDate.getTime() > eDate.getTime() ? new Date(eDate.getTime()) : new Date(sDate.getTime());
        var newEndDate = sDate.getTime() > eDate.getTime() ? new Date(sDate.getTime()) : new Date(eDate.getTime());
        var timeDiff = 0;
        var count = 0;
        if (fromDuration) {
            var dayStartTime = this.parent['getCurrentDayStartTime'](newStartDate);
            var dayEndTime = this.parent['getCurrentDayEndTime'](newStartDate);
            if (!(newStartDate.getHours() < dayEndTime / 3600 && newStartDate.getHours() >= dayStartTime / 3600)) {
                newStartDate.setDate(newStartDate.getDate() + 1);
            }
        }
        else {
            newStartDate.setDate(newStartDate.getDate() + 1);
            newStartDate.setHours(0, 0, 0, 0);
            newEndDate.setHours(0, 0, 0, 0);
        }
        if (workDays > 0 || isNullOrUndefined(workDays)) {
            while ((fromDuration && newStartDate.getTime() <= newEndDate.getTime())
                || (!fromDuration && newStartDate.getTime() < newEndDate.getTime())) {
                if (isAutoSchedule && !ignoreAutoSchedule) {
                    if (this.isOnHolidayOrWeekEnd(newStartDate, true, calendarContext)) {
                        do {
                            newStartDate.setDate(newStartDate.getDate() + 1);
                        } while (this.isOnHolidayOrWeekEnd(newStartDate, true, calendarContext));
                    }
                    if ((!this.parent.includeWeekend)) {
                        this.getNextWorkingDay(newStartDate, calendarContext);
                    }
                }
                if (newStartDate.getTime() <= newEndDate.getTime()) {
                    count++;
                    var currentDaySeconds = this.parent['getSecondsPerDay'](newStartDate);
                    if (fromDuration) {
                        timeDiff += currentDaySeconds;
                    }
                    else {
                        timeDiff += 86400 - currentDaySeconds;
                    }
                    newStartDate.setDate(newStartDate.getDate() + 1);
                    if (isAutoSchedule && !ignoreAutoSchedule) {
                        if (this.isOnHolidayOrWeekEnd(newStartDate, true, calendarContext)) {
                            do {
                                newStartDate.setDate(newStartDate.getDate() + 1);
                            } while (this.isOnHolidayOrWeekEnd(newStartDate, true, calendarContext));
                        }
                        if ((!this.parent.includeWeekend)) {
                            this.getNextWorkingDay(newStartDate, calendarContext);
                        }
                    }
                }
            }
        }
        else {
            return 0;
        }
        if (fromDuration) {
            if (timeDiff > 0) {
                timeDiff = timeDiff / count;
            }
            else {
                timeDiff = this.parent.secondsPerDay;
            }
        }
        return timeDiff;
    };
    /**
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {string} durationUnit .
     * @param {boolean} isAutoSchedule .
     * @param {boolean} isMilestone .
     * @param {boolean} isCheckTimeZone .
     * @param {CalendarContext} calendarContext .
     * @returns {number} .
     * @private
     */
    DateProcessor.prototype.getDuration = function (startDate, endDate, durationUnit, isAutoSchedule, isMilestone, isCheckTimeZone, calendarContext) {
        if (isCheckTimeZone === void 0) { isCheckTimeZone = true; }
        if (!startDate || !endDate) {
            return null;
        }
        var durationValue = 0;
        var isSameDay = this.parent.getFormatedDate(startDate) === this.parent.getFormatedDate(endDate);
        var totSeconds;
        if (this.parent.weekWorkingTime.length > 0) {
            var tempStartDate = new Date(startDate);
            totSeconds = this.nonWorkingSeconds(startDate, endDate, isAutoSchedule, undefined, calendarContext, true);
            var totalDurationInDays = 0;
            while (tempStartDate <= endDate) {
                var currentDateString = this.parent.getFormatedDate(tempStartDate);
                var dayWorkingSeconds = this.parent['getSecondsPerDay'](tempStartDate);
                var currentStartDate = new Date(tempStartDate);
                var currentEndDate = new Date(tempStartDate);
                currentStartDate.setHours(0, 0, 0, 0);
                currentEndDate.setHours(0, 0, 0, 0);
                currentStartDate.setSeconds(this.parent['getCurrentDayStartTime'](tempStartDate));
                currentEndDate.setSeconds(this.parent['getCurrentDayEndTime'](tempStartDate));
                if (currentDateString === this.parent.getFormatedDate(startDate)) {
                    currentStartDate.setTime(startDate.getTime());
                }
                if (currentDateString === this.parent.getFormatedDate(endDate)) {
                    currentEndDate.setTime(endDate.getTime());
                }
                var timeDiffSeconds = this.getTimeDifference(currentStartDate, currentEndDate, isCheckTimeZone) / 1000;
                var nonWorkSeconds = this.getNonworkingTime(currentStartDate, currentEndDate, isAutoSchedule, isCheckTimeZone, calendarContext);
                totalDurationInDays += Math.max(0, timeDiffSeconds - nonWorkSeconds) / dayWorkingSeconds;
                tempStartDate.setDate(tempStartDate.getDate() + 1);
            }
            if (!(isMilestone && isSameDay)) {
                durationValue = this.calculateDurationValue(durationUnit, totalDurationInDays, totSeconds);
            }
        }
        else {
            totSeconds = this.parent.secondsPerDay;
            var timeDiff = this.getTimeDifference(startDate, endDate, isCheckTimeZone) / 1000;
            var nonWorkHours = this.getNonworkingTime(startDate, endDate, isAutoSchedule, isCheckTimeZone, calendarContext);
            var durationHours = timeDiff - nonWorkHours;
            if (!(isMilestone && isSameDay)) {
                durationValue = this.calculateDurationValue(durationUnit, durationHours / totSeconds, totSeconds);
            }
        }
        return parseFloat(durationValue.toString());
    };
    DateProcessor.prototype.calculateDurationValue = function (durationUnit, duration, totSeconds) {
        if (!durationUnit || durationUnit === 'day') {
            return duration;
        }
        else if (durationUnit === 'minute') {
            return duration * (totSeconds / 60);
        }
        else {
            return duration * (totSeconds / 3600);
        }
    };
    /**
     *
     * @param {number} duration .
     * @param {string} durationUnit .
     * @param {Date} date .
     *  @returns {number} .
     */
    DateProcessor.prototype.getDurationAsSeconds = function (duration, durationUnit, date) {
        var value = 0;
        var totSeconds;
        if (this.parent.weekWorkingTime.length > 0) {
            totSeconds = this.parent['getSecondsPerDay'](date);
        }
        else {
            totSeconds = this.parent.secondsPerDay;
        }
        if (!durationUnit || durationUnit.toLocaleLowerCase() === 'day') {
            value = totSeconds * duration;
        }
        else if (durationUnit.toLocaleLowerCase() === 'hour') {
            value = duration * 3600;
        }
        else {
            value = duration * 60;
        }
        return value;
    };
    /**
     * To get date from start date and duration
     *
     * @param {Date} startDate .
     * @param {number} duration .
     * @param {string} durationUnit .
     * @param {ITaskData} ganttProp .
     * @param {boolean} validateAsMilestone .
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @param {IGanttData} ganttData .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.getEndDate = function (startDate, duration, durationUnit, ganttProp, validateAsMilestone, isBaseline, ganttData) {
        var sDate = new Date(startDate.getTime());
        var secondDuration;
        if (!ganttProp.calendarContext) {
            ganttProp.calendarContext = this.parent.defaultCalendarContext;
        }
        if (this.parent.weekWorkingTime.length > 0 &&
            (!durationUnit || durationUnit.toLocaleLowerCase() === 'day')) {
            secondDuration = this.calculateSecondDuration(duration, sDate, secondDuration, startDate, true, ganttProp.calendarContext);
        }
        else {
            secondDuration = this.getDurationAsSeconds(duration, durationUnit, startDate);
        }
        // Calculate actual end date considering working time
        var endDate = this.calculateEndDateFromDuration(startDate, secondDuration, ganttProp, validateAsMilestone, ganttProp.calendarContext, isBaseline, false);
        // Handle auto-validated tasks for dataSource have startdate and duration, no enddate value mapping case:
        if (this.parent.autoCalculateDateScheduling && this.parent.isLoad && !isNullOrUndefined(ganttData) &&
            isNullOrUndefined(ganttData[this.parent.taskFields.endDate])
            && !isNullOrUndefined(ganttData[this.parent.taskFields.startDate])
            && !ganttData.hasChildRecords) {
            var userStartDate = this.getDateFromFormat(ganttData[this.parent.taskFields.startDate]);
            this.parent.dataOperation['resolveAndApplyWorkingTimes'](userStartDate);
            var formattedStartDate = this.checkStartDate(userStartDate, ganttProp, validateAsMilestone, this.parent.isLoad, false, true);
            var naiveSeconds = this.getDurationAsSeconds(duration, durationUnit, userStartDate);
            var naiveEndDate = this.calculateEndDateFromDuration(formattedStartDate, naiveSeconds, ganttProp, validateAsMilestone, ganttProp.calendarContext, false, ganttProp.isAutoSchedule);
            // Compare the dates: if calculated end date is greater than naive end date, push to collection
            if (endDate.getTime() !== naiveEndDate.getTime() || userStartDate.getTime() !== formattedStartDate.getTime()) {
                this.parent.dataOperation['validatedGanttData'].set(ganttData.ganttProperties.taskId, ganttData);
            }
        }
        return endDate;
    };
    DateProcessor.prototype.calculateEndDateFromDuration = function (startDate, totalSeconds, ganttProp, validateAsMilestone, calendarContext, isBaseline, ignoreAutoSchedule) {
        var current = new Date(startDate.getTime());
        var endDate = new Date(startDate.getTime());
        var remainingSeconds = totalSeconds;
        while (remainingSeconds > 0) {
            endDate.setSeconds(endDate.getSeconds() + remainingSeconds);
            var nonWork = this.getNonworkingTime(current, endDate, ganttProp.isAutoSchedule, true, calendarContext, isBaseline, ignoreAutoSchedule);
            var workHours = remainingSeconds - nonWork;
            remainingSeconds -= workHours;
            if (remainingSeconds > 0) {
                endDate = this.checkStartDate(endDate, ganttProp, validateAsMilestone, undefined, isBaseline, ignoreAutoSchedule);
            }
            current = new Date(endDate.getTime());
        }
        return endDate;
    };
    /**
     * Calculate start date based on end date and duration.
     *
     * @param {Date} endDate - To calculate start date value from end date and duration.
     * @param {number} duration - The duration value.
     * @param {string} durationUnit - The unit of duration.
     * @param {ITaskData} ganttProp - The Gantt task properties.
     * @param {boolean} fromValidation - A flag indicating if the calculation is from validation.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {Date} The calculated start date.
     * @private
     */
    DateProcessor.prototype.getStartDate = function (endDate, duration, durationUnit, ganttProp, fromValidation, isBaseline) {
        var tempEnd = new Date(endDate.getTime());
        var startDate = new Date(endDate.getTime());
        var secondDuration;
        var eDate = new Date(tempEnd.getTime());
        if (!ganttProp.calendarContext) {
            ganttProp.calendarContext = this.parent.defaultCalendarContext;
        }
        if (this.parent.weekWorkingTime.length > 0) {
            secondDuration = this.calculateSecondDuration(duration, eDate, secondDuration, tempEnd, false, ganttProp.calendarContext);
        }
        else {
            secondDuration = this.getDurationAsSeconds(duration, durationUnit, tempEnd);
        }
        var nonWork = 0;
        var workHours = 0;
        while (secondDuration > 0) {
            startDate.setSeconds(startDate.getSeconds() - secondDuration);
            nonWork = this.getNonworkingTime(startDate, tempEnd, ganttProp.isAutoSchedule, true, ganttProp.calendarContext, isBaseline);
            workHours = secondDuration - nonWork;
            secondDuration = secondDuration - workHours;
            if (secondDuration > 0) {
                tempEnd = this.checkEndDate(startDate, ganttProp, isBaseline);
            }
            tempEnd = new Date(startDate.getTime());
        }
        /* To render the milestone in proper date while loading */
        if (fromValidation && ganttProp.isMilestone) {
            startDate.setDate(startDate.getDate() - 1);
            var dayEndTime = this.parent['getCurrentDayEndTime'](ganttProp.endDate ? ganttProp.isAutoSchedule ? ganttProp.endDate : ganttProp.autoEndDate : startDate);
            this.parent.dateValidationModule.setTime(dayEndTime, startDate);
            startDate = this.parent.dateValidationModule.checkStartDate(startDate, ganttProp, true);
        }
        return startDate;
    };
    DateProcessor.prototype.calculateSecondDuration = function (duration, sDate, secondDuration, startDate, fromEndDate, calendarContext) {
        if (duration < 1) {
            secondDuration = this.parent['getSecondsPerDay'](sDate) * duration;
        }
        else {
            secondDuration = 0;
            var durationValue = duration;
            var dayStartTime = this.parent['getCurrentDayStartTime'](sDate);
            var dayEndTime = this.parent['getCurrentDayEndTime'](sDate);
            if (!(sDate.getHours() < dayEndTime / 3600 && sDate.getHours() > dayStartTime / 3600) && this.fromSegments) {
                if (fromEndDate) {
                    sDate.setDate(sDate.getDate() + 1);
                }
                else {
                    sDate.setDate(sDate.getDate() - 1);
                }
            }
            while (durationValue > 0) {
                if (this.isOnHolidayOrWeekEnd(sDate, true, calendarContext)) {
                    do {
                        if (fromEndDate) {
                            sDate.setDate(sDate.getDate() + 1);
                        }
                        else {
                            sDate.setDate(sDate.getDate() - 1);
                        }
                    } while (this.isOnHolidayOrWeekEnd(sDate, true, calendarContext));
                }
                if ((!this.parent.includeWeekend)) {
                    sDate = fromEndDate ?
                        this.getNextWorkingDay(sDate, calendarContext) :
                        this.getPreviousWorkingDay(sDate, calendarContext);
                }
                var totSeconds = this.parent['getSecondsPerDay'](sDate);
                var num = 0;
                if (this.getSecondsInDecimal(startDate) !== this.parent['getStartTime'](startDate) && !Number.isInteger(durationValue)) {
                    var deciNumber = duration.toString().split('.');
                    num = parseFloat('.' + deciNumber[1]);
                    totSeconds = totSeconds * num;
                    durationValue = durationValue - num;
                }
                if (durationValue < 1) {
                    totSeconds = totSeconds * durationValue;
                }
                secondDuration = secondDuration + totSeconds;
                if (fromEndDate) {
                    sDate.setDate(sDate.getDate() + 1);
                }
                else {
                    sDate.setDate(sDate.getDate() - 1);
                }
                if (!num) {
                    durationValue--;
                }
            }
        }
        return secondDuration;
    };
    /**
     * @param {ITaskData} ganttProp .
     * @param {boolean} isLoad .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.getProjectStartDate = function (ganttProp, isLoad) {
        if (!isNullOrUndefined(this.parent.cloneProjectStartDate)) {
            if (typeof this.parent.cloneProjectStartDate === 'string') {
                this.parent.cloneProjectStartDate = this.getDateFromFormat(this.parent.cloneProjectStartDate);
            }
            var cloneStartDate = this.checkStartDate(this.parent.cloneProjectStartDate);
            this.parent.cloneProjectStartDate = cloneStartDate;
            return new Date(cloneStartDate.getTime());
        }
        else if (!isNullOrUndefined(this.parent.projectStartDate)) {
            var cloneStartDate = this.getDateFromFormat(this.parent.projectStartDate);
            this.parent.cloneProjectStartDate = this.checkStartDate(cloneStartDate);
        }
        else if (!isNullOrUndefined(isLoad)) {
            var flatData = this.parent.flatData;
            var minStartDate = void 0;
            if (flatData.length > 0) {
                minStartDate = flatData[0].ganttProperties.startDate;
            }
            else {
                minStartDate = new Date();
                minStartDate.setHours(0, 0, 0, 0);
            }
            for (var index = 1; index < flatData.length; index++) {
                var startDate = flatData[index].ganttProperties.startDate;
                if (!isNullOrUndefined(startDate) && this.compareDates(startDate, minStartDate) === -1) {
                    minStartDate = startDate;
                }
            }
            this.parent.cloneProjectStartDate = this.checkStartDate(minStartDate, ganttProp);
        }
        else {
            return null;
        }
        return new Date(this.parent.cloneProjectStartDate.getTime());
    };
    /**
     * @param {ITaskData} ganttProp .
     * @param {boolean} isAuto .
     * @param {boolean} isBaseline .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.getValidStartDate = function (ganttProp, isAuto, isBaseline) {
        var sDate = null;
        var startDate = isBaseline ? ganttProp.baselineStartDate : (isAuto ? ganttProp.autoStartDate : ganttProp.startDate);
        var endDate = isBaseline ? ganttProp.baselineEndDate : (isAuto ? ganttProp.autoEndDate : ganttProp.endDate);
        var duration = !ganttProp.isAutoSchedule && ganttProp.autoDuration ? ganttProp.autoDuration : ganttProp.duration;
        if (isNullOrUndefined(startDate)) {
            if (!isNullOrUndefined(endDate)) {
                sDate = new Date(endDate.getTime());
                var dayStartTime = this.parent['getCurrentDayStartTime'](sDate);
                this.setTime(dayStartTime, sDate);
            }
            else if (!isNullOrUndefined(duration)) {
                var ganttTask = this.parent.getTaskByUniqueID(ganttProp.uniqueID);
                if (this.parent.allowUnscheduledTasks && ganttTask &&
                    ganttTask.parentItem && isNullOrUndefined(startDate) && isNullOrUndefined(endDate)) {
                    var parentTask = this.parent.getParentTask(ganttTask.parentItem);
                    while (parentTask && !parentTask.ganttProperties.startDate) {
                        parentTask = this.parent.getParentTask(parentTask.parentItem);
                    }
                    sDate = (!parentTask || !parentTask.ganttProperties.startDate) ? this.parent.cloneProjectStartDate
                        : parentTask.ganttProperties.startDate;
                }
                else {
                    sDate = this.getProjectStartDate(ganttProp);
                }
            }
        }
        else {
            sDate = new Date(startDate.getTime());
        }
        return sDate;
    };
    /**
     *
     * @param {ITaskData} ganttProp .
     * @param {boolean} isAuto .
     * @param {boolean} isBaseline .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.getValidEndDate = function (ganttProp, isAuto, isBaseline) {
        var eDate = null;
        var startDate = isBaseline ? ganttProp.baselineStartDate : (isAuto ? ganttProp.autoStartDate : ganttProp.startDate);
        var endDate = isBaseline ? ganttProp.baselineEndDate : (isAuto ? ganttProp.autoEndDate : ganttProp.endDate);
        var duration = isAuto ? ganttProp.autoDuration : ganttProp.duration;
        if (isNullOrUndefined(endDate)) {
            if (!isNullOrUndefined(startDate)) {
                if (ganttProp.isMilestone) {
                    eDate = this.checkStartDate(startDate);
                }
                else {
                    eDate = new Date(startDate.getTime());
                    var dayEndTime = this.parent['getCurrentDayEndTime'](endDate ? endDate : eDate);
                    this.setTime(dayEndTime, eDate);
                }
            }
            else if (!isNullOrUndefined(duration)) {
                var sDate = this.getValidStartDate(ganttProp);
                if (sDate) {
                    eDate = this.getEndDate(sDate, duration, ganttProp.durationUnit, ganttProp, false);
                }
            }
        }
        else {
            eDate = new Date(endDate.getTime());
        }
        return eDate;
    };
    DateProcessor.prototype.getWorkingTime = function (day, currentRange, startDate, totalSeconds, count, nonWorkingHours, workingTimeRanges, nonWorkingTimeRanges) {
        if (!isNullOrUndefined(currentRange.from) && !isNullOrUndefined(currentRange.to)) {
            startDate.setHours(0, 0, 0, 0);
            var tempDate = new Date(startDate.getTime());
            startDate.setTime(startDate.getTime() + (currentRange.from * 3600000));
            var startHour = new Date(startDate.getTime());
            if (currentRange.to === 24) {
                var currentRangeTo = 24 * 60 * 60 * 1000;
                tempDate.setTime(tempDate.getTime() + (currentRangeTo));
            }
            else {
                tempDate.setTime(tempDate.getTime() + (currentRange.to * 3600000));
            }
            var endHour = new Date(tempDate.getTime());
            var timeDiff = endHour.getTime() - startHour.getTime();
            var sdSeconds = this.getSecondsInDecimal(startHour);
            var edSeconds = this.getSecondsInDecimal(endHour);
            if (edSeconds === 0) {
                edSeconds = 86400;
            }
            totalSeconds += timeDiff / 1000;
            if (count === 0) {
                this.parent.defaultStartTime = sdSeconds;
                if (this.parent.weekWorkingTime.length > 0) {
                    this.assignStartTime(day, sdSeconds);
                }
            }
            if (count === this[day.toLowerCase() + 'TimeRangeLength'] - 1 || day === '') {
                this.parent.defaultEndTime = edSeconds;
                if (this.parent.weekWorkingTime.length > 0) {
                    this.assignEndTime(day, edSeconds);
                }
            }
            if (count > 0) {
                if (day === '') {
                    nonWorkingHours.push(nonWorkingHours[nonWorkingHours.length - 1] +
                        sdSeconds - workingTimeRanges[count - 1].to);
                    if (workingTimeRanges[count - 1].to < sdSeconds) {
                        nonWorkingTimeRanges.push({
                            from: workingTimeRanges[count - 1].to, to: sdSeconds, isWorking: false,
                            interval: (sdSeconds - workingTimeRanges[count - 1].to)
                        });
                    }
                }
                else {
                    this.parent[day.toLowerCase() + 'NonWorkingHours'].push(this.parent[day.toLowerCase() + 'NonWorkingHours'][this.parent[day.toLowerCase() + 'NonWorkingHours'].length - 1] +
                        sdSeconds - this.parent[day.toLowerCase() + 'NonWorkingTimeRanges'][count - 1].to);
                    if (this.parent[day.toLowerCase() + 'WorkingTimeRanges'][count - 1].to < sdSeconds) {
                        this.parent[day.toLowerCase() + 'NonWorkingTimeRanges'].push({
                            from: this.parent[day.toLowerCase() + 'WorkingTimeRanges'][count - 1].to, to: sdSeconds, isWorking: false,
                            interval: (sdSeconds - this.parent[day.toLowerCase() + 'WorkingTimeRanges'][count - 1].to)
                        });
                    }
                }
            }
            else {
                if (day === '') {
                    nonWorkingHours.push(0);
                    nonWorkingTimeRanges.push({ from: 0, to: sdSeconds, isWorking: false, interval: sdSeconds });
                }
                else {
                    this.parent[day.toLowerCase() + 'NonWorkingHours'].push(0);
                    this.parent[day.toLowerCase() + 'NonWorkingTimeRanges'].push({ from: 0, to: sdSeconds, isWorking: false, interval: sdSeconds });
                }
            }
            if (day === '') {
                workingTimeRanges.push({ from: sdSeconds, to: edSeconds });
                nonWorkingTimeRanges.push({
                    from: sdSeconds, to: edSeconds, isWorking: true, interval: (edSeconds - sdSeconds)
                });
            }
            else {
                this.parent[day.toLowerCase() + 'WorkingTimeRanges'].push({ from: sdSeconds, to: edSeconds });
                this.parent[day.toLowerCase() + 'NonWorkingTimeRanges'].push({
                    from: sdSeconds, to: edSeconds, isWorking: true, interval: (edSeconds - sdSeconds)
                });
            }
        }
        return totalSeconds;
    };
    DateProcessor.prototype.assignStartTime = function (day, sdSeconds) {
        switch (day) {
            case 'Monday':
                this.parent.mondayDefaultStartTime = sdSeconds;
                break;
            case 'Tuesday':
                this.parent.tuesdayDefaultStartTime = sdSeconds;
                break;
            case 'Wednesday':
                this.parent.wednesdayDefaultStartTime = sdSeconds;
                break;
            case 'Thursday':
                this.parent.thursdayDefaultStartTime = sdSeconds;
                break;
            case 'Friday':
                this.parent.fridayDefaultStartTime = sdSeconds;
                break;
            case 'Saturday':
                this.parent.saturdayDefaultStartTime = sdSeconds;
                break;
            case 'Sunday':
                this.parent.sundayDefaultStartTime = sdSeconds;
                break;
            default:
                break;
        }
    };
    DateProcessor.prototype.assignEndTime = function (day, edSeconds) {
        switch (day) {
            case 'Monday':
                this.parent.mondayDefaultEndTime = edSeconds;
                break;
            case 'Tuesday':
                this.parent.tuesdayDefaultEndTime = edSeconds;
                break;
            case 'Wednesday':
                this.parent.wednesdayDefaultEndTime = edSeconds;
                break;
            case 'Thursday':
                this.parent.thursdayDefaultEndTime = edSeconds;
                break;
            case 'Friday':
                this.parent.fridayDefaultEndTime = edSeconds;
                break;
            case 'Saturday':
                this.parent.saturdayDefaultEndTime = edSeconds;
                break;
            case 'Sunday':
                this.parent.sundayDefaultEndTime = edSeconds;
                break;
            default:
                break;
        }
    };
    DateProcessor.prototype.calculateWeekWorkTime = function (day, currentDay, startDate, totalSeconds, nonWorkingHours, workingTimeRanges, nonWorkingTimeRanges) {
        var seconds = 0;
        for (var j = 0; j < currentDay.length; j++) {
            var currentRange = currentDay[j];
            seconds = seconds + this.getWorkingTime(day, currentRange, startDate, totalSeconds, j, nonWorkingHours, workingTimeRanges, nonWorkingTimeRanges);
        }
        if (this.parent[day.toLowerCase() + 'DefaultStartTime'] / 3600 !== 24) {
            this.parent[day.toLowerCase() + 'NonWorkingTimeRanges'].push({
                from: this.parent[day.toLowerCase() + 'DefaultEndTime'], to: 86400,
                isWorking: false, interval: 86400 - this.parent[day.toLowerCase() + 'DefaultEndTime']
            });
        }
        return seconds;
    };
    /**
     * @returns {number} .
     * @private
     */
    DateProcessor.prototype.getSecondsPerDay = function () {
        var totalSeconds = 0;
        var startDate = new Date('10/11/2018');
        this.parent.nonWorkingHours = [];
        var nonWorkingHours = this.parent.nonWorkingHours;
        this.parent.workingTimeRanges = [];
        var workingTimeRanges = this.parent.workingTimeRanges;
        this.parent.nonWorkingTimeRanges = [];
        var nonWorkingTimeRanges = this.parent.nonWorkingTimeRanges;
        var dayWorkingTime = this.parent.calendarModule.workingTime;
        for (var _i = 0, _a = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; _i < _a.length; _i++) {
            var day = _a[_i];
            this[day.toLowerCase() + "TimeRangeLength"] = dayWorkingTime.length;
        }
        if (this.parent.weekWorkingTime.length > 0) {
            for (var i = 0; i < this.parent.weekWorkingTime.length; i++) {
                this[this.parent.weekWorkingTime[i].dayOfWeek.toLowerCase() + 'TimeRangeLength']
                    = this.parent.weekWorkingTime[i].timeRange.length;
            }
            var weekWorkingTime = this.parent.weekWorkingTime;
            for (var _b = 0, weekWorkingTime_1 = weekWorkingTime; _b < weekWorkingTime_1.length; _b++) {
                var weekDay = weekWorkingTime_1[_b];
                if (weekDay.timeRange && weekDay.timeRange.length > 0) {
                    this.parent[weekDay.dayOfWeek.toLowerCase() + 'NonWorkingHours'] = [];
                    this.parent[weekDay.dayOfWeek.toLowerCase() + 'NonWorkingTimeRanges'] = [];
                    this.parent[weekDay.dayOfWeek.toLowerCase() + 'WorkingTimeRanges'] = [];
                    var seconds_1 = this.calculateWeekWorkTime(weekDay.dayOfWeek, weekDay.timeRange, startDate, totalSeconds, nonWorkingHours, workingTimeRanges, nonWorkingTimeRanges);
                    this.parent[weekDay.dayOfWeek.toLowerCase() + "Seconds"] = seconds_1;
                }
            }
            for (var _c = 0, _d = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; _c < _d.length; _c++) {
                var day = _d[_c];
                var dayDefaultStartTime = this.parent[day.toLowerCase() + "DefaultStartTime"];
                if (isNullOrUndefined(dayDefaultStartTime)) {
                    var seconds_2 = this.calculateWeekWorkTime(day, dayWorkingTime, startDate, totalSeconds, nonWorkingHours, workingTimeRanges, nonWorkingTimeRanges);
                    this.parent[day.toLowerCase() + "Seconds"] = seconds_2;
                }
            }
        }
        var length = dayWorkingTime.length;
        var seconds = 0;
        for (var count = 0; count < length; count++) {
            var currentRange = dayWorkingTime[count];
            seconds = seconds + this.getWorkingTime('', currentRange, startDate, totalSeconds, count, nonWorkingHours, workingTimeRanges, nonWorkingTimeRanges);
        }
        if (this.parent.defaultEndTime / 3600 !== 24) {
            nonWorkingTimeRanges.push({
                from: this.parent.defaultEndTime, to: 86400,
                isWorking: false, interval: 86400 - this.parent.defaultEndTime
            });
        }
        totalSeconds = seconds;
        return totalSeconds;
    };
    /**
     *
     * @param {string} value .
     * @returns {object} .
     * @private
     */
    // eslint-disable-next-line
    DateProcessor.prototype.getDurationValue = function (value) {
        var durationUnit = null;
        var duration = null;
        if (typeof value === 'string') {
            var values = value.match(/(\d*\.*\d+|.+$)/g);
            if (values && values.length <= 2) {
                duration = parseFloat(values[0].toString().trim());
                var unit = values[1] ? values[1].toString().trim().toLowerCase() : null;
                if (getValue('minute', this.parent.durationUnitEditText).indexOf(unit) !== -1) {
                    durationUnit = 'minute';
                }
                else if (getValue('hour', this.parent.durationUnitEditText).indexOf(unit) !== -1) {
                    durationUnit = 'hour';
                }
                else if (getValue('day', this.parent.durationUnitEditText).indexOf(unit) !== -1) {
                    durationUnit = 'day';
                }
            }
        }
        else {
            duration = value;
            durationUnit = null;
        }
        var output = {
            duration: duration,
            durationUnit: durationUnit
        };
        return output;
    };
    /**
     *
     * @param {Date} date .
     * @param {CalendarContext} calendarContext .
     * @returns {Date} .
     */
    DateProcessor.prototype.getNextWorkingDay = function (date, calendarContext) {
        if (calendarContext) {
            var override = calendarContext.getExceptionForDate(date);
            if (override) {
                return date;
            }
        }
        var dayIndex = date.getDay();
        if (this.parent.nonWorkingDayIndex.indexOf(dayIndex) !== -1) {
            date.setDate(date.getDate() + 1);
            date = this.getNextWorkingDay(date, calendarContext);
            return date;
        }
        else {
            return date;
        }
    };
    /**
     * get weekend days between two dates without including args dates
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {CalendarContext} calendarContext .
     * @returns {number} .
     */
    DateProcessor.prototype.getWeekendCount = function (startDate, endDate, calendarContext) {
        var weekendCount = 0;
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        sDate.setHours(0, 0, 0, 0);
        sDate.setDate(sDate.getDate() + 1);
        eDate.setHours(0, 0, 0, 0);
        while (sDate.getTime() < eDate.getTime()) {
            if (this.parent.nonWorkingDayIndex.indexOf(sDate.getDay()) !== -1) {
                if (!calendarContext.getExceptionForDate(sDate)) {
                    weekendCount += 1;
                }
            }
            sDate.setDate(sDate.getDate() + 1);
        }
        return weekendCount;
    };
    /**
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {boolean} isCheckTimeZone .
     * @returns {number} .
     */
    DateProcessor.prototype.getNumberOfSeconds = function (startDate, endDate, isCheckTimeZone) {
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        var timeDiff = 0;
        sDate.setDate(sDate.getDate() + 1);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(0, 0, 0, 0);
        if (sDate.getTime() < eDate.getTime()) {
            timeDiff = (this.getTimeDifference(sDate, eDate, isCheckTimeZone)) / 1000;
        }
        if (timeDiff % 86400 !== 0) {
            timeDiff = timeDiff - (timeDiff % 86400) + 86400;
        }
        return timeDiff;
    };
    /**
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {CalendarContext} calendarContext .
     * @returns {number} .
     */
    DateProcessor.prototype.getHolidaysCount = function (startDate, endDate, calendarContext) {
        var holidaysCount = 0;
        var holidays = calendarContext.defaultHolidays;
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        sDate.setDate(sDate.getDate() + 1);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(0, 0, 0, 0);
        if (sDate.getTime() < eDate.getTime()) {
            for (var i = 0; i < holidays.length; i++) {
                var currentHoliday = this.getDateFromFormat(new Date(holidays[i]));
                if (sDate.getTime() <= currentHoliday.getTime() && eDate.getTime() > currentHoliday.getTime()) {
                    if (!calendarContext.getExceptionForDate(currentHoliday)) {
                        if ((!this.parent.includeWeekend && this.parent.nonWorkingDayIndex.indexOf(currentHoliday.getDay()) === -1) ||
                            this.parent.includeWeekend) {
                            holidaysCount += 1;
                        }
                    }
                }
            }
        }
        return holidaysCount;
    };
    /**
     * @param {string} props .
     * @returns {number[]} .
     * @private
     */
    DateProcessor.prototype.getHolidayDates = function (props) {
        if (props === 'holidays') {
            this.parent.calendarModule.holidays = this.parent.holidays;
        }
        else if (props === 'calendarSettings') {
            this.parent.calendarModule.holidays = this.parent.calendarSettings.projectCalendar.holidays;
        }
        var holidays = this.parent.calendarModule.holidays;
        var holidayDates = [];
        for (var i = 0; i < holidays.length; i++) {
            var from = this.getDateFromFormat(holidays[i].from);
            var to = this.getDateFromFormat(holidays[i].to);
            if (isNullOrUndefined(from) && isNullOrUndefined(to)) {
                continue;
            }
            else if (isNullOrUndefined(from) || isNullOrUndefined(to)) {
                var tempDate = from ? from : to;
                tempDate.setHours(0, 0, 0, 0);
                if (holidayDates.indexOf(tempDate.getTime()) === -1) {
                    holidayDates.push(tempDate.getTime());
                }
            }
            else {
                while (from <= to) {
                    from.setHours(0, 0, 0, 0);
                    if (holidayDates.indexOf(from.getTime()) === -1) {
                        holidayDates.push(from.getTime());
                    }
                    from.setDate(from.getDate() + 1);
                }
            }
        }
        return holidayDates;
    };
    /**
     * @param {Date} date .
     * @param {boolean} checkWeekEnd .
     * @param {CalendarContext} calendarContext .
     * @returns {boolean} .
     * @private
     */
    /*Check given date is on holidays*/
    DateProcessor.prototype.isOnHolidayOrWeekEnd = function (date, checkWeekEnd, calendarContext) {
        var parent = this.parent;
        checkWeekEnd = !isNullOrUndefined(checkWeekEnd) ? checkWeekEnd : parent.includeWeekend;
        if (!parent.autoCalculateDateScheduling &&
            !(parent.isLoad && parent.treeGrid.loadChildOnDemand && parent.taskFields.hasChildMapping)) {
            checkWeekEnd = true;
        }
        if (calendarContext.getExceptionForDate(date)) {
            return false;
        }
        if (!checkWeekEnd && this.parent.nonWorkingDayIndex.indexOf(date.getDay()) !== -1) {
            return true;
        }
        var holidays = calendarContext.defaultHolidays;
        if (!holidays || holidays.length === 0) {
            return false;
        }
        var dateTime = date.getTime();
        for (var i = 0; i < holidays.length; i++) {
            var holidayDate = this.getDateFromFormat(new Date(holidays[i]));
            var holidayStart = holidayDate.setHours(0, 0, 0, 0);
            var holidayEnd = holidayDate.setHours(23, 59, 59, 999);
            if (dateTime >= holidayStart && dateTime <= holidayEnd) {
                return true;
            }
        }
        return false;
    };
    /**
     * To calculate non working times in given date
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {boolean} isAutoSchedule .
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @param {CalendarContext} calendarContext .
     * @param {boolean} ignoreAutoSchedule - Indicates whether the calculation is specific to baseline dates.
     * @returns {number} .
     */
    DateProcessor.prototype.getNonWorkingSecondsOnDate = function (startDate, endDate, isAutoSchedule, isBaseline, calendarContext, ignoreAutoSchedule) {
        var sHour = this.getSecondsInDecimal(startDate);
        var eHour = this.getSecondsInDecimal(endDate);
        var startRangeIndex = -1;
        var endRangeIndex = -1;
        var totNonWrkSecs = 0;
        var startOnHoliday = (isAutoSchedule && this.parent.autoCalculateDateScheduling &&
            !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) && !isBaseline ? this.isOnHolidayOrWeekEnd(startDate, null, calendarContext) : false;
        var endOnHoliday = (isAutoSchedule && this.parent.autoCalculateDateScheduling &&
            !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) && !isBaseline ? this.isOnHolidayOrWeekEnd(endDate, null, calendarContext) : false;
        var startnonWorkingTimeRange;
        var endnonWorkingTimeRange;
        if (this.parent.weekWorkingTime.length > 0) {
            startnonWorkingTimeRange = this.parent['getNonWorkingRange'](startDate);
            for (var i = 0; i < startnonWorkingTimeRange.length; i++) {
                var val = startnonWorkingTimeRange[i];
                if (sHour >= val.from && sHour <= val.to) {
                    startRangeIndex = i;
                }
            }
            endnonWorkingTimeRange = this.parent['getNonWorkingRange'](endDate);
            for (var i = 0; i < endnonWorkingTimeRange.length; i++) {
                var val = endnonWorkingTimeRange[i];
                if (eHour >= val.from && eHour <= val.to) {
                    endRangeIndex = i;
                }
            }
        }
        else {
            startnonWorkingTimeRange = this.parent.nonWorkingTimeRanges;
            endnonWorkingTimeRange = this.parent.nonWorkingTimeRanges;
            for (var i = 0; i < startnonWorkingTimeRange.length; i++) {
                var val = startnonWorkingTimeRange[i];
                if (sHour >= val.from && sHour <= val.to) {
                    startRangeIndex = i;
                }
                if (eHour >= val.from && eHour <= val.to) {
                    endRangeIndex = i;
                }
            }
        }
        if (startDate.getDate() !== endDate.getDate() || startDate.getMonth() !== endDate.getMonth() ||
            startDate.getFullYear() !== endDate.getFullYear()) {
            if (!startOnHoliday || ignoreAutoSchedule) {
                for (var i = startRangeIndex; i < startnonWorkingTimeRange.length; i++) {
                    if (!isNullOrUndefined(startnonWorkingTimeRange[i]) && !startnonWorkingTimeRange[i].isWorking) {
                        if (i === startRangeIndex) {
                            totNonWrkSecs += (startnonWorkingTimeRange[i].to - sHour);
                        }
                        else {
                            totNonWrkSecs += (startnonWorkingTimeRange[i].interval);
                        }
                    }
                }
            }
            else {
                totNonWrkSecs += (86400 - sHour);
            }
            if (!endOnHoliday || ignoreAutoSchedule) {
                for (var i = 0; i <= endRangeIndex; i++) {
                    if (!endnonWorkingTimeRange[i].isWorking) {
                        if (i === endRangeIndex) {
                            totNonWrkSecs += (eHour - endnonWorkingTimeRange[i].from);
                        }
                        else {
                            totNonWrkSecs += endnonWorkingTimeRange[i].interval;
                        }
                    }
                }
            }
            else {
                totNonWrkSecs += eHour;
            }
        }
        else {
            if (startRangeIndex !== endRangeIndex) {
                if (!endOnHoliday || ignoreAutoSchedule) {
                    for (var i = startRangeIndex; i <= endRangeIndex; i++) {
                        if (!isNullOrUndefined(startnonWorkingTimeRange[i]) && !startnonWorkingTimeRange[i].isWorking) {
                            if (i === startRangeIndex) {
                                totNonWrkSecs += (startnonWorkingTimeRange[i].to - sHour);
                            }
                            else if (i === endRangeIndex) {
                                totNonWrkSecs += (eHour - startnonWorkingTimeRange[i].from);
                            }
                            else {
                                totNonWrkSecs += startnonWorkingTimeRange[i].interval;
                            }
                        }
                    }
                }
                else {
                    totNonWrkSecs += (eHour - sHour);
                }
            }
            else {
                if (!endOnHoliday || ignoreAutoSchedule) {
                    var range = startnonWorkingTimeRange[startRangeIndex];
                    if (!range.isWorking) {
                        totNonWrkSecs = eHour - sHour;
                    }
                }
                else {
                    totNonWrkSecs += (eHour - sHour);
                }
            }
        }
        return totNonWrkSecs;
    };
    /**
     *
     * @param {Date} date .
     * @param {CalendarContext} calendarContext .
     * @returns {Date} .
     */
    DateProcessor.prototype.getPreviousWorkingDay = function (date, calendarContext) {
        if (calendarContext) {
            var override = calendarContext.getExceptionForDate(date);
            if (override) {
                return date;
            }
        }
        var dayIndex = date.getDay();
        var previousIndex = (dayIndex === 0) ? 6 : dayIndex - 1;
        var dayEndTime = this.parent['getCurrentDayEndTime'](date);
        if (this.parent.nonWorkingDayIndex.indexOf(dayIndex) !== -1 || (this.parent.nonWorkingDayIndex.indexOf(previousIndex) !== -1
            && dayEndTime !== 86400 && this.getSecondsInDecimal(date) === 0)) {
            date.setDate(date.getDate() - 1);
            if (this.parent.nonWorkingDayIndex.indexOf(date.getDay()) !== -1) {
                date = this.getPreviousWorkingDay(date, calendarContext);
            }
            return date;
        }
        else {
            return date;
        }
    };
    /**
     * To get non-working day indexes.
     *
     * @returns {void} .
     * @private
     */
    DateProcessor.prototype.getNonWorkingDayIndex = function () {
        var weekDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var weekDayLength = weekDay.length;
        if (this.parent.workWeek.length === 0) {
            this.parent.workWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        }
        var workWeek = this.parent.workWeek.slice();
        var length = workWeek.length;
        for (var i = 0; i < length; i++) {
            workWeek[i] = workWeek[i].toLowerCase();
        }
        this.parent.nonWorkingDayIndex = [];
        for (var i = 0; i < weekDayLength; i++) {
            if (workWeek.indexOf(weekDay[i]) === -1) {
                this.parent.nonWorkingDayIndex.push(i);
            }
        }
    };
    /**
     *
     * @param {number} seconds .
     * @param {Date} date .
     * @returns {void} .
     * @private
     */
    DateProcessor.prototype.setTime = function (seconds, date) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var hour = seconds / 3600;
        hour = parseInt(hour, 10);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var min = (seconds - (hour * 3600)) / 60;
        min = parseInt(min, 10);
        var sec = seconds - (hour * 3600) - (min * 60);
        date.setHours(hour, min, sec);
    };
    /**
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {boolean} isCheckTimeZone .
     * @returns {number} .
     */
    DateProcessor.prototype.getTimeDifference = function (startDate, endDate, isCheckTimeZone) {
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        if (isCheckTimeZone) {
            this.updateDateWithTimeZone(sDate, eDate);
        }
        return eDate.getTime() - sDate.getTime();
    };
    /**
     * @param {Date} sDate .
     * @param {Date} eDate .
     * @returns {void} .
     */
    DateProcessor.prototype.updateDateWithTimeZone = function (sDate, eDate) {
        var sTZ = sDate.getTimezoneOffset();
        var eTZ = eDate.getTimezoneOffset();
        var uTZ;
        var uDate;
        if (sTZ !== eTZ) {
            var standardTZ = new Date(new Date().getFullYear(), 0, 1).getTimezoneOffset();
            if (standardTZ !== sTZ) {
                uDate = sDate;
                uTZ = sTZ;
            }
            else if (standardTZ !== eTZ) {
                uDate = eDate;
                uTZ = eTZ;
            }
            if (standardTZ < 0) {
                var tzDiff = standardTZ - uTZ;
                uDate.setTime(uDate.getTime() + (tzDiff * 60 * 1000));
            }
            else if (standardTZ >= 0) {
                var tzDiff = uTZ - standardTZ;
                uDate.setTime(uDate.getTime() - (tzDiff * 60 * 1000));
            }
        }
    };
    /**
     *
     * @param {Date} date .
     * @returns {number} .
     */
    DateProcessor.prototype.getSecondsInDecimal = function (date) {
        return (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds() + (date.getMilliseconds() / 1000);
    };
    /**
     * @param {Date} date .
     * @param {number} localOffset .
     * @param {string} timezone .
     * @returns {number} .
     * @private
     */
    DateProcessor.prototype.offset = function (date, timezone) {
        var localOffset = date.getTimezoneOffset();
        try {
            var convertedDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
            if (!isNaN(convertedDate.getTime())) {
                return ((date.getTime() - convertedDate.getTime()) / 60000) + localOffset;
            }
            return 0;
        }
        catch (error) {
            return 0;
        }
    };
    DateProcessor.prototype.remove = function (date, timezone) {
        if (!isNullOrUndefined(date)) {
            date = this.reverse(date, timezone, date.getTimezoneOffset());
        }
        return date;
    };
    DateProcessor.prototype.reverse = function (date, fromOffset, toOffset) {
        if (typeof fromOffset === 'string') {
            fromOffset = this.offset(date, fromOffset);
        }
        if (typeof toOffset === 'string') {
            toOffset = this.offset(date, toOffset);
        }
        var fromLocalOffset = date.getTimezoneOffset();
        date = new Date(date.getTime() + (fromOffset - toOffset) * 60000);
        var toLocalOffset = date.getTimezoneOffset();
        return new Date(date.getTime() + (toLocalOffset - fromLocalOffset) * 60000);
    };
    /**
     * @param {Date} date .
     * @param {string} timezone .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.convert = function (date, timezone) {
        var fromOffset = date.getTimezoneOffset();
        var toOffset = this.offset(date, timezone);
        if (typeof fromOffset === 'string') {
            fromOffset = this.offset(date, fromOffset);
        }
        if (typeof toOffset === 'string') {
            toOffset = this.offset(date, toOffset);
        }
        var fromLocalOffset = date.getTimezoneOffset();
        date = new Date(date.getTime() + (fromOffset - toOffset) * 60000);
        var toLocalOffset = date.getTimezoneOffset();
        return new Date(date.getTime() + (toLocalOffset - fromLocalOffset) * 60000);
    };
    /**
     * @param {string | Date} date .
     * @param {boolean} toConvert .
     * @returns {Date} .
     * @private
     */
    DateProcessor.prototype.getDateFromFormat = function (date, toConvert) {
        var updatedDate;
        if (isNullOrUndefined(date)) {
            return null;
        }
        else if (date instanceof Date) {
            updatedDate = new Date(date.getTime());
        }
        else {
            var dateObject = this.parent.globalize.parseDate(date, { format: this.parent.getDateFormat(), type: 'dateTime' });
            updatedDate = isNullOrUndefined(dateObject) && !isNaN(new Date(date).getTime()) ? new Date(date) : dateObject;
        }
        var updateTimezone = this.parent.isOnAdded ? false : true;
        if (!isNullOrUndefined(this.parent.timezone) && toConvert && ((updateTimezone && this.parent.timezone) || this.parent.isLoad)) {
            var convertedDate = this.convert(updatedDate, this.parent.timezone);
            return convertedDate;
        }
        else {
            return updatedDate;
        }
    };
    /**
     * @param {Date} date1 .
     * @param {Date} date2 .
     * @returns {number} .
     * @private
     */
    DateProcessor.prototype.compareDates = function (date1, date2) {
        if (!isNullOrUndefined(date1) && !isNullOrUndefined(date2)) {
            return (date1.getTime() > date2.getTime()) ? 1 : (date1.getTime() < date2.getTime()) ? -1 : 0;
        }
        else if (!isNullOrUndefined(date1) && isNullOrUndefined(date2)) {
            return 1;
        }
        else if (isNullOrUndefined(date1) && !isNullOrUndefined(date2)) {
            return -1;
        }
        else {
            return null;
        }
    };
    /**
     *
     * @param {number} duration .
     * @param {string} durationUnit .
     * @returns {string} .
     * @private
     */
    DateProcessor.prototype.getDurationString = function (duration, durationUnit) {
        var value = '';
        if (!isNullOrUndefined(duration)) {
            value += parseFloat(duration.toFixed(2)) + ' ';
            if (!isNullOrUndefined(durationUnit)) {
                var plural = duration !== 1;
                if (durationUnit === 'day') {
                    value += plural ? this.parent.localeObj.getConstant('days') : this.parent.localeObj.getConstant('day');
                }
                else if (durationUnit === 'hour') {
                    value += plural ? this.parent.localeObj.getConstant('hours') : this.parent.localeObj.getConstant('hour');
                }
                else if (durationUnit === 'minute') {
                    value += plural ? this.parent.localeObj.getConstant('minutes') :
                        this.parent.localeObj.getConstant('minute');
                }
            }
        }
        return value;
    };
    /**
     * Method to get work with value and unit.
     *
     * @param {number} work .
     * @param {string} workUnit .
     * @returns {string} .
     * @private
     */
    DateProcessor.prototype.getWorkString = function (work, workUnit) {
        var value = '';
        if (!isNullOrUndefined(work)) {
            value += parseFloat(work).toFixed(2) + ' ';
            if (!isNullOrUndefined(workUnit)) {
                var plural = work !== 1;
                if (workUnit === 'day') {
                    value += plural ? this.parent.localeObj.getConstant('days') : this.parent.localeObj.getConstant('day');
                }
                else if (workUnit === 'hour') {
                    value += plural ? this.parent.localeObj.getConstant('hours') : this.parent.localeObj.getConstant('hour');
                }
                else if (workUnit === 'minute') {
                    value += plural ? this.parent.localeObj.getConstant('minutes') :
                        this.parent.localeObj.getConstant('minute');
                }
            }
        }
        return value;
    };
    /**
     *
     * @param {object} editArgs .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    DateProcessor.prototype.calculateProjectDatesForValidatedTasks = function (editArgs) {
        var _this = this;
        var projectStartDate = typeof this.parent.projectStartDate === 'string' ?
            new Date(this.parent.projectStartDate) : this.parent.projectStartDate;
        var projectEndDate = typeof this.parent.projectEndDate === 'string' ?
            new Date(this.parent.projectEndDate) : this.parent.projectEndDate;
        var minStartDate = null;
        var maxEndDate = null;
        var flatData = (getValue('dataOperation.dataArray', this.parent));
        if ((!projectStartDate || !projectEndDate) && (flatData && flatData.length === 0)) {
            minStartDate = this.getDateFromFormat(new Date());
            maxEndDate = this.getDateFromFormat(new Date(minStartDate.getTime()));
        }
        else if (flatData.length > 0) {
            var sortedStartDate = flatData.slice().sort(function (a, b) {
                return ((new Date(a[_this.parent.taskFields.startDate])).getTime() -
                    (new Date(b[_this.parent.taskFields.startDate])).getTime());
            });
            var sortedEndDate = flatData.slice().sort(function (a, b) {
                return ((new Date(b[_this.parent.taskFields.endDate])).getTime() - (new Date(a[_this.parent.taskFields.endDate])).getTime());
            });
            minStartDate = sortedStartDate[0][this.parent.taskFields.startDate];
            maxEndDate = sortedEndDate[sortedEndDate.length - 1][this.parent.taskFields.endDate];
        }
        this.parent.cloneProjectStartDate = projectStartDate ? new Date(projectStartDate.getTime()) :
            typeof minStartDate === 'string' ? new Date(minStartDate) : minStartDate;
        this.parent.cloneProjectEndDate = projectEndDate ? new Date(projectEndDate.getTime()) :
            typeof maxEndDate === 'string' ? new Date(maxEndDate) : maxEndDate;
    };
    /**
     *
     * @param {object} editArgs .
     * @returns {void} .
     * @private
     */
    DateProcessor.prototype.calculateProjectDates = function (editArgs) {
        var _this = this;
        if (this.parent.isLoad && this.parent.enablePersistence) {
            if (this.parent.cloneProjectStartDate && this.parent.cloneProjectEndDate) {
                this.parent.cloneProjectStartDate = this.getDateFromFormat(this.parent.cloneProjectStartDate);
                this.parent.cloneProjectEndDate = this.getDateFromFormat(this.parent.cloneProjectEndDate);
                return;
            }
            if (this.parent.cloneTimelineStartDate && this.parent.cloneTimelineEndDate) {
                this.parent.cloneTimelineStartDate = this.getDateFromFormat(this.parent.cloneTimelineStartDate);
                this.parent.cloneTimelineEndDate = this.getDateFromFormat(this.parent.cloneTimelineEndDate);
                return;
            }
        }
        // Utility to safely convert string/Date/null to Date or null
        var toDate = function (date) {
            return date == null || (typeof date === 'string' && date.toLowerCase() === 'auto')
                ? null
                : (typeof date === 'string' ? new Date(date) : date);
        };
        // Utility to resolve the correct date for project/timeline, considering zooming and clone values
        var resolveDate = function (cloneDate, propDate) {
            return _this.getDateFromFormat(_this.parent.timelineModule.isZooming && cloneDate ? cloneDate : propDate);
        };
        var sDate = toDate(this.parent.projectStartDate);
        var eDate = toDate(this.parent.projectEndDate);
        var tSDate = toDate(this.parent.timelineSettings.viewStartDate);
        var tEDate = toDate(this.parent.timelineSettings.viewEndDate);
        var projectStartDate = resolveDate(this.parent.cloneProjectStartDate, sDate);
        var projectEndDate = resolveDate(this.parent.cloneProjectEndDate, eDate);
        var timelineStartDate = resolveDate(this.parent.cloneTimelineStartDate, tSDate);
        var timelineEndDate = resolveDate(this.parent.cloneTimelineEndDate, tEDate);
        var minStartDate = null;
        var maxEndDate = null;
        var flatData = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var taskRange = [];
        var addDateToList = function (date) {
            if (!isNullOrUndefined(date)) {
                taskRange.push(date);
            }
        };
        var sortDates = function (dates) {
            if (dates.length > 0) {
                dates.sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
                minStartDate = new Date(dates[0].getTime());
                maxEndDate = dates.length > 1 ? new Date(dates[dates.length - 1].getTime()) : null;
            }
        };
        if ((flatData.length > 0) || editArgs || this.parent.timelineModule.isZoomToFit) {
            var viewData = void 0;
            if (currentViewData.length > 0 && this.parent.timelineModule.isZoomToFit &&
                this.parent.treeGrid.filterModule &&
                this.parent.treeGrid.filterModule.filteredResult.length > 0) {
                viewData = currentViewData;
            }
            else {
                viewData = flatData;
            }
            viewData.forEach(function (data) {
                taskRange = [];
                var task = data.ganttProperties;
                var tempStartDate;
                var tempEndDate;
                if (isNullOrUndefined(task.startDate) && isNullOrUndefined(task.endDate)) {
                    tempStartDate = null;
                    tempEndDate = null;
                }
                else {
                    tempStartDate = _this.getValidStartDate(task);
                    tempEndDate = _this.getValidEndDate(task);
                }
                addDateToList(minStartDate);
                addDateToList(maxEndDate);
                addDateToList(tempStartDate);
                addDateToList(tempEndDate);
                if (_this.parent.renderBaseline && !_this.parent.timelineModule.isZoomToFit) {
                    addDateToList(task.baselineStartDate);
                    addDateToList(task.baselineEndDate);
                }
                if (task.indicators && task.indicators.length > 0 && !_this.parent.timelineModule.isZoomToFit) {
                    task.indicators.forEach(function (item) {
                        addDateToList(_this.getDateFromFormat(item.date));
                    });
                }
                sortDates(taskRange);
            });
            taskRange = [];
            addDateToList(minStartDate);
            addDateToList(maxEndDate);
            //update schedule dates as per holiday and strip line collection
            if (this.parent.eventMarkers.length > 0 && !this.parent.timelineModule.isZoomToFit) {
                var eventMarkers = this.parent.eventMarkers;
                // eslint-disable-next-line
                eventMarkers.forEach(function (marker, index) {
                    addDateToList(_this.getDateFromFormat(marker.day));
                });
            }
            if (this.parent.defaultCalendarContext.defaultHolidays.length > 0 && !this.parent.timelineModule.isZoomToFit) {
                var holidays = this.parent.defaultCalendarContext.defaultHolidays;
                // eslint-disable-next-line
                holidays.forEach(function (holiday, index) {
                    addDateToList(new Date(holiday));
                });
            }
            sortDates(taskRange);
            if (!minStartDate || !maxEndDate) {
                if (!minStartDate) {
                    minStartDate = isNullOrUndefined(minStartDate) ? this.getDateFromFormat(new Date()) : minStartDate;
                    minStartDate.setHours(0, 0, 0, 0);
                }
                else {
                    minStartDate = isNullOrUndefined(minStartDate) ? this.getDateFromFormat(new Date()) : minStartDate;
                }
                maxEndDate = this.getDateFromFormat(new Date(minStartDate.getTime()));
                maxEndDate.setDate(maxEndDate.getDate() + 20);
            }
        }
        else if (flatData.length === 0) {
            if (tSDate && !eDate) {
                minStartDate = this.getDateFromFormat(tSDate);
                maxEndDate = this.getDateFromFormat(new Date(minStartDate.getTime()));
            }
            else {
                minStartDate = this.getDateFromFormat(new Date());
                maxEndDate = this.getDateFromFormat(new Date(minStartDate.getTime()));
            }
        }
        if (!editArgs) {
            var getClonedDate = function (zoomToFit, date, fallback) { return !zoomToFit
                ? (!isNullOrUndefined(date) ? new Date(date.getTime()) : fallback)
                : fallback; };
            this.prevProjectStartDate = this.parent.cloneProjectStartDate;
            var isZoomToFit = this.parent.timelineModule.isZoomToFit;
            this.parent.cloneProjectStartDate = getClonedDate(isZoomToFit, projectStartDate, minStartDate);
            this.parent.cloneProjectEndDate = getClonedDate(isZoomToFit, projectEndDate, maxEndDate);
            this.parent.cloneTimelineStartDate = getClonedDate(isZoomToFit, timelineStartDate, minStartDate);
            this.parent.cloneTimelineEndDate = this.parent.timelineSettings.viewStartDate !== 'auto' && this.parent.timelineSettings.viewEndDate === 'auto' ?
                this.parent.cloneProjectEndDate : getClonedDate(isZoomToFit, timelineEndDate, maxEndDate);
            if ((isNullOrUndefined(this.parent.projectEndDate) && this.parent.timelineSettings.viewEndDate === 'auto') ||
                (this.parent.timelineSettings.viewStartDate !== 'auto' && this.parent.timelineSettings.viewEndDate === 'auto')) {
                this.parent.timelineModule.adjustEndDateToFillChart(false);
            }
        }
        else {
            setValue('minStartDate', minStartDate, editArgs);
            setValue('maxEndDate', maxEndDate, editArgs);
        }
        this.parent['isProjectDateUpdated'] = true;
    };
    /**
     *
     * @param {ITaskSegment} segments .
     * @returns {number} .
     * @private
     */
    DateProcessor.prototype.splitTasksDuration = function (segments) {
        var duration = 0;
        var sDate = segments[0].startDate;
        var eDate = segments[segments.length - 1].endDate;
        if (this.parent.timelineModule.bottomTier === 'Hour') {
            duration += Math.ceil(this.getTimeDifference(sDate, eDate) / (1000 * 60 * 60));
        }
        else if (this.parent.timelineModule.bottomTier === 'Minutes') {
            duration += Math.ceil(this.getTimeDifference(sDate, eDate) / (1000 * 60));
        }
        else {
            duration += Math.ceil(this.getTimeDifference(sDate, eDate) / (1000 * 60 * 60 * 24));
        }
        return duration;
    };
    return DateProcessor;
}());
export { DateProcessor };
