import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * MultiLevelLabels Directive
 * ```html
 * <e-multilevellabels>
 * <e-multilevellabel>
 * <e-Categories>
 * <e-Category>
 * </e-Category>
 * </e-Categories>
 * </e-multilevellabel>
 * </e-multilevellabels>
 * ```
 */
export declare class CategoryDirective extends ComplexBase<CategoryDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the type of border for labels.
     * Available border types:
     * * Rectangle
     * * Without Top Border
     * * Without Top and Bottom Border
     * * Without Border
     * * Brace
     * * Curly Brace
     * @default 'Rectangle'
     * @aspdefaultvalueignore
     * @blazordefaultvalueignore
     */
    type: any;
    /**
     * Allows adding custom data for multi-level labels.
     * @default null
     */
    customAttributes: any;
    /**
     * Specifies the end value for the multi-level labels.
     * @default null
     * @aspdefaultvalueignore
     */
    end: any;
    /**
     * Specifies the maximum width of the text for multi-level labels.
     * @default null
     * @aspdefaultvalueignore
     */
    maximumTextWidth: any;
    /**
     * Specifies the starting value for the multi-level labels.
     * @default null
     * @aspdefaultvalueignore
     */
    start: any;
    /**
     * Specifies the text to be displayed for the multi-level labels.
     * @default ''
     */
    text: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoryDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CategoryDirective, "e-multilevellabel>e-categories>e-category", never, { "customAttributes": "customAttributes"; "end": "end"; "maximumTextWidth": "maximumTextWidth"; "start": "start"; "text": "text"; "type": "type"; }, {}, never>;
}
/**
 * Category Array Directive
 * @private
 */
export declare class CategoriesDirective extends ArrayBase<CategoriesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoriesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CategoriesDirective, "e-multilevellabel>e-categories", never, {}, {}, ["children"]>;
}
