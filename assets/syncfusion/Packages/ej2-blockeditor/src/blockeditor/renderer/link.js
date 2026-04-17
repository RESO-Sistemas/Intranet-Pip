import { detach, getComponent } from '@syncfusion/ej2-base';
import { events } from '../../common/constant';
import * as constants from '../../common/constant';
/**
 * `LinkModule` module is used to handle hyperlinks in the block editor
 *
 * @hidden
 */
var LinkModule = /** @class */ (function () {
    function LinkModule(editor) {
        this.editor = editor;
        this.initializeModule();
    }
    LinkModule.prototype.initializeModule = function () {
        this.addEventListeners();
        this.createLinkPopup();
    };
    LinkModule.prototype.addEventListeners = function () {
        this.editor.blockManager.observer.on('showLinkPopup', this.showLinkPopup, this);
        this.editor.blockManager.observer.on('hideLinkPopup', this.hideLinkPopup, this);
        this.editor.on(events.localeChanged, this.updateLinkPopupLocale, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    };
    LinkModule.prototype.removeEventListeners = function () {
        this.editor.blockManager.observer.off('showLinkPopup', this.showLinkPopup);
        this.editor.blockManager.observer.off('hideLinkPopup', this.hideLinkPopup);
        this.editor.off(events.localeChanged, this.updateLinkPopupLocale);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    };
    LinkModule.prototype.createLinkPopup = function () {
        this.popupElement = this.createPopupElement();
        this.linkDialog = this.initializeDialog();
        this.updateTargetAndActionForPopup();
        this.editor.blockManager.observer.notify('linkPopupCreated');
    };
    LinkModule.prototype.createPopupElement = function () {
        var element = this.editor.createElement('div', {
            id: (this.editor.element.id + constants.LINKDIALOG_ID),
            className: constants.LINKDIALOG_CLS
        });
        this.editor.element.appendChild(element);
        return element;
    };
    LinkModule.prototype.initializeDialog = function () {
        var footerTemplate = "<div class='e-be-link-footer'>\n            <button type='button' tabindex='0' class='e-btn e-flat e-primary e-insert-link-btn'>" + this.editor.l10n.getConstant('linkInsert') + "</button>\n            <button type='button' tabindex='0' class='e-btn e-flat e-remove-link-btn'>" + this.editor.l10n.getConstant('linkRemove') + "</button>\n            <button type='button' tabindex='0' class='e-btn e-flat e-cancel-link-btn'>" + this.editor.l10n.getConstant('linkCancel') + "</button>\n        </div>";
        var contentTemplate = "<div class='e-be-link-content'>\n            <div class='e-link-form-row'>\n                <label for='linkUrl'>" + this.editor.l10n.getConstant('linkUrl') + "</label>\n                <input type='text' spellcheck=false id='linkUrl' class='e-input' placeholder='" + this.editor.l10n.getConstant('linkUrlPlaceholder') + "' required>\n            </div>\n            <div class='e-link-form-row'>\n                <label for='linkText'>" + this.editor.l10n.getConstant('linkText') + "</label>\n                <input type='text' spellcheck=false id='linkText' class='e-input' placeholder='" + this.editor.l10n.getConstant('linkTextPlaceholder') + "' required>\n            </div>\n            <div class='e-link-form-row'>\n                <label for='linkTitle'>" + this.editor.l10n.getConstant('linkTitle') + "</label>\n                <input type='text' spellcheck=false id='linkTitle' class='e-input' placeholder='" + this.editor.l10n.getConstant('linkTitlePlaceholder') + "'>\n            </div>\n        </div>";
        var headerTemplate = "<div class=\"e-be-link-header\">" + this.editor.l10n.getConstant('insertLink') + "</div>";
        var dialogOptions = {
            element: this.popupElement,
            headerTemplate: headerTemplate,
            footerTemplate: footerTemplate,
            contentTemplate: contentTemplate,
            showCloseIcon: true,
            closeOnEscape: true,
            width: '300px',
            height: 'auto',
            visible: false
        };
        return this.editor.dialogRenderer.renderDialog(dialogOptions);
    };
    LinkModule.prototype.updateTargetAndActionForPopup = function () {
        var popup = getComponent(this.linkDialog.element, 'popup');
        popup.relateTo = this.editor.element;
        popup.actionOnScroll = 'hide';
        popup.dataBind();
    };
    LinkModule.prototype.updateLinkPopupLocale = function () {
        if (!this.linkDialog || !this.popupElement) {
            return;
        }
        this.linkDialog.locale = this.editor.locale;
        this.linkDialog.dataBind();
        this.updatePopupElementLocale('.e-be-link-header', 'insertLink');
        this.updatePopupElementLocale('.e-insert-link-btn', 'linkInsert');
        this.updatePopupElementLocale('.e-remove-link-btn', 'linkRemove');
        this.updatePopupElementLocale('.e-cancel-link-btn', 'linkCancel');
        this.updatePopupElementLocale('label[for="linkText"]', 'linkText');
        this.updatePopupElementLocale('#linkText', 'linkText', 'linkTextPlaceholder');
        this.updatePopupElementLocale('label[for="linkUrl"]', 'linkUrl');
        this.updatePopupElementLocale('#linkUrl', 'linkUrl', 'linkUrlPlaceholder');
        this.updatePopupElementLocale('label[for="linkTitle"]', 'linkTitle');
        this.updatePopupElementLocale('#linkTitle', 'linkTitle', 'linkTitlePlaceholder');
    };
    LinkModule.prototype.updatePopupElementLocale = function (selector, textKey, placeholderKey) {
        var element = this.popupElement.querySelector(selector);
        if (element) {
            element.textContent = this.editor.l10n.getConstant(textKey);
            if (placeholderKey && element instanceof HTMLInputElement) {
                element.placeholder = this.editor.l10n.getConstant(placeholderKey);
            }
        }
    };
    LinkModule.prototype.applyRtlSettings = function () {
        this.linkDialog.enableRtl = this.editor.enableRtl;
    };
    /**
     * Shows the link popup dialog at cursor position
     *
     * @param {{ x: string, y: string }} position - position(x and y) for displaying popup
     * @returns {void}
     * @hidden
     */
    LinkModule.prototype.showLinkPopup = function (position) {
        this.linkDialog.position = { X: position.x, Y: position.y };
        this.linkDialog.dataBind();
        this.linkDialog.show();
        this.editor.blockManager.observer.notify('linkPopupAfterOpen', this.linkDialog);
    };
    /**
     * Hides the link popup dialog and restores selection
     *
     * @returns {void}
     * @hidden
     */
    LinkModule.prototype.hideLinkPopup = function () {
        this.linkDialog.hide();
    };
    /**
     * Destroys the link module and cleans up resources
     *
     * @returns {void}
     */
    LinkModule.prototype.destroy = function () {
        if (this.linkDialog) {
            this.linkDialog.destroy();
            detach(this.popupElement);
        }
        this.removeEventListeners();
        this.linkDialog = null;
    };
    return LinkModule;
}());
export { LinkModule };
