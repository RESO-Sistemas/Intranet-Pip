import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Sankey } from '@syncfusion/ej2-charts';
import { Template } from '@syncfusion/ej2-angular-base';
import { SankeyNodesCollectionDirective } from './nodes.directive';
import { SankeyLinksCollectionDirective } from './links.directive';
import * as i0 from "@angular/core";
export const inputs = ['accessibility', 'allowExport', 'animation', 'background', 'backgroundImage', 'border', 'enableExport', 'enablePersistence', 'enableRtl', 'focusBorderColor', 'focusBorderMargin', 'focusBorderWidth', 'height', 'labelSettings', 'legendSettings', 'linkStyle', 'links', 'locale', 'margin', 'nodeStyle', 'nodes', 'orientation', 'subTitle', 'subTitleStyle', 'theme', 'title', 'titleStyle', 'tooltip', 'width'];
export const outputs = ['afterExport', 'beforeExport', 'beforePrint', 'exportCompleted', 'labelRendering', 'legendItemHover', 'legendItemRendering', 'linkClick', 'linkEnter', 'linkLeave', 'linkRendering', 'load', 'loaded', 'nodeClick', 'nodeEnter', 'nodeLeave', 'nodeRendering', 'sizeChanged', 'tooltipRendering'];
export const twoWays = [''];
/**
 * Sankey Component
 * ```html
 * <ejs-sankey></ejs-sankey>
 * ```
 */
let SankeyComponent = class SankeyComponent extends Sankey {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['nodes', 'links'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('ChartsSankeyLegend');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsSankeyTooltip');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsSankeyHighlight');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsSankeyExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childNodes;
        if (this.childLinks) {
            this.tagObjects[1].instance = this.childLinks;
        }
        this.context.ngAfterContentChecked(this);
    }
};
SankeyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SankeyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SankeyComponent, selector: "ejs-sankey", inputs: { accessibility: "accessibility", allowExport: "allowExport", animation: "animation", background: "background", backgroundImage: "backgroundImage", border: "border", enableExport: "enableExport", enablePersistence: "enablePersistence", enableRtl: "enableRtl", focusBorderColor: "focusBorderColor", focusBorderMargin: "focusBorderMargin", focusBorderWidth: "focusBorderWidth", height: "height", labelSettings: "labelSettings", legendSettings: "legendSettings", linkStyle: "linkStyle", links: "links", locale: "locale", margin: "margin", nodeStyle: "nodeStyle", nodes: "nodes", orientation: "orientation", subTitle: "subTitle", subTitleStyle: "subTitleStyle", theme: "theme", title: "title", titleStyle: "titleStyle", tooltip: "tooltip", width: "width" }, outputs: { afterExport: "afterExport", beforeExport: "beforeExport", beforePrint: "beforePrint", exportCompleted: "exportCompleted", labelRendering: "labelRendering", legendItemHover: "legendItemHover", legendItemRendering: "legendItemRendering", linkClick: "linkClick", linkEnter: "linkEnter", linkLeave: "linkLeave", linkRendering: "linkRendering", load: "load", loaded: "loaded", nodeClick: "nodeClick", nodeEnter: "nodeEnter", nodeLeave: "nodeLeave", nodeRendering: "nodeRendering", sizeChanged: "sizeChanged", tooltipRendering: "tooltipRendering" }, queries: [{ propertyName: "tooltip_sankeyNodeTemplate", first: true, predicate: ["tooltipSankeyNodeTemplate"], descendants: true }, { propertyName: "tooltip_sankeyLinkTemplate", first: true, predicate: ["tooltipSankeyLinkTemplate"], descendants: true }, { propertyName: "childNodes", first: true, predicate: SankeyNodesCollectionDirective, descendants: true }, { propertyName: "childLinks", first: true, predicate: SankeyLinksCollectionDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], SankeyComponent.prototype, "tooltip_sankeyNodeTemplate", void 0);
__decorate([
    Template()
], SankeyComponent.prototype, "tooltip_sankeyLinkTemplate", void 0);
SankeyComponent = __decorate([
    ComponentMixins([ComponentBase])
], SankeyComponent);
export { SankeyComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-sankey',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childNodes: new ContentChild(SankeyNodesCollectionDirective),
                        childLinks: new ContentChild(SankeyLinksCollectionDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { tooltip_sankeyNodeTemplate: [{
                type: ContentChild,
                args: ['tooltipSankeyNodeTemplate']
            }], tooltip_sankeyLinkTemplate: [{
                type: ContentChild,
                args: ['tooltipSankeyLinkTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fua2V5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zYW5rZXkvc2Fua2V5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRW5FLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGVBQWUsRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFDLFlBQVksRUFBQyxpQkFBaUIsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxrQkFBa0IsRUFBQyxtQkFBbUIsRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsZUFBZSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN6WixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxhQUFhLEVBQUMsY0FBYyxFQUFDLGFBQWEsRUFBQyxpQkFBaUIsRUFBQyxnQkFBZ0IsRUFBQyxpQkFBaUIsRUFBQyxxQkFBcUIsRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbFQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFdEM7Ozs7O0dBS0c7SUFhVSxlQUFlLFNBQWYsZUFBZ0IsU0FBUSxNQUFNO0lBZ0N2QyxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUm5JLFNBQUksR0FBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQVV2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDbEQsSUFBSTtZQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEQsSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakM7U0FDSjtRQUFDLE1BQU0sR0FBRztRQUVmLElBQUk7WUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25ELElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ2pDO1NBQ0o7UUFBQyxNQUFNLEdBQUc7UUFFZixJQUFJO1lBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyRCxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNqQztTQUNKO1FBQUMsTUFBTSxHQUFHO1FBRWYsSUFBSTtZQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEQsSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakM7U0FDSjtRQUFDLE1BQU0sR0FBRztRQUVmLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQWlCLENBQUM7U0FDeEQ7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FJSixDQUFBOzRHQTVGWSxlQUFlO2dHQUFmLGVBQWUsbW5EQUxTLDhCQUE4Qiw2RUFDOUIsOEJBQThCLHVFQUpyRCxFQUFFO0FBbUNaO0lBREMsUUFBUSxFQUFFO21FQUM0QjtBQUd2QztJQURDLFFBQVEsRUFBRTttRUFDNEI7QUE5QjlCLGVBQWU7SUFEM0IsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsZUFBZSxDQTRGM0I7U0E1RlksZUFBZTsyRkFBZixlQUFlO2tCQVozQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxVQUFVLEVBQUUsSUFBSSxZQUFZLENBQUMsOEJBQThCLENBQUM7d0JBQzVELFVBQVUsRUFBRSxJQUFJLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQztxQkFDL0Q7aUJBQ0o7K0tBNkJVLDBCQUEwQjtzQkFGaEMsWUFBWTt1QkFBQywyQkFBMkI7Z0JBS2xDLDBCQUEwQjtzQkFGaEMsWUFBWTt1QkFBQywyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBTYW5rZXkgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItY2hhcnRzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBTYW5rZXlOb2Rlc0NvbGxlY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL25vZGVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTYW5rZXlMaW5rc0NvbGxlY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2xpbmtzLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhY2Nlc3NpYmlsaXR5JywnYWxsb3dFeHBvcnQnLCdhbmltYXRpb24nLCdiYWNrZ3JvdW5kJywnYmFja2dyb3VuZEltYWdlJywnYm9yZGVyJywnZW5hYmxlRXhwb3J0JywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdmb2N1c0JvcmRlckNvbG9yJywnZm9jdXNCb3JkZXJNYXJnaW4nLCdmb2N1c0JvcmRlcldpZHRoJywnaGVpZ2h0JywnbGFiZWxTZXR0aW5ncycsJ2xlZ2VuZFNldHRpbmdzJywnbGlua1N0eWxlJywnbGlua3MnLCdsb2NhbGUnLCdtYXJnaW4nLCdub2RlU3R5bGUnLCdub2RlcycsJ29yaWVudGF0aW9uJywnc3ViVGl0bGUnLCdzdWJUaXRsZVN0eWxlJywndGhlbWUnLCd0aXRsZScsJ3RpdGxlU3R5bGUnLCd0b29sdGlwJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWZ0ZXJFeHBvcnQnLCdiZWZvcmVFeHBvcnQnLCdiZWZvcmVQcmludCcsJ2V4cG9ydENvbXBsZXRlZCcsJ2xhYmVsUmVuZGVyaW5nJywnbGVnZW5kSXRlbUhvdmVyJywnbGVnZW5kSXRlbVJlbmRlcmluZycsJ2xpbmtDbGljaycsJ2xpbmtFbnRlcicsJ2xpbmtMZWF2ZScsJ2xpbmtSZW5kZXJpbmcnLCdsb2FkJywnbG9hZGVkJywnbm9kZUNsaWNrJywnbm9kZUVudGVyJywnbm9kZUxlYXZlJywnbm9kZVJlbmRlcmluZycsJ3NpemVDaGFuZ2VkJywndG9vbHRpcFJlbmRlcmluZyddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBTYW5rZXkgQ29tcG9uZW50XG4gKiBgYGBodG1sXG4gKiA8ZWpzLXNhbmtleT48L2Vqcy1zYW5rZXk+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtc2Fua2V5JyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkTm9kZXM6IG5ldyBDb250ZW50Q2hpbGQoU2Fua2V5Tm9kZXNDb2xsZWN0aW9uRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkTGlua3M6IG5ldyBDb250ZW50Q2hpbGQoU2Fua2V5TGlua3NDb2xsZWN0aW9uRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBTYW5rZXlDb21wb25lbnQgZXh0ZW5kcyBTYW5rZXkgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YWZ0ZXJFeHBvcnQ6IGFueTtcblx0YmVmb3JlRXhwb3J0OiBhbnk7XG5cdGJlZm9yZVByaW50OiBhbnk7XG5cdGV4cG9ydENvbXBsZXRlZDogYW55O1xuXHRsYWJlbFJlbmRlcmluZzogYW55O1xuXHRsZWdlbmRJdGVtSG92ZXI6IGFueTtcblx0bGVnZW5kSXRlbVJlbmRlcmluZzogYW55O1xuXHRsaW5rQ2xpY2s6IGFueTtcblx0bGlua0VudGVyOiBhbnk7XG5cdGxpbmtMZWF2ZTogYW55O1xuXHRsaW5rUmVuZGVyaW5nOiBhbnk7XG5cdGxvYWQ6IGFueTtcblx0bG9hZGVkOiBhbnk7XG5cdG5vZGVDbGljazogYW55O1xuXHRub2RlRW50ZXI6IGFueTtcblx0bm9kZUxlYXZlOiBhbnk7XG5cdG5vZGVSZW5kZXJpbmc6IGFueTtcblx0c2l6ZUNoYW5nZWQ6IGFueTtcblx0cHVibGljIHRvb2x0aXBSZW5kZXJpbmc6IGFueTtcbiAgICBwdWJsaWMgY2hpbGROb2RlczogUXVlcnlMaXN0PFNhbmtleU5vZGVzQ29sbGVjdGlvbkRpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkTGlua3M6IFF1ZXJ5TGlzdDxTYW5rZXlMaW5rc0NvbGxlY3Rpb25EaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnbm9kZXMnLCAnbGlua3MnXTtcbiAgICBAQ29udGVudENoaWxkKCd0b29sdGlwU2Fua2V5Tm9kZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0b29sdGlwX3NhbmtleU5vZGVUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBTYW5rZXlMaW5rVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRvb2x0aXBfc2Fua2V5TGlua1RlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnQ2hhcnRzU2Fua2V5TGVnZW5kJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdDaGFydHNTYW5rZXlUb29sdGlwJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdDaGFydHNTYW5rZXlIaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0NoYXJ0c1NhbmtleUV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGROb2RlcztcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRMaW5rcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbMV0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkTGlua3MgYXMgYW55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==