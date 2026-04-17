import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['sourceId', 'targetId', 'value'];
let outputs = [];
/**
 * Sankey Links Directive
 * ```html
 * <e-sankey-links>
 * <e-sankey-link></e-sankey-link>
 * </e-sankey-links>
 * ```
 */
export class SankeyLinkDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
SankeyLinkDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyLinkDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
SankeyLinkDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SankeyLinkDirective, selector: "e-sankey-links>e-sankey-link", inputs: { sourceId: "sourceId", targetId: "targetId", value: "value" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-sankey-links>e-sankey-link',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * SankeyLink Array Directive
 * @private
 */
export class SankeyLinksCollectionDirective extends ArrayBase {
    constructor() {
        super('links');
    }
}
SankeyLinksCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyLinksCollectionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SankeyLinksCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SankeyLinksCollectionDirective, selector: "ejs-sankey>e-sankey-links", queries: [{ propertyName: "children", predicate: SankeyLinkDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyLinksCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-sankey>e-sankey-links',
                    queries: {
                        children: new ContentChildren(SankeyLinkDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NhbmtleS9saW5rcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7O0dBT0c7QUFTSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsV0FBZ0M7SUF5QnJFLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7Z0hBOUJRLG1CQUFtQjtvR0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBUi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQWtDRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sOEJBQStCLFNBQVEsU0FBeUM7SUFDekY7UUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQzs7MkhBSFEsOEJBQThCOytHQUE5Qiw4QkFBOEIsMEZBSEwsbUJBQW1COzJGQUc1Qyw4QkFBOEI7a0JBTjFDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQztxQkFDckQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ3NvdXJjZUlkJywgJ3RhcmdldElkJywgJ3ZhbHVlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogU2Fua2V5IExpbmtzIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtc2Fua2V5LWxpbmtzPlxuICogPGUtc2Fua2V5LWxpbms+PC9lLXNhbmtleS1saW5rPlxuICogPC9lLXNhbmtleS1saW5rcz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Utc2Fua2V5LWxpbmtzPmUtc2Fua2V5LWxpbmsnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTYW5rZXlMaW5rRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8U2Fua2V5TGlua0RpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIHNvdXJjZSBub2RlIGZvciB0aGlzIFxuICAgICAqIGxpbmsuIFxuICAgICAqIFRoaXMgc2hvdWxkIG1hdGNoIHRoZSBgaWRgIG9mIGFuIGV4aXN0aW5nIFNhbmtleSBub2RlLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgc291cmNlSWQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgdGFyZ2V0IG5vZGUgZm9yIHRoaXMgbGluay4gXG4gICAgICogVGhpcyBzaG91bGQgbWF0Y2ggdGhlIGBpZGAgb2YgYW4gZXhpc3RpbmcgU2Fua2V5IG5vZGUuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB0YXJnZXRJZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB3ZWlnaHQgb3IgdmFsdWUgb2YgdGhlIGxpbmsuIFxuICAgICAqIFRoaXMgZGV0ZXJtaW5lcyB0aGUgdGhpY2tuZXNzIG9mIHRoZSBsaW5rIGluIHRoZSBTYW5rZXkgZGlhZ3JhbS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIHZhbHVlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBTYW5rZXlMaW5rIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtc2Fua2V5PmUtc2Fua2V5LWxpbmtzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFNhbmtleUxpbmtEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU2Fua2V5TGlua3NDb2xsZWN0aW9uRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFNhbmtleUxpbmtzQ29sbGVjdGlvbkRpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignbGlua3MnKTtcbiAgICB9XG59Il19