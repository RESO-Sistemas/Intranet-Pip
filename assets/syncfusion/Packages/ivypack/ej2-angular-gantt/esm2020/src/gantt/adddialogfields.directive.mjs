import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['additionalParams', 'fields', 'headerText', 'type'];
let outputs = [];
/**
 * `e-add-dialog-field` directive represent a add dialog fields collection in Gantt task add dialog.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-add-dialog-fields>
 *     <e-add-dialog-field type='General' headerText='General'></e-add-dialog-field>
 *     <e-add-dialog-field type='Dependency' headerText='Dependency'></e-add-dialog-field>
 *   </e-add-dialog-fields>
 * </ejs-gantt>
 * ```
 */
export class AddDialogFieldDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
AddDialogFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AddDialogFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AddDialogFieldDirective, selector: "ejs-gantt>e-add-dialog-fields>e-add-dialog-field", inputs: { additionalParams: "additionalParams", fields: "fields", headerText: "headerText", type: "type" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-add-dialog-fields>e-add-dialog-field',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * AddDialogField Array Directive
 * @private
 */
export class AddDialogFieldsDirective extends ArrayBase {
    constructor() {
        super('adddialogfields');
    }
}
AddDialogFieldsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AddDialogFieldsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AddDialogFieldsDirective, selector: "ejs-gantt>e-add-dialog-fields", queries: [{ propertyName: "children", predicate: AddDialogFieldDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-add-dialog-fields',
                    queries: {
                        children: new ContentChildren(AddDialogFieldDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkZGlhbG9nZmllbGRzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW50dC9hZGRkaWFsb2dmaWVsZHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNFLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxXQUFvQztJQWlDN0UsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztvSEF0Q1EsdUJBQXVCO3dHQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFSbkMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsa0RBQWtEO29CQUM1RCxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBMENEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxTQUFtQztJQUM3RTtRQUNJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdCLENBQUM7O3FIQUhRLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLDhGQUhDLHVCQUF1QjsyRkFHaEQsd0JBQXdCO2tCQU5wQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsdUJBQXVCLENBQUM7cUJBQ3pEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydhZGRpdGlvbmFsUGFyYW1zJywgJ2ZpZWxkcycsICdoZWFkZXJUZXh0JywgJ3R5cGUnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBgZS1hZGQtZGlhbG9nLWZpZWxkYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgYWRkIGRpYWxvZyBmaWVsZHMgY29sbGVjdGlvbiBpbiBHYW50dCB0YXNrIGFkZCBkaWFsb2cuIFxuICogSXQgbXVzdCBiZSBjb250YWluZWQgaW4gYSBHYW50dCBjb21wb25lbnQoYGVqcy1nYW50dGApLiBcbiAqIGBgYGh0bWxcbiAqIDxlanMtZ2FudHQgW2RhdGFTb3VyY2VdPSdkYXRhJyBhbGxvd1NlbGVjdGlvbj0ndHJ1ZScgYWxsb3dTb3J0aW5nPSd0cnVlJz4gXG4gKiAgIDxlLWFkZC1kaWFsb2ctZmllbGRzPlxuICogICAgIDxlLWFkZC1kaWFsb2ctZmllbGQgdHlwZT0nR2VuZXJhbCcgaGVhZGVyVGV4dD0nR2VuZXJhbCc+PC9lLWFkZC1kaWFsb2ctZmllbGQ+XG4gKiAgICAgPGUtYWRkLWRpYWxvZy1maWVsZCB0eXBlPSdEZXBlbmRlbmN5JyBoZWFkZXJUZXh0PSdEZXBlbmRlbmN5Jz48L2UtYWRkLWRpYWxvZy1maWVsZD5cbiAqICAgPC9lLWFkZC1kaWFsb2ctZmllbGRzPlxuICogPC9lanMtZ2FudHQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS1hZGQtZGlhbG9nLWZpZWxkcz5lLWFkZC1kaWFsb2ctZmllbGQnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBZGREaWFsb2dGaWVsZERpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPEFkZERpYWxvZ0ZpZWxkRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0eXBlcyBvZiB0YWJzIHRoYXQgY29udGFpbiBlZGl0b3JzIGZvciBjb2x1bW5zLiBcbiAgICAgKiBBdmFpbGFibGUgdGFiIHR5cGVzOiBcbiAgICAgKiAqIGBHZW5lcmFsYCAtIFJlcHJlc2VudHMgdGhlIGdlbmVyYWwgaW5mb3JtYXRpb24gZWRpdG9yIHRhYi4gXG4gICAgICogKiBgRGVwZW5kZW5jeWAgLSBSZXByZXNlbnRzIHRoZSBkZXBlbmRlbmN5IGVkaXRvciB0YWIuIFxuICAgICAqICogYFJlc291cmNlc2AgLSBSZXByZXNlbnRzIHRoZSByZXNvdXJjZSBlZGl0b3IgdGFiLiBcbiAgICAgKiAqIGBOb3Rlc2AgLSBSZXByZXNlbnRzIHRoZSBub3RlcyBlZGl0b3IgdGFiLiBcbiAgICAgKiAqIGBTZWdtZW50c2AgLSBSZXByZXNlbnRzIHRoZSBzZWdtZW50cyBlZGl0b3IgdGFiLiBcbiAgICAgKiAqIGBDdXN0b21gIC0gUmVwcmVzZW50cyB0aGUgY3VzdG9tIGNvbHVtbiBlZGl0b3IgdGFiLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdHlwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBmb3IgR3JpZCwgUmljaCBUZXh0IEVkaXRvciAoUlRFKSwgb3IgVHJlZUdyaWQgY29udHJvbHMgd2l0aGluIHRoZSBHYW50dCBlZGl0IGRpYWxvZy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGFkZGl0aW9uYWxQYXJhbXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBlZGl0ZWQgY29sdW1uIGZpZWxkcyB0byBiZSBwbGFjZWQgaW5zaWRlIHRoZSB0YWIuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmaWVsZHM6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBoZWFkZXIgdGV4dCBvZiB0YWIgaXRlbS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGhlYWRlclRleHQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEFkZERpYWxvZ0ZpZWxkIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS1hZGQtZGlhbG9nLWZpZWxkcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihBZGREaWFsb2dGaWVsZERpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBZGREaWFsb2dGaWVsZHNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8QWRkRGlhbG9nRmllbGRzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdhZGRkaWFsb2dmaWVsZHMnKTtcbiAgICB9XG59Il19