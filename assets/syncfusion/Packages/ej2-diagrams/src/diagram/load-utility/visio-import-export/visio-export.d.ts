import { Diagram } from '../../diagram';
import { ParsingContext, VisioExportOptions } from './visio-import-export';
export interface PaperSize {
    name: string;
    wIn: number;
    hIn: number;
    kind: number;
}
export interface PaperDetectionResult {
    isStandard: boolean;
    kind: number;
    name: string;
    orientation: 'portrait' | 'landscape';
    multiple: number;
    baseWidthIn: number;
    baseHeightIn: number;
}
/**
 * Exports a Syncfusion Diagram to a VSDX (Visio Drawing) file format.
 * This is the primary entry point for converting diagrams to Visio format.
 *
 * Process Flow:
 * 1. Convert diagram data to intermediate Visio format
 * 2. Generate XML content with master definitions and image handling
 * 3. Create document property files (core metadata)
 * 4. Package everything into a ZIP archive (VSDX format)
 * 5. Return ArrayBuffer containing the complete VSDX file
 *
 * @private
 * @async
 * @param {Diagram} diagram - The Syncfusion Diagram object to export
 * @param {string} pageName - The name to be given to the Visio page within the VSDX
 * @param {ParsingContext} context - Parsing context for logging
 * @returns {Promise<ArrayBuffer>} A Promise that resolves with an ArrayBuffer containing
 *                                 the VSDX file's complete binary data, ready for download
 *
 * @example
 * const diagram = new Diagram({...});
 * const buffer = await exportToVsdx(diagram, 'My Diagram');
 * // buffer can now be saved to a file or sent to server
 *
 * @throws {Error} If diagram data is invalid or export process fails
 */
export declare function exportToVsdx(diagram: Diagram, pageName: string, context: ParsingContext): Promise<ArrayBuffer>;
/**
 * Exports a Syncfusion Diagram to a VSDX file and triggers its download in the browser.
 * Convenience function that combines export with automatic file download.
 *
 * Process:
 * 1. Extract or use default options (fileName, pageName)
 * 2. Call exportToVsdx() to generate VSDX data
 * 3. Convert ArrayBuffer to base64 data URL
 * 4. Create temporary anchor element and trigger download
 * 5. Clean up temporary DOM elements
 *
 * @private
 * @async
 * @param {Diagram} diagram - The Syncfusion Diagram object to export
 * @param {VisioExportOptions} [options] - Optional configuration object
 * @param {string} [options.fileName='Sample.vsdx'] - The filename for the downloaded file
 * @param {string} [options.pageName='Page-1'] - The name of the page in the Visio document
 * @returns {Promise<void>} A Promise that resolves once the file download has been initiated
 *
 * @example
 * await exportToVsdxFile(diagram, {
 *     fileName: 'my-workflow.vsdx',
 *     pageName: 'Workflow Diagram'
 * });
 *
 * @note Browser must have user interaction for download to work (security restriction)
 */
export declare function exportToVsdxFile(diagram: Diagram, options?: VisioExportOptions): Promise<void>;
