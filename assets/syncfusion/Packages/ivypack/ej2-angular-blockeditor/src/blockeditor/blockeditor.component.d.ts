import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { BlockEditor } from '@syncfusion/ej2-blockeditor';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Essential JS 2 Angular BlockEditor Component.
 * ```html
 * <ejs-blockeditor></ejs-blockeditor>
 * ```
 */
export declare class BlockEditorComponent extends BlockEditor implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    afterPasteCleanup: any;
    beforeFileUpload: any;
    beforePasteCleanup: any;
    blockChanged: any;
    blockDragStart: any;
    blockDragging: any;
    blockDropped: any;
    blur: any;
    created: any;
    fileUploadFailed: any;
    fileUploadSuccess: any;
    fileUploading: any;
    focus: any;
    selectionChanged: any;
    blocksChange: any;
    tags: string[];
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlockEditorComponent, "[ejs-blockeditor], ejs-blockeditor", never, { "backgroundColorSettings": "backgroundColorSettings"; "blockActionMenuSettings": "blockActionMenuSettings"; "blocks": "blocks"; "codeBlockSettings": "codeBlockSettings"; "commandMenuSettings": "commandMenuSettings"; "contextMenuSettings": "contextMenuSettings"; "cssClass": "cssClass"; "enableDragAndDrop": "enableDragAndDrop"; "enableHtmlEncode": "enableHtmlEncode"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "fontColorSettings": "fontColorSettings"; "height": "height"; "imageBlockSettings": "imageBlockSettings"; "inlineToolbarSettings": "inlineToolbarSettings"; "keyConfig": "keyConfig"; "labelSettings": "labelSettings"; "locale": "locale"; "pasteCleanupSettings": "pasteCleanupSettings"; "readOnly": "readOnly"; "transformSettings": "transformSettings"; "undoRedoStack": "undoRedoStack"; "users": "users"; "width": "width"; }, { "afterPasteCleanup": "afterPasteCleanup"; "beforeFileUpload": "beforeFileUpload"; "beforePasteCleanup": "beforePasteCleanup"; "blockChanged": "blockChanged"; "blockDragStart": "blockDragStart"; "blockDragging": "blockDragging"; "blockDropped": "blockDropped"; "blur": "blur"; "created": "created"; "fileUploadFailed": "fileUploadFailed"; "fileUploadSuccess": "fileUploadSuccess"; "fileUploading": "fileUploading"; "focus": "focus"; "selectionChanged": "selectionChanged"; "blocksChange": "blocksChange"; }, never, ["*"]>;
}
