import { Tab } from '@syncfusion/ej2-navigations';
import { BlockEditor } from '../../base/index';
import { ITabRendererOptions } from '../../../common/interface';
/**
 * `Tab renderer` module is used to render Tab control in BlockEditor.
 *
 * @hidden
 */
export declare class TabRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders the tab control in BlockEditor.
     *
     * @param {ITabRendererOptions} args - specifies the arguments.
     * @returns {Tab} - returns the tab object.
     * @hidden
     */
    renderTab(args?: ITabRendererOptions): Tab;
}
