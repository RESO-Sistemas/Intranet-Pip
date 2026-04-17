import { IRichTextEditor } from '../base/interface';
/**
 * AutoFormat module provides functionality for autoformatting text in the Rich Text Editor.
 * Handles automatic formatting of Markdown patterns (e.g., **bold**, ~~strikethrough~~, `code`).
 *
 * @description Manages autoformatting logic within the Rich Text Editor.
 * @export
 */
export declare class AutoFormat {
    protected parent: IRichTextEditor;
    private isDestroyed;
    private autoFormatObj;
    /**
     * Creates an instance of auto format module
     *
     * @param {IRichTextEditor} parent - The parent Rich Text Editor instance
     * @returns {void}
     */
    constructor(parent?: IRichTextEditor);
    private addEventListener;
    private onKeyUp;
    protected removeEventListener(): void;
    /**
     * Cleans up resources and detaches event handlers when the component is destroyed
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     */
    private getModuleName;
    /**
     * Initializes the AutoFormatPlugin object in the editor manager after editor initialization is complete.
     * This method binds the auto format module to the editor's formatter for handling auto format related operations.
     *
     * @returns {void} - This method does not return a value
     * @private
     */
    private bindOnEnd;
}
