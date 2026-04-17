import { detach, isNullOrUndefined, updateCSSText, EventHandler } from '@syncfusion/ej2-base';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ToolbarRenderer, ColorPickerRenderer } from './common/index';
import { getInlineToolbarItems, transformIntoToolbarItem, defaultTransformModel, getBlockModelById } from '../../common/utils/index';
import { events } from '../../common/constant';
import * as constants from '../../common/constant';
import { BlockType } from '../../models/enums';
/**
 * InlineToolbarModule class is used to render the inline toolbar for the block editor.
 *
 * @hidden
 */
var InlineToolbarModule = /** @class */ (function () {
    function InlineToolbarModule(editor) {
        this.currentTransformItems = [];
        this.editor = editor;
        this.toolbarRenderer = new ToolbarRenderer(this.editor);
        this.pickerHandler = new ColorPickerRenderer(this.editor);
        this.addEventListeners();
        this.init();
        this.bindTooltip();
    }
    InlineToolbarModule.prototype.addEventListeners = function () {
        this.editor.blockManager.observer.on('enableDisableTbarItems', this.enableDisableTbarItems, this);
        this.editor.on(events.inlineToolbarCreated, this.handleInlineToolbarCreated, this);
        this.editor.on(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick, this);
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    InlineToolbarModule.prototype.removeEventListeners = function () {
        this.editor.blockManager.observer.off('enableDisableTbarItems', this.enableDisableTbarItems);
        this.editor.off(events.inlineToolbarCreated, this.handleInlineToolbarCreated);
        this.editor.off(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick);
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    };
    InlineToolbarModule.prototype.init = function () {
        this.toolbarEle = this.editor.createElement('div', {
            id: (this.editor.element.id + constants.BLOCKEDITOR_INLINETBAR_ID),
            className: constants.BLOCKEDITOR_INLINETBAR_CLS
        });
        this.editor.element.appendChild(this.toolbarEle);
        this.toolbarObj = this.renderToolbar({
            element: this.toolbarEle,
            items: this.getToolbarItems(this.editor.inlineToolbarSettings.items),
            width: this.editor.inlineToolbarSettings.popupWidth,
            overflowMode: 'MultiRow'
        });
        var popupElement = this.editor.createElement('div', {
            id: (this.editor.element.id + constants.INLINE_TBAR_POPUP_ID),
            className: constants.INLINE_TBAR_POPUP_CLS
        });
        this.toolbarObj.isStringTemplate = true;
        this.editor.element.appendChild(popupElement);
        this.editor.blockManager.observer.notify('toolbarCreated');
    };
    InlineToolbarModule.prototype.bindTooltip = function () {
        this.inlineToolbarTooltip = this.editor.tooltipRenderer.renderTooltip({
            cssClass: constants.INLINE_TBAR_TOOLTIP_CLS,
            position: 'TopCenter',
            target: '.' + constants.TBAR_ITEM_CLS,
            windowCollision: true,
            element: document.querySelector('#' + this.editor.element.id + constants.INLINE_TBAR_POPUP_ID)
        });
    };
    /**
     * Render the inline toolbar for the block editor.
     *
     * @param {IToolbarRenderOptions} args - The options for rendering the toolbar.
     * @returns {Toolbar} The rendered toolbar instance.
     * @hidden
     */
    InlineToolbarModule.prototype.renderToolbar = function (args) {
        return this.toolbarRenderer.renderToolbar(args);
    };
    InlineToolbarModule.prototype.handleInlineToolbarCreated = function () {
        if (this.hasToolbarItemId('color')) {
            this.initializeColorPicker('color');
        }
        if (this.hasToolbarItemId('bgColor')) {
            this.initializeColorPicker('bgColor');
        }
        if (this.hasToolbarItemId('transform')) {
            this.initializeTransformDropdown();
        }
    };
    InlineToolbarModule.prototype.handleInlineToolbarItemClick = function (args) {
        var itemClickArgs = {
            item: getInlineToolbarItems().find(function (item) { return item.id === args.item.id; }),
            event: args.originalEvent,
            isInteracted: Object.keys(args.originalEvent).length > 0,
            cancel: false
        };
        if (this.editor.inlineToolbarSettings.itemClick) {
            this.editor.inlineToolbarSettings.itemClick.call(this.editor, itemClickArgs);
        }
        if (itemClickArgs.cancel) {
            args.cancel = true;
            return;
        }
        this.editor.blockManager.observer.notify('inlineToolbarItemClick', args);
    };
    InlineToolbarModule.prototype.enableDisableTbarItems = function (args) {
        this.toolbarObj.enableItems(args.items, args.isEnable);
    };
    InlineToolbarModule.prototype.initializeColorPicker = function (type) {
        var _this = this;
        var toolbarElement = document.querySelector('#' + this.editor.element.id + constants.BLOCKEDITOR_INLINETBAR_ID);
        if (!toolbarElement) {
            return;
        }
        var colorBtn = toolbarElement.querySelector("#toolbar-" + type.toLowerCase() + "-dropdown");
        // create and attach the ColorPicker popup directly to the toolbar button via handler
        var colorPicker = this.pickerHandler.renderColorPicker({
            element: colorBtn,
            type: type,
            iconCss: "e-inline-" + type + "-icon",
            onChange: function (value) {
                _this.editor.blockManager.observer.notify('handleColorpickerChange', { type: type, value: value });
            }
        });
        if (type === 'color') {
            this.textColorPicker = colorPicker;
        }
        else {
            this.bgColorPicker = colorPicker;
        }
    };
    InlineToolbarModule.prototype.createDropDown = function (args) {
        var dropDown = new DropDownButton({
            target: args.instance.target,
            items: args.instance.items,
            cssClass: args.instance.cssClass,
            popupWidth: args.instance.popupWidth,
            createPopupOnClick: args.instance.createPopupOnClick,
            select: args.instance.select,
            beforeOpen: args.instance.beforeOpen,
            itemTemplate: args.instance.itemTemplate
        });
        dropDown.appendTo(args.element);
        if (args.inlineClass) {
            var iconWrapper = this.editor.createElement('span', { className: 'e-be-color-icon-wrapper' });
            var iconElement = this.editor.createElement('span', { className: args.inlineClass });
            var cssText = 'border-bottom: 3px solid #000000;';
            updateCSSText(iconElement, cssText);
            iconWrapper.appendChild(iconElement);
            dropDown.element.insertBefore(iconWrapper, dropDown.element.querySelector('.e-caret'));
        }
        return dropDown;
    };
    InlineToolbarModule.prototype.applyRtlSettings = function () {
        if (this.toolbarObj) {
            this.toolbarObj.enableRtl = this.editor.enableRtl;
        }
        if (this.textColorPicker && this.pickerHandler) {
            this.textColorPicker.enableRtl = this.editor.enableRtl;
        }
        if (this.bgColorPicker && this.pickerHandler) {
            this.bgColorPicker.enableRtl = this.editor.enableRtl;
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    InlineToolbarModule.prototype.getModuleName = function () {
        return 'inlineToolbarSettings';
    };
    /**
     * Handles property changes to update the toolbar configuration
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    InlineToolbarModule.prototype.onPropertyChanged = function (e) {
        var _this = this;
        if (e.module === this.getModuleName()) {
            var newProp = e.newProp.inlineToolbarSettings;
            var oldProp = e.oldProp.inlineToolbarSettings;
            if (!isNullOrUndefined(newProp)) {
                for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    switch (prop) {
                        case 'popupWidth':
                            this.editor.blockManager.observer.notify('popupWidthChanged', { value: newProp.popupWidth });
                            break;
                        case 'items': {
                            var flattenedToolbarItems = this.getToolbarItems(newProp.items);
                            this.toolbarObj.items = flattenedToolbarItems;
                            setTimeout(function () {
                                _this.handleInlineToolbarCreated();
                            }, 10);
                            break;
                        }
                    }
                }
            }
        }
        else {
            var moduleName = e.module;
            if (moduleName === 'fontColorSettings') {
                var fontModel = e.newProp.fontColorSettings;
                if (fontModel && this.textColorPicker && this.pickerHandler) {
                    this.pickerHandler.updatePickerProperties(this.textColorPicker, fontModel);
                }
                return;
            }
            if (moduleName === 'backgroundColorSettings') {
                var bgModel = e.newProp.backgroundColorSettings;
                if (bgModel && this.bgColorPicker && this.pickerHandler) {
                    this.pickerHandler.updatePickerProperties(this.bgColorPicker, bgModel);
                }
                return;
            }
        }
    };
    //Initializes the Transform dropdown (Paragraph, Headings, Lists)
    InlineToolbarModule.prototype.initializeTransformDropdown = function () {
        var _this = this;
        var toolbarElement = document.querySelector('#' + this.editor.element.id + constants.BLOCKEDITOR_INLINETBAR_ID);
        var transformBtn = toolbarElement.querySelector('#toolbar-transform-dropdown');
        var cssClass = 'e-flat e-be-blocktype-ddb e-blockeditor-command-menu';
        // Determine dropdown items: use custom transformSettings if provided, otherwise fall back to defaultTransformModel
        this.currentTransformItems = defaultTransformModel;
        if (this.editor.transformSettings &&
            this.editor.transformSettings.items &&
            this.editor.transformSettings.items.length > 0) {
            // Use custom transform items from transformSettings
            this.currentTransformItems = this.resolveTransformItems(this.editor.transformSettings.items);
        }
        var items = this.currentTransformItems.map(function (m) { return ({
            type: m.type,
            id: m.id,
            label: m.label,
            iconCss: m.iconCss,
            shortcut: m.shortcut,
            disabled: m.disabled,
            tooltip: m.tooltip
        }); });
        var selectHandler = function (args) {
            var itemId = args.item && args.item.id;
            if (!itemId) {
                return;
            }
            var model = _this.currentTransformItems.find(function (m) { return m.id === itemId; });
            if (!model) {
                return;
            }
            // Respect disabled flag on transform items
            if (model.disabled) {
                return;
            }
            // Check if the selected item is the same as the current block type
            var currentItemId = _this.getMatchingTransformItemId();
            if (currentItemId === itemId) {
                // Same block type selected, no need to transform
                return;
            }
            // Trigger itemSelect event if defined in transformSettings
            if (_this.editor.transformSettings && _this.editor.transformSettings.itemSelect) {
                var eventArgs = {
                    command: model,
                    element: args.item || null,
                    event: null,
                    cancel: false
                };
                _this.editor.transformSettings.itemSelect.call(_this.editor, eventArgs);
                if (eventArgs.cancel) {
                    return;
                }
            }
            var props;
            if (model.type === BlockType.Heading) {
                var match = itemId.match(/heading(\d)/i);
                var level = match ? Math.max(1, Math.min(4, parseInt(match[1], 10))) : 1;
                props = { level: level };
            }
            _this.editor.blockManager.blockCommand.transformBlocksForSelection(model.type, props);
        };
        var beforeOpenHandler = function () {
            // Apply selected menu item styling when dropdown opens
            setTimeout(function () {
                _this.applyTransformMenuSelection();
            }, 0);
        };
        // Create dropdown button with items and select handler
        var dropDown = this.createDropDown({
            instance: {
                items: items,
                cssClass: cssClass,
                createPopupOnClick: true,
                popupWidth: '250px',
                select: selectHandler,
                beforeOpen: beforeOpenHandler,
                itemTemplate: '<div class=\'e-transform-item-template\'><div class=\'e-transform-icon-info\'>' +
                    '<span class="${iconCss}"></span></div><div class=\'e-transform-item-info\'>' +
                    '<span title="${tooltip}">${label}' +
                    '</span><span class=\'e-be-transform-shortcut\'>${shortcut}</span></div></div>'
            },
            element: transformBtn,
            inlineClass: null,
            type: null
        });
        this.transformDDB = dropDown;
        // Initialize icon for the existing e-be-transform-block element
        var iconCss = this.getCurrentTransformIcon();
        var transformBlockElement = toolbarElement.querySelector('.e-be-transform-block');
        if (transformBlockElement) {
            // Keep base classes and add the icon class
            transformBlockElement.className = "e-be-transform-block " + iconCss;
        }
        // Update label live when selection/focus changes
        this.updateTransformLabelHandler = function () {
            var newIconCss = _this.getCurrentTransformIcon();
            var hasIgnoredBlocks = _this.hasIgnoredBlockTypes();
            if (_this.transformDDB) {
                // Query select the e-be-transform-block element and update its icon
                var transformIcon = document.querySelector('.e-be-transform-block');
                if (transformIcon) {
                    // Update icon classes while keeping base classes
                    transformIcon.className = "e-be-transform-block " + newIconCss;
                }
                // Disable/enable the dropdown based on ignored block types
                _this.transformDDB.disabled = hasIgnoredBlocks;
                // Add/remove e-disabled class to the transform button
                if (hasIgnoredBlocks) {
                    toolbarElement.firstElementChild.firstElementChild.classList.add('e-disabled');
                }
                else {
                    toolbarElement.firstElementChild.firstElementChild.classList.remove('e-disabled');
                }
            }
        };
        EventHandler.add(document, 'selectionchange', this.updateTransformLabelHandler);
        // Initialize disabled state based on current selection
        var hasIgnoredBlocks = this.hasIgnoredBlockTypes();
        if (this.transformDDB) {
            this.transformDDB.disabled = hasIgnoredBlocks;
            if (hasIgnoredBlocks) {
                toolbarElement.firstElementChild.firstElementChild.classList.add('e-disabled');
            }
        }
    };
    InlineToolbarModule.prototype.applyTransformMenuSelection = function () {
        // Get the current block's corresponding menu item
        var currentItemId = this.getMatchingTransformItemId();
        // Query all menu items in the dropdown popup - look for li elements with data-text attribute
        var menuPopup = document.querySelector('#toolbar-transform-dropdown-popup');
        if (!menuPopup) {
            return;
        }
        // Add e-selected class to the matching item only if it is not disabled
        if (currentItemId) {
            var matchingModel = this.currentTransformItems.find(function (m) { return m.id === currentItemId; });
            // Only add e-selected if the item is not disabled
            if (matchingModel && !matchingModel.disabled) {
                var selectedItem = menuPopup.querySelector("#" + currentItemId);
                if (selectedItem) {
                    selectedItem.classList.add('e-selected');
                }
            }
        }
    };
    InlineToolbarModule.prototype.getMatchingTransformItemId = function () {
        // If multiple blocks are selected, return null (no single item to highlight)
        var selectedBlocks = this.editor.getSelectedBlocks ? this.editor.getSelectedBlocks() : null;
        if (selectedBlocks && selectedBlocks.length > 1) {
            return null;
        }
        // Prefer selected block model when single block is selected
        var blockModel = null;
        if (selectedBlocks && selectedBlocks.length === 1) {
            blockModel = selectedBlocks[0];
        }
        else {
            var focusedBlk = this.editor.blockManager.currentFocusedBlock;
            if (!focusedBlk) {
                return null;
            }
            blockModel = getBlockModelById(focusedBlk.id, this.editor.blockManager.getEditorBlocks());
        }
        if (!blockModel) {
            return null;
        }
        var selType = blockModel.blockType;
        var model = null;
        if (selType === BlockType.Heading) {
            var level_1 = blockModel.properties ?
                blockModel.properties.level || 1 : 1;
            model = this.currentTransformItems.find(function (m) { return m.id === "heading" + level_1 + "-command"; });
        }
        if (!model) {
            model = this.currentTransformItems.find(function (m) { return m.type === selType; });
        }
        return model ? model.id : null;
    };
    InlineToolbarModule.prototype.getCurrentTransformIcon = function () {
        // Get default icon from first item (Paragraph)
        var defaultIcon = this.currentTransformItems.length > 0 ? this.currentTransformItems[0].iconCss : '';
        // If multiple blocks are selected, return paragraph icon
        var selectedBlocks = this.editor.getSelectedBlocks ? this.editor.getSelectedBlocks() : null;
        if (selectedBlocks && selectedBlocks.length > 1) {
            return defaultIcon;
        }
        // Prefer selected block model when single block is selected
        var blockModel = null;
        if (selectedBlocks && selectedBlocks.length === 1) {
            blockModel = selectedBlocks[0];
        }
        else {
            var focusedBlk = this.editor.blockManager.currentFocusedBlock;
            if (!focusedBlk) {
                return defaultIcon;
            }
            blockModel = getBlockModelById(focusedBlk.id, this.editor.blockManager.getEditorBlocks());
        }
        if (!blockModel) {
            return defaultIcon;
        }
        var selType = blockModel.blockType;
        var model = null;
        if (selType === BlockType.Heading) {
            var level_2 = blockModel.properties ?
                blockModel.properties.level || 1 : 1;
            model = this.currentTransformItems.find(function (m) { return m.id === "heading" + level_2 + "-command"; });
        }
        if (!model) {
            model = this.currentTransformItems.find(function (m) { return m.type === selType; });
        }
        return model ? model.iconCss : defaultIcon;
    };
    InlineToolbarModule.prototype.getToolbarItems = function (items) {
        var defaults = getInlineToolbarItems();
        var resolved = items.map(function (item) {
            if (typeof item === 'string') {
                var match = defaults.find(function (d) {
                    return d.command && d.command.toLowerCase() === item.toLowerCase();
                });
                return match ? match : item;
            }
            return item;
        });
        return transformIntoToolbarItem(resolved);
    };
    InlineToolbarModule.prototype.hasToolbarItemId = function (targetId) {
        var items = this.getToolbarItems(this.editor.inlineToolbarSettings.items);
        return items.some(function (item) {
            var id = item.id;
            return id && id.toLowerCase() === targetId.toLowerCase();
        });
    };
    InlineToolbarModule.prototype.hasIgnoredBlockTypes = function () {
        // Check if any selected blocks have ignored types
        var selectedBlocks = this.editor.getSelectedBlocks ? this.editor.getSelectedBlocks() : null;
        var ignoredTypes = [BlockType.Callout, BlockType.Quote, BlockType.Image, BlockType.Divider, BlockType.Code];
        // If blocks are selected, check if any are of ignored type
        if (selectedBlocks && selectedBlocks.length > 0) {
            return selectedBlocks.some(function (block) { return ignoredTypes.indexOf(block.blockType) !== -1; });
        }
        // If no selected blocks, check the currently focused block
        var focusedBlk = this.editor.blockManager.currentFocusedBlock;
        if (!focusedBlk) {
            return false;
        }
        var blockModel = getBlockModelById(focusedBlk.id, this.editor.blockManager.getEditorBlocks());
        if (!blockModel) {
            return false;
        }
        return ignoredTypes.indexOf(blockModel.blockType) !== -1;
    };
    /**
     * Resolves custom transform items from transformSettings into a normalized TransformItemModel array.
     * Handles string identifiers and model objects.
     *
     * @param {(string | TransformCommandName | TransformItemModel)[]} items - The raw transform items.
     * @returns {TransformItemModel[]} - The resolved transform items.
     * @private
     */
    InlineToolbarModule.prototype.resolveTransformItems = function (items) {
        return items
            .map(function (item) {
            // Handle object models
            if (typeof item === 'object' && item !== null) {
                return item;
            }
            // Handle string identifiers - find matching item from defaultTransformModel
            var itemStr = String(item).trim().toLowerCase();
            return defaultTransformModel.find(function (m) {
                return m.label.toLowerCase() === itemStr;
            });
        })
            .filter(function (item) { return item; });
    };
    /**
     * Destroys the inline toolbar module and cleans up resources
     *
     * @returns {void}
     */
    InlineToolbarModule.prototype.destroy = function () {
        this.removeEventListeners();
        if (this.textColorPicker) {
            this.textColorPicker.destroy();
            this.textColorPicker = null;
        }
        if (this.bgColorPicker) {
            this.bgColorPicker.destroy();
            this.bgColorPicker = null;
        }
        if (this.inlineToolbarTooltip) {
            this.inlineToolbarTooltip.destroy();
        }
        if (this.toolbarObj) {
            this.toolbarObj.destroy();
            detach(this.toolbarEle);
            this.toolbarObj = null;
        }
        if (this.updateTransformLabelHandler) {
            EventHandler.remove(document, 'selectionchange', this.updateTransformLabelHandler);
            this.updateTransformLabelHandler = null;
        }
        this.toolbarRenderer = null;
        this.inlineToolbarTooltip = null;
        this.pickerHandler = null;
    };
    return InlineToolbarModule;
}());
export { InlineToolbarModule };
