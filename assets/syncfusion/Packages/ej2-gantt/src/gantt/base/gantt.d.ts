import { Component, EmitType } from '@syncfusion/ej2-base';
import { Internationalization } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, L10n, ModuleDeclaration } from '@syncfusion/ej2-base';
import { KeyboardEvents, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { RowDragEventArgs } from '@syncfusion/ej2-grids';
import { GanttModel } from './gantt-model';
import { TaskProcessor } from './task-processor';
import { GanttChart } from './gantt-chart';
import { Timeline } from '../renderer/timeline';
import { GanttTreeGrid } from './tree-grid';
import { Toolbar } from '../actions/toolbar';
import { CriticalPath } from '../actions/critical-path';
import { IGanttData, IWorkingTimeRange, IQueryTaskbarInfoEventArgs, BeforeTooltipRenderEventArgs, IDependencyEventArgs, IGanttTaskInfo } from './interface';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-treegrid';
import { ITaskbarEditedEventArgs, IParent, ITaskData, PdfColumnHeaderQueryCellInfoEventArgs } from './interface';
import { ICollapsingEventArgs, CellEditArgs, PdfQueryTimelineCellInfoEventArgs } from './interface';
import { IConnectorLineObject, IValidateArgs, IValidateMode, ITaskAddedEventArgs, IKeyPressedEventArgs, IEventMarkerInfo } from './interface';
import { PdfExportProperties, ISplitterResizedEventArgs } from './interface';
import { ZoomEventArgs, IActionBeginEventArgs, CellSelectingEventArgs, RowDeselectEventArgs, PdfQueryCellInfoEventArgs } from './interface';
import { ITimeSpanEventArgs, ZoomTimelineSettings, QueryCellInfoEventArgs, RowDataBoundEventArgs, RowSelectEventArgs } from './interface';
import { TaskFieldsModel, TimelineSettingsModel, SplitterSettingsModel, SortSettingsModel, CalendarSettingsModel } from '../models/models';
import { EventMarkerModel, AddDialogFieldSettingsModel, EditDialogFieldSettingsModel, EditSettingsModel } from '../models/models';
import { HolidayModel, DayWorkingTimeModel, FilterSettingsModel, SelectionSettingsModel, LoadingIndicatorModel } from '../models/models';
import { LabelSettingsModel } from '../models/models';
import { SearchSettingsModel, ResourceFieldsModel } from '../models/models';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DateProcessor } from './date-processor';
import { ChartRows } from '../renderer/chart-rows';
import { Dependency } from '../task-dependency/dependency';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { Column, ColumnModel } from '../models/column';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { Sort } from '../actions/sort';
import { CellSelectEventArgs, ISelectedCell, ContextMenuItemModel } from '@syncfusion/ej2-grids';
import { CellDeselectEventArgs, IIndex, FailureEventArgs } from '@syncfusion/ej2-grids';
import { HeaderCellInfoEventArgs, ColumnMenuClickEventArgs, ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';
import { ColumnMenuItemModel, ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExportProperties, ExcelExportCompleteArgs, ExcelHeaderQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { RowDD } from '../actions/rowdragdrop';
import { Filter } from '../actions/filter';
import { FilterEventArgs, SortEventArgs, ResizeArgs, ColumnDragEventArgs, BeforeDataBoundArgs } from '@syncfusion/ej2-grids';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
import { ConnectorLine } from '../task-dependency/connector-line';
import { ConnectorLineEdit } from '../task-dependency/connector-line-edit';
import { Edit } from '../actions/edit';
import { Splitter } from './splitter';
import { ResizeEventArgs, ResizingEventArgs } from '@syncfusion/ej2-layouts';
import { TooltipSettingsModel } from '../models/tooltip-settings-model';
import { Tooltip } from '../renderer/tooltip';
import { ToolbarItem, ColumnMenuItem, RowPosition, DurationUnit, SortDirection, GanttAction } from './enum';
import { GridLine, ContextMenuItem, ScheduleMode, ViewType } from './enum';
import { Selection } from '../actions/selection';
import { ExcelExport } from '../actions/excel-export';
import { DayMarkers } from '../actions/day-markers';
import { ContextMenu } from './../actions/context-menu';
import { RowSelectingEventArgs } from './interface';
import { ContextMenuOpenEventArgs as CMenuOpenEventArgs, ContextMenuClickEventArgs as CMenuClickEventArgs } from './interface';
import { ColumnMenu } from '../actions/column-menu';
import { ITaskbarClickEventArgs, RecordDoubleClickEventArgs, IMouseMoveEventArgs } from './interface';
import { PdfExport } from '../actions/pdf-export';
import { WorkUnit, TaskType } from './enum';
import { FocusModule } from '../actions/keyboard';
import { VirtualScroll } from '../actions/virtual-scroll';
import { TaskbarEdit } from '../actions/taskbar-edit';
import { UndoRedo } from '../actions/undo-redo';
import { WeekWorkingTimeModel } from '../models/week-working-time-model';
import { CellSaveArgs } from '@syncfusion/ej2-grids';
import { CalendarModule } from './calendar-module';
import { CalendarContext } from './calendar-context';
/**
 *
 * Represents the Gantt chart component.
 * ```html
 * <div id='gantt'></div>
 * <script>
 *  var ganttObject = new Gantt({
 *      taskFields: { id: 'taskId', name: 'taskName', startDate: 'startDate', duration: 'duration' }
 *  });
 *  ganttObject.appendTo('#gantt');
 * </script>
 * ```
 */
export declare class Gantt extends Component<HTMLElement> implements INotifyPropertyChanged {
    /** @hidden */
    chartPane: HTMLElement;
    /** @hidden */
    treeGridPane: HTMLElement;
    /** @hidden */
    private contentMaskTable;
    /** @hidden */
    private headerMaskTable;
    /** @hidden */
    private isProjectDateUpdated;
    currentSelection: any;
    columnLoop: number;
    private isRowSelected;
    showIndicator: boolean;
    singleTier: number;
    private cyclicValidator;
    private regenerateCycles;
    isVirtualScroll: boolean;
    private isVirtualScrollAction;
    expandedRecords: IGanttData[];
    scrollLeftValue: number;
    isToolBarClick: boolean;
    isLocaleChanged: boolean;
    private triggeredColumnName;
    dataMap: Map<string, IGanttData>;
    initialLoadData: Object;
    previousGanttColumns: ColumnModel[];
    previousZoomingLevel: Object;
    private totalUndoAction;
    previousFlatData: IGanttData[];
    private isExpandPerformed;
    private isCollapsePerformed;
    private oldRecords;
    private updateDuration;
    private isConvertedMilestone;
    private isDynamicDataUpdate;
    private splitterUpdateType;
    private skipOffsetUpdate;
    /** @hidden */
    topBottomHeader: number;
    /** @hidden */
    splitterElement: HTMLElement;
    /** @hidden */
    toolbarModule: Toolbar;
    /** @hidden */
    focusModule: FocusModule;
    /** @hidden */
    ganttChartModule: GanttChart;
    /** @hidden */
    treeGridModule: GanttTreeGrid;
    /** @hidden */
    chartRowsModule: ChartRows;
    /** @hidden */
    connectorLineModule: ConnectorLine;
    taskbarEditModule: TaskbarEdit;
    /** @hidden */
    connectorLineEditModule: ConnectorLineEdit;
    /** @hidden */
    splitterModule: Splitter;
    /** @hidden */
    isCancelled: boolean;
    /** @hidden */
    isCollapseAll: boolean;
    /** @hidden */
    treeGrid: TreeGrid;
    /** @hidden */
    controlId: string;
    /** @hidden */
    ganttHeight: number;
    /** @hidden */
    initialChartRowElements: NodeListOf<Element>;
    /** @hidden */
    ganttWidth: number;
    /** @hidden */
    predecessorModule: Dependency;
    /** @hidden */
    localeObj: L10n;
    /** @hidden */
    dataOperation: TaskProcessor;
    /** @hidden */
    flatData: IGanttData[];
    /** @hidden */
    currentViewData: IGanttData[];
    /** @hidden */
    updatedRecords: IGanttData[];
    /** @hidden */
    ids: string[];
    /** resource-task Ids */
    /** @hidden */
    taskIds: string[];
    /** @hidden */
    previousRecords: object;
    /** @hidden */
    editedRecords: IGanttData[];
    /** @hidden */
    defaultCalendarContext: CalendarContext;
    /** @hidden */
    modifiedRecords: IGanttData[];
    /** @hidden */
    isOnEdit: boolean;
    /** @hidden */
    isOnDelete: boolean;
    /** @hidden */
    isOnAdded: boolean;
    /** @hidden */
    secondsPerDay: number;
    /** @hidden */
    mondaySeconds: number;
    /** @hidden */
    tuesdaySeconds: number;
    /** @hidden */
    wednesdaySeconds: number;
    /** @hidden */
    thursdaySeconds: number;
    /** @hidden */
    fridaySeconds: number;
    /** @hidden */
    saturdaySeconds: number;
    /** @hidden */
    sundaySeconds: number;
    /** @hidden */
    nonWorkingHours: number[];
    /** @hidden */
    mondayNonWorkingHours: number[];
    /** @hidden */
    tuesdayNonWorkingHours: number[];
    /** @hidden */
    wednesdayNonWorkingHours: number[];
    /** @hidden */
    thursdayNonWorkingHours: number[];
    /** @hidden */
    fridayNonWorkingHours: number[];
    /** @hidden */
    saturdayNonWorkingHours: number[];
    /** @hidden */
    sundayNonWorkingHours: number[];
    /** @hidden */
    workingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    mondayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    tuesdayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    wednesdayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    thursdayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    fridayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    saturdayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    sundayWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    nonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    mondayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    tuesdayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    wednesdayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    thursdayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    fridayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    saturdayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    sundayNonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    defaultStartTime?: number;
    /** @hidden */
    defaultEndTime?: number;
    /** @hidden */
    mondayDefaultStartTime?: number;
    /** @hidden */
    tuesdayDefaultStartTime?: number;
    /** @hidden */
    wednesdayDefaultStartTime?: number;
    /** @hidden */
    thursdayDefaultStartTime?: number;
    /** @hidden */
    fridayDefaultStartTime?: number;
    /** @hidden */
    saturdayDefaultStartTime?: number;
    /** @hidden */
    sundayDefaultStartTime?: number;
    /** @hidden */
    mondayDefaultEndTime?: number;
    /** @hidden */
    tuesdayDefaultEndTime?: number;
    /** @hidden */
    wednesdayDefaultEndTime?: number;
    /** @hidden */
    thursdayDefaultEndTime?: number;
    /** @hidden */
    fridayDefaultEndTime?: number;
    /** @hidden */
    saturdayDefaultEndTime?: number;
    /** @hidden */
    sundayDefaultEndTime?: number;
    /** @hidden */
    nonWorkingDayIndex?: number[];
    /** @hidden */
    durationUnitTexts?: Object;
    /** @hidden */
    durationUnitEditText?: Object;
    /** @hidden */
    isMileStoneEdited?: Object;
    /** @hidden */
    chartVerticalLineContainer?: HTMLElement;
    /** @hidden */
    updatedConnectorLineCollection?: IConnectorLineObject[];
    /** @hidden */
    connectorLineIds?: string[];
    /** @hidden */
    predecessorsCollection?: IGanttData[];
    /** @hidden */
    isInPredecessorValidation?: boolean;
    /** @hidden */
    isValidationEnabled?: boolean;
    /** @hidden */
    isLoad?: boolean;
    /** @hidden */
    editedPredecessorRecords?: IGanttData[];
    /** @hidden */
    validationDialogElement?: Dialog;
    /** @hidden */
    currentEditedArgs?: IValidateArgs;
    /** @hidden */
    dialogValidateMode?: IValidateMode;
    /** @hidden */
    constraintViolationType?: any;
    /** @hidden */
    perDayWidth?: number;
    /** @hidden */
    zoomingProjectStartDate?: Date;
    /** @hidden */
    zoomingProjectEndDate?: Date;
    /** @hidden */
    cloneProjectStartDate?: Date;
    /** @hidden */
    cloneProjectEndDate?: Date;
    /** @hidden */
    cloneTimelineStartDate?: Date;
    /** @hidden */
    cloneTimelineEndDate?: Date;
    /** @hidden */
    totalHolidayDates?: number[];
    /** @hidden */
    columnMapping?: {
        [key: string]: string;
    };
    /** @hidden */
    ganttColumns: ColumnModel[];
    /** @hidden */
    isExpandCollapseLevelMethod: boolean;
    /** @hidden */
    private isFromEventMarker;
    /** @hidden */
    isDynamicData: boolean;
    /** @hidden */
    contentHeight: number;
    /** @hidden */
    isAdaptive: Boolean;
    /**
     * The `sortModule` is used to manipulate sorting operation in Gantt.
     */
    sortModule: Sort;
    /**
     * The `filterModule` is used to manage and apply filtering operations in the Gantt chart.
     */
    filterModule: Filter;
    /** @hidden */
    scrollBarLeft: number;
    /** @hidden */
    isTimelineRoundOff: boolean;
    /** @hidden */
    columnByField: Object;
    /** @hidden */
    customColumns: string[];
    /**
     * The `editModule` handles the manipulation of Gantt chart records, including editing, updating, and deleting tasks.
     */
    editModule: Edit;
    /**
     * The `selectionModule` is used to manipulate selection operation in the Gantt chart.
     */
    selectionModule: Selection;
    /**
     * The `virtualScrollModule` is used to handle virtual scroll in Gantt.
     */
    virtualScrollModule: VirtualScroll;
    /**
     * The `excelExportModule` is used for exporting Gantt data to an Excel file.
     * This module provides the functionality to export task data, dependencies, and other Gantt-related information in Excel format.
     */
    excelExportModule: ExcelExport;
    /**
     * The `rowDragAndDropModule` manages the row reordering functionality in the Gantt chart.
     * It allows users to drag and drop rows to reorder tasks within the Gantt chart view.
     */
    rowDragAndDropModule: RowDD;
    /**
     * The `dayMarkersModule` is used to manage and manipulate event markers in the Gantt chart.
     * It allows customization of how markers are displayed on specific days, helping to highlight important dates or milestones.
     */
    dayMarkersModule: DayMarkers;
    /**
     * The `criticalPathModule` is used to determine the critical path in the Gantt chart.
     * It identifies the sequence of tasks that directly affect the project's duration and highlights them.
     */
    criticalPathModule: CriticalPath;
    /**
     * The `undoRedoModule` manages the undo and redo functionality in the Gantt chart.
     */
    undoRedoModule: UndoRedo;
    /** @hidden */
    isConnectorLineUpdate: boolean;
    /** @hidden */
    tooltipModule: Tooltip;
    /** @hidden */
    globalize: Internationalization;
    /** @hidden */
    keyConfig: {
        [key: string]: string;
    };
    /**
     * The `keyboardModule` is responsible for managing keyboard interactions in the Gantt chart.
     * It handles events such as navigating, selecting, and performing actions using the keyboard.
     */
    keyboardModule: KeyboardEvents;
    /**
     * The `contextMenuModule` is responsible for managing and invoking the context menu in the Gantt chart.
     * It provides the functionality to display and interact with the context menu, which can be customized using the `contextMenuItems` property.
     */
    contextMenuModule: ContextMenu;
    /**
     * The `columnMenuModule` is used to manage and customize the column menu in the Gantt chart.
     */
    columnMenuModule: ColumnMenu;
    /**
     * The `pdfExportModule` is used for exporting the Gantt chart data to a PDF format.
     * This module provides functionality for exporting the entire chart or specific data to a PDF document.
     */
    pdfExportModule: PdfExport;
    /** @hidden */
    staticSelectedRowIndex: number;
    protected needsID: boolean;
    /** @hidden */
    showActiveElement: boolean;
    /** @hidden */
    addDeleteRecord: boolean;
    /** @hidden */
    enableHeaderFocus: boolean;
    /** @hidden */
    enableValidation: boolean;
    /**
     * Determines whether to automatically validate and update predecessor offsets in the IPredecessor collection and columns during initial load.
     * When true, ensures data consistency with rendering validations.
     *
     * @default false
     */
    autoUpdatePredecessorOffset: boolean;
    /**
     * Enables or disables keyboard interactions in the Gantt chart.
     *
     * @default true
     */
    allowKeyboard: boolean;
    /**
     * If `enableImmutableMode` is set to true, the Gantt Chart will reuse existing rows from previous results instead of
     * performing a full refresh when Gantt actions are executed.
     *
     * @default false
     */
    enableImmutableMode: boolean;
    /**
     * Specifies whether dependency connections are supported for parent tasks.
     * Only allows dependencies between tasks belonging to different parents.
     * Dependencies within the same parent are not supported.
     *
     * @default true
     */
    allowParentDependency: boolean;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the TreeGrid component.
     * If `enableHtmlSanitizer` set to true, any potentially harmful strings and scripts are sanitized before rendering.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * If `disableHtmlEncode` is set to `true`, the Gantt component disables HTML entity encoding across the Gantt content, allowing custom HTML elements to be rendered.
     *
     * @default true
     */
    disableHtmlEncode: boolean;
    /**
     * Specifies the type of loading indicator to display during scrolling action in the virtual scrolling feature when `enableVirtualization` is enabled.
     *
     * @default {indicatorType: 'Spinner'}
     */
    loadingIndicator: LoadingIndicatorModel;
    /**
     * Specifies whether to display a shimmer effect during scrolling in the virtual scrolling feature when `enableVirtualization` is enabled. If disabled, a spinner is shown instead of the shimmer effect.
     *
     * @default true
     */
    enableVirtualMaskRow: boolean;
    /**
     * Gets or sets whether to load child records on demand in remote data binding. When `loadChildOnDemand` set to true, child records are loaded only when expanded, and parent records are rendered in a collapsed state initially.
     *
     * @default true
     */
    loadChildOnDemand: boolean;
    /**
     * Specifies whether to update offset value on a task for all the predecessor edit actions.
     *
     * @default true
     */
    updateOffsetOnTaskbarEdit: boolean;
    /**
     * Specifies whether to auto calculate the start and end dates based on factors such as working time, holidays, weekends, and task dependencies.
     *
     * @default true
     */
    autoCalculateDateScheduling: boolean;
    /**
     *  Specifies whether to automatically scroll the corresponding taskbar into view when a task is selected.
     *
     * @default true
     */
    autoFocusTasks: boolean;
    /**
     * Specifies whether to enable an adaptive UI mode, which optimizes the layout of pop-ups for filtering, editing, and other features on smaller screens, such as mobile devices.     *
     * @default false
     */
    enableAdaptiveUI: boolean;
    /**
     * Enables Work Breakdown Structure (WBS) functionality in the Gantt Chart.
     * When set to true, the Gantt Chart automatically generates WBS codes based on the task hierarchy.
     * A dedicated WBS Code column will be shown to represent the task structure.
     * Additionally, if task dependencies (predecessors) are mapped in the data source, a WBS Predecessor column will also be displayed to reflect dependency information using WBS codes.
     *
     * @default false
     */
    enableWBS: boolean;
    /**
     * Enables the automatic update of WBS codes when performing actions like sorting, filtering, row drag and drop, and other grid operations that change the task order or hierarchy.
     * When set to true, the Gantt component will refresh and regenerate the WBS codes dynamically after such actions to ensure the codes remain in sync with the current task structure.
     *
     * @default false
     */
    enableAutoWbsUpdate: boolean;
    /**
     * Specifies whether to enable row selection in the Gantt chart. When enabled, selected rows are highlighted.
     *
     * @default true
     */
    allowSelection: boolean;
    /**
     * If `enableHover` is set to true, it enables hover in the Gantt chart and highlights the rows, chart rows, header cells and timeline cells.
     *
     * @default false
     */
    enableHover: boolean;
    /**
     * If `allowSorting` is set to true, it enables sorting of Gantt chart tasks when the column header is clicked.
     *
     * @default false
     */
    allowSorting: boolean;
    /**
     * If `enablePredecessorValidation` is set to true, enables validation for predecessor links in the Gantt chart.
     *
     * @default true
     */
    enablePredecessorValidation: boolean;
    /**
     * If `showColumnMenu` set to true, enables the column menu options for each column header in the Gantt chart.
     *
     * @default false
     */
    showColumnMenu: boolean;
    /**
     * `columnMenuItems` defines both built-in and custom menu items for the Gantt chart column menu.
     * <br><br>
     * The available built-in items are,
     * * `ColumnChooser` - To show/hide the TreeGrid columns.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the size of the current column.
     * * `Filter` - Displays filter options based on the `filterSettings` property.
     *
     * @default null
     */
    columnMenuItems: (ColumnMenuItem | ColumnMenuItemModel)[];
    /**
     * `undoRedoActions` Defines action items that retain for undo and redo operation.
     *
     * @default ['Sorting', 'Add', 'ColumnReorder', 'ColumnResize', 'ColumnState', 'Delete', 'Edit', 'Filtering', 'Indent', 'Outdent', 'NextTimeSpan', 'PreviousTimeSpan', 'RowDragAndDrop', 'TaskbarDragAndDrop', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit']
     */
    undoRedoActions: GanttAction[];
    /**
     * Specifies the time zone used for task date and scheduling calculations in the Gantt chart.
     * By default, the system or browser time zone is applied.
     *
     * The time zone always affects internal date calculations (e.g., task start/end times, durations, and dependencies),
     * even in non-hour views. However, visible changes in timeline and task positions only appear when the timeline
     * includes an hour-level mode.
     *
     * To see the time zone reflected in the UI, configure one of these:
     *   - `timelineViewMode: 'Hour'`
     *   - or `topTier.unit: 'Day'` + `bottomTier.unit: 'Hour'`
     *
     * Without an hour view (e.g., only Day/Week/Month views), the chart looks unchanged, but Gantt chart uses the new time zone.
     *
     * Use standard IANA time zone names (e.g., 'Asia/Kolkata', 'UTC', 'America/New_York').
     *
     * @default null
     */
    timezone: string;
    /**
     * Defines whether all root tasks should be rendered in a collapsed state. When `collapseAllParentTasks` set to true, all parent tasks will be collapsed by default.
     *
     * @default false
     */
    collapseAllParentTasks: boolean;
    /**
     * If `highlightWeekends` is set to true, it highlights all weekend days in the week-day timeline mode.
     * This makes weekends visually distinct in the timeline view.
     *
     * @default false
     */
    highlightWeekends: boolean;
    /**
     * To define expander column index in Grid.
     *
     * @default 0
     * @aspType int
     */
    treeColumnIndex: number;
    /**
     * Defines the data source for the Gantt chart, which is used to render rows and tasks.
     * The `dataSource` can be an array of JavaScript objects, an instance of `DataManager`, or a single object.
     * The array of objects should contain the task data with properties such as `TaskID`, `TaskName`, `StartDate`, `EndDate`, etc.
     * This allows dynamic binding of tasks and their relationships (e.g., dependencies, subtasks, progress) to the Gantt chart.
     * {% codeBlock src='gantt/dataSource/index.md' %}{% endcodeBlock %}
     *
     * @isGenericType true
     * @default []
     */
    dataSource: Object[] | DataManager | Object;
    /**
     * `durationUnit` Specifies the duration unit for each task. The available options are:
     * * `day`: Sets the duration unit to day.
     * * `hour`: Sets the duration unit to hour.
     * * `minute`: Sets the duration unit to minute.
     *
     * @default day
     */
    durationUnit: DurationUnit;
    /**
     * Defines an external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed in conjunction with data processing to filter, sort the data.
     * This allows for advanced data manipulation before binding the data to the Gantt chart.
     * {% codeBlock src='gantt/query/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    query: Query;
    /**
     * Specifies the date format for displaying dates in the Gantt chart, including in tooltips and grid cells.
     * By default, the format is determined based on the current culture/locale settings.
     */
    dateFormat: string;
    /**
     * Defines the height of the Gantt component container.
     * The `height` property can be set to a specific value (in pixels or percentage) or set to 'auto' for automatic height adjustment based on content.
     *
     * @default 'auto'
     */
    height: number | string;
    /**
     * If `renderBaseline` is set to `true`, baselines will be rendered for tasks in the Gantt chart.
     * Baselines provide a visual reference to track the planned vs. actual progress of tasks.
     *
     * @default false
     */
    renderBaseline: boolean;
    /**
     * Defines the calendar configuration for the project, including working times, holidays, and task-specific calendars.
     *
     * This setting enables customization of scheduling behavior across the Gantt chart, including:
     * - Global working hours and non-working days
     * - Holiday definitions with localized labels
     * - Task-level calendar overrides via `taskFields.calendarId`
     *
     * @default {}
     */
    calendarSettings: CalendarSettingsModel;
    /**
     * Specifies whether taskbar drag and drop is enabled in the Gantt chart.
     *
     * @default false
     */
    allowTaskbarDragAndDrop: boolean;
    /**
     * Specifies whether taskbars can overlap in the Gantt chart. To enable overlapping behavior, use this property along with `enableMultiTaskbar`.
     *
     * @default true
     */
    allowTaskbarOverlap: boolean;
    /**
     * Configures the grid lines displayed in the TreeGrid and Gantt chart.
     * The `gridLines` property allows customization of the type of grid lines to be shown, either horizontal, vertical, both or none.
     *
     * * `Both`: Displays both horizontal and vertical grid lines.
     * * `None`: Hides both horizontal and vertical grid lines.
     * * `Horizontal`: Displays only horizontal grid lines.
     * * `Vertical`: Displays only vertical grid lines.
     * * `Default`: Adjusts line visibility based on the theme.
     *
     *  @default 'Horizontal'
     */
    gridLines: GridLine;
    /**
     * Configures the labels displayed on the right, left, and inside the taskbars in the Gantt chart.
     * {% codeBlock src='gantt/labelSettings/index.md' %}{% endcodeBlock %}
     */
    labelSettings: LabelSettingsModel;
    /**
     * The task bar template that renders customized child task bars from the given template.
     * This property allows users to define a custom template for rendering child task bars in the Gantt chart.
     * {% codeBlock src='gantt/taskbarTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @aspType string
     */
    taskbarTemplate: string | Function;
    /**
     * Defines a custom template for rendering parent task bars in the Gantt chart. This template allows you to customize the appearance of parent task bars.
     * {% codeBlock src='gantt/parentTaskbarTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @aspType string
     */
    parentTaskbarTemplate: string | Function;
    /**
     * Specifies the template used to render custom HTML content in timeline cells.
     * {% codeBlock src='gantt/timelineTemplate/index.md' %}{% endcodeBlock %}
     * @default null
     * @aspType string
     */
    timelineTemplate: string | Function;
    /**
     * Defines a custom template for rendering milestone tasks in the Gantt chart. This template allows you to customize the appearance of milestone tasks.
     * {% codeBlock src='gantt/milestoneTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @aspType string
     */
    milestoneTemplate: string | Function;
    /**
     * Specifies the color of the baseline bar in the Gantt chart.
     * {% codeBlock src='gantt/baselineColor/index.md' %}{% endcodeBlock %}
     *
     *  @default null
     */
    baselineColor: string;
    /**
     * Defines the width of the Gantt component container.
     *
     * @default 'auto'
     */
    width: number | string;
    /**
     * If `enableVirtualization` is set to true, the Gantt chart will render only the rows visible within the viewport.
     * and load subsequent rows as the user scrolls vertically. This improves performance when dealing with large datasets.
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * Enables better performance for projects with a large time span by initially rendering only the visible timeline cells when `enableVirtualization` is enabled.
     * Subsequent cells are loaded on horizontal scrolling.
     *
     * @default false
     */
    enableTimelineVirtualization: boolean;
    /**
     * `toolbar` defines the toolbar items of the Gantt.
     * It contains built-in and custom toolbar items.
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the Gantt's toolbar.
     * <br>
     * The available built-in toolbar items are:
     * * Add: Adds a new record.
     * * Edit: Edits the selected task.
     * * Update: Updates the edited task.
     * * Delete: Deletes the selected task.
     * * Cancel: Cancels the edit state.
     * * Search: Searches tasks by the given key.
     * * ExpandAll: Expands all the task of Gantt.
     * * CollapseAll: Collapses all the task of Gantt.
     * * PrevTimeSpan: Extends timeline with one unit before the timeline start date.
     * * NextTimeSpan: Extends timeline with one unit after the timeline finish date.
     * * ZoomIn: ZoomIn the Gantt control.
     * * ZoomOut: ZoomOut the Gantt control.
     * * ZoomToFit: Display the all tasks within the viewable Gantt chart.
     * * ExcelExport: To export in Excel format.
     * * CsvExport : To export in CSV format.
     * * Indent: To indent a task to one level.
     * * Outdent: To outdent a task from one level.
     *
     * @default null
     */
    toolbar: (ToolbarItem | string | ItemModel)[];
    /**
     * Specifies the project's workweek (working days).
     * `workWeek` specifies the days of the week that are considered working days for the project.
     *
     * @default ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
     */
    workWeek: string[];
    /**
     * Specifies whether weekend days are considered working days in the Gantt chart.
     * When `includeWeekend` is set to true, weekends (Saturday and Sunday) are treated as regular working days.
     *
     * @default false
     */
    includeWeekend: boolean;
    /**
     * Enables or disables the rendering of unscheduled tasks in the Gantt chart.
     * When `allowUnscheduledTasks` set to true, unscheduled tasks will be displayed in the chart.
     *
     * @default false
     */
    allowUnscheduledTasks: boolean;
    /**
     * To show notes column cell values inside the cell or in tooltip.
     *
     * @default false
     */
    showInlineNotes: boolean;
    /**
     * Defines the height of grid and chart rows in the Gantt chart.
     * This property sets the vertical space allocated for each task or row, allowing customization of row sizes.
     *
     * @default 36
     * @aspType int
     */
    rowHeight: number;
    /**
     * Defines height of the taskbar element in the Gantt chart.
     *
     * @default null
     * @aspType int?
     */
    taskbarHeight: number;
    /**
     * Defines the start date of the project. If the `projectStartDate` is not set, it will be automatically calculated based on the data source.
     * The date can be provided as a `Date` object or a string in a valid date format.
     *
     * @default null
     */
    projectStartDate: Date | string;
    /**
     * Defines the end date of the project. If the `projectEndDate` is not set, it will be automatically calculated based on the data source.
     * The date can be provided as a `Date` object or a string in a valid date format.
     *
     * @default null
     */
    projectEndDate: Date | string;
    /**
     * Defines the mapping property to retrieve the resource ID value from the resource collection.
     * This is used to map the resource ID from the resource data to the Gantt chart for resource allocation.
     * {% codeBlock src='gantt/resources/index.md' %}{% endcodeBlock %}
     * @default null
     */
    resourceIDMapping: string;
    /**
     * Defines the mapping property to retrieve the resource name value from the resource collection.
     * This is used to map the resource name from the resource data to the Gantt chart for task allocation.
     * {% codeBlock src='gantt/resources/index.md' %}{% endcodeBlock %}
     * @default null
     */
    resourceNameMapping: string;
    /**
     * Specifies the collection of resources assigned to the project.
     *
     * @default []
     */
    resources: object[];
    /**
     * Specifies the array of segment objects assigned to tasks in the Gantt chart.
     * Each segment represents a portion of the taskbar, allowing for visual representation of different phases or sub-tasks within a single task.
     *
     * @default []
     */
    segmentData: object[];
    /**
     * Specifies the background color of dependency (connector) lines in the Gantt chart.
     * Accepts any valid CSS color value (for example: "red", "#FF5733", "rgb(255, 0, 0)").
     *
     * @default null
     */
    connectorLineBackground: string;
    /**
     * Defines the width of the dependency lines in the Gantt chart.
     * The value should be a positive integer, representing the thickness of the lines.
     *
     * @default 1
     * @aspType int
     */
    connectorLineWidth: number;
    /**
     * Defines the collection of columns displayed in the Gantt chart grid.
     * If the `columns` declaration is empty, the columns are automatically populated based on the `taskSettings` values.
     * {% codeBlock src='gantt/columns/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    columns: Column[] | string[] | ColumnModel[];
    /**
     * Defines the tabs and fields to be displayed in the add dialog.
     * If not specified, the fields will be derived from the `taskSettings` and `columns` values.
     * {% codeBlock src='gantt/addDialogFields/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    addDialogFields: AddDialogFieldSettingsModel[];
    /**
     * Defines the tabs and fields to be displayed in the edit dialog.
     * If not specified, the fields will be derived from the `taskSettings` and `columns` values.
     * {% codeBlock src='gantt/editDialogFields/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    editDialogFields: EditDialogFieldSettingsModel[];
    /**
     * The `selectedRowIndex` allows you to specify the index of the row to be selected at the time of initial rendering.
     * It can also be used to get the currently selected row index after selection.
     * A value of `-1` indicates no row is selected.
     *
     * @default -1
     * @aspType int
     */
    selectedRowIndex: number;
    /**
     * `workUnit` Specifies the work unit for each tasks whether day or hour or minute.
     * * `day`: Sets the work unit as day.
     * * `hour`: Sets the work unit as hour.
     * * `minute`: Sets the work unit as minute.
     *
     * @default hour
     */
    workUnit: WorkUnit;
    /**
     * `taskType` Specifies the task type for task whether fixedUnit or fixedWork or fixedDuration.
     * * `fixedUnit`: Sets the task type as fixedUnit.
     * * `fixedWork`: Sets the task type as fixedWork.
     * * `fixedDuration`: Sets the task type as fixedDuration.
     *
     * @default fixedUnit
     */
    taskType: TaskType;
    /**
     * Specifies the view type of the Gantt chart.
     *
     *  @default 'ProjectView'
     */
    viewType: ViewType;
    /**
     * Defines the customized working time for the project to ensure accurate task scheduling, and works only when the timeline is configured with topTier.unit as 'Day' and bottomTier.unit as 'Hour' or when `timelineViewMode` is set to 'Hour' or 'Day'.
     *
     * {% codeBlock src='gantt/dayWorkingTime/index.md' %}{% endcodeBlock %}
     */
    dayWorkingTime: DayWorkingTimeModel[];
    /**
     * Specifies the working days in a week for accurate planning, and works only when the timeline is configured with topTier.unit as 'Day' and bottomTier.unit as 'Hour' or when `timelineViewMode` is set to 'Hour' or 'Day'.
     */
    weekWorkingTime: WeekWorkingTimeModel[];
    /**
     * Defines holidays within the project timeline, allowing you to mark specific dates as holidays.
     * This helps in accounting for non-working days in scheduling and task planning.
     * {% codeBlock src='gantt/holidays/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    holidays: HolidayModel[];
    /**
     * Defines the events and milestones along the project timeline.
     * These event markers indicate significant events or milestones throughout the project's duration.
     * {% codeBlock src='gantt/eventMarkers/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    eventMarkers: EventMarkerModel[];
    /**
     * Defines the mapping properties used to extract task-related values—such as ID, start date, end date, duration, and progress—from the data source.
     * This ensures that the Gantt chart correctly maps the provided data to the corresponding task fields and renders them accurately.
     * {% codeBlock src='gantt/taskFields/index.md' %}{% endcodeBlock %}
     */
    taskFields: TaskFieldsModel;
    /**
     * Defines the mapping properties to extract resource values, such as `id`, `name`, `unit`, and `group` from the resource collection in the Gantt chart.
     * This helps to map data from a custom resource collection to the appropriate fields for resource allocation.
     */
    resourceFields: ResourceFieldsModel;
    /**
     * Configures timeline settings of Gantt.
     * Defines default timeline modes or customized top tier mode and bottom tier mode or single tier only.
     * {% codeBlock src='gantt/timelineSettings/index.md' %}{% endcodeBlock %}
     */
    timelineSettings: TimelineSettingsModel;
    /**
     * Defines the available zoom levels for the Gantt timeline.
     * Provide an array of ZoomTimelineSettings to control the scale and intervals used when zooming.
     *
     * @default []
     */
    zoomingLevels: ZoomTimelineSettings[];
    /**
     * Specifies the current zooming level of the Gantt chart.
     */
    currentZoomingLevel: ZoomTimelineSettings;
    /**
     * Configures the sorting options for the Gantt chart.
     * When set, it defines how tasks are sorted based on the specified columns.
     * {% codeBlock src='gantt/sortSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {columns:[]}
     */
    sortSettings: SortSettingsModel;
    /**
     * Configures the edit settings for the Gantt chart, such as enabling or disabling task modifications.
     * {% codeBlock src='gantt/editSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { allowAdding: false, allowEditing: false, allowDeleting: false, mode:'Auto',
     * showDeleteConfirmDialog: false }
     */
    editSettings: EditSettingsModel;
    /**
     * Enables or disables default tooltip of Gantt element and defines customized tooltip for Gantt elements.
     * {% codeBlock src='gantt/tooltipSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { showTooltip: true }
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Configures the settings for selection in the Gantt chart.
     * {% codeBlock src='gantt/selectionSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {mode: 'Row', type: 'Single'}
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Enables or disables filtering functionality in the Gantt chart.
     *
     * @default false
     */
    allowFiltering: boolean;
    /**
     * Enables exporting the Gantt chart to Excel (.xlsx) and CSV formats.
     * When set to true, users can export the chart data.
     *
     * @default false
     */
    allowExcelExport: boolean;
    /**
     * If `allowRowDragAndDrop` set to true, then it will allow the user to perform row drag and drop action in Gantt chart.
     *
     * @default false
     */
    allowRowDragAndDrop: boolean;
    /**
     * If `allowReordering` is set to true, Gantt chart columns can be reordered.
     * Reordering can be done by drag and drop of a particular column from one index to another index.
     *
     * @default false
     */
    allowReordering: boolean;
    /**
     * If `readOnly` is set to true, the Gantt chart becomes read-only, meaning tasks and other elements cannot be edited.
     * This setting disables all editing features, including task updates, dependency management, and any editing acions.
     *
     * @default false
     */
    readOnly: boolean;
    /**
     * Enables column resizing in the Gantt chart when `allowResizing` is set to true.
     * When enabled, users can adjust the width of columns by dragging the column borders.
     *
     * @default false
     */
    allowResizing: boolean;
    /**
     * If `enableContextMenu` is set to true, enables the context menu in the Gantt chart.
     * The context menu provides additional actions that can be accessed by right-clicking on Gantt chart elements
     *
     * @default false
     */
    enableContextMenu: boolean;
    /**
     * Enables the highlighting of critical tasks in the Gantt Chart that directly affect the project's end date.
     * When enabled, tasks that are critical to the project timeline will be visually distinguished by colours.
     *
     * @default false
     */
    enableCriticalPath: boolean;
    /**
     * `enableUndoRedo` enables or disables the undo/redo functionality in the Gantt chart.
     * Enables undo and redo in the Gantt chart. When set to true, users can
     * revert or reapply recent changes.
     *
     * @default false
     */
    enableUndoRedo: boolean;
    /**
     * Specifies the number of undo and redo actions to retain in history.
     *
     * @default 10
     */
    undoRedoStepsCount: number;
    /**
     * Defines the built-in and custom items that appear in the context menu of the Gantt chart.
     * You can use this property to control the content and functionality of the right-click context menu.
     * {% codeBlock src='gantt/contextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    contextMenuItems: ContextMenuItem[] | ContextMenuItemModel[];
    /**
     * If `allowPdfExport` set to true, then it will allow the user to export Gantt chart to PDF file.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * If `validateManualTasksOnLinking` is set to true,
     * it enables date validation while connecting manually scheduled tasks with predecessor.
     *
     * @default false
     */
    validateManualTasksOnLinking: boolean;
    /**
     * Enables the rendering of child taskbars on the parent row when it is in a collapsed state in the Gantt chart.
     *
     * @default false
     */
    enableMultiTaskbar: boolean;
    /**
     * If `showOverAllocation` set to `true`, enables the rendering of the overallocation container in the Gantt chart.
     *
     * @default false
     */
    showOverAllocation: boolean;
    /**
     * Specifies task schedule mode for a project.
     *
     * @default 'Auto'
     */
    taskMode: ScheduleMode;
    /**
     * Specifies the number of columns that should remain visible and fixed on the left side of the Gantt during horizontal scrolling.
     * This feature ensures key columns, such as identifiers, stay visible while users scroll through data.
     *
     * @default 0
     */
    frozenColumns: number;
    /**
     * Defines a custom template to display when the Gantt chart has no records.
     *
     * This template replaces the default empty record message and can include text, HTML elements, or images.
     * Accepts either a template string or an HTML element ID.
     *
     * @default null
     * @aspType string
     */
    emptyRecordTemplate: string | Function;
    /**
     * Configures the filter settings for the Gantt chart, enabling users to filter tasks based on specific columns or criteria.
     * The `filterSettings` property allows customization of filter behavior, such as which columns to filter and the filter type.
     * {% codeBlock src='gantt/filterSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {columns: [], type: 'Menu' }
     */
    filterSettings: FilterSettingsModel;
    /**
     * Configures the search functionality within the Gantt chart.
     * {% codeBlock src='gantt/searchSettings/index.md' %}{% endcodeBlock %}
     */
    searchSettings: SearchSettingsModel;
    /**
     * Configures the splitter settings for the Gantt chart.
     * {% codeBlock src='gantt/splitterSettings/index.md' %}{% endcodeBlock %}
     *
     * The `position` takes precedence over `columnIndex` when both defined.
     */
    splitterSettings: SplitterSettingsModel;
    /**
     * @private
     */
    timelineModule: Timeline;
    /**
     * @private
     */
    dateValidationModule: DateProcessor;
    /**
     * @private
     */
    calendarModule: CalendarModule;
    /**
     * @private
     */
    isTreeGridRendered: boolean;
    /**
     * @private
     */
    isFromOnPropertyChange: boolean;
    /**
     * @private
     */
    isFromRenderBaseline: boolean;
    /**
     * @private
     */
    isGanttChartRendered: boolean;
    /**
     * @private
     */
    isEdit: boolean;
    /**
     * Event triggered per taskbar before rendering in the Gantt chart.
     * Used to customize taskbar styles and properties dynamically.
     *
     * @event queryTaskbarInfo
     */
    queryTaskbarInfo: EmitType<IQueryTaskbarInfoEventArgs>;
    /**
     * Event triggered before Gantt data is exported to Excel.
     * Allows modification or cancellation of the export process.
     * @event beforeExcelExport
     */
    beforeExcelExport: EmitType<Object>;
    /**
     * Event triggered after Gantt data has been successfully exported to Excel.
     * Provides access to the generated workbook.
     * @event excelExportComplete
     */
    excelExportComplete: EmitType<ExcelExportCompleteArgs>;
    /**
     * Event triggered before each cell (header or data) is exported to Excel.
     * Allows customization of cell content, style, or value.
     * @event excelQueryCellInfo
     */
    excelQueryCellInfo: EmitType<ExcelQueryCellInfoEventArgs>;
    /**
     * Event triggered before each header cell is exported to Excel.
     * Allows customization of header cell content or styling.
     * @event excelHeaderQueryCellInfo
     */
    excelHeaderQueryCellInfo: EmitType<ExcelHeaderQueryCellInfoEventArgs>;
    /**
     * Event triggered continuously while row elements are being dragged.
     * Provides current drag position and target information.
     * @event rowDrag
     */
    rowDrag: EmitType<RowDragEventArgs>;
    /**
     * Event triggered when a row drag operation starts.
     * Provides initial drag source details.
     * @event rowDragStart
     */
    rowDragStart: EmitType<RowDragEventArgs>;
    /**
     * Event triggered before the row drag operation officially begins.
     * Allows preparation or cancellation of the drag action.
     * @event rowDragStartHelper
     */
    rowDragStartHelper: EmitType<RowDragEventArgs>;
    /**
     * Event triggered when dragged row elements are dropped onto a target row.
     * Provides source and target row information for reordering/indent/outdent.
     * @event rowDrop
     */
    rowDrop: EmitType<RowDragEventArgs>;
    /**
     * Event triggered before a row is collapsed.
     * Allows cancellation of the collapse action.
     * @event collapsing
     */
    collapsing: EmitType<ICollapsingEventArgs>;
    /**
     * Event triggered after a row has been collapsed.
     * Indicates the collapse action has completed.
     * @event collapsed
     */
    collapsed: EmitType<ICollapsingEventArgs>;
    /**
     * Event triggered before a row is expanded.
     * Allows cancellation of the expand action.
     * @event expanding
     */
    expanding: EmitType<ICollapsingEventArgs>;
    /**
     * Event triggered after a row has been expanded.
     * Indicates the expand action has completed.
     * @event expanded
     */
    expanded: EmitType<ICollapsingEventArgs>;
    /**
     * Event triggered when a Gantt action (sorting, filtering, searching, etc.) begins.
     * Allows cancellation or modification of the action.
     * @event actionBegin
     */
    actionBegin: EmitType<Object | FilterEventArgs | SortEventArgs | ITimeSpanEventArgs | IDependencyEventArgs | ITaskAddedEventArgs | ZoomEventArgs>;
    /**
     * Event triggered before a cell value is saved during editing.
     * Allows cancellation or modification of the save operation.
     * @event cellSave
     */
    cellSave: EmitType<CellSaveArgs>;
    /**
     * Event triggered after a Gantt action (sorting, filtering, etc.) has completed.
     * Provides updated state after the action.
     * @event actionComplete
     */
    actionComplete: EmitType<FilterEventArgs | SortEventArgs | ITaskAddedEventArgs | IKeyPressedEventArgs | ZoomEventArgs>;
    /**
     * Event triggered when a Gantt action fails during execution.
     * Provides error details.
     * @event actionFailure
     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Event triggered after actions like sorting, filtering complete.
     * Used to update the dataSource with current view data and record count.
     * @event dataStateChange
     */
    dataStateChange: EmitType<DataStateChangeEventArgs>;
    /**
     * Event triggered after a taskbar has been dragged and dropped to a new position.
     * Indicates editing via taskbar has completed.
     * @event taskbarEdited
     */
    taskbarEdited: EmitType<ITaskbarEditedEventArgs>;
    /**
     * Event triggered when a task is saved through cell editing.
     * Provides updated task data after save.
     * @event endEdit
     */
    endEdit: EmitType<ITaskbarEditedEventArgs>;
    /**
     * Event triggered when a cell enters edit mode in the Gantt chart.
     * Allows customization or cancellation of editing.
     * @event cellEdit
     */
    cellEdit: EmitType<CellEditArgs>;
    /**
     * Event triggered when the Gantt component begins loading data.
     * Occurs before any rendering starts.
     * @event load
     */
    load: EmitType<Object>;
    /**
     * Event triggered after the Gantt component is fully created and initialized.
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Event triggered when the Gantt component is being destroyed.
     * Allows cleanup operations.
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * Event triggered while a taskbar is being dragged.
     * Provides current drag progress and position.
     * @event taskbarEditing
     */
    taskbarEditing: EmitType<ITaskbarEditedEventArgs>;
    /**
     * Event triggered after the data source is bound to the TreeGrid part of Gantt.
     * Indicates data binding is complete.
     * @event dataBound
     */
    dataBound: EmitType<Object>;
    /**
     * Event triggered before data is bound to the TreeGrid.
     * Allows modification of data before rendering begins.
     * @event beforeDataBound
     */
    beforeDataBound: EmitType<BeforeDataBoundArgs>;
    /**
     * Event triggered when column resizing starts in the Grid.
     * @event resizeStart
     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Event triggered continuously while a column is being resized.
     * @event resizing
     */
    resizing: EmitType<ResizeArgs>;
    /**
     * Event triggered when column resizing completes.
     * @event resizeStop
     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Event triggered when splitter resizing begins in the Gantt component.
     * @event splitterResizeStart
     */
    splitterResizeStart: EmitType<ResizeEventArgs>;
    /**
     * Event triggered continuously while the splitter bar is being dragged.
     * @event splitterResizing
     */
    splitterResizing: EmitType<ResizingEventArgs>;
    /**
     * Event triggered when splitter resizing action completes.
     * @event splitterResized
     */
    splitterResized: EmitType<ISplitterResizedEventArgs>;
    /**
     * Event triggered when column header drag starts.
     * @event columnDragStart
     */
    columnDragStart: EmitType<ColumnDragEventArgs>;
    /**
     * Event triggered continuously while a column header is being dragged.
     * @event columnDrag
     */
    columnDrag: EmitType<ColumnDragEventArgs>;
    /**
     * Event triggered when a dragged column header is dropped.
     * @event columnDrop
     */
    columnDrop: EmitType<ColumnDragEventArgs>;
    /**
     * Event triggered before a tooltip is rendered.
     * Allows customization of tooltip content or cancellation.
     * @event beforeTooltipRender
     */
    beforeTooltipRender: EmitType<BeforeTooltipRenderEventArgs>;
    /**
     * Event triggered before a row is selected.
     * Allows cancellation of selection.
     * @event rowSelecting
     */
    rowSelecting: EmitType<RowSelectingEventArgs>;
    /**
     * Event triggered after a row has been selected.
     * @event rowSelected
     */
    rowSelected: EmitType<RowSelectEventArgs>;
    /**
     * Event triggered before a selected row is deselected.
     * Allows cancellation of deselection.
     * @event rowDeselecting
     */
    rowDeselecting: EmitType<RowDeselectEventArgs>;
    /**
     * Event triggered after a row has been deselected.
     * @event rowDeselected
     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**
     * Event triggered before a cell is selected.
     * Allows cancellation of cell selection.
     * @event cellSelecting
     */
    cellSelecting: EmitType<CellSelectingEventArgs>;
    /**
     * Event triggered after a cell has been selected.
     * @event cellSelected
     */
    cellSelected: EmitType<CellSelectEventArgs>;
    /**
     * Event triggered before a selected cell is deselected.
     * Allows cancellation of cell deselection.
     * @event cellDeselecting
     */
    cellDeselecting: EmitType<CellDeselectEventArgs>;
    /**
     * Event triggered after a cell has been deselected.
     * @event cellDeselected
     */
    cellDeselected: EmitType<CellDeselectEventArgs>;
    /**
     * Event triggered before each cell element is rendered.
     * Allows customization of cell content or style.
     * @event queryCellInfo
     */
    queryCellInfo: EmitType<QueryCellInfoEventArgs>;
    /**
     * Event triggered before each header cell element is rendered.
     * Allows customization of header cell content or style.
     * @event headerCellInfo
     */
    headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**
     * Event triggered before each row element is rendered.
     * Allows customization of row appearance.
     * @event rowDataBound
     */
    rowDataBound: EmitType<RowDataBoundEventArgs>;
    /**
     * Event triggered before the column menu is opened.
     * Allows customization or cancellation of menu display.
     * @event columnMenuOpen
     */
    columnMenuOpen: EmitType<ColumnMenuOpenEventArgs>;
    /**
     * Event triggered when a toolbar item is clicked.
     * @event toolbarClick
     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Event triggered when an item in the column menu is clicked.
     * @event columnMenuClick
     */
    columnMenuClick: EmitType<ColumnMenuClickEventArgs>;
    /**
     * Event triggered before the context menu is opened.
     * Allows customization or cancellation.
     * @event contextMenuOpen
     */
    contextMenuOpen: EmitType<CMenuOpenEventArgs>;
    /**
     * Event triggered when an item in the context menu is clicked.
     * @event contextMenuClick
     */
    contextMenuClick: EmitType<CMenuClickEventArgs>;
    constructor(options?: GanttModel, element?: string | HTMLElement);
    /**
     * Event triggered when a taskbar element is clicked.
     * Provides task and click details.
     * @event onTaskbarClick
     */
    onTaskbarClick: EmitType<ITaskbarClickEventArgs>;
    /**
     * Event triggered when a record is double-clicked.
     * @event recordDoubleClick
     */
    recordDoubleClick: EmitType<RecordDoubleClickEventArgs>;
    /**
     * Event triggered on mouse move over the Gantt component.
     * Provides mouse position and target information.
     * @event onMouseMove
     */
    onMouseMove: EmitType<IMouseMoveEventArgs>;
    /**
     * Event triggered before Gantt data is exported to PDF.
     * Allows modification or cancellation of PDF export.
     * @event beforePdfExport
     */
    beforePdfExport: EmitType<Object>;
    /**
     * Event triggered after Gantt data has been exported to PDF.
     * Provides access to the generated document.
     * @event pdfExportComplete
     */
    pdfExportComplete: EmitType<Object>;
    /**
     * Event triggered before each cell is exported to PDF.
     * Allows customization of cell content or style.
     * @event pdfQueryCellInfo
     */
    pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**
     * Event triggered before each taskbar is exported to PDF.
     * Allows customization of taskbar appearance in PDF.
     * @event pdfQueryTaskbarInfo
     */
    pdfQueryTaskbarInfo: EmitType<Object>;
    /**
     * Event triggered before each timeline cell is exported to PDF.
     * Allows customization of timeline cell content or style.
     * @event pdfQueryTimelineCellInfo
     */
    pdfQueryTimelineCellInfo: EmitType<PdfQueryTimelineCellInfoEventArgs>;
    /**
     * Event triggered before each column header cell is exported to PDF.
     * Allows customization of header cell content or style.
     * @event pdfColumnHeaderQueryCellInfo
     */
    pdfColumnHeaderQueryCellInfo: EmitType<PdfColumnHeaderQueryCellInfoEventArgs>;
    /**
     * To get the module name
     *
     * @returns {string} .
     * @private
     */
    eventMarkerColloction: IEventMarkerInfo[];
    getModuleName(): string;
    /**
     * For internal use only - Initialize the event handler
     *
     * @returns {void} .
     * @private
     */
    protected preRender(): void;
    private getCurrentDayStartTime;
    private getCurrentDayEndTime;
    private getStartTime;
    private getEndTime;
    private getNonWorkingRange;
    private getWorkingRange;
    private getSecondsPerDay;
    private showLoadingIndicator;
    private hideLoadingIndicator;
    private isCustomDayWorkingTime;
    private assignPropertiesToCalendar;
    private initProperties;
    private isUndoRedoItemPresent;
    /**
     * Inserts a record into the flatData array at the specified index and updates the flatDataMap.
     * @param {IGanttData} record - The Gantt data record to insert, containing ganttProperties with a rowUniqueID.
     * @param {number} index - The index at which to insert the record in the flatData array.
     * @returns {void}.
     * @private
     */
    insertRecord(record: IGanttData, index: number): void;
    /**
     * Removes one or more Gantt records from the flatData array starting at the specified index and deletes their entries from the flatDataMap.
     * @param {number} startIndex - The starting index from which to remove records in the flatData array.
     * @param {number} count - The number of records to remove (default is 1).
     * @returns {void}
     * @private
     */
    removeRecords(startIndex: number, count?: number): void;
    /**
     * @returns {string} .
     * @private
     */
    getDateFormat(): string;
    /**
     * To get timezone offset.
     *
     * @returns {number} .
     * @private
     */
    private getDefaultTZOffset;
    /**
     * To check whether the date is in DST.
     *
     * @param {Date} date - Defines the date to check whether it is DST.
     * @returns {boolean} .
     * @private
     */
    isInDst(date: Date): boolean;
    /**
     * Method to map resource fields.
     *
     * @returns {void} .
     */
    private resourceFieldsMapping;
    /**
     * To validate height and width
     *
     * @param {string | number} value .
     * @returns {string} .
     */
    private validateDimentionValue;
    /**
     * To calculate dimensions of Gantt control
     *
     * @returns {void} .
     */
    private calculateDimensions;
    /**
     * @returns {void} .
     * @private
     */
    protected render(): void;
    private actionFailures;
    hideMaskRow(): void;
    showMaskRow(): void;
    private convertToWBSPredecessor;
    private updateWBSPredecessor;
    private updateWBSCodes;
    getMaxRootWBSCode(parentDataCollection: IGanttData[], parentItem?: IGanttData): string;
    generateWBSCodes(flatDataCollection: IGanttData[]): void;
    private renderHeaderBackground;
    private assignTimeToDate;
    private renderBackGround;
    private createMaskTable;
    private createEmptyTimeLineTable;
    private applyTimelineMaskRow;
    private createEmptyMaskTable;
    private applyMaskRow;
    /**
     * Method used to show spinner.
     *
     * @returns {void} .
     */
    showSpinner(): void;
    /**
     * Method used to hide spinner.
     *
     * @returns {void} .
     */
    hideSpinner(): void;
    /**
     * @returns {void} .
     * @private
     */
    processTimeline(): void;
    /**
     * @param {boolean} isChange -Defines whether task data is changed.
     * @returns {void} .
     * @private
     */
    renderGantt(isChange?: boolean): void;
    removeCriticalPathStyles(): void;
    private wireEvents;
    private unwireEvents;
    private keyDownHandler;
    /**
     * Method trigger while user perform window resize.
     *
     * @returns {void} .
     * @private
     */
    windowResize(): void;
    keyActionHandler(e: KeyboardEventArgs): void;
    /**
     * Method for updating row height value in connector line collections
     *
     * @param {IConnectorLineObject[]} collection  -Defines the CollectorLine collection.
     * @returns {void} .
     * @private
     */
    private updateRowHeightInConnectorLine;
    /**
     * @returns {void} .
     * @private
     */
    protected renderToolbar(): void;
    /**
     * @returns {void} .
     * @private
     */
    protected renderTreeGrid(): void;
    private updateCurrentViewData;
    /**
     * @param {IGanttData} records -Defines the delete record collections.
     * @returns {IGanttData} .
     * @private
     */
    getRecordFromFlatdata(records: IGanttData[]): IGanttData[];
    /**
     * @param {object} args -Update the gantt element content height.
     * @returns {void} .
     * @private
     */
    updateContentHeight(args?: object): void;
    /**
     * To get expand status.
     *
     * @param {IGanttData} data .
     * @returns {boolean} .
     * @private
     */
    getExpandStatus(data: IGanttData): boolean;
    /**
     * Get expanded records from given record collection.
     *
     * @param {IGanttData[]} records - Defines record collection.
     * @returns {IGanttData[]} .
     */
    getExpandedRecords(records: IGanttData[]): IGanttData[];
    /**
     * Getting the Zooming collections of the Gantt control
     *
     * @returns {ZoomTimelineSettings} .
     * @private
     */
    getZoomingLevels(): ZoomTimelineSettings[];
    private displayQuarterValue;
    private displayHalfValue;
    /**
     *
     * @param {Date} date .
     * @param {string} format .
     * @returns {string} .
     */
    getFormatedDate(date: Date, format?: string): string;
    /**
     * Get duration value as string combined with duration and unit values.
     *
     * @param {number} duration - Defines the duration.
     * @param {string} durationUnit - Defines the duration unit.
     * @returns {string} .
     */
    getDurationString(duration: number, durationUnit: string): string;
    /**
     * Get work value as string combined with work and unit values.
     *
     * @param {number} work - Defines the work value.
     * @param {string} workUnit - Defines the work unit.
     * @returns {string} .
     */
    getWorkString(work: number, workUnit: string): string;
    private updateTreeColumns;
    private validateCycles;
    /**
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    treeDataBound(args: object): void;
    /**
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    private getCurrentRecords;
    private handleTaskSchedulingChanges;
    /**
     * Called internally, if any of the property value changed.
     *
     * @param {GanttModel} newProp - Defines the New GanttModel.
     * @param {GanttModel} oldProp - Defines the old GanttModel.
     * @returns {void} .
     * @private
     */
    onPropertyChanged(newProp: GanttModel, oldProp: GanttModel): void;
    private updateOverAllocationCotainer;
    /**
     * Returns the properties to be maintained in persisted state.
     *
     * @returns {string} .
     * @private
     */
    getPersistData(): string;
    private ignoreInArrays;
    private ignoreInColumn;
    /**
     * @returns {void} .
     * @private
     */
    destroy(): void;
    /**
     * Method to get taskbarHeight.
     *
     * @returns {number} .
     * @public
     */
    getTaskbarHeight(): number;
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} .
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Sorts a column with the given options.
     *
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @returns {void} .
     */
    sortColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    private mergePersistGanttData;
    private mergeColumns;
    private setFrozenCount;
    private splitFrozenCount;
    private isFrozenGrid;
    private removeBorder;
    private frozenLeftBorderColumns;
    private frozenRightBorderColumns;
    /**
     * Clears all the sorted columns of the Gantt.
     *
     * @returns {void} .
     */
    clearSorting(): void;
    /**
     * To validate and render chart horizontal and vertical lines in the Gantt
     *
     * @returns {void} .
     * @hidden
     */
    renderChartGridLines(): void;
    /**
     * To update height of the Grid lines in the Gantt chart side.
     *
     * @returns {void} .
     * @private
     */
    updateGridLineContainerHeight(): void;
    /**
     * To get actual height of grid lines, holidays, weekend and event markers.
     *
     * @returns {number} .
     * @private
     */
    getContentHeight(): number;
    /**
     * To update height of the Grid lines in the Gantt chart side.
     *
     * @param {boolean} currentProp - Update current property change in the Gantt chart.
     * @returns {void} .
     * @private
     */
    reUpdateDimention(currentProp?: string): void;
    /**
     * To render vertical lines in the Gantt chart side.
     *
     * @returns {void} .
     */
    private renderChartVerticalLines;
    /**
     * Method to get default localized text of the Gantt.
     *
     * @returns {void} .
     * @hidden
     */
    getDefaultLocale(): Object;
    /**
     * To remove sorted records of particular column.
     *
     * @param {string} columnName - Defines the sorted column name.
     * @returns {void} .
     */
    removeSortColumn(columnName: string): void;
    /**
     *
     * @param {object} args -Defines the edited event args.
     * @returns {void} .
     * @private
     */
    actionBeginTask(args: object): boolean | void;
    /**
     * Scrolls the Gantt chart's timeline horizontally to bring the specified date into view.
     *
     * This method is useful for navigating directly to a task, milestone, or any specific time range.
     *
     * @param {string | Date} date - The target date to scroll to. Accepts a date string or a JavaScript Date object.
     * @returns {void}
     */
    scrollToDate(date: string | Date): void;
    /**
     * To move horizontal scroll bar of Gantt to specific task id.
     *
     * @param  {string} taskId - Defines the task id of data.
     * @returns {void} .
     */
    scrollToTask(taskId: string): void;
    /**
     * To update the horizontal (left) and vertical (top) scroll positions of the Gantt chart.
     *
     * @param  {number} left - Defines the scroll left value of chart side.
     * @param  {number} top - Defines the scroll top value of chart side.
     * @returns {void} .
     */
    updateChartScrollOffset(left: number, top: number): void;
    /**
     * Get parent task by clone parent item.
     *
     * @param {IParent} cloneParent - Defines the clone parent item.
     * @param {Map<string, IGanttData>} [parentRecords] - Optional map of parent records.
     * @returns {IGanttData} .
     * @hidden
     */
    getParentTask(cloneParent: IParent, parentRecords?: Map<string, IGanttData>): IGanttData | null;
    /**
     * Get parent task by clone parent item.
     *
     * @param {IGanttData} ganttRecord -Defines the Gantt record.
     * @param {number} level -Defines the selected record level.
     * @returns {IGanttData} .
     * @hidden
     */
    getRootParent(ganttRecord: IGanttData, level: number): IGanttData;
    /**
     * Filters TreeGrid row by column name with the given options.
     *
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean | number[] | string[] | Date[] | boolean[]} filterValue - Defines the value
     *  used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, TreeGrid filters the records with exact match.if false, it filters case
     * insensitive records (uppercase and lowercase letters treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent set to true,
     * then filter ignores the diacritic characters or accents while filtering.
     * @returns {void} .
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean | number[] | string[] | Date[] | boolean[], predicate?: string, matchCase?: boolean, ignoreAccent?: boolean): void;
    /**
     * Refreshes the column definitions and layout of the TreeGrid pane.
     *
     * Applies any changes made to column configurations such as visibility, order, or width.
     * If `refreshUI` is set to `true`, the DOM is updated to reflect the latest column settings.
     *
     * @param {boolean} [refreshUI=false] - When set to `true`, the UI is updated immediately to reflect the latest column settings.
     * If `false` or omitted, only the internal column configuration is updated; the DOM remains unchanged until the next render cycle.
     * @returns {void}
     */
    refreshColumns(refreshUI?: boolean): void;
    /**
     * Export Gantt data to Excel file(.xlsx).
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Gantt.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} .
     */
    excelExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export Gantt data to CSV file.
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Gantt.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} .
     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export Gantt data to PDF document.
     *
     * @param  {PdfExportProperties} pdfExportProperties - Defines the export properties of the Gantt.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If the 'isBlob' parameter is set to true, the method returns PDF data as a blob instead of exporting it as a down-loadable PDF file. The default value is false.
     * @returns {Promise<any>} .
     */
    pdfExport(pdfExportProperties?: PdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    /**
     * Clears the filtered columns in Gantt.
     *
     * Can also be used to clear filtering of a specific column in Gantt.
     *
     * @param {string[]} fields - Defines the specific column to remove filter.
     * @returns {void} .
     */
    clearFiltering(fields?: string[]): void;
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @returns {void} .
     * @hidden
     */
    removeFilteredColsByField(field: string): void;
    /**
     * Method to set holidays and non working days in date time and date picker controls
     *
     * @param {RenderDayCellEventArgs} args .
     * @returns {void} .
     * @private
     */
    renderWorkingDayCell(args: RenderDayCellEventArgs): void;
    /**
     * Updates the Gantt timeline to the previous time span by one unit.
     *
     * @param {string} mode - Render previous span of Timeline.
     * @returns {void} .
     * @public
     */
    previousTimeSpan(mode?: string): void;
    /**
     * To update timeline at end point with one unit.
     *
     * @param {string} mode - Render next span of Timeline.
     * @returns {void} .
     * @public
     */
    nextTimeSpan(mode?: string): void;
    /**
     * Sanitizes task properties by removing the calendarContext property.
     *
     * @param  {ITaskData} props - The task data object containing properties to be sanitized.
     * @returns {ITaskData} The sanitized properties object without calendarContext.
     * @private
     */
    removeCalendarContext(props: ITaskData): ITaskData;
    /**
     * To validate project start date and end date.
     *
     * @param  {Date} startDate - Defines start date of project.
     * @param  {Date} endDate - Defines end date of project.
     * @param  {boolean} isTimelineRoundOff - Defines project start date and end date need to be round off or not.
     * @param {string} isFrom - Defines whether the call originates from a public method action or a taskbar editing action.
     * @returns {void} .
     * @public
     */
    updateProjectDates(startDate: Date, endDate: Date, isTimelineRoundOff: boolean, isFrom?: string): void;
    /**
     * Splits the taskbar of a specified task into segments based on the given date.
     *
     * @param  {string} taskId - Defines the id of a task to be split.
     * @param  {string} splitDate - Defines in which date the taskbar must be split up.
     * @returns {void} .
     * @public
     */
    splitTask(taskId: number | string, splitDate: Date | Date[]): void;
    /**
     * Merge the split taskbar with the given segment indexes.
     *
     * @param  {string} taskId - Defines the id of a task to be split.
     * @param  {string} segmentIndexes - Defines the object array of indexes which must be merged.
     * @returns {void} .
     * @public
     */
    mergeTask(taskId: number | string, segmentIndexes: {
        firstSegmentIndex: number;
        secondSegmentIndex: number;
    }[]): void;
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param  {string} fromFName - Defines origin field name.
     * @param  {string} toFName - Defines destination field name.
     * @returns {void} .
     * @public
     */
    reorderColumns(fromFName: string | string[], toFName: string): void;
    /**
     * Method to clear edited collections in gantt set edit flag value
     *
     * @param {boolean} isStart -Defines whether to initiate edit action.
     * @returns {void} .
     * @private
     */
    initiateEditAction(isStart: boolean): void;
    /**
     *
     * @param {string} field Method to update value in Gantt record and make clone record for this
     * @param {IGanttData | ITaskData} record .
     * @param {boolean} isTaskData .
     * @returns {void} .
     * @private
     */
    setRecordValue(field: string, value: any, record: IGanttData | ITaskData, isTaskData?: boolean): void;
    private makeCloneData;
    private closeGanttActions;
    /**
     * Method to get task by uniqueId value.
     *
     * @param {string} id - Defines the task id.
     * @returns {IGanttData} .
     * @isGenericType true
     */
    getTaskByUniqueID(id: string): IGanttData;
    /**
     * Method to get record by id value.
     *
     * @param {string} id - Defines the id of record.
     * @returns {IGanttData} .
     * @isGenericType true
     */
    getRecordByID(id: string): IGanttData;
    /**
     * Method to set splitter position.
     *
     * @param {string|number} value - Define value to splitter settings property.
     * @param {string} type - Defines name of internal splitter settings property.
     * @returns {void} .
     */
    setSplitterPosition(value: string | number, type: string): void;
    /**
     * Expand the records by index value.
     *
     * @param {number[] | number} index - Defines the index of rows to be expand.
     * @returns {void} .
     * @public
     */
    expandByIndex(index: number[] | number): void;
    /**
     * Expand the record by task id.
     *
     * @param {number} id - Defines the id of task.
     * @returns {void} .
     * @public
     */
    expandByID(id: number | string): void;
    /**
     * Collapse the record by index value.
     *
     * @param {number} index - Defines the index of row.
     * @returns {void} .
     * @public
     */
    collapseByIndex(index: number): void;
    /**
     * Collapse the record by id value.
     *
     * @param {number} id - Defines the id of task.
     * @returns {void} .
     * @public
     */
    collapseByID(id: number | string): void;
    /**
     * Method to add record.
     *
     * @param {Object[] | IGanttData | Object} data - Defines record to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @returns {void} .
     * @public
     */
    addRecord(data?: Object[] | IGanttData | Object, rowPosition?: RowPosition, rowIndex?: number): void;
    /**
     * Method to update record by ID.
     *
     * @param  {Object} data - Defines the data to modify.
     * @returns {void} .
     * @public
     */
    updateRecordByID(data: Object): void;
    /**
     * Retrieves the current view data, reflecting the latest state after filtering, sorting, and CRUD operations.
     * @returns {Object[]} An array of objects representing the current view data.
     */
    getCurrentViewData(): Object[];
    /**
     * Adjusts the width of specified columns to fit their content, preventing wrapping or truncation.
     *
     * Hidden columns are ignored. For initial rendering, call this method during the `dataBound` event.
     *
     * @param { string | string[]} fieldNames - The name(s) of the column(s) to auto-fit. Accepts a single column name or an array of column names.
     * @returns {void} This method does not return a value.
     */
    autoFitColumns(fieldNames?: string | string[]): void;
    /**
     * Retrieves the internal Gantt properties for a task using its Task ID.
     *
     * This method provides access to task data such as taskbar width, left position, segments collection etc.,.
     * @param {string} taskId - The unique identifier of the task.
     * @returns {IGanttTaskInfo} The Gantt task information.
     */
    getTaskInfo(taskId: string): IGanttTaskInfo;
    /**
     * To update existing taskId with new unique Id.
     *
     * @param {number | string} currentId - Defines the current Id of the record.
     * @param {number | string} newId - Defines the new Id of the record.
     * @returns {void} .
     */
    updateTaskId(currentId: number | string, newId: number | string): void;
    /**
     * Public method to expand particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    expandAtLevel(level: number): void;
    /**
     * To indent the level of selected task to the hierarchical Gantt task.
     *
     * @returns {void} .
     * @public
     */
    indent(): void;
    /**
     * To outdent the level of selected task from the hierarchical Gantt task.
     *
     * @returns {void} .
     * @public
     */
    outdent(): void;
    /**
     * To retrieve the collection of previously recorded actions. This method returns an object as a collection that holds the following details.
     * `modifiedRecords` - retrieves the modified records.
     * `action` - shows the current performed action such as 'sorting','columnReorder','columnResize','progressResizing','rightResizing','leftResizing','add','delete','search','filtering','zoomIn','zoomOut','zoomToFit','columnState','previousTimeSpan','nextTimeSpan','indent','outdent','rowDragAndDrop','taskbarDragAndDrop','dialogEdit'
     *
     * @returns {Object[]} To get the collection of actions
     * @public
     */
    getUndoActions(): Object[];
    /**
     * To retrieve the collection of actions to reapply.
     * `modifiedRecords` - retrieves the modified records.
     * `action` - shows the current performed action such as 'sorting','columnReorder','columnResize','progressResizing','rightResizing','leftResizing','add','delete','search','filtering','zoomIn','zoomOut','zoomToFit','columnState','previousTimeSpan','nextTimeSpan','indent','outdent','rowDragAndDrop','taskbarDragAndDrop','dialogEdit'
     *
     * @returns {Object[]} To get the collection of actions
     *
     * @public
     */
    getRedoActions(): Object[];
    /**
     * Clears the stack collection for undo action.
     *
     * @public
     * @returns {void}
     */
    clearUndoCollection(): void;
    /**
     * Clears the stack collection for redo action.
     *
     * @public
     * @returns {void}
     */
    clearRedoCollection(): void;
    /**
     * Initiates an undo action to revert the most recent change performed.
     *
     * @returns {void} .
     * @public
     */
    undo(): void;
    /**
     * Initiates a redo action to reapply the most recent undone change performed.
     *
     * @returns {void} .
     * @public
     */
    redo(): void;
    /**
     * To render the critical path tasks in Gantt.
     *
     * @returns {void} .
     * @param {boolean} isCritical - To checks whether to render critical path or not .
     * @public
     */
    private showCriticalPath;
    /**
     * To get all the critical tasks in Gantt.
     *
     * @returns {IGanttData[]} .
     * @public
     */
    getCriticalTasks(): IGanttData[];
    /**
     * To perform Zoom in action on Gantt timeline.
     *
     * @returns {void} .
     * @public
     */
    zoomIn(): void;
    /**
     * To perform zoom out action on Gantt timeline.
     *
     * @returns {void} .
     * @public
     */
    zoomOut(): void;
    /**
     * To show all project task in available chart width.
     *
     * @returns {void} .
     * @public
     */
    fitToProject(): void;
    /**
     * Reorder the rows based on given indexes and position.
     *
     * @param {number[]} fromIndexes - Defines the indexes of the dragged records.
     * @param {number} toIndex - Defines the index where the dragged rows will be dropped.
     * @param {string} position - Defines the position of the dropped row.
     * @returns {void} .
     */
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    /**
     * Method to update record by Index.
     *
     * @param  {number} index - Defines the index of data to modify.
     * @param  {object} data - Defines the data to modify.
     * @returns {void} .
     * @public
     */
    updateRecordByIndex(index: number, data: Object): void;
    /**
     * To add dependency for Task.
     *
     * @param  {number} id - Defines the ID of data to modify.
     * @param  {string} predecessorString - Defines the predecessor string to add.
     * @returns {void} .
     * @public
     */
    addPredecessor(id: number | string, predecessorString: string): void;
    /**
     * To remove dependency from task.
     *
     * @param  {number} id - Defines the ID of the task from which the dependency will be removed.
     * @returns {void} .
     * @public
     */
    removePredecessor(id: number | string): void;
    /**
     * To modify current dependency values of Task by task id.
     *
     * @param  {number} id - Defines the ID of data to modify.
     * @param  {string} predecessorString - Defines the predecessor string to update.
     * @returns {void} .
     * @public
     */
    updatePredecessor(id: number | string, predecessorString: string): void;
    /**
     * Method to open Add dialog.
     *
     * @returns {void} .
     * @public
     */
    openAddDialog(): void;
    /**
     * Method to open Edit dialog.
     *
     * @param {number } taskId - Defines the id of task.
     * @returns {void} .
     * @public
     */
    openEditDialog(taskId?: number | string): void;
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param {string | number} id .
     * @param {number} index .
     * @returns {void} .
     * @private
     */
    private contructExpandCollapseArgs;
    /**
     * Method to get chart row value by index.
     *
     * @param {number} index - Defines the index of row.
     * @returns {HTMLElement} .
     */
    getRowByIndex(index: number): HTMLElement;
    /**
     * Method to get the row element by task id.
     *
     * @param {string | number} id - Defines the id of task.
     * @returns {HTMLElement} .
     */
    getRowByID(id: string | number): HTMLElement;
    /**
     * Method to get class name for unscheduled tasks
     *
     * @param {ITaskData} ganttProp .
     * @returns {string} .
     * @private
     */
    getUnscheduledTaskClass(ganttProp: ITaskData): string;
    /**
     * Method to get class name for unscheduled tasks
     *
     * @param {ITaskData} ganttProp -Defines the Gantt propertie.
     * @returns {boolean} .
     * @private
     */
    isUnscheduledTask(ganttProp: ITaskData): boolean;
    private createGanttPopUpElement;
    /**
     * Method to get predecessor value as string.
     *
     * @param {string} type .
     * @returns {HTMLElement} .
     * @private
     */
    getPredecessorTextValue(type: string): string;
    /**
     * Method to perform search action in Gantt.
     *
     * @param {string} keyVal - Defines key value to search.
     * @returns {void} .
     */
    search(keyVal: string): void;
    /**
     * Method to get offset rect value
     *
     * @param {HTMLElement} element .
     * @returns {number} .
     * @hidden
     */
    getOffsetRect(element: HTMLElement): {
        top: number;
        left: number;
        width?: number;
        height?: number;
    };
    /**
     * Method to expand all the rows of Gantt.
     *
     * @returns {void} .
     * @public
     */
    expandAll(): void;
    /**
     * Method to update data source.
     *
     * @returns {void} .
     * @param {object[]} dataSource - Defines a collection of data.
     * @param {object} args - Defines the projectStartDate and projectEndDate values.
     * @public
     */
    updateDataSource(dataSource: Object[], args: object): void;
    /**
     * Method to collapse all the rows of Gantt.
     *
     * @returns {void} .
     * @public
     */
    collapseAll(): void;
    /**
     * Gets the columns from the TreeGrid.
     *
     * @returns {Column[]} .
     * @public
     */
    getGridColumns(): Column[];
    /**
     * Method to column from given column collection based on field value
     *
     * @param {string} field .
     * @param {ColumnModel[]} columns .
     * @returns {ColumnModel} .
     * @private
     */
    getColumnByField(field: string, columns: ColumnModel[]): ColumnModel;
    /**
     * Gets the Gantt columns.
     *
     * @returns {ColumnModel[]} .
     * @public
     */
    getGanttColumns(): ColumnModel[];
    private updateColumnModel;
    /**
     * Shows a column by its column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @returns {void} .
     * @public
     */
    showColumn(keys: string | string[], showBy?: string): void;
    /**
     * Hides one or more columns in the Gantt chart based on the specified column names or header texts.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @returns {void} .
     * @public
     */
    hideColumn(keys: string | string[], hideBy?: string): void;
    /**
     * To set scroll top for chart scroll container.
     *
     * @param {number} scrollTop - Defines scroll top value for scroll container.
     * @returns {void} .
     * @public
     */
    setScrollTop(scrollTop: number): void;
    /**
     * Cancels the current edit operation and reverts the changes made during editing.
     *
     * @returns {void} .
     * @public
     */
    cancelEdit(): void;
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @returns {void} .
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Selects a row by given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects a collection of rows by indexes.
     *
     * @param  {number[]} records - Defines the collection of row indexes.
     * @returns {void} .
     */
    selectRows(records: number[]): void;
    /**
     * Method to delete record.
     *
     * @param {number | string } taskDetail - Defines the details of data to delete.
     * @returns {void} .
     * @public
     */
    deleteRecord(taskDetail: number | string | number[] | string[] | IGanttData | IGanttData[]): void;
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void} .
     */
    enableItems(items: string[], isEnable: boolean): void;
    /**
     * Deselects the current selected rows and cells.
     *
     * @returns {void} .
     */
    clearSelection(): void;
    /**
     * @param {ITaskAddedEventArgs | IActionBeginEventArgs} args .
     * @returns {ITaskAddedEventArgs | IActionBeginEventArgs} .
     * @hidden
     */
    updateDataArgs(args: ITaskAddedEventArgs | IActionBeginEventArgs): ITaskAddedEventArgs | IActionBeginEventArgs;
    /**
     * Method to convert task data to milestone data.
     *
     * @param {string} id - Defines id of record.
     * @returns {void} .
     * @public
     */
    convertToMilestone(id: string): void;
    /**
     * To change the mode of a record.
     *
     * @param {object} data - Use to change the TaskMode either manual, auto or custom.
     * @returns {void} .
     */
    changeTaskMode(data: Object): void;
    /**
     * @returns {string[]} .
     * @private
     */
    getTaskIds(): string[];
    /**
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    setTaskIds(data: IGanttData): void;
    /**
     * To render the react templates
     *
     * @returns {void} .
     *  @hidden
     */
    renderTemplates(): void;
    /**
     * To reset the react templates
     *
     * @returns {void} .
     *  @hidden
     */
    resetTemplates(): void;
    /**
     * Gets the number of frozen column in Gantt
     *
     * @returns {number} - Returns frozen column count
     */
    private getFrozenColumnsCount;
    private normalizeTranslate;
    private getTranslateY;
}
