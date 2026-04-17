import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColumnsDirective } from './columns.directive';
import { AggregatesDirective } from './aggregates.directive';
import * as i0 from "@angular/core";
export const inputs = ['aggregates', 'allowExcelExport', 'allowFiltering', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'autoCheckHierarchy', 'childMapping', 'clipMode', 'columnChooserSettings', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'copyHierarchyMode', 'currencyCode', 'dataSource', 'detailTemplate', 'editSettings', 'emptyRecordTemplate', 'enableAdaptiveUI', 'enableAltRow', 'enableAutoFill', 'enableCollapseAll', 'enableColumnSpan', 'enableColumnVirtualization', 'enableHover', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableInfiniteScrolling', 'enablePersistence', 'enableRowSpan', 'enableRtl', 'enableStickyHeader', 'enableVirtualMaskRow', 'enableVirtualization', 'expandStateMapping', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'hasChildMapping', 'height', 'idMapping', 'infiniteScrollSettings', 'isRowSelectable', 'loadChildOnDemand', 'loadingIndicator', 'locale', 'pageSettings', 'pagerTemplate', 'parentIdMapping', 'printMode', 'query', 'rowDropSettings', 'rowHeight', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnChooser', 'showColumnMenu', 'sortSettings', 'textWrapSettings', 'toolbar', 'treeColumnIndex', 'width'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'batchAdd', 'batchCancel', 'batchDelete', 'beforeBatchAdd', 'beforeBatchDelete', 'beforeBatchSave', 'beforeCopy', 'beforeDataBound', 'beforeExcelExport', 'beforePaste', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSaved', 'cellSelected', 'cellSelecting', 'checkboxChange', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'detailDataBound', 'excelAggregateQueryCellInfo', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'pdfAggregateQueryCellInfo', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick', 'dataSourceChange'];
export const twoWays = ['dataSource'];
/**
 * `ejs-treegrid` represents the Angular TreeTreeGrid Component.
 * ```html
 * <ejs-treegrid [dataSource]='data' allowPaging='true' allowSorting='true'></ejs-treegrid>
 * ```
 */
let TreeGridComponent = class TreeGridComponent extends TreeGrid {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['columns', 'aggregates'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('TreeGridFilter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridPage');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridSort');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridReorder');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridAggregate');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridColumnMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridExcelExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridPdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridCommandColumn');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridEdit');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridDetailRow');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridRowDD');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridFreeze');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridColumnChooser');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridLogger');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridInfiniteScroll');
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
        this.tagObjects[0].instance = this.childColumns;
        if (this.childAggregates) {
            this.tagObjects[1].instance = this.childAggregates;
        }
        this.context.ngAfterContentChecked(this);
    }
};
TreeGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeGridComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
TreeGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TreeGridComponent, selector: "ejs-treegrid", inputs: { aggregates: "aggregates", allowExcelExport: "allowExcelExport", allowFiltering: "allowFiltering", allowMultiSorting: "allowMultiSorting", allowPaging: "allowPaging", allowPdfExport: "allowPdfExport", allowReordering: "allowReordering", allowResizing: "allowResizing", allowRowDragAndDrop: "allowRowDragAndDrop", allowSelection: "allowSelection", allowSorting: "allowSorting", allowTextWrap: "allowTextWrap", autoCheckHierarchy: "autoCheckHierarchy", childMapping: "childMapping", clipMode: "clipMode", columnChooserSettings: "columnChooserSettings", columnMenuItems: "columnMenuItems", columnQueryMode: "columnQueryMode", columns: "columns", contextMenuItems: "contextMenuItems", copyHierarchyMode: "copyHierarchyMode", currencyCode: "currencyCode", dataSource: "dataSource", detailTemplate: "detailTemplate", editSettings: "editSettings", emptyRecordTemplate: "emptyRecordTemplate", enableAdaptiveUI: "enableAdaptiveUI", enableAltRow: "enableAltRow", enableAutoFill: "enableAutoFill", enableCollapseAll: "enableCollapseAll", enableColumnSpan: "enableColumnSpan", enableColumnVirtualization: "enableColumnVirtualization", enableHover: "enableHover", enableHtmlSanitizer: "enableHtmlSanitizer", enableImmutableMode: "enableImmutableMode", enableInfiniteScrolling: "enableInfiniteScrolling", enablePersistence: "enablePersistence", enableRowSpan: "enableRowSpan", enableRtl: "enableRtl", enableStickyHeader: "enableStickyHeader", enableVirtualMaskRow: "enableVirtualMaskRow", enableVirtualization: "enableVirtualization", expandStateMapping: "expandStateMapping", filterSettings: "filterSettings", frozenColumns: "frozenColumns", frozenRows: "frozenRows", gridLines: "gridLines", hasChildMapping: "hasChildMapping", height: "height", idMapping: "idMapping", infiniteScrollSettings: "infiniteScrollSettings", isRowSelectable: "isRowSelectable", loadChildOnDemand: "loadChildOnDemand", loadingIndicator: "loadingIndicator", locale: "locale", pageSettings: "pageSettings", pagerTemplate: "pagerTemplate", parentIdMapping: "parentIdMapping", printMode: "printMode", query: "query", rowDropSettings: "rowDropSettings", rowHeight: "rowHeight", rowTemplate: "rowTemplate", searchSettings: "searchSettings", selectedRowIndex: "selectedRowIndex", selectionSettings: "selectionSettings", showColumnChooser: "showColumnChooser", showColumnMenu: "showColumnMenu", sortSettings: "sortSettings", textWrapSettings: "textWrapSettings", toolbar: "toolbar", treeColumnIndex: "treeColumnIndex", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", batchAdd: "batchAdd", batchCancel: "batchCancel", batchDelete: "batchDelete", beforeBatchAdd: "beforeBatchAdd", beforeBatchDelete: "beforeBatchDelete", beforeBatchSave: "beforeBatchSave", beforeCopy: "beforeCopy", beforeDataBound: "beforeDataBound", beforeExcelExport: "beforeExcelExport", beforePaste: "beforePaste", beforePdfExport: "beforePdfExport", beforePrint: "beforePrint", beginEdit: "beginEdit", cellDeselected: "cellDeselected", cellDeselecting: "cellDeselecting", cellEdit: "cellEdit", cellSave: "cellSave", cellSaved: "cellSaved", cellSelected: "cellSelected", cellSelecting: "cellSelecting", checkboxChange: "checkboxChange", collapsed: "collapsed", collapsing: "collapsing", columnDrag: "columnDrag", columnDragStart: "columnDragStart", columnDrop: "columnDrop", columnMenuClick: "columnMenuClick", columnMenuOpen: "columnMenuOpen", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataBound: "dataBound", dataSourceChanged: "dataSourceChanged", dataStateChange: "dataStateChange", detailDataBound: "detailDataBound", excelAggregateQueryCellInfo: "excelAggregateQueryCellInfo", excelExportComplete: "excelExportComplete", excelHeaderQueryCellInfo: "excelHeaderQueryCellInfo", excelQueryCellInfo: "excelQueryCellInfo", expanded: "expanded", expanding: "expanding", headerCellInfo: "headerCellInfo", load: "load", pdfAggregateQueryCellInfo: "pdfAggregateQueryCellInfo", pdfExportComplete: "pdfExportComplete", pdfHeaderQueryCellInfo: "pdfHeaderQueryCellInfo", pdfQueryCellInfo: "pdfQueryCellInfo", printComplete: "printComplete", queryCellInfo: "queryCellInfo", recordDoubleClick: "recordDoubleClick", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", rowDataBound: "rowDataBound", rowDeselected: "rowDeselected", rowDeselecting: "rowDeselecting", rowDrag: "rowDrag", rowDragStart: "rowDragStart", rowDragStartHelper: "rowDragStartHelper", rowDrop: "rowDrop", rowSelected: "rowSelected", rowSelecting: "rowSelecting", toolbarClick: "toolbarClick", dataSourceChange: "dataSourceChange" }, queries: [{ propertyName: "toolbarTemplate", first: true, predicate: ["toolbarTemplate"], descendants: true }, { propertyName: "pagerTemplate", first: true, predicate: ["pagerTemplate"], descendants: true }, { propertyName: "rowTemplate", first: true, predicate: ["rowTemplate"], descendants: true }, { propertyName: "detailTemplate", first: true, predicate: ["detailTemplate"], descendants: true }, { propertyName: "editSettings_template", first: true, predicate: ["editSettingsTemplate"], descendants: true }, { propertyName: "emptyRecordTemplate", first: true, predicate: ["emptyRecordTemplate"], descendants: true }, { propertyName: "columnChooserSettings_headerTemplate", first: true, predicate: ["columnChooserSettingsHeaderTemplate"], descendants: true }, { propertyName: "columnChooserSettings_template", first: true, predicate: ["columnChooserSettingsTemplate"], descendants: true }, { propertyName: "columnChooserSettings_footerTemplate", first: true, predicate: ["columnChooserSettingsFooterTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }, { propertyName: "childAggregates", first: true, predicate: AggregatesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], TreeGridComponent.prototype, "toolbarTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "pagerTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "rowTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "detailTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "editSettings_template", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "emptyRecordTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "columnChooserSettings_headerTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "columnChooserSettings_template", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "columnChooserSettings_footerTemplate", void 0);
TreeGridComponent = __decorate([
    ComponentMixins([ComponentBase])
], TreeGridComponent);
export { TreeGridComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-treegrid',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective),
                        childAggregates: new ContentChild(AggregatesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { toolbarTemplate: [{
                type: ContentChild,
                args: ['toolbarTemplate']
            }], pagerTemplate: [{
                type: ContentChild,
                args: ['pagerTemplate']
            }], rowTemplate: [{
                type: ContentChild,
                args: ['rowTemplate']
            }], detailTemplate: [{
                type: ContentChild,
                args: ['detailTemplate']
            }], editSettings_template: [{
                type: ContentChild,
                args: ['editSettingsTemplate']
            }], emptyRecordTemplate: [{
                type: ContentChild,
                args: ['emptyRecordTemplate']
            }], columnChooserSettings_headerTemplate: [{
                type: ContentChild,
                args: ['columnChooserSettingsHeaderTemplate']
            }], columnChooserSettings_template: [{
                type: ContentChild,
                args: ['columnChooserSettingsTemplate']
            }], columnChooserSettings_footerTemplate: [{
                type: ContentChild,
                args: ['columnChooserSettingsFooterTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RyZWVncmlkL3RyZWVncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRTdELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLFlBQVksRUFBQyxrQkFBa0IsRUFBQyxnQkFBZ0IsRUFBQyxtQkFBbUIsRUFBQyxhQUFhLEVBQUMsZ0JBQWdCLEVBQUMsaUJBQWlCLEVBQUMsZUFBZSxFQUFDLHFCQUFxQixFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxlQUFlLEVBQUMsb0JBQW9CLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyx1QkFBdUIsRUFBQyxpQkFBaUIsRUFBQyxpQkFBaUIsRUFBQyxTQUFTLEVBQUMsa0JBQWtCLEVBQUMsbUJBQW1CLEVBQUMsY0FBYyxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFBQyxjQUFjLEVBQUMscUJBQXFCLEVBQUMsa0JBQWtCLEVBQUMsY0FBYyxFQUFDLGdCQUFnQixFQUFDLG1CQUFtQixFQUFDLGtCQUFrQixFQUFDLDRCQUE0QixFQUFDLGFBQWEsRUFBQyxxQkFBcUIsRUFBQyxxQkFBcUIsRUFBQyx5QkFBeUIsRUFBQyxtQkFBbUIs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IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRyZWVHcmlkIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXRyZWVncmlkJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBZ2dyZWdhdGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9hZ2dyZWdhdGVzLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhZ2dyZWdhdGVzJywnYWxsb3dFeGNlbEV4cG9ydCcsJ2FsbG93RmlsdGVyaW5nJywnYWxsb3dNdWx0aVNvcnRpbmcnLCdhbGxvd1BhZ2luZycsJ2FsbG93UGRmRXhwb3J0JywnYWxsb3dSZW9yZGVyaW5nJywnYWxsb3dSZXNpemluZycsJ2FsbG93Um93RHJhZ0FuZERyb3AnLCdhbGxvd1NlbGVjdGlvbicsJ2FsbG93U29ydGluZycsJ2FsbG93VGV4dFdyYXAnLCdhdXRvQ2hlY2tIaWVyYXJjaHknLCdjaGlsZE1hcHBpbmcnLCdjbGlwTW9kZScsJ2NvbHVtbkNob29zZXJTZXR0aW5ncycsJ2NvbHVtbk1lbnVJdGVtcycsJ2NvbHVtblF1ZXJ5TW9kZScsJ2NvbHVtbnMnLCdjb250ZXh0TWVudUl0ZW1zJywnY29weUhpZXJhcmNoeU1vZGUnLCdjdXJyZW5jeUNvZGUnLCdkYXRhU291cmNlJywnZGV0YWlsVGVtcGxhdGUnLCdlZGl0U2V0dGluZ3MnLCdlbXB0eVJlY29yZFRlbXBsYXRlJywnZW5hYmxlQWRhcHRpdmVVSScsJ2VuYWJsZUFsdFJvdycsJ2VuYWJsZUF1dG9GaWxsJywnZW5hYmxlQ29sbGFwc2VBbGwnLCdlbmFibGVDb2x1bW5TcGFuJywnZW5hYmxlQ29sdW1uVmlydHVhbGl6YXRpb24nLCdlbmFibGVIb3ZlcicsJ2VuYWJsZUh0bWxTYW5pdGl6ZXInLCdlbmFibGVJbW11dGFibGVNb2RlJywnZW5hYmxlSW5maW5pdGVTY3JvbGxpbmcnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJvd1NwYW4nLCdlbmFibGVSdGwnLCdlbmFibGVTdGlja3lIZWFkZXInLCdlbmFibGVWaXJ0dWFsTWFza1JvdycsJ2VuYWJsZVZpcnR1YWxpemF0aW9uJywnZXhwYW5kU3RhdGVNYXBwaW5nJywnZmlsdGVyU2V0dGluZ3MnLCdmcm96ZW5Db2x1bW5zJywnZnJvemVuUm93cycsJ2dyaWRMaW5lcycsJ2hhc0NoaWxkTWFwcGluZycsJ2hlaWdodCcsJ2lkTWFwcGluZycsJ2luZmluaXRlU2Nyb2xsU2V0dGluZ3MnLCdpc1Jvd1NlbGVjdGFibGUnLCdsb2FkQ2hpbGRPbkRlbWFuZCcsJ2xvYWRpbmdJbmRpY2F0b3InLCdsb2NhbGUnLCdwYWdlU2V0dGluZ3MnLCdwYWdlclRlbXBsYXRlJywncGFyZW50SWRNYXBwaW5nJywncHJpbnRNb2RlJywncXVlcnknLCdyb3dEcm9wU2V0dGluZ3MnLCdyb3dIZWlnaHQnLCdyb3dUZW1wbGF0ZScsJ3NlYXJjaFNldHRpbmdzJywnc2VsZWN0ZWRSb3dJbmRleCcsJ3NlbGVjdGlvblNldHRpbmdzJywnc2hvd0NvbHVtbkNob29zZXInLCdzaG93Q29sdW1uTWVudScsJ3NvcnRTZXR0aW5ncycsJ3RleHRXcmFwU2V0dGluZ3MnLCd0b29sYmFyJywndHJlZUNvbHVtbkluZGV4Jywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uQmVnaW4nLCdhY3Rpb25Db21wbGV0ZScsJ2FjdGlvbkZhaWx1cmUnLCdiYXRjaEFkZCcsJ2JhdGNoQ2FuY2VsJywnYmF0Y2hEZWxldGUnLCdiZWZvcmVCYXRjaEFkZCcsJ2JlZm9yZUJhdGNoRGVsZXRlJywnYmVmb3JlQmF0Y2hTYXZlJywnYmVmb3JlQ29weScsJ2JlZm9yZURhdGFCb3VuZCcsJ2JlZm9yZUV4Y2VsRXhwb3J0JywnYmVmb3JlUGFzdGUnLCdiZWZvcmVQZGZFeHBvcnQnLCdiZWZvcmVQcmludCcsJ2JlZ2luRWRpdCcsJ2NlbGxEZXNlbGVjdGVkJywnY2VsbERlc2VsZWN0aW5nJywnY2VsbEVkaXQnLCdjZWxsU2F2ZScsJ2NlbGxTYXZlZCcsJ2NlbGxTZWxlY3RlZCcsJ2NlbGxTZWxlY3RpbmcnLCdjaGVja2JveENoYW5nZScsJ2NvbGxhcHNlZCcsJ2NvbGxhcHNpbmcnLCdjb2x1bW5EcmFnJywnY29sdW1uRHJhZ1N0YXJ0JywnY29sdW1uRHJvcCcsJ2NvbHVtbk1lbnVDbGljaycsJ2NvbHVtbk1lbnVPcGVuJywnY29udGV4dE1lbnVDbGljaycsJ2NvbnRleHRNZW51T3BlbicsJ2NyZWF0ZWQnLCdkYXRhQm91bmQnLCdkYXRhU291cmNlQ2hhbmdlZCcsJ2RhdGFTdGF0ZUNoYW5nZScsJ2RldGFpbERhdGFCb3VuZCcsJ2V4Y2VsQWdncmVnYXRlUXVlcnlDZWxsSW5mbycsJ2V4Y2VsRXhwb3J0Q29tcGxldGUnLCdleGNlbEhlYWRlclF1ZXJ5Q2VsbEluZm8nLCdleGNlbFF1ZXJ5Q2VsbEluZm8nLCdleHBhbmRlZCcsJ2V4cGFuZGluZycsJ2hlYWRlckNlbGxJbmZvJywnbG9hZCcsJ3BkZkFnZ3JlZ2F0ZVF1ZXJ5Q2VsbEluZm8nLCdwZGZFeHBvcnRDb21wbGV0ZScsJ3BkZkhlYWRlclF1ZXJ5Q2VsbEluZm8nLCdwZGZRdWVyeUNlbGxJbmZvJywncHJpbnRDb21wbGV0ZScsJ3F1ZXJ5Q2VsbEluZm8nLCdyZWNvcmREb3VibGVDbGljaycsJ3Jlc2l6ZVN0YXJ0JywncmVzaXplU3RvcCcsJ3Jlc2l6aW5nJywncm93RGF0YUJvdW5kJywncm93RGVzZWxlY3RlZCcsJ3Jvd0Rlc2VsZWN0aW5nJywncm93RHJhZycsJ3Jvd0RyYWdTdGFydCcsJ3Jvd0RyYWdTdGFydEhlbHBlcicsJ3Jvd0Ryb3AnLCdyb3dTZWxlY3RlZCcsJ3Jvd1NlbGVjdGluZycsJ3Rvb2xiYXJDbGljaycsJ2RhdGFTb3VyY2VDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsnZGF0YVNvdXJjZSddO1xuXG4vKipcbiAqIGBlanMtdHJlZWdyaWRgIHJlcHJlc2VudHMgdGhlIEFuZ3VsYXIgVHJlZVRyZWVHcmlkIENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtdHJlZWdyaWQgW2RhdGFTb3VyY2VdPSdkYXRhJyBhbGxvd1BhZ2luZz0ndHJ1ZScgYWxsb3dTb3J0aW5nPSd0cnVlJz48L2Vqcy10cmVlZ3JpZD5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy10cmVlZ3JpZCcsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZENvbHVtbnM6IG5ldyBDb250ZW50Q2hpbGQoQ29sdW1uc0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZEFnZ3JlZ2F0ZXM6IG5ldyBDb250ZW50Q2hpbGQoQWdncmVnYXRlc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZV0pXG5leHBvcnQgY2xhc3MgVHJlZUdyaWRDb21wb25lbnQgZXh0ZW5kcyBUcmVlR3JpZCBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRhY3Rpb25CZWdpbjogYW55O1xuXHRhY3Rpb25Db21wbGV0ZTogYW55O1xuXHRhY3Rpb25GYWlsdXJlOiBhbnk7XG5cdGJhdGNoQWRkOiBhbnk7XG5cdGJhdGNoQ2FuY2VsOiBhbnk7XG5cdGJhdGNoRGVsZXRlOiBhbnk7XG5cdGJlZm9yZUJhdGNoQWRkOiBhbnk7XG5cdGJlZm9yZUJhdGNoRGVsZXRlOiBhbnk7XG5cdGJlZm9yZUJhdGNoU2F2ZTogYW55O1xuXHRiZWZvcmVDb3B5OiBhbnk7XG5cdGJlZm9yZURhdGFCb3VuZDogYW55O1xuXHRiZWZvcmVFeGNlbEV4cG9ydDogYW55O1xuXHRiZWZvcmVQYXN0ZTogYW55O1xuXHRiZWZvcmVQZGZFeHBvcnQ6IGFueTtcblx0YmVmb3JlUHJpbnQ6IGFueTtcblx0YmVnaW5FZGl0OiBhbnk7XG5cdGNlbGxEZXNlbGVjdGVkOiBhbnk7XG5cdGNlbGxEZXNlbGVjdGluZzogYW55O1xuXHRjZWxsRWRpdDogYW55O1xuXHRjZWxsU2F2ZTogYW55O1xuXHRjZWxsU2F2ZWQ6IGFueTtcblx0Y2VsbFNlbGVjdGVkOiBhbnk7XG5cdGNlbGxTZWxlY3Rpbmc6IGFueTtcblx0Y2hlY2tib3hDaGFuZ2U6IGFueTtcblx0Y29sbGFwc2VkOiBhbnk7XG5cdGNvbGxhcHNpbmc6IGFueTtcblx0Y29sdW1uRHJhZzogYW55O1xuXHRjb2x1bW5EcmFnU3RhcnQ6IGFueTtcblx0Y29sdW1uRHJvcDogYW55O1xuXHRjb2x1bW5NZW51Q2xpY2s6IGFueTtcblx0Y29sdW1uTWVudU9wZW46IGFueTtcblx0Y29udGV4dE1lbnVDbGljazogYW55O1xuXHRjb250ZXh0TWVudU9wZW46IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRkYXRhQm91bmQ6IGFueTtcblx0ZGF0YVNvdXJjZUNoYW5nZWQ6IGFueTtcblx0ZGF0YVN0YXRlQ2hhbmdlOiBhbnk7XG5cdGRldGFpbERhdGFCb3VuZDogYW55O1xuXHRleGNlbEFnZ3JlZ2F0ZVF1ZXJ5Q2VsbEluZm86IGFueTtcblx0ZXhjZWxFeHBvcnRDb21wbGV0ZTogYW55O1xuXHRleGNlbEhlYWRlclF1ZXJ5Q2VsbEluZm86IGFueTtcblx0ZXhjZWxRdWVyeUNlbGxJbmZvOiBhbnk7XG5cdGV4cGFuZGVkOiBhbnk7XG5cdGV4cGFuZGluZzogYW55O1xuXHRoZWFkZXJDZWxsSW5mbzogYW55O1xuXHRsb2FkOiBhbnk7XG5cdHBkZkFnZ3JlZ2F0ZVF1ZXJ5Q2VsbEluZm86IGFueTtcblx0cGRmRXhwb3J0Q29tcGxldGU6IGFueTtcblx0cGRmSGVhZGVyUXVlcnlDZWxsSW5mbzogYW55O1xuXHRwZGZRdWVyeUNlbGxJbmZvOiBhbnk7XG5cdHByaW50Q29tcGxldGU6IGFueTtcblx0cXVlcnlDZWxsSW5mbzogYW55O1xuXHRyZWNvcmREb3VibGVDbGljazogYW55O1xuXHRyZXNpemVTdGFydDogYW55O1xuXHRyZXNpemVTdG9wOiBhbnk7XG5cdHJlc2l6aW5nOiBhbnk7XG5cdHJvd0RhdGFCb3VuZDogYW55O1xuXHRyb3dEZXNlbGVjdGVkOiBhbnk7XG5cdHJvd0Rlc2VsZWN0aW5nOiBhbnk7XG5cdHJvd0RyYWc6IGFueTtcblx0cm93RHJhZ1N0YXJ0OiBhbnk7XG5cdHJvd0RyYWdTdGFydEhlbHBlcjogYW55O1xuXHRyb3dEcm9wOiBhbnk7XG5cdHJvd1NlbGVjdGVkOiBhbnk7XG5cdHJvd1NlbGVjdGluZzogYW55O1xuXHR0b29sYmFyQ2xpY2s6IGFueTtcblx0cHVibGljIGRhdGFTb3VyY2VDaGFuZ2U6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRDb2x1bW5zOiBRdWVyeUxpc3Q8Q29sdW1uc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkQWdncmVnYXRlczogUXVlcnlMaXN0PEFnZ3JlZ2F0ZXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnY29sdW1ucycsICdhZ2dyZWdhdGVzJ107XG4gICAgQENvbnRlbnRDaGlsZCgndG9vbGJhclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0b29sYmFyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogSXQgdXNlZCB0byByZW5kZXIgcGFnZXIgdGVtcGxhdGVcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncGFnZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcGFnZXJUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgcm93IHRlbXBsYXRlIHRoYXQgcmVuZGVycyBjdXN0b21pemVkIHJvd3MgZnJvbSB0aGUgZ2l2ZW4gdGVtcGxhdGUuIFxuICAgICAqIEJ5IGRlZmF1bHQsIFRyZWVHcmlkIHJlbmRlcnMgYSB0YWJsZSByb3cgZm9yIGV2ZXJ5IGRhdGEgc291cmNlIGl0ZW0uIFxuICAgICAqID4gKiBJdCBhY2NlcHRzIGVpdGhlciBbdGVtcGxhdGUgc3RyaW5nXSguLi8uLi9jb21tb24vdGVtcGxhdGUvKSBcbiAgICAgKiBvciBIVE1MIGVsZW1lbnQgSUQuIFxuICAgICAqID4gKiBUaGUgcm93IHRlbXBsYXRlIG11c3QgYmUgYSB0YWJsZSByb3cuXG4gICAgICogXG4gICAgICogPiBDaGVjayB0aGUgW1JvdyBUZW1wbGF0ZV0oLi4vLi4vdHJlZWdyaWQvcm93KSBjdXN0b21pemF0aW9uLlxuICAgICAqICAgICBcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdyb3dUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcm93VGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGRldGFpbCB0ZW1wbGF0ZSBhbGxvd3MgeW91IHRvIHNob3cgb3IgaGlkZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFib3V0IGEgcGFydGljdWxhciByb3cuXG4gICAgICogXG4gICAgICogPiBJdCBhY2NlcHRzIGVpdGhlciB0aGUgW3RlbXBsYXRlIHN0cmluZ10oLi4vLi4vY29tbW9uL3RlbXBsYXRlLylcbiAgICAgKm9yIHRoZSBIVE1MIGVsZW1lbnQgSUQuXG4gICAgICogICAgIFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2RldGFpbFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBkZXRhaWxUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2VkaXRTZXR0aW5nc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBlZGl0U2V0dGluZ3NfdGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGVtcHR5IHJlY29yZCB0ZW1wbGF0ZSB0aGF0IHJlbmRlcnMgY3VzdG9taXplZCBlbGVtZW50IG9yIHRleHQgb3IgaW1hZ2UgaW5zdGVhZCBvZiBkaXNwbGF5aW5nIHRoZSBlbXB0eSByZWNvcmQgbWVzc2FnZSBpbiB0aGUgVHJlZUdyaWQuXG4gICAgICogXG4gICAgICogPiBJdCBhY2NlcHRzIGVpdGhlciB0aGUgW3RlbXBsYXRlIHN0cmluZ10oLi4vLi4vY29tbW9uL3RlbXBsYXRlLykgb3IgdGhlIEhUTUwgZWxlbWVudCBJRC5cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2VtcHR5UmVjb3JkVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGVtcHR5UmVjb3JkVGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdjb2x1bW5DaG9vc2VyU2V0dGluZ3NIZWFkZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY29sdW1uQ2hvb3NlclNldHRpbmdzX2hlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnY29sdW1uQ2hvb3NlclNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGNvbHVtbkNob29zZXJTZXR0aW5nc190ZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2NvbHVtbkNob29zZXJTZXR0aW5nc0Zvb3RlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBjb2x1bW5DaG9vc2VyU2V0dGluZ3NfZm9vdGVyVGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZEZpbHRlcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRQYWdlJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFNvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkUmVvcmRlcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRUb29sYmFyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZEFnZ3JlZ2F0ZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRSZXNpemUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkQ29sdW1uTWVudScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRFeGNlbEV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRQZGZFeHBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkQ29tbWFuZENvbHVtbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRDb250ZXh0TWVudScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRFZGl0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFNlbGVjdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRWaXJ0dWFsU2Nyb2xsJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZERldGFpbFJvdycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRSb3dERCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRGcmVlemUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkQ29sdW1uQ2hvb3NlcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRMb2dnZXInKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkSW5maW5pdGVTY3JvbGwnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQ29sdW1ucztcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRBZ2dyZWdhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1sxXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRBZ2dyZWdhdGVzIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=