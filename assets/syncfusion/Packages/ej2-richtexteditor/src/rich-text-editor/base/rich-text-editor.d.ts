import { Component, ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, L10n } from '@syncfusion/ej2-base';
import { BeforeOpenEventArgs, BeforeCloseEventArgs } from '@syncfusion/ej2-popups';
import { RichTextEditorModel } from './rich-text-editor-model';
import { Render } from '../renderer/render';
import { ViewSource } from '../renderer/view-source';
import { IFormatter, SlashMenuItemSelectArgs, ImageFailedEventArgs, IRenderer, AIAssistantPromptRequestArgs, AIAssistantStopRespondingArgs, BeforePopupOpenCloseEventArgs, AIAssitantToolbarClickEventArgs } from './interface';
import { ToolbarStatusEventArgs } from './interface';
import { ChangeEventArgs, AfterImageDeleteEventArgs, AfterMediaDeleteEventArgs, PasteCleanupArgs } from './interface';
import { ILinkCommandsArgs, ImageDropEventArgs, IImageCommandsArgs, IAudioCommandsArgs, IVideoCommandsArgs, BeforeSanitizeHtmlArgs, ITableCommandsArgs, ExecuteCommandOption, ICodeBlockCommandsArgs, MediaDropEventArgs, ExportingEventArgs } from '../../common/interface';
import { ActionCompleteEventArgs, ActionBeginEventArgs, ClipboardWriteEventArgs, ImageSuccessEventArgs, ResizeArgs, BeforeQuickToolbarOpenArgs, SelectionChangedEventArgs } from '../../common/interface';
import { ServiceLocator } from '../services/service-locator';
import { EditorMode, ShiftEnterKey, EnterKey } from './../../common/types';
import { Toolbar } from '../actions/toolbar';
import { KeyboardEvents } from '../actions/keyboard';
import { FontFamilyModel, FontSizeModel, FontColorModel, FormatModel, BackgroundColorModel, NumberFormatListModel, BulletFormatListModel, CodeBlockSettingsModel, LineHeightModel } from '../../models/models';
import { ToolbarSettingsModel, IFrameSettingsModel, ImageSettingsModel, AudioSettingsModel, VideoSettingsModel, TableSettingsModel, EmojiSettingsModel } from '../../models/models';
import { QuickToolbarSettingsModel, InlineModeModel, PasteCleanupSettingsModel, FormatPainterSettingsModel, ImportWordModel, ExportWordModel, ExportPdfModel } from '../../models/models';
import { AIAssistantSettingsModel, FileManagerSettingsModel } from '../models/models';
import { Link } from '../renderer/link-module';
import { Image } from '../renderer/image-module';
import { Audio } from '../renderer/audio-module';
import { Video } from '../renderer/video-module';
import { Table } from '../renderer/table-module';
import { Count } from '../actions/count';
import { HtmlEditor } from '../actions/html-editor';
import { MarkdownEditor } from '../actions/markdown-editor';
import { BaseToolbar } from '../actions/base-toolbar';
import { QuickToolbar } from '../actions/quick-toolbar';
import { FullScreen } from '../actions/full-screen';
import { PasteCleanup } from '../actions/paste-clean-up';
import { ImportExport } from '../actions/import-export';
import { SelectedEventArgs, RemovingEventArgs, UploadingEventArgs, BeforeUploadEventArgs } from '@syncfusion/ej2-inputs';
import { Resize } from '../actions/resize';
import { FileManager } from '../actions/file-manager';
import { FormatPainter } from '../actions/format-painter';
import { EmojiPicker } from '../actions/emoji-picker';
import { SlashMenuSettingsModel } from '../../models/slash-menu-settings-model';
import { SlashMenu } from '../renderer/slash-menu';
import { CustomUserAgentData } from '../../common/user-agent';
import { CodeBlock } from '../actions/code-block';
import { ClipBoardCleanup } from '../actions/clipboard-cleanup';
import { CommandName, DialogType } from '../../common/enum';
import { AIAssistant } from '../renderer/ai-assistant';
import { PromptModel } from '@syncfusion/ej2-interactive-chat';
import { AutoFormat } from '../actions';
/**
 * Represents the Rich Text Editor component.
 * ```html
 * <textarea id="rte"></textarea>
 * <script>
 *  var rteObj = new RichTextEditor();
 *  rteObj.appendTo("#rte");
 * </script>
 * ```
 */
export declare class RichTextEditor extends Component<HTMLElement> implements INotifyPropertyChanged {
    private placeHolderWrapper;
    /**
     * Provides the Scrollable parent element from the Root element.
     *
     * @hidden
     *
     */
    scrollParentElements: HTMLElement[];
    private cloneValue;
    private onFocusHandler;
    private onBlurHandler;
    private onResizeHandler;
    private onLoadHandler;
    private timeInterval;
    private autoSaveTimeOut;
    private idleInterval;
    private touchModule;
    private defaultResetValue;
    private isResizeInitialized;
    private isValueChangeBlurhandler;
    private displayTempElem;
    private beforeRenderClassValue;
    private mouseDownDebListener;
    private internalID;
    private mutationObserver;
    private hasContentChanged;
    isModalDialog: boolean;
    private isToolbarClipboardAction;
    /**
     * @private
     */
    userAgentData: CustomUserAgentData;
    /**
     * Specifies the root container of the Rich Text Editor component.
     *
     * @hidden
     * @deprecated
     *
     **/
    rootContainer: HTMLElement;
    /**
     * @hidden
     * @deprecated
     */
    currentTarget: HTMLElement;
    /**
     * @hidden
     * @deprecated
     */
    isFocusOut: boolean;
    /**
     * @hidden
     * @deprecated
     */
    inputElement: HTMLElement;
    /**
     * @hidden
     * @deprecated
     */
    isRTE: boolean;
    /**
     * @hidden
     * @deprecated
     */
    isBlur: boolean;
    /**
     * @hidden
     * @deprecated
     */
    renderModule: Render;
    /**
     * @hidden
     * @deprecated
     */
    contentModule: IRenderer;
    /**
     * @hidden
     * @deprecated
     */
    serviceLocator: ServiceLocator;
    /**
     * The `toolbarModule` is used to manipulate ToolBar items and its action in the RichTextEditor.
     *
     * @hidden
     * @deprecated
     */
    toolbarModule: Toolbar;
    /**
     * @hidden
     * @deprecated
     */
    imageModule: Image;
    /**
     * @hidden
     * @deprecated
     */
    audioModule: Audio;
    /**
     * @hidden
     * @deprecated
     */
    videoModule: Video;
    /**
     * @hidden
     * @deprecated
     */
    tableModule: Table;
    /**
     * @hidden
     * @deprecated
     */
    fullScreenModule: FullScreen;
    /**
     * @hidden
     * @deprecated
     */
    resizeModule: Resize;
    /**
     * @hidden
     * @deprecated
     */
    clipBoardCleanupModule: ClipBoardCleanup;
    /**
     * @hidden
     * @deprecated
     */
    pasteCleanupModule: PasteCleanup;
    /**
     * @hidden
     * @deprecated
     */
    codeBlockModule: CodeBlock;
    /**
     * @hidden
     * @deprecated
     */
    autoFormatModule: AutoFormat;
    /**
     * @hidden
     * @deprecated
     */
    importExportModule: ImportExport;
    /**
     * @hidden
     * @deprecated
     */
    sourceCodeModule: ViewSource;
    /**
     * @hidden
     * @deprecated
     */
    linkModule: Link;
    /**
     * @hidden
     * @deprecated
     */
    markdownEditorModule: MarkdownEditor;
    /**
     * @hidden
     * @deprecated
     */
    htmlEditorModule: HtmlEditor;
    /**
     * @hidden
     * @deprecated
     */
    quickToolbarModule: QuickToolbar;
    /**
     * @hidden
     * @deprecated
     */
    countModule: Count;
    /**
     * @hidden
     * @deprecated
     */
    fileManagerModule: FileManager;
    /**
     * @hidden
     * @deprecated
     */
    formatPainterModule: FormatPainter;
    slashMenuModule: SlashMenu;
    aiAssistantModule: AIAssistant;
    /**
     * @hidden
     * @deprecated
     */
    emojiPickerModule: EmojiPicker;
    needsID: boolean;
    /**
     * Specifies the configuration for the toolbar, including the alignment and rendering type.
     * By default, the toolbar floats at the top of the RichTextEditor.
     * When you scroll down, the toolbar will move with the page applying the specified offset.
     *
     * Properties:
     *
     * - enable: A boolean value to show or hide the toolbar.
     *
     * - enableFloating: A boolean value to enable or disable the floating toolbar.
     *   This keeps the toolbar fixed at the top of the RichTextEditor during scrolling.
     *
     * - type: Defines the toolbar type, with the following options:
     *   1. Expand: Overflowing toolbar items are hidden and can be accessed by clicking the expand arrow.
     *   2. MultiRow: Overflowing toolbar items wrap into the next row.
     *   3. Scrollable: Toolbar items are on a single line and can be scrolled horizontally if they overflow.
     *   4. Popup: Overflowing toolbar items wrap into a popup container.
     *
     * - position: Defines the toolbar position, with the following options:
     *   1. Top: Positions the toolbar at the top of the RichTextEditor.
     *   2. Bottom: Positions the toolbar at the bottom of the RichTextEditor.
     *
     * - items: An array specifying the items aligned horizontally in the toolbar.
     * > '|' and '-' can be used to insert vertical and horizontal separator lines in the toolbar.
     *
     * - itemConfigs: Allows the modification of the default toolbar item configuration, such as the icon class.
     *
     * > By default, the toolbar is rendered with a scrollable option on mobile devices and does not support other toolbar types.
     *
     * {% codeBlock src='rich-text-editor/toolbar-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * enable: true,
     * enableFloating: true,
     * position: ToolbarPosition.Top,
     * type: ToolbarType.Expand,
     * items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
     * 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'],
     * itemConfigs: {}
     * }
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Configuration options for the slash menu feature in the Editor, used to display a mention popup.
     * Properties:
     * * enable: A boolean indicating whether the slash menu is enabled in the Editor.
     * * items: An array specifying the list of items to be displayed in the slash menu.
     * * popupWidth: Defines the width of the slash menu popup. Accepts values in pixels, numbers, or percentages. Numeric values are treated as pixels.
     * * popupHeight: Defines the height of the slash menu popup. Accepts values in pixels, numbers, or percentages. Numeric values are treated as pixels.
     *
     * @default
     * {
     * enable: false,
     * items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
     * 'CodeBlock', 'BlockQuote'],
     * popupWidth: '300px',
     * popupHeight: '320px'
     * }
     */
    slashMenuSettings: SlashMenuSettingsModel;
    /**
     * Configures the AI Assistant functionality settings for the Rich Text Editor component.
     *
     * This property allows you to customize various aspects of the AI Assistant feature including:
     * * Predefined AI commands in the dropdown menu
     * * Popup dimensions and appearance
     * * Placeholder text for the AI prompt input
     * * Toolbar configurations for different sections
     * * Custom prompts and suggestions
     * * Banner template customization
     *
     * @default {
     * commands: DEFAULT_AI_COMMANDS,
     * popupWidth: '600px',
     * popupMaxHeight: '400px',
     * placeholder: 'Ask AI to rewrite or generate content.' ,
     * headerToolbarSettings : ['AIcommands', 'Close'],
     * promptToolbarSettings: ['Edit', 'Copy'],
     * responseToolbarSettings: ['Regenerate', 'Copy', '|', 'Insert'],
     * prompts: [],
     * suggestions: [],
     * bannerTemplate: '',
     * maxPromptHistory: 20
     * }
     *
     */
    aiAssistantSettings: AIAssistantSettingsModel;
    /**
     * Specifies the items to be rendered in the quick toolbar based on the target element.
     * Properties:
     * * enable: Boolean to show or hide the quick toolbar.
     * * actionOnScroll: Options for quick toolbar behavior on scroll:
     *   1. hide: The quick toolbar closes when the parent element is scrolled.
     *   2. none: The quick toolbar stays open even if the parent element is scrolled.
     * * link: Specifies items in the quick toolbar for links ('Open', 'Edit', 'UnLink').
     * * image: Specifies items in the quick toolbar for images ('Replace', 'Align', 'Caption', 'WrapText', 'Remove', 'InsertLink', 'Display', 'AltText', 'Dimension').
     * * text: Specifies items in the quick toolbar for text ('Cut', 'Copy', 'Paste').
     * * audio: Specifies items for audio ('AudioReplace', 'AudioRemove', 'AudioLayoutOption').
     * * video: Specifies items for video ('VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension').
     * * enableAppendToBody: Boolean to enable or disable appending the quick toolbar to the body.
     *
     * {% codeBlock src='rich-text-editor/quick-toolbar-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * enable: true,
     * actionOnScroll: 'none',
     * link: ['Open', 'Edit', 'UnLink'],
     * table: ['Tableheader', 'TableRemove', '|', 'TableRows', 'TableColumns', '|' , 'Styles', 'BackgroundColor', 'Alignments', 'TableCellVerticalAlign'],
     * image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'InsertLink', 'OpenImageLink', 'EditImageLink', 'RemoveImageLink', '|', 'Dimension', 'Replace', 'Remove'],
     * audio: ['AudioLayoutOption', 'AudioReplace', 'AudioRemove'],
     * video: ['VideoLayoutOption', 'VideoAlign', '|', 'VideoDimension', 'VideoReplace', 'VideoRemove'],
     * enableAppendToBody: false,
     * }
     */
    quickToolbarSettings: QuickToolbarSettingsModel;
    /**
     * Enables or disables the Clipboard Cleanup feature. When set to `true`, copy and cut operations are intercepted to remove unwanted inline styles.
     *
     * @default true
     */
    enableClipboardCleanup: boolean;
    /**
     * Configures paste options in the Rich Text Editor.
     * Properties:
     * * prompt: Boolean to enable or disable paste prompt.
     * * deniedAttrs: Attributes to restrict during paste.
     * * allowedStyleProps: Style properties allowed when pasting.
     * * deniedTags: Tags to restrict when pasting.
     * * keepFormat: Boolean to keep or remove format when pasting.
     * * plainText: Boolean to paste as plain text.
     *
     * {% codeBlock src='rich-text-editor/paste-cleanup-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * prompt: false,
     * deniedAttrs: null,
     * allowedStyleProps: ['background', 'background-color', 'border', 'border-bottom', 'border-left', 'border-radius',
     * 'border-right', 'border-style', 'border-top', 'border-width', 'clear', 'color', 'cursor',
     * 'direction', 'display', 'float', 'font', 'font-family', 'font-size', 'font-weight', 'font-style',
     * 'height', 'left', 'line-height', 'list-style-type', 'margin', 'margin-top', 'margin-left',
     * 'margin-right', 'margin-bottom', 'max-height', 'max-width', 'min-height', 'min-width',
     * 'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right',
     * 'padding-top', 'position', 'right', 'table-layout', 'text-align', 'text-decoration', 'text-transform', 'text-indent',
     * 'top', 'vertical-align', 'visibility', 'white-space', 'width', 'flex-direction'],
     * deniedTags: null,
     * keepFormat: true,
     * plainText:  false
     * }
     */
    pasteCleanupSettings: PasteCleanupSettingsModel;
    /**
     * Configures the format painter options in the Rich Text Editor.
     * Properties:
     * * allowedFormats: Tags selectors that allow format copying.
     * * deniedFormats: Tag selectors that prevent format copying.
     *
     * {% codeBlock src='rich-text-editor/format-painter-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * allowedFormats: 'b; em; font; sub; sup; kbd; i; s; u; code; strong; span; p; div; h1; h2; h3; h4; h5; h6; blockquote; ol; ul; li; pre;',
     * deniedFormats: null
     * }
     */
    formatPainterSettings: FormatPainterSettingsModel;
    /**
     * Configures emoji picker options in the Rich Text Editor.
     * Properties:
     * * iconsSet: Array representing emoji icons.
     * * showSearchBox: Enables/disables the search box.
     *
     *
     */
    emojiPickerSettings: EmojiSettingsModel;
    /**
     * Configures iframe mode items in the Rich Text Editor.
     * Properties:
     * * enable: Boolean to place editor content in an iframe, isolating it from the page.
     * * attributes: Custom style for displaying content inside the iframe. Applied to iframe body.
     * * resources: Adds styles and scripts to the iframe.
     *   1. styles[]: Array of CSS files for the iframe content.
     *   2. scripts[]: Array of JS script files for the iframe.
     * * metaTags[]: Array of meta tags for iframe's head, setting metadata (http-equiv, charset, etc.).
     * * sandbox: String array defining iframe sandbox attributes, controlling security restrictions. Default includes "allow-same-origin".
     *
     * {% codeBlock src='rich-text-editor/iframe-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * enable: false,
     * attributes: null,
     * resources: { styles: [], scripts: [] },
     * metaTags: [],
     * sandbox: null,
     * }
     */
    iframeSettings: IFrameSettingsModel;
    /**
     * Specifies the options for inserting images in the Rich Text Editor. Includes properties such as:
     * - `allowedTypes`: Specifies the allowed image file extensions as a comma-separated list (e.g., '.jpg', '.png').
     * - `display`: Sets the default display mode for an inserted image, either 'inline' or 'block'.
     * - `width`: Specifies the default width for an inserted image.
     * - `saveFormat`: Indicates the format for storing images in the editor (Base64 or Blob).
     *   > Select Base64 for numerous small images without a specific physical storage location.
     * - `height`: Defines the default height for an inserted image.
     * - `saveUrl`: Specifies the URL for the service that handles image upload and storage on the server.
     * - `path`: Determines the storage location for images and their display path.
     * - `maxFileSize`: Sets the maximum file size allowed for image uploads.
     *
     * {% codeBlock src='rich-text-editor/insert-image-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     *   allowedTypes: ['.jpeg', '.jpg', '.png'],
     *   display: 'inline',
     *   width: 'auto',
     *   height: 'auto',
     *   saveFormat: 'Blob',
     *   saveUrl: null,
     *   path: null,
     *   maxFileSize: 30000000
     * }
     */
    insertImageSettings: ImageSettingsModel;
    /**
     * Configures the options for importing Word files in the Rich Text Editor component.
     * The `serviceUrl` property specifies the server endpoint URL where the uploaded Word file will be processed.
     *
     * @default
     * {
     *   serviceUrl: null
     * }
     */
    importWord: ImportWordModel;
    /**
     * Defines file export options for the Rich Text Editor with properties like:
     * - `serviceurl`: The URL utilized for exporting editor content to Word files.
     * - `fileName`: Designates the default name for exported Word files.
     * - `stylesheet`: Applies a stylesheet to the exported Word file.
     *
     * @default
     * {
     *   serviceUrl: null,
     *   fileName: Sample.docx,
     *   stylesheet: null
     * }
     */
    exportWord: ExportWordModel;
    /**
     * Describes file export options to PDF in the Rich Text Editor, such as:
     * - `serviceurl`: URL used for exporting content to PDF format.
     * - `fileName`: Specifies the default PDF file name upon export.
     * - `stylesheet`: Applies a stylesheet to the exported PDF file.
     *
     * @default
     * {
     *   serviceUrl: null,
     *   fileName: 'Sample.pdf',
     *   stylesheet: null
     * }
     */
    exportPdf: ExportPdfModel;
    /**
     * Defines the options for inserting audio files in the Rich Text Editor, including properties such as:
     * - `allowedTypes`: Specifies the file extensions for audio files allowed to be inserted, listed as a comma-separated string (e.g., '.wav', '.mp3').
     * - `layoutOption`: Sets the default layout for audio files when inserted into the Rich Text Editor. The options are 'Inline' and 'Break'.
     * - `saveFormat`: Determines the format used to store audio files in the Rich Text Editor, either 'Base64' or 'Blob'.
     *   > Choose 'Base64' for frequently inserted small audio files without the need for a specific storage location.
     * - `saveUrl`: Provides the service URL responsible for handling audio file uploads and storage on the server.
     * - `path`: Specifies the storage path for audio files and the reference for displaying them.
     * - `maxFileSize`: Sets the maximum file size allowed for audio file uploads.
     *
     * @default
     * {
     *   allowedTypes: ['.wav', '.mp3', '.m4a', '.wma'],
     *   layoutOption: 'Inline',
     *   saveFormat: 'Blob',
     *   saveUrl: null,
     *   path: null,
     *   maxFileSize: 30000000
     * }
     */
    insertAudioSettings: AudioSettingsModel;
    /**
     * Specifies video insert options in the Rich Text Editor, detailing properties such as:
     * - `allowedTypes`: Allowed video file extensions as a comma-separated list (e.g., '.mp4', '.mov').
     * - `layoutOption`: Determines the display mode for videos ('Inline' or 'Break').
     * - `width`: Sets default width for inserted videos.
     * - `saveFormat`: Format for storing video files (Base64 or Blob).
     *   > Select Base64 for numerous small video inserts without defined storage requirements.
     * - `height`: Sets default height for inserted videos.
     * - `saveUrl`: URL of the service for handling video uploads and server storage.
     * - `path`: Identifies the path for storing and displaying videos.
     * - `maxFileSize`: Maximum file size allowed for video uploads.
     *
     * @default
     * {
     *   allowedTypes: ['.mp4', '.mov', '.wmv', '.avi'],
     *   layoutOption: 'Inline',
     *   width: 'auto',
     *   height: 'auto',
     *   saveFormat: 'Blob',
     *   saveUrl: null,
     *   path: null,
     *   maxFileSize: 30000000
     * }
     */
    insertVideoSettings: VideoSettingsModel;
    /**
     * Specifies the options for inserting tables in the Rich Text Editor, featuring properties like:
     * - `styles`: Automatically appends a CSS class to tables for consistent styling.
     * - `width`: Defines default table width upon insertion.
     * - `minWidth`: Sets the minimum width for inserted tables.
     * - `maxWidth`: Indicates the maximum permissible width for tables.
     * - `resize`: Enables or disables table resizing functionality.
     *
     * {% codeBlock src='rich-text-editor/table-settings/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     *   width: '100%',
     *   styles: [
     *     { text: 'Dashed Borders', class: 'e-dashed-borders', command: 'Table', subCommand: 'Dashed' },
     *     { text: 'Alternate Rows', class: 'e-alternate-rows', command: 'Table', subCommand: 'Alternate' }
     *   ],
     *   resize: true,
     *   minWidth: 0,
     *   maxWidth: null
     * }
     */
    tableSettings: TableSettingsModel;
    /**
     * Keeps the toolbar fixed at the top of the Rich Text Editor during scrolling and specifies the
     * toolbar's offset from the document's top position.
     *
     * @default 0
     */
    floatingToolbarOffset: number;
    /**
     * Configures the inline edit mode for the Rich Text Editor with the following options:
     * - `enable`: A boolean value to enable or disable the inline edit mode.
     * - `onSelection`: Determines how the toolbar is activated:
     *   - If set to `true`, the toolbar appears inline upon text selection.
     *   - If set to `false`, the toolbar opens when clicking on the target element.
     *
     * {% codeBlock src='rich-text-editor/inline-mode/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     *   enable: false,
     *   onSelection: true
     * }
     */
    inlineMode: InlineModeModel;
    /**
     * Defines image manager options in the Rich Text Editor with the following attributes:
     * - `enable`: Boolean to enable or disable the image manager.
     * - `ajaxSettings`: Configures AJAX settings for image handling.
     * - `contextMenuSettings`: Manages context menu availability and options.
     * - `navigationPaneSettings`: Sets up the navigation pane display and contents.
     * - `toolbarSettings`: Specifies toolbar configuration and visible items.
     * - `uploadSettings`: Manages upload-specific configurations.
     *
     * @default
     * {
     *   enable: false,
     *   path: '/',
     *   ajaxSettings: { getImageUrl: null, url: null, uploadUrl: null },
     *   contextMenuSettings: {
     *     visible: true,
     *     file: ['Open', '|', 'Cut', 'Copy', '|', 'Delete', 'Rename', '|', 'Details'],
     *     folder: ['Open', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'Details'],
     *     layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll']
     *   },
     *   navigationPaneSettings: {
     *     visible: true,
     *     items: ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete', 'Download',
     *       'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details']
     *   },
     *   toolbarSettings: { visible: true, items: ['Upload', 'NewFolder'] },
     *   uploadSettings: { autoUpload: true, minFileSize: 0, maxFileSize: 30000000, allowedExtensions: '', autoClose: false }
     * }
     */
    fileManagerSettings: FileManagerSettingsModel;
    /**
     * Specifies the width of the Rich Text Editor.
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Enables or disables the persistence of the component's state between page reloads.
     * If enabled, the value of the Rich Text Editor is retained.
     *
     * {% codeBlock src='rich-text-editor/enable-persistence/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * Configures whether a tooltip should be displayed for the Rich Text Editor toolbar.
     *
     * @default true
     */
    showTooltip: boolean;
    /**
     * Enables or disables the resizing option in the editor.
     * When enabled, the editor can be resized by dragging the resize icon in its bottom right corner.
     *
     * {% codeBlock src='rich-text-editor/enable-resize/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableResize: boolean;
    /**
     * Allows specifying additional HTML attributes like title, name, etc.
     * Accepts multiple attributes in a key-value pair format.
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Specifies the placeholder text for the content area of the RichTextEditor when it is empty.
     *
     * @default null
     */
    placeholder: string;
    /**
     * Enables or disables the auto-save option, which performs the save action during idle states after content changes.
     * If enabled, the editor will save content in idle state based on the `saveInterval` property's value.
     * The change event is triggered if the content has been modified since the last saved state.
     *
     * @default false
     */
    autoSaveOnIdle: boolean;
    /**
     * Disables user interactions on the component when set to true.
     *
     * @default false
     */
    readonly: boolean;
    /**
     * Indicates whether the component is enabled or disabled.
     *
     * {% codeBlock src='rich-text-editor/enabled/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enabled: boolean;
    /**
     * Indicates whether to allow cross-site scripting (XSS) or not.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Determines if source code should be displayed in an encoded format.
     *
     * @default false
     */
    enableHtmlEncode: boolean;
    /**
     * Indicates whether XHTML is enabled or not.
     *
     * @default false
     */
    enableXhtml: boolean;
    /**
     * Enables or disables the Markdown auto-formatting feature.
     * When set to `true`, Markdown syntax typed by the user is automatically
     * converted into the corresponding HTML formatting during keypress.
     *
     * @type {boolean}
     * @default true
     */
    enableMarkdownAutoFormat: boolean;
    /**
     * Specifies the height of the Rich Text Editor component.
     *
     * @default "auto"
     */
    height: string | number;
    /**
     * Specifies the CSS class name appended to the root element of the RichTextEditor.
     * Multiple custom CSS classes can be added.
     *
     * @default null
     */
    cssClass: string;
    /**
     * Specifies the initial content to be displayed in the RichTextEditor's content area. It should be a string.
     * The editor's content can also be dynamically loaded from a database, AJAX, etc.
     *
     * {% codeBlock src='rich-text-editor/value/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    value: string;
    /**
     * Specifies the tag to be inserted when the enter key is pressed.
     *
     * - `P`: Pressing enter inserts a `p` tag. The default value will be `<p><br></p>`.
     * - `DIV`: Inserts a `div` tag instead of the default `P` tag.
     * - `BR`: Inserts a `br` tag instead of the default `P` tag.
     *
     * @default 'P'
     */
    enterKey: EnterKey;
    /**
     * Specifies tags to be inserted when the Shift + Enter keys are pressed.
     *
     * - `BR` - When the Shift + Enter key is pressed, a `br` tag will be inserted, which is the default behavior.
     * - `P` - When the Shift + Enter key is pressed, a `p` tag will be inserted instead of the default `br` tag.
     * - `DIV` - When the Shift + Enter key is pressed, a `div` tag will be inserted instead of the default `br` tag.
     *
     * @default 'BR'
     */
    shiftEnterKey: ShiftEnterKey;
    /**
     * Specifies the number of undo history steps stored in the undo/redo manager.
     *
     * {% codeBlock src='rich-text-editor/undo-redo-steps/index.md' %}{% endcodeBlock %}
     *
     * @default 30
     */
    undoRedoSteps: number;
    /**
     * Specifies the interval time in milliseconds for storing actions in the undo/redo manager.
     * The minimum value is 300 milliseconds.
     *
     * @default 300
     */
    undoRedoTimer: number;
    /**
     * Defines the mode of the RichTextEditor.
     *
     * - `HTML`: Render as an HTML editor using an `<IFRAME>`, content editable `<div>`, or `<textarea>`.
     * - `Markdown`: Render as a Markdown editor using a `<textarea>`.
     *
     * @default 'HTML'
     */
    editorMode: EditorMode;
    /**
     * Customizes key actions in the RichTextEditor.
     * For example, German keyboard users can customize key actions using these shortcuts.
     *
     * {% codeBlock src='rich-text-editor/keyconfig/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    keyConfig: {
        [key: string]: string;
    };
    /**
     * Enables or disables the display of the character counter.
     *
     * {% codeBlock src='rich-text-editor/show-char-count/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    showCharCount: boolean;
    /**
     * Allows the tab key action in the Rich Text Editor content.
     *
     * {% codeBlock src='rich-text-editor/enable-tab-key/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableTabKey: boolean;
    /**
     * Enable `enableAutoUrl` to accept the given URL (relative or absolute) without validating the URL for hyperlinks.
     * Otherwise, the given URL will automatically convert to an absolute path URL by prefixing it with `https://` for hyperlinks.
     *
     * {% codeBlock src='rich-text-editor/enable-autourl/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableAutoUrl: boolean;
    /**
     * Specifies the maximum number of characters allowed in the Rich Text Editor.
     *
     * {% codeBlock src='rich-text-editor/max-length/index.md' %}{% endcodeBlock %}
     *
     * @default -1
     */
    maxLength: number;
    /**
     * Predefines a collection of paragraph styles along with quote and code styles
     * that populate the format dropdown in the toolbar.
     *
     * {% codeBlock src='rich-text-editor/format/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * default: 'Paragraph',
     * width: '65px',
     * types: [
     * { text: 'Paragraph', value: 'P'},
     * { text: 'Heading 1', value: 'H1' },
     * { text: 'Heading 2', value: 'H2' },
     * { text: 'Heading 3', value: 'H3' },
     * { text: 'Heading 4', value: 'H4' },
     * { text: 'Heading 5', value: 'H5' },
     * { text: 'Heading 6', value: 'H6' },
     * { text: 'Preformatted', value: 'Pre' }
     * ]
     * }
     */
    format: FormatModel;
    /**
     * Predefines advanced list types that populate the code block dropdown in the toolbar.
     *
     * {% codeBlock src='rich-text-editor/code-block/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * defaultLanguage: 'plaintext',
     * languages: [
     * { language: 'plaintext', label: 'Plain text' },
     * { language: 'c', label: 'C' },
     * { language: 'csharp', label: 'C#' },
     * { language: 'cpp', label: 'C++' },
     * { language: 'css', label: 'CSS' },
     * { language: 'diff', label: 'Diff' },
     * { language: 'html', label: 'HTML' },
     * { language: 'java', label: 'Java' },
     * { language: 'javascript', label: 'JavaScript' },
     * { language: 'php', label: 'PHP' },
     * { language: 'python', label: 'Python' },
     * { language: 'ruby', label: 'Ruby' },
     * { language: 'sql', label: 'SQL' },
     * { language: 'typescript', label: 'TypeScript' },
     * { language: 'xml', label: 'XML' }
     * ]
     * }
     */
    codeBlockSettings: CodeBlockSettingsModel;
    /**
     * Predefines advanced list types that populate the numberFormatList dropdown in the toolbar.
     *
     *
     * @default
     * {
     * types: [
     * { text: 'None', value: 'none' },
     * { text: 'Number', value: 'decimal' },
     * { text: 'Lower Greek', value: 'lowerGreek' },
     * { text: 'Lower Roman', value: 'lowerRoman' },
     * { text: 'Upper Alpha', value: 'upperAlpha' },
     * { text: 'Lower Alpha', value: 'lowerAlpha' },
     * { text: 'Upper Roman', value: 'upperRoman' }
     * ]
     * }
     */
    numberFormatList: NumberFormatListModel;
    /**
     * Predefines advanced list types that populate the bulletFormatList dropdown in the toolbar.
     *
     * @default
     * {
     * types: [
     * { text: 'None', value: 'none' },
     * { text: 'Disc', value: 'disc' },
     * { text: 'Circle', value: 'circle' },
     * { text: 'Square', value: 'square' }
     * ]
     * }
     */
    bulletFormatList: BulletFormatListModel;
    /**
     * Predefines font families that populate the font family dropdown in the toolbar.
     *
     * {% codeBlock src='rich-text-editor/font-family/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * default: 'Segoe UI',
     * width: '65px',
     * items: [
     * { text: 'Segoe UI', value: 'Segoe UI' },
     * { text: 'Arial', value: 'Arial,Helvetica,sans-serif' },
     * { text: 'Courier New', value: 'Courier New,Courier,monospace' },
     * { text: 'Georgia', value: 'Georgia,serif' },
     * { text: 'Impact', value: 'Impact,Charcoal,sans-serif' },
     * { text: 'Lucida Console', value: 'Lucida Console,Monaco,monospace' },
     * { text: 'Tahoma', value: 'Tahoma,Geneva,sans-serif' },
     * { text: 'Times New Roman', value: 'Times New Roman,Times,serif' },
     * { text: 'Trebuchet MS', value: 'Trebuchet MS,Helvetica,sans-serif' },
     * { text: 'Verdana', value: 'Verdana,Geneva,sans-serif' }
     * ]
     * }
     */
    fontFamily: FontFamilyModel;
    /**
     * Defines the predefined font sizes that populate the font size dropdown in the toolbar.
     *
     * {% codeBlock src='rich-text-editor/font-size/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * default: '10pt',
     * width: '35px',
     * items: [
     * { text: '8', value: '8pt' },
     * { text: '10', value: '10pt' },
     * { text: '12', value: '12pt' },
     * { text: '14', value: '14pt' },
     * { text: '18', value: '18pt' },
     * { text: '24', value: '24pt' },
     * { text: '36', value: '36pt' }
     * ]
     * }
     */
    fontSize: FontSizeModel;
    /**
     * Defines the predefined line heights that populate the Line Height dropdown in the Rich Text Editor toolbar.
     *
     * {% codeBlock src='rich-text-editor/line-height/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * default: '',
     * items: [
     * { text: '1', value: '1' },
     * { text: '1.15', value: '1.15' },
     * { text: '1.5', value: '1.5' },
     * { text: '2', value: '2' },
     * { text: '2.5', value: '2.5' },
     * { text: '3', value: '3' }
     * ],
     * supportAllValues: false
     * }
     */
    lineHeight: LineHeightModel;
    /**
     * Defines the color palette for the font color toolbar command.
     *
     * {% codeBlock src='rich-text-editor/font-color/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * columns: 10,
     * modeSwitcher: false,
     * showRecentColors: true,
     * colorCode: {
     * 'Custom': [
     * '', '#000000', '#e7e6e6', '#44546a', '#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#70ad47', '#ff0000',
     * '#f2f2f2', '#808080', '#cfcdcd', '#d5dce4', '#d9e2f3', '#fbe4d5', '#ededed', '#fff2cc', '#e2efd9', '#ffcccc',
     * '#d9d9d9', '#595959', '#aeaaaa', '#acb9ca', '#b4c6e7', '#f7caac', '#dbdbdb', '#ffe599', '#c5e0b3', '#ff8080',
     * '#bfbfbf', '#404040', '#747070', '#8496b0', '#8eaadb', '#f4b083', '#c9c9c9', '#ffd966', '#a8d08d', '#ff3333',
     * '#a6a6a6', '#262626', '#3b3838', '#323e4f', '#2f5496', '#c45911', '#7b7b7b', '#bf8f00', '#538135', '#b30000',
     * '#7f7f7f', '#0d0d0d', '#161616', '#212934', '#1f3763', '#823b0b', '#525252', '#7f5f00', '#375623', '#660000']
     * }
     * }
     */
    fontColor: FontColorModel;
    /**
     * Defines the color palette for the background color (text highlight color) toolbar command.
     *
     * {% codeBlock src='rich-text-editor/background-color/index.md' %}{% endcodeBlock %}
     *
     * @default
     * {
     * columns: 5,
     * modeSwitcher: false,
     * showRecentColors: true,
     * colorCode: {
     * 'Custom': ['#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#0000ff', '#ff0000',
     * '#000080', '#008080', '#008000', '#800080', '#800000', '#808000',
     * '#c0c0c0', '#000000', '']
     * }
     * }
     */
    backgroundColor: BackgroundColorModel;
    /**
     * Accepts a template design and assigns it as the content of the Rich Text Editor.
     * The built-in template engine provides options to compile a template string into an executable function.
     * For example, it supports expression evaluation similar to ES6 template string literals.
     *
     * {% codeBlock src='rich-text-editor/value-template/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @aspType string
     */
    valueTemplate: string | Function;
    /**
     * Specifies the save interval in milliseconds for automatically saving the content.
     * The change event is triggered if the content changes from the last saved interval.
     *
     * {% codeBlock src='rich-text-editor/save-interval/index.md' %}{% endcodeBlock %}
     *
     * @default 10000
     */
    saveInterval: number;
    /**
     * This event triggers before executing a command via toolbar items.
     * Cancel this event to prevent the command from executing by setting the `cancel` argument to `true`.
     *
     * @event 'actionBegin'
     */
    actionBegin: EmitType<ActionBeginEventArgs>;
    /**
     * This event triggers after executing a command via toolbar items.
     *
     * @event 'actionComplete'
     */
    actionComplete: EmitType<ActionCompleteEventArgs>;
    /**
     * This event triggers before setting copy or cut clipboard data to clipboard.
     *
     * @event 'beforeClipboardWrite'
     */
    beforeClipboardWrite: EmitType<ClipboardWriteEventArgs>;
    /**
     * This event triggers before a dialog is opened.
     * Cancel this event to prevent the dialog from opening by setting the `cancel` argument to `true`.
     *
     * @event 'beforeDialogOpen'
     */
    beforeDialogOpen: EmitType<BeforeOpenEventArgs>;
    /**
     * This event triggers when a dialog is opened.
     *
     * @event 'dialogOpen'
     */
    dialogOpen: EmitType<Object>;
    /**
     * This event triggers before a dialog is closed.
     * Cancel this event to prevent the dialog from closing by setting the `cancel` argument to `true`.
     *
     * @event 'beforeDialogClose'
     */
    beforeDialogClose: EmitType<BeforeCloseEventArgs>;
    /**
     * This event triggers after a dialog has been closed.
     *
     * @event 'dialogClose'
     */
    dialogClose: EmitType<Object>;
    /**
     * This event triggers before the quick toolbar opens.
     *
     * @event 'beforeQuickToolbarOpen'
     */
    beforeQuickToolbarOpen: EmitType<BeforeQuickToolbarOpenArgs>;
    /**
     * This event triggers when the quick toolbar is opened.
     *
     * @event 'quickToolbarOpen'
     */
    quickToolbarOpen: EmitType<Object>;
    /**
     * This event triggers after the quick toolbar has been closed.
     *
     * @event 'quickToolbarClose'
     */
    quickToolbarClose: EmitType<Object>;
    /**
     * This event is deprecated and no longer works. Use the `updatedToolbarStatus` event for undo/redo status.
     *
     * @deprecated
     * @event 'toolbarStatusUpdate'
     */
    toolbarStatusUpdate: EmitType<Object>;
    /**
     * This event triggers when the toolbar items status is updated.
     *
     * @event 'updatedToolbarStatus'
     */
    updatedToolbarStatus: EmitType<ToolbarStatusEventArgs>;
    /**
     * This event triggers when an image is selected or dragged into the insert image dialog.
     *
     * @event 'imageSelected'
     */
    imageSelected: EmitType<SelectedEventArgs>;
    /**
     * This event triggers before the image upload process starts.
     *
     * @event 'beforeImageUpload'
     */
    beforeImageUpload: EmitType<BeforeUploadEventArgs>;
    /**
     * This event triggers when an image upload begins in the insert image dialog.
     * It provides access to the upload details through the event arguments.
     *
     * @event 'imageUploading'
     */
    imageUploading: EmitType<UploadingEventArgs>;
    /**
     * This event triggers when an image has been successfully uploaded to the server side.
     *
     * @event 'imageUploadSuccess'
     */
    imageUploadSuccess: EmitType<ImageSuccessEventArgs>;
    /**
     * This event triggers when there is an error during image upload.
     *
     * @event 'imageUploadFailed'
     */
    imageUploadFailed: EmitType<ImageFailedEventArgs>;
    /**
     * This event triggers when a selected image is removed from the insert image dialog.
     *
     * @event 'imageRemoving'
     */
    imageRemoving: EmitType<RemovingEventArgs>;
    /**
     * This event triggers when a selected image is removed from the Rich Text Editor content.
     *
     * @event 'afterImageDelete'
     */
    afterImageDelete: EmitType<AfterImageDeleteEventArgs>;
    /**
     * This event triggers when media is selected or dragged into the insert media audio/video dialog.
     *
     * @event 'fileSelected'
     */
    fileSelected: EmitType<SelectedEventArgs>;
    /**
     * This event triggers before the media audio/video upload process starts.
     *
     * @event 'beforeFileUpload'
     */
    beforeFileUpload: EmitType<BeforeUploadEventArgs>;
    /**
     * This event triggers when media begins uploading in the insert media audio/video dialog.
     *
     * @event 'fileUploading'
     */
    fileUploading: EmitType<UploadingEventArgs>;
    /**
     * This event triggers when media has been successfully uploaded to the server side.
     *
     * @event 'fileUploadSuccess'
     */
    fileUploadSuccess: EmitType<Object>;
    /**
     * This event triggers when there is an error during media upload.
     *
     * @event 'fileUploadFailed'
     */
    fileUploadFailed: EmitType<Object>;
    /**
     * This event triggers when selected media is removed from the insert audio/video dialog.
     *
     * @event 'fileRemoving'
     */
    fileRemoving: EmitType<RemovingEventArgs>;
    /**
     * This event triggers when selected media is removed from the Rich Text Editor content.
     *
     * @event 'afterMediaDelete'
     */
    afterMediaDelete: EmitType<AfterMediaDeleteEventArgs>;
    /**
     * This event triggers when the Rich Text Editor is rendered.
     *
     * @event 'created'
     */
    created: EmitType<Object>;
    /**
     * This event triggers when the Rich Text Editor is destroyed.
     *
     * @event 'destroyed'
     */
    destroyed: EmitType<Object>;
    /**
     * This event triggers before sanitizing the value. Applicable only when `editorMode` is `HTML`.
     *
     * @event 'beforeSanitizeHtml'
     */
    beforeSanitizeHtml: EmitType<BeforeSanitizeHtmlArgs>;
    /**
     * This event triggers when the Rich Text Editor loses focus.
     *
     * @event 'blur'
     */
    blur: EmitType<Object>;
    /**
     * This event triggers when a Rich Text Editor toolbar item is clicked.
     *
     * @event 'toolbarClick'
     */
    toolbarClick: EmitType<Object>;
    /**
     * This event triggers when the Rich Text Editor gains focus.
     *
     * @event 'focus'
     */
    focus: EmitType<Object>;
    /**
     * This event triggers when the Rich Text Editor loses focus and changes have been made to the content.
     *
     * @event 'change'
     */
    change: EmitType<ChangeEventArgs>;
    /**
     * This event triggers when resizing elements such as tables, images, videos, and the overall Rich Text Editor.
     *
     * @event 'resizing'
     */
    resizing: EmitType<ResizeArgs>;
    /**
     * This event triggers when resizing starts for various elements including tables, images, videos, and the overall editor.
     *
     * @event 'resizeStart'
     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * This event triggers when resizing stops for various elements including tables, images, videos, and the overall editor.
     *
     * @event 'resizeStop'
     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * This event triggers before cleaning up copied content.
     *
     * @event 'beforePasteCleanup'
     */
    beforePasteCleanup: EmitType<PasteCleanupArgs>;
    /**
     * This event triggers after cleaning up copied content.
     *
     * @event 'afterPasteCleanup'
     */
    afterPasteCleanup: EmitType<object>;
    /**
     * This event triggers before an image is dropped.
     *
     * @event 'beforeImageDrop'
     */
    beforeImageDrop: EmitType<ImageDropEventArgs>;
    /**
     * This event triggers before a media is dropped.
     *
     * @event 'beforeMediaDrop'
     */
    beforeMediaDrop: EmitType<MediaDropEventArgs>;
    /**
     * Customize the `keyCode` to change the key value.
     *
     * {% codeBlock src='rich-text-editor/formatter/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    formatter: IFormatter;
    /**
     * This event triggers when a slash menu item in the popup is selected by the user using mouse, tap, or keyboard navigation.
     *
     * @event 'slashMenuItemSelect'
     */
    slashMenuItemSelect: EmitType<SlashMenuItemSelectArgs>;
    /**
     * This event triggers when a non-empty text selection is made or updated in the Rich Text Editor.
     * Fires in both HTML and Markdown modes, providing detailed information about the current selection.
     *
     * {% codeBlock src='rich-text-editor/selectionChanged/index.md' %}{% endcodeBlock %}
     *
     * @event 'selectionChanged'
     */
    selectionChanged: EmitType<SelectionChangedEventArgs>;
    /**
     * Triggers when a user selects an item from the AI Assistant toolbar using mouse, touch, or keyboard navigation.
     * Use this event to handle custom toolbar item click action.
     *
     *
     * @event 'aiAssistantToolbarClick'
     * @type {EmitType<AIAssitantToolbarClickEventArgs>}
     *
     */
    aiAssistantToolbarClick: EmitType<AIAssitantToolbarClickEventArgs>;
    /**
     * Triggers when a user sends a prompt to the AI Assistant using the slash menu item in the popup.
     * Use this event to handle the request with your preferred AI Provider.
     *
     *
     * @event aiAssistantPromptRequest
     * @type {EmitType<AIAssistantPromptRequestArgs>}
     *
     */
    aiAssistantPromptRequest: EmitType<AIAssistantPromptRequestArgs>;
    /**
     * Triggers when the user clicks the stop responding button in the AI Assistant.
     * This event helps to cancel the ongoing AI Query request when the stopResponding button is clicked.
     *
     *
     * @event aiAssistantStopRespondingClick
     * @type {EmitType<AIAssistantStopRespondingArgs>}
     */
    aiAssistantStopRespondingClick: EmitType<AIAssistantStopRespondingArgs>;
    /**
     * Triggers before a popup is about to open in the editor.
     * This event occurs when any popup is about to be displayed in the editor.
     * It can be used to manipulate the popup content by adding additional elements or custom logics.
     * The event can be canceled by setting `args.cancel` to `true` to prevent the popup from opening.
     *
     * @event beforePopupOpen
     * @type {EmitType<BeforePopupOpenCloseEventArgs>}
     */
    beforePopupOpen: EmitType<BeforePopupOpenCloseEventArgs>;
    /**
     * Triggers before a popup is about to close in the editor.
     * Can be canceled by setting `args.cancel` to `true`.
     * This event is useful for cleaning up custom elements which were added to the popup element.
     *
     * @event beforePopupClose
     * @type {EmitType<BeforePopupOpenCloseEventArgs>}
     */
    beforePopupClose: EmitType<BeforePopupOpenCloseEventArgs>;
    /**
     * This event triggers when a Word document `import` is initiated by the editor, letting you customize the outgoing HTTP request before it is sent.
     *
     * @event 'wordImporting'
     */
    wordImporting: EmitType<UploadingEventArgs>;
    /**
     * This event triggers just before PDF or Word export requests are dispatched by the editor, allowing user to customize the outgoing request.
     *
     * @event 'documentExporting'
     */
    documentExporting: EmitType<ExportingEventArgs>;
    keyboardModule: KeyboardEvents;
    localeObj: L10n;
    valueContainer: HTMLTextAreaElement;
    private originalElement;
    private clickPoints;
    private initialValue;
    private isCopyAll;
    private isPlainPaste;
    private isSelecting;
    private isSelectionStartInRTE;
    private selectionTimeout;
    private previousRange;
    isRTEFocused: boolean;
    isSelectAll: boolean;
    constructor(options?: RichTextEditorModel, element?: string | HTMLElement);
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - specifies the declaration.
     * @hidden
     * @deprecated
     */
    requiredModules(): ModuleDeclaration[];
    private updateEnable;
    /**
     * setEnable method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    setEnable(): void;
    private initializeValue;
    /**
     * For internal use only - Initialize the event handler;
     *
     * @returns {void}
     * @hidden
     * @private
     */
    protected preRender(): void;
    private persistData;
    private setContainer;
    /**
     * getPersistData method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getPersistData(): string;
    /**
     * Focuses the Rich Text Editor component.
     *
     * @returns {void}
     * @public
     */
    focusIn(): void;
    /**
     * Blurs the Rich Text Editor component, removing focus.
     *
     * @returns {void}
     * @public
     */
    focusOut(): void;
    /**
     * Selects all content within the RichTextEditor.
     *
     * @returns {void}
     * @public
     */
    selectAll(): void;
    /**
     * Selects a specific content range or element.
     *
     * @param {Range} range - Specify the range you want to select within the content.
     * This method is used to select a particular sentence, word, or the entire document.
     *
     * @returns {void}
     * @public
     */
    selectRange(range: Range): void;
    /**
     * Retrieves the HTML markup from the currently selected content in RichTextEditor.
     *
     * @returns {string} - Returns the HTML string of selected content.
     * @public
     */
    getSelection(): string;
    /**
     * Displays the emoji picker. If coordinates are provided, it positions the picker at those locations.
     *
     * @param {number} x - The x-axis position for the emoji picker.
     * @param {number} y - The y-axis position for the emoji picker.
     * @returns {void}
     * @public
     */
    showEmojiPicker(x?: number, y?: number): void;
    /**
     * Executes a specified command within the rich text editor, optionally utilizing additional parameters to tailor execution.
     *
     * @returns {void}
     * @param {CommandName} commandName - The name of the command to be executed, such as 'importWord', 'insertHTML', and others.
     * @param {string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs | ITableCommandsArgs | FormatPainterSettingsModel | IAudioCommandsArgs | IVideoCommandsArgs} value
     * - An optional parameter that supplies the necessary value relevant to the command. This could be a string, an HTMLElement, or specific argument types like ILinkCommandsArgs, etc., contingent on the command requirements.
     * @param {ExecuteCommandOption} option - Specifies additional options for executing the command, such as enabling features like undo functionality.
     * @public
     */
    executeCommand(commandName: CommandName, value?: string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs | ITableCommandsArgs | FormatPainterSettingsModel | IAudioCommandsArgs | IVideoCommandsArgs | ICodeBlockCommandsArgs, option?: ExecuteCommandOption): void;
    private htmlPurifier;
    private isMediaUploading;
    private encode;
    /**
     * For internal use only - To Initialize the component rendering.
     *
     * @returns {void}
     * @private
     * @deprecated
     */
    protected render(): void;
    /**
     * addAudioVideoWrapper method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    addAudioVideoWrapper(): void;
    /**
     * For internal use only - Initialize the event handler
     *
     * @returns {void}
     * @private
     * @deprecated
     * @hidden
     */
    protected eventInitializer(): void;
    cleanList(e: KeyboardEvent): void;
    private isFullSelection;
    private resetPreviousKey;
    /**
     * For internal use only - keydown the event handler;
     *
     * @param {KeyboardEvent} e - specifies the event.
     * @returns {void}
     * @private
     * @deprecated
     * @hidden
     */
    keyDown(e: KeyboardEvent): void;
    private handleMediaTabKey;
    private isMediaElementSelected;
    private clearSelectionTimeout;
    private triggerSelectionChanged;
    private keyUp;
    /**
     * @param {string} value - specifies the value.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    serializeValue(value: string): string;
    /**
     * Sanitizes an HTML string to prevent cross-site scripting (XSS) attacks.
     * This method is applicable when the editor mode is specifically set to `HTML`.
     *
     * @param {string} value - The HTML content to be sanitized for security purposes.
     * @returns {string} - The HTML content after being sanitized.
     */
    sanitizeHtml(value: string): string;
    /**
     * updateValue method
     *
     * @param {string} value - specifies the string value.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    updateValue(value?: string): void;
    private triggerEditArea;
    private focusHR;
    private notifyMouseUp;
    private updateUndoRedoStack;
    private mouseUp;
    /**
     * @param {Function} module - specifies the module function.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ensureModuleInjected(module: Function): boolean;
    /**
     * Handles clipboard events to prevent default browser behavior for cut and copy operations
     *
     * @param {ClipboardEvent} e - The clipboard event object
     * @returns {void}
     * @hidden
     * @deprecated
     */
    clipBoardHandler(e: ClipboardEvent | KeyboardEvent): void;
    /**
     * @param {MouseEvent | KeyboardEvent | ClipboardEvent} e - specifies the event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    onCopy(e?: MouseEvent | KeyboardEvent | ClipboardEvent): void;
    /**
     * @param {MouseEvent | KeyboardEvent | ClipboardEvent} e - specifies the event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    onCut(e?: MouseEvent | KeyboardEvent | ClipboardEvent): void;
    /**
     * @param {KeyboardEvent} e - specifies the keyboard event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    onPaste(e?: ClipboardEvent): void;
    /**
     * @param {string} action - specifies the string value.
     * @param {MouseEvent} event - specifies the event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    clipboardAction(action: string, event: MouseEvent | KeyboardEvent | ClipboardEvent): void;
    /**
     * Destroys the component by detaching or removing all event handlers,
     * attributes, and CSS classes. It also clears the component's element content.
     *
     * @returns {void}
     */
    destroy(): void;
    private handleTableCellCopy;
    private removeHtmlAttributes;
    private removeAttributes;
    private destroyDependentModules;
    /**
     * Retrieves the HTML or text content inside the RichTextEditor.
     *
     * @returns {Element} - The element containing the content.
     */
    getContent(): Element;
    /**
     * Retrieves the text content as a string.
     *
     * @returns {string} - The plain text content.
     */
    getText(): string;
    /**
     * Retrieves the HTML representation of the selected content as a string.
     *
     * @returns {string} - The HTML content of the selected area.
     */
    getSelectedHtml(): string;
    private extractContentFromSelection;
    private getHTMLFromSelectionRange;
    private normalizeInlineElementWrapping;
    private getWrappedAroundInlineElement;
    /**
     * Displays the inline quick toolbar.
     *
     * @returns {void}
     */
    showInlineToolbar(): void;
    /**
     * Hides the inline quick toolbar.
     *
     * @returns {void}
     */
    hideInlineToolbar(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @private
     * @deprecated
     */
    protected getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} newProp - specifies the the property.
     * @param {RichTextEditorModel} oldProp - specifies the old property.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    onPropertyChanged(newProp: RichTextEditorModel, oldProp: RichTextEditorModel): void;
    /**
     * @hidden
     * @returns {void}
     * @deprecated
     */
    updateValueData(): void;
    private removeSheets;
    private closeAllDialogsAndQuickToolbars;
    private toggleOverlay;
    /**
     * Syncs the toolbar and related UI with the editor's read-only state.
     * - In read-only: hides dialogs/popups/quick toolbars, removes focus/resize UI, overlays/disable toolbar controls.
     * - In editable: re-enables items and removes overlays, restoring scroll/nav controls as needed.
     */
    private updateUIForReadOnlyState;
    private replaceEntities;
    private updatePanelValue;
    private listOrderCorrection;
    private setHeight;
    /**
     * setPlaceHolder method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    setPlaceHolder(): void;
    private setWidth;
    private setCssClass;
    private updateRTL;
    private updateReadOnly;
    /**
     * setReadOnly method
     *
     * @param {boolean} initial - specifies the boolean value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    setReadOnly(initial?: boolean): void;
    /**
     * Prints all the pages of the RichTextEditor by default.
     *
     * @returns {void}
     */
    print(): void;
    /**
     * Refreshes the view of the editor.
     *
     * @returns {void}
     * @public
     */
    refreshUI(): void;
    /**
     * Displays the Rich Text Editor component in full-screen mode.
     *
     * @returns {void}
     */
    showFullScreen(): void;
    /**
     * Enables the specified toolbar items in the Rich Text Editor component.
     *
     * @param {string | string[]} items - A single item or a collection of items to be enabled in the toolbar.
     * @param {boolean} muteToolbarUpdate - Determines whether to mute updates of the toolbar item status in the Rich Text Editor.
     * @returns {void}
     * @public
     */
    enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    /**
     * Disables the specified toolbar items in the Rich Text Editor component.
     *
     * @param {string | string[]} items - A single item or a collection of items to be disabled in the toolbar.
     * @param {boolean} muteToolbarUpdate - Determines whether to mute updates of the toolbar item status in the Rich Text Editor.
     * @returns {void}
     * @public
     */
    disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    /**
     * Removes the specified toolbar items from the Rich Text Editor component.
     *
     * @param {string | string[]} items - A single item or a collection of items to be removed from the toolbar.
     * @returns {void}
     * @public
     */
    removeToolbarItem(items: string | string[]): void;
    /**
     * Get the selected range from the RichTextEditor's content.
     *
     * @returns {void}
     * @public
     * @deprecated
     */
    getRange(): Range;
    private initializeServices;
    private RTERender;
    private setIsModalDialogValue;
    private setIframeSettings;
    private InjectSheet;
    private createScriptElement;
    private createStyleElement;
    private setValue;
    renderTemplates(callBack: any): void;
    private updateResizeFlag;
    /**
     * Image max width calculation method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getInsertImgMaxWidth(): string | number;
    /**
     * Video max width calculation method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getInsertVidMaxWidth(): string | number;
    /**
     * Retrieves the HTML content from the Rich Text Editor.
     *
     * @returns {string} - The HTML content as a string. If XHTML is enabled, `null` is returned for empty content.
     * @public
     */
    getHtml(): string;
    /**
     * Retrieves XHTML validated HTML content from the Rich Text Editor
     * when the `enableXhtml` property is set to true.
     *
     * @returns {string} - The XHTML validated HTML content as a string.
     * @public
     */
    getXhtml(): string;
    /**
     * Toggles the display of the HTML/Markdown source code within the editor.
     *
     * @returns {void}
     * @public
     */
    showSourceCode(): void;
    /**
     * Calculates the maximum number of characters currently in the Rich Text Editor.
     *
     * @returns {number} - The total number of characters.
     * @public
     */
    getCharCount(): number;
    /**
     * Displays a specified dialog within the Rich Text Editor.
     *
     * @param {DialogType} type - The type of dialog to display.
     * @returns {void}
     * @public
     */
    showDialog(type: DialogType): void;
    /**
     * Closes a specified dialog within the Rich Text Editor.
     *
     * @param {DialogType} type - The type of dialog to close.
     * @returns {void}
     * @public
     */
    closeDialog(type: DialogType): void;
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getBaseToolbarObject(): BaseToolbar;
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getToolbar(): HTMLElement;
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getToolbarElement(): Element;
    /**
     * @returns {void}
     * getID method
     *
     * @hidden
     * @deprecated
     */
    getID(): string;
    /**
     * Returns the CSS class.
     *
     * @param {boolean} [isSpace] - Specifies whether to include a space before the CSS class.
     * @returns {string} The CSS class.
     * @hidden
     * @deprecated
     */
    getCssClass(isSpace?: boolean): string;
    private mouseDownHandler;
    private preventImgResize;
    /**
     * preventDefaultResize method
     *
     * @param {FocusEvent} e - specifies the event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    preventDefaultResize(e: FocusEvent | MouseEvent): void;
    private defaultResize;
    private resizeHandler;
    private scrollHandler;
    private contentScrollHandler;
    private focusHandler;
    private getUpdatedValue;
    private updateValueOnIdle;
    private updateIntervalValue;
    private cleanupResizeElements;
    addAnchorAriaLabel(value: string): string;
    private updateStatus;
    private onDocumentClick;
    private handleChecklistDocumentClick;
    private createToolbarCommand;
    private handleChecklistClick;
    private blurHandler;
    /**
     * invokeChangeEvent method
     *
     * @returns {void}
     * @param {CustomEvent} args - The arguments associated with the content change event.
     * @hidden
     * @deprecated
     */
    private contentChanged;
    /**
     * invokeChangeEvent method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    invokeChangeEvent(): void;
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    wireScrollElementsEvents(): void;
    private wireContextEvent;
    private unWireContextEvent;
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    unWireScrollElementsEvents(): void;
    private touchHandler;
    private contextHandler;
    private resetHandler;
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    autoResize(): void;
    private setAutoHeight;
    private checkContentChanged;
    private wireEvents;
    private restrict;
    private beforeInputHandler;
    private isSpecialInputType;
    private dragEnterHandler;
    private dragOverHandler;
    private dropHandler;
    private bindEvents;
    private onIframeMouseDown;
    private inputHandler;
    private editorKeyDown;
    private unWireEvents;
    private unbindEvents;
    /**
     *
     * @param {FocusEvent} e - The focus event.
     * @returns {string} Returns the current focus either `editArea` or `toolbar` or `textArea` or `sourceCode` or `outside` of the RichTextEditor.
     * @hidden
     */
    private getCurrentFocus;
    /**
     * @returns {void}
     * @hidden
     */
    private resetToolbarTabIndex;
    private getRenderedQuickToolbarElem;
    private iframeLoadHandler;
    private iframeEditableElemLoad;
    /**
     * Clears the undo and redo stacks and resets the undo and redo toolbar status to disable the buttons.
     *
     * @returns {void}
     * @public
     */
    clearUndoRedo(): void;
    private removeHrFocus;
    /**
     * Utility to check if selection is within RTE
     *
     * @private
     * @returns {boolean} `true` if the selection is within the RTE; otherwise, `false`.
     */
    isSelectionInRTE(): boolean;
    private selectionChangeHandler;
    private isMouseUpOutOfRTE;
    private mouseUpHandlerForSelection;
    private endSelection;
    private isSelectionCollapsed;
    private handleSelectionChange;
    /**
     * Utility to check if all then contents are selected within RTE
     *
     * @private
     * @hidden
     * @returns {boolean} `true` if the selection is within the RTE; otherwise, `false`.
     */
    isEntireRTEContentSelected(): boolean;
    /**
     * Returns the collection of the Prompt and response data of the AI Assistant.
     *
     * This can be used to retrieve the conversation history between the user and the AI Assistant.
     *
     * @returns {PromptModel[]} An array of PromptModel objects containing the prompt and response history.
     * @public
     *
     * @example
     * // Get the complete history of prompts and responses
     * const promptHistory = editor.getAIPromptHistory();
     *
     * // Display the last conversation
     * if (promptHistory.length > 0) {
     *   const lastConversation = promptHistory[promptHistory.length - 1];
     *   console.log("Last prompt:", lastConversation.prompt);
     *   console.log("Last response:", lastConversation.response);
     * }
     */
    getAIPromptHistory(): PromptModel[];
    /**
     * Executes the specified prompt in the AI Assistant.
     *
     * This method sends the provided text as a prompt to the AI Assistant for processing and response.
     *
     * @param {string} prompt - The prompt text to be executed. It must be a non-empty string.
     *
     * @returns {void}
     * @public
     *
     * @example
     * // Execute a simple prompt
     * editor.executeAIPrompt("Review the selected text");
     *
     */
    executeAIPrompt(prompt: string): void;
    /**
     * Adds a response to the last prompt or appends a new prompt data in the AI Assistant.
     *
     * > The `outputResponse` text should be in `.md` format and will be converted to `.html`.
     *
     * @param {string | Object} outputResponse - The response to be added. Can be:
     *  - A string representing the response text to be added to the last prompt
     *  - An object containing both prompt and response data to be appended or updated
     *
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, which will hide the stop response button.
     *                                  Set to true when the complete response has been received.
     *
     * @returns {void}
     * @public
     *
     * @example
     * // Add a simple text response to the last prompt
     * editor.addAIPromptResponse("This is the AI response");
     *
     * // Add a final response (will hide the stop button)
     * editor.addAIPromptResponse("Here is the complete answer", true);
     *
     * // Add a new prompt and response together
     * editor.addAIPromptResponse({
     *   prompt: "How do I format a table?",
     *   response: "To format a table, follow these steps..."
     * });
     */
    addAIPromptResponse(outputResponse: string | Object, isFinalUpdate?: boolean): void;
    /**
     * Shows the AI Assistant Query Popup.
     *
     * This method displays the popup interface for interacting with the AI Assistant,
     * allowing users to enter prompts and view responses.
     *
     * @returns {void}
     * @public
     *
     * @example
     * // Display the AI Assistant popup
     * editor.showAIAssistantPopup();
     *
     * // Create a button that shows the AI Assistant popup
     * document.getElementById('aiButton').addEventListener('click', () => {
     *   editor.showAIAssistantPopup();
     * });
     */
    showAIAssistantPopup(): void;
    /**
     * Hides the AI Assistant Query Popup.
     *
     * This method programmatically closes the AI Assistant popup interface. Useful when
     * handling custom actions via Editor toolbar buttons or when the interaction is complete.
     *
     * @returns {void}
     * @public
     *
     * @example
     * // Close the AI Assistant popup after processing a request
     * editor.executePrompt("Format this paragraph");
     * editor.hideAIAssistantPopup();
     *
     * // Create a custom close button
     * document.getElementById('closeAiButton').addEventListener('click', () => {
     *   editor.hideAIAssistantPopup();
     * });
     */
    hideAIAssistantPopup(): void;
    /**
     * Clears all prompt and response data from the AI Assistant's history stack.
     *
     * This method removes the entire conversation history between the user and the AI Assistant,
     * resetting all stored prompts and responses.
     *
     * @returns {void} No return value.
     * @public
     *
     * @example
     * // Retrieve the current history before clearing
     * const promptHistory = editor.getAIPromptHistory();
     *
     * // Post the history to a database and then clear it
     * editor.clearAIPromptHistory();
     */
    clearAIPromptHistory(): void;
}
