import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['from', 'to'];
let outputs = [];
/**
 * `e-day-working-time-collection` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-day-working-time-collection>
 *     <e-day-working-time from='8' to='12'></e-day-working-time>
 *     <e-day-working-time from='13' to='17'></e-day-working-time>
 *   </e-day-working-time-collection>
 * </ejs-gantt>
 * ```
 */
export class DayWorkingTimeDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
DayWorkingTimeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
DayWorkingTimeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: DayWorkingTimeDirective, selector: "ejs-gantt>e-day-working-time-collection>e-day-working-time", inputs: { from: "from", to: "to" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-day-working-time-collection>e-day-working-time',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * DayWorkingTime Array Directive
 * @private
 */
export class DayWorkingTimeCollectionDirective extends ArrayBase {
    constructor() {
        super('dayworkingtime');
    }
}
DayWorkingTimeCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeCollectionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
DayWorkingTimeCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: DayWorkingTimeCollectionDirective, selector: "ejs-gantt>e-day-working-time-collection", queries: [{ propertyName: "children", predicate: DayWorkingTimeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-day-working-time-collection',
                    queries: {
                        children: new ContentChildren(DayWorkingTimeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5d29ya2luZ3RpbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbnR0L2RheXdvcmtpbmd0aW1lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxXQUFvQztJQWdCN0UsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztvSEFyQlEsdUJBQXVCO3dHQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFSbkMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsNERBQTREO29CQUN0RSxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBeUJEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxpQ0FBa0MsU0FBUSxTQUE0QztJQUMvRjtRQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVCLENBQUM7OzhIQUhRLGlDQUFpQztrSEFBakMsaUNBQWlDLHdHQUhSLHVCQUF1QjsyRkFHaEQsaUNBQWlDO2tCQU43QyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx5Q0FBeUM7b0JBQ25ELE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsdUJBQXVCLENBQUM7cUJBQ3pEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydmcm9tJywgJ3RvJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtZGF5LXdvcmtpbmctdGltZS1jb2xsZWN0aW9uYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgd29ya2luZyB0aW1lIHJhbmdlcyBpbiBhIGRheS4gXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIEdhbnR0IGNvbXBvbmVudChgZWpzLWdhbnR0YCkuIFxuICogYGBgaHRtbFxuICogPGVqcy1nYW50dCBbZGF0YVNvdXJjZV09J2RhdGEnIGFsbG93U2VsZWN0aW9uPSd0cnVlJyBhbGxvd1NvcnRpbmc9J3RydWUnPiBcbiAqICAgPGUtZGF5LXdvcmtpbmctdGltZS1jb2xsZWN0aW9uPlxuICogICAgIDxlLWRheS13b3JraW5nLXRpbWUgZnJvbT0nOCcgdG89JzEyJz48L2UtZGF5LXdvcmtpbmctdGltZT5cbiAqICAgICA8ZS1kYXktd29ya2luZy10aW1lIGZyb209JzEzJyB0bz0nMTcnPjwvZS1kYXktd29ya2luZy10aW1lPlxuICogICA8L2UtZGF5LXdvcmtpbmctdGltZS1jb2xsZWN0aW9uPlxuICogPC9lanMtZ2FudHQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS1kYXktd29ya2luZy10aW1lLWNvbGxlY3Rpb24+ZS1kYXktd29ya2luZy10aW1lJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF5V29ya2luZ1RpbWVEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxEYXlXb3JraW5nVGltZURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHdvcmtpbmcgdGltZSByYW5nZSBmb3IgdGhlIGRheS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGZyb206IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgZW5kIHRpbWUgb2YgdGhlIHdvcmtpbmcgdGltZSByYW5nZSBmb3IgdGhlIGRheS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIHRvOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBEYXlXb3JraW5nVGltZSBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtZGF5LXdvcmtpbmctdGltZS1jb2xsZWN0aW9uJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKERheVdvcmtpbmdUaW1lRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIERheVdvcmtpbmdUaW1lQ29sbGVjdGlvbkRpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxEYXlXb3JraW5nVGltZUNvbGxlY3Rpb25EaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2RheXdvcmtpbmd0aW1lJyk7XG4gICAgfVxufSJdfQ==