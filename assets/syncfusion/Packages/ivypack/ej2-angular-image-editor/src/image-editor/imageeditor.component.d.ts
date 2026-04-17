import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular ImageEditor Component.
 * ```html
 * <ejs-imageeditor></ejs-imageeditor>
 * ```
 */
export declare class ImageEditorComponent extends ImageEditor implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    beforeSave: any;
    click: any;
    created: any;
    cropping: any;
    destroyed: any;
    editComplete: any;
    fileOpened: any;
    finetuneValueChanging: any;
    flipping: any;
    frameChange: any;
    imageFiltering: any;
    panning: any;
    quickAccessToolbarItemClick: any;
    quickAccessToolbarOpen: any;
    resizing: any;
    rotating: any;
    saved: any;
    selectionChanging: any;
    shapeChange: any;
    shapeChanging: any;
    toolbarCreated: any;
    toolbarItemClicked: any;
    toolbarUpdating: any;
    zooming: any;
    /**
     * Specifies a custom template for the toolbar of an image editor control.
     * A string that specifies a custom template for the toolbar of the image editor. If this property is defined, the 'toolbar' property will not have any effect.
     *
     * {% codeBlock src='image-editor/toolbarTemplate/index.md' %}{% endcodeBlock %}
     *
     * @remarks Use this property if you want to customize the entire toolbar in your own way. The template should be a string that contains the HTML markup for the custom toolbar.

     * @default null
     * @asptype string


     */
    toolbarTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageEditorComponent, "ejs-imageeditor", never, { "allowUndoRedo": "allowUndoRedo"; "cssClass": "cssClass"; "disabled": "disabled"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "finetuneSettings": "finetuneSettings"; "fontFamily": "fontFamily"; "height": "height"; "imageSmoothingEnabled": "imageSmoothingEnabled"; "isReadOnly": "isReadOnly"; "locale": "locale"; "quickAccessToolbarTemplate": "quickAccessToolbarTemplate"; "selectionSettings": "selectionSettings"; "showQuickAccessToolbar": "showQuickAccessToolbar"; "theme": "theme"; "toolbar": "toolbar"; "toolbarTemplate": "toolbarTemplate"; "uploadSettings": "uploadSettings"; "width": "width"; "zoomSettings": "zoomSettings"; }, { "beforeSave": "beforeSave"; "click": "click"; "created": "created"; "cropping": "cropping"; "destroyed": "destroyed"; "editComplete": "editComplete"; "fileOpened": "fileOpened"; "finetuneValueChanging": "finetuneValueChanging"; "flipping": "flipping"; "frameChange": "frameChange"; "imageFiltering": "imageFiltering"; "panning": "panning"; "quickAccessToolbarItemClick": "quickAccessToolbarItemClick"; "quickAccessToolbarOpen": "quickAccessToolbarOpen"; "resizing": "resizing"; "rotating": "rotating"; "saved": "saved"; "selectionChanging": "selectionChanging"; "shapeChange": "shapeChange"; "shapeChanging": "shapeChanging"; "toolbarCreated": "toolbarCreated"; "toolbarItemClicked": "toolbarItemClicked"; "toolbarUpdating": "toolbarUpdating"; "zooming": "zooming"; }, ["toolbarTemplate"], never>;
}
