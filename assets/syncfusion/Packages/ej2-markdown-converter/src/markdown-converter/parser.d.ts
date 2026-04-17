import { Token } from './tokens';
import { Renderer } from './render';
import { MarkdownConverterOptions } from './interface';
export declare class Parser {
    options: MarkdownConverterOptions;
    renderer: Renderer;
    constructor(options?: MarkdownConverterOptions, renderer?: Renderer);
    /**
     * Static Parse Method
     *
     * @param {Token[]} tokens - Array of tokens
     * @param {MarkdownConverterOptions} options - Parsing options
     * @returns {string} Parsed HTML
     * @hidden
     * @private
     */
    static parse(tokens: Token[], options?: MarkdownConverterOptions): string;
    /**
     * Parses a top-level token list (blocks) to HTML.
     *
     * @param {Token[]} tokens - Array of block tokens.
     * @param {boolean} [top=true] - Indicates top-level rendering (paragraph wrapping of text blocks).
     * @returns {string} Parsed HTML string.
     * @hidden
     * @private
     */
    parseBlocks(tokens: Token[], top?: boolean): string;
    /**
     * Parses inline tokens to HTML using the provided or default renderer.
     *
     * @param {Token[]} tokens - Array of inline tokens.
     * @param {Renderer} [renderer=this.renderer] - Renderer used to render inline nodes.
     * @returns {string} Parsed inline HTML string.
     * @hidden
     * @private
     */
    parseInline(tokens: Token[], renderer?: Renderer): string;
}
