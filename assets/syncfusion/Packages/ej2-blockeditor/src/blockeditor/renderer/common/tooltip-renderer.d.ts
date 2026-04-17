import { Tooltip } from '@syncfusion/ej2-popups';
import { BlockEditor } from '../../base/index';
import { ITooltipRenderOptions } from '../../../common/interface';
/**
 * `Tooltip renderer` module is used to render Tooltip in BlockEditor.
 *
 * @hidden
 */
export declare class TooltipRenderer {
    private editor;
    constructor(editor?: BlockEditor);
    /**
     * Renders tooltip in BlockEditor.
     *
     * @param {ITooltipRenderOptions} args - specifies  the arguments.
     * @returns {Tooltip} - returns the Tooltip object.
     * @hidden
     */
    renderTooltip(args?: ITooltipRenderOptions): Tooltip;
    destroyTooltip(tooltip: Tooltip): void;
}
