import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorModule } from './richtexteditor.module';
import { Toolbar, Link, Image, ImportExport, Audio, Video, Count, QuickToolbar, HtmlEditor, MarkdownEditor, Table, PasteCleanup, Resize, FileManager, FormatPainter, EmojiPicker, SlashMenu, CodeBlock, ClipBoardCleanup, AutoFormat, AIAssistant } from '@syncfusion/ej2-richtexteditor';
import * as i0 from "@angular/core";
export const ToolbarService = { provide: 'RichTextEditorToolbar', useValue: Toolbar };
export const LinkService = { provide: 'RichTextEditorLink', useValue: Link };
export const ImageService = { provide: 'RichTextEditorImage', useValue: Image };
export const ImportExportService = { provide: 'RichTextEditorImportExport', useValue: ImportExport };
export const AudioService = { provide: 'RichTextEditorAudio', useValue: Audio };
export const VideoService = { provide: 'RichTextEditorVideo', useValue: Video };
export const CountService = { provide: 'RichTextEditorCount', useValue: Count };
export const QuickToolbarService = { provide: 'RichTextEditorQuickToolbar', useValue: QuickToolbar };
export const HtmlEditorService = { provide: 'RichTextEditorHtmlEditor', useValue: HtmlEditor };
export const MarkdownEditorService = { provide: 'RichTextEditorMarkdownEditor', useValue: MarkdownEditor };
export const TableService = { provide: 'RichTextEditorTable', useValue: Table };
export const PasteCleanupService = { provide: 'RichTextEditorPasteCleanup', useValue: PasteCleanup };
export const ResizeService = { provide: 'RichTextEditorResize', useValue: Resize };
export const FileManagerService = { provide: 'RichTextEditorFileManager', useValue: FileManager };
export const FormatPainterService = { provide: 'RichTextEditorFormatPainter', useValue: FormatPainter };
export const EmojiPickerService = { provide: 'RichTextEditorEmojiPicker', useValue: EmojiPicker };
export const SlashMenuService = { provide: 'RichTextEditorSlashMenu', useValue: SlashMenu };
export const CodeBlockService = { provide: 'RichTextEditorCodeBlock', useValue: CodeBlock };
export const ClipBoardCleanupService = { provide: 'RichTextEditorClipBoardCleanup', useValue: ClipBoardCleanup };
export const AutoFormatService = { provide: 'RichTextEditorAutoFormat', useValue: AutoFormat };
export const AIAssistantService = { provide: 'RichTextEditorAIAssistant', useValue: AIAssistant };
/**
 * NgModule definition for the RichTextEditor component with providers.
 */
export class RichTextEditorAllModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaHRleHRlZGl0b3ItYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yaWNoLXRleHQtZWRpdG9yL3JpY2h0ZXh0ZWRpdG9yLWFsbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDLENBQUE7O0FBR3ZSLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0IsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQ3BHLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBa0IsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQzNGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO0FBQzlGLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFrQixFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7QUFDbkgsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDOUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDOUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDOUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUNuSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQzdHLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFrQixFQUFFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUM7QUFDekgsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDOUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUNuSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztBQUNqRyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQ2hILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFrQixFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFDdEgsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUNoSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQzFHLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDMUcsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0FBQy9ILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDN0csTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUVoSDs7R0FFRztBQThCSCxNQUFNLE9BQU8sdUJBQXVCOztvSEFBdkIsdUJBQXVCO3FIQUF2Qix1QkFBdUIsWUE1QnRCLFlBQVksRUFBRSxvQkFBb0IsYUFFeEMsb0JBQW9CO3FIQTBCZix1QkFBdUIsYUF4QnRCO1FBQ04sY0FBYztRQUNkLFdBQVc7UUFDWCxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIscUJBQXFCO1FBQ3JCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLGlCQUFpQjtRQUNqQixrQkFBa0I7S0FDckIsWUExQlEsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsRUFFekMsb0JBQW9COzJGQTBCZix1QkFBdUI7a0JBN0JuQyxRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztvQkFDN0MsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFDO3dCQUNOLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLHVCQUF1Qjt3QkFDdkIsaUJBQWlCO3dCQUNqQixrQkFBa0I7cUJBQ3JCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIFZhbHVlUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSaWNoVGV4dEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vcmljaHRleHRlZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFJpY2hUZXh0RWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9yaWNodGV4dGVkaXRvci5tb2R1bGUnO1xuaW1wb3J0IHtUb29sYmFyLCBMaW5rLCBJbWFnZSwgSW1wb3J0RXhwb3J0LCBBdWRpbywgVmlkZW8sIENvdW50LCBRdWlja1Rvb2xiYXIsIEh0bWxFZGl0b3IsIE1hcmtkb3duRWRpdG9yLCBUYWJsZSwgUGFzdGVDbGVhbnVwLCBSZXNpemUsIEZpbGVNYW5hZ2VyLCBGb3JtYXRQYWludGVyLCBFbW9qaVBpY2tlciwgU2xhc2hNZW51LCBDb2RlQmxvY2ssIENsaXBCb2FyZENsZWFudXAsIEF1dG9Gb3JtYXQsIEFJQXNzaXN0YW50fSBmcm9tICdAc3luY2Z1c2lvbi9lajItcmljaHRleHRlZGl0b3InXG5cblxuZXhwb3J0IGNvbnN0IFRvb2xiYXJTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmljaFRleHRFZGl0b3JUb29sYmFyJywgdXNlVmFsdWU6IFRvb2xiYXJ9O1xuZXhwb3J0IGNvbnN0IExpbmtTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmljaFRleHRFZGl0b3JMaW5rJywgdXNlVmFsdWU6IExpbmt9O1xuZXhwb3J0IGNvbnN0IEltYWdlU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9ySW1hZ2UnLCB1c2VWYWx1ZTogSW1hZ2V9O1xuZXhwb3J0IGNvbnN0IEltcG9ydEV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWNoVGV4dEVkaXRvckltcG9ydEV4cG9ydCcsIHVzZVZhbHVlOiBJbXBvcnRFeHBvcnR9O1xuZXhwb3J0IGNvbnN0IEF1ZGlvU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yQXVkaW8nLCB1c2VWYWx1ZTogQXVkaW99O1xuZXhwb3J0IGNvbnN0IFZpZGVvU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yVmlkZW8nLCB1c2VWYWx1ZTogVmlkZW99O1xuZXhwb3J0IGNvbnN0IENvdW50U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yQ291bnQnLCB1c2VWYWx1ZTogQ291bnR9O1xuZXhwb3J0IGNvbnN0IFF1aWNrVG9vbGJhclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWNoVGV4dEVkaXRvclF1aWNrVG9vbGJhcicsIHVzZVZhbHVlOiBRdWlja1Rvb2xiYXJ9O1xuZXhwb3J0IGNvbnN0IEh0bWxFZGl0b3JTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmljaFRleHRFZGl0b3JIdG1sRWRpdG9yJywgdXNlVmFsdWU6IEh0bWxFZGl0b3J9O1xuZXhwb3J0IGNvbnN0IE1hcmtkb3duRWRpdG9yU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yTWFya2Rvd25FZGl0b3InLCB1c2VWYWx1ZTogTWFya2Rvd25FZGl0b3J9O1xuZXhwb3J0IGNvbnN0IFRhYmxlU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yVGFibGUnLCB1c2VWYWx1ZTogVGFibGV9O1xuZXhwb3J0IGNvbnN0IFBhc3RlQ2xlYW51cFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWNoVGV4dEVkaXRvclBhc3RlQ2xlYW51cCcsIHVzZVZhbHVlOiBQYXN0ZUNsZWFudXB9O1xuZXhwb3J0IGNvbnN0IFJlc2l6ZVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWNoVGV4dEVkaXRvclJlc2l6ZScsIHVzZVZhbHVlOiBSZXNpemV9O1xuZXhwb3J0IGNvbnN0IEZpbGVNYW5hZ2VyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yRmlsZU1hbmFnZXInLCB1c2VWYWx1ZTogRmlsZU1hbmFnZXJ9O1xuZXhwb3J0IGNvbnN0IEZvcm1hdFBhaW50ZXJTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmljaFRleHRFZGl0b3JGb3JtYXRQYWludGVyJywgdXNlVmFsdWU6IEZvcm1hdFBhaW50ZXJ9O1xuZXhwb3J0IGNvbnN0IEVtb2ppUGlja2VyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yRW1vamlQaWNrZXInLCB1c2VWYWx1ZTogRW1vamlQaWNrZXJ9O1xuZXhwb3J0IGNvbnN0IFNsYXNoTWVudVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWNoVGV4dEVkaXRvclNsYXNoTWVudScsIHVzZVZhbHVlOiBTbGFzaE1lbnV9O1xuZXhwb3J0IGNvbnN0IENvZGVCbG9ja1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWNoVGV4dEVkaXRvckNvZGVCbG9jaycsIHVzZVZhbHVlOiBDb2RlQmxvY2t9O1xuZXhwb3J0IGNvbnN0IENsaXBCb2FyZENsZWFudXBTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmljaFRleHRFZGl0b3JDbGlwQm9hcmRDbGVhbnVwJywgdXNlVmFsdWU6IENsaXBCb2FyZENsZWFudXB9O1xuZXhwb3J0IGNvbnN0IEF1dG9Gb3JtYXRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmljaFRleHRFZGl0b3JBdXRvRm9ybWF0JywgdXNlVmFsdWU6IEF1dG9Gb3JtYXR9O1xuZXhwb3J0IGNvbnN0IEFJQXNzaXN0YW50U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpY2hUZXh0RWRpdG9yQUlBc3Npc3RhbnQnLCB1c2VWYWx1ZTogQUlBc3Npc3RhbnR9O1xuXG4vKipcbiAqIE5nTW9kdWxlIGRlZmluaXRpb24gZm9yIHRoZSBSaWNoVGV4dEVkaXRvciBjb21wb25lbnQgd2l0aCBwcm92aWRlcnMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmljaFRleHRFZGl0b3JNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUmljaFRleHRFZGl0b3JNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczpbXG4gICAgICAgIFRvb2xiYXJTZXJ2aWNlLFxuICAgICAgICBMaW5rU2VydmljZSxcbiAgICAgICAgSW1hZ2VTZXJ2aWNlLFxuICAgICAgICBJbXBvcnRFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBBdWRpb1NlcnZpY2UsXG4gICAgICAgIFZpZGVvU2VydmljZSxcbiAgICAgICAgQ291bnRTZXJ2aWNlLFxuICAgICAgICBRdWlja1Rvb2xiYXJTZXJ2aWNlLFxuICAgICAgICBIdG1sRWRpdG9yU2VydmljZSxcbiAgICAgICAgTWFya2Rvd25FZGl0b3JTZXJ2aWNlLFxuICAgICAgICBUYWJsZVNlcnZpY2UsXG4gICAgICAgIFBhc3RlQ2xlYW51cFNlcnZpY2UsXG4gICAgICAgIFJlc2l6ZVNlcnZpY2UsXG4gICAgICAgIEZpbGVNYW5hZ2VyU2VydmljZSxcbiAgICAgICAgRm9ybWF0UGFpbnRlclNlcnZpY2UsXG4gICAgICAgIEVtb2ppUGlja2VyU2VydmljZSxcbiAgICAgICAgU2xhc2hNZW51U2VydmljZSxcbiAgICAgICAgQ29kZUJsb2NrU2VydmljZSxcbiAgICAgICAgQ2xpcEJvYXJkQ2xlYW51cFNlcnZpY2UsXG4gICAgICAgIEF1dG9Gb3JtYXRTZXJ2aWNlLFxuICAgICAgICBBSUFzc2lzdGFudFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFJpY2hUZXh0RWRpdG9yQWxsTW9kdWxlIHsgfSJdfQ==