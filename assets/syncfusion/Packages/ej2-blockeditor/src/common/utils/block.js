import { detach } from '@syncfusion/ej2-base';
import { BlockType } from '../../models/enums';
import { getSelectedRange } from './selection';
import { findClosestParent, isNodeInsideElement } from './dom';
import * as constants from '../../common/constant';
import { getDeepestTextNode } from './common';
import { hasActiveTableSelection } from './table-utils';
/**
 * Gets a block type from the element
 *
 * @param {HTMLElement} blockElement - The block element.
 * @returns {string} The block type
 */
export function extractBlockTypeFromElement(blockElement) {
    return blockElement ? blockElement.getAttribute('data-block-type') : '';
}
/**
 * Finds a block by its ID.
 *
 * Searches recursively through the list of blocks to find a block with the specified ID.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {BlockModel | null} The matching block or null if not found.
 */
export function getBlockModelById(blockId, blocks) {
    for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
        var block = blocks_1[_i];
        if (block.id === blockId) {
            return block;
        }
        // Recurse into container blocks (children)
        var props = block.properties;
        if (props && props.children && props.children.length > 0) {
            var childBlock = getBlockModelById(blockId, props.children);
            if (childBlock) {
                return childBlock;
            }
        }
        // Recurse into table cell blocks
        if (block.blockType === BlockType.Table && block.properties) {
            var tprops = block.properties;
            if (tprops.rows && Array.isArray(tprops.rows)) {
                for (var _a = 0, _b = tprops.rows; _a < _b.length; _a++) {
                    var row = _b[_a];
                    for (var _c = 0, _d = row.cells; _c < _d.length; _c++) {
                        var cell = _d[_c];
                        if (cell.blocks && cell.blocks.length) {
                            var inner = getBlockModelById(blockId, cell.blocks);
                            if (inner) {
                                return inner;
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}
/**
 * Gets the index of a specific block element within the blocks array.
 *
 * @param {string} id - The id of the block element.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {number} The index of the block element in the blocks array, or -1 if not found.
 */
export function getBlockIndexById(id, blocks) {
    if (blocks.length === 0 || !id) {
        return -1;
    }
    var blockModel = getBlockModelById(id, blocks);
    if (!blockModel) {
        return -1;
    }
    // Determine the array that directly contains this block
    var containerInfo = getContainerInfo(id, blocks);
    if (containerInfo && containerInfo.array) {
        return containerInfo.array.indexOf(blockModel);
    }
    return -1;
}
/**
 * Retrieves the content model associated with a specific DOM node within the block structure.
 *
 * @param {Node | null} node - The DOM node for which to find the corresponding content model.
 * @param {BlockModel[]} blocks - The list of blocks to search within.
 * @returns {ContentModel | null} - The content model corresponding to the node, or null if not found.
 */
export function getContentModelByNode(node, blocks) {
    var blockElement = findClosestParent(node, '.' + constants.BLOCK_CLS);
    var contentElement = getBlockContentElement(blockElement);
    var block = getBlockModelById(blockElement.id, blocks);
    var nodeOffset = getAbsoluteOffsetOfNode(node, contentElement);
    return findModelByTextOffset(block, nodeOffset);
}
/**
 * Calculates the absolute offset of a target node within a content element.
 *
 * @param {Node} targetNode - The DOM node whose offset is to be calculated.
 * @param {HTMLElement} contentElement - The root content element containing the target node.
 * @returns {number} - The absolute offset position of the target node, or -1 if not found.
 */
export function getAbsoluteOffsetOfNode(targetNode, contentElement) {
    var offset = 0;
    var found = false;
    function traverse(node) {
        if (found) {
            return;
        }
        if (node === targetNode) {
            found = true;
            return;
        }
        if (node.nodeType === Node.TEXT_NODE) {
            offset += node.length;
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            for (var i = 0; i < node.childNodes.length; i++) {
                traverse(node.childNodes[i]);
                if (found) {
                    return;
                }
            }
        }
    }
    traverse(contentElement);
    return found ? offset : -1;
}
/**
 * Finds the model within a block that corresponds to a specific text offset.
 * Traverses the content array of the block to locate the model containing the offset.
 *
 * @param {BlockModel} block - The block containing content models.
 * @param {number} offset - The absolute text offset to locate.
 * @returns {ContentModel | null} - The content model at the specified offset or null if not found.
 */
export function findModelByTextOffset(block, offset) {
    var cumulativeOffset = 0;
    for (var _i = 0, _a = block.content; _i < _a.length; _i++) {
        var model = _a[_i];
        var modelLength = model.content.length;
        var modelEndOffset = cumulativeOffset + modelLength;
        if (offset >= cumulativeOffset && offset < modelEndOffset) {
            return model;
        }
        else if (modelLength === 0) {
            if (offset === cumulativeOffset) {
                return model;
            }
        }
        cumulativeOffset = modelEndOffset;
    }
    return null;
}
/**
 * Gets the content models that span the specified node within the blocks.
 *
 * @param {Node} node - The DOM node inside a block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {ContentModel[]} - An array of ContentModel objects that the node spans.
 */
export function getContentModelsByNode(node, blocks) {
    var blockElement = findClosestParent(node, '.' + constants.BLOCK_CLS);
    var contentElement = getBlockContentElement(blockElement);
    var block = getBlockModelById(blockElement.id, blocks);
    var nodeStart = getAbsoluteOffsetOfNode(node, contentElement);
    var nodeEnd = nodeStart + node.length;
    var models = [];
    var cumulativeOffset = 0;
    for (var _i = 0, _a = block.content; _i < _a.length; _i++) {
        var model = _a[_i];
        var modelStart = cumulativeOffset;
        var modelEnd = cumulativeOffset + model.content.length;
        if (nodeStart < modelEnd && nodeEnd > modelStart) {
            models.push(model);
        }
        cumulativeOffset = modelEnd;
    }
    return models;
}
/**
 * Returns the blocks array that directly contains the given block id.
 * This may be the root blocks, a container block's children, or a table cell's blocks.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {BlockModel[]} The corresponding container array or null if not found.
 */
export function getParentBlocksArray(blockId, blocks) {
    var info = getContainerInfo(blockId, blocks);
    return info ? info.array : null;
}
/**
 * Returns container info for the array that contains the given block id.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {IBlocksContainerInfo} The block container info or null if not found.
 */
export function getContainerInfo(blockId, blocks) {
    var target = getBlockModelById(blockId, blocks);
    if (!target) {
        return null;
    }
    // If parentId empty, it is in root
    if (!target.parentId) {
        return { array: blocks, containerType: 'root', containerId: '' };
    }
    // Try as child of a container block
    var parentBlock = getBlockModelById(target.parentId, blocks);
    if (parentBlock && parentBlock.properties.children) {
        return {
            array: parentBlock.properties.children,
            containerType: 'children',
            containerId: parentBlock.id
        };
    }
    // Try as child of a table cell
    var cell = findCellById(target.parentId, blocks);
    if (cell) {
        return { array: cell.blocks, containerType: 'cell', containerId: cell.id };
    }
    // Fallback root
    return { array: blocks, containerType: 'root', containerId: '' };
}
/**
 * Locate a table cell by its id and return the Cell model.
 *
 * @param {string} cellId - Id of the cell
 * @param {BlockModel[]} blocks - Collection of blocks
 * @returns {TableCellModel} - An object of cell model
 */
export function findCellById(cellId, blocks) {
    if (!cellId) {
        return null;
    }
    for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
        var block = blocks_2[_i];
        if (block.blockType === BlockType.Table) {
            var tprops = block.properties;
            if (tprops && tprops.rows) {
                for (var _a = 0, _b = tprops.rows; _a < _b.length; _a++) {
                    var row = _b[_a];
                    for (var _c = 0, _d = row.cells; _c < _d.length; _c++) {
                        var cell = _d[_c];
                        if (cell.id === cellId) {
                            return cell;
                        }
                    }
                }
            }
        }
    }
    return null;
}
/**
 * Gets the parent block.
 *
 * @param {HTMLElement | Node} element - The element for which you need to find the parent.
 * @returns {HTMLElement | null} The parent element if found, otherwise null.
 */
export function getParentBlock(element) {
    // If the node is a text node, move to its parent element first
    if (element && element.nodeType === Node.TEXT_NODE) {
        element = element.parentElement;
    }
    while (element && element.nodeType === Node.ELEMENT_NODE) {
        if (element.classList.contains('e-block')) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
}
/**
 * Gets the adjacent block of the current block based on the direction.
 *
 * @param {HTMLElement} currentBlock - The current block element.
 * @param {string} direction - The direction to find the adjacent block ('previous' or 'next').
 * @returns {HTMLElement | null} The adjacent block element if found, otherwise null.
 */
export function getAdjacentBlock(currentBlock, direction) {
    if (!currentBlock) {
        return null;
    }
    var adjacentBlock = direction === 'previous'
        ? currentBlock.previousElementSibling
        : currentBlock.nextElementSibling;
    if (adjacentBlock instanceof HTMLElement && adjacentBlock.classList.contains('e-block')) {
        return adjacentBlock;
    }
    var calloutBlock = findClosestParent(currentBlock, '.' + constants.CALLOUT_BLOCK_CLS);
    if (calloutBlock) {
        var calloutContent = calloutBlock.querySelector('.' + constants.CALLOUT_CONTENT_CLS);
        if (direction === 'previous' && currentBlock === calloutContent.firstElementChild) {
            return calloutBlock.previousElementSibling;
        }
        else if (direction === 'next' && currentBlock === calloutContent.lastElementChild) {
            return calloutBlock.nextElementSibling;
        }
    }
    var quoteBlock = findClosestParent(currentBlock, '.' + constants.QUOTE_BLOCK_CLS);
    if (quoteBlock) {
        var quoteContent = quoteBlock.querySelector('.' + constants.QUOTE_CONTENT_CLS);
        if (quoteContent) {
            if (direction === 'previous' && currentBlock === quoteContent.firstElementChild) {
                // At the first line of quote → go to block before the quote
                return quoteBlock.previousElementSibling;
            }
            else if (direction === 'next' && currentBlock === quoteContent.lastElementChild) {
                // At the last line of quote → go to block after the quote
                return quoteBlock.nextElementSibling;
            }
        }
    }
    return null;
}
/**
 * Gets the actual content element inside the block.
 *
 * @param {HTMLElement} blockElement - The block element.
 * @returns {HTMLElement | null} The content element inside the block if found, otherwise null.
 */
export function getBlockContentElement(blockElement) {
    if (!blockElement) {
        return null;
    }
    var blockType = blockElement.getAttribute('data-block-type');
    if (blockType && blockType.startsWith('Collapsible')) {
        return blockElement.querySelector('.e-toggle-header').querySelector('.' + constants.CONTENT_CLS);
    }
    return blockElement.querySelector('.' + constants.CONTENT_CLS);
}
/**
 * Gets the adjacent cell of the current cell based on the direction.
 *
 * @param {HTMLElement} table - The table element.
 * @param {string} direction - The direction to find the adjacent cell ('up', 'down', 'left', 'right').
 * @param {HTMLTableCellElement} currentCell - The current cell element.
 * @returns {HTMLElement | null} The adjacent cell element if found, otherwise null.
 */
export function getAdjacentCell(table, direction, currentCell) {
    if (!currentCell) {
        return null;
    }
    var rowIndex = parseInt(currentCell.dataset.row, 10);
    var colIndex = parseInt(currentCell.dataset.col, 10);
    var targetRowIndex = rowIndex;
    var targetColIndex = colIndex;
    switch (direction) {
        case 'up':
            targetRowIndex = rowIndex - 1;
            break;
        case 'down':
            targetRowIndex = rowIndex + 1;
            break;
        case 'left':
            targetColIndex = colIndex - 1;
            break;
        case 'right':
            targetColIndex = colIndex + 1;
            break;
    }
    var targetCellSelector = "[data-row=\"" + targetRowIndex + "\"][data-col=\"" + targetColIndex + "\"]";
    var targetCell = table.querySelector(targetCellSelector);
    return targetCell;
}
/**
 * Specifies whether the given block is a list type block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a list type block, otherwise false.
 */
export function isListTypeBlock(blockType) {
    return blockType === BlockType.BulletList || blockType === BlockType.NumberedList || blockType === BlockType.Checklist;
}
/**
 * Specifies whether the given block is a children type block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a children type block, otherwise false.
 */
export function isChildrenTypeBlock(blockType) {
    return blockType === BlockType.Callout || blockType === BlockType.Quote || (blockType && blockType.toString().startsWith('Collapsible'));
}
/**
 * Specifies whether the given element is a divider block.
 *
 * @param {HTMLElement} blockElement - The block element to check.
 * @returns {boolean} - Returns true if the block is a divider block, otherwise false.
 */
export function isDividerBlock(blockElement) {
    return blockElement && blockElement.classList.contains('e-divider-block');
}
/**
 * Specifies whether the given block is a non content editable block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a non content editable block, otherwise false.
 */
export function isNonContentEditableBlock(blockType) {
    return blockType === BlockType.Divider || blockType === BlockType.Image;
}
/**
 * Specifies whether the cursor is at edge of the block.(start or end)
 *
 * @param {HTMLElement} contentElement - The content element to check.
 * @param {boolean} isStart - Specifies whether to check for start or end of the block.
 * @returns {boolean} - Returns true if the cursor is at edge of the block, otherwise false.
 */
export function isCursorAtEdge(contentElement, isStart) {
    var isCursorAtStart = isAtStartOfBlock(contentElement);
    var isCursorAtEnd = isAtEndOfBlock(contentElement);
    return isStart ? isCursorAtStart : isCursorAtEnd;
}
/**
 * Returns true if the current selection is at the start of the block.
 *
 * @param {HTMLElement} element - The block element to check.
 * @returns {boolean} True if the selection is at the start of the block, false otherwise.
 */
export function isAtStartOfBlock(element) {
    if (!element) {
        return false;
    }
    var range = getSelectedRange();
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    var firstTextNode = walker.nextNode();
    var startContainer = normalizeIntoContentElement(range.startContainer);
    return (range.collapsed &&
        (startContainer === firstTextNode || startContainer === element) &&
        range.startOffset === 0);
}
/**
 * Returns true if the current selection is at the end of the block.
 *
 * @param {HTMLElement} element - The block element to check.
 * @returns {boolean} True if the selection is at the end of the block, false otherwise.
 */
export function isAtEndOfBlock(element) {
    if (!element) {
        return false;
    }
    var range = getSelectedRange();
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    var lastTextNode = null;
    var totalLength = 0;
    while (walker.nextNode()) {
        lastTextNode = walker.currentNode;
        totalLength = lastTextNode.textContent.length;
    }
    return (range.collapsed &&
        (range.startContainer === lastTextNode || range.startContainer === element) &&
        range.startOffset === totalLength);
}
/**
 * Normalizes an element into a content element.
 *
 * @param {HTMLElement | Node} element - The element to normalize.
 * @returns {HTMLElement | Node} The normalized content element.
 *
 */
export function normalizeIntoContentElement(element) {
    if (element instanceof HTMLElement && element.classList.contains('e-block')) {
        return element.querySelector('.' + constants.CONTENT_CLS);
    }
    // else if (element instanceof HTMLElement && element.nodeName === 'BR') {
    //     return findTopLevelChildInContent(element, findClosestParent(element, '.' + constants.CONTENT_CLS));
    // }
    return element;
}
/**
 * Removes empty text nodes from the given element.
 *
 * @param {HTMLElement | Node} element - The element to remove empty nodes from.
 * @returns {HTMLElement | Node} The normalized content element.
 *
 */
export function removeEmptyTextNodes(element) {
    Array.from(element.childNodes).forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
            detach(node);
        }
    });
}
export function cleanCheckmarkElement(blockElement) {
    var checkmarkElement = blockElement.querySelector('.e-checkmark-container');
    if (checkmarkElement) {
        detach(checkmarkElement);
    }
}
export function isEmptyString(id) {
    return !id || id.trim() === '';
}
export function isChildrenProp(block) {
    return block.properties && 'children' in block.properties;
}
export function isAlwaysOnPlaceHolderBlk(blockType) {
    var showPlaceholdersAlwaysFor = [BlockType.BulletList, BlockType.Checklist, BlockType.NumberedList];
    return blockType && (showPlaceholdersAlwaysFor.indexOf(blockType) >= 0);
}
var nonMergableBlockTypes = new Set([BlockType.Image, BlockType.Divider]);
export function isNonMergableBlock(blockElement) {
    return nonMergableBlockTypes.has(extractBlockTypeFromElement(blockElement));
}
/**
 * Gets the adjacent block of the current block based on the direction.
 *
 * @param {HTMLElement} currentBlock - The current block element.
 * @param {string} direction - The direction to find the adjacent block ('previous' or 'next').
 * @returns {HTMLElement | null} The adjacent block element if found, otherwise null.
 */
export function getTargetBlock(currentBlock, direction) {
    if (!currentBlock) {
        return null;
    }
    var adjacentBlock = direction === 'previous'
        ? currentBlock.previousElementSibling
        : currentBlock.nextElementSibling;
    if (adjacentBlock instanceof HTMLElement && adjacentBlock.classList.contains('e-block')) {
        return adjacentBlock;
    }
    return null;
}
export function getBlockSpecificRange(globalRange, blockElement) {
    var contentElement = getBlockContentElement(blockElement);
    var blockRange = document.createRange();
    var startTextNode = contentElement.firstChild.nodeType === Node.ELEMENT_NODE
        ? (getDeepestTextNode(contentElement.firstChild) || contentElement.firstChild) : contentElement.firstChild;
    var endTextNode = contentElement.lastChild.nodeType === Node.ELEMENT_NODE ?
        (getDeepestTextNode(contentElement.lastChild) || contentElement.lastChild) : contentElement.lastChild;
    var tableEle = blockElement.closest('.' + constants.TABLE_BLOCK_CLS);
    var hasActiveSel = hasActiveTableSelection(tableEle);
    blockRange.selectNodeContents(contentElement);
    blockRange.setStart(startTextNode, 0);
    blockRange.setEnd(endTextNode, endTextNode.textContent.length);
    if (!globalRange || hasActiveSel) {
        return blockRange;
    }
    if (isNodeInsideElement(globalRange.startContainer, blockElement)) {
        blockRange.setStart(globalRange.startContainer, globalRange.startOffset);
    }
    if (isNodeInsideElement(globalRange.endContainer, blockElement)) {
        blockRange.setEnd(globalRange.endContainer, globalRange.endOffset);
    }
    return blockRange;
}
