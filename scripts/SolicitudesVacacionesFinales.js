const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const SV = urlParams.get("SV");
let gridSolicitudesRevision = null;
let gridHistoricoNomina = null;

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
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

function getMisSolicitudesFinales() {
  const tableSolicitudes = document.getElementById("TableSolicitudes");
  if (!tableSolicitudes) {
    console.error("No se encontró el contenedor #TableSolicitudes");
    return;
  }

  let datos = { op: "getMisSolicitudesFinales" };
  if (gridSolicitudesRevision && typeof gridSolicitudesRevision.destroy === "function") {
    gridSolicitudesRevision.destroy();
    gridSolicitudesRevision = null;
  }
  
  $.ajax({
      type: "POST",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
      success: function (response) {
        const normalizedResponse = Array.isArray(response) ? response : [];
        let mappedData = normalizedResponse.map(item => {
          let btnAcciones = `
            <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-success btn-accion btn-aceptar-sol" title="Aceptar Solicitud">
                    <span class="material-symbols-outlined">check</span>
                </button>
                <button class="btn btn-danger btn-accion btn-rechazar-sol" title="Rechazar Solicitud">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>`;

          let btnVerSolicitud = `
            <div class="d-flex justify-content-center">
                <a class="btn btn-primary btn-accion" target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}" title="Ver Solicitud">
                    <span class="material-symbols-outlined">visibility</span>
                </a>
            </div>`;
          return {
             ...item,
             BtnVer: btnVerSolicitud,
             BtnAcciones: btnAcciones
          };
        });

        gridSolicitudesRevision = new ej.grids.Grid({
            dataSource: mappedData,
            width: "100%",
            allowResizing: true,
            toolbar: ["Search"],
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
                <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
                    <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">beach_access</span>
                </div>
                <h5 class="text-dark mb-2" style="font-weight: 600;">Sin solicitudes en revisión</h5>
                <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay solicitudes de vacaciones pendientes por revisar.</p>
              </div>`,
            columns: [
              { field: "Nombre", headerText: "EMPLEADO", width: 200 },
              { field: "Sucursal", headerText: "DEPARTAMENTO", width: 150 },
              { field: "FechaSolicitud", headerText: "FECHA SOLICITUD", width: 130 },
              { field: "FechaInicio", headerText: "FECHA INICIO", width: 130 },
              { field: "FechaFin", headerText: "FECHA FIN", width: 130 },
              { field: "TotalDias", headerText: "TOTAL DIAS", width: 120 },
              { field: "BtnVer", headerText: "VER SOLICITUD", width: 150, textAlign: "Center", disableHtmlEncode: false },
              { field: "BtnAcciones", headerText: "ACCIONES", width: 150, textAlign: "Center", disableHtmlEncode: false }
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

function realizarAccionSolicitud(solicitud, accion) {

  let mensaje = "";

  if (accion == 1) {

    mensaje = "Desea aceptar la solicitud?";

  } else {

    mensaje = "Desea denegar la solicitud?";

  }

  Swal.fire({

    title: `${mensaje}`,

    text: "",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    cancelButtonText: "Cancelar",

    confirmButtonText: "Confirmar",

  }).then((result) => {

    if (result.isConfirmed) {

      datos = {

        op: "realizarAccionSolicitudFinal",

        idSolicitudesVacaciones: solicitud,

        Status: accion,

      };

      $.ajax({

        type: "post",

        url: "Backend/Empleados/App.php",

        data: datos,

        success: function (response) {

          if (response == 1) {

            // toastr.success("Acción realizada con éxito.");

            const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Acción realizada con éxito.</span>

          </div>`;

            showBootstrapAlertSuc(messageContent, "top-right", 5000);

            getMisSolicitudesFinales();

            getHistoricoSolicitudesNomina();

          } else {

            // toastr.info(response);

            const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">S${response}</span>

        </div>`;

            showBootstrapAlert(messageContent, "top-right", 5000);

          }

        }
      });
    }
  });
}

async function getHistoricoSolicitudesNomina() {
  const tableHistorico = document.getElementById("tableHistorico");
  if (!tableHistorico) {
    console.error("No se encontró el contenedor #tableHistorico");
    return;
  }

  let FechaIni = $("#FechaIni").val();
  let FechaFin = $("#FechaFin").val();
  let datos = {
    op: "getHistoricoSolicitudesNomina",
    FechaIni: FechaIni,
    FechaFin: FechaFin,
  };
  
  if (gridHistoricoNomina && typeof gridHistoricoNomina.destroy === "function") {
    gridHistoricoNomina.destroy();
    gridHistoricoNomina = null;
  }
  
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
    let mappedData = respuesta.map((registros) => {
      const btnClass = registros.NumStatus == 3 ? 'btn-success' : (registros.NumStatus == 2 ? 'btn-danger' : 'btn-warning');
      const icon = registros.NumStatus == 3 ? 'sentiment_satisfied' : (registros.NumStatus == 2 ? 'sentiment_dissatisfied' : 'sentiment_neutral');
      let Btn = `
        <div class="d-flex justify-content-center">
            <a class="btn ${btnClass} btn-accion" target="_blank" href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}" title="Ver Solicitud">
                <span class="material-symbols-outlined">${icon}</span>
            </a>
        </div>`;

      const regBtnClass = registros.NumStatus == 1 ? 'btn-danger' : 'btn-warning';
      let BtnRegresa = `
        <div class="d-flex justify-content-center">
            <button class="btn ${regBtnClass} btn-accion btn-regresar-nom" title="Regresar a Pendiente">
                <span class="material-symbols-outlined">settings_backup_restore</span>
            </button>
        </div>`;
      return {
          ...registros,
          BtnRegresarHTML: BtnRegresa,
          BtnVerHTML: Btn
      };
    });

    gridHistoricoNomina = new ej.grids.Grid({
        dataSource: mappedData,
        width: "100%",
        allowResizing: true,
        toolbar: ["Search"],
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
            <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
                <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">history</span>
            </div>
            <h5 class="text-dark mb-2" style="font-weight: 600;">Sin histórico</h5>
            <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay historial de solicitudes en este rango de fechas.</p>
          </div>`,
        columns: [
          { field: "Nombre", headerText: "EMPLEADO", width: 200 },
          { field: "Status", headerText: "ESTADO DE LA SOLICITUD", width: 180 },
          { field: "FechaSolicitud", headerText: "FECHA SOLICITUD", width: 150 },
          { field: "BtnRegresarHTML", headerText: "REGRESAR A PENDIENTE", width: 200, textAlign: "Center", disableHtmlEncode: false },
          { field: "BtnVerHTML", headerText: "VER SOLICITUD", width: 150, textAlign: "Center", disableHtmlEncode: false }
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


async function regresarEstadoSolicitudNomina(val) {

  const result = await Swal.fire({

    title: "Confirmación de acción",

    html: `

      <div class="row">

        <div class="col-12 text-center">

          ¿Desea regresar el estado de la solicitud a 

          <strong>"Solicitud pendiente de revisar"</strong>?

        </div>

      </div>

    `,

    icon: "question",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    confirmButtonText: "Aceptar",

    cancelButtonText: "Cancelar",

  });



  if (result.isConfirmed) {

    let datos = {

      op: "regresarEstadoSolicitudNomina",

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

      console.log(e);

    } finally {

      if (respuesta == "1") {

        // Swal.fire({

        //   icon: "success",

        //   title: "Éxito",

        //   text: 'Estado de solicitud regresado a "Solicitud pendiente de revisar".',

        //   timer: 2000,

        //   showConfirmButton: false,

        // });

        const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Estado de solicitud regresado a "Solicitud pendiente de revisar".</span>

          </div>`;

        showBootstrapAlertSuc(messageContent, "top-right", 5000);

        getMisSolicitudesFinales();

        getHistoricoSolicitudesNomina();

      } else {

        // Swal.fire({

        //   icon: "error",

        //   title: "ERROR",

        //   text: "Hubo un problema al regresar el estado de la solicitud.",

        // });

        const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Hubo un problema al regresar el estado de la solicitud.</span>

            </div>`;

        showBootstrapAlertWar(messageContent, "top-right", 5000);

      }

    }

  }
}
