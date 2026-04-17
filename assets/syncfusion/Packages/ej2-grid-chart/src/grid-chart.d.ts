import { ChartType, IGrid } from '@syncfusion/ej2-grids';
import { ChartExportItem } from './enum';
import { CategorySeries, ChartChanges, ChartPopupArgs, ChartPopupSettings, InitDialogUIArgs } from './interface';
import { Chart, AccumulationChart } from '@syncfusion/ej2-charts';
/**
 * Configuration options for integrating a chart with the Grid component.
 */
export interface GridChartModel {
    /**
     * Enables or disables export functionality for the chart.
     *
     * @default false
     */
    allowExport?: boolean;
    /**
     * Defines the list of export formats available to the user.
     *
     * @default []
     */
    chartExportItems?: ChartExportItem[];
    /**
     * Enables the chart settings panel within the chart dialog,
     * allowing end-users to customize chart properties interactively.
     *
     * @default false
     */
    enablePropertyPanel?: boolean;
    /**
     * Callback function triggered before the chart is updated with new changes.
     *
     * @returns {void}
     */
    updateChartSettings?: Function;
    /**
     * Defines the settings for the chart dialog, such as dimensions and target container.
     *
     * @default {}
     */
    chartPopupSettings?: ChartPopupSettings;
    /**
     * Enable or disable rendering component in right to left direction.
     *
     * @default false
     */
    enableRtl?: boolean;
    /**
     * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
     *
     * @default ''
     */
    locale?: string;
    /**
     * Defines the own class for the grid chart element.
     *
     * @default ''
     */
    cssClass?: string;
}
/**
 * Provides functionality to render, update, and destroy charts linked to a Grid instance.
 */
export declare class GridChart {
    /** @hidden */
    chartSettings: GridChartModel;
    private commonChartModel;
    private defaultAccumulationChartModel;
    private defaultChartModel;
    /** @hidden */
    category: string[];
    /** @hidden */
    series: string[];
    /** @hidden */
    parent: IGrid;
    /** @hidden */
    enableRtl: boolean;
    private defaultChartLocale;
    private localeObj;
    private dialogElement;
    private dialogObj;
    private chartPanel;
    private chartExport;
    private element;
    private dataSource;
    /** @hidden */
    chartType: ChartType;
    /** @hidden */
    previousChartType: ChartType;
    private chartElement;
    /** @hidden */
    chart: Chart;
    private accumulationChartElement;
    /** @hidden */
    accumulationChart: AccumulationChart;
    /** @hidden */
    currentChart: Chart | AccumulationChart;
    /** @hidden */
    exportContainer: HTMLElement;
    private exportChartContainer;
    private exportChartHolder;
    private dialogChartContainer;
    private chartContainer;
    /** @hidden */
    tabContainer: HTMLElement;
    private minMaxButtonElement;
    private minMaxButton;
    private boundMinMax;
    private dialogInformation;
    private showHidePropertyPanelButtonElement;
    private showHidePropertyPanelButton;
    /**
     * Initializes a new instance of the GridChart class.
     *
     * @param {GridChartModel} options - Optional configuration for chart behavior.
     * @hidden
     */
    constructor(options?: GridChartModel);
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
    render(chartPopupArgs: ChartPopupArgs, chartModel: ChartChanges, categorySeries: CategorySeries): void;
    private addMinMaxButton;
    private generateChartLocale;
    /**
     * @param {string} item – Defines the locale key.
     * @hidden
     * @returns {string} Returns the locale text.
     */
    getLocaleText(item: string): string;
    private isBiggerTheme;
    private getChartDialogWidth;
    private getChartDialogHeight;
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
    initDialogUI(args: ChartPopupArgs, beforeDestroy?: Function): Promise<InitDialogUIArgs>;
    private preventParentComponentKeyNavigation;
    private initializeLayout;
    /**
     * @hidden
     * @returns {void}
     */
    addShowHidePanelButton(): void;
    private showHidePropertyPanel;
    /**
     * To identify the type of chart.
     *
     * @hidden
     * @returns {boolean} Returns `true` if the chart type is one of the standard types (e.g., Bar, Line, Area); otherwise, `false`.
     */
    isChart(): boolean;
    /**
     * To identify the type of chart.
     *
     * @hidden
     * @returns {boolean} Returns `true` if the chart type is 'Pie'; otherwise, `false`.
     */
    isAccumulationChart(): boolean;
    private renderChart;
    private refreshChart;
    /**
     * Updates the chart with new data or settings.
     *
     * @param {ChartChanges} changes - Defines the changes to apply for the chart.
     * @returns {void}
     *
     */
    refresh(changes: ChartChanges): void;
    /**
     * Cleans up and disposes the chart instance(s).
     *
     * @returns {void}
     */
    private destroy;
}
