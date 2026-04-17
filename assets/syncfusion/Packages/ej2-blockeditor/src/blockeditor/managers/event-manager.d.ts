import { BlockEditor } from '../base/blockeditor';
import { BlockChangedEventArgs } from '../../models/eventargs';
/**
 * Manages all event handlers for the BlockEditor component
 * This class centralizes event handling logic and provides a clean interface
 * for wiring and unwiring events across the editor
 */
export declare class EventManager {
    private editor;
    private resizeTimer;
    /**
     * Creates a new EventHandlerManager instance
     *
     * @param {BlockEditor} editor The parent BlockEditor instance
     */
    constructor(editor: BlockEditor);
    /**
     * Wires up all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    wireGlobalEvents(): void;
    /**
     * Unwires all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    unWireGlobalEvents(): void;
    /**
     * Triggers the block change event in the editor with required args
     *
     * @param {BlockChangedEventArgs} args - The event args
     * @returns {void}
     * @hidden
     */
    triggerBlockChangeEvent(args: BlockChangedEventArgs): void;
    private handleEditorSelection;
    private handleMouseMoveActions;
    private handleEditorInputActions;
    private handleDocumentClickActions;
    private handleEditorClickActions;
    private handleEditorFocusActions;
    private handleEditorBlurActions;
    private handleKeydownActions;
    private handleMouseUpActions;
    private handleMouseDownActions;
    private clipboardActionHandler;
    private onResizeHandler;
    private destroy;
}
