import { Dialog } from '@syncfusion/ej2-popups';
import { BlockEditor } from '../../base/index';
import { IDialogRenderOptions } from '../../../common/interface';
/**
 * `Dialog renderer` module is used to render dialog popups in BlockEditor.
 *
 * @hidden
 */
export declare class DialogRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders Dialog in BlockEditor.
     *
     * @param {IDialogRenderOptions} args - specifies  the arguments.
     * @returns {Dialog} - returns the Dialog object.
     * @hidden
     */
    renderDialog(args?: IDialogRenderOptions): Dialog;
}
