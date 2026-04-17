import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Sankey Links Directive
 * ```html
 * <e-sankey-links>
 * <e-sankey-link></e-sankey-link>
 * </e-sankey-links>
 * ```
 */
export declare class SankeyLinkDirective extends ComplexBase<SankeyLinkDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the unique identifier of the source node for this
     * link.
     * This should match the `id` of an existing Sankey node.
     * @default null
     */
    sourceId: any;
    /**
     * Specifies the unique identifier of the target node for this link.
     * This should match the `id` of an existing Sankey node.
     * @default null
     */
    targetId: any;
    /**
     * Defines the weight or value of the link.
     * This determines the thickness of the link in the Sankey diagram.
     * @default null
     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<SankeyLinkDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SankeyLinkDirective, "e-sankey-links>e-sankey-link", never, { "sourceId": "sourceId"; "targetId": "targetId"; "value": "value"; }, {}, never>;
}
/**
 * SankeyLink Array Directive
 * @private
 */
export declare class SankeyLinksCollectionDirective extends ArrayBase<SankeyLinksCollectionDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SankeyLinksCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SankeyLinksCollectionDirective, "ejs-sankey>e-sankey-links", never, {}, {}, ["children"]>;
}
