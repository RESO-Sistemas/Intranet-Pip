var cyclicValidator = /** @class */ (function () {
    function cyclicValidator(gantt, flatDataCollection) {
        this.idToItem = new Map();
        this.parentToChildren = new Map();
        this.leafCache = new Map(); // memoize leaf descendants
        this.adjacency = new Map(); // from -> set(to)
        this.resolvedEdgesPerTask = new Map();
        this.cycles = [];
        this.topoOrder = null;
        this.parent = gantt;
        this.buildMaps(flatDataCollection);
    }
    cyclicValidator.prototype.buildMaps = function (flatDataCollection) {
        this.idToItem.clear();
        if (flatDataCollection) {
            flatDataCollection.clear();
        }
        this.parentToChildren.clear();
        if (this.parent.viewType === 'ProjectView') {
            for (var _i = 0, _a = this.parent.flatData; _i < _a.length; _i++) {
                var item = _a[_i];
                if (flatDataCollection) {
                    flatDataCollection.set(item.ganttProperties.rowUniqueID.toString(), item);
                }
                var id = String(item.ganttProperties.taskId);
                this.idToItem.set(id, item);
                // initialize adjacency/containers
                if (!this.adjacency.has(id)) {
                    this.adjacency.set(id, new Set());
                }
                // parent map
                var parent_1 = void 0;
                if (item.parentItem && item.parentItem.taskId) {
                    parent_1 = item.parentItem.taskId;
                }
                if (parent_1 !== undefined && parent_1 !== null && parent_1 !== '') {
                    var pid = (parent_1);
                    if (!this.parentToChildren.has(pid)) {
                        this.parentToChildren.set(pid, []);
                    }
                    this.parentToChildren.get(pid).push(id);
                }
            }
        }
    };
    cyclicValidator.prototype.getLeafDescendants = function (nodeId) {
        if (this.leafCache.has(nodeId)) {
            return this.leafCache.get(nodeId);
        }
        var result = [];
        result.push(nodeId);
        var stack = [nodeId];
        while (stack.length) {
            var cur = stack.pop();
            var children = this.parentToChildren.get(cur);
            if (!children || children.length === 0) {
                result.push(cur);
            }
            else {
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var c = children_1[_i];
                    stack.push(c);
                }
            }
        }
        this.leafCache.set(nodeId, result);
        return result;
    };
    cyclicValidator.prototype.resolveOnePred = function (p) {
        var fromId = (p.from);
        var toId = (p.to);
        var fromLeaves = this.getLeafDescendants(fromId);
        var toLeaves = this.getLeafDescendants(toId);
        var edges = [];
        for (var _i = 0, fromLeaves_1 = fromLeaves; _i < fromLeaves_1.length; _i++) {
            var f = fromLeaves_1[_i];
            for (var _a = 0, toLeaves_1 = toLeaves; _a < toLeaves_1.length; _a++) {
                var t = toLeaves_1[_a];
                edges.push({ fromLeaf: f, toLeaf: t, source: p });
            }
        }
        return edges;
    };
    /**
     * Resolve every predecessor in the dataset once.
     * Runs in O(N + E) total time complexity.
     *
     * @returns {void} Nothing is returned.
     */
    cyclicValidator.prototype.resolve = function () {
        this.adjacency.clear();
        this.resolvedEdgesPerTask.clear();
        this.leafCache.clear();
        this.cycles = [];
        this.topoOrder = null;
        // Ensure adjacency nodes exist
        var keys = Array.from(this.idToItem.keys());
        for (var i = 0; i < keys.length; i++) {
            var id = keys[i];
            if (!this.adjacency.has(id)) {
                this.adjacency.set(id, new Set());
            }
        }
        // For each task, expand its predecessor collection and add edges
        var iterator = this.idToItem.entries();
        var entry = iterator.next();
        while (!entry.done) {
            var _a = entry.value, id = _a[0], item = _a[1];
            var preds = item.ganttProperties.predecessor || [];
            var resolvedList = [];
            for (var i = 0; i < preds.length; i++) {
                var p = preds[i];
                var edges = this.resolveOnePred(p);
                for (var j = 0; j < edges.length; j++) {
                    var e = edges[j];
                    if (!this.adjacency.has(e.fromLeaf)) {
                        this.adjacency.set(e.fromLeaf, new Set());
                    }
                    this.adjacency.get(e.fromLeaf).add(e.toLeaf);
                    resolvedList.push(e);
                }
            }
            this.resolvedEdgesPerTask.set(id, resolvedList);
            // Advance iterator
            entry = iterator.next();
        }
        // After adjacency built, run cycle detection once
        this.cycles = this.detectAllCycles();
        if (this.cycles.length === 0) {
            this.topoOrder = this.computeTopologicalOrder();
        }
    };
    /**
     * Returns resolved predecessor edges for a given task ID.
     *
     * @param {string | number} taskId - Task ID (string or number) to retrieve resolved predecessors for
     * @returns {{ fromLeaf: string; toLeaf: string; source: IPredecessor }[]} Array of resolved edges, empty if none
     * @private
     */
    // eslint-disable-next-line
    cyclicValidator.prototype.getResolvedPredecessorsForTask = function (taskId) {
        return this.resolvedEdgesPerTask.get(String(taskId)) || [];
    };
    /**
     * Creates a deep clone of the current adjacency map.
     *
     * @returns {Map<string, Set<string>>} A new Map with the same keys and independently cloned Sets
     * @private
     */
    // eslint-disable-next-line
    cyclicValidator.prototype.cloneAdjacency = function () {
        var m = new Map();
        var entries = this.adjacency.entries();
        var entryResult = entries.next();
        while (!entryResult.done) {
            var pair = entryResult.value;
            var k = pair[0];
            var set = pair[1];
            m.set(k, new Set(Array.from(set)));
            entryResult = entries.next();
        }
        return m;
    };
    /**
     * Creates a temporary clone of the adjacency map and adds resolved edges from the given predecessor.
     * Used by cycle detection to simulate adding a dependency without modifying the original graph.
     *
     * @param {IPredecessor} pred - The predecessor object to resolve and add
     * @returns {Map<string, Set<string>>} A new adjacency map including the resolved edges
     * @private
     */
    // eslint-disable-next-line
    cyclicValidator.prototype.addPredToAdjacencyClone = function (pred) {
        var clone = this.cloneAdjacency();
        // we must use existing leafCache + maps to resolve quickly
        var edges = this.resolveOnePred(pred);
        for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
            var e = edges_1[_i];
            if (clone && !clone.has(e.fromLeaf)) {
                clone.set(e.fromLeaf, new Set());
            }
            clone.get(e.fromLeaf).add(e.toLeaf);
        }
        return clone;
    };
    /**
     * Check if adding the given predecessor would create a cycle.
     *
     * @param {IPredecessor} pred - The predecessor to test for cycle creation.
     * @returns {CycleCheckResult} An object describing whether a cycle would be created and the cycles found.
     * @private
     */
    cyclicValidator.prototype.wouldCreateCycleWhenAdding = function (pred) {
        var adj = this.addPredToAdjacencyClone(pred);
        var cycles = this.detectCyclesStatic(adj);
        return {
            wouldCreate: cycles.length > 0,
            cycles: cycles
        };
    };
    cyclicValidator.prototype.detectAllCycles = function () {
        var cycles = this.detectCyclesStatic(this.adjacency);
        var result = [];
        for (var _i = 0, cycles_1 = cycles; _i < cycles_1.length; _i++) {
            var cycle = cycles_1[_i];
            if (cycle[0] && cycle[1]) {
                result.push({ fromId: cycle[0], toId: cycle[1] });
            }
        }
        return result;
    };
    cyclicValidator.prototype.removePredecessor = function (predecessorString, toRemove) {
        if (!predecessorString) {
            return '';
        }
        if (predecessorString === toRemove) {
            return '';
        }
        var parts = predecessorString
            .split(',')
            .map(function (s) { return s.trim(); })
            .filter(function (part) { return part !== toRemove && part !== toRemove.trim(); });
        return parts.join(',');
    };
    cyclicValidator.prototype.getCyclesWithDetails = function (cycles) {
        var _this = this;
        var parts = cycles.map(function (cycle) {
            var fromId = cycle['fromId'];
            var toId = cycle['toId'];
            var toTask = _this.idToItem.get(toId);
            var fromTask = _this.idToItem.get(fromId);
            var toPredecessors = toTask.ganttProperties.predecessor;
            // Default error label
            var errorLabel = "Task ID " + fromId + " to Task ID " + toId;
            var newPred = [];
            // STRICTLY check the 'toTask' (Successor) only.
            if (toPredecessors) {
                for (var i = 0; i < toPredecessors.length; i++) {
                    var pred = toPredecessors[i];
                    // Resolve the predecessor's ID to its leaves
                    var leaves = _this.getLeafDescendants(pred.from);
                    // Check if the predecessor (or its children) matches the cycle source 'fromId'
                    if (pred.from === fromId || (leaves && leaves.indexOf(fromId) !== -1)) {
                        // Update label to show the actual Predecessor ID (e.g., "1" instead of "3")
                        errorLabel = "Task ID " + pred.from + " to Task ID " + toId;
                        var predType = pred.from + pred.type;
                        predType = _this.parent.predecessorModule['generatePredecessorValue'](pred, predType);
                        // Remove ONLY this invalid dependency from the 'toTask'
                        var dependencyField = _this.parent.taskFields.dependency;
                        toTask.taskData[dependencyField] = toTask[dependencyField] =
                            toTask.ganttProperties.predecessorsName =
                                _this.removePredecessor(toTask.ganttProperties.predecessorsName, predType);
                        var removedString = predType.split(',');
                        removedString.forEach(function (str) {
                            var id = str.replace(/(FS|SS|SF|FF).*$/, '');
                            var targetTask = _this.idToItem.get(id);
                            if (targetTask.ganttProperties.predecessor) {
                                targetTask.ganttProperties.predecessor = targetTask.ganttProperties.predecessor.filter(function (pred) { return pred.to.toString() !== toTask.ganttProperties.taskId.toString(); });
                            }
                        });
                        continue;
                    }
                    else {
                        newPred.push(pred);
                    }
                }
                // Update the task with the clean list
                toTask.ganttProperties.predecessor = newPred;
            }
            return errorLabel;
        });
        // Remove duplicates from the error messages (e.g. if 3->6 and 4->6 both map to "1->6", show it once)
        var uniqueParts = parts.filter(function (value, index, self) { return self.indexOf(value) === index; });
        var list = uniqueParts.join(', ');
        return "Cyclic dependency is detected for the tasks from " + list + ". Please provide valid dependency";
    };
    cyclicValidator.prototype.detectCyclesStatic = function (adj) {
        var WHITE = 0;
        var GRAY = 1;
        var BLACK = 2;
        var state = new Map();
        // Initialize all nodes as WHITE
        var keysInit = Array.from(adj.keys());
        for (var i = 0; i < keysInit.length; i++) {
            var k = keysInit[i];
            state.set(k, WHITE);
        }
        var stack = [];
        var cycles = [];
        var dfs = function (node) {
            state.set(node, GRAY);
            stack.push(node);
            var neighbors = adj.get(node);
            if (neighbors) {
                var neighborArray = Array.from(neighbors);
                for (var i = 0; i < neighborArray.length; i++) {
                    var nb = neighborArray[i];
                    var s = state.has(nb) ? state.get(nb) : WHITE;
                    if (s === WHITE) {
                        dfs(nb);
                    }
                    else if (s === GRAY) {
                        // Cycle detected
                        var idx = -1;
                        for (var j = 0; j < stack.length; j++) {
                            if (stack[j] === nb) {
                                idx = j;
                                break;
                            }
                        }
                        if (idx !== -1) {
                            var cyclePath = [];
                            for (var k = idx; k < stack.length; k++) {
                                cyclePath.push(stack[k]);
                            }
                            cycles.push(cyclePath);
                        }
                    }
                    // BLACK → do nothing
                }
            }
            stack.pop();
            state.set(node, BLACK);
        };
        // Run DFS from all nodes
        var keys = Array.from(adj.keys());
        for (var i = 0; i < keys.length; i++) {
            var node = keys[i];
            if (state.get(node) === WHITE) {
                dfs(node);
            }
        }
        // Deduplicate cycles using canonical rotation
        var unique = [];
        var seen = new Set();
        for (var _i = 0, cycles_2 = cycles; _i < cycles_2.length; _i++) {
            var c = cycles_2[_i];
            if (c.length === 0) {
                continue;
            }
            var nodes = c.slice();
            var minIdx = 0;
            for (var i = 1; i < nodes.length; i++) {
                if (nodes[i] < nodes[minIdx]) {
                    minIdx = i;
                }
            }
            var rot = nodes.slice(minIdx).concat(nodes.slice(0, minIdx));
            var key = rot.join('->');
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(rot);
            }
        }
        return unique;
    };
    /**
     * Compute topological order using Kahn's algorithm.
     * Only valid when no cycles exist in the graph.
     *
     * @returns {string[]} The nodes in topological order.
     */
    cyclicValidator.prototype.computeTopologicalOrder = function () {
        var indeg = new Map();
        var keys = Array.from(this.adjacency.keys());
        for (var i = 0; i < keys.length; i++) {
            indeg.set(keys[i], 0);
        }
        var entries = this.adjacency.entries();
        var entryResult = entries.next();
        while (!entryResult.done) {
            var pair = entryResult.value;
            var successors = pair[1];
            var successorIter = successors.values();
            var successorResult = successorIter.next();
            while (!successorResult.done) {
                var to = successorResult.value;
                var current = indeg.has(to) ? indeg.get(to) : 0;
                indeg.set(to, current + 1);
                successorResult = successorIter.next();
            }
            entryResult = entries.next();
        }
        var q = [];
        indeg.forEach(function (degree, taskId) {
            if (degree === 0) {
                q.push(taskId);
            }
        });
        var order = [];
        while (q.length) {
            var n = q.shift(); // Non-null assertion: we know q has elements
            order.push(n);
            var neighbors = this.adjacency.get(n);
            if (neighbors) {
                var iterator = neighbors.values();
                var iterNext = iterator.next();
                while (!iterNext.done) {
                    var nb = iterNext.value; // This is exactly what you had
                    var currentDegree = indeg.has(nb) ? indeg.get(nb) : 0;
                    indeg.set(nb, currentDegree - 1);
                    if (indeg.get(nb) === 0) {
                        q.push(nb);
                    }
                    // Advance to next item
                    iterNext = iterator.next();
                }
            }
        }
        return order;
    };
    return cyclicValidator;
}());
export { cyclicValidator };
