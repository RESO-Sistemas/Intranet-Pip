import { MarkdownConverterOptions } from './interface';
export declare function escape(html: string, encode?: boolean): string;
export declare function cleanUrl(href: string): string | null;
export declare function splitCells(tableRow: string, count?: number): string[];
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param {string} str The string
 * @param {string} c The character to trim
 * @param  {boolean} invert Remove suffix of non-c chars instead. Default falsey.
 * @returns {string} The trimmed string
 */
export declare function removeTrailingSpace(str: string, c: string, invert?: boolean): string;
export declare function findClosingBracket(str: string, b: string): number;
export declare function getDefaults(): MarkdownConverterOptions;
export declare function stringTrimStart(value: string): string;
export declare function stringTrimEnd(value: string): string;
export declare function arrayAt(arr: any, index: number): any;
