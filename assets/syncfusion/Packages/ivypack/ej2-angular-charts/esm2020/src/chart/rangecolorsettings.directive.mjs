import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['colors', 'end', 'label', 'start'];
let outputs = [];
/**
 * RangeColorSetting Directive
 * ```html
 * <e-rangeColorSettings><e-rangeColorSetting></e-rangeColorSetting><e-rangeColorSettings>
 * ```
 */
export class RangeColorSettingDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RangeColorSettingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorSettingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RangeColorSettingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeColorSettingDirective, selector: "e-rangecolorsettings>e-rangecolorsetting", inputs: { colors: "colors", end: "end", label: "label", start: "start" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorSettingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-rangecolorsettings>e-rangecolorsetting',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RangeColorSetting Array Directive
 * @private
 */
export class RangeColorSettingsDirective extends ArrayBase {
    constructor() {
        super('rangecolorsettings');
    }
}
RangeColorSettingsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorSettingsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RangeColorSettingsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeColorSettingsDirective, selector: "ejs-chart>e-rangecolorsettings", queries: [{ propertyName: "children", predicate: RangeColorSettingDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorSettingsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chart>e-rangecolorsettings',
                    queries: {
                        children: new ContentChildren(RangeColorSettingDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Vjb2xvcnNldHRpbmdzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jaGFydC9yYW5nZWNvbG9yc2V0dGluZ3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7O0dBS0c7QUFTSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsV0FBdUM7SUFzQm5GLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7dUhBM0JRLDBCQUEwQjsyR0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBUnRDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQStCRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsU0FBc0M7SUFDbkY7UUFDSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNoQyxDQUFDOzt3SEFIUSwyQkFBMkI7NEdBQTNCLDJCQUEyQiwrRkFIRiwwQkFBMEI7MkZBR25ELDJCQUEyQjtrQkFOdkMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLDBCQUEwQixDQUFDO3FCQUM1RDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY29sb3JzJywgJ2VuZCcsICdsYWJlbCcsICdzdGFydCddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIFJhbmdlQ29sb3JTZXR0aW5nIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtcmFuZ2VDb2xvclNldHRpbmdzPjxlLXJhbmdlQ29sb3JTZXR0aW5nPjwvZS1yYW5nZUNvbG9yU2V0dGluZz48ZS1yYW5nZUNvbG9yU2V0dGluZ3M+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJhbmdlY29sb3JzZXR0aW5ncz5lLXJhbmdlY29sb3JzZXR0aW5nJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VDb2xvclNldHRpbmdEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxSYW5nZUNvbG9yU2V0dGluZ0RpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgZmlsbCBjb2xvcnMgZm9yIHBvaW50cyB0aGF0IGxpZSB3aXRoaW4gdGhlIGdpdmVuIHJhbmdlLiBJZiBtdWx0aXBsZSBjb2xvcnMgYXJlIHNwZWNpZmllZCwgYSBncmFkaWVudCB3aWxsIGJlIGFwcGxpZWQuXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGVuZCB2YWx1ZSBvZiB0aGUgY29sb3IgbWFwcGluZyByYW5nZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZW5kOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbmFtZSBvciBsYWJlbCBmb3IgdGhlIHJhbmdlIG1hcHBpbmcgaXRlbS5cbiAgICAgKi9cbiAgICBwdWJsaWMgbGFiZWw6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdGFydCB2YWx1ZSBvZiB0aGUgY29sb3IgbWFwcGluZyByYW5nZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFJhbmdlQ29sb3JTZXR0aW5nIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtY2hhcnQ+ZS1yYW5nZWNvbG9yc2V0dGluZ3MnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oUmFuZ2VDb2xvclNldHRpbmdEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VDb2xvclNldHRpbmdzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFJhbmdlQ29sb3JTZXR0aW5nc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigncmFuZ2Vjb2xvcnNldHRpbmdzJyk7XG4gICAgfVxufSJdfQ==