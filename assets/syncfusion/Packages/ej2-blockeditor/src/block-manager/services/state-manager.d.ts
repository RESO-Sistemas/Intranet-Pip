import { BlockModel } from '../../models/index';
import { BlockManager } from '../base/block-manager';
/**
 * Manages state and data in the BlockEditor
 */
export declare class StateManager {
    private parent;
    /**
     * Creates a new StateManager instance
     *
     * @param {BlockManager} parent The parent BlockManager instance
     */
    constructor(parent: BlockManager);
    /**
     * Updates the internal content models based on user typing
     *
     * @param {HTMLElement} blockElement - The block element being updated
     * @param {Event} updateEvent - The original input event that triggered the update (optional)
     * @returns {void}
     * @hidden
     */
    updateContentOnUserTyping(blockElement: HTMLElement, updateEvent?: Event): void;
    private getContentElementForUpdate;
    /**
     * Populates blocks with unique IDs if they don't have them
     *
     * @param {BlockModel[]} blocks Array of block models
     * @param {string} parentBlockId Optional parent block ID
     * @returns {void}
     * @hidden
     */
    populateUniqueIds(blocks: BlockModel[], parentBlockId?: string): void;
    /**
     * Updates the property changes to the model
     *
     * @returns {void}
     * @hidden
     */
    updateManagerBlocks(): void;
}
