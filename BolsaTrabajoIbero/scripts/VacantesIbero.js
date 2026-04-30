/**
 * VacantesIbero.js — Lógica administrativa para gestión de vacantes Ibero.
 */

let tableVacantes;
let vacantesIbero = [];
let currentIdVacante = null;

const API_VACANTES = 'Backend/Vacantes/App.php';
const API_POSTULANTES = 'Backend/Postulantes/App.php';

// ==========================================
// HELPERS
// ==========================================
function enc(id) { return btoa(id); }

function showToast(type, msg) {
    toastr[type](msg);
}

// ==========================================
// CARGA INICIAL
// ==========================================
$(function() {
    initTable();
    loadVacantes();
    loadCombos();
});

function initTable() {
    tableVacantes = $('#tableVacantes').DataTable({
        language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-MX.json' },
        columns: [
            { data: 'IdVacante', width: '50px' },
            { data: 'NombreVacante' },
            { data: 'Empresa', defaultContent: '—' },
            { data: 'NombreArea', defaultContent: '—' },
            { data: 'TipoContratacion' },
            { data: 'FechaApertura' },
            { data: null, render: renderEstatus },
            { data: null, render: renderPublicada },
            { data: null, render: renderAcciones, orderable: false, width: '120px' }
        ],
        order: [[0,'desc']]
    });
}

function renderEstatus(row) {
    const cls = {1:'badge-borrador',2:'badge-activa',3:'badge-cerrada'}[row.Estatus] || 'badge-borrador';
    const txt = row.EstatusTexto || '';
    return `<span class="badge rounded-pill ${cls}">${txt}</span>`;
}

function renderPublicada(row) {
    return row.Publicada==1
        ? '<span class="badge bg-success">Sí</span>'
        : '<span class="badge bg-secondary">No</span>';
}

function renderAcciones(row) {
    const idEnc = enc(row.IdVacante);
    return `
    <div class="dropdown">
        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Opciones</button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" onclick="editarVacante('${idEnc}')">✏️ Editar</a></li>
            ${row.Publicada==0 ? `<li><a class="dropdown-item text-success" onclick="publicarVacante('${idEnc}')">📢 Publicar</a></li>` : ''}
            <li><a class="dropdown-item" onclick="verPostulantes('${idEnc}', '${row.NombreVacante.replace(/'/g,"\\'")}')">👥 Postulantes</a></li>
            <li><a class="dropdown-item text-primary" onclick="configurarEvals('${idEnc}', '${row.NombreVacante.replace(/'/g,"\\'")}')">📝 Eval. por Proceso</a></li>
            ${row.Publicada==0 ? `<li><hr class="dropdown-divider"><a class="dropdown-item text-danger" onclick="deleteVacante('${idEnc}')">🗑️ Eliminar</a></li>` : ''}
        </ul>
    </div>`;
}

function loadVacantes() {
    $.post(API_VACANTES, {op:'getVacantes'}, function(r) {
        vacantesIbero = Array.isArray(r) ? r : [];
        tableVacantes.clear().rows.add(vacantesIbero).draw();
        updateStats();
    }, 'json').fail(() => showToast('error','Error al cargar vacantes.'));
}

function updateStats() {
    $('#totalVacantes').text(vacantesIbero.length);
    $('#vacantesBorrador').text(vacantesIbero.filter(v=>v.Estatus==1).length);
    $('#vacantesActivas').text(vacantesIbero.filter(v=>v.Estatus==2).length);
    $('#vacantesCerradas').text(vacantesIbero.filter(v=>v.Estatus==3).length);
}

// ==========================================
// COMBOS
// ==========================================
function loadCombos() {
    $.post(API_VACANTES, {op:'getAreasTecnicasActivas'}, function(r) {
        const opts = r.map(a=>`<option value="${a.IdAreaTecnica}">${a.NombreArea}</option>`).join('');
        ['#cmbAreaTecnica','#editAreaTecnica'].forEach(sel => $(sel).append(opts));
    }, 'json');
    $.post(API_VACANTES, {op:'getPuestosActivos'}, function(r) {
        const opts = r.map(p=>`<option value="${p.IdPuesto}">${p.Puesto}</option>`).join('');
        ['#cmbPuesto','#editPuesto'].forEach(sel => $(sel).append(opts));
    }, 'json');
    $.post(API_VACANTES, {op:'getEmpresasActivas'}, function(r) {
        const opts = r.map(e=>`<option value="${e.IdEmpresa}">${e.Empresa}</option>`).join('');
        ['#cmbEmpresa','#editEmpresa'].forEach(sel => $(sel).append(opts));
    }, 'json');
}

// ==========================================
// AGREGAR VACANTE
// ==========================================
function prepareAddModal() {
    $('#txtNombreVacante,#txtSalarioMinimo,#txtSalarioMaximo,#txtFechaApertura,#txtFechaCierre,#txtDescripcionPuesto').val('');
    $('#cmbTipoContratacion,#cmbAreaTecnica,#cmbPuesto,#cmbEmpresa').val('');
    $('#chkBanderaCV,#chkBanderaSE').prop('checked',false);
}

$('#btnAddVacante').click(function() {
    const n = $('#txtNombreVacante').val().trim();
    const tc = $('#cmbTipoContratacion').val();
    const fa = $('#txtFechaApertura').val();
    if (!n||!tc||!fa) { showToast('warning','Los campos marcados con * son obligatorios.'); return; }
    $(this).prop('disabled',true).text('Guardando...');
    $.post(API_VACANTES, {
        op:'addVacante', NombreVacante:n, IdAreaTecnica:$('#cmbAreaTecnica').val()||'',
        IdPuesto:$('#cmbPuesto').val()||'', TipoContratacion:tc, IdEmpresa:$('#cmbEmpresa').val()||'',
        DescripcionPuesto:$('#txtDescripcionPuesto').val(), SalarioMinimo:$('#txtSalarioMinimo').val()||'',
        SalarioMaximo:$('#txtSalarioMaximo').val()||'', FechaApertura:fa,
        FechaCierre:$('#txtFechaCierre').val()||'',
        BanderaCV:$('#chkBanderaCV').is(':checked')?1:0, BanderaSE:$('#chkBanderaSE').is(':checked')?1:0
    }, function(r) {
        if (r.Resultado && r.Siguiente) {
            showToast('success', r.Msg);
            bootstrap.Modal.getInstance(document.getElementById('modalAddVacante')).hide();
            loadVacantes();
        } else { showToast('error', r.Msg||'Error.'); }
        $('#btnAddVacante').prop('disabled',false).text('Registrar Vacante');
    }, 'json').fail(()=>{ showToast('error','Error de conexión.'); $('#btnAddVacante').prop('disabled',false).text('Registrar Vacante'); });
});

// ==========================================
// EDITAR VACANTE
// ==========================================
function editarVacante(idEnc) {
    $.post(API_VACANTES, {op:'getVacanteById', IdVacante:idEnc}, function(r) {
        if (!r.Resultado || !r.Siguiente) { showToast('error','No se pudo cargar la vacante.'); return; }
        const v = r.Datos;
        $('#editIdVacante').val(idEnc);
        $('#editNombreVacante').val(v.NombreVacante);
        $('#editTipoContratacion').val(v.TipoContratacion);
        $('#editAreaTecnica').val(v.IdAreaTecnica);
        $('#editPuesto').val(v.IdPuesto);
        $('#editEmpresa').val(v.IdEmpresa);
        $('#editSalarioMinimo').val(v.SalarioMinimo);
        $('#editSalarioMaximo').val(v.SalarioMaximo);
        $('#editFechaApertura').val(v.FechaApertura);
        $('#editFechaCierre').val(v.FechaCierre);
        $('#editDescripcionPuesto').val(v.DescripcionPuesto);
        $('#editBanderaCV').prop('checked', v.BanderaCV==1);
        $('#editBanderaSE').prop('checked', v.BanderaSE==1);
        new bootstrap.Modal(document.getElementById('modalEditVacante')).show();
    }, 'json').fail(()=>showToast('error','Error.'));
}

$('#btnSaveEdit').click(function() {
    const idEnc = $('#editIdVacante').val();
    const n = $('#editNombreVacante').val().trim();
    const fa = $('#editFechaApertura').val();
    if (!n||!fa) { showToast('warning','Nombre y fecha de apertura son obligatorios.'); return; }
    $(this).prop('disabled',true).text('Guardando...');
    $.post(API_VACANTES, {
        op:'updateVacante', IdVacante:idEnc, NombreVacante:n,
        IdAreaTecnica:$('#editAreaTecnica').val()||'', IdPuesto:$('#editPuesto').val()||'',
        TipoContratacion:$('#editTipoContratacion').val(), IdEmpresa:$('#editEmpresa').val()||'',
        DescripcionPuesto:$('#editDescripcionPuesto').val(),
        SalarioMinimo:$('#editSalarioMinimo').val()||'', SalarioMaximo:$('#editSalarioMaximo').val()||'',
        FechaApertura:fa, FechaCierre:$('#editFechaCierre').val()||'',
        BanderaCV:$('#editBanderaCV').is(':checked')?1:0, BanderaSE:$('#editBanderaSE').is(':checked')?1:0
    }, function(r) {
        if (r.Resultado && r.Siguiente) {
            showToast('success', r.Msg);
            bootstrap.Modal.getInstance(document.getElementById('modalEditVacante')).hide();
            loadVacantes();
        } else { showToast('error', r.Msg||'Error.'); }
        $('#btnSaveEdit').prop('disabled',false).text('Guardar Cambios');
    }, 'json').fail(()=>{ showToast('error','Error.'); $('#btnSaveEdit').prop('disabled',false).text('Guardar Cambios'); });
});

// ==========================================
// PUBLICAR / ELIMINAR
// ==========================================
function publicarVacante(idEnc) {
    if (!confirm('¿Publicar esta vacante? Será visible en el portal público.')) return;
    $.post(API_VACANTES, {op:'publicarVacante', IdVacante:idEnc}, function(r) {
        if (r.Resultado) { showToast('success', r.Msg); loadVacantes(); }
        else showToast('error', r.Msg);
    }, 'json');
}

function deleteVacante(idEnc) {
    if (!confirm('¿Eliminar esta vacante?')) return;
    $.post(API_VACANTES, {op:'deleteVacante', IdVacante:idEnc}, function(r) {
        if (r.Resultado && r.Siguiente) { showToast('success', r.Msg); loadVacantes(); }
        else showToast('error', r.Msg);
    }, 'json');
}

function verPostulantes(idEnc, nombre) {
    window.location.href = `PostulantesVacanteIbero.php?id=${idEnc}&nombre=${encodeURIComponent(nombre)}`;
}

// ==========================================
// CONFIGURAR EVALUACIONES DE LA VACANTE
// ==========================================
function configurarEvals(idEnc, nombre) {
    $('#configIdVacante').val(idEnc);
    $('#lblNombreVacanteEvals').text(nombre);
    
    // Cargar combos si están vacíos
    if ($('#cmbEvalsProceso option').length <= 1) {
        $.post(API_VACANTES, {op:'getProcesosVacantesActivos'}, function(r) {
            if(Array.isArray(r)) r.forEach(p=>$('#cmbEvalsProceso').append(`<option value="${p.IdProceso}">${p.NombreProceso}</option>`));
        }, 'json');
        $.post(API_VACANTES, {op:'getEvaluacionesActivas'}, function(r) {
            if(Array.isArray(r)) r.forEach(e=>$('#cmbEvalsEvaluacion').append(`<option value="${e.idEvaluaciones}">${e.Titulo}</option>`));
        }, 'json');
    }
    
    cargarEvalsVacante(idEnc);
    new bootstrap.Modal(document.getElementById('modalConfigEvals')).show();
}

function cargarEvalsVacante(idEnc) {
    $('#tbodyEvalsVacante').html('<tr><td colspan="3" class="text-center text-muted">Cargando...</td></tr>');
    $.post(API_VACANTES, {op:'getEvaluacionesVacante', IdVacante:idEnc}, function(r) {
        if (!Array.isArray(r) || r.length===0) {
            $('#tbodyEvalsVacante').html('<tr><td colspan="3" class="text-center text-muted">Sin evaluaciones vinculadas.</td></tr>');
            return;
        }
        $('#tbodyEvalsVacante').html(r.map(e => `
            <tr>
                <td class="small fw-semibold text-muted">${e.NombreProceso}</td>
                <td class="small">${e.NombreEvaluacion}</td>
                <td class="text-end"><button class="btn btn-xs btn-outline-danger" style="padding:1px 5px;font-size:.7rem" onclick="deleteEvalVacante(${e.IdVacanteEvaluacion})">Quitar</button></td>
            </tr>
        `).join(''));
    }, 'json');
}

$('#btnVincularEval').click(function() {
    const idV = $('#configIdVacante').val();
    const idP = $('#cmbEvalsProceso').val();
    const idE = $('#cmbEvalsEvaluacion').val();
    if (!idP || !idE) { showToast('warning', 'Selecciona el proceso y la evaluación.'); return; }
    
    $(this).prop('disabled', true).text('...');
    $.post(API_VACANTES, {op:'addEvaluacionVacante', IdVacante:idV, IdProceso:idP, IdEvaluacion:idE}, function(r) {
        if (r.Resultado) { showToast('success', 'Evaluación vinculada.'); cargarEvalsVacante(idV); $('#cmbEvalsProceso,#cmbEvalsEvaluacion').val(''); }
        else showToast('error', r.Msg || 'Error al vincular.');
        $('#btnVincularEval').prop('disabled', false).text('Vincular');
    }, 'json');
});

function deleteEvalVacante(idVE) {
    if (!confirm('¿Quitar esta evaluación del proceso?')) return;
    $.post(API_VACANTES, {op:'deleteEvaluacionVacante', IdVacanteEvaluacion:idVE}, function(r) {
        if (r.Resultado) { showToast('success', 'Desvinculada correctamente.'); cargarEvalsVacante($('#configIdVacante').val()); }
        else showToast('error', r.Msg || 'Error al desvincular.');
    }, 'json');
}
