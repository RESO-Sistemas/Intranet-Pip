import { Diagram } from '../diagram';
import { DiagramModel } from '../diagram-model';
import { ExtendedHistoryEntry } from '../diagram/history';
import { Connector } from './connector';
import { Node } from './node';
import { IHistoryChangeArgs } from './interface/IElement';
import { PathPortModel, PointPortModel } from './port-model';
import { DiagramHistoryAction, EntryChangeType, EntryType, HistoryChangeAction } from '../enum/enum';
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
export declare class DiagramCollaboration {
    /**
     * Buffer for accumulating serialized changes during grouped operations.
     * Cleared when a group action completes.
     * @private
     */
    private collaborativeCollection;
    /**
     * Indicates whether changes are currently being accumulated as part of a group action.
     * Set to true when a StartGroup entry is detected, false when EndGroup completes.
     * @private
     */
    isGroupAction: boolean;
    /**
     * Serializes diagram changes for collaboration.
     * Serializes the given history change arguments into JSON payloads
     * that can be sent to remote collaborators.
     * @param {IHistoryChangeArgs} args - The history change event arguments containing change details.
     * @param {Diagram} diagram - The diagram instance from which the change originated.
     * @returns {string[]} An array of serialized diagram change JSON strings to send to collaborators.
     * @private
     */
    serializeHistoryChange(args: IHistoryChangeArgs, diagram: Diagram): string[];
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
    private processHistoryEntryType;
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
    private getChildrenIds;
    /**
     * Clones connector-specific objects (decorators and segments) for serialization.
     * Ensures that complex nested properties like gradients and segment arrays
     * are properly cloned before being serialized for remote transmission.
     * @param {ConnectorModel} obj - The connector model to process.
     * @returns {void}
     * @private
     */
    private cloneAsObject;
    /**
     * Deep clones gradient stop objects within a gradient definition.
     * Gradient stops contain color and offset information that must be
     * individually cloned to avoid reference sharing during serialization.
     * @param {GradientModel} gradient - The gradient model containing stops to clone.
     * @returns {void}
     * @private
     */
    private cloneGradientStops;
    /**
     * Gets the affected objects for a change, expanding selection/undo/redo contexts.
     * @param {IHistoryChangeArgs} args - The history change event arguments.
     * @param {(NodeModel | ConnectorModel | SelectorModel | DiagramModel | ShapeAnnotationModel | PathAnnotationModel | PointPortModel)} undoObject - The object state for undo operations.
     * @param {(NodeModel | ConnectorModel | SelectorModel | DiagramModel)} redoObject - The object state for redo operations.
     * @param {Diagram} diagram - The Diagram instance against which the change is applied.
     * @returns {(NodeModel | ConnectorModel)[]} An array of affected NodeModel or ConnectorModel objects.
     * @private
     */
    private getChangedObjects;
    /**
     * Classifies changed objects by type and enriches them with collaboration metadata.
     * @param {Array.<(NodeModel|ConnectorModel)>|null|undefined} changedObjects - The list of node/connector models that were changed.
     * @param {HistoryEntry} historyEntry - The history entry describing the change.
     * @returns {{nodes: Node[], connectors: Connector[]}} An object with `nodes` and `connectors` arrays ready for serialization.
     * @private
     */
    private categorizeAndEnrichObjects;
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
    private updateNodeAndConnectors;
    /**
     * Validates a diagram changes object to ensure it has the required structure.
     * Performs security validation on incoming collaboration data to prevent
     * malicious payloads from corrupting the diagram state or causing runtime errors.
     * @param {unknown} data - The parsed JSON data to validate.
     * @returns {DiagramChanges | null} The validated DiagramChanges object, or null if invalid.
     * @private
     */
    private validateDiagramChanges;
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
    applyRemoteChanges(modifiedOperations: string[], diagram: Diagram): void;
    /**
     * Updates the remote changes into the current diagram.
     *
     * @param {DiagramChanges} parsedData - The parsed `DiagramChanges` payload to apply.
     * @param {Diagram} diagram - The `Diagram` instance to update.
     * @returns {void}
     * @private
     */
    private updateDiagram;
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
    private processPropertyChanges;
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
    private updatePublicProperties;
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
    private processNodeChangesAsync;
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
    private annotationPropertyChange;
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
    private recordGridSizeChanged;
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
    private processConnectorChangesAsync;
    /**
     * Adjusts history type and collection change for Undo operations.
     *
     * @param {EntryType} type - Original history type.
     * @param {EntryChangeType} change - Original collection change.
     * @param {HistoryChangeAction} [trigger] - Trigger action (e.g., 'Undo').
     * @returns {{type: EntryType, change: EntryChangeType}} Adjusted type and change.
     * @private
     */
    private getAdjustedHistoryTypes;
    /**
     * Constructor for the collaborative module
     *
     * @private
     */
    constructor();
    /**
     * To destroy the collaborative module
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Returns the module name.
     *
     * @returns {string} The module name for this class.
     * @private
     */
    protected getModuleName(): string;
}
/**
 * Represents a serialized diagram change payload for collaboration.
 * This interface encapsulates all information needed to transmit and apply
 * diagram modifications between collaborating users in real-time. It includes
 * modified diagram objects (nodes and connectors), the type of change that occurred,
 * and metadata required for proper synchronization and undo/redo support.
 * **Change Categories:**
 * - **Object Changes**: Modified nodes and connectors with updated properties
 * - **Collection Changes**: Addition or removal of diagram elements
 * - **Property Changes**: Granular updates to object properties, styles, and nested elements
 * - **History Context**: Entry type, action trigger, and history action for proper application
 * **Typical Flow:**
 * 1. Local changes are serialized into this format via `serializeHistoryChange()`
 * 2. The JSON payload is transmitted to remote collaborators
 * 3. Remote clients deserialize and apply changes via `applyRemoteChanges()`
 * @private
 */
export interface DiagramChanges {
    /**
     * The list of modified nodes in this change batch.
     * Contains cloned node objects with updated properties and their parent IDs
     * stored in addInfo for proper context during application.
     * @type {Node[] | null}
     */
    modifiedNodes?: Node[] | null;
    /**
     * The list of modified connectors in this change batch.
     * Contains cloned connector objects with updated properties and their parent IDs
     * stored in addInfo for proper context during application.
     * @type {Connector[] | null}
     */
    modifiedConnectors?: Connector[] | null;
    /**
     * The history entry type for this change operation.
     * Indicates the nature of the change (e.g., PositionChanged, SizeChanged,
     * CollectionChanged, PropertyChanged, LabelCollectionChanged, etc.).
     * Used to route the change to the appropriate handler during application.
     * @type {EntryType}
     */
    entryType: EntryType;
    /**
     * The collection change type for collection-based operations.
     * Specifies whether elements were inserted or removed from a collection.
     * Valid values: 'Insert' | 'Remove'.
     * Only applicable when entryType involves collection modifications.
     * @type {EntryChangeType}
     */
    collectionChangedAction: EntryChangeType;
    /**
     * The action trigger that initiated this change.
     * Indicates whether this change originated from a normal user action,
     * an undo operation, or a redo operation. This affects how old/new values
     * are interpreted during application.
     * Valid values: 'None' | 'Undo' | 'Redo'.
     * @type {HistoryChangeAction | null}
     */
    actionTrigger?: HistoryChangeAction | null;
    /**
     * Optional metadata describing property-level changes.
     * Contains detailed information about property updates including old and new values,
     * affected object IDs, and references to child elements (annotations, ports).
     * Used for granular property synchronization during PropertyChanged operations.
     * @type {PropertyChangedAction}
     */
    propertyChanges?: PropertyChangedAction;
    /**
     * The diagram history action type associated with this change.
     * Provides additional context about the specific operation performed
     * (e.g., Custom, ConnectionChanged, SegmentChanged, etc.).
     * Used to determine the appropriate update behavior in certain scenarios.
     * @type {DiagramHistoryAction}
     */
    historyAction: DiagramHistoryAction;
    /**
     * The extended history entry containing additional context and metadata.
     * Includes supplementary information such as child table references for
     * complex operations (e.g., swimlane modifications, grouped actions).
     * Provides full history context needed for advanced change application scenarios.
     * @type {ExtendedHistoryEntry | null}
     */
    entry?: ExtendedHistoryEntry | null;
}
/**
 * Metadata describing property-level changes for diagram objects during collaboration.
 * This interface captures the context needed to apply property updates from remote
 * collaborators, including old/new values, affected object IDs, and nested child elements.
 * Different change types populate different subsets of these fields.
 * @private
 */
export interface PropertyChangedAction {
    /**
     * The new object value for single-object changes (e.g., an added/removed annotation, port, or swimlane element).
     * Used primarily for label/port/phase/lane collection changes.
     * @type {Object}
     */
    newObjectValue?: Object;
    /**
     * Array of object IDs (nodes/connectors) whose properties were changed.
     * Used to correlate property updates with specific diagram objects.
     * @type {string[] | null}
     */
    sourceIds?: string[] | null;
    /**
     * The previous state of the diagram model (nodes and connectors) before the property change.
     * Contains the old property values for comparison during undo/redo operations.
     * @type {DiagramModel | null}
     */
    oldValue?: DiagramModel | null;
    /**
     * The new state of the diagram model (nodes and connectors) after the property change.
     * Contains the updated property values to be applied.
     * @type {DiagramModel | null}
     */
    newValue?: DiagramModel | null;
    /**
     * The port object being added or removed during a PortCollectionChanged operation.
     * Can be either a PathPortModel (connector port) or PointPortModel (node port).
     * @type {PathPortModel | PointPortModel | null}
     */
    port?: PathPortModel | PointPortModel | null;
    /**
     * Array of child element IDs (annotations and ports) associated with the changed objects.
     * Used to map nested property updates to the correct child elements.
     * @type {string[] | null}
     */
    childrenId?: string[] | null;
    /**
     * The unique identifier of a specific object (e.g., annotation, child node) involved in the change.
     * Used for operations like AddChildToGroupNode or AnnotationPropertyChanged.
     * @type {string | null}
     */
    objectId?: string | null;
}
