import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { ProgressBar, ProgressAnnotation, ProgressTooltip } from '@syncfusion/ej2-progressbar';
export * from '@syncfusion/ej2-progressbar';
import { CommonModule } from '@angular/common';

let input$1 = ['annotationAngle', 'annotationRadius', 'content'];
let outputs$2 = [];
/**
 * ProgressBarAnnotations Directive
 * ```html
 * <e-progressbar-annotations>
 * <e-progressbar-annotation></e-progressbar-annotation>
 * </e-progressbar-annotations>
 * ```
 */
class ProgressBarAnnotationDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$2);
        this.directivePropList = input$1;
    }
}
ProgressBarAnnotationDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAnnotationDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ProgressBarAnnotationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ProgressBarAnnotationDirective, selector: "e-progressbar-annotations>e-progressbar-annotation", inputs: { annotationAngle: "annotationAngle", annotationRadius: "annotationRadius", content: "content" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ProgressBarAnnotationDirective.prototype, "content", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAnnotationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-progressbar-annotations>e-progressbar-annotation',
                    inputs: input$1,
                    outputs: outputs$2,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { content: [{
                type: ContentChild,
                args: ['content']
            }] } });
/**
 * ProgressBarAnnotation Array Directive
 * @private
 */
class ProgressBarAnnotationsDirective extends ArrayBase {
    constructor() {
        super('annotations');
    }
}
ProgressBarAnnotationsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAnnotationsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ProgressBarAnnotationsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ProgressBarAnnotationsDirective, selector: "ej-progressbar>e-progressbar-annotations", queries: [{ propertyName: "children", predicate: ProgressBarAnnotationDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarAnnotationsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-progressbar>e-progressbar-annotations',
                    queries: {
                        children: new ContentChildren(ProgressBarAnnotationDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input = ['color', 'end', 'start'];
let outputs$1 = [];
class RangeColorDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$1);
        this.directivePropList = input;
    }
}
RangeColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RangeColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeColorDirective, selector: "e-rangecolors>e-rangecolor", inputs: { color: "color", end: "end", start: "start" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-rangecolors>e-rangecolor',
                    inputs: input,
                    outputs: outputs$1,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RangeColor Array Directive
 * @private
 */
class RangeColorsDirective extends ArrayBase {
    constructor() {
        super('rangecolors');
    }
}
RangeColorsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RangeColorsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeColorsDirective, selector: "ejs-progressbar>e-rangecolors", queries: [{ propertyName: "children", predicate: RangeColorDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeColorsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-progressbar>e-rangecolors',
                    queries: {
                        children: new ContentChildren(RangeColorDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs = ['animation', 'annotations', 'cornerRadius', 'enablePersistence', 'enablePieProgress', 'enableProgressSegments', 'enableRtl', 'endAngle', 'gapWidth', 'height', 'innerRadius', 'isActive', 'isGradient', 'isIndeterminate', 'isStriped', 'labelOnTrack', 'labelStyle', 'locale', 'margin', 'maximum', 'minimum', 'progressColor', 'progressThickness', 'radius', 'rangeColors', 'role', 'secondaryProgress', 'secondaryProgressColor', 'secondaryProgressThickness', 'segmentColor', 'segmentCount', 'showProgressValue', 'startAngle', 'theme', 'tooltip', 'trackColor', 'trackThickness', 'type', 'value', 'width'];
const outputs = ['animationComplete', 'load', 'loaded', 'mouseClick', 'mouseDown', 'mouseLeave', 'mouseMove', 'mouseUp', 'progressCompleted', 'textRender', 'tooltipRender', 'valueChanged'];
const twoWays = [''];
/**
 * ProgressBar Component
 * ```html
 * <ejsprogressbar></ejsprogressbar>
 * ```
 */
let ProgressBarComponent = class ProgressBarComponent extends ProgressBar {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['annotations', 'rangeColors'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('ProgressBarProgressAnnotation');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
        try {
            let mod = this.injector.get('ProgressBarProgressTooltip');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_b) { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childAnnotations;
        if (this.childRangeColors) {
            this.tagObjects[1].instance = this.childRangeColors;
        }
        this.context.ngAfterContentChecked(this);
    }
};
ProgressBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ProgressBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ProgressBarComponent, selector: "ejs-progressbar", inputs: { animation: "animation", annotations: "annotations", cornerRadius: "cornerRadius", enablePersistence: "enablePersistence", enablePieProgress: "enablePieProgress", enableProgressSegments: "enableProgressSegments", enableRtl: "enableRtl", endAngle: "endAngle", gapWidth: "gapWidth", height: "height", innerRadius: "innerRadius", isActive: "isActive", isGradient: "isGradient", isIndeterminate: "isIndeterminate", isStriped: "isStriped", labelOnTrack: "labelOnTrack", labelStyle: "labelStyle", locale: "locale", margin: "margin", maximum: "maximum", minimum: "minimum", progressColor: "progressColor", progressThickness: "progressThickness", radius: "radius", rangeColors: "rangeColors", role: "role", secondaryProgress: "secondaryProgress", secondaryProgressColor: "secondaryProgressColor", secondaryProgressThickness: "secondaryProgressThickness", segmentColor: "segmentColor", segmentCount: "segmentCount", showProgressValue: "showProgressValue", startAngle: "startAngle", theme: "theme", tooltip: "tooltip", trackColor: "trackColor", trackThickness: "trackThickness", type: "type", value: "value", width: "width" }, outputs: { animationComplete: "animationComplete", load: "load", loaded: "loaded", mouseClick: "mouseClick", mouseDown: "mouseDown", mouseLeave: "mouseLeave", mouseMove: "mouseMove", mouseUp: "mouseUp", progressCompleted: "progressCompleted", textRender: "textRender", tooltipRender: "tooltipRender", valueChanged: "valueChanged" }, queries: [{ propertyName: "childAnnotations", first: true, predicate: ProgressBarAnnotationsDirective, descendants: true }, { propertyName: "childRangeColors", first: true, predicate: RangeColorsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ProgressBarComponent = __decorate([
    ComponentMixins([ComponentBase])
], ProgressBarComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-progressbar',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childAnnotations: new ContentChild(ProgressBarAnnotationsDirective),
                        childRangeColors: new ContentChild(RangeColorsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the ProgressBar component.
 */
class ProgressBarModule {
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

const ProgressAnnotationService = { provide: 'ProgressBarProgressAnnotation', useValue: ProgressAnnotation };
const ProgressTooltipService = { provide: 'ProgressBarProgressTooltip', useValue: ProgressTooltip };
/**
 * NgModule definition for the ProgressBar component with providers.
 */
class ProgressBarAllModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressAnnotationService, ProgressBarAllModule, ProgressBarAnnotationDirective, ProgressBarAnnotationsDirective, ProgressBarComponent, ProgressBarModule, ProgressTooltipService, RangeColorDirective, RangeColorsDirective };
//# sourceMappingURL=syncfusion-ej2-angular-progressbar.mjs.map
