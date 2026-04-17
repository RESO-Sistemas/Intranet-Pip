import { ClipBoardCleanupAction } from '../../editor-manager/plugin/clipboard-cleanup-action';
import * as events from '../base/constant';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { sanitizeHelper } from '../base/util';
/**
 * ClipBoardCleanup module called when copy or cut event is triggered in RichTextEditor
 */
var ClipBoardCleanup = /** @class */ (function () {
    function ClipBoardCleanup(parent) {
        this.parent = parent;
        this.addEventListener();
        this.isDestroyed = false;
    }
    ClipBoardCleanup.prototype.addEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.on(events.clipBoardCleanup, this.clipBoardCleanup, this);
            this.parent.on(events.bindOnEnd, this.bindOnEnd, this);
            this.parent.on(events.destroy, this.destroy, this);
        }
    };
    ClipBoardCleanup.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.isDestroyed = true;
    };
    ClipBoardCleanup.prototype.removeEventListener = function () {
        this.parent.off(events.clipBoardCleanup, this.clipBoardCleanup);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.bindOnEnd, this.bindOnEnd);
    };
    ClipBoardCleanup.prototype.bindOnEnd = function () {
        if (this.parent.editorMode === 'HTML' && this.parent.formatter && this.parent.formatter.editorManager
            && this.parent.contentModule) {
            this.clipBoardCleanupObj =
                new ClipBoardCleanupAction(this.parent.formatter.editorManager);
        }
    };
    /* Handles the copy and cut cleanup operation when copy or cut event is triggered in editor */
    ClipBoardCleanup.prototype.clipBoardCleanup = function (e) {
        var _this = this;
        if (!isNOU(e.args)) {
            var range = this.parent.getRange();
            var editableElement = this.parent.contentModule.getEditPanel();
            var operation = e.args.type;
            var clipboardDataArgs = this.clipBoardCleanupObj.handleClipboardProcessing(range, editableElement, operation);
            this.parent.trigger(events.beforeClipboardWrite, clipboardDataArgs, function (clipboardWriteArgs) {
                var htmlText = sanitizeHelper(clipboardWriteArgs.htmlContent, _this.parent);
                var plainText = sanitizeHelper(clipboardWriteArgs.plainTextContent, _this.parent);
                e.args.clipboardData.setData('text/html', htmlText);
                e.args.clipboardData.setData('text/plain', plainText);
            });
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    ClipBoardCleanup.prototype.getModuleName = function () {
        return 'clipBoardCleanup';
    };
    return ClipBoardCleanup;
}());
export { ClipBoardCleanup };
