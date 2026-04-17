import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['border', 'width'];
let outputs = [];
/**
 * Column Directive
 * ```html
 * <e-columns><e-column></e-column><e-columns>
 * ```
 */
export class ColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnDirective, selector: "e-columns>e-column", inputs: { border: "border", width: "width" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-columns>e-column',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Column Array Directive
 * @private
 */
export class ColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
ColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnsDirective, selector: "ejs-chart>e-columns", queries: [{ propertyName: "children", predicate: ColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chart>e-columns',
                    queries: {
                        children: new ContentChildren(ColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2hhcnQvY29sdW1ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxQyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7O0dBS0c7QUFTSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUE0QjtJQWdCN0QsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs0R0FyQlEsZUFBZTtnR0FBZixlQUFlOzJGQUFmLGVBQWU7a0JBUjNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQXlCRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBMkI7SUFDN0Q7UUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7NkdBSFEsZ0JBQWdCO2lHQUFoQixnQkFBZ0Isb0ZBSFMsZUFBZTsyRkFHeEMsZ0JBQWdCO2tCQU41QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDO3FCQUNqRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnYm9yZGVyJywgJ3dpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogQ29sdW1uIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtY29sdW1ucz48ZS1jb2x1bW4+PC9lLWNvbHVtbj48ZS1jb2x1bW5zPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1jb2x1bW5zPmUtY29sdW1uJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8Q29sdW1uRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogT3B0aW9ucyB0byBjdXN0b21pemUgdGhlIGJvcmRlciBvZiB0aGUgY29sdW1ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYm9yZGVyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSB3aWR0aCBvZiB0aGUgY29sdW1uIGFzIGEgc3RyaW5nIGFjY2VwdHMgaW5wdXQgYm90aCBhcyAnMTAwcHgnIGFuZCAnMTAwJScuIFxuICAgICAqIElmIHNwZWNpZmllZCBhcyAnMTAwJScsIHRoZSBjb2x1bW4gcmVuZGVycyB0byB0aGUgZnVsbCB3aWR0aCBvZiBpdHMgY2hhcnQuXG4gICAgICogQGRlZmF1bHQgJzEwMCUnXG4gICAgICovXG4gICAgcHVibGljIHdpZHRoOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDb2x1bW4gQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1jaGFydD5lLWNvbHVtbnMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbnNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8Q29sdW1uc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignY29sdW1ucycpO1xuICAgIH1cbn0iXX0=