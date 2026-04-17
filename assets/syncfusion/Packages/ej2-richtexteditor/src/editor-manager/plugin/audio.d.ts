import { IHtmlItem } from './../base/interface';
import { IEditorModel } from '../../common/interface';
/**
 * Audio internal component
 *
 * @hidden
 * @private
 */
export declare class AudioCommand {
    private parent;
    /**
     * Constructor for creating the Audio plugin
     *
     * @param {IEditorModel} parent - specifies the parent element
     * @hidden
     * @private
     */
    constructor(parent: IEditorModel);
    private addEventListener;
    private removeEventListener;
    /**
     * audioCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @private
     */
    audioCommand(e: IHtmlItem): void;
    private createAudio;
    private setMediaElementCursor;
    private setStyle;
    private callBack;
    destroy(): void;
}
