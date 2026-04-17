import { shapeIndex } from './visio-nodes';
/**
 * Represents the styling properties of a Visio shape (colors, gradients, strokes).
 * This class encapsulates all visual styling applied to a shape including fill, stroke,
 * and advanced gradient properties. Properties are optional to support partial styling.
 *
 * @example
 * const style = new VisioNodeStyle();
 * style.fillColor = '#FF0000';
 * style.strokeWidth = 2;
 * style.isGradientEnabled = true;
 * style.gradientType = 'Linear';
 *
 * @private
 */
var VisioNodeStyle = /** @class */ (function () {
    function VisioNodeStyle() {
        /**
         * The opacity/transparency of the shape's fill (0.0 = fully transparent, 1.0 = fully opaque).
         * Default is fully opaque (1). For images, this is parsed from the Transparency cell;
         * for other shapes, from FillForegndTrans cell.
         *
         * @type {number}
         * @default 1
         */
        this.opacity = 1;
        /**
         * The width/thickness of the stroke in pixels.
         * Default is 1 pixel. Value is extracted from the LineWeight cell.
         *
         * @type {number}
         * @default 1
         */
        this.strokeWidth = 1;
        // ==================== Gradient Properties ====================
        /**
         * Indicates whether gradient fill is enabled for this shape.
         * When true, gradient settings (type, angle, stops, etc.) should be applied.
         * Gradients in EJ2 are approximations of Visio gradients.
         *
         * @type {boolean}
         * @default false
         */
        this.isGradientEnabled = false;
        /**
         * The type of gradient applied ('Linear' for linear gradients, 'Radial' for radial gradients).
         * Rectangle and path gradient types from Visio are not supported in EJ2.
         *
         * @type {'Linear' | 'Radial'}
         * @default 'Linear'
         */
        this.gradientType = 'Linear';
        /**
         * The angle of the gradient in degrees (0-360).
         * For linear gradients, this defines the direction of the gradient flow.
         * Converted from radians in Visio (FillGradientAngle cell).
         *
         * @type {number}
         * @default 0
         */
        this.gradientAngle = 0;
    }
    return VisioNodeStyle;
}());
export { VisioNodeStyle };
/**
 * Represents shadow properties applied to a Visio shape.
 * Encapsulates outer shadow effects with color, opacity, and offset information.
 * EJ2 only supports outer shadows; other shadow types (e.g., "offset center") cannot be replicated.
 *
 * @example
 * const shadow = new VisioNodeShadow();
 * shadow.shadowPattern = true;
 * shadow.shadowOpacity = 0.8;
 * shadow.shadowcolor = '#000000';
 * shadow.shadow = { angle: 45, distance: 5 };
 *
 * @private
 */
var VisioNodeShadow = /** @class */ (function () {
    function VisioNodeShadow() {
        /**
         * Indicates whether a shadow pattern is enabled for this shape.
         * Corresponds to the ShdwPattern cell value (non-zero = shadow enabled).
         *
         * @type {boolean}
         * @default false
         */
        this.shadowPattern = false;
        /**
         * The opacity/transparency of the shadow (0.0 = fully transparent, 1.0 = fully opaque).
         * Calculated as (1 - ShdwForegndTrans) to convert Visio transparency to opacity.
         * Default is fully opaque (1).
         *
         * @type {number}
         * @default 1
         */
        this.shadowOpacity = 1;
    }
    return VisioNodeShadow;
}());
export { VisioNodeShadow };
/**
 * Represents a complete Visio shape (node) with all properties and styling.
 * This is the primary data model for a shape instance in the diagram,
 * including geometry, visual styling, positioning, and relationships.
 *
 * @example
 * const shape = new VisioShape();
 * shape.id = 'Shape1';
 * shape.name = 'Process Box';
 * shape.offsetX = 100;
 * shape.offsetY = 150;
 * shape.width = 80;
 * shape.height = 60;
 * shape.style = new VisioNodeStyle();
 *
 * @private
 */
var VisioShape = /** @class */ (function () {
    function VisioShape() {
        /**
         * The unique identifier for this shape within the diagram.
         * Used to reference the shape in connector endpoints and relationships.
         *
         * @type {string}
         * @default ''
         */
        this.id = '';
        /**
         * The primary type classification of the shape (e.g., 'Shape', 'Image', 'Group').
         * Default is 'Shape'; used to determine processing and rendering logic.
         *
         * @type {string}
         * @default 'Shape'
         */
        this.type = 'Shape';
        /**
         * The X coordinate of the shape's top-left corner in the page coordinate system.
         * Typically in inches, centimeters, or diagram units depending on page scale.
         *
         * @type {number}
         * @default 0
         */
        this.offsetX = 0;
        /**
         * The Y coordinate of the shape's bottom-left corner in the page coordinate system.
         * Note: Visio uses a bottom-left origin (Y increases upward).
         *
         * @type {number}
         * @default 0
         */
        this.offsetY = 0;
        /**
         * The width of the shape's bounding box in coordinate units.
         *
         * @type {number}
         * @default 0
         */
        this.width = 0;
        /**
         * The height of the shape's bounding box in coordinate units.
         *
         * @type {number}
         * @default 0
         */
        this.height = 0;
        /**
         * The horizontal pivot point (0-1, where 0.5 = center).
         * Defines the horizontal axis point around which the shape rotates.
         * Default 0.5 is center of the shape.
         *
         * @type {number}
         * @default 0.5
         */
        this.pivotX = 0.5;
        /**
         * The vertical pivot point (0-1, where 0.5 = center).
         * Defines the vertical axis point around which the shape rotates.
         * Default 0.5 is center of the shape.
         *
         * @type {number}
         * @default 0.5
         */
        this.pivotY = 0.5;
        /**
         * The rotation angle of the shape in degrees (0-360).
         * Positive values rotate counterclockwise (following standard math convention).
         *
         * @type {number}
         * @default 0
         */
        this.rotateAngle = 0;
        /**
         * The corner radius for rounded rectangles/shapes in coordinate units.
         * A value of 0 means sharp corners. Larger values create more pronounced rounding.
         *
         * @type {number}
         * @default 0
         */
        this.cornerRadius = 0;
        /**
         * Indicates whether the shape is visible in the diagram.
         * Set to false to hide the shape from display without removing it.
         *
         * @type {boolean}
         * @default true
         */
        this.visibility = true;
    }
    return VisioShape;
}());
export { VisioShape };
/**
 * Represents a Visio connector (line/edge) between shapes.
 * Note: The actual VisioConnector class is imported from './visio-connectors'.
 * This comment marks the conceptual location in the data model.
 *
 * Connectors link shapes together and may have their own styling and decorators.
 * They support various connector types (Straight, Curved, etc.) and endpoint decorators.
 *
 * @see VisioConnector in visio-connectors.ts for the complete implementation.
 * @private
 */
// export class VisioConnector {
//     id: string = '';
//     name?: string;
//     fromShape: string = '';
//     toShape: string = '';
//     fromCell?: string;
//     toCell?: string;
//     type: ConnectorType = 'Straight';
//     style?: VisioNodeStyle;
//     annotation?: unknown;
//     decoratorStart?: string;
//     decoratorEnd?: string;
// }
/**
 * Represents Visio window/view configuration and display settings.
 * Stores viewport properties, zoom levels, and display toggle flags
 * that configure how the diagram is viewed and interacted with.
 *
 * @example
 * const window = new VisioWindow();
 * window.viewScale = 1.0;  // 100% zoom
 * window.showGrid = true;
 * window.showRulers = true;
 *
 * @private
 */
var VisioWindow = /** @class */ (function () {
    function VisioWindow() {
        /**
         * Toggle flag for showing/hiding ruler guides along diagram edges.
         * Rulers help users measure and align shapes.
         *
         * @type {boolean}
         * @default false
         */
        this.showRulers = false;
        /**
         * Toggle flag for showing/hiding the grid overlay on the diagram.
         * Grid helps with shape alignment and snapping.
         *
         * @type {boolean}
         * @default false
         */
        this.showGrid = false;
        /**
         * Toggle flag for showing/hiding page break indicators on the diagram.
         * Useful when printing multiple pages.
         *
         * @type {boolean}
         * @default false
         */
        this.showPageBreaks = false;
        /**
         * Toggle flag for showing/hiding guide lines for alignment.
         * Guides are non-printing reference lines.
         *
         * @type {boolean}
         * @default false
         */
        this.showGuides = false;
        /**
         * Toggle flag for showing/hiding connection point indicators (ports) on shapes.
         * Connection points show where connectors can attach to shapes.
         *
         * @type {boolean}
         * @default false
         */
        this.showConnectionPoints = false;
        /**
         * Setting that controls automatic grid adjustments based on zoom level.
         * When enabled, grid spacing adjusts as user zooms in/out.
         *
         * @type {boolean}
         * @default false
         */
        this.dynamicGridEnabled = false;
    }
    return VisioWindow;
}());
export { VisioWindow };
/**
 * Represents the configuration and properties of a Visio page.
 * Pages are the primary containers for shapes and define page-level settings
 * like dimensions, scale, background, and layer organization.
 *
 * @example
 * const page = new VisioPage();
 * page.pageWidth = 11;
 * page.pageHeight = 8.5;
 * page.fillColor = '#FFFFFF';
 * page.bridging = 1;
 *
 * @private
 */
var VisioPage = /** @class */ (function () {
    function VisioPage() {
        /**
         * The width of the page in inches (or coordinate units).
         * Defines the horizontal extent of the page/canvas.
         *
         * @type {number}
         * @default 0
         */
        this.pageWidth = 0;
        /**
         * The height of the page in inches (or coordinate units).
         * Defines the vertical extent of the page/canvas.
         *
         * @type {number}
         * @default 0
         */
        this.pageHeight = 0;
        /**
         * Reference to a background page if this page uses one.
         * Background pages provide common elements across multiple pages.
         *
         * @type {number}
         * @default 0
         */
        this.backPage = 0;
        /**
         * The fill color of the page background in hex format.
         * Applied to the entire page surface.
         *
         * @type {string}
         * @default ''
         */
        this.fillColor = '';
        /**
         * Indicates whether this is a background page template.
         * Background pages don't appear directly in navigation but provide shared content.
         *
         * @type {boolean}
         * @default false
         */
        this.isBackgroundPage = false;
        /**
         * The horizontal offset for page shadow effect (if enabled).
         * Defines how far shadow extends horizontally.
         *
         * @type {number}
         * @default 0
         */
        this.shdwOffsetX = 0;
        /**
         * The vertical offset for page shadow effect (if enabled).
         * Defines how far shadow extends vertically.
         *
         * @type {number}
         * @default 0
         */
        this.shdwOffsetY = 0;
        /**
         * The page scale factor used for converting page units to printed units.
         * Common values: 1 inch = X page units.
         *
         * @type {number}
         * @default 0
         */
        this.pageScale = 0;
        /**
         * The drawing scale for the diagram (1 inch = X units in drawing).
         * Controls the overall zoom/scale of the diagram.
         *
         * @type {number}
         * @default 0
         */
        this.drawingScale = 0;
        /**
         * Drawing size type (0 = custom, 1 = standard, 2 = drawing/poster).
         * Determines which page size to use.
         *
         * @type {number}
         * @default 0
         */
        this.drawingSizeType = 0;
        /**
         * Drawing scale type (0 = custom, 1 = architectural, 2 = metric, etc.).
         * Specifies predefined scale templates.
         *
         * @type {number}
         * @default 0
         */
        this.drawingScaleType = 0;
        /**
         * UI visibility setting controlling shape selection and editing constraints.
         * Bitfield that may restrict certain UI operations.
         *
         * @type {number}
         * @default 0
         */
        this.uiVisibility = 0;
        /**
         * Shadow type on the page (0 = no shadow, 1 = oblique, 2 = perspective).
         * Controls the style of shadow applied to page background.
         *
         * @type {number}
         * @default 0
         */
        this.shdwType = 0;
        /**
         * The angle of oblique shadow in degrees (typically 45°).
         * Only applies if shdwType is set to oblique shadow.
         *
         * @type {number}
         * @default 0
         */
        this.shdwObliqueAngle = 0;
        /**
         * Scale factor for shadow size relative to page (0-1 scale).
         * Controls how large or small the shadow appears.
         *
         * @type {number}
         * @default 0
         */
        this.shdwScaleFactor = 0;
        /**
         * Drawing resize type determining how shapes fit on the page.
         * Controls automatic page/shape resizing behavior.
         *
         * @type {number}
         * @default 0
         */
        this.drawingResizeType = 0;
        /**
         * Indicates whether page shape elements can be moved/split across pages.
         * When true, large shapes can extend beyond page boundaries.
         *
         * @type {boolean}
         * @default false
         */
        this.pageShapeSplit = false;
        /**
         * Print page orientation (0 = portrait, 1 = landscape).
         * Controls how the page is oriented when printed.
         *
         * @type {number}
         * @default 0
         */
        this.printPageOrientation = 0;
        /**
         * Array of layers defined for this page.
         * Each layer can contain multiple shapes and have its own visibility settings.
         *
         * @type {VisioLayer[]}
         */
        this.layers = [];
        /**
         * Line jump code determining how connectors cross each other (0-4).
         * Controls connector routing: 0 = no bridging, 1 = no crossing, 2-4 = bridge styles.
         *
         * @type {number}
         * @default 1
         */
        this.bridging = 1;
        /**
         * Horizontal spacing for connector bridges/crossings in inches.
         * Controls the gap size when connectors bridge over each other.
         *
         * @type {number}
         * @default 0.6667
         */
        this.horizontalBridgeSpace = 0.6667;
        /**
         * Vertical spacing for connector bridges/crossings in inches.
         * Controls the gap size when connectors bridge over each other vertically.
         *
         * @type {number}
         * @default 0.6667
         */
        this.verticalBridgeSpace = 0.6667;
        /**
         * The variation style index within the theme (0-based).
         * Selects which color/style variation of the theme to apply.
         *
         * @type {number}
         * @default 0
         */
        this.variationStyleIndex = 0;
        /**
         * Default connector type for new connectors on this page (as string).
         * Examples: '0' = straight, '1' = curved, '2' = orthogonal.
         *
         * @type {string}
         * @default '0'
         */
        this.lineRouteExt = '0';
        /**
         * Default connector routing style for new connectors on this page (as string).
         *
         * @type {string}
         * @default '0'
         */
        this.routeStyle = '0';
        /**
         * Snap-to-grid inhibit flag (prevents snapping when true).
         * When true, shapes and connectors don't snap to grid.
         *
         * @type {boolean}
         * @default false
         */
        this.inhibitSnap = false;
        /**
         * Page lock replace flag preventing shape replacement.
         * When true, shapes cannot be replaced by dragging masters.
         *
         * @type {boolean}
         * @default false
         */
        this.pageLockReplace = false;
        /**
         * Page lock duplicate flag preventing shape duplication.
         * When true, shapes cannot be duplicated on this page.
         *
         * @type {boolean}
         * @default false
         */
        this.pageLockDuplicate = false;
    }
    return VisioPage;
}());
export { VisioPage };
/**
 * Represents a Visio master shape definition.
 * Masters are template shapes that can be reused across the diagram.
 * They provide default geometry, styling, and properties for shape instances.
 *
 * @example
 * const master = new VisioMaster();
 * master.id = 'M1';
 * master.name = 'Rectangle';
 * master.shapeType = 'Shape';
 * master.shapeKeywords = 'box,rectangle';
 *
 * @private
 */
var VisioMaster = /** @class */ (function () {
    function VisioMaster() {
        /**
         * The unique identifier for this master definition.
         * Used to reference the master when instantiating shapes.
         *
         * @type {string}
         * @default ''
         */
        this.id = '';
    }
    return VisioMaster;
}());
export { VisioMaster };
/**
 * Represents a Visio theme with color variants and styling information.
 * Themes provide cohesive color schemes, fonts, and effects that can be applied
 * to entire pages or individual shapes for visual consistency.
 *
 * @example
 * const theme = new VisioTheme();
 * theme.name = 'Office Theme';
 * theme.fontFamily = 'Calibri';
 * theme.fontColor = { dk1: '#000000', accent1: '#0563C1' };
 * theme.hexColors = ['#FF0000', '#00FF00'];
 *
 * @private
 */
var VisioTheme = /** @class */ (function () {
    function VisioTheme() {
    }
    return VisioTheme;
}());
export { VisioTheme };
/**
 * Represents Visio document-level settings and protection flags.
 * These are global settings that apply to the entire document,
 * controlling snap behavior, glue behavior, and content protection.
 *
 * @example
 * const settings = new VisioDocumentSettings();
 * settings.glueSettings = 1;
 * settings.snapSettings = 255;
 * settings.protectShapes = false;
 *
 * @private
 */
var VisioDocumentSettings = /** @class */ (function () {
    function VisioDocumentSettings() {
        /**
         * Glue behavior setting (0-3) controlling how connectors attach to shapes.
         * 0 = no glue, 1 = shape outline, 2 = connection points, 3 = both.
         *
         * @type {number}
         * @default 0
         */
        this.glueSettings = 0;
        /**
         * Snap behavior setting (bitfield) controlling snap targets.
         * Bits control: grid, shapes, guides, page margins, connection points, etc.
         *
         * @type {number}
         * @default 0
         */
        this.snapSettings = 0;
        /**
         * Extended snap target specification (0-255).
         * Extends snap behavior beyond basic snapSettings.
         *
         * @type {number}
         * @default 0
         */
        this.snapExtensions = 0;
        /**
         * Angle snap configuration (0-7) for rotation constraints.
         * Restricts shape rotation to specific angle increments.
         *
         * @type {number}
         * @default 0
         */
        this.snapAngles = 0;
        /**
         * Enables dynamic grid that adjusts spacing as user zooms.
         * When true, grid becomes denser or sparser based on zoom level.
         *
         * @type {boolean}
         * @default false
         */
        this.dynamicGridEnabled = false;
        /**
         * Protects styles from modification (read-only styles).
         * When true, users cannot change or create new styles.
         *
         * @type {boolean}
         * @default false
         */
        this.protectStyles = false;
        /**
         * Protects shapes from deletion or modification.
         * When true, users cannot move, resize, or delete shapes.
         *
         * @type {boolean}
         * @default false
         */
        this.protectShapes = false;
        /**
         * Protects master shapes from modification or deletion.
         * When true, master definitions cannot be edited or removed.
         *
         * @type {boolean}
         * @default false
         */
        this.protectMasters = false;
        /**
         * Protects background pages from modification.
         * When true, background page content cannot be edited.
         *
         * @type {boolean}
         * @default false
         */
        this.protectBkgnds = false;
    }
    return VisioDocumentSettings;
}());
export { VisioDocumentSettings };
/**
 * Represents connection data between shapes before it's resolved into final connectors.
 * This is intermediate data used during parsing to track which shapes should be connected.
 * After resolution, these are converted into actual VisioConnector objects.
 *
 * @example
 * const connData = new VisioConnectionData();
 * connData.fromSheet = 'Shape1';
 * connData.toSheet = 'Shape2';
 * connData.sourceId = 'Shape1';
 * connData.targetId = 'Shape2';
 * connData.sourcePortId = 'port0';
 * connData.targetPortId = 'port1';
 *
 * @private
 */
var VisioConnectionData = /** @class */ (function () {
    function VisioConnectionData() {
    }
    return VisioConnectionData;
}());
export { VisioConnectionData };
/**
 * Represents media file relationships in a Visio document.
 * Contains references to embedded media files (images, documents, etc.)
 * with their IDs and target paths within the VSDX archive.
 *
 * @example
 * const relationship = new VisioRelationship();
 * relationship.media.push({
 *     Id: 'rId4',
 *     Target: '../media/image1.png'
 * });
 *
 * @private
 */
var VisioRelationship = /** @class */ (function () {
    function VisioRelationship() {
        /**
         * Array of media file references found in the document.
         * Each entry contains a relationship ID and the target path to the media file.
         * Example: { Id: 'rId4', Target: '../media/image1.png' }
         *
         * @type {Array<{Id: string; Target: string}>}
         */
        this.media = [];
    }
    return VisioRelationship;
}());
export { VisioRelationship };
/**
 * Data container for all parsed elements from a Visio file.
 * An instance of this class is created for each import operation and holds
 * all the parsed diagram data, shapes, connectors, themes, and settings.
 *
 * This is the primary data structure used throughout the import/parsing process
 * and is eventually converted to the target diagram format.
 *
 * @example
 * const diagramData = new VisioDiagramData();
 * diagramData.pageWidth = 1100;
 * diagramData.pageHeight = 850;
 * diagramData.shapes.push(new VisioShape());
 * diagramData.connectors.push(new VisioConnector());
 *
 * @private
 */
var VisioDiagramData = /** @class */ (function () {
    function VisioDiagramData() {
        /**
         * Array of window/view configuration objects for this document.
         * May contain multiple windows if the document has multiple views open.
         *
         * @type {VisioWindow[]}
         */
        this.windows = [];
        /**
         * Array of all pages in this Visio document.
         * Each page contains shapes and their layer organization.
         *
         * @type {VisioPage[]}
         */
        this.pages = [];
        /**
         * Array of all master shape definitions used in this document.
         * Masters provide templates and default properties for shape instances.
         *
         * @type {VisioMaster[]}
         */
        this.masters = [];
        /**
         * Array of all shape instances in the document.
         * This is the main collection of drawable elements (nodes).
         *
         * @type {VisioShape[]}
         */
        this.shapes = [];
        /**
         * Array of all connector instances in the document.
         * Connectors represent edges/relationships between shapes.
         *
         * @type {VisioConnector[] | undefined}
         */
        this.connectors = [];
        /**
         * Array of connection relationships between shapes.
         * Intermediate representation of connections before final connector creation.
         *
         * @type {VisioConnections[]}
         */
        this.connections = [];
        /**
         * Array of theme definitions available in this document.
         * Each theme provides color schemes, fonts, and styling guidelines.
         *
         * @type {VisioTheme[]}
         */
        this.themes = [];
        /**
         * Collection of shape IDs that represent expanded subprocess containers.
         * Used to track which subprocess shapes have been expanded in the diagram.
         *
         * @type {string[]}
         */
        this.expandedSubprocessCollection = [];
        /**
         * Array of media relationships in the document.
         * Contains references to embedded files like images and documents.
         *
         * @type {VisioRelationship[] | undefined}
         */
        this.relations = [];
        /**
         * Map/record of media files indexed by their relationship ID.
         * Maps from rId (relationship ID) to VisioMedia object containing file data.
         * Example: { rId4: { name: 'image1.png', data: ... } }
         *
         * @type {Record<string, VisioMedia> | undefined}
         */
        this.medias = {};
    }
    /**
     * Resets all data in this instance to empty/default values.
     * Useful for reusing the same object for multiple parsing operations
     * or clearing state between imports.
     *
     * @returns {void} - Clears all internal collections and state.
     *
     * @example
     * diagramData.clear();
     * // Now safe to reuse for another import
     *
     * @private
     */
    VisioDiagramData.prototype.clear = function () {
        this.windows = [];
        this.pages = [];
        this.masters = [];
        this.shapes = [];
        this.connectors = [];
        this.documentSettings = undefined;
        this.connections = [];
        this.themes = [];
        this.currentPage = undefined;
        this.currentTheme = undefined;
        this.expandedSubprocessCollection = [];
        this.relations = [];
        // Reset global shape index counter
        shapeIndex.value = 0;
    };
    return VisioDiagramData;
}());
export { VisioDiagramData };
// ============================================================================
// Intermediate Parsing Models - To be moved later
// ============================================================================
/**
 * Intermediate model for style properties during parsing.
 * This is a temporary data structure used internally during the parsing process
 * and should be refactored into the final domain models (VisioNodeStyle, etc.).
 *
 * Note: This class is marked for future refactoring and movement to a separate file.
 *
 * @private
 */
var VisioStyleModel = /** @class */ (function () {
    function VisioStyleModel() {
        /**
         * The width of the stroke in pixels.
         *
         * @type {number}
         * @default 0
         */
        this.strokeWidth = 0;
        /**
         * The opacity of the style (0-1).
         *
         * @type {number}
         * @default 0
         */
        this.opacity = 0;
    }
    return VisioStyleModel;
}());
export { VisioStyleModel };
/**
 * Intermediate model for decorator styling during parsing.
 * This is a temporary data structure used internally during parsing
 * for handling connector decorators (arrows, circles, etc.).
 *
 * Note: This class is marked for future refactoring and movement to a separate file.
 *
 * @private
 */
var VisioDecoratorStyleModel = /** @class */ (function () {
    function VisioDecoratorStyleModel() {
        /**
         * The opacity of the decorator (0-1).
         *
         * @type {number}
         * @default 0
         */
        this.opacity = 0;
        /**
         * The width of the decorator stroke in pixels.
         *
         * @type {number}
         * @default 0
         */
        this.strokeWidth = 0;
        /**
         * Indicates whether gradient fill is enabled for the decorator.
         *
         * @type {boolean}
         * @default false
         */
        this.isGradientEnabled = false;
        /**
         * The type of gradient ('Linear' or 'Radial').
         *
         * @type {string}
         * @default 'Linear'
         */
        this.gradientType = 'Linear';
        /**
         * The angle of the gradient in degrees (0-360).
         *
         * @type {number}
         * @default 0
         */
        this.gradientAngle = 0;
    }
    return VisioDecoratorStyleModel;
}());
export { VisioDecoratorStyleModel };
/**
 * Intermediate model for decorator properties during parsing.
 * This is a temporary data structure used internally during parsing
 * for handling connector start/end decorators (arrows, circles, etc.).
 *
 * Note: This class is marked for future refactoring and movement to a separate file.
 *
 * @private
 */
var VisioDecoratorModel = /** @class */ (function () {
    function VisioDecoratorModel() {
    }
    return VisioDecoratorModel;
}());
export { VisioDecoratorModel };
/**
 * Represents resolved connection relationships between shapes.
 * This stores the final mapping of source and target shape IDs along with port information.
 *
 * @example
 * const connection = new VisioConnections();
 * connection.connectorId = 'Connector1';
 * connection.sourceId = 'Shape1';
 * connection.targetId = 'Shape2';
 * connection.sourcePortId = 'port0';
 *
 * @private
 */
var VisioConnections = /** @class */ (function () {
    function VisioConnections() {
    }
    return VisioConnections;
}());
export { VisioConnections };
