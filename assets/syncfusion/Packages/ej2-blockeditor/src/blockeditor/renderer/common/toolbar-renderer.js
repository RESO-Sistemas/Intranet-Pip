import { Toolbar } from '@syncfusion/ej2-navigations';
import { events } from '../../../common/constant';
var ToolbarRenderer = /** @class */ (function () {
    function ToolbarRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders the toolbar with the specified options.
     *
     * @param {IToolbarRenderOptions} args - The options for rendering the toolbar.
     * @returns {Toolbar} - The rendered toolbar instance.
     * @hidden
     */
    ToolbarRenderer.prototype.renderToolbar = function (args) {
        this.element = typeof args.element === 'string'
            ? this.editor.element.querySelector(args.element)
            : args.element;
        return new Toolbar({
            items: args.items,
            width: args.width,
            overflowMode: args.overflowMode,
            locale: this.editor.locale,
            cssClass: this.editor.cssClass,
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence,
            clicked: this.handleInlineToolbarItemClick.bind(this),
            created: this.handleInlineToolbarCreated.bind(this)
        }, this.element);
    };
    ToolbarRenderer.prototype.handleInlineToolbarCreated = function (args) {
        this.editor.notify(events.inlineToolbarCreated, args);
    };
    ToolbarRenderer.prototype.handleInlineToolbarItemClick = function (args) {
        this.editor.notify(events.inlineToolbarItemClick, args);
    };
    return ToolbarRenderer;
}());
export { ToolbarRenderer };
