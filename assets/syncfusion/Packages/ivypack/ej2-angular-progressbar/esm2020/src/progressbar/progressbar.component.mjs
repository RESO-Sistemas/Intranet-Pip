import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { ProgressBar } from '@syncfusion/ej2-progressbar';
import { ProgressBarAnnotationsDirective } from './annotations.directive';
import { RangeColorsDirective } from './rangecolors.directive';
import * as i0 from "@angular/core";
export const inputs = ['animation', 'annotations', 'cornerRadius', 'enablePersistence', 'enablePieProgress', 'enableProgressSegments', 'enableRtl', 'endAngle', 'gapWidth', 'height', 'innerRadius', 'isActive', 'isGradient', 'isIndeterminate', 'isStriped', 'labelOnTrack', 'labelStyle', 'locale', 'margin', 'maximum', 'minimum', 'progressColor', 'progressThickness', 'radius', 'rangeColors', 'role', 'secondaryProgress', 'secondaryProgressColor', 'secondaryProgressThickness', 'segmentColor', 'segmentCount', 'showProgressValue', 'startAngle', 'theme', 'tooltip', 'trackColor', 'trackThickness', 'type', 'value', 'width'];
export const outputs = ['animationComplete', 'load', 'loaded', 'mouseClick', 'mouseDown', 'mouseLeave', 'mouseMove', 'mouseUp', 'progressCompleted', 'textRender', 'tooltipRender', 'valueChanged'];
export const twoWays = [''];
/**
 * ProgressBar Component
 * ```html
 * <ejsprogressbar></ejsprogressbar>
 * ```
 */
let ProgressBarComponent = class ProgressBarComponent extends ProgressBar {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['annotations', 'rangeColors'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('ProgressBarProgressAnnotation');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ProgressBarProgressTooltip');
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
        this.tagObjects[0].instance = this.childAnnotations;
        if (this.childRangeColors) {
            this.tagObjects[1].instance = this.childRangeColors;
        }
        this.context.ngAfterContentChecked(this);
    }
};
ProgressBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ProgressBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ProgressBarComponent, selector: "ejs-progressbar", inputs: { animation: "animation", annotations: "annotations", cornerRadius: "cornerRadius", enablePersistence: "enablePersistence", enablePieProgress: "enablePieProgress", enableProgressSegments: "enableProgressSegments", enableRtl: "enableRtl", endAngle: "endAngle", gapWidth: "gapWidth", height: "height", innerRadius: "innerRadius", isActive: "isActive", isGradient: "isGradient", isIndeterminate: "isIndeterminate", isStriped: "isStriped", labelOnTrack: "labelOnTrack", labelStyle: "labelStyle", locale: "locale", margin: "margin", maximum: "maximum", minimum: "minimum", progressColor: "progressColor", progressThickness: "progressThickness", radius: "radius", rangeColors: "rangeColors", role: "role", secondaryProgress: "secondaryProgress", secondaryProgressColor: "secondaryProgressColor", secondaryProgressThickness: "secondaryProgressThickness", segmentColor: "segmentColor", segmentCount: "segmentCount", showProgressValue: "showProgressValue", startAngle: "startAngle", theme: "theme", tooltip: "tooltip", trackColor: "trackColor", trackThickness: "trackThickness", type: "type", value: "value", width: "width" }, outputs: { animationComplete: "animationComplete", load: "load", loaded: "loaded", mouseClick: "mouseClick", mouseDown: "mouseDown", mouseLeave: "mouseLeave", mouseMove: "mouseMove", mouseUp: "mouseUp", progressCompleted: "progressCompleted", textRender: "textRender", tooltipRender: "tooltipRender", valueChanged: "valueChanged" }, queries: [{ propertyName: "childAnnotations", first: true, predicate: ProgressBarAnnotationsDirective, descendants: true }, { propertyName: "childRangeColors", first: true, predicate: RangeColorsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ProgressBarComponent = __decorate([
    ComponentMixins([ComponentBase])
], ProgressBarComponent);
export { ProgressBarComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-progressbar',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childAnnotations: new ContentChild(ProgressBarAnnotationsDirective),
                        childRangeColors: new ContentChild(RangeColorsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFL0QsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsbUJBQW1CLEVBQUMsbUJBQW1CLEVBQUMsd0JBQXdCLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxlQUFlLEVBQUMsbUJBQW1CLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsd0JBQXdCLEVBQUMsNEJBQTRCLEVBQUMsY0FBYyxFQUFDLGNBQWMsRUFBQyxtQkFBbUIsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztBQUMva0IsTUFBTSxDQUFDLE1BQU0s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QUpqRCxFQUFFO0FBUUgsb0JBQW9CO0lBRGhDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLG9CQUFvQixDQWlFaEM7U0FqRVksb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBWmhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsZ0JBQWdCLEVBQUUsSUFBSSxZQUFZLENBQUMsK0JBQStCLENBQUM7d0JBQ25FLGdCQUFnQixFQUFFLElBQUksWUFBWSxDQUFDLG9CQUFvQixDQUFDO3FCQUMzRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXByb2dyZXNzYmFyJztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NCYXJBbm5vdGF0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vYW5ub3RhdGlvbnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJhbmdlQ29sb3JzRGlyZWN0aXZlIH0gZnJvbSAnLi9yYW5nZWNvbG9ycy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYW5pbWF0aW9uJywnYW5ub3RhdGlvbnMnLCdjb3JuZXJSYWRpdXMnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVBpZVByb2dyZXNzJywnZW5hYmxlUHJvZ3Jlc3NTZWdtZW50cycsJ2VuYWJsZVJ0bCcsJ2VuZEFuZ2xlJywnZ2FwV2lkdGgnLCdoZWlnaHQnLCdpbm5lclJhZGl1cycsJ2lzQWN0aXZlJywnaXNHcmFkaWVudCcsJ2lzSW5kZXRlcm1pbmF0ZScsJ2lzU3RyaXBlZCcsJ2xhYmVsT25UcmFjaycsJ2xhYmVsU3R5bGUnLCdsb2NhbGUnLCdtYXJnaW4nLCdtYXhpbXVtJywnbWluaW11bScsJ3Byb2dyZXNzQ29sb3InLCdwcm9ncmVzc1RoaWNrbmVzcycsJ3JhZGl1cycsJ3JhbmdlQ29sb3JzJywncm9sZScsJ3NlY29uZGFyeVByb2dyZXNzJywnc2Vjb25kYXJ5UHJvZ3Jlc3NDb2xvcicsJ3NlY29uZGFyeVByb2dyZXNzVGhpY2tuZXNzJywnc2VnbWVudENvbG9yJywnc2VnbWVudENvdW50Jywnc2hvd1Byb2dyZXNzVmFsdWUnLCdzdGFydEFuZ2xlJywndGhlbWUnLCd0b29sdGlwJywndHJhY2tDb2xvcicsJ3RyYWNrVGhpY2tuZXNzJywndHlwZScsJ3ZhbHVlJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYW5pbWF0aW9uQ29tcGxldGUnLCdsb2FkJywnbG9hZGVkJywnbW91c2VDbGljaycsJ21vdXNlRG93bicsJ21vdXNlTGVhdmUnLCdtb3VzZU1vdmUnLCdtb3VzZVVwJywncHJvZ3Jlc3NDb21wbGV0ZWQnLCd0ZXh0UmVuZGVyJywndG9vbHRpcFJlbmRlcicsJ3ZhbHVlQ2hhbmdlZCddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBQcm9ncmVzc0JhciBDb21wb25lbnRcbiAqIGBgYGh0bWxcbiAqIDxlanNwcm9ncmVzc2Jhcj48L2Vqc3Byb2dyZXNzYmFyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXByb2dyZXNzYmFyJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkQW5ub3RhdGlvbnM6IG5ldyBDb250ZW50Q2hpbGQoUHJvZ3Jlc3NCYXJBbm5vdGF0aW9uc0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZFJhbmdlQ29sb3JzOiBuZXcgQ29udGVudENoaWxkKFJhbmdlQ29sb3JzRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhckNvbXBvbmVudCBleHRlbmRzIFByb2dyZXNzQmFyIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFuaW1hdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGxvYWQ6IGFueTtcblx0bG9hZGVkOiBhbnk7XG5cdG1vdXNlQ2xpY2s6IGFueTtcblx0bW91c2VEb3duOiBhbnk7XG5cdG1vdXNlTGVhdmU6IGFueTtcblx0bW91c2VNb3ZlOiBhbnk7XG5cdG1vdXNlVXA6IGFueTtcblx0cHJvZ3Jlc3NDb21wbGV0ZWQ6IGFueTtcblx0dGV4dFJlbmRlcjogYW55O1xuXHR0b29sdGlwUmVuZGVyOiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQ6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRBbm5vdGF0aW9uczogUXVlcnlMaXN0PFByb2dyZXNzQmFyQW5ub3RhdGlvbnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZFJhbmdlQ29sb3JzOiBRdWVyeUxpc3Q8UmFuZ2VDb2xvcnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnYW5ub3RhdGlvbnMnLCAncmFuZ2VDb2xvcnMnXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdQcm9ncmVzc0JhclByb2dyZXNzQW5ub3RhdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnUHJvZ3Jlc3NCYXJQcm9ncmVzc1Rvb2x0aXAnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQW5ub3RhdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkUmFuZ2VDb2xvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzWzFdLmluc3RhbmNlID0gdGhpcy5jaGlsZFJhbmdlQ29sb3JzIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=