import { IEditorModel } from '../../common/interface';
/**
 * Auto Format internal component
 *
 * @hidden
 * @private
 */
export declare class AutoFormatPlugin {
    private parent;
    /**
     * Constructor for creating the Auto Format plugin
     *
     * @param {IEditorModel} parent - specifies the parent element.
     * @returns {void}
     * @hidden
     * @private
     */
    constructor(parent: IEditorModel);
    private enterkey;
    private addEventListener;
    private removeEventListener;
    findAutoFormatCommandInRange(range: Range, text?: string): boolean;
    findBlockAutoFormatCommandInRange(range: Range, text?: string): {
        tag: string;
        format: string;
    } | null;
    private autoFormat;
    private callBack;
    private findFirstBlockParent;
    private getLineTextAndNodes;
    private traverseNodes;
    private findMarkdownMatch;
    private isValidBlockAutoFormatCommand;
    private findMarkdownStartEndNodes;
    private deleteMarkerFromNodes;
    private processMarkdownMatch;
    private wrapContentWithTags;
    private setCursorPoint;
    private isReverted;
    destroy(): void;
}
