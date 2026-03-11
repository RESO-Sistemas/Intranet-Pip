// ==========================================
// VACANTES.JS - Gestión de Vacantes
// ==========================================

let tableVacantes;
let vacantesData = [];

// ==========================================
// INICIALIZACIÓN
// ==========================================

$(document).ready(function() {
    initDataTable();
    initSelect2();
    loadVacantes();
    loadCombos();
    setupEventListeners();
});

// ==========================================
// INICIALIZAR SELECT2
// ==========================================

function initSelect2() {
    // Select2 para modal Agregar
    $('#cmbAreaTecnica').select2({
        dropdownParent: $('#modalAddVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    $('#cmbPuesto').select2({
        dropdownParent: $('#modalAddVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    $('#cmbSucursal').select2({
        dropdownParent: $('#modalAddVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    $('#cmbTipoContratacion').select2({
        dropdownParent: $('#modalAddVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    // Select2 para modal Editar
    $('#editAreaTecnica').select2({
        dropdownParent: $('#modalEditVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    $('#editPuesto').select2({
        dropdownParent: $('#modalEditVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    $('#editSucursal').select2({
        dropdownParent: $('#modalEditVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    $('#editTipoContratacion').select2({
        dropdownParent: $('#modalEditVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true
    });
    
    // Select2 para modal Detalle (Evaluaciones e Inducciones)
    $('#cmbNuevaEvaluacion').select2({
        dropdownParent: $('#modalDetalleVacante'),
        width: '100%',
        placeholder: 'Seleccione evaluación...',
        allowClear: true
    });
    
    $('#cmbProcesoEvaluacion').select2({
        dropdownParent: $('#modalDetalleVacante'),
        width: '100%',
        placeholder: 'Seleccione proceso...',
        allowClear: true
    });
    
    $('#cmbNuevaInduccion').select2({
        dropdownParent: $('#modalDetalleVacante'),
        width: '100%',
        placeholder: 'Seleccione inducción...',
        allowClear: true
    });
}

function initDataTable() {
    tableVacantes = $('#tableVacantes').DataTable({
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            }
        },
        responsive: true,
        order: [[0, 'asc']], // Ordenar por ID ascendente como en la base de datos
        columnDefs: [
            { className: "text-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }, // Centrar todas excepto Acciones
            { orderable: false, targets: [8] } // Columna Acciones no ordenable
        ]
    });
}

function setupEventListeners() {
    // Botón agregar vacante
    $('#btnAddVacante').on('click', addVacante);
    
    // Botón guardar edición
    $('#btnSaveEdit').on('click', updateVacante);
    
    // Limpiar modal al cerrar
    $('#modalAddVacante').on('hidden.bs.modal', function() {
        clearAddForm();
    });
}

// ==========================================
// CARGAR COMBOS
// ==========================================

async function loadCombos() {
    await Promise.all([
        loadAreasTecnicas(),
        loadPuestos(),
        loadSucursales(),
        loadProcesosVacantes(),
        loadEvaluaciones(),
        loadInducciones()
    ]);
}

async function loadAreasTecnicas() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getAreasTecnicasActivas" });
        const data = JSON.parse(response);
        
        let options = '<option value="">Seleccione...</option>';
        if (data && data.length > 0) {
            data.forEach(item => {
                options += `<option value="${item.IdAreaTecnica}">${item.NombreArea}</option>`;
            });
        }
        
        $('#cmbAreaTecnica').html(options).trigger('change');
        $('#editAreaTecnica').html(options).trigger('change');
    } catch (error) {
        console.error("Error al cargar áreas técnicas:", error);
    }
}

async function loadPuestos() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getPuestosActivos" });
        const data = JSON.parse(response);
        
        let options = '<option value="">Seleccione...</option>';
        if (data && data.length > 0) {
            data.forEach(item => {
                options += `<option value="${item.IdPuesto}">${item.Puesto}</option>`;
            });
        }
        
        $('#cmbPuesto').html(options).trigger('change');
        $('#editPuesto').html(options).trigger('change');
    } catch (error) {
        console.error("Error al cargar puestos:", error);
    }
}

async function loadSucursales() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getSucursalesActivas" });
        const data = JSON.parse(response);
        
        let options = '<option value="">Seleccione...</option>';
        if (data && data.length > 0) {
            data.forEach(item => {
                options += `<option value="${item.IdSucursal}">${item.Sucursal}</option>`;
            });
        }
        
        $('#cmbSucursal').html(options).trigger('change');
        $('#editSucursal').html(options).trigger('change');
    } catch (error) {
        console.error("Error al cargar sucursales:", error);
    }
}

async function loadProcesosVacantes() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getProcesosVacantesActivos" });
        const data = JSON.parse(response);
        
        let options = '<option value="">Seleccione proceso...</option>';
        data.forEach(item => {
            options += `<option value="${item.IdProceso}">${item.NombreProceso}</option>`;
        });
        
        $('#cmbProcesoEvaluacion').html(options).trigger('change');
    } catch (error) {
        console.error("Error al cargar procesos:", error);
    }
}

async function loadEvaluaciones() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getEvaluacionesActivas" });
        const data = JSON.parse(response);
        
        let options = '<option value="">Seleccione evaluación...</option>';
        data.forEach(item => {
            options += `<option value="${item.idEvaluaciones}">${item.Titulo}</option>`;
        });
        
        $('#cmbNuevaEvaluacion').html(options).trigger('change');
    } catch (error) {
        console.error("Error al cargar evaluaciones:", error);
    }
}

async function loadInducciones() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getInduccionesActivas" });
        const data = JSON.parse(response);
        
        let options = '<option value="">Seleccione inducción...</option>';
        data.forEach(item => {
            options += `<option value="${item.IdInduccion}">${item.NombreInduccion}</option>`;
        });
        
        $('#cmbNuevaInduccion').html(options).trigger('change');
    } catch (error) {
        console.error("Error al cargar inducciones:", error);
    }
}

// ==========================================
// CRUD PRINCIPAL DE VACANTES
// ==========================================

async function loadVacantes() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getVacantes" });
        vacantesData = JSON.parse(response);
        
        tableVacantes.clear();
        
        // Contadores para estadísticas
        let borrador = 0, activas = 0, cerradas = 0;
        
        vacantesData.forEach((vacante, index) => {
            // Contar por estatus
            if (vacante.Estatus == 1) borrador++;
            if (vacante.Estatus == 2) activas++;
            if (vacante.Estatus == 3) cerradas++;
            
            const statusBadge = getStatusBadge(vacante.Estatus);
            const publishedBadge = vacante.Publicada == 1 
                ? '<span class="badge bg-success published-badge">Sí</span>' 
                : '<span class="badge bg-secondary published-badge">No</span>';
            
            const idEncoded = btoa(vacante.IdVacante);
            
            const actions = `
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-info btn-sm" onclick="openDetalleModal('${idEncoded}')" title="Ver detalle">
                        <span class="material-symbols-outlined">visibility</span>
                    </button>
                    ${vacante.Publicada == 0 ? `
                    <button type="button" class="btn btn-primary btn-sm" onclick="openEditModal('${idEncoded}')" title="Editar">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    ` : ''}
                    ${getStatusActions(vacante, idEncoded)}
                    ${vacante.Publicada == 0 && vacante.Estatus == 2 ? `
                    <button type="button" class="btn btn-success btn-sm" onclick="publicarVacante('${idEncoded}')" title="Publicar">
                        <span class="material-symbols-outlined">publish</span>
                    </button>
                    ` : ''}
                    ${vacante.Publicada == 0 ? `
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteVacante('${idEncoded}')" title="Eliminar">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                    ` : ''}
                </div>
            `;
            
            tableVacantes.row.add([
                index + 1,
                vacante.NombreVacante,
                vacante.NombreArea || '<span class="text-muted">-</span>',
                vacante.Puesto || '<span class="text-muted">-</span>',
                vacante.TipoContratacion,
                formatDate(vacante.FechaApertura),
                statusBadge,
                publishedBadge,
                actions
            ]);
        });
        
        tableVacantes.draw();
        
        // Actualizar estadísticas
        $('#totalVacantes').text(vacantesData.length);
        $('#vacantesborrador').text(borrador);
        $('#vacantesActivas').text(activas);
        $('#vacantesCerradas').text(cerradas);
        
    } catch (error) {
        console.error("Error al cargar vacantes:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudieron cargar las vacantes.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

function getStatusBadge(estatus) {
    switch(parseInt(estatus)) {
        case 1: return '<span class="badge bg-secondary status-badge">Borrador</span>';
        case 2: return '<span class="badge bg-success status-badge">Activa</span>';
        case 3: return '<span class="badge bg-danger status-badge">Cerrada</span>';
        default: return '<span class="badge bg-secondary status-badge">-</span>';
    }
}

function getStatusActions(vacante, idEncoded) {
    let actions = '';
    
    if (vacante.Publicada == 0) {
        if (vacante.Estatus == 1) {
            // Borrador -> puede activar
            actions += `<button type="button" class="btn btn-success btn-sm" onclick="cambiarEstatus('${idEncoded}', 2)" title="Activar">
                <span class="material-symbols-outlined">play_arrow</span>
            </button>`;
        } else if (vacante.Estatus == 2) {
            // Activa -> puede cerrar o volver a borrador
            actions += `<button type="button" class="btn btn-warning btn-sm" onclick="cambiarEstatus('${idEncoded}', 1)" title="Volver a borrador">
                <span class="material-symbols-outlined">edit_note</span>
            </button>`;
            actions += `<button type="button" class="btn btn-danger btn-sm" onclick="cambiarEstatus('${idEncoded}', 3)" title="Cerrar">
                <span class="material-symbols-outlined">stop</span>
            </button>`;
        } else if (vacante.Estatus == 3) {
            // Cerrada -> puede reactivar
            actions += `<button type="button" class="btn btn-success btn-sm" onclick="cambiarEstatus('${idEncoded}', 2)" title="Reactivar">
                <span class="material-symbols-outlined">replay</span>
            </button>`;
        }
    }
    
    return actions;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
}

// ==========================================
// AGREGAR VACANTE
// ==========================================

function prepareAddModal() {
    // Establecer fecha de hoy como predeterminada
    const today = new Date().toISOString().split('T')[0];
    $('#txtFechaApertura').val(today);
}

async function addVacante() {
    const nombre = $('#txtNombreVacante').val().trim();
    const tipoContratacion = $('#cmbTipoContratacion').val();
    const fechaApertura = $('#txtFechaApertura').val();
    
    if (!nombre) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El nombre de la vacante es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtNombreVacante').focus();
        return;
    }
    
    if (!tipoContratacion) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El tipo de contratación es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbTipoContratacion').focus();
        return;
    }
    
    if (!fechaApertura) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">La fecha de apertura es requerida.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtFechaApertura').focus();
        return;
    }
    
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "addVacante",
            NombreVacante: nombre,
            IdAreaTecnica: $('#cmbAreaTecnica').val() || null,
            IdPuesto: $('#cmbPuesto').val() || null,
            TipoContratacion: tipoContratacion,
            IdSucursal: $('#cmbSucursal').val() || null,
            DescripcionPuesto: $('#txtDescripcionPuesto').val(),
            SalarioMinimo: $('#txtSalarioMinimo').val() || null,
            SalarioMaximo: $('#txtSalarioMaximo').val() || null,
            FechaApertura: fechaApertura,
            FechaCierre: $('#txtFechaCierre').val() || null,
            BanderaCV: $('#chkBanderaCV').is(':checked') ? 1 : 0,
            BanderaSE: $('#chkBanderaSE').is(':checked') ? 1 : 0
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            $('#modalAddVacante').modal('hide');
            loadVacantes();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al agregar vacante:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo registrar la vacante.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

function clearAddForm() {
    $('#txtNombreVacante').val('');
    $('#cmbTipoContratacion').val('').trigger('change');
    $('#cmbAreaTecnica').val('').trigger('change');
    $('#cmbPuesto').val('').trigger('change');
    $('#cmbSucursal').val('').trigger('change');
    $('#txtDescripcionPuesto').val('');
    $('#txtSalarioMinimo').val('');
    $('#txtSalarioMaximo').val('');
    $('#txtFechaApertura').val('');
    $('#txtFechaCierre').val('');
    $('#chkBanderaCV').prop('checked', false);
    $('#chkBanderaSE').prop('checked', false);
}

// ==========================================
// EDITAR VACANTE
// ==========================================

async function openEditModal(idEncoded) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "getVacanteById",
            IdVacante: idEncoded
        });
        
        const result = JSON.parse(response);
        
        if (result.Resultado && result.Siguiente) {
            const vacante = result.Datos;
            $('#editIdVacante').val(idEncoded);
            $('#editNombreVacante').val(vacante.NombreVacante);
            $('#editTipoContratacion').val(vacante.TipoContratacion).trigger('change');
            $('#editAreaTecnica').val(vacante.IdAreaTecnica || '').trigger('change');
            $('#editPuesto').val(vacante.IdPuesto || '').trigger('change');
            $('#editSucursal').val(vacante.IdSucursal || '').trigger('change');
            $('#editDescripcionPuesto').val(vacante.DescripcionPuesto || '');
            $('#editSalarioMinimo').val(vacante.SalarioMinimo || '');
            $('#editSalarioMaximo').val(vacante.SalarioMaximo || '');
            $('#editFechaApertura').val(vacante.FechaApertura || '');
            $('#editFechaCierre').val(vacante.FechaCierre || '');
            $('#editBanderaCV').prop('checked', vacante.BanderaCV == 1);
            $('#editBanderaSE').prop('checked', vacante.BanderaSE == 1);
            
            $('#modalEditVacante').modal('show');
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg || 'No se encontró la vacante'}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al cargar vacante:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo cargar la información de la vacante.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

async function updateVacante() {
    const idVacante = $('#editIdVacante').val();
    const nombre = $('#editNombreVacante').val().trim();
    const tipoContratacion = $('#editTipoContratacion').val();
    const fechaApertura = $('#editFechaApertura').val();
    
    if (!nombre) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El nombre de la vacante es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editNombreVacante').focus();
        return;
    }
    
    if (!tipoContratacion) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El tipo de contratación es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editTipoContratacion').focus();
        return;
    }
    
    if (!fechaApertura) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">La fecha de apertura es requerida.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#editFechaApertura').focus();
        return;
    }
    
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "updateVacante",
            IdVacante: idVacante,
            NombreVacante: nombre,
            IdAreaTecnica: $('#editAreaTecnica').val() || null,
            IdPuesto: $('#editPuesto').val() || null,
            TipoContratacion: tipoContratacion,
            IdSucursal: $('#editSucursal').val() || null,
            DescripcionPuesto: $('#editDescripcionPuesto').val(),
            SalarioMinimo: $('#editSalarioMinimo').val() || null,
            SalarioMaximo: $('#editSalarioMaximo').val() || null,
            FechaApertura: fechaApertura,
            FechaCierre: $('#editFechaCierre').val() || null,
            BanderaCV: $('#editBanderaCV').is(':checked') ? 1 : 0,
            BanderaSE: $('#editBanderaSE').is(':checked') ? 1 : 0
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            $('#modalEditVacante').modal('hide');
            loadVacantes();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al actualizar vacante:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo actualizar la vacante.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

// ==========================================
// CAMBIAR ESTATUS
// ==========================================

async function cambiarEstatus(idEncoded, nuevoEstatus) {
    const estatusTexto = {
        1: 'Borrador',
        2: 'Activa',
        3: 'Cerrada'
    };
    
    const result = await Swal.fire({
        title: '¿Cambiar estatus?',
        text: `La vacante cambiará a estado: ${estatusTexto[nuevoEstatus]}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", {
                op: "cambiarEstatusVacante",
                IdVacante: idEncoded,
                NuevoEstatus: nuevoEstatus
            });
            
            const data = JSON.parse(response);
            
            if (data.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                loadVacantes();
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al cambiar estatus:", error);
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al cambiar el estatus.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    }
}

// ==========================================
// PUBLICAR VACANTE
// ==========================================

async function publicarVacante(idEncoded) {
    const result = await Swal.fire({
        title: '¿Publicar vacante?',
        html: `<p>Una vez publicada, la vacante <strong>no podrá ser editada ni eliminada</strong>.</p>
               <p class="text-danger"><strong>Esta acción no se puede deshacer.</strong></p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, publicar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", {
                op: "publicarVacante",
                IdVacante: idEncoded
            });
            
            const data = JSON.parse(response);
            
            if (data.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                loadVacantes();
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al publicar vacante:", error);
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al publicar la vacante.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    }
}

// ==========================================
// ELIMINAR VACANTE
// ==========================================

async function deleteVacante(idEncoded) {
    const result = await Swal.fire({
        title: '¿Eliminar vacante?',
        text: 'Esta acción eliminará la vacante y todos sus datos relacionados',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", {
                op: "deleteVacante",
                IdVacante: idEncoded
            });
            
            const data = JSON.parse(response);
            
            if (data.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                loadVacantes();
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al eliminar vacante:", error);
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al eliminar la vacante.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    }
}

// ==========================================
// MODAL DETALLE - INFORMACIÓN GENERAL
// ==========================================

async function openDetalleModal(idEncoded) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "getVacanteById",
            IdVacante: idEncoded
        });
        
        const result = JSON.parse(response);
        
        if (result.Resultado && result.Siguiente) {
            const vacante = result.Datos;
            $('#detalleIdVacante').val(idEncoded);
            $('#detalleNombre').text(vacante.NombreVacante);
            $('#detalleArea').text(vacante.NombreArea || '-');
            $('#detallePuesto').text(vacante.Puesto || '-');
            $('#detalleSucursal').text(vacante.Sucursal || '-');
            $('#detalleTipoContratacion').text(vacante.TipoContratacion);
            
            // Formato de salario
            let salario = '-';
            if (vacante.SalarioMinimo && vacante.SalarioMaximo) {
                salario = `$${formatNumber(vacante.SalarioMinimo)} - $${formatNumber(vacante.SalarioMaximo)}`;
            } else if (vacante.SalarioMinimo) {
                salario = `Desde $${formatNumber(vacante.SalarioMinimo)}`;
            } else if (vacante.SalarioMaximo) {
                salario = `Hasta $${formatNumber(vacante.SalarioMaximo)}`;
            }
            $('#detalleSalario').text(salario);
            
            $('#detalleFechaApertura').text(formatDate(vacante.FechaApertura));
            $('#detalleFechaCierre').text(vacante.FechaCierre ? formatDate(vacante.FechaCierre) : '-');
            $('#detalleDescripcion').text(vacante.DescripcionPuesto || 'Sin descripción');
            
            // Cargar requisitos, evaluaciones e inducciones
            await Promise.all([
                loadRequisitosDetalle(idEncoded),
                loadEvaluacionesDetalle(idEncoded),
                loadInduccionesDetalle(idEncoded)
            ]);
            
            $('#modalDetalleVacante').modal('show');
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg || 'No se encontró la vacante'}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al cargar detalle:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">No se pudo cargar el detalle de la vacante.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

function formatNumber(num) {
    return parseFloat(num).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==========================================
// REQUISITOS
// ==========================================

async function loadRequisitosDetalle(idVacante) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "getRequisitosVacante",
            IdVacante: idVacante
        });
        
        const requisitos = JSON.parse(response);
        
        if (requisitos && requisitos.length > 0) {
            let html = '';
            requisitos.forEach(req => {
                const idEncoded = btoa(req.IdVacanteRequisito);
                html += `
                    <div class="requisito-item">
                        <span>${req.Requisito}</span>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteRequisito('${idEncoded}')">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                `;
            });
            $('#listaRequisitos').html(html);
        } else {
            $('#listaRequisitos').html('<p class="text-muted text-center">No hay requisitos configurados</p>');
        }
    } catch (error) {
        console.error("Error al cargar requisitos:", error);
    }
}

function showAddRequisitoForm() {
    $('#formAddRequisito').slideDown();
    $('#txtNuevoRequisito').focus();
}

function hideAddRequisitoForm() {
    $('#formAddRequisito').slideUp();
    $('#txtNuevoRequisito').val('');
    $('#txtOrdenRequisito').val('0');
}

async function addRequisito() {
    const idVacante = $('#detalleIdVacante').val();
    const requisito = $('#txtNuevoRequisito').val().trim();
    const orden = $('#txtOrdenRequisito').val() || 0;
    
    if (!requisito) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El requisito es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtNuevoRequisito').focus();
        return;
    }
    
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "addRequisitoVacante",
            IdVacante: idVacante,
            Requisito: requisito,
            Orden: orden
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            hideAddRequisitoForm();
            loadRequisitosDetalle(idVacante);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al agregar requisito:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">Error al agregar el requisito.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

async function deleteRequisito(idEncoded) {
    const result = await Swal.fire({
        title: '¿Eliminar requisito?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", {
                op: "deleteRequisitoVacante",
                IdVacanteRequisito: idEncoded
            });
            
            const data = JSON.parse(response);
            
            if (data.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                loadRequisitosDetalle($('#detalleIdVacante').val());
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al eliminar requisito:", error);
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al eliminar el requisito.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    }
}

// ==========================================
// EVALUACIONES
// ==========================================

async function loadEvaluacionesDetalle(idVacante) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "getEvaluacionesVacante",
            IdVacante: idVacante
        });
        
        const evaluaciones = JSON.parse(response);
        
        if (evaluaciones && evaluaciones.length > 0) {
            let html = '';
            evaluaciones.forEach(ev => {
                const idEncoded = btoa(ev.IdVacanteEvaluacion);
                html += `
                    <div class="evaluacion-item">
                        <span>
                            <strong>${ev.NombreEvaluacion}</strong>
                            <small class="text-muted ms-2">(${ev.NombreProceso})</small>
                        </span>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteEvaluacion('${idEncoded}')">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                `;
            });
            $('#listaEvaluaciones').html(html);
        } else {
            $('#listaEvaluaciones').html('<p class="text-muted text-center">No hay evaluaciones configuradas</p>');
        }
    } catch (error) {
        console.error("Error al cargar evaluaciones:", error);
    }
}

function showAddEvaluacionForm() {
    $('#formAddEvaluacion').slideDown(200, function() {
        // Reinicializar Select2 después de que el form sea visible
        $('#cmbNuevaEvaluacion').select2('destroy').select2({
            dropdownParent: $('#modalDetalleVacante .modal-content'),
            width: '100%',
            placeholder: 'Seleccione evaluación...',
            allowClear: true
        });
        $('#cmbProcesoEvaluacion').select2('destroy').select2({
            dropdownParent: $('#modalDetalleVacante .modal-content'),
            width: '100%',
            placeholder: 'Seleccione proceso...',
            allowClear: true
        });
    });
}

function hideAddEvaluacionForm() {
    $('#formAddEvaluacion').slideUp();
    $('#cmbNuevaEvaluacion').val('');
    $('#cmbProcesoEvaluacion').val('');
}

async function addEvaluacion() {
    const idVacante = $('#detalleIdVacante').val();
    const idEvaluacion = $('#cmbNuevaEvaluacion').val();
    const idProceso = $('#cmbProcesoEvaluacion').val();
    
    if (!idEvaluacion) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Seleccione una evaluación.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbNuevaEvaluacion').focus();
        return;
    }
    
    if (!idProceso) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Seleccione un proceso.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbProcesoEvaluacion').focus();
        return;
    }
    
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "addEvaluacionVacante",
            IdVacante: idVacante,
            IdEvaluacion: idEvaluacion,
            IdProceso: idProceso
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            hideAddEvaluacionForm();
            loadEvaluacionesDetalle(idVacante);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al agregar evaluación:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">Error al agregar la evaluación.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

async function deleteEvaluacion(idEncoded) {
    const result = await Swal.fire({
        title: '¿Eliminar evaluación?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", {
                op: "deleteEvaluacionVacante",
                IdVacanteEvaluacion: idEncoded
            });
            
            const data = JSON.parse(response);
            
            if (data.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                loadEvaluacionesDetalle($('#detalleIdVacante').val());
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al eliminar evaluación:", error);
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al eliminar la evaluación.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    }
}

// ==========================================
// INDUCCIONES
// ==========================================

async function loadInduccionesDetalle(idVacante) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "getInduccionesVacante",
            IdVacante: idVacante
        });
        
        const inducciones = JSON.parse(response);
        
        if (inducciones && inducciones.length > 0) {
            let html = '';
            inducciones.forEach(ind => {
                const idEncoded = btoa(ind.IdVacanteInduccion);
                html += `
                    <div class="induccion-item">
                        <span>${ind.NombreInduccion}</span>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteInduccion('${idEncoded}')">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                `;
            });
            $('#listaInducciones').html(html);
        } else {
            $('#listaInducciones').html('<p class="text-muted text-center">No hay inducciones configuradas</p>');
        }
    } catch (error) {
        console.error("Error al cargar inducciones:", error);
    }
}

function showAddInduccionForm() {
    $('#formAddInduccion').slideDown(200, function() {
        // Reinicializar Select2 después de que el form sea visible
        $('#cmbNuevaInduccion').select2('destroy').select2({
            dropdownParent: $('#modalDetalleVacante .modal-content'),
            width: '100%',
            placeholder: 'Seleccione inducción...',
            allowClear: true
        });
    });
}

function hideAddInduccionForm() {
    $('#formAddInduccion').slideUp();
    $('#cmbNuevaInduccion').val('');
}

async function addInduccion() {
    const idVacante = $('#detalleIdVacante').val();
    const idInduccion = $('#cmbNuevaInduccion').val();
    
    if (!idInduccion) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Seleccione una inducción.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbNuevaInduccion').focus();
        return;
    }
    
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "addInduccionVacante",
            IdVacante: idVacante,
            IdInduccion: idInduccion
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            hideAddInduccionForm();
            loadInduccionesDetalle(idVacante);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al agregar inducción:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">Error al agregar la inducción.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

async function deleteInduccion(idEncoded) {
    const result = await Swal.fire({
        title: '¿Eliminar inducción?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", {
                op: "deleteInduccionVacante",
                IdVacanteInduccion: idEncoded
            });
            
            const data = JSON.parse(response);
            
            if (data.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                loadInduccionesDetalle($('#detalleIdVacante').val());
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${data.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al eliminar inducción:", error);
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al eliminar la inducción.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    }
}
