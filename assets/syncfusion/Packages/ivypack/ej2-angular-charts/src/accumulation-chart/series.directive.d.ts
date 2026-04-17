import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * AccumulationSeries Directive
 * ```html
 * <e-accumulation-series-collection>
 * <e-accumulation-series></e-accumulation-series>
 * </e-accumulation-series-collection>
 * ```
 */
export declare class AccumulationSeriesDirective extends ComplexBase<AccumulationSeriesDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the type of series in the accumulation chart.
     * @default 'Pie'
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
     * When set to true, a different pattern is applied to each slice of the pie.
     * @default false
     */
    applyPattern: any;
    /**
     * Options for customizing the border of the series.
     */
    border: any;
    /**
     * Option for customizing the border radius.
     * @default 0
     */
    borderRadius: any;
    /**
     * Defines the pattern of dashes and gaps for the series border.
     * @default '0'
     */
    dashArray: any;
    /**
     * The data label property can be used to show the data label and customize its position and styling.
     */
    dataLabel: any;
    /**
     * Specifies the data source for the series. It can be an array of JSON objects, or an instance of DataManager.
     *
     * @default ''
     */
    dataSource: any;
    /**
     * Customization options for the appearance of empty points in the series, where `null` or `undefined` values are considered as empty points.
     */
    emptyPointSettings: any;
    /**
     * Controls whether the tooltip for the accumulation chart series is enabled or disabled. Set to true to display tooltips on hover, or false to hide them.
     * @default true
     */
    enableTooltip: any;
    /**
     * Specifies the ending angle for the series, in degrees.
     * @default null
     */
    endAngle: any;
    /**
     * If set to true, series points will explode on mouse click or touch.
     * @default false
     */
    explode: any;
    /**
     * If set to true, all the points in the series will explode on load.
     * @default false
     */
    explodeAll: any;
    /**
     * Index of the point in the series to be exploded on initial load.
     * @default null
     * @aspdefaultvalueignore
     * @blazordefaultvalue Double.NaN
     */
    explodeIndex: any;
    /**
     * Specifies the distance of the point from the center, which can be defined in both pixels and percentage.
     * @default '30%'
     */
    explodeOffset: any;
    /**
     * Defines the rendering mode for the funnel chart.
     * Available options are:
     * * Standard - Displays a funnel shape that narrows down to a point.
     * * Trapezoid - Displays a funnel shape with parallel sides near the top.
     * @default 'Standard'
     */
    funnelMode: any;
    /**
     * Defines the distance between the segments of a funnel or pyramid series.
     * The range is from 0 to 1.
     * @default 0
     */
    gapRatio: any;
    /**
     * In the accumulation series, y-values less than `groupMode` are combined into a single slice named 'others'.
     * @default Value
     */
    groupMode: any;
    /**
     * The y-values of the accumulation series that are less than `groupTo` are combined into a single slice named 'others'.
     * @default null
     */
    groupTo: any;
    /**
     * Defines the height of the funnel or pyramid series relative to the chart area.
     * @default '80%'
     */
    height: any;
    /**
     * When the `innerRadius` value is greater than 0%, a donut shape will appear in the pie series. It accepts only percentage values.
     * @default '0'
     */
    innerRadius: any;
    /**
     * The URL for the image to be displayed as a legend icon.
     * > Note that `legendShape` must be set to `Image`.
     * @default ''
     */
    legendImageUrl: any;
    /**
     * Specifies the shape of the legend icon for each data point.
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
     * The `name` property allows for setting a name for the series.
     * @default ''
     */
    name: any;
    /**
     * Defines the height of the funnel neck relative to the chart area.
     * @default '20%'
     */
    neckHeight: any;
    /**
     * Defines the width of the funnel neck relative to the chart area.
     * @default '20%'
     */
    neckWidth: any;
    /**
     * Sets the opacity of the series, with a value between 0 and 1 where 0 is fully transparent and 1 is fully opaque.
     * @default 1.
     */
    opacity: any;
    /**
     * The `palettes` array defines a set of colors used for rendering the accumulation chart's points. Each color in the array is applied to each point in order.
     * @default []
     */
    palettes: any;
    /**
     * The data source field that contains the color value of a point.
     * It is applicable for series.
     * @default ''
     */
    pointColorMapping: any;
    /**
     * Defines how the values are represented, either through the height or surface area of the segments.
     * @default 'Linear'
     */
    pyramidMode: any;
    /**
     * Specifies a query to select data from the data source. This property is applicable only when the data source is an `ej.DataManager`.
     * @default null
     */
    query: any;
    /**
     * Applies a radial gradient fill to the series.
     * The gradient transitions colors outward from a central point.
     * @default null
     */
    radialGradient: any;
    /**
     * Specifies the radius of the pie series as a percentage of the chart's size.
     * @default null
     */
    radius: any;
    /**
     * The `selectionStyle` property is used to specify custom CSS styles for the selected series or points.
     * @default null
     */
    selectionStyle: any;
    /**
     * Specifies the starting angle for the series, in degrees.
     * @default 0
     */
    startAngle: any;
    /**
     * The data source field that contains the value to be displayed in the tooltip.
     * @default ''
     */
    tooltipMappingName: any;
    /**
     * If set to true, the series will be visible. If set to false, the series will be hidden.
     * @default true
     */
    visible: any;
    /**
     * Defines the width of the funnel or pyramid series relative to the chart area.
     * @default '80%'
     */
    width: any;
    /**
     * The data source field that contains the x value.
     * @default ''
     */
    xName: any;
    /**
     * The data source field that contains the y value.
     * @default ''
     */
    yName: any;
    dataLabel_template: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AccumulationSeriesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AccumulationSeriesDirective, "e-accumulation-series-collection>e-accumulation-series", never, { "accessibility": "accessibility"; "animation": "animation"; "applyPattern": "applyPattern"; "border": "border"; "borderRadius": "borderRadius"; "dashArray": "dashArray"; "dataLabel": "dataLabel"; "dataSource": "dataSource"; "emptyPointSettings": "emptyPointSettings"; "enableTooltip": "enableTooltip"; "endAngle": "endAngle"; "explode": "explode"; "explodeAll": "explodeAll"; "explodeIndex": "explodeIndex"; "explodeOffset": "explodeOffset"; "funnelMode": "funnelMode"; "gapRatio": "gapRatio"; "groupMode": "groupMode"; "groupTo": "groupTo"; "height": "height"; "innerRadius": "innerRadius"; "legendImageUrl": "legendImageUrl"; "legendShape": "legendShape"; "linearGradient": "linearGradient"; "name": "name"; "neckHeight": "neckHeight"; "neckWidth": "neckWidth"; "opacity": "opacity"; "palettes": "palettes"; "pointColorMapping": "pointColorMapping"; "pyramidMode": "pyramidMode"; "query": "query"; "radialGradient": "radialGradient"; "radius": "radius"; "selectionStyle": "selectionStyle"; "startAngle": "startAngle"; "tooltipMappingName": "tooltipMappingName"; "type": "type"; "visible": "visible"; "width": "width"; "xName": "xName"; "yName": "yName"; }, {}, ["dataLabel_template"]>;
}
/**
 * AccumulationSeries Array Directive
 * @private
 */
export declare class AccumulationSeriesCollectionDirective extends ArrayBase<AccumulationSeriesCollectionDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AccumulationSeriesCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AccumulationSeriesCollectionDirective, "ej-accumulationchart>e-accumulation-series-collection", never, {}, {}, ["children"]>;
}
