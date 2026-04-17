import { block, inline, other } from './rules';
import { getDefaults, cleanUrl, escape } from './utils';
var Renderer = /** @class */ (function () {
    function Renderer(parser, options) {
        this.rules = {
            other: other,
            block: block.normal,
            inline: inline.normal
        };
        this.parser = parser || undefined;
        this.options = options || getDefaults();
        this.rules = { other: other, block: block.normal, inline: inline.normal };
    }
    /**
     * Renders whitespace (no output).
     *
     * @param {TokenSpace} token - Space token.
     * @returns {string} An empty string.
     * @hidden
     * @private
     */
    Renderer.prototype.renderSpace = function (token) {
        return '';
    };
    /**
     * Renders a heading element (<h1>.. <h6>).
     *
     * @param {TokenHeading} token - Heading token with tokens/depth.
     * @returns {string} Rendered HTML heading.
     * @hidden
     * @private
     */
    Renderer.prototype.renderHeading = function (_a) {
        var tokens = _a.tokens, depth = _a.depth;
        return "<h" + depth + ">" + this.parser.parseInline(tokens) + "</h" + depth + ">\n";
    };
    /**
     * Renders a paragraph.
     *
     * @param {TokenParagraph} token - Paragraph token with child tokens.
     * @returns {string} Rendered HTML paragraph.
     * @hidden
     * @private
     */
    Renderer.prototype.renderParagraph = function (_a) {
        var tokens = _a.tokens;
        return "<p>" + this.parser.parseInline(tokens) + "</p>\n";
    };
    /**
     * Renders plain or escaped inline text.
     *
     * @param {TokenText | TokenEscape} token - Text or escape token.
     * @returns {string} Rendered text HTML.
     * @hidden
     * @private
     */
    Renderer.prototype.renderText = function (token) {
        return 'tokens' in token && token.tokens
            ? this.parser.parseInline(token.tokens)
            : ('escaped' in token && token.escaped ? token.text : escape(token.text));
    };
    /**
     * Renders bold (strong) inline content.
     *
     * @param {TokenStrong} token - Strong token with child tokens.
     * @returns {string} Rendered HTML strong element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderStrong = function (_a) {
        var tokens = _a.tokens;
        return "<strong>" + this.parser.parseInline(tokens) + "</strong>";
    };
    /**
     * Renders emphasis (em) inline content.
     *
     * @param {TokenEm} token - Em token with child tokens.
     * @returns {string} Rendered HTML em element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderEm = function (_a) {
        var tokens = _a.tokens;
        return "<em>" + this.parser.parseInline(tokens) + "</em>";
    };
    /**
     * Renders strikethrough (del) inline content.
     *
     * @param {TokenDel} token - Del token with child tokens.
     * @returns {string} Rendered HTML del element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderStrikethrough = function (_a) {
        var tokens = _a.tokens;
        return "<del>" + this.parser.parseInline(tokens) + "</del>";
    };
    /**
     * Renders a horizontal rule.
     *
     * @param {TokenHr} token - HR token.
     * @returns {string} Rendered <hr> element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderHorizontalRule = function (token) {
        return '<hr>\n';
    };
    /**
     * Renders a hard line break.
     *
     * @param {TokenBr} token - Break token.
     * @returns {string} Rendered <br> element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderHardBreak = function (token) {
        return '<br>';
    };
    /**
     * Renders a fenced or indented code block.
     *
     * @param {TokenCode} token - Code token with text/lang info.
     * @returns {string} Rendered HTML code block.
     * @hidden
     * @private
     */
    Renderer.prototype.renderCodeBlock = function (_a) {
        var text = _a.text, lang = _a.lang, escaped = _a.escaped;
        var langString = (lang || '').match(other.notSpaceStart) ? (lang || '').match(other.notSpaceStart)[0] : undefined;
        var code = text.replace(other.endingNewline, '') + '\n';
        if (!langString) {
            return '<pre><code>'
                + (escaped ? code : escape(code, true))
                + '</code></pre>\n';
        }
        return '<pre><code class="language-'
            + escape(langString)
            + '">'
            + (escaped ? code : escape(code, true))
            + '</code></pre>\n';
    };
    /**
     * Renders an inline code span.
     *
     * @param {TokenCodespan} token - Code span token.
     * @returns {string} Rendered HTML code element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderCodeSpan = function (_a) {
        var text = _a.text;
        return "<code>" + escape(text, true) + "</code>";
    };
    /**
     * Renders a blockquote element with child tokens.
     *
     * @param {TokenBlockquote} token - Blockquote token.
     * @returns {string} Rendered HTML blockquote.
     * @hidden
     * @private
     */
    Renderer.prototype.renderBlockquote = function (_a) {
        var tokens = _a.tokens;
        var body = this.parser.parseBlocks(tokens);
        return "<blockquote>\n" + body + "</blockquote>\n";
    };
    /**
     * Renders an anchor tag with inline content.
     *
     * @param {TokenLink} token - Link token with href/title/tokens.
     * @returns {string} Rendered anchor element or raw text for unsafe URL.
     * @hidden
     * @private
     */
    Renderer.prototype.renderLink = function (_a) {
        var href = _a.href, title = _a.title, tokens = _a.tokens;
        var text = this.parser.parseInline(tokens);
        var cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        var out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + (escape(title)) + '"';
        }
        out += '>' + text + '</a>';
        return out;
    };
    /**
     * Renders an image tag.
     *
     * @param {TokenImage} token - Image token with href/title/alt.
     * @returns {string} Rendered image element or escaped alt text for unsafe URL.
     * @hidden
     * @private
     */
    Renderer.prototype.renderImage = function (_a) {
        var href = _a.href, title = _a.title, text = _a.text, tokens = _a.tokens;
        if (tokens) {
            text = this.parser.parseInline(tokens);
        }
        var cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return escape(text);
        }
        href = cleanHref;
        var out = "<img src=\"" + href + "\" alt=\"" + text + "\"";
        if (title) {
            out += " title=\"" + escape(title) + "\"";
        }
        out += '>';
        return out;
    };
    /**
     * Renders an ordered/unordered list with list items.
     *
     * @param {TokenList} token - List token containing list items.
     * @returns {string} Rendered HTML list.
     * @hidden
     * @private
     */
    Renderer.prototype.renderList = function (token) {
        var ordered = token.ordered;
        var start = token.start;
        var body = '';
        for (var j = 0; j < token.items.length; j++) {
            var item = token.items[j];
            body += this.renderListItem(item);
        }
        var type = ordered ? 'ol' : 'ul';
        var startAttr = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startAttr + '>\n' + body + '</' + type + '>\n';
    };
    /**
     * Renders a single list item, including task list checkbox output.
     *
     * @param {TokenListItem} item - List item token with child tokens.
     * @returns {string} Rendered list item HTML.
     * @hidden
     * @private
     */
    Renderer.prototype.renderListItem = function (item) {
        var itemBody = '';
        if (item.task) {
            var checkbox = this.renderCheckbox({ checked: !!item.checked });
            if (item.loose) {
                if (item.tokens[0] && item.tokens[0].type === 'paragraph') {
                    item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + escape(item.tokens[0].tokens[0].text);
                        item.tokens[0].tokens[0].escaped = true;
                    }
                }
                else {
                    item.tokens.unshift({
                        type: 'text',
                        raw: checkbox + ' ',
                        text: checkbox + ' ',
                        escaped: true
                    });
                }
            }
            else {
                itemBody += checkbox + ' ';
            }
        }
        itemBody += this.parser.parseBlocks(item.tokens, !!item.loose);
        return "<li>" + itemBody + "</li>\n";
    };
    /**
     * Renders a disabled checkbox for task list items.
     *
     * @param {TokenCheckbox} token - Checkbox state (checked/unchecked).
     * @returns {string} Rendered input checkbox element.
     * @hidden
     * @private
     */
    Renderer.prototype.renderCheckbox = function (_a) {
        var checked = _a.checked;
        return '<input '
            + (checked ? 'checked="" ' : '')
            + 'disabled="" type="checkbox">';
    };
    /**
     * Renders raw HTML (passthrough).
     *
     * @param {TokenHTML | TokenTag} token - Raw HTML token.
     * @returns {string} Raw HTML content.
     * @hidden
     * @private
     */
    Renderer.prototype.renderHtml = function (_a) {
        var text = _a.text;
        return text;
    };
    /**
     * Renders a GFM table.
     *
     * @param {TokenTable} token - Table token.
     * @returns {string} Rendered HTML table.
     * @hidden
     * @private
     */
    Renderer.prototype.renderTable = function (token) {
        var header = '';
        // header
        var cell = '';
        for (var j = 0; j < token.header.length; j++) {
            cell += this.renderTableCell(token.header[j]);
        }
        header += this.renderTableRow({ text: cell });
        var body = '';
        for (var j = 0; j < token.rows.length; j++) {
            var row = token.rows[j];
            cell = '';
            for (var k = 0; k < row.length; k++) {
                cell += this.renderTableCell(row[k]);
            }
            body += this.renderTableRow({ text: cell });
        }
        if (body) {
            body = "<tbody>" + body + "</tbody>";
        }
        return '<table>\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + body
            + '</table>\n';
    };
    /**
     * Renders a table row.
     *
     * @param {TokenTableRow} token - Table row token.
     * @returns {string} Rendered HTML row.
     * @hidden
     * @private
     */
    Renderer.prototype.renderTableRow = function (_a) {
        var text = _a.text;
        return "<tr>\n" + text + "</tr>\n";
    };
    /**
     * Renders a table cell (th/td).
     *
     * @param {TokenTableCell} token - Table cell token with alignment and inline tokens.
     * @returns {string} Rendered HTML table cell.
     * @hidden
     * @private
     */
    Renderer.prototype.renderTableCell = function (token) {
        var content = this.parser.parseInline(token.tokens);
        var type = token.header ? 'th' : 'td';
        var tag = token.align
            ? "<" + type + " align=\"" + token.align + "\">"
            : "<" + type + ">";
        return tag + content + ("</" + type + ">\n");
    };
    return Renderer;
}());
export { Renderer };
