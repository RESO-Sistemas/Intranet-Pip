import { EventHandler, updateCSSText } from '@syncfusion/ej2-base';
import { BlockType } from '../../models/enums';
import { findClosestParent, getElementRect } from '../../common/utils/dom';
import { getBlockContentElement, isNonContentEditableBlock } from '../../common/utils/block';
import * as constants from '../../common/constant';
import { events } from '../../common/constant';
var FloatingIcon = /** @class */ (function () {
    /**
     * Creates a new FloatingIcon instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    function FloatingIcon(manager) {
        this.parent = manager;
        this.wireGlobalEvents();
    }
    FloatingIcon.prototype.wireGlobalEvents = function () {
        this.parent.observer.on('floatingIconsCreated', this.handleFloatingIconsCreated, this);
        this.parent.observer.on('addIconClick', this.handleAddIconClick, this);
        this.parent.observer.on('dragIconClick', this.handleDragIconClick, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    FloatingIcon.prototype.unWireGlobalEvents = function () {
        this.parent.observer.off('floatingIconsCreated', this.handleFloatingIconsCreated);
        this.parent.observer.off('addIconClick', this.handleAddIconClick);
        this.parent.observer.off('dragIconClick', this.handleDragIconClick);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    FloatingIcon.prototype.handleFloatingIconsCreated = function () {
        this.floatingIconContainer = document.getElementById(this.parent.rootEditorElement.id + "_floatingicons");
        var addIcon = this.floatingIconContainer.querySelector('.e-floating-icon.e-block-add-icon');
        var dragIcon = this.floatingIconContainer.querySelector('.e-floating-icon.e-block-drag-icon');
        EventHandler.add(addIcon, 'click', this.handleAddIconClick, this);
        EventHandler.add(dragIcon, 'click', this.handleDragIconClick, this);
    };
    /**
     * Shows the floating icons
     *
     * @param {HTMLElement} target - The target element to show the floating icons for.
     * @returns {void}
     * @hidden
     */
    FloatingIcon.prototype.showFloatingIcons = function (target) {
        var blockElement = target;
        this.hideDragIconForEmptyBlock(blockElement);
        var calloutContent = blockElement.closest('.' + constants.CALLOUT_CONTENT_CLS);
        var isToggleBlock = blockElement.classList.contains('e-toggle-block');
        var tableBlock = findClosestParent(target, '.' + constants.TABLE_BLOCK_CLS);
        var quoteBlock = findClosestParent(target, '.' + constants.QUOTE_BLOCK_CLS);
        if ((calloutContent && blockElement === calloutContent.firstElementChild && !tableBlock) ||
            !this.isFullyVisibleInEditor(blockElement) ||
            this.parent.readOnly) {
            // Do not show floating icons for the first child of a callout content block
            this.hideFloatingIcons();
            return;
        }
        updateCSSText(this.floatingIconContainer, 'display: flex;');
        blockElement = (isToggleBlock && !tableBlock)
            ? blockElement.querySelector('.e-toggle-header')
            : (tableBlock
                ? tableBlock
                : (quoteBlock ? quoteBlock : blockElement));
        var editorRect = getElementRect(this.parent.rootEditorElement);
        var blockElementRect = getElementRect(blockElement);
        var styles = window.getComputedStyle(blockElement);
        var floatingIconRect = this.floatingIconContainer.getBoundingClientRect();
        var marginTop = parseFloat(styles.marginTop) || 0;
        var marginLeft = parseFloat(styles.marginLeft) || 0;
        var paddingTop = parseFloat(styles.paddingTop) || 0;
        var paddingLeft = parseFloat(styles.paddingLeft) || 0;
        var editorScrollTop = this.parent.rootEditorElement.scrollTop || 0;
        var baseTopOffset = blockElementRect.top + marginTop - editorRect.top + editorScrollTop;
        var hasHeading = ['h1', 'h2', 'h3', 'h4'].some(function (tag) { return blockElement.querySelector(tag) !== null; });
        var topOffset = hasHeading
            ? (baseTopOffset + floatingIconRect.height / 2 + paddingTop)
            : baseTopOffset + paddingTop;
        var adjustedLeft = (blockElementRect.left - marginLeft) + paddingLeft - (floatingIconRect.width + 5) - editorRect.left;
        var cssText = "top: " + topOffset + "px; left: " + adjustedLeft + "px; pointer-events: auto;";
        updateCSSText(this.floatingIconContainer, cssText);
    };
    /**
     * Hides the drag icon for empty block
     *
     * @param {HTMLElement} target - The target element to show the floating icons for.
     * @returns {void}
     * @hidden
     */
    FloatingIcon.prototype.hideDragIconForEmptyBlock = function (target) {
        var dragIcon = this.floatingIconContainer.querySelector('.e-block-drag-icon');
        updateCSSText(dragIcon, 'display: flex;');
        var ignoredTypes = [BlockType.Code, BlockType.Callout, BlockType.Divider, BlockType.CollapsibleHeading,
            BlockType.CollapsibleParagraph, BlockType.Image, BlockType.Table, BlockType.Quote];
        var blockType = target.getAttribute('data-block-type');
        var isIgnoredtype = blockType && ignoredTypes.indexOf(blockType) !== -1;
        var contentElement = getBlockContentElement(target);
        if (!isIgnoredtype && (contentElement && !contentElement.textContent)) {
            updateCSSText(dragIcon, 'display: none;');
        }
    };
    /**
     * Hides the floating icons
     *
     * @returns {void}
     * @hidden
     */
    FloatingIcon.prototype.hideFloatingIcons = function () {
        if (this.floatingIconContainer) {
            updateCSSText(this.floatingIconContainer, 'display: none;');
        }
    };
    FloatingIcon.prototype.handleDragIconClick = function (event) {
        if (!this.parent.blockActionMenuSettings.enable) {
            return;
        }
        var dragIcon = this.floatingIconContainer.querySelector('.e-block-drag-icon');
        dragIcon.classList.add('e-drag-icon-selected');
        this.parent.selectionOverlay.selectionOverlayInfo = { element: this.parent.currentHoveredBlock, direction: 'previous' };
        this.parent.lastHighlightedBlockId = this.parent.currentHoveredBlock.id;
        if (this.parent.selectionOverlay) {
            this.parent.selectionOverlay.show(this.parent.currentHoveredBlock.id);
        }
        this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(this.floatingIconContainer, this.parent.blockActionMenuModule.popupObj);
        var popupElement = document.querySelector('#' + this.parent.rootEditorElement.id + constants.BLOCKACTION_POPUP_ID);
        this.parent.blockActionMenuModule.toggleBlockActionPopup(popupElement.classList.contains('e-popup-open'), event);
        if (this.parent.nodeSelection) {
            this.parent.nodeSelection.clearSelection();
        }
    };
    FloatingIcon.prototype.handleAddIconClick = function () {
        var block = this.parent.currentHoveredBlock;
        if ((this.parent.currentHoveredBlock.innerText.length > 0) || (isNonContentEditableBlock(block.getAttribute('data-block-type')))) {
            this.parent.execCommand({
                command: 'AddBlock',
                state: {
                    targetBlock: this.parent.currentHoveredBlock,
                    preventUpdateAction: true,
                    forceIgnoreTargetUpdate: true
                }
            });
        }
        else {
            this.parent.setFocusAndUIForNewBlock(block);
        }
        if (this.parent.slashCommandModule) {
            this.parent.isPopupOpenedOnAddIconClick = true;
            this.parent.slashCommandModule.showPopup();
        }
    };
    FloatingIcon.prototype.isFullyVisibleInEditor = function (blockElement) {
        var editorRect = this.parent.rootEditorElement.getBoundingClientRect();
        var blockRect = blockElement.getBoundingClientRect();
        return (blockRect.top >= editorRect.top &&
            blockRect.bottom <= editorRect.bottom);
    };
    FloatingIcon.prototype.destroy = function () {
        EventHandler.remove(this.floatingIconContainer.firstChild, 'click', this.handleAddIconClick);
        EventHandler.remove(this.floatingIconContainer.lastChild, 'click', this.handleDragIconClick);
        this.unWireGlobalEvents();
        this.floatingIconContainer = null;
    };
    return FloatingIcon;
}());
export { FloatingIcon };
