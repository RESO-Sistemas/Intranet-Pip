import { Diagram } from '../diagram';
import { NodeModel } from '../objects/node-model';
import { DiagramElement } from '../core/elements/diagram-element';
import { Node } from '../objects/node';
import { GroupableView } from '../core/containers/container';
import { Canvas } from '../core/containers/canvas';
import { Rect } from '../primitives/rect';
/**
 * Container wrapper initialization \
 *
 * @returns {DiagramElement} initContainerWrapper method. \
 * @param {DiagramElement} content - Provide the content value.
 * @param {NodeModel} node - Provide the node value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function initContainerWrapper(content: DiagramElement, node: NodeModel, diagram: Diagram): DiagramElement;
/**
 * Updates the size for a container node when modified \
 *
 * @returns {void} setSizeForContainer method. \
 * @param {Node} newObject - Provide the newObject value.
 * @param {Node} oldObject - Provide the oldObject value.
 * @param {Node} object - Provide the object value.
 * @param {Canvas} wrapper - Provide the wrapper value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function setSizeForContainer(newObject: Node, oldObject: Node, object: Node, wrapper: Canvas, diagram: Diagram): void;
/**
 * Manages the drop of a child node into a container node \
 *
 * @returns {void} dropContainerChild method. \
 * @param {Node} target - Provide the target value.
 * @param {Node} source - Provide the source value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function dropContainerChild(target: Node, source: Node, diagram: Diagram): void;
/**
 * Computes the bounding rectangle of children nodes excluding a specific child \
 *
 * @returns {Rect} getChildrenBound method. \
 * @param {Node} node - Provide the node value.
 * @param {string} excludeChild - Provide the excludeChild value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function getChildrenBound(node: Node, excludeChild: string, diagram: Diagram): Rect;
/**
 * Adjusts the container size based on child element bounds \
 *
 * @returns {void} adjustContainerSize method. \
 * @param {Rect} bound - Provide the bound value.
 * @param {Node} obj - Provide the obj value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @param {boolean} isDrag - Provide the isDrag value.
 * @private
 */
export declare function adjustContainerSize(bound: Rect, obj: Node, diagram: Diagram, isDrag: boolean): void;
/**
 * Handles drag operation of a child node within its container \
 *
 * @returns {void} dragContainerChild method. \
 * @param {Node} obj - Provide the obj value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @param {number} tx - Provide the tx value.
 * @param {number} ty - Provide the ty value.
 * @private
 */
export declare function dragContainerChild(obj: Node, diagram: Diagram, tx: number, ty: number): void;
/**
 * Change the child wrapper value in container while drop from symbol palette \
 *
 * @returns {void} updateChildWrapper method. \
 * @param {Node} node - Provide the id of node.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function updateChildWrapper(node: Node, diagram: Diagram): void;
/**
 * Updates connections and dock positions for container's child nodes \
 *
 * @returns {void} updateContainerDocks method. \
 * @param {Node} obj - Provide the obj value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function updateContainerDocks(obj: Node, diagram: Diagram): void;
/**
 * Removes a child node from its container \
 *
 * @returns {void} removeChildFromContainer method. \
 * @param {Node} currentObj - Provide the currentObj value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function removeChildFromContainer(currentObj: Node, diagram: Diagram): void;
/**
 * Removes a child element from a container's layout \
 *
 * @returns {void} removeGElement method. \
 * @param {GroupableView} wrapper - Provide the wrapper value.
 * @param {string} name - Provide the name value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @param {boolean} isDelete - Provide the isDelete value.
 * @private
 */
export declare function removeGElement(wrapper: GroupableView, name: string, diagram?: Diagram, isDelete?: boolean): void;
/**
 * Adds a child node to a container \
 *
 * @returns {void} addContainerChild method. \
 * @param {NodeModel} child - Provide the child value.
 * @param {string} parentId - Provide the parentId value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function addContainerChild(child: NodeModel, parentId: string, diagram: Diagram): void;
/**
 * Removes a child node from its parent container while undo \
 *
 * @returns {void} removeChild method. \
 * @param {Node} node - Provide the id of node.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export declare function removeChild(node: Node, diagram: Diagram): void;
/** @private */
export interface Margins {
    top?: number;
    left?: number;
}
