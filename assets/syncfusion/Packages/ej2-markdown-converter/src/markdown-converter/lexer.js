import { other, block, inline } from './rules';
import { Tokenizer } from './tokenizer';
import { getDefaults, arrayAt } from './utils';
/**
 * Block Lexer
 */
var Lexer = /** @class */ (function () {
    function Lexer(options) {
        this.rules = {
            other: other,
            block: block.normal,
            inline: inline.normal
        };
        // TokenList cannot be created in one go
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || getDefaults();
        this.tokenizer = new Tokenizer();
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
            inLink: false,
            inRawBlock: false,
            top: true
        };
        var rules = {
            other: other,
            block: block.normal,
            inline: inline.normal
        };
        if (this.options.gfm) {
            rules.block = block.gfm;
            rules.inline = this.options.lineBreak ? inline.breaks : inline.gfm;
        }
        else {
            rules.block = block.pedantic;
            rules.inline = inline.pedantic;
        }
        this.tokenizer.rules = rules;
    }
    /**
     * Tokenizes the full markdown source into a top-level token list.
     *
     * @param {string} src - Markdown source text.
     * @param {MarkdownConverterOptions} [options] - Optional options overriding defaults.
     * @returns {TokensList} A list of tokens representing block structure.
     * @hidden
     * @private
     */
    Lexer.lex = function (src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
    };
    /**
     * Tokenizes the full markdown source and resolves any deferred inline queues.
     *
     * @param {string} mdSource - Markdown source text.
     * @returns {TokensList} Finalized top-level token list.
     * @hidden
     * @private
     */
    Lexer.prototype.lex = function (mdSource) {
        mdSource = mdSource.replace(other.carriageReturn, '\n');
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.tokenizeBlocks(mdSource, this.tokens);
        for (var i = 0; i < this.inlineQueue.length; i++) {
            var next = this.inlineQueue[i];
            this.tokenizeInline(next.src, next.tokens);
        }
        this.inlineQueue = [];
        return this.tokens;
    };
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
    Lexer.prototype.tokenizeBlocks = function (mdSource, tokens, lastParagraphClipped) {
        if (!this.options.gfm) {
            mdSource = mdSource.replace(other.tabCharGlobal, '    ').replace(other.spaceLine, '');
        }
        while (mdSource) {
            var spaceToken = this.tokenizer.parseSpace(mdSource);
            if (spaceToken) {
                mdSource = mdSource.substring(spaceToken.raw.length);
                var lastToken = arrayAt(tokens, -1);
                if (spaceToken.raw.length === 1 && lastToken !== undefined) {
                    // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unnecessary paragraph tags
                    lastToken.raw += '\n';
                }
                else {
                    tokens.push(spaceToken);
                }
                continue;
            }
            // heading
            var headingToken = this.tokenizer.parseAtxHeading(mdSource);
            if (headingToken) {
                mdSource = mdSource.substring(headingToken.raw.length);
                tokens.push(headingToken);
                continue;
            }
            // hr
            var hrToken = this.tokenizer.ParseHorizontalRule(mdSource);
            if (hrToken) {
                mdSource = mdSource.substring(hrToken.raw.length);
                tokens.push(hrToken);
                continue;
            }
            // code
            var codeToken = this.tokenizer.parseIndentedCode(mdSource);
            if (codeToken) {
                mdSource = mdSource.substring(codeToken.raw.length);
                var lastToken = arrayAt(tokens, -1);
                // An indented code block cannot interrupt a paragraph.
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text') && ('text' in lastToken)) {
                    lastToken.raw += '\n' + codeToken.raw;
                    lastToken.text += '\n' + codeToken.text;
                    arrayAt(this.inlineQueue, -1).src = lastToken.text;
                }
                else {
                    tokens.push(codeToken);
                }
                continue;
            }
            // fences
            var fenceToken = this.tokenizer.parseFencedCode(mdSource);
            if (fenceToken) {
                mdSource = mdSource.substring(fenceToken.raw.length);
                tokens.push(fenceToken);
                continue;
            }
            // blockquote
            var blockquoteToken = this.tokenizer.parseBlockquote(mdSource);
            if (blockquoteToken) {
                mdSource = mdSource.substring(blockquoteToken.raw.length);
                tokens.push(blockquoteToken);
                continue;
            }
            // lheading
            var levelHeadingToken = this.tokenizer.parseSetextHeading(mdSource);
            if (levelHeadingToken) {
                mdSource = mdSource.substring(levelHeadingToken.raw.length);
                tokens.push(levelHeadingToken);
                continue;
            }
            // def
            var defToken = this.tokenizer.parseDefinition(mdSource);
            if (defToken) {
                mdSource = mdSource.substring(defToken.raw.length);
                var lastToken = arrayAt(tokens, -1);
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text') && ('text' in lastToken)) {
                    lastToken.raw += '\n' + defToken.raw;
                    lastToken.text += '\n' + defToken.raw;
                    arrayAt(this.inlineQueue, -1).src = lastToken.text;
                }
                else if (!this.tokens.links[defToken.tag]) {
                    this.tokens.links[defToken.tag] = {
                        href: defToken.href,
                        title: defToken.title
                    };
                }
                continue;
            }
            // list
            var listToken = this.tokenizer.parseList(mdSource);
            if (listToken) {
                mdSource = mdSource.substring(listToken.raw.length);
                tokens.push(listToken);
                continue;
            }
            // html
            var htmlToken = this.tokenizer.parseHtmlBlock(mdSource);
            if (htmlToken) {
                mdSource = mdSource.substring(htmlToken.raw.length);
                tokens.push(htmlToken);
                continue;
            }
            // table (gfm)
            var tableToken = this.tokenizer.parseTable(mdSource);
            if (tableToken) {
                mdSource = mdSource.substring(tableToken.raw.length);
                tokens.push(tableToken);
                continue;
            }
            if (this.state.top) {
                var paragraphToken = this.tokenizer.parseParagraph(mdSource);
                if (paragraphToken) {
                    var lastToken = arrayAt(tokens, -1);
                    if (lastParagraphClipped && lastToken && lastToken.type === 'paragraph' && ('text' in lastToken)) {
                        lastToken.raw += '\n' + paragraphToken.raw;
                        lastToken.text += '\n' + paragraphToken.text;
                        this.inlineQueue.pop();
                        arrayAt(this.inlineQueue, -1).mdSource = lastToken.text;
                    }
                    else {
                        tokens.push(paragraphToken);
                    }
                    lastParagraphClipped = mdSource.length !== mdSource.length;
                    mdSource = mdSource.substring(paragraphToken.raw.length);
                    continue;
                }
            }
            // text
            var textToken = this.tokenizer.parseText(mdSource);
            if (textToken) {
                mdSource = mdSource.substring(textToken.raw.length);
                var lastToken = arrayAt(tokens, -1);
                if (lastToken && lastToken.type === 'text' && ('text' in lastToken)) {
                    lastToken.raw += '\n' + textToken.raw;
                    lastToken.text += '\n' + textToken.text;
                    this.inlineQueue.pop();
                    arrayAt(this.inlineQueue, -1).src = lastToken.text;
                }
                else {
                    tokens.push(textToken);
                }
                continue;
            }
            if (mdSource) {
                var errMsg = 'Infinite loop on byte: ' + mdSource.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                }
                else {
                    throw new Error(errMsg);
                }
            }
        }
        this.state.top = true;
        return tokens;
    };
    /**
     * Schedules inline tokenization for chained contexts (e.g., headings, paragraphs).
     *
     * @param {string} src - Inline source text to queue.
     * @param {Token[]} [tokens=[]] - Token array to receive inline tokens.
     * @returns {Token[]} The queued token collection.
     * @hidden
     * @private
     */
    Lexer.prototype.inline = function (src, tokens) {
        if (tokens === void 0) { tokens = []; }
        this.inlineQueue.push({ src: src, tokens: tokens });
        return tokens;
    };
    /**
     * Tokenizes inline constructs from the provided inline source.
     *
     * @param {string} mdSource - Inline markdown source.
     * @param {Token[]} [tokens=[]] - Target inline token array.
     * @returns {Token[]} The updated inline token array.
     * @hidden
     * @private
     */
    Lexer.prototype.tokenizeInline = function (mdSource, tokens) {
        if (tokens === void 0) { tokens = []; }
        // String with links masked to avoid interference with em and strong
        var maskedSrc = mdSource;
        var match = null;
        // Mask out reflinks
        if (this.tokens.links) {
            var links = Object.keys(this.tokens.links);
            if (links.length > 0) {
                var reflinkMatch = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc);
                while (reflinkMatch != null) {
                    if (links.indexOf(reflinkMatch[0].slice(reflinkMatch[0].lastIndexOf('[') + 1, -1)) !== -1) {
                        maskedSrc = maskedSrc.slice(0, reflinkMatch.index)
                            + '[' + 'a'.repeat(reflinkMatch[0].length - 2) + ']'
                            + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                    }
                    reflinkMatch = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc);
                }
            }
        }
        // Mask out escaped characters
        match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc);
        while (match != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc);
        }
        // Mask out other blocks
        match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc);
        while (match != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc);
        }
        var keepPrevChar = false;
        var prevChar = '';
        while (mdSource) {
            if (!keepPrevChar) {
                prevChar = '';
            }
            keepPrevChar = false;
            // em & strong
            var boldToken = this.tokenizer.parseEmphasisOrStrong(mdSource, maskedSrc, prevChar);
            if (boldToken) {
                mdSource = mdSource.substring(boldToken.raw.length);
                tokens.push(boldToken);
                continue;
            }
            // del (gfm)
            var delToken = this.tokenizer.parseStrikethrough(mdSource);
            if (delToken) {
                mdSource = mdSource.substring(delToken.raw.length);
                tokens.push(delToken);
                continue;
            }
            // br
            var brToken = this.tokenizer.parseBreak(mdSource);
            if (brToken) {
                mdSource = mdSource.substring(brToken.raw.length);
                tokens.push(brToken);
                continue;
            }
            // code
            var codeToken = this.tokenizer.parseCodespan(mdSource);
            if (codeToken) {
                mdSource = mdSource.substring(codeToken.raw.length);
                tokens.push(codeToken);
                continue;
            }
            // link
            var linkToken = this.tokenizer.parseLink(mdSource);
            if (linkToken) {
                mdSource = mdSource.substring(linkToken.raw.length);
                tokens.push(linkToken);
                continue;
            }
            // reflink, nolink
            var refLinkToken = this.tokenizer.
                parseReferenceLink(mdSource, this.tokens.links);
            if (refLinkToken) {
                mdSource = mdSource.substring(refLinkToken.raw.length);
                var lastToken = arrayAt(tokens, -1);
                if (refLinkToken.type === 'text' && lastToken && lastToken.type === 'text' && ('text' in lastToken)) {
                    lastToken.raw += refLinkToken.raw;
                    lastToken.text += refLinkToken.text;
                }
                else {
                    tokens.push(refLinkToken);
                }
                continue;
            }
            // autolink
            var autoLinkToken = this.tokenizer.parseAutoLink(mdSource);
            if (autoLinkToken) {
                mdSource = mdSource.substring(autoLinkToken.raw.length);
                tokens.push(autoLinkToken);
                continue;
            }
            // url (gfm)
            var urlToken = this.tokenizer.parseBareUrl(mdSource);
            if (!this.state.inLink && urlToken) {
                mdSource = mdSource.substring(urlToken.raw.length);
                tokens.push(urlToken);
                continue;
            }
            // escape
            var escapeToken = this.tokenizer.parseEscape(mdSource);
            if (escapeToken) {
                mdSource = mdSource.substring(escapeToken.raw.length);
                tokens.push(escapeToken);
                continue;
            }
            // tag
            var tagToken = this.tokenizer.parseHtmlTag(mdSource);
            if (tagToken) {
                mdSource = mdSource.substring(tagToken.raw.length);
                tokens.push(tagToken);
                continue;
            }
            // text
            // prevent inlineText consuming extensions by clipping 'src' to extension start
            var inlineTextToken = this.tokenizer.parseInlineText(mdSource);
            if (inlineTextToken) {
                mdSource = mdSource.substring(inlineTextToken.raw.length);
                if (inlineTextToken.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
                    prevChar = inlineTextToken.raw.slice(-1);
                }
                keepPrevChar = true;
                var lastToken = arrayAt(tokens, -1);
                if (lastToken && lastToken.type === 'text' && ('text' in lastToken)) {
                    lastToken.raw += inlineTextToken.raw;
                    lastToken.text += inlineTextToken.text;
                }
                else {
                    tokens.push(inlineTextToken);
                }
                continue;
            }
        }
        return tokens;
    };
    return Lexer;
}());
export { Lexer };
