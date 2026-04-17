import { ItemModel } from '@syncfusion/ej2-navigations';
import { BlockActionItemModel, CommandItemModel, ContextMenuItemModel, LabelItemModel, ICollapsibleHeadingBlockSettings, IHeadingBlockSettings } from '../../models/index';
import { ToolbarCommandName } from '../../models/types';
import { IToolbarItemModel } from '../../models/interface';
/**
 * Creates a shallow copy of the given object, excluding specified properties.
 *
 * @param {any} obj - The object to copy.
 * @param {string[]} excludeKeys - Optional array of property keys to exclude from the copy.
 * @returns {any} A new object with copied properties.
 */
export declare function cloneObject(obj: any, excludeKeys?: string[]): any;
/**
 * Transforms an array of ToolbarItemModel objects into an array of ItemModel objects.
 *
 * @param {IToolbarItemModel[]} items - The toolbar items to transform.
 * @returns {ItemModel[]} The transformed toolbar items.
 */
export declare function transformIntoToolbarItem(items: (string | ToolbarCommandName | IToolbarItemModel)[]): ItemModel[];
export declare function sanitizeBlockActionItems(items: BlockActionItemModel[]): BlockActionItemModel[];
export declare function sanitizeCommandMenuItems(items: CommandItemModel[]): CommandItemModel[];
export declare function sanitizeLabelItems(items: LabelItemModel[]): LabelItemModel[];
export declare function sanitizeContextMenuItems(items: ContextMenuItemModel[]): ContextMenuItemModel[];
export declare function sanitizeHeadingProps(props: Partial<ICollapsibleHeadingBlockSettings> | Partial<IHeadingBlockSettings>): any;
