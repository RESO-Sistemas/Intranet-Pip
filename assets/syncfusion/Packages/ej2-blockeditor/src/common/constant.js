/* Events */
export var events = {
    keydown: 'keydown',
    input: 'input',
    moduleChanged: 'moduleChanged',
    inlineToolbarCreated: 'inlineToolbarCreated',
    inlineToolbarItemClick: 'inlineToolbarItemClick',
    inlineToolbarBeforeOpen: 'inlineToolbarBeforeOpen',
    formattingPerformed: 'formatting-performed',
    cut: 'cut',
    copy: 'copy',
    paste: 'paste',
    destroy: 'destroy',
    rtlChanged: 'rtl-changed',
    contentChanged: 'contentChanged',
    blockAdded: 'blockAdded',
    blockRemoved: 'blockRemoved',
    blockMoved: 'blockMoved',
    blockTransformed: 'blockTransformed',
    undoRedoPerformed: 'undoRedoPerformed',
    undoStackChanged: 'undoStackChanged',
    localeChanged: 'localeChanged',
    editorClick: 'editorClick',
    documentClick: 'documentClick'
};
/* Action Types */
export var actionType;
(function (actionType) {
    actionType["contentChanged"] = "contentChanged";
    actionType["formattingAction"] = "formattingAction";
    actionType["indent"] = "indent";
    actionType["checked"] = "checked";
    actionType["lineBreakAdded"] = "lineBreakAdded";
    actionType["isExpanded"] = "isExpanded";
    actionType["blockAdded"] = "blockAdded";
    actionType["blockRemoved"] = "blockRemoved";
    actionType["blockMoved"] = "blockMoved";
    actionType["multipleBlocksDeleted"] = "multipleBlocksDeleted";
    actionType["blockTransformed"] = "blockTransformed";
    actionType["multipleBlocksTransformed"] = "multipleBlocksTransformed";
    actionType["imageInsertion"] = "imageInsertion";
    actionType["clipboardPaste"] = "clipboardPaste";
    actionType["tableRowInserted"] = "tableRowInserted";
    actionType["tableRowDeleted"] = "tableRowDeleted";
    actionType["tableColumnInserted"] = "tableColumnInserted";
    actionType["tableColumnDeleted"] = "tableColumnDeleted";
    actionType["tableCellsCleared"] = "tableCellsCleared";
    actionType["tableCellsPasted"] = "tableCellsPasted";
    actionType["tableRowsDeleted"] = "tableRowsDeleted";
    actionType["tableColumnsDeleted"] = "tableColumnsDeleted";
    actionType["tableHeaderInput"] = "tableHeaderInput";
    actionType["tableColumnResized"] = "tableColumnResized";
})(actionType || (actionType = {}));
/* Commands */
export var ADDBLOCK = 'ADDBLOCK';
export var SPLITBLOCK = 'SPLITBLOCK';
export var DELETEBLOCK = 'DELETEBLOCK';
export var INDENTBLOCK = 'INDENTBLOCK';
export var DELETEATCURSOR = 'DELETEATCURSOR';
export var MOVEBLOCK = 'MOVEBLOCK';
export var DUPLICATEBLOCK = 'DUPLICATEBLOCK';
export var FORMATTINGACTION = 'FORMATTINGACTION';
export var CLEAREVENTCHANGES = 'CLEAREVENTCHANGES';
export var DELETE_NON_MERGABLEBLOCK = 'DELETE_NON_MERGABLEBLOCK';
/* Constant string values */
export var RTL_CLS = 'e-rtl';
export var DISABLED_CLS = 'e-disabled';
export var HIDDEN_CLS = 'e-hidden';
export var SPACE = ' ';
export var BLOCK_CONTAINER_ID = '_blockcontainer';
export var BLOCK_CONTAINER_CLS = 'e-block-container';
export var BLOCK_ID_PREFIX = 'block';
export var CONTENT_ID_PREFIX = 'content';
export var INDENT_KEY = '--block-indent';
export var BLOCK_CLS = 'e-block';
export var CONTENT_CLS = 'e-block-content';
export var CALLOUT_BLOCK_CLS = 'e-callout-block';
export var QUOTE_BLOCK_CLS = 'e-quote-block';
export var TOGGLE_BLOCK_CLS = 'e-toggle-block';
export var CALLOUT_CONTENT_CLS = 'e-callout-content';
export var QUOTE_CONTENT_CLS = 'e-quote-content';
export var TOGGLE_CONTENT_CLS = 'e-toggle-content';
export var TABLE_BLOCK_CLS = 'e-table-block';
export var TABLE_CELL_BLK_CONTAINER = 'e-cell-blocks-container';
export var TABLE_CELL_FOCUS = 'e-cell-focus';
export var TABLE_COL_MIN_WIDTH = 60;
export var TABLE_NEW_COL_WIDTH = 120;
export var BLOCKACTION_MENUBAR_ID = '_blockaction-menubar';
export var BLOCKACTION_POPUP_ID = '_blockaction-popup';
export var BLOCKACTION_TOOLTIP_ID = '_blockaction-tooltip';
export var BLOCKEDITOR_CONTEXTMENU_ID = '_contextmenu';
export var BLOCKEDITOR_INLINETBAR_ID = '_inline-toolbar';
export var INLINE_TBAR_POPUP_ID = '_inline-toolbar-popup';
export var INLINE_TBAR_TOOLTIP_ID = '_inline-toolbar-tooltip';
export var LINKDIALOG_ID = '_linkDialog';
export var BLOCKACTION_MENUBAR_CLS = 'e-blockeditor-blockaction-menubar';
export var BLOCKACTION_POPUP_CLS = 'e-blockeditor-blockaction-popup';
export var BLOCKACTION_TOOLTIP_CLS = 'e-blockeditor-blockaction-tooltip';
export var BLOCKEDITOR_CONTEXTMENU_CLS = 'e-blockeditor-contextmenu';
export var BLOCKEDITOR_INLINETBAR_CLS = 'e-blockeditor-inline-toolbar';
export var INLINE_TBAR_POPUP_CLS = 'e-blockeditor-inline-toolbar-popup';
export var INLINE_TBAR_TOOLTIP_CLS = 'e-blockeditor-inline-toolbar-tooltip';
export var LINKDIALOG_CLS = 'e-blockeditor-link-dialog';
export var TBAR_ITEM_CLS = 'e-toolbar-item';
