import { VisioTextAlignmentModel, VisioTextDecorationModel } from './visio-annotations';
import { VisioConnector } from './visio-connectors';
import { ParsingContext } from './visio-import-export';
import { VisioShape } from './visio-models';
import { Attributes, DetermineShapeResult, BPMNFlowShapeResult, UMLConnectorResult, VisioSection, VisioShapeNode, VisioNodeInput, VisioRow } from './visio-types';
/**
 * Global shape index counter used during parsing to track shape position.
 * Incremented for each shape processed and used to look up master data.
 *
 * @type {{ value: number }}
 */
export declare const shapeIndex: {
    value: number;
};
/**
 * Converts a Visio shape object into a Syncfusion diagram node format.
 * This is the main transformation function that takes parsed Visio data
 * and converts it to the EJ2 diagram format.
 *
 * Handles:
 * - Coordinate system conversion (inches to pixels)
 * - Text binding and positioning
 * - Port/connection point mapping
 * - Styling and constraints application
 * - Shape type determination
 * - Group shape padding
 *
 * @param {any} node - The VisioShape object to convert.
 * @param {ParsingContext} context - Parser context with theme and configuration data.
 * @param {VisioNodeInput[]} shapeGroup - Array of all shapes (used for group processing).
 * @returns {any} A Syncfusion diagram node object with all properties transformed.
 *
 * @example
 * const diagramNode = convertVisioShapeToNode(visioShape, context, allShapes);
 * console.log(diagramNode.id); // Shape ID
 * console.log(diagramNode.width); // Width in pixels
 * console.log(diagramNode.annotations); // Text annotations
 *
 * @private
 */
export declare function convertVisioShapeToNode(node: any, context: ParsingContext, shapeGroup: VisioShape[]): any;
/**
 * Converts a Visio text decoration model to EJ2 text decoration format.
 * Maps underline and strikethrough properties to EJ2 supported values.
 *
 * @param {VisioTextDecorationModel | undefined} textDecoration - The Visio text decoration model.
 * @returns {'None' | 'Underline' | 'LineThrough'} The EJ2 text decoration value.
 *
 * @example
 * const decoration = getTextDecoration(visioModel);
 * // Returns 'Underline', 'LineThrough', or 'None'
 *
 * @private
 */
export declare function getTextDecoration(textDecoration?: VisioTextDecorationModel): 'None' | 'Underline' | 'LineThrough';
/**
 * Converts a Visio text alignment model to EJ2 text alignment format.
 * Maps left, right, justify properties to EJ2 supported values.
 *
 * @param {VisioTextAlignmentModel} alignment - The Visio text alignment model.
 * @returns {'Left' | 'Right' | 'Center' | 'Justify'} The EJ2 text alignment value.
 *
 * @example
 * const align = getTextAlign(visioAlignment);
 * // Returns 'Left', 'Right', 'Center', or 'Justify'
 *
 * @private
 */
export declare function getTextAlign(alignment: VisioTextAlignmentModel): 'Left' | 'Right' | 'Center' | 'Justify';
/**
 * Determines the shape type and properties based on shape attributes and master data.
 * Maps Visio shape names to EJ2 diagram shape types (Basic, Flow, BPMN, UML, etc.).
 * Handles shape transformations and generates path data for custom shapes.
 *
 * @param {Attributes} attributes - The shape's XML attributes (Name, Type, etc.).
 * @param {VisioSection} defaultData - Default/master data containing geometry information.
 * @param {VisioShapeNode} shapes - The raw shape XML object with Cell and Section data.
 * @param {VisioNodeInput} [Node] - Optional: The VisioShape node being processed.
 * @param {ParsingContext} [context] - Optional: Parser context for warnings.
 * @returns {DetermineShapeResult} Shape type and type-specific properties.
 *
 * @example
 * const shapeResult = determineShapeType(attributes, defaultData, shapes, node, context);
 * // Returns { type: 'Basic', shape: 'Rectangle' } or other shape type
 *
 * @private
 */
export declare function determineShapeType(attributes: Attributes, defaultData: VisioSection, shapes: VisioShapeNode, Node?: VisioShape, context?: ParsingContext): DetermineShapeResult;
/**
 * Retrieves shape keywords from the shape's master definition.
 * Keywords are used for shape categorization and UML/BPMN detection.
 *
 * @param {VisioShapeNode} shape - The shape XML object with Master reference.
 * @param {ParsingContext} context - Parser context containing master data.
 * @returns {string} The shape keywords as a space-separated string, or empty string if not found.
 *
 * @example
 * const keywords = getShapeKeywordsFromMaster(shapeObj, context);
 * // Returns "uml flow diagram" or similar
 *
 * @private
 */
export declare function getShapeKeywordsFromMaster(shape: VisioShapeNode, context: ParsingContext): string;
/**
 * Retrieves and processes BPMN flow shape (connector) types.
 * Identifies Association, Sequence, and Message flows.
 *
 * @param {VisioShapeNode} shapes - The shape XML object.
 * @param {string} shapeName - The flow shape name.
 * @param {VisioNodeInput} Node - The diagram node being processed.
 * @returns {BPMNFlowShapeResult | undefined} BPMN flow shape definition or undefined.
 *
 * @example
 * const flow = getBPMNFlowShapes(shapeObj, 'Association', node);
 *
 * @private
 */
export declare function getBPMNFlowShapes(shapes: VisioShapeNode, shapeName: string, Node: VisioNodeInput | VisioConnector): BPMNFlowShapeResult | undefined;
/**
 * Retrieves UML connector relationship types.
 * Identifies Inheritance, Association, Composition, etc.
 *
 * @param {VisioShapeNode} shapes - The shape XML object with Action section.
 * @param {string} shapeName - The connector name.
 * @param {VisioNodeInput} Node - The diagram node being processed.
 * @returns {UMLConnectorResult | undefined} UML connector definition with multiplicity.
 *
 * @example
 * const umlConnector = getUMLConnectors(shapeObj, 'Inheritance', node);
 *
 * @private
 */
export declare function getUMLConnectors(shapes: VisioShapeNode, shapeName: string, Node: VisioNodeInput | VisioConnector): UMLConnectorResult | undefined;
/**
 * Resolves the master source node for a given page shape.
 * Looks up the appropriate master or master-shape reference
 * from the parsing context and returns the corresponding node.
 *
 * @param {VisioShapeNode} pageNode - Current page shape node
 * @param {ParsingContext} context - Parsing context containing master maps
 * @param {string} [parentMasterId] - Optional parent master ID for nested shapes
 * @returns {VisioShapeNode|null} The resolved master node, or null if not found
 */
export declare function resolveMasterSourceForNode(pageNode: VisioShapeNode, context: ParsingContext, parentMasterId?: string): VisioShapeNode | null;
/**
 * Resolves the semantic shape name for mapping to EJ2 diagram nodes.
 * Checks instance attributes, master source attributes, and master index
 * definitions to determine the most appropriate shape name.
 *
 * @param {VisioShapeNode} pageNode - Current page shape node
 * @param {VisioShapeNode|null} masterSource - Master source node if available
 * @param {ParsingContext} context - Parsing context with master index
 * @param {string} [parentMasterId] - Optional parent master ID for nested shapes
 * @returns {string} Resolved shape name or empty string if not found
 */
export declare function resolveShapeNameForMapping(pageNode: VisioShapeNode, masterSource: VisioShapeNode | null, context: ParsingContext, parentMasterId?: string): string;
/**
 * Determines the default EJ2 node shape for a Visio shape.
 * Resolves semantic name, attempts mapping to supported EJ2 types,
 * and falls back to geometry-based path if no supported type is found.
 *
 * @param {VisioShapeNode} pageNode - Current page shape node
 * @param {VisioShapeNode|null} masterSource - Master source node if available
 * @param {VisioSection[]} geomSections - Geometry sections of the shape
 * @param {VisioShape} node - Shape node with dimensions
 * @param {ParsingContext} context - Parsing context with master index
 * @param {string} [parentMasterId] - Optional parent master ID for nested shapes
 * @returns {DetermineShapeResult} Determined shape result (mapped or path)
 */
export declare function determineDefaultNodeShape(pageNode: VisioShapeNode, masterSource: VisioShapeNode | null, geomSections: VisioSection[], node: VisioShape, context: ParsingContext, parentMasterId?: string): DetermineShapeResult;
/**
 * Attempts to determine a semantic group shape for a Visio group node.
 * Resolves the group's name, runs the shape type mapper, and only collapses
 * into semantic families (BPMN, UML, Image) to avoid losing visuals for generic groups.
 *
 * @param {VisioShapeNode} groupNode - Current group shape node
 * @param {VisioShapeNode|null} groupMasterNode - Master source node for the group
 * @param {VisioShape} groupShape - Group shape with dimensions
 * @param {ParsingContext} context - Parsing context with master index
 * @param {string} [parentMasterId] - Optional parent master ID for nested groups
 * @returns {DetermineShapeResult|null} Semantic group shape result, or null if not applicable
 */
export declare function tryDetermineSemanticGroupShape(groupNode: VisioShapeNode, groupMasterNode: VisioShapeNode | null, groupShape: VisioShape, context: ParsingContext, parentMasterId?: string): DetermineShapeResult | null;
/**
 * Merges geometry sections from master and instance nodes.
 * Keeps master sections intact and supplements with instance-only sections,
 * without overriding master rows with page rows.
 *
 * @param {VisioShapeNode} masterNode - Master shape node
 * @param {VisioShapeNode} instNode - Instance shape node
 * @returns {VisioSection[]} Combined geometry sections with master-preferred merge
 */
export declare function mergeGeometrySectionsByIndex(masterNode: VisioShapeNode, instNode: VisioShapeNode): VisioSection[];
/**
 * Checks if all geometry sections explicitly have NoFill=1.
 * Returns true only if every geometry section has the NoFill cell set to 1,
 * indicating that all geometry sections should not be filled.
 *
 * @param {VisioSection[]} sections - Array of Visio geometry sections to check
 * @returns {boolean} True if all sections have NoFill=1, false otherwise
 * @remarks
 * If any section is missing or has NoFill !== 1, returns false.
 * Empty array or undefined sections also return false.
 *
 * @example
 * // Check if all geometry sections have no fill
 * const hasNoFill = allGeometrySectionsNoFill(geometrySections);
 * // Result: true or false
 */
export declare function allGeometrySectionsNoFill(sections: VisioSection[]): boolean;
/**
 * Checks if all geometry sections explicitly have NoLine=1.
 * Returns true only if every geometry section has the NoLine cell set to 1,
 * indicating that all geometry sections should not have a border line.
 *
 * @param {VisioSection[]} sections - Array of Visio geometry sections to check
 * @returns {boolean} True if all sections have NoLine=1, false otherwise
 * @remarks
 * If any section is missing or has NoLine !== 1, returns false.
 * Empty array or undefined sections also return false.
 *
 * @example
 * // Check if all geometry sections have no line
 * const hasNoLine = allGeometrySectionsNoLine(geometrySections);
 * // Result: true or false
 */
export declare function allGeometrySectionsNoLine(sections: VisioSection[]): boolean;
/**
 * Determines if a Geometry section is hidden by checking the section-level
 * NoShow cell (1 = hidden). Falls back to visible if the cell is not present.
 *
 * @param {VisioSection} section - The Geometry section to evaluate.
 * @returns {boolean} True if the section is hidden, otherwise false.
 */
export declare function isGeometrySectionHidden(section: VisioSection): boolean;
/**
 * Determines if a Geometry row is hidden by checking a row-level
 * NoShow cell (1 = hidden). If the row lacks NoShow, the row is
 * considered visible.
 *
 * @param {VisioRow} row - The Geometry row to evaluate.
 * @returns {boolean} True if the row is hidden, otherwise false.
 */
export declare function isGeometryRowHidden(row: VisioRow): boolean;
/**
 * Returns true only if every Geometry section in the array
 * is hidden (NoShow = 1). Empty or invalid input returns false
 * (do not hide the whole shape by default).
 *
 * @param {VisioSection[]} sections - Geometry sections collection.
 * @returns {boolean} True if all sections are hidden, otherwise false.
 */
export declare function areAllGeometrySectionsHidden(sections: VisioSection[]): boolean;
