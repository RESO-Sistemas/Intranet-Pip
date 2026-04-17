import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'></e-holiday>
 *     <e-holiday from='05/15/2018' label='Holiday 2'></e-holiday>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
export declare class HolidayDirective extends ComplexBase<HolidayDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines a custom CSS class for styling the holiday marker and label.
     *
     * Use this to apply custom background, borders, or font styles.
     *
     * @default null
     */
    cssClass: any;
    /**
     * Specifies the start date of the holiday.
     *
     * Accepts a `Date` object or ISO-formatted string.
     *
     * @default null
     */
    from: any;
    /**
     * Defines a label or description for the holiday.
     *
     * Useful for tooltips, annotations, and export metadata.
     *
     * @default null
     */
    label: any;
    /**
     * Specifies the end date of the holiday.
     *
     * Accepts a `Date` object or ISO-formatted string.
     *If omitted, the holiday is treated as a single-day event.
     *
     * @default null
     */
    to: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<HolidayDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<HolidayDirective, "ejs-gantt>e-holidays>e-holidays", never, { "cssClass": "cssClass"; "from": "from"; "label": "label"; "to": "to"; }, {}, never>;
}
/**
 * Holiday Array Directive
 * @private
 */
export declare class HolidaysDirective extends ArrayBase<HolidaysDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<HolidaysDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<HolidaysDirective, "ejs-gantt>e-holidays", never, {}, {}, ["children"]>;
}
