import { createElement } from '@syncfusion/ej2-base';
var ParagraphRenderer = /** @class */ (function () {
    function ParagraphRenderer(manager) {
        this.parent = manager;
    }
    /**
     * Renders paragraph block
     *
     * @param {BlockModel} block - specifies the block.
     * @returns {HTMLElement} - the created or updated element
     * @hidden
     */
    ParagraphRenderer.prototype.renderParagraph = function (block) {
        var paragraphProps = block.properties;
        paragraphProps.placeholder = this.parent.getPlaceholderValue(block);
        var paragraph = createElement('p', {
            attrs: {
                contenteditable: 'true',
                placeholder: paragraphProps.placeholder
            }
        });
        this.parent.blockRenderer.contentRenderer.renderContent(block, paragraph);
        return paragraph;
    };
    return ParagraphRenderer;
}());
export { ParagraphRenderer };
