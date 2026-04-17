import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['angle', 'arrowSettings', 'color', 'dashArray', 'highlightSettings', 'latitude', 'longitude', 'selectionSettings', 'visible', 'width'];
let outputs = [];
/**
 * Represents the directive to define the navigation lines in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-navigationLineSettings>
 * <e-navigationLineSetting>
 * </e-navigationLineSetting>
 * </e-navigationLineSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export class NavigationLineDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
NavigationLineDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NavigationLineDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NavigationLineDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NavigationLineDirective, selector: "e-layer>e-navigationLineSettings>e-navigationLineSetting", inputs: { angle: "angle", arrowSettings: "arrowSettings", color: "color", dashArray: "dashArray", highlightSettings: "highlightSettings", latitude: "latitude", longitude: "longitude", selectionSettings: "selectionSettings", visible: "visible", width: "width" }, queries: [{ propertyName: "tooltipSettings_template", first: true, predicate: ["tooltipSettingsTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], NavigationLineDirective.prototype, "tooltipSettings_template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NavigationLineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-layer>e-navigationLineSettings>e-navigationLineSetting',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { tooltipSettings_template: [{
                type: ContentChild,
                args: ['tooltipSettingsTemplate']
            }] } });
/**
 * NavigationLine Array Directive
 * @private
 */
export class NavigationLinesDirective extends ArrayBase {
    constructor() {
        super('navigationlinesettings');
    }
}
NavigationLinesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NavigationLinesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NavigationLinesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NavigationLinesDirective, selector: "e-layer>e-navigationLineSettings", queries: [{ propertyName: "children", predicate: NavigationLineDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NavigationLinesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-layer>e-navigationLineSettings',
                    queries: {
                        children: new ContentChildren(NavigationLineDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbmxpbmVzZXR0aW5ncy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWFwcy9uYXZpZ2F0aW9ubGluZXNldHRpbmdzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELElBQUksS0FBSyxHQUFhLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlKLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsV0FBb0M7SUF3RDdFLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7b0hBN0RRLHVCQUF1Qjt3R0FBdkIsdUJBQXVCO0FBc0RoQztJQURDLFFBQVEsRUFBRTt5RUFDMEI7MkZBdEQ1Qix1QkFBdUI7a0JBUm5DLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBEQUEwRDtvQkFDcEUsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQXVEVSx3QkFBd0I7c0JBRjlCLFlBQVk7dUJBQUMseUJBQXlCOztBQVkzQzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsU0FBbUM7SUFDN0U7UUFDSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNwQyxDQUFDOztxSEFIUSx3QkFBd0I7eUdBQXhCLHdCQUF3QixpR0FIQyx1QkFBdUI7MkZBR2hELHdCQUF3QjtrQkFOcEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLHVCQUF1QixDQUFDO3FCQUN6RDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2FuZ2xlJywgJ2Fycm93U2V0dGluZ3MnLCAnY29sb3InLCAnZGFzaEFycmF5JywgJ2hpZ2hsaWdodFNldHRpbmdzJywgJ2xhdGl0dWRlJywgJ2xvbmdpdHVkZScsICdzZWxlY3Rpb25TZXR0aW5ncycsICd2aXNpYmxlJywgJ3dpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlyZWN0aXZlIHRvIGRlZmluZSB0aGUgbmF2aWdhdGlvbiBsaW5lcyBpbiB0aGUgbWFwcy5cbiAqIGBgYGh0bWxcbiAqIDxlLWxheWVycz5cbiAqIDxlLWxheWVyPlxuICogPGUtbmF2aWdhdGlvbkxpbmVTZXR0aW5ncz5cbiAqIDxlLW5hdmlnYXRpb25MaW5lU2V0dGluZz5cbiAqIDwvZS1uYXZpZ2F0aW9uTGluZVNldHRpbmc+XG4gKiA8L2UtbmF2aWdhdGlvbkxpbmVTZXR0aW5ncz5cbiAqIDwvZS1sYXllcj5cbiAqIDwvZS1sYXllcnM+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWxheWVyPmUtbmF2aWdhdGlvbkxpbmVTZXR0aW5ncz5lLW5hdmlnYXRpb25MaW5lU2V0dGluZycsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25MaW5lRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8TmF2aWdhdGlvbkxpbmVEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGFuZ2xlIG9mIHRoZSBjdXJ2ZSBjb25uZWN0aW5nIGRpZmZlcmVudCBsb2NhdGlvbnMgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIGFuZ2xlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgb3B0aW9ucyB0byBjdXN0b21pemUgdGhlIGFycm93IGZvciB0aGUgbmF2aWdhdGlvbiBsaW5lIGluIG1hcHMuXG4gICAgICovXG4gICAgcHVibGljIGFycm93U2V0dGluZ3M6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjb2xvciBmb3IgdGhlIG5hdmlnYXRpb24gbGluZXMgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAnYmxhY2snXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZGFzaC1hcnJheSBmb3IgdGhlIG5hdmlnYXRpb24gbGluZXMgZHJhd24gaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBkYXNoQXJyYXk6IGFueTtcbiAgICAvKiogXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBoaWdobGlnaHQgc2V0dGluZ3Mgb2YgdGhlIG5hdmlnYXRpb24gbGluZSBpbiBtYXBzLlxuICAgICAqL1xuICAgIHB1YmxpYyBoaWdobGlnaHRTZXR0aW5nczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGxhdGl0dWRlIHZhbHVlIGZvciB0aGUgbmF2aWdhdGlvbiBsaW5lcyB0byBiZSBkcmF3biBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IFtdXG4gICAgICovXG4gICAgcHVibGljIGxhdGl0dWRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbG9uZ2l0dWRlIGZvciB0aGUgbmF2aWdhdGlvbiBsaW5lcyB0byBiZSBkcmF3biBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IFtdXG4gICAgICovXG4gICAgcHVibGljIGxvbmdpdHVkZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHNlbGVjdGlvbiBzZXR0aW5ncyBvZiB0aGUgbmF2aWdhdGlvbiBsaW5lIGluIG1hcHMuXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdGlvblNldHRpbmdzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlIG5hdmlnYXRpb24gbGluZXMgdG8gYmUgZHJhd24gaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgd2lkdGggb2YgdGhlIG5hdmlnYXRpb24gbGluZXMgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgcHVibGljIHdpZHRoOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRvb2x0aXBTZXR0aW5nc190ZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogTmF2aWdhdGlvbkxpbmUgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtbGF5ZXI+ZS1uYXZpZ2F0aW9uTGluZVNldHRpbmdzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKE5hdmlnYXRpb25MaW5lRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25MaW5lc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxOYXZpZ2F0aW9uTGluZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ25hdmlnYXRpb25saW5lc2V0dGluZ3MnKTtcbiAgICB9XG59Il19