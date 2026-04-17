import { getObject, PdfExport as GridPdf, Grid } from '@syncfusion/ej2-grids';
import { isRemoteData, isOffline } from '../utils';
import { isNullOrUndefined, setValue, extend, getValue } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import * as event from '../base/constant';
/**
 * TreeGrid PDF Export module
 *
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for PDF export module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function PdfExport(parent) {
        this.isCollapsedStatePersist = false;
        Grid.Inject(GridPdf);
        this.parent = parent;
        this.dataResults = {};
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} PdfExport module name
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    /**
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.addEventListener = function () {
        this.parent.on('pdfCellInfo', this.pdfQueryCellInfo, this);
        this.parent.on('updateResults', this.updatePdfResultModel, this);
        this.parent.on('pdfAggregateCellInfo', this.pdfAggregateCellInfo, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('pdfCellInfo', this.pdfQueryCellInfo);
        this.parent.off('updateResults', this.updatePdfResultModel);
        this.parent.off('pdfAggregateCellInfo', this.pdfAggregateCellInfo);
    };
    /**
     * To destroy the PDF Export
     *
     * @returns {void}
     * @hidden
     */
    PdfExport.prototype.destroy = function () {
        this.removeEventListener();
    };
    PdfExport.prototype.updatePdfResultModel = function (returnResult) {
        this.dataResults = returnResult;
    };
    PdfExport.prototype.Map = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        var _this = this;
        var dtSrc = this.parent.dataSource;
        var prop = Object();
        var isLocal = !isRemoteData(this.parent) && isOffline(this.parent);
        setValue('cancel', false, prop);
        if (!isNullOrUndefined(pdfExportProperties)) {
            this.isCollapsedStatePersist = pdfExportProperties.isCollapsedStatePersist;
        }
        if (!isNullOrUndefined(pdfExportProperties)) {
            if (!isLocal && !isNullOrUndefined(pdfExportProperties.dataSource) && !pdfExportProperties.dataSource['dataSource']) {
                return this.parent.grid.pdfExportModule.Map(this.parent.grid, pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
            }
            if (pdfExportProperties.exportType === 'CurrentPage') {
                pdfExportProperties.dataSource = this.parent.getCurrentViewRecords();
                return this.parent.grid.pdfExportModule.Map(this.parent.grid, pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
            }
        }
        return new Promise(function (resolve) {
            var dm = isLocal && !(dtSrc instanceof DataManager) ? new DataManager(dtSrc)
                : _this.parent.dataSource;
            var query = new Query();
            if (!isLocal) {
                query = _this.generateQuery(query);
                setValue('query', query, prop);
            }
            _this.parent.trigger(event.beforePdfExport, extend(prop, pdfExportProperties));
            if (getObject('cancel', prop)) {
                return null;
            }
            dm.executeQuery(query).then(function (e) {
                var customsData = null;
                if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.dataSource)) {
                    customsData = pdfExportProperties.dataSource;
                }
                pdfExportProperties = _this.manipulatePdfProperties(pdfExportProperties, dtSrc, e);
                return _this.parent.grid.pdfExportModule.Map(_this.parent.grid, pdfExportProperties, isMultipleExport, pdfDoc, isBlob).then(function (document) {
                    if (customsData != null) {
                        pdfExportProperties.dataSource = customsData;
                    }
                    else {
                        delete pdfExportProperties.dataSource;
                    }
                    resolve(document);
                });
            });
        });
    };
    PdfExport.prototype.generateQuery = function (query, prop) {
        if (!isNullOrUndefined(prop) && prop.exportType === 'CurrentPage'
            && this.parent.allowPaging) {
            prop.exportType = 'AllPages';
            query.addParams('ExportType', 'CurrentPage');
            query.where(this.parent.parentIdMapping, 'equal', null);
            query = getObject('grid.renderModule.data.pageQuery', this.parent)(query);
        }
        return query;
    };
    PdfExport.prototype.manipulatePdfProperties = function (prop, dtSrc, queryResult) {
        var _this = this;
        var args = Object();
        //count not required for this query
        var isLocal = !isRemoteData(this.parent) && isOffline(this.parent);
        setValue('query', this.parent.grid.getDataModule().generateQuery(true), args);
        if (!isLocal && !isNullOrUndefined(prop) && !isNullOrUndefined(prop.isCollapsedStatePersist)
            && prop.isCollapsedStatePersist === false) {
            if (args.query && args.query.queries && args.query.queries.length) {
                args.query.queries = args.query.queries.filter(function (q) {
                    if (q.fn === 'onWhere' && q.e) {
                        var preds = q.e;
                        if (preds && preds.field === _this.parent.parentIdMapping && (preds.value === null || preds.value === 'null')) {
                            return false;
                        }
                    }
                    return true;
                });
            }
            if (args.query && args.query.params && args.query.params.length) {
                args.query.params = args.query.params.filter(function (param) { return param.key !== 'IdMapping'; });
            }
        }
        setValue('isExport', true, args);
        setValue('isPdfExport', true, args);
        if (!isNullOrUndefined(prop) && !isNullOrUndefined(prop.isCollapsedStatePersist)) {
            setValue('isCollapsedStatePersist', prop.isCollapsedStatePersist, args);
        }
        if (!isNullOrUndefined(prop) && !isNullOrUndefined(prop.exportType)) {
            setValue('exportType', prop.exportType, args);
        }
        if (!isLocal) {
            this.parent.parentData = [];
            this.parent.dataModule.convertToFlatData(getValue('result', queryResult));
            setValue('expresults', this.parent.flatData, args);
        }
        this.parent.notify('dataProcessor', args);
        //args = this.parent.dataModule.dataProcessor(args);
        args = this.dataResults;
        dtSrc = isNullOrUndefined(args.result) ? this.parent.flatData.slice(0) : args.result;
        if (!isLocal) {
            this.parent.flatData = [];
        }
        if (prop && prop.dataSource && isLocal) {
            var flatDatas = this.parent.flatData;
            var dataSrc = prop.dataSource instanceof DataManager ? prop.dataSource.dataSource.json : prop.dataSource;
            this.parent.dataModule.convertToFlatData(dataSrc);
            dtSrc = this.parent.flatData;
            this.parent.flatData = flatDatas;
        }
        prop = isNullOrUndefined(prop) ? {} : prop;
        prop.dataSource = new DataManager({ json: dtSrc });
        prop.query = args['query'];
        return prop;
    };
    /**
     * TreeGrid PDF Export cell modifier
     *
     * @param {PdfQueryCellInfoEventArgs} args - Current cell details
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.pdfQueryCellInfo = function (args) {
        if (this.parent.grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex) {
            var style = {};
            var data = getObject('data', args);
            var ispadfilter = isNullOrUndefined(data.filterLevel);
            var pad = ispadfilter ? data.level : data.filterLevel;
            style.paragraphIndent = pad * 3;
            args.style = style;
        }
        this.parent.notify('updateResults', args);
        this.parent.trigger('pdfQueryCellInfo', args);
    };
    /**
     * TreeGrid PDF Export Aggregate cell modifier
     *
     * @param {AggregateQueryCellInfoEventArgs} args - current cell details
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.pdfAggregateCellInfo = function (args) {
        this.parent.trigger('pdfAggregateQueryCellInfo', args);
    };
    return PdfExport;
}());
export { PdfExport };
