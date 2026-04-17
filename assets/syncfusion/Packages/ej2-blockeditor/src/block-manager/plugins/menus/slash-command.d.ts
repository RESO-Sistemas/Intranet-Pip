import { BlockManager } from '../../base/block-manager';
/**
 * `SlashCommandModule` module is used to handle the slash command actions in the BlockEditor.
 *
 * @hidden
 */
export declare class SlashCommandModule {
    private parent;
    private isPopupOpened;
    private shortcutMap;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    private handleSlashMenuCreated;
    private buildShortcutMap;
    private onKeyDown;
    private handleSlashCommandChange;
    private getHeadingProps;
    private transformBlocks;
    private updateSlashMenuPopupState;
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen(): boolean;
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
    filterCommands(text: string, xOffset: number, yOffset: number): void;
    /**
     * Destroys the slash command module.
     *
     * @returns {void}
     */
    destroy(): void;
}
