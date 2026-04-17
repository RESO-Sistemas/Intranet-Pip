import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['point', 'series'];
let outputs = [];
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export class CircularChart3DSelectedDataIndexDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
CircularChart3DSelectedDataIndexDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CircularChart3DSelectedDataIndexDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
CircularChart3DSelectedDataIndexDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: CircularChart3DSelectedDataIndexDirective, selector: "e-circularchart3d-selecteddataindexes>e-circularchart3d-selecteddataindex", inputs: { point: "point", series: "series" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CircularChart3DSelectedDataIndexDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-circularchart3d-selecteddataindexes>e-circularchart3d-selecteddataindex',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * CircularChart3DSelectedDataIndex Array Directive
 * @private
 */
export class CircularChart3DSelectedDataIndexesDirective extends ArrayBase {
    constructor() {
        super('selecteddataindexes');
    }
}
CircularChart3DSelectedDataIndexesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CircularChart3DSelectedDataIndexesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CircularChart3DSelectedDataIndexesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: CircularChart3DSelectedDataIndexesDirective, selector: "ejs-circularchart3d>e-circularchart3d-selecteddataindexes", queries: [{ propertyName: "children", predicate: CircularChart3DSelectedDataIndexDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CircularChart3DSelectedDataIndexesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-circularchart3d>e-circularchart3d-selecteddataindexes',
                    queries: {
                        children: new ContentChildren(CircularChart3DSelectedDataIndexDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWRkYXRhaW5kZXhlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2lyY3VsYXJjaGFydDNkL3NlbGVjdGVkZGF0YWluZGV4ZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUMsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7OztHQUtHO0FBU0gsTUFBTSxPQUFPLHlDQUEwQyxTQUFRLFdBQXNEO0lBa0JqSCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O3NJQXZCUSx5Q0FBeUM7MEhBQXpDLHlDQUF5QzsyRkFBekMseUNBQXlDO2tCQVJyRCxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwyRUFBMkU7b0JBQ3JGLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUEyQkQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLDJDQUE0QyxTQUFRLFNBQXNEO0lBQ25IO1FBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDakMsQ0FBQzs7d0lBSFEsMkNBQTJDOzRIQUEzQywyQ0FBMkMsMEhBSGxCLHlDQUF5QzsyRkFHbEUsMkNBQTJDO2tCQU52RCxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwyREFBMkQ7b0JBQ3JFLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMseUNBQXlDLENBQUM7cUJBQzNFO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydwb2ludCcsICdzZXJpZXMnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBTZWxlY3RlZCBEYXRhIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtc2VsZWN0ZWRkYXRhaW5kZXhlcz48ZS1zZWxlY3RlZGRhdGFpbmRleD48L2Utc2VsZWN0ZWRkYXRhaW5kZXg+PGUtc2VsZWN0ZWRkYXRhaW5kZXhlcz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtY2lyY3VsYXJjaGFydDNkLXNlbGVjdGVkZGF0YWluZGV4ZXM+ZS1jaXJjdWxhcmNoYXJ0M2Qtc2VsZWN0ZWRkYXRhaW5kZXgnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDaXJjdWxhckNoYXJ0M0RTZWxlY3RlZERhdGFJbmRleERpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPENpcmN1bGFyQ2hhcnQzRFNlbGVjdGVkRGF0YUluZGV4RGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbmRleCBvZiB0aGUgZGF0YSBwb2ludCB3aXRoaW4gdGhlIHNlcmllcy5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICogQGFzcHR5cGUgaW50XG4gICAgICovXG4gICAgcHVibGljIHBvaW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgaW5kZXggb2YgdGhlIHNlcmllcy5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICogQGFzcHR5cGUgaW50XG4gICAgICovXG4gICAgcHVibGljIHNlcmllczogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQ2lyY3VsYXJDaGFydDNEU2VsZWN0ZWREYXRhSW5kZXggQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1jaXJjdWxhcmNoYXJ0M2Q+ZS1jaXJjdWxhcmNoYXJ0M2Qtc2VsZWN0ZWRkYXRhaW5kZXhlcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihDaXJjdWxhckNoYXJ0M0RTZWxlY3RlZERhdGFJbmRleERpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDaXJjdWxhckNoYXJ0M0RTZWxlY3RlZERhdGFJbmRleGVzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPENpcmN1bGFyQ2hhcnQzRFNlbGVjdGVkRGF0YUluZGV4ZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3NlbGVjdGVkZGF0YWluZGV4ZXMnKTtcbiAgICB9XG59Il19