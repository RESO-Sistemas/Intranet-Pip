import { Toolbar } from '@syncfusion/ej2-navigations';
import { BlockEditor } from '../../base/blockeditor';
import { IToolbarRenderOptions } from '../../../common/interface';
export declare class ToolbarRenderer {
    private editor;
    private element;
    constructor(editor: BlockEditor);
    /**
     * Renders the toolbar with the specified options.
     *
     * @param {IToolbarRenderOptions} args - The options for rendering the toolbar.
     * @returns {Toolbar} - The rendered toolbar instance.
     * @hidden
     */
    renderToolbar(args: IToolbarRenderOptions): Toolbar;
    private handleInlineToolbarCreated;
    private handleInlineToolbarItemClick;
}
