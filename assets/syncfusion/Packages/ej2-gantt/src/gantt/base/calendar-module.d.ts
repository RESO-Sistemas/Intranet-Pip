import { Gantt } from './gantt';
import { ProjectCalendarModel, HolidayModel, DayWorkingTimeModel } from '../models/models';
/**
 * CalendarModule provides calendar management functionality for handling task-specific and project-wide calendars.
 * It enables retrieval of calendar configurations basedroper task scheduling across different calendar contexts.
 */
export declare class CalendarModule {
    protected parent: Gantt;
    constructor(parent: Gantt);
    /**
     * Retrieves the appropriate calendar configuration based on the provided ID.
     * If no ID is provided or the specified calendar is not found, returns the project-wide default calendar.
     * @param {string|null} id - The unique identifier of the task-specific calendar to retrieve.
     * @returns {ProjectCalendarModel} The matching task calendar if found, otherwise the project default calendar.
     * @private
     */
    getCalendarById(id: string | null): ProjectCalendarModel;
    holidays: HolidayModel[];
    workingTime: DayWorkingTimeModel[];
}
