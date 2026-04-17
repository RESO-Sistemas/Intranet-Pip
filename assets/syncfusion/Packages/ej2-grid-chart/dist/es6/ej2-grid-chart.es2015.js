import { createElement, closest, isNullOrUndefined, extend, L10n } from '@syncfusion/ej2-base';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { ContextMenu, Tab, Accordion } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TextBox, ColorPicker, NumericTextBox } from '@syncfusion/ej2-inputs';
import { Grid, Edit, Toolbar, CommandColumn, RowDD } from '@syncfusion/ej2-grids';
import { Chart, Legend, Category, BarSeries, StackingBarSeries, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, AreaSeries, StackingAreaSeries, ScatterSeries, Tooltip, DataLabel, Export, Zoom, DateTime, ScrollBar, AccumulationChart, PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip } from '@syncfusion/ej2-charts';
import { Dialog } from '@syncfusion/ej2-popups';

class ChartExport {
    constructor(gridChart) {
        this.menuId = 'e_grid_chart_export_cmenu_';
        this.gridChart = gridChart;
        this.initProperties();
        return this;
    }
    initProperties() {
        this.defaultExportMenuItems = [
            { text: this.gridChart.getLocaleText('Print'), id: this.generateID('Print'), iconCss: 'e-grid-chart-print e-icons' },
            { text: this.gridChart.getLocaleText('JPEG'), id: this.generateID('JPEG'), iconCss: 'e-grid-chart-jpeg e-icons' },
            { text: this.gridChart.getLocaleText('PNG'), id: this.generateID('PNG'), iconCss: 'e-grid-chart-png e-icons' },
            { text: this.gridChart.getLocaleText('SVG'), id: this.generateID('SVG'), iconCss: 'e-grid-chart-svg e-icons' },
            { text: this.gridChart.getLocaleText('PDF'), id: this.generateID('PDF'), iconCss: 'e-grid-chart-pdf e-icons' },
            { text: this.gridChart.getLocaleText('XLSX'), id: this.generateID('XLSX'), iconCss: 'e-grid-chart-xlsx e-icons' },
            { text: this.gridChart.getLocaleText('CSV'), id: this.generateID('CSV'), iconCss: 'e-grid-chart-csv e-icons' }
        ];
    }
    /**
     * @hidden
     * @returns {void}
     */
    addExportButton() {
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
        let exportMenuItems = [];
        if (this.gridChart.chartSettings.chartExportItems.length) {
            for (const item of this.gridChart.chartSettings.chartExportItems) {
                const tempItem = this.defaultExportMenuItems.find((data) => data.text === item);
                if (tempItem) {
                    exportMenuItems.push(tempItem);
                }
            }
        }
        else {
            exportMenuItems = this.defaultExportMenuItems;
        }
        this.exportMenu = new ContextMenu({
            items: exportMenuItems,
            select: (args) => {
                if (this.getKeyFromId(args.item.id) === 'Print') {
                    this.gridChart.currentChart.print();
                }
                else {
                    this.gridChart.currentChart.exportModule.export(this.getKeyFromId(args.item.id), 'Chart');
                }
            },
            cssClass: this.gridChart.chartSettings.cssClass,
            locale: this.gridChart.chartSettings.locale,
            enableRtl: this.gridChart.enableRtl,
            target: '#e-grid-chart-export-btn',
            beforeOpen: (args) => {
                if (args && args.event && args.event.button === 2) {
                    args.cancel = true;
                }
            }
        });
        this.exportMenu.appendTo(this.exportMenuElement);
        this.boundOpenExportMenu = this.openExportMenu.bind(this);
        this.exportButton.element.addEventListener('click', this.boundOpenExportMenu);
    }
    openExportMenu(args) {
        this.exportMenu.open(args.pageY, args.pageX, args.target);
    }
    generateID(item) {
        return this.menuId + item;
    }
    getKeyFromId(id) {
        return id.replace(this.menuId, '');
    }
    /**
     * @hidden
     * @returns {void}
     */
    destroy() {
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
    }
}

class ChartPanel {
    constructor(gridChart) {
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
    tabRenderer() {
        this.chartTab();
        this.dataTab();
        this.formatTab();
    }
    /**
     * @hidden
     * @returns {void}
     */
    initializeLayout() {
        this.tabElement = createElement('div');
        this.gridChart.tabContainer.append(this.tabElement);
        this.chartTabElement = createElement('div');
        this.dataTabElement = createElement('div', { className: 'e-grid-dialog-data-tab-container' });
        this.formatTabElement = createElement('div', { className: 'e-grid-dialog-format-tab-container' });
        this.addTab();
    }
    addTab() {
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
            selected: (args) => {
                if (args.selectedIndex === 1 && this.dataTabInformation.seriesGrid) {
                    this.dataTabInformation.seriesGrid.freezeRefresh();
                }
            },
            loadOn: 'Init',
            cssClass: this.gridChart.chartSettings.cssClass,
            locale: this.gridChart.chartSettings.locale,
            enableRtl: this.gridChart.enableRtl
        });
        this.tab.appendTo(this.tabElement);
    }
    getChartList() {
        return [].slice.call(this.chartListAccordion.element.querySelectorAll('.e-grid-chart-list'));
    }
    getCustomMenuItems(contextMenuItems) {
        let chartItem = [];
        for (const item of contextMenuItems) {
            if (item.items && item.items.length) {
                chartItem = [...chartItem, ...this.getCustomMenuItems(item.items)];
            }
            else if (item && item.id) {
                const text = item.id.replace(this.parent.element.id + '_cmenu_', '');
                if (this.defaultMenuItems.indexOf(text) !== -1) {
                    chartItem.push(item);
                }
            }
        }
        return chartItem;
    }
    getOrderedChartItems(menuItems) {
        let chartItem = [];
        let groupedItems = {
            LineChart: [],
            AreaChart: [],
            ColumnChart: [],
            BarChart: [],
            ScatterChart: [],
            PieChart: []
        };
        for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];
            const chartType = this.chartTypeMap[item.id.replace(this.parent.element.id + '_cmenu_', '')];
            if (chartType) {
                groupedItems[chartType].push(item);
            }
        }
        for (const chartType in groupedItems) {
            if (groupedItems[chartType].length > 0) {
                let item = {
                    id: chartType,
                    items: groupedItems[chartType]
                };
                chartItem.push(item);
            }
        }
        return chartItem;
    }
    chartTab() {
        const gridObj = this.parent;
        const contextMenuModule = gridObj.contextMenuModule;
        if (this.gridChart.chartType) {
            if (this.chartListAccordion) {
                const chartList = this.getChartList();
                const previousSelectedChart = chartList
                    .find((element) => element.classList.contains('e-grid-chart-list-selected'));
                previousSelectedChart.classList.remove('e-grid-chart-list-selected');
                const currentSelectedChart = chartList
                    .find((element) => element.getAttribute('chartType') === this.gridChart.chartType);
                currentSelectedChart.classList.add('e-grid-chart-list-selected');
            }
            else {
                this.boundChangeChartType = (args) => {
                    const target = args.target.classList.contains('e-grid-chart-list')
                        ? args.target : closest(args.target, '.e-grid-chart-list');
                    this.gridChart.previousChartType = this.gridChart.chartType;
                    this.gridChart.chartType = target.getAttribute('charttype');
                    const chartChanges = {};
                    if (this.gridChart.isChart()) {
                        chartChanges.series = [...this.gridChart.chart.series];
                        for (let i = 0; i < chartChanges.series.length; i++) {
                            chartChanges.series[parseInt(i.toString(), 10)].type = this.gridChart.chartType;
                        }
                    }
                    const accumulationChartChanges = {};
                    if (this.gridChart.isAccumulationChart()) {
                        accumulationChartChanges.series = [...this.gridChart.accumulationChart.series];
                        for (let i = 0; i < accumulationChartChanges.series.length; i++) {
                            accumulationChartChanges.series[parseInt(i.toString(), 10)].type = this.gridChart.chartType;
                        }
                    }
                    const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                    this.gridChart.refresh(changes);
                };
                const availableChartItems = this.getCustomMenuItems(contextMenuModule.contextMenu.items);
                const chartItem = this.getOrderedChartItems(availableChartItems);
                this.chartListElement = createElement('div');
                this.chartTabElement.append(this.chartListElement);
                this.chartListAccordion = new Accordion({
                    expanding: (args) => {
                        const content = args.content.firstChild;
                        if (!content.querySelector('.e-grid-chart-list')) {
                            const chartType = content.innerText;
                            content.innerHTML = '';
                            const chartInfo = chartItem
                                .find((item) => contextMenuModule.getKeyFromId(item.id) === chartType);
                            if (chartInfo.items.length) {
                                for (const item of chartInfo.items) {
                                    this.createChartList(item, content);
                                }
                            }
                            else {
                                this.createChartList(chartInfo, content);
                            }
                        }
                    },
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                for (const item of chartItem) {
                    const key = contextMenuModule.getKeyFromId(item.id);
                    const localekey = key === 'Pie' ? 'PieChart' : key === 'Scatter' ? 'ScatterChart' : key;
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
            const chartList = this.getChartList();
            for (let i = 0; i < chartList.length; i++) {
                let element = chartList[parseInt(i.toString(), 10)];
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
    }
    createChartList(item, target) {
        const gridObj = this.parent;
        const contextMenuModule = gridObj.contextMenuModule;
        const chartType = contextMenuModule.getKeyFromId(item.id);
        const infoElement = createElement('div', { className: 'e-grid-chart-list', attrs: { charttype: chartType } });
        infoElement.addEventListener('click', this.boundChangeChartType);
        const icon = createElement('span', { className: item.iconCss });
        const text = createElement('span', { className: 'e-grid-chart-text' });
        text.innerText = this.gridChart.getLocaleText(chartType);
        infoElement.append(icon);
        infoElement.append(text);
        target.append(infoElement);
        if (this.gridChart.chartType === chartType) {
            infoElement.classList.add('e-grid-chart-list-selected');
        }
    }
    dataTab() {
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
                    change: (args) => {
                        const chartChanges = { series: [...this.gridChart.chart.series] };
                        for (let i = 0; i < chartChanges.series.length; i++) {
                            chartChanges.series[parseInt(i.toString(), 10)].xName = args.value;
                        }
                        const accumulationChartChanges = { series: [...this.gridChart.accumulationChart.series] };
                        for (let i = 0; i < accumulationChartChanges.series.length; i++) {
                            accumulationChartChanges.series[parseInt(i.toString(), 10)].xName = args.value;
                        }
                        const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                        this.gridChart.refresh(changes);
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
                    .map((series) => ({ Series: series.yName }));
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
                    dataBound: () => {
                        this.dataTabInformation.seriesGrid.getHeaderTable().classList.add('e-hide');
                    },
                    allowKeyboard: false,
                    actionComplete: (args) => {
                        if (args.requestType === 'delete') {
                            setTimeout(() => {
                                const newArray = [...this.gridChart.currentChart.series];
                                const index = newArray
                                    .findIndex((data) => data.yName === args.data[0].Series);
                                const [deletedItem] = newArray.splice(index, 1);
                                this.deletedSeries.push(deletedItem);
                                this.setSeriesGridAction();
                                this.dataTabInformation.seriesGrid.freezeRefresh();
                                const chartChanges = { series: newArray };
                                const changes = { chart: chartChanges, accumulationChart: {} };
                                this.gridChart.refresh(changes);
                            }, 0);
                        }
                    },
                    toolbarClick: (args) => {
                        if (args.item.id === 'series_grid_add') {
                            args.cancel = true;
                            setTimeout(() => {
                                const newArray = [...this.gridChart.currentChart.series];
                                this.deletedSeries[0].type = this.gridChart.chartType;
                                newArray.push(this.deletedSeries[0]);
                                this.deletedSeries.shift();
                                this.dataTabInformation.seriesGrid.dataSource = newArray
                                    .map((series) => ({ Series: series.yName }));
                                this.setSeriesGridAction();
                                this.dataTabInformation.seriesGrid.freezeRefresh();
                                const chartChanges = { series: newArray };
                                const changes = { chart: chartChanges, accumulationChart: {} };
                                this.gridChart.refresh(changes);
                            }, 0);
                        }
                    },
                    rowDrop: (args) => {
                        if (args.fromIndex !== args.dropIndex) {
                            setTimeout(() => {
                                const newArray = [...this.gridChart.currentChart.series];
                                const [movedItem] = newArray.splice(args.fromIndex, 1);
                                newArray.splice(args.dropIndex, 0, movedItem);
                                const chartChanges = { series: newArray };
                                const changes = { chart: chartChanges, accumulationChart: {} };
                                this.gridChart.refresh(changes);
                            }, 0);
                        }
                    },
                    cssClass: this.gridChart.chartSettings.cssClass,
                    locale: this.gridChart.chartSettings.locale,
                    enableRtl: this.gridChart.enableRtl
                });
                this.dataTabInformation.seriesGrid.dataSource = this.gridChart.currentChart.series
                    .map((series) => ({ Series: series.yName }));
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
                    change: (args) => {
                        const accumulationChartChanges = {
                            series: [...this.gridChart.currentChart.series]
                        };
                        for (let i = 0; i < accumulationChartChanges.series.length; i++) {
                            accumulationChartChanges.series[parseInt(i.toString(), 10)].yName = args.value;
                        }
                        const changes = { chart: {}, accumulationChart: accumulationChartChanges };
                        this.gridChart.refresh(changes);
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
    }
    setSeriesGridAction() {
        const columns = [{ field: 'Series', isPrimaryKey: true }];
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
    }
    formatTab() {
        if (this.gridChart.chartType) {
            if (this.formatTabInformation.chartStyleAccordion) {
                this.renderChartStyleList();
            }
            else {
                this.formatTabInformation.chartStyleElement = createElement('div');
                this.formatTabElement.append(this.formatTabInformation.chartStyleElement);
                this.formatTabInformation.chartStyleAccordion = new Accordion({
                    expanding: (args) => {
                        const content = args.content.firstChild;
                        if (!this.formatTabInformation.chartStyleContainer) {
                            content.innerHTML = '';
                            this.formatTabInformation.chartStyleContainer = createElement('div');
                            content.append(this.formatTabInformation.chartStyleContainer);
                            this.renderChartStyleList();
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
                    expanding: (args) => {
                        const content = args.content.firstChild;
                        if (!this.formatTabInformation.titleStyleContainer) {
                            content.innerHTML = '';
                            this.formatTabInformation.titleStyleContainer = createElement('div');
                            content.append(this.formatTabInformation.titleStyleContainer);
                            this.renderTitleStyleList();
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
                    expanding: (args) => {
                        const content = args.content.firstChild;
                        if (!this.formatTabInformation.legendStyleContainer) {
                            content.innerHTML = '';
                            this.formatTabInformation.legendStyleContainer = createElement('div');
                            content.append(this.formatTabInformation.legendStyleContainer);
                            this.renderLegendStyleList();
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
                    expanding: (args) => {
                        const content = args.content.firstChild;
                        if (!this.formatTabInformation.seriesStyleContainer) {
                            content.innerHTML = '';
                            this.formatTabInformation.seriesStyleContainer = createElement('div');
                            content.append(this.formatTabInformation.seriesStyleContainer);
                            this.renderSeriesStyleList();
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
                    expanding: (args) => {
                        const content = args.content.firstChild;
                        if (!this.formatTabInformation.axesStyleContainer) {
                            content.innerHTML = '';
                            this.formatTabInformation.axesStyleContainer = createElement('div');
                            content.append(this.formatTabInformation.axesStyleContainer);
                            this.renderAxesStyleList();
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
    }
    renderAxesStyleList() {
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
                    this.boundSelectAxes = (args) => {
                        const target = args.target;
                        if (target.value === 'categoryaxis') {
                            this.axes = 'Category';
                        }
                        else if (target.value === 'valueaxis') {
                            this.axes = 'Value';
                        }
                        this.renderAxesStyleList();
                    };
                    this.axesStyleInformation.axesElement = createElement('div', { className: 'e-btn-group e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    if (this.gridChart.enableRtl) {
                        this.axesStyleInformation.axesElement.classList.add('e-rtl');
                    }
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesElement);
                    const categoryAxis = this.createRadio('axes-categoryaxis', 'axes', 'categoryaxis', this.gridChart.getLocaleText('Category'));
                    this.axesStyleInformation.axesCategoryElement = categoryAxis.input;
                    this.axesStyleInformation.axesCategoryElement.addEventListener('click', this.boundSelectAxes);
                    this.axesStyleInformation.axesElement.append(this.axesStyleInformation.axesCategoryElement);
                    this.axesStyleInformation.axesElement.append(categoryAxis.label);
                    const valueAxis = this.createRadio('axes-valueaxis', 'axes', 'valueaxis', this.gridChart.getLocaleText('Value'));
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
                const checked = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.isInversed
                    : this.gridChart.currentChart.primaryYAxis.isInversed;
                if (this.axesStyleInformation.axesInversedCheckBox) {
                    this.axesStyleInformation.axesInversedCheckBox.checked = checked;
                }
                else {
                    this.axesStyleInformation.axesInversedElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesInversedElement);
                    this.axesStyleInformation.axesInversedCheckBox = new CheckBox({
                        checked,
                        label: this.gridChart.getLocaleText('ReverseOrder'),
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        change: (args) => {
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { isInversed: args.checked };
                            }
                            else {
                                chartChanges.primaryYAxis = { isInversed: args.checked };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
                const value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.title
                    : this.gridChart.currentChart.primaryYAxis.title;
                if (this.axesStyleInformation.axesTitleTextBox) {
                    this.axesStyleInformation.axesTitleTextBox.value = value;
                }
                else {
                    this.axesStyleInformation.axesTitleElement = createElement('input');
                    this.formatTabInformation.axesStyleContainer.append(this.axesStyleInformation.axesTitleElement);
                    this.axesStyleInformation.axesTitleTextBox = new TextBox({
                        cssClass: this.gridChart.chartSettings.cssClass ? 'e-grid-dialogchart-bottom-spacer ' + this.gridChart.chartSettings.cssClass : 'e-grid-dialogchart-bottom-spacer',
                        value,
                        input: (args) => {
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { title: args.value };
                            }
                            else {
                                chartChanges.primaryYAxis = { title: args.value };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
                let value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.titleStyle.fontFamily
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
                        value,
                        change: (args) => {
                            const chartValue = args.value === 'Default' ? null : args.value;
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { titleStyle: { fontFamily: chartValue } };
                            }
                            else {
                                chartChanges.primaryYAxis = { titleStyle: { fontFamily: chartValue } };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Size');
                    this.axesStyleInformation.axesTitleSizeContainer.append(text);
                    this.axesStyleInformation.axesTitleSizeColorContainer.append(this.axesStyleInformation.axesTitleSizeContainer);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                const value = this.axes === 'Category'
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
                        value,
                        change: (args) => {
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { titleStyle: { size: args.value + 'px' } };
                            }
                            else {
                                chartChanges.primaryYAxis = { titleStyle: { size: args.value + 'px' } };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
                    const color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.axesStyleInformation.titleColorAxesStyle.append(color);
                    this.axesStyleInformation.axesTitleSizeColorContainer.append(this.axesStyleInformation.titleColorAxesStyle);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                const value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.titleStyle.color
                    : this.gridChart.currentChart.primaryYAxis.titleStyle.color;
                if (this.axesStyleInformation.axesTitleColorPicker) {
                    this.axesStyleInformation.axesTitleColorPicker.value = value;
                    this.axesStyleInformation.axesTitleColorPicker.refresh();
                }
                else {
                    this.axesStyleInformation.axesTitleColorElement = createElement('input');
                    this.axesStyleInformation.titleColorAxesStyle.append(this.axesStyleInformation.axesTitleColorElement);
                    this.axesStyleInformation.axesTitleColorPicker = new ColorPicker({
                        value,
                        change: (args) => {
                            setTimeout(() => {
                                const chartChanges = {};
                                if (this.axes === 'Category') {
                                    chartChanges.primaryXAxis = { titleStyle: { color: args.value } };
                                }
                                else {
                                    chartChanges.primaryYAxis = { titleStyle: { color: args.value } };
                                }
                                const changes = { chart: chartChanges, accumulationChart: {} };
                                this.gridChart.refresh(changes);
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
                let value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelStyle.fontFamily
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
                        value,
                        change: (args) => {
                            const chartValue = args.value === 'Default' ? null : args.value;
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { labelStyle: { fontFamily: chartValue } };
                            }
                            else {
                                chartChanges.primaryYAxis = { labelStyle: { fontFamily: chartValue } };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    text.innerText = this.gridChart.getLocaleText('Size');
                    this.axesStyleInformation.axesLabelSizeContainer.append(text);
                    this.axesStyleInformation.axesLabelSizeColorContainer.append(this.axesStyleInformation.axesLabelSizeContainer);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                const value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelStyle.size.replace('px', '')
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
                        value,
                        change: (args) => {
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { labelStyle: { size: args.value + 'px' } };
                            }
                            else {
                                chartChanges.primaryYAxis = { labelStyle: { size: args.value + 'px' } };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
                    const color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.axesStyleInformation.labelColorAxesStyle.append(color);
                    this.axesStyleInformation.axesLabelSizeColorContainer.append(this.axesStyleInformation.labelColorAxesStyle);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                const value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelStyle.color
                    : this.gridChart.currentChart.primaryYAxis.labelStyle.color;
                if (this.axesStyleInformation.axesLabelColorPicker) {
                    this.axesStyleInformation.axesLabelColorPicker.value = value;
                    this.axesStyleInformation.axesLabelColorPicker.refresh();
                }
                else {
                    this.axesStyleInformation.axesLabelColorElement = createElement('input');
                    this.axesStyleInformation.labelColorAxesStyle.append(this.axesStyleInformation.axesLabelColorElement);
                    this.axesStyleInformation.axesLabelColorPicker = new ColorPicker({
                        value,
                        change: (args) => {
                            setTimeout(() => {
                                const chartChanges = {};
                                if (this.axes === 'Category') {
                                    chartChanges.primaryXAxis = { labelStyle: { color: args.value } };
                                }
                                else {
                                    chartChanges.primaryYAxis = { labelStyle: { color: args.value } };
                                }
                                const changes = { chart: chartChanges, accumulationChart: {} };
                                this.gridChart.refresh(changes);
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
                const value = this.axes === 'Category' ? this.gridChart.currentChart.primaryXAxis.labelRotation
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
                        value,
                        change: (args) => {
                            const chartChanges = {};
                            if (this.axes === 'Category') {
                                chartChanges.primaryXAxis = { labelRotation: args.value };
                            }
                            else {
                                chartChanges.primaryYAxis = { labelRotation: args.value };
                            }
                            const changes = { chart: chartChanges, accumulationChart: {} };
                            this.gridChart.refresh(changes);
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
    }
    renderSeriesStyleList() {
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
                        change: (args) => {
                            const changes = {
                                chart: { tooltip: { enable: args.checked } },
                                accumulationChart: { tooltip: { enable: args.checked } }
                            };
                            this.gridChart.refresh(changes);
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
                const dataSource = ['All', ...this.gridChart.currentChart.series.map((series) => series.yName)];
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
                        change: (args) => {
                            this.stylingSeries = args.value;
                            this.renderSeriesStyleList();
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
                    const color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
                    color.innerText = this.gridChart.getLocaleText('Color');
                    this.seriesStyleInformation.colorSeriesStyle.append(color);
                    closest(this.seriesStyleInformation.stylingSeriesElement, '.e-control-wrapper').insertAdjacentElement('afterend', this.seriesStyleInformation.colorSeriesStyle);
                }
            }
            if (this.gridChart.chartType && this.gridChart.chartType !== 'Pie') {
                const disabled = this.stylingSeries === 'All';
                const value = disabled ? null
                    : this.gridChart.currentChart.series
                        .find((series) => series.yName === this.stylingSeries).fill;
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
                        change: (args) => {
                            setTimeout(() => {
                                const chartChanges = { series: [...this.gridChart.currentChart.series] };
                                chartChanges.series.find((series) => series.yName === this.stylingSeries).fill = args.value;
                                const changes = { chart: chartChanges, accumulationChart: {} };
                                this.gridChart.refresh(changes);
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
                let checked = false;
                if (this.gridChart.isAccumulationChart() || (this.gridChart.isChart() && this.stylingSeries === 'All')) {
                    if (this.gridChart.isChart()) {
                        checked = !this.gridChart.currentChart.series
                            .some((series) => series.marker.dataLabel.visible === false);
                    }
                    else {
                        checked = !this.gridChart.currentChart.series
                            .some((series) => series.dataLabel.visible === false);
                    }
                }
                else {
                    checked = this.gridChart.currentChart.series
                        .find((series) => series.yName === this.stylingSeries).marker.dataLabel.visible;
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
                        change: (args) => {
                            const chartChanges = {};
                            if (this.gridChart.isChart()) {
                                chartChanges.series = [...this.gridChart.chart.series];
                                for (let i = 0; i < chartChanges.series.length; i++) {
                                    if (this.stylingSeries === 'All'
                                        || this.stylingSeries === chartChanges.series[parseInt(i.toString(), 10)].yName) {
                                        chartChanges.series[parseInt(i.toString(), 10)].marker.dataLabel.visible = args.checked;
                                    }
                                }
                            }
                            const accumulationChartChanges = {};
                            if (this.gridChart.isAccumulationChart()) {
                                accumulationChartChanges.series = [...this.gridChart.accumulationChart.series];
                                for (let i = 0; i < accumulationChartChanges.series.length; i++) {
                                    accumulationChartChanges.series[parseInt(i.toString(), 10)].dataLabel.visible = args.checked;
                                }
                            }
                            const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            this.gridChart.refresh(changes);
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
    }
    renderLegendStyleList() {
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
                        change: (args) => {
                            const changes = {
                                chart: { legendSettings: { visible: args.checked } },
                                accumulationChart: { legendSettings: { visible: args.checked } }
                            };
                            this.gridChart.refresh(changes);
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
                let value = this.gridChart.currentChart.legendSettings.textStyle.fontFamily;
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
                        value,
                        change: (args) => {
                            const chartValue = args.value === 'Default' ? null : args.value;
                            const changes = {
                                chart: { legendSettings: { textStyle: { fontFamily: chartValue } } },
                                accumulationChart: { legendSettings: { textStyle: { fontFamily: chartValue } } }
                            };
                            this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            const changes = {
                                chart: { legendSettings: { textStyle: { size: args.value + 'px' } } },
                                accumulationChart: { legendSettings: { textStyle: { size: args.value + 'px' } } }
                            };
                            this.gridChart.refresh(changes);
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
                    const color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            setTimeout(() => {
                                const changes = {
                                    chart: { legendSettings: { textStyle: { color: args.value } } },
                                    accumulationChart: { legendSettings: { textStyle: { color: args.value } } }
                                };
                                this.gridChart.refresh(changes);
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
                        change: (args) => {
                            const changes = {
                                chart: { legendSettings: { position: args.value } },
                                accumulationChart: { legendSettings: { position: args.value } }
                            };
                            this.gridChart.refresh(changes);
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
    }
    createRadio(id, name, value, labelText) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = id;
        input.name = name;
        input.value = value;
        const label = document.createElement('label');
        label.classList.add('e-btn', 'e-grid-dialogchart-display-flex-50');
        label.htmlFor = id;
        label.textContent = labelText;
        return { input, label };
    }
    renderTitleStyleList() {
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
                    this.boundSelectTitle = (args) => {
                        const target = args.target;
                        if (target.value === 'title') {
                            this.titleSection = 'Title';
                        }
                        else if (target.value === 'subtitle') {
                            this.titleSection = 'Subtitle';
                        }
                        this.renderTitleStyleList();
                    };
                    this.titleStyleInformation.titleSectionElement = createElement('div', { className: 'e-btn-group e-grid-dialogchart-display-flex e-grid-dialogchart-bottom-spacer' });
                    if (this.gridChart.enableRtl) {
                        this.titleStyleInformation.titleSectionElement.classList.add('e-rtl');
                    }
                    this.formatTabInformation.titleStyleContainer.append(this.titleStyleInformation.titleSectionElement);
                    const title = this.createRadio('title-section-title', 'title', 'title', this.gridChart.getLocaleText('Title'));
                    this.titleStyleInformation.titleSectionTitleElement = title.input;
                    this.titleStyleInformation.titleSectionTitleElement.addEventListener('click', this.boundSelectTitle);
                    this.titleStyleInformation.titleSectionElement.append(this.titleStyleInformation.titleSectionTitleElement);
                    this.titleStyleInformation.titleSectionElement.append(title.label);
                    const subtitle = this.createRadio('title-section-subtitle', 'title', 'subtitle', this.gridChart.getLocaleText('Subtitle'));
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
                        input: (args) => {
                            const chartChanges = {};
                            const accumulationChartChanges = {};
                            if (this.titleSection === 'Title') {
                                chartChanges.title = args.value;
                                accumulationChartChanges.title = args.value;
                            }
                            else {
                                chartChanges.subTitle = args.value;
                                accumulationChartChanges.subTitle = args.value;
                            }
                            const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            this.gridChart.refresh(changes);
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
                let value = this.titleSection === 'Title' ? this.gridChart.currentChart.titleStyle.fontFamily
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
                        value,
                        change: (args) => {
                            const chartChanges = {};
                            const accumulationChartChanges = {};
                            const chartValue = args.value === 'Default' ? null : args.value;
                            if (this.titleSection === 'Title') {
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
                            const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            const chartChanges = {};
                            const accumulationChartChanges = {};
                            if (this.titleSection === 'Title') {
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
                            const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                            this.gridChart.refresh(changes);
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
                    const color = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            setTimeout(() => {
                                const chartChanges = {};
                                const accumulationChartChanges = {};
                                if (this.titleSection === 'Title') {
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
                                const changes = { chart: chartChanges, accumulationChart: accumulationChartChanges };
                                this.gridChart.refresh(changes);
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
    }
    renderChartStyleList() {
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            const changes = {
                                chart: { margin: { top: args.value } },
                                accumulationChart: { margin: { top: args.value } }
                            };
                            setTimeout(() => {
                                this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            const changes = {
                                chart: { margin: { bottom: args.value } },
                                accumulationChart: { margin: { bottom: args.value } }
                            };
                            setTimeout(() => {
                                this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            const changes = {
                                chart: { margin: { right: args.value } },
                                accumulationChart: { margin: { right: args.value } }
                            };
                            setTimeout(() => {
                                this.gridChart.refresh(changes);
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
                    const text = createElement('div', { className: 'e-grid-chart-props-normal-header' });
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
                        change: (args) => {
                            const changes = {
                                chart: { margin: { left: args.value } },
                                accumulationChart: { margin: { left: args.value } }
                            };
                            setTimeout(() => {
                                this.gridChart.refresh(changes);
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
                        change: (args) => {
                            setTimeout(() => {
                                const changes = {
                                    chart: { background: args.value },
                                    accumulationChart: { background: args.value }
                                };
                                this.gridChart.refresh(changes);
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
    }
    /**
     * @hidden
     * @returns {void}
     */
    destroy() {
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
    }
}

/**
 * This function performs a recursive deep merge, ensuring that nested objects
 * are merged correctly without replacing entire structures unless necessary.
 *
 * @template T - The type of the target object.
 * @param {T} target - The target object that will receive properties from the source.
 * @param {Partial<T>} source - The source object containing properties to merge into the target.
 * @returns {T} - The merged target object.
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target, source) {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const targetValue = target[`${key}`];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const sourceValue = source[`${key}`];
            if (isObject(targetValue) && isObject(sourceValue)) {
                deepMerge(targetValue, sourceValue);
            }
            else if (sourceValue !== undefined) {
                target[`${key}`] = sourceValue;
            }
        }
    }
    return target;
}
/**
 * Checks whether a value is a plain object (i.e., not null and not an array).
 *
 * @param {any} item - The value to check.
 * @returns {boolean} - `true` if the value is a plain object, otherwise `false`.
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

Chart.Inject(Legend, Category, BarSeries, StackingBarSeries, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, AreaSeries, StackingAreaSeries, ScatterSeries, Tooltip, DataLabel, Export, Zoom, DateTime, ScrollBar);
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, Export);
/**
 * Provides functionality to render, update, and destroy charts linked to a Grid instance.
 */
class GridChart {
    /**
     * Initializes a new instance of the GridChart class.
     *
     * @param {GridChartModel} options - Optional configuration for chart behavior.
     * @hidden
     */
    constructor(options) {
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
    render(chartPopupArgs, chartModel, categorySeries) {
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
        this.initDialogUI(chartPopupArgs, this.destroy.bind(this)).then((args) => {
            this.addMinMaxButton();
            this.element = args.target;
            this.initializeLayout();
            this.renderChart(chartModel);
        });
    }
    addMinMaxButton() {
        this.minMaxButtonElement = createElement('button', { className: 'e-dlg-closeicon-btn e-grid-chart-min-max-btn' });
        const headerContent = this.dialogObj.element.querySelector('.e-dlg-header-content');
        headerContent.querySelector('.e-dlg-closeicon-btn').insertAdjacentElement('afterend', this.minMaxButtonElement);
        this.minMaxButton = new Button({
            iconCss: 'e-grid-chart-max-icon e-icons',
            cssClass: this.chartSettings.cssClass ? 'e-flat ' + this.chartSettings.cssClass : 'e-flat',
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        });
        this.minMaxButton.appendTo(this.minMaxButtonElement);
        this.minMaxButton.element.setAttribute('title', this.getLocaleText('Maximize'));
        this.boundMinMax = (args) => {
            let target = args.target;
            target = target.classList.contains('e-icons') ? target : target.querySelector('.e-icons');
            const maxIcon = target.classList.contains('e-grid-chart-max-icon');
            if (maxIcon) {
                target.classList.remove('e-grid-chart-max-icon');
                target.classList.add('e-grid-chart-min-icon');
                this.dialogInformation = {
                    target: this.dialogObj.target,
                    width: this.dialogObj.width,
                    height: this.dialogObj.height,
                    minHeight: this.dialogObj.minHeight,
                    overflow: document.body.style.overflow
                };
                window.scrollTo(0, 0);
                this.dialogObj.target = document.body;
                this.dialogObj.width = '100%';
                this.dialogObj.height = '100%';
                this.dialogObj.minHeight = '100%';
                document.body.style.overflow = 'hidden';
                this.minMaxButton.element.setAttribute('title', this.getLocaleText('Minimize'));
            }
            else {
                target.classList.remove('e-grid-chart-min-icon');
                target.classList.add('e-grid-chart-max-icon');
                this.dialogObj.target = this.dialogInformation.target;
                this.dialogObj.width = this.dialogInformation.width;
                this.dialogObj.height = this.dialogInformation.height;
                this.dialogObj.minHeight = this.dialogInformation.minHeight;
                document.body.style.overflow = this.dialogInformation.overflow;
                this.minMaxButton.element.setAttribute('title', this.getLocaleText('Maximize'));
            }
            setTimeout(() => {
                this.currentChart.refresh();
            }, 0);
        };
        this.minMaxButton.element.addEventListener('click', this.boundMinMax);
    }
    generateChartLocale() {
        this.defaultChartLocale = Object.assign({}, this.parent.defaultChartLocale, { ChartPreview: 'Chart Preview', PieChart: 'Pie Chart', Pie: 'Pie', ScatterChart: 'Scatter Chart', Scatter: 'Scatter', Export: 'Export', Data: 'Data', Format: 'Format', Print: 'Print', JPEG: 'JPEG', PNG: 'PNG', SVG: 'SVG', PDF: 'PDF', XLSX: 'XLSX', CSV: 'CSV', CategoryAxis: 'Category Axis', Series: 'Series', ValueAxis: 'Value Axis', ChartStyle: 'Chart Style', TitleStyle: 'Title Style', Legend: 'Legend', Axes: 'Axes', Margin: 'Margin', Top: 'Top', Bottom: 'Bottom', Right: 'Right', Left: 'Left', Color: 'Color', ApplyTo: 'Apply To', Title: 'Title', Subtitle: 'Subtitle', Font: 'Font', Size: 'Size', ShowLegend: 'Show Legend', Position: 'Position', ShowTooltip: 'Show Tooltip', ShowDataLabel: 'Show Data Label', ApplyToAxis: 'Apply To Axis', Category: 'Category', Value: 'Value', ReverseOrder: 'Reverse Order', Text: 'Text', Label: 'Label', Rotation: 'Rotation', ExportTitle: 'Export', ShowSidePanel: 'Show Side Panel', HideSidePanel: 'Hide Side Panel', Maximize: 'Maximize', Minimize: 'Minimize' });
    }
    /**
     * @param {string} item – Defines the locale key.
     * @hidden
     * @returns {string} Returns the locale text.
     */
    getLocaleText(item) {
        return this.localeObj.getConstant(item);
    }
    isBiggerTheme(gridObj) {
        return closest(gridObj.element, '.e-bigger') ? true : false;
    }
    getChartDialogWidth(gridObj) {
        if (this.chartSettings.chartPopupSettings.width) {
            return this.chartSettings.chartPopupSettings.width;
        }
        return this.isBiggerTheme(gridObj) ? 833 : 825;
    }
    getChartDialogHeight(gridObj) {
        if (this.chartSettings.chartPopupSettings.height) {
            return this.chartSettings.chartPopupSettings.height;
        }
        return this.isBiggerTheme(gridObj) ? 552 : 490;
    }
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
    initDialogUI(args, beforeDestroy) {
        return new Promise((resolve) => {
            const gridObj = args.gridInstance;
            const target = this.chartSettings.chartPopupSettings.target ? this.chartSettings.chartPopupSettings.target
                : gridObj.element;
            this.dialogElement = gridObj.createElement('div', { id: gridObj.element.id + '_grid_context_menu_dialog' });
            if (this.isBiggerTheme(gridObj)) {
                this.dialogElement.classList.add('e-bigger');
            }
            target.appendChild(this.dialogElement);
            this.dialogObj = new Dialog({
                width: this.getChartDialogWidth(gridObj),
                height: this.getChartDialogHeight(gridObj),
                minHeight: this.getChartDialogHeight(gridObj),
                header: this.chartSettings.chartPopupSettings.title ? this.chartSettings.chartPopupSettings.title : this.getLocaleText('ChartPreview'),
                cssClass: this.chartSettings.cssClass ? 'e-grid-context-menu-dialog ' + this.chartSettings.cssClass : 'e-grid-context-menu-dialog',
                showCloseIcon: true,
                allowDragging: true,
                isModal: true,
                target,
                closeOnEscape: true,
                animationSettings: { effect: 'None' },
                enableRtl: this.enableRtl,
                locale: this.chartSettings.locale,
                created: () => {
                    if (isNullOrUndefined(this.chartSettings.chartPopupSettings.target)
                        && this.dialogObj.element.getBoundingClientRect().height > gridObj.element.getBoundingClientRect().height) {
                        this.dialogObj.target = document.body;
                        this.dialogObj.refresh();
                    }
                    const initDialogUIArgs = Object.assign({}, args, { target: this.dialogObj.element.querySelector('.e-dlg-content'), dialog: this.dialogObj });
                    resolve(initDialogUIArgs);
                },
                close: () => {
                    if (beforeDestroy) {
                        beforeDestroy();
                    }
                    this.dialogObj.destroy();
                    this.dialogObj = null;
                    this.dialogElement.remove();
                    this.dialogElement = null;
                }
            });
            this.dialogObj.appendTo(this.dialogElement);
            this.dialogObj.element.addEventListener('keydown', this.preventParentComponentKeyNavigation);
        });
    }
    preventParentComponentKeyNavigation(event) {
        event.stopPropagation();
    }
    initializeLayout() {
        const dialogHeaderHeight = this.dialogObj.element.querySelector('.e-dlg-header-content').getBoundingClientRect().height;
        this.element.style.width = '100%';
        this.element.style.height = 'calc(100% - ' + dialogHeaderHeight + 'px)';
        this.dialogChartContainer = createElement('div', { className: 'e-grid-dialogchart-container' });
        this.dialogChartContainer.style.width = '100%';
        this.dialogChartContainer.style.height = '100%';
        this.element.append(this.dialogChartContainer);
        let targetElement = this.dialogChartContainer;
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
            const appendElement = this.chartSettings.enablePropertyPanel ? this.chartContainer : this.dialogChartContainer;
            appendElement.append(this.exportContainer);
            appendElement.append(this.exportChartContainer);
            if (this.chartSettings.allowExport) {
                this.chartExport.addExportButton();
            }
            if (this.chartSettings.enablePropertyPanel) {
                this.addShowHidePanelButton();
            }
            const exportContainerHeight = this.exportContainer.getBoundingClientRect().height;
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
    }
    /**
     * @hidden
     * @returns {void}
     */
    addShowHidePanelButton() {
        const showHideContainer = createElement('div');
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
    }
    showHidePropertyPanel(args) {
        let target = args.target;
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
    }
    /**
     * To identify the type of chart.
     *
     * @hidden
     * @returns {boolean} Returns `true` if the chart type is one of the standard types (e.g., Bar, Line, Area); otherwise, `false`.
     */
    isChart() {
        return [
            'Bar', 'StackingBar', 'StackingBar100',
            'Column', 'StackingColumn', 'StackingColumn100',
            'Line', 'StackingLine', 'StackingLine100',
            'Area', 'StackingArea', 'StackingArea100',
            'Scatter'
        ].indexOf(this.chartType) !== -1;
    }
    /**
     * To identify the type of chart.
     *
     * @hidden
     * @returns {boolean} Returns `true` if the chart type is 'Pie'; otherwise, `false`.
     */
    isAccumulationChart() {
        return this.chartType === 'Pie';
    }
    renderChart(chartModel) {
        const isChart = this.isChart();
        const isAccumulationChart = this.isAccumulationChart();
        const defaultChartModel = extend({
            cssClass: this.chartSettings.cssClass,
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        }, this.defaultChartModel, {}, true);
        defaultChartModel.series = [];
        if (this.category.length && this.series.length) {
            for (let i = 0; i < this.series.length; i++) {
                const series = {
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
        const defaultAccumulationChartModel = extend({
            cssClass: this.chartSettings.cssClass,
            locale: this.chartSettings.locale,
            enableRtl: this.enableRtl
        }, this.defaultAccumulationChartModel, {}, true);
        defaultAccumulationChartModel.series = [];
        if (this.category.length && this.series.length) {
            const accumulationSeries = {
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
    }
    refreshChart(chartModel) {
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
    }
    /**
     * Updates the chart with new data or settings.
     *
     * @param {ChartChanges} changes - Defines the changes to apply for the chart.
     * @returns {void}
     *
     */
    refresh(changes) {
        const updateChartArgs = {
            changes,
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
    }
    /**
     * Cleans up and disposes the chart instance(s).
     *
     * @returns {void}
     */
    destroy() {
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
    }
}

export { ChartExport, ChartPanel, GridChart, deepMerge };
//# sourceMappingURL=ej2-grid-chart.es2015.js.map
