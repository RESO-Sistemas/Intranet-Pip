import { BlockEditor } from '../base/blockeditor';
export declare class Intermediate {
    private editor;
    constructor(editor: BlockEditor);
    /**
     * Wires up all global event handlers
     *
     * @returns {void}
     * @hidden
     */
    wireGlobalEvents(): void;
    /**
     * Unwires all global event handlers
     *
     * @returns {void}
     * @hidden
     */
    unWireGlobalEvents(): void;
    /**
     * Processes the event actions in block manager which originates from blockeditor
     *
     * @param {string} action - The event action
     * @param {any} args - args required for action if any.
     * @returns {void}
     * @hidden
     */
    processActions(action: string, args?: any): void;
    private handleModelChanges;
    private handleSelectionChange;
    private triggerBeforePaste;
    private triggerAfterPaste;
    private triggerBlockDrag;
    private triggerBlockStart;
    private triggerBlockDrop;
    private triggerBlockChangeEvent;
    private triggerBlockActionsMenuCloseEvent;
    private triggerBlockActionsMenuOpenEvent;
    private renderDropdownList;
    private destroy;
}
