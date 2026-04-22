(function ($) {
    $.fn.fileUpload = function (data) {
        return this.each(function () {
            var fileUploadDiv = $(this);
            var fileUploadId = `${data.id}`;
            var isMultiple = !!data.multiple;
            var supportsDataTransfer = typeof DataTransfer !== "undefined";
            var fileStore = supportsDataTransfer ? new DataTransfer() : null;
            var dragCounter = 0;

            var fileDivContent = isMultiple
                ? `
                    <label for="${fileUploadId}" class="file-upload">
                        <div>
                            <i class="material-icons-outlined">cloud_upload</i>
                            <p>Drag & Drop Files Here</p>
                            <span>OR</span>
                            <div>Browse Files</div>
                        </div>
                        <input type="file" id="${fileUploadId}" name="${fileUploadId}[]" multiple hidden accept="image/*" />
                    </label>
                `
                : `
                    <label for="${fileUploadId}" class="file-upload">
                        <div>
                            <i class="material-icons-outlined">cloud_upload</i>
                            <p>Drag & Drop Files Here</p>
                            <span>OR</span>
                            <div>Browse Files</div>
                        </div>
                        <input type="file" id="${fileUploadId}" name="${fileUploadId}" hidden accept="image/*" />
                    </label>
                `;

            fileUploadDiv.html(fileDivContent).addClass("file-container");

            var inputEl = fileUploadDiv.find(`#${fileUploadId}`)[0];
            var dropTarget = fileUploadDiv.find("label.file-upload");
            var table = null;
            var tableBody = null;

            function createTable() {
                table = $(`
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th style="width: 30%;">File Name</th>
                                <th>Preview</th>
                                <th style="width: 20%;">Size</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);
                tableBody = table.find("tbody");
                fileUploadDiv.append(table);
            }

            function getCurrentFiles() {
                if (fileStore) {
                    return Array.from(fileStore.files);
                }
                return Array.from((inputEl && inputEl.files) || []);
            }

            function syncInputFiles() {
                if (fileStore && inputEl) {
                    inputEl.files = fileStore.files;
                }
            }

            function replaceFiles(files) {
                if (!fileStore) return;
                fileStore = new DataTransfer();
                files.forEach(function (file) {
                    fileStore.items.add(file);
                });
                syncInputFiles();
            }

            function notifyInvalidFiles(invalidFiles) {
                if (invalidFiles.length === 0) return;
                var msg = "Solo se permiten imágenes. Archivos inválidos: " + invalidFiles.join(", ");
                if (typeof toastr !== "undefined") {
                    toastr.error(msg);
                } else {
                    alert(msg);
                }
            }

            function renderTable() {
                if (!table) {
                    createTable();
                }

                var files = getCurrentFiles();
                tableBody.empty();

                if (files.length === 0) {
                    tableBody.append('<tr><td colspan="6" class="no-file">No files selected!</td></tr>');
                    return;
                }

                files.forEach(function (file, index) {
                    var fileName = file.name;
                    var fileSize = (file.size / 1024).toFixed(2) + " KB";
                    var fileType = file.type || "image/*";
                    var previewUrl = URL.createObjectURL(file);

                    tableBody.append(`
                        <tr>
                            <td>${index + 1}</td>
                            <td>${fileName}</td>
                            <td><img src="${previewUrl}" alt="${fileName}" height="30"></td>
                            <td>${fileSize}</td>
                            <td>${fileType}</td>
                            <td>
                                <button type="button" class="deleteBtn" data-file-index="${index}">
                                    <i class="material-icons-outlined">delete</i>
                                </button>
                            </td>
                        </tr>
                    `);
                });

                tableBody.find(".deleteBtn").off("click").on("click", function () {
                    var indexToRemove = parseInt($(this).attr("data-file-index"), 10);
                    removeFile(indexToRemove);
                });
            }

            function removeFile(indexToRemove) {
                var files = getCurrentFiles();
                if (indexToRemove < 0 || indexToRemove >= files.length) {
                    return;
                }

                files.splice(indexToRemove, 1);

                if (fileStore) {
                    replaceFiles(files);
                } else if (inputEl && files.length === 0) {
                    inputEl.value = "";
                }

                renderTable();
            }

            function addFiles(files) {
                var incomingFiles = Array.from(files || []);
                if (incomingFiles.length === 0) {
                    return;
                }

                var validFiles = [];
                var invalidFiles = [];

                incomingFiles.forEach(function (file) {
                    if (!file.type || !file.type.startsWith("image/")) {
                        invalidFiles.push(file.name || "archivo");
                    } else {
                        validFiles.push(file);
                    }
                });

                notifyInvalidFiles(invalidFiles);

                if (validFiles.length === 0) {
                    renderTable();
                    return;
                }

                var mergedFiles = isMultiple ? getCurrentFiles().slice() : [];

                validFiles.forEach(function (file) {
                    if (!isMultiple) {
                        mergedFiles = [file];
                        return;
                    }

                    var alreadyExists = mergedFiles.some(function (existing) {
                        return (
                            existing.name === file.name &&
                            existing.size === file.size &&
                            existing.lastModified === file.lastModified
                        );
                    });

                    if (!alreadyExists) {
                        mergedFiles.push(file);
                    }
                });

                if (fileStore) {
                    replaceFiles(mergedFiles);
                }

                renderTable();
            }

            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }

            dropTarget.on("dragenter dragover", function (e) {
                preventDefaults(e);
                dragCounter += 1;
                fileUploadDiv.addClass("dragover");
            });

            dropTarget.on("dragleave", function (e) {
                preventDefaults(e);
                dragCounter = Math.max(0, dragCounter - 1);
                if (dragCounter === 0) {
                    fileUploadDiv.removeClass("dragover");
                }
            });

            dropTarget.on("drop", function (e) {
                preventDefaults(e);
                dragCounter = 0;
                fileUploadDiv.removeClass("dragover");

                var droppedFiles =
                    e.originalEvent && e.originalEvent.dataTransfer
                        ? e.originalEvent.dataTransfer.files
                        : [];

                addFiles(droppedFiles);
            });

            fileUploadDiv.find(`#${fileUploadId}`).on("change", function () {
                addFiles(this.files);
                this.value = "";
                syncInputFiles(); // Restaurar archivos del DataTransfer tras limpiar value
            });

            renderTable();
        });
    };
})(jQuery);
