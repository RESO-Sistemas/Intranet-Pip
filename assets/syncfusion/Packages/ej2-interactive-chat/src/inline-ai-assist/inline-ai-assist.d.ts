/// <reference path="../ai-assist-base/ai-assist-base-model.d.ts" />
import { INotifyPropertyChanged, EmitType, BaseEventArgs, ChildProperty } from '@syncfusion/ej2-base';
import { CommandSettingsModel, InlineToolbarSettingsModel, InlineAIAssistModel, ResponseSettingsModel, CommandItemModel, ResponseItemModel, PromptResponseModel } from './inline-ai-assist-model';
import { CloseEventArgs, OpenEventArgs } from '@syncfusion/ej2-popups';
import { AIAssistBase, ToolbarPosition } from '../ai-assist-base/ai-assist-base';
import { ToolbarItemModel } from '../interactive-chat-base/interactive-chat-base-model';
/**
 * Specifies the mode of inline ai assist.
 */
export declare enum ResponseMode {
    /**
     * Represents the inline response updates for the component.
     */
    Inline = "Inline",
    /**
     * Represents a popup based response update for the component.
     */
    Popup = "Popup"
}
/**
 * Represents the event arguments for a toolbar item click event in the component.
 */
export interface ToolbarItemClickEventArgs extends BaseEventArgs {
    /**
     * Specifies the toolbar item that was clicked.
     * Represents the model of the toolbar item that triggered the click event.
     *
     * @type {ToolbarItemModel}
     * @default null
     *
     */
    item?: ToolbarItemModel;
    /**
     * Specifies the event object associated with the toolbar item click.
     * Represents the underlying event that triggered the click action, providing details about the event.
     *
     * @type {Event}
     * @default null
     *
     */
    event?: Event;
    /**
     * Specifies whether the click event should be cancelled.
     * Determines if the default action associated with the click event should be prevented.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel?: boolean;
    /**
     * Specifies the index of the message data associated with the toolbar item click event.
     * This property is not applicable for header toolbar item click.
     *
     * @type {number}
     * @default -1
     */
    dataIndex?: number;
}
/**
 * Represents the event arguments for a Command item click event in the Inline AI Assist component.
 */
export interface CommandItemSelectEventArgs extends BaseEventArgs {
    /**
     * Specifies the command item that was clicked.
     *
     * @type {CommandItemModel}
     * @default null
     */
    command: CommandItemModel;
    /**
     * Specifies the HTML element associated with the clicked command item.
     *
     * @type {HTMLElement}
     * @default null
     *
     */
    element: HTMLElement;
    /**
     * Specifies the native browser event associated with the command item click.
     *
     * @type {Event}
     * @default null
     *
     */
    event: Event;
    /**
     * Specifies whether the event should be canceled. `true` to prevent the default click action.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel: boolean;
}
/**
 * Represents the event arguments for a response item click event in the InlineAIAssist component.
 */
export interface ResponseItemSelectEventArgs extends BaseEventArgs {
    /**
     * Specifies the command item that was clicked.
     *
     * @type {CommandItemModel}
     * @default null
     */
    command: CommandItemModel;
    /**
     * Specifies the HTML element associated with the clicked command item.
     *
     * @type {HTMLElement}
     * @default null
     *
     */
    element: HTMLElement;
    /**
     * Specifies the native browser event associated with the command item click.
     *
     * @type {Event}
     * @default null
     *
     */
    event: Event;
    /**
     * Specifies whether the event should be canceled. `true` to prevent the default click action.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel: boolean;
}
/**
 * Represents the event arguments for a prompt request in the InlineAIAssist component.
 */
export interface InlinePromptRequestEventArgs extends BaseEventArgs {
    /**
     * Specifies whether the prompt request should be cancelled.
     * Determines if the prompt request should be stopped, giving control over whether the prompt processing continues or is aborted.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel?: boolean;
    /**
     * Specifies the text of the prompt request.
     *
     * @type {string}
     * @default ''
     *
     */
    prompt?: string;
}
/**
 * Represents a model for a prompt and its associated response in the Inline AI Assist component.
 */
export declare class PromptResponse extends ChildProperty<PromptResponse> {
    /**
     * Specifies the prompt text for this item in the prompts collection.
     * Specifies the user-entered instruction or question to be processed.
     *
     * @type {string}
     * @default ''
     */
    prompt: string;
    /**
     * Specifies the response associated with the corresponding prompt.
     * Specifies the AI-generated text (plain or Markdown) returned after processing.
     *
     * @type {string}
     * @default ''
     */
    response: string;
}
/**
 * Represents a command item model in the inline AI assist component.
 */
export declare class CommandItem extends ChildProperty<CommandItem> {
    /**
     * Specifies the unique identifier of the command item.
     * This ID can be used for referencing specific commands programmatically.
     *
     * @type {string}
     * @default ''
     */
    id: string;
    /**
     * Specifies whether the command item is disabled.
     * When set to true, the command item will be unavailable for selection and execution.
     *
     * @type {boolean}
     * @default false
     */
    disabled: boolean;
    /**
     * Specifies the CSS classes for the icon associated with the item.
     * This allows for styling and representation of icons that are visually linked with the item.
     *
     * @type {string}
     * @default ''
     */
    iconCss: string;
    /**
     * Specifies the display label for the command item.
     * This text is shown in the command menu for the user to identify the command.
     *
     * @type {string}
     * @default ''
     */
    label: string;
    /**
     * Specifies the prompt or command text sent to the AI service when selected.
     * Specifies that prompts are resolved from captured context before sending.
     *
     * @type {string}
     * @default ''
     */
    prompt: string;
    /**
     * Specifies the header text for the command item.
     * This provides a descriptive title or label for the item group.
     *
     * @type {string}
     * @default ''
     */
    groupBy: string;
    /**
     * Specifies the title of the item.
     * This serves as the primary label or heading, providing a brief description of the item's purpose.
     *
     * @type {string}
     * @default ''
     */
    tooltip: string;
}
/**
 * Represents a response item model in the inline AI assist component.
 */
export declare class ResponseItem extends ChildProperty<ResponseItem> {
    /**
     * Specifies the unique identifier of the response item.
     * This ID can be used for referencing specific response item programmatically.
     *
     * @type {string}
     * @default ''
     */
    id: string;
    /**
     * Specifies whether the response item is disabled.
     * When set to `true`, the response item will be unavailable for selection and execution.
     *
     * @type {boolean}
     * @default false
     */
    disabled: boolean;
    /**
     * Specifies the CSS classes for the icon associated with the item.
     * This allows for styling and representation of icons that are visually linked with the item.
     *
     * @type {string}
     * @default ''
     */
    iconCss: string;
    /**
     * Specifies the display label for the response item.
     * This text is shown in the response menu for the user to identify the response.
     *
     * @type {string}
     * @default ''
     */
    label: string;
    /**
     * Specifies the header text for the response item.
     * This provides a descriptive title or label for the item group.
     *
     * @type {string}
     * @default ''
     */
    groupBy: string;
    /**
     * Specifies the title of the item.
     * This serves as the primary label or heading, providing a brief description of the item's purpose.
     *
     * @type {string}
     * @default ''
     */
    tooltip: string;
}
/**
 * Represents the settings for the command options in the InlineAIAssist component.
 */
export declare class CommandSettings extends ChildProperty<CommandSettings> {
    /**
     * Triggers when a command item is selected in the command menu popup.
     * Use this event to apply the command, modify the prompt, or cancel default behavior.
     *
     * @event itemSelect
     */
    itemSelect: EmitType<CommandItemSelectEventArgs>;
    /**
     * Specifies the collection of command items displayed in the command menu.
     * Specifies the items shown for quick selection in the prompt toolbar.
     *
     * @type {CommandItemModel[]}
     * @default []
     */
    commands: CommandItemModel[];
    /**
     * Specifies the height of the command menu popup.
     * Specifies a CSS height value such as 'auto', '240px', or '50%'.
     *
     * @type {string}
     * @default ''
     */
    popupHeight: string;
    /**
     * SSpecifies the width of the command menu popup.
     * Specifies a CSS width value such as '320px' or '40%'.
     *
     * @type {string}
     * @default ''
     */
    popupWidth: string;
}
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
export declare class ResponseSettings extends ChildProperty<ResponseSettings> {
    /**
     * Triggers when a toolbar item is clicked in the response toolbar.
     * Use this event to handle the action, update UI, or cancel default behavior.
     *
     * @event itemSelect
     */
    itemSelect: EmitType<ResponseItemSelectEventArgs>;
    /**
     * Specifies the collection of toolbar items rendered in the response toolbar.
     * Specifies an array of ResponseItemModel objects for customization and interaction.
     *
     * @type {ResponseItemModel[]}
     * @default null
     */
    items: ResponseItemModel[];
}
/**
 * Represents the settings for the response toolbar in the InlineAIAssist component.
 */
export declare class InlineToolbarSettings extends ChildProperty<InlineToolbarSettings> {
    /**
     * Specifies the position of the footer toolbar in the editor.
     * This property determines whether the toolbar is rendered inline with the content or at the bottom of the edit area.
     *
     * @isenumeration true
     * @default ToolbarPosition.Inline
     * @asptype ToolbarPosition
     */
    toolbarPosition: ToolbarPosition | string;
    /**
     * Specifies the collection of toolbar items rendered in the response toolbar.
     * Specifies an array of ToolbarItemModel objects used for customization and interaction.
     *
     * @type {ToolbarItemModel[]}
     * @default null
     */
    items: ToolbarItemModel[];
    /**
     * Triggers when a toolbar item is clicked in the response toolbar.
     * Use this event to handle the action, update UI, or cancel default behavior.
     *
     * @event itemClick
     */
    itemClick: EmitType<ToolbarItemClickEventArgs>;
}
export declare class InlineAIAssist extends AIAssistBase implements INotifyPropertyChanged {
    /**
     * Specifies the element or CSS selector where the InlineAIAssist will be appended.
     * Accepts either a CSS selector string (e.g., '.container' or '#id') or an HTMLElement.
     * Defaults to document.body.
     *
     * @type {string | HTMLElement}
     * @default 'body'
     */
    target: string | HTMLElement;
    /**
     * Specifies the element relative to which the InlineAIAssist popup is positioned.
     * Accepts a CSS selector string (e.g., '#id' or '.class') or an HTMLElement.
     *
     * @type {string | HTMLElement}
     * @default ''
     */
    relateTo: string | HTMLElement;
    /**
     * Specifies how the AI response is displayed.
     * 'Inline' renders at the caret position; 'Popup' shows above the prompt.
     *
     * @isenumeration true
     * @default ResponseMode.Popup
     * @asptype ResponseMode
     */
    responseMode: ResponseMode | string;
    /**
     * Specifies one or more custom CSS class names for the root element of the component.
     * Specifies multiple classes as a space-separated list.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the current text value of the prompt input field.
     * Specifies the content that will be used to generate the AI response.
     *
     * @type {string}
     * @default ''
     */
    prompt: string;
    /**
     * Specifies the collection of prompts and their corresponding responses.
     * Specifies an array of PromptModel objects used to render the history.
     *
     * @type {PromptResponseModel[]}
     * @default []
     */
    prompts: PromptResponseModel[];
    /**
     * Specifies the placeholder text displayed when the prompt input is empty.
     *  Specifies helper text to guide the user on what to ask or generate.
     *
     * @type {string}
     * @default 'Ask or generate AI content..'
     */
    placeholder: string;
    /**
     * Specifies the locale code used for UI text localization.
     * Specifies culture codes such as 'en-US' or 'ta-IN'.
     *
     * @type {string}
     * @default 'en-US'
     */
    locale: string;
    /**
     * Specifies the height of the popup container.
     * Specifies a value in CSS units (px, %, rem, vh, etc.) or a number in pixels.
     *
     * @type {string | number}
     * @default 'auto'
     * @aspType string
     */
    popupHeight: string | number;
    /**
     * Specifies the width of the popup container.
     * Specifies a value in CSS units (px, %, rem, vw, etc.) or a number in pixels.
     *
     * @type {string | number}
     * @default '400px'
     * @aspType string
     */
    popupWidth: string | number;
    /**
     * Specifies the configuration for available AI commands and suggestions.
     * Specifies options such as enabling/disabling commands and customizing suggestion behavior.
     *
     * @type {CommandSettingsModel | null}
     * @default null
     */
    commandSettings: CommandSettingsModel;
    /**
     * Specifies the configuration for the toolbar displayed with the generated response.
     * Specifies buttons, actions, and behaviors applied to the response area.
     *
     * @type {ResponseSettingsModel | null}
     * @default null
     */
    responseSettings: ResponseSettingsModel;
    /**
     * Specifies the configuration for the toolbar displayed in the inline prompt input.
     * Specifies buttons, shortcuts, and behaviors available while composing the prompt.
     *
     * @type {InlineToolbarSettingsModel | null}
     * @default null
     */
    inlineToolbarSettings: InlineToolbarSettingsModel;
    /**
     * Specifies a custom template (string or function) for rendering AI-generated response content.
     * Specifies that a function receives a ResponseTemplateContext and returns markup or text.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    responseTemplate: string | Function;
    /**
     * Specifies a custom template (string or function) for rendering the prompt input area.
     * Specifies a string template or a function that returns the editor UI markup.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    editorTemplate: string | Function;
    /**
     * Specifies the z-index value applied to the popup or overlay layer.
     * Specifies a higher value to ensure the component appears above surrounding UI.
     *
     * @type {number}
     * @default 1000
     */
    zIndex: number;
    /**
     * Specifies whether right-to-left (RTL) text direction is enabled for the component.
     * Specifies true to render UI elements and text in RTL layout.
     *
     * @type {boolean}
     * @default false
     */
    enableRtl: boolean;
    /**
     * Triggers when the user submits a prompt by pressing Enter or clicking Generate.
     * Use this event to perform the AI request, update UI, or cancel the default processing.
     *
     * @event promptRequest
     */
    promptRequest: EmitType<InlinePromptRequestEventArgs>;
    /**
     * Triggers when the popup or inline response area becomes visible.
     * Use this event to set focus, measure layout, or run analytics.
     *
     * @event open
     */
    open: EmitType<OpenEventArgs>;
    /**
     * Triggers when the popup or inline response area is closed or hidden.
     * Occurs on cancel, Escape key, outside click, or after response insertion.
     *
     * @event close
     */
    close: EmitType<CloseEventArgs>;
    private popupObj;
    private footerToolbarEle;
    private responseContainer;
    private contentWrapper;
    private l10n;
    private sendToolbarItem;
    private isResponseRequested;
    private responseContainerCreated;
    private targetEl;
    private relateToEl;
    private isStopRequested;
    private mentionPopupObj;
    private commandOptionsData;
    private responseOptionsData;
    private skeletonContainer;
    private hasResponse;
    private typingIndicatorEl;
    /**
     * Constructor for creating the component
     *
     * @param {InlineAIAssistModel} options - Specifies the InlineAIAssistModel.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: InlineAIAssistModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    protected getDirective(): string;
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    /**
     * Renders the component
     *
     * @returns {void}
     */
    protected render(): void;
    private initializeLocale;
    private renderPopup;
    private showPopupWithData;
    private showResponsePopup;
    private showCommandMenuPopup;
    private setCommandPopupData;
    private setResponsePopupData;
    private renderMentionPopup;
    private positionMentionPopup;
    private onMentionCommandSelect;
    private resolveTargetElement;
    private resolveRelateToElement;
    private onPopupClose;
    private renderInlineFooter;
    private keyDownHandler;
    private updateEditorTemplate;
    private renderFooterToolbar;
    private isDuplicatedItem;
    private keyUpHandler;
    private wireEvents;
    private unWireEvents;
    private attachPopupEventHandlers;
    private detachPopupEventHandlers;
    private onPopupKeyDown;
    private onPopupOutsideClick;
    private handleInput;
    private onFocusEditableTextarea;
    private onBlurEditableTextarea;
    private showTypingIndicator;
    private hideTypingIndicator;
    private onSendIconClick;
    private respondingStopper;
    private createResponseContainer;
    private renderSkeleton;
    private removeSkeleton;
    private applyPromptChange;
    private refreshTextareaUI;
    private checkAndActivateSendIcon;
    private toggleStopRespondingButton;
    private updateFooterToolbar;
    private keyHandler;
    private footerKeyHandler;
    /**
     * Appends or sets the generated response content in the component.
     * Use this method to manually inject a response from cache, non-streaming APIs, or custom logic.
     *
     * @method addResponse
     * @param {string} response - The response content (plain text or Markdown) to render.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    addResponse(response: string, isFinalUpdate?: boolean): void;
    private streamResponse;
    /**
     * Executes the specified prompt as if the user typed and submitted it.
     * TUse this to run predefined commands, slash-menu actions, or external triggers.
     *
     * @method executePrompt
     * @param {string} prompt - The prompt text to execute; dispatched to the AI backend or via the promptRequest event.
     * @returns {void}
     */
    executePrompt(prompt: string): void;
    /**
     * Opens the popup UI and optionally positions it at the given screen coordinates.
     * When not provided, default positioning (caret/selection/target) is applied.
     *
     * @method showPopup
     * @param {number} [x] - X coordinate in pixels or CSS units (e.g., 300, '300px', '50%').
     * @param {number} [y] - Y coordinate in pixels or CSS units (e.g., 200, '200px', '50%').
     * @returns {void}
     */
    showPopup(x?: number, y?: number): void;
    /**
     * Closes/hides the popup UI or collapses the inline response area.
     * Triggers the close event after the popup is hidden.
     *
     * @method hidePopup
     * @returns {void}
     */
    hidePopup(): void;
    /**
     * Opens the command popup below the prompt input area.
     * Use to display available commands or suggestions for quick selection.
     *
     * @method showCommandPopup
     * @returns {void}
     */
    showCommandPopup(): void;
    /**
     * Hides the command popup displayed below the prompt input area.
     * Call this to dismiss the command chooser without selection.
     *
     * @method hideCommandPopup
     * @returns {void}
     */
    hideCommandPopup(): void;
    private renderResponseWithTemplate;
    private clearResponses;
    destroy(): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param {InlineAIAssistModel} newProp - Specifies new properties
     * @param {InlineAIAssistModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: InlineAIAssistModel, oldProp?: InlineAIAssistModel): void;
}
