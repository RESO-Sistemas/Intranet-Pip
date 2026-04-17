import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { ChipList } from '@syncfusion/ej2-buttons';
import { ChipsDirective } from './chips.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowDragAndDrop', 'avatarIconCss', 'avatarText', 'chips', 'cssClass', 'dragArea', 'enableDelete', 'enablePersistence', 'enableRtl', 'enabled', 'htmlAttributes', 'leadingIconCss', 'leadingIconUrl', 'locale', 'selectedChips', 'selection', 'text', 'trailingIconCss', 'trailingIconUrl'];
export const outputs = ['beforeClick', 'click', 'created', 'delete', 'deleted', 'dragStart', 'dragStop', 'dragging'];
export const twoWays = [''];
/**
 * Represents the Essential JS 2 Angular ChipList Component.
 * ```html
 * <ejs-chiplist></ejs-chiplist>
 * ```
 */
let ChipListComponent = class ChipListComponent extends ChipList {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['chips'];
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
        this.tagObjects[0].instance = this.childChips;
        this.context.ngAfterContentChecked(this);
    }
};
ChipListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ChipListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ChipListComponent, selector: "ejs-chiplist", inputs: { allowDragAndDrop: "allowDragAndDrop", avatarIconCss: "avatarIconCss", avatarText: "avatarText", chips: "chips", cssClass: "cssClass", dragArea: "dragArea", enableDelete: "enableDelete", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", htmlAttributes: "htmlAttributes", leadingIconCss: "leadingIconCss", leadingIconUrl: "leadingIconUrl", locale: "locale", selectedChips: "selectedChips", selection: "selection", text: "text", trailingIconCss: "trailingIconCss", trailingIconUrl: "trailingIconUrl" }, outputs: { beforeClick: "beforeClick", click: "click", created: "created", delete: "delete", deleted: "deleted", dragStart: "dragStart", dragStop: "dragStop", dragging: "dragging" }, queries: [{ propertyName: "childChips", first: true, predicate: ChipsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ChipListComponent = __decorate([
    ComponentMixins([ComponentBase])
], ChipListComponent);
export { ChipListComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-chiplist',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childChips: new ContentChild(ChipsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcGxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NoaXBzL2NoaXBsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRW5ELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGtCQUFrQixFQUFDLGVBQWUsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLGVBQWUsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDNVMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsYUFBYSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXRDOzs7OztHQUtHO0lBWVUsaUJBQWlCLFNBQWpCLGlCQUFrQixTQUFRLFFBQVE7SUFjM0MsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCO1FBQ3RJLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUZuSSxTQUFJLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUk5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxxQkFBcUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FJSixDQUFBOzhHQTVDWSxpQkFBaUI7a0dBQWpCLGlCQUFpQixtekJBSk8sY0FBYyx1RUFIckMsRUFBRTtBQU9ILGlCQUFpQjtJQUQ3QixlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUNwQixpQkFBaUIsQ0E0QzdCO1NBNUNZLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQVg3QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxVQUFVLEVBQUUsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDO3FCQUMvQztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IENoaXBMaXN0IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWJ1dHRvbnMnO1xuXG5pbXBvcnQgeyBDaGlwc0RpcmVjdGl2ZSB9IGZyb20gJy4vY2hpcHMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FsbG93RHJhZ0FuZERyb3AnLCdhdmF0YXJJY29uQ3NzJywnYXZhdGFyVGV4dCcsJ2NoaXBzJywnY3NzQ2xhc3MnLCdkcmFnQXJlYScsJ2VuYWJsZURlbGV0ZScsJ2VuYWJsZVBlcnNpc3RlbmNlJywnZW5hYmxlUnRsJywnZW5hYmxlZCcsJ2h0bWxBdHRyaWJ1dGVzJywnbGVhZGluZ0ljb25Dc3MnLCdsZWFkaW5nSWNvblVybCcsJ2xvY2FsZScsJ3NlbGVjdGVkQ2hpcHMnLCdzZWxlY3Rpb24nLCd0ZXh0JywndHJhaWxpbmdJY29uQ3NzJywndHJhaWxpbmdJY29uVXJsJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZUNsaWNrJywnY2xpY2snLCdjcmVhdGVkJywnZGVsZXRlJywnZGVsZXRlZCcsJ2RyYWdTdGFydCcsJ2RyYWdTdG9wJywnZHJhZ2dpbmcnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsnJ107XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRXNzZW50aWFsIEpTIDIgQW5ndWxhciBDaGlwTGlzdCBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWNoaXBsaXN0PjwvZWpzLWNoaXBsaXN0PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWNoaXBsaXN0JyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkQ2hpcHM6IG5ldyBDb250ZW50Q2hpbGQoQ2hpcHNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIENoaXBMaXN0Q29tcG9uZW50IGV4dGVuZHMgQ2hpcExpc3QgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YmVmb3JlQ2xpY2s6IGFueTtcblx0Y2xpY2s6IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRkZWxldGU6IGFueTtcblx0ZGVsZXRlZDogYW55O1xuXHRkcmFnU3RhcnQ6IGFueTtcblx0ZHJhZ1N0b3A6IGFueTtcblx0cHVibGljIGRyYWdnaW5nOiBhbnk7XG4gICAgcHVibGljIGNoaWxkQ2hpcHM6IFF1ZXJ5TGlzdDxDaGlwc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydjaGlwcyddO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQ2hpcHM7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=