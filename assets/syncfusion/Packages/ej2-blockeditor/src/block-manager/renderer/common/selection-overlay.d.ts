import { BlockManager } from '../../../block-manager/base/block-manager';
/**
 * Selection overlay to visually indicate a selection over a target content element.
 * It draws an absolutely positioned box inside the editor root, without affecting layout.
 */
export declare class SelectionOverlay {
    private parent;
    private overlayEl;
    selectionOverlayInfo: {
        element: HTMLElement;
        direction: 'previous' | 'next';
    } | null;
    constructor(manager: BlockManager);
    show(targetId: string): void;
    hide(): void;
    reposition(): void;
    destroy(): void;
    clearSelectionOverlay(): void;
    private ensureOverlay;
    private positionTo;
}
