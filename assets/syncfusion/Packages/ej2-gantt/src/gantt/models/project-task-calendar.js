var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, Collection, ChildProperty } from '@syncfusion/ej2-base';
import { DayWorkingTime } from '../models/day-working-time';
import { Holiday } from '../models/holiday';
import { CalendarException } from '../models/calendar-exception';
/**
 * Defines the base calendar structure for the project.
 *
 * This configuration controls global working hours, holidays, and exceptions that influence task scheduling across the Gantt chart.
 */
var ProjectCalendar = /** @class */ (function (_super) {
    __extends(ProjectCalendar, _super);
    function ProjectCalendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([{ from: 8, to: 12 }, { from: 13, to: 17 }], DayWorkingTime)
    ], ProjectCalendar.prototype, "workingTime", void 0);
    __decorate([
        Collection([], Holiday)
    ], ProjectCalendar.prototype, "holidays", void 0);
    __decorate([
        Collection([], CalendarException)
    ], ProjectCalendar.prototype, "exceptions", void 0);
    return ProjectCalendar;
}(ChildProperty));
export { ProjectCalendar };
/**
 * Defines a calendar specific to a task, including a unique identifier and optional inheritance from a parent calendar.
 *
 */
var TaskCalendar = /** @class */ (function (_super) {
    __extends(TaskCalendar, _super);
    function TaskCalendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], TaskCalendar.prototype, "calendarId", void 0);
    __decorate([
        Collection([], Holiday)
    ], TaskCalendar.prototype, "holidays", void 0);
    __decorate([
        Collection([], CalendarException)
    ], TaskCalendar.prototype, "exceptions", void 0);
    return TaskCalendar;
}(ChildProperty));
export { TaskCalendar };
