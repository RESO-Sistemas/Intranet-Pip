var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { DiagramAction, RealAction } from '../enum/enum';
import { laneInterChanged, swimLaneMeasureAndArrange, updateHeaderMaxWidth, updatePhaseMaxWidth, updateSwimLaneObject } from '../utility/swim-lane-util';
import { findAnnotation } from '../utility/diagram-util';
import { cloneObject } from '../utility/base-util';
/**
 * Provides collaboration functionality for the Syncfusion Diagram component.
 * The `DiagramCollaboration` class enables real-time collaborative editing by serializing
 * local diagram changes into JSON payloads that can be transmitted to remote users,
 * and by applying incoming remote changes to the local diagram instance.
 * **Key Features:**
 * - Serializes history entries (undo/redo actions) into collaboration-friendly JSON format
 * - Applies remote diagram changes while maintaining consistency
 * - Handles grouped operations for batch updates
 * - Supports various change types: position, size, rotation, collections, properties, etc.
 * **Typical Usage:**
 * 1. Hook into the diagram's history change events
 * 2. Call `serializeHistoryChange()` to get JSON payloads for broadcasting
 * 3. Receive remote changes and apply via `applyRemoteChanges()`
 * @private
 */
var DiagramCollaboration = /** @class */ (function () {
    /**
     * Constructor for the collaborative module
     *
     * @private
     */
    function DiagramCollaboration() {
        /**
         * Buffer for accumulating serialized changes during grouped operations.
         * Cleared when a group action completes.
         * @private
         */
        this.collaborativeCollection = [];
        /**
         * Indicates whether changes are currently being accumulated as part of a group action.
         * Set to true when a StartGroup entry is detected, false when EndGroup completes.
         * @private
         */
        this.isGroupAction = false;
        //constructs the collaborative module
    }
    /**
     * Serializes diagram changes for collaboration.
     * Serializes the given history change arguments into JSON payloads
     * that can be sent to remote collaborators.
     * @param {IHistoryChangeArgs} args - The history change event arguments containing change details.
     * @param {Diagram} diagram - The diagram instance from which the change originated.
     * @returns {string[]} An array of serialized diagram change JSON strings to send to collaborators.
     * @private
     */
    DiagramCollaboration.prototype.serializeHistoryChange = function (args, diagram) {
        if (!args) {
            return [];
        }
        var historyEntry = args.change;
        if (!historyEntry) {
            return [];
        }
        var isUndo = args.action === 'Undo';
        var isStartGroup = historyEntry.type === (isUndo ? 'EndGroup' : 'StartGroup');
        var isEndGroup = historyEntry.type === (isUndo ? 'StartGroup' : 'EndGroup');
        if (historyEntry.type === 'EndGroup') {
            diagram.groupActionDepth += isUndo ? 1 : -1;
        }
        else if (historyEntry.type === 'StartGroup') {
            diagram.groupActionDepth += isUndo ? -1 : 1;
        }
        if (isStartGroup && (diagram.groupActionDepth === 1)) {
            this.collaborativeCollection = [];
            this.isGroupAction = true;
        }
        // 2. Determine the full list of objects affected by the change.
        var changedObjects = this.getChangedObjects(args, args.undoObject, args.redoObject, diagram);
        // 3. Categorize objects and enrich them with additional info
        var _a = this.categorizeAndEnrichObjects(changedObjects, args), nodes = _a.nodes, connectors = _a.connectors;
        var propertyChanges = this.processHistoryEntryType(args, args.undoObject, args.redoObject, historyEntry, diagram);
        // 5. Check if there's any meaningful change to send
        var hasChanges = nodes.length > 0 || connectors.length > 0 || propertyChanges != null;
        if (hasChanges) {
            historyEntry.childTable = args.childTable;
            if (args.childTable) {
                for (var node in args.childTable) {
                    if (Object.prototype.hasOwnProperty.call(args.childTable, node)) {
                        historyEntry.childTable["" + node] = cloneObject(diagram.getNodeObject(node));
                    }
                }
            }
            // 6. Create the payload and serialize
            var value = {
                modifiedNodes: nodes, modifiedConnectors: connectors,
                entryType: historyEntry.type,
                collectionChangedAction: historyEntry.changeType,
                actionTrigger: args.action,
                propertyChanges: propertyChanges,
                historyAction: historyEntry.historyAction,
                entry: historyEntry
            };
            var json = JSON.stringify(value);
            this.collaborativeCollection.push(json);
        }
        if ((isEndGroup || !this.isGroupAction) && diagram.groupActionDepth === 0) {
            var historyEntries = this.collaborativeCollection.slice();
            this.collaborativeCollection = [];
            this.isGroupAction = false;
            return historyEntries;
        }
        return [];
    };
    /**
     * Processes a history entry and extracts property change metadata.
     * Examines the history entry type and constructs a `PropertyChangedAction` object
     * containing relevant old/new values, object IDs, and child references needed
     * for remote clients to apply the same change.
     * @param {IHistoryChangeArgs} args - The history change event arguments.
     * @param {NodeModel | ConnectorModel | SelectorModel | DiagramModel | ShapeAnnotationModel | PathAnnotationModel | PointPortModel} oldValue - The object state before the change.
     * @param {NodeModel | ConnectorModel | SelectorModel | DiagramModel} newValue - The object state after the change.
     * @param {HistoryEntry} historyEntry - The history entry describing the change type.
     * @param {Diagram} diagram - The diagram instance.
     * @returns {PropertyChangedAction} Metadata describing the property changes, or null if not applicable.
     * @private
     */
    DiagramCollaboration.prototype.processHistoryEntryType = function (args, oldValue, newValue, historyEntry, diagram) {
        var action = null;
        switch (historyEntry.type) {
            case 'LabelCollectionChanged':
            case 'PortCollectionChanged':
            case 'PhaseCollectionChanged':
            case 'LaneCollectionChanged': {
                action = { newObjectValue: oldValue };
                break;
            }
            case 'LanePositionChanged': {
                action = args.action === 'Undo' ? { newObjectValue: oldValue } : args.action === 'Redo' ? { newObjectValue: newValue }
                    : { newObjectValue: args.source[0] };
                break;
            }
            case 'PropertyChanged': {
                if (newValue.nodes) {
                    for (var node in newValue.nodes) {
                        if (Object.prototype.hasOwnProperty.call(newValue.nodes, node)) {
                            var obj = newValue.nodes["" + node];
                            if (obj.style && obj.style.gradient) {
                                this.cloneGradientStops(obj.style.gradient);
                            }
                            var nodechildrenId = this.getChildrenIds(node, obj, diagram, true);
                            action = { childrenId: nodechildrenId };
                        }
                    }
                }
                if (oldValue.connectors) {
                    for (var connector in oldValue.connectors) {
                        if (Object.prototype.hasOwnProperty.call(oldValue.connectors, connector)) {
                            var obj = oldValue.connectors["" + connector];
                            this.cloneAsObject(obj);
                        }
                    }
                }
                if (newValue.connectors) {
                    for (var connector in newValue.connectors) {
                        if (Object.prototype.hasOwnProperty.call(newValue.connectors, connector)) {
                            var obj = newValue.connectors["" + connector];
                            this.cloneAsObject(obj);
                            var nodechildrenId = this.getChildrenIds(connector, obj, diagram, false);
                            action = { childrenId: nodechildrenId };
                        }
                    }
                }
                action = __assign({}, action, { sourceIds: args.sourceId, oldValue: { nodes: oldValue.nodes, connectors: oldValue.connectors }, newValue: { nodes: newValue.nodes, connectors: newValue.connectors } });
                break;
            }
            case 'AddChildToGroupNode':
            case 'RemoveChildFromGroupNode':
            case 'AnnotationPropertyChanged': {
                action = { objectId: args.objectId };
                break;
            }
        }
        return action;
    };
    /**
     * Extracts child IDs (annotations and ports) from a node or connector.
     * Used to build a list of nested element IDs that need to be synchronized
     * during property change operations.
     * @param {string} index - The index key of the object in the diagram's nodes/connectors collection.
     * @param {NodeModel | ConnectorModel} obj - The node or connector model.
     * @param {Diagram} diagram - The diagram instance containing the object.
     * @param {boolean} isNode - Represets the object is node.
     * @returns {string[]} An array of child element IDs (annotations and ports).
     * @private
     */
    DiagramCollaboration.prototype.getChildrenIds = function (index, obj, diagram, isNode) {
        var childrenId = [];
        if (obj.annotations) {
            for (var annotation in obj.annotations) {
                if (Object.prototype.hasOwnProperty.call(obj.annotations, annotation)) {
                    if (isNode) {
                        childrenId.push(diagram.nodes["" + index].annotations["" + annotation].id);
                    }
                    else {
                        childrenId.push(diagram.connectors["" + index].annotations["" + annotation].id);
                    }
                }
            }
        }
        if (obj.ports) {
            for (var port in obj.ports) {
                if (Object.prototype.hasOwnProperty.call(obj.ports, port)) {
                    if (isNode) {
                        childrenId.push(diagram.nodes["" + index].ports["" + port].id);
                    }
                    else {
                        childrenId.push(diagram.connectors["" + index].ports["" + port].id);
                    }
                }
            }
        }
        return childrenId;
    };
    /**
     * Clones connector-specific objects (decorators and segments) for serialization.
     * Ensures that complex nested properties like gradients and segment arrays
     * are properly cloned before being serialized for remote transmission.
     * @param {ConnectorModel} obj - The connector model to process.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.cloneAsObject = function (obj) {
        if (obj.sourceDecorator && obj.sourceDecorator.style && obj.sourceDecorator.style.gradient) {
            this.cloneGradientStops(obj.sourceDecorator.style.gradient);
        }
        if (obj.targetDecorator && obj.targetDecorator.style && obj.targetDecorator.style.gradient) {
            this.cloneGradientStops(obj.targetDecorator.style.gradient);
        }
        if (obj.segments) {
            var clonedValue = cloneObject(obj.segments);
            obj.segments = clonedValue;
        }
    };
    /**
     * Deep clones gradient stop objects within a gradient definition.
     * Gradient stops contain color and offset information that must be
     * individually cloned to avoid reference sharing during serialization.
     * @param {GradientModel} gradient - The gradient model containing stops to clone.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.cloneGradientStops = function (gradient) {
        if (gradient && gradient.stops) {
            for (var i = 0; i < gradient.stops.length; i++) {
                var stop_1 = cloneObject(gradient.stops[parseInt(i.toString(), 10)]);
                gradient.stops[parseInt(i.toString(), 10)] = stop_1;
            }
        }
    };
    /**
     * Gets the affected objects for a change, expanding selection/undo/redo contexts.
     * @param {IHistoryChangeArgs} args - The history change event arguments.
     * @param {(NodeModel | ConnectorModel | SelectorModel | DiagramModel | ShapeAnnotationModel | PathAnnotationModel | PointPortModel)} undoObject - The object state for undo operations.
     * @param {(NodeModel | ConnectorModel | SelectorModel | DiagramModel)} redoObject - The object state for redo operations.
     * @param {Diagram} diagram - The Diagram instance against which the change is applied.
     * @returns {(NodeModel | ConnectorModel)[]} An array of affected NodeModel or ConnectorModel objects.
     * @private
     */
    DiagramCollaboration.prototype.getChangedObjects = function (args, undoObject, redoObject, diagram) {
        var isUndoOrRedo = args.action === 'Undo' ||
            args.action === 'Redo';
        if (!isUndoOrRedo) {
            return args.source;
        }
        var historyObject = undefined;
        if (args.action === 'Undo') {
            var undoHasId = !!(undoObject && undoObject.id &&
                diagram.getObject(undoObject.id));
            var undoIsSelector = !!(undoObject &&
                undoObject.nodes &&
                undoObject.connectors);
            var isValidUndo = undoHasId || undoIsSelector;
            historyObject = isValidUndo ? undoObject : undefined;
        }
        else {
            var redoHasId = !!(redoObject && redoObject.id &&
                diagram.getObject(redoObject.id));
            var redoIsSelector = !!(redoObject &&
                redoObject.nodes &&
                redoObject.connectors);
            var isValidRedo = redoHasId || redoIsSelector;
            historyObject = isValidRedo ? redoObject : undefined;
        }
        var selector = historyObject;
        if (selector && selector.nodes && selector.connectors) {
            var objects = [];
            objects.push.apply(objects, (selector.nodes));
            objects.push.apply(objects, (selector.connectors));
            return objects;
        }
        else if (historyObject && historyObject) {
            return [historyObject];
        }
        return args.source;
    };
    /**
     * Classifies changed objects by type and enriches them with collaboration metadata.
     * @param {Array.<(NodeModel|ConnectorModel)>|null|undefined} changedObjects - The list of node/connector models that were changed.
     * @param {HistoryEntry} historyEntry - The history entry describing the change.
     * @returns {{nodes: Node[], connectors: Connector[]}} An object with `nodes` and `connectors` arrays ready for serialization.
     * @private
     */
    DiagramCollaboration.prototype.categorizeAndEnrichObjects = function (changedObjects, historyEntry) {
        var nodes = [];
        var connectors = [];
        if (!changedObjects || changedObjects.length === 0 || historyEntry.type === 'PropertyChanged') {
            return { nodes: nodes, connectors: connectors };
        }
        for (var _i = 0, changedObjects_1 = changedObjects; _i < changedObjects_1.length; _i++) {
            var obj = changedObjects_1[_i];
            if (obj.nodes) {
                for (var _a = 0, _b = obj.nodes; _a < _b.length; _a++) {
                    var node = _b[_a];
                    var nodeTyped = node;
                    this.updateNodeAndConnectors(nodeTyped, nodes, connectors);
                }
            }
            else if (obj.connectors) {
                for (var _c = 0, _d = obj.connectors; _c < _d.length; _c++) {
                    var connector = _d[_c];
                    var connectorTyped = connector;
                    this.updateNodeAndConnectors(connectorTyped, nodes, connectors);
                }
            }
            else {
                this.updateNodeAndConnectors(obj, nodes, connectors);
            }
        }
        return { nodes: nodes, connectors: connectors };
    };
    /**
     * Categorizes and clones a single diagram object into the appropriate collection.
     * Determines if the object is a node or connector based on its properties,
     * adds parent information, and clones it for serialization.
     * @param {NodeModel | ConnectorModel} obj - The diagram object to categorize.
     * @param {Node[]} nodes - The collection of nodes to append to.
     * @param {Connector[]} connectors - The collection of connectors to append to.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.updateNodeAndConnectors = function (obj, nodes, connectors) {
        if (obj.offsetX !== undefined) {
            obj.addInfo = { 'parentId': obj.parentId };
            nodes.push(cloneObject(obj));
        }
        else if (obj.sourcePoint && obj.targetPoint) {
            obj.addInfo = { 'parentId': obj.parentId };
            connectors.push(cloneObject(obj));
        }
    };
    /**
     * Validates a diagram changes object to ensure it has the required structure.
     * Performs security validation on incoming collaboration data to prevent
     * malicious payloads from corrupting the diagram state or causing runtime errors.
     * @param {unknown} data - The parsed JSON data to validate.
     * @returns {DiagramChanges | null} The validated DiagramChanges object, or null if invalid.
     * @private
     */
    DiagramCollaboration.prototype.validateDiagramChanges = function (data) {
        if (typeof data !== 'object' || data === null) {
            return null;
        }
        var changes = data;
        // Validate required fields
        if (!changes.entryType || typeof changes.entryType !== 'string') {
            return null;
        }
        // Validate arrays if present
        if (changes.modifiedNodes !== undefined && changes.modifiedNodes !== null && !Array.isArray(changes.modifiedNodes)) {
            return null;
        }
        if (changes.modifiedConnectors !== undefined && changes.modifiedConnectors !== null && !Array.isArray(changes.modifiedConnectors)) {
            return null;
        }
        return changes;
    };
    /**
     * Applies a collection of remote change operations to the current diagram.
     *
     * @param {string[]} modifiedOperations - An array of serialized `DiagramChanges` JSON strings
     *                                        received from remote collaborators.
     * @param {Diagram} diagram - The target `Diagram` instance to which the remote updates
     *                             should be applied.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.applyRemoteChanges = function (modifiedOperations, diagram) {
        var _this = this;
        if (!diagram.undoRedoModule) {
            return;
        }
        if (modifiedOperations.length > 0) {
            diagram.realActions |= RealAction.PreventHistoryEntryForCollaboration;
            var previous = diagram.getProtectPropertyChangeValue();
            diagram.protectPropertyChange(true);
            modifiedOperations.forEach(function (data) {
                try {
                    var parsedData = _this.validateDiagramChanges(JSON.parse(data));
                    if (parsedData) {
                        _this.updateDiagram(parsedData, diagram);
                    }
                    else {
                        console.warn('[WARNING] :: Invalid diagram change payload received');
                    }
                }
                catch (error) {
                    console.warn('[WARNING] :: Failed to parse or apply diagram changes:', error);
                }
            });
            diagram.realActions &= ~RealAction.PreventHistoryEntryForCollaboration;
            diagram.protectPropertyChange(previous);
        }
    };
    /**
     * Updates the remote changes into the current diagram.
     *
     * @param {DiagramChanges} parsedData - The parsed `DiagramChanges` payload to apply.
     * @param {Diagram} diagram - The `Diagram` instance to update.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.updateDiagram = function (parsedData, diagram) {
        var modifiedNodes = parsedData.modifiedNodes;
        var modifiedConnectors = parsedData.modifiedConnectors;
        var historyEntryType = parsedData.entryType;
        var historyAction = parsedData.historyAction;
        var historyEntryChangeType = parsedData.collectionChangedAction;
        var propertyChanges = parsedData.propertyChanges;
        var actionTrigger = parsedData.actionTrigger;
        var entry = parsedData.entry;
        if (actionTrigger === 'Undo' || actionTrigger === 'Redo') {
            diagram.diagramActions |= DiagramAction.UndoRedo;
        }
        var _a = this.getAdjustedHistoryTypes(historyEntryType, historyEntryChangeType, actionTrigger), adjustedHistoryType = _a.type, adjustedChangeType = _a.change;
        if (historyEntryType === 'PropertyChanged') {
            if (actionTrigger !== 'Undo') {
                this.processPropertyChanges(propertyChanges.sourceIds, propertyChanges.oldValue, propertyChanges.newValue, propertyChanges.childrenId, diagram);
            }
            else {
                this.processPropertyChanges(propertyChanges.sourceIds, propertyChanges.newValue, propertyChanges.oldValue, propertyChanges.childrenId, diagram);
            }
        }
        if ((Array.isArray(modifiedNodes) && modifiedNodes.length > 0) || (propertyChanges && historyEntryType === 'LanePositionChanged')) {
            this.processNodeChangesAsync(modifiedNodes, propertyChanges, adjustedHistoryType, entry, adjustedChangeType, historyAction, diagram);
        }
        else if (Array.isArray(modifiedConnectors) && modifiedConnectors.length > 0) {
            this.processConnectorChangesAsync(modifiedConnectors, propertyChanges, adjustedHistoryType, adjustedChangeType, diagram);
        }
        if (actionTrigger === 'Undo' || actionTrigger === 'Redo') {
            diagram.diagramActions &= ~DiagramAction.UndoRedo;
        }
    };
    /**
     * Applies property-level updates from a remote payload into the given diagram.
     *
     * @param {string[]} stringids - Array of object ids (nodes/connectors) to update.
     * @param {DiagramModel} oldValues - DiagramModel containing the old state for undo comparisons.
     * @param {DiagramModel} newValues - DiagramModel containing the new state to apply.
     * @param {string[]} childrenId - Optional list of child ids (annotations/ports) to map nested updates.
     * @param {Diagram} diagram - The Diagram instance that will be updated.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.processPropertyChanges = function (stringids, oldValues, newValues, childrenId, diagram) {
        if (newValues.nodes) {
            var newValue = [];
            var oldValue = [];
            var newData = newValues.nodes;
            var oldData = oldValues.nodes;
            for (var value in newData) {
                if (Object.prototype.hasOwnProperty.call(newData, value)) {
                    newValue.push(newData["" + value]);
                    oldValue.push(oldData["" + value]);
                }
            }
            for (var indexId = 0; indexId < stringids.length; indexId++) {
                var obj = diagram.nameTable["" + stringids[parseInt(indexId.toString(), 10)]];
                if (newValue[parseInt(indexId.toString(), 10)].annotations && childrenId && childrenId.length > 0) {
                    var index = 0;
                    for (var annotationIndex in newValue[parseInt(indexId.toString(), 10)].annotations) {
                        if (Object.prototype.hasOwnProperty.call(newValue[parseInt(indexId.toString(), 10)].annotations, annotationIndex)) {
                            for (var _i = 0, _a = obj.annotations; _i < _a.length; _i++) {
                                var current = _a[_i];
                                if (current.id === childrenId[parseInt(indexId.toString(), 10)]) {
                                    this.updatePublicProperties(current, newValue[parseInt(indexId.toString(), 10)].annotations["" + annotationIndex]);
                                    index++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (newValue[parseInt(indexId.toString(), 10)].ports && childrenId && childrenId.length > 0) {
                    var index = 0;
                    for (var newPort in newValue[parseInt(indexId.toString(), 10)].ports) {
                        if (Object.prototype.hasOwnProperty.call(newValue[parseInt(indexId.toString(), 10)].ports, newPort)) {
                            for (var _b = 0, _c = obj.ports; _b < _c.length; _b++) {
                                var current = _c[_b];
                                if (current.id === childrenId[parseInt(index.toString(), 10)]) {
                                    this.updatePublicProperties(current, newValue[parseInt(indexId.toString(), 10)].ports["" + newPort]);
                                    index++;
                                    break;
                                }
                            }
                        }
                    }
                }
                this.updatePublicProperties(obj, newValue[parseInt(indexId.toString(), 10)]);
                if (newValue[parseInt(indexId.toString(), 10)].style && newValue[parseInt(indexId.toString(), 10)].style.gradient) {
                    var dstStops = newValue[parseInt(indexId.toString(), 10)].style.gradient.stops;
                    var srcStops = obj.style.gradient.stops;
                    for (var stopIndex = 0; stopIndex < dstStops.length; stopIndex++) {
                        dstStops[parseInt(stopIndex.toString(), 10)] = srcStops[parseInt(stopIndex.toString(), 10)];
                    }
                    diagram.updateGradient(newValue[parseInt(indexId.toString(), 10)], oldValue[parseInt(indexId.toString(), 10)], obj);
                    obj.oldGradientValue = cloneObject(newValue[parseInt(indexId.toString(), 10)].style.gradient);
                }
                var _oldNode = oldValue[parseInt(indexId.toString(), 10)];
                var _newNode = newValue[parseInt(indexId.toString(), 10)];
                diagram.nodePropertyChange(obj, _oldNode, _newNode, undefined, true, true);
            }
        }
        if (newValues.connectors) {
            var newValue = [];
            var oldValue = [];
            var newData = newValues.connectors;
            var oldData = oldValues.connectors;
            for (var value in newData) {
                if (Object.prototype.hasOwnProperty.call(newData, value)) {
                    newValue.push(newData["" + value]);
                    oldValue.push(oldData["" + value]);
                }
            }
            for (var i = 0; i < stringids.length; i++) {
                var obj = diagram.nameTable["" + stringids[parseInt(i.toString(), 10)]];
                if (newValue[parseInt(i.toString(), 10)].annotations &&
                    childrenId &&
                    childrenId.length > 0) {
                    var index = 0;
                    for (var annotationIndex in newValue[parseInt(i.toString(), 10)].annotations) {
                        if (Object.prototype.hasOwnProperty.call(newValue[parseInt(i.toString(), 10)].annotations, annotationIndex)) {
                            for (var _d = 0, _e = obj.annotations; _d < _e.length; _d++) {
                                var current = _e[_d];
                                if (current.id === childrenId[parseInt(index.toString(), 10)]) {
                                    this.updatePublicProperties(current, newValue[parseInt(index.toString(), 10)].annotations["" + annotationIndex]);
                                    index++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (newValue[parseInt(i.toString(), 10)].ports &&
                    childrenId &&
                    childrenId.length > 0) {
                    var index = 0;
                    for (var newPort in newValue[parseInt(i.toString(), 10)].ports) {
                        if (Object.prototype.hasOwnProperty.call(newValue[parseInt(i.toString(), 10)].ports, newPort)) {
                            for (var _f = 0, _g = obj.ports; _f < _g.length; _f++) {
                                var port = _g[_f];
                                if (port.id === childrenId[parseInt(index.toString(), 10)]) {
                                    this.updatePublicProperties(port, newValue[parseInt(i.toString(), 10)].ports["" + newPort]);
                                    index++;
                                    break;
                                }
                            }
                        }
                    }
                }
                var connectorNew = newValue[parseInt(i.toString(), 10)];
                this.updatePublicProperties(obj, connectorNew);
                var _oldConnector = oldValue["" + i];
                var _newConnector = newValue["" + i];
                diagram.connectorPropertyChange(obj, _oldConnector, _newConnector, undefined, true);
            }
        }
    };
    /**
     * Copies public properties from `target` onto `source` with security protections.
     *
     * Performs a shallow copy for primitives and arrays, and recursively copies
     * plain object properties. Includes protection against circular references
     * and prototype pollution attacks.
     *
     * @param {Model} source - The existing object that will receive updated properties.
     * @param {Model} target - The object providing new property values.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.updatePublicProperties = function (source, target) {
        if (!source || typeof source !== 'object') {
            return;
        }
        var targetKeys = Object.keys(target);
        var sourceAll = source;
        var targetAll = target;
        for (var _i = 0, targetKeys_1 = targetKeys; _i < targetKeys_1.length; _i++) {
            var key = targetKeys_1[_i];
            // skip updating nested collections; handled elsewhere or intentionally omitted
            if (key === 'annotations' || key === 'ports') {
                continue;
            }
            // handle shape type changes: if a property is a ShapeModel with differing type, replace it entirely
            var isShape = targetAll["" + key];
            if (isShape && isShape.type) {
                var srcShape = sourceAll["" + key];
                if (srcShape && srcShape.type !== isShape.type) {
                    sourceAll["" + key] = targetAll["" + key];
                    continue;
                }
            }
            var isTargetPlainObject = targetAll["" + key] && typeof targetAll["" + key] === 'object' && !Array.isArray(targetAll["" + key]);
            if (isTargetPlainObject) {
                this.updatePublicProperties(sourceAll["" + key], targetAll["" + key]);
            }
            else {
                sourceAll["" + key] = targetAll["" + key];
            }
        }
    };
    /**
     * Processes node-level history changes and delegates to the appropriate
     * undo/redo or collection handlers on the diagram.
     *
     * @param {Node[]} nodes - Array of `Node` instances from the remote payload.
     * @param {PropertyChangedAction} propertyChanges - Optional property-change metadata for nested updates.
     * @param {EntryType} historyType - The history entry type being applied (e.g., PositionChanged).
     * @param {ExtendedHistoryEntry} entry - The extended history entry with additional context.
     * @param {EntryChangeType} changeType - The collection change type (Insert/Remove) when relevant.
     * @param {DiagramHistoryAction} historyAction - The `DiagramHistoryAction` associated with the entry.
     * @param {Diagram} diagram - The `Diagram` instance to update.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.processNodeChangesAsync = function (nodes, propertyChanges, historyType, entry, changeType, historyAction, diagram) {
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var nodeObj = nodes_1[_i];
            var objectToUpdate = diagram.getObject(nodeObj.id);
            var previous = diagram.getProtectPropertyChangeValue();
            diagram.protectPropertyChange(true);
            if (!objectToUpdate && historyType !== 'Group' && historyType !== 'CollectionChanged' && historyType !== 'LanePositionChanged'
                && historyType !== 'PhaseCollectionChanged' && historyType !== 'LaneCollectionChanged') {
                continue;
            }
            diagram.isCollaborativeContainerChanges =
                (nodeObj && nodeObj.shape && nodeObj.shape.type === 'Container') ||
                    (!!(nodeObj && nodeObj.parentId) &&
                        diagram &&
                        diagram.nameTable &&
                        diagram.nameTable[nodeObj.parentId] &&
                        diagram.nameTable[nodeObj.parentId].shape &&
                        diagram.nameTable[nodeObj.parentId].shape.type === 'Container');
            try {
                switch (historyType) {
                    case 'Align':
                    case 'Distribute':
                    case 'PositionChanged': {
                        diagram.undoRedoModule.positionChanged(nodeObj, diagram);
                        break;
                    }
                    case 'SizeChanged':
                    case 'Sizing': {
                        diagram.undoRedoModule.nodeSizeChange(nodeObj, diagram, entry);
                        break;
                    }
                    case 'RotationChanged': {
                        diagram.undoRedoModule.rotateNode({ nodes: nodes }, nodeObj, diagram, entry, 'undo');
                        break;
                    }
                    case 'LabelCollectionChanged': {
                        if (propertyChanges) {
                            var annotation = propertyChanges.newObjectValue;
                            if (annotation) {
                                diagram.undoRedoModule.labelCollectionChanged(nodeObj, annotation, changeType, diagram);
                            }
                        }
                        break;
                    }
                    case 'ColumnWidthChanged': {
                        this.recordGridSizeChanged(nodeObj, diagram, false, false);
                        break;
                    }
                    case 'RowHeightChanged': {
                        this.recordGridSizeChanged(nodeObj, diagram, false, true);
                        break;
                    }
                    case 'CollectionChanged': {
                        diagram.undoRedoModule.collectionChanged(nodeObj, changeType, null, diagram);
                        break;
                    }
                    case 'PhaseCollectionChanged':
                    case 'LaneCollectionChanged': {
                        if (propertyChanges) {
                            diagram.undoRedoModule.laneOrPhaseCollectionChanged(changeType, nodeObj, propertyChanges.newObjectValue, diagram);
                        }
                        break;
                    }
                    case 'ChildCollectionChanged': {
                        diagram.isCollaborativeContainerChanges = true;
                        diagram.undoRedoModule.childCollectionChanged(nodeObj, diagram, false, historyAction);
                        break;
                    }
                    case 'PortCollectionChanged': {
                        if (changeType === 'Remove') {
                            diagram.removePorts(nodeObj, [propertyChanges.newObjectValue]);
                        }
                        else {
                            diagram.addPorts(nodeObj, [propertyChanges.newObjectValue]);
                        }
                        break;
                    }
                    case 'AnnotationPropertyChanged': {
                        this.annotationPropertyChange(nodeObj, propertyChanges.objectId, diagram);
                        break;
                    }
                    case 'Group': {
                        diagram.add(nodeObj);
                        break;
                    }
                    case 'UnGroup': {
                        diagram.commandHandler.unGroup(nodeObj);
                        break;
                    }
                    case 'SendBackward': {
                        diagram.commandHandler.sendBackward(objectToUpdate);
                        break;
                    }
                    case 'SendToBack': {
                        diagram.commandHandler.sendToBack(objectToUpdate);
                        break;
                    }
                    case 'BringToFront': {
                        diagram.commandHandler.bringToFront(objectToUpdate);
                        break;
                    }
                    case 'SendForward': {
                        diagram.commandHandler.sendForward(objectToUpdate);
                        break;
                    }
                    case 'AddChildToGroupNode': {
                        diagram.addChildToGroup(objectToUpdate, propertyChanges.objectId);
                        break;
                    }
                    case 'RemoveChildFromGroupNode': {
                        diagram.removeChildFromGroup(objectToUpdate, propertyChanges.objectId);
                        break;
                    }
                }
            }
            finally {
                diagram.isCollaborativeContainerChanges = false;
                diagram.protectPropertyChange(previous);
            }
        }
        if (propertyChanges && historyType === 'LanePositionChanged') {
            var positionChangedArgs = propertyChanges.newObjectValue;
            if (positionChangedArgs.source) {
                var parent_1 = diagram.nameTable[positionChangedArgs.source.parentId];
                if (parent_1 && parent_1.shape.type === 'SwimLane') {
                    laneInterChanged(diagram, positionChangedArgs.target, positionChangedArgs.source);
                    diagram.clearSelection();
                }
            }
        }
    };
    /**
     * Applies annotation property changes from remote updates.
     * Finds the specified annotation on the object and triggers a property change
     * event with old and new values to update the visual state.
     * @param {Node | Connector} obj - The node or connector containing the annotation.
     * @param {string} annotationId - The unique identifier of the annotation to update.
     * @param {Diagram} diagram - The diagram instance.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.annotationPropertyChange = function (obj, annotationId, diagram) {
        var oldElement = findAnnotation(obj, annotationId);
        var undoChanges = diagram.commandHandler.getAnnotationChanges(diagram.nameTable[obj.id], oldElement);
        if (obj.offsetX) {
            diagram.nodePropertyChange(diagram.nameTable[obj.id], {}, undoChanges);
        }
        else {
            diagram.connectorPropertyChange(diagram.nameTable[obj.id], {}, undoChanges);
        }
    };
    /**
     * Records and applies grid size changes for swimlane child elements.
     *
     * This method maps a child node's size differences back to its parent
     * swimlane's grid and triggers layout/arrange updates so the visual
     * swimlane reflects the resized phase/row/column.
     *
     * @param {Node} nodeObj - The node whose size changed (typically a swimlane phase or row child).
     * @param {Diagram} diagram - The Diagram instance containing the swimlane and grid.
     * @param {boolean} isRedo - Whether this change is being applied during a redo operation.
     * @param {boolean} isRow - True when updating a row height; false when updating a column width.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.recordGridSizeChanged = function (nodeObj, diagram, isRedo, isRow) {
        var obj = nodeObj;
        if (obj.parentId) {
            var swimlane = diagram.nameTable[obj.parentId];
            var actualObject = diagram.nameTable[obj.id];
            var x = swimlane.wrapper.bounds.x;
            var y = swimlane.wrapper.bounds.y;
            if (swimlane.shape.type === 'SwimLane') {
                var grid = swimlane.wrapper.children[0];
                var padding = swimlane.shape.padding;
                var isUndoRedo = false;
                if (diagram.diagramActions & DiagramAction.UndoRedo) {
                    isUndoRedo = true;
                }
                //Swimlane break - Phase collapsed upon serialization after resizing and undo-redo.
                var widthDiff = 0;
                var heightDiff = 0;
                if (obj.wrapper && obj.wrapper.actualSize && actualObject.wrapper && actualObject.wrapper.actualSize) {
                    widthDiff = obj.wrapper.actualSize.width - actualObject.wrapper.actualSize.width;
                    heightDiff = obj.wrapper.actualSize.height - actualObject.wrapper.actualSize.height;
                }
                updateSwimLaneObject(diagram, actualObject, swimlane, obj, widthDiff, heightDiff);
                if (isRow) {
                    grid.updateRowHeight(obj.rowIndex, obj.wrapper.actualSize.height, true, padding, isUndoRedo);
                    swimlane.height = swimlane.wrapper.height = grid.height;
                }
                else {
                    grid.updateColumnWidth(obj.columnIndex, obj.wrapper.actualSize.width, true, padding, isUndoRedo);
                    swimlane.width = swimlane.wrapper.width = grid.width;
                    if (obj.isPhase) {
                        actualObject.maxWidth = actualObject.wrapper.maxWidth = obj.wrapper.actualSize.width;
                    }
                }
                swimLaneMeasureAndArrange(swimlane);
                if (swimlane.shape.orientation === 'Horizontal') {
                    updatePhaseMaxWidth(swimlane, diagram, actualObject.wrapper, actualObject.columnIndex);
                }
                updateHeaderMaxWidth(diagram, swimlane);
                var tx = x - swimlane.wrapper.bounds.x;
                var ty = y - swimlane.wrapper.bounds.y;
                diagram.drag(swimlane, tx, ty);
                diagram.clearSelection();
                diagram.updateDiagramObject(swimlane);
            }
        }
    };
    /**
     * Processes connector-level history changes and delegates to the appropriate
     * handlers (segment/connection/collection/port/label updates and ordering
     * commands) on the diagram.
     *
     * @param {Connector[]} connectors - Array of `Connector` instances from the remote payload.
     * @param {PropertyChangedAction} propertyChanges - Optional property-change metadata for nested updates.
     * @param {EntryType} historyType - The history entry type being applied (e.g., SegmentChanged).
     * @param {EntryChangeType} changeType - The collection change type (Insert/Remove) when relevant.
     * @param {Diagram} diagram - The `Diagram` instance to update.
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.processConnectorChangesAsync = function (connectors, propertyChanges, historyType, changeType, diagram) {
        for (var _i = 0, connectors_1 = connectors; _i < connectors_1.length; _i++) {
            var connectorObj = connectors_1[_i];
            var objectToUpdate = diagram.getObject(connectorObj.id);
            if (!objectToUpdate && historyType !== 'CollectionChanged') {
                continue;
            }
            switch (historyType) {
                case 'PositionChanged':
                case 'SizeChanged':
                case 'RotationChanged': {
                    diagram.undoRedoModule.segmentChanged(connectorObj, diagram);
                    diagram.undoRedoModule.connectionChanged(connectorObj, diagram);
                    break;
                }
                case 'ConnectionChanged': {
                    diagram.undoRedoModule.recordConnectionChanged(connectorObj, diagram);
                    break;
                }
                case 'SegmentChanged': {
                    diagram.undoRedoModule.segmentChanged(connectorObj, diagram);
                    break;
                }
                case 'LabelCollectionChanged': {
                    if (propertyChanges) {
                        var annotation = propertyChanges.newObjectValue;
                        if (annotation) {
                            diagram.undoRedoModule.labelCollectionChanged(connectorObj, annotation, changeType, diagram);
                        }
                    }
                    break;
                }
                case 'PortCollectionChanged': {
                    if (propertyChanges) {
                        var port = propertyChanges.newObjectValue;
                        if (port) {
                            diagram.undoRedoModule.portCollectionChanged(connectorObj, port, changeType, diagram);
                        }
                    }
                    break;
                }
                case 'CollectionChanged': {
                    diagram.undoRedoModule.collectionChanged(connectorObj, changeType, null, diagram);
                    break;
                }
                case 'SendBackward': {
                    diagram.commandHandler.sendBackward(objectToUpdate);
                    break;
                }
                case 'SendToBack': {
                    diagram.commandHandler.sendToBack(objectToUpdate);
                    break;
                }
                case 'BringToFront': {
                    diagram.commandHandler.bringToFront(objectToUpdate);
                    break;
                }
                case 'SendForward': {
                    diagram.commandHandler.sendForward(objectToUpdate);
                    break;
                }
            }
        }
    };
    /**
     * Adjusts history type and collection change for Undo operations.
     *
     * @param {EntryType} type - Original history type.
     * @param {EntryChangeType} change - Original collection change.
     * @param {HistoryChangeAction} [trigger] - Trigger action (e.g., 'Undo').
     * @returns {{type: EntryType, change: EntryChangeType}} Adjusted type and change.
     * @private
     */
    DiagramCollaboration.prototype.getAdjustedHistoryTypes = function (type, change, trigger) {
        if (trigger === 'Undo') {
            var adjustedChange = change === 'Insert'
                ? 'Remove'
                : 'Insert';
            var adjustedTypeMap = {
                Group: 'UnGroup',
                UnGroup: 'Group',
                AddChildToGroupNode: 'RemoveChildFromGroupNode',
                RemoveChildFromGroupNode: 'AddChildToGroupNode'
            };
            var adjustedType = type;
            if (Object.prototype.hasOwnProperty.call(adjustedTypeMap, String(type))) {
                adjustedType = adjustedTypeMap[String(type)];
            }
            return { type: adjustedType, change: adjustedChange };
        }
        return { type: type, change: change };
    };
    /**
     * To destroy the collaborative module
     *
     * @returns {void}
     * @private
     */
    DiagramCollaboration.prototype.destroy = function () {
        this.collaborativeCollection = [];
        this.isGroupAction = false;
    };
    /**
     * Returns the module name.
     *
     * @returns {string} The module name for this class.
     * @private
     */
    DiagramCollaboration.prototype.getModuleName = function () {
        return 'DiagramCollaboration';
    };
    return DiagramCollaboration;
}());
export { DiagramCollaboration };
