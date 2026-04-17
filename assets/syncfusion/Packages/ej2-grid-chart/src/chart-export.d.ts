import { GridChart } from './grid-chart';
export declare class ChartExport {
    private defaultExportMenuItems;
    private gridChart;
    private exportButtonElement;
    private exportButton;
    private exportMenuElement;
    private exportMenu;
    private boundOpenExportMenu;
    private menuId;
    constructor(gridChart: GridChart);
    private initProperties;
    /**
     * @hidden
     * @returns {void}
     */
    addExportButton(): void;
    private openExportMenu;
    private generateID;
    private getKeyFromId;
    /**
     * @hidden
     * @returns {void}
     */
    destroy(): void;
}
