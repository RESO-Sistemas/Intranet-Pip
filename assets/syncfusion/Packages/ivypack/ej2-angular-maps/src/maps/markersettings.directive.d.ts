import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to define the markers in the maps.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-markerSettings>
 * <e-markerSetting>
 * </e-markerSetting>
 * </e-markerSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class MarkerDirective extends ComplexBase<MarkerDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Gets or sets the delay time for the animation in marker.
     * @default 0
     */
    animationDelay: any;
    /**
     * Gets or sets the duration time for animating the marker.
     * @default 1000
     */
    animationDuration: any;
    /**
     * Gets or sets the options for customizing the style properties of the border of the marker in maps.
     */
    border: any;
    /**
     * Gets or sets the options for customizing the clustering of markers on the map.
     * This property is used to cluster markers based on the current marker settings, and it is applied only when the `allowClustering` property is enabled.
     */
    clusterSettings: any;
    /**
     * Gets or sets the field name from the marker data source based on which the color is applied for the marker.
     * @default null
     */
    colorValuePath: any;
    /**
     * Gets or sets the dash-array for the marker.
     */
    dashArray: any;
    /**
     * Gets or sets the data source for the marker.
     * The data source for the marker will contain latitude and longitude values to specify the location
     * of the marker.
     * The data source can contain data such as color, shape, and other details that can be bound to the color, shape,
     * and tooltip of the marker.
     * @isobservable true
     * @default []
     */
    dataSource: any;
    /**
     * Enables or disables marker drag and drop functionality at any location on the map.
     * @default false
     */
    enableDrag: any;
    /**
     * Gets or sets the color for the marker in maps.
     * @default '#FF471A'
     */
    fill: any;
    /**
     * Gets or sets the height of the marker in maps.
     * @default 10
     */
    height: any;
    /**
     * Gets or sets the field name from the data source that determines the marker height.
     * @default null
     */
    heightValuePath: any;
    /**
     * Gets or sets the options to customize the marker when the mouse hovers over the markers in maps.
     */
    highlightSettings: any;
    /**
     * Gets or sets the URL for rendering the marker as image. This property acts as image source for all the markers in a marker settings.
     */
    imageUrl: any;
    /**
     * Gets or sets the field name from the marker data source based on which the image source for the image type marker is got individually.
     * @default null
     */
    imageUrlValuePath: any;
    /**
     * Gets or sets the options to select the markers at the initial rendering time of the maps.
     * The initial selection of markers will be performed only when the selection functionality of marker is enabled.
     */
    initialMarkerSelection: any;
    /**
     * Defines the field name from the marker data source for setting latitude for a set of markers.
     */
    latitudeValuePath: any;
    /**
     * Gets or sets the field name from the marker data source to render legend item text for the marker legend.
     * @default ''
     */
    legendText: any;
    /**
     * Defines the field name from the marker data source for setting longitude for a set of markers.
     */
    longitudeValuePath: any;
    /**
     * Gets or sets the offset value from which the marker must be rendered from the intended position.
     */
    offset: any;
    /**
     * Gets or sets the opacity for the marker in maps.
     * @default 1
     */
    opacity: any;
    /**
     * Gets or sets the query to select particular data from the marker data source.
     * This property is applicable only when the data source is created by data manager.
     * @default null
     */
    query: any;
    /**
     * Gets or sets the options to customize the marker while selecting the marker in maps.
     */
    selectionSettings: any;
    /**
     * Gets or sets the shape of the marker in maps.
     * @default Balloon
     */
    shape: any;
    /**
     * Gets or sets the field name from the marker data source based on which the shape for individual markers are set.
     * @default null
     */
    shapeValuePath: any;
    /**
     * Gets or sets the options to customize the tooltip of the marker in maps.
     */
    tooltipSettings: any;
    /**
     * Enables or disables the visibility of the markers in maps.
     * @default false
     */
    visible: any;
    /**
     * Gets or sets the width of the marker in maps.
     * @default 10
     */
    width: any;
    /**
     * Gets or sets the field name from the data source that determines the marker width.
     * @default null
     */
    widthValuePath: any;
    /**
     * Gets or sets the template for the marker to render custom elements.
     * @default null
     * @asptype string
     */
    template: any;
    tooltipSettings_template: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MarkerDirective, "e-layer>e-markerSettings>e-markerSetting", never, { "animationDelay": "animationDelay"; "animationDuration": "animationDuration"; "border": "border"; "clusterSettings": "clusterSettings"; "colorValuePath": "colorValuePath"; "dashArray": "dashArray"; "dataSource": "dataSource"; "enableDrag": "enableDrag"; "fill": "fill"; "height": "height"; "heightValuePath": "heightValuePath"; "highlightSettings": "highlightSettings"; "imageUrl": "imageUrl"; "imageUrlValuePath": "imageUrlValuePath"; "initialMarkerSelection": "initialMarkerSelection"; "latitudeValuePath": "latitudeValuePath"; "legendText": "legendText"; "longitudeValuePath": "longitudeValuePath"; "offset": "offset"; "opacity": "opacity"; "query": "query"; "selectionSettings": "selectionSettings"; "shape": "shape"; "shapeValuePath": "shapeValuePath"; "template": "template"; "tooltipSettings": "tooltipSettings"; "visible": "visible"; "width": "width"; "widthValuePath": "widthValuePath"; }, {}, ["template", "tooltipSettings_template"]>;
}
/**
 * Marker Array Directive
 * @private
 */
export declare class MarkersDirective extends ArrayBase<MarkersDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MarkersDirective, "e-layer>e-markerSettings", never, {}, {}, ["children"]>;
}
