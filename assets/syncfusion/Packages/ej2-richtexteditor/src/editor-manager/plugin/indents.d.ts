import { EditorManager } from './../base/editor-manager';
/**
 * Indents internal component
 *
 * @hidden
 * @private
 */
export declare class Indents {
    private parent;
    private indentValue;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private onKeyDown;
    private applyIndents;
    destroy(): void;
}
