import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `Dialog renderer` module is used to render dialog popups in BlockEditor.
 *
 * @hidden
 */
var DialogRenderer = /** @class */ (function () {
    function DialogRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders Dialog in BlockEditor.
     *
     * @param {IDialogRenderOptions} args - specifies  the arguments.
     * @returns {Dialog} - returns the Dialog object.
     * @hidden
     */
    DialogRenderer.prototype.renderDialog = function (args) {
        return new Dialog({
            header: args.headerTemplate,
            target: this.editor.element,
            footerTemplate: args.footerTemplate,
            content: args.contentTemplate,
            showCloseIcon: args.showCloseIcon,
            closeOnEscape: args.closeOnEscape,
            width: args.width,
            height: args.height,
            visible: args.visible,
            locale: this.editor.locale,
            cssClass: this.editor.cssClass,
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence
        }, args.element);
    };
    return DialogRenderer;
}());
export { DialogRenderer };
