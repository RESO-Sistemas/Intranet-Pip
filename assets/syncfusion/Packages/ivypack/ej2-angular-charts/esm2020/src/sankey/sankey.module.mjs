import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SankeyNodeDirective, SankeyNodesCollectionDirective } from './nodes.directive';
import { SankeyLinkDirective, SankeyLinksCollectionDirective } from './links.directive';
import { SankeyComponent } from './sankey.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the Sankey component.
 */
export class SankeyModule {
}
SankeyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SankeyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyModule, declarations: [SankeyComponent,
        SankeyNodeDirective,
        SankeyNodesCollectionDirective,
        SankeyLinkDirective,
        SankeyLinksCollectionDirective], imports: [CommonModule], exports: [SankeyComponent,
        SankeyNodeDirective,
        SankeyNodesCollectionDirective,
        SankeyLinkDirective,
        SankeyLinksCollectionDirective] });
SankeyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SankeyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SankeyComponent,
                        SankeyNodeDirective,
                        SankeyNodesCollectionDirective,
                        SankeyLinkDirective,
                        SankeyLinksCollectionDirective
                    ],
                    exports: [
                        SankeyComponent,
                        SankeyNodeDirective,
                        SankeyNodesCollectionDirective,
                        SankeyLinkDirective,
                        SankeyLinksCollectionDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fua2V5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zYW5rZXkvc2Fua2V5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRXJEOztHQUVHO0FBa0JILE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBZGpCLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsOEJBQThCO1FBQzlCLG1CQUFtQjtRQUNuQiw4QkFBOEIsYUFOeEIsWUFBWSxhQVNsQixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLDhCQUE4QjtRQUM5QixtQkFBbUI7UUFDbkIsOEJBQThCOzBHQUd6QixZQUFZLFlBaEJaLENBQUMsWUFBWSxDQUFDOzJGQWdCZCxZQUFZO2tCQWpCeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDVixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsOEJBQThCO3dCQUM5QixtQkFBbUI7d0JBQ25CLDhCQUE4QjtxQkFDakM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQiw4QkFBOEI7d0JBQzlCLG1CQUFtQjt3QkFDbkIsOEJBQThCO3FCQUNqQztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2Fua2V5Tm9kZURpcmVjdGl2ZSwgU2Fua2V5Tm9kZXNDb2xsZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9ub2Rlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Fua2V5TGlua0RpcmVjdGl2ZSwgU2Fua2V5TGlua3NDb2xsZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9saW5rcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Fua2V5Q29tcG9uZW50IH0gZnJvbSAnLi9zYW5rZXkuY29tcG9uZW50JztcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgU2Fua2V5IGNvbXBvbmVudC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU2Fua2V5Q29tcG9uZW50LFxuICAgICAgICBTYW5rZXlOb2RlRGlyZWN0aXZlLFxuICAgICAgICBTYW5rZXlOb2Rlc0NvbGxlY3Rpb25EaXJlY3RpdmUsXG4gICAgICAgIFNhbmtleUxpbmtEaXJlY3RpdmUsXG4gICAgICAgIFNhbmtleUxpbmtzQ29sbGVjdGlvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTYW5rZXlDb21wb25lbnQsXG4gICAgICAgIFNhbmtleU5vZGVEaXJlY3RpdmUsXG4gICAgICAgIFNhbmtleU5vZGVzQ29sbGVjdGlvbkRpcmVjdGl2ZSxcbiAgICAgICAgU2Fua2V5TGlua0RpcmVjdGl2ZSxcbiAgICAgICAgU2Fua2V5TGlua3NDb2xsZWN0aW9uRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTYW5rZXlNb2R1bGUgeyB9Il19