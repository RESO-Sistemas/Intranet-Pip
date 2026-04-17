import { events } from '../../common/constant';
import * as constants from '../../common/constant';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { cloneObject } from '../../common/utils/transform';
var Intermediate = /** @class */ (function () {
    function Intermediate(editor) {
        this.editor = editor;
        this.wireGlobalEvents();
    }
    /**
     * Wires up all global event handlers
     *
     * @returns {void}
     * @hidden
     */
    Intermediate.prototype.wireGlobalEvents = function () {
        this.editor.blockManager.observer.on('updateEditorBlocks', this.handleModelChanges, this);
        this.editor.blockManager.observer.on('selectionChanged', this.handleSelectionChange, this);
        this.editor.blockManager.observer.on('beforePaste', this.triggerBeforePaste, this);
        this.editor.blockManager.observer.on('afterPaste', this.triggerAfterPaste, this);
        this.editor.blockManager.observer.on('blockActionsMenuClose', this.triggerBlockActionsMenuCloseEvent, this);
        this.editor.blockManager.observer.on('blockActionsMenuOpen', this.triggerBlockActionsMenuOpenEvent, this);
        this.editor.blockManager.observer.on('blockDragging', this.triggerBlockDrag, this);
        this.editor.blockManager.observer.on('blockDragStart', this.triggerBlockStart, this);
        this.editor.blockManager.observer.on('blockDropped', this.triggerBlockDrop, this);
        this.editor.blockManager.observer.on('triggerBlockChange', this.triggerBlockChangeEvent, this);
        this.editor.blockManager.observer.on('renderTemplateBlock', this.editor.renderTemplate, this.editor);
        this.editor.blockManager.observer.on('renderDropdownList', this.renderDropdownList, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    /**
     * Unwires all global event handlers
     *
     * @returns {void}
     * @hidden
     */
    Intermediate.prototype.unWireGlobalEvents = function () {
        this.editor.blockManager.observer.off('updateEditorBlocks', this.handleModelChanges);
        this.editor.blockManager.observer.off('selectionChanged', this.handleSelectionChange);
        this.editor.blockManager.observer.off('beforePaste', this.triggerBeforePaste);
        this.editor.blockManager.observer.off('afterPaste', this.triggerAfterPaste);
        this.editor.blockManager.observer.off('blockActionsMenuClose', this.triggerBlockActionsMenuCloseEvent);
        this.editor.blockManager.observer.off('blockActionsMenuOpen', this.triggerBlockActionsMenuOpenEvent);
        this.editor.blockManager.observer.off('blockDragging', this.triggerBlockDrag);
        this.editor.blockManager.observer.off('blockDragStart', this.triggerBlockStart);
        this.editor.blockManager.observer.off('blockDropped', this.triggerBlockDrop);
        this.editor.blockManager.observer.off('triggerBlockChange', this.triggerBlockChangeEvent);
        this.editor.blockManager.observer.off('renderTemplateBlock', this.editor.renderTemplate);
        this.editor.blockManager.observer.off('renderDropdownList', this.renderDropdownList);
        this.editor.off(events.destroy, this.destroy);
    };
    /**
     * Processes the event actions in block manager which originates from blockeditor
     *
     * @param {string} action - The event action
     * @param {any} args - args required for action if any.
     * @returns {void}
     * @hidden
     */
    Intermediate.prototype.processActions = function (action, args) {
        this.editor.blockManager.observer.notify(action, args);
    };
    Intermediate.prototype.handleModelChanges = function (state) {
        this.editor.setProperties({ blocks: state.blocks }, true);
    };
    Intermediate.prototype.handleSelectionChange = function (args) {
        this.editor.trigger('selectionChanged', args);
    };
    Intermediate.prototype.triggerBeforePaste = function (args) {
        var eventArgs = {
            cancel: args.cancel,
            content: args.content
        };
        this.editor.trigger('beforePaste', eventArgs);
        args.callback(eventArgs);
    };
    Intermediate.prototype.triggerAfterPaste = function (args) {
        this.editor.trigger('afterPaste', args);
    };
    Intermediate.prototype.triggerBlockDrag = function (args) {
        this.editor.trigger('blockDragging', args);
    };
    Intermediate.prototype.triggerBlockStart = function (args) {
        this.editor.trigger('blockDragStart', args);
    };
    Intermediate.prototype.triggerBlockDrop = function (args) {
        this.editor.trigger('blockDropped', args);
    };
    Intermediate.prototype.triggerBlockChangeEvent = function (changes) {
        var validChanges = changes
            .filter(function (_, index) { return Number.isInteger(index) && changes[index] !== undefined; })
            .map(function (change) {
            var clonedData = cloneObject(change.data, ['targetId', 'isAfter', 'isMovingUp']);
            if (!isNullOrUndefined(change.data.currentParent)) {
                clonedData.currentParent = change.data.currentParent;
            }
            if (!isNullOrUndefined(change.data.prevParent)) {
                clonedData.prevParent = change.data.prevParent;
            }
            return {
                action: change.action,
                data: clonedData
            };
        });
        var blockChangeEventArgs = { changes: validChanges };
        this.editor.eventManager.triggerBlockChangeEvent(blockChangeEventArgs);
        this.editor.blockManager.observer.notify(constants.CLEAREVENTCHANGES);
    };
    Intermediate.prototype.triggerBlockActionsMenuCloseEvent = function (args) {
        var eventArgs = {
            event: args.event,
            items: args.items,
            cancel: args.cancel
        };
        if (this.editor.blockActionMenuSettings.beforeClose) {
            this.editor.blockActionMenuSettings.beforeClose.call(this, eventArgs);
        }
        args.callback(eventArgs);
    };
    Intermediate.prototype.triggerBlockActionsMenuOpenEvent = function (args) {
        var eventArgs = {
            event: args.event,
            items: args.items,
            cancel: args.cancel
        };
        if (this.editor.blockActionMenuSettings.beforeOpen) {
            this.editor.blockActionMenuSettings.beforeOpen.call(this, eventArgs);
        }
        args.callback(eventArgs);
    };
    Intermediate.prototype.renderDropdownList = function (args) {
        this.editor.dropdownListRenderer.renderDropDownList(args);
    };
    Intermediate.prototype.destroy = function () {
        this.unWireGlobalEvents();
    };
    return Intermediate;
}());
export { Intermediate };
