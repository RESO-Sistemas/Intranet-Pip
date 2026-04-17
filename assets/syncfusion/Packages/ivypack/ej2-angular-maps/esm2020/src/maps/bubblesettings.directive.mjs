import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColorMappingsDirective } from './colormapping.directive';
import * as i0 from "@angular/core";
let input = ['animationDelay', 'animationDuration', 'border', 'bubbleType', 'colorMapping', 'colorValuePath', 'dataSource', 'fill', 'highlightSettings', 'maxRadius', 'minRadius', 'opacity', 'query', 'selectionSettings', 'tooltipSettings', 'valuePath', 'visible'];
let outputs = [];
/**
 * Represents the directive to define the bubbles in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export class BubbleDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['colorMapping'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
BubbleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BubbleDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
BubbleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: BubbleDirective, selector: "e-layer>e-bubbleSettings>e-bubbleSetting", inputs: { animationDelay: "animationDelay", animationDuration: "animationDuration", border: "border", bubbleType: "bubbleType", colorMapping: "colorMapping", colorValuePath: "colorValuePath", dataSource: "dataSource", fill: "fill", highlightSettings: "highlightSettings", maxRadius: "maxRadius", minRadius: "minRadius", opacity: "opacity", query: "query", selectionSettings: "selectionSettings", tooltipSettings: "tooltipSettings", valuePath: "valuePath", visible: "visible" }, queries: [{ propertyName: "tooltipSettings_template", first: true, predicate: ["tooltipSettingsTemplate"], descendants: true }, { propertyName: "childColorMapping", first: true, predicate: ColorMappingsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], BubbleDirective.prototype, "tooltipSettings_template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BubbleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-layer>e-bubbleSettings>e-bubbleSetting',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childColorMapping: new ContentChild(ColorMappingsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { tooltipSettings_template: [{
                type: ContentChild,
                args: ['tooltipSettingsTemplate']
            }] } });
/**
 * Bubble Array Directive
 * @private
 */
export class BubblesDirective extends ArrayBase {
    constructor() {
        super('bubblesettings');
    }
}
BubblesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BubblesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BubblesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: BubblesDirective, selector: "e-layer>e-bubbleSettings", queries: [{ propertyName: "children", predicate: BubbleDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BubblesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-layer>e-bubbleSettings',
                    queries: {
                        children: new ContentChildren(BubbleDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlc2V0dGluZ3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21hcHMvYnViYmxlc2V0dGluZ3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFbEUsSUFBSSxLQUFLLEdBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDalIsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7Ozs7R0FZRztBQVNILE1BQU0sT0FBTyxlQUFnQixTQUFRLFdBQTRCO0lBK0Y3RCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBM0Y5QyxTQUFJLEdBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQTZGckMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7NEdBcEdRLGVBQWU7Z0dBQWYsZUFBZSxtdEJBSGdCLHNCQUFzQjtBQWdHOUQ7SUFEQyxRQUFRLEVBQUU7aUVBQzBCOzJGQTdGNUIsZUFBZTtrQkFSM0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFO3dCQUNMLGlCQUFpQixFQUFFLElBQUksWUFBWSxDQUFDLHNCQUFzQixDQUFDO3FCQUM5RDtpQkFDSjt1R0E4RlUsd0JBQXdCO3NCQUY5QixZQUFZO3VCQUFDLHlCQUF5Qjs7QUFZM0M7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQTJCO0lBQzdEO1FBQ0ksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUIsQ0FBQzs7NkdBSFEsZ0JBQWdCO2lHQUFoQixnQkFBZ0IseUZBSFMsZUFBZTsyRkFHeEMsZ0JBQWdCO2tCQU41QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDO3FCQUNqRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgQ29sb3JNYXBwaW5nc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sb3JtYXBwaW5nLmRpcmVjdGl2ZSc7XG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2FuaW1hdGlvbkRlbGF5JywgJ2FuaW1hdGlvbkR1cmF0aW9uJywgJ2JvcmRlcicsICdidWJibGVUeXBlJywgJ2NvbG9yTWFwcGluZycsICdjb2xvclZhbHVlUGF0aCcsICdkYXRhU291cmNlJywgJ2ZpbGwnLCAnaGlnaGxpZ2h0U2V0dGluZ3MnLCAnbWF4UmFkaXVzJywgJ21pblJhZGl1cycsICdvcGFjaXR5JywgJ3F1ZXJ5JywgJ3NlbGVjdGlvblNldHRpbmdzJywgJ3Rvb2x0aXBTZXR0aW5ncycsICd2YWx1ZVBhdGgnLCAndmlzaWJsZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpcmVjdGl2ZSB0byBkZWZpbmUgdGhlIGJ1YmJsZXMgaW4gdGhlIG1hcHMuXG4gKiBgYGBodG1sXG4gKiA8ZS1sYXllcnM+XG4gKiA8ZS1sYXllcj5cbiAqIDxlLWJ1YmJsZVNldHRpbmdzPlxuICogPGUtYnViYmxlU2V0dGluZz5cbiAqIDwvZS1idWJibGVTZXR0aW5nPlxuICogPC9lLWJ1YmJsZVNldHRpbmdzPlxuICogPC9lLWxheWVyPlxuICogPC9lLWxheWVycz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtbGF5ZXI+ZS1idWJibGVTZXR0aW5ncz5lLWJ1YmJsZVNldHRpbmcnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZENvbG9yTWFwcGluZzogbmV3IENvbnRlbnRDaGlsZChDb2xvck1hcHBpbmdzRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQnViYmxlRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8QnViYmxlRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuICAgIHB1YmxpYyBjaGlsZENvbG9yTWFwcGluZzogYW55O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnY29sb3JNYXBwaW5nJ107XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZGVsYXkgaW4gYW5pbWF0aW9uIGZvciB0aGUgYnViYmxlcyBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgYW5pbWF0aW9uRGVsYXk6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBkdXJhdGlvbiBmb3IgdGhlIGFuaW1hdGlvbiBvZiB0aGUgYnViYmxlcyBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IDEwMDBcbiAgICAgKi9cbiAgICBwdWJsaWMgYW5pbWF0aW9uRHVyYXRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBvcHRpb25zIHRvIGN1c3RvbWl6ZSB0aGUgc3R5bGUgcHJvcGVydGllcyBvZiB0aGUgYm9yZGVyIGZvciB0aGUgYnViYmxlcyBpbiBtYXBzLlxuICAgICAqL1xuICAgIHB1YmxpYyBib3JkZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0eXBlIG9mIHRoZSBidWJibGUgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCBDaXJjbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgYnViYmxlVHlwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNvbG9yLW1hcHBpbmcgZm9yIHRoZSBidWJibGVzIGluIG1hcHMuXG4gICAgICogQGRlZmF1bHQgW11cbiAgICAgKi9cbiAgICBwdWJsaWMgY29sb3JNYXBwaW5nOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZmllbGQgbmFtZSBmcm9tIHRoZSBkYXRhIHNvdXJjZSBvZiBidWJibGUgc2V0dGluZ3MgdG8gc2V0IHRoZSBjb2xvciBmb3IgZWFjaCBidWJibGUgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yVmFsdWVQYXRoOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBidWJibGUuIFxuICAgICAqIFRoZSBkYXRhIHNvdXJjZSBtdXN0IGNvbnRhaW4gdGhlIHNpemUgdmFsdWUgb2YgdGhlIGJ1YmJsZSB0aGF0IGNhbiBiZSBib3VuZCB0byB0aGUgYnViYmxlIFxuICAgICAqIG9mIHRoZSBtYXBzIHVzaW5nIHRoZSBgdmFsdWVQYXRoYCBwcm9wZXJ0eSBpbiB0aGUgYGJ1YmJsZVNldHRpbmdzYC4gXG4gICAgICogVGhlIGRhdGEgc291cmNlIGNhbiBjb250YWluIGRhdGEgc3VjaCBhcyBjb2xvciBhbmQgb3RoZXIgaW5mb3JtYXRpb25zIHRoYXQgY2FuIGJlIGJvdW5kIHRvIHRoZSBidWJibGUgYW5kIHRvb2x0aXAgb2YgdGhlIGJ1YmJsZS5cbiAgICAgKiBAaXNvYnNlcnZhYmxlIHRydWVcbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhU291cmNlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY29sb3IgZm9yIHRoZSBidWJibGVzIGluIG1hcHMuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgZmlsbDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBoaWdobGlnaHQgb2YgdGhlIGJ1YmJsZXMgaW4gbWFwcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGlnaGxpZ2h0U2V0dGluZ3M6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtYXhpbXVtIHJhZGl1cyBmb3IgdGhlIGJ1YmJsZXMgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAyMFxuICAgICAqL1xuICAgIHB1YmxpYyBtYXhSYWRpdXM6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHJhZGl1cyBmb3IgdGhlIGJ1YmJsZXMgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAqL1xuICAgIHB1YmxpYyBtaW5SYWRpdXM6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSBidWJibGVzIGluIG1hcHMuXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIHB1YmxpYyBvcGFjaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgcXVlcnkgdG8gc2VsZWN0IHBhcnRpY3VsYXIgZGF0YSBmcm9tIHRoZSBidWJibGUgZGF0YSBzb3VyY2UuIFxuICAgICAqIFRoaXMgcHJvcGVydHkgaXMgYXBwbGljYWJsZSBvbmx5IHdoZW4gdGhlIGRhdGEgc291cmNlIGlzIGNyZWF0ZWQgYnkgZGF0YSBtYW5hZ2VyLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgcXVlcnk6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBvcHRpb25zIHRvIGN1c3RvbWl6ZSB0aGUgc2VsZWN0aW9uIG9mIHRoZSBidWJibGVzIGluIG1hcHMuXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdGlvblNldHRpbmdzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgb3B0aW9ucyB0byBjdXN0b21pemUgdGhlIHRvb2x0aXAgb2YgdGhlIGJ1YmJsZXMgaW4gbWFwcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9vbHRpcFNldHRpbmdzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZmllbGQgbmFtZSBmcm9tIHRoZSBkYXRhIHNvdXJjZSBvZiBidWJibGUgc2V0dGluZ3MgYmFzZWQgb24gd2hpY2ggdGhlIGJ1YmJsZXMgYXJlIHJlbmRlcmVkIG9uIHRoZSBtYXBzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsdWVQYXRoOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGJ1YmJsZXMgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRvb2x0aXBTZXR0aW5nc190ZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQnViYmxlIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWxheWVyPmUtYnViYmxlU2V0dGluZ3MnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQnViYmxlRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIEJ1YmJsZXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8QnViYmxlc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignYnViYmxlc2V0dGluZ3MnKTtcbiAgICB9XG59Il19