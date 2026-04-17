import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ColorPicker } from '@syncfusion/ej2-inputs';
var ColorPickerRenderer = /** @class */ (function () {
    function ColorPickerRenderer(editor) {
        this.editor = editor;
    }
    /**
     * Renders the colorpicker with the specified options.
     *
     * @param {IColorPickerRenderOptions} args - The options for rendering the colorpicker.
     * @returns {ColorPicker} - The rendered colorpicker instance.
     * @hidden
     */
    ColorPickerRenderer.prototype.renderColorPicker = function (args) {
        var isBackground = args.type === 'bgColor';
        var fontColor = this.editor.fontColorSettings;
        var bgColor = this.editor.backgroundColorSettings;
        var mode = isBackground ? (bgColor.mode) : (fontColor.mode);
        var colorCode = isBackground ? (bgColor.colorCode) : (fontColor.colorCode);
        var modeSwitcher = isBackground ? !!bgColor.modeSwitcher : !!fontColor.modeSwitcher;
        var columns = isBackground ? (bgColor.columns) : (fontColor.columns);
        var value = isBackground ? (bgColor.default) : (fontColor.default);
        var colorPicker = new ColorPicker({
            enableRtl: this.editor.enableRtl,
            inline: false,
            mode: mode,
            modeSwitcher: modeSwitcher,
            noColor: true,
            showButtons: false,
            cssClass: this.editor.cssClass + 'e-be-color-picker',
            columns: columns,
            presetColors: colorCode,
            created: function () {
                var _a, _b, _c;
                var host = args.element.parentElement;
                host.tabIndex = -1;
                var cssClasses = colorPicker.cssClass.split(' ').filter(Boolean);
                var splitDiv = host.childNodes[1];
                (_a = splitDiv.classList).add.apply(_a, cssClasses);
                var dropdownCls = args.type === 'bgColor' ? 'e-be-bgcolor-dropdown' : 'e-be-fontcolor-dropdown';
                var splitPickerElem = host.querySelector('.e-split-colorpicker');
                (_b = splitPickerElem.classList).add.apply(_b, cssClasses);
                splitPickerElem.classList.add('e-dropdown', dropdownCls, 'e-icons');
                var dropdownBtn = host.querySelector('.e-dropdown-btn');
                (_c = dropdownBtn.classList).add.apply(_c, cssClasses);
                dropdownBtn.classList.add('e-dropdown', dropdownCls);
                colorPicker.setProperties({ value: value });
            },
            beforeTileRender: function (args) {
                args.element.classList.add('e-color-palette');
                args.element.classList.add('e-custom-tile');
                if (args.value === '') {
                    args.element.classList.add('e-no-color');
                }
            },
            change: function (pickerArgs) {
                var colorpickerValue = pickerArgs.currentValue.rgba;
                args.onChange(colorpickerValue);
            },
            beforeModeSwitch: function (args) {
                var currentValue = colorPicker.value;
                if (currentValue === '') {
                    colorPicker.setProperties({ value: (args.mode === 'Picker') ? '#008000ff' : '' }, true);
                }
            }
        });
        colorPicker.appendTo(args.element);
        return colorPicker;
    };
    ColorPickerRenderer.prototype.updatePickerProperties = function (picker, model) {
        var props = {};
        if (!isNullOrUndefined(model.default)) {
            props.value = model.default;
        }
        if (!isNullOrUndefined(model.columns)) {
            props.columns = model.columns;
        }
        if (!isNullOrUndefined(model.modeSwitcher)) {
            props.modeSwitcher = model.modeSwitcher;
        }
        if (!isNullOrUndefined(model.colorCode)) {
            props.presetColors = model.colorCode;
        }
        if (!isNullOrUndefined(model.mode)) {
            props.mode = model.mode;
        }
        if (Object.keys(props).length) {
            picker.setProperties(props);
        }
    };
    return ColorPickerRenderer;
}());
export { ColorPickerRenderer };
