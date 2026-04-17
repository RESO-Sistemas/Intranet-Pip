import { ChildProperty, EmitType } from '@syncfusion/ej2-base';
import { CommandItemModel } from './command-item-model';
import { CommandFilteringEventArgs, CommandItemSelectEventArgs } from '../eventargs';
/**
 * Represents the settings for the command menu in the block editor component
 */
export declare class CommandMenuSettings extends ChildProperty<CommandMenuSettings> {
    /**
     * Specifies the width of the command menu popup.
     * Accepts valid CSS width values such as px, %, auto, etc.
     *
     * @default '280px'
     */
    popupWidth: string;
    /**
     * Specifies the height of the command menu popup.
     * Accepts valid CSS height values such as px, %, auto, etc.
     *
     * @default '300px'
     */
    popupHeight: string;
    /**
     * Specifies an array of command item models representing the available commands in the menu.
     * This property holds the list of commands that appear in the menu.
     *
     * @default []
     */
    commands: CommandItemModel[];
    /**
     * Specifies the event triggered for filtering commands based on the query input.
     *
     * @event filtering
     */
    filtering: EmitType<CommandFilteringEventArgs>;
    /**
     * Specifies the event triggered when a command item is clicked.
     * This event can be used to perform actions based on user interaction.
     *
     * @event itemSelect
     */
    itemSelect: EmitType<CommandItemSelectEventArgs>;
}
