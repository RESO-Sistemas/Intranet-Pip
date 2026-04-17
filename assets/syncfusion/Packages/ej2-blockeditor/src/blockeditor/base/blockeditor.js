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
import { Component, getUniqueID, NotifyPropertyChanges, Property, isNullOrUndefined as isNOU, formatUnit, Collection, Complex, Event, append, L10n, addClass, updateCSSText } from '@syncfusion/ej2-base';
import { User } from '../../models/common/user';
import { CommandMenuSettings } from '../../models/menus/command-menu-settings';
import { InlineToolbarSettings } from '../../models/menus/inline-toolbar-settings';
import { ContextMenuSettings } from '../../models/menus/context-menu-settings';
import { BlockActionMenuSettings } from '../../models/menus/blockaction-menu-settings';
import { PasteCleanupSettings } from '../../models/common/paste-settings';
import { LabelSettings } from '../../models/common/label-settings';
import { getBlockModelById } from '../../common/utils/block';
import { getTemplateFunction } from '../../common/utils/common';
import { getCurrentLocaleJson, getLocaleItems } from '../../common/utils/data';
import { events } from '../../common/constant';
import * as constants from '../../common/constant';
import { MentionRenderer, MenuBarRenderer, TooltipRenderer, DialogRenderer, FloatingIconRenderer, DropDownListRenderer, TabRenderer, UploaderRenderer, ProgressBarRenderer, ImageUploaderRenderer } from '../renderer/index';
import { EventManager, Intermediate } from '../managers/index';
import { InlineContentInsertionModule, SlashCommandModule, ContextMenuModule, BlockActionMenuModule, InlineToolbarModule, LinkModule } from '../renderer/index';
import { BlockManager } from '../../block-manager/base/block-manager';
import { ImageBlockSettings, CodeBlockSettings, FontColorSettings, BackgroundColorSettings } from '../../models/common/index';
import { TransformSettings } from '../../models/menus/transform-settings';
/**
 * Represents the root class for the Block Editor component.
 * The BlockEditor is a block based editor that provides functionality for creating, editing, and managing blocks of content.
 * Blocks can include paragraph, lists, toggles, and other block types, organized hierarchically.
 *
 **/
var BlockEditor = /** @class */ (function (_super) {
    __extends(BlockEditor, _super);
    /**
     * Constructor for creating the component
     *
     * @param {BlockEditorModel} options - Specifies the BlockEditorModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function BlockEditor(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    BlockEditor.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    BlockEditor.prototype.getDirective = function () {
        return 'EJS-BLOCKEDITOR';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    BlockEditor.prototype.getModuleName = function () {
        return 'blockeditor';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    BlockEditor.prototype.getPersistData = function () {
        return this.addOnPersist(['blocks']);
    };
    /**
     * Renders the editor component
     *
     * @returns {void}
     */
    BlockEditor.prototype.render = function () {
        this.initialize();
    };
    /**
     * Initializes the editor component
     *
     * @returns {void}
     */
    BlockEditor.prototype.initialize = function () {
        this.initializeLocale();
        this.initializeManagers();
        this.intializeEngines();
        this.blockManager.observer.notify('modulesInitialized');
        // Set dimensions and styles
        this.setDimension();
        this.setCssClass();
        this.setRtlClass();
        this.blockManager.stateManager.populateUniqueIds(this.blockManager.getEditorBlocks());
        // Create floating icons and overlay containers
        if (!this.floatingIconRenderer.floatingIconContainer) {
            this.floatingIconRenderer.createFloatingIcons();
        }
        // Render the blocks
        this.initializeMentionModules();
        this.renderBlocks(this.blockManager.getEditorBlocks());
        this.updateEditorReadyOnlyState();
        // Wire events
        if (this.enableDragAndDrop) {
            this.intermediate.processActions('wireUnWireDragEvents', { enable: true });
        }
        this.eventManager.wireGlobalEvents();
    };
    /**
     * Initializes locale values
     *
     * @returns {void}
     */
    BlockEditor.prototype.initializeLocale = function () {
        this.l10n = new L10n(this.getModuleName(), getLocaleItems(), this.locale);
        this.updateInternalLocaleCollection();
    };
    BlockEditor.prototype.updateInternalLocaleCollection = function () {
        this.localeJson = getCurrentLocaleJson(this.l10n);
    };
    /**
     * Initializes all manager classes
     *
     * @returns {void}
     */
    BlockEditor.prototype.initializeManagers = function () {
        this.blockManager = new BlockManager();
        this.intermediate = new Intermediate(this);
        this.renderblockContainer();
        this.blockManager.updateContext(__assign({ localeJson: this.localeJson, blocks: this.blocks, blockContainer: this.blockContainer, rootEditorElement: this.element, pasteCleanupSettings: this.pasteCleanupSettings, imageBlockSettings: this.imageBlockSettings, codeBlockSettings: this.codeBlockSettings, labelSettings: this.labelSettings, users: this.users, blockActionMenuSettings: this.blockActionMenuSettings, contextMenuSettings: this.contextMenuSettings, commandMenuSettings: this.commandMenuSettings, inlineToolbarSettings: this.inlineToolbarSettings }, this.getEditorProps()));
        this.blockManager.initialize();
        this.floatingIconRenderer = new FloatingIconRenderer(this);
        this.eventManager = new EventManager(this);
    };
    BlockEditor.prototype.getEditorProps = function () {
        return {
            readOnly: this.readOnly,
            undoRedoStack: this.undoRedoStack,
            enableHtmlEncode: this.enableHtmlEncode,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            enableDragAndDrop: this.enableDragAndDrop,
            keyConfig: this.keyConfig
        };
    };
    /**
     * Initializes all engines
     *
     * @returns {void}
     */
    BlockEditor.prototype.intializeEngines = function () {
        this.menubarRenderer = new MenuBarRenderer(this);
        this.mentionRenderer = new MentionRenderer(this);
        this.tabRenderer = new TabRenderer(this);
        this.uploaderRenderer = new UploaderRenderer(this);
        this.progressBarRenderer = new ProgressBarRenderer(this);
        this.tooltipRenderer = new TooltipRenderer(this);
        this.dialogRenderer = new DialogRenderer(this);
        this.dropdownListRenderer = new DropDownListRenderer(this);
        this.imageUploaderRenderer = new ImageUploaderRenderer(this);
        this.inlineContentInsertionModule = new InlineContentInsertionModule(this);
        this.inlineToolbarModule = new InlineToolbarModule(this);
        this.blockActionMenuModule = new BlockActionMenuModule(this);
        this.contextMenuModule = new ContextMenuModule(this);
        this.linkModule = new LinkModule(this);
    };
    /**
     * Sets the dimensions of the editor
     *
     * @returns {void}
     */
    BlockEditor.prototype.setDimension = function () {
        var cssText = "\n          width: " + (!isNOU(this.width) ? formatUnit(this.width) : this.element.style.width) + ";\n          height: " + (!isNOU(this.height) ? formatUnit(this.height) : this.element.style.height) + ";\n         ";
        updateCSSText(this.element, cssText);
    };
    /**
     * Sets the CSS class on the editor
     *
     * @returns {void}
     */
    BlockEditor.prototype.setCssClass = function () {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.trim().split(' '));
        }
    };
    /**
     * Sets the Rtl class on the editor
     *
     * @returns {void}
     */
    BlockEditor.prototype.setRtlClass = function () {
        this.element.classList.toggle(constants.RTL_CLS, this.enableRtl);
    };
    /**
     * Applies dynamic locale changes
     *
     * @returns {void}
     */
    BlockEditor.prototype.updateLocale = function () {
        this.l10n.setLocale(this.locale);
        this.updateInternalLocaleCollection();
        this.blockManager.updateContext({ localeJson: this.localeJson });
        if (this.blockManager.currentFocusedBlock) {
            this.blockManager.togglePlaceholder(this.blockManager.currentFocusedBlock, true);
        }
        this.floatingIconRenderer.updateFloatingIconTooltipContent();
        this.notify(events.localeChanged, {});
        this.blockManager.observer.notify(events.localeChanged, {});
    };
    /**
     * Initializes mention modules for @ mentions and slash commands
     *
     * @returns {void}
     */
    BlockEditor.prototype.initializeMentionModules = function () {
        this.slashCommandModule = new SlashCommandModule(this);
        this.inlineContentInsertionModule.initializeUserMention();
        this.inlineContentInsertionModule.initializeLabelContent();
    };
    /**
     * Creates the block container
     *
     * @returns {void}
     */
    BlockEditor.prototype.renderblockContainer = function () {
        this.blockContainer = this.createElement('div', {
            id: this.element.id + constants.BLOCK_CONTAINER_ID,
            className: constants.BLOCK_CONTAINER_CLS
        });
        this.element.appendChild(this.blockContainer);
    };
    /**
     * Renders blocks in the editor
     *
     * @param {BlockModel[]} blocks The blocks to render
     * @returns {void}
     * @hidden
     */
    BlockEditor.prototype.renderBlocks = function (blocks) {
        this.blockManager.blockCommand.createDefaultEmptyBlock();
        this.blockManager.blockRenderer.renderBlocks(blocks);
    };
    /**
     * Gets the current focused block model
     *
     * @returns {BlockModel | null} The current focused block model or null if no block is focused
     * @hidden
     */
    BlockEditor.prototype.getCurrentFocusedBlockModel = function () {
        if (!this.blockManager.currentFocusedBlock) {
            return null;
        }
        return getBlockModelById(this.blockManager.currentFocusedBlock.id, this.blockManager.getEditorBlocks());
    };
    /**
     * Responsible for rendering the template for a block
     *
     * @param {{ block: BlockModel, templateElement: HTMLElement }} args The options to render template
     * @returns {void}
     * @hidden
     */
    BlockEditor.prototype.renderTemplate = function (args) {
        var templateName = args.block.id + 'template';
        this.clearTemplate([templateName]);
        var templateFunction = getTemplateFunction(args.block.template);
        append(templateFunction({}, this, templateName, 'template', this.isStringTemplate), args.templateElement);
        this.renderReactTemplates();
    };
    /**
     * Updates read-only state of editable elements in the editor
     *
     * @returns {void}
     * @hidden
     */
    BlockEditor.prototype.updateEditorReadyOnlyState = function () {
        var _this = this;
        var defaultNonEditableElements = [
            'e-callout-icon', 'e-toggle-icon', 'e-image-container', 'e-image-placeholder', 'e-checkmark-container', 'e-divider-block',
            'e-code-block-toolbar', 'e-code-block-copy-button', 'e-mention-chip'
        ].concat(this.blockManager.blockRenderer.tableRenderer.nonEditableElements);
        var editableElements = Array.from(this.element.querySelectorAll("[contenteditable='" + this.readOnly + "']:not([data-table-readonly-processed]"));
        editableElements = editableElements.filter(function (element) {
            return !defaultNonEditableElements.some(function (className) { return element.classList.contains(className); });
        });
        editableElements.forEach(function (element) {
            element.contentEditable = (!_this.readOnly).toString();
        });
        this.element.classList.toggle('e-readonly', this.readOnly);
    };
    /* Section Public methods */
    /**
     * Adds a new block to the editor
     *
     * @param {BlockModel} block - The block model to add
     * @param {string} targetId - The ID of the target block to insert the new block. If not provided, the block will be appended to the end of the editor.
     * @param {boolean} isAfter - Specifies whether to insert the new block after the target block. Default is false.
     * @returns {void}
     */
    BlockEditor.prototype.addBlock = function (block, targetId, isAfter) {
        this.blockManager.editorMethods.addBlock(block, targetId, isAfter);
    };
    /**
     * Removes a block from the editor
     *
     * @param {string} blockId - ID of the block to remove
     * @returns {void}
     */
    BlockEditor.prototype.removeBlock = function (blockId) {
        this.blockManager.editorMethods.removeBlock(blockId);
    };
    /**
     * Gets a block by ID
     *
     * @param {string} blockId - ID of the block to retrieve
     * @returns {BlockModel | null} - The block model or null if not found
     */
    BlockEditor.prototype.getBlock = function (blockId) {
        return this.blockManager.editorMethods.getBlock(blockId);
    };
    /**
     * Moves a block to a new position
     *
     * @param {string} fromBlockId - ID of the block to move
     * @param {string} toBlockId - ID of the target block to move to
     * @returns {void}
     */
    BlockEditor.prototype.moveBlock = function (fromBlockId, toBlockId) {
        this.blockManager.editorMethods.moveBlock(fromBlockId, toBlockId);
    };
    /**
     * Updates block properties
     *
     * @param {string} blockId - ID of the block to update
     * @param {Partial<BlockModel>} properties - Properties to update
     * @returns {boolean} True if update was successful
     */
    BlockEditor.prototype.updateBlock = function (blockId, properties) {
        return this.blockManager.editorMethods.updateBlock(blockId, properties);
    };
    /**
     * Enables one or more toolbar items.
     * This method allows the specified toolbar items to be enabled.
     *
     * @param {string | string[]} itemId - The id(s) of the toolbar item(s) to enable.
     * @returns {void}
     */
    BlockEditor.prototype.enableToolbarItems = function (itemId) {
        this.blockManager.editorMethods.enableDisableToolbarItems(itemId, true);
    };
    /**
     * Disables one or more toolbar items.
     * This method allows the specified toolbar items to be disabled.
     *
     * @param {string | string[]} itemId - The id(s) of the toolbar item(s) to disable.
     * @returns {void}
     */
    BlockEditor.prototype.disableToolbarItems = function (itemId) {
        this.blockManager.editorMethods.enableDisableToolbarItems(itemId, false);
    };
    /**
     * Executes the specified toolbar action on the editor.
     *
     * @param {string} action - The action to execute.
     * @param {value} value - The value required if any (Optional).
     * @returns {void}
     */
    BlockEditor.prototype.executeToolbarAction = function (action, value) {
        this.blockManager.editorMethods.executeToolbarAction(action, value);
    };
    /**
     * Sets the selection range within a content.
     * This method selects content within the specified element using a start and end index.
     *
     * @param {Node} node - Node to apply selection
     * @param {number} startIndex - The starting index of the selection.
     * @param {number} endIndex - The ending index of the selection.
     * @returns {void}
     */
    BlockEditor.prototype.setSelection = function (node, startIndex, endIndex) {
        this.blockManager.editorMethods.setSelection(node, startIndex, endIndex);
    };
    /**
     * Sets cursor position
     *
     * @param {string} blockId - ID of the target block
     * @param {number} position - Character offset position
     * @returns {void}
     */
    BlockEditor.prototype.setCursorPosition = function (blockId, position) {
        this.blockManager.editorMethods.setCursorPosition(blockId, position);
    };
    /**
     * Gets the block from current selection
     *
     * @returns {BlockModel | null} - The block model or null if not found
     */
    BlockEditor.prototype.getSelectedBlocks = function () {
        return this.blockManager.editorMethods.getSelectedBlocks();
    };
    /**
     * Gets current selection range
     *
     * @returns {Range | null} Current selection range or null
     */
    BlockEditor.prototype.getRange = function () {
        return this.blockManager.editorMethods.getRange();
    };
    /**
     * Selects the given range
     *
     * @param {Range} range - DOM Range object to select
     * @returns {void}
     */
    BlockEditor.prototype.selectRange = function (range) {
        this.blockManager.editorMethods.selectRange(range);
    };
    /**
     * Selects an entire block
     *
     * @param {string} blockId - ID of the block to select
     * @returns {void}
     */
    BlockEditor.prototype.selectBlock = function (blockId) {
        this.blockManager.editorMethods.selectBlock(blockId);
    };
    /**
     * Selects all blocks in the editor.
     *
     * @returns {void}
     */
    BlockEditor.prototype.selectAllBlocks = function () {
        this.blockManager.editorMethods.selectAllBlocks();
    };
    /**
     * Focuses the editor
     *
     * @returns {void}
     */
    BlockEditor.prototype.focusIn = function () {
        this.blockManager.editorMethods.focusIn();
    };
    /**
     * Removes focus from the editor
     *
     * @returns {void}
     */
    BlockEditor.prototype.focusOut = function () {
        this.blockManager.editorMethods.focusOut();
    };
    /**
     * Gets total block count
     *
     * @returns {number} Number of blocks in editor
     */
    BlockEditor.prototype.getBlockCount = function () {
        return this.blockManager.editorMethods.getBlockCount();
    };
    /**
     * Prints all the block data.
     *
     * @returns {void}
     */
    BlockEditor.prototype.print = function () {
        this.blockManager.editorMethods.print();
    };
    /**
     * Renders blocks from JSON data, either replacing all existing content or inserting at cursor position.
     *
     * @param {object | string} json - The JSON data (object or string) containing block definitions
     * @param {boolean} replace - Whether to replace all existing content (true) or insert at cursor (false). By default, it is set to false.
     * @param {string} targetBlockId - ID of block to insert after (applicable only if replace is false).
     * @returns {boolean} - True if operation was successful, false otherwise
     */
    BlockEditor.prototype.renderBlocksFromJson = function (json, replace, targetBlockId) {
        if (replace === void 0) { replace = false; }
        return this.blockManager.editorMethods.renderBlocksFromJson(json, replace, targetBlockId);
    };
    /**
     * Retrieves data from the editor as JSON.
     * If a block ID is provided, returns the data of that specific block; otherwise returns all content.
     *
     * @param {string} blockId - Optional ID of the block to retrieve
     * @returns {any} The JSON representation of the editor data
     */
    BlockEditor.prototype.getDataAsJson = function (blockId) {
        return this.blockManager.editorMethods.getDataAsJson(blockId);
    };
    /**
     * Retrieves data from the editor as HTML.
     * If a block ID is provided, returns the data of that specific block; otherwise returns all content.
     *
     * @param {string} blockId - Optional ID of the block to retrieve
     * @returns {string} The HTML representation of the editor data
     */
    BlockEditor.prototype.getDataAsHtml = function (blockId) {
        return this.blockManager.editorMethods.getDataAsHtml(blockId);
    };
    /**
     * Parses an HTML string into an array of BlockModel objects.
     *
     * @param {string} html - HTML string to parse.
     * @returns {BlockModel[]} An array of BlockModel objects representing the parsed HTML structure.
     */
    BlockEditor.prototype.parseHtmlToBlocks = function (html) {
        return this.blockManager.editorMethods.parseHtmlToBlocks(html);
    };
    BlockEditor.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.notify(events.destroy, {});
        this.blockManager.observer.notify(events.destroy, {});
        this.mentionRenderer = null;
        this.tabRenderer = null;
        this.uploaderRenderer = null;
        this.progressBarRenderer = null;
        this.menubarRenderer = null;
        this.tooltipRenderer = null;
        this.dialogRenderer = null;
        this.dropdownListRenderer = null;
        if (this.imageUploaderRenderer) {
            this.imageUploaderRenderer.destroy();
            this.imageUploaderRenderer = null;
        }
        this.inlineToolbarModule = null;
        this.inlineContentInsertionModule = null;
        this.slashCommandModule = null;
        this.contextMenuModule = null;
        this.blockActionMenuModule = null;
        this.linkModule = null;
        this.floatingIconRenderer = null;
        this.eventManager = null;
        this.l10n = null;
        this.blockContainer = null;
        this.isRendered = false;
        this.intermediate = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {BlockEditorModel} newProp - Specifies new properties
     * @param  {BlockEditorModel} oldProp - Specifies old properties
     * @returns {void}
     * @hidden
     */
    BlockEditor.prototype.onPropertyChanged = function (newProp, oldProp) {
        var prevProp = oldProp;
        if (!prevProp) {
            return;
        }
        this.blockManager.updateContext(this.getEditorProps());
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension();
                    break;
                case 'cssClass':
                    this.setCssClass();
                    break;
                case 'locale':
                    this.updateLocale();
                    break;
                case 'enableRtl':
                    this.setRtlClass();
                    this.notify(events.rtlChanged, {});
                    break;
                case 'readOnly':
                    this.updateEditorReadyOnlyState();
                    this.intermediate.processActions('wireUnWireDragEvents', { enable: !this.readOnly });
                    break;
                case 'keyConfig':
                    this.blockManager.initializeKeyBindings();
                    break;
                case 'undoRedoStack':
                    this.blockManager.undoRedoAction.adjustUndoRedoStacks();
                    break;
                case 'enableDragAndDrop':
                    this.intermediate.processActions('wireUnWireDragEvents', { enable: this.enableDragAndDrop });
                    break;
                case 'enableHtmlSanitizer':
                case 'enableHtmlEncode':
                case 'blocks':
                    this.blockManager.editorMethods.replaceAllBlocks(prop === 'blocks' ? newProp.blocks : this.blockManager.getEditorBlocks());
                    break;
                case 'labelSettings':
                case 'users':
                    this.notify(events.moduleChanged, { module: 'inlineContent', newProp: newProp, oldProp: oldProp });
                    break;
                case 'commandMenuSettings':
                    this.notify(events.moduleChanged, { module: 'slashCommand', newProp: newProp, oldProp: oldProp });
                    break;
                case 'inlineToolbarSettings':
                    this.notify(events.moduleChanged, { module: 'inlineToolbarSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'blockActionMenuSettings':
                    this.notify(events.moduleChanged, { module: 'blockActionMenuSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'contextMenuSettings':
                    this.notify(events.moduleChanged, { module: 'contextMenuSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'fontColorSettings':
                    this.notify(events.moduleChanged, { module: 'fontColorSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'backgroundColorSettings':
                    this.notify(events.moduleChanged, { module: 'backgroundColorSettings', newProp: newProp, oldProp: oldProp });
                    break;
            }
        }
    };
    __decorate([
        Property('auto')
    ], BlockEditor.prototype, "height", void 0);
    __decorate([
        Property('100%')
    ], BlockEditor.prototype, "width", void 0);
    __decorate([
        Property('')
    ], BlockEditor.prototype, "cssClass", void 0);
    __decorate([
        Property('en-US')
    ], BlockEditor.prototype, "locale", void 0);
    __decorate([
        Property(null)
    ], BlockEditor.prototype, "keyConfig", void 0);
    __decorate([
        Property(30)
    ], BlockEditor.prototype, "undoRedoStack", void 0);
    __decorate([
        Property(false)
    ], BlockEditor.prototype, "readOnly", void 0);
    __decorate([
        Property(false)
    ], BlockEditor.prototype, "enableHtmlEncode", void 0);
    __decorate([
        Property(true)
    ], BlockEditor.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(true)
    ], BlockEditor.prototype, "enableDragAndDrop", void 0);
    __decorate([
        Property([])
    ], BlockEditor.prototype, "blocks", void 0);
    __decorate([
        Collection([], User)
    ], BlockEditor.prototype, "users", void 0);
    __decorate([
        Complex({}, CommandMenuSettings)
    ], BlockEditor.prototype, "commandMenuSettings", void 0);
    __decorate([
        Complex({}, InlineToolbarSettings)
    ], BlockEditor.prototype, "inlineToolbarSettings", void 0);
    __decorate([
        Complex({}, TransformSettings)
    ], BlockEditor.prototype, "transformSettings", void 0);
    __decorate([
        Complex({}, BlockActionMenuSettings)
    ], BlockEditor.prototype, "blockActionMenuSettings", void 0);
    __decorate([
        Complex({}, ContextMenuSettings)
    ], BlockEditor.prototype, "contextMenuSettings", void 0);
    __decorate([
        Complex({}, PasteCleanupSettings)
    ], BlockEditor.prototype, "pasteCleanupSettings", void 0);
    __decorate([
        Complex({ items: [], triggerChar: '$' }, LabelSettings)
    ], BlockEditor.prototype, "labelSettings", void 0);
    __decorate([
        Complex({}, ImageBlockSettings)
    ], BlockEditor.prototype, "imageBlockSettings", void 0);
    __decorate([
        Complex({ languages: [], defaultLanguage: 'plaintext' }, CodeBlockSettings)
    ], BlockEditor.prototype, "codeBlockSettings", void 0);
    __decorate([
        Complex({}, FontColorSettings)
    ], BlockEditor.prototype, "fontColorSettings", void 0);
    __decorate([
        Complex({}, BackgroundColorSettings)
    ], BlockEditor.prototype, "backgroundColorSettings", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "blockChanged", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "selectionChanged", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "blockDragging", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "blockDragStart", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "blockDropped", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "focus", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "blur", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "beforePasteCleanup", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "afterPasteCleanup", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "beforeFileUpload", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "fileUploading", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "fileUploadSuccess", void 0);
    __decorate([
        Event()
    ], BlockEditor.prototype, "fileUploadFailed", void 0);
    BlockEditor = __decorate([
        NotifyPropertyChanges
    ], BlockEditor);
    return BlockEditor;
}(Component));
export { BlockEditor };
