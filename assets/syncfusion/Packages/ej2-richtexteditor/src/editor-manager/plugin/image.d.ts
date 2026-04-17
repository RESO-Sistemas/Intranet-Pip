import { IHtmlItem } from './../base/interface';
import { IEditorModel } from '../../common/interface';
/**
 * Link internal component
 *
 * @hidden
 * @private
 */
export declare class ImageCommand {
    private parent;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {IEditorModel} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: IEditorModel);
    private addEventListener;
    private removeEventListener;
    /**
     * imageCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @private
     */
    imageCommand(e: IHtmlItem): void;
    private createImage;
    private setStyle;
    private calculateStyleValue;
    private insertImageLink;
    private openImageLink;
    private removeImageLink;
    private editImageLink;
    private removeImage;
    private insertAltTextImage;
    private imageDimension;
    private percToPix;
    private imageCaption;
    private imageJustifyLeft;
    private imageJustifyCenter;
    private imageJustifyRight;
    private imageLeftWrap;
    private imageRightWrap;
    private removeImageOrCaptionEleClass;
    private imageInline;
    private imageBreak;
    private callBack;
    destroy(): void;
}
