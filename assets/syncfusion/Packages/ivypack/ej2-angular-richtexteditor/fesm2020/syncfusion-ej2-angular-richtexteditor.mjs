import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { forwardRef, Component, ChangeDetectionStrategy, ContentChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setValue, FormBase, ComponentBase, Template, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { RichTextEditor, Toolbar, Link, Image, ImportExport, Audio, Video, Count, QuickToolbar, HtmlEditor, MarkdownEditor, Table, PasteCleanup, Resize, FileManager, FormatPainter, EmojiPicker, SlashMenu, CodeBlock, ClipBoardCleanup, AutoFormat, AIAssistant } from '@syncfusion/ej2-richtexteditor';
export * from '@syncfusion/ej2-richtexteditor';
import { CommonModule } from '@angular/common';

var RichTextEditorComponent_1;
const inputs = ['aiAssistantSettings', 'autoSaveOnIdle', 'backgroundColor', 'bulletFormatList', 'codeBlockSettings', 'cssClass', 'editorMode', 'emojiPickerSettings', 'enableAutoUrl', 'enableClipboardCleanup', 'enableHtmlEncode', 'enableHtmlSanitizer', 'enableMarkdownAutoFormat', 'enablePersistence', 'enableResize', 'enableRtl', 'enableTabKey', 'enableXhtml', 'enabled', 'enterKey', 'exportPdf', 'exportWord', 'fileManagerSettings', 'floatingToolbarOffset', 'fontColor', 'fontFamily', 'fontSize', 'format', 'formatPainterSettings', 'formatter', 'height', 'htmlAttributes', 'iframeSettings', 'importWord', 'inlineMode', 'insertAudioSettings', 'insertImageSettings', 'insertVideoSettings', 'keyConfig', 'lineHeight', 'locale', 'maxLength', 'numberFormatList', 'pasteCleanupSettings', 'placeholder', 'quickToolbarSettings', 'readonly', 'saveInterval', 'shiftEnterKey', 'showCharCount', 'showTooltip', 'slashMenuSettings', 'tableSettings', 'toolbarSettings', 'undoRedoSteps', 'undoRedoTimer', 'value', 'valueTemplate', 'width'];
const outputs = ['actionBegin', 'actionComplete', 'afterImageDelete', 'afterMediaDelete', 'afterPasteCleanup', 'aiAssistantPromptRequest', 'aiAssistantStopRespondingClick', 'aiAssistantToolbarClick', 'beforeClipboardWrite', 'beforeDialogClose', 'beforeDialogOpen', 'beforeFileUpload', 'beforeImageDrop', 'beforeImageUpload', 'beforeMediaDrop', 'beforePasteCleanup', 'beforePopupClose', 'beforePopupOpen', 'beforeQuickToolbarOpen', 'beforeSanitizeHtml', 'blur', 'change', 'created', 'destroyed', 'dialogClose', 'dialogOpen', 'documentExporting', 'fileRemoving', 'fileSelected', 'fileUploadFailed', 'fileUploadSuccess', 'fileUploading', 'focus', 'imageRemoving', 'imageSelected', 'imageUploadFailed', 'imageUploadSuccess', 'imageUploading', 'quickToolbarClose', 'quickToolbarOpen', 'resizeStart', 'resizeStop', 'resizing', 'selectionChanged', 'slashMenuItemSelect', 'toolbarClick', 'toolbarStatusUpdate', 'updatedToolbarStatus', 'wordImporting', 'valueChange'];
const twoWays = ['value'];
/**
 * `ejs-richtexteditor` represents the Angular richtexteditor Component.
 * ```html
 * <ejs-richtexteditor></ejs-richtexteditor>
 * ```
 */
let RichTextEditorComponent = RichTextEditorComponent_1 = class RichTextEditorComponent extends RichTextEditor {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('RichTextEditorToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorLink');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorImage');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorImportExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorAudio');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorVideo');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorCount');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorQuickToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorHtmlEditor');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorMarkdownEditor');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorTable');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorPasteCleanup');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorFileManager');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorFormatPainter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorEmojiPicker');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorSlashMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorCodeBlock');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorClipBoardCleanup');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorAutoFormat');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RichTextEditorAIAssistant');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
RichTextEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
RichTextEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: RichTextEditorComponent, selector: "ejs-richtexteditor", inputs: { aiAssistantSettings: "aiAssistantSettings", autoSaveOnIdle: "autoSaveOnIdle", backgroundColor: "backgroundColor", bulletFormatList: "bulletFormatList", codeBlockSettings: "codeBlockSettings", cssClass: "cssClass", editorMode: "editorMode", emojiPickerSettings: "emojiPickerSettings", enableAutoUrl: "enableAutoUrl", enableClipboardCleanup: "enableClipboardCleanup", enableHtmlEncode: "enableHtmlEncode", enableHtmlSanitizer: "enableHtmlSanitizer", enableMarkdownAutoFormat: "enableMarkdownAutoFormat", enablePersistence: "enablePersistence", enableResize: "enableResize", enableRtl: "enableRtl", enableTabKey: "enableTabKey", enableXhtml: "enableXhtml", enabled: "enabled", enterKey: "enterKey", exportPdf: "exportPdf", exportWord: "exportWord", fileManagerSettings: "fileManagerSettings", floatingToolbarOffset: "floatingToolbarOffset", fontColor: "fontColor", fontFamily: "fontFamily", fontSize: "fontSize", format: "format", formatPainterSettings: "formatPainterSettings", formatter: "formatter", height: "height", htmlAttributes: "htmlAttributes", iframeSettings: "iframeSettings", importWord: "importWord", inlineMode: "inlineMode", insertAudioSettings: "insertAudioSettings", insertImageSettings: "insertImageSettings", insertVideoSettings: "insertVideoSettings", keyConfig: "keyConfig", lineHeight: "lineHeight", locale: "locale", maxLength: "maxLength", numberFormatList: "numberFormatList", pasteCleanupSettings: "pasteCleanupSettings", placeholder: "placeholder", quickToolbarSettings: "quickToolbarSettings", readonly: "readonly", saveInterval: "saveInterval", shiftEnterKey: "shiftEnterKey", showCharCount: "showCharCount", showTooltip: "showTooltip", slashMenuSettings: "slashMenuSettings", tableSettings: "tableSettings", toolbarSettings: "toolbarSettings", undoRedoSteps: "undoRedoSteps", undoRedoTimer: "undoRedoTimer", value: "value", valueTemplate: "valueTemplate", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", afterImageDelete: "afterImageDelete", afterMediaDelete: "afterMediaDelete", afterPasteCleanup: "afterPasteCleanup", aiAssistantPromptRequest: "aiAssistantPromptRequest", aiAssistantStopRespondingClick: "aiAssistantStopRespondingClick", aiAssistantToolbarClick: "aiAssistantToolbarClick", beforeClipboardWrite: "beforeClipboardWrite", beforeDialogClose: "beforeDialogClose", beforeDialogOpen: "beforeDialogOpen", beforeFileUpload: "beforeFileUpload", beforeImageDrop: "beforeImageDrop", beforeImageUpload: "beforeImageUpload", beforeMediaDrop: "beforeMediaDrop", beforePasteCleanup: "beforePasteCleanup", beforePopupClose: "beforePopupClose", beforePopupOpen: "beforePopupOpen", beforeQuickToolbarOpen: "beforeQuickToolbarOpen", beforeSanitizeHtml: "beforeSanitizeHtml", blur: "blur", change: "change", created: "created", destroyed: "destroyed", dialogClose: "dialogClose", dialogOpen: "dialogOpen", documentExporting: "documentExporting", fileRemoving: "fileRemoving", fileSelected: "fileSelected", fileUploadFailed: "fileUploadFailed", fileUploadSuccess: "fileUploadSuccess", fileUploading: "fileUploading", focus: "focus", imageRemoving: "imageRemoving", imageSelected: "imageSelected", imageUploadFailed: "imageUploadFailed", imageUploadSuccess: "imageUploadSuccess", imageUploading: "imageUploading", quickToolbarClose: "quickToolbarClose", quickToolbarOpen: "quickToolbarOpen", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", selectionChanged: "selectionChanged", slashMenuItemSelect: "slashMenuItemSelect", toolbarClick: "toolbarClick", toolbarStatusUpdate: "toolbarStatusUpdate", updatedToolbarStatus: "updatedToolbarStatus", wordImporting: "wordImporting", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RichTextEditorComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "valueTemplate", first: true, predicate: ["valueTemplate"], descendants: true }, { propertyName: "aiAssistantSettings_bannerTemplate", first: true, predicate: ["aiAssistantSettingsBannerTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], RichTextEditorComponent.prototype, "valueTemplate", void 0);
__decorate([
    Template()
], RichTextEditorComponent.prototype, "aiAssistantSettings_bannerTemplate", void 0);
RichTextEditorComponent = RichTextEditorComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], RichTextEditorComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-richtexteditor',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RichTextEditorComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { valueTemplate: [{
                type: ContentChild,
                args: ['valueTemplate']
            }], aiAssistantSettings_bannerTemplate: [{
                type: ContentChild,
                args: ['aiAssistantSettingsBannerTemplate']
            }] } });

/**
 * NgModule definition for the RichTextEditor component.
 */
class RichTextEditorModule {
}
RichTextEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RichTextEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, declarations: [RichTextEditorComponent], imports: [CommonModule], exports: [RichTextEditorComponent] });
RichTextEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        RichTextEditorComponent
                    ],
                    exports: [
                        RichTextEditorComponent
                    ]
                }]
        }] });

const ToolbarService = { provide: 'RichTextEditorToolbar', useValue: Toolbar };
const LinkService = { provide: 'RichTextEditorLink', useValue: Link };
const ImageService = { provide: 'RichTextEditorImage', useValue: Image };
const ImportExportService = { provide: 'RichTextEditorImportExport', useValue: ImportExport };
const AudioService = { provide: 'RichTextEditorAudio', useValue: Audio };
const VideoService = { provide: 'RichTextEditorVideo', useValue: Video };
const CountService = { provide: 'RichTextEditorCount', useValue: Count };
const QuickToolbarService = { provide: 'RichTextEditorQuickToolbar', useValue: QuickToolbar };
const HtmlEditorService = { provide: 'RichTextEditorHtmlEditor', useValue: HtmlEditor };
const MarkdownEditorService = { provide: 'RichTextEditorMarkdownEditor', useValue: MarkdownEditor };
const TableService = { provide: 'RichTextEditorTable', useValue: Table };
const PasteCleanupService = { provide: 'RichTextEditorPasteCleanup', useValue: PasteCleanup };
const ResizeService = { provide: 'RichTextEditorResize', useValue: Resize };
const FileManagerService = { provide: 'RichTextEditorFileManager', useValue: FileManager };
const FormatPainterService = { provide: 'RichTextEditorFormatPainter', useValue: FormatPainter };
const EmojiPickerService = { provide: 'RichTextEditorEmojiPicker', useValue: EmojiPicker };
const SlashMenuService = { provide: 'RichTextEditorSlashMenu', useValue: SlashMenu };
const CodeBlockService = { provide: 'RichTextEditorCodeBlock', useValue: CodeBlock };
const ClipBoardCleanupService = { provide: 'RichTextEditorClipBoardCleanup', useValue: ClipBoardCleanup };
const AutoFormatService = { provide: 'RichTextEditorAutoFormat', useValue: AutoFormat };
const AIAssistantService = { provide: 'RichTextEditorAIAssistant', useValue: AIAssistant };
/**
 * NgModule definition for the RichTextEditor component with providers.
 */
class RichTextEditorAllModule {
}
RichTextEditorAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RichTextEditorAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, imports: [CommonModule, RichTextEditorModule], exports: [RichTextEditorModule] });
RichTextEditorAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, providers: [
        ToolbarService,
        LinkService,
        ImageService,
        ImportExportService,
        AudioService,
        VideoService,
        CountService,
        QuickToolbarService,
        HtmlEditorService,
        MarkdownEditorService,
        TableService,
        PasteCleanupService,
        ResizeService,
        FileManagerService,
        FormatPainterService,
        EmojiPickerService,
        SlashMenuService,
        CodeBlockService,
        ClipBoardCleanupService,
        AutoFormatService,
        AIAssistantService
    ], imports: [[CommonModule, RichTextEditorModule], RichTextEditorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RichTextEditorModule],
                    exports: [
                        RichTextEditorModule
                    ],
                    providers: [
                        ToolbarService,
                        LinkService,
                        ImageService,
                        ImportExportService,
                        AudioService,
                        VideoService,
                        CountService,
                        QuickToolbarService,
                        HtmlEditorService,
                        MarkdownEditorService,
                        TableService,
                        PasteCleanupService,
                        ResizeService,
                        FileManagerService,
                        FormatPainterService,
                        EmojiPickerService,
                        SlashMenuService,
                        CodeBlockService,
                        ClipBoardCleanupService,
                        AutoFormatService,
                        AIAssistantService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AIAssistantService, AudioService, AutoFormatService, ClipBoardCleanupService, CodeBlockService, CountService, EmojiPickerService, FileManagerService, FormatPainterService, HtmlEditorService, ImageService, ImportExportService, LinkService, MarkdownEditorService, PasteCleanupService, QuickToolbarService, ResizeService, RichTextEditorAllModule, RichTextEditorComponent, RichTextEditorModule, SlashMenuService, TableService, ToolbarService, VideoService };
//# sourceMappingURL=syncfusion-ej2-angular-richtexteditor.mjs.map
