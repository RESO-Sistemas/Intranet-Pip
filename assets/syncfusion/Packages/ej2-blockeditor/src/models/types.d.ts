/**
 * Specifies the commands available for the inline toolbar items.
 *
 */
export declare type ToolbarCommandName = 'Bold' | 'Italic' | 'Underline' | 'Strikethrough' | 'Uppercase' | 'Lowercase' | 'Subscript' | 'Superscript' | 'Color' | 'BackgroundColor' | '|' | '-';
/**
 * Specifies the formats available for saving images.
 * Options include saving as Base64 or Blob.
 *
 */
export declare type SaveFormat = 'Base64' | 'Blob';
/**
 * Defines supported column types for table blocks.
 */
export declare type TableColumnType = 'Text' | 'Date' | 'Mention' | 'Label' | 'Link';
/**
 * Defines actions being performed within the blocks.
 */
export declare type BlockAction = 'Insertion' | 'Deletion' | 'Moved' | 'Update';
/**
 * Specifies the commands available for the transform block items.
 *
 */
export declare type TransformCommandName = 'Paragraph' | 'Heading1' | 'Heading2' | 'Heading3' | 'Heading4' | 'Checklist' | 'BulletList' | 'NumberedList' | 'Quote';
/**
 * Defines types to be used as colorMode for color selection in the BlockEditor.
 */
export declare type ColorModeType = 'Picker' | 'Palette';
