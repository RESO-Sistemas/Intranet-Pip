import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['angle', 'autoAngle', 'content', 'description', 'radius', 'textStyle', 'zIndex'];
let outputs = [];
/**
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```html
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * ```
 */
export class AnnotationDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
AnnotationDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AnnotationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationDirective, selector: "e-annotations>e-annotation", inputs: { angle: "angle", autoAngle: "autoAngle", content: "content", description: "description", radius: "radius", textStyle: "textStyle", zIndex: "zIndex" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AnnotationDirective.prototype, "content", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-annotations>e-annotation',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { content: [{
                type: ContentChild,
                args: ['content']
            }] } });
/**
 * Annotation Array Directive
 * @private
 */
export class AnnotationsDirective extends ArrayBase {
    constructor() {
        super('annotations');
    }
}
AnnotationsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AnnotationsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationsDirective, selector: "ej-circulargauge>e-axes>e-axis>e-annotations", queries: [{ propertyName: "children", predicate: AnnotationDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-circulargauge>e-axes>e-axis>e-annotations',
                    queries: {
                        children: new ContentChildren(AnnotationDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NpcmN1bGFyLWdhdWdlL2Fubm90YXRpb25zLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELElBQUksS0FBSyxHQUFhLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEcsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7OztHQUtHO0FBU0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFdBQWdDO0lBMkNyRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O2dIQWhEUSxtQkFBbUI7b0dBQW5CLG1CQUFtQjtBQXlDNUI7SUFEQyxRQUFRLEVBQUU7b0RBQ1M7MkZBekNYLG1CQUFtQjtrQkFSL0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7dUdBMENVLE9BQU87c0JBRmIsWUFBWTt1QkFBQyxTQUFTOztBQVkzQjs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsU0FBK0I7SUFDckU7UUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekIsQ0FBQzs7aUhBSFEsb0JBQW9CO3FHQUFwQixvQkFBb0IsNkdBSEssbUJBQW1COzJGQUc1QyxvQkFBb0I7a0JBTmhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDhDQUE4QztvQkFDeEQsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQztxQkFDckQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydhbmdsZScsICdhdXRvQW5nbGUnLCAnY29udGVudCcsICdkZXNjcmlwdGlvbicsICdyYWRpdXMnLCAndGV4dFN0eWxlJywgJ3pJbmRleCddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpcmVjdGl2ZSB0byByZW5kZXIgYW5kIGN1c3RvbWl6ZSB0aGUgYW5ub3RhdGlvbnMgaW4gYW4gYXhpcyBvZiBjaXJjdWxhciBnYXVnZS5cbiAqIGBgYGh0bWxcbiAqIDxlLWFubm90YXRpb25zPjxlLWFubm90YXRpb24+PC9lLWFubm90YXRpb24+PC9lLWFubm90YXRpb25zPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1hbm5vdGF0aW9ucz5lLWFubm90YXRpb24nLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8QW5ub3RhdGlvbkRpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIGFuZ2xlIGZvciBhbm5vdGF0aW9uIHdpdGggcmVzcGVjdCB0byBheGlzIGluIGNpcmN1bGFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0IDkwXG4gICAgICovXG4gICAgcHVibGljIGFuZ2xlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEVuYWJsZXMgYW5kIGRpc2FibGVzIHRoZSByb3RhdGlvbiBvZiB0aGUgYW5ub3RhdGlvbiBhbG9uZyB0aGUgYXhpcy5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBhdXRvQW5nbGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgYW5ub3RhdGlvbiBmb3IgYXNzaXN0aXZlIHRlY2hub2xvZ3kuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSByYWRpdXMgZm9yIGFubm90YXRpb24gd2l0aCByZXNwZWN0IHRvIGF4aXMgaW4gY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGRlZmF1bHQgJzUwJSdcbiAgICAgKi9cbiAgICBwdWJsaWMgcmFkaXVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIHN0eWxlIG9mIHRoZSB0ZXh0IGluIGFubm90YXRpb24uXG4gICAgICovXG4gICAgcHVibGljIHRleHRTdHlsZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB6LWluZGV4IG9mIGFuIGFubm90YXRpb24gaW4gYW4gYXhpcyBpbiB0aGUgY2lyY3VsYXIgZ2F1Z2UuXG4gICAgICogQGRlZmF1bHQgJy0xJ1xuICAgICAqL1xuICAgIHB1YmxpYyB6SW5kZXg6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgY29udGVudCBvZiB0aGUgYW5ub3RhdGlvbi4gVGhpcyBwcm9wZXJ0eSBhY2NlcHRzIHRoZSBIVE1MIHN0cmluZyBvciBpZCBvZiB0aGUgY3VzdG9tIGVsZW1lbnQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2NvbnRlbnQnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGNvbnRlbnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEFubm90YXRpb24gQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2VqLWNpcmN1bGFyZ2F1Z2U+ZS1heGVzPmUtYXhpcz5lLWFubm90YXRpb25zJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKEFubm90YXRpb25EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ub3RhdGlvbnNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8QW5ub3RhdGlvbnNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2Fubm90YXRpb25zJyk7XG4gICAgfVxufSJdfQ==