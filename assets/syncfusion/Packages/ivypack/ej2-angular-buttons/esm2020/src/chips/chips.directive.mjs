import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['avatarIconCss', 'avatarText', 'cssClass', 'enabled', 'htmlAttributes', 'leadingIconCss', 'leadingIconUrl', 'template', 'text', 'trailingIconCss', 'trailingIconUrl', 'value'];
let outputs = [];
/**
 * `e-chip` directive represent a chip of the Angular ChipList.
 * ```html
 * <ejs-chiplist >
 *   <e-chips>
 *    <e-chip text='chip1'></e-chip>
 *    <e-chip text='chip2'></e-chip>
 *   </e-chips>
 * </ejs-chiplist>
 * ```
 */
export class ChipDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ChipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ChipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ChipDirective, selector: "e-chips>e-chip", inputs: { avatarIconCss: "avatarIconCss", avatarText: "avatarText", cssClass: "cssClass", enabled: "enabled", htmlAttributes: "htmlAttributes", leadingIconCss: "leadingIconCss", leadingIconUrl: "leadingIconUrl", template: "template", text: "text", trailingIconCss: "trailingIconCss", trailingIconUrl: "trailingIconUrl", value: "value" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ChipDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-chips>e-chip',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
/**
 * Chip Array Directive
 * @private
 */
export class ChipsDirective extends ArrayBase {
    constructor() {
        super('chips');
    }
}
ChipsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ChipsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ChipsDirective, selector: "ejs-chiplist>e-chips", queries: [{ propertyName: "children", predicate: ChipDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chiplist>e-chips',
                    queries: {
                        children: new ContentChildren(ChipDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NoaXBzL2NoaXBzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBR3hELElBQUksS0FBSyxHQUFhLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdE0sSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7O0dBVUc7QUFTSCxNQUFNLE9BQU8sYUFBYyxTQUFRLFdBQTBCO0lBMEV6RCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OzBHQS9FUSxhQUFhOzhGQUFiLGFBQWE7QUF3RXRCO0lBREMsUUFBUSxFQUFFOytDQUNVOzJGQXhFWixhQUFhO2tCQVJ6QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjt1R0F5RVUsUUFBUTtzQkFGZCxZQUFZO3VCQUFDLFVBQVU7O0FBWTVCOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxjQUFlLFNBQVEsU0FBeUI7SUFDekQ7UUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQzs7MkdBSFEsY0FBYzsrRkFBZCxjQUFjLHFGQUhXLGFBQWE7MkZBR3RDLGNBQWM7a0JBTjFCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxhQUFhLENBQUM7cUJBQy9DO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnYXZhdGFySWNvbkNzcycsICdhdmF0YXJUZXh0JywgJ2Nzc0NsYXNzJywgJ2VuYWJsZWQnLCAnaHRtbEF0dHJpYnV0ZXMnLCAnbGVhZGluZ0ljb25Dc3MnLCAnbGVhZGluZ0ljb25VcmwnLCAndGVtcGxhdGUnLCAndGV4dCcsICd0cmFpbGluZ0ljb25Dc3MnLCAndHJhaWxpbmdJY29uVXJsJywgJ3ZhbHVlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtY2hpcGAgZGlyZWN0aXZlIHJlcHJlc2VudCBhIGNoaXAgb2YgdGhlIEFuZ3VsYXIgQ2hpcExpc3QuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWNoaXBsaXN0ID4gXG4gKiAgIDxlLWNoaXBzPlxuICogICAgPGUtY2hpcCB0ZXh0PSdjaGlwMSc+PC9lLWNoaXA+XG4gKiAgICA8ZS1jaGlwIHRleHQ9J2NoaXAyJz48L2UtY2hpcD5cbiAqICAgPC9lLWNoaXBzPlxuICogPC9lanMtY2hpcGxpc3Q+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWNoaXBzPmUtY2hpcCcsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENoaXBEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxDaGlwRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBpY29uIENTUyBjbGFzcyBmb3IgdGhlIGF2YXRhciBpbiB0aGUgY2hpcC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBhdmF0YXJJY29uQ3NzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgY3VzdG9taXplZCB0ZXh0IHZhbHVlIGZvciB0aGUgYXZhdGFyIGluIHRoZSBjaGlwLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGF2YXRhclRleHQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBjdXN0b20gY2xhc3NlcyB0byBiZSBhZGRlZCB0byB0aGUgY2hpcCBlbGVtZW50IHVzZWQgdG8gY3VzdG9taXplIHRoZSBDaGlwTGlzdCBjb21wb25lbnQuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgY3NzQ2xhc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgY2hpcCBjb21wb25lbnQgaXMgZW5hYmxlZCBvciBub3QuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGVkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgYWRkaXRpb25hbCBIVE1MIGF0dHJpYnV0ZXMsIHN1Y2ggYXMgdGl0bGUsIHN0eWxlcywgY2xhc3MsIGlkLCBhbmQgbmFtZSwgaW4gYSBrZXktdmFsdWUgcGFpciBmb3JtYXQgXG4gICAgICogYW5kIGFwcGVuZGVkIHRvIHRoZSBjaGlwIGl0ZW0gZWxlbWVudCBvZiB0aGUgQ2hpcCBjb21wb25lbnQuIElmIGJvdGggdGhlIHByb3BlcnR5IGFuZCBlcXVpdmFsZW50IEhUTUwgYXR0cmlidXRlcyBhcmUgY29uZmlndXJlZCwgXG4gICAgICogdGhlbiB0aGUgY29tcG9uZW50IG92ZXJyaWRlcyB0aGUgcHJvcGVydHkgdmFsdWUgd2l0aCB0aGUgSFRNTCBhdHRyaWJ1dGVzLlxuICAgICAqIEBkZWZhdWx0IHt9XG4gICAgICovXG4gICAgcHVibGljIGh0bWxBdHRyaWJ1dGVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbGVhZGluZyBpY29uIENTUyBjbGFzcyBmb3IgdGhlIGNoaXAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgbGVhZGluZ0ljb25Dc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBsZWFkaW5nIGljb24gdXJsIGZvciB0aGUgY2hpcC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBsZWFkaW5nSWNvblVybDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRleHQgY29udGVudCBmb3IgdGhlIGNoaXAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdGV4dDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRyYWlsaW5nIGljb24gQ1NTIGNsYXNzIGZvciB0aGUgY2hpcC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyB0cmFpbGluZ0ljb25Dc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0cmFpbGluZyBpY29uIHVybCBmb3IgdGhlIGNoaXAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhaWxpbmdJY29uVXJsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSBjaGlwLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHZhbHVlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgY29udGVudCB0byBiZSByZW5kZXJlZCBmb3IgZWFjaCBpbmRpdmlkdWFsIGNoaXAgaXRlbS4gVGhpcyB0ZW1wbGF0ZSBhbGxvd3MgZm9yIHRoZSByZW5kZXJpbmcgb2YgY3VzdG9tIEhUTUwgZWxlbWVudHMsIHN1Y2ggYXMgYW5jaG9yIHRhZ3MsIFNWRyBpY29ucywgb3Igb3RoZXIgY29tcG9uZW50cywgd2l0aGluIGVhY2ggY2hpcCBpdGVtLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCd0ZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIENoaXAgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1jaGlwbGlzdD5lLWNoaXBzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKENoaXBEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hpcHNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8Q2hpcHNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2NoaXBzJyk7XG4gICAgfVxufSJdfQ==