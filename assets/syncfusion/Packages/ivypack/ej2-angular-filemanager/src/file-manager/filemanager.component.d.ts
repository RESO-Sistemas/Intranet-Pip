import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { FileManager } from '@syncfusion/ej2-filemanager';
import { ToolbarItemsDirective } from './toolbaritems.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
  * Represents the Essential JS 2 Angular FileManager Component.
 * ```html
 * <ejs-filemanager showThumbnail='false'></ejs-filemanager>
 * ```
 */
export declare class FileManagerComponent extends FileManager implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    beforeDelete: any;
    beforeDownload: any;
    beforeFolderCreate: any;
    beforeImageLoad: any;
    beforeMove: any;
    beforePopupClose: any;
    beforePopupOpen: any;
    beforeRename: any;
    beforeSend: any;
    created: any;
    delete: any;
    destroyed: any;
    failure: any;
    fileDragStart: any;
    fileDragStop: any;
    fileDragging: any;
    fileDropped: any;
    fileLoad: any;
    fileOpen: any;
    fileSelect: any;
    fileSelection: any;
    folderCreate: any;
    menuClick: any;
    menuClose: any;
    menuOpen: any;
    move: any;
    popupClose: any;
    popupOpen: any;
    rename: any;
    search: any;
    success: any;
    toolbarClick: any;
    toolbarCreate: any;
    uploadListCreate: any;
    childToolbarItems: QueryList<ToolbarItemsDirective>;
    tags: string[];
    /**
     * Specifies a template to render customized content for all the files or folders in the large icons view. If the `largeIconsTemplate` property
     * is set, the template content overrides the displayed files or folders text in the File Manager large icons view. The property accepts template string
     * or HTML element ID holding the content.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    largeIconsTemplate: any;
    /**
     * Specifies a template to render customized content for all the nodes. If the `navigationPaneTemplate` property
     * is set, the template content overrides the displayed node text in the File Manager navigation pane.
     * The property accepts a template string or HTML element ID holding the content.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    navigationPaneTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileManagerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileManagerComponent, "ejs-filemanager", never, { "ajaxSettings": "ajaxSettings"; "allowDragAndDrop": "allowDragAndDrop"; "allowMultiSelection": "allowMultiSelection"; "contextMenuSettings": "contextMenuSettings"; "cssClass": "cssClass"; "detailsViewSettings": "detailsViewSettings"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRangeSelection": "enableRangeSelection"; "enableRtl": "enableRtl"; "enableVirtualization": "enableVirtualization"; "fileSystemData": "fileSystemData"; "height": "height"; "largeIconsTemplate": "largeIconsTemplate"; "locale": "locale"; "navigationPaneSettings": "navigationPaneSettings"; "navigationPaneTemplate": "navigationPaneTemplate"; "path": "path"; "popupTarget": "popupTarget"; "rootAliasName": "rootAliasName"; "searchSettings": "searchSettings"; "selectedItems": "selectedItems"; "showFileExtension": "showFileExtension"; "showHiddenItems": "showHiddenItems"; "showItemCheckBoxes": "showItemCheckBoxes"; "showThumbnail": "showThumbnail"; "sortBy": "sortBy"; "sortComparer": "sortComparer"; "sortOrder": "sortOrder"; "toolbarItems": "toolbarItems"; "toolbarSettings": "toolbarSettings"; "uploadSettings": "uploadSettings"; "view": "view"; "width": "width"; }, { "beforeDelete": "beforeDelete"; "beforeDownload": "beforeDownload"; "beforeFolderCreate": "beforeFolderCreate"; "beforeImageLoad": "beforeImageLoad"; "beforeMove": "beforeMove"; "beforePopupClose": "beforePopupClose"; "beforePopupOpen": "beforePopupOpen"; "beforeRename": "beforeRename"; "beforeSend": "beforeSend"; "created": "created"; "delete": "delete"; "destroyed": "destroyed"; "failure": "failure"; "fileDragStart": "fileDragStart"; "fileDragStop": "fileDragStop"; "fileDragging": "fileDragging"; "fileDropped": "fileDropped"; "fileLoad": "fileLoad"; "fileOpen": "fileOpen"; "fileSelect": "fileSelect"; "fileSelection": "fileSelection"; "folderCreate": "folderCreate"; "menuClick": "menuClick"; "menuClose": "menuClose"; "menuOpen": "menuOpen"; "move": "move"; "popupClose": "popupClose"; "popupOpen": "popupOpen"; "rename": "rename"; "search": "search"; "success": "success"; "toolbarClick": "toolbarClick"; "toolbarCreate": "toolbarCreate"; "uploadListCreate": "uploadListCreate"; }, ["largeIconsTemplate", "navigationPaneTemplate", "childToolbarItems"], never>;
}
