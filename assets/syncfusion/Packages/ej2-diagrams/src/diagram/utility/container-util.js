import { DiagramElement } from '../core/elements/diagram-element';
import { NodeConstraints, DiagramAction } from '../enum/enum';
import { Node } from '../objects/node';
import { cloneObject, randomId } from './../utility/base-util';
import { TextElement } from '../core/elements/text-element';
import { Canvas } from '../core/containers/canvas';
import { Size } from '../primitives/size';
import { getDiagramElement } from './dom-util';
import { PathElement } from '../core/elements/path-element';
/**
 * Container wrapper initialization \
 *
 * @returns {DiagramElement} initContainerWrapper method. \
 * @param {DiagramElement} content - Provide the content value.
 * @param {NodeModel} node - Provide the node value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function initContainerWrapper(content, node, diagram) {
    content = getContainerElement(content, node, diagram);
    return content;
}
/**
 * Apply styles to the element \
 *
 * @returns {void} setStyle method. \
 * @param {DiagramElement} child - Provide the child value.
 * @param {Node} node - Provide the node value.
 * @private
 */
function setStyle(child, node) {
    //set style
    child.style.fill = node.style.fill;
    child.style.strokeColor = node.style.strokeColor;
    child.style.strokeWidth = node.style.strokeWidth;
    child.style.strokeDashArray = node.style.strokeDashArray;
    child.style.opacity = node.style.opacity;
    child.style.gradient = node.style.gradient;
    //941052: Issue with visible property doesn't hide shadows
    if ((node.constraints & NodeConstraints.Shadow) !== 0 && node.visible) {
        child.shadow = node.shadow;
    }
}
/**
 * Gets the container element for a node \
 *
 * @returns {GroupableView} getContainerElement method. \
 * @param {DiagramElement} content - Provide the content value.
 * @param {Node} node - Provide the node value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
function getContainerElement(content, node, diagram) {
    var container = new Canvas();
    //set style
    setStyle(container, node);
    container.id = node.id + '_container';
    var size = getSize(node, content);
    node.width = size.width;
    node.height = size.height;
    content.id = node.id + '_content';
    content.width = size.width;
    content.height = size.height;
    setStyle(content, node);
    container.children = [content];
    if (node.shape.header && node.shape.hasHeader) {
        var header = initHeader(diagram, node);
        container.children.push(header);
    }
    var containerShapeObj = (node.shape);
    if (node.shape.children && node.shape.children.length > 0) {
        for (var i = 0; i < containerShapeObj.children.length; i++) {
            var child = diagram.nameTable[containerShapeObj.children[parseInt(i.toString(), 10)]];
            if (child && (!child.parentId || child.parentId === node.id)) {
                child.parentId = node.id;
                if (!child.margin.left) {
                    child.margin.left = 10;
                }
                if (!child.margin.top) {
                    child.margin.top = 10;
                }
                if (node.shape.header && node.shape.hasHeader && !diagram.isLoading
                    && !(diagram.diagramActions & DiagramAction.UndoRedo)) {
                    child.margin.top += node.shape.header.height;
                }
                var nodeOffsetX = (node.offsetX - node.width * node.pivot.x) +
                    (child.margin.left + child.width * child.pivot.x);
                var nodeOffsetY = (node.offsetY - node.height * node.pivot.y) +
                    (child.margin.top + child.height * child.pivot.y);
                if (child.offsetX !== nodeOffsetX || child.offsetY !== nodeOffsetY) {
                    child.offsetX = nodeOffsetX;
                    child.offsetY = nodeOffsetY;
                }
                container.children.push(child.wrapper);
                updateIndex(diagram, child);
            }
        }
    }
    container.width = node.width;
    container.height = node.height;
    return container;
}
/**
 * Computes size for a node based on constraints and content \
 *
 * @returns {Size} getSize method. \
 * @param {Node} node - Provide the node value.
 * @param {DiagramElement} content - Provide the content value.
 * @private
 */
function getSize(node, content) {
    var size = new Size(node.width, node.height);
    if (!(content instanceof PathElement)) {
        size.width = size.width || 50;
        size.height = size.height || 50;
    }
    if (content.actualSize.width && content.actualSize.height) {
        return content.actualSize;
    }
    if (node.maxWidth !== undefined) {
        size.width = Math.min(size.width, node.maxWidth);
    }
    if (node.maxHeight !== undefined) {
        size.height = Math.min(size.height, node.maxHeight);
    }
    if (node.minWidth !== undefined) {
        size.width = Math.max(size.width, node.minWidth);
    }
    if (node.minHeight !== undefined) {
        size.height = Math.max(size.height, node.minHeight);
    }
    return size;
}
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
export function setSizeForContainer(newObject, oldObject, object, wrapper, diagram) {
    wrapper.children[0].width = newObject.width;
    wrapper.children[0].height = newObject.height;
    if (object.shape.header && object.shape.hasHeader) {
        var header = diagram.nameTable[object.id + object.shape.header.id];
        header.wrapper.children[0].width = newObject.width;
        header.wrapper.measure(new Size(header.wrapper.bounds.width, header.wrapper.bounds.height));
        header.wrapper.arrange(header.wrapper.desiredSize);
    }
}
/**
 * Initialize header for container nodes \
 *
 * @returns {GroupableView} initHeader method. \
 * @param {Diagram} diagram - Provide the diagram value.
 * @param {NodeModel} object - Provide the object value.
 * @private
 */
function initHeader(diagram, object) {
    var shape = object.shape;
    shape.header.id = shape.header.id || randomId();
    var node = {
        id: object.id + shape.header.id,
        annotations: [cloneObject(shape.header.annotation)],
        style: shape.header.style,
        offsetX: object.offsetX, offsetY: object.offsetY,
        height: shape.header.height,
        width: object.width
    };
    var wrapper = getHeaderWrapper(diagram, object, node, true);
    return wrapper;
}
/**
 * Retrieves the header wrapper for rendering \
 *
 * @returns {GroupableView} getHeaderWrapper method. \
 * @param {Diagram} diagram - Provide the diagram value.
 * @param {NodeModel} parent - Provide the parent value.
 * @param {NodeModel} object - Provide the object value.
 * @param {boolean} isHeader - Provide the isHeader value.
 * @private
 */
function getHeaderWrapper(diagram, parent, object, isHeader) {
    var node = new Node(diagram, 'nodes', object, true);
    node.parentId = parent.id;
    node.isHeader = isHeader;
    node.constraints &= ~(NodeConstraints.InConnect | NodeConstraints.OutConnect);
    node.constraints |= NodeConstraints.HideThumbs;
    diagram.initObject(node);
    diagram.nodes.push(node);
    if (node.wrapper.children.length > 0) {
        for (var i = 0; i < node.wrapper.children.length; i++) {
            var child = node.wrapper.children[parseInt(i.toString(), 10)];
            if (child instanceof DiagramElement) {
                child.isCalculateDesiredSize = false;
            }
            if (child instanceof TextElement) {
                child.canConsiderBounds = false;
            }
        }
        node.wrapper.measure(new Size(undefined, undefined));
        node.wrapper.arrange(node.wrapper.desiredSize);
    }
    node.wrapper.measure(new Size(undefined, undefined));
    node.wrapper.arrange(node.wrapper.desiredSize);
    return node.wrapper;
}
/**
 * Updates the z-index and order of nodes within the diagram \
 *
 * @returns {void} updateIndex method. \
 * @param {Diagram} diagram - Provide the diagram value.
 * @param {Node | Connector} source - Provide the source value.
 * @private
 */
function updateIndex(diagram, source) {
    var childNode = source;
    var nodeindex = diagram.getIndex(childNode, childNode.id);
    var layerIndex = diagram.layers.indexOf(diagram.commandHandler.getObjectLayer(source.id));
    var layer = diagram.layers[parseInt(layerIndex.toString(), 10)];
    diagram.nodes.splice(Number(nodeindex), 1);
    delete layer.zIndexTable[childNode.zIndex];
    childNode.zIndex = layer.objectZIndex + 1;
    diagram.nodes.push(childNode);
    layer.zIndexTable[childNode.zIndex] = childNode.id;
}
/**
 * Manages the drop of a child node into a container node \
 *
 * @returns {void} dropContainerChild method. \
 * @param {Node} target - Provide the target value.
 * @param {Node} source - Provide the source value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function dropContainerChild(target, source, diagram) {
    var container = diagram.nameTable[target.id].shape;
    // 967788 : selection issue when drag and drop child from palette to container
    if (diagram.currentSymbol && target.shape.type === 'Container') {
        source.parentId = target.id;
        return;
    }
    container.children = container.children || [];
    var redoElement = cloneObject(source);
    var sources = diagram.nameTable[source.id].wrapper;
    var targetWrapper = diagram.nameTable[target.id].wrapper;
    sources.margin.top = (sources.offsetY - (sources.actualSize.height / 2))
        - (target.offsetY - (target.actualSize.height / 2));
    sources.margin.left = (sources.offsetX - (sources.actualSize.width / 2))
        - (target.offsetX - (target.actualSize.width / 2));
    diagram.nameTable[source.id].parentId = target.id;
    container.children.push(source.id);
    targetWrapper.children[0].children.push(diagram.nameTable[source.id].wrapper);
    var bound = getChildrenBound(target, source.id, diagram);
    adjustContainerSize(bound, diagram.nameTable[source.id], diagram, false);
    if (sources.margin.left < 0) {
        sources.margin.left = 10;
    }
    if (sources.margin.top < 0 || (container.hasHeader && (sources.margin.top < container.header.height))) {
        sources.margin.top = 10;
        if (container.hasHeader) {
            sources.margin.top += container.header.height;
        }
    }
    targetWrapper.measure(new Size(undefined, undefined));
    targetWrapper.arrange(targetWrapper.desiredSize);
    var obj = cloneObject(source);
    var entry = {
        type: 'PositionChanged', undoObject: { nodes: [redoElement] },
        redoObject: { nodes: [obj] }, category: 'Internal'
    };
    diagram.addHistoryEntry(entry);
    if (diagram.mode === 'SVG') {
        if (source.zIndex < target.zIndex) {
            diagram.moveSvgNode(source.id);
            updateIndex(diagram, source);
        }
        var parent_1 = getDiagramElement(target.id + '_groupElement');
        parent_1.appendChild(getDiagramElement(source.id + '_groupElement'));
    }
}
/**
 * Computes the bounding rectangle of children nodes excluding a specific child \
 *
 * @returns {Rect} getChildrenBound method. \
 * @param {Node} node - Provide the node value.
 * @param {string} excludeChild - Provide the excludeChild value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function getChildrenBound(node, excludeChild, diagram) {
    var children = node.shape.children;
    var bound;
    if (children && children.length) {
        for (var _i = 0; _i < children.length; _i++) {
            var i = children[parseInt(_i.toString(), 10)];
            if (excludeChild !== i) {
                if (!bound) {
                    bound = diagram.nameTable['' + i].wrapper.bounds;
                }
                else {
                    bound = diagram.nameTable['' + i].wrapper.bounds.uniteRect(bound);
                }
            }
        }
    }
    return bound || diagram.nameTable['' + excludeChild].wrapper.bounds;
}
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
export function adjustContainerSize(bound, obj, diagram, isDrag) {
    var diffX;
    var diffY;
    var node = diagram.nameTable[obj.parentId];
    var pivot = { x: 0.5, y: 0.5 };
    var actualSize = node.wrapper.actualSize;
    var headerHeight = 0;
    if (node.shape.hasHeader) {
        headerHeight = node.shape.header.height;
    }
    if ((node.wrapper.bounds.left + obj.margin.left + obj.width) > (node.wrapper.bounds.right)) {
        pivot.x = 0;
        diffX = (obj.wrapper.margin.left + obj.wrapper.bounds.width) / actualSize.width;
    }
    else if (obj.margin.left < 0) {
        pivot.x = 1;
        diffX = (obj.wrapper.bounds.x + obj.wrapper.bounds.width) / node.wrapper.bounds.x;
    }
    if ((node.wrapper.bounds.top + obj.margin.top + obj.height) > (node.wrapper.bounds.bottom)) {
        pivot.y = 0;
        diffY = (obj.wrapper.margin.top + obj.wrapper.bounds.height) / actualSize.height;
    }
    else if (obj.margin.top < headerHeight && !isDrag) {
        pivot.y = 1;
        diffY = (obj.wrapper.bounds.y + obj.wrapper.bounds.height) / node.wrapper.bounds.y;
    }
    if ((diffX > 0 || diffY > 0) && (node.constraints & NodeConstraints.Resize)) {
        diagram.commandHandler.scale(diagram.nameTable[obj.parentId], diffX || 1, diffY || 1, pivot);
    }
}
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
export function dragContainerChild(obj, diagram, tx, ty) {
    var node = diagram.nameTable[(obj).parentId];
    var headerHeight = 0;
    if (node.shape.hasHeader) {
        headerHeight = node.shape.header.height;
    }
    var newMargin = {
        top: (obj.margin.top + ty) - headerHeight >= 0 ? obj.margin.top + ty : obj.margin.top,
        left: obj.margin.left + tx >= 0 ? obj.margin.left + tx : obj.margin.left
    };
    if (newMargin.top !== obj.margin.top || newMargin.left !== obj.margin.left) {
        diagram.nodePropertyChange(obj, {}, { margin: newMargin });
    }
    var bound = getChildrenBound(node, obj.id, diagram);
    adjustContainerSize(bound, obj, diagram, true);
    node.wrapper.measure(new Size(undefined, undefined));
    node.wrapper.arrange(node.wrapper.desiredSize);
    diagram.updateSelector();
    updateContainerDocks(node, diagram);
}
/**
 * Change the child wrapper value in container while drop from symbol palette \
 *
 * @returns {void} updateChildWrapper method. \
 * @param {Node} node - Provide the id of node.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function updateChildWrapper(node, diagram) {
    var containerChildren = diagram.nameTable[node.parentId].wrapper.children[0].children;
    for (var i = 0; i < containerChildren.length; i++) {
        if (containerChildren[parseInt(i.toString(), 10)].id === node.wrapper.id &&
            (containerChildren[parseInt(i.toString(), 10)].offsetX === node.wrapper.offsetX ||
                containerChildren[parseInt(i.toString(), 10)].offsetY === node.wrapper.offsetY)) {
            containerChildren[parseInt(i.toString(), 10)] = node.wrapper;
            break;
        }
    }
}
/**
 * Updates connections and dock positions for container's child nodes \
 *
 * @returns {void} updateContainerDocks method. \
 * @param {Node} obj - Provide the obj value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function updateContainerDocks(obj, diagram) {
    var childTable = obj.shape.children;
    if (childTable) {
        for (var _a = 0, childTable_1 = childTable; _a < childTable_1.length; _a++) {
            var i = childTable_1[_a];
            var actualObject = diagram.nameTable["" + i];
            if (actualObject) {
                diagram.updateConnectorEdges(actualObject);
                actualObject.wrapper.measure(new Size(actualObject.wrapper.width, actualObject.wrapper.height));
                actualObject.wrapper.arrange(actualObject.wrapper.desiredSize);
                if (actualObject.shape.children
                    && actualObject.shape.children.length) {
                    updateContainerDocks(actualObject, diagram);
                }
            }
        }
    }
    else {
        return;
    }
}
/**
 * Removes a child node from its container \
 *
 * @returns {void} removeChildFromContainer method. \
 * @param {Node} currentObj - Provide the currentObj value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function removeChildFromContainer(currentObj, diagram) {
    var element = diagram.nameTable[currentObj.parentId];
    if (currentObj.shape.type === 'Container') {
        if (currentObj.shape.children && currentObj.shape.children.length > 0) {
            var children = currentObj.shape.children;
            for (var j = children.length - 1; j >= 0; j--) {
                diagram.remove(diagram.nameTable[children[parseInt(j.toString(), 10)]]);
            }
        }
        if (currentObj.shape.hasHeader) {
            diagram.remove(diagram.nameTable[currentObj.id + currentObj.shape.header.id]);
        }
    }
    if (element) {
        diagram.removeDependentConnector(currentObj);
        var children = element.shape.children;
        removeGElement(element.wrapper, currentObj.id, diagram, true);
        if (children) {
            var childIndex = children.indexOf(currentObj.id);
            children.splice(childIndex, 1);
        }
    }
}
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
export function removeGElement(wrapper, name, diagram, isDelete) {
    for (var _a = 0, _b = wrapper.children; _a < _b.length; _a++) {
        var i = _b[_a];
        if (i.id === name) {
            wrapper.children.splice(wrapper.children.indexOf(i), 1);
            if (!isDelete) {
                var element = document.getElementById(i.id + '_groupElement');
                var diagramLayer = document.getElementById(diagram.element.id + '_diagramLayer');
                var parent_2 = element.parentElement;
                parent_2.removeChild(element);
                diagramLayer.appendChild(element);
            }
        }
        else if (i.children) {
            removeGElement(i, name, diagram, isDelete);
        }
    }
}
/**
 * Adds a child node to a container \
 *
 * @returns {void} addContainerChild method. \
 * @param {NodeModel} child - Provide the child value.
 * @param {string} parentId - Provide the parentId value.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function addContainerChild(child, parentId, diagram) {
    var id = child.id;
    var node = diagram.nameTable["" + id];
    var undoElement = cloneObject(node);
    // Add the child to the diagram if it's not already present
    if (!node) {
        diagram.add(child);
        node = diagram.nameTable["" + id];
    }
    child.parentId = parentId;
    var parentContainer = diagram.nameTable["" + parentId];
    // Ensure the parent has a children structure
    var containerShape = parentContainer.shape;
    if (!containerShape.children) {
        containerShape.children = [];
    }
    // Check if the container and parent are correctly configured
    if (node && parentContainer) {
        node.parentId = parentId;
        if (node.margin.top <= 0 || (parentContainer.shape.hasHeader &&
            node.margin.top < parentContainer.shape.header.height)) {
            node.margin.top = 10;
            if (parentContainer.shape.hasHeader) {
                node.margin.top += parentContainer.shape.header.height;
            }
        }
        if (node.margin.left <= 0) {
            node.margin.left = 10;
        }
        var nodeOffsetX = (parentContainer.offsetX - parentContainer.width * parentContainer.pivot.x) +
            (node.margin.left + node.width * node.pivot.x);
        var nodeOffsetY = (parentContainer.offsetY - parentContainer.height * parentContainer.pivot.y) +
            (node.margin.top + node.height * node.pivot.y);
        if (node.offsetX !== nodeOffsetX || node.offsetY !== nodeOffsetY) {
            node.offsetX = nodeOffsetX;
            node.offsetY = nodeOffsetY;
        }
        var children = containerShape.children;
        // Add the container id to the parent's children list if not already present
        if (children.indexOf(id) < 0) {
            children.push(id);
        }
        // Append the container wrapper to the parent's wrapper and measure layout
        parentContainer.wrapper.children.push(node.wrapper);
        parentContainer.wrapper.measure(new Size());
        parentContainer.wrapper.arrange(parentContainer.wrapper.desiredSize);
        diagram.refreshDiagramLayer();
        // Record the action in history for undo/redo functionality
        if (!(diagram.diagramActions & DiagramAction.UndoRedo) && (!diagram.historyManager.currentEntry ||
            diagram.historyManager.currentEntry.type !== 'CollectionChanged')) {
            var obj = cloneObject(node);
            var entry = {
                type: 'PositionChanged',
                undoObject: { nodes: [undoElement] },
                redoObject: { nodes: [obj] },
                category: 'Internal'
            };
            diagram.addHistoryEntry(entry);
        }
        // If using SVG, configure DOM accordingly
        if (diagram.mode === 'SVG') {
            var childElement = getDiagramElement(parentId + '_groupElement');
            childElement.appendChild(getDiagramElement(child.id + '_groupElement'));
        }
    }
}
/**
 * Removes a child node from its parent container while undo \
 *
 * @returns {void} removeChild method. \
 * @param {Node} node - Provide the id of node.
 * @param {Diagram} diagram - Provide the diagram value.
 * @private
 */
export function removeChild(node, diagram) {
    var id = node.id;
    var parent = diagram.nameTable[node.parentId];
    if (parent) {
        var children = parent.shape.children;
        removeGElement(parent.wrapper, id, diagram, true);
        var childrenIndex = children.indexOf(id);
        children.splice(childrenIndex, 1);
        node.parentId = '';
        diagram.refreshDiagramLayer();
        diagram.updateSelector();
    }
}
