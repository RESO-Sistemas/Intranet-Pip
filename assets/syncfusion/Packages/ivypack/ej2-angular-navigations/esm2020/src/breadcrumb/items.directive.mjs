import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['disabled', 'iconCss', 'id', 'text', 'url'];
let outputs = [];
/**
 * `e-breadcrumb-item` directive represent a item of the Angular Breadcrumb.
 * It must be contained in a Breadcrumb component(`ejs-breadcrumb`).
 * ```html
 * <ejs-breadcrumb>
 *   <e-breadcrumb-items>
 *    <e-breadcrumb-item text='Home' url='/'></e-breadcrumb-item>
 *    <e-breadcrumb-item text='Index' url='./index'></e-breadcrumb-item>
 *   </e-breadcrumb-items>
 * </ejs-breadcrumb>
 * ```
 */
export class BreadcrumbItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
BreadcrumbItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
BreadcrumbItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: BreadcrumbItemDirective, selector: "ejs-breadcrumb>e-breadcrumb-items>e-breadcrumb-item", inputs: { disabled: "disabled", iconCss: "iconCss", id: "id", text: "text", url: "url" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-breadcrumb>e-breadcrumb-items>e-breadcrumb-item',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * BreadcrumbItem Array Directive
 * @private
 */
export class BreadcrumbItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
BreadcrumbItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BreadcrumbItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: BreadcrumbItemsDirective, selector: "ejs-breadcrumb>e-breadcrumb-items", queries: [{ propertyName: "children", predicate: BreadcrumbItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-breadcrumb>e-breadcrumb-items',
                    queries: {
                        children: new ContentChildren(BreadcrumbItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2JyZWFkY3J1bWIvaXRlbXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkUsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFdBQW9DO0lBK0I3RSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O29IQXBDUSx1QkFBdUI7d0dBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQVJuQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxREFBcUQ7b0JBQy9ELE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUF3Q0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFNBQW1DO0lBQzdFO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7O3FIQUhRLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLGtHQUhDLHVCQUF1QjsyRkFHaEQsd0JBQXdCO2tCQU5wQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsdUJBQXVCLENBQUM7cUJBQ3pEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydkaXNhYmxlZCcsICdpY29uQ3NzJywgJ2lkJywgJ3RleHQnLCAndXJsJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtYnJlYWRjcnVtYi1pdGVtYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgaXRlbSBvZiB0aGUgQW5ndWxhciBCcmVhZGNydW1iLlxuICogSXQgbXVzdCBiZSBjb250YWluZWQgaW4gYSBCcmVhZGNydW1iIGNvbXBvbmVudChgZWpzLWJyZWFkY3J1bWJgKS5cbiAqIGBgYGh0bWxcbiAqIDxlanMtYnJlYWRjcnVtYj5cbiAqICAgPGUtYnJlYWRjcnVtYi1pdGVtcz5cbiAqICAgIDxlLWJyZWFkY3J1bWItaXRlbSB0ZXh0PSdIb21lJyB1cmw9Jy8nPjwvZS1icmVhZGNydW1iLWl0ZW0+XG4gKiAgICA8ZS1icmVhZGNydW1iLWl0ZW0gdGV4dD0nSW5kZXgnIHVybD0nLi9pbmRleCc+PC9lLWJyZWFkY3J1bWItaXRlbT5cbiAqICAgPC9lLWJyZWFkY3J1bWItaXRlbXM+XG4gKiA8L2Vqcy1icmVhZGNydW1iPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWJyZWFkY3J1bWI+ZS1icmVhZGNydW1iLWl0ZW1zPmUtYnJlYWRjcnVtYi1pdGVtJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkl0ZW1EaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxCcmVhZGNydW1iSXRlbURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIEVuYWJsZSBvciBkaXNhYmxlIHRoZSBicmVhZGNydW1iIGl0ZW0sIHdoZW4gc2V0IHRvIHRydWUsIHRoZSBicmVhZGNydW1iIGl0ZW0gd2lsbCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNhYmxlZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIGEgY2xhc3MvbXVsdGlwbGUgY2xhc3NlcyBzZXBhcmF0ZWQgYnkgYSBzcGFjZSBmb3IgdGhlIGl0ZW0gdGhhdCBpcyB1c2VkIHRvIGluY2x1ZGUgYW4gaWNvbi5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGljb25Dc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBpZCBvZiB0aGUgQnJlYWRjcnVtYiBpdGVtLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGlkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBCcmVhZGNydW1iIGl0ZW0uXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdGV4dDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIFVybCBvZiB0aGUgQnJlYWRjcnVtYiBpdGVtIHRoYXQgd2lsbCBiZSBhY3RpdmF0ZWQgd2hlbiBjbGlja2VkLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHVybDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQnJlYWRjcnVtYkl0ZW0gQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1icmVhZGNydW1iPmUtYnJlYWRjcnVtYi1pdGVtcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihCcmVhZGNydW1iSXRlbURpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iSXRlbXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8QnJlYWRjcnVtYkl0ZW1zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdpdGVtcycpO1xuICAgIH1cbn0iXX0=