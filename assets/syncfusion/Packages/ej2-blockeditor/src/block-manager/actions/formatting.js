import { decoupleReference, getAbsoluteOffset } from '../../common/utils/common';
import { getSelectedRange, setCursorPosition } from '../../common/utils/selection';
import { getBlockContentElement, getBlockSpecificRange } from '../../common/utils/block';
import { NodeSelection } from '../../selection/selection';
import { findClosestParent, getNodesInRange } from '../../common/utils/dom';
import { events } from '../../common/constant';
import { FormattingHelper } from '../../common/utils/isformatted';
import * as constants from '../../common/constant';
import { BlockType } from '../../models/enums';
import { FormattingHandler } from '../plugins/formatting/formatting-handler';
import { convertInlineElementsToContentModels } from '../../common/utils/html-parser';
var FormattingAction = /** @class */ (function () {
    function FormattingAction(manager) {
        /** @hidden */
        this.lastRemovedFormat = null;
        /** @hidden */
        this.activeInlineFormats = new Set();
        this.formatCache = new WeakMap();
        this.ignoredBlockTypes = new Set([BlockType.Callout,
            BlockType.Quote, BlockType.Image, BlockType.Divider, BlockType.Code]);
        this.parent = manager;
        this.nodeSelection = new NodeSelection(this.parent.blockContainer);
        this.formattingHandler = new FormattingHandler(this.parent);
        this.addEventListeners();
    }
    FormattingAction.prototype.addEventListeners = function () {
        this.parent.observer.on(constants.FORMATTINGACTION, this.execCommand, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    FormattingAction.prototype.removeEventListeners = function () {
        this.parent.observer.off(constants.FORMATTINGACTION, this.execCommand);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Executes the formatting command based on the provided options.
     *
     * @param {ExecCommandOptions} options - The options for the formatting command.
     * @returns {void}
     * @hidden
     */
    FormattingAction.prototype.execCommand = function (options) {
        this.performOperation(options);
    };
    FormattingAction.prototype.performOperation = function (options) {
        var blocksToFormat = this.resolveBlocksToFormat();
        if (!blocksToFormat || blocksToFormat.length === 0) {
            return;
        }
        if (!options.isRemoteChanges) {
            this.nodeSelection.saveSelection();
        }
        var _a = this.applyFormattingToBlocks(blocksToFormat, options), blockIDs = _a.blockIDs, oldBlockModels = _a.oldBlockModels, updatedBlockModels = _a.updatedBlockModels;
        if (!options.isRemoteChanges) {
            this.nodeSelection.restoreSelection();
        }
        this.parent.undoRedoAction.trackFormattingForUndoRedo(blockIDs, oldBlockModels, updatedBlockModels, options.isTypingWithFormat, this.nodeSelection.savedSelectionState);
        this.parent.observer.notify('formatting-performed', options);
    };
    FormattingAction.prototype.applyFormattingToBlocks = function (blocks, options) {
        var blockIDs = [];
        var oldBlockModels = [];
        var updatedBlockModels = [];
        options.shouldRemoveGlobally = this.shouldRemoveFormatGlobally(blocks, options);
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            if (this.ignoredBlockTypes.has(block.blockType) || block.content.length <= 0) {
                continue;
            }
            blockIDs.push(block.id);
            oldBlockModels.push(decoupleReference(block));
            this.processFormattingActions(block, options);
            updatedBlockModels.push(decoupleReference(block));
        }
        return { blockIDs: blockIDs, oldBlockModels: oldBlockModels, updatedBlockModels: updatedBlockModels };
    };
    FormattingAction.prototype.processFormattingActions = function (block, options) {
        var blockElement = this.parent.getBlockElementById(block.id);
        var contentElement = getBlockContentElement(blockElement);
        var oldBlock = decoupleReference(block);
        var globalRange = getSelectedRange();
        var blockRange = getBlockSpecificRange(globalRange, blockElement);
        // Apply formatting using new handler
        var format = options.subCommand ? options.subCommand.toString() : options.command.toString();
        this.formattingHandler.executeFormat(blockRange, format, options);
        // Parse updated DOM back to model using html-parser utility
        var newContents = convertInlineElementsToContentModels(contentElement, true);
        this.parent.blockService.updateContent(block.id, newContents);
        this.parent.stateManager.updateManagerBlocks();
        // For event track
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: block, oldBlock: oldBlock }],
                excludeDomUpdate: true,
                preventEventTrigger: options.isRemoteChanges
            } });
    };
    /**
     * Handles formatting action on user typing.
     *
     * @returns {boolean} - Returns true if formatting was applied, false otherwise.
     * @hidden
     */
    FormattingAction.prototype.handleTypingWithActiveFormats = function () {
        var _this = this;
        var selection = window.getSelection();
        if (!selection.isCollapsed) {
            return false;
        }
        var range = selection.getRangeAt(0);
        var currentNode = range.startContainer;
        var blockElement = findClosestParent(range.startContainer, '.' + constants.BLOCK_CLS);
        var contentElement = getBlockContentElement(blockElement);
        var absoluteOffset = getAbsoluteOffset(contentElement, range.startContainer, range.startOffset);
        if (this.lastRemovedFormat && this.isNodeFormattedWith(currentNode, this.lastRemovedFormat)) {
            return this.removeFormatToLastCharacter(blockElement, contentElement, range, absoluteOffset);
        }
        if (this.areAllActiveFormatsApplied(currentNode)) {
            return false;
        }
        this.parent.stateManager.updateContentOnUserTyping(blockElement);
        var createdRange = this.nodeSelection.createRangeWithOffsets(range.startContainer, range.startContainer, range.startOffset - 1, range.startOffset);
        this.activeInlineFormats.forEach(function (format) {
            if (_this.isNodeFormattedWith(currentNode, format)) {
                // Skip this format since it's already applied
                return;
            }
            _this.execCommand({ command: format, isTypingWithFormat: true });
        });
        createdRange.collapse(false);
        this.parent.editorMethods.selectRange(createdRange);
        setCursorPosition(contentElement, absoluteOffset);
        return true;
    };
    FormattingAction.prototype.removeFormatToLastCharacter = function (blockElement, contentElement, range, absoluteOffset) {
        this.parent.stateManager.updateContentOnUserTyping(blockElement);
        var createdRange = this.nodeSelection.createRangeWithOffsets(range.startContainer, range.startContainer, range.startOffset - 1, range.startOffset);
        this.execCommand({ command: this.lastRemovedFormat, isTypingWithFormat: true });
        this.lastRemovedFormat = null;
        createdRange.collapse(false);
        this.parent.editorMethods.selectRange(createdRange);
        setCursorPosition(contentElement, absoluteOffset);
        return true;
    };
    /**
     * Determines whether formatting should be removed or applied across all selected blocks.
     * This is critical for multi-block selections to ensure consistent behavior.
     *
     * For example, if 3 blocks are selected where block 2 is already bold:
     * - Without global check: Block 1 gets bold applied, Block 2 gets bold removed, Block 3 gets bold applied
     * - With global check: All blocks get bold applied consistently
     *
     * @param {BlockModel[]} blocks - All blocks in the selection
     * @param {ExecCommandOptions} options - Formatting options
     * @returns {boolean} - True if format should be removed, false if it should be applied
     */
    FormattingAction.prototype.shouldRemoveFormatGlobally = function (blocks, options) {
        var format = options.subCommand ? options.subCommand.toString() : options.command.toString();
        // Value-based formats (color, backgroundColor, link) should never be "removed" in toggle sense
        var valueBasedFormats = ['color', 'backgroundColor', 'link'];
        if (valueBasedFormats.indexOf(format) !== -1) {
            return false;
        }
        // Collect all text nodes from all blocks
        var globalRange = getSelectedRange();
        var allNodes = [];
        for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
            var block = blocks_2[_i];
            if (this.ignoredBlockTypes.has(block.blockType) || block.content.length <= 0) {
                continue;
            }
            var blockElement = this.parent.getBlockElementById(block.id);
            var blockRange = getBlockSpecificRange(globalRange, blockElement);
            var nodes = getNodesInRange(blockRange);
            allNodes.push.apply(allNodes, nodes);
        }
        // Use FormattingHelper to determine if all nodes have the format
        return FormattingHelper.shouldRemoveFormat(allNodes, format);
    };
    /**
     * Toggles the active inline formats when formatting.
     * Triggers when user presses keys such as Ctrl+B, Ctrl+I, Ctrl+U and Ctrl+Shift+X.
     *
     * @param {string} command - The formatting command to toggle.
     * @returns {void}
     * @hidden
     */
    FormattingAction.prototype.toggleActiveFormats = function (command) {
        if (this.activeInlineFormats.has(command)) {
            this.activeInlineFormats.delete(command);
            this.lastRemovedFormat = command;
        }
        else {
            this.activeInlineFormats.add(command);
            this.lastRemovedFormat = null;
        }
    };
    FormattingAction.prototype.areAllActiveFormatsApplied = function (node) {
        var _this = this;
        var allApplied = true;
        this.activeInlineFormats.forEach(function (format) {
            if (!_this.isNodeFormattedWith(node, format)) {
                allApplied = false;
            }
        });
        return allApplied;
    };
    FormattingAction.prototype.isNodeFormattedWith = function (node, format) {
        var currentElement = node.nodeType === Node.TEXT_NODE ?
            node.parentElement : node;
        if (currentElement && this.formatCache.has(currentElement)) {
            return this.formatCache.get(currentElement).has(format);
        }
        var formats = new Set();
        while (currentElement) {
            if (this.doesElementHaveFormat(currentElement, format)) {
                formats.add(format);
            }
            // Stop if we've reached an element with an id (root content element)
            if (currentElement.id) {
                break;
            }
            currentElement = currentElement.parentElement;
        }
        if (currentElement) {
            this.formatCache.set(currentElement, formats);
        }
        return formats.has(format);
    };
    FormattingAction.prototype.doesElementHaveFormat = function (element, format) {
        switch (format) {
            case 'bold':
                return FormattingHelper.isBold(element);
            case 'italic':
                return FormattingHelper.isItalic(element);
            case 'underline':
                return FormattingHelper.isUnderline(element);
            case 'strikethrough':
                return FormattingHelper.isStrikethrough(element);
            default:
                return false;
        }
    };
    FormattingAction.prototype.resolveBlocksToFormat = function () {
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        // Case A: Whole blocks are selected (including possible Table blocks)
        if (selectedBlocks && selectedBlocks.length > 0) {
            return this.expandSelectedBlocks(selectedBlocks);
        }
        // Fallback: should never happen
        return [];
    };
    FormattingAction.prototype.expandSelectedBlocks = function (selectedBlocks) {
        var result = [];
        for (var _i = 0, selectedBlocks_1 = selectedBlocks; _i < selectedBlocks_1.length; _i++) {
            var block = selectedBlocks_1[_i];
            if (block.blockType === BlockType.Table) {
                var tableEl = this.parent.getBlockElementById(block.id);
                result.push.apply(result, this.parent.tableSelectionManager.getAllCellBlocks(tableEl));
            }
            else {
                result.push(block);
            }
        }
        return result;
    };
    FormattingAction.prototype.destroy = function () {
        this.removeEventListeners();
        this.lastRemovedFormat = null;
        this.activeInlineFormats = null;
        this.nodeSelection = null;
        this.formatCache = null;
        this.activeInlineFormats = null;
        this.ignoredBlockTypes = null;
    };
    return FormattingAction;
}());
export { FormattingAction };
