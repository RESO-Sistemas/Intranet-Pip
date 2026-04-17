import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from './chart.module';
import { LineSeries, ScatterSeries, ColumnSeries, SplineSeries, SplineAreaSeries, StripLine, AreaSeries, ScrollBar, StepLineSeries, StepAreaSeries, StackingColumnSeries, StackingLineSeries, StackingAreaSeries, StackingStepAreaSeries, BarSeries, StackingBarSeries, RangeColumnSeries, BubbleSeries, Tooltip, Crosshair, Category, DateTime, Logarithmic, Legend, Zoom, DataLabel, Selection, ChartAnnotation, HiloSeries, HiloOpenCloseSeries, WaterfallSeries, RangeAreaSeries, RangeStepAreaSeries, SplineRangeAreaSeries, CandleSeries, PolarSeries, RadarSeries, SmaIndicator, TmaIndicator, EmaIndicator, AccumulationDistributionIndicator, MacdIndicator, AtrIndicator, RsiIndicator, MomentumIndicator, StochasticIndicator, BollingerBands, BoxAndWhiskerSeries, HistogramSeries, ErrorBar, Trendlines, DateTimeCategory, MultiColoredLineSeries, MultiColoredAreaSeries, MultiLevelLabel, ParetoSeries, Export, DataEditing, Highlight, LastValueLabel, SeriesLabel } from '@syncfusion/ej2-charts';
import * as i0 from "@angular/core";
export const LineSeriesService = { provide: 'ChartsLineSeries', useValue: LineSeries };
export const ScatterSeriesService = { provide: 'ChartsScatterSeries', useValue: ScatterSeries };
export const ColumnSeriesService = { provide: 'ChartsColumnSeries', useValue: ColumnSeries };
export const SplineSeriesService = { provide: 'ChartsSplineSeries', useValue: SplineSeries };
export const SplineAreaSeriesService = { provide: 'ChartsSplineAreaSeries', useValue: SplineAreaSeries };
export const StripLineService = { provide: 'ChartsStripLine', useValue: StripLine };
export const AreaSeriesService = { provide: 'ChartsAreaSeries', useValue: AreaSeries };
export const ScrollBarService = { provide: 'ChartsScrollBar', useValue: ScrollBar };
export const StepLineSeriesService = { provide: 'ChartsStepLineSeries', useValue: StepLineSeries };
export const StepAreaSeriesService = { provide: 'ChartsStepAreaSeries', useValue: StepAreaSeries };
export const StackingColumnSeriesService = { provide: 'ChartsStackingColumnSeries', useValue: StackingColumnSeries };
export const StackingLineSeriesService = { provide: 'ChartsStackingLineSeries', useValue: StackingLineSeries };
export const StackingAreaSeriesService = { provide: 'ChartsStackingAreaSeries', useValue: StackingAreaSeries };
export const StackingStepAreaSeriesService = { provide: 'ChartsStackingStepAreaSeries', useValue: StackingStepAreaSeries };
export const BarSeriesService = { provide: 'ChartsBarSeries', useValue: BarSeries };
export const StackingBarSeriesService = { provide: 'ChartsStackingBarSeries', useValue: StackingBarSeries };
export const RangeColumnSeriesService = { provide: 'ChartsRangeColumnSeries', useValue: RangeColumnSeries };
export const BubbleSeriesService = { provide: 'ChartsBubbleSeries', useValue: BubbleSeries };
export const TooltipService = { provide: 'ChartsTooltip', useValue: Tooltip };
export const CrosshairService = { provide: 'ChartsCrosshair', useValue: Crosshair };
export const CategoryService = { provide: 'ChartsCategory', useValue: Category };
export const DateTimeService = { provide: 'ChartsDateTime', useValue: DateTime };
export const LogarithmicService = { provide: 'ChartsLogarithmic', useValue: Logarithmic };
export const LegendService = { provide: 'ChartsLegend', useValue: Legend };
export const ZoomService = { provide: 'ChartsZoom', useValue: Zoom };
export const DataLabelService = { provide: 'ChartsDataLabel', useValue: DataLabel };
export const SelectionService = { provide: 'ChartsSelection', useValue: Selection };
export const ChartAnnotationService = { provide: 'ChartsChartAnnotation', useValue: ChartAnnotation };
export const HiloSeriesService = { provide: 'ChartsHiloSeries', useValue: HiloSeries };
export const HiloOpenCloseSeriesService = { provide: 'ChartsHiloOpenCloseSeries', useValue: HiloOpenCloseSeries };
export const WaterfallSeriesService = { provide: 'ChartsWaterfallSeries', useValue: WaterfallSeries };
export const RangeAreaSeriesService = { provide: 'ChartsRangeAreaSeries', useValue: RangeAreaSeries };
export const RangeStepAreaSeriesService = { provide: 'ChartsRangeStepAreaSeries', useValue: RangeStepAreaSeries };
export const SplineRangeAreaSeriesService = { provide: 'ChartsSplineRangeAreaSeries', useValue: SplineRangeAreaSeries };
export const CandleSeriesService = { provide: 'ChartsCandleSeries', useValue: CandleSeries };
export const PolarSeriesService = { provide: 'ChartsPolarSeries', useValue: PolarSeries };
export const RadarSeriesService = { provide: 'ChartsRadarSeries', useValue: RadarSeries };
export const SmaIndicatorService = { provide: 'ChartsSmaIndicator', useValue: SmaIndicator };
export const TmaIndicatorService = { provide: 'ChartsTmaIndicator', useValue: TmaIndicator };
export const EmaIndicatorService = { provide: 'ChartsEmaIndicator', useValue: EmaIndicator };
export const AccumulationDistributionIndicatorService = { provide: 'ChartsAccumulationDistributionIndicator', useValue: AccumulationDistributionIndicator };
export const MacdIndicatorService = { provide: 'ChartsMacdIndicator', useValue: MacdIndicator };
export const AtrIndicatorService = { provide: 'ChartsAtrIndicator', useValue: AtrIndicator };
export const RsiIndicatorService = { provide: 'ChartsRsiIndicator', useValue: RsiIndicator };
export const MomentumIndicatorService = { provide: 'ChartsMomentumIndicator', useValue: MomentumIndicator };
export const StochasticIndicatorService = { provide: 'ChartsStochasticIndicator', useValue: StochasticIndicator };
export const BollingerBandsService = { provide: 'ChartsBollingerBands', useValue: BollingerBands };
export const BoxAndWhiskerSeriesService = { provide: 'ChartsBoxAndWhiskerSeries', useValue: BoxAndWhiskerSeries };
export const HistogramSeriesService = { provide: 'ChartsHistogramSeries', useValue: HistogramSeries };
export const ErrorBarService = { provide: 'ChartsErrorBar', useValue: ErrorBar };
export const TrendlinesService = { provide: 'ChartsTrendlines', useValue: Trendlines };
export const DateTimeCategoryService = { provide: 'ChartsDateTimeCategory', useValue: DateTimeCategory };
export const MultiColoredLineSeriesService = { provide: 'ChartsMultiColoredLineSeries', useValue: MultiColoredLineSeries };
export const MultiColoredAreaSeriesService = { provide: 'ChartsMultiColoredAreaSeries', useValue: MultiColoredAreaSeries };
export const MultiLevelLabelService = { provide: 'ChartsMultiLevelLabel', useValue: MultiLevelLabel };
export const ParetoSeriesService = { provide: 'ChartsParetoSeries', useValue: ParetoSeries };
export const ExportService = { provide: 'ChartsExport', useValue: Export };
export const DataEditingService = { provide: 'ChartsDataEditing', useValue: DataEditing };
export const HighlightService = { provide: 'ChartsHighlight', useValue: Highlight };
export const LastValueLabelService = { provide: 'ChartsLastValueLabel', useValue: LastValueLabel };
export const SeriesLabelService = { provide: 'ChartsSeriesLabel', useValue: SeriesLabel };
/**
 * NgModule definition for the Chart component with providers.
 */
export class ChartAllModule {
}
ChartAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChartAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChartAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChartAllModule, imports: [CommonModule, ChartModule], exports: [ChartModule] });
ChartAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChartAllModule, providers: [
        LineSeriesService,
        ScatterSeriesService,
        ColumnSeriesService,
        SplineSeriesService,
        SplineAreaSeriesService,
        StripLineService,
        AreaSeriesService,
        ScrollBarService,
        StepLineSeriesService,
        StepAreaSeriesService,
        StackingColumnSeriesService,
        StackingLineSeriesService,
        StackingAreaSeriesService,
        StackingStepAreaSeriesService,
        BarSeriesService,
        StackingBarSeriesService,
        RangeColumnSeriesService,
        BubbleSeriesService,
        TooltipService,
        CrosshairService,
        CategoryService,
        DateTimeService,
        LogarithmicService,
        LegendService,
        ZoomService,
        DataLabelService,
        SelectionService,
        ChartAnnotationService,
        HiloSeriesService,
        HiloOpenCloseSeriesService,
        WaterfallSeriesService,
        RangeAreaSeriesService,
        RangeStepAreaSeriesService,
        SplineRangeAreaSeriesService,
        CandleSeriesService,
        PolarSeriesService,
        RadarSeriesService,
        SmaIndicatorService,
        TmaIndicatorService,
        EmaIndicatorService,
        AccumulationDistributionIndicatorService,
        MacdIndicatorService,
        AtrIndicatorService,
        RsiIndicatorService,
        MomentumIndicatorService,
        StochasticIndicatorService,
        BollingerBandsService,
        BoxAndWhiskerSeriesService,
        HistogramSeriesService,
        ErrorBarService,
        TrendlinesService,
        DateTimeCategoryService,
        MultiColoredLineSeriesService,
        MultiColoredAreaSeriesService,
        MultiLevelLabelService,
        ParetoSeriesService,
        ExportService,
        DataEditingService,
        HighlightService,
        LastValueLabelService,
        SeriesLabelService
    ], imports: [[CommonModule, ChartModule], ChartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChartAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ChartModule],
                    exports: [
                        ChartModule
                    ],
                    providers: [
                        LineSeriesService,
                        ScatterSeriesService,
                        ColumnSeriesService,
                        SplineSeriesService,
                        SplineAreaSeriesService,
                        StripLineService,
                        AreaSeriesService,
                        ScrollBarService,
                        StepLineSeriesService,
                        StepAreaSeriesService,
                        StackingColumnSeriesService,
                        StackingLineSeriesService,
                        StackingAreaSeriesService,
                        StackingStepAreaSeriesService,
                        BarSeriesService,
                        StackingBarSeriesService,
                        RangeColumnSeriesService,
                        BubbleSeriesService,
                        TooltipService,
                        CrosshairService,
                        CategoryService,
                        DateTimeService,
                        LogarithmicService,
                        LegendService,
                        ZoomService,
                        DataLabelService,
                        SelectionService,
                        ChartAnnotationService,
                        HiloSeriesService,
                        HiloOpenCloseSeriesService,
                        WaterfallSeriesService,
                        RangeAreaSeriesService,
                        RangeStepAreaSeriesService,
                        SplineRangeAreaSeriesService,
                        CandleSeriesService,
                        PolarSeriesService,
                        RadarSeriesService,
                        SmaIndicatorService,
                        TmaIndicatorService,
                        EmaIndicatorService,
                        AccumulationDistributionIndicatorService,
                        MacdIndicatorService,
                        AtrIndicatorService,
                        RsiIndicatorService,
                        MomentumIndicatorService,
                        StochasticIndicatorService,
                        BollingerBandsService,
                        BoxAndWhiskerSeriesService,
                        HistogramSeriesService,
                        ErrorBarService,
                        TrendlinesService,
                        DateTimeCategoryService,
                        MultiColoredLineSeriesService,
                        MultiColoredAreaSeriesService,
                        MultiLevelLabelService,
                        ParetoSeriesService,
                        ExportService,
                        DataEditingService,
                        HighlightService,
                        LastValueLabelService,
                        SeriesLabelService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jaGFydC9jaGFydC1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGlDQUFpQyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxF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ZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJlbmRsaW5lRGlyZWN0aXZlLCBUcmVuZGxpbmVzRGlyZWN0aXZlIH0gZnJvbSAnLi90cmVuZGxpbmVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZWdtZW50RGlyZWN0aXZlLCBTZWdtZW50c0RpcmVjdGl2ZSB9IGZyb20gJy4vc2VnbWVudHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNlcmllc0RpcmVjdGl2ZSwgU2VyaWVzQ29sbGVjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vc2VyaWVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTdHJpcExpbmVEaXJlY3RpdmUsIFN0cmlwTGluZXNEaXJlY3RpdmUgfSBmcm9tICcuL3N0cmlwbGluZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhdGVnb3J5RGlyZWN0aXZlLCBDYXRlZ29yaWVzRGlyZWN0aXZlIH0gZnJvbSAnLi9jYXRlZ29yaWVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNdWx0aUxldmVsTGFiZWxEaXJlY3RpdmUsIE11bHRpTGV2ZWxMYWJlbHNEaXJlY3RpdmUgfSBmcm9tICcuL211bHRpbGV2ZWxsYWJlbHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEF4aXNEaXJlY3RpdmUsIEF4ZXNEaXJlY3RpdmUgfSBmcm9tICcuL2F4ZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJvd0RpcmVjdGl2ZSwgUm93c0RpcmVjdGl2ZSB9IGZyb20gJy4vcm93cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlLCBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSYW5nZUNvbG9yU2V0dGluZ0RpcmVjdGl2ZSwgUmFuZ2VDb2xvclNldHRpbmdzRGlyZWN0aXZlIH0gZnJvbSAnLi9yYW5nZWNvbG9yc2V0dGluZ3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFubm90YXRpb25EaXJlY3RpdmUsIEFubm90YXRpb25zRGlyZWN0aXZlIH0gZnJvbSAnLi9hbm5vdGF0aW9ucy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2VsZWN0ZWREYXRhSW5kZXhEaXJlY3RpdmUsIFNlbGVjdGVkRGF0YUluZGV4ZXNEaXJlY3RpdmUgfSBmcm9tICcuL3NlbGVjdGVkZGF0YWluZGV4ZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEluZGljYXRvckRpcmVjdGl2ZSwgSW5kaWNhdG9yc0RpcmVjdGl2ZSB9IGZyb20gJy4vaW5kaWNhdG9ycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFydE1vZHVsZSB9IGZyb20gJy4vY2hhcnQubW9kdWxlJztcbmltcG9ydCB7TGluZVNlcmllcywgU2NhdHRlclNlcmllcywgQ29sdW1uU2VyaWVzLCBTcGxpbmVTZXJpZXMsIFNwbGluZUFyZWFTZXJpZXMsIFN0cmlwTGluZSwgQXJlYVNlcmllcywgU2Nyb2xsQmFyLCBTdGVwTGluZVNlcmllcywgU3RlcEFyZWFTZXJpZXMsIFN0YWNraW5nQ29sdW1uU2VyaWVzLCBTdGFja2luZ0xpbmVTZXJpZXMsIFN0YWNraW5nQXJlYVNlcmllcywgU3RhY2tpbmdTdGVwQXJlYVNlcmllcywgQmFyU2VyaWVzLCBTdGFja2luZ0JhclNlcmllcywgUmFuZ2VDb2x1bW5TZXJpZXMsIEJ1YmJsZVNlcmllcywgVG9vbHRpcCwgQ3Jvc3NoYWlyLCBDYXRlZ29yeSwgRGF0ZVRpbWUsIExvZ2FyaXRobWljLCBMZWdlbmQsIFpvb20sIERhdGFMYWJlbCwgU2VsZWN0aW9uLCBDaGFydEFubm90YXRpb24sIEhpbG9TZXJpZXMsIEhpbG9PcGVuQ2xvc2VTZXJpZXMsIFdhdGVyZmFsbFNlcmllcywgUmFuZ2VBcmVhU2VyaWVzLCBSYW5nZVN0ZXBBcmVhU2VyaWVzLCBTcGxpbmVSYW5nZUFyZWFTZXJpZXMsIENhbmRsZVNlcmllcywgUG9sYXJTZXJpZXMsIFJhZGFyU2VyaWVzLCBTbWFJbmRpY2F0b3IsIFRtYUluZGljYXRvciwgRW1hSW5kaWNhdG9yLCBBY2N1bXVsYXRpb25EaXN0cmlidXRpb25JbmRpY2F0b3IsIE1hY2RJbmRpY2F0b3IsIEF0ckluZGljYXRvciwgUnNpSW5kaWNhdG9yLCBNb21lbnR1bUluZGljYXRvciwgU3RvY2hhc3RpY0luZGljYXRvciwgQm9sbGluZ2VyQmFuZHMsIEJveEFuZFdoaXNrZXJTZXJpZXMsIEhpc3RvZ3JhbVNlcmllcywgRXJyb3JCYXIsIFRyZW5kbGluZXMsIERhdGVUaW1lQ2F0ZWdvcnksIE11bHRpQ29sb3JlZExpbmVTZXJpZXMsIE11bHRpQ29sb3JlZEFyZWFTZXJpZXMsIE11bHRpTGV2ZWxMYWJlbCwgUGFyZXRvU2VyaWVzLCBFeHBvcnQsIERhdGFFZGl0aW5nLCBIaWdobGlnaHQsIExhc3RWYWx1ZUxhYmVsLCBTZXJpZXNMYWJlbH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWNoYXJ0cydcblxuXG5leHBvcnQgY29uc3QgTGluZVNlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNMaW5lU2VyaWVzJywgdXNlVmFsdWU6IExpbmVTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFNjYXR0ZXJTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU2NhdHRlclNlcmllcycsIHVzZVZhbHVlOiBTY2F0dGVyU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBDb2x1bW5TZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzQ29sdW1uU2VyaWVzJywgdXNlVmFsdWU6IENvbHVtblNlcmllc307XG5leHBvcnQgY29uc3QgU3BsaW5lU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1NwbGluZVNlcmllcycsIHVzZVZhbHVlOiBTcGxpbmVTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFNwbGluZUFyZWFTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU3BsaW5lQXJlYVNlcmllcycsIHVzZVZhbHVlOiBTcGxpbmVBcmVhU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBTdHJpcExpbmVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU3RyaXBMaW5lJywgdXNlVmFsdWU6IFN0cmlwTGluZX07XG5leHBvcnQgY29uc3QgQXJlYVNlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNBcmVhU2VyaWVzJywgdXNlVmFsdWU6IEFyZWFTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFNjcm9sbEJhclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNTY3JvbGxCYXInLCB1c2VWYWx1ZTogU2Nyb2xsQmFyfTtcbmV4cG9ydCBjb25zdCBTdGVwTGluZVNlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNTdGVwTGluZVNlcmllcycsIHVzZVZhbHVlOiBTdGVwTGluZVNlcmllc307XG5leHBvcnQgY29uc3QgU3RlcEFyZWFTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU3RlcEFyZWFTZXJpZXMnLCB1c2VWYWx1ZTogU3RlcEFyZWFTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFN0YWNraW5nQ29sdW1uU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1N0YWNraW5nQ29sdW1uU2VyaWVzJywgdXNlVmFsdWU6IFN0YWNraW5nQ29sdW1uU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBTdGFja2luZ0xpbmVTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU3RhY2tpbmdMaW5lU2VyaWVzJywgdXNlVmFsdWU6IFN0YWNraW5nTGluZVNlcmllc307XG5leHBvcnQgY29uc3QgU3RhY2tpbmdBcmVhU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1N0YWNraW5nQXJlYVNlcmllcycsIHVzZVZhbHVlOiBTdGFja2luZ0FyZWFTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFN0YWNraW5nU3RlcEFyZWFTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU3RhY2tpbmdTdGVwQXJlYVNlcmllcycsIHVzZVZhbHVlOiBTdGFja2luZ1N0ZXBBcmVhU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBCYXJTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzQmFyU2VyaWVzJywgdXNlVmFsdWU6IEJhclNlcmllc307XG5leHBvcnQgY29uc3QgU3RhY2tpbmdCYXJTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU3RhY2tpbmdCYXJTZXJpZXMnLCB1c2VWYWx1ZTogU3RhY2tpbmdCYXJTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFJhbmdlQ29sdW1uU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1JhbmdlQ29sdW1uU2VyaWVzJywgdXNlVmFsdWU6IFJhbmdlQ29sdW1uU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBCdWJibGVTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzQnViYmxlU2VyaWVzJywgdXNlVmFsdWU6IEJ1YmJsZVNlcmllc307XG5leHBvcnQgY29uc3QgVG9vbHRpcFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNUb29sdGlwJywgdXNlVmFsdWU6IFRvb2x0aXB9O1xuZXhwb3J0IGNvbnN0IENyb3NzaGFpclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNDcm9zc2hhaXInLCB1c2VWYWx1ZTogQ3Jvc3NoYWlyfTtcbmV4cG9ydCBjb25zdCBDYXRlZ29yeVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNDYXRlZ29yeScsIHVzZVZhbHVlOiBDYXRlZ29yeX07XG5leHBvcnQgY29uc3QgRGF0ZVRpbWVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzRGF0ZVRpbWUnLCB1c2VWYWx1ZTogRGF0ZVRpbWV9O1xuZXhwb3J0IGNvbnN0IExvZ2FyaXRobWljU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0xvZ2FyaXRobWljJywgdXNlVmFsdWU6IExvZ2FyaXRobWljfTtcbmV4cG9ydCBjb25zdCBMZWdlbmRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzTGVnZW5kJywgdXNlVmFsdWU6IExlZ2VuZH07XG5leHBvcnQgY29uc3QgWm9vbVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNab29tJywgdXNlVmFsdWU6IFpvb219O1xuZXhwb3J0IGNvbnN0IERhdGFMYWJlbFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNEYXRhTGFiZWwnLCB1c2VWYWx1ZTogRGF0YUxhYmVsfTtcbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU2VsZWN0aW9uJywgdXNlVmFsdWU6IFNlbGVjdGlvbn07XG5leHBvcnQgY29uc3QgQ2hhcnRBbm5vdGF0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0NoYXJ0QW5ub3RhdGlvbicsIHVzZVZhbHVlOiBDaGFydEFubm90YXRpb259O1xuZXhwb3J0IGNvbnN0IEhpbG9TZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzSGlsb1NlcmllcycsIHVzZVZhbHVlOiBIaWxvU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBIaWxvT3BlbkNsb3NlU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0hpbG9PcGVuQ2xvc2VTZXJpZXMnLCB1c2VWYWx1ZTogSGlsb09wZW5DbG9zZVNlcmllc307XG5leHBvcnQgY29uc3QgV2F0ZXJmYWxsU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1dhdGVyZmFsbFNlcmllcycsIHVzZVZhbHVlOiBXYXRlcmZhbGxTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFJhbmdlQXJlYVNlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNSYW5nZUFyZWFTZXJpZXMnLCB1c2VWYWx1ZTogUmFuZ2VBcmVhU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBSYW5nZVN0ZXBBcmVhU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1JhbmdlU3RlcEFyZWFTZXJpZXMnLCB1c2VWYWx1ZTogUmFuZ2VTdGVwQXJlYVNlcmllc307XG5leHBvcnQgY29uc3QgU3BsaW5lUmFuZ2VBcmVhU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1NwbGluZVJhbmdlQXJlYVNlcmllcycsIHVzZVZhbHVlOiBTcGxpbmVSYW5nZUFyZWFTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IENhbmRsZVNlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNDYW5kbGVTZXJpZXMnLCB1c2VWYWx1ZTogQ2FuZGxlU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBQb2xhclNlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNQb2xhclNlcmllcycsIHVzZVZhbHVlOiBQb2xhclNlcmllc307XG5leHBvcnQgY29uc3QgUmFkYXJTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzUmFkYXJTZXJpZXMnLCB1c2VWYWx1ZTogUmFkYXJTZXJpZXN9O1xuZXhwb3J0IGNvbnN0IFNtYUluZGljYXRvclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNTbWFJbmRpY2F0b3InLCB1c2VWYWx1ZTogU21hSW5kaWNhdG9yfTtcbmV4cG9ydCBjb25zdCBUbWFJbmRpY2F0b3JTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzVG1hSW5kaWNhdG9yJywgdXNlVmFsdWU6IFRtYUluZGljYXRvcn07XG5leHBvcnQgY29uc3QgRW1hSW5kaWNhdG9yU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0VtYUluZGljYXRvcicsIHVzZVZhbHVlOiBFbWFJbmRpY2F0b3J9O1xuZXhwb3J0IGNvbnN0IEFjY3VtdWxhdGlvbkRpc3RyaWJ1dGlvbkluZGljYXRvclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNBY2N1bXVsYXRpb25EaXN0cmlidXRpb25JbmRpY2F0b3InLCB1c2VWYWx1ZTogQWNjdW11bGF0aW9uRGlzdHJpYnV0aW9uSW5kaWNhdG9yfTtcbmV4cG9ydCBjb25zdCBNYWNkSW5kaWNhdG9yU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c01hY2RJbmRpY2F0b3InLCB1c2VWYWx1ZTogTWFjZEluZGljYXRvcn07XG5leHBvcnQgY29uc3QgQXRySW5kaWNhdG9yU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0F0ckluZGljYXRvcicsIHVzZVZhbHVlOiBBdHJJbmRpY2F0b3J9O1xuZXhwb3J0IGNvbnN0IFJzaUluZGljYXRvclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNSc2lJbmRpY2F0b3InLCB1c2VWYWx1ZTogUnNpSW5kaWNhdG9yfTtcbmV4cG9ydCBjb25zdCBNb21lbnR1bUluZGljYXRvclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNNb21lbnR1bUluZGljYXRvcicsIHVzZVZhbHVlOiBNb21lbnR1bUluZGljYXRvcn07XG5leHBvcnQgY29uc3QgU3RvY2hhc3RpY0luZGljYXRvclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNTdG9jaGFzdGljSW5kaWNhdG9yJywgdXNlVmFsdWU6IFN0b2NoYXN0aWNJbmRpY2F0b3J9O1xuZXhwb3J0IGNvbnN0IEJvbGxpbmdlckJhbmRzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0JvbGxpbmdlckJhbmRzJywgdXNlVmFsdWU6IEJvbGxpbmdlckJhbmRzfTtcbmV4cG9ydCBjb25zdCBCb3hBbmRXaGlza2VyU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0JveEFuZFdoaXNrZXJTZXJpZXMnLCB1c2VWYWx1ZTogQm94QW5kV2hpc2tlclNlcmllc307XG5leHBvcnQgY29uc3QgSGlzdG9ncmFtU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0hpc3RvZ3JhbVNlcmllcycsIHVzZVZhbHVlOiBIaXN0b2dyYW1TZXJpZXN9O1xuZXhwb3J0IGNvbnN0IEVycm9yQmFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c0Vycm9yQmFyJywgdXNlVmFsdWU6IEVycm9yQmFyfTtcbmV4cG9ydCBjb25zdCBUcmVuZGxpbmVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1RyZW5kbGluZXMnLCB1c2VWYWx1ZTogVHJlbmRsaW5lc307XG5leHBvcnQgY29uc3QgRGF0ZVRpbWVDYXRlZ29yeVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNEYXRlVGltZUNhdGVnb3J5JywgdXNlVmFsdWU6IERhdGVUaW1lQ2F0ZWdvcnl9O1xuZXhwb3J0IGNvbnN0IE11bHRpQ29sb3JlZExpbmVTZXJpZXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzTXVsdGlDb2xvcmVkTGluZVNlcmllcycsIHVzZVZhbHVlOiBNdWx0aUNvbG9yZWRMaW5lU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBNdWx0aUNvbG9yZWRBcmVhU2VyaWVzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c011bHRpQ29sb3JlZEFyZWFTZXJpZXMnLCB1c2VWYWx1ZTogTXVsdGlDb2xvcmVkQXJlYVNlcmllc307XG5leHBvcnQgY29uc3QgTXVsdGlMZXZlbExhYmVsU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c011bHRpTGV2ZWxMYWJlbCcsIHVzZVZhbHVlOiBNdWx0aUxldmVsTGFiZWx9O1xuZXhwb3J0IGNvbnN0IFBhcmV0b1Nlcmllc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNQYXJldG9TZXJpZXMnLCB1c2VWYWx1ZTogUGFyZXRvU2VyaWVzfTtcbmV4cG9ydCBjb25zdCBFeHBvcnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzRXhwb3J0JywgdXNlVmFsdWU6IEV4cG9ydH07XG5leHBvcnQgY29uc3QgRGF0YUVkaXRpbmdTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzRGF0YUVkaXRpbmcnLCB1c2VWYWx1ZTogRGF0YUVkaXRpbmd9O1xuZXhwb3J0IGNvbnN0IEhpZ2hsaWdodFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNIaWdobGlnaHQnLCB1c2VWYWx1ZTogSGlnaGxpZ2h0fTtcbmV4cG9ydCBjb25zdCBMYXN0VmFsdWVMYWJlbFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNMYXN0VmFsdWVMYWJlbCcsIHVzZVZhbHVlOiBMYXN0VmFsdWVMYWJlbH07XG5leHBvcnQgY29uc3QgU2VyaWVzTGFiZWxTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnQ2hhcnRzU2VyaWVzTGFiZWwnLCB1c2VWYWx1ZTogU2VyaWVzTGFiZWx9O1xuXG4vKipcbiAqIE5nTW9kdWxlIGRlZmluaXRpb24gZm9yIHRoZSBDaGFydCBjb21wb25lbnQgd2l0aCBwcm92aWRlcnMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2hhcnRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ2hhcnRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczpbXG4gICAgICAgIExpbmVTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBTY2F0dGVyU2VyaWVzU2VydmljZSxcbiAgICAgICAgQ29sdW1uU2VyaWVzU2VydmljZSxcbiAgICAgICAgU3BsaW5lU2VyaWVzU2VydmljZSxcbiAgICAgICAgU3BsaW5lQXJlYVNlcmllc1NlcnZpY2UsXG4gICAgICAgIFN0cmlwTGluZVNlcnZpY2UsXG4gICAgICAgIEFyZWFTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBTY3JvbGxCYXJTZXJ2aWNlLFxuICAgICAgICBTdGVwTGluZVNlcmllc1NlcnZpY2UsXG4gICAgICAgIFN0ZXBBcmVhU2VyaWVzU2VydmljZSxcbiAgICAgICAgU3RhY2tpbmdDb2x1bW5TZXJpZXNTZXJ2aWNlLFxuICAgICAgICBTdGFja2luZ0xpbmVTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBTdGFja2luZ0FyZWFTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBTdGFja2luZ1N0ZXBBcmVhU2VyaWVzU2VydmljZSxcbiAgICAgICAgQmFyU2VyaWVzU2VydmljZSxcbiAgICAgICAgU3RhY2tpbmdCYXJTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBSYW5nZUNvbHVtblNlcmllc1NlcnZpY2UsXG4gICAgICAgIEJ1YmJsZVNlcmllc1NlcnZpY2UsXG4gICAgICAgIFRvb2x0aXBTZXJ2aWNlLFxuICAgICAgICBDcm9zc2hhaXJTZXJ2aWNlLFxuICAgICAgICBDYXRlZ29yeVNlcnZpY2UsXG4gICAgICAgIERhdGVUaW1lU2VydmljZSxcbiAgICAgICAgTG9nYXJpdGhtaWNTZXJ2aWNlLFxuICAgICAgICBMZWdlbmRTZXJ2aWNlLFxuICAgICAgICBab29tU2VydmljZSxcbiAgICAgICAgRGF0YUxhYmVsU2VydmljZSxcbiAgICAgICAgU2VsZWN0aW9uU2VydmljZSxcbiAgICAgICAgQ2hhcnRBbm5vdGF0aW9uU2VydmljZSxcbiAgICAgICAgSGlsb1Nlcmllc1NlcnZpY2UsXG4gICAgICAgIEhpbG9PcGVuQ2xvc2VTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBXYXRlcmZhbGxTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBSYW5nZUFyZWFTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBSYW5nZVN0ZXBBcmVhU2VyaWVzU2VydmljZSxcbiAgICAgICAgU3BsaW5lUmFuZ2VBcmVhU2VyaWVzU2VydmljZSxcbiAgICAgICAgQ2FuZGxlU2VyaWVzU2VydmljZSxcbiAgICAgICAgUG9sYXJTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBSYWRhclNlcmllc1NlcnZpY2UsXG4gICAgICAgIFNtYUluZGljYXRvclNlcnZpY2UsXG4gICAgICAgIFRtYUluZGljYXRvclNlcnZpY2UsXG4gICAgICAgIEVtYUluZGljYXRvclNlcnZpY2UsXG4gICAgICAgIEFjY3VtdWxhdGlvbkRpc3RyaWJ1dGlvbkluZGljYXRvclNlcnZpY2UsXG4gICAgICAgIE1hY2RJbmRpY2F0b3JTZXJ2aWNlLFxuICAgICAgICBBdHJJbmRpY2F0b3JTZXJ2aWNlLFxuICAgICAgICBSc2lJbmRpY2F0b3JTZXJ2aWNlLFxuICAgICAgICBNb21lbnR1bUluZGljYXRvclNlcnZpY2UsXG4gICAgICAgIFN0b2NoYXN0aWNJbmRpY2F0b3JTZXJ2aWNlLFxuICAgICAgICBCb2xsaW5nZXJCYW5kc1NlcnZpY2UsXG4gICAgICAgIEJveEFuZFdoaXNrZXJTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBIaXN0b2dyYW1TZXJpZXNTZXJ2aWNlLFxuICAgICAgICBFcnJvckJhclNlcnZpY2UsXG4gICAgICAgIFRyZW5kbGluZXNTZXJ2aWNlLFxuICAgICAgICBEYXRlVGltZUNhdGVnb3J5U2VydmljZSxcbiAgICAgICAgTXVsdGlDb2xvcmVkTGluZVNlcmllc1NlcnZpY2UsXG4gICAgICAgIE11bHRpQ29sb3JlZEFyZWFTZXJpZXNTZXJ2aWNlLFxuICAgICAgICBNdWx0aUxldmVsTGFiZWxTZXJ2aWNlLFxuICAgICAgICBQYXJldG9TZXJpZXNTZXJ2aWNlLFxuICAgICAgICBFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBEYXRhRWRpdGluZ1NlcnZpY2UsXG4gICAgICAgIEhpZ2hsaWdodFNlcnZpY2UsXG4gICAgICAgIExhc3RWYWx1ZUxhYmVsU2VydmljZSxcbiAgICAgICAgU2VyaWVzTGFiZWxTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydEFsbE1vZHVsZSB7IH0iXX0=