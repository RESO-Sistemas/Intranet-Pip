import { TreeGrid } from '../base/treegrid';
import { ITreeData } from '../base/interface';
/**
 * TreeGrid Selection module
 *
 * @hidden
 */
export declare class Selection {
    private parent;
    private columnIndex;
    private selectedItems;
    private selectedIndexes;
    private filteredList;
    private searchingRecords;
    private headerCheckboxFrameEl;
    private checkboxColIndexCache;
    private parentSelectionCounters;
    private selectedUidMap;
    private totalSelectableCount;
    private headerSelectionState;
    private checkedItemCount;
    /**
     * Creates an instance of Selection.
     *
     * @param {TreeGrid} parent - The TreeGrid instance this selection module is associated with.
     */
    constructor(parent: TreeGrid);
    /**
     * Gets the module name.
     *
     * @returns {string} The name of the module ('selection').
     */
    private getModuleName;
    private visibleUidIndex;
    /**
     * Builds a map from visible record uniqueID to its visible index.
     * This map is crucial for finding the *current visible index* of a record.
     *
     * @returns {void}
     */
    private buildVisibleUidMap;
    /**
     * Adds required event listeners for selection handling.
     *
     * @returns {void}
     */
    addEventListener(): void;
    /**
     * Removes previously added event listeners.
     *
     * @returns {void}
     */
    removeEventListener(): void;
    /**
     * Destroys the selection module and clears internal caches.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Handles checkbox click events from the DOM and dispatches selection logic.
     *
     * @param {Object} args - Event args containing the click target.
     * @returns {void}
     */
    private checkboxSelection;
    /**
     * Triggers the checkboxChange event with the appropriate arguments.
     *
     * @param {HTMLInputElement} checkBox - The checkbox input element that changed.
     * @param {boolean} checkState - The new checked state.
     * @param {HTMLTableRowElement} rowElement - The row element where the change occurred.
     * @returns {void}
     */
    private triggerChkChangeEvent;
    /**
     * Determines the index of the checkbox column in the header.
     *
     * @returns {number} The index of the checkbox column, or -1 if not found.
     */
    private getCheckboxcolumnIndex;
    /**
     * Renders and initializes the header checkbox element.
     *
     * @returns {void}
     */
    private headerCheckbox;
    /**
     * Renders a checkbox element for a column cell.
     *
     * @param {QueryCellInfoEventArgs} args - The QueryCellInfoEventArgs for the cell.
     * @returns {Element} The rendered checkbox wrapper element.
     */
    private renderColumnCheckbox;
    /**
     * Injects the checkbox into a column cell during QueryCellInfo.
     *
     * @param {QueryCellInfoEventArgs} container - The cell event args.
     * @returns {void}
     */
    private columnCheckbox;
    /**
     * Selects or toggles checkboxes for the provided row indexes.
     *
     * @param {number[]} rowIndexes - Array of row indexes to toggle selection for.
     * @returns {void}
     */
    selectCheckboxes(rowIndexes: number[]): void;
    /**
     * Traverses selection for a record and cascades selections to children/parents as necessary.
     *
     * @param {ITreeData} record - The record to process.
     * @param {string} checkboxState - The desired checkbox state ('check'|'uncheck'|'indeterminate').
     * @param {boolean} isChildItem - True if this invocation is for a child during recursion.
     * @returns {void}
     */
    private traverSelection;
    /**
     * Filters provided child records against the current filter result.
     *
     * @param {ITreeData[]} childRecords - The array of child records to filter.
     * @returns {ITreeData[]} The filtered child records array.
     */
    private getFilteredChildRecords;
    /**
     * Derives children for a record from flatData using the parentItem link.
     * Used when childRecords is missing or empty.
     *
     * @param {ITreeData} record - The record for which to find child elements.
     * @returns {ITreeData[]} An array of child records derived from flatData.
     */
    private getChildrenFromFlat;
    /**
     * Updates parent selection by rebuilding summary and applying deltas, then bubbling up if required.
     *
     * @param {ITreeData} parentRecord - The parent record reference.
     * @param {string} [previousChildState] - Previous state of the child that changed.
     * @param {string} [nextChildState] - Next state of the child that changed.
     * @returns {void}
     */
    private updateParentSelection;
    /**
     * Builds a selection summary for a record's children.
     *
     * @param {Object} record - The record whose children should be summarized.
     * @param {boolean} [ignoreFilter] - If true, ignore current filter when computing summary.
     * @returns {{ total: number, checked: number, indeterminate: number }} The computed summary.
     */
    private buildSelectionSummary;
    /**
     * Applies a delta to a selection summary based on a state change.
     *
     * @param {Object} summary - The summary to modify. Object with numeric properties: total, checked, indeterminate.
     * @param {string} state - The state that changed ('check' | 'indeterminate').
     * @param {number} delta - The delta to apply (e.g. +1 or -1).
     * @returns {void}
     */
    private applySummaryDelta;
    /**
     * Derives the parent's checkbox state based on children summary counts.
     *
     * @param {ITreeData} record The parent record.
     * @param {{ total: number, checked: number, indeterminate: number }} summary The children summary.
     * @returns {'check'|'indeterminate'|'uncheck'} The derived checkbox state.
     */
    private deriveParentState;
    /**
     * Handles header checkbox (select all / clear all) behavior.
     *
     * @param {boolean} [checkAll] - Optional explicit flag to check or uncheck all.
     * @returns {void}
     */
    private headerSelection;
    /**
     * Finalizes parent states after a bulk header operation (e.g., Select All).
     * This ensures parent states (checked/indeterminate) are correct after cascades.
     *
     * @param {ITreeData[]} records - The records that were processed in the bulk operation.
     * @returns {void}
     */
    private finalizeParentsAfterBulk;
    /**
     * Processes header selection for each record, setting their state silently in the data model.
     * Called during bulk operations like "select all".
     *
     * @param {ITreeData[]} records - The records to process.
     * @param {string} targetState - The target state to set on each record.
     * @returns {void}
     */
    private processHeaderSelection;
    /**
     * Rebuilds `selectedItems`, `selectedUidMap`, and `selectedIndexes` based on the current data states in the model.
     * This method is called after bulk operations (like headerSelection, grid actions, etc.) to synchronize internal collections.
     * It ensures `selectedItems` retains original selection order *as much as possible* for currently checked items
     * and `selectedIndexes` reflects their *current visible order*.
     *
     * @param {ITreeData[]} records - The records that were processed (or the full data set if re-evaluating everything).
     * @param {string} requestType - The data action type such as filtering, searching, refresh,etc.
     * @returns {void}
     */
    private updateSelectedCollectionsAfterBulk;
    /**
     * Refreshes visible checkbox DOM elements to reflect the current data state.
     * This method exclusively updates the UI representation of checkboxes.
     *
     * @returns {void}
     */
    private refreshVisibleCheckboxes;
    /**
     * Resets internal selection caches to their initial state.
     * This is usually called before a bulk selection operation (like "select all").
     *
     * @returns {void}
     */
    resetSelectionCaches(): void;
    /**
     * Counts selectable (non-summary) records in the provided array.
     *
     * @param {ITreeData[]} records - The records to count.
     * @returns {number} The number of selectable records.
     */
    private countSelectableRecords;
    /**
     * Resolves the list of records used for header selection operations (e.g., for `select all`).
     *
     * @param {boolean} [includeAll] - If true and data is local, returns flatData (all records for full dataset actions).
     * @returns {ITreeData[]} The array of records to consider for header operations.
     */
    private resolveHeaderSelectionList;
    /**
     * Updates the header checkbox state (checked/indeterminate/unchecked) based on current selections.
     *
     * @returns {void}
     */
    private updateHeaderCheckboxState;
    /**
     * Updates selection arrays (selectedItems, selectedUidMap, selectedIndexes) and visible DOM for a single record.
     * This is the core method for managing the state of a single checkbox.
     *
     * @param {ITreeData} currentRecord - The record to update.
     * @param {string} checkState - The new checkbox state ('check' | 'uncheck' | 'indeterminate').
     * @param {boolean} [silent] - If true, update is silent (only updates data model, no collection management or DOM update).
     * @returns {void}
     */
    private updateSelectedItems;
    /**
     * Handles various grid actions and updates selection state accordingly.
     * This method ensures that selection state is maintained and UI is refreshed after grid operations.
     *
     * @param {CellSaveEventArgs} args - Action arguments containing requestType and data.
     * @returns {void}
     */
    private updateGridActions;
    /**
     * Retrieves checked record objects.
     * This array maintains the `ITreeData` objects in the order they were selected.
     *
     * @returns {ITreeData[]} Array of checked records.
     */
    getCheckedrecords(): ITreeData[];
    /**
     * Retrieves visible indexes of checked rows in the current view, in the order they were selected.
     * This method dynamically generates the list of visible indexes by iterating through `selectedItems`
     * (which preserves selection order) and finding their *current* visible index.
     *
     * @returns {number[]} Array of checked row indexes in selection order.
     */
    getCheckedRowIndexes(): number[];
}
