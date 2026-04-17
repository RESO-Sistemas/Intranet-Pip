import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Mention } from '@syncfusion/ej2-dropdowns';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['allowSpaces', 'cssClass', 'dataSource', 'debounceDelay', 'displayTemplate', 'fields', 'filterType', 'highlight', 'ignoreCase', 'itemTemplate', 'locale', 'mentionChar', 'minLength', 'noRecordsTemplate', 'popupHeight', 'popupWidth', 'query', 'requireLeadingSpace', 'showMentionChar', 'sortOrder', 'spinnerTemplate', 'suffixText', 'suggestionCount', 'target'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'change', 'closed', 'created', 'destroyed', 'filtering', 'opened', 'select'];
export const twoWays = [''];
/**
*The Mention component contains a list of predefined values, from which the user can choose a single value.
*```html
*<ejs-mention></ejs-mention>
*```
*/
let MentionComponent = class MentionComponent extends Mention {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.containerContext.ngAfterContentChecked(this);
    }
};
MentionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MentionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MentionComponent, selector: "ejs-mention", inputs: { allowSpaces: "allowSpaces", cssClass: "cssClass", dataSource: "dataSource", debounceDelay: "debounceDelay", displayTemplate: "displayTemplate", fields: "fields", filterType: "filterType", highlight: "highlight", ignoreCase: "ignoreCase", itemTemplate: "itemTemplate", locale: "locale", mentionChar: "mentionChar", minLength: "minLength", noRecordsTemplate: "noRecordsTemplate", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", requireLeadingSpace: "requireLeadingSpace", showMentionChar: "showMentionChar", sortOrder: "sortOrder", spinnerTemplate: "spinnerTemplate", suffixText: "suffixText", suggestionCount: "suggestionCount", target: "target" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", change: "change", closed: "closed", created: "created", destroyed: "destroyed", filtering: "filtering", opened: "opened", select: "select" }, queries: [{ propertyName: "displayTemplate", first: true, predicate: ["displayTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "spinnerTemplate", first: true, predicate: ["spinnerTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MentionComponent.prototype, "displayTemplate", void 0);
__decorate([
    Template()
], MentionComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], MentionComponent.prototype, "spinnerTemplate", void 0);
__decorate([
    Template('No records found')
], MentionComponent.prototype, "noRecordsTemplate", void 0);
MentionComponent = __decorate([
    ComponentMixins([ComponentBase])
], MentionComponent);
export { MentionComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-mention',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { displayTemplate: [{
                type: ContentChild,
                args: ['displayTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], spinnerTemplate: [{
                type: ContentChild,
                args: ['spinnerTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWVudGlvbi9tZW50aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUQsdUJBQXVCLEVBQTRCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBdUQsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLGlCQUFpQixFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLFlBQVksRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsbUJBQW1CLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsaUJBQWlCLEVBQUMsV0FBVyxFQUFDLGlCQUFpQixFQUFDLFlBQVksRUFBQyxpQkFBaUIsRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNoWCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxhQUFhLEVBQUMsZ0JBQWdCLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNySyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUV0Qzs7Ozs7RUFLRTtJQVlXLGdCQUFnQixTQUFoQixnQkFBaUIsU0FBUSxPQUFPO0lBK0N6QyxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXRJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBRXhCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBSUosQ0FBQTs2R0E3RVksZ0JBQWdCO2lHQUFoQixnQkFBZ0IsZzZDQVBmLDRCQUE0QjtBQThCdEM7SUFEQyxRQUFRLEVBQUU7eURBQ2lCO0FBTzVCO0lBREMsUUFBUSxFQUFFO3NEQUNjO0FBUXpCO0lBREMsUUFBUSxFQUFFO3lEQUNpQjtBQU81QjtJQURDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQzsyREFDQztBQTdDckIsZ0JBQWdCO0lBRDVCLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLGdCQUFnQixDQTZFNUI7U0E3RVksZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBWDVCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7K0tBeUJVLGVBQWU7c0JBRnJCLFlBQVk7dUJBQUMsaUJBQWlCO2dCQVN4QixZQUFZO3NCQUZsQixZQUFZO3VCQUFDLGNBQWM7Z0JBVXJCLGVBQWU7c0JBRnJCLFlBQVk7dUJBQUMsaUJBQWlCO2dCQVN4QixpQkFBaUI7c0JBRnZCLFlBQVk7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBSZW5kZXJlcjIsIEluamVjdG9yLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIENvbXBvbmVudE1peGlucywgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgTWVudGlvbiB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kcm9wZG93bnMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWxsb3dTcGFjZXMnLCdjc3NDbGFzcycsJ2RhdGFTb3VyY2UnLCdkZWJvdW5jZURlbGF5JywnZGlzcGxheVRlbXBsYXRlJywnZmllbGRzJywnZmlsdGVyVHlwZScsJ2hpZ2hsaWdodCcsJ2lnbm9yZUNhc2UnLCdpdGVtVGVtcGxhdGUnLCdsb2NhbGUnLCdtZW50aW9uQ2hhcicsJ21pbkxlbmd0aCcsJ25vUmVjb3Jkc1RlbXBsYXRlJywncG9wdXBIZWlnaHQnLCdwb3B1cFdpZHRoJywncXVlcnknLCdyZXF1aXJlTGVhZGluZ1NwYWNlJywnc2hvd01lbnRpb25DaGFyJywnc29ydE9yZGVyJywnc3Bpbm5lclRlbXBsYXRlJywnc3VmZml4VGV4dCcsJ3N1Z2dlc3Rpb25Db3VudCcsJ3RhcmdldCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydhY3Rpb25CZWdpbicsJ2FjdGlvbkNvbXBsZXRlJywnYWN0aW9uRmFpbHVyZScsJ2JlZm9yZU9wZW4nLCdjaGFuZ2UnLCdjbG9zZWQnLCdjcmVhdGVkJywnZGVzdHJveWVkJywnZmlsdGVyaW5nJywnb3BlbmVkJywnc2VsZWN0J107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJyddO1xuXG4vKipcbipUaGUgTWVudGlvbiBjb21wb25lbnQgY29udGFpbnMgYSBsaXN0IG9mIHByZWRlZmluZWQgdmFsdWVzLCBmcm9tIHdoaWNoIHRoZSB1c2VyIGNhbiBjaG9vc2UgYSBzaW5nbGUgdmFsdWUuXG4qYGBgaHRtbFxuKjxlanMtbWVudGlvbj48L2Vqcy1tZW50aW9uPlxuKmBgYFxuKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLW1lbnRpb24nLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudCA+PC9uZy1jb250ZW50PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIE1lbnRpb25Db21wb25lbnQgZXh0ZW5kcyBNZW50aW9uIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250YWluZXJDb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFjdGlvbkJlZ2luOiBhbnk7XG5cdGFjdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGFjdGlvbkZhaWx1cmU6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRjaGFuZ2U6IGFueTtcblx0Y2xvc2VkOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGVzdHJveWVkOiBhbnk7XG5cdGZpbHRlcmluZzogYW55O1xuXHRvcGVuZWQ6IGFueTtcblx0cHVibGljIHNlbGVjdDogYW55O1xuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3IgdGhlIHNlbGVjdGVkIHZhbHVlIGZyb20gdGhlIHN1Z2dlc3Rpb24gbGlzdC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZGlzcGxheVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBkaXNwbGF5VGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3IgdGhlIHN1Z2dlc3Rpb24gbGlzdC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaXRlbVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3Igc2hvd2luZyB1bnRpbCBkYXRhIGlzIGxvYWRlZCBpbiB0aGUgcG9wdXAuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3NwaW5uZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgc3Bpbm5lclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIG5vIG1hdGNoZWQgaXRlbSB3aGljaCBpcyBkaXNwbGF5ZWQgd2hlbiB0aGVyZSBhcmUgbm8gaXRlbXMgdG8gZGlzcGxheSBpbiB0aGUgc3VnZ2VzdGlvbiBsaXN0LlxuICAgICAqIEBkZWZhdWx0ICdObyByZWNvcmRzIGZvdW5kJ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ25vUmVjb3Jkc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoJ05vIHJlY29yZHMgZm91bmQnKVxuICAgIHB1YmxpYyBub1JlY29yZHNUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==