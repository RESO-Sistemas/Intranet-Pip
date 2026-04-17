import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['alignment', 'cornerRadius', 'displacement', 'fill', 'handleStrokeColor', 'handleStrokeWidth', 'height', 'iconStrokeColor', 'iconStrokeWidth', 'id', 'offset', 'padding', 'pathData', 'tooltip', 'visibility', 'width'];
let outputs = [];
/**
 * Connectors Directive
 * ```html
 * <e-connectors>
 * <e-connector>
 * <e-connector-fixeduserhandles>
 * <e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandles>
 * </e-connector>
 * </e-connectors>
 * ```
 */
export class ConnectorFixedUserHandleDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ConnectorFixedUserHandleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorFixedUserHandleDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ConnectorFixedUserHandleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ConnectorFixedUserHandleDirective, selector: "e-connector>e-connector-fixeduserhandles>e-connector-fixeduserhandle", inputs: { alignment: "alignment", cornerRadius: "cornerRadius", displacement: "displacement", fill: "fill", handleStrokeColor: "handleStrokeColor", handleStrokeWidth: "handleStrokeWidth", height: "height", iconStrokeColor: "iconStrokeColor", iconStrokeWidth: "iconStrokeWidth", id: "id", offset: "offset", padding: "padding", pathData: "pathData", tooltip: "tooltip", visibility: "visibility", width: "width" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorFixedUserHandleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-connector>e-connector-fixeduserhandles>e-connector-fixeduserhandle',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * ConnectorFixedUserHandle Array Directive
 * @private
 */
export class ConnectorFixedUserHandlesDirective extends ArrayBase {
    constructor() {
        super('fixeduserhandles');
    }
}
ConnectorFixedUserHandlesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorFixedUserHandlesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ConnectorFixedUserHandlesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ConnectorFixedUserHandlesDirective, selector: "e-connector>e-connector-fixeduserhandles", queries: [{ propertyName: "children", predicate: ConnectorFixedUserHandleDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorFixedUserHandlesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-connector>e-connector-fixeduserhandles',
                    queries: {
                        children: new ContentChildren(ConnectorFixedUserHandleDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLWZpeGVkdXNlcmhhbmRsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlhZ3JhbS9jb25uZWN0b3ItZml4ZWR1c2VyaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvTyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7OztHQVlHO0FBU0gsTUFBTSxPQUFPLGlDQUFrQyxTQUFRLFdBQThDO0lBMEZqRyxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OzhIQS9GUSxpQ0FBaUM7a0hBQWpDLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQVI3QyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxzRUFBc0U7b0JBQ2hGLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUFtR0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGtDQUFtQyxTQUFRLFNBQTZDO0lBQ2pHO1FBQ0ksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsQ0FBQzs7K0hBSFEsa0NBQWtDO21IQUFsQyxrQ0FBa0MseUdBSFQsaUNBQWlDOzJGQUcxRCxrQ0FBa0M7a0JBTjlDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxpQ0FBaUMsQ0FBQztxQkFDbkU7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2FsaWdubWVudCcsICdjb3JuZXJSYWRpdXMnLCAnZGlzcGxhY2VtZW50JywgJ2ZpbGwnLCAnaGFuZGxlU3Ryb2tlQ29sb3InLCAnaGFuZGxlU3Ryb2tlV2lkdGgnLCAnaGVpZ2h0JywgJ2ljb25TdHJva2VDb2xvcicsICdpY29uU3Ryb2tlV2lkdGgnLCAnaWQnLCAnb2Zmc2V0JywgJ3BhZGRpbmcnLCAncGF0aERhdGEnLCAndG9vbHRpcCcsICd2aXNpYmlsaXR5JywgJ3dpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogQ29ubmVjdG9ycyBEaXJlY3RpdmVcbiAqIGBgYGh0bWxcbiAqIDxlLWNvbm5lY3RvcnM+XG4gKiA8ZS1jb25uZWN0b3I+XG4gKiA8ZS1jb25uZWN0b3ItZml4ZWR1c2VyaGFuZGxlcz5cbiAqIDxlLWNvbm5lY3Rvci1maXhlZHVzZXJoYW5kbGU+XG4gKiA8L2UtY29ubmVjdG9yLWZpeGVkdXNlcmhhbmRsZT5cbiAqIDwvZS1jb25uZWN0b3ItZml4ZWR1c2VyaGFuZGxlcz5cbiAqIDwvZS1jb25uZWN0b3I+XG4gKiA8L2UtY29ubmVjdG9ycz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtY29ubmVjdG9yPmUtY29ubmVjdG9yLWZpeGVkdXNlcmhhbmRsZXM+ZS1jb25uZWN0b3ItZml4ZWR1c2VyaGFuZGxlJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdG9yRml4ZWRVc2VySGFuZGxlRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8Q29ubmVjdG9yRml4ZWRVc2VySGFuZGxlRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzZWdtZW50IGFsaWdubWVudCBvZiB0aGUgZml4ZWQgdXNlciBoYW5kbGUgXG4gICAgICogICogQ2VudGVyIC0gQWxpZ25zIHRoZSBhbm5vdGF0aW9uIGF0IHRoZSBjZW50ZXIgb2YgYSBjb25uZWN0b3Igc2VnbWVudCBcbiAgICAgKiAgKiBCZWZvcmUgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gYmVmb3JlIGEgY29ubmVjdG9yIHNlZ21lbnQgXG4gICAgICogICogQWZ0ZXIgLSBBbGlnbnMgdGhlIGFubm90YXRpb24gYWZ0ZXIgYSBjb25uZWN0b3Igc2VnbWVudFxuICAgICAqIEBkZWZhdWx0IENlbnRlclxuICAgICAqL1xuICAgIHB1YmxpYyBhbGlnbm1lbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBjb3JuZXJSYWRpdXMgZm9yIGZpeGVkIHVzZXIgaGFuZGxlIGNvbnRhaW5lclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29ybmVyUmFkaXVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgZGlzcGxhY2VtZW50IG9mIGFuIGZpeGVkIHVzZXIgaGFuZGxlIGZyb20gaXRzIGFjdHVhbCBwb3NpdGlvblxuICAgICAqIEBhc3BkZWZhdWx0dmFsdWVpZ25vcmUgXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICovXG4gICAgcHVibGljIGRpc3BsYWNlbWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGZpbGwgY29sb3Igb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgJ3RyYW5zcGFyZW50J1xuICAgICAqL1xuICAgIHB1YmxpYyBmaWxsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc3Ryb2tlIGNvbG9yIG9mIHRoZSBmaXhlZCB1c2VyIGhhbmRsZSBjb250YWluZXJcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVTdHJva2VDb2xvcjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHN0cm9rZSB3aWR0aCBvZiB0aGUgZml4ZWQgdXNlciBoYW5kbGUgY29udGFpbmVyXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVTdHJva2VXaWR0aDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGhlaWdodCBvZiB0aGUgZml4ZWQgdXNlciBoYW5kbGVcbiAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAqL1xuICAgIHB1YmxpYyBoZWlnaHQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdHJva2UgY29sb3Igb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgJ3RyYW5zcGFyZW50J1xuICAgICAqL1xuICAgIHB1YmxpYyBpY29uU3Ryb2tlQ29sb3I6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdHJva2Ugd2lkdGggb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBpY29uU3Ryb2tlV2lkdGg6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB1bmlxdWUgaWQgb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaWQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29ubmVjdG9yIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgMC41XG4gICAgICovXG4gICAgcHVibGljIG9mZnNldDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHNwYWNlIGJldHdlZW4gdGhlIGZpeGVkIHVzZXIgaGFuZGxlIGFuZCBjb250YWluZXJcbiAgICAgKiBAZGVmYXVsdCBuZXcgTWFyZ2luKDAsMCwwLDApXG4gICAgICovXG4gICAgcHVibGljIHBhZGRpbmc6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzaGFwZSBpbmZvcm1hdGlvbiBmb3IgZml4ZWQgdXNlciBoYW5kbGVcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBwYXRoRGF0YTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBVc2VkIHRvIHNob3cgdG9vbHRpcCBmb3IgZml4ZWQgdXNlciBoYW5kbGUgb24gbW91c2Ugb3Zlci5cbiAgICAgKiBAZGVmYXVsdCB7fVxuICAgICAqL1xuICAgIHB1YmxpYyB0b29sdGlwOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZml4ZWQgdXNlciBoYW5kbGVcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHZpc2liaWxpdHk6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB3aWR0aCBvZiB0aGUgZml4ZWQgdXNlciBoYW5kbGVcbiAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAqL1xuICAgIHB1YmxpYyB3aWR0aDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQ29ubmVjdG9yRml4ZWRVc2VySGFuZGxlIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWNvbm5lY3Rvcj5lLWNvbm5lY3Rvci1maXhlZHVzZXJoYW5kbGVzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKENvbm5lY3RvckZpeGVkVXNlckhhbmRsZURpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0b3JGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPENvbm5lY3RvckZpeGVkVXNlckhhbmRsZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2ZpeGVkdXNlcmhhbmRsZXMnKTtcbiAgICB9XG59Il19