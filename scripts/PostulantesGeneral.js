let tablePostulantesGeneral;
let postulantesGeneralData = [];
let selectedPostulante = null;
let selectedPostulaciones = [];

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
        case 1:
            return 'En Proceso';
        case 2:
            return 'Aceptado';
        case 3:
            return 'Rechazado';
        case 4:
            return 'Finalizado';
        default:
            return 'Desconocido';
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

function initPostulantesGeneralTable() {
    tablePostulantesGeneral = $('#tablePostulantesGeneral').DataTable({
        data: [],
        columns: [
            { data: 'CURP', render: (d) => safeText(d) },
            { data: 'NombreCompleto', render: (d) => safeText(d) },
            { data: 'PrimeraPostulacion', render: (d) => safeText(d) },
            { data: 'UltimaVacante', render: (d) => safeText(d) },
            {
                data: 'UltimoEstatus',
                render: (d) => safeText(statusText(d))
            },
            {
                data: null,
                render: function (data, type, row) {
                    const idPostulante = row.IdPostulante;
                    return `
                        <div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
                            <a href="PostulanteDetalle.php?id=${idPostulante}" class="btn btn-primary btn-accion" title="Ver">
                                <span class="material-symbols-outlined">visibility</span>
                            </a>
                        </div>
                    `;
                },
                orderable: false,
                searchable: false
            }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        responsive: true,
        order: [[2, 'desc']]
    });

    $('#tablePostulantesGeneral tbody').on('click', 'tr', function () {
        const rowData = tablePostulantesGeneral.row(this).data();
        if (!rowData) return;

        if (hasHistorialUI()) {
            onSelectPostulante(rowData);
        }

        $('#tablePostulantesGeneral tbody tr').removeClass('selected');
        $(this).addClass('selected');
    });
}

async function loadPostulantesGeneral() {
    try {
        const response = await $.post('Backend/Postulantes/App.php', { op: 'getAllPostulantesGeneral' });
        const result = JSON.parse(response);

        if (result && result.Msg && (!result.Resultado || !result.Siguiente)) {
            console.warn('Backend getAllPostulantesGeneral:', result.Msg);
        }

        if (result && result.Siguiente && Array.isArray(result.Data)) {
            postulantesGeneralData = result.Data;
            tablePostulantesGeneral.clear().rows.add(postulantesGeneralData).draw();

            if (postulantesGeneralData.length > 0) {
                // auto seleccionar el primer registro
                const first = postulantesGeneralData[0];
                if (hasHistorialUI()) {
                    onSelectPostulante(first);
                }
                $('#tablePostulantesGeneral tbody tr:eq(0)').addClass('selected');
            }
        } else {
            postulantesGeneralData = [];
            tablePostulantesGeneral.clear().draw();
        }
    } catch (error) {
        console.error('Error al cargar postulantes general:', error);
    }
}

async function onSelectPostulante(postulante) {
    selectedPostulante = postulante;

    if (!hasHistorialUI()) {
        return;
    }

    const nombre = safeText(postulante.NombreCompleto);
    const correo = safeText(postulante.CorreoElectronico, '');
    const tel = safeText(postulante.Telefono, '');

    $('#pgSelectedPostulante').text(nombre);
    const metaParts = [];
    if (correo && correo !== '-') metaParts.push(correo);
    if (tel && tel !== '-') metaParts.push(tel);
    $('#pgSelectedPostulanteMeta').text(metaParts.join(' | '));

    $('#listaPostulaciones').html('<div class="text-muted small">Cargando...</div>');
    $('#timelineProcesos').html('<div class="text-muted small">Selecciona una vacante.</div>');
    $('#tituloProcesos').text('Procesos');

    await loadHistorialPostulaciones(postulante.IdPostulante);
}

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

            // auto seleccionar la primera postulación
            const first = result.Data[0];
            if (first && first.IdPostulanteVacante) {
                selectPostulacion(first.IdPostulanteVacante);
            }
        } else {
            selectedPostulaciones = [];
            $('#listaPostulaciones').html('<div class="text-muted small">No hay postulaciones para este postulante.</div>');
        }
    } catch (error) {
        console.error('Error al cargar historial completo:', error);
        $('#listaPostulaciones').html('<div class="text-muted small">Error al cargar historial.</div>');
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
            <a class="list-group-item list-group-item-action postulacion-item" data-id="${id}">
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

async function selectPostulacion(idPostulanteVacante) {
    $('#listaPostulaciones .postulacion-item').removeClass('active');
    $(`#listaPostulaciones .postulacion-item[data-id="${idPostulanteVacante}"]`).addClass('active');

    const postulacion = selectedPostulaciones.find(p => String(p.IdPostulanteVacante) === String(idPostulanteVacante));
    const nombreVacante = postulacion ? safeText(postulacion.NombreVacante) : 'Procesos';
    $('#tituloProcesos').text(nombreVacante);

    $('#timelineProcesos').html('<div class="text-muted small">Cargando procesos...</div>');
    await loadProcesosPostulacion(idPostulanteVacante);
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
        const obs = safeText(h.Observaciones, 'ninguna');
        const fecha = safeText(h.Fecha, '');

        html += `
            <div class="timeline-item">
                <span class="timeline-marker" style="background:${markerColor}"></span>
                <div class="d-flex justify-content-between align-items-start">
                    <div class="me-3">
                        <p class="timeline-title">${titulo} ${icon}</p>
                        <p class="timeline-sub text-muted">${obs}</p>
                    </div>
                    <span class="timeline-time">${fecha}</span>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

$(document).ready(function () {
    initPostulantesGeneralTable();
    loadPostulantesGeneral();
});
