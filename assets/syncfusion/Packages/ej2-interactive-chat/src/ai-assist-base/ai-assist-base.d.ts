/// <reference path="../interactive-chat-base/interactive-chat-base-model.d.ts" />
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { AIAssistBaseModel } from './ai-assist-base-model';
import { InterActiveChatBase } from '../interactive-chat-base/interactive-chat-base';
/**
 * Specifies the type of footer.
 */
export declare enum ToolbarPosition {
    /**
     * Displays the toolbar inline with the content.
     */
    Inline = "Inline",
    /**
     * Displays the toolbar at the bottom of the edit area.
     */
    Bottom = "Bottom"
}
/**
 * AIBase component act as base class.
 */
export declare class AIAssistBase extends InterActiveChatBase implements INotifyPropertyChanged {
    /**
     * Specifies whether the prompt response need to be added through streaming in the component.
     * By default the response is not streamed and default value is false
     *
     * @type {boolean}
     * @default false
     */
    enableStreaming: boolean;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    getModuleName(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    protected onFooterIconsFocusOut(e: FocusEvent): void;
    protected onFooterIconsPointerDown(e: PointerEvent): void;
    protected onFooterIconsClick(e: MouseEvent): void;
    protected updateFooterType(toolbarPosition: string): void;
    protected updateFooterClass(footerTemplate: string | Function): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistBaseModel} newProp - Specifies new properties
     * @param  {AIAssistBaseModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: AIAssistBaseModel, oldProp: AIAssistBaseModel): void;
}
