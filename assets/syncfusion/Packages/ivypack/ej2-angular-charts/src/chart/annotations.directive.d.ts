import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Annotation Directive
 * ```html
 * <e-annotations><e-annotation></e-annotation><e-annotations>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Options to improve accessibility for chart annotation elements.
     */
    accessibility: any;
    /**
     * Specifies the coordinate units of the annotation.
     * The options are:
     * * Pixel - Renders the annotation based on x and y pixel values.
     * * Point - Renders the annotation based on x and y axis values.
     * @default 'Pixel'
     */
    coordinateUnits: any;
    /**
     * A description for the annotation that provides additional information about its content for screen readers.
     * @default null
     * @deprecated
     */
    description: any;
    /**
     * Specifies the alignment of the annotation.
     * The options are:
     * * Near - Aligns the annotation element to the left side.
     * * Far - Aligns the annotation element to the right side.
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
     * If `coordinateUnit` is set to `Point`, x specifies the axis value.
     * @default '0'
     * @asptype object
     */
    x: any;
    /**
     * The name of the horizontal axis associated with the annotation.
     * Requires the `axes` of the chart.
     * @default null
     */
    xAxisName: any;
    /**
     * If `coordinateUnit` is set to `Pixel`, y specifies the pixel value.
     * If `coordinateUnit` is set to `Point`, y specifies the axis value.
     * @default '0'
     */
    y: any;
    /**
     * The name of the vertical axis associated with the annotation.
     * Requires the `axes` of the chart.
     * @default null
     */
    yAxisName: any;
    /**
     * The content of the annotation, which also accepts the ID of the custom element.
     * @default null
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationDirective, "e-annotations>e-annotation", never, { "accessibility": "accessibility"; "content": "content"; "coordinateUnits": "coordinateUnits"; "description": "description"; "horizontalAlignment": "horizontalAlignment"; "region": "region"; "verticalAlignment": "verticalAlignment"; "x": "x"; "xAxisName": "xAxisName"; "y": "y"; "yAxisName": "yAxisName"; }, {}, ["content"]>;
}
/**
 * Annotation Array Directive
 * @private
 */
export declare class AnnotationsDirective extends ArrayBase<AnnotationsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationsDirective, "ejs-chart>e-annotations", never, {}, {}, ["children"]>;
}
