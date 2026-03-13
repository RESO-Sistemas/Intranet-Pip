const url_m_Turnos = "Backend/Turnos/App.php";

let listaPuestosTurnos = [];
let tablaTurnosInstance = null;

// Cargar al inicio — ambas peticiones en paralelo
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const [puestos, turnos] = await Promise.all([
      $.ajax({ type: "post", url: url_m_Turnos, data: { op: "getPuestos" }, dataType: "json" }),
      $.ajax({ type: "post", url: url_m_Turnos, data: { op: "getTurnos" }, dataType: "json" })
    ]);
    listaPuestosTurnos = puestos;
    let opts = '<option value="" disabled selected>Seleccione un puesto</option>';
    puestos.forEach(function (p) { opts += `<option value="${p.IdPuesto}">${p.Puesto}</option>`; });
    $('#slctPuesto').html(opts);
    $('#modalSlctPuesto').html(opts);
    _renderTablaTurnos(turnos);
  } catch (e) {
    console.error("Error al inicializar:", e);
  }
});

/**
 * Cargar puestos en el select
 */
async function cargarPuestosTurnos() {
  try {
    const respuesta = await $.ajax({
      type: "post",
      url: url_m_Turnos,
      data: { op: "getPuestos" },
      dataType: "json",
    });
    listaPuestosTurnos = respuesta;
    let options = '<option value="" disabled selected>Seleccione un puesto</option>';
    respuesta.forEach(function (p) {
      options += `<option value="${p.IdPuesto}">${p.Puesto}</option>`;
    });
    $('#slctPuesto').html(options);

    // Poblar también el modal
    let optionsModal = '<option value="" disabled selected>Seleccione un puesto</option>';
    respuesta.forEach(function (p) {
      optionsModal += `<option value="${p.IdPuesto}">${p.Puesto}</option>`;
    });
    $('#modalSlctPuesto').html(optionsModal);
  } catch (e) {
    console.error("Error al cargar puestos:", e);
  }
}

/**
 * Obtener nombre de puesto por ID
 */
function getNombrePuestoTurno(id) {
  const p = listaPuestosTurnos.find(x => x.IdPuesto == id);
  return p ? p.Puesto : id;
}

/**
 * Obtener listado de turnos y pintar la tabla (para refrescos post-CRUD)
 */
async function getTurnos() {
  try {
    const respuesta = await $.ajax({
      type: "post",
      url: url_m_Turnos,
      data: { op: "getTurnos" },
      dataType: "json",
    });
    _renderTablaTurnos(respuesta);
  } catch (e) {
    console.error("Error al obtener turnos:", e);
  }
}

/**
 * Renderizar la tabla con datos ya cargados
 */
function _renderTablaTurnos(respuesta) {
  // Orden más reciente primero si no hay orden guardado
  const ordenGuardado = localStorage.getItem('turnos_custom_order');
  if (ordenGuardado) {
    try {
      const ids = JSON.parse(ordenGuardado);
      const map = {};
      respuesta.forEach(function (r) { map[r.IdTurno] = r; });
      const nuevos = respuesta.filter(function (r) { return !ids.includes(r.IdTurno); });
      const existentes = ids.filter(function (id) { return map[id]; }).map(function (id) { return map[id]; });
      respuesta = nuevos.concat(existentes);
      localStorage.setItem('turnos_custom_order', JSON.stringify(respuesta.map(function (r) { return r.IdTurno; })));
    } catch (e) { /* ignorar JSON corrupto */ }
  } else {
    respuesta = respuesta.slice().sort(function (a, b) { return b.IdTurno - a.IdTurno; });
  }

  tablaTurnosInstance = $('#TableTurnos').DataTable({
    destroy: true,
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY TURNOS REGISTRADOS",
      info: "PÁGINA _PAGE_ DE _PAGES_",
      infoEmpty: "NO HAY DATOS PARA MOSTRAR",
      infoFiltered: "",
      search: "BUSCAR",
      paginate: { previous: "ANTERIOR", next: "SIGUIENTE" }
    },
    bSort: true,
    bPaginate: true,
    bFilter: true,
    bInfo: false,
    data: respuesta,
    columns: [
      { data: "Nombre", orderable: true },
      {
        data: "HoraInicio",
        orderable: false,
        render: function (data) {
          // Formatear HH:MM (quitar segundos si los hay)
          return data ? data.substring(0, 5) : '';
        }
      },
      {
        data: "HoraFin",
        orderable: false,
        render: function (data) {
          return data ? data.substring(0, 5) : '';
        }
      },
      {
        data: "IdPuesto",
        orderable: false,
        render: function (data) {
          return '<span class="badge badge-puesto">' + getNombrePuestoTurno(data) + '</span>';
        }
      },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          const idEncoded = btoa(row.IdTurno);
          return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-sm" title="Editar"
              onclick="editarTurno('${idEncoded}','${row.Nombre}','${row.HoraInicio}','${row.HoraFin}','${row.IdPuesto}')">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn-danger btn-sm" title="Eliminar"
              onclick="eliminarTurno('${idEncoded}')">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>`;
        }
      }
    ]
  });

  // Drag & drop para reordenar
  tablaTurnosInstance.on('draw.dt', function () { initDragDropTurnos(tablaTurnosInstance); });
  initDragDropTurnos(tablaTurnosInstance);
}

/**
 * Drag & drop HTML5 en la tabla de turnos
 */
function initDragDropTurnos(table) {
  const tbody = document.querySelector('#TableTurnos tbody');
  if (!tbody) return;
  let dragRow = null;

  tbody.querySelectorAll('tr').forEach(function (row) {
    row.draggable = true;

    row.addEventListener('dragstart', function (e) {
      dragRow = row;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(function () { row.style.opacity = '0.4'; }, 0);
    });

    row.addEventListener('dragend', function () {
      row.style.opacity = '';
      tbody.querySelectorAll('tr').forEach(function (r) { r.style.boxShadow = ''; });
      // Guardar nuevo orden
      const ids = [];
      table.rows({ order: 'current' }).data().each(function (r) { ids.push(r.IdTurno); });
      localStorage.setItem('turnos_custom_order', JSON.stringify(ids));
      dragRow = null;
    });

    row.addEventListener('dragover', function (e) {
      e.preventDefault();
      if (!dragRow || row === dragRow) return;
      tbody.querySelectorAll('tr').forEach(function (r) { r.style.boxShadow = ''; });
      row.style.boxShadow = 'inset 0 2px 0 0 #ffc407';
    });

    row.addEventListener('dragleave', function () { row.style.boxShadow = ''; });

    row.addEventListener('drop', function (e) {
      e.preventDefault();
      row.style.boxShadow = '';
      if (!dragRow || row === dragRow) return;
      const rows  = Array.from(tbody.querySelectorAll('tr'));
      const srcIdx = rows.indexOf(dragRow);
      const dstIdx = rows.indexOf(row);
      if (srcIdx < dstIdx) {
        tbody.insertBefore(dragRow, row.nextSibling);
      } else {
        tbody.insertBefore(dragRow, row);
      }
    });
  });
}

/**
 * Mostrar / ocultar formulario de registro
 */
function mostrarFormTurno() {
  const sec = document.getElementById('seccionFormTurno');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ocultarFormTurno() {
  document.getElementById('seccionFormTurno').style.display = 'none';
  limpiarFormTurno();
}

/**
 * Guardar nuevo turno
 */
async function guardarTurno() {
  const nombre     = $('#slctNombreTurno').val();
  const horaInicio = $('#txtHoraInicio').val();
  const horaFin    = $('#txtHoraFin').val();
  const idPuesto   = $('#slctPuesto').val();

  if (!nombre)     { toastr.warning("Seleccione el tipo de turno."); return; }
  if (!horaInicio) { toastr.warning("Ingrese la hora de inicio."); return; }
  if (!horaFin)    { toastr.warning("Ingrese la hora de fin."); return; }
  if (!idPuesto)   { toastr.warning("Seleccione un puesto."); return; }

  // Validar duplicado
  const existe = tablaTurnosInstance
    .rows()
    .data()
    .toArray()
    .some(t => t.Nombre === nombre && t.IdPuesto == idPuesto);
  if (existe) {
    toastr.error("Ya existe un turno con ese nombre y puesto.");
    return;
  }

  const dataSend = { op: "insertTurno", nombre, horaInicio, horaFin, idPuesto };
  const ajaxR = await pAjaxAsync(url_m_Turnos, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    limpiarFormularioTurno();
    // Cerrar el modal de registro
    bootstrap.Modal.getInstance(document.getElementById('modalRegistrarTurno')).hide();
    // Actualizar la tabla de turnos
    getTurnos();
  }
}

/**
 * Abrir modal de edición
 */
function editarTurno(idEncoded, nombre, horaInicio, horaFin, idPuesto) {
  // Poblar campos del modal
  $('#modalIdTurno').val(idEncoded);
  $('#modalNombreTurno').val(nombre);
  $('#modalHoraInicio').val(horaInicio);
  $('#modalHoraFin').val(horaFin);
  $('#modalSlctPuesto').val(idPuesto);

  // Abrir modal con opciones para que no se cierre por fuera ni con ESC
  const modalEl = document.getElementById('modalEditarTurno');
  const modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
  modal.show();
}

/**
 * Guardar edición desde el modal
 */
async function guardarEdicionTurno() {
  const idTurno    = $('#modalIdTurno').val();
  const nombre     = $('#modalNombreTurno').val();
  const horaInicio = $('#modalHoraInicio').val();
  const horaFin    = $('#modalHoraFin').val();
  const idPuesto   = $('#modalSlctPuesto').val();

  if (!nombre)     { toastr.warning("Seleccione el tipo de turno."); return; }
  if (!horaInicio) { toastr.warning("Ingrese la hora de inicio."); return; }
  if (!horaFin)    { toastr.warning("Ingrese la hora de fin."); return; }
  if (!idPuesto)   { toastr.warning("Seleccione un puesto."); return; }

  // Validar duplicado (ignorando el turno que se está editando)
  const idTurnoDec = atob(idTurno);
  const existe = tablaTurnosInstance
    .rows()
    .data()
    .toArray()
    .some(t => t.Nombre === nombre && t.IdPuesto == idPuesto && t.IdTurno != idTurnoDec);
  if (existe) {
    toastr.error("Ya existe un turno con ese nombre y puesto.");
    return;
  }

  const dataSend = { op: "updateTurno", idTurno, nombre, horaInicio, horaFin, idPuesto };
  const ajaxR = await pAjaxAsync(url_m_Turnos, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    bootstrap.Modal.getInstance(document.getElementById('modalEditarTurno')).hide();
    getTurnos();
  }
}

/**
 * Eliminar un turno
 */
async function eliminarTurno(idEncoded) {
  Swal.fire({
    title: '¿Eliminar turno?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataSend = { op: "deleteTurno", idTurno: idEncoded };
      const ajaxR = await pAjaxAsync(url_m_Turnos, dataSend, 1);
      if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
        // Limpiar del orden guardado
        const ordenGuardado = localStorage.getItem('turnos_custom_order');
        if (ordenGuardado) {
          try {
            const id  = atob(idEncoded);
            const ids = JSON.parse(ordenGuardado).filter(function (x) { return x != id; });
            localStorage.setItem('turnos_custom_order', JSON.stringify(ids));
          } catch (e) {}
        }
        getTurnos();
      }
    }
  });
}

/**
 * Limpiar formulario de registro
 */
function limpiarFormTurno() {
  $('#txtIdTurno').val('');
  $('#slctNombreTurno').val('');
  $('#txtHoraInicio').val('');
  $('#txtHoraFin').val('');
  $('#slctPuesto').val('');
}


