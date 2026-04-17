import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { setValue, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { BlockEditor } from '@syncfusion/ej2-blockeditor';
export * from '@syncfusion/ej2-blockeditor';
import { CommonModule } from '@angular/common';

const inputs = ['backgroundColorSettings', 'blockActionMenuSettings', 'blocks', 'codeBlockSettings', 'commandMenuSettings', 'contextMenuSettings', 'cssClass', 'enableDragAndDrop', 'enableHtmlEncode', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'fontColorSettings', 'height', 'imageBlockSettings', 'inlineToolbarSettings', 'keyConfig', 'labelSettings', 'locale', 'pasteCleanupSettings', 'readOnly', 'transformSettings', 'undoRedoStack', 'users', 'width'];
const outputs = ['afterPasteCleanup', 'beforeFileUpload', 'beforePasteCleanup', 'blockChanged', 'blockDragStart', 'blockDragging', 'blockDropped', 'blur', 'created', 'fileUploadFailed', 'fileUploadSuccess', 'fileUploading', 'focus', 'selectionChanged', 'blocksChange'];
const twoWays = ['blocks'];
/**
 * Represents the Essential JS 2 Angular BlockEditor Component.
 * ```html
 * <ejs-blockeditor></ejs-blockeditor>
 * ```
 */
let BlockEditorComponent = class BlockEditorComponent extends BlockEditor {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = [''];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.containerContext.ngAfterContentChecked(this);
    }
};
BlockEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
BlockEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: BlockEditorComponent, selector: "[ejs-blockeditor], ejs-blockeditor", inputs: { backgroundColorSettings: "backgroundColorSettings", blockActionMenuSettings: "blockActionMenuSettings", blocks: "blocks", codeBlockSettings: "codeBlockSettings", commandMenuSettings: "commandMenuSettings", contextMenuSettings: "contextMenuSettings", cssClass: "cssClass", enableDragAndDrop: "enableDragAndDrop", enableHtmlEncode: "enableHtmlEncode", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", fontColorSettings: "fontColorSettings", height: "height", imageBlockSettings: "imageBlockSettings", inlineToolbarSettings: "inlineToolbarSettings", keyConfig: "keyConfig", labelSettings: "labelSettings", locale: "locale", pasteCleanupSettings: "pasteCleanupSettings", readOnly: "readOnly", transformSettings: "transformSettings", undoRedoStack: "undoRedoStack", users: "users", width: "width" }, outputs: { afterPasteCleanup: "afterPasteCleanup", beforeFileUpload: "beforeFileUpload", beforePasteCleanup: "beforePasteCleanup", blockChanged: "blockChanged", blockDragStart: "blockDragStart", blockDragging: "blockDragging", blockDropped: "blockDropped", blur: "blur", created: "created", fileUploadFailed: "fileUploadFailed", fileUploadSuccess: "fileUploadSuccess", fileUploading: "fileUploading", focus: "focus", selectionChanged: "selectionChanged", blocksChange: "blocksChange" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
BlockEditorComponent = __decorate([
    ComponentMixins([ComponentBase])
], BlockEditorComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-blockeditor], ejs-blockeditor',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the BlockEditor component.
 */
class BlockEditorModule {
}
BlockEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlockEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorModule, declarations: [BlockEditorComponent], imports: [CommonModule], exports: [BlockEditorComponent] });
BlockEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        BlockEditorComponent
                    ],
                    exports: [
                        BlockEditorComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the BlockEditor component with providers.
 */
class BlockEditorAllModule {
}
BlockEditorAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlockEditorAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorAllModule, imports: [CommonModule, BlockEditorModule], exports: [BlockEditorModule] });
BlockEditorAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorAllModule, providers: [], imports: [[CommonModule, BlockEditorModule], BlockEditorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BlockEditorAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, BlockEditorModule],
                    exports: [
                        BlockEditorModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BlockEditorAllModule, BlockEditorComponent, BlockEditorModule };
//# sourceMappingURL=syncfusion-ej2-angular-blockeditor.mjs.map
