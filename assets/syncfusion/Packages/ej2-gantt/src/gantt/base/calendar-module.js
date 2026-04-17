/**
 * CalendarModule provides calendar management functionality for handling task-specific and project-wide calendars.
 * It enables retrieval of calendar configurations basedroper task scheduling across different calendar contexts.
 */
var CalendarModule = /** @class */ (function () {
    function CalendarModule(parent) {
        this.holidays = [];
        this.workingTime = [];
        this.parent = parent;
    }
    /**
     * Retrieves the appropriate calendar configuration based on the provided ID.
     * If no ID is provided or the specified calendar is not found, returns the project-wide default calendar.
     * @param {string|null} id - The unique identifier of the task-specific calendar to retrieve.
     * @returns {ProjectCalendarModel} The matching task calendar if found, otherwise the project default calendar.
     * @private
     */
    CalendarModule.prototype.getCalendarById = function (id) {
        var taskCalendars = this.parent.calendarSettings.taskCalendars;
        var projectCalendar = this.parent.calendarSettings.projectCalendar;
        if (!id) {
            return projectCalendar;
        }
        if (taskCalendars && taskCalendars.length > 0) {
            for (var i = 0; i < taskCalendars.length; i++) {
                if (taskCalendars[i].calendarId === id) {
                    return taskCalendars[i];
                }
            }
        }
        return projectCalendar;
    };
    return CalendarModule;
}());
export { CalendarModule };
