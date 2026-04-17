import { BlockEditor } from '../../base/blockeditor';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import { IColorPickerRenderOptions } from '../../../common/interface';
export declare class ColorPickerRenderer {
    private editor;
    constructor(editor: BlockEditor);
    /**
     * Renders the colorpicker with the specified options.
     *
     * @param {IColorPickerRenderOptions} args - The options for rendering the colorpicker.
     * @returns {ColorPicker} - The rendered colorpicker instance.
     * @hidden
     */
    renderColorPicker(args: IColorPickerRenderOptions): ColorPicker;
    updatePickerProperties(picker: ColorPicker, model: any): void;
}
