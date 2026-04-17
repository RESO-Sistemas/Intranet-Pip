import * as events from '../base/constant';
import { AutoFormatPlugin } from '../../editor-manager/plugin/autoformat';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * AutoFormat module provides functionality for autoformatting text in the Rich Text Editor.
 * Handles automatic formatting of Markdown patterns (e.g., **bold**, ~~strikethrough~~, `code`).
 *
 * @description Manages autoformatting logic within the Rich Text Editor.
 * @export
 */
var AutoFormat = /** @class */ (function () {
    /**
     * Creates an instance of auto format module
     *
     * @param {IRichTextEditor} parent - The parent Rich Text Editor instance
     * @returns {void}
     */
    function AutoFormat(parent) {
        this.parent = parent;
        this.isDestroyed = false;
        this.addEventListener();
    }
    /* Registers event handlers for auto format operations */
    AutoFormat.prototype.addEventListener = function () {
        this.parent.on(events.keyUp, this.onKeyUp, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.bindOnEnd, this.bindOnEnd, this);
    };
    /* Handles key up events for space keys */
    AutoFormat.prototype.onKeyUp = function (e) {
        var block = false;
        if (e.args.which === 32 && this.parent.formatter.editorManager.autoFormatObj) {
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.inputElement.ownerDocument);
            var isValidBlock = this.autoFormatObj.findBlockAutoFormatCommandInRange(range);
            if (!isNullOrUndefined(isValidBlock)) {
                var args = { item: { command: isValidBlock.format, subCommand: isValidBlock.tag } };
                if (isValidBlock.tag === 'hr') {
                    args.item.value = '<hr/>';
                }
                if (isValidBlock.format === 'CodeBlock') {
                    var languages = this.parent.codeBlockSettings.languages;
                    var defaultLanguage = this.parent.codeBlockSettings.defaultLanguage;
                    var language = void 0;
                    var label = void 0;
                    for (var i = 0; i < languages.length; i++) {
                        if (languages[i].language === defaultLanguage) {
                            language = languages[i].language;
                            label = languages[i].label;
                            break;
                        }
                    }
                    this.parent.formatter.process(this.parent, args, e.args, { language: language, label: label, action: 'createCodeBlock', enterAction: this.parent.enterKey });
                    block = true;
                }
                else {
                    this.parent.formatter.process(this.parent, args, e.args);
                    block = true;
                }
            }
        }
        if (['*', '_', '`', '~'].indexOf(e.args.key) !== -1) {
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.inputElement.ownerDocument);
            if (this.autoFormatObj.findAutoFormatCommandInRange(range) && !block) {
                var args = { item: { command: 'autoformat', subCommand: 'inlinestyle' } };
                this.parent.formatter.process(this.parent, args, e.args);
            }
        }
    };
    /* Removes all event listeners attached by this module
     * Unregisters handlers to prevent memory leaks
     */
    AutoFormat.prototype.removeEventListener = function () {
        this.parent.off(events.keyUp, this.onKeyUp);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.bindOnEnd, this.bindOnEnd);
    };
    /**
     * Cleans up resources and detaches event handlers when the component is destroyed
     *
     * @returns {void}
     */
    AutoFormat.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.isDestroyed = true;
        this.removeEventListener();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     */
    AutoFormat.prototype.getModuleName = function () {
        return 'autoFormat';
    };
    /**
     * Initializes the AutoFormatPlugin object in the editor manager after editor initialization is complete.
     * This method binds the auto format module to the editor's formatter for handling auto format related operations.
     *
     * @returns {void} - This method does not return a value
     * @private
     */
    AutoFormat.prototype.bindOnEnd = function () {
        if (!this.parent.formatter.editorManager.autoFormatObj) {
            this.parent.formatter.editorManager.autoFormatObj = new AutoFormatPlugin(this.parent.formatter.editorManager);
            this.autoFormatObj = this.parent.formatter.editorManager.autoFormatObj;
        }
    };
    return AutoFormat;
}());
export { AutoFormat };
