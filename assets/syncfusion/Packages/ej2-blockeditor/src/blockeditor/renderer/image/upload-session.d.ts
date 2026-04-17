/**
 * UploadSession entity for tracking active upload operations.
 * This is a transient entity that exists only during the upload lifecycle.
 */
/**
 * Upload status classification.
 */
export declare type UploadStatus = 'pending' | 'validating' | 'uploading' | 'completed' | 'failed' | 'cancelled';
/**
 * UploadSession class for managing upload state.
 */
export declare class UploadSession {
    /**
     * Unique upload session identifier.
     */
    sessionId: string;
    /**
     * Associated ImageBlock ID.
     */
    blockId: string;
    /**
     * Original file name from user's device.
     */
    fileName: string;
    /**
     * File size in bytes.
     */
    fileSize: number;
    /**
     * Upload progress (0-100).
     */
    progressPercent: number;
    /**
     * Current upload status.
     */
    status: UploadStatus;
    /**
     * Base64 or Blob URL for preview.
     */
    previewUrl: string | null;
    /**
     * Error message if upload failed.
     */
    errorMessage: string | null;
    /**
     * Upload start timestamp.
     */
    startTime: number;
    /**
     * Upload completion/failure timestamp.
     */
    endTime: number | null;
    /**
     * Native File object (for retry scenarios).
     */
    file: File | null;
    constructor(sessionId: string, blockId: string, file: File, previewUrl: string | null);
    updateProgress(percent: number): void;
    private setTerminalState;
    complete(): void;
    fail(errorMessage: string): void;
    cancel(): void;
}
