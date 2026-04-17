import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SankeyModule } from './sankey.module';
import { SankeyLegend, SankeyTooltip, SankeyHighlight, SankeyExport } from '@syncfusion/ej2-charts';
import * as i0 from "@angular/core";
export const SankeyLegendService = { provide: 'ChartsSankeyLegend', useValue: SankeyLegend };
export const SankeyTooltipService = { provide: 'ChartsSankeyTooltip', useValue: SankeyTooltip };
export const SankeyHighlightService = { provide: 'ChartsSankeyHighlight', useValue: SankeyHighlight };
export const SankeyExportService = { provide: 'ChartsSankeyExport', useValue: SankeyExport };
/**
 * NgModule definition for the Sankey component with providers.
 */
export class SankeyAllModule {
}
SankeyAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SankeyAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyAllModule, imports: [CommonModule, SankeyModule], exports: [SankeyModule] });
SankeyAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyAllModule, providers: [
        SankeyLegendService,
        SankeyTooltipService,
        SankeyHighlightService,
        SankeyExportService
    ], imports: [[CommonModule, SankeyModule], SankeyModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SankeyModule],
                    exports: [
                        SankeyModule
                    ],
                    providers: [
                        SankeyLegendService,
                        SankeyTooltipService,
                        SankeyHighlightService,
                        SankeyExportService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fua2V5LWFsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Fua2V5L3NhbmtleS1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFBOztBQUdqRyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxDQUFDO0FBQzNHLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFDOUcsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQztBQUNwSCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxDQUFDO0FBRTNHOztHQUVHO0FBYUgsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxZQVhkLFlBQVksRUFBRSxZQUFZLGFBRWhDLFlBQVk7NkdBU1AsZUFBZSxhQVBkO1FBQ04sbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIsbUJBQW1CO0tBQ3RCLFlBVFEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLEVBRWpDLFlBQVk7MkZBU1AsZUFBZTtrQkFaM0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNyQyxPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxTQUFTLEVBQUM7d0JBQ04sbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3FCQUN0QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2Fua2V5Tm9kZURpcmVjdGl2ZSwgU2Fua2V5Tm9kZXNDb2xsZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9ub2Rlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Fua2V5TGlua0RpcmVjdGl2ZSwgU2Fua2V5TGlua3NDb2xsZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9saW5rcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Fua2V5Q29tcG9uZW50IH0gZnJvbSAnLi9zYW5rZXkuY29tcG9uZW50JztcbmltcG9ydCB7IFNhbmtleU1vZHVsZSB9IGZyb20gJy4vc2Fua2V5Lm1vZHVsZSc7XG5pbXBvcnQge1NhbmtleUxlZ2VuZCwgU2Fua2V5VG9vbHRpcCwgU2Fua2V5SGlnaGxpZ2h0LCBTYW5rZXlFeHBvcnR9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1jaGFydHMnXG5cblxuZXhwb3J0IGNvbnN0IFNhbmtleUxlZ2VuZFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNTYW5rZXlMZWdlbmQnLCB1c2VWYWx1ZTogU2Fua2V5TGVnZW5kfTtcbmV4cG9ydCBjb25zdCBTYW5rZXlUb29sdGlwU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1NhbmtleVRvb2x0aXAnLCB1c2VWYWx1ZTogU2Fua2V5VG9vbHRpcH07XG5leHBvcnQgY29uc3QgU2Fua2V5SGlnaGxpZ2h0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0NoYXJ0c1NhbmtleUhpZ2hsaWdodCcsIHVzZVZhbHVlOiBTYW5rZXlIaWdobGlnaHR9O1xuZXhwb3J0IGNvbnN0IFNhbmtleUV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdDaGFydHNTYW5rZXlFeHBvcnQnLCB1c2VWYWx1ZTogU2Fua2V5RXhwb3J0fTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgU2Fua2V5IGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTYW5rZXlNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU2Fua2V5TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBTYW5rZXlMZWdlbmRTZXJ2aWNlLFxuICAgICAgICBTYW5rZXlUb29sdGlwU2VydmljZSxcbiAgICAgICAgU2Fua2V5SGlnaGxpZ2h0U2VydmljZSxcbiAgICAgICAgU2Fua2V5RXhwb3J0U2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU2Fua2V5QWxsTW9kdWxlIHsgfSJdfQ==