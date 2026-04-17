import { IGanttData, ITaskData, IParent, IWorkTimelineRanges, ITaskSegment } from './interface';
import { DataManager } from '@syncfusion/ej2-data';
import { Gantt } from './gantt';
import { DateProcessor } from './date-processor';
import { CalendarContext } from './calendar-context';
/**
 * To calculate and update task related values
 */
export declare class TaskProcessor extends DateProcessor {
    recordIndex: number;
    dataArray: Object[];
    taskIds: {
        [key: string]: number;
    };
    private segmentCollection;
    private hierarchyData;
    isResourceString: boolean;
    private customSegmentProperties;
    private processedParentItems;
    private systemTimeZone;
    private isBaseline;
    private uid;
    private isTaskIDInteger;
    private cache;
    private offsetUpdateParentList;
    private validatedGanttData;
    constructor(parent: Gantt);
    private addEventListener;
    /**
     * @param {boolean} isChange .
     * @returns {void} .
     * @private
     */
    checkDataBinding(isChange?: boolean): void;
    private processTimeline;
    private initDataSource;
    private constructDataSource;
    cloneDataSource(): void;
    /**
     * @param {object[]} resources .
     * @param {object[]} data .
     * @param {object[]} unassignedTasks .
     * @returns {void} .
     *
     */
    private constructResourceViewDataSource;
    /**
     * Function to manipulate data-source
     *
     * @param {object[]} data .
     * @returns {void} .
     * @hidden
     */
    private prepareDataSource;
    private calculateSharedTaskUniqueIds;
    /**
     * Appends a Gantt record to the end of the flatData array and updates the flatDataMap.
     * @param {IGanttData} ganttData - The Gantt data record to append, containing ganttProperties with a rowUniqueID.
     * @returns {void}.
     * @private
     */
    appendGanttRecord(ganttData: IGanttData): void;
    private prepareRecordCollection;
    /**
     * Method to update custom field values in gantt record
     *
     * @param {object} data .
     * @param {IGanttData} ganttRecord .
     * @param {boolean} [isLoad] .
     * @returns {void} .
     */
    private addCustomFieldValue;
    private getGanttUid;
    private processCustomColumns;
    private isValidDateString;
    /**
     * To populate Gantt record
     *
     * @param {object} data .
     * @param {number} level .
     * @param {IGanttData} parentItem .
     * @param {boolean} isLoad .
     * @param {boolean} shouldProcess .
     * @returns {IGanttData} .
     * @private
     */
    createRecord(data: Object, level: number, parentItem?: IGanttData, isLoad?: boolean, shouldProcess?: boolean): IGanttData;
    private getValidatedTaskData;
    private sortSegmentsData;
    setSegmentsInfo(data: IGanttData, onLoad: boolean): ITaskSegment[];
    private setSegmentTaskData;
    private fetchResources;
    /**
     * Method to calculate work based on resource unit and duration.
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    updateWorkWithDuration(ganttData: IGanttData): void;
    /**
     *
     * @param {IGanttData} parent .
     * @returns {IParent} .
     * @private
     */
    getCloneParent(parent: IGanttData): IParent;
    /**
     * @returns {void} .
     * @private
     */
    reUpdateResources(): void;
    private addTaskData;
    private updateExpandStateMappingValue;
    /**
     * @param {IGanttData} ganttData .
     * @param {object} data .
     * @returns {void} .
     */
    private setValidatedDates;
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {object} data .
     * @param {boolean} isLoad .
     * @returns {void} .
     * @private
     */
    calculateScheduledValues(ganttData: IGanttData, data: Object, isLoad: boolean): void;
    /**
     * Calculates the scheduled values for the baseline of a task.
     *
     * @param {IGanttData} ganttData - The Gantt data containing task information.
     * @param {Object} data - The additional data containing baseline duration and dates.
     * @param {boolean} isLoad - A flag indicating if the method is called during the loading process.
     * @returns {void} - No return value.
     * @public
     */
    calculateScheduledValuesforBaseline(ganttData: IGanttData, data: Object, isLoad: boolean): void;
    /**
     * Calculates the baseline enddate and duration from startdate of baseline.
     *
     * @param {Date} baselineStartDate - The baseline startdate of the task.
     * @param {Date} baselineEndDate - The baseline enddate of the task.
     * @param {string} baselineDuration - The baseline duration of the task.
     * @param {IGanttData} ganttData - The Gantt data containing task information.
     * @param {boolean} isLoad - A flag indicating if the method is called during the loading process.
     * @returns {void} - No return value.
     * @private
     */
    private calculateDateFromStartDateforBaseline;
    /**
     * Calculates the baseline enddate and duration from startdate of baseline.
     *
     * @param {Date} endDate - The baseline enddate of the task.
     * @param {string} duration - The baseline duration of the task.
     * @param {IGanttData} ganttData - The Gantt data containing task information.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} - No return value.
     * @private
     */
    private calculateDateFromEndDateforBaseline;
    /**
     * Method to update duration with work value.
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    updateDurationWithWork(ganttData: IGanttData): void;
    /**
     * Update units of resources with respect to duration and work of a task.
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    updateUnitWithWork(ganttData: IGanttData): void;
    private resolveAndApplyWorkingTimes;
    private calculateDateFromEndDate;
    private calculateDateFromStartDate;
    /**
     *
     * @param {number} parentWidth .
     * @param {number} percent .
     * @returns {number} .
     * @private
     */
    getProgressWidth(parentWidth: number, percent: number): number;
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {boolean} isAuto .
     * @returns {number} .
     * @private
     */
    calculateWidth(ganttData: IGanttData, isAuto?: boolean): number;
    private getTaskbarHeight;
    /**
     * Method to calculate left
     *
     * @param {ITaskData} ganttProp .
     * @param {IGanttData} ganttRecord .
     * @param {boolean} isAuto .
     * @returns {number} .
     * @private
     */
    calculateLeft(ganttProp: ITaskData, ganttRecord: IGanttData, isAuto?: boolean): number;
    /**
     * calculate the left position of the auto scheduled taskbar
     *
     * @param {ITaskData} ganttProperties - Defines the gantt data.
     * @returns {number} .
     * @private
     */
    calculateAutoLeft(ganttProperties: ITaskData): number;
    /**
     * To calculate duration of Gantt record with auto scheduled start date and auto scheduled end date
     *
     * @param {ITaskData} ganttProperties - Defines the gantt data.
     * @returns {number} .
     */
    calculateAutoDuration(ganttProperties: ITaskData): number;
    /**
     * calculate the with between auto scheduled start date and auto scheduled end date
     *
     * @param {ITaskData} ganttProperties - Defines the gantt data.
     * @returns {number} .
     * @private
     */
    calculateAutoWidth(ganttProperties: ITaskData): number;
    /**
     * calculate the left margin of the baseline element
     *
     * @param {ITaskData} ganttProperties .
     * @returns {number} .
     * @private
     */
    calculateBaselineLeft(ganttProperties: ITaskData): number;
    /**
     * calculate the width between baseline start date and baseline end date.
     *
     * @param {ITaskData} ganttProperties .
     * @returns {number} .
     * @private
     */
    calculateBaselineWidth(ganttProperties: ITaskData): number;
    /**
     * To get tasks width value
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {ITaskData} [ganttData] .
     * @returns {number} .
     * @private
     */
    getTaskWidth(startDate: Date, endDate: Date, ganttData?: ITaskData): number;
    getDSTTransitions(year: number, timeZone: string): {
        dstStart: Date;
        dstEnd: Date;
    };
    hasDSTTransition(year: number): boolean;
    /**
     * Get task left value
     *
     * @param {Date} startDate .
     * @param {boolean} isMilestone .
     * @param {CalendarContext} calendarContext .
     * @param {boolean} isFromTimelineVirtulization .
     * @returns {number} .
     * @private
     */
    getTaskLeft(startDate: Date, isMilestone: boolean, calendarContext: CalendarContext, isFromTimelineVirtulization?: boolean): number;
    /**
     * Calculates the left pixel value for a task on the Gantt chart, considering non-working days.
     *
     * This method calculates the horizontal position or "left value" for a task based on its start date, current date,
     * and the position of non-working days. This is useful for determining the visual placement of tasks in the Gantt chart.
     *
     * @param {Date} timelineStartDate - The start date of the timeline from which to calculate the left position.
     * @param {Date} currentDate - The current date for which the left value is being calculated.
     * @returns {number} - Returns the calculated left value in pixels.
     */
    calculateLeftValue(timelineStartDate: Date, currentDate: Date): number;
    getSplitTaskWidth(sDate: Date, duration: number, data: IGanttData): number;
    getSplitTaskLeft(sDate: Date, segmentTaskStartDate: Date): number;
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {string} fieldName .
     * @returns {void} .
     * @private
     */
    updateMappingData(ganttData: IGanttData, fieldName: string): void;
    private segmentTaskData;
    /**
     * Method to update the task data resource values
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    private updateTaskDataResource;
    private setRecordDate;
    private getDurationInDay;
    private setRecordDuration;
    setDataSource(data: Object | Object[] | DataManager): Object[];
    private setStartDate;
    private getWorkInHour;
    /**
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     * @private
     */
    updateTaskData(ganttData: IGanttData): void;
    /**
     * To set resource value in Gantt record
     *
     * @param {object} data .
     * @returns {object[]} .
     * @private
     */
    setResourceInfo(data: Object): Object[];
    /**
     * To set resource unit in Gantt record
     *
     * @param {object[]} resourceData .
     * @returns {void} .
     * @private
     */
    updateResourceUnit(resourceData: Object[]): void;
    /**
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateResourceName(data: IGanttData): void;
    private dataReorder;
    private validateDurationUnitMapping;
    private validateTaskTypeMapping;
    private validateWorkUnitMapping;
    /**
     * To update duration value in Task
     *
     * @param {string} duration .
     * @param {ITaskData} ganttProperties .
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     * @private
     */
    updateDurationValue(duration: string, ganttProperties: ITaskData, isBaseline?: boolean): void;
    /**
     * @returns {void} .
     * @private
     */
    reUpdateGanttData(): void;
    private _isInStartDateRange;
    private _isInEndDateRange;
    /**
     * Method to find overlapping value of the parent task
     *
     * @param {IGanttData} resourceTask .
     * @returns {void} .
     * @private
     */
    updateOverlappingValues(resourceTask: IGanttData): void;
    /**
     * @param {IGanttData[]} tasks .
     * @returns {void} .
     * @private
     */
    updateOverlappingIndex(tasks: IGanttData[]): void;
    /**
     * Method to calculate the left and width value of oarlapping ranges
     *
     * @param {IWorkTimelineRanges[]} ranges .
     * @param {CalendarContext} calendarContext .
     * @returns {void} .
     * @private
     */
    calculateRangeLeftWidth(ranges: IWorkTimelineRanges[], calendarContext: CalendarContext): void;
    /**
     * @param {IWorkTimelineRanges[]} ranges .
     * @param {boolean} isSplit .
     * @returns {IWorkTimelineRanges[]} .
     * @private
     */
    mergeRangeCollections(ranges: IWorkTimelineRanges[], isSplit?: boolean): IWorkTimelineRanges[];
    /**
     * Sort resource child records based on start date
     *
     * @param {IGanttData} resourceTask .
     * @returns {IGanttData} .
     * @private
     */
    setSortedChildTasks(resourceTask: IGanttData): IGanttData[];
    private splitRangeCollection;
    private getRangeWithDay;
    private splitRangeForDayMode;
    private getRangeWithWeek;
    private splitRangeForWeekMode;
    /**
     * Update all gantt data collection width, progress width and left value
     *
     * @returns {void} .
     * @private
     */
    updateGanttData(): void;
    private shouldProcessUpdateWidth;
    /**
     * Update all gantt data collection width, progress width and left value
     *
     * @param {IGanttData} data .
     * @param {Map<string, IGanttData>} parentRecords .
     * @returns {void} .
     * @public
     */
    private updateTaskLeftWidth;
    /**
     * @returns {void} .
     * @private
     */
    reUpdateGanttDataPosition(): void;
    /**
     * method to update left, width, progress width in record
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateWidthLeft(data: IGanttData): void;
    /**
     * method to update left, width, progress width in record
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateAutoWidthLeft(data: IGanttData): void;
    /**
     * To calculate parent progress value
     *
     * @param {IGanttData} childGanttRecord .
     * @returns {object} .
     * @private
     */
    getParentProgress(childGanttRecord: IGanttData): Object;
    private resetDependency;
    private isUnscheduledTask;
    private isFromManual;
    /**
     * @param {IParent | IGanttData} cloneParent .
     * @param {boolean} isParent .
     * @param {Map<string, IGanttData>} [parentRecords] - Optional map of parent records.
     * @returns {void} .
     * @private
     */
    updateParentItems(cloneParent: IParent | IGanttData, isParent?: boolean, parentRecords?: Map<string, IGanttData>): void;
}
