/**
 * Enum representing the different block types available in the block editor component.
 * Each block type corresponds to a specific content format that can be used to create structured documents.
 */
export var BlockType;
(function (BlockType) {
    /**
     * Represents a text block.
     * This block type is used for plain text content.
     */
    BlockType["Paragraph"] = "Paragraph";
    /**
     * Represents a heading block.
     * This block type is used for headings such as level 1, 2, 3 or 4.
     */
    BlockType["Heading"] = "Heading";
    /**
     * Represents a checklist block.
     * This block type is used for creating interactive to-do lists.
     */
    BlockType["Checklist"] = "Checklist";
    /**
     * Represents a bullet list block.
     * This block type is used for unordered lists.
     */
    BlockType["BulletList"] = "BulletList";
    /**
     * Represents a numbered list block.
     * This block type is used for ordered lists.
     */
    BlockType["NumberedList"] = "NumberedList";
    /**
     * Represents a code block.
     * This block type is used to display formatted code with syntax highlighting.
     */
    BlockType["Code"] = "Code";
    /**
     * Represents a quote block.
     * This block type is used to display quotations or excerpts from a text.
     */
    BlockType["Quote"] = "Quote";
    /**
     * Represents a callout block.
     * This block type is used to highlight important information or warnings.
     */
    BlockType["Callout"] = "Callout";
    /**
     * Represents a divider block.
     * This block type is used to insert horizontal dividers to separate sections of content.
     */
    BlockType["Divider"] = "Divider";
    /**
     * Represents a collapsible paragraph block.
     * This block type is used to display paragraphs that can be expanded or collapsed.
     */
    BlockType["CollapsibleParagraph"] = "CollapsibleParagraph";
    /**
     * Represents a collapsible heading 1 block.
     * This block type is used to display top-level headings that can be expanded or collapsed.
     */
    BlockType["CollapsibleHeading"] = "CollapsibleHeading";
    /**
     * Represents an image block.
     * This block type is used to display images.
     */
    BlockType["Image"] = "Image";
    /**
     * Represents a table block.
     * This block type is used to display data in a tabular format.
     */
    BlockType["Table"] = "Table";
    /**
     * Represents a template block.
     * This block type is used for predefined templates.
     */
    BlockType["Template"] = "Template";
})(BlockType || (BlockType = {}));
/**
 * Defines the type of content a block can hold.
 * This enum represents various content formats supported in the editor.
 */
export var ContentType;
(function (ContentType) {
    /**
     * Represents plain text content.
     */
    ContentType["Text"] = "Text";
    /**
     * Represents a hyperlink.
     */
    ContentType["Link"] = "Link";
    /**
     * Represents a user mention.
     */
    ContentType["Mention"] = "Mention";
    /**
     * Represents a label or tag.
     */
    ContentType["Label"] = "Label";
})(ContentType || (ContentType = {}));
/**
 * Enum representing the built in items for inline toolbar.
 */
export var CommandName;
(function (CommandName) {
    CommandName["Bold"] = "Bold";
    CommandName["Italic"] = "Italic";
    CommandName["Underline"] = "Underline";
    CommandName["Strikethrough"] = "Strikethrough";
    CommandName["Color"] = "Color";
    CommandName["BackgroundColor"] = "BackgroundColor";
    CommandName["Superscript"] = "Superscript";
    CommandName["Subscript"] = "Subscript";
    CommandName["Uppercase"] = "Uppercase";
    CommandName["Lowercase"] = "Lowercase";
    CommandName["Link"] = "Link";
    CommandName["InlineCode"] = "InlineCode";
    CommandName["Transform"] = "Transform";
})(CommandName || (CommandName = {}));
