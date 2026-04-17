import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { RecurrenceEditor } from '@syncfusion/ej2-schedule';
import * as i0 from "@angular/core";
export const inputs = ['calendarMode', 'cssClass', 'dateFormat', 'enablePersistence', 'enableRtl', 'endTypes', 'firstDayOfWeek', 'frequencies', 'locale', 'maxDate', 'minDate', 'selectedType', 'startDate', 'value'];
export const outputs = ['change', 'created', 'destroyed'];
export const twoWays = [];
/**
 * `ejs-recurrenceeditor` represents the Angular RecurrenceEditor Component.
 * ```html
 * <ejs-recurrenceeditor></ejs-recurrenceeditor>
 * ```
 */
let RecurrenceEditorComponent = class RecurrenceEditorComponent extends RecurrenceEditor {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
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
        this.context.ngAfterContentChecked(this);
    }
};
RecurrenceEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RecurrenceEditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecurrenceEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: RecurrenceEditorComponent, selector: "ejs-recurrenceeditor", inputs: { calendarMode: "calendarMode", cssClass: "cssClass", dateFormat: "dateFormat", enablePersistence: "enablePersistence", enableRtl: "enableRtl", endTypes: "endTypes", firstDayOfWeek: "firstDayOfWeek", frequencies: "frequencies", locale: "locale", maxDate: "maxDate", minDate: "minDate", selectedType: "selectedType", startDate: "startDate", value: "value" }, outputs: { change: "change", created: "created", destroyed: "destroyed" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
RecurrenceEditorComponent = __decorate([
    ComponentMixins([ComponentBase])
], RecurrenceEditorComponent);
export { RecurrenceEditorComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RecurrenceEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-recurrenceeditor',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJyZW5jZWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcmVjdXJyZW5jZS1lZGl0b3IvcmVjdXJyZW5jZWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxNQUFNLGVBQWUsQ0FBQztBQUNoSixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUk1RCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxjQUFjLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25OLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEUsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUVwQzs7Ozs7R0FLRztJQVlVLHlCQUF5QixTQUF6Qix5QkFBMEIsU0FBUSxnQkFBZ0I7SUFTM0QsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCO1FBQ3RJLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUV0SSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxxQkFBcUI7UUFFeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBSUosQ0FBQTtzSEF2Q1kseUJBQXlCOzBHQUF6Qix5QkFBeUIsNGdCQVB4QixFQUFFO0FBT0gseUJBQXlCO0lBRHJDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLHlCQUF5QixDQXVDckM7U0F2Q1kseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBWHJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUUsRUFFUjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBSZWN1cnJlbmNlRWRpdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXNjaGVkdWxlJztcblxuXG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydjYWxlbmRhck1vZGUnLCdjc3NDbGFzcycsJ2RhdGVGb3JtYXQnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2VuZFR5cGVzJywnZmlyc3REYXlPZldlZWsnLCdmcmVxdWVuY2llcycsJ2xvY2FsZScsJ21heERhdGUnLCdtaW5EYXRlJywnc2VsZWN0ZWRUeXBlJywnc3RhcnREYXRlJywndmFsdWUnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnY2hhbmdlJywnY3JlYXRlZCcsJ2Rlc3Ryb3llZCddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gW107XG5cbi8qKlxuICogYGVqcy1yZWN1cnJlbmNlZWRpdG9yYCByZXByZXNlbnRzIHRoZSBBbmd1bGFyIFJlY3VycmVuY2VFZGl0b3IgQ29tcG9uZW50LlxuICogYGBgaHRtbFxuICogPGVqcy1yZWN1cnJlbmNlZWRpdG9yPjwvZWpzLXJlY3VycmVuY2VlZGl0b3I+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtcmVjdXJyZW5jZWVkaXRvcicsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFJlY3VycmVuY2VFZGl0b3JDb21wb25lbnQgZXh0ZW5kcyBSZWN1cnJlbmNlRWRpdG9yIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGNoYW5nZTogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdHB1YmxpYyBkZXN0cm95ZWQ6IGFueTtcblxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19