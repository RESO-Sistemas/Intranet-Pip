import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cssClass', 'from', 'label', 'to'];
let outputs = [];
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'></e-holiday>
 *     <e-holiday from='05/15/2018' label='Holiday 2'></e-holiday>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
export class HolidayDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
HolidayDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidayDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
HolidayDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HolidayDirective, selector: "ejs-gantt>e-holidays>e-holidays", inputs: { cssClass: "cssClass", from: "from", label: "label", to: "to" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidayDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-holidays>e-holidays',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Holiday Array Directive
 * @private
 */
export class HolidaysDirective extends ArrayBase {
    constructor() {
        super('holidays');
    }
}
HolidaysDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidaysDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
HolidaysDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HolidaysDirective, selector: "ejs-gantt>e-holidays", queries: [{ propertyName: "children", predicate: HolidayDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidaysDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-holidays',
                    queries: {
                        children: new ContentChildren(HolidayDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9saWRheXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbnR0L2hvbGlkYXlzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFdBQTZCO0lBdUMvRCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OzZHQTVDUSxnQkFBZ0I7aUdBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQVI1QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUFnREQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFNBQTRCO0lBQy9EO1FBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7OzhHQUhRLGlCQUFpQjtrR0FBakIsaUJBQWlCLHFGQUhRLGdCQUFnQjsyRkFHekMsaUJBQWlCO2tCQU43QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsZ0JBQWdCLENBQUM7cUJBQ2xEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjc3NDbGFzcycsICdmcm9tJywgJ2xhYmVsJywgJ3RvJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtaG9saWRheXNgIGRpcmVjdGl2ZSByZXByZXNlbnQgYSBob2xpZGF5cyBjb2xsZWN0aW9uIGluIEdhbnR0LiBcbiAqIEl0IG11c3QgYmUgY29udGFpbmVkIGluIGEgR2FudHQgY29tcG9uZW50KGBlanMtZ2FudHRgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdhbnR0IFtkYXRhU291cmNlXT0nZGF0YScgYWxsb3dTZWxlY3Rpb249J3RydWUnIGFsbG93U29ydGluZz0ndHJ1ZSc+IFxuICogICA8ZS1ob2xpZGF5cz5cbiAqICAgICA8ZS1ob2xpZGF5IGZyb209JzAyLzIwLzIwMTgnIGxhYmVsPSdIb2xpZGF5IDEnPjwvZS1ob2xpZGF5PlxuICogICAgIDxlLWhvbGlkYXkgZnJvbT0nMDUvMTUvMjAxOCcgbGFiZWw9J0hvbGlkYXkgMic+PC9lLWhvbGlkYXk+XG4gKiAgIDwvZS1ob2xpZGF5cz5cbiAqIDwvZWpzLWdhbnR0PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtaG9saWRheXM+ZS1ob2xpZGF5cycsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEhvbGlkYXlEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxIb2xpZGF5RGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIGN1c3RvbSBDU1MgY2xhc3MgZm9yIHN0eWxpbmcgdGhlIGhvbGlkYXkgbWFya2VyIGFuZCBsYWJlbC5cbiAgICAgKiBcbiAgICAgKiBVc2UgdGhpcyB0byBhcHBseSBjdXN0b20gYmFja2dyb3VuZCwgYm9yZGVycywgb3IgZm9udCBzdHlsZXMuXG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY3NzQ2xhc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdGFydCBkYXRlIG9mIHRoZSBob2xpZGF5LlxuICAgICAqIFxuICAgICAqIEFjY2VwdHMgYSBgRGF0ZWAgb2JqZWN0IG9yIElTTy1mb3JtYXR0ZWQgc3RyaW5nLlxuICAgICAqICAgICBcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGZyb206IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIGxhYmVsIG9yIGRlc2NyaXB0aW9uIGZvciB0aGUgaG9saWRheS5cbiAgICAgKiBcbiAgICAgKiBVc2VmdWwgZm9yIHRvb2x0aXBzLCBhbm5vdGF0aW9ucywgYW5kIGV4cG9ydCBtZXRhZGF0YS5cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBsYWJlbDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGVuZCBkYXRlIG9mIHRoZSBob2xpZGF5LlxuICAgICAqIFxuICAgICAqIEFjY2VwdHMgYSBgRGF0ZWAgb2JqZWN0IG9yIElTTy1mb3JtYXR0ZWQgc3RyaW5nLlxuICAgICAqSWYgb21pdHRlZCwgdGhlIGhvbGlkYXkgaXMgdHJlYXRlZCBhcyBhIHNpbmdsZS1kYXkgZXZlbnQuXG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdG86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEhvbGlkYXkgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1nYW50dD5lLWhvbGlkYXlzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKEhvbGlkYXlEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgSG9saWRheXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8SG9saWRheXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2hvbGlkYXlzJyk7XG4gICAgfVxufSJdfQ==