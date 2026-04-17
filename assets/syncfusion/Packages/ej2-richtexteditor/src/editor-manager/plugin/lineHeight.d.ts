import { EditorManager } from './../base/editor-manager';
/**
 * LineHeight internal component
 *
 * @hidden
 * @private
 */
export declare class LineHeight {
    private parent;
    /**
     * Constructor for creating the LineHeight plugin
     *
     * @param {EditorManager} parent - specifies the parent element.
     * @returns {void}
     * @hidden
     * @private
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private applyLineHeight;
    destroy(): void;
}
