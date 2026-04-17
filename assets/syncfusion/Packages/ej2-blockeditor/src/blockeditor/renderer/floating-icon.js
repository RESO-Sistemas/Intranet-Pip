import { detach, updateCSSText } from '@syncfusion/ej2-base';
import { events } from '../../common/constant';
var FloatingIconRenderer = /** @class */ (function () {
    /**
     * Creates a new FloatingIconManager instance
     *
     * @param {BlockEditor} editor The parent BlockEditor instance
     */
    function FloatingIconRenderer(editor) {
        this.editor = editor;
        this.addEventListeners();
    }
    FloatingIconRenderer.prototype.addEventListeners = function () {
        this.editor.on(events.destroy, this.destroy, this);
    };
    FloatingIconRenderer.prototype.removeEventListeners = function () {
        this.editor.off(events.destroy, this.destroy);
    };
    /**
     * Creates the floating icons for the editor
     *
     * @returns {void}
     * @hidden
     */
    FloatingIconRenderer.prototype.createFloatingIcons = function () {
        this.floatingIconContainer = this.editor.createElement('div', { className: 'e-floating-icons', id: this.editor.element.id + "_floatingicons" });
        var addIcon = this.editor.createElement('span', { className: 'e-floating-icon e-icons e-block-add-icon' });
        var dragIcon = this.editor.createElement('span', { className: 'e-floating-icon e-icons e-block-drag-icon', attrs: { draggable: 'true' } });
        this.floatingIconContainer.appendChild(addIcon);
        this.floatingIconContainer.appendChild(dragIcon);
        var cssText = 'position: absolute; display: none; pointer-events: none;';
        updateCSSText(this.floatingIconContainer, cssText);
        this.editor.element.appendChild(this.floatingIconContainer);
        this.renderFloatingIconTooltips();
        this.editor.blockManager.observer.notify('floatingIconsCreated');
    };
    FloatingIconRenderer.prototype.renderFloatingIconTooltips = function () {
        this.addIconTooltip = this.editor.tooltipRenderer.renderTooltip({
            element: this.floatingIconContainer,
            target: '.e-block-add-icon',
            position: 'TopCenter',
            showTipPointer: true,
            windowCollision: true,
            cssClass: 'e-be-floating-icon-tooltip',
            content: this.getTooltipContent('add')
        });
        this.dragIconTooltip = this.editor.tooltipRenderer.renderTooltip({
            element: this.floatingIconContainer,
            target: '.e-block-drag-icon',
            position: 'TopCenter',
            showTipPointer: true,
            windowCollision: true,
            cssClass: 'e-be-floating-icon-tooltip',
            content: this.getTooltipContent('drag')
        });
    };
    FloatingIconRenderer.prototype.getTooltipContent = function (iconType) {
        if (iconType === 'add') {
            var spenEle = document.createElement('span');
            spenEle.textContent = this.editor.l10n.getConstant('addIconTooltip');
            return spenEle;
        }
        var container = document.createElement('div');
        container.innerHTML = "\n            <span>" + this.editor.l10n.getConstant('dragIconTooltipActionMenu') + "</span><br>\n            <span>" + this.editor.l10n.getConstant('dragIconTooltip') + "</span>\n        ";
        return container;
    };
    /**
     * Updates the tooltip content for the floating icons.
     *
     * @returns {void}
     * @hidden
     */
    FloatingIconRenderer.prototype.updateFloatingIconTooltipContent = function () {
        this.addIconTooltip.content = this.getTooltipContent('add');
        this.addIconTooltip.dataBind();
        this.dragIconTooltip.content = this.getTooltipContent('drag');
        this.dragIconTooltip.dataBind();
    };
    FloatingIconRenderer.prototype.destroy = function () {
        this.removeEventListeners();
        this.editor.tooltipRenderer.destroyTooltip(this.addIconTooltip);
        this.addIconTooltip = null;
        this.editor.tooltipRenderer.destroyTooltip(this.dragIconTooltip);
        this.dragIconTooltip = null;
        detach(this.floatingIconContainer);
        this.floatingIconContainer = null;
    };
    return FloatingIconRenderer;
}());
export { FloatingIconRenderer };
