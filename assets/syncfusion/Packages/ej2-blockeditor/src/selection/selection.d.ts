import { RangePath, IBlockSelectionState } from '../common/interface';
/**
 * Selection manager for the block editor.
 * This class handles the selection of blocks and text within blocks.
 * It also provides methods to save and restore the selection.
 *
 */
export declare class NodeSelection {
    editorWrapper: HTMLElement;
    private currentRange;
    private rangeBackup;
    savedSelectionState: IBlockSelectionState;
    constructor(wrapper: HTMLElement);
    /**
     * Saves the current selection state, supporting both single and multi-block selections
     *
     * @returns {void}
     */
    saveSelection(): void;
    /**
     * Restores the previously saved selection
     *
     * @returns {void}
     */
    restoreSelection(): void;
    /**
     * Calculates offset within the selection
     *
     * @param {Range} globalRange The global selection range
     * @param {HTMLElement} contentElement The content element
     * @param {boolean} isStart Specifies whether it is start block
     * @returns {number} The calculated offset value
     */
    private calculateOffset;
    /**
     * Finds the DOM node and offset that corresponds to a text position
     *
     * @param {HTMLElement} container The container to search in
     * @param {number} targetOffset The character offset to find
     * @returns {object|null} Object with node and offset, or null if not found
     */
    private findNodeAndOffsetFromTextPosition;
    /**
     * Gets the current selection
     *
     * @returns {Selection | null} The current selection or null
     * @hidden
     */
    getSelection(): Selection | null;
    /**
     * Clears the current selection in the editor
     *
     * @returns {void}
     * @hidden
     */
    clearSelection(): void;
    /**
     * Gets the stored range
     *
     * @returns {Range | null} The stored range or null
     * @hidden
     */
    getStoredRange(): Range | null;
    /**
     * Gets the stored backup range
     *
     * @returns {RangePath} The stored range or null
     * @hidden
     */
    getStoredBackupRange(): RangePath;
    /**
     * Stores the current range
     *
     * @returns {void}
     * @hidden
     */
    storeCurrentRange(): void;
    /**
     * Gets the current range
     *
     * @returns {Range | null} The current range or null
     * @hidden
     */
    getRange(): Range | null;
    /**
     * Gets the position of the current selection
     *
     * @returns {Object} Position object with x and y coordinates
     * @hidden
     */
    getSelectionPosition(): {
        x: number;
        y: number;
    };
    /**
     * Checks if the current selection is collapsed (cursor only)
     *
     * @returns {boolean} True if selection is collapsed
     * @hidden
     */
    isCollapsed(): boolean;
    /**
     * Gets the selected text
     *
     * @returns {string} Selected text or empty string
     * @hidden
     */
    getSelectedText(): string;
    /**
     * Creates a range with the specified start, end nodes and offsets.
     *
     * @param {Node} startNode - The start node of the range.
     * @param {Node} endNode - The end node of the range.
     * @param {number} startOffset - The start offset of the range.
     * @param {number} endOffset - The end offset of the range.
     *
     * @returns {void} - Returns void
     * @hidden
     */
    createRangeWithOffsets(startNode: Node, endNode: Node, startOffset: number, endOffset: number): Range;
    /**
     * Checks if selection contains or intersects with a specific node type
     *
     * @param {string} tagName - The tag name to check for.
     * @param {HTMLElement} container - The container to search within.
     * @returns {boolean} True if selection contains or intersects with the specified tag.
     * @hidden
     */
    selectionContainsNodeType(tagName: string, container: HTMLElement): boolean;
    /**
     * Gets a node of specific type from the current selection
     *
     * @param {string} tagName - The tag name of the node to find.
     * @returns {HTMLElement | null} The found node or null if not found.
     * @hidden
     */
    getNodeFromSelection(tagName: string): HTMLElement | null;
    /**
     * Checks whether the entire editor is selected or not.
     *
     * @returns {boolean} - Returns true if the entire editor is selected, otherwise false.
     * @hidden
     */
    checkIsEntireEditorSelected(): boolean;
}
