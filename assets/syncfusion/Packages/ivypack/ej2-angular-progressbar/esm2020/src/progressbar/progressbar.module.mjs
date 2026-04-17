import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarAnnotationDirective, ProgressBarAnnotationsDirective } from './annotations.directive';
import { RangeColorDirective, RangeColorsDirective } from './rangecolors.directive';
import { ProgressBarComponent } from './progressbar.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the ProgressBar component.
 */
export class ProgressBarModule {
}
ProgressBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProgressBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarModule, declarations: [ProgressBarComponent,
        ProgressBarAnnotationDirective,
        ProgressBarAnnotationsDirective,
        RangeColorDirective,
        RangeColorsDirective], imports: [CommonModule], exports: [ProgressBarComponent,
        ProgressBarAnnotationDirective,
        ProgressBarAnnotationsDirective,
        RangeColorDirective,
        RangeColorsDirective] });
ProgressBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ProgressBarComponent,
                        ProgressBarAnnotationDirective,
                        ProgressBarAnnotationsDirective,
                        RangeColorDirective,
                        RangeColorsDirective
                    ],
                    exports: [
                        ProgressBarComponent,
                        ProgressBarAnnotationDirective,
                        ProgressBarAnnotationsDirective,
                        RangeColorDirective,
                        RangeColorsDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFL0Q7O0dBRUc7QUFrQkgsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQWR0QixvQkFBb0I7UUFDcEIsOEJBQThCO1FBQzlCLCtCQUErQjtRQUMvQixtQkFBbUI7UUFDbkIsb0JBQW9CLGFBTmQsWUFBWSxhQVNsQixvQkFBb0I7UUFDcEIsOEJBQThCO1FBQzlCLCtCQUErQjtRQUMvQixtQkFBbUI7UUFDbkIsb0JBQW9COytHQUdmLGlCQUFpQixZQWhCakIsQ0FBQyxZQUFZLENBQUM7MkZBZ0JkLGlCQUFpQjtrQkFqQjdCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1Ysb0JBQW9CO3dCQUNwQiw4QkFBOEI7d0JBQzlCLCtCQUErQjt3QkFDL0IsbUJBQW1CO3dCQUNuQixvQkFBb0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxvQkFBb0I7d0JBQ3BCLDhCQUE4Qjt3QkFDOUIsK0JBQStCO3dCQUMvQixtQkFBbUI7d0JBQ25CLG9CQUFvQjtxQkFDdkI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFByb2dyZXNzQmFyQW5ub3RhdGlvbkRpcmVjdGl2ZSwgUHJvZ3Jlc3NCYXJBbm5vdGF0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vYW5ub3RhdGlvbnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJhbmdlQ29sb3JEaXJlY3RpdmUsIFJhbmdlQ29sb3JzRGlyZWN0aXZlIH0gZnJvbSAnLi9yYW5nZWNvbG9ycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NCYXJDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudCc7XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIFByb2dyZXNzQmFyIGNvbXBvbmVudC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUHJvZ3Jlc3NCYXJDb21wb25lbnQsXG4gICAgICAgIFByb2dyZXNzQmFyQW5ub3RhdGlvbkRpcmVjdGl2ZSxcbiAgICAgICAgUHJvZ3Jlc3NCYXJBbm5vdGF0aW9uc0RpcmVjdGl2ZSxcbiAgICAgICAgUmFuZ2VDb2xvckRpcmVjdGl2ZSxcbiAgICAgICAgUmFuZ2VDb2xvcnNEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJvZ3Jlc3NCYXJDb21wb25lbnQsXG4gICAgICAgIFByb2dyZXNzQmFyQW5ub3RhdGlvbkRpcmVjdGl2ZSxcbiAgICAgICAgUHJvZ3Jlc3NCYXJBbm5vdGF0aW9uc0RpcmVjdGl2ZSxcbiAgICAgICAgUmFuZ2VDb2xvckRpcmVjdGl2ZSxcbiAgICAgICAgUmFuZ2VDb2xvcnNEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyTW9kdWxlIHsgfSJdfQ==