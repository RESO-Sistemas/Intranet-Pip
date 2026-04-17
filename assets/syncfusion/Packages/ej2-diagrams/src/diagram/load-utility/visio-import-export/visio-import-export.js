var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DiagramConstraints, DiagramEvent, SnapConstraints } from '../../enum/enum';
import { bindVisioConnectors, VisioConnections, VisioConnector } from './visio-connectors';
import { UNIT_CONVERSION } from './visio-constants';
import { ensureArray } from './visio-core';
import { exportToVsdxFile } from './visio-export';
import { VisioMemoryStream } from './visio-memory-stream';
import { parserVisioRelationship, parseVisioDocumentSettings, parseVisioMaster, parseVisioPage, parseVisioTheme, parseVisioWindow } from './visio-model-parsers';
import { VisioDiagramData, VisioWindow } from './visio-models';
import { parserVisioShape } from './visio-node-parser';
import { convertVisioShapeToNode } from './visio-nodes';
import { VisioPackageReader } from './visio-package-reader';
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
var ImportAndExportVisio = /** @class */ (function () {
    /**
     * Creates a new instance of the ImportAndExportVisio class.
     * Initializes the internal VisioPackageReader used for VSDX file processing.
     */
    function ImportAndExportVisio() {
        this.packageReader = new VisioPackageReader();
    }
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
    ImportAndExportVisio.prototype.exportVSDX = function (diagram, options) {
        // Create a new, clean context for this parsing operation.
        this.context = new ParsingContext(diagram);
        var args = { status: 'started' };
        this.context.triggerEvent('Export', { status: 'started' });
        // Check if export was cancelled by event handlers
        if (args.cancel) {
            return;
        }
        // Perform the actual export
        exportToVsdxFile(diagram, options);
    };
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
    ImportAndExportVisio.prototype.importVSDX = function (file, diagram, options) {
        return __awaiter(this, void 0, void 0, function () {
            var context, arrayBuffer, pageIndex, visioObj, diagramData, args, diagramJson, error_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Dispose previous context before creating new one
                        if (this.context && this.context.propertyManager) {
                            this.context.propertyManager.dispose();
                            this.context = undefined;
                        }
                        context = this.context;
                        context = new ParsingContext(diagram);
                        // Validate file parameter
                        if (!file) {
                            context.addWarning('[ERROR] :: No file provided.');
                            return [2 /*return*/, { diagramJson: '', warnings: context.getWarnings() }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        VisioMemoryStream.clear();
                        return [4 /*yield*/, this.readFileAsArrayBuffer(file)];
                    case 2:
                        arrayBuffer = _a.sent();
                        pageIndex = (options && typeof options.pageIndex === 'number') ? options.pageIndex : 0;
                        return [4 /*yield*/, this.packageReader.readPackage(arrayBuffer, context, pageIndex)];
                    case 3:
                        visioObj = _a.sent();
                        // Validate package reading
                        if (!visioObj) {
                            context.addWarning('[ERROR] :: Failed to read Visio package.');
                            return [2 /*return*/, { diagramJson: '', warnings: context.getWarnings() }];
                        }
                        // Store parsed XML structure in context for use during parsing
                        context.entries = visioObj;
                        // Store file in memory stream for use it in export
                        VisioMemoryStream.set(file.name, arrayBuffer, pageIndex);
                        return [4 /*yield*/, parseVisioData(visioObj, context)];
                    case 4:
                        diagramData = _a.sent();
                        // Step 4: Load the clean data model into the diagram
                        return [4 /*yield*/, loadVisioDataIntoDiagram(diagram, diagramData, context)];
                    case 5:
                        // Step 4: Load the clean data model into the diagram
                        _a.sent();
                        // Clear temporary data
                        diagramData.clear();
                        args = { status: 'completed', logs: context.getWarnings() };
                        context.triggerEvent('Import', args);
                        diagramJson = JSON.stringify(diagram.saveDiagram());
                        return [2 /*return*/, { diagramJson: diagramJson, warnings: context.getWarnings() }];
                    case 6:
                        error_1 = _a.sent();
                        errorMessage = error_1 instanceof Error
                            ? error_1.message
                            : 'Unknown error during VSDX import';
                        context.addWarning("[ERROR] :: " + errorMessage);
                        return [2 /*return*/, { diagramJson: '', warnings: context.getWarnings() }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
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
    ImportAndExportVisio.prototype.readFileAsArrayBuffer = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            // Called when file reading completes successfully
            reader.onload = function () {
                if (reader.result instanceof ArrayBuffer) {
                    resolve(reader.result);
                }
                else {
                    reject(new Error('Failed to read file as ArrayBuffer'));
                }
            };
            // Called if file reading fails
            reader.onerror = reject;
            // Start reading the file
            reader.readAsArrayBuffer(file);
        });
    };
    /**
     * Returns the module name.
     *
     * @protected
     * @returns {string} - The module identifier string.
     */
    ImportAndExportVisio.prototype.getModuleName = function () {
        return 'ImportAndExportVisio';
    };
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
    ImportAndExportVisio.prototype.destroy = function () {
        if (this.context && this.context.propertyManager) {
            this.context.propertyManager.dispose();
        }
    };
    return ImportAndExportVisio;
}());
export { ImportAndExportVisio };
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
var ParsingContext = /** @class */ (function () {
    /**
     * Creates a new ParsingContext for a specific Diagram instance.
     *
     * @param {Diagram} diagram - The target Diagram instance that will be populated with parsed data.
     */
    function ParsingContext(diagram) {
        /**
         * Accumulated data model for the diagram being parsed.
         * Built up during parsing and eventually loaded into the diagram.
         * @private
         * @readonly
         */
        this.data = new VisioDiagramData();
        /**
         * Shape index counter used internally during shape processing.
         * Wrapped in an object to allow mutation while maintaining readonly context.
         * @private
         */
        this.shapeIndex = { value: 0 };
        /**
         * Accumulated warning messages collected during parsing.
         * Prevents duplicate warnings.
         * @private
         */
        this.warnings = [];
        this.diagram = diagram;
    }
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
    ParsingContext.prototype.addWarning = function (message) {
        // Only add if message doesn't already exist in warnings array
        if (this.warnings.indexOf(message) === -1) {
            this.warnings.push(message);
        }
    };
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
    ParsingContext.prototype.getWarnings = function () {
        return this.warnings;
    };
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
    ParsingContext.prototype.triggerEvent = function (type, args) {
        // Attach warnings to event args if not already present
        if (!args.logs) {
            args.logs = this.getWarnings();
        }
        // Trigger appropriate diagram event
        if (type === 'Import') {
            this.diagram.triggerEvent(DiagramEvent.diagramImporting, args);
        }
        else {
            this.diagram.triggerEvent(DiagramEvent.diagramExporting, args);
        }
    };
    Object.defineProperty(ParsingContext.prototype, "currentPage", {
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
        get: function () {
            return this.data.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    return ParsingContext;
}());
export { ParsingContext };
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
export function parseVisioData(visioObj, context) {
    return __awaiter(this, void 0, void 0, function () {
        /**
         * Helper function to safely extract string attributes from objects.
         * @param {object} obj - The object to extract from
         * @param {string} name - The attribute name
         * @returns {string} - The attribute value or empty string if not found
         */
        function getAttr(obj, name) {
            if (obj && Object.prototype.hasOwnProperty.call(obj, name)) {
                var v = obj["" + name];
                if (typeof v === 'string') {
                    return v;
                }
            }
            return '';
        }
        /**
         * Helper function to extract relationship ID from a page element.
         * Handles both namespaced (r:id) and non-namespaced (rId) formats.
         * @param {VisioPage} page - The page element
         * @returns {string} - The relationship ID
         */
        function getRelId(page) {
            if (page) {
                var maybeRel = page.Rel;
                if (maybeRel && maybeRel.$) {
                    var rid = getAttr(maybeRel.$, 'r:id');
                    if (rid) {
                        return rid;
                    }
                    var ridAlt = getAttr(maybeRel.$, 'rId'); // some parsers drop namespace colon
                    if (ridAlt) {
                        return ridAlt;
                    }
                }
            }
            return '';
        }
        /**
         * Helper function to check if a target path represents a media file.
         * @param {string} target - The target file path
         * @returns {boolean} - True if target is a media file
         */
        function isMediaFile(target) {
            var mediaExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.tif', '.tiff', '.webp'];
            var lowerTarget = target.toLowerCase();
            return mediaExtensions.some(function (ext) { return lowerTarget.endsWith(ext); });
        }
        /**
         * Helper function to extract file name from a full path.
         * @param {string} target - The full file path
         * @returns {string} - The extracted file name
         */
        function extractFileName(target) {
            return target.split('/').pop() || 'unknown';
        }
        /**
         * Helper function to get MIME type from file extension.
         * @param {string} target - The file path with extension
         * @returns {string} - The appropriate MIME type
         */
        function getMimeType(target) {
            var mimeTypes = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.bmp': 'image/bmp',
                '.svg': 'image/svg+xml',
                '.tif': 'image/tiff',
                '.tiff': 'image/tiff',
                '.webp': 'image/webp'
            };
            var ext = target.substring(target.lastIndexOf('.')).toLowerCase();
            return mimeTypes["" + ext] || 'application/octet-stream';
        }
        /**
         * Helper function to convert Uint8Array to base64 data URL in browser environment.
         * Uses FileReader and Blob for conversion.
         * @async
         * @param {Uint8Array} u8 - The binary data
         * @param {string} mime - The MIME type
         * @returns {Promise<string>} - Base64-encoded string
         */
        function uint8ToBase64Browser(u8, mime) {
            return __awaiter(this, void 0, void 0, function () {
                var blob, base64;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            blob = new Blob([u8], { type: mime });
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    var reader = new FileReader();
                                    reader.onload = function () {
                                        var dataUrl = reader.result;
                                        // Extract base64 portion after the comma
                                        var base64 = dataUrl.split(',')[1];
                                        resolve(base64);
                                    };
                                    reader.onerror = reject;
                                    reader.readAsDataURL(blob);
                                })];
                        case 1:
                            base64 = _a.sent();
                            return [2 /*return*/, base64];
                    }
                });
            });
        }
        /**
         * Extracts the first 'Solid' shape from the immediate background page (if present).
         * Resolves entries.__BackgroundPageFiles[0], loads that page from entries.__Parts,
         * parses its Shapes, and returns the first VisioShape with name === 'Solid'.
         *
         * @param {VisioDocumentStructure} entries - Consolidated document structure with parts bag
         * @param {ParsingContext} parseContext - Parsing context used by parserVisioShape
         * @returns {VisioShape | null} First 'Solid' shape from background page or null
         */
        function extractImmediateBackgroundSolid(entries, parseContext) {
            // -- Guard: validate inputs --
            if (!entries || typeof entries !== 'object') {
                return null;
            }
            if (!parseContext || typeof parseContext !== 'object') {
                return null;
            }
            // -- Read __Parts safely --
            var partsDescriptor = Object.getOwnPropertyDescriptor(entries, '__Parts');
            if (!partsDescriptor || !partsDescriptor.value) {
                return null;
            }
            var partsBag = partsDescriptor.value;
            // -- Read first background page file from __BackgroundPageFiles safely --
            var backgroundFilePath = '';
            var bgListDescriptor = Object.getOwnPropertyDescriptor(entries, '__BackgroundPageFiles');
            if (bgListDescriptor && bgListDescriptor.value && Array.isArray(bgListDescriptor.value)) {
                var listUnknown = bgListDescriptor.value;
                if (listUnknown.length > 0) {
                    var firstEntry = listUnknown[0];
                    if (typeof firstEntry === 'string') {
                        backgroundFilePath = firstEntry;
                    }
                }
            }
            if (!backgroundFilePath) {
                return null;
            }
            // -- Sanitize path to avoid traversal/null-byte issues --
            if (backgroundFilePath.indexOf('..') >= 0) {
                return null;
            }
            if (backgroundFilePath.indexOf('\0') >= 0) {
                return null;
            }
            // -- Resolve the background page JS object from parts bag --
            if (!Object.prototype.hasOwnProperty.call(partsBag, backgroundFilePath)) {
                return null;
            }
            var bgPageDescriptor = Object.getOwnPropertyDescriptor(partsBag, backgroundFilePath);
            if (!bgPageDescriptor || !bgPageDescriptor.value) {
                return null;
            }
            var backgroundPageJs = bgPageDescriptor.value;
            // -- Normalize 'Shapes' to an array of ParsedXmlObject blocks --
            var rawShapesBlocks = backgroundPageJs['Shapes'];
            if (!rawShapesBlocks) {
                return null;
            }
            var shapesBlocks = Array.isArray(rawShapesBlocks)
                ? rawShapesBlocks
                : [rawShapesBlocks];
            // -- Parse each shapes block and return the first shape named 'Solid' --
            for (var i = 0; i < shapesBlocks.length; i += 1) {
                var block = shapesBlocks[parseInt(i.toString(), 10)];
                var parsedShapes = parserVisioShape(block, parseContext);
                if (parsedShapes && parsedShapes.length > 0) {
                    for (var k = 0; k < parsedShapes.length; k += 1) {
                        var candidateShape = parsedShapes[parseInt(k.toString(), 10)];
                        // -- Guard: ensure candidate has a name field before comparing --
                        if (candidateShape && candidateShape.name === 'Solid') {
                            return candidateShape;
                        }
                    }
                }
            }
            // -- Fallback: nothing found --
            return null;
        }
        var _a, _b, _c, _d, pages, matchingPages, relationArr, relations, _i, _e, relationObj, _f, _g, mediaObj, binaryKey, binaryData, binaryParts, descriptor, media, base64, currentPage_1, currentTheme, connectsArr, connections, _h, connectsArr_1, connectObj, packageFiles, selectedPageKey, selectedPageContent, descriptor, selectedPageShapesArr, shapes, backgroundSolid, _j, selectedPageShapesArr_1, shapeObj, nonEmptyShapes, connectors, _k, selectedPageShapesArr_2, connectorObj;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    // ========================================
                    // PARSE PAGES (must be done before shapes)
                    // ========================================
                    // Pages must be parsed first because other elements depend on pageHeight
                    if (visioObj.Page) {
                        pages = ensureArray(visioObj.Page);
                        matchingPages = pages.filter(function (pageEl) {
                            var pageRelId = getRelId(pageEl);
                            return pageRelId === visioObj.PageRelId;
                        });
                        // Parse each matching page
                        context.data.pages = ensureArray(matchingPages).map(function (pageEl) {
                            // Append essential attributes to PageSheet for easier access during parsing
                            var cells = ensureArray(pageEl.PageSheet.Cell);
                            cells.push({ $: { 'N': 'PageID', 'V': pageEl.$.ID } });
                            // Add BackPage attribute if present
                            if (pageEl.$.BackPage) {
                                cells.push({ $: { 'N': 'BackPage', 'V': pageEl.$.BackPage } });
                            }
                            // Add Background attribute if present
                            if (pageEl.$.Background) {
                                cells.push({ $: { 'N': 'Background', 'V': pageEl.$.Background } });
                            }
                            pageEl.PageSheet.Cell = cells;
                            return parseVisioPage(pageEl.PageSheet);
                        });
                        // Set first page as current page
                        if (context.data.pages.length > 0) {
                            context.data.currentPage = context.data.pages[0];
                        }
                    }
                    // ========================================
                    // PARSE MASTERS
                    // ========================================
                    if (visioObj.Master) {
                        context.data.masters = ensureArray(visioObj.Master).map(function (masterEl) { return parseVisioMaster(masterEl); });
                    }
                    // ========================================
                    // PARSE DOCUMENT SETTINGS
                    // ========================================
                    if (visioObj.DocumentSettings) {
                        context.data.documentSettings = parseVisioDocumentSettings(visioObj.DocumentSettings);
                    }
                    // ========================================
                    // PARSE WINDOWS
                    // ========================================
                    if (visioObj.Window) {
                        context.data.windows = ensureArray(visioObj.Window).map(function (winEl) { return parseVisioWindow(winEl); });
                    }
                    if (!visioObj.Relationship) return [3 /*break*/, 6];
                    relationArr = Array.isArray(visioObj.Relationship) ? visioObj.Relationship : [visioObj.Relationship];
                    relations = relationArr
                        .map(function (relationObj) { return parserVisioRelationship(relationObj); })
                        .filter(function (rel) { return rel !== null; });
                    (_a = context.data.relations).push.apply(_a, relations);
                    if (!context.entries.__BinaryParts) return [3 /*break*/, 6];
                    _i = 0, _e = context.data.relations;
                    _l.label = 1;
                case 1:
                    if (!(_i < _e.length)) return [3 /*break*/, 6];
                    relationObj = _e[_i];
                    _f = 0, _g = relationObj.media;
                    _l.label = 2;
                case 2:
                    if (!(_f < _g.length)) return [3 /*break*/, 5];
                    mediaObj = _g[_f];
                    if (!(mediaObj.Target && isMediaFile(mediaObj.Target))) return [3 /*break*/, 4];
                    binaryKey = mediaObj.Target;
                    if (binaryKey.startsWith('../')) {
                        // Convert relative path to absolute path within VSDX
                        binaryKey = 'visio/' + binaryKey.slice(3);
                    }
                    binaryData = void 0;
                    binaryParts = context.entries.__BinaryParts;
                    if (binaryParts && Object.prototype.hasOwnProperty.call(binaryParts, binaryKey)) {
                        descriptor = Object.getOwnPropertyDescriptor(binaryParts, binaryKey);
                        binaryData = descriptor ? descriptor.value : undefined;
                    }
                    if (!binaryData) return [3 /*break*/, 4];
                    media = {
                        id: mediaObj.Id,
                        name: extractFileName(mediaObj.Target),
                        type: getMimeType(mediaObj.Target),
                        data: binaryData
                    };
                    return [4 /*yield*/, uint8ToBase64Browser(media.data, media.type)];
                case 3:
                    base64 = _l.sent();
                    media.dataUrl = "data:" + media.type + ";base64," + base64;
                    // Store in context media collection
                    if (mediaObj && mediaObj.Id != null) {
                        context.data.medias[String(mediaObj.Id)] = media;
                    }
                    _l.label = 4;
                case 4:
                    _f++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    // ========================================
                    // PARSE THEMES
                    // ========================================
                    if (visioObj['a:themeElements']) {
                        // Parse all theme elements
                        context.data.themes = ensureArray(visioObj['a:themeElements']).map(function (themeEl) { return parseVisioTheme(themeEl, context); });
                        currentPage_1 = context.data.currentPage;
                        currentTheme = context.data.themes.find(function (theme) { return currentPage_1.theme === Number(theme.schemeEnum); });
                        context.data.currentTheme = currentTheme;
                    }
                    // ========================================
                    // PARSE CONNECTIONS
                    // ========================================
                    // Connections define which shapes are connected to connectors
                    if (visioObj.Connects && Object.keys(visioObj.Connects).length > 0) {
                        connectsArr = Array.isArray(visioObj.Connects) ? visioObj.Connects : [visioObj.Connects];
                        connections = [];
                        // Parse each connection
                        for (_h = 0, connectsArr_1 = connectsArr; _h < connectsArr_1.length; _h++) {
                            connectObj = connectsArr_1[_h];
                            connections.push.apply(connections, VisioConnections.fromJs(connectObj, context));
                        }
                        (_b = context.data.connections).push.apply(_b, connections);
                    }
                    packageFiles = (context.entries && context.entries.__Parts) ? context.entries.__Parts : {};
                    selectedPageKey = (context.entries && context.entries.__SelectedPageFile) ? String(context.entries.__SelectedPageFile) : '';
                    selectedPageContent = {};
                    if (selectedPageKey && Object.prototype.hasOwnProperty.call(packageFiles, selectedPageKey)) {
                        descriptor = Object.getOwnPropertyDescriptor(packageFiles, selectedPageKey);
                        selectedPageContent = descriptor ? descriptor.value : {};
                    }
                    selectedPageShapesArr = selectedPageContent && selectedPageContent.Shapes
                        ? (Array.isArray(selectedPageContent.Shapes) ? selectedPageContent.Shapes : [selectedPageContent.Shapes])
                        : [];
                    shapes = [];
                    backgroundSolid = extractImmediateBackgroundSolid(context.entries, context);
                    if (backgroundSolid) {
                        context.data.shapes.push(backgroundSolid);
                    }
                    // Parse only the selected page's shapes
                    for (_j = 0, selectedPageShapesArr_1 = selectedPageShapesArr; _j < selectedPageShapesArr_1.length; _j++) {
                        shapeObj = selectedPageShapesArr_1[_j];
                        shapes.push.apply(shapes, parserVisioShape(shapeObj, context));
                    }
                    nonEmptyShapes = shapes.filter(function (shape) {
                        return ((Array.isArray(shape) && shape.length > 0) ||
                            (shape && typeof shape === 'object' && Object.keys(shape).length > 0 && !Array.isArray(shape)));
                    });
                    if (nonEmptyShapes.length > 0) {
                        (_c = context.data.shapes).push.apply(_c, nonEmptyShapes);
                    }
                    // Validate at least one page exists
                    if (context.data.pages.length === 0) {
                        return [2 /*return*/, undefined];
                    }
                    connectors = [];
                    for (_k = 0, selectedPageShapesArr_2 = selectedPageShapesArr; _k < selectedPageShapesArr_2.length; _k++) {
                        connectorObj = selectedPageShapesArr_2[_k];
                        connectors.push.apply(connectors, VisioConnector.fromJs(connectorObj, context));
                    }
                    (_d = context.data.connectors).push.apply(_d, connectors);
                    return [2 /*return*/, context.data];
            }
        });
    });
}
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
export function loadVisioDataIntoDiagram(diagram, diagramData, context) {
    return __awaiter(this, void 0, void 0, function () {
        var info, shapeGroup, DPI, nonBgPages, currentPage, solidShape, defaultWindow, windowSettings, expandedSubprocess, data, activeLayer;
        return __generator(this, function (_a) {
            info = diagram.addInfo;
            // Clear existing diagram content
            diagram.clear();
            diagram.addInfo = info;
            shapeGroup = diagramData.shapes;
            // Validate that pages exist
            if (diagramData.pages.length === 0) {
                context.addWarning('[ERROR] :: No Visio pages found in the imported file.');
                return [2 /*return*/];
            }
            DPI = UNIT_CONVERSION.SCREEN_DPI;
            nonBgPages = diagramData.pages.filter(function (p) { return !p.isBackgroundPage; });
            currentPage = (nonBgPages.length > 0 ? nonBgPages : diagramData.pages)[0];
            solidShape = shapeGroup.find(function (s) { return s.name === 'Solid'; });
            defaultWindow = new VisioWindow();
            defaultWindow.windowWidth = currentPage.pageWidth * DPI;
            defaultWindow.windowHeight = currentPage.pageHeight * DPI;
            defaultWindow.showPageBreaks = false;
            defaultWindow.showGrid = false;
            defaultWindow.showGuides = false;
            defaultWindow.viewCenterX = 0;
            defaultWindow.viewCenterY = 0;
            defaultWindow.snapExtensions = 8;
            defaultWindow.snapAngles = 15;
            defaultWindow.showRulers = false;
            windowSettings = diagramData.windows.find(function (w) { return w.windowType === 'Drawing'; }) || defaultWindow;
            // Configure diagram dimensions and appearance
            diagram.backgroundColor = solidShape ? solidShape.fillColor || 'transparent' : 'transparent';
            diagram.enableConnectorSplit = true;
            // Configure page settings
            diagram.pageSettings.width = currentPage.pageWidth * DPI;
            diagram.pageSettings.height = currentPage.pageHeight * DPI;
            diagram.pageSettings.background.color = solidShape ? solidShape.fillColor || 'transparent' : 'transparent';
            diagram.pageSettings.showPageBreaks = windowSettings.showPageBreaks;
            diagram.pageSettings.orientation = currentPage.printPageOrientation === 2 ? 'Landscape' : 'Portrait';
            // Configure snap settings
            diagram.snapSettings.constraints = SnapConstraints.None;
            if (windowSettings.showGrid && (diagram.pageSettings.background.color === 'transparent')) {
                diagram.snapSettings.constraints |= SnapConstraints.ShowLines | SnapConstraints.SnapToLines;
            }
            if (windowSettings.showGuides) {
                diagram.snapSettings.constraints |= SnapConstraints.SnapToObject;
            }
            // Set snap object distance and angles
            diagram.snapSettings.snapObjectDistance = windowSettings.snapExtensions || 8;
            diagram.snapSettings.snapAngle = windowSettings.snapAngles || 15;
            // Configure bridging (line jumps)
            setBridgingConstraints(diagram, currentPage, context);
            // Configure ruler settings
            diagram.rulerSettings.showRulers = windowSettings.showRulers || false;
            diagram.rulerSettings.dynamicGrid = diagramData.documentSettings ? diagramData.documentSettings.dynamicGridEnabled : false;
            // Configure scroll settings
            diagram.scrollSettings.horizontalOffset = windowSettings.viewCenterX || 0;
            diagram.scrollSettings.verticalOffset = windowSettings.viewCenterY || 0;
            diagram.scrollSettings.viewPortWidth = windowSettings.windowWidth || 0;
            diagram.scrollSettings.viewPortHeight = windowSettings.windowHeight || 0;
            // Configure layers
            diagram.layers = currentPage.layers.map(function (layer, i) { return ({
                id: layer.name || "layer" + i,
                visible: layer.visible,
                lock: layer.lock,
                zIndex: i,
                objects: layer.objects
            }); });
            expandedSubprocess = diagramData.expandedSubprocessCollection;
            // Process shapes and add to diagram
            if (shapeGroup && Array.isArray(shapeGroup) && shapeGroup.length > 0) {
                // Process expanded subprocesses first (for BPMN hierarchy)
                expandedSubprocess.forEach(function (subprocessID) {
                    processExpandedSubprocesses(subprocessID, shapeGroup, context);
                });
                // Convert each shape to a node and add to diagram
                shapeGroup.forEach(function (shapeItem) {
                    if (shapeItem.name !== 'Solid') {
                        var isGroup = Array.isArray(shapeItem.children) && shapeItem.children.length > 0;
                        var shapeType = shapeItem.shape ? shapeItem.shape.type : undefined;
                        var isBlockedBpmnPart = shapeType === 'Member' || shapeType === 'Separator';
                        // Allow groups OR any non-blocked normal shape
                        if (isGroup || !isBlockedBpmnPart) {
                            // Convert Visio shape to Syncfusion node
                            var node = convertVisioShapeToNode(shapeItem, context, shapeGroup);
                            // Log warning for BPMN shapes (visual differences expected)
                            if (shapeType && node.shape.type === 'Bpmn') {
                                context.addWarning('[WARNING] :: BPMN shapes visually differ from visio.');
                            }
                            // Add node to diagram
                            diagram.nodes.push(node);
                        }
                    }
                });
            }
            // Add connectors to diagram
            if (diagramData.connectors && diagramData.connectors.length > 0) {
                diagramData.connectors.forEach(function (connector) {
                    // Skip empty connector objects
                    if (connector && Object.keys(connector).length > 0) {
                        // Bind Visio connector to Syncfusion format
                        var conn = bindVisioConnectors(connector, context);
                        diagram.connectors.push(conn);
                    }
                });
            }
            // Add warning about gradient limitations
            context.addWarning('[WARNING] :: Gradients are only supported on connector decorators, not the full connector path.');
            data = diagram.saveDiagram();
            VisioMemoryStream.isClearVisio = false;
            diagram.loadDiagram(data);
            VisioMemoryStream.isClearVisio = true;
            activeLayer = currentPage.layers.find(function (l) { return l.active; });
            if (activeLayer && activeLayer.name) {
                diagram.setActiveLayer(activeLayer.name);
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Processes expanded BPMN subprocesses and updates parent-child relationships.
 * Handles hierarchical subprocess structures and calculates child margins.
 *
 * @private
 * @param {string} parentId - The ID of the parent subprocess shape
 * @param {VisioShape[]} shapeGroup - Array of all shapes in the diagram
 * @param {ParsingContext} context - Parsing context for logging
 * @returns {void}
 *
 * @remarks
 * Algorithm:
 * 1. Finds the parent subprocess by ID
 * 2. Validates that it's a BPMN expanded subprocess
 * 3. Filters out grandchildren to keep only immediate children
 * 4. Calculates margin positions for each child relative to parent
 *
 * This ensures proper hierarchy display for nested BPMN processes.
 *
 * @example
 * ```typescript
 * processExpandedSubprocesses('shape1', shapes, context);
 * // Updates shape1's child processes and calculates their margins
 * ```
 */
function processExpandedSubprocesses(parentId, shapeGroup, context) {
    // Validate parameters
    if (!parentId || !Array.isArray(shapeGroup) || shapeGroup.length === 0) {
        return;
    }
    // Cache for shape lookups to improve performance
    var cache = {};
    /**
     * Helper function to find shape by ID with caching
     * @param {string} id - The shape ID to find
     * @returns {VisioShapeData} The found shape or undefined
     */
    var findById = function (id) {
        if (cache["" + id]) {
            return cache["" + id];
        }
        var found = shapeGroup.find(function (s) { return s && String(s.id) === id; });
        if (found) {
            cache["" + id] = found;
        }
        return found;
    };
    // Find parent shape
    var parent = findById(parentId);
    if (!parent) {
        return;
    }
    // Validate parent is a BPMN expanded subprocess
    var isBpmn = parent.shape && parent.shape.type === 'Bpmn';
    var isExpanded = !!(parent.shape && parent.shape.activity
        && parent.shape.activity.subProcess);
    if (!isBpmn || !isExpanded) {
        return;
    }
    // Get original child list
    var originalChildren = (parent.shape.activity.subProcess.processes || []).slice();
    if (originalChildren.length === 0) {
        return;
    }
    // Convert parent dimensions from inches to pixels
    var parentPxW = parent.width * UNIT_CONVERSION.SCREEN_DPI;
    var parentPxH = parent.height * UNIT_CONVERSION.SCREEN_DPI;
    // Calculate parent position in pixels
    var parentLeft = (parent.offsetX * UNIT_CONVERSION.SCREEN_DPI) - parentPxW / 2;
    var parentTop = parent.offsetY - parentPxH / 2;
    // Find all grandchildren to exclude from immediate children
    var grandchildrenSet = new Set();
    originalChildren.forEach(function (childId) {
        var child = findById(childId);
        if (child && child.shape && child.shape.activity
            && child.shape.activity.subProcess) {
            // Collect all grandchildren
            (child.shape.activity.subProcess.processes
                || []).forEach(function (gcId) { return grandchildrenSet.add(String(gcId)); });
        }
    });
    // Filter to get only immediate children (exclude grandchildren and connectors)
    var immediateChildIDs = originalChildren.filter(function (childId) {
        var child = findById(childId);
        return child !== undefined && !grandchildrenSet.has(String(childId));
    });
    parent.shape.activity.subProcess.processes = immediateChildIDs;
    // Calculate margins for each immediate child
    immediateChildIDs.forEach(function (childId) {
        var child = findById(childId);
        if (child) {
            // Convert child dimensions from inches to pixels
            var childPxW = child.width * UNIT_CONVERSION.SCREEN_DPI;
            var childPxH = child.height * UNIT_CONVERSION.SCREEN_DPI;
            // Calculate child position in pixels
            var childLeft = (child.offsetX * UNIT_CONVERSION.SCREEN_DPI) - childPxW / 2;
            var childTop = child.offsetY - childPxH / 2;
            // Calculate margin relative to parent
            child.calculatedMargin = {
                left: childLeft - parentLeft,
                top: childTop - parentTop
            };
        }
    });
}
/**
 * Helper function to set bridging constraints on the diagram.
 * Configures line jump (bridging) behavior based on Visio page settings.
 *
 * @private
 * @param {Diagram} diagram - The diagram instance to configure
 * @param {VisioPage} page - The Visio page containing bridging settings
 * @param {ParsingContext} context - Parsing context for logging warnings
 * @returns {void}
 *
 * @remarks
 * Line bridging (line jumps) allows connector lines to display bridges where they cross.
 * - Value 0: No bridging
 * - Value 1: Top bridging style
 * - Value 2: Left bridging style
 *
 * Note: Syncfusion only supports arc style with horizontal/top directions.
 * Other Visio bridging styles are approximated.
 *
 * @example
 * ```typescript
 * setBridgingConstraints(diagram, page, context);
 * // Enables bridging if page.bridging !== 0
 * ```
 */
function setBridgingConstraints(diagram, page, context) {
    // Get line jump value from page
    var lineJumpValue = page.bridging;
    // Apply bridging if enabled
    if (lineJumpValue !== 0) {
        // Add warning about limited bridging support
        context.addWarning('[WARNING] :: Only arc line jump style is supported.');
        context.addWarning('[WARNING] :: Only horizontal line jumps are supported.');
        // Enable bridging constraint on diagram
        diagram.constraints |= DiagramConstraints.Bridging;
        // Set bridge direction based on line jump value
        // 2 = Left, otherwise = Top
        diagram.bridgeDirection = lineJumpValue === 2 ? 'Left' : 'Top';
    }
}
