import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { RangesDirective } from './ranges.directive';
import { PointersDirective } from './pointers.directive';
import * as i0 from "@angular/core";
let input = ['isInversed', 'labelStyle', 'line', 'majorTicks', 'maximum', 'minimum', 'minorTicks', 'opposedPosition', 'pointers', 'ranges', 'showLastLabel'];
let outputs = [];
/**
 * Represents the directive to render the axes in the Linear Gauge.
 * ```html
 * <e-axes><e-axis></e-axis></e-axes>
 * ```
 */
export class AxisDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['ranges', 'pointers'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
AxisDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AxisDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AxisDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AxisDirective, selector: "e-axes>e-axis", inputs: { isInversed: "isInversed", labelStyle: "labelStyle", line: "line", majorTicks: "majorTicks", maximum: "maximum", minimum: "minimum", minorTicks: "minorTicks", opposedPosition: "opposedPosition", pointers: "pointers", ranges: "ranges", showLastLabel: "showLastLabel" }, queries: [{ propertyName: "childRanges", first: true, predicate: RangesDirective, descendants: true }, { propertyName: "childPointers", first: true, predicate: PointersDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AxisDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-axes>e-axis',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childRanges: new ContentChild(RangesDirective),
                        childPointers: new ContentChild(PointersDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Axis Array Directive
 * @private
 */
export class AxesDirective extends ArrayBase {
    constructor() {
        super('axes');
    }
}
AxesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AxesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AxesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AxesDirective, selector: "ej-lineargauge>e-axes", queries: [{ propertyName: "children", predicate: AxisDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AxesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-lineargauge>e-axes',
                    queries: {
                        children: new ContentChildren(AxisDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGluZWFyLWdhdWdlL2F4ZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUV6RCxJQUFJLEtBQUssR0FBYSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZLLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7R0FLRztBQVVILE1BQU0sT0FBTyxhQUFjLFNBQVEsV0FBMEI7SUF3RHpELFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFuRDlDLFNBQUksR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQXFEM0MsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7MEdBN0RRLGFBQWE7OEZBQWIsYUFBYSxvWEFKWSxlQUFlLGdGQUNiLGlCQUFpQjsyRkFHNUMsYUFBYTtrQkFUekIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRTt3QkFDTCxXQUFXLEVBQUUsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDO3dCQUM5QyxhQUFhLEVBQUUsSUFBSSxZQUFZLENBQUMsaUJBQWlCLENBQUM7cUJBQ3JEO2lCQUNKOztBQWlFRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sYUFBYyxTQUFRLFNBQXdCO0lBQ3ZEO1FBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLENBQUM7OzBHQUhRLGFBQWE7OEZBQWIsYUFBYSxzRkFIWSxhQUFhOzJGQUd0QyxhQUFhO2tCQU56QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDO3FCQUMvQztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cbmltcG9ydCB7IFJhbmdlc0RpcmVjdGl2ZSB9IGZyb20gJy4vcmFuZ2VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb2ludGVyc0RpcmVjdGl2ZSB9IGZyb20gJy4vcG9pbnRlcnMuZGlyZWN0aXZlJztcblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnaXNJbnZlcnNlZCcsICdsYWJlbFN0eWxlJywgJ2xpbmUnLCAnbWFqb3JUaWNrcycsICdtYXhpbXVtJywgJ21pbmltdW0nLCAnbWlub3JUaWNrcycsICdvcHBvc2VkUG9zaXRpb24nLCAncG9pbnRlcnMnLCAncmFuZ2VzJywgJ3Nob3dMYXN0TGFiZWwnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkaXJlY3RpdmUgdG8gcmVuZGVyIHRoZSBheGVzIGluIHRoZSBMaW5lYXIgR2F1Z2UuXG4gKiBgYGBodG1sXG4gKiA8ZS1heGVzPjxlLWF4aXM+PC9lLWF4aXM+PC9lLWF4ZXM+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWF4ZXM+ZS1heGlzJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRSYW5nZXM6IG5ldyBDb250ZW50Q2hpbGQoUmFuZ2VzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkUG9pbnRlcnM6IG5ldyBDb250ZW50Q2hpbGQoUG9pbnRlcnNEaXJlY3RpdmUpXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBeGlzRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8QXhpc0RpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcbiAgICBwdWJsaWMgY2hpbGRSYW5nZXM6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRQb2ludGVyczogYW55O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsncmFuZ2VzJywgJ3BvaW50ZXJzJ107XG4gICAgLyoqIFxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlIGludmVyc2VkIGF4aXMuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNJbnZlcnNlZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBvcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgbGFiZWwgaW4gYXhpcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgbGFiZWxTdHlsZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBvcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgYXhpcyBsaW5lLlxuICAgICAqL1xuICAgIHB1YmxpYyBsaW5lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG9wdGlvbnMgZm9yIGN1c3RvbWl6aW5nIHRoZSBtYWpvciB0aWNrIGxpbmVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBtYWpvclRpY2tzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG1heGltdW0gdmFsdWUgZm9yIHRoZSBheGlzLlxuICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAqL1xuICAgIHB1YmxpYyBtYXhpbXVtOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG1pbmltdW0gdmFsdWUgZm9yIHRoZSBheGlzLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgbWluaW11bTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBvcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgbWlub3IgdGljayBsaW5lcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgbWlub3JUaWNrczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBFbmFibGVzIG9yIGRpc2FibGVzIHRoZSBvcHBvc2VkIHBvc2l0aW9uIG9mIHRoZSBheGlzIGluIHRoZSBsaW5lYXIgZ2F1Z2UuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgb3Bwb3NlZFBvc2l0aW9uOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG9wdGlvbnMgZm9yIGN1c3RvbWl6aW5nIHRoZSBwb2ludGVycyBvZiBhbiBheGlzLlxuICAgICAqL1xuICAgIHB1YmxpYyBwb2ludGVyczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBvcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgcmFuZ2VzIG9mIGFuIGF4aXMuXG4gICAgICovXG4gICAgcHVibGljIHJhbmdlczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTaG93cyBvciBoaWRlcyB0aGUgbGFzdCBsYWJlbCBpbiB0aGUgYXhpcyBvZiB0aGUgbGluZWFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIHNob3dMYXN0TGFiZWw6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEF4aXMgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2VqLWxpbmVhcmdhdWdlPmUtYXhlcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihBeGlzRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIEF4ZXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8QXhlc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignYXhlcycpO1xuICAgIH1cbn0iXX0=