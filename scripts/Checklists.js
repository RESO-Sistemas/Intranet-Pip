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

    // Inicialmente deshabilitar turnos y kpis y ocultar mensajes de advertencia
    $('#slctTurnosChecklist').prop('disabled', true);
    $('#slctKpiChecklist').prop('disabled', true);
    $('#msgTurnosChecklist').addClass('d-none');
    $('#msgKpiChecklist').addClass('d-none');

    // Eliminar select2, usar dropdown normal, selección única
    $('#slctTurnosChecklist').prop('multiple', false);

    // Evento: al cambiar puesto
    $('#slctPuestoChecklist').on('change', async function () {
      const idPuesto = $(this).val();
      // --- Turnos ---
      $('#slctTurnosChecklist').prop('disabled', true).html('<option value="" disabled selected>Seleccione un turno</option>');
      $('#msgTurnosChecklist').addClass('d-none');
      if (idPuesto) {
        // AJAX para obtener turnos del puesto
        const turnos = await $.ajax({
          type: "post",
          url: url_m_Checklists,
          data: { op: "getTurnosPorPuesto", idPuesto },
          dataType: "json"
        });
        if (Array.isArray(turnos) && turnos.length > 0) {
          let optsTurno = '<option value="" disabled selected>Seleccione un turno</option>';
          turnos.forEach(function (t) { optsTurno += `<option value="${t.IdTurno}">${t.Nombre}</option>`; });
          $('#slctTurnosChecklist').html(optsTurno).prop('disabled', false);
        } else {
          $('#slctTurnosChecklist').html('<option value="" disabled selected>Sin turnos</option>').prop('disabled', true);
          $('#msgTurnosChecklist').removeClass('d-none');
        }
        $('#slctTurnosChecklist').val('');
      } else {
        $('#slctTurnosChecklist').html('<option value="" disabled selected>Seleccione un turno</option>').prop('disabled', true);
        $('#slctTurnosChecklist').val('');
      }

      // --- KPIs ---
      $('#slctKpiChecklist').prop('disabled', true).empty();
      $('#msgKpiChecklist').addClass('d-none');
      if (idPuesto) {
        let optsKpi = '<option value="" disabled selected>Seleccione un KPI</option>';
        listaKpisChk.forEach(function (k) {
          if (k.Puestos === 'TODOS' || k.Puestos == idPuesto) {
            optsKpi += `<option value="${k.IdKpi}">${k.Nombre}</option>`;
          }
        });
        $('#slctKpiChecklist').html(optsKpi);
        if ($('#slctKpiChecklist option').length > 1) {
          $('#slctKpiChecklist').prop('disabled', false);
        } else {
          $('#slctKpiChecklist').prop('disabled', true);
          $('#msgKpiChecklist').removeClass('d-none');
        }
        $('#slctKpiChecklist').val('');
      } else {
        $('#slctKpiChecklist').html('<option value="" disabled selected>Seleccione un KPI</option>').prop('disabled', true);
        $('#slctKpiChecklist').val('');
      }
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
        orderable: true,
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
        orderable: false,
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
        orderable: true,
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
  let valTurnos           = $('#slctTurnosChecklist').val();
  const tipo              = $('#slctTipoChecklist').val();
  const respuestaEsperada = $('#slctRespuestaChecklist').val();
  const idKpi             = $('#slctKpiChecklist').val();
  const abreIncidencia    = $('#slctIncidenciaChecklist').val();

  if (!nombre)            { toastr.warning("Ingrese el nombre del checklist."); return; }
  if (!idPuesto)          { toastr.warning("Seleccione un puesto."); return; }
  if (!valTurnos || (Array.isArray(valTurnos) && valTurnos.length === 0)) { toastr.warning("Seleccione al menos un turno."); return; }
  if (!tipo)              { toastr.warning("Seleccione el tipo."); return; }
  if (respuestaEsperada === null || respuestaEsperada === '') { toastr.warning("Seleccione la respuesta esperada."); return; }
  if (!idKpi)             { toastr.warning("Seleccione un KPI."); return; }
  if (abreIncidencia === null || abreIncidencia === '') { toastr.warning("Indique si abre incidencia."); return; }

  const turnosStr = Array.isArray(valTurnos) ? valTurnos.join(',') : String(valTurnos);

  const dataSend = {
    op: "insertChecklist",
    nombre,
    idPuesto,
    turnos: turnosStr,
    tipo,
    respuestaEsperada,
    idKpi,
    abreIncidencia
  };

  const ajaxR = await pAjaxAsync(url_m_Checklists, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    limpiarFormChecklist();
    // Cerrar el modal correctamente usando Bootstrap 5
    if (window.bootstrap && bootstrap.Modal) {
      const modalEl = document.getElementById('modalRegistrarChecklist');
      if (modalEl) {
        let modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (!modalInstance) modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }
    } else {
      // Fallback: trigger close via jQuery
      $('#modalRegistrarChecklist').modal('hide');
    }
    getChecklistsOrdenadoReciente();
  }

// Refresca la tabla y ordena por el checklist más reciente arriba
async function getChecklistsOrdenadoReciente() {
  try {
    const respuesta = await $.ajax({
      type: "post", url: url_m_Checklists,
      data: { op: "getChecklists" }, dataType: "json"
    });
    // Ordenar por IdChecklist descendente (más reciente primero)
    if (Array.isArray(respuesta)) {
      respuesta.sort((a, b) => Number(b.IdChecklist) - Number(a.IdChecklist));
    }
    _renderTablaChecklists(respuesta);
  } catch (e) {
    console.error("Error al refrescar checklists:", e);
  }
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

  const modalJq = $(modalEl);

  // Asegurar que poblamos una vez que el modal es visible para evitar bugs visuales de Select2
  $(modalEl).off('shown.bs.modal.chk').on('shown.bs.modal.chk', function () {
    // Puesto
    let optsPuesto = '<option value="" disabled>Seleccione un puesto</option>';
    listaPuestosChk.forEach(function (p) { optsPuesto += `<option value="${p.IdPuesto}">${p.Puesto}</option>`; });
    $('#modalSlctPuesto').html(optsPuesto);
    
    // Asignar el valor ANTES de incializar Select2 evita tener que llamar trigger('change')
    $('#modalSlctPuesto').val(row.IdPuesto);
    
    // Desvincular eventos para cambios manuales
    $('#modalSlctPuesto').off('change.chk');
    $('#modalSlctPuesto').select2({ placeholder: 'Seleccione un puesto', dropdownParent: modalJq, width: '100%' });

    // Carga de Turnos y KPIs
    async function poblarTurnosYKpisAsync(idPuesto, turnoActual, kpiActual) {
      console.log("Iniciando carga asíncrona de Turnos/KPI. Puesto:", idPuesto, "Turno:", turnoActual, "KPI:", kpiActual);
      $('#modalSlctTurnos').prop('disabled', true).empty();
      $('#modalSlctKpi').prop('disabled', true).empty();

      if (!idPuesto) {
        $('#modalSlctTurnos').html('<option value="" disabled selected>Seleccione un turno</option>').prop('disabled', true);
        $('#modalSlctKpi').html('<option value="" disabled selected>Seleccione un KPI</option>').prop('disabled', true);
        return;
      }

      try {
        const turnosPromise = $.ajax({
          type: "post",
          url: url_m_Checklists,
          data: { op: "getTurnosPorPuesto", idPuesto },
          dataType: "json"
        });
        
        const kpisPromise = new Promise(resolve => {
          let optsKpi = '<option value="" disabled selected>Seleccione un KPI</option>';
          listaKpisChk.forEach(function (k) {
            const arrPuestos = k.Puestos ? String(k.Puestos).split(',').map(s => s.trim()) : [];
            if (k.Puestos === 'TODOS' || arrPuestos.includes(String(idPuesto))) {
              optsKpi += `<option value="${k.IdKpi}">${k.Nombre}</option>`;
            }
          });
          $('#modalSlctKpi').html(optsKpi);
          resolve();
        });

        const [turnos] = await Promise.all([turnosPromise, kpisPromise]);
        
        if (Array.isArray(turnos) && turnos.length > 0) {
          let optsTurno = '<option value="" disabled selected>Seleccione un turno</option>';
          turnos.forEach(function (t) { optsTurno += `<option value="${t.IdTurno}">${t.Nombre}</option>`; });
          $('#modalSlctTurnos').html(optsTurno).prop('disabled', false);
        } else {
          $('#modalSlctTurnos').html('<option value="" disabled selected>Sin turnos</option>').prop('disabled', true);
        }
        
        if ($('#modalSlctKpi option').length > 1) {
          $('#modalSlctKpi').prop('disabled', false);
        } else {
          $('#modalSlctKpi').prop('disabled', true);
        }

        // Selección nativa sin select2:
        if (turnoActual) $('#modalSlctTurnos').val(turnoActual);
        if (kpiActual) $('#modalSlctKpi').val(kpiActual);

      } catch (error) {
        console.error("Error al cargar dependencias:", error);
        $('#modalSlctTurnos').html('<option value="" disabled selected>Error de conexión</option>').prop('disabled', true);
        $('#modalSlctKpi').html('<option value="" disabled selected>Error de conexión</option>').prop('disabled', true);
      }
    }

    const turnoActual = row.Turnos ? row.Turnos.split(',').map(function (id) { return id.trim(); })[0] : '';
    poblarTurnosYKpisAsync(row.IdPuesto, turnoActual, row.IdKpi);

    // Evento manual
    $('#modalSlctPuesto').on('change.chk', function () {
      const nuevoPuesto = $(this).val();
      poblarTurnosYKpisAsync(nuevoPuesto, '', '');
    });

    $('#modalSlctTipo').select2({ dropdownParent: modalJq, width: '100%', minimumResultsForSearch: Infinity });
    $('#modalSlctTipo').val(row.Tipo).trigger('change');

    $('#modalSlctRespuesta').select2({ dropdownParent: modalJq, width: '100%', minimumResultsForSearch: Infinity });
    $('#modalSlctRespuesta').val(String(row.RespuestaEsperada)).trigger('change');

    $('#modalSlctIncidencia').select2({ dropdownParent: modalJq, width: '100%', minimumResultsForSearch: Infinity });
    $('#modalSlctIncidencia').val(String(row.AbreIncidencia)).trigger('change');
  });
  new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false }).show();
}


// ─── Guardar edición ──────────────────────────────────────────────────────────
async function guardarEdicionChecklist() {
  const idChecklist       = $('#modalIdChecklist').val();
  const nombre            = $('#modalNombreChecklist').val().trim();
  const idPuesto          = $('#modalSlctPuesto').val();
  let valTurnos           = $('#modalSlctTurnos').val();
  const tipo              = $('#modalSlctTipo').val();
  const respuestaEsperada = $('#modalSlctRespuesta').val();
  const idKpi             = $('#modalSlctKpi').val();
  const abreIncidencia    = $('#modalSlctIncidencia').val();

  if (!nombre)            { toastr.warning("Ingrese el nombre del checklist."); return; }
  if (!idPuesto)          { toastr.warning("Seleccione un puesto."); return; }
  if (!valTurnos || (Array.isArray(valTurnos) && valTurnos.length === 0)) { toastr.warning("Seleccione al menos un turno."); return; }
  if (!tipo)              { toastr.warning("Seleccione el tipo."); return; }
  if (respuestaEsperada === null || respuestaEsperada === '') { toastr.warning("Seleccione la respuesta esperada."); return; }
  if (!idKpi)             { toastr.warning("Seleccione un KPI."); return; }
  if (abreIncidencia === null || abreIncidencia === '') { toastr.warning("Indique si abre incidencia."); return; }

  const turnosStr = Array.isArray(valTurnos) ? valTurnos.join(',') : String(valTurnos);

  const dataSend = {
    op: "updateChecklist",
    idChecklist,
    nombre,
    idPuesto,
    turnos: turnosStr,
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
