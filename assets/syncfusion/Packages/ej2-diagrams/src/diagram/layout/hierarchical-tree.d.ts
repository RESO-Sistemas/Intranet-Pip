import { INode } from './layout-base';
import { Layout, ILayout } from './layout-base';
import { DiagramAction } from '../enum/enum';
import { PointModel } from '../primitives/point-model';
/**
 * Hierarchical Tree and Organizational Chart
 */
export declare class HierarchicalTree {
    /**
     * Constructor for the organizational chart module.
     *
     * @private
     */
    constructor();
    /**
     * To destroy the organizational chart
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Defines the layout animation
     *
     */
    isAnimation: boolean;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * @param nodes
     * @param nameTable
     * @param layoutProp
     * @param viewport
     * @param uniqueId
     * @param action
     * @private
     */
    updateLayout(nodes: INode[], nameTable: Object, layoutProp: Layout, viewport: PointModel, uniqueId: string, action?: DiagramAction): ILayout;
    /**
     * Adjusts layout bounds to maintain proper spacing.
     * This method updates the positions of the layout, including the root node and its children,
     * If the space between the current and previous bounds is smaller than the required spacing.
     *
     * @param {Object} layout - The layout object containing node positions and structure.
     * @param {Object} rootNode - The root node of the current layout.
     * @param {Array} boundsArray - Array of bounds for all layouts.
     * @param {number} index - Index of the current layout.
     * @returns {void}
     */
    private updateLayoutBounds;
    private doLayout;
    private getBounds;
    private updateTree;
    private updateLeafNode;
    private setUpLayoutInfo;
    private translateSubTree;
    private updateRearBounds;
    private shiftSubordinates;
    private setDepthSpaceForAssitants;
    private setBreadthSpaceForAssistants;
    private getDimensions;
    private hasChild;
    private updateHorizontalTree;
    private updateHorizontalTreeWithMultipleRows;
    private updateLeftTree;
    private alignRowsToCenter;
    private updateRearBoundsOfTree;
    private splitRows;
    private updateVerticalTree;
    private splitChildrenInRows;
    private extend;
    private findOffset;
    private uniteRects;
    private spaceLeftFromPrevSubTree;
    private findIntersectingLevels;
    private findLevel;
    private getParentNode;
    private updateEdges;
    private updateAnchor;
    private updateConnectors;
    private updateSegments;
    private updateSegmentsForBalancedTree;
    private get3Points;
    private get5Points;
    private getSegmentsFromPoints;
    private getSegmentsForMultipleRows;
    private updateSegmentsForHorizontalOrientation;
    private updateNodes;
}
