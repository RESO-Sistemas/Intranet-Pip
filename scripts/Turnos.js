const url_m_Turnos = "Backend/Turnos/App.php";

let listaPuestosTurnos = [];
let tablaTurnosInstance = null;
let turnosData = [];

function formato12hDesde24h(value) {
  if (!value) return "";
  const clean = String(value).trim();
  const match = clean.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) return clean;

  let hora = parseInt(match[1], 10);
  const minutos = match[2];
  const periodo = hora >= 12 ? "PM" : "AM";
  hora = hora % 12;
  if (hora === 0) hora = 12;

  return `${String(hora).padStart(2, "0")}:${minutos} ${periodo}`;
}

function formato24hDesde12h(value) {
  if (!value) return "";
  const clean = String(value).trim().toUpperCase();
  const match = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!match) return "";

  let hora = parseInt(match[1], 10);
  const minutos = match[2];
  const periodo = match[3];

  if (hora < 1 || hora > 12) return "";

  if (periodo === "AM") {
    if (hora === 12) hora = 0;
  } else if (hora !== 12) {
    hora += 12;
  }

  return `${String(hora).padStart(2, "0")}:${minutos}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const [puestos, turnos] = await Promise.all([
      $.ajax({ type: "post", url: url_m_Turnos, data: { op: "getPuestos" }, dataType: "json" }),
      $.ajax({ type: "post", url: url_m_Turnos, data: { op: "getTurnos" }, dataType: "json" })
    ]);

    listaPuestosTurnos = Array.isArray(puestos) ? puestos : [];
    _cargarOpcionesPuestos(listaPuestosTurnos);
    _initSelect2Turnos();
    _renderTablaTurnos(turnos || []);
  } catch (e) {
    console.error("Error al inicializar:", e);
  }
});

function _initSelect2Turnos() {
  _asegurarOpcionVacia("#slctNombreTurno");
  _asegurarOpcionVacia("#modalNombreTurno");

  const config = [
    { selector: "#slctNombreTurno", parent: "#modalRegistrarTurno" },
    { selector: "#slctPuesto", parent: "#modalRegistrarTurno" },
    { selector: "#modalNombreTurno", parent: "#modalEditarTurno" },
    { selector: "#modalSlctPuesto", parent: "#modalEditarTurno" }
  ];

  config.forEach(function (item) {
    const $el = $(item.selector);
    if (!$el.length) return;

    if ($el.hasClass("select2-hidden-accessible")) {
      $el.select2("destroy");
    }

    $el.select2({
      width: "100%",
      dropdownParent: $(item.parent),
      placeholder: "Seleccione una opcion",
    });

    $el.val(null).trigger("change");
  });
}

function _asegurarOpcionVacia(selector) {
  const $select = $(selector);
  if (!$select.length) return;

  const first = $select.find("option").first();
  if (!first.length || first.val() !== "") {
    $select.prepend('<option value=""></option>');
  }
}

function _cargarOpcionesPuestos(puestos) {
  let opts = '<option value=""></option><option value="" disabled>Seleccione un puesto</option>';
  puestos.forEach(function (p) {
    opts += `<option value="${p.IdPuesto}">${p.Puesto}</option>`;
  });

  $("#slctPuesto").html(opts);
  $("#modalSlctPuesto").html(opts);
}

function getNombrePuestoTurno(id) {
  const puesto = listaPuestosTurnos.find(function (x) { return x.IdPuesto == id; });
  return puesto ? puesto.Puesto : id;
}

function seleccionarPuestoEnModal(idPuesto) {
  const $select = $("#modalSlctPuesto");
  if (!$select.length) return;

  const valorBuscado = String(idPuesto || "").trim();
  if (!valorBuscado) {
    $select.val("").trigger("change");
    return;
  }

  const opcion = $select.find("option").filter(function () {
    return String($(this).val() || "").trim() === valorBuscado;
  }).first();

  if (opcion.length) {
    $select.val(opcion.val()).trigger("change");
    return;
  }

  $select.val("").trigger("change");
}

async function getTurnos() {
  try {
    const respuesta = await $.ajax({
      type: "post",
      url: url_m_Turnos,
      data: { op: "getTurnos" },
      dataType: "json"
    });
    _renderTablaTurnos(respuesta || []);
  } catch (e) {
    console.error("Error al obtener turnos:", e);
  }
}

function _renderTablaTurnos(respuesta) {
  turnosData = Array.isArray(respuesta)
    ? respuesta.slice().sort(function (a, b) { return b.IdTurno - a.IdTurno; })
    : [];

  if (tablaTurnosInstance) {
    tablaTurnosInstance.destroy();
    tablaTurnosInstance = null;
  }

  tablaTurnosInstance = new ej.grids.Grid({
    dataSource: turnosData,
    toolbar: ["Search"],
    allowPaging: true,
    allowSelection: false,
    pageSettings: { pageSize: 10 },
    emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
      <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">schedule</span>
      </div>
      <h5 class="text-dark mb-2" style="font-weight: 600;">No hay turnos registrados</h5>
      <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">Aun no se ha encontrado ningun turno en la base de datos. Los turnos que registres apareceran en esta lista.</p>
    </div>`,
    columns: [
      { field: "Nombre", headerText: "TURNO", width: 170 },
      {
        field: "HoraInicio",
        headerText: "HORA INICIO",
        width: 140,
        valueAccessor: function (field, data) {
          return formato12hDesde24h(data.HoraInicio || "");
        }
      },
      {
        field: "HoraFin",
        headerText: "HORA FIN",
        width: 140,
        valueAccessor: function (field, data) {
          return formato12hDesde24h(data.HoraFin || "");
        }
      },
      {
        field: "IdPuesto",
        headerText: "PUESTO",
        width: 200,
        template: function (data) {
          return `<span class="badge badge-puesto">${getNombrePuestoTurno(data.IdPuesto)}</span>`;
        }
      },
      {
        headerText: "ACCIONES",
        width: 140,
        textAlign: "Center",
        template: `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
          <button class="btn btn-primary btn-accion btn-editar-turno" title="Editar">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn btn-danger btn-accion btn-eliminar-turno" title="Eliminar">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>`
      }
    ],
    dataBound: function () {
      const gridElement = this.element;
      const toolbar = gridElement.querySelector(".e-toolbar");
      const header = gridElement.querySelector(".e-gridheader");
      const pager = gridElement.querySelector(".e-gridpager");
      const gridContent = gridElement.querySelector(".e-gridcontent");

      if (this.currentViewData.length === 0) {
        if (toolbar) toolbar.style.display = "none";
        if (header) header.style.display = "none";
        if (pager) pager.style.display = "none";
        gridElement.style.border = "none";
        if (gridContent) gridContent.style.border = "none";
      } else {
        if (toolbar) toolbar.style.display = "";
        if (header) header.style.display = "";
        if (pager) pager.style.display = "";
        gridElement.style.border = "";
        if (gridContent) gridContent.style.border = "";
      }
    },
    recordClick: function (args) {
      const rowData = args.rowData || {};
      const idEncoded = rowData.IdTurno ? btoa(String(rowData.IdTurno)) : "";
      const clickedElement = args.target;

      if (!clickedElement || typeof clickedElement.closest !== "function") {
        return;
      }

      if (clickedElement.closest(".btn-editar-turno")) {
        editarTurno(
          idEncoded,
          rowData.Nombre || "",
          rowData.HoraInicio || "",
          rowData.HoraFin || "",
          rowData.IdPuesto || ""
        );
      }

      if (clickedElement.closest(".btn-eliminar-turno")) {
        eliminarTurno(idEncoded);
      }
    },
    created: function () {
      const searchInput = document.getElementById(this.element.id + "_searchbar");
      const grid = this;
      if (searchInput) {
        searchInput.addEventListener("keyup", function (event) {
          grid.search(event.target.value);
        });
      }
    }
  });

  tablaTurnosInstance.appendTo("#TableTurnos");
}

async function guardarTurno() {
  const nombre = $("#slctNombreTurno").val();
  const horaInicioInput = $("#txtHoraInicio").val();
  const horaFinInput = $("#txtHoraFin").val();
  const idPuesto = $("#slctPuesto").val();
  const horaInicio = formato24hDesde12h(horaInicioInput);
  const horaFin = formato24hDesde12h(horaFinInput);

  if (!nombre) { toastr.warning("Seleccione el tipo de turno."); return; }
  if (!horaInicioInput) { toastr.warning("Ingrese la hora de inicio."); return; }
  if (!horaInicio) { toastr.warning("Formato invalido en hora de inicio. Use hh:mm AM/PM."); return; }
  if (!horaFinInput) { toastr.warning("Ingrese la hora de fin."); return; }
  if (!horaFin) { toastr.warning("Formato invalido en hora de fin. Use hh:mm AM/PM."); return; }
  if (!idPuesto) { toastr.warning("Seleccione un puesto."); return; }

  const existe = turnosData.some(function (t) {
    return t.Nombre === nombre && t.IdPuesto == idPuesto;
  });

  if (existe) {
    toastr.error("Ya existe un turno con ese nombre y puesto.");
    return;
  }

  const dataSend = { op: "insertTurno", nombre, horaInicio, horaFin, idPuesto };
  const ajaxR = await pAjaxAsync(url_m_Turnos, dataSend, 1);

  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    limpiarFormularioTurno();
    bootstrap.Modal.getInstance(document.getElementById("modalRegistrarTurno")).hide();
    getTurnos();
  }
}

function editarTurno(idEncoded, nombre, horaInicio, horaFin, idPuesto) {
  $("#modalIdTurno").val(idEncoded);
  $("#modalNombreTurno").val(nombre).trigger("change");
  $("#modalHoraInicio").val(formato12hDesde24h(horaInicio));
  $("#modalHoraFin").val(formato12hDesde24h(horaFin));
  seleccionarPuestoEnModal(idPuesto);

  const modalEl = document.getElementById("modalEditarTurno");
  const modal = new bootstrap.Modal(modalEl, { backdrop: "static", keyboard: false });
  modal.show();
}

async function guardarEdicionTurno() {
  const idTurno = $("#modalIdTurno").val();
  const nombre = $("#modalNombreTurno").val();
  const horaInicioInput = $("#modalHoraInicio").val();
  const horaFinInput = $("#modalHoraFin").val();
  const idPuesto = $("#modalSlctPuesto").val();
  const horaInicio = formato24hDesde12h(horaInicioInput);
  const horaFin = formato24hDesde12h(horaFinInput);

  if (!nombre) { toastr.warning("Seleccione el tipo de turno."); return; }
  if (!horaInicioInput) { toastr.warning("Ingrese la hora de inicio."); return; }
  if (!horaInicio) { toastr.warning("Formato invalido en hora de inicio. Use hh:mm AM/PM."); return; }
  if (!horaFinInput) { toastr.warning("Ingrese la hora de fin."); return; }
  if (!horaFin) { toastr.warning("Formato invalido en hora de fin. Use hh:mm AM/PM."); return; }
  if (!idPuesto) { toastr.warning("Seleccione un puesto."); return; }

  const idTurnoDec = atob(idTurno);
  const existe = turnosData.some(function (t) {
    return t.Nombre === nombre && t.IdPuesto == idPuesto && t.IdTurno != idTurnoDec;
  });

  if (existe) {
    toastr.error("Ya existe un turno con ese nombre y puesto.");
    return;
  }

  const dataSend = { op: "updateTurno", idTurno, nombre, horaInicio, horaFin, idPuesto };
  const ajaxR = await pAjaxAsync(url_m_Turnos, dataSend, 1);

  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    bootstrap.Modal.getInstance(document.getElementById("modalEditarTurno")).hide();
    getTurnos();
  }
}

async function eliminarTurno(idEncoded) {
  Swal.fire({
    title: "¿Eliminar turno?",
    text: "Esta accion no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Si, eliminar",
    cancelButtonText: "Cancelar"
  }).then(async function (result) {
    if (!result.isConfirmed) return;

    const dataSend = { op: "deleteTurno", idTurno: idEncoded };
    const ajaxR = await pAjaxAsync(url_m_Turnos, dataSend, 1);
    if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
      getTurnos();
    }
  });
}

function limpiarFormTurno() {
  $("#txtIdTurno").val("");
  $("#slctNombreTurno").val("").trigger("change");
  $("#txtHoraInicio").val("");
  $("#txtHoraFin").val("");
  $("#slctPuesto").val("").trigger("change");
}
