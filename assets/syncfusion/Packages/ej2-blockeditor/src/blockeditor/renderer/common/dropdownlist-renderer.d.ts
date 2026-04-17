import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { BlockEditor } from '../../base/index';
import { IDropDownListRenderOptions } from '../../../common/interface';
/**
 * `DropDownList renderer` module is used to render DropDownList in BlockEditor.
 *
 * @hidden
 */
export declare class DropDownListRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders DropDownList in BlockEditor.
     *
     * @param {IDropDownListRenderOptions} args - specifies  the arguments.
     * @returns {DropDownList} - returns the DropDownList object.
     * @hidden
     */
    renderDropDownList(args?: IDropDownListRenderOptions): DropDownList;
}
