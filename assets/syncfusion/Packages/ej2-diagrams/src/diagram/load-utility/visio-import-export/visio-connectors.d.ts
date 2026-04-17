import { DiagramConnectorSegmentModel } from '../../objects/connector-model';
import { VisioConnectorAnnotation } from './visio-annotations';
import { ParsingContext } from './visio-import-export';
import { VisioMaster } from './visio-models';
import { Attributes, VisioCell, VisioPort, DecoratorShapes, ConnectorType, VisioShapeNode, OneOrMany, VisioShapesNode, ConnectsElement, GradientStop, GradientVector, RadialGradientConfig, ConnectorShapePayload, ParsedXmlObject, ShapeAddInfo, GroupTransform } from './visio-types';
/**
 * Represents a Visio connector (line, arrow, or connector shape).
 * Contains all properties needed to define connector geometry, styling, and metadata.
 */
export declare class VisioConnector {
    /** Unique identifier for the connector */
    id: string;
    /** Retrieved data from import */
    addInfo: ShapeAddInfo;
    /** ID of the source shape */
    sourceId?: string;
    /** ID of the target shape */
    targetId?: string;
    /** ID of the source port on the source shape */
    sourcePortId?: string;
    /** ID of the target port on the target shape */
    targetPortId?: string;
    /** Starting X coordinate in pixels */
    beginX: number;
    /** Starting Y coordinate in pixels */
    beginY: number;
    /** Ending X coordinate in pixels */
    endX: number;
    /** Ending Y coordinate in pixels */
    endY: number;
    /** Type of connector routing (Straight, Orthogonal, Bezier) */
    type: ConnectorType;
    /** Corner radius for the connector */
    cornerRadius?: number;
    /** ID of the master shape this connector is based on */
    masterId?: string;
    /** Reference to the master shape */
    master?: VisioMaster;
    /** Connector styling properties */
    style?: VisioStyleModel;
    /** Text annotation/label for the connector */
    annotation?: VisioConnectorAnnotation;
    /** Decorator (arrow head) at the source end */
    sourceDecorator?: VisioDecoratorModel;
    /** Decorator (arrow head) at the target end */
    targetDecorator?: VisioDecoratorModel;
    /** Layer membership index */
    layerMember?: number;
    /** Constraint flags for connector behavior */
    constraints?: number;
    /** Distance for line bridges to jump over connectors */
    bridgeSpace?: number;
    /** Segments defining the connector path */
    segments?: DiagramConnectorSegmentModel[];
    /** Flag indicating if connector is visible */
    visible?: boolean;
    /** Tooltip text for the connector */
    tooltip?: string;
    /** Flag allowing shapes to be dropped on this connector */
    allowDrop?: boolean;
    /** Flag enabling automatic connector line routing */
    lineRouting?: boolean;
    /** QuickStyle line color index */
    QuickStyleLineColor: number;
    /** QuickStyle line matrix index */
    QuickStyleLineMatrix: number;
    /** Connection points/ports on the connector */
    ports?: VisioPort[];
    /** Reference to the underlying Visio shape object */
    shape?: ConnectorShapePayload;
    /** Flag indicating this is a connector shape */
    IsConnector?: boolean;
    /** Connector line routing extension setting */
    conLineRouteExt?: string;
    /** Shape-level routing style (0-22) - Controls routing algorithm */
    shapeRouteStyle?: string;
    /**
     * Creates VisioConnector instances from Visio shape data.
     * Parses connector cells and extracts all relevant properties.
     * @static
     * @param {VisioShapesNode} obj - The Visio shapes container object
     * @param {ParsingContext} context - Parsing context containing page and connector data
     * @param {GroupTransform} [parentTransform] - Optional parent group transform for nested shapes
     * @returns {VisioConnector[]} Array of parsed connector objects
     */
    static fromJs(obj: VisioShapesNode, context: ParsingContext, parentTransform?: GroupTransform): VisioConnector[];
}
/**
 * Determines the connector shape type based on master name and keywords.
 * Identifies special connector types like BPMN flow shapes and UML connectors.
 * @function getConnectorShape
 * @param {Attributes} attributes - Shape attributes containing the name
 * @param {VisioShapeNode} shapes - The connector shape object
 * @param {VisioConnector} Node - Optional node/connector reference for shape lookup
 * @param {ParsingContext} context - Parsing context with master data
 * @returns {any} The connector shape definition, or undefined if standard connector
 */
export declare function getConnectorShape(attributes: Attributes, shapes: VisioShapeNode, Node?: VisioConnector, context?: ParsingContext): any;
/**
 * Represents styling properties for a Visio connector line.
 * Contains fill, stroke, opacity, and dash pattern information.
 */
export declare class VisioStyleModel {
    /** Fill color of the connector */
    fill?: string;
    /** Stroke/line color of the connector */
    strokeColor?: string;
    /** Dash array pattern for the stroke */
    strokeDashArray?: string;
    /** Width of the stroke line */
    strokeWidth?: number;
    /** Opacity/transparency level (0-1) */
    opacity: number;
    /**
     * Creates a VisioStyleModel instance from a Visio connector shape.
     * Extracts line styling properties from shape cells.
     * @static
     * @param {VisioShapeNode} shape - The Visio connector shape object
     * @returns {VisioStyleModel} A new VisioStyleModel with extracted style properties
     */
    static fromShape(shape: VisioShapeNode): VisioStyleModel;
    /**
     * Converts Visio dash pattern codes to Syncfusion strokeDashArray format.
     * @static
     * @param {string} patternCode - The Visio line pattern code
     * @returns {string} The Syncfusion dash array string
     */
    static convertDashPattern(patternCode: string): string;
}
/**
 * Represents styling properties for connector decorators (arrow heads).
 * Contains fill, stroke, gradient, and other decorator-specific styling.
 */
export declare class VisioDecoratorStyleModel {
    /** Fill color of the decorator */
    fill?: string;
    /** Opacity/transparency level (0-1) */
    opacity?: number;
    /** Stroke color of the decorator */
    strokeColor?: string;
    /** Gradient fill color (alternative to solid fill) */
    gradient?: string;
    /** Width of the stroke line */
    strokeWidth: number;
    /** Flag indicating if gradient is enabled */
    isgradientEnabled: boolean;
    /** Type of gradient (Linear or Radial) */
    gradientType: 'Linear' | 'Radial';
    /** Gradient coordinates/parameters */
    gradientcoOrdinates: GradientVector | RadialGradientConfig;
    /** Array of gradient stop colors */
    gradientStops: GradientStop[];
    /** Angle of the gradient in degrees */
    gradientAngle: number;
    /**
     * Creates a VisioDecoratorStyleModel instance from a Visio shape.
     * Extracts decorator styling including gradients if applicable.
     * @static
     * @param {VisioShapeNode} shape - The Visio shape object containing decorator style data
     * @param {ParsingContext} context - Parsing context for warnings
     * @returns {VisioDecoratorStyleModel} A new VisioDecoratorStyleModel with extracted styles
     */
    static fromShapeJs(shape: VisioShapeNode, context: ParsingContext): VisioDecoratorStyleModel;
}
/**
 * Represents a decorator (arrow head or end marker) for a connector.
 * Defines shape, size, and styling of source or target decorators.
 */
export declare class VisioDecoratorModel {
    /** Height of the decorator in pixels */
    height?: number;
    /** Width of the decorator in pixels */
    width?: number;
    /** Shape type of the decorator (Arrow, Diamond, etc.) */
    shape?: DecoratorShapes;
    /** Styling properties of the decorator */
    style?: VisioDecoratorStyleModel;
    /** QuickStyle line color index */
    QuickStyleLineColor?: number;
    /** QuickStyle line matrix index */
    QuickStyleLineMatrix?: number;
    /** Flag indicating this is a connector decorator */
    IsConnector?: boolean;
    /** Flag indicating if connector source decorator shape is changed */
    isSourceShapeChanged?: boolean;
    /** Flag indicating if connector target decorator shape is changed*/
    isTargetShapeChanged?: boolean;
    /** Flag indicating this is a connector source decorator */
    isSource?: boolean;
    /** decorator dimensions of a connector */
    arrowDimension?: string;
    /**
     * Creates a VisioDecoratorModel instance from a Visio connector shape.
     * Extracts arrow/decorator properties for either source or target end.
     * @static
     * @param {VisioShapeNode} shape - The Visio connector shape object
     * @param {boolean} isSource - True for source end decorator, false for target end
     * @param {ParsingContext} context - Parsing context for warnings and master data
     * @returns {VisioDecoratorModel} A new VisioDecoratorModel with extracted decorator properties
     */
    static fromJs(shape: VisioShapeNode, isSource: boolean, context: ParsingContext): VisioDecoratorModel;
}
/**
 * Represents connection data between shapes and connectors.
 * Stores source/target relationships and port associations.
 */
export declare class VisioConnections {
    /** ID of the connector shape */
    connectorId?: string;
    /** ID of the source shape */
    sourceId?: string;
    /** ID of the target shape */
    targetId?: string;
    /** ID of the port on the source shape */
    sourcePortId?: string;
    /** ID of the port on the target shape */
    targetPortId?: string;
    /**
     * Creates VisioConnections instances from Visio Connect data.
     * Parses connector-to-shape connections from the XML Connect elements.
     * @static
     * @param {ConnectsElement} obj - The Visio document object containing Connect elements
     * @param {ParsingContext} context - Parsing context (unused but maintained for interface compatibility)
     * @returns {VisioConnections[]} Array of connection objects
     */
    static fromJs(obj: ConnectsElement | ParsedXmlObject, context: ParsingContext): VisioConnections[];
}
/**
 * Extracts a cell value from cell array, handling both single and array formats.
 * @function getCellValue
 * @param {OneOrMany<VisioCell>} cell - A single cell object or array of cell objects
 * @param {string} name - Name of the cell to find
 * @returns {string | undefined} The cell value, or undefined if not found
 */
export declare function getCellValue(cell: OneOrMany<VisioCell>, name: string): string | undefined;
/**
 * Determines if a shape is a connector based on its cells and master reference.
 * Checks for connector-specific cells (BeginX, BeginY, EndX, EndY) and valid master.
 * @function isConnectorShape
 * @param {VisioShapeNode} shape - The Visio shape object to check
 * @param {ParsingContext} context - Parsing context with master data
 * @returns {boolean} True if shape is identified as a connector
 */
export declare function isConnectorShape(shape: VisioShapeNode, context: ParsingContext): boolean;
/**
 * Converts Visio connector data to Syncfusion connector format.
 * Applies styling, constraints, decorators, and annotations.
 * @function bindVisioConnectors
 * @param {VisioConnector} connectorData - The Visio connector to convert
 * @param {ParsingContext} context - Parsing context for warnings and settings
 * @returns {any} Syncfusion connector object
 */
export declare function bindVisioConnectors(connectorData: VisioConnector, context: ParsingContext): any;
