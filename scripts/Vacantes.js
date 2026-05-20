// ==========================================
// VACANTES.JS - Gestión de Vacantes y Postulantes Unificado
// ==========================================

let vacantesData = [];
let vacanteSeleccionadaId = null;

// Postulantes
let postulantesData = [];
let postulantesProcesosList = [];
let postulantesFilterByEstatus = 'todos';

// Charts
const yellowPalette = ['#ffc407', '#484747ff', '#ffd551', '#696969ff', '#ffe79b', '#fff9e6'];
let rawResultadosPostulante = [];
let chartPostulanteGeneral = null;
let rawComparativoVacante = [];
let chartComparativoVacanteColumn = null;
let chartComparativoVacanteRadar = null;
window.currentIdPostulanteEncodedResultados = null;

// ==========================================
// LOADING (blockUI sobre pestañas)
// ==========================================

function showTabLoading() {
    const $target = $('#vacanteTabsContent');
    if ($target.length && typeof $target.block === 'function') {
        $target.block({
            message: '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: 'transparent',
                color: '#000'
            },
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait'
            }
        });
    }
}

function hideTabLoading() {
    const $target = $('#vacanteTabsContent');
    if ($target.length && typeof $target.unblock === 'function') {
        $target.unblock();
    }
}

function getBootstrapModalInstance(modalEl, options = {}) {
    if (!modalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return null;

    if (typeof bootstrap.Modal.getOrCreateInstance === 'function') {
        return bootstrap.Modal.getOrCreateInstance(modalEl, options);
    }

    let instance = typeof bootstrap.Modal.getInstance === 'function'
        ? bootstrap.Modal.getInstance(modalEl)
        : null;

    if (!instance) {
        instance = new bootstrap.Modal(modalEl, options);
    }

    return instance;
}

function showBootstrapTab(tabEl) {
    if (!tabEl) return;

    if (typeof bootstrap !== 'undefined' && bootstrap.Tab) {
        if (typeof bootstrap.Tab.getOrCreateInstance === 'function') {
            bootstrap.Tab.getOrCreateInstance(tabEl).show();
            return;
        }

        let instance = typeof bootstrap.Tab.getInstance === 'function'
            ? bootstrap.Tab.getInstance(tabEl)
            : null;

        if (!instance) {
            instance = new bootstrap.Tab(tabEl);
        }

        instance.show();
        return;
    }

    if (typeof $ === 'function') {
        $(tabEl).tab('show');
    }
}

function ensureStaticModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;

    modalEl.setAttribute('data-bs-backdrop', 'static');
    modalEl.setAttribute('data-bs-keyboard', 'false');
    getBootstrapModalInstance(modalEl, { backdrop: 'static', keyboard: false });
}

function syncDetallePostulanteEditButtonVisibility() {
    const $button = $('#btnToggleEditMode');
    if (!$button.length) return;

    const activeTabId = $('#detallePostulanteTabs .nav-link.active').attr('id');
    const isInfoTab = activeTabId === 'tab-dp-info-btn';

    if (!isInfoTab && window.PostulanteEditor && typeof window.PostulanteEditor.isModoEdicion === 'function' && window.PostulanteEditor.isModoEdicion()) {
        window.PostulanteEditor.toggleEditMode();
    }

    $button.toggleClass('d-none', !isInfoTab);
    if (!isInfoTab) {
        $('#editModeButtons').addClass('d-none');
    }
}

function resetDetallePostulanteState(showListView = false) {
    if (window.PostulanteEditor && typeof window.PostulanteEditor.isModoEdicion === 'function' && window.PostulanteEditor.isModoEdicion()) {
        window.PostulanteEditor.toggleEditMode();
    }

    $('#detalleIdPostulanteVacante').val('');
    $('#detalleIdPostulante').val('');
    $('#detalleIdPostulanteVacanteNum').val('');
    $('#detallePostulanteNombreHidden').val('');
    $('#detallePostulanteNombreHeader').text('Postulante');
    $('#detallePostulantePuesto').text('Vacante');
    $('#breadcrumbPostulanteNombre').text('Detalle');
    $('#detallePostulanteStatus').attr('class', 'status-pill en-proceso mt-1').text('En Proceso');
    $('#detallePostulanteFecha').val('-');
    $('#edit_Nombre, #edit_ApellidoPaterno, #edit_ApellidoMaterno, #edit_CURP, #edit_CorreoElectronico, #edit_CodigoPostal, #edit_Calle, #edit_NumeroExterior, #edit_NumeroInterior, #edit_Estado, #edit_Ciudad').val('');
    $('#edit_Colonia').html('<option value="">Seleccionar...</option>').val('');
    $('#edit_Direccion').val('');
    $('#direccionPreview').text('-');
    $('#cpStatus').text('');
    $('#cmbEstatusPostulante').val('1');
    $('#txtObservacionesEstatus').val('');
    $('#listaHistorial').html('<p class="text-muted text-center">No hay historial registrado</p>');
    $('#listaRequisitosPostulante').html('<p class="text-muted text-center">No hay requisitos configurados</p>');
    $('#tablaTelefonos').html('<p class="text-muted text-center">Cargando teléfonos...</p>');
    $('#btnToggleEditMode').removeClass('d-none btn-outline-secondary').addClass('btn-outline-primary').html('<span class="material-symbols-outlined align-middle me-1">edit</span>Editar');
    $('#editModeButtons').addClass('d-none');

    const firstTab = document.getElementById('tab-dp-info-btn');
    showBootstrapTab(firstTab);

    syncDetallePostulanteEditButtonVisibility();

    if (showListView) {
        mostrarListaPostulantes();
    }
}

function updateComparativoTabState(vacante = null) {
    const hasVacante = !!vacante;
    $('#comparativoVacanteNombre').text(hasVacante ? (vacante.NombreVacante || 'Vacante') : 'Sin vacante seleccionada');

    if (!hasVacante) {
        resetComparativoInlineState();
    }
}

function destroyComparativoCharts() {
    if (chartComparativoVacanteColumn) {
        chartComparativoVacanteColumn.destroy();
        chartComparativoVacanteColumn = null;
    }

    if (chartComparativoVacanteRadar) {
        chartComparativoVacanteRadar.destroy();
        chartComparativoVacanteRadar = null;
    }
}

function renderComparativoEmptyState(title, description, icon = 'monitoring') {
    $('#comparativoEmptyState').removeClass('d-none').html(`
        <span class="material-symbols-outlined">${icon}</span>
        <p class="mb-2">${title}</p>
        <p class="small text-muted mb-0">${description}</p>
    `);
}

function resetComparativoInlineState() {
    rawComparativoVacante = [];
    destroyComparativoCharts();

    const $selEvaluaciones = $('#selComparativoEvaluaciones');
    const $selCandidatos = $('#selCandidatosComparar');

    if ($selCandidatos.hasClass('select2-hidden-accessible')) {
        $selCandidatos.select2('destroy');
    }

    $selEvaluaciones.html('');
    $selCandidatos.empty();
    $('#contenedorTablasComparativo').html('');
    $('#comparativoPodiumSection').addClass('d-none');
    $('#comparativoPodiumCards').html('');
    $('#comparativoContent').addClass('d-none');
    $('#comparativoLoadingState').addClass('d-none');
    renderComparativoEmptyState(
        'Selecciona una vacante con evaluaciones finalizadas para consultar su comparativo.',
        'Aquí podrás comparar postulantes por evaluación, score general y competencias sin salir de la ficha de la vacante.'
    );
    switchComparativoChart('column');
}

function renderComparativoPodium(candidatosUnicosInfo) {
    if (!candidatosUnicosInfo || candidatosUnicosInfo.length === 0) {
        $('#comparativoPodiumSection').addClass('d-none');
        return;
    }
    const medals = [
        { cls: 'gold',   symbol: '🥇' },
        { cls: 'silver', symbol: '🥈' },
        { cls: 'bronze', symbol: '🥉' }
    ];
    const top3 = candidatosUnicosInfo.slice(0, 3);
    let cols = '';
    top3.forEach((c, i) => {
        const medal = medals[i];
        const score = parseFloat(c.Calificacion) || 0;
        const pct = Math.round(score) + '%';
        const badgeCls = score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low';
        const badgeLabel = score >= 80 ? 'Excelente' : score >= 60 ? 'Regular' : 'Bajo';
        const safeName = c.Nombre.replace(/'/g, "\\'");
        cols += `
        <div class="col-md-4 col-sm-12">
            <div class="podium-card ${medal.cls}" onclick="togglePodiumCandidate('${safeName}')">
                <div class="podium-medal">${medal.symbol}</div>
                <div class="podium-card-name">${c.Nombre}</div>
                <div class="score-ring-wrap">
                    <div class="score-ring" style="--pct:${pct}">
                        <span class="score-ring-val">${score.toFixed(1)}</span>
                    </div>
                </div>
                <span class="podium-rank-badge score-badge-overall ${badgeCls}">${badgeLabel}</span>
            </div>
        </div>`;
    });
    $('#comparativoPodiumCards').html(cols);
    $('#comparativoPodiumSection').removeClass('d-none');
    updatePodiumActiveState();
}

function togglePodiumCandidate(nombre) {
    const $sel = $('#selCandidatosComparar');
    let current = $sel.val() || [];
    if (current.includes(nombre)) {
        current = current.filter(n => n !== nombre);
    } else {
        current.push(nombre);
    }
    $sel.val(current).trigger('change');
}

function updatePodiumActiveState() {
    const current = $('#selCandidatosComparar').val() || [];
    $('#comparativoPodiumCards .podium-card').each(function () {
        const name = $(this).find('.podium-card-name').text().trim();
        $(this).toggleClass('active-podium', current.includes(name));
    });
}

async function loadComparativoResultadosTab() {
    const idVacante = $('#postulantesIdVacante').val();
    if (!idVacante) {
        resetComparativoInlineState();
        return;
    }

    $('#comparativoEmptyState').addClass('d-none');
    $('#comparativoContent').addClass('d-none');
    $('#comparativoLoadingState').removeClass('d-none');

    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getComparativoResultadosVacante', IdVacante: idVacante });
        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            rawComparativoVacante = result.Data;
            const evaluaciones = [...new Set(rawComparativoVacante.map(item => item.NombreEvaluacion))];
            let options = '';
            evaluaciones.forEach(ev => { options += `<option value="${ev}">${ev}</option>`; });
            $('#selComparativoEvaluaciones').html(options);
            $('#comparativoLoadingState').addClass('d-none');
            $('#comparativoContent').removeClass('d-none');
            switchComparativoChart('column');
            loadComparativoCandidatos();
        } else {
            $('#comparativoLoadingState').addClass('d-none');
            $('#comparativoContent').addClass('d-none');
            renderComparativoEmptyState(
                'Aún no hay evaluaciones finalizadas por los postulantes de esta vacante.',
                'Cuando existan resultados comparables por evaluación, se mostrarán aquí automáticamente.'
            );
            destroyComparativoCharts();
            $('#contenedorTablasComparativo').html('');
        }
    } catch (err) {
        console.error('Error en gráficas comparativas', err);
        $('#comparativoLoadingState').addClass('d-none');
        $('#comparativoContent').addClass('d-none');
        renderComparativoEmptyState(
            'No se pudo cargar el comparativo de esta vacante.',
            'Intenta cambiar de pestaña o volver a seleccionar la vacante.',
            'error'
        );
        destroyComparativoCharts();
        $('#contenedorTablasComparativo').html('');
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

$(document).ready(function() {
    initSelect2();
    loadVacantes();
    loadCombos();
    setupEventListeners();
    initPostulantesTable();
    updateComparativoTabState(null);
    initDeepLinking();
});

// ==========================================
// DEEP LINKING
// ==========================================

function initDeepLinking() {
    const params = new URLSearchParams(window.location.search);
    const idVacante = params.get('vacante');
    const tab = params.get('tab');
    if (idVacante) {
        setTimeout(() => {
            seleccionarVacante(idVacante);
            const tabButtons = {
                postulantes: 'tab-postulantes-btn',
                comparativo: 'tab-comparativo-btn',
                info: 'tab-info-btn'
            };
            const tabBtn = document.getElementById(tabButtons[tab] || 'tab-info-btn');
            showBootstrapTab(tabBtn);
        }, 500);
    }
}

function updateUrlTab(tabName) {
    if (!vacanteSeleccionadaId) return;
    const url = new URL(window.location);
    url.searchParams.set('vacante', vacanteSeleccionadaId);
    if (tabName) url.searchParams.set('tab', tabName);
    window.history.replaceState({}, '', url);
}

// ==========================================
// SELECT2
// ==========================================

function initSelect2() {
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
            $(selectId).find('[value="' + e.params.data.id + '"]').remove();
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

    $('#cmbAreaTecnica').select2({
        dropdownParent: $('#modalAddVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true,
        tags: true,
        createTag: createAreaTecnicaTag
    }).on('select2:select', function(e) { handleAreaTecnicaSelect(e, '#cmbAreaTecnica'); });

    $('#cmbPuesto').select2({ dropdownParent: $('#modalAddVacante'), width: '100%', placeholder: 'Seleccione...', allowClear: true });
    $('#cmbSucursal').select2({ dropdownParent: $('#modalAddVacante'), width: '100%', placeholder: 'Seleccione...', allowClear: true });
    $('#cmbTipoContratacion').select2({ dropdownParent: $('#modalAddVacante'), width: '100%', placeholder: 'Seleccione...', allowClear: true });

    $('#editAreaTecnica').select2({
        dropdownParent: $('#modalEditVacante'),
        width: '100%',
        placeholder: 'Seleccione...',
        allowClear: true,
        tags: true,
        createTag: createAreaTecnicaTag
    }).on('select2:select', function(e) { handleAreaTecnicaSelect(e, '#editAreaTecnica'); });

    $('#editPuesto').select2({ dropdownParent: $('#modalEditVacante'), width: '100%', placeholder: 'Seleccione...', allowClear: true });
    $('#editSucursal').select2({ dropdownParent: $('#modalEditVacante'), width: '100%', placeholder: 'Seleccione...', allowClear: true });
    $('#editTipoContratacion').select2({ dropdownParent: $('#modalEditVacante'), width: '100%', placeholder: 'Seleccione...', allowClear: true });

    $('#cmbNuevaEvaluacion').select2({
        dropdownParent: $('#tabInfoRequisitos'),
        width: '100%',
        placeholder: 'Seleccione evaluación...',
        allowClear: true
    });

    $('#cmbProcesoEvaluacion').select2({
        dropdownParent: $('#tabInfoRequisitos'),
        width: '100%',
        placeholder: 'Seleccione proceso...',
        allowClear: true
    });

    $('#cmbNuevaInduccion').select2({
        dropdownParent: $('#tabInfoRequisitos'),
        width: '100%',
        placeholder: 'Seleccione inducción...',
        allowClear: true
    });
}

function initPostulantesTable() {
    // Ya no se usa DataTable. Los postulantes se renderizan como cards verticales.
    // Esta función se mantiene para compatibilidad con la llamada en $(document).ready.
}

function setupEventListeners() {
    ensureStaticModal('modalAddVacante');
    ensureStaticModal('modalEditVacante');

    $('#btnAddVacante').on('click', addVacante);
    $('#btnSaveEdit').on('click', updateVacante);
    $('#modalAddVacante').on('hidden.bs.modal', function() { clearAddForm(); });
    $(document).on('shown.bs.tab', '#detallePostulanteTabs .nav-link', syncDetallePostulanteEditButtonVisibility);
    $('#tab-comparativo-btn').on('shown.bs.tab', function () {
        loadComparativoResultadosTab();
    });

    // Spinner al cambiar a la pestaña Postulantes si aún no hay datos cargados
    $('#tab-postulantes-btn').on('shown.bs.tab', function () {
        const idVacante = $('#postulantesIdVacante').val();
        if (idVacante && postulantesData.length === 0) {
            showTabLoading();
            loadPostulantes(idVacante).then(() => {
                hideTabLoading();
            }).catch(() => {
                hideTabLoading();
            });
        }
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
            data.forEach(item => { options += `<option value="${item.IdAreaTecnica}">${item.NombreArea}</option>`; });
        }
        $('#cmbAreaTecnica').html(options).trigger('change');
        $('#editAreaTecnica').html(options).trigger('change');
    } catch (error) { console.error("Error al cargar áreas técnicas:", error); }
}

async function loadPuestos() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getPuestosActivos" });
        const data = JSON.parse(response);
        let options = '<option value="">Seleccione...</option>';
        if (data && data.length > 0) {
            data.forEach(item => { options += `<option value="${item.IdPuesto}">${item.Puesto}</option>`; });
        }
        $('#cmbPuesto').html(options).trigger('change');
        $('#editPuesto').html(options).trigger('change');
    } catch (error) { console.error("Error al cargar puestos:", error); }
}

async function loadSucursales() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getSucursalesActivas" });
        const data = JSON.parse(response);
        let options = '<option value="">Seleccione...</option>';
        if (data && data.length > 0) {
            data.forEach(item => { options += `<option value="${item.IdSucursal}">${item.Sucursal}</option>`; });
        }
        $('#cmbSucursal').html(options).trigger('change');
        $('#editSucursal').html(options).trigger('change');
    } catch (error) { console.error("Error al cargar sucursales:", error); }
}

async function loadProcesosVacantes() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getProcesosVacantesActivos" });
        const data = JSON.parse(response);
        let options = '<option value="">Seleccione proceso...</option>';
        data.forEach(item => { options += `<option value="${item.IdProceso}">${item.NombreProceso}</option>`; });
        $('#cmbProcesoEvaluacion').html(options).trigger('change');
    } catch (error) { console.error("Error al cargar procesos:", error); }
}

async function loadEvaluaciones() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getEvaluacionesActivas" });
        const data = JSON.parse(response);
        let options = '<option value="">Seleccione evaluación...</option>';
        data.forEach(item => { options += `<option value="${item.idEvaluaciones}">${item.Titulo}</option>`; });
        $('#cmbNuevaEvaluacion').html(options).trigger('change');
    } catch (error) { console.error("Error al cargar evaluaciones:", error); }
}

async function loadInducciones() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getInduccionesActivas" });
        const data = JSON.parse(response);
        let options = '<option value="">Seleccione inducción...</option>';
        data.forEach(item => { options += `<option value="${item.IdInduccion}">${item.NombreInduccion}</option>`; });
        $('#cmbNuevaInduccion').html(options).trigger('change');
    } catch (error) { console.error("Error al cargar inducciones:", error); }
}

// ==========================================
// CRUD VACANTES + LISTA DE TARJETAS
// ==========================================

async function loadVacantes() {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getVacantes" });
        vacantesData = JSON.parse(response);
        renderVacantesCards(vacantesData);
    } catch (error) {
        console.error("Error al cargar vacantes:", error);
        $('#listaVacantesCards').html('<p class="text-danger text-center py-3">Error al cargar vacantes</p>');
    }
}

function renderVacantesCards(data) {
    let html = '';
    if (!data || data.length === 0) {
        $('#listaVacantesCards').html('<p class="text-muted text-center py-3">No hay vacantes registradas</p>');
        return;
    }
    data.forEach(vacante => {
        const statusClass = vacante.Estatus == 1 ? 'draft' : (vacante.Estatus == 2 ? 'active-status' : 'closed');
        const statusText = vacante.Estatus == 1 ? 'Borrador' : (vacante.Estatus == 2 ? 'Activa' : 'Cerrada');
        const idEncoded = btoa(vacante.IdVacante);
        const isActive = vacanteSeleccionadaId === idEncoded ? 'active' : '';
        html += `
            <div class="vacancy-card ${statusClass} ${isActive}" onclick="seleccionarVacante('${idEncoded}')" data-id="${idEncoded}">
                <div class="d-flex justify-content-between align-items-start">
                    <div style="min-width:0; flex:1;">
                        <div class="fw-bold small text-truncate">${vacante.NombreVacante}</div>
                        <div class="text-muted small">${vacante.NombreArea || 'Sin área'} • ${vacante.Puesto || 'Sin puesto'}</div>
                    </div>
                    <div class="d-flex align-items-center gap-1 ms-2">
                        <span class="badge ${vacante.Estatus == 1 ? 'bg-secondary' : (vacante.Estatus == 2 ? 'bg-success' : 'bg-danger')} status-badge">${statusText}</span>
                        ${vacante.Estatus == 1 ? `
                        <div class="dropdown" onclick="event.stopPropagation()">
                            <button class="btn btn-sm p-0 px-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="material-symbols-outlined text-muted" style="font-size:18px;">more_vert</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#" onclick="openEditModal('${idEncoded}'); return false;">
                                    <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">edit</span>Editar
                                </a></li>
                                ${getStatusDropdownItems(vacante, idEncoded)}
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="#" onclick="deleteVacante('${idEncoded}'); return false;">
                                    <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">delete</span>Eliminar
                                </a></li>
                            </ul>
                        </div>` : ''}
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="card-postulante-count">
                        <span class="material-symbols-outlined align-middle" style="font-size:14px;">people</span> ${vacante.TotalPostulantes || 0} postulantes
                    </span>
                    <span class="text-muted small">${formatDate(vacante.FechaApertura)}</span>
                </div>
            </div>
        `;
    });
    $('#listaVacantesCards').html(html);
}

function filtrarVacantes() {
    const term = $('#txtBuscarVacante').val().toLowerCase();
    const filtradas = vacantesData.filter(v =>
        (v.NombreVacante || '').toLowerCase().includes(term) ||
        (v.NombreArea || '').toLowerCase().includes(term) ||
        (v.Puesto || '').toLowerCase().includes(term)
    );
    renderVacantesCards(filtradas);
}

function getStatusBadge(estatus) {
    switch(parseInt(estatus)) {
        case 1: return '<span class="badge bg-secondary status-badge text-dark">Borrador</span>';
        case 2: return '<span class="badge bg-success status-badge">Activa</span>';
        case 3: return '<span class="badge bg-danger status-badge">Cerrada</span>';
        default: return '<span class="badge bg-secondary status-badge">-</span>';
    }
}

function getStatusDropdownItems(vacante, idEncoded) {
    let items = '';
    if (vacante.Publicada == 0) {
        if (vacante.Estatus == 1) {
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 2); return false;"><span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">play_arrow</span>Activar</a></li>`;
        } else if (vacante.Estatus == 2) {
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 1); return false;"><span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">edit_note</span>Volver a borrador</a></li>`;
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 3); return false;"><span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">stop</span>Cerrar</a></li>`;
        } else if (vacante.Estatus == 3) {
            items += `<li><a class="dropdown-item" href="#" onclick="cambiarEstatus('${idEncoded}', 2); return false;"><span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">replay</span>Reactivar</a></li>`;
        }
    }
    return items;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const dateParsed = dateString.length === 10 ? dateString + 'T00:00:00' : dateString;
    const date = new Date(dateParsed);
    return date.toLocaleDateString('es-MX');
}

function formatNumber(num) {
    return parseFloat(num).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==========================================
// SELECCIÓN DE VACANTE (SPLIT PANE)
// ==========================================

async function seleccionarVacante(idEncoded) {
    vacanteSeleccionadaId = idEncoded;
    postulantesData = []; // reset para que el tab Postulantes sepa que debe recargar
    resetDetallePostulanteState(true);
    $('.vacancy-card').removeClass('active');
    $(`.vacancy-card[data-id="${idEncoded}"]`).addClass('active');

    const url = new URL(window.location);
    url.searchParams.set('vacante', idEncoded);
    window.history.replaceState({}, '', url);

    showTabLoading();

    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getVacanteById", IdVacante: idEncoded });
        const result = JSON.parse(response);

        if (result.Resultado && result.Siguiente) {
            const vacante = result.Datos;
            renderTabInfo(vacante, idEncoded);
            $('#postulantesIdVacante').val(idEncoded);
            $('#nombreVacantePostulantes').text(vacante.NombreVacante || 'Vacante');
            updateComparativoTabState(vacante);

            const comparativoTabActivo = $('#tab-comparativo-btn').hasClass('active');

            await Promise.all([
                loadPostulantes(idEncoded),
                loadProcesosParaHistorial()
            ]);

            if (comparativoTabActivo) {
                await loadComparativoResultadosTab();
            }
        }
    } catch (error) {
        console.error("Error al seleccionar vacante:", error);
    } finally {
        hideTabLoading();
    }
}

function renderTabInfo(vacante, idEncoded) {
    let salario = '-';
    if (vacante.SalarioMinimo && vacante.SalarioMaximo) {
        salario = `$${formatNumber(vacante.SalarioMinimo)} - $${formatNumber(vacante.SalarioMaximo)}`;
    } else if (vacante.SalarioMinimo) {
        salario = `Desde $${formatNumber(vacante.SalarioMinimo)}`;
    } else if (vacante.SalarioMaximo) {
        salario = `Hasta $${formatNumber(vacante.SalarioMaximo)}`;
    }

    const statusClass = vacante.Estatus == 1 ? 'borrador' : (vacante.Estatus == 2 ? 'activa' : 'cerrada');
    const statusText = vacante.Estatus == 1 ? 'Borrador' : (vacante.Estatus == 2 ? 'Activa' : 'Cerrada');
    const showPublicationLegend = parseInt(vacante.Estatus) === 2 && parseInt(vacante.Publicada) === 0;

    const html = `
        <!-- Header prominente -->
        <div class="vacante-header-card">
            <div class="d-flex align-items-start gap-3">
                <div class="vacante-icon-lg flex-shrink-0">
                    <span class="material-symbols-outlined">work</span>
                </div>
                <div class="flex-grow-1" style="min-width:0;">
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <h4 class="mb-1 fw-bold text-truncate">${vacante.NombreVacante}</h4>
                        <span class="badge-status ${statusClass}">${statusText}</span>
                    </div>
                    ${showPublicationLegend ? `
                    <div class="small mt-2 text-warning fw-semibold">
                        <span class="material-symbols-outlined align-middle" style="font-size:16px;">campaign</span>
                        Esta vacante sigue activa, pero todavia no ha sido publicada.
                    </div>` : ''}
                    <div class="text-muted small d-flex gap-3 flex-wrap mt-1">
                        <span><span class="material-symbols-outlined align-middle" style="font-size:16px;">location_on</span> ${vacante.Sucursal || 'Sin sucursal'}</span>
                        <span><span class="material-symbols-outlined align-middle" style="font-size:16px;">business</span> ${vacante.NombreArea || 'Sin área'}</span>
                        <span><span class="material-symbols-outlined align-middle" style="font-size:16px;">badge</span> ${vacante.Puesto || 'Sin puesto'}</span>
                    </div>
                </div>
                <div class="d-flex gap-1 flex-shrink-0">
                    ${vacante.Publicada == 0 ? `
                    <button class="btn btn-minimal btn-sm" onclick="openEditModal('${idEncoded}')" title="Editar">
                        <span class="material-symbols-outlined align-middle" style="font-size:18px;">edit</span>
                    </button>` : ''}
                    <div class="dropdown">
                        <button class="btn btn-sm p-0 px-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="material-symbols-outlined align-middle" style="font-size:18px;">more_vert</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            ${getStatusDropdownItems(vacante, idEncoded)}
                            ${vacante.Publicada == 0 && vacante.Estatus == 2 ? `
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-success" href="#" onclick="publicarVacante('${idEncoded}'); return false;">
                                <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">publish</span>Publicar
                            </a></li>` : ''}
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="deleteVacante('${idEncoded}'); return false;">
                                <span class="material-symbols-outlined me-2" style="font-size:18px;vertical-align:middle;">delete</span>Eliminar
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="d-flex gap-4 mt-3 text-muted small flex-wrap">
                <span><strong><span class="material-symbols-outlined align-middle" style="font-size:16px;">payments</span></strong> ${salario}</span>
                <span><strong><span class="material-symbols-outlined align-middle" style="font-size:16px;">calendar_month</span></strong> ${formatDate(vacante.FechaApertura)} - ${vacante.FechaCierre ? formatDate(vacante.FechaCierre) : 'Sin fecha de cierre'}</span>
                <span><strong><span class="material-symbols-outlined align-middle" style="font-size:16px;">schedule</span></strong> ${vacante.TipoContratacion}</span>
            </div>
            <div class="mt-3 pt-3" style="border-top:1px solid #e9ecef;">
                <p class="text-muted mb-0" style="font-size:0.9rem; line-height:1.6;">${vacante.DescripcionPuesto || 'Sin descripción del puesto.'}</p>
            </div>
        </div>

        <!-- Requisitos -->
        <div class="mb-4">
            <h6 class="section-title-v2">
                <span class="material-symbols-outlined">checklist</span> Requisitos
            </h6>
            <div id="formAddRequisito" style="display:none;" class="mb-3">
                <div class="input-group input-group-sm">
                    <input type="text" id="txtNuevoRequisito" class="form-control" placeholder="Nuevo requisito...">
                    <input type="number" id="txtOrdenRequisito" class="form-control" style="max-width:70px;" placeholder="Orden" value="0">
                    <button class="btn btn-minimal btn-sm" onclick="addRequisito()"><span class="material-symbols-outlined" style="font-size:18px;">save</span></button>
                    <button class="btn btn-minimal btn-sm" onclick="hideAddRequisitoForm()"><span class="material-symbols-outlined" style="font-size:18px;">close</span></button>
                </div>
            </div>
            <div id="listaRequisitos"><p class="text-muted text-center">Cargando...</p></div>
        </div>

        <!-- Evaluaciones -->
        <div class="mb-4">
            <h6 class="section-title-v2">
                <span class="material-symbols-outlined">quiz</span> Evaluaciones
            </h6>
            <div id="formAddEvaluacion" style="display:none;" class="mb-3">
                <div class="row g-2 align-items-stretch">
                    <div class="col-md-5">
                        <select id="cmbNuevaEvaluacion" class="form-select"><option value="">Seleccione evaluación...</option></select>
                    </div>
                    <div class="col-md-5">
                        <select id="cmbProcesoEvaluacion" class="form-select"><option value="">Seleccione proceso...</option></select>
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button class="btn btn-minimal btn-sm flex-fill" type="button" onclick="addEvaluacion()"><span class="material-symbols-outlined" style="font-size:18px;">save</span></button>
                        <button class="btn btn-minimal btn-sm flex-fill" type="button" onclick="hideAddEvaluacionForm()"><span class="material-symbols-outlined" style="font-size:18px;">close</span></button>
                    </div>
                </div>
            </div>
            <div id="listaEvaluaciones"><p class="text-muted text-center">Cargando...</p></div>
        </div>

        <!-- Inducciones -->
        <div class="mb-4">
            <h6 class="section-title-v2">
                <span class="material-symbols-outlined">school</span> Inducciones
            </h6>
            <div id="formAddInduccion" style="display:none;" class="mb-3">
                <div class="input-group input-group-sm">
                    <select id="cmbNuevaInduccion" class="form-select"><option value="">Seleccione inducción...</option></select>
                    <button class="btn btn-minimal btn-sm" onclick="addInduccion()"><span class="material-symbols-outlined" style="font-size:18px;">save</span></button>
                    <button class="btn btn-minimal btn-sm" onclick="hideAddInduccionForm()"><span class="material-symbols-outlined" style="font-size:18px;">close</span></button>
                </div>
            </div>
            <div id="listaInducciones"><p class="text-muted text-center">Cargando...</p></div>
        </div>

        <input type="hidden" id="detalleIdVacante" value="${idEncoded}">
    `;

    $('#contenidoTabInfo').html(html);

    // Re-inicializar selects del tab info
    loadEvaluaciones().then(() => {
        $('#cmbNuevaEvaluacion').select2({ dropdownParent: $('#tabInfoRequisitos'), width: '100%', placeholder: 'Seleccione evaluación...', allowClear: true });
    });
    loadInducciones().then(() => {
        $('#cmbNuevaInduccion').select2({ dropdownParent: $('#tabInfoRequisitos'), width: '100%', placeholder: 'Seleccione inducción...', allowClear: true });
    });
    loadProcesosVacantes().then(() => {
        $('#cmbProcesoEvaluacion').select2({ dropdownParent: $('#tabInfoRequisitos'), width: '100%', placeholder: 'Seleccione proceso...', allowClear: true });
    });

    loadRequisitosDetalle(idEncoded);
    loadEvaluacionesDetalle(idEncoded);
    loadInduccionesDetalle(idEncoded);
}

// ==========================================
// AGREGAR / EDITAR / CAMBIAR ESTATUS VACANTE
// ==========================================

function prepareAddModal() {
    const today = new Date();
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

    if (!nombre) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El nombre de la vacante es requerido.</span></div>`, "top-right", 5000); $('#txtNombreVacante').focus(); return; }
    if (!tipoContratacion) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El tipo de contratación es requerido.</span></div>`, "top-right", 5000); $('#cmbTipoContratacion').focus(); return; }
    if (!fechaApertura) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La fecha de apertura es requerida.</span></div>`, "top-right", 5000); $('#txtFechaApertura').focus(); return; }
    if (!areaTecnica) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El área técnica es requerida.</span></div>`, "top-right", 5000); $('#cmbAreaTecnica').focus(); return; }
    if (!puesto) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El puesto es requerido.</span></div>`, "top-right", 5000); $('#cmbPuesto').focus(); return; }
    if (!sucursal) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La sucursal es requerida.</span></div>`, "top-right", 5000); $('#cmbSucursal').focus(); return; }
    if (!salarioMinimoRaw) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El salario mínimo es requerido.</span></div>`, "top-right", 5000); $('#txtSalarioMinimo').focus(); return; }
    if (!salarioMaximoRaw) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El salario máximo es requerido.</span></div>`, "top-right", 5000); $('#txtSalarioMaximo').focus(); return; }

    const salarioMinimo = parseFloat(salarioMinimoRaw);
    const salarioMaximo = parseFloat(salarioMaximoRaw);
    if (Number.isNaN(salarioMinimo) || Number.isNaN(salarioMaximo)) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Verifica los salarios (deben ser numéricos).</span></div>`, "top-right", 5000); return; }
    if (salarioMinimo > salarioMaximo) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El salario mínimo no puede ser mayor al salario máximo.</span></div>`, "top-right", 5000); $('#txtSalarioMinimo').focus(); return; }
    if (!fechaCierre) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La fecha de cierre es requerida.</span></div>`, "top-right", 5000); $('#txtFechaCierre').focus(); return; }
    if (new Date(fechaCierre) < new Date(fechaApertura)) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La fecha de cierre no puede ser menor a la fecha de apertura.</span></div>`, "top-right", 5000); $('#txtFechaCierre').focus(); return; }
    if (!descripcionPuesto) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La descripción del puesto es requerida.</span></div>`, "top-right", 5000); $('#txtDescripcionPuesto').focus(); return; }

    try {
        let areaTecnicaFinal = areaTecnica;
        const selectedOption = $('#cmbAreaTecnica option:selected');
        if (selectedOption.attr('data-new') === 'true') {
            const tempNombre = selectedOption.text();
            const tempDesc = selectedOption.attr('data-desc');
            try {
                const resAreaStr = await $.post("Backend/Vacantes/App.php", { op: "addAreaTecnica", NombreArea: tempNombre, Descripcion: tempDesc });
                const dataArea = JSON.parse(resAreaStr);
                if (dataArea.estatus || dataArea.id) { areaTecnicaFinal = dataArea.id; }
                else { Swal.fire('Error', dataArea.msg || 'No se pudo crear la nueva Área Técnica.', 'error'); return; }
            } catch (areaErr) { Swal.fire('Error', 'Hubo un problema al crear la nueva Área Técnica.', 'error'); return; }
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
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000);
            $('#modalAddVacante').modal('hide');
            loadVacantes();
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000);
        }
    } catch (error) {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">No se pudo registrar la vacante.</span></div>`, "top-right", 5000);
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

async function openEditModal(idEncoded) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getVacanteById", IdVacante: idEncoded });
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
            if (!modal) modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
            modal.show();
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg || 'No se encontró la vacante'}</span></div>`, "top-right", 5000);
        }
    } catch (error) {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">No se pudo cargar la información de la vacante.</span></div>`, "top-right", 5000);
    }
}

async function updateVacante() {
    const idVacante = $('#editIdVacante').val();
    const nombre = $('#editNombreVacante').val().trim();
    const tipoContratacion = $('#editTipoContratacion').val();
    const fechaApertura = $('#editFechaApertura').val();

    if (!nombre) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El nombre de la vacante es requerido.</span></div>`, "top-right", 5000); $('#editNombreVacante').focus(); return; }
    if (!tipoContratacion) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El tipo de contratación es requerido.</span></div>`, "top-right", 5000); $('#editTipoContratacion').focus(); return; }
    if (!fechaApertura) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La fecha de apertura es requerida.</span></div>`, "top-right", 5000); $('#editFechaApertura').focus(); return; }

    try {
        let areaTecnicaFinal = $('#editAreaTecnica').val();
        const selectedOption = $('#editAreaTecnica option:selected');
        if (selectedOption.attr('data-new') === 'true') {
            const tempNombre = selectedOption.text();
            const tempDesc = selectedOption.attr('data-desc');
            try {
                const resAreaStr = await $.post("Backend/Vacantes/App.php", { op: "addAreaTecnica", NombreArea: tempNombre, Descripcion: tempDesc });
                const dataArea = JSON.parse(resAreaStr);
                if (dataArea.estatus || dataArea.id) { areaTecnicaFinal = dataArea.id; }
                else { Swal.fire('Error', dataArea.msg || 'No se pudo crear la nueva Área Técnica.', 'error'); return; }
            } catch (areaErr) { Swal.fire('Error', 'Hubo un problema al crear la nueva Área Técnica.', 'error'); return; }
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
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000);
            $('#modalEditVacante').modal('hide');
            loadVacantes();
            if (vacanteSeleccionadaId === idVacante) seleccionarVacante(idVacante);
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000);
        }
    } catch (error) {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">No se pudo actualizar la vacante.</span></div>`, "top-right", 5000);
    }
}

async function cambiarEstatus(idEncoded, nuevoEstatus) {
    const estatusTexto = { 1: 'Borrador', 2: 'Activa', 3: 'Cerrada' };
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
            const response = await $.post("Backend/Vacantes/App.php", { op: "cambiarEstatusVacante", IdVacante: idEncoded, NuevoEstatus: nuevoEstatus });
            const data = JSON.parse(response);
            if (data.Siguiente) {
                showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
                loadVacantes();
                if (vacanteSeleccionadaId === idEncoded) seleccionarVacante(idEncoded);
            } else {
                showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
            }
        } catch (error) {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al cambiar el estatus.</span></div>`, "top-right", 5000);
        }
    }
}

async function publicarVacante(idEncoded) {
    const result = await Swal.fire({
        title: '¿Publicar vacante?',
        html: `<p>Una vez publicada, la vacante <strong>no podrá ser editada ni eliminada</strong>.</p><p class="text-danger"><strong>Esta acción no se puede deshacer.</strong></p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, publicar',
        cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", { op: "publicarVacante", IdVacante: idEncoded });
            const data = JSON.parse(response);
            if (data.Siguiente) {
                showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
                loadVacantes();
                if (vacanteSeleccionadaId === idEncoded) seleccionarVacante(idEncoded);
            } else {
                showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
            }
        } catch (error) {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al publicar la vacante.</span></div>`, "top-right", 5000);
        }
    }
}

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
            const response = await $.post("Backend/Vacantes/App.php", { op: "deleteVacante", IdVacante: idEncoded });
            const data = JSON.parse(response);
            if (data.Siguiente) {
                showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
                if (vacanteSeleccionadaId === idEncoded) {
                    vacanteSeleccionadaId = null;
                    $('#contenidoTabInfo').html(`<div class="text-center text-muted py-5"><span class="material-symbols-outlined" style="font-size:64px;">work</span><p class="mt-3 fs-5">Selecciona una vacante de la lista para ver sus detalles</p></div>`);
                    $('#postulantesIdVacante').val('');
                    updateComparativoTabState(null);
                    renderPostulantesCards([]);
                    updatePostulantesStats([]);
                }
                loadVacantes();
            } else {
                showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
            }
        } catch (error) {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al eliminar la vacante.</span></div>`, "top-right", 5000);
        }
    }
}

// ==========================================
// REQUISITOS / EVALUACIONES / INDUCCIONES
// ==========================================

async function loadRequisitosDetalle(idVacante) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getRequisitosVacante", IdVacante: idVacante });
        const requisitos = JSON.parse(response);
        if (requisitos && requisitos.length > 0) {
            let html = '<div class="d-flex flex-wrap">';
            requisitos.forEach(req => {
                const idEncoded = btoa(req.IdVacanteRequisito);
                html += `<span class="chip-tag">${req.Requisito}<button onclick="deleteRequisito('${idEncoded}')">&times;</button></span>`;
            });
            html += '</div>';
            html += `<button class="btn-add-ghost mt-2" onclick="showAddRequisitoForm()">
                <span class="material-symbols-outlined" style="font-size:18px;">add</span> Agregar requisito
            </button>`;
            $('#listaRequisitos').html(html);
        } else {
            $('#listaRequisitos').html(`
                <div class="empty-state-card">
                    <span class="material-symbols-outlined">checklist</span>
                    <p>Aún no hay requisitos configurados</p>
                    <button class="btn-add-ghost" onclick="showAddRequisitoForm()">
                        <span class="material-symbols-outlined" style="font-size:18px;">add</span> Agregar primer requisito
                    </button>
                </div>
            `);
        }
    } catch (error) { console.error("Error al cargar requisitos:", error); }
}

function showAddRequisitoForm() { $('#formAddRequisito').slideDown(); $('#txtNuevoRequisito').focus(); }
function hideAddRequisitoForm() { $('#formAddRequisito').slideUp(); $('#txtNuevoRequisito').val(''); $('#txtOrdenRequisito').val('0'); }

async function addRequisito() {
    const idVacante = $('#detalleIdVacante').val();
    const requisito = $('#txtNuevoRequisito').val().trim();
    const orden = $('#txtOrdenRequisito').val() || 0;
    if (!requisito) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El requisito es requerido.</span></div>`, "top-right", 5000); $('#txtNuevoRequisito').focus(); return; }
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "addRequisitoVacante", IdVacante: idVacante, Requisito: requisito, Orden: orden });
        const result = JSON.parse(response);
        if (result.Siguiente) {
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000);
            hideAddRequisitoForm();
            loadRequisitosDetalle(idVacante);
        } else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000); }
    } catch (error) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al agregar el requisito.</span></div>`, "top-right", 5000); }
}

async function deleteRequisito(idEncoded) {
    const result = await Swal.fire({ title: '¿Eliminar requisito?', text: 'Esta acción no se puede deshacer', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonColor: '#6c757d', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", { op: "deleteRequisitoVacante", IdVacanteRequisito: idEncoded });
            const data = JSON.parse(response);
            if (data.Siguiente) {
                showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000);
                loadRequisitosDetalle($('#detalleIdVacante').val());
            } else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000); }
        } catch (error) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al eliminar el requisito.</span></div>`, "top-right", 5000); }
    }
}

async function loadEvaluacionesDetalle(idVacante) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getEvaluacionesVacante", IdVacante: idVacante });
        const evaluaciones = JSON.parse(response);
        if (evaluaciones && evaluaciones.length > 0) {
            let html = '';
            evaluaciones.forEach(ev => {
                const idEncoded = btoa(ev.IdVacanteEvaluacion);
                html += `
                    <div class="mini-card">
                        <div>
                            <div class="mini-card-title">${ev.NombreEvaluacion}</div>
                            <div class="mini-card-sub">${ev.NombreProceso}</div>
                        </div>
                        <button type="button" class="btn btn-minimal-danger btn-sm" onclick="deleteEvaluacion('${idEncoded}')">
                            <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                        </button>
                    </div>
                `;
            });
            html += `<button class="btn-add-ghost mt-2" onclick="showAddEvaluacionForm()">
                <span class="material-symbols-outlined" style="font-size:18px;">add</span> Agregar evaluación
            </button>`;
            $('#listaEvaluaciones').html(html);
        } else {
            $('#listaEvaluaciones').html(`
                <div class="empty-state-card">
                    <span class="material-symbols-outlined">quiz</span>
                    <p>Aún no hay evaluaciones configuradas</p>
                    <button class="btn-add-ghost" onclick="showAddEvaluacionForm()">
                        <span class="material-symbols-outlined" style="font-size:18px;">add</span> Agregar evaluación
                    </button>
                </div>
            `);
        }
    } catch (error) { console.error("Error al cargar evaluaciones:", error); }
}

function showAddEvaluacionForm() {
    $('#formAddEvaluacion').slideDown(200, function() {
        $('#cmbNuevaEvaluacion').select2('destroy').select2({ dropdownParent: $('#tabInfoRequisitos'), width: '100%', placeholder: 'Seleccione evaluación...', allowClear: true });
        $('#cmbProcesoEvaluacion').select2('destroy').select2({ dropdownParent: $('#tabInfoRequisitos'), width: '100%', placeholder: 'Seleccione proceso...', allowClear: true });
    });
}
function hideAddEvaluacionForm() {
    $('#formAddEvaluacion').slideUp();
    $('#cmbNuevaEvaluacion').val('').trigger('change');
    $('#cmbProcesoEvaluacion').val('').trigger('change');
}

async function addEvaluacion() {
    const idVacante = $('#detalleIdVacante').val();
    const idEvaluacion = $('#cmbNuevaEvaluacion').val();
    const idProceso = $('#cmbProcesoEvaluacion').val();
    if (!idEvaluacion) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Seleccione una evaluación.</span></div>`, "top-right", 5000); $('#cmbNuevaEvaluacion').focus(); return; }
    if (!idProceso) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Seleccione un proceso.</span></div>`, "top-right", 5000); $('#cmbProcesoEvaluacion').focus(); return; }
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "addEvaluacionVacante", IdVacante: idVacante, IdEvaluacion: idEvaluacion, IdProceso: idProceso });
        const result = JSON.parse(response);
        if (result.Siguiente) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000); hideAddEvaluacionForm(); loadEvaluacionesDetalle(idVacante); }
        else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000); }
    } catch (error) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al agregar la evaluación.</span></div>`, "top-right", 5000); }
}

async function deleteEvaluacion(idEncoded) {
    const result = await Swal.fire({ title: '¿Eliminar evaluación?', text: 'Esta acción no se puede deshacer', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonColor: '#6c757d', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", { op: "deleteEvaluacionVacante", IdVacanteEvaluacion: idEncoded });
            const data = JSON.parse(response);
            if (data.Siguiente) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000); loadEvaluacionesDetalle($('#detalleIdVacante').val()); }
            else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000); }
        } catch (error) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al eliminar la evaluación.</span></div>`, "top-right", 5000); }
    }
}

async function loadInduccionesDetalle(idVacante) {
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "getInduccionesVacante", IdVacante: idVacante });
        const inducciones = JSON.parse(response);
        if (inducciones && inducciones.length > 0) {
            let html = '';
            inducciones.forEach(ind => {
                const idEncoded = btoa(ind.IdVacanteInduccion);
                html += `
                    <div class="mini-card">
                        <div class="d-flex align-items-center gap-2">
                            <span class="material-symbols-outlined text-danger" style="font-size:20px;">school</span>
                            <span class="mini-card-title">${ind.NombreInduccion}</span>
                        </div>
                        <button type="button" class="btn btn-minimal-danger btn-sm" onclick="deleteInduccion('${idEncoded}')">
                            <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                        </button>
                    </div>
                `;
            });
            html += `<button class="btn-add-ghost mt-2" onclick="showAddInduccionForm()">
                <span class="material-symbols-outlined" style="font-size:18px;">add</span> Agregar inducción
            </button>`;
            $('#listaInducciones').html(html);
        } else {
            $('#listaInducciones').html(`
                <div class="empty-state-card">
                    <span class="material-symbols-outlined">school</span>
                    <p>Aún no hay inducciones configuradas</p>
                    <button class="btn-add-ghost" onclick="showAddInduccionForm()">
                        <span class="material-symbols-outlined" style="font-size:18px;">add</span> Agregar inducción
                    </button>
                </div>
            `);
        }
    } catch (error) { console.error("Error al cargar inducciones:", error); }
}

function showAddInduccionForm() {
    $('#formAddInduccion').slideDown(200, function() {
        $('#cmbNuevaInduccion').select2('destroy').select2({ dropdownParent: $('#tabInfoRequisitos'), width: '100%', placeholder: 'Seleccione inducción...', allowClear: true });
    });
}
function hideAddInduccionForm() { $('#formAddInduccion').slideUp(); $('#cmbNuevaInduccion').val(''); }

async function addInduccion() {
    const idVacante = $('#detalleIdVacante').val();
    const idInduccion = $('#cmbNuevaInduccion').val();
    if (!idInduccion) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Seleccione una inducción.</span></div>`, "top-right", 5000); $('#cmbNuevaInduccion').focus(); return; }
    try {
        const response = await $.post("Backend/Vacantes/App.php", { op: "addInduccionVacante", IdVacante: idVacante, IdInduccion: idInduccion });
        const result = JSON.parse(response);
        if (result.Siguiente) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000); hideAddInduccionForm(); loadInduccionesDetalle(idVacante); }
        else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, "top-right", 5000); }
    } catch (error) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al agregar la inducción.</span></div>`, "top-right", 5000); }
}

async function deleteInduccion(idEncoded) {
    const result = await Swal.fire({ title: '¿Eliminar inducción?', text: 'Esta acción no se puede deshacer', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonColor: '#6c757d', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
        try {
            const response = await $.post("Backend/Vacantes/App.php", { op: "deleteInduccionVacante", IdVacanteInduccion: idEncoded });
            const data = JSON.parse(response);
            if (data.Siguiente) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000); loadInduccionesDetalle($('#detalleIdVacante').val()); }
            else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${data.Msg}</span></div>`, "top-right", 5000); }
        } catch (error) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al eliminar la inducción.</span></div>`, "top-right", 5000); }
    }
}


// ==========================================
// NAVEGACIÓN SUB-VISTAS POSTULANTES
// ==========================================

function mostrarListaPostulantes() {
    $('#subVistaListaPostulantes').removeClass('d-none');
    $('#wizardAddPostulante').addClass('d-none');
    $('#subVistaDetallePostulante').addClass('d-none');
}

function mostrarFormAddPostulante() {
    const idVacante = $('#postulantesIdVacante').val();
    if (!idVacante) {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Selecciona una vacante primero.</span></div>`, 'top-right', 3000);
        return;
    }
    $('#addPostulanteIdVacante').val(idVacante);
    clearPostulanteForm();
    wizardGoToStep(1);
    $('#subVistaListaPostulantes').addClass('d-none');
    $('#wizardAddPostulante').removeClass('d-none');
    $('#subVistaDetallePostulante').addClass('d-none');
}

function volverAListaPostulantes() {
    mostrarListaPostulantes();
    const idVacante = $('#postulantesIdVacante').val();
    if (idVacante) loadPostulantes(idVacante);
}

// ==========================================
// WIZARD ADD POSTULANTE
// ==========================================

let wizardCurrentStep = 1;

function wizardGoToStep(step) {
    wizardCurrentStep = step;

    // Actualizar barra de progreso
    $('.wizard-step').each(function() {
        const stepNum = parseInt($(this).data('step'));
        $(this).removeClass('active completed');
        if (stepNum === step) {
            $(this).addClass('active');
        } else if (stepNum < step) {
            $(this).addClass('completed');
        }
    });

    $('.wizard-connector').each(function(idx) {
        $(this).removeClass('completed');
        if (idx < step - 1) {
            $(this).addClass('completed');
        }
    });

    // Mostrar/ocultar contenido
    $('[id^="wizardStep"]').addClass('d-none');
    $(`#wizardStep${step}`).removeClass('d-none');
}

function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarGradient(name) {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
}

// ==========================================
// CARGA Y STATS DE POSTULANTES (CARDS V2)
// ==========================================

async function loadPostulantes(idVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getPostulantesByVacante', IdVacante: idVacante });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data) {
            postulantesData = result.Data;
        } else {
            postulantesData = [];
        }
    } catch (error) {
        console.error("Error al cargar postulantes:", error);
        postulantesData = [];
    }

    postulantesFilterByEstatus = 'todos';
    $('#filtrosEstatusPostulantes button').removeClass('active');
    $('#filtrosEstatusPostulantes button[data-filter="todos"]').addClass('active');
    $('#txtBuscarPostulanteLista').val('');

    renderPostulantesCards(postulantesData);
    updatePostulantesStats(postulantesData);
}

function renderPostulantesCards(data) {
    const container = $('#contenedorCardsPostulantes');
    if (!data || data.length === 0) {
        container.html(`
            <div class="empty-state-card">
                <span class="material-symbols-outlined">people</span>
                <p>Aún no hay postulantes registrados</p>
                <button class="btn-add-ghost" onclick="mostrarFormAddPostulante()">
                    <span class="material-symbols-outlined align-middle me-1">person_add</span> Agregar postulante
                </button>
            </div>
        `);
        return;
    }

    let html = '';
    data.forEach(row => {
        const idEncoded = btoa(row.IdPostulanteVacante);
        const idNumerico = row.IdPostulanteVacante;
        const nombrePostulante = row.NombreCompleto || 'Postulante';
        const nombreEsc = nombrePostulante.replace(/'/g, "\\'");
        const initials = getInitials(nombrePostulante);
        const gradient = getAvatarGradient(nombrePostulante);
        const statusPill = getPostulanteStatusPill(row.EstatusPostulacion);

         html += `
             <div class="postulante-card-v2" data-nombre="${nombrePostulante.toLowerCase()}" data-correo="${(row.CorreoElectronico || '').toLowerCase()}" data-telefono="${(row.Telefono || '').toLowerCase()}" data-estatus="${row.EstatusPostulacion}" onclick="showDetallePostulante('${idEncoded}')">
                 <div class="card-header-row">
                     <div class="card-main-info">
                         <div style="min-width:0;">
                             <div class="card-name">${nombrePostulante}</div>
                             <div class="card-contact">${row.CorreoElectronico || 'Sin correo'}</div>
                         </div>
                     </div>
                    <div class="d-flex align-items-center">
                        ${statusPill}
                    </div>
                </div>
                <div class="card-meta-row">
                    <span class="card-meta-item">
                        <span class="material-symbols-outlined">calendar_today</span>
                        ${row.FechaPostulacion || '-'}
                    </span>
                    <span class="card-meta-item">
                        <span class="material-symbols-outlined">phone</span>
                        ${row.Telefono || 'Sin teléfono'}
                    </span>
                    <span class="card-meta-item">
                        <span class="material-symbols-outlined">task_alt</span>
                        ${row.UltimoProceso || 'Sin proceso'}
                    </span>
                </div>
            </div>
        `;
    });
    container.html(html);
}

function filtrarPostulantesCards() {
    const term = $('#txtBuscarPostulanteLista').val().toLowerCase().trim();

    let data = postulantesData;

    if (postulantesFilterByEstatus !== 'todos') {
        const estatusNum = parseInt(postulantesFilterByEstatus);
        data = data.filter(p => parseInt(p.EstatusPostulacion) === estatusNum);
    }

    if (term) {
        data = data.filter(p => {
            return (p.NombreCompleto || '').toLowerCase().includes(term)
                || (p.CorreoElectronico || '').toLowerCase().includes(term)
                || (p.Telefono || '').toLowerCase().includes(term);
        });
    }

    renderPostulantesCards(data);
    updatePostulantesStats(postulantesData);
}

function filtrarPostulantesPorEstatus(estatus) {
    postulantesFilterByEstatus = estatus;
    $('#filtrosEstatusPostulantes button').removeClass('active');
    $(`#filtrosEstatusPostulantes button[data-filter="${estatus}"]`).addClass('active');
    filtrarPostulantesCards();
}

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

function getPostulanteStatusBadge(estatus) {
    switch(parseInt(estatus)) {
        case 1: return '<span class="postulante-status en-proceso">En Proceso</span>';
        case 2: return '<span class="postulante-status aceptado">Aceptado</span>';
        case 3: return '<span class="postulante-status rechazado">Rechazado</span>';
        case 4: return '<span class="postulante-status finalizado">Finalizado</span>';
        default: return '<span class="postulante-status">Desconocido</span>';
    }
}

function getPostulanteStatusPill(estatus) {
    switch(parseInt(estatus)) {
        case 1: return '<span class="status-pill en-proceso">En Proceso</span>';
        case 2: return '<span class="status-pill aceptado">Aceptado</span>';
        case 3: return '<span class="status-pill rechazado">Rechazado</span>';
        case 4: return '<span class="status-pill finalizado">Finalizado</span>';
        default: return '<span class="status-pill">Desconocido</span>';
    }
}

async function loadProcesosParaHistorial() {
    try {
        const response = await $.post('Backend/Vacantes/App.php', { op: 'getProcesosVacantesActivos' });
        const result = JSON.parse(response);
        if (result && Array.isArray(result)) {
            postulantesProcesosList = result;
            let options = '<option value="">Seleccione proceso...</option>';
            result.forEach(p => { options += `<option value="${p.IdProceso}">${p.NombreProceso}</option>`; });
            $('#cmbNuevoProceso').html(options);
        }
    } catch (error) { console.error("Error al cargar procesos:", error); }
}

// ==========================================
// AGREGAR POSTULANTE (INLINE)
// ==========================================

function clearPostulanteForm() {
    $('#txtBuscarPostulante').val('');
    $('#resultadosBusqueda').hide().html('');
    $('#txtBuscarEmpleado').val('');
    $('#resultadosBusquedaEmpleado').hide().html('');
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
    $('#txtPostulanteIdEmpleado').val('');
}

async function buscarPostulanteExistente() {
    const termino = $('#txtBuscarPostulante').val().trim();
    if (termino.length < 3) {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Ingrese al menos 3 caracteres para buscar.</span></div>`, 'top-right', 3000);
        return;
    }
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'searchPostulante', Termino: termino });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="list-group">';
            result.Data.forEach(p => {
                html += `<a href="#" class="list-group-item list-group-item-action" onclick="seleccionarPostulanteExistente(${p.IdPostulante}, '${p.NombreCompleto}', '${p.CorreoElectronico || ''}')"><strong>${p.NombreCompleto}</strong><br><small class="text-muted">${p.CorreoElectronico || 'Sin correo'} | CURP: ${p.CURP || 'N/A'}</small></a>`;
            });
            html += '</div>';
            $('#resultadosBusqueda').html(html).show();
        } else {
            $('#resultadosBusqueda').html('<p class="text-muted small">No se encontraron resultados</p>').show();
        }
    } catch (error) { console.error("Error al buscar postulante:", error); }
}

async function buscarEmpleadoInterno() {
    const termino = $('#txtBuscarEmpleado').val().trim().toLowerCase();
    if (termino.length < 3) {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">¡Información!</span><span class="alert-text">Ingrese al menos 3 caracteres para buscar un empleado.</span></div>`, 'top-right', 4000);
        return;
    }
    $('#resultadosBusquedaEmpleado').html('<div class="spinner-border spinner-border-sm text-success" role="status"></div> Buscando...').show();
    try {
        const response = await $.post('Backend/Empleados/App.php', { op: 'getPersonal', puesto: '', sucursal: '', division: '' });
        let empleados = [];
        try { empleados = JSON.parse(response); } catch (e) { console.error("Error parseando respuesta", e); }
        if (empleados && Array.isArray(empleados)) {
            const empleadosFiltrados = empleados.filter(e => {
                const nombreCompleto = `${e.Nombre || ''} ${e.ApellidoPaterno || ''} ${e.ApellidoMaterno || ''}`.toLowerCase();
                const numEmpleado = (e.NoEmpleado || e.IdEmpleado || '').toString();
                return nombreCompleto.includes(termino) || numEmpleado.includes(termino);
            });
            if (empleadosFiltrados.length > 0) {
                let html = '<div class="list-group list-group-flush border rounded-3 mt-1 shadow-sm" style="max-height: 200px; overflow-y: auto;">';
                empleadosFiltrados.forEach(e => {
                    const encodedEmpl = btoa(encodeURIComponent(JSON.stringify(e)));
                    html += `<button type="button" class="list-group-item list-group-item-action py-2" onclick="seleccionarEmpleadoInterno('${encodedEmpl}')"><div class="d-flex w-100 justify-content-between align-items-center"><div><h6 class="mb-0 fw-bold text-success">${e.Nombre || ''} ${e.ApellidoPaterno || ''} ${e.ApellidoMaterno || ''}</h6><small class="text-muted"><span class="material-symbols-outlined align-middle" style="font-size:14px;">badge</span> #${e.NoEmpleado || e.IdEmpleado || 'N/A'}</small></div><span class="material-symbols-outlined text-success">add_circle</span></div></button>`;
                });
                html += '</div>';
                $('#resultadosBusquedaEmpleado').html(html).show();
            } else {
                $('#resultadosBusquedaEmpleado').html('<div class="alert alert-warning py-2 small mb-0"><span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">sentiment_dissatisfied</span> No se encontró ningún empleado interno.</div>').show();
            }
        } else {
            $('#resultadosBusquedaEmpleado').html('<div class="alert alert-danger py-2 small mb-0">Error al buscar empleados.</div>').show();
        }
    } catch (error) {
        console.error('Error al buscar empleado interno:', error);
        $('#resultadosBusquedaEmpleado').html('<div class="alert alert-danger py-2 small mb-0">Error de conexión.</div>').show();
    }
}

function seleccionarEmpleadoInterno(encodedEmpl) {
    try {
        const e = JSON.parse(decodeURIComponent(atob(encodedEmpl)));
        let nombreCompleto = e.Nombre || '';
        let nombre = '', apPaterno = '', apMaterno = '';
        if (nombreCompleto.includes(',')) {
            const partes = nombreCompleto.split(',');
            nombre = partes[1].trim();
            const apellidos = partes[0].trim().split(' ');
            apPaterno = apellidos[0] || '';
            apMaterno = apellidos.slice(1).join(' ') || '';
        } else {
            const partes = nombreCompleto.trim().split(' ');
            if (partes.length >= 3) { nombre = partes.slice(2).join(' '); apPaterno = partes[0]; apMaterno = partes[1]; }
            else if (partes.length === 2) { nombre = partes[1]; apPaterno = partes[0]; }
            else { nombre = nombreCompleto; }
        }
        $('#txtPostulanteNombre').val(nombre);
        $('#txtPostulanteApPaterno').val(apPaterno || e.ApellidoPaterno || '');
        $('#txtPostulanteApMaterno').val(apMaterno || e.ApellidoMaterno || '');
        $('#txtPostulanteCURP').val(e.CURP || e.Curp || '');
        $('#txtPostulanteTelefono').val(e.TelefonoCelular || e.Telefono || e.Telefono_Celular || e.Movil || '');
        $('#txtPostulanteCorreo').val(e.CorreoElectronico || e.Correo_Electronico || e.Email || '');
        $('#txtPostulanteDireccion').val(e.Calle || e.Direccion || '');
        $('#txtPostulanteEstado').val(e.Estado || e.EntidadFederativa || '');
        $('#txtPostulanteCiudad').val(e.Ciudad || e.Municipio || '');
        $('#txtPostulanteIdEmpleado').val(e.NoEmpleado || e.IdEmpleado || '');
        $('#resultadosBusquedaEmpleado').hide();
        $('#txtBuscarEmpleado').val('');
        showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Empleado Cargado!</span><span class="alert-text">Por favor verifica y completa la información restante.</span></div>`, 'top-right', 4000);
    } catch (err) { console.error("Error al decodificar datos del empleado", err); }
}

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
            const response = await $.post('Backend/Postulantes/App.php', { op: 'addPostulacion', IdVacante: idVacante, IdPostulante: btoa(idPostulante), Observaciones: observaciones });
            const result = JSON.parse(response);
            if (result.Siguiente) {
                showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
                volverAListaPostulantes();
                loadPostulantes(idVacante);
            } else {
                showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
            }
        } catch (error) { console.error('Error al agregar postulación:', error); }
    }
}

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
    const idEmpleado = $('#txtPostulanteIdEmpleado').val().trim();

    if (!nombre || !apPaterno || !correo) {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Ingrese el nombre, apellido paterno y correo del postulante.</span></div>`, 'top-right', 3000);
        if (!nombre) $('#txtPostulanteNombre').focus();
        else if (!apPaterno) $('#txtPostulanteApPaterno').focus();
        else if (!correo) $('#txtPostulanteCorreo').focus();
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">El correo electrónico no tiene un formato válido.</span></div>`, 'top-right', 3000);
        $('#txtPostulanteCorreo').focus();
        return;
    }
    try {
        const formData = new FormData();
        formData.append('op', 'addPostulanteConPostulacion');
        formData.append('IdVacante', idVacante);
        formData.append('Nombre', nombre);
        formData.append('ApellidoPaterno', apPaterno);
        formData.append('ApellidoMaterno', apMaterno);
        formData.append('CorreoElectronico', correo);
        formData.append('Telefono', telefono);
        formData.append('CURP', curp);
        formData.append('Direccion', direccion);
        formData.append('Estado', estado);
        formData.append('Ciudad', ciudad);
        formData.append('Observaciones', observaciones);
        if (idEmpleado) formData.append('IdEmpleado', idEmpleado);

        const fileCVInput = $('#filePostulanteCV');
        if (fileCVInput.length > 0 && fileCVInput[0].files.length > 0) {
            formData.append('CV', fileCVInput[0].files[0]);
        }

        const response = await $.ajax({ url: 'Backend/Postulantes/App.php', type: 'POST', data: formData, processData: false, contentType: false });
        const result = JSON.parse(response);
        if (result.Siguiente) {
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
            volverAListaPostulantes();
            loadPostulantes(idVacante);
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
        }
    } catch (error) {
        console.error('Error al agregar postulante:', error);
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al agregar el postulante.</span></div>`, 'top-right', 5000);
    }
}

// ==========================================
// DETALLE POSTULANTE (INLINE)
// ==========================================

async function showDetallePostulante(idEncoded) {
    $('#detalleIdPostulanteVacante').val(idEncoded);
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getPostulanteDetalle', IdPostulanteVacante: idEncoded });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data) {
            const p = result.Data;
            $('#detalleIdPostulante').val(p.IdPostulante);
            $('#detalleIdPostulanteVacanteNum').val(p.IdPostulanteVacante);
            $('#detallePostulanteNombreHidden').val(`${p.Nombre || ''} ${p.ApellidoPaterno || ''} ${p.ApellidoMaterno || ''}`.trim());
            window.currentIdPostulanteEncodedResultados = idEncoded;
            $('#edit_Nombre').val(p.Nombre || '');
            $('#edit_ApellidoPaterno').val(p.ApellidoPaterno || '');
            $('#edit_ApellidoMaterno').val(p.ApellidoMaterno || '');
            $('#edit_CURP').val(p.CURP || '');
            $('#edit_CorreoElectronico').val(p.CorreoElectronico || '');
            $('#edit_Estado').val(p.Estado || '');
            $('#edit_Ciudad').val(p.Ciudad || '');

             const nombreCompleto = `${p.Nombre || ''} ${p.ApellidoPaterno || ''} ${p.ApellidoMaterno || ''}`.trim();

             $('#detallePostulanteNombreHeader').text(nombreCompleto);
            $('#detallePostulantePuesto').text($('#nombreVacantePostulantes').text());
            $('#breadcrumbPostulanteNombre').text(nombreCompleto);
            $('#detallePostulanteStatus').attr('class', 'status-pill mt-1 ' + getStatusClass(p.EstatusPostulacion));
            $('#detallePostulanteStatus').text(getStatusText(p.EstatusPostulacion));

            if (window.PostulanteEditor && typeof window.PostulanteEditor.aplicarDireccionCompleta === 'function') {
                await window.PostulanteEditor.aplicarDireccionCompleta(p.Direccion || '', '');
                if (window.PostulanteEditor.updateDireccionPreview) window.PostulanteEditor.updateDireccionPreview();
            }

            $('#edit_Nombre, #edit_ApellidoPaterno, #edit_ApellidoMaterno, #edit_CURP, #edit_CorreoElectronico, #edit_CodigoPostal, #edit_Colonia, #edit_Calle, #edit_NumeroExterior, #edit_NumeroInterior').prop('disabled', true);
            $('#btnBuscarCP').prop('disabled', true);
            $('#editModeButtons').addClass('d-none');
            $('#btnToggleEditMode').html('<span class="material-symbols-outlined align-middle me-1">edit</span>Editar');
            $('#btnToggleEditMode').removeClass('btn-outline-secondary').addClass('btn-outline-primary');
            if (window.PostulanteEditor) window.PostulanteEditor.toggleEditMode = window.PostulanteEditor.toggleEditMode || toggleEditMode;
            if ($('#cpStatus').length) $('#cpStatus').text('');
            $('#detallePostulanteFecha').val(p.FechaPostulacion || 'N/A');

            if (typeof cargarTelefonosPostulante === 'function') {
                await cargarTelefonosPostulante(p.IdPostulante);
            }

            $('#cmbEstatusPostulante').val(p.EstatusPostulacion);
            $('#txtObservacionesEstatus').val('');

            await loadHistorialPostulante(idEncoded);
            await loadRequisitosPostulante(idEncoded);

            // Resetear tabs secundarios al primero
            const firstTab = document.getElementById('tab-dp-info-btn');
            showBootstrapTab(firstTab);

            $('#subVistaListaPostulantes').addClass('d-none');
            $('#wizardAddPostulante').addClass('d-none');
            $('#subVistaDetallePostulante').removeClass('d-none');
            syncDetallePostulanteEditButtonVisibility();
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">No se pudo cargar la información del postulante.</span></div>`, 'top-right', 5000);
        }
    } catch (error) {
        console.error('Error al cargar detalle de postulante:', error);
    }
}

function getStatusClass(estatus) {
    switch(parseInt(estatus)) {
        case 1: return 'en-proceso';
        case 2: return 'aceptado';
        case 3: return 'rechazado';
        case 4: return 'finalizado';
        default: return '';
    }
}

function getStatusText(estatus) {
    switch(parseInt(estatus)) {
        case 1: return 'En Proceso';
        case 2: return 'Aceptado';
        case 3: return 'Rechazado';
        case 4: return 'Finalizado';
        default: return 'Desconocido';
    }
}

function verResultadosPostulanteDesdeHeader() {
    const idEncoded = $('#detalleIdPostulanteVacante').val();
    const nombre = $('#detallePostulanteNombreHidden').val();
    if (idEncoded && nombre) {
        verResultadosPostulante(idEncoded, nombre);
    }
}

function verDocumentosPostulanteDesdeHeader() {
    const idNumerico = $('#detalleIdPostulanteVacanteNum').val();
    const nombre = $('#detallePostulanteNombreHidden').val();
    if (idNumerico && nombre) {
        openDocumentosPostulante(idNumerico, nombre);
    }
}

async function actualizarEstatusPostulante() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const estatus = $('#cmbEstatusPostulante').val();
    const observaciones = $('#txtObservacionesEstatus').val().trim();
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'updateEstatusPostulacion', IdPostulanteVacante: idPostulanteVacante, EstatusPostulacion: estatus, Observaciones: observaciones });
        const result = JSON.parse(response);
        if (result.Siguiente) {
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
            $('#txtObservacionesEstatus').val('');
            await loadHistorialPostulante(idPostulanteVacante);
            const idVacante = $('#postulantesIdVacante').val();
            if (idVacante) loadPostulantes(idVacante);
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
        }
    } catch (error) { console.error('Error al actualizar estatus:', error); }
}

async function loadHistorialPostulante(idPostulanteVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getPostulanteHistorial', IdPostulanteVacante: idPostulanteVacante });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="timeline-compact">';
            result.Data.forEach(h => {
                const isOk = h.Resultado == 1;
                const isNo = h.Resultado == 0;
                const markerClass = isOk ? 'success' : (isNo ? 'danger' : 'gray');
                const icon = isOk ? '<span class="material-symbols-outlined text-success" style="font-size:16px; vertical-align:middle;">check_circle</span>' : (isNo ? '<span class="material-symbols-outlined text-danger" style="font-size:16px; vertical-align:middle;">cancel</span>' : '');
                html += `
                    <div class="timeline-compact-item">
                        <div class="timeline-compact-marker ${markerClass}"></div>
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="me-3">
                                <p class="timeline-compact-title">${h.NombreProceso || 'Proceso'} ${icon}</p>
                                <p class="timeline-compact-sub">${h.Observaciones || 'Sin observaciones'}</p>
                            </div>
                            <span class="timeline-compact-time">${h.Fecha || ''}</span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            $('#listaHistorial').html(html);
        } else {
            $('#listaHistorial').html(`
                <div class="empty-state-card">
                    <span class="material-symbols-outlined">history</span>
                    <p>No hay historial de procesos registrado</p>
                </div>
            `);
        }
    } catch (error) { console.error('Error al cargar historial:', error); }
}

function showAddHistorialForm() {
    $('#cmbNuevoProceso').val('');
    $('#cmbResultadoProceso').val('');
    $('#txtObservacionesProceso').val('');
    $('#formAddHistorial').slideDown();
}
function hideAddHistorialForm() { $('#formAddHistorial').slideUp(); }

async function addHistorialProceso() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const idProceso = $('#cmbNuevoProceso').val();
    const resultado = $('#cmbResultadoProceso').val();
    const observaciones = $('#txtObservacionesProceso').val().trim();
    if (!idProceso) { showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Seleccione un proceso.</span></div>`, 'top-right', 3000); return; }
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'addPostulanteHistorial', IdPostulanteVacante: idPostulanteVacante, IdProceso: idProceso, Resultado: resultado, Observaciones: observaciones });
        const result = JSON.parse(response);
        if (result.Siguiente) {
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
            hideAddHistorialForm();
            loadHistorialPostulante(idPostulanteVacante);
        } else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000); }
    } catch (error) { console.error('Error al agregar historial:', error); }
}

async function loadRequisitosPostulante(idPostulanteVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getPostulanteRequisitos', IdPostulanteVacante: idPostulanteVacante });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="table-responsive"><table class="table table-sm table-bordered"><thead><tr><th>Requisito</th><th>Respuesta</th><th>Cumple</th><th>Acciones</th></tr></thead><tbody>';
            result.Data.forEach(r => {
                const idReqVacante = r.IdVacanteRequisito;
                const idReqPostulante = r.IdPostulanteRequisito || 0;
                html += `<tr><td>${r.Requisito || 'Requisito'}</td><td><input type="text" class="form-control form-control-sm" id="respRequisito_${idReqVacante}" value="${r.Respuesta || ''}" placeholder="Respuesta..."></td><td><select class="form-select form-select-sm" id="cumpleRequisito_${idReqVacante}"><option value="" ${!r.Cumple && r.Cumple !== 0 ? 'selected' : ''}>Pendiente</option><option value="1" ${r.Cumple == 1 ? 'selected' : ''}>Sí</option><option value="0" ${r.Cumple == 0 ? 'selected' : ''}>No</option></select></td><td><button class="btn btn-minimal btn-sm" onclick="updateRequisitoPostulante(${idReqPostulante}, ${idReqVacante})"><span class="material-symbols-outlined">save</span></button></td></tr>`;
            });
            html += '</tbody></table></div>';
            $('#listaRequisitosPostulante').html(html);
        } else { $('#listaRequisitosPostulante').html('<p class="text-muted text-center">No hay requisitos configurados para esta vacante</p>'); }
    } catch (error) { console.error('Error al cargar requisitos:', error); }
}

async function updateRequisitoPostulante(idPostulanteRequisito, idVacanteRequisito) {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const respuesta = $(`#respRequisito_${idVacanteRequisito}`).val();
    const cumple = $(`#cumpleRequisito_${idVacanteRequisito}`).val();
    try {
        let response;
        if (idPostulanteRequisito > 0) {
            response = await $.post('Backend/Postulantes/App.php', { op: 'updatePostulanteRequisito', IdPostulanteRequisito: btoa(idPostulanteRequisito), Respuesta: respuesta, Cumple: cumple });
        } else {
            response = await $.post('Backend/Postulantes/App.php', { op: 'addPostulanteRequisito', IdPostulanteVacante: idPostulanteVacante, IdVacanteRequisito: btoa(idVacanteRequisito), Respuesta: respuesta, Cumple: cumple });
        }
        const result = JSON.parse(response);
        if (result.Siguiente) {
            showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 3000);
            loadRequisitosPostulante(idPostulanteVacante);
        } else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000); }
    } catch (error) { console.error('Error al actualizar requisito:', error); }
}

async function preEliminarPostulacion(idEncoded) {
    $('#detalleIdPostulanteVacante').val(idEncoded);
    eliminarPostulacion();
}

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
            const response = await $.post('Backend/Postulantes/App.php', { op: 'deletePostulacion', IdPostulanteVacante: idPostulanteVacante });
            const result = JSON.parse(response);
            if (result.Siguiente) {
                showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">¡Completado!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000);
                volverAListaPostulantes();
                const idVacante = $('#postulantesIdVacante').val();
                if (idVacante) loadPostulantes(idVacante);
            } else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${result.Msg}</span></div>`, 'top-right', 5000); }
        } catch (error) { console.error('Error al eliminar postulación:', error); }
    }
}

// ==========================================
// DOCUMENTOS POSTULANTE
// ==========================================

function buildDownloadUrl(viewUrl) {
    if (!viewUrl) return '';
    return viewUrl.replace('op=viewArchivo', 'op=downloadArchivo');
}

function renderBotonesDocumentos(rutaCV, rutaSE, nombrePostulante) {
    const hasCV = !!rutaCV;
    const hasSE = !!rutaSE;
    let html = '<div class="d-flex flex-column gap-3 align-items-center justify-content-center py-3">';
    if (hasCV) {
        html += `<div class="w-100"><a href="${rutaCV}" target="_blank" class="btn btn-minimal btn-lg w-100 rounded-pill shadow-sm mb-2"><span class="material-symbols-outlined align-middle me-2">description</span> Ver CV</a><a href="${buildDownloadUrl(rutaCV)}" target="_blank" class="btn btn-ghost btn-sm w-100 rounded-pill"><span class="material-symbols-outlined align-middle me-1">download</span> Descargar CV</a></div>`;
    }
    if (hasSE) {
        html += `<div class="w-100"><a href="${rutaSE}" target="_blank" class="btn btn-minimal btn-lg w-100 rounded-pill shadow-sm mb-2"><span class="material-symbols-outlined align-middle me-2">assignment</span> Ver Solicitud</a><a href="${buildDownloadUrl(rutaSE)}" target="_blank" class="btn btn-ghost btn-sm w-100 rounded-pill"><span class="material-symbols-outlined align-middle me-1">download</span> Descargar Solicitud</a></div>`;
    }
    if (!hasCV && !hasSE) {
        html += `<div class="alert alert-warning w-100 text-center"><span class="material-symbols-outlined align-middle me-2 mb-1">folder_off</span><br><b>${nombrePostulante}</b> no ha adjuntado documentos.</div>`;
    }
    html += '</div>';
    return html;
}

function openDocumentosPostulante(idNumerico, nombrePostulante) {
    const row = postulantesData.find(p => p.IdPostulanteVacante == idNumerico);
    const rutaCV = (row && row.RutaCV) ? row.RutaCV : '';
    const rutaSE = (row && row.RutaSolicitudEmpleo) ? row.RutaSolicitudEmpleo : '';
    const html = renderBotonesDocumentos(rutaCV, rutaSE, nombrePostulante);
    $('#contenedorBotonesDocumentos').html(html);
    let modalEl = document.getElementById('modalDocumentosPostulante');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
    modal.show();
}

// ==========================================
// RESULTADOS DE EVALUACIÓN (INDIVIDUAL)
// ==========================================

async function verResultadosPostulante(idEncoded, nombre) {
    window.currentIdPostulanteEncodedResultados = idEncoded;
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getPostulanteResultadosEvaluaciones', IdPostulanteVacante: idEncoded });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            rawResultadosPostulante = result.Data;
            const evaluaciones = [...new Set(rawResultadosPostulante.map(item => item.NombreEvaluacion))];
            let options = '';
            evaluaciones.forEach(ev => { options += `<option value="${ev}">${ev}</option>`; });
            $('#selResultadosPostulante').html(options);
            $('#modalResultadosPostulanteLabel').html(`<span class="material-symbols-outlined align-middle me-2">analytics</span> Resultados - ${nombre}`);
            let modalEl = document.getElementById('modalResultadosPostulante');
            let modal = bootstrap.Modal.getInstance(modalEl);
            if (!modal) modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
            modal.show();
            $('#modalResultadosPostulante').on('shown.bs.modal', function () { drawResultadosPostulante(); $(this).off('shown.bs.modal'); });
        } else {
            showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">¡Aviso!</span><span class="alert-text">El postulante aún no tiene evaluaciones finalizadas registradas.</span></div>`, 'top-right', 4000);
        }
    } catch (err) { console.error('Error obteniendo gráficas de evaluación', err); }
}

function drawResultadosPostulante() {
    const seleccion = $('#selResultadosPostulante').val();
    if (!seleccion) return;
    let calificacionGeneral = 0;
    const datosFiltrados = rawResultadosPostulante.filter(i => i.NombreEvaluacion === seleccion);
    if (datosFiltrados.length > 0 && datosFiltrados[0].Calificacion !== null) calificacionGeneral = datosFiltrados[0].Calificacion;
    const _score = parseFloat(calificacionGeneral) || 0;
    const _scoreCls = _score >= 80 ? 'high' : _score >= 60 ? 'mid' : 'low';
    const _scoreLabel = _score >= 80 ? 'Excelente' : _score >= 60 ? 'Regular' : 'Bajo';
    const _ringColor = _score >= 80 ? '#198754' : _score >= 60 ? '#ffc407' : '#dc3545';
    $('#lblScoreGeneralPostulante').html(`
        <div class="d-flex align-items-center gap-3">
            <div class="score-ring score-ring-lg flex-shrink-0" style="background:conic-gradient(${_ringColor} ${Math.round(_score)}%, #f0f0f0 0deg);">
                <span class="score-ring-val">${_score.toFixed(1)}</span>
            </div>
            <div>
                <div style="font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:#6c757d;">Calificación General</div>
                <div style="font-size:1.8rem; font-weight:800; line-height:1.1; color:#1a1a2e;">${_score.toFixed(1)}<span style="font-size:.85rem; font-weight:400; color:#6c757d;">/100</span></div>
                <span class="score-badge-overall ${_scoreCls} mt-1 d-inline-block">${_scoreLabel}</span>
            </div>
        </div>
    `);
    const chartData = datosFiltrados.map(item => ({ competencia: item.Competencia || 'Sin Competencia', score: parseFloat(item.ScoreCompetencia) }));
    if (chartPostulanteGeneral) chartPostulanteGeneral.destroy();
    chartPostulanteGeneral = new ej.charts.Chart({
        isResponsive: true,
        palettes: yellowPalette,
        primaryXAxis: { valueType: 'Category', labelIntersectAction: 'MultipleRows' },
        primaryYAxis: { minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}' },
        series: [{ dataSource: chartData, width: 2, xName: 'competencia', yName: 'score', name: 'Resultados (Competencias)', type: 'Polar', drawType: 'Line', marker: { visible: true, width: 7, height: 7 } }],
        title: seleccion,
        tooltip: { enable: true }
    });
    chartPostulanteGeneral.appendTo('#chartPostulanteGeneral');
}

// ==========================================
// COMPARATIVO DE RESULTADOS
// ==========================================

async function showComparativoResultadosModal() {
    const comparativoTabBtn = document.getElementById('tab-comparativo-btn');
    showBootstrapTab(comparativoTabBtn);
    return loadComparativoResultadosTab();
}

function loadComparativoCandidatos() {
    const seleccion = $('#selComparativoEvaluaciones').val();
    if (!seleccion) return;
    const datosFiltrados = rawComparativoVacante.filter(i => i.NombreEvaluacion === seleccion);
    let candidatosUnicosInfo = [];
    datosFiltrados.forEach(i => {
        if (!candidatosUnicosInfo.find(c => c.Nombre === i.NombreCandidato)) {
            candidatosUnicosInfo.push({ Nombre: i.NombreCandidato, Calificacion: parseFloat(i.Calificacion || 0) });
        }
    });
    candidatosUnicosInfo.sort((a, b) => b.Calificacion - a.Calificacion);
    const $sel = $('#selCandidatosComparar');
    if ($sel.hasClass('select2-hidden-accessible')) $sel.select2('destroy');
    $sel.empty();
    candidatosUnicosInfo.forEach((candidatoObj) => {
        const option = new Option(candidatoObj.Nombre, candidatoObj.Nombre, true, true);
        $sel.append(option);
    });
    const primerosCinco = candidatosUnicosInfo.slice(0, 5).map(c => c.Nombre);
    $sel.val(primerosCinco);
    $sel.select2({ dropdownParent: $('#tabComparativo'), placeholder: 'Seleccionar candidatos...', width: '100%' })
        .on('change', function () { drawComparativoResultados(); updatePodiumActiveState(); });
    drawComparativoResultados();
    renderComparativoPodium(candidatosUnicosInfo);
}

function drawComparativoResultados() {
    const seleccion = $('#selComparativoEvaluaciones').val();
    if (!seleccion) return;
    const candidatosSeleccionados = $('#selCandidatosComparar').val() || [];
    const datosFiltrados = rawComparativoVacante.filter(i => i.NombreEvaluacion === seleccion && candidatosSeleccionados.includes(i.NombreCandidato));

    let seriesDataColumn = [];
    candidatosSeleccionados.forEach(candidato => {
        let datosCandidato = datosFiltrados.filter(i => i.NombreCandidato === candidato);
        seriesDataColumn.push({
            dataSource: datosCandidato.map(d => ({ competencia: d.Competencia || 'Sin Competencia', score: parseFloat(d.ScoreCompetencia) })),
            xName: 'competencia', yName: 'score', name: candidato, type: 'Column', columnSpacing: 0.1, cornerRadius: { topLeft: 4, topRight: 4 },
            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600' } } }
        });
    });
    if (chartComparativoVacanteColumn) chartComparativoVacanteColumn.destroy();
    chartComparativoVacanteColumn = new ej.charts.Chart({
        isResponsive: true, palettes: yellowPalette,
        primaryXAxis: { valueType: 'Category', labelIntersectAction: 'MultipleRows', majorGridLines: { width: 0 } },
        primaryYAxis: { minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}', majorTickLines: { width: 0 }, lineStyle: { width: 0 } },
        series: seriesDataColumn,
        title: `Comparativo de Competencias (Barras) - ${seleccion}`,
        tooltip: { enable: true },
        legendSettings: { visible: true, position: 'Bottom' }
    });
    chartComparativoVacanteColumn.appendTo('#chartComparativoVacanteColumn');

    let seriesDataRadar = [];
    candidatosSeleccionados.forEach(candidato => {
        let datosCandidato = datosFiltrados.filter(i => i.NombreCandidato === candidato);
        seriesDataRadar.push({
            dataSource: datosCandidato.map(d => ({ competencia: d.Competencia || 'Sin Competencia', score: parseFloat(d.ScoreCompetencia) })),
            xName: 'competencia', yName: 'score', name: candidato, type: 'Polar', drawType: 'Area', opacity: 0.4,
            marker: { visible: true, width: 6, height: 6, shape: 'Circle' }, border: { width: 2, color: 'transparent' }
        });
    });
    if (chartComparativoVacanteRadar) chartComparativoVacanteRadar.destroy();
    chartComparativoVacanteRadar = new ej.charts.Chart({
        isResponsive: true, palettes: yellowPalette,
        primaryXAxis: { valueType: 'Category', labelPlacement: 'OnTicks' },
        primaryYAxis: { minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}' },
        series: seriesDataRadar,
        title: `Comparativo de Competencias (Radar) - ${seleccion}`,
        tooltip: { enable: true },
        legendSettings: { visible: true, position: 'Bottom' }
    });
    chartComparativoVacanteRadar.appendTo('#chartComparativoVacanteRadar');

    $('#contenedorTablasComparativo').html('');
    if (candidatosSeleccionados.length === 0) return;
    const colCls = candidatosSeleccionados.length >= 3 ? 'col-md-4 col-sm-6'
                 : candidatosSeleccionados.length === 2 ? 'col-md-6'
                 : 'col-md-8 offset-md-2';
    let htmlCards = '';
    candidatosSeleccionados.forEach((candidato) => {
        let datosCandidato = datosFiltrados.filter(i => i.NombreCandidato === candidato);
        const overall = datosCandidato.length > 0 ? parseFloat(datosCandidato[0].Calificacion || 0) : 0;
        const overallCls = overall >= 80 ? 'high' : overall >= 60 ? 'mid' : 'low';
        let rowsHtml = '';
        datosCandidato.forEach(d => {
            const score = parseFloat(d.ScoreCompetencia || 0);
            const barCls = score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low';
            const isGeneral = (d.Competencia === 'General' || !d.Competencia);
            rowsHtml += `
            <div class="comp-row ${isGeneral ? 'general-row' : ''}">
                <span class="comp-name" title="${d.Competencia || 'General'}">${d.Competencia || 'General'}</span>
                <div class="comp-bar-wrap"><div class="comp-bar-track"><div class="comp-bar-fill ${barCls}" style="width:${score}%"></div></div></div>
                <span class="comp-score-val">${score.toFixed(1)}</span>
            </div>`;
        });
        htmlCards += `
        <div class="${colCls} mb-3">
            <div class="comparativo-candidate-card">
                <div class="cand-header">
                    <span class="cand-header-name">${candidato}</span>
                    <span class="score-badge-overall ${overallCls}">${overall.toFixed(1)}</span>
                </div>
                <div class="cand-body">${rowsHtml}</div>
            </div>
        </div>`;
    });
    $('#contenedorTablasComparativo').html(htmlCards);
}

function switchComparativoChart(type) {
    $('#btnChartColumn, #btnChartRadar')
        .removeClass('btn-warning active')
        .addClass('btn-outline-warning');
    $('#containerChartColumn, #containerChartRadar').addClass('d-none');
    if (type === 'column') {
        $('#btnChartColumn').removeClass('btn-outline-warning').addClass('btn-warning active');
        $('#containerChartColumn').removeClass('d-none');
        if (chartComparativoVacanteColumn) chartComparativoVacanteColumn.refresh();
    } else {
        $('#btnChartRadar').removeClass('btn-outline-warning').addClass('btn-warning active');
        $('#containerChartRadar').removeClass('d-none');
        if (chartComparativoVacanteRadar) chartComparativoVacanteRadar.refresh();
    }
}

function renderComparativoTable(tableSelector, tableData) {
    if (typeof Tabulator !== 'undefined') {
        new Tabulator(tableSelector, {
            data: tableData,
            layout: 'fitColumns',
            columns: [
                { title: 'COMPETENCIA', field: 'Competencia', headerHozAlign: 'center', widthGrow: 2 },
                { title: 'SCORE', field: 'Calificacion', hozAlign: 'center', headerHozAlign: 'center', widthGrow: 1 }
            ]
        });
        return;
    }

    const container = document.querySelector(tableSelector);
    if (!container) return;

    const rows = tableData.map(row => `
        <tr>
            <td>${row.Competencia}</td>
            <td class="text-center">${row.Calificacion}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-sm table-striped mb-0 align-middle">
                <thead>
                    <tr>
                        <th class="text-center">COMPETENCIA</th>
                        <th class="text-center">SCORE</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// ==========================================
// EVALUACIÓN RESPUESTAS
// ==========================================

function cerrarEvaluacionRespuestas() {
    let modalElResp = document.getElementById('modalEvaluacionRespuestas');
    let modalResp = bootstrap.Modal.getInstance(modalElResp);
    if (modalResp) modalResp.hide();
    let modalElResu = document.getElementById('modalResultadosPostulante');
    let modalResu = bootstrap.Modal.getInstance(modalElResu);
    if (modalResu) modalResu.show();
}

async function abrirEvaluacionRespuestas() {
    const seleccionEv = $('#selResultadosPostulante').val();
    if (!seleccionEv || !window.currentIdPostulanteEncodedResultados) {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">¡Atención!</span><span class="alert-text">Debes seleccionar una evaluación primero.</span></div>`, 'top-right', 3000);
        return;
    }
    let modalElResu = document.getElementById('modalResultadosPostulante');
    let modalResu = bootstrap.Modal.getInstance(modalElResu);
    if (modalResu) modalResu.hide();
    $('#contenedorEvaluacionRespuestas').html('<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Cargando evaluación...</p></div>');
    let modalElResp = document.getElementById('modalEvaluacionRespuestas');
    let modalResp = bootstrap.Modal.getInstance(modalElResp);
    if (!modalResp) modalResp = new bootstrap.Modal(modalElResp, { backdrop: 'static', keyboard: false });
    modalResp.show();
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getPostulanteRespuestasDetalle', IdPostulanteVacante: window.currentIdPostulanteEncodedResultados, NombreEvaluacion: seleccionEv });
        const result = JSON.parse(response);
        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '';
            result.Data.forEach((item, index) => {
                html += `<div class="card mb-4 shadow-sm border-0"><div class="card-body"><h6 class="fw-bold mb-1 d-flex align-items-start"><span class="badge bg-primary rounded-pill me-2 mt-1">${index + 1}</span><span>${item.TituloPregunta || 'Pregunta ' + (index + 1)}</span></h6>${item.Pregunta && item.Pregunta.trim() !== '' ? `<p class="mb-3 text-muted" style="margin-left: 2.2rem;">${item.Pregunta}</p>` : '<div class="mb-3"></div>'}`;
                if (item.Opciones && item.Opciones.length > 0) {
                    html += '<div class="list-group ps-4">';
                    item.Opciones.forEach(opt => {
                        let rPost = item.RespuestaPostulante ? String(item.RespuestaPostulante).trim().toLowerCase() : "";
                        let oI = opt.IdOpcion ? String(opt.IdOpcion).trim().toLowerCase() : "";
                        let oT = opt.Texto ? String(opt.Texto).trim().toLowerCase() : "";
                        let isSelected = (rPost !== "" && (rPost === oI || rPost === oT));
                        let isCorrectaOM = false;
                        let corrO = item.RespuestaCorrectaOM ? String(item.RespuestaCorrectaOM).trim().toLowerCase() : "";
                        let corrT = item.TextoRespuestaCorrectaOM ? String(item.TextoRespuestaCorrectaOM).trim().toLowerCase() : "";
                        if ((corrO !== "" && oI === corrO) || (corrT !== "" && oT === corrT)) isCorrectaOM = true;
                        let bgColor = "background-color: transparent;";
                        let borderColor = "border-color: #dee2e6;";
                        let iconOption = "";
                        if (isSelected) {
                            if (isCorrectaOM) { bgColor = "background-color: #d4edda;"; borderColor = "border-color: #c3e6cb;"; iconOption = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>'; }
                            else { bgColor = "background-color: #f8d7da;"; borderColor = "border-color: #f5c6cb;"; iconOption = '<span class="material-symbols-outlined text-danger ms-auto align-middle">cancel</span>'; }
                        } else if (isCorrectaOM) { bgColor = "background-color: #d4edda;"; borderColor = "border-color: #c3e6cb;"; iconOption = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>'; }
                        html += `<div class="list-group-item d-flex justify-content-between align-items-center mb-1 rounded-3" style="${bgColor} ${borderColor} border-width:1px; border-style:solid;"><span>${opt.Texto}</span>${iconOption}</div>`;
                    });
                    html += '</div>';
                } else if (item.BoolCorreta !== null) {
                    let rPostBool = item.RespuestaPostulante ? String(item.RespuestaPostulante).trim().toLowerCase() : "";
                    let isTrueSelected = (rPostBool == "1" || rPostBool == "true" || rPostBool == "verdadero");
                    let isFalseSelected = (rPostBool == "0" || rPostBool == "false" || rPostBool == "falso");
                    let trueIsCorrect = (item.BoolCorreta == "1");
                    let bgTrue = "", iconTrue = "";
                    if (isTrueSelected) {
                        if (trueIsCorrect) { bgTrue = "background-color: #d4edda; border-color: #c3e6cb;"; iconTrue = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>'; }
                        else { bgTrue = "background-color: #f8d7da; border-color: #f5c6cb;"; iconTrue = '<span class="material-symbols-outlined text-danger ms-auto align-middle">cancel</span>'; }
                    } else if (trueIsCorrect) { bgTrue = "background-color: #d4edda; border-color: #c3e6cb;"; iconTrue = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>'; }
                    let bgFalse = "", iconFalse = "";
                    if (isFalseSelected) {
                        if (!trueIsCorrect) { bgFalse = "background-color: #d4edda; border-color: #c3e6cb;"; iconFalse = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>'; }
                        else { bgFalse = "background-color: #f8d7da; border-color: #f5c6cb;"; iconFalse = '<span class="material-symbols-outlined text-danger ms-auto align-middle">cancel</span>'; }
                    } else if (!trueIsCorrect) { bgFalse = "background-color: #d4edda; border-color: #c3e6cb;"; iconFalse = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>'; }
                    html += `<div class="list-group ps-4 w-50"><div class="list-group-item d-flex justify-content-between align-items-center mb-1 rounded-3" style="${bgTrue} border-width:1px; border-style:solid;"><span>Verdadero</span> ${iconTrue}</div><div class="list-group-item d-flex justify-content-between align-items-center mb-1 rounded-3" style="${bgFalse} border-width:1px; border-style:solid;"><span>Falso</span> ${iconFalse}</div></div>`;
                } else {
                    html += `<div class="ps-4"><div class="p-3 bg-light rounded-3 text-dark mb-2">${item.RespuestaPostulante || '<em class="text-muted">Sin respuesta</em>'}</div></div>`;
                }
                html += `</div></div>`;
            });
            $('#contenedorEvaluacionRespuestas').html(html);
        } else {
            $('#contenedorEvaluacionRespuestas').html(`<div class="alert alert-warning m-4"><span class="material-symbols-outlined align-middle me-2">sentiment_dissatisfied</span>No se encontraron detalles para esta evaluación.</div>`);
        }
    } catch (err) {
        console.error('Error al abrir evaluación:', err);
        $('#contenedorEvaluacionRespuestas').html(`<div class="alert alert-danger m-4"><span class="material-symbols-outlined align-middle me-2">error</span>Ha ocurrido un error al cargar los datos.</div>`);
    }
}
