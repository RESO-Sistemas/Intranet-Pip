import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Sankey } from '@syncfusion/ej2-charts';
import { SankeyNodesCollectionDirective } from './nodes.directive';
import { SankeyLinksCollectionDirective } from './links.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Sankey Component
 * ```html
 * <ejs-sankey></ejs-sankey>
 * ```
 */
export declare class SankeyComponent extends Sankey implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    afterExport: any;
    beforeExport: any;
    beforePrint: any;
    exportCompleted: any;
    labelRendering: any;
    legendItemHover: any;
    legendItemRendering: any;
    linkClick: any;
    linkEnter: any;
    linkLeave: any;
    linkRendering: any;
    load: any;
    loaded: any;
    nodeClick: any;
    nodeEnter: any;
    nodeLeave: any;
    nodeRendering: any;
    sizeChanged: any;
    tooltipRendering: any;
    childNodes: QueryList<SankeyNodesCollectionDirective>;
    childLinks: QueryList<SankeyLinksCollectionDirective>;
    tags: string[];
    tooltip_sankeyNodeTemplate: any;
    tooltip_sankeyLinkTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SankeyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SankeyComponent, "ejs-sankey", never, { "accessibility": "accessibility"; "allowExport": "allowExport"; "animation": "animation"; "background": "background"; "backgroundImage": "backgroundImage"; "border": "border"; "enableExport": "enableExport"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "focusBorderColor": "focusBorderColor"; "focusBorderMargin": "focusBorderMargin"; "focusBorderWidth": "focusBorderWidth"; "height": "height"; "labelSettings": "labelSettings"; "legendSettings": "legendSettings"; "linkStyle": "linkStyle"; "links": "links"; "locale": "locale"; "margin": "margin"; "nodeStyle": "nodeStyle"; "nodes": "nodes"; "orientation": "orientation"; "subTitle": "subTitle"; "subTitleStyle": "subTitleStyle"; "theme": "theme"; "title": "title"; "titleStyle": "titleStyle"; "tooltip": "tooltip"; "width": "width"; }, { "afterExport": "afterExport"; "beforeExport": "beforeExport"; "beforePrint": "beforePrint"; "exportCompleted": "exportCompleted"; "labelRendering": "labelRendering"; "legendItemHover": "legendItemHover"; "legendItemRendering": "legendItemRendering"; "linkClick": "linkClick"; "linkEnter": "linkEnter"; "linkLeave": "linkLeave"; "linkRendering": "linkRendering"; "load": "load"; "loaded": "loaded"; "nodeClick": "nodeClick"; "nodeEnter": "nodeEnter"; "nodeLeave": "nodeLeave"; "nodeRendering": "nodeRendering"; "sizeChanged": "sizeChanged"; "tooltipRendering": "tooltipRendering"; }, ["tooltip_sankeyNodeTemplate", "tooltip_sankeyLinkTemplate", "childNodes", "childLinks"], never>;
}
