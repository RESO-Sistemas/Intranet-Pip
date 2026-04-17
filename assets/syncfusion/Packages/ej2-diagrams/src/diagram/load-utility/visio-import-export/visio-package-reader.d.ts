import { ParsingContext } from './visio-import-export';
import { ParsedXmlObject, VisioDocumentStructure, VisioPageMetadata, VisioMemoryObject } from './visio-types';
/**
 * Determines if a page is a background page.
 *
 * Background pages are templates shared across multiple pages.
 * We only want to load non-background pages.
 *
 * @param {VisioPageMetadata | ParsedXmlObject} page - The page metadata to check.
 * @returns {boolean} True if page is a background page, false otherwise.
 * @private
 */
export declare function isBackground(page: VisioPageMetadata | ParsedXmlObject): boolean;
/**
 * Reads and aggregates Visio XML parts from a VSDX (ZIP) package.
 *
 * This class is the main entry point for reading VSDX files. It:
 * - Resolves the requested non-background page via relationship ID
 * - Normalizes relationship target paths
 * - Follows .rels files to include dependent parts (themes, masters, media, etc.)
 * - Parses only XML parts and retains binary parts separately
 * - Designed for browser runtimes (uses TextDecoder and DOMParser)
 *
 * The VSDX format is based on OPC (Open Packaging Convention), which uses
 * relationships to define dependencies between parts. This reader traverses
 * those relationships to collect all required files.
 *
 * @private
 */
export declare class VisioPackageReader {
    private extraIncludeParts;
    private currentBackgroundFiles;
    /**
     * Reads a VSDX ArrayBuffer and returns a consolidated VisioDocumentStructure for the chosen page.
     *
     * This is the main public entry point. It:
     * 1. Validates the VSDX file structure
     * 2. Identifies non-background pages from pages.xml
     * 3. Triggers an import event for page selection
     * 4. Resolves the selected page via relationships
     * 5. Delegates to buildVisioDocumentStructure for part collection and parsing
     *
     * Errors are logged as warnings in the context, and import events are triggered
     * to allow caller-side cancellation or page selection.
     *
     * @param {ArrayBuffer} arrayBuffer - The VSDX file content as an ArrayBuffer.
     *                                    Must be a valid ZIP archive with Visio structure.
     * @param {ParsingContext} [context] - Collector for non-fatal warnings and event dispatching.
     *                                     If not provided, warnings will be lost.
     * @param {number} [pageIndex=0] - Zero-based index of the non-background page to extract.
     *                                Defaults to 0; if out of range, selects the last available page.
     * @param {boolean} [retrieval=false] - The retrieval is used to know this operation runs for import or export
     *                                Defaults to false;
     * @returns {Promise<VisioDocumentStructure | null>} A Promise resolving to the consolidated document structure
     *                                                    or null if fatal errors occur.
     *
     * @example
     * const reader = new VisioPackageReader();
     * const vsdxBuffer = await fetch('diagram.vsdx').then(r => r.arrayBuffer());
     * const structure = await reader.readPackage(vsdxBuffer, context, 0);
     * if (structure) {
     *     console.log(structure.Page); // Page content
     *     console.log(structure.Master); // Master definitions
     * }
     *
     * @private
     */
    readPackage(arrayBuffer: ArrayBuffer, context: ParsingContext, pageIndex?: number, retrieval?: boolean): Promise<VisioDocumentStructure | VisioMemoryObject | null>;
    /**
     * Builds the VisioDocumentStructure for the selected page.
     *
     * This method:
     * 1. Collects base entries (page, masters, document.xml, etc.)
     * 2. Traverses .rels files to discover dependencies (themes, fonts, media, etc.)
     * 3. Parses XML entries and extracts binary parts
     * 4. Merges parsed XML into typed document fields
     * 5. Stores unmapped data in __Extensions bag for extensibility
     * 6. Preserves binary data in __BinaryParts bag
     *
     * This structure is then ready for parsing by the VisioImporter.
     *
     * @param {MinimalZipReader} zip - The ZIP reader instance for extracting entries.
     * @param {ZipEntry[]} visioEntries - All "visio/" entries available in the VSDX archive.
     * @param {XmlRelationship} targetPageRel - The resolved relationship entry pointing to the target page.
     *                                          Must have $.Id, $.Type, and $.Target properties.
     * @param {ParsingContext} context - Collector array for non-fatal warnings during processing.
     * @param {boolean} [retrieval] - The retrieval is used to know this operation runs for import or export
     *
     * @returns {Promise<VisioDocumentStructure>} A Promise resolving to the complete VisioDocumentStructure.
     *
     * @private
     */
    private buildVisioDocumentStructure;
    /**
     * Validates that the document structure is safe to process.
     * @throws {Error} If document structure is invalid or suspicious
     *
     * @param {VisioDocumentStructure} visioDoc - Contains parsed elements from the XML
     *
     * @returns {void}
     *
     */
    private validateDocumentStructure;
    /**
     * Returns the minimal set of entries required before dependency traversal.
     *
     * Always includes:
     * - Target page XML and its .rels file
     *
     * Document-level includes:
     * - document.xml, settings.xml, windows.xml (core document structure)
     *
     * Includes all:
     * - visio/masters/ (all master definitions)
     * - visio/theme/ (all theme definitions)
     *
     * Excludes:
     * - Other pages and their .rels files (to avoid unnecessary parsing)
     *
     * This base set is then supplemented by collectDependencies for a complete picture.
     *
     * @param {ZipEntry[]} visioEntries - All "visio/" entries available in the VSDX archive.
     * @param {string} targetPageFileName - The resolved file name of the target page
     *                                      (e.g., "visio/pages/page1.xml").
     * @returns {ZipEntry[]} An array of filtered ZipEntry objects ready for extraction.
     *
     * @private
     */
    private filterEntriesToExtract;
    /**
     * Merges a parsed XML part into the VisioDocumentStructure.
     *
     * Known files are mapped to typed fields:
     * - visio/document.xml → root properties (merged)
     * - visio/settings.xml → DocumentSettings
     * - visio/windows.xml  → Window[]
     * - visio/pages/pageN.xml → Page[]
     * - visio/masters/masterN.xml → Master[]
     * - Theme XML → a:themeElements
     * - Connections XML → Connects
     * - Shapes XML → Shapes
     *
     * Unknown XML parts are stored under __Extensions[fileName] to preserve data
     * and support future extensions.
     *
     * @param {VisioDocumentStructure} visioDoc - The document structure to merge into.
     *                                            Will be modified in place.
     * @param {string} fileName - The ZIP path of the file being merged
     *                           (e.g., "visio/document.xml").
     * @param {ParsedXmlObject} jsObj - The parsed XML content as a JavaScript object.
     *                                  Root element and its children.
     * @returns {void} - Modifies visioDoc in place.
     *
     * @private
     */
    private mergeIntoDocument;
    /**
     * Extracts a ZIP entry and converts its XML content to a JavaScript object.
     *
     * Uses browser APIs (TextDecoder and DOMParser) for extraction and parsing.
     * Detects and throws on invalid XML (parsererror elements).
     *
     * This is an async operation because ZIP extraction may involve I/O.
     *
     * @param {MinimalZipReader} zip - The ZIP reader instance for extracting.
     * @param {ZipEntry} entry - The ZIP entry to extract and parse.
     * @returns {Promise<ParsedXmlObject>} A Promise resolving to the ParsedXmlObject
     *                                     representing the root element.
     * @throws {Error} If XML parsing fails or the entry cannot be extracted.
     *
     * @private
     */
    private extractAndParseXml;
    /**
     * Type-safe helper to append an item to a property that can be a single item or an array.
     *
     * Handles promotion of singleton values to arrays as needed:
     * - If property is undefined/null: set to item
     * - If property is already an array: push item
     * - Otherwise: create array [existing, item]
     *
     * This allows flexible handling of both single and multiple elements
     * in the document structure.
     *
     * @template K - The key of the property in VisioDocumentStructure.
     * @template T - The type of the item being appended.
     * @param {VisioDocumentStructure} doc - The document object to modify (in place).
     * @param {K} key - The key of the property to append to.
     * @param {T} item - The item to append.
     * @returns {void} - Modifies doc in place.
     *
     * @example
     * appendToProperty(doc, 'Page', pageObj);
     * // doc.Page is now [pageObj] or [existing, pageObj]
     *
     * @private
     */
    private appendToProperty;
    /**
     * Returns the __Extensions bag on the document, creating it if necessary.
     *
     * Used to store unmapped XML parts keyed by their ZIP path. This bag preserves
     * unknown or extension XML content that does not fit standard Visio structure fields.
     * This provides extensibility for future Visio features or custom XML.
     *
     * @param {VisioDocumentStructure} doc - The document structure to access or initialize.
     * @returns {Record<string, ParsedXmlObject>} The __Extensions bag as a key-value object
     *                                            mapping file paths to parsed XML objects.
     *
     * @example
     * const ext = getOrInitExtensions(doc);
     * ext['visio/custom/custom.xml'] = customXmlObj;
     *
     * @note Values are raw ParsedXmlObject instances; no schema validation is performed.
     *
     * @private
     */
    private getOrInitExtensions;
    /**
     * Returns the __BinaryParts bag on the document, creating it if necessary.
     *
     * Used to store non-XML assets (e.g., images, media files) keyed by their ZIP path.
     * This bag preserves binary data that cannot be represented as XML and allows
     * later retrieval by the import process.
     *
     * @param {VisioDocumentStructure} doc - The document structure to access or initialize.
     * @returns {Record<string, Uint8Array>} The __BinaryParts bag as a key-value object
     *                                       mapping file paths to Uint8Array buffers.
     *
     * @example
     * const bin = getOrInitBinaryParts(doc);
     * // Later: const imageData = bin['visio/media/image1.png'];
     *
     * @note This uses a loose object check; it does not validate that values are Uint8Array.
     *       Callers must only assign Uint8Array values to this bag.
     *
     * @private
     */
    private getOrInitBinaryParts;
    /**
     * Retrieves or initializes the internal `__Parts` bag on a Visio document structure.
     * If the `__Parts` property already exists and is an object, it is returned.
     * Otherwise, a new empty record is created, attached to the document object,
     * and then returned.
     *
     * @param {VisioDocumentStructure} doc - The Visio document structure to inspect or extend
     * @returns {Record<string, ParsedXmlObject>} A record mapping part names to parsed XML objects
     */
    private getOrInitParts;
    /**
     * Retrieves or initializes the internal `__Index` structure on a Visio document.
     * If the `__Index` property already exists and is an object, it is returned.
     * Otherwise, a new `NormalizedIndex` is created, attached to the document object,
     * and then returned.
     *
     * The `NormalizedIndex` contains:
     * - `mastersById`: Map of master IDs to master info
     * - `masterFileByRid`: Map of relationship IDs to master file names
     * - `masterChildByMasterId`: Map of master IDs to child shape maps
     * - `masterParentByMasterId`: Map of master IDs to parent-child relationships
     * - `masterImmediateChildrenByMasterId`: Map of master IDs to immediate child IDs
     * - `masterRootIdsByMasterId`: Map of master IDs to top-level shape IDs
     * - `pageConnectsByFile`: Map of page connections by file
     *
     * @param {VisioDocumentStructure} doc - The Visio document structure to inspect or extend
     * @returns {NormalizedIndex} A normalized index object for master and page references
     */
    private getOrInitIndex;
    /**
     * Builds (or refreshes) the normalized `__Index` caches used by the importer.
     *
     * Populates master and page lookup maps:
     * - `masterFileByRid`: relationship Id -> master file path (from masters.xml.rels)
     * - `mastersById`: masterId -> { id, nameU, rid, fileName } (from masters.xml)
     * - `masterChildByMasterId`: masterId -> Map(shapeId -> shape node) for each master file
     * - `masterParentByMasterId`: masterId -> Map(childId -> parentId)
     * - `masterImmediateChildrenByMasterId`: masterId -> Map(parentId -> childId[])
     * - `masterRootIdsByMasterId`: masterId -> root shapeId[]
     * - `pageConnectsByFile`: page file -> Connects block (selected page only)
     *
     * Adds warnings to the parsing context when required master parts are missing.
     *
     * @param {VisioDocumentStructure} doc - Parsed document structure containing extracted parts and index storage.
     * @param {ParsingContext} context - Parsing context used to record warnings and shared state.
     * @returns {void}
     */
    private buildNormalizedIndexes;
}
