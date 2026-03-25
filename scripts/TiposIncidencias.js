const API_TI = "Backend/TiposIncidencias/App.php";

let listaPuestosTI = [];
let tablaTI;

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const [puestos, tipos] = await Promise.all([
      $.ajax({ type: "post", url: API_TI, data: { op: "getPuestos" }, dataType: "json" }),
      $.ajax({ type: "post", url: API_TI, data: { op: "getTiposIncidencias" }, dataType: "json" })
    ]);
    listaPuestosTI = puestos;
    _poblarSelectPuestos('#slctPuesto');
    _renderTabla(tipos);
  } catch (e) {
    console.error("Error al inicializar Tipos de Incidencias:", e);
  }
});

// ── Poblar select de puestos ──────────────────────────────────────────────────
function _poblarSelectPuestos(selector) {
  let opts = '<option value="">— Todos los puestos —</option>';
  listaPuestosTI.forEach(function (p) {
    opts += `<option value="${p.IdPuesto}">${p.Puesto}</option>`;
  });
  $(selector).html(opts);
}

// ── Render tabla ──────────────────────────────────────────────────────────────
function _renderTabla(data) {
  tablaTI = $('#TableTiposIncidencias').DataTable({
    destroy: true,
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY TIPOS DE INCIDENCIAS REGISTRADOS",
      info: "PÁGINA _PAGE_ DE _PAGES_",
      infoEmpty: "NO HAY DATOS PARA MOSTRAR",
      infoFiltered: "",
      search: "BUSCAR",
      paginate: { previous: "ANTERIOR", next: "SIGUIENTE" }
    },
    bSort: false,
    bInfo: false,
    data: data,
    columns: [
      { data: "Nombre" },
      {
        data: "NivelSeveridad",
        render: function (val) {
          const map = {
            'Baja':    '<span class="badge-sev-baja">Baja</span>',
            'Media':   '<span class="badge-sev-media">Media</span>',
            'Alta':    '<span class="badge-sev-alta">Alta</span>',
            'Crítica': '<span class="badge-sev-critica">Crítica</span>'
          };
          return map[val] || val;
        }
      },
      { data: "NombrePuesto" },
      {
        data: "SLA_Horas",
        render: function (val) { return val + ' h'; }
      },
      {
        data: "Activo",
        render: function (val) {
          return val == 1
            ? '<span class="badge-activo">Activo</span>'
            : '<span class="badge-inactivo">Inactivo</span>';
        }
      },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          const id          = btoa(row.IdTipoIncidencia);
          const toggleIcon  = row.Activo == 1 ? 'toggle_on'  : 'toggle_off';
          const toggleColor = row.Activo == 1 ? 'btn-success' : 'btn-danger';
          const toggleTitle = row.Activo == 1 ? 'Desactivar'  : 'Activar';
          const nuevoEstado = row.Activo == 1 ? 0 : 1;

          return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-sm" title="Editar"
              onclick="abrirEdicion('${id}','${escTI(row.Nombre)}','${escTI(row.NivelSeveridad)}','${row.IdPuesto || ''}','${row.SLA_Horas}')">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn ${toggleColor} btn-sm" title="${toggleTitle}"
              onclick="toggle('${id}', ${nuevoEstado})">
              <span class="material-symbols-outlined">${toggleIcon}</span>
            </button>
            <button class="btn btn-danger btn-sm" title="Eliminar"
              onclick="eliminar('${id}')">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>`;
        }
      }
    ]
  });
}

// ── Utilitario escape ─────────────────────────────────────────────────────────
function escTI(str) {
  if (!str) return '';
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ── Recargar tabla ────────────────────────────────────────────────────────────
async function recargarTabla() {
  try {
    const data = await $.ajax({ type: "post", url: API_TI, data: { op: "getTiposIncidencias" }, dataType: "json" });
    _renderTabla(data);
  } catch (e) { console.error(e); }
}

// ── Mostrar / ocultar formulario ──────────────────────────────────────────────
function mostrarForm() {
  const sec = document.getElementById('seccionForm');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function ocultarForm() {
  document.getElementById('seccionForm').style.display = 'none';
  limpiarForm();
}

// ── Limpiar formulario ────────────────────────────────────────────────────────
function limpiarForm() {
  $('#txtId').val('');
  $('#txtNombre').val('');
  $('#slctSeveridad').val('').trigger('change');
  $('#slctPuesto').val('').trigger('change');
  $('#txtSLA').val('');
  // Si existe el título del modal, lo actualiza
  if ($('#formTitle').length) {
    $('#formTitle').text('Nuevo Tipo de Incidencia');
  }
  $('#btnRegistrar').html('<i class="fas fa-plus me-1"></i>Registrar');
  // Ya no se oculta 'seccionForm', porque el formulario está en el modal
}

// ── Guardar (insertar) ────────────────────────────────────────────────────────
async function guardar() {
  const nombre    = $('#txtNombre').val().trim();
  const severidad = $('#slctSeveridad').val();
  const idPuesto  = $('#slctPuesto').val();
  const slaHoras  = $('#txtSLA').val();

  if (!nombre)    { toastr.warning("Ingrese el nombre del tipo de incidencia."); return; }
  if (!severidad) { toastr.warning("Seleccione el nivel de severidad."); return; }
  if (!slaHoras || parseInt(slaHoras) < 1) { toastr.warning("Ingrese el tiempo SLA en horas (mínimo 1)."); return; }

  const ajaxR = await pAjaxAsync(API_TI, {
    op: "insertTipoIncidencia", nombre, severidad,
    idPuesto: idPuesto || '', slaHoras
  }, 1);

  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    // Cerrar el modal correctamente usando Bootstrap 5
    if (window.bootstrap && bootstrap.Modal) {
      const modalEl = document.getElementById('modalRegistrarTipo');
      if (modalEl) {
        let modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (!modalInstance) modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }
    } else {
      $('#modalRegistrarTipo').modal('hide');
    }
    limpiarForm();
    await recargarTablaOrdenada();
  // Refresca la tabla y ordena por el registro más reciente arriba
  async function recargarTablaOrdenada() {
    try {
      const data = await $.ajax({ type: "post", url: API_TI, data: { op: "getTiposIncidencias" }, dataType: "json" });
      if (Array.isArray(data)) {
        data.sort((a, b) => Number(b.IdTipoIncidencia) - Number(a.IdTipoIncidencia));
        console.log('Datos recargados y ordenados:', data);
      } else {
        console.warn('La respuesta de getTiposIncidencias no es un array:', data);
      }
      _renderTabla(data);
    } catch (e) { console.error('Error en recargarTablaOrdenada:', e); }
  }
  }
}

// ── Abrir modal edición ───────────────────────────────────────────────────────
function abrirEdicion(id, nombre, severidad, idPuesto, slaHoras) {
  $('#modalId').val(id);
  $('#modalNombre').val(nombre);
  $('#modalSLA').val(slaHoras);

  // Poblar puestos en el modal
  _poblarSelectPuestos('#modalPuesto');

  $('#modalSeveridad').val(severidad).trigger('change');
  $('#modalPuesto').val(idPuesto || '').trigger('change');

  // Abrir el modal con opciones para que no se cierre por fondo ni ESC
  const modal = new bootstrap.Modal(document.getElementById('modalEditar'), {
    backdrop: 'static',
    keyboard: false
  });
  modal.show();
}

// ── Guardar edición ───────────────────────────────────────────────────────────
async function guardarEdicion() {
  const id        = $('#modalId').val();
  const nombre    = $('#modalNombre').val().trim();
  const severidad = $('#modalSeveridad').val();
  const idPuesto  = $('#modalPuesto').val();
  const slaHoras  = $('#modalSLA').val();

  if (!nombre)    { toastr.warning("Ingrese el nombre del tipo de incidencia."); return; }
  if (!severidad) { toastr.warning("Seleccione el nivel de severidad."); return; }
  if (!slaHoras || parseInt(slaHoras) < 1) { toastr.warning("Ingrese el tiempo SLA en horas (mínimo 1)."); return; }

  const ajaxR = await pAjaxAsync(API_TI, {
    op: "updateTipoIncidencia", id, nombre, severidad,
    idPuesto: idPuesto || '', slaHoras
  }, 1);

  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
    recargarTabla();
  }
}

// ── Toggle activo/inactivo ────────────────────────────────────────────────────
async function toggle(id, nuevoEstado) {
  const accion = nuevoEstado == 1 ? "activar" : "desactivar";
  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas ${accion} este tipo de incidencia?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ffc407',
    cancelButtonColor: '#6c757d',
    confirmButtonText: `Sí, ${accion}`,
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const ajaxR = await pAjaxAsync(API_TI, { op: "toggleTipoIncidencia", id, activo: nuevoEstado }, 1);
      if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) { recargarTabla(); }
    }
  });
}

// ── Eliminar ──────────────────────────────────────────────────────────────────
async function eliminar(id) {
  Swal.fire({
    title: '¿Eliminar tipo de incidencia?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const ajaxR = await pAjaxAsync(API_TI, { op: "deleteTipoIncidencia", id }, 1);
      if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) { recargarTabla(); }
    }
  });
}
