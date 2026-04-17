import { L10n } from '@syncfusion/ej2-base';
import { BlockActionItemModel, CommandItemModel, ContextMenuItemModel, LabelItemModel, CodeLanguageModel } from '../../models/index';
import { IToolbarItemModel, TransformItemModel } from '../../models/interface';
/**
 * Checks if the current operating system is macOS.
 *
 * @returns {boolean} - Returns `true` if the operating system is macOS, otherwise `false`.
 */
export declare function isMacOS(): boolean;
/**
 * Returns the modifier key based on the platform (Ctrl for non-macOS, Cmd for macOS).
 *
 * @returns {string} - Returns platform specific shortcut key.
 */
export declare function getModifierKey(): string;
/**
 * Returns the command menu items.
 *
 * @returns {CommandItemModel[]} - Returns the command menu items.
 */
export declare function getCommandMenuItems(): CommandItemModel[];
/**
 * Returns the label menu items.
 *
 * @returns {LabelItemModel[]} - Returns the label menu items.
 */
export declare function getLabelMenuItems(): LabelItemModel[];
/**
 * Returns the context menu items.
 *
 * @returns {ContextMenuItemModel[]} - Returns the context menu items.
 */
export declare function getContextMenuItems(): ContextMenuItemModel[];
/**
 * Returns the block action menu items.
 *
 * @returns {BlockActionItemModel[]} - Returns the block action menu items.
 */
export declare function getBlockActionsMenuItems(): BlockActionItemModel[];
/**
 * Returns the inline toolbar items.
 *
 * @returns {IToolbarItemModel[]} - Returns the inline toolbar items.
 */
export declare function getInlineToolbarItems(): IToolbarItemModel[];
/**
 * Returns the display template content for user mention
 *
 * @returns {string} - Returns the display template content
 */
export declare function getUserMentionDisplayTemplate(): string;
/**
 * Returns the display template content for label mention
 *
 * @returns {string} - Returns the display template content
 */
export declare function getLabelMentionDisplayTemplate(): string;
/**
 * Returns the language items of the code block.
 *
 * @returns {CodeLanguageModel[]} - Returns the code block language items.
 */
export declare function getLanguageItems(): CodeLanguageModel[];
export declare function getLocaleItems(): {
    [key: string]: string;
};
export declare function getCurrentLocaleJson(localeInstance: L10n): {
    [key: string]: string;
};
export declare const defaultTransformModel: TransformItemModel[];
