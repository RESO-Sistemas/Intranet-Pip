import re

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/SolicitudesVacacionesFinales.js', 'r') as f:
    original_code = f.read()

new_code = """const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const SV = urlParams.get("SV");

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

getMisSolicitudesFinales();
getHistoricoSolicitudesNomina();

let gridSolicitudesRevision = null;

function getMisSolicitudesFinales() {
  let datos = { op: "getMisSolicitudesFinales" };
  if (gridSolicitudesRevision) {
    gridSolicitudesRevision.destroy();
  }
  
  $.ajax({
      type: "POST",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
      success: function (response) {
        let mappedData = response.map(item => {
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
                searchInput.hasListener = true;
                const grid = this;
                searchInput.addEventListener("keyup", function (event) {
                  grid.search(event.target.value);
                });
              }
            }
        });
        gridSolicitudesRevision.appendTo("#TableSolicitudes");
      }
  });
}
"""

# Extract the rest of the file
match_realizar = re.search(r'(function realizarAccionSolicitud.*?\}\s*\})', original_code, re.DOTALL)
match_regresar = re.search(r'(async function regresarEstadoSolicitudNomina.*?\}\s*\})', original_code, re.DOTALL)

historico_code = """
let gridHistoricoNomina = null;

async function getHistoricoSolicitudesNomina() {
  let FechaIni = $("#FechaIni").val();
  let FechaFin = $("#FechaFin").val();
  let datos = {
    op: "getHistoricoSolicitudesNomina",
    FechaIni: FechaIni,
    FechaFin: FechaFin,
  };
  
  if (gridHistoricoNomina) {
    gridHistoricoNomina.destroy();
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
            searchInput.hasListener = true;
            const grid = this;
            searchInput.addEventListener("keyup", function (event) {
              grid.search(event.target.value);
            });
          }
        }
    });
    gridHistoricoNomina.appendTo("#tableHistorico");
  }
}
"""

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/SolicitudesVacacionesFinales.js', 'w') as f:
    f.write(new_code)
    if match_realizar: f.write('\n' + match_realizar.group(1) + '\n')
    f.write('\n' + historico_code + '\n')
    if match_regresar: f.write('\n' + match_regresar.group(1) + '\n')

print("SolicitudesVacacionesFinales.js updated!")
