import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to define the annotations in the maps.
 * ```html
 * <e-maps-annotations>
 * <e-maps-annotation></e-maps-annotation>
 * </e-maps-annotations>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Gets or sets the type of the placement when the annotation is to be aligned horizontally.
     * @default None
     */
    horizontalAlignment: any;
    /**
     * Gets or sets the type of the placement when the annotation is to be aligned vertically.
     * @default None
     */
    verticalAlignment: any;
    /**
     * Gets or sets the x position of the annotation in pixel or percentage format.
     * @default '0px'
     */
    x: any;
    /**
     * Gets or sets the y position of the annotation in pixel or percentage format.
     * @default '0px'
     */
    y: any;
    /**
     * Gets or sets the z-index of the annotation in maps.
     * @default '-1'
     */
    zIndex: any;
    /**
     * Gets or sets the content for the annotation in maps.
     * @default ''
     * @asptype string
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationDirective, "e-maps-annotations>e-maps-annotation", never, { "content": "content"; "horizontalAlignment": "horizontalAlignment"; "verticalAlignment": "verticalAlignment"; "x": "x"; "y": "y"; "zIndex": "zIndex"; }, {}, ["content"]>;
}
/**
 * Annotation Array Directive
 * @private
 */
export declare class AnnotationsDirective extends ArrayBase<AnnotationsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationsDirective, "ej-maps>e-maps-annotations", never, {}, {}, ["children"]>;
}
