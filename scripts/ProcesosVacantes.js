// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
    $(".preloader").fadeOut();
});

let tableProcesosVacantes;

// Inicializar cuando el documento esté listo
$(document).ready(function() {
    loadProcesosVacantes();
    
    // Evento para agregar nuevo proceso
    $('#btnAddProceso').on('click', function() {
        addProcesoVacante();
    });
    
    // Evento para guardar edición
    $('#btnSaveEdit').on('click', function() {
        updateProcesoVacante();
    });
    
    // Limpiar modal editar al cerrarse
    $('#modalEditProceso').on('hidden.bs.modal', function() {
        $('#editIdProceso').val('');
        $('#editNombreProceso').val('');
        $('#editDescripcion').val('');
    });

    // Limpiar modal agregar al cerrarse
    $('#modalAddProceso').on('hidden.bs.modal', function() {
        $('#txtNombreProceso').val('');
        $('#txtDescripcion').val('');
    });
});

/**
 * Cargar listado de procesos en DataTable
 */
async function loadProcesosVacantes() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/ProcesosVacantes/App.php",
            data: { op: "getProcesosVacantes" },
            dataType: "json"
        });
        
        // Destruir tabla si ya existe
        if (tableProcesosVacantes) {
            tableProcesosVacantes.destroy();
        }
        
        tableProcesosVacantes = $('#tableProcesosVacantes').DataTable({
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
                    data: "IdProceso",
                    render: function(data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                { data: "NombreProceso" },
                { 
                    data: "Descripcion",
                    render: function(data, type, row) {
                        if (data && data.length > 50) {
                            return data.substring(0, 50) + '...';
                        }
                        return data || '-';
                    }
                },
                { 
                    data: "Estatus",
                    render: function(data, type, row) {
                        if (data == 1) {
                            return '<span class="badge bg-success">Activo</span>';
                        } else {
                            return '<span class="badge bg-danger">Inactivo</span>';
                        }
                    }
                },
                {
                    data: null,
                    orderable: false,
                    render: function(data, type, row) {
                        let idEncoded = btoa(row.IdProceso);
                        let btnEdit = `<button class="btn btn-primary btn-sm me-1" onclick="openEditModal('${idEncoded}')" title="Editar">
                            <span class="material-symbols-outlined">edit</span>
                        </button>`;
                        
                        let btnToggle = '';
                        if (row.Estatus == 1) {
                            btnToggle = `<button class="btn btn-warning btn-sm me-1" onclick="toggleEstatus('${idEncoded}')" title="Desactivar">
                                <span class="material-symbols-outlined">toggle_off</span>
                            </button>`;
                        } else {
                            btnToggle = `<button class="btn btn-success btn-sm me-1" onclick="toggleEstatus('${idEncoded}')" title="Activar">
                                <span class="material-symbols-outlined">toggle_on</span>
                            </button>`;
                        }
                        
                        let btnDelete = `<button class="btn btn-danger btn-sm" onclick="deleteProcesoVacante('${idEncoded}')" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>`;
                        
                        return btnEdit + btnToggle + btnDelete;
                    }
                }
            ],
            order: [[0, 'asc']]
        });
        
    } catch (error) {
        console.error("Error al cargar procesos:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudieron cargar los procesos de vacantes.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Agregar nuevo proceso
 */
async function addProcesoVacante() {
    const nombreProceso = $('#txtNombreProceso').val().trim();
    const descripcion = $('#txtDescripcion').val().trim();
    
    // Validaciones
    if (nombreProceso === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre del proceso.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtNombreProceso').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/ProcesosVacantes/App.php",
            data: {
                op: "addProcesoVacante",
                NombreProceso: nombreProceso,
                Descripcion: descripcion
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
            // Cerrar modal y limpiar campos
            bootstrap.Modal.getInstance(document.getElementById('modalAddProceso')).hide();
            $('#txtNombreProceso').val('');
            $('#txtDescripcion').val('');
            // Recargar tabla
            loadProcesosVacantes();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al agregar proceso:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo registrar el proceso.</span>
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
            url: "Backend/ProcesosVacantes/App.php",
            data: {
                op: "getProcesoVacanteById",
                IdProceso: idEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            $('#editIdProceso').val(idEncoded);
            $('#editNombreProceso').val(respuesta.Datos.NombreProceso);
            $('#editDescripcion').val(respuesta.Datos.Descripcion || '');
            
            // Mostrar modal
            const modal = new bootstrap.Modal(document.getElementById('modalEditProceso'), {
                backdrop: 'static',
                keyboard: false
            });
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
        console.error("Error al obtener proceso:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo obtener la información del proceso.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Actualizar proceso
 */
async function updateProcesoVacante() {
    const idProceso = $('#editIdProceso').val();
    const nombreProceso = $('#editNombreProceso').val().trim();
    const descripcion = $('#editDescripcion').val().trim();
    
    // Validaciones
    if (nombreProceso === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre del proceso.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editNombreProceso').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/ProcesosVacantes/App.php",
            data: {
                op: "updateProcesoVacante",
                IdProceso: idProceso,
                NombreProceso: nombreProceso,
                Descripcion: descripcion
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
            bootstrap.Modal.getInstance(document.getElementById('modalEditProceso')).hide();
            // Recargar tabla
            loadProcesosVacantes();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al actualizar proceso:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo actualizar el proceso.</span>
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
        text: '¿Está seguro de cambiar el estatus de este proceso?',
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
                    url: "Backend/ProcesosVacantes/App.php",
                    data: {
                        op: "toggleEstatusProcesoVacante",
                        IdProceso: idEncoded
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
                    loadProcesosVacantes();
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
                        <span class="alert-text">No se pudo cambiar el estatus del proceso.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Eliminar proceso
 */
async function deleteProcesoVacante(idEncoded) {
    Swal.fire({
        title: 'Eliminar Proceso',
        text: '¿Está seguro de eliminar este proceso? Esta acción no se puede deshacer.',
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
                    url: "Backend/ProcesosVacantes/App.php",
                    data: {
                        op: "deleteProcesoVacante",
                        IdProceso: idEncoded
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
                    loadProcesosVacantes();
                } else {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, "top-right", 5000);
                }
            } catch (error) {
                console.error("Error al eliminar proceso:", error);
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">No se pudo eliminar el proceso.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Función auxiliar para cargar procesos activos en un select
 * Útil para otros módulos que necesiten un combo de procesos
 */
async function loadProcesosVacantesToSelect(selectId) {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/ProcesosVacantes/App.php",
            data: { op: "getProcesosVacantesActivos" },
            dataType: "json"
        });
        
        let options = '<option value="" disabled selected>Seleccione un proceso</option>';
        respuesta.forEach(proceso => {
            options += `<option value="${proceso.IdProceso}">${proceso.NombreProceso}</option>`;
        });
        
        $(`#${selectId}`).html(options);
        
    } catch (error) {
        console.error("Error al cargar procesos:", error);
    }
}
