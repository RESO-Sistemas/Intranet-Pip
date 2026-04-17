/**
 * Centralized constants for Visio import/export operations.
 * This file acts as a data dictionary, separating configuration and mappings
 * from application logic to improve maintainability and consistency.
 *
 * The constants are organized into logical sections:
 * - Global constants (units, conversions, defaults)
 * - BPMN properties and shape types
 * - Mapping tables for BPMN elements
 * - Shape categorization and transformations
 * - Line patterns and text styling
 * - Decorator mappings and limitations
 *
 * @module visio-constants
 */
/**
 * Constants for unit and angle conversions used throughout Visio processing.
 * These values are essential for converting between Visio's inch-based coordinate
 * system and pixel-based display coordinates, as well as angle measurements.
 *
 * @constant {Object} UNIT_CONVERSION
 * @property {number} SCREEN_DPI - Standard screen resolution (96 DPI)
 * @property {number} PIXEL_CONVERSION_FACTOR - Internal pixel calculation multiplier
 * @property {number} RADIANS_TO_DEGREES - Conversion multiplier for radians to degrees
 * @property {number} DEGREES_TO_RADIANS - Conversion multiplier for degrees to radians
 * @readonly
 */
export declare const UNIT_CONVERSION: Readonly<{
    SCREEN_DPI: number;
    PIXEL_CONVERSION_FACTOR: number;
    RADIANS_TO_DEGREES: number;
    DEGREES_TO_RADIANS: number;
}>;
/**
 * Default styling values for shapes and text when not specified in the Visio file.
 * These defaults are applied when Visio elements lack explicit style properties,
 * ensuring consistent rendering across imported diagrams.
 *
 * @constant {Object} DEFAULT_STYLES
 * @property {number} FONT_SIZE - Default font size in points
 * @property {string} FONT_FAMILY - Default font family name
 * @property {string} TEXT_COLOR - Default text color
 * @property {string} TEXT_FILL - Default text background fill
 * @property {number} OPACITY - Default opacity (fully opaque)
 * @property {string} STROKE_COLOR - Default stroke/line color
 * @property {number} STROKE_WIDTH - Default stroke width
 * @readonly
 */
export declare const DEFAULT_STYLES: Readonly<{
    FONT_SIZE: number;
    FONT_FAMILY: string;
    TEXT_COLOR: string;
    TEXT_FILL: string;
    OPACITY: number;
    STROKE_COLOR: string;
    STROKE_WIDTH: number;
}>;
/**
 * Default metrics for layout, padding, and geometric precision.
 * These values control the precision of mathematical calculations and spacing
 * around diagram elements during import and rendering.
 *
 * @constant {Object} LAYOUT_METRICS
 * @property {number} PATH_PRECISION - Decimal places for path data values
 * @property {number} PADDING_FOR_GROUP - Padding pixels around grouped shapes
 * @property {number} PADDING_FOR_SHAPE - Padding pixels around individual shapes
 * @readonly
 */
export declare const LAYOUT_METRICS: Readonly<{
    PATH_PRECISION: number;
    PADDING_FOR_GROUP: number;
    PADDING_FOR_SHAPE: number;
}>;
/**
 * Constant names for common Visio XML sections and cells used in BPMN processing.
 * These identify specific sections within Visio shape definitions where BPMN-specific
 * properties, user data, and action information are stored.
 *
 * @constant {Object} BPMN_PROPERTIES
 * @property {string} PROPERTY_SECTION - Section name for BPMN properties
 * @property {string} USER_SECTION - Section name for user-defined data
 * @property {string} RELATIONSHIPS_CELL - Cell name for shape relationships
 * @property {string} VALUE_CELL - Cell name for property values
 * @property {string} ACTIONS_SECTION - Section name for action definitions
 * @readonly
 */
export declare const BPMN_PROPERTIES: Readonly<{
    PROPERTY_SECTION: string;
    USER_SECTION: string;
    RELATIONSHIPS_CELL: string;
    VALUE_CELL: string;
    ACTIONS_SECTION: string;
}>;
/**
 * Set of valid color transform type names used in theme color modifications.
 * These transforms are applied to theme colors to adjust luminance, saturation,
 * hue, alpha, and other color properties in the diagram styling system.
 *
 * @constant {Set<string>} VALID_TYPES
 * @remarks
 * Supported transforms include:
 * - Luminance modifiers: lumMod, lumOff
 * - Saturation modifiers: satMod, satOff
 * - Hue modifiers: hueMod, hueOff, hueShift
 * - Alpha (opacity) modifiers: alpha, alphaMod, alphaOff
 * - Tint and shade operations: tint, shade
 */
export declare const VALID_TYPES: Set<string>;
/**
 * Type definition for keys used in color transformation operations.
 * Represents all valid color transform property names.
 *
 * @typedef {string} TransformKey
 * @private
 */
export declare type TransformKey = 'shade' | 'tint' | 'lumMod' | 'lumOff' | 'satMod' | 'satOff' | 'hueMod' | 'hueOff' | 'hueShift' | 'alpha' | 'alphaMod' | 'alphaOff';
/**
 * Standard BPMN shape types used for classification and categorization.
 * These define the primary categories of BPMN elements that can appear in diagrams,
 * helping organize shape processing logic by element type.
 *
 * @constant {Object} BPMN_SHAPE_TYPES
 * @property {string} EVENT - BPMN event shapes (start, intermediate, end)
 * @property {string} GATEWAY - BPMN gateway decision shapes
 * @property {string} ACTIVITY - BPMN task and process activity shapes
 * @property {string} DATA_OBJECT - BPMN data object shapes
 * @property {string} DATA_SOURCE - BPMN data source/store shapes
 * @property {string} TEXT_ANNOTATION - BPMN text annotation shapes
 * @property {string} MESSAGE - BPMN message flow shapes
 * @property {string} GROUP - BPMN grouping container shapes
 * @readonly
 */
export declare const BPMN_SHAPE_TYPES: Readonly<{
    EVENT: string;
    GATEWAY: string;
    ACTIVITY: string;
    DATA_OBJECT: string;
    DATA_SOURCE: string;
    TEXT_ANNOTATION: string;
    MESSAGE: string;
    GROUP: string;
}>;
/**
 * Maps Visio's internal event names to standardized BPMN event types.
 * When Visio represents BPMN events with non-standard naming conventions,
 * this mapping translates them to the canonical BPMN event type names.
 *
 * @constant {Object} EVENT_NAME_MAP
 * @property {string} 'start(non-interrupting)' - Non-interrupting start event
 * @property {string} 'intermediate(non-interrupting)' - Non-interrupting intermediate event
 * @property {string} 'intermediate(throwing)' - Throwing intermediate event
 * @readonly
 * @example
 * // Maps Visio event names to BPMN standard names
 * const bpmnType = EVENT_NAME_MAP['start(non-interrupting)'];
 * // Result: 'NonInterruptingStart'
 */
export declare const EVENT_NAME_MAP: Readonly<Record<string, string>>;
/**
 * Maps Visio's internal trigger names to standardized BPMN trigger types.
 * Trigger names define what causes an event to activate in the process flow.
 * This mapping normalizes Visio's naming to BPMN standard names.
 *
 * @constant {Object} TRIGGER_MAP
 * @property {string} 'parallelmultiple' - Parallel multiple trigger type
 * @readonly
 * @example
 * // Maps Visio trigger names to BPMN standard names
 * const bpmnTrigger = TRIGGER_MAP['parallelmultiple'];
 * // Result: 'Parallel'
 */
export declare const TRIGGER_MAP: Readonly<Record<string, string>>;
/**
 * Maps Visio's gateway names to standardized BPMN gateway types.
 * Gateways control flow splitting and merging in BPMN processes.
 * This mapping converts various Visio naming conventions to standard gateway types.
 *
 * @constant {Object} GATEWAY_MAP
 * @property {string} 'exclusive' - Exclusive gateway (default behavior)
 * @property {string} 'inclusive' - Inclusive gateway
 * @property {string} 'parallel' - Parallel gateway
 * @property {string} 'complex' - Complex gateway
 * @property {string} 'event' - Event-based gateway
 * @property {string} 'eventbased' - Alternative event-based gateway naming
 * @property {string} 'exclusiveevent(instantiate)' - Exclusive event-based instantiation
 * @property {string} 'parallelevent(instantiate)' - Parallel event-based instantiation
 * @readonly
 * @example
 * // Maps Visio gateway names to BPMN standard names
 * const bpmnGateway = GATEWAY_MAP['inclusive'];
 * // Result: 'Inclusive'
 */
export declare const GATEWAY_MAP: Readonly<Record<string, string>>;
/**
 * Maps Visio's loop type names to standardized BPMN loop types.
 * Loop types define how activities can be repeated in a process.
 * This mapping normalizes various naming conventions to BPMN standard loop types.
 *
 * @constant {Object} LOOP_TYPE_MAP
 * @property {string} 'none' - No looping
 * @property {string} 'standard' - Standard loop
 * @property {string} 'parallelmultiinstance' - Parallel multi-instance loop
 * @property {string} 'sequentialmultiinstance' - Sequential multi-instance loop
 * @readonly
 * @example
 * // Maps Visio loop type names to BPMN standard names
 * const bpmnLoop = LOOP_TYPE_MAP['standard'];
 * // Result: 'Standard'
 */
export declare const LOOP_TYPE_MAP: Readonly<Record<string, string>>;
/**
 * Type definition for annotation orientation values.
 * Defines the valid positions where annotations can be placed relative to a shape.
 *
 * @typedef {string} Orientation
 * @private
 */
declare type Orientation = 'Top' | 'Bottom' | 'Left' | 'Right';
/**
 * Maps Visio's numeric orientation codes to human-readable orientation strings.
 * Used to interpret Visio's binary orientation flags and convert them to
 * directional values that describe where annotations are positioned.
 *
 * @constant {Object} ORIENTATION_MAP
 * @property {string} '1' - Right orientation
 * @property {string} '2' - Top orientation
 * @property {string} '3' - Left orientation
 * @property {string} '4' - Bottom orientation
 * @readonly
 * @example
 * // Maps Visio numeric codes to orientation strings
 * const orientation = ORIENTATION_MAP['2'];
 * // Result: 'Top'
 */
export declare const ORIENTATION_MAP: Readonly<Record<string, Orientation>>;
/**
 * Collections of shape names used for quick categorization during processing.
 * Organizing shapes into categories enables efficient filtering and specialized
 * handling based on shape type during import operations.
 *
 * @constant {Object} SHAPE_CATEGORIES
 * @property {Set<string>} BASIC - Basic geometric shapes
 * @property {Set<string>} FLOW - Flowchart-specific shapes
 * @property {Set<string>} BPMN - BPMN process diagram shapes
 * @readonly
 */
export declare const SHAPE_CATEGORIES: Readonly<{
    BASIC: Set<string>;
    FLOW: Set<string>;
    BPMN: Set<string>;
}>;
/**
 * Maps legacy or alternative Visio shape names to their modern flowchart equivalents.
 * This enables backward compatibility with older Visio files that may use
 * deprecated or non-standard shape naming conventions.
 *
 * @constant {Map<string, string>} SHAPE_TRANSFORMATIONS
 * @remarks
 * When processing shapes, if a shape name is found in this map, it is renamed
 * to its mapped equivalent before further processing.
 *
 * @example
 * // Transform legacy shape names to modern equivalents
 * const modernName = SHAPE_TRANSFORMATIONS.get('Subprocess');
 * // Result: 'PreDefinedProcess'
 */
export declare const SHAPE_TRANSFORMATIONS: Readonly<Map<string, string>>;
/**
 * Maps alternative basic shape names to their standardized equivalents.
 * Handles alternative naming conventions for basic geometric shapes
 * that may appear in different Visio versions or custom templates.
 *
 * @constant {Map<string, string>} BASIC_TRANSFORMATIONS
 * @remarks
 * Similar to SHAPE_TRANSFORMATIONS but specifically for basic geometric shapes.
 * Applied when processing shape names that may have alternative naming conventions.
 *
 * @example
 * // Transform alternative shape names to standard names
 * const standardName = BASIC_TRANSFORMATIONS.get('Circle');
 * // Result: 'Ellipse'
 */
export declare const BASIC_TRANSFORMATIONS: Readonly<Map<string, string>>;
/**
 * Maps Visio's numeric line pattern IDs to their corresponding SVG `stroke-dasharray` values.
 * Line patterns define dashing patterns for connector and shape borders.
 *
 * The SVG stroke-dasharray format uses space-separated numbers representing
 * the length of dashes and gaps in pixels. For example, '4 2' means 4px dash, 2px gap.
 *
 * @constant {Object} LINE_PATTERN_MAP
 * @remarks
 * Key: Visio line pattern ID (string, from 0-23).
 * Value: SVG stroke-dasharray string representation.
 *
 * Pattern descriptions:
 * - Solid lines: No entry (empty stroke-dasharray)
 * - Dashed: Various dash and gap combinations
 * - Dotted: Small dashes with regular spacing
 * - Complex patterns: Multiple dash/gap sequences
 *
 * @example
 * // Get the SVG dash pattern for Visio line pattern ID
 * const dashArray = LINE_PATTERN_MAP['2'];
 * // Result: '4 2' (medium dashes with small gaps)
 */
export declare const LINE_PATTERN_MAP: Readonly<Record<string, string>>;
/**
 * Bitwise flags for text styling extracted from Visio's text properties.
 * Used to determine which text styling options (bold, italic, underline) are applied.
 *
 * These flags are typically stored in Visio's 'Style' cell as a single numeric value
 * where each bit represents a specific style. Bitwise AND operations extract individual flags.
 *
 * @enum {number}
 * @remarks
 * Example: A style value of 3 means both BOLD (1) and ITALIC (2) are applied.
 * Use bitwise AND to check: (styleValue & VisioTextStyleFlag.BOLD) !== 0
 *
 * @example
 * // Check if text is bold
 * const styleCode = 5; // represents BOLD (1) + UNDERLINE (4)
 * const isBold = (styleCode & VisioTextStyleFlag.BOLD) !== 0; // true
 * const isItalic = (styleCode & VisioTextStyleFlag.ITALIC) !== 0; // false
 */
export declare enum VisioTextStyleFlag {
    /** Bold text flag (bit 0, value 1) */
    BOLD = 1,
    /** Italic text flag (bit 1, value 2) */
    ITALIC = 2,
    /** Underline text flag (bit 2, value 4) */
    UNDERLINE = 4
}
/**
 * Maps Visio's numeric codes for horizontal text alignment.
 *
 * Refactored from an enum to a const object. This is a modern TypeScript
 * best practice that avoids enum overhead while providing the same type safety.
 * Used to interpret Visio's horizontal alignment cell values.
 *
 * @constant {Object} VisioHorizontalAlignValue
 * @property {string} LEFT - Left alignment code
 * @property {string} CENTER - Center alignment code
 * @property {string} RIGHT - Right alignment code
 * @property {string} JUSTIFY - Justified alignment code
 * @readonly
 * @remarks
 * These numeric strings match Visio's internal alignment cell values.
 *
 * @example
 * // Get horizontal alignment from Visio cell value
 * const alignValue = VisioHorizontalAlignValue.CENTER;
 * // Result: '1'
 */
export declare const VisioHorizontalAlignValue: Readonly<{
    LEFT: string;
    CENTER: string;
    RIGHT: string;
    JUSTIFY: string;
}>;
/**
 * Maps Visio's numeric codes for vertical text alignment.
 * Used to interpret Visio's vertical alignment cell values.
 *
 * @constant {Object} VisioVerticalAlignValue
 * @property {string} TOP - Top alignment code
 * @property {string} CENTER - Center alignment code
 * @property {string} BOTTOM - Bottom alignment code
 * @readonly
 * @remarks
 * These numeric strings match Visio's internal alignment cell values.
 *
 * @example
 * // Get vertical alignment from Visio cell value
 * const alignValue = VisioVerticalAlignValue.CENTER;
 * // Result: '1'
 */
export declare const VisioVerticalAlignValue: Readonly<{
    TOP: string;
    CENTER: string;
    BOTTOM: string;
}>;
/**
 * Maps Visio's numeric decorator (arrowhead) IDs to their equivalent shape names.
 * Decorators are symbols displayed at the beginning or end of connectors.
 *
 * When a connector's 'EndArrow' or 'BeginArrow' cell contains a numeric code,
 * this map translates that code to a standardized decorator shape name used in Syncfusion.
 *
 * @constant {Object} DECORATOR_SHAPE_MAP
 * @remarks
 * Key: Numeric ID from Visio's EndArrow or BeginArrow cell.
 * Value: Standardized decorator shape name.
 *
 * Some Visio IDs may map to the same shape (e.g., 2, 4, 13 all map to 'Arrow')
 * to handle variations in Visio's internal representation.
 *
 * @example
 * // Get decorator shape from Visio arrow code
 * const shape = DECORATOR_SHAPE_MAP[4];
 * // Result: 'Arrow'
 */
export declare const DECORATOR_SHAPE_MAP: Readonly<Record<number, string>>;
/**
 * Maps standardized decorator shape names to arrays of possible sizes.
 * Defines the dimensions (width and height) for each decorator at different size levels.
 *
 * The index into each array corresponds to Visio's EndArrowSize or BeginArrowSize cell value.
 * For example, size index 0 is the smallest, and index 6 is the largest.
 *
 * @constant {Object} DECORATOR_SIZE_MAP
 * @remarks
 * Key: Lowercase decorator shape name (e.g., 'arrow', 'square', 'diamond').
 * Value: Array of objects with width and height properties, indexed by size level (0-6).
 *
 * Dimensions are provided for 7 size levels:
 * - Index 0: Extra small (4-15 px)
 * - Index 1: Very small (5-18 px)
 * - Index 2: Small (6-20 px)
 * - Index 3: Small-medium (8-25 px)
 * - Index 4: Medium (10-30 px)
 * - Index 5: Large (20-60 px)
 * - Index 6: Extra large (40-120 px)
 *
 * @example
 * // Get dimensions for medium-sized arrow
 * const size = DECORATOR_SIZE_MAP['arrow'][4];
 * // Result: { width: 12.5, height: 12.5 }
 */
export declare const DECORATOR_SIZE_MAP: Readonly<Record<string, Array<{
    width: number;
    height: number;
}>>>;
/**
 * Lists known limitations when importing/exporting Visio files.
 * Documents features and properties that are not supported or have limited support
 * in the Visio import/export functionality, helping developers understand
 * what to expect and what might differ from the original Visio file.
 *
 * The array is organized with prefixes indicating the category of limitation:
 * - DiagramProp: Diagram-level properties
 * - NodeProp: Shape/node-level properties
 * - ConnectorProp: Connector/line-level properties
 *
 * Each entry is prefixed with a unique identifier (DiagramProp1, NodeProp5, etc.)
 * for tracking and documentation purposes.
 *
 * @constant {string[]} IMPORT_LIMITATIONS
 * @readonly
 * @remarks
 * These limitations should be communicated to users when they import or export
 * Visio files to set proper expectations about visual and functional differences.
 *
 * @example
 * // Check limitations during import processing
 * console.warn('Known limitations:', IMPORT_LIMITATIONS);
 */
export declare const IMPORT_LIMITATIONS: string[];
export {};
