import { ParsedXmlObject, Point, SyncfusionTextBinding, VisioShapeNode, VisioShapeTransform, VisioTextTransform } from './visio-types';
/**
 * Represents margin properties for Visio shapes.
 * Defines spacing on all four sides (left, right, top, bottom).
 */
export declare class VisioMarginModel {
    /** Margin on the left side */
    left: number;
    /** Margin on the right side */
    right: number;
    /** Margin on the top side */
    top: number;
    /** Margin on the bottom side */
    bottom: number;
    /**
     * Creates a VisioMarginModel instance from a Visio shape object.
     * Extracts margin values from the shape's Cell elements.
     * @param {any} shape - The Visio shape object containing Cell elements with margin data
     * @returns {VisioMarginModel} A new VisioMarginModel with extracted margin values, or default values if shape is invalid
     */
    static fromJs(shape: any): VisioMarginModel;
}
/**
 * Represents text decoration properties for Visio text elements.
 * Handles underline and strikethrough styling.
 */
export declare class VisioTextDecorationModel {
    /** Flag indicating if text is underlined */
    underline?: boolean;
    /** Flag indicating if text has strikethrough */
    strikethrough?: boolean;
    /**
     * Creates a VisioTextDecorationModel instance from a Visio shape object.
     * Extracts text decoration properties from shape cells using bitwise operations on the Style cell.
     * @param {any} shape - The Visio shape object containing Section elements with decoration data
     * @returns {VisioTextDecorationModel} A new VisioTextDecorationModel with extracted decoration values
     */
    static fromJs(shape: any): VisioTextDecorationModel;
}
/**
 * Represents text alignment properties for Visio text elements.
 * Handles horizontal alignment (left, center, right, justify).
 */
export declare class VisioTextAlignmentModel {
    /** Flag indicating left alignment */
    left: boolean;
    /** Flag indicating right alignment */
    right: boolean;
    /** Flag indicating center alignment (default) */
    center: boolean;
    /** Flag indicating justified alignment */
    justify: boolean;
    /**
     * Creates a VisioTextAlignmentModel instance from a Visio shape object.
     * Extracts horizontal alignment from the HorzAlign cell value.
     * @param {any} shape - The Visio shape object containing alignment data
     * @returns {VisioTextAlignmentModel} A new VisioTextAlignmentModel with extracted alignment values
     */
    static fromJs(shape: any): VisioTextAlignmentModel;
}
/**
 * Represents comprehensive text styling properties for Visio text elements.
 * Includes color, font, size, bold, italic, decoration, and alignment.
 */
export declare class VisioTextStyleModel {
    /** Text color value */
    color?: string;
    /** Font family name (default: 'Calibri') */
    fontFamily: string;
    /** Font size in points */
    fontSize?: number;
    /** Flag indicating if text is italic */
    italic: boolean;
    /** Flag indicating if text is bold */
    bold: boolean;
    /** Flag indicating no text styling applied */
    TEXT_STYLE_NONE: boolean;
    /** Background fill color */
    fill?: string;
    /** Text opacity (0-1 range) */
    opacity: number;
    /** Text decoration properties (underline, strikethrough) */
    textDecoration?: VisioTextDecorationModel;
    /** Text alignment properties */
    textAlign?: VisioTextAlignmentModel;
    /**
     * Creates a VisioTextStyleModel instance from a Visio shape object.
     * Extracts comprehensive text styling information including font, size, color, and decorations.
     * @param {any} shape - The Visio shape object containing text style data
     * @param {boolean} isConnector - To Check whether the shape is connector or not
     * @returns {VisioTextStyleModel} A new VisioTextStyleModel with all extracted style properties
     */
    static fromJs(shape: any, isConnector?: boolean): VisioTextStyleModel;
}
/**
 * Represents hyperlink properties for Visio shapes.
 * Stores link address, description, and target window preferences.
 */
export declare class VisioHyperlinkModel {
    /** The hyperlink URL/address */
    link: string;
    /** The hyperlink display content/description */
    content: string;
    /** Flag indicating if link opens in a new window */
    newWindow?: boolean;
    /**
     * Creates a VisioHyperlinkModel instance from a Visio shape object.
     * Extracts hyperlink data from the Hyperlink section of the shape.
     * @param {any} shape - The Visio shape object containing hyperlink data
     * @returns {VisioHyperlinkModel} A new VisioHyperlinkModel with extracted hyperlink properties
     */
    static fromJs(shape: any): VisioHyperlinkModel;
}
/**
 * Utility class for binding Visio text properties to Syncfusion text binding format.
 * Handles text positioning calculations and coordinate conversions.
 */
export declare class VisioToSyncfusionTextBinder {
    /**
     * Binds Visio text transform properties to Syncfusion text binding format.
     * Calculates the offset position of text within a shape using Visio pin and margin data.
     * @param {VisioShapeTransform} shapeTransform - The Visio shape transform data (position, size)
     * @param {VisioTextTransform} textTransform - The Visio text transform data (pins, margins, dimensions)
     * @returns {SyncfusionTextBinding} A Syncfusion text binding with calculated offset (0-1 normalized range)
     */
    static bindVisioTextToSyncfusion(shapeTransform: VisioShapeTransform, textTransform: VisioTextTransform): SyncfusionTextBinding;
    /**
     * Calculates the absolute center position of text within a Visio shape.
     * Takes into account text pin position, margins, and dimensions.
     * @param {VisioShapeTransform} shapeTransform - The shape transform data (pinX, pinY, width, height)
     * @param {VisioTextTransform} textTransform - The text transform data (pins, margins, dimensions)
     * @returns {{ x: number, y: number }} The absolute center position of the text
     */
    private static calculateVisioTextCenter;
    /**
     * Converts Visio absolute text center coordinates to Syncfusion normalized offset (0-1 range).
     * Normalizes position relative to shape bounds.
     * @param {{ x: number, y: number }} visioTextCenter - The absolute text center position
     * @param {VisioShapeTransform} shapeTransform - The shape transform data for normalization
     * @returns {{ x: number, y: number }} Normalized offset in 0-1 range where 0.5 is center
     */
    private static convertToSyncfusionOffset;
}
/**
 * Represents a text annotation (label) for Visio shapes and connectors.
 * Contains text content, styling, positioning, and visibility information.
 */
export declare class VisioAnnotation {
    /** Unique identifier for the annotation */
    id?: string;
    /** Text content of the annotation */
    content: string;
    /** Width of the annotation in diagram units */
    width?: number;
    /** Height of the annotation in diagram units */
    height?: number;
    /** Rotation angle in degrees */
    rotateAngle: number;
    /** Margin properties around the text */
    margin?: VisioMarginModel;
    /** Flag indicating if annotation is visible */
    visible: boolean;
    /** Hyperlink associated with the annotation */
    hyperlink?: VisioHyperlinkModel;
    /** Text styling properties */
    style?: VisioTextStyleModel;
    /** Vertical alignment of text (Top, Center, Bottom) */
    verticalAlignment: 'Top' | 'Center' | 'Bottom';
    /** Horizontal alignment of text (Left, Center, Right) */
    horizontalAlignment: 'Left' | 'Center' | 'Right';
    /** Normalized offset position (0-1 range) relative to shape bounds */
    offset: Point;
    /** Flag indicating if text angle should follow connector segment angle */
    segmentAngle?: boolean;
}
/**
 * Represents a text annotation for Visio connectors (lines, arrows).
 * Extends VisioAnnotation with connector-specific text positioning properties.
 */
export declare class VisioConnectorAnnotation extends VisioAnnotation {
    /** Text pin X coordinate relative to connector */
    txtPinX?: number;
    /** Text pin Y coordinate relative to connector */
    txtPinY?: number;
    /** Text local pin X coordinate (center reference point) */
    txtLocPinX?: number;
    /** Text local pin Y coordinate (center reference point) */
    txtLocPinY?: number;
    /** Text width in connector units */
    txtWidth?: number;
    /** Text height in connector units */
    txtHeight?: number;
    /** QuickStyle font color index */
    QuickStyleFontColor: number;
    /** QuickStyle font matrix index */
    QuickStyleFontMatrix: number;
    /**
     * Creates a VisioConnectorAnnotation instance from a Visio connector shape object.
     * Extracts all text and positioning properties specific to connectors.
     * @param {any} shape - The Visio connector shape object
     * @param {any} defaultData - Default text transform data for fallback values
     * @returns {VisioConnectorAnnotation} A new VisioConnectorAnnotation with extracted properties
     */
    static fromJs(shape: any, defaultData: any): VisioConnectorAnnotation;
}
/**
 * Represents a text annotation for Visio node shapes (not connectors).
 * Extends VisioAnnotation with node-specific text positioning based on shape type.
 */
export declare class VisioNodeAnnotation extends VisioAnnotation {
    /** Text pin X coordinate relative to node */
    txtPinX?: number;
    /** Text pin Y coordinate relative to node */
    txtPinY?: number;
    /** Text local pin X coordinate (center reference point) */
    txtLocPinX?: number;
    /** Text local pin Y coordinate (center reference point) */
    txtLocPinY?: number;
    /** Text width in node units */
    txtWidth?: number;
    /** Text height in node units */
    txtHeight?: number;
    /**
     * Creates a VisioNodeAnnotation instance from a Visio node shape object.
     * Extracts text properties and applies shape-specific text positioning.
     * @param {any} shape - The Visio node shape object
     * @param {ParsedXmlObject} defaultData - Default data containing shape name, width, height, and positioning
     * @returns {VisioNodeAnnotation} A new VisioNodeAnnotation with extracted properties
     */
    static fromJs(shape: any, defaultData: ParsedXmlObject): VisioNodeAnnotation;
    /**
     * Applies a master-text fallback to a node annotation when page text is empty.
     * Keeps page text if present; otherwise fills from master and forces visibility true.
     * @static
     * @param {VisioNodeAnnotation} annotation - The already-parsed page annotation object
     * @param {VisioShapeNode} pageShape - The page-level shape XML (source for page text)
     * @param {VisioShapeNode | null} masterShape - The master-level shape XML (source for placeholder text)
     * @returns {void}
     */
    static applyMasterTextFallback(annotation: VisioNodeAnnotation, pageShape: VisioShapeNode, masterShape: VisioShapeNode | null): void;
}
