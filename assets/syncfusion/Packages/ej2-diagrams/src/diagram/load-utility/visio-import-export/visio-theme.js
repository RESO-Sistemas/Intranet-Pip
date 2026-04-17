import { LINE_PATTERN_MAP, VALID_TYPES } from './visio-constants';
import { getDecoratorShape, inchToPx } from './visio-core';
import { getTextAlign, getTextDecoration } from './visio-nodes';
import { ensureArray } from './visio-core';
import { VisioStyleModel } from './visio-connectors';
/**
 * Global theme configuration.
 * @type {ThemeConfig}
 * @private
 */
var themeConfig = {
    enableCache: true,
    defaultFill: 'white',
    defaultStroke: 'black',
    minStrokeWidth: 0,
    maxStrokeWidth: 100
};
// ==================== Constants ====================
/**
 * Default fill color used when no other fill is specified.
 *
 * @type {string}
 */
var defaultFill = 'white';
/**
 * Default stroke color used when no other stroke is specified.
 * Exported for use in other modules.
 *
 * @type {string}
 */
export var defaultStroke = 'black';
/**
 * Array tracking theme indices during processing.
 * Used for managing theme color selection during shape styling.
 *
 * @type {number[]}
 */
var themeIndex = [];
/**
 * Theme cache for avoiding repeated lookups.
 * @type {Map<string, any>}
 * @private
 */
var themeCache = new Map();
/**
 * Conversion factor from EMU (English Metric Units) to inches.
 * OOXML uses EMUs for precise measurement (1 inch = 914400 EMUs).
 *
 * @type {number}
 */
var EMU_PER_INCH = 914400;
/**
 * Default minimum stroke width in points.
 * @type {number}
 */
var MIN_STROKE_WIDTH = 0.5;
/**
 * Default maximum stroke width in points.
 * @type {number}
 */
var MAX_STROKE_WIDTH = 100;
/**
 * Threshold for treating saturation as zero (near-achromatic).
 * @type {number}
 */
var SATURATION_THRESHOLD = 0.001;
/**
 * Near-zero difference threshold for RGB components.
 * Used when calculating hue/saturation from near-grey colors.
 * @type {number}
 */
var RGB_DIFF_THRESHOLD = 0.01;
/**
 * Default hue value for achromatic colors (grey).
 * @type {number}
 */
var ACHROMATIC_HUE = 0;
/**
 * Matrix value offset for standard colors.
 * Standard colors: 100-106 range becomes 0-6.
 * @type {number}
 */
var STANDARD_COLOR_OFFSET = 100;
/**
 * Matrix value offset for premium colors.
 * Premium colors: 200-206 range becomes 0-6.
 * @type {number}
 */
var PREMIUM_COLOR_OFFSET = 200;
/**
 * Valid matrix range (0-6).
 * @type {number}
 */
var MAX_MATRIX_INDEX = 6;
/**
 * Scale factor for hue modifiers in OOXML (60000ths of degree).
 * @type {number}
 */
var HUE_SCALE_FACTOR = 60000;
/**
 * Scale factor for other color modifiers in OOXML.
 * @type {number}
 */
var COLOR_MODIFIER_SCALE_FACTOR = 100000;
/**
 * Font family mapping for theme-specified fonts to web-safe alternatives.
 * Maps Visio/Office font names to CSS-compatible generic font stacks.
 * Used when applying theme fonts to ensure cross-platform compatibility.
 *
 * @type {Object<string, string>}
 * @example
 * fontMapping['Arial Rounded MT Bold'] = 'Arial, sans-serif'
 */
export var fontMapping = {
    'Arial Rounded MT Bold': 'Arial, sans-serif',
    'Eras Light ITC': 'Georgia, serif',
    'Franklin Gothic Demi': 'Verdana, sans-serif'
};
// ==================== Validation Utilities ====================
/**
 * Validates and normalizes opacity value.
 *
 * Ensures opacity is in 0-1 range. Returns 1 if invalid.
 *
 * @param {number} opacity - Raw opacity value.
 * @returns {number} Normalized opacity (0-1).
 * @private
 */
function normalizeOpacity(opacity) {
    if (!Number.isFinite(opacity)) {
        return 1;
    }
    return Math.max(0, Math.min(1, opacity));
}
/**
 * Validates and normalizes stroke width.
 *
 * Ensures stroke width is within acceptable range.
 *
 * @param {number} width - Stroke width in points.
 * @returns {number} Normalized width (between minStrokeWidth and maxStrokeWidth).
 * @private
 */
function normalizeStrokeWidth(width) {
    if (!Number.isFinite(width) || width === undefined) {
        return 1;
    }
    var min = themeConfig.minStrokeWidth;
    var max = themeConfig.maxStrokeWidth;
    return Math.max(min, Math.min(max, width));
}
/**
 * Validates if a color value is safe to use.
 *
 * Checks for invalid values and validates hex format.
 *
 * @param {string} color Color to validate.
 * @param {boolean} isAnnotation Color to validate.
 * @returns {boolean} True if valid color.
 * @private
 */
export function isValidColor(color, isAnnotation) {
    if (typeof color !== 'string' || color.toLowerCase() === 'themed') {
        return false;
    }
    var s = color.trim();
    // Common invalid values
    if (s === '' || s === 'undefined' || s === 'null') {
        return false;
    }
    // Validate hex colors: #RGB, #RRGGBB, optionally #RRGGBBAA
    if (s.charAt(0) === '#') {
        var len = s.length;
        if (len !== 4 && len !== 7 && len !== 9) {
            return false;
        }
        // Safer explicit alternation (no optional quantified group)
        return /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(s);
    }
    // Accept named colors (basic validation)
    var lower = s.toLowerCase();
    var validNamedColors = [
        'black', 'white', 'red', 'green', 'blue', 'yellow',
        'cyan', 'magenta', 'gray', 'grey', 'transparent'
    ];
    if (validNamedColors.indexOf(lower) !== -1) {
        return true;
    }
    // For unknown strings, assume valid (browser will handle)
    if (isAnnotation) {
        return false;
    }
    return true;
}
/**
 * Gets or caches a theme element.
 * Avoids repeated lookups of the same theme values.
 *
 * @param {string} key Cache key.
 * @param {function(): any} getter Function to get value if not cached.
 * @returns {any} Cached or computed value.
 *
 * @private
 */
function getCachedThemeValue(key, getter) {
    if (!themeConfig.enableCache) {
        return getter();
    }
    if (!themeCache.has(key)) {
        var value = getter();
        themeCache.set(key, value);
    }
    return themeCache.get(key);
}
// ==================== Main Functions ====================
/**
 * Extracts and resolves node styling properties (colors, gradients, strokes).
 *
 * This function:
 * 1. Validates node input and applies defaults for groups
 * 2. Applies fill pattern transparency (fillPattern = 0 means transparent)
 * 3. Resolves fill color or gradient from active theme if available
 * 4. Resolves stroke color from active theme if available
 * 5. Applies gradient effects if gradient is enabled
 * 6. Converts units (EMU to inches to points)
 * 7. Maps stroke dash patterns to EJ2 format
 * 8. Applies opacity adjustments
 *
 * For group shapes:
 * - Fill and stroke are transparent by default
 * - No gradients are applied
 *
 * For regular shapes:
 * - Theme application depends on QuickStyle properties
 * - Existing styles take precedence over theme defaults
 * - Opacity is inverted (1 - opacity) for rendering
 *
 * @param {NodeInput} node - The shape node with style and theme properties.
 * @param {ParsingContext} context - Parser context containing theme data.
 * @param {boolean} isGroup - Whether this node is a group shape.
 *
 * @returns {NodeResolvedStyle} Resolved style object with:
 *   - fill: hex color or default 'white'
 *   - strokeColor: hex color or default 'black'
 *   - strokeWidth: points (between minStrokeWidth and maxStrokeWidth)
 *   - opacity: 0-1 range
 *   - strokeDashArray: EJ2 dash pattern or empty string
 *   - gradient: gradient definition if applicable, else undefined
 *
 * @throws {Error} Never throws - returns safe defaults on any error
 *
 * @example
 * const style = getNodeStyle(visioShape, context, false);
 * // Returns: { fill: '#FF0000', strokeColor: '#000000', strokeWidth: 2, ... }
 *
 * @example
 * // Group shape example (always transparent)
 * const groupStyle = getNodeStyle(groupShape, context, true);
 * // Returns: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0, ... }
 *
 * @private
 */
export function getNodeStyle(node, context, isGroup) {
    // ==================== Validate Node Input ====================
    if (!node || typeof node !== 'object') {
        return {
            fill: defaultFill,
            strokeColor: defaultStroke,
            strokeWidth: 1,
            opacity: 1,
            strokeDashArray: '',
            gradient: undefined
        };
    }
    // ==================== Initialize Style Properties ====================
    // For groups, use transparent defaults; for regular shapes, use node values
    var fill = isGroup ? 'transparent' : node.style.fillColor;
    var strokeColor = isGroup ? 'transparent' : node.style.strokeColor;
    var strokeDashArray = isGroup ? '' : node.style.strokeDashArray;
    var strokeWidth = isGroup ? 0 : node.style.strokeWidth;
    var isGradientAccent = false;
    var gradient;
    // ==================== Apply Fill Pattern Logic ====================
    // FillPattern = 0 => No fill (transparent)
    // FillPattern = 1 => Solid fill
    var fillPattern = Number(node.style.fillPattern);
    if (fillPattern === 0) {
        fill = 'transparent';
    }
    // ==================== Check if Active Theme is Applied ====================
    // Determines if the current theme should be used for styling
    var activeTheme = isActiveThemeApplied(node, context) || { isThemeApplied: false };
    // ==================== Resolve Fill Color or Gradient ====================
    if (!fill) {
        if (activeTheme.isThemeApplied) {
            var range = activeTheme.range;
            // Get fill type from theme (solid fill or gradient)
            var themeElement = getType(activeTheme.currentTheme, range);
            if (themeElement && themeElement.name) {
                // Handle gradient fill
                if (themeElement.name === 'a:gradFill') {
                    var findGradient = convertVisioGradientToEJ2(themeElement);
                    if (findGradient) {
                        gradient = resolveGradientAccent(findGradient, activeTheme.theme, activeTheme.fillIdxColor);
                        isGradientAccent = true;
                    }
                }
                else {
                    // Handle solid fill or pattern fill
                    var fillColorElement = (themeElement.name === 'a:pattFill')
                        ? themeElement.value['a:bgClr']
                        : themeElement;
                    var colorModifiers = extractColorWithModifiers(fillColorElement);
                    if (colorModifiers) {
                        fill = resolveAccentColor(colorModifiers, activeTheme.theme, activeTheme.fillIdxColor);
                    }
                }
            }
        }
        else {
            // Use default if no theme
            fill = defaultFill;
        }
    }
    // ==================== Resolve Stroke Color ====================
    if (!strokeColor) {
        if (activeTheme.isThemeApplied) {
            var range = activeTheme.range;
            // Get stroke type from theme (line style)
            var strokeElement = getStrokeType(activeTheme.currentTheme, range);
            if (strokeElement && strokeElement.value) {
                var strokeValue = strokeElement.value;
                if (strokeValue && strokeValue['$'] && strokeValue['$'].w) {
                    var strokeInInches = emuToInches(Number(strokeValue.$.w));
                    strokeWidth = (strokeWidth !== undefined) ? strokeWidth : strokeInInches;
                }
                if (strokeValue && strokeValue['a:prstDash'] && strokeValue['a:prstDash']['$']) {
                    var prstDash = strokeValue['a:prstDash'].$.val;
                    if (prstDash) {
                        var themeDashArray = mapPrstDashToStrokeDashArray(prstDash, strokeWidth || 0);
                        strokeDashArray = (strokeDashArray !== undefined) ? strokeDashArray : themeDashArray;
                    }
                }
                if (strokeValue && strokeValue['a:solidFill'] && !strokeColor) {
                    var solidFillData = extractColorWithModifiers(strokeValue['a:solidFill']);
                    if (solidFillData) {
                        strokeColor = resolveAccentColor(solidFillData, activeTheme.theme, activeTheme.fillIdxColor);
                    }
                }
            }
        }
        else {
            // No explicit stroke from shape and no theme -> do not invent a border
            var noExplicitStroke = !isGroup
                && node.style
                && node.style.strokeColor === undefined
                && node.style.strokeWidth === undefined
                && node.style.strokeDashArray === '0';
            if (noExplicitStroke) {
                strokeColor = 'transparent';
                strokeWidth = 0;
                strokeDashArray = '';
            }
            else {
                // Fallback to default only when stroke is clearly intended
                strokeColor = defaultStroke;
            }
        }
    }
    // ==================== Validate Final Colors ====================
    fill = isValidColor(fill) ? fill : defaultFill;
    // If we intentionally made stroke transparent, keep it; otherwise validate/fallback
    strokeColor = (strokeColor === 'transparent') ? 'transparent' : (isValidColor(strokeColor) ? strokeColor : defaultStroke);
    // ==================== Build and Return Resolved Style ====================
    var finalStrokeWidth = normalizeStrokeWidth(inchToPx(strokeWidth));
    var finalOpacity = normalizeOpacity((1 - node.style.opacity) || 1);
    var result = {
        fill: fill,
        strokeColor: strokeColor,
        strokeWidth: finalStrokeWidth,
        opacity: finalOpacity,
        strokeDashArray: LINE_PATTERN_MAP[String(strokeDashArray)] || '',
        gradient: isGradientAccent ? setGratient(gradient, undefined) : setGratient(node.style, isGroup)
    };
    return result;
}
/**
 * Determines if an active theme is applied to a node.
 *
 * Validates that:
 * - A theme is available and current
 * - The node has theme properties (QuickStyle cells)
 * - The page theme matches the current theme
 *
 * Extracts fill matrix and color indices from Quick Style properties.
 * Returns null if no theme is applicable.
 *
 * @param {VisioNode} node - The shape node to check for theme application.
 * @param {ParsingContext} context - Parser context containing theme data.
 * @returns {ActiveThemeResult} Either { isThemeApplied: false } or complete theme result
 *                              with theme, currentTheme, range, and fillIdxColor.
 *
 * @example
 * const result = isActiveThemeApplied(shape, context);
 * if (result.isThemeApplied) {
 *     console.log(`Theme range: ${result.range}`);
 *     console.log(`Fill hex: ${result.fillIdxColor}`);
 * }
 *
 * @private
 */
export function isActiveThemeApplied(node, context) {
    // ==================== Validate Inputs ====================
    // if (!node || typeof node !== 'object') {
    //     return null;
    // }
    // if (!context || !context.data) {
    //     return null;
    // }
    // ==================== Extract Theme Data ====================
    var theme = context.data.themes;
    var currentTheme = context.data.currentTheme;
    // Return null if no themes available or theme index is 0 (no theme)
    if (!(theme.length && currentTheme) || node.ThemeIndex === 0) {
        return null;
    }
    // ==================== Validate Theme Match ====================
    var enumIndex = Number(currentTheme.schemeEnum);
    var isThemeApplied = context.data.pages && theme && currentTheme &&
        context.data.currentPage.theme === enumIndex;
    // ==================== Extract QuickStyle Properties ====================
    // These properties determine which theme elements to use
    var fillMatrix = extractFillMatrix(node);
    var fillColor = extractFillColor(node);
    var valueForColor = (typeof fillColor === 'number') ? fillColor : (isThemeApplied ? 100 : undefined);
    // Track color for fallback
    if (valueForColor !== undefined) {
        themeIndex.push(fillColor);
    }
    // ==================== Resolve Color Index ====================
    // Use extracted color or fallback to last known color
    var resolvedColorIndex = valueForColor !== undefined ? valueForColor : themeIndex.length > 0 ?
        themeIndex[themeIndex.length - 1] : undefined;
    // Convert to matrix index
    var matrix = getMatrix(resolvedColorIndex);
    // Get hex color from variation colors
    var fillIdxColor = getHexColorByIndex(matrix, currentTheme.hexColors);
    // ==================== Extract Range (Which Fill/Stroke to Use) ====================
    var range;
    if (fillMatrix !== undefined && fillMatrix < 7) {
        // Direct matrix value
        range = getMatrix(fillMatrix);
    }
    else {
        // Use variant style index
        var index = fillMatrix ? getMatrix(fillMatrix) : 0;
        var variant = currentTheme.variant[parseInt(index.toString(), 10)];
        range = node.IsConnector ? 1 : Number(variant.$.fillIdx);
    }
    return {
        isThemeApplied: isThemeApplied,
        theme: theme,
        currentTheme: currentTheme,
        range: range,
        fillIdxColor: fillIdxColor
    };
}
/**
 * Extracts fill color from node Quick Style properties with fallback chain.
 *
 * Prioritized fallback:
 * 1. QuickFillColor - Direct fill color index
 * 2. QuickStyleLineColor - Line color as fallback
 * 3. QuickStyleFontColor - Font color as last resort
 *
 * @param {VisioNode} node - The shape node with Quick Style properties.
 * @returns {number | undefined} The fill color index or undefined if none found.
 *
 * @private
 */
function extractFillColor(node) {
    // ==================== Try Primary Fill Color ====================
    if (typeof node.QuickFillColor === 'number') {
        return node.QuickFillColor;
    }
    // ==================== Try Line Color Fallback ====================
    if (typeof node.QuickStyleLineColor === 'number') {
        return node.QuickStyleLineColor;
    }
    // ==================== Try Font Color Fallback ====================
    if (typeof node.QuickStyleFontColor === 'number') {
        return node.QuickStyleFontColor;
    }
    return undefined;
}
/**
 * Extracts fill matrix from node Quick Style properties with fallback chain.
 *
 * Matrix determines which fill style set to use from the theme.
 * Prioritized fallback:
 * 1. QuickFillMatrix - Direct fill matrix index
 * 2. QuickStyleLineMatrix - Line matrix as fallback
 * 3. QuickStyleFontMatrix - Font matrix as last resort
 *
 * @param {VisioNode} node - The shape node with Quick Style properties.
 * @returns {number | undefined} The fill matrix index or undefined if none found.
 *
 * @private
 */
function extractFillMatrix(node) {
    // ==================== Try Primary Fill Matrix ====================
    if (typeof node.QuickFillMatrix === 'number') {
        return node.QuickFillMatrix;
    }
    // ==================== Try Line Matrix Fallback ====================
    if (typeof node.QuickStyleLineMatrix === 'number') {
        return node.QuickStyleLineMatrix;
    }
    // ==================== Try Font Matrix Fallback ====================
    if (typeof node.QuickStyleFontMatrix === 'number') {
        return node.QuickStyleFontMatrix;
    }
    return undefined;
}
/**
 * Maps preset dash pattern names to stroke dash array values.
 *
 * Converts OOXML preset dash (prstDash) names to EJ2 stroke dash patterns.
 * Currently supported patterns:
 * - solid: Continuous line
 * - dash/sysDash: Regular dashes
 * - dot/sysDot: Dotted line
 *
 * Other patterns (lgDash, lgDashDot, etc.) default to solid.
 *
 * @param {string} prstDash - The preset dash pattern name from OOXML.
 * @param {number} strokeWidth - The stroke width (used for scaling if needed).
 * @returns {StrokeDashArrayValue} The corresponding stroke dash array value.
 *
 * @example
 * mapPrstDashToStrokeDashArray('dash', 2)   // Returns StrokeDashArrayValue.Dash
 * mapPrstDashToStrokeDashArray('sysDot', 2) // Returns StrokeDashArrayValue.Dot
 *
 * @private
 */
function mapPrstDashToStrokeDashArray(prstDash, strokeWidth) {
    // ==================== Validate Input ====================
    // if (!prstDash || typeof prstDash !== 'string') {
    //     return StrokeDashArrayValue.Solid;
    // }
    // ==================== Match Pattern Name ====================
    switch (prstDash.toLowerCase()) {
        // ==================== Regular Dash Patterns ====================
        // case 'dash':
        case 'sysdash':
            return StrokeDashArrayValue.Dash;
        // ==================== Dotted Line Patterns ====================
        // case 'dot':
        case 'sysdot':
            return StrokeDashArrayValue.Dot;
        // // ==================== Dash-Dot Patterns ====================
        // case 'dashdot':
        // case 'sysdashdot':
        //     return StrokeDashArrayValue.DashDot;
        // // ==================== Large Dash Patterns ====================
        // case 'lgdash':
        //     return StrokeDashArrayValue.LargeDash;
        // case 'lgdashdot':
        //     return StrokeDashArrayValue.LargeDashDot;
        // case 'lgdashdotdot':
        //     return StrokeDashArrayValue.LargeDashDotDot;
        // ==================== Default to Solid ====================
        // ==================== Continuous Solid Line ====================
        default:
            return StrokeDashArrayValue.Solid;
    }
}
/**
 * Converts a 1-based range to a zero-based index, clamped to minimum of 0.
 *
 * Used when accessing arrays indexed from 0 but theme ranges are 1-based.
 *
 * @param {number} range - The 1-based range value to convert.
 * @returns {number} The zero-based index (range - 1), minimum 0.
 *
 * @example
 * toZeroBasedIndex(1)  // Returns 0
 * toZeroBasedIndex(5)  // Returns 4
 * toZeroBasedIndex(0)  // Returns 0 (clamped)
 *
 * @private
 */
export function toZeroBasedIndex(range) {
    // Ensure integer value
    var r = Number.isFinite(range) ? Math.floor(range) : 1;
    // Clamp to minimum 0
    return Math.max(0, r - 1);
}
/**
 * Converts a value in EMUs (English Metric Units) to inches.
 *
 * OOXML (including VSDX) uses EMUs for precise measurement:
 * - 1 inch = 914400 EMUs
 * - 1 centimeter = 360000 EMUs
 *
 * This conversion is needed when extracting dimensions from theme/style data.
 *
 * @param {number} emu - The value in EMUs to convert.
 * @returns {number} The equivalent value in inches.
 *
 * @example
 * emuToInches(914400)  // Returns 1.0
 * emuToInches(457200)  // Returns 0.5
 *
 * @private
 */
function emuToInches(emu) {
    if (!Number.isFinite(emu)) {
        return 0;
    }
    var emuValue = emu / EMU_PER_INCH;
    return emuValue;
}
/**
 * Retrieves the connector line style for the given theme range.
 *
 * Accesses the connector-specific stroke styles from theme, which defines
 * line width, dash pattern, and color for connectors/edges.
 *
 * @param {VisioTheme} VisioTheme - The current theme object.
 * @param {number} range - The 1-based range index for the fill type.
 * @returns {AccentColorDefinition} The connector line style definition.
 *
 * @private
 */
function connectorType(VisioTheme, range) {
    // ==================== Validate Input ====================
    // if (!VisioTheme || !VisioTheme.connectorStroke) {
    //     return null;
    // }
    // ==================== Convert to Zero-Based Index ====================
    var rangeIndex = toZeroBasedIndex(range);
    // ==================== Access Connector Stroke Style ====================
    var accent = (VisioTheme.connectorStroke)['a:ln'][parseInt(rangeIndex.toString(), 10)];
    return accent;
}
/**
 * Retrieves the connector font style for the given theme range.
 *
 * Accesses connector-specific font properties like typeface and sizing.
 *
 * @param {VisioTheme} VisioTheme - The current theme object.
 * @param {number} range - The 1-based range index for the font type.
 * @returns {AccentColorDefinition} The connector font style definition.
 *
 * @private
 */
export function getConnectorFontType(VisioTheme, range) {
    // ==================== Validate Input ====================
    // if (!VisioTheme || !VisioTheme.connectorFont) {
    //     return null;
    // }
    // ==================== Convert to Zero-Based Index ====================
    var rangeIndex = toZeroBasedIndex(range);
    if (rangeIndex < 0) {
        rangeIndex = 0;
    }
    if (rangeIndex >= VisioTheme.connectorFont.length) {
        rangeIndex = VisioTheme.connectorFont.length - 1;
    }
    // ==================== Access Connector Font Style ====================
    var accent = VisioTheme.connectorFont[parseInt(rangeIndex.toString(), 10)];
    return accent;
}
/**
 * Retrieves the font style for the given theme range.
 *
 * Accesses regular (non-connector) font properties including typeface, bold, italic, etc.
 *
 * @param {VisioTheme} VisioTheme - The current theme object.
 * @param {number} range - The 1-based range index for the font type.
 * @returns {FontSchemeEntry} The font style definition with attributes and color.
 *
 * @private
 */
export function getFontType(VisioTheme, range) {
    // ==================== Validate Input ====================
    // if (!VisioTheme || !VisioTheme.fontStyles) {
    //     return null;
    // }
    // ==================== Convert to Zero-Based Index ====================
    var rangeIndex = toZeroBasedIndex(range);
    // ==================== Access Font Style ====================
    var accent = VisioTheme.fontStyles[parseInt(rangeIndex.toString(), 10)];
    return accent;
}
/**
 * Retrieves the fill style for the given theme range.
 *
 * Accesses fill definitions (solid colors or gradients) from the theme.
 *
 * @param {VisioTheme} VisioTheme - The current theme object.
 * @param {number} range - The 1-based range index for the fill type.
 * @returns {AccentColorDefinition} The fill style definition.
 *
 * @private
 */
function getType(VisioTheme, range) {
    // ==================== Validate Input ====================
    // if (!VisioTheme || !VisioTheme.fmtSchemeFill) {
    //     return null;
    // }
    // ==================== Convert to Zero-Based Index ====================
    var rangeIndex = toZeroBasedIndex(range);
    // ==================== Access Fill Style ====================
    var cacheKey = "fill_" + range + "_" + rangeIndex;
    return getCachedThemeValue(cacheKey, function () {
        var accent = VisioTheme.fmtSchemeFill[parseInt(rangeIndex.toString(), 10)];
        return accent;
    });
}
/**
 * Retrieves the stroke/line style for the given theme range.
 *
 * Accesses line width, dash pattern, and color definitions from the theme.
 *
 * @param {VisioTheme} VisioTheme - The current theme object.
 * @param {number} range - The 1-based range index for the stroke type.
 * @returns {AccentColorDefinition} The stroke style definition.
 *
 * @private
 */
function getStrokeType(VisioTheme, range) {
    // ==================== Validate Input ====================
    // if (!VisioTheme || !VisioTheme.fmtSchemeStroke) {
    //     return null;
    // }
    // ==================== Convert to Zero-Based Index ====================
    var rangeIndex = toZeroBasedIndex(range);
    // ==================== Access Stroke Style ====================
    var cacheKey = "stroke_" + range + "_" + rangeIndex;
    return getCachedThemeValue(cacheKey, function () {
        var accent = VisioTheme.fmtSchemeStroke[parseInt(rangeIndex.toString(), 10)];
        return accent;
    });
}
/**
 * Converts style gradient properties to resolved gradient definition for rendering.
 *
 * Handles both linear and radial gradient types. Returns undefined for non-gradient styles
 * or when applied to group shapes.
 *
 * @param {ResolvedGradientStyle} style - The style object with gradient properties.
 * @param {boolean} isGroup - Whether this is a group shape (groups can't have gradients).
 * @returns {ResolvedGradientStyle | undefined} Resolved gradient definition or undefined.
 *
 * @example
 * const gradient = setGratient(nodeStyle, false);
 * if (gradient) {
 *     console.log(gradient.type); // 'Linear' or 'Radial'
 * }
 *
 * @private
 */
function setGratient(style, isGroup) {
    // ==================== Return Undefined for Groups or Missing Style ====================
    if (!style || isGroup) {
        return undefined;
    }
    // ==================== Return Undefined if Gradient Not Enabled ====================
    if (!style.isGradientEnabled) {
        return undefined;
    }
    // Linear gradient
    if (style.gradientType === 'Linear') {
        var coords = style.gradientCoordinates;
        var x1 = typeof coords.x1 === 'number' ? coords.x1 : 0;
        var y1 = typeof coords.y1 === 'number' ? coords.y1 : 0;
        var x2 = typeof coords.x2 === 'number' ? coords.x2 : 1;
        var y2 = typeof coords.y2 === 'number' ? coords.y2 : 1;
        var stops = Array.isArray(style.gradientStops) ? style.gradientStops : [];
        return {
            type: 'Linear',
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            stops: stops
        };
    }
    // Radial gradient
    var rcoords = style.gradientCoordinates;
    var cx = typeof rcoords.cx === 'number' ? rcoords.cx : 0.5;
    var cy = typeof rcoords.cy === 'number' ? rcoords.cy : 0.5;
    var fx = typeof rcoords.fx === 'number' ? rcoords.fx : 0.5;
    var fy = typeof rcoords.fy === 'number' ? rcoords.fy : 0.5;
    var r = typeof rcoords.r === 'number' ? rcoords.r : 0.5;
    var rstops = Array.isArray(style.gradientStops) ? style.gradientStops : [];
    return {
        type: 'Radial',
        cx: cx,
        cy: cy,
        fx: fx,
        fy: fy,
        r: r,
        stops: rstops
    };
}
/**
 * Type-safe predicate for checking if a value is a finite number.
 *
 * Used to validate numeric inputs before arithmetic operations.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if value is a number and finite, false otherwise.
 *
 * @example
 * isFiniteNumber(5)      // true
 * isFiniteNumber(NaN)    // false
 * isFiniteNumber("5")    // false
 *
 * @private
 */
function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}
/**
 * Applies theme-based styling values to connector properties.
 *
 * Similar to getNodeStyle but specialized for connectors/edges.
 * Extracts stroke color, width, and dash pattern from connector theme styles.
 *
 * @param {ConnectorInput | VisioConnector | VisioDecoratorModel} connector - The connector object with style properties.
 * @param {ParsingContext} context - Parser context containing theme data.
 * @returns {ConnectorResolvedStyle} Resolved connector style with stroke properties.
 *
 * @example
 * const style = applyThemeStyles(connector, context);
 * console.log(style.strokeColor);   // Theme color
 * console.log(style.strokeWidth);   // Theme width in points
 *
 * @private
 */
export function applyThemeStyles(connector, context) {
    // ==================== Validate Input ====================
    // if (!connector || !connector.style) {
    //     return {
    //         strokeColor: defaultStroke,
    //         strokeDashArray: '',
    //         strokeWidth: 1,
    //         opacity: 1
    //     };
    // }
    // ==================== Extract Style Properties ====================
    var _a = connector.style, strokeColor = _a.strokeColor, strokeDashArray = _a.strokeDashArray, strokeWidth = _a.strokeWidth;
    var sourceDecorator;
    var targetDecorator;
    var sourceDecoratorSize;
    var targetDecoratorSize;
    var cornerRadius;
    var opacity = normalizeOpacity(connector.style.opacity);
    // ==================== Check if Active Theme is Applied ====================
    var activeTheme = isActiveThemeApplied(connector, context) || { isThemeApplied: false };
    // ==================== Apply Theme Styles if Available ====================
    if (activeTheme && activeTheme.isThemeApplied) {
        // ==================== Validate and Normalize Range ====================
        var range = isFiniteNumber(activeTheme.range) ? Math.floor(activeTheme.range) : 1;
        // if (range < 1) {
        //     range = 1;
        // }
        // ==================== Extract Connector Line Element ====================
        var LineElement = connectorType(activeTheme.currentTheme, range);
        // ==================== Check if LineElement is valid ====================
        if (LineElement && LineElement['$']) {
            // ==================== Extract Width and Convert ====================
            if (LineElement['$'].w) {
                var widthInInches = emuToInches(Number(LineElement.$.w));
                strokeWidth = strokeWidth !== undefined ? strokeWidth : widthInInches;
            }
            // ==================== Extract Stroke Color ====================
            if (LineElement['a:solidFill'] && !strokeColor) {
                var findFill = extractColorWithModifiers(LineElement['a:solidFill']);
                if (findFill) {
                    strokeColor = resolveAccentColor(findFill, activeTheme.theme, activeTheme.fillIdxColor);
                }
            }
        }
        // ==================== Extract applied theme index ====================
        var connStylesExt = activeTheme.currentTheme
            && activeTheme.currentTheme.connLineStylesExt;
        var styleIndex = 1;
        var quickMatrixRaw = connector.QuickStyleLineMatrix;
        if (quickMatrixRaw != null) {
            var parsed = Number(quickMatrixRaw);
            if (Number.isFinite(parsed) && parsed >= 1) {
                styleIndex = Math.floor(parsed);
            }
        }
        // ==================== Extract Connector decorator shape ====================
        if (Array.isArray(connStylesExt) && connStylesExt.length > 0) {
            var currentAccent = connStylesExt[parseInt(styleIndex.toString(), 10)];
            if (currentAccent && currentAccent.value && currentAccent.value['vt:lineEx'] && currentAccent.value['vt:lineEx']['$']) {
                var exAttrs_1 = currentAccent.value['vt:lineEx']['$'];
                var parseAttr = function (k) {
                    var value = exAttrs_1["" + k];
                    return value == null ? undefined : (isFinite(Number(value)) ? Number(value) : value);
                };
                var start = parseAttr('start');
                var end = parseAttr('end');
                var pattern = parseAttr('pattern');
                var startSize = parseAttr('startSize');
                var endSize = parseAttr('endSize');
                var rounding = parseAttr('rndg');
                // Map numeric codes to decorator shape strings
                if (start !== undefined) {
                    sourceDecorator = getDecoratorShape(Number(start));
                }
                if (end !== undefined) {
                    targetDecorator = getDecoratorShape(Number(end));
                }
                // ==================== Extract Dash Pattern ====================
                if (pattern !== undefined) {
                    strokeDashArray = strokeDashArray !== undefined ? strokeDashArray : VisioStyleModel.convertDashPattern(pattern);
                }
                // ==================== Extract Source Decorator Size ====================
                if (startSize !== undefined && connector.arrowDimension === undefined) {
                    sourceDecoratorSize = startSize;
                }
                // ==================== Extract Target Decorator Size ====================
                if (endSize !== undefined && connector.arrowDimension === undefined) {
                    targetDecoratorSize = endSize;
                }
                // ==================== Extract Connector Corner Radius ====================
                if (rounding !== undefined) {
                    cornerRadius = connector.cornerRadius !== undefined ? connector.cornerRadius
                        : emuToInches(Number(rounding));
                }
            }
        }
    }
    // ==================== Ensure Final Values Have Defaults ====================
    var finalStrokeColor = (strokeColor !== undefined && strokeColor !== null && strokeColor !== '' && isValidColor(strokeColor))
        ? strokeColor
        : defaultStroke;
    var finalStrokeDashArray = (strokeDashArray !== undefined && strokeDashArray !== null) ? strokeDashArray : '';
    var result = {
        strokeColor: finalStrokeColor,
        strokeDashArray: finalStrokeDashArray,
        strokeWidth: normalizeStrokeWidth(inchToPx(strokeWidth)),
        opacity: opacity,
        startDecorator: sourceDecorator || 'None',
        endDecorator: targetDecorator || 'None',
        startDecoratorSize: sourceDecoratorSize,
        endDecoratorSize: targetDecoratorSize,
        cornerRadius: cornerRadius || connector.cornerRadius
    };
    return result;
}
/**
 * Converts a theme matrix value to a normalized index (0-6).
 *
 * Theme matrix values in OOXML can be:
 * - 200-206: Premium colors (subtract 200 to get 0-6)
 * - 100-106: Standard colors (subtract 100 to get 0-6)
 * - Direct 0-6: Already normalized
 *
 * Anything out-of-range values default to 0.
 *
 * @param {number} matrix - The matrix value to normalize.
 * @returns {number} The normalized index (0-6).
 *
 * @example
 * getMatrix(201)  // Returns 1 (premium color)
 * getMatrix(102)  // Returns 2 (standard color)
 * getMatrix(3)    // Returns 3 (direct index)
 * getMatrix(999)  // Returns 0 (out of range, default)
 *
 * @private
 */
export function getMatrix(matrix) {
    // ==================== Convert to Number ====================
    var index = typeof matrix === 'number'
        ? matrix
        : Number.parseInt(String(matrix || ''), 10);
    // ==================== Validate Input ====================
    // if (!Number.isFinite(index)) {
    //     return 0;
    // }
    // ==================== Handle Premium Color Range (200-206) ====================
    if (index >= PREMIUM_COLOR_OFFSET && index <= PREMIUM_COLOR_OFFSET + MAX_MATRIX_INDEX) {
        index -= PREMIUM_COLOR_OFFSET;
    }
    // ==================== Handle Standard Color Range (100-106) ====================
    else if (index >= STANDARD_COLOR_OFFSET && index <= STANDARD_COLOR_OFFSET + MAX_MATRIX_INDEX) {
        index -= STANDARD_COLOR_OFFSET;
    }
    // ==================== Clamp to Valid Range (0-6) ====================
    // if (index < 0 || index > MAX_MATRIX_INDEX) {
    //     index = 0;
    // }
    return index;
}
/**
 * Gets the hex color from a color array by normalized index.
 *
 * Returns the hex color at the specified index, or defaultFill if not found.
 * Used to look up theme colors from variation color palettes.
 *
 * @param {number} index - The normalized index (0-6) into the hex colors array.
 * @param {string[] | null | undefined} hexColors - Array of hex color values from theme.
 * @returns {string} The hex color at index, or defaultFill if not available.
 *
 * @example
 * getHexColorByIndex(0, ['#FFFFFF', '#000000', ...])  // Returns '#FFFFFF'
 * getHexColorByIndex(9, ['#FFFFFF', '#000000'])       // Returns 'white' (default)
 *
 * @private
 */
export function getHexColorByIndex(index, hexColors) {
    // ==================== Validate Input ====================
    // if (!Number.isFinite(index) || !hexColors || !Array.isArray(hexColors)) {
    //     return defaultFill;
    // }
    if (hexColors[parseInt(index.toString(), 10)]) {
        var color = hexColors[parseInt(index.toString(), 10)];
        return isValidColor(color) ? color : defaultFill;
    }
    return defaultFill;
}
/**
 * Normalizes a range value to valid threshold.
 *
 * Ensures range is:
 * - An integer (not fractional)
 * - At least 1 (minimum valid theme range)
 *
 * Used when resolving theme style indices.
 *
 * @param {number} range - The range value to normalize.
 * @returns {number} The normalized range (minimum 1).
 *
 * @example
 * normalizeRange(3.7)  // Returns 3 (floored, still valid)
 * normalizeRange(0)    // Returns 1 (clamped to minimum)
 * normalizeRange(-5)   // Returns 1 (clamped to minimum)
 *
 * @private
 */
export function normalizeRange(range) {
    // ==================== Ensure Integer ====================
    var n = Number.isFinite(range) ? Math.floor(range) : 1;
    // ==================== Clamp to Minimum 1 ====================
    return n < 1 ? 1 : n;
}
/**
 * Manages global document properties such as colors and fonts.
 * This singleton-style class encapsulates the parsing and retrieval of
 * Visio document-wide properties, including:
 * - Custom color definitions (indexed by number, mapped to hex values)
 * - Font definitions (indexed by ID, mapped to font names)
 *
 * @example
 * const manager = new VisioPropertiesManager();
 * manager.initialize(parsedXmlRoot);
 * const redHex = manager.getColor(2); // Returns "#FF0000"
 *
 * @private
 */
var VisioPropertiesManager = /** @class */ (function () {
    function VisioPropertiesManager() {
        this.colorElementMap = new Map();
        this.fontElementMap = new Map();
    }
    /**
     * Loads the properties of the document from the XML root element.
     * Parses both color and font entries from the Visio document structure.
     *
     * @param {ParsedXmlObject} rootElement The parsed XML element of the Visio document
     * @returns {void}
     *
     * @private
     */
    VisioPropertiesManager.prototype.initialize = function (rootElement) {
        if (!rootElement) {
            return;
        }
        // Parse color entries - Colors contains ColorEntry elements
        var colorsContainer = rootElement['Colors'];
        if (colorsContainer) {
            var colorList = ensureArray(colorsContainer['ColorEntry']);
            for (var _i = 0, colorList_1 = colorList; _i < colorList_1.length; _i++) {
                var colorElement = colorList_1[_i];
                if (colorElement && colorElement.$) {
                    var _a = colorElement.$, colorId = _a.IX, colorValue = _a.RGB;
                    if (colorId && colorValue) {
                        this.colorElementMap.set(String(colorId), colorValue);
                    }
                }
            }
        }
        // Parse font entries - FaceNames contains FaceName elements
        var fontsContainer = rootElement['FaceNames'];
        if (fontsContainer) {
            var fontList = ensureArray(fontsContainer['FaceName']);
            for (var _b = 0, fontList_1 = fontList; _b < fontList_1.length; _b++) {
                var fontElement = fontList_1[_b];
                if (fontElement && fontElement.$) {
                    var _c = fontElement.$, fontId = _c.ID, fontValue = _c.Name;
                    if (fontId && fontValue) {
                        this.fontElementMap.set(String(fontId), fontValue);
                    }
                }
            }
        }
        // Soft size check for resilience
        var totalSize = this.colorElementMap.size + this.fontElementMap.size;
        if (totalSize > VisioPropertiesManager.MAX_CACHE_SIZE) {
            // Avoid throwing—just warn. If necessary, add LRU/eviction strategy here.
            console.warn("[VisioPropertiesManager] Parsed entries exceed soft limit (" + totalSize + " > " + VisioPropertiesManager.MAX_CACHE_SIZE + "). " +
                'Consider disposing instances sooner or enabling eviction.');
        }
    };
    /**
     * Returns the color of the index indicated in 'index'.
     * First checks the document's custom colors, then falls back to default palette.
     * Returns empty string if color not found.
     *
     * @param {string | number} index Index of the color (string or number)
     * @returns {string} Hexadecimal representation of the color (e.g., "#FFFFFF")
     *
     * @private
     */
    VisioPropertiesManager.prototype.getColor = function (index) {
        var key = String(index);
        // First check custom colors from document
        var color = this.colorElementMap.get(key);
        // If not found, check default colors
        if (!color) {
            color = VisioPropertiesManager.DEFAULT_COLORS["" + key];
        }
        // If still not found, return empty string
        if (!color) {
            return '';
        }
        return color;
    };
    /**
     * Cleans up resources and clears internal maps.
     * Call this when the manager is no longer needed.
     *
     * @returns {void}
     *
     * @private
     */
    VisioPropertiesManager.prototype.dispose = function () {
        this.colorElementMap.clear();
        this.fontElementMap.clear();
    };
    /**
     * Static default colors palette
     */
    VisioPropertiesManager.DEFAULT_COLORS = {
        '0': '#000000',
        '1': '#FFFFFF',
        '2': '#FF0000',
        '3': '#00FF00',
        '4': '#0000FF',
        '5': '#FFFF00',
        '6': '#FF00FF',
        '7': '#00FFFF',
        '8': '#800000',
        '9': '#008000',
        '10': '#000080',
        '11': '#808000',
        '12': '#800080',
        '13': '#008080',
        '14': '#C0C0C0',
        '15': '#E6E6E6',
        '16': '#CDCDCD',
        '17': '#B3B3B3',
        '18': '#9A9A9A',
        '19': '#808080',
        '20': '#666666',
        '21': '#4D4D4D',
        '22': '#333333',
        '23': '#1A1A1A' // Almost Black
    };
    // Optional soft limit—tune or make it configurable if needed
    VisioPropertiesManager.MAX_CACHE_SIZE = 5000;
    return VisioPropertiesManager;
}());
export { VisioPropertiesManager };
/**
 * Resolves annotation (text) styling from theme and node properties.
 *
 * This function:
 * 1. Extracts incoming annotation style properties
 * 2. Applies theme font family if available
 * 3. Resolves text color from theme or incoming data
 * 4. Extracts font bold/italic from theme font style
 * 5. Resolves text alignment and decoration
 *
 * Theme colors override incoming colors unless incoming specifies 'Themed'.
 *
 * @param {any} node - The shape node with annotation properties.
 * @param {ParsingContext} context - Parser context containing theme data.
 * @returns {ResolvedAnnotationStyle} Complete text styling with font, color, size, alignment.
 *
 * @example
 * const textStyle = setAnnotationStyle(shape, context);
 * console.log(textStyle.fontFamily);  // Theme font or fallback
 * console.log(textStyle.color);       // Theme or node color
 * console.log(textStyle.bold);        // From theme font style
 *
 * @private
 */
export function setAnnotationStyle(node, context) {
    // ==================== Validate Input ====================
    // if (!node) {
    //     return {
    //         color: 'Black',
    //         fontFamily: undefined,
    //         fill: undefined,
    //         fontSize: 10 * 1.33,
    //         opacity: 1,
    //         bold: false,
    //         italic: false,
    //         textAlign: 'Center',
    //         textDecoration: 'None'
    //     };
    // }
    // ==================== Extract Incoming Style ====================
    var incoming = node && node.annotation && node.annotation.style ? node.annotation.style : {};
    // ==================== Initialize Color Tracking ====================
    var incomingColor = typeof incoming.color === 'string' ? incoming.color : undefined;
    var resolvedColor = incomingColor ? incomingColor : '';
    var resolvedFontFamily = typeof incoming.fontFamily === 'string' ? incoming.fontFamily : undefined;
    var Bold;
    // ==================== Check if Active Theme is Applied ====================
    var activeTheme = isActiveThemeApplied(node, context) || { isThemeApplied: false };
    var themeApplied = false;
    var themeColorApplied = false;
    // ==================== Apply Theme Properties ====================
    if (activeTheme && activeTheme.isThemeApplied) {
        // ==================== Extract Theme Font Family ====================
        var firstThemeEntry = activeTheme.theme[0];
        if (!resolvedFontFamily && firstThemeEntry && typeof firstThemeEntry.fontFamily === 'string') {
            var themeFont = firstThemeEntry.fontFamily;
            // Map to web-safe font if available
            if (fontMapping && fontMapping["" + themeFont]) {
                themeFont = fontMapping["" + themeFont];
            }
            resolvedFontFamily = themeFont;
            themeApplied = true;
        }
        // ==================== Extract Theme Color ====================
        if (!incomingColor || incomingColor === 'Themed') {
            // Get range-specific font entry from theme
            var range = normalizeRange(activeTheme.range);
            var fontEntry = getFontType(activeTheme.currentTheme, range);
            if (fontEntry && fontEntry['vt:color']) {
                var colorNode = fontEntry['vt:color'];
                var colorModifiers = extractColorWithModifiers(colorNode);
                if (colorModifiers) {
                    var themeColor = resolveAccentColor(colorModifiers, activeTheme.theme, activeTheme.fillIdxColor);
                    if (typeof themeColor === 'string' && themeColor !== '' && isValidColor(themeColor)) {
                        resolvedColor = themeColor;
                        themeColorApplied = true;
                    }
                }
            }
            // ==================== Extract Bold from Font Style ====================
            if (fontEntry && fontEntry['$']) {
                var styleRaw = fontEntry.$.style;
                var style = typeof styleRaw === 'string' ? parseInt(styleRaw, 10) : Number(styleRaw);
                // Bit 0 indicates bold
                Bold = (style & 1) !== 0;
            }
        }
    }
    // ==================== Finalize All Properties ====================
    var finalColor = (themeColorApplied ? resolvedColor : (incoming.color !== undefined && incoming.color !== null ? incoming.color : 'Black'));
    var finalFontFamily = themeApplied ? resolvedFontFamily : incoming.fontFamily;
    var finalFontSize = typeof incoming.fontSize === 'number' ? incoming.fontSize : 10 * 1.33;
    var finalOpacity = normalizeOpacity(incoming.opacity);
    var finalBold = (Bold === true)
        ? !(incoming.TEXT_STYLE_NONE === true) // Override if no-style is active
        : (typeof incoming.bold === 'boolean' ? incoming.bold : false);
    var finalItalic = typeof incoming.italic === 'boolean' ? incoming.italic : false;
    var finalTextAlign = incoming.textAlign ? getTextAlign(incoming.textAlign) : 'Center';
    var finalTextDecoration = getTextDecoration(incoming.textDecoration);
    var result = {
        color: isValidColor(finalColor) ? finalColor : 'Black',
        fontFamily: finalFontFamily,
        fill: incoming.fill,
        fontSize: finalFontSize,
        opacity: finalOpacity,
        bold: finalBold,
        italic: finalItalic,
        textAlign: finalTextAlign,
        textDecoration: finalTextDecoration
    };
    return result;
}
/**
 * Safe hasOwnProperty check for any object.
 *
 * Used to check if an object has a property as its own property (not inherited).
 *
 * @param {object} obj - The object to check.
 * @param {string} prop - The property name to check for.
 * @returns {boolean} True if obj has prop as own property, false otherwise.
 *
 * @example
 * hasOwn({ a: 1 }, 'a')      // true
 * hasOwn({}, 'toString')     // false (inherited)
 * hasOwn(null, 'a')          // false (not an object)
 *
 * @private
 */
export function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
/**
 * Resolves a Visio gradient to EJ2 format with endpoint calculation.
 *
 * Converts Visio gradient angle and stops to EJ2 linear gradient with normalized coordinates.
 *
 * @param {VisioLinearGradient} VisioGradient - Visio gradient with angle and stops.
 * @param {VisioTheme[]} theme - Theme array for color resolution.
 * @param {string} baseColor - Base color for placeholder colors.
 * @returns {ResolvedGradientStyle} EJ2-compatible gradient definition.
 *
 * @private
 */
function resolveGradientAccent(VisioGradient, theme, baseColor) {
    // ==================== Validate Input ====================
    // if (!VisioGradient || !theme || !theme.length) {
    //     return {
    //         gradientStops: [],
    //         isGradientEnabled: false,
    //         gradientCoordinates: { x1: 0, y1: 0, x2: 1, y2: 1 },
    //         gradientType: 'Linear'
    //     };
    // }
    // ==================== Convert Angle to Endpoints ====================
    var _a = angleToLinearEndpoints(VisioGradient.angle), x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
    // ==================== Process Gradient Stops ====================
    var stops = applyOfficeColorModifiers(VisioGradient, theme, baseColor);
    // ==================== Build Gradient Coordinates ====================
    var gradientCoordinates = { x1: x1, y1: y1, x2: x2, y2: y2 };
    // ==================== Build Result ====================
    var style = {
        gradientStops: stops,
        isGradientEnabled: true,
        gradientCoordinates: gradientCoordinates,
        gradientType: 'Linear'
    };
    return style;
}
/**
 * Converts a gradient angle in degrees to linear gradient endpoints.
 *
 * Uses trigonometry to calculate start (x1, y1) and end (x2, y2) points for a linear gradient
 * with the given angle, centered in normalized space (0.5, 0.5).
 *
 * @param {number} thetaDeg - Gradient angle in degrees (0-360).
 * @returns {LinearGradientEndpoints} Start and end points { x1, y1, x2, y2 }.
 *
 * @example
 * angleToLinearEndpoints(0)    // Right pointing
 * angleToLinearEndpoints(90)   // Up pointing
 * angleToLinearEndpoints(180)  // Left pointing
 * angleToLinearEndpoints(270)  // Down pointing
 *
 * @private
 */
function angleToLinearEndpoints(thetaDeg) {
    // ==================== Validate Input ====================
    // if (!Number.isFinite(thetaDeg)) {
    //     thetaDeg = 0;
    // }
    // ==================== Convert Angle to Radians ====================
    var t = (thetaDeg % 360) * Math.PI / 180;
    // ==================== Calculate Direction Vector ====================
    var dx = Math.cos(t) * 100;
    var dy = Math.sin(t) * 100;
    // ==================== Calculate Endpoints from Center ====================
    var x1 = 0.5 - dx / 2;
    var y1 = 0.5 - dy / 2;
    var x2 = 0.5 + dx / 2;
    var y2 = 0.5 + dy / 2;
    return { x1: x1, y1: y1, x2: x2, y2: y2 };
}
/**
 * Converts a Visio gradient to EJ2 format.
 *
 * Extracts gradient stops and angle from OOXML gradient element.
 *
 * @param {AccentColorDefinition} gradFillValue - OOXML gradient fill definition.
 * @returns {VisioLinearGradient} Visio gradient format with stops and angle.
 *
 * @private
 */
function convertVisioGradientToEJ2(gradFillValue) {
    if (!gradFillValue || !gradFillValue.value) {
        return null;
    }
    // ==================== Extract Gradient Stops ====================
    var gradStopLst = gradFillValue.value['a:gsLst'];
    // ==================== Extract Gradient Angle ====================
    var linElement = gradFillValue.value['a:lin'];
    // ==================== Process Stops ====================
    var stops = extractGradientStops(gradStopLst);
    // ==================== Extract Angle ====================
    var officeAngle = linElement ? extractGradientAngle(linElement) : 0;
    // ==================== Build Gradient ====================
    var gradient = {
        stops: stops,
        angle: officeAngle
    };
    return gradient;
}
/**
 * Processes gradient stops from OOXML format to EJ2 format.
 *
 * Applies color modifiers (tint, shade, saturation, etc.) to each stop color.
 *
 * @param {VisioLinearGradient} gradStopArray - Visio gradient with stops.
 * @param {VisioTheme[]} theme - Theme for color resolution.
 * @param {string} baseColor - Base/placeholder color.
 * @returns {GradientStop[]} Array of processed gradient stops with offset, color, opacity.
 *
 * @private
 */
function applyOfficeColorModifiers(gradStopArray, theme, baseColor) {
    // ==================== Validate Input ====================
    var stops = gradStopArray.stops && Array.isArray(gradStopArray.stops)
        ? gradStopArray.stops
        : [];
    // if (!stops.length) {
    //     return [];
    // }
    // ==================== Define Helpers ====================
    var ensureHash = function (hex) {
        return hex ? (hex.startsWith('#') ? hex : "#" + hex) : '#000000';
    };
    var toPercent = function (pos) {
        var p = Number(pos);
        // if (!Number.isFinite(p)) { p = 0; }
        // If user supplies 0�1, convert to percent; if already 0�100, keep it
        if (p <= 1) {
            p = p * 100;
        }
        // Clamp to 0�100
        return Math.max(0, Math.min(100, p));
    };
    // ==================== Process Each Stop ====================
    return stops
        .map(function (s) {
        var colorType = s.colorType;
        // ==================== Resolve Base Color ====================
        var baseHex = colorType === 'srgb'
            ? ensureHash(s.color) : (s.color === 'phClr') ? ensureHash(baseColor)
            : resolveSchemeColor(s.color, theme[0].fontColor);
        // ==================== Apply Color Transforms ====================
        var color = applyTransformsOOXML(baseHex, s.modifiers);
        var opacity = 1;
        var offset = toPercent(s.position);
        return { offset: offset, color: color, opacity: opacity };
    });
}
/**
 * Converts a hex color string to an RGB tuple.
 *
 * Handles both 3-digit and 6-digit hex colors by expanding 3-digit to 6-digit.
 *
 * @param {string} hex - Hex color (with or without '#', 3 or 6 digits).
 * @returns {[number, number, number]} RGB values [0-255, 0-255, 0-255].
 *
 * @example
 * hexToRgb('#FFFFFF')  // Returns [255, 255, 255]
 * hexToRgb('000000')   // Returns [0, 0, 0]
 *
 * @private
 */
function hexToRgb(hex) {
    // ==================== Validate Input ====================
    // if (!hex || typeof hex !== 'string') {
    //     return [0, 0, 0];
    // }
    // ==================== Remove Hash and Normalize ====================
    var s = hex.replace('#', '');
    // ==================== Expand 3-digit to 6-digit if needed ====================
    var n = s.length === 3 ? s.split('').map(function (c) { return c + c; }).join('') : s;
    // ==================== Parse and Extract Components ====================
    var num = parseInt(n, 16);
    // if (!Number.isFinite(num)) {
    //     return [0, 0, 0];
    // }
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
/**
 * Converts RGB values to HSL (Hue, Saturation, Lightness).
 *
 * Used for applying color modifiers (tint, shade, saturation) which work better in HSL space.
 *
 * @param {number} r - Red value (0-255).
 * @param {number} g - Green value (0-255).
 * @param {number} b - Blue value (0-255).
 * @returns {[number, number, number]} HSL values [0-1, 0-1, 0-1].
 *
 * @private
 */
function rgbToHsl(r, g, b) {
    // ==================== Normalize RGB to 0-1 ====================
    r /= 255;
    g /= 255;
    b /= 255;
    // ==================== Find Min and Max ====================
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = ACHROMATIC_HUE;
    var s = 0;
    var l = (max + min) / 2;
    // ==================== Calculate Hue and Saturation ====================
    if (max !== min) {
        var d = max - min;
        // ==================== Handle Near-Achromatic Colors ====================
        // If difference is tiny, treat as grey
        if (d < RGB_DIFF_THRESHOLD) {
            s = 0;
            h = ACHROMATIC_HUE;
        }
        else {
            // ==================== Calculate Saturation ====================
            if (l < 0.5) {
                s = d / (max + min);
            }
            else {
                s = d / (2 - max - min);
            }
            // ==================== Calculate Hue ====================
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }
    }
    return [h, s, l];
}
/* eslint-disable valid-jsdoc */
/**
 * Normalizes a color modifier value based on its transform type.
 *
 * Different transform types use different value ranges:
 * - hueOff/hueShift: 0-1 or 0-360000 (60000ths of degree)
 * - Others: 0-1 or 0-100000
 *
 * Converts to normalized 0-1 range.
 *
 * @param {Transform['type']} type - The transform type.
 * @param {number} v - The value to normalize.
 * @returns {number} Normalized value (0-1).
 *
 * @private
 */
/* eslint-enable valid-jsdoc */
function normValByType(type, v) {
    // if (!Number.isFinite(v)) { return 0; }
    // // ==================== Hue-based transforms ====================
    // if (type === 'hueOff' || type === 'hueShift') {
    //     // If already 0..1, keep; else convert from 0..360000 (60000ths of a degree)
    //     return v > 1 ? clampToUnit(v / HUE_SCALE_FACTOR) : clampToUnit(v);
    // }
    // ==================== Other transforms (tint, shade, satMod, etc.) ====================
    // All others use 0..100000 scale
    return v > 1 ? clampToUnit(v / COLOR_MODIFIER_SCALE_FACTOR) : clampToUnit(v);
}
/**
 * Normalizes and validates color transform definitions.
 *
 * Handles both canonical { type, val } format and flat { propertyName: value } format.
 * Validates transform types against VALID_TYPES.
 *
 * @param {Transform | Transform[]} input - Single or array of transform definitions.
 * @returns {Transform[]} Array of validated transforms with normalized values.
 *
 * @private
 */
function normalizeTransforms(input) {
    // ==================== Handle Empty Input ====================
    if (input == null) {
        return [];
    }
    // ==================== Normalize to Array ====================
    var arr = Array.isArray(input) ? input : [input];
    var out = [];
    // ==================== Process Each Transform ====================
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (!item) {
            continue;
        }
        // ==================== Case A: Canonical { type, val } Format ====================
        if (item.type && item.val != null) {
            var transform = item;
            if (VALID_TYPES.has(transform.type)) {
                out.push({ type: transform.type, val: normValByType(transform.type, Number(transform.val)) });
            }
            continue;
        }
        // ==================== Case B: Flat Object Format ====================
        // Like { tint: 0.3 } or { shade: 75000, satMod: 85000 }
        var flat = item;
        var keys = Object.keys(flat);
        for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var key = keys_1[_a];
            // Skip invalid types
            var raw = (flat)["" + key];
            var v = Number(raw);
            if (!VALID_TYPES.has(key) || raw == null || !Number.isFinite(v)) {
                continue;
            }
            out.push({ type: key, val: normValByType(key, v) });
        }
    }
    return out;
}
/**
 * Applies OOXML color transforms (tint, shade, saturation, etc.) to a base hex color.
 *
 * Converts to HSL space, applies modifications, then converts back to RGB/hex.
 * Supports: shade, tint, lumMod, satMod (and more in commented code).
 *
 * @param {string} baseHex - Base hex color (with '#').
 * @param {Transform} transforms - Color modifier transforms to apply.
 * @returns {string} Modified hex color (with '#').
 *
 * @private
 */
function applyTransformsOOXML(baseHex, transforms) {
    // // ==================== Validate Input ====================
    // if (!baseHex || !isValidColor(baseHex)) {
    //     return '#000000';
    // }
    // ==================== Convert to RGB ====================
    var _a = hexToRgb(baseHex), r0 = _a[0], g0 = _a[1], b0 = _a[2];
    // ==================== Convert to HSL ====================
    var _b = rgbToHsl(r0, g0, b0), h = _b[0], s = _b[1], l = _b[2];
    h = h * 1; // Ensure h is a number
    // ==================== Normalize Transforms ====================
    var mods = normalizeTransforms(transforms);
    // ==================== Apply Each Transform ====================
    for (var i = 0; i < mods.length; i++) {
        var t = mods[parseInt(i.toString(), 10)];
        switch (t.type) {
            // ==================== Shade: Darken by multiplying lightness ====================
            case 'shade':
                l = clampToUnit(l * t.val);
                break;
            // ==================== Tint: Lighten by moving toward white ====================
            case 'tint':
                l = clampToUnit(l + (1 - l) * t.val);
                break;
            // ==================== Luminance Mod: Multiply lightness ====================
            case 'lumMod':
                l = clampToUnit(l * t.val);
                break;
            // ==================== Saturation Mod: Multiply saturation ====================
            case 'satMod':
                s = clampToUnit(s * t.val);
                break;
            // Other transforms (hueOff, hueShift, satOff, lumOff, alpha, alphaMod, etc.)
            // are reserved for future implementation
        }
    }
    // ==================== Convert Back to RGB ====================
    var _c = hslToRgb(h, s, l), r = _c[0], g = _c[1], b = _c[2];
    // ==================== Convert to Hex ====================
    return rgbToHex(r, g, b);
}
/**
 * Converts RGB values to hex color string.
 *
 * @param {number} r - Red value (0-255).
 * @param {number} g - Green value (0-255).
 * @param {number} b - Blue value (0-255).
 * @returns {string} Hex color (e.g., "#FFFFFF").
 *
 * @private
 */
function rgbToHex(r, g, b) {
    return "#" + toHex2(r) + toHex2(g) + toHex2(b);
}
/**
 * Converts a single byte value (0-255) to a 2-character hex string.
 *
 * @param {number} n - The byte value (0-255).
 * @returns {string} 2-character hex string (e.g., "FF", "00").
 *
 * @private
 */
function toHex2(n) {
    var s = n.toString(16);
    return ('0' + s).slice(-2);
}
/**
 * Converts HSL values back to RGB.
 *
 * Uses the inverse algorithm of rgbToHsl for color conversion.
 *
 * @param {number} h - Hue (0-1).
 * @param {number} s - Saturation (0-1).
 * @param {number} l - Lightness (0-1).
 * @returns {[number, number, number]} RGB values [0-255, 0-255, 0-255].
 *
 * @private
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    // ==================== Achromatic Case (No Saturation) ====================
    if (s === 0 || s < SATURATION_THRESHOLD) { // Add threshold check
        r = g = b = l;
    }
    else {
        // ==================== Ensure Hue is Valid ====================
        if (!Number.isFinite(h) || isNaN(h)) {
            h = ACHROMATIC_HUE; // Default to red hue if undefined
        }
        h = ((h % 1) + 1) % 1; // Normalize h to 0-1
        // ==================== Helper for Hue-to-RGB Conversion ====================
        var hue2rgb = function (p, q, t) {
            // ==================== Normalize t to 0-1 Range ====================
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            // ==================== Convert Hue Sector to RGB ====================
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        };
        // ==================== Calculate Midpoints ====================
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        // ==================== Convert Each Channel ====================
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
/**
 * Clamps a value to the unit range [0, 1].
 *
 * Used when normalizing HSL and other color values.
 *
 * @param {number} x - The value to clamp.
 * @returns {number} The clamped value (0-1).
 *
 * @private
 */
function clampToUnit(x) {
    return Math.max(0, Math.min(1, x));
}
/**
 * Resolves a scheme color name to a hex value from the theme palette.
 *
 * Handles both direct hex values and theme color names like 'lt1', 'dk1', 'accent1', etc.
 *
 * @param {string} name - The color name or hex value.
 * @param {FormattedColors} palette - Theme color palette for scheme color lookup.
 * @returns {string} Hex color (with '#'), or black if not resolved.
 *
 * @private
 */
function resolveSchemeColor(name, palette) {
    // ==================== Validate Input ====================
    if (!name || typeof name !== 'string') {
        return '#000000';
    }
    // ==================== Check if Direct Hex ====================
    if (/^#?[0-9A-Fa-f]{6}$/.test(name)) {
        return name.startsWith('#') ? name.toUpperCase() : ('#' + name).toUpperCase();
    }
    // ==================== Look Up in Theme Palette ====================
    if (palette && palette["" + name]) {
        return palette["" + name].toUpperCase();
    }
    return '#000000';
}
/**
 * Extracts gradient angle from OOXML linear gradient element.
 *
 * OOXML stores angles in 60000ths of degrees (0-21600000 for 0-360 degrees).
 *
 * @param {VisioLinearGradientAngle} linElement - The a:lin element with angle.
 * @returns {number} Angle in degrees (0-360), or 90 (vertical) as default.
 *
 * @private
 */
function extractGradientAngle(linElement) {
    // if (!linElement || !linElement['$']) {
    //     return 90; // Default vertical
    // }
    // ==================== Extract Angle Value ====================
    var angValue = parseInt(linElement['$'].ang, 10);
    // // ==================== Validate ====================
    // if (!Number.isFinite(angValue)) {
    //     return 90;
    // }
    // ==================== Convert from 60000ths of Degree ====================
    var degrees = angValue / HUE_SCALE_FACTOR;
    // ==================== Normalize to 0-360 ====================
    return ((degrees % 360) + 360) % 360;
}
/**
 * Extracts gradient stops from an OOXML gradient stop list.
 *
 * Processes position and color information for each stop.
 *
 * @param {GradientStopList} gsLst - The a:gsLst containing a:gs elements.
 * @returns {ProcessedGradientStop[]} Array of processed gradient stops.
 *
 * @private
 */
function extractGradientStops(gsLst) {
    // ==================== Validate Input ====================
    // if (!gsLst || !gsLst['a:gs']) {
    //     return [];
    // }
    // ==================== Normalize to Array ====================
    var gsArray = Array.isArray(gsLst['a:gs'])
        ? gsLst['a:gs']
        : [gsLst['a:gs']];
    // ==================== Process Each Stop ====================
    return gsArray.map(function (gs) {
        // ==================== Extract Position ====================
        // Position is in percentage * 1000 (0-100000)
        var position = parseInt(gs['$'].pos, 10) / 1000; // Convert to 0-100
        // ==================== Extract Color ====================
        var colorInfo = extractColorWithModifiers(gs);
        return {
            position: position,
            color: (colorInfo && colorInfo.colorValue),
            colorType: (colorInfo && colorInfo.colorType),
            modifiers: (colorInfo && colorInfo.modifiers)
        };
    });
}
/**
 * Resolves an accent color with modifiers applied.
 *
 * Handles scheme colors (theme colors), sRGB colors, and placeholder colors.
 * Applies color modifiers (tint, shade, saturation, etc.) to get final color.
 *
 * @param {ColorInfo} result - Color information with type, value, and modifiers.
 * @param {VisioTheme[]} theme - Theme array for palette lookup.
 * @param {string} baseColor - Base/placeholder color.
 * @returns {string} Resolved and modified hex color.
 *
 * @private
 */
export function resolveAccentColor(result, theme, baseColor) {
    // ==================== Validate Input ====================
    // if (!result || !theme || !theme.length) {
    //     return defaultFill;
    // }
    // ==================== Extract Theme Palette ====================
    var palette = theme[0].fontColor;
    var colorType = result.colorType, colorValue = result.colorValue, modifiers = result.modifiers;
    // ==================== Initialize Color Resolution ====================
    var colored = false;
    var hex;
    // ==================== Determine Base Hex ====================
    var valueLower = String(colorValue).toLowerCase();
    if (String(colorType).toLowerCase() === 'srgb' && isHexColor(colorValue)) {
        // Direct SRGB color
        hex = ensureHashHex(colorValue);
        colored = true;
    }
    else if (valueLower === 'phclr') {
        // Placeholder color
        hex = baseColor && isValidColor(baseColor) ? baseColor : defaultFill;
        colored = true;
    }
    // ==================== Resolve Theme Color if Not Direct ====================
    hex = colored ? hex : resolveThemeColor(palette, valueLower);
    // ==================== Validate Resolved Color ====================
    // if (!hex || !isValidColor(hex)) {
    //     return defaultFill;
    // }
    // ==================== Apply Color Modifiers ====================
    var color = applyTransformsOOXML(hex, modifiers);
    return isValidColor(color) ? color : defaultFill;
}
/**
 * Resolves a theme color role name to its hex value.
 *
 * Looks up color names like 'lt1', 'dk1', 'accent1', etc. in the theme palette.
 *
 * @param {VisioTheme} theme - The theme palette (fontColor map).
 * @param {string} roleName - The color role name.
 * @returns {string | undefined} Hex color or undefined if not found.
 *
 * @private
 */
function resolveThemeColor(theme, roleName) {
    // if (!roleName || !theme) {
    //     return undefined;
    // }
    var key = roleName.trim();
    var color = theme["" + key];
    return (color && isValidColor(color)) ? color : undefined;
}
/**
 * Checks if a string is a valid hex color (3, 6, or 8 digits).
 *
 * @param {string} str - The string to validate.
 * @returns {boolean} True if valid hex color format.
 *
 * @private
 */
function isHexColor(str) {
    // if (typeof str !== 'string') { return false; }
    var s = str.trim();
    return /^[0-9a-fA-F]{3}$/.test(s) ||
        /^[0-9a-fA-F]{6}$/.test(s) ||
        /^[0-9a-fA-F]{8}$/.test(s);
}
/**
 * Ensures a hex color string has a '#' prefix and is uppercase.
 *
 * @param {string} str - The hex color string.
 * @returns {string} Hex color with '#' prefix and uppercase.
 *
 * @private
 */
function ensureHashHex(str) {
    // if (!str || typeof str !== 'string') {
    //     return '#000000';
    // }
    var s = str.trim();
    return s.startsWith('#') ? s.toUpperCase() : ('#' + s.toUpperCase());
}
/**
 * Extracts color value and modifiers from a solid fill element.
 *
 * Handles multiple color types:
 * - a:srgbClr: Direct RGB hex color
 * - a:schemeClr: Theme/scheme color name with optional modifiers
 * - a:sysClr: System color name
 * - a:prstClr: Preset color name
 *
 * For scheme colors, extracts modifiers like tint, shade, saturation, etc.
 *
 * @param {SolidFillValue | ThemeColorElement} solidFill - The solid fill element to extract color from.
 * @returns {ColorInfo} Color information with type, value, and modifiers.
 *
 * @private
 */
export function extractColorWithModifiers(solidFill) {
    // ==================== Validate Input ====================
    // if (!solidFill) {
    //     return null;
    // }
    // ==================== Get Value Object ====================
    var solidFillValue = (solidFill.value || solidFill);
    var colorType = '';
    var colorValue = '';
    var modifiers = {};
    // ==================== Determine Color Type ====================
    if (solidFillValue['a:srgbClr']) {
        colorType = 'srgb';
        colorValue = solidFillValue['a:srgbClr']['$'].val;
    }
    else if (solidFillValue['a:schemeClr']) {
        colorType = 'scheme';
        colorValue = solidFillValue['a:schemeClr']['$'].val;
    }
    else if (solidFillValue['a:sysClr']) {
        colorType = 'system';
        colorValue = solidFillValue['a:sysClr']['$'].val;
    }
    else if (solidFillValue['a:prstClr']) {
        colorType = 'preset';
        colorValue = solidFillValue['a:prstClr']['$'].val;
    }
    else {
        return null;
    }
    // ==================== Extract Scheme Color Modifiers ====================
    if (solidFillValue['a:schemeClr']) {
        var schemeClr = solidFillValue['a:schemeClr'];
        // Extract tint (lighten)
        if (schemeClr['a:tint']) {
            modifiers.tint = parseInt(schemeClr['a:tint']['$'].val, 10);
        }
        // Extract shade (darken)
        if (schemeClr['a:shade']) {
            modifiers.shade = parseInt(schemeClr['a:shade']['$'].val, 10);
        }
        // Extract luminance multiply
        if (schemeClr['a:lumMod']) {
            modifiers.lumMod = parseInt(schemeClr['a:lumMod']['$'].val, 10);
        }
        // Extract saturation multiply
        if (schemeClr['a:satMod']) {
            modifiers.satMod = parseInt(schemeClr['a:satMod']['$'].val, 10);
        }
        // // Extract alpha/opacity
        // if (schemeClr['a:alpha']) {
        //     modifiers.alpha = parseInt(schemeClr['a:alpha']['$'].val, 10);
        // }
        // // Extract alpha multiply
        // if (schemeClr['a:alphaMod']) {
        //     modifiers.alphaMod = parseInt(schemeClr['a:alphaMod']['$'].val, 10);
        // }
        // Other modifiers (lumOff, satOff, hueShift, alphaOff) reserved for future implementation
    }
    return {
        colorType: colorType,
        colorValue: colorValue,
        modifiers: modifiers
    };
}
/**
 * Enum for stroke dash array values.
 * Maps to EJ2 predefined dash patterns.
 *
 * @enum {string}
 */
var StrokeDashArrayValue;
(function (StrokeDashArrayValue) {
    /** Continuous line (no dashes) */
    StrokeDashArrayValue["Solid"] = "";
    /** Regular dashes */
    StrokeDashArrayValue["Dash"] = "2";
    /** Dotted line */
    StrokeDashArrayValue["Dot"] = "3";
    /** Dash followed by dot */
    StrokeDashArrayValue["DashDot"] = "4";
    /** Large dashes */
    StrokeDashArrayValue["LargeDash"] = "7";
    /** Large dash + dot */
    StrokeDashArrayValue["LargeDashDot"] = "18";
    /** Large dash + dot + dot */
    StrokeDashArrayValue["LargeDashDotDot"] = "19";
})(StrokeDashArrayValue || (StrokeDashArrayValue = {}));
