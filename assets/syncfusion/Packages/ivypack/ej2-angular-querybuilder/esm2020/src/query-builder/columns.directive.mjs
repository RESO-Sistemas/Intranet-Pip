import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['category', 'columns', 'field', 'format', 'label', 'operators', 'ruleTemplate', 'step', 'template', 'type', 'validation', 'value', 'values'];
let outputs = [];
/**
 * `e-column` directive represent a column of the Angular QueryBuilder.
 * It must be contained in a QueryBuilder component(`ejs-querybuilder`).
 * ```html
 * <ejs-querybuilder [dataSource]='data'>
 *   <e-columns>
 *    <e-column field='ID' label='ID' type='number'></e-column>
 *    <e-column field='Date' label='Date' type='date' format='dd/MM/yyyy'></e-column>
 *   </e-columns>
 * </ejs-querybuilder>
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
ColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnDirective, selector: "ejs-querybuilder>e-columns>e-column", inputs: { category: "category", columns: "columns", field: "field", format: "format", label: "label", operators: "operators", ruleTemplate: "ruleTemplate", step: "step", template: "template", type: "type", validation: "validation", value: "value", values: "values" }, queries: [{ propertyName: "ruleTemplate", first: true, predicate: ["ruleTemplate"], descendants: true }, { propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ColumnDirective.prototype, "ruleTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-querybuilder>e-columns>e-column',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { ruleTemplate: [{
                type: ContentChild,
                args: ['ruleTemplate']
            }], template: [{
                type: ContentChild,
                args: ['template']
            }] } });
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
ColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnsDirective, selector: "ejs-querybuilder>e-columns", queries: [{ propertyName: "children", predicate: ColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-querybuilder>e-columns',
                    queries: {
                        children: new ContentChildren(ColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcnktYnVpbGRlci9jb2x1bW5zLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELElBQUksS0FBSyxHQUFhLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEssSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBNEI7SUE4RTdELFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7NEdBbkZRLGVBQWU7Z0dBQWYsZUFBZTtBQXFFeEI7SUFEQyxRQUFRLEVBQUU7cURBQ2M7QUFPekI7SUFEQyxRQUFRLEVBQUU7aURBQ1U7MkZBNUVaLGVBQWU7a0JBUjNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQXNFVSxZQUFZO3NCQUZsQixZQUFZO3VCQUFDLGNBQWM7Z0JBU3JCLFFBQVE7c0JBRmQsWUFBWTt1QkFBQyxVQUFVOztBQVk1Qjs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBMkI7SUFDN0Q7UUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7NkdBSFEsZ0JBQWdCO2lHQUFoQixnQkFBZ0IsMkZBSFMsZUFBZTsyRkFHeEMsZ0JBQWdCO2tCQU41QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDO3FCQUNqRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2NhdGVnb3J5JywgJ2NvbHVtbnMnLCAnZmllbGQnLCAnZm9ybWF0JywgJ2xhYmVsJywgJ29wZXJhdG9ycycsICdydWxlVGVtcGxhdGUnLCAnc3RlcCcsICd0ZW1wbGF0ZScsICd0eXBlJywgJ3ZhbGlkYXRpb24nLCAndmFsdWUnLCAndmFsdWVzJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtY29sdW1uYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgY29sdW1uIG9mIHRoZSBBbmd1bGFyIFF1ZXJ5QnVpbGRlci4gXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIFF1ZXJ5QnVpbGRlciBjb21wb25lbnQoYGVqcy1xdWVyeWJ1aWxkZXJgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXF1ZXJ5YnVpbGRlciBbZGF0YVNvdXJjZV09J2RhdGEnPiBcbiAqICAgPGUtY29sdW1ucz5cbiAqICAgIDxlLWNvbHVtbiBmaWVsZD0nSUQnIGxhYmVsPSdJRCcgdHlwZT0nbnVtYmVyJz48L2UtY29sdW1uPlxuICogICAgPGUtY29sdW1uIGZpZWxkPSdEYXRlJyBsYWJlbD0nRGF0ZScgdHlwZT0nZGF0ZScgZm9ybWF0PSdkZC9NTS95eXl5Jz48L2UtY29sdW1uPlxuICogICA8L2UtY29sdW1ucz5cbiAqIDwvZWpzLXF1ZXJ5YnVpbGRlcj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1xdWVyeWJ1aWxkZXI+ZS1jb2x1bW5zPmUtY29sdW1uJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8Q29sdW1uRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0eXBlcyBpbiBjb2x1bW5zIGZpZWxkLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdHlwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGNhdGVnb3J5IGZvciBjb2x1bW5zLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY2F0ZWdvcnk6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdWIgZmllbGRzIGluIGNvbHVtbnMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBjb2x1bW5zOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgZmllbGRzIGluIGNvbHVtbnMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmaWVsZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGRhdGUgZm9ybWF0IGZvciBjb2x1bW5zLlxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqIEBibGF6b3J0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9ybWF0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbGFiZWxzIG5hbWUgaW4gY29sdW1ucy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGxhYmVsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgb3BlcmF0b3JzIGluIGNvbHVtbnMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVyYXRvcnM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdGVwIHZhbHVlKG51bWVyaWMgdGV4dGJveCkgZm9yIGNvbHVtbnMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGVwOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdmFsaWRhdGlvbiBmb3IgY29sdW1ucyAodGV4dCwgbnVtYmVyIGFuZCBkYXRlKS5cbiAgICAgKiBAZGVmYXVsdCB7IGlzUmVxdWlyZWQ6IHRydWUgLCBtaW46IDAsIG1heDogTnVtYmVyLk1BWF9WQUxVRSB9XG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBkZWZhdWx0IHZhbHVlIGZvciBjb2x1bW5zLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB2YWx1ZXMgaW4gY29sdW1ucyBvciBiaW5kIHRoZSB2YWx1ZXMgZnJvbSBzdWIgY29udHJvbHMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB2YWx1ZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBydWxlIHRlbXBsYXRlIGZvciB0aGUgZmllbGQgd2l0aCBhbnkgb3RoZXIgd2lkZ2V0cy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncnVsZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBydWxlVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3IgdmFsdWUgZmllbGQgc3VjaCBhcyBzbGlkZXIgb3IgYW55IG90aGVyIHdpZGdldHMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQ29sdW1uIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtcXVlcnlidWlsZGVyPmUtY29sdW1ucycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxDb2x1bW5zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjb2x1bW5zJyk7XG4gICAgfVxufSJdfQ==