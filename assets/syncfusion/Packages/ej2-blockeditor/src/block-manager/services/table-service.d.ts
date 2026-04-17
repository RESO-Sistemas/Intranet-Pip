import { BlockManager } from '../base/block-manager';
import { ITableBlockSettings, TableRowModel, BlockModel } from '../../models/index';
import { ITableColumnDeletionOptions, ITableColumnInsertOptions, ITableRowDeletionOptions, ITableRowInsertOptions, PayloadCell } from '../base/interface';
/**
 * Manages core table block actions
 *
 * @hidden
 */
export declare class TableService {
    private parent;
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager: BlockManager);
    /**
     * Creates and returns a fully rendered <tr> element for the given row model.
     *
     * @param {number} visualRowIndex - The visual row index in DOM (1-based, accounts for header if present)
     * @param {ITableBlockSettings} settings - Current table configuration (columns, enableHeader, enableRowNumbers, etc.)
     * @param {BlockModel} block - The parent table BlockModel
     * @param {TableRowModel} TableRowModel - The row data model to render
     * @returns {HTMLTableRowElement} The created <tr> element with all cells appended
     *
     * @hidden
     */
    createRow(visualRowIndex: number, settings: ITableBlockSettings, block: BlockModel, TableRowModel: TableRowModel): HTMLTableRowElement;
    /**
     * Inserts a new row at the specified position in both model and DOM.
     * Automatically updates row numbers and dataset indices.
     *
     * @param {ITableRowInsertOptions} options - arguments needed for row insertion in specified position.
     * @returns {void}
     *
     * @hidden
     */
    addRowAt(options: ITableRowInsertOptions): void;
    /**
     * Inserts a new column at the specified position in both model and DOM.
     * Handles column model creation, width redistribution, and cell block containers.
     *
     * @param {ITableColumnInsertOptions} options - arguments needed for column insertion in specified position.
     * @returns {void}
     *
     * @hidden
     */
    addColumnAt(options: ITableColumnInsertOptions): void;
    /**
     * Deletes a row from the table at the given DOM/visual row index.
     * Updates model, DOM, row numbers, and dataset attributes.
     *
     * @param {ITableRowDeletionOptions} options - arguments needed for row deletion in specified index.
     * @returns {void}
     *
     * @hidden
     */
    deleteRowAt(options: ITableRowDeletionOptions): void;
    /**
     * Deletes a column from the table at the given data column index.
     * Updates model, colgroup, DOM cells, and dataset attributes.
     *
     * @param {HTMLTableElement} options - The table element
     * @returns {void}
     *
     * @hidden
     */
    deleteColumnAt(options: ITableColumnDeletionOptions): void;
    private assertColDataset;
    /**
     * Clears the content of specified table cells (model + DOM).
     *
     * @param {HTMLTableElement} table - The table element
     * @param {HTMLTableCellElement[]} domCells - Collection of table cell elements to clear contents
     * @returns {void}
     *
     * @hidden
     */
    clearCellContents(table: HTMLTableElement, domCells: HTMLTableCellElement[] | NodeListOf<HTMLTableCellElement>): void;
    applyCellChange(table: HTMLTableElement, cell: PayloadCell, mode: 'clear' | 'restore'): void;
    /**
     * Replaces the blocks inside a specific table cell with the provided blocks.
     * Updates both the data model and the DOM cell content.
     *
     * @param {HTMLTableElement} table - The table element
     * @param {number} dataRowIndex - The data row index in the model (0-based, excludes header)
     * @param {number} dataColIndex - The data column index in the model (0-based, excludes row-number column)
     * @param {BlockModel[]} blocks - Array of blocks to set as cell content
     * @returns {void}
     *
     * @hidden
     */
    setCellBlocks(table: HTMLTableElement, dataRowIndex: number, dataColIndex: number, blocks: BlockModel[]): void;
    /**
     * Sets the header content with the provided value
     * Updates both the data model and the DOM cell content.
     *
     * @param {HTMLTableElement} table - The table element
     * @param {number} dataColIndex - The data column index in the model (0-based, excludes row-number column)
     * @param {string} text - Value to set
     * @returns {void}
     *
     * @hidden
     */
    setHeaderText(table: HTMLTableElement, dataColIndex: number, text: string): void;
    /**
     * Applies visual focus to a table cell and optionally focuses its inner editable block.
     *
     * @param {HTMLElement} cell - The <td> or <th> element to focus
     * @param {boolean} focusInnerBlock - If true, places caret inside the last block of the cell
     * @param {boolean} cursorAtStart - If true and focusing inner block, places cursor at start instead of end
     * @returns {void}
     *
     * @hidden
     */
    addCellFocus(cell: HTMLElement, focusInnerBlock?: boolean, cursorAtStart?: boolean): void;
    /**
     * Removes the focus highlight from all cells in the given table.
     *
     * @param {Element} table - The table element or any element containing the table
     * @returns {void}
     *
     * @hidden
     */
    removeCellFocus(table: Element): void;
    /**
     * Triggers the block update event.
     *
     * @param {BlockModel} block - the block with updated changes.
     * @param {BlockModel} oldBlock - old block
     * @returns {void}
     *
     * @hidden
     */
    triggerBlockUpdate(block: BlockModel, oldBlock: BlockModel): void;
    shiftFocusToBlockInCell(cell: HTMLElement, cursorAtStart?: boolean): void;
    private setColumnWidth;
    private createRowModel;
    private createColumnModel;
    private updateDataColCount;
    private updateRowNumbers;
    private createTableCell;
}
