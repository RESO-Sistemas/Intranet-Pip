import { NodeSelection } from '../../../selection/selection';
import { getBlockContentElement, normalizeUrl } from '../../../common/utils/index';
import { events } from '../../../common/constant';
import * as constants from '../../../common/constant';
/**
 * `LinkModule` module is used to handle hyperlinks in the block editor
 *
 * @hidden
 */
var LinkModule = /** @class */ (function () {
    function LinkModule(manager) {
        this.parent = manager;
        this.selectionManager = new NodeSelection(this.parent.blockContainer);
        this.addEventListeners();
    }
    LinkModule.prototype.addEventListeners = function () {
        this.parent.observer.on('linkPopupCreated', this.handleLinkCreated, this);
        this.parent.observer.on(events.editorClick, this.handleEditorClick, this);
        this.parent.observer.on(events.documentClick, this.handleDocumentClick, this);
        this.parent.observer.on(events.formattingPerformed, this.formattingPerformed, this);
        this.parent.observer.on('linkPopupAfterOpen', this.handleLinkPopupAfterOpen, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    LinkModule.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.editorClick, this.handleEditorClick);
        this.parent.observer.off(events.documentClick, this.handleDocumentClick);
        this.parent.observer.off(events.formattingPerformed, this.formattingPerformed);
        this.parent.observer.off('linkPopupAfterOpen', this.handleLinkPopupAfterOpen);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    LinkModule.prototype.handleLinkCreated = function () {
        this.popupElement = document.querySelector('#' + this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        if (this.popupElement) {
            this.bindPopupEvents();
        }
    };
    LinkModule.prototype.bindPopupEvents = function () {
        var _this = this;
        var insertButton = this.popupElement.querySelector('.e-insert-link-btn');
        var removeButton = this.popupElement.querySelector('.e-remove-link-btn');
        var cancelButton = this.popupElement.querySelector('.e-cancel-link-btn');
        insertButton.addEventListener('click', this.handleLinkInsertDeletion.bind(this));
        removeButton.addEventListener('click', this.handleLinkInsertDeletion.bind(this, true));
        cancelButton.addEventListener('click', function () { return _this.hideLinkPopup(); });
        var linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        var urlInput = linkDialog && linkDialog.querySelector('#linkUrl');
        if (urlInput) {
            urlInput.addEventListener('input', function () { return _this.syncButtonsByUrlField(); });
            // Allow Enter to submit when URL has content, but do NOT steal focus while typing
            urlInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    var hasText = (urlInput.value || '').trim().length > 0;
                    if (hasText) {
                        _this.handleLinkInsertDeletion(e);
                    }
                }
            });
        }
        this.popupElement.addEventListener('keydown', function (e) {
            var target = e.target;
            if (e.key === 'Enter') {
                e.preventDefault();
                if (target.classList.contains('e-insert-link-btn')) {
                    _this.handleLinkInsertDeletion(e);
                }
                else if (target.classList.contains('e-remove-link-btn')) {
                    _this.handleLinkInsertDeletion(e, true);
                }
                else if (target.classList.contains('e-cancel-link-btn')) {
                    _this.hideLinkPopup();
                }
            }
            else if (e.key === 'Escape') {
                e.preventDefault();
                _this.hideLinkPopup();
            }
        });
    };
    LinkModule.prototype.formattingPerformed = function (e) {
        if (e.subCommand === 'link') {
            this.hideLinkPopup();
        }
    };
    LinkModule.prototype.handleDocumentClick = function (e) {
        var target = e.target;
        if (!this.popupElement) {
            return;
        }
        if (this.popupElement.classList.contains('e-popup-open')
            && (!this.popupElement.contains(target))) {
            this.hideLinkPopup();
        }
    };
    LinkModule.prototype.handleEditorClick = function (e) {
        var target = e.target;
        if (target.tagName === 'A' || target.closest('a')) {
            e.preventDefault();
            var linkElement = target.tagName === 'A'
                ? target
                : target.closest('a');
            this.handleLinkClick(linkElement);
        }
    };
    /**
     * Shows the link popup dialog at cursor position
     *
     * @param {KeyboardEvent} e - Keyboard event that triggered the popup
     * @returns {void}
     * @hidden
     */
    LinkModule.prototype.showLinkPopup = function (e) {
        this.parent.inlineToolbarModule.hideInlineToolbar(e);
        var contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
        var selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (!contentElement || (selectedBlocks && selectedBlocks.length > 1)) {
            return;
        }
        this.selectionManager.saveSelection();
        var positionY = this.getDialogPosition();
        this.parent.observer.notify('showLinkPopup', { x: 'center', y: positionY });
    };
    LinkModule.prototype.getDialogPosition = function () {
        var distanceFromVisibleTop = this.parent.rootEditorElement.getBoundingClientRect().top;
        if (distanceFromVisibleTop < 0) {
            distanceFromVisibleTop = Math.abs(distanceFromVisibleTop) + this.parent.rootEditorElement.scrollTop;
            return distanceFromVisibleTop.toString();
        }
        else {
            return this.parent.rootEditorElement.scrollTop.toString();
        }
    };
    LinkModule.prototype.handleLinkPopupAfterOpen = function () {
        var _this = this;
        setTimeout(function () {
            _this.populateInputFields();
        }, 10);
    };
    LinkModule.prototype.populateInputFields = function () {
        var linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        var urlInput = linkDialog.querySelector('#linkUrl');
        var textInput = linkDialog.querySelector('#linkText');
        var titleInput = linkDialog.querySelector('#linkTitle');
        if (this.selectionManager && !this.selectionManager.isCollapsed()) {
            textInput.value = this.selectionManager.getSelectedText();
        }
        var linkInfo = this.getLinkFromSelection();
        if (linkInfo) {
            textInput.value = linkInfo.text;
            urlInput.value = linkInfo.url;
            titleInput.value = linkInfo.title;
        }
        // Ensure Remove button reflects whether a link existed in selection
        var removeBtn = this.popupElement.querySelector('.e-remove-link-btn');
        if (linkInfo) {
            removeBtn.removeAttribute('disabled');
        }
        else {
            removeBtn.setAttribute('disabled', '');
        }
        // Sync Insert button based on URL input
        this.syncButtonsByUrlField();
    };
    LinkModule.prototype.syncButtonsByUrlField = function () {
        var linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        var urlInput = linkDialog.querySelector('#linkUrl');
        var insertBtn = this.popupElement.querySelector('.e-insert-link-btn');
        var hasText = urlInput.value.trim().length > 0;
        if (hasText) {
            insertBtn.removeAttribute('disabled');
        }
        else {
            insertBtn.setAttribute('disabled', '');
        }
    };
    /**
     * Hides the link popup dialog and restores selection
     *
     * @returns {void}
     * @hidden
     */
    LinkModule.prototype.hideLinkPopup = function () {
        if (this.popupElement && this.popupElement.classList.contains('e-popup-close')) {
            return;
        }
        this.clearInputValues();
        this.parent.observer.notify('hideLinkPopup');
        var contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
        if (contentElement) {
            this.selectionManager.restoreSelection();
        }
    };
    LinkModule.prototype.clearInputValues = function () {
        var linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        var textInput = linkDialog.querySelector('#linkText');
        var urlInput = linkDialog.querySelector('#linkUrl');
        var titleInput = linkDialog.querySelector('#linkTitle');
        textInput.value = '';
        urlInput.value = '';
        titleInput.value = '';
        // Disable Remove button when inputs are cleared (Remove should not follow URL input)
        var removeBtn = this.popupElement.querySelector('.e-remove-link-btn');
        removeBtn.setAttribute('disabled', '');
        this.syncButtonsByUrlField();
    };
    LinkModule.prototype.handleLinkInsertDeletion = function (e, isRemove) {
        var contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
        var linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        if (!contentElement) {
            return;
        }
        this.selectionManager.restoreSelection();
        if (isRemove) {
            this.parent.formattingAction.execCommand({ subCommand: 'link', value: null });
            return;
        }
        var textInput = linkDialog.querySelector('#linkText');
        var urlInput = linkDialog.querySelector('#linkUrl');
        var titleInput = linkDialog.querySelector('#linkTitle');
        var url = normalizeUrl(urlInput.value);
        if (!url) {
            urlInput.focus();
            return;
        }
        this.parent.formattingAction.execCommand({
            subCommand: 'link',
            value: { text: textInput.value, url: url, title: titleInput.value }
        });
    };
    LinkModule.prototype.handleLinkClick = function (link) {
        var url = link.getAttribute('href');
        if (url) {
            window.open(url, link.getAttribute('target') || '_self');
        }
    };
    LinkModule.prototype.getLinkFromSelection = function () {
        if (!this.selectionManager) {
            return null;
        }
        var linkElement = this.selectionManager.getNodeFromSelection('a');
        if (linkElement) {
            var link = linkElement;
            return {
                text: link.textContent,
                url: link.getAttribute('href'),
                title: link.getAttribute('title')
            };
        }
        return null;
    };
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    LinkModule.prototype.isPopupOpen = function () {
        var linkDialogId = "" + (this.parent.rootEditorElement.id + constants.LINKDIALOG_ID);
        var linkPopup = document.querySelector("#" + linkDialogId + "." + constants.LINKDIALOG_CLS);
        return (linkPopup && linkPopup.classList.contains('e-popup-open'));
    };
    /**
     * Destroys the link module and cleans up resources
     *
     * @returns {void}
     */
    LinkModule.prototype.destroy = function () {
        this.removeEventListeners();
        this.selectionManager = null;
        this.popupElement = null;
    };
    return LinkModule;
}());
export { LinkModule };
