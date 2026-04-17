import { BlockModel, IImageBlockSettings } from '../../../models/index';
import { BlockManager } from '../../base/block-manager';
export declare class ImageRenderer {
    private parent;
    private isResizing;
    private startDimensions;
    private startPosition;
    aspectRatio: number;
    private currentResizeHandle;
    private currentImage;
    private resizeOverlay;
    private animationFrameId;
    private uploadPopupObj;
    private uploadPopupElement;
    private currentPlaceholder;
    private isUploadPopupOpen;
    constructor(manager: BlockManager);
    private addEventListeners;
    private removeEventListeners;
    /**
     * Renders a image block
     *
     * @param {BlockModel} block - The block model containing data.
     * @returns {HTMLElement} - The rendered image block element.
     * @hidden
     */
    renderImage(block: BlockModel): HTMLElement;
    renderPlaceholder(blockId: string): HTMLElement;
    private handlePlaceholderClick;
    private handlePlaceholderKeydown;
    toggleUploadPopup(shouldHide: boolean, placeholder?: HTMLElement): void;
    private createUploadPopup;
    private subscribeToImageEvents;
    private unsubscribeFromImageEvents;
    private handleFileSelected;
    private handleUploadSuccess;
    private handleImageEmbedded;
    private replaceWithImage;
    private handlePopupOpen;
    private handlePopupClose;
    private handlePopupKeydown;
    /**
     * Gets the current placeholder element.
     *
     * @returns {HTMLElement | null} The current image placeholder element
     * @hidden
     */
    getCurrentPlaceholder(): HTMLElement | null;
    private createImageContainer;
    private configureImageElement;
    /**
     * Handles image upload
     *
     * @param {HTMLImageElement} img - The image element whose source will be updated.
     * @param {IImageBlockSettings} settings - Image configuration including allowedTypes and saveFormat.
     * @returns {void}
     * @hidden
     */
    handleImageUpload(img: HTMLImageElement, settings: IImageBlockSettings): void;
    private handleDocumentClick;
    /**
     * Handles the paste event for images.
     *
     * @param {File | Blob} file - The file or blob to be pasted.
     * @returns {Promise<void>} - A promise that resolves when the image is pasted.
     * @hidden
     */
    handleFilePaste(file: File | Blob): Promise<void>;
    private getImageSrcFromFile;
    private createResizeHandle;
    /**
     * Handles image resize
     *
     * @param {HTMLElement} container - The wrapper element that hosts the image and resize handles.
     * @param {HTMLImageElement} img - The image element to which resize handles are attached.
     * @returns {void}
     * @hidden
     */
    addResizeHandles(container: HTMLElement, img: HTMLImageElement): void;
    private startImageResize;
    private handleImageResize;
    private calculateNewDimensions;
    private stopImageResize;
    destroy(): void;
}
