var DropDownTreeComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['actionFailureTemplate', 'allowFiltering', 'allowMultiSelection', 'changeOnBlur', 'cssClass', 'customTemplate', 'delimiterChar', 'destroyPopupOnHide', 'disableHtmlEncode', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'mode', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'readonly', 'selectAllText', 'showCheckBox', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'treeSettings', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'wrapText', 'zIndex'];
export const outputs = ['actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'keyPress', 'open', 'select', 'valueChange'];
export const twoWays = ['value'];
/**
*The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
*```html
*<ejs-dropdowntree></ejs-dropdowntree>
*```
*/
let DropDownTreeComponent = DropDownTreeComponent_1 = class DropDownTreeComponent extends DropDownTree {
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
DropDownTreeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DropDownTreeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DropDownTreeComponent, selector: "ejs-dropdowntree", inputs: { actionFailureTemplate: "actionFailureTemplate", allowFiltering: "allowFiltering", allowMultiSelection: "allowMultiSelection", changeOnBlur: "changeOnBlur", cssClass: "cssClass", customTemplate: "customTemplate", delimiterChar: "delimiterChar", destroyPopupOnHide: "destroyPopupOnHide", disableHtmlEncode: "disableHtmlEncode", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", headerTemplate: "headerTemplate", htmlAttributes: "htmlAttributes", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", itemTemplate: "itemTemplate", locale: "locale", mode: "mode", noRecordsTemplate: "noRecordsTemplate", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", readonly: "readonly", selectAllText: "selectAllText", showCheckBox: "showCheckBox", showClearButton: "showClearButton", showDropDownIcon: "showDropDownIcon", showSelectAll: "showSelectAll", sortOrder: "sortOrder", text: "text", treeSettings: "treeSettings", unSelectAllText: "unSelectAllText", value: "value", valueTemplate: "valueTemplate", width: "width", wrapText: "wrapText", zIndex: "zIndex" }, outputs: { actionFailure: "actionFailure", beforeOpen: "beforeOpen", blur: "blur", change: "change", close: "close", created: "created", dataBound: "dataBound", destroyed: "destroyed", filtering: "filtering", focus: "focus", keyPress: "keyPress", open: "open", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownTreeComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "valueTemplate", first: true, predicate: ["valueTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], DropDownTreeComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], DropDownTreeComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], DropDownTreeComponent.prototype, "valueTemplate", void 0);
__decorate([
    Template()
], DropDownTreeComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template('No Records Found')
], DropDownTreeComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('The Request Failed')
], DropDownTreeComponent.prototype, "actionFailureTemplate", void 0);
DropDownTreeComponent = DropDownTreeComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], DropDownTreeComponent);
export { DropDownTreeComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-dropdowntree',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DropDownTreeComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], valueTemplate: [{
                type: ContentChild,
                args: ['valueTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }], actionFailureTemplate: [{
                type: ContentChild,
                args: ['actionFailureTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd250cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kcm9wLWRvd24tdHJlZS9kcm9wZG93bnRyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0UsdUJBQXVCLEVBQXFCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsdUJBQXVCLEVBQUMsZ0JBQWdCLEVBQUMscUJBQXFCLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxnQkFBZ0IsRUFBQyxlQUFlLEVBQUMsb0JBQW9CLEVBQUMsbUJBQW1CLEVBQUMscUJBQXFCLEVBQUMsbUJBQW1CLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsc0JBQXNCLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixFQUFDLGdCQUFnQixFQUFDLGdCQUFnQixFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxZQUFZLEVBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBQyxjQUFjLEVBQUMsaUJBQWlCLEVBQUMsa0JBQWtCLEVBQUMsZUFBZSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLGlCQUFpQixFQUFD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QUFDLENBQUM7R0FDOUIscUJBQXFCLENBcUlqQztTQXJJWSxxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFsQmpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUM7NEJBQ3BELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO29CQUNELE9BQU8sRUFBRSxFQUVSO2lCQUNKOytNQWlDVSxjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFjdkIsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0I7Z0JBY3ZCLGFBQWE7c0JBRm5CLFlBQVk7dUJBQUMsZUFBZTtnQkFnQnRCLFlBQVk7c0JBRmxCLFlBQVk7dUJBQUMsY0FBYztnQkFXckIsaUJBQWlCO3NCQUZ2QixZQUFZO3VCQUFDLG1CQUFtQjtnQkFXMUIscUJBQXFCO3NCQUYzQixZQUFZO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgVmFsdWVQcm92aWRlciwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgRHJvcERvd25UcmVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRyb3Bkb3ducyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhY3Rpb25GYWlsdXJlVGVtcGxhdGUnLCdhbGxvd0ZpbHRlcmluZycsJ2FsbG93TXVsdGlTZWxlY3Rpb24nLCdjaGFuZ2VPbkJsdXInLCdjc3NDbGFzcycsJ2N1c3RvbVRlbXBsYXRlJywnZGVsaW1pdGVyQ2hhcicsJ2Rlc3Ryb3lQb3B1cE9uSGlkZScsJ2Rpc2FibGVIdG1sRW5jb2RlJywnZW5hYmxlSHRtbFNhbml0aXplcicsJ2VuYWJsZVBlcnNpc3RlbmNlJywnZW5hYmxlUnRsJywnZW5hYmxlZCcsJ2ZpZWxkcycsJ2ZpbHRlckJhclBsYWNlaG9sZGVyJywnZmlsdGVyVHlwZScsJ2Zsb2F0TGFiZWxUeXBlJywnZm9vdGVyVGVtcGxhdGUnLCdoZWFkZXJUZW1wbGF0ZScsJ2h0bWxBdHRyaWJ1dGVzJywnaWdub3JlQWNjZW50JywnaWdub3JlQ2FzZScsJ2l0ZW1UZW1wbGF0ZScsJ2xvY2FsZScsJ21vZGUnLCdub1JlY29yZHNUZW1wbGF0ZScsJ3BsYWNlaG9sZGVyJywncG9wdXBIZWlnaHQnLCdwb3B1cFdpZHRoJywncmVhZG9ubHknLCdzZWxlY3RBbGxUZXh0Jywnc2hvd0NoZWNrQm94Jywnc2hvd0NsZWFyQnV0dG9uJywnc2hvd0Ryb3BEb3duSWNvbicsJ3Nob3dTZWxlY3RBbGwnLCdzb3J0T3JkZXInLCd0ZXh0JywndHJlZVNldHRpbmdzJywndW5TZWxlY3RBbGxUZXh0JywndmFsdWUnLCd2YWx1ZVRlbXBsYXRlJywnd2lkdGgnLCd3cmFwVGV4dCcsJ3pJbmRleCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydhY3Rpb25GYWlsdXJlJywnYmVmb3JlT3BlbicsJ2JsdXInLCdjaGFuZ2UnLCdjbG9zZScsJ2NyZWF0ZWQnLCdkYXRhQm91bmQnLCdkZXN0cm95ZWQnLCdmaWx0ZXJpbmcnLCdmb2N1cycsJ2tleVByZXNzJywnb3BlbicsJ3NlbGVjdCcsJ3ZhbHVlQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ3ZhbHVlJ107XG5cbi8qKlxuKlRoZSBEcm9wRG93blRyZWUgY29tcG9uZW50IGNvbnRhaW5zIGEgbGlzdCBvZiBwcmVkZWZpbmVkIHZhbHVlcyBmcm9tIHdoaWNoIHlvdSBjYW4gY2hvb3NlIGEgc2luZ2xlIG9yIG11bHRpcGxlIHZhbHVlcy5cbipgYGBodG1sXG4qPGVqcy1kcm9wZG93bnRyZWU+PC9lanMtZHJvcGRvd250cmVlPlxuKmBgYFxuKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWRyb3Bkb3dudHJlZScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcERvd25UcmVlQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlLCBGb3JtQmFzZV0pXG5leHBvcnQgY2xhc3MgRHJvcERvd25UcmVlQ29tcG9uZW50IGV4dGVuZHMgRHJvcERvd25UcmVlIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFjdGlvbkZhaWx1cmU6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRibHVyOiBhbnk7XG5cdGNoYW5nZTogYW55O1xuXHRjbG9zZTogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGRhdGFCb3VuZDogYW55O1xuXHRkZXN0cm95ZWQ6IGFueTtcblx0ZmlsdGVyaW5nOiBhbnk7XG5cdGZvY3VzOiBhbnk7XG5cdGtleVByZXNzOiBhbnk7XG5cdG9wZW46IGFueTtcblx0c2VsZWN0OiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSB0aGF0IHJlbmRlcnMgYSBjdXN0b21pemVkIGZvb3RlciBjb250YWluZXIgYXQgdGhlIGJvdHRvbSBvZiB0aGUgcG9wLXVwIGxpc3QuIFxuICAgICAqIEJ5IGRlZmF1bHQsIHRoZSBmb290ZXJUZW1wbGF0ZSB3aWxsIGJlIG51bGwgYW5kIHRoZXJlIHdpbGwgYmUgbm8gZm9vdGVyIGNvbnRhaW5lciBmb3IgdGhlIHBvcC11cCBsaXN0LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdmb290ZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZm9vdGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSB0aGF0IHJlbmRlcnMgYSBjdXN0b21pemVkIGhlYWRlciBjb250YWluZXIgYXQgdGhlIHRvcCBvZiB0aGUgcG9wLXVwIGxpc3QuIFxuICAgICAqIEJ5IGRlZmF1bHQsIHRoZSBoZWFkZXJUZW1wbGF0ZSB3aWxsIGJlIG51bGwgYW5kIHRoZXJlIHdpbGwgYmUgbm8gaGVhZGVyIGNvbnRhaW5lciBmb3IgdGhlIHBvcC11cCBsaXN0LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaGVhZGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB3YXkgdG8gY3VzdG9taXplIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIERyb3Bkb3duIFRyZWUgY29tcG9uZW50IGJhc2VkIG9uIGFwcGxpY2F0aW9uIG5lZWRzLiBJZiB0aGUgKip2YWx1ZVRlbXBsYXRlKiogcHJvcGVydHkgaXMgc2V0LCB0aGUgdGVtcGxhdGUgY29udGVudCBvdmVycmlkZXMgdGhlIGRpc3BsYXllZCBpdGVtIHRleHQuIFxuICAgICAqIFRoZSBwcm9wZXJ0eSBhY2NlcHRzIFt0ZW1wbGF0ZSBzdHJpbmddIChodHRwczovL2VqMi5zeW5jZnVzaW9uLmNvbS9kb2N1bWVudGF0aW9uL2NvbW1vbi90ZW1wbGF0ZS1lbmdpbmUvKSBvciBIVE1MIGVsZW1lbnQgSUQgaG9sZGluZyB0aGUgY29udGVudC4gVGhlIGNvbnRleHQgZm9yIHRoZSB2YWx1ZVRlbXBsYXRlIGNvbWVzIGZyb20gdGhlIGRhdGEgb2JqZWN0IHBhc3NlZCB0byBpdC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgndmFsdWVUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdmFsdWVUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgYSB0ZW1wbGF0ZSB0byByZW5kZXIgY3VzdG9taXplZCBjb250ZW50IGZvciBhbGwgdGhlIGl0ZW1zLiBcbiAgICAgKiBJZiB0aGUgKippdGVtVGVtcGxhdGUqKiBwcm9wZXJ0eSBpcyBzZXQsIHRoZSB0ZW1wbGF0ZSBjb250ZW50IG92ZXJyaWRlcyB0aGUgZGlzcGxheWVkIGl0ZW0gdGV4dC4gXG4gICAgICogVGhlIHByb3BlcnR5IGFjY2VwdHMgW3RlbXBsYXRlIHN0cmluZ10oaHR0cHM6Ly9lajIuc3luY2Z1c2lvbi5jb20vZG9jdW1lbnRhdGlvbi9jb21tb24vdGVtcGxhdGUtZW5naW5lLykgXG4gICAgICogb3IgSFRNTCBlbGVtZW50IElEIGhvbGRpbmcgdGhlIGNvbnRlbnQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2l0ZW1UZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgdGhhdCByZW5kZXJzIGEgY3VzdG9taXplZCBwb3AtdXAgbGlzdCBjb250ZW50IHdoZW4gdGhlcmUgaXMgbm8gZGF0YSBhdmFpbGFibGUgXG4gICAgICogdG8gYmUgZGlzcGxheWVkIHdpdGhpbiB0aGUgcG9wLXVwLlxuICAgICAqIEBkZWZhdWx0ICdObyBSZWNvcmRzIEZvdW5kJ1xuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ25vUmVjb3Jkc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoJ05vIFJlY29yZHMgRm91bmQnKVxuICAgIHB1YmxpYyBub1JlY29yZHNUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRlbXBsYXRlIHRoYXQgcmVuZGVycyB0byB0aGUgcG9wdXAgbGlzdCBjb250ZW50IG9mIHRoZSBcbiAgICAgKiBEcm9wZG93biBUcmVlIGNvbXBvbmVudCB3aGVuIHRoZSBkYXRhIGZldGNoIHJlcXVlc3QgZnJvbSB0aGUgcmVtb3RlIHNlcnZlciBmYWlscy5cbiAgICAgKiBAZGVmYXVsdCAnVGhlIFJlcXVlc3QgRmFpbGVkJ1xuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2FjdGlvbkZhaWx1cmVUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKCdUaGUgUmVxdWVzdCBGYWlsZWQnKVxuICAgIHB1YmxpYyBhY3Rpb25GYWlsdXJlVGVtcGxhdGU6IGFueTtcblxuICAgIHByaXZhdGUgc2tpcEZyb21FdmVudDpib29sZWFuID0gdHJ1ZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRleHQgID0gbmV3IEZvcm1CYXNlKCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UocmVnaXN0ZXJGdW5jdGlvbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChyZWdpc3RlckZ1bmN0aW9uOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19