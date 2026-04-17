export declare const events: {
    [key: string]: string;
};
export declare enum actionType {
    contentChanged = "contentChanged",
    formattingAction = "formattingAction",
    indent = "indent",
    checked = "checked",
    lineBreakAdded = "lineBreakAdded",
    isExpanded = "isExpanded",
    blockAdded = "blockAdded",
    blockRemoved = "blockRemoved",
    blockMoved = "blockMoved",
    multipleBlocksDeleted = "multipleBlocksDeleted",
    blockTransformed = "blockTransformed",
    multipleBlocksTransformed = "multipleBlocksTransformed",
    imageInsertion = "imageInsertion",
    clipboardPaste = "clipboardPaste",
    tableRowInserted = "tableRowInserted",
    tableRowDeleted = "tableRowDeleted",
    tableColumnInserted = "tableColumnInserted",
    tableColumnDeleted = "tableColumnDeleted",
    tableCellsCleared = "tableCellsCleared",
    tableCellsPasted = "tableCellsPasted",
    tableRowsDeleted = "tableRowsDeleted",
    tableColumnsDeleted = "tableColumnsDeleted",
    tableHeaderInput = "tableHeaderInput",
    tableColumnResized = "tableColumnResized"
}
export declare const ADDBLOCK: string;
export declare const SPLITBLOCK: string;
export declare const DELETEBLOCK: string;
export declare const INDENTBLOCK: string;
export declare const DELETEATCURSOR: string;
export declare const MOVEBLOCK: string;
export declare const DUPLICATEBLOCK: string;
export declare const FORMATTINGACTION: string;
export declare const CLEAREVENTCHANGES: string;
export declare const DELETE_NON_MERGABLEBLOCK: string;
export declare const RTL_CLS: string;
export declare const DISABLED_CLS: string;
export declare const HIDDEN_CLS: string;
export declare const SPACE: string;
export declare const BLOCK_CONTAINER_ID: string;
export declare const BLOCK_CONTAINER_CLS: string;
export declare const BLOCK_ID_PREFIX: string;
export declare const CONTENT_ID_PREFIX: string;
export declare const INDENT_KEY: string;
export declare const BLOCK_CLS: string;
export declare const CONTENT_CLS: string;
export declare const CALLOUT_BLOCK_CLS: string;
export declare const QUOTE_BLOCK_CLS: string;
export declare const TOGGLE_BLOCK_CLS: string;
export declare const CALLOUT_CONTENT_CLS: string;
export declare const QUOTE_CONTENT_CLS: string;
export declare const TOGGLE_CONTENT_CLS: string;
export declare const TABLE_BLOCK_CLS: string;
export declare const TABLE_CELL_BLK_CONTAINER: string;
export declare const TABLE_CELL_FOCUS: string;
export declare const TABLE_COL_MIN_WIDTH: number;
export declare const TABLE_NEW_COL_WIDTH: number;
export declare const BLOCKACTION_MENUBAR_ID: string;
export declare const BLOCKACTION_POPUP_ID: string;
export declare const BLOCKACTION_TOOLTIP_ID: string;
export declare const BLOCKEDITOR_CONTEXTMENU_ID: string;
export declare const BLOCKEDITOR_INLINETBAR_ID: string;
export declare const INLINE_TBAR_POPUP_ID: string;
export declare const INLINE_TBAR_TOOLTIP_ID: string;
export declare const LINKDIALOG_ID: string;
export declare const BLOCKACTION_MENUBAR_CLS: string;
export declare const BLOCKACTION_POPUP_CLS: string;
export declare const BLOCKACTION_TOOLTIP_CLS: string;
export declare const BLOCKEDITOR_CONTEXTMENU_CLS: string;
export declare const BLOCKEDITOR_INLINETBAR_CLS: string;
export declare const INLINE_TBAR_POPUP_CLS: string;
export declare const INLINE_TBAR_TOOLTIP_CLS: string;
export declare const LINKDIALOG_CLS: string;
export declare const TBAR_ITEM_CLS: string;
