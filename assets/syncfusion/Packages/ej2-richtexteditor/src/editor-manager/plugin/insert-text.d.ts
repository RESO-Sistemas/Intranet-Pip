import { EditorManager } from '../base/editor-manager';
/**
 * Insert a Text Node or Text
 *
 * @hidden
 * @private
 */
export declare class InsertTextExec {
    private parent;
    /**
     * Constructor for creating the InsertText plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private insertText;
    destroy(): void;
}
