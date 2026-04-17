import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { SymbolPalette } from '@syncfusion/ej2-diagrams';
import { Template } from '@syncfusion/ej2-angular-base';
import { PalettesDirective } from './palettes.directive';
import * as i0 from "@angular/core";
export const inputs = ['accessKey', 'allowDrag', 'connectorDefaults', 'enableAnimation', 'enablePersistence', 'enableRtl', 'enableSearch', 'expandMode', 'filterSymbols', 'getConnectorDefaults', 'getNodeDefaults', 'getSymbolInfo', 'getSymbolTemplate', 'height', 'ignoreSymbolsOnSearch', 'locale', 'nodeDefaults', 'nodeTemplate', 'palettes', 'symbolDragSize', 'symbolHeight', 'symbolInfo', 'symbolMargin', 'symbolPreview', 'symbolWidth', 'width'];
export const outputs = ['paletteExpanding', 'paletteSelectionChange'];
export const twoWays = [''];
/**
 * SymbolPalette Component
 * ```html
 * <ej-symbol-palette></ej-symbol-palette>
 * ```
 */
let SymbolPaletteComponent = class SymbolPaletteComponent extends SymbolPalette {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['palettes'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('DiagramsBpmnDiagrams');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
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
        this.tagObjects[0].instance = this.childPalettes;
        this.context.ngAfterContentChecked(this);
    }
};
SymbolPaletteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SymbolPaletteComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SymbolPaletteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SymbolPaletteComponent, selector: "ejs-symbolpalette", inputs: { accessKey: "accessKey", allowDrag: "allowDrag", connectorDefaults: "connectorDefaults", enableAnimation: "enableAnimation", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableSearch: "enableSearch", expandMode: "expandMode", filterSymbols: "filterSymbols", getConnectorDefaults: "getConnectorDefaults", getNodeDefaults: "getNodeDefaults", getSymbolInfo: "getSymbolInfo", getSymbolTemplate: "getSymbolTemplate", height: "height", ignoreSymbolsOnSearch: "ignoreSymbolsOnSearch", locale: "locale", nodeDefaults: "nodeDefaults", nodeTemplate: "nodeTemplate", palettes: "palettes", symbolDragSize: "symbolDragSize", symbolHeight: "symbolHeight", symbolInfo: "symbolInfo", symbolMargin: "symbolMargin", symbolPreview: "symbolPreview", symbolWidth: "symbolWidth", width: "width" }, outputs: { paletteExpanding: "paletteExpanding", paletteSelectionChange: "paletteSelectionChange" }, queries: [{ propertyName: "nodeTemplate", first: true, predicate: ["nodeTemplate"], descendants: true }, { propertyName: "childPalettes", first: true, predicate: PalettesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], SymbolPaletteComponent.prototype, "nodeTemplate", void 0);
SymbolPaletteComponent = __decorate([
    ComponentMixins([ComponentBase])
], SymbolPaletteComponent);
export { SymbolPaletteComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SymbolPaletteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-symbolpalette',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childPalettes: new ContentChild(PalettesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { nodeTemplate: [{
                type: ContentChild,
                args: ['nodeTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scGFsZXR0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3ltYm9sLXBhbGV0dGUvc3ltYm9scGFsZXR0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUV6RCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLG1CQUFtQixFQUFDLGlCQUFpQixFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxpQkFBaUIsRUFBQyxlQUFlLEVBQUMsbUJBQW1CLEVBQUMsUUFBUSxFQUFDLHVCQUF1QixFQUFDLFFBQVEsRUFBQyxjQUFjLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxnQkFBZ0IsRUFBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLGNBQWMsRUFBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlhLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLGtCQUFrQixFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0UsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFdEM7Ozs7O0dBS0c7SUFZVSxzQkFBc0IsU0FBdEIsc0JBQXVCLFNBQVEsYUFBYTtJQWdCckQsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCO1FBQ3RJLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVZuSSxTQUFJLEdBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQVlqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDbEQsSUFBSTtZQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEQsSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakM7U0FDSjtRQUFDLE1BQU0sR0FBRztRQUVmLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBSUosQ0FBQTttSEFwRFksc0JBQXNCO3VHQUF0QixzQkFBc0IsNGtDQUpLLGlCQUFpQix1RUFIM0MsRUFBRTtBQXFCWjtJQURDLFFBQVEsRUFBRTs0REFDYztBQWRoQixzQkFBc0I7SUFEbEMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsc0JBQXNCLENBb0RsQztTQXBEWSxzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFYbEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxhQUFhLEVBQUUsSUFBSSxZQUFZLENBQUMsaUJBQWlCLENBQUM7cUJBQ3JEO2lCQUNKOytLQWdCVSxZQUFZO3NCQUZsQixZQUFZO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBTeW1ib2xQYWxldHRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRpYWdyYW1zJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBQYWxldHRlc0RpcmVjdGl2ZSB9IGZyb20gJy4vcGFsZXR0ZXMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FjY2Vzc0tleScsJ2FsbG93RHJhZycsJ2Nvbm5lY3RvckRlZmF1bHRzJywnZW5hYmxlQW5pbWF0aW9uJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVTZWFyY2gnLCdleHBhbmRNb2RlJywnZmlsdGVyU3ltYm9scycsJ2dldENvbm5lY3RvckRlZmF1bHRzJywnZ2V0Tm9kZURlZmF1bHRzJywnZ2V0U3ltYm9sSW5mbycsJ2dldFN5bWJvbFRlbXBsYXRlJywnaGVpZ2h0JywnaWdub3JlU3ltYm9sc09uU2VhcmNoJywnbG9jYWxlJywnbm9kZURlZmF1bHRzJywnbm9kZVRlbXBsYXRlJywncGFsZXR0ZXMnLCdzeW1ib2xEcmFnU2l6ZScsJ3N5bWJvbEhlaWdodCcsJ3N5bWJvbEluZm8nLCdzeW1ib2xNYXJnaW4nLCdzeW1ib2xQcmV2aWV3Jywnc3ltYm9sV2lkdGgnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydwYWxldHRlRXhwYW5kaW5nJywncGFsZXR0ZVNlbGVjdGlvbkNoYW5nZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBTeW1ib2xQYWxldHRlIENvbXBvbmVudFxuICogYGBgaHRtbFxuICogPGVqLXN5bWJvbC1wYWxldHRlPjwvZWotc3ltYm9sLXBhbGV0dGU+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtc3ltYm9scGFsZXR0ZScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZFBhbGV0dGVzOiBuZXcgQ29udGVudENoaWxkKFBhbGV0dGVzRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBTeW1ib2xQYWxldHRlQ29tcG9uZW50IGV4dGVuZHMgU3ltYm9sUGFsZXR0ZSBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRwYWxldHRlRXhwYW5kaW5nOiBhbnk7XG5cdHB1YmxpYyBwYWxldHRlU2VsZWN0aW9uQ2hhbmdlOiBhbnk7XG4gICAgcHVibGljIGNoaWxkUGFsZXR0ZXM6IFF1ZXJ5TGlzdDxQYWxldHRlc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydwYWxldHRlcyddO1xuICAgIC8qKiBcbiAgICAgKiBIZWxwcyB0byBDdXN0b21pemVzIHRoZSBub2RlIHRlbXBsYXRlXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbm9kZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBub2RlVGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0JwbW5EaWFncmFtcycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRQYWxldHRlcztcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==