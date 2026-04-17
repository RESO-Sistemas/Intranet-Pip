var TextAreaComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { TextArea } from '@syncfusion/ej2-inputs';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['adornmentFlow', 'adornmentOrientation', 'appendTemplate', 'cols', 'cssClass', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'maxLength', 'placeholder', 'prependTemplate', 'readonly', 'resizeMode', 'rows', 'showClearButton', 'value', 'width'];
export const outputs = ['blur', 'change', 'created', 'destroyed', 'focus', 'input', 'valueChange'];
export const twoWays = ['value'];
/**
 * Represents the EJ2 Angular TextArea Component.
 * ```html
 * <ejs-textarea [value]='value'></ejs-textarea>
 * ```
 */
let TextAreaComponent = TextAreaComponent_1 = class TextAreaComponent extends TextArea {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
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
TextAreaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TextAreaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TextAreaComponent, selector: "ejs-textarea", inputs: { adornmentFlow: "adornmentFlow", adornmentOrientation: "adornmentOrientation", appendTemplate: "appendTemplate", cols: "cols", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", htmlAttributes: "htmlAttributes", locale: "locale", maxLength: "maxLength", placeholder: "placeholder", prependTemplate: "prependTemplate", readonly: "readonly", resizeMode: "resizeMode", rows: "rows", showClearButton: "showClearButton", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", input: "input", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "prependTemplate", first: true, predicate: ["prependTemplate"], descendants: true }, { propertyName: "appendTemplate", first: true, predicate: ["appendTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], TextAreaComponent.prototype, "prependTemplate", void 0);
__decorate([
    Template()
], TextAreaComponent.prototype, "appendTemplate", void 0);
TextAreaComponent = TextAreaComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], TextAreaComponent);
export { TextAreaComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-textarea',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextAreaComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { prependTemplate: [{
                type: ContentChild,
                args: ['prependTemplate']
            }], appendTemplate: [{
                type: ContentChild,
                args: ['appendTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9FLHVCQUF1QixFQUFxQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xMLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQStCLGVBQWUsRUFBMEIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsaUJBQWlCLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlTLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZHLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTNDOzs7OztHQUtHO0lBbUJVLGlCQUFpQiwrQkFBakIsaUJBQWtCLFNBQVEsUUFBUTtJQXlD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d0NvbnRhaW5lclJlZiwgVmFsdWVQcm92aWRlciwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGV4dEFyZWEgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW5wdXRzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2Fkb3JubWVudEZsb3cnLCdhZG9ybm1lbnRPcmllbnRhdGlvbicsJ2FwcGVuZFRlbXBsYXRlJywnY29scycsJ2Nzc0NsYXNzJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVkJywnZmxvYXRMYWJlbFR5cGUnLCdodG1sQXR0cmlidXRlcycsJ2xvY2FsZScsJ21heExlbmd0aCcsJ3BsYWNlaG9sZGVyJywncHJlcGVuZFRlbXBsYXRlJywncmVhZG9ubHknLCdyZXNpemVNb2RlJywncm93cycsJ3Nob3dDbGVhckJ1dHRvbicsJ3ZhbHVlJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYmx1cicsJ2NoYW5nZScsJ2NyZWF0ZWQnLCdkZXN0cm95ZWQnLCdmb2N1cycsJ2lucHV0JywndmFsdWVDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsndmFsdWUnXTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFSjIgQW5ndWxhciBUZXh0QXJlYSBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXRleHRhcmVhIFt2YWx1ZV09J3ZhbHVlJz48L2Vqcy10ZXh0YXJlYT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy10ZXh0YXJlYScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGV4dEFyZWFDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2UsIEZvcm1CYXNlXSlcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUNvbXBvbmVudCBleHRlbmRzIFRleHRBcmVhIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGJsdXI6IGFueTtcblx0Y2hhbmdlOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGVzdHJveWVkOiBhbnk7XG5cdGZvY3VzOiBhbnk7XG5cdGlucHV0OiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBIVE1MIHRlbXBsYXRlIHRvIHByZXBlbmQgaW5zaWRlIHRoZSBUZXh0QXJlYSB3cmFwcGVyLiBcbiAgICAgKiBBY2NlcHRzIGFuIEhUTUwgc3RyaW5nIG9yIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIEhUTUwgc3RyaW5nLiBcbiAgICAgKiBVcGRhdGVzIGR5bmFtaWNhbGx5IHdoZW4gdGhlIHByb3BlcnR5IHZhbHVlIGNoYW5nZXMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3ByZXBlbmRUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcHJlcGVuZFRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgSFRNTCB0ZW1wbGF0ZSB0byBhcHBlbmQgaW5zaWRlIHRoZSBUZXh0QXJlYSB3cmFwcGVyLiBcbiAgICAgKiBBY2NlcHRzIGFuIEhUTUwgc3RyaW5nIG9yIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIEhUTUwgc3RyaW5nLiBcbiAgICAgKiBVcGRhdGVzIGR5bmFtaWNhbGx5IHdoZW4gdGhlIHByb3BlcnR5IHZhbHVlIGNoYW5nZXMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2FwcGVuZFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBhcHBlbmRUZW1wbGF0ZTogYW55O1xuXG4gICAgcHJpdmF0ZSBza2lwRnJvbUV2ZW50OmJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dCAgPSBuZXcgRm9ybUJhc2UoKTtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShyZWdpc3RlckZ1bmN0aW9uOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKHJlZ2lzdGVyRnVuY3Rpb246ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=