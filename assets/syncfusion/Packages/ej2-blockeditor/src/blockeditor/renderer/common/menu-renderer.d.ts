import { Menu, ContextMenu } from '@syncfusion/ej2-navigations';
import { BlockEditor } from '../../base/index';
import { IMenubarRenderOptions } from '../../../common/interface';
/**
 * `Menu renderer` module is used to render menus in BlockEditor.
 *
 * @hidden
 */
export declare class MenuBarRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders Menu in BlockEditor.
     *
     * @param {IMenubarRenderOptions} args - specifies  the arguments.
     * @returns {Menu} - returns the Menu object.
     * @hidden
     */
    renderMenubar(args?: IMenubarRenderOptions): Menu;
    /**
     * Renders ContextMenu in BlockEditor.
     *
     * @param {IMenubarRenderOptions} args - specifies  the arguments.
     * @returns {Menu} - returns the Menu object.
     * @hidden
     */
    renderContextMenu(args?: IMenubarRenderOptions): ContextMenu;
}
