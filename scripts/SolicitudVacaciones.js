
// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

// Inicialización de Grids Syncfusion
let gridMisSolicitudes, gridSolicitudesPend, gridSolicitudesNomina, gridSolicitudesCanceladas;

// ─── Helpers de UI ────────────────────────────────────────────────────────────

/**
 * Genera el HTML del template de tabla vacía con ícono de Material Symbols
 */
function getEmptyTemplate(title, desc, icon) {
  return `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
      <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">${icon}</span>
      </div>
      <h5 class="text-dark mb-2" style="font-weight: 600;">${title}</h5>
      <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">${desc}</p>
    </div>`;
}

/**
 * Handler de dataBound para ocultar/mostrar toolbar, header y paginador
 * según si el grid tiene datos o no.
 */
function dataBoundHandler() {
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
}

/**
 * Vincula el input de búsqueda del toolbar de Syncfusion con el método search del grid
 */
function bindSearch(gridInstance, inputId) {
  const searchInput = document.getElementById(inputId);
  if (searchInput) {
    searchInput.addEventListener("keyup", function (event) {
      gridInstance.search(event.target.value);
    });
  }
}

/**
 * Genera un badge de estado visual (sistema ev-sbadge) según el Status numérico
 * @param {string|number} status - Valor de Status (0,1,2,3)
 * @returns {string} HTML del badge
 */
function getStatusBadge(status) {
  const config = {
    "0": { cls: "amber",   icon: "schedule",         label: "Pendiente"           },
    "1": { cls: "blue",    icon: "manage_accounts",  label: "En revisión RH"      },
    "2": { cls: "red",     icon: "cancel",           label: "Denegada"            },
    "3": { cls: "emerald", icon: "check_circle",     label: "Aceptada por RH"     },
  };
  const c = config[String(status)] || { cls: "gray", icon: "help", label: "Desconocido" };
  return `<span class="ev-sbadge ${c.cls}">
    <span class="material-symbols-outlined">${c.icon}</span> ${c.label}
  </span>`;
}

/**
 * Actualiza las stat-cards del dashboard con los contadores calculados desde los datos del grid.
 * - Total: todas las solicitudes
 * - Pendientes: Status 0
 * - En revisión RH: Status 1
 * - Aceptadas: Status 3
 * - Denegadas: Status 2
 * @param {Array} data - Array de solicitudes ya mapeadas
 */
function updateStatCards(data) {
  const total       = data.length;
  const pendientes  = data.filter(d => d.Status == "0").length;
  const enRevision  = data.filter(d => d.Status == "1").length;
  const aceptadas   = data.filter(d => d.Status == "3").length;
  const denegadas   = data.filter(d => d.Status == "2").length;

  const elTotal      = document.getElementById("statTotal");
  const elPendientes = document.getElementById("statPendientes");
  const elAceptadas  = document.getElementById("statAceptadas");
  const elDenegadas  = document.getElementById("statDenegadas");

  if (elTotal)      elTotal.textContent      = total;
  // Pendientes + En revisión RH comparten el contador visual de "pendientes de resolución"
  if (elPendientes) elPendientes.textContent  = pendientes + enRevision;
  if (elAceptadas)  elAceptadas.textContent   = aceptadas;
  if (elDenegadas)  elDenegadas.textContent   = denegadas;
}

// ─── Inicialización de Grids ──────────────────────────────────────────────────

$(document).ready(function() {

  // 1. Mis Solicitudes (empleado)
  gridMisSolicitudes = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("No hay solicitudes", "No tienes solicitudes de vacaciones registradas.", "beach_access"),
      columns: [
        { field: "ComentariosSolicitud", headerText: "Motivo de Solicitud", width: 220 },
        { field: "StatusBadge",          headerText: "Estado",              width: 200, disableHtmlEncode: false },
        { field: "FechaSolicitud",        headerText: "Fecha Solicitud",    width: 140 },
        { field: "FechaInicio",           headerText: "Fecha Inicio",       width: 130 },
        { field: "FechaFin",              headerText: "Fecha Fin",          width: 130 },
        { field: "TotalDias",             headerText: "Días",               width: 80,  textAlign: "Center" },
        { field: "BtnHTML",              headerText: "Ver",                 width: 120, textAlign: "Center", disableHtmlEncode: false }
      ],
      dataBound: dataBoundHandler,
      created: function() { bindSearch(this, this.element.id + "_searchbar"); }
  });
  gridMisSolicitudes.appendTo("#ContenidoMisSolicitudes");

  // 2. Solicitudes Pendientes (jefe inmediato)
  gridSolicitudesPend = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("Sin solicitudes pendientes", "No hay solicitudes pendientes de autorizar.", "check_circle"),
      columns: [
        { field: "Nombre",                 headerText: "Empleado",          width: 200 },
        { field: "FechaSolicitud",          headerText: "Fecha Solicitud",   width: 130 },
        { field: "FechaInicio",             headerText: "Fecha Inicio",      width: 130 },
        { field: "FechaFin",               headerText: "Fecha Fin",         width: 130 },
        { field: "ComentariosSolicitud",   headerText: "Motivo",            width: 200 },
        { field: "BtnVer",                 headerText: "Ver",               width: 110, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnAceptar",             headerText: "Aceptar",           width: 110, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnDenegar",             headerText: "Denegar",           width: 110, textAlign: "Center", disableHtmlEncode: false }
      ],
      dataBound: dataBoundHandler,
      recordClick: function(args) {
          const clickedElement = args.target;
          if (!clickedElement || typeof clickedElement.closest !== "function") return;
          const rowData = args.rowData;
          if (clickedElement.closest(".btn-aceptar-solicitud")) {
              updateStatusSolicitud(1, rowData.idSolicitudesVacaciones);
          }
          if (clickedElement.closest(".btn-denegar-solicitud")) {
              updateStatusSolicitud(2, rowData.idSolicitudesVacaciones);
          }
      },
      created: function() { bindSearch(this, this.element.id + "_searchbar"); }
  });
  gridSolicitudesPend.appendTo("#ContenidoSolicitudesPend");

  // 3. Solicitudes en proceso con Nómina (jefe inmediato — tab "Aceptadas por mí")
  gridSolicitudesNomina = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("Sin solicitudes", "No hay solicitudes para mostrar en esta sección.", "folder_open"),
      columns: [
        { field: "Nombre",               headerText: "Empleado",                         width: 200 },
        { field: "ComentariosSolicitud", headerText: "Motivo de solicitud",              width: 200 },
        { field: "FechaSolicitud",        headerText: "Fecha Solicitud",                 width: 130 },
        { field: "StatusBadge",          headerText: "Estatus en nómina",               width: 200, disableHtmlEncode: false },
        { field: "BtnRegresar",          headerText: "Regresar a pendiente",            width: 160, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnVer",               headerText: "Ver solicitud",                   width: 120, textAlign: "Center", disableHtmlEncode: false }
      ],
      dataBound: dataBoundHandler,
      recordClick: function(args) {
          const clickedElement = args.target;
          if (!clickedElement || typeof clickedElement.closest !== "function") return;
          const rowData = args.rowData;
          if (clickedElement.closest(".btn-regresar-estado")) {
              regresarEstadoSolicitudJefe(rowData.idSolicitudesVacaciones);
          }
      },
      created: function() { bindSearch(this, this.element.id + "_searchbar"); }
  });
  gridSolicitudesNomina.appendTo("#ContenidoSolicitudesNomina");

  // 4. Solicitudes Canceladas por jefe
  gridSolicitudesCanceladas = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("Sin cancelaciones", "No has cancelado ninguna solicitud.", "cancel"),
      columns: [
        { field: "Nombre",               headerText: "Empleado",                width: 200 },
        { field: "ComentariosSolicitud", headerText: "Motivo de Solicitud",     width: 200 },
        { field: "FechaSolicitud",        headerText: "Fecha Solicitud",        width: 130 },
        { field: "BtnRegresar",          headerText: "Revertir cancelación",   width: 160, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnVer",               headerText: "Ver Solicitud",           width: 120, textAlign: "Center", disableHtmlEncode: false }
      ],
      dataBound: dataBoundHandler,
      recordClick: function(args) {
          const clickedElement = args.target;
          if (!clickedElement || typeof clickedElement.closest !== "function") return;
          const rowData = args.rowData;
          if (clickedElement.closest(".btn-regresar-estado")) {
              regresarEstadoSolicitudJefe(rowData.idSolicitudesVacaciones);
          }
      },
      created: function() { bindSearch(this, this.element.id + "_searchbar"); }
  });
  gridSolicitudesCanceladas.appendTo("#tableSolicitudesCanceladas");

  // Carga inicial de datos
  getMisSolicitudes();
  getMisSolicitudesPorRevisar();
  getMisSolicitudesVacacionesEstadoNomina();
  getSolicitudesCanceladasJefe();
});

// ─── Funciones de carga de datos ─────────────────────────────────────────────

/**
 * Carga las solicitudes del empleado activo y actualiza las stat-cards
 */
function getMisSolicitudes() {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesVacaciones",
    success: function (response) {
      let data = JSON.parse(response.trim());
      let mappedData = data.map(item => {
        // Solo mostrar botón "Ver" cuando la solicitud tiene un formato disponible
        let btnHtml = "";
        if (item.Status == "0" || item.Status == "1" || item.Status == "3") {
          btnHtml = `<a class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1"
            target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}"
            title="Ver formato de solicitud">
            <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
          </a>`;
        } else if (item.Status == "2") {
          // Denegada — no hay formato que ver, se muestra badge informativo
          btnHtml = `<span class="ev-sbadge red" style="font-size:11px;">
            <span class="material-symbols-outlined">block</span> Sin formato
          </span>`;
        }
        return {
          ...item,
          StatusBadge: getStatusBadge(item.Status),
          BtnHTML: btnHtml
        };
      });

      // Actualizar stat-cards con los datos del empleado
      updateStatCards(data);

      gridMisSolicitudes.dataSource = mappedData;
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

/**
 * Carga las solicitudes pendientes de autorización del jefe inmediato (Status=0)
 */
function getMisSolicitudesPorRevisar() {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesPorRevisar",
    success: function (response) {
      let data = JSON.parse(response.trim());
      let mappedData = data.map(item => {
        return {
          ...item,
          BtnVer: `<a class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
            target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}"
            title="Ver formato de solicitud">
            <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
          </a>`,
          // Botones separados: Aceptar y Denegar en columnas distintas
          BtnAceptar: `<button class="btn btn-success btn-sm d-inline-flex align-items-center gap-1 btn-aceptar-solicitud"
            title="Aceptar solicitud" style="cursor:pointer;">
            <span class="material-symbols-outlined" style="font-size:16px;">check</span> Aceptar
          </button>`,
          BtnDenegar: `<button class="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1 btn-denegar-solicitud"
            title="Denegar solicitud" style="cursor:pointer;">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span> Denegar
          </button>`
        };
      });
      gridSolicitudesPend.dataSource = mappedData;
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

/**
 * Carga las solicitudes que el jefe ya autorizó y están en proceso de Nómina
 */
async function getMisSolicitudesVacacionesEstadoNomina() {
  let datos = { op: "getMisSolicitudesVacacionesEstadoNomina" };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    let mappedData = respuesta.map(item => {
      // Botón regresar: solo disponible si Nómina aún no procesó (Status=1)
      let btnRegresarStatus = "";
      if (item.Status == "1") {
        btnRegresarStatus = `<button class="btn btn-outline-warning btn-sm d-inline-flex align-items-center gap-1 btn-regresar-estado"
          title="Regresar solicitud a pendiente de revisión" style="cursor:pointer;">
          <span class="material-symbols-outlined" style="font-size:16px;">settings_backup_restore</span> Revertir
        </button>`;
      } else {
        // Nómina ya tomó una decisión final — no se puede revertir desde aquí
        btnRegresarStatus = `<span class="ev-sbadge gray" style="font-size:11px;">
          <span class="material-symbols-outlined">lock</span> Bloqueado
        </span>`;
      }

      let btnVerSolicitud = "";
      if (item.Status == "1" || item.Status == "3") {
        btnVerSolicitud = `<a class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1"
          target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}"
          title="Ver formato de solicitud">
          <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
        </a>`;
      } else {
        btnVerSolicitud = `<a class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
          target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}"
          title="Ver formato de solicitud">
          <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
        </a>`;
      }

      return {
        ...item,
        StatusBadge: getStatusBadge(item.Status),
        BtnRegresar: btnRegresarStatus,
        BtnVer: btnVerSolicitud
      };
    });
    gridSolicitudesNomina.dataSource = mappedData;
  }
}

/**
 * Carga solicitudes que el jefe denegó y que Nómina aún no ha procesado (Status=2 sin autorizador final)
 */
async function getSolicitudesCanceladasJefe() {
  let datos = { op: "getSolicitudesCanceladasJefe" };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    let mappedData = respuesta.map(item => {
      return {
        ...item,
        BtnRegresar: `<button class="btn btn-outline-warning btn-sm d-inline-flex align-items-center gap-1 btn-regresar-estado"
          title="Revertir cancelación — regresa la solicitud a pendiente de revisión" style="cursor:pointer;">
          <span class="material-symbols-outlined" style="font-size:16px;">settings_backup_restore</span> Revertir
        </button>`,
        BtnVer: `<a class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
          target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}"
          title="Ver formato de solicitud">
          <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
        </a>`
      };
    });
    gridSolicitudesCanceladas.dataSource = mappedData;
  }
}

// ─── Acciones del jefe inmediato ──────────────────────────────────────────────

/**
 * Primer paso de confirmación antes de aceptar/denegar una solicitud
 * @param {number} Val - 1 = aceptar, 2 = denegar
 * @param {number} Solicitud - ID de la solicitud
 */
async function updateStatusSolicitud(Val, Solicitud) {
  const accion = Val == "1" ? "aceptar" : "denegar";
  const iconSwal = Val == "1" ? "question" : "warning";

  const firstConfirm = await Swal.fire({
    title: `¿Desea ${accion} la solicitud?`,
    text: "A continuación verá los datos del solicitante para confirmar.",
    icon: iconSwal,
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Ver detalles",
  });

  if (firstConfirm.isConfirmed) {
    getDetalleSolicitud(Val, Solicitud);
  }
}

/**
 * Obtiene detalles completos de una solicitud y muestra modal de confirmación final
 * @param {number} estado - 1 = autorizar, 2 = cancelar
 * @param {number} solicitud - ID de la solicitud
 */
async function getDetalleSolicitud(estado, solicitud) {
  let datos = {
    op: "getDetalleSolicitud",
    idSolicitudesVacaciones: solicitud,
  };

  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.error(e);
    return;
  }

  const estadoText = estado == "1" ? "autorizar" : "cancelar";
  const mensaje2   = estado == "1" ? "aceptada"  : "denegada";
  const badgeColor = estado == "1" ? "#ECFDF5"   : "#FEF2F2";
  const textColor  = estado == "1" ? "#059669"   : "#DC2626";
  const iconColor  = estado == "1" ? "check_circle" : "cancel";

  // Calcular días restantes después de la solicitud
  const diasRestantes = parseInt(respuesta[0]["DiasVacacionesRest"]) || 0;
  const diasSolicitud = parseInt(respuesta[0]["TotalDias"]) || 0;
  const diasDespues   = diasRestantes - diasSolicitud;
  const alertaDias    = diasDespues < 0
    ? `<div class="d-flex align-items-center gap-2 p-2 rounded-2 mt-2" style="background:#FEF2F2;">
        <span class="material-symbols-outlined" style="color:#DC2626;font-size:18px;">warning</span>
        <span style="color:#DC2626;font-size:12px;font-weight:600;">El empleado no tiene suficientes días disponibles.</span>
       </div>`
    : "";

  let contHTML = `
    <div style="text-align:left; font-size:14px;">
      <div class="d-flex align-items-center gap-2 mb-3 p-2 rounded-2" style="background:${badgeColor};">
        <span class="material-symbols-outlined" style="color:${textColor};font-size:20px;">${iconColor}</span>
        <span style="color:${textColor};font-weight:600;">Esta solicitud será ${mensaje2}</span>
      </div>
      <h6 class="fw-bold mb-2" style="border-bottom:1px solid #dee2e6;padding-bottom:6px;">Datos del solicitante</h6>
      <div class="row g-1 mb-3">
        <div class="col-6"><span class="text-muted">No. Empleado:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["NoEmpleado"]}</div>
        <div class="col-6"><span class="text-muted">Nombre:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["NombreSolicitante"]}</div>
        <div class="col-6"><span class="text-muted">Puesto:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["PuestoSolicitante"]}</div>
        <div class="col-6"><span class="text-muted">Sucursal / Depto.:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["Sucursal"]}</div>
      </div>
      <h6 class="fw-bold mb-2" style="border-bottom:1px solid #dee2e6;padding-bottom:6px;">Datos de la Solicitud</h6>
      <div class="row g-1 mb-2">
        <div class="col-6"><span class="text-muted">Fecha de solicitud:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["FechaRegistroSoli"]}</div>
        <div class="col-6"><span class="text-muted">Fecha inicio:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["FechaInicio"]}</div>
        <div class="col-6"><span class="text-muted">Fecha fin:</span></div>
        <div class="col-6 fw-semibold">${respuesta[0]["FechaFin"]}</div>
        <div class="col-6"><span class="text-muted">Días solicitados:</span></div>
        <div class="col-6"><span class="badge rounded-pill" style="background:#EFF6FF;color:#2563EB;font-size:13px;">${diasSolicitud} días</span></div>
      </div>
      <div class="p-2 rounded-2" style="background:#F8FAFC;border:1px solid #E2E8F0;">
        <div class="row g-1">
          <div class="col-7"><span class="text-muted" style="font-size:12px;">Días disponibles actuales:</span></div>
          <div class="col-5 text-end"><span class="fw-bold">${diasRestantes}</span></div>
          <div class="col-7"><span class="text-muted" style="font-size:12px;">Días solicitados:</span></div>
          <div class="col-5 text-end"><span class="fw-bold text-primary">- ${diasSolicitud}</span></div>
          <div class="col-12"><hr style="margin:4px 0;"></div>
          <div class="col-7"><span class="fw-bold" style="font-size:12px;">Días restantes después:</span></div>
          <div class="col-5 text-end"><span class="fw-bold" style="color:${diasDespues < 0 ? '#DC2626' : '#059669'}">${diasDespues}</span></div>
        </div>
      </div>
      ${alertaDias}
    </div>
  `;

  const result = await Swal.fire({
    title: `¿Confirmar ${estadoText}?`,
    html: contHTML,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    customClass: { popup: "swal-wide" },
  });

  if (result.isConfirmed) {
    $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: {
        op: "updateStatusSolicitud",
        Status: estado,
        idSolicitudesVacaciones: solicitud,
      },
      success: function (response) {
        if (response == "1") {
          Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: `La solicitud fue ${mensaje2} correctamente.`,
            confirmButtonColor: "#ffc407",
          });
          // Refrescar todos los grids y contadores
          getMisSolicitudes();
          getMisSolicitudesPorRevisar();
          getMisSolicitudesVacacionesEstadoNomina();
          getSolicitudesCanceladasJefe();
        } else {
          Swal.fire("Atención", response, "info");
        }
      }
    });
  }
}

/**
 * Regresa una solicitud al estado "pendiente de revisión" (Status=0)
 * Solo disponible cuando Nómina aún no ha tomado decisión final
 * @param {number} val - ID de la solicitud
 */
async function regresarEstadoSolicitudJefe(val) {
  const resultado = await Swal.fire({
    title: "¿Revertir decisión?",
    html: `
      <p class="text-muted mb-0">
        La solicitud regresará al estado <strong>"Pendiente de revisión"</strong>
        y el empleado podrá ver que está en espera de autorización nuevamente.
      </p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, revertir",
    cancelButtonText: "Cancelar",
  });

  if (resultado.isConfirmed) {
    let datos = {
      op: "regresarEstadoSolicitudJefe",
      idSolicitudesVacaciones: val,
    };

    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
      });
    } catch (e) {
      console.error(e);
    }

    if (respuesta == "1") {
      Swal.fire({
        icon: "success",
        title: "Revertido",
        text: 'La solicitud regresó a "Pendiente de revisión".',
        showConfirmButton: true,
        confirmButtonColor: "#ffc407",
      });
      await getMisSolicitudesPorRevisar();
      await getMisSolicitudesVacacionesEstadoNomina();
      await getSolicitudesCanceladasJefe();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        timer: 2500,
        text: "No se pudo cambiar el estado. Intenta de nuevo.",
      });
    }
  }
}
