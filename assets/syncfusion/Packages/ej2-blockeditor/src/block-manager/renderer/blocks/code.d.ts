import { BlockModel } from '../../../models/index';
import { ICodeBlockSettings } from '../../../models/block/index';
import { BlockManager } from '../../base/block-manager';
export declare class CodeRenderer {
    private parent;
    private ctrlAPressed;
    private readonly INDENT_SIZE;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    /**
     * Renders a code block
     *
     * @param {BlockModel} block - The block model containing data.
     * @returns {HTMLElement} - The rendered code block element.
     * @hidden
     */
    renderCodeBlock(block: BlockModel): HTMLElement;
    private createCodeToolbar;
    addCopyButtonClick(toolbar: HTMLElement, copyButton: HTMLElement): void;
    private initializeLanguageSelector;
    renderDropDown(codeBlockSettings: ICodeBlockSettings, preElement: HTMLElement, codeElement: HTMLElement, targetElement: HTMLElement): void;
    private createCodeContainer;
    private handleKeyDownActions;
    private handleEnterKey;
    private determineEnterAction;
    private handleDeletion;
    private handleTabKey;
    private handleCodeBlockInput;
    private handleCtrlASelection;
    private getCursorPosition;
    private insertTextAtCursor;
    private getCurrentLineIndentation;
    private shouldExitCodeBlock;
    private exitCodeBlock;
    private addIndentation;
    private removeIndentation;
    private selectEntireCodeBlock;
    private updateBlockModel;
    private handleLocaleChange;
    destroy(): void;
}
