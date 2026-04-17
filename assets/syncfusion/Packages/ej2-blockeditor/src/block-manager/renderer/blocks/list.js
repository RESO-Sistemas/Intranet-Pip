import { createBaseSvg, createSvgElement, decoupleReference } from '../../../common/utils/index';
import { BlockType } from '../../../models/enums';
import { createElement } from '@syncfusion/ej2-base';
var ListRenderer = /** @class */ (function () {
    function ListRenderer(manager) {
        this.parent = manager;
    }
    /**
     * Renders a list item block
     *
     * This method creates and transforms list item elements based on the block type.
     * It handles both numbered and checklist types.
     *
     * @param {BlockModel} block - Specifies the block model containing data to render.
     * @param {HTMLElement} blockElement - The parent element that contains all block elements.
     * @returns {HTMLElement} - Returns the created or updated list container element.
     * @hidden
     */
    ListRenderer.prototype.renderListItem = function (block, blockElement) {
        var isNumberedList = block.blockType === BlockType.NumberedList;
        var isChecklist = block.blockType === BlockType.Checklist;
        var listType = isNumberedList ? 'ol' : 'ul';
        var listContainer = createElement(listType, {});
        var listProps = block.properties;
        listProps.placeholder = this.parent.getPlaceholderValue(block);
        var listItem = createElement('li', {
            attrs: {
                contenteditable: 'true',
                placeholder: listProps.placeholder
            }
        });
        this.parent.blockRenderer.contentRenderer.renderContent(block, listItem);
        if (isChecklist) {
            this.renderChecklist(block, blockElement);
        }
        listContainer.appendChild(listItem);
        return listContainer;
    };
    /**
     * Renders a checklist item
     *
     * @param {BlockModel} block - Specifies the block model containing data to render.
     * @param {HTMLElement} blockElement - The parent element that contains all block elements.
     * @returns {void}
     * @hidden
     */
    ListRenderer.prototype.renderChecklist = function (block, blockElement) {
        var _this = this;
        var checkmarkContainer = createElement('div', {
            className: 'e-checkmark-container',
            attrs: { contenteditable: 'false', tabindex: '-1' }
        });
        var checkboxSvg = this.renderUncheckedCheckmark();
        checkmarkContainer.appendChild(checkboxSvg);
        blockElement.prepend(checkmarkContainer);
        checkmarkContainer.addEventListener('click', function (e) { return _this.checkmarkClickListener(e, block); });
    };
    ListRenderer.prototype.checkmarkClickListener = function (event, block) {
        event.preventDefault();
        event.stopPropagation();
        if (this.parent.readOnly) {
            return;
        }
        var props = block.properties;
        this.toggleCheckedState(block, !props.isChecked);
    };
    /**
     * Toggles the checked state of a checklist item.
     *
     * @param {BlockModel} block - The block model of the checklist item.
     * @param {boolean} isChecked - The new checked state.
     * @param {boolean} isUndoRedoAction - specifies whether to track undo or redo action.
     * @returns {void}
     * @hidden
     */
    ListRenderer.prototype.toggleCheckedState = function (block, isChecked, isUndoRedoAction) {
        var props = block.properties;
        var oldBlockClone = decoupleReference(block);
        var blockElement = this.parent.getBlockElementById(block.id);
        var listItem = blockElement.querySelector('li');
        if (listItem && listItem.textContent.trim() === '') {
            isChecked = false;
        }
        listItem.classList.toggle('e-checked', isChecked);
        var existingSvg = blockElement.querySelector('svg');
        if (existingSvg) {
            while (existingSvg.firstChild) {
                existingSvg.removeChild(existingSvg.firstChild);
            }
            var svgElements = isChecked ? this.getCheckedSvgElements() : this.getUncheckedSvgElements();
            svgElements.forEach(function (element) { return existingSvg.appendChild(element); });
        }
        props.isChecked = isChecked;
        this.parent.stateManager.updateManagerBlocks();
        if (!isUndoRedoAction) {
            this.parent.undoRedoAction.trackCheckedStateForUndoRedo(block.id, props.isChecked);
            this.parent.eventService.addChange({
                action: 'Update',
                data: {
                    block: decoupleReference(block),
                    prevBlock: oldBlockClone
                }
            });
            this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        }
    };
    ListRenderer.prototype.getUncheckedSvgElements = function () {
        return [
            createSvgElement('path', {
                d: 'M6 2.5H18C19.933 2.5 21.5 4.067 21.5 6V18C21.5 19.933 19.933 21.5 18 21.5H6C4.067 21.5 2.5 19.933 2.5 18V6C2.5 4.067 4.067 2.5 6 2.5Z',
                class: 'e-checkmark-border'
            })
        ];
    };
    ListRenderer.prototype.getCheckedSvgElements = function () {
        return [
            // Background rectangle that will use theme colors
            createSvgElement('rect', {
                x: '0.5',
                y: '2.5',
                width: '19',
                height: '19',
                rx: '3.5',
                class: 'e-checkmark-bg'
            }),
            // Border rectangle
            createSvgElement('rect', {
                x: '0.5',
                y: '2.5',
                width: '19',
                height: '19',
                rx: '3.5',
                class: 'e-checkmark-border'
            }),
            // Checkmark path (always white)
            createSvgElement('path', {
                d: 'M14.2656 7.73438H14.3906L14.5156 7.76562L14.6406 7.78125L14.7656 7.82812L14.875 7.89062L14.9844 7.95312L15.0938 8.03125L15.1875 8.125L15.2812 8.21875L15.3594 8.32812L15.4219 8.4375L15.4844 8.54688L15.5312 8.67188L15.5469 8.79688L15.5781 8.92188V9.04688V9.17188L15.5469 9.29688L15.5312 9.42188L15.4844 9.54688L15.4219 9.65625L15.3594 9.76562L15.2812 9.875L15.1875 9.96875L9.28125 15.875L9.1875 15.9688L9.07812 16.0469L8.96875 16.1094L8.85938 16.1719L8.73438 16.2188L8.60938 16.2344L8.48438 16.2656H8.35938H8.23438L8.10938 16.2344L7.98438 16.2188L7.85938 16.1719L7.75 16.1094L7.64062 16.0469L7.53125 15.9688L7.4375 15.875L4.8125 13.25L4.71875 13.1562L4.64062 13.0469L4.57812 12.9375L4.51562 12.8281L4.46875 12.7031L4.45312 12.5781L4.42188 12.4531V12.3281V12.2031L4.45312 12.0781L4.46875 11.9531L4.51562 11.8281L4.57812 11.7188L4.64062 11.6094L4.71875 11.5L4.8125 11.4062L4.90625 11.3125L5.01562 11.2344L5.125 11.1719L5.23438 11.1094L5.35938 11.0625L5.48438 11.0469L5.60938 11.0156H5.73438H5.85938L5.98438 11.0469L6.10938 11.0625L6.23438 11.1094L6.34375 11.1719L6.45312 11.2344L6.5625 11.3125L6.65625 11.4062L8.35938 13.0938L13.3438 8.125L13.4375 8.03125L13.5469 7.95312L13.6562 7.89062L13.7656 7.82812L13.8906 7.78125L14.0156 7.76562L14.1406 7.73438H14.2656Z',
                class: 'e-checkmark-color'
            })
        ];
    };
    ListRenderer.prototype.renderUncheckedCheckmark = function () {
        var svg = createBaseSvg();
        this.getUncheckedSvgElements().forEach(function (element) {
            svg.appendChild(element);
        });
        return svg;
    };
    return ListRenderer;
}());
export { ListRenderer };
