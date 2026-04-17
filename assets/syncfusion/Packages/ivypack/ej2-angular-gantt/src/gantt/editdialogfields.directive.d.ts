import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
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
export declare class EditDialogFieldDirective extends ComplexBase<EditDialogFieldDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the types of tabs that contain editors for columns.
     * Available tab types:
     * * `General` - Represents the general information editor tab.
     * * `Dependency` - Represents the dependency editor tab.
     * * `Resources` - Represents the resource editor tab.
     * * `Notes` - Represents the notes editor tab.
     * * `Segments` - Represents the segments editor tab.
     * * `Custom` - Represents the custom column editor tab.
     * @default null
     */
    type: any;
    /**
     * Specifies the configuration properties for Grid, Rich Text Editor (RTE), or TreeGrid controls within the Gantt edit dialog.
     * @default null
     */
    additionalParams: any;
    /**
     * Specifies the edited column fields to be placed inside the tab.
     * @default null
     */
    fields: any;
    /**
     * Defines header text of tab item.
     * @default null
     */
    headerText: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<EditDialogFieldDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EditDialogFieldDirective, "ejs-gantt>e-edit-dialog-fields>e-edit-dialog-field", never, { "additionalParams": "additionalParams"; "fields": "fields"; "headerText": "headerText"; "type": "type"; }, {}, never>;
}
/**
 * EditDialogField Array Directive
 * @private
 */
export declare class EditDialogFieldsDirective extends ArrayBase<EditDialogFieldsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<EditDialogFieldsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EditDialogFieldsDirective, "ejs-gantt>e-edit-dialog-fields", never, {}, {}, ["children"]>;
}
