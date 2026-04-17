import { closest, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ColorPicker, NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Accordion, Tab } from '@syncfusion/ej2-navigations';
import { Grid, Edit, Toolbar, CommandColumn, RowDD } from '@syncfusion/ej2-grids';
var ChartPanel = /** @class */ (function () {
    function ChartPanel(gridChart) {
        this.font = ['Default', 'Lucida Console', 'Trebuchet MS', 'Times New Roman', 'Courier New', 'Georgia'];
        this.fontSize = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
        this.legendPosition = ['Auto', 'Top', 'Left', 'Bottom', 'Right'];
        this.defaultMenuItems = [
            'Bar', 'StackingBar', 'StackingBar100', 'Pie', 'Column',
            'StackingColumn', 'StackingColumn100', 'Line', 'StackingLine',
            'StackingLine100', 'Area', 'StackingArea', 'StackingArea100', 'Scatter'
        ];
        this.chartTypeMap = {
            Area: "AreaChart", StackingArea: "AreaChart", StackingArea100: "AreaChart",
            Bar: "BarChart", StackingBar: "BarChart", StackingBar100: "BarChart",
            Column: "ColumnChart", StackingColumn: "ColumnChart", StackingColumn100: "ColumnChart",
            Line: "LineChart", StackingLine: "LineChart", StackingLine100: "LineChart",
            Pie: "PieChart",
            Scatter: "ScatterChart"
        };
        this.rotation = [0, 45, 90, 135, 180, 225, 270, 315];
        this.deletedSeries = [];
        this.titleSection = 'Title';
        this.stylingSeries = 'All';
        this.axes = 'Category';
        this.dataTabInformation = {};
        this.formatTabInformation = {};
        this.chartStyleInformation = {};
        this.titleStyleInformation = {};
        this.legendStyleInformation = {};
        this.seriesStyleInformation = {};
        this.axesStyleInformation = {};
        this.parent = gridChart.parent;
        this.gridChart = gridChart;
        return this;
    }
    /**
     * @hidden
     * @returns {void}
     */
    ChartPanel.prototype.tabRenderer = function () {
        this.chartTab();
        this.dataTab();
        this.formatTab();
    };
    /**
     * @hidden
     * @returns {void}
     */
    ChartPanel.prototype.initializeLayout = function () {
        this.tabElement = createElement('div');
        this.gridChart.tabContainer.append(this.tabElement);
        this.chartTabElement = createElement('div');
        this.dataTabElement = createElement('div', { className: 'e-grid-dialog-data-tab-container' });
        this.formatTabElement = createElement('div', { className: 'e-grid-dialog-format-tab-container' });
        this.addTab();
    };
    ChartPanel.prototype.addTab = function () {
        var _this = this;
        this.tab = new Tab({
            height: '100%',
            items: [
                {
                    header: { text: this.gridChart.getLocaleText('Chart') },
                    content: this.chartTabElement
                },
                {
                    header: { text: this.gridChart.getLocaleText('Data') },
                    content: this.dataTabElement
                },
                {
                    header: { text: this.gridChart.getLocaleText('Format') },
                    content: this.formatTabElement
                }
            ],
            selected: function (args) {
                if (args.selectedIndex === 1 && _this.dataTabInformation.seriesGrid) {
                    _this.dataTabInformation.seriesGrid.freezeRefresh();
                }
            },
            loadOn: 'Init',
            cssClass: this.gridChart.chartSettings.cssClass,
            locale: this.gridChart.chartSettings.locale,
            enableRtl: this.gridChart.enableRtl
        });
        this.tab.appendTo(this.tabElement);
    };
    ChartPanel.prototype.getChartList = function () {
        return [].slice.call(this.chartListAccordion.element.querySelectorAll('.e-grid-chart-list'));
    };
    ChartPanel.prototype.getCustomMenuItems = function (contextMenuItems) {
        var chartItem = [];
        for (var _i = 0, contextMenuItems_1 = contextMenuItems; _i < contextMenuItems_1.length; _i++) {
            var item = contextMenuItems_1[_i];
            if (item.items && item.items.length) {
                chartItem = chartItem.concat(this.getCustomMenuItems(item.items));
            }
            else if (item && item.id) {
                var text = item.id.replace(this.parent.element.id + '_cmenu_', '');
                if (this.defaultMenuItems.indexOf(text) !== -1) {
                    chartItem.push(item);
                }
            }
        }
        return chartItem;
    };
    ChartPanel.prototype.getOrderedChartItems = function (menuItems) {
        var chartItem = [];
        var groupedItems = {
            LineChart: [],
            AreaChart: [],
            ColumnChart: [],
            BarChart: [],
            ScatterChart: [],
            PieChart: []
        };
        for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems[i];
            var chartType = this.chartTypeMap[item.id.replace(this.parent.element.id + '_cmenu_', '')];
            if (chartType) {
                groupedItems[chartType].push(item);
            }
        }
        for (var chartType in groupedItems) {
            if (groupedItems[chartType].length > 0) {
                var item = {
                    id: chartType,
                    items: groupedItems[chartType]
                };
                chartItem.push(item);
            }
        }
        return chartItem;
    };
    ChartPanel.prototype.chartTab = function () {
        var _this = this;
        var gridObj = this.parent;
        var contextMenuModule = gridObj.contextMenuModule;
        if (this.gridChart.chartType) {
            if (this.chartListAccordion) {
                var chartList = this.getChartList();
                var previousSelectedChart = chartList
                    .find(function (element) { return element.classList.contains('e-grid-chart-list-selected'); });
                previousSelectedChart.classList.remove('e-grid-chart-list-selected');
                var currentSelectedChart = chartList
                    .find(function (element) { return element.getAttribute('chartType') === _this.gridChart.chartType; });
                currentSelectedChart.classList.add('e-grid-chart-list-selected');
            }
            else {
                this.boundChangeChartType = function (args) {
                    var target = args.target.classList.contains('e-grid-chart-list')
                        ? args.target : closest(args.target, '.e-grid-chart-list');
                    _this.gridChart.previousChartType = _this.gridChart.chartType;
                    _this.gridChart.chartType = target.getAttribute('charttype');
                    var chartChanges = {};
                    if (_this.gridChart.isChart()) {
                        chartChanges.series = _this.gridChart.chart.series.slice();
                        for (var i = 0; i < chartChanges.series.length; i++) {
                            chartChanges.series[parseInt(i.toString(), 10)].type = _this.gridChart.chartType;
                        }
                    }
                    var accumulationChartChanges = {};
                    if (_this.gridChart.isAccumulationChart()) {
                        accumulationChartChanges.series = _this.gridChart.accumulationChart.series.slice();
                        for (var i = 0; i < accumulationChartChanges.series.length; i++) {
                            accumulationChartChanges.series[parseInt(i.toString(), 10)].type = _this.gridChart.chartType;
                        }
                    }
                    var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                    _this.gridChart.refresh(changes);
                };
                var availableChartItems = this.getCustomMenuItems(contextMenuModule.contextMenu.items);
                var chartItem_2 = this.getOrderedChartItems(availableChartItems);
                this.chartListElement = createElement('div');
                this.chartTabElement.append(this.chartListElement);
                this.chartListAccordion = new Accordion({
                    expanding: function (args) {
                        var content = args.content.firstChild;
                        if (!content.querySelector('.e-grid-chart-list')) {
                            var chartType_1 = content.innerText;
                            content.innerHTML = '';
                            var chartInfo = chartItem_2
                                .find(function (item) { return contextMenuModule.getKeyFromId(item.id) === chartType_1; });
                            if (chartInfo.items.length) {
                                for (var _i = 0, _a = chartInfo.items; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    _this.createChartList(item, content);
                                }
                            }
                            else {
                                _this.createChartList(chartInfo, content);
                            }
                        }
                    },
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                for (var _i = 0, chartItem_1 = chartItem_2; _i < chartItem_1.length; _i++) {
                    var item = chartItem_1[_i];
                    var key = contextMenuModule.getKeyFromId(item.id);
                    var localekey = key === 'Pie' ? 'PieChart' : key === 'Scatter' ? 'ScatterChart' : key;
                    this.chartListAccordion.items.push({
                        header: this.gridChart.getLocaleText(localekey),
                        content: key,
                        cssClass: this.gridChart.chartSettings.cssClass,
                        expanded: true
                    });
                }
                this.chartListAccordion.appendTo(this.chartListElement);
            }
        }
        else if (this.chartListAccordion) {
            var chartList = this.getChartList();
            for (var i = 0; i < chartList.length; i++) {
                var element = chartList[parseInt(i.toString(), 10)];
                element.removeEventListener('click', this.boundChangeChartType);
                element.remove();
                element = null;
            }
            this.boundChangeChartType = null;
            this.chartListAccordion.destroy();
            this.chartListAccordion = null;
            this.chartListElement.remove();
            this.chartListElement = null;
        }
    };
    ChartPanel.prototype.createChartList = function (item, target) {
        var gridObj = this.parent;
        var contextMenuModule = gridObj.contextMenuModule;
        var chartType = contextMenuModule.getKeyFromId(item.id);
        var infoElement = createElement('div', { className: 'e-grid-chart-list', attrs: { charttype: chartType } });
        infoElement.addEventListener('click', this.boundChangeChartType);
        var icon = createElement('span', { className: item.iconCss });
        var text = createElement('span', { className: 'e-grid-chart-text' });
        text.innerText = this.gridChart.getLocaleText(chartType);
        infoElement.append(icon);
        infoElement.append(text);
        target.append(infoElement);
        if (this.gridChart.chartType === chartType) {
            infoElement.classList.add('e-grid-chart-list-selected');
        }
    };
    ChartPanel.prototype.dataTab = function () {
        var _this = this;
        if (this.gridChart.chartType) {
            if (!this.dataTabInformation.categoryAxisDataStyle) {
                this.dataTabInformation.categoryAxisDataStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                this.dataTabInformation.categoryAxisDataStyle.innerText = this.gridChart.getLocaleText('CategoryAxis');
                this.dataTabElement.append(this.dataTabInformation.categoryAxisDataStyle);
            }
        }
        else if (this.dataTabInformation.categoryAxisDataStyle) {
            this.dataTabInformation.categoryAxisDataStyle.remove();
            this.dataTabInformation.categoryAxisDataStyle = null;
        }
        if (this.gridChart.chartType) {
            if (this.dataTabInformation.categoryAxisDropDownListObject) {
                this.dataTabInformation.categoryAxisDropDownListObject.value = this.gridChart.currentChart.series.length
                    ? this.gridChart.currentChart.series[0].xName : null;
                this.dataTabInformation.categoryAxisDropDownListObject.refresh();
            }
            else {
                this.dataTabInformation.categoryAxisElement = createElement('input');
                this.dataTabElement.append(this.dataTabInformation.categoryAxisElement);
                this.dataTabInformation.categoryAxisDropDownListObject = new DropDownList({
                    cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                    dataSource: this.gridChart.category,
                    value: this.gridChart.currentChart.series.length ? this.gridChart.currentChart.series[0].xName : null,
                    change: function (args) {
                        var chartChanges = { series: _this.gridChart.chart.series.slice() };
                        for (var i = 0; i < chartChanges.series.length; i++) {
                            chartChanges.series[parseInt(i.toString(), 10)].xName = args.value;
                        }
                        var accumulationChartChanges = { series: _this.gridChart.accumulationChart.series.slice() };
                        for (var i = 0; i < accumulationChartChanges.series.length; i++) {
                            accumulationChartChanges.series[parseInt(i.toString(), 10)].xName = args.value;
                        }
                        var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                        _this.gridChart.refresh(changes);
                    },
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.dataTabInformation.categoryAxisDropDownListObject.appendTo(this.dataTabInformation.categoryAxisElement);
            }
        }
        else if (this.dataTabInformation.categoryAxisDropDownListObject) {
            this.dataTabInformation.categoryAxisDropDownListObject.destroy();
            this.dataTabInformation.categoryAxisDropDownListObject = null;
            this.dataTabInformation.categoryAxisElement.remove();
            this.dataTabInformation.categoryAxisElement = null;
        }
        if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
            if (!this.dataTabInformation.seriesGridDataStyle) {
                this.dataTabInformation.seriesGridDataStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                this.dataTabInformation.seriesGridDataStyle.innerText = this.gridChart.getLocaleText('Series');
                this.dataTabElement.append(this.dataTabInformation.seriesGridDataStyle);
            }
        }
        else if (this.dataTabInformation.seriesGridDataStyle) {
            this.dataTabInformation.seriesGridDataStyle.remove();
            this.dataTabInformation.seriesGridDataStyle = null;
        }
        if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
            if (this.dataTabInformation.seriesGrid) {
                this.dataTabInformation.seriesGrid.dataSource = this.gridChart.currentChart.series
                    .map(function (series) { return ({ Series: series.yName }); });
                this.setSeriesGridAction();
                this.dataTabInformation.seriesGrid.freezeRefresh();
            }
            else {
                this.dataTabInformation.seriesGridElement = createElement('div', { id: 'series_grid' });
                this.dataTabElement.append(this.dataTabInformation.seriesGridElement);
                Grid.Inject(Edit, Toolbar, CommandColumn, RowDD);
                this.dataTabInformation.seriesGrid = new Grid({
                    allowRowDragAndDrop: true,
                    toolbar: ['Add'],
                    dataBound: function () {
                        _this.dataTabInformation.seriesGrid.getHeaderTable().classList.add('e-hide');
                    },
                    allowKeyboard: false,
                    actionComplete: function (args) {
                        if (args.requestType === 'delete') {
                            setTimeout(function () {
                                var newArray = _this.gridChart.currentChart.series.slice();
                                var index = newArray
                                    .findIndex(function (data) { return data.yName === args.data[0].Series; });
                                var deletedItem = newArray.splice(index, 1)[0];
                                _this.deletedSeries.push(deletedItem);
                                _this.setSeriesGridAction();
                                _this.dataTabInformation.seriesGrid.freezeRefresh();
                                var chartChanges = { series: newArray };
                                var changes = { chart: chartChanges, accumulationChart: {} };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        }
                    },
                    toolbarClick: function (args) {
                        if (args.item.id === 'series_grid_add') {
                            args.cancel = true;
                            setTimeout(function () {
                                var newArray = _this.gridChart.currentChart.series.slice();
                                _this.deletedSeries[0].type = _this.gridChart.chartType;
                                newArray.push(_this.deletedSeries[0]);
                                _this.deletedSeries.shift();
                                _this.dataTabInformation.seriesGrid.dataSource = newArray
                                    .map(function (series) { return ({ Series: series.yName }); });
                                _this.setSeriesGridAction();
                                _this.dataTabInformation.seriesGrid.freezeRefresh();
                                var chartChanges = { series: newArray };
                                var changes = { chart: chartChanges, accumulationChart: {} };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        }
                    },
                    rowDrop: function (args) {
                        if (args.fromIndex !== args.dropIndex) {
                            setTimeout(function () {
                                var newArray = _this.gridChart.currentChart.series.slice();
                                var movedItem = newArray.splice(args.fromIndex, 1)[0];
                                newArray.splice(args.dropIndex, 0, movedItem);
                                var chartChanges = { series: newArray };
                                var changes = { chart: chartChanges, accumulationChart: {} };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        }
                    },
                    cssClass: this.gridChart.chartSettings.cssClass,
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.dataTabInformation.seriesGrid.dataSource = this.gridChart.currentChart.series
                    .map(function (series) { return ({ Series: series.yName }); });
                this.setSeriesGridAction();
                this.dataTabInformation.seriesGrid.appendTo(this.dataTabInformation.seriesGridElement);
            }
        }
        else if (this.dataTabInformation.seriesGrid) {
            this.dataTabInformation.seriesGrid.destroy();
            this.dataTabInformation.seriesGrid = null;
            this.dataTabInformation.seriesGridElement.remove();
            this.dataTabInformation.seriesGridElement = null;
        }
        if (this.gridChart.chartType && this.gridChart.chartType === 'Pie') {
            if (!this.dataTabInformation.accumulationValueAxisDataStyle) {
                this.dataTabInformation.accumulationValueAxisDataStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                this.dataTabInformation.accumulationValueAxisDataStyle.innerText = this.gridChart.getLocaleText('ValueAxis');
                this.dataTabElement.append(this.dataTabInformation.accumulationValueAxisDataStyle);
            }
        }
        else if (this.dataTabInformation.accumulationValueAxisDataStyle) {
            this.dataTabInformation.accumulationValueAxisDataStyle.remove();
            this.dataTabInformation.accumulationValueAxisDataStyle = null;
        }
        if (this.gridChart.chartType && this.gridChart.chartType === 'Pie') {
            if (this.dataTabInformation.accumulationValueAxisDropDown) {
                this.dataTabInformation.accumulationValueAxisDropDown.value = this.gridChart.currentChart.series.length
                    ? this.gridChart.currentChart.series[0].yName : null;
                this.dataTabInformation.accumulationValueAxisDropDown.refresh();
            }
            else {
                this.dataTabInformation.accumulationValueAxisElement = createElement('input');
                this.dataTabElement.append(this.dataTabInformation.accumulationValueAxisElement);
                this.dataTabInformation.accumulationValueAxisDropDown = new DropDownList({
                    dataSource: this.gridChart.series,
                    value: this.gridChart.currentChart.series.length ? this.gridChart.currentChart.series[0].yName : null,
                    change: function (args) {
                        var accumulationChartChanges = {
                            series: _this.gridChart.currentChart.series.slice()
                        };
                        for (var i = 0; i < accumulationChartChanges.series.length; i++) {
                            accumulationChartChanges.series[parseInt(i.toString(), 10)].yName = args.value;
                        }
                        var changes = { chart: {}, accumulationChart: accumulationChartChanges };
                        _this.gridChart.refresh(changes);
                    },
                    cssClass: this.gridChart.chartSettings.cssClass,
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.dataTabInformation.accumulationValueAxisDropDown.appendTo(this.dataTabInformation.accumulationValueAxisElement);
            }
        }
        else if (this.dataTabInformation.accumulationValueAxisDropDown) {
            this.dataTabInformation.accumulationValueAxisDropDown.destroy();
            this.dataTabInformation.accumulationValueAxisDropDown = null;
            this.dataTabInformation.accumulationValueAxisElement.remove();
            this.dataTabInformation.accumulationValueAxisElement = null;
        }
    };
    ChartPanel.prototype.setSeriesGridAction = function () {
        var columns = [{ field: 'Series', isPrimaryKey: true }];
        this.dataTabInformation.seriesGrid.editSettings = { allowAdding: this.deletedSeries.length ? true : false, allowDeleting: false };
        if (this.dataTabInformation.seriesGrid.dataSource.length > 1) {
            this.dataTabInformation.seriesGrid.editSettings.allowDeleting = true;
            columns.push({
                commands: [
                    { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }
                ]
            });
        }
        this.dataTabInformation.seriesGrid.columns = columns;
    };
    ChartPanel.prototype.formatTab = function () {
        var _this = this;
        if (this.gridChart.chartType) {
            if (this.formatTabInformation.chartStyleAccordion) {
                this.renderChartStyleList();
            }
            else {
                this.formatTabInformation.chartStyleElement = createElement('div');
                this.formatTabElement.append(this.formatTabInformation.chartStyleElement);
                this.formatTabInformation.chartStyleAccordion = new Accordion({
                    expanding: function (args) {
                        var content = args.content.firstChild;
                        if (!_this.formatTabInformation.chartStyleContainer) {
                            content.innerHTML = '';
                            _this.formatTabInformation.chartStyleContainer = createElement('div');
                            content.append(_this.formatTabInformation.chartStyleContainer);
                            _this.renderChartStyleList();
                        }
                    },
                    items: [{
                            header: this.gridChart.getLocaleText('ChartStyle'),
                            content: 'Chart Style',
                            cssClass: this.gridChart.chartSettings.cssClass,
                            expanded: true
                        }],
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.formatTabInformation.chartStyleAccordion.appendTo(this.formatTabInformation.chartStyleElement);
            }
        }
        else if (this.formatTabInformation.chartStyleAccordion) {
            this.renderChartStyleList();
            if (this.formatTabInformation.chartStyleContainer) {
                this.formatTabInformation.chartStyleContainer.remove();
                this.formatTabInformation.chartStyleContainer = null;
            }
            this.formatTabInformation.chartStyleAccordion.destroy();
            this.formatTabInformation.chartStyleAccordion = null;
            this.formatTabInformation.chartStyleElement.remove();
            this.formatTabInformation.chartStyleElement = null;
        }
        if (this.gridChart.chartType) {
            if (this.formatTabInformation.titleStyleAccordion) {
                this.renderTitleStyleList();
            }
            else {
                this.formatTabInformation.titleStyleElement = createElement('div');
                this.formatTabElement.append(this.formatTabInformation.titleStyleElement);
                this.formatTabInformation.titleStyleAccordion = new Accordion({
                    expanding: function (args) {
                        var content = args.content.firstChild;
                        if (!_this.formatTabInformation.titleStyleContainer) {
                            content.innerHTML = '';
                            _this.formatTabInformation.titleStyleContainer = createElement('div');
                            content.append(_this.formatTabInformation.titleStyleContainer);
                            _this.renderTitleStyleList();
                        }
                    },
                    items: [{
                            header: this.gridChart.getLocaleText('TitleStyle'),
                            content: 'Title Style',
                            cssClass: this.gridChart.chartSettings.cssClass,
                            expanded: true
                        }],
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.formatTabInformation.titleStyleAccordion.appendTo(this.formatTabInformation.titleStyleElement);
            }
        }
        else if (this.formatTabInformation.titleStyleAccordion) {
            this.renderTitleStyleList();
            if (this.formatTabInformation.titleStyleContainer) {
                this.formatTabInformation.titleStyleContainer.remove();
                this.formatTabInformation.titleStyleContainer = null;
            }
            this.formatTabInformation.titleStyleAccordion.destroy();
            this.formatTabInformation.titleStyleAccordion = null;
            this.formatTabInformation.titleStyleElement.remove();
            this.formatTabInformation.titleStyleElement = null;
        }
        if (this.gridChart.chartType) {
            if (this.formatTabInformation.legendStyleAccordion) {
                this.renderLegendStyleList();
            }
            else {
                this.formatTabInformation.legendStyleElement = createElement('div');
                this.formatTabElement.append(this.formatTabInformation.legendStyleElement);
                this.formatTabInformation.legendStyleAccordion = new Accordion({
                    expanding: function (args) {
                        var content = args.content.firstChild;
                        if (!_this.formatTabInformation.legendStyleContainer) {
                            content.innerHTML = '';
                            _this.formatTabInformation.legendStyleContainer = createElement('div');
                            content.append(_this.formatTabInformation.legendStyleContainer);
                            _this.renderLegendStyleList();
                        }
                    },
                    items: [{
                            header: this.gridChart.getLocaleText('Legend'),
                            content: 'Legend',
                            cssClass: this.gridChart.chartSettings.cssClass,
                            expanded: true
                        }],
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.formatTabInformation.legendStyleAccordion.appendTo(this.formatTabInformation.legendStyleElement);
            }
        }
        else if (this.formatTabInformation.legendStyleAccordion) {
            this.renderLegendStyleList();
            if (this.formatTabInformation.legendStyleContainer) {
                this.formatTabInformation.legendStyleContainer.remove();
                this.formatTabInformation.legendStyleContainer = null;
            }
            this.formatTabInformation.legendStyleAccordion.destroy();
            this.formatTabInformation.legendStyleAccordion = null;
            this.formatTabInformation.legendStyleElement.remove();
            this.formatTabInformation.legendStyleElement = null;
        }
        if (this.gridChart.chartType) {
            if (this.formatTabInformation.seriesStyleAccordion) {
                this.renderSeriesStyleList();
            }
            else {
                this.formatTabInformation.seriesStyleElement = createElement('div');
                this.formatTabElement.append(this.formatTabInformation.seriesStyleElement);
                this.formatTabInformation.seriesStyleAccordion = new Accordion({
                    expanding: function (args) {
                        var content = args.content.firstChild;
                        if (!_this.formatTabInformation.seriesStyleContainer) {
                            content.innerHTML = '';
                            _this.formatTabInformation.seriesStyleContainer = createElement('div');
                            content.append(_this.formatTabInformation.seriesStyleContainer);
                            _this.renderSeriesStyleList();
                        }
                    },
                    items: [{
                            header: this.gridChart.getLocaleText('Series'),
                            content: 'Series',
                            cssClass: this.gridChart.chartSettings.cssClass,
                            expanded: true
                        }],
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.formatTabInformation.seriesStyleAccordion.appendTo(this.formatTabInformation.seriesStyleElement);
            }
        }
        else if (this.formatTabInformation.seriesStyleAccordion) {
            this.renderSeriesStyleList();
            if (this.formatTabInformation.seriesStyleContainer) {
                this.formatTabInformation.seriesStyleContainer.remove();
                this.formatTabInformation.seriesStyleContainer = null;
            }
            this.formatTabInformation.seriesStyleAccordion.destroy();
            this.formatTabInformation.seriesStyleAccordion = null;
            this.formatTabInformation.seriesStyleElement.remove();
            this.formatTabInformation.seriesStyleElement = null;
        }
        if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
            if (this.formatTabInformation.axesStyleAccordion) {
                this.renderAxesStyleList();
            }
            else {
                this.formatTabInformation.axesStyleElement = createElement('div');
                this.formatTabElement.append(this.formatTabInformation.axesStyleElement);
                this.formatTabInformation.axesStyleAccordion = new Accordion({
                    expanding: function (args) {
                        var content = args.content.firstChild;
                        if (!_this.formatTabInformation.axesStyleContainer) {
                            content.innerHTML = '';
                            _this.formatTabInformation.axesStyleContainer = createElement('div');
                            content.append(_this.formatTabInformation.axesStyleContainer);
                            _this.renderAxesStyleList();
                        }
                    },
                    items: [{
                            header: this.gridChart.getLocaleText('Axes'),
                            content: 'Axes',
                            cssClass: this.gridChart.chartSettings.cssClass,
                            expanded: true
                        }],
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.formatTabInformation.axesStyleAccordion.appendTo(this.formatTabInformation.axesStyleElement);
            }
        }
        else if (this.formatTabInformation.axesStyleAccordion) {
            this.renderAxesStyleList();
            if (this.formatTabInformation.axesStyleContainer) {
                this.formatTabInformation.axesStyleContainer.remove();
                this.formatTabInformation.axesStyleContainer = null;
            }
            this.formatTabInformation.axesStyleAccordion.destroy();
            this.formatTabInformation.axesStyleAccordion = null;
            this.formatTabInformation.axesStyleElement.remove();
            this.formatTabInformation.axesStyleElement = null;
        }
    };
    ChartPanel.prototype.renderAxesStyleList = function () {
        var _this = this;
        if (this.formatTabInformation.axesStyleContainer) {
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.applyToAxesStyle) {
                    this.axesStyleInformation.applyToAxesStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.axesStyleInformation.applyToAxesStyle.innerText = this.gridChart.getLocaleText('ApplyToAxis');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.applyToAxesStyle);
                }
            }
            else if (this.axesStyleInformation.applyToAxesStyle) {
                this.axesStyleInformation.applyToAxesStyle.remove();
                this.axesStyleInformation.applyToAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.axesElement) {
                    this.boundSelectAxes = function (args) {
                        var target = args.target;
                        if (target.value === 'categoryaxis') {
                            _this.axes = 'Category';
                        }
                        else if (target.value === 'valueaxis') {
                            _this.axes = 'Value';
                        }
                        _this.renderAxesStyleList();
                    };
                    this.axesStyleInformation.axesElement = createElement('div', { className: 'e-btn-group e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    if (this.gridChart.enableRtl) {
                        this.axesStyleInformation.axesElement.classList.add('e-rtl');
                    }
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesElement);
                    var categoryAxis = this.createRadio('axes-categoryaxis', 'axes', 'categoryaxis', this.gridChart.getLocaleText('Category'));
                    this.axesStyleInformation.axesCategoryElement = categoryAxis.input;
                    this.axesStyleInformation.axesCategoryElement.addEventListener('click', this.boundSelectAxes);
                    this.axesStyleInformation.axesElement.append(this.axesStyleInformation.axesCategoryElement);
                    this.axesStyleInformation.axesElement.append(categoryAxis.label);
                    var valueAxis = this.createRadio('axes-valueaxis', 'axes', 'valueaxis', this.gridChart.getLocaleText('Value'));
                    this.axesStyleInformation.axesValueElement = valueAxis.input;
                    this.axesStyleInformation.axesValueElement.addEventListener('click', this.boundSelectAxes);
                    this.axesStyleInformation.axesElement.append(this.axesStyleInformation.axesValueElement);
                    this.axesStyleInformation.axesElement.append(valueAxis.label);
                    this.axesStyleInformation.axesCategoryElement.checked = this.axes === 'Category';
                    this.axesStyleInformation.axesValueElement.checked = this.axes === 'Value';
                }
            }
            else if (this.axesStyleInformation.axesElement) {
                this.axesStyleInformation.axesCategoryElement.removeEventListener('click', this.boundSelectAxes);
                this.axesStyleInformation.axesCategoryElement.remove();
                this.axesStyleInformation.axesCategoryElement = null;
                this.axesStyleInformation.axesValueElement.removeEventListener('click', this.boundSelectAxes);
                this.axesStyleInformation.axesValueElement.remove();
                this.axesStyleInformation.axesValueElement = null;
                this.boundSelectAxes = null;
                this.axesStyleInformation.axesElement.remove();
                this.axesStyleInformation.axesElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var checked = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.isInversed
                    : this.gridChart.currentChart.primaryYAxis.isInversed;
                if (this.axesStyleInformation.axesInversedCheckBox) {
                    this.axesStyleInformation.axesInversedCheckBox.checked = checked;
                }
                else {
                    this.axesStyleInformation.axesInversedElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesInversedElement);
                    this.axesStyleInformation.axesInversedCheckBox = new CheckBox({
                        checked: checked,
                        label: this.gridChart.getLocaleText('ReverseOrder'),
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        change: function (args) {
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { isInversed: args.checked };
                            }
                            else {
                                chartChanges.primaryYAxis = { isInversed: args.checked };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesInversedCheckBox.appendTo(this.axesStyleInformation.axesInversedElement);
                }
            }
            else if (this.axesStyleInformation.axesInversedCheckBox) {
                this.axesStyleInformation.axesInversedCheckBox.destroy();
                this.axesStyleInformation.axesInversedCheckBox = null;
                this.axesStyleInformation.axesInversedElement.remove();
                this.axesStyleInformation.axesInversedElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.titleHeaderAxesStyle) {
                    this.axesStyleInformation.titleHeaderAxesStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                    this.axesStyleInformation.titleHeaderAxesStyle.innerText = this.gridChart.getLocaleText('Title');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.titleHeaderAxesStyle);
                }
            }
            else if (this.axesStyleInformation.titleHeaderAxesStyle) {
                this.axesStyleInformation.titleHeaderAxesStyle.remove();
                this.axesStyleInformation.titleHeaderAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.titleTextAxesStyle) {
                    this.axesStyleInformation.titleTextAxesStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.axesStyleInformation.titleTextAxesStyle.innerText = this.gridChart.getLocaleText('Text');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.titleTextAxesStyle);
                }
            }
            else if (this.axesStyleInformation.titleTextAxesStyle) {
                this.axesStyleInformation.titleTextAxesStyle.remove();
                this.axesStyleInformation.titleTextAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.title
                    : this.gridChart.currentChart.primaryYAxis.title;
                if (this.axesStyleInformation.axesTitleTextBox) {
                    this.axesStyleInformation.axesTitleTextBox.value = value;
                }
                else {
                    this.axesStyleInformation.axesTitleElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesTitleElement);
                    this.axesStyleInformation.axesTitleTextBox = new TextBox({
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        value: value,
                        input: function (args) {
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { title: args.value };
                            }
                            else {
                                chartChanges.primaryYAxis = { title: args.value };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesTitleTextBox.appendTo(this.axesStyleInformation.axesTitleElement);
                }
            }
            else if (this.axesStyleInformation.axesTitleTextBox) {
                this.axesStyleInformation.axesTitleTextBox.destroy();
                this.axesStyleInformation.axesTitleTextBox = null;
                this.axesStyleInformation.axesTitleElement.remove();
                this.axesStyleInformation.axesTitleElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.titleFontAxesStyle) {
                    this.axesStyleInformation.titleFontAxesStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.axesStyleInformation.titleFontAxesStyle.innerText = this.gridChart.getLocaleText('Font');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.titleFontAxesStyle);
                }
            }
            else if (this.axesStyleInformation.titleFontAxesStyle) {
                this.axesStyleInformation.titleFontAxesStyle.remove();
                this.axesStyleInformation.titleFontAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.titleStyle.fontFamily
                    : this.gridChart.currentChart.primaryYAxis.titleStyle.fontFamily;
                value = isNullOrUndefined(value) ? 'Default' : value;
                if (this.axesStyleInformation.axesTitleFontDropDownList) {
                    this.axesStyleInformation.axesTitleFontDropDownList.value = value;
                    this.axesStyleInformation.axesTitleFontDropDownList.refresh();
                }
                else {
                    this.axesStyleInformation.axesTitleFontElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesTitleFontElement);
                    this.axesStyleInformation.axesTitleFontDropDownList = new DropDownList({
                        dataSource: this.font,
                        value: value,
                        change: function (args) {
                            var chartValue = args.value === 'Default' ? null : args.value;
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { titleStyle: { fontFamily: chartValue } };
                            }
                            else {
                                chartChanges.primaryYAxis = { titleStyle: { fontFamily: chartValue } };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesTitleFontDropDownList.appendTo(this.axesStyleInformation.axesTitleFontElement);
                }
            }
            else if (this.axesStyleInformation.axesTitleFontDropDownList) {
                this.axesStyleInformation.axesTitleFontDropDownList.destroy();
                this.axesStyleInformation.axesTitleFontDropDownList = null;
                this.axesStyleInformation.axesTitleFontElement.remove();
                this.axesStyleInformation.axesTitleFontElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.axesTitleSizeColorContainer) {
                    this.axesStyleInformation.axesTitleSizeColorContainer = createElement('div', { className: 'e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesTitleSizeColorContainer);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.axesTitleSizeContainer) {
                    this.axesStyleInformation.axesTitleSizeContainer = createElement('div');
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Size');
                    this.axesStyleInformation.axesTitleSizeContainer.append(text);
                    this.axesStyleInformation.axesTitleSizeColorContainer.append(this.axesStyleInformation.axesTitleSizeContainer);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category'
                    ? this.gridChart.currentChart.primaryXAxis.titleStyle.size.replace('px', '')
                    : this.gridChart.currentChart.primaryYAxis.titleStyle.size.replace('px', '');
                if (this.axesStyleInformation.axesTitleSizeDropDownList) {
                    this.axesStyleInformation.axesTitleSizeDropDownList.value = value;
                    this.axesStyleInformation.axesTitleSizeDropDownList.refresh();
                }
                else {
                    this.axesStyleInformation.axesTitleSizeElement = createElement('input');
                    this.axesStyleInformation.axesTitleSizeContainer.append(this.axesStyleInformation.axesTitleSizeElement);
                    this.axesStyleInformation.axesTitleSizeDropDownList = new DropDownList({
                        dataSource: this.fontSize,
                        value: value,
                        change: function (args) {
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { titleStyle: { size: args.value + 'px' } };
                            }
                            else {
                                chartChanges.primaryYAxis = { titleStyle: { size: args.value + 'px' } };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesTitleSizeDropDownList.appendTo(this.axesStyleInformation.axesTitleSizeElement);
                }
            }
            else if (this.axesStyleInformation.axesTitleSizeDropDownList) {
                this.axesStyleInformation.axesTitleSizeDropDownList.destroy();
                this.axesStyleInformation.axesTitleSizeDropDownList = null;
                this.axesStyleInformation.axesTitleSizeElement.remove();
                this.axesStyleInformation.axesTitleSizeElement = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.axesStyleInformation.axesTitleSizeContainer) {
                this.axesStyleInformation.axesTitleSizeContainer.remove();
                this.axesStyleInformation.axesTitleSizeContainer = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.titleColorAxesStyle) {
                    this.axesStyleInformation.titleColorAxesStyle = createElement('div', { className: 'e-grid-dialogchart-intermediate-spacer' });
                    var color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.axesStyleInformation.titleColorAxesStyle.append(color);
                    this.axesStyleInformation.axesTitleSizeColorContainer.append(this.axesStyleInformation.titleColorAxesStyle);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.titleStyle.color
                    : this.gridChart.currentChart.primaryYAxis.titleStyle.color;
                if (this.axesStyleInformation.axesTitleColorPicker) {
                    this.axesStyleInformation.axesTitleColorPicker.value = value;
                    this.axesStyleInformation.axesTitleColorPicker.refresh();
                }
                else {
                    this.axesStyleInformation.axesTitleColorElement = createElement('input');
                    this.axesStyleInformation.titleColorAxesStyle.append(this.axesStyleInformation.axesTitleColorElement);
                    this.axesStyleInformation.axesTitleColorPicker = new ColorPicker({
                        value: value,
                        change: function (args) {
                            setTimeout(function () {
                                var chartChanges = {};
                                if (_this.axes === 'Category') {
                                    chartChanges.primaryXAxis = { titleStyle: { color: args.value } };
                                }
                                else {
                                    chartChanges.primaryYAxis = { titleStyle: { color: args.value } };
                                }
                                var changes = { chart: chartChanges, accumulationChart: {} };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesTitleColorPicker.appendTo(this.axesStyleInformation.axesTitleColorElement);
                }
            }
            else if (this.axesStyleInformation.axesTitleColorPicker) {
                this.axesStyleInformation.axesTitleColorPicker.destroy();
                this.axesStyleInformation.axesTitleColorPicker = null;
                this.axesStyleInformation.axesTitleColorElement.remove();
                this.axesStyleInformation.axesTitleColorElement = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.axesStyleInformation.titleColorAxesStyle) {
                this.axesStyleInformation.titleColorAxesStyle.remove();
                this.axesStyleInformation.titleColorAxesStyle = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.axesStyleInformation.axesTitleSizeColorContainer) {
                this.axesStyleInformation.axesTitleSizeColorContainer.remove();
                this.axesStyleInformation.axesTitleSizeColorContainer = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.labelHeaderAxesStyle) {
                    this.axesStyleInformation.labelHeaderAxesStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                    this.axesStyleInformation.labelHeaderAxesStyle.innerText = this.gridChart.getLocaleText('Label');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.labelHeaderAxesStyle);
                }
            }
            else if (this.axesStyleInformation.labelHeaderAxesStyle) {
                this.axesStyleInformation.labelHeaderAxesStyle.remove();
                this.axesStyleInformation.labelHeaderAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.labelFontAxesStyle) {
                    this.axesStyleInformation.labelFontAxesStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.axesStyleInformation.labelFontAxesStyle.innerText = this.gridChart.getLocaleText('Font');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.labelFontAxesStyle);
                }
            }
            else if (this.axesStyleInformation.labelFontAxesStyle) {
                this.axesStyleInformation.labelFontAxesStyle.remove();
                this.axesStyleInformation.labelFontAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelStyle.fontFamily
                    : this.gridChart.currentChart.primaryYAxis.labelStyle.fontFamily;
                value = isNullOrUndefined(value) ? 'Default' : value;
                if (this.axesStyleInformation.axesLabelFontDropDownList) {
                    this.axesStyleInformation.axesLabelFontDropDownList.value = value;
                    this.axesStyleInformation.axesLabelFontDropDownList.refresh();
                }
                else {
                    this.axesStyleInformation.axesLabelFontElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesLabelFontElement);
                    this.axesStyleInformation.axesLabelFontDropDownList = new DropDownList({
                        dataSource: this.font,
                        value: value,
                        change: function (args) {
                            var chartValue = args.value === 'Default' ? null : args.value;
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { labelStyle: { fontFamily: chartValue } };
                            }
                            else {
                                chartChanges.primaryYAxis = { labelStyle: { fontFamily: chartValue } };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesLabelFontDropDownList.appendTo(this.axesStyleInformation.axesLabelFontElement);
                }
            }
            else if (this.axesStyleInformation.axesLabelFontDropDownList) {
                this.axesStyleInformation.axesLabelFontDropDownList.destroy();
                this.axesStyleInformation.axesLabelFontDropDownList = null;
                this.axesStyleInformation.axesLabelFontElement.remove();
                this.axesStyleInformation.axesLabelFontElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.axesLabelSizeColorContainer) {
                    this.axesStyleInformation.axesLabelSizeColorContainer = createElement('div', { className: 'e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesLabelSizeColorContainer);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.axesLabelSizeContainer) {
                    this.axesStyleInformation.axesLabelSizeContainer = createElement('div');
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Size');
                    this.axesStyleInformation.axesLabelSizeContainer.append(text);
                    this.axesStyleInformation.axesLabelSizeColorContainer.append(this.axesStyleInformation.axesLabelSizeContainer);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelStyle.size.replace('px', '')
                    : this.gridChart.currentChart.primaryYAxis.labelStyle.size.replace('px', '');
                if (this.axesStyleInformation.axesLabelSizeDropDownList) {
                    this.axesStyleInformation.axesLabelSizeDropDownList.value = value;
                    this.axesStyleInformation.axesLabelSizeDropDownList.refresh();
                }
                else {
                    this.axesStyleInformation.axesLabelSizeElement = createElement('input');
                    this.axesStyleInformation.axesLabelSizeContainer.append(this.axesStyleInformation.axesLabelSizeElement);
                    this.axesStyleInformation.axesLabelSizeDropDownList = new DropDownList({
                        dataSource: this.fontSize,
                        value: value,
                        change: function (args) {
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { labelStyle: { size: args.value + 'px' } };
                            }
                            else {
                                chartChanges.primaryYAxis = { labelStyle: { size: args.value + 'px' } };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesLabelSizeDropDownList.appendTo(this.axesStyleInformation.axesLabelSizeElement);
                }
            }
            else if (this.axesStyleInformation.axesLabelSizeDropDownList) {
                this.axesStyleInformation.axesLabelSizeDropDownList.destroy();
                this.axesStyleInformation.axesLabelSizeDropDownList = null;
                this.axesStyleInformation.axesLabelSizeElement.remove();
                this.axesStyleInformation.axesLabelSizeElement = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.axesStyleInformation.axesLabelSizeContainer) {
                this.axesStyleInformation.axesLabelSizeContainer.remove();
                this.axesStyleInformation.axesLabelSizeContainer = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.labelColorAxesStyle) {
                    this.axesStyleInformation.labelColorAxesStyle = createElement('div', { className: 'e-grid-dialogchart-intermediate-spacer' });
                    var color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.axesStyleInformation.labelColorAxesStyle.append(color);
                    this.axesStyleInformation.axesLabelSizeColorContainer.append(this.axesStyleInformation.labelColorAxesStyle);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelStyle.color
                    : this.gridChart.currentChart.primaryYAxis.labelStyle.color;
                if (this.axesStyleInformation.axesLabelColorPicker) {
                    this.axesStyleInformation.axesLabelColorPicker.value = value;
                    this.axesStyleInformation.axesLabelColorPicker.refresh();
                }
                else {
                    this.axesStyleInformation.axesLabelColorElement = createElement('input');
                    this.axesStyleInformation.labelColorAxesStyle.append(this.axesStyleInformation.axesLabelColorElement);
                    this.axesStyleInformation.axesLabelColorPicker = new ColorPicker({
                        value: value,
                        change: function (args) {
                            setTimeout(function () {
                                var chartChanges = {};
                                if (_this.axes === 'Category') {
                                    chartChanges.primaryXAxis = { labelStyle: { color: args.value } };
                                }
                                else {
                                    chartChanges.primaryYAxis = { labelStyle: { color: args.value } };
                                }
                                var changes = { chart: chartChanges, accumulationChart: {} };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesLabelColorPicker.appendTo(this.axesStyleInformation.axesLabelColorElement);
                }
            }
            else if (this.axesStyleInformation.axesLabelColorPicker) {
                this.axesStyleInformation.axesLabelColorPicker.destroy();
                this.axesStyleInformation.axesLabelColorPicker = null;
                this.axesStyleInformation.axesLabelColorElement.remove();
                this.axesStyleInformation.axesLabelColorElement = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.axesStyleInformation.labelColorAxesStyle) {
                this.axesStyleInformation.labelColorAxesStyle.remove();
                this.axesStyleInformation.labelColorAxesStyle = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.axesStyleInformation.axesLabelSizeColorContainer) {
                this.axesStyleInformation.axesLabelSizeColorContainer.remove();
                this.axesStyleInformation.axesLabelSizeColorContainer = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.axesStyleInformation.labelRotationAxesStyle) {
                    this.axesStyleInformation.labelRotationAxesStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.axesStyleInformation.labelRotationAxesStyle.innerText = this.gridChart.getLocaleText('Rotation');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.labelRotationAxesStyle);
                }
            }
            else if (this.axesStyleInformation.labelRotationAxesStyle) {
                this.axesStyleInformation.labelRotationAxesStyle.remove();
                this.axesStyleInformation.labelRotationAxesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelRotation
                    : this.gridChart.currentChart.primaryYAxis.labelRotation;
                if (this.axesStyleInformation.axesLabelRotationDropDownList) {
                    this.axesStyleInformation.axesLabelRotationDropDownList.value = value;
                    this.axesStyleInformation.axesLabelRotationDropDownList.refresh();
                }
                else {
                    this.axesStyleInformation.axesLabelRotationElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesLabelRotationElement);
                    this.axesStyleInformation.axesLabelRotationDropDownList = new DropDownList({
                        dataSource: this.rotation,
                        value: value,
                        change: function (args) {
                            var chartChanges = {};
                            if (_this.axes === 'Category') {
                                chartChanges.primaryXAxis = { labelRotation: args.value };
                            }
                            else {
                                chartChanges.primaryYAxis = { labelRotation: args.value };
                            }
                            var changes = { chart: chartChanges, accumulationChart: {} };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.axesStyleInformation.axesLabelRotationDropDownList.appendTo(this.axesStyleInformation.axesLabelRotationElement);
                }
            }
            else if (this.axesStyleInformation.axesLabelRotationDropDownList) {
                this.axesStyleInformation.axesLabelRotationDropDownList.destroy();
                this.axesStyleInformation.axesLabelRotationDropDownList = null;
                this.axesStyleInformation.axesLabelRotationElement.remove();
                this.axesStyleInformation.axesLabelRotationElement = null;
            }
        }
    };
    ChartPanel.prototype.renderSeriesStyleList = function () {
        var _this = this;
        if (this.formatTabInformation.seriesStyleContainer) {
            if (this.gridChart.chartType) {
                if (this.seriesStyleInformation.tooltipCheckBox) {
                    this.seriesStyleInformation.tooltipCheckBox.checked = this.gridChart.currentChart.tooltip.enable;
                }
                else {
                    this.seriesStyleInformation.tooltipElement = createElement('input');
                    this.formatTabInformation.seriesStyleContainer.append(this.seriesStyleInformation.tooltipElement);
                    this.seriesStyleInformation.tooltipCheckBox = new CheckBox({
                        checked: this.gridChart.currentChart.tooltip.enable,
                        label: this.gridChart.getLocaleText('ShowTooltip'),
                        change: function (args) {
                            var changes = {
                                chart: { tooltip: { enable: args.checked } },
                                accumulationChart: { tooltip: { enable: args.checked } }
                            };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.seriesStyleInformation.tooltipCheckBox.appendTo(this.seriesStyleInformation.tooltipElement);
                }
            }
            else if (this.seriesStyleInformation.tooltipCheckBox) {
                this.seriesStyleInformation.tooltipCheckBox.destroy();
                this.seriesStyleInformation.tooltipCheckBox = null;
                this.seriesStyleInformation.tooltipElement.remove();
                this.seriesStyleInformation.tooltipElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.seriesStyleInformation.applyToSeriesStyle) {
                    this.seriesStyleInformation.applyToSeriesStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.seriesStyleInformation.applyToSeriesStyle.innerText = this.gridChart.getLocaleText('ApplyTo');
                    closest(this.seriesStyleInformation.tooltipElement, '.e-checkbox-wrapper').insertAdjacentElement('afterend', this.seriesStyleInformation.applyToSeriesStyle);
                }
            }
            else if (this.seriesStyleInformation.applyToSeriesStyle) {
                this.seriesStyleInformation.applyToSeriesStyle.remove();
                this.seriesStyleInformation.applyToSeriesStyle = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var dataSource = ['All'].concat(this.gridChart.currentChart.series.map(function (series) { return series.yName; }));
                this.stylingSeries = dataSource.indexOf(this.stylingSeries) !== -1 ? this.stylingSeries : 'All';
                if (this.seriesStyleInformation.stylingSeriesDropDownList) {
                    this.seriesStyleInformation.stylingSeriesDropDownList.dataSource = dataSource;
                    this.seriesStyleInformation.stylingSeriesDropDownList.value = this.stylingSeries;
                    this.seriesStyleInformation.stylingSeriesDropDownList.refresh();
                }
                else {
                    this.seriesStyleInformation.stylingSeriesElement = createElement('input');
                    this.seriesStyleInformation.applyToSeriesStyle.insertAdjacentElement('afterend', this.seriesStyleInformation.stylingSeriesElement);
                    this.seriesStyleInformation.stylingSeriesDropDownList = new DropDownList({
                        dataSource: dataSource,
                        value: this.stylingSeries,
                        change: function (args) {
                            _this.stylingSeries = args.value;
                            _this.renderSeriesStyleList();
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.seriesStyleInformation.stylingSeriesDropDownList.appendTo(this.seriesStyleInformation.stylingSeriesElement);
                }
            }
            else if (this.seriesStyleInformation.stylingSeriesDropDownList) {
                this.seriesStyleInformation.stylingSeriesDropDownList.destroy();
                this.seriesStyleInformation.stylingSeriesDropDownList = null;
                this.seriesStyleInformation.stylingSeriesElement.remove();
                this.seriesStyleInformation.stylingSeriesElement = null;
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                if (!this.seriesStyleInformation.colorSeriesStyle) {
                    this.seriesStyleInformation.colorSeriesStyle = createElement('div', { className: 'e-grid-dialogchart-bottom-spacer' });
                    var color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.seriesStyleInformation.colorSeriesStyle.append(color);
                    closest(this.seriesStyleInformation.stylingSeriesElement, '.e-control-wrapper').insertAdjacentElement('afterend', this.seriesStyleInformation.colorSeriesStyle);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                var disabled = this.stylingSeries === 'All';
                var value = disabled ? null
                    : this.gridChart.currentChart.series
                        .find(function (series) { return series.yName === _this.stylingSeries; }).fill;
                if (this.seriesStyleInformation.seriesColorPicker) {
                    this.seriesStyleInformation.seriesColorPicker.disabled = disabled;
                    this.seriesStyleInformation.seriesColorPicker.value = value;
                    this.seriesStyleInformation.seriesColorPicker.refresh();
                }
                else {
                    this.seriesStyleInformation.seriesColorElement = createElement('input');
                    this.seriesStyleInformation.colorSeriesStyle.append(this.seriesStyleInformation.seriesColorElement);
                    this.seriesStyleInformation.seriesColorPicker = new ColorPicker({
                        value: value,
                        change: function (args) {
                            setTimeout(function () {
                                var chartChanges = { series: _this.gridChart.currentChart.series.slice() };
                                chartChanges.series.find(function (series) { return series.yName === _this.stylingSeries; }).fill = args.value;
                                var changes = { chart: chartChanges, accumulationChart: {} };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl,
                        disabled: disabled
                    });
                    this.seriesStyleInformation.seriesColorPicker.appendTo(this.seriesStyleInformation.seriesColorElement);
                }
            }
            else if (this.seriesStyleInformation.seriesColorPicker) {
                this.seriesStyleInformation.seriesColorPicker.destroy();
                this.seriesStyleInformation.seriesColorPicker = null;
                this.seriesStyleInformation.seriesColorElement.remove();
                this.seriesStyleInformation.seriesColorElement = null;
            }
            if (!(this.gridChart.chartType && this.gridChart.chartType !== 'Pie') && this.seriesStyleInformation.colorSeriesStyle) {
                this.seriesStyleInformation.colorSeriesStyle.remove();
                this.seriesStyleInformation.colorSeriesStyle = null;
            }
            if (this.gridChart.chartType) {
                var checked = false;
                if (this.gridChart.isAccumulationChart() || (this.gridChart.isChart() && this.stylingSeries === 'All')) {
                    if (this.gridChart.isChart()) {
                        checked = !this.gridChart.currentChart.series
                            .some(function (series) { return series.marker.dataLabel.visible === false; });
                    }
                    else {
                        checked = !this.gridChart.currentChart.series
                            .some(function (series) { return series.dataLabel.visible === false; });
                    }
                }
                else {
                    checked = this.gridChart.currentChart.series
                        .find(function (series) { return series.yName === _this.stylingSeries; }).marker.dataLabel.visible;
                }
                if (this.seriesStyleInformation.seriesDataLabelCheckBox) {
                    this.seriesStyleInformation.seriesDataLabelCheckBox.checked = checked;
                }
                else {
                    this.seriesStyleInformation.seriesDataLabelElement = createElement('input');
                    this.formatTabInformation.seriesStyleContainer.append(this.seriesStyleInformation.seriesDataLabelElement);
                    this.seriesStyleInformation.seriesDataLabelCheckBox = new CheckBox({
                        checked: checked,
                        label: this.gridChart.getLocaleText('ShowDataLabel'),
                        change: function (args) {
                            var chartChanges = {};
                            if (_this.gridChart.isChart()) {
                                chartChanges.series = _this.gridChart.chart.series.slice();
                                for (var i = 0; i < chartChanges.series.length; i++) {
                                    if (_this.stylingSeries === 'All'
                                        || _this.stylingSeries === chartChanges.series[parseInt(i.toString(), 10)].yName) {
                                        chartChanges.series[parseInt(i.toString(), 10)].marker.dataLabel.visible = args.checked;
                                    }
                                }
                            }
                            var accumulationChartChanges = {};
                            if (_this.gridChart.isAccumulationChart()) {
                                accumulationChartChanges.series = _this.gridChart.accumulationChart.series.slice();
                                for (var i = 0; i < accumulationChartChanges.series.length; i++) {
                                    accumulationChartChanges.series[parseInt(i.toString(), 10)].dataLabel.visible = args.checked;
                                }
                            }
                            var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.seriesStyleInformation.seriesDataLabelCheckBox.appendTo(this.seriesStyleInformation.seriesDataLabelElement);
                }
            }
            else if (this.seriesStyleInformation.seriesDataLabelCheckBox) {
                this.seriesStyleInformation.seriesDataLabelCheckBox.destroy();
                this.seriesStyleInformation.seriesDataLabelCheckBox = null;
                this.seriesStyleInformation.seriesDataLabelElement.remove();
                this.seriesStyleInformation.seriesDataLabelElement = null;
            }
        }
    };
    ChartPanel.prototype.renderLegendStyleList = function () {
        var _this = this;
        if (this.formatTabInformation.legendStyleContainer) {
            if (this.gridChart.chartType) {
                if (this.legendStyleInformation.legendCheckBox) {
                    this.legendStyleInformation.legendCheckBox.checked = this.gridChart.currentChart.legendSettings.visible;
                }
                else {
                    this.legendStyleInformation.legendElement = createElement('input');
                    this.formatTabInformation.legendStyleContainer.append(this.legendStyleInformation.legendElement);
                    this.legendStyleInformation.legendCheckBox = new CheckBox({
                        checked: this.gridChart.currentChart.legendSettings.visible,
                        label: this.gridChart.getLocaleText('ShowLegend'),
                        change: function (args) {
                            var changes = {
                                chart: { legendSettings: { visible: args.checked } },
                                accumulationChart: { legendSettings: { visible: args.checked } }
                            };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.legendStyleInformation.legendCheckBox.appendTo(this.legendStyleInformation.legendElement);
                }
            }
            else if (this.legendStyleInformation.legendCheckBox) {
                this.legendStyleInformation.legendCheckBox.destroy();
                this.legendStyleInformation.legendCheckBox = null;
                this.legendStyleInformation.legendElement.remove();
                this.legendStyleInformation.legendElement = null;
            }
            if (this.gridChart.chartType) {
                if (!this.legendStyleInformation.fontLegendStyle) {
                    this.legendStyleInformation.fontLegendStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.legendStyleInformation.fontLegendStyle.innerText = this.gridChart.getLocaleText('Font');
                    this.formatTabInformation.legendStyleContainer.append(this.legendStyleInformation.fontLegendStyle);
                }
            }
            else if (this.legendStyleInformation.fontLegendStyle) {
                this.legendStyleInformation.fontLegendStyle.remove();
                this.legendStyleInformation.fontLegendStyle = null;
            }
            if (this.gridChart.chartType) {
                var value = this.gridChart.currentChart.legendSettings.textStyle.fontFamily;
                value = isNullOrUndefined(value) ? 'Default' : value;
                if (this.legendStyleInformation.legendFontDropDownList) {
                    this.legendStyleInformation.legendFontDropDownList.value = value;
                    this.legendStyleInformation.legendFontDropDownList.refresh();
                }
                else {
                    this.legendStyleInformation.legendFontElement = createElement('input');
                    this.formatTabInformation.legendStyleContainer.append(this.legendStyleInformation.legendFontElement);
                    this.legendStyleInformation.legendFontDropDownList = new DropDownList({
                        dataSource: this.font,
                        value: value,
                        change: function (args) {
                            var chartValue = args.value === 'Default' ? null : args.value;
                            var changes = {
                                chart: { legendSettings: { textStyle: { fontFamily: chartValue } } },
                                accumulationChart: { legendSettings: { textStyle: { fontFamily: chartValue } } }
                            };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.legendStyleInformation.legendFontDropDownList.appendTo(this.legendStyleInformation.legendFontElement);
                }
            }
            else if (this.legendStyleInformation.legendFontDropDownList) {
                this.legendStyleInformation.legendFontDropDownList.destroy();
                this.legendStyleInformation.legendFontDropDownList = null;
                this.legendStyleInformation.legendFontElement.remove();
                this.legendStyleInformation.legendFontElement = null;
            }
            if (this.gridChart.chartType) {
                if (!this.legendStyleInformation.legendSizeColorContainer) {
                    this.legendStyleInformation.legendSizeColorContainer = createElement('div', { className: 'e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    this.formatTabInformation.legendStyleContainer.append(this.legendStyleInformation.legendSizeColorContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (!this.legendStyleInformation.legendSizeContainer) {
                    this.legendStyleInformation.legendSizeContainer = createElement('div');
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Size');
                    this.legendStyleInformation.legendSizeContainer.append(text);
                    this.legendStyleInformation.legendSizeColorContainer.append(this.legendStyleInformation.legendSizeContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (this.legendStyleInformation.legendSizeDropDownList) {
                    this.legendStyleInformation.legendSizeDropDownList.value = this.gridChart.currentChart.legendSettings.textStyle.size.replace('px', '');
                    this.legendStyleInformation.legendSizeDropDownList.refresh();
                }
                else {
                    this.legendStyleInformation.legendSizeElement = createElement('input');
                    this.legendStyleInformation.legendSizeContainer.append(this.legendStyleInformation.legendSizeElement);
                    this.legendStyleInformation.legendSizeDropDownList = new DropDownList({
                        dataSource: this.fontSize,
                        value: this.gridChart.currentChart.legendSettings.textStyle.size.replace('px', ''),
                        change: function (args) {
                            var changes = {
                                chart: { legendSettings: { textStyle: { size: args.value + 'px' } } },
                                accumulationChart: { legendSettings: { textStyle: { size: args.value + 'px' } } }
                            };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.legendStyleInformation.legendSizeDropDownList.appendTo(this.legendStyleInformation.legendSizeElement);
                }
            }
            else if (this.legendStyleInformation.legendSizeDropDownList) {
                this.legendStyleInformation.legendSizeDropDownList.destroy();
                this.legendStyleInformation.legendSizeDropDownList = null;
                this.legendStyleInformation.legendSizeElement.remove();
                this.legendStyleInformation.legendSizeElement = null;
            }
            if (!(this.gridChart.chartType) && this.legendStyleInformation.legendSizeContainer) {
                this.legendStyleInformation.legendSizeContainer.remove();
                this.legendStyleInformation.legendSizeContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.legendStyleInformation.colorLegendStyle) {
                    this.legendStyleInformation.colorLegendStyle = createElement('div', { className: 'e-grid-dialogchart-intermediate-spacer' });
                    var color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.legendStyleInformation.colorLegendStyle.append(color);
                    this.legendStyleInformation.legendSizeColorContainer.append(this.legendStyleInformation.colorLegendStyle);
                }
            }
            if (this.gridChart.chartType) {
                if (this.legendStyleInformation.legendColorPicker) {
                    this.legendStyleInformation.legendColorPicker.value = this.gridChart.currentChart.legendSettings.textStyle.color;
                    this.legendStyleInformation.legendColorPicker.refresh();
                }
                else {
                    this.legendStyleInformation.legendColorElement = createElement('input');
                    this.legendStyleInformation.colorLegendStyle.append(this.legendStyleInformation.legendColorElement);
                    this.legendStyleInformation.legendColorPicker = new ColorPicker({
                        value: this.gridChart.currentChart.legendSettings.textStyle.color,
                        change: function (args) {
                            setTimeout(function () {
                                var changes = {
                                    chart: { legendSettings: { textStyle: { color: args.value } } },
                                    accumulationChart: { legendSettings: { textStyle: { color: args.value } } }
                                };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.legendStyleInformation.legendColorPicker.appendTo(this.legendStyleInformation.legendColorElement);
                }
            }
            else if (this.legendStyleInformation.legendColorPicker) {
                this.legendStyleInformation.legendColorPicker.destroy();
                this.legendStyleInformation.legendColorPicker = null;
                this.legendStyleInformation.legendColorElement.remove();
                this.legendStyleInformation.legendColorElement = null;
            }
            if (!this.gridChart.chartType && this.legendStyleInformation.colorLegendStyle) {
                this.legendStyleInformation.colorLegendStyle.remove();
                this.legendStyleInformation.colorLegendStyle = null;
            }
            if (!this.gridChart.chartType && this.legendStyleInformation.legendSizeColorContainer) {
                this.legendStyleInformation.legendSizeColorContainer.remove();
                this.legendStyleInformation.legendSizeColorContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.legendStyleInformation.positionLegendStyle) {
                    this.legendStyleInformation.positionLegendStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.legendStyleInformation.positionLegendStyle.innerText = this.gridChart.getLocaleText('Position');
                    this.formatTabInformation.legendStyleContainer.append(this.legendStyleInformation.positionLegendStyle);
                }
            }
            else if (this.legendStyleInformation.positionLegendStyle) {
                this.legendStyleInformation.positionLegendStyle.remove();
                this.legendStyleInformation.positionLegendStyle = null;
            }
            if (this.gridChart.chartType) {
                if (this.legendStyleInformation.legendPositionDropDownList) {
                    this.legendStyleInformation.legendPositionDropDownList.value = this.gridChart.currentChart.legendSettings.position;
                    this.legendStyleInformation.legendPositionDropDownList.refresh();
                }
                else {
                    this.legendStyleInformation.legendPositionElement = createElement('input');
                    this.formatTabInformation.legendStyleContainer.append(this.legendStyleInformation.legendPositionElement);
                    this.legendStyleInformation.legendPositionDropDownList = new DropDownList({
                        dataSource: this.legendPosition,
                        value: this.gridChart.currentChart.legendSettings.position,
                        change: function (args) {
                            var changes = {
                                chart: { legendSettings: { position: args.value } },
                                accumulationChart: { legendSettings: { position: args.value } }
                            };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.legendStyleInformation.legendPositionDropDownList.appendTo(this.legendStyleInformation.legendPositionElement);
                }
            }
            else if (this.legendStyleInformation.legendPositionDropDownList) {
                this.legendStyleInformation.legendPositionDropDownList.destroy();
                this.legendStyleInformation.legendPositionDropDownList = null;
                this.legendStyleInformation.legendPositionElement.remove();
                this.legendStyleInformation.legendPositionElement = null;
            }
        }
    };
    ChartPanel.prototype.createRadio = function (id, name, value, labelText) {
        var input = document.createElement('input');
        input.type = 'radio';
        input.id = id;
        input.name = name;
        input.value = value;
        var label = document.createElement('label');
        label.classList.add('e-btn', 'e-grid-dialogchart-display-flex-50');
        label.htmlFor = id;
        label.textContent = labelText;
        return { input: input, label: label };
    };
    ChartPanel.prototype.renderTitleStyleList = function () {
        var _this = this;
        if (this.formatTabInformation.titleStyleContainer) {
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.applyToTitleStyle) {
                    this.titleStyleInformation.applyToTitleStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.titleStyleInformation.applyToTitleStyle.innerText = this.gridChart.getLocaleText('ApplyTo');
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.applyToTitleStyle);
                }
            }
            else if (this.titleStyleInformation.applyToTitleStyle) {
                this.titleStyleInformation.applyToTitleStyle.remove();
                this.titleStyleInformation.applyToTitleStyle = null;
            }
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.titleSectionElement) {
                    this.boundSelectTitle = function (args) {
                        var target = args.target;
                        if (target.value === 'title') {
                            _this.titleSection = 'Title';
                        }
                        else if (target.value === 'subtitle') {
                            _this.titleSection = 'Subtitle';
                        }
                        _this.renderTitleStyleList();
                    };
                    this.titleStyleInformation.titleSectionElement = createElement('div', { className: 'e-btn-group e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    if (this.gridChart.enableRtl) {
                        this.titleStyleInformation.titleSectionElement.classList.add('e-rtl');
                    }
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.titleSectionElement);
                    var title = this.createRadio('title-section-title', 'title', 'title', this.gridChart.getLocaleText('Title'));
                    this.titleStyleInformation.titleSectionTitleElement = title.input;
                    this.titleStyleInformation.titleSectionTitleElement.addEventListener('click', this.boundSelectTitle);
                    this.titleStyleInformation.titleSectionElement.append(this.titleStyleInformation.titleSectionTitleElement);
                    this.titleStyleInformation.titleSectionElement.append(title.label);
                    var subtitle = this.createRadio('title-section-subtitle', 'title', 'subtitle', this.gridChart.getLocaleText('Subtitle'));
                    this.titleStyleInformation.titleSectionSubtitleElement = subtitle.input;
                    this.titleStyleInformation.titleSectionSubtitleElement.addEventListener('click', this.boundSelectTitle);
                    this.titleStyleInformation.titleSectionElement.append(this.titleStyleInformation.titleSectionSubtitleElement);
                    this.titleStyleInformation.titleSectionElement.append(subtitle.label);
                    this.titleStyleInformation.titleSectionTitleElement.checked = this.titleSection === 'Title';
                    this.titleStyleInformation.titleSectionSubtitleElement.checked = this.titleSection === 'Subtitle';
                }
            }
            else if (this.titleStyleInformation.titleSectionElement) {
                this.titleStyleInformation.titleSectionTitleElement.removeEventListener('click', this.boundSelectTitle);
                this.titleStyleInformation.titleSectionTitleElement.remove();
                this.titleStyleInformation.titleSectionTitleElement = null;
                this.titleStyleInformation.titleSectionSubtitleElement.removeEventListener('click', this.boundSelectTitle);
                this.titleStyleInformation.titleSectionSubtitleElement.remove();
                this.titleStyleInformation.titleSectionSubtitleElement = null;
                this.boundSelectTitle = null;
                this.titleStyleInformation.titleSectionElement.remove();
                this.titleStyleInformation.titleSectionElement = null;
            }
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.titleTitleStyle) {
                    this.titleStyleInformation.titleTitleStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.titleStyleInformation.titleTitleStyle.innerText = this.gridChart.getLocaleText('Title');
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.titleTitleStyle);
                }
            }
            else if (this.titleStyleInformation.titleTitleStyle) {
                this.titleStyleInformation.titleTitleStyle.remove();
                this.titleStyleInformation.titleTitleStyle = null;
            }
            if (this.gridChart.chartType) {
                if (this.titleStyleInformation.titleTextBox) {
                    this.titleStyleInformation.titleTextBox.value = this.titleSection === 'Title' ? this.gridChart.currentChart.title
                        : this.gridChart.currentChart.subTitle;
                }
                else {
                    this.titleStyleInformation.titleElement = createElement('input');
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.titleElement);
                    this.titleStyleInformation.titleTextBox = new TextBox({
                        value: this.titleSection === 'Title' ? this.gridChart.currentChart.title
                            : this.gridChart.currentChart.subTitle,
                        input: function (args) {
                            var chartChanges = {};
                            var accumulationChartChanges = {};
                            if (_this.titleSection === 'Title') {
                                chartChanges.title = args.value;
                                accumulationChartChanges.title = args.value;
                            }
                            else {
                                chartChanges.subTitle = args.value;
                                accumulationChartChanges.subTitle = args.value;
                            }
                            var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.titleStyleInformation.titleTextBox.appendTo(this.titleStyleInformation.titleElement);
                }
            }
            else if (this.titleStyleInformation.titleTextBox) {
                this.titleStyleInformation.titleTextBox.destroy();
                this.titleStyleInformation.titleTextBox = null;
                this.titleStyleInformation.titleElement.remove();
                this.titleStyleInformation.titleElement = null;
            }
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.fontTitleStyle) {
                    this.titleStyleInformation.fontTitleStyle = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    this.titleStyleInformation.fontTitleStyle.innerText = this.gridChart.getLocaleText('Font');
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.fontTitleStyle);
                }
            }
            else if (this.titleStyleInformation.fontTitleStyle) {
                this.titleStyleInformation.fontTitleStyle.remove();
                this.titleStyleInformation.fontTitleStyle = null;
            }
            if (this.gridChart.chartType) {
                var value = this.titleSection === 'Title' ? this.gridChart.currentChart.titleStyle.fontFamily
                    : this.gridChart.currentChart.subTitleStyle.fontFamily;
                value = isNullOrUndefined(value) ? 'Default' : value;
                if (this.titleStyleInformation.titleFontDropDownList) {
                    this.titleStyleInformation.titleFontDropDownList.value = value;
                    this.titleStyleInformation.titleFontDropDownList.refresh();
                }
                else {
                    this.titleStyleInformation.titleFontElement = createElement('input');
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.titleFontElement);
                    this.titleStyleInformation.titleFontDropDownList = new DropDownList({
                        dataSource: this.font,
                        value: value,
                        change: function (args) {
                            var chartChanges = {};
                            var accumulationChartChanges = {};
                            var chartValue = args.value === 'Default' ? null : args.value;
                            if (_this.titleSection === 'Title') {
                                chartChanges.titleStyle = {};
                                chartChanges.titleStyle.fontFamily = chartValue;
                                accumulationChartChanges.titleStyle = {};
                                accumulationChartChanges.titleStyle.fontFamily = chartValue;
                            }
                            else {
                                chartChanges.subTitleStyle = {};
                                chartChanges.subTitleStyle.fontFamily = chartValue;
                                accumulationChartChanges.subTitleStyle = {};
                                accumulationChartChanges.subTitleStyle.fontFamily = chartValue;
                            }
                            var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.titleStyleInformation.titleFontDropDownList.appendTo(this.titleStyleInformation.titleFontElement);
                }
            }
            else if (this.titleStyleInformation.titleFontDropDownList) {
                this.titleStyleInformation.titleFontDropDownList.destroy();
                this.titleStyleInformation.titleFontDropDownList = null;
                this.titleStyleInformation.titleFontElement.remove();
                this.titleStyleInformation.titleFontElement = null;
            }
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.titleSizeColorContainer) {
                    this.titleStyleInformation.titleSizeColorContainer = createElement('div', { className: 'e-grid-dialogchart-display-flex' });
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.titleSizeColorContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.titleSizeContainer) {
                    this.titleStyleInformation.titleSizeContainer = createElement('div');
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Size');
                    this.titleStyleInformation.titleSizeContainer.append(text);
                    this.titleStyleInformation.titleSizeColorContainer.append(this.titleStyleInformation.titleSizeContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (this.titleStyleInformation.titleSizeDropDownList) {
                    this.titleStyleInformation.titleSizeDropDownList.value = this.titleSection === 'Title' ? this.gridChart.currentChart.titleStyle.size.replace('px', '')
                        : this.gridChart.currentChart.subTitleStyle.size.replace('px', '');
                    this.titleStyleInformation.titleSizeDropDownList.refresh();
                }
                else {
                    this.titleStyleInformation.titleSizeElement = createElement('input');
                    this.titleStyleInformation.titleSizeContainer.append(this.titleStyleInformation.titleSizeElement);
                    this.titleStyleInformation.titleSizeDropDownList = new DropDownList({
                        dataSource: this.fontSize,
                        value: this.titleSection === 'Title' ? this.gridChart.currentChart.titleStyle.size.replace('px', '')
                            : this.gridChart.currentChart.subTitleStyle.size.replace('px', ''),
                        change: function (args) {
                            var chartChanges = {};
                            var accumulationChartChanges = {};
                            if (_this.titleSection === 'Title') {
                                chartChanges.titleStyle = {};
                                chartChanges.titleStyle.size = args.value + 'px';
                                accumulationChartChanges.titleStyle = {};
                                accumulationChartChanges.titleStyle.size = args.value + 'px';
                            }
                            else {
                                chartChanges.subTitleStyle = {};
                                chartChanges.subTitleStyle.size = args.value + 'px';
                                accumulationChartChanges.subTitleStyle = {};
                                accumulationChartChanges.subTitleStyle.size = args.value + 'px';
                            }
                            var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            _this.gridChart.refresh(changes);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.titleStyleInformation.titleSizeDropDownList.appendTo(this.titleStyleInformation.titleSizeElement);
                }
            }
            else if (this.titleStyleInformation.titleSizeDropDownList) {
                this.titleStyleInformation.titleSizeDropDownList.destroy();
                this.titleStyleInformation.titleSizeDropDownList = null;
                this.titleStyleInformation.titleSizeElement.remove();
                this.titleStyleInformation.titleSizeElement = null;
            }
            if (!this.gridChart.chartType && this.titleStyleInformation.titleSizeContainer) {
                this.titleStyleInformation.titleSizeContainer.remove();
                this.titleStyleInformation.titleSizeContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.titleStyleInformation.colorTitleStyle) {
                    this.titleStyleInformation.colorTitleStyle = createElement('div', { className: 'e-grid-dialogchart-intermediate-spacer' });
                    var color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.titleStyleInformation.colorTitleStyle.append(color);
                    this.titleStyleInformation.titleSizeColorContainer.append(this.titleStyleInformation.colorTitleStyle);
                }
            }
            if (this.gridChart.chartType) {
                if (this.titleStyleInformation.titleColorPicker) {
                    this.titleStyleInformation.titleColorPicker.value = this.titleSection === 'Title' ? this.gridChart.currentChart.titleStyle.color
                        : this.gridChart.currentChart.subTitleStyle.color;
                    this.titleStyleInformation.titleColorPicker.refresh();
                }
                else {
                    this.titleStyleInformation.titleColorElement = createElement('input');
                    this.titleStyleInformation.colorTitleStyle.append(this.titleStyleInformation.titleColorElement);
                    this.titleStyleInformation.titleColorPicker = new ColorPicker({
                        value: this.titleSection === 'Title' ? this.gridChart.currentChart.titleStyle.color
                            : this.gridChart.currentChart.subTitleStyle.color,
                        change: function (args) {
                            setTimeout(function () {
                                var chartChanges = {};
                                var accumulationChartChanges = {};
                                if (_this.titleSection === 'Title') {
                                    chartChanges.titleStyle = {};
                                    chartChanges.titleStyle.color = args.value;
                                    accumulationChartChanges.titleStyle = {};
                                    accumulationChartChanges.titleStyle.color = args.value;
                                }
                                else {
                                    chartChanges.subTitleStyle = {};
                                    chartChanges.subTitleStyle.color = args.value;
                                    accumulationChartChanges.subTitleStyle = {};
                                    accumulationChartChanges.subTitleStyle.color = args.value;
                                }
                                var changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.titleStyleInformation.titleColorPicker.appendTo(this.titleStyleInformation.titleColorElement);
                }
            }
            else if (this.titleStyleInformation.titleColorPicker) {
                this.titleStyleInformation.titleColorPicker.destroy();
                this.titleStyleInformation.titleColorPicker = null;
                this.titleStyleInformation.titleColorElement.remove();
                this.titleStyleInformation.titleColorElement = null;
            }
            if (!this.gridChart.chartType && this.titleStyleInformation.colorTitleStyle) {
                this.titleStyleInformation.colorTitleStyle.remove();
                this.titleStyleInformation.colorTitleStyle = null;
            }
            if (!this.gridChart.chartType && this.titleStyleInformation.titleSizeColorContainer) {
                this.titleStyleInformation.titleSizeColorContainer.remove();
                this.titleStyleInformation.titleSizeColorContainer = null;
            }
        }
    };
    ChartPanel.prototype.renderChartStyleList = function () {
        var _this = this;
        if (this.formatTabInformation.chartStyleContainer) {
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginHeaderChartStyle) {
                    this.chartStyleInformation.marginHeaderChartStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                    this.chartStyleInformation.marginHeaderChartStyle.innerText = this.gridChart.getLocaleText('Margin');
                    this.formatTabInformation.chartStyleContainer.append(this.chartStyleInformation.marginHeaderChartStyle);
                }
            }
            else if (this.chartStyleInformation.marginHeaderChartStyle) {
                this.chartStyleInformation.marginHeaderChartStyle.remove();
                this.chartStyleInformation.marginHeaderChartStyle = null;
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginTopBottomContainer) {
                    this.chartStyleInformation.marginTopBottomContainer = createElement('div', { className: 'e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    this.formatTabInformation.chartStyleContainer.append(this.chartStyleInformation.marginTopBottomContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginTopContainer) {
                    this.chartStyleInformation.marginTopContainer = createElement('div');
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Top');
                    this.chartStyleInformation.marginTopContainer.append(text);
                    this.chartStyleInformation.marginTopBottomContainer.append(this.chartStyleInformation.marginTopContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (this.chartStyleInformation.marginTopNumericTextBoxObject) {
                    this.chartStyleInformation.marginTopNumericTextBoxObject.value = this.gridChart.currentChart.margin.top;
                }
                else {
                    this.chartStyleInformation.marginTopElement = createElement('input');
                    this.chartStyleInformation.marginTopContainer.append(this.chartStyleInformation.marginTopElement);
                    this.chartStyleInformation.marginTopNumericTextBoxObject = new NumericTextBox({
                        format: '##',
                        value: this.gridChart.currentChart.margin.top,
                        change: function (args) {
                            var changes = {
                                chart: { margin: { top: args.value } },
                                accumulationChart: { margin: { top: args.value } }
                            };
                            setTimeout(function () {
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.chartStyleInformation.marginTopNumericTextBoxObject.appendTo(this.chartStyleInformation.marginTopElement);
                }
            }
            else if (this.chartStyleInformation.marginTopNumericTextBoxObject) {
                this.chartStyleInformation.marginTopNumericTextBoxObject.destroy();
                this.chartStyleInformation.marginTopNumericTextBoxObject = null;
                this.chartStyleInformation.marginTopElement.remove();
                this.chartStyleInformation.marginTopElement = null;
            }
            if (!this.gridChart.chartType && this.chartStyleInformation.marginTopContainer) {
                this.chartStyleInformation.marginTopContainer.remove();
                this.chartStyleInformation.marginTopContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginBottomContainer) {
                    this.chartStyleInformation.marginBottomContainer = createElement('div', { className: 'e-grid-dialogchart-intermediate-spacer' });
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Bottom');
                    this.chartStyleInformation.marginBottomContainer.append(text);
                    this.chartStyleInformation.marginTopBottomContainer.append(this.chartStyleInformation.marginBottomContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (this.chartStyleInformation.marginBottomNumericTextBoxObject) {
                    this.chartStyleInformation.marginBottomNumericTextBoxObject.value = this.gridChart.currentChart.margin.bottom;
                }
                else {
                    this.chartStyleInformation.marginBottomElement = createElement('input');
                    this.chartStyleInformation.marginBottomContainer.append(this.chartStyleInformation.marginBottomElement);
                    this.chartStyleInformation.marginBottomNumericTextBoxObject = new NumericTextBox({
                        format: '##',
                        value: this.gridChart.currentChart.margin.bottom,
                        change: function (args) {
                            var changes = {
                                chart: { margin: { bottom: args.value } },
                                accumulationChart: { margin: { bottom: args.value } }
                            };
                            setTimeout(function () {
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.chartStyleInformation.marginBottomNumericTextBoxObject.appendTo(this.chartStyleInformation.marginBottomElement);
                }
            }
            else if (this.chartStyleInformation.marginBottomNumericTextBoxObject) {
                this.chartStyleInformation.marginBottomNumericTextBoxObject.destroy();
                this.chartStyleInformation.marginBottomNumericTextBoxObject = null;
                this.chartStyleInformation.marginBottomElement.remove();
                this.chartStyleInformation.marginBottomElement = null;
            }
            if (!this.gridChart.chartType && this.chartStyleInformation.marginBottomContainer) {
                this.chartStyleInformation.marginBottomContainer.remove();
                this.chartStyleInformation.marginBottomContainer = null;
            }
            if (!this.gridChart.chartType && this.chartStyleInformation.marginTopBottomContainer) {
                this.chartStyleInformation.marginTopBottomContainer.remove();
                this.chartStyleInformation.marginTopBottomContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginRightLeftContainer) {
                    this.chartStyleInformation.marginRightLeftContainer = createElement('div', { className: 'e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    this.formatTabInformation.chartStyleContainer.append(this.chartStyleInformation.marginRightLeftContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginRightContainer) {
                    this.chartStyleInformation.marginRightContainer = createElement('div');
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Right');
                    this.chartStyleInformation.marginRightContainer.append(text);
                    this.chartStyleInformation.marginRightLeftContainer.append(this.chartStyleInformation.marginRightContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (this.chartStyleInformation.marginRightNumericTextBoxObject) {
                    this.chartStyleInformation.marginRightNumericTextBoxObject.value = this.gridChart.currentChart.margin.right;
                }
                else {
                    this.chartStyleInformation.marginRightElement = createElement('input');
                    this.chartStyleInformation.marginRightContainer.append(this.chartStyleInformation.marginRightElement);
                    this.chartStyleInformation.marginRightNumericTextBoxObject = new NumericTextBox({
                        format: '##',
                        value: this.gridChart.currentChart.margin.right,
                        change: function (args) {
                            var changes = {
                                chart: { margin: { right: args.value } },
                                accumulationChart: { margin: { right: args.value } }
                            };
                            setTimeout(function () {
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.chartStyleInformation.marginRightNumericTextBoxObject.appendTo(this.chartStyleInformation.marginRightElement);
                }
            }
            else if (this.chartStyleInformation.marginRightNumericTextBoxObject) {
                this.chartStyleInformation.marginRightNumericTextBoxObject.destroy();
                this.chartStyleInformation.marginRightNumericTextBoxObject = null;
                this.chartStyleInformation.marginRightElement.remove();
                this.chartStyleInformation.marginRightElement = null;
            }
            if (!this.gridChart.chartType && this.chartStyleInformation.marginRightContainer) {
                this.chartStyleInformation.marginRightContainer.remove();
                this.chartStyleInformation.marginRightContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.marginLeftContainer) {
                    this.chartStyleInformation.marginLeftContainer = createElement('div', { className: 'e-grid-dialogchart-intermediate-spacer' });
                    var text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Left');
                    this.chartStyleInformation.marginLeftContainer.append(text);
                    this.chartStyleInformation.marginRightLeftContainer.append(this.chartStyleInformation.marginLeftContainer);
                }
            }
            if (this.gridChart.chartType) {
                if (this.chartStyleInformation.marginLeftNumericTextBoxObject) {
                    this.chartStyleInformation.marginLeftNumericTextBoxObject.value = this.gridChart.currentChart.margin.left;
                }
                else {
                    this.chartStyleInformation.marginLeftElement = createElement('input');
                    this.chartStyleInformation.marginLeftContainer.append(this.chartStyleInformation.marginLeftElement);
                    this.chartStyleInformation.marginLeftNumericTextBoxObject = new NumericTextBox({
                        format: '##',
                        value: this.gridChart.currentChart.margin.left,
                        change: function (args) {
                            var changes = {
                                chart: { margin: { left: args.value } },
                                accumulationChart: { margin: { left: args.value } }
                            };
                            setTimeout(function () {
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.chartStyleInformation.marginLeftNumericTextBoxObject.appendTo(this.chartStyleInformation.marginLeftElement);
                }
            }
            else if (this.chartStyleInformation.marginLeftNumericTextBoxObject) {
                this.chartStyleInformation.marginLeftNumericTextBoxObject.destroy();
                this.chartStyleInformation.marginLeftNumericTextBoxObject = null;
                this.chartStyleInformation.marginLeftElement.remove();
                this.chartStyleInformation.marginLeftElement = null;
            }
            if (!this.gridChart.chartType && this.chartStyleInformation.marginLeftContainer) {
                this.chartStyleInformation.marginLeftContainer.remove();
                this.chartStyleInformation.marginLeftContainer = null;
            }
            if (!this.gridChart.chartType && this.chartStyleInformation.marginRightLeftContainer) {
                this.chartStyleInformation.marginRightLeftContainer.remove();
                this.chartStyleInformation.marginRightLeftContainer = null;
            }
            if (this.gridChart.chartType) {
                if (!this.chartStyleInformation.colorChartStyle) {
                    this.chartStyleInformation.colorChartStyle = createElement('div', { className: 'e-grid-chart-props-header' });
                    this.chartStyleInformation.colorChartStyle.innerText = this.gridChart.getLocaleText('Color');
                    this.formatTabInformation.chartStyleContainer.append(this.chartStyleInformation.colorChartStyle);
                }
            }
            else if (this.chartStyleInformation.colorChartStyle) {
                this.chartStyleInformation.colorChartStyle.remove();
                this.chartStyleInformation.colorChartStyle = null;
            }
            if (this.gridChart.chartType) {
                if (this.chartStyleInformation.backgroundColorPicker) {
                    this.chartStyleInformation.backgroundColorPicker.value = this.gridChart.currentChart.background;
                    this.chartStyleInformation.backgroundColorPicker.refresh();
                }
                else {
                    this.chartStyleInformation.backgroundColorElement = createElement('input');
                    this.formatTabInformation.chartStyleContainer.append(this.chartStyleInformation.backgroundColorElement);
                    this.chartStyleInformation.backgroundColorPicker = new ColorPicker({
                        value: this.gridChart.currentChart.background,
                        change: function (args) {
                            setTimeout(function () {
                                var changes = {
                                    chart: { background: args.value },
                                    accumulationChart: { background: args.value }
                                };
                                _this.gridChart.refresh(changes);
                            }, 0);
                        },
                        cssClass: this.gridChart.chartSettings.cssClass,
                        locale: this.gridChart.chartSettings.locale,
                        enableRtl: this.gridChart.enableRtl
                    });
                    this.chartStyleInformation.backgroundColorPicker.appendTo(this.chartStyleInformation.backgroundColorElement);
                }
            }
            else if (this.chartStyleInformation.backgroundColorPicker) {
                this.chartStyleInformation.backgroundColorPicker.destroy();
                this.chartStyleInformation.backgroundColorPicker = null;
                this.chartStyleInformation.backgroundColorElement.remove();
                this.chartStyleInformation.backgroundColorElement = null;
            }
        }
    };
    /**
     * @hidden
     * @returns {void}
     */
    ChartPanel.prototype.destroy = function () {
        this.deletedSeries = null;
        this.axes = null;
        this.stylingSeries = null;
        this.titleSection = null;
        this.formatTab();
        this.dataTab();
        this.chartTab();
        this.axesStyleInformation = null;
        this.seriesStyleInformation = null;
        this.legendStyleInformation = null;
        this.titleStyleInformation = null;
        this.chartStyleInformation = null;
        this.formatTabInformation = null;
        this.dataTabInformation = null;
        this.formatTabElement.remove();
        this.formatTabElement = null;
        this.dataTabElement.remove();
        this.dataTabElement = null;
        this.chartTabElement.remove();
        this.chartTabElement = null;
        this.tab.destroy();
        this.tab = null;
        this.tabElement.remove();
        this.tabElement = null;
    };
    return ChartPanel;
}());
export { ChartPanel };
