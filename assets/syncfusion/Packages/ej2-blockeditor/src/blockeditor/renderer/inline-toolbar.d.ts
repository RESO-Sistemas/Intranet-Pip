import { Toolbar } from '@syncfusion/ej2-navigations';
import { IToolbarRenderOptions } from '../../common/interface';
import { BlockEditor } from '../base/blockeditor';
import { BlockEditorModel } from '../base/blockeditor-model';
/**
 * InlineToolbarModule class is used to render the inline toolbar for the block editor.
 *
 * @hidden
 */
export declare class InlineToolbarModule {
    private editor;
    private toolbarRenderer;
    private textColorPicker;
    private bgColorPicker;
    toolbarObj: Toolbar;
    private inlineToolbarTooltip;
    private toolbarEle;
    private pickerHandler;
    private transformDDB;
    private updateTransformLabelHandler;
    private currentTransformItems;
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    private init;
    private bindTooltip;
    /**
     * Render the inline toolbar for the block editor.
     *
     * @param {IToolbarRenderOptions} args - The options for rendering the toolbar.
     * @returns {Toolbar} The rendered toolbar instance.
     * @hidden
     */
    renderToolbar(args: IToolbarRenderOptions): Toolbar;
    private handleInlineToolbarCreated;
    private handleInlineToolbarItemClick;
    private enableDisableTbarItems;
    private initializeColorPicker;
    private createDropDown;
    private applyRtlSettings;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
    /**
     * Handles property changes to update the toolbar configuration
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    protected onPropertyChanged(e: {
        [key: string]: BlockEditorModel;
    }): void;
    private initializeTransformDropdown;
    private applyTransformMenuSelection;
    private getMatchingTransformItemId;
    private getCurrentTransformIcon;
    private getToolbarItems;
    private hasToolbarItemId;
    private hasIgnoredBlockTypes;
    /**
     * Resolves custom transform items from transformSettings into a normalized TransformItemModel array.
     * Handles string identifiers and model objects.
     *
     * @param {(string | TransformCommandName | TransformItemModel)[]} items - The raw transform items.
     * @returns {TransformItemModel[]} - The resolved transform items.
     * @private
     */
    private resolveTransformItems;
    /**
     * Destroys the inline toolbar module and cleans up resources
     *
     * @returns {void}
     */
    destroy(): void;
}
