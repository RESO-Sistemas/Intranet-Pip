const API_INC = "Backend/Incidencias/App.php";

let tablaIncidencias;
let listaTiposIncidencias = [];
const ESTADOS_INCIDENCIA = ['Abierta', 'En proceso', 'Resuelta'];

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Cargar tipos de incidencias y listado en paralelo
    const [tipos] = await Promise.all([
      $.ajax({ type: "POST", url: API_INC, data: { op: "getTiposIncidencias" }, dataType: "json" }),
      cargarListado()
    ]);
    listaTiposIncidencias = tipos || [];

    // Escuchar cambio en Select2 de tipo para mostrar/ocultar botón guardar
    $(document).on('change', '#slctTipoIncidenciaModal', function () {
      const val = $(this).val();
      if (val) {
        $('#btnGuardarCambios').show();
      } else if (!$('#slctEstadoIncidenciaModal').val() || $('#slctEstadoIncidenciaModal').val() === $('#slctEstadoIncidenciaModal').data('original')) {
        $('#btnGuardarCambios').hide();
      }
    });

    // Escuchar cambio en Select2 de estado
    $(document).on('change', '#slctEstadoIncidenciaModal', function () {
      const val = $(this).val();
      const original = $(this).data('original');
      if (val && val !== original) {
        $('#btnGuardarCambios').show();
      } else if (!$('#slctTipoIncidenciaModal').val()) {
        $('#btnGuardarCambios').hide();
      }
    });
  } catch (e) {
    console.error("Error al inicializar Listado de Incidencias:", e);
  }
});

// ── Cargar listado ────────────────────────────────────────────────────────────
async function cargarListado() {
  try {
    const data = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "getListadoIncidencias" },
      dataType: "json"
    });
    renderTabla(data);
  } catch (e) {
    console.error("Error al cargar listado de incidencias:", e);
    toastr.error("Error al cargar el listado de incidencias.");
  }
}

// Render tabla
function renderTabla(data) {
  const tableData = Array.isArray(data) ? data : [];

  // Si la tabla ya existe, solo actualizar datos manteniendo página y orden actual
  if ($.fn.DataTable.isDataTable('#tblIncidencias') && tablaIncidencias) {
    tablaIncidencias.clear().rows.add(tableData).draw(false);
    return;
  }

  tablaIncidencias = $('#tblIncidencias').DataTable({
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY INCIDENCIAS REGISTRADAS",
      info: "PÁGINA _PAGE_ DE _PAGES_",
      infoEmpty: "NO HAY DATOS PARA MOSTRAR",
      infoFiltered: "",
      search: "BUSCAR",
      paginate: { previous: "ANTERIOR", next: "SIGUIENTE" }
    },
    bSort: true,
    bInfo: true,
    order: [[3, 'desc']],
    data: tableData,
    columns: [
      {
        data: "NombreEmpleado",
        render: function (val) {
          return val || '<span class="text-muted">—</span>';
        }
      },
      {
        data: "Puesto",
        render: function (val) {
          return val || '<span class="text-muted">—</span>';
        }
      },
      {
        data: "TipoIncidencia",
        render: function (val) {
          return val || '<span class="text-muted">Sin tipo</span>';
        }
      },
      {
        data: "FechaRegistro",
        render: function (val) {
          if (!val) return '<span class="text-muted">—</span>';
          try {
            const d = new Date(val);
            return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
                   + ' ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
          } catch (e) {
            return val;
          }
        }
      },
      {
        data: "Estado",
        render: function (val) {
          const estado = (val || 'Abierta').trim();
          const map = {
            'Abierta':     '<span class="badge-estado-abierta">Abierta</span>',
            'En proceso':  '<span class="badge-estado-proceso">En proceso</span>',
            'Resuelta':    '<span class="badge-estado-resuelta">Resuelta</span>'
          };
          return map[estado] || '<span class="badge-estado-abierta">' + escHtml(estado) + '</span>';
        }
      },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          const id = btoa(row.IdIncidencia);

          return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-accion" title="Ver detalle"
              onclick="verDetalle('${id}')">
              <span class="material-symbols-outlined">visibility</span>
            </button>
            <button class="btn btn-info btn-accion" title="Seguimiento"
              onclick="abrirSeguimiento('${id}', '${row.Estado}')">
              <span class="material-symbols-outlined">forum</span>
            </button>
            <!--
            <button class="btn btn-warning btn-accion" title="Plan de acción"
              onclick="irPlanAccion('${id}')">
              <span class="material-symbols-outlined">assignment</span>
            </button>
            -->
          </div>`;
        }
      }
    ]
  });
}

//  Generar opciones del select de tipos
function generarOpcionesTipos(idSeleccionado) {
  let opts = '<option value="">— Seleccione un tipo —</option>';
  listaTiposIncidencias.forEach(function (t) {
    const selected = (idSeleccionado && t.IdTipoIncidencia == idSeleccionado) ? 'selected' : '';
    opts += `<option value="${t.IdTipoIncidencia}" ${selected}>${escHtml(t.Nombre)}</option>`;
  });
  return opts;
}

//  Generar opciones del select de estados
function generarOpcionesEstados(estadoActual) {
  let opts = '';
  ESTADOS_INCIDENCIA.forEach(function (e) {
    const selected = (estadoActual && e === estadoActual) ? 'selected' : '';
    opts += `<option value="${e}" ${selected}>${e}</option>`;
  });
  return opts;
}

// ── Ver Detalle — abre modal con foto, descripción
async function verDetalle(idBase64) {
  // Resetear modal
  $('#detalleIdIncidencia').val(idBase64);
  $('#detalleInfoEmpleado').html('');
  $('#detalleEvidenciaContainer').html('<p class="text-muted py-4">Cargando...</p>');
  $('#detalleDescripcion').html('');
  $('#detalleResolucion').html('');
  $('#btnGuardarCambios').hide();

  // Destruir Select2 previos si existen
  if ($('#slctTipoIncidenciaModal').hasClass('select2-hidden-accessible')) {
    $('#slctTipoIncidenciaModal').select2('destroy');
    $('#slctTipoIncidenciaModal').remove();
  }
  if ($('#slctEstadoIncidenciaModal').hasClass('select2-hidden-accessible')) {
    $('#slctEstadoIncidenciaModal').select2('destroy');
    $('#slctEstadoIncidenciaModal').remove();
  }

  const modalEl = document.getElementById('modalVerDetalle');
  let modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (!modalInstance) {
    modalInstance = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
  }
  modalInstance.show();

  try {
    const data = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "getDetalleIncidencia", id: idBase64 },
      dataType: "json"
    });

    if (!data || data.length === 0) {
      $('#detalleEvidenciaContainer').html('<p class="text-danger">No se encontró información de la incidencia.</p>');
      return;
    }

    const inc = data[0];

    // Info del empleado + Select2 inline para tipo y estado
    const opcionesTipos = generarOpcionesTipos(inc.IdTipoIncidencia);
    const opcionesEstados = generarOpcionesEstados(inc.Estado);

    $('#detalleInfoEmpleado').html(`
      <div class="detalle-info-row">
        <span class="detalle-label"><i class="fas fa-user me-1"></i> Empleado:</span>
        <span class="detalle-value fw-semibold">${escHtml(inc.NombreEmpleado)}</span>
      </div>
      <div class="detalle-info-row">
        <span class="detalle-label"><i class="fas fa-briefcase me-1"></i> Puesto:</span>
        <span class="detalle-value">${escHtml(inc.Puesto)}</span>
      </div>
      <div class="detalle-info-row">
        <span class="detalle-label"><i class="fas fa-tag me-1"></i> Tipo:</span>
        <span class="detalle-value">
          <select id="slctTipoIncidenciaModal" class="form-select" style="width:100%">
            ${opcionesTipos}
          </select>
        </span>
      </div>
      <div class="detalle-info-row">
        <span class="detalle-label"><i class="fas fa-info-circle me-1"></i> Estado:</span>
        <span class="detalle-value">
          <select id="slctEstadoIncidenciaModal" class="form-select" style="width:100%">
            ${opcionesEstados}
          </select>
        </span>
      </div>
      <div class="detalle-info-row">
        <span class="detalle-label"><i class="fas fa-calendar me-1"></i> Fecha:</span>
        <span class="detalle-value">${formatFecha(inc.FechaRegistro)}</span>
      </div>
    `);

    // Inicializar Select2 de tipo
    $('#slctTipoIncidenciaModal').select2({
      dropdownParent: $('#modalVerDetalle'),
      placeholder: '— Seleccione un tipo —',
      width: '100%'
    });

    // Inicializar Select2 de estado
    $('#slctEstadoIncidenciaModal').select2({
      dropdownParent: $('#modalVerDetalle'),
      width: '100%'
    });
    // Guardar valor original para detectar cambios
    $('#slctEstadoIncidenciaModal').data('original', inc.Estado || 'Abierta');

    if (inc.Estado === 'Resuelta') {
      $('#slctTipoIncidenciaModal').prop('disabled', true);
      $('#slctEstadoIncidenciaModal').prop('disabled', true);
    }

    // Ocultar botón guardar hasta que haya cambios
    $('#btnGuardarCambios').hide();

    // Evidencia (imagen) - soporta nombre de archivo legacy y data URI en BD.
    const evidenciaSrc = getEvidenciaSrc(inc.Evidencia);
    if (evidenciaSrc) {
      $('#detalleEvidenciaContainer').html(`
        <h6 class="fw-bold mb-2"><i class="fas fa-camera me-1"></i> Evidencia fotográfica</h6>
        <img src="${escAttr(evidenciaSrc)}" 
             alt="Evidencia de incidencia" 
             class="evidencia-img"
             onerror="this.onerror=null; this.parentElement.innerHTML='<p class=\\'text-muted\\'>No se pudo cargar la imagen de evidencia.</p>';">
      `);
    } else {
      $('#detalleEvidenciaContainer').html('<p class="text-muted"><i class="fas fa-image me-1"></i> Sin evidencia fotográfica</p>');
    }

    // Descripción
    $('#detalleDescripcion').html(`
      <h6 class="fw-bold mb-2"><i class="fas fa-align-left me-1"></i> Descripción del problema</h6>
      <div class="p-3" style="background:#f8f9fa; border-radius:8px; border:1px solid #e9ecef;">
        <p class="mb-0" style="white-space: pre-wrap;">${escHtml(inc.Descripcion || 'Sin descripción')}</p>
      </div>
    `);

    // Detalles de Resolución
    if (inc.Estado === 'Resuelta' && (inc.FechaResuelto || inc.PuestoResponsable)) {
      $('#detalleResolucion').html(`
        <div class="p-3 mb-3" style="background:#eafaf1; border-radius:8px; border:1px solid #c3e6cb;">
          <h6 class="fw-bold mb-2 text-success"><i class="fas fa-check-double me-1"></i> Incidencia Resuelta</h6>
          <div class="detalle-info-row border-0 mb-2">
            <span class="detalle-label"><i class="fas fa-briefcase text-success me-1"></i> Puesto responsable:</span>
            <span class="detalle-value fw-semibold text-dark">${escHtml(inc.PuestoResponsable || '—')}</span>
          </div>
          <div class="detalle-info-row border-0">
            <span class="detalle-label"><i class="fas fa-calendar-check text-success me-1"></i> Fecha resuelto:</span>
            <span class="detalle-value">${formatFecha(inc.FechaResuelto)}</span>
          </div>
        </div>
      `);
    } else {
      $('#detalleResolucion').html('');
    }

  } catch (e) {
    console.error("Error al cargar detalle:", e);
    $('#detalleEvidenciaContainer').html('<p class="text-danger">Error al cargar el detalle de la incidencia.</p>');
  }
}

//  Guardar cambios (tipo y/o estado)
async function guardarCambiosIncidencia() {
  const idBase64 = $('#detalleIdIncidencia').val();
  const idTipo = $('#slctTipoIncidenciaModal').val();
  const estado = $('#slctEstadoIncidenciaModal').val();
  const estadoOriginal = $('#slctEstadoIncidenciaModal').data('original');

  let promesas = [];

  // Guardar tipo si se seleccionó uno
  if (idTipo) {
    promesas.push(
      $.ajax({
        type: "POST", url: API_INC,
        data: { op: "asignarTipoIncidencia", id: idBase64, idTipoIncidencia: idTipo },
        dataType: "json"
      })
    );
  }

  // Guardar estado si cambió
  if (estado && estado !== estadoOriginal) {
    promesas.push(
      $.ajax({
        type: "POST", url: API_INC,
        data: { op: "updateEstadoIncidencia", id: idBase64, estado: estado },
        dataType: "json"
      })
    );
  }

  if (promesas.length === 0) {
    toastr.warning('No hay cambios para guardar.');
    return;
  }

  try {
    const resultados = await Promise.all(promesas);
    const todoBien = resultados.every(r => r && r.Resultado && r.Siguiente);

    if (todoBien) {
      toastr.success('Cambios guardados con éxito.');
      // Cerrar modal
      const modalEl = document.getElementById('modalVerDetalle');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
      // Recargar tabla
      await cargarListado();
    } else {
      toastr.error('Hubo un error al guardar los cambios.');
    }
  } catch (e) {
    console.error('Error al guardar cambios:', e);
    toastr.error('Error al guardar los cambios.');
  }
}

// ── Seguimiento (Línea de Vida) ─
function abrirSeguimiento(idBase64, estado) {
  $('#segIdIncidencia').val(idBase64);
  $('#txtNuevoTitulo').val('');
  $('#txtNuevoMensaje').val('');
  $('#timelineSeguimiento').html('<div class="text-muted small text-center"><i class="fas fa-spinner fa-spin me-2"></i>Cargando mensajes...</div>');
  
  if (estado === 'Resuelta') {
    $('#nuevoMensajeSeccion').hide();
    $('#mensajeResueltoAviso').show();
  } else {
    $('#nuevoMensajeSeccion').show();
    $('#mensajeResueltoAviso').hide();
  }

  const modalEl = document.getElementById('modalSeguimiento');
  let modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (!modalInstance) {
    modalInstance = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
  }
  modalInstance.show();

  cargarTimelineSeguimiento(idBase64);
}

async function cargarTimelineSeguimiento(idBase64) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "getSeguimientoIncidencia", idIncidencia: idBase64 },
      dataType: "json"
    });

    if (response && response.Resultado && Array.isArray(response.Data)) {
      renderTimelineSeguimiento(response.Data);
    } else {
      $('#timelineSeguimiento').html('<div class="text-muted small text-center">No hay mensajes registrados.</div>');
    }
  } catch (error) {
    console.error('Error al cargar seguimiento:', error);
    $('#timelineSeguimiento').html('<div class="text-danger small text-center">Error al cargar el historial.</div>');
  }
}

function renderTimelineSeguimiento(items) {
  if (!items || items.length === 0) {
    $('#timelineSeguimiento').html('<div class="text-muted small text-center">No hay mensajes registrados.</div>');
    return;
  }

  let html = '<div class="timeline">';

  items.forEach((h, index) => {
    const isLast = (index === items.length - 1);
    const tituloMsg = escHtml(h.Titulo || 'Mensaje de Seguimiento');
    const obs = escHtml(h.Mensaje);
    const fecha = formatFecha(h.FechaRegistro);

    html += `
        <div class="timeline-item d-flex ${!isLast ? 'mb-4' : 'mb-0'}">
            <div class="timeline-marker me-3" style="min-width: 12px; display: flex; flex-direction: column; align-items: center;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #0d6efd;"></div>
                <div style="flex: 1; width: 2px; background-color: #e9ecef; margin-top: 4px;"></div>
            </div>
            <div class="timeline-content w-100 pb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="mb-1 text-dark fw-bold">${tituloMsg}</h5>
                    <small class="text-muted">${fecha}</small>
                </div>
                <p class="mb-0 text-muted" style="white-space: pre-wrap;">${obs}</p>
            </div>
        </div>
    `;
  });

  html += '</div>';
  $('#timelineSeguimiento').html(html);
}

async function enviarMensajeSeguimiento() {
  const idBase64 = $('#segIdIncidencia').val();
  const titulo = $('#txtNuevoTitulo').val().trim();
  const mensaje = $('#txtNuevoMensaje').val().trim();

  if (!titulo) {
    toastr.warning('Por favor, escribe un título.');
    return;
  }
  if (!mensaje) {
    toastr.warning('Por favor, escribe un mensaje.');
    return;
  }

  const btn = $('#btnEnviarMensaje');
  btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Enviando...');

  try {
    const response = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "addSeguimientoIncidencia", idIncidencia: idBase64, titulo: titulo, mensaje: mensaje },
      dataType: "json"
    });

    if (response && response.Resultado) {
      toastr.success('Mensaje enviado.');
      $('#txtNuevoTitulo').val('');
      $('#txtNuevoMensaje').val('');
      cargarTimelineSeguimiento(idBase64);
    } else {
      toastr.error('Error al enviar el mensaje.');
    }
  } catch (error) {
    console.error('Error al enviar seguimiento:', error);
    toastr.error('Error al comunicarse con el servidor.');
  } finally {
    btn.prop('disabled', false).html('<i class="fas fa-paper-plane me-1"></i> Enviar');
  }
}

// ── Plan de Acción —
function irPlanAccion(idBase64) {
  window.location.href = `PlanAccionIncidencia.php?id=${idBase64}`;
}

// ── Helpers ──

function renderEstadoBadge(estado) {
  const e = (estado || 'Abierta').trim();
  const map = {
    'Abierta':     '<span class="badge-estado-abierta">Abierta</span>',
    'En proceso':  '<span class="badge-estado-proceso">En proceso</span>',
    'Resuelta':    '<span class="badge-estado-resuelta">Resuelta</span>'
  };
  return map[e] || '<span class="badge-estado-abierta">' + escHtml(e) + '</span>';
}

function formatFecha(fecha) {
  if (!fecha) return '—';
  try {
    const d = new Date(fecha);
    return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
           + ' ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return fecha;
  }
}

function escHtml(str) {
  if (!str && str !== 0) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getEvidenciaSrc(evidencia) {
  if (!evidencia) return '';
  const val = String(evidencia).trim();
  if (!val) return '';

  // Nuevo formato desde API/BD.
  if (/^data:image\/(jpeg|jpg|png|gif|webp);base64,/i.test(val)) {
    return val;
  }

  // Compatibilidad con formato previo (nombre de archivo en proyecto).
  return 'Archivos/Incidencias/' + encodeURIComponent(val);
}
