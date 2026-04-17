import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentEditorContainerModule } from './documenteditorcontainer.module';
import { Toolbar, Ribbon } from '@syncfusion/ej2-documenteditor';
import * as i0 from "@angular/core";
export const ToolbarService = { provide: 'DocumentEditorToolbar', useValue: Toolbar };
export const RibbonService = { provide: 'DocumentEditorRibbon', useValue: Ribbon };
/**
 * NgModule definition for the DocumentEditorContainer component with providers.
 */
export class DocumentEditorContainerAllModule {
}
DocumentEditorContainerAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorContainerAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DocumentEditorContainerAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorContainerAllModule, imports: [CommonModule, DocumentEditorContainerModule], exports: [DocumentEditorContainerModule] });
DocumentEditorContainerAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorContainerAllModule, providers: [
        ToolbarService,
        RibbonService
    ], imports: [[CommonModule, DocumentEditorContainerModule], DocumentEditorContainerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorContainerAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DocumentEditorContainerModule],
                    exports: [
                        DocumentEditorContainerModule
                    ],
                    providers: [
                        ToolbarService,
                        RibbonService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRlZGl0b3Jjb250YWluZXItYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N1bWVudC1lZGl0b3ItY29udGFpbmVyL2RvY3VtZW50ZWRpdG9yY29udGFpbmVyLWFsbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLE1BQU0sZ0NBQWdDLENBQUE7O0FBRzlELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0IsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQ3BHLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBa0IsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBRWpHOztHQUVHO0FBV0gsTUFBTSxPQUFPLGdDQUFnQzs7NkhBQWhDLGdDQUFnQzs4SEFBaEMsZ0NBQWdDLFlBVC9CLFlBQVksRUFBRSw2QkFBNkIsYUFFakQsNkJBQTZCOzhIQU94QixnQ0FBZ0MsYUFML0I7UUFDTixjQUFjO1FBQ2QsYUFBYTtLQUNoQixZQVBRLENBQUMsWUFBWSxFQUFFLDZCQUE2QixDQUFDLEVBRWxELDZCQUE2QjsyRkFPeEIsZ0NBQWdDO2tCQVY1QyxRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSw2QkFBNkIsQ0FBQztvQkFDdEQsT0FBTyxFQUFFO3dCQUNMLDZCQUE2QjtxQkFDaEM7b0JBQ0QsU0FBUyxFQUFDO3dCQUNOLGNBQWM7d0JBQ2QsYUFBYTtxQkFDaEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvY3VtZW50RWRpdG9yQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kb2N1bWVudGVkaXRvcmNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRG9jdW1lbnRFZGl0b3JDb250YWluZXJNb2R1bGUgfSBmcm9tICcuL2RvY3VtZW50ZWRpdG9yY29udGFpbmVyLm1vZHVsZSc7XG5pbXBvcnQge1Rvb2xiYXIsIFJpYmJvbn0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRvY3VtZW50ZWRpdG9yJ1xuXG5cbmV4cG9ydCBjb25zdCBUb29sYmFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yVG9vbGJhcicsIHVzZVZhbHVlOiBUb29sYmFyfTtcbmV4cG9ydCBjb25zdCBSaWJib25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JSaWJib24nLCB1c2VWYWx1ZTogUmliYm9ufTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgRG9jdW1lbnRFZGl0b3JDb250YWluZXIgY29tcG9uZW50IHdpdGggcHJvdmlkZXJzLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIERvY3VtZW50RWRpdG9yQ29udGFpbmVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERvY3VtZW50RWRpdG9yQ29udGFpbmVyTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBUb29sYmFyU2VydmljZSxcbiAgICAgICAgUmliYm9uU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRFZGl0b3JDb250YWluZXJBbGxNb2R1bGUgeyB9Il19