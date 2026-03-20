$(document).ready(function() {
    if (typeof NO_EMPLEADO_DOC !== 'undefined' && NO_EMPLEADO_DOC > 0) {
        loadDocumentacionCompleta();
    }
});

function toB64(value) {
    return btoa(String(value));
}

// ==========================================
// ENFOQUE 1: VISTA INTELIGENTE
// Carga TODOS los tipos de documento del catálogo
// y muestra si el empleado ya lo entregó o no
// ==========================================
function loadDocumentacionCompleta() {
    $.post('Backend/DocumentacionEmpleados/App.php', {
        op: 'getDocumentacionCompletaEmpleado',
        NoEmpleado: toB64(NO_EMPLEADO_DOC)
    }).done(function(response) {
        try {
            const result = JSON.parse(response);
            if (result && result.Siguiente && Array.isArray(result.Data)) {
                renderSmartTable(result.Data);
            } else {
                renderSmartTable([]);
            }
        } catch (e) {
            console.error('Error parsing response:', e);
            renderSmartTable([]);
        }
    }).fail(function(err) {
        console.error('Error al cargar documentación:', err);
        renderSmartTable([]);
    });
}

function renderSmartTable(data) {
    // Destruir DataTable existente
    if ($.fn.DataTable.isDataTable('#tableDocumentacion')) {
        $('#tableDocumentacion').DataTable().destroy();
    }

    let html = '';
    if (data.length === 0) {
        html = '<tr><td colspan="6" class="text-muted">No hay tipos de documento configurados en el catálogo.</td></tr>';
    } else {
        data.forEach(function(doc, index) {
            const badge = getEstatusBadge(doc.Estatus);
            const fechaCarga = doc.FechaCarga || '-';
            const obs = doc.Observaciones || '-';
            const obligatorio = doc.Obligatorio == 1 ? ' <span class="badge bg-info badge-sm">Obligatorio</span>' : '';
            
            let acciones = '';
            if (doc.Estatus === 'Pendiente' && !doc.IdDocumentacionEmpleado) {
                // No tiene registro — mostrar botón "Marcar como entregado"
                acciones = `<button class="btn btn-sm btn-success" onclick="openMarcarModal(${doc.IdTipoDocumento}, '${escapeHtml(doc.NombreDocumento)}')">
                    <span class="material-symbols-outlined" style="font-size: 16px;">check_circle</span> Entregado
                </button>`;
            } else {
                // Ya tiene registro — mostrar botón editar
                acciones = `<button class="btn btn-sm btn-outline-primary" onclick="openEditarEstatusModal(${doc.IdTipoDocumento}, '${escapeHtml(doc.NombreDocumento)}', '${doc.Estatus}', '${doc.FechaCarga || ''}', '${escapeHtml(doc.Observaciones || '')}')">
                    <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
                </button>`;
            }

            html += `<tr>
                <td>${index + 1}</td>
                <td class="text-start">${doc.NombreDocumento}${obligatorio}</td>
                <td>${badge}</td>
                <td>${fechaCarga}</td>
                <td class="text-start">${obs}</td>
                <td>${acciones}</td>
            </tr>`;
        });
    }

    $('#tableDocumentacion tbody').html(html);

    // Inicializar DataTable
    if (data.length > 0) {
        $('#tableDocumentacion').DataTable({
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
                { orderable: false, targets: [5] }
            ]
        });
    }
}

function getEstatusBadge(estatus) {
    switch (estatus) {
        case 'Completo':
            return '<span class="badge bg-success"><span class="material-symbols-outlined align-middle" style="font-size:14px;">check_circle</span> Completo</span>';
        case 'Pendiente':
            return '<span class="badge bg-warning text-dark"><span class="material-symbols-outlined align-middle" style="font-size:14px;">pending</span> Pendiente</span>';
        case 'Vencido':
            return '<span class="badge bg-danger"><span class="material-symbols-outlined align-middle" style="font-size:14px;">error</span> Vencido</span>';
        default:
            return '<span class="badge bg-secondary">' + estatus + '</span>';
    }
}

// ==========================================
// MODAL: Marcar como entregado
// ==========================================
function openMarcarModal(idTipoDocumento, nombreDoc) {
    $('#marcarIdTipoDocumento').val(idTipoDocumento);
    $('#marcarNombreDocumento').val(nombreDoc);
    $('#marcarEstatus').val('Completo');
    $('#marcarFechaCarga').val(new Date().toISOString().split('T')[0]); // Hoy
    $('#marcarObservaciones').val('');
    $('#modalMarcarDocumento').modal('show');
}

function marcarDocumentoEntregado() {
    const idTipoDocumento = $('#marcarIdTipoDocumento').val();
    const estatus = $('#marcarEstatus').val();
    const fechaCarga = $('#marcarFechaCarga').val();
    const observaciones = $('#marcarObservaciones').val();

    $.post('Backend/DocumentacionEmpleados/App.php', {
        op: 'marcarDocumentoEntregado',
        NoEmpleado: toB64(NO_EMPLEADO_DOC),
        IdTipoDocumento: toB64(idTipoDocumento),
        Estatus: estatus,
        FechaCarga: fechaCarga,
        Observaciones: observaciones
    }).done(function(response) {
        try {
            const result = JSON.parse(response);
            if (result.Siguiente) {
                Swal.fire('¡Éxito!', result.Msg, 'success');
                $('#modalMarcarDocumento').modal('hide');
                loadDocumentacionCompleta();
            } else {
                Swal.fire('Atención', result.Msg, 'warning');
            }
        } catch (e) {
            Swal.fire('Error', 'Error al procesar la respuesta.', 'error');
        }
    }).fail(function() {
        Swal.fire('Error', 'Error de conexión con el servidor.', 'error');
    });
}

// ==========================================
// MODAL: Editar estatus de documento existente
// ==========================================
function openEditarEstatusModal(idTipoDocumento, nombreDoc, estatus, fechaCarga, observaciones) {
    $('#editarIdTipoDocumento').val(idTipoDocumento);
    $('#editarNombreDocumento').val(nombreDoc);
    $('#editarEstatus').val(estatus);
    $('#editarFechaCarga').val(fechaCarga);
    $('#editarObservaciones').val(observaciones);
    $('#modalEditarEstatus').modal('show');
}

function guardarEdicionEstatus() {
    const idTipoDocumento = $('#editarIdTipoDocumento').val();
    const estatus = $('#editarEstatus').val();
    const fechaCarga = $('#editarFechaCarga').val();
    const observaciones = $('#editarObservaciones').val();

    $.post('Backend/DocumentacionEmpleados/App.php', {
        op: 'marcarDocumentoEntregado',
        NoEmpleado: toB64(NO_EMPLEADO_DOC),
        IdTipoDocumento: toB64(idTipoDocumento),
        Estatus: estatus,
        FechaCarga: fechaCarga,
        Observaciones: observaciones
    }).done(function(response) {
        try {
            const result = JSON.parse(response);
            if (result.Siguiente) {
                Swal.fire('¡Éxito!', result.Msg, 'success');
                $('#modalEditarEstatus').modal('hide');
                loadDocumentacionCompleta();
            } else {
                Swal.fire('Atención', result.Msg, 'warning');
            }
        } catch (e) {
            Swal.fire('Error', 'Error al procesar la respuesta.', 'error');
        }
    }).fail(function() {
        Swal.fire('Error', 'Error de conexión con el servidor.', 'error');
    });
}

// ==========================================
// UTILIDADES
// ==========================================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
