import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['point', 'series'];
let outputs = [];
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export class Chart3DSelectedDataIndexDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
Chart3DSelectedDataIndexDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: Chart3DSelectedDataIndexDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
Chart3DSelectedDataIndexDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: Chart3DSelectedDataIndexDirective, selector: "e-chart3d-selecteddataindexes>e-chart3d-selecteddataindex", inputs: { point: "point", series: "series" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: Chart3DSelectedDataIndexDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-chart3d-selecteddataindexes>e-chart3d-selecteddataindex',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Chart3DSelectedDataIndex Array Directive
 * @private
 */
export class Chart3DSelectedDataIndexesDirective extends ArrayBase {
    constructor() {
        super('selecteddataindexes');
    }
}
Chart3DSelectedDataIndexesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: Chart3DSelectedDataIndexesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
Chart3DSelectedDataIndexesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: Chart3DSelectedDataIndexesDirective, selector: "ejs-chart3d>e-chart3d-selecteddataindexes", queries: [{ propertyName: "children", predicate: Chart3DSelectedDataIndexDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: Chart3DSelectedDataIndexesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chart3d>e-chart3d-selecteddataindexes',
                    queries: {
                        children: new ContentChildren(Chart3DSelectedDataIndexDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWRkYXRhaW5kZXhlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2hhcnQzZC9zZWxlY3RlZGRhdGFpbmRleGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzFDLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7R0FLRztBQVNILE1BQU0sT0FBTyxpQ0FBa0MsU0FBUSxXQUE4QztJQWtCakcsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs4SEF2QlEsaUNBQWlDO2tIQUFqQyxpQ0FBaUM7MkZBQWpDLGlDQUFpQztrQkFSN0MsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMkRBQTJEO29CQUNyRSxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBMkJEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxtQ0FBb0MsU0FBUSxTQUE4QztJQUNuRztRQUNJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O2dJQUhRLG1DQUFtQztvSEFBbkMsbUNBQW1DLDBHQUhWLGlDQUFpQzsyRkFHMUQsbUNBQW1DO2tCQU4vQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwyQ0FBMkM7b0JBQ3JELE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsaUNBQWlDLENBQUM7cUJBQ25FO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydwb2ludCcsICdzZXJpZXMnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBTZWxlY3RlZCBEYXRhIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtc2VsZWN0ZWRkYXRhaW5kZXhlcz48ZS1zZWxlY3RlZGRhdGFpbmRleD48L2Utc2VsZWN0ZWRkYXRhaW5kZXg+PGUtc2VsZWN0ZWRkYXRhaW5kZXhlcz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtY2hhcnQzZC1zZWxlY3RlZGRhdGFpbmRleGVzPmUtY2hhcnQzZC1zZWxlY3RlZGRhdGFpbmRleCcsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0M0RTZWxlY3RlZERhdGFJbmRleERpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPENoYXJ0M0RTZWxlY3RlZERhdGFJbmRleERpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgaW5kZXggb2YgdGhlIGRhdGEgcG9pbnQgd2l0aGluIHRoZSBzZXJpZXMuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqIEBhc3B0eXBlIGludFxuICAgICAqL1xuICAgIHB1YmxpYyBwb2ludDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGluZGV4IG9mIHRoZSBzZXJpZXMuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqIEBhc3B0eXBlIGludFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXJpZXM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIENoYXJ0M0RTZWxlY3RlZERhdGFJbmRleCBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWNoYXJ0M2Q+ZS1jaGFydDNkLXNlbGVjdGVkZGF0YWluZGV4ZXMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQ2hhcnQzRFNlbGVjdGVkRGF0YUluZGV4RGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0M0RTZWxlY3RlZERhdGFJbmRleGVzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPENoYXJ0M0RTZWxlY3RlZERhdGFJbmRleGVzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdzZWxlY3RlZGRhdGFpbmRleGVzJyk7XG4gICAgfVxufSJdfQ==