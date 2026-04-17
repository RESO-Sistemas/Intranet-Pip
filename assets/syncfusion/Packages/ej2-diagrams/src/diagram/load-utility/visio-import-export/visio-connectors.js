var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AnnotationConstraints, ConnectorConstraints } from '../../enum/enum';
import { VisioConnectorAnnotation } from './visio-annotations';
import { LINE_PATTERN_MAP } from './visio-constants';
import { extractGradientStops, formatCoordinate, getDecoratorDimensions, getDecoratorShape, getGradientVectorByAngle, getRadialGradient, getRouting, getTooltip, getVisibility, inchToPx, mapCellValues, roundTo2Decimals, toBoolean, toCamelCase } from './visio-core';
import { setDefaultData } from './visio-model-parsers';
import { getBPMNFlowShapes, getShapeKeywordsFromMaster, getTextDecoration, getUMLConnectors, mergeGeometrySectionsByIndex, resolveMasterSourceForNode } from './visio-nodes';
import { applyThemeStyles, defaultStroke, extractColorWithModifiers, fontMapping, getConnectorFontType, hasOwn, isActiveThemeApplied, normalizeRange, resolveAccentColor } from './visio-theme';
/**
 * Represents a Visio connector (line, arrow, or connector shape).
 * Contains all properties needed to define connector geometry, styling, and metadata.
 */
var VisioConnector = /** @class */ (function () {
    function VisioConnector() {
    }
    /**
     * Creates VisioConnector instances from Visio shape data.
     * Parses connector cells and extracts all relevant properties.
     * @static
     * @param {VisioShapesNode} obj - The Visio shapes container object
     * @param {ParsingContext} context - Parsing context containing page and connector data
     * @param {GroupTransform} [parentTransform] - Optional parent group transform for nested shapes
     * @returns {VisioConnector[]} Array of parsed connector objects
     */
    VisioConnector.fromJs = function (obj, context, parentTransform) {
        // If no shapes container or no shapes, return empty array
        if (!obj || !obj.Shape) {
            return [];
        }
        var connectors = [];
        var shapes = Array.isArray(obj.Shape) ? obj.Shape : [obj.Shape];
        var pageHeight = inchToPx(context.data.currentPage.pageHeight);
        var _loop_1 = function (shape) {
            // Check if this shape is actually a connector
            if (isConnectorShape(shape, context)) {
                var attributes = (shape && shape.$) ? shape.$ : {};
                var defaultData = setDefaultData(context.data.shapes, attributes);
                var connector = new VisioConnector();
                /**
                 * Helper function to extract cell values by name
                 * @param {string} name - The name of the cell to find
                 * @returns {string | undefined} The cell value
                 */
                var getCell = function (name) {
                    var cell = Array.isArray(shape.Cell)
                        ? shape.Cell.find(function (c) { return c.$.N === name; })
                        : (shape.Cell.$.N === name ? shape.Cell : undefined);
                    return cell ? cell.$.V : undefined;
                };
                // Create map of cell values for efficient lookup
                var cellMap = mapCellValues(VisioConnectorUtils.isArrayCell(shape));
                // Extract basic connector properties
                connector.id = shape.$.ID;
                // Need to retrieve shape data for export
                connector.addInfo = {
                    data: shape,
                    isModified: false,
                    masterId: shape.$.Master
                };
                connector.conLineRouteExt = getCell('ConLineRouteExt') || '0';
                connector.shapeRouteStyle = getCell('ShapeRouteStyle') || '0';
                connector.type = getConnectorType(shape, connector, context);
                // Extract and convert begin coordinates
                var beginXIn = 0;
                var beginYIn = 0;
                var endXIn = 0;
                var endYIn = 0;
                var beginXCell = getCell('BeginX');
                if (beginXCell) {
                    beginXIn = Number(beginXCell);
                }
                else if (defaultData && defaultData.beginX) {
                    beginXIn = Number(defaultData.beginX);
                }
                var beginYCell = getCell('BeginY');
                if (beginYCell) {
                    beginYIn = Number(beginYCell);
                }
                else if (defaultData && defaultData.beginY) {
                    beginYIn = Number(defaultData.beginY);
                }
                var endXCell = getCell('EndX');
                if (endXCell) {
                    endXIn = Number(endXCell);
                }
                else if (defaultData && defaultData.endX) {
                    endXIn = Number(defaultData.endX);
                }
                var endYCell = getCell('EndY');
                if (endYCell) {
                    endYIn = Number(endYCell);
                }
                else if (defaultData && defaultData.endY) {
                    endYIn = Number(defaultData.endY);
                }
                // Apply parent group translation (PinX/PinY - LocPinX/LocPinY) if present
                if (parentTransform) {
                    var dx = parentTransform.pinX - parentTransform.locPinX;
                    var dy = parentTransform.pinY - parentTransform.locPinY;
                    beginXIn = beginXIn + dx;
                    beginYIn = beginYIn + dy;
                    endXIn = endXIn + dx;
                    endYIn = endYIn + dy;
                }
                // Convert to page pixels (invert Y with page height)
                var beginXpx = inchToPx(beginXIn);
                var beginYpx = inchToPx(beginYIn);
                var endXpx = inchToPx(endXIn);
                var endYpx = inchToPx(endYIn);
                connector.beginX = beginXpx;
                connector.beginY = pageHeight - beginYpx;
                connector.endX = endXpx;
                connector.endY = pageHeight - endYpx;
                // Extract styling and annotation properties
                if (getCell('Rounding')) {
                    connector.cornerRadius = Number(getCell('Rounding'));
                }
                connector.visible = getVisibility(shape.Section);
                connector.masterId = shape.$.Master;
                connector.IsConnector = true;
                connector.QuickStyleLineColor = getCell('QuickStyleLineColor') !== undefined ?
                    Number(getCell('QuickStyleLineColor')) : undefined;
                connector.QuickStyleLineMatrix = getCell('QuickStyleLineMatrix') !== undefined ?
                    Number(getCell('QuickStyleLineMatrix')) : undefined;
                // Extract style and annotation data
                connector.style = VisioStyleModel.fromShape(shape);
                connector.annotation = VisioConnectorAnnotation.fromJs(shape, defaultData);
                // Extract decorator information
                connector.sourceDecorator = VisioDecoratorModel.fromJs(shape, true, context);
                connector.targetDecorator = VisioDecoratorModel.fromJs(shape, false, context);
                // Extract connection information from context
                connector.sourceId = getConnectorSourceId(connector.id, context);
                connector.targetId = getConnectorTargetId(connector.id, context);
                connector.sourcePortId = getConnectorSourcePortId(connector.id, context);
                connector.targetPortId = getConnectorTargetPortId(connector.id, context);
                // Extract additional properties
                connector.tooltip = getTooltip(cellMap);
                getConstraints(connector, VisioConnectorUtils.isArrayCell(shape));
                connector.allowDrop = !toBoolean(getCell('ShapeSplittable'));
                connector.lineRouting = getRouting(cellMap);
                connector.bridgeSpace = getBridgeSpace(context);
                connector.segments = VisioConnectorUtils.getConnectorSegments(shape, connector, context);
                connector.layerMember = getCell('LayerMember') !== undefined ? parseInt(getCell('LayerMember').toString(), 10) : 0;
                connector.ports = getVisioConnectorPorts(shape);
                connector.shape = getConnectorShape(attributes, shape, connector, context);
                // Add connector to layer if layer exists
                if (connector.layerMember !== undefined && connector.layerMember >= 0 &&
                    (context.data.currentPage && context.data.currentPage.layers && context.data.currentPage.layers.length > 0)) {
                    var page0 = context.data.currentPage;
                    if (page0 && page0.layers && page0.layers[parseInt(connector.layerMember.toString(), 10)]) {
                        page0.layers[parseInt(connector.layerMember.toString(), 10)].objects.push(connector.id);
                    }
                }
                connectors.push(connector);
            }
            else {
                // Recurse into nested Shapes; if this 'shape' is a group, compute its translation
                var effectiveTransform = parentTransform;
                var isGroup = false;
                if (shape && shape.$ && shape.$.Type != null) {
                    isGroup = String(shape.$.Type).toLowerCase() === 'group';
                }
                if (isGroup) {
                    var thisTx = getGroupTranslation(shape);
                    // Compose translations (no rotation): add to parent if present
                    if (effectiveTransform) {
                        effectiveTransform = {
                            pinX: effectiveTransform.pinX + (thisTx.pinX - thisTx.locPinX),
                            pinY: effectiveTransform.pinY + (thisTx.pinY - thisTx.locPinY),
                            locPinX: 0, locPinY: 0,
                            angle: 0, flipX: 0, flipY: 0,
                            width: 0, height: 0
                        };
                    }
                    else {
                        effectiveTransform = {
                            pinX: (thisTx.pinX - thisTx.locPinX),
                            pinY: (thisTx.pinY - thisTx.locPinY),
                            locPinX: 0, locPinY: 0,
                            angle: 0, flipX: 0, flipY: 0,
                            width: 0, height: 0
                        };
                    }
                }
                if (shape && shape.Shapes) {
                    var nestedShapesContainer = shape.Shapes;
                    if (nestedShapesContainer && nestedShapesContainer.Shape) {
                        var nestedConnectors = VisioConnector.fromJs(nestedShapesContainer, context, effectiveTransform);
                        for (var nestedIndex = 0; nestedIndex < nestedConnectors.length; nestedIndex++) {
                            connectors.push(nestedConnectors[parseInt(nestedIndex.toString(), 10)]);
                        }
                    }
                }
            }
        };
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var shape = shapes_1[_i];
            _loop_1(shape);
        }
        return connectors;
    };
    return VisioConnector;
}());
export { VisioConnector };
/**
 * Extracts connection ports from a Visio connector shape.
 * Ports define connection points on the connector where other shapes can connect.
 * @function getVisioConnectorPorts
 * @param {VisioShapeNode} shape - The Visio shape object containing Section data
 * @returns {VisioPort[]} Array of port objects with position and direction data
 */
function getVisioConnectorPorts(shape) {
    var ports = [];
    // Return empty if no sections exist
    if (!shape.Section) {
        return ports;
    }
    // Normalize section to always be an array
    var sections = Array.isArray(shape.Section)
        ? shape.Section
        : [shape.Section];
    // Find the Connection section which contains port definitions
    var connSection = sections.find(function (s) { return s.$ && s.$.N === 'Connection'; });
    if (!connSection || !connSection.Row) {
        return ports;
    }
    // Normalize rows to always be an array
    var rows = Array.isArray(connSection.Row)
        ? connSection.Row
        : [connSection.Row];
    // Process each connection row
    rows.forEach(function (row) {
        // Only process Connection type rows
        if (row.$ && row.$.T === 'Connection') {
            var id = row.$.IX;
            var cells = Array.isArray(row.Cell)
                ? row.Cell
                : [row.Cell];
            // Initialize port object with default values
            var port_1 = {
                id: "port" + id,
                x: 0, y: 0,
                dirX: 0, dirY: 0,
                type: 0, autoGen: 0, prompt: ''
            };
            // Extract cell values into port properties
            cells.forEach(function (cell) {
                var name = cell.$.N;
                var value = cell.$.V;
                switch (name) {
                    case 'X':
                        port_1.x = parseFloat(value);
                        break;
                    case 'Y':
                        port_1.y = parseFloat(value);
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
 * Determines if a ShapeRouteStyle value indicates a STRAIGHT algorithm.
 * @private
 * @param {string} srs - The ShapeRouteStyle value
 * @returns {boolean} True if the style routes as a straight line
 */
function isStraightRouting(srs) {
    // 2 = Straight, 16 = Center-to-center (used to enforce straight routing)
    return srs === '2' || srs === '16'; // MS Learn ShapeRouteStyle table
}
/**
 * Determines if a ShapeRouteStyle value indicates a RIGHT-ANGLE algorithm.
 * @private
 * @param {string} srs - The ShapeRouteStyle value
 * @returns {boolean} True if the style routes orthogonally
 */
function isOrthogonalRouting(srs) {
    // 1 = Right angle
    if (srs === '1') {
        return true;
    }
    var n = parseInt(srs, 10);
    // Org / Flowchart / Tree directional families (NS/WE, SN/EW)
    if ((n >= 3 && n <= 8) || (n >= 10 && n <= 15)) {
        return true;
    }
    // Simple directional variants
    if ((n >= 17 && n <= 20) || n === 21 || n === 22) {
        return true;
    }
    // 9 = Network -> defer to geometry-based decision later; do NOT mark orthogonal here
    if (n === 9) {
        return false;
    }
    // 0 gets resolved to page RouteStyle elsewhere
    return false;
}
/**
 * Resolves master-aware Geometry sections for a connector (master-preferred, instance-supplement).
 * Mirrors node parsing flow by reusing resolveMasterSourceForNode + mergeGeometrySectionsByIndex.
 * @param {VisioShapeNode} pageConnector - Page instance connector node
 * @param {ParsingContext} context - Parsing context with master index
 * @returns {VisioSection[]} Geometry sections (may be empty)
 */
function resolveGeometrySectionsForConnector(pageConnector, context) {
    // Collect instance Geometry sections
    var instanceGeometrySections = [];
    if (pageConnector && pageConnector.Section) {
        var sectionArray = Array.isArray(pageConnector.Section)
            ? pageConnector.Section
            : [pageConnector.Section];
        for (var i = 0; i < sectionArray.length; i++) {
            var sec = sectionArray[parseInt(i.toString(), 10)];
            if (sec && sec.$ && sec.$.N === 'Geometry') {
                instanceGeometrySections.push(sec);
            }
        }
    }
    // Resolve master node exactly like node parsing
    var masterNode = resolveMasterSourceForNode(pageConnector, context, undefined);
    // Merge master + instance Geometry (master-preferred) when master exists
    if (masterNode) {
        var merged = mergeGeometrySectionsByIndex(masterNode, pageConnector);
        return merged;
    }
    // Fallback to instance-only Geometry if no master
    return instanceGeometrySections;
}
/**
 * Determines the connector type (Straight, Orthogonal, or Bezier) based on routing settings.
 * @function getConnectorType
 * @param {any} shape - The Visio shape object containing Cell data
 * @param {any} connector - The connector object being created
 * @param {ParsingContext} context - Parsing context with page settings
 * @returns {ConnectorType} The determined connector type ('Straight', 'Orthogonal', or 'Bezier')
 */
function getConnectorType(shape, connector, context) {
    var page = context.data.currentPage;
    var clr = connector.conLineRouteExt;
    var srs = connector.shapeRouteStyle;
    var pageLineRouteExt = page.lineRouteExt;
    var pageRouteStyle = page.routeStyle;
    // Master-aware Geometry scan
    var mergedGeometry = resolveGeometrySectionsForConnector(shape, context);
    // Detect pure Bezier: has ArcTo rows and absolutely no LineTo rows
    var hasArcTo = false;
    var hasLineTo = false;
    for (var s = 0; s < mergedGeometry.length; s++) {
        var section = mergedGeometry[parseInt(s.toString(), 10)];
        if (!section || !section.Row) {
            continue;
        }
        var rows = Array.isArray(section.Row) ? section.Row : [section.Row];
        for (var r = 0; r < rows.length; r++) {
            var row = rows[parseInt(r.toString(), 10)];
            if (row && row.$ && row.$.T) {
                var t = row.$.T;
                if (t === 'ArcTo') {
                    hasArcTo = true;
                }
                if (t === 'LineTo') {
                    hasLineTo = true;
                }
            }
        }
    }
    if (hasArcTo && !hasLineTo) {
        return 'Bezier';
    }
    // Else let curvature + routing logic below decide Straight vs Orthogonal
    // ==================== STEP 1: Determine Curvature (Appearance) ====================
    /**
     * Curvature controls the visual appearance of the connector.
     * CURVED: Uses NURBS (bezier curves)
     * STRAIGHT: Uses straight lines (may still be routed orthogonally)
     */
    var curvature = 'STRAIGHT';
    if (clr === '2') {
        curvature = 'CURVED';
    }
    else if (clr === '1') {
        curvature = 'STRAIGHT';
    }
    else { // clr === '0' (Default)
        curvature = (pageLineRouteExt === '2') ? 'CURVED' : 'STRAIGHT';
    }
    // ==================== STEP 2: Determine Routing Algorithm ====================
    /**
     * Routing algorithm controls HOW the connector is routed.
     * STRAIGHT: Direct line from source to target
     * RIGHT-ANGLE: Orthogonal segments (horizontal/vertical)
     */
    var effectiveSrs = (srs !== '0') ? srs : pageRouteStyle;
    var algorithm;
    if (isStraightRouting(effectiveSrs)) {
        algorithm = 'STRAIGHT';
    }
    else if (isOrthogonalRouting(effectiveSrs)) {
        algorithm = 'RIGHT-ANGLE';
    }
    else {
        // Only case expected here: 9 = Network
        algorithm = 'NETWORK';
    }
    // ==================== STEP 3: Combine Curvature + Algorithm ====================
    /**
     * Final connector type is determined by combining both properties:
     * If curvature = CURVED:
     *   Return 'Bezier' (NURBS curves override routing algorithm)
     * If curvature = STRAIGHT:
     *   - If algorithm = STRAIGHT: Return 'Straight'
     *   - If algorithm = RIGHT-ANGLE: Return 'Orthogonal'
     */
    if (curvature === 'CURVED') {
        return 'Bezier';
    }
    if (algorithm === 'STRAIGHT') {
        return 'Straight';
    }
    if (algorithm === 'RIGHT-ANGLE') {
        return 'Orthogonal';
    }
    // NETWORK: decide by geometry if available; otherwise default to Orthogonal
    // (Network can yield multi-segment non-orthogonal polylines; EJ2 has no 'polyline' type)
    // const pointCount: number = (geometryData && geometryData.points) ? geometryData.points.length : 0;
    //if (pointCount <= 2) {
    //    return 'Straight';
    //}
    return 'Orthogonal';
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
export function getConnectorShape(attributes, shapes, Node, context) {
    // Define special connector shape types
    var bpmnFlowShapes = new Set(['MessageFlow', 'SequenceFlow', 'Association']);
    var umlConnectors = new Set(['Inheritance', 'Association',
        'Dependency', 'Aggregation', 'Composition',
        'DirectedAssociation', 'InterfaceRealization']);
    var name = attributes.Name;
    var finalShape;
    if (name !== undefined) {
        // Normalize shape name by removing hyphens, spaces, and dots
        var trimmedName = name.replace(/[-\s](.)/g, function (match, letter) { return letter.toUpperCase(); })
            .replace(/[-\s]/g, '');
        trimmedName = trimmedName.replace(/\.\d+$/, '').trim();
        finalShape = trimmedName;
        // Handle Association shape specially by checking keywords
        if (finalShape === 'Association') {
            var keywordsRaw = getShapeKeywordsFromMaster(shapes, context);
            var kw = (keywordsRaw || '').toLowerCase();
            var hasUml = kw.includes('uml');
            if (hasUml) {
                var shape = getUMLConnectors(shapes, finalShape, Node);
                return shape;
            }
        }
        // Check if shape is a known BPMN or UML connector
        if (bpmnFlowShapes.has(finalShape)) {
            var shape = getBPMNFlowShapes(shapes, finalShape, Node);
            return shape;
        }
        else if (umlConnectors.has(finalShape)) {
            var shape = getUMLConnectors(shapes, finalShape, Node);
            return shape;
        }
        return undefined;
    }
}
/**
 * Represents styling properties for a Visio connector line.
 * Contains fill, stroke, opacity, and dash pattern information.
 */
var VisioStyleModel = /** @class */ (function () {
    function VisioStyleModel() {
        /** Opacity/transparency level (0-1) */
        this.opacity = 0;
    }
    /**
     * Creates a VisioStyleModel instance from a Visio connector shape.
     * Extracts line styling properties from shape cells.
     * @static
     * @param {VisioShapeNode} shape - The Visio connector shape object
     * @returns {VisioStyleModel} A new VisioStyleModel with extracted style properties
     */
    VisioStyleModel.fromShape = function (shape) {
        var style = new VisioStyleModel();
        /**
         * Helper function to get cell value by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            var cell = Array.isArray(shape.Cell)
                ? shape.Cell.find(function (c) { return c.$.N === name; })
                : (shape.Cell.$.N === name ? shape.Cell : undefined);
            return cell ? cell.$.V : undefined;
        };
        // Extract fill color
        style.fill = getCell('FillForegnd') || 'transparent';
        // Extract line color
        style.strokeColor = getCell('LineColor') || undefined;
        // Extract opacity/transparency
        if (getCell('LineColorTrans')) {
            style.opacity = Number(getCell('LineColorTrans'));
        }
        // Extract and convert dash pattern
        var linePattern = getCell('LinePattern');
        if (getCell('LineWeight') != null) {
            style.strokeWidth = Number(getCell('LineWeight'));
        }
        if (linePattern) {
            style.strokeDashArray = VisioStyleModel.convertDashPattern(linePattern);
        }
        return style;
    };
    /**
     * Converts Visio dash pattern codes to Syncfusion strokeDashArray format.
     * @static
     * @param {string} patternCode - The Visio line pattern code
     * @returns {string} The Syncfusion dash array string
     */
    VisioStyleModel.convertDashPattern = function (patternCode) {
        return LINE_PATTERN_MAP[String(patternCode)] || '';
    };
    return VisioStyleModel;
}());
export { VisioStyleModel };
/**
 * Represents styling properties for connector decorators (arrow heads).
 * Contains fill, stroke, gradient, and other decorator-specific styling.
 */
var VisioDecoratorStyleModel = /** @class */ (function () {
    function VisioDecoratorStyleModel() {
        /** Opacity/transparency level (0-1) */
        this.opacity = 0;
    }
    /**
     * Creates a VisioDecoratorStyleModel instance from a Visio shape.
     * Extracts decorator styling including gradients if applicable.
     * @static
     * @param {VisioShapeNode} shape - The Visio shape object containing decorator style data
     * @param {ParsingContext} context - Parsing context for warnings
     * @returns {VisioDecoratorStyleModel} A new VisioDecoratorStyleModel with extracted styles
     */
    VisioDecoratorStyleModel.fromShapeJs = function (shape, context) {
        var style = new VisioDecoratorStyleModel();
        var section = shape.Section ? (Array.isArray(shape.Section)
            ? shape.Section : [shape.Section]) : [];
        /**
         * Helper function to get cell value by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            var cells = VisioConnectorUtils.isArrayCell(shape);
            var cell = cells.find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        // Extract basic styling properties
        if (shape && shape.Cell) {
            // Extract opacity
            if (getCell('LineColorTrans')) {
                style.opacity = Number(getCell('LineColorTrans'));
            }
            // Extract color (used for both fill and stroke)
            if (getCell('LineColor')) {
                style.fill = getCell('LineColor');
                style.strokeColor = getCell('LineColor');
            }
            // Extract stroke width
            if (getCell('LineWeight') != null) {
                style.strokeWidth = Number(getCell('LineWeight'));
            }
            // Extract gradient angle in radians
            style.gradientAngle = getCell('LineGradientAngle') != null ? Number(getCell('LineGradientAngle')) : 0;
            // Check if gradient is enabled
            style.isgradientEnabled = getCell('LineGradientEnabled') != null && getCell('LineGradientEnabled') !== '0';
            // Process gradient if enabled
            if (style.isgradientEnabled) {
                context.addWarning('[WARNING] :: Syncfusion supports gradients for connector decorators only, whereas Visio applies gradients across the entire connector, leading to visual differences.');
                // Convert angle from radians to degrees
                var angleRad = Number(getCell('LineGradientAngle'));
                var angleDeg = angleRad * (180 / Math.PI);
                // Determine gradient type from gradient direction cell
                var gradientDir = getCell('LineGradientDir');
                style.gradientType = gradientDir === '0' ? 'Linear' : 'Radial';
                // Get gradient background color
                style.gradient = getCell('FillBkgnd') != null ? getCell('FillBkgnd') : '#1b2811';
                // Set gradient coordinates based on type
                if (style.gradientType === 'Linear') {
                    style.gradientcoOrdinates = getGradientVectorByAngle(angleDeg);
                }
                else {
                    style.gradientcoOrdinates = getRadialGradient(gradientDir);
                }
                // Extract gradient stops
                var fillGradientSection = section.find(function (sec) {
                    return sec && sec.$ && sec.$.N === 'LineGradient';
                });
                style.gradientStops = extractGradientStops(fillGradientSection);
            }
        }
        return style;
    };
    return VisioDecoratorStyleModel;
}());
export { VisioDecoratorStyleModel };
/**
 * Represents a decorator (arrow head or end marker) for a connector.
 * Defines shape, size, and styling of source or target decorators.
 */
var VisioDecoratorModel = /** @class */ (function () {
    function VisioDecoratorModel() {
    }
    /**
     * Creates a VisioDecoratorModel instance from a Visio connector shape.
     * Extracts arrow/decorator properties for either source or target end.
     * @static
     * @param {VisioShapeNode} shape - The Visio connector shape object
     * @param {boolean} isSource - True for source end decorator, false for target end
     * @param {ParsingContext} context - Parsing context for warnings and master data
     * @returns {VisioDecoratorModel} A new VisioDecoratorModel with extracted decorator properties
     */
    VisioDecoratorModel.fromJs = function (shape, isSource, context) {
        var decorator = new VisioDecoratorModel();
        /**
         * Helper function to get cell value by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            var cells = VisioConnectorUtils.isArrayCell(shape);
            var cell = cells.find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        decorator.isSource = isSource;
        // Extract arrow properties based on source or target end
        var beginArrowSize = isSource ? getCell('BeginArrowSize') : getCell('EndArrowSize');
        var beginArrow = isSource ? getCell('BeginArrow') : getCell('EndArrow');
        if (beginArrow !== undefined) {
            if (isSource) {
                decorator.isSourceShapeChanged = true;
            }
            else {
                decorator.isTargetShapeChanged = true;
            }
        }
        // Convert arrow code to type (0 for no arrow, 4 for default arrow)
        var arrowType = beginArrow !== undefined ? Number(beginArrow) : 0;
        var arrowSize = beginArrowSize;
        decorator.arrowDimension = arrowSize;
        // Get decorator shape name and dimensions
        var arrowShape = getDecoratorShape(arrowType);
        // Set decorator properties
        decorator.shape = arrowShape;
        decorator.IsConnector = true;
        decorator.QuickStyleLineColor = getCell('QuickStyleLineColor') !== undefined ? Number(getCell('QuickStyleLineColor')) : undefined;
        decorator.QuickStyleLineMatrix = getCell('QuickStyleLineMatrix') !== undefined ?
            Number(getCell('QuickStyleLineMatrix')) : undefined;
        // Extract decorator styling
        decorator.style = VisioDecoratorStyleModel.fromShapeJs(shape, context);
        // Special handling for diamond shape (transparent by default in Visio)
        if (decorator.shape === 'Diamond') {
            decorator.style.fill = 'Transparent';
        }
        return decorator;
    };
    return VisioDecoratorModel;
}());
export { VisioDecoratorModel };
/**
 * Represents connection data between shapes and connectors.
 * Stores source/target relationships and port associations.
 */
var VisioConnections = /** @class */ (function () {
    function VisioConnections() {
    }
    /**
     * Creates VisioConnections instances from Visio Connect data.
     * Parses connector-to-shape connections from the XML Connect elements.
     * @static
     * @param {ConnectsElement} obj - The Visio document object containing Connect elements
     * @param {ParsingContext} context - Parsing context (unused but maintained for interface compatibility)
     * @returns {VisioConnections[]} Array of connection objects
     */
    VisioConnections.fromJs = function (obj, context) {
        var connections = [];
        var connectorMap = {};
        // Normalize connects to always be an array
        var connects = Array.isArray(obj.Connect) ?
            obj.Connect : [obj.Connect];
        // Process each connection element
        for (var _i = 0, connects_1 = connects; _i < connects_1.length; _i++) {
            var connect = connects_1[_i];
            var connectorId = connect.$.FromSheet;
            // Initialize connector connection if not exists
            if (!connectorMap["" + connectorId]) {
                connectorMap["" + connectorId] = new VisioConnections();
                connectorMap["" + connectorId].connectorId = connectorId;
            }
            var connection = connectorMap["" + connectorId];
            var input = connect.$.ToCell;
            // Extract port index from cell reference (e.g., "Connections.3" -> port2)
            var match = Number(input.match(/\d+/)) - 1;
            // Determine if connection is source (BeginX) or target (EndX)
            if (connect.$.FromCell === 'BeginX') {
                // This is the source (beginning) of the connector
                connection.sourceId = connect.$.ToSheet;
                if (match !== -1) {
                    connection.sourcePortId = connect.$.ToCell ? "port" + match : undefined;
                }
            }
            else if (connect.$.FromCell === 'EndX') {
                // This is the target (end) of the connector
                connection.targetId = connect.$.ToSheet;
                if (match !== -1) {
                    connection.targetPortId = connect.$.ToCell ? "port" + match : undefined;
                }
            }
        }
        // Convert map to array of connections
        return Object.keys(connectorMap).map(function (key) { return connectorMap["" + key]; });
    };
    return VisioConnections;
}());
export { VisioConnections };
/**
 * Utility class for processing Visio connector geometry and segments.
 * Handles extraction of connector paths, bezier curves, and segment calculations.
 *
 * @private
 */
var VisioConnectorUtils = /** @class */ (function () {
    function VisioConnectorUtils() {
    }
    /**
     * Compares two numbers with a tolerance value.
     * Used for floating-point equality checks.
     * @private
     * @param {number} a - First number to compare
     * @param {number} b - Second number to compare
     * @param {number} tolerance - Tolerance value for comparison (default: 0.001)
     * @returns {boolean} True if numbers are approximately equal within tolerance
     */
    VisioConnectorUtils.approxEqual = function (a, b, tolerance) {
        if (tolerance === void 0) { tolerance = this.TOLERANCE; }
        return Math.abs(a - b) < tolerance;
    };
    /**
     * Extracts a cell value from an array of cells by name.
     * @private
     * @param {VisioCell[]} arr - Array of cell objects
     * @param {string} name - Name of the cell to find
     * @returns {string | undefined} The cell value, or undefined if not found
     */
    VisioConnectorUtils.getCell = function (arr, name) {
        var cell = arr && arr.find(function (c) { return c.$.N === name; });
        return cell ? cell.$.V : undefined;
    };
    /**
     * Extracts a cell value from either a single cell or array of cells.
     * @private
     * @param {OneOrMany<VisioCell>} cell - A single cell object or array of cell objects
     * @param {string} name - Name of the cell to find
     * @returns {string | undefined} The cell value, or undefined if not found
     */
    VisioConnectorUtils.getCellValue = function (cell, name) {
        if (Array.isArray(cell)) {
            var match = cell.find(function (c) { return c && c.$ && c.$.N === name; });
            return match && match.$ && match.$.V;
        }
        if (cell && cell.$ && cell.$.N === name) {
            return cell.$.V;
        }
        return undefined;
    };
    /**
     * Finds and returns the Geometry section from a shape.
     * @private
     * @param {VisioShapeNode} shape - The Visio shape object
     * @returns {VisioSection | null} The Geometry section, or null if not found
     */
    VisioConnectorUtils.getGeometrySection = function (shape) {
        return Array.isArray(shape.Section)
            ? shape.Section.find(function (s) { return s.$.N === 'Geometry'; })
            : (shape.Section && shape.Section.$.N === 'Geometry' ? shape.Section : null);
    };
    /**
     * Filters geometry rows to exclude deleted rows and arc-to entries.
     * @private
     * @param {VisioSection | null} geometrySection - The Geometry section object
     * @returns {VisioRow[]} Array of active geometry rows
     */
    VisioConnectorUtils.getActiveRows = function (geometrySection) {
        if (!geometrySection || !geometrySection.Row) {
            return [];
        }
        // Normalize rows to always be an array
        var geometryRows = Array.isArray(geometrySection.Row)
            ? geometrySection.Row
            : [geometrySection.Row];
        // Filter out deleted rows (Del='1') and ArcTo rows (line jumps)
        return geometryRows.filter(function (row) {
            return !(row.$ && row.$.Del === '1') && row.$.T !== 'ArcTo';
        });
    };
    /**
     * Converts Visio Y-coordinate to Syncfusion Y-coordinate (inverts Y-axis).
     * Visio Y increases upward; Syncfusion Y increases downward.
     * @private
     * @param {number} visioY - The Y-coordinate in Visio coordinate system
     * @param {ParsingContext} context - Parsing context with page height information
     * @returns {number} The converted Y-coordinate in Syncfusion system
     */
    VisioConnectorUtils.convertVisioY = function (visioY, context) {
        var pageHeight = inchToPx(context.data.currentPage.pageHeight);
        return pageHeight - (visioY * this.SCALE_FACTOR);
    };
    /**
     * isArrayCell Method is used to check the shape cell is array or not
     * @static
     * @param {VisioShapeNode} shape - To check the shape cell is array or not
     * @returns {VisioCell[]} Return the cell array
     */
    VisioConnectorUtils.isArrayCell = function (shape) {
        var Cell = (Array.isArray(shape.Cell) ? shape.Cell : [shape.Cell]);
        return Cell;
    };
    /**
     * Extracts and converts the Begin coordinates of a connector.
     * @private
     * @param {VisioShapeNode} shape - The Visio connector shape
     * @param {ParsingContext} context - Parsing context for coordinate conversion
     * @returns {PointWithType} The converted begin coordinates
     */
    VisioConnectorUtils.getBeginCoordinates = function (shape, context) {
        var cells = this.isArrayCell(shape);
        var beginXCell = this.getCell(cells, 'BeginX');
        var beginYCell = this.getCell(cells, 'BeginY');
        return {
            x: beginXCell ? Number(beginXCell) * this.SCALE_FACTOR : 0,
            y: beginYCell ? this.convertVisioY(Number(beginYCell), context) : 0
        };
    };
    /**
     * Processes a LineTo geometry row into absolute coordinates.
     * Converts relative Visio coordinates to absolute page coordinates.
     * @private
     * @param {VisioRow} row - The LineTo geometry row
     * @param {VisioShapeNode} shape - The Visio connector shape
     * @param {PointWithType} lastPoint - The previous point (for reference)
     * @param {ParsingContext} context - Parsing context for coordinate conversion
     * @returns {PointWithType} The converted point coordinates
     */
    VisioConnectorUtils.processLineToRow = function (row, shape, lastPoint, context) {
        // Extract X and Y values from cell array
        var lx;
        var ly;
        if (Array.isArray(row.Cell)) {
            lx = this.getCellValue(row.Cell, 'X');
            ly = this.getCellValue(row.Cell, 'Y');
        }
        else {
            lx = this.getCellValue([row.Cell], 'X');
            ly = this.getCellValue([row.Cell], 'Y');
        }
        // Get the original begin coordinates in Visio coordinate system
        var originalCells = this.isArrayCell(shape);
        var originalBeginX = this.getCell(originalCells, 'BeginX');
        var originalBeginY = this.getCell(originalCells, 'BeginY');
        var beginXInches = originalBeginX ? Number(originalBeginX) : 0;
        var beginYInches = originalBeginY ? Number(originalBeginY) : 0;
        // Calculate absolute coordinates in Visio coordinate system
        // LineTo coordinates are relative to the BeginX/BeginY
        var absoluteVisioX = beginXInches + (lx !== undefined ? Number(lx) : 0);
        var absoluteVisioY = beginYInches + (ly !== undefined ? Number(ly) : 0);
        // Convert to Syncfusion coordinates with proper Y-axis inversion
        return {
            x: absoluteVisioX * this.SCALE_FACTOR,
            y: this.convertVisioY(absoluteVisioY, context)
        };
    };
    /**
     * Extracts all geometry data from a connector shape.
     * Parses MoveTo and LineTo rows to build the connector path.
     * @private
     * @param {VisioShapeNode} shape - The Visio connector shape
     * @param {ParsingContext} context - Parsing context for coordinate conversion
     * @returns {GeometryData} Object containing points and segment type information
     */
    VisioConnectorUtils.extractGeometryData = function (shape, context) {
        var geometrySection = this.getGeometrySection(shape);
        var beginPoint = this.getBeginCoordinates(shape, context);
        // Return simple begin point if no geometry section
        if (!geometrySection) {
            return {
                points: [beginPoint],
                hasOrthogonalSegment: false,
                hasDiagonalSegment: false
            };
        }
        var activeRows = this.getActiveRows(geometrySection);
        var points = [];
        var lastPoint = __assign({}, beginPoint);
        // Handle MoveTo row if present (defines alternate starting point)
        var hasMoveTo = activeRows.length > 0 && activeRows[0].$.T === 'MoveTo';
        if (hasMoveTo) {
            var mx = Number(this.getCellValue(activeRows[0].Cell, 'X') || 0);
            var my = Number(this.getCellValue(activeRows[0].Cell, 'Y') || 0);
            // Get original begin coordinates for calculation
            var originalCells = this.isArrayCell(shape);
            var originalBeginX = this.getCell(originalCells, 'BeginX');
            var originalBeginY = this.getCell(originalCells, 'BeginY');
            var beginXInches = originalBeginX ? Number(originalBeginX) : 0;
            var beginYInches = originalBeginY ? Number(originalBeginY) : 0;
            // Calculate absolute MoveTo coordinates
            var absoluteX = beginXInches + mx;
            var absoluteY = beginYInches + my;
            lastPoint = {
                x: absoluteX * this.SCALE_FACTOR,
                y: this.convertVisioY(absoluteY, context),
                type: 'MoveTo'
            };
        }
        points.push(__assign({}, lastPoint));
        // Process LineTo rows
        for (var i = (hasMoveTo ? 1 : 0); i < activeRows.length; i++) {
            var row = activeRows[parseInt(i.toString(), 10)];
            if (row.$.T === 'LineTo') {
                var coords = this.processLineToRow(row, shape, lastPoint, context);
                lastPoint = coords;
                points.push(__assign({}, coords, { type: 'LineTo' }));
            }
        }
        // Analyze segments to determine if orthogonal or diagonal
        var hasOrthogonalSegment = false;
        var hasDiagonalSegment = false;
        for (var i = 0; i < points.length - 1; i++) {
            var p1 = points[parseInt(i.toString(), 10)];
            var p2 = points[parseInt(i.toString(), 10) + 1];
            // Check if segment is axis-aligned (orthogonal)
            if (this.approxEqual(p1.x, p2.x) || this.approxEqual(p1.y, p2.y)) {
                hasOrthogonalSegment = true;
            }
            else {
                hasDiagonalSegment = true;
            }
        }
        return { points: points, hasOrthogonalSegment: hasOrthogonalSegment, hasDiagonalSegment: hasDiagonalSegment };
    };
    /**
     * Extracts connector segments based on connector type.
     * Builds appropriate segment models for Orthogonal, Straight, or Bezier connectors.
     * @static
     * @param {VisioShapeNode} shape - The Visio connector shape
     * @param {VisioConnector} connector - The connector object being processed
     * @param {ParsingContext} context - Parsing context for coordinate conversion
     * @returns {DiagramConnectorSegmentModel[]} Array of connector segment models
     */
    VisioConnectorUtils.getConnectorSegments = function (shape, connector, context) {
        var geometryData = this.extractGeometryData(shape, context);
        // Return empty if insufficient points
        if ((connector.type === 'Orthogonal' || connector.type === 'Straight') && (geometryData.points.length < 2)) {
            return [];
        }
        // Build segments based on connector type
        switch (connector.type) {
            case 'Orthogonal':
                return this.buildOrthogonalSegments(geometryData, connector);
            case 'Straight':
                return this.buildStraightSegments(geometryData, connector);
            case 'Bezier':
                return this.getBezierSegments(shape, context);
        }
    };
    /**
     * Builds orthogonal connector segments from geometry points.
     * Creates segments with direction and length properties.
     * @private
     * @param {GeometryData} geometryData - The extracted geometry data with points
     * @param {VisioConnector} connector - The connector object
     * @returns {DiagramConnectorSegmentModel[]} Array of orthogonal segments
     */
    VisioConnectorUtils.buildOrthogonalSegments = function (geometryData, connector) {
        var segments = [];
        var loopLimit = geometryData.points.length - 1;
        // Process all point pairs
        for (var i = 0; i < loopLimit; i++) {
            var p1 = geometryData.points[parseInt(i.toString(), 10)];
            var p2 = geometryData.points[parseInt(i.toString(), 10) + 1];
            var isLastSegment = (i === loopLimit - 1);
            // Check if segment is vertical or horizontal
            if (this.approxEqual(p1.x, p2.x)) {
                // Vertical orthogonal segment
                this.addOrthogonalSegment(segments, p1, p2, isLastSegment, 'vertical');
            }
            else if (this.approxEqual(p1.y, p2.y)) {
                // Horizontal orthogonal segment
                this.addOrthogonalSegment(segments, p1, p2, isLastSegment, 'horizontal');
            }
        }
        return segments;
    };
    /**
     * Builds straight connector segments from geometry points.
     * Creates segments with target point properties.
     * @private
     * @param {GeometryData} geometryData - The extracted geometry data with points
     * @param {VisioConnector} connector - The connector object
     * @returns {DiagramConnectorSegmentModel[]} Array of straight segments
     */
    VisioConnectorUtils.buildStraightSegments = function (geometryData, connector) {
        var segments = [];
        var loopLimit = geometryData.points.length - 2;
        // Process all but the last point pair
        for (var i = 0; i < loopLimit; i++) {
            var p1 = geometryData.points[parseInt(i.toString(), 10)];
            var p2 = geometryData.points[parseInt(i.toString(), 10) + 1];
            this.addStraightSegment(segments, p1, p2, false);
        }
        return segments;
    };
    /**
     * Adds an orthogonal segment to the segments array.
     * Calculates length and direction based on segment orientation.
     * @private
     * @param {DiagramConnectorSegmentModel[]} segments - Array to add segment to
     * @param {PointWithType} p1 - Start point of segment
     * @param {PointWithType} p2 - End point of segment
     * @param {boolean} isLastSegment - Whether this is the last segment
     * @param {'vertical' | 'horizontal'} orientation - Segment orientation
     * @returns {void}
     */
    VisioConnectorUtils.addOrthogonalSegment = function (segments, p1, p2, isLastSegment, orientation) {
        var length;
        var direction;
        if (orientation === 'vertical') {
            // Calculate vertical distance and direction
            length = formatCoordinate(Math.abs(p2.y - p1.y));
            direction = p2.y > p1.y ? 'Bottom' : 'Top';
        }
        else {
            // Calculate horizontal distance and direction
            length = formatCoordinate(Math.abs(p2.x - p1.x));
            direction = p2.x > p1.x ? 'Right' : 'Left';
        }
        // Last segment has zero length and no direction
        if (isLastSegment) {
            // Need to fix in source further
            length = 1;
        }
        segments.push({
            type: 'Orthogonal',
            direction: direction,
            length: length
        });
    };
    /**
     * Adds a straight segment to the segments array.
     * Stores the target point for the segment.
     * @private
     * @param {DiagramConnectorSegmentModel[]} segments - Array to add segment to
     * @param {PointWithType} p1 - Start point of segment
     * @param {PointWithType} p2 - End point of segment
     * @param {boolean} isLastSegment - Whether this is the last segment
     * @returns {void}
     */
    VisioConnectorUtils.addStraightSegment = function (segments, p1, p2, isLastSegment) {
        var point = { x: p2.x, y: p2.y };
        segments.push({
            type: 'Straight',
            point: point
        });
    };
    /**
     * Extracts Bezier curve segments from a connector's NURBS geometry.
     * Converts NURBS curves to cubic Bezier segments.
     * @private
     * @param {VisioShapeNode} shape - The Visio connector shape
     * @param {ParsingContext} context - Parsing context for coordinate conversion
     * @returns {DiagramConnectorSegmentModel[]} Array of Bezier segments
     */
    VisioConnectorUtils.getBezierSegments = function (shape, context) {
        var geometrySection = this.getGeometrySection(shape);
        var activeRows = this.getActiveRows(geometrySection);
        var beginPoint = this.getBeginCoordinates(shape, context);
        var extractedData = {
            moveTo: { x: 0, y: 0 },
            nurbsTo: {}
        };
        // Extract MoveTo and NURBSTo rows
        for (var _i = 0, activeRows_1 = activeRows; _i < activeRows_1.length; _i++) {
            var row = activeRows_1[_i];
            var rowType = row.$.T;
            if (rowType === 'MoveTo') {
                // Extract starting point coordinates
                var xCell = (Array.isArray(row.Cell) ? row.Cell :
                    [row.Cell]).find(function (c) { return c.$.N === 'X'; });
                var yCell = (Array.isArray(row.Cell) ? row.Cell :
                    [row.Cell]).find(function (c) { return c.$.N === 'Y'; });
                extractedData.moveTo.x = parseFloat(xCell ? xCell.$.V : '0');
                extractedData.moveTo.y = parseFloat(yCell ? yCell.$.V : '0');
            }
            else if (rowType === 'NURBSTo') {
                // Extract NURBS curve data from cells
                for (var _a = 0, _b = (Array.isArray(row.Cell) ? row.Cell : [row.Cell]); _a < _b.length; _a++) {
                    var cell = _b[_a];
                    var cellData = cell.$;
                    extractedData.nurbsTo[cellData.N] = {
                        F: cellData.F,
                        V: cellData.V
                    };
                }
            }
        }
        // Get the NURBS endpoint and formula
        var nurbsCellData = extractedData.nurbsTo['E'];
        var nurbsValueString = (nurbsCellData && nurbsCellData.F);
        if (nurbsValueString) {
            // Extract NURBS dimensions
            var width = parseFloat((extractedData.nurbsTo['X'] ? extractedData.nurbsTo['X'].V : '1'));
            var height = parseFloat((extractedData.nurbsTo['Y'] ? extractedData.nurbsTo['Y'].V : '1'));
            var localEndPoint = { x: width, y: height };
            // Build weighted control points in local coordinates
            var localNurbs = this.buildLocalWCPs(nurbsValueString, width, height, extractedData.moveTo, localEndPoint);
            if (localNurbs) {
                try {
                    // Step 1: Convert NURBS to local cubic Bezier segments
                    var localBeziers = this.extractCubicBeziers(localNurbs);
                    // Step 2: Convert local Beziers to page coordinates (handles scaling and Y-inversion)
                    var pageBeziers = this.toPageBeziers(localBeziers, beginPoint, 96);
                    // Step 3: Convert page coordinates to connector segment models
                    var segments = this.beziersToSegments(pageBeziers);
                    // Ensure last point aligns perfectly with target shape
                    if (segments.length > 0) {
                        var lastSegment = segments[segments.length - 1];
                        lastSegment.point = { x: 0, y: 0 };
                    }
                    return segments;
                }
                catch (e) {
                    // Return empty array if Bezier conversion fails
                    return [];
                }
            }
        }
        return [];
    };
    /**
     * Parses a NURBS formula string into its components.
     * Extracts degree, control points, knots, and weights.
     * @private
     * @param {string} formula - The NURBS formula string
     * @returns {NurbsParameters | null} Parsed NURBS parameters, or null if invalid
     */
    VisioConnectorUtils.parseNurbsFormula = function (formula) {
        var s = formula.trim().replace(/^=/, '');
        // Validate formula format
        if (!s.startsWith('NURBS(') || !s.endsWith(')')) {
            return null;
        }
        // Extract and parse numeric values
        var parts = s.slice(6, -1).split(',').map(function (v) { return parseFloat(v.trim()); });
        if (parts.length < 8) {
            return null;
        }
        // Extract NURBS parameters
        var knotLast = parts[0];
        var degree = parts[1];
        var xType = parts[2];
        var yType = parts[3];
        // Extract control points (4 values per point: x, y, knot, weight)
        var controlPoints = [];
        for (var i = 4; i + 3 < parts.length; i += 4) {
            controlPoints.push({
                x: parts[parseInt(i.toString(), 10)],
                y: parts[parseInt(i.toString(), 10) + 1],
                knot: parts[parseInt(i.toString(), 10) + 2],
                weight: parts[parseInt(i.toString(), 10) + 3]
            });
        }
        return { knotLast: knotLast, degree: degree, xType: xType, yType: yType, controlPoints: controlPoints };
    };
    /**
     * Builds weighted control points in local coordinate system.
     * Converts NURBS parameters to weighted control point format.
     * @private
     * @param {string} eFormula - The NURBS endpoint formula
     * @param {number} width - Local coordinate width
     * @param {number} height - Local coordinate height
     * @param {Vec2} moveTo - Starting point in local coordinates
     * @param {Vec2} localEnd - Ending point in local coordinates
     * @returns {object | null} Object with degree, points, xType, yType, or null if invalid
     */
    VisioConnectorUtils.buildLocalWCPs = function (eFormula, width, height, moveTo, localEnd) {
        var p = this.parseNurbsFormula(eFormula);
        /**
         * Converts normalized coordinates to local coordinates.
         * @param {number} x - Normalized X coordinate
         * @param {number} y - Normalized Y coordinate
         * @returns {Vec2} Local coordinate point
         */
        var toLocal = function (x, y) { return ({
            x: (p.xType === 0 ? x * width : x),
            y: (p.yType === 0 ? y * height : y)
        }); };
        // Build weighted control points array
        var pts = [];
        pts.push({ x: moveTo.x, y: moveTo.y, w: 1 });
        for (var _i = 0, _a = p.controlPoints; _i < _a.length; _i++) {
            var cp = _a[_i];
            var v = toLocal(cp.x, cp.y);
            pts.push({ x: v.x, y: v.y, w: (cp.weight !== null && cp.weight !== undefined) ? cp.weight : 1 });
        }
        pts.push({ x: localEnd.x, y: localEnd.y, w: 1 });
        return { degree: p.degree, points: pts, xType: p.xType, yType: p.yType };
    };
    /**
     * Creates a clamped uniform knot vector for NURBS curve.
     * Used to ensure curve passes through endpoints.
     * @private
     * @param {number} nCP - Number of control points
     * @param {number} degree - Degree of the curve
     * @returns {number[]} Knot vector array
     */
    VisioConnectorUtils.makeClampedUniformKnots = function (nCP, degree) {
        var interior = Math.max(0, nCP - degree - 1);
        var U = [];
        // Add degree+1 knots with value 0
        for (var i = 0; i <= degree; i++) {
            U.push(0);
        }
        // Add interior knots (evenly spaced from 0 to 1)
        for (var i = 1; i <= interior; i++) {
            U.push(i / (interior + 1));
        }
        // Add degree+1 knots with value 1
        for (var i = 0; i <= degree; i++) {
            U.push(1);
        }
        return U;
    };
    /**
     * Inserts a knot into a B-spline curve.
     * Uses the Böhm algorithm for knot insertion.
     * @private
     * @param {WCP[]} P - Control points array
     * @param {number[]} U - Knot vector
     * @param {number} p - Degree of the curve
     * @param {number} u - Knot value to insert
     * @returns {object} Object with updated points P and knot vector U
     */
    VisioConnectorUtils.insertKnot = function (P, U, p, u) {
        // Find the knot span containing u
        var k = p;
        for (var i = p; i < U.length - p - 1; i++) {
            if (u >= U[parseInt(i.toString(), 10)] && u < U[parseInt(i.toString(), 10) + 1]) {
                k = i;
                break;
            }
        }
        var n = P.length - 1;
        var Q = new Array(P.length + 1);
        var V = new Array(U.length + 1);
        // Copy knots before insertion point
        for (var i = 0; i <= k; i++) {
            V[parseInt(i.toString(), 10)] = U[parseInt(i.toString(), 10)];
            V[k + 1] = u;
        }
        // Copy knots after insertion point
        for (var i = k + 1; i < U.length; i++) {
            V[parseInt(i.toString(), 10) + 1] = U[parseInt(i.toString(), 10)];
        }
        // Copy unaffected control points
        for (var i = 0; i <= k - p; i++) {
            Q[parseInt(i.toString(), 10)] = __assign({}, P[parseInt(i.toString(), 10)]);
        }
        for (var i = k; i <= n; i++) {
            Q[parseInt(i.toString(), 10) + 1] = __assign({}, P[parseInt(i.toString(), 10)]);
        }
        // Compute new control points at insertion point
        for (var i = k - p + 1; i <= k; i++) {
            var indexI = i;
            var indexIPlusP = i + p;
            var indexIMinus1 = i - 1;
            var denom = (U[parseInt(indexIPlusP.toString(), 10)] - U[parseInt(indexI.toString(), 10)]);
            var alpha = (u - U[parseInt(indexI.toString(), 10)]) / denom;
            Q[parseInt(indexI.toString(), 10)] = {
                x: alpha * P[parseInt(indexI.toString(), 10)].x + (1 - alpha) * P[parseInt(indexIMinus1.toString(), 10)].x,
                y: alpha * P[parseInt(indexI.toString(), 10)].y + (1 - alpha) * P[parseInt(indexIMinus1.toString(), 10)].y,
                w: alpha * P[parseInt(indexI.toString(), 10)].w + (1 - alpha) * P[parseInt(indexIMinus1.toString(), 10)].w
            };
        }
        return { P: Q, U: V };
    };
    /**
     * Elevates knot multiplicity to match curve degree.
     * Ensures each knot has proper multiplicity for subdivision.
     * @private
     * @param {WCP[]} P - Control points array
     * @param {number[]} U - Knot vector
     * @param {number} p - Degree of the curve
     * @param {number} u - Knot value to elevate
     * @returns {object} Object with updated points P and knot vector U
     */
    VisioConnectorUtils.elevateMultiplicityToDegree = function (P, U, p, u) {
        // Count current multiplicity
        var mult = 0;
        for (var i = 0; i < U.length; i++) {
            if (Math.abs(U[parseInt(i.toString(), 10)] - u) < 1e-12) {
                mult++;
            }
        }
        // Insert knot until multiplicity equals degree
        while (mult < p) {
            var r = this.insertKnot(P, U, p, u);
            P = r.P;
            U = r.U;
            mult++;
        }
        return { P: P, U: U };
    };
    /**
     * Extracts cubic Bezier segments from a B-spline curve.
     * Subdivides NURBS curve into cubic Bezier curves.
     * @private
     * @param {{degree: number, points: WCP[]}} local - Local NURBS with control points
     * @returns {array} Array of cubic Bezier segment objects
     */
    VisioConnectorUtils.extractCubicBeziers = function (local) {
        var p = local.degree;
        // Can only extract cubic Beziers from degree 3 NURBS
        if (p !== 3) {
            return [];
        }
        // Create clamped uniform knot vector
        var U = this.makeClampedUniformKnots(local.points.length, p);
        var P = local.points.map(function (q) { return (__assign({}, q)); });
        // Get all interior knots
        var interiorKnots = U.slice(p + 1, U.length - p - 1);
        var uniqueInteriorKnots = interiorKnots.filter(function (v, i, a) { return a.indexOf(v) === i; });
        // Elevate multiplicity of all interior knots to degree
        for (var _i = 0, uniqueInteriorKnots_1 = uniqueInteriorKnots; _i < uniqueInteriorKnots_1.length; _i++) {
            var u = uniqueInteriorKnots_1[_i];
            var r = this.elevateMultiplicityToDegree(P, U, p, u);
            P = r.P;
            U = r.U;
        }
        // Extract cubic Bezier segments
        var segs = [];
        for (var i = 0; i + p < P.length; i += p) {
            if (i + 3 >= P.length) {
                continue;
            }
            // Get 4 control points for cubic Bezier
            var B0 = P[parseInt(i.toString(), 10)];
            var B1 = P[parseInt(i.toString(), 10) + 1];
            var B2 = P[parseInt(i.toString(), 10) + 2];
            var B3 = P[parseInt(i.toString(), 10) + 3];
            /**
             * Converts weighted control point to 2D Cartesian coordinates.
             * @param {WCP} q - Weighted control point
             * @returns {Vec2} 2D point
             */
            var toXY = function (q) { return ({
                x: q.x / ((q.w !== 0 && q.w)),
                y: q.y / ((q.w !== 0 && q.w))
            }); };
            segs.push({ p0: toXY(B0), c1: toXY(B1), c2: toXY(B2), p1: toXY(B3) });
        }
        return segs;
    };
    /**
     * Converts local Bezier curves to page coordinates.
     * Applies scaling and Y-axis inversion.
     * @private
     * @param {{p0: Vec2, c1: Vec2, c2: Vec2, p1: Vec2}[]} beziers - Local Bezier segments
     * @param {PointWithType} begin - Starting point in page coordinates
     * @param {number} scale - Scale factor for conversion (default: 96)
     * @returns {array} Array of Bezier segments in page coordinates
     */
    VisioConnectorUtils.toPageBeziers = function (beziers, begin, scale) {
        /**
         * Transforms local coordinates to page coordinates.
         * @param {Vec2} v - Local coordinate point
         * @returns {PointWithType} Page coordinate point
         */
        var T = function (v) { return ({
            x: begin.x + v.x * scale,
            y: begin.y - v.y * scale // Y-axis inverted
        }); };
        return beziers.map(function (b) { return ({
            p0: T(b.p0),
            c1: T(b.c1),
            c2: T(b.c2),
            p1: T(b.p1)
        }); });
    };
    /**
     * Converts Bezier curve segments to connector segment models.
     * Transforms geometric Bezier data into Syncfusion segment format.
     * @private
     * @param {{p0: PointWithType, c1: PointWithType, c2: PointWithType, p1: PointWithType}[]} beziers - Bezier segments
     * @returns {DiagramConnectorSegmentModel[]} Array of connector segment models
     */
    VisioConnectorUtils.beziersToSegments = function (beziers) {
        return beziers.map(function (b) { return ({
            type: 'Bezier',
            point1: { x: b.c1.x, y: b.c1.y },
            point2: { x: b.c2.x, y: b.c2.y },
            point: { x: b.p1.x, y: b.p1.y }
        }); });
    };
    /** Tolerance for floating-point comparisons */
    VisioConnectorUtils.TOLERANCE = 0.001;
    /** Number of reduction points for simplification */
    VisioConnectorUtils.REDUCTION_POINTS = 20;
    /** Pixel scale factor for coordinate conversion (1 inch = 96 pixels) */
    VisioConnectorUtils.SCALE_FACTOR = 96;
    return VisioConnectorUtils;
}());
/**
 * Extracts a cell value from cell array, handling both single and array formats.
 * @function getCellValue
 * @param {OneOrMany<VisioCell>} cell - A single cell object or array of cell objects
 * @param {string} name - Name of the cell to find
 * @returns {string | undefined} The cell value, or undefined if not found
 */
export function getCellValue(cell, name) {
    if (Array.isArray(cell)) {
        var match = cell.find(function (c) { return c && c.$ && c.$.N === name; });
        return match && match.$ && match.$.V;
    }
    if (cell && cell.$ && cell.$.N === name) {
        return cell.$.V;
    }
    return undefined;
}
/**
 * Calculates bridge space for line-bridging connectors.
 * Returns the spacing between overlapping connectors.
 * @function getBridgeSpace
 * @param {ParsingContext} context - Parsing context with page bridging settings
 * @returns {number} The bridge spacing value in pixels
 */
function getBridgeSpace(context) {
    var page = context.data.currentPage;
    var bridgeStyle = page.bridging;
    // No bridging if style is 0
    if (bridgeStyle === 0) {
        return 0;
    }
    // Get base spacing based on bridge style
    var baseSpacing = (bridgeStyle === 2)
        ? page.verticalBridgeSpace
        : page.horizontalBridgeSpace;
    return baseSpacing * 10;
}
/**
 * Extracts constraint flags from connector cells.
 * Sets lock properties on the connector object.
 * @function getConstraints
 * @param {VisioConnector} shape - The connector object to populate
 * @param {VisioCell[]} cells - Array of cell objects from the connector shape
 * @returns {void}
 */
function getConstraints(shape, cells) {
    var cellMap = mapCellValues(cells);
    var lockKeys = [
        'LockDelete',
        'LockSelect',
        'LockTextEdit',
        'LockBegin',
        'LockEnd',
        'LockMoveX',
        'LockMoveY',
        'LockVtxEdit'
    ];
    // Set boolean flags for each lock constraint
    for (var _i = 0, lockKeys_1 = lockKeys; _i < lockKeys_1.length; _i++) {
        var key = lockKeys_1[_i];
        var value = cellMap.get(key);
        shape[toCamelCase(key)] = value != null && value !== '0';
    }
}
/**
 * Applies connector constraint flags to the Syncfusion connector constraints.
 * Converts Visio lock properties to Syncfusion constraint bitmasks.
 * @function setConstraints
 * @param {any} shape - The connector object with lock flags
 * @param {ParsingContext} context - Parsing context for warnings
 * @returns {number} Syncfusion connector constraint value
 */
function setConstraints(shape, context) {
    var constraints = shape.constraints;
    // Start with default constraints
    constraints = ConnectorConstraints.Default | ConnectorConstraints.AllowDrop | ConnectorConstraints.DragSegmentThumb;
    // Disable drag if move is locked
    if (shape.lockMoveX || shape.lockMoveY) {
        context.addWarning('[WARNING] :: Drag constraints for connector (if either lockMoveX or lockMoveY is selected, drag constraints will be disabled completely in Syncfusion).');
        constraints &= ~ConnectorConstraints.Drag;
    }
    // Apply individual lock constraints
    if (shape.lockDelete) {
        constraints &= ~ConnectorConstraints.Delete;
    }
    if (shape.lockSelect) {
        constraints &= ~ConnectorConstraints.Select;
    }
    if (shape.lockBegin) {
        constraints &= ~ConnectorConstraints.DragSourceEnd;
    }
    if (shape.lockEnd) {
        constraints &= ~ConnectorConstraints.DragTargetEnd;
    }
    if (shape.tooltip) {
        constraints |= ConnectorConstraints.Tooltip;
    }
    if (shape.lockTextEdit) {
        constraints |= ConnectorConstraints.ReadOnly;
    }
    if (!shape.allowDrop) {
        constraints &= ~ConnectorConstraints.AllowDrop;
    }
    if (shape.lineRouting) {
        constraints |= ConnectorConstraints.LineRouting;
    }
    if (shape.lockVtxEdit) {
        constraints &= ~ConnectorConstraints.DragSegmentThumb;
    }
    return constraints;
}
/**
 * Applies annotation constraint flags for connector text.
 * @function setAnnotationConstraints
 * @param {any} shape - The annotation object with lock flags
 * @returns {any} Syncfusion annotation constraint value
 */
function setAnnotationConstraints(shape) {
    var constraints = shape.constraints;
    if (shape.lockTextEdit) {
        constraints = AnnotationConstraints.InheritReadOnly;
    }
    if (shape.lockRotate) {
        constraints = AnnotationConstraints.Interaction & ~AnnotationConstraints.Rotate;
    }
    if (shape.lockSelect) {
        constraints = AnnotationConstraints.Interaction & ~AnnotationConstraints.Select;
    }
    return constraints;
}
/**
 * Determines if a shape is a connector based on its cells and master reference.
 * Checks for connector-specific cells (BeginX, BeginY, EndX, EndY) and valid master.
 * @function isConnectorShape
 * @param {VisioShapeNode} shape - The Visio shape object to check
 * @param {ParsingContext} context - Parsing context with master data
 * @returns {boolean} True if shape is identified as a connector
 */
export function isConnectorShape(shape, context) {
    var masters = context.data.masters;
    // Get all cell names in the shape
    var cellArray = VisioConnectorUtils.isArrayCell(shape);
    var cellNames = cellArray.map(function (cell) {
        if (cell !== undefined && cell.$ && cell.$.N !== undefined) {
            return cell.$.N;
        }
        return '';
    });
    // Check for connector-specific cells
    var hasBeginEndPoints = cellNames.includes('BeginX') ||
        cellNames.includes('BeginY') ||
        cellNames.includes('EndX') ||
        cellNames.includes('EndY');
    return hasBeginEndPoints;
}
/**
 * Retrieves the source shape ID for a connector by looking up connection data.
 * @function getConnectorSourceId
 * @param {string} connectorId - ID of the connector to look up
 * @param {ParsingContext} context - Parsing context with connection data
 * @returns {string | undefined} The source shape ID, or undefined if not found
 */
function getConnectorSourceId(connectorId, context) {
    var connections = context.data.connections;
    var connection = connections.find(function (conn) { return conn.connectorId === connectorId; });
    return connection ? connection.sourceId : undefined;
}
/**
 * Retrieves the target shape ID for a connector by looking up connection data.
 * @function getConnectorTargetId
 * @param {string} connectorId - ID of the connector to look up
 * @param {ParsingContext} context - Parsing context with connection data
 * @returns {string | undefined} The target shape ID, or undefined if not found
 */
function getConnectorTargetId(connectorId, context) {
    var connections = context.data.connections;
    var connection = connections.find(function (conn) { return conn.connectorId === connectorId; });
    return connection ? connection.targetId : undefined;
}
/**
 * Retrieves the source port ID for a connector by looking up connection data.
 * @function getConnectorSourcePortId
 * @param {string} connectorId - ID of the connector to look up
 * @param {ParsingContext} context - Parsing context with connection data
 * @returns {string | undefined} The source port ID, or undefined if not found
 */
function getConnectorSourcePortId(connectorId, context) {
    var connections = context.data.connections;
    var connection = connections.find(function (conn) { return conn.connectorId === connectorId; });
    return connection ? connection.sourcePortId : undefined;
}
/**
 * Retrieves the target port ID for a connector by looking up connection data.
 * @function getConnectorTargetPortId
 * @param {string} connectorId - ID of the connector to look up
 * @param {ParsingContext} context - Parsing context with connection data
 * @returns {string | undefined} The target port ID, or undefined if not found
 */
function getConnectorTargetPortId(connectorId, context) {
    var connections = context.data.connections;
    var connection = connections.find(function (conn) { return conn.connectorId === connectorId; });
    return connection ? connection.targetPortId : undefined;
}
/**
 * Maps VisioTextAlignmentModel to Syncfusion text alignment string.
 * @function getTextAlign
 * @param {VisioTextAlignmentModel} alignment - The Visio text alignment model
 * @returns {'Left' | 'Right' | 'Center' | 'Justify'} The Syncfusion alignment string
 */
function getTextAlign(alignment) {
    if (alignment && alignment.left) {
        return 'Left';
    }
    if (alignment && alignment.right) {
        return 'Right';
    }
    if (alignment && alignment.justify) {
        return 'Justify';
    }
    return 'Center';
}
/**
 * Maps Visio connector type to Syncfusion Segments type.
 * Includes warnings for Bezier curve approximation.
 * @function getType
 * @param {ConnectorType} type - The Visio connector type
 * @param {ParsingContext} context - Parsing context for warnings
 * @returns {Segments} The Syncfusion segment type
 */
function getType(type, context) {
    if (type === 'Orthogonal') {
        return 'Orthogonal';
    }
    else if (type === 'Bezier') {
        context.addWarning('[WARNING] :: Bezier curve is approximated from Visio.');
        return 'Bezier';
    }
    else {
        return 'Straight'; // Default value
    }
}
/**
 * Extracts minimal group translation info from a group node (in inches).
 * @param {VisioShapeNode} groupNode - The group shape node
 * @returns {GroupTransform} Minimal transform containing PinX, PinY, LocPinX, LocPinY; other fields set to 0
 */
function getGroupTranslation(groupNode) {
    var cells = VisioConnectorUtils.isArrayCell(groupNode);
    var pinX = 0;
    var pinY = 0;
    var locPinX = 0;
    var locPinY = 0;
    for (var i = 0; i < cells.length; i += 1) {
        var c = cells[parseInt(i.toString(), 10)];
        if (!c || !c.$) {
            continue;
        }
        var n = c.$.N;
        var v = c.$.V;
        if (n === 'PinX') {
            pinX = Number(v);
        }
        else if (n === 'PinY') {
            pinY = Number(v);
        }
        else if (n === 'LocPinX') {
            locPinX = Number(v);
        }
        else if (n === 'LocPinY') {
            locPinY = Number(v);
        }
    }
    // Return only what we need; other fields kept at zero to avoid side effects
    return {
        pinX: pinX, pinY: pinY,
        locPinX: locPinX, locPinY: locPinY,
        angle: 0, flipX: 0, flipY: 0,
        width: 0, height: 0
    };
}
/** Epsilon value for floating-point precision */
var EPS = 1e-12;
/**
 * Calculates Euclidean distance between two points.
 * @function hypot2
 * @param {Pt} a - First point
 * @param {Pt} b - Second point
 * @returns {number} Distance between points
 */
function hypot2(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
/**
 * Clamps a value to the range [0, 1].
 * @function clamp01
 * @param {number} v - Value to clamp
 * @returns {number} Clamped value
 */
function clamp01(v) { return v <= 0 ? 0 : v >= 1 ? 1 : v; }
/**
 * Snaps a value to 0 or 1 if within epsilon distance.
 * @function snap01
 * @param {number} v - Value to snap
 * @returns {number} Snapped value (0, v, or 1)
 */
function snap01(v) {
    if (Math.abs(v) < EPS) {
        return 0;
    }
    if (Math.abs(1 - v) < EPS) {
        return 1;
    }
    return v;
}
/**
 * Normalizes a 2D vector to unit length.
 * @function normalize
 * @param {Pt} v - Vector to normalize
 * @returns {Pt} Normalized vector
 */
function normalize(v) {
    var L = Math.hypot(v.x, v.y) || 1e-12;
    return { x: v.x / L, y: v.y / L };
}
/**
 * Evaluates a cubic Bezier curve at parameter t.
 * Uses the standard cubic Bezier formula.
 * @function cubic
 * @param {Pt} p0 - Start point
 * @param {Pt} c1 - First control point
 * @param {Pt} c2 - Second control point
 * @param {Pt} p1 - End point
 * @param {number} t - Parameter (0-1)
 * @returns {Pt} Point on the curve
 */
function cubic(p0, c1, c2, p1, t) {
    var u = 1 - t;
    var u2 = u * u;
    var u3 = u2 * u;
    var t2 = t * t;
    var t3 = t2 * t;
    return {
        x: u3 * p0.x + 3 * u2 * t * c1.x + 3 * u * t2 * c2.x + t3 * p1.x,
        y: u3 * p0.y + 3 * u2 * t * c1.y + 3 * u * t2 * c2.y + t3 * p1.y
    };
}
/**
 * Flattens a cubic Bezier curve into a polyline.
 * Samples the curve at regular intervals.
 * @function flattenCubicToPolyline
 * @param {Pt} p0 - Start point
 * @param {Pt} c1 - First control point
 * @param {Pt} c2 - Second control point
 * @param {Pt} p1 - End point
 * @param {number} steps - Number of samples (default: 48)
 * @returns {Pt[]} Array of points on the polyline
 */
function flattenCubicToPolyline(p0, c1, c2, p1, steps) {
    var out = [];
    for (var i = 0; i <= steps; i++) {
        out.push(cubic(p0, c1, c2, p1, i / steps));
    }
    return out;
}
/**
 * Builds a polyline representation of a connector's path in pixels.
 * Handles straight, orthogonal, and Bezier connector types.
 * @function buildConnectorPolylinePx
 * @param {VisioConnector} conn - The connector to build polyline for
 * @returns {Pt[]} Array of points representing the connector path
 */
function buildConnectorPolylinePx(conn) {
    // Start with begin point
    var polylinePoints = [{ x: conn.beginX, y: conn.beginY }];
    // Return simple line if no segments
    if (!conn.segments || conn.segments.length === 0) {
        polylinePoints.push({ x: conn.endX, y: conn.endY });
        return polylinePoints;
    }
    // Build polyline based on connector type
    if (conn.type === 'Straight') {
        // Add all straight segment points
        for (var _i = 0, _a = conn.segments; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.type === 'Straight' && s.point) {
                polylinePoints.push({ x: s.point.x, y: s.point.y });
            }
        }
        // Ensure end point is included
        var last = polylinePoints[polylinePoints.length - 1];
        if (hypot2(last, { x: conn.endX, y: conn.endY }) > EPS) {
            polylinePoints.push({ x: conn.endX, y: conn.endY });
        }
        return polylinePoints;
    }
    if (conn.type === 'Orthogonal') {
        // Build path by applying direction and length to each segment
        var currentPoint = { x: conn.beginX, y: conn.beginY };
        for (var _b = 0, _c = conn.segments; _b < _c.length; _b++) {
            var segment = _c[_b];
            if (segment.type !== 'Orthogonal') {
                continue;
            }
            var L = typeof segment.length === 'number' ? segment.length : 0;
            var nextPoint = __assign({}, currentPoint);
            // Apply direction to calculate next point
            switch (segment.direction) {
                case 'Left':
                    nextPoint.x -= L;
                    break;
                case 'Right':
                    nextPoint.x += L;
                    break;
                case 'Top':
                    nextPoint.y -= L;
                    break;
                case 'Bottom':
                    nextPoint.y += L;
                    break;
                default: break;
            }
            // Add to polyline if significant distance
            if (hypot2(currentPoint, nextPoint) > EPS) {
                polylinePoints.push(nextPoint);
                currentPoint = nextPoint;
            }
        }
        // Ensure end point is included
        var lastPoint = polylinePoints[parseInt(polylinePoints.length.toString(), 10) - 1];
        if (hypot2(lastPoint, { x: conn.endX, y: conn.endY }) > EPS) {
            polylinePoints.push({ x: conn.endX, y: conn.endY });
        }
        return polylinePoints;
    }
    if (conn.type === 'Bezier') {
        // Build path by sampling Bezier curves
        var bezierSegs = conn.segments.filter(function (s) { return s.type === 'Bezier'; });
        var TOL_1 = 1e-6;
        var nearlyEqual = function (a, b) { return Math.abs(a - b) <= TOL_1; };
        var p0 = { x: conn.beginX, y: conn.beginY };
        // Process each Bezier segment
        for (var idx = 0; idx < bezierSegs.length; idx++) {
            var s = bezierSegs[parseInt(idx.toString(), 10)];
            var c1 = s.point1;
            var c2 = s.point2;
            var p1 = s.point;
            if (!c1 || !c2 || !p1) {
                continue;
            }
            // Force last point to end if nearly equal
            if (idx === bezierSegs.length - 1) {
                if (!nearlyEqual(p1.x, conn.endX) || !nearlyEqual(p1.y, conn.endY)) {
                    p1 = { x: conn.endX, y: conn.endY };
                }
            }
            // Sample the Bezier curve and add to polyline
            var samples = flattenCubicToPolyline(p0, c1, c2, p1, 48);
            for (var i = 1; i < samples.length; i++) {
                polylinePoints.push(samples[parseInt(i.toString(), 10)]);
            }
            p0 = p1;
        }
        // Ensure end point is included
        var last = polylinePoints[parseInt(polylinePoints.length.toString(), 10) - 1];
        if (hypot2(last, { x: conn.endX, y: conn.endY }) > EPS) {
            polylinePoints.push({ x: conn.endX, y: conn.endY });
        }
        return polylinePoints;
    }
    polylinePoints.push({ x: conn.endX, y: conn.endY });
    return polylinePoints;
}
/**
 * Projects a point onto a line segment and returns projection parameters.
 * @function projectOnSegment
 * @param {Pt} p - Point to project
 * @param {Pt} a - Segment start point
 * @param {Pt} b - Segment end point
 * @returns {{t: number, q: Pt}} Object with parameter t and projection point q
 */
function projectOnSegment(p, a, b) {
    var abx = b.x - a.x;
    var aby = b.y - a.y;
    var apx = p.x - a.x;
    var apy = p.y - a.y;
    var ab2 = abx * abx + aby * aby || 1e-12;
    // Calculate projection parameter
    var t = (apx * abx + apy * aby) / ab2;
    t = Math.max(0, Math.min(1, t));
    return { t: t, q: { x: a.x + t * abx, y: a.y + t * aby } };
}
/**
 * Calculates the offset along a polyline for a given point.
 * Returns normalized offset (0-1) based on arclength distance.
 * @function pathOffsetAlongPolyline
 * @param {Pt[]} path - Array of points defining the polyline
 * @param {Pt} point - Point to find offset for
 * @returns {number} Normalized offset (0-1)
 */
function pathOffsetAlongPolyline(path, point) {
    var finalOffset;
    // Return midpoint if invalid path
    if (!path || path.length < 2) {
        return 0.5;
    }
    // Calculate segment lengths
    var segmentLengths = [];
    var totalLength = 0;
    for (var index = 0; index < path.length - 1; index++) {
        var length_1 = hypot2(path[parseInt(index.toString(), 10)], path[parseInt(index.toString(), 10) + 1]);
        segmentLengths.push(length_1);
        totalLength += length_1;
    }
    // Return midpoint if path is degenerate
    if (totalLength < EPS) {
        return 0.5;
    }
    // Find best projection onto path
    var bestProjection = { segmentIndex: 0, tOnSegment: 0, distance: Infinity };
    for (var segmentIndex = 0; segmentIndex < path.length - 1; segmentIndex++) {
        var segStartIndex = segmentIndex;
        var segEndIndex = segmentIndex + 1;
        var segStart = {
            x: roundTo2Decimals(path[parseInt(segStartIndex.toString(), 10)].x),
            y: roundTo2Decimals(path[parseInt(segStartIndex.toString(), 10)].y)
        };
        var segEnd = {
            x: roundTo2Decimals(path[parseInt(segEndIndex.toString(), 10)].x),
            y: roundTo2Decimals(path[parseInt(segEndIndex.toString(), 10)].y)
        };
        var _a = projectOnSegment(point, segStart, segEnd), t = _a.t, q = _a.q;
        var distanceToProjection = hypot2(point, q);
        if (distanceToProjection < bestProjection.distance) {
            bestProjection = { segmentIndex: segmentIndex, tOnSegment: t, distance: distanceToProjection };
        }
    }
    // Calculate accumulated arc length
    var accumulatedLength = 0;
    for (var i = 0; i < bestProjection.segmentIndex; i++) {
        accumulatedLength += segmentLengths[parseInt(i.toString(), 10)];
    }
    accumulatedLength += segmentLengths[parseInt(bestProjection.segmentIndex.toString(), 10)] * bestProjection.tOnSegment;
    // Normalize and snap to endpoints
    finalOffset = snap01(clamp01(accumulatedLength / totalLength));
    if (finalOffset === 0) {
        finalOffset = 0.0001;
    }
    if (finalOffset === 1) {
        finalOffset = 0.999;
    }
    return finalOffset;
}
/**
 * Converts local inches to page pixels.
 * Applies scale factor and coordinate system transformation.
 * @function InchesToPagePx
 * @param {Pt} beginPx - Beginning point in pixels
 * @param {Pt} endPx - Ending point in pixels
 * @param {number} localXIn - Local X coordinate in inches
 * @param {number} localYIn - Local Y coordinate in inches
 * @returns {Pt} Converted point in page pixels
 */
function InchesToPagePx(beginPx, endPx, localXIn, localYIn) {
    var SCALE = 96; // 96 px/in to match Begin/End inch→px conversion and avoid port/label drift
    var xPx = localXIn * SCALE;
    var yPx = localYIn * SCALE;
    return {
        x: beginPx.x + xPx,
        y: beginPx.y - yPx // Y-axis inverted
    };
}
/**
 * Checks if a direction vector is vertical.
 * @function isVertical
 * @param {object} direction - Direction vector with x and y components
 * @returns {boolean} True if vector is vertical (x ≈ 0, |y| ≈ 1)
 */
function isVertical(direction) {
    return Math.abs(direction.x) < EPS && Math.abs(Math.abs(direction.y) - 1) < EPS;
}
/**
 * Checks if a direction vector is horizontal.
 * @function isHorizontal
 * @param {object} direction - Direction vector with x and y components
 * @returns {boolean} True if vector is horizontal (y ≈ 0, |x| ≈ 1)
 */
function isHorizontal(direction) {
    return Math.abs(direction.y) < EPS && Math.abs(Math.abs(direction.x) - 1) < EPS;
}
/**
 * Gets a point on a polyline at a specified offset using true arclength.
 * @function pointAtOffset
 * @param {Pt[]} pathPoints - Array of points defining the polyline
 * @param {number} offset - Normalized offset (0-1)
 * @returns {{q: Pt, segIndex: number, t: number}} Object with point, segment index, and parameter
 */
function pointAtOffset(pathPoints, offset) {
    var normalizedOffset = Math.max(0, Math.min(1, offset));
    // Return first point if invalid path
    if (!pathPoints || pathPoints.length < 2) {
        return { q: pathPoints[0] || { x: 0, y: 0 }, segIndex: 0, t: 0 };
    }
    // Compute true segment lengths and total path length
    var segmentLengths = [];
    var totalLength = 0;
    for (var segmentIndex = 0; segmentIndex < pathPoints.length - 1; segmentIndex++) {
        var start = pathPoints[parseInt(segmentIndex.toString(), 10)];
        var end = pathPoints[parseInt(segmentIndex.toString(), 10) + 1];
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var segmentLength = Math.hypot(dx, dy);
        segmentLengths.push(segmentLength);
        totalLength += segmentLength;
    }
    // Return first point if degenerate path
    if (totalLength < EPS) {
        return { q: pathPoints[0], segIndex: 0, t: 0 };
    }
    // Walk segments until reaching target arclength
    var remainingLength = normalizedOffset * totalLength;
    for (var segmentIndex = 0; segmentIndex < segmentLengths.length; segmentIndex++) {
        var segmentLength = segmentLengths[parseInt(segmentIndex.toString(), 10)];
        if (remainingLength <= segmentLength || segmentIndex === segmentLengths.length - 1) {
            var tOnSegment = segmentLength > 0 ? (remainingLength / segmentLength) : 0;
            var startPoint = pathPoints[parseInt(segmentIndex.toString(), 10)];
            var endPoint = pathPoints[parseInt(segmentIndex.toString(), 10) + 1];
            var pointOnPath = {
                x: startPoint.x + (endPoint.x - startPoint.x) * tOnSegment,
                y: startPoint.y + (endPoint.y - startPoint.y) * tOnSegment
            };
            return { q: pointOnPath, segIndex: segmentIndex, t: tOnSegment };
        }
        remainingLength -= segmentLength;
    }
    // Fallback to last point
    var lastPoint = pathPoints[parseInt(pathPoints.length.toString(), 10) - 1];
    return { q: lastPoint, segIndex: segmentLengths.length - 1, t: 1 };
}
/**
 * Calculates annotation placement margin using a known offset on the connector.
 * @function AnnotationMargin
 * @param {VisioConnector} conn - The connector shape
 * @param {object} visioText - Visio text transform properties
 * @param {number} offset - Normalized offset on the connector (0-1)
 * @returns {Margin} Object with left and top margin values
 */
function AnnotationMargin(conn, visioText, offset) {
    var threshold = 12;
    // Build connector path in page pixels
    var path = buildConnectorPolylinePx(conn);
    // Compute text box center in connector-local inches
    var dxcIn = visioText.txtWidth / 2 - visioText.txtLocPinX;
    var dycIn = visioText.txtHeight / 2 - visioText.txtLocPinY;
    // Convert local center to absolute page pixel point
    var beginPx = { x: conn.beginX, y: conn.beginY };
    var endPx = { x: conn.endX, y: conn.endY };
    var dir = normalize({ x: endPx.x - beginPx.x, y: endPx.y - beginPx.y });
    var localYIn = (visioText.txtPinY) + dycIn;
    var localXIn = (visioText.txtPinX) + dxcIn;
    // Adjust local coordinates based on connector direction
    if (isVertical(dir)) {
        localXIn = (visioText.txtPinX - visioText.txtLocPinY) + dycIn;
    }
    if (isHorizontal(dir)) {
        localYIn = (visioText.txtPinY - visioText.txtLocPinY) + dycIn;
    }
    var labelCenter = InchesToPagePx(beginPx, endPx, localXIn, localYIn);
    // Get anchor point on connector at given offset
    var q = pointAtOffset(path, offset).q;
    // Calculate margin as difference between label center and anchor
    var left = labelCenter.x - q.x;
    var top = labelCenter.y - q.y;
    // Snap to zero if below threshold
    if (Math.abs(left) <= threshold) {
        left = 0;
    }
    if (Math.abs(top) <= threshold) {
        top = 0;
    }
    return { left: left, top: top };
}
/**
 * Calculates port placement margin using a known offset on the connector.
 * @function PortMargin
 * @param {VisioConnector} conn - The connector shape
 * @param {VisioPort} visioPort - The connector port
 * @param {number} offset - Normalized offset on the connector (0-1)
 * @returns {Margin} Object with left and top margin values
 */
function PortMargin(conn, visioPort, offset) {
    // Build connector path in page pixels
    var path = buildConnectorPolylinePx(conn);
    // Convert port position to page pixels
    var beginPx = { x: conn.beginX, y: conn.beginY };
    var endPx = { x: conn.endX, y: conn.endY };
    // Use the port's connector-local inches directly.
    var labelCenter = InchesToPagePx(beginPx, endPx, visioPort.x, visioPort.y);
    // Get anchor point on connector at given offset
    var q = pointAtOffset(path, offset).q;
    // Exact pixel delta; no snapping.
    var left = labelCenter.x - q.x;
    var top = labelCenter.y - q.y;
    return { left: left, top: top };
}
/**
 * Converts Visio connector data to Syncfusion connector format.
 * Applies styling, constraints, decorators, and annotations.
 * @function bindVisioConnectors
 * @param {VisioConnector} connectorData - The Visio connector to convert
 * @param {ParsingContext} context - Parsing context for warnings and settings
 * @returns {any} Syncfusion connector object
 */
export function bindVisioConnectors(connectorData, context) {
    var ports = connectorData.ports;
    var pathPx = buildConnectorPolylinePx(connectorData);
    var beginPx = { x: connectorData.beginX, y: connectorData.beginY };
    var endPx = { x: connectorData.endX, y: connectorData.endY };
    // Calculate offsets and margins for ports
    for (var i = 0; i < ports.length; i++) {
        var p = ports[parseInt(i.toString(), 10)];
        var pagePoint = InchesToPagePx(beginPx, endPx, p.x, p.y);
        var offset = pathOffsetAlongPolyline(pathPx, pagePoint);
        var margin = PortMargin(connectorData, p, offset);
        ports[parseInt(i.toString(), 10)].offset = offset;
        ports[parseInt(i.toString(), 10)].margin = margin;
    }
    // Warn about unsupported corner radius
    if (connectorData.cornerRadius) {
        context.addWarning('[WARNING] :: Compound type, cap type, and rounding presets are not supported in Syncfusion.');
        context.addWarning('[WARNING] :: Corner radius differs between Visio and Syncfusion.');
    }
    // Return Syncfusion connector object
    return {
        id: connectorData.id,
        addInfo: connectorData.addInfo,
        type: getType(connectorData.type, context),
        sourceID: connectorData.sourceId,
        targetID: connectorData.targetId,
        sourcePortID: connectorData.sourcePortId,
        targetPortID: connectorData.targetPortId,
        sourcePoint: {
            x: formatCoordinate(connectorData.beginX),
            y: formatCoordinate(connectorData.beginY)
        },
        targetPoint: {
            x: formatCoordinate(connectorData.endX),
            y: formatCoordinate(connectorData.endY)
        },
        visible: connectorData.visible,
        style: setConnectorStyle(connectorData, context),
        cornerRadius: connectorData.cornerRadius,
        annotations: getVisioConnectorAnnotations(connectorData, context),
        sourceDecorator: getDecoratorStyle(connectorData.sourceDecorator, context),
        targetDecorator: getDecoratorStyle(connectorData.targetDecorator, context),
        constraints: setConstraints(connectorData, context),
        tooltip: { content: connectorData.tooltip ? connectorData.tooltip : '' },
        bridgeSpace: formatCoordinate(connectorData.bridgeSpace ? connectorData.bridgeSpace : 10),
        segments: (connectorData.segments && connectorData.segments.length) > 1 ? connectorData.segments : [],
        ports: connectorData.ports,
        shape: connectorData.shape
    };
}
/**
 * Extracts and formats connector annotations (text labels).
 * Calculates annotation positioning and styling.
 * @function getVisioConnectorAnnotations
 * @param {VisioConnector} connectorData - The connector containing annotations
 * @param {ParsingContext} context - Parsing context for styling and warnings
 * @returns {any[]} Array of annotation objects
 */
function getVisioConnectorAnnotations(connectorData, context) {
    var annotation = connectorData.annotation;
    var annotationPx = buildConnectorPolylinePx(connectorData);
    var beginPx = { x: connectorData.beginX, y: connectorData.beginY };
    var endPx = { x: connectorData.endX, y: connectorData.endY };
    var pagePoint = InchesToPagePx(beginPx, endPx, annotation.txtPinX, annotation.txtPinY);
    var annotationOffset = pathOffsetAlongPolyline(annotationPx, pagePoint);
    var margin = AnnotationMargin(connectorData, annotation, annotationOffset);
    var style = setconnectorAnnotation(connectorData, context);
    // Return annotations only if content exists and is non-empty
    if (connectorData.annotation && connectorData.annotation.content && connectorData.annotation.content.trim() !== '') {
        return [{
                content: connectorData.annotation.content,
                rotateAngle: (360 - (connectorData.annotation.rotateAngle)) % 360 || 0,
                visibility: connectorData.annotation.visible,
                constraints: setAnnotationConstraints(connectorData.annotation),
                verticalAlignment: connectorData.annotation.verticalAlignment,
                horizontalAlignment: connectorData.annotation.horizontalAlignment,
                style: style,
                hyperlink: setHyperLink(connectorData, style),
                offset: annotationOffset,
                margin: margin
            }];
    }
    return [];
}
/**
 * Extracts hyperlink information from a connector annotation.
 * @function setHyperLink
 * @param {VisioConnector} connectorData - The connector with annotation
 * @param {ResolvedAnnotationStyle} style - The connector with annotation
 * @returns {any} Hyperlink object, or undefined if no hyperlink present
 */
function setHyperLink(connectorData, style) {
    if (connectorData.annotation && connectorData.annotation.hyperlink && connectorData.annotation.hyperlink.link) {
        return {
            link: connectorData.annotation.hyperlink.link,
            content: connectorData.annotation.content || '',
            color: style.color,
            hyperlinkOpenState: connectorData.annotation.hyperlink.newWindow ? 'NewWindow' : 'NewTab'
        };
    }
    return undefined;
}
/**
 * Applies styling to a connector line.
 * Applies theme colors and formats dash patterns.
 * @function setConnectorStyle
 * @param {VisioConnector} connector - The connector to style
 * @param {ParsingContext} context - Parsing context for theme styling
 * @returns {ConnectorResolvedStyle} Syncfusion connector style object
 */
function setConnectorStyle(connector, context) {
    var connectorStyle = applyThemeStyles(connector, context);
    // Warn about stroke dash differences
    if (connectorStyle.strokeDashArray) {
        context.addWarning('[WARNING] :: Stroke dash arrays differ between Visio and Syncfusion.');
    }
    connector.cornerRadius = connectorStyle.cornerRadius ? inchToPx(connectorStyle.cornerRadius) : 0;
    return {
        strokeColor: typeof connectorStyle.strokeColor !== 'undefined' ? connectorStyle.strokeColor : defaultStroke,
        strokeWidth: connectorStyle.strokeWidth,
        strokeDashArray: connectorStyle.strokeDashArray,
        opacity: connectorStyle.opacity !== undefined ? (1 - connectorStyle.opacity) : 1
    };
}
/**
 * Applies styling to connector decorators (arrow heads).
 * Handles gradients and validates decorator shapes.
 * @function getDecoratorStyle
 * @param {VisioDecoratorModel} decorator - The decorator model to style
 * @param {ParsingContext} context - Parsing context for warnings
 * @returns {any} Syncfusion decorator style object
 */
function getDecoratorStyle(decorator, context) {
    var validDecoratorShapes = [
        'Arrow', 'None', 'Diamond', 'OpenArrow', 'Circle', 'Square',
        'Fletch', 'OpenFetch', 'IndentedArrow', 'OutdentedArrow',
        'DoubleArrow', 'Custom'
    ];
    var decoratorSize;
    var decoratorstyle = applyThemeStyles(decorator, context);
    // Warn about approximations
    context.addWarning('[WARNING] :: Decorator sizes are approximated.');
    var shape = decorator.isSource ? decorator.isSourceShapeChanged ? decorator.shape : decoratorstyle.startDecorator
        : decorator.isTargetShapeChanged ? decorator.shape : decoratorstyle.endDecorator;
    if (validDecoratorShapes.indexOf(shape) !== -1) {
        context.addWarning('[WARNING] :: Decorator shapes available in Visio are 45; in Syncfusion only 12 shapes are available. Unsupported shapes are rendered as Arrow shape.');
    }
    // Extract source decorator size
    if (decorator.isSource) {
        if (decoratorstyle.startDecoratorSize) {
            decoratorSize = getDecoratorDimensions(decoratorstyle.startDecoratorSize, shape);
        }
        else {
            decoratorSize = getDecoratorDimensions(decorator.arrowDimension, shape);
        }
    }
    // Extract target decorator size
    else {
        if (decoratorstyle.endDecoratorSize) {
            decoratorSize = getDecoratorDimensions(decoratorstyle.endDecoratorSize, shape);
        }
        else {
            decoratorSize = getDecoratorDimensions(decorator.arrowDimension, shape);
        }
    }
    var height = decoratorSize.height || 8;
    var width = decoratorSize.width || 8;
    // Extract colors
    var fill = decorator.style.fill ? decorator.style.fill : decoratorstyle.strokeColor;
    var strokeColor = decorator.style.strokeColor ? decorator.style.strokeColor : decoratorstyle.strokeColor;
    var strokeWidth = decoratorstyle.strokeWidth;
    // Extract opacity
    var opacity = 1;
    if (decorator.style.opacity !== undefined && decorator.style.opacity !== null) {
        opacity = (1 - decorator.style.opacity);
    }
    // Build gradient if enabled
    var gradient;
    if (decorator.style.isgradientEnabled) {
        context.addWarning('[WARNING] :: Gradients are approximated.');
        if (decorator.style.gradientType === 'Linear') {
            gradient = {
                type: 'Linear',
                x1: decorator.style.gradientcoOrdinates.x1,
                y1: decorator.style.gradientcoOrdinates.y1,
                x2: decorator.style.gradientcoOrdinates.x2,
                y2: decorator.style.gradientcoOrdinates.y2,
                stops: decorator.style.gradientStops
            };
        }
        else {
            gradient = {
                type: 'Radial',
                cx: decorator.style.gradientcoOrdinates.cx,
                cy: decorator.style.gradientcoOrdinates.cy,
                fx: decorator.style.gradientcoOrdinates.fx,
                fy: decorator.style.gradientcoOrdinates.fy,
                r: decorator.style.gradientcoOrdinates.r,
                stops: decorator.style.gradientStops
            };
        }
    }
    else {
        gradient = undefined;
    }
    return {
        height: height, width: width, shape: shape,
        style: { fill: fill, strokeColor: strokeColor, opacity: opacity, gradient: gradient, strokeWidth: strokeWidth }
    };
}
/**
 * Applies styling and theme colors to connector annotation text.
 * Handles font family, size, color, and text decoration.
 * @function setconnectorAnnotation
 * @param {VisioConnector} connectorData - The connector with annotation
 * @param {ParsingContext} context - Parsing context for theme styling
 * @returns {any} Syncfusion annotation style object
 */
function setconnectorAnnotation(connectorData, context) {
    // Extract incoming style properties
    var incomingStyle = connectorData &&
        connectorData.annotation &&
        connectorData.annotation.style
        ? connectorData.annotation.style
        : {};
    var incomingColor = typeof incomingStyle.color === 'string' ? incomingStyle.color : undefined;
    var resolvedColor = incomingColor ? incomingColor : '';
    var resolvedFontFamily = typeof incomingStyle.fontFamily === 'string'
        ? incomingStyle.fontFamily
        : undefined;
    var themeFontApplied = false;
    var themeColorApplied = false;
    // Check for active theme application
    var activeTheme = isActiveThemeApplied(connectorData.annotation, context);
    if (activeTheme && activeTheme.isThemeApplied) {
        if (activeTheme.theme && Array.isArray(activeTheme.theme) && activeTheme.theme.length > 0) {
            var first = activeTheme.theme[0];
            // Apply theme font if available
            if (first && typeof first.fontFamily === 'string') {
                var fontName = first.fontFamily;
                if (fontMapping && typeof fontMapping === 'object' && hasOwn(fontMapping, fontName)) {
                    fontName = fontMapping["" + fontName];
                }
                resolvedFontFamily = fontName;
                themeFontApplied = true;
            }
            // Apply theme color if not already set
            if (!incomingColor || incomingColor === 'Themed') {
                var range = normalizeRange(activeTheme.range);
                var fontEntry = getConnectorFontType(activeTheme.currentTheme, range);
                if (fontEntry && hasOwn(fontEntry, 'vt:color')) {
                    var colorNodeUnknown = fontEntry['vt:color'];
                    var colorInput = extractColorWithModifiers(colorNodeUnknown);
                    var themed = resolveAccentColor(colorInput, activeTheme.theme, activeTheme.fillIdxColor);
                    if (typeof themed === 'string' && themed !== '') {
                        resolvedColor = themed;
                        themeColorApplied = true;
                    }
                }
            }
        }
    }
    // Set final property values with fallbacks
    var finalColor = themeColorApplied
        ? resolvedColor
        : (incomingStyle.color !== undefined && incomingStyle.color !== null && incomingStyle.color !== ''
            ? incomingStyle.color
            : '#000000');
    var finalFontFamily = themeFontApplied ? resolvedFontFamily : incomingStyle.fontFamily;
    var finalFontSize = typeof incomingStyle.fontSize === 'number' ? incomingStyle.fontSize : 8 * 1.33;
    var finalOpacity = typeof incomingStyle.opacity === 'number' ? incomingStyle.opacity : 1;
    var finalBold = typeof incomingStyle.bold === 'boolean' ? incomingStyle.bold : false;
    var finalItalic = typeof incomingStyle.italic === 'boolean' ? incomingStyle.italic : false;
    var finalTextAlign = getTextAlign(incomingStyle.textAlign);
    var finalTextDecoration = getTextDecoration(incomingStyle.textDecoration);
    return {
        color: finalColor,
        fill: incomingStyle.fill,
        fontFamily: finalFontFamily,
        fontSize: finalFontSize,
        opacity: finalOpacity,
        bold: finalBold,
        italic: finalItalic,
        textAlign: finalTextAlign,
        textDecoration: finalTextDecoration
    };
}
