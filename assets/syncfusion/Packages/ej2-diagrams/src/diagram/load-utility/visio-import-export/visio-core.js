import { DECORATOR_SHAPE_MAP, DECORATOR_SIZE_MAP, LAYOUT_METRICS, UNIT_CONVERSION } from './visio-constants';
import { isGeometryRowHidden, isGeometrySectionHidden } from './visio-nodes';
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
// ============================================================================
// SECTION 1: ARRAY & COLLECTION UTILITIES
// ============================================================================
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
export function ensureArray(value) {
    if (!value) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}
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
export function createCellMap(cells) {
    var map = new Map();
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var cell = cells_1[_i];
        if (cell && cell.$ && cell.$.N) {
            map.set(cell.$.N, cell.$.V);
        }
    }
    return map;
}
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
export function mapCellValues(cells) {
    var cellArray = ensureArray(cells);
    return createCellMap(cellArray);
}
/**
 * Builds a cell map from a Visio shape node.
 * Converts the shape's Cell elements into a key-value map for easier lookup.
 *
 * @param {VisioShapeNode} node - Shape node containing Cell elements
 * @returns {Map<string, CellMapValue>} Map of cell names to values
 */
export function getCellMap(node) {
    var cells = node && node.Cell ? ensureArray(node.Cell) : [];
    return mapCellValues(cells);
}
/**
 * Merges two cell maps, overlaying instance values on top of master defaults.
 * Ensures that page-level overrides take precedence over master definitions.
 *
 * @param {Map<string, CellMapValue>} masterMap - Cell map from master shape
 * @param {Map<string, CellMapValue>} instMap - Cell map from instance shape
 * @returns {Map<string, CellMapValue>} Combined cell map with overrides applied
 */
export function mergeCellMaps(masterMap, instMap) {
    var out = new Map();
    // start from master defaults
    if (masterMap) {
        masterMap.forEach(function (v, k) {
            out.set(k, v);
        });
    }
    // overlay with page overrides
    if (instMap) {
        instMap.forEach(function (v, k) {
            out.set(k, v);
        });
    }
    return out;
}
/**
 * Safely retrieves a string attribute from an attributes object.
 * Returns an empty string if the key is missing or value is null/undefined.
 *
 * @param {object} attrs - Attributes object
 * @param {string} key - Attribute key to retrieve
 * @returns {string} Attribute value as string, or empty string
 */
export function getAttrString(attrs, key) {
    if (!attrs || typeof attrs !== 'object') {
        return '';
    }
    var desc = Object.getOwnPropertyDescriptor(attrs, key);
    var value = desc ? desc.value : undefined;
    return value == null ? '' : String(value);
}
/**
 * Trims a string value and returns it, or empty string if falsy.
 * Ensures no null/undefined values propagate.
 *
 * @param {string} value - Input string to trim
 * @returns {string} Trimmed string or empty string
 */
export function getTrimmedOrEmpty(value) {
    if (!value) {
        return '';
    }
    var t = String(value).trim();
    return t.length > 0 ? t : '';
}
// ============================================================================
// SECTION 2: NUMERIC PARSING UTILITIES
// ============================================================================
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
export function parseNumberCell(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    if (value === undefined || value === null) {
        return defaultValue;
    }
    var num = parseFloat(String(value));
    return Number.isFinite(num) ? num : defaultValue;
}
/**
 * Retrieves a numeric value from a map with a fallback.
 * Safely converts the stored value to a number or returns the fallback.
 *
 * @param {Map<string, any>} map - Map containing key-value pairs
 * @param {string} key - Key to look up in the map
 * @param {number} fallback - Value to return if lookup fails or is not numeric
 * @returns {number} Parsed number or fallback
 */
export function getNumberFromCellMap(map, key, fallback) {
    if (!map) {
        return fallback;
    }
    var value = map.get(key);
    if (value === undefined || value === null || value === '') {
        return fallback;
    }
    var n = Number(value);
    return isNaN(n) ? fallback : n;
}
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
export function toBoolean(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    if (value === undefined || value === null) {
        return defaultValue;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value !== 0;
    }
    if (typeof value === 'string') {
        return value !== '0' && value.toLowerCase() !== 'false' && value.length > 0;
    }
    return defaultValue;
}
// ============================================================================
// SECTION 3: CELL VALUE EXTRACTION
// ============================================================================
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
export function getCellMapStringValue(cellMap, key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    var value = cellMap.get(key);
    return value !== undefined && value !== null ? String(value) : defaultValue;
}
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
export function getCellMapNumericValue(cellMap, key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var value = getCellMapStringValue(cellMap, key, '');
    return value !== '' ? parseNumberCell(value, defaultValue) : defaultValue;
}
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
export function getCellMapBooleanValue(cellMap, key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var value = cellMap.get(key);
    if (value === undefined || value === null) {
        return defaultValue;
    }
    // Visio standard for boolean cells is typically '1' for true and '0' for false.
    return String(value) === '1' || String(value).toLowerCase() === 'true';
}
// ============================================================================
// SECTION 4: CELL SEARCH & EXTRACTION
// ============================================================================
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
export function findCellValue(cells, name) {
    var cell = cells.find(function (c) { return c && c.$ && c.$.N === name; });
    return (cell && cell.$ && cell.$.V !== undefined && cell.$.V !== null) ? String(cell.$.V) : undefined;
}
// ============================================================================
// SECTION 5: STRING & FORMATTING UTILITIES
// ============================================================================
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
export function toCamelCase(key) {
    if (!key || typeof key !== 'string') {
        return '';
    }
    return key
        .split(/[-_]/)
        .map(function (part, index) {
        if (part.length === 0) {
            return '';
        }
        if (index === 0) {
            return part.charAt(0).toLowerCase() + part.slice(1);
        }
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
        .join('');
}
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
export function formatCoordinate(value, precision) {
    if (precision === void 0) { precision = 2; }
    if (value === null || value === undefined) {
        return undefined;
    }
    return Number(value.toFixed(precision));
}
// ============================================================================
// SECTION 6: MASTER & SHAPE UTILITIES
// ============================================================================
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
export function isGroupShape(shape) {
    if (!shape || typeof shape !== 'object' || !('$' in shape)) {
        return false;
    }
    var attrs = shape.$ || undefined;
    return attrs && typeof attrs === 'object' && 'Type' in attrs && String(attrs.Type).toLowerCase() === 'group';
}
/**
 * Applies a parent group's transform to a child cell map.
 * Handles flips, rotation, and pivot translation to convert
 * child pin coordinates into page coordinates.
 *
 * @param {Map<string, any>} mergedMap - Original cell map of the child shape
 * @param {GroupTransform} parentTx - Parent group transform details
 * @returns {Map<string, any>} New cell map with transformed PinX/PinY
 */
export function applyParentTransformToCellMap(mergedMap, parentTx) {
    // If no parent transform, return original map
    if (!parentTx) {
        return mergedMap;
    }
    var out = new Map();
    mergedMap.forEach(function (v, k) {
        out.set(k, v);
    });
    var childPinX = getNumberFromCellMap(mergedMap, 'PinX', 0);
    var childPinY = getNumberFromCellMap(mergedMap, 'PinY', 0);
    // Convert child pin to be relative to parent's LocPin (pivot)
    var relX = childPinX - parentTx.locPinX;
    var relY = childPinY - parentTx.locPinY;
    // Apply flips (Visio group flips mirror children around group pivot)
    if (parentTx.flipX && parentTx.flipX !== 0) {
        relX = -relX;
    }
    if (parentTx.flipY && parentTx.flipY !== 0) {
        relY = -relY;
    }
    // Apply rotation around parent pivot
    var angle = parentTx.angle;
    if (angle && angle !== 0) {
        var cosA = Math.cos(angle);
        var sinA = Math.sin(angle);
        var rx = (relX * cosA) - (relY * sinA);
        var ry = (relX * sinA) + (relY * cosA);
        relX = rx;
        relY = ry;
    }
    // Convert back to absolute pin in page coordinates (inches)
    var absPinX = parentTx.pinX + relX;
    var absPinY = parentTx.pinY + relY;
    out.set('PinX', String(absPinX));
    out.set('PinY', String(absPinY));
    return out;
}
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
export function getVisibility(sections) {
    if (!sections) {
        return true;
    }
    // Normalize sections to array
    var sectionArray = ensureArray(sections);
    // Find Geometry section which contains visibility properties
    var geometrySection = sectionArray.find(function (s) { return s && s.$ && s.$.N === 'Geometry'; });
    if (!geometrySection) {
        return true;
    }
    // Check direct cells in geometry section
    if (geometrySection.Cell) {
        var cells = ensureArray(geometrySection.Cell);
        for (var _i = 0, cells_2 = cells; _i < cells_2.length; _i++) {
            var cell = cells_2[_i];
            if (cell && cell.$ && cell.$.N === 'NoShow' && cell.$.V === '1') {
                return false;
            }
        }
    }
    // Check cells within rows of geometry section
    if (geometrySection.Row) {
        var rows = ensureArray(geometrySection.Row);
        for (var _a = 0, rows_1 = rows; _a < rows_1.length; _a++) {
            var row = rows_1[_a];
            if (row && row.Cell) {
                var cells = ensureArray(row.Cell);
                for (var _b = 0, cells_3 = cells; _b < cells_3.length; _b++) {
                    var cell = cells_3[_b];
                    if (cell && cell.$ && cell.$.N === 'NoShow' && cell.$.V === '1') {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
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
export function getTooltip(cellMap) {
    var contentCell = getCellMapStringValue(cellMap, 'Comment');
    return contentCell ? contentCell : '';
}
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
export function getRouting(cellMap) {
    // Routing style values that indicate automatic line routing
    var routingArray = [3, 4, 5, 6, 10, 11, 12, 13];
    var routingCell = getCellMapStringValue(cellMap, 'ShapeRouteStyle');
    if (!routingCell) {
        return false;
    }
    var routingValue = parseInt(routingCell, 10);
    return routingArray.indexOf(routingValue) !== -1;
}
// ============================================================================
// SECTION 7: ANGLE & DISTANCE CONVERSIONS
// ============================================================================
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
export function radiansToDegrees(radians) {
    return radians * UNIT_CONVERSION.RADIANS_TO_DEGREES;
}
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
export function inchToPx(val) {
    return val * UNIT_CONVERSION.SCREEN_DPI;
}
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
export function inchToPoint(val) {
    return val * (UNIT_CONVERSION.SCREEN_DPI * (72 / 96));
}
// ============================================================================
// SECTION 8: SECTION EXTRACTION & GRADIENT UTILITIES
// ============================================================================
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
export function extractGradientStops(fillGradientSection) {
    var gradientStops = [];
    if (!fillGradientSection || !fillGradientSection.Row) {
        return gradientStops;
    }
    // Normalize rows to array
    var rows = ensureArray(fillGradientSection.Row);
    for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
        var row = rows_2[_i];
        // Skip invalid or deleted rows
        if (!row || !row.$ || row.$.Del === '1') {
            continue;
        }
        // Initialize stop with defaults
        var color = '#000000';
        var offset = 0;
        var opacity = 1;
        // Extract cell values from row
        var cells = ensureArray(row.Cell);
        for (var _a = 0, cells_4 = cells; _a < cells_4.length; _a++) {
            var cell = cells_4[_a];
            var cellName = cell && cell.$ && cell.$.N;
            var cellValue = cell && cell.$ && cell.$.V;
            if (!cellName) {
                continue;
            }
            // Map cell names to gradient stop properties
            switch (cellName) {
                case 'GradientStopColor':
                    color = cellValue;
                    break;
                case 'GradientStopColorTrans': {
                    // Transparency value (0-1); convert to opacity (1 - transparency)
                    var t = parseNumberCell(cellValue, 0);
                    opacity = Math.max(0, Math.min(1, 1 - t));
                    break;
                }
                case 'GradientStopPosition': {
                    // Position value (0-1); ensure it's within valid range
                    var pos = parseNumberCell(cellValue, 0);
                    offset = Math.max(0, Math.min(1, pos));
                    break;
                }
            }
        }
        gradientStops.push({ color: color, offset: offset, opacity: opacity });
    }
    return gradientStops;
}
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
export function getGradientVectorByAngle(angleDeg) {
    // Convert angle to radians
    var rad = angleDeg * UNIT_CONVERSION.DEGREES_TO_RADIANS;
    // Calculate direction vector components
    var dx = Math.cos(rad);
    var dy = Math.sin(rad);
    // Center point
    var cx = 50;
    var cy = 50;
    // Large enough half-length to ensure the line crosses the box
    var L = 100;
    // Calculate line endpoints
    var x1 = cx - dx * L;
    var y1 = cy - dy * L;
    var x2 = cx + dx * L;
    var y2 = cy + dy * L;
    // Clamp to [0..100] range
    var clamp = function (n) { return Math.max(0, Math.min(100, n)); };
    return { x1: clamp(x1), y1: clamp(y1), x2: clamp(x2), y2: clamp(y2) };
}
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
export function getRadialGradient(gradientDir) {
    var dir = gradientDir;
    // Map direction codes to gradient parameters
    switch (dir) {
        case '1':
            return { type: 'Radial', cx: 150, cy: 100, fx: 100, fy: 100, r: 180 };
        case '2':
            return { type: 'Radial', cx: 0, cy: 100, fx: 0, fy: 100, r: 140 };
        case '3':
            return { type: 'Radial', cx: 50, cy: 50, fx: 50, fy: 50, r: 68 };
        case '6':
            return { type: 'Radial', cx: 100, cy: 0, fx: 100, fy: 0, r: 100 };
        case '7':
            return { type: 'Radial', cx: 0, cy: 0, fx: 0, fy: 0, r: 140 };
        default:
            // Default: zero-radius gradient at origin
            return { type: 'Radial', cx: 0, cy: 0, fx: 0, fy: 0, r: 0 };
    }
}
// ============================================================================
// SECTION 9: DECORATOR UTILITIES
// ============================================================================
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
export function getDecoratorShape(arrowType) {
    // Special handling for arrow types that all represent standard arrow
    var arrowCode = new Set([2, 4, 13]);
    if (arrowCode.has(arrowType)) {
        return 'Arrow';
    }
    return DECORATOR_SHAPE_MAP[parseInt(arrowType.toString(), 10)] || 'Arrow';
}
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
export function getDecoratorDimensions(sizeType, arrowShape) {
    // Normalize shape name to lowercase for lookup
    var shapeKey = (arrowShape).toLowerCase();
    // Check if shape is arrow-like (all arrow-like shapes share size progression)
    var arrowLikeKey = ['arrow', 'outdentedarrow', 'fletch', 'openarrow', 'openfetch', 'indentedarrow']
        .find(function (k) { return k === shapeKey; });
    var resolvedKey = arrowLikeKey ? 'arrow' : shapeKey;
    // Look up size table for shape
    var sizes = DECORATOR_SIZE_MAP["" + resolvedKey];
    if (!sizes || sizes.length === 0) {
        return { width: 8, height: 8 }; // Global fallback
    }
    // Parse size index and clamp to available range
    var idxRaw = parseInt(sizeType, 10);
    var idx = Number.isFinite(idxRaw) ? Math.max(0, Math.min(idxRaw, sizes.length - 1)) : 0;
    // Return size or fallback to largest available
    return sizes[parseInt(idx.toString(), 10)] !== undefined && sizes[parseInt(idx.toString(), 10)] !== null
        ? sizes[parseInt(idx.toString(), 10)]
        : sizes[sizes.length - 1];
}
// ============================================================================
// SECTION 10: GENERIC UTILITIES & TYPE GUARDS
// ============================================================================
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
export function isObject(x) {
    return typeof x === 'object' && x !== null;
}
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
export function hasKey(obj, key) {
    return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
}
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
export function safeNumber(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var num = Number(value);
    return isNaN(num) || !isFinite(num) ? defaultValue : num;
}
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
export function roundToPrecision(value, precision) {
    if (precision === void 0) { precision = LAYOUT_METRICS.PATH_PRECISION; }
    if (!Number.isFinite(value)) {
        return 0;
    }
    return Number(value.toFixed(precision));
}
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
export function roundTo2Decimals(value) {
    return Math.round(value * 100) / 100;
}
/**
 * Geometry and path processing utilities for Visio import/export.
 * Handles geometry extraction, path generation, Bezier curve processing, and text binding.
 *
 * This section provides the core functionality for converting Visio geometry data
 * to SVG path strings and processing complex shape paths.
 *
 * @private
 */
// ============================================================================
// SECTION 11: GEOMETRY & PATH PROCESSING
// ============================================================================
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
export function createPathFromGeometry(geometry, options, globalOrigin, cfg) {
    if (!geometry || typeof geometry !== 'object') {
        return '';
    }
    var geom = geometry;
    // Get rendering parameters
    var precision = LAYOUT_METRICS.PATH_PRECISION;
    var flipY = true;
    // Get geometry dimensions
    var height = safeNumber(geom.height || geom.Height);
    var width = safeNumber(geom.width || geom.Width);
    var useLocal = cfg && cfg.useLocalScaling !== undefined && cfg.useLocalScaling !== null
        ? cfg.useLocalScaling
        : false;
    // Invalid dimensions result in empty path
    if (height <= 0 || width <= 0) {
        return '';
    }
    // Calculate shape origin for coordinate transformation
    var shapeOriginX = 0;
    var shapeOriginY = 0;
    if (geom.Name !== 'Path' && options) {
        shapeOriginX = options.pinX - options.Width / 2;
        shapeOriginY = options.pinY - options.Height / 2;
    }
    // Create scaling functions based on mode
    var roundToPrecisionLocal = function (n) { return roundToPrecision(n, precision); };
    // scale to geometry dimensions
    var scaleXLocal = function (v) { return roundToPrecisionLocal(safeNumber(v)); };
    var scaleYLocal = function (v) {
        var num = safeNumber(v);
        return roundToPrecisionLocal((flipY ? (height - num) : num));
    };
    // Global scaling functions (DISABLED): normalize to global bounds
    // NOTE: Global scaling is currently not used in our rendering pipeline.
    // These functions are kept here for reference but are commented out to
    // avoid accidental usage and to simplify path generation exclusively with
    // local scaling. If global normalization is needed in the future, restore
    // these implementations and update the selection below accordingly.
    //
    // const scaleXGlobal: (v: number | string | undefined) => number = (v: number | string | undefined): number => {
    //     if (!globalOrigin) { return 0; }
    //     return roundToPrecisionLocal(
    //         (shapeOriginX + safeNumber(v) - globalOrigin.minX) / globalOrigin.width
    //     );
    // };
    //
    // const scaleYGlobal: (v: number | string | undefined) => number = (v: number | string | undefined): number => {
    //     if (!globalOrigin) { return 0; }
    //     const absY: number = shapeOriginY + safeNumber(v) - globalOrigin.minY;
    //     return roundToPrecisionLocal(
    //         flipY ? (1 - absY / globalOrigin.height) : (absY / globalOrigin.height)
    //     );
    // };
    // Radius scaling functions (for arc operations) - GLOBAL (DISABLED)
    // NOTE: Global radius normalization is not used currently. Keeping the
    // implementations commented for future reference.
    // const radiusXGlobal: (v: number | string | undefined) => number = (v: number | string | undefined): number => {
    //     if (!globalOrigin) { return 0; }
    //     return roundToPrecisionLocal(safeNumber(v) / globalOrigin.width);
    // };
    //
    // const radiusYGlobal: (v: number | string | undefined) => number = (v: number | string | undefined): number => {
    //     if (!globalOrigin) { return 0; }
    //     return roundToPrecisionLocal(safeNumber(v) / globalOrigin.height);
    // };
    // Local radii must scale in the same coordinate space as X/Y (which is width/height scaled)
    var radiusXLocal = function (v) { return roundToPrecisionLocal(safeNumber(v)); };
    var radiusYLocal = function (v) { return roundToPrecisionLocal(safeNumber(v)); };
    // Select appropriate scaling functions
    // Global scaling disabled: always use local scaling for coordinates and radii.
    var scaleX = scaleXLocal;
    var scaleY = scaleYLocal;
    var radiusX = radiusXLocal;
    var radiusY = radiusYLocal;
    // Process geometry rows to build path
    var pathData = '';
    var lastCoords = { lastX: 0, lastY: 0 };
    var rows = ensureArray(geom.Row);
    if (!Array.isArray(rows)) {
        return '';
    }
    // Generate path commands from rows
    for (var _i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
        var row = rows_3[_i];
        if (!row || !row.$) {
            continue;
        }
        var rowType = row.$.T;
        // Build cell map for this row
        var cellArray = ensureArray(row.Cell);
        var cellMap = new Map();
        for (var _a = 0, cellArray_1 = cellArray; _a < cellArray_1.length; _a++) {
            var cell = cellArray_1[_a];
            if (cell && cell.$ && cell.$.N) {
                cellMap.set(cell.$.N, safeNumber(cell.$.V));
            }
        }
        // Extract coordinate values
        var X = safeNumber(cellMap.get('X'));
        var Y = safeNumber(cellMap.get('Y'));
        var A = safeNumber(cellMap.get('A'));
        var B = safeNumber(cellMap.get('B'));
        var C = safeNumber(cellMap.get('C'));
        var D = safeNumber(cellMap.get('D'));
        var rt = rowType ? String(rowType) : '';
        var isRel = rt.indexOf('Rel') === 0;
        // Convert relative rows to absolute inches before path generation
        if (isRel) {
            // X-like values scale by width
            X = X * width;
            A = A * width;
            // Y-like values scale by height
            Y = Y * height;
            B = B * height;
            // RelCubBezTo uses C/D as 2nd control point
            if (rt === 'RelCubBezTo') {
                C = C * width;
                D = D * height;
            }
        }
        // Generate path command for this row
        pathData += generatePathCommand(rowType, { X: X, Y: Y, A: A, B: B, C: C, D: D }, { scaleX: scaleX, scaleY: scaleY, radiusX: radiusX, radiusY: radiusY }, lastCoords, flipY) + ' ';
    }
    return pathData.trim();
}
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
export function createPathFromGeometrySections(geometrySections, nodeOptions, cfg) {
    var sections = ensureArray(geometrySections);
    if (!sections || sections.length === 0) {
        return '';
    }
    // Build combined path while skipping hidden geometry
    var combinedPath = '';
    for (var i = 0; i < sections.length; i++) {
        var section = sections[parseInt(i.toString(), 10)];
        if (!section) {
            continue;
        }
        // Skip section if section-level NoShow=1
        var sectionHidden = isGeometrySectionHidden(section);
        if (sectionHidden) {
            continue;
        }
        // Filter out rows with row-level NoShow=1
        var allRows = ensureArray(section.Row);
        var visibleRows = [];
        for (var row = 0; row < allRows.length; row++) {
            var visioRow = allRows[parseInt(row.toString(), 10)];
            if (!visioRow) {
                continue;
            }
            var rowHidden = isGeometryRowHidden(visioRow);
            if (!rowHidden) {
                visibleRows.push(visioRow);
            }
        }
        if (visibleRows.length === 0) {
            continue;
        }
        // Build a geometry object using only visible rows
        var geom = {
            Row: visibleRows,
            width: nodeOptions ? nodeOptions.Width : 0,
            height: nodeOptions ? nodeOptions.Height : 0
        };
        // Create subpath using local scaling
        var rawPart = createPathFromGeometry(geom, { pinX: 0, pinY: 0, Width: nodeOptions.Width, Height: nodeOptions.Height }, undefined, cfg);
        if (!rawPart || rawPart.length === 0) {
            continue;
        }
        // Normalize subpath head to absolute 'M'
        var normalizedPart = rawPart.trim();
        if (normalizedPart.length > 0) {
            var firstChar = normalizedPart.charAt(0);
            if (firstChar === 'm') {
                normalizedPart = 'M' + normalizedPart.substring(1);
            }
        }
        // Close filled sections for reliable fill rendering
        var sectionNoFill = 0;
        if (section.Cell) {
            var cellMap = createCellMap(ensureArray(section.Cell));
            sectionNoFill = safeNumber(cellMap.get('NoFill'));
        }
        if (sectionNoFill === 0) {
            var lastChar = normalizedPart.charAt(normalizedPart.length - 1);
            if (lastChar !== 'Z' && lastChar !== 'z') {
                normalizedPart = normalizedPart + ' Z';
            }
        }
        // Append subpath to combined path
        combinedPath = combinedPath + normalizedPart + ' ';
    }
    // Return trimmed combined path
    var finalPath = combinedPath.trim();
    return finalPath;
}
/**
 * Normalizes an angle value to radians.
 * If the input value appears to be in degrees (absolute value > 2π),
 * it is converted to radians. Otherwise, the value is returned unchanged.
 *
 * @param {number} val - The angle value to normalize.
 * @returns {number} The angle in radians.
 */
function normalizeAngleRadians(val) {
    // If value looks like degrees, convert to radians
    if (Math.abs(val) > 6.283185307) {
        return val * Math.PI / 180;
    }
    return val;
}
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
export function generatePathCommand(rowType, coords, scaleFunctions, lastCoords, flipY) {
    var _a = coords.X, X = _a === void 0 ? 0 : _a, _b = coords.Y, Y = _b === void 0 ? 0 : _b, _c = coords.A, A = _c === void 0 ? 0 : _c, _d = coords.B, B = _d === void 0 ? 0 : _d, _e = coords.C, C = _e === void 0 ? 0 : _e, _f = coords.D, D = _f === void 0 ? 0 : _f;
    var scaleX = scaleFunctions.scaleX, scaleY = scaleFunctions.scaleY, radiusX = scaleFunctions.radiusX, radiusY = scaleFunctions.radiusY;
    switch (rowType) {
        case 'MoveTo':
        case 'RelMoveTo': {
            // Move to position
            lastCoords.lastX = X;
            lastCoords.lastY = Y;
            return "M " + scaleX(X) + " " + scaleY(Y);
        }
        case 'RelLineTo':
        case 'LineTo': {
            // Draw line
            lastCoords.lastX = X;
            lastCoords.lastY = Y;
            return "L " + scaleX(X) + " " + scaleY(Y);
        }
        case 'ArcTo': {
            // Draw circular arc
            var deltaX = Math.abs(X - lastCoords.lastX);
            var deltaY = Math.abs(Y - lastCoords.lastY);
            var radius = Math.max(deltaX, deltaY);
            var sweepFlag = A < 0 ? 1 : 0;
            var largeArcFlag = 0;
            lastCoords.lastX = X;
            lastCoords.lastY = Y;
            return "A " + radiusX(radius) + " " + radiusY(radius) + " 0 " + largeArcFlag + " " + sweepFlag + " " + scaleX(X) + " " + scaleY(Y);
        }
        case 'EllipticalArcTo':
        case 'RelEllipticalArcTo': {
            // Elliptical arc from last point to (X,Y) via (A,B)
            // Start, end, and mid points
            var startX = safeNumber(lastCoords.lastX);
            var startY = safeNumber(lastCoords.lastY);
            var endX = safeNumber(X);
            var endY = safeNumber(Y);
            var midX = safeNumber(A);
            var midY = safeNumber(B);
            // Fallback midpoint if missing
            if ((A === undefined || A === null) &&
                (B === undefined || B === null)) {
                midX = (startX + endX) / 2;
                midY = (startY + endY) / 2;
            }
            // Scaled coordinates
            var scaledStartX = scaleX(startX);
            var scaledStartY = scaleY(startY);
            var scaledMidX = scaleX(midX);
            var scaledMidY = scaleY(midY);
            var scaledEndX = scaleX(endX);
            var scaledEndY = scaleY(endY);
            // Degenerate case → line
            var EPSILON = 1e-6;
            if (Math.abs(scaledStartX - scaledEndX) < EPSILON &&
                Math.abs(scaledStartY - scaledEndY) < EPSILON) {
                lastCoords.lastX = endX;
                lastCoords.lastY = endY;
                return "L " + scaledEndX + " " + scaledEndY;
            }
            // Rotation and axis ratio
            var rotationRad_1 = normalizeAngleRadians(safeNumber(C));
            var axisRatio_1 = Math.abs(safeNumber(D, 1));
            if (!isFinite(axisRatio_1) || axisRatio_1 === 0) {
                axisRatio_1 = 1;
            }
            // Transform to circle space
            var rotatePoint_1 = function (x, y, angle) {
                var cosA = Math.cos(angle);
                var sinA = Math.sin(angle);
                return { x: x * cosA + y * sinA, y: -x * sinA + y * cosA };
            };
            var toCircleSpace = function (x, y) {
                var rotated = rotatePoint_1(x, y, -rotationRad_1);
                return { x: rotated.x, y: rotated.y / axisRatio_1 };
            };
            var circleStart = toCircleSpace(scaledStartX, scaledStartY);
            var circleMid = toCircleSpace(scaledMidX, scaledMidY);
            var circleEnd = toCircleSpace(scaledEndX, scaledEndY);
            // Solve circle through three points
            var deltaXStartMid = circleStart.x - circleMid.x;
            var deltaYStartMid = circleStart.y - circleMid.y;
            var deltaXStartEnd = circleStart.x - circleEnd.x;
            var deltaYStartEnd = circleStart.y - circleEnd.y;
            var halfDiff1 = (Math.pow(circleStart.x, 2) -
                Math.pow(circleMid.x, 2) +
                (Math.pow(circleStart.y, 2) - Math.pow(circleMid.y, 2))) /
                2;
            var halfDiff2 = (Math.pow(circleStart.x, 2) -
                Math.pow(circleEnd.x, 2) +
                (Math.pow(circleStart.y, 2) - Math.pow(circleEnd.y, 2))) /
                2;
            var determinant = deltaXStartMid * deltaYStartEnd - deltaYStartMid * deltaXStartEnd;
            if (Math.abs(determinant) < EPSILON) {
                // Collinear → quadratic Bezier
                lastCoords.lastX = endX;
                lastCoords.lastY = endY;
                return "Q " + scaleX(midX) + " " + scaleY(midY) + " " + scaledEndX + " " + scaledEndY;
            }
            var centerX_1 = (halfDiff1 * deltaYStartEnd - deltaYStartMid * halfDiff2) /
                determinant;
            var centerY_1 = (deltaXStartMid * halfDiff2 - halfDiff1 * deltaXStartEnd) /
                determinant;
            var circleRadius = Math.sqrt(Math.pow((circleStart.x - centerX_1), 2) + Math.pow((circleStart.y - centerY_1), 2));
            // Angles
            var angleAt = function (x, y) {
                return Math.atan2(y - centerY_1, x - centerX_1);
            };
            var angleStart = angleAt(circleStart.x, circleStart.y);
            var angleMid = angleAt(circleMid.x, circleMid.y);
            var angleEnd = angleAt(circleEnd.x, circleEnd.y);
            var normalizeAngle = function (angle) {
                var normalizedAngle = angle;
                while (normalizedAngle < 0) {
                    normalizedAngle += Math.PI * 2;
                }
                while (normalizedAngle >= Math.PI * 2) {
                    normalizedAngle -= Math.PI * 2;
                }
                return normalizedAngle;
            };
            var normStart = normalizeAngle(angleStart);
            var normMid = normalizeAngle(angleMid);
            var normEnd = normalizeAngle(angleEnd);
            var deltaPositive = normalizeAngle(normEnd - normStart);
            var isMidBetween = normalizeAngle(normMid - normStart) < deltaPositive;
            var sweepFlag = void 0;
            var arcAngle = void 0;
            if (isMidBetween) {
                sweepFlag = 1;
                arcAngle = deltaPositive;
            }
            else {
                sweepFlag = 0;
                arcAngle = normalizeAngle(normStart - normEnd);
            }
            var largeArcFlag = arcAngle > Math.PI ? 1 : 0;
            // Convert back to ellipse
            var ellipseRadiusX = roundToPrecision(circleRadius);
            var ellipseRadiusY = roundToPrecision(circleRadius * axisRatio_1);
            var rotationDeg = roundToPrecision((rotationRad_1 * 180) / Math.PI);
            // Update last coords
            lastCoords.lastX = endX;
            lastCoords.lastY = endY;
            return "A " + ellipseRadiusX + " " + ellipseRadiusY + " " + rotationDeg + " " + largeArcFlag + " " + sweepFlag + " " + scaledEndX + " " + scaledEndY;
        }
        case 'RelCubBezTo':
        case 'CubicBezierTo': {
            // Cubic Bezier curve
            lastCoords.lastX = X;
            lastCoords.lastY = Y;
            return "C " + scaleX(A) + " " + scaleY(B) + " " + scaleX(C) + " " + scaleY(D) + " " + scaleX(X) + " " + scaleY(Y);
        }
        case 'QuadBezierTo': {
            // Quadratic Bezier curve
            return "Q " + scaleX(A) + " " + scaleY(B) + " " + scaleX(X) + " " + scaleY(Y);
        }
        case 'Ellipse': {
            // Draw full ellipse using two arcs
            var centerX = scaleX(X);
            var centerY = scaleY(Y);
            var axisPointX = scaleX(A);
            var axisPointY = scaleY(B);
            var oppositeAxisPointX = scaleX(C);
            var oppositeAxisPointY = scaleY(D);
            // Radii are distances from center to axis points
            var radiusX_1 = Math.abs(axisPointX - centerX);
            var radiusY_1 = Math.abs(oppositeAxisPointY - centerY);
            if (radiusX_1 <= 0 || radiusY_1 <= 0) {
                return '';
            }
            // Start and end points for arcs
            var startX = centerX - radiusX_1;
            var startY = centerY;
            var endX = centerX + radiusX_1;
            var endY = centerY;
            // Use two half-arcs to complete the ellipse
            return "M " + startX + " " + startY + " A " + radiusX_1 + " " + radiusY_1 + " 0 0 1 " + endX + " " + endY + " A " + radiusX_1 + " " + radiusY_1 + " 0 0 1 " + startX + " " + startY + " Z";
        }
        default:
            return '';
    }
}
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
export function formatPathData(path) {
    if (!path || typeof path !== 'string') {
        return 'M 0 0';
    }
    var formattedPath = path
        .replace(/([MLCQAZ])/gi, ' $1 ') // Add spaces around commands
        .replace(/,/g, ' ') // Replace commas with spaces
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .trim(); // Remove leading/trailing whitespace
    return formattedPath;
}
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
export function calculateShadowProperties(visioOffsetX, visioOffsetY, scalingFactor) {
    // Validate scaling factor
    var scale = (scalingFactor && scalingFactor > 0) ? scalingFactor : 1;
    // Calculate distance using Pythagorean theorem
    var distanceInPixels = Math.sqrt(Math.pow(visioOffsetX, 2) + Math.pow(visioOffsetY, 2)) * scale;
    // Calculate angle using atan2 (handles all quadrants correctly)
    var angleInRadians = Math.atan2(-visioOffsetY, visioOffsetX);
    var angleInDegrees = angleInRadians * UNIT_CONVERSION.RADIANS_TO_DEGREES;
    // Normalize angle to [0, 360) range
    if (angleInDegrees < 0) {
        angleInDegrees += 360;
    }
    return {
        distance: roundToPrecision(distanceInPixels, 2),
        angle: Math.round(angleInDegrees)
    };
}
