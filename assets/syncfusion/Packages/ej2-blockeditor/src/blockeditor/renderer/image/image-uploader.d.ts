import { BlockEditor } from '../../base/blockeditor';
/**
 * ImageUploaderRenderer manages the Tab and Uploader components for image upload workflow.
 * Combines tab navigation (Upload/Embed) with uploader functionality and embed URL validation.
 *
 * @hidden
 */
export declare class ImageUploaderRenderer {
    private editor;
    private container;
    private tabObj;
    private tabElement;
    private uploaderObj;
    private uploaderElement;
    private embedContainer;
    private selectedTabIndex;
    private isInitialized;
    private progressRenderers;
    private uploadSessions;
    private fileNameToBlockId;
    private blobUrlsToRevoke;
    constructor(editor: BlockEditor);
    private addEventListeners;
    private removeEventListeners;
    private renderImageUploader;
    private initialize;
    private createUploadTabContent;
    private createEmbedTabContent;
    private initializeUploader;
    private handleTabSelect;
    private initializeEmbedTab;
    private handleEmbedClick;
    private validateImageUrl;
    private showEmbedError;
    private handleImageInserted;
    private uploadPastedImage;
    private convertImageToFile;
    private handleFileSelected;
    private getPlaceholderBlockId;
    private AddImagePreview;
    private getPreviewUrl;
    private encodeImageAsBase64;
    private handleBeforeUpload;
    private handleUploading;
    private handleProgress;
    private handleSuccess;
    private handleFailure;
    private revokeBlobUrls;
    private clearUploaderObj;
    onPopupOpen(): void;
    onPopupClose(): void;
    refresh(): void;
    destroy(): void;
}
