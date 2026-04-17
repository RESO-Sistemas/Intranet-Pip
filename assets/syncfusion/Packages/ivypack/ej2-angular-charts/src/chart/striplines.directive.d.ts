import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * StripLine Directive
 * ```html
 * <e-axis>
 * <e-striplines>
 * <e-stripline></e-stripline>
 * </e-striplines>
 * </e-axis>
 * ```
 */
export declare class StripLineDirective extends ComplexBase<StripLineDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * The `border` property allows customization of the border for the strip line.
     * It includes options to set the color and width of the border.
     */
    border: any;
    /**
     * The `color` property specifies the color of the strip line.
     * @default '#808080'
     */
    color: any;
    /**
     * Specifies the pattern of dashes and gaps used to render the strip line.
     * @default null
     * @aspdefaultvalueignore
     */
    dashArray: any;
    /**
     * Specifies the ending value of the strip line.
     * @default null
     * @aspdefaultvalueignore
     */
    end: any;
    /**
     * Defines the position of the strip line text horizontally.
     * Available options are:
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     * @default 'Middle'
     */
    horizontalAlignment: any;
    /**
     * Specifies the URL of the background image for the strip line. The image will be displayed as the background.
     * @default ''
     */
    imageUrl: any;
    /**
     * Specifies whether the strip line is repeated at regular intervals along the axis.
     * @default false
     * @aspdefaultvalueignore
     */
    isRepeat: any;
    /**
     * Specifies whether the strip line is segmented.
     * @default false
     * @aspdefaultvalueignore
     */
    isSegmented: any;
    /**
     * Specifies the opacity for the strip line.
     * @default 1
     */
    opacity: any;
    /**
     * Specifies the interval at which the strip line is repeated.
     * @default null
     * @aspdefaultvalueignore
     */
    repeatEvery: any;
    /**
     * Specifies the maximum value of the interval at which the strip line is repeated.
     * @default null
     * @aspdefaultvalueignore
     */
    repeatUntil: any;
    /**
     * Defines the degree of rotation applied to the text on the strip line.
     * @default null
     * @aspdefaultvalueignore
     */
    rotation: any;
    /**
     * The name of the axis where the strip line segment is applied.
     * @default null
     * @aspdefaultvalueignore
     */
    segmentAxisName: any;
    /**
     * Specifies where a new segment of the strip line on the axis ends.
     * @default null
     * @aspdefaultvalueignore
     */
    segmentEnd: any;
    /**
     * Specifies where a new segment of the strip line on the axis begins.
     * @default null
     * @aspdefaultvalueignore
     */
    segmentStart: any;
    /**
     * Specifies the size of the strip line when starting from the origin.
     * @default null
     * @aspdefaultvalueignore
     */
    size: any;
    /**
     * The `sizeType` property specifies how the size of the strip line is determined.
     * @default Auto
     */
    sizeType: any;
    /**
     * Specifies the starting value of the strip line.
     * @default null
     * @aspdefaultvalueignore
     */
    start: any;
    /**
     * If set to true, the strip line is rendered from the axis origin.
     * @default false
     */
    startFromAxis: any;
    /**
     * Defines the text to be displayed on the strip line.
     * @default ''
     */
    text: any;
    /**
     * The `textStyle` property enables customization of the text appearance on the strip line.
     */
    textStyle: any;
    /**
     * Defines the position of the strip line text vertically.
     * Available options are:
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     * @default 'Middle'
     */
    verticalAlignment: any;
    /**
     * If set to true, the strip line on the axis will render.
     * @default true
     */
    visible: any;
    /**
     * Specifies the order of the strip line.
     * The options are:
     * * Behind: Places the strip line behind the series elements.
     * * Over: Places the strip line over the series elements.
     * @default 'Behind'
     */
    zIndex: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<StripLineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StripLineDirective, "e-axis>e-striplines>e-stripline", never, { "border": "border"; "color": "color"; "dashArray": "dashArray"; "end": "end"; "horizontalAlignment": "horizontalAlignment"; "imageUrl": "imageUrl"; "isRepeat": "isRepeat"; "isSegmented": "isSegmented"; "opacity": "opacity"; "repeatEvery": "repeatEvery"; "repeatUntil": "repeatUntil"; "rotation": "rotation"; "segmentAxisName": "segmentAxisName"; "segmentEnd": "segmentEnd"; "segmentStart": "segmentStart"; "size": "size"; "sizeType": "sizeType"; "start": "start"; "startFromAxis": "startFromAxis"; "text": "text"; "textStyle": "textStyle"; "verticalAlignment": "verticalAlignment"; "visible": "visible"; "zIndex": "zIndex"; }, {}, never>;
}
/**
 * StripLine Array Directive
 * @private
 */
export declare class StripLinesDirective extends ArrayBase<StripLinesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<StripLinesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StripLinesDirective, "e-axis>e-striplines", never, {}, {}, ["children"]>;
}
