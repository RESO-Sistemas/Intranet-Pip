import { GridChart } from './grid-chart';
export declare class ChartPanel {
    private font;
    private fontSize;
    private legendPosition;
    private defaultMenuItems;
    private chartTypeMap;
    private parent;
    private gridChart;
    private rotation;
    private deletedSeries;
    private titleSection;
    private stylingSeries;
    private axes;
    private tabElement;
    private tab;
    private chartListElement;
    private chartListAccordion;
    private chartTabElement;
    private formatTabElement;
    private dataTabElement;
    private dataTabInformation;
    private formatTabInformation;
    private chartStyleInformation;
    private titleStyleInformation;
    private legendStyleInformation;
    private seriesStyleInformation;
    private axesStyleInformation;
    private boundChangeChartType;
    private boundSelectTitle;
    private boundSelectAxes;
    constructor(gridChart: GridChart);
    /**
     * @hidden
     * @returns {void}
     */
    tabRenderer(): void;
    /**
     * @hidden
     * @returns {void}
     */
    initializeLayout(): void;
    private addTab;
    private getChartList;
    private getCustomMenuItems;
    private getOrderedChartItems;
    private chartTab;
    private createChartList;
    private dataTab;
    private setSeriesGridAction;
    private formatTab;
    private renderAxesStyleList;
    private renderSeriesStyleList;
    private renderLegendStyleList;
    private createRadio;
    private renderTitleStyleList;
    private renderChartStyleList;
    /**
     * @hidden
     * @returns {void}
     */
    destroy(): void;
}
