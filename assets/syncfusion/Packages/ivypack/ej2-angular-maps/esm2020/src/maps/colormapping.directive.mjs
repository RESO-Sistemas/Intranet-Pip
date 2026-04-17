import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['color', 'from', 'label', 'maxOpacity', 'minOpacity', 'showLegend', 'to', 'value'];
let outputs = [];
/**
 * Represents the directive to define the bubble color mapping in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-colorMappings>
 * <e-colorMapping>
 * </e-colorMapping>
 * </e-colorMappings>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export class ColorMappingDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ColorMappingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorMappingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ColorMappingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColorMappingDirective, selector: "e-bubbleSettings>e-colorMappings>e-colorMapping", inputs: { color: "color", from: "from", label: "label", maxOpacity: "maxOpacity", minOpacity: "minOpacity", showLegend: "showLegend", to: "to", value: "value" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorMappingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-bubbleSettings>e-colorMappings>e-colorMapping',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * ColorMapping Array Directive
 * @private
 */
export class ColorMappingsDirective extends ArrayBase {
    constructor() {
        super('colormapping');
    }
}
ColorMappingsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorMappingsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ColorMappingsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColorMappingsDirective, selector: "e-bubbleSettings>e-colorMappings", queries: [{ propertyName: "children", predicate: ColorMappingDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorMappingsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-bubbleSettings>e-colorMappings',
                    queries: {
                        children: new ContentChildren(ColorMappingDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JtYXBwaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYXBzL2NvbG9ybWFwcGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFTSCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsV0FBa0M7SUFnRHpFLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7a0hBckRRLHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBUmpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlEQUFpRDtvQkFDM0QsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQXlERDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsU0FBaUM7SUFDekU7UUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7bUhBSFEsc0JBQXNCO3VHQUF0QixzQkFBc0IsaUdBSEcscUJBQXFCOzJGQUc5QyxzQkFBc0I7a0JBTmxDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztxQkFDdkQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2NvbG9yJywgJ2Zyb20nLCAnbGFiZWwnLCAnbWF4T3BhY2l0eScsICdtaW5PcGFjaXR5JywgJ3Nob3dMZWdlbmQnLCAndG8nLCAndmFsdWUnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkaXJlY3RpdmUgdG8gZGVmaW5lIHRoZSBidWJibGUgY29sb3IgbWFwcGluZyBpbiB0aGUgbWFwcy5cbiAqIGBgYGh0bWxcbiAqIDxlLWxheWVycz5cbiAqIDxlLWxheWVyPlxuICogPGUtYnViYmxlU2V0dGluZ3M+XG4gKiA8ZS1jb2xvck1hcHBpbmdzPlxuICogPGUtY29sb3JNYXBwaW5nPlxuICogPC9lLWNvbG9yTWFwcGluZz5cbiAqIDwvZS1jb2xvck1hcHBpbmdzPlxuICogPC9lLWJ1YmJsZVNldHRpbmdzPlxuICogPC9lLWxheWVyPlxuICogPC9lLWxheWVycz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtYnViYmxlU2V0dGluZ3M+ZS1jb2xvck1hcHBpbmdzPmUtY29sb3JNYXBwaW5nJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JNYXBwaW5nRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8Q29sb3JNYXBwaW5nRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjb2xvciBmb3IgdGhlIGNvbG9yLW1hcHBpbmcgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdmFsdWUgZnJvbSB3aGVyZSB0aGUgcmFuZ2UgZm9yIHRoZSBjb2xvci1tYXBwaW5nIHN0YXJ0cy5cbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvbTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGxhYmVsIGZvciB0aGUgY29sb3ItbWFwcGluZyB0byBkaXNwbGF5IGluIHRoZSBsZWdlbmQgaXRlbSB0ZXh0LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgbGFiZWw6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtYXhpbXVtIG9wYWNpdHkgZm9yIHRoZSBjb2xvci1tYXBwaW5nIGluIG1hcHMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBtYXhPcGFjaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSBvcGFjaXR5IGZvciB0aGUgY29sb3ItbWFwcGluZyBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgbWluT3BhY2l0eTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBFbmFibGVzIG9yIGRpc2FibGVzIHRoZSB2aXNpYmlsaXR5IG9mIGxlZ2VuZCBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgY29sb3ItbWFwcGVkIHNoYXBlcyBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd0xlZ2VuZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHZhbHVlIHRvIHdoZXJlIHRoZSByYW5nZSBmb3IgdGhlIGNvbG9yLW1hcHBpbmcgZW5kcy5cbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdG86IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB2YWx1ZSBmcm9tIHRoZSBkYXRhIHNvdXJjZSB0byBtYXAgdGhlIGNvcnJlc3BvbmRpbmcgY29sb3JzIHRvIHRoZSBzaGFwZXMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQ29sb3JNYXBwaW5nIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWJ1YmJsZVNldHRpbmdzPmUtY29sb3JNYXBwaW5ncycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihDb2xvck1hcHBpbmdEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JNYXBwaW5nc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxDb2xvck1hcHBpbmdzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjb2xvcm1hcHBpbmcnKTtcbiAgICB9XG59Il19