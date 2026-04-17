import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Gantt } from '@syncfusion/ej2-gantt';
import { ColumnsDirective } from './columns.directive';
import { AddDialogFieldsDirective } from './adddialogfields.directive';
import { EditDialogFieldsDirective } from './editdialogfields.directive';
import { DayWorkingTimeCollectionDirective } from './dayworkingtime.directive';
import { WeekWorkingTimesDirective } from './weekworkingtime.directive';
import { HolidaysDirective } from './holidays.directive';
import { EventMarkersDirective } from './eventmarkers.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-gantt` represents the Angular Gantt Component.
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'></ejs-gantt>
 * ```
 */
export declare class GanttComponent extends Gantt implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    beforeDataBound: any;
    beforeExcelExport: any;
    beforePdfExport: any;
    beforeTooltipRender: any;
    cellDeselected: any;
    cellDeselecting: any;
    cellEdit: any;
    cellSave: any;
    cellSelected: any;
    cellSelecting: any;
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
    dataStateChange: any;
    destroyed: any;
    endEdit: any;
    excelExportComplete: any;
    excelHeaderQueryCellInfo: any;
    excelQueryCellInfo: any;
    expanded: any;
    expanding: any;
    headerCellInfo: any;
    load: any;
    onMouseMove: any;
    onTaskbarClick: any;
    pdfColumnHeaderQueryCellInfo: any;
    pdfExportComplete: any;
    pdfQueryCellInfo: any;
    pdfQueryTaskbarInfo: any;
    pdfQueryTimelineCellInfo: any;
    queryCellInfo: any;
    queryTaskbarInfo: any;
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
    splitterResizeStart: any;
    splitterResized: any;
    splitterResizing: any;
    taskbarEdited: any;
    taskbarEditing: any;
    toolbarClick: any;
    dataSourceChange: any;
    childColumns: QueryList<ColumnsDirective>;
    childAddDialogFields: QueryList<AddDialogFieldsDirective>;
    childEditDialogFields: QueryList<EditDialogFieldsDirective>;
    childDayWorkingTime: QueryList<DayWorkingTimeCollectionDirective>;
    childWeekWorkingTime: QueryList<WeekWorkingTimesDirective>;
    childHolidays: QueryList<HolidaysDirective>;
    childEventMarkers: QueryList<EventMarkersDirective>;
    tags: string[];
    /**
     * Defines a custom template for rendering parent task bars in the Gantt chart. This template allows you to customize the appearance of parent task bars.
     * {% codeBlock src='gantt/parentTaskbarTemplate/index.md' %}{% endcodeBlock %}
     * @default null
     * @asptype string
     */
    parentTaskbarTemplate: any;
    /**
     * Specifies the template used to render custom HTML content in timeline cells.
     * {% codeBlock src='gantt/timelineTemplate/index.md' %}{% endcodeBlock %}
     * @default null
     * @asptype string
     */
    timelineTemplate: any;
    /**
     * Defines a custom template for rendering milestone tasks in the Gantt chart. This template allows you to customize the appearance of milestone tasks.
     * {% codeBlock src='gantt/milestoneTemplate/index.md' %}{% endcodeBlock %}
     * @default null
     * @asptype string
     */
    milestoneTemplate: any;
    /**
     * The task bar template that renders customized child task bars from the given template.
     * This property allows users to define a custom template for rendering child task bars in the Gantt chart.
     * {% codeBlock src='gantt/taskbarTemplate/index.md' %}{% endcodeBlock %}
     * @default null
     * @asptype string
     */
    taskbarTemplate: any;
    editTemplate: any;
    labelSettings_rightLabel: any;
    labelSettings_leftLabel: any;
    labelSettings_taskLabel: any;
    tooltipSettings_taskbar: any;
    tooltipSettings_baseline: any;
    tooltipSettings_connectorLine: any;
    tooltipSettings_editing: any;
    tooltipSettings_timeline: any;
    filter_itemTemplate: any;
    filterTemplate: any;
    /**
     * Defines a custom template to display when the Gantt chart has no records.
     *
     * This template replaces the default empty record message and can include text, HTML elements, or images.
     *Accepts either a template string or an HTML element ID.
     *
     * @default null
     * @asptype string
     */
    emptyRecordTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GanttComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GanttComponent, "ejs-gantt", never, { "addDialogFields": "addDialogFields"; "allowExcelExport": "allowExcelExport"; "allowFiltering": "allowFiltering"; "allowKeyboard": "allowKeyboard"; "allowParentDependency": "allowParentDependency"; "allowPdfExport": "allowPdfExport"; "allowReordering": "allowReordering"; "allowResizing": "allowResizing"; "allowRowDragAndDrop": "allowRowDragAndDrop"; "allowSelection": "allowSelection"; "allowSorting": "allowSorting"; "allowTaskbarDragAndDrop": "allowTaskbarDragAndDrop"; "allowTaskbarOverlap": "allowTaskbarOverlap"; "allowUnscheduledTasks": "allowUnscheduledTasks"; "autoCalculateDateScheduling": "autoCalculateDateScheduling"; "autoFocusTasks": "autoFocusTasks"; "autoUpdatePredecessorOffset": "autoUpdatePredecessorOffset"; "baselineColor": "baselineColor"; "calendarSettings": "calendarSettings"; "collapseAllParentTasks": "collapseAllParentTasks"; "columnMenuItems": "columnMenuItems"; "columns": "columns"; "connectorLineBackground": "connectorLineBackground"; "connectorLineWidth": "connectorLineWidth"; "contextMenuItems": "contextMenuItems"; "dataSource": "dataSource"; "dateFormat": "dateFormat"; "dayWorkingTime": "dayWorkingTime"; "disableHtmlEncode": "disableHtmlEncode"; "durationUnit": "durationUnit"; "editDialogFields": "editDialogFields"; "editSettings": "editSettings"; "emptyRecordTemplate": "emptyRecordTemplate"; "enableAdaptiveUI": "enableAdaptiveUI"; "enableAutoWbsUpdate": "enableAutoWbsUpdate"; "enableContextMenu": "enableContextMenu"; "enableCriticalPath": "enableCriticalPath"; "enableHover": "enableHover"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enableImmutableMode": "enableImmutableMode"; "enableMultiTaskbar": "enableMultiTaskbar"; "enablePersistence": "enablePersistence"; "enablePredecessorValidation": "enablePredecessorValidation"; "enableRtl": "enableRtl"; "enableTimelineVirtualization": "enableTimelineVirtualization"; "enableUndoRedo": "enableUndoRedo"; "enableVirtualMaskRow": "enableVirtualMaskRow"; "enableVirtualization": "enableVirtualization"; "enableWBS": "enableWBS"; "eventMarkers": "eventMarkers"; "filterSettings": "filterSettings"; "frozenColumns": "frozenColumns"; "gridLines": "gridLines"; "height": "height"; "highlightWeekends": "highlightWeekends"; "holidays": "holidays"; "includeWeekend": "includeWeekend"; "labelSettings": "labelSettings"; "loadChildOnDemand": "loadChildOnDemand"; "loadingIndicator": "loadingIndicator"; "locale": "locale"; "milestoneTemplate": "milestoneTemplate"; "parentTaskbarTemplate": "parentTaskbarTemplate"; "projectEndDate": "projectEndDate"; "projectStartDate": "projectStartDate"; "query": "query"; "readOnly": "readOnly"; "renderBaseline": "renderBaseline"; "resourceFields": "resourceFields"; "resourceIDMapping": "resourceIDMapping"; "resourceNameMapping": "resourceNameMapping"; "resources": "resources"; "rowHeight": "rowHeight"; "searchSettings": "searchSettings"; "segmentData": "segmentData"; "selectedRowIndex": "selectedRowIndex"; "selectionSettings": "selectionSettings"; "showColumnMenu": "showColumnMenu"; "showInlineNotes": "showInlineNotes"; "showOverAllocation": "showOverAllocation"; "sortSettings": "sortSettings"; "splitterSettings": "splitterSettings"; "taskFields": "taskFields"; "taskMode": "taskMode"; "taskType": "taskType"; "taskbarHeight": "taskbarHeight"; "taskbarTemplate": "taskbarTemplate"; "timelineSettings": "timelineSettings"; "timelineTemplate": "timelineTemplate"; "timezone": "timezone"; "toolbar": "toolbar"; "tooltipSettings": "tooltipSettings"; "treeColumnIndex": "treeColumnIndex"; "undoRedoActions": "undoRedoActions"; "undoRedoStepsCount": "undoRedoStepsCount"; "updateOffsetOnTaskbarEdit": "updateOffsetOnTaskbarEdit"; "validateManualTasksOnLinking": "validateManualTasksOnLinking"; "viewType": "viewType"; "weekWorkingTime": "weekWorkingTime"; "width": "width"; "workUnit": "workUnit"; "workWeek": "workWeek"; "zoomingLevels": "zoomingLevels"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "beforeDataBound": "beforeDataBound"; "beforeExcelExport": "beforeExcelExport"; "beforePdfExport": "beforePdfExport"; "beforeTooltipRender": "beforeTooltipRender"; "cellDeselected": "cellDeselected"; "cellDeselecting": "cellDeselecting"; "cellEdit": "cellEdit"; "cellSave": "cellSave"; "cellSelected": "cellSelected"; "cellSelecting": "cellSelecting"; "collapsed": "collapsed"; "collapsing": "collapsing"; "columnDrag": "columnDrag"; "columnDragStart": "columnDragStart"; "columnDrop": "columnDrop"; "columnMenuClick": "columnMenuClick"; "columnMenuOpen": "columnMenuOpen"; "contextMenuClick": "contextMenuClick"; "contextMenuOpen": "contextMenuOpen"; "created": "created"; "dataBound": "dataBound"; "dataStateChange": "dataStateChange"; "destroyed": "destroyed"; "endEdit": "endEdit"; "excelExportComplete": "excelExportComplete"; "excelHeaderQueryCellInfo": "excelHeaderQueryCellInfo"; "excelQueryCellInfo": "excelQueryCellInfo"; "expanded": "expanded"; "expanding": "expanding"; "headerCellInfo": "headerCellInfo"; "load": "load"; "onMouseMove": "onMouseMove"; "onTaskbarClick": "onTaskbarClick"; "pdfColumnHeaderQueryCellInfo": "pdfColumnHeaderQueryCellInfo"; "pdfExportComplete": "pdfExportComplete"; "pdfQueryCellInfo": "pdfQueryCellInfo"; "pdfQueryTaskbarInfo": "pdfQueryTaskbarInfo"; "pdfQueryTimelineCellInfo": "pdfQueryTimelineCellInfo"; "queryCellInfo": "queryCellInfo"; "queryTaskbarInfo": "queryTaskbarInfo"; "recordDoubleClick": "recordDoubleClick"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "rowDataBound": "rowDataBound"; "rowDeselected": "rowDeselected"; "rowDeselecting": "rowDeselecting"; "rowDrag": "rowDrag"; "rowDragStart": "rowDragStart"; "rowDragStartHelper": "rowDragStartHelper"; "rowDrop": "rowDrop"; "rowSelected": "rowSelected"; "rowSelecting": "rowSelecting"; "splitterResizeStart": "splitterResizeStart"; "splitterResized": "splitterResized"; "splitterResizing": "splitterResizing"; "taskbarEdited": "taskbarEdited"; "taskbarEditing": "taskbarEditing"; "toolbarClick": "toolbarClick"; "dataSourceChange": "dataSourceChange"; }, ["parentTaskbarTemplate", "timelineTemplate", "milestoneTemplate", "taskbarTemplate", "editTemplate", "labelSettings_rightLabel", "labelSettings_leftLabel", "labelSettings_taskLabel", "tooltipSettings_taskbar", "tooltipSettings_baseline", "tooltipSettings_connectorLine", "tooltipSettings_editing", "tooltipSettings_timeline", "filter_itemTemplate", "filterTemplate", "emptyRecordTemplate", "childColumns", "childAddDialogFields", "childEditDialogFields", "childDayWorkingTime", "childWeekWorkingTime", "childHolidays", "childEventMarkers"], never>;
}
