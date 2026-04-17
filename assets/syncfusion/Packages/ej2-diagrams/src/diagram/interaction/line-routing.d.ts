import { Diagram } from '../diagram';
import { Connector } from '../objects/connector';
import { PointModel } from '../primitives/point-model';
import { Rect } from '../primitives/rect';
/**
 * Line Routing
 */
export declare class LineRouting {
    private size;
    private startGrid;
    private noOfRows;
    private noOfCols;
    private width;
    private height;
    private diagramStartX;
    private diagramStartY;
    private intermediatePoints;
    private gridCollection;
    private startNode;
    private targetNode;
    private targetGrid;
    private startArray;
    private targetGridCollection;
    private sourceGridCollection;
    private considerWalkable;
    skipObstacleCheck: boolean;
    private nonWalkableGrids;
    /**
     * lineRouting method \
     *
     * @returns { void }     lineRouting method .\
     * @param {Diagram} diagram - provide the source value.
     *
     * @private
     */
    lineRouting(diagram: Diagram): void;
    /** @private */
    /**
     * renderVirtualRegion method \
     *
     * @returns { void }     renderVirtualRegion method .\
     * @param {Diagram} diagram - provide the source value.
     * @param {boolean} isUpdate - provide the target value.
     *
     * @private
     */
    renderVirtualRegion(diagram: Diagram, isUpdate?: boolean): void;
    private findNodes;
    private updateNodesInVirtualRegion;
    /**
     * Gets the grids that intersect with the node bounds.
     * @param {Rect} bounds - The starting point of the line segment.
     * @returns {VirtualBoundaries[]} An array of VirtualBoundaries that intersect with the line segment.
     * @private
     */
    getGridsIntersectBounds(bounds: Rect): VirtualBoundaries[];
    private intersectRect;
    private findEndPoint;
    /**
     * Gets the grids that intersect with the line segment defined by the start and end points.
     * @param {PointModel} startPoint - The starting point of the line segment.
     * @param {PointModel} endPoint - The ending point of the line segment.
     * @returns {VirtualBoundaries[]} An array of VirtualBoundaries that intersect with the line segment.
     * @private
     */
    getGridsIntersect(startPoint: PointModel, endPoint: PointModel): VirtualBoundaries[];
    /**
     * Checks if the path between the start and end points is walkable.
     * @param {PointModel} startPoint - The starting point of the path.
     * @param {PointModel} endPoint - The ending point of the path.
     * @param {Diagram} diagram - The diagram instance.
     * @param {Connector} [connector] - The connector to check for obstacles.
     * @returns {boolean} True if the path is walkable, otherwise false.
     * @private
     */
    isPathWalkable(startPoint: PointModel, endPoint: PointModel, diagram: Diagram, connector?: Connector): boolean;
    private checkObstaclesIntersect;
    /**
     * refreshConnectorSegments method \
     *
     * @returns { void }     refreshConnectorSegments method .\
     * @param {Diagram} diagram - provide the diagram value.
     * @param {Connector} connector - provide the connector value.
     * @param {boolean} isUpdate - provide the diagram value.
     * @param {boolean} isEnableRouting - provide enableRouting value.
     *
     * @private
     */
    refreshConnectorSegments(diagram: Diagram, connector: Connector, isUpdate: boolean, isEnableRouting?: boolean): void;
    private checkChildNodes;
    private findEdgeBoundary;
    private checkObstacles;
    private contains;
    private getEndvalue;
    private changeValue;
    private getIntermediatePoints;
    private optimizeIntermediatePoints;
    private removePointsInSameLine;
    private arePointsInSameLine;
    private getValidPoints;
    private updateConnectorSegments;
    private findPath;
    private sorting;
    private octile;
    private manhattan;
    private findNearestNeigbours;
    private neigbour;
    private resetGridColl;
    private isWalkable;
    private findIntermediatePoints;
    /**
     * Constructor for the line routing module
     *
     * @private
     */
    constructor();
    /**
     *To destroy the line routing
     *
     * @returns {void} To destroy the line routing
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
/** @private */
export interface VirtualBoundaries {
    x: number;
    y: number;
    width: number;
    height: number;
    gridX: number;
    gridY: number;
    walkable: boolean;
    tested: boolean;
    nodeId: string[];
    previousDistance?: number;
    afterDistance?: number;
    totalDistance?: number;
    parent?: VirtualBoundaries;
    parentNodeId?: string;
}
