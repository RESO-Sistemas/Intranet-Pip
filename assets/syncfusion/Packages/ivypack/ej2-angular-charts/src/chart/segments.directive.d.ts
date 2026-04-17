import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Series Directive
 * ```html
 * <e-series-collection>
 * <e-series>
 * <e-segments>
 * <e-segment>
 * </e-segment>
 * </e-segments>
 * </e-series-collection>
 * ```
 */
export declare class SegmentDirective extends ComplexBase<SegmentDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the fill color for the region using a color name, hex code, or rgba value.
     * @default null
     */
    color: any;
    /**
     * Specifies the dash pattern for the stroke of the series. The string format allows defining various dash and gap lengths.
     * @default '0'
     */
    dashArray: any;
    /**
     * Defines the starting point of region.
     * @default null
     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<SegmentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SegmentDirective, "e-series>e-segments>e-segment", never, { "color": "color"; "dashArray": "dashArray"; "value": "value"; }, {}, never>;
}
/**
 * Segment Array Directive
 * @private
 */
export declare class SegmentsDirective extends ArrayBase<SegmentsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SegmentsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SegmentsDirective, "e-series>e-segments", never, {}, {}, ["children"]>;
}
