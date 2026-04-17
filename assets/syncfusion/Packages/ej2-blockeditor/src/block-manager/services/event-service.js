import * as constants from '../../common/constant';
import { events } from '../../common/constant';
/**
 * Manages block change events and their tracking for the BlockEditor.
 *
 * @hidden
 */
var EventService = /** @class */ (function () {
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    function EventService(manager) {
        this.parent = manager;
        this.blockChanges = [];
        this.addEventListener();
    }
    EventService.prototype.addEventListener = function () {
        this.parent.observer.on(constants.CLEAREVENTCHANGES, this.clearEventChanges, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    EventService.prototype.removeEventListener = function () {
        this.parent.observer.off(constants.CLEAREVENTCHANGES, this.clearEventChanges);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Adds a block change operation to the collection.
     *
     * @param {BlockChange} change - The block change to add.
     * @returns {void}
     * @hidden
     */
    EventService.prototype.addChange = function (change) {
        this.blockChanges.push(change);
    };
    /**
     * Retrieves the current collection of block change operations.
     *
     * @returns {BlockChange[]} change - Array of block change operations.
     * @hidden
     */
    EventService.prototype.getChanges = function () {
        return this.blockChanges;
    };
    /**
     * Clears all recorded block change operations.
     *
     * @returns {void}
     * @hidden
     */
    EventService.prototype.clearEventChanges = function () {
        this.blockChanges = [];
    };
    EventService.prototype.destroy = function () {
        this.blockChanges = null;
        this.removeEventListener();
    };
    return EventService;
}());
export { EventService };
