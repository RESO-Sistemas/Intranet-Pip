// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
    $(".preloader").fadeOut();
});

let tableTipoDocumentacion;

// Inicializar cuando el documento esté listo
$(document).ready(function() {
    loadTiposDocumentacion();
    
    // Evento para agregar nuevo tipo de documento
    $('#btnAddTipoDocumento').on('click', function() {
        addTipoDocumento();
    });
    
    // Evento para guardar edición
    $('#btnSaveEdit').on('click', function() {
        updateTipoDocumento();
    });
    
    // Limpiar modal editar al cerrarse
    $('#modalEditTipoDocumento').on('hidden.bs.modal', function() {
        $('#editIdTipoDocumento').val('');
        $('#editNombreDocumento').val('');
        $('#editObligatorio').prop('checked', false);
    });

    // Limpiar modal agregar al cerrarse
    $('#modalAddTipoDocumento').on('hidden.bs.modal', function() {
        $('#txtNombreDocumento').val('');
        $('#chkObligatorio').prop('checked', false);
    });
});

/**
 * Cargar listado de tipos de documentación en DataTable
 */
async function loadTiposDocumentacion() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/TipoDocumentacion/App.php",
            data: { op: "getTiposDocumentacion" },
            dataType: "json"
        });
        
        // Destruir tabla si ya existe
        if (tableTipoDocumentacion) {
            tableTipoDocumentacion.destroy();
        }
        
        tableTipoDocumentacion = $('#tableTipoDocumentacion').DataTable({
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
                    data: "IdTipoDocumento",
                    render: function(data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                { data: "NombreDocumento" },
                { 
                    data: "Obligatorio",
                    render: function(data, type, row) {
                        if (data == 1) {
                            return '<span class="badge bg-info"><span class="material-symbols-outlined align-middle" style="font-size:14px;">check_circle</span> Obligatorio</span>';
                        } else {
                            return '<span class="badge bg-secondary"><span class="material-symbols-outlined align-middle" style="font-size:14px;">remove_circle</span> Opcional</span>';
                        }
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
                        let idEncoded = btoa(row.IdTipoDocumento);
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
                        
                        let btnDelete = `<button class="btn btn-danger btn-accion" onclick="deleteTipoDocumento('${idEncoded}')" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>`;
                        
                        let btnChecklist = `<button class="btn btn-info btn-accion" onclick="openChecklist('${idEncoded}', '${row.NombreDocumento.replace(/'/g, "\\'")}')" title="Ver entregas">
                            <span class="material-symbols-outlined">checklist</span>
                        </button>`;
                        
                        return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
                            ${btnEdit}${btnToggle}${btnDelete}${btnChecklist}
                        </div>`;
                    }
                }
            ],
            order: [[0, 'asc']]
        });
        
    } catch (error) {
        console.error("Error al cargar tipos de documentación:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudieron cargar los tipos de documentación.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Agregar nuevo tipo de documento
 */
async function addTipoDocumento() {
    const nombreDocumento = $('#txtNombreDocumento').val().trim();
    const obligatorio = $('#chkObligatorio').is(':checked') ? 1 : 0;
    
    // Validaciones
    if (nombreDocumento === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre del documento.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtNombreDocumento').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/TipoDocumentacion/App.php",
            data: {
                op: "addTipoDocumento",
                NombreDocumento: nombreDocumento,
                Obligatorio: obligatorio
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
            bootstrap.Modal.getInstance(document.getElementById('modalAddTipoDocumento')).hide();
            $('#txtNombreDocumento').val('');
            $('#chkObligatorio').prop('checked', false);
            // Recargar tabla
            loadTiposDocumentacion();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al agregar tipo de documento:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo registrar el tipo de documento.</span>
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
            url: "Backend/TipoDocumentacion/App.php",
            data: {
                op: "getTipoDocumentoById",
                IdTipoDocumento: idEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            $('#editIdTipoDocumento').val(idEncoded);
            $('#editNombreDocumento').val(respuesta.Datos.NombreDocumento);
            $('#editObligatorio').prop('checked', respuesta.Datos.Obligatorio == 1);
            
            // Mostrar modal
            const modal = new bootstrap.Modal(document.getElementById('modalEditTipoDocumento'), {
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
        console.error("Error al obtener tipo de documento:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo obtener la información del tipo de documento.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

/**
 * Actualizar tipo de documento
 */
async function updateTipoDocumento() {
    const idTipoDocumento = $('#editIdTipoDocumento').val();
    const nombreDocumento = $('#editNombreDocumento').val().trim();
    const obligatorio = $('#editObligatorio').is(':checked') ? 1 : 0;
    
    // Validaciones
    if (nombreDocumento === '') {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Debe ingresar el nombre del documento.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editNombreDocumento').focus();
        return;
    }
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/TipoDocumentacion/App.php",
            data: {
                op: "updateTipoDocumento",
                IdTipoDocumento: idTipoDocumento,
                NombreDocumento: nombreDocumento,
                Obligatorio: obligatorio
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
            bootstrap.Modal.getInstance(document.getElementById('modalEditTipoDocumento')).hide();
            // Recargar tabla
            loadTiposDocumentacion();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${respuesta.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
        
    } catch (error) {
        console.error("Error al actualizar tipo de documento:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo actualizar el tipo de documento.</span>
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
        text: '¿Está seguro de cambiar el estatus de este tipo de documento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008837',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const respuesta = await $.ajax({
                    type: "POST",
                    url: "Backend/TipoDocumentacion/App.php",
                    data: {
                        op: "toggleEstatusTipoDocumento",
                        IdTipoDocumento: idEncoded
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
                    loadTiposDocumentacion();
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
                        <span class="alert-text">No se pudo cambiar el estatus del tipo de documento.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Eliminar tipo de documento
 */
async function deleteTipoDocumento(idEncoded) {
    Swal.fire({
        title: 'Eliminar Tipo de Documento',
        text: '¿Está seguro de eliminar este tipo de documento? Esta acción no se puede deshacer.',
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
                    url: "Backend/TipoDocumentacion/App.php",
                    data: {
                        op: "deleteTipoDocumento",
                        IdTipoDocumento: idEncoded
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
                    loadTiposDocumentacion();
                } else {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${respuesta.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, "top-right", 5000);
                }
            } catch (error) {
                console.error("Error al eliminar tipo de documento:", error);
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">No se pudo eliminar el tipo de documento.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        }
    });
}

/**
 * Función auxiliar para cargar tipos de documentación activos en un select
 * Útil para otros módulos que necesiten un combo de tipos
 */
async function loadTiposDocumentacionToSelect(selectId) {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/TipoDocumentacion/App.php",
            data: { op: "getTiposDocumentacionActivos" },
            dataType: "json"
        });
        
        let options = '<option value="" disabled selected>Seleccione un tipo de documento</option>';
        respuesta.forEach(tipo => {
            const obligatorioLabel = tipo.Obligatorio == 1 ? ' (Obligatorio)' : '';
            options += `<option value="${tipo.IdTipoDocumento}">${tipo.NombreDocumento}${obligatorioLabel}</option>`;
        });
        
        $(`#${selectId}`).html(options);
        
    } catch (error) {
        console.error("Error al cargar tipos de documentación:", error);
    }
}

// ==========================================
// ENFOQUE 2: CHECKLIST DE ENTREGAS
// ==========================================

let tableChecklist;

async function openChecklist(idEncoded, nombreDoc) {
    $('#checklistIdTipoDocumento').val(idEncoded);
    $('#checklistNombreDoc').text(nombreDoc);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalChecklistEntregas'), {
        backdrop: 'static',
        keyboard: false
    });
    modal.show();
    
    // Cargar datos
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/DocumentacionEmpleados/App.php",
            data: {
                op: "getEntregasPorTipoDocumento",
                IdTipoDocumento: idEncoded
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente && Array.isArray(respuesta.Data)) {
            renderChecklist(respuesta.Data, idEncoded);
        } else {
            renderChecklist([], idEncoded);
        }
    } catch (error) {
        console.error("Error al cargar checklist:", error);
        renderChecklist([], idEncoded);
    }
}

function renderChecklist(data, idTipoEncoded) {
    // Destruir DataTable existente
    if (tableChecklist) {
        tableChecklist.destroy();
        tableChecklist = null;
    }
    
    let html = '';
    if (data.length === 0) {
        html = '<tr><td colspan="5" class="text-muted">No hay empleados activos.</td></tr>';
    } else {
        data.forEach(function(emp, index) {
            const esEntregado = emp.Estatus === 'Completo';
            const badge = esEntregado 
                ? '<span class="badge bg-success"><span class="material-symbols-outlined align-middle" style="font-size:14px;">check_circle</span> Entregado</span>'
                : '<span class="badge bg-warning text-dark"><span class="material-symbols-outlined align-middle" style="font-size:14px;">pending</span> Pendiente</span>';
            const fecha = emp.FechaCarga || '-';
            
            let btnAccion = '';
            if (esEntregado) {
                btnAccion = `<button class="btn btn-sm btn-outline-warning" onclick="toggleEntregaEmpleado(${emp.NoEmpleado}, '${idTipoEncoded}', 'Pendiente')" title="Marcar como pendiente">
                    <span class="material-symbols-outlined" style="font-size: 16px;">undo</span> Pendiente
                </button>`;
            } else {
                btnAccion = `<button class="btn btn-sm btn-success" onclick="toggleEntregaEmpleado(${emp.NoEmpleado}, '${idTipoEncoded}', 'Completo')" title="Marcar como entregado">
                    <span class="material-symbols-outlined" style="font-size: 16px;">check_circle</span> Entregado
                </button>`;
            }
            
            html += `<tr>
                <td>${index + 1}</td>
                <td class="text-start">${emp.Nombre}</td>
                <td>${badge}</td>
                <td>${fecha}</td>
                <td>${btnAccion}</td>
            </tr>`;
        });
    }
    
    $('#tableChecklist tbody').html(html);
    
    if (data.length > 0) {
        tableChecklist = $('#tableChecklist').DataTable({
            destroy: true,
            language: {
                lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
                zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
                info: "PÁGINA _PAGE_ DE _PAGES_",
                infoEmpty: "NO HAY DATOS PARA MOSTRAR",
                infoFiltered: "",
                search: "BUSCAR",
                paginate: { previous: "ANTERIOR", next: "SIGUIENTE" }
            },
            pageLength: 25,
            order: [[2, 'asc']],  // Pendientes primero
            columnDefs: [
                { orderable: false, targets: [4] }
            ]
        });
    }
}

async function toggleEntregaEmpleado(noEmpleado, idTipoEncoded, nuevoEstatus) {
    const fechaHoy = nuevoEstatus === 'Completo' ? new Date().toISOString().split('T')[0] : '';
    
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/DocumentacionEmpleados/App.php",
            data: {
                op: "marcarDocumentoEntregado",
                NoEmpleado: btoa(String(noEmpleado)),
                IdTipoDocumento: idTipoEncoded,
                Estatus: nuevoEstatus,
                FechaCarga: fechaHoy,
                Observaciones: ''
            },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Siguiente) {
            // Recargar checklist
            openChecklist(idTipoEncoded, $('#checklistNombreDoc').text());
        } else {
            Swal.fire('Atención', respuesta.Msg || 'Error al actualizar.', 'warning');
        }
    } catch (error) {
        console.error("Error al toggle entrega:", error);
        Swal.fire('Error', 'Error de conexión con el servidor.', 'error');
    }
}
