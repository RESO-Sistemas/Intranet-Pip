/**
 * EvaluacionesIbero.js — Admin: Gestión de evaluaciones, preguntas y métricas.
 */
const API = 'Backend/EvaluacionesPostulante/App.php';
const API_VAC = 'Backend/Vacantes/App.php';
let currentIdEval = null;
let currentIdEvalNombre = '';

$(function() {
    cargarEvaluaciones();
    cargarCompetencias();
    cargarTiposPregunta();       // Carga catálogo desde API igual que PIP
    cargarEvalParaMetricas();
});

// ==========================================
// EVALUACIONES (LISTA)
// ==========================================
function cargarEvaluaciones() {
    $.post(API, {op:'getEvaluacionesAdmin'}, function(r) {
        const grid = document.getElementById('grid-evaluaciones');
        if (!r.Resultado || !r.Data || !r.Data.length) {
            grid.innerHTML = '<div class="col-12 text-center py-5 text-muted">No hay evaluaciones. Crea una nueva.</div>'; return;
        }
        grid.innerHTML = r.Data.map(e => {
            const activa = e.PreguntasAceptadas==1;
            const badgeTipo = e.TipoEvaluacion==1
                ? '<span class="badge bg-info tipo-badge">360°</span>'
                : '<span class="badge bg-secondary tipo-badge">Normal</span>';
            return `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <div class="card-header d-flex justify-content-between align-items-start">
                        <span class="fw-bold small">${e.Titulo}</span>
                        ${badgeTipo}
                    </div>
                    <div class="card-body py-2">
                        <p class="text-muted small mb-1">Preguntas: <strong>${e.TotalPreguntas||0}</strong></p>
                        <p class="text-muted small mb-1">Vigencia: ${e.FechaInicio} → ${e.FechaFin}</p>
                        <p class="mb-0">
                            <span class="badge ${activa?'bg-success':'bg-warning text-dark'}">${activa?'Activa':'Borrador'}</span>
                        </p>
                    </div>
                    <div class="card-footer d-flex gap-1">
                        <button class="btn btn-sm btn-outline-danger flex-fill" onclick="abrirPreguntas(${e.idEvaluaciones},'${e.Titulo.replace(/'/g,"\\'")}')">
                            ✏️ Preguntas
                        </button>
                        ${!activa?`<button class="btn btn-sm btn-success flex-fill" onclick="activarEval(${e.idEvaluaciones})">✓ Activar</button>`:''}
                    </div>
                </div>
            </div>`;
        }).join('');
    }, 'json').fail(() => toastr.error('Error al cargar evaluaciones.'));
}

// ==========================================
// CREAR EVALUACIÓN
// ==========================================
$('#btnAddEval').click(function() {
    const t = $('#txtTituloEval').val().trim();
    const tipo = $('#cmbTipoEval').val();
    const fi = $('#txtFechaInicioEval').val();
    const ff = $('#txtFechaFinEval').val();
    if (!t || !fi || !ff) { toastr.warning('Título y fechas son obligatorios.'); return; }
    $(this).prop('disabled',true).text('Guardando...');
    $.post(API, {op:'addEvaluacion',Titulo:t,TipoEvaluacion:tipo,FechaInicio:fi,FechaFin:ff}, function(r) {
        if (r.Resultado) {
            toastr.success(r.Msg);
            bootstrap.Modal.getInstance(document.getElementById('modalAddEval')).hide();
            $('#txtTituloEval').val(''); cargarEvaluaciones();
        } else toastr.error(r.Msg);
        $('#btnAddEval').prop('disabled',false).text('Crear Evaluación');
    }, 'json');
});

function activarEval(id) {
    $.post(API, {op:'activarEvaluacion',idEvaluacion:id}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg); cargarEvaluaciones(); }
        else toastr.error(r.Msg);
    }, 'json');
}

// ==========================================
// PREGUNTAS
// ==========================================
function abrirPreguntas(idEval, titulo) {
    currentIdEval = idEval;
    currentIdEvalNombre = titulo;
    $('#preguntaIdEval').val(idEval);
    $('#modalPreguntasTitulo').text('Preguntas: ' + titulo);
    $('#btnActivarEval').off('click').click(() => activarEval(idEval));
    cargarPreguntas();
    new bootstrap.Modal(document.getElementById('modalPreguntas')).show();
}

function cargarPreguntas() {
    $.post(API, {op:'getPreguntasAdmin',idEvaluacion:currentIdEval}, function(r) {
        const lista = document.getElementById('lista-preguntas');
        if (!r.Resultado || !r.Data || !r.Data.length) {
            lista.innerHTML = '<p class="text-muted text-center py-3 small">Sin preguntas aún. Agrega la primera.</p>'; return;
        }
        const TIPO_COLOR = {'Opción Múltiple':'danger','Verdadero / Falso':'warning','Texto Libre':'info','Rango':'secondary'};
        lista.innerHTML = r.Data.map((p, i) => {
            const tipoBadge = `<span class="badge bg-${TIPO_COLOR[p.TipoPregunta]||'secondary'} badge-tipo">${p.TipoPregunta}</span>`;
            let opcionesHtml = '';
            if (p.Multiple1R == 1) {
                if (p.Opciones && p.Opciones.length) {
                    opcionesHtml = `<div class="mt-2">${p.Opciones.map(o =>
                        `<div class="d-flex justify-content-between align-items-center small py-1 border-bottom">
                            <span>${o.DescripcionRespuesta}</span>
                            <button class="btn btn-xs btn-outline-danger" style="font-size:.7rem;padding:1px 5px" onclick="deleteOpcion(${o.idPreguntasPosiblesRespuestas})">✕</button>
                        </div>`).join('')}
                        <div class="input-group input-group-sm mt-1">
                            <input type="text" class="form-control form-control-sm new-opcion-txt" placeholder="Nueva opción...">
                            <button class="btn btn-outline-danger btn-sm" onclick="addOpcion(${p.idPreguntasEvaluacion},this)">+</button>
                        </div></div>`;
                } else {
                    opcionesHtml = `<div class="mt-2"><div class="input-group input-group-sm">
                        <input type="text" class="form-control form-control-sm new-opcion-txt" placeholder="Primera opción...">
                        <button class="btn btn-outline-danger btn-sm" onclick="addOpcion(${p.idPreguntasEvaluacion},this)">+</button>
                    </div></div>`;
                }
            }
            const configLabel = p.Config ? `<span class="badge bg-success badge-tipo">✓ Con resp. correcta</span>` : '';
            return `<div class="pregunta-card">
                <div class="d-flex justify-content-between">
                    <div class="pregunta-header">${i+1}. ${p.Titulo} ${tipoBadge} ${configLabel}</div>
                    <div class="d-flex gap-1">
                        <button class="btn btn-xs btn-outline-primary" style="font-size:.7rem;padding:2px 6px" onclick="editarPregunta(${p.idPreguntasEvaluacion},'${(p.Titulo||'').replace(/'/g,"\\'").replace(/"/g,'&quot;')}',${p.idTipoPregunta},${p.Orden},${p.idCompetencias||'null'},${p.Config?p.Config.RangoInicial:1},${p.Config?p.Config.RangoFinal:10})">✏️</button>
                        <button class="btn btn-xs btn-outline-secondary" style="font-size:.7rem;padding:2px 6px" onclick="abrirRespCorrecta(${p.idPreguntasEvaluacion},${p.Bool == 1 ? "'Bool'" : (p.Multiple1R == 1 ? "'OM'" : (p.Rango == 1 ? "'Rango'" : "'Texto'"))},${JSON.stringify(p.Opciones||[]).replace(/"/g,'&quot;').replace(/'/g,'&#39;')})">🎯</button>
                        <button class="btn btn-xs btn-outline-danger" style="font-size:.7rem;padding:2px 6px" onclick="deletePregunta(${p.idPreguntasEvaluacion})">🗑️</button>
                    </div>
                </div>
                ${p.Competencia?`<div class="text-muted" style="font-size:.75rem;">Competencia: ${p.Competencia}</div>`:''}
                ${opcionesHtml}
            </div>`;
        }).join('');
    }, 'json');
}

// Agregar / Editar pregunta
$('#btnAddPregunta').click(function() {
    const idEval = $('#preguntaIdEval').val();
    const editId = $('#editPreguntaId').val();
    const t  = $('#txtPreguntaTitulo').val().trim();
    const idTipo = $('#cmbTipoPregunta').val();
    const o  = $('#txtOrdenPregunta').val()||1;
    const comp = $('#cmbCompetencia').val()||null;
    const ri = $('#txtRangoMin').val()||1;
    const rf = $('#txtRangoMax').val()||10;
    if (!t) { toastr.warning('Escribe el texto de la pregunta.'); return; }
    $(this).prop('disabled',true).text('...');
    
    const action = editId ? 'editPregunta' : 'addPregunta';
    const payload = {op:action, idEvaluacion:idEval, Titulo:t, idTipoPregunta:idTipo, Orden:o, idCompetencia:comp||'', RangoInicial:ri, RangoFinal:rf};
    if (editId) payload.idPregunta = editId;

    $.post(API, payload, function(r) {
        if (r.Resultado) { 
            toastr.success(r.Msg); 
            cancelEditPregunta();
            cargarPreguntas(); 
        } else toastr.error(r.Msg);
        $('#btnAddPregunta').prop('disabled',false).text(editId ? 'Guardar Cambios' : 'Agregar Pregunta');
    }, 'json');
});

function editarPregunta(idPregunta, titulo, tipo, orden, competencia, rmin, rmax) {
    $('#editPreguntaId').val(idPregunta);
    $('#btnAddPregunta').text('Guardar Cambios');
    $('#btnCancelEdit').show();
    $('#txtPreguntaTitulo').val(titulo);
    $('#cmbTipoPregunta').val(tipo);
    $('#txtOrdenPregunta').val(orden);
    $('#cmbCompetencia').val(competencia || '');
    $('#txtRangoMin').val(rmin || 1);
    $('#txtRangoMax').val(rmax || 10);
    toggleCamposRango();
}

function cancelEditPregunta() {
    $('#editPreguntaId').val('');
    $('#btnAddPregunta').text('Agregar Pregunta');
    $('#btnCancelEdit').hide();
    $('#txtPreguntaTitulo').val('');
    $('#txtOrdenPregunta').val(1);
    $('#cmbCompetencia').val('');
    $('#txtRangoMin').val(1);
    $('#txtRangoMax').val(10);
}

$('#btnCancelEdit').click(cancelEditPregunta);

function deletePregunta(id) {
    if (!confirm('¿Eliminar esta pregunta?')) return;
    $.post(API, {op:'deletePregunta',idPregunta:btoa(id)}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg); cargarPreguntas(); }
        else toastr.error(r.Msg);
    }, 'json');
}

function addOpcion(idPregunta, btn) {
    const input = $(btn).closest('.input-group').find('.new-opcion-txt');
    const texto = input.val().trim();
    if (!texto) { toastr.warning('Escribe el texto de la opción.'); return; }
    $.post(API, {op:'addOpcion',idPregunta:idPregunta,DescripcionRespuesta:texto}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg); cargarPreguntas(); }
        else toastr.error(r.Msg);
    }, 'json');
}

function deleteOpcion(idOpcion) {
    $.post(API, {op:'deleteOpcion',idOpcion:idOpcion}, function(r) {
        if (r.Resultado) cargarPreguntas();
        else toastr.error(r.Msg);
    }, 'json');
}

// Respuesta correcta
function abrirRespCorrecta(idPregunta, tipo, opciones) {
    $('#rcIdPregunta').val(idPregunta);
    $('#rcTipoPregunta').val(tipo);
    
    $('#rc-bool').hide(); $('#rc-om').hide(); $('#rc-rango').hide(); $('#rc-texto').hide();
    
    if (tipo === 'Bool') {
        $('#rc-bool').show(); $('#cmbRCBool').val('');
    } else if (tipo === 'OM') {
        $('#rc-om').show();
        const sel = $('#cmbRCOM'); sel.html('<option value="">Sin respuesta correcta</option>');
        opciones.forEach(o => sel.append(`<option value="${o.idPreguntasPosiblesRespuestas}">${o.DescripcionRespuesta}</option>`));
    } else if (tipo === 'Rango') {
        $('#rc-rango').show(); $('#txtRCRango').val('');
    } else if (tipo === 'Texto') {
        $('#rc-texto').show(); $('#txtRCTexto').val('');
    }
    new bootstrap.Modal(document.getElementById('modalRespCorrecta')).show();
}

$('#btnGuardarRC').click(function() {
    const id = $('#rcIdPregunta').val();
    const tipo = $('#rcTipoPregunta').val();
    
    let bool = null, om = null, rango = null, texto = null;
    
    if (tipo === 'Bool') bool = $('#cmbRCBool').val() || null;
    if (tipo === 'OM') om = $('#cmbRCOM').val() || null;
    if (tipo === 'Rango') rango = $('#txtRCRango').val() || null;
    if (tipo === 'Texto') texto = $('#txtRCTexto').val() || null;
    
    $.post(API, {op:'setRespuestaCorrecta',idPregunta:id,BoolCorreta:bool||'',RespuestaCorrectaOM:om||'',RespuestaCorrectaRango:rango||'',RespuestaCorrectaTexto:texto||''}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg); bootstrap.Modal.getInstance(document.getElementById('modalRespCorrecta')).hide(); cargarPreguntas(); }
        else toastr.error(r.Msg);
    }, 'json');
});

// ==========================================
// TIPOS DE PREGUNTA (catálogo desde API)
// ==========================================
let tiposPregunta = [];
function cargarTiposPregunta() {
    $.post(API, {op:'getTiposPregunta'}, function(r) {
        if (!Array.isArray(r)) return;
        tiposPregunta = r;
        const sel = $('#cmbTipoPregunta').empty();
        r.forEach(t => sel.append(`<option value="${t.idTipoPregunta}" data-bool="${t.Bool}" data-om="${t.Multiple1R}" data-rango="${t.Rango}">${t.Descripcion}</option>`));
        toggleCamposRango();
    }, 'json');
}

function toggleCamposRango() {
    const opt = $('#cmbTipoPregunta option:selected');
    const esRango = parseInt(opt.data('rango') || 0) === 1;
    const esOM    = parseInt(opt.data('om') || 0) === 1;
    $('#row-rango').toggle(esRango);
    $('#row-opciones-label').toggle(esOM);
}

function cargarCompetencias() {
    $.post(API, {op:'getCompetencias'}, function(r) {
        if (Array.isArray(r)) r.forEach(c => $('#cmbCompetencia').append(`<option value="${c.idCompetencias}">${c.Competencia}</option>`));
    }, 'json');
}

// ==========================================
// MÉTRICAS
// ==========================================
function cargarEvalParaMetricas() {
    $.post(API_VAC, {op:'getProcesosVacantesActivos'}, function() {}, 'json');
    // Cargar evaluaciones activas con su VacanteEvaluacion
    $.ajax({
        type:'POST', url:API_VAC,
        data:{op:'getVacantes'}, dataType:'json',
        success: function(vacantes) {
            if (!Array.isArray(vacantes)) return;
            const sel = $('#cmbMetricaEval');
            vacantes.forEach(v => {
                $.post(API_VAC, {op:'getEvaluacionesVacante',IdVacante:btoa(v.IdVacante)}, function(evs) {
                    if (Array.isArray(evs)) evs.forEach(e => {
                        sel.append(`<option value="${e.IdVacanteEvaluacion}">[${v.NombreVacante}] ${e.NombreEvaluacion} — ${e.NombreProceso}</option>`);
                    });
                }, 'json');
            });
        }
    });
}

function cargarMetricas() {
    const idVE = $('#cmbMetricaEval').val();
    if (!idVE) { toastr.warning('Selecciona una evaluación.'); return; }
    const panel = document.getElementById('panel-metricas');
    panel.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-danger"></div></div>';
    $.post(API, {op:'getMetricasEvaluacion',IdVacanteEvaluacion:idVE}, function(r) {
        if (!r.Resultado) { panel.innerHTML='<div class="alert alert-danger">Error al cargar métricas.</div>'; return; }
        const s = r.Resumen;
        const prom = s.PromedioCalificacion ? parseFloat(s.PromedioCalificacion).toFixed(1) : '—';
        panel.innerHTML = `
        <div class="row g-3 mb-4">
            <div class="col-md-2"><div class="card card-metric text-center py-3"><h3 class="ibero">${s.Total||0}</h3><small class="text-muted">Total</small></div></div>
            <div class="col-md-2"><div class="card card-metric text-center py-3"><h3 class="text-warning">${s.Pendientes||0}</h3><small class="text-muted">Pendientes</small></div></div>
            <div class="col-md-2"><div class="card card-metric text-center py-3"><h3 class="text-info">${s.EnProgreso||0}</h3><small class="text-muted">En Progreso</small></div></div>
            <div class="col-md-2"><div class="card card-metric text-center py-3"><h3 class="text-success">${s.Completadas||0}</h3><small class="text-muted">Completadas</small></div></div>
            <div class="col-md-2"><div class="card card-metric text-center py-3"><h3 class="ibero">${prom}%</h3><small class="text-muted">Promedio</small></div></div>
            <div class="col-md-2"><div class="card card-metric text-center py-3">
                <h3 class="text-success">${s.MaxCalificacion?parseFloat(s.MaxCalificacion).toFixed(1)+'%':'—'}</h3><small class="text-muted">Máximo</small></div></div>
        </div>
        <div class="card shadow-sm">
            <div class="card-header fw-bold">Detalle por Candidato</div>
            <div class="card-body p-0">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light"><tr>
                        <th>Candidato</th><th>CURP</th><th>Estatus</th>
                        <th>Calificación</th><th>Inicio</th><th>Fin</th><th></th>
                    </tr></thead>
                    <tbody>${(r.Detalle||[]).map(d => {
                        const cal = d.Calificacion ? parseFloat(d.Calificacion).toFixed(1)+'%' : '—';
                        const prog = d.Calificacion ? parseFloat(d.Calificacion) : 0;
                        const statusColor = d.EstatusEvaluacion==3?'success':d.EstatusEvaluacion==2?'info':'warning';
                        return `<tr>
                            <td>${d.Nombre} ${d.ApellidoPaterno}</td>
                            <td><code class="small">${d.CURP}</code></td>
                            <td><span class="badge bg-${statusColor}">${d.TxEstatus}</span></td>
                            <td><div class="d-flex align-items-center gap-2">
                                <div class="progress flex-fill progress-ibero" style="height:8px;width:80px;">
                                    <div class="progress-bar" style="width:${prog}%"></div>
                                </div>
                                <span class="small fw-bold">${cal}</span>
                            </div></td>
                            <td class="small text-muted">${d.FechaInicio||'—'}</td>
                            <td class="small text-muted">${d.FechaFin||'—'}</td>
                            <td>${d.EstatusEvaluacion==3?`<button class="btn btn-xs btn-outline-danger" style="font-size:.7rem;padding:2px 7px" onclick="verRespuestas(${d.IdPostulanteEvaluacion},'${d.Nombre} ${d.ApellidoPaterno}')">Ver resp.</button>`:''}</td>
                        </tr>`;
                    }).join('')}</tbody>
                </table>
            </div>
        </div>`;
    }, 'json');
}

function verRespuestas(idPE, nombre) {
    document.getElementById('tituloRespDetalle').textContent = 'Respuestas: ' + nombre;
    document.getElementById('bodyRespDetalle').innerHTML = '<div class="text-center py-4"><div class="spinner-border text-danger"></div></div>';
    new bootstrap.Modal(document.getElementById('modalRespDetalle')).show();
    $.post(API, {op:'getRespuestasDetalle',IdPostulanteEvaluacion:btoa(idPE)}, function(r) {
        const body = document.getElementById('bodyRespDetalle');
        if (!r.Resultado || !r.Data || !r.Data.length) { body.innerHTML='<p class="text-muted text-center py-4">Sin respuestas.</p>'; return; }
        body.innerHTML = r.Data.map((resp, i) => {
            const esCorrecta = checkCorrecta(resp);
            const icono = resp.RespCorrecta!==null||resp.RespCorrectaOM ? (esCorrecta?'✅':'❌') : '📝';
            return `<div class="d-flex gap-3 py-2 border-bottom align-items-start">
                <span style="font-size:1.1rem;">${icono}</span>
                <div class="flex-fill">
                    <div class="small fw-bold text-muted">${i+1}. ${resp.Pregunta} <span class="badge bg-secondary ms-1" style="font-size:.6rem;">${resp.TipoPregunta}</span></div>
                    <div class="fw-semibold">${resp.Respuesta||'—'}</div>
                    ${(resp.RespCorrecta!==null && resp.RespCorrecta!==undefined)||resp.RespCorrectaOM
                        ?`<div class="text-muted small">Correcta: ${resp.RespCorrectaOM||resp.RespCorrecta}</div>`:''}
                </div>
            </div>`;
        }).join('');
    }, 'json');
}

function checkCorrecta(resp) {
    if (resp.RespCorrecta !== null && resp.RespCorrecta !== undefined && resp.RespCorrecta !== '') {
        return String(resp.Respuesta) === String(resp.RespCorrecta);
    }
    if (resp.RespCorrectaOM) {
        return resp.Respuesta === resp.RespCorrectaOM;
    }
    if (resp.RespuestaCorrectaRango !== null && resp.RespuestaCorrectaRango !== undefined && resp.RespuestaCorrectaRango !== '') {
        return String(resp.Respuesta) === String(resp.RespuestaCorrectaRango);
    }
    if (resp.RespuestaCorrectaTexto !== null && resp.RespuestaCorrectaTexto !== undefined && resp.RespuestaCorrectaTexto !== '') {
        return String(resp.Respuesta).toLowerCase() === String(resp.RespuestaCorrectaTexto).toLowerCase();
    }
    return false;
}
