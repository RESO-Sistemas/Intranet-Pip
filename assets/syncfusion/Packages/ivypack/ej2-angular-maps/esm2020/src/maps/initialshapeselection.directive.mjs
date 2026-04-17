import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['shapePath', 'shapeValue'];
let outputs = [];
/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-initialShapeSelections>
 * <e-initialShapeSelection>
 * </e-initialShapeSelection>
 * </e-initialShapeSelections>
 * </e-layer>
 * </e-layers>
 * ```
 */
export class InitialShapeSelectionDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
InitialShapeSelectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InitialShapeSelectionDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
InitialShapeSelectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: InitialShapeSelectionDirective, selector: "e-layer>e-initialShapeSelections>e-initialShapeSelection", inputs: { shapePath: "shapePath", shapeValue: "shapeValue" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InitialShapeSelectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-layer>e-initialShapeSelections>e-initialShapeSelection',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * InitialShapeSelection Array Directive
 * @private
 */
export class InitialShapeSelectionsDirective extends ArrayBase {
    constructor() {
        super('initialshapeselection');
    }
}
InitialShapeSelectionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InitialShapeSelectionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
InitialShapeSelectionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: InitialShapeSelectionsDirective, selector: "e-layer>e-initialShapeSelections", queries: [{ propertyName: "children", predicate: InitialShapeSelectionDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InitialShapeSelectionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-layer>e-initialShapeSelections',
                    queries: {
                        children: new ContentChildren(InitialShapeSelectionDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbHNoYXBlc2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYXBzL2luaXRpYWxzaGFwZXNlbGVjdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNsRCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7OztHQVlHO0FBU0gsTUFBTSxPQUFPLDhCQUErQixTQUFRLFdBQTJDO0lBZ0IzRixZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OzJIQXJCUSw4QkFBOEI7K0dBQTlCLDhCQUE4QjsyRkFBOUIsOEJBQThCO2tCQVIxQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwwREFBMEQ7b0JBQ3BFLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUF5QkQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLFNBQTBDO0lBQzNGO1FBQ0ksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbkMsQ0FBQzs7NEhBSFEsK0JBQStCO2dIQUEvQiwrQkFBK0IsaUdBSE4sOEJBQThCOzJGQUd2RCwrQkFBK0I7a0JBTjNDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyw4QkFBOEIsQ0FBQztxQkFDaEU7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ3NoYXBlUGF0aCcsICdzaGFwZVZhbHVlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlyZWN0aXZlIHRvIGNvbmZpZ3VyZSB0aGUgc2VsZWN0aW9uIG9mIHRoZSBzaGFwZXMgd2hlbiB0aGUgbWFwcyBpcyBpbml0aWFsbHkgcmVuZGVyZWQuXG4gKiBgYGBodG1sXG4gKiA8ZS1sYXllcnM+XG4gKiA8ZS1sYXllcj5cbiAqIDxlLWluaXRpYWxTaGFwZVNlbGVjdGlvbnM+XG4gKiA8ZS1pbml0aWFsU2hhcGVTZWxlY3Rpb24+XG4gKiA8L2UtaW5pdGlhbFNoYXBlU2VsZWN0aW9uPlxuICogPC9lLWluaXRpYWxTaGFwZVNlbGVjdGlvbnM+XG4gKiA8L2UtbGF5ZXI+XG4gKiA8L2UtbGF5ZXJzPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1sYXllcj5lLWluaXRpYWxTaGFwZVNlbGVjdGlvbnM+ZS1pbml0aWFsU2hhcGVTZWxlY3Rpb24nLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbml0aWFsU2hhcGVTZWxlY3Rpb25EaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxJbml0aWFsU2hhcGVTZWxlY3Rpb25EaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHByb3BlcnR5IG5hbWUgZnJvbSB0aGUgZGF0YSBzb3VyY2UgaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIHNoYXBlUGF0aDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHZhbHVlIGZyb20gdGhlIGRhdGEgc291cmNlIHdoaWNoIGlzIGJvdW5kIHRvIHRoZSBzaGFwZSBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hhcGVWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogSW5pdGlhbFNoYXBlU2VsZWN0aW9uIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWxheWVyPmUtaW5pdGlhbFNoYXBlU2VsZWN0aW9ucycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihJbml0aWFsU2hhcGVTZWxlY3Rpb25EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgSW5pdGlhbFNoYXBlU2VsZWN0aW9uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxJbml0aWFsU2hhcGVTZWxlY3Rpb25zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdpbml0aWFsc2hhcGVzZWxlY3Rpb24nKTtcbiAgICB9XG59Il19