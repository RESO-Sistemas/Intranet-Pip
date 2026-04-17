import { TokenHeading, TokenParagraph, TokenText, TokenEscape, TokenSpace, TokenEm, TokenStrong, TokenDel, TokenHr, TokenBr, TokenCode, TokenCodespan, TokenBlockquote, TokenLink, TokenImage, TokenList, TokenCheckbox, TokenHTML, TokenTag, TokenTable, TokenTableCell, TokenTableRow } from './tokens';
import { Parser } from './parser';
import { Rules } from './rules';
import { MarkdownConverterOptions } from './interface';
export declare class Renderer {
    options: MarkdownConverterOptions;
    rules: Rules;
    parser: Parser;
    constructor(parser?: Parser, options?: MarkdownConverterOptions);
    /**
     * Renders whitespace (no output).
     *
     * @param {TokenSpace} token - Space token.
     * @returns {string} An empty string.
     * @hidden
     * @private
     */
    renderSpace(token: TokenSpace): string;
    /**
     * Renders a heading element (<h1>.. <h6>).
     *
     * @param {TokenHeading} token - Heading token with tokens/depth.
     * @returns {string} Rendered HTML heading.
     * @hidden
     * @private
     */
    renderHeading({ tokens, depth }: TokenHeading): string;
    /**
     * Renders a paragraph.
     *
     * @param {TokenParagraph} token - Paragraph token with child tokens.
     * @returns {string} Rendered HTML paragraph.
     * @hidden
     * @private
     */
    renderParagraph({ tokens }: TokenParagraph): string;
    /**
     * Renders plain or escaped inline text.
     *
     * @param {TokenText | TokenEscape} token - Text or escape token.
     * @returns {string} Rendered text HTML.
     * @hidden
     * @private
     */
    renderText(token: TokenText | TokenEscape): string;
    /**
     * Renders bold (strong) inline content.
     *
     * @param {TokenStrong} token - Strong token with child tokens.
     * @returns {string} Rendered HTML strong element.
     * @hidden
     * @private
     */
    renderStrong({ tokens }: TokenStrong): string;
    /**
     * Renders emphasis (em) inline content.
     *
     * @param {TokenEm} token - Em token with child tokens.
     * @returns {string} Rendered HTML em element.
     * @hidden
     * @private
     */
    renderEm({ tokens }: TokenEm): string;
    /**
     * Renders strikethrough (del) inline content.
     *
     * @param {TokenDel} token - Del token with child tokens.
     * @returns {string} Rendered HTML del element.
     * @hidden
     * @private
     */
    renderStrikethrough({ tokens }: TokenDel): string;
    /**
     * Renders a horizontal rule.
     *
     * @param {TokenHr} token - HR token.
     * @returns {string} Rendered <hr> element.
     * @hidden
     * @private
     */
    renderHorizontalRule(token: TokenHr): string;
    /**
     * Renders a hard line break.
     *
     * @param {TokenBr} token - Break token.
     * @returns {string} Rendered <br> element.
     * @hidden
     * @private
     */
    renderHardBreak(token: TokenBr): string;
    /**
     * Renders a fenced or indented code block.
     *
     * @param {TokenCode} token - Code token with text/lang info.
     * @returns {string} Rendered HTML code block.
     * @hidden
     * @private
     */
    renderCodeBlock({ text, lang, escaped }: TokenCode): string;
    /**
     * Renders an inline code span.
     *
     * @param {TokenCodespan} token - Code span token.
     * @returns {string} Rendered HTML code element.
     * @hidden
     * @private
     */
    renderCodeSpan({ text }: TokenCodespan): string;
    /**
     * Renders a blockquote element with child tokens.
     *
     * @param {TokenBlockquote} token - Blockquote token.
     * @returns {string} Rendered HTML blockquote.
     * @hidden
     * @private
     */
    renderBlockquote({ tokens }: TokenBlockquote): string;
    /**
     * Renders an anchor tag with inline content.
     *
     * @param {TokenLink} token - Link token with href/title/tokens.
     * @returns {string} Rendered anchor element or raw text for unsafe URL.
     * @hidden
     * @private
     */
    renderLink({ href, title, tokens }: TokenLink): string;
    /**
     * Renders an image tag.
     *
     * @param {TokenImage} token - Image token with href/title/alt.
     * @returns {string} Rendered image element or escaped alt text for unsafe URL.
     * @hidden
     * @private
     */
    renderImage({ href, title, text, tokens }: TokenImage): string;
    /**
     * Renders an ordered/unordered list with list items.
     *
     * @param {TokenList} token - List token containing list items.
     * @returns {string} Rendered HTML list.
     * @hidden
     * @private
     */
    renderList(token: TokenList): string;
    /**
     * Renders a single list item, including task list checkbox output.
     *
     * @param {TokenListItem} item - List item token with child tokens.
     * @returns {string} Rendered list item HTML.
     * @hidden
     * @private
     */
    renderListItem(item: any): string;
    /**
     * Renders a disabled checkbox for task list items.
     *
     * @param {TokenCheckbox} token - Checkbox state (checked/unchecked).
     * @returns {string} Rendered input checkbox element.
     * @hidden
     * @private
     */
    renderCheckbox({ checked }: TokenCheckbox): string;
    /**
     * Renders raw HTML (passthrough).
     *
     * @param {TokenHTML | TokenTag} token - Raw HTML token.
     * @returns {string} Raw HTML content.
     * @hidden
     * @private
     */
    renderHtml({ text }: TokenHTML | TokenTag): string;
    /**
     * Renders a GFM table.
     *
     * @param {TokenTable} token - Table token.
     * @returns {string} Rendered HTML table.
     * @hidden
     * @private
     */
    renderTable(token: TokenTable): string;
    /**
     * Renders a table row.
     *
     * @param {TokenTableRow} token - Table row token.
     * @returns {string} Rendered HTML row.
     * @hidden
     * @private
     */
    renderTableRow({ text }: TokenTableRow): string;
    /**
     * Renders a table cell (th/td).
     *
     * @param {TokenTableCell} token - Table cell token with alignment and inline tokens.
     * @returns {string} Rendered HTML table cell.
     * @hidden
     * @private
     */
    renderTableCell(token: TokenTableCell): string;
}
