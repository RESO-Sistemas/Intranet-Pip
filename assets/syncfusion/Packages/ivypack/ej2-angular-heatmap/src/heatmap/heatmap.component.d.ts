import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { HeatMap } from '@syncfusion/ej2-heatmap';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular HeatMap component.
 * This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
 * ```html
 * <ejs-heatmap></ejs-heatmap>
 * ```
 */
export declare class HeatMapComponent extends HeatMap implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    cellClick: any;
    cellDoubleClick: any;
    cellRender: any;
    cellSelected: any;
    created: any;
    legendRender: any;
    load: any;
    loaded: any;
    resized: any;
    tooltipRender: any;
    tags: string[];
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeatMapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeatMapComponent, "ejs-heatmap", never, { "allowSelection": "allowSelection"; "backgroundColor": "backgroundColor"; "cellSettings": "cellSettings"; "dataSource": "dataSource"; "dataSourceSettings": "dataSourceSettings"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enableMultiSelect": "enableMultiSelect"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "height": "height"; "legendSettings": "legendSettings"; "locale": "locale"; "margin": "margin"; "paletteSettings": "paletteSettings"; "renderingMode": "renderingMode"; "showTooltip": "showTooltip"; "theme": "theme"; "titleSettings": "titleSettings"; "tooltipSettings": "tooltipSettings"; "width": "width"; "xAxis": "xAxis"; "yAxis": "yAxis"; }, { "cellClick": "cellClick"; "cellDoubleClick": "cellDoubleClick"; "cellRender": "cellRender"; "cellSelected": "cellSelected"; "created": "created"; "legendRender": "legendRender"; "load": "load"; "loaded": "loaded"; "resized": "resized"; "tooltipRender": "tooltipRender"; }, never, never>;
}
