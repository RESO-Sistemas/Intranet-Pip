import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsModule } from './maps.module';
import { Bubble, Legend, Marker, Highlight, Selection, MapsTooltip, Zoom, DataLabel, NavigationLine, Annotations, Print, PdfExport, ImageExport, Polygon } from '@syncfusion/ej2-maps';
import * as i0 from "@angular/core";
export const BubbleService = { provide: 'MapsBubble', useValue: Bubble };
export const LegendService = { provide: 'MapsLegend', useValue: Legend };
export const MarkerService = { provide: 'MapsMarker', useValue: Marker };
export const HighlightService = { provide: 'MapsHighlight', useValue: Highlight };
export const SelectionService = { provide: 'MapsSelection', useValue: Selection };
export const MapsTooltipService = { provide: 'MapsMapsTooltip', useValue: MapsTooltip };
export const ZoomService = { provide: 'MapsZoom', useValue: Zoom };
export const DataLabelService = { provide: 'MapsDataLabel', useValue: DataLabel };
export const NavigationLineService = { provide: 'MapsNavigationLine', useValue: NavigationLine };
export const AnnotationsService = { provide: 'MapsAnnotations', useValue: Annotations };
export const PrintService = { provide: 'MapsPrint', useValue: Print };
export const PdfExportService = { provide: 'MapsPdfExport', useValue: PdfExport };
export const ImageExportService = { provide: 'MapsImageExport', useValue: ImageExport };
export const PolygonService = { provide: 'MapsPolygon', useValue: Polygon };
/**
 * NgModule definition for the Maps component with providers.
 */
export class MapsAllModule {
}
MapsAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MapsAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MapsAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MapsAllModule, imports: [CommonModule, MapsModule], exports: [MapsModule] });
MapsAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MapsAllModule, providers: [
        BubbleService,
        LegendService,
        MarkerService,
        HighlightService,
        SelectionService,
        MapsTooltipService,
        ZoomService,
        DataLabelService,
        NavigationLineService,
        AnnotationsService,
        PrintService,
        PdfExportService,
        ImageExportService,
        PolygonService
    ], imports: [[CommonModule, MapsModule], MapsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MapsAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MapsModule],
                    exports: [
                        MapsModule
                    ],
                    providers: [
                        BubbleService,
                        LegendService,
                        MarkerService,
                        HighlightService,
                        SelectionService,
                        MapsTooltipService,
                        ZoomService,
                        DataLabelService,
                        NavigationLineService,
                        AnnotationsService,
                        PrintService,
                        PdfExportService,
                        ImageExportService,
                        PolygonService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcy1hbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21hcHMvbWFwcy1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFDLE1BQU0sc0JBQXNCLENBQUE7O0FBR3BMLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztBQUN2RixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWtCLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDdkYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFrQixFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBQ3ZGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQ2hHLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQ2hHLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFrQixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLENBQUM7QUFDdEcsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFrQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ2pGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQ2hHLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFrQixFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUM7QUFDL0csTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUN0RyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWtCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDcEYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDaEcsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUN0RyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFFMUY7O0dBRUc7QUF1QkgsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxZQXJCWixZQUFZLEVBQUUsVUFBVSxhQUU5QixVQUFVOzJHQW1CTCxhQUFhLGFBakJaO1FBQ04sYUFBYTtRQUNiLGFBQWE7UUFDYixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsV0FBVztRQUNYLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGNBQWM7S0FDakIsWUFuQlEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBRS9CLFVBQVU7MkZBbUJMLGFBQWE7a0JBdEJ6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7b0JBQ25DLE9BQU8sRUFBRTt3QkFDTCxVQUFVO3FCQUNiO29CQUNELFNBQVMsRUFBQzt3QkFDTixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLGdCQUFnQjt3QkFDaEIscUJBQXFCO3dCQUNyQixrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGNBQWM7cUJBQ2pCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIFZhbHVlUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbml0aWFsU2hhcGVTZWxlY3Rpb25EaXJlY3RpdmUsIEluaXRpYWxTaGFwZVNlbGVjdGlvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2luaXRpYWxzaGFwZXNlbGVjdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWFya2VyRGlyZWN0aXZlLCBNYXJrZXJzRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXJrZXJzZXR0aW5ncy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sb3JNYXBwaW5nRGlyZWN0aXZlLCBDb2xvck1hcHBpbmdzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2xvcm1hcHBpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJ1YmJsZURpcmVjdGl2ZSwgQnViYmxlc0RpcmVjdGl2ZSB9IGZyb20gJy4vYnViYmxlc2V0dGluZ3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5hdmlnYXRpb25MaW5lRGlyZWN0aXZlLCBOYXZpZ2F0aW9uTGluZXNEaXJlY3RpdmUgfSBmcm9tICcuL25hdmlnYXRpb25saW5lc2V0dGluZ3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IExheWVyRGlyZWN0aXZlLCBMYXllcnNEaXJlY3RpdmUgfSBmcm9tICcuL2xheWVycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW5ub3RhdGlvbkRpcmVjdGl2ZSwgQW5ub3RhdGlvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2Fubm90YXRpb25zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXBzQ29tcG9uZW50IH0gZnJvbSAnLi9tYXBzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBzTW9kdWxlIH0gZnJvbSAnLi9tYXBzLm1vZHVsZSc7XG5pbXBvcnQge0J1YmJsZSwgTGVnZW5kLCBNYXJrZXIsIEhpZ2hsaWdodCwgU2VsZWN0aW9uLCBNYXBzVG9vbHRpcCwgWm9vbSwgRGF0YUxhYmVsLCBOYXZpZ2F0aW9uTGluZSwgQW5ub3RhdGlvbnMsIFByaW50LCBQZGZFeHBvcnQsIEltYWdlRXhwb3J0LCBQb2x5Z29ufSBmcm9tICdAc3luY2Z1c2lvbi9lajItbWFwcydcblxuXG5leHBvcnQgY29uc3QgQnViYmxlU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ01hcHNCdWJibGUnLCB1c2VWYWx1ZTogQnViYmxlfTtcbmV4cG9ydCBjb25zdCBMZWdlbmRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnTWFwc0xlZ2VuZCcsIHVzZVZhbHVlOiBMZWdlbmR9O1xuZXhwb3J0IGNvbnN0IE1hcmtlclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdNYXBzTWFya2VyJywgdXNlVmFsdWU6IE1hcmtlcn07XG5leHBvcnQgY29uc3QgSGlnaGxpZ2h0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ01hcHNIaWdobGlnaHQnLCB1c2VWYWx1ZTogSGlnaGxpZ2h0fTtcbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnTWFwc1NlbGVjdGlvbicsIHVzZVZhbHVlOiBTZWxlY3Rpb259O1xuZXhwb3J0IGNvbnN0IE1hcHNUb29sdGlwU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ01hcHNNYXBzVG9vbHRpcCcsIHVzZVZhbHVlOiBNYXBzVG9vbHRpcH07XG5leHBvcnQgY29uc3QgWm9vbVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdNYXBzWm9vbScsIHVzZVZhbHVlOiBab29tfTtcbmV4cG9ydCBjb25zdCBEYXRhTGFiZWxTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnTWFwc0RhdGFMYWJlbCcsIHVzZVZhbHVlOiBEYXRhTGFiZWx9O1xuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25MaW5lU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ01hcHNOYXZpZ2F0aW9uTGluZScsIHVzZVZhbHVlOiBOYXZpZ2F0aW9uTGluZX07XG5leHBvcnQgY29uc3QgQW5ub3RhdGlvbnNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnTWFwc0Fubm90YXRpb25zJywgdXNlVmFsdWU6IEFubm90YXRpb25zfTtcbmV4cG9ydCBjb25zdCBQcmludFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdNYXBzUHJpbnQnLCB1c2VWYWx1ZTogUHJpbnR9O1xuZXhwb3J0IGNvbnN0IFBkZkV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdNYXBzUGRmRXhwb3J0JywgdXNlVmFsdWU6IFBkZkV4cG9ydH07XG5leHBvcnQgY29uc3QgSW1hZ2VFeHBvcnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnTWFwc0ltYWdlRXhwb3J0JywgdXNlVmFsdWU6IEltYWdlRXhwb3J0fTtcbmV4cG9ydCBjb25zdCBQb2x5Z29uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ01hcHNQb2x5Z29uJywgdXNlVmFsdWU6IFBvbHlnb259O1xuXG4vKipcbiAqIE5nTW9kdWxlIGRlZmluaXRpb24gZm9yIHRoZSBNYXBzIGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXBzTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1hcHNNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczpbXG4gICAgICAgIEJ1YmJsZVNlcnZpY2UsXG4gICAgICAgIExlZ2VuZFNlcnZpY2UsXG4gICAgICAgIE1hcmtlclNlcnZpY2UsXG4gICAgICAgIEhpZ2hsaWdodFNlcnZpY2UsXG4gICAgICAgIFNlbGVjdGlvblNlcnZpY2UsXG4gICAgICAgIE1hcHNUb29sdGlwU2VydmljZSxcbiAgICAgICAgWm9vbVNlcnZpY2UsXG4gICAgICAgIERhdGFMYWJlbFNlcnZpY2UsXG4gICAgICAgIE5hdmlnYXRpb25MaW5lU2VydmljZSxcbiAgICAgICAgQW5ub3RhdGlvbnNTZXJ2aWNlLFxuICAgICAgICBQcmludFNlcnZpY2UsXG4gICAgICAgIFBkZkV4cG9ydFNlcnZpY2UsXG4gICAgICAgIEltYWdlRXhwb3J0U2VydmljZSxcbiAgICAgICAgUG9seWdvblNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcHNBbGxNb2R1bGUgeyB9Il19