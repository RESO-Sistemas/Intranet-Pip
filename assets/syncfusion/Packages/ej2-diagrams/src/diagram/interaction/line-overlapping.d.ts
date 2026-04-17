import { Diagram } from '../diagram';
import { Connector } from '../objects/connector';
import { OrthogonalSegmentModel } from '../objects/connector-model';
import { PointModel } from '../primitives/point-model';
export declare class AvoidLineOverlapping {
    static ConnectorSpacing: number;
    static maxReRouteLimit: number;
    private readonly segmentTree;
    private readonly segmentMappings;
    private readonly connectorMappings;
    private modifiedConnector;
    private modifiedSegments;
    private currentSegments;
    private requireReroute;
    private reRoutedCount;
    private considerNonWalkable;
    private rootShiftingSegment;
    private diagram;
    constructor(parent?: Diagram);
    /**
     * Gets the set of connectors that have been modified.
     * @returns {Set<Connector>} A set of modified connectors.
     * @private
     */
    getModifiedConnector(): Set<Connector>;
    /**
     * Gets the modified segments of a given connector.
     * @param {Connector} connector - The connector to get the modified segments for.
     * @returns {OrthogonalSegmentModel[]} An array of orthogonal segment models representing the modified segments.
     * @private
     */
    getModifiedConnectorSegments(connector: Connector): OrthogonalSegmentModel[];
    /**
     * Refreshes the modified connectors in the diagram.
     * @param {Diagram} diagram - The diagram instance containing the connectors.
     * @returns {void}
     * @private
     */
    refreshModifiedConnectors(diagram: Diagram): void;
    /**
     * Removes connectors and its associated segments from the internal mappings and segment tree.
     * @param {any} connectors - The connectors to remove.
     * @returns {void}
     * @private
     */
    removeConnectors(connectors: any): void;
    /**
     * Removes a connector and its associated segments from the internal mappings and segment tree.
     * @param {Connector} connector - The connector to remove.
     * @returns {void}
     * @private
     */
    removeConnector(connector: Connector): void;
    /**
     * Adds a connector and processes it to remove overlapping lines in its segments.
     * @param {Connector} connector - The connector to process.
     * @param {PointModel[]} points - The points to adjust (optional).
     * @param {OrthogonalSegmentModel[]} segments - The segments to adjust (optional).
     * @returns {void} The adjusted segments.
     * @private
     */
    addConnector(connector: Connector, points?: PointModel[], segments?: OrthogonalSegmentModel[]): void;
    /**
     * Creates line segments from the given points.
     * @param {PointModel[]} points - The points to create segments from.
     * @returns {ILineSegment[]} An array of line segments.
     */
    private createLineSegments;
    /**
     * Maps line segments to the given connector.
     * @param {Connector} connector - The connector to map segments to.
     * @param {ILineSegment[]} lineSegments - The line segments to map.
     * @returns {void}
     */
    private mapSegmentsToConnector;
    /**
     * Converts line segments to orthogonal segments.
     * @param {ILineSegment[]} lineSegments - The line segments to convert.
     * @returns {OrthogonalSegmentModel[]} An array of orthogonal segments.
     */
    private convertSegmentsToOrthogonal;
    /**
     * Adjusts the connector to resolve overlapping segments.
     * @param {Connector} connector - The connector to adjust.
     * @returns {void}
     */
    adjustConnector(connector: Connector): void;
    /**
     * Resolves overlapping segments by adjusting their positions.
     * @param {ILineSegment} segment - The segment to adjust.
     * @param {ILineSegment[]} overlappingSegments - The overlapping segments to resolve.
     * @returns {boolean} whether the shifted segments get resolved with overlapping segment in finding a free coordinate
     */
    private resolveOverlappingSegments;
    /**
     * Determines whether the current segment should be adjusted before its overlapping segment.
     * @param {ILineSegment } segment - The current segment.
     * @param {ILineSegment[]} overlappingSegments - The list of overlapping segments.
     * @returns {boolean} True if the current segment should be adjusted first, otherwise false.
     */
    private shouldAdjustSelfFirst;
    /**
     * Attempts to adjust the primary segment and optionally a secondary segment to resolve overlaps.
     * @param {ILineSegment} primarySegment - The primary line segment to adjust.
     * @param {Direction} shiftDirection - The direction to shift the primary segment.
     * @param {ILineSegment} secondarySegment - The secondary line segment to adjust in the opposite direction (optional).
     * @param {boolean} isOppositeShifting - Enabled when shifting segment in opposite direction.
     * @returns {boolean} True if any segment was adjusted, otherwise false.
     */
    private attemptAdjustment;
    /**
     * Updates the modified segments by adjusting their coordinates and re-adding them to the segment tree.
     * @param {boolean} resetModifiedSegments - Indicates if the segments have been shifted.
     * @returns {void}
     */
    private updateModifiedSegments;
    /**
     * Updates the segment tree with the modified segments.
     * Removes the old segments and adds the new segments with their updated positions.
     * @returns {void}
     */
    private updateSegmentTreeWithModifiedSegments;
    /**
     * Resolves overlapping segments in a given direction.
     * @param {ILineSegment} segment - The line segment to resolve overlaps for.
     * @param {ILineSegment[]} overlappingSegments - The list of overlapping segments.
     * @param {Direction} shiftDirection - The direction to shift the segment.
     * @param {boolean} isOppositeShifting - Enabled when tried to shift secondary segment in opposite direction
     * @param {boolean} adjustOverlapsOnly - Enabled only when overlapping segments need to be adjusted.
     * @returns {boolean} True if the segment was adjusted, otherwise false.
     */
    private resolveOverlappingAtGivenDirection;
    /**
     * Calculates the direction to shift a line segment to resolve overlaps.
     * @param {ILineSegment} lineSegment - The line segment to calculate the shift direction for.
     * @param {ILineSegment[]} overlappingSegments - The list of overlapping segments.
     * @returns {Direction} The direction to shift the segment.
     */
    private calculateShiftDirection;
    /**
     * Adjusts a segment by shifting it in a given direction.
     * @param {ILineSegment} segment - The segment to adjust.
     * @param {Direction} directionToShift - The direction to shift the segment.
     * @param {boolean} isOppositeShifting - Enabled when shifting secondary segment in opposite direction.
     * @param {boolean} adjustOverlapsOnly - Enabled only when overlapping segments need to be adjusted.
     * @returns {boolean} True if the segment was adjusted, false otherwise.
     */
    private adjustSegment;
    /**
     * Calculates the maximum allowed shift for segments.
     * @param {ILineSegment} previousSegment - The previous segment.
     * @param {ILineSegment} nextSegment - The next segment.
     * @param {Direction} directionToShift - The direction to shift the segment.
     * @returns {number} The maximum allowed shift.
     */
    private calculateMaximumSegmentShift;
    /**
     *To destroy the line overlapping
     *
     * @returns {void} To destroy the line overlapping
     */
    destroy(): void;
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    protected getModuleName(): string;
}
