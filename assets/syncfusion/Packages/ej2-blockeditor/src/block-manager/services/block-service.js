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
import { BlockType } from '../../models/index';
import { getBlockModelById, getBlockIndexById, getParentBlocksArray } from '../../common/utils/block';
import { generateUniqueId, decoupleReference, getInverseStyle } from '../../common/utils/common';
import * as constants from '../../common/constant';
import { BlockFactory } from './block-factory';
/**
 * Service responsible for core block-related logics that updates model
 */
var BlockService = /** @class */ (function () {
    function BlockService(blocks) {
        this.blocks = blocks;
    }
    /**
     * Adds a new block to the provided blocks array
     *
     * @param {IAddBlockOptions} options - Options for creating the block
     * @returns {BlockModel} - The newly added block model
     * @hidden
     */
    BlockService.prototype.addBlock = function (options) {
        var targetBlockModel = options.targetBlockId ? getBlockModelById(options.targetBlockId, this.blocks) : null;
        var insertArray = targetBlockModel ? getParentBlocksArray(targetBlockModel.id, this.blocks) : this.blocks;
        var indexToInsert = this.getIndexToAdjust(insertArray, targetBlockModel, options.isAfter);
        insertArray.splice(indexToInsert, 0, options.block);
        return options.block;
    };
    /**
     * Removes a block model from the blocks array
     *
     * @param {IRemoveBlockOptions} options - Options for removing the block
     * @returns {{ removedBlock: BlockModel, blockIndex: number }} The removed block and its index
     * @hidden
     */
    BlockService.prototype.removeBlock = function (_a) {
        var blockId = _a.blockId;
        var blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return { removedBlock: null, blockIndex: -1 };
        }
        var containerArray = getParentBlocksArray(blockId, this.blocks);
        var blockIndex = getBlockIndexById(blockId, this.blocks);
        var removedBlock = containerArray.splice(blockIndex, 1)[0];
        return { removedBlock: removedBlock, blockIndex: blockIndex };
    };
    /**
     * Updates a block with the provided properties
     *
     * @param {string} blockId - The ID of the block to update
     * @param {Partial<BlockModel>} properties - The properties to update
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {BlockModel} Updated block and blocks array
     * @hidden
     */
    BlockService.prototype.updateBlock = function (blockId, properties) {
        var blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return null;
        }
        var updatedBlock = this.mergeBlockProperties(blockModel, properties);
        var containerArray = getParentBlocksArray(blockId, this.blocks);
        var blockIndex = getBlockIndexById(blockId, containerArray);
        containerArray.splice(blockIndex, 1, updatedBlock);
        return updatedBlock;
    };
    /**
     * Duplicates the given block model
     *
     * @param {IDuplicateBlockOptions} options - Options for duplicating the block
     * @returns {BlockModel} The duplicated block model or null
     * @hidden
     */
    BlockService.prototype.duplicateBlock = function (_a) {
        var blockId = _a.blockId;
        var blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return null;
        }
        var containerArray = getParentBlocksArray(blockId, this.blocks);
        var blockIndex = getBlockIndexById(blockId, containerArray);
        var blockToClone = containerArray[blockIndex];
        var clonedBlock = decoupleReference(blockToClone);
        var duplicatedBlockModel = this.generateNewIdsForBlock(clonedBlock);
        return duplicatedBlockModel;
    };
    /**
     * Moves the given block model to a new position
     *
     * @param {IMoveBlockOptions} options - Options for moving the block}
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.moveBlocks = function (options) {
        var blockIds = options.blockIds, toBlockId = options.toBlockId, _a = options.isMovingUp, isMovingUp = _a === void 0 ? false : _a;
        var toBlockModel = getBlockModelById(toBlockId, this.blocks);
        if (!toBlockModel) {
            return [];
        }
        // Collect information about blocks to move
        var fromEntries = this.gatherBlocksInfoForMove(blockIds);
        if (fromEntries.length === 0) {
            return [];
        }
        // Remove blocks from their original positions
        var movedBlocks = this.removeBlocksForMove(fromEntries);
        // Insert blocks at the target position
        this.insertBlocksAtTarget(movedBlocks, toBlockId, isMovingUp);
        return movedBlocks;
    };
    /**
     * Handles the indent/outdent of block
     *
     * @param {IIndentBlockOptions} options - Options to indent/unindent block
     * @returns {BlockModel} - The updated block model
     * @hidden
     */
    BlockService.prototype.applyIndentation = function (options) {
        var blockId = options.blockId, shouldDecrease = options.shouldDecrease;
        var blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return null;
        }
        var blockIndex = getBlockIndexById(blockId, this.blocks);
        var parentBlock = getBlockModelById(blockModel.parentId, this.blocks);
        if (shouldDecrease) {
            if (blockModel.indent > 0) {
                blockModel.indent--;
            }
        }
        else {
            // Indent - only allow if previous block is at same or higher level
            var adjacentBlockModel = parentBlock
                ? parentBlock.properties.children[blockIndex - 1]
                : this.blocks[blockIndex - 1];
            if (adjacentBlockModel) {
                if (blockModel.indent <= adjacentBlockModel.indent) {
                    blockModel.indent++;
                }
            }
            else {
                blockModel.indent++;
            }
        }
        return blockModel;
    };
    /**
     * Handles the line break of block
     *
     * @param {number} insertOffset - The offset at which to insert the line break
     * @param {ContentModel} contentModel - The content model to update
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.applyLineBreak = function (insertOffset, contentModel) {
        if (insertOffset < 0 || !contentModel) {
            return;
        }
        contentModel.content =
            contentModel.content.substring(0, insertOffset) +
                '\n' +
                contentModel.content.substring(insertOffset);
    };
    /**
     * Updates the block content with given data
     *
     * @param {string} blockId The id of the block
     * @param {ContentModel[]} content The content to update
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.updateContent = function (blockId, content) {
        var block = getBlockModelById(blockId, this.blocks);
        block.content = content;
    };
    /**
     * Toggles formatting style on content model
     *
     * @param {ContentModel} content - The content model to update
     * @param {any} format - The format to toggle (eg. Bold, Italic)
     * @param {boolean} force - Whether to force the format intent
     * @param {boolean} formatIntent - Whether to apply or remove the format
     * @param {string} value - The value for non-boolean styles
     * @returns {ContentModel} - The updated content model
     * @hidden
     */
    BlockService.prototype.toggleContentStyles = function (content, format, force, formatIntent, value) {
        var updatedContent = __assign({}, content);
        var booleanStyles = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'uppercase', 'lowercase', 'inlineCode'];
        var togglePairs = ['superscript', 'subscript', 'uppercase', 'lowercase'];
        var isBooleanStyle = booleanStyles.indexOf(format) !== -1;
        var isTogglePair = togglePairs.indexOf(format) !== -1;
        if (!updatedContent.properties) {
            updatedContent.properties = { styles: {} };
        }
        if (!updatedContent.properties.styles) {
            updatedContent.properties.styles = {};
        }
        var styles = updatedContent.properties.styles;
        if (isBooleanStyle) {
            var newValue = !styles[format];
            if (force) {
                newValue = formatIntent;
            }
            if (newValue) {
                styles[format] = true;
            }
            else {
                delete styles[format];
            }
            if (isTogglePair) {
                var oppositeFormat = getInverseStyle(format);
                delete styles[oppositeFormat];
            }
        }
        else {
            if (value) {
                styles[format] = value;
            }
            else {
                delete styles[format];
            }
        }
        return updatedContent;
    };
    /**
     * Applies link formatting to content model
     *
     * @param {ContentModel} content - The content model to update
     * @param {LinkData} linkData - The link data containing URL, text, and other properties
     * @returns {ContentModel} - The updated content model
     * @hidden
     */
    BlockService.prototype.applyLinkFormatting = function (content, linkData) {
        var updatedContent;
        var textContent = linkData.text ? linkData.text : content.content;
        if (!linkData.shouldRemoveLink) {
            updatedContent = BlockFactory.createLinkContent({ content: textContent }, __assign({}, content.properties, { url: linkData.url }));
        }
        else {
            delete content.properties.url;
            updatedContent = BlockFactory.createTextContent({
                content: textContent
            }, content.properties);
        }
        return updatedContent;
    };
    /**
     * Assigns parent ID to multiple blocks
     *
     * @param {BlockModel[]} blocks - The blocks to update
     * @param {string} parentId - The parent ID to assign
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.assignParentIdToBlocks = function (blocks, parentId) {
        blocks.forEach(function (block) {
            block.parentId = parentId;
        });
    };
    /**
     * Gets the index to adjust the block based on the given targetBlock.
     *
     * @param {BlockModel[]} insertionArray The target collection of blocks to insert.
     * @param {BlockModel} targetBlock The block after which the new block should be inserted.
     * @param {boolean} isAfter Specifies whether the new block should be inserted after the targetBlock.
     * @returns {number} The index at which the new block should be inserted.
     * @hidden
     */
    BlockService.prototype.getIndexToAdjust = function (insertionArray, targetBlock, isAfter) {
        if (isAfter === void 0) { isAfter = true; }
        var insertIndex = insertionArray.length;
        if (targetBlock) {
            var afterBlockIndex = getBlockIndexById(targetBlock.id, insertionArray);
            if (afterBlockIndex !== -1) {
                insertIndex = afterBlockIndex + (isAfter ? 1 : 0);
            }
        }
        return insertIndex;
    };
    /**
     * Gathers information about blocks to be moved
     *
     * @param {string[]} fromBlockIds Array of block IDs to move
     * @returns {IFromBlockData[]} Array of block information objects
     * @hidden
     */
    BlockService.prototype.gatherBlocksInfoForMove = function (fromBlockIds) {
        var entries = [];
        for (var _i = 0, fromBlockIds_1 = fromBlockIds; _i < fromBlockIds_1.length; _i++) {
            var fromBlockId = fromBlockIds_1[_i];
            var blockModel = getBlockModelById(fromBlockId, this.blocks);
            var index = getBlockIndexById(fromBlockId, this.blocks);
            if (index >= 0 && blockModel) {
                var parent_1 = getBlockModelById(blockModel.parentId, this.blocks);
                entries.push({ blockId: fromBlockId, model: blockModel, index: index, parent: parent_1 });
            }
        }
        return entries.sort(function (a, b) { return b.index - a.index; });
    };
    /**
     * Removes blocks from their current position in the model
     *
     * @param {IFromBlockData[]} fromEntries Array of block information objects
     * @returns {IFromBlockData[]} Array of removed block models
     * @hidden
     */
    BlockService.prototype.removeBlocksForMove = function (fromEntries) {
        var allFromModels = [];
        // Splice safely from the highest index to avoid index shifts
        for (var _i = 0, fromEntries_1 = fromEntries; _i < fromEntries_1.length; _i++) {
            var entry = fromEntries_1[_i];
            var blockId = entry.blockId, index = entry.index, parent_2 = entry.parent;
            var containerArray = getParentBlocksArray(blockId, this.blocks);
            var moved = containerArray.splice(index, 1)[0];
            // allFromModels has the original indexes and parentid before mutation in reverse order
            allFromModels.push({ blockId: blockId, model: moved, parent: parent_2, index: index });
        }
        return allFromModels;
    };
    /**
     * Inserts blocks at the target position in the model
     *
     * @param {IFromBlockData[]} movedBlocks Array of block models to insert
     * @param {string} toBlockId Target block ID
     * @param {boolean} isMovingUp Whether blocks are moving up or down
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.insertBlocksAtTarget = function (movedBlocks, toBlockId, isMovingUp) {
        var toBlockIndex = getBlockIndexById(toBlockId, this.blocks);
        if (toBlockIndex < 0) {
            return null;
        }
        var insertToArray = getParentBlocksArray(toBlockId, this.blocks);
        var toBlockModel = getBlockModelById(toBlockId, insertToArray);
        var toParentBlock = getBlockModelById(toBlockModel.parentId, this.blocks);
        var insertIndex = getBlockIndexById(toBlockId, insertToArray) + (isMovingUp ? 0 : 1);
        for (var _i = 0, movedBlocks_1 = movedBlocks; _i < movedBlocks_1.length; _i++) {
            var entry = movedBlocks_1[_i];
            entry.model.parentId = toParentBlock ? toParentBlock.id : '';
            insertToArray.splice(insertIndex, 0, entry.model);
        }
    };
    /**
     * Replaces a block at specific index in parent's children or root blocks array
     *
     * @param {string} originalBlockId - The ID of the block to replace
     * @param {BlockModel} newBlock - The new block to insert
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.replaceBlock = function (originalBlockId, newBlock) {
        var originalBlock = getBlockModelById(originalBlockId, this.blocks);
        if (!originalBlock) {
            return;
        }
        var insertToArray = getParentBlocksArray(originalBlockId, this.blocks);
        var indexToReplace = getBlockIndexById(originalBlock.id, insertToArray);
        insertToArray.splice(indexToReplace, 1, newBlock);
    };
    /**
     * Generates new IDs for the block and its content.
     *
     * @param {BlockModel} block The block model to generate new IDs for.
     * @param {string} parentId The parent ID of the block.
     * @returns {void} The block model with new IDs.
     * @hidden
     */
    BlockService.prototype.generateNewIdsForBlock = function (block, parentId) {
        var _this = this;
        block.id = generateUniqueId(constants.BLOCK_ID_PREFIX);
        if (parentId) {
            block.parentId = parentId;
        }
        if (block.blockType === BlockType.Table) {
            return this.generateNewIdsForTableBlock(block);
        }
        var children = (block.properties && block.properties.children)
            ? block.properties.children
            : [];
        if (children && children.length > 0) {
            children = children.map(function (child) {
                return _this.generateNewIdsForBlock(child, block.id);
            });
        }
        return block;
    };
    BlockService.prototype.generateNewIdsForTableBlock = function (tableBlock) {
        var _this = this;
        var props = tableBlock.properties;
        // 1. Regenerate all column IDs + store mapping
        var columnIdMap = new Map();
        props.columns = props.columns.map(function (col) {
            var newId = generateUniqueId('col_');
            columnIdMap.set(col.id, newId);
            return __assign({}, col, { id: newId });
        });
        // 2. Regenerate row IDs and cell IDs + fix columnId references
        props.rows = props.rows.map(function (row) {
            var newRowId = generateUniqueId('row_');
            var newCells = row.cells.map(function (cell) {
                var newCellId = generateUniqueId('cell_');
                var newColumnId = columnIdMap.get(cell.columnId) || cell.columnId;
                // Regenerate IDs for all blocks inside this cell
                var newBlocks = cell.blocks.map(function (innerBlock) {
                    return _this.generateNewIdsForBlock(innerBlock, newCellId);
                });
                return __assign({}, cell, { id: newCellId, columnId: newColumnId, blocks: newBlocks });
            });
            return __assign({}, row, { id: newRowId, cells: newCells });
        });
        return tableBlock;
    };
    /**
     * Merges partial block properties with an existing block
     *
     * @param {BlockModel} block - Original block model
     * @param {Partial<BlockModel>} properties - Partial properties to merge
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {BlockModel} Merged block model
     * @hidden
     */
    BlockService.prototype.mergeBlockProperties = function (block, properties) {
        var _this = this;
        var clonedBlock = decoupleReference(block);
        var mergedBlock = __assign({}, clonedBlock);
        // Merge block-level properties
        Object.keys(properties).forEach(function (key) {
            if (key === 'content' && properties.content) {
                mergedBlock.content = properties.content.map(function (newContent) {
                    return BlockFactory.createContentFromPartial(newContent);
                });
            }
            else if ((key === 'properties' && properties.properties)) {
                mergedBlock[key] = _this.mergePrimitiveTypes(clonedBlock[key], properties[key]);
            }
            else {
                mergedBlock[key] = properties[key];
            }
        });
        return mergedBlock;
    };
    /**
     * Merges a primitive type model with it's partial updates
     *
     * @param {any} existing - Existing model
     * @param {Partial<any>} updates - Partial updates
     * @returns {any} Merged model
     * @hidden
     */
    BlockService.prototype.mergePrimitiveTypes = function (existing, updates) {
        var merged = __assign({}, existing);
        Object.keys(updates).forEach(function (key) {
            merged[key] = updates[key];
        });
        return merged;
    };
    /**
     * Gets the editor blocks data
     *
     * @returns {BlockModel[]} The editor blocks data
     * @hidden
     */
    BlockService.prototype.getBlocks = function () {
        return this.blocks;
    };
    /**
     * Sets the editor blocks data with the given blocks
     *
     * @param {BlockModel[]} blocks The blocks to set for the editor
     * @returns {void}
     * @hidden
     */
    BlockService.prototype.setBlocks = function (blocks) {
        this.blocks = blocks;
    };
    return BlockService;
}());
export { BlockService };
