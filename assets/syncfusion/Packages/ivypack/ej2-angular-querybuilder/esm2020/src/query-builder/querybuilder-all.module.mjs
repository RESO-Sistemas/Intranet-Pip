import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderModule } from './querybuilder.module';
import { QueryLibrary } from '@syncfusion/ej2-querybuilder';
import * as i0 from "@angular/core";
export const QueryLibraryService = { provide: 'QueryBuilderQueryLibrary', useValue: QueryLibrary };
/**
 * NgModule definition for the QueryBuilder component with providers.
 */
export class QueryBuilderAllModule {
}
QueryBuilderAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QueryBuilderAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QueryBuilderAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QueryBuilderAllModule, imports: [CommonModule, QueryBuilderModule], exports: [QueryBuilderModule] });
QueryBuilderAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QueryBuilderAllModule, providers: [
        QueryLibraryService
    ], imports: [[CommonModule, QueryBuilderModule], QueryBuilderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QueryBuilderAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, QueryBuilderModule],
                    exports: [
                        QueryBuilderModule
                    ],
                    providers: [
                        QueryLibraryService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlidWlsZGVyLWFsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcnktYnVpbGRlci9xdWVyeWJ1aWxkZXItYWxsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDhCQUE4QixDQUFBOztBQUd6RCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxDQUFDO0FBRWpIOztHQUVHO0FBVUgsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLFlBUnBCLFlBQVksRUFBRSxrQkFBa0IsYUFFdEMsa0JBQWtCO21IQU1iLHFCQUFxQixhQUpwQjtRQUNOLG1CQUFtQjtLQUN0QixZQU5RLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLEVBRXZDLGtCQUFrQjsyRkFNYixxQkFBcUI7a0JBVGpDLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDO29CQUMzQyxPQUFPLEVBQUU7d0JBQ0wsa0JBQWtCO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUM7d0JBQ04sbUJBQW1CO3FCQUN0QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlLCBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3F1ZXJ5YnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlcnlCdWlsZGVyTW9kdWxlIH0gZnJvbSAnLi9xdWVyeWJ1aWxkZXIubW9kdWxlJztcbmltcG9ydCB7UXVlcnlMaWJyYXJ5fSBmcm9tICdAc3luY2Z1c2lvbi9lajItcXVlcnlidWlsZGVyJ1xuXG5cbmV4cG9ydCBjb25zdCBRdWVyeUxpYnJhcnlTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUXVlcnlCdWlsZGVyUXVlcnlMaWJyYXJ5JywgdXNlVmFsdWU6IFF1ZXJ5TGlicmFyeX07XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIFF1ZXJ5QnVpbGRlciBjb21wb25lbnQgd2l0aCBwcm92aWRlcnMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUXVlcnlCdWlsZGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFF1ZXJ5QnVpbGRlck1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltcbiAgICAgICAgUXVlcnlMaWJyYXJ5U2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUXVlcnlCdWlsZGVyQWxsTW9kdWxlIHsgfSJdfQ==