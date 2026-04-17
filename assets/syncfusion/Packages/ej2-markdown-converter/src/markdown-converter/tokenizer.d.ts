import { TokenParagraph, TokenHeading, TokenText, TokenEm, TokenStrong, TokenDel, TokenHr, TokenBr, TokenCodespan, TokenCode, TokenSpace, TokenBlockquote, TokenList, TokenLink, TokenImage, Links, TokenEscape, TokenHTML, TokenTag, TokenTable, TokenDef } from './tokens';
import { Rules } from './rules';
import { Lexer } from './lexer';
import { MarkdownConverterOptions } from './interface';
/**
 * Tokenizer
 */
export declare class Tokenizer {
    options: MarkdownConverterOptions;
    rules: Rules;
    lexer: Lexer;
    constructor(options?: MarkdownConverterOptions);
    /**
     * Parses one or more newline characters into a space token.
     *
     * @param {string} mdSource - Markdown source beginning at current position.
     * @returns {TokenSpace | undefined} A space token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseSpace(mdSource: string): TokenSpace | undefined;
    /**
     * Parses an ATX heading (e.g., "# H1").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHeading | undefined} A heading token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseAtxHeading(mdSource: string): TokenHeading | undefined;
    /**
     * Parses a paragraph block.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenParagraph | undefined} A paragraph token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseParagraph(mdSource: string): TokenParagraph | undefined;
    /**
     * Parses a raw text block (fallback when no other block matches).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenText | undefined} A text token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseText(mdSource: string): TokenText | undefined;
    /**
     * Parses an inline text segment.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenText | undefined} A text token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseInlineText(mdSource: string): TokenText | undefined;
    /**
     * Parses emphasis or strong emphasis (e.g., "*em*", "**strong**", "_em_", "__strong__").
     *
     * @param {string} src - Inline source starting at a delimiter.
     * @param {string} maskedSrc - Masked inline source to aid delimiter scanning.
     * @param {string} [prevChar] - Previous character to help with intraword checks.
     * @returns {TokenEm | TokenStrong | undefined} An emphasis/strong token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseEmphasisOrStrong(src: string, maskedSrc: string, prevChar?: string): TokenEm | TokenStrong | undefined;
    /**
     * Parses strikethrough (GFM) e.g., "~~del~~".
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenDel | undefined} A strikethrough token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseStrikethrough(mdSource: string): TokenDel | undefined;
    /**
     * Parses a horizontal rule (---, ***, ___).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHr | undefined} An <hr> token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    ParseHorizontalRule(mdSource: string): TokenHr | undefined;
    /**
     * Parses a hard line break.
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenBr | undefined} A break token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseBreak(mdSource: string): TokenBr | undefined;
    /**
     * Parses an indented code block (4-space).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenCode | undefined} A code block token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseIndentedCode(mdSource: string): TokenCode | undefined;
    /**
     * Parses an inline code span (e.g., "`code`").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenCodespan | undefined} A code span token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseCodespan(mdSource: string): TokenCodespan | undefined;
    private indentCodeCompensation;
    private outputLink;
    /**
     * Parses a fenced code block (``` or ~~~).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenCode | undefined} A fenced code block token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseFencedCode(mdSource: string): TokenCode | undefined;
    /**
     * Parses a blockquote block (prefix ">").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenBlockquote | undefined} A blockquote token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseBlockquote(mdSource: string): TokenBlockquote | undefined;
    /**
     * Parses a Setext heading (underline-style, "=== / ---").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHeading | undefined} A heading token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseSetextHeading(mdSource: string): TokenHeading | undefined;
    /**
     * Parses a standard inline link or image (e.g., "[text](url)" or "![alt](src)").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenLink | TokenImage | undefined} A link/image token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseLink(mdSource: string): TokenLink | TokenImage | undefined;
    /**
     * Parses a reference-style link or image (reflink).
     *
     * @param {string} mdSource - Inline markdown source.
     * @param {Links} links - Collected link definitions map.
     * @returns {TokenLink | TokenImage | TokenText | undefined} A link/image or fallback text token; otherwise undefined.
     * @hidden
     * @private
     */
    parseReferenceLink(mdSource: string, links: Links): TokenLink | TokenImage | TokenText | undefined;
    /**
     * Parses an angle-bracket autolink (e.g., "<https://...>", "<user@example.com>").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenLink | undefined} A link token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseAutoLink(mdSource: string): TokenLink | undefined;
    /**
     * Parses a bare URL (GFM autolink) outside of an existing link.
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenLink | undefined} A link token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseBareUrl(mdSource: string): TokenLink | undefined;
    /**
     * Parses a reference definition line (e.g., "[id]: url 'title'").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenDef | undefined} A definition token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseDefinition(mdSource: string): TokenDef | undefined;
    /**
     * Parses an inline escape (e.g., "\*").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenEscape | undefined} An escape token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseEscape(mdSource: string): TokenEscape | undefined;
    /**
     * Parses an ordered/unordered list block.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenList | undefined} A list token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseList(mdSource: string): TokenList | undefined;
    /**
     * Parses a raw HTML block.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHTML | undefined} An HTML token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseHtmlBlock(mdSource: string): TokenHTML | undefined;
    /**
     * Parses an inline HTML tag and updates inLink/inRawBlock state.
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenTag | undefined} An HTML tag token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseHtmlTag(mdSource: string): TokenTag | undefined;
    /**
     * Parses a GFM table.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenTable | undefined} A table token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseTable(mdSource: string): TokenTable | undefined;
}
