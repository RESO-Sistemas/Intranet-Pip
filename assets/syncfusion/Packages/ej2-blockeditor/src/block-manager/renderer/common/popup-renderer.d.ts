import { Dialog, Popup } from '@syncfusion/ej2-popups';
import { IPopupRenderOptions } from '../../../common/interface';
import { BlockManager } from '../../base/block-manager';
/**
 * `Popup renderer` module is used to render popup in BlockEditor.
 *
 * @hidden
 */
export declare class PopupRenderer {
    private parent;
    private editorElement;
    constructor(manager: BlockManager);
    /**
     * Renders popup in BlockEditor.
     *
     * @param {IPopupRenderOptions} args - specifies  the arguments.
     * @returns {Popup} - returns the popup object.
     * @hidden
     */
    renderPopup(args?: IPopupRenderOptions): Popup;
    /**
     * Adjusts the popup position relative to the target element.
     *
     * @param {HTMLElement | Range} target - specifies the target element.
     * @param {Popup | Dialog} popup - specifies the popup object.
     * @returns {void}
     * @hidden
     */
    adjustPopupPositionRelativeToTarget(target: HTMLElement | Range, popup: Popup | Dialog): void;
    private positionBlockActionPopup;
    /**
     * Positions the image upload popup relative to the placeholder element.
     * The popup will appear below the placeholder if there's space, otherwise above.
     * Handles scroll offsets correctly.
     *
     * @param {HTMLElement} target - The placeholder element (target for positioning)
     * @param {Popup} popup - The image upload popup object
     * @returns {void}
     * @private
     */
    private positionImageUploadPopup;
    private positionInlineToolbar;
    private calculateOffsetX;
    private calculateOffsetY;
    private getSelectionDirection;
    private handleVerticalCollision;
    private getSpaceAbove;
    private getSpaceBelow;
    private getTopCollisionType;
    private getBottomCollisionType;
    private isElemVisible;
    private positionTableGripperActionPopup;
    destroyPopup(popup: Popup): void;
}
