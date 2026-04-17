import * as EVENTS from '../../common/constant';
import { InsertHtml } from './inserthtml';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
var AIAssistantActions = /** @class */ (function () {
    function AIAssistantActions(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    AIAssistantActions.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.AI_ASSISTANT_ACTIONS, this.actionHandler, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    AIAssistantActions.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.AI_ASSISTANT_ACTIONS, this.actionHandler);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    AIAssistantActions.prototype.actionHandler = function (args) {
        var subCommand = args.subCommand;
        if (subCommand === 'InsertResponseContent') {
            this.parent.nodeSelection.restore();
            var currentRange = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            var closestBlockElement = this.parent.domNode.blockNodes()[0];
            if (currentRange.collapsed && !isNOU(closestBlockElement) && closestBlockElement.textContent.length > 0) {
                currentRange.selectNodeContents(closestBlockElement);
            }
            InsertHtml.Insert(this.parent.currentDocument, args.value, this.parent.editableElement, true, args.enterAction, this.parent);
            this.callBack(args); // To trigger the actionComplete and then enable the undo redo.
        }
        else if (subCommand === 'ReplaceEditorContent') {
            this.parent.editableElement.innerHTML = args.value;
        }
    };
    AIAssistantActions.prototype.callBack = function (event) {
        event.callBack({
            requestType: event.command,
            action: event.subCommand,
            editorMode: 'HTML',
            range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
            elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
        });
    };
    AIAssistantActions.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return AIAssistantActions;
}());
export { AIAssistantActions };
