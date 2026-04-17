import { Mention } from '@syncfusion/ej2-dropdowns';
import { BlockEditor } from '../base/blockeditor';
import { BlockEditorModel } from '../base/blockeditor-model';
/**
 * `SlashCommandModule` module is used to handle the slash command actions in the BlockEditor.
 *
 * @hidden
 */
export declare class SlashCommandModule {
    private editor;
    mentionObj: Mention;
    private slashMenuTooltip;
    private static readonly MAX_FILTER_TEXT_LENGTH;
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    private init;
    private getCommandItems;
    private bindTooltipForSlashPopup;
    private setActiveItem;
    private clearTooltipState;
    private handleSlashCommandChange;
    private handleSlashCommandFiltering;
    private handleSlashCommandSelect;
    private handleSlashCommandOpened;
    private restrictItemsOnSpecificBlock;
    private handleSlashCommandBeforeOpen;
    private handleSlashCommandBeforeClose;
    private restrictPopupForBlockTypes;
    private applyRtlSettings;
    /**
     * Hides the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    hidePopup(): void;
    /**
     * Shows the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    showPopup(): void;
    /**
     * Filters the slash commands based on the given text.
     *
     * @param {{ text: string, offsetX: number, offsetY: number }} options - options to filter the slash commands.
     * @returns {void}
     * @hidden
     */
    filterCommands(options: {
        text: string;
        offsetX: number;
        offsetY: number;
    }): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
    /**
     * Destroys the slash command module.
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
