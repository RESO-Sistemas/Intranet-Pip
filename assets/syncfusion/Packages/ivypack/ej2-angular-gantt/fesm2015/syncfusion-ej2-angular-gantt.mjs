import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { Gantt, Filter, Selection, Sort, Reorder, Resize, Edit, DayMarkers, Toolbar, ContextMenu, ExcelExport, RowDD, ColumnMenu, PdfExport, VirtualScroll, CriticalPath, UndoRedo, Freeze } from '@syncfusion/ej2-gantt';
export * from '@syncfusion/ej2-gantt';
import { CommonModule } from '@angular/common';

let input$6 = ['allowEditing', 'allowFiltering', 'allowReordering', 'allowResizing', 'allowSorting', 'clipMode', 'customAttributes', 'disableHtmlEncode', 'displayAsCheckBox', 'edit', 'editType', 'field', 'filter', 'filterTemplate', 'format', 'formatter', 'freeze', 'headerTemplate', 'headerText', 'headerTextAlign', 'hideAtMedia', 'isFrozen', 'isPrimaryKey', 'lockColumn', 'maxWidth', 'minWidth', 'showColumnMenu', 'sortComparer', 'template', 'textAlign', 'type', 'validationRules', 'valueAccessor', 'visible', 'width'];
let outputs$7 = [];
/**
 * `e-column` directive represent a column of the Angular Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='150'></e-column>
 *    <e-column field='taskName' headerText='Task Name' width='200'></e-column>
 *   </e-columns>
 * </ejs-gantt>
 * ```
 */
class ColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$7);
        this.directivePropList = input$6;
    }
}
ColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnDirective, selector: "ejs-gantt>e-columns>e-column", inputs: { allowEditing: "allowEditing", allowFiltering: "allowFiltering", allowReordering: "allowReordering", allowResizing: "allowResizing", allowSorting: "allowSorting", clipMode: "clipMode", customAttributes: "customAttributes", disableHtmlEncode: "disableHtmlEncode", displayAsCheckBox: "displayAsCheckBox", edit: "edit", editType: "editType", field: "field", filter: "filter", filterTemplate: "filterTemplate", format: "format", formatter: "formatter", freeze: "freeze", headerTemplate: "headerTemplate", headerText: "headerText", headerTextAlign: "headerTextAlign", hideAtMedia: "hideAtMedia", isFrozen: "isFrozen", isPrimaryKey: "isPrimaryKey", lockColumn: "lockColumn", maxWidth: "maxWidth", minWidth: "minWidth", showColumnMenu: "showColumnMenu", sortComparer: "sortComparer", template: "template", textAlign: "textAlign", type: "type", validationRules: "validationRules", valueAccessor: "valueAccessor", visible: "visible", width: "width" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "editTemplate", first: true, predicate: ["editTemplate"], descendants: true }, { propertyName: "filter_itemTemplate", first: true, predicate: ["filterItemTemplate"], descendants: true }, { propertyName: "filterTemplate", first: true, predicate: ["filterTemplate"], descendants: true }, { propertyName: "emptyRecordTemplate", first: true, predicate: ["emptyRecordTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ColumnDirective.prototype, "template", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "editTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "filter_itemTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "filterTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "emptyRecordTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-columns>e-column',
                    inputs: input$6,
                    outputs: outputs$7,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], editTemplate: [{
                type: ContentChild,
                args: ['editTemplate']
            }], filter_itemTemplate: [{
                type: ContentChild,
                args: ['filterItemTemplate']
            }], filterTemplate: [{
                type: ContentChild,
                args: ['filterTemplate']
            }], emptyRecordTemplate: [{
                type: ContentChild,
                args: ['emptyRecordTemplate']
            }] } });
/**
 * Column Array Directive
 * @private
 */
class ColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
ColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnsDirective, selector: "ejs-gantt>e-columns", queries: [{ propertyName: "children", predicate: ColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-columns',
                    queries: {
                        children: new ContentChildren(ColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$5 = ['additionalParams', 'fields', 'headerText', 'type'];
let outputs$6 = [];
/**
 * `e-add-dialog-field` directive represent a add dialog fields collection in Gantt task add dialog.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-add-dialog-fields>
 *     <e-add-dialog-field type='General' headerText='General'></e-add-dialog-field>
 *     <e-add-dialog-field type='Dependency' headerText='Dependency'></e-add-dialog-field>
 *   </e-add-dialog-fields>
 * </ejs-gantt>
 * ```
 */
class AddDialogFieldDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$6);
        this.directivePropList = input$5;
    }
}
AddDialogFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AddDialogFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AddDialogFieldDirective, selector: "ejs-gantt>e-add-dialog-fields>e-add-dialog-field", inputs: { additionalParams: "additionalParams", fields: "fields", headerText: "headerText", type: "type" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-add-dialog-fields>e-add-dialog-field',
                    inputs: input$5,
                    outputs: outputs$6,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * AddDialogField Array Directive
 * @private
 */
class AddDialogFieldsDirective extends ArrayBase {
    constructor() {
        super('adddialogfields');
    }
}
AddDialogFieldsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AddDialogFieldsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AddDialogFieldsDirective, selector: "ejs-gantt>e-add-dialog-fields", queries: [{ propertyName: "children", predicate: AddDialogFieldDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AddDialogFieldsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-add-dialog-fields',
                    queries: {
                        children: new ContentChildren(AddDialogFieldDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$4 = ['additionalParams', 'fields', 'headerText', 'type'];
let outputs$5 = [];
/**
 * `e-edit-dialog-field` directive represent a edit dialog fields collection in Gantt task add dialog.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-edit-dialog-fields>
 *     <e-edit-dialog-field type='General' headerText='General'></e-edit-dialog-field>
 *     <e-edit-dialog-field type='Dependency' headerText='Dependency'></e-edit-dialog-field>
 *   </e-edit-dialog-fields>
 * </ejs-gantt>
 * ```
 */
class EditDialogFieldDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$5);
        this.directivePropList = input$4;
    }
}
EditDialogFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
EditDialogFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EditDialogFieldDirective, selector: "ejs-gantt>e-edit-dialog-fields>e-edit-dialog-field", inputs: { additionalParams: "additionalParams", fields: "fields", headerText: "headerText", type: "type" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-edit-dialog-fields>e-edit-dialog-field',
                    inputs: input$4,
                    outputs: outputs$5,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * EditDialogField Array Directive
 * @private
 */
class EditDialogFieldsDirective extends ArrayBase {
    constructor() {
        super('editdialogfields');
    }
}
EditDialogFieldsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EditDialogFieldsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EditDialogFieldsDirective, selector: "ejs-gantt>e-edit-dialog-fields", queries: [{ propertyName: "children", predicate: EditDialogFieldDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-edit-dialog-fields',
                    queries: {
                        children: new ContentChildren(EditDialogFieldDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$3 = ['from', 'to'];
let outputs$4 = [];
/**
 * `e-day-working-time-collection` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-day-working-time-collection>
 *     <e-day-working-time from='8' to='12'></e-day-working-time>
 *     <e-day-working-time from='13' to='17'></e-day-working-time>
 *   </e-day-working-time-collection>
 * </ejs-gantt>
 * ```
 */
class DayWorkingTimeDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$4);
        this.directivePropList = input$3;
    }
}
DayWorkingTimeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
DayWorkingTimeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: DayWorkingTimeDirective, selector: "ejs-gantt>e-day-working-time-collection>e-day-working-time", inputs: { from: "from", to: "to" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-day-working-time-collection>e-day-working-time',
                    inputs: input$3,
                    outputs: outputs$4,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * DayWorkingTime Array Directive
 * @private
 */
class DayWorkingTimeCollectionDirective extends ArrayBase {
    constructor() {
        super('dayworkingtime');
    }
}
DayWorkingTimeCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeCollectionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
DayWorkingTimeCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: DayWorkingTimeCollectionDirective, selector: "ejs-gantt>e-day-working-time-collection", queries: [{ propertyName: "children", predicate: DayWorkingTimeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DayWorkingTimeCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-day-working-time-collection',
                    queries: {
                        children: new ContentChildren(DayWorkingTimeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$2 = ['dayOfWeek', 'timeRange'];
let outputs$3 = [];
/**
 * `e-week-working-times` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-week-working-times>
 *     <e-week-working-time dayOfWeek='Monday'></e-week-working-time>
 *     <e-week-working-time dayOfWeek='Monday'></e-week-working-time>
 *   </e-week-working-times>
 * </ejs-gantt>
 * ```
 */
class WeekWorkingTimeDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$3);
        this.directivePropList = input$2;
    }
}
WeekWorkingTimeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
WeekWorkingTimeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: WeekWorkingTimeDirective, selector: "ejs-gantt>e-week-working-times>e-week-working-time", inputs: { dayOfWeek: "dayOfWeek", timeRange: "timeRange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-week-working-times>e-week-working-time',
                    inputs: input$2,
                    outputs: outputs$3,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * WeekWorkingTime Array Directive
 * @private
 */
class WeekWorkingTimesDirective extends ArrayBase {
    constructor() {
        super('weekworkingtime');
    }
}
WeekWorkingTimesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
WeekWorkingTimesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: WeekWorkingTimesDirective, selector: "ejs-gantt>e-week-working-times", queries: [{ propertyName: "children", predicate: WeekWorkingTimeDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: WeekWorkingTimesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-week-working-times',
                    queries: {
                        children: new ContentChildren(WeekWorkingTimeDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$1 = ['cssClass', 'from', 'label', 'to'];
let outputs$2 = [];
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'></e-holiday>
 *     <e-holiday from='05/15/2018' label='Holiday 2'></e-holiday>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
class HolidayDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$2);
        this.directivePropList = input$1;
    }
}
HolidayDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidayDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
HolidayDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HolidayDirective, selector: "ejs-gantt>e-holidays>e-holidays", inputs: { cssClass: "cssClass", from: "from", label: "label", to: "to" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidayDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-holidays>e-holidays',
                    inputs: input$1,
                    outputs: outputs$2,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Holiday Array Directive
 * @private
 */
class HolidaysDirective extends ArrayBase {
    constructor() {
        super('holidays');
    }
}
HolidaysDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidaysDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
HolidaysDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HolidaysDirective, selector: "ejs-gantt>e-holidays", queries: [{ propertyName: "children", predicate: HolidayDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidaysDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-holidays',
                    queries: {
                        children: new ContentChildren(HolidayDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input = ['cssClass', 'day', 'label', 'top'];
let outputs$1 = [];
/**
 * `e-event-markers` directive represent a event marker collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'></e-event-marker>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
class EventMarkerDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$1);
        this.directivePropList = input;
    }
}
EventMarkerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkerDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
EventMarkerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EventMarkerDirective, selector: "ejs-gantt>e-event-markers>e-event-marker", inputs: { cssClass: "cssClass", day: "day", label: "label", top: "top" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-event-markers>e-event-marker',
                    inputs: input,
                    outputs: outputs$1,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * EventMarker Array Directive
 * @private
 */
class EventMarkersDirective extends ArrayBase {
    constructor() {
        super('eventmarkers');
    }
}
EventMarkersDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkersDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EventMarkersDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EventMarkersDirective, selector: "ejs-gantt>e-event-markers", queries: [{ propertyName: "children", predicate: EventMarkerDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-event-markers',
                    queries: {
                        children: new ContentChildren(EventMarkerDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs = ['addDialogFields', 'allowExcelExport', 'allowFiltering', 'allowKeyboard', 'allowParentDependency', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTaskbarDragAndDrop', 'allowTaskbarOverlap', 'allowUnscheduledTasks', 'autoCalculateDateScheduling', 'autoFocusTasks', 'autoUpdatePredecessorOffset', 'baselineColor', 'calendarSettings', 'collapseAllParentTasks', 'columnMenuItems', 'columns', 'connectorLineBackground', 'connectorLineWidth', 'contextMenuItems', 'dataSource', 'dateFormat', 'dayWorkingTime', 'disableHtmlEncode', 'durationUnit', 'editDialogFields', 'editSettings', 'emptyRecordTemplate', 'enableAdaptiveUI', 'enableAutoWbsUpdate', 'enableContextMenu', 'enableCriticalPath', 'enableHover', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableMultiTaskbar', 'enablePersistence', 'enablePredecessorValidation', 'enableRtl', 'enableTimelineVirtualization', 'enableUndoRedo', 'enableVirtualMaskRow', 'enableVirtualization', 'enableWBS', 'eventMarkers', 'filterSettings', 'frozenColumns', 'gridLines', 'height', 'highlightWeekends', 'holidays', 'includeWeekend', 'labelSettings', 'loadChildOnDemand', 'loadingIndicator', 'locale', 'milestoneTemplate', 'parentTaskbarTemplate', 'projectEndDate', 'projectStartDate', 'query', 'readOnly', 'renderBaseline', 'resourceFields', 'resourceIDMapping', 'resourceNameMapping', 'resources', 'rowHeight', 'searchSettings', 'segmentData', 'selectedRowIndex', 'selectionSettings', 'showColumnMenu', 'showInlineNotes', 'showOverAllocation', 'sortSettings', 'splitterSettings', 'taskFields', 'taskMode', 'taskType', 'taskbarHeight', 'taskbarTemplate', 'timelineSettings', 'timelineTemplate', 'timezone', 'toolbar', 'tooltipSettings', 'treeColumnIndex', 'undoRedoActions', 'undoRedoStepsCount', 'updateOffsetOnTaskbarEdit', 'validateManualTasksOnLinking', 'viewType', 'weekWorkingTime', 'width', 'workUnit', 'workWeek', 'zoomingLevels'];
const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeDataBound', 'beforeExcelExport', 'beforePdfExport', 'beforeTooltipRender', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSelected', 'cellSelecting', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataStateChange', 'destroyed', 'endEdit', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'onMouseMove', 'onTaskbarClick', 'pdfColumnHeaderQueryCellInfo', 'pdfExportComplete', 'pdfQueryCellInfo', 'pdfQueryTaskbarInfo', 'pdfQueryTimelineCellInfo', 'queryCellInfo', 'queryTaskbarInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'splitterResizeStart', 'splitterResized', 'splitterResizing', 'taskbarEdited', 'taskbarEditing', 'toolbarClick', 'dataSourceChange'];
const twoWays = ['dataSource'];
/**
 * `ejs-gantt` represents the Angular Gantt Component.
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'></ejs-gantt>
 * ```
 */
let GanttComponent = class GanttComponent extends Gantt {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['columns', 'addDialogFields', 'editDialogFields', 'dayWorkingTime', 'weekWorkingTime', 'holidays', 'eventMarkers'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('GanttFilter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
        try {
            let mod = this.injector.get('GanttSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_b) { }
        try {
            let mod = this.injector.get('GanttSort');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_c) { }
        try {
            let mod = this.injector.get('GanttReorder');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_d) { }
        try {
            let mod = this.injector.get('GanttResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_e) { }
        try {
            let mod = this.injector.get('GanttEdit');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_f) { }
        try {
            let mod = this.injector.get('GanttDayMarkers');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_g) { }
        try {
            let mod = this.injector.get('GanttToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_h) { }
        try {
            let mod = this.injector.get('GanttContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_j) { }
        try {
            let mod = this.injector.get('GanttExcelExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_k) { }
        try {
            let mod = this.injector.get('GanttRowDD');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_l) { }
        try {
            let mod = this.injector.get('GanttColumnMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_m) { }
        try {
            let mod = this.injector.get('GanttPdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_o) { }
        try {
            let mod = this.injector.get('GanttVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_p) { }
        try {
            let mod = this.injector.get('GanttCriticalPath');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_q) { }
        try {
            let mod = this.injector.get('GanttUndoRedo');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_r) { }
        try {
            let mod = this.injector.get('GanttFreeze');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_s) { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childColumns;
        if (this.childAddDialogFields) {
            this.tagObjects[1].instance = this.childAddDialogFields;
        }
        if (this.childEditDialogFields) {
            this.tagObjects[2].instance = this.childEditDialogFields;
        }
        if (this.childDayWorkingTime) {
            this.tagObjects[3].instance = this.childDayWorkingTime;
        }
        if (this.childWeekWorkingTime) {
            this.tagObjects[4].instance = this.childWeekWorkingTime;
        }
        if (this.childHolidays) {
            this.tagObjects[5].instance = this.childHolidays;
        }
        if (this.childEventMarkers) {
            this.tagObjects[6].instance = this.childEventMarkers;
        }
        this.context.ngAfterContentChecked(this);
    }
};
GanttComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
GanttComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: GanttComponent, selector: "ejs-gantt", inputs: { addDialogFields: "addDialogFields", allowExcelExport: "allowExcelExport", allowFiltering: "allowFiltering", allowKeyboard: "allowKeyboard", allowParentDependency: "allowParentDependency", allowPdfExport: "allowPdfExport", allowReordering: "allowReordering", allowResizing: "allowResizing", allowRowDragAndDrop: "allowRowDragAndDrop", allowSelection: "allowSelection", allowSorting: "allowSorting", allowTaskbarDragAndDrop: "allowTaskbarDragAndDrop", allowTaskbarOverlap: "allowTaskbarOverlap", allowUnscheduledTasks: "allowUnscheduledTasks", autoCalculateDateScheduling: "autoCalculateDateScheduling", autoFocusTasks: "autoFocusTasks", autoUpdatePredecessorOffset: "autoUpdatePredecessorOffset", baselineColor: "baselineColor", calendarSettings: "calendarSettings", collapseAllParentTasks: "collapseAllParentTasks", columnMenuItems: "columnMenuItems", columns: "columns", connectorLineBackground: "connectorLineBackground", connectorLineWidth: "connectorLineWidth", contextMenuItems: "contextMenuItems", dataSource: "dataSource", dateFormat: "dateFormat", dayWorkingTime: "dayWorkingTime", disableHtmlEncode: "disableHtmlEncode", durationUnit: "durationUnit", editDialogFields: "editDialogFields", editSettings: "editSettings", emptyRecordTemplate: "emptyRecordTemplate", enableAdaptiveUI: "enableAdaptiveUI", enableAutoWbsUpdate: "enableAutoWbsUpdate", enableContextMenu: "enableContextMenu", enableCriticalPath: "enableCriticalPath", enableHover: "enableHover", enableHtmlSanitizer: "enableHtmlSanitizer", enableImmutableMode: "enableImmutableMode", enableMultiTaskbar: "enableMultiTaskbar", enablePersistence: "enablePersistence", enablePredecessorValidation: "enablePredecessorValidation", enableRtl: "enableRtl", enableTimelineVirtualization: "enableTimelineVirtualization", enableUndoRedo: "enableUndoRedo", enableVirtualMaskRow: "enableVirtualMaskRow", enableVirtualization: "enableVirtualization", enableWBS: "enableWBS", eventMarkers: "eventMarkers", filterSettings: "filterSettings", frozenColumns: "frozenColumns", gridLines: "gridLines", height: "height", highlightWeekends: "highlightWeekends", holidays: "holidays", includeWeekend: "includeWeekend", labelSettings: "labelSettings", loadChildOnDemand: "loadChildOnDemand", loadingIndicator: "loadingIndicator", locale: "locale", milestoneTemplate: "milestoneTemplate", parentTaskbarTemplate: "parentTaskbarTemplate", projectEndDate: "projectEndDate", projectStartDate: "projectStartDate", query: "query", readOnly: "readOnly", renderBaseline: "renderBaseline", resourceFields: "resourceFields", resourceIDMapping: "resourceIDMapping", resourceNameMapping: "resourceNameMapping", resources: "resources", rowHeight: "rowHeight", searchSettings: "searchSettings", segmentData: "segmentData", selectedRowIndex: "selectedRowIndex", selectionSettings: "selectionSettings", showColumnMenu: "showColumnMenu", showInlineNotes: "showInlineNotes", showOverAllocation: "showOverAllocation", sortSettings: "sortSettings", splitterSettings: "splitterSettings", taskFields: "taskFields", taskMode: "taskMode", taskType: "taskType", taskbarHeight: "taskbarHeight", taskbarTemplate: "taskbarTemplate", timelineSettings: "timelineSettings", timelineTemplate: "timelineTemplate", timezone: "timezone", toolbar: "toolbar", tooltipSettings: "tooltipSettings", treeColumnIndex: "treeColumnIndex", undoRedoActions: "undoRedoActions", undoRedoStepsCount: "undoRedoStepsCount", updateOffsetOnTaskbarEdit: "updateOffsetOnTaskbarEdit", validateManualTasksOnLinking: "validateManualTasksOnLinking", viewType: "viewType", weekWorkingTime: "weekWorkingTime", width: "width", workUnit: "workUnit", workWeek: "workWeek", zoomingLevels: "zoomingLevels" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeDataBound: "beforeDataBound", beforeExcelExport: "beforeExcelExport", beforePdfExport: "beforePdfExport", beforeTooltipRender: "beforeTooltipRender", cellDeselected: "cellDeselected", cellDeselecting: "cellDeselecting", cellEdit: "cellEdit", cellSave: "cellSave", cellSelected: "cellSelected", cellSelecting: "cellSelecting", collapsed: "collapsed", collapsing: "collapsing", columnDrag: "columnDrag", columnDragStart: "columnDragStart", columnDrop: "columnDrop", columnMenuClick: "columnMenuClick", columnMenuOpen: "columnMenuOpen", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataBound: "dataBound", dataStateChange: "dataStateChange", destroyed: "destroyed", endEdit: "endEdit", excelExportComplete: "excelExportComplete", excelHeaderQueryCellInfo: "excelHeaderQueryCellInfo", excelQueryCellInfo: "excelQueryCellInfo", expanded: "expanded", expanding: "expanding", headerCellInfo: "headerCellInfo", load: "load", onMouseMove: "onMouseMove", onTaskbarClick: "onTaskbarClick", pdfColumnHeaderQueryCellInfo: "pdfColumnHeaderQueryCellInfo", pdfExportComplete: "pdfExportComplete", pdfQueryCellInfo: "pdfQueryCellInfo", pdfQueryTaskbarInfo: "pdfQueryTaskbarInfo", pdfQueryTimelineCellInfo: "pdfQueryTimelineCellInfo", queryCellInfo: "queryCellInfo", queryTaskbarInfo: "queryTaskbarInfo", recordDoubleClick: "recordDoubleClick", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", rowDataBound: "rowDataBound", rowDeselected: "rowDeselected", rowDeselecting: "rowDeselecting", rowDrag: "rowDrag", rowDragStart: "rowDragStart", rowDragStartHelper: "rowDragStartHelper", rowDrop: "rowDrop", rowSelected: "rowSelected", rowSelecting: "rowSelecting", splitterResizeStart: "splitterResizeStart", splitterResized: "splitterResized", splitterResizing: "splitterResizing", taskbarEdited: "taskbarEdited", taskbarEditing: "taskbarEditing", toolbarClick: "toolbarClick", dataSourceChange: "dataSourceChange" }, queries: [{ propertyName: "parentTaskbarTemplate", first: true, predicate: ["parentTaskbarTemplate"], descendants: true }, { propertyName: "timelineTemplate", first: true, predicate: ["timelineTemplate"], descendants: true }, { propertyName: "milestoneTemplate", first: true, predicate: ["milestoneTemplate"], descendants: true }, { propertyName: "taskbarTemplate", first: true, predicate: ["taskbarTemplate"], descendants: true }, { propertyName: "editTemplate", first: true, predicate: ["editTemplate"], descendants: true }, { propertyName: "labelSettings_rightLabel", first: true, predicate: ["labelSettingsRightLabel"], descendants: true }, { propertyName: "labelSettings_leftLabel", first: true, predicate: ["labelSettingsLeftLabel"], descendants: true }, { propertyName: "labelSettings_taskLabel", first: true, predicate: ["labelSettingsTaskLabel"], descendants: true }, { propertyName: "tooltipSettings_taskbar", first: true, predicate: ["tooltipSettingsTaskbar"], descendants: true }, { propertyName: "tooltipSettings_baseline", first: true, predicate: ["tooltipSettingsBaseline"], descendants: true }, { propertyName: "tooltipSettings_connectorLine", first: true, predicate: ["tooltipSettingsConnectorLine"], descendants: true }, { propertyName: "tooltipSettings_editing", first: true, predicate: ["tooltipSettingsEditing"], descendants: true }, { propertyName: "tooltipSettings_timeline", first: true, predicate: ["tooltipSettingsTimeline"], descendants: true }, { propertyName: "filter_itemTemplate", first: true, predicate: ["filterItemTemplate"], descendants: true }, { propertyName: "filterTemplate", first: true, predicate: ["filterTemplate"], descendants: true }, { propertyName: "emptyRecordTemplate", first: true, predicate: ["emptyRecordTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }, { propertyName: "childAddDialogFields", first: true, predicate: AddDialogFieldsDirective, descendants: true }, { propertyName: "childEditDialogFields", first: true, predicate: EditDialogFieldsDirective, descendants: true }, { propertyName: "childDayWorkingTime", first: true, predicate: DayWorkingTimeCollectionDirective, descendants: true }, { propertyName: "childWeekWorkingTime", first: true, predicate: WeekWorkingTimesDirective, descendants: true }, { propertyName: "childHolidays", first: true, predicate: HolidaysDirective, descendants: true }, { propertyName: "childEventMarkers", first: true, predicate: EventMarkersDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], GanttComponent.prototype, "parentTaskbarTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "timelineTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "milestoneTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "taskbarTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "editTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "labelSettings_rightLabel", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "labelSettings_leftLabel", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "labelSettings_taskLabel", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_taskbar", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_baseline", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_connectorLine", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_editing", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_timeline", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "filter_itemTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "filterTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "emptyRecordTemplate", void 0);
GanttComponent = __decorate([
    ComponentMixins([ComponentBase])
], GanttComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-gantt',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective),
                        childAddDialogFields: new ContentChild(AddDialogFieldsDirective),
                        childEditDialogFields: new ContentChild(EditDialogFieldsDirective),
                        childDayWorkingTime: new ContentChild(DayWorkingTimeCollectionDirective),
                        childWeekWorkingTime: new ContentChild(WeekWorkingTimesDirective),
                        childHolidays: new ContentChild(HolidaysDirective),
                        childEventMarkers: new ContentChild(EventMarkersDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { parentTaskbarTemplate: [{
                type: ContentChild,
                args: ['parentTaskbarTemplate']
            }], timelineTemplate: [{
                type: ContentChild,
                args: ['timelineTemplate']
            }], milestoneTemplate: [{
                type: ContentChild,
                args: ['milestoneTemplate']
            }], taskbarTemplate: [{
                type: ContentChild,
                args: ['taskbarTemplate']
            }], editTemplate: [{
                type: ContentChild,
                args: ['editTemplate']
            }], labelSettings_rightLabel: [{
                type: ContentChild,
                args: ['labelSettingsRightLabel']
            }], labelSettings_leftLabel: [{
                type: ContentChild,
                args: ['labelSettingsLeftLabel']
            }], labelSettings_taskLabel: [{
                type: ContentChild,
                args: ['labelSettingsTaskLabel']
            }], tooltipSettings_taskbar: [{
                type: ContentChild,
                args: ['tooltipSettingsTaskbar']
            }], tooltipSettings_baseline: [{
                type: ContentChild,
                args: ['tooltipSettingsBaseline']
            }], tooltipSettings_connectorLine: [{
                type: ContentChild,
                args: ['tooltipSettingsConnectorLine']
            }], tooltipSettings_editing: [{
                type: ContentChild,
                args: ['tooltipSettingsEditing']
            }], tooltipSettings_timeline: [{
                type: ContentChild,
                args: ['tooltipSettingsTimeline']
            }], filter_itemTemplate: [{
                type: ContentChild,
                args: ['filterItemTemplate']
            }], filterTemplate: [{
                type: ContentChild,
                args: ['filterTemplate']
            }], emptyRecordTemplate: [{
                type: ContentChild,
                args: ['emptyRecordTemplate']
            }] } });

/**
 * NgModule definition for the Gantt component.
 */
class GanttModule {
}
GanttModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GanttModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, declarations: [GanttComponent,
        ColumnDirective,
        ColumnsDirective,
        AddDialogFieldDirective,
        AddDialogFieldsDirective,
        EditDialogFieldDirective,
        EditDialogFieldsDirective,
        DayWorkingTimeDirective,
        DayWorkingTimeCollectionDirective,
        WeekWorkingTimeDirective,
        WeekWorkingTimesDirective,
        HolidayDirective,
        HolidaysDirective,
        EventMarkerDirective,
        EventMarkersDirective], imports: [CommonModule], exports: [GanttComponent,
        ColumnDirective,
        ColumnsDirective,
        AddDialogFieldDirective,
        AddDialogFieldsDirective,
        EditDialogFieldDirective,
        EditDialogFieldsDirective,
        DayWorkingTimeDirective,
        DayWorkingTimeCollectionDirective,
        WeekWorkingTimeDirective,
        WeekWorkingTimesDirective,
        HolidayDirective,
        HolidaysDirective,
        EventMarkerDirective,
        EventMarkersDirective] });
GanttModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        GanttComponent,
                        ColumnDirective,
                        ColumnsDirective,
                        AddDialogFieldDirective,
                        AddDialogFieldsDirective,
                        EditDialogFieldDirective,
                        EditDialogFieldsDirective,
                        DayWorkingTimeDirective,
                        DayWorkingTimeCollectionDirective,
                        WeekWorkingTimeDirective,
                        WeekWorkingTimesDirective,
                        HolidayDirective,
                        HolidaysDirective,
                        EventMarkerDirective,
                        EventMarkersDirective
                    ],
                    exports: [
                        GanttComponent,
                        ColumnDirective,
                        ColumnsDirective,
                        AddDialogFieldDirective,
                        AddDialogFieldsDirective,
                        EditDialogFieldDirective,
                        EditDialogFieldsDirective,
                        DayWorkingTimeDirective,
                        DayWorkingTimeCollectionDirective,
                        WeekWorkingTimeDirective,
                        WeekWorkingTimesDirective,
                        HolidayDirective,
                        HolidaysDirective,
                        EventMarkerDirective,
                        EventMarkersDirective
                    ]
                }]
        }] });

const FilterService = { provide: 'GanttFilter', useValue: Filter };
const SelectionService = { provide: 'GanttSelection', useValue: Selection };
const SortService = { provide: 'GanttSort', useValue: Sort };
const ReorderService = { provide: 'GanttReorder', useValue: Reorder };
const ResizeService = { provide: 'GanttResize', useValue: Resize };
const EditService = { provide: 'GanttEdit', useValue: Edit };
const DayMarkersService = { provide: 'GanttDayMarkers', useValue: DayMarkers };
const ToolbarService = { provide: 'GanttToolbar', useValue: Toolbar };
const ContextMenuService = { provide: 'GanttContextMenu', useValue: ContextMenu };
const ExcelExportService = { provide: 'GanttExcelExport', useValue: ExcelExport };
const RowDDService = { provide: 'GanttRowDD', useValue: RowDD };
const ColumnMenuService = { provide: 'GanttColumnMenu', useValue: ColumnMenu };
const PdfExportService = { provide: 'GanttPdfExport', useValue: PdfExport };
const VirtualScrollService = { provide: 'GanttVirtualScroll', useValue: VirtualScroll };
const CriticalPathService = { provide: 'GanttCriticalPath', useValue: CriticalPath };
const UndoRedoService = { provide: 'GanttUndoRedo', useValue: UndoRedo };
const FreezeService = { provide: 'GanttFreeze', useValue: Freeze };
/**
 * NgModule definition for the Gantt component with providers.
 */
class GanttAllModule {
}
GanttAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GanttAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, imports: [CommonModule, GanttModule], exports: [GanttModule] });
GanttAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, providers: [
        FilterService,
        SelectionService,
        SortService,
        ReorderService,
        ResizeService,
        EditService,
        DayMarkersService,
        ToolbarService,
        ContextMenuService,
        ExcelExportService,
        RowDDService,
        ColumnMenuService,
        PdfExportService,
        VirtualScrollService,
        CriticalPathService,
        UndoRedoService,
        FreezeService
    ], imports: [[CommonModule, GanttModule], GanttModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, GanttModule],
                    exports: [
                        GanttModule
                    ],
                    providers: [
                        FilterService,
                        SelectionService,
                        SortService,
                        ReorderService,
                        ResizeService,
                        EditService,
                        DayMarkersService,
                        ToolbarService,
                        ContextMenuService,
                        ExcelExportService,
                        RowDDService,
                        ColumnMenuService,
                        PdfExportService,
                        VirtualScrollService,
                        CriticalPathService,
                        UndoRedoService,
                        FreezeService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AddDialogFieldDirective, AddDialogFieldsDirective, ColumnDirective, ColumnMenuService, ColumnsDirective, ContextMenuService, CriticalPathService, DayMarkersService, DayWorkingTimeCollectionDirective, DayWorkingTimeDirective, EditDialogFieldDirective, EditDialogFieldsDirective, EditService, EventMarkerDirective, EventMarkersDirective, ExcelExportService, FilterService, FreezeService, GanttAllModule, GanttComponent, GanttModule, HolidayDirective, HolidaysDirective, PdfExportService, ReorderService, ResizeService, RowDDService, SelectionService, SortService, ToolbarService, UndoRedoService, VirtualScrollService, WeekWorkingTimeDirective, WeekWorkingTimesDirective };
//# sourceMappingURL=syncfusion-ej2-angular-gantt.mjs.map
