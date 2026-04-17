import { Attributes, CellMapValue, GeometryRowCoordinates, GeometryWithRows, GlobalOrigin, GradientStop, GradientVector, GroupTransform, ParsedXmlObject, PathConfig, PathCoordinates, PathOptions, RadialGradientConfig, ScalingFunctions, VisioCell, VisioSection, VisioShapeNode } from './visio-types';
/**
 * Core utilities and type guards for Visio import/export.
 * Centralizes common functions used across multiple modules.
 *
 * This module provides:
 * - Collection and array utilities
 * - Numeric parsing and validation
 * - Cell value extraction and mapping
 * - String formatting and conversion
 * - Master shape and grouping detection
 * - Angle and distance conversions
 * - Gradient and decorator processing
 * - Geometry and path generation
 * - Type guards and safe value access
 *
 * @module visio-core
 */
/**
 * Ensures a value is wrapped in an array for consistent processing.
 * Handles undefined, single values, and arrays uniformly.
 *
 * This utility is essential for handling Visio XML where properties can be
 * either single elements or arrays of elements, providing a unified interface.
 *
 * @template T - The type of elements in the array
 * @param {T | T[] | undefined | null} value - The value to ensure is an array
 * @returns {T[]} An array containing the value(s), or an empty array if value is falsy
 * @example
 * // Single value becomes array
 * ensureArray('test'); // Result: ['test']
 *
 * // Array stays array
 * ensureArray(['a', 'b']); // Result: ['a', 'b']
 *
 * // Falsy values become empty array
 * ensureArray(null); // Result: []
 */
export declare function ensureArray<T>(value: T | T[] | undefined | null): T[];
/**
 * Creates a map from an array of cells for efficient O(1) lookup access.
 * Maps cell names to their values, significantly improving performance for
 * repeated cell value lookups compared to linear search through arrays.
 *
 * Special handling for LocPinX and LocPinY cells:
 * - If a formula is available (F attribute), the formula is used as the value
 * - Otherwise, the evaluated value (V attribute) is used
 *
 * @param {VisioCell[]} cells - Array of Visio cells to map
 * @returns {Map<string, CellMapValue>} A map with cell names as keys and cell values as values
 * @example
 * // Map cells for quick lookup
 * const cells = [
 *   { $: { N: 'Width', V: '100' } },
 *   { $: { N: 'Height', V: '50' } }
 * ];
 * const map = createCellMap(cells);
 * map.get('Width'); // Result: '100'
 */
export declare function createCellMap(cells: VisioCell[]): Map<string, CellMapValue>;
/**
 * Safely converts a value that may be a single cell or an array of cells
 * into a lookup map for convenient access.
 *
 * This is a wrapper around createCellMap that normalizes the input to always be
 * an array before creating the map, simplifying client code.
 *
 * @param {VisioCell | VisioCell[]} cells - A single cell or array of cells to map
 * @returns {Map<string, CellMapValue>} A map with cell names as keys and cell values as values
 * @example
 * // Works with both single cell and array
 * mapCellValues(singleCell); // Works
 * mapCellValues(cellArray); // Works
 */
export declare function mapCellValues(cells: VisioCell | VisioCell[]): Map<string, CellMapValue>;
/**
 * Builds a cell map from a Visio shape node.
 * Converts the shape's Cell elements into a key-value map for easier lookup.
 *
 * @param {VisioShapeNode} node - Shape node containing Cell elements
 * @returns {Map<string, CellMapValue>} Map of cell names to values
 */
export declare function getCellMap(node: VisioShapeNode): Map<string, CellMapValue>;
/**
 * Merges two cell maps, overlaying instance values on top of master defaults.
 * Ensures that page-level overrides take precedence over master definitions.
 *
 * @param {Map<string, CellMapValue>} masterMap - Cell map from master shape
 * @param {Map<string, CellMapValue>} instMap - Cell map from instance shape
 * @returns {Map<string, CellMapValue>} Combined cell map with overrides applied
 */
export declare function mergeCellMaps(masterMap: Map<string, CellMapValue>, instMap: Map<string, CellMapValue>): Map<string, CellMapValue>;
/**
 * Safely retrieves a string attribute from an attributes object.
 * Returns an empty string if the key is missing or value is null/undefined.
 *
 * @param {object} attrs - Attributes object
 * @param {string} key - Attribute key to retrieve
 * @returns {string} Attribute value as string, or empty string
 */
export declare function getAttrString(attrs: Record<string, unknown>, key: string): string;
/**
 * Trims a string value and returns it, or empty string if falsy.
 * Ensures no null/undefined values propagate.
 *
 * @param {string} value - Input string to trim
 * @returns {string} Trimmed string or empty string
 */
export declare function getTrimmedOrEmpty(value: string): string;
/**
 * Safely parses a numeric cell value with fallback to a default value.
 * Handles undefined, null, non-numeric strings, and NaN values gracefully.
 *
 * This utility prevents parsing errors and ensures a numeric value is always returned,
 * making it safe to use in calculations without additional null/undefined checks.
 *
 * @param {string | undefined} value - The string value to parse as a number
 * @param {number} defaultValue - The value to return if parsing fails (default: 0)
 * @returns {number} The parsed number if valid, otherwise the default value
 * @example
 * // Valid number
 * parseNumberCell('42.5'); // Result: 42.5
 *
 * // Invalid input returns default
 * parseNumberCell('abc', 10); // Result: 10
 *
 * // Undefined returns default
 * parseNumberCell(undefined, 50); // Result: 50
 */
export declare function parseNumberCell(value: string | undefined, defaultValue?: number): number;
/**
 * Retrieves a numeric value from a map with a fallback.
 * Safely converts the stored value to a number or returns the fallback.
 *
 * @param {Map<string, any>} map - Map containing key-value pairs
 * @param {string} key - Key to look up in the map
 * @param {number} fallback - Value to return if lookup fails or is not numeric
 * @returns {number} Parsed number or fallback
 */
export declare function getNumberFromCellMap(map: Map<string, any>, key: string, fallback: number): number;
/**
 * Converts a value to boolean with flexible input handling.
 * Recognizes multiple false representations and validates Visio's boolean cell format.
 *
 * Visio represents booleans in cells as:
 * - '1' or true for true values
 * - '0' or false for false values
 *
 * This function handles all these cases plus common JavaScript boolean conversions.
 *
 * @param {string | undefined} value - The value to convert to boolean
 * @param {boolean} defaultValue - The fallback if value is null/undefined (default: false)
 * @returns {boolean} Boolean representation of the value
 * @example
 * // Visio format
 * toBoolean('1'); // Result: true
 * toBoolean('0'); // Result: false
 *
 * // String format
 * toBoolean('true'); // Result: true
 * toBoolean('false'); // Result: false
 *
 * // Numeric format
 * toBoolean(1); // Result: true
 * toBoolean(0); // Result: false
 *
 * // Undefined uses default
 * toBoolean(undefined, true); // Result: true
 */
export declare function toBoolean(value: string | undefined, defaultValue?: boolean): boolean;
/**
 * Gets a string value from a cell map with optional default.
 * Safely extracts string values from the cell lookup map.
 *
 * @param {Map<string, CellMapValue>} cellMap - Map of cell names to values
 * @param {string} key - Cell name to retrieve
 * @param {string} defaultValue - Default string value if key not found (default: '')
 * @returns {string} String value or default
 * @example
 * // Get existing value
 * getCellMapStringValue(cellMap, 'Name', 'Unknown');
 * // Result: cell value or 'Unknown'
 */
export declare function getCellMapStringValue(cellMap: Map<string, CellMapValue>, key: string, defaultValue?: string): string;
/**
 * Gets a numeric value from a cell map with optional default.
 * Safely extracts and parses numeric values from the cell lookup map.
 *
 * @param {Map<string, CellMapValue>} cellMap - Map of cell names to values
 * @param {string} key - Cell name to retrieve
 * @param {number} defaultValue - Default numeric value if key not found (default: 0)
 * @returns {number} Parsed number or default
 * @example
 * // Get numeric value
 * getCellMapNumericValue(cellMap, 'Width', 100);
 * // Result: parsed width or 100
 */
export declare function getCellMapNumericValue(cellMap: Map<string, CellMapValue>, key: string, defaultValue?: number): number;
/**
 * Gets a boolean value from a cell map with optional default.
 * Safely extracts boolean values from the cell lookup map.
 * Recognizes Visio's '1' for true and '0' for false conventions.
 *
 * @param {Map<string, CellMapValue>} cellMap - Map of cell names to values
 * @param {string} key - Cell name to retrieve
 * @param {boolean} defaultValue - Default boolean value if key not found (default: false)
 * @returns {boolean} Boolean value or default
 * @remarks
 * Visio represents booleans as '1' (true) and '0' (false) in cell values.
 * This function normalizes those values to JavaScript booleans.
 *
 * @example
 * // Get boolean value
 * getCellMapBooleanValue(cellMap, 'Visible', true);
 * // Result: true or false based on cell value
 */
export declare function getCellMapBooleanValue(cellMap: Map<string, CellMapValue>, key: string, defaultValue?: boolean): boolean;
/**
 * Finds a cell by name in an array and returns its evaluated value.
 * Linear search through cell array to locate and extract a specific cell value.
 *
 * This is useful for one-time cell lookups where creating a full map is unnecessary.
 * For multiple lookups, use createCellMap instead for better performance.
 *
 * @param {VisioCell[]} cells - Array of cells to search
 * @param {string} name - Cell name to find
 * @returns {string | undefined} Cell value as a string, or undefined if not found
 * @example
 * // Find specific cell value
 * const width = findCellValue(cells, 'Width');
 * // Result: '100' or undefined
 */
export declare function findCellValue(cells: VisioCell[], name: string): string | undefined;
/**
 * Converts a string from kebab-case or snake_case to lowerCamelCase.
 * Used extensively for converting Visio property names (e.g., 'Lock-Move-X')
 * to JavaScript naming conventions (e.g., 'lockMoveX').
 *
 * This function:
 * - Splits on hyphens (-) and underscores (_)
 * - Keeps first part lowercase
 * - Capitalizes first letter of subsequent parts
 * - Joins without separators
 *
 * @param {string} key - Property name to convert
 * @returns {string} lowerCamelCase version of the string
 * @example
 * // Convert Visio property names
 * toCamelCase('Lock-Move-X'); // Result: 'lockMoveX'
 * toCamelCase('Shape_Route_Style'); // Result: 'shapeRouteStyle'
 * toCamelCase('Width'); // Result: 'width'
 */
export declare function toCamelCase(key: string): string;
/**
 * Formats a coordinate value to a specified number of decimal places.
 * Rounds values to improve readability and reduces floating-point precision issues.
 *
 * This is commonly used for SVG path data and coordinate output where excessive
 * decimal places are unnecessary and increase file size.
 *
 * @param {number | null | undefined} value - Coordinate value to format
 * @param {number} precision - Number of decimal places (default: 2)
 * @returns {number | undefined} Formatted coordinate, or undefined if input is falsy
 * @example
 * // Format coordinate to 2 decimal places
 * formatCoordinate(42.123456); // Result: 42.12
 *
 * // Format with custom precision
 * formatCoordinate(3.14159, 4); // Result: 3.1416
 *
 * // Null/undefined returns undefined
 * formatCoordinate(null); // Result: undefined
 */
export declare function formatCoordinate(value: number | null | undefined, precision?: number): number | undefined;
/**
 * Checks if a shape is a group shape based on its `Type` attribute.
 * Group shapes contain other shapes and have special handling for positioning
 * and sizing calculations.
 *
 * @param {unknown} shape - The shape node to check
 * @returns {boolean} True if the shape is a group, false otherwise
 * @example
 * // Check if shape is a group
 * if (isGroupShape(shape)) {
 *   // Handle group-specific logic
 * }
 */
export declare function isGroupShape(shape: unknown): boolean;
/**
 * Applies a parent group's transform to a child cell map.
 * Handles flips, rotation, and pivot translation to convert
 * child pin coordinates into page coordinates.
 *
 * @param {Map<string, any>} mergedMap - Original cell map of the child shape
 * @param {GroupTransform} parentTx - Parent group transform details
 * @returns {Map<string, any>} New cell map with transformed PinX/PinY
 */
export declare function applyParentTransformToCellMap(mergedMap: Map<string, any>, parentTx: GroupTransform): Map<string, any>;
/**
 * Gets shape visibility status from its geometry section.
 * Checks for a 'NoShow' cell with value '1' which indicates hidden shapes.
 *
 * Visibility is stored in the Geometry section of shapes, and this function
 * searches both direct cells and row cells for the visibility flag.
 *
 * @param {VisioSection | VisioSection[] | undefined} sections - The Visio section(s) to check for visibility settings
 * @returns {boolean} True if the shape is visible (no 'NoShow' cell with value '1'), false if hidden
 * @remarks
 * Algorithm:
 * 1. Return true if no sections provided (assume visible by default)
 * 2. Find the Geometry section
 * 3. Search both direct cells and cells within rows
 * 4. Look for 'NoShow' cell with value '1'
 * 5. Return false if found (shape is hidden), true otherwise
 *
 * @example
 * // Check shape visibility
 * const isVisible = getVisibility(shape.Section);
 * if (!isVisible) {
 *   // Shape is hidden
 * }
 */
export declare function getVisibility(sections: VisioSection | VisioSection[] | undefined): boolean;
/**
 * Gets tooltip/comment text from a shape's cell map.
 * Extracts the comment cell which stores tooltip text displayed on hover.
 *
 * @param {Map<string, CellMapValue>} cellMap - The cell map containing shape properties
 * @returns {string} The comment/tooltip text, or an empty string if not found
 * @example
 * // Extract tooltip text
 * const tooltip = getTooltip(cellMap);
 * // Result: 'Click to activate' or ''
 */
export declare function getTooltip(cellMap: Map<string, CellMapValue>): string;
/**
 * Gets routing style flag from a shape's cell map.
 * Determines if a connector uses automatic line routing (Bezier or orthogonal).
 *
 * Specific routing style values indicate automatic routing should be enabled.
 * These values are defined in Visio's ShapeRouteStyle cell.
 *
 * @param {Map<string, CellMapValue>} cellMap - The cell map containing shape properties
 * @returns {boolean} The routing style flag value (true if automatic routing enabled)
 * @remarks
 * Routing values that enable automatic routing: 3, 4, 5, 6, 10, 11, 12, 13
 * All other values result in manual routing (returns false).
 *
 * @example
 * // Check if automatic routing is enabled
 * const hasRouting = getRouting(cellMap);
 * // Result: true or false
 */
export declare function getRouting(cellMap: Map<string, CellMapValue>): boolean;
/**
 * Converts radians to degrees using centralized constants.
 * Uses the RADIANS_TO_DEGREES constant from visio-constants for consistency.
 *
 * @param {number} radians - The angle value in radians to convert
 * @returns {number} The equivalent angle value in degrees
 * @example
 * // Convert common angles
 * radiansToDegrees(Math.PI); // Result: 180
 * radiansToDegrees(Math.PI / 2); // Result: 90
 */
export declare function radiansToDegrees(radians: number): number;
/**
 * Converts inches to pixels based on configured screen DPI.
 * Uses SCREEN_DPI constant (96) as the standard conversion rate.
 *
 * Visio uses inches as its primary unit, while the diagram component uses pixels.
 * This conversion is fundamental to translating all Visio coordinates.
 *
 * @param {number} val - The value in inches to convert
 * @returns {number} The equivalent value in pixels
 * @example
 * // Convert Visio inches to pixels
 * inchToPx(1); // Result: 96 (96 pixels per inch)
 * inchToPx(0.5); // Result: 48
 */
export declare function inchToPx(val: number): number;
/**
 * Converts inches to points (72 pt per inch).
 * Uses SCREEN_DPI as a single source of truth with point scaling factor.
 *
 * Points are used in typography (72 points = 1 inch).
 * This conversion is useful for font sizes and other typography-related measurements.
 *
 * @param {number} val - The value in inches to convert
 * @returns {number} The equivalent value in points
 * @remarks
 * Formula: inches * (96 DPI * (72 points / 96 pixels)) = inches * 72
 *
 * @example
 * // Convert inches to points
 * inchToPoint(1); // Result: 72 (72 points per inch)
 * inchToPoint(0.5); // Result: 36
 */
export declare function inchToPoint(val: number): number;
/**
 * Extracts gradient stops from a FillGradient or LineGradient section.
 * Converts Visio gradient data into standard objects with color, opacity, and offset.
 *
 * Gradient stops define the color and transparency at specific positions along
 * a gradient. This function normalizes Visio's representation to standard format.
 *
 * Stop object structure:
 * - color: hex color string (e.g., '#FF0000')
 * - opacity: 0-1 range (1 = fully opaque, calculated as 1 - transparency)
 * - offset: 0-1 range (normalized position along gradient)
 *
 * @param {VisioSection | null | undefined} fillGradientSection - The Visio FillGradient or LineGradient section to extract gradient stops from
 * @returns {GradientStop[]} Array of gradient stop objects containing color, opacity, and offset properties
 * @remarks
 * Skips rows marked as deleted (Del='1').
 * Uses default black (#000000) and fully opaque for missing color/opacity values.
 *
 * @example
 * // Extract gradient stops from fill section
 * const stops = extractGradientStops(fillGradientSection);
 * // Result: [
 * //   { color: '#FF0000', opacity: 1, offset: 0 },
 * //   { color: '#0000FF', opacity: 0.5, offset: 1 }
 * // ]
 */
export declare function extractGradientStops(fillGradientSection: VisioSection | null | undefined): GradientStop[];
/**
 * Computes a gradient vector from an angle in degrees using CSS-like semantics.
 * Returns endpoints for a linear gradient in normalized [0..100] space.
 *
 * CSS angle convention:
 * - 0 degrees: to the right (→)
 * - 90 degrees: upward (↑)
 * - 180 degrees: to the left (←)
 * - 270 degrees: downward (↓)
 *
 * The function computes a line through the center (50, 50) at the given angle,
 * then clamps the endpoints to the [0..100] square range.
 *
 * @param {number} angleDeg - The angle in degrees for gradient direction
 * @returns {GradientVector} A gradient vector object with computed endpoints in normalized space
 * @remarks
 * The line is extended far enough to ensure it crosses the bounding box,
 * then clamped to [0..100] for SVG compatibility.
 *
 * @example
 * // Get gradient vector for 45 degree angle
 * const vector = getGradientVectorByAngle(45);
 * // Result: { x1: 0, y1: 100, x2: 100, y2: 0 }
 *
 * // Get horizontal gradient (0 degrees)
 * const horizontal = getGradientVectorByAngle(0);
 * // Result: { x1: 0, y1: 50, x2: 100, y2: 50 }
 */
export declare function getGradientVectorByAngle(angleDeg: number): GradientVector;
/**
 * Represents a radial gradient by direction code.
 * Maps Visio's direction codes to radial gradient parameters.
 *
 * Radial gradients emanate from a focal point (fx, fy) and expand to a circle
 * with center (cx, cy) and radius r.
 *
 * @param {string | undefined} gradientDir - The gradient direction code string
 * @returns {RadialGradientConfig} A radial gradient configuration object
 * @remarks
 * Direction codes and their meanings:
 * - '1': Direction 1 (center-biased)
 * - '2': Direction 2 (left-bias)
 * - '3': Direction 3 (uniform radial)
 * - '6': Direction 6 (right-bias)
 * - '7': Direction 7 (upper-left bias)
 * - default: Returns centered zero-radius gradient
 *
 * @example
 * // Get radial gradient for direction '3'
 * const radial = getRadialGradient('3');
 * // Result: { type: 'Radial', cx: 50, cy: 50, fx: 50, fy: 50, r: 68 }
 */
export declare function getRadialGradient(gradientDir: string | undefined): RadialGradientConfig;
/**
 * Gets decorator shape name from Visio arrow type ID.
 * Handles special cases where multiple IDs map to the same shape.
 *
 * Uses the centralized DECORATOR_SHAPE_MAP for mapping, with special handling
 * for common arrow types that share shape properties.
 *
 * @param {number} arrowType - The Visio arrow type ID number
 * @returns {string} The decorator shape name (e.g., 'Arrow', 'Diamond', 'None')
 * @remarks
 * Special handling for arrow type codes 2, 4, and 13 which all map to 'Arrow'.
 * Falls back to 'Arrow' if type not found in decorator shape map.
 *
 * @example
 * // Get decorator shape
 * getDecoratorShape(4); // Result: 'Arrow'
 * getDecoratorShape(22); // Result: 'Diamond'
 * getDecoratorShape(0); // Result: 'None'
 */
export declare function getDecoratorShape(arrowType: number): string;
/**
 * Returns decorator dimensions by size code and shape name.
 * Maps decorator size codes to width and height values.
 *
 * Process:
 * 1. Normalize shape name to lowercase
 * 2. Check if shape matches known arrow-like shapes
 * 3. Use appropriate size table (arrow shapes share same progression)
 * 4. Parse numeric size index from Visio (0-6)
 * 5. Clamp to available sizes
 * 6. Return dimensions or fallback to default
 *
 * @param {string} sizeType - The size code/index string from Visio (expects '0'..'6')
 * @param {string} arrowShape - The decorator shape name to lookup dimensions for
 * @returns {{width: number, height: number}} An object with width and height properties representing decorator dimensions
 * @remarks
 * Arrow-like shapes (arrow, opendarrow, fletch, etc.) share the same size progression.
 * Fallback: 8x8 pixels if shape not found in size map.
 *
 * @example
 * // Get dimensions for medium-sized arrow
 * const dims = getDecoratorDimensions('4', 'Arrow');
 * // Result: { width: 12.5, height: 12.5 }
 *
 * // Get dimensions for diamond
 * const dims2 = getDecoratorDimensions('2', 'Diamond');
 * // Result: { width: 20, height: 11 }
 */
export declare function getDecoratorDimensions(sizeType: string, arrowShape: string): {
    width: number;
    height: number;
};
/**
 * Runtime type guard: checks if a value is a non-null object.
 * Useful for narrowing types in conditional branches.
 *
 * @param {unknown} x - The value to check
 * @returns {boolean} True if the value is a non-null object, false otherwise
 * @example
 * // Type guard in conditional
 * if (isObject(value)) {
 *   // value is now typed as ParsedXmlObject
 * }
 */
export declare function isObject(x: unknown): x is ParsedXmlObject;
/**
 * Runtime type guard: checks if an object has an own property key.
 * Combines object check with property ownership verification.
 *
 * Uses Object.prototype.hasOwnProperty for accurate property detection,
 * avoiding issues with inherited properties.
 *
 * @param {unknown} obj - The object to check
 * @param {string} key - The property key to look for
 * @returns {boolean} True if the object has the specified own property key, false otherwise
 * @example
 * // Check if object has property
 * if (hasKey(obj, 'name')) {
 *   // obj.name exists and is own property
 * }
 */
export declare function hasKey(obj: unknown, key: string): obj is ParsedXmlObject;
/**
 * Safely converts a value to a number with fallback.
 * Handles NaN and Infinity cases, returning default value if conversion fails.
 *
 * @param {unknown} value - The value to convert to number
 * @param {number} defaultValue - The fallback if conversion fails (default: 0)
 * @returns {number} The converted number or default
 * @example
 * // Safe number conversion
 * safeNumber('42'); // Result: 42
 * safeNumber('abc', 10); // Result: 10
 * safeNumber(NaN, 5); // Result: 5
 */
export declare function safeNumber(value: unknown, defaultValue?: number): number;
/**
 * Rounds a value to a specified decimal precision.
 * Uses the LAYOUT_METRICS precision as default for path data consistency.
 *
 * @param {number} value - The value to round
 * @param {number} precision - Number of decimal places (default: LAYOUT_METRICS.PATH_PRECISION)
 * @returns {number} The rounded value
 * @example
 * // Round to precision
 * roundToPrecision(3.14159, 2); // Result: 3.14
 * roundToPrecision(42.123); // Result: 42.1200 (using default precision of 4)
 */
export declare function roundToPrecision(value: number, precision?: number): number;
/**
 * Rounds a value to exactly 2 decimal places.
 * Commonly used for coordinate rounding in projections and calculations.
 *
 * @param {number} value - The value to round
 * @returns {number} The value rounded to 2 decimal places
 * @example
 * // Round to 2 decimals
 * roundTo2Decimals(3.14159); // Result: 3.14
 * roundTo2Decimals(42.126); // Result: 42.13
 */
export declare function roundTo2Decimals(value: number): number;
/**
 * Geometry and path processing utilities for Visio import/export.
 * Handles geometry extraction, path generation, Bezier curve processing, and text binding.
 *
 * This section provides the core functionality for converting Visio geometry data
 * to SVG path strings and processing complex shape paths.
 *
 * @private
 */
/**
 * Creates an SVG path string from Visio geometry data.
 * Converts Visio geometry rows (MoveTo, LineTo, ArcTo, etc.) to SVG path commands.
 *
 * The function applies coordinate transformations to convert from Visio's local
 * coordinate system to either local or global normalized coordinates.
 *
 * @param {GeometryWithRows | Attributes} geometry - The geometry data to convert to SVG path
 * @param {PathOptions | undefined} options - Optional path rendering options (pinX, pinY, Width, Height)
 * @param {GlobalOrigin | undefined} globalOrigin - Optional global origin for coordinate transformation
 * @param {PathConfig} [cfg] - Optional path configuration settings (e.g., useLocalScaling)
 * @returns {string} The SVG path string
 * @remarks
 * Scaling modes:
 * - Local: Scales to [0, width] x [0, height]
 * - Global: Normalizes to global bounds in [0, 1] range
 *
 * Y-axis is flipped to convert from Visio (Y increases up) to SVG (Y increases down).
 *
 * @example
 * // Create path from geometry
 * const pathData = createPathFromGeometry(geometry, options, globalOrigin);
 * // Result: 'M 10 20 L 30 40 A 5 5 0 0 1 50 60'
 */
export declare function createPathFromGeometry(geometry: GeometryWithRows | Attributes, options: PathOptions | undefined, globalOrigin: GlobalOrigin | undefined, cfg?: PathConfig): string;
/**
 * Creates a combined SVG path from one or more Visio Geometry sections.
 *
 * Each Visio <Section N='Geometry'> block is converted to an SVG subpath
 * (via `createPathFromGeometry`) and appended to form a single path string.
 * Subpaths that begin with a relative 'm' are converted to absolute 'M'
 * to prevent path drift between sections. If a Geometry section is filled
 * (NoFill cell is 0 or absent) the resulting subpath is closed with a
 * trailing 'Z' to ensure correct fill rendering; sections explicitly
 * marked NoFill will remain open.
 *
 * @param {VisioSection[] | VisioSection} geometrySections - One or more Visio Geometry sections to convert
 * @param {PathOptions} nodeOptions - Node sizing options used to provide width/height when building temporary geometry objects
 * @param {PathConfig | undefined} cfg - Optional configuration forwarded to `createPathFromGeometry`
 * @returns {string} Trimmed SVG path string combining all geometry subpaths
 */
export declare function createPathFromGeometrySections(geometrySections: VisioSection[], nodeOptions: PathOptions, cfg?: PathConfig): string;
/**
 * Generates an SVG path command from a Visio geometry row.
 * Handles various row types (MoveTo, LineTo, ArcTo, Bezier, etc.)
 * and converts their parameters to SVG path syntax.
 *
 * @param {string | undefined} rowType - Row kind identifier (e.g., 'MoveTo', 'LineTo', 'ArcTo')
 * @param {GeometryRowCoordinates} coords - Coordinate values used by the row
 * @param {ScalingFunctions} scaleFunctions - Functions to scale X and Y values
 * @param {PathCoordinates} lastCoords - The previous path coordinates for continuity
 * @param {boolean} flipY - Whether to invert the Y-axis during conversion
 * @returns {string} The generated SVG path command (e.g., 'M ...', 'L ...', 'A ...')
 * @remarks
 * Supported row types:
 * - MoveTo/RelMoveTo: Move to absolute/relative position
 * - LineTo/RelLineTo: Draw line to position
 * - ArcTo: Draw circular arc
 * - EllipticalArcTo: Draw elliptical arc
 * - CubicBezierTo/RelCubBezTo: Draw cubic Bezier curve
 * - QuadBezierTo: Draw quadratic Bezier curve
 * - Ellipse: Draw complete ellipse
 *
 * @example
 * // Generate move command
 * generatePathCommand('MoveTo', { X: 10, Y: 20 }, {...}, {...}, true);
 * // Result: 'M 10 20'
 *
 * // Generate line command
 * generatePathCommand('LineTo', { X: 30, Y: 40 }, {...}, {...}, true);
 * // Result: 'L 30 40'
 */
export declare function generatePathCommand(rowType: string | undefined, coords: GeometryRowCoordinates, scaleFunctions: ScalingFunctions, lastCoords: PathCoordinates, flipY: boolean): string;
/**
 * Formats an SVG path string by normalizing whitespace and commas.
 * Cleans up path data while preserving SVG validity and openness.
 *
 * The formatter:
 * - Adds spaces around SVG command letters
 * - Converts commas to spaces
 * - Normalizes multiple spaces to single spaces
 * - Does NOT add closing 'Z' command (keeps path open)
 *
 * @param {string} path - The raw SVG path data string to format
 * @returns {string} The formatted SVG path string
 * @remarks
 * Returns 'M 0 0' if input is invalid or empty.
 * Preserves all path data, only normalizes spacing.
 *
 * @example
 * // Format SVG path
 * formatPathData('M10,20L30,40A5,5,0,0,1,50,60');
 * // Result: 'M 10 20 L 30 40 A 5 5 0 0 1 50 60'
 */
export declare function formatPathData(path: string): string;
/**
 * Calculates shadow properties from offset and scale.
 * Converts Visio shadow offset values to distance and angle for CSS shadow properties.
 *
 * @param {number} visioOffsetX - The horizontal shadow offset from Visio
 * @param {number} visioOffsetY - The vertical shadow offset from Visio
 * @param {number} scalingFactor - The factor used to scale the offsets
 * @returns {{distance: number, angle: number}} The shadow distance (in pixels) and angle (in degrees)
 * @remarks
 * Algorithm:
 * 1. Calculate distance using Pythagorean theorem
 * 2. Apply scaling factor
 * 3. Calculate angle using atan2
 * 4. Convert angle to degrees
 * 5. Normalize angle to [0, 360) range
 *
 * @example
 * // Calculate shadow properties
 * const shadow = calculateShadowProperties(5, 5, 1);
 * // Result: { distance: 7.07, angle: 315 }
 */
export declare function calculateShadowProperties(visioOffsetX: number, visioOffsetY: number, scalingFactor: number): {
    distance: number;
    angle: number;
};
