import { createBaseSvg, createSvgElement } from '../../../common/utils/index';
import * as constants from '../../../common/constant';
import { createElement } from '@syncfusion/ej2-base';
var CalloutRenderer = /** @class */ (function () {
    function CalloutRenderer(manager) {
        this.parent = manager;
    }
    /**
     * Renders a initial level callout block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered callout block element.
     * @hidden
     */
    CalloutRenderer.prototype.renderCallout = function (block, blockElement) {
        var _this = this;
        blockElement.classList.add(constants.CALLOUT_BLOCK_CLS);
        var calloutWrapper = createElement('div', {
            className: 'e-callout-wrapper',
            attrs: { contenteditable: 'true' }
        });
        var iconContainer = createElement('div', {
            className: 'e-callout-icon',
            attrs: { contenteditable: 'false' }
        });
        iconContainer.appendChild(this.renderCalloutIcon());
        var contentContainer = createElement('div', {
            className: 'e-callout-content',
            attrs: { contenteditable: 'true' }
        });
        var props = block.properties;
        props.children.forEach(function (childBlock) {
            var childBlockElement = _this.parent.blockRenderer.createBlockElement(childBlock);
            contentContainer.appendChild(childBlockElement);
        });
        calloutWrapper.appendChild(iconContainer);
        calloutWrapper.appendChild(contentContainer);
        return calloutWrapper;
    };
    CalloutRenderer.prototype.renderCalloutIcon = function () {
        var svg = createBaseSvg();
        svg.append(createSvgElement('path', {
            d: 'M14 22H10C8.89543 22 8 21.1046 8 20V17H16V20C16 21.1046 15.1046 22 14 22Z',
            fill: '#7DA6FF'
        }), createSvgElement('circle', {
            cx: '12',
            cy: '9.5',
            r: '7.5',
            stroke: '#4D4B4B',
            'stroke-width': '2'
        }), createSvgElement('path', {
            d: 'M14 22.5H10C8.89543 22.5 8 21.6046 8 20.5V16H16V20.5C16 21.6046 15.1046 22.5 14 22.5Z',
            stroke: '#4D4B4B',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }), createSvgElement('circle', {
            cx: '12',
            cy: '9.5',
            r: '7.5',
            fill: '#FFCA26'
        }), createSvgElement('path', {
            d: 'M19.5 9.5C19.5 13.6421 16.1421 17 12 17C12 17 15.5 13.6421 15.5 9.5C15.5 5.35786 12 2 12 2C16.1421 2 19.5 5.35786 19.5 9.5Z',
            fill: '#F39F00'
        }), createSvgElement('path', {
            d: 'M8 19C10.5 20.5 13 20.5 16 19',
            stroke: '#4D4B4B'
        }));
        return svg;
    };
    return CalloutRenderer;
}());
export { CalloutRenderer };
