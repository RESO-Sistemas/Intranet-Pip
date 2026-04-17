import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['axisIndex', 'axisValue', 'content', 'font', 'horizontalAlignment', 'verticalAlignment', 'x', 'y', 'zIndex'];
let outputs = [];
/**
 * Represents the directive to render and customize the annotations in the linear gauge.
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
AnnotationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationDirective, selector: "e-annotations>e-annotation", inputs: { axisIndex: "axisIndex", axisValue: "axisValue", content: "content", font: "font", horizontalAlignment: "horizontalAlignment", verticalAlignment: "verticalAlignment", x: "x", y: "y", zIndex: "zIndex" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
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
AnnotationsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationsDirective, selector: "ej-linear-gauge>e-annotations", queries: [{ propertyName: "children", predicate: AnnotationDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-linear-gauge>e-annotations',
                    queries: {
                        children: new ContentChildren(AnnotationDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmVhci1nYXVnZS9hbm5vdGF0aW9ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUd4RCxJQUFJLEtBQUssR0FBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BJLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7R0FLRztBQVNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxXQUFnQztJQXVEckUsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztnSEE1RFEsbUJBQW1CO29HQUFuQixtQkFBbUI7QUFxRDVCO0lBREMsUUFBUSxFQUFFO29EQUNTOzJGQXJEWCxtQkFBbUI7a0JBUi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQXNEVSxPQUFPO3NCQUZiLFlBQVk7dUJBQUMsU0FBUzs7QUFZM0I7OztHQUdHO0FBT0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFNBQStCO0lBQ3JFO1FBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2lIQUhRLG9CQUFvQjtxR0FBcEIsb0JBQW9CLDhGQUhLLG1CQUFtQjsyRkFHNUMsb0JBQW9CO2tCQU5oQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUM7cUJBQ3JEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnYXhpc0luZGV4JywgJ2F4aXNWYWx1ZScsICdjb250ZW50JywgJ2ZvbnQnLCAnaG9yaXpvbnRhbEFsaWdubWVudCcsICd2ZXJ0aWNhbEFsaWdubWVudCcsICd4JywgJ3knLCAnekluZGV4J107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlyZWN0aXZlIHRvIHJlbmRlciBhbmQgY3VzdG9taXplIHRoZSBhbm5vdGF0aW9ucyBpbiB0aGUgbGluZWFyIGdhdWdlLlxuICogYGBgaHRtbFxuICogPGUtYW5ub3RhdGlvbnM+PGUtYW5ub3RhdGlvbj48L2UtYW5ub3RhdGlvbj48L2UtYW5ub3RhdGlvbnM+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWFubm90YXRpb25zPmUtYW5ub3RhdGlvbicsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEFubm90YXRpb25EaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxBbm5vdGF0aW9uRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgYXhpcyBpbmRleCB3aGljaCBwbGFjZXMgdGhlIGFubm90YXRpb24gaW4gdGhlIHNwZWNpZmllZCBheGlzIGluIHRoZSBsaW5lYXIgZ2F1Z2UuXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGF4aXNJbmRleDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB2YWx1ZSBvZiBheGlzIHdoaWNoIHBsYWNlcyB0aGUgYW5ub3RhdGlvbiBuZWFyIHRoZSBzcGVjaWZpZWQgYXhpcyB2YWx1ZS5cbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgYXhpc1ZhbHVlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIG9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBmb250IG9mIHRoZSBhbm5vdGF0aW9uIGluIGxpbmVhciBnYXVnZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZm9udDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiBhbm5vdGF0aW9uLlxuICAgICAqIEBkZWZhdWx0IE5vbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgaG9yaXpvbnRhbEFsaWdubWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgYW5ub3RhdGlvbi5cbiAgICAgKiBAZGVmYXVsdCBOb25lXG4gICAgICovXG4gICAgcHVibGljIHZlcnRpY2FsQWxpZ25tZW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIHggcG9zaXRpb24gZm9yIHRoZSBhbm5vdGF0aW9uIGluIGxpbmVhciBnYXVnZS5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIHg6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgeSBwb3NpdGlvbiBmb3IgdGhlIGFubm90YXRpb24gaW4gbGluZWFyIGdhdWdlLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgeTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB6LWluZGV4IG9mIHRoZSBhbm5vdGF0aW9uLlxuICAgICAqIEBkZWZhdWx0ICctMSdcbiAgICAgKi9cbiAgICBwdWJsaWMgekluZGV4OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIGNvbnRlbnQgZm9yIHRoZSBhbm5vdGF0aW9uLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnY29udGVudCcpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY29udGVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQW5ub3RhdGlvbiBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWotbGluZWFyLWdhdWdlPmUtYW5ub3RhdGlvbnMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQW5ub3RhdGlvbkRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxBbm5vdGF0aW9uc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignYW5ub3RhdGlvbnMnKTtcbiAgICB9XG59Il19