import { IEditorModel } from '../../common/interface';
/**
 * Link internal component
 *
 * @hidden
 * @private
 */
export declare class LinkCommand {
    private parent;
    private dragSelectionRange;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {IEditorModel} parent - specifies the editor manager
     * @hidden
     * @private
     */
    constructor(parent: IEditorModel);
    private addEventListener;
    private removeEventListener;
    private linkCommand;
    private dragStart;
    private dragEnter;
    private dragDrop;
    private normalizeEmptyLinks;
    private createLink;
    private createAchorNode;
    private removeText;
    private openLink;
    private removeLink;
    private callBack;
    destroy(): void;
    private handleLinkFormat;
    private applyLinkToBlockNode;
    private unwrapLink;
    private replaceElementsWithAnchor;
    private getSplitNode;
}
