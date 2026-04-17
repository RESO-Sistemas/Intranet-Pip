import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to define the bubble color mapping in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-colorMappings>
 * <e-colorMapping>
 * </e-colorMapping>
 * </e-colorMappings>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class ColorMappingDirective extends ComplexBase<ColorMappingDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Gets or sets the color for the color-mapping in maps.
     * @default null
     */
    color: any;
    /**
     * Gets or sets the value from where the range for the color-mapping starts.
     * @aspdefaultvalueignore
     * @default null
     */
    from: any;
    /**
     * Gets or sets the label for the color-mapping to display in the legend item text.
     * @default null
     */
    label: any;
    /**
     * Gets or sets the maximum opacity for the color-mapping in maps.
     * @default null
     */
    maxOpacity: any;
    /**
     * Gets or sets the minimum opacity for the color-mapping in maps.
     * @default null
     */
    minOpacity: any;
    /**
     * Enables or disables the visibility of legend for the corresponding color-mapped shapes in maps.
     * @default true
     */
    showLegend: any;
    /**
     * Gets or sets the value to where the range for the color-mapping ends.
     * @aspdefaultvalueignore
     * @default null
     */
    to: any;
    /**
     * Gets or sets the value from the data source to map the corresponding colors to the shapes.
     * @default null
     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorMappingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColorMappingDirective, "e-bubbleSettings>e-colorMappings>e-colorMapping", never, { "color": "color"; "from": "from"; "label": "label"; "maxOpacity": "maxOpacity"; "minOpacity": "minOpacity"; "showLegend": "showLegend"; "to": "to"; "value": "value"; }, {}, never>;
}
/**
 * ColorMapping Array Directive
 * @private
 */
export declare class ColorMappingsDirective extends ArrayBase<ColorMappingsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorMappingsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColorMappingsDirective, "e-bubbleSettings>e-colorMappings", never, {}, {}, ["children"]>;
}
