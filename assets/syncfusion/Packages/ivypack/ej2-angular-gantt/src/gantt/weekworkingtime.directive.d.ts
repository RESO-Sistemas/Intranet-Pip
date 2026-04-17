import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-week-working-times` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-week-working-times>
 *     <e-week-working-time dayOfWeek='Monday'></e-week-working-time>
 *     <e-week-working-time dayOfWeek='Monday'></e-week-working-time>
 *   </e-week-working-times>
 * </ejs-gantt>
 * ```
 */
export declare class WeekWorkingTimeDirective extends ComplexBase<WeekWorkingTimeDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the day of the week to apply customized working time.
     * @default null
     */
    dayOfWeek: any;
    /**
     * Defines the time range for each day of the week.
     * @default []
     * @asptype List<GanttDayWorkingTime>

     */
    timeRange: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<WeekWorkingTimeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WeekWorkingTimeDirective, "ejs-gantt>e-week-working-times>e-week-working-time", never, { "dayOfWeek": "dayOfWeek"; "timeRange": "timeRange"; }, {}, never>;
}
/**
 * WeekWorkingTime Array Directive
 * @private
 */
export declare class WeekWorkingTimesDirective extends ArrayBase<WeekWorkingTimesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<WeekWorkingTimesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WeekWorkingTimesDirective, "ejs-gantt>e-week-working-times", never, {}, {}, ["children"]>;
}
