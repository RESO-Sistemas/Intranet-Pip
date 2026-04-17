import { BlockManager } from '../base/block-manager';
export declare class FloatingIcon {
    private parent;
    floatingIconContainer: HTMLElement;
    /**
     * Creates a new FloatingIcon instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager: BlockManager);
    wireGlobalEvents(): void;
    unWireGlobalEvents(): void;
    private handleFloatingIconsCreated;
    /**
     * Shows the floating icons
     *
     * @param {HTMLElement} target - The target element to show the floating icons for.
     * @returns {void}
     * @hidden
     */
    showFloatingIcons(target: HTMLElement): void;
    /**
     * Hides the drag icon for empty block
     *
     * @param {HTMLElement} target - The target element to show the floating icons for.
     * @returns {void}
     * @hidden
     */
    hideDragIconForEmptyBlock(target: HTMLElement): void;
    /**
     * Hides the floating icons
     *
     * @returns {void}
     * @hidden
     */
    hideFloatingIcons(): void;
    private handleDragIconClick;
    private handleAddIconClick;
    private isFullyVisibleInEditor;
    destroy(): void;
}
