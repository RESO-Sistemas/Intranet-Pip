import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to configure and render level leaf items in the treemap.
 * ```html
 * <e-levels>
 * <e-level></e-level>
 * </e-levels>
 * ```
 */
export declare class LevelDirective extends ComplexBase<LevelDirective> {
    private viewContainerRef;
    directivePropList: any;
    childColorMapping: any;
    tags: string[];
    /**
     * Enables or disables the automatic filling of the colors from the palette in the items of the treemap.
     * @default false
     */
    autoFill: any;
    /**
     * Sets and gets the options for customizing the color and width of the border of
     * the level leaf items of the treemap.
     */
    border: any;
    /**
     * Sets and gets the options for customizing the color-mapping of the level leaf items in the treemap.
     */
    colorMapping: any;
    /**
     * Sets and gets the fill color of the level leaf item in the treemap.
     * @default null
     */
    fill: any;
    /**
     * Sets and gets the gap between the level leaf items in the treemap.
     * @default 0
     */
    groupGap: any;
    /**
     * Sets and gets the padding of level leaf items in the treemap.
     * @default 10
     */
    groupPadding: any;
    /**
     * Sets and gets the value path from the data source in the treemap to render the item.
     * @default null
     */
    groupPath: any;
    /**
     * Sets and gets the alignment of the header of the treemap.
     * @default 'Near'
     */
    headerAlignment: any;
    /**
     * Sets and gets the string to format the header label of the level leaf items in the treemap.
     * @default null
     */
    headerFormat: any;
    /**
     * Sets and gets the height of header in the treemap.
     * @default 20
     */
    headerHeight: any;
    /**
     * Sets and gets the options for customizing the text style of header label of the level leaf item.
     */
    headerStyle: any;
    /**
     * Sets and gets the opacity in the level leaf item of the treemap.
     * @default 1
     */
    opacity: any;
    /**
     * Shows or hides the header in level leaf item of the treemap.
     * @default true
     */
    showHeader: any;
    /**
     * Sets and gets the options for customizing the template position of the treemap.
     * @default 'TopLeft'
     */
    templatePosition: any;
    /**
     * Sets and gets the template for header in the treemap.
     * @default null
     * @asptype string
     */
    headerTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<LevelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LevelDirective, "e-levels>e-level", never, { "autoFill": "autoFill"; "border": "border"; "colorMapping": "colorMapping"; "fill": "fill"; "groupGap": "groupGap"; "groupPadding": "groupPadding"; "groupPath": "groupPath"; "headerAlignment": "headerAlignment"; "headerFormat": "headerFormat"; "headerHeight": "headerHeight"; "headerStyle": "headerStyle"; "headerTemplate": "headerTemplate"; "opacity": "opacity"; "showHeader": "showHeader"; "templatePosition": "templatePosition"; }, {}, ["headerTemplate", "childColorMapping"]>;
}
/**
 * Level Array Directive
 * @private
 */
export declare class LevelsDirective extends ArrayBase<LevelsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<LevelsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LevelsDirective, "ej-treemap>e-levels", never, {}, {}, ["children"]>;
}
