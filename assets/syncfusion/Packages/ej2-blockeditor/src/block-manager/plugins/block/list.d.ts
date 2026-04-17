import { BlockModel } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class ListPlugin {
    private parent;
    private static readonly INDENT_STEP_SIZE;
    private static ROMANNUMERALLOOKUP;
    constructor(manager: BlockManager);
    /**
     * Handles the key press event for list blocks.
     *
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {HTMLElement} blockElement - The block element.
     * @returns {boolean} - Returns true if the event is handled.
     * @hidden
     */
    handleListKeyActions(event: KeyboardEvent, blockElement: HTMLElement): boolean;
    /**
     * Handles creation of new list item on particular key triggers
     *
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {HTMLElement} blockElement - The block element.
     * @param {BlockModel} blockModel - The block model.
     * @returns {void}
     * @hidden
     */
    handleListTriggerKey(event: KeyboardEvent, blockElement: HTMLElement, blockModel: BlockModel): void;
    private handleEnterKey;
    private handleBackspaceKey;
    private transformBlockToList;
    /**
     * Updates the list item markers the given block element.
     *
     * @param {HTMLElement} blockElement - The block element to update.
     * @returns {void}
     * @hidden
     */
    updateListItemMarkers(blockElement: HTMLElement): void;
    private getNumberedListItemIndex;
    private getIndentLevel;
    private getListMarker;
    /**
     * Recalculate the markers for all list items in the editor.
     *
     * @returns {void}
     * @hidden
     */
    recalculateMarkersForListItems(): void;
    private setNumberedListMarker;
    private getAllBlockElements;
}
