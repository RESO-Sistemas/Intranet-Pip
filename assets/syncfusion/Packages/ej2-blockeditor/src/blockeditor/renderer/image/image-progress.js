import { createElement, detach, getUniqueID, updateCSSText } from '@syncfusion/ej2-base';
/**
 * ImageProgressRender manages the ProgressBar component for upload progress display.
 *
 * @hidden
 */
var ImageProgressRenderer = /** @class */ (function () {
    function ImageProgressRenderer(editor, imgElement) {
        this.editor = editor;
        this.imgElement = imgElement;
        this.imageContainer = imgElement.parentElement;
        this.progressBarObj = null;
        this.progressElement = null;
        this.progressContainer = null;
        this.lastUpdatePercent = 0;
        this.badgeElement = null;
        this.badgeTimeoutId = null;
        this.uniqueId = getUniqueID('progress');
        this.initialize();
    }
    ImageProgressRenderer.prototype.initialize = function () {
        this.progressContainer = createElement('div', {
            id: this.editor.element.id + "_progress-container-" + this.uniqueId,
            className: 'e-progress-container e-hidden'
        });
        updateCSSText(this.progressContainer, 'line-height: 0;');
        // Create progress bar element with unique ID to avoid conflicts with multiple simultaneous uploads
        this.progressElement = createElement('div', {
            id: this.editor.element.id + "_progress-bar-" + this.uniqueId,
            className: 'e-image-progress-bar'
        });
        this.progressContainer.appendChild(this.progressElement);
        // Calculate width from image element (already in DOM)
        var targetWidth = this.imgElement.offsetWidth || this.imageContainer.offsetWidth || this.imgElement.clientWidth;
        this.progressBarObj = this.editor.progressBarRenderer.renderProgressBar({
            element: this.progressElement,
            type: 'Linear',
            height: '4px',
            value: 0,
            minimum: 0,
            maximum: 100,
            width: targetWidth.toString(),
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            animation: {
                enable: true,
                duration: 200,
                delay: 0
            },
            showProgressValue: false,
            progressThickness: 4,
            trackThickness: 4
        });
        this.imageContainer.insertBefore(this.progressContainer, this.imageContainer.firstChild);
    };
    /**
     * Shows the progress bar.
     *
     * @returns {void}
     * @hidden
     */
    ImageProgressRenderer.prototype.show = function () {
        if (this.progressContainer) {
            this.progressContainer.classList.remove('e-hidden');
            this.reset();
        }
    };
    ImageProgressRenderer.prototype.hide = function (callback) {
        var _this = this;
        if (this.progressContainer) {
            // Add a small delay to show 100% completion before hiding
            setTimeout(function () {
                if (_this.progressContainer) {
                    _this.progressContainer.classList.add('e-hidden');
                    _this.reset();
                }
                // Execute callback after hiding if provided
                if (callback) {
                    callback();
                }
            }, 100);
        }
    };
    /**
     * Updates the progress bar value.
     * Uses 10% increment throttling with requestAnimationFrame for smooth updates.
     * @param {number} percent - Progress percentage
     *
     * @returns {void}
     * @hidden
     */
    ImageProgressRenderer.prototype.updateProgress = function (percent) {
        var currentPercent = Math.min(100, Math.max(0, percent));
        // Update at 10% increments OR when complete
        if (currentPercent - this.lastUpdatePercent >= 10 || currentPercent === 100 || currentPercent === 0) {
            this.performUpdate(currentPercent);
            this.lastUpdatePercent = currentPercent;
        }
    };
    ImageProgressRenderer.prototype.performUpdate = function (percent) {
        // Update progress bar value
        if (this.progressBarObj) {
            this.progressBarObj.value = percent;
        }
    };
    ImageProgressRenderer.prototype.reset = function () {
        this.lastUpdatePercent = 0;
        if (this.progressBarObj) {
            this.progressBarObj.value = 0;
        }
    };
    /**
     * Checks if progress bar is visible.
     *
     * @returns {boolean} - returns a bool to check if progress bar is visible.
     * @hidden
     */
    ImageProgressRenderer.prototype.isVisible = function () {
        return this.progressContainer ? !this.progressContainer.classList.contains('e-hidden') : false;
    };
    /**
     * Shows a success badge with tick icon at the top-right corner.
     * Badge automatically hides after 1 second.
     *
     * @returns {void}
     * @hidden
     */
    ImageProgressRenderer.prototype.showSuccessBadge = function () {
        this.showBadge('success', 'e-badge-success', 'e-be-check');
    };
    /**
     * Shows an error badge with error icon at the top-right corner.
     * Badge automatically hides after 1 second.
     *
     * @returns {void}
     * @hidden
     */
    ImageProgressRenderer.prototype.showErrorBadge = function () {
        this.showBadge('error', 'e-badge-danger', 'e-be-close');
    };
    ImageProgressRenderer.prototype.showBadge = function (type, badgeClass, iconClass) {
        var _this = this;
        // Remove any existing badge first
        this.removeBadge();
        var badge = type === 'success' ? 'badgeSuccess' : 'badgeError';
        var ariaLable = this.editor.blockManager.localeJson['tabHeaderUpload'] + " " + this.editor.blockManager.localeJson["" + badge];
        // Create badge container
        this.badgeElement = createElement('span', {
            className: "e-badge e-badge-circle e-icons " + iconClass + " " + badgeClass,
            attrs: {
                'role': 'status',
                'aria-label': "" + ariaLable
            }
        });
        // Append to image container
        this.imageContainer.appendChild(this.badgeElement);
        // Auto-remove after 1 second
        this.badgeTimeoutId = window.setTimeout(function () {
            _this.removeBadge();
        }, 1000);
    };
    ImageProgressRenderer.prototype.removeBadge = function () {
        // Clear timeout if exists
        if (this.badgeTimeoutId !== null) {
            clearTimeout(this.badgeTimeoutId);
            this.badgeTimeoutId = null;
        }
        // Remove badge element
        if (this.badgeElement && this.badgeElement.parentElement) {
            detach(this.badgeElement);
            this.badgeElement = null;
        }
    };
    ImageProgressRenderer.prototype.destroy = function () {
        // Remove badge
        this.removeBadge();
        // Destroy progress bar
        if (this.progressBarObj) {
            this.progressBarObj.destroy();
            this.progressBarObj = null;
        }
        // Remove progress container
        if (this.progressContainer && this.progressContainer.parentElement) {
            detach(this.progressContainer);
            this.progressContainer = null;
        }
        // Clear references
        this.progressElement = null;
        this.lastUpdatePercent = 0;
    };
    return ImageProgressRenderer;
}());
export { ImageProgressRenderer };
