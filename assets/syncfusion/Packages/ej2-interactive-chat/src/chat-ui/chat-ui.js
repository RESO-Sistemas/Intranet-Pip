var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../interactive-chat-base/interactive-chat-base-model.d.ts'/>
import { NotifyPropertyChanges, Property, getUniqueID, isNullOrUndefined as isNOU, EventHandler, L10n, remove } from '@syncfusion/ej2-base';
import { Internationalization, ChildProperty, Collection, removeClass, Event, Complex } from '@syncfusion/ej2-base';
import { InterActiveChatBase, ToolbarSettings, ToolbarItem } from '../interactive-chat-base/interactive-chat-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { Fab } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Mention } from '@syncfusion/ej2-dropdowns';
import { Uploader } from '@syncfusion/ej2-inputs';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
var MessageStatus = /** @class */ (function (_super) {
    __extends(MessageStatus, _super);
    function MessageStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], MessageStatus.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], MessageStatus.prototype, "text", void 0);
    __decorate([
        Property('')
    ], MessageStatus.prototype, "tooltip", void 0);
    return MessageStatus;
}(ChildProperty));
export { MessageStatus };
/**
 * Represents a user model for a messages in the chatUI component.
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], User.prototype, "id", void 0);
    __decorate([
        Property('Default')
    ], User.prototype, "user", void 0);
    __decorate([
        Property('')
    ], User.prototype, "avatarUrl", void 0);
    __decorate([
        Property('')
    ], User.prototype, "avatarBgColor", void 0);
    __decorate([
        Property('')
    ], User.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], User.prototype, "statusIconCss", void 0);
    return User;
}(ChildProperty));
export { User };
/**
 * Configures the toolbar displayed on each message in the Chat UI component.
 */
var MessageToolbarSettings = /** @class */ (function (_super) {
    __extends(MessageToolbarSettings, _super);
    function MessageToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], MessageToolbarSettings.prototype, "width", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], MessageToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], MessageToolbarSettings.prototype, "itemClicked", void 0);
    return MessageToolbarSettings;
}(ChildProperty));
export { MessageToolbarSettings };
/**
 *  Represents a model for a reply messages in the chatUI component.
 */
var MessageReply = /** @class */ (function (_super) {
    __extends(MessageReply, _super);
    function MessageReply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, User)
    ], MessageReply.prototype, "user", void 0);
    __decorate([
        Property('')
    ], MessageReply.prototype, "text", void 0);
    __decorate([
        Property([])
    ], MessageReply.prototype, "mentionUsers", void 0);
    __decorate([
        Property('')
    ], MessageReply.prototype, "messageID", void 0);
    __decorate([
        Property('')
    ], MessageReply.prototype, "timestamp", void 0);
    __decorate([
        Property('')
    ], MessageReply.prototype, "timestampFormat", void 0);
    __decorate([
        Property(null)
    ], MessageReply.prototype, "attachedFile", void 0);
    return MessageReply;
}(ChildProperty));
export { MessageReply };
/**
 *  Represents a model for a messages in the chatUI component.
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Message.prototype, "id", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "text", void 0);
    __decorate([
        Complex({}, User)
    ], Message.prototype, "author", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "timeStamp", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "timeStampFormat", void 0);
    __decorate([
        Complex({}, MessageStatus)
    ], Message.prototype, "status", void 0);
    __decorate([
        Property(false)
    ], Message.prototype, "isPinned", void 0);
    __decorate([
        Complex({}, MessageReply)
    ], Message.prototype, "replyTo", void 0);
    __decorate([
        Property(false)
    ], Message.prototype, "isForwarded", void 0);
    __decorate([
        Property(null)
    ], Message.prototype, "attachedFile", void 0);
    __decorate([
        Property([])
    ], Message.prototype, "mentionUsers", void 0);
    return Message;
}(ChildProperty));
export { Message };
var FileAttachmentSettings = /** @class */ (function (_super) {
    __extends(FileAttachmentSettings, _super);
    function FileAttachmentSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], FileAttachmentSettings.prototype, "saveUrl", void 0);
    __decorate([
        Property('')
    ], FileAttachmentSettings.prototype, "removeUrl", void 0);
    __decorate([
        Property('')
    ], FileAttachmentSettings.prototype, "path", void 0);
    __decorate([
        Property(Blob)
    ], FileAttachmentSettings.prototype, "saveFormat", void 0);
    __decorate([
        Property('')
    ], FileAttachmentSettings.prototype, "allowedFileTypes", void 0);
    __decorate([
        Property(30000000)
    ], FileAttachmentSettings.prototype, "maxFileSize", void 0);
    __decorate([
        Property(true)
    ], FileAttachmentSettings.prototype, "enableDragAndDrop", void 0);
    __decorate([
        Property(10)
    ], FileAttachmentSettings.prototype, "maximumCount", void 0);
    __decorate([
        Property('')
    ], FileAttachmentSettings.prototype, "previewTemplate", void 0);
    __decorate([
        Property('')
    ], FileAttachmentSettings.prototype, "attachmentTemplate", void 0);
    __decorate([
        Event()
    ], FileAttachmentSettings.prototype, "attachmentClick", void 0);
    return FileAttachmentSettings;
}(ChildProperty));
export { FileAttachmentSettings };
var ChatUI = /** @class */ (function (_super) {
    __extends(ChatUI, _super);
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function ChatUI(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.multiplier = 3;
        _this.uploadedFiles = [];
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    ChatUI.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    ChatUI.prototype.getDirective = function () {
        return 'EJS-CHATUI';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    ChatUI.prototype.getModuleName = function () {
        return 'chat-ui';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    ChatUI.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    ChatUI.prototype.render = function () {
        this.renderChatUIView();
    };
    ChatUI.prototype.renderChatUIView = function () {
        this.intl = new Internationalization();
        this.setDimension(this.element, this.width, this.height);
        this.renderViewSections(this.element, 'e-chat-header', 'e-chat-content');
        this.viewWrapper = this.element.querySelector('.e-chat-content');
        this.chatHeader = this.element.querySelector('.e-chat-header');
        this.initializeLocale();
        this.renderChatHeader();
        this.renderChatContentElement();
        this.renderChatSuggestionsElement();
        this.renderChatFooterContent();
        this.addCssClass(this.element, this.cssClass);
        this.addRtlClass(this.element, this.enableRtl);
        this.updateHeader(this.showHeader, this.chatHeader, this.viewWrapper);
        this.updateEmptyChatTemplate();
        this.updateFooterElementClass();
        this.wireEvents();
        this.renderTypingIndicator();
        this.updateScrollPosition(false, 0);
        this.initializeCompactMode();
    };
    ChatUI.prototype.initializeLocale = function () {
        this.l10n = new L10n('chat-ui', {
            oneUserTyping: '{0} is typing',
            twoUserTyping: '{0} and {1} are typing',
            threeUserTyping: '{0}, {1}, and {2} other are typing',
            multipleUsersTyping: '{0}, {1}, and {2} others are typing',
            noRecordsTemplate: 'No records found',
            forwarded: 'Forwarded',
            send: 'Send',
            attachments: 'Attach File',
            close: 'Close',
            download: 'Download',
            filePreview: 'No Preview Available',
            fileCountFailure: 'Upload limit reached: Maximum {0} files allowed. Remove extra files to proceed uploading',
            fileSizeFailure: 'Upload failed: {0} files exceeded the maximum size',
            unpin: 'Unpin',
            viewChat: 'View in Chat'
        }, this.locale);
        this.l10n.setLocale(this.locale);
    };
    ChatUI.prototype.updateScrollPosition = function (isMethodCall, timeDelay) {
        var _this = this;
        if (this.isReact || this.isAngular) {
            setTimeout(function () {
                if (isMethodCall) {
                    _this.handleAutoScroll();
                }
                else {
                    _this.scrollToBottom();
                }
            }, timeDelay);
        }
        else {
            this.scrollToBottom();
        }
    };
    ChatUI.prototype.renderChatHeader = function () {
        if (this.headerText) {
            var headerContainer = this.createElement('div', { className: 'e-header' });
            if (this.headerIconCss) {
                var iconElement = this.createElement('span', { className: "e-header-icon e-icons " + this.headerIconCss });
                if (this.user.statusIconCss) {
                    iconElement.appendChild(this.chatStatus(this.user.statusIconCss));
                }
                headerContainer.appendChild(iconElement);
            }
            var headerTextElement = this.createElement('div', { className: 'e-header-text' });
            headerTextElement.innerHTML = this.headerText;
            headerContainer.appendChild(headerTextElement);
            this.chatHeader.appendChild(headerContainer);
            this.renderChatHeaderToolbar(headerContainer);
        }
    };
    ChatUI.prototype.renderChatHeaderToolbar = function (headerContainer) {
        var _this = this;
        if (!isNOU(this.headerToolbar) && this.headerToolbar.items.length > 0) {
            var toolbarEle = this.createElement('div', { className: 'e-chat-toolbar' });
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var pushToolbar = this.headerToolbar.items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                tabIndex: item.tabIndex
            }); });
            this.toolbar = new Toolbar({
                items: pushToolbar,
                height: '100%',
                enableRtl: this.enableRtl,
                clicked: function (args) {
                    var eventItemArgs = {
                        type: args.item.type,
                        text: args.item.text,
                        iconCss: args.item.prefixIcon,
                        cssClass: args.item.cssClass,
                        tooltip: args.item.tooltipText,
                        template: args.item.template,
                        disabled: args.item.disabled,
                        visible: args.item.visible,
                        align: args.item.align,
                        tabIndex: args.item.tabIndex
                    };
                    var eventArgs = {
                        item: eventItemArgs,
                        event: args.originalEvent,
                        cancel: false
                    };
                    if (_this.headerToolbar.itemClicked) {
                        _this.headerToolbar.itemClicked.call(_this, eventArgs);
                    }
                }
            });
            if (this.isReact) {
                this.toolbar.isReact = this.isReact;
                this.toolbar.on('render-react-toolbar-template', this.addReactToolbarPortals, this);
            }
            this.toolbar.appendTo(toolbarEle);
            headerContainer.appendChild(toolbarEle);
        }
    };
    ChatUI.prototype.addReactToolbarPortals = function (args) {
        if (this.isReact && args) {
            this.portals = this.portals.concat(args);
        }
    };
    ChatUI.prototype.updateHeaderToolbar = function () {
        var headerContainer = this.chatHeader.querySelector('.e-header');
        if (!isNOU(this.toolbar)) {
            var pushToolbar = this.headerToolbar.items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                tabIndex: item.tabIndex
            }); });
            this.toolbar.items = pushToolbar;
        }
        else {
            this.renderChatHeaderToolbar(headerContainer);
        }
    };
    ChatUI.prototype.renderChatContentElement = function () {
        this.messageWrapper = this.createElement('div', { className: 'e-message-wrapper', attrs: { 'tabindex': '0' } });
        this.pinnedMessageWrapper = this.createElement('div', { className: 'e-pinned-message-wrapper' });
        this.renderPinnedMessage();
        this.viewWrapper.prepend(this.pinnedMessageWrapper, this.messageWrapper);
        this.content = this.createElement('div', { className: 'e-typing-suggestions' });
        this.viewWrapper.append(this.content);
        this.renderScrollDown();
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    };
    ChatUI.prototype.updateEmptyChatTemplate = function () {
        if (isNOU(this.messages) || this.messages.length <= 0) {
            this.renderBannerView(this.emptyChatTemplate, this.messageWrapper, 'emptyChatTemplate');
            this.isEmptyChatTemplateRendered = isNOU(this.messageWrapper.querySelector('.e-empty-chat-template')) ? false : true;
            if (this.pinnedMessageWrapper) {
                this.pinnedMessageWrapper.style.display = 'none';
            }
        }
    };
    ChatUI.prototype.renderChatMessageToolbar = function (messageItem, msg) {
        var _this = this;
        var messageOptionsToolbar = this.createElement('div', { className: 'e-chat-message-toolbar' });
        var pushToolbar = [];
        if (this.messageToolbarSettings.items.length > 0) {
            var items = this.messageToolbarSettings.items.filter(function (item) {
                var isCopyIcon = item.iconCss.includes('e-chat-copy');
                var hasFileAttachment = _this.hasAttachment(msg) && !(_this.isImageFile(msg.attachedFile.rawFile));
                if (isCopyIcon && hasFileAttachment) {
                    return false;
                }
                return (item.iconCss !== '' ||
                    item.text !== undefined ||
                    item.type !== 'Button' ||
                    item.align !== 'Left' ||
                    item.visible !== true ||
                    item.disabled !== false ||
                    item.tooltip !== '' ||
                    item.cssClass !== '' ||
                    item.template !== null ||
                    item.tabIndex !== -1);
            });
            pushToolbar = items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: _this.messageToolbarSettings.width,
                tabIndex: item.tabIndex
            }); });
        }
        var messageToolbar = new Toolbar({
            items: pushToolbar,
            clicked: function (args) {
                _this.handleMessageToolbarClick(args, messageToolbar, messageItem);
            }
        });
        messageToolbar.appendTo(messageOptionsToolbar);
        this.updatePinnedMessage(msg, messageToolbar);
        return messageOptionsToolbar;
    };
    ChatUI.prototype.handleMessageToolbarClick = function (args, messageToolbar, messageItem) {
        var messageID = messageItem.id;
        var message = this.messages.find(function (msg) { return msg.id === messageID; });
        var eventArgs = {
            item: args.item,
            event: args.originalEvent,
            cancel: false,
            message: message
        };
        if (this.messageToolbarSettings.itemClicked) {
            this.messageToolbarSettings.itemClicked.call(this, eventArgs);
        }
        if (!eventArgs.cancel) {
            switch (args.item.prefixIcon) {
                case 'e-icons e-chat-copy':
                    this.handleCopyAction(args, messageToolbar, message);
                    break;
                case 'e-icons e-chat-reply':
                    this.handleReplyAction(message);
                    break;
                case 'e-icons e-chat-trash':
                    this.handleDeleteAction(messageID);
                    break;
                case 'e-icons e-chat-pin':
                case 'e-icons e-chat-unpin':
                    this.togglePin(message, args, messageToolbar);
                    break;
            }
        }
    };
    ChatUI.prototype.togglePin = function (message, args, messageToolbar) {
        var pinnedText = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text');
        var currentlyPinnedId = pinnedText.getAttribute('data-index');
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (message.isPinned) {
            message.isPinned = false;
        }
        else {
            if (currentlyPinnedId && currentlyPinnedId !== message.id) {
                this.unpinMessage(currentlyPinnedId);
            }
            message.isPinned = true;
        }
        this.isProtectedOnChange = prevOnChange;
        args.item.prefixIcon = message.isPinned ? 'e-icons e-chat-unpin' : 'e-icons e-chat-pin';
        args.item.tooltipText = message.isPinned ? 'Unpin' : 'Pin';
        messageToolbar.dataBind();
        this.updatePinnedMessage(message, messageToolbar);
    };
    ChatUI.prototype.handleDeleteAction = function (messageID) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var messageToDelete = this.messages.find(function (msg) { return msg.id === messageID; });
        if (messageToDelete && messageToDelete.isPinned) {
            this.unpinMessage(messageID);
        }
        this.messages = this.messages.filter(function (msg) { return msg.id !== messageID; });
        this.isProtectedOnChange = prevOnChange;
        var messageItem = this.messageWrapper.querySelector("#" + messageID);
        if (!messageItem) {
            return;
        }
        var messageGroup = messageItem.closest('.e-message-group');
        if (!messageGroup) {
            return;
        }
        messageGroup.removeChild(messageItem);
        if (messageGroup.querySelector('.e-message-item') === null) {
            this.messageWrapper.removeChild(messageGroup);
        }
        this.cleanupTimeBreaks();
        this.updateEmptyChatTemplate();
    };
    ChatUI.prototype.cleanupTimeBreaks = function () {
        var _this = this;
        var timeBreaks = Array.from(this.messageWrapper.querySelectorAll('.e-timebreak'));
        var consecutiveBreaks = [];
        timeBreaks.forEach(function (timeBreak, index) {
            var nextElement = timeBreak.nextElementSibling;
            // Check if the current time break is the last element or if it's consecutive
            if ((!nextElement || !nextElement.classList.contains('e-timebreak')) && index === timeBreaks.length - 1) {
                _this.messageWrapper.removeChild(timeBreak);
            }
            else if (!nextElement || !nextElement.classList.contains('e-timebreak')) {
                if (consecutiveBreaks.length > 0) {
                    consecutiveBreaks.forEach(function (breakElem) {
                        _this.messageWrapper.removeChild(breakElem);
                    });
                }
                consecutiveBreaks = [];
            }
            else {
                consecutiveBreaks.push(timeBreak);
            }
        });
    };
    ChatUI.prototype.handleCopyAction = function (args, messageToolbar, msg) {
        if (msg.text) {
            this.getClipBoardContent(this.getMessageText(msg));
        }
        if (this.hasAttachment(msg)) {
            var file = msg.attachedFile.rawFile;
            this.writeFileToClipboard(file);
        }
        // Provide feedback to user
        args.item.prefixIcon = 'e-icons e-chat-check';
        messageToolbar.dataBind();
        setTimeout(function () {
            args.item.prefixIcon = 'e-icons e-chat-copy';
            messageToolbar.dataBind();
        }, 1000);
    };
    ChatUI.prototype.handleReplyAction = function (message) {
        var replyWrapper = this.footer.querySelector('.e-reply-wrapper');
        if (!replyWrapper) {
            replyWrapper = this.renderReplyElement(message, true);
            this.footer.prepend(replyWrapper);
        }
        else {
            var userElement = replyWrapper.querySelector('.e-reply-message-user');
            var timeElement = replyWrapper.querySelector('.e-reply-message-time');
            var textElement = replyWrapper.querySelector('.e-reply-message-text');
            if (userElement && textElement) {
                userElement.textContent = message.author.user;
                timeElement.textContent = this.showTimeStamp ? this.getFormattedTime(message.timeStamp, message.timeStampFormat) : '';
                textElement.innerHTML = this.getMessageText(message);
            }
            var previewContainer = replyWrapper.querySelector('.e-reply-media-preview');
            if (previewContainer) {
                previewContainer.remove();
            }
            if (this.hasAttachment(message)) {
                var file = message.attachedFile;
                if (file) {
                    var newReplyContent = this.createFileReplyContent(message);
                    var replyContent = replyWrapper.querySelector('.e-reply-content');
                    if (replyContent) {
                        if (textElement) {
                            replyContent.insertBefore(newReplyContent, textElement);
                        }
                    }
                }
            }
        }
        if (this.editableTextarea) {
            this.setFocusAtEnd(this.editableTextarea);
        }
        this.currentReplyTo = message;
    };
    ChatUI.prototype.renderReplyElement = function (message, withClearIcon) {
        var _this = this;
        if (withClearIcon === void 0) { withClearIcon = false; }
        if ((!message.replyTo || !message.replyTo.user || (!message.replyTo.text && !message.replyTo.attachedFile)
            || !message.replyTo.messageID) && !withClearIcon) {
            return null;
        }
        var replyWrapper = this.createElement('div', { className: 'e-reply-wrapper' });
        var time;
        var timeStampFormat;
        if (withClearIcon) {
            time = message.timeStamp ? message.timeStamp : new Date();
            timeStampFormat = message.timeStampFormat ? message.timeStampFormat : this.timeStampFormat;
        }
        else {
            time = message.replyTo.timestamp ? message.replyTo.timestamp : new Date();
            timeStampFormat = message.replyTo.timestampFormat ? message.replyTo.timestampFormat : this.timeStampFormat;
        }
        var formattedTime = this.getFormattedTime(time, timeStampFormat);
        var replyContent = this.createElement('div', {
            className: 'e-reply-content',
            innerHTML: "<span class='e-reply-message-text'>" + (withClearIcon ? this.getMessageText(message) : this.getMessageText(message.replyTo)) + "</span>"
        });
        var messageDetails = this.createElement('div', {
            className: 'e-reply-message-details',
            innerHTML: "\n                <span class='e-reply-message-user'>" + (withClearIcon ? message.author.user : message.replyTo.user.user) + "</span>\n                <span class='e-reply-message-time'>" + (this.showTimeStamp ? formattedTime : '') + "</span>"
        });
        if (this.hasAttachment(message.replyTo) || this.hasAttachment(message)) {
            var file = withClearIcon ? (this.hasAttachment(message) ? message.attachedFile : null)
                : (this.hasAttachment(message.replyTo) ? message.replyTo.attachedFile : null);
            var sourceMessage = withClearIcon ? message : message.replyTo;
            if (file) {
                var fileReplyContent = this.createFileReplyContent(sourceMessage);
                var textElement = replyContent.querySelector('.e-reply-message-text');
                if (textElement) {
                    replyContent.insertBefore(fileReplyContent, textElement);
                }
            }
        }
        replyContent.prepend(messageDetails);
        if (withClearIcon) {
            var clearIcon = this.createElement('span', {
                className: 'e-chat-close e-icons',
                attrs: { title: this.l10n.getConstant('close') }
            });
            EventHandler.add(clearIcon, 'click', this.clearReplyWrapper.bind(this));
            messageDetails.appendChild(clearIcon);
        }
        else {
            EventHandler.add(replyWrapper, 'click', function () { _this.scrollToMessage(message.replyTo.messageID); }, this);
        }
        replyWrapper.prepend(replyContent);
        return replyWrapper;
    };
    ChatUI.prototype.createFileReplyContent = function (message) {
        var fileReplyContent = this.createElement('div', { className: 'e-reply-media-preview' });
        var messageText = this.getMessageText(message);
        var hasText = messageText.trim() !== '';
        var file = message.attachedFile;
        if (this.isImageFile(file.rawFile)) {
            var thumbnailImage = this.createImageContent(file, 'e-reply-media-thumb');
            fileReplyContent.appendChild(thumbnailImage);
        }
        else if (this.isVideoFile(file.rawFile)) {
            var thumbnailvideo = this.createElement('video', {
                attrs: {
                    src: file.fileSource,
                    alt: file.name,
                    disablepictureinpicture: 'true',
                    playsinline: 'true'
                },
                className: 'e-reply-media-thumb'
            });
            fileReplyContent.appendChild(thumbnailvideo);
        }
        else {
            var fileIcon = this.createElement('span', { className: 'e-chat-file-icon e-icons' });
            fileReplyContent.appendChild(fileIcon);
        }
        if (!hasText) {
            var labelElement = this.createElement('span', {
                className: 'e-reply-file-name',
                innerHTML: file.name,
                attrs: { title: file.name }
            });
            fileReplyContent.appendChild(labelElement);
        }
        return fileReplyContent;
    };
    ChatUI.prototype.renderPinnedMessage = function () {
        var _this = this;
        var pinnedMessage = this.createElement('div', { className: 'e-pinned-message' });
        var pinIcon = this.createElement('span', { className: 'e-icons e-chat-pin' });
        var messageText = this.createElement('span', { className: 'e-pinned-message-text' });
        var pinDropdownButtonEle = this.createElement('button', { id: 'pinnedMessageDropdown' });
        this.dropDownButton = new DropDownButton({
            items: [
                { text: this.l10n.getConstant('viewChat'), iconCss: 'e-icons e-chat-view' },
                { text: this.l10n.getConstant('unpin'), iconCss: 'e-icons e-chat-unpin' }
            ],
            cssClass: 'e-pinned-dropdown-popup e-caret-hide',
            iconCss: 'e-icons e-more-vertical-1',
            select: function (args) {
                var messageId = _this.pinnedMessageWrapper.querySelector('.e-pinned-message-text').getAttribute('data-index');
                if (args.item.text === _this.l10n.getConstant('viewChat')) {
                    _this.scrollToMessage(messageId);
                }
                else if (args.item.text === _this.l10n.getConstant('unpin')) {
                    _this.unpinMessage(messageId);
                }
            }
        });
        this.dropDownButton.appendTo(pinDropdownButtonEle);
        pinnedMessage.append(pinIcon, messageText);
        this.pinnedMessageWrapper.append(pinnedMessage, pinDropdownButtonEle);
    };
    ChatUI.prototype.updatePinnedMessage = function (message, messageToolbar) {
        var pinnedText = this.pinnedMessageWrapper.querySelector('.e-pinned-message-text');
        var currentlyPinnedId = pinnedText.getAttribute('data-index');
        if (message.isPinned) {
            if (currentlyPinnedId && currentlyPinnedId !== message.id) {
                var previousMessage = this.messages.find(function (msg) { return msg.id === currentlyPinnedId; });
                if (previousMessage) {
                    previousMessage.isPinned = false;
                }
            }
            this.togglePinnedIcon(messageToolbar);
            if (pinnedText) {
                if (this.hasAttachment(message)) {
                    pinnedText.innerHTML = '';
                    this.pinAttachmentMessage(pinnedText, message);
                }
                else {
                    pinnedText.innerHTML = this.getMessageText(message);
                }
                pinnedText.setAttribute('data-index', message.id);
            }
            this.pinnedMessageWrapper.style.display = 'flex';
            this.lastPinnedToolbar = messageToolbar;
        }
        else if (currentlyPinnedId === message.id) {
            this.pinnedMessageWrapper.style.display = 'none';
            this.togglePinnedIcon();
        }
    };
    ChatUI.prototype.pinAttachmentMessage = function (container, message) {
        var file = message.attachedFile;
        if (!file) {
            return;
        }
        var mediaElement;
        if (this.isImageFile(file.rawFile)) {
            mediaElement = this.createImageContent(file, 'e-pinned-img-thumb');
        }
        else if (this.isVideoFile(file.rawFile)) {
            mediaElement = this.createElement('video', {
                attrs: {
                    src: file.fileSource,
                    alt: file.name,
                    disablepictureinpicture: 'true',
                    playsinline: 'true'
                },
                className: 'e-pinned-img-thumb'
            });
        }
        else {
            mediaElement = this.createElement('span', { className: 'e-chat-file-icon e-icons' });
        }
        var messageText = this.getMessageText(message);
        var hasText = messageText.trim() !== '';
        var labelAttrs = {};
        if (!hasText) {
            labelAttrs.title = file.name;
        }
        var pinContent = this.createElement('span', {
            className: hasText ? 'e-pinned-message-content' : 'e-pinned-file-name',
            innerHTML: hasText ? messageText : file.name,
            attrs: labelAttrs
        });
        this.appendChildren(container, mediaElement, pinContent);
    };
    ChatUI.prototype.togglePinnedIcon = function (messageToolbar) {
        if (this.lastPinnedToolbar) {
            this.lastPinnedToolbar.items.forEach(function (item) {
                if (item.prefixIcon === 'e-icons e-chat-unpin') {
                    item.prefixIcon = 'e-icons e-chat-pin';
                    item.tooltipText = 'Pin';
                }
            });
            this.lastPinnedToolbar.dataBind();
        }
        if (messageToolbar) {
            messageToolbar.items.forEach(function (item) {
                if (item.prefixIcon === 'e-icons e-chat-pin') {
                    item.prefixIcon = 'e-icons e-chat-unpin';
                    item.tooltipText = 'Unpin';
                }
            });
            messageToolbar.dataBind();
            this.lastPinnedToolbar = messageToolbar;
        }
        else {
            this.lastPinnedToolbar = null;
        }
    };
    ChatUI.prototype.unpinMessage = function (messageID) {
        this.pinnedMessageWrapper.style.display = 'none';
        this.togglePinnedIcon();
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var message = this.messages.find(function (msg) { return msg.id === messageID; });
        if (message) {
            message.isPinned = false;
        }
        this.isProtectedOnChange = prevOnChange;
    };
    ChatUI.prototype.wireMessageToolbarEvents = function (messageItem, toolbarEle) {
        var _this = this;
        EventHandler.add(messageItem, 'mouseover', function () { _this.handleMessageMouseEvents(true, messageItem, toolbarEle); }, this);
        EventHandler.add(messageItem, 'mouseleave', function () { _this.handleMessageMouseEvents(false, messageItem, toolbarEle); }, this);
    };
    ChatUI.prototype.handleMessageMouseEvents = function (isMouseOver, messageItem, toolbarEle) {
        if (isMouseOver) {
            var isLeftMessage = messageItem.parentElement.classList.contains('e-left');
            toolbarEle.style.visibility = 'hidden';
            toolbarEle.style.display = 'block';
            var toolbarRect = toolbarEle.getBoundingClientRect();
            toolbarEle.style.visibility = '';
            toolbarEle.style.display = 'none';
            var messageContent = this.messageTemplate
                ? messageItem
                : isLeftMessage
                    ? messageItem.querySelector('.e-message-content')
                    : messageItem.querySelector('.e-status-wrapper');
            var messageItemRect = messageItem.getBoundingClientRect();
            var messageContentRect = messageContent.getBoundingClientRect();
            var topPosition = messageContentRect.top - messageItemRect.top - toolbarRect.height;
            if (!isLeftMessage) {
                topPosition += 4; // margin top
            }
            var messageWrapperRect = this.messageWrapper.getBoundingClientRect();
            if (messageContentRect.top - messageWrapperRect.top < toolbarRect.height) {
                topPosition = messageContentRect.bottom - messageItemRect.top;
            }
            toolbarEle.style.top = topPosition + "px";
            if (messageContentRect.width < toolbarRect.width && isLeftMessage) {
                toolbarEle.style.left = '0';
                toolbarEle.style.right = 'auto';
            }
            else {
                var statusIconElement = messageContent.querySelector('.e-status-icon');
                var statusIconWidth = statusIconElement ? statusIconElement.getBoundingClientRect().width + 2 : 0;
                var rightPosition = messageItemRect.right - messageContentRect.right + statusIconWidth;
                toolbarEle.style.right = rightPosition + "px";
            }
            toolbarEle.style.display = '';
            toolbarEle.classList.add('e-show');
        }
        else {
            toolbarEle.classList.remove('e-show');
        }
    };
    ChatUI.prototype.setChatMsgId = function () {
        var _this = this;
        if (this.messages && this.messages.length > 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages = this.messages.map(function (msg, index) {
                return __assign({}, msg, { id: msg.id || _this.element.id + "-message-" + (index + 1) });
            });
            this.isProtectedOnChange = prevOnChange;
        }
    };
    ChatUI.prototype.renderScrollDown = function () {
        var scrollDownButton = this.createElement('button', { id: 'scrollDownButton' });
        this.downArrowIcon = new Fab({
            iconCss: 'e-icons e-chat-scroll-down',
            position: 'BottomRight',
            target: this.content,
            isPrimary: false
        });
        this.downArrowIcon.appendTo(scrollDownButton);
    };
    ChatUI.prototype.loadBatch = function () {
        for (var i = this.startIndex - 1; i >= 0; i--) {
            var currIndex = i; // To pass the actual index of the reversed item.
            var prevIndex = i === this.messages.length - 1 ? -1 : currIndex + 1;
            this.updateMessageTimeFormats(this.messages[parseInt(i.toString(), 10)], currIndex);
            var currentMessageDate = this.getMessageDate(currIndex);
            currentMessageDate.setHours(0, 0, 0, 0);
            if (Math.min(currIndex, prevIndex) >= 0) {
                var lastMessageDate = this.getMessageDate(prevIndex);
                lastMessageDate.setHours(0, 0, 0, 0);
                if (currentMessageDate.getTime() === lastMessageDate.getTime()) {
                    var prevTimeBreak = this.messageWrapper.querySelectorAll('.e-timebreak')[0];
                    if (prevTimeBreak) {
                        prevTimeBreak.remove();
                    }
                }
            }
            this.renderGroup(this.messageWrapper, this.messages[parseInt(i.toString(), 10)], true, currIndex, prevIndex);
            if (this.showTimeBreak) {
                this.messageWrapper.prepend(this.createTimebreakElement(currentMessageDate));
            }
            var viewportHeight = window.innerHeight;
            var loadHeight = viewportHeight * this.multiplier;
            this.startIndex = i;
            if (this.messageWrapper.scrollHeight > loadHeight) {
                break;
            }
        }
    };
    ChatUI.prototype.renderMessageGroup = function (chatContentWrapper) {
        var _this = this;
        if (this.loadOnDemand) {
            if (this.messages && this.messages.length <= 0) {
                return;
            }
            createSpinner({ target: this.messageWrapper });
            this.startIndex = this.messages.length;
            this.loadBatch();
        }
        else {
            this.messages.forEach(function (msg, i) {
                _this.renderGroup(chatContentWrapper, msg, false, i, i - 1);
            });
        }
    };
    ChatUI.prototype.isTimeBreakAdded = function (chatContentWrapper, loadOldChat) {
        return loadOldChat ?
            chatContentWrapper.firstElementChild.classList.contains('e-timebreak') :
            chatContentWrapper.lastElementChild.classList.contains('e-timebreak');
    };
    ChatUI.prototype.getLastUser = function (prevIndex) {
        if (prevIndex >= 0) {
            return this.messages[parseInt(prevIndex.toString(), 10)].author.id;
        }
        return '';
    };
    ChatUI.prototype.initializeCompactMode = function () {
        this.element.classList.toggle('e-compact-mode', this.enableCompactMode);
    };
    ChatUI.prototype.renderGroup = function (chatContentWrapper, msg, loadOldChat, index, prevIndex) {
        var messageGroup;
        if (!loadOldChat) {
            this.updateMessageTimeFormats(msg, index);
            this.handleTimeBreak(prevIndex, index, loadOldChat);
        }
        if (!this.enableCompactMode && msg.author.id === this.user.id) {
            var hasTimeBreak = this.showTimeBreak && this.isTimeBreakAdded(chatContentWrapper, loadOldChat);
            if ((msg.author.id !== this.getLastUser(prevIndex)) || hasTimeBreak) {
                messageGroup = this.createElement('div', { className: "e-message-group e-right " + (this.messageTemplate ? 'e-message-item-template' : '') });
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
            else {
                var length_1 = this.element.querySelectorAll('.e-message-group.e-right').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-right')[loadOldChat ? 0 : length_1 - 1];
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
        }
        else {
            if (this.getLastUser(prevIndex) !== msg.author.id || this.isTimeVaries(index, prevIndex)) {
                messageGroup = this.createElement('div', { className: "e-message-group e-left " + (this.messageTemplate ? 'e-message-item-template' : '') });
                var avatarElement = this.createAvatarIcon(msg.author, false);
                if (!this.messageTemplate) {
                    messageGroup.prepend(avatarElement);
                }
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                if (this.loadOnDemand) {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
                else {
                    this.createLeftGroupItems(messageGroup, msg);
                    this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
                }
            }
            else {
                var length_2 = this.element.querySelectorAll('.e-message-group.e-left').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-left')[loadOldChat ? 0 : length_2 - 1];
                if (!loadOldChat) {
                    this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
                }
                else {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
            }
        }
    };
    ChatUI.prototype.isTimeVaries = function (index, prevIndex) {
        var currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        var lastMessageDate = this.getMessageDate(prevIndex);
        lastMessageDate.setHours(0, 0, 0, 0);
        return currentMessageDate.getTime() !== lastMessageDate.getTime();
    };
    ChatUI.prototype.loadLeftGroupOnDemand = function (msg, loadOldChat, index, messageGroup) {
        // To check if the previous author is the same as the current author. If not, create a group header.
        var isAnyMsgPresent = this.messages[parseInt((index - 1).toString(), 10)] ? true : false;
        var prevAuthorId = isAnyMsgPresent ? this.messages[parseInt((index - 1).toString(), 10)].author.id : '';
        var shouldCreateHeader = prevAuthorId !== msg.author.id ? true : false;
        if (shouldCreateHeader || this.isTimeVaries(index, index - 1)) {
            this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
            this.createLeftGroupItems(messageGroup, msg);
        }
        else {
            this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
        }
    };
    ChatUI.prototype.createLeftGroupItems = function (messageGroup, msg) {
        if (this.messageTemplate) {
            return;
        }
        var userHeaderContainer = this.createElement('div', {
            className: 'e-message-header-container'
        });
        var userHeader = this.createElement('div', {
            className: 'e-message-header'
        });
        userHeader.innerHTML = msg.author.user;
        var timeSpan = this.getTimeStampElement(msg.timeStamp
            ? msg.timeStamp
            : new Date(), msg.timeStampFormat ? msg.timeStampFormat : this.timeStampFormat);
        this.appendChildren(userHeaderContainer, userHeader, timeSpan);
        this.insertBeforeChildren(messageGroup, userHeaderContainer);
    };
    ChatUI.prototype.getInitials = function (name) {
        var nameParts = name.split(' ');
        var initials = nameParts.length > 1
            ? "" + nameParts[0][0] + nameParts[nameParts.length - 1][0]
            : name[0];
        return initials;
    };
    ChatUI.prototype.createAvatarIcon = function (author, isTypingUser) {
        var userName = author.user.trim();
        var initials = this.getInitials(userName);
        var iconClassName = !isTypingUser ? 'e-message-icon' : 'e-user-icon';
        var avatarIcon;
        if (iconClassName === 'e-message-icon') {
            avatarIcon = this.createElement('span', { className: " " + 'e-message-icon' + " " + author.cssClass });
            if (!isNOU(author.avatarUrl) && author.avatarUrl !== '') {
                var imgElement = this.createElement('img', {
                    attrs: { src: author.avatarUrl, alt: 'Avatar' }
                });
                avatarIcon.appendChild(imgElement);
            }
        }
        else {
            avatarIcon = this.createElement((!isNOU(author.avatarUrl) && author.avatarUrl !== '') ? 'img' : 'span', { className: " " + 'e-user-icon' + " " + author.cssClass });
        }
        if (author.avatarBgColor) {
            avatarIcon.style.backgroundColor = author.avatarBgColor;
        }
        if (!isNOU(author.avatarUrl) && author.avatarUrl !== '') {
            avatarIcon.src = author.avatarUrl;
            avatarIcon.alt = userName;
        }
        else {
            avatarIcon.innerHTML = initials;
        }
        if (author.statusIconCss && !isTypingUser) {
            avatarIcon.appendChild(this.chatStatus(author.statusIconCss));
        }
        return avatarIcon;
    };
    ChatUI.prototype.chatStatus = function (statusIconCss) {
        var statusTitle;
        // Determine the title based on the statusIconCss
        if (statusIconCss.includes('e-user-online')) {
            statusTitle = 'Available';
        }
        else if (statusIconCss.includes('e-user-away')) {
            statusTitle = 'Away';
        }
        else if (statusIconCss.includes('e-user-busy')) {
            statusTitle = 'Busy';
        }
        else if (statusIconCss.includes('e-user-offline')) {
            statusTitle = 'Offline';
        }
        return this.createElement('span', { className: "e-user-status-icon " + statusIconCss,
            attrs: {
                'title': statusTitle
            }
        });
    };
    ChatUI.prototype.getTimeStampElement = function (timeStamp, timeStampFormat) {
        var formattedTime = this.getFormattedTime(timeStamp, timeStampFormat);
        return this.createElement('div', {
            className: 'e-time',
            innerHTML: this.showTimeStamp ? formattedTime : ''
        });
    };
    ChatUI.prototype.updateTimeFormats = function (timeStampFormat, fullTime, index) {
        if (this.messages[parseInt(index.toString(), 10)]) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages[parseInt(index.toString(), 10)].timeStamp = this.intl.parseDate(fullTime, { format: 'dd/MM/yyyy hh:mm a' });
            this.messages[parseInt(index.toString(), 10)].timeStampFormat = timeStampFormat;
            this.isProtectedOnChange = prevOnChange;
        }
    };
    ChatUI.prototype.getFormattedTime = function (timeStamp, timeStampFormat) {
        timeStamp = typeof timeStamp === 'string' ? new Date(timeStamp) : timeStamp;
        return this.intl.formatDate(timeStamp, { format: this.getFormat(timeStampFormat) });
    };
    ChatUI.prototype.getFormat = function (timeStampFormat) {
        var hasValue = !isNOU(timeStampFormat) && timeStampFormat.length > 0;
        return hasValue ? timeStampFormat
            : (!isNOU(this.timeStampFormat) && this.timeStampFormat.length) ? this.timeStampFormat : 'dd/MM/yyyy hh:mm a';
    };
    ChatUI.prototype.renderForwardElement = function (msg, textElement) {
        if (msg.isForwarded) {
            var forwardedIndicator = this.createElement('div', {
                className: 'e-forwarded-indicator'
            });
            var forwardedMessage = this.createElement('div', {
                className: 'e-forward-message',
                innerHTML: this.l10n.getConstant('forwarded')
            });
            var forwardIcon = this.createElement('span', { className: 'e-icons e-chat-forward' });
            this.appendChildren(forwardedIndicator, forwardIcon, forwardedMessage);
            textElement.prepend(forwardedIndicator);
        }
    };
    ChatUI.prototype.getMessageText = function (msg) {
        var mentionedUsers = msg.mentionUsers;
        if (!isNOU(mentionedUsers) && mentionedUsers.length > 0) {
            // Regular expression to find placeholders like {0}, {10}, {-1}
            var placeholderRegex = /\{(-?\d+)\}/g;
            var messageText = msg.text;
            var match = void 0;
            // Find all placeholders in the text
            var placeholders = [];
            // eslint-disable-next-line no-cond-assign
            while ((match = placeholderRegex.exec(messageText)) !== null) {
                placeholders.push({
                    fullMatch: match[0],
                    index: parseInt(match[1], 10)
                });
            }
            // Replace placeholders with user names if the index exists in mentionedUsers
            for (var _i = 0, placeholders_1 = placeholders; _i < placeholders_1.length; _i++) {
                var placeholder = placeholders_1[_i];
                var userIndex = placeholder.index;
                // Check if there's a user at this index in the array
                if (userIndex < mentionedUsers.length || (mentionedUsers.length + userIndex) < mentionedUsers.length) {
                    var user = mentionedUsers[parseInt(userIndex.toString(), 10)];
                    if (user) {
                        messageText = messageText.replace(placeholder.fullMatch, this.getMentionChipElement(user));
                    }
                }
            }
            return SanitizeHtmlHelper.sanitize(messageText);
        }
        return SanitizeHtmlHelper.sanitize(msg.text);
    };
    ChatUI.prototype.getMentionChipElement = function (user) {
        var mentionChip = this.createElement('span', { className: 'e-mention-chip' });
        var mentionDisplayEle = this.createElement('span', { className: 'e-chat-mention-user-chip', innerHTML: user.user });
        mentionDisplayEle.setAttribute('data-user-id', user.id);
        mentionChip.append(mentionDisplayEle);
        return mentionChip.outerHTML;
    };
    ChatUI.prototype.addGroupItems = function (msg, messageGroup, isUserTimeStampRendered, showStatus, index, loadOldChat) {
        var messageItem = this.createElement('div', { className: 'e-message-item', id: "" + msg.id });
        var messageStatusWrapper = this.createElement('div', { className: 'e-status-wrapper' });
        var timeSpan = this.getTimeStampElement(msg.timeStamp ? msg.timeStamp : new Date(), msg.timeStampFormat ? msg.timeStampFormat : this.timeStampFormat);
        var messageContent = this.createElement('div', { className: 'e-message-content' });
        var textElement = this.createElement('div', {
            className: 'e-text',
            innerHTML: this.getMessageText(msg)
        });
        if (this.hasAttachment(msg)) {
            var fileElement = this.createAttachmentContent(msg);
            messageContent.appendChild(fileElement);
        }
        if (!isNOU(textElement) && textElement.innerHTML !== '') {
            messageContent.appendChild(textElement);
        }
        this.updateForwardAndReplyElement(msg, messageContent);
        if (this.messageTemplate) {
            this.getContextObject('messageTemplate', messageItem, index, msg);
        }
        else {
            if (!isUserTimeStampRendered) {
                messageItem.appendChild(timeSpan);
            }
            if (showStatus) {
                var messageElement = this.createElement('div', { className: 'e-status-item' });
                var statusIcon = this.createElement('span', { attrs: { class: "e-status-icon " + (msg.status ? msg.status.iconCss : ''), title: "" + (msg.status ? msg.status.tooltip : '') } });
                var statusText = this.createElement('div', { innerHTML: msg.status ? msg.status.text : '', className: 'e-status-text' });
                this.appendChildren(messageElement, messageContent, statusIcon);
                this.appendChildren(messageStatusWrapper, messageElement, statusText);
                messageItem.appendChild(messageStatusWrapper);
            }
            else {
                messageItem.appendChild(messageContent);
            }
        }
        this.manageChatContent(loadOldChat, messageGroup, messageItem);
        var toolbarEle = this.renderChatMessageToolbar(messageItem, msg);
        this.wireMessageToolbarEvents(messageItem, toolbarEle);
        messageItem.prepend(toolbarEle);
    };
    ChatUI.prototype.createAttachmentContent = function (msg) {
        var _this = this;
        var fileElement = this.createElement('div', {
            className: 'e-attached-file'
        });
        var file = msg.attachedFile;
        var wrapper;
        if (this.isImageFile(file.rawFile)) {
            wrapper = this.createElement('div', {
                className: 'e-image-wrapper'
            });
            wrapper.appendChild(this.createImageContent(file, 'e-image'));
            fileElement.appendChild(wrapper);
        }
        else if (this.isVideoFile(file.rawFile)) {
            wrapper = this.createVideoContent(file);
            fileElement.appendChild(wrapper);
        }
        else {
            wrapper = this.createFileItem(msg.attachedFile, false);
            fileElement.appendChild(wrapper);
        }
        EventHandler.add(fileElement, 'click', function () { return _this.handleAttachmentPreview(file, true); });
        return fileElement;
    };
    ChatUI.prototype.createVideoContent = function (file) {
        var videoWrapper = this.createElement('div', {
            className: 'e-video-wrapper'
        });
        var videoElement = this.createElement('video', {
            attrs: {
                disablepictureinpicture: 'true',
                playsinline: 'true',
                preload: 'metadata',
                title: file.name
            },
            className: 'e-video'
        });
        var source = this.createElement('source', {
            attrs: {
                src: file.fileSource,
                type: file.rawFile.type
            }
        });
        videoElement.appendChild(source);
        var playIconWrapper = this.createElement('div', {
            className: 'e-play-icon-wrapper'
        });
        var playButton = this.createElement('span', {
            className: 'e-chat-video-play e-icons',
            attrs: {
                role: 'button',
                tabindex: '0',
                'aria-label': 'Play video',
                title: 'Play'
            }
        });
        playIconWrapper.appendChild(playButton);
        videoWrapper.appendChild(videoElement);
        videoWrapper.appendChild(playIconWrapper);
        return videoWrapper;
    };
    ChatUI.prototype.updateForwardAndReplyElement = function (msg, messageContent) {
        if (!msg.isForwarded) {
            var replyElement = this.renderReplyElement(msg, false);
            if (replyElement) {
                messageContent.prepend(replyElement);
            }
        }
        else {
            this.renderForwardElement(msg, messageContent);
        }
    };
    ChatUI.prototype.manageChatContent = function (loadOldChat, parentItem, ChildItem) {
        if (loadOldChat) {
            parentItem.prepend(ChildItem);
        }
        else {
            parentItem.appendChild(ChildItem);
        }
    };
    ChatUI.prototype.createTimebreakElement = function (date) {
        var timebreakDiv = this.createElement('div', { className: "e-timebreak " + (this.timeBreakTemplate ? 'e-timebreak-template' : '') });
        var formattedTime = this.getFormattedTime(date, 'MMMM d, yyyy');
        if (this.timeBreakTemplate) {
            this.getContextObject('timeBreakTemplate', timebreakDiv, null, null, date);
        }
        else {
            var timeStampEle = this.createElement('span', { className: 'e-timestamp' });
            timeStampEle.innerHTML = formattedTime;
            timebreakDiv.appendChild(timeStampEle);
        }
        return timebreakDiv;
    };
    ChatUI.prototype.handleTimeBreak = function (lastMsgIndex, index, loadOldChat) {
        if (!this.showTimeBreak) {
            return;
        }
        var currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        if (lastMsgIndex === -1) {
            this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
        }
        else if (index > 0) {
            var lastMessageDate = this.getMessageDate(lastMsgIndex);
            lastMessageDate.setHours(0, 0, 0, 0);
            if ((currentMessageDate.getTime() !== lastMessageDate.getTime()) && !loadOldChat) {
                this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
            }
        }
    };
    ChatUI.prototype.renderNewMessage = function (msg, index) {
        if (this.isEmptyChatTemplateRendered) {
            var introContainer = this.messageWrapper.querySelector('.e-empty-chat-template');
            this.messageWrapper.removeChild(introContainer);
            this.isEmptyChatTemplateRendered = false;
        }
        this.renderGroup(this.messageWrapper, msg, false, index, index - 1);
    };
    ChatUI.prototype.loadMoreMessages = function () {
        var _this = this;
        if (this.startIndex <= 0) {
            return;
        }
        var currentScrollOffset = this.messageWrapper.scrollHeight - this.messageWrapper.scrollTop;
        showSpinner(this.messageWrapper);
        setTimeout(function () {
            hideSpinner(_this.messageWrapper);
            _this.loadBatch();
            _this.messageWrapper.scrollTop = _this.messageWrapper.scrollHeight - currentScrollOffset;
        }, 1000);
    };
    ChatUI.prototype.updateMessageTimeFormats = function (msg, index) {
        var fullTime = this.getFormattedTime(msg.timeStamp
            ? msg.timeStamp
            : new Date(), 'dd/MM/yyyy hh:mm a');
        this.updateTimeFormats(msg.timeStampFormat, fullTime, index);
    };
    ChatUI.prototype.getMessageDate = function (index) {
        return new Date(this.messages[parseInt(index.toString(), 10)].timeStamp);
    };
    ChatUI.prototype.renderChatSuggestionsElement = function () {
        if (!isNOU(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
    };
    ChatUI.prototype.handleSuggestionUpdate = function () {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!isNOU(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
        this.toggleScrollIcon();
    };
    ChatUI.prototype.onSuggestionClick = function (e) {
        this.suggestionsElement.hidden = true;
        this.editableTextarea.innerText = e.target.innerText;
        this.onSendIconClick(e);
    };
    ChatUI.prototype.renderChatFooterContent = function () {
        this.getFooter();
        var footerClass = "e-footer " + (this.footerTemplate ? 'e-footer-template' : '');
        this.footer.className = footerClass;
        this.renderChatFooter();
        this.viewWrapper.append(this.footer);
        this.updateFooter(this.showFooter, this.footer);
    };
    ChatUI.prototype.renderChatFooter = function () {
        this.renderFooterContent(this.footerTemplate, '', this.placeholder, false, 'e-chat-textarea');
        var sendIconClass = 'e-chat-send e-icons disabled';
        if (!this.footerTemplate) {
            this.renderFooterIcons(sendIconClass, false, '');
            var footerIconsWrapper = this.footer.querySelector('.e-footer-icons-wrapper');
            if (footerIconsWrapper) {
                this.sendIcon.setAttribute('title', this.l10n.getConstant('send'));
                this.updateAttachmentElement(footerIconsWrapper);
            }
            this.refreshTextareaUI();
            this.pushToUndoStack(this.editableTextarea.innerText);
            this.updateMentionObj();
        }
    };
    ChatUI.prototype.getMentionDataSource = function (mentionUsers) {
        var _this = this;
        var dataSource = mentionUsers.map(function (user) {
            var name = user.user.trim();
            var initials = _this.getInitials(name);
            return {
                id: user.id,
                user: name,
                avatarUrl: user.avatarUrl || '',
                avatarBgColor: user.avatarBgColor || '',
                cssClass: user.cssClass || '',
                statusIconCss: user.statusIconCss || '',
                initials: initials
            };
        });
        return dataSource;
    };
    ChatUI.prototype.initializeMention = function () {
        // Map UserModel to format expected by Mention component
        var dataSource = this.getMentionDataSource(this.mentionUsers);
        var cssClass = 'e-chat-mention';
        if (this.enableRtl) {
            cssClass += ' e-rtl';
        }
        if (dataSource.length > 0) {
            // Initialize Mention component
            this.mentionObj = new Mention({
                dataSource: dataSource,
                cssClass: cssClass,
                requireLeadingSpace: false,
                suffixText: '&nbsp;',
                noRecordsTemplate: this.l10n.getConstant('noRecordsTemplate'),
                fields: { text: 'user', value: 'id' },
                popupWidth: '250px',
                popupHeight: '200px',
                allowSpaces: true,
                mentionChar: this.mentionTriggerChar,
                displayTemplate: '<span class="e-chat-mention-user-chip" data-user-id="${id}">${user}</span>',
                itemTemplate: '<div class="e-chat-mention-item-template"><span class="e-chat-mention-user-icon ${cssClass}" style="background-color: ${avatarBgColor};">${if(avatarUrl)} <img src="${avatarUrl}" alt="${user}" class="em-img" /> ${else}${initials}${/if} </span><div class="e-chat-mention-user-name">${user}</div></div>',
                select: this.onMentionSelect.bind(this)
            }, this.editableTextarea);
        }
    };
    // Add method to handle mention selection
    ChatUI.prototype.onMentionSelect = function (args) {
        var eventArgs = {
            cancel: false,
            event: args.e,
            isInteracted: args.isInteracted,
            itemData: args.itemData
        };
        this.trigger('mentionSelect', eventArgs);
        args.cancel = eventArgs.cancel;
        this.activateSendIcon(this.editableTextarea.innerText.length);
    };
    ChatUI.prototype.hasAttachment = function (message) {
        return message.attachedFile !== undefined && message.attachedFile !== null;
    };
    ChatUI.prototype.isImageFile = function (file) {
        if (!file) {
            return false;
        }
        return file.type && typeof file.type === 'string' && file.type.startsWith('image/');
    };
    ChatUI.prototype.isVideoFile = function (file) {
        if (!file) {
            return false;
        }
        return file.type && typeof file.type === 'string' && file.type.startsWith('video/');
    };
    ChatUI.prototype.updateAttachmentElement = function (footerIconsWrapper) {
        if (this.enableAttachments) {
            this.renderAttachmentIcon(footerIconsWrapper);
        }
        else {
            if (this.uploaderObj) {
                this.uploaderObj.destroy();
                EventHandler.remove(this.attachmentIcon, 'keydown', this.triggerUploaderAction);
                this.attachmentIcon.innerHTML = '';
                this.dropArea.innerHTML = '';
                this.attachmentIcon.remove();
                remove(this.dropArea);
            }
            this.removeFilesPreview();
        }
    };
    ChatUI.prototype.renderAttachmentIcon = function (footerIconsWrapper) {
        var _this = this;
        this.dropArea = this.createElement('div', { attrs: { class: 'e-chat-drop-area' } });
        this.footer.prepend(this.dropArea);
        this.attachmentIcon = this.createElement('span', { attrs: { class: 'e-chat-attachment-icon e-icons', role: 'button', 'aria-label': 'Attach files', tabindex: '0', title: this.l10n.getConstant('attachments') } });
        var uploaderElement = this.createElement('input', { attrs: { class: 'e-chat-file-upload', type: 'file', name: 'UploadFiles', id: 'fileUpload' } });
        var dropAreaTarget;
        if (this.attachmentSettings.enableDragAndDrop) {
            dropAreaTarget = this.footer;
        }
        this.uploaderObj = new Uploader({
            asyncSettings: {
                saveUrl: this.attachmentSettings.saveUrl,
                removeUrl: this.attachmentSettings.removeUrl
            },
            maxFileSize: this.attachmentSettings.maxFileSize,
            allowedExtensions: this.attachmentSettings.allowedFileTypes,
            success: this.onUploadSuccess.bind(this),
            failure: this.onUploadFailure.bind(this),
            uploading: this.onUploadStart.bind(this),
            progress: this.onUploadProgress.bind(this),
            multiple: true,
            dropArea: dropAreaTarget,
            selected: function (args) {
                if (args.filesData.some(function (file) { return file.status === _this.uploaderObj.l10n.getConstant('invalidFileType'); })) {
                    args.cancel = true;
                    return;
                }
                var totalSelected = args.filesData.length + _this.uploadedFiles.length;
                if (totalSelected > _this.attachmentSettings.maximumCount) {
                    args.cancel = true;
                    _this.showFailureAlert('fileCountFailure', _this.attachmentSettings.maximumCount, 'e-count-failure');
                    uploaderElement.value = '';
                    return;
                }
                var oversized = args.filesData.filter(function (file) {
                    return file.status === _this.uploaderObj.l10n.getConstant('invalidMaxFileSize') && file.statusCode === '0';
                });
                if (oversized.length) {
                    _this.showFailureAlert('fileSizeFailure', oversized.length, 'e-size-failure');
                    uploaderElement.value = '';
                }
                _this.handleFileSelection(args);
            }
        });
        this.attachmentIcon.appendChild(uploaderElement);
        this.uploaderObj.appendTo(uploaderElement);
        this.attachmentIcon.addEventListener('click', function () { return uploaderElement.click(); });
        footerIconsWrapper.prepend(this.attachmentIcon);
        EventHandler.add(this.attachmentIcon, 'keydown', this.triggerUploaderAction, this);
    };
    ChatUI.prototype.triggerUploaderAction = function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var uploaderElement = this.footer.querySelector('.e-chat-file-upload');
            if (uploaderElement) {
                uploaderElement.click();
            }
        }
    };
    ChatUI.prototype.showFailureAlert = function (localeConstantKey, fileCount, failureType) {
        var failureMessage = this.l10n.getConstant(localeConstantKey).replace('{0}', fileCount.toString());
        if (fileCount === 1) {
            failureMessage = failureMessage.replace('files', 'file');
        }
        this.createFailureAlert(failureMessage, failureType);
    };
    ChatUI.prototype.createFailureAlert = function (failureMessage, failureType) {
        var _this = this;
        var failureAlert = this.renderFailureAlert(this.viewWrapper, failureMessage, failureType, 'e-chat-circle-close', 'e-chat-close');
        if (this.viewWrapper.contains(this.footer)) {
            this.viewWrapper.insertBefore(failureAlert, this.footer);
        }
        failureAlert.classList.add('e-show');
        setTimeout(function () {
            _this.handleFailureAlertRemove(_this.viewWrapper, failureAlert);
        }, 3000);
    };
    ChatUI.prototype.handleFileSelection = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, fileData, file, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = args.filesData;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        fileData = _a[_i];
                        file = fileData.rawFile;
                        if (!this.attachmentSettings.path) return [3 /*break*/, 2];
                        fileData.fileSource = this.attachmentSettings.path + "/" + fileData.name;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.attachmentSettings.saveFormat === 'Base64')) return [3 /*break*/, 4];
                        _b = fileData;
                        return [4 /*yield*/, this.readFileAsBase64(file)];
                    case 3:
                        _b.fileSource = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        fileData.fileSource = URL.createObjectURL(file);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.element.querySelector('#fileUpload').value = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatUI.prototype.readFileAsBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    ChatUI.prototype.onUploadStart = function (args) {
        this.trigger('beforeAttachmentUpload', args);
        this.uploadedFiles.push(args.fileData);
        var fileItem = this.createFileItem(args.fileData, true);
        this.dropArea.appendChild(fileItem);
    };
    ChatUI.prototype.onUploadProgress = function (args) {
        var uploadProgress = args.e.loaded / args.e.total * 100;
        var progressFill = this.element.querySelector("#e-chat-progress-" + CSS.escape(args.file.name));
        if (progressFill) {
            progressFill.style.width = uploadProgress + "%";
        }
    };
    ChatUI.prototype.onUploadSuccess = function (args) {
        if (args.operation === 'upload') {
            this.trigger('attachmentUploadSuccess', args);
            var progressFill = this.element.querySelector("#e-chat-progress-" + CSS.escape(args.file.name));
            if (progressFill) {
                progressFill.style.width = '100%';
                this.cleanupFileItem(args.file.name);
            }
            var progressBar = this.element.querySelector('.e-chat-progress-fill');
            if (!progressBar) {
                this.activateSendIcon(1);
            }
        }
        else if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
    };
    ChatUI.prototype.cleanupFileItem = function (fileName) {
        var fileItem = this.element.querySelector("#e-chat-progress-" + CSS.escape(fileName));
        if (fileItem) {
            fileItem.parentElement.remove();
        }
    };
    ChatUI.prototype.onUploadFailure = function (args) {
        if (args.operation === 'remove') {
            this.trigger('attachmentRemoved', args);
        }
        else {
            this.trigger('attachmentUploadFailure', args);
            this.uploaderObj.remove(args.file);
            this.uploadedFiles = this.uploadedFiles.filter(function (file) { return file.name !== args.file.name; });
            var progressFill = this.footer.querySelector("#e-chat-progress-" + CSS.escape(args.file.name));
            if (progressFill) {
                progressFill.style.width = '100%';
                progressFill.classList.add('e-chat-upload-failed');
            }
        }
    };
    ChatUI.prototype.createFileItem = function (fileData, isForFooter) {
        var _this = this;
        var fileItem = this.createElement('div', { className: isForFooter ? 'e-chat-uploaded-file-item' : 'e-file-wrapper' });
        if (this.attachmentSettings.attachmentTemplate && isForFooter) {
            var introContainer = this.createElement('div', { className: 'e-attachment-template' });
            fileItem.appendChild(introContainer);
            this.getContextObject('attachmenttemplate', introContainer, null, null, null, fileData);
        }
        else {
            var fileIcon = this.createElement('div', { className: 'e-icons e-chat-file-icon' });
            var fileDetails = this.createElement('div', { className: 'e-chat-file-details' });
            var fileName = this.createElement('span', { className: 'e-chat-file-name', innerHTML: fileData.name });
            var fileSize = this.createElement('span', { className: 'e-chat-file-size', innerHTML: (fileData.size / 1024).toFixed(2) + " KB" });
            fileDetails.append(fileName, fileSize);
            fileItem.append(fileIcon, fileDetails);
        }
        if (isForFooter) {
            var closeButton_1 = this.createElement('span', { attrs: { class: 'e-icons e-chat-close', role: 'button', 'aria-label': 'Clear file', tabindex: '-1' } });
            EventHandler.add(closeButton_1, 'click', function () { return _this.handleRemoveUploadedFile(closeButton_1, fileData, fileItem); });
            fileItem.append(closeButton_1);
            var progressBar = this.createElement('div', { className: 'e-chat-progress-bar' });
            var progressFill = this.createElement('div', { id: "e-chat-progress-" + fileData.name, className: 'e-chat-progress-fill' });
            progressBar.appendChild(progressFill);
            fileItem.append(progressBar);
            EventHandler.add(fileItem, 'click', function (event) {
                if (closeButton_1 && (event.target === closeButton_1 || event.target.classList.contains('e-chat-close'))) {
                    return;
                }
                _this.handleAttachmentPreview(fileData, false);
            });
        }
        return fileItem;
    };
    ChatUI.prototype.handleRemoveUploadedFile = function (closeButton, fileData, fileItem) {
        this.uploaderObj.remove(fileData);
        this.uploadedFiles = this.uploadedFiles.filter(function (file) { return file.name !== fileData.name; });
        EventHandler.remove(closeButton, 'click', this.handleRemoveUploadedFile);
        fileItem.remove();
        var textLength = this.editableTextarea.innerText.length;
        var totalLength = textLength + this.uploadedFiles.length;
        this.activateSendIcon(totalLength);
    };
    ChatUI.prototype.handleAttachmentPreview = function (file, isAfterPreview) {
        var eventArgs = { cancel: false };
        if (this.attachmentSettings.attachmentClick) {
            this.attachmentSettings.attachmentClick.call(this, eventArgs);
        }
        else if (!eventArgs.cancel) {
            this.showMediaPreview(file, isAfterPreview);
        }
    };
    ChatUI.prototype.getFilePreview = function (file) {
        var sizeInKB = file.size / 1024;
        var sizeDisplay = sizeInKB < 1024 ? sizeInKB.toFixed(2) + " KB" : (sizeInKB / 1024).toFixed(2) + " MB";
        var filePreview = this.createElement('div', {
            className: 'e-file-preview'
        });
        var fileIcon = this.createElement('span', {
            className: 'e-icons e-file-document'
        });
        var previewText = this.createElement('div', {
            className: 'e-preview-file-text',
            innerHTML: this.l10n.getConstant('filePreview')
        });
        var filedetails = this.createElement('div', {
            className: 'e-file-details',
            innerHTML: '' + file.type + ' - ' + sizeDisplay
        });
        this.appendChildren(filePreview, fileIcon, previewText, filedetails);
        return filePreview;
    };
    ChatUI.prototype.removeFilesPreview = function () {
        var previewWrapper = this.messageWrapper.querySelector('.e-preview-overlay');
        if (previewWrapper) {
            previewWrapper.remove();
        }
    };
    ChatUI.prototype.renderPreviewTemplate = function (selectedFile, isAfterPreview) {
        var introContainer = this.createElement('div', { className: 'e-preview-template' });
        var fileIndex;
        if (isAfterPreview) {
            fileIndex = this.messages.findIndex(function (msg) { return msg.attachedFile === selectedFile; });
        }
        else {
            fileIndex = Array.isArray(this.uploadedFiles) && selectedFile ?
                this.uploadedFiles.findIndex(function (fileData) { return fileData.id === selectedFile.id; }) : -1;
        }
        this.getContextObject('previewtemplate', introContainer, fileIndex, null, null, selectedFile);
        return introContainer;
    };
    ChatUI.prototype.showMediaPreview = function (file, isAfterPreview) {
        var previewOverlay = this.createElement('div', {
            className: 'e-preview-overlay',
            attrs: {
                tabindex: '0'
            }
        });
        var previewHeader = this.createElement('div', {
            className: 'e-preview-header'
        });
        var closeButton = this.createElement('span', {
            className: 'e-chat-back-icon e-icons',
            attrs: {
                title: this.l10n.getConstant('close')
            }
        });
        previewHeader.appendChild(closeButton);
        var fileNameLabel = this.createElement('span', {
            className: 'e-preview-file-name',
            innerHTML: file.name
        });
        previewHeader.appendChild(fileNameLabel);
        if (isAfterPreview) {
            var downloadButton = this.createElement('a', {
                className: 'e-chat-download e-icons',
                attrs: {
                    href: file.fileSource,
                    download: file.name,
                    target: '_blank',
                    title: this.l10n.getConstant('download')
                }
            });
            previewHeader.appendChild(downloadButton);
        }
        var previewContent;
        if (this.attachmentSettings.previewTemplate) {
            previewContent = this.renderPreviewTemplate(file, isAfterPreview);
        }
        else {
            if (this.isImageFile(file.rawFile)) {
                previewContent = this.createImageContent(file, 'e-image-preview');
            }
            else if (this.isVideoFile(file.rawFile)) {
                previewContent = this.createElement('video', {
                    attrs: {
                        autoplay: 'true',
                        muted: 'true',
                        controls: 'true',
                        controlsList: 'nodownload noplaybackrate',
                        disablepictureinpicture: 'true',
                        preload: 'metadata',
                        title: file.name
                    },
                    className: 'e-video-preview'
                });
                var source = this.createElement('source', {
                    attrs: {
                        src: file.fileSource,
                        type: file.rawFile.type
                    }
                });
                previewContent.appendChild(source);
            }
            else {
                previewContent = this.getFilePreview(file);
            }
        }
        this.appendChildren(previewOverlay, previewHeader, previewContent);
        this.messageWrapper.appendChild(previewOverlay);
        previewOverlay.focus();
        var escKeyHandler = function (event) {
            if (event.key === 'Escape') {
                closePreview();
            }
        };
        var overlayClickHandler = function (event) {
            if (event.currentTarget === event.target) {
                closePreview();
            }
        };
        var closeClickHandler = function () {
            closePreview();
        };
        var closePreview = function () {
            EventHandler.remove(previewOverlay, 'keydown', escKeyHandler);
            EventHandler.remove(previewOverlay, 'click', overlayClickHandler);
            EventHandler.remove(closeButton, 'click', closeClickHandler);
            previewOverlay.remove();
        };
        EventHandler.add(previewOverlay, 'keydown', escKeyHandler);
        EventHandler.add(previewOverlay, 'click', overlayClickHandler);
        EventHandler.add(closeButton, 'click', closeClickHandler);
    };
    ChatUI.prototype.createImageContent = function (file, imageClass) {
        var imageElement = this.createElement('img', {
            attrs: {
                src: file.fileSource,
                alt: file.name
            },
            className: imageClass
        });
        return imageElement;
    };
    ChatUI.prototype.updateAttachmentSettings = function (newAttachment) {
        this.removeFilesPreview();
        this.uploaderObj.allowedExtensions = !isNOU(newAttachment.allowedFileTypes) ? newAttachment.allowedFileTypes
            : this.attachmentSettings.allowedFileTypes;
        this.uploaderObj.maxFileSize = !isNOU(newAttachment.maxFileSize) ? newAttachment.maxFileSize : this.attachmentSettings.maxFileSize;
        this.uploaderObj.asyncSettings = {
            saveUrl: !isNOU(newAttachment.saveUrl) ? newAttachment.saveUrl : this.attachmentSettings.saveUrl,
            removeUrl: !isNOU(newAttachment.removeUrl) ? newAttachment.removeUrl : this.attachmentSettings.removeUrl
        };
        if (!isNOU(newAttachment.path)) {
            this.attachmentSettings.path = newAttachment.path;
        }
        if (!isNOU(newAttachment.enableDragAndDrop)) {
            this.attachmentSettings.enableDragAndDrop = newAttachment.enableDragAndDrop;
        }
        this.uploaderObj.dropArea = this.attachmentSettings.enableDragAndDrop ? this.footer : '';
        if (!isNOU(newAttachment.saveFormat)) {
            if (newAttachment.saveFormat === 'Base64' || newAttachment.saveFormat === 'Blob') {
                this.attachmentSettings.saveFormat = newAttachment.saveFormat;
            }
        }
        if (!isNOU(newAttachment.maximumCount)) {
            this.attachmentSettings.maximumCount = newAttachment.maximumCount;
        }
    };
    ChatUI.prototype.clearUploadedFiles = function () {
        this.uploadedFiles = [];
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
        }
        this.refreshTextareaUI();
    };
    ChatUI.prototype.refreshTextareaUI = function () {
        var textLength = this.editableTextarea.innerText.length;
        var previewCount = this.uploadedFiles && this.uploadedFiles.length ? this.uploadedFiles.length : 0;
        var totalContent = textLength + previewCount;
        this.updateHiddenTextarea(this.editableTextarea.innerText);
        this.activateSendIcon(totalContent);
        this.updateFooterElementClass();
    };
    ChatUI.prototype.handleInput = function (event) {
        var textareaEle = event.target;
        var isEmpty = textareaEle.innerHTML === '<br>';
        if (isEmpty) {
            this.clearBreakTags(textareaEle);
        }
        var textContent = textareaEle.innerText;
        this.refreshTextareaUI();
        this.editableTextarea.focus();
        // Debounced push to undo stack
        this.scheduleUndoPush();
        this.redoStack = [];
        this.triggerUserTyping(event, textContent);
    };
    ChatUI.prototype.onFocusEditableTextarea = function () {
        if (this.footer) {
            this.footer.classList.add('e-footer-focused');
        }
    };
    ChatUI.prototype.onBlurEditableTextarea = function (e) {
        if (this.footer) {
            this.footer.classList.remove('e-footer-focused');
        }
        this.triggerUserTyping(e, e.target.innerText);
    };
    ChatUI.prototype.triggerUserTyping = function (event, value) {
        var eventArgs = {
            event: event,
            message: value,
            user: this.user,
            isTyping: event.type === 'blur' ? false : value.length > 0 ? true : false
        };
        this.trigger('userTyping', eventArgs);
    };
    ChatUI.prototype.renderTypingIndicator = function () {
        var _this = this;
        if (this.indicatorWrapper) {
            this.indicatorWrapper.remove();
        }
        if (!this.typingUsers || this.typingUsers.length === 0) {
            return;
        }
        this.indicatorWrapper = this.createElement('div', {
            className: "e-typing-indicator " + (this.typingUsersTemplate ? 'e-typing-indicator-template' : '')
        });
        if (this.typingUsersTemplate) {
            this.getContextObject('typingUsersTemplate', this.indicatorWrapper, null, null, null);
        }
        else {
            this.typingUsers.slice(0, 3).forEach(function (user) {
                var avatarElement = _this.createAvatarIcon(user, true);
                _this.indicatorWrapper.appendChild(avatarElement);
            });
            var typingMessage = this.createElement('span', { className: 'e-user-text' });
            this.indicatorWrapper.appendChild(typingMessage);
            this.updateUserText();
            var indicatorContainer = this.createElement('div', { className: 'e-indicator-wrapper' });
            for (var i = 0; i < 3; i++) {
                var indicator = this.createElement('span', {
                    className: 'e-indicator'
                });
                this.appendChildren(indicatorContainer, indicator);
            }
            this.indicatorWrapper.appendChild(indicatorContainer);
        }
        this.content.prepend(this.indicatorWrapper);
    };
    ChatUI.prototype.updateUserText = function () {
        var _this = this;
        if (this.typingUsersTemplate) {
            return;
        }
        var userNames = this.typingUsers.filter(function (user) { return user.user !== _this.user.user; })
            .map(function (user) { return user.user; });
        var displayText = this.getTypingMessage(userNames);
        var typingMessage = this.indicatorWrapper.querySelector('.e-user-text');
        typingMessage.innerHTML = displayText;
    };
    ChatUI.prototype.getTypingMessage = function (userNames) {
        if (userNames.length >= 3) {
            return this.l10n.getConstant(userNames.length > 3 ? 'multipleUsersTyping' : 'threeUserTyping')
                .replace('{0}', userNames[0].toString())
                .replace('{1}', userNames[1].toString())
                .replace('{2}', (userNames.length - 2).toString());
        }
        else {
            var userTemplate = this.l10n.getConstant(userNames.length === 2 ? 'twoUserTyping' : 'oneUserTyping');
            return userNames.length === 2
                ? userTemplate.replace('{0}', userNames[0].toString()).replace('{1}', userNames[1].toString())
                : userTemplate.replace('{0}', userNames[0].toString());
        }
    };
    ChatUI.prototype.updateTypingUsers = function (users) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.typingUsers = users;
        this.isProtectedOnChange = prevOnChange;
        this.renderTypingIndicator();
    };
    ChatUI.prototype.updateHeaderIcon = function () {
        var existingIconElement = this.element.querySelector('.e-header-icon');
        if (existingIconElement) {
            existingIconElement.className = "e-header-icon e-icons " + this.headerIconCss;
        }
        else {
            var headerContainer = this.element.querySelector('.e-header');
            if (headerContainer) {
                var iconElement = this.createElement('span', {
                    className: "e-header-icon e-icons " + this.headerIconCss
                });
                headerContainer.prepend(iconElement);
            }
        }
    };
    ChatUI.prototype.updateHeaderText = function () {
        if (this.headerText) {
            var headerTextEle = this.element.querySelector('.e-header-text');
            if (headerTextEle) {
                headerTextEle.innerHTML = this.headerText;
            }
        }
    };
    ChatUI.prototype.renderUpdatedMessage = function () {
        this.messageWrapper.innerHTML = '';
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
        this.updateEmptyChatTemplate();
    };
    ChatUI.prototype.getUserMentionFromContent = function () {
        var _this = this;
        var mentionChips = this.editableTextarea.querySelectorAll('.e-chat-mention-user-chip');
        var updatedMentionedUsers = [];
        mentionChips.forEach(function (chip) {
            var userId = chip.getAttribute('data-user-id');
            var mentionUser = _this.mentionUsers.find(function (user) { return user.id === userId; });
            if (mentionUser) {
                updatedMentionedUsers.push(mentionUser);
            }
            else {
                var mentionedUser = {
                    id: userId,
                    user: chip.textContent
                };
                updatedMentionedUsers.push(mentionedUser);
            }
        });
        return updatedMentionedUsers;
    };
    ChatUI.prototype.onSendIconClick = function (event) {
        var _this = this;
        if (this.editableTextarea && this.uploadedFiles.length === 0 && !this.editableTextarea.innerText.trim()) {
            return;
        }
        var repliedTO = this.currentReplyTo ? {
            user: this.currentReplyTo.author,
            text: this.currentReplyTo.text,
            timestamp: this.currentReplyTo.timeStamp,
            timestampFormat: this.currentReplyTo.timeStampFormat,
            messageID: this.currentReplyTo.id,
            mentionUsers: this.currentReplyTo.mentionUsers,
            attachedFile: this.currentReplyTo.attachedFile
        } : null;
        var messageText = this.replaceMentionChipsWithPlaceholders();
        var mentionUsers = this.getUserMentionFromContent();
        var prevOnChange = this.isProtectedOnChange;
        this.editableTextarea.innerText = '';
        this.clearReplyWrapper();
        this.refreshTextareaUI();
        this.pushToUndoStack(this.editableTextarea.innerText);
        this.triggerUserTyping(event, '');
        if (this.uploadedFiles && this.uploadedFiles.length > 0) {
            var filesCount_1 = this.uploadedFiles.length;
            this.uploadedFiles.forEach(function (file, index) {
                var newMessageObj = {
                    id: _this.element.id + "-message-" + (_this.messages.length + 1),
                    author: _this.user,
                    text: index === filesCount_1 - 1 ? messageText : '',
                    mentionUsers: index === filesCount_1 - 1 ? mentionUsers : [],
                    replyTo: index === filesCount_1 - 1 ? repliedTO : null,
                    attachedFile: file
                };
                var eventArgs = {
                    cancel: false,
                    message: newMessageObj
                };
                _this.trigger('messageSend', eventArgs, function (args) {
                    if (args.cancel) {
                        return;
                    }
                    newMessageObj = args.message;
                    _this.isProtectedOnChange = true;
                    _this.messages = _this.messages.concat([newMessageObj]);
                    _this.isProtectedOnChange = prevOnChange;
                    _this.renderNewMessage(newMessageObj, _this.messages.length - 1);
                });
            });
        }
        else {
            var newMessageObj_1 = {
                id: this.element.id + "-message-" + (this.messages.length + 1),
                author: this.user,
                text: messageText,
                mentionUsers: mentionUsers,
                replyTo: repliedTO,
                attachedFile: null
            };
            var eventArgs = {
                cancel: false,
                message: newMessageObj_1
            };
            this.trigger('messageSend', eventArgs, function (args) {
                if (args.cancel) {
                    return;
                }
                newMessageObj_1 = args.message;
                _this.isProtectedOnChange = true;
                _this.messages = _this.messages.concat([newMessageObj_1]);
                _this.isProtectedOnChange = prevOnChange;
                _this.renderNewMessage(newMessageObj_1, _this.messages.length - 1);
            });
        }
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = false;
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(false, 5);
        this.clearUploadedFiles();
    };
    ChatUI.prototype.replaceMentionChipsWithPlaceholders = function () {
        if (!this.editableTextarea.innerHTML) {
            return this.editableTextarea.innerHTML;
        }
        var tempEle = this.createElement('div');
        tempEle.innerHTML = this.editableTextarea.innerHTML;
        var mentionChips = tempEle.querySelectorAll('span.e-mention-chip');
        var mentionIndex = 0;
        mentionChips.forEach(function (chip) {
            var placeholder = document.createTextNode("{" + mentionIndex++ + "}");
            chip.replaceWith(placeholder);
        });
        return tempEle.innerHTML || '';
    };
    ChatUI.prototype.clearReplyWrapper = function () {
        var replyWrapper = this.footer.querySelector('.e-reply-wrapper');
        if (replyWrapper) {
            var clearIcon = replyWrapper.querySelector('.e-chat-close.e-icons');
            EventHandler.remove(clearIcon, 'click', this.clearReplyWrapper);
            this.footer.removeChild(replyWrapper);
            replyWrapper.remove();
        }
        this.currentReplyTo = null;
    };
    ChatUI.prototype.getContextObject = function (templateName, contentElement, index, message, currentMessagedate, file) {
        var template;
        var context = {};
        switch (templateName.toLowerCase()) {
            case 'messagetemplate': {
                template = this.messageTemplate;
                context = { message: message, index: index };
                break;
            }
            case 'timebreaktemplate': {
                template = this.timeBreakTemplate;
                context = { messageDate: currentMessagedate };
                break;
            }
            case 'typinguserstemplate': {
                template = this.typingUsersTemplate;
                context = { users: this.typingUsers };
                break;
            }
            case 'previewtemplate': {
                template = this.attachmentSettings.previewTemplate;
                context = { selectedFile: file, index: index };
                break;
            }
            case 'attachmenttemplate': {
                template = this.attachmentSettings.attachmentTemplate;
                context = { selectedFile: file };
                break;
            }
        }
        this.updateContent(template, contentElement, context, templateName);
    };
    ChatUI.prototype.handleAutoScroll = function () {
        if (this.isScrollAtBottom) {
            this.updateScroll(this.messageWrapper);
        }
        if (this.autoScrollToBottom) {
            this.updateScroll(this.messageWrapper);
        }
        this.toggleScrollIcon();
    };
    ChatUI.prototype.footerKeyHandler = function (e) {
        var targetElement = e.target;
        if (targetElement.classList.contains('e-chat-attachment-icon')) {
            return;
        }
        this.keyHandler(e, 'footer');
    };
    ChatUI.prototype.scrollBottomKeyHandler = function (e) {
        this.keyHandler(e, 'scrollBottom');
    };
    ChatUI.prototype.keyHandler = function (event, value) {
        if (event.key === 'Enter' && !event.shiftKey) {
            var mentionPopup = document.querySelector('.e-chat-mention.e-mention');
            if (mentionPopup && mentionPopup.classList.contains('e-popup-open')) {
                return;
            }
            switch (value) {
                case 'footer':
                    this.pushToUndoStack(this.editableTextarea.innerText);
                    event.preventDefault();
                    this.onSendIconClick(event);
                    break;
                case 'scrollBottom':
                    this.scrollToBottom();
                    break;
            }
        }
        else {
            this.handleUndoRedo(event);
        }
    };
    ChatUI.prototype.applyPromptChange = function (newState, oldState, event) {
        this.editableTextarea.innerHTML = newState.content;
        this.refreshTextareaUI();
        this.setCursorPosition(newState.selectionStart, newState.selectionEnd);
        this.triggerUserTyping(event, oldState.content);
    };
    ChatUI.prototype.updateFooter = function (showFooter, footerElement) {
        if (!showFooter) {
            footerElement.hidden = true;
        }
        else {
            footerElement.hidden = false;
        }
    };
    ChatUI.prototype.handleScroll = function () {
        this.messageWrapper.querySelectorAll('.e-chat-message-toolbar.e-show').forEach(function (toolbar) {
            toolbar.classList.remove('e-show');
        });
        var atBottom = this.checkScrollAtBottom(this.messageWrapper, 0);
        if (atBottom) {
            this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
            var suggestionEle = this.element.querySelector('.e-suggestions');
            if (suggestionEle) {
                this.toggleClassName(suggestionEle, atBottom, 'suggestion');
                if (!atBottom || !this.isScrollAtBottom) {
                    this.updateScroll(this.messageWrapper);
                }
            }
        }
        if (this.loadOnDemand && this.messageWrapper.scrollTop === 0) {
            this.multiplier += this.multiplier;
            this.loadMoreMessages();
        }
        this.isScrollAtBottom = atBottom;
    };
    ChatUI.prototype.toggleClassName = function (element, atBottom, name) {
        switch (name) {
            case 'downArrow':
                element.classList.toggle('e-arrowdown-hide', atBottom);
                element.classList.toggle('e-arrowdown-show', !atBottom);
                break;
            case 'suggestion':
                element.classList.toggle('e-show-suggestions', atBottom);
                element.classList.toggle('e-hide-suggestions', !atBottom);
                break;
            case 'scroll':
                element.classList.toggle('e-scroll-smooth', !atBottom);
                break;
        }
    };
    ChatUI.prototype.toggleScrollIcon = function () {
        var atBottom = this.checkScrollAtBottom(this.messageWrapper, 0);
        this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
        var suggestionEle = this.element.querySelector('.e-suggestions');
        if (suggestionEle) {
            this.toggleClassName(suggestionEle, atBottom, 'suggestion');
            if (atBottom) {
                this.updateScroll(this.messageWrapper);
            }
        }
        this.isScrollAtBottom = atBottom;
    };
    ChatUI.prototype.scrollBtnClick = function () {
        this.toggleClassName(this.messageWrapper, false, 'scroll');
        this.scrollToBottom();
        this.toggleClassName(this.messageWrapper, true, 'scroll');
    };
    ChatUI.prototype.updateMessageItem = function (message, msgId) {
        if (message.author || message.timeStamp || this.messageTemplate) {
            this.renderUpdatedMessage();
            return;
        }
        var messageItem = this.messageWrapper.querySelector("#" + msgId);
        if (!messageItem) {
            return;
        }
        if (message.id) {
            messageItem.id = message.id;
        }
        var messageContent = messageItem.querySelector('.e-message-content');
        if (messageContent && message.text) {
            var textElement = messageItem.querySelector('.e-text');
            if (textElement) {
                textElement.innerHTML = this.getMessageText(message);
            }
            this.updateForwardAndReplyElement(message, messageContent);
        }
        if (message.status) {
            var statusTextElement = messageItem.querySelector('.e-status-text');
            if (statusTextElement && message.status.text) {
                statusTextElement.innerHTML = message.status.text;
            }
            var statusIconElement = messageItem.querySelector('.e-status-icon');
            if (statusIconElement && message.status.iconCss) {
                var iconCss = message.status.iconCss;
                statusIconElement.className = "e-status-icon " + iconCss;
                if (message.status.tooltip) {
                    statusIconElement.title = message.status.tooltip;
                }
            }
        }
    };
    ChatUI.prototype.updateMentionObj = function () {
        if (isNOU(this.mentionObj)) {
            this.initializeMention();
        }
        else {
            if (this.mentionUsers.length > 0) {
                this.mentionObj.dataSource = this.getMentionDataSource(this.mentionUsers);
            }
            else {
                this.destroyAndNullify(this.mentionObj);
                this.mentionObj = null;
            }
        }
    };
    ChatUI.prototype.updateLocale = function () {
        var _this = this;
        // Updated locale for forward message text.
        this.l10n.setLocale(this.locale);
        var messages = this.messageWrapper.querySelectorAll('.e-message-item');
        messages.forEach(function (message) {
            var forwardEle = message.querySelector('.e-forwarded-indicator');
            if (forwardEle) {
                forwardEle.querySelector('.e-forward-message').innerHTML = _this.l10n.getConstant('forwarded');
            }
        });
        if (this.mentionObj) {
            this.mentionObj.noRecordsTemplate = this.l10n.getConstant('noRecordsTemplate');
        }
        //update locale for icons
        if (this.sendIcon) {
            this.sendIcon.setAttribute('title', this.l10n.getConstant('send'));
        }
        if (this.attachmentIcon) {
            this.attachmentIcon.setAttribute('title', this.l10n.getConstant('attachments'));
        }
        var closeIcon = this.viewWrapper.querySelector('.e-chat-close');
        if (closeIcon) {
            closeIcon.setAttribute('title', this.l10n.getConstant('close'));
        }
        // Update locale for file preview
        var attachmentPreview = this.viewWrapper.querySelector('.e-preview-overlay');
        if (attachmentPreview) {
            var downloadIcon = attachmentPreview.querySelector('.e-chat-download');
            if (downloadIcon) {
                downloadIcon.setAttribute('title', this.l10n.getConstant('download'));
            }
            var backIcon = attachmentPreview.querySelector('.e-chat-back-icon');
            if (backIcon) {
                backIcon.setAttribute('title', this.l10n.getConstant('close'));
            }
            var filePreviewText = attachmentPreview.querySelector('.e-preview-file-text');
            if (filePreviewText) {
                filePreviewText.textContent = this.l10n.getConstant('filePreview');
            }
        }
        //update locale for failure message
        var failureMessageElem = this.viewWrapper.querySelector('.e-failure-message');
        if (failureMessageElem) {
            if (failureMessageElem.classList.contains('e-size-failure')) {
                failureMessageElem.textContent = this.l10n.getConstant('fileSizeFailure');
            }
            else {
                var failureText = this.l10n.getConstant('fileCountFailure');
                failureText = failureText.replace('{0}', this.attachmentSettings.maximumCount.toString());
                if (this.attachmentSettings.maximumCount === 1) {
                    failureText = failureText.replace('files', 'file');
                }
                failureMessageElem.textContent = failureText;
            }
        }
        // Update locale for typing users text.
        if (!this.typingUsers || this.typingUsers.length === 0) {
            return;
        }
        this.updateUserText();
    };
    ChatUI.prototype.wireEvents = function () {
        this.wireFooterEvents(this.footerTemplate);
        EventHandler.add(this.messageWrapper, 'scroll', this.handleScroll, this);
        EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        EventHandler.add(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler, this);
    };
    ChatUI.prototype.unwireEvents = function () {
        this.unWireFooterEvents(this.footerTemplate);
        EventHandler.remove(this.messageWrapper, 'scroll', this.handleScroll);
        EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        EventHandler.remove(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler);
        if (this.attachmentIcon) {
            EventHandler.clearEvents(this.attachmentIcon);
        }
    };
    ChatUI.prototype.destroyAttachments = function () {
        if (this.uploaderObj) {
            this.uploaderObj.destroy();
            this.uploaderObj = null;
        }
        if (this.attachmentIcon) {
            this.attachmentIcon.innerHTML = '';
            this.attachmentIcon.remove();
            this.attachmentIcon = null;
        }
        if (this.dropArea) {
            this.dropArea.innerHTML = '';
            this.dropArea.remove();
            this.dropArea = null;
        }
        if (this.messageWrapper) {
            var previewOverlay = this.messageWrapper.querySelector('.e-preview-overlay');
            if (previewOverlay) {
                previewOverlay.remove();
            }
        }
        this.uploadedFiles = [];
    };
    ChatUI.prototype.destroyChatUI = function () {
        var properties = [
            'content',
            'sendIcon',
            'clearIcon',
            'editableTextarea',
            'footer',
            'indicatorWrapper',
            'messageWrapper',
            'viewWrapper',
            'chatHeader'
        ];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            var element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    };
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    ChatUI.prototype.scrollToBottom = function () {
        this.updateScroll(this.messageWrapper);
        this.toggleScrollIcon();
    };
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
    ChatUI.prototype.addMessage = function (message) {
        if (isNOU(message)) {
            return;
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (typeof message === 'string') {
            var newMessageObj = {
                id: this.element.id + "-message-" + (this.messages.length + 1),
                author: this.user,
                text: message,
                timeStamp: new Date(),
                timeStampFormat: this.timeStampFormat,
                attachedFile: null
            };
            this.messages = this.messages.concat([newMessageObj]);
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        else {
            var newMessageObj = __assign({}, message, { id: message.id || this.element.id + "-message-" + (this.messages.length + 1), author: message.author || this.user, text: message.text || '', timeStamp: message.timeStamp || new Date(), timeStampFormat: message.timeStampFormat || this.timeStampFormat, status: message.status, mentionUsers: message.mentionUsers || [], isPinned: message.isPinned || false, replyTo: message.replyTo, isForwarded: message.isForwarded || false, attachedFile: message.attachedFile });
            this.messages = this.messages.concat([newMessageObj]);
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(true, 5);
        this.isProtectedOnChange = prevOnChange;
    };
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
    ChatUI.prototype.updateMessage = function (message, msgId) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.messages = this.messages.map(function (messageItem) {
            return messageItem.id === msgId ? __assign({}, messageItem, message) : messageItem;
        });
        this.updateMessageItem(message, msgId);
        this.isProtectedOnChange = prevOnChange;
    };
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    ChatUI.prototype.scrollToMessage = function (messageId) {
        var messageElement = this.messageWrapper.querySelector("#" + messageId);
        if (!messageElement) {
            return;
        }
        messageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    ChatUI.prototype.focus = function () {
        if (this.editableTextarea) {
            this.setFocusAtEnd(this.editableTextarea);
        }
    };
    ChatUI.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unwireEvents();
        if (this.toolbar) {
            this.toolbar.off('render-react-toolbar-template', this.addReactToolbarPortals);
        }
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        this.element.classList.remove('e-rtl');
        this.destroyAndNullify(this.downArrowIcon);
        this.destroyAndNullify(this.toolbar);
        this.destroyAndNullify(this.dropDownButton);
        this.destroyAndNullify(this.mentionObj);
        this.destroyChatUI();
        this.destroyAttachments();
        this.intl = null;
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    ChatUI.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension(this.element, this.width, this.height);
                    break;
                case 'placeholder':
                    this.updatePlaceholder(this.placeholder);
                    break;
                case 'cssClass':
                    this.updateCssClass(this.element, newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (!isNOU(this.toolbar)) {
                        this.toolbar.enableRtl = this.enableRtl;
                        this.toolbar.dataBind();
                    }
                    break;
                case 'showHeader':
                    this.updateHeader(this.showHeader, this.chatHeader, this.viewWrapper);
                    break;
                case 'enableCompactMode':
                    this.initializeCompactMode();
                    this.renderUpdatedMessage();
                    this.updateScrollPosition(true, 5);
                    break;
                case 'headerText':
                    this.updateHeaderText();
                    break;
                case 'headerIconCss':
                    this.updateHeaderIcon();
                    break;
                case 'messageToolbarSettings':
                case 'messages': {
                    this.renderUpdatedMessage();
                    // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
                    this.updateScrollPosition(true, 5);
                    break;
                }
                case 'user': {
                    var newUser = {
                        id: newProp.user.id ? newProp.user.id : this.user.id,
                        user: newProp.user.user ? newProp.user.user : this.user.user,
                        avatarUrl: newProp.user.avatarUrl ? newProp.user.avatarUrl : this.user.avatarUrl,
                        avatarBgColor: newProp.user.avatarBgColor ? newProp.user.avatarBgColor : this.user.avatarBgColor,
                        cssClass: newProp.user.cssClass ? newProp.user.cssClass : this.user.cssClass,
                        statusIconCss: newProp.user.statusIconCss ? newProp.user.statusIconCss : this.user.statusIconCss
                    };
                    this.user = __assign({}, this.user, newUser);
                    break;
                }
                case 'showTimeStamp':
                case 'timeStampFormat':
                case 'showTimeBreak':
                    if (this.messages.length > 0) {
                        this.renderUpdatedMessage();
                    }
                    break;
                case 'showFooter':
                    this.updateFooter(this.showFooter, this.footer);
                    break;
                case 'autoScrollToBottom':
                    this.handleAutoScroll();
                    break;
                case 'suggestions':
                    this.handleSuggestionUpdate();
                    break;
                case 'typingUsers':
                    this.updateTypingUsers(this.typingUsers);
                    break;
                case 'locale':
                    this.updateLocale();
                    break;
                case 'currencyCode':
                    this.refresh();
                    break;
                case 'mentionTriggerChar':
                    this.mentionObj.mentionChar = newProp.mentionTriggerChar;
                    break;
                case 'mentionUsers':
                    this.updateMentionObj();
                    break;
                case 'enableAttachments':
                    if (!this.footerTemplate) {
                        var footerIconsWrapper = this.element.querySelector('.e-footer-icons-wrapper');
                        this.updateAttachmentElement(footerIconsWrapper);
                    }
                    break;
                case 'attachmentSettings':
                    this.updateAttachmentSettings(newProp.attachmentSettings);
                    break;
            }
        }
    };
    __decorate([
        Property('100%')
    ], ChatUI.prototype, "width", void 0);
    __decorate([
        Property('100%')
    ], ChatUI.prototype, "height", void 0);
    __decorate([
        Complex({}, User)
    ], ChatUI.prototype, "user", void 0);
    __decorate([
        Property('Chat')
    ], ChatUI.prototype, "headerText", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "headerIconCss", void 0);
    __decorate([
        Property('Type your message…')
    ], ChatUI.prototype, "placeholder", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], ChatUI.prototype, "showHeader", void 0);
    __decorate([
        Property(true)
    ], ChatUI.prototype, "showFooter", void 0);
    __decorate([
        Complex({ items: [] }, ToolbarSettings)
    ], ChatUI.prototype, "headerToolbar", void 0);
    __decorate([
        Property([])
    ], ChatUI.prototype, "suggestions", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "showTimeBreak", void 0);
    __decorate([
        Collection([], Message)
    ], ChatUI.prototype, "messages", void 0);
    __decorate([
        Collection([], User)
    ], ChatUI.prototype, "typingUsers", void 0);
    __decorate([
        Property('dd/MM/yyyy hh:mm a')
    ], ChatUI.prototype, "timeStampFormat", void 0);
    __decorate([
        Property(true)
    ], ChatUI.prototype, "showTimeStamp", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "autoScrollToBottom", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "loadOnDemand", void 0);
    __decorate([
        Collection([], User)
    ], ChatUI.prototype, "mentionUsers", void 0);
    __decorate([
        Property('@')
    ], ChatUI.prototype, "mentionTriggerChar", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "suggestionTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "footerTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "emptyChatTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "messageTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "timeBreakTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "typingUsersTemplate", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "enableCompactMode", void 0);
    __decorate([
        Complex({ width: '100%', items: [{ iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' }, { iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' }, { iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' }, { iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }] }, MessageToolbarSettings)
    ], ChatUI.prototype, "messageToolbarSettings", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "messageSend", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "userTyping", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "mentionSelect", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "enableAttachments", void 0);
    __decorate([
        Complex({ saveUrl: '', removeUrl: '', maxFileSize: 30000000, allowedFileTypes: '', saveFormat: 'Blob', path: '', enableDragAndDrop: true, maximumCount: 10, previewTemplate: '', attachmentTemplate: '' }, FileAttachmentSettings)
    ], ChatUI.prototype, "attachmentSettings", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "beforeAttachmentUpload", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "attachmentUploadSuccess", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "attachmentUploadFailure", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "attachmentRemoved", void 0);
    ChatUI = __decorate([
        NotifyPropertyChanges
    ], ChatUI);
    return ChatUI;
}(InterActiveChatBase));
export { ChatUI };
