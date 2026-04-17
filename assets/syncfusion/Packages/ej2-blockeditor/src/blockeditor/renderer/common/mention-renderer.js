import { Mention } from '@syncfusion/ej2-dropdowns';
/**
 * `Mention renderer` module is used to render Mention control in BlockEditor.
 *
 * @hidden
 */
var MentionRenderer = /** @class */ (function () {
    function MentionRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders the mention control in BlockEditor.
     *
     * @param {IMentionRenderOptions} args - specifies  the arguments.
     * @returns {Mention} - returns the mention object.
     * @hidden
     */
    MentionRenderer.prototype.renderMention = function (args) {
        var _this = this;
        return new Mention({
            mentionChar: args.mentionChar,
            dataSource: args.dataSource,
            highlight: args.highlight,
            allowSpaces: true,
            suffixText: '',
            fields: args.fields,
            itemTemplate: args.itemTemplate,
            displayTemplate: args.displayTemplate,
            popupWidth: args.popupWidth,
            popupHeight: args.popupHeight,
            change: args.change,
            filtering: args.filtering,
            beforeOpen: args.beforeOpen,
            select: args.select,
            locale: this.editor.locale,
            cssClass: (args.cssClass + (this.editor.cssClass ? (' ' + this.editor.cssClass) : '')),
            opened: function (e) {
                _this.editor.blockManager.observer.notify('mentionOpened');
                if (args.opened) {
                    args.opened.call(_this, e);
                }
            },
            closed: function (e) {
                if (args.beforeClose) {
                    args.beforeClose.call(_this, e);
                }
            }
        }, args.element);
    };
    return MentionRenderer;
}());
export { MentionRenderer };
