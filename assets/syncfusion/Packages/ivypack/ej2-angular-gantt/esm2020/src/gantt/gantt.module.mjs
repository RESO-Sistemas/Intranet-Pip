import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDirective, ColumnsDirective } from './columns.directive';
import { AddDialogFieldDirective, AddDialogFieldsDirective } from './adddialogfields.directive';
import { EditDialogFieldDirective, EditDialogFieldsDirective } from './editdialogfields.directive';
import { DayWorkingTimeDirective, DayWorkingTimeCollectionDirective } from './dayworkingtime.directive';
import { WeekWorkingTimeDirective, WeekWorkingTimesDirective } from './weekworkingtime.directive';
import { HolidayDirective, HolidaysDirective } from './holidays.directive';
import { EventMarkerDirective, EventMarkersDirective } from './eventmarkers.directive';
import { GanttComponent } from './gantt.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the Gantt component.
 */
export class GanttModule {
}
GanttModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GanttModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, declarations: [GanttComponent,
        ColumnDirective,
        ColumnsDirective,
        AddDialogFieldDirective,
        AddDialogFieldsDirective,
        EditDialogFieldDirective,
        EditDialogFieldsDirective,
        DayWorkingTimeDirective,
        DayWorkingTimeCollectionDirective,
        WeekWorkingTimeDirective,
        WeekWorkingTimesDirective,
        HolidayDirective,
        HolidaysDirective,
        EventMarkerDirective,
        EventMarkersDirective], imports: [CommonModule], exports: [GanttComponent,
        ColumnDirective,
        ColumnsDirective,
        AddDialogFieldDirective,
        AddDialogFieldsDirective,
        EditDialogFieldDirective,
        EditDialogFieldsDirective,
        DayWorkingTimeDirective,
        DayWorkingTimeCollectionDirective,
        WeekWorkingTimeDirective,
        WeekWorkingTimesDirective,
        HolidayDirective,
        HolidaysDirective,
        EventMarkerDirective,
        EventMarkersDirective] });
GanttModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        GanttComponent,
                        ColumnDirective,
                        ColumnsDirective,
                        AddDialogFieldDirective,
                        AddDialogFieldsDirective,
                        EditDialogFieldDirective,
                        EditDialogFieldsDirective,
                        DayWorkingTimeDirective,
                        DayWorkingTimeCollectionDirective,
                        WeekWorkingTimeDirective,
                        WeekWorkingTimesDirective,
                        HolidayDirective,
                        HolidaysDirective,
                        EventMarkerDirective,
                        EventMarkersDirective
                    ],
                    exports: [
                        GanttComponent,
                        ColumnDirective,
                        ColumnsDirective,
                        AddDialogFieldDirective,
                        AddDialogFieldsDirective,
                        EditDialogFieldDirective,
                        EditDialogFieldsDirective,
                        DayWorkingTimeDirective,
                        DayWorkingTimeCollectionDirective,
                        WeekWorkingTimeDirective,
                        WeekWorkingTimesDirective,
                        HolidayDirective,
                        HolidaysDirective,
                        EventMarkerDirective,
                        EventMarkersDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbnR0L2dhbnR0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlDQUFpQyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUVuRDs7R0FFRztBQXNDSCxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQWxDaEIsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2QixpQ0FBaUM7UUFDakMsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixxQkFBcUIsYUFoQmYsWUFBWSxhQW1CbEIsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2QixpQ0FBaUM7UUFDakMsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixxQkFBcUI7eUdBR2hCLFdBQVcsWUFwQ1gsQ0FBQyxZQUFZLENBQUM7MkZBb0NkLFdBQVc7a0JBckN2QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFO3dCQUNWLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2QixpQ0FBaUM7d0JBQ2pDLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUN6QixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsaUNBQWlDO3dCQUNqQyx3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN4QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlLCBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBZGREaWFsb2dGaWVsZERpcmVjdGl2ZSwgQWRkRGlhbG9nRmllbGRzRGlyZWN0aXZlIH0gZnJvbSAnLi9hZGRkaWFsb2dmaWVsZHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEVkaXREaWFsb2dGaWVsZERpcmVjdGl2ZSwgRWRpdERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZSB9IGZyb20gJy4vZWRpdGRpYWxvZ2ZpZWxkcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF5V29ya2luZ1RpbWVEaXJlY3RpdmUsIERheVdvcmtpbmdUaW1lQ29sbGVjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGF5d29ya2luZ3RpbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFdlZWtXb3JraW5nVGltZURpcmVjdGl2ZSwgV2Vla1dvcmtpbmdUaW1lc0RpcmVjdGl2ZSB9IGZyb20gJy4vd2Vla3dvcmtpbmd0aW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIb2xpZGF5RGlyZWN0aXZlLCBIb2xpZGF5c0RpcmVjdGl2ZSB9IGZyb20gJy4vaG9saWRheXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEV2ZW50TWFya2VyRGlyZWN0aXZlLCBFdmVudE1hcmtlcnNEaXJlY3RpdmUgfSBmcm9tICcuL2V2ZW50bWFya2Vycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2FudHRDb21wb25lbnQgfSBmcm9tICcuL2dhbnR0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIEdhbnR0IGNvbXBvbmVudC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgR2FudHRDb21wb25lbnQsXG4gICAgICAgIENvbHVtbkRpcmVjdGl2ZSxcbiAgICAgICAgQ29sdW1uc0RpcmVjdGl2ZSxcbiAgICAgICAgQWRkRGlhbG9nRmllbGREaXJlY3RpdmUsXG4gICAgICAgIEFkZERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZSxcbiAgICAgICAgRWRpdERpYWxvZ0ZpZWxkRGlyZWN0aXZlLFxuICAgICAgICBFZGl0RGlhbG9nRmllbGRzRGlyZWN0aXZlLFxuICAgICAgICBEYXlXb3JraW5nVGltZURpcmVjdGl2ZSxcbiAgICAgICAgRGF5V29ya2luZ1RpbWVDb2xsZWN0aW9uRGlyZWN0aXZlLFxuICAgICAgICBXZWVrV29ya2luZ1RpbWVEaXJlY3RpdmUsXG4gICAgICAgIFdlZWtXb3JraW5nVGltZXNEaXJlY3RpdmUsXG4gICAgICAgIEhvbGlkYXlEaXJlY3RpdmUsXG4gICAgICAgIEhvbGlkYXlzRGlyZWN0aXZlLFxuICAgICAgICBFdmVudE1hcmtlckRpcmVjdGl2ZSxcbiAgICAgICAgRXZlbnRNYXJrZXJzRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEdhbnR0Q29tcG9uZW50LFxuICAgICAgICBDb2x1bW5EaXJlY3RpdmUsXG4gICAgICAgIENvbHVtbnNEaXJlY3RpdmUsXG4gICAgICAgIEFkZERpYWxvZ0ZpZWxkRGlyZWN0aXZlLFxuICAgICAgICBBZGREaWFsb2dGaWVsZHNEaXJlY3RpdmUsXG4gICAgICAgIEVkaXREaWFsb2dGaWVsZERpcmVjdGl2ZSxcbiAgICAgICAgRWRpdERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZSxcbiAgICAgICAgRGF5V29ya2luZ1RpbWVEaXJlY3RpdmUsXG4gICAgICAgIERheVdvcmtpbmdUaW1lQ29sbGVjdGlvbkRpcmVjdGl2ZSxcbiAgICAgICAgV2Vla1dvcmtpbmdUaW1lRGlyZWN0aXZlLFxuICAgICAgICBXZWVrV29ya2luZ1RpbWVzRGlyZWN0aXZlLFxuICAgICAgICBIb2xpZGF5RGlyZWN0aXZlLFxuICAgICAgICBIb2xpZGF5c0RpcmVjdGl2ZSxcbiAgICAgICAgRXZlbnRNYXJrZXJEaXJlY3RpdmUsXG4gICAgICAgIEV2ZW50TWFya2Vyc0RpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FudHRNb2R1bGUgeyB9Il19