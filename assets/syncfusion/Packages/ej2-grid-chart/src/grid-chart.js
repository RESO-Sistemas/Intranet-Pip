var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { closest, createElement, extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { Chart, BarSeries, StackingBarSeries, LineSeries, StackingLineSeries, AreaSeries, Legend, Category, StackingColumnSeries, ColumnSeries, StackingAreaSeries, ScatterSeries, PieSeries, AccumulationChart, AccumulationLegend, AccumulationTooltip, Tooltip, DataLabel, Export, AccumulationDataLabel, Zoom, ScrollBar, DateTime } from '@syncfusion/ej2-charts';
import { deepMerge } from './util';
import { ChartPanel } from './chart-panel';
import { ChartExport } from './chart-export';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
Chart.Inject(Legend, Category, BarSeries, StackingBarSeries, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, AreaSeries, StackingAreaSeries, ScatterSeries, Tooltip, DataLabel, Export, Zoom, DateTime, ScrollBar);
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, Export);
/**
 * Provides functionality to render, update, and destroy charts linked to a Grid instance.
 */
var GridChart = /** @class */ (function () {
    /**
     * Initializes a new instance of the GridChart class.
     *
     * @param {GridChartModel} options - Optional configuration for chart behavior.
     * @hidden
     */
    function GridChart(options) {
        /** @hidden */
        this.chartSettings = {
            allowExport: false,
            chartExportItems: [],
            enablePropertyPanel: false,
            updateChartSettings: null,
            chartPopupSettings: {},
            enableRtl: false,
            locale: '',
            cssClass: ''
        };
        this.commonChartModel = {
            width: '100%',
            height: '100%',
            margin: { top: 10, right: 10, bottom: 10, left: 10 },
            background: null,
            title: null,
            titleStyle: { fontFamily: null, size: '15px', color: null },
            subTitle: null,
            subTitleStyle: { fontFamily: null, size: '15px', color: null },
            legendSettings: {
                visible: true,
                position: 'Auto',
                textStyle: { fontFamily: null, size: '12px', color: null },
                enablePages: true,
                textOverflow: 'Ellipsis'
            },
            tooltip: { enable: true }
        };
        this.defaultAccumulationChartModel = extend({
            enableSmartLabels: true
        }, this.commonChartModel, {}, true);
        this.defaultChartModel = extend({
            primaryXAxis: {
                isInversed: false,
                title: null,
                titleStyle: { fontFamily: null, size: '16px', color: null },
                labelStyle: { fontFamily: null, size: '12px', color: null },
                labelRotation: 0
            },
            primaryYAxis: {
                isInversed: false,
                title: null,
                titleStyle: { fontFamily: null, size: '16px', color: null },
                labelStyle: { fontFamily: null, size: '12px', color: null },
                labelRotation: 0
            }
        }, this.commonChartModel, {}, true);
        extend(this.chartSettings, options, {}, true);
        return this;
    }
    /**
     * Renders a chart using the specified grid selection and chart configuration.
     *
     * @param {ChartPopupArgs} chartPopupArgs - Contains information about the selected grid records and chart type.
     * @param {ChartChanges} chartModel - Chart configuration model.
     * @param {CategorySeries} categorySeries - Defines the chart category and series.
     *
     * @returns {void}
     *
     */
    GridChart.prototype.render = function (chartPopupArgs, chartModel, categorySeries) {
        var _this = this;
        this.category = categorySeries.category;
        this.series = categorySeries.series;
        this.chartType = chartPopupArgs.chartType;
        this.dataSource = chartPopupArgs.records;
        this.parent = chartPopupArgs.gridInstance;
        this.enableRtl = this.parent.enableRtl || this.chartSettings.enableRtl;
        this.generateChartLocale();
        this.localeObj = new L10n('gridchart', this.defaultChartLocale, this.chartSettings.locale);
        if (this.chartSettings.enablePropertyPanel) {
            this.chartPanel = new ChartPanel(this);
        }
        if (this.chartSettings.allowExport) {
            this.chartExport = new ChartExport(this);
        }
        this.initDialogUI(chartPopupArgs, this.destroy.bind(this)).then(function (args) {
            _this.addMinMaxButton();
            _this.element = args.target;
            _this.initializeLayout();
            _this.renderChart(chartModel);
        });
    };
    GridChart.prototype.addMinMaxButton = function () {
        var _this = this;
        this.minMaxButtonElement = createElement('button', { className: 'e-dlg-closeicon-btn e-grid-chart-min-max-btn' });
        var headerContent = this.dialogObj.element.querySelector('.e-dlg-header-content');
        headerContent.querySelector('.e-dlg-closeicon-btn').insertAdjacentElement('afterend', this.minMaxButtonElement);
        this.minMaxButton = new Button({
            iconCss: 'e-grid-chart-max-icon e-icons',
            cssClass: this.chartSettings.cssClass ? 'e-flat ' + this.chartSettings.cssClass : 'e-flat',
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        });
        this.minMaxButton.appendTo(this.minMaxButtonElement);
        this.minMaxButton.element.setAttribute('title', this.getLocaleText('Maximize'));
        this.boundMinMax = function (args) {
            var target = args.target;
            target = target.classList.contains('e-icons') ? target : target.querySelector('.e-icons');
            var maxIcon = target.classList.contains('e-grid-chart-max-icon');
            if (maxIcon) {
                target.classList.remove('e-grid-chart-max-icon');
                target.classList.add('e-grid-chart-min-icon');
                _this.dialogInformation = {
                    target: _this.dialogObj.target,
                    width: _this.dialogObj.width,
                    height: _this.dialogObj.height,
                    minHeight: _this.dialogObj.minHeight,
                    overflow: document.body.style.overflow
                };
                window.scrollTo(0, 0);
                _this.dialogObj.target = document.body;
                _this.dialogObj.width = '100%';
                _this.dialogObj.height = '100%';
                _this.dialogObj.minHeight = '100%';
                document.body.style.overflow = 'hidden';
                _this.minMaxButton.element.setAttribute('title', _this.getLocaleText('Minimize'));
            }
            else {
                target.classList.remove('e-grid-chart-min-icon');
                target.classList.add('e-grid-chart-max-icon');
                _this.dialogObj.target = _this.dialogInformation.target;
                _this.dialogObj.width = _this.dialogInformation.width;
                _this.dialogObj.height = _this.dialogInformation.height;
                _this.dialogObj.minHeight = _this.dialogInformation.minHeight;
                document.body.style.overflow = _this.dialogInformation.overflow;
                _this.minMaxButton.element.setAttribute('title', _this.getLocaleText('Maximize'));
            }
            setTimeout(function () {
                _this.currentChart.refresh();
            }, 0);
        };
        this.minMaxButton.element.addEventListener('click', this.boundMinMax);
    };
    GridChart.prototype.generateChartLocale = function () {
        this.defaultChartLocale = __assign({}, this.parent.defaultChartLocale, { ChartPreview: 'Chart Preview', PieChart: 'Pie Chart', Pie: 'Pie', ScatterChart: 'Scatter Chart', Scatter: 'Scatter', Export: 'Export', Data: 'Data', Format: 'Format', Print: 'Print', JPEG: 'JPEG', PNG: 'PNG', SVG: 'SVG', PDF: 'PDF', XLSX: 'XLSX', CSV: 'CSV', CategoryAxis: 'Category Axis', Series: 'Series', ValueAxis: 'Value Axis', ChartStyle: 'Chart Style', TitleStyle: 'Title Style', Legend: 'Legend', Axes: 'Axes', Margin: 'Margin', Top: 'Top', Bottom: 'Bottom', Right: 'Right', Left: 'Left', Color: 'Color', ApplyTo: 'Apply To', Title: 'Title', Subtitle: 'Subtitle', Font: 'Font', Size: 'Size', ShowLegend: 'Show Legend', Position: 'Position', ShowTooltip: 'Show Tooltip', ShowDataLabel: 'Show Data Label', ApplyToAxis: 'Apply To Axis', Category: 'Category', Value: 'Value', ReverseOrder: 'Reverse Order', Text: 'Text', Label: 'Label', Rotation: 'Rotation', ExportTitle: 'Export', ShowSidePanel: 'Show Side Panel', HideSidePanel: 'Hide Side Panel', Maximize: 'Maximize', Minimize: 'Minimize' });
    };
    /**
     * @param {string} item – Defines the locale key.
     * @hidden
     * @returns {string} Returns the locale text.
     */
    GridChart.prototype.getLocaleText = function (item) {
        return this.localeObj.getConstant(item);
    };
    GridChart.prototype.isBiggerTheme = function (gridObj) {
        return closest(gridObj.element, '.e-bigger') ? true : false;
    };
    GridChart.prototype.getChartDialogWidth = function (gridObj) {
        if (this.chartSettings.chartPopupSettings.width) {
            return this.chartSettings.chartPopupSettings.width;
        }
        return this.isBiggerTheme(gridObj) ? 833 : 825;
    };
    GridChart.prototype.getChartDialogHeight = function (gridObj) {
        if (this.chartSettings.chartPopupSettings.height) {
            return this.chartSettings.chartPopupSettings.height;
        }
        return this.isBiggerTheme(gridObj) ? 552 : 490;
    };
    /**
     * Initializes the dialog UI for the "Chart" options.
     * This function attaches a dialog with custom components to the target element within the grid,
     * using selected records for dynamic data representation.
     *
     * @param {ChartPopupArgs} args - specifies the dialog properties.
     * @param {Function} beforeDestroy – defines the destroy function which is executed before the dialog close.
     *
     * @returns {Promise<InitDialogUIArgs>} A promise that resolves with the target element, grid instance, and selected records.
     */
    GridChart.prototype.initDialogUI = function (args, beforeDestroy) {
        var _this = this;
        return new Promise(function (resolve) {
            var gridObj = args.gridInstance;
            var target = _this.chartSettings.chartPopupSettings.target ? _this.chartSettings.chartPopupSettings.target
                : gridObj.element;
            _this.dialogElement = gridObj.createElement('div', { id: gridObj.element.id + '_grid_context_menu_dialog' });
            if (_this.isBiggerTheme(gridObj)) {
                _this.dialogElement.classList.add('e-bigger');
            }
            target.appendChild(_this.dialogElement);
            _this.dialogObj = new Dialog({
                width: _this.getChartDialogWidth(gridObj),
                height: _this.getChartDialogHeight(gridObj),
                minHeight: _this.getChartDialogHeight(gridObj),
                header: _this.chartSettings.chartPopupSettings.title ? _this.chartSettings.chartPopupSettings.title : _this.getLocaleText('ChartPreview'),
                cssClass: _this.chartSettings.cssClass ? 'e-grid-context-menu-dialog ' + _this.chartSettings.cssClass : 'e-grid-context-menu-dialog',
                showCloseIcon: true,
                allowDragging: true,
                isModal: true,
                target: target,
                closeOnEscape: true,
                animationSettings: { effect: 'None' },
                enableRtl: _this.enableRtl,
                locale: _this.chartSettings.locale,
                created: function () {
                    if (isNullOrUndefined(_this.chartSettings.chartPopupSettings.target)
                        && _this.dialogObj.element.getBoundingClientRect().height > gridObj.element.getBoundingClientRect().height) {
                        _this.dialogObj.target = document.body;
                        _this.dialogObj.refresh();
                    }
                    var initDialogUIArgs = __assign({}, args, { target: _this.dialogObj.element.querySelector('.e-dlg-content'), dialog: _this.dialogObj });
                    resolve(initDialogUIArgs);
                },
                close: function () {
                    if (beforeDestroy) {
                        beforeDestroy();
                    }
                    _this.dialogObj.destroy();
                    _this.dialogObj = null;
                    _this.dialogElement.remove();
                    _this.dialogElement = null;
                }
            });
            _this.dialogObj.appendTo(_this.dialogElement);
            _this.dialogObj.element.addEventListener('keydown', _this.preventParentComponentKeyNavigation);
        });
    };
    GridChart.prototype.preventParentComponentKeyNavigation = function (event) {
        event.stopPropagation();
    };
    GridChart.prototype.initializeLayout = function () {
        var dialogHeaderHeight = this.dialogObj.element.querySelector('.e-dlg-header-content').getBoundingClientRect().height;
        this.element.style.width = '100%';
        this.element.style.height = 'calc(100% - ' + dialogHeaderHeight + 'px)';
        this.dialogChartContainer = createElement('div', { className: 'e-grid-dialogchart-container' });
        this.dialogChartContainer.style.width = '100%';
        this.dialogChartContainer.style.height = '100%';
        this.element.append(this.dialogChartContainer);
        var targetElement = this.dialogChartContainer;
        if (this.chartSettings.enablePropertyPanel) {
            this.dialogChartContainer.classList.add('e-grid-dialogchart-display-flex');
            this.chartContainer = createElement('div');
            this.chartContainer.style.width = '67%';
            this.chartContainer.style.height = '100%';
            this.dialogChartContainer.append(this.chartContainer);
            this.tabContainer = createElement('div', { className: 'e-grid-dialog-tab-container' });
            this.tabContainer.style.width = '33%';
            this.tabContainer.style.height = '100%';
            this.dialogChartContainer.append(this.tabContainer);
            this.chartPanel.initializeLayout();
            targetElement = this.chartContainer;
        }
        if (this.chartSettings.allowExport || this.chartSettings.enablePropertyPanel) {
            this.exportContainer = createElement('div', { className: 'e-grid-dialog-chart-export-container' });
            this.exportChartContainer = createElement('div');
            var appendElement = this.chartSettings.enablePropertyPanel ? this.chartContainer : this.dialogChartContainer;
            appendElement.append(this.exportContainer);
            appendElement.append(this.exportChartContainer);
            if (this.chartSettings.allowExport) {
                this.chartExport.addExportButton();
            }
            if (this.chartSettings.enablePropertyPanel) {
                this.addShowHidePanelButton();
            }
            var exportContainerHeight = this.exportContainer.getBoundingClientRect().height;
            this.exportChartContainer.style.width = '100%';
            this.exportChartContainer.style.height = 'calc(100% - ' + exportContainerHeight + 'px)';
            this.exportChartHolder = createElement('div');
            this.exportChartHolder.style.width = '100%';
            this.exportChartHolder.style.height = '100%';
            this.exportChartContainer.append(this.exportChartHolder);
            targetElement = this.exportChartHolder;
        }
        this.chartElement = createElement('div');
        this.accumulationChartElement = createElement('div');
        targetElement.append(this.chartElement);
        targetElement.append(this.accumulationChartElement);
    };
    /**
     * @hidden
     * @returns {void}
     */
    GridChart.prototype.addShowHidePanelButton = function () {
        var showHideContainer = createElement('div');
        showHideContainer.style.display = this.chartSettings.allowExport ? 'inline' : 'flow-root';
        this.showHidePropertyPanelButtonElement = createElement('button');
        showHideContainer.append(this.showHidePropertyPanelButtonElement);
        this.showHidePropertyPanelButtonElement.style.cssFloat = this.enableRtl ? 'left' : 'right';
        this.exportContainer.append(showHideContainer);
        this.showHidePropertyPanelButton = new Button({
            iconCss: 'e-view-side e-icons',
            cssClass: this.chartSettings.cssClass,
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        });
        this.showHidePropertyPanelButton.appendTo(this.showHidePropertyPanelButtonElement);
        this.showHidePropertyPanelButton.element.setAttribute('title', this.getLocaleText('HideSidePanel'));
        this.showHidePropertyPanelButton.element.addEventListener('click', this.showHidePropertyPanel.bind(this));
    };
    GridChart.prototype.showHidePropertyPanel = function (args) {
        var target = args.target;
        target = target.classList.contains('e-icons') ? target : target.querySelector('.e-icons');
        if (this.tabContainer.style.display !== 'none') {
            target.classList.remove('e-view-side');
            target.classList.add('e-show-hide-panel');
            this.tabContainer.style.display = 'none';
            this.chartContainer.style.width = '100%';
            this.showHidePropertyPanelButton.element.setAttribute('title', this.getLocaleText('ShowSidePanel'));
        }
        else {
            target.classList.remove('e-show-hide-panel');
            target.classList.add('e-view-side');
            this.tabContainer.style.display = 'inline-flex';
            this.chartContainer.style.width = '67%';
            this.showHidePropertyPanelButton.element.setAttribute('title', this.getLocaleText('HideSidePanel'));
        }
        if (this.isAccumulationChart()) {
            this.chartElement.style.display = 'none';
            this.accumulationChart.refresh();
            this.currentChart = this.accumulationChart;
        }
        else {
            this.chart.refresh();
        }
    };
    /**
     * To identify the type of chart.
     *
     * @hidden
     * @returns {boolean} Returns `true` if the chart type is one of the standard types (e.g., Bar, Line, Area); otherwise, `false`.
     */
    GridChart.prototype.isChart = function () {
        return [
            'Bar', 'StackingBar', 'StackingBar100',
            'Column', 'StackingColumn', 'StackingColumn100',
            'Line', 'StackingLine', 'StackingLine100',
            'Area', 'StackingArea', 'StackingArea100',
            'Scatter'
        ].indexOf(this.chartType) !== -1;
    };
    /**
     * To identify the type of chart.
     *
     * @hidden
     * @returns {boolean} Returns `true` if the chart type is 'Pie'; otherwise, `false`.
     */
    GridChart.prototype.isAccumulationChart = function () {
        return this.chartType === 'Pie';
    };
    GridChart.prototype.renderChart = function (chartModel) {
        var isChart = this.isChart();
        var isAccumulationChart = this.isAccumulationChart();
        var defaultChartModel = extend({
            cssClass: this.chartSettings.cssClass,
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        }, this.defaultChartModel, {}, true);
        defaultChartModel.series = [];
        if (this.category.length && this.series.length) {
            for (var i = 0; i < this.series.length; i++) {
                var series = {
                    dataSource: this.dataSource,
                    xName: this.category[0],
                    yName: this.series[parseInt(i.toString(), 10)],
                    type: isChart ? this.chartType : 'Bar',
                    name: this.series[parseInt(i.toString(), 10)],
                    fill: null,
                    marker: { dataLabel: { visible: false } },
                    columnSpacing: 0.2
                };
                defaultChartModel.series.push(series);
            }
        }
        deepMerge(defaultChartModel, chartModel.chart);
        this.chart = new Chart(defaultChartModel);
        this.chart.appendTo(this.chartElement);
        this.chartElement.style.display = isAccumulationChart ? 'none' : '';
        var defaultAccumulationChartModel = extend({
            cssClass: this.chartSettings.cssClass,
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        }, this.defaultAccumulationChartModel, {}, true);
        defaultAccumulationChartModel.series = [];
        if (this.category.length && this.series.length) {
            var accumulationSeries = {
                dataSource: this.dataSource.slice(0, 10),
                xName: this.category[0],
                yName: this.series[0],
                type: isAccumulationChart ? this.chartType : 'Pie',
                name: this.series[0],
                dataLabel: { visible: true, position: 'Outside' }
            };
            defaultAccumulationChartModel.series.push(accumulationSeries);
        }
        deepMerge(defaultAccumulationChartModel, chartModel.accumulationChart);
        this.accumulationChart = new AccumulationChart(defaultAccumulationChartModel);
        this.accumulationChart.appendTo(this.accumulationChartElement);
        this.accumulationChartElement.style.display = isChart ? 'none' : '';
        this.currentChart = isChart ? this.chart : this.accumulationChart;
        if (this.chartSettings.enablePropertyPanel) {
            this.chartPanel.tabRenderer();
        }
    };
    GridChart.prototype.refreshChart = function (chartModel) {
        deepMerge(this.chart, chartModel.chart);
        deepMerge(this.accumulationChart, chartModel.accumulationChart);
        if (this.isChart()) {
            this.accumulationChartElement.style.display = 'none';
            this.chart.refresh();
            this.currentChart = this.chart;
        }
        else if (this.isAccumulationChart()) {
            this.chartElement.style.display = 'none';
            this.accumulationChart.refresh();
            this.currentChart = this.accumulationChart;
        }
        if (this.chartSettings.enablePropertyPanel) {
            this.chartPanel.tabRenderer();
        }
    };
    /**
     * Updates the chart with new data or settings.
     *
     * @param {ChartChanges} changes - Defines the changes to apply for the chart.
     * @returns {void}
     *
     */
    GridChart.prototype.refresh = function (changes) {
        var updateChartArgs = {
            changes: changes,
            chartInstance: this.currentChart,
            chartType: this.chartType,
            previousChartType: this.previousChartType,
            gridInstance: this.parent,
            records: this.dataSource
        };
        if (this.chartSettings.updateChartSettings) {
            this.chartSettings.updateChartSettings(updateChartArgs);
        }
        this.refreshChart(updateChartArgs.changes);
    };
    /**
     * Cleans up and disposes the chart instance(s).
     *
     * @returns {void}
     */
    GridChart.prototype.destroy = function () {
        if (this.dialogInformation) {
            document.body.style.overflow = this.dialogInformation.overflow;
        }
        this.chartType = null;
        this.previousChartType = null;
        this.currentChart = null;
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        this.chartElement.remove();
        this.chartElement = null;
        if (this.accumulationChart) {
            this.accumulationChart.destroy();
            this.accumulationChart = null;
        }
        this.accumulationChartElement.remove();
        this.accumulationChartElement = null;
        if (this.chartSettings.allowExport) {
            this.chartExport.destroy();
            this.chartExport = null;
        }
        if (this.chartSettings.allowExport || this.chartSettings.enablePropertyPanel) {
            this.exportChartHolder.remove();
            this.exportChartHolder = null;
            this.exportChartContainer.remove();
            this.exportChartContainer = null;
            this.exportContainer.remove();
            this.exportContainer = null;
        }
        if (this.chartSettings.enablePropertyPanel) {
            this.chartPanel.destroy();
            this.chartPanel = null;
            this.tabContainer.remove();
            this.tabContainer = null;
            this.chartContainer.remove();
            this.chartContainer = null;
        }
        this.dialogObj.element.removeEventListener('keydown', this.preventParentComponentKeyNavigation);
        if (this.chartSettings.enablePropertyPanel) {
            this.showHidePropertyPanelButton.element.removeEventListener('click', this.showHidePropertyPanel.bind(this));
            this.showHidePropertyPanelButton.destroy();
            this.showHidePropertyPanelButton = null;
            this.showHidePropertyPanelButtonElement.remove();
            this.showHidePropertyPanelButtonElement = null;
        }
        this.dialogChartContainer.remove();
        this.dialogChartContainer = null;
        this.element = null;
        this.parent = null;
        this.dataSource = null;
        this.category = null;
        this.series = null;
        this.enableRtl = null;
        this.localeObj = null;
        this.defaultChartLocale = null;
        this.dialogInformation = null;
        this.minMaxButton.element.removeEventListener('click', this.boundMinMax);
        this.boundMinMax = null;
        this.minMaxButton.destroy();
        this.minMaxButton = null;
        this.minMaxButtonElement.remove();
        this.minMaxButtonElement = null;
    };
    return GridChart;
}());
export { GridChart };
