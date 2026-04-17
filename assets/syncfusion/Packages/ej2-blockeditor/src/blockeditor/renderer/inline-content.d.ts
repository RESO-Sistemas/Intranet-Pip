import { Mention } from '@syncfusion/ej2-dropdowns';
import { BlockEditor } from '../base/blockeditor';
import { BlockEditorModel } from '../base/blockeditor-model';
export declare class InlineContentInsertionModule {
    private editor;
    userMenuObj: Mention;
    labelMenuObj: Mention;
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    /**
     * Initializes the user mention module.
     *
     * @returns {void}
     * @hidden
     */
    initializeUserMention(): void;
    /**
     * Initializes the label mention module.
     *
     * @returns {void}
     * @hidden
     */
    initializeLabelContent(): void;
    private handleInlineContentInsertion;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
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
    /**
     * Destroys the inline content module.
     *
     * @returns {void}
     */
    destroy(): void;
}
