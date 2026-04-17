import { ProgressBar } from '@syncfusion/ej2-progressbar';
/**
 * `Progressbar renderer` module is used to render Progressbar control in BlockEditor.
 *
 * @hidden
 */
var ProgressBarRenderer = /** @class */ (function () {
    function ProgressBarRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders the progressbar control in BlockEditor.
     *
     * @param {IProgressBarRendererOptions} args - specifies the arguments.
     * @returns {ProgressBar} - returns the progressbar object.
     * @hidden
     */
    ProgressBarRenderer.prototype.renderProgressBar = function (args) {
        var progressBarObj = new ProgressBar({
            type: args.type,
            value: args.value,
            height: args.height,
            width: args.width,
            trackThickness: args.trackThickness,
            progressThickness: args.progressThickness,
            showProgressValue: args.showProgressValue,
            animation: args.animation,
            margin: args.margin,
            minimum: args.minimum,
            maximum: args.maximum,
            enableRtl: this.editor.enableRtl
        });
        progressBarObj.appendTo(args.element);
        return progressBarObj;
    };
    return ProgressBarRenderer;
}());
export { ProgressBarRenderer };
