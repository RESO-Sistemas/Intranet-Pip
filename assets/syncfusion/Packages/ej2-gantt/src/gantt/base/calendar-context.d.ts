import { ProjectCalendarModel } from '../models/models';
import { Gantt } from './gantt';
/**
 * Calendar context is used to manage working time configurations for tasks and projects.
 * It provides access to calendar settings including working hours, holidays, and exceptions.
 */
export declare class CalendarContext {
    protected parent: Gantt;
    private calendar;
    defaultHolidays: number[];
    exceptionsRanges: {
        id: string;
        from: Date;
        to: Date;
    }[];
    constructor(parent: Gantt, calendar: ProjectCalendarModel);
    private initialize;
    private buildDefaultHolidays;
    private buildExceptionsCollection;
    /**
     * Checks if the provided date falls within any exception period.
     * @param {Date} date - The date to check.
     * @returns {boolean} True if the date is part of an exception, otherwise false.
     * @public
     */
    getExceptionForDate(date: Date): boolean;
}
