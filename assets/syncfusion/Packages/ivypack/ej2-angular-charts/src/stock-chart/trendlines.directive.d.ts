import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Series Directive
 * ```html
 * <e-stockchart-series-collection>
 * <e-stockchart-series>
 * <e-trendlines>
 * </e-trendline>
 * <e-trendline>
 * </e-trendlines>
 * </e-stockchart-series>
 * </e-stockchart-series-collection>
 * ```
 */
export declare class StockChartTrendlineDirective extends ComplexBase<StockChartTrendlineDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the type of trendline used in the series.
     * Available types are:
     * * Linear - A straight line that shows the general direction of data.
     * * Exponential - A curve that fits data with exponential growth or decay.
     * * Polynomial - A curve that fits data with a polynomial function.
     * * Power - A curve that represents data with a power function.
     * * Logarithmic - A curve that fits data with a logarithmic scale.
     * * MovingAverage - A trendline that smoothens data using a moving average calculation.
     * @default 'Linear'
     */
    type: any;
    /**
     * Options to improve accessibility for chart trendline elements.
     */
    accessibility: any;
    /**
     * Options to customize the animation for trendlines.
     */
    animation: any;
    /**
     * Defines the period by which the trend is to be backward forecasted.
     * @default 0
     */
    backwardForecast: any;
    /**
     * Configures the pattern of dashes and gaps in the trendline stroke using the `dashArray` property.
     * @default ''
     */
    dashArray: any;
    /**
     * Enables or disables the tooltip for the trendline using the `enableTooltip` property. By default, it is set to true.
     * @default true
     */
    enableTooltip: any;
    /**
     * The fill color for the trendline, which accepts values in hex or rgba as valid CSS color strings.
     * @default ''
     */
    fill: any;
    /**
     * Defines the period by which the trend must be forward forecasted.
     * @default 0
     */
    forwardForecast: any;
    /**
     * Specifies the intercept value of the trendline.
     * @default null
     * @aspdefaultvalueignore
     */
    intercept: any;
    /**
     * The `legendShape` property defines the shape used to represent the trendline in the chart legend.
     * @default 'SeriesType'
     */
    legendShape: any;
    /**
     * Applies a linear gradient fill to the trendline.
     * @default null
     */
    linearGradient: any;
    /**
     * Options for customizing the markers for trendlines, including shape, size, color, and other visual aspects.
     * @deprecated
     */
    marker: any;
    /**
     * The `name` property is used to assign a descriptive name to the trendline, which will be displayed in the chart as a legend.
     * @default ''
     */
    name: any;
    /**
     * Defines the period, the price changes over which will be considered to predict the moving average trendline.
     * @default 2
     */
    period: any;
    /**
     * Defines the polynomial order of the polynomial trendline.
     * @default 2
     */
    polynomialOrder: any;
    /**
     * Applies a radial gradient fill to the trendline.
     * @default null
     */
    radialGradient: any;
    /**
     * The `visible` property controls the display of the trendline. If set to true, the trendline will be rendered on the chart. If set to false, the trendline will be hidden.
     * @default true
     */
    visible: any;
    /**
     * Defines the width of the trendline.
     * @default 1
     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<StockChartTrendlineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StockChartTrendlineDirective, "e-stockchart-series>e-trendlines>e-trendline", never, { "accessibility": "accessibility"; "animation": "animation"; "backwardForecast": "backwardForecast"; "dashArray": "dashArray"; "enableTooltip": "enableTooltip"; "fill": "fill"; "forwardForecast": "forwardForecast"; "intercept": "intercept"; "legendShape": "legendShape"; "linearGradient": "linearGradient"; "marker": "marker"; "name": "name"; "period": "period"; "polynomialOrder": "polynomialOrder"; "radialGradient": "radialGradient"; "type": "type"; "visible": "visible"; "width": "width"; }, {}, never>;
}
/**
 * StockChartTrendline Array Directive
 * @private
 */
export declare class StockChartTrendlinesDirective extends ArrayBase<StockChartTrendlinesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<StockChartTrendlinesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StockChartTrendlinesDirective, "e-stockchart-series>e-trendlines", never, {}, {}, ["children"]>;
}
