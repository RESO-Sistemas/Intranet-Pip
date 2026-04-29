/**
 * PostulanteDetalleIbero.js — Ficha completa de candidato Ibero.
 */
const API = 'Backend/Postulantes/App.php';
let modoEdicion = false;
let postulacionesData = [];
let idPVSeleccionado = null;

// ==========================================
// INIT
// ==========================================
$(function() {
    if (!ID_POSTULANTE) { toastr.error('ID inválido.'); return; }
    cargarDatosCandidato();
    cargarHistorialVacantes();
});

// ==========================================
// DATOS DEL CANDIDATO
// ==========================================
async function cargarDatosCandidato() {
    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getPostulanteById',IdPostulante:btoa(ID_POSTULANTE)},dataType:'json'});
        if (!r.Resultado || !r.Data) { toastr.warning('No se encontró el candidato.'); return; }
        const p = r.Data;
        $('#headerNombreCandidato').html(`<i data-lucide="user" style="width:22px;height:22px;vertical-align:middle;margin-right:6px;color:#c0392b;"></i> ${p.Nombre} ${p.ApellidoPaterno} ${p.ApellidoMaterno||''}`);
        $('#headerCURPCandidato').text(`CURP: ${p.CURP||'—'} | ${p.CorreoElectronico||''}`);
        $('#fNombre').val(p.Nombre||'');
        $('#fApPat').val(p.ApellidoPaterno||'');
        $('#fApMat').val(p.ApellidoMaterno||'');
        $('#fCURP').val(p.CURP||'');
        $('#fTelefono').val(p.Telefono||'');
        $('#fCorreo').val(p.CorreoElectronico||'');
        $('#fEstado').val(p.Estado||'');
        $('#fCiudad').val(p.Ciudad||'');
        $('#fDireccion').val(p.Direccion||'');
        lucide.createIcons();
    } catch(e) { toastr.error('Error al cargar datos.'); }
}

// ==========================================
// EDICIÓN
// ==========================================
function toggleEditMode() {
    modoEdicion = !modoEdicion;
    const campos = '#fNombre,#fApPat,#fApMat,#fCURP,#fTelefono,#fCorreo,#fEstado,#fCiudad,#fDireccion';
    $(campos).prop('disabled', !modoEdicion);
    $('#editButtons').toggle(modoEdicion);
    $('#btnToggleEdit').html(modoEdicion
        ? '<i data-lucide="x" style="width:12px;height:12px;"></i> Cancelar modo edición'
        : '<i data-lucide="edit" style="width:12px;height:12px;"></i> Editar');
    lucide.createIcons();
}

function cancelarEdicion() { modoEdicion = false; toggleEditMode(); cargarDatosCandidato(); }

async function guardarCandidato() {
    const id = btoa(ID_POSTULANTE);
    try {
        const r = await $.ajax({type:'POST', url:API, data:{
            op:'actualizarPostulanteCompleto',
            IdPostulante:id,
            Nombre:$('#fNombre').val(), ApellidoPaterno:$('#fApPat').val(), ApellidoMaterno:$('#fApMat').val(),
            CURP:$('#fCURP').val(), Telefono:$('#fTelefono').val(), CorreoElectronico:$('#fCorreo').val(),
            Direccion:$('#fDireccion').val(), Estado:$('#fEstado').val(), Ciudad:$('#fCiudad').val()
        }, dataType:'json'});
        if (r.Resultado) { toastr.success(r.Msg); cancelarEdicion(); cargarDatosCandidato(); }
        else toastr.error(r.Msg);
    } catch(e) { toastr.error('Error al guardar.'); }
}

// ==========================================
// HISTORIAL DE VACANTES + TIMELINE
// ==========================================
async function cargarHistorialVacantes() {
    $('#listaVacantes').html('<div class="text-muted small">Cargando...</div>');
    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getPostulanteHistorialCompleto',IdPostulante:btoa(ID_POSTULANTE)},dataType:'json'});
        if (!r.Resultado || !r.Data || !r.Data.length) {
            $('#listaVacantes').html('<div class="text-muted small">Sin postulaciones.</div>'); return;
        }
        postulacionesData = r.Data;
        renderListaVacantes(r.Data);
        // Auto-seleccionar primera
        seleccionarVacante(r.Data[0].IdPostulanteVacante, r.Data[0].NombreVacante);
    } catch(e) { $('#listaVacantes').html('<div class="text-danger small">Error.</div>'); }
}

function renderListaVacantes(list) {
    const c = {1:'warning',2:'success',3:'danger',4:'secondary'};
    $('#listaVacantes').html(list.map(pv => {
        const es = parseInt(pv.EstatusPostulacion);
        return `<a class="list-group-item list-group-item-action postulacion-item" data-id="${pv.IdPostulanteVacante}">
            <div class="fw-bold small">${pv.NombreVacante}</div>
            <div class="d-flex justify-content-between mt-1">
                <span class="badge bg-${c[es]||'secondary'}" style="font-size:.65rem;">${pv.EstatusTexto}</span>
                <span class="text-muted" style="font-size:.7rem;">${pv.FechaPostulacion?new Date(pv.FechaPostulacion).toLocaleDateString('es-MX'):''}</span>
            </div>
        </a>`;
    }).join(''));
    $('#listaVacantes .postulacion-item').on('click', function() {
        const id = $(this).data('id');
        const p  = postulacionesData.find(x=>String(x.IdPostulanteVacante)===String(id));
        seleccionarVacante(id, p?.NombreVacante||'');
    });
}

async function seleccionarVacante(idPV, nombre) {
    idPVSeleccionado = idPV;
    $('#listaVacantes .postulacion-item').removeClass('active');
    $(`#listaVacantes .postulacion-item[data-id="${idPV}"]`).addClass('active');
    $('#tituloVacante').text(nombre);
    $('#timelineProcesos').html('<div class="text-muted small">Cargando procesos...</div>');

    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getProcesosPostulacion',IdPostulanteVacante:btoa(idPV)},dataType:'json'});
        if (!r.Resultado || !r.Data || !r.Data.length) {
            $('#timelineProcesos').html('<div class="text-muted small">Sin procesos registrados.</div>');
        } else {
            $('#timelineProcesos').html(renderTimeline(r.Data));
        }
    } catch(e) { $('#timelineProcesos').html('<div class="text-danger small">Error.</div>'); }

    // Cargar evaluaciones de esta postulación
    cargarEvaluaciones(idPV);
    lucide.createIcons();
}

function renderTimeline(items) {
    return '<div class="timeline">' + items.map(h => {
        const ok = h.Resultado==1, no = h.Resultado==0;
        const color = ok ? '#28a745' : (no ? '#dc3545' : '#c0392b');
        const icon  = ok ? '✅' : (no ? '❌' : '');
        const fecha = h.Fecha ? new Date(h.Fecha).toLocaleDateString('es-MX') : '';
        return `<div class="timeline-item">
            <span class="timeline-marker" style="border-color:${color};${ok||no?'background:'+color:''}"></span>
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <p class="timeline-title">${h.NombreProceso||'Proceso'} ${icon}</p>
                    <p class="timeline-sub text-muted">${h.Observaciones||''}</p>
                </div>
                <span class="timeline-time">${fecha}</span>
            </div>
        </div>`;
    }).join('') + '</div>';
}

// ==========================================
// EVALUACIONES DE LA POSTULACIÓN
// ==========================================
async function cargarEvaluaciones(idPV) {
    $('#seccionEvaluaciones').html('<div class="text-muted small">Cargando evaluaciones...</div>');
    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getPostulanteResultadosEvaluaciones',IdPostulanteVacante:btoa(idPV)},dataType:'json'});
        if (!r.Resultado || !r.Data || !r.Data.length) {
            $('#seccionEvaluaciones').html('<p class="text-muted small">Sin evaluaciones asignadas en esta postulación.</p>'); return;
        }
        $('#seccionEvaluaciones').html(r.Data.map(e => {
            const cal = e.Calificacion!==null ? parseFloat(e.Calificacion).toFixed(1)+'%' : '—';
            const pct = e.Calificacion!==null ? Math.min(parseFloat(e.Calificacion),100) : 0;
            const color = pct>=70?'#27ae60':pct>=50?'#f39c12':'#c0392b';
            const cls = e.EstatusEvaluacion==3?'eval-completada':e.EstatusEvaluacion==2?'eval-en-progreso':'eval-pendiente';
            const resp = e.Respondidas||0, tot = e.TotalPreguntas||0;
            return `<div class="border rounded-3 p-3 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <strong>${e.NombreEvaluacion}</strong>
                        <div class="text-muted" style="font-size:.75rem;">${resp}/${tot} preguntas respondidas</div>
                    </div>
                    <div class="text-end">
                        <span class="eval-pill ${cls}">${e.TxEstatus}</span>
                        <div class="fw-bold" style="color:${color}">${cal}</div>
                    </div>
                </div>
                <div class="progress" style="height:6px;background:#eee;">
                    <div class="progress-bar" style="width:${pct}%;background:${color}"></div>
                </div>
            </div>`;
        }).join(''));
    } catch(e) { $('#seccionEvaluaciones').html('<p class="text-danger small">Error al cargar evaluaciones.</p>'); }
}
