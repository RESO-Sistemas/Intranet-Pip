import { BlockType } from '../../../models/enums';
import { getSelectedRange, setCursorPosition } from '../../../common/utils/selection';
import { getBlockContentElement, getBlockModelById, isListTypeBlock } from '../../../common/utils/block';
import * as constants from '../../../common/constant';
var ListPlugin = /** @class */ (function () {
    function ListPlugin(manager) {
        this.parent = manager;
    }
    /**
     * Handles the key press event for list blocks.
     *
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {HTMLElement} blockElement - The block element.
     * @returns {boolean} - Returns true if the event is handled.
     * @hidden
     */
    ListPlugin.prototype.handleListKeyActions = function (event, blockElement) {
        var range = getSelectedRange();
        var blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        var isActionProcessed = false;
        switch (event.key) {
            case 'Enter':
                this.handleEnterKey(event, blockElement, range, blockModel);
                this.parent.isEntireEditorSelected = false;
                isActionProcessed = true;
                break;
            case 'Backspace':
                this.handleBackspaceKey(event, blockElement, range, blockModel);
                this.parent.isEntireEditorSelected = false;
                isActionProcessed = true;
                break;
        }
        return isActionProcessed;
    };
    /**
     * Handles creation of new list item on particular key triggers
     *
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {HTMLElement} blockElement - The block element.
     * @param {BlockModel} blockModel - The block model.
     * @returns {void}
     * @hidden
     */
    ListPlugin.prototype.handleListTriggerKey = function (event, blockElement, blockModel) {
        /**
         * Below are the list triggers for the block editor.
         * (*) or (-) for bullet list.
         * (1.) for numbered list.
         * ([]) for checklist.
         */
        var content = blockElement.textContent.trim();
        if (content.length <= 0) {
            return;
        }
        var validLength = (content.startsWith('*') || content.startsWith('-')) ? 1 : 2;
        var isListTrigger = content.startsWith('*') ||
            content.startsWith('-') ||
            content.startsWith('1.') ||
            content.startsWith('[]');
        if (isListTrigger && event.key === ' ' && event.code === 'Space' && content.length === validLength) {
            event.preventDefault();
            var listType = void 0;
            switch (content) {
                case '*':
                case '-':
                    listType = BlockType.BulletList.toString();
                    break;
                case '1.':
                    listType = BlockType.NumberedList.toString();
                    break;
                case '[]':
                    listType = BlockType.Checklist.toString();
                    break;
            }
            this.transformBlockToList(blockElement, blockModel, listType);
        }
    };
    ListPlugin.prototype.handleEnterKey = function (event, blockElement, range, blockModel) {
        event.preventDefault();
        var isEmpty = blockElement.textContent.trim() === '';
        if (isEmpty) {
            if (blockModel.indent > 0) {
                this.parent.execCommand({ command: 'IndentBlock', state: {
                        blockIDs: [blockModel.id],
                        shouldDecrease: true
                    } });
            }
            else {
                this.parent.blockCommand.transformBlockToParagraph(blockElement, blockModel);
            }
        }
        else {
            this.parent.execCommand({ command: 'SplitBlock' });
        }
    };
    ListPlugin.prototype.handleBackspaceKey = function (event, blockElement, range, blockModel) {
        var isAtStart = range.collapsed && range.startOffset === 0;
        var isEmpty = blockElement.textContent.trim() === '';
        if (!isAtStart && !isEmpty) {
            return;
        }
        event.preventDefault();
        this.parent.blockCommand.transformBlockToParagraph(blockElement, blockModel);
        this.recalculateMarkersForListItems();
    };
    ListPlugin.prototype.transformBlockToList = function (blockElement, blockModel, listType) {
        if (blockModel.content.length > 0) {
            blockModel.content[0].content = '';
        }
        var newBlockElement = this.parent.blockCommand.transformBlock({
            block: blockModel,
            blockElement: blockElement,
            newBlockType: listType
        });
        var contentElement = getBlockContentElement(newBlockElement);
        setCursorPosition(contentElement, 0);
        this.updateListItemMarkers(newBlockElement);
    };
    /**
     * Updates the list item markers the given block element.
     *
     * @param {HTMLElement} blockElement - The block element to update.
     * @returns {void}
     * @hidden
     */
    ListPlugin.prototype.updateListItemMarkers = function (blockElement) {
        var prevBlockType = blockElement.getAttribute('data-block-type');
        var listItem = blockElement.querySelector('li');
        var isNumbered = prevBlockType === BlockType.NumberedList;
        var isChecklist = prevBlockType === BlockType.Checklist;
        if (isChecklist || !isNumbered) {
            return;
        }
        var index = this.getNumberedListItemIndex(blockElement);
        var indentLevel = this.getIndentLevel(blockElement);
        var marker = this.getListMarker(index, indentLevel);
        listItem.style.setProperty('list-style-type', "\"" + marker + " \"");
    };
    ListPlugin.prototype.getNumberedListItemIndex = function (blockElement) {
        var index = 1;
        var allBlocks = this.getAllBlockElements(blockElement);
        var currentBlockIndex = allBlocks.indexOf(blockElement);
        if (currentBlockIndex < 0) {
            return index;
        }
        var currentIndentLevel = this.getIndentLevel(blockElement);
        // Count only blocks with same indent level and same type starting from current block
        for (var i = currentBlockIndex - 1; i >= 0; i--) {
            var prevBlock = allBlocks[i];
            var prevBlockType = prevBlock.getAttribute('data-block-type');
            var prevIndentLevel = this.getIndentLevel(prevBlock);
            if (prevBlockType !== BlockType.NumberedList || currentIndentLevel > prevIndentLevel) {
                break; // Stop when block type changes or indent level increases(new series)
            }
            if (prevIndentLevel === currentIndentLevel) {
                index++; // Increment only when indent level is same
            }
        }
        return index;
    };
    ListPlugin.prototype.getIndentLevel = function (blockElement) {
        return parseInt((blockElement.style.getPropertyValue(constants.INDENT_KEY)), 10) / ListPlugin.INDENT_STEP_SIZE;
    };
    ListPlugin.prototype.getListMarker = function (index, indentLevel) {
        var getRomanNumeral = function (num) {
            // Use lookup table for numbers 1–20 (Improved efficiency)
            if (num >= 1 && num <= 20) {
                return ListPlugin.ROMANNUMERALLOOKUP[num];
            }
            // Fallback algorithm for numbers >20
            var romanMap = [
                [1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'], [100, 'c'], [90, 'xc'],
                [50, 'l'], [40, 'xl'], [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']
            ];
            var result = '';
            for (var _i = 0, romanMap_1 = romanMap; _i < romanMap_1.length; _i++) {
                var _a = romanMap_1[_i], value = _a[0], symbol = _a[1];
                while (num >= value) {
                    result += symbol;
                    num -= value;
                }
            }
            return result;
        };
        var getLetterSequence = function (num) {
            var result = '';
            while (num > 0) {
                num--;
                result = String.fromCharCode(97 + (num % 26)) + result;
                num = Math.floor(num / 26);
            }
            return result;
        };
        switch (indentLevel % 3) {
            case 0:
                return index + ".";
            case 1:
                return getLetterSequence(index) + ".";
            case 2:
                return getRomanNumeral(index) + ".";
            default:
                return index + ".";
        }
    };
    /**
     * Recalculate the markers for all list items in the editor.
     *
     * @returns {void}
     * @hidden
     */
    ListPlugin.prototype.recalculateMarkersForListItems = function () {
        var allBlocks = this.getAllBlockElements();
        var indexByIndent = new Map();
        for (var _i = 0, allBlocks_1 = allBlocks; _i < allBlocks_1.length; _i++) {
            var block = allBlocks_1[_i];
            var blockType = block.getAttribute('data-block-type');
            if (!isListTypeBlock(blockType) || blockType === BlockType.Checklist || blockType === BlockType.BulletList) {
                continue;
            }
            var indentLevel = this.getIndentLevel(block);
            var prevBlockIndex = allBlocks.indexOf(block) - 1;
            var prevBlock = prevBlockIndex >= 0 ? allBlocks[prevBlockIndex] : null;
            var prevBlockType = prevBlock ? prevBlock.getAttribute('data-block-type') : '';
            var prevIndentLevel = prevBlock ? this.getIndentLevel(prevBlock) : -1;
            // Reset counters for deeper levels when we encounter a shallower or equal level
            if (prevBlock && (prevIndentLevel > indentLevel ||
                (prevIndentLevel === indentLevel && prevBlockType !== BlockType.NumberedList))) {
                for (var _a = 0, _b = indexByIndent; _a < _b.length; _a++) {
                    var level = _b[_a][0];
                    if (level > indentLevel) {
                        indexByIndent.delete(level);
                    }
                }
            }
            if (prevBlockType !== BlockType.NumberedList || prevIndentLevel < indentLevel) {
                indexByIndent.set(indentLevel, 1); // Start new sequence
            }
            else {
                // prevIndentLevel > indentLevel - returning to shallower level
                var currentIndex = (indexByIndent.get(indentLevel) || 0) + 1;
                indexByIndent.set(indentLevel, currentIndex);
            }
            var index = indexByIndent.get(indentLevel) || 1;
            this.setNumberedListMarker(block, index, indentLevel);
        }
    };
    ListPlugin.prototype.setNumberedListMarker = function (blockElement, index, indent) {
        var listItem = blockElement.querySelector('li');
        var marker = this.getListMarker(index, indent);
        listItem.style.setProperty('list-style-type', "\"" + marker + " \"");
    };
    ListPlugin.prototype.getAllBlockElements = function (focusedBlock) {
        var currentElement = focusedBlock || this.parent.currentFocusedBlock;
        var calloutBlock = currentElement &&
            currentElement.closest('.' + constants.CALLOUT_BLOCK_CLS);
        var quoteBlock = currentElement &&
            currentElement.closest('.' + constants.QUOTE_BLOCK_CLS);
        var toggleBlock = currentElement &&
            currentElement.closest('.' + constants.TOGGLE_BLOCK_CLS);
        var tableBlock = currentElement &&
            currentElement.closest('.' + constants.TABLE_BLOCK_CLS);
        var parentBlock = calloutBlock || quoteBlock || toggleBlock || tableBlock;
        var allBlocks = parentBlock
            ? Array.from(parentBlock.querySelectorAll('.' + constants.BLOCK_CLS))
            : Array.from(this.parent.blockContainer.children);
        return allBlocks;
    };
    ListPlugin.INDENT_STEP_SIZE = 20;
    // Lookup table for Roman numerals 1–20
    ListPlugin.ROMANNUMERALLOOKUP = {
        1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v',
        6: 'vi', 7: 'vii', 8: 'viii', 9: 'ix', 10: 'x',
        11: 'xi', 12: 'xii', 13: 'xiii', 14: 'xiv', 15: 'xv',
        16: 'xvi', 17: 'xvii', 18: 'xviii', 19: 'xix', 20: 'xx'
    };
    return ListPlugin;
}());
export { ListPlugin };
