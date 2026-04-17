import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { QRCodeGenerator } from '@syncfusion/ej2-barcode-generator';
import * as i0 from "@angular/core";
export const inputs = ['backgroundColor', 'displayText', 'enablePersistence', 'enableRtl', 'errorCorrectionLevel', 'foreColor', 'height', 'locale', 'logo', 'margin', 'mode', 'value', 'version', 'width', 'xDimension'];
export const outputs = ['invalid'];
export const twoWays = [''];
/**
 * QRCode Component
 * ```html
 * <ej-qrcode-generator></ej-qrcode-generator>
 * ```
 */
let QRCodeGeneratorComponent = class QRCodeGeneratorComponent extends QRCodeGenerator {
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
QRCodeGeneratorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QRCodeGeneratorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
QRCodeGeneratorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: QRCodeGeneratorComponent, selector: "ejs-qrcodegenerator", inputs: { backgroundColor: "backgroundColor", displayText: "displayText", enablePersistence: "enablePersistence", enableRtl: "enableRtl", errorCorrectionLevel: "errorCorrectionLevel", foreColor: "foreColor", height: "height", locale: "locale", logo: "logo", margin: "margin", mode: "mode", value: "value", version: "version", width: "width", xDimension: "xDimension" }, outputs: { invalid: "invalid" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
QRCodeGeneratorComponent = __decorate([
    ComponentMixins([ComponentBase])
], QRCodeGeneratorComponent);
export { QRCodeGeneratorComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QRCodeGeneratorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-qrcodegenerator',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXJjb2RlZ2VuZXJhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xcmNvZGUtZ2VuZXJhdG9yL3FyY29kZWdlbmVyYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxNQUFNLGVBQWUsQ0FBQztBQUNoSixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFJcEUsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsaUJBQWlCLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxzQkFBc0IsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxZQUFZLENBQUMsQ0FBQztBQUNyTixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUV0Qzs7Ozs7R0FLRztJQVlVLHdCQUF3QixTQUF4Qix3QkFBeUIsU0FBUSxlQUFlO0lBT3pELFlBQW9CLEtBQWlCLEVBQVUsU0FBb0IsRUFBVSxnQkFBaUMsRUFBVSxRQUFrQjtRQUN0SSxLQUFLLEVBQUUsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFdEksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0scUJBQXFCO1FBRXhCLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUlKLENBQUE7cUhBckNZLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLHFlQVB2QixFQUFFO0FBT0gsd0JBQXdCO0lBRHBDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLHdCQUF3QixDQXFDcEM7U0FyQ1ksd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBWHBDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUUsRUFFUjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBRUkNvZGVHZW5lcmF0b3IgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYmFyY29kZS1nZW5lcmF0b3InO1xuXG5cblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2JhY2tncm91bmRDb2xvcicsJ2Rpc3BsYXlUZXh0JywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlcnJvckNvcnJlY3Rpb25MZXZlbCcsJ2ZvcmVDb2xvcicsJ2hlaWdodCcsJ2xvY2FsZScsJ2xvZ28nLCdtYXJnaW4nLCdtb2RlJywndmFsdWUnLCd2ZXJzaW9uJywnd2lkdGgnLCd4RGltZW5zaW9uJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2ludmFsaWQnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsnJ107XG5cbi8qKlxuICogUVJDb2RlIENvbXBvbmVudFxuICogYGBgaHRtbFxuICogPGVqLXFyY29kZS1nZW5lcmF0b3I+PC9lai1xcmNvZGUtZ2VuZXJhdG9yPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXFyY29kZWdlbmVyYXRvcicsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFFSQ29kZUdlbmVyYXRvckNvbXBvbmVudCBleHRlbmRzIFFSQ29kZUdlbmVyYXRvciBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRwdWJsaWMgaW52YWxpZDogYW55O1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuY29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=