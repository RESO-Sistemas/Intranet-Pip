import { CommandName } from '../../models/enums';
import { BlockModel } from '../../models/index';
import { BlockManager } from '../base/block-manager';
export declare class BlockEditorMethods {
    private parent;
    constructor(manager: BlockManager);
    addBlock(block: BlockModel, targetId?: string, isAfter?: boolean, preventUIUpdate?: boolean): void;
    removeBlock(blockId: string): void;
    getBlock(blockId: string): BlockModel | null;
    moveBlock(fromBlockId: string, toBlockId: string): void;
    updateBlock(blockId: string, properties: Partial<BlockModel>): boolean;
    executeToolbarAction(command: CommandName, value?: string): void;
    setSelection(node: Node, start: number, end: number): void;
    setCursorPosition(blockId: string, position: number): void;
    getSelectedBlocks(): BlockModel[] | null;
    getRange(): Range | null;
    selectRange(range: Range): void;
    selectBlock(blockId: string): void;
    selectAllBlocks(): void;
    focusIn(): void;
    focusOut(): void;
    getBlockCount(): number;
    enableDisableToolbarItems(itemId: string | string[], enable: boolean): void;
    getDataAsJson(blockId?: string): BlockModel | BlockModel[];
    getDataAsHtml(blockId?: string): string;
    parseHtmlToBlocks(html: string): BlockModel[];
    renderBlocksFromJson(json: object | string, replace: boolean, targetBlockId: string): boolean;
    private extractBlocks;
    /**
     * Replaces all blocks in the editor with the provided blocks.
     *
     * @param {BlockModel[]} blocks - The blocks to render
     * @returns {boolean} - True if operation was successful, false otherwise
     * @hidden
     */
    replaceAllBlocks(blocks: BlockModel[]): boolean;
    /**
     * Inserts blocks at a specific position in the editor.
     *
     * @param {BlockModel[]} blocks - The blocks to insert
     * @param {string} targetBlockId - ID of the block to insert after, uses focused block if not provided
     * @returns {boolean} - True if operation was successful, false otherwise
     * @private
     */
    private insertBlocksAtPosition;
    print(): void;
}
