// src/diagram/load-utility/visio-import-export/visio-model-parsers.ts
import { calculateShadowProperties, ensureArray, extractGradientStops, findCellValue, getCellMapBooleanValue, getCellMapNumericValue, getCellMapStringValue, getGradientVectorByAngle, getRadialGradient, isObject, mapCellValues, parseNumberCell, safeNumber, toBoolean } from './visio-core';
import { VisioDocumentSettings, VisioMaster, VisioNodeShadow, VisioNodeStyle, VisioPage, VisioRelationship, VisioWindow } from './visio-models';
import { resolveMasterSourceForNode } from './visio-nodes';
import { isValidColor } from './visio-theme';
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
export function setDefaultData(defaultDataValue, attributes) {
    var defaultData = defaultDataValue.find(function (obj) { return obj.masterID === attributes.Master; });
    if (!defaultData) {
        return {};
    }
    // Build a normalized object containing all relevant shape properties from the master definition
    var defaultValues = {
        Width: defaultData.Width,
        Height: defaultData.Height,
        LocPinX: defaultData.LocPinX,
        LocPinY: defaultData.LocPinY,
        Name: defaultData.shapeName,
        beginX: defaultData.beginX,
        beginY: defaultData.beginY,
        endX: defaultData.endX,
        endY: defaultData.endY,
        N: 'Geometry',
        Row: defaultData.Row,
        Ports: defaultData.ports,
        shapeStyle: defaultData.shapeStyle,
        txtWidth: defaultData.txtWidth,
        txtHeight: defaultData.txtHeight,
        txtPinX: defaultData.txtPinX,
        txtPinY: defaultData.txtPinY,
        txtLocalPinX: defaultData.txtLocalPinX,
        txtLocalPinY: defaultData.txtLocalPinY,
        QuickStyleLineColor: defaultData.QuickStyleLineColor,
        QuickStyleFillColor: defaultData.QuickStyleFillColor,
        QuickStyleShadowColor: defaultData.QuickStyleShadowColor,
        QuickStyleFontColor: defaultData.QuickStyleFontColor,
        QuickStyleLineMatrix: defaultData.QuickStyleLineMatrix,
        QuickStyleFillMatrix: defaultData.QuickStyleFillMatrix,
        QuickStyleEffectsMatrix: defaultData.QuickStyleEffectsMatrix,
        QuickStyleFontMatrix: defaultData.QuickStyleFontMatrix
    };
    return defaultValues;
}
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
export function getVisioPorts(shape, defaultData, width, height) {
    var ports = [];
    // Return empty array if shape has no Section element
    if (!shape.Section) {
        return ports;
    }
    var defaultMap = {};
    if (defaultData && defaultData.Ports && defaultData.Ports.length) {
        for (var _i = 0, _a = defaultData.Ports; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.id) {
                defaultMap[p.id] = p;
            }
        }
    }
    // Normalize Section to array format
    var sections = ensureArray(shape.Section);
    // Find the Connection section which contains port definitions
    var connSection = sections.find(function (s) { return s && s.$ && s.$.N === 'Connection'; });
    if (!connSection || !connSection.Row) {
        return ports;
    }
    // Normalize rows to array format
    var rows = ensureArray(connSection.Row);
    // Process each row to extract port properties
    rows.forEach(function (row) {
        if (row.$ && row.$.T === 'Connection') {
            var id = row.$.IX;
            var cells = ensureArray(row.Cell);
            // Initialize port with default values
            var port_1 = {
                id: "port" + id,
                x: 0, y: 0,
                dirX: 0, dirY: 0,
                type: 0, autoGen: 0, prompt: ''
            };
            // Use default port data if available from master definition
            var def = defaultMap[port_1.id];
            if (def) {
                port_1.x = def.x;
                port_1.y = def.y;
            }
            // Parse cell properties for this port
            cells.forEach(function (cell) {
                var name = cell.$.N;
                var value = cell.$.V; // Assert V to string for parseFloat/parseInt
                // Map cell names to port properties
                switch (name) {
                    case 'X':
                        port_1.x = (parseFloat(value)) / width;
                        break;
                    case 'Y':
                        // Invert Y coordinate based on shape height (Visio origin is bottom-left)
                        port_1.y = (height - parseFloat(value)) / height;
                        break;
                    case 'DirX':
                        port_1.dirX = parseFloat(value);
                        break;
                    case 'DirY':
                        port_1.dirY = parseFloat(value);
                        break;
                    case 'Type':
                        port_1.type = parseInt(value, 10);
                        break;
                    case 'AutoGen':
                        port_1.autoGen = parseInt(value, 10);
                        break;
                    case 'Prompt':
                        port_1.prompt = value;
                        break;
                }
            });
            ports.push(port_1);
        }
    });
    return ports;
}
/**
 * Helper function to read child value objects with strict typing.
 * Safely extracts the 'value' property from a cell object located at a specific key
 * in the parent object, with multiple levels of null/undefined checking.
 *
 * @param {ParsedXmlObject} parent - The parent object that may contain the keyed child object.
 * @param {string} key - The property name to read from the parent (e.g., 'GlueSettings').
 * @returns {string | undefined} The child object's 'value' property as a string, or undefined if not present or parent is null.
 *
 * @example
 * const glueValue = readCellValue(documentSettings, 'GlueSettings'); // Returns "1" or undefined
 *
 * @private
 */
function readCellValue(parent, key) {
    if (!parent) {
        return undefined;
    }
    // Access the cell object by key
    var cell = parent["" + key]; // Added type assertion
    if (!cell) {
        return undefined;
    }
    // Extract and return the value property
    if (typeof cell.value === 'undefined') {
        return undefined;
    }
    return cell.value;
}
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
export function parseVisioDocumentSettings(obj) {
    var settings = new VisioDocumentSettings();
    if (!obj) {
        return settings;
    }
    // Parse numeric settings (default to 0 if not found)
    settings.glueSettings = parseNumberCell(readCellValue(obj, 'GlueSettings'), 0);
    settings.snapSettings = parseNumberCell(readCellValue(obj, 'SnapSettings'), 0);
    settings.snapExtensions = parseNumberCell(readCellValue(obj, 'SnapExtensions'), 0);
    settings.snapAngles = parseNumberCell(readCellValue(obj, 'SnapAngles'), 0);
    // Parse boolean settings (default to false if not found)
    settings.dynamicGridEnabled = toBoolean(readCellValue(obj, 'DynamicGridEnabled'), false);
    settings.protectStyles = toBoolean(readCellValue(obj, 'ProtectStyles'), false);
    settings.protectShapes = toBoolean(readCellValue(obj, 'ProtectShapes'), false);
    settings.protectMasters = toBoolean(readCellValue(obj, 'ProtectMasters'), false);
    settings.protectBkgnds = toBoolean(readCellValue(obj, 'ProtectBkgnds'), false);
    return settings;
}
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
export function parseVisioMaster(obj) {
    var master = new VisioMaster();
    if (!obj || !obj.$) {
        return master;
    }
    // Extract PageSheet cells if present
    var pageSheetCell = obj.PageSheet ? ensureArray(obj.PageSheet.Cell) : [];
    // Extract master properties from XML attributes
    master.id = obj.$.ID;
    master.shape = obj.$.Name;
    master.shapeType = typeof obj.$.MasterType === 'string' ? obj.$.MasterType : '';
    master.name = obj.$.NameU;
    // Extract keywords from PageSheet cell data
    master.shapeKeywords = findCellValue(pageSheetCell, 'ShapeKeywords');
    return master;
}
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
export function parseVisioPage(pageSheet) {
    var page = new VisioPage();
    // Return defaults if PageSheet is missing or empty
    if (!pageSheet || !pageSheet.Cell) {
        page.layers = [];
        return page;
    }
    // Convert Cell array to a Map for efficient value lookup
    var cellMap = mapCellValues(ensureArray(pageSheet.Cell));
    // Parse numeric page properties
    page.pageWidth = getCellMapNumericValue(cellMap, 'PageWidth');
    page.pageHeight = getCellMapNumericValue(cellMap, 'PageHeight');
    page.shdwOffsetX = getCellMapNumericValue(cellMap, 'ShdwOffsetX');
    page.shdwOffsetY = getCellMapNumericValue(cellMap, 'ShdwOffsetY');
    page.pageScale = getCellMapNumericValue(cellMap, 'PageScale');
    page.drawingScale = getCellMapNumericValue(cellMap, 'DrawingScale');
    page.drawingSizeType = getCellMapNumericValue(cellMap, 'DrawingSizeType');
    page.drawingScaleType = getCellMapNumericValue(cellMap, 'DrawingScaleType');
    page.uiVisibility = getCellMapNumericValue(cellMap, 'UIVisibility');
    page.shdwType = getCellMapNumericValue(cellMap, 'ShdwType');
    page.shdwObliqueAngle = getCellMapNumericValue(cellMap, 'ShdwObliqueAngle');
    page.shdwScaleFactor = getCellMapNumericValue(cellMap, 'ShdwScaleFactor');
    page.drawingResizeType = getCellMapNumericValue(cellMap, 'DrawingResizeType');
    page.printPageOrientation = getCellMapNumericValue(cellMap, 'PrintPageOrientation');
    // Parse bridging/line jump settings with defaults
    page.bridging = getCellMapNumericValue(cellMap, 'LineJumpCode', 1);
    page.horizontalBridgeSpace = getCellMapNumericValue(cellMap, 'LineJumpFactorX', 0.6667);
    page.verticalBridgeSpace = getCellMapNumericValue(cellMap, 'LineJumpFactorY', 0.6667);
    page.theme = getCellMapNumericValue(cellMap, 'ThemeIndex');
    page.variationStyleIndex = getCellMapNumericValue(cellMap, 'VariationStyleIndex', 0);
    // Parse boolean properties
    page.inhibitSnap = getCellMapBooleanValue(cellMap, 'InhibitSnap');
    page.pageLockReplace = getCellMapBooleanValue(cellMap, 'PageLockReplace');
    page.pageLockDuplicate = getCellMapBooleanValue(cellMap, 'PageLockDuplicate');
    page.pageShapeSplit = getCellMapBooleanValue(cellMap, 'PageShapeSplit');
    // Parse string properties
    page.fillColor = getCellMapStringValue(cellMap, 'FillForegnd');
    page.lineRouteExt = getCellMapStringValue(cellMap, 'LineRouteExt', '0');
    page.routeStyle = getCellMapStringValue(cellMap, 'RouteStyle', '0');
    // Parse layer definitions from Section data
    page.layers = parseLayerSections(pageSheet.Section);
    return page;
}
/**
 * Extracts and parses all layers from the given page sections.
 * Searches for a Layer section within the sections collection and parses each
 * layer row to create VisioLayer objects.
 *
 * @param {OneOrMany<VisioSection> | undefined} sections - The PageSheet sections collection (single section or array).
 * @returns {VisioLayer[]} An array of parsed VisioLayer objects; empty array if no Layer section or sections are undefined.
 *
 * @private
 */
function parseLayerSections(sections) {
    if (!sections) {
        return [];
    }
    // Normalize sections to array format
    var sectionsArray = ensureArray(sections);
    // Find the Layer section
    var layerSection = sectionsArray.find(function (s) { return s && s.$ && s.$.N === 'Layer'; });
    // Return empty array if no Layer section or rows found
    if (!layerSection || !layerSection.Row) {
        return [];
    }
    // Parse each layer row and filter out any undefined results
    var rows = ensureArray(layerSection.Row);
    return rows.map(parseLayer).filter(Boolean); // Added type assertion for filter(Boolean)
}
/**
 * Parses a Visio layer definition from a single Layer row.
 * Extracts layer properties including name, color, visibility, printing,
 * and locking settings from the Cell data.
 *
 * @param {VisioRow | undefined} row - The Layer row containing Cell data with layer properties.
 * @returns {VisioLayer | undefined} The parsed VisioLayer object, or undefined if the row is invalid.
 *
 * @private
 */
function parseLayer(row) {
    if (!row || !row.Cell) {
        return undefined;
    }
    // Convert Cell array to Map for efficient value lookup
    var cellMap = mapCellValues(ensureArray(row.Cell));
    // Build and return layer object with parsed properties
    return {
        objects: [],
        name: getCellMapStringValue(cellMap, 'Name'),
        color: getCellMapNumericValue(cellMap, 'Color'),
        status: getCellMapNumericValue(cellMap, 'Status'),
        visible: getCellMapBooleanValue(cellMap, 'Visible', true),
        print: getCellMapBooleanValue(cellMap, 'Print', true),
        active: getCellMapBooleanValue(cellMap, 'Active'),
        lock: getCellMapBooleanValue(cellMap, 'Lock'),
        snap: getCellMapBooleanValue(cellMap, 'Snap', true),
        glue: getCellMapBooleanValue(cellMap, 'Glue', true),
        nameUniv: getCellMapStringValue(cellMap, 'NameU'),
        colorTrans: getCellMapNumericValue(cellMap, 'ColorTrans')
    };
}
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
export function parseVisioWindow(root) {
    var window = new VisioWindow();
    if (!root) {
        return window;
    }
    // Parse root-level attributes (client dimensions)
    if (root.$) {
        window.clientWidth = parseNumberCell(root.$.ClientWidth, 0);
        window.clientHeight = parseNumberCell(root.$.ClientHeight, 0);
    }
    // Find the Drawing type window from child windows
    var windows = ensureArray(root.Window);
    var drawing = windows.find(function (w) { return w && w.$ && w.$.WindowType === 'Drawing'; });
    if (!drawing) {
        return window;
    }
    // Parse drawing window attributes (dimensions and view settings)
    if (drawing.$) {
        window.windowType = drawing.$.WindowType;
        window.windowWidth = parseNumberCell(drawing.$.WindowWidth, 0);
        window.windowHeight = parseNumberCell(drawing.$.WindowHeight, 0);
        window.viewScale = parseNumberCell(drawing.$.ViewScale, 1);
        window.viewCenterX = parseNumberCell(drawing.$.ViewCenterX, 0);
        window.viewCenterY = parseNumberCell(drawing.$.ViewCenterY, 0);
    }
    // Parse boolean display toggle settings
    window.showRulers = toBoolean(readCellValue(drawing, 'ShowRulers'), false);
    window.showGrid = toBoolean(readCellValue(drawing, 'ShowGrid'), false);
    window.showPageBreaks = toBoolean(readCellValue(drawing, 'ShowPageBreaks'), false);
    window.showGuides = toBoolean(readCellValue(drawing, 'ShowGuides'), false);
    window.showConnectionPoints = toBoolean(readCellValue(drawing, 'ShowConnectionPoints'), false);
    window.dynamicGridEnabled = toBoolean(readCellValue(drawing, 'DynamicGridEnabled'), false);
    // Parse grid and snap settings
    window.glueSettings = parseNumberCell(readCellValue(drawing, 'GlueSettings'), 0);
    window.snapSettings = parseNumberCell(readCellValue(drawing, 'SnapSettings'), 0);
    window.snapExtensions = parseNumberCell(readCellValue(drawing, 'SnapExtensions'), 0);
    window.snapAngles = parseNumberCell(readCellValue(drawing, 'SnapAngles'), 0);
    window.tabSplitterPos = parseNumberCell(readCellValue(drawing, 'TabSplitterPos'), 0);
    return window;
}
/**
 * Clamps a number to the [min, max] range.
 * Returns the input value constrained within the specified minimum and maximum bounds.
 *
 * @param {number} n - The value to clamp.
 * @param {number} min - The minimum allowed value (inclusive).
 * @param {number} max - The maximum allowed value (inclusive).
 * @returns {number} The clamped value constrained within [min, max].
 *
 * @example
 * clamp(5, 0, 10); // Returns 5
 * clamp(-5, 0, 10); // Returns 0
 * clamp(15, 0, 10); // Returns 10
 *
 * @private
 */
function clamp(n, min, max) {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
}
/**
 * Normalizes a hex color string to the form "#RRGGBB" with uppercase hex digits.
 * Converts input like "ff00aa" to "#FF00AA", or returns undefined if input is invalid.
 *
 * @param {string | undefined} s - A hex color string (without '#'), or undefined.
 * @returns {string | undefined} A normalized hex string like "#FF00AA", or undefined if input is not a valid string or empty.
 *
 * @example
 * toHex('ff00aa'); // Returns '#FF00AA'
 * toHex(undefined); // Returns undefined
 * toHex(''); // Returns undefined
 *
 * @private
 */
function toHex(s) {
    if (typeof s !== 'string') {
        return undefined;
    }
    // Trim whitespace and check if empty
    var hex = s.trim();
    if (hex.length === 0) {
        return undefined;
    }
    // Return normalized format with '#' prefix and uppercase
    return '#' + hex.toUpperCase();
}
/**
 * Checks whether a ThemeExtension object has the specified property as its own property.
 * Uses Object.prototype.hasOwnProperty for strict own-property checking (not inherited).
 *
 * @param {ThemeExtension} ext - The extension object to inspect.
 * @param {ThemeExtension} key - The property key to test for.
 * @returns {boolean} True if the extension has the key as its own property; otherwise false.
 *
 * @private
 */
function extHas(ext, key) {
    return Object.prototype.hasOwnProperty.call(ext, key);
}
/**
 * Finds a ThemeExtension in the collection by matching its $.uri attribute.
 * Performs a linear search through the extensions array looking for a URI match.
 *
 * @param {ReadonlyArray<ThemeExtension> | undefined} exts - The collection of ThemeExtension objects to search.
 * @param {string} uri - The URI value to match against each extension's $.uri property.
 * @returns {ThemeExtension | undefined} The first matching extension, or undefined if not found or exts is undefined.
 *
 * @private
 */
function findExtByUri(exts, uri) {
    if (!exts) {
        return undefined;
    }
    // Linear search through extensions for matching URI
    for (var i = 0; i < exts.length; i++) {
        var e = exts[parseInt(i.toString(), 10)];
        if (e && e.$ && e.$.uri === uri) {
            return e;
        }
    }
    return undefined;
}
/**
 * Finds the first ThemeExtension in the collection that contains the given property key.
 * Performs a linear search through extensions looking for the first one with the specified key.
 *
 * @param {ReadonlyArray<ThemeExtension> | undefined} exts - The collection of ThemeExtension objects to search.
 * @param {ThemeExtension} key - The property key to look for using hasOwnProperty check.
 * @returns {ThemeExtension | undefined} The first extension containing the key, or undefined if none found or exts is undefined.
 *
 * @private
 */
function findExtWithKey(exts, key) {
    if (!exts) {
        return undefined;
    }
    // Linear search for first extension containing the key
    for (var i = 0; i < exts.length; i++) {
        var e = exts[parseInt(i.toString(), 10)];
        if (e && extHas(e, key)) {
            return e;
        }
    }
    return undefined;
}
/**
 * Extracts hex colors from a variation color scheme by reading vt:varColor1 through vt:varColor7.
 * Builds an array of normalized hex color strings ("#RRGGBB" format) in sequence order.
 *
 * @param {VariationClrScheme | undefined} variation - The variation color scheme node containing vt:varColor properties.
 * @param {ProcessedColor[]} themeVariants - Optional array to populate with ProcessedColor objects for each extracted color.
 * @returns {string[]} An array of normalized hex colors (e.g., ["#FF00AA", "#00FF00"]), or empty array if input is undefined.
 *
 * @private
 */
function extractHexColorsFromVariation(variation, themeVariants) {
    if (!variation) {
        return [];
    }
    var result = [];
    // Extract colors 1-7 in sequence
    for (var i = 1; i <= 7; i++) {
        var key = ('vt:varColor' + i);
        var color = variation["" + key];
        // Navigate nested structure to find srgbClr value
        var val = color && color['a:srgbClr'] && color['a:srgbClr'].$ ? color['a:srgbClr'].$.val : undefined; // Assert to string
        var hex = toHex(val);
        if (typeof hex === 'string') {
            result.push(hex);
            // Populate the themeVariants array with ProcessedColor objects if provided
            if (themeVariants) {
                themeVariants.push(createProcessedColor(hex));
            }
        }
    }
    return result;
}
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
export function toReadonlyArray(value) {
    if (typeof value === 'undefined') {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}
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
export function extractAndFormatColors(clrScheme) {
    if (!isObject(clrScheme)) {
        return undefined;
    }
    /**
     * Helper function to extract hex value from a:srgbClr or a:schemeClr nodes.
     * Attempts to find a color value in either sRGB or scheme color format.
     *
     * @param {ParsedXmlObject | undefined} node - The node to inspect for color values.
     * @returns {string | undefined} Normalized hex string or undefined.
     */
    function getHex(node) {
        if (!isObject(node)) {
            return undefined;
        }
        var srgb = node['a:srgbClr'];
        var scheme = node['a:schemeClr'];
        var val = undefined;
        // Try to extract from sRGB color node
        if (isObject(srgb) && isObject(srgb.$)) {
            val = srgb.$.val;
        }
        // Fall back to scheme color node
        else if (isObject(scheme) && isObject(scheme.$)) {
            val = scheme.$.val;
        }
        // Return normalized hex if value is non-empty string
        if (typeof val === 'string' && val.length > 0) {
            return '#' + val.toUpperCase();
        }
        return undefined;
    }
    // Build result object mapping each standard theme color name to its hex value
    var result = {
        dk1: getHex(clrScheme['a:dk1']),
        lt1: getHex(clrScheme['a:lt1']),
        dk2: getHex(clrScheme['a:dk2']),
        lt2: getHex(clrScheme['a:lt2']),
        accent1: getHex(clrScheme['a:accent1']),
        accent2: getHex(clrScheme['a:accent2']),
        accent3: getHex(clrScheme['a:accent3']),
        accent4: getHex(clrScheme['a:accent4']),
        accent5: getHex(clrScheme['a:accent5']),
        accent6: getHex(clrScheme['a:accent6']),
        hlink: getHex(clrScheme['a:hlink']),
        folHlink: getHex(clrScheme['a:folHlink']) // Added type assertion
    };
    return result;
}
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
export function buildFmtSchemeFill(fmtScheme) {
    if (!isObject(fmtScheme)) {
        return undefined;
    }
    // Access the fill style list
    var lst = fmtScheme['a:fillStyleLst'];
    if (!isObject(lst)) {
        return undefined;
    }
    // Return the ordered list of fill styles
    return lst['__order__']; // Changed to OrderEntry
}
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
export function buildFmtSchemeStroke(fmtScheme) {
    if (!isObject(fmtScheme)) {
        return undefined;
    }
    // Access the line style list
    var lst = fmtScheme['a:lnStyleLst'];
    if (!isObject(lst)) {
        return undefined;
    }
    // Return the ordered list of stroke styles
    return lst['__order__']; // Changed to OrderEntry
}
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
export function parseVisioTheme(obj, context) {
    var theme = {};
    // ==================== Extract Color Scheme Extensions ====================
    // Collect extensions under a:clrScheme -> a:extLst -> a:ext[]
    var clrExts = undefined;
    var clrScheme = obj['a:clrScheme'];
    if (isObject(clrScheme)) {
        var extLst = clrScheme['a:extLst']; // Refined type
        if (extLst && isObject(extLst)) {
            var exts = extLst['a:ext'];
            clrExts = toReadonlyArray(exts);
        }
    }
    // ==================== Extract Root Extensions ====================
    // Collect extensions under a:extLst -> a:ext[] (root level)
    var rootExts = undefined;
    var rootExtList = obj['a:extLst']; // Added undefined
    var rootExtsRaw;
    if (isObject(rootExtList)) {
        rootExtsRaw = rootExtList['a:ext'];
        rootExts = toReadonlyArray(rootExtsRaw);
    }
    // ==================== Extract Scheme Enum ====================
    // Parse vt:schemeID from clrScheme extensions
    var schemeIdExt = rootExtsRaw[1]['vt:themeScheme'];
    if (schemeIdExt &&
        isObject(schemeIdExt['vt:schemeID']) &&
        isObject(schemeIdExt['vt:schemeID'].$)) {
        var schemeAttrs = schemeIdExt['vt:schemeID'].$;
        var schemeEnumVal = schemeAttrs.schemeEnum;
        if (typeof schemeEnumVal === 'string') {
            theme.schemeEnum = schemeEnumVal;
        }
    }
    // ==================== Extract Format Scheme Name ====================
    // Parse theme name from a:fmtScheme.$.name
    var fmtScheme = obj['a:fmtScheme']; // Added undefined
    if (isObject(fmtScheme) && isObject(fmtScheme.$)) {
        var fmtAttrs = fmtScheme.$;
        var nameVal = fmtAttrs.name;
        if (typeof nameVal === 'string') {
            theme.name = nameVal;
        }
    }
    // ==================== Extract Font Family ====================
    // Parse primary font typeface from a:fontScheme -> a:majorFont -> a:latin -> $.typeface
    var fontScheme = obj['a:fontScheme'];
    if (isObject(fontScheme)) {
        var major = fontScheme['a:majorFont']; // Used new interface, added undefined
        if (isObject(major)) {
            var latin = major['a:latin']; // Added undefined
            if (isObject(latin) && isObject(latin.$)) {
                var latinAttrs = latin.$;
                var typeface = latinAttrs.typeface;
                if (typeof typeface === 'string') {
                    theme.fontFamily = typeface;
                }
            }
        }
    }
    // ==================== Extract Font Colors ====================
    // Extract all standard theme colors from a:clrScheme
    theme.fontColor = extractAndFormatColors(obj['a:clrScheme']); // Assert to ParsedXmlObject
    // ==================== Extract Fill Styles ====================
    // Build ordered array of fill style definitions from a:fmtScheme -> a:fillStyleLst
    if (isObject(fmtScheme)) {
        var fillOrder = buildFmtSchemeFill(fmtScheme); // Changed to OrderEntry and asserted fmtScheme
        if (fillOrder && fillOrder.length > 0) {
            theme.fmtSchemeFill = fillOrder;
        }
    }
    // ==================== Extract Line (Stroke) Styles ====================
    // Build ordered array of line style definitions from a:fmtScheme -> a:lnStyleLst
    if (isObject(fmtScheme)) {
        var lnOrder = buildFmtSchemeStroke(fmtScheme); // Changed to OrderEntry and asserted fmtScheme
        if (lnOrder && lnOrder.length > 0) {
            theme.fmtSchemeStroke = lnOrder;
        }
    }
    // ==================== Extract Font Styles + Connector Fonts ====================
    // Parse vt:fontStylesGroup under root extensions (with URI fallback)
    var fontStylesUri = '{EBE24D50-EC5C-4D6F-A1A3-C5F0A18B936A}';
    var fontStylesExt = findExtByUri(rootExts, fontStylesUri);
    if (!fontStylesExt) {
        fontStylesExt = findExtWithKey(rootExts, 'vt:fontStylesGroup');
    }
    if (fontStylesExt && isObject(fontStylesExt['vt:fontStylesGroup'])) {
        var group = fontStylesExt['vt:fontStylesGroup'];
        // Extract regular font styles
        var vtFontStyles = group['vt:fontStyles'];
        if (isObject(vtFontStyles) && isObject(vtFontStyles['vt:fontProps'])) {
            var fontProps = vtFontStyles['vt:fontProps'];
            var fontPropsArr = toReadonlyArray(fontProps);
            if (fontPropsArr && fontPropsArr.length > 0) {
                theme.fontStyles = fontPropsArr;
            }
        }
        // Extract connector-specific font styles
        var vtConnectorFontStyles = group['vt:connectorFontStyles'];
        if (isObject(vtConnectorFontStyles) &&
            isObject(vtConnectorFontStyles['vt:fontProps'])) {
            var connProps = vtConnectorFontStyles['vt:fontProps'];
            var connPropsArr = toReadonlyArray(connProps);
            if (connPropsArr && connPropsArr.length > 0) {
                theme.connectorFont = connPropsArr;
            }
        }
    }
    // ==================== Extract Connector Stroke Styles ====================
    // Parse vt:fmtConnectorScheme -> a:lnStyleLst for connector-specific line styles
    var fmtConnectorExt = findExtWithKey(rootExts, 'vt:fmtConnectorScheme');
    if (fmtConnectorExt && isObject(fmtConnectorExt['vt:fmtConnectorScheme'])) {
        var fmtConn = fmtConnectorExt['vt:fmtConnectorScheme'];
        if (isObject(fmtConn['a:lnStyleLst'])) {
            theme.connectorStroke = fmtConn['a:lnStyleLst'];
        }
    }
    // ==================== Extract Variation Color Schemes ====================
    // Parse vt:variationClrSchemeLst under clrScheme extensions (with URI fallback)
    var variationClrUri = '{DDD2D869-C2EF-471E-B8FA-914AFA308C9F}';
    var variationClrExt = findExtByUri(clrExts, variationClrUri);
    if (!variationClrExt) {
        variationClrExt = findExtWithKey(clrExts, 'vt:variationClrSchemeLst');
    }
    var colorVariations = [];
    if (variationClrExt &&
        isObject(variationClrExt['vt:variationClrSchemeLst']) &&
        isObject(variationClrExt['vt:variationClrSchemeLst']['vt:variationClrScheme'])) {
        var v = variationClrExt['vt:variationClrSchemeLst']['vt:variationClrScheme'];
        var vArr = toReadonlyArray(v);
        if (vArr && vArr.length > 0) {
            colorVariations = vArr;
        }
    }
    // ==================== Extract Variation Style Schemes ====================
    // Parse vt:variationStyleSchemeLst under root extensions (with URI fallback)
    var variationStyleUri = '{494CE47F-D151-47DC-95E8-85652EA8A67E}';
    var variationStyleExt = findExtByUri(rootExts, variationStyleUri);
    if (!variationStyleExt) {
        variationStyleExt = findExtWithKey(rootExts, 'vt:variationStyleSchemeLst');
    }
    var variationStyleSchemes = [];
    if (variationStyleExt &&
        isObject(variationStyleExt['vt:variationStyleSchemeLst']) &&
        isObject(variationStyleExt['vt:variationStyleSchemeLst']['vt:variationStyleScheme'])) {
        var s = variationStyleExt['vt:variationStyleSchemeLst']['vt:variationStyleScheme'];
        var sArr = toReadonlyArray(s);
        if (sArr && sArr.length > 0) {
            variationStyleSchemes = sArr;
        }
    }
    // ==================== Resolve Requested Index ====================
    // Parse the variationStyleIndex from context to determine which variation to use
    var requestedIndex = 0;
    if (context && context.data && Array.isArray(context.data.pages) && context.data.pages.length > 0) {
        if (context.currentPage &&
            typeof context.currentPage.variationStyleIndex !== 'undefined') {
            var raw = context.currentPage.variationStyleIndex;
            var toParse = typeof raw === 'number' ? String(raw) : String(raw);
            var parsed = parseInt(toParse, 10);
            if (!isNaN(parsed)) {
                requestedIndex = parsed;
            }
        }
    }
    // ==================== Select Variation Color Scheme ====================
    // Choose variation color scheme by clamped index (safe bounds checking)
    var varIndex = colorVariations.length > 0 ? clamp(requestedIndex, 0, colorVariations.length - 1) : 0;
    var chosenVariation = undefined; // Added undefined
    if (colorVariations.length > varIndex) {
        chosenVariation = colorVariations[parseInt(varIndex.toString(), 10)];
    }
    // ==================== Select Variation Style Scheme ====================
    // Choose variation style scheme by clamped index and extract variant styles
    var styleIndex = variationStyleSchemes.length > 0
        ? clamp(requestedIndex, 0, variationStyleSchemes.length - 1)
        : 0;
    if (variationStyleSchemes.length > styleIndex) {
        var chosenStyle = variationStyleSchemes[parseInt(styleIndex.toString(), 10)];
        if (isObject(chosenStyle)) {
            var varStyle = chosenStyle['vt:varStyle'];
            var varStyleArr = toReadonlyArray(varStyle);
            if (varStyleArr && varStyleArr.length > 0) {
                theme.variant = varStyleArr;
            }
        }
    }
    // ==================== Extract Hex Colors from Variation ====================
    // Extract vt:varColor1..vt:varColor7 hex values from the chosen variation scheme
    theme.hexColors = extractHexColorsFromVariation(chosenVariation);
    // ==================== ENHANCED THEME PROCESSING ====================
    // Build richer theme helpers so the rest of the importer can resolve
    // quick-style matrices and color ids into concrete hex values.
    theme.baseColors = extractAndFormatColors(obj['a:clrScheme']);
    // ==================== Process Fill Styles ====================
    // Transform extracted fill definitions into ProcessedColor objects using baseColors
    if (theme.fmtSchemeFill && Array.isArray(theme.fmtSchemeFill)) {
        var fillStyles = [];
        for (var _i = 0, _a = theme.fmtSchemeFill; _i < _a.length; _i++) {
            var fillItem = _a[_i];
            fillStyles.push(transformStyle(fillItem, theme.baseColors));
        }
        theme.fillStyles = fillStyles;
    }
    // ==================== Process Line Styles ====================
    // Transform extracted line style definitions into processed stroke objects
    if (theme.fmtSchemeStroke && Array.isArray(theme.fmtSchemeStroke)) {
        var lineStyles = [];
        for (var _b = 0, _c = theme.fmtSchemeStroke; _b < _c.length; _b++) {
            var lineItem = _c[_b];
            lineStyles.push(transformLineStyle(lineItem, theme.baseColors));
        }
        theme.lineStyles = lineStyles;
    }
    // ==================== Process Connector Fill Styles ====================
    // Extract and transform connector-specific fill styles
    var fmtConnectorExt2 = findExtWithKey(rootExts, 'vt:fmtConnectorScheme');
    if (fmtConnectorExt2 && isObject(fmtConnectorExt2['vt:fmtConnectorScheme'])) {
        var fmtConn = fmtConnectorExt2['vt:fmtConnectorScheme'];
        // Process connector fill styles
        if (isObject(fmtConn['a:fillStyleLst'])) {
            var connFillStyles = [];
            var fillLst = fmtConn['a:fillStyleLst'];
            for (var key in fillLst) {
                if (key !== '$' && fillLst.hasOwnProperty(key)) {
                    var items = toReadonlyArray(fillLst["" + key]);
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            connFillStyles.push(transformStyle({ name: key, value: items[parseInt(i.toString(), 10)] }, theme.baseColors));
                        }
                    }
                }
            }
            if (connFillStyles.length > 0) {
                theme.connFillStyles = connFillStyles;
            }
        }
        // Process connector line styles
        if (isObject(fmtConn['a:lnStyleLst'])) {
            var connLineStyles = [];
            var lnLst = fmtConn['a:lnStyleLst'];
            for (var key in lnLst) {
                if (key !== '$' && lnLst.hasOwnProperty(key)) {
                    var items = toReadonlyArray(lnLst["" + key]);
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            connLineStyles.push({ name: key, value: items[parseInt(i.toString(), 10)] });
                        }
                    }
                }
            }
            if (connLineStyles.length > 0) {
                theme.connLineStyles = connLineStyles;
            }
        }
    }
    // ==================== Process Extended Line Styles ====================
    // Extract extended line style definitions for scheme and connectors
    var lineStylesExt = findExtWithKey(rootExts, 'vt:lineStyles');
    if (lineStylesExt && isObject(lineStylesExt['vt:lineStyles'])) {
        var lineStyles2 = lineStylesExt['vt:lineStyles'];
        // Connector line styles extended
        if (isObject(lineStyles2['vt:fmtConnectorSchemeLineStyles'])) {
            var connLnExt = [];
            var connLnExtObj = lineStyles2['vt:fmtConnectorSchemeLineStyles'];
            for (var key in connLnExtObj) {
                if (key !== '$' && connLnExtObj.hasOwnProperty(key)) {
                    var items = toReadonlyArray(connLnExtObj["" + key]);
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            connLnExt.push({ name: key, value: items[parseInt(i.toString(), 10)] });
                        }
                    }
                }
            }
            if (connLnExt.length > 0) {
                theme.connLineStylesExt = connLnExt;
            }
        }
        // Scheme line styles extended
        if (isObject(lineStyles2['vt:fmtSchemeLineStyles'])) {
            var lineExtArr = [];
            var lineExtObj = lineStyles2['vt:fmtSchemeLineStyles'];
            for (var key in lineExtObj) {
                if (key !== '$' && lineExtObj.hasOwnProperty(key)) {
                    var items = toReadonlyArray(lineExtObj["" + key]);
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            lineExtArr.push({ name: key, value: items[parseInt(i.toString(), 10)] });
                        }
                    }
                }
            }
            if (lineExtArr.length > 0) {
                theme.lineStylesExt = lineExtArr;
            }
        }
    }
    // ==================== Extract Font Colors ====================
    // Extract all node-specific font colors from fontStyles
    if (theme.fontStyles && Array.isArray(theme.fontStyles)) {
        var fontStyles = [];
        for (var i = 0; i < theme.fontStyles.length; i++) {
            fontStyles.push(transformStyle(theme.fontStyles[parseInt(i.toString(), 10)], theme.baseColor));
        }
        theme.fontColorsArray = fontStyles;
    }
    // ==================== Extract Font Colors ====================
    // Extract all connector-specific font colors from connectorFont
    if (theme.connectorFont && Array.isArray(theme.connectorFont)) {
        var fontStyles = [];
        for (var i = 0; i < theme.connectorFont.length; i++) {
            fontStyles.push(transformStyle(theme.connectorFont[parseInt(i.toString(), 10)], theme.baseColor));
        }
        theme.connFontColors = fontStyles;
    }
    // ==================== Initialize Variant Color Arrays ====================
    // Pre-process all variant colors (not just the chosen one)
    theme.variantsColors = [];
    if (colorVariations && colorVariations.length > 0) {
        for (var i = 0; i < colorVariations.length; i++) {
            theme.variantsColors.push(([]));
            extractHexColorsFromVariation(colorVariations[parseInt(i.toString(), 10)], theme.variantsColors[parseInt(i.toString(), 10)]);
        }
    }
    // ==================== Build Variant Index Arrays ====================
    // Build 2D index arrays for fill, line, effect, and font styles across all variations
    theme.variantFillIdx = [];
    if (variationStyleSchemes && variationStyleSchemes.length > 0) {
        for (var k = 0; k < variationStyleSchemes.length; k++) {
            var scheme = variationStyleSchemes[parseInt(k.toString(), 10)];
            if (isObject(scheme)) {
                var varientStyle = scheme['vt:varStyle'];
                var variantStyleArray = toReadonlyArray(varientStyle);
                var fillRow = [];
                if (variantStyleArray && variantStyleArray.length > 0) {
                    for (var j = 0; j < variantStyleArray.length; j++) {
                        var item = variantStyleArray[parseInt(j.toString(), 10)];
                        var attrs = (item && item.$)
                            ? item.$ : {};
                        fillRow.push((attrs.fillIdx ? parseInt(attrs.fillIdx, 10) : 0));
                    }
                }
                theme.variantFillIdx.push(fillRow);
            }
        }
    }
    // ==================== Extract Monotone Variant Flags ====================
    // Extract monotone flags for each color variation
    theme.isMonotoneVariant = [false, false, false, false];
    if (colorVariations && colorVariations.length > 0) {
        for (var m = 0; m < Math.min(colorVariations.length, 4); m++) {
            var variation = colorVariations[parseInt(m.toString(), 10)];
            if (variation && variation.$ && variation.$.monotone) {
                theme.isMonotoneVariant[parseInt(m.toString(), 10)] = true;
            }
        }
    }
    // Set theme variant indices (default to 0)
    theme.themeVariantClr = requestedIndex;
    theme.themeVariantStl = requestedIndex;
    return theme;
}
/**
 * Converts a hexadecimal color string to RGB components.
 * Strips the '#' prefix if present and extracts red, green, and blue values using bitwise operations.
 *
 * @param {string} hex - A hexadecimal color string (e.g., '#FF0000' or 'FF0000').
 * @returns {{red: number, green: number, blue: number}} Object containing RGB components in range [0, 255].
 *
 * @example
 * const rgb = hexToRgb('#FF0000');
 * console.log(rgb); // { red: 255, green: 0, blue: 0 }
 *
 * @private
 */
function hexToRgb(hex) {
    var cleanHex = hex.replace(/^#/, '');
    var num = parseInt(cleanHex, 16);
    return {
        red: (num >> 16) & 255,
        green: (num >> 8) & 255,
        blue: num & 255
    };
}
/**
 * Creates a fully initialized ProcessedColor object from a hexadecimal color value.
 * Initializes all color modifier fields to 0 and sets the resolved RGB color.
 *
 * @param {string} hexColor - A hexadecimal color string (e.g., '#FF0000').
 * @returns {ProcessedColor} A ProcessedColor object with all fields initialized and RGB resolved.
 *
 * @private
 */
function createProcessedColor(hexColor) {
    var rgb = hexToRgb(hexColor);
    return {
        tint: 0,
        shade: 0,
        comp: 0,
        inv: 0,
        gray: 0,
        alpha: 0,
        alphaOff: 0,
        alphaMod: 0,
        hue: 0,
        hueOff: 0,
        hueMod: 0,
        sat: 0,
        satOff: 0,
        satMod: 0,
        lum: 0,
        lumOff: 0,
        lumMod: 0,
        red: 0,
        redOff: 0,
        redMod: 0,
        green: 0,
        greenOff: 0,
        greenMod: 0,
        blue: 0,
        blueOff: 0,
        blueMod: 0,
        gamma: 0,
        invGamma: 0,
        isDynamic: false,
        isInitialized: false,
        hasEffects: false,
        color: {
            red: rgb.red,
            green: rgb.green,
            blue: rgb.blue,
            gradientClr: null
        },
        hexVal: hexColor.replace(/^#/, '').toUpperCase()
    };
}
/**
 * Creates a ColorRef object for a scheme color reference (not yet resolved to RGB).
 * Initializes all color modifier fields and stores the scheme color name for later resolution.
 *
 * @param {string} val - The scheme color name (e.g., 'accent1').
 * @param {ColorModifiers} modifiers - The color modifiers (tint, shade, hasEffects).
 * @returns {ColorRef} A ColorRef object with scheme color reference and modifiers.
 *
 * @private
 */
function createColorRef(val, modifiers) {
    return {
        tint: modifiers.tint || 0,
        shade: modifiers.shade || 0,
        comp: 0,
        inv: 0,
        gray: 0,
        alpha: 0,
        alphaOff: 0,
        alphaMod: 0,
        hue: 0,
        hueOff: 0,
        hueMod: modifiers.hueMod || 0,
        sat: 0,
        satOff: 0,
        satMod: modifiers.satMod || 0,
        lum: 0,
        lumOff: 0,
        lumMod: modifiers.lumMod || 0,
        red: 0,
        redOff: 0,
        redMod: 0,
        green: 0,
        greenOff: 0,
        greenMod: 0,
        blue: 0,
        blueOff: 0,
        blueMod: 0,
        gamma: 0,
        invGamma: 0,
        isDynamic: true,
        isInitialized: false,
        hasEffects: modifiers.hasEffects || false,
        color: null,
        val: val
    };
}
/**
 * Extracts color modifiers (tint and shade) from an XML color node.
 * Parses a:tint and a:shade elements and converts from 1000-based scale to decimal range.
 *
 * @param {SchemeColor} colorObj - The XML color object containing potential a:tint and a:shade elements.
 * @returns {ColorModifiers} Object with tint, shade, and hasEffects properties.
 *
 * @private
 */
function extractColorModifiers(colorObj) {
    var modifiers = { hasEffects: false };
    extractModifier(colorObj, 'a:tint', modifiers, 'tint');
    extractModifier(colorObj, 'a:shade', modifiers, 'shade');
    extractModifier(colorObj, 'a:satMod', modifiers, 'satMod');
    extractModifier(colorObj, 'a:lumMod', modifiers, 'lumMod');
    extractModifier(colorObj, 'a:hueMod', modifiers, 'hueMod');
    return modifiers;
}
/**
 * Extracts a specific color modifier from an XML color node.
 * Looks for the given XML key (e.g., a:tint, a:shade) and converts
 * its 1000-based scale value into a decimal range.
 *
 * @param {SchemeColor} colorObj - The XML color object containing modifier elements.
 * @param {string} xmlKey - The XML element name to extract (e.g., 'a:tint', 'a:shade').
 * @param {ColorModifiers} modifiers - The modifiers object to update with extracted values.
 * @param {string} modifierName - The property name to assign the extracted value to in `modifiers`.
 * @returns {void}
 *
 * @private
 */
function extractModifier(colorObj, xmlKey, modifiers, modifierName) {
    if (colorObj["" + xmlKey]) {
        var val = colorObj["" + xmlKey].$.val || '0';
        modifiers["" + modifierName] = parseInt(val, 10) / 1000;
        modifiers.hasEffects = true;
    }
}
/**
 * Transforms a raw data entry into a processed color object with resolved colors.
 * Handles both direct RGB fills and scheme color references.
 *
 * @param {Partial<OrderEntry>} colorElem - The Raw data to be converted as color element.
 * @param {Record<string, string>} baseColors - Base color map for reference resolution.
 * @returns {TransformedColorRef} Processed color object with optional color and value properties.
 *
 * @private
 */
function transformStyle(colorElem, baseColors) {
    var result = {};
    if (colorElem && colorElem.name) {
        result.name = colorElem.name;
    }
    var value;
    if (colorElem && colorElem['vt:color']) {
        value = colorElem['vt:color'];
    }
    else if (colorElem && colorElem.value) {
        value = colorElem.value;
    }
    if (value) {
        // Handle direct RGB color
        if (value['a:srgbClr']) {
            var hexVal = value['a:srgbClr'].$.val;
            if (hexVal) {
                result.color = createProcessedColor('#' + hexVal);
            }
        }
        // Handle scheme color reference
        if (value['a:schemeClr']) {
            var schemeVal = value['a:schemeClr'].$.val;
            var modifiers = extractColorModifiers(value['a:schemeClr']);
            if (schemeVal) {
                result.color = createColorRef(schemeVal, modifiers);
            }
        }
        // Preserve gradient data if present
        if (value['a:gsLst']) {
            result.value = value;
        }
    }
    return result;
}
/**
 * Transforms a line (stroke) style entry into a processed stroke object with properties and colors.
 * Extracts line width, dash pattern, cap style, and fill color.
 *
 * @param {StrokeItem} strokeItem - The line item with optional attributes and color/dash properties.
 * @param {Record<string, string>} baseColors - Base color map for reference resolution.
 * @returns {LineStyleRef} Processed stroke object with all line properties.
 *
 * @private
 */
function transformLineStyle(strokeItem, baseColors) {
    var result = {
        isLineDashed: false,
        lineDashPattern: [],
        isRoundJoin: false,
        isBevelJoin: false,
        isMiterJoin: false,
        lineWidth: 0,
        lineCap: null,
        lineComp: 0,
        fillStyle: null,
        headEndType: null,
        headEndWidth: 0,
        headEndLen: 0,
        tailEndType: null,
        tailEndWidth: 0,
        tailEndLen: 0
    };
    // Extract line width and cap style from attributes
    if (strokeItem.$) {
        var attributes = strokeItem.$;
        result.lineWidth = parseInt(attributes.w || '0', 10);
        result.lineCap = attributes.cap === 'rnd' ? 0 : attributes.cap === 'sq' ? 1 : null;
    }
    // Extract dash pattern
    if (strokeItem['a:prstDash']) {
        var dashVal = strokeItem['a:prstDash'].$.val;
        result.isLineDashed = dashVal && dashVal !== 'solid';
    }
    // Extract fill color from solid fill
    if (strokeItem['a:solidFill']) {
        result.fillStyle = transformStyle({ value: strokeItem['a:solidFill'] }, baseColors);
    }
    return result;
}
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
export function parseVisioNodeStyle(shapeData, context, defaultStyle, shape, attributeName) {
    // Normalize Section array
    var section = shapeData.Section ? (Array.isArray(shapeData.Section) ? shapeData.Section : [shapeData.Section]) : [];
    /**
     * Helper to retrieve a cell value by name from the shape's Cell array.
     *
     * @param {string} name - The cell name to find (e.g., 'LineWeight').
     * @returns {string | undefined} The cell value or undefined if not found.
     */
    var getCell = function (name) {
        var cell = ensureArray(shapeData.Cell).find(function (c) { return c.$.N === name; }); // Used ensureArray and VisioCell
        return cell ? cell.$.V : undefined; // Assert to string
    };
    var getMasterCell = function (name) {
        var masterSource = resolveMasterSourceForNode(shapeData, context);
        var masterCell;
        var objectStyleSheet;
        var styleName;
        switch (name) {
            case 'LineColor':
                styleName = 'LineStyle';
                break;
            case 'FillForegnd':
                styleName = 'FillStyle';
                break;
        }
        if (!context || !context.entries || !context.entries.RootDocument || !context.entries.RootDocument.StyleSheets
            || !context.entries.RootDocument.StyleSheets.StyleSheet) {
            return undefined;
        }
        var styleSheets = context.entries.RootDocument.StyleSheets.StyleSheet;
        if (masterSource && masterSource.$ && masterSource.$["" + styleName] && styleSheets && styleSheets.length > 1) {
            objectStyleSheet = styleSheets.find(function (sheet) { return sheet && sheet.$ && sheet.$.ID === masterSource.$["" + styleName]; });
        }
        if (shapeData && masterSource && masterSource.Cell) {
            masterCell = ensureArray(masterSource.Cell).find(function (c) { return c.$.N === name; });
        }
        if (masterCell && masterCell.$ && masterCell.$.V) {
            return context.propertyManager.getColor(masterCell.$.V);
        }
        if (objectStyleSheet && objectStyleSheet.Cell) {
            var cell = ensureArray(objectStyleSheet.Cell).find(function (c) { return c.$.N === name; });
            if (cell && cell.$ && cell.$.V && isValidColor(cell.$.V)) {
                return cell.$.V;
            }
            return undefined;
        }
        else {
            return undefined;
        }
    };
    // Initialize the node style object
    var nodeStyle = new VisioNodeStyle();
    var lineColor = getCell('LineColor');
    var masterLineColor = getMasterCell('LineColor');
    // ==================== Parse Stroke Properties ====================
    nodeStyle.strokeWidth = getCell('LineWeight') != null ? Number(getCell('LineWeight')) : undefined;
    nodeStyle.linePattern = getCell('LinePattern') != null ? getCell('LinePattern') : undefined;
    nodeStyle.strokeColor = lineColor != null ? (nodeStyle.linePattern !== '0' ? lineColor : undefined) : masterLineColor != null ? masterLineColor : undefined;
    nodeStyle.strokeDashArray = getCell('LinePattern') != null ? getCell('LinePattern') : undefined;
    // Log warning about partial pattern matching between Visio and EJ2
    if (getCell('LinePattern') != null) {
        context.addWarning('[WARNING] :: The dashed patterns in EJ2 partially match those in Visio. While the patterns themselves are similar, their appearance, particularly when adjusting the stroke width, is not identical.');
    }
    // ==================== Parse Fill Properties ====================
    nodeStyle.fillColor = getCell('FillForegnd') != null ? getCell('FillForegnd') : getMasterCell('FillForegnd') != null ? getMasterCell('FillForegnd') : getFillColor(shape, context);
    nodeStyle.fillPattern = getCell('FillPattern') != null ? getCell('FillPattern') : (defaultStyle && defaultStyle.FillPattern) ? defaultStyle.FillPattern : undefined;
    // ==================== Parse Opacity ====================
    // Image shapes use Transparency; other shapes use FillForegndTrans
    context.addWarning('[WARNING] :: EJ2 only have common opacity not like line opacity and fill opacity in visio. So only visio fill opacity is applied for both line and fill');
    nodeStyle.opacity = (attributeName === 'Image')
        ? (getCell('Transparency') != null ? Number(getCell('Transparency')) : 1)
        : (getCell('FillForegndTrans') != null ? Number(getCell('FillForegndTrans')) : (defaultStyle && defaultStyle.FillForegndTrans) ? defaultStyle.FillForegndTrans : 1);
    // ==================== Parse Gradient Properties ====================
    nodeStyle.gradientAngle = getCell('FillGradientAngle') != null ? Number(getCell('FillGradientAngle')) : 0;
    nodeStyle.isGradientEnabled = getCell('FillGradientEnabled') != null && getCell('FillGradientEnabled') !== '0';
    // Process gradient if enabled
    if (nodeStyle.isGradientEnabled) {
        // Log warnings about gradient limitations in EJ2
        context.addWarning('[WARNING] :: Gradient fills in Visio are approximated in EJ2.');
        context.addWarning('[WARNING] :: Line gradients are not supported in EJ2. Additionally, there isn\'t a specific API to adjust line transparency directly. Line transparency is adjusted when the node\'s fill transparency is modified.');
        // Convert gradient angle from radians to degrees
        var angleRad = Number(getCell('FillGradientAngle'));
        var angleDeg = angleRad * (180 / Math.PI);
        // Determine gradient type (Linear vs Radial) from FillGradientDir
        var gradientDir = getCell('FillGradientDir'); // Provide fallback
        nodeStyle.gradientType = gradientDir === '0' ? 'Linear' : 'Radial';
        context.addWarning('[WARNING] :: EJ2 diagram only supports linear and radial gradients. Rectangle and path gradient types are not supported in EJ2.');
        // Extract background/gradient color
        nodeStyle.gradient = getCell('FillBkgnd') != null ? getCell('FillBkgnd') : '#1b2811';
        // Calculate gradient coordinates based on type and direction
        if (nodeStyle.gradientType === 'Linear') {
            nodeStyle.gradientCoordinates = getGradientVectorByAngle(angleDeg);
        }
        else {
            nodeStyle.gradientCoordinates = getRadialGradient(gradientDir);
        }
        // Extract gradient stops from FillGradient section
        var fillGradientSection = section.find(function (sec) {
            return sec && sec.$ && sec.$.N === 'FillGradient';
        });
        nodeStyle.gradientStops = extractGradientStops(fillGradientSection);
    }
    return nodeStyle;
}
/**
 * Converts an RGB color object to a hexadecimal string representation.
 * Pads single-digit components with leading zeros.
 *
 * @param {RgbColor} color - The color object with red, green, and blue properties.
 * @returns {string} A hexadecimal color string in format "#RRGGBB" (e.g., "#FF0000").
 *
 * @private
 */
function toHexStr(color) {
    var red = color.red.toString(16);
    var redPadded = red.length === 1 ? '0' + red : red;
    var green = color.green.toString(16);
    var greenPadded = green.length === 1 ? '0' + green : green;
    var blue = color.blue.toString(16);
    var bluePadded = blue.length === 1 ? '0' + blue : blue;
    return "#" + redPadded + greenPadded + bluePadded;
}
/**
 * Converts an RGB color object to HSV color space for transformation operations.
 * Used as an intermediate step for applying tint, shade, and other color modifiers.
 *
 * @param {RgbColor} color - The RGB color object with red, green, and blue properties (0-255).
 * @returns {HSVColor} An HSVColor object representing the color in HSV space.
 *
 * @private
 */
function toHsv(color) {
    var red = color.red / 255.0;
    var green = color.green / 255.0;
    var blue = color.blue / 255.0;
    var max = Math.max(red, Math.max(green, blue));
    var min = Math.min(red, Math.min(green, blue));
    var delta = max - min;
    var hue;
    var value = max;
    var saturation = max === 0 ? 0 : delta / max;
    if (max === min) {
        hue = 0;
    }
    else {
        if (max === red) {
            hue = (green - blue) / delta + (green < blue ? 6 : 0);
        }
        else if (max === green) {
            hue = (blue - red) / delta + 2;
        }
        else {
            hue = (red - green) / delta + 4;
        }
        hue /= 6;
    }
    return new HSVColor(hue, saturation, value);
}
/**
 * HSVColor class for color space conversion and manipulation.
 * Provides methods to apply tint, shade, and other color transformations.
 *
 * @private
 */
var HSVColor = /** @class */ (function () {
    function HSVColor(hue, saturation, value) {
        this.hue = 0;
        this.saturation = 0;
        this.value = 0;
        this.hue = hue;
        this.saturation = saturation;
        this.value = value;
    }
    /**
     * Converts HSV color to RGB color space.
     * @returns {RgbColor} RGB color object with red, green, blue properties (0-255).
     */
    HSVColor.prototype.toRgb = function () {
        var hsvHueScaled = this.hue * 6;
        var hsvSaturation = this.saturation;
        var hsvValue = this.value;
        var sectorIndex = Math.floor(hsvHueScaled);
        var fractionalPart = hsvHueScaled - sectorIndex;
        var mod = (sectorIndex | 0) % 6;
        // Intermediate values used in conversion
        var valueMin = hsvValue * (1 - hsvSaturation);
        var valueDecreasing = hsvValue * (1 - fractionalPart * hsvSaturation);
        var valueIncreasing = hsvValue * (1 - (1 - fractionalPart) * hsvSaturation);
        // Candidate RGB values for each sector
        var redArr = [hsvValue, valueDecreasing, valueMin, valueMin, valueIncreasing, hsvValue];
        var greenArr = [valueIncreasing, hsvValue, hsvValue, valueDecreasing, valueMin, valueMin];
        var blueArr = [valueMin, valueMin, valueIncreasing, hsvValue, hsvValue, valueDecreasing];
        var red = redArr[parseInt(mod.toString(), 10)];
        var green = greenArr[parseInt(mod.toString(), 10)];
        var blue = blueArr[parseInt(mod.toString(), 10)];
        return {
            red: ((red * 255) | 0),
            green: ((green * 255) | 0),
            blue: ((blue * 255) | 0)
        };
    };
    /**
     * Clamps a number to the range [0, 1].
     * @param {number} val - The input number to clamp.
     * @returns {this} The clamped number between 0 and 1.
     */
    HSVColor.prototype.clamp01 = function (val) {
        return Math.min(1, Math.max(0, val));
    };
    /**
     * Applies a tint effect (brightens the color).
     * @param {number} amount - Percentage to increase brightness in range [0, 100].
     * @returns {this} The current instance with modified value.
     */
    HSVColor.prototype.tint = function (amount) {
        this.value *= (1 + (amount / 100.0));
        this.value = this.clamp01(this.value);
        return this;
    };
    /**
     * Applies a shade effect (darkens the color).
     * @param {number} amount - Percentage to decrease brightness in range [0, 100].
     * @returns {this} The current instance with modified value.
     */
    HSVColor.prototype.shade = function (amount) {
        this.value *= amount / 100.0;
        this.value = this.clamp01(this.value);
        return this;
    };
    /**
     * Applies a saturation modifier.
     * @param {number} amount - Percentage to scale saturation in range [0, 100].
     * @returns {this} The current instance with modified saturation.
     */
    HSVColor.prototype.satMod = function (amount) {
        this.saturation *= amount / 100.0;
        this.saturation = this.clamp01(this.saturation);
        return this;
    };
    /**
     * Applies a luminance modifier.
     * @param {number} amount - Percentage to scale luminance in range [0, 100].
     * @returns {this} The current instance with modified luminance.
     */
    HSVColor.prototype.lumMod = function (amount) {
        this.value *= amount / 100.0;
        this.value = this.clamp01(this.value);
        return this;
    };
    /**
     * Applies a hue modifier.
     * @param {number} amount - Percentage to scale hue in range [0, 100].
     * @returns {this} The current instance with modified hue.
     */
    HSVColor.prototype.hueMod = function (amount) {
        this.hue *= amount / 100.0;
        this.hue = this.clamp01(this.hue);
        return this;
    };
    return HSVColor;
}());
/**
 * Applies color modifiers (tint, shade, saturation, luminance, hue) to a fill style color.
 * Converts to HSV space, applies modifications, and converts back to RGB.
 *
 * @param {ColorRef | ProcessedColor} fillStyleColor - The fill style color object with modifiers and RGB color.
 * @returns {void} Modifies the color object in place.
 *
 * @private
 */
function calcColor(fillStyleColor) {
    if (fillStyleColor.hasEffects) {
        var hsvColor = toHsv(fillStyleColor.color);
        if (fillStyleColor.tint !== 0) {
            hsvColor.tint(fillStyleColor.tint);
        }
        if (fillStyleColor.shade !== 0) {
            hsvColor.shade(fillStyleColor.shade);
        }
        if (fillStyleColor.satMod !== 0) {
            hsvColor.satMod(fillStyleColor.satMod);
        }
        if (fillStyleColor.lumMod !== 0) {
            hsvColor.lumMod(fillStyleColor.lumMod);
        }
        if (fillStyleColor.hueMod !== 0) {
            hsvColor.hueMod(fillStyleColor.hueMod);
        }
        fillStyleColor.color = hsvColor.toRgb();
    }
}
/**
 * Retrieves the fill color for a shape based on quick style settings and theme data.
 * Resolves fill colors from theme fill style matrices, variant colors, or base colors.
 * Applies color modifiers (tint, shade, etc.) to generate the final fill color.
 *
 * @param {VisioShape} shape - Parsed Visio shape(s) for the vertex node
 * @param {ParsingContext} context - Parser context containing theme and shape data.
 * @returns {string | undefined} The resolved fill color in hex format (#RRGGBB), or undefined if not found.
 *
 * @private
 */
function getFillColor(shape, context) {
    var theme = context.data.currentTheme ? context.data.currentTheme : undefined;
    if (!theme) {
        return undefined;
    }
    var fillStyle = null;
    var fillColorStyle = 0;
    if (shape) {
        fillColorStyle = shape.QuickFillColor;
        var matrix = shape.QuickFillMatrix;
        var index = matrix - 100;
        switch (matrix) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                if (theme.fillStyles && theme.fillStyles.length > 0) {
                    fillStyle = theme.fillStyles[matrix - 1];
                }
                break;
            case 100:
            case 101:
            case 102:
            case 103:
                if (theme.isMonotoneVariant && theme.themeVariantStl !== undefined && theme.isMonotoneVariant[theme.themeVariantStl]) {
                    fillColorStyle = 100;
                }
                if (theme.variantFillIdx && theme.themeVariantStl !== undefined && theme.fillStyles) {
                    var variantRow = theme.variantFillIdx[theme.themeVariantStl];
                    if (variantRow && variantRow[parseInt(index.toString(), 10)] !== undefined) {
                        fillStyle = theme.fillStyles[variantRow[parseInt(index.toString(), 10)] - 1];
                    }
                }
                break;
        }
    }
    if (!fillColorStyle || !fillStyle) {
        return undefined;
    }
    if (fillStyle && fillStyle.color && fillStyle.color.val !== 'phClr') {
        var colorValue = fillStyle.color.val;
        return theme.baseColors["" + colorValue] ? theme.baseColors["" + colorValue] : undefined;
    }
    var variantColor = null;
    if (fillColorStyle < 8) {
        // Base color from scheme (colors 1-7)
        if (theme.baseColors) {
            var colorKey = getColorKeyFromId(fillColorStyle);
            if (colorKey && theme.baseColors["" + colorKey]) {
                variantColor = createProcessedColor(theme.baseColors["" + colorKey]);
            }
        }
    }
    else {
        // Variant colors (100-106, 200-206, etc.)
        var clrIndex = 0;
        if (fillColorStyle >= 200) {
            clrIndex = fillColorStyle - 200;
        }
        else if (fillColorStyle >= 100) {
            clrIndex = fillColorStyle - 100;
        }
        if (clrIndex >= 0 && clrIndex <= 6) {
            if (theme.themeVariantClr !== undefined && theme.variantsColors && theme.variantsColors.length > 0) {
                var variantIndex = theme.themeVariantClr % theme.variantsColors.length;
                var variantColors = theme.variantsColors[parseInt(variantIndex.toString(), 10)];
                if (variantColors && variantColors[parseInt(clrIndex.toString(), 10)]) {
                    variantColor = variantColors[parseInt(clrIndex.toString(), 10)];
                }
            }
        }
    }
    if (!variantColor) {
        return undefined;
    }
    if (fillStyle && fillStyle.color) {
        fillStyle.color.color = variantColor.color;
        calcColor(fillStyle.color);
        return toHexStr(fillStyle.color.color);
    }
    return undefined;
}
/**
 * Maps a fillColorStyle index to a color key in the theme color scheme.
 *
 * @param {number} colorId - The color ID (1-7).
 * @returns {string | undefined} The color key (e.g., 'dk1', 'accent1'), or undefined if not found.
 *
 * @private
 */
function getColorKeyFromId(colorId) {
    var colorIdMap = {
        1: 'dk1',
        2: 'lt1',
        3: 'accent1',
        4: 'accent2',
        5: 'accent3',
        6: 'accent4',
        7: 'accent5'
    };
    return colorIdMap[parseInt(colorId.toString(), 10)];
}
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
export function parseVisioNodeShadow(cellMap, context) {
    var nodeShadow = new VisioNodeShadow();
    // ==================== Parse Shadow Enable Flags ====================
    nodeShadow.shadowPattern = cellMap.get('ShdwPattern') != null && cellMap.get('ShdwPattern') !== '0';
    nodeShadow.shapeShadowType = (cellMap.get('ShapeShdwType') != null && cellMap.get('ShapeShdwType'));
    nodeShadow.shapeShadowShow = (cellMap.get('ShapeShdwShow') != null && cellMap.get('ShapeShdwShow'));
    // Process shadow if both pattern and type are enabled
    if (nodeShadow.shadowPattern && nodeShadow.shapeShadowType) {
        // Log EJ2 shadow limitations
        context.addWarning('[WARNING] :: In EJ2, among the various shadow types, only \'Outer\' shadows are supported. Furthermore, within the \'Outer\' shadow type, the \'offset center\' effect cannot be replicated in EJ2. Additionally, EJ2 does not support a blur property for shadows, resulting in sharp-edged shadows only.');
        // ==================== Parse Shadow Opacity ====================
        // Shadow opacity is calculated as (1 - transparency)
        var shdwOpacity = safeNumber(cellMap.get('ShdwForegndTrans'), 1); // Default to 1 if not found/invalid
        nodeShadow.shadowOpacity = (1 - shdwOpacity); // Opacity is 1 - transparency, clamped implicitly by range 0-1
        // ==================== Parse Shadow Color ====================
        nodeShadow.shadowcolor = cellMap.get('ShdwForegnd') != null ? cellMap.get('ShdwForegnd') : '#ffffff'; // Assert to string
        // ==================== Parse Shadow Offset ====================
        var shdwOffsetX = safeNumber(cellMap.get('ShapeShdwOffsetX'), 0);
        var shdwOffsetY = safeNumber(cellMap.get('ShapeShdwOffsetY'), 0);
        var shdwScaleFactor = safeNumber(cellMap.get('ShapeShdwScaleFactor'), 0); // Default to 0 if not found/invalid
        // Calculate final shadow properties (offset, blur, etc.)
        nodeShadow.shadow = calculateShadowProperties(shdwOffsetX, shdwOffsetY, shdwScaleFactor);
    }
    return nodeShadow;
}
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
export function parserVisioRelationship(relationshipInput) {
    var relation = new VisioRelationship();
    // Normalize input to array (handle single object or existing array)
    var relationships = Array.isArray(relationshipInput)
        ? relationshipInput
        : [relationshipInput];
    // Iterate through relationships and extract media references
    for (var _i = 0, relationships_1 = relationships; _i < relationships_1.length; _i++) {
        var rel = relationships_1[_i];
        var target = rel.$.Target;
        var id = rel.$.Id;
        // Only include relationships that target media files
        if (target && target.startsWith('../media/')) {
            relation.media.push({ Id: id, Target: target });
        }
    }
    // Return the relationship object only if media was found, else undefined
    return relation.media.length > 0 ? relation : null;
}
