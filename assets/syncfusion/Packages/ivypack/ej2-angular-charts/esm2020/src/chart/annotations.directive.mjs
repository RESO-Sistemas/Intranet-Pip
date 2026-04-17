import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['accessibility', 'content', 'coordinateUnits', 'description', 'horizontalAlignment', 'region', 'verticalAlignment', 'x', 'xAxisName', 'y', 'yAxisName'];
let outputs = [];
/**
 * Annotation Directive
 * ```html
 * <e-annotations><e-annotation></e-annotation><e-annotations>
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
AnnotationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationDirective, selector: "e-annotations>e-annotation", inputs: { accessibility: "accessibility", content: "content", coordinateUnits: "coordinateUnits", description: "description", horizontalAlignment: "horizontalAlignment", region: "region", verticalAlignment: "verticalAlignment", x: "x", xAxisName: "xAxisName", y: "y", yAxisName: "yAxisName" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
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
AnnotationsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AnnotationsDirective, selector: "ejs-chart>e-annotations", queries: [{ propertyName: "children", predicate: AnnotationDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AnnotationsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chart>e-annotations',
                    queries: {
                        children: new ContentChildren(AnnotationDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NoYXJ0L2Fubm90YXRpb25zLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELElBQUksS0FBSyxHQUFhLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9LLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7R0FLRztBQVNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxXQUFnQztJQW9GckUsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztnSEF6RlEsbUJBQW1CO29HQUFuQixtQkFBbUI7QUFrRjVCO0lBREMsUUFBUSxFQUFFO29EQUNTOzJGQWxGWCxtQkFBbUI7a0JBUi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQW1GVSxPQUFPO3NCQUZiLFlBQVk7dUJBQUMsU0FBUzs7QUFZM0I7OztHQUdHO0FBT0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFNBQStCO0lBQ3JFO1FBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2lIQUhRLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdGQUhLLG1CQUFtQjsyRkFHNUMsb0JBQW9CO2tCQU5oQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUM7cUJBQ3JEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnYWNjZXNzaWJpbGl0eScsICdjb250ZW50JywgJ2Nvb3JkaW5hdGVVbml0cycsICdkZXNjcmlwdGlvbicsICdob3Jpem9udGFsQWxpZ25tZW50JywgJ3JlZ2lvbicsICd2ZXJ0aWNhbEFsaWdubWVudCcsICd4JywgJ3hBeGlzTmFtZScsICd5JywgJ3lBeGlzTmFtZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIEFubm90YXRpb24gRGlyZWN0aXZlXG4gKiBgYGBodG1sXG4gKiA8ZS1hbm5vdGF0aW9ucz48ZS1hbm5vdGF0aW9uPjwvZS1hbm5vdGF0aW9uPjxlLWFubm90YXRpb25zPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1hbm5vdGF0aW9ucz5lLWFubm90YXRpb24nLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8QW5ub3RhdGlvbkRpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgdG8gaW1wcm92ZSBhY2Nlc3NpYmlsaXR5IGZvciBjaGFydCBhbm5vdGF0aW9uIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBhY2Nlc3NpYmlsaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgY29vcmRpbmF0ZSB1bml0cyBvZiB0aGUgYW5ub3RhdGlvbi4gXG4gICAgICogVGhlIG9wdGlvbnMgYXJlOiBcbiAgICAgKiAqIFBpeGVsIC0gUmVuZGVycyB0aGUgYW5ub3RhdGlvbiBiYXNlZCBvbiB4IGFuZCB5IHBpeGVsIHZhbHVlcy4gXG4gICAgICogKiBQb2ludCAtIFJlbmRlcnMgdGhlIGFubm90YXRpb24gYmFzZWQgb24geCBhbmQgeSBheGlzIHZhbHVlcy5cbiAgICAgKiBAZGVmYXVsdCAnUGl4ZWwnXG4gICAgICovXG4gICAgcHVibGljIGNvb3JkaW5hdGVVbml0czogYW55O1xuICAgIC8qKiBcbiAgICAgKiBBIGRlc2NyaXB0aW9uIGZvciB0aGUgYW5ub3RhdGlvbiB0aGF0IHByb3ZpZGVzIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gYWJvdXQgaXRzIGNvbnRlbnQgZm9yIHNjcmVlbiByZWFkZXJzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAZGVwcmVjYXRlZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBhbGlnbm1lbnQgb2YgdGhlIGFubm90YXRpb24uIFxuICAgICAqIFRoZSBvcHRpb25zIGFyZTogXG4gICAgICogKiBOZWFyIC0gQWxpZ25zIHRoZSBhbm5vdGF0aW9uIGVsZW1lbnQgdG8gdGhlIGxlZnQgc2lkZS4gXG4gICAgICogKiBGYXIgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gZWxlbWVudCB0byB0aGUgcmlnaHQgc2lkZS4gXG4gICAgICogKiBDZW50ZXIgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gZWxlbWVudCB0byB0aGUgbWlkcG9pbnQuXG4gICAgICogQGRlZmF1bHQgJ0NlbnRlcidcbiAgICAgKiBAZGVwcmVjYXRlZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgaG9yaXpvbnRhbEFsaWdubWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHJlZ2lvbnMgb2YgdGhlIGFubm90YXRpb24uIFxuICAgICAqIFRoZSBvcHRpb25zIGFyZTogXG4gICAgICogKiBDaGFydCAtIFJlbmRlcnMgdGhlIGFubm90YXRpb24gYmFzZWQgb24gY2hhcnQgY29vcmRpbmF0ZXMuIFxuICAgICAqICogU2VyaWVzIC0gUmVuZGVycyB0aGUgYW5ub3RhdGlvbiBiYXNlZCBvbiBzZXJpZXMgY29vcmRpbmF0ZXMuXG4gICAgICogQGRlZmF1bHQgJ0NoYXJ0J1xuICAgICAqL1xuICAgIHB1YmxpYyByZWdpb246IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgYW5ub3RhdGlvbi4gXG4gICAgICogVGhlIG9wdGlvbnMgYXJlIFxuICAgICAqICogVG9wIC0gQWxpZ25zIHRoZSBhbm5vdGF0aW9uIGVsZW1lbnQgdG8gdGhlIHRvcCBzaWRlLiBcbiAgICAgKiAqIEJvdHRvbSAtIEFsaWducyB0aGUgYW5ub3RhdGlvbiBlbGVtZW50IHRvIHRoZSBib3R0b20gc2lkZS4gXG4gICAgICogKiBNaWRkbGUgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gZWxlbWVudCB0byB0aGUgbWlkcG9pbnQuXG4gICAgICogQGRlZmF1bHQgJ01pZGRsZSdcbiAgICAgKiBAZGVwcmVjYXRlZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgdmVydGljYWxBbGlnbm1lbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogSWYgYGNvb3JkaW5hdGVVbml0YCBpcyBzZXQgdG8gYFBpeGVsYCwgeCBzcGVjaWZpZXMgdGhlIHBpeGVsIHZhbHVlLiBcbiAgICAgKiBJZiBgY29vcmRpbmF0ZVVuaXRgIGlzIHNldCB0byBgUG9pbnRgLCB4IHNwZWNpZmllcyB0aGUgYXhpcyB2YWx1ZS5cbiAgICAgKiBAZGVmYXVsdCAnMCdcbiAgICAgKiBAYXNwdHlwZSBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgeDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgaG9yaXpvbnRhbCBheGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgYW5ub3RhdGlvbi4gXG4gICAgICogUmVxdWlyZXMgdGhlIGBheGVzYCBvZiB0aGUgY2hhcnQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB4QXhpc05hbWU6IGFueTtcbiAgICAvKiogXG4gICAgICogSWYgYGNvb3JkaW5hdGVVbml0YCBpcyBzZXQgdG8gYFBpeGVsYCwgeSBzcGVjaWZpZXMgdGhlIHBpeGVsIHZhbHVlLiBcbiAgICAgKiBJZiBgY29vcmRpbmF0ZVVuaXRgIGlzIHNldCB0byBgUG9pbnRgLCB5IHNwZWNpZmllcyB0aGUgYXhpcyB2YWx1ZS5cbiAgICAgKiBAZGVmYXVsdCAnMCdcbiAgICAgKi9cbiAgICBwdWJsaWMgeTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgdmVydGljYWwgYXhpcyBhc3NvY2lhdGVkIHdpdGggdGhlIGFubm90YXRpb24uIFxuICAgICAqIFJlcXVpcmVzIHRoZSBgYXhlc2Agb2YgdGhlIGNoYXJ0LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgeUF4aXNOYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBjb250ZW50IG9mIHRoZSBhbm5vdGF0aW9uLCB3aGljaCBhbHNvIGFjY2VwdHMgdGhlIElEIG9mIHRoZSBjdXN0b20gZWxlbWVudC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnY29udGVudCcpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY29udGVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQW5ub3RhdGlvbiBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWNoYXJ0PmUtYW5ub3RhdGlvbnMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQW5ub3RhdGlvbkRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxBbm5vdGF0aW9uc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignYW5ub3RhdGlvbnMnKTtcbiAgICB9XG59Il19