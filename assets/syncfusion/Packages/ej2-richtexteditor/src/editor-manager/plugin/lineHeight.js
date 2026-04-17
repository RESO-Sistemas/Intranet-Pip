import * as CONSTANT from './../base/constant';
import { isNullOrUndefined, setStyleAttribute } from '@syncfusion/ej2-base';
import * as EVENTS from './../../common/constant';
import { setEditFrameFocus } from '../../common/util';
/**
 * LineHeight internal component
 *
 * @hidden
 * @private
 */
var LineHeight = /** @class */ (function () {
    /**
     * Constructor for creating the LineHeight plugin
     *
     * @param {EditorManager} parent - specifies the parent element.
     * @returns {void}
     * @hidden
     * @private
     */
    function LineHeight(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    LineHeight.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.LINE_HEIGHT_TYPE, this.applyLineHeight, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    LineHeight.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.LINE_HEIGHT_TYPE, this.applyLineHeight);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    LineHeight.prototype.applyLineHeight = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var save = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        this.parent.domNode.setMarker(save);
        var blocks = this.parent.domNode.blockNodes(); // Get block nodes in the selection
        // Filter out table related elements if line-height should not apply directly to them
        blocks = blocks.filter(function (node) { return node.nodeType === Node.ELEMENT_NODE &&
            ['TD', 'TH', 'TABLE'].indexOf(node.tagName) === -1; });
        if (e.enterAction === 'BR') {
            blocks = this.parent.domNode.convertToBlockNodes(blocks, false);
        }
        for (var i = 0; i < blocks.length; i++) {
            var blockElement = blocks[i];
            if (!isNullOrUndefined(e.value) && !isNullOrUndefined(e.value.selectedValue) && e.value.selectedValue === '') {
                setStyleAttribute(blockElement, { 'line-height': '' });
                if ((blockElement.getAttribute('style') === '')) {
                    blockElement.removeAttribute('style');
                }
            }
            else {
                // Apply line-height style to the block-level elements
                if (!isNullOrUndefined(e.value) && !isNullOrUndefined(e.value.selectedValue)) {
                    setStyleAttribute(blockElement, { 'line-height': e.value.selectedValue });
                }
            }
        }
        this.parent.editableElement.focus({ preventScroll: true });
        save = this.parent.domNode.saveMarker(save);
        if (this.parent.userAgentData.isMobileDevice()) {
            setEditFrameFocus(this.parent.editableElement, e.selector);
        }
        save.restore();
        if (e.callBack) {
            e.callBack({
                requestType: 'LineHeight',
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: blocks // Return the modified block elements
            });
        }
    };
    LineHeight.prototype.destroy = function () {
        this.removeEventListener();
    };
    return LineHeight;
}());
export { LineHeight };
