import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
import { TableUIManager } from '../../plugins/table/ui-manager';
import { TableContext } from '../../base/interface';
export declare class TableRenderer {
    private parent;
    private uiManagers;
    nonEditableElements: string[];
    constructor(editor: BlockManager);
    private addEventListener;
    private removeEventListener;
    /**
     * Renders the table block element in the editor
     *
     * @param {BlockModel} block - The data model of the block, used to determine available actions and state.
     * @param {HTMLElement} blockElement - The root DOM element representing the table block.
     * @returns {HTMLElement} - The table container element
     * @hidden
     */
    renderTable(block: BlockModel, blockElement: HTMLElement): HTMLElement;
    /**
     * Refreshes the column width and it's mode based on available container width
     *
     * @param {BlockModel} block - The data model of the block.
     * @returns {void}
     * @hidden
     */
    refreshColWidths(block: BlockModel): void;
    /**
     * Attaches unified hover UI elements (dots, hit-zones, drag lines, action menu, and insert handles)
     * to the specified block when the mouse hovers over it
     *
     * @param {HTMLTableElement} table - The table element associated with the block (used for certain block types).
     * @param {HTMLElement} blockElement - The root DOM element representing the table block.
     * @param {BlockModel} blockModel - The data model of the block, used to determine available actions and state.
     * @returns {void}
     * @hidden
     */
    attachHoverUI(table: HTMLTableElement, blockElement: HTMLElement, blockModel: BlockModel): void;
    /**
     * Removes the created ui manager instance for the particular block
     *
     * @param {string} blockId - The id of the table block
     * @returns {void}
     * @hidden
     */
    removeHoverUI(blockId: string): void;
    /**
     * Registers the UI manager instance in map for retrieving.
     *
     * @param {string} blockId - The id of the table block
     * @returns {TableUIManager} - Manager instance
     * @hidden
     */
    registerUIManager(blockId: string): TableUIManager;
    /**
     * Fetches the UI manager instance based on blockId.
     *
     * @param {string} blockId - The id of the table block
     * @returns {TableUIManager} - Manager instance
     * @hidden
     */
    getManager(blockId: string): TableUIManager;
    /**
     * Updates the read-only state of a table block by toggling content editing capabilities.
     *
     * @param {HTMLTableElement} element - The table element to update.
     * @param {boolean} value - `true` to make the table read-only, `false` to make it editable.
     * @returns {void}
     * @hidden
     */
    updateTableReadyOnlyState(element: HTMLTableElement, value: boolean): void;
    /**
     * Based on current focused cell element, resolves the context and returns it.
     *
     * @returns {TableContext} - The context object containing details about current focused table
     * @hidden
     */
    resolveTableContext(): TableContext;
    private handleHeaderInput;
    private destroyAllTableManagers;
    destroy(): void;
}
