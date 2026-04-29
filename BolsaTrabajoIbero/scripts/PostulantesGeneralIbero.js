/**
 * PostulantesGeneralIbero.js — Base de datos de candidatos Ibero.
 * Replicación del patrón de PIP: tabla + panel todo-inbox.
 */
const API = 'Backend/Postulantes/App.php';
let tablePostulantes;
let postulantesData = [];
let selectedPostulaciones = [];

// ==========================================
// TABLA PRINCIPAL
// ==========================================
function initTable() {
    tablePostulantes = $('#tablePostulantesGeneral').DataTable({
        data: [],
        columns: [
            { data: 'CURP', render: d => d || '—' },
            { data: 'NombreCompleto', render: d => `<strong>${d}</strong>` },
            { data: 'PrimeraPostulacion', render: d => d ? new Date(d).toLocaleDateString('es-MX') : '—' },
            { data: 'UltimaVacante', render: d => d || '—' },
            {
                data: 'UltimoEstatus',
                render: d => {
                    const m = {1:'En Proceso',2:'Aceptado',3:'Descartado',4:'Finalizado'};
                    const c = {1:'warning',2:'success',3:'danger',4:'secondary'};
                    const e = parseInt(d);
                    return `<span class="badge bg-${c[e]||'secondary'}">${m[e]||'—'}</span>`;
                }
            },
            { data: 'TotalPostulaciones', render: d => `<span class="badge bg-dark">${d||0}</span>` },
            {
                data: null,
                orderable: false,
                render: (d,t,row) => `
                    <a href="PostulanteDetalleIbero.php?id=${row.IdPostulante}" class="btn btn-sm btn-outline-danger" title="Ver detalle">
                        <i data-lucide="eye" style="width:14px;height:14px;"></i>
                    </a>`
            }
        ],
        language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
        responsive: true,
        order: [[2,'desc']]
    });

    // Click en fila → carga historial en el panel
    $('#tablePostulantesGeneral tbody').on('click', 'tr', function() {
        const row = tablePostulantes.row(this).data();
        if (!row) return;
        $('#tablePostulantesGeneral tbody tr').removeClass('selected');
        $(this).addClass('selected');
        cargarHistorialPostulante(row.IdPostulante, row.NombreCompleto);
        lucide.createIcons();
    });
}

async function cargarCandidatos() {
    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getAllPostulantesGeneral'},dataType:'json'});
        if (r.Resultado && r.Data) {
            postulantesData = r.Data;
            tablePostulantes.clear().rows.add(r.Data).draw();
            lucide.createIcons();
        }
    } catch(e) { toastr.error('Error al cargar candidatos.'); }
}

// ==========================================
// PANEL TODO-INBOX: HISTORIAL
// ==========================================
async function cargarHistorialPostulante(idPostulante, nombre) {
    $('#tituloProcesos').text(nombre);
    $('#listaPostulaciones').html('<div class="text-muted small">Cargando...</div>');
    $('#timelineProcesos').html('<div class="text-muted small">Selecciona una postulación.</div>');

    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getPostulanteHistorialCompleto',IdPostulante:btoa(idPostulante)},dataType:'json'});
        if (!r.Resultado || !r.Data || !r.Data.length) {
            $('#listaPostulaciones').html('<div class="text-muted small">Sin postulaciones.</div>'); return;
        }
        selectedPostulaciones = r.Data;
        renderPostulacionesList(r.Data);
        // Auto-seleccionar primera
        if (r.Data[0]) cargarProcesos(r.Data[0].IdPostulanteVacante, r.Data[0].NombreVacante);
    } catch(e) { $('#listaPostulaciones').html('<div class="text-danger small">Error al cargar.</div>'); }
}

function renderPostulacionesList(list) {
    const html = list.map(pv => {
        const c = {1:'warning',2:'success',3:'danger',4:'secondary'};
        const es = parseInt(pv.EstatusPostulacion);
        return `<a class="list-group-item list-group-item-action postulacion-item" data-id="${pv.IdPostulanteVacante}">
                    <div class="fw-bold small">${pv.NombreVacante}</div>
                    <div class="d-flex justify-content-between align-items-center mt-1">
                        <span class="badge bg-${c[es]||'secondary'}" style="font-size:.65rem;">${pv.EstatusTexto}</span>
                        <span class="text-muted" style="font-size:.7rem;">${pv.FechaPostulacion?new Date(pv.FechaPostulacion).toLocaleDateString('es-MX'):''}</span>
                    </div>
                </a>`;
    }).join('');
    $('#listaPostulaciones').html(html);
    $('#listaPostulaciones .postulacion-item').on('click', function() {
        const id = $(this).data('id');
        const p  = selectedPostulaciones.find(x=>String(x.IdPostulanteVacante)===String(id));
        cargarProcesos(id, p?.NombreVacante||'Procesos');
    });
}

async function cargarProcesos(idPV, nombreVacante) {
    $('#listaPostulaciones .postulacion-item').removeClass('active');
    $(`#listaPostulaciones .postulacion-item[data-id="${idPV}"]`).addClass('active');
    $('#tituloProcesos').text(nombreVacante);
    $('#timelineProcesos').html('<div class="text-muted small">Cargando procesos...</div>');

    try {
        const r = await $.ajax({type:'POST',url:API,data:{op:'getProcesosPostulacion',IdPostulanteVacante:btoa(idPV)},dataType:'json'});
        if (!r.Resultado || !r.Data || !r.Data.length) {
            $('#timelineProcesos').html('<div class="text-muted small">Sin procesos registrados.</div>'); return;
        }
        $('#timelineProcesos').html(renderTimeline(r.Data));
        lucide.createIcons();
    } catch(e) { $('#timelineProcesos').html('<div class="text-danger small">Error al cargar procesos.</div>'); }
}

function renderTimeline(items) {
    return '<div class="timeline">' + items.map(h => {
        const ok = h.Resultado == 1, no = h.Resultado == 0;
        const color = ok ? '#28a745' : (no ? '#dc3545' : '#c0392b');
        const icon  = ok ? '✅' : (no ? '❌' : '');
        const fecha = h.Fecha ? new Date(h.Fecha).toLocaleDateString('es-MX') : '';
        return `<div class="timeline-item">
            <span class="timeline-marker" style="border-color:${color};background:${ok?color:(no?color:'#fff')}"></span>
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
// INIT
// ==========================================
$(function() {
    initTable();
    cargarCandidatos();
});
