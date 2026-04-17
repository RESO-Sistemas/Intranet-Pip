import { Popup } from '@syncfusion/ej2-popups';
import { BlockManager } from '../../base/block-manager';
import { BlockModel } from '../../../models/index';
export declare class TableUIManager {
    private parent;
    private table;
    private tableContainer;
    private blockElement;
    private blockModel;
    private blockId;
    private rowInsertHandle;
    private rowActionHandle;
    private rowHoverLine;
    private rowTopDot;
    private rowBottomDot;
    private colInsertHandle;
    private colActionHandle;
    private colHoverLine;
    private colLeftDot;
    private colRightDot;
    private rowPinned;
    private colPinned;
    private rowTopHit;
    private rowBottomHit;
    private colLeftHit;
    private colRightHit;
    private colResizeHandle;
    private hoveredRow;
    private hoveredColIndex;
    private isMultiSelecting;
    private isResizing;
    popupObj: Popup;
    private lastRowAnchorIndex;
    private lastColAnchorIndex;
    constructor(parent: BlockManager);
    init(table: HTMLTableElement, blockElement: HTMLElement, blockModel: BlockModel): void;
    private createUiElements;
    private mountUiElements;
    private wireDelegatedMousemove;
    private wireRowInsert;
    private wireColInsert;
    private isFromInsertHandle;
    /**
     * Displays a row gripper for the specified DOM row index.
     * Handles row selection, focus, pinned bar creation, and optional gripper popup.
     * Updates DOM elements, dataset attributes, and integrates with undo/redo tracking.
     *
     * @param {number} domRowIdx - The DOM/visual row index to show the gripper for.
     * @param {boolean} [isFirstRow=false] - Indicates if the row is the first row, triggering popup options.
     * @returns {void}
     *
     * @hidden
     */
    showRowGripperForDomRow(domRowIdx: number, isFirstRow?: boolean): void;
    deleteSelectedRows(domRowIdx: number): void;
    /**
     * Displays a column gripper for the specified DOM column index.
     * Handles column selection, focus, pinned bar creation, and optional gripper popup.
     * Updates DOM elements, dataset attributes, and integrates with undo/redo tracking.
     *
     * @param {number} domColIdx - The DOM/visual column index to show the gripper for.
     * @param {boolean} [isFirstCol=false] - Indicates if the column is the first column, triggering popup options.
     * @returns {void}
     *
     * @hidden
     */
    showColGripperForDomCol(domColIdx: number, isFirstCol?: boolean): void;
    deleteSelectedColumns(): void;
    private focusSinglePinnedColumn;
    /**
     * Adds a selection state to the specified row in the table.
     * Does not clear previous selections, allowing multiple rows to be selected.
     *
     * @param {HTMLTableElement} table - The table element containing the row.
     * @param {number} rowIndex - The index of the row to mark as selected.
     * @returns {void}
     *
     * @hidden
     */
    addRowSelection(table: HTMLTableElement, rowIndex: number): void;
    private createPinnedRowBar;
    /**
     * Hides all pinned row grippers from the table block element.
     * Removes pinned row action handles from the DOM and restores the default row action handle display.
     *
     * @returns {void}
     *
     * @hidden
     */
    hideRowGripper(): void;
    private wireActionHandles;
    private hasPinnedColGripper;
    private hasPinnedRowGripper;
    /**
     * Adds a selection state to the specified column in the table.
     * Does not clear previous selections, allowing multiple columns to be selected.
     *
     * @param {HTMLTableElement} table - The table element containing the column.
     * @param {number} colIndex - The index of the column to mark as selected.
     * @returns {void}
     *
     * @hidden
     */
    addColumnSelection(table: HTMLTableElement, colIndex: number): void;
    private createPinnedColBar;
    /**
     * Removes all pinned column bars from the table block element.
     * Queries for pinned column action handles and deletes them from the DOM.
     *
     * @returns {void}
     *
     * @hidden
     */
    hideAllPinnedColBars(): void;
    private wireFocusAndCleanup;
    private wireObservers;
    private wireColResize;
    private convertColgroupToPxMode;
    private syncRowUI;
    private hideRowUI;
    private hideColUI;
    private hideHitZones;
    /**
     * Removes all row and column selection states from the given table.
     * Clears the `e-row-selected` class from rows and the `e-col-selected` class from cells.
     *
     * @param {HTMLTableElement} table - The table element to clear selections from.
     * @returns {void}
     *
     * @hidden
     */
    removeRowColSelection(table: HTMLTableElement): void;
    private clearPinnedGripperSelection;
    private showGripperPopup;
    /**
     * Handles removal of the active popup instance.
     * Hides the popup, destroys it via the parent renderer, and clears the reference.
     *
     * @returns {void}
     *
     * @hidden
     */
    handleRemovePopup(): void;
    private handleEscapeAction;
    private focusCellsInRows;
    private focusCellsInColumns;
    /**
     * Resets all row/column selection UI states: clears visual selection classes,
     * hides floating and pinned grippers (both row and column), and removes cell focus.
     * @returns {void}
     *
     * @hidden
     */
    resetAllTableSelectionUI(): void;
    destroy(): void;
}
