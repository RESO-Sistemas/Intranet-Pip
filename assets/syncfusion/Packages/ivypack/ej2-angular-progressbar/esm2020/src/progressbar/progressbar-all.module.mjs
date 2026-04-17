import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from './progressbar.module';
import { ProgressAnnotation, ProgressTooltip } from '@syncfusion/ej2-progressbar';
import * as i0 from "@angular/core";
export const ProgressAnnotationService = { provide: 'ProgressBarProgressAnnotation', useValue: ProgressAnnotation };
export const ProgressTooltipService = { provide: 'ProgressBarProgressTooltip', useValue: ProgressTooltip };
/**
 * NgModule definition for the ProgressBar component with providers.
 */
export class ProgressBarAllModule {
}
ProgressBarAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProgressBarAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAllModule, imports: [CommonModule, ProgressBarModule], exports: [ProgressBarModule] });
ProgressBarAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAllModule, providers: [
        ProgressAnnotationService,
        ProgressTooltipService
    ], imports: [[CommonModule, ProgressBarModule], ProgressBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ProgressBarModule],
                    exports: [
                        ProgressBarModule
                    ],
                    providers: [
                        ProgressAnnotationService,
                        ProgressTooltipService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXItYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7O0FBRy9FLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFrQixFQUFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQztBQUNsSSxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDO0FBRXpIOztHQUVHO0FBV0gsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLFlBVG5CLFlBQVksRUFBRSxpQkFBaUIsYUFFckMsaUJBQWlCO2tIQU9aLG9CQUFvQixhQUxuQjtRQUNOLHlCQUF5QjtRQUN6QixzQkFBc0I7S0FDekIsWUFQUSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxFQUV0QyxpQkFBaUI7MkZBT1osb0JBQW9CO2tCQVZoQyxRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQztvQkFDMUMsT0FBTyxFQUFFO3dCQUNMLGlCQUFpQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFDO3dCQUNOLHlCQUF5Qjt3QkFDekIsc0JBQXNCO3FCQUN6QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHJvZ3Jlc3NCYXJBbm5vdGF0aW9uRGlyZWN0aXZlLCBQcm9ncmVzc0JhckFubm90YXRpb25zRGlyZWN0aXZlIH0gZnJvbSAnLi9hbm5vdGF0aW9ucy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmFuZ2VDb2xvckRpcmVjdGl2ZSwgUmFuZ2VDb2xvcnNEaXJlY3RpdmUgfSBmcm9tICcuL3JhbmdlY29sb3JzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQcm9ncmVzc0JhckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5tb2R1bGUnO1xuaW1wb3J0IHtQcm9ncmVzc0Fubm90YXRpb24sIFByb2dyZXNzVG9vbHRpcH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXByb2dyZXNzYmFyJ1xuXG5cbmV4cG9ydCBjb25zdCBQcm9ncmVzc0Fubm90YXRpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUHJvZ3Jlc3NCYXJQcm9ncmVzc0Fubm90YXRpb24nLCB1c2VWYWx1ZTogUHJvZ3Jlc3NBbm5vdGF0aW9ufTtcbmV4cG9ydCBjb25zdCBQcm9ncmVzc1Rvb2x0aXBTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUHJvZ3Jlc3NCYXJQcm9ncmVzc1Rvb2x0aXAnLCB1c2VWYWx1ZTogUHJvZ3Jlc3NUb29sdGlwfTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgUHJvZ3Jlc3NCYXIgY29tcG9uZW50IHdpdGggcHJvdmlkZXJzLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFByb2dyZXNzQmFyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFByb2dyZXNzQmFyTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBQcm9ncmVzc0Fubm90YXRpb25TZXJ2aWNlLFxuICAgICAgICBQcm9ncmVzc1Rvb2x0aXBTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhckFsbE1vZHVsZSB7IH0iXX0=