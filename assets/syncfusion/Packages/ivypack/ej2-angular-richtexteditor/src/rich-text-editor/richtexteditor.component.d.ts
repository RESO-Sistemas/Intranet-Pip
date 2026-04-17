import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { RichTextEditor } from '@syncfusion/ej2-richtexteditor';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-richtexteditor` represents the Angular richtexteditor Component.
 * ```html
 * <ejs-richtexteditor></ejs-richtexteditor>
 * ```
 */
export declare class RichTextEditorComponent extends RichTextEditor implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    afterImageDelete: any;
    afterMediaDelete: any;
    afterPasteCleanup: any;
    aiAssistantPromptRequest: any;
    aiAssistantStopRespondingClick: any;
    aiAssistantToolbarClick: any;
    beforeClipboardWrite: any;
    beforeDialogClose: any;
    beforeDialogOpen: any;
    beforeFileUpload: any;
    beforeImageDrop: any;
    beforeImageUpload: any;
    beforeMediaDrop: any;
    beforePasteCleanup: any;
    beforePopupClose: any;
    beforePopupOpen: any;
    beforeQuickToolbarOpen: any;
    beforeSanitizeHtml: any;
    blur: any;
    change: any;
    created: any;
    destroyed: any;
    dialogClose: any;
    dialogOpen: any;
    documentExporting: any;
    fileRemoving: any;
    fileSelected: any;
    fileUploadFailed: any;
    fileUploadSuccess: any;
    fileUploading: any;
    focus: any;
    imageRemoving: any;
    imageSelected: any;
    imageUploadFailed: any;
    imageUploadSuccess: any;
    imageUploading: any;
    quickToolbarClose: any;
    quickToolbarOpen: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    selectionChanged: any;
    slashMenuItemSelect: any;
    toolbarClick: any;
    toolbarStatusUpdate: any;
    updatedToolbarStatus: any;
    wordImporting: any;
    valueChange: any;
    /**
     * Accepts a template design and assigns it as the content of the Rich Text Editor.
     * The built-in template engine provides options to compile a template string into an executable function.
     * For example, it supports expression evaluation similar to ES6 template string literals.
     *
     * {% codeBlock src='rich-text-editor/value-template/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @asptype string
     */
    valueTemplate: any;
    aiAssistantSettings_bannerTemplate: any;
    private skipFromEvent;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector, cdr: ChangeDetectorRef);
    registerOnChange(registerFunction: (_: any) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTextEditorComponent, "ejs-richtexteditor", never, { "aiAssistantSettings": "aiAssistantSettings"; "autoSaveOnIdle": "autoSaveOnIdle"; "backgroundColor": "backgroundColor"; "bulletFormatList": "bulletFormatList"; "codeBlockSettings": "codeBlockSettings"; "cssClass": "cssClass"; "editorMode": "editorMode"; "emojiPickerSettings": "emojiPickerSettings"; "enableAutoUrl": "enableAutoUrl"; "enableClipboardCleanup": "enableClipboardCleanup"; "enableHtmlEncode": "enableHtmlEncode"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enableMarkdownAutoFormat": "enableMarkdownAutoFormat"; "enablePersistence": "enablePersistence"; "enableResize": "enableResize"; "enableRtl": "enableRtl"; "enableTabKey": "enableTabKey"; "enableXhtml": "enableXhtml"; "enabled": "enabled"; "enterKey": "enterKey"; "exportPdf": "exportPdf"; "exportWord": "exportWord"; "fileManagerSettings": "fileManagerSettings"; "floatingToolbarOffset": "floatingToolbarOffset"; "fontColor": "fontColor"; "fontFamily": "fontFamily"; "fontSize": "fontSize"; "format": "format"; "formatPainterSettings": "formatPainterSettings"; "formatter": "formatter"; "height": "height"; "htmlAttributes": "htmlAttributes"; "iframeSettings": "iframeSettings"; "importWord": "importWord"; "inlineMode": "inlineMode"; "insertAudioSettings": "insertAudioSettings"; "insertImageSettings": "insertImageSettings"; "insertVideoSettings": "insertVideoSettings"; "keyConfig": "keyConfig"; "lineHeight": "lineHeight"; "locale": "locale"; "maxLength": "maxLength"; "numberFormatList": "numberFormatList"; "pasteCleanupSettings": "pasteCleanupSettings"; "placeholder": "placeholder"; "quickToolbarSettings": "quickToolbarSettings"; "readonly": "readonly"; "saveInterval": "saveInterval"; "shiftEnterKey": "shiftEnterKey"; "showCharCount": "showCharCount"; "showTooltip": "showTooltip"; "slashMenuSettings": "slashMenuSettings"; "tableSettings": "tableSettings"; "toolbarSettings": "toolbarSettings"; "undoRedoSteps": "undoRedoSteps"; "undoRedoTimer": "undoRedoTimer"; "value": "value"; "valueTemplate": "valueTemplate"; "width": "width"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "afterImageDelete": "afterImageDelete"; "afterMediaDelete": "afterMediaDelete"; "afterPasteCleanup": "afterPasteCleanup"; "aiAssistantPromptRequest": "aiAssistantPromptRequest"; "aiAssistantStopRespondingClick": "aiAssistantStopRespondingClick"; "aiAssistantToolbarClick": "aiAssistantToolbarClick"; "beforeClipboardWrite": "beforeClipboardWrite"; "beforeDialogClose": "beforeDialogClose"; "beforeDialogOpen": "beforeDialogOpen"; "beforeFileUpload": "beforeFileUpload"; "beforeImageDrop": "beforeImageDrop"; "beforeImageUpload": "beforeImageUpload"; "beforeMediaDrop": "beforeMediaDrop"; "beforePasteCleanup": "beforePasteCleanup"; "beforePopupClose": "beforePopupClose"; "beforePopupOpen": "beforePopupOpen"; "beforeQuickToolbarOpen": "beforeQuickToolbarOpen"; "beforeSanitizeHtml": "beforeSanitizeHtml"; "blur": "blur"; "change": "change"; "created": "created"; "destroyed": "destroyed"; "dialogClose": "dialogClose"; "dialogOpen": "dialogOpen"; "documentExporting": "documentExporting"; "fileRemoving": "fileRemoving"; "fileSelected": "fileSelected"; "fileUploadFailed": "fileUploadFailed"; "fileUploadSuccess": "fileUploadSuccess"; "fileUploading": "fileUploading"; "focus": "focus"; "imageRemoving": "imageRemoving"; "imageSelected": "imageSelected"; "imageUploadFailed": "imageUploadFailed"; "imageUploadSuccess": "imageUploadSuccess"; "imageUploading": "imageUploading"; "quickToolbarClose": "quickToolbarClose"; "quickToolbarOpen": "quickToolbarOpen"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "selectionChanged": "selectionChanged"; "slashMenuItemSelect": "slashMenuItemSelect"; "toolbarClick": "toolbarClick"; "toolbarStatusUpdate": "toolbarStatusUpdate"; "updatedToolbarStatus": "updatedToolbarStatus"; "wordImporting": "wordImporting"; "valueChange": "valueChange"; }, ["valueTemplate", "aiAssistantSettings_bannerTemplate"], never>;
}
