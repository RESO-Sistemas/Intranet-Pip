import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttModule } from './gantt.module';
import { Filter, Selection, Sort, Reorder, Resize, Edit, DayMarkers, Toolbar, ContextMenu, ExcelExport, RowDD, ColumnMenu, PdfExport, VirtualScroll, CriticalPath, UndoRedo, Freeze } from '@syncfusion/ej2-gantt';
import * as i0 from "@angular/core";
export const FilterService = { provide: 'GanttFilter', useValue: Filter };
export const SelectionService = { provide: 'GanttSelection', useValue: Selection };
export const SortService = { provide: 'GanttSort', useValue: Sort };
export const ReorderService = { provide: 'GanttReorder', useValue: Reorder };
export const ResizeService = { provide: 'GanttResize', useValue: Resize };
export const EditService = { provide: 'GanttEdit', useValue: Edit };
export const DayMarkersService = { provide: 'GanttDayMarkers', useValue: DayMarkers };
export const ToolbarService = { provide: 'GanttToolbar', useValue: Toolbar };
export const ContextMenuService = { provide: 'GanttContextMenu', useValue: ContextMenu };
export const ExcelExportService = { provide: 'GanttExcelExport', useValue: ExcelExport };
export const RowDDService = { provide: 'GanttRowDD', useValue: RowDD };
export const ColumnMenuService = { provide: 'GanttColumnMenu', useValue: ColumnMenu };
export const PdfExportService = { provide: 'GanttPdfExport', useValue: PdfExport };
export const VirtualScrollService = { provide: 'GanttVirtualScroll', useValue: VirtualScroll };
export const CriticalPathService = { provide: 'GanttCriticalPath', useValue: CriticalPath };
export const UndoRedoService = { provide: 'GanttUndoRedo', useValue: UndoRedo };
export const FreezeService = { provide: 'GanttFreeze', useValue: Freeze };
/**
 * NgModule definition for the Gantt component with providers.
 */
export class GanttAllModule {
}
GanttAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GanttAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, imports: [CommonModule, GanttModule], exports: [GanttModule] });
GanttAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, providers: [
        FilterService,
        SelectionService,
        SortService,
        ReorderService,
        ResizeService,
        EditService,
        DayMarkersService,
        ToolbarService,
        ContextMenuService,
        ExcelExportService,
        RowDDService,
        ColumnMenuService,
        PdfExportService,
        VirtualScrollService,
        CriticalPathService,
        UndoRedoService,
        FreezeService
    ], imports: [[CommonModule, GanttModule], GanttModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, GanttModule],
                    exports: [
                        GanttModule
                    ],
                    providers: [
                        FilterService,
                        SelectionService,
                        SortService,
                        ReorderService,
                        ResizeService,
                        EditService,
                        DayMarkersService,
                        ToolbarService,
                        ContextMenuService,
                        ExcelExportService,
                        RowDDService,
                        ColumnMenuService,
                        PdfExportService,
                        VirtualScrollService,
                        CriticalPathService,
                        UndoRedoService,
                        FreezeService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW50dC9nYW50dC1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQTs7QUFHaE4sTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFrQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBQ3hGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDakcsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFrQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ2xGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0IsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztBQUMzRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDeEYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFrQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ2xGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDcEcsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFrQixFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQzNGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFrQixFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLENBQUM7QUFDdkcsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUN2RyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWtCLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDckYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUMsQ0FBQztBQUNwRyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQ2pHLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFrQixFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFDN0csTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUMxRyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7QUFDOUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFrQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBRXhGOztHQUVHO0FBMEJILE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsWUF4QmIsWUFBWSxFQUFFLFdBQVcsYUFFL0IsV0FBVzs0R0FzQk4sY0FBYyxhQXBCYjtRQUNOLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLGNBQWM7UUFDZCxhQUFhO1FBQ2IsV0FBVztRQUNYLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2Qsa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGdCQUFnQjtRQUNoQixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGVBQWU7UUFDZixhQUFhO0tBQ2hCLFlBdEJRLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUVoQyxXQUFXOzJGQXNCTixjQUFjO2tCQXpCMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNwQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVztxQkFDZDtvQkFDRCxTQUFTLEVBQUM7d0JBQ04sYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixhQUFhO3FCQUNoQjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlLCBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBZGREaWFsb2dGaWVsZERpcmVjdGl2ZSwgQWRkRGlhbG9nRmllbGRzRGlyZWN0aXZlIH0gZnJvbSAnLi9hZGRkaWFsb2dmaWVsZHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEVkaXREaWFsb2dGaWVsZERpcmVjdGl2ZSwgRWRpdERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZSB9IGZyb20gJy4vZWRpdGRpYWxvZ2ZpZWxkcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF5V29ya2luZ1RpbWVEaXJlY3RpdmUsIERheVdvcmtpbmdUaW1lQ29sbGVjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGF5d29ya2luZ3RpbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFdlZWtXb3JraW5nVGltZURpcmVjdGl2ZSwgV2Vla1dvcmtpbmdUaW1lc0RpcmVjdGl2ZSB9IGZyb20gJy4vd2Vla3dvcmtpbmd0aW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIb2xpZGF5RGlyZWN0aXZlLCBIb2xpZGF5c0RpcmVjdGl2ZSB9IGZyb20gJy4vaG9saWRheXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEV2ZW50TWFya2VyRGlyZWN0aXZlLCBFdmVudE1hcmtlcnNEaXJlY3RpdmUgfSBmcm9tICcuL2V2ZW50bWFya2Vycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2FudHRDb21wb25lbnQgfSBmcm9tICcuL2dhbnR0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYW50dE1vZHVsZSB9IGZyb20gJy4vZ2FudHQubW9kdWxlJztcbmltcG9ydCB7RmlsdGVyLCBTZWxlY3Rpb24sIFNvcnQsIFJlb3JkZXIsIFJlc2l6ZSwgRWRpdCwgRGF5TWFya2VycywgVG9vbGJhciwgQ29udGV4dE1lbnUsIEV4Y2VsRXhwb3J0LCBSb3dERCwgQ29sdW1uTWVudSwgUGRmRXhwb3J0LCBWaXJ0dWFsU2Nyb2xsLCBDcml0aWNhbFBhdGgsIFVuZG9SZWRvLCBGcmVlemV9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1nYW50dCdcblxuXG5leHBvcnQgY29uc3QgRmlsdGVyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0RmlsdGVyJywgdXNlVmFsdWU6IEZpbHRlcn07XG5leHBvcnQgY29uc3QgU2VsZWN0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0U2VsZWN0aW9uJywgdXNlVmFsdWU6IFNlbGVjdGlvbn07XG5leHBvcnQgY29uc3QgU29ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dFNvcnQnLCB1c2VWYWx1ZTogU29ydH07XG5leHBvcnQgY29uc3QgUmVvcmRlclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dFJlb3JkZXInLCB1c2VWYWx1ZTogUmVvcmRlcn07XG5leHBvcnQgY29uc3QgUmVzaXplU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0UmVzaXplJywgdXNlVmFsdWU6IFJlc2l6ZX07XG5leHBvcnQgY29uc3QgRWRpdFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dEVkaXQnLCB1c2VWYWx1ZTogRWRpdH07XG5leHBvcnQgY29uc3QgRGF5TWFya2Vyc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dERheU1hcmtlcnMnLCB1c2VWYWx1ZTogRGF5TWFya2Vyc307XG5leHBvcnQgY29uc3QgVG9vbGJhclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dFRvb2xiYXInLCB1c2VWYWx1ZTogVG9vbGJhcn07XG5leHBvcnQgY29uc3QgQ29udGV4dE1lbnVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRDb250ZXh0TWVudScsIHVzZVZhbHVlOiBDb250ZXh0TWVudX07XG5leHBvcnQgY29uc3QgRXhjZWxFeHBvcnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRFeGNlbEV4cG9ydCcsIHVzZVZhbHVlOiBFeGNlbEV4cG9ydH07XG5leHBvcnQgY29uc3QgUm93RERTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRSb3dERCcsIHVzZVZhbHVlOiBSb3dERH07XG5leHBvcnQgY29uc3QgQ29sdW1uTWVudVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dENvbHVtbk1lbnUnLCB1c2VWYWx1ZTogQ29sdW1uTWVudX07XG5leHBvcnQgY29uc3QgUGRmRXhwb3J0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0UGRmRXhwb3J0JywgdXNlVmFsdWU6IFBkZkV4cG9ydH07XG5leHBvcnQgY29uc3QgVmlydHVhbFNjcm9sbFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dFZpcnR1YWxTY3JvbGwnLCB1c2VWYWx1ZTogVmlydHVhbFNjcm9sbH07XG5leHBvcnQgY29uc3QgQ3JpdGljYWxQYXRoU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0Q3JpdGljYWxQYXRoJywgdXNlVmFsdWU6IENyaXRpY2FsUGF0aH07XG5leHBvcnQgY29uc3QgVW5kb1JlZG9TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRVbmRvUmVkbycsIHVzZVZhbHVlOiBVbmRvUmVkb307XG5leHBvcnQgY29uc3QgRnJlZXplU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0RnJlZXplJywgdXNlVmFsdWU6IEZyZWV6ZX07XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIEdhbnR0IGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBHYW50dE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBHYW50dE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltcbiAgICAgICAgRmlsdGVyU2VydmljZSxcbiAgICAgICAgU2VsZWN0aW9uU2VydmljZSxcbiAgICAgICAgU29ydFNlcnZpY2UsXG4gICAgICAgIFJlb3JkZXJTZXJ2aWNlLFxuICAgICAgICBSZXNpemVTZXJ2aWNlLFxuICAgICAgICBFZGl0U2VydmljZSxcbiAgICAgICAgRGF5TWFya2Vyc1NlcnZpY2UsXG4gICAgICAgIFRvb2xiYXJTZXJ2aWNlLFxuICAgICAgICBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgICAgIEV4Y2VsRXhwb3J0U2VydmljZSxcbiAgICAgICAgUm93RERTZXJ2aWNlLFxuICAgICAgICBDb2x1bW5NZW51U2VydmljZSxcbiAgICAgICAgUGRmRXhwb3J0U2VydmljZSxcbiAgICAgICAgVmlydHVhbFNjcm9sbFNlcnZpY2UsXG4gICAgICAgIENyaXRpY2FsUGF0aFNlcnZpY2UsXG4gICAgICAgIFVuZG9SZWRvU2VydmljZSxcbiAgICAgICAgRnJlZXplU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FudHRBbGxNb2R1bGUgeyB9Il19