import * as events from '../base/constant';
import * as classes from '../base/classes';
import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { detach, Draggable, extend, formatUnit, getComponent, isNullOrUndefined as isNOU, select } from '@syncfusion/ej2-base';
import { NodeSelection } from '../../selection/selection';
import { RenderType } from '../base';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { AIAssistantActions } from '../../editor-manager/plugin/ai-assitant-actions';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
/**
 * Provides AI Assistant functionalities to the Rich Text Editor.
 * Inject this class as a module to access its features.
 */
var AIAssistant = /** @class */ (function () {
    function AIAssistant(parent, serviceLocator) {
        this.parent = parent;
        this.locator = serviceLocator;
        this.rendererFactory = this.locator.getService('rendererFactory');
        this.L10n = serviceLocator.getService('rteLocale');
        this.isDestroyed = false;
        this.lastResponse = '';
        this.isRendered = false;
        this.allPrompts = [];
        this.currentSelection = new NodeSelection(this.parent.inputElement);
        this.handlePopupEscapeBoundFn = this.handlePopupEscape.bind(this);
        this.addEventListener();
    }
    AIAssistant.prototype.addEventListener = function () {
        this.parent.on(events.onAIAssistant, this.onToolbarClick, this);
        this.parent.on(events.menuItemselected, this.onMenuItemSelect, this);
        this.parent.on(events.menuBeforeOpen, this.beforeMenuOpen, this);
        this.parent.on(events.menuBeforeClose, this.beforeMenuClose, this);
        this.parent.on(events.editAreaClick, this.updateCurrentSelection, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.windowResize, this.refreshPosition, this);
        this.parent.on(events.scroll, this.refreshPosition, this);
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.afterKeyDown, this.refreshPosition, this);
        this.parent.on(events.contentscroll, this.refreshPosition, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.bindOnEnd, this.bindOnEnd, this);
        this.parent.on(events.bindCssClass, this.updateCssClass, this);
        this.parent.on(events.hidePopup, this.hideAIQueryPopup, this);
    };
    AIAssistant.prototype.onKeyDown = function (event) {
        var originalEvent = event.args;
        if (!isNOU(originalEvent) && !isNOU(originalEvent.action) && (originalEvent.action === 'ai-query')) {
            originalEvent.preventDefault(); // Prevent the enter action.
            this.showAIQueryPopup(event.args);
            this.setEditAreaRangeAndFocus();
        }
    };
    AIAssistant.prototype.onToolbarClick = function (notifyArgs) {
        var command = notifyArgs.args.item.subCommand;
        switch (command) {
            case 'AIQuery':
                this.currentAction = 'Toolbar';
                this.currentSelection = notifyArgs.selection;
                this.currentSelection.restore();
                if (document.body.contains(this.element)) {
                    this.hideAIQueryPopup();
                }
                else {
                    this.showAIQueryPopup(notifyArgs.args.originalEvent);
                    this.setEditAreaRangeAndFocus();
                }
                this.updateAIQueryButtonActiveState();
                break;
            case 'AICommands':
                break;
        }
    };
    AIAssistant.prototype.onMenuItemSelect = function (args) {
        if (args.element.closest('.e-rte-aicommands-menu') && args.item.id !== 'aicommands' && !isNOU(args.item.prompt)) { // Prevent the Parent Item processing.
            this.currentAction = 'Menu';
            if (this.parent.userAgentData.getBrowser() === 'Safari') {
                this.currentSelection = this.parent.htmlEditorModule.saveSelection;
            }
            else {
                this.updateCurrentSelection();
            }
            var isQuickToolbarOpen = this.parent.element.querySelectorAll('.e-rte-quick-popup.e-popup-open').length > 0;
            if (isQuickToolbarOpen) {
                this.parent.quickToolbarModule.hideQuickToolbars();
            }
            var isNotFromToolbar = args.element.closest('#' + this.parent.getID() + '_QueryPopupCommandsMenu');
            if (isNOU(isNotFromToolbar)) {
                this.showAIQueryPopup(args.event, args.item.prompt);
            }
        }
    };
    AIAssistant.prototype.showAIQueryPopup = function (event, prompt) {
        this.showQueryPopup(event);
        if (!isNOU(prompt)) {
            if (this.currentAction === 'Toolbar') {
                this.currentSelection.restore();
            }
            this.assistView.executePrompt(prompt);
        }
    };
    AIAssistant.prototype.updateAIQueryButtonActiveState = function () {
        var toolbarItem = this.parent.getToolbarElement();
        if (isNOU(toolbarItem)) {
            return;
        }
        var aiQueryButton = toolbarItem.querySelector('.e-magic-wand');
        if (!isNOU(aiQueryButton) && !isNOU(aiQueryButton.parentElement) && !isNOU(aiQueryButton.parentElement.parentElement)) {
            if (document.body.contains(this.element)) {
                aiQueryButton.parentElement.parentElement.classList.add('e-active');
            }
            else {
                aiQueryButton.parentElement.parentElement.classList.remove('e-active');
            }
        }
        else {
            return;
        }
    };
    AIAssistant.prototype.render = function () {
        var popupRoot = this.parent.createElement('div', { id: this.parent.getID() + '_RTE_Smart_AI_Query_Popup', className: classes.CLS_RTE_ELEMENTS + ' e-rte-aiquery-popup e-popup-close ' + this.parent.getCssClass() });
        if (this.parent.aiAssistantSettings.popupMaxHeight !== 'auto') {
            popupRoot.style.maxHeight = formatUnit(this.parent.aiAssistantSettings.popupMaxHeight);
        }
        var contentWrapper = this.parent.createElement('div', { className: 'e-rte-ai-assit-content-container' });
        var assistViewRoot = this.parent.createElement('div', { id: this.parent.getID() + '_RTE_Smart_AI_Query_AssistView' });
        var queryPopup = new Popup(null, {
            width: this.parent.userAgentData.isMobileDevice() ? '100%' : this.parent.aiAssistantSettings.popupWidth,
            position: this.parent.userAgentData.isMobileDevice() ? { X: 0, Y: 0 } : { X: 'right', Y: 'top' },
            enableRtl: this.parent.enableRtl,
            offsetX: -10,
            relateTo: this.parent.element,
            actionOnScroll: 'none',
            content: contentWrapper
        });
        contentWrapper.appendChild(assistViewRoot);
        this.renderAssistView(assistViewRoot);
        this.queryPopup = queryPopup;
        this.element = popupRoot;
        this.renderTooltip();
    };
    AIAssistant.prototype.renderAssistView = function (assistViewRoot) {
        var _this = this;
        this.assistView = new AIAssistView({
            views: [
                {
                    name: this.L10n.getConstant('aiAssistantName')
                }
            ],
            promptRequest: this.onPromptRequest.bind(this),
            responseToolbarSettings: {
                items: this.getToolbarItems(this.parent.aiAssistantSettings.responseToolbarSettings, 'Response'),
                itemClicked: function (args) {
                    var eventArgs = {
                        requestType: 'Response',
                        originalEvent: args.event,
                        item: args.item,
                        dataIndex: args.dataIndex,
                        cancel: args.cancel
                    };
                    _this.onAssitantToolbarClick(eventArgs);
                }
            },
            promptToolbarSettings: {
                items: this.getToolbarItems(this.parent.aiAssistantSettings.promptToolbarSettings, 'Prompt'),
                itemClicked: function (args) {
                    var eventArgs = {
                        requestType: 'Prompt',
                        originalEvent: args.event,
                        item: args.item,
                        dataIndex: args.dataIndex,
                        cancel: args.cancel
                    };
                    _this.onAssitantToolbarClick(eventArgs);
                }
            },
            prompts: this.parsePromptResponses(this.parent.aiAssistantSettings.prompts),
            promptPlaceholder: this.parent.aiAssistantSettings.placeholder,
            promptSuggestions: this.parent.aiAssistantSettings.suggestions,
            bannerTemplate: this.parent.aiAssistantSettings.bannerTemplate,
            stopRespondingClick: this.handleStopResponse.bind(this),
            toolbarSettings: {
                items: this.getToolbarItems(this.parent.aiAssistantSettings.headerToolbarSettings, 'Header'),
                itemClicked: function (args) {
                    var eventArgs = {
                        requestType: 'Header',
                        originalEvent: args.event,
                        item: args.item,
                        dataIndex: args.dataIndex,
                        cancel: args.cancel
                    };
                    _this.onAssitantToolbarClick(eventArgs);
                }
            },
            footerToolbarSettings: {
                items: [
                    { iconCss: 'e-icons e-history', tooltip: this.L10n.getConstant('aiAssistantHistoryButton'), align: 'Right', disabled: true }
                ],
                itemClick: function (args) {
                    args.requestType = 'Footer';
                    _this.onAssitantToolbarClick(args);
                }
            },
            showClearButton: true,
            enablePersistence: this.parent.enablePersistence,
            cssClass: this.parent.getCssClass()
        });
        this.assistView.appendTo(assistViewRoot);
        this.assistViewEditArea = this.assistView.element.querySelector('.e-assist-textarea');
    };
    AIAssistant.prototype.onAssitantToolbarClick = function (args) {
        var _this = this;
        this.parent.trigger('aiAssistantToolbarClick', args, function (toolbarClickArgs) {
            if (!toolbarClickArgs.cancel) {
                switch (toolbarClickArgs.requestType) {
                    case 'Header': {
                        if (toolbarClickArgs.item.iconCss === 'e-icons e-close') {
                            _this.hideAIQueryPopup();
                            args.cancel = true;
                        }
                        if (toolbarClickArgs.item.iconCss === 'e-icons e-trash') {
                            _this.addEditorPromptCollection(_this.assistView.prompts);
                            _this.assistView.prompts = [];
                            _this.assistView.dataBind();
                            _this.updateHistoryButtonStatus();
                            args.cancel = true;
                        }
                        break;
                    }
                    case 'Prompt':
                        break;
                    case 'Footer':
                        if (toolbarClickArgs.item.iconCss === 'e-icons e-history') {
                            _this.handleHistoryButtonClick();
                        }
                        break;
                    case 'Response':
                        if (toolbarClickArgs.item.iconCss === 'e-icons e-check') {
                            var response = _this.assistView.prompts[args.dataIndex].response;
                            _this.hideAIQueryPopup();
                            _this.handleInsertContent(response);
                            args.cancel = true;
                        }
                        else if (toolbarClickArgs.item.iconCss === 'e-icons e-repeat') {
                            _this.assistView.executePrompt(_this.assistView.prompts[args.dataIndex].prompt);
                        }
                        break;
                }
            }
        });
    };
    AIAssistant.prototype.onPromptRequest = function (args) {
        if (this.currentAction === 'Toolbar' || this.parent.userAgentData.getBrowser() === 'Safari') {
            this.currentSelection.restore();
        }
        this.blockNodes = this.parent.formatter.editorManager.domNode.blockNodes();
        this.queryPopup.element.classList.add('processing');
        var range = this.parent.getRange();
        var htmlString;
        if (this.assistView.prompts.length === 1) {
            this.isProcessWholeEditorContent = false;
            if (!this.parent.isRTEFocused) {
                htmlString = this.parent.getHtml();
                this.isProcessWholeEditorContent = true;
            }
            else if (range.collapsed && this.blockNodes.length > 0) {
                htmlString = this.blockNodes[0].outerHTML;
            }
            else {
                htmlString = this.parent.getSelectedHtml();
            }
        }
        else {
            var length_1 = this.assistView.prompts.length;
            htmlString = this.assistView.prompts[length_1 - 2].response; // Since executing a prompt adds a item to the prompts array to get last response -2 is needed.
        }
        var textContent = this.parent.createElement('div', { innerHTML: htmlString }).textContent;
        var promptEventArgs = {
            html: htmlString,
            text: textContent,
            cancel: args.cancel,
            responseToolbarItems: args.responseToolbarItems,
            prompt: args.prompt,
            promptSuggestions: args.promptSuggestions
        };
        this.parent.trigger('aiAssistantPromptRequest', promptEventArgs, function (eventArgs) {
            if (eventArgs.cancel) {
                args.cancel = true;
            }
            else {
                args.cancel = false;
            }
        });
    };
    AIAssistant.prototype.streamResponse = function (response, isFinalUpdate) {
        this.lastResponse = response;
        var htmlResponse = this.parseMarkdown(this.lastResponse);
        this.assistView.addPromptResponse(htmlResponse, isFinalUpdate);
        this.assistView.scrollToBottom();
        // Simulate delay using setTimeout without await
        setTimeout(function () {
            // This block executes after 50ms
        }, this.parent.element.dataset.rteUnitTesting === 'true' ? 0 : 50);
    };
    AIAssistant.prototype.parseMarkdown = function (text) {
        return MarkdownConverter.toHtml(text);
    };
    AIAssistant.prototype.parsePromptResponses = function (prompts) {
        if (!prompts || prompts.length === 0) {
            return prompts;
        }
        var parsedPrompts = [];
        for (var i = 0; i < prompts.length; i++) {
            var prompt_1 = prompts[i];
            var newPrompt = extend(null, prompt_1, null, true);
            if (newPrompt.response) {
                newPrompt.response = this.parseMarkdown(newPrompt.response);
            }
            parsedPrompts.push(newPrompt);
        }
        return parsedPrompts;
    };
    AIAssistant.prototype.handleStopResponse = function (args) {
        this.parent.trigger('aiAssistantStopRespondingClick', args);
        this.lastResponse = '';
        this.queryPopup.element.classList.remove('processing');
    };
    AIAssistant.prototype.hideAIQueryPopup = function () {
        var _this = this;
        if (!isNOU(this.queryPopup) && !isNOU(this.queryPopup.element) && this.queryPopup.element.classList.contains('e-popup-open')) {
            var eventArgs = {
                cancel: false,
                popup: this.queryPopup,
                element: this.queryPopup.element,
                type: 'AIAssistant',
                originalEvent: !isNOU(event) ? event : undefined
            };
            this.triggerBeforePopupOpenCloseEvent('beforePopupClose', eventArgs, eventArgs, function () {
                _this.historyDropDownButton.destroy();
                if (!isNOU(_this.menu)) {
                    _this.menu.destroy();
                }
                if (!isNOU(_this.menuDropDown)) {
                    _this.menuDropDown.destroy();
                }
                if (_this.queryPopup.element.classList.contains('processing')) {
                    _this.assistView.addPromptResponse('', true);
                    _this.lastResponse = '';
                    _this.queryPopup.element.classList.remove('processing');
                }
                _this.addEditorPromptCollection(_this.assistView.prompts);
                _this.assistView.prompts = [];
                _this.assistView.dataBind();
                _this.toolTip.close();
                _this.queryPopup.hide();
                _this.element = detach(_this.element);
                _this.updateAIQueryButtonActiveState();
            });
        }
    };
    AIAssistant.prototype.addEditorPromptCollection = function (prompts) {
        if (this.allPrompts.length > this.parent.aiAssistantSettings.maxPromptHistory) {
            var itemsToRemove = this.allPrompts.length - this.parent.aiAssistantSettings.maxPromptHistory;
            this.allPrompts.splice(0, itemsToRemove);
        }
        for (var i = 0; i < prompts.length; i++) {
            this.allPrompts.push(prompts[i]);
        }
    };
    AIAssistant.prototype.clearAIPromptHistory = function () {
        this.allPrompts = [];
    };
    AIAssistant.prototype.updateCurrentSelection = function () {
        if (!isNOU(this.currentSelection)) {
            this.currentSelection = this.currentSelection.save(this.parent.getRange(), this.parent.inputElement.ownerDocument);
        }
    };
    AIAssistant.prototype.getModuleName = function () {
        return 'aiAssistant';
    };
    AIAssistant.prototype.removeEventListener = function () {
        this.parent.off(events.onAIAssistant, this.onToolbarClick);
        this.parent.off(events.menuItemselected, this.onMenuItemSelect);
        this.parent.off(events.menuBeforeOpen, this.beforeMenuOpen);
        this.parent.off(events.menuBeforeClose, this.beforeMenuClose);
        this.parent.off(events.editAreaClick, this.updateCurrentSelection);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.windowResize, this.refreshPosition);
        this.parent.off(events.scroll, this.refreshPosition);
        this.parent.off(events.contentscroll, this.refreshPosition);
        this.parent.off(events.afterKeyDown, this.refreshPosition);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.bindOnEnd, this.bindOnEnd);
        this.parent.off(events.bindCssClass, this.updateCssClass);
        this.parent.off(events.hidePopup, this.hideAIQueryPopup);
    };
    AIAssistant.prototype.refreshPosition = function () {
        if (!this.dragged && this.queryPopup && !this.queryPopup.isDestroyed && this.queryPopup.element &&
            this.queryPopup.element.classList.contains('e-popup-open')) {
            this.queryPopup.setProperties({ offsetY: this.getQueryPopupOffsetY() });
            this.queryPopup.dataBind();
            this.queryPopup.refreshPosition();
            var footer = this.assistView.element.querySelector('.e-footer');
            this.historyDropDownButton.setProperties({ popupWidth: footer.getBoundingClientRect().width });
            this.historyDropDownButton.dataBind();
        }
    };
    AIAssistant.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.isRendered) {
            this.draggable.destroy();
            if (!isNOU(this.historyDropDownButton)) { // Only history drop down button is rendered after the show method
                this.historyDropDownButton.destroy(); // Edge case where the cancel argument of beforePopupOpen is set to false does not render the dropdown.
            }
            if (!isNOU(this.menu)) {
                this.menu.destroy();
            }
            if (!isNOU(this.menuDropDown)) {
                this.menuDropDown.destroy();
            }
            this.queryPopup.destroy();
            this.toolTip.destroy();
            this.assistView.destroy();
            document.removeEventListener('keydown', this.handlePopupEscapeBoundFn);
            detach(this.element);
        }
        this.allPrompts = [];
        this.isDestroyed = true;
        this.isRendered = false;
    };
    AIAssistant.prototype.getPromptHistory = function () {
        return this.allPrompts;
    };
    AIAssistant.prototype.executePrompt = function (prompt) {
        this.assistView.executePrompt(prompt);
    };
    AIAssistant.prototype.scrollToBottom = function () {
        this.assistView.scrollToBottom();
    };
    AIAssistant.prototype.addPromptResponse = function (outputResponse, isFinalUpdate) {
        if (isFinalUpdate) {
            var htmlResponse = this.parseMarkdown(this.lastResponse);
            this.assistView.addPromptResponse(htmlResponse, true);
            this.assistView.scrollToBottom();
            this.lastResponse = '';
            this.queryPopup.element.classList.remove('processing');
        }
        else {
            this.streamResponse(outputResponse, isFinalUpdate);
        }
    };
    AIAssistant.prototype.updateHistoryButtonStatus = function () {
        var items = this.getHistoryDropDownItem();
        this.historyDropDownButton.items = this.getHistoryDropDownItem();
        this.historyDropDownButton.disabled = items.length === 1 && items[0].text === 'No Prompts found' ? true : false;
        this.historyDropDownButton.dataBind();
        if (this.historyDropDownButton.disabled) {
            this.historyIconButton.classList.add('e-rte-icon-btn-disabled');
            this.enableDisableHistoryToolbarButton(true);
        }
        else {
            this.historyIconButton.classList.remove('e-rte-icon-btn-disabled');
            this.enableDisableHistoryToolbarButton(false);
        }
    };
    AIAssistant.prototype.appendElement = function (element) {
        if (this.parent.isModalDialog) {
            var modalElement = this.parent.inputElement.closest('.cdk-overlay-pane');
            modalElement.appendChild(element);
        }
        else {
            document.body.appendChild(element);
        }
    };
    AIAssistant.prototype.showQueryPopup = function (event) {
        var _this = this;
        if (!this.isRendered) {
            this.render();
            this.appendElement(this.element);
            this.queryPopup.appendTo(this.element);
            this.draggable = new Draggable(this.queryPopup.element, {
                clone: false,
                isDragScroll: false,
                handle: '.e-rte-aiquery-popup .e-view-header .e-toolbar-items .e-toolbar-item button',
                dragStop: function () {
                    _this.dragged = true;
                }
            });
            document.addEventListener('keydown', this.handlePopupEscapeBoundFn);
            this.isRendered = true;
        }
        else {
            this.appendElement(this.element);
        }
        if (this.parent.quickToolbarModule) {
            this.parent.quickToolbarModule.hideQuickToolbars();
        }
        this.renderMenuButton();
        this.dragged = false;
        if (!isNOU(this.queryPopup) && this.queryPopup.element.classList.contains('e-popup-close')) {
            this.queryPopup.setProperties({ offsetY: this.getQueryPopupOffsetY() });
            this.queryPopup.dataBind();
            var eventArgs = {
                cancel: false,
                popup: this.queryPopup,
                element: this.queryPopup.element,
                type: 'AIAssistant',
                originalEvent: !isNOU(event) ? event : undefined
            };
            this.triggerBeforePopupOpenCloseEvent('beforePopupOpen', eventArgs, eventArgs, function () {
                _this.queryPopup.show();
                _this.queryPopup.refreshPosition();
                _this.renderHistoryDropDownButton();
            });
        }
    };
    AIAssistant.prototype.handlePopupEscape = function (args) {
        if (args.key === 'Escape') {
            this.hideAIQueryPopup();
        }
    };
    AIAssistant.prototype.renderMenuButton = function () {
        var toolbar = this.assistView.element.querySelector('.e-view-header .e-toolbar');
        var menuName = 'aicommands';
        var rootElement = select('#' + this.parent.getID() + '_QueryPopupCommandsDropDown', toolbar);
        if (!isNOU(rootElement)) {
            var ulElement = this.parent.createElement('ul', { id: this.parent.getID() + '_QueryPopupCommandsMenu' });
            rootElement.parentElement.appendChild(ulElement);
            var argument = {
                dropDownItems: {
                    content: 'AI Commands',
                    cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_AI_COMMANDS_TBAR_BTN + ' ' + classes.CLS_DROPDOWN_MENU,
                    target: ulElement
                },
                menuItems: {
                    items: this.parent.aiAssistantSettings.commands
                },
                name: menuName,
                containerType: 'Toolbar',
                toolbarElement: toolbar,
                dropDownRoot: rootElement,
                menuRoot: ulElement
            };
            var _a = this.rendererFactory.getRenderer(RenderType.Toolbar).renderMenu(argument), menu = _a.menu, dropDownButton = _a.dropDownButton;
            this.menu = menu;
            this.menuDropDown = dropDownButton;
            dropDownButton.iconCss = 'e-settings e-icons';
            dropDownButton.setProperties({ iconCss: 'e-settings e-icons', content: '' });
        }
    };
    AIAssistant.prototype.renderHistoryDropDownButton = function () {
        var _this = this;
        var footer = this.assistView.element.querySelector('.e-footer');
        this.historyIconButton = footer.querySelector('.e-icons.e-history');
        var dropdownMenuRoot = this.parent.createElement('div', { id: this.assistView.element.id + '_DropDown_Menu' });
        dropdownMenuRoot.style.visibility = 'hidden';
        dropdownMenuRoot.style.padding = '0';
        dropdownMenuRoot.style.border = '0';
        footer.appendChild(dropdownMenuRoot);
        var items = this.getHistoryDropDownItem();
        var dropDownButton = new DropDownButton({
            cssClass: 'e-caret-hide e-rte-ai-assist-history',
            disabled: items.length === 1 && items[0].text === 'No Prompts found.' ? true : false,
            popupWidth: footer.getBoundingClientRect().width,
            items: items,
            select: function (args) {
                _this.assistView.prompt = args.item.text;
            }
        });
        dropDownButton.isAngular = this.parent.isModalDialog;
        dropDownButton.appendTo(dropdownMenuRoot);
        if (this.parent.element.dataset.rteUnitTesting === 'true') {
            dropDownButton.animationSettings = { effect: 'None', duration: 0 };
        }
        if (items.length === 1 && items[0].text === 'No Prompts found.') {
            this.historyIconButton.classList.add('e-rte-icon-btn-disabled');
            this.enableDisableHistoryToolbarButton(true);
        }
        else {
            this.historyIconButton.classList.remove('e-rte-icon-btn-disabled');
            this.enableDisableHistoryToolbarButton(false);
        }
        this.historyDropDownButton = dropDownButton;
    };
    AIAssistant.prototype.handleHistoryButtonClick = function () {
        if (!this.historyIconButton.classList.contains('e-rte-icon-btn-disabled')) {
            this.historyDropDownButton.toggle();
        }
    };
    AIAssistant.prototype.getToolbarItems = function (items, type) {
        var finalITems = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (typeof item === 'string') {
                var defaultItem = void 0;
                switch (type) {
                    case 'Header':
                        defaultItem = this.getHeaderToolbarItem(item);
                        break;
                    case 'Prompt':
                        defaultItem = this.getPromptToolbarItem(item);
                        break;
                    case 'Response':
                        defaultItem = this.getReponseToolbarItem(item);
                        break;
                }
                finalITems.push(defaultItem);
            }
            else {
                finalITems.push(item);
            }
        }
        return finalITems;
    };
    AIAssistant.prototype.getHeaderToolbarItem = function (item) {
        var value;
        switch (item) {
            case 'AIcommands':
                value = { iconCss: 'e-icons e-ai-chat', align: 'Right', tooltip: this.L10n.getConstant('aicommands'), command: 'Header', subCommand: 'Close', template: "<button id=\"" + this.parent.getID() + "_QueryPopupCommandsDropDown\" tabindex=\"0\" data-tabindex=\"-1\"></button>" };
                break;
            case 'Close':
                value = { iconCss: 'e-icons e-close', align: 'Right', tooltip: this.L10n.getConstant('aiAssistantToolbarItemClose'), command: 'Header', subCommand: 'Close' };
                break;
            case 'Clear':
                value = { iconCss: 'e-icons e-trash', align: 'Right', tooltip: this.L10n.getConstant('aiAssistantToolbarItemClear'), command: 'Header', subCommand: 'Clear' };
                break;
        }
        return value;
    };
    AIAssistant.prototype.getPromptToolbarItem = function (item) {
        var value;
        switch (item) {
            case 'Copy':
                value = { iconCss: 'e-icons e-assist-copy', tooltip: this.L10n.getConstant('aiAssistantToolbarItemCopy'), command: 'Prompt', subCommand: 'Copy' };
                break;
            case 'Edit':
                value = { iconCss: 'e-icons e-assist-edit', tooltip: this.L10n.getConstant('aiAssistantToolbarItemEdit'), command: 'Prompt', subCommand: 'Edit' };
                break;
        }
        return value;
    };
    AIAssistant.prototype.getReponseToolbarItem = function (item) {
        var value;
        switch (item) {
            case '|':
                value = { type: 'Separator', command: 'Response', subCommand: 'Separator' };
                break;
            case 'Copy':
                value = { iconCss: 'e-icons e-assist-copy', tooltip: this.L10n.getConstant('aiAssistantToolbarItemCopy'), command: 'Response', subCommand: 'Copy' };
                break;
            case 'Insert':
                value = { iconCss: 'e-icons e-check', text: 'Insert', tooltip: this.L10n.getConstant('aiAssistantToolbarItemInsert'), command: 'Response', subCommand: 'Insert' };
                break;
            case 'Regenerate':
                value = { iconCss: 'e-icons e-repeat', tooltip: this.L10n.getConstant('aiAssistantToolbarItemRegenerate'), command: 'Response', subCommand: 'Regenerate' };
                break;
        }
        return value;
    };
    AIAssistant.prototype.getQueryPopupOffsetY = function () {
        var offsetY = 0;
        if (this.parent.userAgentData.isMobileDevice()) {
            return offsetY;
        }
        if (this.parent.toolbarSettings.enableFloating && this.parent.toolbarSettings.position === 'Top' && !this.parent.inlineMode.enable) {
            var toolbarElemRect = this.parent.getToolbarElement().getBoundingClientRect();
            var scrollTopParentElement = this.parent.scrollParentElements && this.parent.scrollParentElements.length > 0 &&
                this.parent.scrollParentElements[0].nodeName !== '#document' ? this.parent.scrollParentElements[0] : null;
            if (toolbarElemRect.top === 0) {
                offsetY = window.pageYOffset - this.parent.element.offsetTop + toolbarElemRect.height + 11;
            }
            else {
                if (!isNOU(scrollTopParentElement) && this.parent.scrollParentElements[0].scrollTop > 0 && toolbarElemRect.top > 0) { // When toolbar is in floating mode and scrolled.
                    offsetY = this.parent.scrollParentElements[0].scrollTop + toolbarElemRect.height + 11;
                }
                else {
                    offsetY = toolbarElemRect.height + 11; // When toolbar visible additional 1 px from border is added to offsetY.
                }
            }
        }
        else {
            var inputElementRect = this.parent.iframeSettings.enable ?
                this.parent.contentModule.getPanel().getBoundingClientRect() :
                this.parent.inputElement.getBoundingClientRect();
            if (this.parent.toolbarSettings.position === 'Bottom' && !this.parent.inlineMode.enable) {
                if (inputElementRect.top <= 0) {
                    offsetY = window.pageYOffset - this.parent.element.offsetTop + 11; // WHen toolbar visible additional 1 px from border is added to offsetY.
                }
                else {
                    offsetY = 10;
                }
            }
            else {
                if (!this.parent.inlineMode.enable) {
                    var toolbarElemRect = this.parent.getToolbarElement().getBoundingClientRect();
                    if (toolbarElemRect.top < 0) {
                        offsetY = window.pageYOffset - this.parent.element.offsetTop + 10;
                    }
                    else {
                        offsetY = toolbarElemRect.height + 11;
                    }
                }
            }
        }
        return offsetY;
    };
    AIAssistant.prototype.onPropertyChanged = function (e) {
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'aiAssistantSettings': {
                    switch (Object.keys(e.newProp.aiAssistantSettings)[0]) {
                        case 'popupMaxHeight':
                            this.queryPopup.element.style.maxHeight = formatUnit(this.parent.aiAssistantSettings.popupMaxHeight);
                            break;
                        case 'popupWidth':
                            this.queryPopup.width = e.newProp.aiAssistantSettings.popupWidth;
                            break;
                        case 'placeholder':
                            this.assistView.promptPlaceholder = e.newProp.aiAssistantSettings.placeholder;
                            this.assistView.dataBind();
                            break;
                        case 'prompts':
                            this.assistView.prompts = e.newProp.aiAssistantSettings.prompts;
                            this.assistView.dataBind();
                            break;
                        case 'suggestions':
                            this.assistView.promptSuggestions = e.newProp.aiAssistantSettings.suggestions;
                            this.assistView.dataBind();
                            break;
                        case 'bannerTemplate':
                            this.assistView.bannerTemplate = e.newProp.aiAssistantSettings.bannerTemplate;
                            this.assistView.dataBind();
                            break;
                    }
                    break;
                }
                case 'enablePersistence':
                    if (this.assistView) {
                        this.assistView.enablePersistence = e.newProp.enablePersistence;
                        this.assistView.dataBind();
                    }
                    break;
            }
        }
    };
    AIAssistant.prototype.getHistoryDropDownItem = function () {
        var finalItems = [];
        if (this.allPrompts.length === 0) {
            finalItems.push({ text: 'No Prompts found.' });
            return finalItems;
        }
        for (var i = 0; i < this.allPrompts.length; i++) {
            var currentPrompt = this.allPrompts[i];
            finalItems.push({ text: currentPrompt.prompt });
        }
        return finalItems;
    };
    AIAssistant.prototype.renderTooltip = function () {
        this.toolTip = new Tooltip({
            target: '#' + this.parent.getID() + '_RTE_Smart_AI_Query_AssistView [title]',
            showTipPointer: true,
            openDelay: 400,
            opensOn: 'Hover',
            cssClass: this.parent.getCssClass(),
            windowCollision: true,
            position: 'BottomCenter'
        });
        this.toolTip.isAngular = this.parent.isModalDialog;
        this.toolTip.appendTo(this.assistView.element);
    };
    AIAssistant.prototype.setEditAreaRangeAndFocus = function () {
        var range = new Range();
        range.setStart(this.assistViewEditArea, 0);
        range.collapse(true);
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
    };
    AIAssistant.prototype.bindOnEnd = function () {
        this.parent.formatter.editorManager.aiAssistantActionObj = new AIAssistantActions(this.parent.formatter.editorManager);
    };
    AIAssistant.prototype.handleInsertContent = function (response) {
        this.currentSelection.restore();
        var actionBeginArgs = {
            requestType: 'AIAssistant',
            name: 'InsertResponseContent',
            item: {
                command: 'AIAssistant',
                subCommand: this.isProcessWholeEditorContent ? 'ReplaceEditorContent' : 'InsertResponseContent',
                value: this.parent.htmlEditorModule.sanitizeHelper(response)
            }
        };
        this.parent.formatter.process(this.parent, actionBeginArgs, null, {
            selection: this.currentSelection
        });
    };
    AIAssistant.prototype.beforeMenuOpen = function (args) {
        var isAIAssitant = args.element.classList.contains('e-rte-aicommands-menu') || !isNOU(args.element.closest('.e-rte-aicommands-menu'));
        if (!isAIAssitant) {
            return;
        }
        var eventArgs = {
            cancel: false,
            element: args.element,
            type: 'Menu',
            originalEvent: args.event
        };
        this.triggerBeforePopupOpenCloseEvent('beforePopupOpen', args, eventArgs);
    };
    AIAssistant.prototype.beforeMenuClose = function (args) {
        var isAIAssitant = args.element.classList.contains('e-rte-aicommands-menu') || !isNOU(args.element.closest('.e-rte-aicommands-menu'));
        if (!isAIAssitant) {
            return;
        }
        var eventArgs = {
            cancel: false,
            element: args.element,
            type: 'Menu',
            originalEvent: args.event
        };
        this.triggerBeforePopupOpenCloseEvent('beforePopupClose', args, eventArgs);
    };
    AIAssistant.prototype.triggerBeforePopupOpenCloseEvent = function (eventName, originalArgs, eventArgs, callBack) {
        this.parent.trigger(eventName, eventArgs, function (updatedArgs) {
            if (!updatedArgs.cancel) {
                if (!isNOU(callBack)) {
                    callBack();
                }
            }
            else {
                originalArgs.cancel = true;
            }
        });
    };
    AIAssistant.prototype.updateCssClass = function () {
        if (this.assistView) {
            this.assistView.cssClass = this.parent.getCssClass();
        }
        if (this.element) {
            this.element.className = classes.CLS_RTE_ELEMENTS + ' e-rte-aiquery-popup e-popup-close ' + this.parent.getCssClass();
        }
    };
    AIAssistant.prototype.enableDisableHistoryToolbarButton = function (enable) {
        var footerToolbar = this.assistView.element.querySelector('.e-footer .e-toolbar');
        var toolbar = getComponent(footerToolbar, 'toolbar');
        toolbar.items[0].disabled = enable;
    };
    return AIAssistant;
}());
export { AIAssistant };
