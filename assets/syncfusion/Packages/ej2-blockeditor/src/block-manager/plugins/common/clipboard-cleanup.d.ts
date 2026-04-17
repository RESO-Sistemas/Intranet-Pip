import { IPasteCleanupOptions } from '../../../common/interface';
import { BlockManager } from '../../base/block-manager';
import { WordListConverter } from './ms-list-converter';
/**
 * Handles cleanup of pasted content for the Block Editor.
 */
export declare class ClipboardCleanupModule {
    private parent;
    listConverter: WordListConverter;
    private static inlineNode;
    private static ignorableNodes;
    /** List of HTML block node names */
    private static blockNode;
    private static removableElements;
    private static msWordPatterns;
    constructor(manager: BlockManager);
    /**
     * Handles the paste cleanup process.
     * It checks if the paste content is plain text or from MS Word and processes accordingly.
     *
     * @param {IPasteCleanupOptions} args - The arguments for paste cleanup.
     * @returns {string} - The cleaned HTML content.
     * @hidden
     */
    cleanupPaste(args: IPasteCleanupOptions): string;
    private isFromMsWord;
    private cleanMsWordContent;
    private addListClass;
    private listCleanUp;
    private shouldIgnoreElement;
    private isMsoListParagraph;
    private isFirstListItem;
    private shouldAddListSeparator;
    private isBlockElement;
    private cleanupHtml;
    private plainFormatting;
    removeUnwantedElements(element: HTMLElement): void;
    private removeStyleElements;
    removeComments(element: HTMLElement): void;
    private removeEmptyElements;
    private findDetachEmptyElem;
    private removeWordClasses;
    private cleanupStyles;
    private processTables;
    private sanitizeTableElement;
    private cleanupLists;
    private cleanList;
    private findClosestListElem;
    private insertAfter;
    private convertWordListParagraphs;
    private processImages;
    private cleanupCssPatterns;
    private deniedTags;
    private deniedAttributes;
    private allowedStyle;
    private detachInlineElements;
    private getTextContent;
}
