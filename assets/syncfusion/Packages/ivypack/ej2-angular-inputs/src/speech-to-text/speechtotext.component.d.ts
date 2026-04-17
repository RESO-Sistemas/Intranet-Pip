import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { SpeechToText } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular SpeechToText Component.
 * ```html
 * <button ejs-speechtotext ></button>
 * ```
 */
export declare class SpeechToTextComponent extends SpeechToText implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    created: any;
    onError: any;
    onStart: any;
    onStop: any;
    transcriptChanged: any;
    transcriptChange: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpeechToTextComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpeechToTextComponent, "[ejs-speechtotext]", never, { "allowInterimResults": "allowInterimResults"; "buttonSettings": "buttonSettings"; "cssClass": "cssClass"; "disabled": "disabled"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "htmlAttributes": "htmlAttributes"; "lang": "lang"; "listeningState": "listeningState"; "locale": "locale"; "showTooltip": "showTooltip"; "tooltipSettings": "tooltipSettings"; "transcript": "transcript"; }, { "created": "created"; "onError": "onError"; "onStart": "onStart"; "onStop": "onStop"; "transcriptChanged": "transcriptChanged"; "transcriptChange": "transcriptChange"; }, never, ["*"]>;
}
