import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['columnName', 'customAggregate', 'field', 'footerTemplate', 'format', 'type'];
let outputs = [];
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the Angular TreeGrid.
 * ```html
 * <ejs-treegrid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'></e-column>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-treegrid>
 * ```
 */
export class AggregateColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
AggregateColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AggregateColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnDirective, selector: "ejs-treegrid>e-aggregates>e-aggregate>e-columns>e-column", inputs: { columnName: "columnName", customAggregate: "customAggregate", field: "field", footerTemplate: "footerTemplate", format: "format", type: "type" }, queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AggregateColumnDirective.prototype, "footerTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-treegrid>e-aggregates>e-aggregate>e-columns>e-column',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }] } });
/**
 * AggregateColumn Array Directive
 * @private
 */
export class AggregateColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
AggregateColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AggregateColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnsDirective, selector: "ejs-treegrid>e-aggregates>e-aggregate>e-columns", queries: [{ propertyName: "children", predicate: AggregateColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-treegrid>e-aggregates>e-aggregate>e-columns',
                    queries: {
                        children: new ContentChildren(AggregateColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlLWNvbHVtbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RyZWVncmlkL2FnZ3JlZ2F0ZS1jb2x1bW5zLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELElBQUksS0FBSyxHQUFhLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckcsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQVNILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxXQUFxQztJQThEL0UsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztxSEFuRVEsd0JBQXdCO3lHQUF4Qix3QkFBd0I7QUE0RGpDO0lBREMsUUFBUSxFQUFFO2dFQUNnQjsyRkE1RGxCLHdCQUF3QjtrQkFScEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMERBQTBEO29CQUNwRSxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7dUdBNkRVLGNBQWM7c0JBRnBCLFlBQVk7dUJBQUMsZ0JBQWdCOztBQVlsQzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsU0FBb0M7SUFDL0U7UUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7c0hBSFEseUJBQXlCOzBHQUF6Qix5QkFBeUIsZ0hBSEEsd0JBQXdCOzJGQUdqRCx5QkFBeUI7a0JBTnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlEQUFpRDtvQkFDM0QsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDMUQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb2x1bW5OYW1lJywgJ2N1c3RvbUFnZ3JlZ2F0ZScsICdmaWVsZCcsICdmb290ZXJUZW1wbGF0ZScsICdmb3JtYXQnLCAndHlwZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIGBlLWFnZ3JlZ2F0ZS0+ZS1jb2x1bW5gIGRpcmVjdGl2ZSByZXByZXNlbnQgYSBhZ2dyZWdhdGUgY29sdW1uIG9mIHRoZSBBbmd1bGFyIFRyZWVHcmlkLiBcbiAqIGBgYGh0bWxcbiAqIDxlanMtdHJlZWdyaWQgW2RhdGFTb3VyY2VdPSdkYXRhJyBhbGxvd1BhZ2luZz0ndHJ1ZScgYWxsb3dTb3J0aW5nPSd0cnVlJz4gXG4gKiAgIDxlLWNvbHVtbnM+XG4gKiAgICAgPGUtY29sdW1uIGZpZWxkPSdJRCcgd2lkdGg9JzEwMCc+PC9lLWNvbHVtbj5cbiAqICAgICA8ZS1jb2x1bW4gZmllbGQ9J25hbWUnIGhlYWRlclRleHQ9J05hbWUnIHdpZHRoPScxMDAnPjwvZS1jb2x1bW4+XG4gKiAgIDwvZS1jb2x1bW5zPlxuICogICA8ZS1hZ2dyZWdhdGVzPlxuICogICAgIDxlLWFnZ3JlZ2F0ZT5cbiAqICAgICAgIDxlLWNvbHVtbnM+XG4gKiAgICAgICAgIDxlLWNvbHVtbiBmaWVsZD0nSUQnIHR5cGU9J01pbic+PC9lLWNvbHVtbj5cbiAqICAgICAgIDwvZS1jb2x1bW5zPlxuICogICAgICA8L2UtYWdncmVnYXRlPlxuICogICAgPC9lLWFnZ3JlZ2F0ZXM+XG4gKiA8L2Vqcy10cmVlZ3JpZD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy10cmVlZ3JpZD5lLWFnZ3JlZ2F0ZXM+ZS1hZ2dyZWdhdGU+ZS1jb2x1bW5zPmUtY29sdW1uJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWdncmVnYXRlQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8QWdncmVnYXRlQ29sdW1uRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgYWdncmVnYXRlIHR5cGUocykgZm9yIGEgcGFydGljdWxhciBjb2x1bW4uIFxuICAgICAqIFRvIGFwcGx5IG11bHRpcGxlIGFnZ3JlZ2F0ZXMgdG8gYSBzaW5nbGUgY29sdW1uLCBzcGVjaWZ5IHRoZSBgdHlwZWAgYXMgYW4gYXJyYXkuIFxuICAgICAqIEF2YWlsYWJsZSBhZ2dyZWdhdGUgdHlwZXMgaW5jbHVkZTogXG4gICAgICogKiBgc3VtYDogQ2FsY3VsYXRlcyB0aGUgc3VtIG9mIGFsbCB2YWx1ZXMgaW4gYSBjb2x1bW4uIFxuICAgICAqICogYGF2ZXJhZ2VgOiBDb21wdXRlcyB0aGUgYXZlcmFnZSBvZiB0aGUgY29sdW1uIHZhbHVlcy4gXG4gICAgICogKiBgbWF4YDogRmluZHMgdGhlIG1heGltdW0gdmFsdWUgaW4gYSBjb2x1bW4uIFxuICAgICAqICogYG1pbmA6IEZpbmRzIHRoZSBtaW5pbXVtIHZhbHVlIGluIGEgY29sdW1uLiBcbiAgICAgKiAqIGBjb3VudGA6IENvdW50cyB0aGUgbnVtYmVyIG9mIHJlY29yZHMuIFxuICAgICAqICogYGZhbHNlY291bnRgOiBDb3VudHMgdGhlIG51bWJlciBvZiBmYWxzZSB2YWx1ZXMuIFxuICAgICAqICogYHRydWVjb3VudGA6IENvdW50cyB0aGUgbnVtYmVyIG9mIHRydWUgdmFsdWVzLiBcbiAgICAgKiAqIGBjdXN0b21gOiBBbGxvd3MgZm9yIGEgY3VzdG9tIGFnZ3JlZ2F0ZSBmdW5jdGlvbi5cbiAgICAgKiBcbiAgICAgKiBVc2UgYGN1c3RvbWAgdG8gc3BlY2lmeSBhIGN1c3RvbSBhZ2dyZWdhdGlvbi5cbiAgICAgKiAgICAgXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgY29sdW1uIG5hbWUgdG8gZGlzcGxheSB0aGUgYWdncmVnYXRlIHZhbHVlLiBJZiBub3QgZGVmaW5lZCwgdGhlIGBmaWVsZGAgbmFtZSBpcyB1c2VkIGJ5IGRlZmF1bHQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBjb2x1bW5OYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgYSBjdXN0b20gZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBhZ2dyZWdhdGUgdmFsdWUuIFRoZSBgdHlwZWAgbXVzdCBiZSBzZXQgdG8gYGN1c3RvbWAuIFxuICAgICAqIFVzZSB0aGUgY3VzdG9tIHZhbHVlIGFzIGAke2N1c3RvbX1gIGluIHRlbXBsYXRlcy4gXG4gICAgICogKiBgVG90YWwgYWdncmVnYXRpb25gOiBUaGUgY3VzdG9tIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSBlbnRpcmUgZGF0YXNldCBhbmQgdGhlIGN1cnJlbnQgYEFnZ3JlZ2F0ZUNvbHVtbmAgb2JqZWN0LiBcbiAgICAgKiAqIGBHcm91cCBhZ2dyZWdhdGlvbmA6IEl0IGlzIGNhbGxlZCB3aXRoIHRoZSBjdXJyZW50IGdyb3VwIGRldGFpbHMgYW5kIHRoZSBgQWdncmVnYXRlQ29sdW1uYCBvYmplY3QuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBjdXN0b21BZ2dyZWdhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBjb2x1bW4gbmFtZSBvbiB3aGljaCB0byBwZXJmb3JtIHRoZSBhZ2dyZWdhdGlvbi5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGZpZWxkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgZm9ybWF0IHRvIGJlIGFwcGxpZWQgdG8gdGhlIGNhbGN1bGF0ZWQgYWdncmVnYXRlIHZhbHVlIGJlZm9yZSBkaXNwbGF5LiBcbiAgICAgKiBTdXBwb3J0cyBib3RoIHN0YW5kYXJkIGFuZCBjdXN0b20gZm9ybWF0cyBmb3IgbnVtYmVycyBhbmQgZGF0ZXMuIFxuICAgICAqIFJlZmVyIHRvIHRoZSBTeW5jZnVzaW9uIGRvY3VtZW50YXRpb24gZm9yIFtudW1iZXJdKGh0dHBzOi8vZWoyLnN5bmNmdXNpb24uY29tL2RvY3VtZW50YXRpb24vY29tbW9uL2ludGVybmF0aW9uYWxpemF0aW9uLyNzdXBwb3J0ZWQtZm9ybWF0LXN0cmluZykgXG4gICAgICogYW5kIFtkYXRlXShodHRwczovL2VqMi5zeW5jZnVzaW9uLmNvbS9kb2N1bWVudGF0aW9uL2NvbW1vbi9pbnRlcm5hdGlvbmFsaXphdGlvbiNkYXRlLWZvcm1hdHRpbmcpIGZvcm1hdHMuXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmb3JtYXQ6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIHRlbXBsYXRlIGZvciB0aGUgZm9vdGVyIGNlbGwgb2YgdGhlIGFnZ3JlZ2F0ZSBjb2x1bW4uIFxuICAgICAqIFVzZSB0aGUgYWdncmVnYXRlIGB0eXBlYCBuYW1lcyB3aXRoaW4gdGhlIHRlbXBsYXRlIHRvIGFjY2VzcyBhZ2dyZWdhdGUgdmFsdWVzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcblxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2Zvb3RlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBmb290ZXJUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQWdncmVnYXRlQ29sdW1uIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtdHJlZWdyaWQ+ZS1hZ2dyZWdhdGVzPmUtYWdncmVnYXRlPmUtY29sdW1ucycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihBZ2dyZWdhdGVDb2x1bW5EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQWdncmVnYXRlQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxBZ2dyZWdhdGVDb2x1bW5zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjb2x1bW5zJyk7XG4gICAgfVxufSJdfQ==