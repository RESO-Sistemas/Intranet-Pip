import { detach, updateCSSText } from '@syncfusion/ej2-base';
import { BlockType } from '../../models/enums';
import { detectFormatsForTextNode, getBlockSpecificRange, getNormalizedKey, getParentBlock, getSelectedRange, hasActiveTableSelection } from '../../common/utils/index';
import { events } from '../../common/constant';
import { findClosestParent, getNodesInRange } from '../../common/utils/dom';
import * as constants from '../../common/constant';
/**
 * InlineToolbarModule class is used to render the inline toolbar for the block editor.
 *
 * @hidden
 */
var InlineToolbarModule = /** @class */ (function () {
    function InlineToolbarModule(manager) {
        this.parent = manager;
        this.addEventListeners();
    }
    InlineToolbarModule.prototype.addEventListeners = function () {
        this.parent.observer.on(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick, this);
        this.parent.observer.on('toolbarCreated', this.handleToolbarCreated, this);
        this.parent.observer.on('handleColorpickerChange', this.handleColorChange, this);
        this.parent.observer.on('popupWidthChanged', this.handlePopupWidthChanges, this);
        this.parent.observer.on(events.formattingPerformed, this.toggleToolbarActiveState, this);
        this.parent.observer.on(events.keydown, this.onKeydown, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    InlineToolbarModule.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick);
        this.parent.observer.off('toolbarCreated', this.handleToolbarCreated);
        this.parent.observer.off('handleColorpickerChange', this.handleColorChange);
        this.parent.observer.off('popupWidthChanged', this.handlePopupWidthChanges);
        this.parent.observer.off(events.formattingPerformed, this.toggleToolbarActiveState);
        this.parent.observer.off(events.keydown, this.onKeydown);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    InlineToolbarModule.prototype.handleToolbarCreated = function () {
        this.toolbarEle = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.BLOCKEDITOR_INLINETBAR_ID);
        this.init();
    };
    InlineToolbarModule.prototype.init = function () {
        this.popupElement = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.INLINE_TBAR_POPUP_ID);
        this.popupObj = this.parent.popupRenderer.renderPopup({
            element: this.popupElement,
            content: this.toolbarEle
        });
        this.popupObj.actionOnScroll = 'none';
    };
    InlineToolbarModule.prototype.onKeydown = function (e) {
        var normalizedKey = getNormalizedKey(e);
        if (!normalizedKey) {
            return;
        }
        var command = this.parent.keyCommandMap.get(normalizedKey);
        var allowedCommands = ['bold', 'italic', 'underline', 'strikethrough', 'inlineCode'];
        var tableBlk = this.parent.currentFocusedBlock &&
            this.parent.currentFocusedBlock.closest("." + constants.TABLE_BLOCK_CLS);
        if (allowedCommands.indexOf(command) !== -1) {
            e.preventDefault();
            if (window.getSelection().isCollapsed && !(tableBlk && hasActiveTableSelection(tableBlk))) {
                this.parent.formattingAction.toggleActiveFormats(command);
            }
            else {
                this.parent.execCommand({ command: 'FormattingAction', state: { command: command } });
            }
        }
    };
    InlineToolbarModule.prototype.isSelectionInTableHeader = function (range) {
        // Resolve a reliable HTMLElement anchor from the range
        var startEl = (range.startContainer.nodeType === Node.ELEMENT_NODE
            ? range.startContainer
            : range.startContainer.parentElement);
        if (!startEl) {
            return false;
        }
        // Nearest header cell: either an actual <th> or an element marked as column header
        var headerCell = startEl.closest('th,[role="columnheader"]');
        if (!headerCell) {
            return false;
        }
        // Ensure it's within a THEAD to qualify as header, not body cells styled as header
        var inThead = headerCell.closest('thead');
        return !!inThead;
    };
    /**
     * Shows the inline toolbar at the current selection
     *
     * @param {Range} range - Selection range where the toolbar should appear
     * @param {Event} event - Optional event that triggered the toolbar
     * @returns {void}
     * @hidden
     */
    InlineToolbarModule.prototype.showInlineToolbar = function (range, event) {
        var notAllowedTypes = [BlockType.Code];
        var blockElement = findClosestParent(range.startContainer, '.' + constants.BLOCK_CLS);
        var blockType = blockElement.getAttribute('data-block-type');
        if (!this.parent.inlineToolbarSettings.enable || (notAllowedTypes.indexOf(blockType) !== -1)) {
            return;
        }
        if (this.isSelectionInTableHeader(range)) {
            return;
        }
        this.toggleToolbarActiveState();
        this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(range, this.popupObj);
        this.popupObj.show();
    };
    /**
     * Hides the inline toolbar
     *
     * @param {Event} e - Optional event that triggered hiding the toolbar
     * @returns {void}
     */
    InlineToolbarModule.prototype.hideInlineToolbar = function (e) {
        if (this.popupElement && !this.popupElement.classList.contains('e-popup-open')) {
            return;
        }
        this.popupObj.hide();
    };
    InlineToolbarModule.prototype.handleInlineToolbarItemClick = function (args) {
        var selectedItem = args.item.id;
        if (selectedItem === 'color' || selectedItem === 'bgColor') {
            // Do not proceed further for color and background color commands. It will be handled by the color picker.
            return;
        }
        if (selectedItem === 'link') {
            // Show link popup when link item is clicked in inline toolbar
            this.parent.linkModule.showLinkPopup(args.originalEvent);
            return;
        }
        this.parent.execCommand({ command: 'FormattingAction', state: { command: selectedItem } });
    };
    /**
     * Updates active state of toolbar buttons based on current selection formatting.
     *
     * @returns {void}
     * @hidden
     */
    InlineToolbarModule.prototype.toggleToolbarActiveState = function () {
        var range = getSelectedRange();
        if (!range) {
            return;
        }
        var toolbarItems = this.popupElement.querySelectorAll('.e-toolbar-item');
        toolbarItems.forEach(function (item) { return item.classList.remove('e-active'); });
        var blockElements = this.getBlocksInRange(range);
        // Enable/Disable only the 'link' item based on multi-block selection
        var distinctBlocks = blockElements.filter(function (b) { return b.hasAttribute('data-block-type'); });
        var enableLink = distinctBlocks.length <= 1;
        if (this.parent && this.parent.editorMethods) {
            this.parent.editorMethods.enableDisableToolbarItems('link', enableLink);
        }
        var detectedFormats = this.detectFormatsFromSelection(range);
        if (!detectedFormats || Object.keys(detectedFormats).length === 0) {
            return;
        }
        for (var _i = 0, _a = Array.from(toolbarItems); _i < _a.length; _i++) {
            var item = _a[_i];
            var command = item.getAttribute('data-command');
            this.toggleActiveState(item, command, detectedFormats);
        }
    };
    /**
     * Detects active formats from selected text nodes in DOM.
     *
     * @param {Range} range - The selection range
     * @returns {Styles} - Common styles across selection
     * @hidden
     */
    InlineToolbarModule.prototype.detectFormatsFromSelection = function (range) {
        var _this = this;
        var nodesInSelection = [];
        var selectedBlockModels = this.parent.editorMethods.getSelectedBlocks();
        selectedBlockModels.forEach(function (block) {
            var blockElement = _this.parent.getBlockElementById(block.id);
            var blockRange = getBlockSpecificRange(range, blockElement);
            nodesInSelection.push.apply(nodesInSelection, getNodesInRange(blockRange));
        });
        if (nodesInSelection.length === 0) {
            return {};
        }
        var formatsByNode = nodesInSelection.map(function (textNode) {
            return detectFormatsForTextNode(textNode);
        });
        return this.getCommonFormatsAcrossNodes(formatsByNode);
    };
    /**
     * Finds common formats across multiple text nodes.
     * A format is "active" if ALL selected text nodes have it.
     *
     * @param {Styles[]} formatsByNode - Format styles for each text node
     * @returns {Styles} - Only formats that all nodes share
     */
    InlineToolbarModule.prototype.getCommonFormatsAcrossNodes = function (formatsByNode) {
        if (!formatsByNode.length) {
            return {};
        }
        if (formatsByNode.length === 1) {
            return formatsByNode[0];
        }
        var commonFormats = {};
        var firstNodeFormats = formatsByNode[0];
        var _loop_1 = function (format) {
            var firstValue = firstNodeFormats[format];
            var isCommon = formatsByNode.every(function (nodeFormats) {
                var value = nodeFormats[format];
                return value === firstValue;
            });
            if (isCommon) {
                commonFormats[format] = firstValue;
            }
        };
        for (var _i = 0, _a = Object.keys(firstNodeFormats); _i < _a.length; _i++) {
            var format = _a[_i];
            _loop_1(format);
        }
        return commonFormats;
    };
    InlineToolbarModule.prototype.getBlocksInRange = function (range) {
        var blocks = [];
        var startBlock = getParentBlock(range.startContainer);
        var endBlock = getParentBlock(range.endContainer);
        if (!startBlock) {
            return blocks;
        }
        // Single block case
        if (startBlock === endBlock) {
            blocks.push(startBlock);
            return blocks;
        }
        // Multi-block case
        var current = startBlock;
        while (current && current !== endBlock) {
            blocks.push(current);
            current = current.nextElementSibling;
        }
        if (endBlock) {
            blocks.push(endBlock);
        }
        return blocks.filter(function (block) { return block.hasAttribute('data-block-type'); });
    };
    InlineToolbarModule.prototype.toggleActiveState = function (item, command, styles) {
        var isActive = false;
        switch (command) {
            case 'Bold':
                isActive = styles.bold === true;
                break;
            case 'Italic':
                isActive = styles.italic === true;
                break;
            case 'Underline':
                isActive = styles.underline === true;
                break;
            case 'Strikethrough':
                isActive = styles.strikethrough === true;
                break;
            case 'Superscript':
                isActive = styles.superscript === true;
                break;
            case 'Subscript':
                isActive = styles.subscript === true;
                break;
            case 'Uppercase':
                isActive = styles.uppercase === true;
                break;
            case 'Lowercase':
                isActive = styles.lowercase === true;
                break;
            case 'InlineCode':
                isActive = styles.inlineCode === true;
                break;
            case 'Color':
                this.setColors('color', styles.color);
                break;
            case 'BackgroundColor':
                this.setColors('bgColor', styles.backgroundColor);
                break;
        }
        item.classList.toggle('e-active', isActive);
    };
    InlineToolbarModule.prototype.setColors = function (type, value) {
        var colorBtn = this.toolbarEle.querySelector('#toolbar-color-dropdown');
        var bgColorBtn = this.toolbarEle.querySelector('#toolbar-bgcolor-dropdown');
        var currentColor = value ? value : '#000000';
        if (currentColor) {
            var button = type === 'color' ?
                colorBtn.querySelector('.e-inline-color-icon') :
                bgColorBtn.querySelector('.e-inline-bgColor-icon');
            if (button) {
                updateCSSText(button, "border-bottom-color: " + currentColor + ";");
            }
        }
    };
    InlineToolbarModule.prototype.handleColorChange = function (args) {
        var command = args.type === 'bgColor' ? 'backgroundColor' : args.type;
        this.parent.formattingAction.execCommand({
            command: command,
            value: args.value
        });
        this.setColors(args.type, args.value);
    };
    InlineToolbarModule.prototype.handlePopupWidthChanges = function (data) {
        this.popupObj.width = this.parent.inlineToolbarSettings.popupWidth = data.value;
    };
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    InlineToolbarModule.prototype.isPopupOpen = function () {
        var inlineTlbrPopupElement = document.querySelector('.e-popup.e-blockeditor-inline-toolbar-popup');
        return (inlineTlbrPopupElement.classList.contains('e-popup-open'));
    };
    /**
     * Destroys the inline toolbar module and cleans up resources
     *
     * @returns {void}
     */
    InlineToolbarModule.prototype.destroy = function () {
        this.removeEventListeners();
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupElement);
            this.popupObj = null;
        }
    };
    return InlineToolbarModule;
}());
export { InlineToolbarModule };
