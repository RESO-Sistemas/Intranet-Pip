import { ChildProperty, Property, Event, Component, getUniqueID, isNullOrUndefined, addClass, removeClass, prepend, formatUnit, getValue, attributes, Browser, append, L10n, select, compile, EventHandler, KeyboardEvents, closest, Animation, detach, Complex, Collection, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { Input } from '@syncfusion/ej2-inputs';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { showSpinner, hideSpinner, createSpinner, Popup } from '@syncfusion/ej2-popups';
import { Grid, VirtualScroll, Group, Edit, Sort, Resize } from '@syncfusion/ej2-grids';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DROPDOWNICON = 'e-input-group-icon e-multicolumn-list-icon e-icons';
const CONTENT = 'e-popup-content';
const ICONANIMATION = 'e-icon-anim';
const NODATA = 'e-nodata';
const DISABLED = 'e-disabled';
const INPUTFOCUS = 'e-input-focus';
const MULTICOLUMNLIST = 'e-multicolumn-list';
const HIDDENELEMENT = 'e-multicolumn-list-hidden';
const MULTICOLUMNGRID = 'e-multicolumn-grid';
class MultiColumnGrid {
    /**
     * Injecting required modules for component.
     *
     * @returns {void}
     * @private
     */
    InjectModules() {
        Grid.Inject(VirtualScroll, Group, Edit, Sort, Resize);
    }
}
/**
 * Defines the filter type.
 */
var FilterType;
(function (FilterType) {
    /**
     * Checks whether a value begins with the specified value.
     */
    FilterType["StartsWith"] = "StartsWith";
    /**
     * Checks whether a value ends with specified value.
     */
    FilterType["EndsWith"] = "EndsWith";
    /**
     * Checks whether a value contains with specified value.
     */
    FilterType["Contains"] = "Contains";
})(FilterType || (FilterType = {}));
/**
 * Specifies the sortOrder to sort the data source.
 */
var SortOrder;
(function (SortOrder) {
    /**
     * The datasource is not sorting. Default value is None.
     */
    SortOrder["None"] = "None";
    /**
     * The datasource is sorting with ascending order.
     */
    SortOrder["Ascending"] = "Ascending";
    /**
     * The data source is sorting with descending order.
     */
    SortOrder["Descending"] = "Descending";
})(SortOrder || (SortOrder = {}));
/**
 * Specifies the type of sorting to be applied for the columns.
 */
var SortType;
(function (SortType) {
    /**
     * Allow sorting only one column
     */
    SortType["OneColumn"] = "OneColumn";
    /**
     * Allow sorting multiple columns
     */
    SortType["MultipleColumns"] = "MultipleColumns";
})(SortType || (SortType = {}));
/**
 * Specifies the type of wrap mode to be applied for the grid cells.
 */
var WrapMode;
(function (WrapMode) {
    /**
     * Specifies that both header and content text wrapping are enabled.
     */
    WrapMode["Both"] = "Both";
    /**
     * Specifies that only content text wrapping is enabled.
     */
    WrapMode["Content"] = "Content";
    /**
     * Specifies that only header text wrapping is enabled.
     */
    WrapMode["Header"] = "Header";
})(WrapMode || (WrapMode = {}));
/**
 * The fields property maps the columns of the data table and binds the data to the component.
 */
class FieldSettings extends ChildProperty {
}
__decorate([
    Property()
], FieldSettings.prototype, "text", void 0);
__decorate([
    Property()
], FieldSettings.prototype, "value", void 0);
__decorate([
    Property()
], FieldSettings.prototype, "groupBy", void 0);
/**
 * Specifies the number of columns and its respective fields to be displayed in the dropdown popup.
 */
class Column extends ChildProperty {
}
__decorate([
    Property('')
], Column.prototype, "field", void 0);
__decorate([
    Property('')
], Column.prototype, "header", void 0);
__decorate([
    Property('')
], Column.prototype, "width", void 0);
__decorate([
    Property('')
], Column.prototype, "textAlign", void 0);
__decorate([
    Property(null)
], Column.prototype, "format", void 0);
__decorate([
    Property(false)
], Column.prototype, "displayAsCheckBox", void 0);
__decorate([
    Property(null)
], Column.prototype, "template", void 0);
__decorate([
    Property(null)
], Column.prototype, "headerTemplate", void 0);
__decorate([
    Property(null)
], Column.prototype, "customAttributes", void 0);
/**
 * Specifies the configuration of the columns in the popup content.
 */
class GridSettings extends ChildProperty {
}
__decorate([
    Property(false)
], GridSettings.prototype, "enableAltRow", void 0);
__decorate([
    Property(null)
], GridSettings.prototype, "rowHeight", void 0);
__decorate([
    Property('Default')
], GridSettings.prototype, "gridLines", void 0);
__decorate([
    Property(false)
], GridSettings.prototype, "allowTextWrap", void 0);
__decorate([
    Property(WrapMode.Both)
], GridSettings.prototype, "textWrapMode", void 0);
__decorate([
    Property(false)
], GridSettings.prototype, "allowResizing", void 0);
__decorate([
    Event()
], GridSettings.prototype, "resizing", void 0);
__decorate([
    Event()
], GridSettings.prototype, "resizeStart", void 0);
__decorate([
    Event()
], GridSettings.prototype, "resizeStop", void 0);
/**
 * The `MultiColumnComboBox` allows the user to search and select values from a list. It provides a list of options that can be selected using a filter input.
 * The selected value will be displayed in the input element.
 *
 * ```html
 *  <input type='text' id='multi-column'></input>
 * ```
 * ```typescript
 *  let multiColObj: MultiColumnComboBox = new MultiColumnComboBox();
 *  multiColObj.appendTo('#multi-column');
 * ```
 */
let MultiColumnComboBox = class MultiColumnComboBox extends Component {
    /**
     * *Constructor for creating the component
     *
     * @param {MultiColumnComboBoxModel} options - Specifies the MultiColumnComboBox model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.gridInject = new MultiColumnGrid();
        this.isShowSpinner = true;
        this.gridInject.InjectModules();
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.keyConfigs = {
            escape: 'escape',
            altUp: 'alt+uparrow',
            altDown: 'alt+downarrow',
            tab: 'tab',
            shiftTab: 'shift+tab',
            end: 'end',
            enter: 'enter',
            home: 'home',
            moveDown: 'downarrow',
            moveUp: 'uparrow'
        };
        this.matchedRowEle = this.matchedContent = this.exactMatchedContent = null;
        this.persistData();
        this.createLiveRegion();
    }
    createLiveRegion() {
        this.liveRegion = this.createElement('div', {
            attrs: {
                id: this.element.id + '_live',
                'aria-live': 'polite',
                'aria-atomic': 'true',
                role: 'status'
            },
            styles: `
                width: 0;
                height: 0;
                overflow: hidden;
            `
        });
        document.body.appendChild(this.liveRegion);
        this.liveRegion.textContent = '';
    }
    announcePosition(index, total) {
        if (!this.isPopupOpen) {
            return;
        }
        const message = `Item ${index + 1} of ${total}`;
        this.liveRegion.textContent = message;
    }
    getDirective() {
        return 'EJS-MULTICOLUMNCOMBOBOX';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'multicolumncombobox';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist(['value']);
    }
    persistData() {
        if (this.enablePersistence) {
            this.element.id += '_wrapper';
            const data = window.localStorage.getItem(this.getModuleName() + this.element.id);
            if (!(isNullOrUndefined(data) || (data === ''))) {
                this.setProperties(JSON.parse(data), true);
            }
        }
    }
    render() {
        this.renderInput();
        if ((!isNullOrUndefined(this.value) || !isNullOrUndefined(this.text) || !isNullOrUndefined(this.index)) && !isNullOrUndefined(this.dataSource)
            && this.dataSource instanceof DataManager) {
            this.isInitialValueRender = true;
        }
        if (this.gridData == null) {
            this.setGridData(this.dataSource);
        }
        this.renderGrid();
        this.popupDiv = this.createElement('div', { className: CONTENT });
        this.popupDiv.appendChild(this.gridEle);
        this.setHTMLAttributes();
        this.renderPopup();
        this.wireEvents();
    }
    setGridData(dataSource, query) {
        this.trigger('actionBegin', { cancel: false, query: query }, (args) => {
            if (!args.cancel) {
                if (dataSource instanceof DataManager) {
                    if (this.isShowSpinner) {
                        this.showHideSpinner(true);
                    }
                    dataSource.executeQuery(this.getQuery(query)).then((e) => {
                        this.gridData = e.result;
                        this.trigger('actionComplete', e, (e) => {
                            this.showHideSpinner(false);
                            if (!this.isMainDataUpdated) {
                                this.mainData = this.gridData;
                                this.remoteDataLength = this.gridData.length;
                                this.isMainDataUpdated = true;
                            }
                            if (this.isInitialValueRender) {
                                this.isInitialValueRender = false;
                                this.initValue(null, null, true);
                            }
                            if (this.popupDiv) {
                                this.updateGridDataSource();
                            }
                        });
                    }).catch((e) => {
                        this.trigger('actionFailure', e, null);
                    });
                }
                else {
                    const dataManager = new DataManager(dataSource);
                    const listItems = (this.getQuery(query)).executeLocal(dataManager);
                    this.gridData = listItems;
                    this.trigger('actionComplete', { result: listItems }, (e) => {
                        if (!this.isMainDataUpdated) {
                            if (this.isCustomFilter && (isNullOrUndefined(this.dataSource) || this.dataSource.length === 0)) {
                                this.setProperties({ dataSource: listItems }, true);
                            }
                            this.mainData = this.gridData;
                            this.remoteDataLength = this.gridData.length;
                            this.isMainDataUpdated = true;
                        }
                        if (this.popupDiv) {
                            this.updateGridDataSource();
                        }
                    });
                }
            }
        });
    }
    getQuery(query) {
        let filterQuery;
        if (!this.isCustomFilter && this.allowFiltering) {
            filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
            const filterType = this.typedString === '' ? 'contains' : this.filterType;
            if ((this.allowFiltering && this.typedString && this.typedString !== '')) {
                const fields = (this.fields.text) ? this.fields.text : '';
                filterQuery.where(fields, filterType, this.typedString, true, false);
            }
        }
        else {
            filterQuery = (this.customFilterQuery != null) ?
                this.customFilterQuery.clone() : query ? query.clone() : this.query ? this.query.clone() : new Query();
        }
        return filterQuery;
    }
    setHiddenValue() {
        if (isNullOrUndefined(this.value)) {
            this.hiddenElement.innerHTML = '';
            return;
        }
        const existingOption = this.hiddenElement.querySelector('option');
        if (!isNullOrUndefined(existingOption)) {
            existingOption.textContent = this.text;
            existingOption.setAttribute('value', this.value.toString());
        }
        else if (!isNullOrUndefined(this.hiddenElement)) {
            const newOption = document.createElement('option');
            newOption.text = this.text;
            newOption.setAttribute('value', this.value.toString());
            newOption.setAttribute('selected', '');
            this.hiddenElement.appendChild(newOption);
        }
    }
    renderGrid() {
        const gridColumns = this.getGridColumns();
        const sortOrder = this.sortOrder.toString().toLowerCase();
        this.gridObj = new Grid({
            dataSource: this.gridData,
            columns: gridColumns,
            allowSorting: this.allowSorting,
            enableStickyHeader: true,
            gridLines: this.gridSettings.gridLines,
            rowHeight: this.gridSettings.rowHeight,
            enableAltRow: this.gridSettings.enableAltRow,
            enableVirtualization: this.enableVirtualization,
            enableRtl: this.enableRtl,
            editSettings: { allowAdding: false },
            allowTextWrap: this.gridSettings.allowTextWrap,
            textWrapSettings: { wrapMode: this.gridSettings.textWrapMode },
            height: this.popupHeight,
            allowResizing: this.gridSettings.allowResizing,
            allowMultiSorting: this.sortType.toString().toLowerCase() === 'multiplecolumns' && this.allowSorting,
            rowTemplate: this.itemTemplate,
            beforeDataBound: () => {
                if (this.dataSource instanceof DataManager && this.isShowSpinner) {
                    this.showHideSpinner(true);
                    this.isShowSpinner = false;
                }
            },
            dataBound: () => { this.onDataBound(); },
            actionFailure: (args) => { this.onActionFailure(args); },
            actionComplete: this.handleActionComplete.bind(this),
            keyPressed: this.handleKeyPressed.bind(this),
            resizing: (args) => {
                if (this.gridSettings.resizing) {
                    this.gridSettings.resizing.call(this, args);
                }
            },
            resizeStart: (args) => {
                if (this.gridSettings.resizeStart) {
                    this.gridSettings.resizeStart.call(this, args);
                }
            },
            resizeStop: (args) => {
                if (this.gridSettings.resizeStop) {
                    this.gridSettings.resizeStop.call(this, args);
                }
            }
        });
        this.gridEle = this.createElement('div', { id: `${this.element.id}_${getUniqueID('grid')}`, className: MULTICOLUMNGRID });
        this.updateGroupByField();
        if (gridColumns.length > 0) {
            // Set first column as primary key to avoid PRIMARY KEY MISSING warning.
            this.gridObj.columns[0].isPrimaryKey = true;
        }
        if (sortOrder !== 'none') {
            this.gridObj.sortSettings = { columns: [{ field: this.fields.text, direction: sortOrder === 'ascending' ?
                            SortOrder.Ascending : SortOrder.Descending }] };
        }
        this.gridObj.appendTo(this.gridEle);
        if ((!isNullOrUndefined(this.value) || !isNullOrUndefined(this.text) || !isNullOrUndefined(this.index)) && !isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
            this.initValue(null, null, true);
        }
    }
    handleActionComplete(args) {
        if (args.requestType === 'sorting') {
            this.updateRowSelection(args);
        }
        if (Array.isArray(args.rows) && this.isDataFiltered) {
            const rows = args.rows;
            let rowHeight = 0;
            rows.forEach((row) => {
                const rowElement = this.gridObj.getRowElementByUID(row.uid);
                if (rowElement) {
                    rowHeight += rowElement.getBoundingClientRect().height;
                }
            });
            this.popupRowHeight = rowHeight || parseFloat(this.popupHeight);
            this.updateGridHeight(true, true);
        }
        this.popupObj.refreshPosition();
        this.gridObj.element.querySelector('.e-content').scrollTop = 0;
    }
    handleKeyPressed(args) {
        if (args.key === 'Enter') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args.cancel = true;
            if (this.isPopupOpen) {
                this.selectedGridRow(this.gridObj.getRows()[this.gridObj.selectedRowIndex], args, true);
                this.hidePopup(args);
                this.focusIn(args);
            }
        }
        if (this.fields.groupBy) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args.cancel = true;
            this.gridKeyActionHandler(args, true);
        }
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    isRowMatching(data, selectedValue, selectedText) {
        const flattenData = (data) => {
            const result = [];
            if (data && typeof data === 'object') {
                if (Array.isArray(data)) {
                    data.forEach((item) => result.push(...flattenData(item)));
                }
                else {
                    Object.keys(data).forEach((key) => result.push(...flattenData(data[`${key}`])));
                }
            }
            else if (data != null) {
                result.push(String(data));
            }
            return result;
        };
        const flattenedValues = flattenData(data);
        return (flattenedValues.indexOf(selectedValue) !== -1 && flattenedValues.indexOf(selectedText) !== -1);
    }
    updateRowSelection(args) {
        if (args) {
            const dataRows = args.rows;
            dataRows.forEach((row) => {
                this.selectDataRow(row.data, row.index);
            });
        }
    }
    selectDataRow(data, index) {
        const isPresent = this.isRowMatching(data, this.value ?
            this.value.toString() : '', this.text ? this.text.toString() : '');
        if (isPresent) {
            this.gridObj.selectRow(index);
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.index = index;
            this.isProtectedOnChange = prevOnChange;
            return;
        }
    }
    findIndex(arr, obj) {
        return arr.findIndex((item) => {
            // eslint-disable-next-line
            return Object.keys(obj).every((key) => item[key] === obj[key]);
        });
    }
    getGridColumns() {
        return this.columns.map(({ field, header, width, textAlign, format, displayAsCheckBox, template, headerTemplate, customAttributes }) => ({
            field,
            headerText: header,
            width,
            textAlign: textAlign.toString() === '' && this.enableRtl ? 'Right' : textAlign,
            format,
            displayAsCheckBox,
            template,
            headerTemplate,
            customAttributes,
            type: displayAsCheckBox && !format ? 'boolean' : undefined
        }));
    }
    updateGroupByField() {
        const groupByField = this.fields.groupBy;
        const isGroupByValid = groupByField !== '' && !isNullOrUndefined(groupByField);
        if (isGroupByValid) {
            if (this.sortType.toString().toLowerCase() !== 'multiplecolumns') {
                this.gridEle.classList.add('e-multicolumn-group');
            }
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.gridObj.allowGrouping = true;
            this.gridObj.groupSettings = {
                showDropArea: false,
                columns: [groupByField]
            };
            if (this.groupTemplate && isGroupByValid) {
                this.gridObj.groupSettings.captionTemplate = this.groupTemplate;
            }
            if (this.isVue) {
                this.gridObj.isVue = this.isVue;
            }
            this.isProtectedOnChange = prevOnChange;
        }
    }
    onDataBound() {
        if (this.isLocaleChanged) {
            this.isLocaleChanged = false;
            this.unWireEvents();
            this.wireEvents();
        }
        const dataCount = this.dataSource.length;
        const popupChild = this.popupDiv.querySelector('.' + MULTICOLUMNGRID);
        const hasNoDataClass = this.popupDiv.classList.contains(NODATA);
        if (dataCount <= 0 && popupChild) {
            this.l10nUpdate();
            this.popupDiv.removeChild(this.gridEle);
            addClass([this.popupDiv], [NODATA]);
        }
        else if (hasNoDataClass && dataCount >= 1) {
            removeClass([this.popupDiv], [NODATA]);
            const noRecordEle = this.popupDiv.querySelector('.e-no-records');
            if (noRecordEle) {
                this.popupDiv.removeChild(noRecordEle);
            }
        }
        else if (this.isCustomFilter && !hasNoDataClass && dataCount > 0) {
            this.popupDiv.appendChild(this.gridEle);
        }
        if (this.isInitialRender) {
            const gridContentRow = this.popupDiv.querySelector('.e-gridcontent tr');
            const rowHeight = !hasNoDataClass ? gridContentRow ?
                gridContentRow.getBoundingClientRect().height : 0 :
                this.popupDiv.getBoundingClientRect().height;
            this.popupRowHeight = rowHeight;
            this.popupObj.hide();
            this.popupEle.style.visibility = 'unset';
            this.isInitialRender = false;
        }
        const rowElements = this.gridObj.element.querySelectorAll('.e-row');
        if (this.isDataFiltered && rowElements.length > 0 && this.inputEle.value !== '') {
            const firstRowEle = rowElements[0];
            firstRowEle.classList.add('e-row-focus');
        }
        if (this.dataSource instanceof DataManager) {
            setTimeout(() => {
                this.showHideSpinner(false);
            });
        }
    }
    showHideSpinner(isShow) {
        if (isShow) {
            showSpinner(this.dropdownElement);
        }
        else {
            hideSpinner(this.dropdownElement);
        }
    }
    onActionFailure(args) {
        this.trigger('actionFailure', args);
        this.l10nUpdate(true);
        addClass([this.popupDiv], [NODATA]);
    }
    renderInput() {
        const allowedAttributes = ['aria-expanded', 'aria-readOnly', 'aria-disabled', 'autocomplete',
            'autocapitalize', 'spellcheck', 'tabindex'];
        const setAttributes = (element, attributes) => {
            for (const key in attributes) {
                // eslint-disable-next-line no-prototype-builtins
                if (attributes.hasOwnProperty(key) && allowedAttributes.indexOf(key) !== -1 && isNullOrUndefined(element.getAttribute(key))) {
                    element.setAttribute(key, attributes[key]);
                }
            }
        };
        if (this.element.tagName === 'INPUT') {
            this.inputEle = this.element;
            if (isNullOrUndefined(this.inputEle.getAttribute('role'))) {
                this.inputEle.setAttribute('role', 'combobox');
            }
            if (isNullOrUndefined(this.inputEle.getAttribute('type'))) {
                this.inputEle.setAttribute('type', 'text');
            }
            setAttributes(this.inputEle, {
                'aria-expanded': 'false',
                'aria-readOnly': this.readonly.toString(),
                'aria-disabled': this.disabled.toString(),
                autocomplete: 'off',
                autocapitalize: 'off',
                spellcheck: 'false',
                tabindex: '0'
            });
        }
        else {
            this.inputEle = this.createElement('input', { attrs: { role: 'textbox', type: 'text' } });
            this.element.parentElement.insertBefore(this.inputEle, this.element);
        }
        this.inputObj = Input.createInput({
            element: this.inputEle,
            buttons: [DROPDOWNICON],
            floatLabelType: this.floatLabelType,
            properties: {
                enabled: !this.disabled,
                readonly: this.readonly,
                placeholder: this.placeholder,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton,
                cssClass: this.cssClass
            }
        }, this.createElement);
        this.inputWrapper = this.inputObj.container;
        this.inputWrapper.classList.add(MULTICOLUMNLIST);
        this.inputWrapper.setAttribute('spellcheck', 'false');
        this.hiddenElement = this.createElement('select', {
            attrs: {
                'aria-hidden': 'true',
                'tabindex': '-1',
                'class': HIDDENELEMENT
            }
        });
        prepend([this.hiddenElement], this.inputWrapper);
        const name = this.inputEle.getAttribute('name') ? this.inputEle.getAttribute('name') : this.inputEle.getAttribute('id');
        this.hiddenElement.setAttribute('name', name);
        this.inputEle.removeAttribute('name');
        if (!this.hiddenElement.hasAttribute('aria-label')) {
            this.hiddenElement.setAttribute('aria-label', this.getModuleName());
        }
        if (this.element.tagName === this.getDirective()) {
            this.element.appendChild(this.inputWrapper);
        }
        this.setElementWidth(this.width);
        this.dropdownElement = this.inputWrapper.querySelector('.e-input-group-icon.e-multicolumn-list-icon.e-icons');
        createSpinner({
            target: this.dropdownElement
        });
    }
    setElementWidth(inputWidth) {
        if (isNullOrUndefined(inputWidth)) {
            return;
        }
        const ddElement = this.inputWrapper;
        if (typeof inputWidth === 'number') {
            ddElement.style.width = formatUnit(inputWidth);
        }
        else if (typeof inputWidth === 'string') {
            ddElement.style.width = inputWidth.match(/px|%|em/) ? inputWidth : formatUnit(inputWidth);
        }
    }
    setHTMLAttributes() {
        const htmlAttributes = this.htmlAttributes;
        const inputEle = this.inputEle;
        if (Object.keys(htmlAttributes).length) {
            for (const htmlAttr of Object.keys(htmlAttributes)) {
                switch (htmlAttr) {
                    case 'class':
                        this.inputWrapper.classList.add(htmlAttributes[htmlAttr]);
                        break;
                    case 'disabled':
                        this.setProperties({ enabled: false }, true);
                        this.setEnable();
                        break;
                    case 'readonly':
                        this.setProperties({ readonly: true }, true);
                        this.dataBind();
                        break;
                    case 'style': {
                        const styles = htmlAttributes[htmlAttr];
                        this.inputWrapper.style.cssText = '';
                        if (styles) {
                            styles.split(';').forEach((styleProperty) => {
                                const [property, value] = styleProperty.split(':').map((part) => part.trim());
                                if (property && value) {
                                    this.inputWrapper.style.setProperty(property, value);
                                }
                            });
                        }
                        break;
                    }
                    default: {
                        const defaultAttr = ['title', 'id', 'placeholder', 'role', 'autocomplete', 'autocapitalize', 'spellcheck', 'minlength', 'maxlength'];
                        const validateAttr = ['name', 'required'];
                        if (validateAttr.indexOf(htmlAttr) > -1 || htmlAttr.indexOf('data') === 0) {
                            this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes[`${htmlAttr}`]);
                        }
                        else if (defaultAttr.indexOf(htmlAttr) > -1) {
                            if (htmlAttr === 'placeholder') {
                                Input.setPlaceholder(htmlAttributes[htmlAttr], inputEle);
                            }
                            else {
                                inputEle.setAttribute(htmlAttr, htmlAttributes[htmlAttr]);
                            }
                        }
                        else {
                            inputEle.setAttribute(htmlAttr, htmlAttributes[htmlAttr]);
                        }
                        break;
                    }
                }
            }
        }
    }
    /* To set enable property */
    setEnable() {
        Input.setEnabled(!this.disabled, this.inputEle);
        if (!this.disabled) {
            removeClass([this.inputWrapper], DISABLED);
            this.setAriaDisabled('false');
        }
        else {
            if (this.isPopupOpen) {
                this.hidePopup();
            }
            addClass([this.inputWrapper], DISABLED);
            if (this.inputWrapper && this.inputWrapper.classList.contains(INPUTFOCUS)) {
                removeClass([this.inputWrapper], [INPUTFOCUS]);
            }
            this.setAriaDisabled('true');
        }
    }
    setAriaDisabled(value) {
        this.inputEle.setAttribute('aria-disabled', value);
        this.inputWrapper.setAttribute('aria-disabled', value);
    }
    updateFieldValue(fieldValue, dataObj) {
        const fieldVal = getValue(fieldValue, dataObj).toString();
        return fieldVal;
    }
    initValue(isRerender, isValue, isInitial) {
        const prevItemData = this.gridObj.getSelectedRecords()[0];
        const prevItemEle = this.gridObj.getSelectedRows()[0];
        let item;
        let currentValue;
        let currentText;
        let currentIndex;
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = this.value ? this.value.toString() : this.value;
        this.isProtectedOnChange = prevOnChange;
        const updateValues = (dataList) => {
            const result = this.updateCurrentValues(item, dataList);
            currentValue = result.currentValue;
            currentText = result.currentText;
            currentIndex = result.currentIndex;
        };
        if ((!isRerender && (!isNullOrUndefined(this.value) || !isNullOrUndefined(this.text))) || (isRerender && isValue !== undefined)) {
            const value = isRerender ? (isValue ? this.value : this.text) : (!isNullOrUndefined(this.value) ? this.value : this.text);
            if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof DataManager && this.mainData
                && this.isMainDataUpdated) {
                const dataLists = ((this.query && this.getQuery(this.query).isCountRequired) ||
                    !this.query) ? this.mainData : this.mainData.result ? this.mainData.result : this.mainData;
                const filteredData = dataLists.filter((item) => {
                    const fieldVal = item ? (this.updateFieldValue(isRerender ? (isValue ? this.fields.value :
                        this.fields.text) : !isNullOrUndefined(this.value) ? this.fields.value : this.fields.text, item)) : null;
                    return fieldVal === value;
                });
                if (filteredData.length > 0) {
                    item = filteredData[0];
                    updateValues(dataLists);
                    this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
                    this.gridObj.selectRow(this.index);
                }
            }
            else if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
                item = this.dataSource.filter((data) => {
                    const fieldVal = this.updateFieldValue(isRerender ? (isValue ? this.fields.value : this.fields.text) :
                        !isNullOrUndefined(this.value) ? this.fields.value : this.fields.text, data);
                    return fieldVal === value;
                })[0];
                updateValues(this.dataSource);
            }
        }
        else if (!isNullOrUndefined(this.index)) {
            if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof DataManager && this.mainData
                && this.isMainDataUpdated) {
                const dataLists = ((this.query && this.getQuery(this.query).isCountRequired) ||
                    !this.query) ? this.mainData : this.mainData.result ? this.mainData.result : this.mainData;
                item = dataLists[this.index];
                updateValues(dataLists);
                this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
                this.gridObj.selectRow(this.index);
            }
            else if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
                if (!this.fields.groupBy) {
                    item = this.dataSource[this.index];
                    updateValues(this.dataSource);
                }
                else {
                    setTimeout(() => {
                        const rows = this.gridObj.getRows();
                        if (rows && rows.length > 0) {
                            const rowData = this.gridObj.getRowInfo(rows[this.index]).rowData;
                            const value = this.fields.value;
                            for (let i = 0; i < rows.length; i++) {
                                if (rowData && rowData[parseInt(value.toString(), 10)] ===
                                    this.dataSource[parseInt(i.toString(), 10)][parseInt(value.toString(), 10)]) {
                                    item = rowData;
                                    updateValues(this.dataSource);
                                    this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
                                    this.gridObj.selectRow(this.index);
                                    break;
                                }
                            }
                        }
                    });
                }
            }
        }
        if (!(this.dataSource instanceof DataManager)) {
            this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
        }
    }
    updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial) {
        const fieldValue = item ? this.updateFieldValue(this.fields.value, item) : null;
        const ChangeEventArgs = {
            value: item ? fieldValue : null,
            itemData: { text: currentText, value: currentValue },
            item: this.getDataByValue(this.value),
            previousItemData: prevItemData,
            previousItemElement: prevItemEle,
            itemElement: this.inputWrapper,
            event: null,
            isInteracted: !isRerender
        };
        this.updateValues(currentValue, currentText, currentIndex, ChangeEventArgs, isInitial);
    }
    updateCurrentValues(item, dataList) {
        if (!isNullOrUndefined(item)) {
            const fieldText = this.updateFieldValue(this.fields.text, item);
            const fieldValue = this.updateFieldValue(this.fields.value, item);
            Input.setValue(fieldText, this.inputEle, this.floatLabelType, this.showClearButton);
            return {
                currentValue: fieldValue,
                currentText: fieldText,
                currentIndex: dataList.indexOf(item)
            };
        }
        return {
            currentValue: null,
            currentText: null,
            currentIndex: null
        };
    }
    renderPopup() {
        this.popupEle = this.createElement('div', {
            id: this.element.id + '_options', className: MULTICOLUMNLIST + ' e-popup ' + (this.cssClass !== null ? this.cssClass : '')
        });
        attributes(this.popupEle, { 'aria-label': this.element.id, 'role': 'dialog' });
        document.body.appendChild(this.popupEle);
        this.createPopup(this.popupEle);
        prepend([this.popupDiv], this.popupEle);
        if (this.footerTemplate) {
            this.setFooterTemplate();
        }
        let popupHeight = this.getSize(false);
        this.popupEle.style.maxHeight = popupHeight;
        if (this.footerTemplate) {
            const height = Math.round(this.footer.getBoundingClientRect().height);
            popupHeight = formatUnit(parseInt(popupHeight, 10) - height + 'px');
        }
        this.popupDiv.style.maxHeight = popupHeight;
        this.updateGridHeight();
        this.popupEle.style.visibility = 'hidden';
        this.isInitialRender = true;
    }
    updateGridHeight(isFilter, autoHeight) {
        let height;
        if (isFilter) {
            const gridContentEle = this.gridObj.getContent().querySelector('.e-content');
            const scrollBarHeight = gridContentEle.offsetHeight - gridContentEle.clientHeight;
            if (this.fields.groupBy !== '' && !isNullOrUndefined(this.fields.groupBy)) {
                this.popupRowHeight += this.popupRowHeight;
            }
            height = autoHeight ? (this.popupRowHeight < this.prevGridHeight ? (this.popupRowHeight + scrollBarHeight) + 'px' : this.prevGridHeight + 'px') : this.prevGridHeight + 'px';
        }
        else {
            this.prevGridHeight = this.popupDiv.getBoundingClientRect().height - this.popupDiv.querySelector('.e-gridheader').getBoundingClientRect().height;
            height = this.prevGridHeight + 'px';
        }
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.gridObj.height = height;
        this.isProtectedOnChange = prevOnChange;
    }
    createPopup(element) {
        this.popupObj = new Popup(element, {
            width: this.getSize(true),
            targetType: 'relative',
            collision: { X: 'flip', Y: 'flip' },
            relateTo: this.inputWrapper,
            enableRtl: this.enableRtl,
            position: { X: 'left', Y: 'bottom' },
            targetExitViewport: () => {
                if (!Browser.isDevice) {
                    this.hidePopup();
                }
            },
            open: () => {
                this.inputEle.focus();
                this.updateClearIconState();
            }
        });
    }
    setFooterTemplate() {
        if (this.footer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact && typeof this.footerTemplate === 'function') {
                this.clearTemplate(['footerTemplate']);
            }
            else {
                this.footer.innerHTML = '';
            }
        }
        else {
            this.footer = this.createElement('div');
            addClass([this.footer], 'e-popup-footer');
        }
        const compiledString = this.getTemplateFunction(this.footerTemplate);
        const dataCount = this.dataSource.length;
        let tempArr = compiledString({ count: dataCount }, this, 'footerTemplate', this.element.id + 'footerTemplate', this.isStringTemplate, undefined, this.footer);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, this.footer);
        }
        append([this.footer], this.popupEle);
    }
    l10nUpdate(actionFailure) {
        if (this.noRecord) {
            this.noRecord.innerHTML = '';
        }
        else {
            this.noRecord = this.createElement('div');
        }
        if (this.noRecordsTemplate !== 'No records found' || this.actionFailureTemplate !== 'Request Failed') {
            const template = actionFailure ? this.actionFailureTemplate : this.noRecordsTemplate;
            const templateId = actionFailure ? this.element.id + '_actionFailure' : this.element.id + '_noRecords';
            const templatestring = actionFailure ? 'actionFailureTemplate' : 'noRecordsTemplate';
            const compiledString = this.getTemplateFunction(template);
            let tempArr = compiledString({}, this, templatestring, templateId, this.isStringTemplate, undefined, this.noRecord);
            if (tempArr) {
                tempArr = Array.prototype.slice.call(tempArr);
                append(tempArr, this.noRecord);
            }
        }
        else {
            const l10nLocale = { noRecordsTemplate: 'No records found', actionFailureTemplate: 'Request Failed' };
            this.l10n = new L10n('multicolumncombobox', l10nLocale, this.locale);
            this.noRecord.innerHTML = actionFailure ?
                this.l10n.getConstant('actionFailureTemplate') : this.l10n.getConstant('noRecordsTemplate');
        }
        addClass([this.noRecord], 'e-no-records');
        prepend([this.noRecord], this.popupDiv);
        this.popupObj.refreshPosition();
    }
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    getTemplateFunction(template) {
        if (typeof template === 'string') {
            let content = '';
            try {
                const tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return compile(content);
        }
        else {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    }
    /*To calculate the width and height of the popup */
    getSize(ispopupWidth) {
        const currentDimension = ispopupWidth ? this.popupWidth : this.popupHeight;
        let size = formatUnit(currentDimension);
        if (size.includes('%')) {
            const dimensionValue = ispopupWidth ? this.inputWrapper.offsetWidth : document.documentElement.clientHeight;
            size = (dimensionValue * parseFloat(size) / 100).toString() + 'px';
        }
        else if (typeof currentDimension === 'string') {
            size = currentDimension.match(/px|em/) ? currentDimension : size;
        }
        return size;
    }
    selectedGridRow(row, e, isKeyNav) {
        const eventArgs = {
            isInteracted: e ? true : false,
            item: this.gridObj.getSelectedRecords()[0],
            itemElement: row,
            itemData: this.gridObj.getSelectedRecords()[0],
            event: e,
            cancel: false
        };
        const selectedRecords = this.gridObj.getSelectedRecords()[0];
        const dataText = selectedRecords ? this.updateFieldValue(this.fields.text, selectedRecords) : '';
        const dataValue = selectedRecords ? this.updateFieldValue(this.fields.value, selectedRecords) : '';
        const ChangeEventArgs = {
            isInteracted: e ? true : false,
            item: selectedRecords,
            itemElement: row,
            itemData: { text: selectedRecords ? dataText : '', value: selectedRecords ? dataValue : '' },
            event: e,
            cancel: false,
            value: selectedRecords ? dataValue : '',
            previousItemData: { text: this.text, value: this.value },
            previousItemElement: this.previousItemElement
        };
        this.trigger('select', eventArgs, (eventArgs) => {
            if (!eventArgs.cancel && eventArgs.itemData) {
                const event = e;
                const isUpdateVal = event.key === 'Enter' || event.key === 'Tab' || event.shiftKey && event.key === 'Tab' || event.altKey && event.key === 'ArrowUp';
                if (!isKeyNav || (isKeyNav && isUpdateVal)) {
                    this.updateValues(selectedRecords ? dataValue : '', selectedRecords ? dataText : '', this.gridObj.selectedRowIndex, ChangeEventArgs);
                }
                Input.setValue(selectedRecords ? dataText : '', this.inputEle, this.floatLabelType, this.showClearButton);
                this.setHiddenValue();
                if (!isKeyNav || (isKeyNav && isUpdateVal)) {
                    this.hidePopup(e);
                }
            }
            if (this.gridObj) {
                this.announcePosition(this.gridObj.selectedRowIndex, this.gridObj.getRows().length);
            }
        });
    }
    updateValues(value, text, index, eventArgs, isInitial) {
        this.previousItemElement = eventArgs.itemElement;
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.text = text || this.text;
        this.value = value || this.value;
        this.index = this.selectedRowIndex = !isNullOrUndefined(index) ? index : this.index;
        this.isProtectedOnChange = prevOnChange;
        this.setHiddenValue();
        if (!isInitial) {
            this.triggerChangeEvent(eventArgs);
        }
    }
    triggerChangeEvent(eventArgs) {
        this.trigger('change', eventArgs, (eventArgs) => {
            if (eventArgs.cancel) {
                return;
            }
        });
    }
    inputHandler(e) {
        this.showPopup(null, true);
        this.updateClearIconState();
        if (this.allowFiltering) {
            this.typedString = e.target.value.toLowerCase();
            const eventArgs = {
                preventDefaultAction: false,
                text: this.typedString,
                updateData: (dataSource, query, fields) => {
                    if (eventArgs.cancel) {
                        return;
                    }
                    this.isCustomFilter = true;
                    this.customFilterQuery = query ? query.clone() : query;
                    this.isMainDataUpdated = false;
                    if (query) {
                        this.setGridData(dataSource, query);
                    }
                    else {
                        const filtered = this.filterDatas(dataSource, this.typedString).data;
                        this.setGridData(this.typedString !== '' ? filtered : dataSource, query);
                    }
                },
                event: e,
                cancel: false
            };
            this.trigger('filtering', eventArgs, (eventArgs) => {
                if (!eventArgs.cancel && !eventArgs.preventDefaultAction && !this.isCustomFilter) {
                    this.setGridData(this.dataSource, this.query ? this.query.clone() : null);
                }
            });
        }
        this.updateInputValue(e.target.value);
    }
    updateInputValue(inputValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            let exactData;
            if (this.dataSource instanceof DataManager) {
                ({ data, exactData } = this.filterDatas(this.mainData, inputValue));
            }
            else if (Array.isArray(this.dataSource)) {
                ({ data, exactData } = this.filterDatas(this.dataSource, inputValue));
            }
            this.selectFilteredRows(data, exactData);
        });
    }
    filterDatas(dataSource, inputValue) {
        const data = dataSource.filter((item) => {
            const fieldText = this.updateFieldValue(this.fields.text, item);
            return inputValue && fieldText.toLowerCase().startsWith(inputValue.toLowerCase());
        });
        const exactData = dataSource.filter((item) => {
            const fieldText = this.updateFieldValue(this.fields.text, item);
            return fieldText === inputValue;
        });
        return { data, exactData };
    }
    selectFilteredRows(data, exactData) {
        if (data.length <= 0) {
            this.matchedRowEle = this.matchedContent = this.exactMatchedContent = null;
            return;
        }
        this.matchedContent = data[0];
        this.exactMatchedContent = exactData[0];
        const selectedIndex = this.findIndex(this.gridObj.currentViewData, this.matchedContent);
        this.matchedRowEle = this.gridObj.getRowByIndex(selectedIndex);
    }
    updateGridDataSource() {
        if (this.gridData && this.gridData.length > 0) {
            removeClass([this.popupDiv], [NODATA]);
            const noRecordEle = this.popupDiv.querySelector('.e-no-records');
            if (noRecordEle) {
                this.popupDiv.removeChild(noRecordEle);
            }
            this.gridObj.dataSource = this.gridData;
            this.isDataFiltered = true;
        }
        else {
            this.l10nUpdate();
            addClass([this.popupDiv], [NODATA]);
        }
    }
    wireEvents() {
        if (!isNullOrUndefined(this.inputObj.buttons[0])) {
            EventHandler.add(this.inputObj.buttons[0], 'mousedown', this.preventBlur, this);
            EventHandler.add(this.inputObj.buttons[0], 'mousedown', this.dropDownClick, this);
        }
        EventHandler.add(document, 'mousedown', this.onDocumentClick, this);
        EventHandler.add(this.gridEle, 'click', this.onMouseClick, this);
        EventHandler.add(this.inputEle, 'input', this.inputHandler, this);
        EventHandler.add(this.inputEle, 'focus', this.focusIn, this);
        if (this.showClearButton) {
            EventHandler.add(this.inputObj.clearButton, 'mousedown', this.clearText, this);
        }
        EventHandler.add(window, 'resize', this.windowResize, this);
        this.keyboardModule = new KeyboardEvents(this.inputWrapper, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        this.keyboardModule = new KeyboardEvents(this.gridEle, {
            keyAction: this.gridKeyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    unWireEvents() {
        if (!isNullOrUndefined(this.inputObj.buttons[0])) {
            EventHandler.remove(this.inputObj.buttons[0], 'mousedown', this.preventBlur);
            EventHandler.remove(this.inputObj.buttons[0], 'mousedown', this.dropDownClick);
        }
        EventHandler.remove(document, 'mousedown', this.onDocumentClick);
        EventHandler.remove(this.inputEle, 'input', this.inputHandler);
        EventHandler.remove(this.inputWrapper, 'focus', this.focusIn);
        EventHandler.remove(window, 'resize', this.windowResize);
        EventHandler.remove(this.gridEle, 'click', this.onMouseClick);
        if (this.showClearButton) {
            EventHandler.remove(this.inputObj.clearButton, 'mousedown', this.clearText);
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
    }
    preventBlur(e) {
        e.preventDefault();
    }
    dropDownClick(e) {
        if (this.disabled || this.readonly) {
            return;
        }
        const focusedEle = this.gridEle.querySelector('.e-row-focus');
        if (focusedEle) {
            focusedEle.classList.remove('e-row-focus');
        }
        if (this.isPopupOpen) {
            this.hidePopup(e);
        }
        else {
            this.showPopup(e);
        }
    }
    onMouseClick(e) {
        const target = e.target;
        const row = closest(target, '.e-row');
        const selectedRowIndex = this.gridObj.selectedRowIndex;
        if (row) {
            if (selectedRowIndex >= 0) {
                this.selectedGridRow(row, e);
            }
            else {
                this.gridObj.selectedRowIndex = this.gridObj.getRows().indexOf(row);
                this.gridObj.selectRow(this.gridObj.selectedRowIndex);
                this.hidePopup(e);
            }
        }
    }
    onDocumentClick(e) {
        const target = e.target;
        if (this.disabled || this.readonly || !this.isPopupOpen) {
            if (!target.closest('.e-multicolumn-list')) {
                this.focusOut();
            }
            return;
        }
        if ((target.classList.contains('e-multicolumn-list-icon') || closest(target, '.e-multicolumn-list.e-popup'))) {
            e.preventDefault();
        }
        else {
            if (!target.classList.contains('e-multicolumncombobox') && !target.classList.contains('e-clear-icon')) {
                if (!isNullOrUndefined(this.text)) {
                    this.updateInputValue(this.text);
                }
                const isClearVal = this.inputEle.value === '' ? true : false;
                this.updateValuesOnInput(e, null, isClearVal);
            }
        }
    }
    updateValuesOnInput(mouseEvent, keyEvent, isClearValues, isKeyDown = false) {
        const e = mouseEvent ? mouseEvent : keyEvent;
        const val = isKeyDown ? this.matchedContent : this.exactMatchedContent;
        if (!val && e.code !== 'Enter') {
            this.inputEle.value = null;
            this.setProperties({ value: null, index: null, text: null }, true);
        }
        this.hidePopup(e);
        if (this.matchedRowEle && !isClearValues && val) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            const fieldText = this.updateFieldValue(this.fields.text, this.matchedContent);
            const fieldValue = this.updateFieldValue(this.fields.value, this.matchedContent);
            this.inputEle.value = fieldText;
            this.value = fieldValue;
            const selectIndex = this.findIndex(this.gridObj.currentViewData, this.matchedContent);
            this.index = selectIndex;
            this.text = fieldText;
            this.gridObj.selectRow(selectIndex);
            this.selectedGridRow(this.gridObj.getRowByIndex(selectIndex), e);
            this.previousItemElement = this.gridObj.getSelectedRows()[0];
            this.isProtectedOnChange = prevOnChange;
        }
        else {
            if (this.isDataFiltered) {
                this.inputEle.value = '';
                const ChangeEventArgs = {
                    value: null,
                    itemData: { text: null, value: null },
                    item: null,
                    previousItemData: { text: this.text, value: this.value },
                    previousItemElement: this.previousItemElement,
                    itemElement: null,
                    event: e,
                    isInteracted: true,
                    cancel: false
                };
                const prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                this.text = this.value = this.index = null;
                this.gridObj.refreshColumns();
                this.isProtectedOnChange = prevOnChange;
                this.triggerChangeEvent(ChangeEventArgs);
                this.isDataFiltered = false;
                this.matchedContent = this.matchedRowEle = null;
            }
        }
    }
    clearText(e) {
        this.isDataFiltered = true;
        this.updateValuesOnInput(e, null, true);
    }
    windowResize() {
        if (this.popupObj) {
            this.popupObj.setProperties({ width: this.getSize(true) });
            this.popupObj.refreshPosition();
        }
    }
    /* To set cssclass for the dropdowntree */
    setCssClass(newClass, oldClass) {
        const elements = this.popupObj ? [this.inputWrapper, this.popupObj.element] : [this.inputWrapper];
        if (!isNullOrUndefined(oldClass) && oldClass !== '') {
            removeClass(elements, oldClass.split(' '));
        }
        if (!isNullOrUndefined(newClass) && newClass !== '') {
            addClass(elements, newClass.split(' '));
        }
    }
    keyActionHandler(e) {
        switch (e.action) {
            case 'escape':
            case 'altUp':
            case 'shiftTab':
            case 'tab':
                if (this.isPopupOpen) {
                    this.hidePopup(e);
                }
                else {
                    this.focusOut();
                }
                break;
            case 'altDown':
                if (!this.isPopupOpen) {
                    this.showPopup(e);
                    this.updateSelectedItem(e, false);
                }
                break;
            case 'moveDown':
            case 'moveUp':
                this.updateSelectedItem(e, true, true);
                break;
            case 'enter':
                this.updateValuesOnInput(null, e, false, true);
                this.focusIn(e);
                break;
            case 'home':
            case 'end':
                this.updateSelectedItem(e);
                break;
        }
    }
    gridKeyActionHandler(e, isGroup) {
        const keyActionMap = {
            'ArrowDown': 'moveDown',
            'ArrowUp': 'moveUp',
            'End': 'end',
            'Home': 'home',
            'Tab': 'tab',
            'Escape': 'escape',
            'Shift+Tab': 'shiftTab',
            'Alt+ArrowUp': 'altUp'
        };
        if (isGroup) {
            const key = `${e.altKey ? 'Alt+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.key}`;
            e.action = keyActionMap[key] || e.action;
        }
        switch (e.action) {
            case 'escape':
            case 'tab':
            case 'shiftTab':
            case 'altUp':
                if (this.isPopupOpen) {
                    e.preventDefault();
                    if (e.action !== 'escape') {
                        this.updateSelectedItem(e);
                    }
                    this.hidePopup(e);
                }
                break;
            case 'moveDown':
            case 'moveUp':
            case 'home':
            case 'end':
                this.updateSelectedItem(e);
                break;
        }
    }
    updateSelectedItem(e, isUpdateIndex = true, isInputTarget) {
        if (this.isPopupOpen) {
            let index = this.fields.groupBy ? (this.gridObj.selectedRowIndex || 0) : this.gridObj.selectedRowIndex;
            const dataLength = this.dataSource instanceof DataManager ? this.remoteDataLength :
                this.dataSource.length;
            if ((index === -1 && (e.action === 'moveDown' || e.action === 'moveUp')) || (e.action === 'home')) {
                index = 0;
            }
            else if ((index >= (dataLength - 1) && e.action === 'moveDown') || (e.action === 'end')) {
                index = dataLength - 1;
            }
            else if (e.action === 'moveDown' && (index >= 0 && index <= (dataLength - 1)) && (this.fields.groupBy || isInputTarget)) {
                index += 1;
            }
            else if (e.action === 'moveUp' && index > 0 && (this.fields.groupBy) || isInputTarget) {
                index -= 1;
            }
            if (!this.enableVirtualization) {
                this.selectRow(e, isUpdateIndex, index);
            }
            else {
                setTimeout(() => { this.selectRow(e, isUpdateIndex, index); });
            }
        }
    }
    selectRow(e, isUpdateIndex = true, index) {
        this.gridObj.selectRow(index);
        this.gridObj.selectedRowIndex = index;
        const focusedEle = this.gridEle.querySelector('.e-row-focus');
        if (focusedEle) {
            focusedEle.classList.remove('e-row-focus');
        }
        if (isUpdateIndex) {
            this.selectedGridRow(this.gridObj.getRows()[parseInt(index.toString(), 10)], e, true);
        }
    }
    updateClearIconState() {
        const clearIconEle = this.inputWrapper.querySelector('.e-clear-icon');
        if (clearIconEle) {
            clearIconEle.style.display = this.inputEle.value === '' ? 'none' : 'flex';
        }
    }
    updateDynamicDataSource(newDataSource, oldDataSource) {
        if (this.gridObj) {
            let dataLength;
            this.isMainDataUpdated = false;
            this.isShowSpinner = true;
            this.setGridData(newDataSource);
            const isRemoteData = oldDataSource instanceof DataManager;
            if (isRemoteData) {
                oldDataSource.executeQuery(new Query()).then((e) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dataLength = e.result.length;
                });
            }
            else {
                dataLength = oldDataSource.length;
            }
            if (dataLength === 0) {
                this.popupDiv.appendChild(this.gridEle);
            }
        }
    }
    /**
     * Sets the focus to the component for interaction.component for interaction.
     *
     * @param {FocusEvent | MouseEvent | KeyboardEvent | TouchEvent} e - Specifies the event.
     * @returns {void}
     */
    focusIn(e) {
        if (this.disabled || this.readonly) {
            return;
        }
        addClass([this.inputWrapper], [INPUTFOCUS]);
        this.inputEle.focus();
        this.updateClearIconState();
        this.trigger('focus', e);
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputEle, this.inputWrapper);
        }
    }
    /**
     * Moves the focus from the component if the component is already focused.
     *
     * @param {MouseEvent | KeyboardEvent} e - Specifies the event.
     * @returns {void}
     */
    focusOut(e) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.isPopupOpen) {
            this.hidePopup(e);
        }
        if (this.inputWrapper) {
            removeClass([this.inputWrapper], [INPUTFOCUS]);
            const clearIconEle = this.inputWrapper.querySelector('.e-clear-icon');
            if (clearIconEle) {
                clearIconEle.style.display = 'none';
            }
            if (this.floatLabelType !== 'Never') {
                Input.calculateWidth(this.inputEle, this.inputWrapper);
            }
        }
    }
    /**
     * Opens the popup that displays the list of items.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @param {boolean} isInputOpen - Specifies whether the input is open or not.
     * @returns {void}
     */
    showPopup(e, isInputOpen) {
        const animModel = { name: 'FadeIn', duration: 100 };
        const eventArgs = { popup: this.popupObj, event: e, cancel: false, animation: animModel };
        this.trigger('open', eventArgs, (eventArgs) => {
            if (!eventArgs.cancel && !this.isPopupOpen) {
                this.isPopupOpen = true;
                this.popupObj.refreshPosition();
                addClass([this.inputWrapper], [ICONANIMATION]);
                attributes(this.inputEle, { 'aria-expanded': 'true', 'aria-owns': this.element.id + '_options', 'aria-controls': this.element.id });
                if (!isInputOpen) {
                    if ((this.value || this.text || this.index)) {
                        this.gridObj.selectRow(this.selectedRowIndex);
                    }
                }
                const contentEle = this.gridObj.getContent();
                if (contentEle) {
                    const activeRow = contentEle.querySelector('.e-rowcell.e-active');
                    const firstRow = contentEle.querySelector('.e-row');
                    if (activeRow) {
                        this.inputEle.setAttribute('aria-activedescendant', activeRow.parentElement.getAttribute('data-uid'));
                    }
                    else if (firstRow) {
                        this.inputEle.setAttribute('aria-activedescendant', firstRow.getAttribute('data-uid'));
                    }
                }
                this.popupObj.show(new Animation(eventArgs.animation), this.popupEle.firstElementChild);
                this.liveRegion.textContent = '';
                setTimeout(() => {
                    if (this.gridObj) {
                        this.announcePosition(this.gridObj.selectedRowIndex, this.gridObj.getRows().length);
                    }
                }, 300);
            }
        });
    }
    /**
     * Hides the popup if it is in open state.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @returns {void}
     */
    hidePopup(e) {
        const animModel = { name: 'FadeOut', duration: 100 };
        const eventArgs = { popup: this.popupObj, event: e || null, cancel: false, animation: animModel };
        const target = e ? e.target : null;
        this.trigger('close', eventArgs, (eventArgs) => {
            if (!eventArgs.cancel) {
                this.isPopupOpen = false;
                removeClass([this.inputWrapper], [ICONANIMATION]);
                attributes(this.inputEle, { 'aria-expanded': 'false' });
                this.popupObj.hide(new Animation(eventArgs.animation));
                if (target && (target.classList.contains('e-multicolumn-list-icon') || target.classList.contains('e-rowcell'))) {
                    if (!this.value) {
                        this.gridObj.refreshColumns();
                    }
                    setTimeout(() => { this.focusIn(e); });
                }
                else {
                    this.focusOut();
                }
                this.inputEle.removeAttribute('aria-owns');
                this.inputEle.removeAttribute('aria-activedescendant');
                this.customFilterQuery = null;
            }
        });
        setTimeout(() => {
            if (this.gridObj) {
                this.gridObj.dataSource = this.allowFiltering ? this.mainData : this.gridData;
                const noRecordEle = this.popupDiv.querySelector('.e-no-records');
                if (noRecordEle) {
                    this.popupDiv.removeChild(noRecordEle);
                    removeClass([this.popupDiv], [NODATA]);
                }
                this.updateGridHeight(true, false);
            }
        }, 100);
    }
    /**
     * Adds a new item to the popup list. By default, new item appends to the list as the last item,
     * but you can insert based on the index parameter.
     *
     * @param { Object[] } items - Specifies an array of JSON data or a JSON data.
     * @param { number } index - Specifies the index to place the newly added item in the popup list.
     * @returns {void}
     */
    addItems(items, index) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.gridObj.editSettings.allowAdding = true;
        this.gridObj.dataBind();
        this.isProtectedOnChange = prevOnChange;
        this.gridObj.addRecord(items, index);
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets all the list items bound on this component.
     *
     * @returns {Element[]}
     */
    getItems() {
        return this.gridObj.getDataRows();
    }
    /**
     * Gets the data Object that matches the given value.
     *
     * @param { string } value - Specifies the value of the list item.
     * @returns {Object}
     */
    getDataByValue(value) {
        if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
            return this.dataSource.filter((item) => {
                const fieldValue = this.updateFieldValue(this.fields.value, item);
                return fieldValue === value;
            })[0];
        }
        else if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof DataManager && this.mainData
            && this.isMainDataUpdated) {
            const dataLists = ((this.query && this.getQuery(this.query).isCountRequired) ||
                !this.query) ? this.mainData : this.mainData.result ? this.mainData.result : this.mainData;
            return dataLists.filter((item) => {
                const fieldValue = this.updateFieldValue(this.fields.value, item);
                return fieldValue === value;
            })[0];
        }
        return null;
    }
    destroy() {
        this.unWireEvents();
        if (this.gridObj) {
            this.gridObj.destroy();
            detach(this.gridObj.element);
        }
        if (this.inputEle) {
            const attrArray = ['placeholder', 'aria-expanded', 'spellcheck', 'aria-label', 'role', 'type',
                'aria-owns', 'aria-controls', 'aria-readonly', 'autocomplete', 'autocapitalize', 'spellcheck', 'aria-activedescendant'];
            for (let i = 0; i < attrArray.length; i++) {
                this.inputEle.removeAttribute(attrArray[i]);
            }
            this.inputEle.classList.remove('e-input');
            Input.setValue('', this.inputEle, this.floatLabelType, this.showClearButton);
        }
        if (this.popupEle) {
            this.popupEle.removeAttribute('aria-label');
            this.popupEle.removeAttribute('role');
        }
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
        }
        if (this.element.tagName !== this.getDirective()) {
            this.inputWrapper.parentElement.insertBefore(this.element, this.inputWrapper);
        }
        if (this.inputObj) {
            detach(this.inputObj.container);
            this.inputObj = null;
        }
        Input.destroy({
            element: this.inputEle,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        });
        detach(this.inputWrapper);
        detach(this.popupDiv);
        if (this.liveRegion) {
            detach(this.liveRegion);
            this.liveRegion = null;
        }
        this.inputEle = null;
        this.previousItemElement = null;
        this.inputWrapper.innerHTML = '';
        this.inputWrapper = null;
        this.popupDiv = null;
        this.popupObj = null;
        this.gridObj = null;
        this.gridEle = null;
        this.popupEle = null;
        this.footer = null;
        this.noRecord = null;
        this.hiddenElement = null;
        this.dropdownElement = null;
        super.destroy();
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {MultiColumnComboBoxModel} newProp - Specifies new properties
     * @param  {MultiColumnComboBoxModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            let gridColumns;
            switch (prop) {
                case 'width':
                case 'popupWidth':
                    if (prop === 'width') {
                        this.setElementWidth(newProp.width);
                    }
                    if (this.popupObj) {
                        this.popupObj.element.style.width = this.getSize(true);
                    }
                    break;
                case 'popupHeight':
                    if (this.popupObj) {
                        const height = this.getSize(false);
                        this.popupObj.element.style.maxHeight = height;
                        this.popupDiv.style.maxHeight = height;
                        this.gridObj.height = height;
                    }
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputEle);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputEle);
                    break;
                case 'disabled':
                    Input.setEnabled(!this.disabled, this.inputEle);
                    this.setEnable();
                    break;
                case 'cssClass':
                    this.setCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'floatLabelType':
                    Input.removeFloating(this.inputObj);
                    Input.addFloating(this.inputEle, this.floatLabelType, this.placeholder);
                    break;
                case 'showClearButton':
                    Input.setClearButton(newProp.showClearButton, this.inputEle, this.inputObj);
                    break;
                case 'value':
                    this.initValue(true, true);
                    break;
                case 'text':
                    this.initValue(true, false);
                    break;
                case 'index':
                    this.initValue(true);
                    break;
                case 'sortOrder':
                    if (this.gridObj) {
                        this.gridObj.sortSettings.columns = [{
                                field: this.fields.text, direction: newProp.sortOrder === SortOrder.Ascending ?
                                    SortOrder.Ascending : SortOrder.Descending
                            }];
                    }
                    break;
                case 'htmlAttributes':
                    this.setHTMLAttributes();
                    break;
                case 'noRecordsTemplate':
                    this.l10nUpdate();
                    break;
                case 'actionFailureTemplate':
                    this.l10nUpdate(true);
                    break;
                case 'footerTemplate':
                    this.setFooterTemplate();
                    break;
                case 'itemTemplate':
                    if (this.gridObj) {
                        this.gridObj.rowTemplate = newProp.itemTemplate;
                    }
                    break;
                case 'groupTemplate':
                    this.groupTemplate = newProp.groupTemplate;
                    this.updateGroupByField();
                    break;
                case 'enableRtl':
                    if (this.gridObj && this.popupObj) {
                        this.gridObj.enableRtl = newProp.enableRtl;
                        Input.setEnableRtl(newProp.enableRtl, [this.inputWrapper]);
                        this.popupObj.enableRtl = newProp.enableRtl;
                    }
                    break;
                case 'dataSource':
                    this.updateDynamicDataSource(newProp.dataSource, oldProp.dataSource);
                    break;
                case 'query':
                    this.isMainDataUpdated = false;
                    this.setGridData(this.dataSource);
                    break;
                case 'gridSettings':
                    if (this.gridObj) {
                        this.gridObj.gridLines = newProp.gridSettings.gridLines;
                        this.gridObj.rowHeight = newProp.gridSettings.rowHeight;
                        this.gridObj.enableAltRow = newProp.gridSettings.enableAltRow;
                        this.gridObj.allowResizing = newProp.gridSettings.allowResizing;
                        if (!(isNullOrUndefined(newProp.gridSettings.allowTextWrap))) {
                            this.gridObj.allowTextWrap = newProp.gridSettings.allowTextWrap;
                        }
                        if (!(isNullOrUndefined(newProp.gridSettings.textWrapMode))) {
                            this.gridObj.textWrapSettings.wrapMode = newProp.gridSettings.textWrapMode;
                        }
                    }
                    break;
                case 'fields':
                    this.fields = newProp.fields;
                    this.updateGroupByField();
                    break;
                case 'filterType':
                    this.filterType = newProp.filterType;
                    break;
                case 'enableVirtualization':
                    if (this.gridObj) {
                        this.enableVirtualization = this.gridObj.enableVirtualization = newProp.enableVirtualization;
                    }
                    break;
                case 'sortType':
                    if (this.gridObj) {
                        this.sortType = newProp.sortType;
                        this.gridObj.allowMultiSorting = this.sortType.toString().toLowerCase() === 'multiplecolumns' && this.allowSorting;
                    }
                    break;
                case 'allowFiltering':
                    this.allowFiltering = newProp.allowFiltering;
                    break;
                case 'allowSorting':
                    if (this.gridObj) {
                        this.allowSorting = this.gridObj.allowSorting = newProp.allowSorting;
                    }
                    break;
                case 'columns':
                    if (this.gridObj) {
                        gridColumns = this.getGridColumns();
                        this.gridObj.columns = gridColumns;
                    }
                    break;
                case 'locale':
                    this.isLocaleChanged = true;
                    break;
            }
        }
    }
};
__decorate([
    Property([])
], MultiColumnComboBox.prototype, "dataSource", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "text", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "value", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "index", void 0);
__decorate([
    Property('100%')
], MultiColumnComboBox.prototype, "width", void 0);
__decorate([
    Property('300px')
], MultiColumnComboBox.prototype, "popupHeight", void 0);
__decorate([
    Property('100%')
], MultiColumnComboBox.prototype, "popupWidth", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "placeholder", void 0);
__decorate([
    Property(true)
], MultiColumnComboBox.prototype, "allowFiltering", void 0);
__decorate([
    Property(true)
], MultiColumnComboBox.prototype, "allowSorting", void 0);
__decorate([
    Property(false)
], MultiColumnComboBox.prototype, "showClearButton", void 0);
__decorate([
    Property('')
], MultiColumnComboBox.prototype, "cssClass", void 0);
__decorate([
    Complex({ text: null, value: null, groupBy: null }, FieldSettings)
], MultiColumnComboBox.prototype, "fields", void 0);
__decorate([
    Collection([], Column)
], MultiColumnComboBox.prototype, "columns", void 0);
__decorate([
    Complex({}, GridSettings)
], MultiColumnComboBox.prototype, "gridSettings", void 0);
__decorate([
    Property(FilterType.StartsWith)
], MultiColumnComboBox.prototype, "filterType", void 0);
__decorate([
    Property('Never')
], MultiColumnComboBox.prototype, "floatLabelType", void 0);
__decorate([
    Property(SortOrder.None)
], MultiColumnComboBox.prototype, "sortOrder", void 0);
__decorate([
    Property(SortType.OneColumn)
], MultiColumnComboBox.prototype, "sortType", void 0);
__decorate([
    Property(false)
], MultiColumnComboBox.prototype, "enableVirtualization", void 0);
__decorate([
    Property(false)
], MultiColumnComboBox.prototype, "disabled", void 0);
__decorate([
    Property(false)
], MultiColumnComboBox.prototype, "readonly", void 0);
__decorate([
    Property(false)
], MultiColumnComboBox.prototype, "enablePersistence", void 0);
__decorate([
    Property()
], MultiColumnComboBox.prototype, "query", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "itemTemplate", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "footerTemplate", void 0);
__decorate([
    Property(null)
], MultiColumnComboBox.prototype, "groupTemplate", void 0);
__decorate([
    Property('Request Failed')
], MultiColumnComboBox.prototype, "actionFailureTemplate", void 0);
__decorate([
    Property('No records found')
], MultiColumnComboBox.prototype, "noRecordsTemplate", void 0);
__decorate([
    Property({})
], MultiColumnComboBox.prototype, "htmlAttributes", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "created", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "open", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "close", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "actionFailure", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "actionBegin", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "actionComplete", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "filtering", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "select", void 0);
__decorate([
    Event()
], MultiColumnComboBox.prototype, "change", void 0);
MultiColumnComboBox = __decorate([
    NotifyPropertyChanges
], MultiColumnComboBox);

export { Column, FieldSettings, FilterType, GridSettings, MultiColumnComboBox, MultiColumnGrid, SortOrder, SortType, WrapMode };
//# sourceMappingURL=ej2-multicolumn-combobox.es2015.js.map
