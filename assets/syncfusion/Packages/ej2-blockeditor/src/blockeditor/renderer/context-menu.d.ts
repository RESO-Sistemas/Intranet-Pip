import { ContextMenu } from '@syncfusion/ej2-navigations';
import { BlockEditor } from '../base/blockeditor';
import { BlockEditorModel } from '../base/blockeditor-model';
/**
 * `ContextMenuModule` is used to handle the context menu actions in the BlockEditor.
 *
 * @hidden
 */
export declare class ContextMenuModule {
    private editor;
    contextMenuObj: ContextMenu;
    private menuElement;
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    private init;
    private getMenuItems;
    private handleContextMenuBeforeOpen;
    private handleContextMenuBeforeClose;
    private handleContextMenuOpen;
    private handleContextMenuClose;
    private handleContextMenuSelection;
    private enableMenuItems;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
    /**
     * Destroys the ContextMenu module.
     *
     * @returns {void}
     */
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
