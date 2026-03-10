const url_m_Checklists = "Backend/Checklists/App.php";

let listaPuestosChk  = [];
let listaTurnosChk   = [];
let listaKpisChk     = [];
let tablaChecklistsInstance = null;

// ─── Inicio: carga paralela ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const [puestos, turnos, kpis, checklists] = await Promise.all([
      $.ajax({ type: "post", url: url_m_Checklists, data: { op: "getPuestos" },    dataType: "json" }),
      $.ajax({ type: "post", url: url_m_Checklists, data: { op: "getTurnos" },     dataType: "json" }),
      $.ajax({ type: "post", url: url_m_Checklists, data: { op: "getKpis" },       dataType: "json" }),
      $.ajax({ type: "post", url: url_m_Checklists, data: { op: "getChecklists" }, dataType: "json" })
    ]);

    listaPuestosChk = puestos;
    listaTurnosChk  = turnos;
    listaKpisChk    = kpis;

    // Poblar selects del formulario
    let optsPuesto = '<option value="" disabled selected>Seleccione un puesto</option>';
    puestos.forEach(function (p) { optsPuesto += `<option value="${p.IdPuesto}">${p.Puesto}</option>`; });
    $('#slctPuestoChecklist').html(optsPuesto);

    let optsKpi = '<option value="" disabled selected>Seleccione un KPI</option>';
    kpis.forEach(function (k) { optsKpi += `<option value="${k.IdKpi}">${k.Nombre}</option>`; });
    $('#slctKpiChecklist').html(optsKpi);

    let optsTurno = '';
    turnos.forEach(function (t) { optsTurno += `<option value="${t.IdTurno}">${t.Nombre}</option>`; });
    $('#slctTurnosChecklist').html(optsTurno);
    $('#slctTurnosChecklist').select2({
      placeholder: "Seleccione turnos...",
      allowClear: true,
      width: '100%'
    });

    _renderTablaChecklists(checklists);
  } catch (e) {
    console.error("Error al inicializar:", e);
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getNombrePuestoChk(id) {
  const p = listaPuestosChk.find(x => x.IdPuesto == id);
  return p ? p.Puesto : id;
}

function getNombreTurnoChk(id) {
  const t = listaTurnosChk.find(x => x.IdTurno == id);
  return t ? t.Nombre : id;
}

function getNombreKpiChk(id) {
  const k = listaKpisChk.find(x => x.IdKpi == id);
  return k ? k.Nombre : id;
}

// ─── Obtener checklists (refresco post-CRUD) ──────────────────────────────────
async function getChecklists() {
  try {
    const respuesta = await $.ajax({
      type: "post", url: url_m_Checklists,
      data: { op: "getChecklists" }, dataType: "json"
    });
    _renderTablaChecklists(respuesta);
  } catch (e) {
    console.error("Error al obtener checklists:", e);
  }
}

// ─── Render DataTable ─────────────────────────────────────────────────────────
function _renderTablaChecklists(data) {
  tablaChecklistsInstance = $('#TableChecklists').DataTable({
    destroy: true,
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY CHECKLISTS REGISTRADOS",
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
    data: data,
    columns: [
      { data: "Nombre", orderable: false },
      {
        data: "IdPuesto",
        orderable: false,
        render: function (data) {
          return getNombrePuestoChk(data);
        }
      },
      {
        data: "Turnos",
        orderable: true,
        render: function (data) {
          if (!data) return '—';
          const ids = data.split(',').map(function (id) { return id.trim(); });
          return ids.map(function (id) { return getNombreTurnoChk(id); }).join(', ');
        }
      },
      {
        data: "Tipo",
        orderable: true,
        render: function (data) {
          return data === 'Critico'
            ? '<span class="badge-critico">Crítico</span>'
            : '<span class="badge-no-critico">No Crítico</span>';
        }
      },
      {
        data: "RespuestaEsperada",
        orderable: false,
        render: function (data) {
          return data == 1
            ? '<span class="badge-verdadero">Verdadero</span>'
            : '<span class="badge-falso">Falso</span>';
        }
      },
      {
        data: "IdKpi",
        orderable: false,
        render: function (data) {
          return '<small>' + getNombreKpiChk(data) + '</small>';
        }
      },
      {
        data: "AbreIncidencia",
        orderable: false,
        render: function (data) {
          return data == 1
            ? '<span class="badge-incidencia-si">Sí</span>'
            : '<span class="badge-incidencia-no">No</span>';
        }
      },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          const idEncoded = btoa(row.IdChecklist);
          return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-sm" title="Editar"
              onclick="editarChecklist('${idEncoded}')">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn-danger btn-sm" title="Eliminar"
              onclick="eliminarChecklist('${idEncoded}')">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>`;
        }
      }
    ]
  });
}

// ─── Mostrar / ocultar formulario ─────────────────────────────────────────────
function mostrarFormChecklist() {
  const sec = document.getElementById('seccionFormChecklist');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ocultarFormChecklist() {
  document.getElementById('seccionFormChecklist').style.display = 'none';
  limpiarFormChecklist();
}

// ─── Guardar nuevo checklist ──────────────────────────────────────────────────
async function guardarChecklist() {
  const nombre            = $('#txtNombreChecklist').val().trim();
  const idPuesto          = $('#slctPuestoChecklist').val();
  const turnos            = $('#slctTurnosChecklist').val();
  const tipo              = $('#slctTipoChecklist').val();
  const respuestaEsperada = $('#slctRespuestaChecklist').val();
  const idKpi             = $('#slctKpiChecklist').val();
  const abreIncidencia    = $('#slctIncidenciaChecklist').val();

  if (!nombre)            { toastr.warning("Ingrese el nombre del checklist."); return; }
  if (!idPuesto)          { toastr.warning("Seleccione un puesto."); return; }
  if (!turnos || !turnos.length) { toastr.warning("Seleccione al menos un turno."); return; }
  if (!tipo)              { toastr.warning("Seleccione el tipo."); return; }
  if (respuestaEsperada === null || respuestaEsperada === '') { toastr.warning("Seleccione la respuesta esperada."); return; }
  if (!idKpi)             { toastr.warning("Seleccione un KPI."); return; }
  if (abreIncidencia === null || abreIncidencia === '') { toastr.warning("Indique si abre incidencia."); return; }

  const dataSend = {
    op: "insertChecklist",
    nombre,
    idPuesto,
    turnos: turnos.join(','),
    tipo,
    respuestaEsperada,
    idKpi,
    abreIncidencia
  };

  const ajaxR = await pAjaxAsync(url_m_Checklists, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    limpiarFormChecklist();
    ocultarFormChecklist();
    getChecklists();
  }
}

// ─── Editar: abrir modal ──────────────────────────────────────────────────────
function editarChecklist(idEncoded) {
  // Buscar el row en la tabla
  const row = tablaChecklistsInstance.rows().data().toArray().find(function (r) {
    return btoa(r.IdChecklist) === idEncoded;
  });
  if (!row) return;

  const modalEl = document.getElementById('modalEditarChecklist');

  // Destruir Select2 anteriores si existen
  ['#modalSlctPuesto', '#modalSlctTurnos', '#modalSlctKpi', '#modalSlctTipo', '#modalSlctRespuesta', '#modalSlctIncidencia'].forEach(function (sel) {
    if ($(sel).hasClass('select2-hidden-accessible')) $(sel).select2('destroy');
  });

  $('#modalIdChecklist').val(idEncoded);
  $('#modalNombreChecklist').val(row.Nombre);

  $(modalEl).off('shown.bs.modal.chk').on('shown.bs.modal.chk', function () {
    const modalJq = $(modalEl);

    // Puesto
    let optsPuesto = '<option value="" disabled>Seleccione un puesto</option>';
    listaPuestosChk.forEach(function (p) { optsPuesto += `<option value="${p.IdPuesto}">${p.Puesto}</option>`; });
    $('#modalSlctPuesto').html(optsPuesto);
    $('#modalSlctPuesto').select2({ placeholder: 'Seleccione un puesto', dropdownParent: modalJq, width: '100%' });
    $('#modalSlctPuesto').val(row.IdPuesto).trigger('change');

    // Turnos (multi)
    let optsTurno = '';
    listaTurnosChk.forEach(function (t) { optsTurno += `<option value="${t.IdTurno}">${t.Nombre}</option>`; });
    $('#modalSlctTurnos').html(optsTurno);
    $('#modalSlctTurnos').select2({ placeholder: 'Seleccione turnos...', dropdownParent: modalJq, width: '100%', allowClear: true });
    const turnosActuales = row.Turnos ? row.Turnos.split(',').map(function (id) { return id.trim(); }) : [];
    $('#modalSlctTurnos').val(turnosActuales).trigger('change');

    // KPI
    let optsKpi = '<option value="" disabled>Seleccione un KPI</option>';
    listaKpisChk.forEach(function (k) { optsKpi += `<option value="${k.IdKpi}">${k.Nombre}</option>`; });
    $('#modalSlctKpi').html(optsKpi);
    $('#modalSlctKpi').select2({ placeholder: 'Seleccione un KPI', dropdownParent: modalJq, width: '100%' });
    $('#modalSlctKpi').val(row.IdKpi).trigger('change');

    // Tipo
    $('#modalSlctTipo').select2({ dropdownParent: modalJq, width: '100%', minimumResultsForSearch: Infinity });
    $('#modalSlctTipo').val(row.Tipo).trigger('change');

    // Respuesta esperada
    $('#modalSlctRespuesta').select2({ dropdownParent: modalJq, width: '100%', minimumResultsForSearch: Infinity });
    $('#modalSlctRespuesta').val(String(row.RespuestaEsperada)).trigger('change');

    // Abre incidencia
    $('#modalSlctIncidencia').select2({ dropdownParent: modalJq, width: '100%', minimumResultsForSearch: Infinity });
    $('#modalSlctIncidencia').val(String(row.AbreIncidencia)).trigger('change');
  });

  new bootstrap.Modal(modalEl).show();
}

// ─── Guardar edición ──────────────────────────────────────────────────────────
async function guardarEdicionChecklist() {
  const idChecklist       = $('#modalIdChecklist').val();
  const nombre            = $('#modalNombreChecklist').val().trim();
  const idPuesto          = $('#modalSlctPuesto').val();
  const turnos            = $('#modalSlctTurnos').val();
  const tipo              = $('#modalSlctTipo').val();
  const respuestaEsperada = $('#modalSlctRespuesta').val();
  const idKpi             = $('#modalSlctKpi').val();
  const abreIncidencia    = $('#modalSlctIncidencia').val();

  if (!nombre)            { toastr.warning("Ingrese el nombre del checklist."); return; }
  if (!idPuesto)          { toastr.warning("Seleccione un puesto."); return; }
  if (!turnos || !turnos.length) { toastr.warning("Seleccione al menos un turno."); return; }
  if (!tipo)              { toastr.warning("Seleccione el tipo."); return; }
  if (respuestaEsperada === null || respuestaEsperada === '') { toastr.warning("Seleccione la respuesta esperada."); return; }
  if (!idKpi)             { toastr.warning("Seleccione un KPI."); return; }
  if (abreIncidencia === null || abreIncidencia === '') { toastr.warning("Indique si abre incidencia."); return; }

  const dataSend = {
    op: "updateChecklist",
    idChecklist,
    nombre,
    idPuesto,
    turnos: turnos.join(','),
    tipo,
    respuestaEsperada,
    idKpi,
    abreIncidencia
  };

  const ajaxR = await pAjaxAsync(url_m_Checklists, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    bootstrap.Modal.getInstance(document.getElementById('modalEditarChecklist')).hide();
    getChecklists();
  }
}

// ─── Eliminar ─────────────────────────────────────────────────────────────────
async function eliminarChecklist(idEncoded) {
  Swal.fire({
    title: '¿Eliminar checklist?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataSend = { op: "deleteChecklist", idChecklist: idEncoded };
      const ajaxR = await pAjaxAsync(url_m_Checklists, dataSend, 1);
      if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) getChecklists();
    }
  });
}

// ─── Limpiar formulario ───────────────────────────────────────────────────────
function limpiarFormChecklist() {
  $('#txtNombreChecklist').val('');
  $('#slctPuestoChecklist').val('');
  $('#slctTurnosChecklist').val(null).trigger('change');
  $('#slctTipoChecklist').val('');
  $('#slctRespuestaChecklist').val('');
  $('#slctKpiChecklist').val('');
  $('#slctIncidenciaChecklist').val('');
}
