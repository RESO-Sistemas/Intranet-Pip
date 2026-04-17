import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColorMappingsDirective } from './colormapping.directive';
import * as i0 from "@angular/core";
let input = ['autoFill', 'border', 'colorMapping', 'fill', 'groupGap', 'groupPadding', 'groupPath', 'headerAlignment', 'headerFormat', 'headerHeight', 'headerStyle', 'headerTemplate', 'opacity', 'showHeader', 'templatePosition'];
let outputs = [];
/**
 * Represents the directive to configure and render level leaf items in the treemap.
 * ```html
 * <e-levels>
 * <e-level></e-level>
 * </e-levels>
 * ```
 */
export class LevelDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['colorMapping'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
LevelDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LevelDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
LevelDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: LevelDirective, selector: "e-levels>e-level", inputs: { autoFill: "autoFill", border: "border", colorMapping: "colorMapping", fill: "fill", groupGap: "groupGap", groupPadding: "groupPadding", groupPath: "groupPath", headerAlignment: "headerAlignment", headerFormat: "headerFormat", headerHeight: "headerHeight", headerStyle: "headerStyle", headerTemplate: "headerTemplate", opacity: "opacity", showHeader: "showHeader", templatePosition: "templatePosition" }, queries: [{ propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "childColorMapping", first: true, predicate: ColorMappingsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], LevelDirective.prototype, "headerTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LevelDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-levels>e-level',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childColorMapping: new ContentChild(ColorMappingsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }] } });
/**
 * Level Array Directive
 * @private
 */
export class LevelsDirective extends ArrayBase {
    constructor() {
        super('levels');
    }
}
LevelsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LevelsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
LevelsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: LevelsDirective, selector: "ej-treemap>e-levels", queries: [{ propertyName: "children", predicate: LevelDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LevelsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-treemap>e-levels',
                    queries: {
                        children: new ContentChildren(LevelDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWxzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90cmVlbWFwL2xldmVscy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUVsRSxJQUFJLEtBQUssR0FBYSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDL08sSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7O0dBT0c7QUFTSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQTJCO0lBa0YzRCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBOUU5QyxTQUFJLEdBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQWdGckMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7MkdBdkZRLGNBQWM7K0ZBQWQsY0FBYyx3bUJBSGlCLHNCQUFzQjtBQW1GOUQ7SUFEQyxRQUFRLEVBQUU7c0RBQ2dCOzJGQWhGbEIsY0FBYztrQkFSMUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFO3dCQUNMLGlCQUFpQixFQUFFLElBQUksWUFBWSxDQUFDLHNCQUFzQixDQUFDO3FCQUM5RDtpQkFDSjt1R0FpRlUsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0I7O0FBWWxDOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxlQUFnQixTQUFRLFNBQTBCO0lBQzNEO1FBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7OzRHQUhRLGVBQWU7Z0dBQWYsZUFBZSxvRkFIVSxjQUFjOzJGQUd2QyxlQUFlO2tCQU4zQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsY0FBYyxDQUFDO3FCQUNoRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgQ29sb3JNYXBwaW5nc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sb3JtYXBwaW5nLmRpcmVjdGl2ZSc7XG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2F1dG9GaWxsJywgJ2JvcmRlcicsICdjb2xvck1hcHBpbmcnLCAnZmlsbCcsICdncm91cEdhcCcsICdncm91cFBhZGRpbmcnLCAnZ3JvdXBQYXRoJywgJ2hlYWRlckFsaWdubWVudCcsICdoZWFkZXJGb3JtYXQnLCAnaGVhZGVySGVpZ2h0JywgJ2hlYWRlclN0eWxlJywgJ2hlYWRlclRlbXBsYXRlJywgJ29wYWNpdHknLCAnc2hvd0hlYWRlcicsICd0ZW1wbGF0ZVBvc2l0aW9uJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlyZWN0aXZlIHRvIGNvbmZpZ3VyZSBhbmQgcmVuZGVyIGxldmVsIGxlYWYgaXRlbXMgaW4gdGhlIHRyZWVtYXAuXG4gKiBgYGBodG1sXG4gKiA8ZS1sZXZlbHM+XG4gKiA8ZS1sZXZlbD48L2UtbGV2ZWw+XG4gKiA8L2UtbGV2ZWxzPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1sZXZlbHM+ZS1sZXZlbCcsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkQ29sb3JNYXBwaW5nOiBuZXcgQ29udGVudENoaWxkKENvbG9yTWFwcGluZ3NEaXJlY3RpdmUpXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBMZXZlbERpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPExldmVsRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuICAgIHB1YmxpYyBjaGlsZENvbG9yTWFwcGluZzogYW55O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnY29sb3JNYXBwaW5nJ107XG4gICAgLyoqIFxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlIGF1dG9tYXRpYyBmaWxsaW5nIG9mIHRoZSBjb2xvcnMgZnJvbSB0aGUgcGFsZXR0ZSBpbiB0aGUgaXRlbXMgb2YgdGhlIHRyZWVtYXAuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYXV0b0ZpbGw6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgb3B0aW9ucyBmb3IgY3VzdG9taXppbmcgdGhlIGNvbG9yIGFuZCB3aWR0aCBvZiB0aGUgYm9yZGVyIG9mIFxuICAgICAqIHRoZSBsZXZlbCBsZWFmIGl0ZW1zIG9mIHRoZSB0cmVlbWFwLlxuICAgICAqL1xuICAgIHB1YmxpYyBib3JkZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgb3B0aW9ucyBmb3IgY3VzdG9taXppbmcgdGhlIGNvbG9yLW1hcHBpbmcgb2YgdGhlIGxldmVsIGxlYWYgaXRlbXMgaW4gdGhlIHRyZWVtYXAuXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yTWFwcGluZzogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBmaWxsIGNvbG9yIG9mIHRoZSBsZXZlbCBsZWFmIGl0ZW0gaW4gdGhlIHRyZWVtYXAuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmaWxsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIGdhcCBiZXR3ZWVuIHRoZSBsZXZlbCBsZWFmIGl0ZW1zIGluIHRoZSB0cmVlbWFwLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ3JvdXBHYXA6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgcGFkZGluZyBvZiBsZXZlbCBsZWFmIGl0ZW1zIGluIHRoZSB0cmVlbWFwLlxuICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICovXG4gICAgcHVibGljIGdyb3VwUGFkZGluZzogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSB2YWx1ZSBwYXRoIGZyb20gdGhlIGRhdGEgc291cmNlIGluIHRoZSB0cmVlbWFwIHRvIHJlbmRlciB0aGUgaXRlbS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGdyb3VwUGF0aDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBhbGlnbm1lbnQgb2YgdGhlIGhlYWRlciBvZiB0aGUgdHJlZW1hcC5cbiAgICAgKiBAZGVmYXVsdCAnTmVhcidcbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyQWxpZ25tZW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIHN0cmluZyB0byBmb3JtYXQgdGhlIGhlYWRlciBsYWJlbCBvZiB0aGUgbGV2ZWwgbGVhZiBpdGVtcyBpbiB0aGUgdHJlZW1hcC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGhlYWRlckZvcm1hdDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBoZWlnaHQgb2YgaGVhZGVyIGluIHRoZSB0cmVlbWFwLlxuICAgICAqIEBkZWZhdWx0IDIwXG4gICAgICovXG4gICAgcHVibGljIGhlYWRlckhlaWdodDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIGFuZCBnZXRzIHRoZSBvcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgdGV4dCBzdHlsZSBvZiBoZWFkZXIgbGFiZWwgb2YgdGhlIGxldmVsIGxlYWYgaXRlbS5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyU3R5bGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgb3BhY2l0eSBpbiB0aGUgbGV2ZWwgbGVhZiBpdGVtIG9mIHRoZSB0cmVlbWFwLlxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BhY2l0eTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTaG93cyBvciBoaWRlcyB0aGUgaGVhZGVyIGluIGxldmVsIGxlYWYgaXRlbSBvZiB0aGUgdHJlZW1hcC5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHNob3dIZWFkZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyBhbmQgZ2V0cyB0aGUgb3B0aW9ucyBmb3IgY3VzdG9taXppbmcgdGhlIHRlbXBsYXRlIHBvc2l0aW9uIG9mIHRoZSB0cmVlbWFwLlxuICAgICAqIEBkZWZhdWx0ICdUb3BMZWZ0J1xuICAgICAqL1xuICAgIHB1YmxpYyB0ZW1wbGF0ZVBvc2l0aW9uOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgYW5kIGdldHMgdGhlIHRlbXBsYXRlIGZvciBoZWFkZXIgaW4gdGhlIHRyZWVtYXAuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogTGV2ZWwgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2VqLXRyZWVtYXA+ZS1sZXZlbHMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oTGV2ZWxEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTGV2ZWxzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPExldmVsc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignbGV2ZWxzJyk7XG4gICAgfVxufSJdfQ==