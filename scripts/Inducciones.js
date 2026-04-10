// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
    $(".preloader").fadeOut();
});

let tableInducciones;

// Inicializar cuando el documento esté listo
$(document).ready(function() {
    // Inicializar Select2 para puestos (múltiple) en modal agregar
    $('#selectPuestos').select2({
        placeholder: 'Seleccione los puestos aplicables',
        allowClear: true,
        dropdownParent: $('#modalAddInduccion')
    });
    
    $('#editPuestos').select2({
        placeholder: 'Seleccione los puestos aplicables',
        allowClear: true,
        dropdownParent: $('#modalEditInduccion')
    });
    
    // Cargar datos iniciales
    loadAreasTecnicas();
    loadPuestos();
    loadInducciones();
    
    // Eventos CRUD principal
    $('#btnAddInduccion').on('click', function() {
        addInduccion();
    });
    
    $('#btnSaveEdit').on('click', function() {
        updateInduccion();
    });
    
    // Eventos de contenido (materiales y audiovisual)
    $('#btnAddMaterial').on('click', function() {
        addMaterial();
    });
    
    $('#btnAddAudiovisual').on('click', function() {
        addAudiovisual();
    });
    
    // Limpiar modal agregar al cerrarse
    $('#modalAddInduccion').on('hidden.bs.modal', function() {
        $('#txtNombreInduccion').val('');
        $('#txtDescripcion').val('');
        $('#selectAreaTecnica').val('');
        $('#selectPuestos').val(null).trigger('change');
        $('#txtDuracion').val('');
    });

    // Limpiar modal de edición al cerrarse
    $('#modalEditInduccion').on('hidden.bs.modal', function() {
        $('#editIdInduccion').val('');
        $('#editNombreInduccion').val('');
        $('#editDescripcion').val('');
        $('#editAreaTecnica').val('');
        $('#editPuestos').val(null).trigger('change');
        $('#editDuracion').val('');
    });
    
    // Limpiar modal de contenido al cerrarse
    $('#modalContenido').on('hidden.bs.modal', function() {
        $('#contenidoIdInduccion').val('');
        $('#nombreInduccionContenido').text('');
        $('#inputMaterial').val('');
        $('#txtTituloVideo').val('');
        $('#txtEnlaceVideo').val('');
    });
});

// ==========================================
// FUNCIONES DE CARGA DE SELECTS
// ==========================================

/**
 * Cargar áreas técnicas en los selects
 */
async function loadAreasTecnicas() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: { op: "getAreasTecnicasParaSelect" },
            dataType: "json"
        });
        
        let options = '<option value="">Seleccione un área técnica</option>';
        respuesta.forEach(area => {
            options += `<option value="${area.IdAreaTecnica}">${area.NombreArea}</option>`;
        });
        
        $('#selectAreaTecnica').html(options);
        $('#editAreaTecnica').html(options);
        
    } catch (error) {
        console.error("Error al cargar áreas técnicas:", error);
    }
}

/**
 * Cargar puestos en los selects (Select2)
 */
async function loadPuestos() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: { op: "getPuestosParaSelect" },
            dataType: "json"
        });
        
        let options = '';
        respuesta.forEach(puesto => {
            options += `<option value="${puesto.id}">${puesto.text}</option>`;
        });
        
        $('#selectPuestos').html(options);
        $('#editPuestos').html(options);
        
    } catch (error) {
        console.error("Error al cargar puestos:", error);
    }
}

// ==========================================
// CRUD PRINCIPAL DE INDUCCIONES
// ==========================================

/**
 * Cargar listado de inducciones en DataTable
 */
async function loadInducciones() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: { op: "getInducciones" },
            dataType: "json"
        });
        
        // Destruir tabla si ya existe
        if (tableInducciones) {
            tableInducciones.destroy();
        }
        
        tableInducciones = $('#tableInducciones').DataTable({
            destroy: true,
            language: {
                lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
                zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
                info: "PÁGINA _PAGE_ DE _PAGES_",
                infoEmpty: "NO HAY DATOS PARA MOSTRAR",
                infoFiltered: "",
                search: "BUSCAR",
                paginate: {
                    previous: "ANTERIOR",
                    next: "SIGUIENTE"
                }
            },
            bSort: true,
            bPaginate: true,
            bFilter: true,
            bInfo: true,
            data: respuesta,
            columns: [
                { 
                    data: "IdInduccion",
                    render: function(data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                { 
                    data: "NombreInduccion",
                    render: function(data, type, row) {
                        return `<strong>${data}</strong>`;
                    }
                },
                { 
                    data: "NombreArea",
                    render: function(data, type, row) {
                        return data || '<span class="text-muted">Sin asignar</span>';
                    }
                },
                { 
                    data: "DuracionEstimada",
                    render: function(data, type, row) {
                        return data || '-';
                    }
                },
                { 
                    data: "Estatus",
                    render: function(data, type, row) {
                        if (data == 1) {
                            return '<span class="badge bg-success">Activa</span>';
                        } else {
                            return '<span class="badge bg-danger">Inactiva</span>';
                        }
                    }
                },
                {
                    data: null,
                    orderable: false,
                    render: function(data, type, row) {
                        let idEncoded = btoa(row.IdInduccion);
                        
                        let btnContenido = `<button class="btn btn-info btn-accion" onclick="openContenidoModal('${idEncoded}', '${row.NombreInduccion}')" title="Gestionar Contenido">
                            <span class="material-symbols-outlined">folder_open</span>
                        </button>`;
                        
                        let btnEdit = `<button class="btn btn-primary btn-accion" onclick="openEditModal('${idEncoded}')" title="Editar">
                            <span class="material-symbols-outlined">edit</span>
                        </button>`;
                        
                        let btnToggle = '';
                        if (row.Estatus == 1) {
                            btnToggle = `<button class="btn btn-warning btn-accion" onclick="toggleEstatus('${idEncoded}')" title="Desactivar">
                                <span class="material-symbols-outlined">toggle_off</span>
                            </button>`;
                        } else {
                            btnToggle = `<button class="btn btn-success btn-accion" onclick="toggleEstatus('${idEncoded}')" title="Activar">
                                <span class="material-symbols-outlined">toggle_on</span>
                            </button>`;
                        }
                        
                        let btnDelete = `<button class="btn btn-danger btn-accion" onclick="deleteInduccion('${idEncoded}')" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>`;
                        
                        return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
                            ${btnContenido}${btnEdit}${btnToggle}${btnDelete}
                        </div>`;
                    }
                }
            ],
            order: [[0, 'asc']]
        });
        
    } catch (error) {
        console.error("Error al cargar inducciones:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudieron cargar las inducciones.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Agregar nueva inducción
 */
async function addInduccion() {
    const nombreInduccion = $('#txtNombreInduccion').val().trim();
    const descripcion = $('#txtDescripcion').val().trim();
    const idAreaTecnica = $('#selectAreaTecnica').val();
    const puestosAplicables = $('#selectPuestos').val();
    const duracionEstimada = $('#txtDuracion').val().trim();
    
    // Validaciones
    if (nombreInduccion === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre de la inducción.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtNombreInduccion').focus();
        return;
    }
    
    try {
        console.log("Enviando datos:", {
            NombreInduccion: nombreInduccion,
            Descripcion: descripcion,
            IdAreaTecnica: idAreaTecnica || '',
            PuestosAplicables: JSON.stringify(puestosAplicables || []),
            DuracionEstimada: duracionEstimada
        });
        
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "addInduccion",
                NombreInduccion: nombreInduccion,
                Descripcion: descripcion,
                IdAreaTecnica: idAreaTecnica || '',
                PuestosAplicables: JSON.stringify(puestosAplicables || []),
                DuracionEstimada: duracionEstimada
            },
            dataType: "json"
        });
        
        console.log("Respuesta del servidor:", respuesta);
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Completado!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            // Cerrar modal y limpiar campos
            bootstrap.Modal.getInstance(document.getElementById('modalAddInduccion')).hide();
            $('#txtNombreInduccion').val('');
            $('#txtDescripcion').val('');
            $('#selectAreaTecnica').val('');
            $('#selectPuestos').val(null).trigger('change');
            $('#txtDuracion').val('');
            
            // Recargar tabla
            loadInducciones();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al agregar inducción:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo registrar la inducción.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Abrir modal de edición
 */
async function openEditModal(idEncoded) {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "getInduccionById",
                IdInduccion: idEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const datos = respuesta.Datos;
            
            $('#editIdInduccion').val(idEncoded);
            $('#editNombreInduccion').val(datos.NombreInduccion);
            $('#editDescripcion').val(datos.Descripcion || '');
            $('#editAreaTecnica').val(datos.IdAreaTecnica || '');
            $('#editDuracion').val(datos.DuracionEstimada || '');
            
            // Cargar puestos seleccionados
            let puestos = [];
            if (datos.PuestosIds) {
                // Los puestos ahora vienen como string separado por comas desde la tabla intermedia
                puestos = datos.PuestosIds.split(',').filter(id => id.trim() !== '');
            }
            $('#editPuestos').val(puestos).trigger('change');
            
            // Mostrar modal
            let modalEl = document.getElementById('modalEditInduccion');
            let modal = bootstrap.Modal.getInstance(modalEl);
            if (!modal) {
                modal = new bootstrap.Modal(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
            }
            modal.show();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al obtener inducción:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo obtener la información de la inducción.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Actualizar inducción
 */
async function updateInduccion() {
    const idInduccion = $('#editIdInduccion').val();
    const nombreInduccion = $('#editNombreInduccion').val().trim();
    const descripcion = $('#editDescripcion').val().trim();
    const idAreaTecnica = $('#editAreaTecnica').val();
    const puestosAplicables = $('#editPuestos').val();
    const duracionEstimada = $('#editDuracion').val().trim();
    
    // Validaciones
    if (nombreInduccion === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre de la inducción.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editNombreInduccion').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "updateInduccion",
                IdInduccion: idInduccion,
                NombreInduccion: nombreInduccion,
                Descripcion: descripcion,
                IdAreaTecnica: idAreaTecnica || '',
                PuestosAplicables: JSON.stringify(puestosAplicables || []),
                DuracionEstimada: duracionEstimada
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Completado!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            // Cerrar modal
            bootstrap.Modal.getInstance(document.getElementById('modalEditInduccion')).hide();
            
            // Recargar tabla
            loadInducciones();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al actualizar inducción:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo actualizar la inducción.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Cambiar estatus (Activar/Desactivar)
 */
async function toggleEstatus(idEncoded) {
    Swal.fire({
        title: 'Cambiar Estatus',
        text: '¿Está seguro de cambiar el estatus de esta inducción?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc107',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const respuesta = await $.ajax({
                    type: "POST",
                    url: "Backend/Inducciones/App.php",
                    data: {
                        op: "toggleEstatusInduccion",
                        IdInduccion: idEncoded
                    },
                    dataType: "json"
                });
                
                if (respuesta.Resultado && respuesta.Siguiente) {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Completado!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, "top-right", 5000);
                    loadInducciones();
                } else {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, "top-right", 5000);
                }
            } catch (error) {
                console.error("Error al cambiar estatus:", error);
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">No se pudo cambiar el estatus de la inducción.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Eliminar inducción
 */
async function deleteInduccion(idEncoded) {
    Swal.fire({
        title: 'Eliminar Inducción',
        text: '¿Está seguro de eliminar esta inducción y todo su contenido asociado? Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const respuesta = await $.ajax({
                    type: "POST",
                    url: "Backend/Inducciones/App.php",
                    data: {
                        op: "deleteInduccion",
                        IdInduccion: idEncoded
                    },
                    dataType: "json"
                });
                
                if (respuesta.Resultado && respuesta.Siguiente) {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Completado!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, "top-right", 5000);
                    loadInducciones();
                } else {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, "top-right", 5000);
                }
            } catch (error) {
                console.error("Error al eliminar inducción:", error);
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">No se pudo eliminar la inducción.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

// ==========================================
// GESTIÓN DE CONTENIDO (MATERIALES Y AUDIOVISUAL)
// ==========================================

/**
 * Abrir modal de gestión de contenido
 */
async function openContenidoModal(idEncoded, nombreInduccion) {
    $('#contenidoIdInduccion').val(idEncoded);
    $('#nombreInduccionContenido').text(nombreInduccion);
    
    // Cargar materiales y audiovisuales
    await loadMateriales(idEncoded);
    await loadAudiovisuales(idEncoded);
    
    // Mostrar modal
    let modalEl = document.getElementById('modalContenido');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
        modal = new bootstrap.Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });
    }
    modal.show();
}

/**
 * Cargar materiales de una inducción
 */
async function loadMateriales(idEncoded) {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "getMateriales",
                IdInduccion: idEncoded
            },
            dataType: "json"
        });
        
        let html = '';
        if (respuesta.length > 0) {
            respuesta.forEach(material => {
                let idMaterialEncoded = btoa(material.IdMaterial);
                let iconoArchivo = getFileIcon(material.TipoArchivo);
                
                html += `
                    <div class="material-item d-flex justify-content-between align-items-center">
                        <div>
                            <span class="material-symbols-outlined align-middle me-2">${iconoArchivo}</span>
                            <a href="${material.RutaArchivo}" target="_blank" class="text-decoration-none">
                                ${material.NombreArchivo}
                            </a>
                        </div>
                        <button class="btn btn-danger btn-sm btn-icon-only" onclick="deleteMaterial('${idMaterialEncoded}')" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                `;
            });
        } else {
            html = '<p class="text-muted text-center">No hay materiales agregados aún.</p>';
        }
        
        $('#listaMateriales').html(html);
        
    } catch (error) {
        console.error("Error al cargar materiales:", error);
        $('#listaMateriales').html('<p class="text-danger">Error al cargar materiales.</p>');
    }
}

/**
 * Obtener icono según tipo de archivo
 */
function getFileIcon(tipoArchivo) {
    if (tipoArchivo.includes('pdf')) return 'picture_as_pdf';
    if (tipoArchivo.includes('word') || tipoArchivo.includes('document')) return 'description';
    if (tipoArchivo.includes('excel') || tipoArchivo.includes('sheet')) return 'table_chart';
    if (tipoArchivo.includes('powerpoint') || tipoArchivo.includes('presentation')) return 'slideshow';
    if (tipoArchivo.includes('image')) return 'image';
    return 'attach_file';
}

/**
 * Agregar material
 */
async function addMaterial() {
    const idInduccion = $('#contenidoIdInduccion').val();
    const archivo = $('#inputMaterial')[0].files[0];
    
    if (!archivo) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe seleccionar un archivo.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        return;
    }
    
    const formData = new FormData();
    formData.append('op', 'addMaterial');
    formData.append('IdInduccion', idInduccion);
    formData.append('archivo', archivo);
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Completado!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            $('#inputMaterial').val('');
            loadMateriales(idInduccion);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al agregar material:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo subir el archivo.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Eliminar material
 */
async function deleteMaterial(idMaterialEncoded) {
    const confirmed = confirm('¿Está seguro de eliminar este material?');
    if (!confirmed) return;
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "deleteMaterial",
                IdMaterial: idMaterialEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Completado!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            const idInduccion = $('#contenidoIdInduccion').val();
            loadMateriales(idInduccion);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al eliminar material:", error);
    }
}

/**
 * Cargar audiovisuales de una inducción
 */
async function loadAudiovisuales(idEncoded) {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "getAudiovisuales",
                IdInduccion: idEncoded
            },
            dataType: "json"
        });
        
        let html = '';
        if (respuesta.length > 0) {
            respuesta.forEach(video => {
                let idAudiovisualEncoded = btoa(video.IdAudiovisual);
                let iconoPlataforma = video.Plataforma === 'YouTube' ? 'smart_display' : 'play_circle';
                
                html += `
                    <div class="audiovisual-item d-flex justify-content-between align-items-center">
                        <div>
                            <span class="material-symbols-outlined align-middle me-2">${iconoPlataforma}</span>
                            <a href="${video.EnlaceExterno}" target="_blank" class="text-decoration-none">
                                ${video.TituloVideo || video.EnlaceExterno}
                            </a>
                            <span class="badge bg-secondary ms-2">${video.Plataforma}</span>
                        </div>
                        <button class="btn btn-danger btn-sm btn-icon-only" onclick="deleteAudiovisual('${idAudiovisualEncoded}')" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                `;
            });
        } else {
            html = '<p class="text-muted text-center">No hay contenido audiovisual agregado aún.</p>';
        }
        
        $('#listaAudiovisuales').html(html);
        
    } catch (error) {
        console.error("Error al cargar audiovisuales:", error);
        $('#listaAudiovisuales').html('<p class="text-danger">Error al cargar contenido audiovisual.</p>');
    }
}

/**
 * Agregar enlace audiovisual
 */
async function addAudiovisual() {
    const idInduccion = $('#contenidoIdInduccion').val();
    const tituloVideo = $('#txtTituloVideo').val().trim();
    const enlaceExterno = $('#txtEnlaceVideo').val().trim();
    const plataforma = $('#selectPlataforma').val();
    
    if (enlaceExterno === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el enlace del video.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtEnlaceVideo').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "addAudiovisual",
                IdInduccion: idInduccion,
                TituloVideo: tituloVideo,
                EnlaceExterno: enlaceExterno,
                Plataforma: plataforma
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Completado!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            $('#txtTituloVideo').val('');
            $('#txtEnlaceVideo').val('');
            loadAudiovisuales(idInduccion);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al agregar audiovisual:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo agregar el enlace audiovisual.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Eliminar enlace audiovisual
 */
async function deleteAudiovisual(idAudiovisualEncoded) {
    const confirmed = confirm('¿Está seguro de eliminar este enlace audiovisual?');
    if (!confirmed) return;
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Inducciones/App.php",
            data: {
                op: "deleteAudiovisual",
                IdAudiovisual: idAudiovisualEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Completado!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            const idInduccion = $('#contenidoIdInduccion').val();
            loadAudiovisuales(idInduccion);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al eliminar audiovisual:", error);
    }
}
