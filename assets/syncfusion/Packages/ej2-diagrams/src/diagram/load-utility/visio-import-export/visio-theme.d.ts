import { VisioTextAlignmentModel, VisioTextDecorationModel } from './visio-annotations';
import { VisioConnector, VisioDecoratorModel } from './visio-connectors';
import { ParsingContext } from './visio-import-export';
import { VisioTheme } from './visio-models';
import { ConnectorInput, ConnectorResolvedStyle, ParsedXmlObject, ResolvedAnnotationStyle, VisioNode } from './visio-types';
/**
 * Theme module configuration.
 * @interface ThemeConfig
 */
export interface ThemeConfig {
    /** Enable theme caching */
    enableCache?: boolean;
    /** Default fill color */
    defaultFill?: string;
    /** Default stroke color */
    defaultStroke?: string;
    /** Minimum stroke width in points */
    minStrokeWidth?: number;
    /** Maximum stroke width in points */
    maxStrokeWidth?: number;
}
/**
 * Default stroke color used when no other stroke is specified.
 * Exported for use in other modules.
 *
 * @type {string}
 */
export declare const defaultStroke: string;
/**
 * Font family mapping for theme-specified fonts to web-safe alternatives.
 * Maps Visio/Office font names to CSS-compatible generic font stacks.
 * Used when applying theme fonts to ensure cross-platform compatibility.
 *
 * @type {Object<string, string>}
 * @example
 * fontMapping['Arial Rounded MT Bold'] = 'Arial, sans-serif'
 */
export declare const fontMapping: {
    [key: string]: string;
};
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
export declare function isValidColor(color: string, isAnnotation?: boolean): boolean;
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
export declare function getNodeStyle(node: NodeInput, context: ParsingContext, isGroup: boolean): NodeResolvedStyle;
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
export declare function isActiveThemeApplied(node: VisioNode, context: ParsingContext): ActiveThemeResult;
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
export declare function toZeroBasedIndex(range: number): number;
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
export declare function getConnectorFontType(VisioTheme: VisioTheme, range: number): AccentColorDefinition;
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
export declare function getFontType(VisioTheme: VisioTheme, range: number): FontSchemeEntry;
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
export declare function applyThemeStyles(connector: ConnectorInput | VisioConnector | VisioDecoratorModel, context: ParsingContext): ConnectorResolvedStyle;
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
export declare function getMatrix(matrix: number): number;
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
export declare function getHexColorByIndex(index: number, hexColors: string[] | null | undefined): string;
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
export declare function normalizeRange(range: number): number;
/**
 * Manages global document properties: colors, font
 *
 * This is a singleton-style class that stores various global properties from a Visio document:
 * - document's colors (indexed by number, hex string values)
 * - document's fonts (indexed by ID, font name values)
 *
 * @private
 */
export interface IVisioPropertiesManager {
    initialize(rootElement: ParsedXmlObject): void;
    getColor(index: string | number): string;
    dispose(): void;
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
export declare class VisioPropertiesManager implements IVisioPropertiesManager {
    /**
     * Static default colors palette
     */
    static readonly DEFAULT_COLORS: {
        [key: string]: string;
    };
    private static readonly MAX_CACHE_SIZE;
    /**
     * Map with the document's colors.
     * The key is the index number and the value is the hex representation of the color.
     */
    private colorElementMap;
    /**
     * Map with the document's fonts.
     * The key is the ID and the value is the name of the font.
     */
    private fontElementMap;
    constructor();
    /**
     * Loads the properties of the document from the XML root element.
     * Parses both color and font entries from the Visio document structure.
     *
     * @param {ParsedXmlObject} rootElement The parsed XML element of the Visio document
     * @returns {void}
     *
     * @private
     */
    initialize(rootElement: ParsedXmlObject): void;
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
    getColor(index: string | number): string;
    /**
     * Cleans up resources and clears internal maps.
     * Call this when the manager is no longer needed.
     *
     * @returns {void}
     *
     * @private
     */
    dispose(): void;
}
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
export declare function setAnnotationStyle(node: any, context: ParsingContext): ResolvedAnnotationStyle;
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
export declare function hasOwn(obj: object, prop: string): boolean;
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
export declare function resolveAccentColor(result: ColorInfo, theme: VisioTheme[], baseColor: string): string;
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
export declare function extractColorWithModifiers(solidFill: SolidFillValue | ThemeColorElement): ColorInfo;
/**
 * Input interface for node style extraction.
 * Represents the minimal node data needed for style resolution.
 *
 * @interface NodeInput
 */
interface NodeInput extends VisioNode {
    /** Node styling properties */
    style: NodeStyle;
    /** Theme index (0 = no theme) */
    ThemeIndex: number;
    /** Quick style fill color index */
    QuickFillColor?: number;
    /** Quick style fill matrix */
    QuickFillMatrix?: number;
}
/**
 * Node style properties interface.
 * Represents all styling applied to a shape.
 *
 * @interface NodeStyle
 */
interface NodeStyle {
    /** Fill color (hex or color name) */
    fillColor?: string;
    /** Stroke color (hex or color name) */
    strokeColor?: string;
    /** Stroke dash pattern */
    strokeDashArray?: string;
    /** Stroke width in inches */
    strokeWidth?: number;
    /** Fill opacity (0-1) */
    opacity?: number;
    /** Whether gradient fill is enabled */
    isGradientEnabled?: boolean;
    /** Gradient type (Linear or Radial) */
    gradientType?: GradientType;
    /** Gradient endpoint/center coordinates */
    gradientCoordinates: Partial<GradientCoordinatesLinear & GradientCoordinatesRadial>;
    /** Gradient color stops */
    gradientStops: FillColorElement[];
    /** Fill pattern (0 = no fill/transparent, 1 = solid fill) */
    fillPattern: number;
}
/**
 * Linear gradient coordinates (start and end points).
 *
 * @interface GradientCoordinatesLinear
 */
interface GradientCoordinatesLinear {
    /** Start X (0-1) */
    x1: number;
    /** Start Y (0-1) */
    y1: number;
    /** End X (0-1) */
    x2: number;
    /** End Y (0-1) */
    y2: number;
}
/**
 * Radial gradient coordinates (center, focal point, radius).
 *
 * @interface GradientCoordinatesRadial
 */
interface GradientCoordinatesRadial {
    /** Center X (0-1) */
    cx: number;
    /** Center Y (0-1) */
    cy: number;
    /** Focal point X (0-1) */
    fx: number;
    /** Focal point Y (0-1) */
    fy: number;
    /** Radius (0-1) */
    r: number;
}
/**
 * Gradient type discriminator.
 *
 * @typedef {('Linear' | 'Radial')} GradientType
 */
declare type GradientType = 'Linear' | 'Radial';
/**
 * Gradient color stop definition.
 *
 * @interface GradientStop
 */
interface GradientStop {
    /** Position in gradient (0-100) */
    offset: number;
    /** Hex color at this stop */
    color: string;
    /** Opacity (0-1) */
    opacity?: number;
}
/**
 * Resolved node style output.
 * All values normalized and converted to EJ2 units.
 *
 * @typedef {Object} NodeResolvedStyle
 */
declare type NodeResolvedStyle = {
    /** Fill color (hex) */
    fill: string;
    /** Stroke color (hex) */
    strokeColor: string;
    /** Stroke width (pixels) */
    strokeWidth: number;
    /** Opacity (0-1) */
    opacity: number;
    /** Stroke dash array pattern */
    strokeDashArray?: string;
    /** Gradient definition if applicable */
    gradient?: ResolvedGradientStyle;
};
/**
 * Incoming annotation style properties.
 * Raw styling data before theme application.
 *
 * @interface IncomingAnnotationStyle
 */
export interface IncomingAnnotationStyle {
    /** Text color */
    color?: string;
    /** Font family name */
    fontFamily?: string;
    /** Background fill */
    fill?: string;
    /** Font size */
    fontSize?: number;
    /** Opacity (0-1) */
    opacity?: number;
    /** Bold flag */
    bold?: boolean;
    /** Italic flag */
    italic?: boolean;
    /** Text alignment */
    textAlign?: VisioTextAlignmentModel;
    /** Text decoration (underline, strikethrough) */
    textDecoration?: VisioTextDecorationModel;
    /** No text style flag */
    TEXT_STYLE_NONE: boolean;
}
/**
 * Theme entry in font styles array.
 *
 * @interface ThemeEntry
 */
export interface ThemeEntry {
    /** Font family name */
    fontFamily?: string;
    /** Extensible properties */
    [key: string]: unknown;
}
/**
 * Font scheme entry from theme.
 * Contains font attributes and color.
 *
 * @interface FontSchemeEntry
 */
interface FontSchemeEntry {
    /** Font attributes (style, typeface, etc.) */
    $?: {
        style: string;
        typeface?: string;
        panose?: string;
        pitchFamily?: string;
        charset?: string;
    };
    /** Theme color for this font */
    'vt:color'?: ThemeColorElement;
}
/**
 * Theme color element interface.
 *
 * @interface ThemeColorElement
 */
export interface ThemeColorElement {
    /** Extensible properties */
    [key: string]: unknown;
}
/**
 * Resolved gradient style for rendering.
 *
 * @interface ResolvedGradientStyle
 */
export interface ResolvedGradientStyle {
    /** Gradient color stops */
    gradientStops: GradientStop[];
    /** Gradient enabled flag */
    isGradientEnabled: boolean;
    /** Gradient coordinate endpoints */
    gradientCoordinates: LinearGradientEndpoints;
    /** Gradient type (always Linear for this interface) */
    gradientType: 'Linear';
}
/**
 * Active theme result discriminated union.
 * Either indicates no theme applied or provides complete theme data.
 *
 * @typedef {Object} ActiveThemeResult
 */
export declare type ActiveThemeResult = {
    isThemeApplied: false;
} | {
    isThemeApplied: boolean;
    theme: VisioTheme[];
    currentTheme: VisioTheme;
    range: number;
    fillIdxColor: string;
};
/**
 * Accent color definition from theme.
 *
 * @interface AccentColorDefinition
 */
export interface AccentColorDefinition {
    /** Attributes */
    $: string;
    /** Value object */
    value: SolidFillValue | PatternFillValue | GradientFillValue | ParsedXmlObject;
    /** Element name */
    name: string;
    /** Order metadata */
    order: VisioOrderItem[];
}
/**
 * Visio order item for element ordering.
 *
 * @interface VisioOrderItem
 */
interface VisioOrderItem {
    /** Element name */
    name: string;
    /** Element value with optional ordering */
    value: VisioColorElement & {
        order?: VisioOrderItem[];
    };
}
/**
 * Visio color element in theme.
 *
 * @interface VisioColorElement
 */
interface VisioColorElement {
    /** Element attributes */
    $: {
        val: string;
    };
    /** Tint modifier */
    'a:tint'?: {
        $: {
            val: string;
        };
    };
    /** Shade modifier */
    'a:shade'?: {
        $: {
            val: string;
        };
    };
}
/**
 * Color modifiers that can be applied to scheme colors.
 *
 * @interface ColorModifiers
 */
interface ColorModifiers {
    /** Lighten modifier */
    tint?: number;
    /** Darken modifier */
    shade?: number;
    /** Luminance multiply */
    lumMod?: number;
    /** Luminance offset */
    lumOff?: number;
    /** Saturation multiply */
    satMod?: number;
    /** Saturation offset */
    satOff?: number;
    /** Hue shift */
    hueShift?: number;
    /** Alpha/opacity value */
    alpha?: number;
    /** Alpha multiply */
    alphaMod?: number;
    /** Alpha offset */
    alphaOff?: number;
}
/**
 * Fill color element from theme.
 * Can be solid, pattern, or gradient fill.
 *
 * @interface FillColorElement
 */
interface FillColorElement {
    /** Element attributes (position) */
    $: GradientStopAttributes;
    /** Element name */
    name: 'a:solidFill' | 'a:pattFill' | 'a:gradFill';
    /** Element value (color or gradient data) */
    value: SolidFillValue | PatternFillValue | GradientFillValue;
    /** Order metadata */
    order?: OrderEntry[];
}
/**
 * Solid fill value object.
 * Contains color definition (srgb, scheme, system, or preset).
 *
 * @interface SolidFillValue
 */
interface SolidFillValue {
    /** Recursive value property */
    value: SolidFillValue;
    /** sRGB color */
    'a:srgbClr'?: SrgbColor;
    /** Scheme/theme color */
    'a:schemeClr'?: SchemeColor;
    /** System color */
    'a:sysClr'?: SystemColor;
    /** Preset color */
    'a:prstClr'?: SystemColor;
}
/**
 * Pattern fill value object.
 * Contains foreground and background colors.
 *
 * @interface PatternFillValue
 */
interface PatternFillValue {
    /** Foreground color */
    'a:fgClr'?: SolidFillValue;
    /** Background color */
    'a:bgClr'?: SolidFillValue;
}
/**
 * Gradient fill value object.
 * Contains stops and linear gradient angle.
 *
 * @interface GradientFillValue
 */
interface GradientFillValue {
    /** Gradient stop list */
    'a:gsLst': GradientStopList;
    /** Linear gradient angle element */
    'a:lin': {
        $: {
            ang: string;
            flip?: string;
        };
    };
}
/**
 * Gradient stop list container.
 *
 * @interface GradientStopList
 */
interface GradientStopList {
    /** Array of gradient stop elements */
    'a:gs': FillColorElement[];
}
/**
 * Gradient stop attributes.
 *
 * @interface GradientStopAttributes
 */
interface GradientStopAttributes {
    /** Position in 1/1000ths of percent ("0", "24000", "54000", etc.) */
    pos: string;
}
/**
 * Scheme/theme color with optional modifiers.
 *
 * @interface SchemeColor
 */
interface SchemeColor {
    /** Color attributes (color name like 'accent1') */
    $: SchemeColorAttributes;
    /** Tint (lighten) modifier */
    'a:tint'?: ColorModifier;
    /** Shade (darken) modifier */
    'a:shade'?: ColorModifier;
    /** Luminance multiply modifier */
    'a:lumMod'?: ColorModifier;
    /** Luminance offset modifier */
    'a:lumOff'?: ColorModifier;
    /** Saturation multiply modifier */
    'a:satMod'?: ColorModifier;
    /** Saturation offset modifier */
    'a:satOff'?: ColorModifier;
    /** Hue multiply modifier */
    'a:hueMod'?: ColorModifier;
    /** Hue offset modifier */
    'a:hueOff'?: ColorModifier;
    /** Alpha/opacity modifier */
    'a:alpha'?: ColorModifier;
    /** Alpha multiply modifier */
    'a:alphaMod'?: ColorModifier;
    /** Alpha offset modifier */
    'a:alphaOff'?: ColorModifier;
    /** Hue shift modifier */
    'a:hueShift'?: ColorModifier;
    /** Order metadata */
    order?: OrderEntry[];
}
/**
 * Scheme color attributes.
 *
 * @interface SchemeColorAttributes
 */
interface SchemeColorAttributes {
    /** Color role name like 'phClr', 'lt1', 'dk1', 'accent1'-'accent6' */
    val: string;
}
/**
 * sRGB color definition from OOXML.
 *
 * @interface SrgbColor
 */
export interface SrgbColor {
    /** Hex color value */
    $: {
        val: string;
    };
    /** Optional alpha modifier */
    'a:alpha'?: ColorModifier;
    /** Order metadata */
    order?: OrderEntry[];
}
/**
 * System or preset color definition.
 *
 * @interface SystemColor
 */
interface SystemColor {
    /** System/preset color name */
    $: {
        val: string;
    };
    /** Order metadata */
    order?: OrderEntry[];
}
/**
 * Color modifier element (tint, shade, saturation, etc.).
 *
 * @interface ColorModifier
 */
interface ColorModifier {
    /** Modifier value (0-100000) */
    $: {
        val: string;
    };
}
/**
 * Order entry for XML element sequencing metadata.
 *
 * @interface OrderEntry
 */
interface OrderEntry {
    /** Element name */
    name: string;
    /** Element value */
    value: SchemeColor | ColorModifier | ParsedXmlObject;
}
/**
 * Complete color information with type, value, and modifiers.
 *
 * @interface ColorInfo
 */
export interface ColorInfo {
    /** Color type (srgb, scheme, system, preset) */
    colorType: string;
    /** Color value (hex or color name) */
    colorValue: string;
    /** Modifiers (tint, shade, etc.) */
    modifiers: ColorModifiers;
}
/**
 * Linear gradient endpoint coordinates.
 *
 * @interface LinearGradientEndpoints
 */
interface LinearGradientEndpoints {
    /** Start X (0-1) */
    x1: number;
    /** Start Y (0-1) */
    y1: number;
    /** End X (0-1) */
    x2: number;
    /** End Y (0-1) */
    y2: number;
}
/**
 * Extension list type alias.
 *
 * @typedef {ThemeExtension[]} ExtLst
 */
export declare type ExtLst = ThemeExtension[];
/**
 * Theme extension element.
 *
 * @interface ThemeExtension
 */
interface ThemeExtension {
    /** Extension attributes */
    $: {
        uri: string;
    };
    /** Scheme ID extension */
    'vt:schemeID'?: SchemeIDStrict;
    /** Background extension */
    'vt:bkgnd'?: BackgroundStrict;
    /** Variation color scheme list */
    'vt:variationClrSchemeLst'?: VariationColorSchemeListStrict;
}
/**
 * Scheme ID strict definition.
 *
 * @interface SchemeIDStrict
 */
interface SchemeIDStrict {
    $: {
        'xmlns:vt': string;
        schemeEnum: string;
        schemeGUID: string;
    };
}
/**
 * Background element definition.
 *
 * @interface BackgroundStrict
 */
interface BackgroundStrict {
    $: {
        'xmlns:vt': string;
    };
    'a:srgbClr'?: SrgbClrAttr;
}
/**
 * Variation color scheme list definition.
 *
 * @interface VariationColorSchemeListStrict
 */
interface VariationColorSchemeListStrict {
    $: {
        'xmlns:vt': string;
    };
    'vt:variationClrScheme': VariationColorSchemeStrict[];
}
/**
 * Variation color scheme definition.
 * Contains 8 variation colors (varColor0-varColor7).
 *
 * @interface VariationColorSchemeStrict
 */
interface VariationColorSchemeStrict {
    /** Monotone flag */
    $?: {
        monotone: string;
    };
    /** Variation color 0 */
    'vt:varColor0': VariationColors;
    /** Variation color 1 */
    'vt:varColor1': VariationColors;
    /** Variation color 2 */
    'vt:varColor2': VariationColors;
    /** Variation color 3 */
    'vt:varColor3': VariationColors;
    /** Variation color 4 */
    'vt:varColor4': VariationColors;
    /** Variation color 5 */
    'vt:varColor5': VariationColors;
    /** Variation color 6 */
    'vt:varColor6': VariationColors;
    /** Variation color 7 */
    'vt:varColor7': VariationColors;
}
/**
 * Variation color with sRGB value.
 *
 * @interface VariationColors
 */
export interface VariationColors {
    /** sRGB color definition */
    'a:srgbClr': SrgbClrAttr;
}
interface SrgbClrAttr {
    val: string;
}
/**
 * Attributes inside the `vt:lineEx.$` node.
 * Represents Visio extended connector line-style decorations.
 *
 * @interface LineExAttrs
 */
interface LineExAttrs {
    /** Rounding flag, e.g. "0" or "1" */
    rndg?: string;
    /** Start decorator code as string */
    start?: string;
    /** Start decorator size as string */
    startSize?: string;
    /** End decorator code as string */
    end?: string;
    /** End decorator size as string */
    endSize?: string;
    /** Pattern id as string */
    pattern?: string;
    /** Allow other unexpected attributes */
    [key: string]: string | undefined;
}
/**
 * Wrapper for the `vt:lineEx` element inside a connector style entry.
 *
 * @interface VtLineEx
 */
interface VtLineEx {
    /** Raw attribute map from the `vt:lineEx.$` XML structure */
    $: LineExAttrs;
}
/**
 * Represents one extended connector line-style entry
 * inside `connLineStylesExt`.
 *
 * @interface ConnLineStyleEntry
 */
export interface ConnLineStyleEntry {
    /** Node/element name — typically "vt:lineStyle" or similar */
    name: string;
    /**
     * Object containing nested style nodes.
     *
     * Expected structure:
     * - value['vt:lineEx'] → arrowhead, rounding, line pattern attributes.
     * - Additional Visio XML nodes may also be present.
     */
    value: {
        /** Optional extended line-style data from Visio */
        'vt:lineEx'?: VtLineEx;
    };
}
export {};
