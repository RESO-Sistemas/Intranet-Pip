import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { TreeMap } from '@syncfusion/ej2-treemap';
import { Template } from '@syncfusion/ej2-angular-base';
import { LevelsDirective } from './levels.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowImageExport', 'allowPdfExport', 'allowPrint', 'background', 'border', 'breadcrumbConnector', 'colorValuePath', 'dataSource', 'description', 'drillDownView', 'enableBreadcrumb', 'enableDrillDown', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'equalColorValuePath', 'format', 'height', 'highlightSettings', 'initialDrillDown', 'layoutType', 'leafItemSettings', 'legendSettings', 'levels', 'locale', 'margin', 'palette', 'query', 'rangeColorValuePath', 'renderDirection', 'selectionSettings', 'tabIndex', 'theme', 'titleSettings', 'tooltipSettings', 'useGroupingSeparator', 'weightValuePath', 'width'];
export const outputs = ['beforePrint', 'click', 'doubleClick', 'drillEnd', 'drillStart', 'itemClick', 'itemHighlight', 'itemMove', 'itemRendering', 'itemSelected', 'legendItemRendering', 'legendRendering', 'load', 'loaded', 'mouseMove', 'resize', 'rightClick', 'tooltipRendering'];
export const twoWays = [''];
/**
 * Represents the Angular TreeMap component. It is used to visualize both hierarchical and flat data.
 * ```html
 * <ej-treemap></ej-treemap>
 * ```
 */
let TreeMapComponent = class TreeMapComponent extends TreeMap {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['levels'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('TreeMapTreeMapTooltip');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeMapTreeMapLegend');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeMapTreeMapHighlight');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeMapTreeMapSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeMapPrint');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeMapPdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeMapImageExport');
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
        this.tagObjects[0].instance = this.childLevels;
        this.context.ngAfterContentChecked(this);
    }
};
TreeMapComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeMapComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
TreeMapComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TreeMapComponent, selector: "ejs-treemap", inputs: { allowImageExport: "allowImageExport", allowPdfExport: "allowPdfExport", allowPrint: "allowPrint", background: "background", border: "border", breadcrumbConnector: "breadcrumbConnector", colorValuePath: "colorValuePath", dataSource: "dataSource", description: "description", drillDownView: "drillDownView", enableBreadcrumb: "enableBreadcrumb", enableDrillDown: "enableDrillDown", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", equalColorValuePath: "equalColorValuePath", format: "format", height: "height", highlightSettings: "highlightSettings", initialDrillDown: "initialDrillDown", layoutType: "layoutType", leafItemSettings: "leafItemSettings", legendSettings: "legendSettings", levels: "levels", locale: "locale", margin: "margin", palette: "palette", query: "query", rangeColorValuePath: "rangeColorValuePath", renderDirection: "renderDirection", selectionSettings: "selectionSettings", tabIndex: "tabIndex", theme: "theme", titleSettings: "titleSettings", tooltipSettings: "tooltipSettings", useGroupingSeparator: "useGroupingSeparator", weightValuePath: "weightValuePath", width: "width" }, outputs: { beforePrint: "beforePrint", click: "click", doubleClick: "doubleClick", drillEnd: "drillEnd", drillStart: "drillStart", itemClick: "itemClick", itemHighlight: "itemHighlight", itemMove: "itemMove", itemRendering: "itemRendering", itemSelected: "itemSelected", legendItemRendering: "legendItemRendering", legendRendering: "legendRendering", load: "load", loaded: "loaded", mouseMove: "mouseMove", resize: "resize", rightClick: "rightClick", tooltipRendering: "tooltipRendering" }, queries: [{ propertyName: "tooltipSettings_template", first: true, predicate: ["tooltipSettingsTemplate"], descendants: true }, { propertyName: "leafItemSettings_labelTemplate", first: true, predicate: ["leafItemSettingsLabelTemplate"], descendants: true }, { propertyName: "childLevels", first: true, predicate: LevelsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], TreeMapComponent.prototype, "tooltipSettings_template", void 0);
__decorate([
    Template()
], TreeMapComponent.prototype, "leafItemSettings_labelTemplate", void 0);
TreeMapComponent = __decorate([
    ComponentMixins([ComponentBase])
], TreeMapComponent);
export { TreeMapComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeMapComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-treemap',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childLevels: new ContentChild(LevelsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { tooltipSettings_template: [{
                type: ContentChild,
                args: ['tooltipSettingsTemplate']
            }], leafItemSettings_labelTemplate: [{
                type: ContentChild,
                args: ['leafItemSettingsLabelTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHJlZW1hcC90cmVlbWFwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUVyRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxrQkFBa0IsRUFBQyxnQkFBZ0IsRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxxQkFBcUIsRUFBQyxnQkFBZ0IsRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLGVBQWUsRUFBQyxrQkFBa0IsRUFBQyxpQkFBaUIsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxtQkFBbUIsRUFBQyxrQkFBa0IsRUFBQyxZQUFZLEVBQUMsa0JBQWtCLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxpQkFBaUIsRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxzQkFBc0IsRUFBQyxpQkFBaUIsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNybUIsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsYUFB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QUksQ0FBQyxXQUFXLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBSUosQ0FBQTs2R0E1R1ksZ0JBQWdCO2lHQUFoQixnQkFBZ0IsaTlEQUpTLGVBQWUsdUVBSHZDLEVBQUU7QUFnQ1o7SUFEQyxRQUFRLEVBQUU7a0VBQzBCO0FBR3JDO0lBREMsUUFBUSxFQUFFO3dFQUNnQztBQTVCbEMsZ0JBQWdCO0lBRDVCLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLGdCQUFnQixDQTRHNUI7U0E1R1ksZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBWDVCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsT0FBTyxFQUFFO3dCQUNMLFdBQVcsRUFBRSxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUM7cUJBQ2pEO2lCQUNKOytLQTJCVSx3QkFBd0I7c0JBRjlCLFlBQVk7dUJBQUMseUJBQXlCO2dCQUtoQyw4QkFBOEI7c0JBRnBDLFlBQVk7dUJBQUMsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIEluamVjdG9yLCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVHJlZU1hcCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi10cmVlbWFwJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBMZXZlbHNEaXJlY3RpdmUgfSBmcm9tICcuL2xldmVscy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWxsb3dJbWFnZUV4cG9ydCcsJ2FsbG93UGRmRXhwb3J0JywnYWxsb3dQcmludCcsJ2JhY2tncm91bmQnLCdib3JkZXInLCdicmVhZGNydW1iQ29ubmVjdG9yJywnY29sb3JWYWx1ZVBhdGgnLCdkYXRhU291cmNlJywnZGVzY3JpcHRpb24nLCdkcmlsbERvd25WaWV3JywnZW5hYmxlQnJlYWRjcnVtYicsJ2VuYWJsZURyaWxsRG93bicsJ2VuYWJsZUh0bWxTYW5pdGl6ZXInLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2VxdWFsQ29sb3JWYWx1ZVBhdGgnLCdmb3JtYXQnLCdoZWlnaHQnLCdoaWdobGlnaHRTZXR0aW5ncycsJ2luaXRpYWxEcmlsbERvd24nLCdsYXlvdXRUeXBlJywnbGVhZkl0ZW1TZXR0aW5ncycsJ2xlZ2VuZFNldHRpbmdzJywnbGV2ZWxzJywnbG9jYWxlJywnbWFyZ2luJywncGFsZXR0ZScsJ3F1ZXJ5JywncmFuZ2VDb2xvclZhbHVlUGF0aCcsJ3JlbmRlckRpcmVjdGlvbicsJ3NlbGVjdGlvblNldHRpbmdzJywndGFiSW5kZXgnLCd0aGVtZScsJ3RpdGxlU2V0dGluZ3MnLCd0b29sdGlwU2V0dGluZ3MnLCd1c2VHcm91cGluZ1NlcGFyYXRvcicsJ3dlaWdodFZhbHVlUGF0aCcsJ3dpZHRoJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZVByaW50JywnY2xpY2snLCdkb3VibGVDbGljaycsJ2RyaWxsRW5kJywnZHJpbGxTdGFydCcsJ2l0ZW1DbGljaycsJ2l0ZW1IaWdobGlnaHQnLCdpdGVtTW92ZScsJ2l0ZW1SZW5kZXJpbmcnLCdpdGVtU2VsZWN0ZWQnLCdsZWdlbmRJdGVtUmVuZGVyaW5nJywnbGVnZW5kUmVuZGVyaW5nJywnbG9hZCcsJ2xvYWRlZCcsJ21vdXNlTW92ZScsJ3Jlc2l6ZScsJ3JpZ2h0Q2xpY2snLCd0b29sdGlwUmVuZGVyaW5nJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJyddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEFuZ3VsYXIgVHJlZU1hcCBjb21wb25lbnQuIEl0IGlzIHVzZWQgdG8gdmlzdWFsaXplIGJvdGggaGllcmFyY2hpY2FsIGFuZCBmbGF0IGRhdGEuXG4gKiBgYGBodG1sXG4gKiA8ZWotdHJlZW1hcD48L2VqLXRyZWVtYXA+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtdHJlZW1hcCcsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZExldmVsczogbmV3IENvbnRlbnRDaGlsZChMZXZlbHNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFRyZWVNYXBDb21wb25lbnQgZXh0ZW5kcyBUcmVlTWFwIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGJlZm9yZVByaW50OiBhbnk7XG5cdGNsaWNrOiBhbnk7XG5cdGRvdWJsZUNsaWNrOiBhbnk7XG5cdGRyaWxsRW5kOiBhbnk7XG5cdGRyaWxsU3RhcnQ6IGFueTtcblx0aXRlbUNsaWNrOiBhbnk7XG5cdGl0ZW1IaWdobGlnaHQ6IGFueTtcblx0aXRlbU1vdmU6IGFueTtcblx0aXRlbVJlbmRlcmluZzogYW55O1xuXHRpdGVtU2VsZWN0ZWQ6IGFueTtcblx0bGVnZW5kSXRlbVJlbmRlcmluZzogYW55O1xuXHRsZWdlbmRSZW5kZXJpbmc6IGFueTtcblx0bG9hZDogYW55O1xuXHRsb2FkZWQ6IGFueTtcblx0bW91c2VNb3ZlOiBhbnk7XG5cdHJlc2l6ZTogYW55O1xuXHRyaWdodENsaWNrOiBhbnk7XG5cdHB1YmxpYyB0b29sdGlwUmVuZGVyaW5nOiBhbnk7XG4gICAgcHVibGljIGNoaWxkTGV2ZWxzOiBRdWVyeUxpc3Q8TGV2ZWxzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2xldmVscyddO1xuICAgIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBTZXR0aW5nc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0b29sdGlwU2V0dGluZ3NfdGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdsZWFmSXRlbVNldHRpbmdzTGFiZWxUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgbGVhZkl0ZW1TZXR0aW5nc19sYWJlbFRlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZU1hcFRyZWVNYXBUb29sdGlwJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlTWFwVHJlZU1hcExlZ2VuZCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZU1hcFRyZWVNYXBIaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVNYXBUcmVlTWFwU2VsZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlTWFwUHJpbnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVNYXBQZGZFeHBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVNYXBJbWFnZUV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRMZXZlbHM7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=