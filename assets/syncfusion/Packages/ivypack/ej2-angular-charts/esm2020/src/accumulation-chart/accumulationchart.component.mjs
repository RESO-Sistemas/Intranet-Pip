import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { AccumulationChart } from '@syncfusion/ej2-charts';
import { Template } from '@syncfusion/ej2-angular-base';
import { AccumulationSeriesCollectionDirective } from './series.directive';
import { AccumulationAnnotationsDirective } from './annotations.directive';
import * as i0 from "@angular/core";
export const inputs = ['accessibility', 'allowExport', 'annotations', 'background', 'backgroundImage', 'border', 'center', 'centerLabel', 'currencyCode', 'dataSource', 'enableAnimation', 'enableBorderOnMouseMove', 'enableExport', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSmartLabels', 'focusBorderColor', 'focusBorderMargin', 'focusBorderWidth', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'isMultiSelect', 'legendSettings', 'locale', 'margin', 'noDataTemplate', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'subTitle', 'subTitleStyle', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width'];
export const outputs = ['afterExport', 'animationComplete', 'annotationRender', 'beforeExport', 'beforePrint', 'beforeResize', 'chartDoubleClick', 'chartMouseClick', 'chartMouseDown', 'chartMouseLeave', 'chartMouseMove', 'chartMouseUp', 'legendClick', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'selectionComplete', 'seriesRender', 'textRender', 'tooltipRender', 'dataSourceChange'];
export const twoWays = ['dataSource'];
/**
 * AccumulationChart Component
 * ```html
 * <ejs-accumulationchart></ejs-accumulationchart>
 * ```
 */
let AccumulationChartComponent = class AccumulationChartComponent extends AccumulationChart {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['series', 'annotations'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('ChartsPieSeries');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsFunnelSeries');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsPyramidSeries');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsAccumulationTooltip');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsAccumulationLegend');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsAccumulationSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsAccumulationHighlight');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsAccumulationDataLabel');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsAccumulationAnnotation');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ChartsExport');
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
        this.tagObjects[0].instance = this.childSeries;
        if (this.childAnnotations) {
            this.tagObjects[1].instance = this.childAnnotations;
        }
        this.context.ngAfterContentChecked(this);
    }
};
AccumulationChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccumulationChartComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AccumulationChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: AccumulationChartComponent, selector: "ejs-accumulationchart", inputs: { accessibility: "accessibility", allowExport: "allowExport", annotations: "annotations", background: "background", backgroundImage: "backgroundImage", border: "border", center: "center", centerLabel: "centerLabel", currencyCode: "currencyCode", dataSource: "dataSource", enableAnimation: "enableAnimation", enableBorderOnMouseMove: "enableBorderOnMouseMove", enableExport: "enableExport", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableSmartLabels: "enableSmartLabels", focusBorderColor: "focusBorderColor", focusBorderMargin: "focusBorderMargin", focusBorderWidth: "focusBorderWidth", height: "height", highlightColor: "highlightColor", highlightMode: "highlightMode", highlightPattern: "highlightPattern", isMultiSelect: "isMultiSelect", legendSettings: "legendSettings", locale: "locale", margin: "margin", noDataTemplate: "noDataTemplate", selectedDataIndexes: "selectedDataIndexes", selectionMode: "selectionMode", selectionPattern: "selectionPattern", series: "series", subTitle: "subTitle", subTitleStyle: "subTitleStyle", theme: "theme", title: "title", titleStyle: "titleStyle", tooltip: "tooltip", useGroupingSeparator: "useGroupingSeparator", width: "width" }, outputs: { afterExport: "afterExport", animationComplete: "animationComplete", annotationRender: "annotationRender", beforeExport: "beforeExport", beforePrint: "beforePrint", beforeResize: "beforeResize", chartDoubleClick: "chartDoubleClick", chartMouseClick: "chartMouseClick", chartMouseDown: "chartMouseDown", chartMouseLeave: "chartMouseLeave", chartMouseMove: "chartMouseMove", chartMouseUp: "chartMouseUp", legendClick: "legendClick", legendRender: "legendRender", load: "load", loaded: "loaded", pointClick: "pointClick", pointMove: "pointMove", pointRender: "pointRender", resized: "resized", selectionComplete: "selectionComplete", seriesRender: "seriesRender", textRender: "textRender", tooltipRender: "tooltipRender", dataSourceChange: "dataSourceChange" }, queries: [{ propertyName: "tooltip_template", first: true, predicate: ["tooltipTemplate"], descendants: true }, { propertyName: "legendSettings_template", first: true, predicate: ["legendSettingsTemplate"], descendants: true }, { propertyName: "childSeries", first: true, predicate: AccumulationSeriesCollectionDirective, descendants: true }, { propertyName: "childAnnotations", first: true, predicate: AccumulationAnnotationsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], AccumulationChartComponent.prototype, "tooltip_template", void 0);
__decorate([
    Template()
], AccumulationChartComponent.prototype, "legendSettings_template", void 0);
AccumulationChartComponent = __decorate([
    ComponentMixins([ComponentBase])
], AccumulationChartComponent);
export { AccumulationChartComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccumulationChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-accumulationchart',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childSeries: new ContentChild(AccumulationSeriesCollectionDirective),
                        childAnnotations: new ContentChild(AccumulationAnnotationsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { tooltip_template: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }], legendSettings_template: [{
                type: ContentChild,
                args: ['legendSettingsTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjdW11bGF0aW9uY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FjY3VtdWxhdGlvbi1jaGFydC9hY2N1bXVsYXRpb25jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRTNFLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGVBQWUsRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxpQkFBaUIsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLGlCQUFpQixFQUFDLHlCQUF5QixFQUFDLGNBQWMsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsbUJBQW1CLEVBQUMsa0JBQWtCLEVBQUMsbUJBQW1CLEVBQUMsa0JBQWtCLEVBQUMsUUFBUSxFQUFDLGdCQUFnQixFQUFDLGVBQWUsRUFBQyxrQkFBa0IsRUFBQyxlQUFlLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxnQkFBZ0IsRUFBQyxxQkFBcUIsRUFBQyxlQUFlLEVBQUMsa0JBQWtCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxlQUFlLEVBQUMsT0FB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SUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQXVCLENBQUM7U0FDOUQ7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FJSixDQUFBO3VIQTVJWSwwQkFBMEI7MkdBQTFCLDBCQUEwQixpeUVBTEQscUNBQXFDLG1GQUNoQyxnQ0FBZ0MsdUVBSjdELEVBQUU7QUF5Q1o7SUFEQyxRQUFRLEVBQUU7b0VBQ2tCO0FBRzdCO0lBREMsUUFBUSxFQUFFOzJFQUN5QjtBQXBDM0IsMEJBQTBCO0lBRHRDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLDBCQUEwQixDQTRJdEM7U0E1SVksMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBWnRDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVyxFQUFFLElBQUksWUFBWSxDQUFDLHFDQUFxQyxDQUFDO3dCQUNwRSxnQkFBZ0IsRUFBRSxJQUFJLFlBQVksQ0FBQyxnQ0FBZ0MsQ0FBQztxQkFDdkU7aUJBQ0o7K0tBbUNVLGdCQUFnQjtzQkFGdEIsWUFBWTt1QkFBQyxpQkFBaUI7Z0JBS3hCLHVCQUF1QjtzQkFGN0IsWUFBWTt1QkFBQyx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBBY2N1bXVsYXRpb25DaGFydCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1jaGFydHMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IEFjY3VtdWxhdGlvblNlcmllc0NvbGxlY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL3Nlcmllcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWNjdW11bGF0aW9uQW5ub3RhdGlvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2Fubm90YXRpb25zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhY2Nlc3NpYmlsaXR5JywnYWxsb3dFeHBvcnQnLCdhbm5vdGF0aW9ucycsJ2JhY2tncm91bmQnLCdiYWNrZ3JvdW5kSW1hZ2UnLCdib3JkZXInLCdjZW50ZXInLCdjZW50ZXJMYWJlbCcsJ2N1cnJlbmN5Q29kZScsJ2RhdGFTb3VyY2UnLCdlbmFibGVBbmltYXRpb24nLCdlbmFibGVCb3JkZXJPbk1vdXNlTW92ZScsJ2VuYWJsZUV4cG9ydCcsJ2VuYWJsZUh0bWxTYW5pdGl6ZXInLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2VuYWJsZVNtYXJ0TGFiZWxzJywnZm9jdXNCb3JkZXJDb2xvcicsJ2ZvY3VzQm9yZGVyTWFyZ2luJywnZm9jdXNCb3JkZXJXaWR0aCcsJ2hlaWdodCcsJ2hpZ2hsaWdodENvbG9yJywnaGlnaGxpZ2h0TW9kZScsJ2hpZ2hsaWdodFBhdHRlcm4nLCdpc011bHRpU2VsZWN0JywnbGVnZW5kU2V0dGluZ3MnLCdsb2NhbGUnLCdtYXJnaW4nLCdub0RhdGFUZW1wbGF0ZScsJ3NlbGVjdGVkRGF0YUluZGV4ZXMnLCdzZWxlY3Rpb25Nb2RlJywnc2VsZWN0aW9uUGF0dGVybicsJ3NlcmllcycsJ3N1YlRpdGxlJywnc3ViVGl0bGVTdHlsZScsJ3RoZW1lJywndGl0bGUnLCd0aXRsZVN0eWxlJywndG9vbHRpcCcsJ3VzZUdyb3VwaW5nU2VwYXJhdG9yJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWZ0ZXJFeHBvcnQnLCdhbmltYXRpb25Db21wbGV0ZScsJ2Fubm90YXRpb25SZW5kZXInLCdiZWZvcmVFeHBvcnQnLCdiZWZvcmVQcmludCcsJ2JlZm9yZVJlc2l6ZScsJ2NoYXJ0RG91YmxlQ2xpY2snLCdjaGFydE1vdXNlQ2xpY2snLCdjaGFydE1vdXNlRG93bicsJ2NoYXJ0TW91c2VMZWF2ZScsJ2NoYXJ0TW91c2VNb3ZlJywnY2hhcnRNb3VzZVVwJywnbGVnZW5kQ2xpY2snLCdsZWdlbmRSZW5kZXInLCdsb2FkJywnbG9hZGVkJywncG9pbnRDbGljaycsJ3BvaW50TW92ZScsJ3BvaW50UmVuZGVyJywncmVzaXplZCcsJ3NlbGVjdGlvbkNvbXBsZXRlJywnc2VyaWVzUmVuZGVyJywndGV4dFJlbmRlcicsJ3Rvb2x0aXBSZW5kZXInLCdkYXRhU291cmNlQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ2RhdGFTb3VyY2UnXTtcblxuLyoqXG4gKiBBY2N1bXVsYXRpb25DaGFydCBDb21wb25lbnRcbiAqIGBgYGh0bWxcbiAqIDxlanMtYWNjdW11bGF0aW9uY2hhcnQ+PC9lanMtYWNjdW11bGF0aW9uY2hhcnQ+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtYWNjdW11bGF0aW9uY2hhcnQnLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRTZXJpZXM6IG5ldyBDb250ZW50Q2hpbGQoQWNjdW11bGF0aW9uU2VyaWVzQ29sbGVjdGlvbkRpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZEFubm90YXRpb25zOiBuZXcgQ29udGVudENoaWxkKEFjY3VtdWxhdGlvbkFubm90YXRpb25zRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBBY2N1bXVsYXRpb25DaGFydENvbXBvbmVudCBleHRlbmRzIEFjY3VtdWxhdGlvbkNoYXJ0IGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFmdGVyRXhwb3J0OiBhbnk7XG5cdGFuaW1hdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGFubm90YXRpb25SZW5kZXI6IGFueTtcblx0YmVmb3JlRXhwb3J0OiBhbnk7XG5cdGJlZm9yZVByaW50OiBhbnk7XG5cdGJlZm9yZVJlc2l6ZTogYW55O1xuXHRjaGFydERvdWJsZUNsaWNrOiBhbnk7XG5cdGNoYXJ0TW91c2VDbGljazogYW55O1xuXHRjaGFydE1vdXNlRG93bjogYW55O1xuXHRjaGFydE1vdXNlTGVhdmU6IGFueTtcblx0Y2hhcnRNb3VzZU1vdmU6IGFueTtcblx0Y2hhcnRNb3VzZVVwOiBhbnk7XG5cdGxlZ2VuZENsaWNrOiBhbnk7XG5cdGxlZ2VuZFJlbmRlcjogYW55O1xuXHRsb2FkOiBhbnk7XG5cdGxvYWRlZDogYW55O1xuXHRwb2ludENsaWNrOiBhbnk7XG5cdHBvaW50TW92ZTogYW55O1xuXHRwb2ludFJlbmRlcjogYW55O1xuXHRyZXNpemVkOiBhbnk7XG5cdHNlbGVjdGlvbkNvbXBsZXRlOiBhbnk7XG5cdHNlcmllc1JlbmRlcjogYW55O1xuXHR0ZXh0UmVuZGVyOiBhbnk7XG5cdHRvb2x0aXBSZW5kZXI6IGFueTtcblx0cHVibGljIGRhdGFTb3VyY2VDaGFuZ2U6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRTZXJpZXM6IFF1ZXJ5TGlzdDxBY2N1bXVsYXRpb25TZXJpZXNDb2xsZWN0aW9uRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgY2hpbGRBbm5vdGF0aW9uczogUXVlcnlMaXN0PEFjY3VtdWxhdGlvbkFubm90YXRpb25zRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3NlcmllcycsICdhbm5vdGF0aW9ucyddO1xuICAgIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdG9vbHRpcF90ZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2xlZ2VuZFNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGxlZ2VuZFNldHRpbmdzX3RlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnQ2hhcnRzUGllU2VyaWVzJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdDaGFydHNGdW5uZWxTZXJpZXMnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0NoYXJ0c1B5cmFtaWRTZXJpZXMnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0NoYXJ0c0FjY3VtdWxhdGlvblRvb2x0aXAnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0NoYXJ0c0FjY3VtdWxhdGlvbkxlZ2VuZCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnQ2hhcnRzQWNjdW11bGF0aW9uU2VsZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdDaGFydHNBY2N1bXVsYXRpb25IaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0NoYXJ0c0FjY3VtdWxhdGlvbkRhdGFMYWJlbCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnQ2hhcnRzQWNjdW11bGF0aW9uQW5ub3RhdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnQ2hhcnRzRXhwb3J0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuY29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdPYmplY3RzWzBdLmluc3RhbmNlID0gdGhpcy5jaGlsZFNlcmllcztcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRBbm5vdGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbMV0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQW5ub3RhdGlvbnMgYXMgYW55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==