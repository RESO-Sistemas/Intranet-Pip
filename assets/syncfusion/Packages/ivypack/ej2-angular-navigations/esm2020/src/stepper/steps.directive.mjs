import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cssClass', 'disabled', 'iconCss', 'isValid', 'label', 'optional', 'status', 'text'];
let outputs = [];
/**
 * 'e-step' directive represents a step of the Angular Stepper.
 * It must be contained in a Stepper component(`ejs-stepper`).
 * ```html
 * <ejs-stepper>
 *  <e-steps>
 *   <e-step [iconCss]='e-icons e-folder' [text]='Step 1' />
 *   <e-step [iconCss]='e-icons e-folder' [text]='Step 2' />
 *  </e-steps>
 * </ejs-stepper>
 * ```
 */
export class StepDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
StepDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
StepDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StepDirective, selector: "ejs-stepper>e-steps>e-step", inputs: { cssClass: "cssClass", disabled: "disabled", iconCss: "iconCss", isValid: "isValid", label: "label", optional: "optional", status: "status", text: "text" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stepper>e-steps>e-step',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Step Array Directive
 * @private
 */
export class StepsDirective extends ArrayBase {
    constructor() {
        super('steps');
    }
}
StepsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
StepsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StepsDirective, selector: "ejs-stepper>e-steps", queries: [{ propertyName: "children", predicate: StepDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stepper>e-steps',
                    queries: {
                        children: new ContentChildren(StepDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0ZXBwZXIvc3RlcHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUcsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLGFBQWMsU0FBUSxXQUEwQjtJQXdEekQsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzswR0E3RFEsYUFBYTs4RkFBYixhQUFhOzJGQUFiLGFBQWE7a0JBUnpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQWlFRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFNBQXlCO0lBQ3pEO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7OzJHQUhRLGNBQWM7K0ZBQWQsY0FBYyxvRkFIVyxhQUFhOzJGQUd0QyxjQUFjO2tCQU4xQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDO3FCQUMvQztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY3NzQ2xhc3MnLCAnZGlzYWJsZWQnLCAnaWNvbkNzcycsICdpc1ZhbGlkJywgJ2xhYmVsJywgJ29wdGlvbmFsJywgJ3N0YXR1cycsICd0ZXh0J107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogJ2Utc3RlcCcgZGlyZWN0aXZlIHJlcHJlc2VudHMgYSBzdGVwIG9mIHRoZSBBbmd1bGFyIFN0ZXBwZXIuXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIFN0ZXBwZXIgY29tcG9uZW50KGBlanMtc3RlcHBlcmApLiBcbiAqIGBgYGh0bWxcbiAqIDxlanMtc3RlcHBlcj5cbiAqICA8ZS1zdGVwcz5cbiAqICAgPGUtc3RlcCBbaWNvbkNzc109J2UtaWNvbnMgZS1mb2xkZXInIFt0ZXh0XT0nU3RlcCAxJyAvPlxuICogICA8ZS1zdGVwIFtpY29uQ3NzXT0nZS1pY29ucyBlLWZvbGRlcicgW3RleHRdPSdTdGVwIDInIC8+XG4gKiAgPC9lLXN0ZXBzPiBcbiAqIDwvZWpzLXN0ZXBwZXI+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtc3RlcHBlcj5lLXN0ZXBzPmUtc3RlcCcsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxTdGVwRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgQ1NTIGNsYXNzIHRvIGN1c3RvbWl6ZSB0aGUgc3RlcCBhcHBlYXJhbmNlLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGNzc0NsYXNzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgd2hldGhlciBhIHN0ZXAgaXMgZW5hYmxlZCBvciBkaXNhYmxlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNhYmxlZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBpY29uIGNvbnRlbnQgb2YgdGhlIHN0ZXAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaWNvbkNzczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBzdGF0ZSB3aGV0aGVyIGl0IGlzIHZhbGlkIGNvbXBsZXRpb24gb3Igbm90LiBcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIGNvbXBsZXRpb24gaXMgdmFsaWQuIFxuICAgICAqIElmIGZhbHNlLCB0aGUgY29tcGxldGlvbiBpcyBpbnZhbGlkLiBcbiAgICAgKiBJZiBudWxsLCB0aGUgY29tcGxldGlvbiBzdGF0ZSBpcyBub3QgZGV0ZXJtaW5lZC5cbiAgICAgKiBAYXNwdHlwZSBib29sP1xuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNWYWxpZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBsYWJlbCBjb250ZW50IG9mIHRoZSBzdGVwLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGxhYmVsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGUgc3RlcCBpcyBvcHRpb25hbGx5IHRvIHNraXAgY29tcGxldGlvbiBvciBub3QuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgb3B0aW9uYWw6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgc3RhdHVzIG9mIHRoZSBzdGVwLiBcbiAgICAgKiBUaGUgcG9zc2libGUgdmFsdWVzIGFyZSBcbiAgICAgKiAqIE5vdFN0YXJ0ZWQgXG4gICAgICogKiBJblByb2dyZXNzIFxuICAgICAqICogQ29tcGxldGVkXG4gICAgICogQGlzZW51bWVyYXRpb24gdHJ1ZVxuICAgICAqIEBkZWZhdWx0IFN0ZXBTdGF0dXMuTm90U3RhcnRlZFxuICAgICAqIEBhc3B0eXBlIFN0ZXBTdGF0dXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdHVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHRleHQgY29udGVudCBvZiB0aGUgc3RlcC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyB0ZXh0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBTdGVwIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtc3RlcHBlcj5lLXN0ZXBzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFN0ZXBEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU3RlcHNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8U3RlcHNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3N0ZXBzJyk7XG4gICAgfVxufSJdfQ==