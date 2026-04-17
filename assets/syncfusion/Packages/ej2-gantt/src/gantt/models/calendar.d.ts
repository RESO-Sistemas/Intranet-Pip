import { ChildProperty } from '@syncfusion/ej2-base';
import { ProjectCalendarModel, TaskCalendarModel } from './project-task-calendar-model';
/**
 * Defines the root model for all calendar settings in the project.
 */
export declare class CalendarSettings extends ChildProperty<CalendarSettings> {
    /**
     * Defines the default calendar for the entire project.
     *
     * @default {}
     */
    projectCalendar: ProjectCalendarModel;
    /**
     * Defines a list of custom calendars assignable to specific tasks.
     *
     * @default []
     */
    taskCalendars: TaskCalendarModel[];
}
