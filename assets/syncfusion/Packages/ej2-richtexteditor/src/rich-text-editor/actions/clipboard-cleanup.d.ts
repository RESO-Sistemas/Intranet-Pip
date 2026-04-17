import { IRichTextEditor } from '../base';
/**
 * ClipBoardCleanup module called when copy or cut event is triggered in RichTextEditor
 */
export declare class ClipBoardCleanup {
    private parent;
    private clipBoardCleanupObj;
    private isDestroyed;
    constructor(parent?: IRichTextEditor);
    private addEventListener;
    private destroy;
    private removeEventListener;
    private bindOnEnd;
    private clipBoardCleanup;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
}
