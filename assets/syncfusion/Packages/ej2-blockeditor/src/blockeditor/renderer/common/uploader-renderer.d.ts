import { Uploader } from '@syncfusion/ej2-inputs';
import { BlockEditor } from '../../base/index';
import { IUploaderRendererOptions } from '../../../common/interface';
/**
 * `Uploader renderer` module is used to render Uploader control in BlockEditor.
 *
 * @hidden
 */
export declare class UploaderRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders the uploader control in BlockEditor.
     *
     * @param {IUploaderRendererOptions} args - specifies the arguments.
     * @returns {Uploader} - returns the uploader object.
     * @hidden
     */
    renderUploader(args?: IUploaderRendererOptions): Uploader;
}
