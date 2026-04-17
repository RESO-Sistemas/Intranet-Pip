import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { SpeechToText } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export const inputs = ['allowInterimResults', 'buttonSettings', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'lang', 'listeningState', 'locale', 'showTooltip', 'tooltipSettings', 'transcript'];
export const outputs = ['created', 'onError', 'onStart', 'onStop', 'transcriptChanged', 'transcriptChange'];
export const twoWays = ['transcript'];
/**
 * Represents the EJ2 Angular SpeechToText Component.
 * ```html
 * <button ejs-speechtotext ></button>
 * ```
 */
let SpeechToTextComponent = class SpeechToTextComponent extends SpeechToText {
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
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.containerContext.ngAfterContentChecked(this);
    }
};
SpeechToTextComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SpeechToTextComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SpeechToTextComponent, selector: "[ejs-speechtotext]", inputs: { allowInterimResults: "allowInterimResults", buttonSettings: "buttonSettings", cssClass: "cssClass", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", lang: "lang", listeningState: "listeningState", locale: "locale", showTooltip: "showTooltip", tooltipSettings: "tooltipSettings", transcript: "transcript" }, outputs: { created: "created", onError: "onError", onStart: "onStart", onStop: "onStop", transcriptChanged: "transcriptChanged", transcriptChange: "transcriptChange" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SpeechToTextComponent = __decorate([
    ComponentMixins([ComponentBase])
], SpeechToTextComponent);
export { SpeechToTextComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-speechtotext]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWNodG90ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zcGVlY2gtdG8tdGV4dC9zcGVlY2h0b3RleHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxRCx1QkFBdUIsRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQXVELFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFJdEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMscUJBQXFCLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsaUJBQWlCLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFDOU4sTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLG1CQUFtQixFQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDakgsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFaEQ7Ozs7O0dBS0c7SUFZVSxxQkFBcUIsU0FBckIscUJBQXNCLFNBQVEsWUFBWTtJQVluRCxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXRJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBRXhCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBSUosQ0FBQTtrSEExQ1kscUJBQXFCO3NHQUFyQixxQkFBcUIsOG5CQVBwQiw0QkFBNEI7QUFPN0IscUJBQXFCO0lBRGpDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLHFCQUFxQixDQTBDakM7U0ExQ1kscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBWGpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUUsRUFFUjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgQ29tcG9uZW50TWl4aW5zLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBTcGVlY2hUb1RleHQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW5wdXRzJztcblxuXG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhbGxvd0ludGVyaW1SZXN1bHRzJywnYnV0dG9uU2V0dGluZ3MnLCdjc3NDbGFzcycsJ2Rpc2FibGVkJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdodG1sQXR0cmlidXRlcycsJ2xhbmcnLCdsaXN0ZW5pbmdTdGF0ZScsJ2xvY2FsZScsJ3Nob3dUb29sdGlwJywndG9vbHRpcFNldHRpbmdzJywndHJhbnNjcmlwdCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydjcmVhdGVkJywnb25FcnJvcicsJ29uU3RhcnQnLCdvblN0b3AnLCd0cmFuc2NyaXB0Q2hhbmdlZCcsJ3RyYW5zY3JpcHRDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsndHJhbnNjcmlwdCddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVKMiBBbmd1bGFyIFNwZWVjaFRvVGV4dCBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8YnV0dG9uIGVqcy1zcGVlY2h0b3RleHQgPjwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW2Vqcy1zcGVlY2h0b3RleHRdJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgPjwvbmctY29udGVudD5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBTcGVlY2hUb1RleHRDb21wb25lbnQgZXh0ZW5kcyBTcGVlY2hUb1RleHQgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRhaW5lckNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRvbkVycm9yOiBhbnk7XG5cdG9uU3RhcnQ6IGFueTtcblx0b25TdG9wOiBhbnk7XG5cdHRyYW5zY3JpcHRDaGFuZ2VkOiBhbnk7XG5cdHB1YmxpYyB0cmFuc2NyaXB0Q2hhbmdlOiBhbnk7XG5cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==