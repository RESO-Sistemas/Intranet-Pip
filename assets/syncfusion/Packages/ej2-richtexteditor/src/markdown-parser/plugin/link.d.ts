import { MarkdownParser } from './../base/markdown-parser';
/**
 * Link internal component
 *
 * @hidden
 * @private
 */
export declare class MDLink {
    private parent;
    private selection;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {MarkdownParser} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: MarkdownParser);
    private addEventListener;
    private removeEventListener;
    private createLink;
    private restore;
    destroy(): void;
}
