import { BlockModel } from '../../models/index';
import { IClipboardPayloadOptions } from '../../common/interface';
import { ClipboardCleanupModule } from '../plugins/common/clipboard-cleanup';
import { BlockManager } from '../base/block-manager';
import { TableClipboardPayload, TableContext } from '../base/interface';
/**
 * Handles clipboard operations (copy, cut, paste) for the Block Editor.
 */
export declare class ClipboardAction {
    private parent;
    private isSelectivePaste;
    /** @hidden */
    clipboardCleanupModule: ClipboardCleanupModule;
    constructor(manager: BlockManager);
    private wireEvents;
    private unwireEvents;
    /**
     * Handles the cut operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    handleCut(e: ClipboardEvent): void;
    /**
     * Handles the copy operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    handleCopy(e: ClipboardEvent): void;
    /**
     * Handles the paste operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    handlePaste(e: ClipboardEvent): void;
    private extractFileFromClipboard;
    /**
     * Gets the clipboard payload for the current selection.
     *
     * @returns {IClipboardPayloadOptions} - The clipboard payload containing HTML, text, and Block Editor data.
     * @hidden
     */
    getClipboardPayload(): IClipboardPayloadOptions;
    getTablePayload(tableBlockEl: HTMLElement): {
        payload: TableClipboardPayload;
        html: string;
        plainText: string;
    };
    private createPartialBlockModels;
    private createPartialContentModels;
    performCutOperation(): void;
    performPasteOperation(args: IClipboardPayloadOptions): void;
    private performDeletionOperation;
    private handleBlockEditorPaste;
    private handleContentPasteWithinBlock;
    /**
     * Handles multi-block paste operation.
     *
     * @param {BlockModel[]} blocks - The blocks to be pasted.
     * @param {boolean} isUndoRedoAction - Indicates if the action is part of an undo/redo operation.
     * @returns {void}
     * @hidden
     */
    handleMultiBlocksPaste(blocks: BlockModel[], isUndoRedoAction?: boolean): void;
    private handleCodeBlockContentPaste;
    private handleHtmlPaste;
    private handlePlainTextPaste;
    handleCellPasteInsideTable(tableCtx: TableContext, html: string, text?: string): void;
    private performCellPaste;
    private performCellCut;
    private triggerAfterPasteEvent;
    /**
     * Checks if the clipboard is empty.
     *
     * @returns {Promise<boolean>} - A promise that resolves to true if the clipboard is empty, false otherwise.
     * @hidden
     */
    isClipboardEmpty(): Promise<boolean>;
    /**
     * Handles the context copy operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the copy operation is complete.
     * @hidden
     */
    handleContextCopy(): Promise<void>;
    /**
     * Handles the context cut operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the cut operation is complete.
     * @hidden
     */
    handleContextCut(): Promise<void>;
    /**
     * Handles the context paste operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the paste operation is complete.
     * @hidden
     */
    handleContextPaste(): Promise<void>;
    destroy(): void;
}
