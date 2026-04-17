/**
 * A minimal ZIP archive writer for creating VSDX (Visio) files.
 * Implements the ZIP file format specification (RFC 1952) to package XML files and binary data.
 *
 * Features:
 * - Adds files (text or binary) to an in-memory ZIP archive
 * - Generates complete ZIP file structure with proper headers
 * - Supports uncompressed (stored) files only
 * - Compatible with standard ZIP readers and VSDX format
 *
 * ZIP Structure Created:
 * 1. Local file headers + file data (one per file)
 * 2. Central directory entries (one per file)
 * 3. End of Central Directory (EOCD) record
 *
 * Limitations:
 * - Only supports stored (uncompressed) files (compression method 0)
 * - Does not calculate CRC-32 checksums
 * - Single-disk archive only (no multi-disk support)
 * - No encryption or digital signatures
 * - Files are not actually compressed
 *
 * @example
 * const writer = new MinimalZipWriter();
 * writer.addFile('document.xml', '<root>content</root>');
 * writer.addFile('styles.xml', xmlData);
 * const zipBuffer = writer.generate();
 * const blob = new Blob([zipBuffer], { type: 'application/zip' });
 *
 * @see {@link MinimalZipReader} for reading ZIP files
 */
export declare class MinimalZipWriter {
    /**
     * Array of files to be included in the ZIP archive.
     * Each entry contains filename and uncompressed binary data.
     *
     * @private
     * @type {Array<{name: string, data: Uint8Array}>}
     */
    private files;
    /**
     * Byte offset where the central directory starts in the final ZIP file.
     * Calculated after all local headers and file data are written.
     * This value is stored in the EOCD record so readers can locate the central directory.
     *
     * @private
     * @type {number}
     */
    private centralDirOffset;
    /**
     * The date/time to use for all files in the archive.
     * Stored in DOS date/time format in file headers.
     * All files share the same timestamp (file creation time).
     *
     * @private
     * @type {Date}
     */
    private date;
    /**
     * Creates a new MinimalZipWriter instance.
     * Initializes an empty archive that is ready to accept files.
     *
     * @constructor
     *
     * @example
     * const writer = new MinimalZipWriter();
     */
    constructor();
    /**
     * Adds a file to the ZIP archive.
     * Accepts either text (string) or binary (Uint8Array) data.
     * Text data is automatically converted to UTF-8 bytes.
     *
     * Algorithm:
     * 1. Convert string data to Uint8Array using TextEncoder (UTF-8)
     * 2. Create file entry object with name and data
     * 3. Store in files array for later processing during generate()
     *
     * Notes:
     * - Files are stored in order they are added
     * - Filenames can include path separators (/) for directory structure
     * - No duplicate checking - same filename can be added multiple times
     * - Data is copied into Uint8Array so original can be garbage collected
     *
     * @private
     * @param {string} filename - The path/name of the file in the archive
     *                            Can include path separators for nested files
     *                            Example: "folder/document.xml", "xl/sheets/sheet1.xml"
     * @param {Uint8Array | string} data - The file content as either:
     *                                      - Uint8Array: Binary data (no conversion)
     *                                      - string: Text data (converted to UTF-8 bytes)
     * @returns {void}
     *
     * @example
     * const writer = new MinimalZipWriter();
     * writer.addFile('document.xml', '<root>Hello</root>');
     * writer.addFile('image.bin', imageBuffer);
     * writer.addFile('folder/nested.txt', 'nested content');
     *
     * @throws Does not throw - silently handles any encoding issues
     */
    addFile(filename: string, data: Uint8Array | string): void;
    /**
     * Generates the complete ZIP archive as an ArrayBuffer.
     * Constructs the entire ZIP file structure including all headers and data.
     *
     * Algorithm:
     * 1. For each file:
     *    a. Create local file header (30 bytes fixed + filename)
     *    b. Add file data
     *    c. Create central directory entry
     * 2. Calculate offset where central directory starts
     * 3. Add all central directory entries
     * 4. Create and add End of Central Directory (EOCD) record
     * 5. Combine all byte arrays into single Uint8Array
     *
     * ZIP File Structure:
     * ```
     * [Local File Header 1][File Data 1][Local File Header 2][File Data 2]...
     * [Central Directory Entry 1][Central Directory Entry 2]...
     * [End of Central Directory Record]
     * ```
     *
     * Offsets:
     * - Local headers start at byte 0
     * - Central directory starts after all local headers and file data
     * - EOCD record appears at the very end
     *
     * @private
     * @returns {ArrayBuffer} The complete ZIP archive as an ArrayBuffer
     *                        Can be converted to Blob for download:
     *                        new Blob([buffer], {type: 'application/zip'})
     *
     * @example
     * const writer = new MinimalZipWriter();
     * writer.addFile('file1.txt', 'content1');
     * writer.addFile('file2.txt', 'content2');
     * const buffer = writer.generate();
     *
     * // Save to file (browser)
     * const blob = new Blob([buffer], {type: 'application/zip'});
     * const url = URL.createObjectURL(blob);
     * const a = document.createElement('a');
     * a.href = url;
     * a.download = 'archive.zip';
     * a.click();
     *
     * // Or send to server
     * fetch('/upload', {method: 'POST', body: blob});
     */
    generate(): ArrayBuffer;
    /**
     * Creates a local file header for a file in the ZIP archive.
     * Local file headers appear before each file's data and contain metadata.
     *
     * Local File Header Structure (30 bytes fixed + variable):
     * - Offset 0: Local file header signature (4 bytes) = 0x04034B50
     * - Offset 4: Version needed to extract (2 bytes)
     * - Offset 6: General purpose bit flag (2 bytes)
     * - Offset 8: Compression method (2 bytes) [0=stored, 8=deflate]
     * - Offset 10: Last mod file time (2 bytes) [DOS format]
     * - Offset 12: Last mod file date (2 bytes) [DOS format]
     * - Offset 14: CRC-32 (4 bytes)
     * - Offset 18: Compressed size (4 bytes)
     * - Offset 22: Uncompressed size (4 bytes)
     * - Offset 26: Filename length (2 bytes)
     * - Offset 28: Extra field length (2 bytes)
     * - Offset 30: Filename (variable)
     * - After: Extra field (variable)
     *
     * This implementation:
     * - Uses stored method (no compression)
     * - Sets CRC-32 to 0 (not calculated)
     * - Sets both compressed and uncompressed sizes to data.length
     * - Uses DOS date/time format
     *
     * @private
     * @param {Uint8Array} filenameBytes - The filename encoded as UTF-8 bytes
     * @param {Uint8Array} data - The uncompressed file data
     * @returns {Uint8Array} Complete local file header including filename
     *                       Total length = 30 + filenameBytes.length
     *
     * @example
     * const filename = new TextEncoder().encode('document.xml');
     * const fileData = new Uint8Array([...]);
     * const header = this.createLocalFileHeader(filename, fileData);
     * // header.length = 30 + filename.length
     *
     */
    private createLocalFileHeader;
    /**
     * Creates a central directory entry for a file in the ZIP archive.
     * Central directory entries are used by ZIP readers to locate and list files.
     * One entry exists for each file in the archive.
     *
     * Central Directory Header Structure (46 bytes fixed + variable):
     * - Offset 0: Central directory header signature (4 bytes) = 0x02014B50
     * - Offset 4: Version made by (2 bytes)
     * - Offset 6: Version needed to extract (2 bytes)
     * - Offset 8: General purpose bit flag (2 bytes)
     * - Offset 10: Compression method (2 bytes)
     * - Offset 12: Last mod file time (2 bytes) [DOS format]
     * - Offset 14: Last mod file date (2 bytes) [DOS format]
     * - Offset 16: CRC-32 (4 bytes)
     * - Offset 20: Compressed size (4 bytes)
     * - Offset 24: Uncompressed size (4 bytes)
     * - Offset 28: Filename length (2 bytes)
     * - Offset 30: Extra field length (2 bytes)
     * - Offset 32: File comment length (2 bytes)
     * - Offset 34: Disk number start (2 bytes)
     * - Offset 36: Internal file attributes (2 bytes)
     * - Offset 38: External file attributes (4 bytes)
     * - Offset 42: Relative offset of local header (4 bytes)
     * - Offset 46: Filename (variable)
     * - After: Extra field (variable)
     * - After: File comment (variable)
     *
     * The central directory allows ZIP readers to:
     * - List all files without scanning entire archive
     * - Jump directly to any file using local header offset
     * - Verify file integrity
     *
     * @private
     * @param {Uint8Array} filenameBytes - The filename encoded as UTF-8 bytes
     * @param {Uint8Array} data - The file data (used to calculate sizes)
     * @param {number} offset - Byte offset where this file's local header is located
     *                         This allows readers to jump directly to the file
     * @returns {Uint8Array} Complete central directory entry including filename
     *                       Total length = 46 + filenameBytes.length
     *
     * @example
     * const filename = new TextEncoder().encode('document.xml');
     * const fileData = new Uint8Array([...]);
     * const entry = this.createCentralDirEntry(filename, fileData, 1024);
     * // Creates entry pointing to local header at byte 1024
     *
     */
    private createCentralDirEntry;
    /**
     * Creates the End of Central Directory (EOCD) record for the ZIP archive.
     * This is the last record in a ZIP file and must be found by ZIP readers.
     * EOCD tells readers where the central directory is located.
     *
     * End of Central Directory Structure (22 bytes fixed + comment):
     * - Offset 0: EOCD signature (4 bytes) = 0x06054B50
     * - Offset 4: Number of this disk (2 bytes)
     * - Offset 6: Disk where central directory starts (2 bytes)
     * - Offset 8: Number of central dir records on this disk (2 bytes)
     * - Offset 10: Total number of central dir records (2 bytes)
     * - Offset 12: Size of central directory (4 bytes)
     * - Offset 16: Offset of start of central directory (4 bytes)
     * - Offset 20: Comment length (2 bytes)
     * - Offset 22: Comment (variable, 0 bytes in this implementation)
     *
     * The EOCD record is critical:
     * - ZIP readers search backwards from end of file to find this
     * - Must be within last 65557 bytes (65535 + 22) due to max comment length
     * - Provides all info needed to locate and read the archive
     *
     * @private
     * @param {number} entries - The total number of files in the archive
     *                          Must match count of central directory entries
     * @param {number} cdOffset - Byte offset where central directory starts
     *                           Allows ZIP readers to locate the directory
     * @param {number} cdSize - Total size of central directory in bytes
     *                         Sum of all central directory entry sizes
     * @returns {Uint8Array} The EOCD record (exactly 22 bytes, no comment)
     *
     * @example
     * const eocd = this.createEndOfCentralDirRecord(5, 10240, 250);
     * // Creates EOCD for archive with 5 files
     * // Central directory starts at byte 10240 and is 250 bytes long
     *
     */
    private createEndOfCentralDirRecord;
    /**
     * Converts a JavaScript Date object to DOS time format.
     * DOS time format encodes hours, minutes, and seconds in a 16-bit value.
     *
     * DOS Time Format:
     * - Bits 15-11: Hours (0-23) = 5 bits
     * - Bits 10-5: Minutes (0-59) = 6 bits
     * - Bits 4-0: Seconds/2 (0-29, represents 0-58 seconds) = 5 bits
     * Total: 16 bits
     *
     * Encoding Logic:
     * - Hours shifted left 11 positions (bits 15-11)
     * - Minutes shifted left 5 positions (bits 10-5)
     * - Seconds divided by 2 (DOS only has 2-second precision)
     *
     * Example:
     * - Time 14:30:45 (2:30:45 PM)
     * - Hours: 14 << 11 = 0xB800
     * - Minutes: 30 << 5 = 0x03C0
     * - Seconds: 45 >> 1 = 22 = 0x0016
     * - Result: 0xBBD6
     *
     * @private
     * @param {Date} date - The JavaScript Date object to convert
     * @returns {number} 16-bit DOS time value (little-endian format)
     *
     * @example
     * const date = new Date(2024, 0, 15, 14, 30, 45);
     * const dosTime = this.dosTime(date);
     * // Returns DOS time encoding 14:30:45
     *
     */
    private dosTime;
    /**
     * Converts a JavaScript Date object to DOS date format.
     * DOS date format encodes year, month, and day in a 16-bit value.
     *
     * DOS Date Format:
     * - Bits 15-9: Year (0-127, relative to 1980) = 7 bits
     * - Bits 8-5: Month (1-12) = 4 bits
     * - Bits 4-0: Day (1-31) = 5 bits
     * Total: 16 bits
     *
     * Encoding Logic:
     * - Year: subtract 1980 from actual year, then shift left 9
     * - Month: no adjustment needed (1-12), shift left 5
     * - Day: no adjustment needed (1-31)
     *
     * Year Range:
     * - Supports years 1980 to 2107 (1980 + 127)
     * - Values 0-127 represent 1980-2107
     * - Cannot represent dates before 1980
     *
     * Example:
     * - Date: January 15, 2024
     * - Year: 2024 - 1980 = 44, 44 << 9 = 0x5600
     * - Month: 1 << 5 = 0x0020
     * - Day: 15 = 0x000F
     * - Result: 0x562F
     *
     * @private
     * @param {Date} date - The JavaScript Date object to convert
     * @returns {number} 16-bit DOS date value (little-endian format)
     *
     * @example
     * const date = new Date(2024, 0, 15);  // January 15, 2024
     * const dosDate = this.dosDate(date);
     * // Returns DOS date encoding 2024-01-15
     *
     */
    private dosDate;
}
