import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to define the bubbles in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class BubbleDirective extends ComplexBase<BubbleDirective> {
    private viewContainerRef;
    directivePropList: any;
    childColorMapping: any;
    tags: string[];
    /**
     * Gets or sets the delay in animation for the bubbles in maps.
     * @default 0
     */
    animationDelay: any;
    /**
     * Gets or sets the duration for the animation of the bubbles in maps.
     * @default 1000
     */
    animationDuration: any;
    /**
     * Gets or sets the options to customize the style properties of the border for the bubbles in maps.
     */
    border: any;
    /**
     * Gets or sets the type of the bubble in maps.
     * @default Circle
     */
    bubbleType: any;
    /**
     * Gets or sets the color-mapping for the bubbles in maps.
     * @default []
     */
    colorMapping: any;
    /**
     * Gets or sets the field name from the data source of bubble settings to set the color for each bubble in maps.
     * @default null
     */
    colorValuePath: any;
    /**
     * Gets or sets the data source for the bubble.
     * The data source must contain the size value of the bubble that can be bound to the bubble
     * of the maps using the `valuePath` property in the `bubbleSettings`.
     * The data source can contain data such as color and other informations that can be bound to the bubble and tooltip of the bubble.
     * @isobservable true
     * @default []
     */
    dataSource: any;
    /**
     * Gets or sets the color for the bubbles in maps.
     * @default ''
     */
    fill: any;
    /**
     * Gets or sets the options to customize the highlight of the bubbles in maps.
     */
    highlightSettings: any;
    /**
     * Gets or sets the maximum radius for the bubbles in maps.
     * @default 20
     */
    maxRadius: any;
    /**
     * Gets or sets the minimum radius for the bubbles in maps.
     * @default 10
     */
    minRadius: any;
    /**
     * Gets or sets the opacity of the bubbles in maps.
     * @default 1
     */
    opacity: any;
    /**
     * Gets or sets the query to select particular data from the bubble data source.
     * This property is applicable only when the data source is created by data manager.
     * @default null
     */
    query: any;
    /**
     * Gets or sets the options to customize the selection of the bubbles in maps.
     */
    selectionSettings: any;
    /**
     * Gets or sets the options to customize the tooltip of the bubbles in maps.
     */
    tooltipSettings: any;
    /**
     * Gets or sets the field name from the data source of bubble settings based on which the bubbles are rendered on the maps.
     * @default null
     */
    valuePath: any;
    /**
     * Enables or disables the visibility of the bubbles in maps.
     * @default false
     */
    visible: any;
    tooltipSettings_template: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BubbleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BubbleDirective, "e-layer>e-bubbleSettings>e-bubbleSetting", never, { "animationDelay": "animationDelay"; "animationDuration": "animationDuration"; "border": "border"; "bubbleType": "bubbleType"; "colorMapping": "colorMapping"; "colorValuePath": "colorValuePath"; "dataSource": "dataSource"; "fill": "fill"; "highlightSettings": "highlightSettings"; "maxRadius": "maxRadius"; "minRadius": "minRadius"; "opacity": "opacity"; "query": "query"; "selectionSettings": "selectionSettings"; "tooltipSettings": "tooltipSettings"; "valuePath": "valuePath"; "visible": "visible"; }, {}, ["tooltipSettings_template", "childColorMapping"]>;
}
/**
 * Bubble Array Directive
 * @private
 */
export declare class BubblesDirective extends ArrayBase<BubblesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<BubblesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BubblesDirective, "e-layer>e-bubbleSettings", never, {}, {}, ["children"]>;
}
