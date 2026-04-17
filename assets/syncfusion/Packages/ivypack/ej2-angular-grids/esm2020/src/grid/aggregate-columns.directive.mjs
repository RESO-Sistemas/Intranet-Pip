import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['columnName', 'customAggregate', 'field', 'footerTemplate', 'format', 'groupCaptionTemplate', 'groupFooterTemplate', 'type'];
let outputs = [];
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the Angular Grid.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
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
 * </ejs-grid>
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
AggregateColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnDirective, selector: "ejs-grid>e-aggregates>e-aggregate>e-columns>e-column", inputs: { columnName: "columnName", customAggregate: "customAggregate", field: "field", footerTemplate: "footerTemplate", format: "format", groupCaptionTemplate: "groupCaptionTemplate", groupFooterTemplate: "groupFooterTemplate", type: "type" }, queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "groupFooterTemplate", first: true, predicate: ["groupFooterTemplate"], descendants: true }, { propertyName: "groupCaptionTemplate", first: true, predicate: ["groupCaptionTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AggregateColumnDirective.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], AggregateColumnDirective.prototype, "groupFooterTemplate", void 0);
__decorate([
    Template()
], AggregateColumnDirective.prototype, "groupCaptionTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate>e-columns>e-column',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], groupFooterTemplate: [{
                type: ContentChild,
                args: ['groupFooterTemplate']
            }], groupCaptionTemplate: [{
                type: ContentChild,
                args: ['groupCaptionTemplate']
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
AggregateColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnsDirective, selector: "ejs-grid>e-aggregates>e-aggregate>e-columns", queries: [{ propertyName: "children", predicate: AggregateColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate>e-columns',
                    queries: {
                        children: new ContentChildren(AggregateColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlLWNvbHVtbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dyaWQvYWdncmVnYXRlLWNvbHVtbnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNwSixJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBU0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQXFDO0lBOEYvRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O3FIQW5HUSx3QkFBd0I7eUdBQXhCLHdCQUF3QjtBQThEakM7SUFEQyxRQUFRLEVBQUU7Z0VBQ2dCO0FBZTNCO0lBREMsUUFBUSxFQUFFO3FFQUNxQjtBQWVoQztJQURDLFFBQVEsRUFBRTtzRUFDc0I7MkZBNUZ4Qix3QkFBd0I7a0JBUnBDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNEQUFzRDtvQkFDaEUsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQStEVSxjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFpQnZCLG1CQUFtQjtzQkFGekIsWUFBWTt1QkFBQyxxQkFBcUI7Z0JBaUI1QixvQkFBb0I7c0JBRjFCLFlBQVk7dUJBQUMsc0JBQXNCOztBQVl4Qzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsU0FBb0M7SUFDL0U7UUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7c0hBSFEseUJBQXlCOzBHQUF6Qix5QkFBeUIsNEdBSEEsd0JBQXdCOzJGQUdqRCx5QkFBeUI7a0JBTnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDZDQUE2QztvQkFDdkQsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDMUQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb2x1bW5OYW1lJywgJ2N1c3RvbUFnZ3JlZ2F0ZScsICdmaWVsZCcsICdmb290ZXJUZW1wbGF0ZScsICdmb3JtYXQnLCAnZ3JvdXBDYXB0aW9uVGVtcGxhdGUnLCAnZ3JvdXBGb290ZXJUZW1wbGF0ZScsICd0eXBlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtYWdncmVnYXRlLT5lLWNvbHVtbmAgZGlyZWN0aXZlIHJlcHJlc2VudCBhIGFnZ3JlZ2F0ZSBjb2x1bW4gb2YgdGhlIEFuZ3VsYXIgR3JpZC4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdyaWQgW2RhdGFTb3VyY2VdPSdkYXRhJyBhbGxvd1BhZ2luZz0ndHJ1ZScgYWxsb3dTb3J0aW5nPSd0cnVlJz4gXG4gKiAgIDxlLWNvbHVtbnM+XG4gKiAgICAgPGUtY29sdW1uIGZpZWxkPSdJRCcgd2lkdGg9JzEwMCc+PC9lLWNvbHVtbj5cbiAqICAgICA8ZS1jb2x1bW4gZmllbGQ9J25hbWUnIGhlYWRlclRleHQ9J05hbWUnIHdpZHRoPScxMDAnPjwvZS1jb2x1bW4+XG4gKiAgIDwvZS1jb2x1bW5zPlxuICogICA8ZS1hZ2dyZWdhdGVzPlxuICogICAgIDxlLWFnZ3JlZ2F0ZT5cbiAqICAgICAgIDxlLWNvbHVtbnM+XG4gKiAgICAgICAgIDxlLWNvbHVtbiBmaWVsZD0nSUQnIHR5cGU9J01pbic+PC9lLWNvbHVtbj5cbiAqICAgICAgIDwvZS1jb2x1bW5zPlxuICogICAgICA8L2UtYWdncmVnYXRlPlxuICogICAgPC9lLWFnZ3JlZ2F0ZXM+XG4gKiA8L2Vqcy1ncmlkPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdyaWQ+ZS1hZ2dyZWdhdGVzPmUtYWdncmVnYXRlPmUtY29sdW1ucz5lLWNvbHVtbicsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEFnZ3JlZ2F0ZUNvbHVtbkRpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPEFnZ3JlZ2F0ZUNvbHVtbkRpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGFnZ3JlZ2F0ZSB0eXBlIG9mIGEgcGFydGljdWxhciBjb2x1bW4uIFxuICAgICAqIFRvIHVzZSBtdWx0aXBsZSBhZ2dyZWdhdGVzIGZvciBzaW5nbGUgY29sdW1uLCBzcGVjaWZ5IHRoZSBgdHlwZWAgYXMgYXJyYXkuIFxuICAgICAqIFR5cGVzIG9mIGFnZ3JlZ2F0ZSBhcmUsIFxuICAgICAqICogc3VtIFxuICAgICAqICogYXZlcmFnZSBcbiAgICAgKiAqIG1heCBcbiAgICAgKiAqIG1pbiBcbiAgICAgKiAqIGNvdW50IFxuICAgICAqICogdHJ1ZWNvdW50IFxuICAgICAqICogZmFsc2Vjb3VudCBcbiAgICAgKiAqIGN1c3RvbSBcbiAgICAgKiA+IFNwZWNpZnkgdGhlIGB0eXBlYCB2YWx1ZSBhcyBgY3VzdG9tYCB0byB1c2UgY3VzdG9tIGFnZ3JlZ2F0aW9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgdHlwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2x1bW4gbmFtZSB0byBkaXNwbGF5IHRoZSBhZ2dyZWdhdGUgdmFsdWUuIElmIGBjb2x1bW5OYW1lYCBpcyBub3QgZGVmaW5lZCwgXG4gICAgICogdGhlbiBgZmllbGRgIG5hbWUgdmFsdWUgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgYGNvbHVtbk5hbWVgIHByb3BlcnR5LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sdW1uTmFtZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIGEgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIGN1c3RvbSBhZ2dyZWdhdGUgdmFsdWUuIFRoZSBgdHlwZWAgdmFsdWUgc2hvdWxkIGJlIHNldCB0byBgY3VzdG9tYC4gXG4gICAgICogVG8gdXNlIGN1c3RvbSBhZ2dyZWdhdGUgdmFsdWUgaW4gdGhlIHRlbXBsYXRlLCB1c2UgdGhlIGtleSBhcyBgJHtjdXN0b219YC4gXG4gICAgICogKipUb3RhbCBhZ2dyZWdhdGlvbioqOiBUaGUgY3VzdG9tIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHdob2xlIGRhdGEgYW5kIHRoZSBjdXJyZW50IGBBZ2dyZWdhdGVDb2x1bW5gIG9iamVjdC4gXG4gICAgICogKipHcm91cCBhZ2dyZWdhdGlvbioqOiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgZ3JvdXAgZGV0YWlscyBhbmQgdGhlIGBBZ2dyZWdhdGVDb2x1bW5gIG9iamVjdC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGN1c3RvbUFnZ3JlZ2F0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2x1bW4gbmFtZSB0byBwZXJmb3JtIGFnZ3JlZ2F0aW9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZmllbGQ6IGFueTtcbiAgICAvKiogXG4gICAgICogRm9ybWF0IGlzIGFwcGxpZWQgdG8gYSBjYWxjdWxhdGVkIHZhbHVlIGJlZm9yZSBpdCBpcyBkaXNwbGF5ZWQuIFxuICAgICAqIEdldHMgdGhlIGZvcm1hdCBmcm9tIHRoZSB1c2VyLCB3aGljaCBjYW4gYmUgc3RhbmRhcmQgb3IgY3VzdG9tIFxuICAgICAqIFtgbnVtYmVyYF0oLi4vLi4vY29tbW9uL2ludGVybmF0aW9uYWxpemF0aW9uLyNtYW5pcHVsYXRpbmctbnVtYmVycykgXG4gICAgICogYW5kIFtgZGF0ZWBdKC4uLy4uL2NvbW1vbi9pbnRlcm5hdGlvbmFsaXphdGlvbi8jbWFuaXB1bGF0aW5nLW51bWJlcnMpIGZvcm1hdHMuXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICogQGJsYXpvcnR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmb3JtYXQ6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgZm9vdGVyIGNlbGwgdGVtcGxhdGUgYXMgYSBzdHJpbmcgZm9yIHRoZSBhZ2dyZWdhdGUgY29sdW1uLiBcbiAgICAgKiBUaGUgYHR5cGVgIG5hbWUgc2hvdWxkIGJlIHVzZWQgdG8gYWNjZXNzIGFnZ3JlZ2F0ZSB2YWx1ZXMgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPVwiZ3JpZC9mb290ZXItdGVtcGxhdGUtYXBpL2luZGV4LnRzXCIgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2Zvb3RlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBmb290ZXJUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBncm91cCBmb290ZXIgY2VsbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyBmb3IgdGhlIGFnZ3JlZ2F0ZSBjb2x1bW4uIFxuICAgICAqIFRoZSBgdHlwZWAgbmFtZSBzaG91bGQgYmUgdXNlZCB0byBhY2Nlc3MgYWdncmVnYXRlIHZhbHVlcyBpbnNpZGUgdGhlIHRlbXBsYXRlLiBcbiAgICAgKiBBZGRpdGlvbmFsbHksIHRoZSBmb2xsb3dpbmcgZmllbGRzIGNhbiBiZSBhY2Nlc3NlZCBpbiB0aGUgdGVtcGxhdGUuIFxuICAgICAqICogKipmaWVsZCoqOiBUaGUgY3VycmVudCBncm91cGVkIGZpZWxkLiBcbiAgICAgKiAqICoqa2V5Kio6IFRoZSBjdXJyZW50IGdyb3VwZWQgdmFsdWUuXG4gICAgICogXG4gICAgICogeyUgY29kZUJsb2NrIHNyYz1cImdyaWQvZ3JvdXAtZm9vdGVyLWFwaS9pbmRleC50c1wiICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdncm91cEZvb3RlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBncm91cEZvb3RlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGdyb3VwIGNhcHRpb24gY2VsbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyBmb3IgdGhlIGFnZ3JlZ2F0ZSBjb2x1bW4uIFxuICAgICAqIFRoZSBgdHlwZWAgbmFtZSBzaG91bGQgYmUgdXNlZCB0byBhY2Nlc3MgYWdncmVnYXRlIHZhbHVlcyBpbnNpZGUgdGhlIHRlbXBsYXRlLiBcbiAgICAgKiBBZGRpdGlvbmFsbHksIHRoZSBmb2xsb3dpbmcgZmllbGRzIGNhbiBiZSBhY2Nlc3NlZCBpbiB0aGUgdGVtcGxhdGUuIFxuICAgICAqICogKipmaWVsZCoqOiBUaGUgY3VycmVudCBncm91cGVkIGZpZWxkIG5hbWUuIFxuICAgICAqICogKiprZXkqKjogVGhlIGN1cnJlbnQgZ3JvdXBlZCBmaWVsZCB2YWx1ZS5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPVwiZ3JpZC9ncm91cC1jYXB0aW9uLWFwaS9pbmRleC50c1wiICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdncm91cENhcHRpb25UZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZ3JvdXBDYXB0aW9uVGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZUNvbHVtbiBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdyaWQ+ZS1hZ2dyZWdhdGVzPmUtYWdncmVnYXRlPmUtY29sdW1ucycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihBZ2dyZWdhdGVDb2x1bW5EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQWdncmVnYXRlQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxBZ2dyZWdhdGVDb2x1bW5zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjb2x1bW5zJyk7XG4gICAgfVxufSJdfQ==