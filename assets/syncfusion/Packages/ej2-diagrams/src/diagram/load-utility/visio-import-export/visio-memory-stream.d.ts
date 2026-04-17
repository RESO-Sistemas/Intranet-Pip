import { Diagram } from '../../diagram';
import { RetirevedData } from './visio-types';
/**
 * A static in-memory storage used during Visio Import/Export operations.
 *
 * This class temporarily stores:
 *  - The entire Visio `.vsdx` ArrayBuffer
 *  - File name of the package
 *  - The selected page index for import/export
 *
 * It allows modules involved in the parsing pipeline to share Visio masters,
 * page XML content, and document metadata without passing them through function calls.
 * @private
 */
export declare class VisioMemoryStream {
    /** Holds the raw Visio (.vsdx) file buffer. */
    static arrayBuffer: ArrayBuffer;
    /** Holds the original Visio file name. */
    static fileName: string;
    /** Stores the selected page index imported into the EJ2 Diagram. */
    static pageIndex: number;
    /** Stores the selected page index imported into the EJ2 Diagram. */
    static isClearVisio: boolean;
    /**
     * Stores the Visio file metadata and buffer in the memory stream.
     *
     * @param {string} fileName - The name of the Visio file.
     * @param {ArrayBuffer} arrayBuffer - The VSDX file data buffer.
     * @param {number} pageIndex - The index of the imported Visio page.
     * @returns {void} - Saves the provided details into the memory stream.
     * @private
     */
    static set(fileName: string, arrayBuffer: ArrayBuffer, pageIndex: number): void;
    /**
     * Reads and parses the Visio package stored in memory, extracting preserved
     * pages, masters, page relationships, and document-level XML parts.
     *
     * @param {Diagram} diagram - The EJ2 Diagram instance used to initialize parsing context.
     * @returns {Promise<RetirevedData>} - Returns all extracted Visio components needed for export.
     */
    static get(diagram: Diagram): Promise<RetirevedData>;
    /**
     * Clears all stored memory reference data used during import/export.
     *
     * @returns {void} - Resets the memory container.
     * @private
     */
    static clear(): void;
}
