import { BlockEditor } from '../../base/blockeditor';
/**
 * ImageProgressRender manages the ProgressBar component for upload progress display.
 *
 * @hidden
 */
export declare class ImageProgressRenderer {
    private editor;
    private imgElement;
    private imageContainer;
    private progressBarObj;
    private progressElement;
    private progressContainer;
    private lastUpdatePercent;
    private badgeElement;
    private badgeTimeoutId;
    private uniqueId;
    constructor(editor: BlockEditor, imgElement: HTMLImageElement);
    private initialize;
    /**
     * Shows the progress bar.
     *
     * @returns {void}
     * @hidden
     */
    show(): void;
    hide(callback?: () => void): void;
    /**
     * Updates the progress bar value.
     * Uses 10% increment throttling with requestAnimationFrame for smooth updates.
     * @param {number} percent - Progress percentage
     *
     * @returns {void}
     * @hidden
     */
    updateProgress(percent: number): void;
    private performUpdate;
    private reset;
    /**
     * Checks if progress bar is visible.
     *
     * @returns {boolean} - returns a bool to check if progress bar is visible.
     * @hidden
     */
    isVisible(): boolean;
    /**
     * Shows a success badge with tick icon at the top-right corner.
     * Badge automatically hides after 1 second.
     *
     * @returns {void}
     * @hidden
     */
    showSuccessBadge(): void;
    /**
     * Shows an error badge with error icon at the top-right corner.
     * Badge automatically hides after 1 second.
     *
     * @returns {void}
     * @hidden
     */
    showErrorBadge(): void;
    private showBadge;
    private removeBadge;
    destroy(): void;
}
