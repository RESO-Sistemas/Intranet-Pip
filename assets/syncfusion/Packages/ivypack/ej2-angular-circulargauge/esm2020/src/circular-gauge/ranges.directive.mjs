import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['color', 'end', 'endWidth', 'legendText', 'linearGradient', 'offset', 'opacity', 'position', 'radialGradient', 'radius', 'roundedCornerRadius', 'start', 'startWidth'];
let outputs = [];
/**
 * Represents the directive to render and customize the ranges in an axis of circular gauge.
 * ```html
 * <e-ranges><e-range></e-range></e-ranges>
 * ```
 */
export class RangeDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RangeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RangeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeDirective, selector: "e-ranges>e-range", inputs: { color: "color", end: "end", endWidth: "endWidth", legendText: "legendText", linearGradient: "linearGradient", offset: "offset", opacity: "opacity", position: "position", radialGradient: "radialGradient", radius: "radius", roundedCornerRadius: "roundedCornerRadius", start: "start", startWidth: "startWidth" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ranges>e-range',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Range Array Directive
 * @private
 */
export class RangesDirective extends ArrayBase {
    constructor() {
        super('ranges');
    }
}
RangesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RangesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangesDirective, selector: "ej-circulargauge>e-axes>e-axis>e-ranges", queries: [{ propertyName: "children", predicate: RangeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-circulargauge>e-axes>e-axis>e-ranges',
                    queries: {
                        children: new ContentChildren(RangeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jaXJjdWxhci1nYXVnZS9yYW5nZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM5TCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7O0dBS0c7QUFTSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQTJCO0lBMkUzRCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OzJHQWhGUSxjQUFjOytGQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFSMUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBb0ZEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxlQUFnQixTQUFRLFNBQTBCO0lBQzNEO1FBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7OzRHQUhRLGVBQWU7Z0dBQWYsZUFBZSx3R0FIVSxjQUFjOzJGQUd2QyxlQUFlO2tCQU4zQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx5Q0FBeUM7b0JBQ25ELE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsY0FBYyxDQUFDO3FCQUNoRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY29sb3InLCAnZW5kJywgJ2VuZFdpZHRoJywgJ2xlZ2VuZFRleHQnLCAnbGluZWFyR3JhZGllbnQnLCAnb2Zmc2V0JywgJ29wYWNpdHknLCAncG9zaXRpb24nLCAncmFkaWFsR3JhZGllbnQnLCAncmFkaXVzJywgJ3JvdW5kZWRDb3JuZXJSYWRpdXMnLCAnc3RhcnQnLCAnc3RhcnRXaWR0aCddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpcmVjdGl2ZSB0byByZW5kZXIgYW5kIGN1c3RvbWl6ZSB0aGUgcmFuZ2VzIGluIGFuIGF4aXMgb2YgY2lyY3VsYXIgZ2F1Z2UuXG4gKiBgYGBodG1sXG4gKiA8ZS1yYW5nZXM+PGUtcmFuZ2U+PC9lLXJhbmdlPjwvZS1yYW5nZXM+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJhbmdlcz5lLXJhbmdlJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxSYW5nZURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIGNvbG9yIG9mIHRoZSByYW5nZXMgaW4gY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIGVuZCB2YWx1ZSBvZiB0aGUgcmFuZ2UgaW4gY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIGVuZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB3aWR0aCBmb3IgdGhlIGVuZCBvZiB0aGUgcmFuZ2UgaW4gdGhlIGNpcmN1bGFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0ICcxMCdcbiAgICAgKi9cbiAgICBwdWJsaWMgZW5kV2lkdGg6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgdGV4dCB0byBiZSBkaXNwbGF5ZWQgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGxlZ2VuZCBpdGVtIGluIHRoZSBsZWdlbmQgb2YgdGhlIGNpcmN1bGFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGxlZ2VuZFRleHQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgcHJvcGVydGllcyB0byByZW5kZXIgYSBsaW5lYXIgZ3JhZGllbnQgZm9yIHRoZSByYW5nZS4gXG4gICAgICogSWYgYm90aCBsaW5lYXIgYW5kIHJhZGlhbCBncmFkaWVudCBpcyBzZXQsIHRoZW4gdGhlIGxpbmVhciBncmFkaWVudCB3aWxsIGJlIHJlbmRlcmVkIGluIHRoZSByYW5nZS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGxpbmVhckdyYWRpZW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG9mZnNldCB2YWx1ZSBmb3IgdGhlIHJhbmdlIGZyb20gd2hpY2ggaXQgaXMgdG8gYmUgcGxhY2VkIGZyb20gdGhlIGF4aXMgaW4gY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGRlZmF1bHQgJzAnXG4gICAgICovXG4gICAgcHVibGljIG9mZnNldDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBvcGFjaXR5IGZvciB0aGUgcmFuZ2VzIGluIGNpcmN1bGFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BhY2l0eTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcmFuZ2UgaW4gdGhlIGF4aXMgaW4gY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGRlZmF1bHQgQXV0b1xuICAgICAqL1xuICAgIHB1YmxpYyBwb3NpdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBwcm9wZXJ0aWVzIHRvIHJlbmRlciBhIHJhZGlhbCBncmFkaWVudCBmb3IgdGhlIHJhbmdlLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgcmFkaWFsR3JhZGllbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgcmFkaXVzIG9mIHRoZSByYW5nZSBmb3IgY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyByYWRpdXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgY29ybmVyIHJhZGl1cyBmb3IgcmFuZ2VzIGluIGNpcmN1bGFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgcm91bmRlZENvcm5lclJhZGl1czogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBzdGFydCB2YWx1ZSBvZiB0aGUgcmFuZ2UgaW4gY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIHdpZHRoIGZvciB0aGUgc3RhcnQgb2YgdGhlIHJhbmdlIGluIHRoZSBjaXJjdWxhciBnYXVnZS5cbiAgICAgKiBAZGVmYXVsdCAnMTAnXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0V2lkdGg6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFJhbmdlIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlai1jaXJjdWxhcmdhdWdlPmUtYXhlcz5lLWF4aXM+ZS1yYW5nZXMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oUmFuZ2VEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFJhbmdlc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigncmFuZ2VzJyk7XG4gICAgfVxufSJdfQ==