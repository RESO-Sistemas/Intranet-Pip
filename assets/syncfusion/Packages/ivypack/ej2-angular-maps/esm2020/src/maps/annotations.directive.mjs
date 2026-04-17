import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['content', 'horizontalAlignment', 'verticalAlignment', 'x', 'y', 'zIndex'];
let outputs = [];
/**
 * Represents the directive to define the annotations in the maps.
 * ```html
 * <e-maps-annotations>
 * <e-maps-annotation></e-maps-annotation>
 * </e-maps-annotations>
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
AnnotationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationDirective, selector: "e-maps-annotations>e-maps-annotation", inputs: { content: "content", horizontalAlignment: "horizontalAlignment", verticalAlignment: "verticalAlignment", x: "x", y: "y", zIndex: "zIndex" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AnnotationDirective.prototype, "content", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-maps-annotations>e-maps-annotation',
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
AnnotationsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationsDirective, selector: "ej-maps>e-maps-annotations", queries: [{ propertyName: "children", predicate: AnnotationDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-maps>e-maps-annotations',
                    queries: {
                        children: new ContentChildren(AnnotationDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21hcHMvYW5ub3RhdGlvbnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7R0FPRztBQVNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxXQUFnQztJQXVDckUsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztnSEE1Q1EsbUJBQW1CO29HQUFuQixtQkFBbUI7QUFxQzVCO0lBREMsUUFBUSxFQUFFO29EQUNTOzJGQXJDWCxtQkFBbUI7a0JBUi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQXNDVSxPQUFPO3NCQUZiLFlBQVk7dUJBQUMsU0FBUzs7QUFZM0I7OztHQUdHO0FBT0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFNBQStCO0lBQ3JFO1FBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2lIQUhRLG9CQUFvQjtxR0FBcEIsb0JBQW9CLDJGQUhLLG1CQUFtQjsyRkFHNUMsb0JBQW9CO2tCQU5oQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUM7cUJBQ3JEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY29udGVudCcsICdob3Jpem9udGFsQWxpZ25tZW50JywgJ3ZlcnRpY2FsQWxpZ25tZW50JywgJ3gnLCAneScsICd6SW5kZXgnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkaXJlY3RpdmUgdG8gZGVmaW5lIHRoZSBhbm5vdGF0aW9ucyBpbiB0aGUgbWFwcy5cbiAqIGBgYGh0bWxcbiAqIDxlLW1hcHMtYW5ub3RhdGlvbnM+XG4gKiA8ZS1tYXBzLWFubm90YXRpb24+PC9lLW1hcHMtYW5ub3RhdGlvbj5cbiAqIDwvZS1tYXBzLWFubm90YXRpb25zPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1tYXBzLWFubm90YXRpb25zPmUtbWFwcy1hbm5vdGF0aW9uJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQW5ub3RhdGlvbkRpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPEFubm90YXRpb25EaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHR5cGUgb2YgdGhlIHBsYWNlbWVudCB3aGVuIHRoZSBhbm5vdGF0aW9uIGlzIHRvIGJlIGFsaWduZWQgaG9yaXpvbnRhbGx5LlxuICAgICAqIEBkZWZhdWx0IE5vbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgaG9yaXpvbnRhbEFsaWdubWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHR5cGUgb2YgdGhlIHBsYWNlbWVudCB3aGVuIHRoZSBhbm5vdGF0aW9uIGlzIHRvIGJlIGFsaWduZWQgdmVydGljYWxseS5cbiAgICAgKiBAZGVmYXVsdCBOb25lXG4gICAgICovXG4gICAgcHVibGljIHZlcnRpY2FsQWxpZ25tZW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgeCBwb3NpdGlvbiBvZiB0aGUgYW5ub3RhdGlvbiBpbiBwaXhlbCBvciBwZXJjZW50YWdlIGZvcm1hdC5cbiAgICAgKiBAZGVmYXVsdCAnMHB4J1xuICAgICAqL1xuICAgIHB1YmxpYyB4OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgYW5ub3RhdGlvbiBpbiBwaXhlbCBvciBwZXJjZW50YWdlIGZvcm1hdC5cbiAgICAgKiBAZGVmYXVsdCAnMHB4J1xuICAgICAqL1xuICAgIHB1YmxpYyB5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgYW5ub3RhdGlvbiBpbiBtYXBzLlxuICAgICAqIEBkZWZhdWx0ICctMSdcbiAgICAgKi9cbiAgICBwdWJsaWMgekluZGV4OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY29udGVudCBmb3IgdGhlIGFubm90YXRpb24gaW4gbWFwcy5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2NvbnRlbnQnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGNvbnRlbnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEFubm90YXRpb24gQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2VqLW1hcHM+ZS1tYXBzLWFubm90YXRpb25zJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKEFubm90YXRpb25EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ub3RhdGlvbnNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8QW5ub3RhdGlvbnNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2Fubm90YXRpb25zJyk7XG4gICAgfVxufSJdfQ==