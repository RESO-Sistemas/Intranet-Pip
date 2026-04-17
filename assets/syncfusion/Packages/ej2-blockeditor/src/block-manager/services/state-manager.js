import { getSelectedRange } from '../../common/utils/selection';
import { getBlockModelById, getBlockContentElement, isChildrenProp } from '../../common/utils/block';
import { decoupleReference, generateUniqueId } from '../../common/utils/common';
import { findClosestParent } from '../../common/utils/dom';
import * as constants from '../../common/constant';
import { convertInlineElementsToContentModels } from '../../common/utils/html-parser';
/**
 * Manages state and data in the BlockEditor
 */
var StateManager = /** @class */ (function () {
    /**
     * Creates a new StateManager instance
     *
     * @param {BlockManager} parent The parent BlockManager instance
     */
    function StateManager(parent) {
        this.parent = parent;
    }
    /**
     * Updates the internal content models based on user typing
     *
     * @param {HTMLElement} blockElement - The block element being updated
     * @param {Event} updateEvent - The original input event that triggered the update (optional)
     * @returns {void}
     * @hidden
     */
    StateManager.prototype.updateContentOnUserTyping = function (blockElement, updateEvent) {
        if (!blockElement) {
            return;
        }
        var block = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        if (!block || (block && (block.blockType === 'Code' || block.blockType === 'Table'))) {
            return;
        }
        var oldBlockModel = decoupleReference(block);
        var contentElement = this.getContentElementForUpdate(getSelectedRange(), blockElement);
        if (!contentElement) {
            return;
        }
        if (!block.content || contentElement.childNodes.length === 0) {
            this.parent.blockService.updateContent(block.id, []);
        }
        var newContents = convertInlineElementsToContentModels(contentElement, true);
        this.parent.blockService.updateContent(block.id, newContents);
        var clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: clonedBlock,
                prevBlock: oldBlockModel
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        this.updateManagerBlocks();
    };
    StateManager.prototype.getContentElementForUpdate = function (range, blockElement) {
        var contentElement = getBlockContentElement(blockElement);
        if (!contentElement) {
            return null;
        }
        if (blockElement.closest('.' + constants.TOGGLE_BLOCK_CLS)) {
            var toggleHeader = findClosestParent(range.startContainer, '.e-toggle-header');
            if (toggleHeader) {
                contentElement = toggleHeader.querySelector('.' + constants.CONTENT_CLS);
            }
        }
        return contentElement;
    };
    /**
     * Populates blocks with unique IDs if they don't have them
     *
     * @param {BlockModel[]} blocks Array of block models
     * @param {string} parentBlockId Optional parent block ID
     * @returns {void}
     * @hidden
     */
    StateManager.prototype.populateUniqueIds = function (blocks, parentBlockId) {
        var _this = this;
        blocks.forEach(function (block) {
            if (!block.id) {
                block.id = generateUniqueId(constants.BLOCK_ID_PREFIX);
            }
            if (parentBlockId) {
                block.parentId = parentBlockId;
            }
            var props = block.properties;
            if ((isChildrenProp(block)) && props.children.length > 0) {
                _this.populateUniqueIds(props.children, block.id);
            }
        });
    };
    /**
     * Updates the property changes to the model
     *
     * @returns {void}
     * @hidden
     */
    StateManager.prototype.updateManagerBlocks = function () {
        this.parent.blocks = this.parent.getEditorBlocks();
        this.parent.observer.notify('updateEditorBlocks', { blocks: this.parent.blocks });
    };
    return StateManager;
}());
export { StateManager };
