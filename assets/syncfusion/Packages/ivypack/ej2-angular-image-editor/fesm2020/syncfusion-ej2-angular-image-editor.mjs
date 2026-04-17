import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ContentChild, NgModule } from '@angular/core';
import { setValue, ComponentBase, Template, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
export * from '@syncfusion/ej2-image-editor';
import { CommonModule } from '@angular/common';

const inputs = ['allowUndoRedo', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'finetuneSettings', 'fontFamily', 'height', 'imageSmoothingEnabled', 'isReadOnly', 'locale', 'quickAccessToolbarTemplate', 'selectionSettings', 'showQuickAccessToolbar', 'theme', 'toolbar', 'toolbarTemplate', 'uploadSettings', 'width', 'zoomSettings'];
const outputs = ['beforeSave', 'click', 'created', 'cropping', 'destroyed', 'editComplete', 'fileOpened', 'finetuneValueChanging', 'flipping', 'frameChange', 'imageFiltering', 'panning', 'quickAccessToolbarItemClick', 'quickAccessToolbarOpen', 'resizing', 'rotating', 'saved', 'selectionChanging', 'shapeChange', 'shapeChanging', 'toolbarCreated', 'toolbarItemClicked', 'toolbarUpdating', 'zooming'];
const twoWays = [''];
/**
 * Represents the EJ2 Angular ImageEditor Component.
 * ```html
 * <ejs-imageeditor></ejs-imageeditor>
 * ```
 */
let ImageEditorComponent = class ImageEditorComponent extends ImageEditor {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
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
        this.context.ngAfterContentChecked(this);
    }
};
ImageEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ImageEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ImageEditorComponent, selector: "ejs-imageeditor", inputs: { allowUndoRedo: "allowUndoRedo", cssClass: "cssClass", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", finetuneSettings: "finetuneSettings", fontFamily: "fontFamily", height: "height", imageSmoothingEnabled: "imageSmoothingEnabled", isReadOnly: "isReadOnly", locale: "locale", quickAccessToolbarTemplate: "quickAccessToolbarTemplate", selectionSettings: "selectionSettings", showQuickAccessToolbar: "showQuickAccessToolbar", theme: "theme", toolbar: "toolbar", toolbarTemplate: "toolbarTemplate", uploadSettings: "uploadSettings", width: "width", zoomSettings: "zoomSettings" }, outputs: { beforeSave: "beforeSave", click: "click", created: "created", cropping: "cropping", destroyed: "destroyed", editComplete: "editComplete", fileOpened: "fileOpened", finetuneValueChanging: "finetuneValueChanging", flipping: "flipping", frameChange: "frameChange", imageFiltering: "imageFiltering", panning: "panning", quickAccessToolbarItemClick: "quickAccessToolbarItemClick", quickAccessToolbarOpen: "quickAccessToolbarOpen", resizing: "resizing", rotating: "rotating", saved: "saved", selectionChanging: "selectionChanging", shapeChange: "shapeChange", shapeChanging: "shapeChanging", toolbarCreated: "toolbarCreated", toolbarItemClicked: "toolbarItemClicked", toolbarUpdating: "toolbarUpdating", zooming: "zooming" }, queries: [{ propertyName: "toolbarTemplate", first: true, predicate: ["toolbarTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], ImageEditorComponent.prototype, "toolbarTemplate", void 0);
ImageEditorComponent = __decorate([
    ComponentMixins([ComponentBase])
], ImageEditorComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-imageeditor',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { toolbarTemplate: [{
                type: ContentChild,
                args: ['toolbarTemplate']
            }] } });

/**
 * NgModule definition for the ImageEditor component.
 */
class ImageEditorModule {
}
ImageEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImageEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorModule, declarations: [ImageEditorComponent], imports: [CommonModule], exports: [ImageEditorComponent] });
ImageEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ImageEditorComponent
                    ],
                    exports: [
                        ImageEditorComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the ImageEditor component with providers.
 */
class ImageEditorAllModule {
}
ImageEditorAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImageEditorAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorAllModule, imports: [CommonModule, ImageEditorModule], exports: [ImageEditorModule] });
ImageEditorAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorAllModule, providers: [], imports: [[CommonModule, ImageEditorModule], ImageEditorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ImageEditorAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ImageEditorModule],
                    exports: [
                        ImageEditorModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ImageEditorAllModule, ImageEditorComponent, ImageEditorModule };
//# sourceMappingURL=syncfusion-ej2-angular-image-editor.mjs.map
