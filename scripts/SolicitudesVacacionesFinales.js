const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const SV = urlParams.get("SV");

let gridSolicitudesRevision = null;
let gridHistoricoNomina = null;

// ─── Helpers de UI ────────────────────────────────────────────────────────────

/**
 * Genera el HTML del template de tabla vacía con ícono de Material Symbols
 */
function getEmptyTemplateNomina(title, desc, icon) {
  return `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5"
    style="min-height:320px;background-color:#fafbfc;border-radius:12px;border:1px dashed #dee2e6;">
      <div class="mb-3 d-flex align-items-center justify-content-center"
        style="width:80px;height:80px;background-color:#f1f3f5;border-radius:50%;">
          <span class="material-symbols-outlined" style="font-size:40px;color:#adb5bd;">${icon}</span>
      </div>
      <h5 class="text-dark mb-2" style="font-weight:600;">${title}</h5>
      <p class="text-muted mb-0" style="max-width:350px;font-size:14px;">${desc}</p>
    </div>`;
}

/**
 * Handler de dataBound para ocultar/mostrar toolbar, header y paginador
 * según si el grid tiene datos o no.
 */
function dataBoundHandlerNomina() {
  const gridElement = this.element;
  const toolbar     = gridElement.querySelector(".e-toolbar");
  const header      = gridElement.querySelector(".e-gridheader");
  const pager       = gridElement.querySelector(".e-gridpager");
  const gridContent = gridElement.querySelector(".e-gridcontent");
  if (this.currentViewData.length === 0) {
    if (toolbar)      toolbar.style.display      = "none";
    if (header)       header.style.display       = "none";
    if (pager)        pager.style.display        = "none";
    gridElement.style.border = "none";
    if (gridContent)  gridContent.style.border   = "none";
  } else {
    if (toolbar)      toolbar.style.display      = "";
    if (header)       header.style.display       = "";
    if (pager)        pager.style.display        = "";
    gridElement.style.border = "";
    if (gridContent)  gridContent.style.border   = "";
  }
}

/**
 * Genera un badge de estado visual (sistema ev-sbadge) según el Status numérico
 * @param {string|number} status - Valor de Status (1=en revisión, 2=rechazada, 3=aceptada)
 * @returns {string} HTML del badge
 */
function getStatusBadgeNomina(status) {
  const config = {
    "1": { cls: "blue",    icon: "manage_accounts",  label: "En revisión"   },
    "2": { cls: "red",     icon: "cancel",           label: "Rechazada"     },
    "3": { cls: "emerald", icon: "check_circle",     label: "Aceptada"      },
  };
  const c = config[String(status)] || { cls: "gray", icon: "help", label: "Desconocido" };
  return `<span class="ev-sbadge ${c.cls}">
    <span class="material-symbols-outlined">${c.icon}</span> ${c.label}
  </span>`;
}

/**
 * Actualiza las stat-cards del dashboard de Nómina.
 * - "Por Autorizar" se toma del conteo actual del grid de revisión.
 * - "Aceptadas" y "Rechazadas" se toman del histórico cargado.
 * @param {number} porAutorizar - Total de solicitudes en revisión
 * @param {Array}  historicoData - Array del histórico ya mapeado
 */
function updateStatCardsNomina(porAutorizar, historicoData) {
  const aceptadas  = historicoData.filter(d => d.NumStatus == 3).length;
  const rechazadas = historicoData.filter(d => d.NumStatus == 2).length;

  const elPorAutorizar = document.getElementById("statNominaPorAutorizar");
  const elAceptadas    = document.getElementById("statNominaAceptadas");
  const elRechazadas   = document.getElementById("statNominaRechazadas");

  if (elPorAutorizar) elPorAutorizar.textContent = porAutorizar;
  if (elAceptadas)    elAceptadas.textContent    = aceptadas;
  if (elRechazadas)   elRechazadas.textContent   = rechazadas;
}

// ─── Inicialización ───────────────────────────────────────────────────────────

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) { return true; }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

function initSolicitudesVacacionesFinales() {
  getMisSolicitudesFinales();
  getHistoricoSolicitudesNomina();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSolicitudesVacacionesFinales);
} else {
  initSolicitudesVacacionesFinales();
}

// ─── Funciones de carga de datos ─────────────────────────────────────────────

/**
 * Carga solicitudes aprobadas por jefe (Status=1) que están pendientes de autorización por Nómina.
 * Actualiza el contador "Por Autorizar" en las stat-cards.
 */
function getMisSolicitudesFinales() {
  const tableSolicitudes = document.getElementById("TableSolicitudes");
  if (!tableSolicitudes) {
    console.error("No se encontró el contenedor #TableSolicitudes");
    return;
  }

  if (gridSolicitudesRevision && typeof gridSolicitudesRevision.destroy === "function") {
    gridSolicitudesRevision.destroy();
    gridSolicitudesRevision = null;
  }

  $.ajax({
      type: "POST",
      url: "Backend/Empleados/App.php",
      data: { op: "getMisSolicitudesFinales" },
      dataType: "json",
      success: function (response) {
        const normalizedResponse = Array.isArray(response) ? response : [];

        // Actualizar contador "Por Autorizar" en stat-cards
        const elPorAutorizar = document.getElementById("statNominaPorAutorizar");
        if (elPorAutorizar) elPorAutorizar.textContent = normalizedResponse.length;

        let mappedData = normalizedResponse.map(item => {
          let btnVerSolicitud = `
            <div class="d-flex justify-content-center">
                <a class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1"
                  target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}"
                  title="Ver formato de solicitud">
                    <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
                </a>
            </div>`;

          // Botones de acción separados en columnas distintas
          let btnAceptar = `
            <div class="d-flex justify-content-center">
                <button class="btn btn-success btn-sm d-inline-flex align-items-center gap-1 btn-aceptar-sol"
                  title="Aceptar solicitud — descuenta días de vacaciones del empleado">
                    <span class="material-symbols-outlined" style="font-size:16px;">check</span> Aceptar
                </button>
            </div>`;

          let btnRechazar = `
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1 btn-rechazar-sol"
                  title="Rechazar solicitud">
                    <span class="material-symbols-outlined" style="font-size:16px;">close</span> Rechazar
                </button>
            </div>`;

          return {
             ...item,
             BtnVer:     btnVerSolicitud,
             BtnAceptar: btnAceptar,
             BtnRechazar: btnRechazar
          };
        });

        gridSolicitudesRevision = new ej.grids.Grid({
            dataSource: mappedData,
            width: "100%",
            allowResizing: true,
            toolbar: ["Search"],
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            emptyRecordTemplate: getEmptyTemplateNomina(
              "Sin solicitudes en revisión",
              "No hay solicitudes de vacaciones pendientes por revisar.",
              "beach_access"
            ),
            columns: [
              { field: "Nombre",        headerText: "EMPLEADO",         width: 200 },
              { field: "Sucursal",      headerText: "DEPARTAMENTO",     width: 150 },
              { field: "FechaSolicitud", headerText: "FECHA SOLICITUD", width: 130 },
              { field: "FechaInicio",   headerText: "FECHA INICIO",     width: 130 },
              { field: "FechaFin",      headerText: "FECHA FIN",        width: 130 },
              { field: "TotalDias",     headerText: "DÍAS",             width: 90  },
              { field: "BtnVer",        headerText: "VER",              width: 110, textAlign: "Center", disableHtmlEncode: false },
              { field: "BtnAceptar",    headerText: "ACEPTAR",          width: 130, textAlign: "Center", disableHtmlEncode: false },
              { field: "BtnRechazar",   headerText: "RECHAZAR",         width: 130, textAlign: "Center", disableHtmlEncode: false }
            ],
            dataBound: dataBoundHandlerNomina,
            recordClick: function(args) {
                const clickedElement = args.target;
                if (!clickedElement || typeof clickedElement.closest !== "function") return;
                const rowData = args.rowData;
                if (clickedElement.closest(".btn-aceptar-sol")) {
                    realizarAccionSolicitud(rowData.idSolicitudesVacaciones, 1);
                }
                if (clickedElement.closest(".btn-rechazar-sol")) {
                    realizarAccionSolicitud(rowData.idSolicitudesVacaciones, 0);
                }
            },
            created: function () {
              const searchInput = document.getElementById(this.element.id + "_searchbar");
              if (searchInput && !searchInput.hasListener) {
                searchInput.placeholder = "Buscar en solicitudes en revisión...";
                searchInput.setAttribute("aria-label", "Buscar en solicitudes en revisión");
                searchInput.hasListener = true;
                const grid = this;
                searchInput.addEventListener("keyup", function (event) {
                  grid.search(event.target.value);
                });
              }
            }
        });
        gridSolicitudesRevision.appendTo(tableSolicitudes);
      },
      error: function (xhr) {
        console.error("Error al cargar solicitudes en revisión:", xhr?.responseText || xhr);
      }
  });
}

/**
 * Acepta o rechaza definitivamente una solicitud de vacaciones.
 * Al aceptar, se ejecuta un stored procedure que descuenta los días del empleado.
 * @param {number} solicitud - ID de la solicitud
 * @param {number} accion    - 1 = aceptar (Status→3), 0 = rechazar (Status→2)
 */
function realizarAccionSolicitud(solicitud, accion) {
  const esAceptar    = accion == 1;
  const tituloSwal   = esAceptar ? "¿Aceptar solicitud?" : "¿Rechazar solicitud?";
  const textoSwal    = esAceptar
    ? "Se aprobarán las vacaciones y se descontarán los días correspondientes del empleado."
    : "La solicitud será rechazada y el empleado recibirá una notificación.";
  const iconSwal     = esAceptar ? "question" : "warning";

  Swal.fire({
    title: tituloSwal,
    text: textoSwal,
    icon: iconSwal,
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: esAceptar ? "Sí, aceptar" : "Sí, rechazar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: {
          op: "realizarAccionSolicitudFinal",
          idSolicitudesVacaciones: solicitud,
          Status: accion,
        },
        success: function (response) {
          if (response == 1) {
            const messageContent = `
              <div class="alert-content">
                <span class="alert-title">Completado!</span>
                <span class="alert-text">Acción realizada con éxito.</span>
              </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            getMisSolicitudesFinales();
            getHistoricoSolicitudesNomina();
          } else {
            const messageContent = `
              <div class="alert-content">
                <span class="alert-title">Información!</span>
                <span class="alert-text">${response}</span>
              </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
          }
        }
      });
    }
  });
}

/**
 * Carga el histórico de solicitudes filtrado por rango de fechas.
 * Actualiza los contadores "Aceptadas" y "Rechazadas" en las stat-cards.
 */
async function getHistoricoSolicitudesNomina() {
  const tableHistorico = document.getElementById("tableHistorico");
  if (!tableHistorico) {
    console.error("No se encontró el contenedor #tableHistorico");
    return;
  }

  const FechaIni = $("#FechaIni").val();
  const FechaFin = $("#FechaFin").val();

  if (gridHistoricoNomina && typeof gridHistoricoNomina.destroy === "function") {
    gridHistoricoNomina.destroy();
    gridHistoricoNomina = null;
  }

  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: { op: "getHistoricoSolicitudesNomina", FechaIni, FechaFin },
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    const normalizedResponse = Array.isArray(respuesta) ? respuesta : [];

    // Actualizar contadores de aceptadas/rechazadas en stat-cards desde el histórico
    const elPorAutorizar = document.getElementById("statNominaPorAutorizar");
    const currentPorAutorizar = elPorAutorizar ? (parseInt(elPorAutorizar.textContent) || 0) : 0;
    updateStatCardsNomina(currentPorAutorizar, normalizedResponse);

    let mappedData = normalizedResponse.map(registros => {
      // Badge de estado separado del botón de acción
      const statusBadge = getStatusBadgeNomina(registros.NumStatus);

      // Botón "Ver" — siempre disponible
      let BtnVer = `
        <div class="d-flex justify-content-center">
            <a class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
              target="_blank" href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}"
              title="Ver formato de solicitud">
                <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Ver
            </a>
        </div>`;

      // Botón "Revertir" — solo disponible si la solicitud ya fue procesada por Nómina
      let BtnRegresa = "";
      if (registros.NumStatus == 1) {
        // Aún pendiente — no hay nada que revertir desde el histórico
        BtnRegresa = `<div class="d-flex justify-content-center">
          <span class="ev-sbadge gray" style="font-size:11px;">
            <span class="material-symbols-outlined">hourglass_empty</span> Pendiente
          </span>
        </div>`;
      } else {
        BtnRegresa = `
          <div class="d-flex justify-content-center">
              <button class="btn btn-outline-warning btn-sm d-inline-flex align-items-center gap-1 btn-regresar-nom"
                title="Revertir — regresa la solicitud a pendiente de autorización">
                  <span class="material-symbols-outlined" style="font-size:16px;">settings_backup_restore</span> Revertir
              </button>
          </div>`;
      }

      return {
          ...registros,
          StatusBadge:   statusBadge,
          BtnRegresarHTML: BtnRegresa,
          BtnVerHTML:    BtnVer
      };
    });

    gridHistoricoNomina = new ej.grids.Grid({
        dataSource: mappedData,
        width: "100%",
        allowResizing: true,
        toolbar: ["Search"],
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: getEmptyTemplateNomina(
          "Sin histórico",
          "No hay historial de solicitudes en este rango de fechas.",
          "history"
        ),
        columns: [
          { field: "Nombre",          headerText: "EMPLEADO",              width: 190 },
          { field: "StatusBadge",     headerText: "ESTADO",                width: 190, disableHtmlEncode: false },
          { field: "FechaSolicitud",   headerText: "FECHA SOLICITUD",       width: 140 },
          { field: "FechaInicio",     headerText: "INICIO VACACIONES",     width: 140 },
          { field: "FechaFin",        headerText: "FIN VACACIONES",        width: 140 },
          { field: "TotalDias",       headerText: "DÍAS",                  width: 80,  textAlign: "Center" },
          { field: "BtnRegresarHTML", headerText: "REVERTIR",              width: 150, textAlign: "Center", disableHtmlEncode: false },
          { field: "BtnVerHTML",      headerText: "VER",                   width: 110, textAlign: "Center", disableHtmlEncode: false }
        ],
        dataBound: dataBoundHandlerNomina,
        recordClick: function(args) {
            const clickedElement = args.target;
            if (!clickedElement || typeof clickedElement.closest !== "function") return;
            const rowData = args.rowData;
            if (clickedElement.closest(".btn-regresar-nom")) {
                regresarEstadoSolicitudNomina(rowData.idSolicitudesVacaciones);
            }
        },
        created: function () {
          const searchInput = document.getElementById(this.element.id + "_searchbar");
          if (searchInput && !searchInput.hasListener) {
            searchInput.placeholder = "Buscar en historial de nómina...";
            searchInput.setAttribute("aria-label", "Buscar en historial de nómina");
            searchInput.hasListener = true;
            const grid = this;
            searchInput.addEventListener("keyup", function (event) {
              grid.search(event.target.value);
            });
          }
        }
    });
    gridHistoricoNomina.appendTo(tableHistorico);
  }
}

/**
 * Revierte la decisión de Nómina sobre una solicitud, regresándola a Status=1
 * para que pueda ser revisada nuevamente.
 * @param {number} val - ID de la solicitud
 */
async function regresarEstadoSolicitudNomina(val) {
  const result = await Swal.fire({
    title: "¿Revertir decisión?",
    html: `
      <p class="text-muted mb-0">
        La solicitud regresará al estado <strong>"Pendiente de autorización"</strong>
        y podrá ser revisada nuevamente por Nómina.
      </p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, revertir",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: {
          op: "regresarEstadoSolicitudNomina",
          idSolicitudesVacaciones: val,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      if (respuesta == "1") {
        const messageContent = `
          <div class="alert-content">
            <span class="alert-title">Completado!</span>
            <span class="alert-text">Solicitud regresada a "Pendiente de autorización".</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        getMisSolicitudesFinales();
        getHistoricoSolicitudesNomina();
      } else {
        const messageContent = `
          <div class="alert-content">
            <span class="alert-title">Alerta!</span>
            <span class="alert-text">Hubo un problema al revertir el estado de la solicitud.</span>
          </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    }
  }
}
