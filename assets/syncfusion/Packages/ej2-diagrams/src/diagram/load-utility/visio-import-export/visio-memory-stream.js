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
import { getCellMapStringValue, mapCellValues } from './visio-core';
import { ParsingContext } from './visio-import-export';
import { isBackground, VisioPackageReader } from './visio-package-reader';
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
var VisioMemoryStream = /** @class */ (function () {
    function VisioMemoryStream() {
    }
    /**
     * Stores the Visio file metadata and buffer in the memory stream.
     *
     * @param {string} fileName - The name of the Visio file.
     * @param {ArrayBuffer} arrayBuffer - The VSDX file data buffer.
     * @param {number} pageIndex - The index of the imported Visio page.
     * @returns {void} - Saves the provided details into the memory stream.
     * @private
     */
    VisioMemoryStream.set = function (fileName, arrayBuffer, pageIndex) {
        VisioMemoryStream.fileName = fileName;
        VisioMemoryStream.arrayBuffer = arrayBuffer;
        VisioMemoryStream.pageIndex = pageIndex;
    };
    /**
     * Reads and parses the Visio package stored in memory, extracting preserved
     * pages, masters, page relationships, and document-level XML parts.
     *
     * @param {Diagram} diagram - The EJ2 Diagram instance used to initialize parsing context.
     * @returns {Promise<RetirevedData>} - Returns all extracted Visio components needed for export.
     */
    VisioMemoryStream.get = function (diagram) {
        return __awaiter(this, void 0, void 0, function () {
            var context, packageReader, visioObj, extentionFiles, allPages, pageArray, backgroundPages, _i, allPages_1, page, currentPage, currentPageCells;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new ParsingContext(diagram);
                        packageReader = new VisioPackageReader();
                        return [4 /*yield*/, packageReader.readPackage(VisioMemoryStream.arrayBuffer, context, VisioMemoryStream.pageIndex, true)];
                    case 1:
                        visioObj = _a.sent();
                        if (visioObj) {
                            visioObj.Page = Array.isArray(visioObj.Page) ? visioObj.Page : [visioObj.Page];
                            visioObj.Page = visioObj.Page.filter(function (item) {
                                return visioObj.PageRelId !== item.Rel.$['r:id'];
                            });
                            extentionFiles = visioObj.__Extensions;
                            allPages = Array.isArray(extentionFiles['visio/pages/pages.xml'].Page)
                                ? extentionFiles['visio/pages/pages.xml'].Page : [extentionFiles['visio/pages/pages.xml'].Page];
                            pageArray = [];
                            backgroundPages = [];
                            for (_i = 0, allPages_1 = allPages; _i < allPages_1.length; _i++) {
                                page = allPages_1[_i];
                                if (isBackground(page)) {
                                    backgroundPages.push(page);
                                }
                                else {
                                    pageArray.push(page);
                                }
                            }
                            if ((this.pageIndex >= pageArray.length) || this.pageIndex < 0) {
                                this.pageIndex = 0;
                            }
                            pageArray.push.apply(pageArray, backgroundPages);
                            currentPage = pageArray[this.pageIndex];
                            currentPageCells = mapCellValues(currentPage.PageSheet.Cell);
                            return [2 /*return*/, {
                                    pageIndex: this.pageIndex + backgroundPages.length,
                                    currentPage: currentPage,
                                    currentPageTheme: appliedThemeValues(currentPageCells),
                                    masters: visioObj.Master,
                                    pages: visioObj.Page,
                                    window: visioObj.Window,
                                    themes: getPagesXmlContentMap(extentionFiles, 'Theme'),
                                    documentSettings: extentionFiles['visio/document.xml'],
                                    pageWithContent: getPagesXmlContentMap(extentionFiles, 'Page'),
                                    pageRelWithContent: getPagesXmlContentMap(extentionFiles, 'PageRel'),
                                    masterWithContent: getPagesXmlContentMap(extentionFiles, 'Master'),
                                    masterRel: extentionFiles['visio/masters/_rels/masters.xml.rels']
                                }];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Clears all stored memory reference data used during import/export.
     *
     * @returns {void} - Resets the memory container.
     * @private
     */
    VisioMemoryStream.clear = function () {
        if (VisioMemoryStream.isClearVisio) {
            VisioMemoryStream.arrayBuffer = undefined;
            VisioMemoryStream.fileName = '';
        }
    };
    /** Holds the raw Visio (.vsdx) file buffer. */
    VisioMemoryStream.arrayBuffer = undefined;
    /** Holds the original Visio file name. */
    VisioMemoryStream.fileName = '';
    /** Stores the selected page index imported into the EJ2 Diagram. */
    VisioMemoryStream.pageIndex = 0;
    /** Stores the selected page index imported into the EJ2 Diagram. */
    VisioMemoryStream.isClearVisio = true;
    return VisioMemoryStream;
}());
export { VisioMemoryStream };
/**
 * Extracts a filtered map of XML content based on its type:
 * Page XML, Page Relationship XML, or Master XML.
 *
 * @param {ParsedXmlObject} extensions - All XML parts extracted from the VSDX package.
 * @param {string} kind - The type of XML to extract: 'Page', 'PageRel', or 'Master'.
 * @returns {ParsedXmlObject} - A map of file paths to their XML content.
 * @private
 */
function getPagesXmlContentMap(extensions, kind) {
    var pages = {};
    var paths = Object.keys(extensions);
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        var content = extensions["" + path];
        if (kind === 'Page' && isPageXmlContent(path)) {
            pages["" + path] = content;
        }
        else if (kind === 'PageRel' && isPageRelXml(path)) {
            pages["" + path] = content;
        }
        else if (kind === 'Master' && isMasterXmlContent(path)) {
            pages["" + path] = content;
        }
        else if (kind === 'Theme' && isThemeXmlContent(path)) {
            pages["" + path] = content;
        }
    }
    return pages;
}
/**
 * Determines whether a given file path corresponds to a Visio page XML file.
 *
 * @param {string} path - Path of the XML file inside the VSDX container.
 * @returns {boolean} - True if the path is a valid Visio page XML file.
 * @private
 */
function isPageXmlContent(path) {
    // e.g., 'visio/pages/page1.xml'
    return (path.startsWith('visio/pages/') &&
        path.endsWith('.xml') &&
        !path.includes('/_rels/') &&
        path !== 'visio/pages/pages.xml');
}
/**
 * Determines whether a given file path corresponds to a Visio master XML file.
 *
 * @param {string} path - Path of the XML file inside the VSDX package.
 * @returns {boolean} - True if the path points to a master XML file.
 * @private
 */
function isMasterXmlContent(path) {
    // e.g., 'visio/pages/page1.xml'
    return (path.startsWith('visio/masters/') &&
        path.endsWith('.xml') &&
        !path.includes('/_rels/') &&
        path !== 'visio/masters/masters.xml');
}
/**
 * Determines whether a given file path corresponds to a Visio page-level relationship (.rels) file.
 *
 * @param {string} path - Path of the .rels file inside the VSDX container.
 * @returns {boolean} - True if the path is a page relationship file.
 * @private
 */
function isPageRelXml(path) {
    // e.g., 'visio/pages/_rels/page1.xml.rels'
    return (path.startsWith('visio/pages/_rels/') &&
        path.endsWith('.rels'));
}
/**
 * Determines whether a given file path corresponds to a Visio theme XML file.
 *
 * @param {string} path - Path of the XML file inside the VSDX package.
 * @returns {boolean} - True if the path points to a theme XML file.
 * @private
 */
function isThemeXmlContent(path) {
    // e.g., 'visio/theme/theme1.xml'
    return (path.startsWith('visio/theme/'));
}
/**
 * Extracts and returns theme-related values from the provided Visio cell map.
 * Ensures all values are explicitly retrieved and sanitized.
 * @param {Map<string, CellMapValue>} cellMap - Map containing Visio cell values.
 * @returns {VisioThemeObject} - Object containing theme indices.
 * @private
 */
function appliedThemeValues(cellMap) {
    var themeValues = {
        themeIndex: getCellMapStringValue(cellMap, 'ThemeIndex'),
        colorSchemeIndex: getCellMapStringValue(cellMap, 'ColorSchemeIndex'),
        effectSchemeIndex: getCellMapStringValue(cellMap, 'EffectSchemeIndex'),
        connectorSchemeIndex: getCellMapStringValue(cellMap, 'ConnectorSchemeIndex'),
        fontSchemeIndex: getCellMapStringValue(cellMap, 'FontSchemeIndex')
    };
    return themeValues;
}
