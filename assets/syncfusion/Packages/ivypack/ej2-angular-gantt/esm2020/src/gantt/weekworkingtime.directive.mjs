import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['dayOfWeek', 'timeRange'];
let outputs = [];
/**
 * `e-week-working-times` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-week-working-times>
 *     <e-week-working-time dayOfWeek='Monday'></e-week-working-time>
 *     <e-week-working-time dayOfWeek='Monday'></e-week-working-time>
 *   </e-week-working-times>
 * </ejs-gantt>
 * ```
 */
export class WeekWorkingTimeDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
WeekWorkingTimeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
WeekWorkingTimeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: WeekWorkingTimeDirective, selector: "ejs-gantt>e-week-working-times>e-week-working-time", inputs: { dayOfWeek: "dayOfWeek", timeRange: "timeRange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-week-working-times>e-week-working-time',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * WeekWorkingTime Array Directive
 * @private
 */
export class WeekWorkingTimesDirective extends ArrayBase {
    constructor() {
        super('weekworkingtime');
    }
}
WeekWorkingTimesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
WeekWorkingTimesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: WeekWorkingTimesDirective, selector: "ejs-gantt>e-week-working-times", queries: [{ propertyName: "children", predicate: WeekWorkingTimeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-week-working-times',
                    queries: {
                        children: new ContentChildren(WeekWorkingTimeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla3dvcmtpbmd0aW1lLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW50dC93ZWVrd29ya2luZ3RpbWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDakQsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQXFDO0lBa0IvRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O3FIQXZCUSx3QkFBd0I7eUdBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQVJwQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxvREFBb0Q7b0JBQzlELE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUEyQkQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFNBQW9DO0lBQy9FO1FBQ0ksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDN0IsQ0FBQzs7c0hBSFEseUJBQXlCOzBHQUF6Qix5QkFBeUIsK0ZBSEEsd0JBQXdCOzJGQUdqRCx5QkFBeUI7a0JBTnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDMUQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2RheU9mV2VlaycsICd0aW1lUmFuZ2UnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBgZS13ZWVrLXdvcmtpbmctdGltZXNgIGRpcmVjdGl2ZSByZXByZXNlbnQgYSB3b3JraW5nIHRpbWUgcmFuZ2VzIGluIGEgZGF5LiBcbiAqIEl0IG11c3QgYmUgY29udGFpbmVkIGluIGEgR2FudHQgY29tcG9uZW50KGBlanMtZ2FudHRgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdhbnR0IFtkYXRhU291cmNlXT0nZGF0YScgYWxsb3dTZWxlY3Rpb249J3RydWUnIGFsbG93U29ydGluZz0ndHJ1ZSc+IFxuICogICA8ZS13ZWVrLXdvcmtpbmctdGltZXM+XG4gKiAgICAgPGUtd2Vlay13b3JraW5nLXRpbWUgZGF5T2ZXZWVrPSdNb25kYXknPjwvZS13ZWVrLXdvcmtpbmctdGltZT5cbiAqICAgICA8ZS13ZWVrLXdvcmtpbmctdGltZSBkYXlPZldlZWs9J01vbmRheSc+PC9lLXdlZWstd29ya2luZy10aW1lPlxuICogICA8L2Utd2Vlay13b3JraW5nLXRpbWVzPlxuICogPC9lanMtZ2FudHQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS13ZWVrLXdvcmtpbmctdGltZXM+ZS13ZWVrLXdvcmtpbmctdGltZScsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFdlZWtXb3JraW5nVGltZURpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPFdlZWtXb3JraW5nVGltZURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGRheSBvZiB0aGUgd2VlayB0byBhcHBseSBjdXN0b21pemVkIHdvcmtpbmcgdGltZS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGRheU9mV2VlazogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB0aW1lIHJhbmdlIGZvciBlYWNoIGRheSBvZiB0aGUgd2Vlay5cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqIEBhc3B0eXBlIExpc3Q8R2FudHREYXlXb3JraW5nVGltZT5cblxuICAgICAqL1xuICAgIHB1YmxpYyB0aW1lUmFuZ2U6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFdlZWtXb3JraW5nVGltZSBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtd2Vlay13b3JraW5nLXRpbWVzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFdlZWtXb3JraW5nVGltZURpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBXZWVrV29ya2luZ1RpbWVzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFdlZWtXb3JraW5nVGltZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3dlZWt3b3JraW5ndGltZScpO1xuICAgIH1cbn0iXX0=