import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { IRichTextEditor } from '../base/interface';
import { IHtmlKeyboardEvent } from '../../editor-manager/base/interface';
import { ServiceLocator } from '../services/service-locator';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
export declare class ViewSource {
    private parent;
    private contentModule;
    private rendererFactory;
    private keyboardModule;
    private previewElement;
    private codeViewTimeInterval;
    /**
     * Constructor for view source module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     * @param {ServiceLocator} locator - specifies the locator.
     * @returns {void}
     */
    constructor(parent?: IRichTextEditor, locator?: ServiceLocator);
    private addEventListener;
    private onInitialEnd;
    private removeEventListener;
    private getSourceCode;
    private wireEvent;
    private unWireEvent;
    private wireBaseKeyDown;
    private unWireBaseKeyDown;
    private mouseDownHandler;
    private previewKeyDown;
    private onKeyDown;
    /**
     * sourceCode method
     *
     * @param {ClickEventArgs} args - specifies the click event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    sourceCode(args?: ClickEventArgs | IHtmlKeyboardEvent): void;
    /**
     * updateSourceCode method
     *
     * @param {ClickEventArgs} args - specifies the click event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    updateSourceCode(args?: ClickEventArgs | KeyboardEventArgs): void;
    private replaceAmpersand;
    private maxLengthHandlingCodeview;
    private getHtmlTextLengthRegex;
    private onSourceCodePaste;
    private getTextAreaValue;
    /**
     * getPanel method
     *
     * @returns {HTMLTextAreaElement} - Specifies the Souce codetext area element.
     * @hidden
     * @deprecated
     */
    getPanel(): HTMLTextAreaElement;
    /**
     * Destroy the entire RichTextEditor.
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
}
