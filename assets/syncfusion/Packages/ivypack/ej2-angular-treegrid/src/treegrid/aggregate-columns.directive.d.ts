import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the Angular TreeGrid.
 * ```html
 * <ejs-treegrid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'></e-column>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-treegrid>
 * ```
 */
export declare class AggregateColumnDirective extends ComplexBase<AggregateColumnDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the aggregate type(s) for a particular column.
     * To apply multiple aggregates to a single column, specify the `type` as an array.
     * Available aggregate types include:
     * * `sum`: Calculates the sum of all values in a column.
     * * `average`: Computes the average of the column values.
     * * `max`: Finds the maximum value in a column.
     * * `min`: Finds the minimum value in a column.
     * * `count`: Counts the number of records.
     * * `falsecount`: Counts the number of false values.
     * * `truecount`: Counts the number of true values.
     * * `custom`: Allows for a custom aggregate function.
     *
     * Use `custom` to specify a custom aggregation.
     *
     * @asptype string
     * @default null
     */
    type: any;
    /**
     * Specifies the column name to display the aggregate value. If not defined, the `field` name is used by default.
     * @default null
     */
    columnName: any;
    /**
     * Defines a custom function to calculate the aggregate value. The `type` must be set to `custom`.
     * Use the custom value as `${custom}` in templates.
     * * `Total aggregation`: The custom function is called with the entire dataset and the current `AggregateColumn` object.
     * * `Group aggregation`: It is called with the current group details and the `AggregateColumn` object.
     * @default null
     */
    customAggregate: any;
    /**
     * Specifies the column name on which to perform the aggregation.
     * @default null
     */
    field: any;
    /**
     * Specifies the format to be applied to the calculated aggregate value before display.
     * Supports both standard and custom formats for numbers and dates.
     * Refer to the Syncfusion documentation for [number](https://ej2.syncfusion.com/documentation/common/internationalization/#supported-format-string)
     * and [date](https://ej2.syncfusion.com/documentation/common/internationalization#date-formatting) formats.
     * @asptype string
     * @default null
     */
    format: any;
    /**
     * Defines a template for the footer cell of the aggregate column.
     * Use the aggregate `type` names within the template to access aggregate values.
     * @default null
     * @asptype string

     */
    footerTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AggregateColumnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AggregateColumnDirective, "ejs-treegrid>e-aggregates>e-aggregate>e-columns>e-column", never, { "columnName": "columnName"; "customAggregate": "customAggregate"; "field": "field"; "footerTemplate": "footerTemplate"; "format": "format"; "type": "type"; }, {}, ["footerTemplate"]>;
}
/**
 * AggregateColumn Array Directive
 * @private
 */
export declare class AggregateColumnsDirective extends ArrayBase<AggregateColumnsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AggregateColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AggregateColumnsDirective, "ejs-treegrid>e-aggregates>e-aggregate>e-columns", never, {}, {}, ["children"]>;
}
