import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cornerRadius', 'fill', 'handleStrokeColor', 'handleStrokeWidth', 'height', 'iconStrokeColor', 'iconStrokeWidth', 'id', 'margin', 'offset', 'padding', 'pathData', 'tooltip', 'visibility', 'width'];
let outputs = [];
/**
 * Nodes Directive
 * ```html
 * <e-nodes>
 * <e-node>
 * <e-node-fixeduserhandles>
 * <e-node-fixeduserhandle>
 * </e-node-fixeduserhandle>
 * </e-node-fixeduserhandles>
 * </e-node>
 * </e-nodes>
 * ```
 */
export class NodeFixedUserHandleDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
NodeFixedUserHandleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NodeFixedUserHandleDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NodeFixedUserHandleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NodeFixedUserHandleDirective, selector: "e-node>e-node-fixeduserhandles>e-node-fixeduserhandle", inputs: { cornerRadius: "cornerRadius", fill: "fill", handleStrokeColor: "handleStrokeColor", handleStrokeWidth: "handleStrokeWidth", height: "height", iconStrokeColor: "iconStrokeColor", iconStrokeWidth: "iconStrokeWidth", id: "id", margin: "margin", offset: "offset", padding: "padding", pathData: "pathData", tooltip: "tooltip", visibility: "visibility", width: "width" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NodeFixedUserHandleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-node>e-node-fixeduserhandles>e-node-fixeduserhandle',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * NodeFixedUserHandle Array Directive
 * @private
 */
export class NodeFixedUserHandlesDirective extends ArrayBase {
    constructor() {
        super('fixeduserhandles');
    }
}
NodeFixedUserHandlesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NodeFixedUserHandlesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NodeFixedUserHandlesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NodeFixedUserHandlesDirective, selector: "e-node>e-node-fixeduserhandles", queries: [{ propertyName: "children", predicate: NodeFixedUserHandleDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NodeFixedUserHandlesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-node>e-node-fixeduserhandles',
                    queries: {
                        children: new ContentChildren(NodeFixedUserHandleDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1maXhlZHVzZXJoYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpYWdyYW0vbm9kZS1maXhlZHVzZXJoYW5kbGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNU4sSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7Ozs7R0FZRztBQVNILE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxXQUF5QztJQWlGdkYsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzt5SEF0RlEsNEJBQTRCOzZHQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFSeEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsdURBQXVEO29CQUNqRSxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBMEZEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxTQUF3QztJQUN2RjtRQUNJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLENBQUM7OzBIQUhRLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLCtGQUhKLDRCQUE0QjsyRkFHckQsNkJBQTZCO2tCQU56QyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsNEJBQTRCLENBQUM7cUJBQzlEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb3JuZXJSYWRpdXMnLCAnZmlsbCcsICdoYW5kbGVTdHJva2VDb2xvcicsICdoYW5kbGVTdHJva2VXaWR0aCcsICdoZWlnaHQnLCAnaWNvblN0cm9rZUNvbG9yJywgJ2ljb25TdHJva2VXaWR0aCcsICdpZCcsICdtYXJnaW4nLCAnb2Zmc2V0JywgJ3BhZGRpbmcnLCAncGF0aERhdGEnLCAndG9vbHRpcCcsICd2aXNpYmlsaXR5JywgJ3dpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogTm9kZXMgRGlyZWN0aXZlXG4gKiBgYGBodG1sXG4gKiA8ZS1ub2Rlcz5cbiAqIDxlLW5vZGU+XG4gKiA8ZS1ub2RlLWZpeGVkdXNlcmhhbmRsZXM+XG4gKiA8ZS1ub2RlLWZpeGVkdXNlcmhhbmRsZT5cbiAqIDwvZS1ub2RlLWZpeGVkdXNlcmhhbmRsZT5cbiAqIDwvZS1ub2RlLWZpeGVkdXNlcmhhbmRsZXM+XG4gKiA8L2Utbm9kZT5cbiAqIDwvZS1ub2Rlcz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Utbm9kZT5lLW5vZGUtZml4ZWR1c2VyaGFuZGxlcz5lLW5vZGUtZml4ZWR1c2VyaGFuZGxlJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTm9kZUZpeGVkVXNlckhhbmRsZURpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPE5vZGVGaXhlZFVzZXJIYW5kbGVEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGNvcm5lclJhZGl1cyBmb3IgZml4ZWQgdXNlciBoYW5kbGUgY29udGFpbmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBjb3JuZXJSYWRpdXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBmaWxsIGNvbG9yIG9mIHRoZSBmaXhlZCB1c2VyIGhhbmRsZVxuICAgICAqIEBkZWZhdWx0ICd0cmFuc3BhcmVudCdcbiAgICAgKi9cbiAgICBwdWJsaWMgZmlsbDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHN0cm9rZSBjb2xvciBvZiB0aGUgZml4ZWQgdXNlciBoYW5kbGUgY29udGFpbmVyXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlU3Ryb2tlQ29sb3I6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzdHJva2Ugd2lkdGggb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlIGNvbnRhaW5lclxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlU3Ryb2tlV2lkdGg6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBoZWlnaHQgb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgMTBcbiAgICAgKi9cbiAgICBwdWJsaWMgaGVpZ2h0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc3Ryb2tlIGNvbG9yIG9mIHRoZSBmaXhlZCB1c2VyIGhhbmRsZVxuICAgICAqIEBkZWZhdWx0ICd0cmFuc3BhcmVudCdcbiAgICAgKi9cbiAgICBwdWJsaWMgaWNvblN0cm9rZUNvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc3Ryb2tlIHdpZHRoIG9mIHRoZSBmaXhlZCB1c2VyIGhhbmRsZVxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgaWNvblN0cm9rZVdpZHRoOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdW5pcXVlIGlkIG9mIHRoZSBmaXhlZCB1c2VyIGhhbmRsZVxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGlkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc3BhY2UgdGhhdCB0aGUgZml4ZWQgdXNlciBoYW5kbGUgaGFzIHRvIGJlIG1vdmVkIGZyb20gaXRzIGFjdHVhbCBwb3NpdGlvblxuICAgICAqIEBkZWZhdWx0IG5ldyBNYXJnaW4oMCwwLDAsMClcbiAgICAgKi9cbiAgICBwdWJsaWMgbWFyZ2luOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgcG9zaXRpb24gb2YgdGhlIG5vZGUgZml4ZWQgdXNlciBoYW5kbGVcbiAgICAgKiBAZGVmYXVsdCB7IHg6IDAsIHk6IDAgfVxuICAgICAqL1xuICAgIHB1YmxpYyBvZmZzZXQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBzcGFjZSBiZXR3ZWVuIHRoZSBmaXhlZCB1c2VyIGhhbmRsZSBhbmQgY29udGFpbmVyXG4gICAgICogQGRlZmF1bHQgbmV3IE1hcmdpbigwLDAsMCwwKVxuICAgICAqL1xuICAgIHB1YmxpYyBwYWRkaW5nOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc2hhcGUgaW5mb3JtYXRpb24gZm9yIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgcGF0aERhdGE6IGFueTtcbiAgICAvKiogXG4gICAgICogVXNlZCB0byBzaG93IHRvb2x0aXAgZm9yIGZpeGVkIHVzZXIgaGFuZGxlIG9uIG1vdXNlIG92ZXIuXG4gICAgICogQGRlZmF1bHQge31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9vbHRpcDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmlsaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgd2lkdGggb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgMTBcbiAgICAgKi9cbiAgICBwdWJsaWMgd2lkdGg6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIE5vZGVGaXhlZFVzZXJIYW5kbGUgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Utbm9kZT5lLW5vZGUtZml4ZWR1c2VyaGFuZGxlcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihOb2RlRml4ZWRVc2VySGFuZGxlRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vZGVGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPE5vZGVGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdmaXhlZHVzZXJoYW5kbGVzJyk7XG4gICAgfVxufSJdfQ==