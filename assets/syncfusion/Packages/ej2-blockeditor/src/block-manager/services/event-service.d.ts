import { BlockChange } from '../../models/index';
import { BlockManager } from '../base/block-manager';
/**
 * Manages block change events and their tracking for the BlockEditor.
 *
 * @hidden
 */
export declare class EventService {
    private parent;
    private blockChanges;
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager: BlockManager);
    private addEventListener;
    private removeEventListener;
    /**
     * Adds a block change operation to the collection.
     *
     * @param {BlockChange} change - The block change to add.
     * @returns {void}
     * @hidden
     */
    addChange(change: BlockChange): void;
    /**
     * Retrieves the current collection of block change operations.
     *
     * @returns {BlockChange[]} change - Array of block change operations.
     * @hidden
     */
    getChanges(): BlockChange[];
    /**
     * Clears all recorded block change operations.
     *
     * @returns {void}
     * @hidden
     */
    private clearEventChanges;
    private destroy;
}
