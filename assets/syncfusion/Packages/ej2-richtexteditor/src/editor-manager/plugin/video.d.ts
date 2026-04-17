import { IHtmlItem } from './../base/interface';
import { IEditorModel } from '../../common/interface';
/**
 * Video internal component
 *
 * @hidden
 * @private
 */
export declare class VideoCommand {
    private parent;
    private vidElement;
    /**
     * Constructor for creating the Video plugin
     *
     * @param {IEditorModel} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: IEditorModel);
    private addEventListener;
    private removeEventListener;
    /**
     * videoCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @private
     */
    videoCommand(e: IHtmlItem): void;
    private wrapVideo;
    private createVideo;
    private setMediaElementCursor;
    private editAreaVideoClick;
    private setStyle;
    private videoDimension;
    private callBack;
    destroy(): void;
}
