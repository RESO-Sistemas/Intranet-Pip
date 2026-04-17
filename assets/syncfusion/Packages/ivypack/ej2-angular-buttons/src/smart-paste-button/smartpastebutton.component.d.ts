import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { SmartPasteButton } from '@syncfusion/ej2-buttons';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular Smart Paste Button Component.
 * ```html
 * <button ejs-smart-paste-button content='Smart paste'></button>
 * ```
 */
export declare class SmartPasteButtonComponent extends SmartPasteButton implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    created: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartPasteButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SmartPasteButtonComponent, "[ejs-smart-paste-button]", never, { "aiAssistHandler": "aiAssistHandler"; "content": "content"; "cssClass": "cssClass"; "disabled": "disabled"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "iconCss": "iconCss"; "iconPosition": "iconPosition"; "isPrimary": "isPrimary"; "isToggle": "isToggle"; "locale": "locale"; }, { "created": "created"; }, never, ["*"]>;
}
