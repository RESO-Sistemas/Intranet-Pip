import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { SmartTextArea } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular Smart TextArea Component.
 * ```html
 * <ejs-smarttextarea></ejs-smarttextarea>
 * ```
 */
export declare class SmartTextAreaComponent extends SmartTextArea implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    afterSuggestionInsert: any;
    beforeSuggestionInsert: any;
    blur: any;
    change: any;
    created: any;
    destroyed: any;
    focus: any;
    input: any;
    valueChange: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartTextAreaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SmartTextAreaComponent, "ejs-smarttextarea", never, { "UserPhrases": "UserPhrases"; "adornmentFlow": "adornmentFlow"; "adornmentOrientation": "adornmentOrientation"; "aiSuggestionHandler": "aiSuggestionHandler"; "appendTemplate": "appendTemplate"; "cols": "cols"; "cssClass": "cssClass"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enabled": "enabled"; "floatLabelType": "floatLabelType"; "htmlAttributes": "htmlAttributes"; "locale": "locale"; "maxLength": "maxLength"; "placeholder": "placeholder"; "prependTemplate": "prependTemplate"; "readonly": "readonly"; "resizeMode": "resizeMode"; "rows": "rows"; "showClearButton": "showClearButton"; "showSuggestionOnPopup": "showSuggestionOnPopup"; "userRole": "userRole"; "value": "value"; "width": "width"; }, { "afterSuggestionInsert": "afterSuggestionInsert"; "beforeSuggestionInsert": "beforeSuggestionInsert"; "blur": "blur"; "change": "change"; "created": "created"; "destroyed": "destroyed"; "focus": "focus"; "input": "input"; "valueChange": "valueChange"; }, never, never>;
}
