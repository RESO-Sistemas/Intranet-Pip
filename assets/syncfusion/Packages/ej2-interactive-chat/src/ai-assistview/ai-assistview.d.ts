/// <reference path="../ai-assist-base/ai-assist-base-model.d.ts" />
import { INotifyPropertyChanged, EmitType } from '@syncfusion/ej2-base';
import { ChildProperty, BaseEventArgs } from '@syncfusion/ej2-base';
import { AIAssistViewModel, PromptModel, ResponseToolbarSettingsModel, PromptToolbarSettingsModel, AssistViewModel, AttachmentSettingsModel, FooterToolbarSettingsModel, SpeechToTextSettingsModel } from './ai-assistview-model';
import { ToolbarItemClickedEventArgs } from '../interactive-chat-base/interactive-chat-base';
import { ToolbarItemModel, ToolbarSettingsModel } from '../interactive-chat-base/interactive-chat-base-model';
import { FileInfo, BeforeUploadEventArgs, StartListeningEventArgs, ErrorEventArgs, TranscriptChangedEventArgs, StopListeningEventArgs, SpeechToTextState } from '@syncfusion/ej2-inputs';
import { ButtonSettingsModel, TooltipSettingsModel } from '@syncfusion/ej2-inputs';
import { AIAssistBase, ToolbarPosition } from '../ai-assist-base/ai-assist-base';
/**
 * The prompts property maps the list of the prompts and binds the data to the suggestions.
 */
export declare class Prompt extends ChildProperty<Prompt> {
    /**
     * Specifies the prompt text.
     * Represents the text used for prompting user input.
     *
     * @type {string}
     * @default null
     */
    prompt: string;
    /**
     * Specifies the response associated with the prompt.
     * Represents the text that provides the response to the prompt.
     *
     * @type {string}
     * @default ''
     */
    response: string;
    /**
     * Indicates if the response is considered helpful.
     * Represents the state of whether the generated response is useful or not.
     *
     * @type {boolean | null}
     * @default null
     */
    isResponseHelpful: boolean;
    /**
     * Specifies the list of files attached within the AI assist view.
     * This property accepts an array of `FileInfo` objects that represent the files to be attached.
     * By providing these files, they will be rendered during the initial rendering of the component.
     *
     * @type {FileInfo}
     * @default null
     */
    attachedFiles: FileInfo[];
}
/**
 * Specifies the type of assist view.
 */
export declare enum AssistViewType {
    /**
     * Represents the default assist view type.
     */
    Assist = "Assist",
    /**
     * Represents a custom assist view type.
     */
    Custom = "Custom"
}
/**
 * The assistView property maps the customized AiAssistView.
 */
export declare class AssistView extends ChildProperty<AssistView> {
    /**
     * Specifies the type of the assist view.
     *
     * @isenumeration true
     * @default AssistViewType.Assist
     * @asptype AssistViewType
     */
    type: string | AssistViewType;
    /**
     * Specifies the name of the assist view.
     * Represents the name displayed in the assist view.
     *
     * @type {string}
     * @default ''
     */
    name: string;
    /**
     * Specifies the icon CSS for the assist view.
     * Represents the CSS class for the icon of the assist view.
     *
     * @type {string}
     * @default null
     */
    iconCss: string;
    /**
     * Specifies the template for the view of the assist view.
     * Represents the template for rendering the view, which can be a string or a function.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    viewTemplate: string | Function;
}
/**
 * Configuration settings for rendering Syncfusion Speech-to-Text in the AssistView footer.
 * This property holds the settings required to initialize and display the Speech-to-Text component.
 *
 */
export declare class SpeechToTextSettings extends ChildProperty<SpeechToTextSettings> {
    /**
     * Specifies whether speech-to-text functionality is enabled.
     *
     * @default false
     */
    enable: boolean;
    /**
     * Specifies whether interim results should be captured during speech recognition.
     *
     * @default true
     */
    allowInterimResults: boolean;
    /**
     * Specifies the language for speech recognition using ISO language codes.
     *
     * @default 'en-US'
     */
    lang: string;
    /**
     * Specifies whether the speech-to-text control is disabled.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Configuration object for the mic button appearance and behavior.
     * Defines the button text, icons, position, and styling for both start and stop states.
     *
     * @type {ButtonSettingsModel}
     * @default {}
     */
    buttonSettings: ButtonSettingsModel;
    /**
     * Specifies whether to show tooltip for the mic button.
     *
     * @default true
     */
    showTooltip: boolean;
    /**
     * Configuration object for tooltip appearance and behavior.
     * Defines the tooltip text and position for both listening and stop states.
     *
     * @type {TooltipSettingsModel}
     * @default {}
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Applies custom CSS classes to the speech-to-text component.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Stores the recognized speech transcript.
     * This property is read-only and updated when speech recognition results are received.
     *
     * @type {string}
     * @default ''
     */
    transcript: string;
    /**
     * Indicates whether the component is currently listening.
     *
     * @default 'Inactive'
     */
    listeningState: SpeechToTextState;
    /**
     * Event raised when speech recognition starts.
     * Triggered when the user clicks the mic button and begins speaking.
     *
     * @event onStart
     */
    onStart: EmitType<StartListeningEventArgs>;
    /**
     * Event raised when speech recognition stops.
     * Triggered when the user stops speaking and clicks the mic button.
     *
     * @event onStop
     */
    onStop: EmitType<StopListeningEventArgs>;
    /**
     * Event raised when the transcript changes during speech recognition.
     * Triggered for both interim results (if enabled) and final results.
     *
     * @event transcriptChanged
     */
    transcriptChanged: EmitType<TranscriptChangedEventArgs>;
    /**
     * Event raised when an error occurs during speech recognition.
     *
     * @event onError
     */
    onError: EmitType<ErrorEventArgs>;
}
/**
 * Represents settings for managing file attachments in the AI Assist View.
 * Includes configuration for URLs, file types, and size limitations.
 */
export declare class AttachmentSettings extends ChildProperty<AttachmentSettings> {
    /**
     * Specifies the URL to save the uploaded files.
     *
     * @type {string}
     * @default ''
     */
    saveUrl: string;
    /**
     * Specifies the URL to remove the files from the server.
     *
     * @type {string}
     * @default ''
     */
    removeUrl: string;
    /**
     * Specifies the allowed file types for attachments.
     *
     * @type {string}
     * @default ''
     */
    allowedFileTypes: string;
    /**
     * Specifies the maximum file size allowed for attachments in bytes.
     *
     * @type {number}
     * @default 2000000
     */
    maxFileSize: number;
    /**
     * Specifies the maximum number of attachments allowed per prompt.
     * Limits the number of files that can be uploaded and attached to a single prompt.
     * Must be a positive integer.
     *
     * @type {number}
     * @default 10
     */
    maximumCount: number;
    /**
     * Event raised when a attachment item is clicked in the assistview component either before sending or after the attachment is sent.
     *
     * @event attachmentClick
     */
    attachmentClick: EmitType<AttachmentClickEventArgs>;
}
/**
 * The promptToolbarSettings property maps the list of the promptToolbarSettings and binds the data to the prompt.
 */
export declare class PromptToolbarSettings extends ChildProperty<PromptToolbarSettings> {
    /**
     * Specifies the width of the prompt toolbar in the AIAssistView component.
     * Represents the width of the toolbar, which can be set using a string value such as 'auto', '100%', or other CSS width values.
     *
     * @type {string}
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies the collection of toolbar items in the prompt toolbar of the AIAssistView component.
     * Represents the list of items to be displayed in the toolbar.
     *
     * @type {ToolbarItemModel[]}
     * @default null
     */
    items: ToolbarItemModel[];
    /**
     * Event raised when a toolbar item is clicked in the prompt toolbar of the AIAssistView component.
     *
     * @event itemClicked
     */
    itemClicked: EmitType<ToolbarItemClickedEventArgs>;
}
/**
 * The responseToolbarSettings property maps the list of the responseToolbarSettings and binds the data to the output items.
 */
export declare class ResponseToolbarSettings extends ChildProperty<ResponseToolbarSettings> {
    /**
     * Specifies the width of the response toolbar in the AIAssistView component.
     * Represents the width of the toolbar, which can be defined using various CSS units and values such as 'auto', '100%', or pixel-based measurements.
     *
     * @type {string}
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies the collection of toolbar items in the response toolbar of the AIAssistView component.
     * Represents an array of items that are rendered in the toolbar, allowing for customization and interaction within the response section.
     *
     * @type {ToolbarItemModel[]}
     * @default null
     */
    items: ToolbarItemModel[];
    /**
     * Event raised when a toolbar item is clicked in the response toolbar of the AIAssistView component.
     *
     * @event itemClicked
     */
    itemClicked: EmitType<ToolbarItemClickedEventArgs>;
}
/**
 * Represents a toolbar item model in the AIAssistview component.
 */
export declare class FooterToolbarSettings extends ChildProperty<FooterToolbarSettings> {
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
     * Specifies the collection of toolbar items in the footer toolbar of the AIAssistView component.
     * Represents the list of items to be displayed in the toolbar.
     *
     * @type {ToolbarItemModel[]}
     * @default null
     */
    items: ToolbarItemModel[];
    /**
     * Event raised when a toolbar item is clicked in the footer toolbar of the AIAssistView component.
     *
     * @event itemClick
     */
    itemClick: EmitType<ToolbarItemClickedEventArgs>;
}
export interface PromptRequestEventArgs extends BaseEventArgs {
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
     * Specifies the toolbar items for the output view in the AIAssistView component.
     * Represents the collection of toolbar items that are displayed alongside the output view, allowing for additional interactions.
     *
     * @type {ToolbarItemModel[]}
     * @default null
     *
     */
    responseToolbarItems?: ToolbarItemModel[];
    /**
     * Specifies the text of the prompt request.
     *
     * @type {string}
     * @default null
     *
     */
    prompt?: string;
    /**
     * Specifies the list of prompt suggestions.
     * Represents an array of suggested prompts that can assist the user.
     *
     * @type {string[]}
     * @default null
     *
     */
    promptSuggestions?: string[];
    /**
     * Specifies the files attached with the prompt request.
     * Represents an array of file information objects for files attached during the prompt request.
     *
     * @type {FileInfo[]}
     * @default []
     *
     */
    attachedFiles?: FileInfo[];
}
export interface PromptChangedEventArgs extends BaseEventArgs {
    /**
     * Specifies the current value of the prompt.
     * Represents the updated text or data of the prompt after the change has occurred.
     *
     * @type {string}
     * @default null
     *
     */
    value?: string;
    /**
     * Specifies the previous value of the prompt before the change.
     *
     * @type {string}
     * @default null
     *
     */
    previousValue?: string;
    /**
     * Specifies the event object associated with the prompt change.
     * Represents the underlying event that triggered the prompt change, useful for additional event details or handling.
     *
     * @type {Event}
     */
    event?: Event;
    /**
     * Specifies the HTML element of the text area container.
     * Represents the DOM element that contains the text area, allowing for direct manipulation or reference.
     *
     * @type {HTMLElement}
     */
    element?: HTMLElement;
}
export interface StopRespondingEventArgs extends BaseEventArgs {
    /**
     * Specifies the event object associated with the stop responding action.
     * Represents the underlying event that triggered the action.
     *
     * @type {Event}
     * @default null
     */
    event?: Event;
    /**
     * Specifies the prompt text associated with the request.
     * Represents the input prompt for which the response was being generated.
     *
     * @type {string}
     * @default ''
     *
     */
    prompt?: string;
    /**
     * Specifies the index of the prompt in the prompt list.
     * Represents the position of the prompt in the stored collection.
     *
     * @type {number}
     * @default -1
     */
    dataIndex?: number;
}
export interface AttachmentClickEventArgs extends BaseEventArgs {
    /**
     * Specifies the event object associated with the click event args.
     * Represents the underlying event that triggered the action, providing details about the event.
     *
     * @type {Event}
     * @default null
     *
     */
    event?: Event;
    /**
     * Represents the file that is intended to be previewed.
     * This property holds a `file` object containing all relevant details of the file. It can be canceled or previewed before the message is sent.
     *
     * @type {FileInfo}
     * @default null
     *
     */
    file?: FileInfo;
}
/**
 * The `AIAssistView` component is designed to enhance user interaction by integrating AI driven assistance features.
 * It provides a seamless interface for incorporating suggestions & AI responses.
 *
 * ```html
 *  <div id='defaultAIAssistView'></div>
 * ```
 * ```typescript
 *  let aiAssistObj: AIAssistView = new AIAssistView();
 *  aiAssistObj.appendTo('#defaultAIAssistView');
 * ```
 */
export declare class AIAssistView extends AIAssistBase implements INotifyPropertyChanged {
    /**
     * Specifies the text input prompt for the AIAssistView component.
     *
     * @type {string}
     * @default ''
     */
    prompt: string;
    /**
     * Specifies the placeholder text for the prompt input text area in the AIAssistView component.
     *
     * @type {string}
     * @default 'Type prompt for assistance...'
     */
    promptPlaceholder: string;
    /**
     * Specifies the collection of prompts and their responses in the AIAssistView component.
     *
     * {% codeBlock src='ai-assistview/prompts/index.md' %}{% endcodeBlock %}
     *
     * @type {PromptModel[]}
     * @default []
     */
    prompts: PromptModel[];
    /**
     * Specifies the list of prompt suggestions in the AIAssistView component.
     * Contains suggestions that can be used as prompts.
     *
     * {% codeBlock src='ai-assistview/promptSuggestions/index.md' %}{% endcodeBlock %}
     *
     * @type {string[]}
     * @default null
     */
    promptSuggestions: string[];
    /**
     * Specifies the header text for the prompt suggestions in the AIAssistView component. Provides a header for the list of suggestions.
     *
     * @type {string}
     * @default ''
     */
    promptSuggestionsHeader: string;
    /**
     * Specifies whether the header is displayed in the AIAssistView component.
     *
     * @type {boolean}
     * @default true
     */
    showHeader: boolean;
    /**
     * Specifies the toolbar settings for the AIAssistView component.
     * Represents the configuration for toolbar items and actions within the component.
     *
     * {% codeBlock src='ai-assistview/toolbarSettings/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Specifies the index of the active view in the AIAssistView component.
     * Determines the currently active and visible view.
     *
     * @type {number}
     * @default 0
     * @aspType int
     */
    activeView: number;
    /**
     * Specifies the CSS class for the prompter avatar in the AIAssistView component. Allows custom styling for the prompt avatar.
     *
     * @type {string}
     * @default null
     */
    promptIconCss: string;
    /**
     * Specifies the CSS class for the responder avatar in the AIAssistView component. Allows custom styling for the responder avatar.
     *
     * @type {string}
     * @default null
     */
    responseIconCss: string;
    /**
     * Specifies the width of the AIAssistView component.
     *
     * @type {string | number}
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies the height of the AIAssistView component.
     *
     * @type {string | number}
     * @default '100%'
     * @aspType string
     */
    height: string | number;
    /**
     * Specifies custom CSS classes for the AIAssistView component. Allows for additional custom styling.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the collection of assist view models in the AIAssistView component.
     * Represents the views available in the assist view.
     *
     * {% codeBlock src='ai-assistview/views/index.md' %}{% endcodeBlock %}
     *
     * @type {AssistViewModel[]}
     * @default null
     */
    views: AssistViewModel[];
    /**
     * Specifies the settings for the prompt toolbar in the AIAssistView component.
     * Represents the configuration for the toolbar associated with prompt items.
     *
     * {% codeBlock src='ai-assistview/promptToolbarSettings/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    promptToolbarSettings: PromptToolbarSettingsModel;
    /**
     * Specifies the settings for the response toolbar in the AIAssistView component.
     * Represents the configuration for the toolbar associated with response items.
     *
     * {% codeBlock src='ai-assistview/responseToolbarSettings/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    responseToolbarSettings: ResponseToolbarSettingsModel;
    /**
     * Configuration object for rendering a Syncfusion Toolbar in the footer.
     * This property holds the settings required to initialize and display a custom Syncfusion Toolbar in the input field.
     *
     * @type {FooterToolbarSettingsModel | null}
     * @default null
     */
    footerToolbarSettings: FooterToolbarSettingsModel;
    /**
     * Configuration object for rendering Speech-to-Text in the AssistView footer.
     * This property holds the settings required to initialize and display the Speech-to-Text component.
     *
     * @type {SpeechToTextSettingsModel}
     * @default { enable: false }
     */
    speechToTextSettings: SpeechToTextSettingsModel;
    /**
     * Specifies whether the attachments is enabled in the AIAssistView component.
     *
     * @type {boolean}
     * @default false
     */
    enableAttachments: boolean;
    /**
     * Specifies the settings for the attachments in the AIAssistView component.
     * Represents the configuration for the uploader associated with footer.
     *
     *
     * @default null
     */
    attachmentSettings: AttachmentSettingsModel;
    /**
     * Specifies whether the clear button of text area is displayed in the AIAssistView component.
     * Determines if a button for clearing the prompt text area is shown or hidden.
     *
     * @type {boolean}
     * @default false
     */
    showClearButton: boolean;
    /**
     * Specifies whether to show a scroll-to-bottom indicator (typically a floating icon/button) when the user has scrolled up away from the latest message in the AI AssistView.
     *
     * By default, when enabled (`true`), the button appears automatically when the scroll position is not at the bottom. Clicking on it scrolls smoothly to the bottom and hides the button.
     *
     * When disabled(`false`), the users must manually scroll back down to see the latest messages/responses.
     *
     * @type {boolean}
     * @default true
     */
    enableScrollToBottom: boolean;
    /**
     * Specifies the template for the footer in the AIAssistView component.
     * Defines the content or layout used to render the footer. Can be a string or a function.
     *
     * {% codeBlock src='ai-assistview/footerTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    footerTemplate: string | Function;
    /**
     * Specifies the template for rendering prompt items in the AIAssistView component.
     * Defines the content or layout used to render prompt items, and can be either a string or a function.
     * The template context includes prompt text and toolbar items.
     *
     * {% codeBlock src='ai-assistview/promptItemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    promptItemTemplate: string | Function;
    /**
     * Specifies the template for rendering response items in the AIAssistView component.
     * Defines the content or layout used to render response items, and can be either a string or a function.
     * The template context includes the prompt text, response text, and toolbar items.
     *
     * {% codeBlock src='ai-assistview/responseItemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    responseItemTemplate: string | Function;
    /**
     * Specifies the template for rendering prompt suggestion items in the AIAssistView component.
     * Defines the content or layout used to render prompt suggestion items, and can be either a string or a function.
     * The template context includes the index and suggestion text.
     *
     * {% codeBlock src='ai-assistview/suggestionItemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    promptSuggestionItemTemplate: string | Function;
    /**
     * Specifies the template for the banner in the AIAssistView component.
     * Represents the content or layout used to render the banner. Can be a string or a function.
     *
     * {% codeBlock src='ai-assistview/bannerTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    bannerTemplate: string | Function;
    /**
     * Event triggered when a prompt request is made in the AIAssistView component.
     * Provides details about the prompt request, including whether it should be cancelled, the prompt text, output, and toolbar items.
     *
     * @event promptRequest
     */
    promptRequest: EmitType<PromptRequestEventArgs>;
    /**
     * Event triggered when the prompt text changed in the AIAssistView component.
     *
     * @event 'promptChanged'
     */
    promptChanged: EmitType<PromptChangedEventArgs>;
    /**
     * Triggers when the 'Stop Responding' button is clicked while a prompt request is in progress.
     * This event allows users to handle stopping the response generation and update the UI accordingly.
     *
     * @event stopRespondingClick
     */
    stopRespondingClick: EmitType<StopRespondingEventArgs>;
    /**
     * Event triggered before an attachment upload is initiated.
     * Provides details about the file to be uploaded.
     *
     * @event beforeAttachmentUpload
     */
    beforeAttachmentUpload: EmitType<BeforeUploadEventArgs>;
    /**
     * Event triggered on successful attachment upload.
     * Provides details about the uploaded file.
     *
     * @event attachmentUploadSuccess
     */
    attachmentUploadSuccess: EmitType<object>;
    /**
     * Event triggered on attachment upload failure.
     * Provides details about the failed file and error message.
     *
     * @event attachmentUploadFailure
     */
    attachmentUploadFailure: EmitType<object>;
    /**
     * Event triggered when an attachment is removed.
     * Provides details about the removed file.
     *
     * @event attachmentRemoved
     */
    attachmentRemoved: EmitType<object>;
    private l10n;
    private viewWrapper;
    private outputElement;
    private skeletonContainer;
    private aiAssistViewRendered;
    private outputSuggestionEle;
    private contentFooterEle;
    private contentWrapper;
    private responseToolbarEle;
    private assistViewTemplateIndex;
    private toolbarHeader;
    private assistCustomSection;
    private toolbarItems;
    private toolbar;
    private displayContents;
    private previousElement;
    private isOutputRenderingStop;
    private promptToolbarEle;
    private isAssistView;
    private outputContentBodyEle;
    private preTagElements;
    private isResponseRequested;
    private lastStreamPrompt;
    private uploadedFiles;
    private uploaderObj;
    private speechToTextObj;
    private dropArea;
    private footerToolbarEle;
    private sendToolbarItem;
    private clearToolbarItem;
    private attachmentToolbarItem;
    private speechToTextToolbarItem;
    private latestResponseMinHeight;
    private downArrowIcon;
    /**
     * Enhanced setup: Enforce viewport on .e-content + dynamic min-height on latest .e-output-container.
     * Preserves structure; only inline styles on existing elements. Scrolls to prompt top.
     * Also applies during loading by sizing the skeleton container when the final response item
     * isn't rendered yet.
     *
     * @private
     * @returns {void}
     */
    private setupViewportFilling;
    private renderContentElement;
    private handleScroll;
    private toggleScrollIcon;
    private scrollBtnClick;
    /**
     * Constructor for creating the component
     *
     * @param {AIAssistViewModel} options - Specifies the AIAssistViewModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: AIAssistViewModel, element?: string | HTMLElement);
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
    protected render(): void;
    private renderPromptView;
    private renderToolbar;
    private renderViews;
    private renderHeaderToolbar;
    private updateHeaderToolbar;
    private getIndex;
    private updateActiveView;
    private appendView;
    private removePreviousView;
    private renderDefaultView;
    private checkIsScrollable;
    private initializeLocale;
    private toggleStopRespondingButton;
    private hasStopResponseButton;
    private renderContent;
    private renderOutputContent;
    private updateBannerView;
    private renderAssistViewFooter;
    private renderFooterToolbar;
    private isDuplicatedItem;
    private updateAttachmentElement;
    private renderSpeechToText;
    private renderAttachmentIcon;
    private showFailureAlert;
    private createFailureAlert;
    private onUploadStart;
    private onUploadProgress;
    private onUploadSuccess;
    private cleanupFileItem;
    private onUploadFailure;
    private createFileItem;
    private handleAttachmentPreview;
    private handleRemoveUploadedFile;
    private applyPromptChange;
    private handleInput;
    private triggerPromptChanged;
    private footerKeyHandler;
    private bindScroll;
    private unBindScroll;
    private wireEvents;
    private unWireEvents;
    private onFocusEditableTextarea;
    private onBlurEditableTextarea;
    private detachCodeCopyEventHandler;
    private keyHandler;
    private clearIconHandler;
    private respondingStopper;
    private onSuggestionClick;
    private onSendIconClick;
    private clearUploadedFiles;
    private addPrompt;
    private getContextObject;
    private createOutputElement;
    private renderOutputContainer;
    private renderOutput;
    private renderOutputTextContainer;
    private renderPreTag;
    private getCopyHandler;
    private renderOutputToolbarItems;
    private renderResponseToolbar;
    private handleItemClick;
    private renderPrompt;
    private renderPromptToolbar;
    private renderSkeleton;
    private onEditIconClick;
    private refreshTextareaUI;
    private checkAndActivateSendIcon;
    private toggleClearIcon;
    private updateIcons;
    private updateToolbarSettings;
    private updateAttachmentToolbarItemInSettings;
    private updateClearToolbarItemInSettings;
    private updateFooterToolbar;
    private updateResponse;
    private streamResponse;
    private updateBannerTemplate;
    private updatePromptSuggestionTemplate;
    private updateFooterTemplate;
    private updateAttachmentSettings;
    private handleSTTDynamicChange;
    private updateSpeechToTextSettings;
    private updateLocale;
    destroy(): void;
    private destroyAssistView;
    /**
     * Executes the specified prompt in the AIAssistView component. The method accepts a string representing the prompt.
     *
     * @param {string} prompt - The prompt text to be executed. It must be a non-empty string.
     *
     * @returns {void}
     */
    executePrompt(prompt: string): void;
    /**
     * Adds a response to the last prompt or appends a new prompt data in the AIAssistView component.
     *
     * @param {string | Object} outputResponse - The response to be added. Can be a string representing the response or an object containing both the prompt and the response.
     * - If `outputResponse` is a string, it updates the response for the last prompt in the prompts collection.
     * - If `outputResponse` is an object, it can either update the response of an existing prompt if the prompt matches or append a new prompt data.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    addPromptResponse(outputResponse: string | Object, isFinalUpdate?: boolean): void;
    /**
     * Scrolls the view to the bottom to display the most recent response in the AIAssistView component.
     *
     * This method programmatically scrolls the view to the bottom,
     * typically used when new responses are added or to refocus on the latest response.
     *
     * @returns {void}
     */
    scrollToBottom(): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistViewModel} newProp - Specifies new properties
     * @param  {AIAssistViewModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: AIAssistViewModel, oldProp?: AIAssistViewModel): void;
}
