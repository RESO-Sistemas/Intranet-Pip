let postulantesGeneralData = [];
let selectedPostulante = null;
let selectedPostulaciones = [];
let selectedIdPostulanteVacante = null;

// ==========================================
// RESULTADOS DE EVALUACIÓN
// ==========================================
const pgYellowPalette = ['#ffc407', '#484747ff', '#ffd551', '#696969ff', '#ffe79b', '#fff9e6'];
let pgChartPostulante = null;

function hasHistorialUI() {
    return (
        $('#pgSelectedPostulante').length > 0 &&
        $('#pgSelectedPostulanteMeta').length > 0 &&
        $('#listaPostulaciones').length > 0 &&
        $('#timelineProcesos').length > 0 &&
        $('#tituloProcesos').length > 0
    );
}

function statusText(estatus) {
    switch (parseInt(estatus)) {
        case 1: return 'En Proceso';
        case 2: return 'Aceptado';
        case 3: return 'Rechazado';
        case 4: return 'Finalizado';
        default: return 'Desconocido';
    }
}

function statusClass(estatus) {
    switch (parseInt(estatus)) {
        case 1: return 'en-proceso';
        case 2: return 'aceptado';
        case 3: return 'rechazado';
        case 4: return 'finalizado';
        default: return '';
    }
}

function statusKey(estatus) {
    switch (parseInt(estatus)) {
        case 1: return 'en proceso';
        case 2: return 'aceptado';
        case 3: return 'rechazado';
        case 4: return 'finalizado';
        default: return 'desconocido';
    }
}

function safeText(value, fallback = '-') {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text.length ? text : fallback;
}

function toB64Int(value) {
    return btoa(String(parseInt(value)));
}

// ==========================================
// RENDERIZADO DE LISTA
// ==========================================

function renderPostulanteList(data) {
    const $list = $('#postulanteList');

    if (!data || data.length === 0) {
        $list.html(`
            <li class="postulante-list-empty">
                <span class="material-symbols-outlined d-block mb-2" style="font-size:2.5rem;">person_off</span>
                Sin resultados
            </li>
        `);
        return;
    }

    const html = data.map((p, index) => {
        const nombre = safeText(p.NombreCompleto);
        const curp = safeText(p.CURP, '');
        const vacante = safeText(p.UltimaVacante, 'Sin vacante');
        const estatus = statusText(p.UltimoEstatus);
        const sclass = statusClass(p.UltimoEstatus);
        const isSelected = selectedPostulante && selectedPostulante.IdPostulante === p.IdPostulante;

        return `
            <li class="postulante-list-item ${isSelected ? 'selected' : ''}"
                data-id="${p.IdPostulante}"
                data-index="${index}">
                <span class="pli-name">${nombre}</span>
                <span class="pli-curp">${curp}</span>
                <div class="pli-meta">
                    <span class="pli-vacante" title="${vacante}">${vacante}</span>
                    <span class="pli-status ${sclass}">${estatus}</span>
                </div>
            </li>
        `;
    }).join('');

    $list.html(html);

    $list.find('.postulante-list-item').on('click', function () {
        const index = parseInt($(this).data('index'));
        const postulante = postulantesGeneralData[index];
        if (!postulante) return;

        onSelectPostulante(postulante);

        $list.find('.postulante-list-item').removeClass('selected');
        $(this).addClass('selected');
    });
}

// ==========================================
// BÚSQUEDA / FILTRO EN VIVO
// ==========================================

function filterPostulanteList(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderPostulanteList(postulantesGeneralData);
        return;
    }

    const filtered = postulantesGeneralData.filter(p => {
        const nombre = (p.NombreCompleto || '').toLowerCase();
        const curp = (p.CURP || '').toLowerCase();
        const vacante = (p.UltimaVacante || '').toLowerCase();
        const estatus = statusKey(p.UltimoEstatus);
        return nombre.includes(q) || curp.includes(q) || vacante.includes(q) || estatus.includes(q);
    });

    renderPostulanteList(filtered);
}

// ==========================================
// CARGA DE DATOS
// ==========================================

async function loadPostulantesGeneral() {
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getAllPostulantesGeneral' });
        const result = JSON.parse(response);

        if (result && result.Msg && (!result.Resultado || !result.Siguiente)) {
            console.warn('Backend getAllPostulantesGeneral:', result.Msg);
        }

        if (result && result.Siguiente && Array.isArray(result.Data)) {
            postulantesGeneralData = result.Data;
            renderPostulanteList(postulantesGeneralData);
            $('#postulantesCount').text(`(${postulantesGeneralData.length} registros)`);

            if (postulantesGeneralData.length > 0) {
                const first = postulantesGeneralData[0];
                selectedPostulante = first;
                onSelectPostulante(first);
                $('#postulanteList .postulante-list-item:eq(0)').addClass('selected');
            }
        } else {
            postulantesGeneralData = [];
            renderPostulanteList([]);
            $('#postulantesCount').text('(0 registros)');
        }
    } catch (error) {
        console.error('Error al cargar postulantes general:', error);
        $('#postulanteList').html(`
            <li class="postulante-list-empty">
                <span class="material-symbols-outlined d-block mb-2" style="font-size:2.5rem;">error</span>
                Error al cargar
            </li>
        `);
    }
}

// ==========================================
// SELECCIÓN DE POSTULANTE (MASTER -> DETAIL)
// ==========================================

async function onSelectPostulante(postulante) {
    selectedPostulante = postulante;
    selectedPostulaciones = [];
    selectedIdPostulanteVacante = null;

    // Mostrar panel de detalle, ocultar empty state
    $('#detailEmptyState').hide();
    $('#detailContent').show();

    const nombre = safeText(postulante.NombreCompleto);
    const correo = safeText(postulante.CorreoElectronico, '');
    const tel = safeText(postulante.Telefono, '');

    $('#pgSelectedPostulante').text(nombre);
    const metaParts = [];
    if (correo && correo !== '-') metaParts.push(`@ ${correo}`);
    if (tel && tel !== '-') metaParts.push(`' ${tel}`);
    $('#pgSelectedPostulanteMeta').text(metaParts.join('  |  '));

    // Reset tabs
    $('#listaPostulaciones').html('<div class="text-muted small px-3">Cargando...</div>');
    $('#timelineProcesos').html('<div class="text-muted small">Selecciona una vacante.</div>');
    $('#tituloProcesos').text('Procesos');
    $('#contenedorDocumentos').html('<div class="text-muted small">Selecciona una vacante</div>');
    $('#badgeVacantesCount').text('0');

    // Resetear modo edición si estaba activo
    if (typeof PostulanteEditor !== 'undefined' && PostulanteEditor.isModoEdicion && PostulanteEditor.isModoEdicion()) {
        PostulanteEditor.toggleEditMode();
    }

    // Cargar información detallada
    await loadPostulanteInfo(postulante.IdPostulante);

    // Cargar historial de postulaciones
    await loadHistorialPostulaciones(postulante.IdPostulante);
}

function closeDetail() {
    selectedPostulante = null;
    selectedPostulaciones = [];
    selectedIdPostulanteVacante = null;

    $('#detailContent').hide();
    $('#detailEmptyState').show();
    $('#postulanteList .postulante-list-item').removeClass('selected');
}

// ==========================================
// CARGA INFO DEL POSTULANTE
// ==========================================

async function loadPostulanteInfo(idPostulante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteById',
            IdPostulante: toB64Int(idPostulante)
        });

        const result = JSON.parse(response);

        if (result && result.Siguiente && result.Data) {
            const p = result.Data;

            $('#detalleIdPostulante').val(idPostulante);
            $('#detallePostulanteNombre').val(p.Nombre || '');
            $('#detallePostulanteApellidoPaterno').val(p.ApellidoPaterno || '');
            $('#detallePostulanteApellidoMaterno').val(p.ApellidoMaterno || '');
            $('#detallePostulanteCURP').val(p.CURP || '');
            $('#detallePostulanteCorreo').val(p.CorreoElectronico || '');
            $('#detallePostulanteTelefono').val(p.Telefono || '');
            $('#detallePostulanteEstado').val(p.Estado || '');
            $('#detallePostulanteCiudad').val(p.Ciudad || '');

            if (window.PostulanteEditor && typeof window.PostulanteEditor.aplicarDireccionCompleta === 'function') {
                await window.PostulanteEditor.aplicarDireccionCompleta(p.Direccion || '', '');
                if (window.PostulanteEditor.updateDireccionPreview) {
                    window.PostulanteEditor.updateDireccionPreview();
                }
            }

            // Cargar teléfonos
            if (window.PostulanteEditor && typeof window.PostulanteEditor.cargarTelefonosPostulante === 'function') {
                window.PostulanteEditor.cargarTelefonosPostulante(idPostulante);
            }

            // Actualizar meta en el header
            const correo = safeText(p.CorreoElectronico, '');
            const tel = safeText(p.Telefono, '');
            const metaParts = [];
            if (correo && correo !== '-') metaParts.push(`@ ${correo}`);
            if (tel && tel !== '-') metaParts.push(`' ${tel}`);
            $('#pgSelectedPostulanteMeta').text(metaParts.join('  |  '));
        } else {
            console.error('Error al cargar información del postulante:', result);
        }
    } catch (error) {
        console.error('Error en loadPostulanteInfo:', error);
    }
}

// ==========================================
// HISTORIAL DE POSTULACIONES
// ==========================================

async function loadHistorialPostulaciones(idPostulante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteHistorialCompleto',
            IdPostulante: toB64Int(idPostulante)
        });

        const result = JSON.parse(response);

        if (result && result.Msg && (!result.Resultado || !result.Siguiente)) {
            console.warn('Backend getPostulanteHistorialCompleto:', result.Msg);
        }

        if (result && result.Siguiente && Array.isArray(result.Data) && result.Data.length > 0) {
            selectedPostulaciones = result.Data;
            renderPostulacionesList(result.Data);
            $('#badgeVacantesCount').text(result.Data.length);

            const first = result.Data[0];
            if (first && first.IdPostulanteVacante) {
                selectPostulacion(first.IdPostulanteVacante);
            }
        } else {
            selectedPostulaciones = [];
            $('#listaPostulaciones').html('<div class="text-muted small px-3">No hay postulaciones para este postulante.</div>');
            $('#badgeVacantesCount').text('0');
            $('#tituloProcesos').text('Procesos');
            $('#timelineProcesos').html('<div class="text-muted small">Sin postulaciones.</div>');
            $('#contenedorDocumentos').html('<div class="text-muted small">Sin documentos.</div>');
        }
    } catch (error) {
        console.error('Error al cargar historial completo:', error);
        $('#listaPostulaciones').html('<div class="text-muted small px-3">Error al cargar historial.</div>');
    }
}

function renderPostulacionesList(list) {
    const html = list.map(pv => {
        const id = pv.IdPostulanteVacante;
        const nombreVacante = safeText(pv.NombreVacante);
        const fecha = safeText(pv.FechaPostulacion, '');
        const estatus = statusText(pv.EstatusPostulacion);
        const subtitle = [fecha, estatus].filter(Boolean).join(' | ');

        return `
            <a class="postulacion-item" data-id="${id}" href="#">
                <div class="fw-bold">${nombreVacante}</div>
                <div class="small text-muted">${subtitle}</div>
            </a>
        `;
    }).join('');

    $('#listaPostulaciones').html(html);

    $('#listaPostulaciones .postulacion-item').on('click', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        selectPostulacion(id);
    });
}

function buildDownloadUrl(viewUrl) {
    if (!viewUrl) return '';
    return viewUrl.replace('op=viewArchivo', 'op=downloadArchivo');
}

function renderBotonesDocumentos(rutaCV, rutaSE) {
    if (rutaCV === 'NULL' || rutaCV === 'null') rutaCV = '';
    if (rutaSE === 'NULL' || rutaSE === 'null') rutaSE = '';

    const hasCV = !!rutaCV;
    const hasSE = !!rutaSE;
    let html = '<div class="d-flex flex-column gap-2">';
    if (hasCV) {
        html += `
            <a href="${rutaCV}" target="_blank" class="btn btn-secondary btn-sm text-white w-100" style="border-radius:6px;">
                <span class="material-symbols-outlined align-middle" style="font-size:16px;">description</span> Ver CV
            </a>
            <a href="${buildDownloadUrl(rutaCV)}" target="_blank" class="btn btn-outline-secondary btn-sm w-100" style="border-radius:6px;">
                <span class="material-symbols-outlined align-middle" style="font-size:16px;">download</span> Descargar CV
            </a>
        `;
    }
    if (hasSE) {
        html += `
            <a href="${rutaSE}" target="_blank" class="btn btn-secondary btn-sm text-white w-100" style="border-radius:6px;">
                <span class="material-symbols-outlined align-middle" style="font-size:16px;">assignment</span> Ver Solicitud
            </a>
            <a href="${buildDownloadUrl(rutaSE)}" target="_blank" class="btn btn-outline-secondary btn-sm w-100" style="border-radius:6px;">
                <span class="material-symbols-outlined align-middle" style="font-size:16px;">download</span> Descargar Solicitud
            </a>
        `;
    }
    if (!hasCV && !hasSE) {
        html += '<div class="alert alert-warning mb-0 small text-center py-2">Sin documentos.</div>';
    }
    html += '</div>';
    return html;
}

async function selectPostulacion(idPostulanteVacante) {
    selectedIdPostulanteVacante = idPostulanteVacante;

    $('#listaPostulaciones .postulacion-item').removeClass('active');
    $(`#listaPostulaciones .postulacion-item[data-id="${idPostulanteVacante}"]`).addClass('active');

    const postulacion = selectedPostulaciones.find(p => String(p.IdPostulanteVacante) === String(idPostulanteVacante));
    const nombreVacante = postulacion ? safeText(postulacion.NombreVacante) : 'Procesos';
    $('#tituloProcesos').text(nombreVacante);

    if (postulacion) {
        $('#contenedorDocumentos').html(renderBotonesDocumentos(postulacion.RutaCV || '', postulacion.RutaSolicitudEmpleo || ''));
    }

    $('#timelineProcesos').html('<div class="text-muted small"><span class="spinner-border spinner-border-sm me-1"></span>Cargando procesos...</div>');
    $('#seccionResultadosEvaluacion').hide();
    await loadProcesosPostulacion(idPostulanteVacante);

    // Cargar resultados de evaluación
    await loadResultadosEvaluacion(idPostulanteVacante);
}

async function loadProcesosPostulacion(idPostulanteVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getProcesosPostulacion',
            IdPostulanteVacante: toB64Int(idPostulanteVacante)
        });

        const result = JSON.parse(response);

        if (result && result.Msg && (!result.Resultado || !result.Siguiente)) {
            console.warn('Backend getProcesosPostulacion:', result.Msg);
        }

        if (result && result.Siguiente && Array.isArray(result.Data) && result.Data.length > 0) {
            $('#timelineProcesos').html(renderTimeline(result.Data));
        } else {
            $('#timelineProcesos').html('<div class="text-muted small">No hay procesos registrados para esta vacante.</div>');
        }
    } catch (error) {
        console.error('Error al cargar procesos:', error);
        $('#timelineProcesos').html('<div class="text-muted small">Error al cargar procesos.</div>');
    }
}

function renderTimeline(items) {
    let html = '<div class="timeline">';

    items.forEach(h => {
        const isOk = h.Resultado == 1;
        const isNo = h.Resultado == 0;
        const markerColor = isOk ? '#28a745' : (isNo ? '#dc3545' : '#6c757d');
        const icon = isOk
            ? '<span class="material-symbols-outlined text-success timeline-icon">check_circle</span>'
            : (isNo ? '<span class="material-symbols-outlined text-danger timeline-icon">cancel</span>' : '');

        const titulo = safeText(h.NombreProceso || h.Proceso || 'Proceso');
        const obs = safeText(h.Observaciones, 'Sin observaciones');
        const fecha = safeText(h.Fecha, '');
        const usuario = safeText(h.NombreUsuario, '');

        html += `
            <div class="timeline-item">
                <span class="timeline-marker" style="background:${markerColor}"></span>
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <p class="timeline-title">${titulo} ${icon}</p>
                        <p class="timeline-sub text-muted">${obs}</p>
                        ${usuario ? `<small class="text-primary"><span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;">person</span> ${usuario}</small>` : ''}
                    </div>
                    <span class="timeline-time">${fecha}</span>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// ==========================================
// TABS DEL DETALLE
// ==========================================

$(document).on('click', '.detail-tab', function() {
    const tab = $(this).data('tab');

    $('.detail-tab').removeClass('active');
    $(this).addClass('active');

    $('.detail-tab-panel').removeClass('active');
    $(`#tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`).addClass('active');
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

$(document).ready(function () {
    loadPostulantesGeneral();

    // Búsqueda en vivo con debounce
    let searchTimeout;
    $('#buscarPostulanteInput').on('input', function() {
        clearTimeout(searchTimeout);
        const query = $(this).val();
        searchTimeout = setTimeout(() => filterPostulanteList(query), 200);
    });
});

// ==========================================
// RESULTADOS DE EVALUACIÓN EN PANEL DETALLE
// ==========================================

async function loadResultadosEvaluacion(idPostulanteVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteResultadosEvaluaciones',
            IdPostulanteVacante: idPostulanteVacante
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            const datos = result.Data;
            const evaluaciones = [...new Set(datos.map(item => item.NombreEvaluacion))];

            if (evaluaciones.length === 0) {
                $('#seccionResultadosEvaluacion').hide();
                return;
            }

            let html = '<div class="d-flex flex-column gap-3">';

            evaluaciones.forEach(ev => {
                const datosEv = datos.filter(i => i.NombreEvaluacion === ev);
                const calificacion = datosEv.length > 0 && datosEv[0].Calificacion !== null ? parseFloat(datosEv[0].Calificacion).toFixed(1) : 'N/A';

                html += `
                    <div class="border rounded p-3 bg-white">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="fw-bold small text-uppercase text-muted">${ev}</span>
                            <span class="badge bg-primary rounded-pill">Score: ${calificacion}</span>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                `;

                datosEv.forEach(comp => {
                    const score = parseFloat(comp.ScoreCompetencia);
                    const pct = Math.round(score);
                    const color = score >= 70 ? '#28a745' : (score >= 40 ? '#ffc107' : '#dc3545');
                    html += `
                        <div class="text-center" style="min-width:70px;">
                            <div style="width:50px;height:50px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;background:${color}20;color:${color};border:2px solid ${color};">${pct}%</div>
                            <small class="d-block text-muted" style="font-size:0.65rem;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${comp.Competencia || ''}">${comp.Competencia || 'Comp'}</small>
                        </div>
                    `;
                });

                html += `</div></div>`;
            });

            html += '</div>';
            $('#resultadosEvaluacionContent').html(html);
            $('#seccionResultadosEvaluacion').show();
        } else {
            $('#seccionResultadosEvaluacion').hide();
        }
    } catch (error) {
        console.error('Error al cargar resultados de evaluación:', error);
        $('#seccionResultadosEvaluacion').hide();
    }
}
