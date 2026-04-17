import { ProgressBar } from '@syncfusion/ej2-progressbar';
import { BlockEditor } from '../../base/index';
import { IProgressBarRendererOptions } from '../../../common/interface';
/**
 * `Progressbar renderer` module is used to render Progressbar control in BlockEditor.
 *
 * @hidden
 */
export declare class ProgressBarRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders the progressbar control in BlockEditor.
     *
     * @param {IProgressBarRendererOptions} args - specifies the arguments.
     * @returns {ProgressBar} - returns the progressbar object.
     * @hidden
     */
    renderProgressBar(args?: IProgressBarRendererOptions): ProgressBar;
}
