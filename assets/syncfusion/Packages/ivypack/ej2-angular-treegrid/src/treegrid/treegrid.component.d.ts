import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { ColumnsDirective } from './columns.directive';
import { AggregatesDirective } from './aggregates.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-treegrid` represents the Angular TreeTreeGrid Component.
 * ```html
 * <ejs-treegrid [dataSource]='data' allowPaging='true' allowSorting='true'></ejs-treegrid>
 * ```
 */
export declare class TreeGridComponent extends TreeGrid implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    batchAdd: any;
    batchCancel: any;
    batchDelete: any;
    beforeBatchAdd: any;
    beforeBatchDelete: any;
    beforeBatchSave: any;
    beforeCopy: any;
    beforeDataBound: any;
    beforeExcelExport: any;
    beforePaste: any;
    beforePdfExport: any;
    beforePrint: any;
    beginEdit: any;
    cellDeselected: any;
    cellDeselecting: any;
    cellEdit: any;
    cellSave: any;
    cellSaved: any;
    cellSelected: any;
    cellSelecting: any;
    checkboxChange: any;
    collapsed: any;
    collapsing: any;
    columnDrag: any;
    columnDragStart: any;
    columnDrop: any;
    columnMenuClick: any;
    columnMenuOpen: any;
    contextMenuClick: any;
    contextMenuOpen: any;
    created: any;
    dataBound: any;
    dataSourceChanged: any;
    dataStateChange: any;
    detailDataBound: any;
    excelAggregateQueryCellInfo: any;
    excelExportComplete: any;
    excelHeaderQueryCellInfo: any;
    excelQueryCellInfo: any;
    expanded: any;
    expanding: any;
    headerCellInfo: any;
    load: any;
    pdfAggregateQueryCellInfo: any;
    pdfExportComplete: any;
    pdfHeaderQueryCellInfo: any;
    pdfQueryCellInfo: any;
    printComplete: any;
    queryCellInfo: any;
    recordDoubleClick: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    rowDataBound: any;
    rowDeselected: any;
    rowDeselecting: any;
    rowDrag: any;
    rowDragStart: any;
    rowDragStartHelper: any;
    rowDrop: any;
    rowSelected: any;
    rowSelecting: any;
    toolbarClick: any;
    dataSourceChange: any;
    childColumns: QueryList<ColumnsDirective>;
    childAggregates: QueryList<AggregatesDirective>;
    tags: string[];
    toolbarTemplate: any;
    /**
     * It used to render pager template
     * @default null
     * @asptype string
     */
    pagerTemplate: any;
    /**
     * The row template that renders customized rows from the given template.
     * By default, TreeGrid renders a table row for every data source item.
     * > * It accepts either [template string](../../common/template/)
     * or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [Row Template](../../treegrid/row) customization.
     *
     * @asptype string
     */
    rowTemplate: any;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](../../common/template/)
     *or the HTML element ID.
     *
     * @asptype string
     */
    detailTemplate: any;
    editSettings_template: any;
    /**
     * The empty record template that renders customized element or text or image instead of displaying the empty record message in the TreeGrid.
     *
     * > It accepts either the [template string](../../common/template/) or the HTML element ID.
     *
     * @default null
     * @asptype string
     */
    emptyRecordTemplate: any;
    columnChooserSettings_headerTemplate: any;
    columnChooserSettings_template: any;
    columnChooserSettings_footerTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeGridComponent, "ejs-treegrid", never, { "aggregates": "aggregates"; "allowExcelExport": "allowExcelExport"; "allowFiltering": "allowFiltering"; "allowMultiSorting": "allowMultiSorting"; "allowPaging": "allowPaging"; "allowPdfExport": "allowPdfExport"; "allowReordering": "allowReordering"; "allowResizing": "allowResizing"; "allowRowDragAndDrop": "allowRowDragAndDrop"; "allowSelection": "allowSelection"; "allowSorting": "allowSorting"; "allowTextWrap": "allowTextWrap"; "autoCheckHierarchy": "autoCheckHierarchy"; "childMapping": "childMapping"; "clipMode": "clipMode"; "columnChooserSettings": "columnChooserSettings"; "columnMenuItems": "columnMenuItems"; "columnQueryMode": "columnQueryMode"; "columns": "columns"; "contextMenuItems": "contextMenuItems"; "copyHierarchyMode": "copyHierarchyMode"; "currencyCode": "currencyCode"; "dataSource": "dataSource"; "detailTemplate": "detailTemplate"; "editSettings": "editSettings"; "emptyRecordTemplate": "emptyRecordTemplate"; "enableAdaptiveUI": "enableAdaptiveUI"; "enableAltRow": "enableAltRow"; "enableAutoFill": "enableAutoFill"; "enableCollapseAll": "enableCollapseAll"; "enableColumnSpan": "enableColumnSpan"; "enableColumnVirtualization": "enableColumnVirtualization"; "enableHover": "enableHover"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enableImmutableMode": "enableImmutableMode"; "enableInfiniteScrolling": "enableInfiniteScrolling"; "enablePersistence": "enablePersistence"; "enableRowSpan": "enableRowSpan"; "enableRtl": "enableRtl"; "enableStickyHeader": "enableStickyHeader"; "enableVirtualMaskRow": "enableVirtualMaskRow"; "enableVirtualization": "enableVirtualization"; "expandStateMapping": "expandStateMapping"; "filterSettings": "filterSettings"; "frozenColumns": "frozenColumns"; "frozenRows": "frozenRows"; "gridLines": "gridLines"; "hasChildMapping": "hasChildMapping"; "height": "height"; "idMapping": "idMapping"; "infiniteScrollSettings": "infiniteScrollSettings"; "isRowSelectable": "isRowSelectable"; "loadChildOnDemand": "loadChildOnDemand"; "loadingIndicator": "loadingIndicator"; "locale": "locale"; "pageSettings": "pageSettings"; "pagerTemplate": "pagerTemplate"; "parentIdMapping": "parentIdMapping"; "printMode": "printMode"; "query": "query"; "rowDropSettings": "rowDropSettings"; "rowHeight": "rowHeight"; "rowTemplate": "rowTemplate"; "searchSettings": "searchSettings"; "selectedRowIndex": "selectedRowIndex"; "selectionSettings": "selectionSettings"; "showColumnChooser": "showColumnChooser"; "showColumnMenu": "showColumnMenu"; "sortSettings": "sortSettings"; "textWrapSettings": "textWrapSettings"; "toolbar": "toolbar"; "treeColumnIndex": "treeColumnIndex"; "width": "width"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "batchAdd": "batchAdd"; "batchCancel": "batchCancel"; "batchDelete": "batchDelete"; "beforeBatchAdd": "beforeBatchAdd"; "beforeBatchDelete": "beforeBatchDelete"; "beforeBatchSave": "beforeBatchSave"; "beforeCopy": "beforeCopy"; "beforeDataBound": "beforeDataBound"; "beforeExcelExport": "beforeExcelExport"; "beforePaste": "beforePaste"; "beforePdfExport": "beforePdfExport"; "beforePrint": "beforePrint"; "beginEdit": "beginEdit"; "cellDeselected": "cellDeselected"; "cellDeselecting": "cellDeselecting"; "cellEdit": "cellEdit"; "cellSave": "cellSave"; "cellSaved": "cellSaved"; "cellSelected": "cellSelected"; "cellSelecting": "cellSelecting"; "checkboxChange": "checkboxChange"; "collapsed": "collapsed"; "collapsing": "collapsing"; "columnDrag": "columnDrag"; "columnDragStart": "columnDragStart"; "columnDrop": "columnDrop"; "columnMenuClick": "columnMenuClick"; "columnMenuOpen": "columnMenuOpen"; "contextMenuClick": "contextMenuClick"; "contextMenuOpen": "contextMenuOpen"; "created": "created"; "dataBound": "dataBound"; "dataSourceChanged": "dataSourceChanged"; "dataStateChange": "dataStateChange"; "detailDataBound": "detailDataBound"; "excelAggregateQueryCellInfo": "excelAggregateQueryCellInfo"; "excelExportComplete": "excelExportComplete"; "excelHeaderQueryCellInfo": "excelHeaderQueryCellInfo"; "excelQueryCellInfo": "excelQueryCellInfo"; "expanded": "expanded"; "expanding": "expanding"; "headerCellInfo": "headerCellInfo"; "load": "load"; "pdfAggregateQueryCellInfo": "pdfAggregateQueryCellInfo"; "pdfExportComplete": "pdfExportComplete"; "pdfHeaderQueryCellInfo": "pdfHeaderQueryCellInfo"; "pdfQueryCellInfo": "pdfQueryCellInfo"; "printComplete": "printComplete"; "queryCellInfo": "queryCellInfo"; "recordDoubleClick": "recordDoubleClick"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "rowDataBound": "rowDataBound"; "rowDeselected": "rowDeselected"; "rowDeselecting": "rowDeselecting"; "rowDrag": "rowDrag"; "rowDragStart": "rowDragStart"; "rowDragStartHelper": "rowDragStartHelper"; "rowDrop": "rowDrop"; "rowSelected": "rowSelected"; "rowSelecting": "rowSelecting"; "toolbarClick": "toolbarClick"; "dataSourceChange": "dataSourceChange"; }, ["toolbarTemplate", "pagerTemplate", "rowTemplate", "detailTemplate", "editSettings_template", "emptyRecordTemplate", "columnChooserSettings_headerTemplate", "columnChooserSettings_template", "columnChooserSettings_footerTemplate", "childColumns", "childAggregates"], never>;
}
