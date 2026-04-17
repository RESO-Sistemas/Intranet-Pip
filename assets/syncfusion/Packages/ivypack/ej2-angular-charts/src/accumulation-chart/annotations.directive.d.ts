import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * AccumulationAnnotations Directive
 * ```html
 * <e-accumulation-annotations>
 * <e-accumulation-annotation></e-accumulation-annotation>
 * </e-accumulation-annotations>
 * ```
 */
export declare class AccumulationAnnotationDirective extends ComplexBase<AccumulationAnnotationDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the coordinate units of the annotation.
     * The options are:
     * * Pixel - Renders the annotation based on x and y pixel values.
     * * Point - Renders the annotation based on x and y data values.
     * @default 'Pixel'
     */
    coordinateUnits: any;
    /**
     * A description for the annotation that provides additional information about its content for screen readers.
     * @default null
     */
    description: any;
    /**
     * Specifies the alignment of the annotation.
     * The options are:
     * * Near - Aligns the annotation element to the top side.
     * * Far - Aligns the annotation element to the bottom side.
     * * Center - Aligns the annotation element to the midpoint.
     * @default 'Center'
     * @deprecated
     */
    horizontalAlignment: any;
    /**
     * Specifies the regions of the annotation.
     * The options are:
     * * Chart - Renders the annotation based on chart coordinates.
     * * Series - Renders the annotation based on series coordinates.
     * @default 'Chart'
     */
    region: any;
    /**
     * Specifies the position of the annotation.
     * The options are
     * * Top - Aligns the annotation element to the top side.
     * * Bottom - Aligns the annotation element to the bottom side.
     * * Middle - Aligns the annotation element to the midpoint.
     * @default 'Middle'
     * @deprecated
     */
    verticalAlignment: any;
    /**
     * If `coordinateUnit` is set to `Pixel`, x specifies the pixel value.
     * If `coordinateUnit` is set to `Point`, x specifies the data value.
     * @default '0'
     */
    x: any;
    /**
     * If `coordinateUnit` is set to `Pixel`, y specifies the pixel value.
     * If `coordinateUnit` is set to `Point`, y specifies the data value.
     * @default '0'
     */
    y: any;
    /**
     * The content of the annotation, which can also accept the ID of a custom element.
     * @default null
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AccumulationAnnotationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AccumulationAnnotationDirective, "e-accumulation-annotations>e-accumulation-annotation", never, { "content": "content"; "coordinateUnits": "coordinateUnits"; "description": "description"; "horizontalAlignment": "horizontalAlignment"; "region": "region"; "verticalAlignment": "verticalAlignment"; "x": "x"; "y": "y"; }, {}, ["content"]>;
}
/**
 * AccumulationAnnotation Array Directive
 * @private
 */
export declare class AccumulationAnnotationsDirective extends ArrayBase<AccumulationAnnotationsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AccumulationAnnotationsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AccumulationAnnotationsDirective, "ej-accumulationchart>e-accumulation-annotations", never, {}, {}, ["children"]>;
}
