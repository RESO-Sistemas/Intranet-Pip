import { BlockModel } from '../../models/index';
import { TableClipboardPayload } from '../../block-manager/base/interface';
/**
 * Generates plain text representation of blocks for external clipboard
 *
 * @param {BlockModel[]} blocks - Block models to convert to plain text
 * @returns {string} Plain text representation of blocks
 */
export declare function generatePlainTextForExternalClipboard(blocks: BlockModel[]): string;
/**
 * Creates block model from plain clipboard text
 *
 * @param {string} text - Text from clipboard
 * @returns {BlockModel[]} Array of block models
 */
export declare function createBlocksFromPlainText(text: string): BlockModel[];
/**
 * Gets text content from a block model
 *
 * @param {BlockModel} block - Block model to extract text from
 * @returns {string} Plain text content from block
 */
export declare function getBlockText(block: BlockModel): string;
/**
 * Checks if HTML content contains block-level elements
 *
 * @param {HTMLElement} container - Container with HTML content
 * @returns {boolean} True if contains block-level elements
 */
export declare function isBlockLevelContent(container: HTMLElement): boolean;
/**
 * Unwraps container element if needed
 *
 * @param {HTMLElement} container - Container to potentially unwrap
 * @returns {HTMLElement} Unwrapped container or original
 */
export declare function unWrapContainer(container: HTMLElement): HTMLElement;
export declare function writeTableClipboardPayload(dt: DataTransfer, payload: TableClipboardPayload, html: string, text: string): void;
export declare function readTableClipboardPayload(dt: DataTransfer): TableClipboardPayload | null;
export declare function buildTableClipboardPayload(tableBlockEl: HTMLElement, blockModel: BlockModel): TableClipboardPayload;
export declare function extractPlainTextMatrixFromPayload(payload: TableClipboardPayload, blockModel: BlockModel): string[][];
export declare function createCellsPayloadFromExternal(html: string, text: string): TableClipboardPayload | null;
export declare function tsvFromMatrix(matrix: string[][]): string;
export declare function matrixFromTsv(text: string): string[][];
export declare function htmlTableFromMatrix(matrix: string[][], options?: {
    hasHeader?: boolean;
    hasRowNumbers?: boolean;
}): string;
