import { Component, INotifyPropertyChanged, EmitType, L10n } from '@syncfusion/ej2-base';
import { UserModel, CommandMenuSettingsModel, InlineToolbarSettingsModel, PasteCleanupSettingsModel, BlockActionMenuSettingsModel, ContextMenuSettingsModel, LabelSettingsModel, ImageBlockSettingsModel, CodeBlockSettingsModel, TransformSettingsModel } from '../../models/index';
import { BlockEditorModel } from './blockeditor-model';
import { BlockModel } from '../../models/block/block-model';
import { FocusEventArgs, BlurEventArgs, SelectionChangedEventArgs, BlockDragEventArgs, BlockDropEventArgs, BeforePasteCleanupEventArgs, AfterPasteCleanupEventArgs, BlockChangedEventArgs, FileUploadSuccessEventArgs } from '../../models/eventargs';
import { CommandName } from '../../models/enums';
import { MentionRenderer, MenuBarRenderer, TooltipRenderer, DialogRenderer, FloatingIconRenderer, DropDownListRenderer, TabRenderer, UploaderRenderer, ProgressBarRenderer, ImageUploaderRenderer } from '../renderer/index';
import { EventManager, Intermediate } from '../managers/index';
import { InlineContentInsertionModule, SlashCommandModule, ContextMenuModule, BlockActionMenuModule, InlineToolbarModule, LinkModule } from '../renderer/index';
import { BlockManager } from '../../block-manager/base/block-manager';
import { FontColorSettingsModel, BackgroundColorSettingsModel } from '../../models/common/index';
import { BeforeUploadEventArgs, FailureEventArgs, UploadingEventArgs } from '@syncfusion/ej2-inputs';
/**
 * Represents the root class for the Block Editor component.
 * The BlockEditor is a block based editor that provides functionality for creating, editing, and managing blocks of content.
 * Blocks can include paragraph, lists, toggles, and other block types, organized hierarchically.
 *
 **/
export declare class BlockEditor extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Specifies the height of the editor.
     * This property sets the height of the editor, which can be a string or number.
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * Specifies the width of the editor.
     * This property sets the width of the editor, which can be a string or number.
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Specifies a custom CSS class to apply to the editor.
     * This property allows for additional styling by applying a custom CSS class.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the locale for localization.
     * This property sets the language and regional settings for the editor.
     * The default locale value is 'en-US'.
     *
     * @default 'en-US'
     */
    locale: string;
    /**
     * Specifies custom keyboard shortcuts configuration.
     * This property allows the definition of custom keyboard shortcuts for editor commands.
     *
     * {% codeBlock src='blockeditor/keyconfig/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    keyConfig: {
        [key: string]: string;
    };
    /**
     * Specifies the maximum size of the undo/redo stack.
     * This property determines how many actions are stored for undo and redo functionality.
     * With a default value of 30, it allows users to revert up to 30 operations.
     *
     * {% codeBlock src='blockeditor/undo-redo-stack/index.md' %}{% endcodeBlock %}
     *
     * @default 30
     */
    undoRedoStack: number;
    /**
     * Specifies whether the editor is in read-only mode.
     * This property prevents users from editing the content when set to true.
     *
     * {% codeBlock src='blockeditor/readonly/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    readOnly: boolean;
    /**
     * Specifies whether HTML encoding is enabled.
     * This property determines if the content will be encoded to escape special HTML characters.
     *
     * @default false
     */
    enableHtmlEncode: boolean;
    /**
     * Specifies whether the HTML sanitizer is enabled.
     * This property determines if the HTML content will be sanitized to remove potentially harmful tags and attributes.
     *
     * {% codeBlock src='blockeditor/enable-htmlsanitizer/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Specifies whether drag and drop functionality is enabled for the blocks.
     * This property enables or disables drag-and-drop operations within the block editor.
     *
     * {% codeBlock src='blockeditor/enable-drag-drop/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableDragAndDrop: boolean;
    /**
     * Specifies an array of block models representing the content of the editor.
     * This property holds the various blocks that make up the editor's content.
     *
     * {% codeBlock src='blockeditor/blocks/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    blocks: BlockModel[];
    /**
     * Specifies an array of user models representing the list of users.
     * This property holds user details such as name, ID, and other properties.
     *
     * {% codeBlock src='blockeditor/users/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    users: UserModel[];
    /**
     * Specifies configuration options for editor commands.
     * This property allows customization of command behaviors within the editor.
     *
     * {% codeBlock src='blockeditor/command-menu/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    commandMenuSettings: CommandMenuSettingsModel;
    /**
     * Specifies settings for the formatting toolbar.
     * This property configures the toolbar that provides text formatting options.
     *
     * {% codeBlock src='blockeditor/inline-toolbar/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    inlineToolbarSettings: InlineToolbarSettingsModel;
    /**
     * Specifies the configuration object for available block transformations in the inline toolbar.
     * This property allows customization of the transform menu items including text, icons, and behavior configuration.
     *
     * {% codeBlock src='blockeditor/transform/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    transformSettings: TransformSettingsModel;
    /**
     * Specifies the configuration settings for the block actions menu.
     * This property allows customization of the actions menu within the editor.
     *
     * {% codeBlock src='blockeditor/block-action-menu/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    blockActionMenuSettings: BlockActionMenuSettingsModel;
    /**
     * Specifies settings for the context menu.
     * This property configures the context menu options that appear on right-click actions.
     *
     * {% codeBlock src='blockeditor/context-menu/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * Configures settings related to pasting content in the editor.
     * This property utilizes the PasteCleanupSettingsModel to specify various options and behaviors for paste operations.
     *
     * {% codeBlock src='blockeditor/paste-settings/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    pasteCleanupSettings: PasteCleanupSettingsModel;
    /**
     * Configures settings related to label popup in the editor.
     * This property utilizes the LabelSettingsModel to specify various options and behaviors for paste operations.
     *
     * {% codeBlock src='blockeditor/label-settings/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    labelSettings: LabelSettingsModel;
    /**
     * Configures settings related to image block in the editor.
     * This property utilizes the ImageBlockSettingsModel to specify various options for image block settings.
     *
     * {% codeBlock src='blockeditor/image-settings/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    imageBlockSettings: ImageBlockSettingsModel;
    /**
     * Configures settings related to code block in the editor.
     * This property utilizes the CodeBlockSettingsModel to specify various options for code block settings.
     *
     * {% codeBlock src='blockeditor/code-settings/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    codeBlockSettings: CodeBlockSettingsModel;
    /**
     * Defines the color palette for the font color toolbar command.
     *
     * @default
     * {
     * default: '#ff0000',
     * mode: 'Palette',
     * columns: 10,
     * modeSwitcher: false,
     *  colorCode: {
     *     'Custom': [
     *       '', '#000000', '#e7e6e6', '#44546a', '#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#70ad47', '#ff0000',
     *       '#f2f2f2', '#808080', '#cfcdcd', '#d5dce4', '#d9e2f3', '#fbe4d5', '#ededed', '#fff2cc', '#e2efd9', '#ffcccc',
     *       '#d9d9d9', '#595959', '#aeaaaa', '#acb9ca', '#b4c6e7', '#f7caac', '#dbdbdb', '#ffe599', '#c5e0b3', '#ff8080',
     *       '#bfbfbf', '#404040', '#747070', '#8496b0', '#8eaadb', '#f4b083', '#c9c9c9', '#ffd966', '#a8d08d', '#ff3333',
     *       '#a6a6a6', '#262626', '#3b3838', '#323e4f', '#2f5496', '#c45911', '#7b7b7b', '#bf8f00', '#538135', '#b30000',
     *       '#7f7f7f', '#0d0d0d', '#161616', '#212934', '#1f3763', '#823b0b', '#525252', '#7f5f00', '#375623', '#660000'
     *     ]
     *  }
     * }
     */
    fontColorSettings: FontColorSettingsModel;
    /**
     * Defines the color palette for the background color (text highlight color) toolbar command.
     *
     * @default
     * {
     *   default: '#ffff00',
     *   mode: 'Palette',
     *   columns: 5,
     *   modeSwitcher: false,
     *   colorCode: {
     *     'Custom': [
     *       '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#0000ff', '#ff0000',
     *       '#000080', '#008080', '#008000', '#800080', '#800000', '#808000',
     *       '#c0c0c0', '#000000', ''
     *     ]
     *   }
     * }
     */
    backgroundColorSettings: BackgroundColorSettingsModel;
    /**
     * Event triggered after the Blockeditor is rendered completely.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Event triggered when the editor blocks are changed.
     * This event provides details about the changes made to the editor blocks.
     *
     * {% codeBlock src='blockeditor/block-change/index.md' %}{% endcodeBlock %}
     *
     * @event blockChanged
     */
    blockChanged: EmitType<BlockChangedEventArgs>;
    /**
     * Event triggered when the selection in the block editor changes.
     * This event provides details about the new selection state.
     *
     * {% codeBlock src='blockeditor/selection-changed/index.md' %}{% endcodeBlock %}
     *
     * @event selectionChanged
     */
    selectionChanged: EmitType<SelectionChangedEventArgs>;
    /**
     * Event triggered during the dragging operation of a block.
     * This event provides details about the drag operation.
     *
     * {% codeBlock src='blockeditor/block-dragging/index.md' %}{% endcodeBlock %}
     *
     * @event blockDragging
     */
    blockDragging: EmitType<BlockDragEventArgs>;
    /**
     * Event triggered when the drag operation for a block starts.
     * This event provides details about the initial stage of the drag.
     *
     * {% codeBlock src='blockeditor/block-drag-start/index.md' %}{% endcodeBlock %}
     *
     * @event blockDragStart
     */
    blockDragStart: EmitType<BlockDragEventArgs>;
    /**
     * Event triggered when a block is dropped after a drag operation.
     * This event provides details about the block drop action.
     *
     * {% codeBlock src='blockeditor/block-dropped/index.md' %}{% endcodeBlock %}
     *
     * @event blockDropped
     */
    blockDropped: EmitType<BlockDropEventArgs>;
    /**
     * Event triggered when the block editor gains focus.
     * This event provides details about the focus action.
     *
     * {% codeBlock src='blockeditor/focus/index.md' %}{% endcodeBlock %}
     *
     * @event focus
     */
    focus: EmitType<FocusEventArgs>;
    /**
     * Event triggered when the block editor loses focus.
     * This event provides details about the blur action.
     *
     * {% codeBlock src='blockeditor/blur/index.md' %}{% endcodeBlock %}
     *
     * @event blur
     */
    blur: EmitType<BlurEventArgs>;
    /**
     * Event triggered before a paste operation occurs in the block editor.
     * This event allows interception or modification of the pasted content.
     *
     * {% codeBlock src='blockeditor/before-paste/index.md' %}{% endcodeBlock %}
     *
     * @event beforePasteCleanup
     */
    beforePasteCleanup: EmitType<BeforePasteCleanupEventArgs>;
    /**
     * Event triggered after a paste operation occurs in the block editor.
     * This event provides details about the pasted content.
     *
     * {% codeBlock src='blockeditor/after-paste/index.md' %}{% endcodeBlock %}
     *
     * @event afterPasteCleanup
     */
    afterPasteCleanup: EmitType<AfterPasteCleanupEventArgs>;
    /**
     * Event triggered before a file upload begins.
     * This event is cancelable - set args.cancel to true to prevent the upload.
     * Allows host applications to validate files or add custom data to the upload request.
     *
     * @event beforeFileUpload
     */
    beforeFileUpload: EmitType<BeforeUploadEventArgs>;
    /**
     * Event triggered during file upload with progress updates.
     * Emits progress information at regular intervals (typically 10% increments).
     *
     * @event fileUploading
     */
    fileUploading: EmitType<UploadingEventArgs>;
    /**
     * Event triggered when a file upload completes successfully.
     * Provides server response containing the uploaded image URL and metadata.
     *
     * @event fileUploadSuccess
     */
    fileUploadSuccess: EmitType<FileUploadSuccessEventArgs>;
    /**
     * Event triggered when a file upload fails or validation errors occur.
     * Provides error information for display to the user.
     *
     * @event fileUploadFailed
     */
    fileUploadFailed: EmitType<FailureEventArgs>;
    /** @hidden */
    mentionRenderer: MentionRenderer;
    /** @hidden */
    tooltipRenderer: TooltipRenderer;
    /** @hidden */
    menubarRenderer: MenuBarRenderer;
    /** @hidden */
    dialogRenderer: DialogRenderer;
    /** @hidden */
    dropdownListRenderer: DropDownListRenderer;
    /** @hidden */
    tabRenderer: TabRenderer;
    /** @hidden */
    uploaderRenderer: UploaderRenderer;
    /** @hidden */
    progressBarRenderer: ProgressBarRenderer;
    /** @hidden */
    imageUploaderRenderer: ImageUploaderRenderer;
    /** @hidden */
    floatingIconRenderer: FloatingIconRenderer;
    /** @hidden */
    eventManager: EventManager;
    blockManager: BlockManager;
    intermediate: Intermediate;
    /** @hidden */
    inlineContentInsertionModule: InlineContentInsertionModule;
    /** @hidden */
    slashCommandModule: SlashCommandModule;
    /** @hidden */
    inlineToolbarModule: InlineToolbarModule;
    /** @hidden */
    contextMenuModule: ContextMenuModule;
    /** @hidden */
    blockActionMenuModule: BlockActionMenuModule;
    /** @hidden */
    linkModule: LinkModule;
    /** @hidden */
    blockContainer: HTMLElement;
    /** @hidden */
    keyCommandMap: Map<string, string>;
    /** @hidden */
    l10n: L10n;
    /** @hidden */
    isProtectedOnChange: boolean;
    private localeJson;
    /**
     * Constructor for creating the component
     *
     * @param {BlockEditorModel} options - Specifies the BlockEditorModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: BlockEditorModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    protected getDirective(): string;
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    /**
     * Renders the editor component
     *
     * @returns {void}
     */
    protected render(): void;
    /**
     * Initializes the editor component
     *
     * @returns {void}
     */
    private initialize;
    /**
     * Initializes locale values
     *
     * @returns {void}
     */
    private initializeLocale;
    private updateInternalLocaleCollection;
    /**
     * Initializes all manager classes
     *
     * @returns {void}
     */
    private initializeManagers;
    private getEditorProps;
    /**
     * Initializes all engines
     *
     * @returns {void}
     */
    private intializeEngines;
    /**
     * Sets the dimensions of the editor
     *
     * @returns {void}
     */
    private setDimension;
    /**
     * Sets the CSS class on the editor
     *
     * @returns {void}
     */
    private setCssClass;
    /**
     * Sets the Rtl class on the editor
     *
     * @returns {void}
     */
    private setRtlClass;
    /**
     * Applies dynamic locale changes
     *
     * @returns {void}
     */
    private updateLocale;
    /**
     * Initializes mention modules for @ mentions and slash commands
     *
     * @returns {void}
     */
    private initializeMentionModules;
    /**
     * Creates the block container
     *
     * @returns {void}
     */
    private renderblockContainer;
    /**
     * Renders blocks in the editor
     *
     * @param {BlockModel[]} blocks The blocks to render
     * @returns {void}
     * @hidden
     */
    renderBlocks(blocks: BlockModel[]): void;
    /**
     * Gets the current focused block model
     *
     * @returns {BlockModel | null} The current focused block model or null if no block is focused
     * @hidden
     */
    getCurrentFocusedBlockModel(): BlockModel;
    /**
     * Responsible for rendering the template for a block
     *
     * @param {{ block: BlockModel, templateElement: HTMLElement }} args The options to render template
     * @returns {void}
     * @hidden
     */
    renderTemplate(args: {
        block: BlockModel;
        templateElement: HTMLElement;
    }): void;
    /**
     * Updates read-only state of editable elements in the editor
     *
     * @returns {void}
     * @hidden
     */
    updateEditorReadyOnlyState(): void;
    /**
     * Adds a new block to the editor
     *
     * @param {BlockModel} block - The block model to add
     * @param {string} targetId - The ID of the target block to insert the new block. If not provided, the block will be appended to the end of the editor.
     * @param {boolean} isAfter - Specifies whether to insert the new block after the target block. Default is false.
     * @returns {void}
     */
    addBlock(block: BlockModel, targetId?: string, isAfter?: boolean): void;
    /**
     * Removes a block from the editor
     *
     * @param {string} blockId - ID of the block to remove
     * @returns {void}
     */
    removeBlock(blockId: string): void;
    /**
     * Gets a block by ID
     *
     * @param {string} blockId - ID of the block to retrieve
     * @returns {BlockModel | null} - The block model or null if not found
     */
    getBlock(blockId: string): BlockModel | null;
    /**
     * Moves a block to a new position
     *
     * @param {string} fromBlockId - ID of the block to move
     * @param {string} toBlockId - ID of the target block to move to
     * @returns {void}
     */
    moveBlock(fromBlockId: string, toBlockId: string): void;
    /**
     * Updates block properties
     *
     * @param {string} blockId - ID of the block to update
     * @param {Partial<BlockModel>} properties - Properties to update
     * @returns {boolean} True if update was successful
     */
    updateBlock(blockId: string, properties: Partial<BlockModel>): boolean;
    /**
     * Enables one or more toolbar items.
     * This method allows the specified toolbar items to be enabled.
     *
     * @param {string | string[]} itemId - The id(s) of the toolbar item(s) to enable.
     * @returns {void}
     */
    enableToolbarItems(itemId: string | string[]): void;
    /**
     * Disables one or more toolbar items.
     * This method allows the specified toolbar items to be disabled.
     *
     * @param {string | string[]} itemId - The id(s) of the toolbar item(s) to disable.
     * @returns {void}
     */
    disableToolbarItems(itemId: string | string[]): void;
    /**
     * Executes the specified toolbar action on the editor.
     *
     * @param {string} action - The action to execute.
     * @param {value} value - The value required if any (Optional).
     * @returns {void}
     */
    executeToolbarAction(action: CommandName, value?: string): void;
    /**
     * Sets the selection range within a content.
     * This method selects content within the specified element using a start and end index.
     *
     * @param {Node} node - Node to apply selection
     * @param {number} startIndex - The starting index of the selection.
     * @param {number} endIndex - The ending index of the selection.
     * @returns {void}
     */
    setSelection(node: Node, startIndex: number, endIndex: number): void;
    /**
     * Sets cursor position
     *
     * @param {string} blockId - ID of the target block
     * @param {number} position - Character offset position
     * @returns {void}
     */
    setCursorPosition(blockId: string, position: number): void;
    /**
     * Gets the block from current selection
     *
     * @returns {BlockModel | null} - The block model or null if not found
     */
    getSelectedBlocks(): BlockModel[] | null;
    /**
     * Gets current selection range
     *
     * @returns {Range | null} Current selection range or null
     */
    getRange(): Range | null;
    /**
     * Selects the given range
     *
     * @param {Range} range - DOM Range object to select
     * @returns {void}
     */
    selectRange(range: Range): void;
    /**
     * Selects an entire block
     *
     * @param {string} blockId - ID of the block to select
     * @returns {void}
     */
    selectBlock(blockId: string): void;
    /**
     * Selects all blocks in the editor.
     *
     * @returns {void}
     */
    selectAllBlocks(): void;
    /**
     * Focuses the editor
     *
     * @returns {void}
     */
    focusIn(): void;
    /**
     * Removes focus from the editor
     *
     * @returns {void}
     */
    focusOut(): void;
    /**
     * Gets total block count
     *
     * @returns {number} Number of blocks in editor
     */
    getBlockCount(): number;
    /**
     * Prints all the block data.
     *
     * @returns {void}
     */
    print(): void;
    /**
     * Renders blocks from JSON data, either replacing all existing content or inserting at cursor position.
     *
     * @param {object | string} json - The JSON data (object or string) containing block definitions
     * @param {boolean} replace - Whether to replace all existing content (true) or insert at cursor (false). By default, it is set to false.
     * @param {string} targetBlockId - ID of block to insert after (applicable only if replace is false).
     * @returns {boolean} - True if operation was successful, false otherwise
     */
    renderBlocksFromJson(json: object | string, replace?: boolean, targetBlockId?: string): boolean;
    /**
     * Retrieves data from the editor as JSON.
     * If a block ID is provided, returns the data of that specific block; otherwise returns all content.
     *
     * @param {string} blockId - Optional ID of the block to retrieve
     * @returns {any} The JSON representation of the editor data
     */
    getDataAsJson(blockId?: string): BlockModel | BlockModel[];
    /**
     * Retrieves data from the editor as HTML.
     * If a block ID is provided, returns the data of that specific block; otherwise returns all content.
     *
     * @param {string} blockId - Optional ID of the block to retrieve
     * @returns {string} The HTML representation of the editor data
     */
    getDataAsHtml(blockId?: string): string;
    /**
     * Parses an HTML string into an array of BlockModel objects.
     *
     * @param {string} html - HTML string to parse.
     * @returns {BlockModel[]} An array of BlockModel objects representing the parsed HTML structure.
     */
    parseHtmlToBlocks(html: string): BlockModel[];
    destroy(): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param  {BlockEditorModel} newProp - Specifies new properties
     * @param  {BlockEditorModel} oldProp - Specifies old properties
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(newProp: BlockEditorModel, oldProp?: BlockEditorModel): void;
}
