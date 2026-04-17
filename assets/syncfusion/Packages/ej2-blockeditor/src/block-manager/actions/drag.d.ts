import { BlockManager } from '../base/block-manager';
/**
 * Drag and Drop module is used to perform block reordering actions.
 */
export declare class DragAndDropAction {
    private parent;
    private dropIndicator;
    private currentDropTarget;
    private dragClone;
    private isDragCompleted;
    private isDragMoveCancelled;
    private draggedBlocks;
    private isIndicatorAtTop;
    constructor(manager: BlockManager);
    wireDragEvents(): void;
    unwireDragEvents(): void;
    private preventNoDropIcon;
    private updateCurrentDroppingTarget;
    private handleDragMove;
    private handleDragStart;
    private handleDragStop;
    private reorderBlocks;
    private filterDraggedBlocksToExcludeChildren;
    private isNestedBlockType;
    private hasNestedBlockInDraggedBlocks;
    private isDropTargetInsideNestedBlock;
    private updateDropIndicator;
    private handleDraggingAbove;
    private handleDraggingBelow;
    private checkAndInsertIndicatorInListBlock;
    destroy(): void;
}
