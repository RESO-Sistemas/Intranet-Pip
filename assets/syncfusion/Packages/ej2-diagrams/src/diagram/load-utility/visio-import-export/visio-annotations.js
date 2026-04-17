var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { mapCellValues, toCamelCase } from './visio-core';
import { isValidColor } from './visio-theme';
/**
 * Retrieves a specific Visio Section from a shape by name.
 * Useful for accessing rich text-related sections like 'Character' or 'Paragraph'.
 *
 * @param {VisioShapeNode} shape - The Visio shape object that may contain Section elements
 * @param {string} name - The Section name to find (e.g., 'Character', 'Paragraph')
 * @returns {VisioSection | null} The matched Section object if found; otherwise null
 */
function getSection(shape, name) {
    if (!shape || !shape.Section) {
        return null;
    }
    var sections = Array.isArray(shape.Section) ? shape.Section : [shape.Section];
    return sections.find(function (section) { return section && section.$ && section.$.N === name; }) || null;
}
/**
 * Ensures a value is returned as an array.
 * If the value is already an array, it is returned unchanged; if non-null, it is wrapped in an array; otherwise returns an empty array.
 *
 * @template T
 * @param {any} v - The input value that may be an array or single item
 * @returns {T[]} An array wrapping the input, or empty array when input is null/undefined
 */
function ensureArray(v) { return Array.isArray(v) ? v : (v != null ? [v] : []); }
/**
 * Determines whether a shape's text has mixed character formatting across Character rows.
 * Mixed formatting implies the presence of multiple style signatures (font, size, style, color)
 * and multiple word tokens or multiple paragraph rows�indicating rich text that a single EJ2
 * annotation style cannot faithfully reproduce.
 *
 * @param {VisioShapeNode} shape - Visio shape object with potential 'Character' and 'Paragraph' sections
 * @returns {boolean} True if mixed character formatting is detected; otherwise false
 */
function hasMixedCharacterFormatting(shape) {
    var characterSection = getSection(shape, 'Character');
    if (!characterSection || !characterSection.Row) {
        return false;
    }
    // Sets to collect distinct Font/Size/Color values (size kept as string per requirement)
    var distinctFonts = new Set();
    var distinctSizes = new Set();
    var distinctColors = new Set();
    // Unique style signatures across character rows
    var characterRows = ensureArray(characterSection.Row);
    for (var _i = 0, characterRows_1 = characterRows; _i < characterRows_1.length; _i++) {
        var row = characterRows_1[_i];
        var cells = ensureArray(row.Cell);
        var isFontValueFound = void 0;
        var isSizeValueFound = void 0;
        var isColorValueFound = void 0;
        for (var _a = 0, cells_1 = cells; _a < cells_1.length; _a++) {
            var cell = cells_1[_a];
            if (!cell || !cell.$ || !cell.$.N) {
                continue;
            }
            var cellName = cell.$.N;
            var cellValue = cell.$.V;
            if (cellName === 'Font' && cellValue) {
                distinctFonts.add(cellValue);
                isFontValueFound = true;
            }
            if (cellName === 'Size' && cellValue) {
                var size = Number(cellValue);
                // Normalize numeric precision to avoid tiny float differences
                distinctSizes.add(String(Math.round(size * 1000) / 1000));
                isSizeValueFound = true;
            }
            if (cellName === 'Color' && cellValue) {
                distinctColors.add(cellValue);
                isColorValueFound = true;
            }
            // Stop early when all three values discovered for this row
            if (isFontValueFound && isSizeValueFound && isColorValueFound) {
                break;
            }
        }
    }
    // Only consider mixed when font OR size OR color actually vary across rows
    var mixedStyleDetected = (distinctFonts.size > 1) || (distinctSizes.size > 1) || (distinctColors.size > 1);
    var raw = shape && shape.Text && shape.Text.value ? String(shape.Text.value) : '';
    // Remove tags but keep whitespace to assess words
    var plain = raw.replace(/<cp[^>]*\/>/gi, ' ').replace(/<pp[^>]*\/>/gi, ' ').replace(/\s+/g, ' ').trim();
    var hasMultiWord = /\S\s+\S/.test(plain);
    // Paragraph info � if there are many paragraphs, treat as multi-part text even if single token
    var paraSec = getSection(shape, 'Paragraph');
    var paraRows = paraSec && paraSec.Row ? ensureArray(paraSec.Row).length : 0;
    // Mixed only mixed style detected AND (multiple words OR multiple paragraphs)
    return mixedStyleDetected && (hasMultiWord || paraRows > 1);
}
/**
 * Normalizes Visio rich-text content for EJ2 by converting internal paragraph markers
 * into actual line breaks. If the input contains multiple Paragraph rows but no newline
 * characters, it heuristically inserts line breaks before list/bullet patterns.
 *
 * @param {any} shape - Visio shape object used to inspect the 'Paragraph' section
 * @param {string} content - Raw text content possibly containing Visio paragraph markers
 * @returns {string} Normalized text with line breaks suitable for EJ2 annotations
 */
function normalizeParagraphBreaks(shape, content) {
    if (!content) {
        return content;
    }
    // Replace explicit paragraph markers if the raw text still contains them
    var text = content.replace(/<cp[^>]*\/>/gi, '')
        .replace(/<pp[^>]*\/>/gi, '\n');
    // If there are no newlines but Paragraph section indicates multiple paragraphs,
    // heuristically split after period-number bullets and bullet glyphs.
    if (!/\n/.test(text)) {
        var paraSec = getSection(shape, 'Paragraph');
        var paraRows = paraSec && paraSec.Row ? ensureArray(paraSec.Row) : [];
        if (paraRows.length > 1) {
            // Insert newline before numbered list items (2. , 3. , etc.) that are not at start
            text = text.replace(/\s+(?=\d+\.)/g, '\n');
            // Insert newline before bullet glyphs � or hyphen bullets
            text = text.replace(/\s+(?=[�-]\s)/g, '\n');
        }
    }
    return text;
}
/**
 * Applies a conservative default text style when mixed rich-text runs are detected
 * and a single EJ2 annotation style cannot represent the variation.
 * Resets bold/italic, sets a readable default font family and size, and clears decorations.
 *
 * @param {VisioTextStyleModel} style - The current text style model to adjust
 * @returns {VisioTextStyleModel} The updated style model with safe default settings applied
 */
function applyDefaultStyleForMixedRuns(style) {
    if (!style) {
        return style;
    }
    style.bold = false;
    style.italic = false;
    // Default family
    style.fontFamily = 'Segoe UI';
    // Slightly increased default font size for readability
    style.fontSize = 16; // pixels
    // Remove decorations
    if (style.textDecoration) {
        style.textDecoration.underline = false;
        style.textDecoration.strikethrough = false;
    }
    return style;
}
/**
 * Represents margin properties for Visio shapes.
 * Defines spacing on all four sides (left, right, top, bottom).
 */
var VisioMarginModel = /** @class */ (function () {
    function VisioMarginModel() {
        /** Margin on the left side */
        this.left = 0;
        /** Margin on the right side */
        this.right = 0;
        /** Margin on the top side */
        this.top = 0;
        /** Margin on the bottom side */
        this.bottom = 0;
    }
    /**
     * Creates a VisioMarginModel instance from a Visio shape object.
     * Extracts margin values from the shape's Cell elements.
     * @param {any} shape - The Visio shape object containing Cell elements with margin data
     * @returns {VisioMarginModel} A new VisioMarginModel with extracted margin values, or default values if shape is invalid
     */
    VisioMarginModel.fromJs = function (shape) {
        var margin = new VisioMarginModel();
        // Validate shape and its properties
        if (!shape || !shape.$) {
            return margin;
        }
        /**
         * Helper function to retrieve a cell value by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value, or undefined if not found
         */
        var getCell = function (name) {
            // Ensure shape.Cell is always an array
            var cells = ensureArray(shape.Cell);
            var cell = cells.find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        // Extract margin values from cells and convert to numbers
        margin.left = Number(getCell('LeftMargin')) || 0;
        margin.right = Number(getCell('RightMargin')) || 0;
        margin.top = Number(getCell('TopMargin')) || 0;
        margin.bottom = Number(getCell('BottomMargin')) || 0;
        return margin;
    };
    return VisioMarginModel;
}());
export { VisioMarginModel };
/**
 * Represents text decoration properties for Visio text elements.
 * Handles underline and strikethrough styling.
 */
var VisioTextDecorationModel = /** @class */ (function () {
    function VisioTextDecorationModel() {
        /** Flag indicating if text is underlined */
        this.underline = false;
        /** Flag indicating if text has strikethrough */
        this.strikethrough = false;
    }
    /**
     * Creates a VisioTextDecorationModel instance from a Visio shape object.
     * Extracts text decoration properties from shape cells using bitwise operations on the Style cell.
     * @param {any} shape - The Visio shape object containing Section elements with decoration data
     * @returns {VisioTextDecorationModel} A new VisioTextDecorationModel with extracted decoration values
     */
    VisioTextDecorationModel.fromJs = function (shape) {
        var style = new VisioTextDecorationModel();
        var allCells = [];
        // Validate shape
        if (!shape || !shape.$) {
            return style;
        }
        // Normalize Section to always be an array
        var sections = Array.isArray(shape.Section) ? shape.Section : [shape.Section];
        // Iterate through all sections and rows to collect cells
        for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
            var section = sections_1[_i];
            var rows = Array.isArray(section.Row) ? section.Row : [section.Row];
            for (var _a = 0, rows_1 = rows; _a < rows_1.length; _a++) {
                var row = rows_1[_a];
                // Skip invalid rows
                if (!row || typeof row !== 'object') {
                    continue;
                }
                var cells = Array.isArray(row.Cell) ? row.Cell : [row.Cell];
                allCells.push.apply(allCells, cells);
            }
        }
        /**
         * Helper function to find a cell by name across all collected cells
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value, or undefined if not found
         */
        var getCell = function (name) {
            var cell = allCells.find(function (c) { return c && c.$ && c.$.N === name; });
            return (cell && cell.$ && cell.$.V);
        };
        // Extract and parse style code (bitwise flags for text styling)
        var styleCode = parseInt(getCell('Style'), 10);
        // Check strikethrough flag (1 = strikethrough)
        var strikethrough = Number(getCell('Strikethru'));
        if (strikethrough === 1) {
            style.strikethrough = true;
        }
        // Use bitwise AND operation to check if underline bit (4) is set
        if ((styleCode)) {
            style.underline = (styleCode & 4) !== 0;
        }
        return style;
    };
    return VisioTextDecorationModel;
}());
export { VisioTextDecorationModel };
/**
 * Represents text alignment properties for Visio text elements.
 * Handles horizontal alignment (left, center, right, justify).
 */
var VisioTextAlignmentModel = /** @class */ (function () {
    function VisioTextAlignmentModel() {
        /** Flag indicating left alignment */
        this.left = false;
        /** Flag indicating right alignment */
        this.right = false;
        /** Flag indicating center alignment (default) */
        this.center = true;
        /** Flag indicating justified alignment */
        this.justify = false;
    }
    /**
     * Creates a VisioTextAlignmentModel instance from a Visio shape object.
     * Extracts horizontal alignment from the HorzAlign cell value.
     * @param {any} shape - The Visio shape object containing alignment data
     * @returns {VisioTextAlignmentModel} A new VisioTextAlignmentModel with extracted alignment values
     */
    VisioTextAlignmentModel.fromJs = function (shape) {
        var alignment = new VisioTextAlignmentModel();
        var allCells = [];
        // Validate shape
        if (!shape || !shape.$) {
            return alignment;
        }
        // Normalize Section to always be an array
        var sections = Array.isArray(shape.Section) ? shape.Section : [shape.Section];
        // Collect all cells from sections and rows
        for (var _i = 0, sections_2 = sections; _i < sections_2.length; _i++) {
            var section = sections_2[_i];
            var rows = Array.isArray(section.Row) ? section.Row : [section.Row];
            for (var _a = 0, rows_2 = rows; _a < rows_2.length; _a++) {
                var row = rows_2[_a];
                if (!row || typeof row !== 'object') {
                    continue;
                }
                var cells = Array.isArray(row.Cell) ? row.Cell : [row.Cell];
                allCells.push.apply(allCells, cells);
            }
        }
        /**
         * Helper function to find a cell by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value, or undefined if not found
         */
        var getCell = function (name) {
            var cell = allCells.find(function (c) { return c && c.$ && c.$.N === name; });
            return (cell && cell.$ && cell.$.V);
        };
        // Get horizontal alignment value from HorzAlign cell
        var alignValue = getCell('HorzAlign');
        // Map alignment codes to boolean flags
        // 0 = left, 2 = right, 3 = justify, default = center
        switch (alignValue) {
            case '0':
                alignment.left = true;
                break;
            case '2':
                alignment.right = true;
                break;
            case '3':
                alignment.justify = true;
                break;
            default:
                alignment.center = true;
        }
        return alignment;
    };
    return VisioTextAlignmentModel;
}());
export { VisioTextAlignmentModel };
/**
 * Represents comprehensive text styling properties for Visio text elements.
 * Includes color, font, size, bold, italic, decoration, and alignment.
 */
var VisioTextStyleModel = /** @class */ (function () {
    function VisioTextStyleModel() {
        /** Font family name (default: 'Calibri') */
        this.fontFamily = 'Calibri';
        /** Flag indicating if text is italic */
        this.italic = false;
        /** Flag indicating if text is bold */
        this.bold = false;
        /** Flag indicating no text styling applied */
        this.TEXT_STYLE_NONE = true;
        /** Text opacity (0-1 range) */
        this.opacity = 1;
    }
    /**
     * Creates a VisioTextStyleModel instance from a Visio shape object.
     * Extracts comprehensive text styling information including font, size, color, and decorations.
     * @param {any} shape - The Visio shape object containing text style data
     * @param {boolean} isConnector - To Check whether the shape is connector or not
     * @returns {VisioTextStyleModel} A new VisioTextStyleModel with all extracted style properties
     */
    VisioTextStyleModel.fromJs = function (shape, isConnector) {
        var style = new VisioTextStyleModel();
        var allCells = [];
        // Validate shape has Section property
        if (!shape || !shape.Section) {
            return style;
        }
        // Normalize Section to always be an array
        var sections = Array.isArray(shape.Section) ? shape.Section : [shape.Section];
        // Collect all cells from sections and rows
        for (var _i = 0, sections_3 = sections; _i < sections_3.length; _i++) {
            var section = sections_3[_i];
            var rows = Array.isArray(section.Row) ? section.Row : [section.Row];
            for (var _a = 0, rows_3 = rows; _a < rows_3.length; _a++) {
                var row = rows_3[_a];
                if (!row || typeof row !== 'object') {
                    continue;
                }
                var cells = Array.isArray(row.Cell) ? row.Cell : [row.Cell];
                allCells.push.apply(allCells, cells);
            }
        }
        /**
         * Helper function to find a cell by name in Section cells
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            var cell = allCells.find(function (c) { return c && c.$ && c.$.N === name; });
            return (cell && cell.$ && cell.$.V);
        };
        /**
         * Helper function to find a cell by name in direct Cell array
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCells = function (name) {
            // Ensure shape.Cell is always an array
            var cells = ensureArray(shape.Cell);
            var cell = cells.find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        /**
         * Helper function to get cell unit property
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell unit value
         */
        var getCellUnit = function (name) {
            var cell = allCells.find(function (c) { return c && c.$ && c.$.N === name; });
            return cell && cell.$ && cell.$.U;
        };
        // Extract color value
        style.color = getCell('Color') != null ? getCell('Color') : undefined;
        // Extract and set font family
        style.fontFamily = getCell('Font') ? getCell('Font') : 'Calibri';
        // Extract and convert font size (multiply by 72 * 1.33 to get point size)
        var fontSizeValue = Number(getCell('Size'));
        if (fontSizeValue) {
            style.fontSize = fontSizeValue * 72 * 1.33;
        }
        // Extract style code and use bitwise operations to determine bold and italic
        // Bit 0 (1) = bold, Bit 1 (2) = italic
        var styleCode = parseInt(getCell('Style'), 10);
        if (styleCode > -1) {
            style.bold = (styleCode & 1) !== 0;
            style.italic = (styleCode & 2) !== 0;
            style.TEXT_STYLE_NONE = false;
        }
        // Extract opacity/transparency
        style.opacity = Number(getCell('ColorTrans')) || 1;
        // Extract text alignment properties
        style.textAlign = VisioTextAlignmentModel.fromJs(shape);
        // Extract background color
        var textBkgnd = getCells('TextBkgnd');
        var fill = textBkgnd !== undefined && textBkgnd !== null && textBkgnd !== ''
            ? (textBkgnd === '0' ? 'transparent' : textBkgnd)
            : (isConnector ? 'white' : 'transparent');
        style.fill = isValidColor(fill, true) ? fill : 'transparent';
        // Extract text decoration properties
        style.textDecoration = VisioTextDecorationModel.fromJs(shape);
        return style;
    };
    return VisioTextStyleModel;
}());
export { VisioTextStyleModel };
/**
 * Represents hyperlink properties for Visio shapes.
 * Stores link address, description, and target window preferences.
 */
var VisioHyperlinkModel = /** @class */ (function () {
    function VisioHyperlinkModel() {
        /** The hyperlink URL/address */
        this.link = '';
        /** The hyperlink display content/description */
        this.content = '';
        /** Flag indicating if link opens in a new window */
        this.newWindow = false;
    }
    /**
     * Creates a VisioHyperlinkModel instance from a Visio shape object.
     * Extracts hyperlink data from the Hyperlink section of the shape.
     * @param {any} shape - The Visio shape object containing hyperlink data
     * @returns {VisioHyperlinkModel} A new VisioHyperlinkModel with extracted hyperlink properties
     */
    VisioHyperlinkModel.fromJs = function (shape) {
        // Validate shape and Section property
        if (!shape || !shape.Section) {
            return new VisioHyperlinkModel();
        }
        // Find the Hyperlink section (may be array or single object)
        var hyperlinkSection = null;
        if (Array.isArray(shape.Section)) {
            hyperlinkSection = shape.Section.find(function (sec) { return sec.$.N === 'Hyperlink'; });
        }
        else if (shape.Section) {
            if (shape.Section.$.N === 'Hyperlink') {
                hyperlinkSection = shape.Section;
            }
        }
        // Validate hyperlink section and rows
        if (!hyperlinkSection || !hyperlinkSection.Row) {
            return new VisioHyperlinkModel();
        }
        // Normalize rows to always be an array
        var rows = Array.isArray(hyperlinkSection.Row) ? hyperlinkSection.Row : [hyperlinkSection.Row];
        var row = rows[0]; // Just get the first row
        /**
         * Helper function to get cell value by name from the hyperlink row
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            var cell = (row.Cell || []).find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        // Create and populate hyperlink model
        var hyperlink = new VisioHyperlinkModel();
        hyperlink.content = getCell('Description');
        hyperlink.link = getCell('Address');
        // Extract NewWindow flag (1 = true)
        var newWindow = Number(getCell('NewWindow'));
        if (newWindow === 1) {
            hyperlink.newWindow = true;
        }
        return hyperlink;
    };
    return VisioHyperlinkModel;
}());
export { VisioHyperlinkModel };
/**
 * Utility class for binding Visio text properties to Syncfusion text binding format.
 * Handles text positioning calculations and coordinate conversions.
 */
var VisioToSyncfusionTextBinder = /** @class */ (function () {
    function VisioToSyncfusionTextBinder() {
    }
    /**
     * Binds Visio text transform properties to Syncfusion text binding format.
     * Calculates the offset position of text within a shape using Visio pin and margin data.
     * @param {VisioShapeTransform} shapeTransform - The Visio shape transform data (position, size)
     * @param {VisioTextTransform} textTransform - The Visio text transform data (pins, margins, dimensions)
     * @returns {SyncfusionTextBinding} A Syncfusion text binding with calculated offset (0-1 normalized range)
     */
    VisioToSyncfusionTextBinder.bindVisioTextToSyncfusion = function (shapeTransform, textTransform) {
        // Step 1: Calculate base position offset from TxtPin coordinates
        var visioTextCenter = this.calculateVisioTextCenter(shapeTransform, textTransform);
        var positionOffset = this.convertToSyncfusionOffset(visioTextCenter, shapeTransform);
        var combinedOffset = {
            x: positionOffset.x,
            y: positionOffset.y
        };
        if (shapeTransform.verticalAlignment === 'Bottom') {
            combinedOffset.y += 0.2;
        }
        else if (shapeTransform.verticalAlignment === 'Top') {
            combinedOffset.y -= 0.2;
        }
        // Return binding with rounded offset values to 2 decimal places
        return {
            offset: {
                x: Math.round(combinedOffset.x * 100) / 100,
                y: Math.round(combinedOffset.y * 100) / 100
            }
        };
    };
    /**
     * Calculates the absolute center position of text within a Visio shape.
     * Takes into account text pin position, margins, and dimensions.
     * @param {VisioShapeTransform} shapeTransform - The shape transform data (pinX, pinY, width, height)
     * @param {VisioTextTransform} textTransform - The text transform data (pins, margins, dimensions)
     * @returns {{ x: number, y: number }} The absolute center position of the text
     */
    VisioToSyncfusionTextBinder.calculateVisioTextCenter = function (shapeTransform, textTransform) {
        // Calculate shape's bottom-left corner position
        var shapeLeft = shapeTransform.pinX - shapeTransform.width / 2;
        var shapeBottom = shapeTransform.pinY - shapeTransform.height / 2;
        // Calculate absolute text pin position including margin offsets
        var absoluteTxtPinX = shapeLeft + textTransform.txtPinX + (textTransform.txtMargin.left - textTransform.txtMargin.right);
        var absoluteTxtPinY = shapeBottom + textTransform.txtPinY +
            (textTransform.txtMargin.bottom - textTransform.txtMargin.top);
        // Calculate offset from text pin to text center
        var textCenterOffsetX = (textTransform.txtWidth / 2) - textTransform.txtLocPinX;
        var textCenterOffsetY = (textTransform.txtHeight / 2) - textTransform.txtLocPinY;
        // Apply rotation transformations to offset (placeholder for future rotation support)
        var rotatedOffsetX = textCenterOffsetX;
        var rotatedOffsetY = textCenterOffsetY;
        // Calculate final text center position
        var visioTextCenterX = absoluteTxtPinX + rotatedOffsetX;
        var visioTextCenterY = absoluteTxtPinY + rotatedOffsetY;
        return {
            x: visioTextCenterX,
            y: visioTextCenterY
        };
    };
    /**
     * Converts Visio absolute text center coordinates to Syncfusion normalized offset (0-1 range).
     * Normalizes position relative to shape bounds.
     * @param {{ x: number, y: number }} visioTextCenter - The absolute text center position
     * @param {VisioShapeTransform} shapeTransform - The shape transform data for normalization
     * @returns {{ x: number, y: number }} Normalized offset in 0-1 range where 0.5 is center
     */
    VisioToSyncfusionTextBinder.convertToSyncfusionOffset = function (visioTextCenter, shapeTransform) {
        // Get shape center coordinates
        var shapeCenterX = shapeTransform.pinX;
        var shapeCenterY = shapeTransform.pinY;
        // Normalize text position relative to shape
        // X offset: 0.5 + (text position - shape center) / shape width
        var offsetX = 0.5 + (visioTextCenter.x - shapeCenterX) / shapeTransform.width;
        // Y offset: 0.5 - (text position - shape center) / shape height
        // Note: Y is inverted (Visio Y increases upward, Syncfusion increases downward)
        var offsetY = 0.5 - (visioTextCenter.y - shapeCenterY) / shapeTransform.height;
        return {
            x: offsetX,
            y: offsetY
        };
    };
    return VisioToSyncfusionTextBinder;
}());
export { VisioToSyncfusionTextBinder };
/**
 * Represents a text annotation (label) for Visio shapes and connectors.
 * Contains text content, styling, positioning, and visibility information.
 */
var VisioAnnotation = /** @class */ (function () {
    function VisioAnnotation() {
        /** Text content of the annotation */
        this.content = '';
        /** Rotation angle in degrees */
        this.rotateAngle = 0;
        /** Flag indicating if annotation is visible */
        this.visible = true;
        /** Vertical alignment of text (Top, Center, Bottom) */
        this.verticalAlignment = 'Center';
        /** Horizontal alignment of text (Left, Center, Right) */
        this.horizontalAlignment = 'Center';
        /** Flag indicating if text angle should follow connector segment angle */
        this.segmentAngle = false;
    }
    return VisioAnnotation;
}());
export { VisioAnnotation };
/**
 * Determines shape-specific text transform properties based on shape type.
 * Different shapes require different text positioning to maintain proper alignment.
 * @function applyTextTransform
 * @param {string} shapeName - The name/type of the shape (rectangle, ellipse, etc.)
 * @param {number} shapeWidth - The width of the shape
 * @param {number} shapeHeight - The height of the shape
 * @returns {{
 *   txtWidth: number,
 *   txtHeight: number,
 *   txtPinX: number,
 *   txtPinY: number,
 *   txtLocPinX: number,
 *   txtLocPinY: number
 * }} Text transform properties customized for the shape type
 */
function applyTextTransform(shapeName, shapeWidth, shapeHeight) {
    // Normalize shape name for comparison
    var safeName = (shapeName && shapeName.trim().length) ? shapeName : 'shape';
    // Return shape-specific text positioning multipliers
    switch (safeName.toLowerCase()) {
        case 'rectangle':
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'ellipse':
            // Ellipse uses 87.5% of shape dimensions for text
            return {
                txtWidth: shapeWidth * 0.875, txtHeight: shapeHeight * 0.875, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'righttriangle':
            // Right triangle text positioned in lower-left area
            return {
                txtWidth: shapeWidth * 0.5, txtHeight: shapeHeight * 0.5, txtPinX: shapeWidth * 0.25,
                txtPinY: shapeHeight * 0.25, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'triangle':
            // Triangle text positioned in lower-center area
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 0.6667, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.3333, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'pentagon':
            // Pentagon with adjusted vertical pin position
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.4472, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.4472
            };
        case 'heptagon':
            // Heptagon with adjusted vertical pin position
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.474, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.474
            };
        case 'octagon':
        case 'polygon':
        case 'hexagon':
            // Regular polygons with centered text
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'trapezoid':
            // Trapezoid with centered text
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'decagon':
            // Decagon with centered text
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'parallelogram':
            // Parallelogram with centered text
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'cylinder':
            // Cylinder with centered text
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        case 'diamond':
            // Diamond with centered text
            return {
                txtWidth: shapeWidth * 1, txtHeight: shapeHeight * 1, txtPinX: shapeWidth * 0.5,
                txtPinY: shapeHeight * 0.5, txtLocPinX: shapeWidth * 0.5, txtLocPinY: shapeHeight * 0.5
            };
        default:
            // Default: use full shape dimensions with center positioning
            return {
                txtWidth: shapeWidth, txtHeight: shapeHeight, txtPinX: shapeWidth / 2,
                txtPinY: shapeHeight / 2, txtLocPinX: shapeWidth / 2, txtLocPinY: shapeHeight / 2
            };
    }
}
/**
 * Represents a text annotation for Visio connectors (lines, arrows).
 * Extends VisioAnnotation with connector-specific text positioning properties.
 */
var VisioConnectorAnnotation = /** @class */ (function (_super) {
    __extends(VisioConnectorAnnotation, _super);
    function VisioConnectorAnnotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a VisioConnectorAnnotation instance from a Visio connector shape object.
     * Extracts all text and positioning properties specific to connectors.
     * @param {any} shape - The Visio connector shape object
     * @param {any} defaultData - Default text transform data for fallback values
     * @returns {VisioConnectorAnnotation} A new VisioConnectorAnnotation with extracted properties
     */
    VisioConnectorAnnotation.fromJs = function (shape, defaultData) {
        var annotation = new VisioConnectorAnnotation();
        // Validate shape properties
        if (!shape || !shape.$ || !shape.Cell) {
            return annotation;
        }
        /**
         * Helper function to get cell value by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            // Ensure shape.Cell is always an array
            var cells = ensureArray(shape.Cell);
            var cell = cells.find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        // Extract text content
        annotation.content = (shape.Text && shape.Text.value) ? shape.Text.value : '';
        // Extract and convert text rotation angle from radians to degrees
        var txtAngle = parseFloat(getCell('TxtAngle'));
        annotation.rotateAngle = !isNaN(txtAngle) ? txtAngle * (180 / Math.PI) : 0;
        // Extract QuickStyle properties
        annotation.QuickStyleFontColor = getCell('QuickStyleFontColor') !== undefined ? Number(getCell('QuickStyleFontColor')) : undefined;
        annotation.QuickStyleFontMatrix = getCell('QuickStyleFontMatrix') !== undefined ? Number(getCell('QuickStyleFontMatrix')) : undefined;
        // Extract margin and styling
        annotation.margin = VisioMarginModel.fromJs(shape);
        annotation.style = VisioTextStyleModel.fromJs(shape, true);
        // Extract visibility (HideText = '1' means hidden)
        annotation.visible = getCell('HideText') !== '1';
        // Extract hyperlink if present
        annotation.hyperlink = VisioHyperlinkModel.fromJs(shape);
        // Apply constraint flags (locks, selection, rotation)
        getAnnotationConstraints(annotation, shape.Cell);
        // Determine if text follows connector segment angle
        annotation.segmentAngle = getCell('TextDirection') ? getCell('TextDirection') === '1' : false;
        // Set alignment based on text direction
        if (annotation.segmentAngle) {
            // For segmented text, use horizontal alignment
            annotation.horizontalAlignment = getHorizontalAlignment(shape);
        }
        else {
            // For regular text, use vertical alignment
            annotation.verticalAlignment = getVerticalAlignment(shape);
        }
        // Extract text positioning properties with fallback to defaults
        annotation.txtPinX = getCell('TxtPinX') !== undefined ? parseFloat(getCell('TxtPinX')) : defaultData.txtPinX;
        annotation.txtPinY = getCell('TxtPinY') !== undefined ? parseFloat(getCell('TxtPinY')) : defaultData.txtPinY;
        annotation.txtLocPinX = getCell('TxtLocPinX') !== undefined ? parseFloat(getCell('TxtLocPinX')) : defaultData.txtLocalPinX;
        annotation.txtLocPinY = getCell('TxtLocPinY') !== undefined ? parseFloat(getCell('TxtLocPinY')) : defaultData.txtLocalPinY;
        annotation.txtWidth = getCell('TxtWidth') !== undefined ? parseFloat(getCell('TxtWidth')) : defaultData.txtWidth;
        annotation.txtHeight = getCell('TxtHeight') !== undefined ? parseFloat(getCell('TxtHeight')) : defaultData.txtHeight;
        return annotation;
    };
    return VisioConnectorAnnotation;
}(VisioAnnotation));
export { VisioConnectorAnnotation };
/**
 * Represents a text annotation for Visio node shapes (not connectors).
 * Extends VisioAnnotation with node-specific text positioning based on shape type.
 */
var VisioNodeAnnotation = /** @class */ (function (_super) {
    __extends(VisioNodeAnnotation, _super);
    function VisioNodeAnnotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a VisioNodeAnnotation instance from a Visio node shape object.
     * Extracts text properties and applies shape-specific text positioning.
     * @param {any} shape - The Visio node shape object
     * @param {ParsedXmlObject} defaultData - Default data containing shape name, width, height, and positioning
     * @returns {VisioNodeAnnotation} A new VisioNodeAnnotation with extracted properties
     */
    VisioNodeAnnotation.fromJs = function (shape, defaultData) {
        var annotation = new VisioNodeAnnotation();
        // Validate shape properties
        if (!shape || !shape.$ || !shape.Cell) {
            return annotation;
        }
        /**
         * Helper function to get cell value by name
         * @param {string} name - The name of the cell to find
         * @returns {string | undefined} The cell value
         */
        var getCell = function (name) {
            // Ensure shape.Cell is always an array
            var cells = ensureArray(shape.Cell);
            var cell = cells.find(function (c) { return c.$.N === name; });
            return cell ? cell.$.V : undefined;
        };
        var defaultNodeData = defaultData;
        // Extract text content (normalize bullets/paragraphs for EJ2)
        var rawContent = (shape.Text && shape.Text.value) ? shape.Text.value : '';
        annotation.content = normalizeParagraphBreaks(shape, rawContent);
        // Extract rotation angle and text direction
        var txtAngle = parseFloat(getCell('TxtAngle'));
        var textDirection = Number(getCell('TextDirection'));
        annotation.rotateAngle = !isNaN(txtAngle) ? txtAngle * (180 / Math.PI) : 0;
        // Adjust rotation if text direction is vertical
        if (textDirection === 1) {
            annotation.rotateAngle -= 90;
        }
        // Extract margin and styling
        annotation.margin = VisioMarginModel.fromJs(shape);
        annotation.style = VisioTextStyleModel.fromJs(shape);
        // If the Visio text has mixed formatting runs, fall back to a safe, default style
        if (hasMixedCharacterFormatting(shape) && annotation.style) {
            annotation.style = applyDefaultStyleForMixedRuns(annotation.style);
        }
        // Extract visibility
        annotation.visible = getCell('HideText') !== '1';
        // Extract hyperlink
        annotation.hyperlink = VisioHyperlinkModel.fromJs(shape);
        // Apply constraint flags
        getAnnotationConstraints(annotation, shape.Cell);
        // Determine text direction mode
        annotation.segmentAngle = textDirection ? textDirection === 1 : false;
        // Set alignment based on text direction
        if (annotation.segmentAngle) {
            annotation.horizontalAlignment = getHorizontalAlignment(shape);
        }
        else {
            annotation.verticalAlignment = getVerticalAlignment(shape);
        }
        // Extract shape dimensions with fallback to defaults
        var shapeWidth = !isNaN(parseFloat(getCell('Width')))
            ? parseFloat(getCell('Width'))
            : (defaultNodeData && defaultNodeData.Width) || 1;
        var shapeHeight = !isNaN(parseFloat(getCell('Height')))
            ? parseFloat(getCell('Height'))
            : (defaultNodeData && defaultNodeData.Height) || 1;
        // Get shape-specific text transform properties
        var transform = applyTextTransform(defaultNodeData.Name, shapeWidth, shapeHeight);
        // Extract text width with fallback to shape-specific transform
        var txtWidth = parseFloat(getCell('TxtWidth'));
        annotation.txtWidth = !isNaN(txtWidth) ? txtWidth : transform.txtWidth;
        // Extract text height with fallback to shape-specific transform
        var txtHeight = parseFloat(getCell('TxtHeight'));
        annotation.txtHeight = !isNaN(txtHeight) ? txtHeight : transform.txtHeight;
        // Extract text pin X coordinate with fallback
        var txtPinX = parseFloat(getCell('TxtPinX'));
        annotation.txtPinX = !isNaN(txtPinX) ? txtPinX : transform.txtPinX;
        // Extract text pin Y coordinate with fallback
        var txtPinY = parseFloat(getCell('TxtPinY'));
        annotation.txtPinY = !isNaN(txtPinY) ? txtPinY : transform.txtPinY;
        // Extract text local pin X coordinate with fallback
        var txtLocPinX = parseFloat(getCell('TxtLocPinX'));
        annotation.txtLocPinX = !isNaN(txtLocPinX) ? txtLocPinX : transform.txtLocPinX;
        // Extract text local pin Y coordinate with fallback
        var txtLocPinY = parseFloat(getCell('TxtLocPinY'));
        annotation.txtLocPinY = !isNaN(txtLocPinY) ? txtLocPinY : transform.txtLocPinY;
        return annotation;
    };
    /**
     * Applies a master-text fallback to a node annotation when page text is empty.
     * Keeps page text if present; otherwise fills from master and forces visibility true.
     * @static
     * @param {VisioNodeAnnotation} annotation - The already-parsed page annotation object
     * @param {VisioShapeNode} pageShape - The page-level shape XML (source for page text)
     * @param {VisioShapeNode | null} masterShape - The master-level shape XML (source for placeholder text)
     * @returns {void}
     */
    VisioNodeAnnotation.applyMasterTextFallback = function (annotation, pageShape, masterShape) {
        // Guard: invalid annotation or page shape
        if (!annotation) {
            return;
        }
        if (!pageShape) {
            return;
        }
        // -- Check if page text has any visible content --
        var pageText = '';
        if (pageShape.Text && pageShape.Text.value) {
            pageText = String(pageShape.Text.value);
        }
        var hasPageText = false;
        if (pageText && pageText.trim().length > 0) {
            hasPageText = true;
        }
        // -- If page has text, keep it and return --
        if (hasPageText) {
            return;
        }
        // -- Otherwise, try to use master placeholder text --
        if (!masterShape) {
            return;
        }
        var masterTextRaw = '';
        if (masterShape.Text && masterShape.Text.value) {
            masterTextRaw = String(masterShape.Text.value);
        }
        if (!masterTextRaw || masterTextRaw.trim().length === 0) {
            return;
        }
        // -- Normalize master text using the same paragraph rules as page text --
        var normalized = normalizeParagraphBreaks(masterShape, masterTextRaw);
        // -- Apply content and ensure visibility --
        annotation.content = normalized;
        annotation.visible = true;
    };
    return VisioNodeAnnotation;
}(VisioAnnotation));
export { VisioNodeAnnotation };
/**
 * Determines horizontal alignment for connector text following segment angle.
 * Maps Visio VerticalAlign cell values to horizontal alignment for rotated text.
 * @function getHorizontalAlignment
 * @param {any} shape - The Visio shape object containing Cell elements
 * @returns {'Left' | 'Center' | 'Right'} The horizontal alignment value
 */
function getHorizontalAlignment(shape) {
    // Find VerticalAlign cell
    var cells = ensureArray(shape.Cell);
    var cell = cells.find(function (c) { return c.$.N === 'VerticalAlign'; });
    if (cell) {
        // Map alignment codes: 0 = left, 2 = right, default = center
        switch (cell.$.V) {
            case '0':
                return 'Left';
            case '2':
                return 'Right';
            default:
                return 'Center';
        }
    }
    return 'Center';
}
/**
 * Extracts and applies text constraint flags from a shape's cells.
 * Sets constraint properties like text editing, selection, and rotation locks.
 * @function getAnnotationConstraints
 * @param {any} shape - The annotation object to populate with constraint flags
 * @param {VisioCell[]} cells - The array of Cell objects from the shape
 * @returns {void} The modified shape object with constraint flags applied
 */
function getAnnotationConstraints(shape, cells) {
    // Convert cells array to a map for easier lookup
    var cellMap = mapCellValues(cells);
    // Array of lock constraint keys to check
    var lockKeys = [
        'LockTextEdit',
        'LockSelect',
        'LockRotate'
    ];
    // Iterate through lock keys and set boolean flags on shape
    // Convert value to true if it exists and is not '0'
    for (var _i = 0, lockKeys_1 = lockKeys; _i < lockKeys_1.length; _i++) {
        var key = lockKeys_1[_i];
        var value = cellMap.get(key);
        shape[toCamelCase(key)] = value != null && value !== '0';
    }
}
/**
 * Determines vertical alignment for node text.
 * Maps Visio VerticalAlign cell values to vertical alignment (Top, Center, Bottom).
 * @function getVerticalAlignment
 * @param {any} shape - The Visio shape object containing Cell elements
 * @returns {'Top' | 'Center' | 'Bottom'} The vertical alignment value
 */
function getVerticalAlignment(shape) {
    // Find VerticalAlign cell
    var cells = ensureArray(shape.Cell);
    var cell = cells.find(function (c) { return c.$.N === 'VerticalAlign'; });
    if (cell) {
        // Map alignment codes: 0 = bottom, 2 = top, default = center
        switch (cell.$.V) {
            case '0':
                return 'Bottom';
            case '2':
                return 'Top';
            default:
                return 'Center';
        }
    }
    return 'Center';
}
