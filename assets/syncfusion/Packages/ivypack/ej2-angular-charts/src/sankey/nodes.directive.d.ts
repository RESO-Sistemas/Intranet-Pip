import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Sankey Nodes Directive
 * ```html
 * <e-sankey-nodes>
 * <e-sankey-node></e-sankey-node>
 * </e-sankey-nodes>
 * ```
 */
export declare class SankeyNodeDirective extends ComplexBase<SankeyNodeDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the color applied to the node.
     * The node color is applied based on the current theme if this property is not specified.
     * @default null
     */
    color: any;
    /**
     * A unique string identifier for the node.
     * Ensure the `id` is unique across all nodes in the Sankey chart.
     * @default null
     */
    id: any;
    /**
     * Options for customizing the data label of the Sankey node.
     */
    label: any;
    /**
     * Specifies a custom offset position for the node.
     * This allows shifting the node horizontally (in Horizontal orientation) or vertically (in Vertical orientation), relative to its computed layout position.
     * @default 0
     */
    offset: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<SankeyNodeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SankeyNodeDirective, "e-sankey-nodes>e-sankey-node", never, { "color": "color"; "id": "id"; "label": "label"; "offset": "offset"; }, {}, never>;
}
/**
 * SankeyNode Array Directive
 * @private
 */
export declare class SankeyNodesCollectionDirective extends ArrayBase<SankeyNodesCollectionDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SankeyNodesCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SankeyNodesCollectionDirective, "ejs-sankey>e-sankey-nodes", never, {}, {}, ["children"]>;
}
