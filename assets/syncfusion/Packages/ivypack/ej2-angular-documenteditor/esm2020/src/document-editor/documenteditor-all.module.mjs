import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentEditorModule } from './documenteditor.module';
import { Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, EditorHistory, OptionsPane, ContextMenu, ImageResizer, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, ParagraphDialog, ListDialog, StyleDialog, StylesDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, SpellChecker, SpellCheckDialog, CollaborativeEditing, ColumnsDialog, CollaborativeEditingHandler, Optimized, TabDialog, TextFormFieldDialog, DropDownFormFieldDialog, CheckBoxFormFieldDialog } from '@syncfusion/ej2-documenteditor';
import * as i0 from "@angular/core";
export const PrintService = { provide: 'DocumentEditorPrint', useValue: Print };
export const SfdtExportService = { provide: 'DocumentEditorSfdtExport', useValue: SfdtExport };
export const WordExportService = { provide: 'DocumentEditorWordExport', useValue: WordExport };
export const TextExportService = { provide: 'DocumentEditorTextExport', useValue: TextExport };
export const SelectionService = { provide: 'DocumentEditorSelection', useValue: Selection };
export const SearchService = { provide: 'DocumentEditorSearch', useValue: Search };
export const EditorService = { provide: 'DocumentEditorEditor', useValue: Editor };
export const EditorHistoryService = { provide: 'DocumentEditorEditorHistory', useValue: EditorHistory };
export const OptionsPaneService = { provide: 'DocumentEditorOptionsPane', useValue: OptionsPane };
export const ContextMenuService = { provide: 'DocumentEditorContextMenu', useValue: ContextMenu };
export const ImageResizerService = { provide: 'DocumentEditorImageResizer', useValue: ImageResizer };
export const HyperlinkDialogService = { provide: 'DocumentEditorHyperlinkDialog', useValue: HyperlinkDialog };
export const TableDialogService = { provide: 'DocumentEditorTableDialog', useValue: TableDialog };
export const BookmarkDialogService = { provide: 'DocumentEditorBookmarkDialog', useValue: BookmarkDialog };
export const TableOfContentsDialogService = { provide: 'DocumentEditorTableOfContentsDialog', useValue: TableOfContentsDialog };
export const PageSetupDialogService = { provide: 'DocumentEditorPageSetupDialog', useValue: PageSetupDialog };
export const ParagraphDialogService = { provide: 'DocumentEditorParagraphDialog', useValue: ParagraphDialog };
export const ListDialogService = { provide: 'DocumentEditorListDialog', useValue: ListDialog };
export const StyleDialogService = { provide: 'DocumentEditorStyleDialog', useValue: StyleDialog };
export const StylesDialogService = { provide: 'DocumentEditorStylesDialog', useValue: StylesDialog };
export const BulletsAndNumberingDialogService = { provide: 'DocumentEditorBulletsAndNumberingDialog', useValue: BulletsAndNumberingDialog };
export const FontDialogService = { provide: 'DocumentEditorFontDialog', useValue: FontDialog };
export const TablePropertiesDialogService = { provide: 'DocumentEditorTablePropertiesDialog', useValue: TablePropertiesDialog };
export const BordersAndShadingDialogService = { provide: 'DocumentEditorBordersAndShadingDialog', useValue: BordersAndShadingDialog };
export const TableOptionsDialogService = { provide: 'DocumentEditorTableOptionsDialog', useValue: TableOptionsDialog };
export const CellOptionsDialogService = { provide: 'DocumentEditorCellOptionsDialog', useValue: CellOptionsDialog };
export const SpellCheckerService = { provide: 'DocumentEditorSpellChecker', useValue: SpellChecker };
export const SpellCheckDialogService = { provide: 'DocumentEditorSpellCheckDialog', useValue: SpellCheckDialog };
export const CollaborativeEditingService = { provide: 'DocumentEditorCollaborativeEditing', useValue: CollaborativeEditing };
export const ColumnsDialogService = { provide: 'DocumentEditorColumnsDialog', useValue: ColumnsDialog };
export const CollaborativeEditingHandlerService = { provide: 'DocumentEditorCollaborativeEditingHandler', useValue: CollaborativeEditingHandler };
export const OptimizedService = { provide: 'DocumentEditorOptimized', useValue: Optimized };
export const TabDialogService = { provide: 'DocumentEditorTabDialog', useValue: TabDialog };
export const TextFormFieldDialogService = { provide: 'DocumentEditorTextFormFieldDialog', useValue: TextFormFieldDialog };
export const DropDownFormFieldDialogService = { provide: 'DocumentEditorDropDownFormFieldDialog', useValue: DropDownFormFieldDialog };
export const CheckBoxFormFieldDialogService = { provide: 'DocumentEditorCheckBoxFormFieldDialog', useValue: CheckBoxFormFieldDialog };
/**
 * NgModule definition for the DocumentEditor component with providers.
 */
export class DocumentEditorAllModule {
}
DocumentEditorAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DocumentEditorAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorAllModule, imports: [CommonModule, DocumentEditorModule], exports: [DocumentEditorModule] });
DocumentEditorAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorAllModule, providers: [
        PrintService,
        SfdtExportService,
        WordExportService,
        TextExportService,
        SelectionService,
        SearchService,
        EditorService,
        EditorHistoryService,
        OptionsPaneService,
        ContextMenuService,
        ImageResizerService,
        HyperlinkDialogService,
        TableDialogService,
        BookmarkDialogService,
        TableOfContentsDialogService,
        PageSetupDialogService,
        ParagraphDialogService,
        ListDialogService,
        StyleDialogService,
        StylesDialogService,
        BulletsAndNumberingDialogService,
        FontDialogService,
        TablePropertiesDialogService,
        BordersAndShadingDialogService,
        TableOptionsDialogService,
        CellOptionsDialogService,
        SpellCheckerService,
        SpellCheckDialogService,
        CollaborativeEditingService,
        ColumnsDialogService,
        CollaborativeEditingHandlerService,
        OptimizedService,
        TabDialogService,
        TextFormFieldDialogService,
        DropDownFormFieldDialogService,
        CheckBoxFormFieldDialogService
    ], imports: [[CommonModule, DocumentEditorModule], DocumentEditorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DocumentEditorAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DocumentEditorModule],
                    exports: [
                        DocumentEditorModule
                    ],
                    providers: [
                        PrintService,
                        SfdtExportService,
                        WordExportService,
                        TextExportService,
                        SelectionService,
                        SearchService,
                        EditorService,
                        EditorHistoryService,
                        OptionsPaneService,
                        ContextMenuService,
                        ImageResizerService,
                        HyperlinkDialogService,
                        TableDialogService,
                        BookmarkDialogService,
                        TableOfContentsDialogService,
                        PageSetupDialogService,
                        ParagraphDialogService,
                        ListDialogService,
                        StyleDialogService,
                        StylesDialogService,
                        BulletsAndNumberingDialogService,
                        FontDialogService,
                        TablePropertiesDialogService,
                        BordersAndShadingDialogService,
                        TableOptionsDialogService,
                        CellOptionsDialogService,
                        SpellCheckerService,
                        SpellCheckDialogService,
                        CollaborativeEditingService,
                        ColumnsDialogService,
                        CollaborativeEditingHandlerService,
                        OptimizedService,
                        TabDialogService,
                        TextFormFieldDialogService,
                        DropDownFormFieldDialogService,
                        CheckBoxFormFieldDialogService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRlZGl0b3ItYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N1bWVudC1lZGl0b3IvZG9jdW1lbnRlZGl0b3ItYWxsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSwyQkFBMkIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZ0NBQWdDLENBQUE7O0FBR3JuQixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztBQUM5RixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQzdHLE1BQU0sQ0FBQyxN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QU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztvQkFDN0MsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFDO3dCQUNOLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIscUJBQXFCO3dCQUNyQiw0QkFBNEI7d0JBQzVCLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0QixpQkFBaUI7d0JBQ2pCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixnQ0FBZ0M7d0JBQ2hDLGlCQUFpQjt3QkFDakIsNEJBQTRCO3dCQUM1Qiw4QkFBOEI7d0JBQzlCLHlCQUF5Qjt3QkFDekIsd0JBQXdCO3dCQUN4QixtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsMkJBQTJCO3dCQUMzQixvQkFBb0I7d0JBQ3BCLGtDQUFrQzt3QkFDbEMsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLDBCQUEwQjt3QkFDMUIsOEJBQThCO3dCQUM5Qiw4QkFBOEI7cUJBQ2pDO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIFZhbHVlUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb2N1bWVudEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vZG9jdW1lbnRlZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IERvY3VtZW50RWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9kb2N1bWVudGVkaXRvci5tb2R1bGUnO1xuaW1wb3J0IHtQcmludCwgU2ZkdEV4cG9ydCwgV29yZEV4cG9ydCwgVGV4dEV4cG9ydCwgU2VsZWN0aW9uLCBTZWFyY2gsIEVkaXRvciwgRWRpdG9ySGlzdG9yeSwgT3B0aW9uc1BhbmUsIENvbnRleHRNZW51LCBJbWFnZVJlc2l6ZXIsIEh5cGVybGlua0RpYWxvZywgVGFibGVEaWFsb2csIEJvb2ttYXJrRGlhbG9nLCBUYWJsZU9mQ29udGVudHNEaWFsb2csIFBhZ2VTZXR1cERpYWxvZywgUGFyYWdyYXBoRGlhbG9nLCBMaXN0RGlhbG9nLCBTdHlsZURpYWxvZywgU3R5bGVzRGlhbG9nLCBCdWxsZXRzQW5kTnVtYmVyaW5nRGlhbG9nLCBGb250RGlhbG9nLCBUYWJsZVByb3BlcnRpZXNEaWFsb2csIEJvcmRlcnNBbmRTaGFkaW5nRGlhbG9nLCBUYWJsZU9wdGlvbnNEaWFsb2csIENlbGxPcHRpb25zRGlhbG9nLCBTcGVsbENoZWNrZXIsIFNwZWxsQ2hlY2tEaWFsb2csIENvbGxhYm9yYXRpdmVFZGl0aW5nLCBDb2x1bW5zRGlhbG9nLCBDb2xsYWJvcmF0aXZlRWRpdGluZ0hhbmRsZXIsIE9wdGltaXplZCwgVGFiRGlhbG9nLCBUZXh0Rm9ybUZpZWxkRGlhbG9nLCBEcm9wRG93bkZvcm1GaWVsZERpYWxvZywgQ2hlY2tCb3hGb3JtRmllbGREaWFsb2d9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kb2N1bWVudGVkaXRvcidcblxuXG5leHBvcnQgY29uc3QgUHJpbnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JQcmludCcsIHVzZVZhbHVlOiBQcmludH07XG5leHBvcnQgY29uc3QgU2ZkdEV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvclNmZHRFeHBvcnQnLCB1c2VWYWx1ZTogU2ZkdEV4cG9ydH07XG5leHBvcnQgY29uc3QgV29yZEV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvcldvcmRFeHBvcnQnLCB1c2VWYWx1ZTogV29yZEV4cG9ydH07XG5leHBvcnQgY29uc3QgVGV4dEV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvclRleHRFeHBvcnQnLCB1c2VWYWx1ZTogVGV4dEV4cG9ydH07XG5leHBvcnQgY29uc3QgU2VsZWN0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yU2VsZWN0aW9uJywgdXNlVmFsdWU6IFNlbGVjdGlvbn07XG5leHBvcnQgY29uc3QgU2VhcmNoU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yU2VhcmNoJywgdXNlVmFsdWU6IFNlYXJjaH07XG5leHBvcnQgY29uc3QgRWRpdG9yU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yRWRpdG9yJywgdXNlVmFsdWU6IEVkaXRvcn07XG5leHBvcnQgY29uc3QgRWRpdG9ySGlzdG9yeVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvckVkaXRvckhpc3RvcnknLCB1c2VWYWx1ZTogRWRpdG9ySGlzdG9yeX07XG5leHBvcnQgY29uc3QgT3B0aW9uc1BhbmVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JPcHRpb25zUGFuZScsIHVzZVZhbHVlOiBPcHRpb25zUGFuZX07XG5leHBvcnQgY29uc3QgQ29udGV4dE1lbnVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JDb250ZXh0TWVudScsIHVzZVZhbHVlOiBDb250ZXh0TWVudX07XG5leHBvcnQgY29uc3QgSW1hZ2VSZXNpemVyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9ySW1hZ2VSZXNpemVyJywgdXNlVmFsdWU6IEltYWdlUmVzaXplcn07XG5leHBvcnQgY29uc3QgSHlwZXJsaW5rRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9ySHlwZXJsaW5rRGlhbG9nJywgdXNlVmFsdWU6IEh5cGVybGlua0RpYWxvZ307XG5leHBvcnQgY29uc3QgVGFibGVEaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JUYWJsZURpYWxvZycsIHVzZVZhbHVlOiBUYWJsZURpYWxvZ307XG5leHBvcnQgY29uc3QgQm9va21hcmtEaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JCb29rbWFya0RpYWxvZycsIHVzZVZhbHVlOiBCb29rbWFya0RpYWxvZ307XG5leHBvcnQgY29uc3QgVGFibGVPZkNvbnRlbnRzRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yVGFibGVPZkNvbnRlbnRzRGlhbG9nJywgdXNlVmFsdWU6IFRhYmxlT2ZDb250ZW50c0RpYWxvZ307XG5leHBvcnQgY29uc3QgUGFnZVNldHVwRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yUGFnZVNldHVwRGlhbG9nJywgdXNlVmFsdWU6IFBhZ2VTZXR1cERpYWxvZ307XG5leHBvcnQgY29uc3QgUGFyYWdyYXBoRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yUGFyYWdyYXBoRGlhbG9nJywgdXNlVmFsdWU6IFBhcmFncmFwaERpYWxvZ307XG5leHBvcnQgY29uc3QgTGlzdERpYWxvZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvckxpc3REaWFsb2cnLCB1c2VWYWx1ZTogTGlzdERpYWxvZ307XG5leHBvcnQgY29uc3QgU3R5bGVEaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JTdHlsZURpYWxvZycsIHVzZVZhbHVlOiBTdHlsZURpYWxvZ307XG5leHBvcnQgY29uc3QgU3R5bGVzRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yU3R5bGVzRGlhbG9nJywgdXNlVmFsdWU6IFN0eWxlc0RpYWxvZ307XG5leHBvcnQgY29uc3QgQnVsbGV0c0FuZE51bWJlcmluZ0RpYWxvZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvckJ1bGxldHNBbmROdW1iZXJpbmdEaWFsb2cnLCB1c2VWYWx1ZTogQnVsbGV0c0FuZE51bWJlcmluZ0RpYWxvZ307XG5leHBvcnQgY29uc3QgRm9udERpYWxvZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvckZvbnREaWFsb2cnLCB1c2VWYWx1ZTogRm9udERpYWxvZ307XG5leHBvcnQgY29uc3QgVGFibGVQcm9wZXJ0aWVzRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yVGFibGVQcm9wZXJ0aWVzRGlhbG9nJywgdXNlVmFsdWU6IFRhYmxlUHJvcGVydGllc0RpYWxvZ307XG5leHBvcnQgY29uc3QgQm9yZGVyc0FuZFNoYWRpbmdEaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JCb3JkZXJzQW5kU2hhZGluZ0RpYWxvZycsIHVzZVZhbHVlOiBCb3JkZXJzQW5kU2hhZGluZ0RpYWxvZ307XG5leHBvcnQgY29uc3QgVGFibGVPcHRpb25zRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yVGFibGVPcHRpb25zRGlhbG9nJywgdXNlVmFsdWU6IFRhYmxlT3B0aW9uc0RpYWxvZ307XG5leHBvcnQgY29uc3QgQ2VsbE9wdGlvbnNEaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JDZWxsT3B0aW9uc0RpYWxvZycsIHVzZVZhbHVlOiBDZWxsT3B0aW9uc0RpYWxvZ307XG5leHBvcnQgY29uc3QgU3BlbGxDaGVja2VyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yU3BlbGxDaGVja2VyJywgdXNlVmFsdWU6IFNwZWxsQ2hlY2tlcn07XG5leHBvcnQgY29uc3QgU3BlbGxDaGVja0RpYWxvZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvclNwZWxsQ2hlY2tEaWFsb2cnLCB1c2VWYWx1ZTogU3BlbGxDaGVja0RpYWxvZ307XG5leHBvcnQgY29uc3QgQ29sbGFib3JhdGl2ZUVkaXRpbmdTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JDb2xsYWJvcmF0aXZlRWRpdGluZycsIHVzZVZhbHVlOiBDb2xsYWJvcmF0aXZlRWRpdGluZ307XG5leHBvcnQgY29uc3QgQ29sdW1uc0RpYWxvZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvckNvbHVtbnNEaWFsb2cnLCB1c2VWYWx1ZTogQ29sdW1uc0RpYWxvZ307XG5leHBvcnQgY29uc3QgQ29sbGFib3JhdGl2ZUVkaXRpbmdIYW5kbGVyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yQ29sbGFib3JhdGl2ZUVkaXRpbmdIYW5kbGVyJywgdXNlVmFsdWU6IENvbGxhYm9yYXRpdmVFZGl0aW5nSGFuZGxlcn07XG5leHBvcnQgY29uc3QgT3B0aW1pemVkU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yT3B0aW1pemVkJywgdXNlVmFsdWU6IE9wdGltaXplZH07XG5leHBvcnQgY29uc3QgVGFiRGlhbG9nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RvY3VtZW50RWRpdG9yVGFiRGlhbG9nJywgdXNlVmFsdWU6IFRhYkRpYWxvZ307XG5leHBvcnQgY29uc3QgVGV4dEZvcm1GaWVsZERpYWxvZ1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEb2N1bWVudEVkaXRvclRleHRGb3JtRmllbGREaWFsb2cnLCB1c2VWYWx1ZTogVGV4dEZvcm1GaWVsZERpYWxvZ307XG5leHBvcnQgY29uc3QgRHJvcERvd25Gb3JtRmllbGREaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JEcm9wRG93bkZvcm1GaWVsZERpYWxvZycsIHVzZVZhbHVlOiBEcm9wRG93bkZvcm1GaWVsZERpYWxvZ307XG5leHBvcnQgY29uc3QgQ2hlY2tCb3hGb3JtRmllbGREaWFsb2dTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRG9jdW1lbnRFZGl0b3JDaGVja0JveEZvcm1GaWVsZERpYWxvZycsIHVzZVZhbHVlOiBDaGVja0JveEZvcm1GaWVsZERpYWxvZ307XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIERvY3VtZW50RWRpdG9yIGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBEb2N1bWVudEVkaXRvck1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEb2N1bWVudEVkaXRvck1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltcbiAgICAgICAgUHJpbnRTZXJ2aWNlLFxuICAgICAgICBTZmR0RXhwb3J0U2VydmljZSxcbiAgICAgICAgV29yZEV4cG9ydFNlcnZpY2UsXG4gICAgICAgIFRleHRFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBTZWxlY3Rpb25TZXJ2aWNlLFxuICAgICAgICBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBFZGl0b3JTZXJ2aWNlLFxuICAgICAgICBFZGl0b3JIaXN0b3J5U2VydmljZSxcbiAgICAgICAgT3B0aW9uc1BhbmVTZXJ2aWNlLFxuICAgICAgICBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgICAgIEltYWdlUmVzaXplclNlcnZpY2UsXG4gICAgICAgIEh5cGVybGlua0RpYWxvZ1NlcnZpY2UsXG4gICAgICAgIFRhYmxlRGlhbG9nU2VydmljZSxcbiAgICAgICAgQm9va21hcmtEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBUYWJsZU9mQ29udGVudHNEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBQYWdlU2V0dXBEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBQYXJhZ3JhcGhEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBMaXN0RGlhbG9nU2VydmljZSxcbiAgICAgICAgU3R5bGVEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBTdHlsZXNEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBCdWxsZXRzQW5kTnVtYmVyaW5nRGlhbG9nU2VydmljZSxcbiAgICAgICAgRm9udERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIFRhYmxlUHJvcGVydGllc0RpYWxvZ1NlcnZpY2UsXG4gICAgICAgIEJvcmRlcnNBbmRTaGFkaW5nRGlhbG9nU2VydmljZSxcbiAgICAgICAgVGFibGVPcHRpb25zRGlhbG9nU2VydmljZSxcbiAgICAgICAgQ2VsbE9wdGlvbnNEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBTcGVsbENoZWNrZXJTZXJ2aWNlLFxuICAgICAgICBTcGVsbENoZWNrRGlhbG9nU2VydmljZSxcbiAgICAgICAgQ29sbGFib3JhdGl2ZUVkaXRpbmdTZXJ2aWNlLFxuICAgICAgICBDb2x1bW5zRGlhbG9nU2VydmljZSxcbiAgICAgICAgQ29sbGFib3JhdGl2ZUVkaXRpbmdIYW5kbGVyU2VydmljZSxcbiAgICAgICAgT3B0aW1pemVkU2VydmljZSxcbiAgICAgICAgVGFiRGlhbG9nU2VydmljZSxcbiAgICAgICAgVGV4dEZvcm1GaWVsZERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIERyb3BEb3duRm9ybUZpZWxkRGlhbG9nU2VydmljZSxcbiAgICAgICAgQ2hlY2tCb3hGb3JtRmllbGREaWFsb2dTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEb2N1bWVudEVkaXRvckFsbE1vZHVsZSB7IH0iXX0=