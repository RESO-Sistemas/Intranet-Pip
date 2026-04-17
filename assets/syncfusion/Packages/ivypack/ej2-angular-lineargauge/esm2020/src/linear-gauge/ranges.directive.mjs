import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['border', 'color', 'end', 'endWidth', 'linearGradient', 'offset', 'position', 'radialGradient', 'start', 'startWidth'];
let outputs = [];
/**
 * Represents the directive to render and customize the ranges in an axis of linear gauge.
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
RangeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeDirective, selector: "e-ranges>e-range", inputs: { border: "border", color: "color", end: "end", endWidth: "endWidth", linearGradient: "linearGradient", offset: "offset", position: "position", radialGradient: "radialGradient", start: "start", startWidth: "startWidth" }, usesInheritance: true, ngImport: i0 });
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
RangesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangesDirective, selector: "ej-lineargauge>e-axes>e-axis>e-ranges", queries: [{ propertyName: "children", predicate: RangeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-lineargauge>e-axes>e-axis>e-ranges',
                    queries: {
                        children: new ContentChildren(RangeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saW5lYXItZ2F1Z2UvcmFuZ2VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzlJLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7R0FLRztBQVNILE1BQU0sT0FBTyxjQUFlLFNBQVEsV0FBMkI7SUF3RDNELFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7MkdBN0RRLGNBQWM7K0ZBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQVIxQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUFpRUQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsU0FBMEI7SUFDM0Q7UUFDSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7NEdBSFEsZUFBZTtnR0FBZixlQUFlLHNHQUhVLGNBQWM7MkZBR3ZDLGVBQWU7a0JBTjNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHVDQUF1QztvQkFDakQsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxjQUFjLENBQUM7cUJBQ2hEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydib3JkZXInLCAnY29sb3InLCAnZW5kJywgJ2VuZFdpZHRoJywgJ2xpbmVhckdyYWRpZW50JywgJ29mZnNldCcsICdwb3NpdGlvbicsICdyYWRpYWxHcmFkaWVudCcsICdzdGFydCcsICdzdGFydFdpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlyZWN0aXZlIHRvIHJlbmRlciBhbmQgY3VzdG9taXplIHRoZSByYW5nZXMgaW4gYW4gYXhpcyBvZiBsaW5lYXIgZ2F1Z2UuXG4gKiBgYGBodG1sXG4gKiA8ZS1yYW5nZXM+PGUtcmFuZ2U+PC9lLXJhbmdlPjwvZS1yYW5nZXM+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJhbmdlcz5lLXJhbmdlJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxSYW5nZURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBzdHlsZSBwcm9wZXJ0aWVzIG9mIHRoZSBib3JkZXIgZm9yIHRoZSBheGlzIHJhbmdlLlxuICAgICAqL1xuICAgIHB1YmxpYyBib3JkZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgY29sb3Igb2YgdGhlIGF4aXMgcmFuZ2UuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sb3I6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgZW5kIHZhbHVlIGZvciB0aGUgcmFuZ2UgaW4gYXhpcy5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIGVuZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB3aWR0aCBmb3IgdGhlIGVuZCBvZiB0aGUgcmFuZ2UgaW4gYXhpcy5cbiAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAqL1xuICAgIHB1YmxpYyBlbmRXaWR0aDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBwcm9wZXJ0aWVzIHRvIHJlbmRlciBhIGxpbmVhciBncmFkaWVudCBmb3IgdGhlIHJhbmdlLiBcbiAgICAgKiBJZiBib3RoIGxpbmVhciBhbmQgcmFkaWFsIGdyYWRpZW50IGlzIHNldCwgdGhlbiB0aGUgbGluZWFyIGdyYWRpZW50IHdpbGwgYmUgcmVuZGVyZWQgaW4gdGhlIHJhbmdlLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgbGluZWFyR3JhZGllbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgb2Zmc2V0IHZhbHVlIGZyb20gd2hlcmUgdGhlIHJhbmdlIG11c3QgYmUgcGxhY2VkIGZyb20gdGhlIGF4aXMgaW4gbGluZWFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0ICcwJ1xuICAgICAqL1xuICAgIHB1YmxpYyBvZmZzZXQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIHJhbmdlcyBpbiB0aGUgYXhpcy5cbiAgICAgKiBAZGVmYXVsdCBPdXRzaWRlXG4gICAgICovXG4gICAgcHVibGljIHBvc2l0aW9uOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIHByb3BlcnRpZXMgdG8gcmVuZGVyIGEgcmFkaWFsIGdyYWRpZW50IGZvciB0aGUgcmFuZ2UuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyByYWRpYWxHcmFkaWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBzdGFydCB2YWx1ZSBmb3IgdGhlIHJhbmdlIGluIGF4aXMuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGFydDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB3aWR0aCBmb3IgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZSBpbiBheGlzLlxuICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0V2lkdGg6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFJhbmdlIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlai1saW5lYXJnYXVnZT5lLWF4ZXM+ZS1heGlzPmUtcmFuZ2VzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFJhbmdlRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxSYW5nZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3JhbmdlcycpO1xuICAgIH1cbn0iXX0=