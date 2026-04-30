/**
 * ResultadosEvaluacionIbero.js — Comparativa de resultados por vacante.
 * Equivalente al ResultadosEvaluacion.php de PIP adaptado a Ibero.
 */
const API_P = 'Backend/Postulantes/App.php';
const API_V = 'Backend/Vacantes/App.php';
let comparativaData = [];
let graficaInstance = null;
let graficaBarrasInstance = null;
let radarInstance = null;
let competenciasData = [];

const COLORES_CANDIDATOS = [
    { bg: 'rgba(192,57,43,.55)',  border: 'rgba(192,57,43,1)'  },
    { bg: 'rgba(41,128,185,.55)', border: 'rgba(41,128,185,1)'  },
    { bg: 'rgba(39,174,96,.55)',  border: 'rgba(39,174,96,1)'   },
    { bg: 'rgba(243,156,18,.55)', border: 'rgba(243,156,18,1)'  },
    { bg: 'rgba(142,68,173,.55)', border: 'rgba(142,68,173,1)'  },
    { bg: 'rgba(22,160,133,.55)', border: 'rgba(22,160,133,1)'  },
    { bg: 'rgba(230,126,34,.55)', border: 'rgba(230,126,34,1)'  },
    { bg: 'rgba(52,73,94,.55)',   border: 'rgba(52,73,94,1)'    },
    { bg: 'rgba(26,188,156,.55)', border: 'rgba(26,188,156,1)'  },
    { bg: 'rgba(241,196,15,.55)', border: 'rgba(241,196,15,1)'  },
];

// ==========================================
// INIT: Cargar vacantes en el selector
// ==========================================
$(function() {
    cargarVacantesSelector();
});

async function cargarVacantesSelector() {
    try {
        const r = await $.ajax({type:'POST',url:API_V,data:{op:'getVacantes'},dataType:'json'});
        const sel = $('#cmbVacanteResultados').empty().append('<option value="">Selecciona una vacante...</option>');
        if (Array.isArray(r)) {
            r.forEach(v => sel.append(`<option value="${v.IdVacante}">${v.NombreVacante}</option>`));
        }
    } catch(e) { toastr.error('Error al cargar vacantes.'); }
}

// ==========================================
// CARGAR COMPARATIVA
// ==========================================
async function cargarComparativa() {
    const idV = $('#cmbVacanteResultados').val();
    if (!idV) { toastr.warning('Selecciona una vacante.'); return; }

    $('#panel-metricas-globales').hide().empty();
    $('#panel-resultados').hide();

    const btn = $('button[onclick="cargarComparativa()"]').prop('disabled',true).text('Cargando...');
    try {
        const [r, rc] = await Promise.all([
            $.ajax({type:'POST',url:API_P,data:{op:'getComparativoResultadosVacante',IdVacante:btoa(idV)},dataType:'json'}),
            $.ajax({type:'POST',url:API_P,data:{op:'getComparativoPorCompetencias',IdVacante:btoa(idV)},dataType:'json'})
        ]);

        btn.prop('disabled',false).html('<i data-lucide="bar-chart-2" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> Ver Comparativa');
        lucide.createIcons();

        if (!r.Resultado || !r.Data || !r.Data.length) {
            toastr.info('No hay candidatos en esta vacante.'); return;
        }

        comparativaData = r.Data;
        competenciasData = (rc.Resultado && Array.isArray(rc.Data)) ? rc.Data : [];

        renderMetricasGlobales(r.Data);
        renderRanking(r.Data);
        renderFortalezasAreas(r.Data);
        renderCalculoDetallado(r.Data);
        renderSelectCandidatos(competenciasData);
        $('#panel-resultados').show();
        lucide.createIcons();
    } catch(e) {
        btn.prop('disabled',false).html('<i data-lucide="bar-chart-2" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> Ver Comparativa');
        toastr.error('Error al cargar comparativa.');
    }
}

// ==========================================
// MÉTRICAS GLOBALES (tarjetas resumen)
// ==========================================
function renderMetricasGlobales(data) {
    const total = data.length;
    const conEvals = data.filter(d => d.Evaluaciones && d.Evaluaciones.some(e=>e.EstatusEvaluacion==3)).length;
    const promedios = data.map(d=>d.PromedioGeneral).filter(p=>p!==null&&p!==undefined);
    const promGlobal = promedios.length ? (promedios.reduce((a,b)=>a+parseFloat(b),0)/promedios.length).toFixed(1) : '—';
    const maxProm    = promedios.length ? Math.max(...promedios.map(Number)).toFixed(1) : '—';
    const mejorCand  = promedios.length ? data.find(d=>parseFloat(d.PromedioGeneral)===Math.max(...promedios.map(Number)))?.NombreCompleto : '—';

    const panel = $('#panel-metricas-globales').empty();
    const tarjetas = [
        {label:'Total Candidatos', val:total, color:'#c0392b'},
        {label:'Con evaluaciones', val:conEvals, color:'#2980b9'},
        {label:'Promedio global', val:promGlobal+'%', color:'#27ae60'},
        {label:'Mejor calificación', val:maxProm+'%', color:'#f39c12'},
        {label:'Mejor candidato', val:`<small>${mejorCand}</small>`, color:'#8e44ad'},
    ];
    tarjetas.forEach(t => {
        panel.append(`<div class="col-md">
            <div class="card card-metric text-center py-3 shadow-sm" style="border-left-color:${t.color}">
                <h4 style="color:${t.color};margin:0">${t.val}</h4>
                <small class="text-muted">${t.label}</small>
            </div></div>`);
    });
    panel.css('display','flex').show();
}

// ==========================================
// RANKING GENERAL (scoreboard tipo PIP)
// ==========================================
function renderRanking(data) {
    const sorted = [...data].sort((a,b) => (parseFloat(b.PromedioGeneral)||0) - (parseFloat(a.PromedioGeneral)||0));
    const grid = document.getElementById('grid-ranking');
    grid.innerHTML = sorted.map((c, i) => {
        const rank = i+1;
        const rankClass = rank===1?'top-1':rank===2?'top-2':rank===3?'top-3':'';
        const badgeClass = rank===1?'rank-1':rank===2?'rank-2':rank===3?'rank-3':'rank-other';
        const prom = c.PromedioGeneral!==null ? parseFloat(c.PromedioGeneral).toFixed(1)+'%' : '—';
        const pct  = c.PromedioGeneral!==null ? Math.min(parseFloat(c.PromedioGeneral),100) : 0;
        const evalPills = (c.Evaluaciones||[]).map(e => {
            const cls = e.EstatusEvaluacion==3?'eval-completada':e.EstatusEvaluacion==2?'eval-en-progreso':'eval-pendiente';
            const cal = e.Calificacion ? parseFloat(e.Calificacion).toFixed(1)+'%' : '—';
            return `<span class="eval-pill ${cls}" title="${e.NombreEvaluacion}: ${cal}">${e.NombreEvaluacion.substring(0,20)} — ${cal}</span>`;
        }).join('');
        const estatusBadge = {1:'En Proceso',2:'Aceptado',3:'Descartado',4:'Finalizado'};
        const estatusColor = {1:'warning',2:'success',3:'danger',4:'secondary'};
        const es = parseInt(c.EstatusPostulacion);
        return `<div class="candidate-card ${rankClass}" onclick="abrirDetalleCandidato('${btoa(c.IdPostulanteVacante)}','${c.NombreCompleto.replace(/'/g,"\\'")}')">
            <div class="d-flex align-items-center gap-3 mb-2">
                <div class="rank-badge ${badgeClass}">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</div>
                <div class="flex-fill">
                    <div class="fw-bold">${c.NombreCompleto}</div>
                    <div class="text-muted small">${c.CURP} &bull; <span class="badge bg-${estatusColor[es]||'secondary'} badge-sm">${estatusBadge[es]||'—'}</span></div>
                </div>
                <div class="text-end">
                    <div class="fw-bold fs-5" style="color:${pct>=70?'#27ae60':pct>=50?'#f39c12':'#c0392b'}">${prom}</div>
                    <div class="text-muted" style="font-size:.7rem;">Promedio</div>
                </div>
            </div>
            <div class="progress progress-ibero mb-2" style="height:6px;">
                <div class="progress-bar" style="width:${pct}%"></div>
            </div>
            <div>${evalPills || '<span class="text-muted small">Sin evaluaciones</span>'}</div>
        </div>`;
    }).join('');

    renderBarrasRanking(sorted);
}

// ==========================================
// GRÁFICA BARRAS HORIZONTALES — RANKING
// ==========================================
function renderBarrasRanking(sorted) {
    const top = sorted.slice(0, 10).filter(c => c.PromedioGeneral !== null);
    if (!top.length) { $('#card-barras-ranking').hide(); return; }

    $('#card-barras-ranking').show();
    if (graficaBarrasInstance) graficaBarrasInstance.destroy();

    const ctx = document.getElementById('graficaBarrasRanking').getContext('2d');
    const promedios = top.map(c => parseFloat(c.PromedioGeneral));
    const colores = promedios.map(p => p >= 70 ? 'rgba(39,174,96,.75)' : p >= 50 ? 'rgba(243,156,18,.75)' : 'rgba(192,57,43,.75)');

    graficaBarrasInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top.map(c => c.NombreCompleto),
            datasets: [{
                label: 'Promedio General (%)',
                data: promedios,
                backgroundColor: colores,
                borderColor: colores.map(c => c.replace('.75', '1')),
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
                y: { ticks: { font: { size: 12 } } }
            }
        }
    });
}

// ==========================================
// FORTALEZAS Y ÁREAS A MEJORAR
// ==========================================
function renderFortalezasAreas(data) {
    let todas = [];
    data.forEach(c => {
        (c.Evaluaciones||[]).filter(e=>e.EstatusEvaluacion==3&&e.Calificacion!==null).forEach(e => {
            todas.push({NombreCompleto:c.NombreCompleto,NombreEvaluacion:e.NombreEvaluacion,Calificacion:parseFloat(e.Calificacion)});
        });
    });
    todas.sort((a,b)=>b.Calificacion-a.Calificacion);
    const fortalezas = todas.slice(0,10);
    const areas      = [...todas].sort((a,b)=>a.Calificacion-b.Calificacion).slice(0,10);

    const renderRow = (item,color) => `<tr>
        <td>${item.NombreCompleto}</td>
        <td><small>${item.NombreEvaluacion}</small></td>
        <td><span class="fw-bold" style="color:${color}">${item.Calificacion.toFixed(1)}%</span>
            <div class="progress progress-ibero mt-1" style="height:4px;background:#eee;">
                <div class="progress-bar" style="width:${item.Calificacion}%;background:${color}"></div>
            </div></td>
    </tr>`;

    $('#tableFortalezas tbody').html(fortalezas.map(i=>renderRow(i,'#27ae60')).join('') || '<tr><td colspan="3" class="text-muted text-center">Sin datos</td></tr>');
    $('#tableAreas tbody').html(areas.map(i=>renderRow(i,'#c0392b')).join('') || '<tr><td colspan="3" class="text-muted text-center">Sin datos</td></tr>');
}

// ==========================================
// CÁLCULO DETALLADO (tabla comparativa tipo PIP)
// ==========================================
function renderCalculoDetallado(data) {
    const evalNombres = [...new Set(data.flatMap(c=>(c.Evaluaciones||[]).map(e=>e.NombreEvaluacion)))];
    const thead = `<thead class="table-dark"><tr>
        <th>Candidato</th><th>Estatus</th>
        ${evalNombres.map(n=>`<th class="text-center">${n}</th>`).join('')}
        <th class="text-center">Promedio</th><th>Procesos</th>
    </tr></thead>`;
    const tbody = data.map(c => {
        const es = parseInt(c.EstatusPostulacion);
        const estatusBadge = {1:'En Proceso',2:'Aceptado',3:'Descartado',4:'Finalizado'};
        const estatusColor = {1:'warning',2:'success',3:'danger',4:'secondary'};
        const celdas = evalNombres.map(nombre => {
            const e = (c.Evaluaciones||[]).find(ev=>ev.NombreEvaluacion===nombre);
            if (!e) return '<td class="text-center text-muted">—</td>';
            const cal = e.Calificacion!==null ? parseFloat(e.Calificacion).toFixed(1)+'%' : '—';
            const cls = e.EstatusEvaluacion==3?'eval-completada':e.EstatusEvaluacion==2?'eval-en-progreso':'eval-pendiente';
            return `<td class="text-center"><span class="eval-pill ${cls}">${cal}</span></td>`;
        }).join('');
        const prom = c.PromedioGeneral!==null ? parseFloat(c.PromedioGeneral).toFixed(1)+'%' : '—';
        const procCount = (c.Procesos||[]).length;
        return `<tr>
            <td><a href="PostulanteDetalleIbero.php?id=${c.IdPostulanteVacante}" class="text-danger fw-bold text-decoration-none">${c.NombreCompleto}</a></td>
            <td><span class="badge bg-${estatusColor[es]||'secondary'}">${estatusBadge[es]||'—'}</span></td>
            ${celdas}
            <td class="text-center fw-bold">${prom}</td>
            <td class="text-center"><span class="badge bg-dark">${procCount}</span></td>
        </tr>`;
    }).join('');
    $('#tabla-calculo').html(`<div class="table-responsive"><table class="table table-hover align-middle">${thead}<tbody>${tbody}</tbody></table></div>`);
}

// ==========================================
// SELECT DE CANDIDATOS + RADAR
// ==========================================
function renderSelectCandidatos(rows) {
    const sel = $('#selectCandidatosRadar').empty();
    if (!rows.length) {
        sel.append('<option disabled>Sin datos de competencias para esta vacante</option>');
        $('#card-radar-competencias').hide();
        $('#msg-sin-competencias').show();
        return;
    }

    $('#msg-sin-competencias').hide();

    // Candidatos únicos preservando orden de aparición
    const candidatos = [];
    const seen = new Set();
    rows.forEach(r => {
        if (!seen.has(r.IdPostulanteVacante)) {
            seen.add(r.IdPostulanteVacante);
            candidatos.push({ id: r.IdPostulanteVacante, nombre: r.NombreCompleto });
        }
    });

    candidatos.forEach((c, i) => {
        const color = COLORES_CANDIDATOS[i % COLORES_CANDIDATOS.length].border;
        const opt = $(`<option value="${c.id}">${c.nombre}</option>`).css('color', color);
        opt.prop('selected', true);
        sel.append(opt);
    });

    sel.off('change').on('change', () => actualizarRadar(rows));
    actualizarRadar(rows);
}

function actualizarRadar(rows) {
    const seleccionados = new Set(
        $('#selectCandidatosRadar').val()?.map(Number) ?? []
    );

    if (!seleccionados.size) {
        if (radarInstance) { radarInstance.destroy(); radarInstance = null; }
        $('#card-radar-competencias').hide();
        return;
    }

    // Pivotar: candidato → competencia → score
    const mapa = {};
    const nombresMap = {};
    rows.forEach(r => {
        const idPV = parseInt(r.IdPostulanteVacante);
        if (!seleccionados.has(idPV)) return;
        if (!mapa[idPV]) { mapa[idPV] = {}; nombresMap[idPV] = r.NombreCompleto; }
        mapa[idPV][r.Competencia] = parseFloat(r.ScoreCompetencia);
    });

    // Competencias únicas de los candidatos seleccionados
    const competencias = [...new Set(
        rows.filter(r => seleccionados.has(parseInt(r.IdPostulanteVacante)))
            .map(r => r.Competencia)
    )].sort();

    if (!competencias.length) {
        if (radarInstance) { radarInstance.destroy(); radarInstance = null; }
        $('#card-radar-competencias').hide();
        return;
    }

    // Asignar colores consistentes por candidato (basado en índice en select)
    const optsAll = $('#selectCandidatosRadar option').toArray();
    const datasets = Object.keys(mapa).map(idPV => {
        const idx = optsAll.findIndex(o => parseInt(o.value) === parseInt(idPV));
        const color = COLORES_CANDIDATOS[idx >= 0 ? idx % COLORES_CANDIDATOS.length : 0];
        return {
            label: nombresMap[idPV],
            data: competencias.map(c => mapa[idPV][c] ?? null),
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 2,
            pointBackgroundColor: color.border,
            pointRadius: 4,
            spanGaps: false
        };
    });

    $('#card-radar-competencias').show();
    if (radarInstance) radarInstance.destroy();
    const ctx = document.getElementById('graficaRadarCompetencias').getContext('2d');
    radarInstance = new Chart(ctx, {
        type: 'radar',
        data: { labels: competencias, datasets },
        options: {
            responsive: true,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 20, callback: v => v + '%', font: { size: 11 } },
                    pointLabels: { font: { size: 12 } }
                }
            },
            plugins: {
                legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } },
                tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw !== null ? ctx.raw.toFixed(1)+'%' : 'N/D'}` } }
            }
        }
    });
}

// ==========================================
// MODAL DETALLE DE CANDIDATO
// ==========================================
async function abrirDetalleCandidato(idPVEncoded, nombre) {
    $('#tituloModalDetalle').text(nombre);
    $('#detalle-candidato-header').html('<div class="text-center py-3"><div class="spinner-border text-danger"></div></div>');
    $('#detalle-evaluaciones').empty();
    $('#detalle-grafica-container').hide();
    new bootstrap.Modal(document.getElementById('modalDetalleCandidato')).show();

    try {
        const r = await $.ajax({type:'POST',url:API_P,data:{op:'getPostulanteResultadosEvaluaciones',IdPostulanteVacante:idPVEncoded},dataType:'json'});
        if (!r.Resultado) { $('#detalle-candidato-header').html('<p class="text-danger text-center">Error al cargar.</p>'); return; }

        $('#detalle-candidato-header').html(`
            <div class="row g-3">
                <div class="col-md-6">
                    <h5 class="fw-bold mb-0">${nombre}</h5>
                    <p class="text-muted small mb-0">Evaluaciones completadas: ${(r.Data||[]).filter(e=>e.EstatusEvaluacion==3).length} de ${(r.Data||[]).length}</p>
                </div>
                <div class="col-md-6 text-end">
                    ${(r.Data||[]).filter(e=>e.EstatusEvaluacion==3&&e.Calificacion!==null).length?
                    `<span class="fs-3 fw-black text-danger">${((r.Data||[]).filter(e=>e.EstatusEvaluacion==3&&e.Calificacion!==null).reduce((sum,e)=>sum+parseFloat(e.Calificacion),0)/Math.max(1,(r.Data||[]).filter(e=>e.EstatusEvaluacion==3&&e.Calificacion!==null).length)).toFixed(1)}%</span>
                    <div class="text-muted small">Promedio general</div>`
                    : '<span class="text-muted">Sin calificaciones aún</span>'}
                </div>
            </div><hr>`);

        if (!r.Data || !r.Data.length) {
            $('#detalle-evaluaciones').html('<p class="text-muted text-center py-4">Sin evaluaciones asignadas.</p>'); return;
        }

        $('#detalle-evaluaciones').html(r.Data.map(e => {
            const cal = e.Calificacion!==null ? parseFloat(e.Calificacion).toFixed(1)+'%' : '—';
            const pct = e.Calificacion!==null ? Math.min(parseFloat(e.Calificacion),100) : 0;
            const color = pct>=70?'#27ae60':pct>=50?'#f39c12':'#c0392b';
            const cls = e.EstatusEvaluacion==3?'eval-completada':e.EstatusEvaluacion==2?'eval-en-progreso':'eval-pendiente';
            const resp = e.Respondidas||0, tot = e.TotalPreguntas||0;
            return `<div class="card mb-3">
                <div class="card-body py-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h6 class="fw-bold mb-0">${e.NombreEvaluacion}</h6>
                            <small class="text-muted">${resp}/${tot} preguntas respondidas</small>
                        </div>
                        <div class="text-end">
                            <span class="eval-pill ${cls}">${e.TxEstatus}</span>
                            <div class="fw-bold" style="color:${color};font-size:1.1rem;">${cal}</div>
                        </div>
                    </div>
                    <div class="progress progress-ibero" style="height:8px;background:#eee;">
                        <div class="progress-bar" style="width:${pct}%;background:${color}"></div>
                    </div>
                    ${e.EstatusEvaluacion==3?`<div class="mt-2"><a href="EvaluacionResponderIbero.php?id=${e.IdPostulanteEvaluacion}" class="btn btn-sm btn-outline-danger" target="_blank">Ver respuestas</a></div>`:''}
                </div>
            </div>`;
        }).join(''));

        const completadas = r.Data.filter(e=>e.EstatusEvaluacion==3&&e.Calificacion!==null);
        if (completadas.length > 1) {
            $('#detalle-grafica-container').show();
            if (graficaInstance) graficaInstance.destroy();
            const ctx = document.getElementById('graficaDetalleCandidato').getContext('2d');
            graficaInstance = new Chart(ctx, {
                type:'bar',
                data: {
                    labels: completadas.map(e=>e.NombreEvaluacion),
                    datasets: [{
                        label:'Calificación (%)',
                        data: completadas.map(e=>parseFloat(e.Calificacion).toFixed(1)),
                        backgroundColor: completadas.map(e=>parseFloat(e.Calificacion)>=70?'rgba(39,174,96,.7)':parseFloat(e.Calificacion)>=50?'rgba(243,156,18,.7)':'rgba(192,57,43,.7)'),
                        borderRadius:6
                    }]
                },
                options: {
                    responsive:true,
                    plugins:{legend:{display:false}},
                    scales:{y:{min:0,max:100,ticks:{callback:v=>v+'%'}}}
                }
            });
        }
    } catch(err) {
        $('#detalle-candidato-header').html('<p class="text-danger text-center">Error de conexión.</p>');
    }
}
