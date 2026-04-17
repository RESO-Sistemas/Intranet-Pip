import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { ItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowKeyboard', 'cssClass', 'enableCollision', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'height', 'items', 'locale', 'overflowMode', 'scrollStep', 'width'];
export const outputs = ['beforeCreate', 'clicked', 'created', 'destroyed', 'keyDown'];
export const twoWays = [''];
/**
 * Represents the Angular Toolbar Component.
 * ```html
 * <ejs-toolbar></ejs-toolbar>
 * ```
 */
let ToolbarComponent = class ToolbarComponent extends Toolbar {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
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
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
ToolbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ToolbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ToolbarComponent, selector: "ejs-toolbar", inputs: { allowKeyboard: "allowKeyboard", cssClass: "cssClass", enableCollision: "enableCollision", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", height: "height", items: "items", locale: "locale", overflowMode: "overflowMode", scrollStep: "scrollStep", width: "width" }, outputs: { beforeCreate: "beforeCreate", clicked: "clicked", created: "created", destroyed: "destroyed", keyDown: "keyDown" }, queries: [{ propertyName: "childItems", first: true, predicate: ItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='div'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ToolbarComponent = __decorate([
    ComponentMixins([ComponentBase])
], ToolbarComponent);
export { ToolbarComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-toolbar',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content select='div'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(ItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUQsdUJBQXVCLEVBQTRCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBdUQsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFbkQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLFlBQVksRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNuTSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxjQUFjLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFdEM7Ozs7O0dBS0c7SUFZVSxnQkFBZ0IsU0FBaEIsZ0JBQWlCLFNBQVEsT0FBTztJQVd6QyxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRm5JLFNBQUksR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSTlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FJSixDQUFBOzZHQXpDWSxnQkFBZ0I7aUdBQWhCLGdCQUFnQix3aUJBSlEsY0FBYyx1RUFIckMsd0NBQXdDO0FBT3pDLGdCQUFnQjtJQUQ1QixlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUNwQixnQkFBZ0IsQ0F5QzVCO1NBekNZLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQVg1QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLHdDQUF3QztvQkFDbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxVQUFVLEVBQUUsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDO3FCQUMvQztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBDb21wb25lbnRNaXhpbnMsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRvb2xiYXIgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItbmF2aWdhdGlvbnMnO1xuXG5pbXBvcnQgeyBJdGVtc0RpcmVjdGl2ZSB9IGZyb20gJy4vaXRlbXMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FsbG93S2V5Ym9hcmQnLCdjc3NDbGFzcycsJ2VuYWJsZUNvbGxpc2lvbicsJ2VuYWJsZUh0bWxTYW5pdGl6ZXInLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2hlaWdodCcsJ2l0ZW1zJywnbG9jYWxlJywnb3ZlcmZsb3dNb2RlJywnc2Nyb2xsU3RlcCcsJ3dpZHRoJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZUNyZWF0ZScsJ2NsaWNrZWQnLCdjcmVhdGVkJywnZGVzdHJveWVkJywna2V5RG93biddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBbmd1bGFyIFRvb2xiYXIgQ29tcG9uZW50LlxuICogYGBgaHRtbFxuICogPGVqcy10b29sYmFyPjwvZWpzLXRvb2xiYXI+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtdG9vbGJhcicsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50IHNlbGVjdD0nZGl2Jz48L25nLWNvbnRlbnQ+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkSXRlbXM6IG5ldyBDb250ZW50Q2hpbGQoSXRlbXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJDb21wb25lbnQgZXh0ZW5kcyBUb29sYmFyIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250YWluZXJDb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGJlZm9yZUNyZWF0ZTogYW55O1xuXHRjbGlja2VkOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGVzdHJveWVkOiBhbnk7XG5cdHB1YmxpYyBrZXlEb3duOiBhbnk7XG4gICAgcHVibGljIGNoaWxkSXRlbXM6IFF1ZXJ5TGlzdDxJdGVtc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydpdGVtcyddO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkSXRlbXM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=