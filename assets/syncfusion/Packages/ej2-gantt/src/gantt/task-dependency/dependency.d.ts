/**
 * Predecessor calculation goes here
 */
import { IGanttData, ITaskData, IPredecessor, IConnectorLineObject } from '../base/interface';
import { Gantt } from '../base/gantt';
export declare class Dependency {
    private parent;
    validatedChildItems: IGanttData[];
    private dateValidateModule;
    private parentRecord;
    private parentIds;
    private parentPredecessors;
    private validatedParentIds;
    isValidatedParentTaskID: string;
    private storeId;
    isChildRecordValidated: (number | string)[];
    private cumulativePredecessorChanges;
    private validatedOffsetIds;
    predecessorsCollection: Map<string, IGanttData>;
    successorsCollection: Map<string, IGanttData>;
    constructor(gantt: Gantt);
    /**
     * Method to populate predecessor collections in records
     *
     * @returns {void} .
     * @private
     */
    ensurePredecessorCollection(): void;
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {ITaskData} ganttProp .
     * @param {Map<string, IGanttData>} flatDataMap .
     * @returns {void} .
     * @private
     */
    ensurePredecessorCollectionHelper(ganttData: IGanttData, ganttProp: ITaskData, flatDataMap?: Map<string, IGanttData>): void;
    /**
     * To render unscheduled empty task with 1 day duration during predecessor map
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateUnscheduledDependency(data: IGanttData): void;
    /**
     *
     * @param {string} fromId .
     * @returns {boolean} .
     */
    private checkIsParent;
    getRootParent(rec: IGanttData): IGanttData;
    validateParentPredecessor(fromRecord: IGanttData, toRecord: IGanttData): boolean;
    /**
     * Get predecessor collection object from predecessor string value
     *
     * @param {string | number} predecessorValue .
     * @param {IGanttData} ganttRecord .
     * @param {Map<string, IGanttData>} flatDataMap .
     * @returns {IPredecessor[]} .
     * @private
     */
    calculatePredecessor(predecessorValue: string | number, ganttRecord?: IGanttData, flatDataMap?: Map<string, IGanttData>): IPredecessor[];
    private processPredecessorElement;
    private processElementFormat;
    private extractAndValidateMatch;
    private determinePredecessorType;
    private handleParentDependency;
    private handleUndoRedoParentRecords;
    private removeDuplicatePredecessors;
    private generatePredecessorValue;
    /**
     * Get predecessor value as string with offset values
     *
     * @param {IGanttData} data .
     * @returns {string} .
     * @private
     */
    getPredecessorStringValue(data: IGanttData): string;
    private getOffsetDurationUnit;
    /**
     * Update predecessor object in both from and to tasks collection
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    updatePredecessors(flatDataCollection?: Map<string, IGanttData>): void;
    /**
     * To update predecessor collection to successor tasks
     *
     * @param {IGanttData} ganttRecord .
     * @param {IGanttData[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    updatePredecessorHelper(ganttRecord: IGanttData, predecessorsCollection?: IGanttData[], flatDataCollection?: Map<string, IGanttData>): void;
    private traverseParents;
    /**
     * Method to validate date of tasks with predecessor values for all records
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    updatedRecordsDateByPredecessor(flatDataCollection?: Map<string, IGanttData>): void;
    updateParentPredecessor(flatDataCollection?: Map<string, IGanttData>): void;
    /**
     * To validate task date values with dependency
     *
     * @param {IGanttData} ganttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    validatePredecessorDates(ganttRecord: IGanttData, flatDataCollection?: Map<string, IGanttData>): void;
    private getConstraintDate;
    /**
     * Method to validate task with predecessor
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @param {IPredecessor[]} childPredecessorCollection .
     * @returns {void} .
     */
    private validateChildGanttRecord;
    private filterPredecessorsByTarget;
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {Date} .
     * @private
     */
    getPredecessorDate(ganttRecord: IGanttData, predecessorsCollection: IPredecessor[], flatDataCollection?: Map<string, IGanttData>): Date;
    /**
     * Get validated start date as per predecessor type
     *
     * @param {ITaskData} ganttProperty .
     * @param {ITaskData} parentRecordProperty .
     * @param {IPredecessor} predecessor .
     * @returns {Date} .
     */
    private getValidatedStartDate;
    /**
     *
     * @param {Date} date .
     * @param {IPredecessor} predecessor .
     * @param {ITaskData} record .
     * @returns {void} .
     */
    private updateDateByOffset;
    /**
     *
     * @param {IGanttData} records .
     * @returns {void} .
     * @private
     */
    createConnectorLinesCollection(records?: IGanttData[]): void;
    /**
     *
     * @param {object[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @param {number} rowHeight .
     * @returns {void} .
     */
    private addPredecessorsCollection;
    /**
     * To refresh connector line object collections
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor} predecessor .
     * @param {number} rowHeight .
     * @returns {void} .
     * @private
     */
    updateConnectorLineObject(parentGanttRecord: IGanttData, childGanttRecord: IGanttData, predecessor: IPredecessor, rowHeight?: number): IConnectorLineObject;
    /**
     * Determines whether the dependent task should be updated based on its predecessor relationship,
     * considering the dependency type (FS, SS, SF, FF), predecessor offsets, and previous dates.
     *
     * @param {IGanttData} parentGanttRecord - The predecessor task.
     * @param {IGanttData} record - The dependent task to evaluate.
     * @param {Date} parentPreviousStart - The previous start date of the predecessor task.
     * @param {Date} parentPreviousEnd - The previous end date of the predecessor task.
     * @param {boolean} predecessorConnected - Optional flag indicating if the predecessor link is already established.
     * @returns {boolean} - Returns true if the dependent task requires an update; otherwise, false.
     */
    private shouldUpdatePredecessor;
    /**
     * Handles the update logic for a task's dependency and validates whether child tasks should be updated.
     * It retrieves the previous start and end dates from the stored records to determine if dependency validation is required.
     * If predecessor updates are needed or offset updates are enabled, it triggers child task validation.
     *
     * @param {IGanttData} parentGanttRecord - The parent task whose dependencies are being evaluated.
     * @param {IGanttData} record - The current task being updated.
     * @returns {void}
     */
    private handleTaskUpdate;
    private validateAllChildPredecessorsWithUpdate;
    private updateParentCollection;
    /**
     *
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor[]} previousValue .
     * @param {string} validationOn .
     * @returns {void} .
     * @private
     */
    validatePredecessor(childGanttRecord: IGanttData, previousValue: IPredecessor[], validationOn: string): void;
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     */
    private updateChildItems;
    /**
     * To get updated child records.
     *
     * @param {IGanttData} parentRecord .
     * @param {IGanttData} childLists .
     * @returns {void} .
     */
    private getUpdatableChildRecords;
    /**
     *
     * @param {IGanttData} data .
     * @param {Date} newStartDate .
     * @returns {void} .
     */
    private calculateDateByRoundOffDuration;
    private getRecord;
    /**
     * Method to get validate able predecessor alone from record
     *
     * @param {IGanttData} record .
     * @returns {IPredecessor[]} .
     * @private
     */
    getValidPredecessor(record: IGanttData): IPredecessor[];
    private compareObjects;
    private getOffsetForPredecessor;
    private calculateOffset;
}
