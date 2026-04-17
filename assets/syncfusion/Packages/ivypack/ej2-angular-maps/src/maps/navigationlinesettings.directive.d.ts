import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to define the navigation lines in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-navigationLineSettings>
 * <e-navigationLineSetting>
 * </e-navigationLineSetting>
 * </e-navigationLineSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class NavigationLineDirective extends ComplexBase<NavigationLineDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Gets or sets the angle of the curve connecting different locations in maps.
     * @default 0
     */
    angle: any;
    /**
     * Gets or sets the options to customize the arrow for the navigation line in maps.
     */
    arrowSettings: any;
    /**
     * Gets or sets the color for the navigation lines in maps.
     * @default 'black'
     */
    color: any;
    /**
     * Gets or sets the dash-array for the navigation lines drawn in maps.
     * @default ''
     */
    dashArray: any;
    /**
     * Gets or sets the highlight settings of the navigation line in maps.
     */
    highlightSettings: any;
    /**
     * Gets or sets the latitude value for the navigation lines to be drawn in maps.
     * @default []
     */
    latitude: any;
    /**
     * Gets or sets the longitude for the navigation lines to be drawn in maps.
     * @default []
     */
    longitude: any;
    /**
     * Gets or sets the selection settings of the navigation line in maps.
     */
    selectionSettings: any;
    /**
     * Enables or disables the navigation lines to be drawn in maps.
     * @default false
     */
    visible: any;
    /**
     * Gets or sets the width of the navigation lines in maps.
     * @default 1
     */
    width: any;
    tooltipSettings_template: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationLineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationLineDirective, "e-layer>e-navigationLineSettings>e-navigationLineSetting", never, { "angle": "angle"; "arrowSettings": "arrowSettings"; "color": "color"; "dashArray": "dashArray"; "highlightSettings": "highlightSettings"; "latitude": "latitude"; "longitude": "longitude"; "selectionSettings": "selectionSettings"; "visible": "visible"; "width": "width"; }, {}, ["tooltipSettings_template"]>;
}
/**
 * NavigationLine Array Directive
 * @private
 */
export declare class NavigationLinesDirective extends ArrayBase<NavigationLinesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationLinesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationLinesDirective, "e-layer>e-navigationLineSettings", never, {}, {}, ["children"]>;
}
