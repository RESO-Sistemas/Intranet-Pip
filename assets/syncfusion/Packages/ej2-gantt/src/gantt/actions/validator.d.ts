import { Gantt } from '../base/gantt';
import { IGanttData, IPredecessor } from '../base/interface';
interface CycleCheckResult {
    wouldCreate: boolean;
    cycles: string[][];
}
export declare class cyclicValidator {
    private idToItem;
    private parentToChildren;
    private leafCache;
    private adjacency;
    private resolvedEdgesPerTask;
    private cycles;
    private topoOrder;
    private parent;
    constructor(gantt: Gantt, flatDataCollection: Map<string, IGanttData>);
    private buildMaps;
    private getLeafDescendants;
    private resolveOnePred;
    /**
     * Resolve every predecessor in the dataset once.
     * Runs in O(N + E) total time complexity.
     *
     * @returns {void} Nothing is returned.
     */
    resolve(): void;
    /**
     * Returns resolved predecessor edges for a given task ID.
     *
     * @param {string | number} taskId - Task ID (string or number) to retrieve resolved predecessors for
     * @returns {{ fromLeaf: string; toLeaf: string; source: IPredecessor }[]} Array of resolved edges, empty if none
     * @private
     */
    private getResolvedPredecessorsForTask;
    /**
     * Creates a deep clone of the current adjacency map.
     *
     * @returns {Map<string, Set<string>>} A new Map with the same keys and independently cloned Sets
     * @private
     */
    private cloneAdjacency;
    /**
     * Creates a temporary clone of the adjacency map and adds resolved edges from the given predecessor.
     * Used by cycle detection to simulate adding a dependency without modifying the original graph.
     *
     * @param {IPredecessor} pred - The predecessor object to resolve and add
     * @returns {Map<string, Set<string>>} A new adjacency map including the resolved edges
     * @private
     */
    private addPredToAdjacencyClone;
    /**
     * Check if adding the given predecessor would create a cycle.
     *
     * @param {IPredecessor} pred - The predecessor to test for cycle creation.
     * @returns {CycleCheckResult} An object describing whether a cycle would be created and the cycles found.
     * @private
     */
    wouldCreateCycleWhenAdding(pred: IPredecessor): CycleCheckResult;
    private detectAllCycles;
    private removePredecessor;
    private getCyclesWithDetails;
    private detectCyclesStatic;
    /**
     * Compute topological order using Kahn's algorithm.
     * Only valid when no cycles exist in the graph.
     *
     * @returns {string[]} The nodes in topological order.
     */
    private computeTopologicalOrder;
}
export {};
