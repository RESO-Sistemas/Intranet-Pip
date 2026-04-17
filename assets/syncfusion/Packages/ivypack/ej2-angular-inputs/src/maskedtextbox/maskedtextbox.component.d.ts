import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular MaskedTextbox Component.
 * ```html
 * <ej-maskedtextbox [value]='value'></ej-maskedtextbox>
 * ```
 */
export declare class MaskedTextBoxComponent extends MaskedTextBox implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    blur: any;
    change: any;
    created: any;
    destroyed: any;
    focus: any;
    valueChange: any;
    /**
     * Specifies the HTML template string for custom elements to prepend to the MaskedTextBox input.
     * Supports icons, buttons, or any valid HTML. Updates dynamically on property change.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    prependTemplate: any;
    /**
     * Specifies the HTML template string for custom elements to append to the MaskedTextBox input.
     * Supports icons, buttons, or any valid HTML. Updates dynamically on property change.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    appendTemplate: any;
    private skipFromEvent;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector, cdr: ChangeDetectorRef);
    registerOnChange(registerFunction: (_: any) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaskedTextBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaskedTextBoxComponent, "ejs-maskedtextbox", never, { "appendTemplate": "appendTemplate"; "cssClass": "cssClass"; "customCharacters": "customCharacters"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enabled": "enabled"; "floatLabelType": "floatLabelType"; "htmlAttributes": "htmlAttributes"; "locale": "locale"; "mask": "mask"; "placeholder": "placeholder"; "prependTemplate": "prependTemplate"; "promptChar": "promptChar"; "readonly": "readonly"; "showClearButton": "showClearButton"; "value": "value"; "width": "width"; }, { "blur": "blur"; "change": "change"; "created": "created"; "destroyed": "destroyed"; "focus": "focus"; "valueChange": "valueChange"; }, ["prependTemplate", "appendTemplate"], never>;
}
