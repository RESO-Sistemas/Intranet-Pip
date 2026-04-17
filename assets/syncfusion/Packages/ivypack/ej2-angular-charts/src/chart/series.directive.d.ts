import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Series Directive
 * ```html
 * <e-series-collection>
 * <e-series></e-series>
 * </e-series-collection>
 * ```
 */
export declare class SeriesDirective extends ComplexBase<SeriesDirective> {
    private viewContainerRef;
    directivePropList: any;
    childTrendlines: any;
    childSegments: any;
    tags: string[];
    /**
     * The type of the series determines the visual representation of the data.
     * Available series types include:
     * * Line - Draws a line series.
     * * Column - Draws a column series.
     * * Area - Draws an area series.
     * * Bar - Draws a bar series.
     * * Histogram - Draws a histogram series.
     * * StackingColumn - Draws a stacking column series.
     * * StackingArea - Draws a stacking area series.
     * * StackingBar - Draws a stacking bar series.
     * * StepLine - Draws a step line series.
     * * StepArea - Draws a step area series.
     * * Scatter - Draws a scatter series.
     * * Spline - Draws a spline series.
     * * StackingColumn100 - Draws a 100% stacked column series.
     * * StackingBar100 - Draws a 100% stacked bar series.
     * * StackingArea100 - Draws a 100% stacked area series.
     * * RangeColumn - Draws a range column series.
     * * Hilo - Draws a Hilo series.
     * * HiloOpenClose - Draws a Hilo Open Close series.
     * * Waterfall - Draws a waterfall series.
     * * RangeArea - Draws a range area series.
     * * SplineRangeArea - Draws a spline range area series.
     * * Bubble - Draws a bubble series.
     * * Candle - Draws a candle series.
     * * Polar - Draws a polar series.
     * * Radar - Draws a radar series.
     * * BoxAndWhisker - Draws a box and whisker series.
     * * Pareto - Draws a Pareto series.
     * @default 'Line'
     */
    type: any;
    /**
     * Options to improve accessibility for series elements.
     */
    accessibility: any;
    /**
     * Options for customizing the animation of the series.
     * By default, animation is enabled with a duration of 1000 milliseconds (about 1 second). It can be disabled by setting enable to `false`.
     * The following properties are supported in animation:
     * * enable: If set to true, the series is animated on initial loading.
     * * duration: The duration of the animation in milliseconds.
     * * delay: The delay before the animation starts, in milliseconds.
     */
    animation: any;
    /**
     * This property is used in financial charts to visualize price movements in stocks.
     * It defines the color of the candle/point when the opening price is less than the closing price.
     * @default null
     */
    bearFillColor: any;
    /**
     * The `binInterval` property controls the width of each bin and the interval between bins for histogram points.
     * @default null
     * @aspdefaultvalueignore
     */
    binInterval: any;
    /**
     * Options for customizing the border of the series.
     * > Note that this property is applicable only for `Column` and `Bar` type series.
     */
    border: any;
    /**
     * Specifies the box plot mode for the box and whisker chart series.
     * The available modes are:
     * Exclusive - Renders the series based on the exclusive mode.
     * Inclusive - Renders the series based on the inclusive mode.
     * Normal - Renders the series based on the normal mode.
     * @default 'Normal'
     */
    boxPlotMode: any;
    /**
     * This property is used in financial charts to visualize price movements in stocks.
     * It defines the color of the candle/point when the opening price is higher than the closing price.
     * @default null
     */
    bullFillColor: any;
    /**
     * Specifies the tension parameter for cardinal splines. This affects the curvature of the spline.
     * @default 0.5
     */
    cardinalSplineTension: any;
    /**
     * The data source field that contains the close value.
     * It is applicable for both financial series and technical indicators.
     * @default ''
     */
    close: any;
    /**
     * The data source field that contains the color mapping value.
     * It is applicable for range color mapping.
     */
    colorName: any;
    /**
     * Defines the shape of the data in a column and bar chart.
     * Available shapes are:
     * * Rectangle: Displays the data in a column and bar chart with a rectangular shape.
     * * Cylinder: Displays the data in a column and bar chart with a cylindrical shape.
     * @default 'Rectangle'
     */
    columnFacet: any;
    /**
     * This property determines the space between columns in a column or bar chart.
     * > Note that it takes a value from 0 to 1.
     * @default 0
     */
    columnSpacing: any;
    /**
     * The `columnWidth` property can be used to customize the width of the columns in a column series.
     * > Note that if the series type is histogram, the default value is 1; otherwise, it is 0.7.
     * @default null
     * @aspdefaultvalueignore
     * @blazordefaultvalue Double.NaN
     */
    columnWidth: any;
    /**
     * To render the column series points with a specific column width in pixels.
     * @default null
     * @aspdefaultvalueignore
     * @blazordefaultvalue Double.NaN
     */
    columnWidthInPixel: any;
    /**
     * Specifies the appearance of the line connecting adjacent points in waterfall charts.
     */
    connector: any;
    /**
     * The `cornerRadius` property specifies the radius for the corners of the column series points to create a rounded appearance in the chart.
     */
    cornerRadius: any;
    /**
     * Defines the pattern of dashes and gaps used to stroke the lines in `Line` type series.
     * @default ''
     */
    dashArray: any;
    /**
     * Specifies the data source for the series. It can be an array of JSON objects, or an instance of DataManager.
     *
     * @default ''
     */
    dataSource: any;
    /**
     * Customize the drag settings for the series with this property to configure drag behavior in the chart.
     */
    dragSettings: any;
    /**
     * Specifies the type of series to be drawn in radar or polar charts.
     * The available options are:
     * * 'Line' - Renders a line series.
     * * 'Column' - Renders a column series.
     * * 'Area' - Renders an area series.
     * * 'Scatter' - Renders a scatter series.
     * * 'Spline' - Renders a spline series.
     * * 'StackingColumn' - Renders a stacking column series.
     * * 'StackingArea' - Renders a stacking area series.
     * * 'RangeColumn' - Renders a range column series.
     * * 'SplineArea' - Renders a spline area series.
     * @default 'Line'
     */
    drawType: any;
    /**
     * Customization options for the appearance of empty points in the series.
     * `null` or `undefined` values are considered empty points.
     */
    emptyPointSettings: any;
    /**
     * This property is used to improve chart performance through data mapping for the series data source.
     * @default false
     */
    enableComplexProperty: any;
    /**
     * This property is applicable for the candle series.
     * It enables or disables the visual comparison of the current values with previous values in stock charts.
     * @default false
     */
    enableSolidCandles: any;
    /**
     * Controls whether the tooltip for the chart series is enabled or disabled. Set to true to display tooltips on hover, or false to hide them.
     * @default true
     */
    enableTooltip: any;
    /**
     * Options for displaying and customizing error bars for individual points in a series.
     */
    errorBar: any;
    /**
     * The fill color for the series, which accepts values in hex or rgba as a valid CSS color string.
     * It also represents the color of the signal lines in technical indicators.
     * For technical indicators, the default value is 'blue', and for series, it is null.
     * @default null
     */
    fill: any;
    /**
     * Defines the name that specifies the chart series are mutually exclusive and can be overlaid.
     * Series in the same group share the same baseline and location on the corresponding axis.
     * @default ''
     */
    groupName: any;
    /**
     * The data source field that contains the high value.
     * It is applicable for both financial series and technical indicators.
     * @default ''
     */
    high: any;
    /**
     * Defines the collection of indexes for the intermediate summary columns in waterfall charts.
     * @default []
     * @asptype int[]
     */
    intermediateSumIndexes: any;
    /**
     * Specifies whether to join the start and end points of a line/area series used in a polar/radar chart to form a closed path.
     * @default true
     */
    isClosed: any;
    /**
     * Configures the options for displaying series names as inline labels in the chart.
     */
    labelSettings: any;
    /**
     * Options for customizing and displaying the last value in the series.
     */
    lastValueLabel: any;
    /**
     * The URL for the image to be displayed as a legend icon.
     * > Note that `legendShape` must be set to `Image`.
     * @default ''
     */
    legendImageUrl: any;
    /**
     * Specifies the shape of the legend icon for each series.
     * Available shapes for legend:
     * * Circle - Renders a circular icon.
     * * Rectangle - Renders a rectangular icon.
     * * Triangle - Renders a triangular icon.
     * * Diamond - Renders a diamond-shaped icon.
     * * Cross - Renders a cross-shaped icon.
     * * HorizontalLine - Renders a horizontal line icon.
     * * VerticalLine - Renders a vertical line icon.
     * * Pentagon - Renders a pentagon-shaped icon.
     * * InvertedTriangle - Renders an inverted triangle-shaped icon.
     * * SeriesType - Uses the default icon shape based on the series type.
     * * Image - Renders a custom image for the legend icon.
     * @default 'SeriesType'
     */
    legendShape: any;
    /**
     * Applies a linear gradient fill to the series.
     * The gradient transitions colors along a straight line.
     * When both linearGradient and radialGradient are specified, linearGradient takes precedence.
     * @default null
     */
    linearGradient: any;
    /**
     * The data source field that contains the low value.
     * It is applicable for both financial series and technical indicators.
     * @default ''
     */
    low: any;
    /**
     * Options for displaying and customizing markers for individual points in a series.
     */
    marker: any;
    /**
     * Specifies the maximum radius for the data points in the series.
     * @default 3
     */
    maxRadius: any;
    /**
     * Specifies the minimum radius for the data points in the series.
     * @default 1
     */
    minRadius: any;
    /**
     * The `name` property allows setting a name for the series, which will be displayed in the legend, identifying different series in the chart, especially when multiple series are present.
     * @default ''
     */
    name: any;
    /**
     * Defines the visual representation of negative changes in waterfall charts.
     * @default '#C64E4A'
     */
    negativeFillColor: any;
    /**
     * When set to true, the step series will be rendered without the vertical lines (risers) connecting the horizontal steps.
     * > Note this property is only applicable to step series.
     * @default false
     */
    noRisers: any;
    /**
     * The `nonHighlightStyle` property is used to specify custom CSS styles for the non-highlighted series or points.
     * @default null
     */
    nonHighlightStyle: any;
    /**
     * Sets the opacity of the series, with a value between 0 and 1 where 0 is fully transparent and 1 is fully opaque.
     * @default 1
     */
    opacity: any;
    /**
     * The data source field that contains the open value.
     * It is applicable for both financial series and technical indicators.
     * @default ''
     */
    open: any;
    /**
     * Options for customizing the Pareto line series, including its appearance and behavior in the chart.
     */
    paretoOptions: any;
    /**
     * The data source field that contains the color value of a point.
     * It is applicable for series.
     * @default ''
     */
    pointColorMapping: any;
    /**
     * Specifies a query to select data from the data source. This property is applicable only when the data source is an `ej.DataManager`.
     * @default ''
     */
    query: any;
    /**
     * Applies a radial gradient fill to the series.
     * The gradient transitions colors outward from a central point.
     * @default null
     */
    radialGradient: any;
    /**
     * Defines the axis along which the line series will be split.
     */
    segmentAxis: any;
    /**
     * Specifies a collection of regions used to differentiate a line series.
     */
    segments: any;
    /**
     * The `selectionStyle` property is used to specify custom CSS styles for the selected series or points.
     * @default null
     */
    selectionStyle: any;
    /**
     * If set to true, the mean value for the box and whisker plot will be visible.
     * @default true
     */
    showMean: any;
    /**
     * Enables or disables the display of tooltips for the nearest data point to the cursor for series.
     * @default true
     */
    showNearestTooltip: any;
    /**
     * Specifies whether to display the normal distribution curve for the histogram series.
     * @default false
     */
    showNormalDistribution: any;
    /**
     * Specifies whether to display outliers in the Box and Whisker chart.
     *
     * If set to `true`, outliers will be displayed as individual points beyond the whiskers, representing data points that significantly differ from the rest of the dataset.
     *If set to `false`, outliers will be hidden, and only the box, median, and whiskers will be rendered.
     *
     *Outliers are typically used to identify extreme values in statistical data representation.
     *
     * @default true
     */
    showOutliers: any;
    /**
     * The data source field that contains the size value for the y-axis.
     * @default ''
     */
    size: any;
    /**
     * Specifies the type of spline used for rendering.
     * Available options include:
     * * Natural - Renders a natural spline.
     * * Cardinal - Renders a cardinal spline.
     * * Clamped - Renders a clamped spline.
     * * Monotonic - Renders a monotonic spline.
     * @default 'Natural'
     */
    splineType: any;
    /**
     * This property allows the grouping of series in stacked column and stacked bar charts.
     * Any string value can be assigned to the `stackingGroup` property.
     * Series with the same `stackingGroup` value will be grouped together in the chart.
     * @default ''
     */
    stackingGroup: any;
    /**
     * The `step` property can be used to change the position of the steps in step line, step area, and step range area chart types.
     * * Left: Steps start from the left side of the 2nd point.
     * * Center: Steps start between the data points.
     * * Right: Steps start from the right side of the 1st point.
     * @default 'Left'
     */
    step: any;
    /**
     * Defines the collection of indexes for the overall summary columns in waterfall charts.
     * @default []
     * @asptype int[]
     */
    sumIndexes: any;
    /**
     * Defines the visual representation of summaries in waterfall charts.
     * @default '#4E81BC'
     */
    summaryFillColor: any;
    /**
     * Use this property to define a custom format for how tooltips are displayed.
     *
     * @default ''
     */
    tooltipFormat: any;
    /**
     * The data source field that contains the value to be displayed in the tooltip.
     * @default ''
     */
    tooltipMappingName: any;
    /**
     * Defines the collection of trendlines used to predict the trend.
     */
    trendlines: any;
    /**
     * The `unSelectedStyle` property is used to specify custom CSS styles for the deselected series or points.
     * @default null
     */
    unSelectedStyle: any;
    /**
     * If set to `true`, the series will be visible. If set to `false`, the series will be hidden.
     * @default true
     */
    visible: any;
    /**
     * Defines the data source field that contains the volume value in candle charts.
     * It is applicable for both financial series and technical indicators.
     * @default ''
     */
    volume: any;
    /**
     * The stroke width for the series, applicable only for `Line` type series.
     * It also represents the stroke width of the signal lines in technical indicators.
     * @default 1
     */
    width: any;
    /**
     * The name of the horizontal axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators.
     *
     * @default null
     */
    xAxisName: any;
    /**
     * The data source field that contains the x value.
     * It is applicable to both series and technical indicators.
     * @default ''
     */
    xName: any;
    /**
     * The name of the vertical axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators.
     *
     * @default null
     */
    yAxisName: any;
    /**
     * The data source field that contains the y value.
     * @default ''
     */
    yName: any;
    /**
     * The z-order of the series, which controls the stack order of the series. Higher values are drawn on top of lower values.
     * @default 0
     */
    zOrder: any;
    dataLabel_template: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<SeriesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SeriesDirective, "e-series-collection>e-series", never, { "accessibility": "accessibility"; "animation": "animation"; "bearFillColor": "bearFillColor"; "binInterval": "binInterval"; "border": "border"; "boxPlotMode": "boxPlotMode"; "bullFillColor": "bullFillColor"; "cardinalSplineTension": "cardinalSplineTension"; "close": "close"; "colorName": "colorName"; "columnFacet": "columnFacet"; "columnSpacing": "columnSpacing"; "columnWidth": "columnWidth"; "columnWidthInPixel": "columnWidthInPixel"; "connector": "connector"; "cornerRadius": "cornerRadius"; "dashArray": "dashArray"; "dataSource": "dataSource"; "dragSettings": "dragSettings"; "drawType": "drawType"; "emptyPointSettings": "emptyPointSettings"; "enableComplexProperty": "enableComplexProperty"; "enableSolidCandles": "enableSolidCandles"; "enableTooltip": "enableTooltip"; "errorBar": "errorBar"; "fill": "fill"; "groupName": "groupName"; "high": "high"; "intermediateSumIndexes": "intermediateSumIndexes"; "isClosed": "isClosed"; "labelSettings": "labelSettings"; "lastValueLabel": "lastValueLabel"; "legendImageUrl": "legendImageUrl"; "legendShape": "legendShape"; "linearGradient": "linearGradient"; "low": "low"; "marker": "marker"; "maxRadius": "maxRadius"; "minRadius": "minRadius"; "name": "name"; "negativeFillColor": "negativeFillColor"; "noRisers": "noRisers"; "nonHighlightStyle": "nonHighlightStyle"; "opacity": "opacity"; "open": "open"; "paretoOptions": "paretoOptions"; "pointColorMapping": "pointColorMapping"; "query": "query"; "radialGradient": "radialGradient"; "segmentAxis": "segmentAxis"; "segments": "segments"; "selectionStyle": "selectionStyle"; "showMean": "showMean"; "showNearestTooltip": "showNearestTooltip"; "showNormalDistribution": "showNormalDistribution"; "showOutliers": "showOutliers"; "size": "size"; "splineType": "splineType"; "stackingGroup": "stackingGroup"; "step": "step"; "sumIndexes": "sumIndexes"; "summaryFillColor": "summaryFillColor"; "tooltipFormat": "tooltipFormat"; "tooltipMappingName": "tooltipMappingName"; "trendlines": "trendlines"; "type": "type"; "unSelectedStyle": "unSelectedStyle"; "visible": "visible"; "volume": "volume"; "width": "width"; "xAxisName": "xAxisName"; "xName": "xName"; "yAxisName": "yAxisName"; "yName": "yName"; "zOrder": "zOrder"; }, {}, ["dataLabel_template", "childTrendlines", "childSegments"]>;
}
/**
 * Series Array Directive
 * @private
 */
export declare class SeriesCollectionDirective extends ArrayBase<SeriesCollectionDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SeriesCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SeriesCollectionDirective, "ej-chart>e-series-collection", never, {}, {}, ["children"]>;
}
