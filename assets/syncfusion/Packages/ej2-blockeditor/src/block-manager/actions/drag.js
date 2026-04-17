import { EventHandler, isNullOrUndefined as isNOU, updateCSSText } from '@syncfusion/ej2-base';
import { getAdjacentBlock, getBlockContentElement, getBlockIndexById, getBlockModelById, isListTypeBlock } from '../../common/utils/block';
import { cleanupElement } from '../../common/utils/common';
import { getSelectedRange } from '../../common/utils/selection';
import * as constants from '../../common/constant';
import { BlockType } from '../../models/enums';
import { events } from '../../common/constant';
/**
 * Drag and Drop module is used to perform block reordering actions.
 */
var DragAndDropAction = /** @class */ (function () {
    function DragAndDropAction(manager) {
        this.isDragCompleted = false;
        this.isDragMoveCancelled = false;
        this.draggedBlocks = [];
        this.isIndicatorAtTop = false;
        this.parent = manager;
    }
    DragAndDropAction.prototype.wireDragEvents = function () {
        EventHandler.add(this.parent.rootEditorElement, 'dragover', this.updateCurrentDroppingTarget, this);
        EventHandler.add(this.parent.rootEditorElement, 'dragenter', this.preventNoDropIcon, this);
        if (!isNOU(this.parent.floatingIconAction.floatingIconContainer)) {
            var dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
            if (!isNOU(dragIcon)) {
                EventHandler.add(dragIcon, 'dragstart', this.handleDragStart, this);
                EventHandler.add(dragIcon, 'drag', this.handleDragMove, this);
                EventHandler.add(dragIcon, 'dragend', this.handleDragStop, this);
            }
        }
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    DragAndDropAction.prototype.unwireDragEvents = function () {
        EventHandler.remove(this.parent.rootEditorElement, 'dragover', this.updateCurrentDroppingTarget);
        EventHandler.remove(this.parent.rootEditorElement, 'dragenter', this.preventNoDropIcon);
        if (!isNOU(this.parent.floatingIconAction.floatingIconContainer)) {
            var dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
            if (!isNOU(dragIcon)) {
                EventHandler.remove(dragIcon, 'dragstart', this.handleDragStart);
                EventHandler.remove(dragIcon, 'drag', this.handleDragMove);
                EventHandler.remove(dragIcon, 'dragend', this.handleDragStop);
            }
        }
        this.parent.observer.off(events.destroy, this.destroy);
    };
    DragAndDropAction.prototype.preventNoDropIcon = function (e) {
        e.preventDefault();
    };
    DragAndDropAction.prototype.updateCurrentDroppingTarget = function (e) {
        e.preventDefault();
        var elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
        var innerMostElement = elementsAtPoint[0];
        var closestBlock = innerMostElement.closest('.' + constants.BLOCK_CLS);
        if (innerMostElement && closestBlock) {
            this.currentDropTarget = closestBlock;
        }
        else {
            this.currentDropTarget = null;
        }
    };
    DragAndDropAction.prototype.handleDragMove = function (e) {
        var _this = this;
        if (isNOU(this.parent.currentHoveredBlock)) {
            return;
        }
        this.isDragCompleted = false;
        var dropIndex = this.currentDropTarget ? getBlockIndexById(this.currentDropTarget.id, this.parent.getEditorBlocks()) : -1;
        var eventArgs = {
            blocks: this.draggedBlocks,
            fromIndex: this.draggedBlocks.map(function (block) { return getBlockIndexById(block.id, _this.parent.getEditorBlocks()); }),
            dropIndex: dropIndex,
            event: e,
            target: this.currentDropTarget,
            cancel: false
        };
        this.parent.observer.notify('blockDragging', eventArgs);
        if (eventArgs.cancel) {
            this.isDragMoveCancelled = true;
            return;
        }
        else {
            this.isDragMoveCancelled = false;
        }
        if (this.dragClone) {
            var editorRect = this.parent.rootEditorElement.getBoundingClientRect();
            updateCSSText(this.parent.floatingIconAction.floatingIconContainer, 'display: flex;');
            var dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
            var dragIconRect = dragIcon.getBoundingClientRect();
            updateCSSText(this.parent.floatingIconAction.floatingIconContainer, 'display: none;');
            var scrollTop = this.parent.rootEditorElement.scrollTop;
            var scrollLeft = this.parent.rootEditorElement.scrollLeft;
            var totalHeight = Array.from(this.dragClone.children)
                .map(function (child) { return child.offsetHeight; })
                .reduce(function (sum, height) { return sum + height; }, 0);
            var cssText = "opacity: 0.7; left: " + (e.clientX - editorRect.left + dragIconRect.width + scrollLeft) + "px; top: " + (e.clientY - editorRect.top + scrollTop) + "px; width: " + this.parent.currentHoveredBlock.offsetWidth + "px; height: " + totalHeight + "px;";
            updateCSSText(this.dragClone, cssText);
            if (e.clientY < editorRect.top ||
                e.clientY > editorRect.bottom ||
                e.clientX < editorRect.left ||
                e.clientX > editorRect.right) {
                updateCSSText(this.dragClone, 'opacity: 0;');
            }
        }
        // To prevent the flickering of the drop indicator when drag towards up
        setTimeout(function () {
            _this.updateDropIndicator();
        }, 50);
    };
    DragAndDropAction.prototype.handleDragStart = function (e) {
        this.isDragCompleted = false;
        this.isDragMoveCancelled = false;
        var editorBlocks = this.parent.getEditorBlocks();
        if (!e.target.classList.contains('e-block-drag-icon') || !this.parent.currentHoveredBlock) {
            return;
        }
        var selectedBlocks = [];
        var hoveredBlockId = this.parent.currentHoveredBlock.id;
        var isHoveredBlockInSelection = false;
        if (this.parent.editorMethods.getSelectedBlocks()) {
            isHoveredBlockInSelection = this.parent.editorMethods.getSelectedBlocks()
                .some(function (block) { return block.id === hoveredBlockId; });
        }
        var range = getSelectedRange();
        if (range && range.toString().trim().length > 0 && isHoveredBlockInSelection) {
            selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        }
        else {
            this.parent.nodeSelection.clearSelection();
            var blockModel = getBlockModelById(hoveredBlockId, editorBlocks);
            if (blockModel) {
                selectedBlocks.push(blockModel);
            }
        }
        this.draggedBlocks = selectedBlocks;
        this.filterDraggedBlocksToExcludeChildren();
        var eventArgs = {
            blocks: this.draggedBlocks,
            fromIndex: this.draggedBlocks.map(function (block) { return getBlockIndexById(block.id, editorBlocks); }),
            dropIndex: this.currentDropTarget ? getBlockIndexById(this.currentDropTarget.id, editorBlocks) : -1,
            event: e,
            target: this.currentDropTarget,
            cancel: false
        };
        this.parent.observer.notify('blockDragStart', eventArgs);
        if (eventArgs.cancel) {
            e.preventDefault();
            return;
        }
        this.dragClone = document.createElement('div');
        var cssText = 'position: absolute; opacity: 0; pointer-events: none;';
        updateCSSText(this.dragClone, cssText);
        this.dragClone.classList.add('e-be-dragging-clone');
        for (var _i = 0, selectedBlocks_1 = selectedBlocks; _i < selectedBlocks_1.length; _i++) {
            var block = selectedBlocks_1[_i];
            var blockElement = document.getElementById(block.id);
            if (blockElement) {
                this.dragClone.appendChild(blockElement.cloneNode(true));
            }
        }
        this.parent.blockContainer.appendChild(this.dragClone);
        var transparentImage = new Image();
        transparentImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 transparent pixel
        e.dataTransfer.setDragImage(transparentImage, 0, 0);
    };
    DragAndDropAction.prototype.handleDragStop = function (e) {
        var _this = this;
        if (isNOU(this.parent.currentHoveredBlock)) {
            return;
        }
        if (this.isDragMoveCancelled) {
            cleanupElement(this.dragClone);
            cleanupElement(this.dropIndicator);
            return;
        }
        e.preventDefault();
        this.isDragCompleted = true;
        var currentIndicatorBlock;
        if (this.dropIndicator) {
            currentIndicatorBlock = this.dropIndicator.closest('.' + constants.BLOCK_CLS);
        }
        var dropTarget;
        if (currentIndicatorBlock) {
            var hoveredBlockRect = this.parent.currentHoveredBlock.getBoundingClientRect();
            var isMovingDown = hoveredBlockRect.top < currentIndicatorBlock.getBoundingClientRect().top;
            if (!this.isIndicatorAtTop && !isMovingDown) {
                dropTarget = getAdjacentBlock(currentIndicatorBlock, 'next');
                if (isNOU(dropTarget)) {
                    dropTarget = currentIndicatorBlock;
                }
            }
            else {
                dropTarget = currentIndicatorBlock;
            }
        }
        var eventArgs = {
            blocks: this.draggedBlocks.map(function (block) { return block; }),
            fromIndex: this.draggedBlocks.map(function (block) { return getBlockIndexById(block.id, _this.parent.getEditorBlocks()); }),
            dropIndex: dropTarget ? getBlockIndexById(dropTarget.id, this.parent.getEditorBlocks()) : -1,
            event: e,
            target: dropTarget
        };
        this.parent.observer.notify('blockDropped', eventArgs);
        cleanupElement(this.dragClone);
        cleanupElement(this.dropIndicator);
        if (dropTarget && dropTarget !== this.parent.currentHoveredBlock) {
            this.reorderBlocks(this.draggedBlocks, dropTarget);
            this.parent.listPlugin.recalculateMarkersForListItems();
        }
        this.draggedBlocks = [];
    };
    DragAndDropAction.prototype.reorderBlocks = function (draggedBlocks, dropTarget) {
        this.parent.execCommand({ command: 'MoveBlock', state: {
                fromBlockIds: draggedBlocks.map(function (block) { return block.id; }),
                toBlockId: dropTarget.id
            } });
    };
    DragAndDropAction.prototype.filterDraggedBlocksToExcludeChildren = function () {
        var draggedBlockIds = new Set(this.draggedBlocks.map(function (block) { return block.id; }));
        this.draggedBlocks = this.draggedBlocks.filter(function (block) {
            // If block has a parentId and that parent is also in draggedBlocks, exclude this block
            return !block.parentId || !draggedBlockIds.has(block.parentId);
        });
    };
    DragAndDropAction.prototype.isNestedBlockType = function (blockType) {
        var nestedBlockTypes = [
            BlockType.Quote,
            BlockType.Callout,
            BlockType.CollapsibleParagraph,
            BlockType.CollapsibleHeading
        ];
        return nestedBlockTypes.indexOf(blockType) > -1;
    };
    DragAndDropAction.prototype.hasNestedBlockInDraggedBlocks = function () {
        var _this = this;
        return this.draggedBlocks.some(function (block) {
            return _this.isNestedBlockType(block.blockType);
        });
    };
    DragAndDropAction.prototype.isDropTargetInsideNestedBlock = function () {
        var currentElement = this.currentDropTarget;
        while (currentElement && currentElement !== this.parent.blockContainer) {
            var blockElement = currentElement.closest('.' + constants.BLOCK_CLS);
            if (blockElement) {
                var blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
                if (blockModel && this.isNestedBlockType(blockModel.blockType)) {
                    return true;
                }
            }
            currentElement = blockElement ? blockElement.parentElement : null;
        }
        return false;
    };
    DragAndDropAction.prototype.updateDropIndicator = function () {
        var _this = this;
        if (this.isDragCompleted ||
            !this.currentDropTarget ||
            this.currentDropTarget === this.parent.currentHoveredBlock ||
            this.draggedBlocks.some(function (block) { return block.id === _this.currentDropTarget.id; })) {
            cleanupElement(this.dropIndicator);
            return;
        }
        // Restrict drop indicator for nested block scenarios
        if (this.hasNestedBlockInDraggedBlocks() && this.isDropTargetInsideNestedBlock()) {
            cleanupElement(this.dropIndicator);
            return;
        }
        if (!this.dropIndicator) {
            this.dropIndicator = document.createElement('div');
            this.dropIndicator.classList.add('e-be-drop-indicator');
        }
        var hoverdBlockRect = this.parent.currentHoveredBlock.getBoundingClientRect();
        var dropTargetRect = this.currentDropTarget.getBoundingClientRect();
        var middleY = dropTargetRect.top + (dropTargetRect.height / 2);
        var draggedBlockRect;
        if (this.dragClone) {
            draggedBlockRect = this.dragClone.children[0].getBoundingClientRect();
        }
        if (isNOU(draggedBlockRect) || isNOU(hoverdBlockRect)) {
            return;
        }
        if (hoverdBlockRect.top > draggedBlockRect.top) {
            this.handleDraggingAbove(middleY, draggedBlockRect);
        }
        else {
            this.handleDraggingBelow(middleY, draggedBlockRect);
        }
        var currentIndicatorBlock = this.dropIndicator.closest('.' + constants.BLOCK_CLS);
        if (!currentIndicatorBlock) {
            return;
        }
        var indicatorBlockModel = getBlockModelById(currentIndicatorBlock.id, this.parent.getEditorBlocks());
        var specialTypes = [BlockType.Divider, BlockType.CollapsibleParagraph, BlockType.CollapsibleHeading,
            BlockType.Callout, BlockType.Quote, BlockType.Table, BlockType.Image, BlockType.Code];
        var isSpecialType = (specialTypes.indexOf(indicatorBlockModel.blockType) > -1);
        if (isSpecialType) {
            updateCSSText(this.dropIndicator, 'left: 46px;');
            return;
        }
        var blockContent = getBlockContentElement(currentIndicatorBlock);
        if (!blockContent) {
            return;
        }
        var leftOffset = blockContent.getBoundingClientRect().left - currentIndicatorBlock.getBoundingClientRect().left;
        updateCSSText(this.dropIndicator, "left: " + leftOffset + "px;");
    };
    DragAndDropAction.prototype.handleDraggingAbove = function (middleY, draggedBlockRect) {
        if (draggedBlockRect && draggedBlockRect.top < middleY) {
            var adjecentBLockEle = this.currentDropTarget.previousElementSibling;
            if (adjecentBLockEle) {
                if (!this.checkAndInsertIndicatorInListBlock(adjecentBLockEle, true)) {
                    adjecentBLockEle.appendChild(this.dropIndicator);
                }
                this.isIndicatorAtTop = false;
            }
            else {
                if (!this.checkAndInsertIndicatorInListBlock(this.currentDropTarget, false)) {
                    this.currentDropTarget.prepend(this.dropIndicator);
                }
                this.isIndicatorAtTop = true;
            }
        }
    };
    DragAndDropAction.prototype.handleDraggingBelow = function (middleY, draggedBlockRect) {
        if (draggedBlockRect && draggedBlockRect.top > middleY) {
            if (!this.checkAndInsertIndicatorInListBlock(this.currentDropTarget, true)) {
                this.currentDropTarget.appendChild(this.dropIndicator);
            }
            this.isIndicatorAtTop = false;
        }
    };
    DragAndDropAction.prototype.checkAndInsertIndicatorInListBlock = function (element, isAfter) {
        if (isListTypeBlock(element.getAttribute('data-block-type'))) {
            var listItem = element.querySelector('li');
            if (listItem) {
                listItem.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', this.dropIndicator);
                return true;
            }
        }
        return false;
    };
    DragAndDropAction.prototype.destroy = function () {
        this.unwireDragEvents();
    };
    return DragAndDropAction;
}());
export { DragAndDropAction };
