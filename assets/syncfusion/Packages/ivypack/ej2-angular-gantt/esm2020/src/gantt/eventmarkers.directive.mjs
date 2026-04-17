import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cssClass', 'day', 'label', 'top'];
let outputs = [];
/**
 * `e-event-markers` directive represent a event marker collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'></e-event-marker>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
export class EventMarkerDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
EventMarkerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkerDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
EventMarkerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EventMarkerDirective, selector: "ejs-gantt>e-event-markers>e-event-marker", inputs: { cssClass: "cssClass", day: "day", label: "label", top: "top" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-event-markers>e-event-marker',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * EventMarker Array Directive
 * @private
 */
export class EventMarkersDirective extends ArrayBase {
    constructor() {
        super('eventmarkers');
    }
}
EventMarkersDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkersDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EventMarkersDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EventMarkersDirective, selector: "ejs-gantt>e-event-markers", queries: [{ propertyName: "children", predicate: EventMarkerDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-event-markers',
                    queries: {
                        children: new ContentChildren(EventMarkerDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRtYXJrZXJzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW50dC9ldmVudG1hcmtlcnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMxRCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7R0FVRztBQVNILE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxXQUFpQztJQThCdkUsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztpSEFuQ1Esb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFSaEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBdUNEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxTQUFnQztJQUN2RTtRQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxQixDQUFDOztrSEFIUSxxQkFBcUI7c0dBQXJCLHFCQUFxQiwwRkFISSxvQkFBb0I7MkZBRzdDLHFCQUFxQjtrQkFOakMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLG9CQUFvQixDQUFDO3FCQUN0RDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY3NzQ2xhc3MnLCAnZGF5JywgJ2xhYmVsJywgJ3RvcCddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIGBlLWV2ZW50LW1hcmtlcnNgIGRpcmVjdGl2ZSByZXByZXNlbnQgYSBldmVudCBtYXJrZXIgY29sbGVjdGlvbiBpbiBHYW50dC4gXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIEdhbnR0IGNvbXBvbmVudChgZWpzLWdhbnR0YCkuIFxuICogYGBgaHRtbFxuICogPGVqcy1nYW50dCBbZGF0YVNvdXJjZV09J2RhdGEnIGFsbG93U2VsZWN0aW9uPSd0cnVlJyBhbGxvd1NvcnRpbmc9J3RydWUnPiBcbiAqICAgPGUtZXZlbnQtbWFya2Vycz5cbiAqICAgICA8ZS1ldmVudC1tYXJrZXIgZGF5PScwMi8xMC8yMDE4JyBsYWJlbD0nUHJvamVjdCBTdGFydHMnPjwvZS1ldmVudC1tYXJrZXI+XG4gKiAgIDwvZS1ldmVudC1tYXJrZXJzPlxuICogPC9lanMtZ2FudHQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS1ldmVudC1tYXJrZXJzPmUtZXZlbnQtbWFya2VyJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRNYXJrZXJEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxFdmVudE1hcmtlckRpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyBhIGN1c3RvbSBDU1MgY2xhc3MgZm9yIHRoZSBldmVudCBtYXJrZXIuIFxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gYXBwbHkgY3VzdG9tIHN0eWxlcyB0byB0aGUgbGluZSBhbmQgbGFiZWwgb2YgdGhlIG1hcmtlci5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGNzc0NsYXNzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgZGF0ZSBvciBkYXkgb2YgdGhlIGV2ZW50IG1hcmtlci4gXG4gICAgICogVGhlIHZhbHVlIGNhbiBiZSBhIGBEYXRlYCBvYmplY3Qgb3IgYSBkYXRlIHN0cmluZy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGRheTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGxhYmVsIGZvciB0aGUgZXZlbnQgbWFya2VyLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgbGFiZWw6IGFueTtcbiAgICAvKiogXG4gICAgICogVmVydGljYWwgb2Zmc2V0IG9mIHRoZSBsYWJlbCBmcm9tIHRoZSB0aW1lbGluZSB0b3AuIFxuICAgICAqIE11c3QgYmUgaW4gcGl4ZWxzIChlLmcuLCAnNTBweCcpLiBJbnZhbGlkIHZhbHVlcyBkZWZhdWx0IHRvICc1MHB4Jy4gXG4gICAgICogTmVnYXRpdmUgdmFsdWVzIGFyZSBub3JtYWxpemVkIHRvICc1MHB4Jy5cbiAgICAgKiBAZGVmYXVsdCAnNTBweCdcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9wOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBFdmVudE1hcmtlciBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtZXZlbnQtbWFya2VycycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihFdmVudE1hcmtlckRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBFdmVudE1hcmtlcnNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8RXZlbnRNYXJrZXJzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdldmVudG1hcmtlcnMnKTtcbiAgICB9XG59Il19