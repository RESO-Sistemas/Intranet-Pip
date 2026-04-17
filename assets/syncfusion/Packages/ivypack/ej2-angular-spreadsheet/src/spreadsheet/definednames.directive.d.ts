import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-definedname` directive represent a defined name of the Angular Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```html
 * <ejs-spreadsheet>
 *   <e-definednames>
 *    <e-definedname></e-definedname>
 *    <e-definedname></e-definedname>
 *   </e-definednames>
 * </ejs-spreadsheet>
 * ```
 */
export declare class DefinedNameDirective extends ComplexBase<DefinedNameDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Provides a comment or description for the defined name.
     * @default ''
     */
    comment: any;
    /**
     * Specifies a unique name for the defined name, which can be used in formulas.
     * @default ''
     */
    name: any;
    /**
     * Specifies the cell or range reference associated with the defined name.
     * The reference can be provided with or without the `=` prefix.
     * @default ''
     */
    refersTo: any;
    /**
     * Defines the scope of the name.
     * If not specified, the name is scoped to the entire workbook.
     * If a sheet name is provided, the name will be available only within that specific sheet.
     * @default ''
     */
    scope: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<DefinedNameDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefinedNameDirective, "e-definednames>e-definedname", never, { "comment": "comment"; "name": "name"; "refersTo": "refersTo"; "scope": "scope"; }, {}, never>;
}
/**
 * DefinedName Array Directive
 * @private
 */
export declare class DefinedNamesDirective extends ArrayBase<DefinedNamesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<DefinedNamesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefinedNamesDirective, "ejs-spreadsheet>e-definednames", never, {}, {}, ["children"]>;
}
