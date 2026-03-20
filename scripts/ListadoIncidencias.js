// ══════════════════════════════════════════════════════════════════════════════
//  ListadoIncidencias.js — Módulo de Incidencias
// ══════════════════════════════════════════════════════════════════════════════

const API_INC = "Backend/Incidencias/App.php";

let tablaIncidencias;
let listaTiposIncidencias = [];

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Cargar tipos de incidencias y listado en paralelo
    const [tipos] = await Promise.all([
      $.ajax({ type: "POST", url: API_INC, data: { op: "getTiposIncidencias" }, dataType: "json" }),
      cargarListado()
    ]);
    listaTiposIncidencias = tipos || [];

    // Escuchar cambio en Select2 para mostrar/ocultar botón guardar
    $(document).on('change', '#slctTipoIncidenciaModal', function () {
      const val = $(this).val();
      if (val) {
        $('#btnGuardarTipo').show();
      } else {
        $('#btnGuardarTipo').hide();
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

// ── Render tabla ──────────────────────────────────────────────────────────────
function renderTabla(data) {
  // Destruir tabla previa si existe
  if ($.fn.DataTable.isDataTable('#tblIncidencias')) {
    $('#tblIncidencias').DataTable().destroy();
  }

  tablaIncidencias = $('#tblIncidencias').DataTable({
    destroy: true,
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
    data: Array.isArray(data) ? data : [],
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
            <button class="btn btn-info btn-accion" title="Seguimiento (en desarrollo)"
              onclick="abrirSeguimiento('${id}')">
              <span class="material-symbols-outlined">forum</span>
            </button>
            <button class="btn btn-warning btn-accion" title="Plan de acción"
              onclick="irPlanAccion('${id}')">
              <span class="material-symbols-outlined">assignment</span>
            </button>
          </div>`;
        }
      }
    ]
  });
}

// ── Generar opciones del select de tipos ──────────────────────────────────────
function generarOpcionesTipos(idSeleccionado) {
  let opts = '<option value="">— Seleccione un tipo —</option>';
  listaTiposIncidencias.forEach(function (t) {
    const selected = (idSeleccionado && t.IdTipoIncidencia == idSeleccionado) ? 'selected' : '';
    opts += `<option value="${t.IdTipoIncidencia}" ${selected}>${escHtml(t.Nombre)}</option>`;
  });
  return opts;
}

// ── Ver Detalle — abre modal con foto, descripción y Select2 de tipo ─────────
async function verDetalle(idBase64) {
  // Resetear modal
  $('#detalleIdIncidencia').val(idBase64);
  $('#detalleInfoEmpleado').html('');
  $('#detalleEvidenciaContainer').html('<p class="text-muted py-4">Cargando...</p>');
  $('#detalleDescripcion').html('');
  $('#btnGuardarTipo').hide();

  // Destruir Select2 previo si existe
  if ($('#slctTipoIncidenciaModal').hasClass('select2-hidden-accessible')) {
    $('#slctTipoIncidenciaModal').select2('destroy');
    $('#slctTipoIncidenciaModal').remove();
  }

  const modal = new bootstrap.Modal(document.getElementById('modalVerDetalle'), {
    backdrop: 'static',
    keyboard: false
  });
  modal.show();

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

    // Info del empleado + Select2 inline para tipo
    const estadoBadge = renderEstadoBadge(inc.Estado);
    const opcionesTipos = generarOpcionesTipos(inc.IdTipoIncidencia);

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
        <span class="detalle-label"><i class="fas fa-calendar me-1"></i> Fecha:</span>
        <span class="detalle-value">${formatFecha(inc.FechaRegistro)}</span>
      </div>
      <div class="detalle-info-row">
        <span class="detalle-label"><i class="fas fa-info-circle me-1"></i> Estado:</span>
        <span class="detalle-value">${estadoBadge}</span>
      </div>
    `);

    // Inicializar Select2 sobre el select recién creado
    $('#slctTipoIncidenciaModal').select2({
      dropdownParent: $('#modalVerDetalle'),
      placeholder: '— Seleccione un tipo —',
      width: '100%'
    });

    // Si ya tiene tipo asignado, ocultar botón; si no, también ocultar hasta que seleccione
    $('#btnGuardarTipo').hide();

    // Evidencia (imagen)
    if (inc.Evidencia) {
      $('#detalleEvidenciaContainer').html(`
        <h6 class="fw-bold mb-2"><i class="fas fa-camera me-1"></i> Evidencia fotográfica</h6>
        <img src="Archivos/Incidencias/${escHtml(inc.Evidencia)}" 
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

  } catch (e) {
    console.error("Error al cargar detalle:", e);
    $('#detalleEvidenciaContainer').html('<p class="text-danger">Error al cargar el detalle de la incidencia.</p>');
  }
}

// ── Guardar tipo de incidencia ─────────────────────────────────────────
async function guardarTipoIncidencia() {
  const idBase64 = $('#detalleIdIncidencia').val();
  const idTipo = $('#slctTipoIncidenciaModal').val();

  if (!idTipo) {
    toastr.warning('Seleccione un tipo de incidencia antes de guardar.');
    return;
  }

  try {
    const resp = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "asignarTipoIncidencia", id: idBase64, idTipoIncidencia: idTipo },
      dataType: "json"
    });

    if (resp && resp.Resultado && resp.Siguiente) {
      toastr.success(resp.Msg);
      // Cerrar modal
      const modalEl = document.getElementById('modalVerDetalle');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
      // Recargar tabla
      await cargarListado();
    } else {
      toastr.error(resp.Msg || 'Error al asignar el tipo.');
    }
  } catch (e) {
    console.error('Error al asignar tipo:', e);
    toastr.error('Error al asignar el tipo de incidencia.');
  }
}

// ── Seguimiento — placeholder ─────────────────────────────────────────────────
function abrirSeguimiento(idBase64) {
  const modal = new bootstrap.Modal(document.getElementById('modalSeguimiento'));
  modal.show();
}

// ── Plan de Acción — placeholder por definir ──────────────────────────────────
function irPlanAccion(idBase64) {
  Swal.fire({
    title: 'Plan de Acción',
    text: 'Esta funcionalidad está en desarrollo. Próximamente podrás crear y gestionar planes de acción para esta incidencia.',
    icon: 'info',
    confirmButtonColor: '#ffc407',
    confirmButtonText: 'Entendido'
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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
