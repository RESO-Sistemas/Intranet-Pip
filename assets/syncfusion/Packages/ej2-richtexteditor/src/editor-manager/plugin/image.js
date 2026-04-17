import { createElement, isNullOrUndefined as isNOU, detach, closest, addClass, removeClass, select, Browser, formatUnit } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import * as classes from './../base/classes';
import { InsertHtml } from './inserthtml';
import * as EVENTS from './../../common/constant';
import { scrollToCursor } from '../../common/util';
/**
 * Link internal component
 *
 * @hidden
 * @private
 */
var ImageCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {IEditorModel} parent - specifies the parent element
     * @hidden
     * @private
     */
    function ImageCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ImageCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.IMAGE, this.imageCommand, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    ImageCommand.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.IMAGE, this.imageCommand);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    /**
     * imageCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @private
     */
    ImageCommand.prototype.imageCommand = function (e) {
        switch (e.value.toString().toLowerCase()) {
            case 'image':
            case 'replace':
                this.createImage(e);
                break;
            case 'insertlink':
                this.insertImageLink(e);
                break;
            case 'openimagelink':
                this.openImageLink(e);
                break;
            case 'editimagelink':
                this.editImageLink(e);
                break;
            case 'removeimagelink':
                this.removeImageLink(e);
                break;
            case 'remove':
                this.removeImage(e);
                break;
            case 'alttext':
                this.insertAltTextImage(e);
                break;
            case 'dimension':
                this.imageDimension(e);
                break;
            case 'caption':
                this.imageCaption(e);
                break;
            case 'justifyleft':
                this.imageJustifyLeft(e);
                break;
            case 'justifycenter':
                this.imageJustifyCenter(e);
                break;
            case 'justifyright':
                this.imageJustifyRight(e);
                break;
            case 'leftwrap':
                this.imageLeftWrap(e);
                break;
            case 'rightwrap':
                this.imageRightWrap(e);
                break;
            case 'inline':
                this.imageInline(e);
                break;
            case 'break':
                this.imageBreak(e);
                break;
        }
    };
    ImageCommand.prototype.createImage = function (e) {
        var _this = this;
        var isReplaced = false;
        e.item.url = isNOU(e.item.url) || e.item.url === 'undefined' ? e.item.src : e.item.url;
        if (!isNOU(e.item.selectParent) && e.item.selectParent[0].tagName === 'IMG') {
            var imgEle = e.item.selectParent[0];
            isReplaced = true;
            this.setStyle(imgEle, e, isReplaced);
        }
        else {
            var imgElement = createElement('img');
            this.setStyle(imgElement, e);
            if (!isNOU(e.item.selection)) {
                e.item.selection.restore();
            }
            if (!isNOU(e.selector) && e.selector === 'pasteCleanupModule') {
                if (!isNOU(this.parent.currentDocument)) {
                    e.callBack({ requestType: 'Images',
                        editorMode: 'HTML',
                        event: e.event,
                        range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                        elements: [imgElement]
                    });
                }
            }
            else {
                InsertHtml.Insert(this.parent.currentDocument, imgElement, this.parent.editableElement);
            }
        }
        if (e.callBack && (isNOU(e.selector) || !isNOU(e.selector) && e.selector !== 'pasteCleanupModule')) {
            var selectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)[0];
            var imgElm_1 = (e.value === 'Replace' || isReplaced) ? e.item.selectParent[0] :
                (Browser.isIE ? selectedNode.previousSibling : selectedNode.previousElementSibling);
            var onImageLoadEvent_1 = function () {
                if (!isNOU(_this.parent.currentDocument)) {
                    if (_this.parent.userAgentData.isSafari()) {
                        scrollToCursor(_this.parent.currentDocument, _this.parent.editableElement);
                    }
                    var imgWidth = imgElm_1.getAttribute('width');
                    var imgHeight = imgElm_1.getAttribute('height');
                    if (isNOU(imgWidth) || imgWidth === 'auto') {
                        imgElm_1.setAttribute('width', imgElm_1.offsetWidth.toString());
                    }
                    if (isNOU(imgHeight) || imgHeight === 'auto') {
                        imgElm_1.setAttribute('height', imgElm_1.offsetHeight.toString());
                    }
                    e.callBack({
                        requestType: (e.value === 'Replace') ? (e.item.subCommand = 'Replace', 'Replace') : 'Images',
                        editorMode: 'HTML',
                        event: e.event,
                        range: _this.parent.nodeSelection.getRange(_this.parent.currentDocument),
                        elements: [imgElm_1]
                    });
                }
                imgElm_1.removeEventListener('load', onImageLoadEvent_1);
            };
            imgElm_1.addEventListener('load', onImageLoadEvent_1);
        }
    };
    ImageCommand.prototype.setStyle = function (imgElement, e, imgReplace) {
        if (!isNOU(e.item.url)) {
            imgElement.setAttribute('src', e.item.url);
        }
        var alignClassName;
        if (imgReplace) {
            var alignClass = {
                'e-imgcenter': 'e-imgcenter',
                'e-imgright': 'e-imgright',
                'e-imgleft': 'e-imgleft'
            };
            var imgClassList = imgElement.classList;
            for (var i = 0; i < imgClassList.length; i++) {
                if (!isNOU(alignClass[imgClassList[i]])) {
                    alignClassName = alignClass[imgClassList[i]];
                }
            }
        }
        if (!this.parent.isBlazor) {
            if (imgReplace) {
                if (!isNOU(e.item.cssClass) && e.item.cssClass !== '') {
                    var captionEle = closest(imgElement, '.e-img-caption-container');
                    if (!isNOU(captionEle)) {
                        addClass([captionEle], e.item.cssClass);
                    }
                    else {
                        addClass([imgElement], e.item.cssClass);
                    }
                }
            }
            else {
                imgElement.setAttribute('class', 'e-rte-image' + ' ' + e.item.cssClass);
            }
        }
        else {
            imgElement.setAttribute('class', 'e-rte-image' + (isNOU(e.item.cssClass) ? '' : ' ' + e.item.cssClass)
                + (isNOU(alignClassName) ? '' : ' ' + alignClassName));
        }
        if (!isNOU(e.item.altText)) {
            imgElement.setAttribute('alt', e.item.altText.replace(/\.[a-zA-Z0-9]+$/, ''));
        }
        if (!isNOU(e.item.width) && !isNOU(e.item.width.width)) {
            imgElement.setAttribute('width', this.calculateStyleValue(e.item.width.width));
        }
        if (!isNOU(e.item.height) && !isNOU(e.item.height.height)) {
            imgElement.setAttribute('height', this.calculateStyleValue(e.item.height.height));
        }
        if (!isNOU(e.item.width) && !isNOU(e.item.width.minWidth)) {
            imgElement.style.minWidth = this.calculateStyleValue(e.item.width.minWidth);
        }
        if (!isNOU(e.item.width) && !isNOU(e.item.width.maxWidth)) {
            imgElement.style.maxWidth = this.calculateStyleValue(e.item.width.maxWidth);
        }
        if (!isNOU(e.item.height) && !isNOU(e.item.height.minHeight)) {
            imgElement.style.minHeight = this.calculateStyleValue(e.item.height.minHeight);
        }
        if (!isNOU(e.item.height) && !isNOU(e.item.height.maxHeight)) {
            imgElement.style.maxHeight = this.calculateStyleValue(e.item.height.maxHeight);
        }
    };
    ImageCommand.prototype.calculateStyleValue = function (value) {
        var styleValue;
        if (typeof (value) === 'string') {
            if (value.indexOf('px') !== -1 || value.indexOf('%') !== -1 || value.indexOf('auto') !== -1) {
                styleValue = value;
            }
            else {
                styleValue = value + 'px';
            }
        }
        else {
            styleValue = value + 'px';
        }
        return styleValue;
    };
    ImageCommand.prototype.insertImageLink = function (e) {
        var anchor = createElement('a', {
            attrs: {
                href: e.item.url
            }
        });
        if (e.item.selectNode[0].parentElement.classList.contains('e-img-wrap')) {
            e.item.selection.restore();
            anchor.setAttribute('contenteditable', 'true');
        }
        anchor.appendChild(e.item.selectNode[0]);
        if (!isNOU(e.item.target)) {
            anchor.setAttribute('target', e.item.target);
        }
        if (!isNOU(e.item.ariaLabel)) {
            anchor.setAttribute('aria-label', e.item.ariaLabel);
        }
        InsertHtml.Insert(this.parent.currentDocument, anchor, this.parent.editableElement);
        this.callBack(e);
    };
    ImageCommand.prototype.openImageLink = function (e) {
        document.defaultView.open(e.item.url, e.item.target);
        this.callBack(e);
    };
    ImageCommand.prototype.removeImageLink = function (e) {
        var selectParent = e.item.selectParent[0];
        if (selectParent.classList.contains('e-img-caption') ||
            selectParent.classList.contains('e-img-caption-container')) {
            var capImgWrap = void 0;
            var textEle = void 0;
            if (!this.parent.isBlazor) {
                capImgWrap = select('.e-img-wrap', selectParent);
                textEle = select('.e-img-caption-text', selectParent);
            }
            else {
                capImgWrap = select('.e-img-wrap', selectParent);
                textEle = select('.e-img-inner', selectParent);
            }
            var newTextEle = textEle.cloneNode(true);
            detach(select('a', selectParent));
            detach(textEle);
            capImgWrap.appendChild(e.item.insertElement);
            capImgWrap.appendChild(newTextEle);
        }
        else {
            detach(selectParent);
            if (Browser.isIE && e.item.selection) {
                e.item.selection.restore();
            }
            InsertHtml.Insert(this.parent.currentDocument, e.item.insertElement, this.parent.editableElement);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.editImageLink = function (e) {
        e.item.selectNode[0].parentElement.href = e.item.url;
        if (isNOU(e.item.target)) {
            e.item.selectNode[0].parentElement.removeAttribute('target');
            e.item.selectNode[0].parentElement.removeAttribute('aria-label');
        }
        else {
            e.item.selectNode[0].parentElement.target = e.item.target;
            e.item.selectNode[0].parentElement.setAttribute('aria-label', e.item.ariaLabel);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.removeImage = function (e) {
        if (!this.parent.isBlazor) {
            if (closest(e.item.selectNode[0], 'a')) {
                if (e.item.selectNode[0].parentElement.nodeName === 'A' && !isNOU(e.item.selectNode[0].parentElement.innerText)) {
                    if (!isNOU(closest(e.item.selectNode[0], '.e-img-caption-container'))) {
                        detach(closest(e.item.selectNode[0], '.e-img-caption-container'));
                    }
                    else {
                        detach(e.item.selectNode[0]);
                    }
                }
                else {
                    detach(closest(e.item.selectNode[0], 'a'));
                }
            }
            else if (!isNOU(closest(e.item.selectNode[0], '.e-img-caption-container'))) {
                detach(closest(e.item.selectNode[0], '.e-img-caption-container'));
            }
            else {
                var imgParentElem = e.item.selectNode[0].parentElement;
                detach(e.item.selectNode[0]);
                if (imgParentElem.childNodes.length === 0) {
                    imgParentElem.appendChild(document.createElement('br'));
                }
            }
        }
        else {
            if (closest(e.item.selectNode[0], 'a')) {
                if (e.item.selectNode[0].parentElement.nodeName === 'A' && !isNOU(e.item.selectNode[0].parentElement.innerText)) {
                    if (!isNOU(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION))) {
                        detach(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION));
                    }
                    else {
                        detach(e.item.selectNode[0]);
                    }
                }
                else {
                    detach(closest(e.item.selectNode[0], 'a'));
                }
            }
            else if (!isNOU(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION))) {
                detach(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION));
            }
            else {
                var imgParentElem = e.item.selectNode[0].parentElement;
                detach(e.item.selectNode[0]);
                if (imgParentElem.childNodes.length === 0) {
                    imgParentElem.appendChild(document.createElement('br'));
                }
            }
        }
        this.callBack(e);
    };
    ImageCommand.prototype.insertAltTextImage = function (e) {
        e.item.selectNode[0].setAttribute('alt', e.item.altText);
        this.callBack(e);
    };
    ImageCommand.prototype.imageDimension = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!this.parent.isBlazor) {
            var captionEle = closest(selectNode, '.e-img-caption-container');
            selectNode.style.height = '';
            selectNode.style.width = '';
            var widthValue = void 0;
            if (e.item.width !== 'auto') {
                widthValue = formatUnit(e.item.width);
            }
            else {
                if (!isNOU(captionEle)) {
                    captionEle.style.width = '';
                    captionEle.removeAttribute('width');
                }
                selectNode.removeAttribute('width');
            }
            if (e.item.height !== 'auto') {
                selectNode.style.height = formatUnit(e.item.height);
            }
            else {
                selectNode.removeAttribute('height');
            }
            if (!isNOU(captionEle) && !isNOU(widthValue)) {
                if ((widthValue.indexOf('%') !== -1)) {
                    captionEle.style.width = selectNode.style.width = this.percToPix(widthValue, selectNode) + 'px';
                }
                else {
                    captionEle.style.width = selectNode.style.width = widthValue;
                }
            }
            else {
                selectNode.style.width = widthValue;
            }
        }
        else {
            selectNode.style.height = '';
            selectNode.style.width = '';
            if (e.item.width !== 'auto') {
                selectNode.style.width = formatUnit(e.item.width);
            }
            else {
                selectNode.removeAttribute('width');
            }
            if (e.item.height !== 'auto') {
                selectNode.style.height = formatUnit(e.item.height);
            }
            else {
                selectNode.removeAttribute('height');
            }
        }
        this.callBack(e);
    };
    ImageCommand.prototype.percToPix = function (value, targetEle) {
        var percent = parseFloat(value.replace('%', '').trim());
        var refEle = this.parent.domTree.getParentBlockNode(targetEle);
        return Math.round(percent / 100 * refEle.getBoundingClientRect().width);
    };
    ImageCommand.prototype.imageCaption = function (e) {
        InsertHtml.Insert(this.parent.currentDocument, e.item.insertElement, this.parent.editableElement);
        this.callBack(e);
    };
    ImageCommand.prototype.imageJustifyLeft = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (!this.parent.isBlazor) {
                if (selectNode.classList.contains('e-img-left')) {
                    return;
                }
                this.removeImageOrCaptionEleClass([selectNode]);
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], 'e-img-left');
                }
                if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                    addClass([closest(selectNode, '.e-img-caption-container')], 'e-img-left');
                }
                else {
                    addClass([selectNode], 'e-img-left');
                }
            }
            else {
                selectNode.removeAttribute('class');
                addClass([selectNode], 'e-rte-image');
                if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.' + classes.CLASS_CAPTION)]);
                    addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
                }
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
                    addClass([selectNode], classes.CLASS_IMAGE_LEFT);
                }
                else if (selectNode.parentElement.nextElementSibling != null) {
                    addClass([selectNode], classes.CLASS_IMAGE_LEFT);
                    if (this.parent.isBlazor) {
                        selectNode.parentElement.nextElementSibling.style.clear = 'left';
                    }
                }
                else {
                    addClass([selectNode], classes.CLASS_IMAGE_LEFT);
                }
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageJustifyCenter = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (!this.parent.isBlazor) {
                if (selectNode.classList.contains('e-img-center')) {
                    return;
                }
                this.removeImageOrCaptionEleClass([selectNode]);
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], 'e-img-center');
                }
                if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                    addClass([closest(selectNode, '.e-img-caption-container')], 'e-img-center');
                }
                else {
                    addClass([selectNode], 'e-img-center');
                }
            }
            else {
                selectNode.removeAttribute('class');
                addClass([selectNode], 'e-rte-image');
                if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.' + classes.CLASS_CAPTION)]);
                    addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
                }
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], classes.CLASS_IMAGE_CENTER);
                    addClass([selectNode], classes.CLASS_IMAGE_CENTER);
                }
                else {
                    addClass([selectNode], classes.CLASS_IMAGE_CENTER);
                }
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageJustifyRight = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (!this.parent.isBlazor) {
                if (selectNode.classList.contains('e-img-right')) {
                    return;
                }
                this.removeImageOrCaptionEleClass([selectNode]);
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], 'e-img-right');
                }
                if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                    addClass([closest(selectNode, '.e-img-caption-container')], 'e-img-right');
                }
                else {
                    addClass([selectNode], 'e-img-right');
                }
            }
            else {
                selectNode.removeAttribute('class');
                addClass([selectNode], 'e-rte-image');
                if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.' + classes.CLASS_CAPTION)]);
                    addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
                }
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
                    addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
                }
                else if (selectNode.parentElement.nextElementSibling != null) {
                    addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
                    if (this.parent.isBlazor) {
                        selectNode.parentElement.nextElementSibling.style.clear = 'right';
                    }
                }
                else {
                    addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
                }
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageLeftWrap = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (selectNode.classList.contains('e-img-left-wrap')) {
                return;
            }
            this.removeImageOrCaptionEleClass([selectNode]);
            if (selectNode.parentElement.nodeName === 'A') {
                this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                addClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT_WRAP);
            }
            if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                addClass([closest(selectNode, '.e-img-caption-container')], classes.CLASS_IMAGE_LEFT_WRAP);
            }
            else {
                addClass([selectNode], classes.CLASS_IMAGE_LEFT_WRAP);
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageRightWrap = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (selectNode.classList.contains('e-img-right-wrap')) {
                return;
            }
            this.removeImageOrCaptionEleClass([selectNode]);
            if (selectNode.parentElement.nodeName === 'A') {
                this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                addClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT_WRAP);
            }
            if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                addClass([closest(selectNode, '.e-img-caption-container')], classes.CLASS_IMAGE_RIGHT_WRAP);
            }
            else {
                addClass([selectNode], classes.CLASS_IMAGE_RIGHT_WRAP);
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.removeImageOrCaptionEleClass = function (targetEle) {
        if (!this.parent.isBlazor) {
            removeClass(targetEle, 'e-img-inline');
            removeClass(targetEle, 'e-img-break');
            removeClass(targetEle, 'e-img-center');
            removeClass(targetEle, 'e-img-left');
            removeClass(targetEle, 'e-img-right');
            removeClass(targetEle, classes.CLASS_IMAGE_LEFT_WRAP);
            removeClass(targetEle, classes.CLASS_IMAGE_RIGHT_WRAP);
        }
        else {
            removeClass(targetEle, classes.CLASS_IMAGE_INLINE);
            removeClass(targetEle, classes.CLASS_IMAGE_BREAK);
            removeClass(targetEle, classes.CLASS_IMAGE_CENTER);
            removeClass(targetEle, classes.CLASS_IMAGE_LEFT);
            removeClass(targetEle, classes.CLASS_IMAGE_RIGHT);
        }
    };
    ImageCommand.prototype.imageInline = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (!this.parent.isBlazor) {
                if (selectNode.classList.contains('e-img-inline')) {
                    return;
                }
                this.removeImageOrCaptionEleClass([selectNode]);
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], 'e-img-inline');
                }
                if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                    addClass([closest(selectNode, '.e-img-caption-container')], 'e-img-inline');
                }
                else {
                    addClass([selectNode], 'e-img-inline');
                }
            }
            else {
                selectNode.removeAttribute('class');
                addClass([selectNode], 'e-rte-image');
                addClass([selectNode], classes.CLASS_IMAGE_INLINE);
                if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_BREAK);
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
                    addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_CAPTION_INLINE);
                }
            }
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageBreak = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            if (!this.parent.isBlazor) {
                if (selectNode.classList.contains('e-img-break')) {
                    return;
                }
                this.removeImageOrCaptionEleClass([selectNode]);
                if (selectNode.parentElement.nodeName === 'A') {
                    this.removeImageOrCaptionEleClass([selectNode.parentElement]);
                    addClass([selectNode.parentElement], 'e-img-break');
                }
                if (!isNOU(closest(selectNode, '.e-img-caption-container'))) {
                    this.removeImageOrCaptionEleClass([closest(selectNode, '.e-img-caption-container')]);
                    addClass([closest(selectNode, '.e-img-caption-container')], 'e-img-break');
                }
                else {
                    addClass([selectNode], 'e-img-break');
                }
            }
            else {
                selectNode.removeAttribute('class');
                addClass([selectNode], 'e-rte-image');
                addClass([selectNode], classes.CLASS_IMAGE_BREAK);
                if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_CAPTION_INLINE);
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
                    removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
                    addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_BREAK);
                }
            }
        }
        this.callBack(e);
    };
    ImageCommand.prototype.callBack = function (e) {
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    ImageCommand.prototype.destroy = function () {
        this.removeEventListener();
    };
    return ImageCommand;
}());
export { ImageCommand };
