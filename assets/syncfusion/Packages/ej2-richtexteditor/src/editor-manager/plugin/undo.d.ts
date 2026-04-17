import { EditorManager } from './../base/editor-manager';
import { IHtmlSubCommands, IHtmlUndoRedoData } from './../base/interface';
import { IHtmlKeyboardEvent } from './../../editor-manager/base/interface';
import { IUndoCallBack } from '../../common/interface';
/**
 * `Undo` module is used to handle undo actions.
 */
export declare class UndoRedoManager {
    element: HTMLElement;
    private parent;
    steps: number;
    undoRedoStack: IHtmlUndoRedoData[];
    undoRedoSteps: number;
    undoRedoTimer: number;
    private debounceListener;
    constructor(parent?: EditorManager, options?: {
        [key: string]: number;
    });
    protected addEventListener(): void;
    private onPropertyChanged;
    protected removeEventListener(): void;
    /**
     * onAction method
     *
     * @param {IHtmlSubCommands} e - specifies the sub command
     * @returns {void}
     * @hidden
     * @private
     */
    onAction(e: IHtmlSubCommands): void;
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @private
     */
    destroy(): void;
    private keyDown;
    private keyUp;
    private getTextContentFromFragment;
    private isElementStructureEqual;
    /**
     * RTE collection stored html format.
     *
     * @function saveData
     * @param {KeyboardEvent} e - specifies the keyboard event
     * @returns {void}
     * @hidden
     * @private
     */
    saveData(e?: KeyboardEvent | MouseEvent | IUndoCallBack): void;
    private removeResizeElement;
    /**
     * Undo the editable text.
     *
     * @function undo
     * @param {IHtmlSubCommands} e - specifies the sub commands
     * @returns {void}
     * @hidden
     * @private
     */
    undo(e?: IHtmlSubCommands | IHtmlKeyboardEvent): void;
    /**
     * Redo the editable text.
     *
     * @param {IHtmlSubCommands} e - specifies the sub commands
     * @function redo
     * @returns {void}
     * @hidden
     * @private
     */
    redo(e?: IHtmlSubCommands | IHtmlKeyboardEvent): void;
    /**
     * getUndoStatus method
     *
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @private
     */
    getUndoStatus(): {
        [key: string]: boolean;
    };
    getCurrentStackIndex(): number;
    /**
     * Clears the undo and redo stacks and reset the steps to null..
     *
     * @returns {void}
     * @public
     */
    clear(): void;
}
