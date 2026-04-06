let vacantesDataList = [];

$(document).ready(function() {
    if (typeof ID_POSTULANTE !== 'undefined' && ID_POSTULANTE > 0) {
        loadPostulanteInfo(ID_POSTULANTE);
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
    vacantesDataList = list;
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

        const row = vacantesDataList.find(v => v.IdPostulanteVacante == idVacante);
        if (row) {
            $('#contenedorBotonesDocumentos').html(renderBotonesDocumentos(row.RutaCV || "", row.RutaSolicitudEmpleo || "", "El postulante"));
        }

        loadProcesosPostulacion(idVacante);
    });

    if (list.length > 0) {
        const first = list[0];
        $('#tituloVacante').text(safeText(first.NombreVacante));
        $('#contenedorBotonesDocumentos').html(renderBotonesDocumentos(first.RutaCV || "", first.RutaSolicitudEmpleo || "", "El postulante"));
        loadProcesosPostulacion(first.IdPostulanteVacante);
    } else {
        $('#tituloVacante').text('Sin vacantes');
        $('#timelineProcesos').html('<div class="text-muted small">No hay postulaciones.</div>');
        $('#contenedorBotonesDocumentos').html('<div class="text-muted small">No hay vacantes</div>');
    }
}

function buildDownloadUrl(viewUrl) {
    if (!viewUrl) return '';
    return viewUrl.replace('op=viewArchivo', 'op=downloadArchivo');
}

function renderBotonesDocumentos(rutaCV, rutaSE, nombrePostulante = "Postulante") {
  if (rutaCV == "NULL" || rutaCV == "null") rutaCV = "";
  if (rutaSE == "NULL" || rutaSE == "null") rutaSE = "";

  const hasCV = !!rutaCV;
  const hasSE = !!rutaSE;
  let html = '<div class="d-flex flex-column gap-2">';
  if (hasCV) {
    html += `
      <a href="${rutaCV}" target="_blank" class="btn btn-secondary text-white w-100 mb-1" style="border-radius:6px;">
        Ver CV
      </a>
      <a href="${buildDownloadUrl(rutaCV)}" target="_blank" class="btn btn-outline-secondary btn-sm w-100" style="border-radius:6px;">
        Descargar CV
      </a>
    `;
  }
  if (hasSE) {
    html += `
      <a href="${rutaSE}" target="_blank" class="btn btn-secondary text-white w-100 mb-1" style="border-radius:6px;">
        Ver Solicitud
      </a>
      <a href="${buildDownloadUrl(rutaSE)}" target="_blank" class="btn btn-outline-secondary btn-sm w-100" style="border-radius:6px;">
        Descargar Solicitud
      </a>
    `;
  }
  if (!hasCV && !hasSE) {
    html += `<div class="alert alert-warning mb-0 small text-center"><i class="material-icons-outlined align-middle mb-1">sentiment_dissatisfied</i><br>Sin documentos.</div>`;
  }
  html += "</div>";
  return html;
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

// Cargar información completa del postulante
async function loadPostulanteInfo(idPostulante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteById',
            IdPostulante: toB64Int(idPostulante)
        });

        const result = JSON.parse(response);

        if (result && result.Siguiente && result.Data) {
            const p = result.Data;
            
            // Llenar campos de información
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

            // Cargar historial de teléfonos
            if (window.PostulanteEditor && typeof window.PostulanteEditor.cargarTelefonosPostulante === 'function') {
                window.PostulanteEditor.cargarTelefonosPostulante(idPostulante);
            }
        } else {
            console.error('Error al cargar información del postulante:', result);
        }
    } catch (error) {
        console.error('Error en loadPostulanteInfo:', error);
    }
}
