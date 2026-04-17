import { BlockModel, ContentModel, Styles } from '../../models/index';
import { LinkData } from '../interface';
export declare function convertHtmlElementToBlocks(container: HTMLElement, keepFormat: boolean): BlockModel[];
export declare function convertInlineElementsToContentModels(element: HTMLElement, keepFormat: boolean): ContentModel[];
export declare function extractStylesFromElement(element: HTMLElement, styles?: (Styles | LinkData)): Styles;
/**
 * Detects all active formats for a specific text node.
 * Traverses upward through DOM to find format-containing ancestors.
 *
 * @param {Text} node - The text node to analyze
 * @returns {Styles} - All detected formats on this node
 * @hidden
 */
export declare function detectFormatsForTextNode(node: Node): Styles;
export declare function parseHtmlTableToMatrix(root: HTMLElement): {
    matrix: HTMLElement[][];
    hasHeader: boolean;
};
export declare function parseHtmlTableToBlock(element: HTMLElement): BlockModel;
export declare function getBlockDataAsHTML(blocks: BlockModel[], editorId?: string): string;
export declare function renderContentAsHTML(content?: ContentModel[]): string;
export declare function renderBlockAsHTML(block: BlockModel, editorId?: string): string;
export declare function renderElementWithWrapper(tagName: string, content: string, className?: string): string;
