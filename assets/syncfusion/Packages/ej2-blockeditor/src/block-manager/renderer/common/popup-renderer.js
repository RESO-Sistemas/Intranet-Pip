import { Popup } from '@syncfusion/ej2-popups';
import { addClass, removeClass, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { getElementRect } from '../../../common/utils/dom';
/**
 * `Popup renderer` module is used to render popup in BlockEditor.
 *
 * @hidden
 */
var PopupRenderer = /** @class */ (function () {
    function PopupRenderer(manager) {
        this.parent = manager;
        this.editorElement = this.parent.rootEditorElement;
    }
    /**
     * Renders popup in BlockEditor.
     *
     * @param {IPopupRenderOptions} args - specifies  the arguments.
     * @returns {Popup} - returns the popup object.
     * @hidden
     */
    PopupRenderer.prototype.renderPopup = function (args) {
        var element = args.element;
        if (typeof element == 'string') {
            element = document.querySelector(element);
        }
        var popupObj = new Popup(element, {
            targetType: 'relative',
            relateTo: args.relateTo || this.editorElement,
            content: args.content,
            collision: { X: 'fit', Y: 'fit' },
            actionOnScroll: 'hide',
            showAnimation: {
                name: 'FadeIn'
            },
            width: args.width,
            height: args.height
        });
        popupObj.hide();
        return popupObj;
    };
    /**
     * Adjusts the popup position relative to the target element.
     *
     * @param {HTMLElement | Range} target - specifies the target element.
     * @param {Popup | Dialog} popup - specifies the popup object.
     * @returns {void}
     * @hidden
     */
    PopupRenderer.prototype.adjustPopupPositionRelativeToTarget = function (target, popup) {
        var isInlineTbar = popup.element.classList.contains('e-blockeditor-inline-toolbar-popup');
        var isblkActionPopup = popup.element.classList.contains('e-blockeditor-blockaction-popup');
        var isTableGripperPopup = popup.element.classList.contains('e-table-gripper-action-popup');
        var isImageUploadPopup = popup.element.classList.contains('e-image-upload-popup');
        if (isblkActionPopup) {
            this.positionBlockActionPopup(target, popup);
        }
        else if (isInlineTbar) {
            this.positionInlineToolbar(target, popup);
        }
        else if (isTableGripperPopup) {
            this.positionTableGripperActionPopup(target, popup);
        }
        else if (isImageUploadPopup) {
            this.positionImageUploadPopup(target, popup);
        }
    };
    PopupRenderer.prototype.positionBlockActionPopup = function (target, popup) {
        addClass([popup.element], 'e-be-action-popup-hide');
        var targetRect = target.getBoundingClientRect();
        var popupRect = popup.element.getBoundingClientRect();
        var editorRect = getElementRect(this.editorElement);
        var editorScrollTop = this.editorElement.scrollTop || 0;
        var adjustedX = targetRect.left - editorRect.left;
        var adjustedY = targetRect.top + editorScrollTop - editorRect.top + 30;
        // To position popup above the drag icon when it overflows out of editor.
        if (targetRect.bottom + popupRect.height > editorRect.bottom) {
            adjustedY = adjustedY - popupRect.height - targetRect.height - 15;
        }
        popup.position.X = adjustedX;
        popup.position.Y = adjustedY;
        removeClass([popup.element], 'e-be-action-popup-hide');
        popup.dataBind();
    };
    /**
     * Positions the image upload popup relative to the placeholder element.
     * The popup will appear below the placeholder if there's space, otherwise above.
     * Handles scroll offsets correctly.
     *
     * @param {HTMLElement} target - The placeholder element (target for positioning)
     * @param {Popup} popup - The image upload popup object
     * @returns {void}
     * @private
     */
    PopupRenderer.prototype.positionImageUploadPopup = function (target, popup) {
        // Hide popup temporarily while calculating position
        addClass([popup.element], 'e-image-popup-hide');
        // Get the block element (parent of placeholder)
        var blockElement = target.closest('.e-block');
        if (!blockElement || !target) {
            return;
        }
        // Get dimensions and positions
        var blockRect = blockElement.getBoundingClientRect();
        var targetRect = target.getBoundingClientRect();
        var popupRect = popup.element.getBoundingClientRect();
        var editorRect = getElementRect(this.editorElement);
        var viewportHeight = window.innerHeight;
        // Calculate scroll offset
        var editorScrollTop = this.editorElement.scrollTop || 0;
        // Calculate relative X position (align with left edge of block)
        var adjustedX = targetRect.left - editorRect.left;
        // Calculate space available below and above the block
        var spaceBelow = viewportHeight - blockRect.bottom;
        var spaceAbove = blockRect.top;
        // Determine Y position based on available space
        var adjustedY;
        var popupOffset = 4; // Gap between block and popup
        if (spaceBelow >= popupRect.height || spaceBelow >= spaceAbove) {
            // Position below the block
            adjustedY = targetRect.bottom - editorRect.top + editorScrollTop + popupOffset;
        }
        else {
            // Position above the block
            adjustedY = targetRect.top - editorRect.top + editorScrollTop - popupRect.height - popupOffset;
        }
        // Set popup position
        popup.position.X = adjustedX;
        popup.position.Y = adjustedY;
        // Show popup and apply position
        removeClass([popup.element], 'e-image-popup-hide');
        popup.dataBind();
    };
    PopupRenderer.prototype.positionInlineToolbar = function (target, popup) {
        addClass([popup.element], 'e-be-inline-tlbr-hide');
        var popupRect = popup.element.getBoundingClientRect();
        var relativeElem = this.parent.currentFocusedBlock;
        if (isNOU(relativeElem)) {
            return;
        }
        var selection = this.parent.nodeSelection.getSelection();
        var clientRects = target.getClientRects();
        var direction = this.getSelectionDirection(selection);
        var rangeDomRect = clientRects.length === 0 ? target.getBoundingClientRect() :
            direction === 'Backward' ? clientRects[0] : clientRects[clientRects.length - 1];
        var offsetCalculationParam = {
            blockElement: relativeElem,
            blockRect: relativeElem.getBoundingClientRect(),
            range: target,
            rangeRect: rangeDomRect,
            direction: direction,
            contentPanelElement: this.parent.rootEditorElement,
            editPanelDomRect: this.parent.blockContainer.getBoundingClientRect(),
            popupRect: popupRect
        };
        var offsetX = this.calculateOffsetX(offsetCalculationParam);
        var offsetY = this.calculateOffsetY(offsetCalculationParam);
        var positionProps = {
            positionX: offsetX,
            positionY: offsetY
        };
        positionProps = this.handleVerticalCollision(offsetCalculationParam, positionProps);
        var popupProps = {
            offsetX: positionProps.positionX,
            offsetY: positionProps.positionY,
            relateTo: relativeElem
        };
        removeClass([popup.element], 'e-be-inline-tlbr-hide');
        popup.setProperties(popupProps);
        popup.dataBind();
    };
    // To calculate the popup offsetX position based on the range and block element position.
    PopupRenderer.prototype.calculateOffsetX = function (args) {
        var width = args.popupRect.width;
        var finalX;
        var buffer = 16.5; // A small gap between selection and popup
        var rangeEdge = args.direction === 'Backward' ? args.rangeRect.left : args.rangeRect.right;
        var relativePosition = rangeEdge - args.blockRect.left;
        if (relativePosition < width / 4) {
            finalX = relativePosition - buffer;
        }
        else if (relativePosition > width / 4 && relativePosition < width / 2) {
            finalX = relativePosition - width / 4;
        }
        else if (relativePosition > width / 2 && relativePosition < (width * 3 / 4)) {
            finalX = relativePosition - width / 2;
        }
        else if (relativePosition > (width * 3 / 4) && relativePosition < width) {
            finalX = relativePosition - (width * 3 / 4);
        }
        else {
            finalX = relativePosition - width + buffer;
        }
        return finalX;
    };
    // To calculate the popup offsetY position based on the range and block element position.
    PopupRenderer.prototype.calculateOffsetY = function (args) {
        var finalY = args.rangeRect.bottom - args.blockRect.top + 6;
        return finalY;
    };
    PopupRenderer.prototype.getSelectionDirection = function (selection) {
        if (selection && selection.rangeCount > 0 && selection.getRangeAt(0).collapsed) {
            return 'Forward';
        }
        var range = new Range();
        range.setStart(selection.anchorNode, selection.anchorOffset);
        range.setEnd(selection.focusNode, selection.focusOffset);
        if (range.collapsed) {
            return 'Backward';
        }
        else {
            return 'Forward';
        }
    };
    PopupRenderer.prototype.handleVerticalCollision = function (offsetParams, positionProps) {
        var scrollTopParentElement = this.parent.scrollParentElements && this.parent.scrollParentElements.length > 0 &&
            this.parent.scrollParentElements[0].nodeName !== '#document' ? this.parent.scrollParentElements[0] : this.parent.rootEditorElement;
        var scrollParentRect = scrollTopParentElement.getBoundingClientRect();
        var blockRect = offsetParams.blockRect;
        var topViewPortSpace = blockRect.top;
        var botViewPortSpace = blockRect.bottom;
        var spaceAbove = this.getSpaceAbove(offsetParams, scrollParentRect);
        var spaceBelow = this.getSpaceBelow(offsetParams, scrollParentRect);
        var totalPopupHeight = (10 + offsetParams.popupRect.height); // 10 si for tip pointer height
        var isTopPosition = this.isElemVisible(blockRect, 'top') && spaceAbove > totalPopupHeight && topViewPortSpace > totalPopupHeight;
        var isBotPosition = offsetParams.direction === 'Backward' && isTopPosition ? false : this.isElemVisible(blockRect, 'bottom') && spaceBelow > totalPopupHeight && botViewPortSpace > totalPopupHeight;
        if (isBotPosition) {
            return positionProps; // Default Bottom position no need to change offset.
        }
        else if (isTopPosition) {
            positionProps.positionY = -(offsetParams.popupRect.height + 10) + (offsetParams.rangeRect.top - offsetParams.blockRect.top);
        }
        return positionProps;
    };
    PopupRenderer.prototype.getSpaceAbove = function (args, scrollParentRect) {
        var spaceAbove;
        var blockRect = args.blockRect;
        var parentRect = args.editPanelDomRect;
        var collision = this.getTopCollisionType(blockRect, parentRect, scrollParentRect);
        switch (collision) {
            case 'ParentElement':
                spaceAbove = blockRect.top - parentRect.top;
                break;
            case 'ScrollableContainer':
                spaceAbove = scrollParentRect.top - parentRect.top;
                break;
            case 'ViewPort':
            case 'Hidden':
                spaceAbove = blockRect.top;
                break;
        }
        return spaceAbove;
    };
    PopupRenderer.prototype.getSpaceBelow = function (args, scrollParentRect) {
        var spaceBelow;
        var blockRect = args.blockRect;
        var parentRect = args.editPanelDomRect;
        var collision = this.getBottomCollisionType(blockRect, parentRect, scrollParentRect);
        switch (collision) {
            case 'Hidden':
            case 'ParentElement':
                spaceBelow = parentRect.bottom - blockRect.bottom;
                break;
            case 'ScrollableContainer':
                spaceBelow = scrollParentRect.bottom - blockRect.bottom;
                break;
            case 'ViewPort':
                spaceBelow = window.innerHeight - blockRect.bottom;
                break;
        }
        if ((window.innerHeight - blockRect.bottom) < (args.popupRect.height + 10)) { // check this 10 is tip pointer height
            spaceBelow = 0;
        }
        return spaceBelow;
    };
    PopupRenderer.prototype.getTopCollisionType = function (blockRect, parentRect, scrollParentRect) {
        if (blockRect.top < 0 || blockRect.top >= window.innerHeight) {
            return 'Hidden';
        }
        else {
            if (parentRect.top > 0) {
                return 'ParentElement';
            }
            else {
                if (scrollParentRect.top < 0) {
                    return 'ViewPort';
                }
                if (scrollParentRect.top > 0) {
                    return 'ScrollableContainer';
                }
            }
        }
        return 'ParentElement';
    };
    PopupRenderer.prototype.getBottomCollisionType = function (blockRect, parentRect, scrollParentRect) {
        if (blockRect.bottom < 0 || blockRect.bottom >= window.innerHeight) {
            return 'Hidden';
        }
        else {
            if (scrollParentRect.bottom >= window.innerHeight && parentRect.bottom >= window.innerHeight) {
                return 'ViewPort';
            }
            else {
                if (parentRect.bottom <= scrollParentRect.bottom) {
                    return 'ParentElement';
                }
                else {
                    return 'ScrollableContainer';
                }
            }
        }
    };
    // Returns true when the eleemnt is partially visible. Returns false when the element is not fully visible.
    PopupRenderer.prototype.isElemVisible = function (elemRect, value) {
        if (value === 'top') {
            return elemRect.top >= 0 && elemRect.top <= window.innerHeight;
        }
        else {
            return elemRect.bottom <= window.innerHeight && elemRect.bottom >= 0;
        }
    };
    PopupRenderer.prototype.positionTableGripperActionPopup = function (target, popup) {
        addClass([popup.element], 'e-be-gripper-action-popup-hide');
        var isColumnGripper = target.classList.contains('e-col-action-handle');
        var popupRect = popup.element.getBoundingClientRect();
        var targetRect = target.getBoundingClientRect();
        var editorRect = this.editorElement.getBoundingClientRect();
        var scrollTop = this.editorElement.scrollTop;
        var offsetX = (targetRect.left - editorRect.left) + (isColumnGripper ? (targetRect.width / 2 - popupRect.width / 2) : 0);
        var offsetY = targetRect.top + scrollTop - editorRect.top - popupRect.height - 5;
        popup.position.X = offsetX;
        popup.position.Y = offsetY;
        removeClass([popup.element], 'e-be-gripper-action-popup-hide');
        popup.dataBind();
    };
    PopupRenderer.prototype.destroyPopup = function (popup) {
        if (popup) {
            popup.destroy();
            popup.element.remove();
        }
    };
    return PopupRenderer;
}());
export { PopupRenderer };
