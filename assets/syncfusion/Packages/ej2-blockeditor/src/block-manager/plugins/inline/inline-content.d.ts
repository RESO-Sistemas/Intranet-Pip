import { BlockManager } from '../../base/block-manager';
export declare class InlineContentInsertionModule {
    private parent;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    private handleInlineContentInsertion;
    private processInsertion;
    private splitAndReorganizeContent;
    private createInlineContentModel;
    private getRangeParent;
    private findInsertedNode;
    /**
     * Destroys the inline content module.
     *
     * @returns {void}
     */
    destroy(): void;
}
