import { Tooltip } from '@syncfusion/ej2-popups';
/**
 * `Tooltip renderer` module is used to render Tooltip in BlockEditor.
 *
 * @hidden
 */
var TooltipRenderer = /** @class */ (function () {
    function TooltipRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders tooltip in BlockEditor.
     *
     * @param {ITooltipRenderOptions} args - specifies  the arguments.
     * @returns {Tooltip} - returns the Tooltip object.
     * @hidden
     */
    TooltipRenderer.prototype.renderTooltip = function (args) {
        var element = args.element;
        if (typeof element == 'string') {
            element = document.querySelector(element);
        }
        var tooltipOptions = {
            target: args.target,
            position: args.position === 'RightCenter' ? (this.editor.enableRtl ? 'LeftCenter' : 'RightCenter') : args.position,
            showTipPointer: args.showTipPointer,
            windowCollision: args.windowCollision,
            beforeRender: args.beforeRender,
            locale: this.editor.locale,
            cssClass: (args.cssClass + (this.editor.cssClass ? (' ' + this.editor.cssClass) : '')),
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence,
            opensOn: 'Hover'
        };
        if (args.content) {
            tooltipOptions.content = args.content;
        }
        var tooltipObj = new Tooltip(tooltipOptions, element);
        return tooltipObj;
    };
    TooltipRenderer.prototype.destroyTooltip = function (tooltip) {
        if (tooltip) {
            tooltip.destroy();
        }
    };
    return TooltipRenderer;
}());
export { TooltipRenderer };
