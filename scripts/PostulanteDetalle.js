$(document).ready(function() {
    if (typeof ID_POSTULANTE !== 'undefined' && ID_POSTULANTE > 0) {
        loadVacantesPostulante(ID_POSTULANTE);
    } else {
        $('#vacantesList').html('<li><a href="#" class="text-danger"><i class="material-icons-outlined">error</i>Postulante no válido</a></li>');
    }
});

function toB64Int(value) {
    return btoa(String(parseInt(value)));
}

function safeText(value, fallback = '-') {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text.length ? text : fallback;
}

async function loadVacantesPostulante(idPostulante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteHistorialCompleto',
            IdPostulante: toB64Int(idPostulante)
        });

        const result = JSON.parse(response);

        if (result && result.Siguiente && Array.isArray(result.Data) && result.Data.length > 0) {
            renderVacantesList(result.Data);
        } else {
            $('#vacantesList').html('<li><a href="#" class="text-muted"><i class="material-icons-outlined">info</i>No hay vacantes</a></li>');
        }
    } catch (error) {
        console.error('Error al cargar vacantes:', error);
        $('#vacantesList').html('<li><a href="#" class="text-danger"><i class="material-icons-outlined">error</i>Error al cargar</a></li>');
    }
}

function renderVacantesList(list) {
    const html = list.map((pv, index) => {
        const id = pv.IdPostulanteVacante;
        const nombreVacante = safeText(pv.NombreVacante);
        const isActive = index === 0 ? 'active' : ''; 
        
        // Icono dependiendo del estado (opcional, por ahora usamos "work")
        const icon = '<i class="material-icons-outlined">work</i>';

        return `
            <li>
                <a href="#" class="${isActive} vacante-item" data-id="${id}">
                    ${icon}${nombreVacante}
                </a>
            </li>
        `;
    }).join('');

    $('#vacantesList').html(html);

    // Evento click
    $('#vacantesList .vacante-item').on('click', function(e) {
        e.preventDefault();
        $('#vacantesList .vacante-item').removeClass('active');
        $(this).addClass('active');
        
        const idVacante = $(this).data('id');
        const nombreText = $(this).text().trim().replace('work', '');
        $('#tituloVacante').text(nombreText);
        loadProcesosPostulacion(idVacante);
    });

    if (list.length > 0) {
        const first = list[0];
        $('#tituloVacante').text(safeText(first.NombreVacante));
        loadProcesosPostulacion(first.IdPostulanteVacante);
    } else {
        $('#tituloVacante').text('Sin vacantes');
        $('#timelineProcesos').html('<div class="text-muted small">No hay postulaciones.</div>');
    }
}

async function loadProcesosPostulacion(idPostulanteVacante) {
    $('#timelineProcesos').html('<div class="spinner-border text-primary spinner-border-sm" role="status"></div> Cargando procesos...');
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getProcesosPostulacion',
            IdPostulanteVacante: toB64Int(idPostulanteVacante)
        });

        const result = JSON.parse(response);
        console.log('getProcesosPostulacion response:', response);
        console.log('getProcesosPostulacion parsed:', result);

        if (result && result.Siguiente && Array.isArray(result.Data) && result.Data.length > 0) {
            $('#timelineProcesos').html(renderTimeline(result.Data));
        } else {
            $('#timelineProcesos').html('<div class="text-muted small">No hay procesos registrados para esta vacante.</div>');
            console.warn('No data or Siguiente=false. Full result:', result);
        }
    } catch (error) {
        console.error('Error al cargar procesos:', error);
        $('#timelineProcesos').html('<div class="text-danger small">Error al cargar procesos.</div>');
    }
}

function renderTimeline(items) {
    let html = '<div class="timeline">';

    items.forEach(h => {
        const isOk = h.Resultado == 1;
        const isNo = h.Resultado == 0;
        const markerColor = isOk ? '#28a745' : (isNo ? '#dc3545' : '#6c757d');
        const icon = isOk
            ? '<span class="material-symbols-outlined text-success timeline-icon" style="font-size: 1.2rem; vertical-align: middle;">check_circle</span>'
            : (isNo ? '<span class="material-symbols-outlined text-danger timeline-icon" style="font-size: 1.2rem; vertical-align: middle;">cancel</span>' : '');

        const titulo = safeText(h.NombreProceso || h.Proceso || 'Proceso');
        const obs = safeText(h.Observaciones, 'Sin observaciones');
        const fecha = safeText(h.Fecha, '');
        const usuario = safeText(h.NombreUsuario, '');

        html += `
            <div class="timeline-item d-flex mb-4">
                <div class="timeline-marker me-3" style="min-width: 12px; display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${markerColor};"></div>
                    <div style="flex: 1; width: 2px; background-color: #e9ecef; margin-top: 4px;"></div>
                </div>
                <div class="timeline-content w-100 pb-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="mb-1 text-dark fw-bold">${titulo} ${icon}</h5>
                        <small class="text-muted">${fecha}</small>
                    </div>
                    <p class="mb-0 text-muted">${obs}</p>
                    ${usuario ? `<small class="text-primary mt-1 d-block"><span class="material-icons-outlined" style="font-size: 14px; vertical-align: middle;">person</span> ${usuario}</small>` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

