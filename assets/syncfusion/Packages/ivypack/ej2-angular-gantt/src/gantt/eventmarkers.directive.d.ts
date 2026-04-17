import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-event-markers` directive represent a event marker collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'></e-event-marker>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
export declare class EventMarkerDirective extends ComplexBase<EventMarkerDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies a custom CSS class for the event marker.
     * This can be used to apply custom styles to the line and label of the marker.
     * @default null
     */
    cssClass: any;
    /**
     * Specifies the date or day of the event marker.
     * The value can be a `Date` object or a date string.
     * @default null
     */
    day: any;
    /**
     * Specifies the label for the event marker.
     * @default null
     */
    label: any;
    /**
     * Vertical offset of the label from the timeline top.
     * Must be in pixels (e.g., '50px'). Invalid values default to '50px'.
     * Negative values are normalized to '50px'.
     * @default '50px'
     */
    top: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<EventMarkerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EventMarkerDirective, "ejs-gantt>e-event-markers>e-event-marker", never, { "cssClass": "cssClass"; "day": "day"; "label": "label"; "top": "top"; }, {}, never>;
}
/**
 * EventMarker Array Directive
 * @private
 */
export declare class EventMarkersDirective extends ArrayBase<EventMarkersDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<EventMarkersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EventMarkersDirective, "ejs-gantt>e-event-markers", never, {}, {}, ["children"]>;
}
