import { MarkdownParser } from './../base/markdown-parser';
/**
 * Link internal component
 *
 * @hidden
 * @private
 */
export declare class MDInsertText {
    private parent;
    private selection;
    /**
     * Constructor for creating the insert text plugin
     *
     * @param {MarkdownParser} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: MarkdownParser);
    private addEventListener;
    private removeEventListener;
    private InsertTextExec;
    private restore;
    destroy(): void;
}
