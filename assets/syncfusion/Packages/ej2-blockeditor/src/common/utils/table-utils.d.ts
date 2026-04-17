import { BlockModel, ITableBlockSettings } from '../../models/index';
export declare function toDomCol(dataCol: number, rowNumberEnabled: boolean): number;
export declare function toDomRow(dataRow: number, headerEnabled: boolean): number;
export declare function toModelRow(domRow: number, headerEnabled: boolean): number;
export declare function getDataCell(tableElement: HTMLTableElement, row: number, col: number): HTMLTableCellElement;
export declare function getHeaderCell(tableElement: HTMLTableElement, col: number): HTMLTableCellElement;
export declare function doesHtmlHasTable(html: string, text?: string): boolean;
export declare function getTableElements(blockId: string, rootEditorElement: HTMLElement, blocks: BlockModel[]): {
    table: HTMLTableElement;
    props: ITableBlockSettings;
} | null;
/**
 * Focuses all editable cells in the table.
 * Useful for "Select All" (Ctrl+A) inside a table.
 *
 * @param {HTMLElement} tableEl - The <table> element inside the table block
 * @returns {void}
 *
 * @hidden
 */
export declare function focusAllCellsInTable(tableEl: HTMLTableElement): void;
/**
 * Removes the focus highlight from all cells in the given table.
 *
 * @param {Element} table - The table element
 * @returns {void}
 *
 * @hidden
 */
export declare function removeFocusFromAllCells(table: Element): void;
/**
 * Returns the current width mode ('px' | 'percent')
 *
 * @param {HTMLTableElement} table - The table element
 * @returns {string} - width mode ('px' | 'percent')
 *
 * @hidden
 */
export declare function getWidthMode(table: HTMLTableElement): 'px' | 'percent';
/**
 * Sets the table width mode ('px' | 'percent')
 *
 * @param {HTMLTableElement} table - The table element
 * @param {string} mode - mode ('px' | 'percent')
 * @returns {void}
 *
 * @hidden
 */
export declare function setTableWidthMode(table: HTMLTableElement, mode: 'px' | 'percent'): void;
/**
 * Performs equal percentage distribution for all cols
 *
 * @param {HTMLTableElement} table - The table element
 * @param {ITableBlockSettings} props - The table settings
 * @returns {void}
 *
 * @hidden
 */
export declare function applyEqualPercent(table: HTMLTableElement, props: ITableBlockSettings): void;
/**
 * Checks whether equal percent fits within the container
 *
 * @param {number} containerWidthPx - The table container width
 * @param {number} nCols - Total number of cols
 * @param {number} minColPx - The minimum value of a column
 * @returns {boolean} - The boolean value
 *
 * @hidden
 */
export declare function projectEqualPercentFits(containerWidthPx: number, nCols: number, minColPx: number): boolean;
/**
 * Changes width of all columns from percent to pixel units
 *
 * @param {HTMLTableElement} table - The table element
 * @param {ITableBlockSettings} props - The table settings
 * @param {object} defaultPxForNew - Default values of new col
 * @returns {void}
 *
 * @hidden
 */
export declare function changeColWidthToPxUnits(table: HTMLTableElement, props: ITableBlockSettings, defaultPxForNew?: {
    index: number;
    width: number;
}): void;
export declare function getColgroupChildren(table: HTMLTableElement): HTMLTableColElement[];
export declare function getSelectedCells(tableBlock: HTMLElement): NodeListOf<HTMLTableCellElement>;
export declare function hasActiveTableSelection(tableBlockElement: HTMLElement): boolean;
