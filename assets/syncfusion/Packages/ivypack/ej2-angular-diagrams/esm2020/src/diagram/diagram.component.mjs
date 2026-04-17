import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Diagram } from '@syncfusion/ej2-diagrams';
import { Template } from '@syncfusion/ej2-angular-base';
import { LayersDirective } from './layers.directive';
import { CustomCursorsDirective } from './customcursor.directive';
import { ConnectorsDirective } from './connectors.directive';
import { NodesDirective } from './nodes.directive';
import * as i0 from "@angular/core";
export const inputs = ['addInfo', 'annotationTemplate', 'backgroundColor', 'bridgeDirection', 'commandManager', 'connectorDefaults', 'connectors', 'constraints', 'contextMenuSettings', 'customCursor', 'dataSourceSettings', 'diagramSettings', 'drawingObject', 'enableCollaborativeEditing', 'enableConnectorSplit', 'enablePersistence', 'enableRtl', 'fixedUserHandleTemplate', 'getConnectorDefaults', 'getCustomCursor', 'getCustomProperty', 'getCustomTool', 'getDescription', 'getNodeDefaults', 'height', 'historyManager', 'layers', 'layout', 'locale', 'mode', 'model', 'nodeDefaults', 'nodeTemplate', 'nodes', 'pageSettings', 'rulerSettings', 'scrollSettings', 'segmentThumbShape', 'segmentThumbSize', 'selectedItems', 'serializationSettings', 'setNodeTemplate', 'snapSettings', 'tool', 'tooltip', 'updateSelection', 'userHandleTemplate', 'width'];
export const outputs = ['animationComplete', 'click', 'collectionChange', 'commandExecute', 'connectionChange', 'contextMenuBeforeItemRender', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataLoaded', 'diagramExporting', 'diagramImporting', 'doubleClick', 'dragEnter', 'dragLeave', 'dragOver', 'drop', 'elementDraw', 'expandStateChange', 'fixedUserHandleClick', 'historyChange', 'historyStateChange', 'keyDown', 'keyUp', 'layoutUpdated', 'load', 'loaded', 'mouseEnter', 'mouseLeave', 'mouseOver', 'mouseWheel', 'onFixedUserHandleMouseDown', 'onFixedUserHandleMouseEnter', 'onFixedUserHandleMouseLeave', 'onFixedUserHandleMouseUp', 'onImageLoad', 'onUserHandleMouseDown', 'onUserHandleMouseEnter', 'onUserHandleMouseLeave', 'onUserHandleMouseUp', 'positionChange', 'propertyChange', 'rotateChange', 'scrollChange', 'segmentChange', 'segmentCollectionChange', 'selectionChange', 'sizeChange', 'sourcePointChange', 'targetPointChange', 'textEdit'];
export const twoWays = [''];
/**
 * Diagram Component
 * ```html
 * <ej-diagram></ej-diagram>
 * ```
 */
let DiagramComponent = class DiagramComponent extends Diagram {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['layers', 'customCursor', 'connectors', 'nodes'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('DiagramsHierarchicalTree');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsMindMap');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsRadialTree');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsComplexHierarchicalTree');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsDataBinding');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsSnapping');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsPrintAndExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsBpmnDiagrams');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsSymmetricLayout');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsConnectorBridging');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsUndoRedo');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsDiagramCollaboration');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsLayoutAnimation');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsDiagramContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsLineRouting');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsAvoidLineOverlapping');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsConnectorEditing');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsLineDistribution');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsEj1Serialization');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsFlowchartLayout');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsImportAndExportVisio');
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
        this.tagObjects[0].instance = this.childLayers;
        if (this.childCustomCursor) {
            this.tagObjects[1].instance = this.childCustomCursor;
        }
        if (this.childConnectors) {
            this.tagObjects[2].instance = this.childConnectors;
        }
        if (this.childNodes) {
            this.tagObjects[3].instance = this.childNodes;
        }
        this.context.ngAfterContentChecked(this);
    }
};
DiagramComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
DiagramComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DiagramComponent, selector: "ejs-diagram", inputs: { addInfo: "addInfo", annotationTemplate: "annotationTemplate", backgroundColor: "backgroundColor", bridgeDirection: "bridgeDirection", commandManager: "commandManager", connectorDefaults: "connectorDefaults", connectors: "connectors", constraints: "constraints", contextMenuSettings: "contextMenuSettings", customCursor: "customCursor", dataSourceSettings: "dataSourceSettings", diagramSettings: "diagramSettings", drawingObject: "drawingObject", enableCollaborativeEditing: "enableCollaborativeEditing", enableConnectorSplit: "enableConnectorSplit", enablePersistence: "enablePersistence", enableRtl: "enableRtl", fixedUserHandleTemplate: "fixedUserHandleTemplate", getConnectorDefaults: "getConnectorDefaults", getCustomCursor: "getCustomCursor", getCustomProperty: "getCustomProperty", getCustomTool: "getCustomTool", getDescription: "getDescription", getNodeDefaults: "getNodeDefaults", height: "height", historyManager: "historyManager", layers: "layers", layout: "layout", locale: "locale", mode: "mode", model: "model", nodeDefaults: "nodeDefaults", nodeTemplate: "nodeTemplate", nodes: "nodes", pageSettings: "pageSettings", rulerSettings: "rulerSettings", scrollSettings: "scrollSettings", segmentThumbShape: "segmentThumbShape", segmentThumbSize: "segmentThumbSize", selectedItems: "selectedItems", serializationSettings: "serializationSettings", setNodeTemplate: "setNodeTemplate", snapSettings: "snapSettings", tool: "tool", tooltip: "tooltip", updateSelection: "updateSelection", userHandleTemplate: "userHandleTemplate", width: "width" }, outputs: { animationComplete: "animationComplete", click: "click", collectionChange: "collectionChange", commandExecute: "commandExecute", connectionChange: "connectionChange", contextMenuBeforeItemRender: "contextMenuBeforeItemRender", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataLoaded: "dataLoaded", diagramExporting: "diagramExporting", diagramImporting: "diagramImporting", doubleClick: "doubleClick", dragEnter: "dragEnter", dragLeave: "dragLeave", dragOver: "dragOver", drop: "drop", elementDraw: "elementDraw", expandStateChange: "expandStateChange", fixedUserHandleClick: "fixedUserHandleClick", historyChange: "historyChange", historyStateChange: "historyStateChange", keyDown: "keyDown", keyUp: "keyUp", layoutUpdated: "layoutUpdated", load: "load", loaded: "loaded", mouseEnter: "mouseEnter", mouseLeave: "mouseLeave", mouseOver: "mouseOver", mouseWheel: "mouseWheel", onFixedUserHandleMouseDown: "onFixedUserHandleMouseDown", onFixedUserHandleMouseEnter: "onFixedUserHandleMouseEnter", onFixedUserHandleMouseLeave: "onFixedUserHandleMouseLeave", onFixedUserHandleMouseUp: "onFixedUserHandleMouseUp", onImageLoad: "onImageLoad", onUserHandleMouseDown: "onUserHandleMouseDown", onUserHandleMouseEnter: "onUserHandleMouseEnter", onUserHandleMouseLeave: "onUserHandleMouseLeave", onUserHandleMouseUp: "onUserHandleMouseUp", positionChange: "positionChange", propertyChange: "propertyChange", rotateChange: "rotateChange", scrollChange: "scrollChange", segmentChange: "segmentChange", segmentCollectionChange: "segmentCollectionChange", selectionChange: "selectionChange", sizeChange: "sizeChange", sourcePointChange: "sourcePointChange", targetPointChange: "targetPointChange", textEdit: "textEdit" }, queries: [{ propertyName: "annotationTemplate", first: true, predicate: ["annotationTemplate"], descendants: true }, { propertyName: "nodeTemplate", first: true, predicate: ["nodeTemplate"], descendants: true }, { propertyName: "fixedUserHandleTemplate", first: true, predicate: ["fixedUserHandleTemplate"], descendants: true }, { propertyName: "userHandleTemplate", first: true, predicate: ["userHandleTemplate"], descendants: true }, { propertyName: "childLayers", first: true, predicate: LayersDirective, descendants: true }, { propertyName: "childCustomCursor", first: true, predicate: CustomCursorsDirective, descendants: true }, { propertyName: "childConnectors", first: true, predicate: ConnectorsDirective, descendants: true }, { propertyName: "childNodes", first: true, predicate: NodesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], DiagramComponent.prototype, "annotationTemplate", void 0);
__decorate([
    Template()
], DiagramComponent.prototype, "nodeTemplate", void 0);
__decorate([
    Template()
], DiagramComponent.prototype, "fixedUserHandleTemplate", void 0);
__decorate([
    Template()
], DiagramComponent.prototype, "userHandleTemplate", void 0);
DiagramComponent = __decorate([
    ComponentMixins([ComponentBase])
], DiagramComponent);
export { DiagramComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-diagram',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childLayers: new ContentChild(LayersDirective),
                        childCustomCursor: new ContentChild(CustomCursorsDirective),
                        childConnectors: new ContentChild(ConnectorsDirective),
                        childNodes: new ContentChild(NodesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { annotationTemplate: [{
                type: ContentChild,
                args: ['annotationTemplate']
            }], nodeTemplate: [{
                type: ContentChild,
                args: ['nodeTemplate']
            }], fixedUserHandleTemplate: [{
                type: ContentChild,
                args: ['fixedUserHandleTemplate']
            }], userHandleTemplate: [{
                type: ContentChild,
                args: ['userHandleTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ3JhbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlhZ3JhbS9kaWFncmFtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFbkQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsU0FBUyxFQUFDLG9CQUFvQixFQUFDLGlCQUFpQixFQUFDLGlCQUFpQixFQUFDLGdCQUFnQixFQUFDLG1CQUFtQixFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMscUJBQXFCLEVBQUMsY0FBYyxFQUFDLG9CQUFvQixFQUFDLGlCQUFpQixFQUFDLGVBQWUsRUFBQyw0QkFBNEIsRUFBQyxzQkFBc0IsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMseUJBQXlCLEVBQUMsc0JBQXNCLEVBQUMsaUJBQWlCLEVBQUMsbUJBQW1CLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGlCQUFpQixFQUFDLFFBQVEsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFN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LENBd1I1QjtTQXhSWSxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFkNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVyxFQUFFLElBQUksWUFBWSxDQUFDLGVBQWUsQ0FBQzt3QkFDOUMsaUJBQWlCLEVBQUUsSUFBSSxZQUFZLENBQUMsc0JBQXNCLENBQUM7d0JBQzNELGVBQWUsRUFBRSxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDdEQsVUFBVSxFQUFFLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQztxQkFDL0M7aUJBQ0o7K0tBb0VVLGtCQUFrQjtzQkFGeEIsWUFBWTt1QkFBQyxvQkFBb0I7Z0JBVTNCLFlBQVk7c0JBRmxCLFlBQVk7dUJBQUMsY0FBYztnQkFVckIsdUJBQXVCO3NCQUY3QixZQUFZO3VCQUFDLHlCQUF5QjtnQkFVaEMsa0JBQWtCO3NCQUZ4QixZQUFZO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IERpYWdyYW0gfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZGlhZ3JhbXMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IExheWVyc0RpcmVjdGl2ZSB9IGZyb20gJy4vbGF5ZXJzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDdXN0b21DdXJzb3JzRGlyZWN0aXZlIH0gZnJvbSAnLi9jdXN0b21jdXJzb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbm5lY3RvcnNEaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3RvcnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vZGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9ub2Rlcy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWRkSW5mbycsJ2Fubm90YXRpb25UZW1wbGF0ZScsJ2JhY2tncm91bmRDb2xvcicsJ2JyaWRnZURpcmVjdGlvbicsJ2NvbW1hbmRNYW5hZ2VyJywnY29ubmVjdG9yRGVmYXVsdHMnLCdjb25uZWN0b3JzJywnY29uc3RyYWludHMnLCdjb250ZXh0TWVudVNldHRpbmdzJywnY3VzdG9tQ3Vyc29yJywnZGF0YVNvdXJjZVNldHRpbmdzJywnZGlhZ3JhbVNldHRpbmdzJywnZHJhd2luZ09iamVjdCcsJ2VuYWJsZUNvbGxhYm9yYXRpdmVFZGl0aW5nJywnZW5hYmxlQ29ubmVjdG9yU3BsaXQnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2ZpeGVkVXNlckhhbmRsZVRlbXBsYXRlJywnZ2V0Q29ubmVjdG9yRGVmYXVsdHMnLCdnZXRDdXN0b21DdXJzb3InLCdnZXRDdXN0b21Qcm9wZXJ0eScsJ2dldEN1c3RvbVRvb2wnLCdnZXREZXNjcmlwdGlvbicsJ2dldE5vZGVEZWZhdWx0cycsJ2hlaWdodCcsJ2hpc3RvcnlNYW5hZ2VyJywnbGF5ZXJzJywnbGF5b3V0JywnbG9jYWxlJywnbW9kZScsJ21vZGVsJywnbm9kZURlZmF1bHRzJywnbm9kZVRlbXBsYXRlJywnbm9kZXMnLCdwYWdlU2V0dGluZ3MnLCdydWxlclNldHRpbmdzJywnc2Nyb2xsU2V0dGluZ3MnLCdzZWdtZW50VGh1bWJTaGFwZScsJ3NlZ21lbnRUaHVtYlNpemUnLCdzZWxlY3RlZEl0ZW1zJywnc2VyaWFsaXphdGlvblNldHRpbmdzJywnc2V0Tm9kZVRlbXBsYXRlJywnc25hcFNldHRpbmdzJywndG9vbCcsJ3Rvb2x0aXAnLCd1cGRhdGVTZWxlY3Rpb24nLCd1c2VySGFuZGxlVGVtcGxhdGUnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydhbmltYXRpb25Db21wbGV0ZScsJ2NsaWNrJywnY29sbGVjdGlvbkNoYW5nZScsJ2NvbW1hbmRFeGVjdXRlJywnY29ubmVjdGlvbkNoYW5nZScsJ2NvbnRleHRNZW51QmVmb3JlSXRlbVJlbmRlcicsJ2NvbnRleHRNZW51Q2xpY2snLCdjb250ZXh0TWVudU9wZW4nLCdjcmVhdGVkJywnZGF0YUxvYWRlZCcsJ2RpYWdyYW1FeHBvcnRpbmcnLCdkaWFncmFtSW1wb3J0aW5nJywnZG91YmxlQ2xpY2snLCdkcmFnRW50ZXInLCdkcmFnTGVhdmUnLCdkcmFnT3ZlcicsJ2Ryb3AnLCdlbGVtZW50RHJhdycsJ2V4cGFuZFN0YXRlQ2hhbmdlJywnZml4ZWRVc2VySGFuZGxlQ2xpY2snLCdoaXN0b3J5Q2hhbmdlJywnaGlzdG9yeVN0YXRlQ2hhbmdlJywna2V5RG93bicsJ2tleVVwJywnbGF5b3V0VXBkYXRlZCcsJ2xvYWQnLCdsb2FkZWQnLCdtb3VzZUVudGVyJywnbW91c2VMZWF2ZScsJ21vdXNlT3ZlcicsJ21vdXNlV2hlZWwnLCdvbkZpeGVkVXNlckhhbmRsZU1vdXNlRG93bicsJ29uRml4ZWRVc2VySGFuZGxlTW91c2VFbnRlcicsJ29uRml4ZWRVc2VySGFuZGxlTW91c2VMZWF2ZScsJ29uRml4ZWRVc2VySGFuZGxlTW91c2VVcCcsJ29uSW1hZ2VMb2FkJywnb25Vc2VySGFuZGxlTW91c2VEb3duJywnb25Vc2VySGFuZGxlTW91c2VFbnRlcicsJ29uVXNlckhhbmRsZU1vdXNlTGVhdmUnLCdvblVzZXJIYW5kbGVNb3VzZVVwJywncG9zaXRpb25DaGFuZ2UnLCdwcm9wZXJ0eUNoYW5nZScsJ3JvdGF0ZUNoYW5nZScsJ3Njcm9sbENoYW5nZScsJ3NlZ21lbnRDaGFuZ2UnLCdzZWdtZW50Q29sbGVjdGlvbkNoYW5nZScsJ3NlbGVjdGlvbkNoYW5nZScsJ3NpemVDaGFuZ2UnLCdzb3VyY2VQb2ludENoYW5nZScsJ3RhcmdldFBvaW50Q2hhbmdlJywndGV4dEVkaXQnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsnJ107XG5cbi8qKlxuICogRGlhZ3JhbSBDb21wb25lbnRcbiAqIGBgYGh0bWxcbiAqIDxlai1kaWFncmFtPjwvZWotZGlhZ3JhbT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1kaWFncmFtJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkTGF5ZXJzOiBuZXcgQ29udGVudENoaWxkKExheWVyc0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZEN1c3RvbUN1cnNvcjogbmV3IENvbnRlbnRDaGlsZChDdXN0b21DdXJzb3JzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkQ29ubmVjdG9yczogbmV3IENvbnRlbnRDaGlsZChDb25uZWN0b3JzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkTm9kZXM6IG5ldyBDb250ZW50Q2hpbGQoTm9kZXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIERpYWdyYW1Db21wb25lbnQgZXh0ZW5kcyBEaWFncmFtIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFuaW1hdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGNsaWNrOiBhbnk7XG5cdGNvbGxlY3Rpb25DaGFuZ2U6IGFueTtcblx0Y29tbWFuZEV4ZWN1dGU6IGFueTtcblx0Y29ubmVjdGlvbkNoYW5nZTogYW55O1xuXHRjb250ZXh0TWVudUJlZm9yZUl0ZW1SZW5kZXI6IGFueTtcblx0Y29udGV4dE1lbnVDbGljazogYW55O1xuXHRjb250ZXh0TWVudU9wZW46IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRkYXRhTG9hZGVkOiBhbnk7XG5cdGRpYWdyYW1FeHBvcnRpbmc6IGFueTtcblx0ZGlhZ3JhbUltcG9ydGluZzogYW55O1xuXHRkb3VibGVDbGljazogYW55O1xuXHRkcmFnRW50ZXI6IGFueTtcblx0ZHJhZ0xlYXZlOiBhbnk7XG5cdGRyYWdPdmVyOiBhbnk7XG5cdGRyb3A6IGFueTtcblx0ZWxlbWVudERyYXc6IGFueTtcblx0ZXhwYW5kU3RhdGVDaGFuZ2U6IGFueTtcblx0Zml4ZWRVc2VySGFuZGxlQ2xpY2s6IGFueTtcblx0aGlzdG9yeUNoYW5nZTogYW55O1xuXHRoaXN0b3J5U3RhdGVDaGFuZ2U6IGFueTtcblx0a2V5RG93bjogYW55O1xuXHRrZXlVcDogYW55O1xuXHRsYXlvdXRVcGRhdGVkOiBhbnk7XG5cdGxvYWQ6IGFueTtcblx0bG9hZGVkOiBhbnk7XG5cdG1vdXNlRW50ZXI6IGFueTtcblx0bW91c2VMZWF2ZTogYW55O1xuXHRtb3VzZU92ZXI6IGFueTtcblx0bW91c2VXaGVlbDogYW55O1xuXHRvbkZpeGVkVXNlckhhbmRsZU1vdXNlRG93bjogYW55O1xuXHRvbkZpeGVkVXNlckhhbmRsZU1vdXNlRW50ZXI6IGFueTtcblx0b25GaXhlZFVzZXJIYW5kbGVNb3VzZUxlYXZlOiBhbnk7XG5cdG9uRml4ZWRVc2VySGFuZGxlTW91c2VVcDogYW55O1xuXHRvbkltYWdlTG9hZDogYW55O1xuXHRvblVzZXJIYW5kbGVNb3VzZURvd246IGFueTtcblx0b25Vc2VySGFuZGxlTW91c2VFbnRlcjogYW55O1xuXHRvblVzZXJIYW5kbGVNb3VzZUxlYXZlOiBhbnk7XG5cdG9uVXNlckhhbmRsZU1vdXNlVXA6IGFueTtcblx0cG9zaXRpb25DaGFuZ2U6IGFueTtcblx0cHJvcGVydHlDaGFuZ2U6IGFueTtcblx0cm90YXRlQ2hhbmdlOiBhbnk7XG5cdHNjcm9sbENoYW5nZTogYW55O1xuXHRzZWdtZW50Q2hhbmdlOiBhbnk7XG5cdHNlZ21lbnRDb2xsZWN0aW9uQ2hhbmdlOiBhbnk7XG5cdHNlbGVjdGlvbkNoYW5nZTogYW55O1xuXHRzaXplQ2hhbmdlOiBhbnk7XG5cdHNvdXJjZVBvaW50Q2hhbmdlOiBhbnk7XG5cdHRhcmdldFBvaW50Q2hhbmdlOiBhbnk7XG5cdHB1YmxpYyB0ZXh0RWRpdDogYW55O1xuICAgIHB1YmxpYyBjaGlsZExheWVyczogUXVlcnlMaXN0PExheWVyc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkQ3VzdG9tQ3Vyc29yOiBRdWVyeUxpc3Q8Q3VzdG9tQ3Vyc29yc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkQ29ubmVjdG9yczogUXVlcnlMaXN0PENvbm5lY3RvcnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZE5vZGVzOiBRdWVyeUxpc3Q8Tm9kZXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnbGF5ZXJzJywgJ2N1c3RvbUN1cnNvcicsICdjb25uZWN0b3JzJywgJ25vZGVzJ107XG4gICAgLyoqIFxuICAgICAqIEN1c3RvbWl6ZXMgdGhlIGFubm90YXRpb24gdGVtcGxhdGVcbiAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdhbm5vdGF0aW9uVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGFubm90YXRpb25UZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBDdXN0b21pemVzIHRoZSBub2RlIHRlbXBsYXRlXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbm9kZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBub2RlVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhpcyBwcm9wZXJ0eSBhbGxvd3MgdXMgdG8gZGVmaW5lIEhUTUwgZWxlbWVudHMgZm9yIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZml4ZWRVc2VySGFuZGxlVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGZpeGVkVXNlckhhbmRsZVRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoaXMgcHJvcGVydHkgcmVwcmVzZW50cyB0aGUgdGVtcGxhdGUgY29udGVudCBvZiBhIHVzZXIgaGFuZGxlLiBUaGUgdXNlciBjYW4gZGVmaW5lIGFueSBIVE1MIGVsZW1lbnQgYXMgYSB0ZW1wbGF0ZS5cbiAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCd1c2VySGFuZGxlVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHVzZXJIYW5kbGVUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zSGllcmFyY2hpY2FsVHJlZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNNaW5kTWFwJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc1JhZGlhbFRyZWUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zQ29tcGxleEhpZXJhcmNoaWNhbFRyZWUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zRGF0YUJpbmRpbmcnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zU25hcHBpbmcnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zUHJpbnRBbmRFeHBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zQnBtbkRpYWdyYW1zJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc1N5bW1ldHJpY0xheW91dCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNDb25uZWN0b3JCcmlkZ2luZycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNVbmRvUmVkbycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNEaWFncmFtQ29sbGFib3JhdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNMYXlvdXRBbmltYXRpb24nKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zRGlhZ3JhbUNvbnRleHRNZW51Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0xpbmVSb3V0aW5nJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0F2b2lkTGluZU92ZXJsYXBwaW5nJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0Nvbm5lY3RvckVkaXRpbmcnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zTGluZURpc3RyaWJ1dGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNFajFTZXJpYWxpemF0aW9uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0Zsb3djaGFydExheW91dCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNJbXBvcnRBbmRFeHBvcnRWaXNpbycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRMYXllcnM7XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRDdXN0b21DdXJzb3IpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1sxXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDdXN0b21DdXJzb3I7XG4gICAgICAgIH1cbiAgICAgICAgXG5cdCAgICBpZiAodGhpcy5jaGlsZENvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1syXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDb25uZWN0b3JzO1xuICAgICAgICB9XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzWzNdLmluc3RhbmNlID0gdGhpcy5jaGlsZE5vZGVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=