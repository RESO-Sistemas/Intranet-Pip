/// <reference path="../interactive-chat-base/interactive-chat-base-model.d.ts" />
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ChildProperty, EmitType, BaseEventArgs } from '@syncfusion/ej2-base';
import { InterActiveChatBase } from '../interactive-chat-base/interactive-chat-base';
import { ToolbarItemModel, ToolbarSettingsModel } from '../interactive-chat-base/interactive-chat-base-model';
import { ChatUIModel, MessageModel, UserModel, MessageStatusModel, MessageReplyModel, MessageToolbarSettingsModel, FileAttachmentSettingsModel } from './chat-ui-model';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { FieldSettingsModel } from '@syncfusion/ej2-dropdowns';
import { BeforeUploadEventArgs, FailureEventArgs, FileInfo, RemovingEventArgs, SuccessEventArgs } from '@syncfusion/ej2-inputs';
/**
 * Specifies that the attachment will be saved as a Blob object.
 * This format is used for storing binary data.
 *
 * Specifies that the attachment will be saved as a Base64-encoded string.
 * This format is used for storing data as a text representation.
 *
 */
export declare type SaveFormat = 'Base64' | 'Blob';
export declare class MessageStatus extends ChildProperty<MessageStatus> {
    /**
     * Specifies the icon CSS class for the message status shown in messages.
     * This property represents the CSS class applied to the icons in the sent message, allowing for customization of the status icon's appearance.
     *
     * @type {string}
     * @default ''
     */
    iconCss: string;
    /**
     * Specifies the text associated with the message status.
     * This property holds the textual representation of the message status, such as "Sent", "Received", or "Read", providing users with clear status updates.
     *
     * @type {string}
     * @default ''
     */
    text: string;
    /**
     * Specifies the tooltip text for the message status icon.
     * This property provides additional information about the message status when the user hovers over the status icon, enhancing the user experience with context.
     *
     * @type {string}
     * @default ''
     */
    tooltip: string;
}
/**
 * Represents a user model for a messages in the chatUI component.
 */
export declare class User extends ChildProperty<User> {
    /**
     * Specifies the unique identifier for each user in the Chat UI component.
     * Represents a string that uniquely identifies a user for tracking and managing individual users within the chat.
     *
     * @type {string}
     * @default '''
     */
    id: string;
    /**
     * Represents the display name of the user in the Chat UI component.
     *
     * @type {string}
     * @default 'Default'
     */
    user: string;
    /**
     * Specifies the URL of the user's avatar image.
     * If the URL is not provided, the user's first and last name initial letters will be used as the avatar.
     *
     * @type {string}
     * @default ''
     */
    avatarUrl: string;
    /**
     * Defines the background color for the user's avatar in the Chat UI component.
     * This property accepts a color in hexadecimal format (e.g., `#FFFFFF` for white), allowing for custom styling of the avatar's background.
     *
     * @type {string}
     * @default ''
     */
    avatarBgColor: string;
    /**
     * Represents additional CSS classes to style the user's messages in the Chat UI component.
     * This property allows for custom styling by accepting one or more class names as a string.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the CSS class for the status bar icon in the Chat UI component.
     * This allows customization of the status icon's appearance using custom styles.
     *
     * @type {string}
     * @default ''
     */
    statusIconCss: string;
}
/**
 * Configures the toolbar displayed on each message in the Chat UI component.
 */
export declare class MessageToolbarSettings extends ChildProperty<MessageToolbarSettings> {
    /**
     * Specifies the width of the message toolbar in the Chat UI component.
     * Represents the width of the toolbar, which can be defined using various CSS units and values such as 'auto', '100%', or pixel-based measurements.
     *
     * @type {string}
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies the collection of toolbar items in the message toolbar of the Chat UI component.
     * Represents an array of items that are rendered in the toolbar, allowing for customization and interaction within the response section.
     *
     * @type {ToolbarItemModel[]}
     * @default null
     */
    items: ToolbarItemModel[];
    /**
     * Event raised when a toolbar item is clicked in the message toolbar of the Chat UI component.
     *
     * @event itemClicked
     */
    itemClicked: EmitType<MessageToolbarItemClickedEventArgs>;
}
/**
 *  Represents a model for a reply messages in the chatUI component.
 */
export declare class MessageReply extends ChildProperty<MessageReply> {
    /**
     * Specifies the author of the message in the Chat UI component.
     * This property references a `UserModel` object that contains details about the user who sent the message.
     *
     * @default null
     */
    user: UserModel;
    /**
     * Represents the content of the message sent by a user in the Chat UI component.
     *
     * @type {string}
     * @default ''
     */
    text: string;
    /**
     * Represents the mentioned Users of the message sent by the replied user in the Chat UI component.
     *
     * @type {UserModel[]}
     * @default []
     */
    mentionUsers: UserModel[];
    /**
     * Represents the id of the message sent by the replied user in the Chat UI component.
     *
     * @type {string}
     * @default ''
     */
    messageID: string;
    /**
     * Specifies the timestamp of when the replied message was sent.
     * This property holds a `Date` object that represents the exact time the message was created, providing context to the conversation flow.
     *
     * @type {Date}
     * @default ''
     */
    timestamp: Date;
    /**
     * Specifies the format of the timestamp for displaying the reply message's sending time.
     * If empty, the format is determined by the application's culture settings.
     * Supports format strings like 'dd/MM/yyyy hh:mm'.
     *
     * @type {string}
     * @default ''
     */
    timestampFormat: string;
    /**
     * Represents the attached files of the message sent by a user in the Chat UI component.
     *
     * @type {FileInfo}
     * @default null
     */
    attachedFile: FileInfo;
}
/**
 *  Represents a model for a messages in the chatUI component.
 */
export declare class Message extends ChildProperty<Message> {
    /**
     * Specifies the unique identifier for each message sent in the Chat UI component.
     * Represents a string that uniquely identifies a message for tracking and managing individual messages within the chat.
     *
     * @type {string}
     * @default '''
     */
    id: string;
    /**
     * Represents the content of the message sent by a user in the Chat UI component.
     *
     * @type {string}
     * @default ''
     */
    text: string;
    /**
     * Specifies the author of the message in the Chat UI component.
     * This property references a `UserModel` object that contains details about the user who sent the message.
     *
     * @default null
     */
    author: UserModel;
    /**
     * Specifies the timestamp of when the message was sent.
     * This property holds a `Date` object that represents the exact time the message was created, providing context to the conversation flow.
     *
     * @type {Date}
     * @default ''
     */
    timeStamp: Date;
    /**
     * Specifies the format of the timestamp for displaying the message's sending time.
     * By default, the format is set based on the culture of the application.
     * You can customize the format using a specific pattern, such as "'dd/MM/yyyy hh:mm'" in string format.
     *
     * @type {string}
     * @default ''
     */
    timeStampFormat: string;
    /**
     * Specifies the status of the message in the Chat UI component.
     * Represents the current status of the message, such as sent, received, or read. It helps in tracking the messages within the chat component.
     *
     * @default null
     */
    status: MessageStatusModel;
    /**
     * Specifies whether the message is pinned.
     * When set to true, the message will be visually highlighted and can appear in the pinned messages section.
     *
     * @type {boolean}
     * @default false
     */
    isPinned: boolean;
    /**
     * Specifies the reference to the original message when this message is a reply.
     * Contains the `MessageReplyModel` of the message being replied to.
     *
     * @default null
     */
    replyTo: MessageReplyModel;
    /**
     * Specifies whether the message has been forwarded.
     * When set to true, the message is visually marked as forwarded.
     *
     * @type {boolean}
     * @default false
     */
    isForwarded: boolean;
    /**
     * Specifies the list of files attached within the Chat UI.
     * This property accepts an array of FileInfo objects that represent the files to be attached.
     * By providing these files, they will be rendered during the initial rendering of the component.
     *
     * @type {FileInfo}
     * @default null
     */
    attachedFile: FileInfo;
    /**
     * Represents an array of users mentioned in the message.
     * This field contains the list of users referenced via the @mention feature in the message text, populated when mentions are selected from the suggestion popup.
     * The field is optional and defaults to an empty array if no mentions are included in the message.
     *
     * @type {UserModel[]}
     * @default []
     */
    mentionUsers: UserModel[];
}
export declare class FileAttachmentSettings extends ChildProperty<FileAttachmentSettings> {
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
     * Specifies the path for storing and displaying images.
     * If both `saveFormat` and `path` are configured, the `path` property takes priority.
     *
     * @type {string}
     * @default ''
     */
    path: string;
    /**
     *  Specifies the format in which the attachment will be saved.
     *  Accepts values such as 'Blob' or other supported formats.
     *
     * @type {SaveFormat}
     * @default 'Blob'
     */
    saveFormat: SaveFormat;
    /**
     * Specifies the allowed file types for attachments.
     * Accepts a comma-separated string (e.g., ".jpg,.png").
     *
     * @type {string}
     * @default ''
     */
    allowedFileTypes: string;
    /**
     * Specifies the maximum file size (in bytes) for attachments.
     * Prevents uploading files larger than this size.
     *
     * @type {number}
     * @default 30000000
     */
    maxFileSize: number;
    /**
     * Specifies whether drag and drop is enabled for attachments.
     * Allows users to drag files into the upload area.
     *
     * @type {boolean}
     * @default true
     */
    enableDragAndDrop: boolean;
    /**
     * Specifies the maximum number of attachments allowed per message.
     * Limits the number of files that can be uploaded and attached to a single message.
     * Must be a positive integer.
     *
     * @type {number}
     * @default 10
     */
    maximumCount: number;
    /**
     * Specifies a custom template for rendering attachment previews.
     * Accepts a string or function to define the HTML structure or rendering logic for attachment previews (e.g., thumbnails, icons, file metadata).
     * If not provided, the default preview will be rendered.
     *
     * @default ''
     * @angularType string | object | HTMLElement
     * @reactType string | function | JSX.Element | HTMLElement
     * @vueType string | function | HTMLElement
     * @aspType string
     */
    previewTemplate: string | Function;
    /**
     * Specifies a custom template for rendering attachments in footer.
     * Accepts a string or function to define the HTML structure or rendering logic for attachments (e.g., thumbnails, icons, file metadata).
     * If not provided, the default attachments will be rendered.
     *
     * @default ''
     * @angularType string | object | HTMLElement
     * @reactType string | function | JSX.Element | HTMLElement
     * @vueType string | function | HTMLElement
     * @aspType string
     */
    attachmentTemplate: string | Function;
    /**
     * Event raised when a attachment item is clicked in the Chat UI component wither before sending or after the attachment is sent.
     *
     * @event attachmentClick
     */
    attachmentClick: EmitType<ChatAttachmentClickEventArgs>;
}
export interface ChatAttachmentClickEventArgs extends BaseEventArgs {
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
     * Indicates whether rendering preview should be canceled.
     * Setting this boolean property to `true` will prevent the preview rendering.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel?: boolean;
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
export interface MessageSendEventArgs extends BaseEventArgs {
    /**
     * Indicates whether the message sending action should be canceled.
     * Setting this boolean property to `true` will prevent the message from being sent, allowing for validation or modification before the final send.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel?: boolean;
    /**
     * Represents the message that is intended to be sent.
     * This property holds a `MessageModel` object containing all relevant details of the message, including content, author, and timestamp. It can be modified before the message is sent.
     *
     * @type {MessageModel}
     * @default null
     *
     */
    message?: MessageModel;
}
export interface TypingEventArgs extends BaseEventArgs {
    /**
     * Represents the current user in the Chat UI component.
     * This property holds the user information, such as username and other relevant details.
     *
     * @type {UserModel}
     * @default null
     *
     */
    user?: UserModel;
    /**
     * Represents the content of the message sent by a user in the Chat UI component.
     *
     * @type {string}
     * @default ''
     */
    message?: string;
    /**
     * Specifies the event object associated with the input event args.
     * Represents the underlying event that triggered the action, providing details about the event.
     *
     * @type {Event}
     * @default null
     *
     */
    event?: Event;
    /**
     * Specifies the whether the user is typing in the chat UI component.
     * Returns `true`, when the user ends typing and `false` when the message is sent or user value is cleared.
     *
     * @type {boolean}
     * @default false
     *
     */
    isTyping?: boolean;
}
export interface MentionSelectEventArgs extends BaseEventArgs {
    /**
     * Specifies whether the default mention insertion behavior should be canceled.
     * Set to `true` to prevent the selected mention from being inserted into the chat input field, allowing custom handling of the mention selection.
     *
     * @type {boolean}
     * @default false
     */
    cancel?: boolean;
    /**
     * The native event that triggered the mention selection.
     * This can be a mouse event (e.g., clicking a user in the suggestion popup), a keyboard event (e.g., pressing Enter to select), or a touch event (e.g., tapping on a mobile device).
     * Provides access to low-level event details for advanced use cases, such as determining the input method or coordinates.
     *
     * @type {MouseEvent | KeyboardEvent | TouchEvent}
     */
    event?: MouseEvent | KeyboardEvent | TouchEvent;
    /**
     * Indicates whether the mention selection was triggered by user interaction.
     * Set to `true` if the selection resulted from a user action (e.g., mouse click, keyboard Enter, or touch tap), or `false` if triggered programmatically or by other means.
     *
     * @type {boolean}
     * @default false
     */
    isInteracted?: boolean;
    /**
     *  Returns the selected item data from the data source.
     *  This property provides access to all fields and values of the currently selected item.
     *
     * @type {FieldSettingsModel}
     * @default {}
     */
    itemData?: FieldSettingsModel;
}
/**
 * Represents the event arguments for a toolbar item click event in the component.
 */
export interface MessageToolbarItemClickedEventArgs extends BaseEventArgs {
    /**
     * Specifies the toolbar item that was clicked.
     * Represents the model of the toolbar item that triggered the click event.
     *
     * @type {ToolbarItemModel}
     * @default null
     *
     */
    item?: ItemModel;
    /**
     * Specifies the message that was clicked.
     *
     * @type {MessageModel}
     * @default null
     *
     */
    message?: MessageModel;
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
}
export declare class ChatUI extends InterActiveChatBase implements INotifyPropertyChanged {
    /**
     * Specifies the width of the Chat UI component.
     *
     * @type {string | number}
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies the height of the Chat UI component.
     *
     * @type {string | number}
     * @default '100%'
     * @aspType string
     */
    height: string | number;
    /**
     * Represents the current user interacting with the Chat UI.
     * Uses the `UserModel` object, which contains current user information.
     * Messages from the current user are displayed on the right side of the Chat UI for differentiation from other participants.
     *
     * @default null
     */
    user: UserModel;
    /**
     * Specifies the header text to be displayed in the Chat UI component.
     * This property defines the text that appears in the header, which can indicate the current participant's username or the group name, providing context for the conversation.
     *
     * @type {string}
     * @default 'Chat'
     */
    headerText: string;
    /**
     * Specifies the CSS class for the header icon in the Chat UI component.
     * This property allows for custom styling of the header icon.
     *
     * @type {string}
     * @default ''
     */
    headerIconCss: string;
    /**
     * Specifies the placeholder text for the message input textarea in the Chat UI component.
     *
     * @type {string}
     * @default 'Type your message…'
     */
    placeholder: string;
    /**
     * Specifies custom CSS classes for the Chat UI component.
     * This property enables the application of additional styling options to customize the visual appearance of the chat interface.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies whether the header is displayed in the Chat UI component.
     * This property controls the visibility of the header, allowing users to show or hide it as needed.
     * When set to `false`, the header will be hidden from view.
     *
     * @type {boolean}
     * @default true
     */
    showHeader: boolean;
    /**
     * Specifies whether to show or hide footer in the Chat UI component.
     * When set to `true`, the footer will be visible in the Chat UI component. If `false`, the footer will be hidden.
     *
     * @type {boolean}
     * @default true
     */
    showFooter: boolean;
    /**
     * Specifies the header toolbar settings for the Chat UI component.
     * Represents the configuration for toolbar items and actions within the component.
     *
     * @default null
     */
    headerToolbar: ToolbarSettingsModel;
    /**
     * Specifies the list of message suggestions displayed above the input textarea in the Chat UI component.
     * This property represents an array of suggestions that can assist the user in composing messages, providing quick replies.
     *
     * @type {string[]}
     * @default null
     */
    suggestions: string[];
    /**
     * Specifies whether time breaks are enabled for grouping chat messages by date.
     * When set to `true`, messages will be grouped based on their timestamp, creating date-wise separators within the chat.
     *
     * @type {boolean}
     * @default false
     */
    showTimeBreak: boolean;
    /**
     * Specifies a collection of messages within the Chat UI component.
     * Each message is represented by a MessageModel object, containing properties such as text, author, timestamp, and status.
     *
     * @type {MessageModel[]}
     * @default null
     */
    messages: MessageModel[];
    /**
     * Specifies a list of users who are currently typing in the chat.
     * This property is updated to indicate active participants typing responses.
     *
     * @type {UserModel[]}
     * @default null
     * @aspType List<ChatUIUser>
     */
    typingUsers: UserModel[];
    /**
     * Specifies the format of the value that to be displayed in component.
     * By default, the format will be set based on the culture. You can set the format to "format:'dd/MM/yyyy hh:mm a'" in string.
     *
     * @type {string}
     * @default 'dd/MM/yyyy hh:mm a'
     */
    timeStampFormat: string;
    /**
     * Specifies whether timestamps are displayed alongside each message in the Chat UI component.
     * When set to true, timestamps will appear with each message, helping users track the timing of conversations.
     *
     * @type {boolean}
     * @default true
     */
    showTimeStamp: boolean;
    /**
     * Specifies whether the UI should automatically scroll to the bottom when a new message is added to the Chat UI component.
     * When set to `true`, the chat will automatically scroll to display the latest message, ensuring that users can see new messages without manual intervention.
     *
     * @type {boolean}
     * @default false
     */
    autoScrollToBottom: boolean;
    /**
     * Enables on-demand loading of messages, typically triggered as the user scrolls through the chat history.
     * When set to `true`, older messages will load progressively, improving performance for large message histories by avoiding initial loading of all messages.
     *
     * @type {boolean}
     * @default false
     */
    loadOnDemand: boolean;
    /**
     * Specifies the list of users available for mention in the chat UI.
     * This property defines an array of user objects that populate the @mention suggestion popup when the mention trigger character is typed.
     * When typing the `mentionTriggerChar` (e.g., '@') followed by characters filters this list to show matching users.
     *
     * @type {UserModel[]}
     * @default null
     * @aspType List<ChatUIUser>
     */
    mentionUsers: UserModel[];
    /**
     * Specifies the character that triggers the @mention suggestion popup in the chat input.
     * The trigger character must be a single character, such as '@' or '#', and is case-sensitive in the input.
     *
     * @type {string}
     * @default '@'
     */
    mentionTriggerChar: string;
    /**
     * Specifies the template for rendering suggestion items in the Chat UI component.
     * Defines the content or layout used to render suggestion items, and can be either a string or a function.
     * The template context includes the index and suggestion text.
     *
     * @type {string | Function}
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    suggestionTemplate: string | Function;
    /**
     * Specifies the template for the footer area in the Chat UI component.
     * Defines the content or layout used to render the footer, which can be provided as a string or a function.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    footerTemplate: string | Function;
    /**
     * Specifies the template for rendering the empty state of the Chat UI component.
     * This property can accept either a string or a function to customize the appearance when there are no messages to display in the chat.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    emptyChatTemplate: string | Function;
    /**
     * Specifies the template for rendering individual messages in the Chat UI component.
     * This property can accept either a string or a function to customize the appearance of messages. The template context includes message and index.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    messageTemplate: string | Function;
    /**
     * Defines a custom template for rendering time breaks in the Chat UI component.
     * Accepts a string or function that formats the appearance of date-based separators, allowing customization of how messages are visually grouped by date.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    timeBreakTemplate: string | Function;
    /**
     * Template for displaying users currently typing in the chat interface.
     * Accepts a string or function to customize the display format.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    typingUsersTemplate: string | Function;
    /**
     * Enables the compact mode layout in the Chat UI component.
     * When enabled, all messages are aligned to the left side regardless of the sender, creating a simplified chat view.
     * This mode is useful for dense group conversations or compact displays (e.g., mobile,embedded).
     * Example: `compactMode: true`
     *
     * @type {boolean}
     * @default false
     */
    enableCompactMode: boolean;
    /**
     * Specifies the settings for the message toolbar in the Chat UI component.
     * Configures the toolbar options associated with each message such as Reply, Forward, Copy, Pin, and Delete.
     * If 'items' is not provided, default toolbar actions ['Copy', 'Reply', 'Pin', 'Delete'] will be rendered.
     *
     * @default []
     */
    messageToolbarSettings: MessageToolbarSettingsModel;
    /**
     * Event triggered when a message is about to be sent in the Chat UI component.
     * This event allows for cancelling the send action if needed.
     *
     * @event messageSend
     */
    messageSend: EmitType<MessageSendEventArgs>;
    /**
     * Event triggered when the user is typing a message in the Chat UI component.
     * This event provides updates on the user's typing status.
     *
     * @event userTyping
     */
    userTyping: EmitType<TypingEventArgs>;
    /**
     * Triggered when a user selects a mention from the suggestion popup in the chat UI.
     * This event provides details about the selected user and the current message text, allowing developers to handle mention-related logic, such as custom notifications or validation.
     * The `cancel` property in the event arguments can be set to `true` to prevent the default behavior of inserting the mention into the input field.
     *
     * @event mentionSelect
     */
    mentionSelect: EmitType<MentionSelectEventArgs>;
    /**
     * Specifies whether the attachments is enabled in the Chat UI component.
     *
     * @type {boolean}
     * @default false
     */
    enableAttachments: boolean;
    /**
     * Specifies the configuration options for attachment handling.
     *  Includes save URL, allowed file types, and maximum file size.
     *
     *
     * @default null
     */
    attachmentSettings: FileAttachmentSettingsModel;
    /**
     *  Fires before an attachment upload begins.
     *  Allows inspection or cancellation of the upload process.
     *
     * @event beforeAttachmentUpload
     *
     * @param {BeforeUploadEventArgs} args - Details about the file to be uploaded.
     */
    beforeAttachmentUpload: EmitType<BeforeUploadEventArgs>;
    /**
     * Fires when an attachment is uploaded successfully.
     *
     * @event attachmentUploadSuccess
     *
     *  @param {object} args - Details about the uploaded file.
     */
    attachmentUploadSuccess: EmitType<SuccessEventArgs>;
    /**
     * Fires when an attachment upload fails.
     *
     * @event attachmentUploadFailure
     *
     * @param {object} args - Details about the failed file and error information.
     */
    attachmentUploadFailure: EmitType<FailureEventArgs>;
    /**
     * Fires when an attachment is removed.
     *
     * @event attachmentRemoved
     *
     * @param {object} args - Details about the removed file.
     */
    attachmentRemoved: EmitType<RemovingEventArgs>;
    private l10n;
    private viewWrapper;
    private chatHeader;
    private messageWrapper;
    private downArrowIcon;
    private intl;
    private indicatorWrapper;
    private isEmptyChatTemplateRendered;
    private startIndex;
    private multiplier;
    private toolbar;
    private isScrollAtBottom;
    private currentReplyTo;
    private pinnedMessageWrapper;
    private dropDownButton;
    private lastPinnedToolbar;
    private mentionObj;
    private attachmentIcon;
    private uploadedFiles;
    private uploaderObj;
    private dropArea;
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: ChatUIModel, element?: string | HTMLElement);
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
    private renderChatUIView;
    private initializeLocale;
    private updateScrollPosition;
    private renderChatHeader;
    private renderChatHeaderToolbar;
    private addReactToolbarPortals;
    private updateHeaderToolbar;
    private renderChatContentElement;
    private updateEmptyChatTemplate;
    private renderChatMessageToolbar;
    private handleMessageToolbarClick;
    private togglePin;
    private handleDeleteAction;
    private cleanupTimeBreaks;
    private handleCopyAction;
    private handleReplyAction;
    private renderReplyElement;
    private createFileReplyContent;
    private renderPinnedMessage;
    private updatePinnedMessage;
    private pinAttachmentMessage;
    private togglePinnedIcon;
    private unpinMessage;
    private wireMessageToolbarEvents;
    private handleMessageMouseEvents;
    private setChatMsgId;
    private renderScrollDown;
    private loadBatch;
    private renderMessageGroup;
    private isTimeBreakAdded;
    private getLastUser;
    private initializeCompactMode;
    private renderGroup;
    private isTimeVaries;
    private loadLeftGroupOnDemand;
    private createLeftGroupItems;
    private getInitials;
    private createAvatarIcon;
    private chatStatus;
    private getTimeStampElement;
    private updateTimeFormats;
    private getFormattedTime;
    private getFormat;
    private renderForwardElement;
    private getMessageText;
    private getMentionChipElement;
    private addGroupItems;
    private createAttachmentContent;
    private createVideoContent;
    private updateForwardAndReplyElement;
    private manageChatContent;
    private createTimebreakElement;
    private handleTimeBreak;
    private renderNewMessage;
    private loadMoreMessages;
    private updateMessageTimeFormats;
    private getMessageDate;
    private renderChatSuggestionsElement;
    private handleSuggestionUpdate;
    private onSuggestionClick;
    private renderChatFooterContent;
    private renderChatFooter;
    private getMentionDataSource;
    private initializeMention;
    private onMentionSelect;
    private hasAttachment;
    private isImageFile;
    private isVideoFile;
    private updateAttachmentElement;
    private renderAttachmentIcon;
    private triggerUploaderAction;
    private showFailureAlert;
    private createFailureAlert;
    private handleFileSelection;
    private readFileAsBase64;
    private onUploadStart;
    private onUploadProgress;
    private onUploadSuccess;
    private cleanupFileItem;
    private onUploadFailure;
    private createFileItem;
    private handleRemoveUploadedFile;
    private handleAttachmentPreview;
    private getFilePreview;
    private removeFilesPreview;
    private renderPreviewTemplate;
    private showMediaPreview;
    private createImageContent;
    private updateAttachmentSettings;
    private clearUploadedFiles;
    private refreshTextareaUI;
    private handleInput;
    private onFocusEditableTextarea;
    private onBlurEditableTextarea;
    private triggerUserTyping;
    private renderTypingIndicator;
    private updateUserText;
    private getTypingMessage;
    private updateTypingUsers;
    private updateHeaderIcon;
    private updateHeaderText;
    private renderUpdatedMessage;
    private getUserMentionFromContent;
    private onSendIconClick;
    private replaceMentionChipsWithPlaceholders;
    private clearReplyWrapper;
    private getContextObject;
    private handleAutoScroll;
    private footerKeyHandler;
    private scrollBottomKeyHandler;
    private keyHandler;
    private applyPromptChange;
    private updateFooter;
    private handleScroll;
    private toggleClassName;
    private toggleScrollIcon;
    private scrollBtnClick;
    private updateMessageItem;
    private updateMentionObj;
    private updateLocale;
    private wireEvents;
    private unwireEvents;
    private destroyAttachments;
    private destroyChatUI;
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    scrollToBottom(): void;
    /**
     * Appends a new message to the end of the Chat UI conversation area.
     * This method adds the specified message as the latest entry in the chat:
     *
     * @function addMessage
     * @param {string | MessageModel} message - The message to be added to the conversation. Accepts either a plain text string or a `MessageModel` object.
     * - If `message` is a string, a `MessageModel` will be automatically created with the current user’s details, and the message will be appended.
     * - If `message` is an instance of `MessageModel`, it can represent a message from either the current user or another participant and will be appended directly.
     * @returns {void} No return value.
     */
    addMessage(message: string | MessageModel): void;
    /**
     * Updates an existing message in the Chat UI component.
     * This method allows for modifying a message that has already been added to the conversation.
     * It requires the unique identifier of the message to be updated and the new message content as a `MessageModel`.
     *
     * @function updateMessage
     * @param {MessageModel} message - The updated message content represented as a `MessageModel`.
     * @param {string} msgId - The unique identifier of the message to be updated.
     * @returns {void} No return value.
     */
    updateMessage(message: MessageModel, msgId: string): void;
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    scrollToMessage(messageId: string): void;
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    focus(): void;
    destroy(): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: ChatUIModel, oldProp?: ChatUIModel): void;
}
