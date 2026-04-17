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
import { ensureArray, isObject, hasKey } from './visio-core';
import { VisioPropertiesManager } from './visio-theme';
import { MinimalZipReader, xmlToJsObject } from './zipReader';
/**
 * Resolves a relationship Target into a canonical ZIP path.
 *
 * Normalizes slashes, trims leading slashes, and resolves "." and ".." segments
 * against the given base directory using a stack-based algorithm. Preserves paths
 * already under "visio/" as-is.
 *
 * This function is essential for resolving relative relationship targets in OPC
 * (Open Packaging Convention) packages, ensuring all paths are canonical and
 * normalized to use forward slashes.
 *
 * @param {string} baseDir - The base directory path for relative resolution (e.g., "visio/pages").
 *                           Should not have a trailing slash.
 * @param {string} target - The relationship target path to normalize (e.g., "../masters/master1.xml").
 *                          May be relative (../, ./), absolute under visio/, or a direct file reference.
 * @returns {string} The canonical ZIP path (e.g., "visio/masters/master1.xml").
 *
 * @example
 * normalizeZipPath("visio/pages", "../masters/master1.xml")
 * // Returns: "visio/masters/master1.xml"
 *
 * normalizeZipPath("visio/pages/_rels", "../page1.xml.rels")
 * // Returns: "visio/pages/page1.xml.rels"
 *
 * @private
 */
function normalizeZipPath(baseDir, target) {
    // ==================== Normalize Base Directory ====================
    // Remove backslashes, leading/trailing slashes to create clean base path
    var base = baseDir.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+$/, '');
    // ==================== Normalize Target ====================
    // Remove backslashes and leading slashes from target
    var t = target.replace(/\\/g, '/').replace(/^\/+/, '');
    // ==================== Already Absolute ====================
    // If target already starts with "visio/", return as-is (absolute path in archive)
    if (/^visio\//i.test(t)) {
        return t;
    }
    // ==================== Build Stack for Path Resolution ====================
    // Split base into segments and filter empty strings
    var stack = base.split('/').filter(function (s) { return !!s; });
    // Split target into segments and filter empty strings
    var parts = t.split('/').filter(function (s) { return !!s; });
    // ==================== Process Path Segments ====================
    // Process each segment in target, handling . and .. navigation
    for (var i = 0; i < parts.length; i += 1) {
        var p = parts[parseInt(i.toString(), 10)];
        // Current directory reference - skip
        if (p === '.') {
            continue;
        }
        // Parent directory reference - pop from stack if available
        if (p === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        }
        // Regular segment - push onto stack
        else {
            stack.push(p);
        }
    }
    // ==================== Return Canonical Path ====================
    return stack.join('/');
}
/**
 * Returns the parent directory of a normalized ZIP path.
 *
 * Extracts the directory portion of a given path by finding the last forward slash.
 * Assumes input is already normalized (forward slashes, no trailing slash).
 *
 * @param {string} path - The normalized ZIP path (e.g., "visio/pages/page1.xml").
 *                        Should use forward slashes and not have trailing slash.
 * @returns {string} The parent directory path (e.g., "visio/pages").
 *                   Returns empty string if no directory separator found.
 *
 * @example
 * dirname("visio/pages/page1.xml") // Returns: "visio/pages"
 * dirname("visio/document.xml")    // Returns: "visio"
 * dirname("file.xml")              // Returns: ""
 *
 * @private
 */
function dirname(path) {
    // ==================== Normalize Path ====================
    // Convert backslashes to forward slashes and remove trailing slashes
    var norm = path.replace(/\\/g, '/').replace(/\/+$/, '');
    // ==================== Find Last Directory Separator ====================
    // Search for last forward slash to find directory boundary
    var idx = norm.lastIndexOf('/');
    // ==================== Return Result ====================
    // If no separator found, return empty string (root level)
    // Otherwise return everything up to (but not including) the last separator
    return idx === -1 ? '' : norm.slice(0, idx);
}
/**
 * Safely extracts the list of Page entries from a parsed pages.xml object.
 *
 * The parsed pages.xml may have different structures depending on the XML parser:
 * - Root structure: { Pages: { Page: [...] } }
 * - Flattened structure: { Page: [...] }
 * - Empty/missing: { }
 *
 * This function handles all variants and returns a consistent array.
 *
 * @param {ParsedXmlObject} pagesJsObj - The parsed pages.xml as a JavaScript object.
 *                                       Expected to have Pages element containing Page children.
 * @returns {VisioPageMetadata[]} An array of page metadata entries or empty array if none found.
 *                                Each entry represents a page index record with $ attributes.
 *
 * @example
 * const pages = getPagesArray(parsedPagesXml);
 * pages.forEach(page => {
 *     console.log(page.$.ID); // Page ID
 *     console.log(page.$.Name); // Page name
 * });
 *
 * @private
 */
function getPagesArray(pagesJsObj) {
    // ==================== Extract Pages Root ====================
    // Start with the object, then drill down to Pages if it exists
    var pagesRoot = pagesJsObj;
    if (hasKey(pagesJsObj, 'Pages')) {
        pagesRoot = pagesJsObj['Pages'];
    }
    // ==================== Extract Page Elements ====================
    // Look for Page element(s) within the root
    var pageNode = undefined;
    if (hasKey(pagesRoot, 'Page')) {
        pageNode = pagesRoot['Page'];
    }
    // ==================== Return Array ====================
    // ensureArray converts single items to [item] and handles undefined
    return ensureArray(pageNode ? pageNode : []);
}
/**
 * Safely extracts the list of Relationship entries from a parsed .rels XML file.
 *
 * The parsed .rels file may have different structures:
 * - Root structure: { Relationships: { Relationship: [...] } }
 * - Flattened structure: { Relationship: [...] }
 * - Empty/missing: { }
 *
 * This function handles all variants and returns a consistent array.
 *
 * @param {ParsedXmlObject} relsJsObj - The parsed .rels file as a JavaScript object.
 *                                      Expected to have Relationships element with Relationship children.
 * @returns {XmlRelationship[]} An array of relationship entries or empty array if none found.
 *                              Each entry has $ attributes with Id, Type, Target, etc.
 *
 * @example
 * const relationships = getRelationshipsArray(parsedRelsXml);
 * relationships.forEach(rel => {
 *     console.log(rel.$.Id);     // Relationship ID
 *     console.log(rel.$.Target); // Target file path
 * });
 *
 * @private
 */
function getRelationshipsArray(relsJsObj) {
    // ==================== Extract Relationships Root ====================
    // Start with the object, then drill down to Relationships if it exists
    var relsRoot = relsJsObj;
    if (hasKey(relsJsObj, 'Relationships')) {
        relsRoot = relsJsObj['Relationships'];
    }
    // ==================== Extract Relationship Elements ====================
    // Look for Relationship element(s) within the root
    var relNode = undefined;
    if (hasKey(relsRoot, 'Relationship')) {
        relNode = relsRoot['Relationship'];
    }
    // ==================== Return Array ====================
    // ensureArray converts single items to [item] and handles undefined
    return ensureArray(relNode ? relNode : []);
}
/**
 * Finds a ZIP entry by exact path name.
 *
 * Performs a linear search through the entries array to locate a matching path.
 * This is a simple utility for locating ZIP file entries by their exact names.
 *
 * @param {ZipEntry[]} entries - The array of available ZIP entries to search through.
 * @param {string} path - The exact path to search for (e.g., "visio/pages/pages.xml").
 *                        Must match exactly (case-sensitive).
 * @returns {ZipEntry | undefined} The matching ZipEntry if found, undefined otherwise.
 *
 * @example
 * const entry = findEntry(zipEntries, "visio/document.xml");
 * if (entry) {
 *     const data = await zip.extract(entry);
 * }
 *
 * @private
 */
function findEntry(entries, path) {
    // ==================== Linear Search ====================
    // Iterate through entries looking for exact path match
    for (var i = 0; i < entries.length; i += 1) {
        var e = entries[parseInt(i.toString(), 10)];
        if (e.name === path) {
            return e;
        }
    }
    // ==================== Not Found ====================
    return undefined;
}
/**
 * Traverses OPC (Open Packaging Convention) relationships and collects dependent parts.
 *
 * Performs a breadth-first search starting from a .rels file, with a maximum depth limit
 * to prevent runaway inclusion and infinite loops. This function only collects targets
 * under "visio/" directory and ignores external parts. For each discovered part, if a
 * sibling .rels file exists, it is queued for traversal.
 *
 * The traversal follows the OPC package model where relationships define dependencies
 * between parts, allowing discovery of all transitively required XML parts like themes,
 * masters, fonts, and data parts.
 *
 * @param {MinimalZipReader} zip - The ZIP reader instance for extracting and parsing .rels files.
 * @param {ZipEntry[]} visioEntries - All "visio/" entries available in the VSDX archive.
 *                                    Used to check for existence before adding to results.
 * @param {string} startRelsPath - The starting relationships part path to traverse from
 *                                (e.g., "visio/pages/_rels/page1.xml.rels").
 * @param {number} maxDepth - Maximum relationship nesting depth to traverse (e.g., 3).
 *                            Prevents infinite recursion and controls inclusion depth.
 * @param {ParsingContext} context - Parser context for collecting non-fatal warnings.
 *                                   Used to log parsing failures and missing relationships.
 * @returns {Promise<Set<string>>} A Promise resolving to a Set of canonical ZIP paths discovered
 *                                 during breadth-first traversal. Paths are normalized and
 *                                 only include entries that exist in visioEntries.
 *
 * @example
 * const deps = await collectDependencies(
 *     zip,
 *     visioEntries,
 *     "visio/pages/_rels/page1.xml.rels",
 *     3,
 *     context
 * );
 * // Returns Set containing paths like "visio/theme/theme1.xml", "visio/masters/master1.xml"
 *
 * @private
 */
function collectDependencies(zip, visioEntries, startRelsPath, maxDepth, context) {
    return __awaiter(this, void 0, void 0, function () {
        var toVisit, visitedRels, collected, item, relsPath, depth, relsEntry, relsJs, data, text, doc, _e_1, rels, baseDir, i, rel, resolved, partEntry, split, base, file, relsCandidate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toVisit = [{ relsPath: startRelsPath, depth: 0 }];
                    visitedRels = new Set();
                    collected = new Set();
                    _a.label = 1;
                case 1:
                    if (!(toVisit.length > 0)) return [3 /*break*/, 6];
                    item = toVisit.shift();
                    if (!item) {
                        return [3 /*break*/, 6];
                    }
                    relsPath = item.relsPath;
                    depth = item.depth;
                    // ==================== Skip if Already Visited ====================
                    // Prevent reprocessing the same .rels file
                    if (visitedRels.has(relsPath)) {
                        return [3 /*break*/, 1];
                    }
                    visitedRels.add(relsPath);
                    relsEntry = findEntry(visioEntries, relsPath);
                    if (!relsEntry) {
                        return [3 /*break*/, 1];
                    }
                    relsJs = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, zip.extract(relsEntry)];
                case 3:
                    data = _a.sent();
                    text = new TextDecoder('utf-8').decode(data);
                    doc = new DOMParser().parseFromString(text, 'text/xml');
                    // Convert DOM to JS object
                    relsJs = xmlToJsObject(doc.documentElement);
                    return [3 /*break*/, 5];
                case 4:
                    _e_1 = _a.sent();
                    // Log non-fatal parsing error and continue with next item
                    context.addWarning('[ERROR] :: Failed to parse relationships: ' + relsPath);
                    return [3 /*break*/, 1];
                case 5:
                    rels = getRelationshipsArray(relsJs);
                    baseDir = dirname(relsPath).replace(/\/_rels$/, '');
                    // ==================== Process Each Relationship ====================
                    for (i = 0; i < rels.length; i += 1) {
                        rel = rels[parseInt(i.toString(), 10)];
                        // Skip invalid relationships
                        if (!rel || !rel.$ || typeof rel.$.Target !== 'string') {
                            continue;
                        }
                        resolved = normalizeZipPath(baseDir, rel.$.Target);
                        // ==================== Filter to Visio Parts Only ====================
                        // Only include parts under visio/ directory (exclude external parts and not selected page)
                        if (!/^visio\//i.test(resolved) || /(?:^|\/)page\d+\.xml$/i.test(resolved)) {
                            continue;
                        }
                        partEntry = findEntry(visioEntries, resolved);
                        if (partEntry) {
                            collected.add(resolved);
                            // ==================== Queue .rels Traversal ====================
                            // If depth limit not reached, traverse this part's .rels file if it exists
                            if (depth < maxDepth) {
                                split = resolved.split('/');
                                base = split.slice(0, split.length - 1).join('/');
                                file = split[split.length - 1] || '';
                                relsCandidate = base + '/_rels/' + file + '.rels';
                                // Queue for traversal if it exists
                                if (findEntry(visioEntries, relsCandidate)) {
                                    toVisit.push({ relsPath: relsCandidate, depth: depth + 1 });
                                }
                            }
                        }
                    }
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, collected];
            }
        });
    });
}
/**
 * Safely gets a string attribute from an object.
 *
 * @param {ParsedXmlObject | undefined} obj - The object to get attribute from.
 * @param {string} name - The attribute name.
 * @returns {string} The attribute value or empty string if not found.
 * @private
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
 * Gets a string attribute and converts to lowercase.
 *
 * @param {object} obj - The object to get attribute from.
 * @param {string} name - The attribute name.
 * @returns {string} The lowercased attribute value or empty string.
 * @private
 */
function getAttrLower(obj, name) {
    var val = getAttr(obj, name);
    return val.toLowerCase();
}
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
export function isBackground(page) {
    var attrs = page.$;
    var bgFlag = getAttrLower(attrs, 'Background');
    var bgPageFlag = getAttrLower(attrs, 'BackgroundPage');
    return bgFlag === '1' || bgFlag === 'true' || bgPageFlag === '1' || bgPageFlag === 'true';
}
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
var VisioPackageReader = /** @class */ (function () {
    function VisioPackageReader() {
        // Task #1004826: Force-include additional parts (e.g., background page contents).
        // Set keeps it deduped and fast to check.
        this.extraIncludeParts = new Set();
        // Tracks the immediate background page files for the currently selected page
        this.currentBackgroundFiles = [];
    }
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
    VisioPackageReader.prototype.readPackage = function (arrayBuffer, context, pageIndex, retrieval) {
        if (pageIndex === void 0) { pageIndex = 0; }
        if (retrieval === void 0) { retrieval = false; }
        return __awaiter(this, void 0, void 0, function () {
            // ==================== Define Helper Functions ====================
            /**
             * Extracts the relationship ID (r:id or rId) from a page metadata.
             *
             * The r:id attribute links the page index entry to its actual page file.
             *
             * @param {VisioPageMetadata} page - The page metadata.
             * @returns {string} The relationship ID or empty string if not found.
             */
            function getPageRelId(page) {
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
            var zip, allEntries, visioEntries, pagesXmlEntry, pagesRelsEntry, pagesJsObj, relsJsObj, pageMetas, nonBgPages, pagesForSelection, i, p, attrs, idStr, nameStr, label, selectedByFallbackBg, firstBackground, attrs, displayName, count, idx, args_1, selectedPageIndex, selectedPage, relationships, idToRel, i, r, relObj, relId, targetPageRel, pageRelId, rel, orderedNonBgRels, i, p, rid, rel, backPageId_1, backgroundPageMeta, backgroundRelId, bgRel, bgPageFilePath, parts, bgFileName, bgRelsPath, error_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.extraIncludeParts = new Set();
                        this.currentBackgroundFiles = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        zip = new MinimalZipReader(arrayBuffer);
                        allEntries = zip.getEntries();
                        // ==================== Validate ZIP Structure ====================
                        if ((!allEntries || allEntries.length === 0) && !retrieval) {
                            context.addWarning('[ERROR] :: VSDX file is empty or corrupted.');
                            context.triggerEvent('Import', { status: 'failed' });
                            return [2 /*return*/, null];
                        }
                        visioEntries = allEntries.filter(function (entry) {
                            return entry.name.startsWith('visio/') && !entry.name.endsWith('/');
                        });
                        if (visioEntries.length === 0 && !retrieval) {
                            context.addWarning('[ERROR] :: Visio folder not found in VSDX file.');
                            context.triggerEvent('Import', { status: 'failed' });
                            return [2 /*return*/, null];
                        }
                        pagesXmlEntry = findEntry(visioEntries, 'visio/pages/pages.xml');
                        pagesRelsEntry = findEntry(visioEntries, 'visio/pages/_rels/pages.xml.rels');
                        if ((!pagesXmlEntry || !pagesRelsEntry) && !retrieval) {
                            context.addWarning('[ERROR] :: Core files pages.xml or pages.xml.rels not found.');
                            context.triggerEvent('Import', { status: 'failed' });
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.extractAndParseXml(zip, pagesXmlEntry)];
                    case 2:
                        pagesJsObj = _a.sent();
                        return [4 /*yield*/, this.extractAndParseXml(zip, pagesRelsEntry)];
                    case 3:
                        relsJsObj = _a.sent();
                        pageMetas = getPagesArray(pagesJsObj);
                        nonBgPages = [];
                        pagesForSelection = [];
                        // Filter to non-background pages and prepare UI selection list
                        for (i = 0; i < pageMetas.length; i += 1) {
                            p = pageMetas[parseInt(i.toString(), 10)];
                            if (!p || !p.$) {
                                continue;
                            }
                            if (isBackground(p)) {
                                continue;
                            }
                            nonBgPages.push(p);
                            attrs = p.$;
                            idStr = typeof attrs['ID'] === 'string' ? String(attrs['ID']) :
                                typeof attrs['Id'] === 'string' ? String(attrs['Id']) : '';
                            nameStr = typeof attrs['Name'] === 'string' ? String(attrs['Name']) :
                                typeof attrs['NameU'] === 'string' ? String(attrs['NameU']) : '';
                            label = (nameStr && nameStr.trim().length > 0) ? nameStr : (idStr || '');
                            if (label) {
                                pagesForSelection.push({ name: label });
                            }
                            else {
                                pagesForSelection.push({ name: 'Page ' + String(pagesForSelection.length + 1) });
                            }
                        }
                        selectedByFallbackBg = null;
                        if (nonBgPages.length === 0) {
                            firstBackground = (pageMetas || [])
                                .find(function (p) {
                                return p && p.$ && isBackground(p);
                            });
                            if (firstBackground) {
                                selectedByFallbackBg = firstBackground;
                                // Make the fallback visible to downstream selection logic by seeding nonBgPages
                                // (so code that indexes into nonBgPages still works without special cases).
                                nonBgPages.push(firstBackground);
                                attrs = firstBackground.$;
                                displayName = void 0;
                                if (attrs && typeof attrs['Name'] === 'string') {
                                    displayName = attrs['Name'];
                                }
                                else if (attrs && typeof attrs['NameU'] === 'string') {
                                    displayName = attrs['NameU'];
                                }
                                else {
                                    count = (pagesForSelection && pagesForSelection.length) ? pagesForSelection.length : 0;
                                    displayName = 'Page ' + String(count + 1);
                                }
                                pagesForSelection.push({ name: displayName });
                            }
                            else {
                                // Truly no pages in the file
                                if (!retrieval) {
                                    context.addWarning('[ERROR] :: No valid Visio pages found.');
                                    context.triggerEvent('Import', { status: 'failed' });
                                }
                                return [2 /*return*/, null];
                            }
                        }
                        idx = Number.isInteger(pageIndex) ? pageIndex : parseInt(String(pageIndex), 10);
                        if (!Number.isFinite(idx) || idx < 0) {
                            idx = 0;
                        }
                        if (nonBgPages.length > 0 && idx >= nonBgPages.length) {
                            idx = nonBgPages.length - 1;
                        }
                        args_1 = {
                            status: 'started',
                            pages: pagesForSelection,
                            selectedPage: { name: pagesForSelection[parseInt(idx.toString(), 10)].name }
                        };
                        if (!retrieval) {
                            context.triggerEvent('Import', args_1);
                            // Check for cancellation
                            if (args_1.cancel) {
                                return [2 /*return*/, null];
                            }
                        }
                        selectedPageIndex = pagesForSelection.findIndex(function (p) { return p.name === args_1.selectedPage.name; });
                        selectedPageIndex = selectedPageIndex < 0 ? 0 : selectedPageIndex;
                        selectedPage = selectedByFallbackBg || nonBgPages[parseInt(selectedPageIndex.toString(), 10)];
                        if ((!selectedPage || !selectedPage.$) && !retrieval) {
                            context.addWarning('[ERROR] :: Selected page metadata missing.');
                            context.triggerEvent('Import', { status: 'failed' });
                            return [2 /*return*/, null];
                        }
                        relationships = getRelationshipsArray(relsJsObj);
                        idToRel = new Map();
                        for (i = 0; i < relationships.length; i += 1) {
                            r = relationships[parseInt(i.toString(), 10)];
                            if (!r || !r.$) {
                                continue;
                            }
                            relObj = r.$;
                            relId = relObj.Id;
                            if (typeof relId === 'string' && relId.length > 0) {
                                idToRel.set(relId, r);
                            }
                        }
                        targetPageRel = undefined;
                        pageRelId = getPageRelId(selectedPage);
                        if (pageRelId && idToRel.has(pageRelId)) {
                            rel = idToRel.get(pageRelId);
                            if (rel) {
                                targetPageRel = rel;
                            }
                        }
                        orderedNonBgRels = [];
                        for (i = 0; i < nonBgPages.length; i += 1) {
                            p = nonBgPages[parseInt(i.toString(), 10)];
                            rid = getPageRelId(p);
                            if (rid && idToRel.has(rid)) {
                                rel = idToRel.get(rid);
                                if (rel) {
                                    orderedNonBgRels.push(rel);
                                }
                            }
                        }
                        if (selectedPageIndex >= 0 && selectedPageIndex < orderedNonBgRels.length) {
                            targetPageRel = orderedNonBgRels[parseInt(selectedPageIndex.toString(), 10)];
                        }
                        if (!targetPageRel && !retrieval) {
                            context.addWarning('[ERROR] :: Could not resolve page relationship. No valid page found.');
                            context.triggerEvent('Import', { status: 'failed' });
                            return [2 /*return*/, null];
                        }
                        backPageId_1 = selectedPage.$ && selectedPage.$.BackPage;
                        if (backPageId_1) {
                            backgroundPageMeta = (pageMetas || []).find(function (p) { return p && p.$ && String(p.$.ID) === String(backPageId_1); });
                            if (backgroundPageMeta) {
                                backgroundRelId = getPageRelId(backgroundPageMeta);
                                if (backgroundRelId && idToRel.has(backgroundRelId)) {
                                    bgRel = idToRel.get(backgroundRelId);
                                    if (bgRel && bgRel.$ && typeof bgRel.$.Target === 'string') {
                                        bgPageFilePath = normalizeZipPath('visio/pages', bgRel.$.Target);
                                        this.extraIncludeParts.add(bgPageFilePath);
                                        // Track the immediate background page file of the selected page
                                        if (typeof bgPageFilePath === 'string' && bgPageFilePath.length > 0) {
                                            if (this.currentBackgroundFiles.indexOf(bgPageFilePath) === -1) {
                                                this.currentBackgroundFiles.push(bgPageFilePath);
                                            }
                                        }
                                        parts = bgPageFilePath.split('/');
                                        bgFileName = parts[parts.length - 1] || '';
                                        bgRelsPath = normalizeZipPath('visio/pages/_rels', bgFileName + '.rels');
                                        if (findEntry(visioEntries, bgRelsPath)) {
                                            this.extraIncludeParts.add(bgRelsPath);
                                        }
                                    }
                                }
                            }
                        }
                        // ==================== Build Document Structure ====================
                        return [2 /*return*/, this.buildVisioDocumentStructure(zip, visioEntries, targetPageRel, context, retrieval)];
                    case 4:
                        error_1 = _a.sent();
                        errorMessage = error_1 instanceof Error ? error_1.message : 'Unknown error';
                        if (!retrieval) {
                            context.addWarning('[ERROR] :: Package reader error: ' + errorMessage);
                            context.triggerEvent('Import', { status: 'failed' });
                        }
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
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
    VisioPackageReader.prototype.buildVisioDocumentStructure = function (zip, visioEntries, targetPageRel, context, retrieval) {
        return __awaiter(this, void 0, void 0, function () {
            // ==================== Separate XML from Binary ====================
            // Determines if a file path appears to be XML-like.
            function isXmlLikePath(name) {
                return (/\.xml$/i.test(name) || /\.rels$/i.test(name));
            }
            // Returns priority for sorting entries by processing order.
            // Lower numbers are processed first (pages.xml before pages, etc.).
            function getFilePriority(fileName) {
                if (fileName === 'visio/pages/pages.xml') {
                    return 1;
                }
                if (fileName === 'visio/masters/masters.xml') {
                    return 2;
                }
                if (fileName.startsWith('visio/masters/master')) {
                    return 3;
                }
                if (fileName.startsWith('visio/pages/page')) {
                    return 4;
                }
                return 5;
            }
            var visioDoc, targetPageFileName, initialEntries, already_1, split, targetPageName, targetPageRelsPath, extraPaths, pageRelsExists, deps, _err_1, documentRelsPath, docDeps, _err_2, nameSet, i, finalEntries, xmlEntries, binEntries, parsed, i, propertyManager, binBag_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visioDoc = {};
                        visioDoc.PageRelId = targetPageRel.$.Id;
                        targetPageFileName = normalizeZipPath('visio/pages', targetPageRel.$.Target);
                        initialEntries = visioEntries;
                        if (!retrieval) {
                            initialEntries = this.filterEntriesToExtract(visioEntries, targetPageFileName);
                        }
                        // Task #1004826: Merge any forced-included parts (e.g., background page1.xml)
                        // into the initial set before dependency traversal, with simple dedupe.
                        if (this.extraIncludeParts && this.extraIncludeParts.size > 0) {
                            already_1 = new Set(initialEntries.map(function (e) { return e.name; }));
                            this.extraIncludeParts.forEach(function (zipPath) {
                                var entry = findEntry(visioEntries, zipPath);
                                if (entry && !already_1.has(entry.name)) {
                                    initialEntries.push(entry);
                                    already_1.add(entry.name);
                                }
                            });
                        }
                        split = targetPageFileName.split('/');
                        targetPageName = split.length > 0 ? split[split.length - 1] : '';
                        targetPageRelsPath = normalizeZipPath('visio/pages/_rels', targetPageName + '.rels');
                        extraPaths = new Set();
                        pageRelsExists = !!findEntry(visioEntries, targetPageRelsPath);
                        if (!pageRelsExists) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collectDependencies(zip, visioEntries, targetPageRelsPath, 3, context)];
                    case 2:
                        deps = _a.sent();
                        deps.forEach(function (p) { extraPaths.add(p); });
                        return [3 /*break*/, 4];
                    case 3:
                        _err_1 = _a.sent();
                        context.addWarning('[ERROR] :: Failed to traverse page relationships for dependency inclusion.');
                        return [3 /*break*/, 4];
                    case 4:
                        documentRelsPath = 'visio/_rels/document.xml.rels';
                        if (!findEntry(visioEntries, documentRelsPath)) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, collectDependencies(zip, visioEntries, documentRelsPath, 3, context)];
                    case 6:
                        docDeps = _a.sent();
                        docDeps.forEach(function (p) {
                            // ==================== Filter Out Unrelated Pages ====================
                            // Avoid bringing in other pages than the selected one
                            if ((/^visio\/pages\/page\d+\.xml$/i.test(p) || /^visio\/pages\/_rels\/page\d+\.xml\.rels$/i.test(p)) && p !== targetPageFileName && p !== targetPageRelsPath) {
                                return;
                            }
                            extraPaths.add(p);
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        _err_2 = _a.sent();
                        context.addWarning('[ERROR] :: Failed to traverse document relationships for dependency inclusion.');
                        return [3 /*break*/, 8];
                    case 8:
                        nameSet = new Set();
                        for (i = 0; i < initialEntries.length; i += 1) {
                            nameSet.add(initialEntries[parseInt(i.toString(), 10)].name);
                        }
                        finalEntries = initialEntries.slice();
                        extraPaths.forEach(function (p) {
                            var entry = findEntry(visioEntries, p);
                            if (entry && !nameSet.has(entry.name)) {
                                finalEntries.push(entry);
                                nameSet.add(entry.name);
                            }
                        });
                        xmlEntries = finalEntries.filter(function (e) { return isXmlLikePath(e.name); });
                        binEntries = finalEntries.filter(function (e) { return !isXmlLikePath(e.name); });
                        // ==================== Sort Entries ====================
                        // Sort for correct processing order (pages before shapes, etc.)
                        xmlEntries.sort(function (a, b) {
                            var priorityA = getFilePriority(a.name);
                            var priorityB = getFilePriority(b.name);
                            if (priorityA !== priorityB) {
                                return priorityA - priorityB;
                            }
                            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
                        });
                        return [4 /*yield*/, Promise.all(xmlEntries.map(function (e) { return _this.extractAndParseXml(zip, e); }))];
                    case 9:
                        parsed = _a.sent();
                        for (i = 0; i < xmlEntries.length; i += 1) {
                            this.mergeIntoDocument(visioDoc, xmlEntries[parseInt(i.toString(), 10)].name, parsed[parseInt(i.toString(), 10)]);
                        }
                        propertyManager = new VisioPropertiesManager();
                        this.validateDocumentStructure(visioDoc);
                        propertyManager.initialize(visioDoc.RootDocument);
                        context.propertyManager = propertyManager;
                        if (!(binEntries.length > 0)) return [3 /*break*/, 11];
                        binBag_1 = this.getOrInitBinaryParts(visioDoc);
                        return [4 /*yield*/, Promise.all(binEntries.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _err_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, zip.extract(e)];
                                        case 1:
                                            data = _a.sent();
                                            binBag_1[e.name] = data; // Uint8Array
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _err_3 = _a.sent();
                                            context.addWarning('[ERROR] :: Failed to extract binary part: ' + e.name);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        // Remember selected page file for downstream importer
                        visioDoc.__SelectedPageFile = targetPageFileName;
                        // Remember the immediate background page files for the selected page
                        visioDoc.__BackgroundPageFiles = this.currentBackgroundFiles.slice();
                        // Build normalized indexes for masters and per-page connects
                        this.buildNormalizedIndexes(visioDoc, context);
                        // Expose normalized bundle to the parsing pipeline via context
                        context.data.normalized = {
                            parts: this.getOrInitParts(visioDoc),
                            index: visioDoc.__Index,
                            selectedPageFile: visioDoc.__SelectedPageFile,
                            backgroundPageFiles: visioDoc.__BackgroundPageFiles
                        };
                        return [2 /*return*/, visioDoc];
                }
            });
        });
    };
    /**
     * Validates that the document structure is safe to process.
     * @throws {Error} If document structure is invalid or suspicious
     *
     * @param {VisioDocumentStructure} visioDoc - Contains parsed elements from the XML
     *
     * @returns {void}
     *
     */
    VisioPackageReader.prototype.validateDocumentStructure = function (visioDoc) {
        if (!visioDoc) {
            throw new Error('Document is null or undefined');
        }
        if (typeof visioDoc !== 'object') {
            throw new Error('Document must be an object');
        }
        if (!visioDoc.RootDocument) {
            throw new Error('Missing RootDocument in document structure');
        }
        // Add more validation as needed
    };
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
    VisioPackageReader.prototype.filterEntriesToExtract = function (visioEntries, targetPageFileName) {
        var entries = [];
        // ==================== Calculate Target Page .rels Path ====================
        var split = targetPageFileName.split('/');
        var targetPageName = split.length > 0 ? split[split.length - 1] : '';
        var targetPageRelsName = normalizeZipPath('visio/pages/_rels', targetPageName + '.rels');
        // ==================== Filter Entries ====================
        for (var i = 0; i < visioEntries.length; i += 1) {
            var entry = visioEntries[parseInt(i.toString(), 10)];
            var name_1 = entry.name;
            // ==================== Always Include Target Page ====================
            // Include target page and its relationships file
            if (name_1 === targetPageFileName || name_1 === targetPageRelsName) {
                entries.push(entry);
                continue;
            }
            // ==================== Exclude Other Pages ====================
            // Skip other page files and their .rels to reduce parsing load
            if (/^visio\/pages\/page\d+\.xml$/i.test(name_1) || /^visio\/pages\/_rels\/page\d+\.xml\.rels$/i.test(name_1)) {
                continue;
            }
            // ==================== Include Document-Level Essentials ====================
            // Include core document structure files
            if (name_1 === 'visio/document.xml' ||
                name_1 === 'visio/settings.xml' ||
                name_1 === 'visio/windows.xml' ||
                name_1.startsWith('visio/masters/') || // All masters
                name_1.startsWith('visio/theme/') || // All themes
                name_1 === 'visio/masters/_rels/masters.xml.rels') {
                entries.push(entry);
            }
        }
        return entries;
    };
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
    VisioPackageReader.prototype.mergeIntoDocument = function (visioDoc, fileName, jsObj) {
        // Always stash full parsed XML by file for normalized access later
        var partsBag = this.getOrInitParts(visioDoc);
        partsBag[fileName] = jsObj;
        // ==================== Windows ====================
        // Root element contains Window elements
        if (jsObj.Window) {
            this.appendToProperty(visioDoc, 'Window', jsObj);
        }
        // ==================== Pages ====================
        // Page elements from pages.xml
        if (jsObj.Page) {
            this.appendToProperty(visioDoc, 'Page', jsObj.Page);
        }
        // ==================== DocumentSettings ====================
        // Document-level settings from settings.xml
        if (jsObj.DocumentSettings) {
            this.appendToProperty(visioDoc, 'DocumentSettings', jsObj.DocumentSettings);
            this.appendToProperty(visioDoc, 'RootDocument', jsObj);
        }
        // ==================== Masters ====================
        // Master definitions from masters.xml and individual master files
        if (jsObj.Master) {
            this.appendToProperty(visioDoc, 'Master', jsObj.Master);
        }
        // ==================== Connections ====================
        // Connection records from page content
        if (jsObj.Connects && Object.keys(jsObj.Connects).length > 0) {
            this.appendToProperty(visioDoc, 'Connects', jsObj.Connects);
        }
        // ==================== Shapes ====================
        // Shape elements from page content
        if (jsObj.Shapes) {
            this.appendToProperty(visioDoc, 'Shapes', jsObj.Shapes);
        }
        // ==================== Theme Elements ====================
        // Theme color and font definitions
        if (jsObj['a:themeElements']) {
            this.appendToProperty(visioDoc, 'a:themeElements', jsObj['a:themeElements']);
        }
        // ==================== Relationships ====================
        // Raw relationship elements (for extensibility)
        if (jsObj.Relationship) {
            this.appendToProperty(visioDoc, 'Relationship', jsObj.Relationship);
        }
        // ==================== Stash Unknown Parts ====================
        // Store unmapped XML in extensions bag for future extensibility
        var bag = this.getOrInitExtensions(visioDoc);
        bag["" + fileName] = jsObj;
    };
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
    VisioPackageReader.prototype.extractAndParseXml = function (zip, entry) {
        return __awaiter(this, void 0, void 0, function () {
            var data, text, doc, root, shouldTrackOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zip.extract(entry)];
                    case 1:
                        data = _a.sent();
                        text = new TextDecoder('utf-8').decode(data);
                        doc = new DOMParser().parseFromString(text, 'text/xml');
                        root = doc.documentElement;
                        // ==================== Detect Parse Errors ====================
                        // DOMParser doesn't always throw on invalid XML, so check for parsererror element
                        if (!root || root.nodeName.toLowerCase() === 'parsererror') {
                            throw new Error('XML parse error in ' + entry.name);
                        }
                        shouldTrackOrder = entry.name.startsWith('visio/theme');
                        return [2 /*return*/, xmlToJsObject(root, shouldTrackOrder)];
                }
            });
        });
    };
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
    VisioPackageReader.prototype.appendToProperty = function (doc, key, item) {
        var existing = doc["" + key];
        // ==================== Case 1: Property is Empty ====================
        // First item being added
        if (existing === undefined || existing === null) {
            doc["" + key] = item;
            return;
        }
        // ==================== Case 2: Property is Already an Array ====================
        // Append to existing array
        if (Array.isArray(existing)) {
            existing.push(item);
            return;
        }
        // ==================== Case 3: Property is a Singleton ====================
        // Promote to array and add item
        doc["" + key] = [existing, item];
    };
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
    VisioPackageReader.prototype.getOrInitExtensions = function (doc) {
        var key = '__Extensions';
        var current = doc["" + key];
        // ==================== Return if Already Initialized ====================
        if (isObject(current)) {
            return current;
        }
        // ==================== Create New Extensions Bag ====================
        var bag = {};
        doc[key] = bag;
        return bag;
    };
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
    VisioPackageReader.prototype.getOrInitBinaryParts = function (doc) {
        var key = '__BinaryParts';
        var current = doc["" + key];
        // ==================== Return if Already Initialized ====================
        if (isObject(current)) {
            return current;
        }
        // ==================== Create New Binary Parts Bag ====================
        var bag = {};
        doc[key] = bag;
        return bag;
    };
    /**
     * Retrieves or initializes the internal `__Parts` bag on a Visio document structure.
     * If the `__Parts` property already exists and is an object, it is returned.
     * Otherwise, a new empty record is created, attached to the document object,
     * and then returned.
     *
     * @param {VisioDocumentStructure} doc - The Visio document structure to inspect or extend
     * @returns {Record<string, ParsedXmlObject>} A record mapping part names to parsed XML objects
     */
    VisioPackageReader.prototype.getOrInitParts = function (doc) {
        var key = '__Parts';
        var docObj = doc;
        if (Object.prototype.hasOwnProperty.call(docObj, key)) {
            var descriptor = Object.getOwnPropertyDescriptor(docObj, key);
            var current = descriptor ? descriptor.value : undefined;
            if (current && typeof current === 'object') {
                return current;
            }
        }
        var bag = {};
        Object.defineProperty(docObj, key, { value: bag, writable: true, enumerable: true, configurable: true });
        return bag;
    };
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
    VisioPackageReader.prototype.getOrInitIndex = function (doc) {
        var key = '__Index';
        var docObj = doc;
        if (Object.prototype.hasOwnProperty.call(docObj, key)) {
            var descriptor = Object.getOwnPropertyDescriptor(docObj, key);
            var current = descriptor ? descriptor.value : undefined;
            if (current && typeof current === 'object') {
                return current;
            }
        }
        var indexObj = {
            mastersById: new Map(),
            masterFileByRid: new Map(),
            masterChildByMasterId: new Map(),
            masterParentByMasterId: new Map(),
            masterImmediateChildrenByMasterId: new Map(),
            masterRootIdsByMasterId: new Map(),
            pageConnectsByFile: new Map()
        };
        Object.defineProperty(docObj, key, { value: indexObj, writable: true, enumerable: true, configurable: true });
        return indexObj;
    };
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
    VisioPackageReader.prototype.buildNormalizedIndexes = function (doc, context) {
        var indexObj = this.getOrInitIndex(doc);
        var parts = this.getOrInitParts(doc);
        // ---- master rid -> file mapping from masters.xml.rels ----
        var mastersRelsKey = 'visio/masters/_rels/masters.xml.rels';
        var mastersRelsDescriptor = Object.getOwnPropertyDescriptor(parts, mastersRelsKey);
        var mastersRels = Object.prototype.hasOwnProperty.call(parts, mastersRelsKey)
            ? (mastersRelsDescriptor ? mastersRelsDescriptor.value : undefined)
            : undefined;
        if (mastersRels) {
            var relsArr = getRelationshipsArray(mastersRels);
            for (var i = 0; i < relsArr.length; i++) {
                var rel = relsArr[parseInt(i.toString(), 10)];
                if (rel && rel.$ && typeof rel.$.Id === 'string' && typeof rel.$.Target === 'string') {
                    var rid = rel.$.Id;
                    var file = normalizeZipPath('visio/masters', rel.$.Target);
                    // Map the relationship id to its master XML file when the file path points to a valid Visio master.
                    if (file.indexOf('visio/masters/master') === 0 && file.lastIndexOf('.xml') === file.length - 4) {
                        indexObj.masterFileByRid.set(rid, file);
                    }
                }
            }
        }
        else {
            context.addWarning('[WARNING] :: masters.xml.rels is missing; master mapping may be incomplete.');
        }
        // ---- masterId -> { id, nameU, rid, fileName } from masters.xml ----
        var mastersXmlKey = 'visio/masters/masters.xml';
        var mastersXmlDescriptor = Object.getOwnPropertyDescriptor(parts, mastersXmlKey);
        var mastersXml = Object.prototype.hasOwnProperty.call(parts, mastersXmlKey)
            ? (mastersXmlDescriptor ? mastersXmlDescriptor.value : undefined)
            : undefined;
        if (mastersXml) {
            // mastersXml may be wrapped: { Masters: { Master: [...] } }
            var mastersNode = hasKey(mastersXml, 'Masters') ? mastersXml['Masters'] : mastersXml;
            var mastersArray = ensureArray(mastersNode['Master']);
            for (var _i = 0, mastersArray_1 = mastersArray; _i < mastersArray_1.length; _i++) {
                var masterObj = mastersArray_1[_i];
                if (!masterObj || !masterObj.$) {
                    continue;
                }
                var attrs = masterObj.$;
                var attrID = attrs['ID'];
                var masterId = (attrID != null ? String(attrID) : '');
                if (!masterId) {
                    continue;
                }
                var rid = '';
                var masterRel = masterObj['Rel'];
                if (masterRel && masterRel['$']) {
                    var relAttrs = masterRel['$'];
                    var relAttrsRecord = relAttrs;
                    rid = (typeof relAttrsRecord['r:id'] === 'string') ? relAttrsRecord['r:id'] :
                        (typeof relAttrsRecord['rId'] === 'string') ? relAttrsRecord['rId'] : '';
                }
                var attrNameU = attrs['NameU'];
                var attrName = attrs['Name'];
                var nameU = (attrNameU != null ? String(attrNameU) :
                    (attrName != null ? String(attrName) : ''));
                var fileName = (rid && indexObj.masterFileByRid.has(rid)) ? (indexObj.masterFileByRid.get(rid) || '') : '';
                indexObj.mastersById.set(masterId, { id: masterId, nameU: nameU, rid: rid, fileName: fileName });
            }
        }
        else {
            context.addWarning('[WARNING] :: masters.xml is missing; master index may be empty.');
        }
        // ---- 3) Build masterChildByMasterId: index all descendants by $.ID per master file ----
        indexObj.mastersById.forEach(function (masterInfo) {
            var file = masterInfo && masterInfo.fileName ? String(masterInfo.fileName) : '';
            if (!file) {
                return;
            }
            // Safe property access
            var masterJsDescriptor = Object.getOwnPropertyDescriptor(parts, file);
            if (!masterJsDescriptor || !masterJsDescriptor.value) {
                return;
            }
            var masterJs = masterJsDescriptor.value;
            // Some parsers: { Master: {... MasterContents ...} }, others: root is <Master>
            var rootMaster = hasKey(masterJs, 'Master') ? masterJs['Master'] : masterJs;
            var shapesRoot = null;
            // 1) <Master><MasterContents><Shapes>...</Shapes></MasterContents>
            if (hasKey(rootMaster, 'MasterContents')) {
                var masterContent = rootMaster['MasterContents'];
                if (masterContent && hasKey(masterContent, 'Shapes')) {
                    shapesRoot = masterContent['Shapes'];
                }
            }
            // 2) <Master><Shapes>...</Shapes></Master>
            if (!shapesRoot && hasKey(rootMaster, 'Shapes')) {
                shapesRoot = rootMaster['Shapes'];
            }
            // 3) Flattened layout at file root: { $, Shapes }  (this matches your screenshot)
            if (!shapesRoot && hasKey(masterJs, 'Shapes')) {
                shapesRoot = masterJs['Shapes'];
            }
            var childMap = new Map();
            var parentMap = new Map(); // childId -> parentId
            var childrenMap = new Map(); // parentId -> [childId]
            var rootIds = []; // shapes with no parent
            if (shapesRoot && hasKey(shapesRoot, 'Shape')) {
                var topChildren = ensureArray(shapesRoot['Shape']);
                // local helper: add child to parent’s list
                var addChild_1 = function (parentId, childId) {
                    var arr = childrenMap.get(parentId);
                    if (!arr) {
                        arr = [];
                        childrenMap.set(parentId, arr);
                    }
                    if (arr.indexOf(childId) === -1) {
                        arr.push(childId);
                    }
                };
                // NOTE: pass parentId for hierarchy; parentId === '' means "no parent" (root)
                var collectById_1 = function (node, parentId) {
                    if (!node || !node.$) {
                        return;
                    }
                    var nodeAttrs = node.$;
                    var nodeID = nodeAttrs['ID'];
                    var idStr = (nodeID != null) ? String(nodeID) : '';
                    if (!idStr) {
                        return;
                    }
                    // 1) Flat lookup
                    childMap.set(idStr, node);
                    // 2) Hierarchy
                    if (parentId && parentId.length > 0) {
                        parentMap.set(idStr, parentId);
                        addChild_1(parentId, idStr);
                    }
                    else {
                        if (rootIds.indexOf(idStr) === -1) {
                            rootIds.push(idStr);
                        }
                    }
                    // 3) Recurse into nested Shapes
                    var nodeShapes = node['Shapes'];
                    var nodeShapesShape = nodeShapes && nodeShapes['Shape'];
                    var nested = nodeShapesShape ? ensureArray(nodeShapesShape) : [];
                    for (var i = 0; i < nested.length; i++) {
                        collectById_1(nested[parseInt(i.toString(), 10)], idStr);
                    }
                };
                // kick off: top-level shapes have no parent
                for (var c = 0; c < topChildren.length; c++) {
                    collectById_1(topChildren[parseInt(c.toString(), 10)], '');
                }
            }
            // Save all maps for this master
            var masterIdStr = String(masterInfo.id);
            indexObj.masterChildByMasterId.set(masterIdStr, childMap);
            indexObj.masterParentByMasterId.set(masterIdStr, parentMap);
            indexObj.masterImmediateChildrenByMasterId.set(masterIdStr, childrenMap);
            indexObj.masterRootIdsByMasterId.set(masterIdStr, rootIds);
        });
        // ---- 4) Per-page Connects by file (optional) ----
        var selectedPageFile = doc.__SelectedPageFile;
        if (typeof selectedPageFile === 'string' && Object.prototype.hasOwnProperty.call(parts, selectedPageFile)) {
            var pageJsDescriptor = Object.getOwnPropertyDescriptor(parts, selectedPageFile);
            var pageJs = pageJsDescriptor ? pageJsDescriptor.value : undefined;
            if (pageJs && pageJs.Connects) {
                indexObj.pageConnectsByFile.set(selectedPageFile, pageJs.Connects);
            }
        }
    };
    return VisioPackageReader;
}());
export { VisioPackageReader };
