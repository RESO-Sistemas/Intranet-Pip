var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { BlockType } from '../../models/enums';
import { decoupleReference, getAbsoluteOffset, isNodeAroundSpecialElements } from '../../common/utils/common';
import { findCellById, getBlockContentElement, getBlockModelById, isAtStartOfBlock } from '../../common/utils/block';
import { findClosestParent, isElementEmpty } from '../../common/utils/dom';
import { convertHtmlElementToBlocks, getBlockDataAsHTML, convertInlineElementsToContentModels, renderElementWithWrapper, renderContentAsHTML } from '../../common/utils/html-parser';
import { getSelectedRange, setCursorPosition } from '../../common/utils/selection';
import { ClipboardCleanupModule } from '../plugins/common/clipboard-cleanup';
import { actionType, events } from '../../common/constant';
import * as constants from '../../common/constant';
import { createBlocksFromPlainText, createCellsPayloadFromExternal, extractPlainTextMatrixFromPayload, generatePlainTextForExternalClipboard, htmlTableFromMatrix, isBlockLevelContent, tsvFromMatrix, unWrapContainer, writeTableClipboardPayload, buildTableClipboardPayload } from '../../common/utils/clipboard-utils';
import { BlockFactory } from '../../block-manager/services/block-factory';
import { doesHtmlHasTable, getDataCell, getSelectedCells, hasActiveTableSelection, toDomRow, toModelRow } from '../../common/utils/table-utils';
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
var MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
/**
 * Handles clipboard operations (copy, cut, paste) for the Block Editor.
 */
var ClipboardAction = /** @class */ (function () {
    function ClipboardAction(manager) {
        this.parent = manager;
        this.clipboardCleanupModule = new ClipboardCleanupModule(this.parent);
        this.wireEvents();
    }
    ClipboardAction.prototype.wireEvents = function () {
        this.parent.observer.on(events.copy, this.handleCopy, this);
        this.parent.observer.on(events.cut, this.handleCut, this);
        this.parent.observer.on(events.paste, this.handlePaste, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    ClipboardAction.prototype.unwireEvents = function () {
        this.parent.observer.off(events.copy, this.handleCopy);
        this.parent.observer.off(events.cut, this.handleCut);
        this.parent.observer.off(events.paste, this.handlePaste);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Handles the cut operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    ClipboardAction.prototype.handleCut = function (e) {
        this.handleCopy(e);
        this.performCutOperation();
    };
    /**
     * Handles the copy operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    ClipboardAction.prototype.handleCopy = function (e) {
        e.preventDefault();
        var focusedEl = this.parent.currentFocusedBlock;
        var tableBlockEl = focusedEl && focusedEl.closest('.' + constants.TABLE_BLOCK_CLS);
        var range = getSelectedRange();
        var hasActiveSel = hasActiveTableSelection(tableBlockEl);
        if (tableBlockEl && (hasActiveSel || findClosestParent(range.startContainer, '.e-action-handle'))) {
            var _a = this.getTablePayload(tableBlockEl), payload = _a.payload, html_1 = _a.html, plainText = _a.plainText;
            writeTableClipboardPayload(e.clipboardData, payload, html_1, plainText);
            return;
        }
        var _b = this.getClipboardPayload(), html = _b.html, text = _b.text, blockeditorData = _b.blockeditorData;
        e.clipboardData.setData('text/html', html);
        e.clipboardData.setData('text/plain', text);
        e.clipboardData.setData('text/blockeditor', blockeditorData);
    };
    /**
     * Handles the paste operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    ClipboardAction.prototype.handlePaste = function (e) {
        e.preventDefault();
        this.performPasteOperation({
            blockeditorData: e.clipboardData.getData('text/blockeditor'),
            html: e.clipboardData.getData('text/html'),
            text: e.clipboardData.getData('text/plain'),
            file: this.extractFileFromClipboard(e)
        });
        this.parent.stateManager.updateManagerBlocks();
    };
    ClipboardAction.prototype.extractFileFromClipboard = function (e) {
        if (!e.clipboardData || !e.clipboardData.items || (e.clipboardData.items && e.clipboardData.items.length === 0)) {
            return null;
        }
        var items = e.clipboardData.items;
        var file = items[0].getAsFile();
        if (file !== null) {
            return file;
        }
        return !isNullOrUndefined(items[1]) ? items[1].getAsFile() : null;
    };
    /**
     * Gets the clipboard payload for the current selection.
     *
     * @returns {IClipboardPayloadOptions} - The clipboard payload containing HTML, text, and Block Editor data.
     * @hidden
     */
    ClipboardAction.prototype.getClipboardPayload = function () {
        if (getSelectedRange().toString().trim().length > 0) {
            var tempDiv = document.createElement('div');
            tempDiv.appendChild(getSelectedRange().cloneContents());
            var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
            var blocks = this.createPartialBlockModels(tempDiv, selectedBlocks);
            return {
                blockeditorData: selectedBlocks && (selectedBlocks.length > 1)
                    ? JSON.stringify({ blocks: blocks })
                    : JSON.stringify({ contents: this.createPartialContentModels(tempDiv) }),
                html: selectedBlocks && (selectedBlocks.length > 1)
                    ? getBlockDataAsHTML(blocks, this.parent.rootEditorElement.id)
                    : renderElementWithWrapper('span', renderContentAsHTML(this.createPartialContentModels(tempDiv))),
                text: generatePlainTextForExternalClipboard(blocks)
            };
        }
        var blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        var sanitizedBlock = decoupleReference(blockModel);
        return {
            blockeditorData: JSON.stringify({ block: sanitizedBlock }),
            html: getBlockDataAsHTML([blockModel], this.parent.rootEditorElement.id),
            text: generatePlainTextForExternalClipboard([blockModel])
        };
    };
    ClipboardAction.prototype.getTablePayload = function (tableBlockEl) {
        var blockModel = getBlockModelById(tableBlockEl.id, this.parent.getEditorBlocks());
        var payload = buildTableClipboardPayload(tableBlockEl, blockModel);
        var matrixText = extractPlainTextMatrixFromPayload(payload, blockModel);
        var html = htmlTableFromMatrix(matrixText, { hasHeader: payload.meta.enableHeader, hasRowNumbers: payload.meta.enableRowNumbers });
        var plainText = tsvFromMatrix(matrixText);
        return { payload: payload, html: html, plainText: plainText };
    };
    ClipboardAction.prototype.createPartialBlockModels = function (selectionContainer, originalBlocks) {
        var _this = this;
        return originalBlocks.length === 0 ? [] : originalBlocks.map(function (block) {
            var blockElement = selectionContainer.querySelector('.e-block#' + block.id);
            var contentElement = getBlockContentElement(blockElement) || selectionContainer;
            return BlockFactory.createBlockFromPartial(__assign({}, decoupleReference(block), { content: _this.createPartialContentModels(contentElement) }));
        });
    };
    ClipboardAction.prototype.createPartialContentModels = function (selectionContainer) {
        return convertInlineElementsToContentModels(selectionContainer, true);
    };
    ClipboardAction.prototype.performCutOperation = function () {
        var tableCtx = this.parent.blockRenderer.tableRenderer.resolveTableContext();
        var range = getSelectedRange();
        if (range && range.toString().trim().length > 0) {
            this.performDeletionOperation(range);
        }
        else if (tableCtx) {
            this.performCellCut(tableCtx);
        }
        else {
            var blockElement = this.parent.currentFocusedBlock;
            var nextBlock = blockElement.nextElementSibling;
            var previousBlock = blockElement.previousElementSibling;
            this.parent.execCommand({ command: 'DeleteBlock', state: { blockElement: this.parent.currentFocusedBlock } });
            this.parent.setFocusToBlock(nextBlock || previousBlock);
        }
    };
    ClipboardAction.prototype.performPasteOperation = function (args) {
        var _this = this;
        var blockeditorData = args.blockeditorData, html = args.html, text = args.text, file = args.file;
        // (Taking a snip in windows, automatically gets copied as file and not HTML. Hence below handling)
        if (file && (file.size < MAX_IMAGE_SIZE)) {
            this.parent.blockRenderer.imageRenderer.handleFilePaste(file);
            var url = URL.createObjectURL(file);
            URL.revokeObjectURL(url); // Immediately revoke to free memory
            return;
        }
        var beforePasteEventArgs = {
            cancel: false,
            content: text,
            callback: function (args) {
                if (args.cancel) {
                    return;
                }
                var range = getSelectedRange();
                if (range && range.toString().trim().length > 0) {
                    _this.isSelectivePaste = true;
                    _this.performDeletionOperation(range);
                }
                // Detect external HTML table when inside a table cell
                var tableCtx = _this.parent.blockRenderer.tableRenderer.resolveTableContext();
                if (tableCtx && doesHtmlHasTable(html, text)) {
                    _this.handleCellPasteInsideTable(tableCtx, html, text);
                    _this.triggerAfterPasteEvent(text);
                    return;
                }
                var currentBlock = getBlockModelById(_this.parent.currentFocusedBlock.id, _this.parent.getEditorBlocks());
                if (currentBlock.blockType === BlockType.Code) {
                    _this.handleCodeBlockContentPaste(text, currentBlock);
                    _this.triggerAfterPasteEvent(text);
                    return;
                }
                if (blockeditorData) {
                    _this.handleBlockEditorPaste(blockeditorData, text);
                    _this.triggerAfterPasteEvent(text);
                    return;
                }
                var cleanedData = _this.clipboardCleanupModule.cleanupPaste({ html: html, plainText: text });
                if (html && !_this.parent.pasteCleanupSettings.plainText) {
                    _this.handleHtmlPaste(cleanedData);
                }
                else if (text) {
                    _this.handlePlainTextPaste(text);
                }
                _this.triggerAfterPasteEvent(text);
                _this.isSelectivePaste = false;
            }
        };
        this.parent.observer.notify('beforePaste', beforePasteEventArgs);
    };
    ClipboardAction.prototype.performDeletionOperation = function (range) {
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (selectedBlocks && selectedBlocks.length === 1) {
            var blockElement = this.parent.getBlockElementById(selectedBlocks[0].id);
            var contentElement = getBlockContentElement(blockElement);
            var newCursorPos = getAbsoluteOffset(contentElement, range.startContainer, range.startOffset);
            range.deleteContents();
            Array.from(contentElement.childNodes).forEach(function (node) {
                var isNodeAroundMention = isNodeAroundSpecialElements(node);
                if (node.textContent.trim() === '' && !isNodeAroundMention) {
                    node.remove();
                }
            });
            this.parent.stateManager.updateContentOnUserTyping(blockElement);
            this.parent.setFocusAndUIForNewBlock(blockElement);
            setCursorPosition(contentElement, newCursorPos);
            var isCodeBlk = selectedBlocks[0].blockType === BlockType.Code;
            var isTableChild = this.parent.currentFocusedBlock.closest("." + constants.TABLE_BLOCK_CLS);
            var isEmptyAfterDeletion = contentElement && contentElement.textContent.trim() === '';
            if (isEmptyAfterDeletion) {
                if (isCodeBlk) {
                    contentElement.textContent = '\n';
                }
                else if (!isNullOrUndefined(isTableChild)) {
                    contentElement.innerHTML = '<br>';
                }
            }
            return;
        }
        this.parent.blockCommand.handleSelectiveDeletions(new KeyboardEvent('keydown', { key: 'Backspace' }));
    };
    ClipboardAction.prototype.handleBlockEditorPaste = function (data, text) {
        try {
            var parsedData = JSON.parse(data);
            var props = Object.keys(parsedData)[0];
            switch (props) {
                case 'blocks':
                    this.handleMultiBlocksPaste(parsedData.blocks);
                    break;
                case 'block': {
                    var blocksToPaste = [decoupleReference(this.parent.blockService.generateNewIdsForBlock(parsedData.block))];
                    var cursorBlock = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
                    var parentBlock = getBlockModelById(cursorBlock.parentId, this.parent.getEditorBlocks());
                    if (parentBlock) {
                        this.parent.blockService.assignParentIdToBlocks(blocksToPaste, parentBlock.id);
                    }
                    this.parent.blockCommand.addBulkBlocks({
                        blocks: blocksToPaste,
                        targetBlockId: this.parent.currentFocusedBlock.id,
                        insertionType: 'block',
                        isSelectivePaste: this.isSelectivePaste
                    });
                    break;
                }
                case 'contents':
                    this.handleContentPasteWithinBlock(parsedData.contents);
                    break;
            }
        }
        catch (error) {
            console.error('Error parsing Block Editor clipboard data:', error);
            // Fallback to plain text paste
            this.handlePlainTextPaste(text);
        }
    };
    ClipboardAction.prototype.handleContentPasteWithinBlock = function (content) {
        if (!content.length) {
            return;
        }
        var range = this.parent.nodeSelection.getRange();
        if (!range) {
            return;
        }
        var cursorBlockElement = findClosestParent(range.startContainer, '.' + constants.BLOCK_CLS);
        var contentEle = getBlockContentElement(cursorBlockElement);
        var cursorBlock = getBlockModelById(cursorBlockElement.id, this.parent.getEditorBlocks());
        var oldBlock = decoupleReference(cursorBlock);
        var splitContent = this.parent.nodeCutter.splitContent(getBlockContentElement(cursorBlockElement), range.startContainer, range.startOffset);
        var beforeModels = this.parent.blockCommand.getContentModelForFragment(splitContent.beforeFragment);
        var afterModels = this.parent.blockCommand.getContentModelForFragment(splitContent.afterFragment);
        var pastedLength = content.reduce(function (sum, c) { return sum + (c.content.length); }, 0);
        var targetOffset = getAbsoluteOffset(contentEle, range.startContainer, range.startOffset) + pastedLength;
        /* Update model */
        this.parent.blockService.updateContent(cursorBlock.id, beforeModels.concat(content, afterModels));
        /* Update DOM */
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: cursorBlock, oldBlock: oldBlock }]
            } });
        setCursorPosition(contentEle, targetOffset);
        this.parent.undoRedoAction.pushActionIntoUndoStack({
            action: actionType.clipboardPaste,
            data: {
                type: 'content',
                oldContent: oldBlock.content,
                newContent: decoupleReference(cursorBlock.content),
                targetBlockId: cursorBlock.id,
                isSelectivePaste: this.isSelectivePaste,
                pasteEndOffset: targetOffset
            }
        });
    };
    /**
     * Handles multi-block paste operation.
     *
     * @param {BlockModel[]} blocks - The blocks to be pasted.
     * @param {boolean} isUndoRedoAction - Indicates if the action is part of an undo/redo operation.
     * @returns {void}
     * @hidden
     */
    ClipboardAction.prototype.handleMultiBlocksPaste = function (blocks, isUndoRedoAction) {
        var _this = this;
        if (isUndoRedoAction === void 0) { isUndoRedoAction = false; }
        if (!blocks.length) {
            return;
        }
        var range = this.parent.nodeSelection.getRange();
        if (!range) {
            return;
        }
        var editorBlocks = this.parent.getEditorBlocks();
        var cursorBlockElement = findClosestParent(range.startContainer, '.' + constants.BLOCK_CLS);
        var cursorBlock = getBlockModelById(cursorBlockElement.id, editorBlocks);
        var oldCursorBlock = decoupleReference(cursorBlock);
        var contentElement = getBlockContentElement(cursorBlockElement);
        var isContentEmpty = contentElement && isElementEmpty(contentElement);
        var isCursorAtStart = isAtStartOfBlock(contentElement);
        var parentBlock = getBlockModelById(cursorBlock.parentId, editorBlocks)
            || findCellById(cursorBlock.parentId, editorBlocks);
        var specialTypes = [BlockType.Table, BlockType.Image];
        var isFirstBlkSpecialType = specialTypes.indexOf(blocks[0].blockType) !== -1;
        var cursorBlockAfterSplit;
        var isFirstBlkProcessed = false;
        if (parentBlock) {
            this.parent.blockService.assignParentIdToBlocks(blocks, parentBlock.id);
        }
        if (isContentEmpty) {
            isFirstBlkProcessed = true;
            this.parent.blockService.generateNewIdsForBlock(blocks[0]);
            blocks[0].id = cursorBlockElement.id;
            this.parent.blockService.replaceBlock(cursorBlock.id, blocks[0]);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                    targetBlockId: cursorBlock.id,
                    block: getBlockModelById(blocks[0].id, this.parent.getEditorBlocks()),
                    oldBlock: oldCursorBlock,
                    preventEventTrigger: true
                } });
        }
        else if (!isFirstBlkSpecialType) {
            isFirstBlkProcessed = true;
            this.parent.execCommand({ command: 'SplitBlock', state: { preventEventTrigger: true } });
            /* When split at start, empty block will be appended before target */
            cursorBlockElement = ((range.startOffset === 0)
                ? cursorBlockElement.previousElementSibling
                : cursorBlockElement);
            var updatedCursorBlock = getBlockModelById(cursorBlockElement.id, this.parent.getEditorBlocks());
            if (!updatedCursorBlock) {
                return;
            }
            cursorBlockAfterSplit = decoupleReference(updatedCursorBlock);
            var isContentEmptyAfterSplit = !updatedCursorBlock.content || (updatedCursorBlock.content
                && updatedCursorBlock.content.length === 1 && updatedCursorBlock.content[0].content === '');
            var contentToUpdate = isContentEmptyAfterSplit ? blocks[0].content.slice() : updatedCursorBlock.content.concat(blocks[0].content);
            this.parent.blockService.updateContent(updatedCursorBlock.id, contentToUpdate);
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: updatedCursorBlock, oldBlock: oldCursorBlock }],
                    preventEventTrigger: true
                } });
        }
        this.parent.blockCommand.addBulkBlocks({
            blocks: blocks.slice(!isFirstBlkProcessed ? 0 : 1)
                .map(function (block) { return _this.parent.blockService.generateNewIdsForBlock(block); }),
            targetBlockId: cursorBlockElement.id,
            isUndoRedoAction: isUndoRedoAction,
            insertionType: 'blocks',
            clipboardBlocks: blocks.map(function (block) { return decoupleReference(block); }),
            cursorBlockAfterSplit: cursorBlockAfterSplit,
            oldBlockModel: oldCursorBlock,
            isPastedAtStart: isCursorAtStart,
            isSelectivePaste: this.isSelectivePaste
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    };
    ClipboardAction.prototype.handleCodeBlockContentPaste = function (content, blockModel) {
        var codeBlockContentElement = document.getElementById(blockModel.id).querySelector('.e-code-content');
        // Store the old block state for undo/redo tracking
        var oldBlockModel = decoupleReference(blockModel);
        // Get current cursor position
        var range = getSelectedRange();
        var cursorPosition = 0;
        if (range && range.startContainer === codeBlockContentElement
            || codeBlockContentElement.contains(range.startContainer)) {
            // Calculate cursor position from the beginning of text content
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(codeBlockContentElement);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            cursorPosition = preCaretRange.toString().length;
        }
        // Get current text content
        var currentText = codeBlockContentElement.textContent === '\n' ? '' : codeBlockContentElement.textContent;
        // Insert pasted content at cursor position
        var beforeCursor = currentText.substring(0, cursorPosition);
        var afterCursor = currentText.substring(cursorPosition);
        var newText = beforeCursor + content + afterCursor;
        // Update DOM
        codeBlockContentElement.textContent = newText;
        // Update model
        blockModel.content[0].content = newText;
        // Position cursor after pasted content
        var newCursorPosition = cursorPosition + content.length;
        setCursorPosition(codeBlockContentElement, newCursorPosition);
        // Track the change for undo/redo
        var clonedBlock = decoupleReference(blockModel);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
    };
    ClipboardAction.prototype.handleHtmlPaste = function (html) {
        var tempDiv = unWrapContainer((function () {
            var div = document.createElement('div');
            div.innerHTML = html;
            return div;
        })());
        if (isBlockLevelContent(tempDiv)) {
            this.handleMultiBlocksPaste(convertHtmlElementToBlocks(tempDiv, this.parent.pasteCleanupSettings.keepFormat));
        }
        else {
            this.handleContentPasteWithinBlock(convertInlineElementsToContentModels(tempDiv, this.parent.pasteCleanupSettings.keepFormat));
        }
    };
    ClipboardAction.prototype.handlePlainTextPaste = function (text) {
        this.handleMultiBlocksPaste(createBlocksFromPlainText(text));
    };
    ClipboardAction.prototype.handleCellPasteInsideTable = function (tableCtx, html, text) {
        var cleanedData = this.clipboardCleanupModule.cleanupPaste({ html: html, plainText: text });
        var payloadFromExternal = createCellsPayloadFromExternal(cleanedData, text);
        if (payloadFromExternal && payloadFromExternal.cells && payloadFromExternal.cells.length) {
            this.performCellPaste(payloadFromExternal, tableCtx);
            this.triggerAfterPasteEvent(text);
            this.isSelectivePaste = false;
            return;
        }
    };
    ClipboardAction.prototype.performCellPaste = function (payload, ctx) {
        if (!(payload.cells && payload.cells.length)) {
            return;
        }
        // Snapshot old blocks and track structure delta for undo/redo
        var oldNewPairs = [];
        var structureDelta = {};
        var needRows = Math.max(0, (ctx.startDataRow + payload.cells.length) - ctx.props.rows.length);
        if (needRows > 0) {
            structureDelta.rowsAdded = [];
            for (var i = 0; i < needRows; i++) {
                var at = ctx.props.rows.length;
                structureDelta.rowsAdded.push(at);
                this.parent.tableService.addRowAt({ blockId: ctx.tableBlockEl.id, rowIndex: at });
            }
        }
        var needCols = Math.max(0, (ctx.startDataCol + payload.cells[0].length) - ctx.props.columns.length);
        if (needCols > 0) {
            structureDelta.colsAdded = [];
            for (var i = 0; i < needCols; i++) {
                var at = ctx.props.columns.length;
                structureDelta.colsAdded.push(at);
                this.parent.tableService.addColumnAt({ blockId: ctx.tableBlockEl.id, colIndex: at });
            }
        }
        this.parent.tableService.removeCellFocus(ctx.tableEl);
        for (var r = 0; r < payload.cells.length; r++) {
            for (var c = 0; c < payload.cells[r].length; c++) {
                var targetRow = ctx.startDataRow + r;
                var targetCol = ctx.startDataCol + c;
                var oldBlocks = (ctx.props.rows[targetRow].cells[targetCol].blocks)
                    .map(function (b) { return decoupleReference(b); });
                var newBlocks = payload.cells[r][c];
                oldNewPairs.push({ dataRow: targetRow, dataCol: targetCol, oldBlocks: oldBlocks, newBlocks: newBlocks });
                this.parent.tableService.setCellBlocks(ctx.tableEl, targetRow, targetCol, newBlocks);
                if (c === 0 && r === 0) {
                    var cellToFocus = getDataCell(ctx.tableEl, toDomRow(targetRow, ctx.props.enableHeader), targetCol);
                    this.parent.tableService.addCellFocus(cellToFocus, true);
                }
            }
        }
        // Push undo stack entry for table cells paste
        this.parent.undoRedoAction.trackTableCellsPasteForUndoRedo({
            blockId: ctx.tableBlockEl.id,
            cells: oldNewPairs,
            structureDelta: structureDelta
        });
    };
    ClipboardAction.prototype.performCellCut = function (tableCtx) {
        var _this = this;
        var selectedCells = Array.from(getSelectedCells(tableCtx.tableBlockEl));
        var tableEl = tableCtx.tableEl;
        var props = tableCtx.props;
        if (!selectedCells.length) {
            return;
        }
        var dataPositions = selectedCells.map(function (td) { return ({
            r: props.enableHeader ? (parseInt(td.dataset.row, 10) - 1) : parseInt(td.dataset.row, 10),
            c: parseInt(td.dataset.col, 10)
        }); }).filter(function (p) { return !isNaN(p.r) && !isNaN(p.c) && p.r >= 0 && p.c >= 0; });
        var totalRows = props.rows.length;
        var totalCols = props.columns.length;
        var selectedKeySet = new Set(dataPositions.map(function (p) { return p.r + ":" + p.c; }));
        // Build counts per row and per column
        var rowCounts = new Map();
        var colCounts = new Map();
        dataPositions.forEach(function (p) {
            rowCounts.set(p.r, (rowCounts.get(p.r) || 0) + 1);
            colCounts.set(p.c, (colCounts.get(p.c) || 0) + 1);
        });
        var fullRows = Array.from(rowCounts.entries())
            .filter(function (_a) {
            var _ = _a[0], count = _a[1];
            return count === totalCols;
        })
            .map(function (_a) {
            var r = _a[0];
            return r;
        })
            .sort(function (a, b) { return a - b; });
        var onlyFullRowsSelected = fullRows.length > 0 && (fullRows.length * totalCols === selectedKeySet.size);
        var fullCols = Array.from(colCounts.entries())
            .filter(function (_a) {
            var _ = _a[0], count = _a[1];
            return count === totalRows;
        })
            .map(function (_a) {
            var c = _a[0];
            return c;
        })
            .sort(function (a, b) { return a - b; });
        var onlyFullColsSelected = fullCols.length > 0 && (fullCols.length * totalRows === selectedKeySet.size);
        if (onlyFullRowsSelected) {
            var rowsMeta = fullRows.map(function (r) { return ({
                index: r,
                rowModel: decoupleReference(props.rows[r])
            }); });
            // Push single undo entry for all rows
            this.parent.undoRedoAction.trackBulkRowDeletionForUndoRedo({
                blockId: tableCtx.tableBlockEl.id, rows: rowsMeta
            });
            var rowsToDeleteDom = fullRows
                .map(function (r) { return (props.enableHeader ? r + 1 : r); })
                .sort(function (a, b) { return b - a; });
            rowsToDeleteDom.forEach(function (domRowIdx) { return _this.parent.tableService.deleteRowAt({
                blockId: tableCtx.tableBlockEl.id,
                modelIndex: toModelRow(domRowIdx, props.enableHeader),
                isUndoRedoAction: true
            }); });
            return;
        }
        if (onlyFullColsSelected) {
            var colsMeta = fullCols.map(function (c) { return ({
                index: c,
                columnModel: decoupleReference(props.columns[c]),
                columnCells: props.rows.map(function (r) { return decoupleReference(r.cells[c]); })
            }); });
            this.parent.undoRedoAction.trackBulkColumnDeletionForUndoRedo({
                blockId: tableCtx.tableBlockEl.id, cols: colsMeta
            });
            // Delete columns from right to left (data col indices)
            fullCols.sort(function (a, b) { return b - a; }).forEach(function (dataColIdx) {
                return _this.parent.tableService.deleteColumnAt({
                    blockId: tableCtx.tableBlockEl.id,
                    colIndex: dataColIdx,
                    isUndoRedoAction: true
                });
            });
            return;
        }
        // Partial selection: clear cell contents
        this.parent.tableService.clearCellContents(tableEl, selectedCells);
    };
    ClipboardAction.prototype.triggerAfterPasteEvent = function (text) {
        this.parent.observer.notify('afterPaste', { content: text });
    };
    /**
     * Checks if the clipboard is empty.
     *
     * @returns {Promise<boolean>} - A promise that resolves to true if the clipboard is empty, false otherwise.
     * @hidden
     */
    ClipboardAction.prototype.isClipboardEmpty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clipboardItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, navigator.clipboard.read()];
                    case 1:
                        clipboardItems = _a.sent();
                        return [2 /*return*/, clipboardItems.length === 0];
                }
            });
        });
    };
    /**
     * Handles the context copy operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the copy operation is complete.
     * @hidden
     */
    ClipboardAction.prototype.handleContextCopy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, html, text;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getClipboardPayload(), html = _a.html, text = _a.text;
                        return [4 /*yield*/, navigator.clipboard.write([
                                new ClipboardItem({
                                    'text/html': new Blob([html], { type: 'text/html' }),
                                    'text/plain': new Blob([text], { type: 'text/plain' })
                                })
                            ])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the context cut operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the cut operation is complete.
     * @hidden
     */
    ClipboardAction.prototype.handleContextCut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleContextCopy()];
                    case 1:
                        _a.sent();
                        this.performCutOperation();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the context paste operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the paste operation is complete.
     * @hidden
     */
    ClipboardAction.prototype.handleContextPaste = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, text, file, clipboardItems, _i, clipboardItems_1, item, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = '';
                        text = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 13, , 15]);
                        return [4 /*yield*/, navigator.clipboard.read()];
                    case 2:
                        clipboardItems = _a.sent();
                        _i = 0, clipboardItems_1 = clipboardItems;
                        _a.label = 3;
                    case 3:
                        if (!(_i < clipboardItems_1.length)) return [3 /*break*/, 12];
                        item = clipboardItems_1[_i];
                        if (!(item.types.indexOf('text/html') !== -1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, item.getType('text/html')];
                    case 4: return [4 /*yield*/, (_a.sent()).text()];
                    case 5:
                        html = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(item.types.indexOf('text/plain') !== -1)) return [3 /*break*/, 9];
                        return [4 /*yield*/, item.getType('text/plain')];
                    case 7: return [4 /*yield*/, (_a.sent()).text()];
                    case 8:
                        text = _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!(item.types.indexOf('image/png') !== -1)) return [3 /*break*/, 11];
                        return [4 /*yield*/, item.getType('image/png')];
                    case 10:
                        file = _a.sent();
                        _a.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 3];
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        err_1 = _a.sent();
                        return [4 /*yield*/, navigator.clipboard.readText()];
                    case 14:
                        // Fallback for insecure context
                        text = _a.sent();
                        return [3 /*break*/, 15];
                    case 15:
                        this.performPasteOperation({ html: html, text: text, file: file });
                        return [2 /*return*/];
                }
            });
        });
    };
    ClipboardAction.prototype.destroy = function () {
        this.unwireEvents();
        this.clipboardCleanupModule = null;
    };
    return ClipboardAction;
}());
export { ClipboardAction };
