/**
 * Sanitizes HTML content if enabled
 *
 * @param {string} html - The HTML content to sanitize.
 * @param {boolean} enableSanitizer - Whether to enable HTML sanitization.
 * @returns {string} - The sanitized HTML content.
 */
export declare function sanitizeHelper(html: string, enableSanitizer: boolean): string;
/**
 * Decodes HTML entities in a string
 *
 * @param {string} value - specifies the string value
 * @returns {string} - returns the string
 */
export declare function decode(value: string): string;
/**
 * Encodes HTML entities in a string
 *
 * @param {string} value - specifies the string value
 * @returns {string} - returns the string
 */
export declare function encode(value: string): string;
export declare function escapeHTML(text: string): string;
