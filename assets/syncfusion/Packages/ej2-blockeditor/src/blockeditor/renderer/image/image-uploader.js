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
import { createElement, detach, isNullOrUndefined as isNOU, getUniqueID } from '@syncfusion/ej2-base';
import { UploadSession } from './upload-session';
import { ImageProgressRenderer } from './image-progress';
/**
 * ImageUploaderRenderer manages the Tab and Uploader components for image upload workflow.
 * Combines tab navigation (Upload/Embed) with uploader functionality and embed URL validation.
 *
 * @hidden
 */
var ImageUploaderRenderer = /** @class */ (function () {
    function ImageUploaderRenderer(editor) {
        this.editor = editor;
        this.container = null;
        this.tabObj = null;
        this.tabElement = null;
        this.uploaderObj = null;
        this.uploaderElement = null;
        this.embedContainer = null;
        this.selectedTabIndex = 0;
        this.isInitialized = false;
        this.progressRenderers = new Map();
        this.uploadSessions = new Map();
        this.fileNameToBlockId = new Map();
        this.blobUrlsToRevoke = [];
        this.addEventListeners();
    }
    ImageUploaderRenderer.prototype.addEventListeners = function () {
        this.editor.blockManager.observer.on('renderImageUploader', this.renderImageUploader, this);
        this.editor.blockManager.observer.on('imagePopupOpen', this.onPopupOpen, this);
        this.editor.blockManager.observer.on('imagePopupClose', this.onPopupClose, this);
        this.editor.blockManager.observer.on('imageInserted', this.handleImageInserted, this);
        this.editor.blockManager.observer.on('clearUploaderObj', this.clearUploaderObj, this);
    };
    ImageUploaderRenderer.prototype.removeEventListeners = function () {
        this.editor.blockManager.observer.off('renderImageUploader', this.renderImageUploader);
        this.editor.blockManager.observer.off('imagePopupOpen', this.onPopupOpen);
        this.editor.blockManager.observer.off('imagePopupClose', this.onPopupClose);
        this.editor.blockManager.observer.off('imageInserted', this.handleImageInserted);
        this.editor.blockManager.observer.off('clearUploaderObj', this.clearUploaderObj);
    };
    ImageUploaderRenderer.prototype.renderImageUploader = function (args) {
        if (!this.isInitialized && args.container) {
            this.container = args.container;
            this.initialize();
        }
    };
    ImageUploaderRenderer.prototype.initialize = function () {
        // Create tab element
        this.tabElement = createElement('div', {
            id: this.editor.element.id + "_image-tabs",
            className: 'e-image-tabs'
        });
        this.container.appendChild(this.tabElement);
        // Define tab items
        var tabItems = [
            {
                header: { text: this.editor.blockManager.localeJson['tabHeaderUpload'] },
                content: this.createUploadTabContent()
            },
            {
                header: { text: this.editor.blockManager.localeJson['tabHeaderEmbed'] },
                content: this.createEmbedTabContent()
            }
        ];
        // Use generic TabRenderer to create Tab component
        this.tabObj = this.editor.tabRenderer.renderTab({
            element: this.tabElement,
            items: tabItems,
            selectedItem: this.selectedTabIndex,
            cssClass: 'e-image-upload-tabs',
            selected: this.handleTabSelect.bind(this)
        });
        // Initialize uploader for upload tab
        this.initializeUploader();
        this.isInitialized = true;
    };
    ImageUploaderRenderer.prototype.createUploadTabContent = function () {
        return "\n            <div class=\"e-upload-tab-content\">\n                <div class=\"e-uploader-container\" id=\"" + this.editor.element.id + "_uploader-container\"></div>\n            </div>\n        ";
    };
    ImageUploaderRenderer.prototype.createEmbedTabContent = function () {
        return "\n            <div class=\"e-embed-tab-content\">\n                <div class=\"e-url-input-container\">\n                    <input type=\"text\" \n                           id=\"" + this.editor.element.id + "_embed-url-input\" \n                           class=\"e-embed-url-input e-input\" \n                           placeholder=\"" + this.editor.blockManager.localeJson['embedPlaceholder'] + "\"\n                           aria-label=\"" + this.editor.blockManager.localeJson['imageUrl'] + "\" />\n                </div>\n                <div class=\"e-embed-actions\">\n                    <button id=\"" + this.editor.element.id + "_embed-button\" \n                            class=\"e-btn e-primary e-embed-button e-disabled\"\n                            type=\"button\">\n                        " + this.editor.blockManager.localeJson['embedImage'] + "\n                    </button>\n                </div>\n            </div>\n        ";
    };
    ImageUploaderRenderer.prototype.initializeUploader = function () {
        var uploaderContainer = this.tabElement.querySelector("#" + this.editor.element.id + "_uploader-container");
        // Create uploader input element
        this.uploaderElement = createElement('input', {
            id: this.editor.element.id + "_uploader",
            attrs: {
                type: 'File',
                name: 'UploadFiles'
            }
        });
        uploaderContainer.appendChild(this.uploaderElement);
        // Use generic UploaderRenderer to create Uploader component
        this.uploaderObj = this.editor.uploaderRenderer.renderUploader({
            element: this.uploaderElement,
            asyncSettings: {
                saveUrl: this.editor.imageBlockSettings.saveUrl
            },
            multiple: false,
            allowedExtensions: this.editor.imageBlockSettings.allowedTypes.join(','),
            maxFileSize: this.editor.imageBlockSettings.maxFileSize,
            dropArea: uploaderContainer,
            cssClass: 'e-image-uploader',
            selected: this.handleFileSelected.bind(this),
            uploading: this.handleUploading.bind(this),
            progress: this.handleProgress.bind(this),
            success: this.handleSuccess.bind(this),
            failure: this.handleFailure.bind(this),
            beforeUpload: this.handleBeforeUpload.bind(this),
            removing: undefined
        });
    };
    ImageUploaderRenderer.prototype.handleTabSelect = function (args) {
        this.selectedTabIndex = args.selectedIndex;
        // Initialize embed tab functionality when selected
        if (args.selectedIndex === 1 && !this.embedContainer) {
            this.initializeEmbedTab();
        }
    };
    ImageUploaderRenderer.prototype.initializeEmbedTab = function () {
        var _this = this;
        var embedTabContent = this.tabElement.querySelector('.e-embed-tab-content');
        this.embedContainer = embedTabContent;
        var urlInput = embedTabContent.querySelector("#" + this.editor.element.id + "_embed-url-input");
        var embedButton = embedTabContent.querySelector("#" + this.editor.element.id + "_embed-button");
        // Bind input validation
        urlInput.addEventListener('input', function () {
            urlInput.classList.remove('e-error');
            if (urlInput.value.length === 0) {
                embedButton.classList.add('e-disabled');
            }
            else {
                embedButton.classList.remove('e-disabled');
            }
        });
        // Bind Enter key on input
        urlInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                _this.handleEmbedClick();
            }
        });
        // Bind button click
        embedButton.addEventListener('click', function () {
            _this.handleEmbedClick();
        });
    };
    // Handles embed button click (validates URL and embeds image).
    ImageUploaderRenderer.prototype.handleEmbedClick = function () {
        var urlInput = this.tabElement.querySelector("#" + this.editor.element.id + "_embed-url-input");
        var url = urlInput.value.trim();
        // Validate URL format
        var validationResult = this.validateImageUrl(url);
        if (!validationResult.valid) {
            this.showEmbedError(urlInput);
            return;
        }
        // Notify ImageRenderer to embed the image
        this.editor.blockManager.observer.notify('imageEmbedded', {
            url: validationResult.url
        });
        // Clear input and hide error
        urlInput.value = '';
    };
    // Validates an image URL.
    ImageUploaderRenderer.prototype.validateImageUrl = function (urlString) {
        // Block dangerous protocols (XSS prevention)
        var dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];
        var lowerUrl = urlString.toLowerCase();
        for (var _i = 0, dangerousProtocols_1 = dangerousProtocols; _i < dangerousProtocols_1.length; _i++) {
            var protocol = dangerousProtocols_1[_i];
            if (lowerUrl.startsWith(protocol)) {
                return { valid: false, error: 'Dangerous protocol detected' };
            }
        }
        // Only allow HTTP/HTTPS
        if (!lowerUrl.startsWith('http://') && !lowerUrl.startsWith('https://')) {
            return { valid: false, error: 'Only HTTP/HTTPS protocols are allowed' };
        }
        // Parse URL to validate structure
        var parsedUrl;
        try {
            parsedUrl = new URL(urlString);
        }
        catch (e) {
            return { valid: false, error: 'Invalid URL format' };
        }
        // Block internal network access (SSRF prevention)
        var hostname = parsedUrl.hostname.toLowerCase();
        var blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
        if (blockedHosts.indexOf(hostname) !== -1 ||
            hostname.indexOf('192.168.') === 0 ||
            hostname.indexOf('10.') === 0 ||
            hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
            return { valid: false, error: 'Internal network URLs are not allowed' };
        }
        return { valid: true, url: parsedUrl.href }; // Normalized URL
    };
    // Shows an error style over input.
    ImageUploaderRenderer.prototype.showEmbedError = function (input) {
        input.classList.add('e-error');
        input.focus();
    };
    // Handles imageInserted event - unified handler for both pasted and uploader-selected images.
    // This fires for ALL image insertions regardless of source (paste, uploader, etc).
    ImageUploaderRenderer.prototype.handleImageInserted = function (evt) {
        if (!evt || !evt.blockId || !evt.imgElement) {
            return;
        }
        var blockId = evt.blockId;
        var imgElement = evt.imgElement;
        // Check if there's an existing session (from uploader selection)
        var existingSession = this.uploadSessions.get(blockId);
        if (existingSession) {
            // This image came from uploader selection (handleFileSelected)
            // Session already created, just need to show progress bar if saveUrl configured
            var hasSaveUrl = !isNOU(this.editor.imageBlockSettings.saveUrl) &&
                this.editor.imageBlockSettings.saveUrl.trim() !== '';
            if (hasSaveUrl && !this.progressRenderers.has(blockId)) {
                // Create progress bar for uploader-selected image
                var progressRenderer = new ImageProgressRenderer(this.editor, imgElement);
                this.progressRenderers.set(blockId, progressRenderer);
                progressRenderer.show();
            }
        }
        else {
            // This image was pasted (no existing session)
            // Check if saveUrl is configured and if image needs upload
            var hasSaveUrl = !isNOU(this.editor.imageBlockSettings.saveUrl) &&
                this.editor.imageBlockSettings.saveUrl.trim() !== '';
            if (!hasSaveUrl) {
                return; // No server upload configured
            }
            // Trigger upload for pasted image
            this.uploadPastedImage(imgElement, blockId);
        }
    };
    ImageUploaderRenderer.prototype.uploadPastedImage = function (imgElement, blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var file, sessionId, session, progressRenderer, fileInfo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // If src is already a hosted URL (http/https), skip upload
                        if (imgElement.src.startsWith('http://') || imgElement.src.startsWith('https://')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.convertImageToFile(imgElement.src, blockId)];
                    case 1:
                        file = _a.sent();
                        if (!file) {
                            return [2 /*return*/];
                        }
                        sessionId = getUniqueID('upload-session');
                        session = new UploadSession(sessionId, blockId, file, imgElement.src);
                        this.uploadSessions.set(blockId, session);
                        this.fileNameToBlockId.set(file.name, blockId);
                        progressRenderer = new ImageProgressRenderer(this.editor, imgElement);
                        this.progressRenderers.set(blockId, progressRenderer);
                        progressRenderer.show();
                        fileInfo = {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            statusCode: '1',
                            status: 'Ready to upload',
                            rawFile: file,
                            validationMessages: { minSize: '', maxSize: '' }
                        };
                        this.uploaderObj.upload([fileInfo], true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Failed to upload pasted image:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageUploaderRenderer.prototype.convertImageToFile = function (src, blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var blob, response, response, extension, filename, file, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        blob = void 0;
                        if (!src.startsWith('data:image/')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(src)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.blob()];
                    case 2:
                        blob = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!src.startsWith('blob:')) return [3 /*break*/, 6];
                        return [4 /*yield*/, fetch(src)];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.blob()];
                    case 5:
                        blob = _a.sent();
                        return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, null];
                    case 7:
                        extension = blob.type.split('/')[1] || 'png';
                        filename = "pasted-image-" + blockId + "." + extension;
                        file = new File([blob], filename, { type: blob.type });
                        return [2 /*return*/, file];
                    case 8:
                        error_2 = _a.sent();
                        console.error('Error converting image to file:', error_2);
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ImageUploaderRenderer.prototype.handleFileSelected = function (args) {
        if (!args.filesData || args.filesData.length === 0) {
            return;
        }
        var fileData = args.filesData[0];
        var file = fileData.rawFile;
        var blockId = this.getPlaceholderBlockId();
        if (!blockId || fileData.statusCode === '0') {
            return;
        }
        // Create upload session immediately (synchronous) and store in map
        var sessionId = getUniqueID('upload-session');
        var session = new UploadSession(sessionId, blockId, file, null);
        this.uploadSessions.set(blockId, session);
        this.fileNameToBlockId.set(file.name, blockId);
        this.AddImagePreview(file, blockId);
    };
    ImageUploaderRenderer.prototype.getPlaceholderBlockId = function () {
        var placeholder = this.editor.blockManager.blockRenderer.imageRenderer.getCurrentPlaceholder();
        if (placeholder) {
            return placeholder.getAttribute('data-block-id');
        }
        return null;
    };
    ImageUploaderRenderer.prototype.AddImagePreview = function (file, blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var previewUrl, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPreviewUrl(file)];
                    case 1:
                        previewUrl = _a.sent();
                        session = this.uploadSessions.get(blockId);
                        if (session) {
                            session.previewUrl = previewUrl;
                        }
                        // Trigger internal event
                        this.editor.blockManager.observer.notify('fileSelected', {
                            file: {
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                rawFile: file
                            },
                            previewUrl: previewUrl,
                            blockId: blockId
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageUploaderRenderer.prototype.getPreviewUrl = function (file) {
        var saveFormat = (this.editor.imageBlockSettings.saveFormat || 'Base64').toString().toLowerCase();
        // If host requests blob previews, always use blob URL (fast and low-memory)
        if (saveFormat === 'blob') {
            var blobUrl = URL.createObjectURL(file);
            this.blobUrlsToRevoke.push(blobUrl);
            return Promise.resolve(blobUrl);
        }
        else {
            return this.encodeImageAsBase64(file);
        }
    };
    ImageUploaderRenderer.prototype.encodeImageAsBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            reader.onerror = function () {
                reject(new Error('Failed to read image as base64.'));
            };
            reader.readAsDataURL(file);
        });
    };
    ImageUploaderRenderer.prototype.handleBeforeUpload = function (args) {
        var beforeArgs = __assign({}, args);
        this.editor.trigger('beforeFileUpload', beforeArgs);
        args.cancel = beforeArgs.cancel;
    };
    ImageUploaderRenderer.prototype.handleUploading = function (args) {
        var blockId = this.fileNameToBlockId.get(args.fileData.name) || '';
        var progressRenderer = this.progressRenderers.get(blockId);
        // Upload started - initialize progress at 0%
        if (progressRenderer) {
            progressRenderer.updateProgress(0);
        }
        var uploadingArgs = __assign({}, args);
        this.editor.trigger('fileUploading', uploadingArgs);
        args.cancel = uploadingArgs.cancel;
    };
    ImageUploaderRenderer.prototype.handleProgress = function (args) {
        // Calculate progress percentage from loaded/total bytes
        var e = args.e;
        if (e && e.lengthComputable) {
            var progressPercent = Math.round((e.loaded / e.total) * 100);
            // Get blockId from filename lookup
            var fileName = args.file ? args.file.name : '';
            var blockId = this.fileNameToBlockId.get(fileName) || '';
            var progressRenderer = this.progressRenderers.get(blockId);
            // Update session progress
            var session = this.uploadSessions.get(blockId);
            if (session) {
                session.updateProgress(progressPercent);
            }
            // Update progress bar for this specific upload
            if (progressRenderer) {
                progressRenderer.updateProgress(progressPercent);
            }
        }
    };
    ImageUploaderRenderer.prototype.handleSuccess = function (args) {
        var _this = this;
        var fileName = args.file ? args.file.name : '';
        var blockId = this.fileNameToBlockId.get(fileName) || '';
        var progressRenderer = this.progressRenderers.get(blockId);
        // Ensure progress reaches 100% before hiding
        if (progressRenderer) {
            progressRenderer.updateProgress(100);
        }
        var session = this.uploadSessions.get(blockId);
        if (session) {
            session.complete();
        }
        // Parse server response
        var serverResponse = {};
        if (args.e && typeof args.e === 'object') {
            var eventObj = args.e;
            if (eventObj.target && eventObj.target.response) {
                try {
                    var parsed = JSON.parse(eventObj.target.response);
                    serverResponse = typeof parsed === 'object' ? parsed : { message: parsed };
                }
                catch (e) {
                    serverResponse = { message: eventObj.target.response };
                }
            }
        }
        // Construct final image URL based on path setting
        var finalImageUrl = '';
        var path = this.editor.imageBlockSettings.path;
        if (path && path.trim() !== '') {
            var uploadFileName = session ? session.file.name : (serverResponse.fileName || '');
            var normalizedPath = path.endsWith('/') ? path : path + '/';
            var normalizedFileName = uploadFileName.startsWith('/') ? uploadFileName.substring(1) : uploadFileName;
            finalImageUrl = normalizedPath + normalizedFileName;
        }
        else {
            finalImageUrl = serverResponse.url || (session ? session.previewUrl : '') || '';
        }
        serverResponse.url = finalImageUrl;
        var successArgs = __assign({}, args, { fileUrl: finalImageUrl });
        this.editor.trigger('fileUploadSuccess', successArgs);
        this.editor.blockManager.observer.notify('fileUploadSuccess', __assign({}, successArgs, { blockId: blockId }));
        // Clean up Blob URLs
        this.revokeBlobUrls();
        // Hide progress bar, show success badge, cleanup
        if (progressRenderer) {
            progressRenderer.hide(function () {
                progressRenderer.showSuccessBadge();
                setTimeout(function () {
                    progressRenderer.destroy();
                    _this.progressRenderers.delete(blockId);
                }, 1000);
            });
        }
        // Clean up session and filename mapping
        this.uploadSessions.delete(blockId);
        this.fileNameToBlockId.delete(fileName);
    };
    ImageUploaderRenderer.prototype.handleFailure = function (args) {
        var _this = this;
        var fileName = args.file ? args.file.name : '';
        var blockId = this.fileNameToBlockId.get(fileName);
        var progressRenderer = this.progressRenderers.get(blockId);
        var errorMessage = 'Upload failed';
        if (args.statusText) {
            errorMessage = args.statusText;
        }
        else if (args.e && typeof args.e === 'object') {
            var eventObj = args.e;
            if (eventObj.target && eventObj.target.statusText) {
                errorMessage = eventObj.target.statusText;
            }
        }
        var session = this.uploadSessions.get(blockId);
        if (session) {
            session.fail(errorMessage);
        }
        var failedArgs = __assign({}, args);
        this.editor.blockManager.observer.notify('fileUploadFailed', failedArgs);
        this.editor.trigger('fileUploadFailed', failedArgs);
        // Hide progress bar, show error badge, cleanup
        if (progressRenderer) {
            progressRenderer.hide(function () {
                progressRenderer.showErrorBadge();
                setTimeout(function () {
                    progressRenderer.destroy();
                    _this.progressRenderers.delete(blockId);
                }, 1000);
            });
        }
        this.uploadSessions.delete(blockId);
        this.fileNameToBlockId.delete(fileName);
    };
    ImageUploaderRenderer.prototype.revokeBlobUrls = function () {
        this.blobUrlsToRevoke.forEach(function (url) { return URL.revokeObjectURL(url); });
        this.blobUrlsToRevoke = [];
    };
    ImageUploaderRenderer.prototype.clearUploaderObj = function () {
        if (this.uploaderObj) {
            this.uploaderObj.clearAll();
        }
    };
    ImageUploaderRenderer.prototype.onPopupOpen = function () {
        if (this.tabObj) {
            this.tabObj.select(0);
        }
        var uploaderContainer = this.tabElement.querySelector("#" + this.editor.element.id + "_uploader-container");
        var browseButton = uploaderContainer.querySelector('.e-upload .e-file-select-wrap > button');
        browseButton.focus();
    };
    ImageUploaderRenderer.prototype.onPopupClose = function () {
        if (this.tabObj) {
            this.tabObj.select(0);
        }
        // Clear embed input if any
        if (this.tabElement) {
            var urlInput = this.tabElement.querySelector("#" + this.editor.element.id + "_embed-url-input");
            if (urlInput) {
                urlInput.value = '';
            }
        }
    };
    ImageUploaderRenderer.prototype.refresh = function () {
        if (this.uploaderObj) {
            this.uploaderObj.clearAll();
        }
    };
    ImageUploaderRenderer.prototype.destroy = function () {
        // Remove event listeners
        this.removeEventListeners();
        // Revoke Blob URLs
        this.revokeBlobUrls();
        // Destroy all progress renderer instances
        this.progressRenderers.forEach(function (renderer) {
            renderer.destroy();
        });
        this.progressRenderers.clear();
        // Destroy uploader
        if (this.uploaderObj) {
            this.uploaderObj.destroy();
            this.uploaderObj = null;
        }
        // Remove uploader element
        if (this.uploaderElement && this.uploaderElement.parentElement) {
            detach(this.uploaderElement);
            this.uploaderElement = null;
        }
        // Destroy tab component
        if (this.tabObj) {
            this.tabObj.destroy();
            this.tabObj = null;
        }
        // Remove tab element
        if (this.tabElement && this.tabElement.parentElement) {
            detach(this.tabElement);
            this.tabElement = null;
        }
        // Clear all references
        this.embedContainer = null;
        this.container = null;
        this.uploadSessions.clear();
        this.fileNameToBlockId.clear();
        this.isInitialized = false;
    };
    return ImageUploaderRenderer;
}());
export { ImageUploaderRenderer };
