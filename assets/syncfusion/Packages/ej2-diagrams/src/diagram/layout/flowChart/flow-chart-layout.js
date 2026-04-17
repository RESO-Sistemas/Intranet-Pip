import { Diagram } from '../../diagram';
import { Rect } from '../../primitives/rect';
import { FlowchartModel } from './flow-chart-model';
import { MatrixModel } from './matrix-model';
/**
 * Defines the Flowchart Layout
 */
var FlowchartLayout = /** @class */ (function () {
    function FlowchartLayout() {
        this.rootNodes = [];
        this.vertexMapper = new Map();
        this.edgesMapper = new Map();
        this.loopedgesMapper = new Map();
        this.anchorX = 0;
        this.anchorY = 0;
        this.verticalSpacing = 50;
        this.horizontalSpacing = 50;
        this.horizontalAlignment = 'Center';
        this.verticalAlignment = 'Top';
        this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
        this.orientation = 'TopToBottom';
        this.yesBranchDirection = 'SameAsFlow';
        this.noBranchDirection = 'RightInFlow';
        this.yesBranchValues = ['Yes', 'True'];
        this.noBranchValues = ['No', 'False'];
        this.diagram = new Diagram();
    }
    /**
     * To update the layout of the diagram.
     * @private
     * @param {NodeModel[]} nodes - provide the node value.
     * @param {Diagram} diagram - provide the diagram value.
     * @returns { void }
     */
    FlowchartLayout.prototype.updateLayout = function (nodes, diagram) {
        this.diagram = diagram;
        this.yesBranchDirection = this.diagram.layout.flowchartLayoutSettings.yesBranchDirection;
        this.noBranchDirection = this.diagram.layout.flowchartLayoutSettings.noBranchDirection;
        this.yesBranchValues = this.diagram.layout.flowchartLayoutSettings.yesBranchValues || ['Yes', 'True'];
        this.noBranchValues = this.diagram.layout.flowchartLayoutSettings.noBranchValues || ['No', 'False'];
        this.orientation = this.diagram.layout.orientation === 'TopToBottom' || this.diagram.layout.orientation === 'BottomToTop' ? 'TopToBottom' : 'LeftToRight';
        this.horizontalAlignment = this.diagram.layout.horizontalAlignment;
        this.verticalAlignment = this.diagram.layout.verticalAlignment;
        this.verticalSpacing = this.diagram.layout.verticalSpacing;
        this.horizontalSpacing = this.diagram.layout.horizontalSpacing;
        this.margin = this.diagram.layout.margin;
        var firstLevelNodes = [];
        var unseenVertices = [];
        this.rootNodes = [];
        this.vertexMapper.clear();
        this.edgesMapper.clear();
        this.loopedgesMapper.clear();
        var connectors = this.diagram.connectors;
        //976507: Connector segments issues
        for (var _i = 0, connectors_1 = connectors; _i < connectors_1.length; _i++) {
            var connector = connectors_1[_i];
            if (connector.segments && connector.segments.length > 0) {
                connector.segments = connector.segments.filter(function (segment) { return !(segment).isOrthoInternalSegment; });
            }
        }
        for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
            var item = nodes_1[_a];
            if (!item.excludeFromLayout) {
                var vertex = this.createVertex(item);
                this.vertexMapper.set(vertex.id, vertex);
                unseenVertices.push(vertex);
                if (!vertex.inEdges || vertex.inEdges.length === 0) {
                    firstLevelNodes.push(vertex);
                    this.rootNodes.push(item);
                }
            }
        }
        var previousModel = null;
        for (var _b = 0, firstLevelNodes_1 = firstLevelNodes; _b < firstLevelNodes_1.length; _b++) {
            var firstLevelNode = firstLevelNodes_1[_b];
            var vertexSet = [];
            this.getTreeVertices(firstLevelNode, vertexSet, unseenVertices);
            var layoutModel = new FlowchartModel(this, firstLevelNode, vertexSet);
            layoutModel.layeringStage();
            var matrixModel = new MatrixModel(layoutModel);
            matrixModel.siblingModel = previousModel;
            matrixModel.arrangeElements();
            previousModel = matrixModel;
        }
        var vertices = Array.from(this.vertexMapper.values());
        var modelBounds = this.getModelBounds(vertices);
        this.updateAnchor(modelBounds);
        var isHorizontal = this.orientation === 'LeftToRight';
        var inverseSpacing = !isHorizontal ? this.verticalSpacing : this.horizontalSpacing;
        var nodeWithMultiEdges = [];
        for (var _c = 0, vertices_1 = vertices; _c < vertices_1.length; _c++) {
            var vertex = vertices_1[_c];
            if (vertex) {
                var node = vertex.item;
                if (node) {
                    node.offsetX = vertex.geometry.x + (vertex.geometry.width / 2) + this.anchorX;
                    node.offsetY = vertex.geometry.y + (vertex.geometry.height / 2) + this.anchorY;
                    if ((vertex.inEdges && vertex.inEdges.length > 0) || (vertex.outEdges && vertex.outEdges.length > 0)) {
                        nodeWithMultiEdges.push(node);
                    }
                }
                diagram.dataBind();
            }
        }
        var transModelBounds = new Rect(modelBounds.x + this.anchorX, modelBounds.y
            + this.anchorY, modelBounds.width, modelBounds.height);
        this.nodeWithMultiEdges = nodeWithMultiEdges;
        this.inverseSpacing = inverseSpacing;
        this.transModelBounds = transModelBounds;
        this.diagram.layout.flowChartData = this;
    };
    /**
     * To re-rout the flowchart connectors.
     * @private
     * @param {FlowchartLayout} layoutData - provide the layoutData value.
     * @param {Diagram} diagram - provide the diagram value.
     * @returns { void }
     */
    FlowchartLayout.prototype.reRouteFlowChartConnectors = function (layoutData, diagram) {
        this.diagram = diagram;
        var nodeWithMultiEdges = layoutData.nodeWithMultiEdges;
        var inverseSpacing = layoutData.inverseSpacing;
        this.orientation = layoutData.orientation;
        var isVertical = this.orientation === 'TopToBottom';
        var transModelBounds = layoutData.transModelBounds;
        this.vertexMapper = layoutData.vertexMapper;
        this.loopedgesMapper = layoutData.loopedgesMapper;
        this.edgesMapper = layoutData.edgesMapper;
        this.anchorX = layoutData.anchorX;
        this.anchorY = layoutData.anchorY;
        var modifiedConnectors = [];
        for (var _i = 0, nodeWithMultiEdges_1 = nodeWithMultiEdges; _i < nodeWithMultiEdges_1.length; _i++) {
            var node = nodeWithMultiEdges_1[_i];
            if (node.outEdges && node.outEdges.length > 0) {
                for (var _a = 0, _b = node.outEdges; _a < _b.length; _a++) {
                    var edge = _b[_a];
                    var internalConnector = this.diagram.nameTable["" + edge];
                    if (this.loopedgesMapper.has(internalConnector) && this.loopedgesMapper.get(internalConnector)) {
                        if (modifiedConnectors.indexOf(internalConnector) === -1) {
                            this.updateLoopConnector(internalConnector);
                            modifiedConnectors.push(internalConnector);
                        }
                    }
                    else {
                        var updatedPts = [];
                        if (node.outEdges.length > 1) {
                            var segmentSize = inverseSpacing / 2.0;
                            var intermediatePoint = null;
                            if (this.edgesMapper.has(internalConnector)) {
                                var edgePt = this.edgesMapper.get(internalConnector)[0];
                                if (edgePt) {
                                    intermediatePoint = { x: edgePt.x + this.anchorX, y: edgePt.y + this.anchorY };
                                }
                            }
                            internalConnector.segments = [];
                            internalConnector.intermediatePoints = [];
                            var pts = [internalConnector.sourcePoint, internalConnector.targetPoint];
                            if (isVertical) {
                                updatedPts = this.updateVerticalConnectorSegments(internalConnector, pts);
                                var sourceNode = this.diagram.nameTable[internalConnector.sourceID];
                                var decisionNode = this.vertexMapper.get(sourceNode.id).isDecisionNode;
                                if (!decisionNode && updatedPts.length <= 2) {
                                    pts = this.updateConnectorPoints(updatedPts, segmentSize, intermediatePoint, transModelBounds);
                                }
                                else {
                                    pts = updatedPts;
                                }
                            }
                            else {
                                updatedPts = this.updateHorizontalSegments(internalConnector, pts);
                                pts = updatedPts;
                            }
                            if (pts.length > 2) {
                                this.updatePoints(pts, internalConnector);
                            }
                            modifiedConnectors.push(internalConnector);
                        }
                        else if (internalConnector.intermediatePoints.length === 4) {
                            // Determine updated points based on orientation (vertical or horizontal)
                            var start = internalConnector.intermediatePoints[0];
                            var end = internalConnector.intermediatePoints[3];
                            var offsetPoint = isVertical
                                ? { x: start.x, y: end.y - 20 }
                                : { x: end.x - 20, y: start.y };
                            var updatedPts_1 = [start, offsetPoint, end];
                            // Update connector points and add to modified list
                            this.updatePoints(updatedPts_1, internalConnector);
                            modifiedConnectors.push(internalConnector);
                        }
                    }
                }
            }
            if (node.inEdges && node.inEdges.length > 1) {
                for (var _c = 0, _d = node.inEdges; _c < _d.length; _c++) {
                    var edge = _d[_c];
                    var internalConnector = this.diagram.nameTable["" + edge];
                    if (modifiedConnectors.indexOf(internalConnector) === -1) {
                        internalConnector.segments[0].points = [];
                        if (this.loopedgesMapper.has(internalConnector) && this.loopedgesMapper.get(internalConnector)) {
                            this.updateLoopConnector(internalConnector);
                            modifiedConnectors.push(internalConnector);
                        }
                        else {
                            if (node.inEdges.length > 1) {
                                var segmentSize = inverseSpacing / 2.0;
                                var intermediatePoint = null;
                                if (this.edgesMapper.has(internalConnector) && modifiedConnectors.indexOf(internalConnector) === -1) {
                                    var edgePt = this.edgesMapper.get(internalConnector)[0];
                                    if (edgePt) {
                                        intermediatePoint = { x: edgePt.x + this.anchorX, y: edgePt.y + this.anchorY };
                                    }
                                }
                                internalConnector.segments = [];
                                var pts = [internalConnector.targetPoint, internalConnector.sourcePoint];
                                var updatedPts = [];
                                if (isVertical) {
                                    updatedPts = this.updateVerticalConnectorSegments(internalConnector, pts);
                                }
                                else {
                                    updatedPts = this.updateHorizontalSegments(internalConnector, pts);
                                }
                                pts = this.updateConnectorPoints(updatedPts, segmentSize, intermediatePoint, transModelBounds);
                                pts.reverse();
                                if (pts.length > 2) {
                                    this.updatePoints(pts, internalConnector);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    FlowchartLayout.prototype.updateAnchor = function (bounds) {
        var viewPort = {
            width: this.diagram.scrollSettings.viewPortWidth,
            height: this.diagram.scrollSettings.viewPortHeight
        };
        if (this.orientation === 'TopToBottom') {
            this.anchorX = viewPort.width / 2 - bounds.width / 2 - bounds.x;
            this.anchorY = this.margin.top;
        }
        else {
            this.anchorX = this.margin.left;
            this.anchorY = viewPort.height / 2 - bounds.height / 2 - bounds.y;
        }
        if (this.rootNodes.length === 1) {
            var fixedNode = this.rootNodes[0]; // Assuming rootNodes is defined elsewhere
            var fixedNodeGeometry = this.vertexMapper.get(fixedNode.id).geometry; // Assuming vertexMapper and its usage are defined elsewhere
            var offsetX = fixedNodeGeometry.x + fixedNodeGeometry.width / 2;
            var offsetY = fixedNodeGeometry.y + fixedNodeGeometry.height / 2;
            var dx = offsetX - (bounds.x + bounds.width / 2);
            var dy = offsetY - (bounds.y + bounds.height / 2);
            if (this.orientation === 'TopToBottom') {
                this.anchorX -= dx;
            }
            else {
                this.anchorY -= dy;
            }
        }
    };
    FlowchartLayout.prototype.updateConnectorPoints = function (connectorPoints, startSegmentSize, intermediatePoint, layoutBounds) {
        var isHorizontal = this.orientation === 'LeftToRight';
        var pts = connectorPoints.slice();
        // Helper function to find angle between two points
        function findAngle(point1, point2) {
            return Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);
        }
        // Function to find the distance (length) between two points
        function findLength(point1, point2) {
            var dx = point2.x - point1.x;
            var dy = point2.y - point1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        // Helper function to transform a point
        function transform(point, length, angle) {
            var rad = angle * (Math.PI / 180);
            var newX = point.x + length * Math.cos(rad);
            var newY = point.y + length * Math.sin(rad);
            return { x: newX, y: newY };
        }
        if (pts.length > 2) {
            var newPt = transform(pts[0], startSegmentSize, findAngle(pts[0], pts[1]));
            var nextPt = transform(newPt, findLength(newPt, pts[1]), findAngle(newPt, pts[2]));
            pts.splice(1, 0, nextPt);
            pts.splice(1, 0, newPt);
            pts.splice(3, 2);
            if (intermediatePoint != null) {
                var index = 2;
                var ptsCount = pts.length;
                var newPt1 = transform(pts[ptsCount - 1], startSegmentSize, findAngle(pts[ptsCount - 1], pts[ptsCount - 2]));
                pts.splice(ptsCount - 1, 0, newPt1);
                while (index < pts.length - 2) {
                    pts.splice(index, 1);
                }
                var edgePt = intermediatePoint;
                this.inflate(layoutBounds, layoutBounds.width, layoutBounds.height);
                if (isHorizontal) {
                    var line1 = [{ x: layoutBounds.left, y: edgePt.y }, { x: layoutBounds.right, y: edgePt.y }];
                    var line2 = [{ x: pts[1].x, y: layoutBounds.top }, { x: pts[1].x, y: layoutBounds.bottom }];
                    var line3 = [{ x: newPt1.x, y: layoutBounds.top }, { x: newPt1.x, y: layoutBounds.bottom }];
                    var intercepts1 = [];
                    var intercepts2 = [];
                    // Dummy function calls, replace with actual implementation or mock
                    intercepts1 = this.diagram.commandHandler.intersect(line1, line2, false);
                    intercepts2 = this.diagram.commandHandler.intersect(line1, line3, false);
                    if (intercepts2.length) {
                        pts.splice(2, 0, intercepts2[0]);
                    }
                    if (intercepts1.length) {
                        pts.splice(2, 0, intercepts1[0]);
                    }
                }
                else {
                    var line1 = [{ x: edgePt.x, y: layoutBounds.top }, { x: edgePt.x, y: layoutBounds.bottom }];
                    var line2 = [{ x: layoutBounds.left, y: pts[1].y }, { x: layoutBounds.right, y: pts[1].y }];
                    var line3 = [{ x: layoutBounds.left, y: newPt1.y }, { x: layoutBounds.right, y: newPt1.y }];
                    var intercepts1 = [];
                    var intercepts2 = [];
                    // Dummy function calls, replace with actual implementation or mock
                    intercepts1 = this.diagram.commandHandler.intersect(line1, line2, false);
                    intercepts2 = this.diagram.commandHandler.intersect(line1, line3, false);
                    if (intercepts2.length) {
                        pts.splice(2, 0, intercepts2[0]);
                    }
                    if (intercepts1.length) {
                        pts.splice(2, 0, intercepts1[0]);
                    }
                }
            }
        }
        else if (pts.length === 2 && intermediatePoint != null) {
            var startPt = pts[0];
            var endPt = pts[1];
            var lineAngle = findAngle(pts[0], pts[1]);
            var newPt1 = transform(startPt, startSegmentSize, lineAngle);
            var newPt2 = transform(endPt, startSegmentSize, (lineAngle + 180) % 360);
            pts.splice(1, 0, newPt2);
            if (isHorizontal) {
                var nextPt1 = { x: newPt1.x, y: intermediatePoint.y };
                var nextPt2 = { x: newPt2.x, y: intermediatePoint.y };
                pts.splice(1, 0, nextPt2);
                pts.splice(1, 0, nextPt1);
            }
            else {
                var nextPt1 = { x: intermediatePoint.x, y: newPt1.y };
                var nextPt2 = { x: intermediatePoint.x, y: newPt2.y };
                pts.splice(1, 0, nextPt2);
                pts.splice(1, 0, nextPt1);
            }
            pts.splice(1, 0, newPt1);
        }
        return pts;
    };
    FlowchartLayout.prototype.inflate = function (rect, width, height) {
        rect.x -= width;
        rect.y -= height;
        rect.width += 2 * width;
        rect.height += 2 * height;
    };
    FlowchartLayout.isBranchConnector = function (internalConnector, branchValues) {
        if (internalConnector.annotations.length > 0 && internalConnector.annotations[0].content) {
            var text_1 = internalConnector.annotations[0].content;
            return branchValues.some(function (branchText) { return text_1.localeCompare(branchText, undefined, { sensitivity: 'accent' }) === 0; });
        }
        return false;
    };
    FlowchartLayout.prototype.isYesBranchConnector = function (internalConnector) {
        return FlowchartLayout.isBranchConnector(internalConnector, this.yesBranchValues);
    };
    FlowchartLayout.prototype.isNoBranchConnector = function (internalConnector) {
        return FlowchartLayout.isBranchConnector(internalConnector, this.noBranchValues);
    };
    FlowchartLayout.prototype.updateHorizontalSegments = function (internalConnector, pts) {
        var updatedPts = [];
        var sourcenode = this.diagram.nameTable[internalConnector.sourceID];
        var targetnode = this.diagram.nameTable[internalConnector.targetID];
        var decisionNode = this.vertexMapper.get(sourcenode.id).isDecisionNode;
        var hSpacing = this.horizontalSpacing / 2;
        var vSpacing = this.verticalSpacing / 2;
        if (decisionNode) {
            var isYesBranch = this.isYesBranchConnector(internalConnector);
            var isNoBranch = this.isNoBranchConnector(internalConnector);
            if ((!targetnode.wrapper.bounds.containsPoint({ x: targetnode.offsetX, y: sourcenode.offsetY })) &&
                !((sourcenode.offsetY !== targetnode.offsetY) &&
                    ((isYesBranch && this.yesBranchDirection === 'SameAsFlow') ||
                        (isNoBranch && this.noBranchDirection === 'SameAsFlow' && this.yesBranchDirection !== 'SameAsFlow')))) {
                if (sourcenode.wrapper.bounds.bottom < targetnode.wrapper.bounds.center.y) {
                    var spoint1 = sourcenode.wrapper.bounds.bottom;
                    var spoint2 = sourcenode.offsetX;
                    var tpoint1 = targetnode.wrapper.bounds.left;
                    var tpoint2 = targetnode.offsetY;
                    updatedPts.push({ x: spoint2, y: spoint1 });
                    updatedPts.push({ x: spoint2, y: tpoint2 });
                    updatedPts.push({ x: tpoint1, y: tpoint2 });
                }
                else if (sourcenode.wrapper.bounds.top > targetnode.wrapper.bounds.center.y) {
                    var spoint1 = sourcenode.wrapper.bounds.top;
                    var spoint2 = sourcenode.offsetX;
                    var tpoint1 = targetnode.wrapper.bounds.left;
                    var tpoint2 = targetnode.offsetY;
                    updatedPts.push({ x: spoint2, y: spoint1 });
                    updatedPts.push({ x: spoint2, y: tpoint2 });
                    updatedPts.push({ x: tpoint1, y: tpoint2 });
                }
                else if ((isYesBranch && this.yesBranchDirection === 'RightInFlow') ||
                    (isNoBranch && ((this.yesBranchDirection === 'SameAsFlow' &&
                        (this.noBranchDirection === 'RightInFlow' || this.noBranchDirection === 'SameAsFlow')) ||
                        (this.yesBranchDirection === 'LeftInFlow' &&
                            (this.noBranchDirection === 'LeftInFlow' || this.noBranchDirection === 'RightInFlow'))))) {
                    var spoint1 = sourcenode.offsetX;
                    var spoint2 = sourcenode.wrapper.bounds.bottom;
                    var tpoint1 = targetnode.wrapper.bounds.left;
                    var tpoint2 = targetnode.wrapper.bounds.center.y;
                    updatedPts.push({ x: spoint1, y: spoint2 });
                    updatedPts.push({ x: spoint1, y: spoint2 + vSpacing });
                    updatedPts.push({ x: tpoint1 - hSpacing, y: spoint2 + vSpacing });
                    updatedPts.push({ x: tpoint1 - hSpacing, y: tpoint2 });
                    updatedPts.push({ x: tpoint1, y: tpoint2 });
                }
            }
            else if ((isYesBranch && this.yesBranchDirection === 'LeftInFlow') ||
                (isNoBranch && ((this.yesBranchDirection === 'SameAsFlow' &&
                    (this.noBranchDirection === 'SameAsFlow' || this.noBranchDirection === 'LeftInFlow')) ||
                    (this.yesBranchDirection === 'RightInFlow' &&
                        (this.noBranchDirection === 'LeftInFlow' || this.noBranchDirection === 'RightInFlow'))))) {
                var spoint1 = sourcenode.offsetX;
                var spoint2 = sourcenode.wrapper.bounds.top;
                var tpoint1 = targetnode.wrapper.bounds.left;
                var tpoint2 = targetnode.wrapper.bounds.center.y;
                updatedPts.push({ x: spoint1, y: spoint2 });
                updatedPts.push({ x: spoint1, y: spoint2 - vSpacing });
                updatedPts.push({ x: tpoint1 - hSpacing, y: spoint2 - vSpacing });
                updatedPts.push({ x: tpoint1 - hSpacing, y: tpoint2 });
                updatedPts.push({ x: tpoint1, y: tpoint2 });
            }
            else if ((sourcenode.offsetY !== targetnode.offsetY) &&
                ((isYesBranch && this.yesBranchDirection === 'SameAsFlow') ||
                    (isNoBranch && this.noBranchDirection === 'SameAsFlow' &&
                        this.yesBranchDirection !== 'SameAsFlow'))) {
                var spoint1 = sourcenode.wrapper.bounds.right;
                var spoint2 = sourcenode.offsetY;
                var tpoint1 = targetnode.wrapper.bounds.left;
                var tpoint2 = targetnode.wrapper.bounds.center.y;
                updatedPts.push({ x: spoint1, y: spoint2 });
                updatedPts.push({ x: tpoint1 - hSpacing, y: spoint2 });
                updatedPts.push({ x: tpoint1 - hSpacing, y: tpoint2 });
                updatedPts.push({ x: tpoint1, y: tpoint2 });
            }
        }
        else {
            updatedPts = pts;
        }
        return updatedPts;
    };
    FlowchartLayout.prototype.updateVerticalConnectorSegments = function (internalConnector, pts) {
        var updatedPts = [];
        var sourcenode = this.diagram.nameTable[internalConnector.sourceID];
        var targetnode = this.diagram.nameTable[internalConnector.targetID];
        var decisionNode = this.vertexMapper.get(sourcenode.id).isDecisionNode;
        var hSpacing = this.horizontalSpacing / 2;
        var vSpacing = this.verticalSpacing / 2;
        if (decisionNode) {
            var isYesBranch = this.isYesBranchConnector(internalConnector);
            var isNoBranch = this.isNoBranchConnector(internalConnector);
            if ((sourcenode.wrapper.bounds.right < targetnode.wrapper.bounds.center.x) &&
                ((isYesBranch && this.yesBranchDirection === 'RightInFlow') ||
                    (isNoBranch && ((this.yesBranchDirection === 'SameAsFlow' &&
                        (this.noBranchDirection === 'RightInFlow' || this.noBranchDirection === 'SameAsFlow')) ||
                        (this.yesBranchDirection === 'LeftInFlow' &&
                            (this.noBranchDirection === 'LeftInFlow' || this.noBranchDirection === 'RightInFlow')))))) {
                var spoint1 = sourcenode.wrapper.bounds.right;
                var spoint2 = sourcenode.offsetY;
                var tpoint1 = targetnode.wrapper.bounds.top;
                var tpoint2 = targetnode.offsetY;
                updatedPts.push({ x: spoint1, y: spoint2 });
                var overlappingNodes = this.diagram.nodes.filter(function (e) {
                    return e.wrapper.bounds.containsPoint({ x: targetnode.offsetX, y: sourcenode.offsetY });
                });
                overlappingNodes = overlappingNodes.sort(function (a, b) {
                    return b.wrapper.bounds.left - a.wrapper.bounds.left;
                });
                if (overlappingNodes.length === 0) {
                    updatedPts.push({ x: targetnode.offsetX, y: spoint2 });
                }
                else {
                    var bounds = overlappingNodes[0].wrapper.bounds;
                    updatedPts.push({ x: bounds.left - hSpacing, y: overlappingNodes[0].offsetY });
                    updatedPts.push({ x: bounds.left - hSpacing, y: bounds.bottom + vSpacing });
                }
                updatedPts.push({ x: tpoint1, y: tpoint2 });
            }
            else if ((sourcenode.wrapper.bounds.left > targetnode.wrapper.bounds.center.x) &&
                ((isYesBranch && this.yesBranchDirection === 'LeftInFlow') ||
                    (isNoBranch && ((this.yesBranchDirection === 'SameAsFlow' &&
                        (this.noBranchDirection === 'SameAsFlow' || this.noBranchDirection === 'LeftInFlow')) ||
                        (this.yesBranchDirection === 'RightInFlow' &&
                            (this.noBranchDirection === 'LeftInFlow' || this.noBranchDirection === 'RightInFlow')))))) {
                var spoint1 = sourcenode.wrapper.bounds.left;
                var spoint2 = sourcenode.offsetY;
                var tpoint1 = targetnode.wrapper.bounds.top;
                var tpoint2 = targetnode.offsetY;
                updatedPts.push({ x: spoint1, y: spoint2 });
                var middleRect_1 = Rect.toBounds([updatedPts[0], { x: targetnode.offsetX, y: spoint2 }]);
                var overlappingNodes = this.diagram.nodes.filter(function (e) {
                    return e.wrapper.bounds.intersects(middleRect_1) &&
                        e.id !== sourcenode.id &&
                        e.id !== targetnode.id;
                });
                overlappingNodes = overlappingNodes.sort(function (a, b) {
                    return b.wrapper.bounds.right - a.wrapper.bounds.right;
                });
                if (overlappingNodes.length === 0) {
                    updatedPts.push({ x: targetnode.offsetX, y: spoint2 });
                }
                else {
                    var bounds = overlappingNodes[0].wrapper.bounds;
                    updatedPts.push({ x: bounds.right + hSpacing, y: overlappingNodes[0].offsetY });
                    updatedPts.push({ x: bounds.right + hSpacing, y: bounds.bottom + vSpacing });
                }
                updatedPts.push({ x: tpoint1, y: tpoint2 });
            }
            else if ((isYesBranch && this.yesBranchDirection === 'RightInFlow') ||
                (isNoBranch && ((this.yesBranchDirection === 'SameAsFlow' &&
                    (this.noBranchDirection === 'RightInFlow' || this.noBranchDirection === 'SameAsFlow')) ||
                    (this.yesBranchDirection === 'LeftInFlow' &&
                        (this.noBranchDirection === 'LeftInFlow' || this.noBranchDirection === 'RightInFlow'))))) {
                var spoint1 = sourcenode.wrapper.bounds.right;
                var spoint2 = sourcenode.offsetY;
                var tpoint1 = targetnode.wrapper.bounds.topCenter.x;
                var tpoint2 = targetnode.wrapper.bounds.topCenter.y;
                updatedPts.push({ x: spoint1, y: spoint2 });
                updatedPts.push({ x: spoint1 + hSpacing, y: spoint2 });
                updatedPts.push({ x: spoint1 + hSpacing, y: tpoint2 - vSpacing });
                updatedPts.push({ x: tpoint1, y: tpoint2 - vSpacing });
                updatedPts.push({ x: tpoint1, y: tpoint2 });
                var middleRect_2 = Rect.toBounds([updatedPts[1], updatedPts[2]]);
                var overlappingNodes = this.diagram.nodes.filter(function (e) {
                    return e.wrapper.bounds.intersects(middleRect_2);
                });
                overlappingNodes = overlappingNodes.sort(function (a, b) {
                    return b.wrapper.bounds.right - a.wrapper.bounds.right;
                });
                if (overlappingNodes.length > 0 && overlappingNodes[0].wrapper.bounds.intersects(middleRect_2)) {
                    var bounds = overlappingNodes[0].wrapper.bounds;
                    updatedPts[1].x = bounds.right + hSpacing;
                    updatedPts[2].x = bounds.right + hSpacing;
                }
            }
            else if ((isYesBranch && this.yesBranchDirection === 'LeftInFlow') ||
                (isNoBranch && ((this.yesBranchDirection === 'SameAsFlow' &&
                    (this.noBranchDirection === 'SameAsFlow' || this.noBranchDirection === 'LeftInFlow')) ||
                    (this.yesBranchDirection === 'RightInFlow' &&
                        (this.noBranchDirection === 'LeftInFlow' || this.noBranchDirection === 'RightInFlow'))))) {
                var spoint1 = sourcenode.wrapper.bounds.left;
                var spoint2 = sourcenode.offsetY;
                var tpoint1 = targetnode.wrapper.bounds.topCenter.x;
                var tpoint2 = targetnode.wrapper.bounds.topCenter.y;
                updatedPts.push({ x: spoint1, y: spoint2 });
                updatedPts.push({ x: spoint1 - hSpacing, y: spoint2 });
                updatedPts.push({ x: spoint1 - hSpacing, y: tpoint2 - vSpacing });
                updatedPts.push({ x: tpoint1, y: tpoint2 - vSpacing });
                updatedPts.push({ x: tpoint1, y: tpoint2 });
                var middleRect_3 = Rect.toBounds([updatedPts[1], updatedPts[2]]);
                var overlappingNodes = this.diagram.nodes.filter(function (e) {
                    return e.wrapper.bounds.intersects(middleRect_3);
                });
                overlappingNodes = overlappingNodes.sort(function (a, b) {
                    return b.wrapper.bounds.left - a.wrapper.bounds.left;
                });
                if (overlappingNodes.length > 0 && overlappingNodes[0].wrapper.bounds.intersects(middleRect_3)) {
                    var bounds = overlappingNodes[0].wrapper.bounds;
                    updatedPts[1].x = bounds.left - hSpacing;
                    updatedPts[2].x = bounds.left - hSpacing;
                }
            }
            else if ((sourcenode.offsetX !== targetnode.offsetX) &&
                ((isYesBranch && this.yesBranchDirection === 'SameAsFlow') ||
                    (isNoBranch &&
                        this.noBranchDirection === 'SameAsFlow' &&
                        this.yesBranchDirection !== 'SameAsFlow'))) {
                var spoint1 = sourcenode.offsetX;
                var spoint2 = sourcenode.wrapper.bounds.bottom;
                var tpoint1 = targetnode.wrapper.bounds.topCenter.x;
                var tpoint2 = targetnode.wrapper.bounds.topCenter.y;
                updatedPts.push({ x: spoint1, y: spoint2 });
                updatedPts.push({ x: spoint1, y: tpoint2 - vSpacing });
                updatedPts.push({ x: tpoint1, y: tpoint2 - vSpacing });
                updatedPts.push({ x: tpoint1, y: tpoint2 });
            }
            else {
                updatedPts = pts;
            }
        }
        else {
            updatedPts = pts;
        }
        return updatedPts;
    };
    FlowchartLayout.prototype.getModelBounds = function (nodes) {
        var rect = new Rect(0, 0, 0, 0);
        nodes = Array.from(nodes);
        nodes.forEach(function (vertex) {
            var geo = vertex.geometry;
            rect.uniteRect(geo);
        });
        return rect;
    };
    FlowchartLayout.prototype.createVertex = function (node) {
        var _this = this;
        var nodeWidth = isNaN(node.width) ? node.wrapper.bounds.width : node.width;
        var nodeHeight = isNaN(node.height) ? node.wrapper.bounds.height : node.height;
        var geometry = new Rect(0, 0, nodeWidth, nodeHeight);
        var inEdges = [];
        var outEdges = [];
        var branches = { isYesBranch: false, isNoBranch: false };
        if (node.inEdges != null) {
            for (var _i = 0, _a = node.inEdges; _i < _a.length; _i++) {
                var edge = _a[_i];
                var con = this.diagram.nameTable["" + edge];
                if (con) {
                    inEdges.push(con);
                }
            }
        }
        if (node.outEdges != null) {
            for (var _b = 0, _c = node.outEdges; _b < _c.length; _b++) {
                var edge = _c[_b];
                var con = this.diagram.nameTable["" + edge];
                if (con) {
                    outEdges.push(con);
                }
            }
        }
        var isYesBranch = branches.isYesBranch;
        var isNoBranch = branches.isNoBranch;
        if (inEdges != null) {
            inEdges.forEach(function (inEdge) {
                branches = _this.checkForYesOrNoBranch(inEdge, isYesBranch, isNoBranch);
            });
        }
        if (outEdges != null) {
            outEdges.forEach(function (outEdge) {
                _this.edgesMapper.set(outEdge, []);
                _this.loopedgesMapper.set(outEdge, false);
            });
        }
        var vert = {
            id: node.id,
            geometry: geometry,
            inEdges: inEdges,
            layoutObjectId: {},
            outEdges: outEdges,
            item: node,
            isDecisionNode: false,
            isYesChild: branches.isYesBranch,
            isNoChild: branches.isNoBranch
        };
        return vert;
    };
    FlowchartLayout.prototype.updatePoints = function (pts, internalConnector) {
        var pointSets = [];
        var segCollection = [];
        for (var i = 0; i < pts.length; i++) {
            if (pts[i + 2]) {
                pointSets.push(pts[parseInt(i.toString(), 10)]);
                pointSets.push(pts[i + 1]);
                var seg = {
                    type: 'Orthogonal',
                    points: pointSets,
                    length: pointSets[0].x === pointSets[1].x ? Math.abs(pointSets[0].y - pointSets[1].y)
                        : Math.abs(pointSets[0].x - pointSets[1].x),
                    direction: pointSets[0].x === pointSets[1].x ? pointSets[0].y > pointSets[1].y ? 'Top' : 'Bottom'
                        : pointSets[0].x > pointSets[1].x ? 'Left' : 'Right',
                    isOrthoInternalSegment: true
                };
                pointSets = [];
                segCollection.push(seg);
            }
        }
        internalConnector.segments = segCollection;
    };
    FlowchartLayout.prototype.contains = function (point, bounds) {
        return (point.x >= bounds.left && point.x <= bounds.right && point.y >= bounds.top && point.y <= bounds.bottom);
    };
    FlowchartLayout.prototype.updateLoopConnector = function (internalConnector) {
        var loopPts = [];
        if (this.edgesMapper.has(internalConnector)) {
            var loopPoints = this.edgesMapper.get(internalConnector);
            if (loopPoints) {
                for (var _i = 0, loopPoints_1 = loopPoints; _i < loopPoints_1.length; _i++) {
                    var loopPt = loopPoints_1[_i];
                    var pointX = loopPt.x + this.anchorX;
                    var pointY = loopPt.y + this.anchorY;
                    loopPts.push({ x: pointX, y: pointY });
                }
            }
        }
        loopPts.reverse();
        var pts = [];
        var firstPt = loopPts[0];
        var lastPt = loopPts[loopPts.length - 1];
        var sourceNode = this.diagram.nameTable[internalConnector.sourceID];
        var targetNode = this.diagram.nameTable[internalConnector.targetID];
        var srcBounds = sourceNode.wrapper.bounds;
        var tarBounds = targetNode.wrapper.bounds;
        var srcNode = sourceNode;
        var tarNode = targetNode;
        var decisionNode = this.vertexMapper.get(internalConnector.sourceID).isDecisionNode;
        var isYesBranch = this.isYesBranchConnector(internalConnector);
        var isNoBranch = this.isNoBranchConnector(internalConnector);
        var isYesBranchLeft = isYesBranch && this.yesBranchDirection === 'LeftInFlow';
        var isNoBranchRight = isNoBranch && ((this.yesBranchDirection === 'RightInFlow' &&
            (this.noBranchDirection === 'RightInFlow' || this.noBranchDirection === 'SameAsFlow')) ||
            (this.noBranchDirection === 'LeftInFlow' &&
                (this.yesBranchDirection === 'RightInFlow' || this.yesBranchDirection === 'SameAsFlow')));
        var hSpacing = this.horizontalSpacing / 2;
        var vSpacing = this.verticalSpacing / 2;
        var combinedBounds = new Rect().uniteRect(srcNode.wrapper.bounds).uniteRect(tarNode.wrapper.bounds);
        var overlappingNodesInDiagram = this.diagram.nodes.filter(function (node) {
            return node.id !== tarNode.id && node.id !== srcNode.id && node.wrapper.bounds.intersects(combinedBounds);
        });
        if (this.orientation === 'TopToBottom') {
            var source = Array.from(this.vertexMapper.values())
                .filter(function (e) {
                return e.item.wrapper.bounds.containsPoint({ x: e.item.wrapper.bounds.x, y: srcNode.offsetY }) &&
                    srcNode.id !== e.item.id;
            });
            var target = Array.from(this.vertexMapper.values())
                .filter(function (e) {
                return e.item.wrapper.bounds.containsPoint({ x: e.item.wrapper.bounds.x, y: tarNode.offsetY }) &&
                    tarNode.id !== e.item.id;
            });
            var max = Math.max.apply(Math, loopPts.map(function (pt) { return pt.x; }));
            var isSiblingsInRight = false;
            if (decisionNode) {
                if (isYesBranchLeft || isNoBranchRight) {
                    isSiblingsInRight = true;
                }
            }
            else {
                isSiblingsInRight = (source.length > 0 && source[0].item.wrapper.bounds.x > srcBounds.x);
            }
            if (target.length === 0 || (!isSiblingsInRight && target.length > 0 && target.filter(function (e) {
                return e.item.wrapper.bounds.right < tarBounds.left;
            }).length > 0)) {
                // Determine X coordinates based on conditions
                var initialX = (!isSiblingsInRight && max > srcBounds.right) ? srcBounds.right : srcBounds.left;
                var midX = initialX + (isSiblingsInRight ? -hSpacing : hSpacing);
                var targetX = (!isSiblingsInRight && max > tarBounds.right) ? tarBounds.right : tarBounds.left;
                // Add points to the collection
                pts.push({ x: initialX, y: srcNode.offsetY });
                pts.push({ x: midX, y: srcNode.offsetY });
                pts.push({ x: midX, y: tarNode.offsetY });
                pts.push({ x: targetX, y: tarNode.offsetY });
            }
            else {
                var targetBottom = target[0].item.wrapper.bounds.bottom;
                var verticalMiddle = targetBottom + vSpacing;
                var startX = !isSiblingsInRight ? srcBounds.right : srcBounds.left;
                var middleX = startX + (isSiblingsInRight ? -hSpacing : hSpacing);
                var endX = !isSiblingsInRight && max > tarBounds.right ? tarBounds.right + hSpacing : tarBounds.left - hSpacing;
                var finalX = !isSiblingsInRight && max > tarBounds.right ? tarBounds.right : tarBounds.left;
                pts.push({ x: startX, y: srcNode.offsetY });
                pts.push({ x: middleX, y: srcNode.offsetY });
                pts.push({ x: middleX, y: verticalMiddle });
                pts.push({ x: endX, y: verticalMiddle });
                pts.push({ x: endX, y: tarNode.offsetY });
                pts.push({ x: finalX, y: tarNode.offsetY });
            }
            if (overlappingNodesInDiagram.length > 0) {
                var boundsValue = isSiblingsInRight
                    ? Math.min.apply(Math, overlappingNodesInDiagram.map(function (node) { return node.wrapper.bounds.left; })) : Math.max.apply(Math, overlappingNodesInDiagram.map(function (node) { return node.wrapper.bounds.right; }));
                if ((isSiblingsInRight && boundsValue < pts[1].x) || (!isSiblingsInRight && boundsValue > pts[1].x)) {
                    var newX = boundsValue + (isSiblingsInRight ? -hSpacing : hSpacing);
                    pts[1].x = newX;
                    pts[2].x = newX;
                }
            }
        }
        else {
            var source = Array.from(this.vertexMapper.values())
                .filter(function (e) {
                return e.item.wrapper.bounds.containsPoint({ y: e.item.wrapper.bounds.y, x: srcNode.offsetX }) &&
                    srcNode.id !== e.item.id;
            });
            var target = Array.from(this.vertexMapper.values())
                .filter(function (e) {
                return e.item.wrapper.bounds.containsPoint({ y: e.item.wrapper.bounds.y, x: tarNode.offsetX }) &&
                    tarNode.id !== e.item.id;
            });
            var max = Math.max.apply(Math, loopPts.map(function (pt) { return pt.y; }));
            var isSiblingsInBottom = false;
            if (decisionNode) {
                if (isYesBranchLeft || isNoBranchRight) {
                    isSiblingsInBottom = true;
                }
            }
            else {
                isSiblingsInBottom = (source.length > 0 && source[0].item.wrapper.bounds.y > srcBounds.y);
            }
            if (target.length === 0 || (!isSiblingsInBottom && target.length > 0 && target.some(function (e) {
                return e.item.wrapper.bounds.bottom < tarBounds.top;
            }))) {
                pts.push({ x: srcNode.offsetX, y: (!isSiblingsInBottom && max > srcBounds.bottom) ? srcBounds.bottom : srcBounds.top });
                var midY = pts[0].y + (isSiblingsInBottom ? -vSpacing : vSpacing);
                pts.push({ x: srcNode.offsetX, y: midY });
                pts.push({ x: tarNode.offsetX, y: midY });
                pts.push({ x: tarNode.offsetX, y: (!isSiblingsInBottom && max > tarBounds.bottom) ? tarBounds.bottom : tarBounds.top });
            }
            else {
                var targetRight = target[0].item.wrapper.bounds.right + hSpacing;
                var midY = (!isSiblingsInBottom && max > tarBounds.bottom)
                    ? tarBounds.bottom + vSpacing : tarBounds.top - vSpacing;
                pts.push({ x: srcNode.offsetX, y: (!isSiblingsInBottom) ? srcBounds.bottom : srcBounds.top });
                pts.push({ x: srcNode.offsetX, y: pts[0].y + (isSiblingsInBottom ? -vSpacing : vSpacing) });
                pts.push({ x: targetRight, y: pts[1].y });
                pts.push({ x: targetRight, y: midY });
                pts.push({ x: tarNode.offsetX, y: midY });
                pts.push({ x: tarNode.offsetX, y: ((!isSiblingsInBottom && max > tarBounds.bottom) ? tarBounds.bottom : tarBounds.top) });
            }
            if (overlappingNodesInDiagram.length > 0) {
                var boundsValue = isSiblingsInBottom
                    ? Math.min.apply(Math, overlappingNodesInDiagram.map(function (e) { return e.wrapper.bounds.top; })) : Math.max.apply(Math, overlappingNodesInDiagram.map(function (e) { return e.wrapper.bounds.bottom; }));
                if ((isSiblingsInBottom && pts[1].y > boundsValue) || (!isSiblingsInBottom && pts[1].y < boundsValue)) {
                    var adjustment = isSiblingsInBottom ? -vSpacing : vSpacing;
                    pts[1].y = boundsValue + adjustment;
                    pts[2].y = boundsValue + adjustment;
                }
            }
        }
        this.updatePoints(pts, internalConnector);
    };
    FlowchartLayout.prototype.checkForYesOrNoBranch = function (edge, isYesBranch, isNoBranch) {
        var _this = this;
        if (edge.annotations && edge.annotations.length) {
            edge.annotations.forEach(function (annotation) {
                if (typeof annotation.content === 'string') {
                    var text_2 = annotation.content.toString();
                    _this.yesBranchValues.forEach(function (branchText) {
                        if (text_2.localeCompare(branchText, undefined, { sensitivity: 'accent' }) === 0) {
                            isYesBranch = true;
                            return;
                        }
                    });
                    _this.noBranchValues.forEach(function (branchText) {
                        if (text_2.localeCompare(branchText, undefined, { sensitivity: 'accent' }) === 0) {
                            isNoBranch = true;
                            return;
                        }
                    });
                }
            });
        }
        return { isYesBranch: isYesBranch, isNoBranch: isNoBranch };
    };
    FlowchartLayout.prototype.getTreeVertices = function (root, seenVertices, unseenVertices) {
        var _this = this;
        if (root != null && seenVertices.indexOf(root) === -1) {
            seenVertices.push(root);
            unseenVertices = unseenVertices.filter(function (vertex) { return vertex !== root; });
            var children = root.item.outEdges;
            if (children.length === 2) {
                var c1 = this.diagram.nameTable[this.diagram.nameTable[children[0]].targetID];
                var c2 = this.diagram.nameTable[this.diagram.nameTable[children[1]].targetID];
                var childVertex1 = this.vertexMapper.get(c1.id);
                var childVertex2 = this.vertexMapper.get(c2.id);
                if (childVertex1 && childVertex2) {
                    var hasYesChild = childVertex1.isYesChild || childVertex2.isYesChild;
                    var hasNoChild = childVertex1.isNoChild || childVertex2.isNoChild;
                    if (hasYesChild && !hasNoChild) {
                        if (childVertex1.isYesChild) {
                            childVertex2.isNoChild = true;
                        }
                        else {
                            childVertex1.isNoChild = true;
                        }
                        hasNoChild = true;
                    }
                    else if (!hasYesChild && hasNoChild) {
                        if (childVertex1.isNoChild) {
                            childVertex2.isYesChild = true;
                        }
                        else {
                            childVertex1.isYesChild = true;
                        }
                        hasYesChild = true;
                    }
                    root.isDecisionNode = hasYesChild;
                }
            }
            root.outEdges.forEach(function (outConnector) {
                var child = _this.diagram.nameTable[outConnector.targetID];
                var childVertex = _this.vertexMapper.get(child.id);
                if (childVertex != null) {
                    if (!root.isDecisionNode) {
                        childVertex.isYesChild = false;
                        childVertex.isNoChild = false;
                    }
                    _this.getTreeVertices(childVertex, seenVertices, unseenVertices);
                }
            });
        }
    };
    /**
     * Initializes the edges collection of the vertices\
     *
     * @returns {  IConnector[] }    Initializes the edges collection of the vertices\
     * @param {FlowChartVertex} node - provide the node value.
     * @private
     */
    FlowchartLayout.prototype.getEdges = function (node) {
        var edges = [];
        if (node !== null && node !== undefined) {
            for (var _i = 0, _a = node.inEdges; _i < _a.length; _i++) {
                var inEdge = _a[_i];
                edges.push(inEdge);
            }
            for (var _b = 0, _c = node.outEdges; _b < _c.length; _b++) {
                var outEdge = _c[_b];
                edges.push(outEdge);
            }
        }
        return edges;
    };
    /**
     * Returns the source/target vertex of the given connector \
     *
     * @returns {  FlowChartVertex }    Returns the source/target vertex of the given connector \
     * @param {IConnector} edge - provide the node value.
     * @param {boolean} source - provide the node value.
     * @private
     */
    FlowchartLayout.prototype.getVisibleTerminal = function (edge, source) {
        //differ from complex-hierarchical-tree.ts
        var nodeWrapper = source ? edge.sourceID : edge.targetID;
        return this.vertexMapper.get(nodeWrapper);
    };
    /**
     * used to get the edges between the given source and target  \
     *
     * @returns {  IConnector[] }    used to get the edges between the given source and target  .\
     * @param {FlowChartVertex} source - provide the angle value.
     * @param { FlowChartVertex} target - provide the angle value.
     * @param { boolean} directed - provide the angle value.
     * @private
     */
    FlowchartLayout.prototype.getEdgesBetween = function (source, target, directed) {
        var edges = this.getEdges(source);
        var result = [];
        for (var i = 0; i < edges.length; i++) {
            var src = this.getVisibleTerminal(edges[parseInt(i.toString(), 10)], true);
            var trg = this.getVisibleTerminal(edges[parseInt(i.toString(), 10)], false);
            if ((src.id === source.id && trg.id === target.id)) {
                result.push(edges[parseInt(i.toString(), 10)]);
            }
        }
        return result;
    };
    /**
     *To destroy the FlowchartLayout
     *
     * @returns {void} To destroy the FlowchartLayout
     */
    FlowchartLayout.prototype.destroy = function () {
        /**
         * Destroys the FlowchartLayout module
         */
    };
    /**
     * @returns { string } toBounds method .\
     * Get getModuleName name.
     */
    FlowchartLayout.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'FlowchartLayout';
    };
    return FlowchartLayout;
}());
export { FlowchartLayout };
