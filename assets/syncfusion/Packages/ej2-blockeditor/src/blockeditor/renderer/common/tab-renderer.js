import { Tab } from '@syncfusion/ej2-navigations';
/**
 * `Tab renderer` module is used to render Tab control in BlockEditor.
 *
 * @hidden
 */
var TabRenderer = /** @class */ (function () {
    function TabRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders the tab control in BlockEditor.
     *
     * @param {ITabRendererOptions} args - specifies the arguments.
     * @returns {Tab} - returns the tab object.
     * @hidden
     */
    TabRenderer.prototype.renderTab = function (args) {
        return new Tab({
            items: args.items,
            selectedItem: args.selectedItem,
            enableRtl: this.editor.enableRtl,
            cssClass: args.cssClass,
            selected: args.selected
        }, args.element);
    };
    return TabRenderer;
}());
export { TabRenderer };
