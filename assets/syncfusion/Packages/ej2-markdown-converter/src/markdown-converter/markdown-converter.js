import { Lexer } from './lexer';
import { Parser } from './parser';
import { Renderer } from './render';
import { escape, getDefaults } from './utils';
/**
 * @class MarkdownConverterPlugin
 * @private
 * @hidden
 *
 * A class for parsing Markdown content and converting it into HTML.
 * This class provides methods to handle Markdown syntax and generate
 * corresponding HTML output.
 *
 */
var MarkdownConverterPlugin = /** @class */ (function () {
    /**
     * Creates a new MarkdownConverter instance.
     *
     * @param {MarkdownConverterOptions} [options] - Component model passed to the base Component.
     */
    function MarkdownConverterPlugin(options) {
        this.defaults = getDefaults();
        this.lexerInstance = new Lexer(this.defaults);
        this.rendererInst = new Renderer();
        this.options = this.setOptions(options);
    }
    /**
     * Parse markdown with full lifecycle support.
     * Handles both sync and async markdown-to-HTML conversion.
     *
     * @private
     * @param {string} src - Markdown source to parse
     * @param {MarkdownConverterOptions} [options] - Override options for this parse call
     * @returns {string | Promise<string>} HTML output (string if sync, Promise<string> if async)
     */
    MarkdownConverterPlugin.prototype.parseMarkdown = function (src, options) {
        // Merge options: defaults → instance options → override options
        var origOpt = Object.assign({}, options);
        var opt = Object.assign({}, this.defaults, this.options, origOpt);
        var throwError = this.onError(!!opt.silent, !!opt.async);
        // Validate input parameter
        if (typeof src === 'undefined' || src === null) {
            return throwError(new Error('input parameter is undefined or null'));
        }
        if (typeof src !== 'string') {
            return throwError(new Error('input parameter is of type ' +
                Object.prototype.toString.call(src) +
                ', string expected'));
        }
        // Select lexer and parser based on blockType
        var lexer = Lexer.lex;
        var parser = Parser.parse;
        // Async pipeline
        if (opt.async) {
            return Promise.resolve(src)
                .then(function (preSrc) { return lexer(preSrc, opt); })
                .then(function (tokens) { return parser(tokens, opt); })
                .catch(throwError);
        }
        // Sync pipeline
        try {
            var tokens = lexer(src, opt);
            var html = parser(tokens, opt);
            return html;
        }
        catch (e) {
            return throwError(e);
        }
    };
    /**
     * Converts a markdown string to HTML using the instance’s current options.
     *
     * @param {string} markdownContent - Markdown source text.
     * @returns {string | Promise<string>} HTML string or a Promise resolving to HTML in async mode.
     * @hidden
     * @private
     */
    MarkdownConverterPlugin.prototype.convertMarkdownToHtml = function (markdownContent) {
        var html = this.parseMarkdown(markdownContent, this.options);
        return html;
    };
    /**
     * Merges incoming options into the instance defaults and rebuilds the pipeline.
     *
     * @private
     * @param {MarkdownConverterOptions} incomingOptions - Options to merge into current defaults.
     * @returns {this} The MarkdownConverter instance for chaining.
     */
    MarkdownConverterPlugin.prototype.setOptions = function (incomingOptions) {
        var previousOptions = this.defaults;
        var mergedOptions = Object.assign({}, previousOptions, incomingOptions);
        this.defaults = mergedOptions;
        this.rebindPipeline();
        return this.defaults;
    };
    /**
     * Creates an error handler that throws, rejects, or returns a formatted HTML error
     * depending on the 'silent' and 'async' flags.
     *
     * @param {boolean} silent - When true, returns an HTML error message instead of throwing.
     * @param {boolean} async - When true, returns Promises instead of synchronous values.
     * @returns {function(Error): (string|Promise.<string>)} Error handler function.
     * @private
     */
    MarkdownConverterPlugin.prototype.onError = function (silent, async) {
        return function (e) {
            if (silent) {
                var msg = '<p>An error occurred:</p><pre>'
                    + escape(e.message + '', true)
                    + '</pre>';
                if (async) {
                    return Promise.resolve(msg);
                }
                return msg;
            }
            if (async) {
                return Promise.reject(e);
            }
            throw e;
        };
    };
    /**
     * Rebinds renderer and parser instances based on the current option set.
     *
     * @private
     * @returns {void}
     */
    MarkdownConverterPlugin.prototype.rebindPipeline = function () {
        var activeOptions = (this.options);
        // Renderer: use options.renderer if provided; otherwise create a default one
        this.rendererInst = new Renderer();
        // Parser: re-instantiate with latest options + renderer (even if you use static Parser.parse)
        this.parserInstance = new Parser(activeOptions, this.rendererInst);
        this.lexerInstance = new Lexer(activeOptions);
    };
    /**
     * Disposes resources associated with this instance and invokes the base destroy.
     *
     * @hidden
     * @private
     * @returns {void}
     */
    MarkdownConverterPlugin.prototype.destroy = function () {
        this.lexerInstance = undefined;
        this.rendererInst = undefined;
        this.parserInstance = undefined;
    };
    return MarkdownConverterPlugin;
}());
/**
 * Provides utilities for converting Markdown content to HTML.
 *
 * @namespace MarkdownConverter
 *
 * This namespace contains methods related to Markdown-to-HTML conversion.
 * It internally uses the `MarkdownConverter` class to perform the conversion.
 */
// eslint-disable-next-line
export var MarkdownConverter;
(function (MarkdownConverter) {
    /**
     * Converts Markdown content to HTML.
     *
     * @param {string} markdownContent - Markdown source text.
     * @param {MarkdownConverterOptions} options - Optional configuration for the Markdown conversion process.
     * @returns {string | Promise<string>} HTML string or a Promise resolving to HTML in async mode.
     */
    function toHtml(markdownContent, options) {
        var converter = new MarkdownConverterPlugin(options);
        var htmlContent = converter.convertMarkdownToHtml(markdownContent);
        converter.destroy();
        return htmlContent;
    }
    MarkdownConverter.toHtml = toHtml;
})(MarkdownConverter || (MarkdownConverter = {}));
