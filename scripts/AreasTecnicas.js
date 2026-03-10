// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
    $(".preloader").fadeOut();
});

let tableAreasTecnicas;

// Inicializar cuando el documento esté listo
$(document).ready(function() {
    loadAreasTecnicas();
    
    // Evento para agregar nueva área técnica
    $('#btnAddAreaTecnica').on('click', function() {
        addAreaTecnica();
    });
    
    // Evento para guardar edición
    $('#btnSaveEdit').on('click', function() {
        updateAreaTecnica();
    });
    
    // Limpiar modal editar al cerrarse
    $('#modalEditAreaTecnica').on('hidden.bs.modal', function() {
        $('#editIdAreaTecnica').val('');
        $('#editNombreArea').val('');
        $('#editDescripcion').val('');
    });

    // Limpiar modal agregar al cerrarse
    $('#modalAddAreaTecnica').on('hidden.bs.modal', function() {
        $('#txtNombreArea').val('');
        $('#txtDescripcion').val('');
    });
});

/**
 * Cargar listado de áreas técnicas en DataTable
 */
async function loadAreasTecnicas() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/AreasTecnicas/App.php",
            data: { op: "getAreasTecnicas" },
            dataType: "json"
        });
        
        // Destruir tabla si ya existe
        if (tableAreasTecnicas) {
            tableAreasTecnicas.destroy();
        }
        
        tableAreasTecnicas = $('#tableAreasTecnicas').DataTable({
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
                    data: "IdAreaTecnica",
                    render: function(data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                { data: "NombreArea" },
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
                        let idEncoded = btoa(row.IdAreaTecnica);
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
                        
                        let btnDelete = `<button class="btn btn-danger btn-sm" onclick="deleteAreaTecnica('${idEncoded}')" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>`;
                        
                        return btnEdit + btnToggle + btnDelete;
                    }
                }
            ],
            order: [[0, 'asc']]  // Ordenar por columna # (IdAreaTecnica)
        });
        
    } catch (error) {
        console.error("Error al cargar áreas técnicas:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudieron cargar las áreas técnicas.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Agregar nueva área técnica
 */
async function addAreaTecnica() {
    const nombreArea = $('#txtNombreArea').val().trim();
    const descripcion = $('#txtDescripcion').val().trim();
    
    // Validaciones
    if (nombreArea === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre del área técnica.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtNombreArea').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/AreasTecnicas/App.php",
            data: {
                op: "addAreaTecnica",
                NombreArea: nombreArea,
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
            bootstrap.Modal.getInstance(document.getElementById('modalAddAreaTecnica')).hide();
            $('#txtNombreArea').val('');
            $('#txtDescripcion').val('');
            // Recargar tabla
            loadAreasTecnicas();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al agregar área técnica:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo registrar el área técnica.</span>
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
            url: "Backend/AreasTecnicas/App.php",
            data: {
                op: "getAreaTecnicaById",
                IdAreaTecnica: idEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            $('#editIdAreaTecnica').val(idEncoded);
            $('#editNombreArea').val(respuesta.Datos.NombreArea);
            $('#editDescripcion').val(respuesta.Datos.Descripcion || '');
            
            // Mostrar modal
            const modal = new bootstrap.Modal(document.getElementById('modalEditAreaTecnica'));
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
        console.error("Error al obtener área técnica:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo obtener la información del área técnica.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Actualizar área técnica
 */
async function updateAreaTecnica() {
    const idAreaTecnica = $('#editIdAreaTecnica').val();
    const nombreArea = $('#editNombreArea').val().trim();
    const descripcion = $('#editDescripcion').val().trim();
    
    // Validaciones
    if (nombreArea === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre del área técnica.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editNombreArea').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/AreasTecnicas/App.php",
            data: {
                op: "updateAreaTecnica",
                IdAreaTecnica: idAreaTecnica,
                NombreArea: nombreArea,
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
            bootstrap.Modal.getInstance(document.getElementById('modalEditAreaTecnica')).hide();
            // Recargar tabla
            loadAreasTecnicas();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al actualizar área técnica:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo actualizar el área técnica.</span>
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
        text: '¿Está seguro de cambiar el estatus de esta área técnica?',
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
                    url: "Backend/AreasTecnicas/App.php",
                    data: {
                        op: "toggleEstatusAreaTecnica",
                        IdAreaTecnica: idEncoded
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
                    loadAreasTecnicas();
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
                        <span class="alert-text">No se pudo cambiar el estatus del área técnica.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Eliminar área técnica
 */
async function deleteAreaTecnica(idEncoded) {
    Swal.fire({
        title: 'Eliminar Área Técnica',
        text: '¿Está seguro de eliminar esta área técnica? Esta acción no se puede deshacer.',
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
                    url: "Backend/AreasTecnicas/App.php",
                    data: {
                        op: "deleteAreaTecnica",
                        IdAreaTecnica: idEncoded
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
                    loadAreasTecnicas();
                } else {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, "top-right", 5000);
                }
            } catch (error) {
                console.error("Error al eliminar área técnica:", error);
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">No se pudo eliminar el área técnica.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Función auxiliar para cargar áreas técnicas activas en un select
 * Útil para otros módulos que necesiten un combo de áreas
 */
async function loadAreasTecnicasToSelect(selectId) {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/AreasTecnicas/App.php",
            data: { op: "getAreasTecnicasActivas" },
            dataType: "json"
        });
        
        let options = '<option value="" disabled selected>Seleccione un área técnica</option>';
        respuesta.forEach(area => {
            options += `<option value="${area.IdAreaTecnica}">${area.NombreArea}</option>`;
        });
        
        $(`#${selectId}`).html(options);
        
    } catch (error) {
        console.error("Error al cargar áreas técnicas:", error);
    }
}
