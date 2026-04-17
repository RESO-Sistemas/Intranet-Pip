import { StyleModel } from '../../models/index';
import { NodeSelection } from '../../selection/selection';
import { ExecCommandOptions } from '../../common/interface';
import { BlockManager } from '../base/block-manager';
export declare class FormattingAction {
    private parent;
    /** @hidden */
    nodeSelection: NodeSelection;
    /** @hidden */
    lastRemovedFormat: keyof StyleModel;
    /** @hidden */
    activeInlineFormats: Set<keyof StyleModel>;
    private formatCache;
    private ignoredBlockTypes;
    private formattingHandler;
    constructor(manager?: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    /**
     * Executes the formatting command based on the provided options.
     *
     * @param {ExecCommandOptions} options - The options for the formatting command.
     * @returns {void}
     * @hidden
     */
    execCommand(options: ExecCommandOptions): void;
    private performOperation;
    private applyFormattingToBlocks;
    private processFormattingActions;
    /**
     * Handles formatting action on user typing.
     *
     * @returns {boolean} - Returns true if formatting was applied, false otherwise.
     * @hidden
     */
    handleTypingWithActiveFormats(): boolean;
    private removeFormatToLastCharacter;
    /**
     * Determines whether formatting should be removed or applied across all selected blocks.
     * This is critical for multi-block selections to ensure consistent behavior.
     *
     * For example, if 3 blocks are selected where block 2 is already bold:
     * - Without global check: Block 1 gets bold applied, Block 2 gets bold removed, Block 3 gets bold applied
     * - With global check: All blocks get bold applied consistently
     *
     * @param {BlockModel[]} blocks - All blocks in the selection
     * @param {ExecCommandOptions} options - Formatting options
     * @returns {boolean} - True if format should be removed, false if it should be applied
     */
    private shouldRemoveFormatGlobally;
    /**
     * Toggles the active inline formats when formatting.
     * Triggers when user presses keys such as Ctrl+B, Ctrl+I, Ctrl+U and Ctrl+Shift+X.
     *
     * @param {string} command - The formatting command to toggle.
     * @returns {void}
     * @hidden
     */
    toggleActiveFormats(command: keyof StyleModel): void;
    private areAllActiveFormatsApplied;
    private isNodeFormattedWith;
    private doesElementHaveFormat;
    private resolveBlocksToFormat;
    private expandSelectedBlocks;
    destroy(): void;
}
