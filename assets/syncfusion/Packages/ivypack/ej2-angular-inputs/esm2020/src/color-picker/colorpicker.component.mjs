var ColorPickerComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export const inputs = ['columns', 'createPopupOnClick', 'cssClass', 'disabled', 'enableOpacity', 'enablePersistence', 'enableRtl', 'inline', 'locale', 'mode', 'modeSwitcher', 'noColor', 'presetColors', 'showButtons', 'showRecentColors', 'value'];
export const outputs = ['focus', 'blur', 'beforeClose', 'beforeModeSwitch', 'beforeOpen', 'beforeTileRender', 'change', 'created', 'onModeSwitch', 'open', 'select', 'valueChange'];
export const twoWays = ['value'];
/**
 * Represents the EJ2 Angular ColorPicker Component.
 * ```html
 * <input ejs-colorpicker type='color'/>
 * ```
 */
let ColorPickerComponent = ColorPickerComponent_1 = class ColorPickerComponent extends ColorPicker {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
ColorPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ColorPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ColorPickerComponent, selector: "[ejs-colorpicker]", inputs: { columns: "columns", createPopupOnClick: "createPopupOnClick", cssClass: "cssClass", disabled: "disabled", enableOpacity: "enableOpacity", enablePersistence: "enablePersistence", enableRtl: "enableRtl", inline: "inline", locale: "locale", mode: "mode", modeSwitcher: "modeSwitcher", noColor: "noColor", presetColors: "presetColors", showButtons: "showButtons", showRecentColors: "showRecentColors", value: "value" }, outputs: { focus: "focus", blur: "blur", beforeClose: "beforeClose", beforeModeSwitch: "beforeModeSwitch", beforeOpen: "beforeOpen", beforeTileRender: "beforeTileRender", change: "change", created: "created", onModeSwitch: "onModeSwitch", open: "open", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ColorPickerComponent = ColorPickerComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], ColorPickerComponent);
export { ColorPickerComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-colorpicker]',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ColorPickerComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbG9yLXBpY2tlci9jb2xvcnBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvRSx1QkFBdUIsRUFBcUIsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BLLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQStCLGVBQWUsRUFBMEIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFJckQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsU0FBUyxFQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsZUFBZSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxhQUFhLEVBQUMsa0JBQWtCLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDalAsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUMsa0JBQWtCLEVBQUMsWUFBWSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsYUFBYSxDQUFDLENBQUM7QUFDckwsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFM0M7Ozs7O0dBS0c7SUFtQlUsb0JBQW9CLGtDQUFwQixvQkFBcUIsU0FBUSxXQUFXO0lBbUJqRCxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0IsRUFBVSxHQUFzQjtRQUN0SyxLQUFLLEVBQUUsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUV0SyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFJLElBQUksUUFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxnQkFBa0M7SUFDMUQsQ0FBQztJQUVNLGlCQUFpQixDQUFDLGdCQUE0QjtJQUNyRCxDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQVU7SUFDNUIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLFFBQWlCO0lBQ3pDLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0scUJBQXFCO1FBRXhCLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUlKLENBQUE7aUhBOURZLG9CQUFvQjtxR0FBcEIsb0JBQW9CLG13QkFabEI7UUFDUDtZQUNJLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBb0IsQ0FBQztZQUNuRCxLQUFLLEVBQUUsSUFBSTtTQUNkO0tBQ0osaURBUlMsRUFBRTtBQWNILG9CQUFvQjtJQURoQyxlQUFlLENBQUMsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDOUIsb0JBQW9CLENBOERoQztTQTlEWSxvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFsQmhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO29CQUNELE9BQU8sRUFBRSxFQUVSO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBWYWx1ZVByb3ZpZGVyLCBSZW5kZXJlcjIsIEluamVjdG9yLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgQ29sb3JQaWNrZXIgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW5wdXRzJztcblxuXG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydjb2x1bW5zJywnY3JlYXRlUG9wdXBPbkNsaWNrJywnY3NzQ2xhc3MnLCdkaXNhYmxlZCcsJ2VuYWJsZU9wYWNpdHknLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2lubGluZScsJ2xvY2FsZScsJ21vZGUnLCdtb2RlU3dpdGNoZXInLCdub0NvbG9yJywncHJlc2V0Q29sb3JzJywnc2hvd0J1dHRvbnMnLCdzaG93UmVjZW50Q29sb3JzJywndmFsdWUnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnZm9jdXMnLCAnYmx1cicsICdiZWZvcmVDbG9zZScsJ2JlZm9yZU1vZGVTd2l0Y2gnLCdiZWZvcmVPcGVuJywnYmVmb3JlVGlsZVJlbmRlcicsJ2NoYW5nZScsJ2NyZWF0ZWQnLCdvbk1vZGVTd2l0Y2gnLCdvcGVuJywnc2VsZWN0JywndmFsdWVDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsndmFsdWUnXTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFSjIgQW5ndWxhciBDb2xvclBpY2tlciBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8aW5wdXQgZWpzLWNvbG9ycGlja2VyIHR5cGU9J2NvbG9yJy8+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbZWpzLWNvbG9ycGlja2VyXScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2UsIEZvcm1CYXNlXSlcbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlckNvbXBvbmVudCBleHRlbmRzIENvbG9yUGlja2VyIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGJlZm9yZUNsb3NlOiBhbnk7XG5cdGJlZm9yZU1vZGVTd2l0Y2g6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRiZWZvcmVUaWxlUmVuZGVyOiBhbnk7XG5cdGNoYW5nZTogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdG9uTW9kZVN3aXRjaDogYW55O1xuXHRvcGVuOiBhbnk7XG5cdHNlbGVjdDogYW55O1xuXHRwdWJsaWMgdmFsdWVDaGFuZ2U6IGFueTtcblxuXG5cbiAgICBwdWJsaWMgZm9jdXM6IGFueTtcbiAgICBwdWJsaWMgYmx1cjogYW55O1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dCAgPSBuZXcgRm9ybUJhc2UoKTtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShyZWdpc3RlckZ1bmN0aW9uOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKHJlZ2lzdGVyRnVuY3Rpb246ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=