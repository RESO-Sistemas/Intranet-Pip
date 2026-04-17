import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export declare class RangeColorDirective extends ComplexBase<RangeColorDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * color
     * @default null
     */
    color: any;
    /**
     * end
     * @default null
     */
    end: any;
    /**
     * start
     * @default null
     */
    start: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RangeColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RangeColorDirective, "e-rangecolors>e-rangecolor", never, { "color": "color"; "end": "end"; "start": "start"; }, {}, never>;
}
/**
 * RangeColor Array Directive
 * @private
 */
export declare class RangeColorsDirective extends ArrayBase<RangeColorsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RangeColorsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RangeColorsDirective, "ejs-progressbar>e-rangecolors", never, {}, {}, ["children"]>;
}
