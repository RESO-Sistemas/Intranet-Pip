import { ParsingContext } from './visio-import-export';
import { VisioDocumentSettings, VisioMaster, VisioNodeShadow, VisioNodeStyle, VisioPage, VisioRelationship, VisioShape, VisioTheme, VisioWindow } from './visio-models';
import { CellMapValue, MasterElement, MasterDefaultValues, // Added for setDefaultData and parseVisioNodeStyle
OneOrMany, OrderEntry, // Added for buildFmtSchemeFill/Stroke
ParsedXmlObject, ShapeAttributes, VisioShapeNode, ThemeElements, VisioPageSheet, VisioPort, WindowRootElement, XmlRelationship } from './visio-types';
/**
 * Finds the default master data for a given shape from its master ID.
 * This function searches through a collection of master shape definitions to locate
 * the master that corresponds to the given shape's master ID attribute.
 *
 * @param {MasterDefaultValues[]} defaultDataValue - The collection of all master shape definitions, each with a masterID property.
 * @param {ShapeAttributes} attributes - The attributes of the current shape, containing the Master property with the master ID reference.
 * @returns {MasterDefaultValues} The default data object containing shape properties (dimensions, pins, geometry, ports, styles, etc.)
 *                or an empty object if no matching master is found.
 *
 * @example
 * const defaultData = setDefaultData(allMasters, shapeAttributes);
 * const width = defaultData.Width; // Shape width from master definition
 *
 * @private
 */
export declare function setDefaultData(defaultDataValue: any[], attributes: ShapeAttributes): MasterDefaultValues;
/**
 * Extracts connection points (ports) from a Visio shape definition.
 * Parses the Connection section from the raw shape XML object to identify all ports
 * where connectors can attach. Adjusts port Y-coordinates based on shape height.
 *
 * @param {VisioShapeNode} shape - The raw shape object from the parsed XML, containing Section and Cell data.
 * @param {MasterDefaultValues} [defaultData] - Optional default data from the shape's master definition containing pre-computed port positions.
 * @param {number} [width] - Optional node width measurement that may override calculated shape width.
 * @param {number} [height] - Optional node height measurement that may override calculated shape height.
 * @returns {VisioPort[]} An array of VisioPort objects with id, coordinates (x, y), direction vectors (dirX, dirY),
 *                        port type, auto-generation flag, and prompt text. Returns empty array if no Connection section exists.
 *
 * @example
 * const ports = getVisioPorts(shapeData, masterData, 100);
 * ports.forEach(port => console.log(`Port ${port.id} at (${port.x}, ${port.y})`));
 *
 * @private
 */
export declare function getVisioPorts(shape: VisioShapeNode, defaultData?: MasterDefaultValues, width?: number, height?: number): VisioPort[];
/**
 * Parses document-level settings from the DocumentSettings XML element.
 * Extracts configuration values for glue behavior, snap settings, grid options,
 * and document protection flags from the parsed Visio XML structure.
 *
 * @param {any} obj - The source DocumentSettings element from the parsed VSDX file.
 * @returns {VisioDocumentSettings} A populated VisioDocumentSettings instance with parsed numeric, boolean,
 *                                  and configuration values. Returns a new empty instance if input is null/undefined.
 *
 * @example
 * const settings = parseVisioDocumentSettings(docSettingsElement);
 * console.log(settings.glueSettings); // 0-3 (connection behavior)
 * console.log(settings.dynamicGridEnabled); // true or false
 *
 * @private
 */
export declare function parseVisioDocumentSettings(obj: any): VisioDocumentSettings;
/**
 * Parses a Visio master shape definition from the XML element.
 * Extracts master metadata including ID, name, type, and keywords from the
 * master element's attributes and PageSheet cell data.
 *
 * @param {MasterElement} obj - The source master element from the VSDX (includes $ attributes and optional PageSheet).
 * @returns {VisioMaster} A populated VisioMaster instance containing id, name, shapeType, and shape keywords.
 *                        Returns an empty instance if input is null or missing attributes.
 *
 * @example
 * const master = parseVisioMaster(masterElement);
 * console.log(`Master: ${master.name} (${master.id})`);
 * console.log(`Type: ${master.shapeType}`);
 *
 * @private
 */
export declare function parseVisioMaster(obj: MasterElement): VisioMaster;
/**
 * Parses a Visio page configuration from PageSheet data.
 * Extracts page-level properties including dimensions, scale settings, shadow configuration,
 * drawing settings, and layer definitions from the PageSheet's Cell and Section data.
 *
 * @param {VisioPageSheet | undefined} pageSheet - The Visio PageSheet object containing Cell array and optional Section array.
 * @returns {VisioPage} A VisioPage instance populated with parsed settings. Returns instance with empty layers if input is undefined.
 *
 * @example
 * const page = parseVisioPage(pageSheetData);
 * console.log(`Page dimensions: ${page.pageWidth} x ${page.pageHeight}`);
 * console.log(`Layers: ${page.layers.length}`);
 *
 * @private
 */
export declare function parseVisioPage(pageSheet: VisioPageSheet | undefined): VisioPage;
/**
 * Parses Visio window/view configuration and display settings.
 * Extracts viewport dimensions, zoom level, view center, and display toggle flags
 * (rulers, grid, guides, connection points, etc.) from the Window XML element.
 *
 * @param {WindowRootElement} root - The root Window element containing window configuration and child Window elements.
 * @returns {VisioWindow} A VisioWindow instance with parsed view settings. Returns instance with defaults if input is missing.
 *
 * @example
 * const window = parseVisioWindow(windowElement);
 * console.log(`View Scale: ${window.viewScale * 100}%`);
 * console.log(`Show Grid: ${window.showGrid}`);
 *
 * @private
 */
export declare function parseVisioWindow(root: WindowRootElement): VisioWindow;
/**
 * Ensures the value is returned as a ReadonlyArray.
 * Converts single values to single-element arrays, passes through existing arrays,
 * and returns undefined for undefined input.
 *
 * @template T - The type of array elements.
 * @param {ReadonlyArray<T> | T | undefined} value - The value to normalize (single item, array, or undefined).
 * @returns {ReadonlyArray<T> | undefined} The value as a ReadonlyArray, or undefined if input was undefined.
 *
 * @example
 * toReadonlyArray(5); // Returns [5]
 * toReadonlyArray([1, 2, 3]); // Returns [1, 2, 3]
 * toReadonlyArray(undefined); // Returns undefined
 *
 * @private
 */
export declare function toReadonlyArray<T>(value: ReadonlyArray<T> | T | undefined): ReadonlyArray<T> | undefined;
/**
 * Extracts known theme color hex strings from an a:clrScheme object.
 * Parses standard theme color definitions (dk1, lt1, dk2, lt2, accent1-6, hlink, folHlink)
 * and returns them as normalized hex strings with '#' prefix.
 *
 * @param {ParsedXmlObject} clrScheme - The raw a:clrScheme object (typically parsed XML converted to JS object).
 * @returns {Record<string, string | undefined> | undefined} An object mapping color names to hex strings (e.g., { dk1: "#FF0000", accent1: "#00FF00" }),
 *                                                            or undefined if input is not a valid object.
 *
 * @example
 * const colors = extractAndFormatColors(clrSchemeObj);
 * console.log(colors.accent1); // "#FF00AA"
 * console.log(colors.dk1); // "#000000"
 *
 * @private
 */
export declare function extractAndFormatColors(clrScheme: ParsedXmlObject): Record<string, string | undefined> | undefined;
/**
 * Builds an ordered list of fill style definitions from an a:fmtScheme's a:fillStyleLst.
 * Extracts the __order__ array from the fill style list to maintain the sequence of fill styles.
 *
 * @param {ParsedXmlObject} fmtScheme - The a:fmtScheme object (parsed XML to JS) that may contain a:fillStyleLst.
 * @returns {ReadonlyArray<OrderEntry> | undefined} Ordered array of fill style objects with name and value,
 *                                                                        or undefined if not found or fmtScheme is not an object.
 *
 * @private
 */
export declare function buildFmtSchemeFill(fmtScheme: ParsedXmlObject): ReadonlyArray<OrderEntry> | undefined;
/**
 * Builds an ordered list of line (stroke) style definitions from an a:fmtScheme's a:lnStyleLst.
 * Extracts the __order__ array from the line style list to maintain the sequence of stroke styles.
 *
 * @param {ParsedXmlObject} fmtScheme - The a:fmtScheme object (parsed XML to JS) that may contain a:lnStyleLst.
 * @returns {ReadonlyArray<OrderEntry> | undefined} Ordered array of line style objects with name and value,
 *                                                                        or undefined if not found or fmtScheme is not an object.
 *
 * @private
 */
export declare function buildFmtSchemeStroke(fmtScheme: ParsedXmlObject): ReadonlyArray<OrderEntry> | undefined;
/**
 * Parses a Visio theme definition from theme elements.
 * Comprehensive extraction of theme colors, fonts, gradients, and variation schemes
 * from a:clrScheme, a:fmtScheme, a:fontScheme, and extension elements.
 *
 * @param {ThemeElements} obj - The theme elements root parsed from VSDX (contains a:clrScheme, a:fmtScheme, a:fontScheme, a:extLst, etc.).
 * @param {ParsingContext} context - Parser utilities and environment for logging warnings and accessing parsing state (current page, page data).
 * @returns {VisioTheme} The parsed VisioTheme object containing colors, fonts, fills, strokes, gradients, and variation schemes.
 *
 * @example
 * const theme = parseVisioTheme(themeElements, context);
 * console.log(theme.fontFamily); // "Calibri"
 * console.log(theme.fontColor.accent1); // "#0563C1"
 * console.log(theme.hexColors); // ["#FF0000", "#00FF00", ...]
 *
 * @private
 */
export declare function parseVisioTheme(obj: ThemeElements, context: ParsingContext): VisioTheme;
/**
 * Parses node styling properties (fills, strokes, gradients) from a shape's raw XML object.
 * Extracts fill colors, stroke properties, gradient settings, patterns, and opacity
 * from the shape's Cell and Section data.
 *
 * @param {VisioShapeNode} shapeData - The raw shape XML object containing Cell array and optional Section array.
 * @param {ParsingContext} context - Parser utilities for logging warnings and accessing parsing state.
 * @param {MasterDefaultValues | undefined} defaultStyle - Optional default style data to fall back to for undefined properties.
 * @param {VisioShape} shape -  Parsed Visio shape(s) for the vertex node
 * @param {string} attributeName - The attribute name of the shape (e.g., 'Image', 'Shape') used to determine opacity handling.
 * @returns {VisioNodeStyle} A VisioNodeStyle object containing parsed fill, stroke, gradient, and opacity properties.
 *
 * @example
 * const nodeStyle = parseVisioNodeStyle(shapeData, context, defaultStyle, 'Shape');
 * console.log(`Stroke Width: ${nodeStyle.strokeWidth}px`);
 * console.log(`Fill Color: ${nodeStyle.fillColor}`);
 * console.log(`Gradient Angle: ${nodeStyle.gradientAngle}°`);
 *
 * @private
 */
export declare function parseVisioNodeStyle(shapeData: VisioShapeNode, context: ParsingContext, defaultStyle: MasterDefaultValues | undefined, shape: VisioShape, attributeName: string): VisioNodeStyle;
/**
 * Parses node shadow properties (outer shadow effect) from a cell map.
 * Extracts shadow pattern, type, opacity, color, and offset from the provided cell data.
 * Logs warnings about EJ2 shadow limitations during parsing.
 *
 * @param {Map<string, CellMapValue>} cellMap - A Map containing shadow-related cell values (ShdwPattern, ShdwForegnd, etc.).
 * @param {ParsingContext} context - Parser utilities for logging warnings.
 * @returns {VisioNodeShadow} A VisioNodeShadow object containing shadow properties, or default values if shadow is disabled.
 *
 * @example
 * const shadow = parseVisioNodeShadow(cellMap, context);
 * console.log(`Shadow Color: ${shadow.shadowcolor}`);
 * console.log(`Shadow Opacity: ${shadow.shadowOpacity}`);
 *
 * @private
 */
export declare function parseVisioNodeShadow(cellMap: Map<string, CellMapValue>, context: ParsingContext): VisioNodeShadow;
/**
 * Extracts media file relationships found under ../media/ targets.
 * Parses relationship XML elements to identify media resource references
 * (images, files, etc.) embedded in the Visio document.
 *
 * @param {OneOrMany<XmlRelationship>} relationshipInput - A single relationship object or array of relationship objects from the parsed XML.
 * @returns {VisioRelationship | undefined} A VisioRelationship object containing an array of media references with Id and Target,
 *                              or undefined if no media relationships are found.
 *
 * @example
 * const relationships = parserVisioRelationship(relElements);
 * relationships.media.forEach(m => console.log(`${m.Id}: ${m.Target}`));
 *
 * @private
 */
export declare function parserVisioRelationship(relationshipInput: OneOrMany<XmlRelationship>): VisioRelationship | undefined;
