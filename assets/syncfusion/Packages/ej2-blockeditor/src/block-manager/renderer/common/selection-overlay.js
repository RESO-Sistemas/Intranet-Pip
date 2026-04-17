import { createElement } from '@syncfusion/ej2-base';
/**
 * Selection overlay to visually indicate a selection over a target content element.
 * It draws an absolutely positioned box inside the editor root, without affecting layout.
 */
var SelectionOverlay = /** @class */ (function () {
    function SelectionOverlay(manager) {
        this.overlayEl = null;
        this.selectionOverlayInfo = null;
        this.parent = manager;
    }
    SelectionOverlay.prototype.show = function (targetId) {
        var el = this.ensureOverlay();
        this.positionTo(targetId);
        el.style.display = 'block';
    };
    SelectionOverlay.prototype.hide = function () {
        if (this.overlayEl) {
            this.overlayEl.style.display = 'none';
        }
    };
    SelectionOverlay.prototype.reposition = function () {
        if (!this.overlayEl || this.overlayEl.style.display === 'none') {
            return;
        }
        var targetId = this.overlayEl.getAttribute('data-target-id');
        this.positionTo(targetId);
    };
    SelectionOverlay.prototype.destroy = function () {
        if (this.overlayEl && this.overlayEl.parentElement) {
            this.overlayEl.parentElement.removeChild(this.overlayEl);
        }
        this.overlayEl = null;
    };
    SelectionOverlay.prototype.clearSelectionOverlay = function () {
        var dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
        if (dragIcon) {
            dragIcon.classList.remove('e-drag-icon-selected');
        }
        this.selectionOverlayInfo = null;
        if (this.parent.selectionOverlay) {
            this.parent.selectionOverlay.hide();
        }
    };
    SelectionOverlay.prototype.ensureOverlay = function () {
        if (this.overlayEl && this.overlayEl.parentElement) {
            return this.overlayEl;
        }
        var overlay = createElement('div', {
            className: 'e-be-selection-overlay'
        });
        overlay.id = this.parent.rootEditorElement.id + '_softSelOverlay';
        overlay.style.display = 'none';
        this.parent.rootEditorElement.appendChild(overlay);
        this.overlayEl = overlay;
        return overlay;
    };
    SelectionOverlay.prototype.positionTo = function (targetId) {
        var isMultipleBlockSeleceted = this.parent.editorMethods.getSelectedBlocks() && this.parent.editorMethods.getSelectedBlocks().length > 1;
        if (this.overlayEl && !isMultipleBlockSeleceted) {
            var targetBlock = this.parent.getBlockElementById(targetId);
            if (targetBlock) {
                var rootRect = this.parent.rootEditorElement.getBoundingClientRect();
                var targetRect = targetBlock.getBoundingClientRect();
                var isRtl = this.parent.rootEditorElement.classList.contains('e-rtl');
                var styles = getComputedStyle(targetBlock);
                var paddingLeft = styles.getPropertyValue('padding-left');
                var marginLeft = styles.getPropertyValue('margin-left');
                var paddingRight = styles.getPropertyValue('padding-right');
                var marginRight = styles.getPropertyValue('margin-right');
                var left = (targetRect.left - rootRect.left + parseInt(paddingLeft, 10) - parseInt(marginLeft, 10) +
                    (!isRtl ? -3 : parseInt(paddingRight, 10) - 6.5 + parseInt(marginRight, 10))) +
                    this.parent.rootEditorElement.scrollLeft;
                var top_1 = (targetRect.top - rootRect.top) + this.parent.rootEditorElement.scrollTop;
                this.overlayEl.style.left = left + 'px';
                this.overlayEl.style.top = top_1 + 'px';
                this.overlayEl.style.width = targetRect.width - 50 - (parseInt(targetBlock.style.getPropertyValue('--block-indent'), 10)) + 'px';
                this.overlayEl.style.height = targetRect.height + 'px';
                this.overlayEl.setAttribute('data-target-id', targetId);
            }
        }
    };
    return SelectionOverlay;
}());
export { SelectionOverlay };
