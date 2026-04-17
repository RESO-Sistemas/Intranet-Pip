import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to define the layer of the maps.
 * ```html
 * <e-layers>
 * <e-layer></e-layer>
 * </e-layers>
 * ```
 */
export declare class LayerDirective extends ComplexBase<LayerDirective> {
    private viewContainerRef;
    directivePropList: any;
    childInitialShapeSelection: any;
    childMarkerSettings: any;
    childBubbleSettings: any;
    childNavigationLineSettings: any;
    tags: string[];
    /**
     * Gets or sets the type of the layer in maps. There are two types: Layer and SubLayer.
     * @default Layer
     */
    type: any;
    /**
     * Gets or sets the duration of the animation of layers when the zooming is performed in maps.
     * @default 0
     */
    animationDuration: any;
    /**
     * Gets or sets the options for customizing the bubbles in maps.
     */
    bubbleSettings: any;
    /**
     * Gets or sets the options for customizing the data labels in maps.
     */
    dataLabelSettings: any;
    /**
     * Gets or sets the data source for the layer.
     * The data bound to the shapes using data source can be used to display the tooltip, marker, and bubble.
     * @isobservable true
     * @default []
     */
    dataSource: any;
    /**
     * Gets or sets the geometry type for the layer in maps. There are two types: Geographic and Normal.
     * - Geographic type renders the shape maps with geographical coordinate system.
     * - Normal type renders the shape maps using default coordinate system.
     * @default Geographic
     */
    geometryType: any;
    /**
     * Gets or sets the options for customizing the shapes when the mouse hovers over maps.
     */
    highlightSettings: any;
    /**
     * Gets or sets the settings for the shapes to be selected when the maps rendering initially.
     * The initial selection of shapes will be performed only when the selection functionality of layer is enabled.
     */
    initialShapeSelection: any;
    /**
     * Gets or sets the options for customizing the cluster of markers in maps.
     */
    markerClusterSettings: any;
    /**
     * Gets or sets the options for customizing the markers in maps.
     */
    markerSettings: any;
    /**
     * Gets or sets the options for customizing the navigation lines in maps.
     */
    navigationLineSettings: any;
    /**
     * Gets or sets the properties of the polygon shapes that will be rendered on a map layer.
     * The selection and highlight settings for polygon shapes can also be defined.
     */
    polygonSettings: any;
    /**
     * Gets or sets the query to select particular data from the layer data source.
     * This property is applicable only when the data source is created by data manager.
     * @default null
     */
    query: any;
    /**
     * Gets or sets the options for customizing the shapes when clicking on the shapes in maps.
     */
    selectionSettings: any;
    /**
     * Gets or sets the data for the maps to render.
     * The data is normally JSON object with GeoJSON format that defines the shapes and geometries of the map.
     * @isobservable true
     * @default null
     */
    shapeData: any;
    /**
     * Gets or sets the field name from the GeoJSON data to map the shape to the data defined in the layer data source.
     * @default 'name'
     */
    shapeDataPath: any;
    /**
     * Gets or sets the field name from the data source to map the shape to the data defined in the layer data source.
     * @default 'name'
     */
    shapePropertyPath: any;
    /**
     * Gets or sets the options to customize the shape of the maps.
     */
    shapeSettings: any;
    /**
     * Gets or sets the options for customizing the toggle state of shapes when selecting the legend in maps.
     */
    toggleLegendSettings: any;
    /**
     * Gets or sets the options for customizing the tooltip of the layers in maps.
     */
    tooltipSettings: any;
    /**
     * Gets or sets the URL of the online map providers.
     * The online map providers will be rendered only when the shape data is not set and layer type is set with default value.
     * @default ''
     */
    urlTemplate: any;
    /**
     * Enables or disables the visibility of the layers in maps.
     * @default true
     */
    visible: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<LayerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LayerDirective, "e-layers>e-layer", never, { "animationDuration": "animationDuration"; "bubbleSettings": "bubbleSettings"; "dataLabelSettings": "dataLabelSettings"; "dataSource": "dataSource"; "geometryType": "geometryType"; "highlightSettings": "highlightSettings"; "initialShapeSelection": "initialShapeSelection"; "markerClusterSettings": "markerClusterSettings"; "markerSettings": "markerSettings"; "navigationLineSettings": "navigationLineSettings"; "polygonSettings": "polygonSettings"; "query": "query"; "selectionSettings": "selectionSettings"; "shapeData": "shapeData"; "shapeDataPath": "shapeDataPath"; "shapePropertyPath": "shapePropertyPath"; "shapeSettings": "shapeSettings"; "toggleLegendSettings": "toggleLegendSettings"; "tooltipSettings": "tooltipSettings"; "type": "type"; "urlTemplate": "urlTemplate"; "visible": "visible"; }, {}, ["childInitialShapeSelection", "childMarkerSettings", "childBubbleSettings", "childNavigationLineSettings"]>;
}
/**
 * Layer Array Directive
 * @private
 */
export declare class LayersDirective extends ArrayBase<LayersDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<LayersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LayersDirective, "ej-maps>e-layers", never, {}, {}, ["children"]>;
}
