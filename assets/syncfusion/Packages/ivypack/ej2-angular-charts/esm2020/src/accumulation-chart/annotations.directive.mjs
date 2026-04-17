import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['content', 'coordinateUnits', 'description', 'horizontalAlignment', 'region', 'verticalAlignment', 'x', 'y'];
let outputs = [];
/**
 * AccumulationAnnotations Directive
 * ```html
 * <e-accumulation-annotations>
 * <e-accumulation-annotation></e-accumulation-annotation>
 * </e-accumulation-annotations>
 * ```
 */
export class AccumulationAnnotationDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
AccumulationAnnotationDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccumulationAnnotationDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AccumulationAnnotationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AccumulationAnnotationDirective, selector: "e-accumulation-annotations>e-accumulation-annotation", inputs: { content: "content", coordinateUnits: "coordinateUnits", description: "description", horizontalAlignment: "horizontalAlignment", region: "region", verticalAlignment: "verticalAlignment", x: "x", y: "y" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AccumulationAnnotationDirective.prototype, "content", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccumulationAnnotationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-accumulation-annotations>e-accumulation-annotation',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { content: [{
                type: ContentChild,
                args: ['content']
            }] } });
/**
 * AccumulationAnnotation Array Directive
 * @private
 */
export class AccumulationAnnotationsDirective extends ArrayBase {
    constructor() {
        super('annotations');
    }
}
AccumulationAnnotationsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccumulationAnnotationsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AccumulationAnnotationsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AccumulationAnnotationsDirective, selector: "ej-accumulationchart>e-accumulation-annotations", queries: [{ propertyName: "children", predicate: AccumulationAnnotationDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccumulationAnnotationsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-accumulationchart>e-accumulation-annotations',
                    queries: {
                        children: new ContentChildren(AccumulationAnnotationDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FjY3VtdWxhdGlvbi1jaGFydC9hbm5vdGF0aW9ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUd4RCxJQUFJLEtBQUssR0FBYSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwSSxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7R0FPRztBQVNILE1BQU0sT0FBTywrQkFBZ0MsU0FBUSxXQUE0QztJQWtFN0YsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs0SEF2RVEsK0JBQStCO2dIQUEvQiwrQkFBK0I7QUFnRXhDO0lBREMsUUFBUSxFQUFFO2dFQUNTOzJGQWhFWCwrQkFBK0I7a0JBUjNDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNEQUFzRDtvQkFDaEUsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQWlFVSxPQUFPO3NCQUZiLFlBQVk7dUJBQUMsU0FBUzs7QUFZM0I7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLFNBQTJDO0lBQzdGO1FBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7OzZIQUhRLGdDQUFnQztpSEFBaEMsZ0NBQWdDLGdIQUhQLCtCQUErQjsyRkFHeEQsZ0NBQWdDO2tCQU41QyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpREFBaUQ7b0JBQzNELE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsK0JBQStCLENBQUM7cUJBQ2pFO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY29udGVudCcsICdjb29yZGluYXRlVW5pdHMnLCAnZGVzY3JpcHRpb24nLCAnaG9yaXpvbnRhbEFsaWdubWVudCcsICdyZWdpb24nLCAndmVydGljYWxBbGlnbm1lbnQnLCAneCcsICd5J107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogQWNjdW11bGF0aW9uQW5ub3RhdGlvbnMgRGlyZWN0aXZlXG4gKiBgYGBodG1sXG4gKiA8ZS1hY2N1bXVsYXRpb24tYW5ub3RhdGlvbnM+XG4gKiA8ZS1hY2N1bXVsYXRpb24tYW5ub3RhdGlvbj48L2UtYWNjdW11bGF0aW9uLWFubm90YXRpb24+XG4gKiA8L2UtYWNjdW11bGF0aW9uLWFubm90YXRpb25zPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1hY2N1bXVsYXRpb24tYW5ub3RhdGlvbnM+ZS1hY2N1bXVsYXRpb24tYW5ub3RhdGlvbicsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEFjY3VtdWxhdGlvbkFubm90YXRpb25EaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxBY2N1bXVsYXRpb25Bbm5vdGF0aW9uRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBjb29yZGluYXRlIHVuaXRzIG9mIHRoZSBhbm5vdGF0aW9uLiBcbiAgICAgKiBUaGUgb3B0aW9ucyBhcmU6IFxuICAgICAqICogUGl4ZWwgLSBSZW5kZXJzIHRoZSBhbm5vdGF0aW9uIGJhc2VkIG9uIHggYW5kIHkgcGl4ZWwgdmFsdWVzLiBcbiAgICAgKiAqIFBvaW50IC0gUmVuZGVycyB0aGUgYW5ub3RhdGlvbiBiYXNlZCBvbiB4IGFuZCB5IGRhdGEgdmFsdWVzLlxuICAgICAqIEBkZWZhdWx0ICdQaXhlbCdcbiAgICAgKi9cbiAgICBwdWJsaWMgY29vcmRpbmF0ZVVuaXRzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEEgZGVzY3JpcHRpb24gZm9yIHRoZSBhbm5vdGF0aW9uIHRoYXQgcHJvdmlkZXMgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhYm91dCBpdHMgY29udGVudCBmb3Igc2NyZWVuIHJlYWRlcnMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGFsaWdubWVudCBvZiB0aGUgYW5ub3RhdGlvbi4gXG4gICAgICogVGhlIG9wdGlvbnMgYXJlOiBcbiAgICAgKiAqIE5lYXIgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gZWxlbWVudCB0byB0aGUgdG9wIHNpZGUuIFxuICAgICAqICogRmFyIC0gQWxpZ25zIHRoZSBhbm5vdGF0aW9uIGVsZW1lbnQgdG8gdGhlIGJvdHRvbSBzaWRlLiBcbiAgICAgKiAqIENlbnRlciAtIEFsaWducyB0aGUgYW5ub3RhdGlvbiBlbGVtZW50IHRvIHRoZSBtaWRwb2ludC5cbiAgICAgKiBAZGVmYXVsdCAnQ2VudGVyJ1xuICAgICAqIEBkZXByZWNhdGVkIFxuICAgICAqL1xuICAgIHB1YmxpYyBob3Jpem9udGFsQWxpZ25tZW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgcmVnaW9ucyBvZiB0aGUgYW5ub3RhdGlvbi4gXG4gICAgICogVGhlIG9wdGlvbnMgYXJlOiBcbiAgICAgKiAqIENoYXJ0IC0gUmVuZGVycyB0aGUgYW5ub3RhdGlvbiBiYXNlZCBvbiBjaGFydCBjb29yZGluYXRlcy4gXG4gICAgICogKiBTZXJpZXMgLSBSZW5kZXJzIHRoZSBhbm5vdGF0aW9uIGJhc2VkIG9uIHNlcmllcyBjb29yZGluYXRlcy5cbiAgICAgKiBAZGVmYXVsdCAnQ2hhcnQnXG4gICAgICovXG4gICAgcHVibGljIHJlZ2lvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBhbm5vdGF0aW9uLiBcbiAgICAgKiBUaGUgb3B0aW9ucyBhcmUgXG4gICAgICogKiBUb3AgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gZWxlbWVudCB0byB0aGUgdG9wIHNpZGUuIFxuICAgICAqICogQm90dG9tIC0gQWxpZ25zIHRoZSBhbm5vdGF0aW9uIGVsZW1lbnQgdG8gdGhlIGJvdHRvbSBzaWRlLiBcbiAgICAgKiAqIE1pZGRsZSAtIEFsaWducyB0aGUgYW5ub3RhdGlvbiBlbGVtZW50IHRvIHRoZSBtaWRwb2ludC5cbiAgICAgKiBAZGVmYXVsdCAnTWlkZGxlJ1xuICAgICAqIEBkZXByZWNhdGVkIFxuICAgICAqL1xuICAgIHB1YmxpYyB2ZXJ0aWNhbEFsaWdubWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBJZiBgY29vcmRpbmF0ZVVuaXRgIGlzIHNldCB0byBgUGl4ZWxgLCB4IHNwZWNpZmllcyB0aGUgcGl4ZWwgdmFsdWUuIFxuICAgICAqIElmIGBjb29yZGluYXRlVW5pdGAgaXMgc2V0IHRvIGBQb2ludGAsIHggc3BlY2lmaWVzIHRoZSBkYXRhIHZhbHVlLlxuICAgICAqIEBkZWZhdWx0ICcwJ1xuICAgICAqL1xuICAgIHB1YmxpYyB4OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIElmIGBjb29yZGluYXRlVW5pdGAgaXMgc2V0IHRvIGBQaXhlbGAsIHkgc3BlY2lmaWVzIHRoZSBwaXhlbCB2YWx1ZS4gXG4gICAgICogSWYgYGNvb3JkaW5hdGVVbml0YCBpcyBzZXQgdG8gYFBvaW50YCwgeSBzcGVjaWZpZXMgdGhlIGRhdGEgdmFsdWUuXG4gICAgICogQGRlZmF1bHQgJzAnXG4gICAgICovXG4gICAgcHVibGljIHk6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGNvbnRlbnQgb2YgdGhlIGFubm90YXRpb24sIHdoaWNoIGNhbiBhbHNvIGFjY2VwdCB0aGUgSUQgb2YgYSBjdXN0b20gZWxlbWVudC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnY29udGVudCcpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY29udGVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQWNjdW11bGF0aW9uQW5ub3RhdGlvbiBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWotYWNjdW11bGF0aW9uY2hhcnQ+ZS1hY2N1bXVsYXRpb24tYW5ub3RhdGlvbnMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQWNjdW11bGF0aW9uQW5ub3RhdGlvbkRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBY2N1bXVsYXRpb25Bbm5vdGF0aW9uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxBY2N1bXVsYXRpb25Bbm5vdGF0aW9uc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignYW5ub3RhdGlvbnMnKTtcbiAgICB9XG59Il19