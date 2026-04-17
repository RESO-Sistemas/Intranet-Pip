import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
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
export declare class AddDialogFieldDirective extends ComplexBase<AddDialogFieldDirective> {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AddDialogFieldDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AddDialogFieldDirective, "ejs-gantt>e-add-dialog-fields>e-add-dialog-field", never, { "additionalParams": "additionalParams"; "fields": "fields"; "headerText": "headerText"; "type": "type"; }, {}, never>;
}
/**
 * AddDialogField Array Directive
 * @private
 */
export declare class AddDialogFieldsDirective extends ArrayBase<AddDialogFieldsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AddDialogFieldsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AddDialogFieldsDirective, "ejs-gantt>e-add-dialog-fields", never, {}, {}, ["children"]>;
}
