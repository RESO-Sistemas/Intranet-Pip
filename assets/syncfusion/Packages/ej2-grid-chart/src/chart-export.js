import { createElement } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { ContextMenu } from '@syncfusion/ej2-navigations';
var ChartExport = /** @class */ (function () {
    function ChartExport(gridChart) {
        this.menuId = 'e_grid_chart_export_cmenu_';
        this.gridChart = gridChart;
        this.initProperties();
        return this;
    }
    ChartExport.prototype.initProperties = function () {
        this.defaultExportMenuItems = [
            { text: this.gridChart.getLocaleText('Print'), id: this.generateID('Print'), iconCss: 'e-grid-chart-print e-icons' },
            { text: this.gridChart.getLocaleText('JPEG'), id: this.generateID('JPEG'), iconCss: 'e-grid-chart-jpeg e-icons' },
            { text: this.gridChart.getLocaleText('PNG'), id: this.generateID('PNG'), iconCss: 'e-grid-chart-png e-icons' },
            { text: this.gridChart.getLocaleText('SVG'), id: this.generateID('SVG'), iconCss: 'e-grid-chart-svg e-icons' },
            { text: this.gridChart.getLocaleText('PDF'), id: this.generateID('PDF'), iconCss: 'e-grid-chart-pdf e-icons' },
            { text: this.gridChart.getLocaleText('XLSX'), id: this.generateID('XLSX'), iconCss: 'e-grid-chart-xlsx e-icons' },
            { text: this.gridChart.getLocaleText('CSV'), id: this.generateID('CSV'), iconCss: 'e-grid-chart-csv e-icons' }
        ];
    };
    /**
     * @hidden
     * @returns {void}
     */
    ChartExport.prototype.addExportButton = function () {
        var _this = this;
        this.exportButtonElement = createElement('button', { id: 'e-grid-chart-export-btn' });
        this.gridChart.exportContainer.append(this.exportButtonElement);
        this.exportButton = new Button({
            iconCss: 'e-grid-chart-export-icon e-icons',
            content: this.gridChart.getLocaleText('Export'),
            cssClass: this.gridChart.chartSettings.cssClass,
            locale: this.gridChart.chartSettings.locale,
            enableRtl: this.gridChart.enableRtl
        });
        this.exportButton.appendTo(this.exportButtonElement);
        this.exportButton.element.setAttribute('title', this.gridChart.getLocaleText('ExportTitle'));
        this.exportMenuElement = createElement('ul');
        this.gridChart.exportContainer.append(this.exportMenuElement);
        var exportMenuItems = [];
        if (this.gridChart.chartSettings.chartExportItems.length) {
            var _loop_1 = function (item) {
                var tempItem = this_1.defaultExportMenuItems.find(function (data) { return data.text === item; });
                if (tempItem) {
                    exportMenuItems.push(tempItem);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.gridChart.chartSettings.chartExportItems; _i < _a.length; _i++) {
                var item = _a[_i];
                _loop_1(item);
            }
        }
        else {
            exportMenuItems = this.defaultExportMenuItems;
        }
        this.exportMenu = new ContextMenu({
            items: exportMenuItems,
            select: function (args) {
                if (_this.getKeyFromId(args.item.id) === 'Print') {
                    _this.gridChart.currentChart.print();
                }
                else {
                    _this.gridChart.currentChart.exportModule.export(_this.getKeyFromId(args.item.id), 'Chart');
                }
            },
            cssClass: this.gridChart.chartSettings.cssClass,
            locale: this.gridChart.chartSettings.locale,
            enableRtl: this.gridChart.enableRtl,
            target: '#e-grid-chart-export-btn',
            beforeOpen: function (args) {
                if (args && args.event && args.event.button === 2) {
                    args.cancel = true;
                }
            }
        });
        this.exportMenu.appendTo(this.exportMenuElement);
        this.boundOpenExportMenu = this.openExportMenu.bind(this);
        this.exportButton.element.addEventListener('click', this.boundOpenExportMenu);
    };
    ChartExport.prototype.openExportMenu = function (args) {
        this.exportMenu.open(args.pageY, args.pageX, args.target);
    };
    ChartExport.prototype.generateID = function (item) {
        return this.menuId + item;
    };
    ChartExport.prototype.getKeyFromId = function (id) {
        return id.replace(this.menuId, '');
    };
    /**
     * @hidden
     * @returns {void}
     */
    ChartExport.prototype.destroy = function () {
        this.exportMenu.destroy();
        this.exportMenu = null;
        this.exportMenuElement.remove();
        this.exportMenuElement = null;
        this.exportButton.element.removeEventListener('click', this.boundOpenExportMenu);
        this.boundOpenExportMenu = null;
        this.exportButton.destroy();
        this.exportButton = null;
        this.exportButtonElement.remove();
        this.exportButtonElement = null;
    };
    return ChartExport;
}());
export { ChartExport };
