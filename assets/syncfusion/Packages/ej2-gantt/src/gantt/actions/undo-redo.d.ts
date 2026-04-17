import { Gantt } from '../base/gantt';
export declare class UndoRedo {
    private parent;
    constructor(parent: Gantt);
    private isUndoRedoPerformed;
    private changedRecords;
    previousZoomingLevel: Object;
    private getRedoCollection;
    private getUndoCollection;
    private currentAction;
    private redoEnabled;
    private previousSortedColumns;
    private searchString;
    private isFromUndoRedo;
    private undoActionDetails;
    private sortedColumnsLength;
    private isZoomingUndoRedoProgress;
    private isPreventRowDeselectOnUndoRedo;
    private uniqueDeletedRecords;
    private isInHierarchyOf;
    private isPartOfExistingHierarchy;
    /**
     *Initiates an undo action to revert the most recent change performed.
     *
     * @returns {void}
     * @public
     */
    private undoAction;
    /**
     *Initiates an redo action to reapply the most recent undone change performed.
     *
     * @returns {void}
     * @public
     */
    private redoAction;
    private findTaskRowIndex;
    private getResourceViewRowIndex;
    private createUndoCollection;
    private disableRedo;
    private findPosition;
    getModuleName(): string;
    /**
     * Destroys the UndoRedo of Gantt.
     *
     * @returns {void} .
     * @private
     */
    destroy(): void;
}
