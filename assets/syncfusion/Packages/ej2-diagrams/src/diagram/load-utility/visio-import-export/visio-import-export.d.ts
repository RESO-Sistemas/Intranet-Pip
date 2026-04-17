import { IExportingEventArgs, IImportingEventArgs } from '../..';
import { Diagram } from '../../diagram';
import { VisioDiagramData, VisioPage } from './visio-models';
import { VisioDocumentStructure } from './visio-types';
import { VisioPropertiesManager } from './visio-theme';
/**
 * Main class for importing and exporting Visio VSDX files.
 * Orchestrates the entire import/export pipeline including file reading, XML parsing, and diagram loading.
 *
 * This class serves as the primary public API for Visio import/export functionality,
 * managing the complete lifecycle of VSDX file conversion.
 *
 * @remarks
 * The class uses a {@link ParsingContext} to maintain state during operations,
 * ensuring re-entrant and testable parsing logic without global state dependencies.
 *
 * @example
 * ```typescript
 * const importer = new ImportAndExportVisio();
 * const file = document.getElementById('fileInput').files[0];
 * const result = await importer.importVSDX(file, diagram, { pageIndex: 0 });
 * console.log(result.warnings); // Log any import warnings
 * ```
 */
export declare class ImportAndExportVisio {
    /** Instance of VisioPackageReader for reading and extracting VSDX file contents */
    private packageReader;
    /** Active parsing context for current import/export operation */
    private context?;
    /**
     * Creates a new instance of the ImportAndExportVisio class.
     * Initializes the internal VisioPackageReader used for VSDX file processing.
     */
    constructor();
    /**
     * Exports a Syncfusion Diagram to VSDX format and triggers a file download.
     *
     * Orchestrates the export process by creating a clean context, triggering
     * export events, and delegating to the actual export function.
     *
     * @private
     * @param {Diagram} diagram - The Syncfusion Diagram object to export.
     * @param {VisioExportOptions} [options] - Optional export configuration.
     * @param {string} [options.fileName='diagram.vsdx'] - The name for the downloaded file.
     * @param {string} [options.pageName='Page-1'] - The name of the Visio page to create.
     * @returns {void}
     *
     * @remarks
     * This function:
     * 1. Creates a new ParsingContext for clean state
     * 2. Triggers the 'diagramExporting' event with 'starting' status
     * 3. Cancels if the event is cancelled by subscribers
     * 4. Calls exportToVsdxFile to perform the actual export
     * 5. Triggers the 'diagramExporting' event with 'completed' status
     *
     * @example
     * ```typescript
     * const importer = new ImportAndExportVisio();
     * importer.exportVSDX(diagram, { fileName: 'myDiagram.vsdx', pageName: 'Diagram1' });
     * // Browser download dialog appears
     * ```
     */
    exportVSDX(diagram: Diagram, options?: VisioExportOptions): void;
    /**
     * Imports a VSDX file into a Syncfusion Diagram.
     *
     * This is the primary public method for importing Visio files. It orchestrates
     * the entire import pipeline: file reading → package extraction → XML parsing → diagram loading.
     *
     * @private
     * @async
     * @param {File | Blob} file - The VSDX file to import (from HTML file input).
     * @param {Diagram} diagram - The Syncfusion Diagram instance to populate.
     * @param {VisioImportOptions} [options] - Optional import configuration.
     * @param {number} [options.pageIndex=0] - Zero-based index of the page to import.
     * @returns {Promise<ImportResult>} - A promise resolving to the import result.
     * @returns {Promise<ImportResult.diagramJson>} - The diagram serialized as JSON string.
     * @returns {Promise<ImportResult.warnings>} - Array of warning messages about unsupported features.
     *
     * @remarks
     * Process Flow:
     * 1. Validates file parameter
     * 2. Triggers 'diagramImporting' event with 'starting' status
     * 3. Reads VSDX file as ArrayBuffer
     * 4. Extracts and parses XML content using VisioPackageReader
     * 5. Parses raw XML into VisioDiagramData model
     * 6. Loads data into Diagram instance
     * 7. Triggers 'diagramImporting' event with 'completed' status
     *
     * Error Handling:
     * - Missing file: Returns error warning
     * - Failed package read: Returns error warning
     * - Any exception: Caught and added to warnings
     *
     * @example
     * ```typescript
     * const importer = new ImportAndExportVisio();
     * const file = document.getElementById('fileInput').files[0];
     * const result = await importer.importVSDX(file, diagram);
     * if (result.warnings.length > 0) {
     *   console.log('Import completed with warnings:', result.warnings);
     * }
     * // Diagram is now populated with Visio data
     * ```
     */
    importVSDX(file: File | Blob, diagram: Diagram, options?: VisioImportOptions): Promise<ImportResult>;
    /**
     * Reads a File object as an ArrayBuffer.
     * Uses the browser's FileReader API to asynchronously read file contents.
     *
     * @private
     * @param {File} file - The file to read.
     * @returns {Promise<ArrayBuffer>} - A promise that resolves with the file contents as an ArrayBuffer.
     * @throws {Error} - If the file cannot be read or the result is not an ArrayBuffer.
     *
     * @remarks
     * This utility method wraps the FileReader API in a Promise, making it easier
     * to use with async/await syntax.
     *
     * @example
     * ```typescript
     * const file = document.getElementById('fileInput').files[0];
     * const buffer = await this.readFileAsArrayBuffer(file);
     * // buffer is now an ArrayBuffer containing file contents
     * ```
     */
    private readFileAsArrayBuffer;
    /**
     * Returns the module name.
     *
     * @protected
     * @returns {string} - The module identifier string.
     */
    protected getModuleName(): string;
    /**
     * Cleans up resources used by this instance.
     * Called when the component is destroyed or no longer needed.
     *
     * @private
     * @returns {void}
     *
     * @remarks
     * Can be extended to clean up file readers, cached data, etc.
     */
    destroy(): void;
}
/**
 * Encapsulates the state of a single Visio parsing operation.
 *
 * This context object replaces the need for global state, enabling re-entrant,
 * testable, and cleaner parsing logic. Each import/export operation gets its own
 * context instance to maintain isolated state.
 *
 * @remarks
 * The context maintains:
 * - Reference to the target Diagram instance
 * - Accumulated VisioDiagramData being built during parsing
 * - Shape index counter for internal use
 * - Warning messages collected during parsing
 * - Parsed XML document structure
 *
 * @example
 * ```typescript
 * const context = new ParsingContext(diagram);
 * // ... perform parsing operations ...
 * context.addWarning('Feature X is not supported');
 * const warnings = context.getWarnings();
 * ```
 */
export declare class ParsingContext {
    /**
     * Reference to the Diagram instance, used for unit conversions and event triggering.
     * @private
     * @readonly
     */
    readonly diagram: Diagram;
    /**
     * Accumulated data model for the diagram being parsed.
     * Built up during parsing and eventually loaded into the diagram.
     * @private
     * @readonly
     */
    readonly data: VisioDiagramData;
    /**
     * Shape index counter used internally during shape processing.
     * Wrapped in an object to allow mutation while maintaining readonly context.
     * @private
     */
    shapeIndex: {
        value: number;
    };
    /**
     * Parsed XML document structure from the VSDX file.
     * Contains all extracted XML data organized by type.
     * @private
     */
    entries: VisioDocumentStructure;
    /**
     * Accumulated warning messages collected during parsing.
     * Prevents duplicate warnings.
     * @private
     */
    private warnings;
    /**
     * Creates a new ParsingContext for a specific Diagram instance.
     *
     * @param {Diagram} diagram - The target Diagram instance that will be populated with parsed data.
     */
    constructor(diagram: Diagram);
    /**
     * Adds a warning message to the context's warning collection.
     * Automatically prevents duplicate warnings by checking if message already exists.
     *
     * @private
     * @param {string} message - The warning message to add.
     * @returns {void}
     *
     * @remarks
     * Warning messages are typically about unsupported Visio features or import limitations.
     * Duplicates are filtered to keep the warning list clean and readable.
     *
     * @example
     * ```typescript
     * context.addWarning('Feature X is not supported in Syncfusion');
     * context.addWarning('Feature X is not supported in Syncfusion'); // Ignored - duplicate
     * ```
     */
    addWarning(message: string): void;
    /**
     * Retrieves all accumulated warning messages.
     *
     * @private
     * @returns {string[]} - Array of warning messages collected during parsing.
     *
     * @example
     * ```typescript
     * const warnings = context.getWarnings();
     * console.log(`Found ${warnings.length} warnings`);
     * ```
     */
    getWarnings(): string[];
    /**
     * Triggers an import or export event on the diagram with current warnings.
     * Delegates to the diagram's event system to notify subscribers of operation status.
     *
     * @private
     * @param {('Import' | 'Export')} type - The type of event to trigger.
     * @param {IImportingEventArgs | IExportingEventArgs} args - Event arguments containing status information.
     * @returns {void}
     *
     * @remarks
     * This method automatically adds accumulated warnings to the event args before triggering.
     * Allows event subscribers to be notified of import/export progress and warnings.
     *
     * @example
     * ```typescript
     * context.triggerEvent('Import', { status: 'starting' });
     * // Later...
     * context.triggerEvent('Import', { status: 'completed' });
     * ```
     */
    triggerEvent(type: 'Import' | 'Export', args: IImportingEventArgs | IExportingEventArgs): void;
    /**
     * Getter for the currently active page being parsed.
     *
     * @private
     * @returns {VisioPage | undefined} - The current page data or undefined if not set.
     *
     * @remarks
     * Returns the page from the accumulated data model. Used to access page-specific
     * properties during parsing.
     */
    readonly currentPage: VisioPage | undefined;
    /**
     * Parsed XML document structure from the VSDX file.
     * Contains all extracted XML data organized by type.
     * @private
     */
    propertyManager: VisioPropertiesManager;
}
/**
 * Main entry point to parse a raw Visio JavaScript object into a structured data model.
 * Orchestrates the entire parsing process, converting XML into typed data structures.
 *
 * @async
 * @param {VisioDocumentStructure} visioObj - The raw JavaScript object derived from XML conversion.
 * @param {ParsingContext} context - The context instance used for configuration and logging.
 * @returns {Promise<VisioDiagramData>} - A promise resolving to a fully populated VisioDiagramData instance.
 *
 * @remarks
 * Parsing Order:
 * 1. Pages (must be first for pageHeight dependency)
 * 2. Windows (viewport settings)
 * 3. Masters (shape definitions)
 * 4. Document Settings (general configuration)
 * 5. Relationships and Media (images and binaries)
 * 6. Themes (color schemes)
 * 7. Connections (connector relationships)
 * 8. Shapes and Connectors (diagram elements)
 *
 * This function handles:
 * - Parsing of all Visio document components
 * - Conversion of binary image data to base64 data URLs
 * - Relationship mapping between elements
 * - Theme application
 * - Connection establishment
 *
 * @example
 * ```typescript
 * const visioObj = await packageReader.readPackage(arrayBuffer, context);
 * const diagramData = await parseVisioData(visioObj, context);
 * // diagramData now contains all parsed diagram information
 * ```
 */
export declare function parseVisioData(visioObj: VisioDocumentStructure, context: ParsingContext): Promise<VisioDiagramData>;
/**
 * Loads a parsed and clean VisioDiagramData model into a Syncfusion Diagram instance.
 * This is the final step in the import pipeline, converting data structures to diagram elements.
 *
 * @async
 * @param {Diagram} diagram - The Syncfusion diagram instance to populate.
 * @param {VisioDiagramData} diagramData - The clean, parsed Visio diagram data model.
 * @param {ParsingContext} context - Reference to the ParsingContext for utility methods and logging.
 * @returns {Promise<void>} - Resolves when the diagram has been fully populated and rendered.
 *
 * @remarks
 * This function performs:
 * 1. Diagram initialization and clearing
 * 2. Page settings configuration (dimensions, orientation, background)
 * 3. Snap settings and grid configuration
 * 4. Layer setup and management
 * 5. Node conversion and addition
 * 6. Connector binding and addition
 * 7. Expanded subprocess processing (for BPMN)
 * 8. Active layer activation
 *
 * @example
 * ```typescript
 * await loadVisioDataIntoDiagram(diagram, diagramData, context);
 * // Diagram is now fully populated with all shapes and connectors
 * ```
 */
export declare function loadVisioDataIntoDiagram(diagram: Diagram, diagramData: VisioDiagramData, context: ParsingContext): Promise<void>;
/**
 * Defines options to customize Visio import behavior.
 * @interface VisioImportOptions
 */
export interface VisioImportOptions {
    /**
     * The zero-based index of the Visio page to import.
     * If multiple pages exist, use this to select which page to load.
     * @default 0
     * @type {number}
     * @example
     * ```typescript
     * { pageIndex: 1 } // Import the second page
     * ```
     */
    pageIndex?: number;
}
/**
 * Defines options to customize Visio export behavior.
 * @interface VisioExportOptions
 */
export interface VisioExportOptions {
    /**
     * The name of the exported `.vsdx` file.
     * Used as the filename when downloading the exported diagram.
     * @default "diagram.vsdx"
     * @type {string}
     * @example
     * ```typescript
     * { fileName: 'myDiagram.vsdx' }
     * ```
     */
    fileName?: string;
    /**
     * The name of the Visio page to create during export.
     * Appears as the page name in the exported Visio file.
     * @default "Page-1"
     * @type {string}
     * @example
     * ```typescript
     * { pageName: 'My Diagram' }
     * ```
     */
    pageName?: string;
}
/**
 * Result of a Visio import operation.
 * Contains the serialized diagram data and any warnings encountered during import.
 * @interface ImportResult
 */
export interface ImportResult {
    /**
     * The Syncfusion DiagramModel serialized as a JSON string.
     * Can be used with diagram.loadDiagram() to restore the state.
     * @type {string}
     * @example
     * ```typescript
     * const result = await importer.importVSDX(file, diagram);
     * diagram.loadDiagram(result.diagramJson);
     * ```
     */
    diagramJson: string;
    /**
     * Array of human-readable warning messages about unsupported features.
     * Includes limitations encountered during the import process.
     * Examples: gradients, BPMN shape differences, line styles, etc.
     * @type {string[]}
     * @example
     * ```typescript
     * const result = await importer.importVSDX(file, diagram);
     * console.log(result.warnings); // Log all warnings to user
     * ```
     */
    warnings: string[];
}
