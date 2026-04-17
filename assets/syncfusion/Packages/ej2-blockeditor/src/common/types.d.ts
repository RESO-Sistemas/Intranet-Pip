/**
 * Types type for EditorManager
 *
 * @hidden
 */
export declare type EditorExecCommand = 'AddBlock' | 'DeleteBlock' | 'SplitBlock' | 'IndentBlock' | 'DeleteAtCursor' | 'MoveBlock' | 'DuplicateBlock' | 'FormattingAction' | 'DeleteNonMergableBlock';
/**
 * Defines the direction of the selection.
 *
 * @hidden
 */
export declare type SelectionDirection = 'Backward' | 'Forward';
/**
 * Defines the Inline toolbar collision type.
 *
 * @hidden
 */
export declare type InlineToolbarCollision = 'ViewPort' | 'ParentElement' | 'ScrollableContainer' | 'Hidden';
