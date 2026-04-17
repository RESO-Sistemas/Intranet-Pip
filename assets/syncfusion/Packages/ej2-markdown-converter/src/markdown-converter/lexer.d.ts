import { Rules } from './rules';
import { Token, TokensList } from './tokens';
import { MarkdownConverterOptions } from './interface';
/**
 * Block Lexer
 */
export declare class Lexer {
    tokens: TokensList;
    options: MarkdownConverterOptions;
    state: {
        inLink: boolean;
        inRawBlock: boolean;
        top: boolean;
    };
    rules: Rules;
    private tokenizer;
    private inlineQueue;
    constructor(options?: MarkdownConverterOptions);
    /**
     * Tokenizes the full markdown source into a top-level token list.
     *
     * @param {string} src - Markdown source text.
     * @param {MarkdownConverterOptions} [options] - Optional options overriding defaults.
     * @returns {TokensList} A list of tokens representing block structure.
     * @hidden
     * @private
     */
    static lex(src: string, options?: MarkdownConverterOptions): TokensList;
    /**
     * Tokenizes the full markdown source and resolves any deferred inline queues.
     *
     * @param {string} mdSource - Markdown source text.
     * @returns {TokensList} Finalized top-level token list.
     * @hidden
     * @private
     */
    lex(mdSource: string): TokensList;
    /**
     * Tokenizes block-level constructs from the source into the provided collection.
     *
     * @param {string} mdSource - Markdown source.
     * @param {Token[] | TokensList} [tokens] - Target collection for tokens.
     * @param {boolean} [lastParagraphClipped] - Internal paragraph merge hint.
     * @returns {Token[] | TokensList} The updated token collection.
     * @hidden
     * @private
     */
    tokenizeBlocks(mdSource: string, tokens?: Token[] | TokensList, lastParagraphClipped?: boolean): Token[] | TokensList;
    /**
     * Schedules inline tokenization for chained contexts (e.g., headings, paragraphs).
     *
     * @param {string} src - Inline source text to queue.
     * @param {Token[]} [tokens=[]] - Token array to receive inline tokens.
     * @returns {Token[]} The queued token collection.
     * @hidden
     * @private
     */
    inline(src: string, tokens?: Token[]): Token[];
    /**
     * Tokenizes inline constructs from the provided inline source.
     *
     * @param {string} mdSource - Inline markdown source.
     * @param {Token[]} [tokens=[]] - Target inline token array.
     * @returns {Token[]} The updated inline token array.
     * @hidden
     * @private
     */
    tokenizeInline(mdSource: string, tokens?: Token[]): Token[];
}
