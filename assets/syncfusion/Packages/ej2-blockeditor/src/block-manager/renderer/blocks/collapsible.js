import { getBlockModelById, createBaseSvg, createSvgElement } from '../../../common/utils/index';
import * as constants from '../../../common/constant';
import { BlockType } from '../../../models/enums';
import { createElement, updateCSSText } from '@syncfusion/ej2-base';
var CollapsibleRenderer = /** @class */ (function () {
    function CollapsibleRenderer(manager) {
        var _this = this;
        /**
         * Updates the expansion state of a collapsible block.
         *
         * @param {HTMLElement} blockElement - The block element to update.
         * @param {boolean} newState - The new expansion state.
         * @param {boolean} isUndoRedoAction - Whether it is invoked through UndoRedo
         * @returns {void}
         */
        this.updateCollapsibleBlockExpansion = function (blockElement, newState, isUndoRedoAction) {
            var contentContainer = blockElement.querySelector('.' + constants.TOGGLE_CONTENT_CLS);
            var blockModel = getBlockModelById(blockElement.id, _this.parent.getEditorBlocks());
            var updatedState = newState;
            blockModel.properties.isExpanded = updatedState;
            _this.parent.stateManager.updateManagerBlocks();
            blockElement.setAttribute('data-collapsed', String(!updatedState));
            updateCSSText(contentContainer, "display: " + (updatedState ? 'block' : 'none') + ";");
            if (!isUndoRedoAction) {
                _this.parent.undoRedoAction.trackExpandedStateForUndoRedo(blockModel.id, blockModel.properties.isExpanded);
            }
        };
        this.parent = manager;
    }
    /**
     * Renders a initial level Collapsible block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered Collapsible block element.
     */
    CollapsibleRenderer.prototype.renderCollapsibleBlock = function (block, blockElement) {
        var _this = this;
        var collapsibleProps = block.properties;
        blockElement.setAttribute('data-collapsed', String(!collapsibleProps.isExpanded));
        var blockContent = createElement('div');
        var toggleHeaderWrapper = createElement('div', {
            className: 'e-toggle-header'
        });
        var toggleIcon = createElement('div', {
            className: 'e-toggle-icon',
            attrs: { contenteditable: 'false' }
        });
        toggleIcon.appendChild(this.renderToggleIcon());
        toggleIcon.addEventListener('click', function () {
            _this.updateCollapsibleBlockExpansion(blockElement, !collapsibleProps.isExpanded);
        });
        var headerElement;
        switch (block.blockType) {
            case BlockType.CollapsibleParagraph:
                headerElement = this.parent.blockRenderer.paragraphRenderer.renderParagraph(block);
                break;
            case BlockType.CollapsibleHeading:
                headerElement = this.parent.blockRenderer.headingRenderer.renderHeading(block);
                break;
        }
        updateCSSText(headerElement, 'width: 100%;');
        headerElement.classList.add('e-block-content');
        var contentContainer = createElement('div', {
            className: 'e-toggle-content',
            attrs: { contenteditable: 'true' }
        });
        updateCSSText(contentContainer, "display: " + (collapsibleProps.isExpanded ? 'block' : 'none') + ";");
        collapsibleProps.children.forEach(function (childBlock) {
            var childBlockElement = _this.parent.blockRenderer.createBlockElement(childBlock);
            contentContainer.appendChild(childBlockElement);
        });
        toggleHeaderWrapper.appendChild(toggleIcon);
        toggleHeaderWrapper.appendChild(headerElement);
        blockContent.appendChild(toggleHeaderWrapper);
        blockContent.appendChild(contentContainer);
        blockElement.classList.add('e-toggle-block');
        return blockContent;
    };
    CollapsibleRenderer.prototype.renderToggleIcon = function () {
        var svg = createBaseSvg();
        var commonPathD = 'M5 20.1315V3.86852C5 3.06982 5.89014 2.59343 6.5547 3.03647L18.7519 11.1679C19.3457 11.5638 19.3457 12.4362 18.7519 12.8321L6.5547 20.9635C5.89015 21.4066 5 20.9302 5 20.1315Z';
        var pathStroke = createSvgElement('path', {
            d: commonPathD,
            stroke: '#4D4B4B',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        });
        var pathFill = createSvgElement('path', {
            d: commonPathD,
            fill: '#4D4B4B'
        });
        svg.append(pathStroke, pathFill);
        return svg;
    };
    return CollapsibleRenderer;
}());
export { CollapsibleRenderer };
