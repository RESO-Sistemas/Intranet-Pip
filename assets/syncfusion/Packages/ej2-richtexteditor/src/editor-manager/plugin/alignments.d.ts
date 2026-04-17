import { EditorManager } from './../base/editor-manager';
/**
 * Formats internal component
 *
 * @hidden
 * @private
 */
export declare class Alignments {
    private parent;
    private alignments;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element.
     * @returns {void}
     * @hidden
     * @private
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private onKeyDown;
    private getTableNode;
    private applyAlignment;
    destroy(): void;
}
