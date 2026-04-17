var OtpInputComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { OtpInput } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export const inputs = ['ariaLabels', 'autoFocus', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'length', 'locale', 'placeholder', 'separator', 'stylingMode', 'textTransform', 'type', 'value'];
export const outputs = ['blur', 'created', 'focus', 'input', 'valueChanged', 'valueChange'];
export const twoWays = ['value'];
/**
 * Represents the EJ2 Angular OtpInput Component.
 * ```html
 * <div ejs-otpinput [value]='value'></div>
 * ```
 */
let OtpInputComponent = OtpInputComponent_1 = class OtpInputComponent extends OtpInput {
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
OtpInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
OtpInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: OtpInputComponent, selector: "[ejs-otpinput]", inputs: { ariaLabels: "ariaLabels", autoFocus: "autoFocus", cssClass: "cssClass", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", length: "length", locale: "locale", placeholder: "placeholder", separator: "separator", stylingMode: "stylingMode", textTransform: "textTransform", type: "type", value: "value" }, outputs: { blur: "blur", created: "created", focus: "focus", input: "input", valueChanged: "valueChanged", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OtpInputComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
OtpInputComponent = OtpInputComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], OtpInputComponent);
export { OtpInputComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-otpinput]',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => OtpInputComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL290cC1pbnB1dC9vdHBpbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvRSx1QkFBdUIsRUFBcUIsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BLLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQStCLGVBQWUsRUFBMEIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFJbEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsYUFBYSxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDM04sTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUNqRyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUzQzs7Ozs7R0FLRztJQW1CVSxpQkFBaUIsK0JBQWpCLGlCQUFrQixTQUFRLFFBQVE7SUFjM0MsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCLEVBQVUsR0FBc0I7UUFDdEssS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFEbEssa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFHakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsZ0JBQWtDO0lBQzFELENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxnQkFBNEI7SUFDckQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxLQUFVO0lBQzVCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxRQUFpQjtJQUN6QyxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLHFCQUFxQjtRQUV4QixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FJSixDQUFBOzhHQXpEWSxpQkFBaUI7a0dBQWpCLGlCQUFpQixnakJBWmY7UUFDUDtZQUNJLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBaUIsQ0FBQztZQUNoRCxLQUFLLEVBQUUsSUFBSTtTQUNkO0tBQ0osaURBUlMsRUFBRTtBQWNILGlCQUFpQjtJQUQ3QixlQUFlLENBQUMsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDOUIsaUJBQWlCLENBeUQ3QjtTQXpEWSxpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFsQjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUM7NEJBQ2hELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO29CQUNELE9BQU8sRUFBRSxFQUVSO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBWYWx1ZVByb3ZpZGVyLCBSZW5kZXJlcjIsIEluamVjdG9yLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgT3RwSW5wdXQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW5wdXRzJztcblxuXG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhcmlhTGFiZWxzJywnYXV0b0ZvY3VzJywnY3NzQ2xhc3MnLCdkaXNhYmxlZCcsJ2VuYWJsZVBlcnNpc3RlbmNlJywnZW5hYmxlUnRsJywnaHRtbEF0dHJpYnV0ZXMnLCdsZW5ndGgnLCdsb2NhbGUnLCdwbGFjZWhvbGRlcicsJ3NlcGFyYXRvcicsJ3N0eWxpbmdNb2RlJywndGV4dFRyYW5zZm9ybScsJ3R5cGUnLCd2YWx1ZSddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydibHVyJywnY3JlYXRlZCcsJ2ZvY3VzJywnaW5wdXQnLCd2YWx1ZUNoYW5nZWQnLCd2YWx1ZUNoYW5nZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWyd2YWx1ZSddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVKMiBBbmd1bGFyIE90cElucHV0IENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgZWpzLW90cGlucHV0IFt2YWx1ZV09J3ZhbHVlJz48L2Rpdj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tlanMtb3RwaW5wdXRdJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPdHBJbnB1dENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZSwgRm9ybUJhc2VdKVxuZXhwb3J0IGNsYXNzIE90cElucHV0Q29tcG9uZW50IGV4dGVuZHMgT3RwSW5wdXQgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGZvcm1Db21wQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgZm9ybUNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0Ymx1cjogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGZvY3VzOiBhbnk7XG5cdGlucHV0OiBhbnk7XG5cdHZhbHVlQ2hhbmdlZDogYW55O1xuXHRwdWJsaWMgdmFsdWVDaGFuZ2U6IGFueTtcblxuXG5cbiAgICBwcml2YXRlIHNraXBGcm9tRXZlbnQ6Ym9vbGVhbiA9IHRydWU7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmZvcm1Db250ZXh0ICA9IG5ldyBGb3JtQmFzZSgpO1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKHJlZ2lzdGVyRnVuY3Rpb246IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQocmVnaXN0ZXJGdW5jdGlvbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==