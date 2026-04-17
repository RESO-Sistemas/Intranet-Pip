import { createElement, addClass } from '@syncfusion/ej2-base';
import * as constants from '../../../common/constant';
var QuoteRenderer = /** @class */ (function () {
    function QuoteRenderer(manager) {
        this.parent = manager;
    }
    /**
     * Renders a quote block with container structure for children
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered quote block element.
     */
    QuoteRenderer.prototype.renderQuote = function (block, blockElement) {
        var _this = this;
        var quoteProps = block.properties;
        // Mark outer block
        addClass([blockElement], constants.QUOTE_BLOCK_CLS);
        // Wrapper (can be contenteditable=false if you want to restrict editing to children only)
        var wrapper = createElement('div', {
            className: 'e-quote-wrapper',
            attrs: { contenteditable: 'true' } // or 'false' depending on UX preference
        });
        // The visible quote area
        var content = createElement('blockquote', {
            className: constants.QUOTE_CONTENT_CLS,
            attrs: { contenteditable: 'true' }
        });
        // Render child blocks (this is the key difference)
        quoteProps.children.forEach(function (childBlock) {
            var childEl = _this.parent.blockRenderer.createBlockElement(childBlock);
            content.appendChild(childEl);
        });
        wrapper.appendChild(content);
        return wrapper;
    };
    return QuoteRenderer;
}());
export { QuoteRenderer };
