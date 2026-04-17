import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import { Template } from '@syncfusion/ej2-angular-base';
import { SheetsDirective } from './sheets.directive';
import { DefinedNamesDirective } from './definednames.directive';
import * as i0 from "@angular/core";
export const inputs = ['activeSheetIndex', 'allowAutoFill', 'allowCellFormatting', 'allowChart', 'allowConditionalFormat', 'allowDataValidation', 'allowDelete', 'allowEditing', 'allowFiltering', 'allowFindAndReplace', 'allowFreezePane', 'allowHyperlink', 'allowImage', 'allowInsert', 'allowMerge', 'allowNumberFormatting', 'allowOpen', 'allowPrint', 'allowResizing', 'allowSave', 'allowScrolling', 'allowSorting', 'allowUndoRedo', 'allowWrap', 'author', 'autoFillSettings', 'calculationMode', 'cellStyle', 'cssClass', 'currencyCode', 'definedNames', 'enableClipboard', 'enableContextMenu', 'enableKeyboardNavigation', 'enableKeyboardShortcut', 'enableNotes', 'enablePersistence', 'enableRtl', 'height', 'isProtected', 'listSeparator', 'locale', 'openSettings', 'openUrl', 'password', 'saveUrl', 'scrollSettings', 'selectionSettings', 'sheets', 'showAggregate', 'showCommentsPane', 'showFormulaBar', 'showRibbon', 'showSheetTabs', 'width'];
export const outputs = ['actionBegin', 'actionComplete', 'afterHyperlinkClick', 'afterHyperlinkCreate', 'beforeCellFormat', 'beforeCellRender', 'beforeCellSave', 'beforeCellUpdate', 'beforeConditionalFormat', 'beforeDataBound', 'beforeHyperlinkClick', 'beforeHyperlinkCreate', 'beforeOpen', 'beforeSave', 'beforeSelect', 'beforeSort', 'cellEdit', 'cellEdited', 'cellEditing', 'cellSave', 'contextMenuBeforeClose', 'contextMenuBeforeOpen', 'contextMenuItemSelect', 'created', 'dataBound', 'dataSourceChanged', 'dialogBeforeOpen', 'fileMenuBeforeClose', 'fileMenuBeforeOpen', 'fileMenuItemSelect', 'openComplete', 'openFailure', 'queryCellInfo', 'saveComplete', 'select', 'sortComplete'];
export const twoWays = [''];
/**
 * `ejs-spreadsheet` represents the Angular Spreadsheet Component.
 * ```html
 * <ejs-spreadsheet></ejs-spreadsheet>
 * ```
 */
let SpreadsheetComponent = class SpreadsheetComponent extends Spreadsheet {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['sheets', 'definedNames'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('SpreadsheetClipboard');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetEdit');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetKeyboardNavigation');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetKeyboardShortcut');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetFormulaBar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetRibbon');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetSave');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetOpen');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetSheetTabs');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetDataBind');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetCellFormat');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetNumberFormat');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SpreadsheetFormula');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childSheets;
        if (this.childDefinedNames) {
            this.tagObjects[1].instance = this.childDefinedNames;
        }
        this.context.ngAfterContentChecked(this);
    }
};
SpreadsheetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpreadsheetComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SpreadsheetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SpreadsheetComponent, selector: "ejs-spreadsheet", inputs: { activeSheetIndex: "activeSheetIndex", allowAutoFill: "allowAutoFill", allowCellFormatting: "allowCellFormatting", allowChart: "allowChart", allowConditionalFormat: "allowConditionalFormat", allowDataValidation: "allowDataValidation", allowDelete: "allowDelete", allowEditing: "allowEditing", allowFiltering: "allowFiltering", allowFindAndReplace: "allowFindAndReplace", allowFreezePane: "allowFreezePane", allowHyperlink: "allowHyperlink", allowImage: "allowImage", allowInsert: "allowInsert", allowMerge: "allowMerge", allowNumberFormatting: "allowNumberFormatting", allowOpen: "allowOpen", allowPrint: "allowPrint", allowResizing: "allowResizing", allowSave: "allowSave", allowScrolling: "allowScrolling", allowSorting: "allowSorting", allowUndoRedo: "allowUndoRedo", allowWrap: "allowWrap", author: "author", autoFillSettings: "autoFillSettings", calculationMode: "calculationMode", cellStyle: "cellStyle", cssClass: "cssClass", currencyCode: "currencyCode", definedNames: "definedNames", enableClipboard: "enableClipboard", enableContextMenu: "enableContextMenu", enableKeyboardNavigation: "enableKeyboardNavigation", enableKeyboardShortcut: "enableKeyboardShortcut", enableNotes: "enableNotes", enablePersistence: "enablePersistence", enableRtl: "enableRtl", height: "height", isProtected: "isProtected", listSeparator: "listSeparator", locale: "locale", openSettings: "openSettings", openUrl: "openUrl", password: "password", saveUrl: "saveUrl", scrollSettings: "scrollSettings", selectionSettings: "selectionSettings", sheets: "sheets", showAggregate: "showAggregate", showCommentsPane: "showCommentsPane", showFormulaBar: "showFormulaBar", showRibbon: "showRibbon", showSheetTabs: "showSheetTabs", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", afterHyperlinkClick: "afterHyperlinkClick", afterHyperlinkCreate: "afterHyperlinkCreate", beforeCellFormat: "beforeCellFormat", beforeCellRender: "beforeCellRender", beforeCellSave: "beforeCellSave", beforeCellUpdate: "beforeCellUpdate", beforeConditionalFormat: "beforeConditionalFormat", beforeDataBound: "beforeDataBound", beforeHyperlinkClick: "beforeHyperlinkClick", beforeHyperlinkCreate: "beforeHyperlinkCreate", beforeOpen: "beforeOpen", beforeSave: "beforeSave", beforeSelect: "beforeSelect", beforeSort: "beforeSort", cellEdit: "cellEdit", cellEdited: "cellEdited", cellEditing: "cellEditing", cellSave: "cellSave", contextMenuBeforeClose: "contextMenuBeforeClose", contextMenuBeforeOpen: "contextMenuBeforeOpen", contextMenuItemSelect: "contextMenuItemSelect", created: "created", dataBound: "dataBound", dataSourceChanged: "dataSourceChanged", dialogBeforeOpen: "dialogBeforeOpen", fileMenuBeforeClose: "fileMenuBeforeClose", fileMenuBeforeOpen: "fileMenuBeforeOpen", fileMenuItemSelect: "fileMenuItemSelect", openComplete: "openComplete", openFailure: "openFailure", queryCellInfo: "queryCellInfo", saveComplete: "saveComplete", select: "select", sortComplete: "sortComplete" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "childSheets", first: true, predicate: SheetsDirective, descendants: true }, { propertyName: "childDefinedNames", first: true, predicate: DefinedNamesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], SpreadsheetComponent.prototype, "template", void 0);
SpreadsheetComponent = __decorate([
    ComponentMixins([ComponentBase])
], SpreadsheetComponent);
export { SpreadsheetComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpreadsheetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-spreadsheet',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childSheets: new ContentChild(SheetsDirective),
                        childDefinedNames: new ContentChild(DefinedNamesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByZWFkc2hlZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NwcmVhZHNoZWV0L3NwcmVhZHNoZWV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUVqRSxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxrQkFBa0IsRUFBQyxlQUFlLEVBQUMscUJBQXFCLEVBQUMsWUFBWSxFQUFDLHdCQUF3QixFQUFDLHFCQUFxQixFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsZ0JBQWdCLEVBQUMscUJBQXFCLEVBQUMsaUJBQWlCLEVBQUMsZ0JBQWdCLEVBQUMsWUFBWSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsV0FBVyxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQUMsV0FBVyxFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxlQUFlLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxrQkFBa0IsRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLGNBQWMsRUFBQyxjQUFjLEVBQUMsaUJBQWlCLEVBQUMsbUJBQW1CLEVBQUMsMEJBQTBCLEVBQUMsd0JBQXdCLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLFdB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M0IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVyxFQUFFLElBQUksWUFBWSxDQUFDLGVBQWUsQ0FBQzt3QkFDOUMsaUJBQWlCLEVBQUUsSUFBSSxZQUFZLENBQUMscUJBQXFCLENBQUM7cUJBQzdEO2lCQUNKOytLQThDVSxRQUFRO3NCQUZkLFlBQVk7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFNwcmVhZHNoZWV0IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXNwcmVhZHNoZWV0JztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBTaGVldHNEaXJlY3RpdmUgfSBmcm9tICcuL3NoZWV0cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVmaW5lZE5hbWVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWZpbmVkbmFtZXMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FjdGl2ZVNoZWV0SW5kZXgnLCdhbGxvd0F1dG9GaWxsJywnYWxsb3dDZWxsRm9ybWF0dGluZycsJ2FsbG93Q2hhcnQnLCdhbGxvd0NvbmRpdGlvbmFsRm9ybWF0JywnYWxsb3dEYXRhVmFsaWRhdGlvbicsJ2FsbG93RGVsZXRlJywnYWxsb3dFZGl0aW5nJywnYWxsb3dGaWx0ZXJpbmcnLCdhbGxvd0ZpbmRBbmRSZXBsYWNlJywnYWxsb3dGcmVlemVQYW5lJywnYWxsb3dIeXBlcmxpbmsnLCdhbGxvd0ltYWdlJywnYWxsb3dJbnNlcnQnLCdhbGxvd01lcmdlJywnYWxsb3dOdW1iZXJGb3JtYXR0aW5nJywnYWxsb3dPcGVuJywnYWxsb3dQcmludCcsJ2FsbG93UmVzaXppbmcnLCdhbGxvd1NhdmUnLCdhbGxvd1Njcm9sbGluZycsJ2FsbG93U29ydGluZycsJ2FsbG93VW5kb1JlZG8nLCdhbGxvd1dyYXAnLCdhdXRob3InLCdhdXRvRmlsbFNldHRpbmdzJywnY2FsY3VsYXRpb25Nb2RlJywnY2VsbFN0eWxlJywnY3NzQ2xhc3MnLCdjdXJyZW5jeUNvZGUnLCdkZWZpbmVkTmFtZXMnLCdlbmFibGVDbGlwYm9hcmQnLCdlbmFibGVDb250ZXh0TWVudScsJ2VuYWJsZUtleWJvYXJkTmF2aWdhdGlvbicsJ2VuYWJsZUtleWJvYXJkU2hvcnRjdXQnLCdlbmFibGVOb3RlcycsJ2VuYWJsZVBlcnNpc3RlbmNlJywnZW5hYmxlUnRsJywnaGVpZ2h0JywnaXNQcm90ZWN0ZWQnLCdsaXN0U2VwYXJhdG9yJywnbG9jYWxlJywnb3BlblNldHRpbmdzJywnb3BlblVybCcsJ3Bhc3N3b3JkJywnc2F2ZVVybCcsJ3Njcm9sbFNldHRpbmdzJywnc2VsZWN0aW9uU2V0dGluZ3MnLCdzaGVldHMnLCdzaG93QWdncmVnYXRlJywnc2hvd0NvbW1lbnRzUGFuZScsJ3Nob3dGb3JtdWxhQmFyJywnc2hvd1JpYmJvbicsJ3Nob3dTaGVldFRhYnMnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydhY3Rpb25CZWdpbicsJ2FjdGlvbkNvbXBsZXRlJywnYWZ0ZXJIeXBlcmxpbmtDbGljaycsJ2FmdGVySHlwZXJsaW5rQ3JlYXRlJywnYmVmb3JlQ2VsbEZvcm1hdCcsJ2JlZm9yZUNlbGxSZW5kZXInLCdiZWZvcmVDZWxsU2F2ZScsJ2JlZm9yZUNlbGxVcGRhdGUnLCdiZWZvcmVDb25kaXRpb25hbEZvcm1hdCcsJ2JlZm9yZURhdGFCb3VuZCcsJ2JlZm9yZUh5cGVybGlua0NsaWNrJywnYmVmb3JlSHlwZXJsaW5rQ3JlYXRlJywnYmVmb3JlT3BlbicsJ2JlZm9yZVNhdmUnLCdiZWZvcmVTZWxlY3QnLCdiZWZvcmVTb3J0JywnY2VsbEVkaXQnLCdjZWxsRWRpdGVkJywnY2VsbEVkaXRpbmcnLCdjZWxsU2F2ZScsJ2NvbnRleHRNZW51QmVmb3JlQ2xvc2UnLCdjb250ZXh0TWVudUJlZm9yZU9wZW4nLCdjb250ZXh0TWVudUl0ZW1TZWxlY3QnLCdjcmVhdGVkJywnZGF0YUJvdW5kJywnZGF0YVNvdXJjZUNoYW5nZWQnLCdkaWFsb2dCZWZvcmVPcGVuJywnZmlsZU1lbnVCZWZvcmVDbG9zZScsJ2ZpbGVNZW51QmVmb3JlT3BlbicsJ2ZpbGVNZW51SXRlbVNlbGVjdCcsJ29wZW5Db21wbGV0ZScsJ29wZW5GYWlsdXJlJywncXVlcnlDZWxsSW5mbycsJ3NhdmVDb21wbGV0ZScsJ3NlbGVjdCcsJ3NvcnRDb21wbGV0ZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBgZWpzLXNwcmVhZHNoZWV0YCByZXByZXNlbnRzIHRoZSBBbmd1bGFyIFNwcmVhZHNoZWV0IENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtc3ByZWFkc2hlZXQ+PC9lanMtc3ByZWFkc2hlZXQ+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtc3ByZWFkc2hlZXQnLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRTaGVldHM6IG5ldyBDb250ZW50Q2hpbGQoU2hlZXRzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkRGVmaW5lZE5hbWVzOiBuZXcgQ29udGVudENoaWxkKERlZmluZWROYW1lc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZV0pXG5leHBvcnQgY2xhc3MgU3ByZWFkc2hlZXRDb21wb25lbnQgZXh0ZW5kcyBTcHJlYWRzaGVldCBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRhY3Rpb25CZWdpbjogYW55O1xuXHRhY3Rpb25Db21wbGV0ZTogYW55O1xuXHRhZnRlckh5cGVybGlua0NsaWNrOiBhbnk7XG5cdGFmdGVySHlwZXJsaW5rQ3JlYXRlOiBhbnk7XG5cdGJlZm9yZUNlbGxGb3JtYXQ6IGFueTtcblx0YmVmb3JlQ2VsbFJlbmRlcjogYW55O1xuXHRiZWZvcmVDZWxsU2F2ZTogYW55O1xuXHRiZWZvcmVDZWxsVXBkYXRlOiBhbnk7XG5cdGJlZm9yZUNvbmRpdGlvbmFsRm9ybWF0OiBhbnk7XG5cdGJlZm9yZURhdGFCb3VuZDogYW55O1xuXHRiZWZvcmVIeXBlcmxpbmtDbGljazogYW55O1xuXHRiZWZvcmVIeXBlcmxpbmtDcmVhdGU6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRiZWZvcmVTYXZlOiBhbnk7XG5cdGJlZm9yZVNlbGVjdDogYW55O1xuXHRiZWZvcmVTb3J0OiBhbnk7XG5cdGNlbGxFZGl0OiBhbnk7XG5cdGNlbGxFZGl0ZWQ6IGFueTtcblx0Y2VsbEVkaXRpbmc6IGFueTtcblx0Y2VsbFNhdmU6IGFueTtcblx0Y29udGV4dE1lbnVCZWZvcmVDbG9zZTogYW55O1xuXHRjb250ZXh0TWVudUJlZm9yZU9wZW46IGFueTtcblx0Y29udGV4dE1lbnVJdGVtU2VsZWN0OiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGF0YUJvdW5kOiBhbnk7XG5cdGRhdGFTb3VyY2VDaGFuZ2VkOiBhbnk7XG5cdGRpYWxvZ0JlZm9yZU9wZW46IGFueTtcblx0ZmlsZU1lbnVCZWZvcmVDbG9zZTogYW55O1xuXHRmaWxlTWVudUJlZm9yZU9wZW46IGFueTtcblx0ZmlsZU1lbnVJdGVtU2VsZWN0OiBhbnk7XG5cdG9wZW5Db21wbGV0ZTogYW55O1xuXHRvcGVuRmFpbHVyZTogYW55O1xuXHRxdWVyeUNlbGxJbmZvOiBhbnk7XG5cdHNhdmVDb21wbGV0ZTogYW55O1xuXHRzZWxlY3Q6IGFueTtcblx0cHVibGljIHNvcnRDb21wbGV0ZTogYW55O1xuICAgIHB1YmxpYyBjaGlsZFNoZWV0czogUXVlcnlMaXN0PFNoZWV0c0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkRGVmaW5lZE5hbWVzOiBRdWVyeUxpc3Q8RGVmaW5lZE5hbWVzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3NoZWV0cycsICdkZWZpbmVkTmFtZXMnXTtcbiAgICBAQ29udGVudENoaWxkKCd0ZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldENsaXBib2FyZCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU3ByZWFkc2hlZXRFZGl0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldEtleWJvYXJkTmF2aWdhdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU3ByZWFkc2hlZXRLZXlib2FyZFNob3J0Y3V0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldFNlbGVjdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU3ByZWFkc2hlZXRDb250ZXh0TWVudScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU3ByZWFkc2hlZXRGb3JtdWxhQmFyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldFJpYmJvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU3ByZWFkc2hlZXRTYXZlJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldE9wZW4nKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1NwcmVhZHNoZWV0U2hlZXRUYWJzJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldERhdGFCaW5kJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldENlbGxGb3JtYXQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1NwcmVhZHNoZWV0TnVtYmVyRm9ybWF0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTcHJlYWRzaGVldEZvcm11bGEnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkU2hlZXRzO1xuICAgICAgICBpZiAodGhpcy5jaGlsZERlZmluZWROYW1lcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbMV0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkRGVmaW5lZE5hbWVzIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=