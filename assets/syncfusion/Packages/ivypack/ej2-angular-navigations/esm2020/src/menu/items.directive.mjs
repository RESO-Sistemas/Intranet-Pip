import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['htmlAttributes', 'iconCss', 'id', 'items', 'separator', 'text', 'url'];
let outputs = [];
export class MenuItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
MenuItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
MenuItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MenuItemDirective, selector: "ejs-menu>e-menu-items>e-menu-item>", inputs: { htmlAttributes: "htmlAttributes", iconCss: "iconCss", id: "id", items: "items", separator: "separator", text: "text", url: "url" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-menu>e-menu-items>e-menu-item>',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * MenuItem Array Directive
 * @private
 */
export class MenuItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
MenuItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MenuItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MenuItemsDirective, selector: "ejs-menu>e-menu-items", queries: [{ propertyName: "children", predicate: MenuItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-menu>e-menu-items',
                    queries: {
                        children: new ContentChildren(MenuItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21lbnUvaXRlbXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9GLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQVUzQixNQUFNLE9BQU8saUJBQWtCLFNBQVEsV0FBOEI7SUEwQ2pFLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7OEdBL0NRLGlCQUFpQjtrR0FBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBUjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG9DQUFvQztvQkFDOUMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQW1ERDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsU0FBNkI7SUFDakU7UUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQzs7K0dBSFEsa0JBQWtCO21HQUFsQixrQkFBa0Isc0ZBSE8saUJBQWlCOzJGQUcxQyxrQkFBa0I7a0JBTjlCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDbkQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2h0bWxBdHRyaWJ1dGVzJywgJ2ljb25Dc3MnLCAnaWQnLCAnaXRlbXMnLCAnc2VwYXJhdG9yJywgJ3RleHQnLCAndXJsJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtbWVudT5lLW1lbnUtaXRlbXM+ZS1tZW51LWl0ZW0+JyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVudUl0ZW1EaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxNZW51SXRlbURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgaHRtbEF0dHJpYnV0ZXMgcHJvcGVydHkgdG8gc3VwcG9ydCBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gdGhlIG1lbnUgaXRlbXMgaW4gdGhlIG1lbnUgY29tcG9uZW50LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgaHRtbEF0dHJpYnV0ZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBjbGFzcy9tdWx0aXBsZSBjbGFzc2VzIHNlcGFyYXRlZCBieSBhIHNwYWNlIGZvciB0aGUgbWVudSBJdGVtIHRoYXQgaXMgdXNlZCB0byBpbmNsdWRlIGFuIGljb24uIFxuICAgICAqIE1lbnUgSXRlbSBjYW4gaW5jbHVkZSBmb250IGljb24gYW5kIHNwcml0ZSBpbWFnZS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGljb25Dc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBpZCBmb3IgbWVudSBpdGVtLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGlkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc3ViIG1lbnUgaXRlbXMgdGhhdCBpcyB0aGUgYXJyYXkgb2YgTWVudUl0ZW0gbW9kZWwuXG4gICAgICogQGRlZmF1bHQgW11cbiAgICAgKi9cbiAgICBwdWJsaWMgaXRlbXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHNlcGFyYXRvciBiZXR3ZWVuIHRoZSBtZW51IGl0ZW1zLiBTZXBhcmF0b3IgYXJlIGVpdGhlciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIGxpbmVzIHVzZWQgdG8gZ3JvdXAgbWVudSBpdGVtcy5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXBhcmF0b3I6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRleHQgZm9yIG1lbnUgaXRlbS5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyB0ZXh0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB1cmwgZm9yIG1lbnUgaXRlbSB0aGF0IGNyZWF0ZXMgdGhlIGFuY2hvciBsaW5rIHRvIG5hdmlnYXRlIHRvIHRoZSB1cmwgcHJvdmlkZWQuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdXJsOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBNZW51SXRlbSBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLW1lbnU+ZS1tZW51LWl0ZW1zJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKE1lbnVJdGVtRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxNZW51SXRlbXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2l0ZW1zJyk7XG4gICAgfVxufSJdfQ==