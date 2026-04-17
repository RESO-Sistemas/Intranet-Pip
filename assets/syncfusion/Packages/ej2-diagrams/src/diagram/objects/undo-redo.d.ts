import { Diagram } from '../diagram';
import { HistoryEntry } from '../diagram/history';
import { SelectorModel } from '../objects/node-model';
import { NodeModel, PhaseModel, LaneModel } from '../objects/node-model';
import { Node } from './node';
import { Connector } from './connector';
import { ConnectorModel } from '../objects/connector-model';
import { DiagramHistoryAction } from '../enum/enum';
import { ShapeAnnotationModel, PathAnnotationModel } from '../objects/annotation-model';
import { PathPortModel, PointPortModel } from '../objects/port-model';
/**
 * Undo redo function used for revert and restore the changes
 */
export declare class UndoRedo {
    private groupUndo;
    private childTable;
    private historyCount;
    private hasGroup;
    private groupCount;
    private undoOffsets;
    checkRedo: boolean;
    /**
     * initHistory method \
     *
     * @returns { void } initHistory method .\
     * @param {Diagram} diagram - provide the points value.
     *
     * @private
     */
    initHistory(diagram: Diagram): void;
    /**
     * addHistoryEntry method \
     *
     * @returns { void } addHistoryEntry method .\
     * @param {HistoryEntry} entry - provide the points value.
     * @param {Diagram} diagram - provide the points value.
     *
     * @private
     */
    addHistoryEntry(entry: HistoryEntry, diagram: Diagram): boolean;
    /**
     * applyLimit method \
     *
     * @returns { void } applyLimit method .\
     * @param {HistoryEntry} list - provide the list value.
     * @param {number} stackLimit - provide the list value.
     * @param {Diagram} diagram - provide the list value.
     * @param {boolean} limitHistory - provide the list value.
     *
     * @private
     */
    applyLimit(list: HistoryEntry, stackLimit: number, diagram: Diagram, limitHistory?: boolean): void;
    /**
     * clearHistory method \
     *
     * @returns { void } clearHistory method .\
     * @param {Diagram} diagram - provide the points value.
     *
     * @private
     */
    clearHistory(diagram: Diagram): void;
    private setEntryLimit;
    private limitHistoryStack;
    private removeFromStack;
    /**
     * undo method \
     *
     * @returns { void } undo method .\
     * @param {Diagram} diagram - provide the diagram value.
     *
     * @private
     */
    undo(diagram: Diagram): void;
    private getHistoryList;
    private getHistroyObject;
    private undoGroupAction;
    private undoEntry;
    private checkNodeObject;
    private group;
    private unGroup;
    private ignoreProperty;
    private getProperty;
    private recordLaneOrPhaseCollectionChanged;
    /**
     * Helper method to handle lane or phase collection changed entries.
     *
     * @param {string} changeType - The collection change type, e.g. 'Insert' or 'Remove'.
     * @param {NodeModel} node - The node model affected by the change.
     * @param {PhaseModel | LaneModel} obj - The lane or phase model being added or removed.
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @returns {void}
     * @private
     */
    laneOrPhaseCollectionChanged(changeType: string, node: NodeModel, obj: PhaseModel | LaneModel, diagram: Diagram): void;
    private recordAnnotationChanged;
    private recordChildCollectionChanged;
    /**
     * Helper method to handle child collection changed entries.
     *
     * @param {NodeModel | ConnectorModel} entryObject - The node or connector model involved in the change.
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @param {boolean} isRedo - True when applying a redo; false for undo.
     * @param {DiagramHistoryAction} historyAction - The history action for the child collection change.
     * @returns {void}
     * @private
     */
    childCollectionChanged(entryObject: NodeModel | ConnectorModel, diagram: Diagram, isRedo: boolean, historyAction: DiagramHistoryAction): void;
    /**
     * removeChildFromLane method \
     *
     * @returns { void } undo method .\
     * @param {Diagram} diagram - provide the diagram value.
     * @param {NodeModel} parentNode - provide the lane obj.
     * @param {Node} actualObject - provide the node value.
     * @private
     */
    removeChildFromLane(diagram: Diagram, parentNode: NodeModel, actualObject: Node): void;
    private recordStackPositionChanged;
    private recordGridSizeChanged;
    private updateSwimLanePhasesOffset;
    private recordLanePositionChanged;
    private recordPortChanged;
    private recordPropertyChanged;
    private recordOrderCommandChanged;
    private recordAddChildToGroupNode;
    private recordRemoveChildFromGroupNode;
    private recordSegmentChanged;
    /**
     * Helper method to handle segment changed entries.
     *
     * @param {ConnectorModel} connector - The connector model containing updated segments.
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @returns {void}
     * @private
     */
    segmentChanged(connector: ConnectorModel, diagram: Diagram): void;
    private recordPositionChanged;
    /**
     * Helper method to handle position changed entries.
     *
     * @param {NodeModel} obj - The node model whose position changed.
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @returns {void}
     * @private
     */
    positionChanged(obj: NodeModel, diagram: Diagram): void;
    private recordSizeChanged;
    /**
     * Handle node size changes for undo/redo operations.
     *
     * @param {NodeModel} node - The node model whose size changed.
     * @param {Diagram} diagram - The Diagram instance the node belongs to.
     * @param {HistoryEntry} [entry] - Optional history entry containing `childTable` for related nodes/connectors.
     * @returns {void}
     * @private
     */
    nodeSizeChange(node: NodeModel, diagram: Diagram, entry?: HistoryEntry): void;
    private sizeChanged;
    private recordRotationChanged;
    /**
     * Rotates a node as part of undo/redo handling.
     *
     * @param {SelectorModel} obj - Selector object containing nodes/connectors involved in rotation.
     * @param {NodeModel} node - The node model to rotate.
     * @param {Diagram} diagram - The Diagram instance the node belongs to.
     * @param {HistoryEntry} entry - The history entry that may contain `childTable` and related data.
     * @param {string} [type] - Optional flag indicating operation direction ('undo' | 'redo').
     * @returns {void}
     * @private
     */
    rotateNode(obj: SelectorModel, node: NodeModel, diagram: Diagram, entry: HistoryEntry, type?: string): void;
    private rotationChanged;
    /**
     * Helper method to update connection changed entries.
     *
     * @param {SelectorModel | ConnectorModel} obj - The selector or connector model to update.
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @returns {void}
     * @private
     */
    recordConnectionChanged(obj: SelectorModel | ConnectorModel, diagram: Diagram): void;
    /**
     * Helper method to handle connection changed entries.
     *
     * @param {ConnectorModel} obj - The connector model containing change information.
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @param {HistoryEntry} [entry] - Optional history entry associated with the change.
     * @returns {void}
     * @private
     */
    connectionChanged(obj: ConnectorModel, diagram: Diagram, entry?: HistoryEntry): void;
    private recordCollectionChanged;
    /**
     * Helper method to handle collection changed entries.
     *
     * @param {NodeModel | ConnectorModel} obj - The node or connector model involved in the collection change.
     * @param {string} changeType - The change type (e.g. 'Insert' or 'Remove').
     * @param {HistoryEntry} [entry] - Optional history entry associated with the change.
     * @param {Diagram} [diagram] - Optional Diagram instance.
     * @returns {void}
     * @private
     */
    collectionChanged(obj: NodeModel | ConnectorModel, changeType: string, entry?: HistoryEntry, diagram?: Diagram): void;
    /**
     * updateConnectorZindex method \
     *
     * @returns { void }
     * @param {NodeModel | ConnectorModel} obj - provide the diagram value.
     * @param {Diagram} diagram - provide the diagram value.
     * @private
     */
    updateConnectorZindex(obj: NodeModel | ConnectorModel, diagram: Diagram): void;
    private recordLabelCollectionChanged;
    /**
     * Helper method to handle label collection changed entries.
     *
     * @param {Node | Connector} obj - The node or connector that owns the label.
     * @param {ShapeAnnotationModel | PathAnnotationModel} label - The label model being added or removed.
     * @param {string} changeType - The type of change ('Insert' or 'Remove').
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @returns {void}
     * @private
     */
    labelCollectionChanged(obj: Node | Connector, label: ShapeAnnotationModel | PathAnnotationModel, changeType: string, diagram: Diagram): void;
    private recordPortCollectionChanged;
    /**
     * Helper method to handle port collection changed entries.
     *
     * @param {Node | Connector} obj - The node or connector that owns the port.
     * @param {PointPortModel | PathPortModel} port - The port model being added or removed.
     * @param {string} changeType - The type of change ('Insert' or 'Remove').
     * @param {Diagram} diagram - The Diagram instance to operate on.
     * @returns {void}
     * @private
     */
    portCollectionChanged(obj: Node | Connector, port: PointPortModel | PathPortModel, changeType: string, diagram: Diagram): void;
    /**
     * redo method \
     *
     * @returns { void } redo method .\
     * @param {Diagram} diagram - provide the diagram value.
     *
     * @private
     */
    redo(diagram: Diagram): void;
    private redoGroupAction;
    private redoEntry;
    private getUndoEntry;
    private getRedoEntry;
    /**
     * Constructor for the undo redo module
     *
     * @private
     */
    constructor();
    /**
     * To destroy the undo redo module
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * @returns { string } toBounds method .\
     * Get getModuleName name.
     */
    protected getModuleName(): string;
}
/** @private */
export interface BpmnTextAnnotationConnector {
    isBpmnAnnotationConnector: boolean;
}
