import { captureSelectionState, decoupleReference, getAbsoluteOffset, getAdjacentBlock, getBlockContentElement, getBlockModelById, getContentModelByNode, getParentBlock, getParentElement, getSelectedRange, getTargetBlock, isCursorAtEdge, isListTypeBlock, isNonMergableBlock, setCursorPosition } from '../../common/utils/index';
import { findClosestParent, getElementRect } from '../../common/utils/dom';
import * as constants from '../../common/constant';
import { events, actionType } from '../../common/constant';
import { BlockType } from '../../models/enums';
import { DeletionType } from '../../common/enums';
/**
 * Manages all event handlers for the BlockEditor component
 * This class centralizes event handling logic and provides a clean interface
 * for wiring and unwiring events across the editor
 */
var EventAction = /** @class */ (function () {
    /**
     * Creates a new EventAction instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    function EventAction(manager) {
        this.parent = manager;
        this.wireGlobalEvents();
    }
    /**
     * Wires up all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    EventAction.prototype.wireGlobalEvents = function () {
        // Document events
        this.parent.observer.on('selectionchange', this.handleEditorSelection, this);
        this.parent.observer.on('documentClick', this.handleDocumentClickActions, this);
        this.parent.observer.on('mousemove', this.handleMouseMoveActions, this);
        this.parent.observer.on('resize', this.handleWindowResize, this);
        // Editor events
        this.parent.observer.on('mouseup', this.handleMouseUpActions, this);
        this.parent.observer.on('mousedown', this.handleMouseDownActions, this);
        this.parent.observer.on('input', this.handleEditorInputActions, this);
        this.parent.observer.on('keydown', this.handleKeydownActions, this);
        this.parent.observer.on('clipboardAction', this.clipboardActionHandler, this);
        this.parent.observer.on('wireUnWireDragEvents', this.wireUnWireDragEvents, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    /**
     * Unwires all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    EventAction.prototype.unWireGlobalEvents = function () {
        // Document events
        this.parent.observer.off('selectionchange', this.handleEditorSelection);
        this.parent.observer.off('documentClick', this.handleDocumentClickActions);
        this.parent.observer.off('mousemove', this.handleMouseMoveActions);
        this.parent.observer.off('resize', this.handleWindowResize);
        // Editor events
        this.parent.observer.off('mouseup', this.handleMouseUpActions);
        this.parent.observer.off('mousedown', this.handleMouseDownActions);
        this.parent.observer.off('input', this.handleEditorInputActions);
        this.parent.observer.off('keydown', this.handleKeydownActions);
        this.parent.observer.off('clipboardAction', this.clipboardActionHandler);
        this.parent.observer.off('wireDragEvents', this.wireUnWireDragEvents);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    EventAction.prototype.handleEditorSelection = function () {
        var range = this.parent.nodeSelection ? this.parent.nodeSelection.getRange() : null;
        if (!range) {
            return;
        }
        var isMoreThanSingleSelection = (range.startContainer !== range.endContainer || range.startOffset !== range.endOffset);
        if (isMoreThanSingleSelection && this.parent.rootEditorElement.contains(range.commonAncestorContainer)) {
            this.parent.isEntireEditorSelected = this.parent.nodeSelection.checkIsEntireEditorSelected();
        }
    };
    EventAction.prototype.handleDocumentClickActions = function (clickEvent) {
        if (!this.parent.rootEditorElement.contains(clickEvent.target)
            && (this.parent.floatingIconAction.floatingIconContainer
                && !this.parent.floatingIconAction.floatingIconContainer.contains(clickEvent.target))) {
            this.parent.floatingIconAction.hideFloatingIcons();
        }
        this.parent.selectionOverlay.clearSelectionOverlay();
        this.parent.isEntireEditorSelected = false;
        this.togglePopupsOnDocumentClick(clickEvent);
    };
    EventAction.prototype.handleMouseMoveActions = function (moveEvent) {
        if (this.parent.contextMenuModule.isPopupOpen() || this.parent.blockActionMenuModule.isPopupOpen()) {
            return;
        }
        var blockElement = moveEvent.target.closest('.' + constants.BLOCK_CLS);
        if (blockElement) {
            if (blockElement !== this.parent.currentHoveredBlock) {
                if (this.parent.currentHoveredBlock) {
                    this.parent.floatingIconAction.hideFloatingIcons();
                }
                this.parent.currentHoveredBlock = blockElement;
                this.parent.floatingIconAction.showFloatingIcons(this.parent.currentHoveredBlock);
            }
        }
        else if (this.parent.currentHoveredBlock) {
            if (this.parent.floatingIconAction.floatingIconContainer
                && !this.parent.floatingIconAction.floatingIconContainer.contains(moveEvent.target)) {
                this.parent.floatingIconAction.hideFloatingIcons();
                this.parent.currentHoveredBlock = null;
            }
        }
    };
    EventAction.prototype.handleMouseUpActions = function (mouseEvent) {
        var _this = this;
        if (this.parent.readOnly || (mouseEvent.target.tagName === 'TD')) {
            return;
        }
        this.parent.selectionOverlay.clearSelectionOverlay();
        var range = getSelectedRange();
        var startContainerParent = range ? getParentElement(range.startContainer) : null;
        var target = (startContainerParent || mouseEvent.target);
        var blockElement = target.closest('.' + constants.BLOCK_CLS);
        if (blockElement && (this.parent.currentFocusedBlock !== blockElement)) {
            this.parent.togglePlaceholder(this.parent.currentFocusedBlock, false);
            this.parent.setFocusToBlock(blockElement);
            this.parent.togglePlaceholder(this.parent.currentFocusedBlock, true);
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
            if (blockElement.innerText.length === 0) {
                setCursorPosition(getBlockContentElement(blockElement), 0);
            }
        }
        setTimeout(function () {
            var isPopupInteracted = _this.parent.inlineToolbarModule
                && _this.parent.inlineToolbarModule.popupObj.element.contains(mouseEvent.target);
            if (!isPopupInteracted) {
                _this.handleTextSelection(mouseEvent);
            }
        });
    };
    EventAction.prototype.handleMouseDownActions = function (mouseEvent) {
        this.parent.isEntireEditorSelected = false;
        this.parent.selectionOverlay.clearSelectionOverlay();
        if (this.parent.readOnly) {
            return;
        }
        var blockElement = mouseEvent.target.closest('.' + constants.BLOCK_CLS);
        if (blockElement && (this.parent.currentFocusedBlock !== blockElement)) {
            if (blockElement.innerText.length === 0) {
                setCursorPosition(getBlockContentElement(blockElement), 0);
            }
        }
    };
    EventAction.prototype.handleEditorInputActions = function (inputEvent) {
        if (inputEvent.target && (inputEvent.target.closest('.e-uploader') || inputEvent.target.closest('.e-embed-url-input'))) {
            return;
        }
        this.parent.selectionOverlay.clearSelectionOverlay();
        var focusedBlk = this.parent.currentFocusedBlock;
        var tableBlock = focusedBlk ? findClosestParent(focusedBlk, '.e-table-block') : null;
        if (tableBlock) {
            var range = getSelectedRange();
            var tableEle = tableBlock.querySelector('table');
            var uiManager = this.parent.blockRenderer.tableRenderer.getManager(tableBlock.id);
            var cell = (findClosestParent(range.startContainer, 'td') || findClosestParent(range.startContainer, 'th'));
            uiManager.removeRowColSelection(tableEle);
            uiManager.hideRowGripper();
            uiManager.hideAllPinnedColBars();
            this.parent.tableService.removeCellFocus(tableEle);
            if (cell) {
                this.parent.tableService.addCellFocus(cell);
            }
        }
        this.processEntireEditorSelection();
        this.updateUIAfterInput(inputEvent);
        this.filterSlashCommandOnUserInput();
        if (this.processFormattingActions(inputEvent)) {
            return;
        }
        this.throttleContentUpdate(inputEvent);
    };
    EventAction.prototype.processEntireEditorSelection = function () {
        if (this.parent.isEntireEditorSelected) {
            var editorBlocks = this.parent.getEditorBlocks();
            var allBlocks = editorBlocks.map(function (block) { return decoupleReference(block); });
            this.parent.setFocusToBlock(this.parent.blockContainer.firstElementChild);
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
            editorBlocks.splice(1);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.isEntireEditorSelected = false;
            this.parent.undoRedoAction.pushActionIntoUndoStack({
                action: actionType.multipleBlocksDeleted,
                oldBlockModel: editorBlocks[0],
                data: {
                    deletedBlocks: allBlocks,
                    deletionType: DeletionType.Entire
                }
            });
        }
    };
    EventAction.prototype.updateUIAfterInput = function (inputEvent) {
        if (this.parent.inlineToolbarModule) {
            this.parent.inlineToolbarModule.hideInlineToolbar(inputEvent);
        }
        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, true);
        this.parent.floatingIconAction.hideDragIconForEmptyBlock(this.parent.currentFocusedBlock);
        var blockContent = getBlockContentElement(this.parent.currentFocusedBlock);
        if (blockContent && blockContent.textContent.length <= 1) {
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
        }
    };
    EventAction.prototype.processFormattingActions = function (inputEvent) {
        var isInsertText = inputEvent.inputType === 'insertText';
        if ((isInsertText && this.parent.formattingAction.activeInlineFormats
            && this.parent.formattingAction.activeInlineFormats.size > 0)
            || this.parent.formattingAction.lastRemovedFormat) {
            return this.parent.formattingAction.handleTypingWithActiveFormats();
        }
        return false;
    };
    EventAction.prototype.throttleContentUpdate = function (inputEvent) {
        var _this = this;
        clearTimeout(this.parent.updateTimer);
        this.parent.updateTimer = setTimeout(function () {
            var target = _this.parent.currentFocusedBlock;
            _this.parent.stateManager.updateContentOnUserTyping(target, inputEvent);
        }, 100);
    };
    EventAction.prototype.handleTextSelection = function (event) {
        var range = this.parent.nodeSelection.getRange();
        // this.parent.nodeSelection.updateSelectionRangeOnUserModel();
        if (!range || range.toString().trim().length === 0) {
            this.parent.inlineToolbarModule.hideInlineToolbar(event);
            return;
        }
        var previousRange = this.parent.nodeSelection.getStoredRange();
        var selectionArgs = {
            event: event,
            // user: this.parent.users.find((user: UserModel) => user.id === this.parent.currentUserId),
            range: [range.startOffset, range.endOffset],
            previousRange: previousRange ? [previousRange.startOffset, previousRange.endOffset] : null
        };
        this.parent.observer.notify('selectionChanged', selectionArgs);
        this.parent.nodeSelection.storeCurrentRange();
        var rect = range.getBoundingClientRect();
        if (range && rect) {
            var parentBlock = getParentBlock(range.startContainer);
            if (parentBlock && parentBlock.classList.contains('e-block')) {
                this.parent.inlineToolbarModule.showInlineToolbar(range, event);
            }
            else {
                this.parent.inlineToolbarModule.hideInlineToolbar(event);
            }
        }
    };
    EventAction.prototype.filterSlashCommandOnUserInput = function () {
        var blockElement = this.parent.currentFocusedBlock;
        if (this.parent.slashCommandModule.isPopupOpen() &&
            blockElement &&
            blockElement.innerText &&
            this.parent.isPopupOpenedOnAddIconClick) {
            var rect = getElementRect(blockElement);
            var targetEle = getBlockContentElement(blockElement) || blockElement;
            var xOffset = rect.left;
            var yOffset = rect.top + targetEle.offsetHeight;
            this.parent.slashCommandModule.filterCommands(blockElement.innerText, xOffset, yOffset);
        }
    };
    EventAction.prototype.handleKeydownActions = function (keyEvent) {
        this.parent.previousSelection = captureSelectionState();
        if (!this.parent.currentFocusedBlock || !this.validateKeyEventProcessability(keyEvent) || ((keyEvent.target && keyEvent.target.closest('.e-embed-url-input')))) {
            return;
        }
        this.handleInlineTbarStates(keyEvent);
        if (this.isAnyPopupOpen()) {
            return;
        }
        /* Case where user selects multi blocks and then input a character */
        var range = getSelectedRange();
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        var isCharacterKey = keyEvent.key.length === 1 && !keyEvent.ctrlKey && !keyEvent.metaKey && !keyEvent.altKey;
        if (selectedBlocks && selectedBlocks.length > 1 && range && !range.collapsed && isCharacterKey) {
            this.parent.isEntireEditorSelected = this.parent.nodeSelection.checkIsEntireEditorSelected();
            if (this.parent.isEntireEditorSelected) {
                this.parent.blockCommand.handleEntireBlockDeletion();
            }
            else {
                this.parent.blockCommand.handleMultipleBlockDeletion(selectedBlocks, 'previous');
            }
            return;
        }
        this.processKeyboardShortcuts(keyEvent);
    };
    EventAction.prototype.validateKeyEventProcessability = function (keyEvent) {
        var blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        var isUpDownArrows = ['ArrowUp', 'ArrowDown'].indexOf(keyEvent.key) !== -1;
        var isControlUpDownShift = keyEvent.ctrlKey && isUpDownArrows && keyEvent.shiftKey;
        return blockModel && !isControlUpDownShift;
    };
    EventAction.prototype.handleInlineTbarStates = function (keyEvent) {
        var isArrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(keyEvent.key) !== -1;
        var isLeftRightArrows = ['ArrowLeft', 'ArrowRight'].indexOf(keyEvent.key) !== -1;
        var isControlKey = keyEvent.ctrlKey || keyEvent.metaKey;
        var isShiftKey = keyEvent.shiftKey;
        if (keyEvent.key === 'Escape' || (!isControlKey && isArrowKeys && !isShiftKey)) {
            this.parent.inlineToolbarModule.hideInlineToolbar(keyEvent);
        }
        else if ((isControlKey && isLeftRightArrows && isShiftKey)) {
            this.showInlineToolbarWithDelay(keyEvent);
        }
    };
    EventAction.prototype.showInlineToolbarWithDelay = function (keyEvent) {
        var _this = this;
        var inlineTbarPopup = document.querySelector('#' + this.parent.rootEditorElement.id + constants.INLINE_TBAR_POPUP_ID);
        if (!(inlineTbarPopup && inlineTbarPopup.classList.contains('e-popup-open'))) {
            setTimeout(function () {
                var range = getSelectedRange();
                if (range) {
                    _this.parent.inlineToolbarModule.showInlineToolbar(range, keyEvent);
                }
            });
        }
    };
    EventAction.prototype.processKeyboardShortcuts = function (keyEvent) {
        var blockElement = this.parent.currentFocusedBlock;
        var blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        if (this.processListBlockEvents(keyEvent, blockElement, blockModel)) {
            return;
        }
        this.handleBlockKeyActions(keyEvent);
    };
    EventAction.prototype.isAnyPopupOpen = function () {
        var mentionPopupId = this.parent.blockContainer.id + "_popup";
        var commandPopupElement = document.querySelector("#" + mentionPopupId + ".e-blockeditor-command-menu");
        var userMentionPopupElement = document.querySelector("#" + mentionPopupId + ".e-blockeditor-user-menu");
        var labelMentionPopupElement = document.querySelector("#" + mentionPopupId + ".e-blockeditor-label-menu");
        var blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        var actionPopupElement = this.parent.rootEditorElement.querySelector("#" + (this.parent.rootEditorElement.id + constants.BLOCKACTION_POPUP_ID));
        var linkDialogElement = this.parent.rootEditorElement.querySelector("#" + (this.parent.rootEditorElement.id + constants.LINKDIALOG_ID));
        var codeLanguagePopup = document.querySelector("#" + this.parent.rootEditorElement.id + "_code-ddl_popup");
        var notAllowedTypes = [BlockType.Code];
        return this.parent.slashCommandModule.isPopupOpen() || (commandPopupElement && commandPopupElement.classList.contains('e-popup-open')) ||
            (userMentionPopupElement && userMentionPopupElement.classList.contains('e-popup-open')) ||
            (labelMentionPopupElement && labelMentionPopupElement.classList.contains('e-popup-open')) ||
            (blockModel && notAllowedTypes.indexOf(blockModel.blockType) !== -1) ||
            (actionPopupElement && actionPopupElement.classList.contains('e-popup-open')) ||
            (linkDialogElement && linkDialogElement.classList.contains('e-popup-open') ||
                (codeLanguagePopup && codeLanguagePopup.classList.contains('e-popup-open')));
    };
    EventAction.prototype.processListBlockEvents = function (keyEvent, blockElement, blockModel) {
        this.parent.listPlugin.handleListTriggerKey(keyEvent, blockElement, blockModel);
        var range = getSelectedRange();
        var selectedBlocks = range && range.toString().length > 0 ? this.parent.editorMethods.getSelectedBlocks() : [];
        var isSelectiveDeletions = this.parent.isEntireEditorSelected || (selectedBlocks && selectedBlocks.length > 1);
        if (blockModel && isListTypeBlock(blockModel.blockType) && !isSelectiveDeletions) {
            return this.parent.listPlugin.handleListKeyActions(keyEvent, blockElement);
        }
        return false;
    };
    EventAction.prototype.handleBlockKeyActions = function (event) {
        var blockElement = this.parent.currentFocusedBlock;
        var contentElement = getBlockContentElement(blockElement);
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                this.handleArrowKeyActions(event, getSelectedRange(), blockElement);
                this.parent.isEntireEditorSelected = false;
                break;
            case 'Enter':
                this.processEnterKey(event, blockElement);
                break;
            case 'Backspace':
            case 'Delete':
                this.processBlockDeletions(event, blockElement, blockElement.getAttribute('data-block-type'), contentElement);
                break;
            case 'Tab':
                if (blockElement.closest("." + constants.TABLE_BLOCK_CLS)) {
                    return;
                }
                this.processTabKey(event);
                break;
            case 'Home':
            case 'End': {
                if (!event.shiftKey) {
                    this.handleHomeEndKeyActions(event, blockElement);
                }
                break;
            }
        }
    };
    EventAction.prototype.processEnterKey = function (event, blockElement) {
        this.parent.inlineToolbarModule.hideInlineToolbar();
        event.preventDefault();
        if (event.shiftKey) {
            this.handleLineBreaksOnBlock(blockElement);
        }
        else {
            this.handleNormalEnterKey();
        }
    };
    EventAction.prototype.handleNormalEnterKey = function () {
        if (!getSelectedRange()) {
            return;
        }
        if (this.processSpecialContainerBlocks()) {
            return;
        }
        if (this.processIndentIfBlockEmpty()) {
            return;
        }
        this.parent.execCommand({ command: 'SplitBlock' });
        this.parent.isEntireEditorSelected = false;
    };
    EventAction.prototype.processSpecialContainerBlocks = function () {
        var calloutBlock = this.parent.currentFocusedBlock.closest('.' + constants.CALLOUT_BLOCK_CLS);
        var toggleBlock = this.parent.currentFocusedBlock.closest('.' + constants.TOGGLE_BLOCK_CLS);
        var quoteBlock = this.parent.currentFocusedBlock.closest('.' + constants.QUOTE_BLOCK_CLS);
        if (calloutBlock) {
            return this.handleChildrenBlockExit('.' + constants.CALLOUT_BLOCK_CLS, '.' + constants.CALLOUT_CONTENT_CLS);
        }
        else if (toggleBlock) {
            return this.processToggleBlock(toggleBlock);
        }
        else if (quoteBlock) {
            return this.handleChildrenBlockExit('.' + constants.QUOTE_BLOCK_CLS, '.' + constants.QUOTE_CONTENT_CLS);
        }
        return false;
    };
    EventAction.prototype.processToggleBlock = function (toggleBlock) {
        var blockModel = getBlockModelById(toggleBlock.id, this.parent.getEditorBlocks());
        var toggleHeader = findClosestParent(getSelectedRange().startContainer, '.e-toggle-header');
        var toggleContent = toggleBlock.querySelector('.' + constants.TOGGLE_CONTENT_CLS);
        if (toggleContent && toggleHeader && toggleContent.textContent === '') {
            this.parent.blockRenderer.collapsibleRenderer.updateCollapsibleBlockExpansion(this.parent.currentFocusedBlock, !blockModel.properties.isExpanded);
            setCursorPosition(toggleContent.querySelector('.' + constants.CONTENT_CLS), 0);
            this.parent.setFocusToBlock(this.parent.currentFocusedBlock.querySelector('.' + constants.BLOCK_CLS));
            return true;
        }
        return this.handleChildrenBlockExit('.' + constants.TOGGLE_BLOCK_CLS, '.' + constants.TOGGLE_CONTENT_CLS);
    };
    EventAction.prototype.processIndentIfBlockEmpty = function () {
        var blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (this.parent.currentFocusedBlock.textContent.trim() === '' && blockModel.indent > 0) {
            this.parent.execCommand({
                command: 'IndentBlock',
                state: {
                    blockIDs: [blockModel.id],
                    shouldDecrease: true
                }
            });
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
            return true;
        }
        return false;
    };
    EventAction.prototype.processBlockDeletions = function (event, blockElement, blockType, contentElement) {
        var mergeDirection = (event.key === 'Backspace') ? 'previous' : 'next';
        this.parent.inlineToolbarModule.hideInlineToolbar();
        // Handle multi-block / entire selection first
        var isDeletionPerformed = this.parent.blockCommand.handleSelectiveDeletions(event);
        if (isDeletionPerformed) {
            return;
        }
        // Direct deletion of selected Non-mergeable block
        if (isNonMergableBlock(blockElement)) {
            this.parent.execCommand({
                command: 'DeleteNonMergableBlock',
                state: { blockElement: blockElement }
            });
            event.preventDefault();
            return;
        }
        // Two-step delete for adjacent special blocks at boundary
        if (getSelectedRange() && isCursorAtEdge(contentElement, event.key === 'Backspace')) {
            var adjacentBlock = getTargetBlock(blockElement, mergeDirection);
            if (adjacentBlock) {
                var adjacentModel = getBlockModelById(adjacentBlock.id, this.parent.getEditorBlocks());
                var isSpecial = !!adjacentModel && [
                    BlockType.Code,
                    BlockType.Callout,
                    BlockType.Table,
                    BlockType.Image,
                    BlockType.Quote,
                    BlockType.CollapsibleHeading,
                    BlockType.CollapsibleParagraph,
                    BlockType.Divider
                ].indexOf(adjacentModel.blockType) !== -1;
                if (isSpecial) {
                    // First press: stage overlay
                    event.preventDefault();
                    this.parent.selectionOverlay.selectionOverlayInfo = { element: adjacentBlock, direction: mergeDirection };
                    this.parent.lastHighlightedBlockId = adjacentBlock.id;
                    if (this.parent.selectionOverlay) {
                        this.parent.selectionOverlay.show(adjacentBlock.id);
                    }
                    if (this.parent.nodeSelection) {
                        this.parent.nodeSelection.clearSelection();
                    }
                    return;
                }
            }
            // Fallback to normal deletion-at-cursor for block merging
            event.preventDefault();
            this.parent.execCommand({
                command: 'DeleteAtCursor',
                state: {
                    blockElement: blockElement,
                    mergeDirection: mergeDirection
                }
            });
            this.parent.isEntireEditorSelected = false;
            return;
        }
        // Second press: delete
        if (this.parent.selectionOverlay.selectionOverlayInfo && this.parent.selectionOverlay.selectionOverlayInfo.element) {
            event.preventDefault();
            var blockEle = this.parent.selectionOverlay.selectionOverlayInfo.element;
            this.parent.selectionOverlay.clearSelectionOverlay();
            this.parent.execCommand({
                command: 'DeleteNonMergableBlock',
                state: { blockElement: blockEle }
            });
            return;
        }
    };
    EventAction.prototype.processTabKey = function (event) {
        this.parent.execCommand({
            command: 'IndentBlock',
            state: {
                blockIDs: this.parent.editorMethods.getSelectedBlocks().map(function (block) { return block.id; }),
                shouldDecrease: event.shiftKey
            }
        });
        this.parent.isEntireEditorSelected = false;
        event.preventDefault();
    };
    EventAction.prototype.handleHomeEndKeyActions = function (event, blockElement) {
        var contentElement = getBlockContentElement(blockElement);
        setCursorPosition(contentElement, (event.key === 'Home') ? 0 : contentElement.textContent.length);
    };
    EventAction.prototype.handleLineBreaksOnBlock = function (blockElement) {
        var blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        var oldBlock = decoupleReference(blockModel);
        var contentElement = getBlockContentElement(blockElement);
        var range = this.parent.nodeSelection.getRange();
        if (!range) {
            return;
        }
        var absoluteOffset = getAbsoluteOffset(contentElement, range.startContainer, range.startOffset);
        var contentModel = getContentModelByNode(range.startContainer, this.parent.getEditorBlocks());
        this.parent.blockService.applyLineBreak(range.startOffset, contentModel);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: blockModel, oldBlock: oldBlock }]
            } });
        setCursorPosition(contentElement, absoluteOffset + 1);
        this.parent.undoRedoAction.trackLineBreakActionForUndoRedo({
            blockId: blockModel.id,
            oldContent: oldBlock.content,
            newContent: decoupleReference(blockModel.content)
        });
    };
    EventAction.prototype.handleChildrenBlockExit = function (parentSelector, contentSelector, deleteDirection) {
        if (deleteDirection === void 0) { deleteDirection = 'previous'; }
        var parentBlock = this.parent.currentFocusedBlock.closest(parentSelector);
        var contentElement = parentBlock ? parentBlock.querySelector(contentSelector) : null;
        if (parentBlock && contentElement &&
            (this.parent.currentFocusedBlock.textContent.trim() === '') && contentElement.childElementCount > 1 &&
            (contentElement.lastElementChild === this.parent.currentFocusedBlock)) {
            this.parent.execCommand({ command: 'DeleteBlock', state: {
                    blockElement: this.parent.currentFocusedBlock,
                    mergeDirection: deleteDirection
                } });
            this.parent.currentFocusedBlock = parentBlock;
            this.parent.execCommand({ command: 'AddBlock', state: {
                    blockType: BlockType.Paragraph,
                    targetBlock: this.parent.currentFocusedBlock
                } });
            return true;
        }
        return false;
    };
    EventAction.prototype.handleArrowKeyActions = function (event, range, blockElement) {
        var _this = this;
        this.parent.selectionOverlay.clearSelectionOverlay();
        var blockContentLength = blockElement.textContent.length;
        var key = event.key;
        var isUp = key === 'ArrowUp';
        var isDown = key === 'ArrowDown';
        var isLeft = key === 'ArrowLeft';
        var isRight = key === 'ArrowRight';
        var isAtStart = range && (range.startOffset === 0 && range.endOffset === 0);
        var isAtEnd = range && (range.startOffset === blockContentLength && range.endOffset === blockContentLength);
        var adjacentBlock = getAdjacentBlock(blockElement, (isUp || isLeft) ? 'previous' : 'next');
        if (!adjacentBlock) {
            return;
        }
        if (adjacentBlock && adjacentBlock.classList.contains(constants.TABLE_BLOCK_CLS)) {
            var tableEl = adjacentBlock.querySelector('table');
            var targetCell = null;
            if ((isUp || isDown) && tableEl) {
                if (isUp) {
                    // focus first data-cell of the last row
                    var lastDomRow = tableEl.rows.length - 1;
                    targetCell = tableEl.rows[lastDomRow].cells[1];
                }
                else {
                    // ArrowDown → first header TH if present, else first body cell
                    targetCell = tableEl.tHead ? tableEl.tHead.rows[0].cells[1] : tableEl.rows[0].cells[1];
                }
            }
            if (targetCell) {
                this.parent.tableService.addCellFocus(targetCell, true);
                event.preventDefault();
                return;
            }
        }
        var isAdjacentEmpty = adjacentBlock.textContent.length === 0;
        //Only prevent default behaviour when cursor at the ends, otherwise let the browser's default behaviour take over
        var isMovingAdjacentBlock = (isAtStart && (isLeft)) || (isAtEnd && (isRight)) || ((isUp || isDown) && isAdjacentEmpty);
        if (isMovingAdjacentBlock) {
            event.preventDefault();
            this.moveCursorToAdjacentBlock(adjacentBlock, key);
        }
        else {
            setTimeout(function () {
                if (!isMovingAdjacentBlock) {
                    var range_1 = getSelectedRange();
                    var currentBlock = (range_1 && range_1.startContainer.parentElement.closest('.' + constants.BLOCK_CLS));
                    if (currentBlock !== _this.parent.currentFocusedBlock) {
                        _this.parent.togglePlaceholder(_this.parent.currentFocusedBlock, false);
                        _this.parent.setFocusToBlock(currentBlock);
                        _this.parent.floatingIconAction.showFloatingIcons(_this.parent.currentFocusedBlock);
                    }
                }
            });
        }
    };
    EventAction.prototype.moveCursorToAdjacentBlock = function (adjacentBlock, key) {
        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, false);
        this.parent.setFocusToBlock(adjacentBlock);
        setCursorPosition(getBlockContentElement(adjacentBlock), (key === 'ArrowLeft') ? adjacentBlock.textContent.length : 0);
        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, true);
        this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
    };
    EventAction.prototype.togglePopupsOnDocumentClick = function (event) {
        var inlineTbarPopup = document.querySelector('#' + this.parent.rootEditorElement.id + constants.INLINE_TBAR_POPUP_ID);
        var blockActionPopup = document.querySelector('#' + this.parent.rootEditorElement.id + constants.BLOCKACTION_POPUP_ID);
        var isInlineTbarOpen = inlineTbarPopup && inlineTbarPopup.classList.contains('e-popup-open');
        var isBlockActionOpen = blockActionPopup && blockActionPopup.classList.contains('e-popup-open');
        var isColorPaletteClick = event.target.closest('.e-colorpicker-wrapper') !== null ||
            event.target.closest('.e-color-palette') !== null;
        if (!this.parent.inlineToolbarModule.popupObj.element.contains(event.target) && isInlineTbarOpen && !isColorPaletteClick) {
            this.parent.inlineToolbarModule.hideInlineToolbar(event);
        }
        if (!this.parent.blockActionMenuModule.popupObj.element.contains(event.target) && isBlockActionOpen) {
            this.parent.blockActionMenuModule.toggleBlockActionPopup(true, event);
        }
    };
    EventAction.prototype.clipboardActionHandler = function (e) {
        if (this.parent.linkModule.isPopupOpen() || (e.target && e.target.closest('.e-embed-url-input'))) {
            return;
        }
        switch (e.type.toLowerCase()) {
            case 'cut':
                this.parent.observer.notify(events.cut, e);
                break;
            case 'copy':
                this.parent.observer.notify(events.copy, e);
                break;
            case 'paste':
                this.parent.observer.notify(events.paste, e);
                break;
        }
        this.parent.stateManager.updateManagerBlocks();
    };
    EventAction.prototype.handleWindowResize = function () {
        if (this.parent.inlineToolbarModule && this.parent.inlineToolbarModule.isPopupOpen()) {
            var range = this.parent.nodeSelection.getRange();
            this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(range, this.parent.inlineToolbarModule.popupObj);
        }
        // Reposition overlay on resize
        if (this.parent.selectionOverlay) {
            this.parent.selectionOverlay.reposition();
        }
    };
    EventAction.prototype.wireUnWireDragEvents = function (options) {
        if (options.enable) {
            this.parent.dragAndDropAction.wireDragEvents();
        }
        else {
            this.parent.dragAndDropAction.unwireDragEvents();
        }
    };
    // Reposition handled by SelectionOverlay
    EventAction.prototype.destroy = function () {
        this.parent.selectionOverlay.clearSelectionOverlay();
        this.unWireGlobalEvents();
    };
    return EventAction;
}());
export { EventAction };
