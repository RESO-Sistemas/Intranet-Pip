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
    // Helper function para crear áreas técnicas desde el combo
    const createAreaTecnicaTag = function (params) {
        var term = $.trim(params.term);
        if (term === '') { return null; }
        return {
            id: 'NEW_' + term,
            text: term + ' (Crear nueva área)',
            newTag: true,
            cleanText: term
        }
    };

    const handleAreaTecnicaSelect = function (e, selectId) {
        if (e.params.data.newTag) {
            let text = e.params.data.cleanText;
            
            // Remove ghost option from Select2 so it doesn't get "stuck"
            $(selectId).find('[value="' + e.params.data.id + '"]').remove();
            
            // Crear una etiqueta temporal y almacenarla automáticamente (sin modal)
            let tempId = 'NEW_TEMP_' + new Date().getTime();
            let newOptionCmb = new Option(text, tempId, false, false);
            let newOptionEdit = new Option(text, tempId, false, false);
            
            $(newOptionCmb).attr('data-new', 'true').attr('data-desc', '');
            $(newOptionEdit).attr('data-new', 'true').attr('data-desc', '');

            if(selectId === '#cmbAreaTecnica') {
                newOptionCmb = new Option(text, tempId, true, true);
                $(newOptionCmb).attr('data-new', 'true').attr('data-desc', '');
            } else {
                newOptionEdit = new Option(text, tempId, true, true);
                $(newOptionEdit).attr('data-new', 'true').attr('data-desc', '');
            }

            $('#cmbAreaTecnica').append(newOptionCmb).trigger('change');
            $('#editAreaTecnica').append(newOptionEdit).trigger('change');
        }
    };

    // Select2 para modal Agregar
    $('#cmbAreaTecnica').select2({
        dropdownParent: $('#modalAddVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true,
        tags: true,
        createTag: createAreaTecnicaTag
    }).on('select2:select', function(e) { handleAreaTecnicaSelect(e, '#cmbAreaTecnica'); });
    
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
        allowClear: true,
        tags: true,
        createTag: createAreaTecnicaTag
    }).on('select2:select', function(e) { handleAreaTecnicaSelect(e, '#editAreaTecnica'); });
    
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
        order: [], // Respetar el orden del backend (descendente por ID)
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
                ? '<span class="badge bg-success published-badge text-dark">Sí</span>' 
                : '<span class="badge bg-secondary published-badge text-dark">No</span>';
            
            const idEncoded = btoa(vacante.IdVacante);
            
            const actions = `
                <div class="dropdown">
                    <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="material-symbols-outlined">more_vert</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" onclick="openDetalleModal('${idEncoded}'); return false;">
                            <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">visibility</span>Ver detalle
                        </a></li>
                        <li><a class="dropdown-item" href="PostulantesVacante.php?IdVacante=${idEncoded}">
                            <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">people</span>Ver postulantes
                        </a></li>
                        ${vacante.Publicada == 0 ? `
                        <li><a class="dropdown-item" href="#" onclick="openEditModal('${idEncoded}'); return false;">
                            <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">edit</span>Editar
                        </a></li>
                        ` : ''}
                        ${getStatusDropdownItems(vacante, idEncoded)}
                        ${vacante.Publicada == 0 && vacante.Estatus == 2 ? `
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-success" href="#" onclick="publicarVacante('${idEncoded}'); return false;">
                            <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">publish</span>Publicar
                        </a></li>
                        ` : ''}
                        ${vacante.Publicada == 0 ? `
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="deleteVacante('${idEncoded}'); return false;">
                            <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">delete</span>Eliminar
                        </a></li>
                        ` : ''}
                    </ul>
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
        case 1: return '<span class="badge bg-secondary status-badge text-dark">Borrador</span>';
        case 2: return '<span class="badge bg-success status-badge">Activa</span>';
        case 3: return '<span class="badge bg-danger status-badge">Cerrada</span>';
        default: return '<span class="badge bg-secondary status-badge">-</span>';
    }
}

function getStatusActions(vacante, idEncoded) {
    let actions = '';
    
    if (vacante.Publicada == 0) {
        if (vacante.Estatus == 1) {
            actions += `<button type="button" class="btn btn-success btn-sm" onclick="cambiarEstatus('${idEncoded}', 2)" title="Activar">
                <span class="material-symbols-outlined">play_arrow</span>
            </button>`;
        } else if (vacante.Estatus == 2) {
            actions += `<button type="button" class="btn btn-warning btn-sm" onclick="cambiarEstatus('${idEncoded}', 1)" title="Volver a borrador">
                <span class="material-symbols-outlined">edit_note</span>
            </button>`;
            actions += `<button type="button" class="btn btn-danger btn-sm" onclick="cambiarEstatus('${idEncoded}', 3)" title="Cerrar">
                <span class="material-symbols-outlined">stop</span>
            </button>`;
        } else if (vacante.Estatus == 3) {
            actions += `<button type="button" class="btn btn-success btn-sm" onclick="cambiarEstatus('${idEncoded}', 2)" title="Reactivar">
                <span class="material-symbols-outlined">replay</span>
            </button>`;
        }
    }
    
    return actions;
}

function getStatusDropdownItems(vacante, idEncoded) {
    let items = '';
    
    if (vacante.Publicada == 0) {
        if (vacante.Estatus == 1) {
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 2); return false;">
                <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">play_arrow</span>Activar
            </a></li>`;
        } else if (vacante.Estatus == 2) {
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 1); return false;">
                <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">edit_note</span>Volver a borrador
            </a></li>`;
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 3); return false;">
                <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">stop</span>Cerrar
            </a></li>`;
        } else if (vacante.Estatus == 3) {
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 2); return false;">
                <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">replay</span>Reactivar
            </a></li>`;
        }
    }
    
    return items;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    // Si la cadena es sólo YYYY-MM-DD, le agregamos T00:00:00 para evitar que JS lo tome como UTC y lo recorra un día atrás
    const dateParsed = dateString.length === 10 ? dateString + 'T00:00:00' : dateString;
    const date = new Date(dateParsed);
    return date.toLocaleDateString('es-MX');
}

// ==========================================
// AGREGAR VACANTE
// ==========================================

function prepareAddModal() {
    // Establecer fecha de hoy como predeterminada (usando zona horaria local)
    const today = new Date();
    // Ajustar para obtener formato YYYY-MM-DD local
    const tzOffset = today.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(today - tzOffset)).toISOString().slice(0, -1).split('T')[0];
    $('#txtFechaApertura').val(localISOTime);
}

async function addVacante() {
    const nombre = $('#txtNombreVacante').val().trim();
    const tipoContratacion = $('#cmbTipoContratacion').val();
    const fechaApertura = $('#txtFechaApertura').val();
    const areaTecnica = $('#cmbAreaTecnica').val();
    const puesto = $('#cmbPuesto').val();
    const sucursal = $('#cmbSucursal').val();
    const descripcionPuesto = ($('#txtDescripcionPuesto').val() || '').trim();
    const salarioMinimoRaw = $('#txtSalarioMinimo').val();
    const salarioMaximoRaw = $('#txtSalarioMaximo').val();
    const fechaCierre = $('#txtFechaCierre').val();
    
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

    if (!areaTecnica) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El área técnica es requerida.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbAreaTecnica').focus();
        return;
    }

    if (!puesto) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El puesto es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbPuesto').focus();
        return;
    }

    if (!sucursal) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">La sucursal es requerida.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#cmbSucursal').focus();
        return;
    }

    if (!salarioMinimoRaw) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El salario mínimo es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtSalarioMinimo').focus();
        return;
    }

    if (!salarioMaximoRaw) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El salario máximo es requerido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtSalarioMaximo').focus();
        return;
    }

    const salarioMinimo = parseFloat(salarioMinimoRaw);
    const salarioMaximo = parseFloat(salarioMaximoRaw);
    if (Number.isNaN(salarioMinimo) || Number.isNaN(salarioMaximo)) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Verifica los salarios (deben ser numéricos).</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        return;
    }

    if (salarioMinimo > salarioMaximo) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El salario mínimo no puede ser mayor al salario máximo.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtSalarioMinimo').focus();
        return;
    }

    if (!fechaCierre) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">La fecha de cierre es requerida.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtFechaCierre').focus();
        return;
    }

    if (fechaCierre && fechaApertura && new Date(fechaCierre) < new Date(fechaApertura)) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">La fecha de cierre no puede ser menor a la fecha de apertura.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtFechaCierre').focus();
        return;
    }

    if (!descripcionPuesto) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">La descripción del puesto es requerida.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $('#txtDescripcionPuesto').focus();
        return;
    }
    
    try {
        let areaTecnicaFinal = areaTecnica;
        
        // Verificar si es un área técnica nueva
        const selectedOption = $('#cmbAreaTecnica option:selected');
        if (selectedOption.attr('data-new') === 'true') {
            const tempNombre = selectedOption.text();
            const tempDesc = selectedOption.attr('data-desc');
            
            // Crear el área técnica primero
            try {
                const resAreaStr = await $.post("Backend/Vacantes/App.php", { op: "addAreaTecnica", NombreArea: tempNombre, Descripcion: tempDesc });
                const dataArea = JSON.parse(resAreaStr);
                
                if (dataArea.estatus || dataArea.id) {
                    areaTecnicaFinal = dataArea.id;
                } else {
                    Swal.fire('Error', dataArea.msg || 'No se pudo crear la nueva Área Técnica.', 'error');
                    return;
                }
            } catch (areaErr) {
                Swal.fire('Error', 'Hubo un problema al crear la nueva Área Técnica.', 'error');
                return;
            }
        }

        const response = await $.post("Backend/Vacantes/App.php", {
            op: "addVacante",
            NombreVacante: nombre,
            IdAreaTecnica: areaTecnicaFinal || null,
            IdPuesto: puesto || null,
            TipoContratacion: tipoContratacion,
            IdSucursal: sucursal || null,
            DescripcionPuesto: descripcionPuesto,
            SalarioMinimo: salarioMinimoRaw,
            SalarioMaximo: salarioMaximoRaw,
            FechaApertura: fechaApertura,
            FechaCierre: fechaCierre,
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
            
            let modalEl = document.getElementById('modalEditVacante');
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
        let areaTecnicaFinal = $('#editAreaTecnica').val();
        
        // Verificar si es un área técnica nueva
        const selectedOption = $('#editAreaTecnica option:selected');
        if (selectedOption.attr('data-new') === 'true') {
            const tempNombre = selectedOption.text();
            const tempDesc = selectedOption.attr('data-desc');
            
            // Crear el área técnica primero
            try {
                const resAreaStr = await $.post("Backend/Vacantes/App.php", { op: "addAreaTecnica", NombreArea: tempNombre, Descripcion: tempDesc });
                const dataArea = JSON.parse(resAreaStr);
                
                if (dataArea.estatus || dataArea.id) {
                    areaTecnicaFinal = dataArea.id;
                } else {
                    Swal.fire('Error', dataArea.msg || 'No se pudo crear la nueva Área Técnica.', 'error');
                    return;
                }
            } catch (areaErr) {
                Swal.fire('Error', 'Hubo un problema al crear la nueva Área Técnica.', 'error');
                return;
            }
        }

        const response = await $.post("Backend/Vacantes/App.php", {
            op: "updateVacante",
            IdVacante: idVacante,
            NombreVacante: nombre,
            IdAreaTecnica: areaTecnicaFinal || null,
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
            
            let modalEl = document.getElementById('modalDetalleVacante');
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

// ==========================================
// SECCIÓN: POSTULANTES
// ==========================================

let tablePostulantes;
let postulantesData = [];
let postulantesProcesosList = [];

// Abrir modal de postulantes
async function showPostulantes(idEncoded) {
    const idVacanteDec = atob(idEncoded);
    $('#postulantesIdVacante').val(idEncoded);
    
    // Obtener nombre de la vacante
    const vacante = vacantesData.find(v => v.IdVacante == idVacanteDec);
    if (vacante) {
        $('#nombreVacantePostulantes').text(vacante.NombrePuesto || 'Vacante');
    }
    
    // Cargar lista de procesos para historial
    await loadProcesosParaHistorial();
    
    // Inicializar DataTable si no existe
    if (!tablePostulantes) {
        initPostulantesTable();
    }
    
    // Cargar datos
    await loadPostulantes(idEncoded);
    
    const modal = new bootstrap.Modal(document.getElementById('modalPostulantes'));
    modal.show();
}

// Inicializar tabla de postulantes
function initPostulantesTable() {
    tablePostulantes = $('#tablePostulantes').DataTable({
        data: [],
        columns: [
            { data: 'NombreCompleto' },
            { data: 'CorreoElectronico' },
            { data: 'Telefono' },
            { data: 'FechaPostulacion' },
            { data: 'UltimoProceso' },
            { 
                data: 'EstatusPostulacion',
                render: function(data, type, row) {
                    return getPostulanteStatusBadge(data);
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    const idEncoded = btoa(row.IdPostulanteVacante);
                    return `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-info btn-sm" onclick="showDetallePostulante('${idEncoded}')" title="Ver detalle">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        </div>
                    `;
                }
            }
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        },
        responsive: true,
        order: [[3, 'desc']]
    });
}

// Obtener badge de estatus de postulante
function getPostulanteStatusBadge(estatus) {
    switch(parseInt(estatus)) {
        case 1:
            return '<span class="postulante-status en-proceso">En Proceso</span>';
        case 2:
            return '<span class="postulante-status aceptado">Aceptado</span>';
        case 3:
            return '<span class="postulante-status rechazado">Rechazado</span>';
        case 4:
            return '<span class="postulante-status finalizado">Finalizado</span>';
        default:
            return '<span class="postulante-status">Desconocido</span>';
    }
}

// Cargar postulantes de una vacante
async function loadPostulantes(idVacante) {
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "getPostulantesByVacante",
            IdVacante: idVacante
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente && result.Data) {
            postulantesData = result.Data;
            tablePostulantes.clear().rows.add(postulantesData).draw();
            
            // Actualizar estadísticas
            updatePostulantesStats(postulantesData);
        } else {
            postulantesData = [];
            tablePostulantes.clear().draw();
            updatePostulantesStats([]);
        }
    } catch (error) {
        console.error("Error al cargar postulantes:", error);
    }
}

// Actualizar estadísticas de postulantes
function updatePostulantesStats(data) {
    const total = data.length;
    const enProceso = data.filter(p => parseInt(p.EstatusPostulacion) === 1).length;
    const aceptados = data.filter(p => parseInt(p.EstatusPostulacion) === 2).length;
    const rechazados = data.filter(p => parseInt(p.EstatusPostulacion) === 3).length;
    
    $('#statTotal').text(total);
    $('#statProceso').text(enProceso);
    $('#statAceptados').text(aceptados);
    $('#statRechazados').text(rechazados);
}

// Cargar procesos para el select de historial
async function loadProcesosParaHistorial() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", {
            op: "getProcesosVacantesActivos"
        });
        
        const result = JSON.parse(response);
        
        if (result && Array.isArray(result)) {
            postulantesProcesosList = result;
            
            let options = '<option value="">Seleccione proceso...</option>';
            result.forEach(p => {
                options += `<option value="${p.IdProceso}">${p.NombreProceso}</option>`;
            });
            $('#cmbNuevoProceso').html(options);
        }
    } catch (error) {
        console.error("Error al cargar procesos:", error);
    }
}

// Mostrar modal para agregar postulante
function showAddPostulanteModal() {
    const idVacante = $('#postulantesIdVacante').val();
    $('#addPostulanteIdVacante').val(idVacante);
    clearPostulanteForm();
    
    const modal = new bootstrap.Modal(document.getElementById('modalAddPostulante'));
    modal.show();
}

// Limpiar formulario de postulante
function clearPostulanteForm() {
    $('#txtBuscarPostulante').val('');
    $('#resultadosBusqueda').hide().html('');
    $('#txtPostulanteNombre').val('');
    $('#txtPostulanteApPaterno').val('');
    $('#txtPostulanteApMaterno').val('');
    $('#txtPostulanteCorreo').val('');
    $('#txtPostulanteTelefono').val('');
    $('#txtPostulanteCURP').val('');
    $('#txtPostulanteDireccion').val('');
    $('#txtPostulanteEstado').val('');
    $('#txtPostulanteCiudad').val('');
    $('#txtPostulanteObservaciones').val('');
}

// Buscar postulante existente
async function buscarPostulanteExistente() {
    const termino = $('#txtBuscarPostulante').val().trim();
    
    if (termino.length < 3) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Ingrese al menos 3 caracteres para buscar.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 3000);
        return;
    }
    
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "searchPostulante",
            Termino: termino
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="list-group">';
            result.Data.forEach(p => {
                html += `
                    <a href="#" class="list-group-item list-group-item-action" onclick="seleccionarPostulanteExistente(${p.IdPostulante}, '${p.NombreCompleto}', '${p.CorreoElectronico || ''}')">
                        <strong>${p.NombreCompleto}</strong><br>
                        <small class="text-muted">${p.CorreoElectronico || 'Sin correo'} | CURP: ${p.CURP || 'N/A'}</small>
                    </a>
                `;
            });
            html += '</div>';
            $('#resultadosBusqueda').html(html).show();
        } else {
            $('#resultadosBusqueda').html('<p class="text-muted small">No se encontraron resultados</p>').show();
        }
    } catch (error) {
        console.error("Error al buscar postulante:", error);
    }
}

// Seleccionar postulante existente y agregarlo a la vacante
async function seleccionarPostulanteExistente(idPostulante, nombre, correo) {
    const idVacante = $('#addPostulanteIdVacante').val();
    const observaciones = $('#txtPostulanteObservaciones').val();
    
    const confirmResult = await Swal.fire({
        title: '¿Agregar postulante?',
        html: `¿Desea agregar a <strong>${nombre}</strong> como postulante de esta vacante?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar'
    });
    
    if (confirmResult.isConfirmed) {
        try {
            const response = await $.post("Backend/Postulantes/App.php", {
                op: "addPostulacion",
                IdVacante: idVacante,
                IdPostulante: btoa(idPostulante),
                Observaciones: observaciones
            });
            
            const result = JSON.parse(response);
            
            if (result.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                
                bootstrap.Modal.getInstance(document.getElementById('modalAddPostulante')).hide();
                loadPostulantes(idVacante);
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al agregar postulación:", error);
        }
    }
}

// Agregar nuevo postulante a la vacante
async function addPostulanteVacante() {
    const idVacante = $('#addPostulanteIdVacante').val();
    const nombre = $('#txtPostulanteNombre').val().trim();
    const apPaterno = $('#txtPostulanteApPaterno').val().trim();
    const apMaterno = $('#txtPostulanteApMaterno').val().trim();
    const correo = $('#txtPostulanteCorreo').val().trim();
    const telefono = $('#txtPostulanteTelefono').val().trim();
    const curp = $('#txtPostulanteCURP').val().trim().toUpperCase();
    const direccion = $('#txtPostulanteDireccion').val().trim();
    const estado = $('#txtPostulanteEstado').val().trim();
    const ciudad = $('#txtPostulanteCiudad').val().trim();
    const observaciones = $('#txtPostulanteObservaciones').val().trim();
    
    // Validaciones
    if (!nombre) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Ingrese el nombre del postulante.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 3000);
        $('#txtPostulanteNombre').focus();
        return;
    }
    
    if (!apPaterno) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Ingrese el apellido paterno.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 3000);
        $('#txtPostulanteApPaterno').focus();
        return;
    }
    
    if (!correo) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Ingrese el correo electrónico.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 3000);
        $('#txtPostulanteCorreo').focus();
        return;
    }
    
    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">El correo electrónico no tiene un formato válido.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 3000);
        $('#txtPostulanteCorreo').focus();
        return;
    }
    
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "addPostulanteConPostulacion",
            IdVacante: idVacante,
            Nombre: nombre,
            ApellidoPaterno: apPaterno,
            ApellidoMaterno: apMaterno,
            CorreoElectronico: correo,
            Telefono: telefono,
            CURP: curp,
            Direccion: direccion,
            Estado: estado,
            Ciudad: ciudad,
            Observaciones: observaciones
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            bootstrap.Modal.getInstance(document.getElementById('modalAddPostulante')).hide();
            loadPostulantes(idVacante);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al agregar postulante:", error);
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Alerta!</span>
                <span class="alert-text">Error al agregar el postulante.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
}

// Mostrar detalle de postulante
async function showDetallePostulante(idEncoded) {
    $('#detalleIdPostulanteVacante').val(idEncoded);
    
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "getPostulanteDetalle",
            IdPostulanteVacante: idEncoded
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente && result.Data) {
            const p = result.Data;
            
            // Llenar información personal
            $('#detallePostulanteNombre').text(`${p.Nombre} ${p.ApellidoPaterno} ${p.ApellidoMaterno || ''}`);
            $('#detallePostulanteCURP').text(p.CURP || 'N/A');
            $('#detallePostulanteCorreo').text(p.CorreoElectronico || 'N/A');
            $('#detallePostulanteTelefono').text(p.Telefono || 'N/A');
            $('#detallePostulanteDireccion').text(p.Direccion || 'N/A');
            $('#detallePostulanteEstado').text(p.Estado || 'N/A');
            $('#detallePostulanteCiudad').text(p.Ciudad || 'N/A');
            $('#detallePostulanteFecha').text(p.FechaPostulacion || 'N/A');
            
            // Establecer estatus actual
            $('#cmbEstatusPostulante').val(p.EstatusPostulacion);
            $('#txtObservacionesEstatus').val('');
            
            // Cargar historial y requisitos
            await loadHistorialPostulante(idEncoded);
            await loadRequisitosPostulante(idEncoded);
            
            const modal = new bootstrap.Modal(document.getElementById('modalDetallePostulante'));
            modal.show();
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Error!</span>
                    <span class="alert-text">No se pudo cargar la información del postulante.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al cargar detalle de postulante:", error);
    }
}

// Actualizar estatus de postulante
async function actualizarEstatusPostulante() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const estatus = $('#cmbEstatusPostulante').val();
    const observaciones = $('#txtObservacionesEstatus').val().trim();
    
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "updateEstatusPostulacion",
            IdPostulanteVacante: idPostulanteVacante,
            EstatusPostulacion: estatus,
            Observaciones: observaciones
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            $('#txtObservacionesEstatus').val('');
            
            // Recargar historial
            await loadHistorialPostulante(idPostulanteVacante);
            
            // Recargar tabla principal
            const idVacante = $('#postulantesIdVacante').val();
            if (idVacante) {
                loadPostulantes(idVacante);
            }
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al actualizar estatus:", error);
    }
}

// Cargar historial de procesos del postulante
async function loadHistorialPostulante(idPostulanteVacante) {
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "getPostulanteHistorial",
            IdPostulanteVacante: idPostulanteVacante
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="timeline">';
            result.Data.forEach(h => {
                const isOk = h.Resultado == 1;
                const isNo = h.Resultado == 0;
                const markerColor = isOk ? '#28a745' : (isNo ? '#dc3545' : '#6c757d');
                const icon = isOk
                    ? '<span class="material-symbols-outlined text-success timeline-icon">check_circle</span>'
                    : (isNo ? '<span class="material-symbols-outlined text-danger timeline-icon">cancel</span>' : '');

                html += `
                    <div class="timeline-item">
                        <span class="timeline-marker" style="background:${markerColor}"></span>
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="me-3">
                                <p class="timeline-title">${h.NombreProceso || 'Proceso'} ${icon}</p>
                                <p class="timeline-sub text-muted">${h.Observaciones || 'ninguna'}</p>
                                ${h.NombreUsuario ? `<small class="text-primary"><span class="material-icons-outlined" style="font-size: 14px; vertical-align: middle;">person</span> ${h.NombreUsuario}</small>` : ''}
                            </div>
                            <span class="timeline-time">${h.Fecha || ''}</span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            $('#listaHistorial').html(html);
        } else {
            $('#listaHistorial').html('<p class="text-muted text-center">No hay historial registrado</p>');
        }
    } catch (error) {
        console.error("Error al cargar historial:", error);
    }
}

// Mostrar formulario para agregar historial
function showAddHistorialForm() {
    $('#cmbNuevoProceso').val('');
    $('#cmbResultadoProceso').val('');
    $('#txtObservacionesProceso').val('');
    $('#formAddHistorial').slideDown();
}

// Ocultar formulario de historial
function hideAddHistorialForm() {
    $('#formAddHistorial').slideUp();
}

// Agregar registro al historial
async function addHistorialProceso() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const idProceso = $('#cmbNuevoProceso').val();
    const resultado = $('#cmbResultadoProceso').val();
    const observaciones = $('#txtObservacionesProceso').val().trim();
    
    if (!idProceso) {
        const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">Seleccione un proceso.</span>
            </div>`;
        showBootstrapAlert(messageContent, "top-right", 3000);
        return;
    }
    
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "addPostulanteHistorial",
            IdPostulanteVacante: idPostulanteVacante,
            IdProceso: idProceso,
            Resultado: resultado,
            Observaciones: observaciones
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            hideAddHistorialForm();
            loadHistorialPostulante(idPostulanteVacante);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al agregar historial:", error);
    }
}

// Cargar requisitos del postulante
async function loadRequisitosPostulante(idPostulanteVacante) {
    try {
        const response = await $.post("Backend/Postulantes/App.php", {
            op: "getPostulanteRequisitos",
            IdPostulanteVacante: idPostulanteVacante
        });
        
        const result = JSON.parse(response);
        
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="table-responsive"><table class="table table-sm table-bordered">';
            html += '<thead><tr><th>Requisito</th><th>Respuesta</th><th>Cumple</th><th>Acciones</th></tr></thead><tbody>';
            
            result.Data.forEach(r => {
                const cumpleIcon = r.Cumple == 1 ? 
                    '<span class="badge bg-success">Sí</span>' : 
                    (r.Cumple == 0 ? '<span class="badge bg-danger">No</span>' : '<span class="badge bg-secondary">Pendiente</span>');
                
                // Usar ID numérico directo para elementos HTML (sin base64)
                const idReqVacante = r.IdVacanteRequisito;
                const idReqPostulante = r.IdPostulanteRequisito || 0;
                
                html += `
                    <tr>
                        <td>${r.Requisito || 'Requisito'}</td>
                        <td><input type="text" class="form-control form-control-sm" id="respRequisito_${idReqVacante}" value="${r.Respuesta || ''}" placeholder="Respuesta..."></td>
                        <td>
                            <select class="form-select form-select-sm" id="cumpleRequisito_${idReqVacante}">
                                <option value="" ${!r.Cumple && r.Cumple !== 0 ? 'selected' : ''}>Pendiente</option>
                                <option value="1" ${r.Cumple == 1 ? 'selected' : ''}>Sí</option>
                                <option value="0" ${r.Cumple == 0 ? 'selected' : ''}>No</option>
                            </select>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="updateRequisitoPostulante(${idReqPostulante}, ${idReqVacante})">
                                <span class="material-symbols-outlined">save</span>
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            html += '</tbody></table></div>';
            $('#listaRequisitosPostulante').html(html);
        } else {
            $('#listaRequisitosPostulante').html('<p class="text-muted text-center">No hay requisitos configurados para esta vacante</p>');
        }
    } catch (error) {
        console.error("Error al cargar requisitos:", error);
    }
}

// Actualizar requisito del postulante
async function updateRequisitoPostulante(idPostulanteRequisito, idVacanteRequisito) {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const respuesta = $(`#respRequisito_${idVacanteRequisito}`).val();
    const cumple = $(`#cumpleRequisito_${idVacanteRequisito}`).val();
    
    try {
        let response;
        
        if (idPostulanteRequisito > 0) {
            // Actualizar existente
            response = await $.post("Backend/Postulantes/App.php", {
                op: "updatePostulanteRequisito",
                IdPostulanteRequisito: btoa(idPostulanteRequisito),
                Respuesta: respuesta,
                Cumple: cumple
            });
        } else {
            // Crear nuevo
            response = await $.post("Backend/Postulantes/App.php", {
                op: "addPostulanteRequisito",
                IdPostulanteVacante: idPostulanteVacante,
                IdVacanteRequisito: btoa(idVacanteRequisito),
                Respuesta: respuesta,
                Cumple: cumple
            });
        }
        
        const result = JSON.parse(response);
        
        if (result.Siguiente) {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Completado!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 3000);
            loadRequisitosPostulante(idPostulanteVacante);
        } else {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">${result.Msg}</span>
                </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
    } catch (error) {
        console.error("Error al actualizar requisito:", error);
    }
}

// Eliminar postulación
async function eliminarPostulacion() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    
    const confirmResult = await Swal.fire({
        title: '¿Eliminar postulación?',
        text: 'Se eliminará esta postulación de la vacante. Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (confirmResult.isConfirmed) {
        try {
            const response = await $.post("Backend/Postulantes/App.php", {
                op: "deletePostulacion",
                IdPostulanteVacante: idPostulanteVacante
            });
            
            const result = JSON.parse(response);
            
            if (result.Siguiente) {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, "top-right", 5000);
                
                bootstrap.Modal.getInstance(document.getElementById('modalDetallePostulante')).hide();
                
                const idVacante = $('#postulantesIdVacante').val();
                if (idVacante) {
                    loadPostulantes(idVacante);
                }
            } else {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, "top-right", 5000);
            }
        } catch (error) {
            console.error("Error al eliminar postulación:", error);
        }
    }
}
