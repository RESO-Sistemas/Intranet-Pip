import { MarkdownConverterOptions } from './interface';
/**
 * Provides utilities for converting Markdown content to HTML.
 *
 * @namespace MarkdownConverter
 *
 * This namespace contains methods related to Markdown-to-HTML conversion.
 * It internally uses the `MarkdownConverter` class to perform the conversion.
 */
export declare namespace MarkdownConverter {
    /**
     * Converts Markdown content to HTML.
     *
     * @param {string} markdownContent - Markdown source text.
     * @param {MarkdownConverterOptions} options - Optional configuration for the Markdown conversion process.
     * @returns {string | Promise<string>} HTML string or a Promise resolving to HTML in async mode.
     */
    function toHtml(markdownContent: string, options?: MarkdownConverterOptions): string | Promise<string>;
}
