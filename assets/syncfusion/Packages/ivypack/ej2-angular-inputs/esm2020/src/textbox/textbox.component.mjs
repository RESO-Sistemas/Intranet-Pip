var TextBoxComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['appendTemplate', 'autocomplete', 'cssClass', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'multiline', 'placeholder', 'prependTemplate', 'readonly', 'showClearButton', 'type', 'value', 'width'];
export const outputs = ['blur', 'change', 'created', 'destroyed', 'focus', 'input', 'valueChange'];
export const twoWays = ['value'];
/**
 * Represents the EJ2 Angular TextBox Component.
 * ```html
 * <ejs-textbox [value]='value'></ejs-textbox>
 * ```
 */
let TextBoxComponent = TextBoxComponent_1 = class TextBoxComponent extends TextBox {
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
TextBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TextBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TextBoxComponent, selector: "ejs-textbox", inputs: { appendTemplate: "appendTemplate", autocomplete: "autocomplete", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", htmlAttributes: "htmlAttributes", locale: "locale", multiline: "multiline", placeholder: "placeholder", prependTemplate: "prependTemplate", readonly: "readonly", showClearButton: "showClearButton", type: "type", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", input: "input", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextBoxComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "prependTemplate", first: true, predicate: ["prependTemplate"], descendants: true }, { propertyName: "appendTemplate", first: true, predicate: ["appendTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], TextBoxComponent.prototype, "prependTemplate", void 0);
__decorate([
    Template()
], TextBoxComponent.prototype, "appendTemplate", void 0);
TextBoxComponent = TextBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], TextBoxComponent);
export { TextBoxComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-textbox',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextBoxComponent),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGV4dGJveC90ZXh0Ym94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9FLHVCQUF1QixFQUFxQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xMLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQStCLGVBQWUsRUFBMEIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsbUJBQW1CLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxpQkFBaUIsRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNsUSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxhQUFhLENBQUMsQ0FBQztBQUN2RyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUzQzs7Ozs7R0FLRztJQW1CVSxnQkFBZ0IsOEJBQWhCLGdCQUFpQixTQUFRLE9BQU87SUF1Q3pDLFlBQW9CLEtBQWlCLEVBQVUsU0FBb0IsRUFBVSxnQkFBaUMsRUFBVSxRQUFrQixFQUFVLEdBQXNCO1FBQ3RLLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBRGxLLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBR2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFJLElBQUksYUFBYSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVNLGdCQUFnQixDQUFDLGdCQUFrQztJQUMxRCxDQUFDO0lBRU0saUJBQWlCLENBQUMsZ0JBQTRCO0lBQ3JELENBQUM7SUFFTSxVQUFVLENBQUMsS0FBVTtJQUM1QixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsUUFBaUI7SUFDekMsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxxQkFBcUI7UUFFeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBSUosQ0FBQTs2R0FsRlksZ0JBQWdCO2lHQUFoQixnQkFBZ0IsdW9CQVpkO1FBQ1A7WUFDSSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWdCLENBQUM7WUFDL0MsS0FBSyxFQUFFLElBQUk7U0FDZDtLQUNKLG9RQVJTLEVBQUU7QUFzQ1o7SUFEQyxRQUFRLEVBQUU7eURBQ2lCO0FBWTVCO0lBREMsUUFBUSxFQUFFO3dEQUNnQjtBQXBDbEIsZ0JBQWdCO0lBRDVCLGVBQWUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztHQUM5QixnQkFBZ0IsQ0FrRjVCO1NBbEZZLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQWxCNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7NEJBQy9DLEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO29CQUNELE9BQU8sRUFBRSxFQUVSO2lCQUNKOytNQTBCVSxlQUFlO3NCQUZyQixZQUFZO3VCQUFDLGlCQUFpQjtnQkFjeEIsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFZhbHVlUHJvdmlkZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgZm9yd2FyZFJlZiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBGb3JtQmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRleHRCb3ggfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW5wdXRzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FwcGVuZFRlbXBsYXRlJywnYXV0b2NvbXBsZXRlJywnY3NzQ2xhc3MnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2VuYWJsZWQnLCdmbG9hdExhYmVsVHlwZScsJ2h0bWxBdHRyaWJ1dGVzJywnbG9jYWxlJywnbXVsdGlsaW5lJywncGxhY2Vob2xkZXInLCdwcmVwZW5kVGVtcGxhdGUnLCdyZWFkb25seScsJ3Nob3dDbGVhckJ1dHRvbicsJ3R5cGUnLCd2YWx1ZScsJ3dpZHRoJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JsdXInLCdjaGFuZ2UnLCdjcmVhdGVkJywnZGVzdHJveWVkJywnZm9jdXMnLCdpbnB1dCcsJ3ZhbHVlQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ3ZhbHVlJ107XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRUoyIEFuZ3VsYXIgVGV4dEJveCBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXRleHRib3ggW3ZhbHVlXT0ndmFsdWUnPjwvZWpzLXRleHRib3g+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtdGV4dGJveCcsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGV4dEJveENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZSwgRm9ybUJhc2VdKVxuZXhwb3J0IGNsYXNzIFRleHRCb3hDb21wb25lbnQgZXh0ZW5kcyBUZXh0Qm94IGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGJsdXI6IGFueTtcblx0Y2hhbmdlOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGVzdHJveWVkOiBhbnk7XG5cdGZvY3VzOiBhbnk7XG5cdGlucHV0OiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBIVE1MIHRlbXBsYXRlIHN0cmluZyBmb3IgY3VzdG9tIGVsZW1lbnRzIHRvIHByZXBlbmQgdG8gdGhlIFRleHRCb3ggaW5wdXQuIFxuICAgICAqIFN1cHBvcnRzIGljb25zLCBidXR0b25zLCBvciBhbnkgdmFsaWQgSFRNTC4gVXBkYXRlcyBkeW5hbWljYWxseSBvbiBwcm9wZXJ0eSBjaGFuZ2UuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3ByZXBlbmRUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcHJlcGVuZFRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgSFRNTCB0ZW1wbGF0ZSBzdHJpbmcgZm9yIGN1c3RvbSBlbGVtZW50cyB0byBhcHBlbmQgdG8gdGhlIFRleHRCb3ggaW5wdXQuIFxuICAgICAqIFN1cHBvcnRzIGljb25zLCBidXR0b25zLCBvciBhbnkgdmFsaWQgSFRNTC4gVXBkYXRlcyBkeW5hbWljYWxseSBvbiBwcm9wZXJ0eSBjaGFuZ2UuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2FwcGVuZFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBhcHBlbmRUZW1wbGF0ZTogYW55O1xuXG4gICAgcHJpdmF0ZSBza2lwRnJvbUV2ZW50OmJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dCAgPSBuZXcgRm9ybUJhc2UoKTtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShyZWdpc3RlckZ1bmN0aW9uOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKHJlZ2lzdGVyRnVuY3Rpb246ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=