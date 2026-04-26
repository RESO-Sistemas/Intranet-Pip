import re

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/SolicitudVacaciones.js', 'r') as f:
    original_code = f.read()

# We will construct a completely new JS file using the original logic but with Syncfusion.
# We'll save the unchanged functions like updateStatusSolicitud, getDetalleSolicitud, regresarEstadoSolicitudJefe.

new_code = """
// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

// Inicialización de Grids Syncfusion
let gridMisSolicitudes, gridSolicitudesPend, gridSolicitudesNomina, gridSolicitudesCanceladas;

function getEmptyTemplate(title, desc, icon) {
  return `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
      <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">${icon}</span>
      </div>
      <h5 class="text-dark mb-2" style="font-weight: 600;">${title}</h5>
      <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">${desc}</p>
    </div>`;
}

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

function bindSearch(gridInstance, inputId) {
  const searchInput = document.getElementById(inputId);
  if (searchInput) {
    searchInput.addEventListener("keyup", function (event) {
      gridInstance.search(event.target.value);
    });
  }
}

$(document).ready(function() {
  // 1. Mis Solicitudes
  gridMisSolicitudes = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("No hay solicitudes", "No tienes solicitudes de vacaciones registradas.", "beach_access"),
      columns: [
        { field: "ComentariosSolicitud", headerText: "Motivo de Solicitud", width: 250 },
        { field: "StatusStr", headerText: "Estado de la Solicitud", width: 150 },
        { field: "FechaSolicitud", headerText: "Fecha de Solicitud", width: 150 },
        { field: "BtnHTML", headerText: "Ver Solicitud", width: 120, textAlign: "Center", disableHtmlEncode: false }
      ],
      dataBound: dataBoundHandler,
      created: function() { bindSearch(this, this.element.id + "_searchbar"); }
  });
  gridMisSolicitudes.appendTo("#ContenidoMisSolicitudes");

  // 2. Solicitudes Pendientes (Jefe)
  gridSolicitudesPend = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("Sin solicitudes pendientes", "No hay solicitudes pendientes de autorizar.", "check_circle"),
      columns: [
        { field: "Nombre", headerText: "Empleado", width: 200 },
        { field: "FechaSolicitud", headerText: "Fecha Solicitud", width: 130 },
        { field: "FechaInicio", headerText: "Fecha Inicio", width: 130 },
        { field: "FechaFin", headerText: "Fecha Fin", width: 130 },
        { field: "ComentariosSolicitud", headerText: "Motivo Vacaciones", width: 200 },
        { field: "BtnVer", headerText: "Ver Solicitud", width: 120, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnOp", headerText: "Op", width: 120, textAlign: "Center", disableHtmlEncode: false }
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

  // 3. Solicitudes Nómina
  gridSolicitudesNomina = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("Sin solicitudes", "No hay solicitudes para mostrar en esta sección.", "folder_open"),
      columns: [
        { field: "Nombre", headerText: "Empleado", width: 200 },
        { field: "ComentariosSolicitud", headerText: "Motivo de solicitud", width: 200 },
        { field: "FechaSolicitud", headerText: "Fecha Solicitud", width: 130 },
        { field: "StatusStr", headerText: "Estatus en nómina", width: 180 },
        { field: "BtnRegresar", headerText: "Regresar a pendiente de revisión", width: 150, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnVer", headerText: "Ver solicitud", width: 120, textAlign: "Center", disableHtmlEncode: false }
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

  // 4. Solicitudes Canceladas
  gridSolicitudesCanceladas = new ej.grids.Grid({
      dataSource: [],
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: getEmptyTemplate("Sin cancelaciones", "No has cancelado ninguna solicitud.", "cancel"),
      columns: [
        { field: "Nombre", headerText: "Empleado", width: 200 },
        { field: "ComentariosSolicitud", headerText: "Motivo de Solicitud", width: 200 },
        { field: "FechaSolicitud", headerText: "Fecha Solicitud", width: 130 },
        { field: "BtnRegresar", headerText: "Regresar a pendiente", width: 150, textAlign: "Center", disableHtmlEncode: false },
        { field: "BtnVer", headerText: "Ver Solicitud", width: 120, textAlign: "Center", disableHtmlEncode: false }
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

  // Load data
  getMisSolicitudes();
  getMisSolicitudesPorRevisar();
  getMisSolicitudesVacacionesEstadoNomina();
  getSolicitudesCanceladasJefe();
});

function getMisSolicitudes() {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesVacaciones",
    success: function (response) {
      let data = JSON.parse(response.trim());
      let mappedData = data.map(item => {
        let statusStr = "";
        let btnHtml = "";
        if (item.Status == "0") {
          statusStr = "Pendiente";
          btnHtml = `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`;
        } else if (item.Status == "1") {
          statusStr = "Aceptada";
          btnHtml = `<a class='btn btn-success' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`;
        } else if (item.Status == "2") {
          statusStr = "Denegada";
          btnHtml = "<a class='btn btn-danger'>DENEGADA</a>";
        } else if (item.Status == "3") {
          statusStr = "Solicitud Aceptada por RH";
          btnHtml = `<a class='btn btn-success' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`;
        }
        return {
          ...item,
          StatusStr: statusStr,
          BtnHTML: btnHtml
        };
      });
      gridMisSolicitudes.dataSource = mappedData;
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

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
          BtnVer: `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`,
          BtnOp: `<div class="row pb-1">
              <div class="col d-flex justify-content-center">  
                <div style="width: 100%;"> 
                   <a class="btn btn-success p-2 d-flex justify-content-center align-items-center btn-aceptar-solicitud" style="width: 100%; cursor: pointer;">Aceptar</a>
                </div>
              </div>
          </div>
          <div class="row">
            <div class="col d-flex justify-content-center">  
              <div style="width: 100%;"> 
                <a class="btn btn-danger p-2 d-grid place-content-center btn-denegar-solicitud" style="width:100%; cursor: pointer;">Denegar</a>
              </div>
            </div>
          </div>`
        };
      });
      gridSolicitudesPend.dataSource = mappedData;
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

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
      let textEstatus = "";
      let btnVerSolicitud = "";
      let btnRegresarStatus = "";
      if (item.Status == "3") {
        textEstatus = "Solicitud aceptada por Nómina.";
        btnVerSolicitud = `<a class='btn btn-success' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`;
        btnRegresarStatus = `<button class='btn btn-danger'><span class="material-icons">lock_outline</span></button>`;
      } else if (item.Status == "2") {
        textEstatus = "Solicitud denegada por Nómina.";
        btnVerSolicitud = `<a class='btn btn-danger'>Ver Solicitud</a>`;
        btnRegresarStatus = `<button class='btn btn-danger'><span class="material-icons">lock_outline</span></button>`;
      } else if (item.Status == "1") {
        textEstatus = "Solicitud pendiente de revisar.";
        btnVerSolicitud = `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`;
        btnRegresarStatus = `<button class='btn btn-warning btn-regresar-estado'><span class="material-icons">lock_outline</span></button>`;
      }
      return {
        ...item,
        StatusStr: textEstatus,
        BtnRegresar: btnRegresarStatus,
        BtnVer: btnVerSolicitud
      };
    });
    gridSolicitudesNomina.dataSource = mappedData;
  }
}

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
        BtnRegresar: `<button class='btn btn-warning btn-regresar-estado'><span class="material-symbols-outlined">edit</span></button>`,
        BtnVer: `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${item.idSolicitudesVacaciones}">Ver Solicitud</a>`
      };
    });
    gridSolicitudesCanceladas.dataSource = mappedData;
  }
}
"""

# Extract the rest of the file which contains the standard functions
# Specifically, updateStatusSolicitud, getDetalleSolicitud, regresarEstadoSolicitudJefe.
# These don't depend on DataTable and can be appended as-is.

rest_code = ""

match = re.search(r'(async function updateStatusSolicitud[\s\S]*)', original_code)
if match:
    full_rest = match.group(1)
    # We need to filter out the definitions of ContenidoSolicitudesNomina and tableSolicitudesCanceladas and their getters since we rewrote them
    lines = full_rest.split('\n')
    skip = False
    for line in lines:
        if line.startswith('let ContenidoSolicitudesNomina = $("#ContenidoSolicitudesNomina").dataTable'):
            skip = True
        elif line.startswith('async function getMisSolicitudesVacacionesEstadoNomina'):
            skip = True
        elif line.startswith('let tableSolicitudesCanceladas = $("#tableSolicitudesCanceladas").dataTable'):
            skip = True
        elif line.startswith('async function getSolicitudesCanceladasJefe'):
            skip = True
            
        if line.startswith('// async function regresarEstadoSolicitudJefe'):
            skip = False # Let it keep commented code if it was there
            
        # We know exactly the functions to keep: updateStatusSolicitud, getDetalleSolicitud, regresarEstadoSolicitudJefe
        # Actually it's easier to just regex extract them.
        
match_update = re.search(r'(async function updateStatusSolicitud.*?\}\s*\})', original_code, re.DOTALL)
match_getDetalle = re.search(r'(async function getDetalleSolicitud.*?\}\s*\})', original_code, re.DOTALL)
match_regresar = re.search(r'(async function regresarEstadoSolicitudJefe.*?\}\s*\})', original_code, re.DOTALL)

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/SolicitudVacaciones.js', 'w') as f:
    f.write(new_code)
    if match_update: f.write('\n' + match_update.group(1) + '\n')
    if match_getDetalle: f.write('\n' + match_getDetalle.group(1) + '\n')
    if match_regresar: f.write('\n' + match_regresar.group(1) + '\n')

print("SolicitudVacaciones.js updated!")
