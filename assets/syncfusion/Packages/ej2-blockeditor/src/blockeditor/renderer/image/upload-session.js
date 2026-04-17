/**
 * UploadSession entity for tracking active upload operations.
 * This is a transient entity that exists only during the upload lifecycle.
 */
/**
 * UploadSession class for managing upload state.
 */
var UploadSession = /** @class */ (function () {
    function UploadSession(sessionId, blockId, file, previewUrl) {
        this.sessionId = sessionId;
        this.blockId = blockId;
        this.fileName = file.name;
        this.fileSize = file.size;
        this.progressPercent = 0;
        this.status = 'pending';
        this.previewUrl = previewUrl;
        this.errorMessage = null;
        this.startTime = Date.now();
        this.endTime = null;
        this.file = file;
    }
    UploadSession.prototype.updateProgress = function (percent) {
        this.progressPercent = Math.min(100, Math.max(0, percent));
        if (this.status === 'pending') {
            this.status = 'uploading';
        }
    };
    UploadSession.prototype.setTerminalState = function (status, errorMessage) {
        this.status = status;
        this.endTime = Date.now();
        if (status === 'completed') {
            this.progressPercent = 100;
        }
        else if (errorMessage !== undefined) {
            this.errorMessage = errorMessage;
        }
        else {
            this.errorMessage = 'Upload failed';
        }
    };
    UploadSession.prototype.complete = function () {
        this.setTerminalState('completed');
    };
    UploadSession.prototype.fail = function (errorMessage) {
        this.setTerminalState('failed', errorMessage);
    };
    UploadSession.prototype.cancel = function () {
        this.setTerminalState('cancelled', 'Upload cancelled by user');
    };
    return UploadSession;
}());
export { UploadSession };
