import { BlockManager } from '../base/block-manager';
export declare class MentionAction {
    private parent;
    constructor(manager: BlockManager);
    private wireEvents;
    private unWireEvents;
    onMentionOpen(): void;
    /**
     * Cleans the artifacts of mention control in BlockEditor such as mention chip and zero width space.
     *
     * @param {HTMLElement} element - specifies the element.
     * @param {boolean} isRemoveChip - specifies whether to remove the mention chip
     * @returns {void}
     * @hidden
     */
    cleanMentionArtifacts(element: HTMLElement, isRemoveChip?: boolean): void;
    /**
     * Removes the mention query keys from the block model.
     * When triggering command such as '/' or the filter queries, this function effectively cleans it in the block model
     *
     * @param {string} mentionChar - specifies the mention character.
     * @param {boolean} isUndoRedoAction - specifies whether the action is undo/redo action.
     * @returns {void}
     * @hidden
     */
    removeMentionQueryKeysFromModel(mentionChar: string, isUndoRedoAction?: boolean): void;
    private destroy;
}
