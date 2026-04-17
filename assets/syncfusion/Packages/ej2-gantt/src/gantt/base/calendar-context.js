/**
 * Calendar context is used to manage working time configurations for tasks and projects.
 * It provides access to calendar settings including working hours, holidays, and exceptions.
 */
var CalendarContext = /** @class */ (function () {
    function CalendarContext(parent, calendar) {
        this.defaultHolidays = [];
        this.exceptionsRanges = [];
        this.parent = parent;
        this.calendar = calendar;
        this.initialize();
    }
    CalendarContext.prototype.initialize = function () {
        this.buildDefaultHolidays();
        this.buildExceptionsCollection();
    };
    CalendarContext.prototype.buildDefaultHolidays = function () {
        var holidays = this.calendar['propName'] === 'projectCalendar' ? this.parent.calendarModule.holidays : this.calendar.holidays;
        var overrides = this.calendar.exceptions;
        for (var i = 0; i < holidays.length; i++) {
            var holiday = holidays[i];
            var fromDate = holiday.from ? new Date(holiday.from) : new Date(holiday.to);
            var toDate = holiday.to ? new Date(holiday.to) : new Date(holiday.from);
            for (var d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
                var timestamp = new Date(d).setHours(0, 0, 0, 0);
                var isOverridden = false;
                for (var j = 0; j < overrides.length; j++) {
                    var overrideDate = new Date(overrides[j].from).setHours(0, 0, 0, 0);
                    if (overrideDate === timestamp) {
                        isOverridden = true;
                        break;
                    }
                }
                if (!isOverridden) {
                    this.defaultHolidays.push(timestamp);
                }
            }
        }
    };
    CalendarContext.prototype.buildExceptionsCollection = function () {
        var overrides = this.calendar.exceptions;
        for (var i = 0; i < overrides.length; i++) {
            var override = overrides[i];
            var fromDate = new Date(override.from);
            var toDate = new Date(override.to);
            var id = "exception_" + i;
            this.exceptionsRanges.push({
                id: id,
                from: fromDate,
                to: toDate
            });
        }
    };
    /**
     * Checks if the provided date falls within any exception period.
     * @param {Date} date - The date to check.
     * @returns {boolean} True if the date is part of an exception, otherwise false.
     * @public
     */
    CalendarContext.prototype.getExceptionForDate = function (date) {
        var target = new Date(date.getTime());
        target.setHours(0, 0, 0, 0);
        for (var _i = 0, _a = this.exceptionsRanges; _i < _a.length; _i++) {
            var range = _a[_i];
            var from = new Date(range.from);
            var to = new Date(range.to);
            from.setHours(0, 0, 0, 0);
            to.setHours(0, 0, 0, 0);
            if (target >= from && target <= to) {
                return true;
            }
        }
        return false;
    };
    return CalendarContext;
}());
export { CalendarContext };
