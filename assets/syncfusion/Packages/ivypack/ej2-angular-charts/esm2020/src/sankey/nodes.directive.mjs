import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['color', 'id', 'label', 'offset'];
let outputs = [];
/**
 * Sankey Nodes Directive
 * ```html
 * <e-sankey-nodes>
 * <e-sankey-node></e-sankey-node>
 * </e-sankey-nodes>
 * ```
 */
export class SankeyNodeDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
SankeyNodeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyNodeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
SankeyNodeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SankeyNodeDirective, selector: "e-sankey-nodes>e-sankey-node", inputs: { color: "color", id: "id", label: "label", offset: "offset" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyNodeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-sankey-nodes>e-sankey-node',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * SankeyNode Array Directive
 * @private
 */
export class SankeyNodesCollectionDirective extends ArrayBase {
    constructor() {
        super('nodes');
    }
}
SankeyNodesCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyNodesCollectionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SankeyNodesCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SankeyNodesCollectionDirective, selector: "ejs-sankey>e-sankey-nodes", queries: [{ propertyName: "children", predicate: SankeyNodeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyNodesCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-sankey>e-sankey-nodes',
                    queries: {
                        children: new ContentChildren(SankeyNodeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NhbmtleS9ub2Rlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pELElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7OztHQU9HO0FBU0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFdBQWdDO0lBNEJyRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O2dIQWpDUSxtQkFBbUI7b0dBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQVIvQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUFxQ0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLDhCQUErQixTQUFRLFNBQXlDO0lBQ3pGO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7OzJIQUhRLDhCQUE4QjsrR0FBOUIsOEJBQThCLDBGQUhMLG1CQUFtQjsyRkFHNUMsOEJBQThCO2tCQU4xQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUM7cUJBQ3JEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb2xvcicsICdpZCcsICdsYWJlbCcsICdvZmZzZXQnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBTYW5rZXkgTm9kZXMgRGlyZWN0aXZlXG4gKiBgYGBodG1sXG4gKiA8ZS1zYW5rZXktbm9kZXM+XG4gKiA8ZS1zYW5rZXktbm9kZT48L2Utc2Fua2V5LW5vZGU+XG4gKiA8L2Utc2Fua2V5LW5vZGVzPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1zYW5rZXktbm9kZXM+ZS1zYW5rZXktbm9kZScsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNhbmtleU5vZGVEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxTYW5rZXlOb2RlRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBjb2xvciBhcHBsaWVkIHRvIHRoZSBub2RlLiBcbiAgICAgKiBUaGUgbm9kZSBjb2xvciBpcyBhcHBsaWVkIGJhc2VkIG9uIHRoZSBjdXJyZW50IHRoZW1lIGlmIHRoaXMgcHJvcGVydHkgaXMgbm90IHNwZWNpZmllZC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEEgdW5pcXVlIHN0cmluZyBpZGVudGlmaWVyIGZvciB0aGUgbm9kZS4gXG4gICAgICogRW5zdXJlIHRoZSBgaWRgIGlzIHVuaXF1ZSBhY3Jvc3MgYWxsIG5vZGVzIGluIHRoZSBTYW5rZXkgY2hhcnQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgZGF0YSBsYWJlbCBvZiB0aGUgU2Fua2V5IG5vZGUuXG4gICAgICovXG4gICAgcHVibGljIGxhYmVsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyBhIGN1c3RvbSBvZmZzZXQgcG9zaXRpb24gZm9yIHRoZSBub2RlLiBcbiAgICAgKiBUaGlzIGFsbG93cyBzaGlmdGluZyB0aGUgbm9kZSBob3Jpem9udGFsbHkgKGluIEhvcml6b250YWwgb3JpZW50YXRpb24pIG9yIHZlcnRpY2FsbHkgKGluIFZlcnRpY2FsIG9yaWVudGF0aW9uKSwgcmVsYXRpdmUgdG8gaXRzIGNvbXB1dGVkIGxheW91dCBwb3NpdGlvbi5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIG9mZnNldDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogU2Fua2V5Tm9kZSBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXNhbmtleT5lLXNhbmtleS1ub2RlcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihTYW5rZXlOb2RlRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNhbmtleU5vZGVzQ29sbGVjdGlvbkRpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxTYW5rZXlOb2Rlc0NvbGxlY3Rpb25EaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ25vZGVzJyk7XG4gICAgfVxufSJdfQ==