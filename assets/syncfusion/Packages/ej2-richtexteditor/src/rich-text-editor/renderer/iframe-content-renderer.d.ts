import { ContentRender } from '../renderer/content-renderer';
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
export declare class IframeContentRender extends ContentRender {
    private styles;
    private IFRAMEHEADER;
    private getEditorStyles;
    renderPanel(): void;
    private setThemeColor;
    /**
     * Get the editable element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden
     * @deprecated
     */
    getEditPanel(): Element;
    /**
     * Get the document of RichTextEditor
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getDocument(): Document;
}
