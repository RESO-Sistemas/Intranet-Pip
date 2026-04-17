/**
 * Represents a file entry within a ZIP archive.
 * Contains metadata about a single file stored in the ZIP container.
 *
 * @typedef {Object} ZipEntry
 * @property {string} name - The file path/name within the ZIP archive
 * @property {number} uncompressedSize - Size of the file when decompressed (in bytes)
 * @property {number} compressedSize - Size of the file as stored in the ZIP (in bytes)
 * @property {number} compression - Compression method used (0=stored, 8=deflate)
 * @property {number} offset - Byte offset of the local file header in the ZIP archive
 */
export declare type ZipEntry = {
    readonly name: string;
    readonly uncompressedSize: number;
    readonly compressedSize: number;
    readonly compression: number;
    readonly offset: number;
};
/**
 * Minimal ZIP reader for extracting VSDX files (which are ZIP archives).
 * Handles both stored (uncompressed) and deflate-compressed entries.
 *
 * This class provides core functionality to:
 * - Parse ZIP file structure and locate the central directory
 * - Extract metadata about all files in the archive
 * - Decompress file entries using DEFLATE algorithm or retrieve stored data
 *
 * The implementation follows the ZIP file format specification (RFC 1952) and
 * is optimized for parsing VSDX (Visio) files which are ZIP containers.
 *
 * @example
 * const zipData = await fetch('document.vsdx').then(r => r.arrayBuffer());
 * const reader = new MinimalZipReader(zipData);
 * const entries = reader.getEntries();
 * const xmlContent = await reader.extract(entries[0]);
 */
export declare class MinimalZipReader {
    /** @private @type {Uint8Array} The raw ZIP file data as a byte array */
    private readonly data;
    /**
     * Creates a new MinimalZipReader instance.
     * Accepts either an ArrayBuffer or Uint8Array containing ZIP file data.
     *
     * @constructor
     * @param {ArrayBuffer | Uint8Array} data - The ZIP file data to read
     * @throws Does not throw, but subsequent operations may fail if data is invalid
     *
     * @example
     * const reader1 = new MinimalZipReader(arrayBuffer);
     * const reader2 = new MinimalZipReader(uint8Array);
     */
    constructor(data: ArrayBuffer | Uint8Array);
    /**
     * Retrieves all file entries from the ZIP archive.
     * Parses the central directory to extract metadata about each file.
     *
     * Algorithm:
     * 1. Locate the End of Central Directory (EOCD) record at the end of the file
     * 2. Read the central directory offset and number of entries from EOCD
     * 3. Iterate through each central directory record and extract file metadata
     * 4. Build ZipEntry objects with name, sizes, compression method, and offset
     *
     * Security checks:
     * - Validates EOCD signature and structure
     * - Checks all offsets are within file bounds
     * - Validates central directory signatures
     * - Checks filename lengths don't exceed available data
     * - Detects infinite loops from malformed data
     *
     * @private
     * @returns {ZipEntry[]} Array of ZipEntry objects describing each file in the archive
     *                       Returns empty array if EOCD not found or file is invalid
     *
     * @example
     * const reader = new MinimalZipReader(zipData);
     * const entries = reader.getEntries();
     * console.log(`Archive contains ${entries.length} files`);
     * entries.forEach(entry => {
     *     console.log(`${entry.name}: ${entry.uncompressedSize} bytes`);
     * });
     */
    getEntries(): ZipEntry[];
    /**
     * Extracts and decompresses the content of a ZIP entry.
     * Handles both stored (uncompressed) and DEFLATE-compressed data.
     *
     * Algorithm:
     * 1. Validate entry offset and bounds
     * 2. Verify local file header signature and structure
     * 3. Skip over filename and extra fields to reach compressed data
     * 4. Validate compressed data bounds within archive
     * 5. Route to appropriate decompression based on compression method:
     *    - Stored: return data as-is (no decompression needed)
     *    - DEFLATE: decompress using inflateRaw() function
     * 6. Return decompressed data as Uint8Array
     *
     * @private
     * @async
     * @param {ZipEntry} entry - The ZipEntry object describing the file to extract
     * @returns {Promise<Uint8Array>} Promise resolving to decompressed file data
     * @throws {Error} if entry offset is invalid
     * @throws {Error} if local file header is missing or corrupt
     * @throws {Error} if compressed data bounds are invalid
     * @throws {Error} if compression method is not supported
     * @throws {Error} if DEFLATE decompression fails
     *
     * @example
     * const entry = entries.find(e => e.name === 'document.xml');
     * const data = await reader.extract(entry);
     * const text = new TextDecoder().decode(data);
     */
    extract(entry: ZipEntry): Promise<Uint8Array>;
    /**
     * Finds the End of Central Directory (EOCD) record within the ZIP file.
     * Searches backwards from the end of file since EOCD must be at the end.
     *
     * Algorithm:
     * 1. Calculate search range: last 65535+22 bytes (max ZIP comment size + min EOCD size)
     * 2. Search backwards byte-by-byte for EOCD signature
     * 3. Return offset of first EOCD signature found
     *
     * ZIP Specification Details:
     * - EOCD signature is 4 bytes: 0x50 0x4B 0x05 0x06 ("PK\x05\x06")
     * - EOCD must appear within last 65535+22 bytes due to max comment length
     * - Only the first EOCD found (searching backwards) is considered valid
     *
     * @private
     * @returns {number} Byte offset of EOCD in the file, or -1 if not found
     *
     * @example
     * const offset = this.findEndOfCentralDirectory();
     * if (offset >= 0) {
     *     console.log(`EOCD found at byte ${offset}`);
     * }
     */
    private findEndOfCentralDirectory;
    /**
     * Validates a signature (magic bytes) at a given offset in the data.
     * Used to verify ZIP structural markers throughout the file.
     *
     * Purpose:
     * - Verify ZIP signatures: local headers, central directory, EOCD
     * - Detect file corruption or invalid ZIP structures
     * - Ensure we're reading valid ZIP records at expected locations
     *
     * @private
     * @param {number} offset - The byte offset to check in the data array
     * @param {number[]} expectedBytes - The expected signature bytes to match
     * @returns {boolean} True if signature matches exactly, false otherwise
     *
     * @example
     * const isValid = this.validateSignature(0, [0x50, 0x4b, 0x03, 0x04]);
     * // Returns true if file starts with "PK\x03\x04" (local file header)
     */
    private validateSignature;
    /**
     * Decodes UTF-8 encoded bytes to a JavaScript string.
     * Used to parse filenames and text data from the ZIP archive.
     *
     * Implementation:
     * - Uses TextDecoder API with UTF-8 encoding
     * - Provides proper error handling for invalid UTF-8 sequences
     * - Wraps platform-provided decoder with error context
     *
     * @private
     * @param {Uint8Array} bytes - The UTF-8 encoded byte sequence to decode
     * @returns {string} Decoded JavaScript string
     * @throws {Error} if UTF-8 decoding fails or bytes are malformed
     *
     * @example
     * const nameBytes = new Uint8Array([0x64, 0x6F, 0x63, 0x75, 0x6D, 0x65, 0x6E, 0x74, 0x2E, 0x78, 0x6D, 0x6C]);
     * const name = this.decodeUtf8(nameBytes);  // "document.xml"
     */
    private decodeUtf8;
}
/**
 * Represents a parsed XML element structure with flexible value types.
 * Provides a JavaScript object representation of XML elements.
 *
 * Properties:
 * - `$`: Object containing element attributes (optional)
 * - `value`: Element text content or child element content (optional)
 * - Other properties: Child elements by name
 *
 * Security:
 * Properties are validated to prevent prototype pollution attacks.
 * Unsafe property names like __proto__, constructor, prototype are rejected.
 *
 * @typedef {Object} ParsedXmlObject
 * @property {Record<string, string>} [$] - Element attributes as key-value pairs
 * @property {string | ParsedXmlObject | Array<string | ParsedXmlObject>} [value] - Element content
 * @property {ParsedXmlObject} [key] - Child element or other dynamic properties
 *
 * @example
 * // XML: <root attr="value"><child>text</child></root>
 * // Result: {
 * //   $: { attr: "value" },
 * //   child: { value: "text" }
 * // }
 */
declare type ParsedXmlObject = {
    $?: Record<string, string>;
    value?: string | ParsedXmlObject | (string | ParsedXmlObject)[];
    [key: string]: any;
};
/**
 * Preserve Visio <Text> formatting runs:
 * - Captures text segments tagged with current cp/pp/tp indices.
 * - Provides consolidated `value` for display, and `textRuns` for styling or downstream mapping.
 * - Handles mixed content (text + child elements).
 * - Tracks order of children (optional) including #text entries.
 */
export interface TextRun {
    text: string;
    cpIX: number | null;
    ppIX: number | null;
    tpIX: number | null;
}
/**
 * Converts an XML DOM Node to a JavaScript object recursively.
 * Handles text nodes, element nodes, and attributes with security validation
 * to prevent prototype pollution attacks.
 *
 * Algorithm:
 * 1. Handle text nodes: trim whitespace and return if non-empty
 * 2. For element nodes:
 *    a. Extract and store attributes in $ object
 *    b. Process each child node recursively
 *    c. Merge duplicate properties into arrays
 *    d. Store text node content in 'value' property
 * 3. Guard against non-element node types
 * 4. Validate property names to prevent prototype pollution
 * 5. Optionally track child order for visio elements
 *
 * Security Features:
 * - Validates property names against UNSAFE_PROPERTY_NAMES
 * - Uses Object.defineProperty for immutable order tracking
 * - Type-checks before attribute access
 *
 * @private
 * @param {Node} node - The XML DOM Node to convert
 * @param {boolean} [shouldTrackOrder=false] - Whether to preserve child element order
 * @returns {ParsedXmlObject | string | undefined} Parsed JavaScript object,
 *          string (for text nodes), or undefined (for empty text nodes)
 *
 * @example
 * // XML: <root attr="value"><child>text</child></root>
 * const node = xmlElement;
 * const obj = xmlToJsObject(node);
 * console.log(obj.$.attr);  // "value"
 * console.log(obj.child.value);  // "text"
 *
 * @throws {Error} if UTF-8 decoding fails for attribute or element text
 */
export declare function xmlToJsObject(node: Node, shouldTrackOrder?: boolean): ParsedXmlObject | string | undefined;
/**
 * Converts a JavaScript object to an XML DOM Element with proper attribute and child element handling.
 *
 * This function recursively transforms a parsed XML object structure back into a DOM Element,
 * preserving attributes (via the `$` property), text content, and nested child elements.
 * It handles both simple values and complex nested structures, making it suitable for
 * serializing Visio shape data, master definitions, and other XML-based diagram components.
 *
 * The function expects objects to follow the xml2js parsing convention:
 * - Attributes are stored in a `$` property
 * - Text content is stored in a `_` property
 * - Child elements are stored as properties with their tag names as keys
 *
 * @param {ParsedXmlObject | string} jsonObject - The JavaScript object or string to convert to XML.
 *                                         If a string is provided, it becomes the text content of the element.
 * @param {string} tagName - The XML tag name for the root element being created.
 * @param {Document} [doc=document] - The DOM Document object to use for creating elements.
 *                                    Defaults to the browser's global document object.
 *
 * @returns {Element} A DOM Element representing the XML structure with all attributes,
 *                    text content, and child elements properly set.
 * @private
 */
export declare function jsObjectToXml(jsonObject: ParsedXmlObject | string, tagName: string, doc?: Document): Element;
/**
 * Serializes a JavaScript object to an XML string with optional namespace support.
 *
 * This function converts a parsed XML JavaScript object back into a well-formed XML string,
 * including XML declaration, proper namespacing, and formatted output. It's primarily used
 * for exporting Visio diagram data back to XML format during the save/export process.
 *
 * The function leverages the DOM API to ensure proper XML syntax and escaping, then
 * serializes the resulting DOM tree to a string representation. It handles:
 * - XML declaration (<?xml version="1.0" encoding="UTF-8"?>)
 * - Namespace declarations when provided
 * - Recursive conversion of nested objects and arrays
 * - Proper attribute and element formatting
 *
 * @param {ParsedXmlObject | string} jsonObject - The JavaScript object or string to serialize.
 *                                         Should follow xml2js parsing conventions with
 *                                         `$` for attributes and nested elements as properties.
 * @param {string} rootTag - The root XML element tag name for the serialized output.
 * @param {string} [namespaceUri] - Optional XML namespace URI to apply to the root element.
 *                                   When provided, the root element will be created with this namespace.
 *
 * @returns {string} A complete XML string with declaration, properly formatted and escaped,
 *                   ready for file output or transmission.
 * @private
 */
export declare function serializeJsToXmlString(jsonObject: ParsedXmlObject | string, rootTag: string, namespaceUri?: string): string;
export {};
