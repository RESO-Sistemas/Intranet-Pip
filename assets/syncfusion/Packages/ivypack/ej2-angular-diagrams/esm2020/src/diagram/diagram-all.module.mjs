import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramModule } from './diagram.module';
import { HierarchicalTree, MindMap, RadialTree, ComplexHierarchicalTree, DataBinding, Snapping, PrintAndExport, BpmnDiagrams, SymmetricLayout, ConnectorBridging, UndoRedo, DiagramCollaboration, LayoutAnimation, DiagramContextMenu, LineRouting, AvoidLineOverlapping, ConnectorEditing, LineDistribution, Ej1Serialization, FlowchartLayout, ImportAndExportVisio } from '@syncfusion/ej2-diagrams';
import * as i0 from "@angular/core";
export const HierarchicalTreeService = { provide: 'DiagramsHierarchicalTree', useValue: HierarchicalTree };
export const MindMapService = { provide: 'DiagramsMindMap', useValue: MindMap };
export const RadialTreeService = { provide: 'DiagramsRadialTree', useValue: RadialTree };
export const ComplexHierarchicalTreeService = { provide: 'DiagramsComplexHierarchicalTree', useValue: ComplexHierarchicalTree };
export const DataBindingService = { provide: 'DiagramsDataBinding', useValue: DataBinding };
export const SnappingService = { provide: 'DiagramsSnapping', useValue: Snapping };
export const PrintAndExportService = { provide: 'DiagramsPrintAndExport', useValue: PrintAndExport };
export const BpmnDiagramsService = { provide: 'DiagramsBpmnDiagrams', useValue: BpmnDiagrams };
export const SymmetricLayoutService = { provide: 'DiagramsSymmetricLayout', useValue: SymmetricLayout };
export const ConnectorBridgingService = { provide: 'DiagramsConnectorBridging', useValue: ConnectorBridging };
export const UndoRedoService = { provide: 'DiagramsUndoRedo', useValue: UndoRedo };
export const DiagramCollaborationService = { provide: 'DiagramsDiagramCollaboration', useValue: DiagramCollaboration };
export const LayoutAnimationService = { provide: 'DiagramsLayoutAnimation', useValue: LayoutAnimation };
export const DiagramContextMenuService = { provide: 'DiagramsDiagramContextMenu', useValue: DiagramContextMenu };
export const LineRoutingService = { provide: 'DiagramsLineRouting', useValue: LineRouting };
export const AvoidLineOverlappingService = { provide: 'DiagramsAvoidLineOverlapping', useValue: AvoidLineOverlapping };
export const ConnectorEditingService = { provide: 'DiagramsConnectorEditing', useValue: ConnectorEditing };
export const LineDistributionService = { provide: 'DiagramsLineDistribution', useValue: LineDistribution };
export const Ej1SerializationService = { provide: 'DiagramsEj1Serialization', useValue: Ej1Serialization };
export const FlowchartLayoutService = { provide: 'DiagramsFlowchartLayout', useValue: FlowchartLayout };
export const ImportAndExportVisioService = { provide: 'DiagramsImportAndExportVisio', useValue: ImportAndExportVisio };
/**
 * NgModule definition for the Diagram component with providers.
 */
export class DiagramAllModule {
}
DiagramAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DiagramAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, imports: [CommonModule, DiagramModule], exports: [DiagramModule] });
DiagramAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, providers: [
        HierarchicalTreeService,
        MindMapService,
        RadialTreeService,
        ComplexHierarchicalTreeService,
        DataBindingService,
        SnappingService,
        PrintAndExportService,
        BpmnDiagramsService,
        SymmetricLayoutService,
        ConnectorBridgingService,
        UndoRedoService,
        DiagramCollaborationService,
        LayoutAnimationService,
        DiagramContextMenuService,
        LineRoutingService,
        AvoidLineOverlappingService,
        ConnectorEditingService,
        LineDistributionService,
        Ej1SerializationService,
        FlowchartLayoutService,
        ImportAndExportVisioService
    ], imports: [[CommonModule, DiagramModule], DiagramModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DiagramModule],
                    exports: [
                        DiagramModule
                    ],
                    providers: [
                        HierarchicalTreeService,
                        MindMapService,
                        RadialTreeService,
                        ComplexHierarchicalTreeService,
                        DataBindingService,
                        SnappingService,
                        PrintAndExportService,
                        BpmnDiagramsService,
                        SymmetricLayoutService,
                        ConnectorBridgingService,
                        UndoRedoService,
                        DiagramCollaborationService,
                        LayoutAnimationService,
                        DiagramContextMenuService,
                        LineRoutingService,
                        AvoidLineOverlappingService,
                        ConnectorEditingService,
                        LineDistributionService,
                        Ej1SerializationService,
                        FlowchartLayoutService,
                        ImportAndExportVisioService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ3JhbS1hbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpYWdyYW0vZGlhZ3JhbS1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVcvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTs7QUFHclksTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0FBQ3pILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0IsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQzlGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDdkcsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDO0FBQzlJLE1BQU0sQ0FBQyxNQUFN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dUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QiwyQkFBMkI7S0FDOUIsWUExQlEsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEVBRWxDLGFBQWE7MkZBMEJSLGdCQUFnQjtrQkE3QjVCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDdEMsT0FBTyxFQUFFO3dCQUNMLGFBQWE7cUJBQ2hCO29CQUNELFNBQVMsRUFBQzt3QkFDTix1QkFBdUI7d0JBQ3ZCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQiw4QkFBOEI7d0JBQzlCLGtCQUFrQjt3QkFDbEIsZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7d0JBQ3hCLGVBQWU7d0JBQ2YsMkJBQTJCO3dCQUMzQixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsa0JBQWtCO3dCQUNsQiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjt3QkFDdEIsMkJBQTJCO3FCQUM5QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTGF5ZXJEaXJlY3RpdmUsIExheWVyc0RpcmVjdGl2ZSB9IGZyb20gJy4vbGF5ZXJzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDdXN0b21DdXJzb3JEaXJlY3RpdmUsIEN1c3RvbUN1cnNvcnNEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbWN1cnNvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29ubmVjdG9yRml4ZWRVc2VySGFuZGxlRGlyZWN0aXZlLCBDb25uZWN0b3JGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0b3ItZml4ZWR1c2VyaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb25uZWN0b3JBbm5vdGF0aW9uRGlyZWN0aXZlLCBDb25uZWN0b3JBbm5vdGF0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdG9yLWFubm90YXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbm5lY3RvckRpcmVjdGl2ZSwgQ29ubmVjdG9yc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdG9ycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9kZUZpeGVkVXNlckhhbmRsZURpcmVjdGl2ZSwgTm9kZUZpeGVkVXNlckhhbmRsZXNEaXJlY3RpdmUgfSBmcm9tICcuL25vZGUtZml4ZWR1c2VyaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb2RlQW5ub3RhdGlvbkRpcmVjdGl2ZSwgTm9kZUFubm90YXRpb25zRGlyZWN0aXZlIH0gZnJvbSAnLi9ub2RlLWFubm90YXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvcnREaXJlY3RpdmUsIFBvcnRzRGlyZWN0aXZlIH0gZnJvbSAnLi9wb3J0cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9kZURpcmVjdGl2ZSwgTm9kZXNEaXJlY3RpdmUgfSBmcm9tICcuL25vZGVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaWFncmFtQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFncmFtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFncmFtTW9kdWxlIH0gZnJvbSAnLi9kaWFncmFtLm1vZHVsZSc7XG5pbXBvcnQge0hpZXJhcmNoaWNhbFRyZWUsIE1pbmRNYXAsIFJhZGlhbFRyZWUsIENvbXBsZXhIaWVyYXJjaGljYWxUcmVlLCBEYXRhQmluZGluZywgU25hcHBpbmcsIFByaW50QW5kRXhwb3J0LCBCcG1uRGlhZ3JhbXMsIFN5bW1ldHJpY0xheW91dCwgQ29ubmVjdG9yQnJpZGdpbmcsIFVuZG9SZWRvLCBEaWFncmFtQ29sbGFib3JhdGlvbiwgTGF5b3V0QW5pbWF0aW9uLCBEaWFncmFtQ29udGV4dE1lbnUsIExpbmVSb3V0aW5nLCBBdm9pZExpbmVPdmVybGFwcGluZywgQ29ubmVjdG9yRWRpdGluZywgTGluZURpc3RyaWJ1dGlvbiwgRWoxU2VyaWFsaXphdGlvbiwgRmxvd2NoYXJ0TGF5b3V0LCBJbXBvcnRBbmRFeHBvcnRWaXNpb30gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRpYWdyYW1zJ1xuXG5cbmV4cG9ydCBjb25zdCBIaWVyYXJjaGljYWxUcmVlU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zSGllcmFyY2hpY2FsVHJlZScsIHVzZVZhbHVlOiBIaWVyYXJjaGljYWxUcmVlfTtcbmV4cG9ydCBjb25zdCBNaW5kTWFwU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zTWluZE1hcCcsIHVzZVZhbHVlOiBNaW5kTWFwfTtcbmV4cG9ydCBjb25zdCBSYWRpYWxUcmVlU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zUmFkaWFsVHJlZScsIHVzZVZhbHVlOiBSYWRpYWxUcmVlfTtcbmV4cG9ydCBjb25zdCBDb21wbGV4SGllcmFyY2hpY2FsVHJlZVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0NvbXBsZXhIaWVyYXJjaGljYWxUcmVlJywgdXNlVmFsdWU6IENvbXBsZXhIaWVyYXJjaGljYWxUcmVlfTtcbmV4cG9ydCBjb25zdCBEYXRhQmluZGluZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0RhdGFCaW5kaW5nJywgdXNlVmFsdWU6IERhdGFCaW5kaW5nfTtcbmV4cG9ydCBjb25zdCBTbmFwcGluZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc1NuYXBwaW5nJywgdXNlVmFsdWU6IFNuYXBwaW5nfTtcbmV4cG9ydCBjb25zdCBQcmludEFuZEV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc1ByaW50QW5kRXhwb3J0JywgdXNlVmFsdWU6IFByaW50QW5kRXhwb3J0fTtcbmV4cG9ydCBjb25zdCBCcG1uRGlhZ3JhbXNTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNCcG1uRGlhZ3JhbXMnLCB1c2VWYWx1ZTogQnBtbkRpYWdyYW1zfTtcbmV4cG9ydCBjb25zdCBTeW1tZXRyaWNMYXlvdXRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNTeW1tZXRyaWNMYXlvdXQnLCB1c2VWYWx1ZTogU3ltbWV0cmljTGF5b3V0fTtcbmV4cG9ydCBjb25zdCBDb25uZWN0b3JCcmlkZ2luZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0Nvbm5lY3RvckJyaWRnaW5nJywgdXNlVmFsdWU6IENvbm5lY3RvckJyaWRnaW5nfTtcbmV4cG9ydCBjb25zdCBVbmRvUmVkb1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc1VuZG9SZWRvJywgdXNlVmFsdWU6IFVuZG9SZWRvfTtcbmV4cG9ydCBjb25zdCBEaWFncmFtQ29sbGFib3JhdGlvblNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0RpYWdyYW1Db2xsYWJvcmF0aW9uJywgdXNlVmFsdWU6IERpYWdyYW1Db2xsYWJvcmF0aW9ufTtcbmV4cG9ydCBjb25zdCBMYXlvdXRBbmltYXRpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNMYXlvdXRBbmltYXRpb24nLCB1c2VWYWx1ZTogTGF5b3V0QW5pbWF0aW9ufTtcbmV4cG9ydCBjb25zdCBEaWFncmFtQ29udGV4dE1lbnVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNEaWFncmFtQ29udGV4dE1lbnUnLCB1c2VWYWx1ZTogRGlhZ3JhbUNvbnRleHRNZW51fTtcbmV4cG9ydCBjb25zdCBMaW5lUm91dGluZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0xpbmVSb3V0aW5nJywgdXNlVmFsdWU6IExpbmVSb3V0aW5nfTtcbmV4cG9ydCBjb25zdCBBdm9pZExpbmVPdmVybGFwcGluZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0F2b2lkTGluZU92ZXJsYXBwaW5nJywgdXNlVmFsdWU6IEF2b2lkTGluZU92ZXJsYXBwaW5nfTtcbmV4cG9ydCBjb25zdCBDb25uZWN0b3JFZGl0aW5nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zQ29ubmVjdG9yRWRpdGluZycsIHVzZVZhbHVlOiBDb25uZWN0b3JFZGl0aW5nfTtcbmV4cG9ydCBjb25zdCBMaW5lRGlzdHJpYnV0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zTGluZURpc3RyaWJ1dGlvbicsIHVzZVZhbHVlOiBMaW5lRGlzdHJpYnV0aW9ufTtcbmV4cG9ydCBjb25zdCBFajFTZXJpYWxpemF0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zRWoxU2VyaWFsaXphdGlvbicsIHVzZVZhbHVlOiBFajFTZXJpYWxpemF0aW9ufTtcbmV4cG9ydCBjb25zdCBGbG93Y2hhcnRMYXlvdXRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNGbG93Y2hhcnRMYXlvdXQnLCB1c2VWYWx1ZTogRmxvd2NoYXJ0TGF5b3V0fTtcbmV4cG9ydCBjb25zdCBJbXBvcnRBbmRFeHBvcnRWaXNpb1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0ltcG9ydEFuZEV4cG9ydFZpc2lvJywgdXNlVmFsdWU6IEltcG9ydEFuZEV4cG9ydFZpc2lvfTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgRGlhZ3JhbSBjb21wb25lbnQgd2l0aCBwcm92aWRlcnMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRGlhZ3JhbU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEaWFncmFtTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBIaWVyYXJjaGljYWxUcmVlU2VydmljZSxcbiAgICAgICAgTWluZE1hcFNlcnZpY2UsXG4gICAgICAgIFJhZGlhbFRyZWVTZXJ2aWNlLFxuICAgICAgICBDb21wbGV4SGllcmFyY2hpY2FsVHJlZVNlcnZpY2UsXG4gICAgICAgIERhdGFCaW5kaW5nU2VydmljZSxcbiAgICAgICAgU25hcHBpbmdTZXJ2aWNlLFxuICAgICAgICBQcmludEFuZEV4cG9ydFNlcnZpY2UsXG4gICAgICAgIEJwbW5EaWFncmFtc1NlcnZpY2UsXG4gICAgICAgIFN5bW1ldHJpY0xheW91dFNlcnZpY2UsXG4gICAgICAgIENvbm5lY3RvckJyaWRnaW5nU2VydmljZSxcbiAgICAgICAgVW5kb1JlZG9TZXJ2aWNlLFxuICAgICAgICBEaWFncmFtQ29sbGFib3JhdGlvblNlcnZpY2UsXG4gICAgICAgIExheW91dEFuaW1hdGlvblNlcnZpY2UsXG4gICAgICAgIERpYWdyYW1Db250ZXh0TWVudVNlcnZpY2UsXG4gICAgICAgIExpbmVSb3V0aW5nU2VydmljZSxcbiAgICAgICAgQXZvaWRMaW5lT3ZlcmxhcHBpbmdTZXJ2aWNlLFxuICAgICAgICBDb25uZWN0b3JFZGl0aW5nU2VydmljZSxcbiAgICAgICAgTGluZURpc3RyaWJ1dGlvblNlcnZpY2UsXG4gICAgICAgIEVqMVNlcmlhbGl6YXRpb25TZXJ2aWNlLFxuICAgICAgICBGbG93Y2hhcnRMYXlvdXRTZXJ2aWNlLFxuICAgICAgICBJbXBvcnRBbmRFeHBvcnRWaXNpb1NlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIERpYWdyYW1BbGxNb2R1bGUgeyB9Il19