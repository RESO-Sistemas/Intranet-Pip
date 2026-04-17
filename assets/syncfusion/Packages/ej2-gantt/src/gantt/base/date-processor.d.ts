import { IGanttData, ITaskData, ITaskSegment } from './interface';
import { Gantt } from './gantt';
import { CalendarContext } from './calendar-context';
/**
 *  Date processor is used to handle date of task data.
 */
export declare class DateProcessor {
    protected parent: Gantt;
    private prevProjectStartDate;
    private fromSegments;
    private mondayTimeRangeLength;
    private tuesdayTimeRangeLength;
    private wednesdayTimeRangeLength;
    private thursdayTimeRangeLength;
    private fridayTimeRangeLength;
    private saturdayTimeRangeLength;
    private sundayTimeRangeLength;
    constructor(parent: Gantt);
    /**
     * @param {ITaskData} ganttProp .
     * @returns {boolean} .
     */
    private isValidateNonWorkDays;
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
    checkStartDate(date: Date, ganttProp?: ITaskData, validateAsMilestone?: boolean, isLoad?: boolean, isBaseline?: boolean, ignoreAutoSchedule?: boolean): Date;
    private getAdjustedStartDate;
    getDateByConstraint(ganttData: ITaskData, date: Date, validPredecessor?: boolean): Date;
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
    checkEndDate(date: Date, ganttProp?: ITaskData, validateAsMilestone?: boolean, isBaseline?: boolean, ignoreAutoSchedule?: boolean): Date;
    /**
     * To validate the baseline start date
     *
     * @param {Date} date .
     * @param {ITaskData} ganttProp .
     * @returns {Date} .
     * @private
     */
    checkBaselineStartDate(date: Date, ganttProp?: ITaskData): Date;
    /**
     * To validate baseline end date
     *
     * @param {Date} date .
     * @param {ITaskData} ganttProp .
     * @returns {Date} .
     * @private
     */
    checkBaselineEndDate(date: Date, ganttProp?: ITaskData): Date;
    /**
     * To calculate start date value from duration and end date
     *
     * @param {IGanttData} ganttData - Defines the gantt data.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     * @private
     */
    calculateStartDate(ganttData: IGanttData, isBaseline?: boolean): void;
    /**
     * Gets task field mappings based on baseline context.
     *
     * @param {boolean} isBaseline - Flag indicating if baseline fields should be used.
     * @returns {{ startdateField: string, enddateField: string, durationField: string }} - Object containing field names for start date, end date, and duration.
     */
    getFieldMappings(isBaseline: boolean): {
        startdateField: string;
        enddateField: string;
        durationField: string;
    };
    /**
     *
     * @param {IGanttData} ganttData - Defines the gantt data.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     * @public
     */
    calculateEndDate(ganttData: IGanttData, isBaseline?: boolean): void;
    totalDuration(segments: ITaskSegment[]): number;
    /**
     * To calculate duration from start date and end date
     *
     * @param {IGanttData} ganttData - Defines the gantt data.
     * @param {boolean} isBaseline - Indicates whether the calculation is specific to baseline dates.
     * @returns {void} .
     */
    calculateDuration(ganttData: IGanttData, isBaseline?: boolean): void;
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
    private getNonworkingTime;
    private nonWorkingSeconds;
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
    getDuration(startDate: Date, endDate: Date, durationUnit: string, isAutoSchedule: boolean, isMilestone: boolean, isCheckTimeZone: boolean, calendarContext: CalendarContext): number;
    private calculateDurationValue;
    /**
     *
     * @param {number} duration .
     * @param {string} durationUnit .
     * @param {Date} date .
     *  @returns {number} .
     */
    private getDurationAsSeconds;
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
    getEndDate(startDate: Date, duration: number, durationUnit: string, ganttProp: ITaskData, validateAsMilestone: boolean, isBaseline?: boolean, ganttData?: IGanttData): Date;
    private calculateEndDateFromDuration;
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
    getStartDate(endDate: Date, duration: number, durationUnit: string, ganttProp: ITaskData, fromValidation?: boolean, isBaseline?: boolean): Date;
    private calculateSecondDuration;
    /**
     * @param {ITaskData} ganttProp .
     * @param {boolean} isLoad .
     * @returns {Date} .
     * @private
     */
    protected getProjectStartDate(ganttProp: ITaskData, isLoad?: boolean): Date;
    /**
     * @param {ITaskData} ganttProp .
     * @param {boolean} isAuto .
     * @param {boolean} isBaseline .
     * @returns {Date} .
     * @private
     */
    getValidStartDate(ganttProp: ITaskData, isAuto?: boolean, isBaseline?: boolean): Date;
    /**
     *
     * @param {ITaskData} ganttProp .
     * @param {boolean} isAuto .
     * @param {boolean} isBaseline .
     * @returns {Date} .
     * @private
     */
    getValidEndDate(ganttProp: ITaskData, isAuto?: boolean, isBaseline?: boolean): Date;
    private getWorkingTime;
    private assignStartTime;
    private assignEndTime;
    private calculateWeekWorkTime;
    /**
     * @returns {number} .
     * @private
     */
    getSecondsPerDay(): number;
    /**
     *
     * @param {string} value .
     * @returns {object} .
     * @private
     */
    getDurationValue(value: string | number): Object;
    /**
     *
     * @param {Date} date .
     * @param {CalendarContext} calendarContext .
     * @returns {Date} .
     */
    protected getNextWorkingDay(date: Date, calendarContext: CalendarContext): Date;
    /**
     * get weekend days between two dates without including args dates
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {CalendarContext} calendarContext .
     * @returns {number} .
     */
    protected getWeekendCount(startDate: Date, endDate: Date, calendarContext: CalendarContext): number;
    /**
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {boolean} isCheckTimeZone .
     * @returns {number} .
     */
    protected getNumberOfSeconds(startDate: Date, endDate: Date, isCheckTimeZone: boolean): number;
    /**
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {CalendarContext} calendarContext .
     * @returns {number} .
     */
    protected getHolidaysCount(startDate: Date, endDate: Date, calendarContext: CalendarContext): number;
    /**
     * @param {string} props .
     * @returns {number[]} .
     * @private
     */
    getHolidayDates(props?: string): number[];
    /**
     * @param {Date} date .
     * @param {boolean} checkWeekEnd .
     * @param {CalendarContext} calendarContext .
     * @returns {boolean} .
     * @private
     */
    isOnHolidayOrWeekEnd(date: Date, checkWeekEnd: boolean, calendarContext: CalendarContext): boolean;
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
    protected getNonWorkingSecondsOnDate(startDate: Date, endDate: Date, isAutoSchedule: boolean, isBaseline: boolean, calendarContext: CalendarContext, ignoreAutoSchedule?: boolean): number;
    /**
     *
     * @param {Date} date .
     * @param {CalendarContext} calendarContext .
     * @returns {Date} .
     */
    protected getPreviousWorkingDay(date: Date, calendarContext: CalendarContext): Date;
    /**
     * To get non-working day indexes.
     *
     * @returns {void} .
     * @private
     */
    getNonWorkingDayIndex(): void;
    /**
     *
     * @param {number} seconds .
     * @param {Date} date .
     * @returns {void} .
     * @private
     */
    setTime(seconds: number, date: Date): void;
    /**
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {boolean} isCheckTimeZone .
     * @returns {number} .
     */
    protected getTimeDifference(startDate: Date, endDate: Date, isCheckTimeZone?: boolean): number;
    /**
     * @param {Date} sDate .
     * @param {Date} eDate .
     * @returns {void} .
     */
    protected updateDateWithTimeZone(sDate: Date, eDate: Date): void;
    /**
     *
     * @param {Date} date .
     * @returns {number} .
     */
    protected getSecondsInDecimal(date: Date): number;
    /**
     * @param {Date} date .
     * @param {number} localOffset .
     * @param {string} timezone .
     * @returns {number} .
     * @private
     */
    offset(date: Date, timezone: string): number;
    remove(date: Date, timezone: string): Date;
    reverse(date: Date, fromOffset: number | string, toOffset: number | string): Date;
    /**
     * @param {Date} date .
     * @param {string} timezone .
     * @returns {Date} .
     * @private
     */
    convert(date: Date, timezone: string): Date;
    /**
     * @param {string | Date} date .
     * @param {boolean} toConvert .
     * @returns {Date} .
     * @private
     */
    getDateFromFormat(date: string | Date, toConvert?: boolean): Date;
    /**
     * @param {Date} date1 .
     * @param {Date} date2 .
     * @returns {number} .
     * @private
     */
    compareDates(date1: Date, date2: Date): number;
    /**
     *
     * @param {number} duration .
     * @param {string} durationUnit .
     * @returns {string} .
     * @private
     */
    getDurationString(duration: number, durationUnit: string): string;
    /**
     * Method to get work with value and unit.
     *
     * @param {number} work .
     * @param {string} workUnit .
     * @returns {string} .
     * @private
     */
    getWorkString(work: number | string, workUnit: string): string;
    /**
     *
     * @param {object} editArgs .
     * @returns {void} .
     * @private
     */
    calculateProjectDatesForValidatedTasks(editArgs?: Object): void;
    /**
     *
     * @param {object} editArgs .
     * @returns {void} .
     * @private
     */
    calculateProjectDates(editArgs?: Object): void;
    /**
     *
     * @param {ITaskSegment} segments .
     * @returns {number} .
     * @private
     */
    splitTasksDuration(segments: ITaskSegment[]): number;
}
