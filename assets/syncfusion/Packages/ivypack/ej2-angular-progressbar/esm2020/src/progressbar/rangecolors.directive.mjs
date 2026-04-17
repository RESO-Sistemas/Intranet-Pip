import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['color', 'end', 'start'];
let outputs = [];
export class RangeColorDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RangeColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RangeColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeColorDirective, selector: "e-rangecolors>e-rangecolor", inputs: { color: "color", end: "end", start: "start" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-rangecolors>e-rangecolor',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RangeColor Array Directive
 * @private
 */
export class RangeColorsDirective extends ArrayBase {
    constructor() {
        super('rangecolors');
    }
}
RangeColorsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RangeColorsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeColorsDirective, selector: "ejs-progressbar>e-rangecolors", queries: [{ propertyName: "children", predicate: RangeColorDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-progressbar>e-rangecolors',
                    queries: {
                        children: new ContentChildren(RangeColorDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Vjb2xvcnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3JhbmdlY29sb3JzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFVM0IsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFdBQWdDO0lBcUJyRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O2dIQTFCUSxtQkFBbUI7b0dBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQVIvQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUE4QkQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFNBQStCO0lBQ3JFO1FBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2lIQUhRLG9CQUFvQjtxR0FBcEIsb0JBQW9CLDhGQUhLLG1CQUFtQjsyRkFHNUMsb0JBQW9CO2tCQU5oQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUM7cUJBQ3JEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb2xvcicsICdlbmQnLCAnc3RhcnQnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtcmFuZ2Vjb2xvcnM+ZS1yYW5nZWNvbG9yJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VDb2xvckRpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPFJhbmdlQ29sb3JEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBjb2xvclxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sb3I6IGFueTtcbiAgICAvKiogXG4gICAgICogZW5kXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBlbmQ6IGFueTtcbiAgICAvKiogXG4gICAgICogc3RhcnRcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSYW5nZUNvbG9yIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtcHJvZ3Jlc3NiYXI+ZS1yYW5nZWNvbG9ycycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihSYW5nZUNvbG9yRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlQ29sb3JzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFJhbmdlQ29sb3JzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdyYW5nZWNvbG9ycycpO1xuICAgIH1cbn0iXX0=