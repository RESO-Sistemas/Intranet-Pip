import { Mention } from '@syncfusion/ej2-dropdowns';
import { BlockEditor } from '../../base/index';
import { IMentionRenderOptions } from '../../../common/interface';
/**
 * `Mention renderer` module is used to render Mention control in BlockEditor.
 *
 * @hidden
 */
export declare class MentionRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders the mention control in BlockEditor.
     *
     * @param {IMentionRenderOptions} args - specifies  the arguments.
     * @returns {Mention} - returns the mention object.
     * @hidden
     */
    renderMention(args?: IMentionRenderOptions): Mention;
}
