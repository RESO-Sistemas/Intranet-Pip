import { getSelectedRange } from '../../common/utils/selection';
import { getBlockModelById, getContentModelByNode } from '../../common/utils/block';
import { events } from '../../common/constant';
var MentionAction = /** @class */ (function () {
    function MentionAction(manager) {
        this.parent = manager;
        this.wireEvents();
    }
    MentionAction.prototype.wireEvents = function () {
        this.parent.observer.on('mentionOpened', this.onMentionOpen, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    MentionAction.prototype.unWireEvents = function () {
        this.parent.observer.off('mentionOpened', this.onMentionOpen);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    MentionAction.prototype.onMentionOpen = function () {
        this.parent.nodeSelection.storeCurrentRange();
    };
    /**
     * Cleans the artifacts of mention control in BlockEditor such as mention chip and zero width space.
     *
     * @param {HTMLElement} element - specifies the element.
     * @param {boolean} isRemoveChip - specifies whether to remove the mention chip
     * @returns {void}
     * @hidden
     */
    MentionAction.prototype.cleanMentionArtifacts = function (element, isRemoveChip) {
        if (element) {
            var range = getSelectedRange();
            if (!range) {
                return;
            }
            var rangeParent = range.startContainer.nodeType === Node.TEXT_NODE
                ? range.startContainer.parentElement
                : range.startContainer;
            var insertedChip = rangeParent.querySelector('span[class="e-mention-chip"]');
            if (insertedChip && isRemoveChip) {
                insertedChip.remove();
            }
        }
    };
    /**
     * Removes the mention query keys from the block model.
     * When triggering command such as '/' or the filter queries, this function effectively cleans it in the block model
     *
     * @param {string} mentionChar - specifies the mention character.
     * @param {boolean} isUndoRedoAction - specifies whether the action is undo/redo action.
     * @returns {void}
     * @hidden
     */
    MentionAction.prototype.removeMentionQueryKeysFromModel = function (mentionChar, isUndoRedoAction) {
        var rangePath = this.parent.nodeSelection.getStoredBackupRange();
        if ((!rangePath || isUndoRedoAction) ||
            (rangePath && (!rangePath.startContainer || !rangePath.endContainer))) {
            return;
        }
        var startContainer = rangePath.startContainer, startOffset = rangePath.startOffset, endOffset = rangePath.endOffset, contentElement = rangePath.contentElement;
        var blockEl = this.parent.currentFocusedBlock;
        var block = getBlockModelById(blockEl.id, this.parent.getEditorBlocks());
        var targetNode = document.contains(startContainer) ? startContainer : contentElement;
        if (!block || !block.content || block.content.length === 0) {
            return;
        }
        var affectedContent = getContentModelByNode(targetNode, this.parent.getEditorBlocks());
        if (!affectedContent || !affectedContent.content) {
            return;
        }
        var text = affectedContent.content;
        if (startOffset === endOffset) {
            var start = startOffset;
            while (start > 0 && text[start - 1] !== mentionChar) {
                start--;
            }
            // Adjust -1 to the start to remove the mention char as well.
            affectedContent.content = text.slice(0, start - 1) + text.slice(endOffset);
            // Remove contentchanged action triggered by typing '/'
            if (!isUndoRedoAction) {
                if (this.parent.undoRedoAction.undoRedoStack.length > 0) {
                    this.parent.undoRedoAction.undoRedoStack.pop();
                    this.parent.undoRedoAction.index = this.parent.undoRedoAction.undoRedoStack.length - 1;
                }
            }
        }
        this.parent.stateManager.updateManagerBlocks();
    };
    MentionAction.prototype.destroy = function () {
        this.unWireEvents();
    };
    return MentionAction;
}());
export { MentionAction };
