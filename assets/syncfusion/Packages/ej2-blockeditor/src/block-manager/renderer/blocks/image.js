var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createElement, formatUnit, updateCSSText, detach, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { BlockType } from '../../../models/enums';
import { getBlockModelById, decoupleReference } from '../../../common/utils/index';
import { events } from '../../../common/constant';
// Constants
var MIN_IMAGE_WIDTH = 40;
var MIN_IMAGE_HEIGHT = 40;
var RESIZE_HANDLE_SIZE = 8;
var ImageRenderer = /** @class */ (function () {
    function ImageRenderer(manager) {
        var _this = this;
        this.isResizing = false;
        this.handleImageResize = function (e) {
            var allowedTarget = _this.parent.rootEditorElement;
            if (!allowedTarget.contains(e.target) && (!_this.isResizing)) {
                return;
            }
            var dx = e.clientX - _this.startPosition.x;
            var dy = e.clientY - _this.startPosition.y;
            var position = _this.currentResizeHandle.className.split('e-resize-')[1];
            var _a = _this.calculateNewDimensions(dx, dy, position), newWidth = _a.newWidth, newHeight = _a.newHeight;
            cancelAnimationFrame(_this.animationFrameId);
            _this.animationFrameId = requestAnimationFrame(function () {
                if (_this.currentImage && _this.currentImage.parentElement) {
                    updateCSSText(_this.currentImage, "width: " + formatUnit(newWidth) + "; height: " + formatUnit(newHeight) + ";");
                    updateCSSText(_this.currentImage.parentElement, "width: " + formatUnit(newWidth) + "; height: " + formatUnit(newHeight) + ";");
                }
            });
        };
        this.stopImageResize = function () {
            if (!_this.isResizing) {
                return;
            }
            document.removeEventListener('mousemove', _this.handleImageResize);
            document.removeEventListener('mouseup', _this.stopImageResize);
            if (_this.resizeOverlay && _this.resizeOverlay.parentNode) {
                document.body.removeChild(_this.resizeOverlay);
            }
            _this.isResizing = false;
            _this.currentResizeHandle = null;
            _this.currentImage = null;
        };
        this.parent = manager;
        this.uploadPopupObj = null;
        this.uploadPopupElement = null;
        this.currentPlaceholder = null;
        this.isUploadPopupOpen = false;
        this.addEventListeners();
        // Create upload popup during initialization to ensure uploader is ready
    }
    ImageRenderer.prototype.addEventListeners = function () {
        this.parent.observer.on(events.documentClick, this.handleDocumentClick, this);
        this.parent.observer.on('modulesInitialized', this.createUploadPopup, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    };
    ImageRenderer.prototype.removeEventListeners = function () {
        this.parent.observer.off(events.documentClick, this.handleDocumentClick);
        this.parent.observer.off('modulesInitialized', this.createUploadPopup);
        this.parent.observer.off(events.destroy, this.destroy);
    };
    /**
     * Renders a image block
     *
     * @param {BlockModel} block - The block model containing data.
     * @returns {HTMLElement} - The rendered image block element.
     * @hidden
     */
    ImageRenderer.prototype.renderImage = function (block) {
        var _this = this;
        var settings = block.properties;
        var isCallFromBlazor = isNOU(this.parent.rootEditorElement.ej2_instances);
        // Check if image has source - if not, render placeholder
        if (!isCallFromBlazor && (!settings.src || settings.src === '')) {
            var placeholder_1 = this.renderPlaceholder(block.id);
            // Only auto-open popup if NOT during undo/redo and NOT during initial rendering
            var isUndoRedo = this.parent.undoRedoAction.isUndoing || this.parent.undoRedoAction.isRedoing;
            if (!isUndoRedo && (this.parent.blockRenderer && !this.parent.blockRenderer.isEntireBlocksRendering)) {
                // Open upload popup after a short delay to ensure placeholder is appended in dom
                setTimeout(function () {
                    _this.toggleUploadPopup(isNOU(_this.parent.currentFocusedBlock), placeholder_1);
                }, 100);
            }
            return placeholder_1;
        }
        // Render normal image if src exists
        var _a = this.createImageContainer(block), container = _a.container, img = _a.img;
        this.configureImageElement(img, block);
        container.appendChild(img);
        return container;
    };
    ImageRenderer.prototype.renderPlaceholder = function (blockId) {
        var placeholder = createElement('div', {
            id: this.parent.rootEditorElement.id + "_image-placeholder-" + blockId,
            className: 'e-image-placeholder',
            attrs: {
                'role': 'button',
                'aria-label': this.parent.localeJson['imgPlaceholderAriaLabel'],
                'tabindex': '0',
                'data-block-id': blockId,
                contenteditable: 'false'
            }
        });
        // Create placeholder icon
        var iconContainer = createElement('div', {
            className: 'e-placeholder-icon-container'
        });
        var icon = createElement('span', {
            className: 'e-icons e-block-image-icon'
        });
        iconContainer.appendChild(icon);
        // Create placeholder text
        var textElement = createElement('div', {
            className: 'e-placeholder-text',
            innerHTML: this.parent.localeJson['imagePlaceholder']
        });
        placeholder.appendChild(iconContainer);
        placeholder.appendChild(textElement);
        // Bind click event
        placeholder.addEventListener('click', this.handlePlaceholderClick.bind(this));
        // Bind keyboard events
        placeholder.addEventListener('keydown', this.handlePlaceholderKeydown.bind(this));
        return placeholder;
    };
    ImageRenderer.prototype.handlePlaceholderClick = function (event) {
        event.preventDefault();
        var target = event.currentTarget;
        if (this.currentPlaceholder !== target) {
            this.toggleUploadPopup(false, target);
        }
        else {
            this.toggleUploadPopup(true);
            this.currentPlaceholder = null;
        }
    };
    ImageRenderer.prototype.handlePlaceholderKeydown = function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            var target = event.currentTarget;
            this.toggleUploadPopup(false, target);
        }
    };
    ImageRenderer.prototype.toggleUploadPopup = function (shouldHide, placeholder) {
        if (shouldHide) {
            if (this.uploadPopupObj && this.isUploadPopupOpen) {
                this.uploadPopupObj.hide();
                this.isUploadPopupOpen = false;
                this.currentPlaceholder = null;
            }
        }
        else {
            if (placeholder) {
                this.currentPlaceholder = placeholder;
            }
            // Show popup
            if (this.uploadPopupObj && this.currentPlaceholder) {
                this.uploadPopupObj.relateTo = this.currentPlaceholder;
                this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(this.currentPlaceholder, this.uploadPopupObj);
                this.parent.observer.notify('clearUploaderObj');
                this.uploadPopupObj.show();
                this.isUploadPopupOpen = true;
            }
        }
    };
    ImageRenderer.prototype.createUploadPopup = function () {
        // Create popup container
        this.uploadPopupElement = createElement('div', {
            id: this.parent.rootEditorElement.id + "_image-upload-popup",
            className: 'e-image-upload-popup e-popup-container'
        });
        // Create popup content container
        var contentContainer = createElement('div', {
            id: this.parent.rootEditorElement.id + "_image-tab-container",
            className: 'e-popup-content'
        });
        this.uploadPopupElement.appendChild(contentContainer);
        this.parent.rootEditorElement.appendChild(this.uploadPopupElement);
        // Notify BlockEditor to render the tab component in this container
        this.parent.observer.notify('renderImageUploader', { container: contentContainer });
        // Use PopupRenderer to create the popup
        var args = {
            element: this.uploadPopupElement,
            content: contentContainer,
            width: '400px',
            height: 'auto'
        };
        this.uploadPopupObj = this.parent.popupRenderer.renderPopup(args);
        // Bind popup lifecycle events
        this.uploadPopupObj.open = this.handlePopupOpen.bind(this);
        this.uploadPopupObj.close = this.handlePopupClose.bind(this);
        // Bind escape key to close popup
        this.uploadPopupElement.addEventListener('keydown', this.handlePopupKeydown.bind(this));
        // Subscribe to image selection and upload events
        this.subscribeToImageEvents();
    };
    ImageRenderer.prototype.subscribeToImageEvents = function () {
        // Listen for file selected event to show Base64 preview
        this.parent.observer.on('fileSelected', this.handleFileSelected, this);
        // Listen for upload success to replace with server URL
        this.parent.observer.on('fileUploadSuccess', this.handleUploadSuccess, this);
        // Listen for embed image event
        this.parent.observer.on('imageEmbedded', this.handleImageEmbedded, this);
    };
    ImageRenderer.prototype.unsubscribeFromImageEvents = function () {
        this.parent.observer.off('fileSelected', this.handleFileSelected);
        this.parent.observer.off('fileUploadSuccess', this.handleUploadSuccess);
        this.parent.observer.off('imageEmbedded', this.handleImageEmbedded);
    };
    ImageRenderer.prototype.handleFileSelected = function (args) {
        if (!this.currentPlaceholder || !args.previewUrl) {
            return;
        }
        // Get the block ID from placeholder
        var blockId = this.currentPlaceholder.getAttribute('data-block-id') || '';
        // Replace placeholder with image preview
        this.replaceWithImage(this.currentPlaceholder, args.previewUrl, args.file.name, blockId);
        // Close the popup
        this.toggleUploadPopup(true);
    };
    ImageRenderer.prototype.handleUploadSuccess = function (args) {
        var blockElement = this.parent.rootEditorElement.querySelector("[data-block-id=\"" + args.blockId + "\"]");
        if (!blockElement) {
            return;
        }
        // Find the image element and update its src
        var imgElement = blockElement.querySelector('img.e-image-block');
        if (imgElement) {
            imgElement.src = args.fileUrl;
            // Update the block model
            var block = getBlockModelById(args.blockId, this.parent.getEditorBlocks());
            if (block) {
                block.properties.src = args.fileUrl;
            }
        }
    };
    ImageRenderer.prototype.handleImageEmbedded = function (args) {
        if (!this.currentPlaceholder || !args.url) {
            return;
        }
        // Get the block ID from placeholder
        var blockId = this.currentPlaceholder.getAttribute('data-block-id') || '';
        // Replace placeholder with image
        this.replaceWithImage(this.currentPlaceholder, args.url, 'Embedded image', blockId);
        // Close the popup
        this.toggleUploadPopup(true);
    };
    // Replaces placeholder element with actual image element using BlockCommand API.
    ImageRenderer.prototype.replaceWithImage = function (placeholder, imageSrc, altText, blockId) {
        var blockElement = placeholder.parentElement;
        if (!blockElement) {
            return;
        }
        var oldBlock = getBlockModelById(blockId, this.parent.getEditorBlocks());
        if (!oldBlock) {
            return;
        }
        // old block model (src empty)
        var oldBlockClone = decoupleReference(oldBlock);
        // Update the block with the new src
        var updatedProps = __assign({}, oldBlock.properties, { src: imageSrc, altText: altText });
        // Update the block model
        oldBlock.properties = updatedProps;
        var newBlock = this.parent.blockService.updateBlock(blockId, oldBlock);
        this.parent.stateManager.updateManagerBlocks();
        var newBlockClone = decoupleReference(newBlock);
        var newBlockElement = this.parent.blockRenderer.createBlockElement(newBlock);
        // Replace the old placeholder block element with the new image block element
        blockElement.parentElement.insertBefore(newBlockElement, blockElement);
        detach(blockElement);
        this.parent.setFocusToBlock(newBlockElement);
        this.parent.undoRedoAction.trackImageInsertionForUndoRedo(blockId, oldBlockClone, newBlockClone);
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: newBlockClone,
                prevBlock: oldBlockClone
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        // Clear current placeholder reference
        this.currentPlaceholder = null;
    };
    ImageRenderer.prototype.handlePopupOpen = function () {
        this.isUploadPopupOpen = true;
        // Notify BlockEditor's tab renderer via event
        this.parent.observer.notify('imagePopupOpen', {});
    };
    ImageRenderer.prototype.handlePopupClose = function () {
        this.isUploadPopupOpen = false;
        // Notify BlockEditor's tab renderer via event
        this.parent.observer.notify('imagePopupClose', {});
    };
    ImageRenderer.prototype.handlePopupKeydown = function (event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.toggleUploadPopup(true);
        }
    };
    /**
     * Gets the current placeholder element.
     *
     * @returns {HTMLElement | null} The current image placeholder element
     * @hidden
     */
    ImageRenderer.prototype.getCurrentPlaceholder = function () {
        return this.currentPlaceholder;
    };
    ImageRenderer.prototype.createImageContainer = function (block) {
        var container = createElement('div', {
            className: 'e-image-container',
            attrs: { 'data-block-id': block.id, contenteditable: 'false' }
        });
        updateCSSText(container, 'position: relative;');
        var img = createElement('img', {
            className: 'e-image-block',
            attrs: { 'alt': block.properties.altText || '', 'role': 'img', 'data-block-id': block.id }
        });
        return { container: container, img: img };
    };
    ImageRenderer.prototype.configureImageElement = function (img, block) {
        var _this = this;
        var settings = block.properties;
        var globalImgSettings = this.parent.imageBlockSettings;
        updateCSSText(img, "width: " + formatUnit(settings.width ? settings.width : globalImgSettings.width) + ";");
        updateCSSText(img, "height: " + formatUnit(settings.height ? settings.height : globalImgSettings.height) + ";");
        var isUndoRedo = this.parent.undoRedoAction.isUndoing || this.parent.undoRedoAction.isRedoing;
        if (settings.src) {
            img.src = settings.src;
        }
        else {
            this.handleImageUpload(img, settings);
        }
        if (settings.altText) {
            img.setAttribute('aria-label', settings.altText);
        }
        img.addEventListener('load', function () {
            updateCSSText(img, 'display: block;');
            var minWidth = globalImgSettings.minWidth ? "min-width: " + formatUnit(globalImgSettings.minWidth) + ";" : '';
            var minHeight = globalImgSettings.minHeight ? "min-height: " + formatUnit(globalImgSettings.minHeight) + ";" : '';
            var maxWidth = globalImgSettings.maxWidth ? "max-width: " + formatUnit(globalImgSettings.maxWidth) + ";" : '';
            var maxHeight = globalImgSettings.maxHeight ? "max-height: " + formatUnit(globalImgSettings.maxHeight) + ";" : '';
            updateCSSText(img, minWidth + minHeight + maxWidth + maxHeight);
            _this.aspectRatio = img.naturalWidth / img.naturalHeight;
            // Should notify only during image inserted via uploader and paste action.
            if ((_this.parent.blockRenderer && !_this.parent.blockRenderer.isEntireBlocksRendering) && !isUndoRedo) {
                _this.parent.observer.notify('imageInserted', { blockId: block.id, imgElement: img });
            }
            if (_this.parent.imageBlockSettings.enableResize) {
                _this.addResizeHandles(img.parentElement, img);
            }
        });
    };
    /**
     * Handles image upload
     *
     * @param {HTMLImageElement} img - The image element whose source will be updated.
     * @param {IImageBlockSettings} settings - Image configuration including allowedTypes and saveFormat.
     * @returns {void}
     * @hidden
     */
    ImageRenderer.prototype.handleImageUpload = function (img, settings) {
        var _this = this;
        var fileInput = createElement('input', {
            attrs: {
                type: 'file',
                accept: this.parent.imageBlockSettings.allowedTypes.join(',')
            }
        });
        updateCSSText(fileInput, 'display: none;');
        document.body.appendChild(fileInput);
        var handleFileChange = function () { return __awaiter(_this, void 0, void 0, function () {
            var file, fileExtension, src;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = fileInput.files[0];
                        if (!file) {
                            document.body.removeChild(fileInput);
                            return [2 /*return*/];
                        }
                        fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                        if (this.parent.imageBlockSettings.allowedTypes.indexOf(fileExtension) === -1) {
                            document.body.removeChild(fileInput);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getImageSrcFromFile(file, this.parent.imageBlockSettings.saveFormat)];
                    case 1:
                        src = _a.sent();
                        img.src = settings.src = src;
                        fileInput.removeEventListener('change', handleFileChange);
                        if (fileInput.parentNode) {
                            fileInput.parentNode.removeChild(fileInput);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        fileInput.addEventListener('change', handleFileChange);
        fileInput.click();
    };
    ImageRenderer.prototype.handleDocumentClick = function (mouseEvent) {
        var target = mouseEvent.target;
        // Handle upload popup visibility logic
        if (this.uploadPopupObj && this.isUploadPopupOpen) {
            var isInsidePopup = this.uploadPopupElement && this.uploadPopupElement.contains(target);
            var isOnPlaceholder = this.currentPlaceholder && this.currentPlaceholder.contains(target);
            // Close popup if clicking outside both popup and placeholder
            if (!isInsidePopup && !isOnPlaceholder) {
                this.toggleUploadPopup(true);
            }
        }
        // Handle image resize handles visibility
        var isImageClick = target.matches('img') || target.getAttribute('data-block-type') === BlockType.Image;
        var images = this.parent.rootEditorElement.querySelectorAll('img');
        for (var _i = 0, _a = Array.from(images); _i < _a.length; _i++) {
            var image = _a[_i];
            var isTargetImage = image === target || target.contains(image);
            var resizeHandles = image.parentElement.querySelectorAll('.e-image-rsz-handle');
            for (var _b = 0, _c = Array.from(resizeHandles); _b < _c.length; _b++) {
                var handle = _c[_b];
                updateCSSText(handle, "display: " + (isImageClick && isTargetImage ? 'block' : 'none') + ";");
            }
            image.classList.toggle('e-image-focus', isImageClick && isTargetImage);
        }
    };
    /**
     * Handles the paste event for images.
     *
     * @param {File | Blob} file - The file or blob to be pasted.
     * @returns {Promise<void>} - A promise that resolves when the image is pasted.
     * @hidden
     */
    ImageRenderer.prototype.handleFilePaste = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var blockElement, block, saveFormat, src, fileName, transformedParagraph, addedBlock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockElement = this.parent.currentFocusedBlock;
                        block = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
                        saveFormat = this.parent.imageBlockSettings.saveFormat;
                        return [4 /*yield*/, this.getImageSrcFromFile(file, (saveFormat || 'Base64'))];
                    case 1:
                        src = _a.sent();
                        fileName = (file instanceof File) ? file.name : "image-" + Date.now();
                        transformedParagraph = blockElement;
                        if (((blockElement.textContent.length > 0))) {
                            addedBlock = this.parent.blockCommand.addBlock({
                                targetBlock: blockElement,
                                blockType: BlockType.Paragraph
                            });
                            transformedParagraph = this.parent.getBlockElementById(addedBlock.id);
                        }
                        this.parent.blockCommand.transformBlock({
                            block: getBlockModelById(transformedParagraph.id, this.parent.getEditorBlocks()),
                            blockElement: transformedParagraph,
                            newBlockType: BlockType.Image,
                            props: { src: src, altText: fileName }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageRenderer.prototype.getImageSrcFromFile = function (file, saveFormat) {
        var format = saveFormat.toLowerCase();
        if (format === 'base64') {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function (event) { resolve(event.target.result); };
                reader.onerror = function () { reject(new Error('Failed to read image as base64.')); };
                reader.readAsDataURL(file);
            });
        }
        else {
            return Promise.resolve(URL.createObjectURL(file));
        }
    };
    ImageRenderer.prototype.createResizeHandle = function (pos, img) {
        var _this = this;
        var handle = createElement('div', {
            className: "e-image-rsz-handle e-resize-" + pos
        });
        Object.assign(handle.style, {
            position: 'absolute',
            width: RESIZE_HANDLE_SIZE + "px",
            height: RESIZE_HANDLE_SIZE + "px",
            backgroundColor: '#0078d4',
            borderRadius: '50%',
            zIndex: '100',
            cursor: ['nw', 'se'].indexOf(pos) !== -1 ? 'nwse-resize' : 'nesw-resize',
            display: 'none'
        });
        handle.addEventListener('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.startImageResize(e, img, handle);
        });
        return handle;
    };
    /**
     * Handles image resize
     *
     * @param {HTMLElement} container - The wrapper element that hosts the image and resize handles.
     * @param {HTMLImageElement} img - The image element to which resize handles are attached.
     * @returns {void}
     * @hidden
     */
    ImageRenderer.prototype.addResizeHandles = function (container, img) {
        var existingHandles = container.querySelectorAll('.e-image-rsz-handle');
        existingHandles.forEach(function (handle) { return container.removeChild(handle); });
        var positions = ['nw', 'ne', 'se', 'sw'];
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var pos = positions_1[_i];
            var handle = this.createResizeHandle(pos, img);
            container.appendChild(handle);
        }
        if (img.clientWidth > 0 || img.clientHeight > 0) {
            updateCSSText(container, "width: " + formatUnit(img.clientWidth) + ";");
        }
    };
    ImageRenderer.prototype.startImageResize = function (e, img, handle) {
        this.isResizing = true;
        this.currentResizeHandle = handle;
        this.currentImage = img;
        this.startDimensions = { width: img.offsetWidth, height: img.offsetHeight };
        this.startPosition = { x: e.clientX, y: e.clientY };
        this.resizeOverlay = createElement('div', { id: this.parent.rootEditorElement.id + 'resize_overlay' });
        Object.assign(this.resizeOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '9999',
            cursor: handle.style.cursor
        });
        document.body.appendChild(this.resizeOverlay);
        document.addEventListener('mousemove', this.handleImageResize);
        document.addEventListener('mouseup', this.stopImageResize);
    };
    ImageRenderer.prototype.calculateNewDimensions = function (dx, dy, position) {
        var newWidth = this.startDimensions.width;
        var newHeight = this.startDimensions.height;
        switch (position) {
            case 'se':
                newWidth += dx;
                newHeight += dy;
                break;
            case 'sw':
                newWidth -= dx;
                newHeight += dy;
                break;
            case 'ne':
                newWidth += dx;
                newHeight -= dy;
                break;
            case 'nw':
                newWidth -= dx;
                newHeight -= dy;
                break;
        }
        newWidth = Math.max(newWidth, MIN_IMAGE_WIDTH);
        newHeight = Math.max(newHeight, MIN_IMAGE_HEIGHT);
        if (this.aspectRatio) {
            var widthChange = Math.abs(newWidth - this.startDimensions.width);
            var heightChange = Math.abs(newHeight - this.startDimensions.height);
            if (widthChange >= heightChange) {
                newHeight = newWidth / this.aspectRatio;
            }
            else {
                newWidth = newHeight * this.aspectRatio;
            }
        }
        return { newWidth: newWidth, newHeight: newHeight };
    };
    ImageRenderer.prototype.destroy = function () {
        this.removeEventListeners();
        // Unsubscribe from image events
        this.unsubscribeFromImageEvents();
        // Destroy upload popup
        if (this.uploadPopupObj) {
            this.uploadPopupObj.destroy();
            this.uploadPopupObj = null;
        }
        // Remove upload popup element
        if (this.uploadPopupElement && this.uploadPopupElement.parentElement) {
            detach(this.uploadPopupElement);
            this.uploadPopupElement = null;
        }
        // Clean up resize overlay
        if (this.resizeOverlay && this.resizeOverlay.parentNode) {
            document.body.removeChild(this.resizeOverlay);
        }
        // Clear references
        this.currentPlaceholder = null;
        this.isUploadPopupOpen = false;
    };
    return ImageRenderer;
}());
export { ImageRenderer };
