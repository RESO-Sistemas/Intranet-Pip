import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { FileManager } from '@syncfusion/ej2-filemanager';
import { Template } from '@syncfusion/ej2-angular-base';
import { ToolbarItemsDirective } from './toolbaritems.directive';
import * as i0 from "@angular/core";
export const inputs = ['ajaxSettings', 'allowDragAndDrop', 'allowMultiSelection', 'contextMenuSettings', 'cssClass', 'detailsViewSettings', 'enableHtmlSanitizer', 'enablePersistence', 'enableRangeSelection', 'enableRtl', 'enableVirtualization', 'fileSystemData', 'height', 'largeIconsTemplate', 'locale', 'navigationPaneSettings', 'navigationPaneTemplate', 'path', 'popupTarget', 'rootAliasName', 'searchSettings', 'selectedItems', 'showFileExtension', 'showHiddenItems', 'showItemCheckBoxes', 'showThumbnail', 'sortBy', 'sortComparer', 'sortOrder', 'toolbarItems', 'toolbarSettings', 'uploadSettings', 'view', 'width'];
export const outputs = ['beforeDelete', 'beforeDownload', 'beforeFolderCreate', 'beforeImageLoad', 'beforeMove', 'beforePopupClose', 'beforePopupOpen', 'beforeRename', 'beforeSend', 'created', 'delete', 'destroyed', 'failure', 'fileDragStart', 'fileDragStop', 'fileDragging', 'fileDropped', 'fileLoad', 'fileOpen', 'fileSelect', 'fileSelection', 'folderCreate', 'menuClick', 'menuClose', 'menuOpen', 'move', 'popupClose', 'popupOpen', 'rename', 'search', 'success', 'toolbarClick', 'toolbarCreate', 'uploadListCreate'];
export const twoWays = [''];
/**
  * Represents the Essential JS 2 Angular FileManager Component.
 * ```html
 * <ejs-filemanager showThumbnail='false'></ejs-filemanager>
 * ```
 */
let FileManagerComponent = class FileManagerComponent extends FileManager {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['toolbarItems'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('FileManagerDetailsView');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerNavigationPane');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerLargeIconsView');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerBreadCrumbBar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerVirtualization');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
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
        this.tagObjects[0].instance = this.childToolbarItems;
        this.context.ngAfterContentChecked(this);
    }
};
FileManagerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FileManagerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: FileManagerComponent, selector: "ejs-filemanager", inputs: { ajaxSettings: "ajaxSettings", allowDragAndDrop: "allowDragAndDrop", allowMultiSelection: "allowMultiSelection", contextMenuSettings: "contextMenuSettings", cssClass: "cssClass", detailsViewSettings: "detailsViewSettings", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRangeSelection: "enableRangeSelection", enableRtl: "enableRtl", enableVirtualization: "enableVirtualization", fileSystemData: "fileSystemData", height: "height", largeIconsTemplate: "largeIconsTemplate", locale: "locale", navigationPaneSettings: "navigationPaneSettings", navigationPaneTemplate: "navigationPaneTemplate", path: "path", popupTarget: "popupTarget", rootAliasName: "rootAliasName", searchSettings: "searchSettings", selectedItems: "selectedItems", showFileExtension: "showFileExtension", showHiddenItems: "showHiddenItems", showItemCheckBoxes: "showItemCheckBoxes", showThumbnail: "showThumbnail", sortBy: "sortBy", sortComparer: "sortComparer", sortOrder: "sortOrder", toolbarItems: "toolbarItems", toolbarSettings: "toolbarSettings", uploadSettings: "uploadSettings", view: "view", width: "width" }, outputs: { beforeDelete: "beforeDelete", beforeDownload: "beforeDownload", beforeFolderCreate: "beforeFolderCreate", beforeImageLoad: "beforeImageLoad", beforeMove: "beforeMove", beforePopupClose: "beforePopupClose", beforePopupOpen: "beforePopupOpen", beforeRename: "beforeRename", beforeSend: "beforeSend", created: "created", delete: "delete", destroyed: "destroyed", failure: "failure", fileDragStart: "fileDragStart", fileDragStop: "fileDragStop", fileDragging: "fileDragging", fileDropped: "fileDropped", fileLoad: "fileLoad", fileOpen: "fileOpen", fileSelect: "fileSelect", fileSelection: "fileSelection", folderCreate: "folderCreate", menuClick: "menuClick", menuClose: "menuClose", menuOpen: "menuOpen", move: "move", popupClose: "popupClose", popupOpen: "popupOpen", rename: "rename", search: "search", success: "success", toolbarClick: "toolbarClick", toolbarCreate: "toolbarCreate", uploadListCreate: "uploadListCreate" }, queries: [{ propertyName: "largeIconsTemplate", first: true, predicate: ["largeIconsTemplate"], descendants: true }, { propertyName: "navigationPaneTemplate", first: true, predicate: ["navigationPaneTemplate"], descendants: true }, { propertyName: "childToolbarItems", first: true, predicate: ToolbarItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], FileManagerComponent.prototype, "largeIconsTemplate", void 0);
__decorate([
    Template()
], FileManagerComponent.prototype, "navigationPaneTemplate", void 0);
FileManagerComponent = __decorate([
    ComponentMixins([ComponentBase])
], FileManagerComponent);
export { FileManagerComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-filemanager',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childToolbarItems: new ContentChild(ToolbarItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { largeIconsTemplate: [{
                type: ContentChild,
                args: ['largeIconsTemplate']
            }], navigationPaneTemplate: [{
                type: ContentChild,
                args: ['navigationPaneTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZpbGUtbWFuYWdlci9maWxlbWFuYWdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUVqRSxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxjQUFjLEVBQUMsa0JBQWtCLEVBQUMscUJBQXFCLEVBQUMscUJBQXFCLEVBQUMsVUFBVSxFQUFDLHFCQUFxQixFQUFDLHFCQUFxQixFQUFDLG1CQUFtQixFQUFDLHNCQUFzQixFQUFDLFdBQVcsRUFBQyxzQkFBc0IsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsb0JBQW9CLEVBQUMsUUFBUSxFQUFDLHdCQUF3QixFQUFDLHdCQUF3QixFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGVBQWUsRUFBQyxtQkFBbUIsRUFBQyxpQkFBaUIsRUFBQyxvQkFBb0IsRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsY0FBYyxFQUFDLGlCQUFpQixFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNybEIsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsY0FBYyxFQUFDLGdCQUFnQixFQUFDLG9CQUFvQixF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QyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxxQkFBcUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUlKLENBQUE7aUhBaEpZLG9CQUFvQjtxR0FBcEIsb0JBQW9CLDYxRUFKVyxxQkFBcUIsdUVBSG5ELEVBQUU7QUEwRFo7SUFEQyxRQUFRLEVBQUU7Z0VBQ29CO0FBYS9CO0lBREMsUUFBUSxFQUFFO29FQUN3QjtBQWhFMUIsb0JBQW9CO0lBRGhDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLG9CQUFvQixDQWdKaEM7U0FoSlksb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBWGhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsaUJBQWlCLEVBQUUsSUFBSSxZQUFZLENBQUMscUJBQXFCLENBQUM7cUJBQzdEO2lCQUNKOytLQXFEVSxrQkFBa0I7c0JBRnhCLFlBQVk7dUJBQUMsb0JBQW9CO2dCQWUzQixzQkFBc0I7c0JBRjVCLFlBQVk7dUJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIEluamVjdG9yLCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgRmlsZU1hbmFnZXIgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZmlsZW1hbmFnZXInO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRvb2xiYXJJdGVtc0RpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbGJhcml0ZW1zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhamF4U2V0dGluZ3MnLCdhbGxvd0RyYWdBbmREcm9wJywnYWxsb3dNdWx0aVNlbGVjdGlvbicsJ2NvbnRleHRNZW51U2V0dGluZ3MnLCdjc3NDbGFzcycsJ2RldGFpbHNWaWV3U2V0dGluZ3MnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSYW5nZVNlbGVjdGlvbicsJ2VuYWJsZVJ0bCcsJ2VuYWJsZVZpcnR1YWxpemF0aW9uJywnZmlsZVN5c3RlbURhdGEnLCdoZWlnaHQnLCdsYXJnZUljb25zVGVtcGxhdGUnLCdsb2NhbGUnLCduYXZpZ2F0aW9uUGFuZVNldHRpbmdzJywnbmF2aWdhdGlvblBhbmVUZW1wbGF0ZScsJ3BhdGgnLCdwb3B1cFRhcmdldCcsJ3Jvb3RBbGlhc05hbWUnLCdzZWFyY2hTZXR0aW5ncycsJ3NlbGVjdGVkSXRlbXMnLCdzaG93RmlsZUV4dGVuc2lvbicsJ3Nob3dIaWRkZW5JdGVtcycsJ3Nob3dJdGVtQ2hlY2tCb3hlcycsJ3Nob3dUaHVtYm5haWwnLCdzb3J0QnknLCdzb3J0Q29tcGFyZXInLCdzb3J0T3JkZXInLCd0b29sYmFySXRlbXMnLCd0b29sYmFyU2V0dGluZ3MnLCd1cGxvYWRTZXR0aW5ncycsJ3ZpZXcnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydiZWZvcmVEZWxldGUnLCdiZWZvcmVEb3dubG9hZCcsJ2JlZm9yZUZvbGRlckNyZWF0ZScsJ2JlZm9yZUltYWdlTG9hZCcsJ2JlZm9yZU1vdmUnLCdiZWZvcmVQb3B1cENsb3NlJywnYmVmb3JlUG9wdXBPcGVuJywnYmVmb3JlUmVuYW1lJywnYmVmb3JlU2VuZCcsJ2NyZWF0ZWQnLCdkZWxldGUnLCdkZXN0cm95ZWQnLCdmYWlsdXJlJywnZmlsZURyYWdTdGFydCcsJ2ZpbGVEcmFnU3RvcCcsJ2ZpbGVEcmFnZ2luZycsJ2ZpbGVEcm9wcGVkJywnZmlsZUxvYWQnLCdmaWxlT3BlbicsJ2ZpbGVTZWxlY3QnLCdmaWxlU2VsZWN0aW9uJywnZm9sZGVyQ3JlYXRlJywnbWVudUNsaWNrJywnbWVudUNsb3NlJywnbWVudU9wZW4nLCdtb3ZlJywncG9wdXBDbG9zZScsJ3BvcHVwT3BlbicsJ3JlbmFtZScsJ3NlYXJjaCcsJ3N1Y2Nlc3MnLCd0b29sYmFyQ2xpY2snLCd0b29sYmFyQ3JlYXRlJywndXBsb2FkTGlzdENyZWF0ZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gICogUmVwcmVzZW50cyB0aGUgRXNzZW50aWFsIEpTIDIgQW5ndWxhciBGaWxlTWFuYWdlciBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWZpbGVtYW5hZ2VyIHNob3dUaHVtYm5haWw9J2ZhbHNlJz48L2Vqcy1maWxlbWFuYWdlcj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1maWxlbWFuYWdlcicsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZFRvb2xiYXJJdGVtczogbmV3IENvbnRlbnRDaGlsZChUb29sYmFySXRlbXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIEZpbGVNYW5hZ2VyQ29tcG9uZW50IGV4dGVuZHMgRmlsZU1hbmFnZXIgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YmVmb3JlRGVsZXRlOiBhbnk7XG5cdGJlZm9yZURvd25sb2FkOiBhbnk7XG5cdGJlZm9yZUZvbGRlckNyZWF0ZTogYW55O1xuXHRiZWZvcmVJbWFnZUxvYWQ6IGFueTtcblx0YmVmb3JlTW92ZTogYW55O1xuXHRiZWZvcmVQb3B1cENsb3NlOiBhbnk7XG5cdGJlZm9yZVBvcHVwT3BlbjogYW55O1xuXHRiZWZvcmVSZW5hbWU6IGFueTtcblx0YmVmb3JlU2VuZDogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGRlbGV0ZTogYW55O1xuXHRkZXN0cm95ZWQ6IGFueTtcblx0ZmFpbHVyZTogYW55O1xuXHRmaWxlRHJhZ1N0YXJ0OiBhbnk7XG5cdGZpbGVEcmFnU3RvcDogYW55O1xuXHRmaWxlRHJhZ2dpbmc6IGFueTtcblx0ZmlsZURyb3BwZWQ6IGFueTtcblx0ZmlsZUxvYWQ6IGFueTtcblx0ZmlsZU9wZW46IGFueTtcblx0ZmlsZVNlbGVjdDogYW55O1xuXHRmaWxlU2VsZWN0aW9uOiBhbnk7XG5cdGZvbGRlckNyZWF0ZTogYW55O1xuXHRtZW51Q2xpY2s6IGFueTtcblx0bWVudUNsb3NlOiBhbnk7XG5cdG1lbnVPcGVuOiBhbnk7XG5cdG1vdmU6IGFueTtcblx0cG9wdXBDbG9zZTogYW55O1xuXHRwb3B1cE9wZW46IGFueTtcblx0cmVuYW1lOiBhbnk7XG5cdHNlYXJjaDogYW55O1xuXHRzdWNjZXNzOiBhbnk7XG5cdHRvb2xiYXJDbGljazogYW55O1xuXHR0b29sYmFyQ3JlYXRlOiBhbnk7XG5cdHB1YmxpYyB1cGxvYWRMaXN0Q3JlYXRlOiBhbnk7XG4gICAgcHVibGljIGNoaWxkVG9vbGJhckl0ZW1zOiBRdWVyeUxpc3Q8VG9vbGJhckl0ZW1zRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3Rvb2xiYXJJdGVtcyddO1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgYSB0ZW1wbGF0ZSB0byByZW5kZXIgY3VzdG9taXplZCBjb250ZW50IGZvciBhbGwgdGhlIGZpbGVzIG9yIGZvbGRlcnMgaW4gdGhlIGxhcmdlIGljb25zIHZpZXcuIElmIHRoZSBgbGFyZ2VJY29uc1RlbXBsYXRlYCBwcm9wZXJ0eSBcbiAgICAgKiBpcyBzZXQsIHRoZSB0ZW1wbGF0ZSBjb250ZW50IG92ZXJyaWRlcyB0aGUgZGlzcGxheWVkIGZpbGVzIG9yIGZvbGRlcnMgdGV4dCBpbiB0aGUgRmlsZSBNYW5hZ2VyIGxhcmdlIGljb25zIHZpZXcuIFRoZSBwcm9wZXJ0eSBhY2NlcHRzIHRlbXBsYXRlIHN0cmluZyBcbiAgICAgKiBvciBIVE1MIGVsZW1lbnQgSUQgaG9sZGluZyB0aGUgY29udGVudC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbGFyZ2VJY29uc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBsYXJnZUljb25zVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIGEgdGVtcGxhdGUgdG8gcmVuZGVyIGN1c3RvbWl6ZWQgY29udGVudCBmb3IgYWxsIHRoZSBub2Rlcy4gSWYgdGhlIGBuYXZpZ2F0aW9uUGFuZVRlbXBsYXRlYCBwcm9wZXJ0eSBcbiAgICAgKiBpcyBzZXQsIHRoZSB0ZW1wbGF0ZSBjb250ZW50IG92ZXJyaWRlcyB0aGUgZGlzcGxheWVkIG5vZGUgdGV4dCBpbiB0aGUgRmlsZSBNYW5hZ2VyIG5hdmlnYXRpb24gcGFuZS4gXG4gICAgICogVGhlIHByb3BlcnR5IGFjY2VwdHMgYSB0ZW1wbGF0ZSBzdHJpbmcgb3IgSFRNTCBlbGVtZW50IElEIGhvbGRpbmcgdGhlIGNvbnRlbnQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ25hdmlnYXRpb25QYW5lVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIG5hdmlnYXRpb25QYW5lVGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdGaWxlTWFuYWdlckRldGFpbHNWaWV3Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdGaWxlTWFuYWdlck5hdmlnYXRpb25QYW5lJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdGaWxlTWFuYWdlckxhcmdlSWNvbnNWaWV3Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdGaWxlTWFuYWdlclRvb2xiYXInKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0ZpbGVNYW5hZ2VyQ29udGV4dE1lbnUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0ZpbGVNYW5hZ2VyQnJlYWRDcnVtYkJhcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRmlsZU1hbmFnZXJWaXJ0dWFsaXphdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRUb29sYmFySXRlbXM7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=