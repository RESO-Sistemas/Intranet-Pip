import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * MultiLevelLabel Directive
 * ```html
 * <e-axis>
 * <e-multilevellabels>
 * <e-multilevellabel></e-multilevellabel>
 * </e-multilevellabels>
 * </e-axis>
 * ```
 */
export declare class MultiLevelLabelDirective extends ComplexBase<MultiLevelLabelDirective> {
    private viewContainerRef;
    directivePropList: any;
    childCategories: any;
    tags: string[];
    /**
     * Defines the position of the multi-level labels.
     * The available options are:
     * * Near: Places the multi-level labels close to the chart elements.
     * * Center: Positions the multi-level labels in the center of the chart elements.
     * * Far: Places the multi-level labels further from the chart elements.
     * @default 'Center'
     */
    alignment: any;
    /**
     * The `border` property allows customization of the border for multi-level labels.
     * It includes options to set the color, width, and type of the border.
     */
    border: any;
    /**
     * Configures multi-level categories for multi-level labels.
     */
    categories: any;
    /**
     * Defines the text overflow behavior for multi-level labels.
     * The available options are:
     * * Trim: Trims the text that overflows for multi-level labels.
     * * Wrap: Wraps the text that overflows for multi-level labels.
     * * None: No text overflow handling for multi-level labels.
     * @default 'Wrap'
     */
    overflow: any;
    /**
     * Options to customize the multi-level labels.
     */
    textStyle: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiLevelLabelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MultiLevelLabelDirective, "e-axis>e-multilevellabels>e-multilevellabel", never, { "alignment": "alignment"; "border": "border"; "categories": "categories"; "overflow": "overflow"; "textStyle": "textStyle"; }, {}, ["childCategories"]>;
}
/**
 * MultiLevelLabel Array Directive
 * @private
 */
export declare class MultiLevelLabelsDirective extends ArrayBase<MultiLevelLabelsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiLevelLabelsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MultiLevelLabelsDirective, "e-axis>e-multilevellabels", never, {}, {}, ["children"]>;
}
