import { Observer } from '@syncfusion/ej2-base';
import { BlockCommand } from '../plugins/block/block-command';
import { BlockService, EventService, TableService } from '../services/index';
import { IBlockSelectionState } from '../../common/interface';
import { BlockActionMenuSettingsModel, BlockModel, CommandMenuSettingsModel, ContextMenuSettingsModel, ImageBlockSettingsModel, CodeBlockSettingsModel, InlineToolbarSettingsModel, LabelSettingsModel, PasteCleanupSettingsModel, UserModel } from '../../models/index';
import { StateManager } from '../services/state-manager';
import { CommandOptions } from './interface';
import { NodeSelection } from '../../selection/selection';
import { PopupRenderer } from '../renderer/common/popup-renderer';
import { BlockActionMenuModule, ContextMenuModule, SlashCommandModule } from '../plugins/menus/index';
import { FloatingIcon } from '../actions/floating-icon';
import { NodeCutter } from '../../common/utils/index';
import { ListPlugin } from '../plugins/block/list';
import { UndoRedoAction } from '../actions/undo';
import { BlockEditorMethods } from '../actions/methods';
import { FormattingAction } from '../actions/formatting';
import { LinkModule } from '../plugins/inline/link';
import { InlineContentInsertionModule } from '../plugins/inline/inline-content';
import { ClipboardAction } from '../actions/clipboard';
import { MentionAction } from '../actions/mention';
import { DragAndDropAction } from '../actions/drag';
import { InlineToolbarModule } from '../actions/inline-toolbar';
import { EventAction } from '../actions/event';
import { BlockRenderer } from '../plugins/block/block-renderer';
import { TableSelectionManager } from '../plugins/table/selection-manager';
import { SelectionOverlay } from '../renderer/common/selection-overlay';
export declare class BlockManager {
    observer: Observer;
    currentFocusedBlock: HTMLElement;
    currentHoveredBlock: HTMLElement;
    isEntireEditorSelected: boolean;
    previousSelection: IBlockSelectionState;
    /**
     * Provides the Scrollable parent element from the Root element.
     *
     * @hidden
     *
     */
    scrollParentElements: HTMLElement[];
    inlineContentInsertionModule: InlineContentInsertionModule;
    slashCommandModule: SlashCommandModule;
    inlineToolbarModule: InlineToolbarModule;
    contextMenuModule: ContextMenuModule;
    blockActionMenuModule: BlockActionMenuModule;
    linkModule: LinkModule;
    eventAction: EventAction;
    floatingIconAction: FloatingIcon;
    undoRedoAction: UndoRedoAction;
    formattingAction: FormattingAction;
    clipboardAction: ClipboardAction;
    dragAndDropAction: DragAndDropAction;
    mentionAction: MentionAction;
    editorMethods: BlockEditorMethods;
    nodeSelection: NodeSelection;
    nodeCutter: NodeCutter;
    blockService: BlockService;
    eventService: EventService;
    tableService: TableService;
    tableSelectionManager: TableSelectionManager;
    blockCommand: BlockCommand;
    blockRenderer: BlockRenderer;
    listPlugin: ListPlugin;
    stateManager: StateManager;
    popupRenderer: PopupRenderer;
    selectionOverlay: SelectionOverlay;
    lastHighlightedBlockId: string | null;
    rootEditorElement: HTMLElement;
    blockContainer: HTMLElement;
    blocks: BlockModel[];
    readOnly: boolean;
    undoRedoStack: number;
    pasteCleanupSettings: PasteCleanupSettingsModel;
    imageBlockSettings: ImageBlockSettingsModel;
    codeBlockSettings: CodeBlockSettingsModel;
    labelSettings: LabelSettingsModel;
    private enableHtmlEncode;
    private enableHtmlSanitizer;
    enableDragAndDrop: boolean;
    blockActionMenuSettings: BlockActionMenuSettingsModel;
    contextMenuSettings: ContextMenuSettingsModel;
    commandMenuSettings: CommandMenuSettingsModel;
    inlineToolbarSettings: InlineToolbarSettingsModel;
    keyConfig: {
        [key: string]: string;
    };
    users: UserModel[];
    isPopupOpenedOnAddIconClick: boolean;
    updateTimer: ReturnType<typeof setTimeout>;
    keyCommandMap: Map<string, string>;
    private defaultKeyConfig;
    localeJson: Record<string, string>;
    constructor();
    updateContext(BlockEditorObj: {
        [key: string]: Object;
    }): void;
    initialize(): void;
    private wireEvents;
    private unwireEvents;
    /**
     * Initializes the key bindings
     *
     * @returns {void}
     */
    initializeKeyBindings(): void;
    execCommand(options: CommandOptions): void;
    /**
     * Sets focus to a block element
     *
     * @param {HTMLElement} block The block element to focus
     * @returns {void}
     * @hidden
     */
    setFocusToBlock(block: HTMLElement): void;
    /**
     * Fetches the editor blocks from service
     *
     * @returns {BlockModel[]} The editor blocks data
     * @hidden
     */
    getEditorBlocks(): BlockModel[];
    /**
     * Populates the editor blocks data with the given blocks
     *
     * @param {BlockModel[]} blocks The blocks to set for the editor
     * @returns {void}
     * @hidden
     */
    setEditorBlocks(blocks: BlockModel[]): void;
    /**
     * Gets a block element by ID
     *
     * @param {string} blockId The block ID
     * @returns {HTMLElement | null} The block element or null if not found
     * @hidden
     */
    getBlockElementById(blockId: string): HTMLElement | null;
    /**
     * Adjusts the view to focus on the current block
     *
     * @returns {void}
     * @hidden
     */
    adjustViewForFocusedBlock(): void;
    /**
     * Sets the focus and UI for a new block
     *
     * @param {HTMLElement} blockElement The block element to focus
     * @returns {void}
     * @hidden
     */
    setFocusAndUIForNewBlock(blockElement: HTMLElement): void;
    /**
     * Removes the focus and UI for the given block
     *
     * @param {HTMLElement} blockElement The block element to remove focus
     * @returns {void}
     * @hidden
     */
    removeFocusAndUIForBlock(blockElement: HTMLElement): void;
    /**
     * Gets the placeholder value for the given block element.
     *
     * @param {BlockModel} block The block model to get placeholder for.
     * @returns {string} The placeholder value for the given block type.
     * @hidden
     */
    getPlaceholderValue(block: BlockModel): string;
    /**
     * Toggles the placeholder for a block element
     *
     * @param {HTMLElement} blockElement The block element
     * @param {boolean} isFocused Whether the block is currently focused
     * @returns {void}
     * @hidden
     */
    togglePlaceholder(blockElement: HTMLElement, isFocused: boolean): void;
    /**
     * Removes all placeholder attributes from block contents
     * and refreshes the placeholder for the current focused block
     *
     * @returns {void}
     * @hidden
     */
    refreshPlaceholder(): void;
    /**
     * Sets the cursor position after adding a bulk block (Clipboard paste)
     *
     * @param {string} insertionType - The type of insertion (blocks or text)
     * @returns {void}
     * @hidden
     */
    setCursorAfterBulkBlockAddition(insertionType: string): void;
    /**
     * Updates focus and cursor position
     *
     * @param {HTMLElement} blockElement The block element to split
     * @returns {void}
     * @hidden
     */
    updateFocusAndCursor(blockElement: HTMLElement): void;
    /**
     * Serializes the given value for HTML encoding and sanitization
     *
     * @param {string} value The value to serialize
     * @returns {string} The serialized value
     * @hidden
     */
    serializeValue(value: string): string;
    removeAndNullify(element: HTMLElement): void;
    private destroyBlockEditor;
    destroy(): void;
}
