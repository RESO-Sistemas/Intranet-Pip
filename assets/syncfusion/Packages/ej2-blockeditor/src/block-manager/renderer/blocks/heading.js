import { createElement } from '@syncfusion/ej2-base';
var HeadingRenderer = /** @class */ (function () {
    function HeadingRenderer(manager) {
        this.parent = manager;
    }
    /**
     * Renders heading block
     *
     * @param {BlockModel} block - specifies the block.
     * @returns {HTMLElement} - the created or updated element
     * @hidden
     */
    HeadingRenderer.prototype.renderHeading = function (block) {
        var headingProps = block.properties;
        headingProps.placeholder = this.parent.getPlaceholderValue(block);
        var heading = createElement("h" + headingProps.level, {
            attrs: {
                contenteditable: 'true',
                placeholder: headingProps.placeholder
            }
        });
        this.parent.blockRenderer.contentRenderer.renderContent(block, heading);
        return heading;
    };
    return HeadingRenderer;
}());
export { HeadingRenderer };
