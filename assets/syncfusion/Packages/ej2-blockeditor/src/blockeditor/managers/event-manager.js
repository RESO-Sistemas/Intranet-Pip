import { isNullOrUndefined as isNOU, EventHandler } from '@syncfusion/ej2-base';
import { getSelectedRange } from '../../common/utils/index';
import * as constants from '../../common/constant';
import { events } from '../../common/constant';
/**
 * Manages all event handlers for the BlockEditor component
 * This class centralizes event handling logic and provides a clean interface
 * for wiring and unwiring events across the editor
 */
var EventManager = /** @class */ (function () {
    /**
     * Creates a new EventHandlerManager instance
     *
     * @param {BlockEditor} editor The parent BlockEditor instance
     */
    function EventManager(editor) {
        this.editor = editor;
    }
    /**
     * Wires up all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    EventManager.prototype.wireGlobalEvents = function () {
        // Document events
        EventHandler.add(document, 'selectionchange', this.handleEditorSelection, this);
        EventHandler.add(document, 'mousedown', this.handleDocumentClickActions, this);
        EventHandler.add(document, 'mousemove', this.handleMouseMoveActions, this);
        EventHandler.add(window, 'resize', this.onResizeHandler, this);
        // Editor events
        EventHandler.add(this.editor.element, 'mouseup', this.handleMouseUpActions, this);
        EventHandler.add(this.editor.element, 'mousedown', this.handleMouseDownActions, this);
        EventHandler.add(this.editor.element, 'input', this.handleEditorInputActions, this);
        EventHandler.add(this.editor.element, 'keydown', this.handleKeydownActions, this);
        EventHandler.add(this.editor.element, 'click', this.handleEditorClickActions, this);
        EventHandler.add(this.editor.element, 'copy', this.clipboardActionHandler, this);
        EventHandler.add(this.editor.element, 'cut', this.clipboardActionHandler, this);
        EventHandler.add(this.editor.element, 'paste', this.clipboardActionHandler, this);
        EventHandler.add(this.editor.blockContainer, 'focus', this.handleEditorFocusActions, this);
        EventHandler.add(this.editor.blockContainer, 'blur', this.handleEditorBlurActions, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    /**
     * Unwires all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    EventManager.prototype.unWireGlobalEvents = function () {
        // Document events
        EventHandler.remove(document, 'selectionchange', this.handleEditorSelection);
        EventHandler.remove(document, 'mousedown', this.handleDocumentClickActions);
        EventHandler.remove(document, 'mousemove', this.handleMouseMoveActions);
        EventHandler.remove(window, 'resize', this.onResizeHandler);
        // Editor events
        EventHandler.remove(this.editor.element, 'mouseup', this.handleMouseUpActions);
        EventHandler.remove(this.editor.element, 'mousedown', this.handleMouseDownActions);
        EventHandler.remove(this.editor.element, 'input', this.handleEditorInputActions);
        EventHandler.remove(this.editor.element, 'keydown', this.handleKeydownActions);
        EventHandler.remove(this.editor.element, 'click', this.handleEditorClickActions);
        EventHandler.remove(this.editor.element, 'copy', this.clipboardActionHandler);
        EventHandler.remove(this.editor.element, 'cut', this.clipboardActionHandler);
        EventHandler.remove(this.editor.element, 'paste', this.clipboardActionHandler);
        EventHandler.remove(this.editor.blockContainer, 'focus', this.handleEditorFocusActions);
        EventHandler.remove(this.editor.blockContainer, 'blur', this.handleEditorBlurActions);
        this.editor.off(events.destroy, this.destroy);
    };
    /**
     * Triggers the block change event in the editor with required args
     *
     * @param {BlockChangedEventArgs} args - The event args
     * @returns {void}
     * @hidden
     */
    EventManager.prototype.triggerBlockChangeEvent = function (args) {
        this.editor.trigger('blockChanged', args);
    };
    EventManager.prototype.handleEditorSelection = function () {
        this.editor.intermediate.processActions('selectionchange');
    };
    EventManager.prototype.handleMouseMoveActions = function (moveEvent) {
        this.editor.intermediate.processActions('mousemove', moveEvent);
    };
    EventManager.prototype.handleEditorInputActions = function (inputEvent) {
        this.editor.intermediate.processActions('input', inputEvent);
    };
    EventManager.prototype.handleDocumentClickActions = function (clickEvent) {
        this.editor.intermediate.processActions('documentClick', clickEvent);
    };
    EventManager.prototype.handleEditorClickActions = function (clickEvent) {
        this.editor.intermediate.processActions('editorClick', clickEvent);
    };
    EventManager.prototype.handleEditorFocusActions = function (focusEvent) {
        var _this = this;
        setTimeout(function () {
            var range = getSelectedRange();
            if (!range || !_this.editor.blockManager.currentFocusedBlock) {
                return;
            }
            _this.editor.trigger('focus', {
                event: focusEvent,
                blockId: _this.editor.blockManager.currentFocusedBlock.id,
                selectionRange: [range.startOffset, range.endOffset]
            });
        }, 200);
    };
    EventManager.prototype.handleEditorBlurActions = function (blurEvent) {
        var inlineTbarPopup = document.querySelector('#' + this.editor.element.id + constants.INLINE_TBAR_POPUP_ID);
        var contextMenuPopup = document.querySelector('#' + this.editor.element.id + constants.BLOCKEDITOR_CONTEXTMENU_ID);
        var shouldPreventBlurAction = (inlineTbarPopup && inlineTbarPopup.contains(blurEvent.relatedTarget))
            || (contextMenuPopup && contextMenuPopup.contains(blurEvent.relatedTarget));
        var block = this.editor.blockManager.currentFocusedBlock;
        if (!shouldPreventBlurAction) {
            this.editor.trigger('blur', {
                event: blurEvent,
                blockId: block ? block.id : ''
            });
        }
    };
    EventManager.prototype.handleKeydownActions = function (keyEvent) {
        this.editor.intermediate.processActions('keydown', keyEvent);
    };
    EventManager.prototype.handleMouseUpActions = function (mouseEvent) {
        this.editor.intermediate.processActions('mouseup', mouseEvent);
    };
    EventManager.prototype.handleMouseDownActions = function (mouseEvent) {
        this.editor.intermediate.processActions('mousedown', mouseEvent);
    };
    EventManager.prototype.clipboardActionHandler = function (e) {
        this.editor.intermediate.processActions('clipboardAction', e);
    };
    EventManager.prototype.onResizeHandler = function () {
        var _this = this;
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            _this.editor.intermediate.processActions('resize');
        }, 10);
    };
    EventManager.prototype.destroy = function () {
        this.unWireGlobalEvents();
        if (!isNOU(this.resizeTimer)) {
            clearInterval(this.resizeTimer);
            this.resizeTimer = null;
        }
    };
    return EventManager;
}());
export { EventManager };
