import { addClass, detach, isNullOrUndefined as isNOU, getComponent, getUniqueID } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Uploader } from '@syncfusion/ej2-inputs';
import * as classes from '../base/classes';
import * as events from '../base/constant';
import { ImageInputSource, MediaInputSource } from '../../common/enum';
import { CLS_IMG_FOCUS, CLS_AUD_FOCUS, CLS_VID_FOCUS } from '../../common/constant';
var PopupUploader = /** @class */ (function () {
    function PopupUploader(parent) {
        this.isDestroyed = false;
        this.parent = parent;
        this.rteID = parent.element.id;
    }
    /**
     * Creates and renders a popup for media upload
     *
     * @param {MediaType} type - Type of popup (Image, Video, Audio)
     * @param {HTMLElement} element - Element to append popup
     * @returns {Popup} - Returns the created popup
     * @hidden
     */
    PopupUploader.prototype.renderPopup = function (type, element) {
        var popupElement = this.parent.createElement('div');
        popupElement.setAttribute('id', getUniqueID(this.rteID + '_' + type.toLowerCase() + '_upload_popup'));
        this.parent.rootContainer.appendChild(popupElement);
        var boundObj = { popupRoot: popupElement, self: this };
        var uploadEle = this.parent.createElement('input', {
            id: getUniqueID(this.rteID + '_' + type.toLowerCase() + '_upload'),
            attrs: { type: 'File', name: 'UploadFiles' }
        });
        // Create popup based on type
        var popup = new Popup(popupElement, {
            relateTo: element,
            viewPortElement: this.parent.inputElement,
            zIndex: 10001,
            content: uploadEle,
            enableRtl: this.parent.enableRtl,
            height: '85px',
            width: '300px',
            actionOnScroll: 'none',
            close: this.onPopupClose.bind(boundObj)
        });
        popup.element.style.display = 'none';
        addClass([popup.element], classes.CLS_POPUP_OPEN);
        addClass([popup.element], classes.CLS_RTE_UPLOAD_POPUP);
        // Add type-specific class
        switch (type) {
            case 'Images':
                popup.element.classList.add(classes.CLS_RTE_IMAGE_UPLOAD_POPUP);
                break;
            case 'Videos':
                popup.element.classList.add(classes.CLS_RTE_VIDEO_UPLOAD_POPUP);
                break;
            case 'Audios':
                popup.element.classList.add(classes.CLS_RTE_AUDIO_UPLOAD_POPUP);
                break;
        }
        if (!isNOU(this.parent.cssClass)) {
            addClass([popup.element], this.parent.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        return popup;
    };
    /**
     * Creates and initializes an uploader for the specified media type
     *
     * @param {MediaType} type - Type of media (Image, Video, Audio)
     * @param {DragEvent} dragEvent - Drag event data
     * @param {HTMLElement} [mediaElement] - Optional media element for upload
     * @param {HTMLElement} target - Target element to append uploader
     * @param {Popup} popup - Uploader popup object
     * @returns {Uploader} - Returns the created uploader
     * @hidden
     */
    PopupUploader.prototype.createUploader = function (type, dragEvent, mediaElement, target, popup) {
        var _this = this;
        var isUploading = false;
        var allowedExtensions = '';
        var saveUrl;
        var removeUrl;
        var maxFileSize;
        // Get settings based on type
        switch (type) {
            case 'Images':
                allowedExtensions = this.parent.insertImageSettings.allowedTypes.toString();
                saveUrl = this.parent.insertImageSettings.saveUrl;
                removeUrl = this.parent.insertImageSettings.removeUrl;
                maxFileSize = this.parent.insertImageSettings.maxFileSize;
                break;
            case 'Videos':
                allowedExtensions = this.parent.insertVideoSettings.allowedTypes.toString();
                saveUrl = this.parent.insertVideoSettings.saveUrl;
                removeUrl = this.parent.insertVideoSettings.removeUrl;
                maxFileSize = this.parent.insertVideoSettings.maxFileSize;
                break;
            case 'Audios':
                allowedExtensions = this.parent.insertAudioSettings.allowedTypes.toString();
                saveUrl = this.parent.insertAudioSettings.saveUrl;
                removeUrl = this.parent.insertAudioSettings.removeUrl;
                maxFileSize = this.parent.insertAudioSettings.maxFileSize;
                break;
        }
        // Create uploader with standard configuration
        var uploader = new Uploader({
            asyncSettings: {
                saveUrl: saveUrl,
                removeUrl: removeUrl
            },
            cssClass: classes.CLS_RTE_DIALOG_UPLOAD + this.parent.getCssClass(true),
            allowedExtensions: allowedExtensions,
            maxFileSize: maxFileSize,
            multiple: false,
            enableRtl: this.parent.enableRtl,
            removing: function () {
                isUploading = false;
                if (mediaElement) {
                    detach(mediaElement);
                }
                if (popup) {
                    popup.close();
                    _this.enableToolbarItems();
                }
            },
            canceling: function () {
                isUploading = false;
                if (mediaElement) {
                    detach(mediaElement);
                }
                if (popup) {
                    popup.close();
                    _this.enableToolbarItems();
                }
                // Handle all media type quickToolbars
                if (_this.parent.quickToolbarModule) {
                    if (type === 'Images' && _this.parent.quickToolbarModule.imageQTBar) {
                        _this.parent.quickToolbarModule.imageQTBar.hidePopup();
                    }
                    else if (type === 'Videos' && _this.parent.quickToolbarModule.videoQTBar) {
                        _this.parent.quickToolbarModule.videoQTBar.hidePopup();
                    }
                    else if (type === 'Audios' && _this.parent.quickToolbarModule.audioQTBar) {
                        _this.parent.quickToolbarModule.audioQTBar.hidePopup();
                    }
                }
            },
            beforeUpload: function (args) {
                var eventName = type === 'Images' ? events.beforeImageUpload : events.beforeFileUpload;
                _this.parent.trigger(eventName, args);
                if (!_this.parent.inlineMode.enable && _this.parent.toolbarModule && _this.parent.toolbarModule.baseToolbar) {
                    _this.parent.toolbarModule.baseToolbar.toolbarObj.disable(true);
                }
            },
            uploading: function (args) {
                if (!_this.parent.isServerRendered) {
                    isUploading = true;
                    var eventName = type === 'Images' ? events.imageUploading : events.fileUploading;
                    _this.parent.trigger(eventName, args, function (uploadingArgs) {
                        if (uploadingArgs.cancel) {
                            if (mediaElement && !isNOU(mediaElement)) {
                                detach(mediaElement);
                            }
                            if (popup && popup.element && !isNOU(popup.element)) {
                                detach(popup.element);
                            }
                        }
                    });
                }
            },
            selected: function (args) {
                if (isUploading) {
                    args.cancel = true;
                }
            },
            failure: function (args) {
                isUploading = false;
                var popupArgs = {
                    args: dragEvent,
                    type: type,
                    isNotify: undefined,
                    elements: mediaElement
                };
                _this.uploadFailureTime = setTimeout(function () {
                    _this.uploadFailure(mediaElement, popupArgs, args, popup);
                }, 900);
            },
            success: function (args) {
                if (args.operation === 'cancel') {
                    return;
                }
                isUploading = false;
                var popupArgs = {
                    args: dragEvent,
                    type: type,
                    isNotify: undefined,
                    elements: mediaElement
                };
                var imageArgs;
                var mediaArgs;
                if (type === 'Images') {
                    imageArgs = {
                        e: args.e,
                        file: args.file,
                        statusText: args.statusText,
                        operation: args.operation,
                        response: args.response,
                        element: mediaElement,
                        detectImageSource: ImageInputSource.Dropped
                    };
                }
                else {
                    mediaArgs = {
                        e: args.e,
                        file: args.file,
                        statusText: args.statusText,
                        operation: args.operation,
                        response: args.response,
                        element: mediaElement,
                        detectMediaSource: MediaInputSource.Dropped
                    };
                }
                _this.uploadSuccessTime = setTimeout(function () {
                    // Cast args based on the type of media
                    if (type === 'Images') {
                        _this.uploadSuccess(mediaElement, dragEvent, popupArgs, imageArgs, popup);
                    }
                    else if (type === 'Videos' || type === 'Audios') {
                        _this.uploadSuccess(mediaElement, dragEvent, popupArgs, mediaArgs, popup);
                    }
                }, 900);
            }
        });
        uploader.appendTo(target);
        var file = dragEvent.dataTransfer.files[0];
        var fileInfo = [{
                name: file.name,
                rawFile: file,
                size: file.size,
                type: file.type,
                status: 'Ready to Upload',
                validationMessages: { minSize: '', maxSize: '' },
                statusCode: '1'
            }];
        uploader.createFileList(fileInfo);
        uploader.upload(fileInfo);
        return uploader;
    };
    /**
     * Called when drop upload fails
     *
     * @param {HTMLElement} mediaEle - The media element
     * @param {IShowPopupArgs} args - Popup arguments
     * @param {FailureEventArgs} e - Failure event arguments
     * @param {Popup} popup - Uploader popup object
     * @returns {void}
     * @hidden
     */
    PopupUploader.prototype.uploadFailure = function (mediaEle, args, e, popup) {
        // Trigger appropriate event based on type
        var eventName = args.type === 'Images' ? events.imageUploadFailed : events.fileUploadFailed;
        this.parent.trigger(eventName, e);
        if (!isNOU(mediaEle) && !isNOU(popup)) {
            detach(mediaEle);
            popup.close();
            this.enableToolbarItems();
        }
        else {
            return;
        }
    };
    /**
     * Called when upload is successful
     *
     * @param {HTMLElement} mediaElement - The media element
     * @param {DragEvent} dragEvent - The drag event
     * @param {IShowPopupArgs} args - Popup arguments
     * @param {ImageSuccessEventArgs | MediaSuccessEventArgs} e - Success event arguments
     * @param {Popup} popup - Uploader popup object
     * @returns {void}
     * @hidden
     */
    PopupUploader.prototype.uploadSuccess = function (mediaElement, dragEvent, args, e, popup) {
        var _this = this;
        if (e.operation === 'cancel') {
            return;
        }
        mediaElement.style.opacity = '1';
        // Add appropriate class based on media type
        switch (args.type) {
            case 'Images':
                mediaElement.classList.add(CLS_IMG_FOCUS);
                break;
            case 'Videos':
            case 'Audios': {
                var focusClass = args.type === 'Videos' ? CLS_VID_FOCUS : CLS_AUD_FOCUS;
                mediaElement.classList.add(focusClass);
                break;
            }
        }
        // Trigger appropriate event based on type
        var eventName = args.type === 'Images' ? events.imageUploadSuccess : events.fileUploadSuccess;
        this.parent.trigger(eventName, e, function (responseData) {
            if (mediaElement && responseData.file) {
                var fileName = responseData.file.name;
                switch (args.type) {
                    case 'Images':
                        if (!isNOU(_this.parent.insertImageSettings.path)) {
                            var url = _this.parent.insertImageSettings.path + fileName;
                            mediaElement.src = url;
                            mediaElement.setAttribute('alt', fileName);
                        }
                        break;
                    case 'Videos':
                        if (!isNOU(_this.parent.insertVideoSettings.path)) {
                            var url = _this.parent.insertVideoSettings.path + fileName;
                            // Find source element and update its src attribute
                            var sourceElement = mediaElement.querySelector('source');
                            if (sourceElement) {
                                sourceElement.setAttribute('src', url);
                                // Update MIME type
                                var fileExtension = fileName.split('.').pop().toLowerCase();
                                sourceElement.setAttribute('type', 'video/' + fileExtension);
                                // Reset opacity
                                mediaElement.style.opacity = '1';
                            }
                        }
                        break;
                    case 'Audios':
                        if (!isNOU(_this.parent.insertAudioSettings.path)) {
                            var url = _this.parent.insertAudioSettings.path + fileName;
                            // Find source element and update its src attribute
                            var sourceElement = mediaElement.querySelector('source');
                            if (sourceElement) {
                                sourceElement.setAttribute('src', url);
                                // Update MIME type
                                var fileExtension = fileName.split('.').pop().toLowerCase();
                                sourceElement.setAttribute('type', 'audio/' + fileExtension);
                                // Reset opacity and reload video
                                mediaElement.style.opacity = '1';
                                mediaElement.load();
                            }
                        }
                        break;
                }
            }
        });
        if (popup) {
            popup.close();
            this.enableToolbarItems();
        }
        // Show appropriate quick toolbar and handle element based on type
        if (args.type === 'Images') {
            this.parent.notify(events.insertCompleted, args);
            if (this.parent.insertImageSettings.resize) {
                this.parent.notify(events.resizeStart, {
                    event: dragEvent,
                    target: mediaElement
                });
            }
        }
        else if (args.type === 'Videos') {
            this.parent.notify(events.insertCompleted, args);
            setTimeout(function () {
                _this.parent.notify(events.resizeStart, {
                    event: dragEvent,
                    target: mediaElement
                });
            }, 100);
        }
        else if (args.type === 'Audios') {
            this.parent.notify(events.insertCompleted, args);
        }
    };
    /**
     * Refreshes popup position relative to element
     *
     * @param {HTMLElement} targetElement - Element to position popup relative to
     * @param {Popup} popup - Uploader popup object
     * @returns {void}
     * @hidden
     */
    PopupUploader.prototype.refreshPopup = function (targetElement, popup) {
        var targetPosition = this.parent.iframeSettings.enable ?
            this.parent.element.offsetTop + targetElement.offsetTop : targetElement.offsetTop;
        var rtePosition = this.parent.element.offsetTop + this.parent.element.offsetHeight;
        if (targetPosition > rtePosition) {
            popup.offsetY = this.parent.iframeSettings.enable ? -30 : -65;
            popup.element.style.display = 'block';
        }
        else {
            if (popup) {
                popup.refreshPosition(targetElement);
                popup.element.style.display = 'block';
            }
        }
    };
    PopupUploader.prototype.enableToolbarItems = function () {
        var mediaPopups = this.parent.element.querySelectorAll('.e-rte-upload-popup');
        if (!this.parent.inlineMode.enable && this.parent.toolbarModule &&
            this.parent.toolbarModule.baseToolbar && mediaPopups.length === 0) {
            this.parent.toolbarModule.baseToolbar.toolbarObj.disable(false);
        }
    };
    PopupUploader.prototype.onPopupClose = function () {
        var currentPopupElem = this.popupRoot;
        var currentPopupUploderObj = this.self;
        if (!isNOU(currentPopupElem) && !isNOU(currentPopupUploderObj)) {
            var popupObj = getComponent(currentPopupElem, 'popup');
            currentPopupUploderObj.parent.isBlur = false;
            if (isNOU(popupObj)) {
                return;
            }
            var uploaderObj = currentPopupUploderObj.getUploaderInstance(currentPopupElem);
            if (isNOU(uploaderObj)) {
                return;
            }
            uploaderObj.destroy();
            popupObj.destroy();
            detach(currentPopupElem);
        }
    };
    PopupUploader.prototype.getUploaderInstance = function (element) {
        var currentUploader = element.querySelector('.e-uploader');
        return getComponent(currentUploader, 'uploader');
    };
    /**
     * Destroys popup and uploader
     *
     * @returns {void}
     * @hidden
     */
    PopupUploader.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (!isNOU(this.uploadFailureTime)) {
            clearTimeout(this.uploadFailureTime);
            this.uploadFailureTime = null;
        }
        if (!isNOU(this.uploadSuccessTime)) {
            clearTimeout(this.uploadSuccessTime);
            this.uploadSuccessTime = null;
        }
        var mediaPopups = this.parent.element.querySelectorAll('.e-rte-upload-popup');
        for (var i = 0; i < mediaPopups.length; i++) {
            var uploader = this.getUploaderInstance(mediaPopups[i]);
            if (uploader && !uploader.isDestroyed) {
                uploader.destroy();
            }
            var popup = getComponent(mediaPopups[i], 'popup');
            if (popup && !popup.isDestroyed) {
                popup.destroy();
            }
        }
        this.isDestroyed = true;
    };
    return PopupUploader;
}());
export { PopupUploader };
