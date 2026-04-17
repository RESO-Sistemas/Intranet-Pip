/**
 * Constant values for Common
 */
/**
 * Keydown event trigger
 *
 * @hidden
 */
export var KEY_DOWN = 'keydown';
/**
 * Undo and Redo action HTML plugin events
 *
 * @hidden
 */
export var ACTION = 'action';
/**
 * Formats plugin events
 *
 * @hidden
 */
export var FORMAT_TYPE = 'format-type';
/**
 * Keydown handler event trigger
 *
 * @hidden
 */
export var KEY_DOWN_HANDLER = 'keydown-handler';
/**
 * List plugin events
 *
 * @hidden
 */
export var LIST_TYPE = 'list-type';
/**
 * Code Block plugin events
 *
 * @hidden
 */
export var CODE_BLOCK = 'code-block';
/**
 * Keyup handler event trigger
 *
 * @hidden
 */
export var KEY_UP_HANDLER = 'keyup-handler';
/**
 * Keyup event trigger
 *
 * @hidden
 */
export var KEY_UP = 'keyup';
/**
 * Model changed plugin event trigger
 *
 * @hidden
 */
export var MODEL_CHANGED_PLUGIN = 'model_changed_plugin';
/**
 * Model changed event trigger
 *
 * @hidden
 */
export var MODEL_CHANGED = 'model_changed';
/**
 * PasteCleanup plugin for MSWord content
 *
 * @hidden
 */
export var MS_WORD_CLEANUP_PLUGIN = 'ms_word_cleanup_plugin';
/**
 * PasteCleanup for MSWord content
 *
 * @hidden
 */
export var MS_WORD_CLEANUP = 'ms_word_cleanup';
/**
 * ActionBegin event callback
 *
 * @hidden
 */
export var ON_BEGIN = 'onBegin';
/**
 * Callback for spacelist action
 *
 * @hidden
 */
export var SPACE_ACTION = 'actionBegin';
/**
 * Format painter event constant
 *
 * @hidden
 */
export var FORMAT_PAINTER_ACTIONS = 'format_painter_actions';
/**
 * AI Assistant Event constant
 *
 * @hidden
 */
export var AI_ASSISTANT_ACTIONS = 'ai_assistant_actions';
/**
 * Blockquotes enter prevent when on list is applied event constant
 *
 * @hidden
 */
export var BLOCKQUOTE_LIST_HANDLE = 'blockquote_list_handled';
/**
 * Emoji picker event constant
 *
 * @hidden
 */
export var EMOJI_PICKER_ACTIONS = 'emoji_picker_actions';
/**
 * Auto format event constant
 *
 * @hidden
 */
export var AUTO_FORMAT_ACTIONS = 'auto_format_actions';
/**
 * Mouse down event constant
 *
 * @hidden
 */
export var MOUSE_DOWN = 'mouseDown';
/**
 * destroy event constant
 *
 * @hidden
 */
export var DESTROY = 'destroy';
/**
 * internal_destroy event constant
 *
 * @hidden
 */
export var INTERNAL_DESTROY = 'internal_destroy';
/**
 * code block indentation event constant
 *
 * @hidden
 */
export var CODEBLOCK_INDENTATION = 'codeblock_indentation';
/**
 * code block indentation event constant
 *
 * @hidden
 */
export var CODEBLOCK_DISABLETOOLBAR = 'codeblock_disabletoolbar';
/**
 * @hidden
 * @private
 */
export var CLS_RTE_TABLE_RESIZE = 'e-rte-table-resize';
/**
 * @hidden
 * @private
 */
export var CLS_TB_ROW_INSERT = 'e-tb-row-insert';
/**
 * @hidden
 * @private
 */
export var CLS_TB_COL_INSERT = 'e-tb-col-insert';
/**
 * @hidden
 * @private
 */
export var CLS_TB_DASH_BOR = 'e-dashed-border';
/**
 * @hidden
 * @private
 */
export var CLS_TB_ALT_BOR = 'e-alternate-border';
/**
 * @hidden
 * @private
 */
export var CLS_TB_COL_RES = 'e-column-resize';
/**
 * @hidden
 * @private
 */
export var CLS_TB_ROW_RES = 'e-row-resize';
/**
 * @hidden
 * @private
 */
export var CLS_TB_BOX_RES = 'e-table-box';
/**
 * @hidden
 * @private
 */
export var CLS_IMG_FOCUS = 'e-img-focus';
/**
 * @hidden
 * @private
 */
export var CLS_TABLE_SEL = 'e-cell-select';
/**
 * @hidden
 * @private
 */
export var CLS_TABLE_SEL_END = 'e-cell-select-end';
/**
 * @hidden
 * @private
 */
export var CLS_TABLE_MULTI_CELL = 'e-multi-cells-select';
export var CLS_AUD_FOCUS = 'e-audio-focus';
/**
 * @hidden
 * @private
 */
export var CLS_VID_FOCUS = 'e-video-focus';
/**
 * @hidden
 * @private
 */
export var CLS_RTE_DRAG_IMAGE = 'e-rte-drag-image';
/**
 * @hidden
 * @private
 */
export var CLS_RESIZE = 'e-resize';
/**
 * @hidden
 * @private
 */
export var hideTableQuickToolbar = 'hideTableQuickToolbar';
/**
 * @hidden
 * @private
 */
export var touchStart = 'touchStart';
/**
 * @hidden
 * @private
 */
export var touchEnd = 'touchEnd';
/**
 * @hidden
 * @private
 */
export var cut = 'cut';
/**
 * @hidden
 * @private
 */
export var dragEnterEvent = 'dragEnter_Event';
/**
 * @hidden
 * @private
 */
export var dragOverEvent = 'dragOver_Event';
/**
 * @hidden
 * @private
 */
export var dragStartEvent = 'dragStart_Event';
/**
 * @hidden
 * @private
 */
export var dropEvent = 'drop_Event';
/**
 * @hidden
 * @private
 */
export var dragEnter = 'dragEnter';
/**
 * @hidden
 * @private
 */
export var dragDrop = 'dragDrop';
/**
 * @hidden
 * @private
 */
export var dragOver = 'dragOver';
/**
 * @hidden
 * @private
 */
export var dropEventHandler = 'drop';
/**
 * @private
 */
export var ENTER_KEYDOWN_HANLDER = 'enterKeyDownHandler';
/**
 * @hidden
 * @deprecated
 */
export var supportedUnits = ['px', 'em', 'rem', 'pt', 'cm', 'mm', 'in', 'pc', 'vw', 'vh', 'vmin', 'vmax'];
/**
 * @hidden
 * @deprecated
 */
export var conversionFactors = {
    'px': {
        'px': 1,
        'em': 0.0625,
        'rem': 0.0625,
        'pt': 0.75,
        'cm': 0.0264583,
        'mm': 0.0026458,
        'in': 0.0104167,
        'pc': 0.0625,
        'vw': 0.00625,
        'vh': 0.00625,
        'vmin': 0.00625,
        'vmax': 0.00625
    },
    'em': {
        'px': 16,
        'em': 1,
        'rem': 1,
        'pt': 12,
        'cm': 0.423333,
        'mm': 0.0423333,
        'in': 0.166667,
        'pc': 0.0625,
        'vw': 1,
        'vh': 1,
        'vmin': 1,
        'vmax': 1
    },
    'rem': {
        'px': 16,
        'em': 1,
        'rem': 1,
        'pt': 12,
        'cm': 0.423333,
        'mm': 0.0423333,
        'in': 0.166667,
        'pc': 0.0625,
        'vw': 1,
        'vh': 1,
        'vmin': 1,
        'vmax': 1
    },
    'pt': {
        'px': 1.33333,
        'em': 0.0833333,
        'rem': 0.0833333,
        'pt': 1,
        'cm': 0.0352778,
        'mm': 0.0035278,
        'in': 0.0138889,
        'pc': 0.0416667,
        'vw': 0.00416667,
        'vh': 0.00416667,
        'vmin': 0.00416667,
        'vmax': 0.00416667
    },
    'cm': {
        'px': 37.7953,
        'em': 2.3622,
        'rem': 2.3622,
        'pt': 28.3465,
        'cm': 1,
        'mm': 0.1,
        'in': 0.393701,
        'pc': 0.148148,
        'vw': 0.0377953,
        'vh': 0.0377953,
        'vmin': 0.0377953,
        'vmax': 0.0377953
    },
    'mm': {
        'px': 3.77953,
        'em': 0.23622,
        'rem': 0.23622,
        'pt': 2.83465,
        'cm': 10,
        'mm': 1,
        'in': 0.0393701,
        'pc': 0.0148148,
        'vw': 0.00377953,
        'vh': 0.00377953,
        'vmin': 0.00377953,
        'vmax': 0.00377953
    },
    'in': {
        'px': 96,
        'em': 6,
        'rem': 6,
        'pt': 72,
        'cm': 2.54,
        'mm': 25.4,
        'in': 1,
        'pc': 0.375,
        'vw': 0.09375,
        'vh': 0.09375,
        'vmin': 0.09375,
        'vmax': 0.09375
    },
    'pc': {
        'px': 16,
        'em': 1,
        'rem': 1,
        'pt': 12,
        'cm': 0.423333,
        'mm': 0.0423333,
        'in': 0.166667,
        'pc': 1,
        'vw': 0.0625,
        'vh': 0.0625,
        'vmin': 0.0625,
        'vmax': 0.0625
    },
    'vw': {
        'px': 160,
        'em': 10,
        'rem': 10,
        'pt': 120,
        'cm': 4.23333,
        'mm': 0.423333,
        'in': 1.66667,
        'pc': 0.625,
        'vw': 1,
        'vh': 1,
        'vmin': 1,
        'vmax': 1
    },
    'vh': {
        'px': 160,
        'em': 10,
        'rem': 10,
        'pt': 120,
        'cm': 4.23333,
        'mm': 0.423333,
        'in': 1.66667,
        'pc': 0.625,
        'vw': 1,
        'vh': 1,
        'vmin': 1,
        'vmax': 1
    },
    'vmin': {
        'px': 160,
        'em': 10,
        'rem': 10,
        'pt': 120,
        'cm': 4.23333,
        'mm': 0.423333,
        'in': 1.66667,
        'pc': 0.625,
        'vw': 1,
        'vh': 1,
        'vmin': 1,
        'vmax': 1
    },
    'vmax': {
        'px': 160,
        'em': 10,
        'rem': 10,
        'pt': 120,
        'cm': 4.23333,
        'mm': 0.423333,
        'in': 1.66667,
        'pc': 0.625,
        'vw': 1,
        'vh': 1,
        'vmin': 1,
        'vmax': 1
    }
};
