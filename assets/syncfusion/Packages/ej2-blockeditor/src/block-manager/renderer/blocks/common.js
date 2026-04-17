import { createElement, updateCSSText } from '@syncfusion/ej2-base';
var CommonBlocksRenderer = /** @class */ (function () {
    function CommonBlocksRenderer(manager) {
        this.parent = manager;
    }
    /**
     * Renders a divider block
     *
     * @param {HTMLElement} blockElement - The block element.
     * @returns {HTMLElement} - The created or updated element.
     */
    CommonBlocksRenderer.prototype.renderDivider = function (blockElement) {
        var dividerElementWrapper = createElement('div', { className: 'e-be-hr-wrapper' });
        var dividerElement = createElement('hr', { className: 'e-be-hr' });
        dividerElementWrapper.appendChild(dividerElement);
        blockElement.addEventListener('click', function () {
            blockElement.classList.add('e-divider-selected');
        });
        blockElement.addEventListener('blur', function () {
            blockElement.classList.remove('e-divider-selected');
        });
        dividerElementWrapper.appendChild(dividerElement);
        blockElement.classList.add('e-divider-block');
        blockElement.setAttribute('tabindex', '0');
        blockElement.setAttribute('contenteditable', 'false');
        updateCSSText(blockElement, 'outline: none;');
        return dividerElementWrapper;
    };
    /**
     * Renders a template block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered template block element.
     * @hidden
     */
    CommonBlocksRenderer.prototype.renderTemplateBlock = function (block, blockElement) {
        var templateElement = createElement('div', {
            className: 'e-block-template e-block-content',
            id: block.id,
            attrs: { 'tabindex': '-1' }
        });
        blockElement.appendChild(templateElement);
        this.parent.observer.notify('renderTemplateBlock', { block: block, templateElement: templateElement });
        return templateElement;
    };
    return CommonBlocksRenderer;
}());
export { CommonBlocksRenderer };
