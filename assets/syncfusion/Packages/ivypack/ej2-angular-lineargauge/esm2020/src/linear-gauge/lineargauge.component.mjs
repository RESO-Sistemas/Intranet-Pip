import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
import { Template } from '@syncfusion/ej2-angular-base';
import { AxesDirective } from './axes.directive';
import { AnnotationsDirective } from './annotations.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowImageExport', 'allowMargin', 'allowPdfExport', 'allowPrint', 'animationDuration', 'annotations', 'axes', 'background', 'border', 'container', 'description', 'edgeLabelPlacement', 'enablePersistence', 'enableRtl', 'format', 'height', 'locale', 'margin', 'orientation', 'rangePalettes', 'tabIndex', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width'];
export const outputs = ['animationComplete', 'annotationRender', 'axisLabelRender', 'beforePrint', 'dragEnd', 'dragMove', 'dragStart', 'gaugeMouseDown', 'gaugeMouseLeave', 'gaugeMouseMove', 'gaugeMouseUp', 'load', 'loaded', 'resized', 'tooltipRender', 'valueChange'];
export const twoWays = [''];
/**
 * Represents the Angular Linear Gauge Component. This tag is used to customize the properties of the linear gauge to visualize the data in linear scale.
 * ```html
 * <ej-lineargauge></ej-lineargauge>
 * ```
 */
let LinearGaugeComponent = class LinearGaugeComponent extends LinearGauge {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['axes', 'annotations'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('LinearGaugeGaugeTooltip');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('LinearGaugeAnnotations');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('LinearGaugePrint');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('LinearGaugePdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('LinearGaugeImageExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('LinearGaugeGradient');
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
        this.tagObjects[0].instance = this.childAxes;
        if (this.childAnnotations) {
            this.tagObjects[1].instance = this.childAnnotations;
        }
        this.context.ngAfterContentChecked(this);
    }
};
LinearGaugeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LinearGaugeComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
LinearGaugeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: LinearGaugeComponent, selector: "ejs-lineargauge", inputs: { allowImageExport: "allowImageExport", allowMargin: "allowMargin", allowPdfExport: "allowPdfExport", allowPrint: "allowPrint", animationDuration: "animationDuration", annotations: "annotations", axes: "axes", background: "background", border: "border", container: "container", description: "description", edgeLabelPlacement: "edgeLabelPlacement", enablePersistence: "enablePersistence", enableRtl: "enableRtl", format: "format", height: "height", locale: "locale", margin: "margin", orientation: "orientation", rangePalettes: "rangePalettes", tabIndex: "tabIndex", theme: "theme", title: "title", titleStyle: "titleStyle", tooltip: "tooltip", useGroupingSeparator: "useGroupingSeparator", width: "width" }, outputs: { animationComplete: "animationComplete", annotationRender: "annotationRender", axisLabelRender: "axisLabelRender", beforePrint: "beforePrint", dragEnd: "dragEnd", dragMove: "dragMove", dragStart: "dragStart", gaugeMouseDown: "gaugeMouseDown", gaugeMouseLeave: "gaugeMouseLeave", gaugeMouseMove: "gaugeMouseMove", gaugeMouseUp: "gaugeMouseUp", load: "load", loaded: "loaded", resized: "resized", tooltipRender: "tooltipRender", valueChange: "valueChange" }, queries: [{ propertyName: "tooltip_template", first: true, predicate: ["tooltipTemplate"], descendants: true }, { propertyName: "childAxes", first: true, predicate: AxesDirective, descendants: true }, { propertyName: "childAnnotations", first: true, predicate: AnnotationsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], LinearGaugeComponent.prototype, "tooltip_template", void 0);
LinearGaugeComponent = __decorate([
    ComponentMixins([ComponentBase])
], LinearGaugeComponent);
export { LinearGaugeComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LinearGaugeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-lineargauge',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childAxes: new ContentChild(AxesDirective),
                        childAnnotations: new ContentChild(AnnotationsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { tooltip_template: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyZ2F1Z2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmVhci1nYXVnZS9saW5lYXJnYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFL0QsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsa0JBQWtCLEVBQUMsYUFBYSxFQUFDLGdCQUFnQixFQUFDLFlBQVksRUFBQyxtQkFBbUIsRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxvQkFBb0IsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNsWSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxtQkFBbUIsRUFBQyxrQkFBa0IsRUFBQyxpQkFBaUIsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsZ0JBQWdC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QjtJQURoQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUNwQixvQkFBb0IsQ0FvR2hDO1NBcEdZLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQVpoQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsT0FBTyxFQUFFO3dCQUNMLFNBQVMsRUFBRSxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQzFDLGdCQUFnQixFQUFFLElBQUksWUFBWSxDQUFDLG9CQUFvQixDQUFDO3FCQUMzRDtpQkFDSjsrS0EwQlUsZ0JBQWdCO3NCQUZ0QixZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IExpbmVhckdhdWdlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWxpbmVhcmdhdWdlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBBeGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9heGVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBbm5vdGF0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vYW5ub3RhdGlvbnMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FsbG93SW1hZ2VFeHBvcnQnLCdhbGxvd01hcmdpbicsJ2FsbG93UGRmRXhwb3J0JywnYWxsb3dQcmludCcsJ2FuaW1hdGlvbkR1cmF0aW9uJywnYW5ub3RhdGlvbnMnLCdheGVzJywnYmFja2dyb3VuZCcsJ2JvcmRlcicsJ2NvbnRhaW5lcicsJ2Rlc2NyaXB0aW9uJywnZWRnZUxhYmVsUGxhY2VtZW50JywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdmb3JtYXQnLCdoZWlnaHQnLCdsb2NhbGUnLCdtYXJnaW4nLCdvcmllbnRhdGlvbicsJ3JhbmdlUGFsZXR0ZXMnLCd0YWJJbmRleCcsJ3RoZW1lJywndGl0bGUnLCd0aXRsZVN0eWxlJywndG9vbHRpcCcsJ3VzZUdyb3VwaW5nU2VwYXJhdG9yJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYW5pbWF0aW9uQ29tcGxldGUnLCdhbm5vdGF0aW9uUmVuZGVyJywnYXhpc0xhYmVsUmVuZGVyJywnYmVmb3JlUHJpbnQnLCdkcmFnRW5kJywnZHJhZ01vdmUnLCdkcmFnU3RhcnQnLCdnYXVnZU1vdXNlRG93bicsJ2dhdWdlTW91c2VMZWF2ZScsJ2dhdWdlTW91c2VNb3ZlJywnZ2F1Z2VNb3VzZVVwJywnbG9hZCcsJ2xvYWRlZCcsJ3Jlc2l6ZWQnLCd0b29sdGlwUmVuZGVyJywndmFsdWVDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsnJ107XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQW5ndWxhciBMaW5lYXIgR2F1Z2UgQ29tcG9uZW50LiBUaGlzIHRhZyBpcyB1c2VkIHRvIGN1c3RvbWl6ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgbGluZWFyIGdhdWdlIHRvIHZpc3VhbGl6ZSB0aGUgZGF0YSBpbiBsaW5lYXIgc2NhbGUuXG4gKiBgYGBodG1sXG4gKiA8ZWotbGluZWFyZ2F1Z2U+PC9lai1saW5lYXJnYXVnZT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1saW5lYXJnYXVnZScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZEF4ZXM6IG5ldyBDb250ZW50Q2hpbGQoQXhlc0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZEFubm90YXRpb25zOiBuZXcgQ29udGVudENoaWxkKEFubm90YXRpb25zRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBMaW5lYXJHYXVnZUNvbXBvbmVudCBleHRlbmRzIExpbmVhckdhdWdlIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFuaW1hdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGFubm90YXRpb25SZW5kZXI6IGFueTtcblx0YXhpc0xhYmVsUmVuZGVyOiBhbnk7XG5cdGJlZm9yZVByaW50OiBhbnk7XG5cdGRyYWdFbmQ6IGFueTtcblx0ZHJhZ01vdmU6IGFueTtcblx0ZHJhZ1N0YXJ0OiBhbnk7XG5cdGdhdWdlTW91c2VEb3duOiBhbnk7XG5cdGdhdWdlTW91c2VMZWF2ZTogYW55O1xuXHRnYXVnZU1vdXNlTW92ZTogYW55O1xuXHRnYXVnZU1vdXNlVXA6IGFueTtcblx0bG9hZDogYW55O1xuXHRsb2FkZWQ6IGFueTtcblx0cmVzaXplZDogYW55O1xuXHR0b29sdGlwUmVuZGVyOiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuICAgIHB1YmxpYyBjaGlsZEF4ZXM6IFF1ZXJ5TGlzdDxBeGVzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgY2hpbGRBbm5vdGF0aW9uczogUXVlcnlMaXN0PEFubm90YXRpb25zRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2F4ZXMnLCAnYW5ub3RhdGlvbnMnXTtcbiAgICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRvb2x0aXBfdGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdMaW5lYXJHYXVnZUdhdWdlVG9vbHRpcCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnTGluZWFyR2F1Z2VBbm5vdGF0aW9ucycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnTGluZWFyR2F1Z2VQcmludCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnTGluZWFyR2F1Z2VQZGZFeHBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0xpbmVhckdhdWdlSW1hZ2VFeHBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0xpbmVhckdhdWdlR3JhZGllbnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQXhlcztcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRBbm5vdGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbMV0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQW5ub3RhdGlvbnMgYXMgYW55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==