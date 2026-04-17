import { Gantt } from './gantt';
import { ColumnModel } from '@syncfusion/ej2-treegrid';
import { IGanttData } from './interface';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
/** @hidden */
export declare class GanttTreeGrid {
    private parent;
    private treeGridElement;
    treeGridColumns: ColumnModel[];
    isPersist: boolean;
    dropInstance: AutoComplete;
    /**
     * @private
     */
    currentEditRow: {};
    private registeredTemplate;
    addedRecord: boolean;
    setCancelArgs: boolean;
    private isDateColumnCellEdit;
    private perviousStartDate;
    private perviousEndDate;
    private previousScroll;
    /** @hidden */
    prevCurrentView: Object;
    constructor(parent: Gantt);
    private addEventListener;
    private renderReactTemplate;
    private createContainer;
    /**
     * Method to initiate TreeGrid
     *
     * @returns {void} .
     */
    renderTreeGrid(): void;
    private composeProperties;
    private getContentDiv;
    private getHeaderDiv;
    private getScrollbarWidth;
    /**
     * @returns {void} .
     * @private
     */
    ensureScrollBar(): void;
    private bindEvents;
    private beforeDataBound;
    private dataBound;
    private dataStateChange;
    private collapsing;
    private expanding;
    private collapsed;
    private expanded;
    private actionBegin;
    private created;
    private actionFailure;
    private queryCellInfo;
    private headerCellInfo;
    private rowDataBound;
    private columnMenuOpen;
    private columnMenuClick;
    private createExpandCollapseArgs;
    private objectEqualityChecker;
    maxLimits(durationUnit: string): number;
    isGuID(str: string): boolean;
    splitByLastOffset(input: string): number;
    updatePredecessorLimits(splits: string[], previousData: string, maxLimits: number): string;
    private treeActionComplete;
    private updateKeyConfigSettings;
    /**
     * Method to bind internal events on TreeGrid element
     *
     * @returns {void} .
     */
    private wireEvents;
    private unWireEvents;
    private scrollHandler;
    /**
     * @returns {void} .
     * @private
     */
    validateGanttColumns(): void;
    private getLocalizedConstraintTypeText;
    /**
     *
     * @param {GanttColumnModel} column .
     * @param {boolean} isDefined .
     * @returns {void} .
     */
    private createTreeGridColumn;
    changeLocale(data: any): any[];
    changeDelocale(dependency: string): string;
    /**
     * Compose Resource columns
     *
     * @param {GanttColumnModel} column .
     * @returns {void} .
     */
    private composeResourceColumn;
    /**
     * @param {IGanttData} data .
     * @returns {object} .
     * @private
     */
    getResourceIds(data: IGanttData): object;
    /**
     * Create Id column
     *
     * @param {GanttColumnModel} column .
     * @returns {void} .
     */
    private composeIDColumn;
    private composeUniqueIDColumn;
    /**
     * Create progress column
     *
     * @param {GanttColumnModel} column .
     * @returns {void} .
     */
    private composeProgressColumn;
    /**
     * @param {GanttColumnModel} newGanttColumn .
     * @param {boolean} isDefined .
     * @returns {void} .
     */
    private bindTreeGridColumnProperties;
    private durationValueAccessor;
    private dependencyValueAccessor;
    private resourceValueAccessor;
    private workValueAccessor;
    private taskTypeValueAccessor;
    private modeValueAccessor;
    private constraintTypeValueAccessor;
    /**
     * Returns the formatted baseline duration string for a given task record.
     *
     * <p>This accessor method is used for displaying baseline duration in Gantt columns.
     * It handles both direct property access and cases where child tasks are loaded on demand.</p>
     *
     * @param {string} field - The field name mapped to the column.
     * @param {IGanttData} data - The data record representing a Gantt task.
     * @param {GanttColumnModel} column - The column configuration model.
     * @returns {string} - A formatted duration string (e.g., "5 days") or an empty string if unavailable.
     *
     */
    private baselineDurationValueAccessor;
    private idValueAccessor;
    private updateScrollTop;
    private treeGridClickHandler;
    private setPartialSelectionForGrid;
    private removeEventListener;
    private destroy;
}
