import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-initialShapeSelections>
 * <e-initialShapeSelection>
 * </e-initialShapeSelection>
 * </e-initialShapeSelections>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class InitialShapeSelectionDirective extends ComplexBase<InitialShapeSelectionDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Gets or sets the property name from the data source in maps.
     * @default null
     */
    shapePath: any;
    /**
     * Gets or sets the value from the data source which is bound to the shape in maps.
     * @default null
     */
    shapeValue: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<InitialShapeSelectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InitialShapeSelectionDirective, "e-layer>e-initialShapeSelections>e-initialShapeSelection", never, { "shapePath": "shapePath"; "shapeValue": "shapeValue"; }, {}, never>;
}
/**
 * InitialShapeSelection Array Directive
 * @private
 */
export declare class InitialShapeSelectionsDirective extends ArrayBase<InitialShapeSelectionsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<InitialShapeSelectionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InitialShapeSelectionsDirective, "e-layer>e-initialShapeSelections", never, {}, {}, ["children"]>;
}
