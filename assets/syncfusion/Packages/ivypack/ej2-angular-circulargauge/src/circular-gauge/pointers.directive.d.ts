import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to render and customize the pointers in an axis of circular gauge.
 * ```html
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * ```
 */
export declare class PointerDirective extends ComplexBase<PointerDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Sets and gets the type of pointer for an axis in Circular gauge.
     * @default Needle
     */
    type: any;
    /**
     * Sets and gets the options for the animation of the pointers that propagate while rendering the axis and updating the pointer value in the circular gauge.
     */
    animation: any;
    /**
     * Sets and gets the options to customize the style properties of the border for the needle pointer in an axis.
     */
    border: any;
    /**
     * Sets and gets the options to customize the cap element of the needle pointer in an axis.
     */
    cap: any;
    /**
     * Sets and gets the color of the pointer in an axis.
     * @default null
     */
    color: any;
    /**
     * Sets and gets the information about pointer for assistive technology.
     * @default null
     */
    description: any;
    /**
     * Enables and disables drag movement of the pointer in the circular gauge.
     * @default false
     */
    enableDrag: any;
    /**
     * Sets and gets the URL for the image that is to be displayed as pointer.
     * It requires marker shape value to be `Image`.
     * @default null
     */
    imageUrl: any;
    /**
     * Sets and gets the properties to render a linear gradient for the pointer.
     * If both linear and radial gradient is set, then the linear gradient will be rendered in the pointer.
     * @default null
     */
    linearGradient: any;
    /**
     * Sets and gets the height of the marker pointer in an axis.
     * @default 5
     */
    markerHeight: any;
    /**
     * Sets and gets the shape of the marker pointer in an axis.
     * @default Circle
     */
    markerShape: any;
    /**
     * Sets and gets the width of the marker pointer in an axis.
     * @default 5
     */
    markerWidth: any;
    /**
     * Sets or gets the width at the ending edge of the needle pointer in an axis.
     * @default null
     */
    needleEndWidth: any;
    /**
     * Sets or gets the width at the starting edge of the needle pointer in an axis.
     * @default null
     */
    needleStartWidth: any;
    /**
     * Sets and gets the options to customize the tail element of the needle pointer in an axis.
     */
    needleTail: any;
    /**
     * Sets and gets the offset value of pointer from scale.
     * @default '0'
     */
    offset: any;
    /**
     * Sets and gets the width of the pointer in axis.
     * @default 20
     */
    pointerWidth: any;
    /**
     * Sets and gets the position of pointer for an axis.
     * @default Auto
     */
    position: any;
    /**
     * Sets and gets the properties to render a radial gradient for pointer.
     * @default null
     */
    radialGradient: any;
    /**
     * Sets and gets the radius of pointer for marker and range type pointer and fix length of pointer for needle pointer.
     * @default null
     */
    radius: any;
    /**
     * Sets and gets the corner radius for pointer in axis.
     * @default 0
     */
    roundedCornerRadius: any;
    /**
     * Sets and gets the text for the marker pointer. To render the text in the marker pointer, the marker shape must be set as `Text`.
     * @default ''
     */
    text: any;
    /**
     * Sets and gets the style of text in marker pointer of an axis.
     */
    textStyle: any;
    /**
     * Sets and gets the value of the pointer in circular gauge.
     * @aspdefaultvalueignore
     * @default null
     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<PointerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PointerDirective, "e-pointers>e-pointer", never, { "animation": "animation"; "border": "border"; "cap": "cap"; "color": "color"; "description": "description"; "enableDrag": "enableDrag"; "imageUrl": "imageUrl"; "linearGradient": "linearGradient"; "markerHeight": "markerHeight"; "markerShape": "markerShape"; "markerWidth": "markerWidth"; "needleEndWidth": "needleEndWidth"; "needleStartWidth": "needleStartWidth"; "needleTail": "needleTail"; "offset": "offset"; "pointerWidth": "pointerWidth"; "position": "position"; "radialGradient": "radialGradient"; "radius": "radius"; "roundedCornerRadius": "roundedCornerRadius"; "text": "text"; "textStyle": "textStyle"; "type": "type"; "value": "value"; }, {}, never>;
}
/**
 * Pointer Array Directive
 * @private
 */
export declare class PointersDirective extends ArrayBase<PointersDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<PointersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PointersDirective, "ej-circulargauge>e-axes>e-axis>e-pointers", never, {}, {}, ["children"]>;
}
