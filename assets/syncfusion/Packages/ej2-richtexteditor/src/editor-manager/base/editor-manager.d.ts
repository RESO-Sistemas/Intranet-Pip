import { Observer } from '@syncfusion/ej2-base';
import { ICommandModel, IFormatPainterEditor } from './interface';
import { EditorExecCommand as ExecCommand } from './types';
import { Lists } from './../plugin/lists';
import { NodeSelection } from './../../selection/index';
import { DOMNode } from './../plugin/dom-node';
import { Formats } from './../plugin/formats';
import { LinkCommand } from './../plugin/link';
import { Alignments } from './../plugin/alignments';
import { LineHeight } from './../plugin/lineHeight';
import { Indents } from './../plugin/indents';
import { ImageCommand } from './../plugin/image';
import { AudioCommand } from './../plugin/audio';
import { VideoCommand } from './../plugin/video';
import { TableCommand } from './../plugin/table';
import { SelectionBasedExec } from './../plugin/selection-exec';
import { InsertHtmlExec } from './../plugin/inserthtml-exec';
import { ClearFormatExec } from './../plugin/clearformat-exec';
import { UndoRedoManager } from './../plugin/undo';
import { MsWordPaste } from '../plugin/ms-word-clean-up';
import { InsertTextExec } from '../plugin/insert-text';
import { NodeCutter } from '../plugin/nodecutter';
import { EmojiPickerAction } from '../plugin/emoji-picker-action';
import { TableSelection } from '../plugin/table-selection';
import { DOMMethods } from '../plugin/dom-tree';
import { CustomUserAgentData } from '../../common/user-agent';
import { CodeBlockPlugin } from '../plugin/code-block';
import { EnterKeyAction } from '../plugin/enter-key';
import { AutoFormatPlugin } from '../plugin/autoformat';
/**
 * EditorManager internal component
 *
 * @hidden
 * @private
 */
export declare class EditorManager {
    currentDocument: HTMLDocument;
    observer: Observer;
    listObj: Lists;
    nodeSelection: NodeSelection;
    nodeCutter: NodeCutter;
    domNode: DOMNode;
    formatObj: Formats;
    linkObj: LinkCommand;
    alignmentObj: Alignments;
    lineheightObj: LineHeight;
    indentsObj: Indents;
    imgObj: ImageCommand;
    audioObj: AudioCommand;
    videoObj: VideoCommand;
    tableObj: TableCommand;
    codeBlockObj: CodeBlockPlugin;
    selectionObj: SelectionBasedExec;
    inserthtmlObj: InsertHtmlExec;
    insertTextObj: InsertTextExec;
    clearObj: ClearFormatExec;
    autoFormatObj: AutoFormatPlugin;
    undoRedoManager: UndoRedoManager;
    msWordPaste: MsWordPaste;
    formatPainterEditor: IFormatPainterEditor;
    editableElement: Element;
    emojiPickerObj: EmojiPickerAction;
    tableCellSelection: TableSelection;
    isDestroyed: boolean;
    private clickCount;
    private lastClickTime;
    domTree: DOMMethods;
    userAgentData: CustomUserAgentData;
    enterKey: EnterKeyAction;
    isBlazor: boolean;
    /**
     * Constructor for creating the component
     *
     * @hidden
     * @private
     * @param {ICommandModel} options - specifies the command Model
     * @param {boolean} isBlazor - Determines whether Blazor-specific logic should be applied.
     */
    constructor(options: ICommandModel, isBlazor?: boolean);
    private wireEvents;
    private unwireEvents;
    private onWordPaste;
    private onPropertyChanged;
    private editorKeyDown;
    private editorKeyUp;
    private onBegin;
    private dragEnterHandler;
    private dragOverHandler;
    private dropHandler;
    /**
     * execCommand
     *
     * @param {ExecCommand} command - specifies the execution command
     * @param {T} value - specifes the value.
     * @param {Event} event - specifies the call back event
     * @param {Function} callBack - specifies the function
     * @param {string} text - specifies the string value
     * @param {T} exeValue - specifies the values to be executed
     * @param {string} selector - specifies the selector values
     * @returns {void}
     * @hidden
     * @private
     */
    execCommand<T>(command: ExecCommand, value: T, event?: Event, callBack?: Function, text?: string | Node, exeValue?: T, selector?: string, enterAction?: string): void;
    private editorMouseDown;
    private tripleClickSelection;
    private getParentBlockNode;
    destroy(): void;
    beforeSlashMenuApplyFormat(): void;
    /**
     * Utility to check if all then contents are selected within RTE
     *
     * @private
     * @hidden
     * @returns {boolean} `true` if the selection is within the RTE; otherwise, `false`.
     */
    isEntireRTEContentSelected(): boolean;
    isStartEntireContentSelected(range: Range): boolean;
}
