/*
 * table-module.ts - Provides table management functionality for the Rich Text Editor
 */
// Core EJ2 base utilities
import { detach, closest, Browser, isNullOrUndefined as isNOU, getComponent, isNullOrUndefined, EventHandler, addClass } from '@syncfusion/ej2-base';
// UI components
import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
// Internal modules
import * as events from '../base/constant';
import * as classes from '../base/classes';
import * as EVENTS from '../../common/constant';
import { RenderType } from '../base/enum';
import { TableCommand } from '../../editor-manager/plugin/table';
import { ColorPickerInput } from '../actions/color-picker';
import { DropDownButtons } from '../actions';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
// Utility functions
import { dispatchEvent, parseHtml, hasClass } from '../base/util';
import { convertPixelToPercentage, insertColGroupWithSizes, removeClassWithAttr } from '../../common/util';
import { ToolbarType } from '../../common/enum';
import { DOMMethods } from '../../editor-manager/plugin/dom-tree';
/*
 * `Table` module is used to handle table actions.
 */
var Table = /** @class */ (function () {
    function Table(parent, serviceLocator) {
        this.isMultiSelection = false;
        this.tableCellPaddingValue = '';
        this.tableCellVerticalAlignValue = '';
        this.tableCellHorizontalAlignValue = '';
        this.tableCellHeightValue = '';
        this.tableStyles = {};
        this.multipleSelectionCellStyles = [];
        this.colElementsInitialWidths = new Map();
        this.createdButtons = [];
        this.createdDropdownButtons = [];
        this.alignmentButtonHandlers = [];
        this.heightValue = '';
        this.widthValue = '';
        this.savedSelectionForDialog = null;
        /**
         * @private
         */
        this.selectionStage = 0;
        this.parent = parent;
        this.rteID = parent.element.id;
        this.l10n = serviceLocator.getService('rteLocale');
        this.tableBorderStyle = new DropDownButtons(this.parent, serviceLocator);
        this.tableBorderColor = new ColorPickerInput(this.parent, serviceLocator);
        this.tableBackgroundColor = new ColorPickerInput(this.parent, serviceLocator);
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
        this.isDestroyed = false;
    }
    /*
     * Registers all event listeners for table-related operations
     *
     * This method wires up all the necessary event handlers that the Table module
     * needs to function properly, including table creation, editing, navigation,
     * and keyboard interactions.
     */
    Table.prototype.addEventListener = function () {
        // Early exit if parent component is already destroyed
        if (this.parent.isDestroyed) {
            return;
        }
        // Table creation and dialog events
        this.parent.on(events.createTable, this.renderDlgContent, this);
        this.parent.on(events.initialEnd, this.afterRender, this);
        this.parent.on(events.dynamicModule, this.afterRender, this);
        this.parent.on(events.showTableDialog, this.showDialog, this);
        this.parent.on(events.closeTableDialog, this.closeDialog, this);
        this.parent.on(events.clearDialogObj, this.clearDialogObj, this);
        this.parent.on(events.bindOnEnd, this.bindOnEnd, this);
        this.parent.on(events.updateProperty, this.updateTableProperty, this);
        // Mouse interaction events
        this.parent.on(events.docClick, this.docClick, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        // Toolbar and dropdown events
        this.parent.on(events.tableToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.dropDownSelect, this.dropdownSelect, this);
        this.parent.on(events.colorPickerChanged, this.tableColorHandler, this);
        // Keyboard and input events
        this.parent.on(events.keyDown, this.keyDown, this);
        this.parent.on(events.tableModulekeyUp, this.tableModulekeyUp, this);
        this.parent.on(events.afterKeyDown, this.afterKeyDown, this);
        // UI and styling events
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        // Lifecycle events
        this.parent.on(events.destroy, this.destroy, this);
        // Model events
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
    };
    /*
     * Removes all event listeners previously attached by addEventListener method
     *
     * This method cleans up all event handlers attached to the parent component
     * to prevent memory leaks when the Table module is destroyed or needs to
     * be detached from the DOM.
     */
    Table.prototype.removeEventListener = function () {
        // Table creation and dialog events
        this.parent.off(events.createTable, this.renderDlgContent);
        this.parent.off(events.initialEnd, this.afterRender);
        this.parent.off(events.dynamicModule, this.afterRender);
        this.parent.off(events.showTableDialog, this.showDialog);
        this.parent.off(events.closeTableDialog, this.closeDialog);
        this.parent.off(events.clearDialogObj, this.clearDialogObj);
        this.parent.off(events.bindOnEnd, this.bindOnEnd);
        this.parent.off(events.updateProperty, this.updateTableProperty);
        // Mouse interaction events
        this.parent.off(events.docClick, this.docClick);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        if (this.tableObj) {
            this.parent.off(events.mouseDown, this.tableObj.cellSelect);
        }
        // Toolbar and dropdown events
        this.parent.off(events.tableToolbarAction, this.onToolbarAction);
        this.parent.off(events.dropDownSelect, this.dropdownSelect);
        this.parent.off(events.colorPickerChanged, this.tableColorHandler);
        // Keyboard and input events
        this.parent.off(events.keyDown, this.keyDown);
        this.parent.off(events.tableModulekeyUp, this.tableModulekeyUp);
        this.parent.off(events.afterKeyDown, this.afterKeyDown);
        // UI and styling events
        this.parent.off(events.bindCssClass, this.setCssClass);
        // Lifecycle events
        this.parent.off(events.destroy, this.destroy);
        // Table quick toolbar events
        if (this.parent.editorMode !== 'Markdown' && this.parent.formatter) {
            this.parent.formatter.editorManager.observer.off(EVENTS.hideTableQuickToolbar, this.hideTableQuickToolbar);
        }
        // Model events
        this.parent.off(events.modelChanged, this.onPropertyChanged);
    };
    /*
     * Initializes the TableCommand object in the editor manager after editor initialization is complete.
     * This method binds the table module to the editor's formatter for handling table-related operations.
     */
    Table.prototype.bindOnEnd = function () {
        if (this.parent.editorMode === 'HTML' && this.parent.formatter && this.parent.formatter.editorManager
            && this.contentModule) {
            var tableModel = this.getTableModelProperty();
            this.parent.formatter.editorManager.tableObj = this.tableObj =
                new TableCommand(this.parent.formatter.editorManager, tableModel, this.parent.iframeSettings);
            if (this.tableObj) {
                this.tableObj.addResizeEventHandlers();
                // First remove any existing mouseDown event handler to prevent duplicates
                this.parent.off(events.mouseDown, this.tableObj.cellSelect);
                // Then add the event handler
                this.parent.on(events.mouseDown, this.tableObj.cellSelect, this.tableObj);
            }
            if (this.parent.formatter) {
                this.parent.formatter.editorManager.observer.on(EVENTS.hideTableQuickToolbar, this.hideTableQuickToolbar, this);
            }
        }
    };
    Table.prototype.onPropertyChanged = function (e) {
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop === 'tableSettings') {
                switch (Object.keys(e.newProp.tableSettings)[0]) {
                    case 'resize':
                        if (this.parent.tableSettings.resize === false) {
                            this.tableObj.removeResizeEventHandlers();
                        }
                        else {
                            this.tableObj.addResizeEventHandlers();
                        }
                        break;
                }
            }
        }
    };
    /* Creates and returns a table model with editor configuration and callback methods for table operations */
    Table.prototype.getTableModelProperty = function () {
        var _this = this;
        // Create TableCommand with table model containing required methods
        var tableModel = {
            tableSettings: this.parent.tableSettings,
            rteElement: this.parent.element,
            readonly: this.parent.readonly,
            enableRtl: this.parent.enableRtl,
            enterKey: this.parent.enterKey,
            editorMode: this.parent.editorMode,
            quickToolbarSettings: this.parent.quickToolbarSettings,
            tableSelectionFeature: true,
            // Method for retrieving CSS class name
            getCssClass: function (isSpace) {
                return _this.parent.getCssClass(isSpace);
            },
            // Method for preventing default resize behavior
            preventDefaultResize: function (e) {
                _this.parent.preventDefaultResize(e);
            },
            // Method for retrieving the document object of the content module
            getDocument: function () {
                if (!_this.contentModule) {
                    return _this.parent.contentModule.getDocument();
                }
                return _this.contentModule.getDocument();
            },
            // Method for retrieving the editable element object of the content module
            getEditPanel: function () {
                if (!_this.contentModule) {
                    return _this.parent.contentModule.getEditPanel();
                }
                return _this.contentModule.getEditPanel();
            },
            // Table resize event handlers
            resizeStart: function (args) {
                _this.resizeStart(args);
            },
            resizing: function (args) {
                _this.resizing(args);
            },
            resizeEnd: function (args) {
                _this.resizeEnd(args);
            },
            // Table manipulation methods
            addRow: function (selectCell, e, tabkey) {
                _this.addRow(selectCell, e, tabkey);
            },
            hideTableQuickToolbar: function () {
                _this.hideTableQuickToolbar();
            },
            removeTable: function (selection, args, delKey) {
                _this.removeTable(selection, args, delKey);
            },
            // Method for Checks if the table quick toolbar is currently visible in the document.
            isTableQuickToolbarVisible: function () {
                return _this.isTableQuickToolbarVisible();
            },
            //Method for enableUndo
            enableUndo: function () {
                _this.enableUndo();
            }
        };
        return tableModel;
    };
    /* Updates the table object with the latest editor configuration settings */
    Table.prototype.updateTableProperty = function () {
        var tableModel = this.getTableModelProperty();
        if (!isNullOrUndefined(this.tableObj)) {
            this.tableObj.updateTableModel(tableModel);
        }
    };
    /*
     * Handles the resize start event by triggering an event and processing the result.
     */
    Table.prototype.resizeStart = function (args) {
        var _this = this;
        if (this.parent.contentModule.getDocument().activeElement !== this.parent.inputElement) {
            this.parent.inputElement.focus({ preventScroll: true });
        }
        this.parent.trigger(events.resizeStart, args, function (resizeStartArgs) {
            if (resizeStartArgs.cancel && _this.tableObj) {
                _this.tableObj.cancelResizeAction();
            }
        });
    };
    /*
     * enableUndo method
     */
    Table.prototype.enableUndo = function () {
        if (this.parent.formatter) {
            this.parent.formatter.enableUndo(this.parent);
        }
    };
    /*
     * Handles the resizing event by triggering an event and processing the result.
     */
    Table.prototype.resizing = function (args) {
        var _this = this;
        this.parent.trigger(events.onResize, args, function (resizingArgs) {
            if (_this.tableObj) {
                if (resizingArgs.cancel) {
                    _this.tableObj.cancelResizeAction();
                }
                else {
                    _this.tableObj.perfomResizing(args.event);
                }
            }
        });
    };
    /*
    * Checks if the table quick toolbar is currently visible in the document.
    */
    Table.prototype.isTableQuickToolbarVisible = function () {
        return this.quickToolObj &&
            this.quickToolObj.tableQTBar &&
            document.body.contains(this.quickToolObj.tableQTBar.element);
    };
    /*
     * Handles the resize end event by triggering an event and processing the result.
     */
    Table.prototype.resizeEnd = function (args) {
        this.parent.trigger(events.resizeStop, args);
    };
    Table.prototype.afterRender = function () {
        if (isNullOrUndefined(this.contentModule)) {
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            this.bindOnEnd();
        }
    };
    /*
     * Updates CSS classes for UI components like Buttons, Dialog, and NumericTextBox
     *
     * This method safely adds or replaces CSS classes on component instances while
     * preserving existing classes. It handles class addition, replacement, and proper spacing.
     */
    Table.prototype.updateCss = function (currentObj, e) {
        if (currentObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                currentObj.setProperties({
                    cssClass: (currentObj.cssClass + ' ' + e.cssClass).trim()
                });
            }
            else {
                currentObj.setProperties({
                    cssClass: (currentObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim()
                });
            }
        }
    };
    /*
     * Sets CSS classes for the table module's UI elements
     *
     * Applies CSS classes to popups and various form controls, ensuring consistent
     * styling throughout the table module. Handles both initial class application
     * and subsequent class updates.
     */
    Table.prototype.setCssClass = function (e) {
        if (this.popupObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                addClass([this.popupObj.element], e.cssClass);
            }
            else {
                removeClassWithAttr([this.popupObj.element], e.oldCssClass);
                addClass([this.popupObj.element], e.cssClass);
            }
        }
        this.updateCss(this.createTableButton, e);
        this.updateCss(this.editdlgObj, e);
        var numericTextBoxObj = [
            this.columnTextBox,
            this.rowTextBox,
            this.tableWidthNum,
            this.tableHeightNum,
            this.tableCellPadding,
            this.tableCellSpacing,
            this.tableBorderWidth
        ];
        for (var i = 0; i < numericTextBoxObj.length; i++) {
            if (numericTextBoxObj[i]) {
                this.updateCss(numericTextBoxObj[i], e);
            }
        }
    };
    /*
     * Handles dropdown selection events for table-related operations
     *
     * This method processes dropdown command selections for table operations like
     * inserting/deleting rows or columns, merging/splitting cells, and applying
     * table styles. It routes the command to the appropriate handler method based
     * on the selected subCommand.
     */
    Table.prototype.dropdownSelect = function (e) {
        var _this = this;
        var item = e.item;
        if (item.command === 'BorderStyle') {
            var actionBeginArgs = { cancel: false, requestType: 'BorderStyle' };
            this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    var isTable = _this.selectedItem.nodeName === 'TABLE';
                    var borderDropDown = _this.parent.contentModule.getPanel().ownerDocument.getElementById(_this.parent.getID() + (isTable ? '_borderStyle' : '_cellborderStyle'));
                    borderDropDown.firstChild.innerHTML = '<span class="e-rte-dropdown-btn-text" >' + item.text + '</span>';
                    if (_this.isMultiSelection) {
                        for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                            _this.multiSelectedItems[i].style.cssText += "border-style: " + item.subCommand.toLowerCase() + ";";
                        }
                    }
                    else {
                        _this.selectedItem.style.cssText += "border-style: " + item.subCommand.toLowerCase() + ";";
                    }
                    _this.applyBorderStyleAndWidth();
                    _this.parent.trigger(events.actionComplete, { requestType: 'BorderStyle' });
                }
            });
        }
        if (!document.body.contains(document.body.querySelector('.e-rte-quick-toolbar')) || item.command !== 'Table') {
            return;
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var args = {
            args: e,
            selection: this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument()),
            selectParent: this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)
        };
        switch (item.subCommand) {
            case 'InsertRowBefore':
            case 'InsertRowAfter':
                this.addRow(args.selection, e);
                break;
            case 'InsertColumnLeft':
            case 'InsertColumnRight':
                this.addColumn(args.selection, e);
                break;
            case 'DeleteColumn':
            case 'DeleteRow':
                this.removeRowColumn(args.selection, e);
                break;
            case 'AlignTop':
            case 'AlignMiddle':
            case 'AlignBottom':
                this.verticalAlign(args, e);
                break;
            case 'Dashed':
            case 'Alternate':
            case 'Custom':
                this.parent.formatter.process(this.parent, e, args, {
                    command: item.command,
                    subCommand: e.item.subCommand
                });
                break;
            case 'Merge':
            case 'VerticalSplit':
            case 'HorizontalSplit':
                this.UpdateCells(args.selection, e);
                break;
        }
    };
    /*
     * Handles merging or splitting of table cells
     *
     * This method processes cell operations such as merging multiple selected cells or
     * splitting cells vertically or horizontally. After processing the operation,
     * it hides the quick toolbar to provide a clean UI experience.
     */
    Table.prototype.UpdateCells = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, {
            selection: selectCell,
            subCommand: e.item.subCommand
        });
        this.hideTableQuickToolbar();
    };
    /*
     * Handles keyboard events for table operations in the editor
     *
     * This method processes key press events and manages table-related functionality
     * including navigation, selection, deletion, and insertion operations.
     */
    Table.prototype.keyDown = function (e) {
        var event = e.args;
        var selectedCell = this.contentModule.getDocument().querySelector('.e-cell-select');
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyA' && selectedCell) {
            if (this.selectionStage === 0) {
                event.preventDefault();
                addClass([selectedCell], 'e-multi-cells-select');
                this.selectionStage = 1;
            }
            else if (this.selectionStage === 1) {
                // Stage 2: select the row
                var row = selectedCell.closest('tr');
                if (row) {
                    event.preventDefault();
                    this.tableObj.selectTableRow(row);
                    this.selectionStage = 2;
                }
            }
            else if (this.selectionStage === 2) {
                event.preventDefault();
                var table = selectedCell.closest('table');
                this.tableObj.selectEntireTable(table);
                this.selectionStage = 3;
            }
            else {
                this.selectionStage = 0;
            }
        }
        this.handleSpecialActions(event, e);
        if (this.tableObj) {
            if (this.tableObj.isTableInteractionPossible(event)) {
                this.tableObj.handleTableKeyboardInteractions(event);
            }
            if (this.parent.editorMode === 'HTML') {
                this.tableObj.handleShiftKeyTableSelection(event);
            }
            if (this.selectionStage === 0) {
                this.tableObj.handleGlobalKeyboardShortcuts(event);
            }
            this.tableObj.handleTableDeletion(event);
            this.tableObj.handleDeselectionOnTyping(event);
        }
    };
    /*
     * Handles special action keys like Escape and Insert Table
     */
    Table.prototype.handleSpecialActions = function (event, e) {
        switch (event.action) {
            case 'escape':
                break;
            case 'insert-table':
                if (this.parent.editorMode === 'HTML') {
                    this.openDialog(true, e);
                }
                else if (this.parent.editorMode === 'Markdown') {
                    this.parent.formatter.process(this.parent, null, event);
                }
                event.preventDefault();
                break;
        }
    };
    /*
     * Invokes the OnSelectionChange Event
     */
    Table.prototype.selectionEventTriggers = function () {
        var selection = this.parent.contentModule.getDocument().getSelection();
        var range = selection && selection.rangeCount !== 0 && selection.getRangeAt(0);
        if (range) {
            var rangeStartElement = range.startContainer.nodeName === '#text' ? range.startContainer.parentElement : range.startContainer;
            if (rangeStartElement.closest('table')) {
                var selectedCell = rangeStartElement.closest('.e-multi-cells-select');
                if (!isNullOrUndefined(selectedCell)) {
                    var targetTable = rangeStartElement.closest('table');
                    var extractedTable = this.tableObj.extractSelectedTable(targetTable, false);
                    var selectionArgs = {
                        selectedContent: extractedTable ? extractedTable.outerHTML : null,
                        selection: selection,
                        editorMode: this.parent.editorMode
                    };
                    this.parent.trigger(events.selectionChanged, selectionArgs);
                }
            }
        }
    };
    /*
     * Handles keyboard events after key up in tables.
     * This method identifies the current table cell element based on selection,
     * applies appropriate CSS classes, and manages selection state transitions
     * when navigating between cells.
     */
    Table.prototype.tableModulekeyUp = function (e) {
        var _this = this;
        if (this.tableObj) {
            this.tableObj.tableModulekeyUp(e);
        }
        if (this.selectionTimeout) {
            clearTimeout(this.selectionTimeout);
            this.selectionTimeout = null;
        }
        var isRteUnitTesting = (this.parent.element && this.parent.element.dataset && this.parent.element.dataset.rteUnitTesting === 'true');
        if (isRteUnitTesting) {
            this.selectionEventTriggers();
        }
        else {
            this.selectionTimeout = window.setTimeout(function () {
                _this.selectionEventTriggers();
            }, 600);
        }
    };
    /*
     * Opens the insert table dialog.
     * This method prepares and opens the dialog for inserting a new table,
     * handling both toolbar-initiated and keyboard shortcut-initiated cases.
     */
    Table.prototype.openDialog = function (isInternal, e) {
        if (!isInternal) {
            this.parent.contentModule.getEditPanel().focus();
        }
        if (this.parent.editorMode === 'HTML') {
            var docElement = this.parent.contentModule.getDocument();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(docElement);
            var selection = this.parent.formatter.editorManager.nodeSelection
                .save(range, docElement);
            var args = {
                originalEvent: e ? e.args : { action: 'insert-table' },
                item: {
                    command: 'Table',
                    subCommand: 'CreateTable'
                },
                name: !isInternal ? 'showDialog' : null
            };
            this.insertTableDialog({
                self: this,
                args: args,
                selection: selection
            });
        }
    };
    /*
     * Shows the table dialog from toolbar action
     * This method is the entry point for displaying the table dialog
     * when triggered from the toolbar.
     */
    Table.prototype.showDialog = function () {
        this.openDialog(false);
        this.setCssClass({ cssClass: this.parent.getCssClass() });
    };
    /*
     * Closes the table dialog
     * This method hides the table editing dialog if it's currently open.
     */
    Table.prototype.closeDialog = function () {
        if (this.editdlgObj) {
            this.editdlgObj.hide({ returnValue: true });
        }
    };
    /*
     * Processes table-related toolbar actions
     * This method handles toolbar button clicks for table operations such as
     * adding headers, removing tables, or editing table properties.
     */
    Table.prototype.onToolbarAction = function (args) {
        var item = args.args.item;
        switch (item.subCommand) {
            case 'TableHeader':
                this.tableHeader(args.selection, args.args);
                break;
            case 'TableRemove':
                this.removeTable(args.selection, args.args);
                break;
            case 'TableEditProperties':
            case 'TableCellProperties':
                if (args.args.item.subCommand === 'TableEditProperties') {
                    this.selectedItem = closest(args.selectParent[0], 'table');
                }
                else {
                    this.widthValue = 'px';
                    this.heightValue = 'px';
                    this.selectedItem = closest(args.selectParent[0], 'td') || closest(args.selectParent[0], 'th');
                    this.multiSelectedItems = this.parent.inputElement.querySelectorAll('.e-cell-select');
                    if (this.multiSelectedItems.length > 1) {
                        this.isMultiSelection = true;
                    }
                }
                if (this.selectedItem && !this.isMultiSelection) {
                    var style = this.selectedItem.style;
                    if (this.selectedItem.tagName === 'TABLE') {
                        this.tableCellPaddingValue = this.selectedItem.querySelector('td') ?
                            this.selectedItem.querySelector('td').style.padding : '';
                    }
                    else if (this.selectedItem.tagName === 'TD' || this.selectedItem.tagName === 'TH') {
                        this.tableCellPaddingValue = this.selectedItem.style.padding;
                        this.tableCellVerticalAlignValue = this.selectedItem.style.verticalAlign;
                        this.tableCellHorizontalAlignValue = this.selectedItem.style.textAlign;
                        this.tableCellHeightValue = this.selectedItem.style.height;
                    }
                    this.tableStyles = {
                        borderStyle: style.borderStyle,
                        borderColor: style.borderColor,
                        backgroundColor: style.backgroundColor,
                        borderWidth: style.borderWidth,
                        width: style.width,
                        borderSpacing: style.borderSpacing,
                        borderCollapse: style.borderCollapse
                    };
                    if (!this.selectedItem.style.borderWidth && this.selectedItem.tagName === 'TABLE') {
                        this.selectedItem.style.cssText += 'border-width: 1px;';
                    }
                    if (!this.selectedItem.style.borderStyle && this.selectedItem.tagName === 'TABLE') {
                        this.selectedItem.style.cssText += 'border-style: double;';
                    }
                }
                else if (this.isMultiSelection) {
                    for (var i = 0; i < this.multiSelectedItems.length; i++) {
                        var style = this.multiSelectedItems[i].style;
                        this.multipleSelectionCellStyles.push({
                            borderStyle: style.borderStyle,
                            borderColor: style.borderColor,
                            backgroundColor: style.backgroundColor,
                            borderWidth: style.borderWidth,
                            width: style.width,
                            height: style.height,
                            tableCellPaddingValue: this.multiSelectedItems[i].style.padding,
                            tableCellVerticalAlignValue: this.multiSelectedItems[i].style.verticalAlign,
                            tableCellHorizontalAlignValue: this.multiSelectedItems[i].style.textAlign
                        });
                        if (!this.multiSelectedItems[i].style.borderWidth && this.selectedItem.tagName === 'TABLE') {
                            this.multiSelectedItems[i].style.cssText += 'border-width: 1px;';
                        }
                        if (!this.multiSelectedItems[i].style.borderStyle && this.selectedItem.tagName === 'TABLE') {
                            this.multiSelectedItems[i].style.cssText += 'border-style: double;';
                        }
                    }
                }
                this.editTable(args);
                break;
        }
    };
    /*
     * Applies vertical alignment to table cells.
     * This method processes vertical alignment commands (top, middle, bottom)
     * for the selected table cell.
     */
    Table.prototype.verticalAlign = function (args, e) {
        var tdEle = closest(args.selectParent[0], 'th') || closest(args.selectParent[0], 'td');
        if (tdEle) {
            this.parent.formatter.process(this.parent, e, e, {
                tableCell: tdEle,
                subCommand: e.item.subCommand
            });
        }
    };
    /*
     * Hides the quick toolbar for table editing if it exists
     *
     * This method safely checks for the existence of the toolbar and its properties
     * before attempting to hide it, preventing potential null reference errors.
     */
    Table.prototype.hideTableQuickToolbar = function () {
        if (this.quickToolObj &&
            typeof this.quickToolObj.tableQTBar !== 'undefined' &&
            this.quickToolObj.tableQTBar &&
            typeof this.quickToolObj.tableQTBar.element !== 'undefined' &&
            document.body.contains(this.quickToolObj.tableQTBar.element)) {
            this.quickToolObj.tableQTBar.hidePopup();
        }
    };
    /*
     * Processes table header commands
     * Delegates the processing of table header related commands to the formatter service
     * with proper parameters and type safety.
     */
    Table.prototype.tableHeader = function (selection, e) {
        if (!e || typeof e !== 'object') {
            return;
        }
        this.parent.formatter.process(this.parent, e, e.originalEvent, {
            selection: selection,
            subCommand: typeof e.item !== 'undefined' ?
                e.item.subCommand : undefined
        });
    };
    /*
     * Gets the anchor node for an element
     * Finds the closest anchor element that contains the input element,
     * or returns the original element if no anchor is found.
     */
    Table.prototype.getAnchorNode = function (element) {
        if (!element || typeof element !== 'object') {
            return element;
        }
        var selectParent = closest(element, 'a');
        return selectParent ? selectParent : element;
    };
    /*
     * Handles click event inside editable area to show or hide the table quick toolbar.
     */
    Table.prototype.editAreaClickHandler = function (e) {
        this.selectionStage = 0;
        if (this.parent.quickToolbarModule && this.parent.quickToolbarModule.tableQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
        }
        if (this.shouldSkipQuickToolbar(e)) {
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.tableQTBar) {
            var args_1 = e.args;
            var target_1 = args_1.target;
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
            var stringArray = ['e-icons e-drag-and-drop e-active', 'e-icons e-move e-active'];
            var gripper = stringArray.some(function (cls) { return target_1.className.includes(cls); });
            if (gripper) {
                target_1 = this.contentModule.getDocument().querySelector('.e-cell-select-end');
                var domMethods = new DOMMethods(this.parent.inputElement);
                var lastNode = domMethods.getLastTextNode(target_1);
                lastNode = !isNOU(lastNode) ? lastNode : target_1;
                var offset = !isNOU(lastNode) ? lastNode.textContent.length : 0;
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), lastNode, offset);
                range = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
            }
            if (this.shouldShowQuickToolbar(args_1, target_1, range)) {
                this.showTableQuickToolbar(e, args_1, target_1, range);
            }
            else {
                this.hideTableQuickToolbar();
            }
        }
        var args = e.args;
        this.selectionEventTriggers();
    };
    /*
     * Determines whether to skip showing the quick toolbar.
     */
    Table.prototype.shouldSkipQuickToolbar = function (e) {
        if (this.parent.readonly) {
            return true;
        }
        var target = e.args.target;
        if (!isNOU(closest(target, '.' + classes.CLS_IMG_CAPTION_CONTAINER))) {
            return true;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        // Right-click / left-click logic
        // Custom condition: only skip on right-click if a certain class exists in DOM
        var stringArray = ['e-icons e-drag-and-drop e-active', 'e-icons e-move e-active'];
        if (e.args.target.nodeType === Node.ELEMENT_NODE) {
            var gripper = stringArray.some(function (cls) {
                return e.args.target.className.includes(cls);
            });
            if (showOnRightClick && gripper) {
                return false;
            }
        }
        return (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3));
    };
    /*
     * Determines whether to show the quick toolbar based on current selection and target.
     */
    Table.prototype.shouldShowQuickToolbar = function (args, target, range) {
        var closestTable = closest(target, 'table');
        var startNode = this.parent.getRange().startContainer.parentElement;
        var endNode = this.parent.getRange().endContainer.parentElement;
        var isAnchorEle = this.getAnchorNode(target);
        var ismacRightClick = this.parent.userAgentData.getPlatform() === 'macOS' && args.which === 3;
        var rangeAtPointer = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
        var currentTime = new Date().getTime();
        return target &&
            target.nodeName !== 'A' &&
            isAnchorEle.nodeName !== 'A' &&
            target.nodeName !== 'IMG' &&
            target.nodeName !== 'VIDEO' &&
            target.nodeName !== 'AUDIO' &&
            !target.classList.contains(classes.CLS_CLICKELEM) &&
            (startNode === endNode || ismacRightClick) &&
            (target.nodeName === 'TD' || target.nodeName === 'TH' || target.nodeName === 'TABLE' ||
                (closestTable && this.parent.contentModule.getEditPanel().contains(closestTable))) &&
            !(range.startContainer.nodeType === 3 && !(range.collapsed || ismacRightClick)) &&
            (this.tableObj && (currentTime - this.tableObj.resizeEndTime > 100)) &&
            (rangeAtPointer || closestTable.querySelectorAll('.e-multi-cells-select').length > 0);
    };
    /*
     * Shows the table quick toolbar popup at the given position.
     */
    Table.prototype.showTableQuickToolbar = function (e, args, target, range) {
        this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument());
        this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
        this.parent.formatter.editorManager.nodeSelection.restore();
        this.quickToolObj.tableQTBar.showPopup(target, e.args);
    };
    /*
     * Handles the click event on a table cell to trigger table insertion.
     */
    Table.prototype.tableCellClick = function (e) {
        var target = e.target;
        if (!target) {
            return;
        }
        var parentRow = target.parentElement;
        var tableRow = parentRow ? parentRow.parentElement : null;
        if (!parentRow || !tableRow) {
            return;
        }
        var row = Array.prototype.slice.call(tableRow.children).indexOf(parentRow) + 1;
        var col = Array.prototype.slice.call(parentRow.children).indexOf(target) + 1;
        var selfObj = this.self;
        if (typeof selfObj.tableInsert === 'function') {
            selfObj.tableInsert(row, col, e, this);
        }
    };
    /*
     * Handles table insertion operation in the rich text editor.
     */
    Table.prototype.tableInsert = function (row, col, e, selectionObj) {
        var proxy = selectionObj && selectionObj.self ? selectionObj.self : this;
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        this.prepareSelectionForTableInsert(selectionObj, proxy);
        this.cleanupTableCreationEvents(e, proxy);
        var tableConfig = this.createTableConfiguration(row, col, proxy, selectionObj);
        this.insertTableIntoEditor(tableConfig, selectionObj, proxy);
        // Restore scroll position and set up cell selection
        window.scrollTo(scrollX, scrollY);
        this.setupTableCellSelection(proxy);
    };
    /*
     * Prepares the selection for table insertion.
     */
    Table.prototype.prepareSelectionForTableInsert = function (selectionObj, proxy) {
        if (!selectionObj || !selectionObj.selection || !selectionObj.selection.range) {
            return;
        }
        var startContainer = selectionObj.selection.range.startContainer;
        // Handle empty paragraph
        if (startContainer.nodeName === 'P' &&
            startContainer.textContent.trim() === '' &&
            !(startContainer.childNodes.length > 0)) {
            startContainer.innerHTML = '<br>';
        }
        var parentNode = startContainer.parentNode;
        // Handle HTML editor mode
        if (this.isHtmlEditorOutsideEditableRegion(proxy, parentNode)) {
            proxy.contentModule.getEditPanel().focus();
            var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.contentModule.getDocument());
            selectionObj.selection = proxy.parent.formatter.editorManager.nodeSelection.save(range, proxy.contentModule.getDocument());
        }
    };
    /*
     * Checks if the current selection is outside the editable region in HTML mode.
     */
    Table.prototype.isHtmlEditorOutsideEditableRegion = function (proxy, parentNode) {
        if (!proxy.parent || proxy.parent.editorMode !== 'HTML') {
            return false;
        }
        var inIframeOutsideEditor = proxy.parent.iframeSettings.enable &&
            parentNode.ownerDocument &&
            parentNode.ownerDocument.querySelector('body') &&
            !hasClass(parentNode.ownerDocument.querySelector('body'), 'e-lib');
        var panelId = proxy.contentModule.getPanel().id;
        var outsideEditPanel = !proxy.parent.iframeSettings.enable &&
            isNOU(closest(parentNode, "[id=\"" + panelId + "\"]"));
        return inIframeOutsideEditor || outsideEditPanel;
    };
    /*
     * Cleans up event handlers after table creation.
     */
    Table.prototype.cleanupTableCreationEvents = function (e, proxy) {
        if (proxy.popupObj) {
            var target = e.target;
            if (target && target.parentElement && target.parentElement.parentElement) {
                var rows = Array.prototype.slice.call(target.parentElement.parentElement.children);
                for (var i = 0; i < rows.length; i++) {
                    EventHandler.remove(rows[i], 'mouseleave', this.tableObj.tableCellLeave);
                    var cells = Array.prototype.slice.call(rows[i].children);
                    for (var j = 0; j < cells.length; j++) {
                        EventHandler.remove(cells[j], 'mousemove', this.tableObj.tableCellSelect);
                        EventHandler.remove(cells[j], 'mouseup', this.tableCellClick);
                        if (this.parent.toolbarSettings.type === ToolbarType.Popup) {
                            EventHandler.remove(cells[j], 'click', this.tableCellClick);
                        }
                    }
                }
            }
            proxy.popupObj.hide();
        }
        if (proxy.editdlgObj) {
            proxy.editdlgObj.hide();
        }
    };
    /*
     * Creates the table configuration for insertion.
     */
    Table.prototype.createTableConfiguration = function (row, col, proxy, selectionObj) {
        return {
            rows: row,
            columns: col,
            width: {
                minWidth: proxy.parent.tableSettings.minWidth,
                maxWidth: proxy.parent.tableSettings.maxWidth,
                width: proxy.parent.tableSettings.width
            },
            selection: selectionObj.selection
        };
    };
    /*
     * Inserts the table into the editor.
     */
    Table.prototype.insertTableIntoEditor = function (tableConfig, selectionObj, proxy) {
        proxy.parent.formatter.process(proxy.parent, selectionObj.args, selectionObj.args.originalEvent, tableConfig);
        proxy.contentModule.getEditPanel().focus();
    };
    /*
     * Sets up table cell selection handlers after table insertion.
     */
    Table.prototype.setupTableCellSelection = function (proxy) {
        if (!proxy.tableObj) {
            return;
        }
        proxy.parent.on(events.mouseDown, proxy.tableObj.cellSelect, proxy.tableObj);
        var selection = proxy.parent.formatter.editorManager.nodeSelection.get(proxy.contentModule.getDocument());
        if (!isNullOrUndefined(selection) &&
            !isNullOrUndefined(selection.anchorNode) &&
            selection.anchorNode.nodeType === Node.ELEMENT_NODE) {
            var anchorElement = selection.anchorNode;
            var isTableCell = anchorElement.tagName === 'TD' || anchorElement.tagName === 'TH';
            if (isTableCell) {
                proxy.tableObj.curTable = closest(selection.anchorNode, 'table');
                proxy.tableObj.activeCell = selection.anchorNode;
            }
        }
    };
    /*
     * Inserts a new row in the table at the selected cell position.
     */
    Table.prototype.addRow = function (selectCell, e, tabkey) {
        var cmd;
        if (tabkey) {
            cmd = {
                item: { command: 'Table', subCommand: 'InsertRowAfter' }
            };
        }
        var value = {
            selection: selectCell,
            subCommand: (tabkey) ? cmd.item.subCommand : e.item.subCommand
        };
        this.parent.formatter.process(this.parent, (tabkey) ? cmd : e, e, value);
    };
    /*
     * Adds a new column to the table at the selected cell position.
     */
    Table.prototype.addColumn = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, width: this.parent.tableSettings.width, subCommand: e.item.subCommand });
    };
    /*
     * Removes a row or column from the table based on the selected cell.
     */
    Table.prototype.removeRowColumn = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, subCommand: e.item.subCommand });
        this.hideTableQuickToolbar();
    };
    /*
     * Removes the entire table from the editor content.
     */
    Table.prototype.removeTable = function (selection, args, delKey) {
        var cmd;
        if (delKey) {
            cmd = { item: { command: 'Table', subCommand: 'TableRemove' } };
        }
        var value = {
            selection: selection,
            subCommand: (delKey) ? cmd.item.subCommand : args.item.subCommand
        };
        this.parent.formatter.process(this.parent, (delKey) ? cmd : args, args.originalEvent, value);
        this.contentModule.getEditPanel().focus();
        if (this.tableObj) {
            this.tableObj.setDefaultEmptyContent();
            this.tableObj.removeResizeElement();
        }
        this.hideTableQuickToolbar();
    };
    /*
     * Renders the table dialog content based on user interaction.
     */
    Table.prototype.renderDlgContent = function (args) {
        var _this = this;
        var argsTarget = args.args.originalEvent.target;
        if (Browser.isDevice || this.parent.inlineMode.enable || !isNullOrUndefined(closest(argsTarget, '.e-text-quicktoolbar'))) {
            this.insertTableDialog(args);
            return;
        }
        if (this.popupObj) {
            this.popupObj.hide();
            return;
        }
        this.hideTableQuickToolbar();
        var header = '1X1';
        var insertbtn = this.l10n.getConstant('inserttablebtn');
        this.dlgDiv = this.parent.createElement('div', { className: 'e-rte-table-popup' + this.parent.getCssClass(true), id: this.rteID + '_table' });
        this.createTablePopupBoundFn = this.createTablePopupKeyDown.bind(this);
        this.dlgDiv.addEventListener('keydown', this.createTablePopupBoundFn);
        this.tblHeader = this.parent.createElement('div', { className: 'e-rte-popup-header' + this.parent.getCssClass(true) });
        this.tblHeader.innerHTML = header;
        if (this.tableObj) {
            this.tableObj.tblHeader = this.tblHeader;
            this.tableObj.dlgDiv = this.dlgDiv;
        }
        this.dlgDiv.appendChild(this.tblHeader);
        var tableDiv = this.parent.createElement('div', { className: 'e-rte-table-span' + this.parent.getCssClass(true) });
        this.drawTable(tableDiv, args);
        this.dlgDiv.appendChild(tableDiv);
        this.dlgDiv.appendChild(this.parent.createElement('span', { className: 'e-span-border' + this.parent.getCssClass(true) }));
        var btnEle = this.parent.createElement('button', {
            className: 'e-insert-table-btn' + this.parent.getCssClass(true), id: this.rteID + '_insertTable',
            attrs: { type: 'button', tabindex: '0' }
        });
        if (!isNOU(this.parent.getToolbarElement().querySelector('.e-expended-nav'))) {
            this.parent.getToolbarElement().querySelector('.e-expended-nav').setAttribute('tabindex', '1');
        }
        this.dlgDiv.appendChild(btnEle);
        this.createTableButton = new Button({
            iconCss: 'e-icons e-create-table', content: insertbtn, cssClass: 'e-flat' + this.parent.getCssClass(true),
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.createTableButton.isStringTemplate = true;
        this.createTableButton.appendTo(btnEle);
        EventHandler.add(btnEle, 'click', this.insertTableDialog, { self: this, args: args.args, selection: args.selection });
        this.parent.getToolbar().parentElement.appendChild(this.dlgDiv);
        var target = args.args.originalEvent.target;
        target = target.classList.contains('e-toolbar-item') ? target.firstChild : target.parentElement;
        this.popupObj = new Popup(this.dlgDiv, {
            targetType: 'relative',
            relateTo: target,
            collision: { X: 'fit', Y: 'none' },
            offsetY: 8,
            viewPortElement: this.parent.element,
            position: { X: 'left', Y: 'bottom' },
            enableRtl: this.parent.enableRtl,
            close: function () {
                EventHandler.remove(btnEle, 'click', _this.insertTableDialog);
                _this.dlgDiv.removeEventListener('keydown', _this.createTablePopupBoundFn);
                detach(btnEle);
                if (_this.createTableButton && !_this.createTableButton.isDestroyed) {
                    _this.createTableButton.destroy();
                    _this.createTableButton.element = null;
                    _this.createTableButton = null;
                }
                _this.parent.isBlur = false;
                _this.popupObj.element.parentElement.style.zIndex = '';
                _this.popupObj.destroy();
                detach(_this.popupObj.element);
                _this.popupObj = null;
            }
        });
        this.popupObj.show();
        this.popupObj.element.parentElement.style.zIndex = '11';
        if (!isNOU(this.parent.cssClass)) {
            addClass([this.popupObj.element], this.parent.getCssClass());
        }
        this.popupObj.refreshPosition(target);
        this.positionDialogue(target);
        btnEle.focus();
    };
    /*
     * Adjusts the position of the table dialog popup based on available screen space
     * This method calculates whether there's enough space below the button to display
     * the popup. If not enough space is available, it repositions the popup above the
     * button. It also handles the correct positioning with expanded toolbars.
     */
    Table.prototype.positionDialogue = function (target) {
        var windowHeight = window.innerHeight;
        var popupHeight = this.popupObj.element.getBoundingClientRect().height;
        var spaceBelow = windowHeight - target.getBoundingClientRect().bottom;
        var buttonRowHeight;
        var toolbarButton = target.closest('.e-toolbar-item');
        var isPopup = this.parent.toolbarSettings.type === 'Popup';
        var toolbarWrapper = this.parent.toolbarModule.getToolbarElement();
        var expandedToolbar = toolbarWrapper ? toolbarWrapper.querySelector('.e-toolbar-extended') : toolbarWrapper;
        if (toolbarButton) {
            if (isPopup) {
                buttonRowHeight = toolbarButton.getBoundingClientRect().height;
                if (toolbarButton.parentElement.getBoundingClientRect().top < toolbarWrapper.getBoundingClientRect().top) {
                    buttonRowHeight = toolbarWrapper.getBoundingClientRect().height +
                        toolbarButton.parentElement.getBoundingClientRect().height;
                }
            }
            else {
                buttonRowHeight = toolbarButton.parentElement.getBoundingClientRect().height;
            }
        }
        else {
            var toolbarItem = this.parent.element.querySelector('.e-toolbar-item');
            if (toolbarItem) {
                buttonRowHeight = toolbarItem.parentElement.getBoundingClientRect().height;
            }
        }
        if (expandedToolbar && toolbarButton.parentElement !== expandedToolbar) {
            buttonRowHeight += expandedToolbar.getBoundingClientRect().height;
        }
        if (spaceBelow < popupHeight) {
            this.popupObj.element.style.setProperty('top', 'auto');
            this.popupObj.element.style.setProperty('bottom', buttonRowHeight + "px");
        }
    };
    /*
     * Handles iframe mouse down events by hiding popups and cleaning up resize elements.
     */
    Table.prototype.onIframeMouseDown = function (e) {
        if (this.popupObj) {
            this.popupObj.hide();
        }
        if (this.editdlgObj) {
            this.editdlgObj.hide();
        }
        if (!isNOU(this.parent) && !isNOU(this.parent.contentModule) &&
            !isNOU(this.parent.contentModule.getEditPanel()) && this.tableObj) {
            if (e && e.target) {
                var currentTarget = e.target;
                var isReziseEle = currentTarget && currentTarget.classList && currentTarget.classList.contains('e-rte-table-resize');
                if (isReziseEle) {
                    return;
                }
            }
            var target = e && e.target;
            if (this.tableObj && target && target.classList && !target.classList.contains(EVENTS.CLS_TB_COL_RES) &&
                !target.classList.contains(EVENTS.CLS_TB_ROW_RES) && !target.classList.contains(EVENTS.CLS_TB_BOX_RES) &&
                !(Browser.isDevice && target.nodeName !== '#text' && target.closest('.e-cell-select'))) {
                this.tableObj.removeResizeElement(true);
                var tableSelection = this.contentModule.getDocument().querySelector('.e-icons.e-move');
                if (target instanceof HTMLElement && target.classList.contains('e-icons') && target.classList.contains('e-move') && this.contentModule.getDocument().querySelector('.e-rte-table-resize') && tableSelection) {
                    this.tableObj.removeResizeElement();
                }
            }
        }
    };
    /*
     * Manages document click events to control popup visibility.
     */
    Table.prototype.docClick = function (e) {
        var target = e.args.target;
        if (target && target.classList && ((this.popupObj && !closest(target, "[id='" + this.popupObj.element.id + "']") ||
            (this.editdlgObj && !closest(target, '#' + this.editdlgObj.element.id)))) && !target.classList.contains('e-create-table') &&
            target.offsetParent && !target.offsetParent.classList.contains('e-rte-backgroundcolor-dropdown')) {
            if (this.popupObj) {
                this.popupObj.hide();
            }
            if (this.editdlgObj && !target.closest('.e-border-style-btn') && !target.closest('.e-rte-border-colorpicker') && !target.closest('.e-rte-table-bg-colorpicker') && !target.closest('.e-rte-edit-cell-dropdown')) {
                var dialogElement = this.selectedItem ? this.selectedItem.nodeName === 'TABLE' ? this.editdlgObj.element.querySelector('.e-rte-edit-table-content') : this.editdlgObj.element.querySelector('.e-rte-edit-tablecell-dialog') : null;
                if (dialogElement) {
                    for (var property in this.tableStyles) {
                        if (Object.prototype.hasOwnProperty.call(this.tableStyles, property)) {
                            this.selectedItem.style[property] = this.tableStyles[property];
                        }
                    }
                    this.applyTableCellPropertiesOnDialogClose();
                }
                var colorPickerPopup = this.parent.contentModule.getDocument().querySelector('.e-colorpicker-popup.e-popup-open');
                if (colorPickerPopup) {
                    colorPickerPopup.classList.remove('e-popup-open');
                    colorPickerPopup.classList.add('e-popup-close');
                }
                this.parent.notify(events.documentClickClosedBy, { closedBy: 'outside click' });
                this.editdlgObj.hide();
                this.isMultiSelection = false;
                this.multiSelectedItems = {};
                this.multipleSelectionCellStyles.length = 0;
            }
            if (!target.closest('.e-border-style-btn') && !target.closest('.e-rte-border-colorpicker') && !target.closest('.e-rte-table-bg-colorpicker') && !target.closest('.e-rte-edit-cell-dropdown')) {
                this.parent.isBlur = true;
                dispatchEvent(this.parent.element, 'focusout');
            }
        }
        var closestEle = closest(target, 'td') || closest(target, 'th');
        var isExist = closestEle && this.parent.contentModule.getEditPanel().contains(closestEle) ? true : false;
        if (target && target.tagName !== 'TD' && target.tagName !== 'TH' && !isExist &&
            closest(target, '.e-rte-quick-popup') === null && target.offsetParent &&
            !target.offsetParent.classList.contains('e-quick-dropdown') &&
            !target.offsetParent.classList.contains('e-rte-backgroundcolor-dropdown') && !closest(target, '.e-rte-dropdown-popup')
            && !closest(target, '.e-rte-elements')) {
            var isToolbarClick = target.closest('.e-toolbar') || target.closest('.e-toolbar-wrapper') ? true : false;
            var isClickedOnPasteCleanupDialog = closest(target, '#' + this.parent.element.id + '_pasteCleanupDialog') ? true : false;
            if (this.tableObj) {
                if (!isToolbarClick && !isClickedOnPasteCleanupDialog) {
                    this.tableObj.removeCellSelectClasses();
                    this.tableObj.removeTableSelection();
                }
            }
            if (!Browser.isIE) {
                this.hideTableQuickToolbar();
            }
        }
        if (this.tableObj && target && target.classList && !target.classList.contains(EVENTS.CLS_TB_COL_RES) &&
            !target.classList.contains(EVENTS.CLS_TB_ROW_RES) && !target.classList.contains(EVENTS.CLS_TB_BOX_RES) &&
            !(Browser.isDevice && target.nodeName !== '#text' && target.closest('.e-cell-select'))) {
            this.tableObj.removeResizeElement(true);
            var tableSelection = this.contentModule.getDocument().querySelector('.e-icons.e-move');
            if (target instanceof HTMLElement && target.classList.contains('e-icons') && target.classList.contains('e-move') && this.contentModule.getDocument().querySelector('.e-rte-table-resize') && tableSelection) {
                this.tableObj.removeResizeElement();
            }
        }
    };
    /*
     * Generates and configures a table UI within the provided container.
     */
    Table.prototype.drawTable = function (tableDiv, args) {
        var rowDiv;
        var tableCell;
        for (var row = 0; row < 3; row++) {
            rowDiv = this.parent.createElement('div', { className: 'e-rte-table-row' + this.parent.getCssClass(true), attrs: { 'data-column': '' + row } });
            EventHandler.add(rowDiv, 'mouseleave', this.tableObj.tableCellLeave, this.tableObj);
            for (var col = 0; col < 10; col++) {
                tableCell = this.parent.createElement('div', { className: 'e-rte-tablecell e-default' + this.parent.getCssClass(true), attrs: { 'data-cell': '' + col } });
                rowDiv.appendChild(tableCell);
                tableCell.style.display = 'inline-block';
                if (col === 0 && row === 0) {
                    addClass([tableCell], 'e-active');
                }
                EventHandler.add(tableCell, 'mousemove', this.tableObj.tableCellSelect, this.tableObj);
                if (this.parent.toolbarSettings.type === ToolbarType.Popup) {
                    EventHandler.add(tableCell, 'click', this.tableCellClick, { self: this, args: args.args, selection: args.selection });
                }
                else {
                    EventHandler.add(tableCell, 'mouseup', this.tableCellClick, { self: this, args: args.args, selection: args.selection });
                }
            }
            tableDiv.appendChild(rowDiv);
        }
    };
    /*
     * Opens a dialog to edit properties of an existing table.
     */
    Table.prototype.editTable = function (args) {
        var _this = this;
        this.createDialog();
        // Save the editor selection before the dialog steals focus
        var currentRange = this.parent.formatter.editorManager.nodeSelection
            .getRange(this.contentModule.getDocument());
        this.savedSelectionForDialog = this.parent.formatter.editorManager.nodeSelection
            .save(currentRange, this.contentModule.getDocument());
        this.storeInitialColWidths();
        var editContent = this.tableDlgContent(args);
        var update = this.l10n.getConstant('dialogUpdate');
        var cancel = this.l10n.getConstant('dialogCancel');
        var headerKeyMap = {
            TABLE: 'tableEditHeader',
            TD: 'tableCellHeader',
            TH: 'tableCellHeader'
        };
        var editHeader = this.l10n.getConstant(headerKeyMap[this.selectedItem.nodeName]);
        this.editdlgObj.setProperties({
            height: 'initial', width: '390px', content: editContent, header: editHeader,
            buttons: [{
                    click: this.saveProperties.bind(this),
                    buttonModel: { content: update, cssClass: 'e-flat e-size-update' + this.parent.getCssClass(true), isPrimary: true }
                },
                {
                    click: function () {
                        _this.cancelDialog(true);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + this.parent.getCssClass(true), content: cancel }
                }],
            cssClass: this.editdlgObj.cssClass + ' e-rte-edit-table-prop-dialog'
        });
        this.editdlgObj.element.style.maxHeight = 'none';
        this.editdlgObj.content.querySelector('input').focus();
        this.hideTableQuickToolbar();
    };
    /*
     * Opens a dialog for inserting a new table into the document.
     */
    Table.prototype.insertTableDialog = function (args) {
        var proxy = (this.self) ? this.self : this;
        if (proxy.popupObj) {
            proxy.popupObj.hide();
        }
        proxy.createDialog();
        var dlgContent = proxy.tableCellDlgContent();
        var insert = proxy.l10n.getConstant('dialogInsert');
        var cancel = proxy.l10n.getConstant('dialogCancel');
        if (isNullOrUndefined(proxy.editdlgObj)) {
            return;
        }
        proxy.editdlgObj.setProperties({
            height: 'initial', width: '290px', content: dlgContent,
            buttons: [{
                    click: proxy.customTable.bind(this, args),
                    buttonModel: { content: insert, cssClass: 'e-flat e-insert-table' + ' ' + proxy.parent.cssClass, isPrimary: true }
                },
                {
                    click: function () {
                        proxy.cancelDialog();
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + ' ' + proxy.parent.cssClass, content: cancel }
                }]
        });
        if (!isNOU(proxy.parent.cssClass)) {
            proxy.editdlgObj.setProperties({ cssClass: proxy.parent.cssClass });
        }
        proxy.editdlgObj.element.style.maxHeight = 'none';
        proxy.editdlgObj.content.querySelector('input').focus();
    };
    /*
     * Creates the content for the table cell dialog with row and column inputs.
     */
    Table.prototype.tableCellDlgContent = function () {
        var tableColumn = this.l10n.getConstant('columns');
        var tableRow = this.l10n.getConstant('rows');
        var tableWrap = this.parent.createElement('div', { className: 'e-cell-wrap' + this.parent.getCssClass(true) });
        var content = '<div id="tableColumn-parent" class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" '
            + ' data-role ="none" id="tableColumn" class="e-table-column' + this.parent.getCssClass(true) + '"/></div>'
            + '<div id="tableRow-parent" class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" data-role ="none" id="tableRow" class="e-table-row' + this.parent.getCssClass(true) + '" /></div>';
        var contentElem = parseHtml(content);
        tableWrap.appendChild(contentElem);
        this.columnTextBox = new NumericTextBox({
            format: 'n0',
            min: 1,
            value: 3,
            placeholder: tableColumn,
            floatLabelType: 'Auto',
            max: 50,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass()
        });
        this.columnTextBox.isStringTemplate = true;
        this.columnTextBox.appendTo(tableWrap.querySelector('#tableColumn'));
        this.rowTextBox = new NumericTextBox({
            format: 'n0',
            min: 1,
            value: 3,
            placeholder: tableRow,
            floatLabelType: 'Auto',
            max: 100,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass()
        });
        this.rowTextBox.isStringTemplate = true;
        this.rowTextBox.appendTo(tableWrap.querySelector('#tableRow'));
        if (this.parent.showTooltip) {
            this.createTooltip(['tableRow-parent', 'tableColumn-parent'], {
                'tableRow-parent': 'insertTableRowTitle',
                'tableColumn-parent': 'insertTableColumnTitle'
            }, tableWrap);
        }
        return tableWrap;
    };
    Table.prototype.createTooltip = function (targetIds, contentKeys, container) {
        var _this = this;
        var tooltipTarget = targetIds.map(function (id) { return "#" + id; }).join(',');
        var tooltip = new Tooltip({
            target: tooltipTarget,
            showTipPointer: true,
            openDelay: 400,
            opensOn: 'Hover',
            cssClass: this.parent.getCssClass(),
            windowCollision: true,
            position: 'BottomCenter',
            beforeRender: function (args) {
                var targetId = args.target.id;
                var contentKey = contentKeys[targetId] || '';
                var tooltipText = _this.l10n.getConstant(contentKey);
                args.target.setAttribute('title', tooltipText);
            }
        });
        tooltip.isAngular = this.parent.isModalDialog;
        tooltip.appendTo(container);
    };
    /*
     * Cleans up and destroys the dialog object.
     */
    Table.prototype.clearDialogObj = function () {
        if (this.editdlgObj) {
            this.editdlgObj.destroy();
            detach(this.editdlgObj.element);
            this.editdlgObj = null;
        }
    };
    /*
     * Creates a dialog for table operations.
     */
    Table.prototype.createDialog = function () {
        var _this = this;
        if (this.editdlgObj) {
            this.editdlgObj.hide({ returnValue: true });
            return;
        }
        var tableDialog = this.parent.createElement('div', {
            className: 'e-rte-edit-table' + this.parent.getCssClass(true), id: this.rteID + '_tabledialog'
        });
        this.parent.rootContainer.appendChild(tableDialog);
        var insert = this.l10n.getConstant('dialogInsert');
        var cancel = this.l10n.getConstant('dialogCancel');
        var header = this.l10n.getConstant('tabledialogHeader');
        var dialogModel = {
            header: header,
            cssClass: classes.CLS_RTE_ELEMENTS + this.parent.getCssClass(true),
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '340px', height: 'initial',
            position: { X: 'center', Y: (Browser.isDevice) ? 'center' : 'top' },
            isModal: Browser.isDevice,
            buttons: [{
                    buttonModel: { content: insert, cssClass: 'e-flat e-insert-table' + this.parent.getCssClass(true), isPrimary: true }
                },
                {
                    click: function () {
                        _this.cancelDialog();
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + this.parent.getCssClass(true), content: cancel }
                }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                event.preventFocus = true;
                _this.parent.isBlur = false;
                var dialogElement = _this.selectedItem ? _this.selectedItem.nodeName === 'TABLE' ? _this.editdlgObj.element.querySelector('.e-rte-edit-table-content') : _this.editdlgObj.element.querySelector('.e-rte-edit-tablecell-dialog') : null;
                if (dialogElement && (event.closedBy.toString() === 'escape' || event.closedBy.toString() === 'close icon')) {
                    for (var property in _this.tableStyles) {
                        if (Object.prototype.hasOwnProperty.call(_this.tableStyles, property)) {
                            _this.selectedItem.style[property] = _this.tableStyles[property];
                        }
                    }
                    _this.applyTableCellPropertiesOnDialogClose();
                }
                _this.cleanupAlignmentButtons();
                _this.editdlgObj.destroy();
                detach(_this.editdlgObj.element);
                _this.dialogRenderObj.close(event);
                _this.isMultiSelection = false;
                _this.multiSelectedItems = {};
                _this.multipleSelectionCellStyles.length = 0;
                _this.editdlgObj = null;
            }
        };
        this.editdlgObj = this.dialogRenderObj.render(dialogModel);
        this.editdlgObj.appendTo(tableDialog);
        if (this.quickToolObj && this.quickToolObj.inlineQTBar && document.body.contains(this.quickToolObj.inlineQTBar.element)) {
            this.quickToolObj.inlineQTBar.hidePopup();
        }
        if (this.quickToolObj && this.quickToolObj.textQTBar &&
            this.parent.element.ownerDocument.body.contains(this.quickToolObj.textQTBar.element)) {
            this.quickToolObj.textQTBar.hidePopup();
        }
    };
    Table.prototype.applyTableCellPropertiesOnDialogClose = function () {
        if (this.selectedItem.nodeName === 'TABLE') {
            var tdElements = this.selectedItem.querySelectorAll('td,th');
            for (var i = 0; i < tdElements.length; i++) {
                if (this.tableCellPaddingValue) {
                    tdElements[i].style.padding = this.tableCellPaddingValue;
                }
                else {
                    tdElements[i].style.padding = '';
                }
            }
        }
        else if (this.selectedItem.nodeName === 'TD' || this.selectedItem.nodeName === 'TH') {
            var colgroupElement = this.selectedItem.closest('table').querySelector('colgroup');
            var colElements = void 0;
            if (colgroupElement) {
                colElements = colgroupElement.querySelectorAll('col');
            }
            if (this.isMultiSelection) {
                for (var i = 0; i < this.multiSelectedItems.length; i++) {
                    if (this.multipleSelectionCellStyles[i].tableCellPaddingValue) {
                        this.multiSelectedItems[i].style.padding =
                            this.multipleSelectionCellStyles[i].tableCellPaddingValue;
                    }
                    else {
                        this.multiSelectedItems[i].style.padding = '';
                    }
                    if (this.multipleSelectionCellStyles[i].tableCellVerticalAlignValue) {
                        this.multiSelectedItems[i].style.verticalAlign =
                            this.multipleSelectionCellStyles[i].tableCellVerticalAlignValue;
                    }
                    else {
                        this.multiSelectedItems[i].style.verticalAlign = '';
                    }
                    if (this.multipleSelectionCellStyles[i].tableCellHorizontalAlignValue) {
                        this.multiSelectedItems[i].style.textAlign =
                            this.multipleSelectionCellStyles[i].tableCellHorizontalAlignValue;
                    }
                    else {
                        this.multiSelectedItems[i].style.textAlign = '';
                    }
                    this.multiSelectedItems[i].style.borderStyle =
                        this.multipleSelectionCellStyles[i].borderStyle;
                    this.multiSelectedItems[i].style.borderWidth =
                        this.multipleSelectionCellStyles[i].borderWidth;
                    this.multiSelectedItems[i].style.borderColor =
                        this.multipleSelectionCellStyles[i].borderColor;
                    this.multiSelectedItems[i].style.backgroundColor =
                        this.multipleSelectionCellStyles[i].backgroundColor;
                    this.multiSelectedItems[i].style.height =
                        this.multipleSelectionCellStyles[i].height;
                    if (colElements && colElements.length > 0) {
                        for (var i_1 = 0; i_1 < this.multiSelectedItems.length; i_1++) {
                            var index = this.multiSelectedItems[i_1].cellIndex;
                            var colElement = colElements[index];
                            if (colElement && this.colElementsInitialWidths.has(colElement)) {
                                var initialWidth = this.colElementsInitialWidths.get(colElement);
                                colElement.style.width = initialWidth || '';
                            }
                        }
                    }
                }
            }
            else {
                var tdElement = this.selectedItem;
                if (this.tableCellPaddingValue) {
                    tdElement.style.padding = this.tableCellPaddingValue;
                }
                else {
                    tdElement.style.padding = '';
                }
                if (this.tableCellVerticalAlignValue) {
                    tdElement.style.verticalAlign = this.tableCellVerticalAlignValue;
                }
                else {
                    tdElement.style.verticalAlign = '';
                }
                if (this.tableCellHorizontalAlignValue) {
                    tdElement.style.textAlign = this.tableCellHorizontalAlignValue;
                }
                else {
                    tdElement.style.textAlign = '';
                }
                if (this.tableCellHeightValue) {
                    tdElement.style.height = this.tableCellHeightValue;
                }
                else {
                    tdElement.style.height = '';
                }
                if (colElements && colElements.length > 0) {
                    var index = this.selectedItem.cellIndex;
                    var colElement = colElements[index];
                    if (colElement && this.colElementsInitialWidths.has(colElement)) {
                        var initialWidth = this.colElementsInitialWidths.get(colElement);
                        colElement.style.width = initialWidth || '';
                    }
                }
            }
        }
    };
    /*
     * Handles the creation of a custom table based on user inputs.
     */
    Table.prototype.customTable = function (args, e) {
        var proxy = (this.self) ? this.self : this;
        if (proxy && proxy.rowTextBox && proxy.rowTextBox.value && proxy.columnTextBox && proxy.columnTextBox.value) {
            var argument = ((Browser.isDevice || (!isNullOrUndefined(args.args)
                && !isNullOrUndefined(args.args.originalEvent) &&
                args.args.originalEvent.action === 'insert-table')
                || proxy.parent.inlineMode.enable ||
                ((!isNullOrUndefined(proxy.parent.quickToolbarSettings.text)) && !(args instanceof PointerEvent))) ? args :
                this);
            proxy.tableInsert(proxy.rowTextBox.value, proxy.columnTextBox.value, e, argument);
        }
    };
    /*
     * Handles dialog cancellation and cleanup.
     */
    Table.prototype.cancelDialog = function (isEditTable) {
        if (isEditTable) {
            for (var property in this.tableStyles) {
                if (Object.prototype.hasOwnProperty.call(this.tableStyles, property)) {
                    this.selectedItem.style[property] = this.tableStyles[property];
                }
            }
            this.applyTableCellPropertiesOnDialogClose();
        }
        this.cleanupAlignmentButtons();
        this.parent.isBlur = false;
        this.editdlgObj.hide({ returnValue: true });
        this.isMultiSelection = false;
        this.multiSelectedItems = {};
        this.multipleSelectionCellStyles.length = 0;
    };
    /*
     * Applies the table color properties from the dialog to the selected table.
     */
    Table.prototype.tableColorHandler = function (colorPickerArgs) {
        var _this = this;
        if (colorPickerArgs.item.subCommand === 'TableBackgroundColor') {
            var actionBeginArgs = { cancel: false, requestType: 'TableBackgroundColor' };
            this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    if (colorPickerArgs.value === '') {
                        colorPickerArgs.value = 'transparent';
                    }
                    if (_this.isMultiSelection) {
                        for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                            _this.multiSelectedItems[i].style.cssText += "background-color: " + colorPickerArgs.value + ";";
                        }
                    }
                    else {
                        _this.selectedItem.style.cssText += "background-color: " + colorPickerArgs.value + ";";
                    }
                    _this.parent.trigger(events.actionComplete, { requestType: 'TableBackgroundColor' });
                }
            });
        }
        else if (colorPickerArgs.item.subCommand === 'BorderColor') {
            var actionBeginArgs = { cancel: false, requestType: 'BorderColor' };
            this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    if (colorPickerArgs.value === '') {
                        colorPickerArgs.value = 'transparent';
                    }
                    if (_this.isMultiSelection) {
                        for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                            _this.multiSelectedItems[i].style.cssText += "border-color: " + colorPickerArgs.value + ";";
                        }
                    }
                    else {
                        _this.selectedItem.style.cssText += "border-color: " + colorPickerArgs.value + ";";
                    }
                    _this.applyBorderStyleAndWidth(true);
                    _this.parent.trigger(events.actionComplete, { requestType: 'BorderColor' });
                }
            });
        }
    };
    Table.prototype.getBorderWidthValue = function () {
        if (this.tableBorderWidth && this.tableBorderWidth.value) {
            return this.tableBorderWidth.value;
        }
        else {
            return null;
        }
    };
    Table.prototype.applyBorderStyleAndWidth = function (iscolorPickerChange) {
        var borderWidthValue = this.getBorderWidthValue();
        if (this.isMultiSelection) {
            for (var i = 0; i < this.multiSelectedItems.length; i++) {
                var currentItem = this.multiSelectedItems[i];
                if (!currentItem.style.borderStyle && !this.selectedItem.style.borderStyle) {
                    currentItem.style.cssText += 'border-style: double;';
                }
                else if (this.selectedItem.style.borderStyle && currentItem.style.borderStyle !== this.selectedItem.style.borderStyle) {
                    currentItem.style.cssText += "border-style: " + this.selectedItem.style.borderStyle + ";";
                }
                else if (currentItem.style.borderStyle && !this.selectedItem.style.borderStyle) {
                    currentItem.style.cssText += 'border-style: double;';
                }
                if (!currentItem.style.borderWidth && !borderWidthValue) {
                    currentItem.style.cssText += 'border-width: 1px;';
                }
                else if (borderWidthValue && parseFloat(currentItem.style.borderWidth) !== borderWidthValue) {
                    currentItem.style.cssText += "border-width: " + borderWidthValue + "px;";
                }
                if (!iscolorPickerChange) {
                    if (this.selectedItem.style.borderColor && currentItem.style.borderColor !== this.selectedItem.style.borderColor) {
                        currentItem.style.cssText += "border-color: " + this.selectedItem.style.borderColor + ";";
                    }
                    else if (!this.selectedItem.style.borderColor && currentItem.style.borderColor) {
                        currentItem.style.borderColor = '';
                    }
                }
            }
        }
        else {
            if (!this.selectedItem.style.borderStyle) {
                this.selectedItem.style.cssText += 'border-style: double;';
            }
            if (!this.selectedItem.style.borderWidth) {
                this.selectedItem.style.cssText += 'border-width: 1px;';
            }
        }
    };
    /*
     * Applies the table properties from the dialog to the selected table.
     */
    Table.prototype.saveProperties = function () {
        if (this.savedSelectionForDialog) {
            this.savedSelectionForDialog.restore();
            this.savedSelectionForDialog = null;
        }
        this.parent.formatter.saveData();
        this.cleanupAlignmentButtons();
        this.editdlgObj.hide({ returnValue: true });
        this.isMultiSelection = false;
        this.multiSelectedItems = {};
        this.multipleSelectionCellStyles.length = 0;
    };
    Table.prototype.applyHorizontalAlign = function (align, btn) {
        if (this.isMultiSelection) {
            for (var i = 0; i < this.multiSelectedItems.length; i++) {
                this.multiSelectedItems[i].style.textAlign = align;
            }
        }
        else {
            this.selectedItem.style.textAlign = align;
        }
        this.removeActiveClass(btn.parentElement);
        btn.classList.add('e-active');
    };
    Table.prototype.applyVerticalAlign = function (align, btn) {
        if (this.isMultiSelection) {
            for (var i = 0; i < this.multiSelectedItems.length; i++) {
                this.multiSelectedItems[i].style.verticalAlign = align;
            }
        }
        else {
            this.selectedItem.style.verticalAlign = align;
        }
        this.removeActiveClass(btn.parentElement);
        btn.classList.add('e-active');
    };
    Table.prototype.removeActiveClass = function (parentElement) {
        for (var i = 0; i < parentElement.childNodes.length; i++) {
            if (parentElement.childNodes[i].nodeName === 'BUTTON') {
                parentElement.childNodes[i].classList.remove('e-active');
            }
        }
    };
    Table.prototype.addActiveClass = function (align, btn) {
        if (this.selectedItem.style.textAlign === align) {
            btn.classList.add('e-active');
        }
        else if (this.selectedItem.style.verticalAlign === align) {
            btn.classList.add('e-active');
        }
    };
    Table.prototype.createButtons = function () {
        var button = new Button({
            isToggle: true,
            cssClass: this.parent.getCssClass(),
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        // track for later cleanup
        this.createdButtons.push(button);
        return button;
    };
    Table.prototype.createButtonWithActiveClass = function (btn, alignState, alignPosition) {
        var _this = this;
        var button = this.createButtons();
        if (this.isMultiSelection && this.isMultiSelectionPropertySame(alignState, alignPosition)) {
            this.addActiveClass(alignPosition, btn);
        }
        else if (!this.isMultiSelection) {
            this.addActiveClass(alignPosition, btn);
        }
        button.appendTo(btn);
        var handler = alignState === 'textAlign'
            ? function () { return _this.applyHorizontalAlign(alignPosition, btn); }
            : function () { return _this.applyVerticalAlign(alignPosition, btn); };
        // Add event listener
        btn.addEventListener('click', handler);
        // Store reference for cleanup
        this.alignmentButtonHandlers.push({
            element: btn,
            eventType: 'click',
            handler: handler
        });
    };
    /*
      Removes event listeners from alignment buttons to prevent memory leaks
     This method properly cleans up by removing stored event listener references
     */
    Table.prototype.cleanupAlignmentButtons = function () {
        if (this.alignmentButtonHandlers && this.alignmentButtonHandlers.length > 0) {
            for (var i = 0; i < this.alignmentButtonHandlers.length; i++) {
                var handlerInfo = this.alignmentButtonHandlers[i];
                if (handlerInfo && handlerInfo.element && handlerInfo.handler) {
                    // Properly remove the event listener using the stored reference
                    handlerInfo.element.removeEventListener(handlerInfo.eventType, handlerInfo.handler);
                }
            }
            // Clear the array
            this.alignmentButtonHandlers = [];
        }
    };
    Table.prototype.addEventHandler = function (tableWrap) {
        var selectorPropMaps = [
            { selector: '.e-rte-tableCell-horizontal-align-left', prop: 'textAlign', align: 'left' },
            { selector: '.e-rte-tableCell-horizontal-align-center', prop: 'textAlign', align: 'center' },
            { selector: '.e-rte-tableCell-horizontal-align-right', prop: 'textAlign', align: 'right' },
            { selector: '.e-rte-tableCell-horizontal-align-full', prop: 'textAlign', align: 'justify' },
            { selector: '.e-rte-tableCell-vertical-align-top', prop: 'verticalAlign', align: 'top' },
            { selector: '.e-rte-tableCell-vertical-align-middle', prop: 'verticalAlign', align: 'middle' },
            { selector: '.e-rte-tableCell-vertical-align-bottom', prop: 'verticalAlign', align: 'bottom' }
        ];
        for (var _i = 0, selectorPropMaps_1 = selectorPropMaps; _i < selectorPropMaps_1.length; _i++) {
            var m = selectorPropMaps_1[_i];
            var btn = tableWrap.querySelector(m.selector);
            if (btn) {
                this.createButtonWithActiveClass(btn, m.prop, m.align);
            }
        }
    };
    Table.prototype.ConvertTableWidthHeightPxToPercent = function (value, heightOrWidth) {
        var parentElement = this.selectedItem.closest('table');
        return (value / (heightOrWidth === 'width' ? parentElement.getBoundingClientRect().width : parentElement.getBoundingClientRect().height)) * 100;
    };
    Table.prototype.ConvertTableWidthHeightPercentToPx = function (value, heightOrWidth) {
        var parentElement = this.selectedItem.closest('table');
        return (value / 100) * (heightOrWidth === 'width' ? parentElement.getBoundingClientRect().width : parentElement.getBoundingClientRect().height);
    };
    Table.prototype.uniformColumnWidth = function (colGroupElement) {
        if (this.isMultiSelection) {
            var colElement = void 0;
            var isSameWidth = true;
            var colwidth = '';
            for (var i = 0; i < this.multiSelectedItems.length; i++) {
                var index = this.multiSelectedItems[i].cellIndex;
                colElement = colGroupElement.querySelectorAll('col')[index];
                if (i === 0) {
                    colwidth = colElement.style.width;
                }
                else {
                    if (colwidth !== colElement.style.width) {
                        isSameWidth = false;
                        break;
                    }
                    else {
                        isSameWidth = true;
                    }
                }
            }
            return isSameWidth;
        }
        return false;
    };
    Table.prototype.extractUnitFromValue = function (value) {
        if (value.endsWith('px')) {
            value = 'px';
        }
        else if (value.endsWith('%')) {
            value = '%';
        }
        else if (value === 'auto') {
            value = 'auto';
        }
        else {
            value = 'px';
        }
        return value;
    };
    Table.prototype.valuecontent = function (value) {
        return '<span class="e-rte-dropdown-btn-content-text">' + value + '</span>';
    };
    Table.prototype.dropDownWidthButtonContent = function () {
        var colGroupElement = this.selectedItem.closest('table').querySelector('colgroup');
        if (!colGroupElement) {
            insertColGroupWithSizes(this.selectedItem.closest('table'));
            colGroupElement = this.selectedItem.closest('table').querySelector('colgroup');
            this.storeInitialColWidths();
        }
        if (this.isMultiSelection) {
            var isSameWidth = this.uniformColumnWidth(colGroupElement);
            var value = void 0;
            var index = this.selectedItem.cellIndex;
            var colElement = colGroupElement.querySelectorAll('col')[index];
            if (isSameWidth) {
                value = this.extractUnitFromValue(colElement.style.width);
                this.widthValue = value;
                return this.valuecontent(value);
            }
            else {
                this.widthValue = 'px';
                return this.valuecontent('px');
            }
        }
        else {
            var index = this.selectedItem.cellIndex;
            var colElement = colGroupElement.querySelectorAll('col')[index];
            var value = this.extractUnitFromValue(colElement.style.width);
            this.widthValue = value;
            return this.valuecontent(value);
        }
    };
    Table.prototype.dropDownHeightButtonContent = function () {
        if (this.isMultiSelection) {
            var isSameHeight = true;
            var height = '';
            for (var i = 0; i < this.multiSelectedItems.length; i++) {
                if (i === 0) {
                    height = this.multiSelectedItems[0].style.height;
                }
                else {
                    if (height !== this.multiSelectedItems[i].style.height) {
                        isSameHeight = false;
                        break;
                    }
                    else {
                        isSameHeight = true;
                    }
                }
            }
            if (isSameHeight) {
                height = this.extractUnitFromValue(height);
                this.heightValue = height;
                return this.valuecontent(height);
            }
            else {
                this.heightValue = 'px';
                return this.valuecontent('px');
            }
        }
        else {
            var height = this.extractUnitFromValue(this.selectedItem.style.height);
            this.heightValue = height;
            return this.valuecontent(height);
        }
    };
    Table.prototype.updateMultiSelctionHeight = function () {
        var sameValue = true;
        for (var i = 0; i < this.multiSelectedItems.length; i++) {
            if (this.multiSelectedItems[i].style.height !== this.multiSelectedItems[0].style.height) {
                sameValue = false;
                break;
            }
        }
        if (sameValue) {
            var convertedValue = this.ConvertTableWidthHeightPercentToPx(this.tableHeightNum.value, 'height');
            this.tableHeightNum.value = convertedValue;
            for (var i = 0; i < this.multiSelectedItems.length; i++) {
                this.multiSelectedItems[i].style.cssText += "height: " + Math.round(convertedValue) + "px;";
            }
        }
        else {
            this.tableHeightNum.value = null;
        }
    };
    Table.prototype.dropDownSelctionForHeight = function (args, btnObj2) {
        if (args.item.text === 'Pixel' && this.heightValue !== 'px') {
            btnObj2.content = this.valuecontent('px');
            this.heightValue = 'px';
            if (!this.tableHeightNum.enabled) {
                this.tableHeightNum.enabled = true;
            }
            if (this.isMultiSelection) {
                this.updateMultiSelctionHeight();
            }
            else {
                this.tableHeightNum.value = this.ConvertTableWidthHeightPercentToPx(this.tableHeightNum.value, 'height');
                this.selectedItem.style.cssText += "height: " + Math.round(this.tableHeightNum.value) + "px;";
            }
        }
        else if (args.item.text === 'Percent' && this.heightValue !== '%') {
            btnObj2.content = this.valuecontent('%');
            this.heightValue = '%';
            if (!this.tableHeightNum.enabled) {
                this.tableHeightNum.enabled = true;
            }
            if (this.isMultiSelection) {
                this.updateMultiSelctionHeight();
            }
            else {
                this.tableHeightNum.value = this.ConvertTableWidthHeightPxToPercent(this.tableHeightNum.value, 'height');
                this.selectedItem.style.cssText += "height: " + Math.round(this.tableHeightNum.value) + "%;";
            }
        }
        else if (args.item.text === 'Auto' && this.heightValue !== 'auto') {
            btnObj2.content = this.valuecontent('Auto');
            this.heightValue = 'auto';
            this.tableHeightNum.enabled = false;
            this.tableHeightNum.value = null;
            if (this.isMultiSelection) {
                for (var i = 0; i < this.multiSelectedItems.length; i++) {
                    this.multiSelectedItems[i].style.height = 'auto';
                }
            }
            else {
                this.selectedItem.style.height = 'auto';
            }
        }
        this.updateTitleForDropDownButton(btnObj2.element, this.heightValue);
    };
    Table.prototype.updateMultiSelectionWidth = function () {
        var sameValue = true;
        for (var i = 0; i < this.multiSelectedItems.length; i++) {
            if (this.multiSelectedItems[i].style.width !== this.multiSelectedItems[0].style.width) {
                sameValue = false;
                break;
            }
        }
        if (sameValue) {
            var convertedValue = this.ConvertTableWidthHeightPercentToPx(this.tableWidthNum.value, 'width');
            this.tableWidthNum.value = convertedValue;
        }
        else {
            this.tableWidthNum.value = null;
        }
    };
    Table.prototype.dropDownSelctionForWidth = function (args, btnObj1) {
        if (args.item.text === 'Pixel' && this.widthValue !== 'px') {
            btnObj1.content = this.valuecontent('px');
            this.widthValue = 'px';
            if (!this.tableWidthNum.enabled) {
                this.tableWidthNum.enabled = true;
            }
            if (this.isMultiSelection) {
                this.updateMultiSelectionWidth();
            }
            else {
                this.tableWidthNum.value = this.ConvertTableWidthHeightPercentToPx(this.tableWidthNum.value, 'width');
            }
        }
        else if (args.item.text === 'Percent' && this.widthValue !== '%') {
            btnObj1.content = this.valuecontent('%');
            this.widthValue = '%';
            if (!this.tableWidthNum.enabled) {
                this.tableWidthNum.enabled = true;
            }
            if (this.isMultiSelection) {
                this.updateMultiSelectionWidth();
            }
            else {
                this.tableWidthNum.value = this.ConvertTableWidthHeightPxToPercent(this.tableWidthNum.value, 'width');
            }
        }
        else if (args.item.text === 'Auto' && this.widthValue !== 'auto') {
            btnObj1.content = this.valuecontent('Auto');
            this.widthValue = 'auto';
            this.tableWidthNum.enabled = false;
            this.tableWidthNum.value = null;
            var colGroupElement = this.selectedItem.closest('table').querySelector('colgroup');
            if (!colGroupElement) {
                insertColGroupWithSizes(this.selectedItem.closest('table'));
                colGroupElement = this.selectedItem.closest('table').querySelector('colgroup');
                this.storeInitialColWidths();
            }
            if (this.isMultiSelection) {
                for (var i = 0; i < this.multiSelectedItems.length; i++) {
                    var index = this.multiSelectedItems[i].cellIndex;
                    var colElement = colGroupElement.querySelectorAll('col')[index];
                    if (colElement) {
                        colElement.style.width = 'auto';
                    }
                }
            }
            else {
                var index = this.selectedItem.cellIndex;
                var colElement = this.selectedItem.closest('table').querySelectorAll('col')[index];
                if (colElement) {
                    colElement.style.width = 'auto';
                }
            }
        }
        this.updateTitleForDropDownButton(btnObj1.element, this.widthValue);
    };
    Table.prototype.addActiveClassToDropdownItem = function (args, isWidthOrHeight) {
        var currentWidthHeightUnit = isWidthOrHeight === 'width' ? this.widthValue : this.heightValue;
        var activeItemText = '';
        if (currentWidthHeightUnit === 'px') {
            activeItemText = 'Pixel';
        }
        else if (currentWidthHeightUnit === '%') {
            activeItemText = 'Percent';
        }
        else if (currentWidthHeightUnit === 'auto') {
            activeItemText = 'Auto';
        }
        if (args.item.text === activeItemText) {
            args.element.classList.add('e-active'); // Adds class before item is shown
        }
    };
    Table.prototype.updateTitleForDropDownButton = function (button, value) {
        if (value === 'px') {
            button.title = 'Pixel';
        }
        else if (value === '%') {
            button.title = 'Percent';
        }
        else if (value === 'auto') {
            button.title = 'Auto';
        }
    };
    Table.prototype.dropDownButtonsRendering = function (tableWrap) {
        var _this = this;
        var items = [
            { text: 'Pixel' },
            { text: 'Percent' },
            { text: 'Auto' }
        ];
        var btnObj1 = new DropDownButton({
            items: items,
            content: this.dropDownWidthButtonContent(),
            enableRtl: this.parent.enableRtl,
            cssClass: classes.CLS_EDIT_CELL_DROPDOWN + ' ' + classes.CLS_RTE_ELEMENTS + this.parent.getCssClass(true),
            beforeItemRender: function (args) {
                _this.addActiveClassToDropdownItem(args, 'width');
            },
            select: function (args) {
                _this.dropDownSelctionForWidth(args, btnObj1);
            }
        });
        var widthDropDownbtn = tableWrap.querySelector('#widthValueBtn');
        this.updateTitleForDropDownButton(widthDropDownbtn, this.widthValue);
        btnObj1.appendTo(widthDropDownbtn);
        this.createdDropdownButtons.push(btnObj1);
        var btnObj2 = new DropDownButton({
            items: items,
            content: this.dropDownHeightButtonContent(),
            enableRtl: this.parent.enableRtl,
            cssClass: classes.CLS_EDIT_CELL_DROPDOWN + ' ' + classes.CLS_RTE_ELEMENTS + this.parent.getCssClass(true),
            beforeItemRender: function (args) {
                _this.addActiveClassToDropdownItem(args, 'height');
            },
            select: function (args) {
                _this.dropDownSelctionForHeight(args, btnObj2);
            }
        });
        var heightDropDownbtn = tableWrap.querySelector('#heightValueBtn');
        this.updateTitleForDropDownButton(heightDropDownbtn, this.heightValue);
        btnObj2.appendTo(heightDropDownbtn);
        this.createdDropdownButtons.push(btnObj2);
    };
    Table.prototype.extractNumericValue = function (value) {
        if (value.endsWith('px')) {
            return parseFloat(value.slice(0, -2));
        }
        else if (value.endsWith('%')) {
            return parseFloat(value.slice(0, -1));
        }
        else if (value === 'auto') {
            return null;
        }
        return null;
    };
    Table.prototype.formatWidthValue = function () {
        var colElement = this.selectedItem.closest('table').querySelectorAll('col')[this.selectedItem.cellIndex];
        var value = colElement ? colElement.style.width : '';
        return this.extractNumericValue(value);
    };
    Table.prototype.formatHeightValue = function () {
        var value = this.selectedItem.style.height;
        return this.extractNumericValue(value);
    };
    Table.prototype.renderCellPaddingNumericTextBox = function (padVal, tableWrap) {
        var _this = this;
        this.tableCellPadding = new NumericTextBox({
            format: '### px',
            min: 0,
            value: (this.isMultiSelection && !this.isMultiSelectionPropertySame('padding', padVal)) ? null : padVal !== '' ? parseInt(padVal, 10) : 0,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass(),
            change: function (args) {
                if (_this.selectedItem.nodeName === 'TABLE') {
                    var tdElm = _this.selectedItem.querySelectorAll('td,th');
                    for (var i = 0; i < tdElm.length; i++) {
                        var padVal_1 = '';
                        if (tdElm[i].style.padding === '') {
                            padVal_1 = (tdElm[i].getAttribute('style') ? tdElm[i].getAttribute('style') : '') + ' padding:' +
                                args.value + 'px;';
                        }
                        else {
                            tdElm[i].style.padding = args.value + 'px';
                            padVal_1 = tdElm[i].getAttribute('style');
                        }
                        tdElm[i].style.cssText = padVal_1;
                    }
                }
                else if (_this.selectedItem.nodeName === 'TD' || _this.selectedItem.nodeName === 'TH') {
                    if (_this.isMultiSelection) {
                        for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                            var tdElm = _this.multiSelectedItems[i];
                            var padVal_2 = '';
                            if (tdElm.style.padding === '') {
                                padVal_2 = (tdElm.getAttribute('style') ? tdElm.getAttribute('style') : '') + ' padding:' +
                                    args.value + 'px;';
                            }
                            else {
                                tdElm.style.padding = args.value + 'px';
                                padVal_2 = tdElm.getAttribute('style');
                            }
                            tdElm.style.cssText = padVal_2;
                        }
                    }
                    else {
                        var padVal_3 = '';
                        var tdElm = _this.selectedItem;
                        if (tdElm.style.padding === '') {
                            padVal_3 = (tdElm.getAttribute('style') ? tdElm.getAttribute('style') : '') + ' padding:' +
                                args.value + 'px;';
                        }
                        else {
                            tdElm.style.padding = args.value + 'px';
                            padVal_3 = tdElm.getAttribute('style');
                        }
                        tdElm.style.cssText = padVal_3;
                    }
                }
            }
        });
        this.tableCellPadding.isStringTemplate = true;
        this.tableCellPadding.appendTo(tableWrap.querySelector('#' + this.parent.getID() + '_cellPadding'));
    };
    Table.prototype.renderHeightNumericTextBox = function (heightVal, tableWrap) {
        var _this = this;
        this.tableHeightNum = new NumericTextBox({
            format: '###',
            min: 0,
            value: (this.isMultiSelection && !this.isMultiSelectionPropertySame('height', heightVal)) ? null : this.formatHeightValue(),
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass(),
            enabled: this.selectedItem.nodeName !== 'TABLE' && this.heightValue === 'auto' ? false : true,
            width: '100',
            change: function (args) {
                if (_this.isMultiSelection) {
                    for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                        _this.multiSelectedItems[i].style.cssText += "height: " + Math.round(args.value) + _this.heightValue;
                    }
                }
                else {
                    _this.selectedItem.style.cssText += "height: " + Math.round(args.value) + _this.heightValue;
                }
            }
        });
        this.tableHeightNum.isStringTemplate = true;
        this.tableHeightNum.appendTo(tableWrap.querySelector('#' + this.parent.getID() + ('_tableCellHeight')));
    };
    Table.prototype.renderWidthNumericTextBox = function (widthVal, tableWrap, isTable) {
        var _this = this;
        this.tableWidthNum = new NumericTextBox({
            format: this.selectedItem.nodeName !== 'TABLE' ? '###' : '### px',
            min: 0,
            value: this.selectedItem.nodeName === 'TABLE' ? widthVal : (this.isMultiSelection && !this.isMultiSelectionPropertySame('width', widthVal)) ? null : this.formatWidthValue(),
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass(),
            enabled: this.selectedItem.nodeName !== 'TABLE' && this.widthValue === 'auto' ? false : true,
            width: this.selectedItem.nodeName !== 'TABLE' ? '100' : null,
            change: function (args) {
                if (_this.selectedItem.nodeName === 'TABLE') {
                    _this.selectedItem.style.cssText += "width: " + Math.round(args.value) + "px;";
                }
                else if (_this.selectedItem.nodeName === 'TD' || _this.selectedItem.nodeName === 'TH') {
                    var colGroupElement = _this.selectedItem.closest('table').querySelector('colgroup');
                    if (!colGroupElement) {
                        insertColGroupWithSizes(_this.selectedItem.closest('table'));
                        colGroupElement = _this.selectedItem.closest('table').querySelector('colgroup');
                        _this.storeInitialColWidths();
                    }
                    if (_this.isMultiSelection) {
                        for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                            var index = _this.multiSelectedItems[i].cellIndex;
                            var colElement = colGroupElement.querySelectorAll('col')[index];
                            if (colElement) {
                                if (_this.widthValue === 'px') {
                                    var tbWidth = _this.selectedItem.closest('table').getClientRects()[0].width;
                                    colElement.style.width = convertPixelToPercentage(Math.round(args.value), Math.round(tbWidth)).toFixed(4) + '%';
                                }
                                else if (_this.widthValue === '%') {
                                    colElement.style.width = Math.round(args.value) + '%';
                                }
                            }
                        }
                    }
                    else {
                        var index = _this.selectedItem.cellIndex;
                        var colElement = _this.selectedItem.closest('table').querySelectorAll('col')[index];
                        if (colElement) {
                            if (_this.widthValue === 'px') {
                                var tbWidth = _this.selectedItem.closest('table').getClientRects()[0].width;
                                colElement.style.width = convertPixelToPercentage(Math.round(args.value), Math.round(tbWidth)).toFixed(4) + '%';
                            }
                            else if (_this.widthValue === '%') {
                                colElement.style.width = Math.round(args.value) + '%';
                            }
                        }
                    }
                }
            }
        });
        this.tableWidthNum.isStringTemplate = true;
        this.tableWidthNum.appendTo(tableWrap.querySelector('#' + this.parent.getID() + (isTable ? '_tableWidth' : '_tableCellWidth')));
    };
    /*
     * Creates content for the table dialog with width, padding, and spacing options.
     */
    Table.prototype.tableDlgContent = function (e) {
        var _this = this;
        var selectNode = e.selectParent[0];
        var tableWidth = this.l10n.getConstant('tableWidth');
        var cellPadding = this.l10n.getConstant('cellpadding');
        var cellSpacing = this.l10n.getConstant('cellspacing');
        var borderWidth = this.l10n.getConstant('borderWidth');
        var borderColor = this.l10n.getConstant('borderColor');
        var borderLabel = this.l10n.getConstant('borderLabel');
        var tableHeight = this.l10n.getConstant('tableHeight');
        var tableHorizontalAlign = this.l10n.getConstant('tableHorizontalAlign');
        var tableVerticalAlign = this.l10n.getConstant('tableVerticalAlign');
        var backgroundColor = this.l10n.getConstant('tableBackgroundColor');
        var justifyLeft = this.l10n.getConstant('justifyLeft');
        var justifyCenter = this.l10n.getConstant('justifyCenter');
        var justifyRight = this.l10n.getConstant('justifyRight');
        var justifyFull = this.l10n.getConstant('justifyFull');
        var alignMiddle = this.l10n.getConstant('tablealignmiddle');
        var alignTop = this.l10n.getConstant('tablealigntop');
        var alignBottom = this.l10n.getConstant('tablealignbottom');
        var borderStyle = this.l10n.getConstant('borderStyle');
        var borderWidthtooltip = this.l10n.getConstant('borderWidthTooltip');
        var borderColortooltip = this.l10n.getConstant('borderColorTooltip');
        var borderStyletooltip = this.l10n.getConstant('borderStyleTooltip');
        var tableWrap = this.parent.createElement('div', { className: 'e-table-sizewrap' + this.parent.getCssClass(true) });
        var widthVal = this.selectedItem.getClientRects()[0].width;
        var heightVal = this.selectedItem.getClientRects()[0].height;
        var padVal = this.selectedItem.style.padding;
        var brdSpcVal = this.selectedItem.style.borderSpacing;
        var borderWidthVal = this.selectedItem.style.borderWidth;
        var isTable = this.selectedItem.nodeName === 'TABLE';
        var content = '';
        if (this.selectedItem.nodeName === 'TABLE') {
            content = '<div class="e-rte-edit-table-content' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-cell' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-tablewidth' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-widthlabel' + this.parent.getCssClass(true) + '"><label>' + tableWidth + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + tableWidth + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_tableWidth" class="e-table-width' + this.parent.getCssClass(true) + '" ' + ' /></div></div>'
                + '<div class="e-rte-edit-table-bgcolor' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-bgcolorlabel' + this.parent.getCssClass(true) + '"><label>' + backgroundColor + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + backgroundColor + '"><input type="color" data-role ="none" id="' + this.parent.getID() + '_backgroundColor" role="combobox" aria-label="Background Color Picker" data-testid="rte-bg-color-picker" class="e-background-color e-rte-bg-color-picker e-colorpicker' + this.parent.getCssClass(true) + '" /></div></div></div>'
                + '<div class="e-rte-edit-table-cell e-rte-edit-table-element' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-cellpadding' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-cellpaddinglabel' + this.parent.getCssClass(true) + '"><label>' + cellPadding + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + cellPadding + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_cellPadding" class="e-cell-padding' + this.parent.getCssClass(true) + '" /></div></div><div class="e-rte-edit-table-cellspacing' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-cellspacinglabel' + this.parent.getCssClass(true) + '"><label>' + cellSpacing + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + cellSpacing + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_cellSpacing" class="e-cell-spacing' + this.parent.getCssClass(true) + '" /></div></div></div>'
                + '<div class="e-rte-edit-table-border e-rte-edit-table-element' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderlabel' + this.parent.getCssClass(true) + '"><label>' + borderLabel + '</label></div>'
                + '<div class="e-rte-edit-table-borderfields e-rte-edit-table-element' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderwidth' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderwidthlabel' + this.parent.getCssClass(true) + '"><label>' + borderWidth + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + borderWidthtooltip + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_borderWidth" role="spinbutton" aria-label="Border Width in pixels" min="0" max="10" step="0.5" value="1" data-testid="rte-border-width-numeric" class="e-border-width e-rte-border-width-numeric e-numerictextbox' + this.parent.getCssClass(true) + '" /></div></div>'
                + '<div class="e-rte-edit-table-borderstyle' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderstylelabel' + this.parent.getCssClass(true) + '"><label>' + borderStyle + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + borderStyletooltip + '"><button role="group" aria-label="Table Styles Configuration" data-testid="rte-styles-section" class="e-border-style e-rte-table-styles" tabindex="0" id="' + this.parent.getID() + '_borderStyle"></button></div></div>'
                + '<div class="e-rte-edit-table-bordercolor' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderwidthlabel' + this.parent.getCssClass(true) + '"><label>' + borderColor + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + borderColortooltip + '"><input type="color" data-role ="none" id="' + this.parent.getID() + '_borderColor" role="combobox" aria-label="Border Color Picker" data-testid="rte-border-color-picker" class="e-border-color e-rte-border-color-picker e-colorpicker' + this.parent.getCssClass(true) + '" /></div></div></div></div>'
                + '</div>';
        }
        else {
            content = '<div class="e-rte-edit-tablecell-dialog' + this.parent.getCssClass(true) + '">'
                + '<div class="e-rte-edit-tablecell-row' + this.parent.getCssClass(true) + '">'
                + '<div class="e-rte-edit-table-tablewidth' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-widthlabel' + this.parent.getCssClass(true) + '"><label>' + tableWidth + '</label></div><div class="e-rte-edit-table-field e-rte-edit-table-field-flex' + this.parent.getCssClass(true) + '" title="' + tableWidth + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_tableCellWidth" class="e-table-width' + this.parent.getCssClass(true) + '" ' + ' /><div class="e-rte-edit-table-widthValue"><button id="widthValueBtn"></button></div></div></div>'
                + '<div class="e-rte-edit-table-tableheight' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-heightlabel' + this.parent.getCssClass(true) + '"><label>' + tableHeight + '</label></div><div class="e-rte-edit-table-field e-rte-edit-table-field-flex' + this.parent.getCssClass(true) + '" title="' + tableHeight + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_tableCellHeight" class="e-table-height' + this.parent.getCssClass(true) + '" ' + ' /><div class="e-rte-edit-table-heightValue"><button id="heightValueBtn">px</button></div></div></div>'
                + '</div>'
                + '<div class="e-rte-edit-tablecell-row e-rte-edit-table-element' + this.parent.getCssClass(true) + '">'
                + '<div class="e-rte-edit-table-cellpadding' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-cellpaddinglabel' + this.parent.getCssClass(true) + '"><label>' + cellPadding + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + cellPadding + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_cellPadding" class="e-cell-padding' + this.parent.getCssClass(true) + '" /></div></div>'
                + '<div class="e-rte-edit-table-bgcolor' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-bgcolorlabel' + this.parent.getCssClass(true) + '"><label>' + backgroundColor + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + backgroundColor + '"><input type="color" data-role ="none" id="' + this.parent.getID() + '_cellbackgroundColor" role="combobox" aria-label="Background Color Picker" data-testid="rte-bg-color-picker" class="e-background-color e-rte-bg-color-picker e-colorpicker' + this.parent.getCssClass(true) + '" /></div></div>'
                + '</div>'
                + '<div class="e-rte-edit-tablecell-align-container">'
                + '<div class="e-rte-edit-tablecell-horizontal-align"><div class="e-rte-edit-tablecell-align-label"><label>' + tableHorizontalAlign + '</label></div><div class="e-btn-group e-rte-toolbar e-rte-edit-tablecell-btn-group"><button aria-label="justify-left" title="' + justifyLeft + '" id="' + this.parent.getID() + '_tableCellHorizontalAlignLeft" class="e-rte-tableCell-horizontal-align-left e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-justify-left"></span></button><button aria-label="justify-center" title="' + justifyCenter + '" id="' + this.parent.getID() + '_tableCellHorizontalAlignCenter" class="e-rte-tableCell-horizontal-align-center e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-justify-center"></span></button><button aria-label="justify-right" title="' + justifyRight + '" id="' + this.parent.getID() + '_tableCellHorizontalAlignRight" class="e-rte-tableCell-horizontal-align-right e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-justify-right"></span></button><button aria-label="justify-full" title="' + justifyFull + '" id="' + this.parent.getID() + '_tableCellHorizontalAlignFull" class="e-rte-tableCell-horizontal-align-full e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-justify-full"></span></button></div></div>'
                + '<div class="e-rte-edit-tablecell-vertical-align"><div class="e-rte-edit-tablecell-align-label"><label>' + tableVerticalAlign + '</label></div><div class="e-btn-group e-rte-edit-tablecell-btn-group"><button aria-label="align-top" title="' + alignTop + '" id="' + this.parent.getID() + '_tableCellVerticalAlignTop" class="e-rte-tableCell-vertical-align-top e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-align-top"></span></button><button aria-label="align-middle" title="' + alignMiddle + '" id="' + this.parent.getID() + '_tableCellVerticalAlignMiddle" class="e-rte-tableCell-vertical-align-middle e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-align-middle"></span></button><button aria-label="align-bottom" title="' + alignBottom + '" id="' + this.parent.getID() + '_tableCellVerticalAlignBottom" class="e-rte-tableCell-vertical-align-bottom e-icon-btn e-outline e-secondary e-rte-tablecell-align-btn"><span class="e-menu-icon e-icons e-align-bottom"></span></button></div></div>'
                + '</div>'
                + '<div class="e-rte-edit-table-border e-rte-edit-table-element' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderlabel' + this.parent.getCssClass(true) + '"><label>' + borderLabel + '</label></div>'
                + '<div class="e-rte-edit-table-borderfields e-rte-edit-table-element' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderwidth' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderwidthlabel' + this.parent.getCssClass(true) + '"><label>' + borderWidth + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + borderWidthtooltip + '"><input type="text" data-role ="none" id="' + this.parent.getID() + '_cellborderWidth" role="spinbutton" aria-label="Border Width in pixels" min="0" max="10" step="0.5" value="1" data-testid="rte-border-width-numeric" class="e-border-width e-rte-border-width-numeric e-numerictextbox' + this.parent.getCssClass(true) + '" /></div></div>'
                + '<div class="e-rte-edit-table-borderstyle' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderstylelabel' + this.parent.getCssClass(true) + '"><label>' + borderStyle + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + borderStyletooltip + '"><button role="group" aria-label="Table Styles Configuration" data-testid="rte-styles-section" class="e-border-style e-rte-table-styles" tabindex="0" id="' + this.parent.getID() + '_cellborderStyle"></button></div></div>'
                + '<div class="e-rte-edit-table-bordercolor' + this.parent.getCssClass(true) + '"><div class="e-rte-edit-table-borderwidthlabel' + this.parent.getCssClass(true) + '"><label>' + borderColor + '</label></div><div class="e-rte-edit-table-field' + this.parent.getCssClass(true) + '" title="' + borderColortooltip + '"><input type="color" data-role ="none" id="' + this.parent.getID() + '_cellborderColor" role="combobox" aria-label="Border Color Picker" data-testid="rte-border-color-picker" class="e-border-color e-rte-border-color-picker e-colorpicker' + this.parent.getCssClass(true) + '" /></div></div></div></div>'
                + '</div>';
        }
        var contentElem = parseHtml(content);
        tableWrap.appendChild(contentElem);
        var borderWidthContainer = tableWrap.querySelector('.e-border-width');
        var styleContainer = tableWrap.querySelector('.e-border-style');
        var borderColorContainer = tableWrap.querySelector('.e-border-color');
        var bgColorContainer = tableWrap.querySelector('.e-background-color');
        if (this.selectedItem.nodeName === 'TD' || this.selectedItem.nodeName === 'TH') {
            this.addEventHandler(tableWrap);
            this.dropDownButtonsRendering(tableWrap);
        }
        this.renderWidthNumericTextBox(widthVal, tableWrap, isTable);
        if (this.selectedItem.nodeName !== 'TABLE') {
            // height
            this.renderHeightNumericTextBox(heightVal, tableWrap);
        }
        this.renderCellPaddingNumericTextBox(padVal, tableWrap);
        if (this.selectedItem.tagName === 'TABLE') {
            this.tableCellSpacing = new NumericTextBox({
                format: '### px',
                min: 0,
                value: brdSpcVal !== '' && !isNOU(brdSpcVal) ? parseInt(brdSpcVal, 10) : 0,
                floatLabelType: 'Auto',
                enableRtl: this.parent.enableRtl, locale: this.parent.locale,
                cssClass: this.parent.getCssClass(),
                change: function (args) {
                    if (args.value > 0 && _this.selectedItem.style.borderCollapse !== 'separate') {
                        // Remove any existing border-collapse declaration from cssText
                        _this.selectedItem.style.cssText = _this.selectedItem.style.cssText.replace(/border-collapse\s*:\s*[^;]+;?/gi, '');
                        // Append the new border-collapse value
                        _this.selectedItem.style.cssText += 'border-collapse: separate;';
                    }
                    _this.selectedItem.style.cssText += "border-spacing: " + args.value + "px;";
                }
            });
            this.tableCellSpacing.isStringTemplate = true;
            this.tableCellSpacing.appendTo(tableWrap.querySelector('#' + this.parent.getID() + '_cellSpacing'));
        }
        this.tableBorderWidth = new NumericTextBox({
            format: '##.# px',
            min: 0,
            max: 10,
            step: 0.5,
            value: (this.isMultiSelection && !this.isMultiSelectionPropertySame('borderWidth', borderWidthVal)) ? 1 : borderWidthVal !== '' && !isNOU(borderWidthVal) ? parseInt(borderWidthVal, 10) : 1,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass(),
            change: function (args) {
                if (_this.isMultiSelection) {
                    for (var i = 0; i < _this.multiSelectedItems.length; i++) {
                        _this.multiSelectedItems[i].style.cssText += "border-width: " + args.value + "px;";
                    }
                }
                else {
                    _this.selectedItem.style.cssText += "border-width: " + args.value + "px;";
                }
                _this.applyBorderStyleAndWidth();
            }
        });
        var closestElement = this.selectedItem.tagName.toLowerCase();
        this.tableBorderWidth.isStringTemplate = true;
        this.tableBorderWidth.appendTo(tableWrap.querySelector('#' + this.parent.getID() + (isTable ? '_borderWidth' : '_cellborderWidth')));
        this.tableBorderColor.renderColorPickerInput({ container: borderColorContainer, containerType: 'quick', items: ['bordercolor'] }, closest(selectNode, closestElement));
        borderColorContainer.setAttribute('aria-label', 'Border Color Picker');
        this.tableBackgroundColor.renderColorPickerInput({ container: bgColorContainer, containerType: 'quick', items: ['tablebackgroundcolor'] }, closest(selectNode, closestElement));
        bgColorContainer.setAttribute('aria-label', 'Background Color Picker');
        this.tableBorderStyle.renderDropDowns({ container: styleContainer, containerType: 'quick', items: ['borderstyle'] }, closest(selectNode, closestElement));
        styleContainer.setAttribute('aria-label', 'Table Styles Configuration');
        styleContainer.setAttribute('tabindex', '0');
        return tableWrap;
    };
    Table.prototype.storeInitialColWidths = function () {
        var _this = this;
        this.colElementsInitialWidths.clear();
        if (this.selectedItem && (this.selectedItem.nodeName === 'TD' || this.selectedItem.nodeName === 'TH')) {
            var table = this.selectedItem.closest('table');
            var colgroup = table.querySelector('colgroup');
            if (colgroup) {
                var colElements = colgroup.querySelectorAll('col');
                colElements.forEach(function (col) {
                    _this.colElementsInitialWidths.set(col, col.style.width);
                });
            }
        }
    };
    /*
     * Checks if all multi-selected items have the same value for a specific CSS property
     * Supports numeric values (width, height, borderWidth, padding) and string values (verticalAlign, textAlign)
     *
     * @param propertyName - CSS property name (e.g., 'width', 'height', 'borderWidth', 'padding', 'verticalAlign', 'textAlign')
     * @param value - The value to check against (numeric or string)
     * @returns true if all items have the same value or if multi-selection is empty, false otherwise
     */
    Table.prototype.isMultiSelectionPropertySame = function (propertyName, value) {
        // Check if all multi-selected items have the same value
        for (var i = 0; i < this.multiSelectedItems.length; i++) {
            var element = this.multiSelectedItems[i];
            var elementValue = void 0;
            // Get the property value based on property name
            switch (propertyName) {
                case 'width': {
                    var colGroupElement = this.selectedItem.closest('table').querySelector('colgroup');
                    if (!colGroupElement) {
                        insertColGroupWithSizes(this.selectedItem.closest('table'));
                        colGroupElement = this.selectedItem.closest('table').querySelector('colgroup');
                        this.storeInitialColWidths();
                    }
                    var isSame = this.uniformColumnWidth(colGroupElement);
                    return isSame;
                }
                case 'height':
                    elementValue = element.getClientRects()[0].height;
                    break;
                case 'borderWidth':
                    elementValue = element.style.borderWidth;
                    break;
                case 'padding':
                    elementValue = element.style.padding;
                    break;
                case 'verticalAlign':
                    elementValue = element.style.verticalAlign;
                    break;
                case 'textAlign':
                    elementValue = element.style.textAlign;
                    break;
            }
            if (elementValue !== value) {
                return false;
            }
        }
        return true;
    };
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Table.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.tableCellSpacing && !this.tableCellSpacing.isDestroyed) {
            this.tableCellSpacing.destroy();
            this.tableCellSpacing = null;
        }
        if (this.tableCellPadding && !this.tableCellPadding.isDestroyed) {
            this.tableCellPadding.destroy();
            this.tableCellPadding = null;
        }
        if (this.tableWidthNum && !this.tableWidthNum.isDestroyed) {
            this.tableWidthNum.destroy();
            this.tableWidthNum = null;
        }
        if (this.tableHeightNum && !this.tableHeightNum.isDestroyed) {
            this.tableHeightNum.destroy();
            this.tableHeightNum = null;
        }
        if (this.rowTextBox && !this.rowTextBox.isDestroyed) {
            this.rowTextBox.destroy();
            this.rowTextBox = null;
        }
        if (this.columnTextBox && !this.columnTextBox.isDestroyed) {
            this.columnTextBox.destroy();
            this.columnTextBox = null;
        }
        if (this.createTableButton && !this.createTableButton.isDestroyed) {
            this.createTableButton.destroy();
            this.createTableButton = null;
        }
        if (this.tableBorderWidth && !this.tableBorderWidth.isDestroyed) {
            this.tableBorderWidth.destroy();
            this.tableBorderWidth = null;
        }
        if (this.tableBackgroundColor) {
            this.tableBackgroundColor.destroyColorPicker();
            this.tableBackgroundColor = null;
        }
        if (this.tableBorderColor) {
            this.tableBorderColor.destroyColorPicker();
            this.tableBorderColor = null;
        }
        if (this.tableBorderStyle) {
            this.tableBorderStyle.destroyDropDowns();
            this.tableBorderStyle = null;
        }
        if (this.createdButtons && this.createdButtons.length > 0) {
            for (var i = 0; i < this.createdButtons.length; i++) {
                var btn = this.createdButtons[i];
                if (btn && !btn.isDestroyed) {
                    btn.destroy();
                }
            }
            this.createdButtons.length = 0;
        }
        if (this.createdDropdownButtons && this.createdDropdownButtons.length > 0) {
            for (var i = 0; i < this.createdDropdownButtons.length; i++) {
                var dropBtn = this.createdDropdownButtons[i];
                if (dropBtn && !dropBtn.isDestroyed) {
                    dropBtn.destroy();
                }
            }
            this.createdDropdownButtons.length = 0;
        }
        this.cleanupAlignmentButtons();
        this.createTablePopupBoundFn = null;
        this.isDestroyed = true;
    };
    /*
     * For internal use only - Get the module name.
     */
    Table.prototype.getModuleName = function () {
        return 'table';
    };
    /*
     * Updates the table resize handles after a key is pressed.
     */
    Table.prototype.afterKeyDown = function (e) {
        if (this.tableObj) {
            var isUndoRedoAction = (e).action === 'undo' || (e).action === 'redo';
            if (!isUndoRedoAction) {
                this.tableObj.afterKeyDown();
            }
        }
    };
    /*
     * Handles keyboard events in the table popup dialog, specifically for Escape key.
     */
    Table.prototype.createTablePopupKeyDown = function (e) {
        if (e.key === 'Escape') {
            var popupRootElem = e.target.closest('.e-rte-table-popup');
            var popup = getComponent(popupRootElem, 'popup');
            var tableToolbarButton = popup.relateTo;
            popup.hide();
            tableToolbarButton.focus({ preventScroll: true });
        }
    };
    return Table;
}());
export { Table };
