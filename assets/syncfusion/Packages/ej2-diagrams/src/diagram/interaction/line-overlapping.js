import { Connector } from '../objects/connector';
import { getOppositeDirection } from '../utility/connector';
// Class representing a line segment
var LineSegment = /** @class */ (function () {
    /**
     * Constructor to initialize a LineSegment.
     * @param {PointModel} start - The starting point of the line segment.
     * @param {PointModel} end - The ending point of the line segment.
     * @param {ILineSegment} [previousSegment] - The previous line segment in the sequence (optional).
     * @returns {ILineSegment} The newly created line segment.
     */
    function LineSegment(start, end, previousSegment) {
        this.startPoint = start;
        this.endPoint = end;
        this.previous = previousSegment;
        // Link the previous segment to this one, if it exists
        if (previousSegment) {
            previousSegment.next = this;
        }
        // Determine if the segment is vertical or horizontal
        var isVertical = start.x === end.x;
        this.coordinate = isVertical ? start.x : start.y;
        this.sortedStart = isVertical ? Math.min(start.y, end.y) : Math.min(start.x, end.x);
        this.sortedEnd = isVertical ? Math.max(start.y, end.y) : Math.max(start.x, end.x);
        this.direction = isVertical ? (start.y < end.y ? 'Bottom' : 'Top') : (start.x < end.x ? 'Right' : 'Left');
        // Create sweep events for the start and end of the segment
        this.startEvent = new SweepEvent(this, true);
        this.endEvent = new SweepEvent(this, false);
    }
    /**
     * Updates the coordinate of the line segment by a given delta.
     * @param {number} delta - The amount to adjust the coordinate by.
     * @returns {void}
     * @private
     */
    LineSegment.prototype.updateCoordinate = function (delta) {
        this.coordinate += delta;
        var isHorizontal = this.direction === 'Left' || this.direction === 'Right';
        // Calculate new start and end points based on the updated coordinate
        var newStartPoint = isHorizontal
            ? { x: this.startPoint.x, y: this.coordinate }
            : { x: this.coordinate, y: this.startPoint.y };
        var newEndPoint = isHorizontal
            ? { x: this.endPoint.x, y: this.coordinate }
            : { x: this.coordinate, y: this.endPoint.y };
        // Update the start point and adjust the previous segment if it exists
        this.startPoint = newStartPoint;
        if (this.previous) {
            this.previous.adjustEnd(newStartPoint);
        }
        // Update the end point and adjust the next segment if it exists
        this.endPoint = newEndPoint;
        if (this.next) {
            this.next.adjustStart(newEndPoint);
        }
    };
    /**
     * Adjusts the start point of the segment and updates sorted values.
     * @param {PointModel} point - The new start point.
     * @returns {void}
     */
    LineSegment.prototype.adjustStart = function (point) {
        this.startPoint = point;
        this.updateSortedValues();
    };
    /**
     * Adjusts the end point of the segment and updates sorted values.
     * @param {PointModel} point - The new end point.
     * @returns {void}
     */
    LineSegment.prototype.adjustEnd = function (point) {
        this.endPoint = point;
        this.updateSortedValues();
    };
    /**
     * Updates the sorted start and end values based on the current points.
     * @returns {void}
     */
    LineSegment.prototype.updateSortedValues = function () {
        var isVertical = this.direction === 'Top' || this.direction === 'Bottom';
        this.sortedStart = isVertical ? Math.min(this.startPoint.y, this.endPoint.y) : Math.min(this.startPoint.x, this.endPoint.x);
        this.sortedEnd = isVertical ? Math.max(this.startPoint.y, this.endPoint.y) : Math.max(this.startPoint.x, this.endPoint.x);
        // Refresh the start and end events to reflect the updated sorted values
        this.startEvent.refresh();
        this.endEvent.refresh();
    };
    return LineSegment;
}());
// Class representing an event in the sweep line algorithm
var SweepEvent = /** @class */ (function () {
    /**
     * Constructor to initialize a SweepEvent.
     * @param {ILineSegment} segment - The line segment associated with this event.
     * @param {boolean} isStart - Whether this event is the start of the segment.
     */
    function SweepEvent(segment, isStart) {
        this.segment = segment;
        this.isStart = isStart;
        // Set the value based on whether this is a start or end event
        this.value = isStart ? segment.sortedStart : segment.sortedEnd;
    }
    /**
     * Refreshes the value of the event based on the segment's current sorted values.
     * @returns {void}
     */
    SweepEvent.prototype.refresh = function () {
        // Update the value to reflect the current position of the segment
        this.value = this.isStart ? this.segment.sortedStart : this.segment.sortedEnd;
    };
    /**
     * Compares this event to another event for sorting purposes.
     * @param {SweepEvent} other - The other event to compare to.
     * @returns {number} -1 if this event is less than the other, 1 if greater, 0 if equal.
     */
    SweepEvent.prototype.compareTo = function (other) {
        // Compare based on the value of the events
        if (this.value !== other.value) {
            return this.value < other.value ? -1 : 1;
        }
        // If values are equal, prioritize start events over end events
        return this.isStart ? -1 : other.isStart ? 1 : 0;
    };
    return SweepEvent;
}());
// Class representing a segment tree used for efficient line segment intersection detection
var SegmentTree = /** @class */ (function () {
    function SegmentTree() {
        // Maps to store horizontal and vertical branches of segments
        this.horizontalBranches = new Map();
        this.verticalBranches = new Map();
    }
    /**
     * Adds a line segment to the segment tree.
     * @param {ILineSegment} segment - The line segment to add.
     * @returns {void}
     * @private
     */
    SegmentTree.prototype.addSegment = function (segment) {
        // Get the appropriate branches (horizontal or vertical) based on the segment's direction
        var branches = this.getBranches(segment.direction);
        this.addSegmentToBranch(branches, segment);
    };
    /**
     * Adds a line segment to the appropriate branch (horizontal or vertical).
     * @param {Map<number, Set<SweepEvent>>} branches - The map of branches to add the segment to.
     * @param {ILineSegment} segment - The line segment to add.
     * @returns {void}
     */
    SegmentTree.prototype.addSegmentToBranch = function (branches, segment) {
        // If the branch for the segment's coordinate does not exist, create it
        if (!branches.has(segment.coordinate)) {
            branches.set(segment.coordinate, new Set());
        }
        var branch = branches.get(segment.coordinate);
        if (branch) {
            // Add the start and end events of the segment to the branch
            branch.add(segment.startEvent);
            branch.add(segment.endEvent);
        }
    };
    /**
     * Removes a line segment from the segment tree.
     * @param {ILineSegment} segment - The line segment to remove.
     * @returns {void}
     * @private
     */
    SegmentTree.prototype.removeSegment = function (segment) {
        // Get the appropriate branches (horizontal or vertical) based on the segment's direction
        var branches = this.getBranches(segment.direction);
        this.removeSegmentFromBranch(branches, segment);
    };
    /**
     * Removes a line segment from the appropriate branch (horizontal or vertical).
     * @param {Map<number, Set<SweepEvent>>} branches - The map of branches to remove the segment from.
     * @param {ILineSegment} segment - The line segment to remove.
     * @returns {void}
     */
    SegmentTree.prototype.removeSegmentFromBranch = function (branches, segment) {
        var branch = branches.get(segment.coordinate);
        if (branch) {
            // Remove the start and end events of the segment from the branch
            branch.delete(segment.startEvent);
            branch.delete(segment.endEvent);
            // If the branch is empty after removal, delete the branch
            if (branch.size === 0) {
                branches.delete(segment.coordinate);
            }
        }
    };
    /**
     * Finds segments that overlap with the given segment.
     * @param {ILineSegment} segment - The line segment to check for overlaps.
     * @returns {ILineSegment[]} An array of overlapping line segments.
     * @private
     */
    SegmentTree.prototype.findOverlappingSegments = function (segment) {
        // Get the appropriate branches (horizontal or vertical) based on the segment's direction
        var branches = this.getBranches(segment.direction);
        return this.findOverlappingSegmentsInBranch(branches, segment);
    };
    /**
     * Finds overlapping segments within the appropriate branch.
     * @param {Map<number, Set<SweepEvent>>} branches - The map of branches to search for overlaps.
     * @param {ILineSegment} segment - The line segment to check for overlaps.
     * @returns {ILineSegment[]} An array of overlapping line segments.
     */
    SegmentTree.prototype.findOverlappingSegmentsInBranch = function (branches, segment) {
        var result = [];
        var seenSegments = new Set();
        var branch = branches.get(segment.coordinate);
        if (branch) {
            var branchArray_1 = [];
            branch.forEach(function (item) { return branchArray_1.push(item); });
            for (var i = 0; i < branchArray_1.length; i++) {
                var sweepEvent = branchArray_1[parseInt(i.toString(), 10)];
                // Check if the segment overlaps with the current sweep event
                if (!(sweepEvent.segment.sortedStart < segment.sortedStart && sweepEvent.segment.sortedEnd > segment.sortedEnd)) {
                    if (sweepEvent.value < segment.sortedStart || sweepEvent.value > segment.sortedEnd) {
                        continue;
                    }
                }
                // Add the overlapping segment to the result if it hasn't been seen before
                if (sweepEvent.segment !== segment && !seenSegments.has(sweepEvent.segment)) {
                    seenSegments.add(sweepEvent.segment);
                    var maxStart = Math.max(segment.sortedStart, sweepEvent.segment.sortedStart);
                    var minEnd = Math.min(segment.sortedEnd, sweepEvent.segment.sortedEnd);
                    if (maxStart < minEnd) {
                        result.push(sweepEvent.segment);
                    }
                }
            }
        }
        return result;
    };
    /**
     * Gets the branches (horizontal or vertical) based on the segment's direction.
     * @param {Direction} direction - The direction of the segment.
     * @returns {Map<number, Set<SweepEvent>>} The map of branches.
     */
    SegmentTree.prototype.getBranches = function (direction) {
        // Return horizontal branches for left/right direction, vertical branches for top/bottom direction
        return direction === 'Left' || direction === 'Right' ? this.horizontalBranches : this.verticalBranches;
    };
    return SegmentTree;
}());
// Class responsible for managing line segment overlaps and ensuring connectors do not visually overlap in a diagram.
var AvoidLineOverlapping = /** @class */ (function () {
    function AvoidLineOverlapping(parent) {
        this.requireReroute = false;
        this.reRoutedCount = 0;
        this.considerNonWalkable = [];
        this.diagram = parent;
        this.segmentTree = new SegmentTree();
        this.segmentMappings = new Map();
        this.connectorMappings = new Map();
        this.modifiedConnector = new Set();
        this.modifiedSegments = new Map();
        this.currentSegments = new Map();
    }
    ///**
    // * Processes all connectors in the diagram to resolve line overlapping issues.
    // * @returns {void}
    // * @private
    // */
    //public refreshLineOverlapping(): void {
    //    if (this.diagram && this.diagram.lineRoutingModule) {
    //        if (this.diagram.connectors.length > 0) {
    //            this.diagram.connectors.forEach((connector: Connector) => {
    //                if (connector.type === 'Orthogonal' && connector.visible) {
    //                    this.addConnector(connector);
    //                }
    //            });
    //            this.refreshModifiedConnectors(this.diagram);
    //        }
    //    }
    //}
    /**
     * Gets the set of connectors that have been modified.
     * @returns {Set<Connector>} A set of modified connectors.
     * @private
     */
    AvoidLineOverlapping.prototype.getModifiedConnector = function () {
        return this.modifiedConnector;
    };
    /**
     * Gets the modified segments of a given connector.
     * @param {Connector} connector - The connector to get the modified segments for.
     * @returns {OrthogonalSegmentModel[]} An array of orthogonal segment models representing the modified segments.
     * @private
     */
    AvoidLineOverlapping.prototype.getModifiedConnectorSegments = function (connector) {
        // Retrieve the segments associated with the given connector
        var segments = this.segmentMappings.get(connector);
        // Convert the segments to orthogonal segment models if they exist, otherwise return an empty array
        return this.convertSegmentsToOrthogonal(segments);
    };
    /**
     * Refreshes the modified connectors in the diagram.
     * @param {Diagram} diagram - The diagram instance containing the connectors.
     * @returns {void}
     * @private
     */
    AvoidLineOverlapping.prototype.refreshModifiedConnectors = function (diagram) {
        var _this = this;
        // Iterate over each modified connector
        this.modifiedConnector.forEach(function (modifiedConnector) {
            // Get the segments of the modified connector
            var segments = _this.getModifiedConnectorSegments(modifiedConnector);
            if (segments.length) {
                // Add the modified segments to the connector
                modifiedConnector.segments = segments;
                // Update the connector properties in the diagram
                diagram.connectorPropertyChange(modifiedConnector, {}, { type: 'Orthogonal', segments: segments });
            }
        });
        // Clear the modified connectors
        this.modifiedConnector.clear();
    };
    /**
     * Removes connectors and its associated segments from the internal mappings and segment tree.
     * @param {any} connectors - The connectors to remove.
     * @returns {void}
     * @private
     */
    AvoidLineOverlapping.prototype.removeConnectors = function (connectors) {
        for (var i = 0; i < connectors.length; i++) {
            var obj = connectors[parseInt(i.toString(), 10)];
            var connector = void 0;
            if (typeof obj === 'string') {
                connector = this.diagram.nameTable[obj];
            }
            else if (obj instanceof Connector) {
                connector = obj;
            }
            if (connector && connector.type === 'Orthogonal') {
                this.removeConnector(connector);
            }
        }
    };
    /**
     * Removes a connector and its associated segments from the internal mappings and segment tree.
     * @param {Connector} connector - The connector to remove.
     * @returns {void}
     * @private
     */
    AvoidLineOverlapping.prototype.removeConnector = function (connector) {
        var _this = this;
        // Retrieve the line segments associated with the connector
        var segments = this.segmentMappings.get(connector);
        if (segments) {
            // Remove each line segment from the segment tree and delete its mapping
            segments.forEach(function (segment) {
                _this.segmentTree.removeSegment(segment);
                _this.connectorMappings.delete(segment);
            });
        }
        // Remove the mapping between the connector and its segments
        this.segmentMappings.delete(connector);
    };
    /**
     * Adds a connector and processes it to remove overlapping lines in its segments.
     * @param {Connector} connector - The connector to process.
     * @param {PointModel[]} points - The points to adjust (optional).
     * @param {OrthogonalSegmentModel[]} segments - The segments to adjust (optional).
     * @returns {void} The adjusted segments.
     * @private
     */
    AvoidLineOverlapping.prototype.addConnector = function (connector, points, segments) {
        var _this = this;
        if (points === void 0) { points = []; }
        if (segments === void 0) { segments = []; }
        if (this.diagram.lineDistributionModule) {
            return;
        }
        // Generate points based on the provided segments or use the connector's intermediate points
        // Needed in case of without using line routing
        // if (!points.length) {
        //     points = segments.length ? this.generatePoints(connector, segments) : connector.intermediatePoints;
        // }
        if (points.length === 0) {
            points = connector.intermediatePoints;
        }
        // Remove the connector from the current mappings
        this.removeConnector(connector);
        // Create line segments from the points
        var lineSegments = this.createLineSegments(points);
        // Map the segments to the connector
        this.mapSegmentsToConnector(connector, lineSegments);
        // If there are more than 3 points, process the connector to remove overlapping
        if (points.length > 3) {
            // Adjust the connector to resolve overlaps in the segments
            this.adjustConnector(connector);
        }
        else {
            var overlappingConnectors = new Set();
            for (var _i = 0, lineSegments_1 = lineSegments; _i < lineSegments_1.length; _i++) {
                var lineSegment = lineSegments_1[_i];
                // Find overlapping segments of current connector
                var overlappingsegments = this.segmentTree.findOverlappingSegments(lineSegment);
                for (var _a = 0, overlappingsegments_1 = overlappingsegments; _a < overlappingsegments_1.length; _a++) {
                    var overlappingSegment = overlappingsegments_1[_a];
                    // Fetch overlapping connector
                    var overlappingConnector = this.connectorMappings.get(overlappingSegment);
                    // Add overlapping connector to the set
                    overlappingConnectors.add(overlappingConnector);
                }
            }
            // Adjust the overlapping connector to resolve overlaps in the segments
            overlappingConnectors.forEach(function (overlappingConnector) { return _this.adjustConnector(overlappingConnector); });
        }
    };
    // Needed in case of without using line routing
    // /**
    //  * Generates points based on the connector and segments.
    //  * @param {Connector} connector - The connector to process.
    //  * @param {OrthogonalSegmentModel[]} segments - The segments to adjust.
    //  * @returns {PointModel[]} An array of points representing the connector's path.
    //  */
    // private generatePoints(connector: Connector, segments: OrthogonalSegmentModel[]): PointModel[] {
    //     const points: PointModel[] = [];
    //     let currentPoint: PointModel = connector.sourcePoint;
    //     points.push(currentPoint);
    //     // Iterate through each segment to generate the corresponding points
    //     segments.forEach((segment: OrthogonalSegmentModel) => {
    //         const newPoint: PointModel = { x: currentPoint.x, y: currentPoint.y };
    //         switch (segment.direction) {
    //         case 'Left':
    //             newPoint.x -= segment.length;
    //             break;
    //         case 'Right':
    //             newPoint.x += segment.length;
    //             break;
    //         case 'Top':
    //             newPoint.y -= segment.length;
    //             break;
    //         case 'Bottom':
    //             newPoint.y += segment.length;
    //             break;
    //         }
    //         points.push(newPoint);
    //         currentPoint = newPoint;
    //     });
    //     return points;
    // }
    /**
     * Creates line segments from the given points.
     * @param {PointModel[]} points - The points to create segments from.
     * @returns {ILineSegment[]} An array of line segments.
     */
    AvoidLineOverlapping.prototype.createLineSegments = function (points) {
        var lineSegments = [];
        // Iterate through the points to create line segments
        for (var i = 0; i < points.length - 1; i++) {
            // Create a new line segment from the current point to the next point
            var segment = new LineSegment(points[parseInt(i.toString(), 10)], points[parseInt((i + 1).toString(), 10)], i === 0 ? null : lineSegments[parseInt((i - 1).toString(), 10)]);
            lineSegments.push(segment);
        }
        return lineSegments;
    };
    /**
     * Maps line segments to the given connector.
     * @param {Connector} connector - The connector to map segments to.
     * @param {ILineSegment[]} lineSegments - The line segments to map.
     * @returns {void}
     */
    AvoidLineOverlapping.prototype.mapSegmentsToConnector = function (connector, lineSegments) {
        var _this = this;
        // Store the mapping of segments to the connector
        this.segmentMappings.set(connector, lineSegments);
        // Add each segment to the segment tree and update connector mappings
        lineSegments.forEach(function (lineSegment) {
            _this.segmentTree.addSegment(lineSegment);
            if (!_this.connectorMappings.has(lineSegment)) {
                _this.connectorMappings.set(lineSegment, connector);
            }
        });
    };
    /**
     * Converts line segments to orthogonal segments.
     * @param {ILineSegment[]} lineSegments - The line segments to convert.
     * @returns {OrthogonalSegmentModel[]} An array of orthogonal segments.
     */
    AvoidLineOverlapping.prototype.convertSegmentsToOrthogonal = function (lineSegments) {
        var modifiedSegments = [];
        if (lineSegments) {
            // Iterate through each line segment to create corresponding orthogonal segments
            lineSegments.forEach(function (lineSegment) {
                var orthogonalSegment = {
                    type: 'Orthogonal',
                    direction: lineSegment.direction,
                    length: Math.abs(lineSegment.sortedEnd - lineSegment.sortedStart)
                };
                modifiedSegments.push(orthogonalSegment);
            });
        }
        return modifiedSegments;
    };
    /**
     * Adjusts the connector to resolve overlapping segments.
     * @param {Connector} connector - The connector to adjust.
     * @returns {void}
     */
    AvoidLineOverlapping.prototype.adjustConnector = function (connector) {
        var _this = this;
        this.requireReroute = false;
        // Retrieve the line segments associated with the connector
        var segments = this.segmentMappings.get(connector);
        if (segments.length > 2) {
            var firstSegment = segments[0];
            var sourceNode = this.diagram.nameTable[connector.sourceID];
            if (sourceNode && sourceNode.outEdges.length > 0) {
                var refLineSegment = void 0;
                for (var j = 0; j < sourceNode.outEdges.length; j++) {
                    var outConnector = this.diagram.nameTable[sourceNode.outEdges[parseInt(j.toString(), 10)]];
                    if (outConnector === connector) {
                        continue;
                    }
                    var refSegments = this.segmentMappings.get(outConnector);
                    if (refSegments && refSegments.length > 2) {
                        var refFirstSegment = refSegments[0];
                        if (refFirstSegment.direction === firstSegment.direction &&
                            refFirstSegment.next.direction === firstSegment.next.direction) {
                            if (!refLineSegment) {
                                refLineSegment = refFirstSegment;
                            }
                            else if (Math.abs(firstSegment.coordinate - refFirstSegment.coordinate) <
                                Math.abs(firstSegment.coordinate - refLineSegment.coordinate)) {
                                refLineSegment = refFirstSegment;
                            }
                        }
                    }
                }
                if (refLineSegment) {
                    var shiftDelta = refLineSegment.next.coordinate - firstSegment.next.coordinate;
                    if (shiftDelta) {
                        var superNext = firstSegment.next.next;
                        var canShift = firstSegment.direction !== superNext.direction;
                        if (firstSegment.direction === superNext.direction) {
                            var maximumShift = this.calculateMaximumSegmentShift(firstSegment, superNext, superNext.direction);
                            canShift = Math.abs(shiftDelta) <= maximumShift;
                        }
                        if (canShift) {
                            this.modifiedSegments.clear();
                            this.segmentTree.removeSegment(firstSegment.next);
                            firstSegment.next.updateCoordinate(shiftDelta);
                            this.segmentTree.addSegment(firstSegment.next);
                            this.modifiedSegments.set(firstSegment.next, firstSegment.next.coordinate);
                            this.modifiedConnector.add(connector);
                        }
                    }
                }
            }
        }
        var failedSegment = undefined;
        // Iterate through each segment to check for overlaps
        for (var i = 0; i < segments.length - 1; i++) {
            var segment = segments[parseInt(i.toString(), 10)];
            if (segment.previous && segment.next) {
                // Find overlapping segments for this segment
                var overlappingSegments = this.segmentTree.findOverlappingSegments(segment);
                if (overlappingSegments.length > 0) {
                    // Resolve any overlapping segments found
                    if (!this.resolveOverlappingSegments(segment, overlappingSegments)) {
                        if (this.requireReroute) {
                            failedSegment = segment;
                            break;
                        }
                    }
                }
            }
        }
        // If a failed segment is found and rerouting is required, attempt to reroute the connector
        if (failedSegment && this.diagram.lineRoutingModule) {
            if (this.reRoutedCount <= AvoidLineOverlapping.maxReRouteLimit) {
                // Reset the walkable state of previously considered non-walkable grids
                while (this.considerNonWalkable.length > 0) {
                    var grid = this.considerNonWalkable.pop();
                    grid.walkable = true;
                }
                // Fetch the grids that intersect with the segment path
                var grids = this.diagram.lineRoutingModule
                    .getGridsIntersect(failedSegment.startPoint, failedSegment.endPoint);
                // Mark the grids in the segment path as non-walkable temporarily
                grids.forEach(function (grid) {
                    grid.walkable = false;
                    _this.considerNonWalkable.push(grid);
                });
                this.reRoutedCount++;
                // Refresh the connector segments to attempt rerouting
                this.diagram.lineRoutingModule.refreshConnectorSegments(this.diagram, connector, false);
            }
        }
        // Reset the rerouted count and restore the walkable state of grids
        this.reRoutedCount = 0;
        while (this.considerNonWalkable.length > 0) {
            var grid = this.considerNonWalkable.pop();
            grid.walkable = true;
        }
    };
    /**
     * Resolves overlapping segments by adjusting their positions.
     * @param {ILineSegment} segment - The segment to adjust.
     * @param {ILineSegment[]} overlappingSegments - The overlapping segments to resolve.
     * @returns {boolean} whether the shifted segments get resolved with overlapping segment in finding a free coordinate
     */
    AvoidLineOverlapping.prototype.resolveOverlappingSegments = function (segment, overlappingSegments) {
        // Clear maps to track modified and current segments
        this.modifiedSegments.clear();
        this.currentSegments.clear();
        this.rootShiftingSegment = segment;
        var adjustSelfFirst = this.shouldAdjustSelfFirst(segment, overlappingSegments);
        // Get the first overlapping segment
        var overlapSegment = overlappingSegments[0];
        // Calculate the direction to shift the segment
        var shiftDirection = adjustSelfFirst
            ? this.calculateShiftDirection(segment, overlappingSegments)
            : this.calculateShiftDirection(overlapSegment, this.segmentTree.findOverlappingSegments(overlapSegment));
        var shifted = false;
        if (adjustSelfFirst) {
            var secondarySegment = overlappingSegments.length === 1 ? overlapSegment : undefined;
            // Adjust the segment in calculated direction
            shifted = this.attemptAdjustment(segment, shiftDirection, secondarySegment);
            if (!shifted) {
                // Adjust the segment in the opposite direction
                shiftDirection = getOppositeDirection(shiftDirection);
                shifted = this.attemptAdjustment(segment, shiftDirection, secondarySegment, true);
            }
        }
        else {
            // Adjust the segment in calculated direction
            shifted = this.attemptAdjustment(overlapSegment, shiftDirection, segment);
            if (!shifted) {
                // Adjust the segment in the opposite direction
                shiftDirection = getOppositeDirection(shiftDirection);
                shifted = this.attemptAdjustment(overlapSegment, shiftDirection, segment, true);
            }
        }
        // Update the segment tree with the modified segments
        this.updateSegmentTreeWithModifiedSegments();
        this.rootShiftingSegment = undefined;
        return shifted;
    };
    /**
     * Determines whether the current segment should be adjusted before its overlapping segment.
     * @param {ILineSegment } segment - The current segment.
     * @param {ILineSegment[]} overlappingSegments - The list of overlapping segments.
     * @returns {boolean} True if the current segment should be adjusted first, otherwise false.
     */
    AvoidLineOverlapping.prototype.shouldAdjustSelfFirst = function (segment, overlappingSegments) {
        var adjustSelfFirst = overlappingSegments.length > 1;
        // Determine if the current segment should be adjusted first
        if (overlappingSegments.length === 1) {
            // Get the first overlapping segment
            var overlapSegment = overlappingSegments[0];
            if (overlapSegment.previous && overlapSegment.next) {
                var maxStart = Math.max(segment.sortedStart, overlapSegment.sortedStart);
                var minEnd = Math.min(segment.sortedEnd, overlapSegment.sortedEnd);
                var currentRatio = (minEnd - maxStart) / (segment.sortedEnd - segment.sortedStart);
                var overlapRatio = (minEnd - maxStart) / (overlapSegment.sortedEnd - overlapSegment.sortedStart);
                if (currentRatio >= overlapRatio) {
                    adjustSelfFirst = true;
                }
            }
            else {
                adjustSelfFirst = true;
            }
        }
        return adjustSelfFirst;
    };
    /**
     * Attempts to adjust the primary segment and optionally a secondary segment to resolve overlaps.
     * @param {ILineSegment} primarySegment - The primary line segment to adjust.
     * @param {Direction} shiftDirection - The direction to shift the primary segment.
     * @param {ILineSegment} secondarySegment - The secondary line segment to adjust in the opposite direction (optional).
     * @param {boolean} isOppositeShifting - Enabled when shifting segment in opposite direction.
     * @returns {boolean} True if any segment was adjusted, otherwise false.
     */
    AvoidLineOverlapping.prototype.attemptAdjustment = function (primarySegment, shiftDirection, secondarySegment, isOppositeShifting) {
        if (isOppositeShifting === void 0) { isOppositeShifting = false; }
        // Adjust the primary segment first in shift direction
        var isShifted = this.adjustSegment(primarySegment, shiftDirection, isOppositeShifting);
        this.updateModifiedSegments(isShifted);
        if (!isShifted) {
            if (secondarySegment && secondarySegment.previous && secondarySegment.next) {
                // Adjust the secondary segment in the opposite direction
                shiftDirection = getOppositeDirection(shiftDirection);
                isShifted = this.adjustSegment(secondarySegment, shiftDirection, isOppositeShifting);
                this.updateModifiedSegments(isShifted);
            }
        }
        return isShifted;
    };
    ///**
    // * Gets dependent segments based on a reference segment and a map of segments.
    // * @param {ILineSegment} segment - The reference segment.
    // * @param {Map<ILineSegment, number>} segmentMap - The map of segments.
    // * @returns {ILineSegment[]} An array of dependent segments.
    // */
    //private getDependentSegments(segment: ILineSegment, segmentMap: Map<ILineSegment, number>): ILineSegment[] {
    //    const dependentSegments: ILineSegment[] = [];
    //    segmentMap.forEach((newCoordinate: number, dependentSegment: ILineSegment) => {
    //        if (dependentSegment !== segment) { dependentSegments.push(dependentSegment); }
    //    });
    //    return dependentSegments;
    //}
    /**
     * Updates the modified segments by adjusting their coordinates and re-adding them to the segment tree.
     * @param {boolean} resetModifiedSegments - Indicates if the segments have been shifted.
     * @returns {void}
     */
    AvoidLineOverlapping.prototype.updateModifiedSegments = function (resetModifiedSegments) {
        var _this = this;
        if (resetModifiedSegments) {
            this.modifiedSegments.clear();
        }
        // Update each current segment's coordinate and re-add it to the segment tree
        this.currentSegments.forEach(function (oldCoordinate, currentSegment) {
            if (resetModifiedSegments) {
                _this.modifiedSegments.set(currentSegment, currentSegment.coordinate);
            }
            _this.segmentTree.removeSegment(currentSegment);
            currentSegment.updateCoordinate(oldCoordinate - currentSegment.coordinate);
            _this.segmentTree.addSegment(currentSegment);
        });
        // Clear the current segments
        this.currentSegments.clear();
    };
    /**
     * Updates the segment tree with the modified segments.
     * Removes the old segments and adds the new segments with their updated positions.
     * @returns {void}
     */
    AvoidLineOverlapping.prototype.updateSegmentTreeWithModifiedSegments = function () {
        var _this = this;
        if (this.modifiedSegments.size > 0) {
            this.modifiedSegments.forEach(function (newCoordinate, modifiedSegment) {
                // Update the segment tree with shifted segments
                _this.segmentTree.removeSegment(modifiedSegment);
                modifiedSegment.updateCoordinate(newCoordinate - modifiedSegment.coordinate);
                _this.segmentTree.addSegment(modifiedSegment);
                // Add the connector to the set of modified connectors
                var connector = _this.connectorMappings.get(modifiedSegment);
                if (!_this.modifiedConnector.has(connector)) {
                    _this.modifiedConnector.add(connector);
                }
            });
        }
    };
    /**
     * Resolves overlapping segments in a given direction.
     * @param {ILineSegment} segment - The line segment to resolve overlaps for.
     * @param {ILineSegment[]} overlappingSegments - The list of overlapping segments.
     * @param {Direction} shiftDirection - The direction to shift the segment.
     * @param {boolean} isOppositeShifting - Enabled when tried to shift secondary segment in opposite direction
     * @param {boolean} adjustOverlapsOnly - Enabled only when overlapping segments need to be adjusted.
     * @returns {boolean} True if the segment was adjusted, otherwise false.
     */
    AvoidLineOverlapping.prototype.resolveOverlappingAtGivenDirection = function (segment, overlappingSegments, shiftDirection, isOppositeShifting, adjustOverlapsOnly) {
        if (adjustOverlapsOnly) {
            var isShifted = false;
            for (var _i = 0, overlappingSegments_1 = overlappingSegments; _i < overlappingSegments_1.length; _i++) {
                var overlapSegment = overlappingSegments_1[_i];
                if (overlapSegment.previous && overlapSegment.next) {
                    isShifted = this.adjustSegment(overlapSegment, shiftDirection, isOppositeShifting, adjustOverlapsOnly);
                    if (!isShifted) {
                        return false;
                    }
                }
            }
            return isShifted;
        }
        var segmentToShift = segment;
        if (overlappingSegments.length === 1) {
            var adjustSelfFirst = this.shouldAdjustSelfFirst(segment, overlappingSegments);
            var overlapSegment = overlappingSegments[0];
            var directionToShift = adjustSelfFirst
                ? this.calculateShiftDirection(segment, overlappingSegments)
                : this.calculateShiftDirection(overlapSegment, this.segmentTree.findOverlappingSegments(overlapSegment));
            if (isOppositeShifting) {
                directionToShift = getOppositeDirection(directionToShift);
            }
            if (adjustSelfFirst) {
                segmentToShift = directionToShift === shiftDirection ? segment : overlapSegment;
            }
            else {
                segmentToShift = directionToShift === shiftDirection ? overlapSegment : segment;
            }
            if (segmentToShift === overlapSegment && (!overlapSegment.previous || !overlapSegment.next)) {
                segmentToShift = segment;
            }
        }
        // Adjust the segment or the overlapping segment based on the direction
        return this.adjustSegment(segmentToShift, shiftDirection, isOppositeShifting);
    };
    /**
     * Calculates the direction to shift a line segment to resolve overlaps.
     * @param {ILineSegment} lineSegment - The line segment to calculate the shift direction for.
     * @param {ILineSegment[]} overlappingSegments - The list of overlapping segments.
     * @returns {Direction} The direction to shift the segment.
     */
    AvoidLineOverlapping.prototype.calculateShiftDirection = function (lineSegment, overlappingSegments) {
        var overlapSegment = overlappingSegments[0];
        var segment = lineSegment;
        var previousSegment = segment.previous;
        var nextSegment = segment.next;
        var nonSortedStart = segment.direction === 'Left' || segment.direction === 'Right' ? segment.startPoint.x : segment.startPoint.y;
        var nonSortedEnd = segment.direction === 'Left' || segment.direction === 'Right' ? segment.endPoint.x : segment.endPoint.y;
        var shiftDirection = segment.direction;
        // Determine the shift direction based on the previous and next segments
        if (previousSegment.direction === nextSegment.direction) {
            var overlapsPrevious = overlapSegment.previous;
            var overlapsNext = overlapSegment.next;
            var isStartCovered = overlapSegment.sortedStart <= nonSortedStart && nonSortedStart <= overlapSegment.sortedEnd;
            var isEndCovered = overlapSegment.sortedStart <= nonSortedEnd && nonSortedEnd <= overlapSegment.sortedEnd;
            // Determine if the start or end of the segment is covered by the overlap
            if (isStartCovered && isEndCovered) {
                var nonSortedStart1 = overlapSegment.direction === 'Left' || overlapSegment.direction === 'Right' ? overlapSegment.startPoint.x : overlapSegment.startPoint.y;
                var nonSortedEnd1 = overlapSegment.direction === 'Left' || overlapSegment.direction === 'Right' ? overlapSegment.endPoint.x : overlapSegment.endPoint.y;
                if (segment.direction !== overlapSegment.direction) {
                    var temp = nonSortedStart1;
                    nonSortedStart1 = nonSortedEnd1;
                    nonSortedEnd1 = temp;
                }
                var startDistance = Math.abs(nonSortedStart - nonSortedStart1);
                var endDistance = Math.abs(nonSortedEnd - nonSortedEnd1);
                if (startDistance >= endDistance) {
                    isEndCovered = false;
                }
                else {
                    if (nextSegment.next && segment.direction === nextSegment.next.direction &&
                        this.segmentTree.findOverlappingSegments(nextSegment).length !== 0) {
                        isEndCovered = false;
                    }
                    else {
                        isStartCovered = false;
                    }
                }
            }
            // Determine the shift direction based on the overlap and segment directions
            if (isStartCovered) {
                if (segment.direction === overlapSegment.direction && overlapsNext) {
                    shiftDirection = getOppositeDirection(overlapsNext.direction);
                }
                else if (segment.direction !== overlapSegment.direction && overlapsPrevious) {
                    //shiftDirection = overlapsPrevious.direction;
                    shiftDirection = getOppositeDirection(overlapsPrevious.direction);
                }
                else {
                    shiftDirection = getOppositeDirection(previousSegment.direction);
                }
            }
            else if (isEndCovered) {
                if (segment.direction === overlapSegment.direction && overlapsPrevious) {
                    shiftDirection = overlapsPrevious.direction;
                }
                else if (segment.direction !== overlapSegment.direction && overlapsNext) {
                    shiftDirection = getOppositeDirection(overlapsNext.direction);
                }
                else {
                    shiftDirection = getOppositeDirection(previousSegment.direction);
                }
            }
            else {
                shiftDirection = nextSegment.direction;
            }
        }
        else {
            if (!overlapSegment.previous || !overlapSegment.next ||
                overlapSegment.previous.direction === overlapSegment.next.direction) {
                shiftDirection = nextSegment.direction;
            }
            else {
                var maxStart = Math.max(segment.sortedStart, overlapSegment.sortedStart);
                var minEnd = Math.min(segment.sortedEnd, overlapSegment.sortedEnd);
                var currentRatio = (minEnd - maxStart) / (segment.sortedEnd - segment.sortedStart);
                var overlapRatio = (minEnd - maxStart) / (overlapSegment.sortedEnd - overlapSegment.sortedStart);
                shiftDirection = currentRatio >= overlapRatio ? nextSegment.direction : previousSegment.direction;
            }
        }
        return shiftDirection;
    };
    /**
     * Adjusts a segment by shifting it in a given direction.
     * @param {ILineSegment} segment - The segment to adjust.
     * @param {Direction} directionToShift - The direction to shift the segment.
     * @param {boolean} isOppositeShifting - Enabled when shifting secondary segment in opposite direction.
     * @param {boolean} adjustOverlapsOnly - Enabled only when overlapping segments need to be adjusted.
     * @returns {boolean} True if the segment was adjusted, false otherwise.
     */
    AvoidLineOverlapping.prototype.adjustSegment = function (segment, directionToShift, isOppositeShifting, adjustOverlapsOnly) {
        if (adjustOverlapsOnly === void 0) { adjustOverlapsOnly = false; }
        var currentCoord = segment.coordinate;
        var previousSegment = segment.previous;
        var nextSegment = segment.next;
        // Calculate the maximum allowed shift for the segment
        var maximumAllowedShift = this.calculateMaximumSegmentShift(previousSegment, nextSegment, directionToShift);
        // Determine the shift delta based on the direction
        var directionMultiplier = directionToShift === 'Right' || directionToShift === 'Bottom' ? 1 : -1;
        var shiftDelta = directionMultiplier * AvoidLineOverlapping.ConnectorSpacing;
        // Adjust the segment if the shift delta is within the allowed range
        if (Math.abs(shiftDelta) <= maximumAllowedShift) {
            this.segmentTree.removeSegment(segment);
            segment.updateCoordinate(shiftDelta);
            this.segmentTree.addSegment(segment);
            // Store the segment's initial routed coordinate.
            if (!this.currentSegments.has(segment)) {
                this.currentSegments.set(segment, currentCoord);
            }
            if (this.diagram.lineRoutingModule) {
                // Check if the shifted segment overlaps with a node.
                var startPoint = segment.startPoint;
                var endPoint = segment.endPoint;
                if (!this.diagram.lineRoutingModule.isPathWalkable(startPoint, endPoint, this.diagram)) {
                    if (!adjustOverlapsOnly && segment === this.rootShiftingSegment) {
                        this.segmentTree.removeSegment(segment);
                        segment.updateCoordinate(shiftDelta * -1);
                        this.segmentTree.addSegment(segment);
                        var overlappingSegments_2 = this.segmentTree.findOverlappingSegments(segment);
                        if (overlappingSegments_2.length !== 0) {
                            var oppositeDirection = getOppositeDirection(directionToShift);
                            return this.resolveOverlappingAtGivenDirection(segment, overlappingSegments_2, oppositeDirection, isOppositeShifting, true);
                        }
                    }
                    this.requireReroute = true;
                    return false;
                }
            }
            var overlappingSegments = this.segmentTree.findOverlappingSegments(segment);
            if (overlappingSegments.length !== 0) {
                if (this.modifiedSegments.size !== 0 && this.modifiedSegments.size > (this.currentSegments.size + 1)) {
                    return false;
                }
                return this.resolveOverlappingAtGivenDirection(segment, overlappingSegments, directionToShift, isOppositeShifting, adjustOverlapsOnly);
            }
        }
        else if (!adjustOverlapsOnly && segment === this.rootShiftingSegment) {
            var overlappingSegments = this.segmentTree.findOverlappingSegments(segment);
            if (overlappingSegments.length !== 0) {
                var oppositeDirection = getOppositeDirection(directionToShift);
                return this.resolveOverlappingAtGivenDirection(segment, overlappingSegments, oppositeDirection, isOppositeShifting, true);
            }
        }
        return segment.coordinate !== currentCoord;
    };
    /**
     * Calculates the maximum allowed shift for segments.
     * @param {ILineSegment} previousSegment - The previous segment.
     * @param {ILineSegment} nextSegment - The next segment.
     * @param {Direction} directionToShift - The direction to shift the segment.
     * @returns {number} The maximum allowed shift.
     */
    AvoidLineOverlapping.prototype.calculateMaximumSegmentShift = function (previousSegment, nextSegment, directionToShift) {
        // Calculate the lengths of the previous and next segments
        var previousLength = Math.abs(previousSegment.sortedEnd - previousSegment.sortedStart);
        var nextLength = Math.abs(nextSegment.sortedEnd - nextSegment.sortedStart);
        var connector = this.connectorMappings.get(previousSegment);
        if (connector) {
            if (!previousSegment.previous) {
                var sourceDecoratorLength = 7;
                if (connector.sourceDecorator.shape !== 'None') {
                    sourceDecoratorLength = Math.max(connector.sourceDecorator.width, connector.sourceDecorator.height);
                }
                previousLength -= sourceDecoratorLength + 5;
            }
            if (!nextSegment.next) {
                var targetDecoratorLength = 7;
                if (connector.targetDecorator.shape !== 'None') {
                    targetDecoratorLength = Math.max(connector.targetDecorator.width, connector.targetDecorator.height);
                }
                nextLength -= targetDecoratorLength + 5;
            }
        }
        if (previousSegment.direction === nextSegment.direction) {
            return directionToShift === nextSegment.direction ? nextLength : previousLength;
        }
        else {
            return directionToShift === nextSegment.direction ? Math.min(previousLength, nextLength) : Number.MAX_VALUE;
        }
    };
    /**
     *To destroy the line overlapping
     *
     * @returns {void} To destroy the line overlapping
     */
    AvoidLineOverlapping.prototype.destroy = function () {
        /**
         * Destroys the line overlapping module
         */
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    AvoidLineOverlapping.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'AvoidLineOverlapping';
    };
    // Constant defining the default spacing between connectors
    AvoidLineOverlapping.ConnectorSpacing = 5;
    // Constant defining the maximum number of times to re-route a connector to resolve overlaps
    AvoidLineOverlapping.maxReRouteLimit = 5;
    return AvoidLineOverlapping;
}());
export { AvoidLineOverlapping };
