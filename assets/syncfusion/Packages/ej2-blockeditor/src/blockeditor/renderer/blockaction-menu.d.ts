import { Popup } from '@syncfusion/ej2-popups';
import { BlockEditor } from '../base/blockeditor';
import { BlockEditorModel } from '../base/blockeditor-model';
/**
 * `BlockActionMenuModule` is used to handle the block action menu in the BlockEditor.
 *
 * @hidden
 */
export declare class BlockActionMenuModule {
    private editor;
    private menuObj;
    popupObj: Popup;
    private blockActionTooltip;
    private menuElement;
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    private init;
    private getActionItems;
    private bindTooltip;
    private applyRtlSettings;
    private handleBlockActionMenuSelect;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    protected onPropertyChanged(e: {
        [key: string]: BlockEditorModel;
    }): void;
}
