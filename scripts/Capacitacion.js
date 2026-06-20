// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

const _URL = "Backend/Capacitacion/App.php";
const _IMG = "../assets/images/previewsFolders/ppt.png";
let div_view_file = $("#viewFile");
let contenedorArchivo;
let DiasCalendario = [];
let tipo = "";
let existeFichero = false;
let archivoGlobal;
let inputGlobal;
let newOp;
let modal = false;
let ind;
let globalTipoCap = "";

let gridCapacitacion = null;

function formatBytes(bytes) {
  if (bytes === 0 || !bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function truncateFileName(name, max = 22) {
  if (!name || name.length <= max) return name;
  const ext = name.split(".").pop();
  const base = name.substring(0, name.length - ext.length - 1);
  const keep = Math.max(1, max - ext.length - 4);
  return base.substring(0, keep) + "..." + ext;
}

function getFileIconClass(ext) {
  if (!ext) return "insert_drive_file";
  ext = ext.toLowerCase();
  if (ext === "pdf") return "picture_as_pdf";
  if (["doc", "docx"].includes(ext)) return "description";
  if (["xls", "xlsx"].includes(ext)) return "table_chart";
  if (["ppt", "pptx"].includes(ext)) return "slideshow";
  if (["png", "jpg", "jpeg", "gif", "webp", "bmp"].includes(ext)) return "image";
  if (ext === "mp4") return "videocam";
  return "insert_drive_file";
}
getCapacitaciones();
m = $("#modalNuevaCapacitacion");
cierre = $("#cerrarModal");
mo = document.getElementById("modalNuevaCapacitacion");
//console.log(",", m);

//$("#statusModal").click(()=>{
//  m.style.display = "inline";
//})

function tipoCap(val) {
  $("#detalleCapacitacion").fadeIn();
  globalTipoCap = val;
  if (val == "PROL") {
    $("#fechaInicio").val("");
    $("#fechaFin").val("");
    $("#HoraInicio").fadeOut();
    $("#HoraInicio").removeAttr("required");
    $("#textHoraInicio").fadeOut();
    $("#textHoraFin").fadeOut();
    $("#HoraInicio").val("");
    $("#HoraFin").fadeOut();
    $("#HoraFin").removeAttr("required");
    $("#HoraFin").val("");
    $("#divContenidoDias").fadeOut();
    $("#contenidoDias").html("");
    $("#divVistaPrevia").fadeIn();
    DiasCalendario = [];
  } else if (val == "DIA") {
    $("#fechaInicio").val("");
    $("#fechaFin").val("");
    $("#HoraInicio").fadeIn();
    $("#HoraInicio").prop("required", true);
    $("#textHoraInicio").fadeIn();
    $("#textHoraFin").fadeIn();
    $("#HoraInicio").val("");
    $("#HoraFin").fadeIn();
    $("#HoraFin").prop("required", true);
    $("#HoraFin").val("");
    $("#divContenidoDias").fadeIn();
    $("#contenidoDias").html("");
    $("#divVistaPrevia").fadeIn();
    DiasCalendario = [];
  }
}

$("#cerrarModal").click(() => {
  console.log("cierre");
  mo.style.display = "none";
});

function manipularArchivos(archivoRecibido, input_file) {
  datos = {
    op: "leerCarpetaArchivos",
  };
  $.ajax({
    type: "post",
    url: _URL,
    data: datos,
    dataType: "json",
    success: (ajaxResponse) => {
      ficheros = ajaxResponse;
      existeFichero = ficheros.includes(archivoRecibido);
      if (existeFichero) {
        inputGlobal = input_file;
        archivoGlobal = archivoRecibido;
        //input_file.type = "text";
        //input_file.value = archivoRecibido;
        newOp = "addCapacitacionInputText";
      } else {
        newOp = "addCapacitacion";
        existeFichero = false;
      }
    },
  });
}

function getDiasArray() {
  $("#contenidoDias").html("");
  DiasCalendario = [];
  const diasUnicos = [];
  fechaInicio = $("#fechaInicio").val();
  fechaFin = $("#fechaFin").val();
  if (fechaInicio != "" && fechaFin != "") {
    datos = {
      op: "getFechasRango",
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    };
    $.ajax({
      type: "post",
      url: "Backend/Capacitacion/App.php",
      data: datos,
      success: function (response) {
        response = JSON.parse(response.trim());
        for (var i = 0; i < response.length; i++) {
          const elemento = response[i]["fecha"];
          if (!diasUnicos.includes(response[i]["fecha"])) {
            diasUnicos.push(elemento);
          }
        }
        let numeroDia = "";
        for (var i = 0; i < diasUnicos.length; i++) {
          if (diasUnicos[i] == "Sunday") {
            numeroDia = "1";
          } else if (diasUnicos[i] == "Monday") {
            numeroDia = "2";
          } else if (diasUnicos[i] == "Tuesday") {
            numeroDia = "3";
          } else if (diasUnicos[i] == "Wednesday") {
            numeroDia = "4";
          } else if (diasUnicos[i] == "Thursday") {
            numeroDia = "5";
          } else if (diasUnicos[i] == "Friday") {
            numeroDia = "6";
          } else if (diasUnicos[i] == "Saturday") {
            numeroDia = "7";
          }
          $("#contenidoDias").append(`
            <div class="col s3" style="text-align:center">
            <div class="switch">
              <label>
                  <input  type="checkbox" id="check${numeroDia}" onclick="diasSemanaSelected(${numeroDia})">
                  <span class="lever"></span>
              </label>
            </div>
              ${diasUnicos[i]}
            </div>
            `);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  }
}

function diasSemanaSelected(dia) {
  let indice = "";
  if (DiasCalendario.includes(dia)) {
    indice = DiasCalendario.indexOf(dia);
    DiasCalendario.splice(indice, 1);
  } else {
    DiasCalendario.push(dia);
  }
}

function prueba() {
  $("#Desc").val("sss");
  $("#fechaInicio").val("2022-12-12");
  $("#HoraInicio").val("10:20");
  $("#fechaFin").val("2022-12-13");
  $("#HoraFin").val("12:20");
}

$("#btnAgregar").click(function () {
  if (document.getElementById("FormCapacitacion").checkValidity()) {
    event.preventDefault();
    if (existeFichero) {
      inputGlobal.type = "text";
      inputGlobal.value = archivoGlobal;
    }
    let form = $("#FormCapacitacion")[0];
    let data = new FormData(form);
    data.append("op", newOp);
    data.append("dias", DiasCalendario);
    data.append("tipoCapacitacion", globalTipoCap);
    //data.append("tipo",tipo="t.i.p.o");
    data.append("existeFichero", existeFichero);
    $.ajax({
      type: "POST",
      url: "Backend/Capacitacion/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        console.log([...data]);
        if (response == "1") {
          // toastr.success("Capacitacion agregada");
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Capacitacion agregada.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          $.blockUI({ message: null });

          setTimeout(function () {
            location.reload();
          }, 3000);
        } else if (response == "0") {
          // toastr.info("Error al guardar");
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error al guardar.</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        } else {
          // toastr.info(response);
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${response}</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // toastr.info("Faltan datos por ingresar");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">ltan datos por ingresar.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
});

function getArchivos() {
  let datos = {
    op: "getArchivosCapacitacion",
  };
  $.ajax({
    type: "post",
    url: _URL,
    data: datos,
    dataType: "json",
    success: (ajaxResponse) => {
      //  console.log(ajaxResponse);
      return;
    },
  });
}


function getCapacitaciones() {
  const datos = {
    op: "getCapacitacionDisponibles",
  };
  
  $(".preloader").show();

  if (gridCapacitacion) {
    gridCapacitacion.destroy();
  }

  $.ajax({
      type: "POST",
      url: "Backend/Capacitacion/App.php",
      data: datos,
      dataType: "json",
      success: function (response) {
        if (typeof response === "string") {
          try {
            response = JSON.parse(response.trim());
          } catch(e) {
            response = [];
          }
        }
        if (!Array.isArray(response)) response = [];

        // Actualizar métricas del dashboard
        const total = response.length;
        const activas = response.filter(r => r.Status === "Activa").length;
        const inactivas = response.filter(r => r.Status === "Inactiva").length;
        $("#metricTotal").text(total);
        $("#metricActivas").text(activas);
        $("#metricInactivas").text(inactivas);

        let mappedData = response.map(row => {
          const b64 = btoa(row.idCapacitacion);
          const statusBadge = row.Status === "Activa"
            ? `<span class="badge bg-success">Activa</span>`
            : `<span class="badge bg-danger">Inactiva</span>`;
          const statusIcon = row.Status === "Activa" ? "toggle_on" : "toggle_off";
          const statusColor = row.Status === "Activa" ? "btn-success" : "btn-danger";
          const statusTitle = row.Status === "Activa" ? "Desactivar" : "Activar";
          let btnHtml = `
            <div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
              <button onclick="editarCapacitacion('${b64}')" class="btn btn-primary btn-accion" title="Editar">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button onclick="cancelarCapacitacion(${row.idCapacitacion}, '${row.Status}')" class="btn ${statusColor} btn-accion" title="${statusTitle}">
                <span class="material-symbols-outlined">${statusIcon}</span>
              </button>
              <button onclick="eliminarCapacitacion(${row.idCapacitacion},'${row.Descripcion}')" class="btn btn-danger btn-accion" title="Eliminar">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>`;
          let archivosHtml = `
            <button onclick="verArchivosCapacitacion(${row.idCapacitacion})" class="btn btn-outline-info btn-sm" title="Ver archivos">
              <span class="material-symbols-outlined" style="font-size:18px; vertical-align:middle;">folder_open</span>
              <span class="align-middle">Archivos (${row.CantidadArchivos || 0})</span>
            </button>`;
            return {
              ...row,
              StatusBadgeHTML: statusBadge,
              ArchivosHTML: archivosHtml,
              AccionesHTML: btnHtml
            };
        });

        gridCapacitacion = new ej.grids.Grid({
            dataSource: mappedData,
            toolbar: ["Search"],
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
                <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
                    <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">school</span>
                </div>
                <h5 class="text-dark mb-2" style="font-weight: 600;">No hay capacitaciones registradas</h5>
                <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">Aún no se ha encontrado ninguna capacitación en la base de datos.</p>
              </div>`,
            columns: [
              { field: "Descripcion", headerText: "Descripción", width: 180 },
              { field: "Dias", headerText: "Días", width: 140 },
              { field: "FechaInicio", headerText: "Fecha Inicio", width: 120 },
              { field: "FechaFin", headerText: "Fecha Fin", width: 120 },
              { field: "HoraInicio", headerText: "Hora Inicio", width: 120 },
              { field: "HoraFin", headerText: "Hora Fin", width: 120 },
              { field: "StatusBadgeHTML", headerText: "Estatus", width: 100, textAlign: "Center", disableHtmlEncode: false },
              { field: "ArchivosHTML", headerText: "Archivos", width: 130, textAlign: "Center", disableHtmlEncode: false },
              { field: "AccionesHTML", headerText: "Acciones", width: 160, textAlign: "Center", disableHtmlEncode: false }
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
        gridCapacitacion.appendTo("#tableCapacitacion");
      },
      complete: function() {
        $(".preloader").fadeOut();
      },
      error: function(xhr, error, thrown) {
        console.error("Error en getCapacitaciones:", error);
        $(".preloader").fadeOut();
      }
  });
}

// async function eliminarCapacitacion(cap, desc) {
//   alertify
//     .confirm(
//       `¿Desea eliminar la capacitación ${desc}?`,
//       `Si elimina la capacitación se eliminarán de forma permanente todos los registros relacionados con la capacitación.`,
//       async function () {
//         let datos = await {
//           op: "deleteCapacitacion",
//           idFeed: cap,
//         };
//         let respuesta = "";
//         try {
//           respuesta = await $.ajax({
//             type: "post",
//             url: "Backend/Capacitacion/App.php",
//             data: datos,
//           });
//         } catch (e) {
//           console.log(e);
//         } finally {
//           if (respuesta == "1") {
//             alertify.success(`¡Capacitación ${desc} eliminada con éxito!`);
//             getCapacitaciones();
//           } else {
//             alertify.warning(respuesta);
//           }
//         }
//       },
//       async function () {}
//     )
//     .set("labels", { ok: "Confirmar", cancel: "Cancelar" });
// }

async function eliminarCapacitacion(cap, desc) {
  Swal.fire({
    title: `¿Desea eliminar la capacitación "${desc}"?`,
    text: "Si elimina la capacitación, se eliminarán de forma permanente todos los registros relacionados.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#008837",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let datos = {
        op: "deleteCapacitacion",
        idFeed: cap,
      };

      let respuesta = "";
      try {
        respuesta = await $.ajax({
          type: "post",
          url: "Backend/Capacitacion/App.php",
          data: datos,
        });
      } catch (e) {
        console.error(e);
      } finally {
        if (respuesta == "1") {
          // Swal.fire({
          //   icon: "success",
          //   title: "Eliminado",
          //   text: `¡Capacitación "${desc}" eliminada con éxito!`,
          //   timer: 2000,
          //   showConfirmButton: false,
          // });
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">¡Capacitación "${desc}" eliminada con éxito!</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          getCapacitaciones();
        } else {
          // Swal.fire({
          //   icon: "warning",
          //   title: "Aviso",
          //   text: respuesta,
          // });
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">${respuesta}</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      }
    }
  });
}

async function editarCapacitacion(cap) {
  window.location.href = `UpdateCapacitacion.php?Cap=${cap}`;
}
// Inicio - Toggle estatus capacitación
function cancelarCapacitacion(id, currentStatus) {
  const isActivating = currentStatus !== "Activa";
  const nuevoEstado = isActivating ? 1 : 0;
  const titulo = isActivating ? "¿Desea activar la capacitación?" : "¿Desea desactivar la capacitación?";
  const confirmBtnText = isActivating ? "Activar" : "Desactivar";
  const confirmBtnColor = isActivating ? "#28a745" : "#dc3545";

  Swal.fire({
    title: titulo,
    text: isActivating ? "Los colaboradores podrán verla de nuevo." : "Ya no será visible para los colaboradores.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: confirmBtnColor,
    cancelButtonColor: "#6c757d",
    cancelButtonText: "Cancelar",
    confirmButtonText: confirmBtnText,
  }).then((result) => {
    if (result.isConfirmed) {
      let datos = {
        op: "cancelarCapacitacion",
        idCapacitacion: id,
        status: nuevoEstado
      };
      $.ajax({
        type: "post",
        url: "Backend/Capacitacion/App.php",
        data: datos,
        success: function (response) {
          if (response == "1") {
            const msg = isActivating ? "Capacitación activada con éxito." : "Capacitación desactivada con éxito.";
            const messageContent = `
              <div class="alert-content">
                <span class="alert-title">Completado!</span>
                <span class="alert-text">${msg}</span>
              </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            setTimeout(function () {
              getCapacitaciones();
            }, 1000);
          } else {
            const messageContent = `
              <div class="alert-content">
                <span class="alert-title">Error!</span>
                <span class="alert-text">No se pudo cambiar el estatus.</span>
              </div>`;
            showBootstrapAlertErr(messageContent, "top-right", 5000);
          }
        },
        error: function (e) {
          alert("Error de red: " + e.responseText);
        },
      });
    }
  });
}

//Get info selects -Inicio
function getPuestos() {
  let arrId = [];
  $.ajax({
    type: "post",
    url: "Backend/Puestos/App.php",
    data: "op=getPuestos",
    success: function (response) {
      response = JSON.parse(response.trim());
      response.map((res) => {
        arrId.push(res.IdPuesto);
      });
      globalId = arrId.join(",");
      $("#slctPuestos").append(`
       <option value="${globalId}">Todas las Opciones</option>
       `);
      response.map((res) => {
        $("#slctPuestos").append(`
          <option value='${res.IdPuesto}'>${res.Puesto}</option>
          `);
      });
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
function getDivisiones() {
  let arrId = [];
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: "op=getDivisiones",
    success: function (response) {
      response = JSON.parse(response.trim());
      //  console.log("Response _ ", response);
      response.map((res) => {
        arrId.push(res.IdDivision);
      });
      globalId = arrId.join(",");
      $("#slctDivision").append(`
       <option value="${globalId}">Todas las Opciones</option>
       `);
      response.map((res) => {
        $("#slctDivision").append(`
          <option value="${res.IdDivision}">${res.Division}</option>
          `);
      });
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

//selSuc = document.getElementById("slctSucursal")
//selDiv = document.getElementById("slctDivision")
//selPue = document.getElementById("slctPuestos")
//const opcionCambiada = () => {
//  let indexDiv = selDiv.selectedIndex;
//  let indexPue = selPue.selectedIndex;
//  let indexSuc = selSuc.selectedIndex;
//  let selSucursal = selSuc.options[1];
//  let selPuestos = selPue.options[1];
//  let selDivision = selDiv.options[1];

//if (indexDiv != 1 || indexPue != 1 || indexSuc != 1) {
//
//  selSucursal.selected = true;
//  selPuestos.selected = true;
//  selDivision.selected = true;
//}
//indexPue = 1;
//indexDiv = 1;
//indexSuc=1;
//selSucursal.selected = true;
//selPuestos.selected = true;
//selDivision.selected = true;
//  if (!selDiv.value.includes(',') && !selPue.value.includes(',') && !selSuc.value.includes(',') ){
//      selDiv.getElementsByTagName('option')[1].selected = false;
//      selSuc.getElementsByTagName('option')[1].selected = false;
//      selPue.getElementsByTagName('option')[1].selected = false;
//      indexPue = indexPue;
//      indexDiv = indexDiv;
//      indexSuc= indexSuc;
//
//    }
//   if(selDiv.value.includes(',') && selPue.value.includes(',') && selSuc.value.includes(',') ){
//      selDiv.getElementsByTagName('option')[1].selected = true;
//      selSuc.getElementsByTagName('option')[1].selected = true;
//      selPue.getElementsByTagName('option')[1].selected = true;
//      indexPue = 1;
//      indexDiv = 1;
//      indexSuc=1;
//    }
//
//        console.log("element_ ", indexDiv,indexPue,indexSuc);
//
//};
//selDiv.addEventListener("change", opcionCambiada);
//selPue.addEventListener("change", opcionCambiada);
//selSuc.addEventListener("change", opcionCambiada);

function getSucursales() {
  let arrId = [];
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: "op=getSucursales",
    success: function (response) {
      response = JSON.parse(response.trim());
      response.map((res) => {
        arrId.push(res.IdSucursal);
      });
      globalId = arrId.join(",");
      $("#slctSucursal").append(`
       <option value="${globalId}">Todas las Opciones</option>
       `);
      response.map((res) => {
        $("#slctSucursal").append(`
          <option value="${res.IdSucursal}">${res.Sucursal}</option>
          `);
      });
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

/* function getCentrosCostos () {
    let arrId=[];
    $.ajax({
        type: "post",
        url: "Backend/Capacitacion/App.php",
        data: "op=getCentrosCostos",
        success:function(response){
            response = JSON.parse(response.trim());
            response.map((res)=>{
              arrId.push(res.IdCentroCosto);
            });
            globalId = arrId.join(",");
            $("#slctCentroCosto").append(`
             <option value="${globalId}">Todas las Opciones</option>
             `);
            response.map((res)=>{
              $("#slctCentroCosto").append(`
                <option value="${res.IdCentroCosto}">${res.CentrodeCosto}</option>
                `);
            })
          }, error:function(e){
            alert(e.responseText);
          }
    });
} */

//Get info selects - FIN

$("#slctPuestos").click(() => {});
$("#slctDivision").click(() => {});
$("#slctSucursal").click(() => {});
/*
  async function getListadoPersonal(){
    let puesto = $("#slctPuestos").val();
    let sucursal = $("#slctSucursal").val();
    let division = $("#slctDivision").val();

  } */

$("#NuevoArchivo").click(function () {
  console.log("click 1");
  $("#ipn_archivo").val("");
  $("#ipn_archivo").click();
});

function previewFile(event, querySelector) {
  //Recuperamos el input que desencadeno la acción
  // console.log("click 2");
  const input = event.target;
  ext = validarFile(input);
  file = input.files[0];

  if (ext == ".pdf") {
    div_view_file.html("");
    div_view_file.append(`<object data="" type="application/pdf" id="filePreview" alt="" style="width: 40%;background: black"></object>
        <h6>${file.name}</h6>`);
  }
  if (ext === ".mp4") {
    div_view_file.html("");
    div_view_file.html(`<video src="" id="filePreview" mute="true" controls style="width:60%; border-right: gray 1px solid" allowfullscreen>
              <source src="" type="video/mp4" />
              </video>
              <h6>${file.name}</h6>`);
  }
  if (ext === ".pptx" || ext === ".ppt") {
    div_view_file.html("");
    div_view_file.html(`<img id="filePreview" style="width: 50%;padding:1em ; background: #df040ba4">
      <h6>${file.name}</h6>`);
  }
  //Recuperamos la etiqueta img donde cargaremos la imagen
  //$imgPreview = document.querySelector(querySelector);
  $imgPreview = document.querySelector(querySelector);

  // Verificamos si existe una imagen seleccionada
  if (!input.files.length) return;

  //Recuperamos el archivo subido
  file = input.files[0];
  manipularArchivos(file.name, input);
  //Creamos la url
  objectURL = URL.createObjectURL(file);

  //Modificamos el atributo src de la etiqueta img
  if (ext === ".pdf") {
    $imgPreview.data = objectURL;
  }
  if (ext === ".mp4") {
    $imgPreview.src = objectURL;
  }
  if (ext === ".pptx" || ext === ".ppt") {
    $imgPreview.src = _IMG;
  }
  console.log("img _ ", _IMG);
}

function validarFile(all) {
  //EXTENSIONES Y TAMANO PERMITIDO.
  var extensiones_permitidas = [".pdf", ".mp4", ".pptx", ".ppt"];
  var tamano = 4; // EXPRESADO EN MB.
  var rutayarchivo = all.value;
  var ultimo_punto = all.value.lastIndexOf(".");
  var extension = rutayarchivo.slice(ultimo_punto, rutayarchivo.length);
  if (extensiones_permitidas.indexOf(extension) == -1) {
    // toastr.info("Extensión de archivo no valida");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Extensión de archivo no valid.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
    document.getElementById(all.id).value = "";
    return; // Si la extension es no válida ya no chequeo lo de abajo.
  }
  if (all.files[0].size / 200048576 > tamano) {
    alert("El archivo no puede superar los " + tamano + "GB");
    document.getElementById(all.id).value = "";
    return;
  }
  return extension;
}

function getFileExtension2(filename) {
  return filename.split(".").pop();
}

async function verArchivosCapacitacion(idCapacitacion) {
  const idB64 = btoa(idCapacitacion);
  const datos = {
    op: "getArchivosActualesCapacitacion",
    idCapacitacion: idB64
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Capacitacion/App.php",
      data: datos,
      dataType: "json"
    });
  } catch (e) {
    console.log(e);
  }

  if (!Array.isArray(respuesta) || respuesta.length < 1) {
    Swal.fire({
      title: "Archivos de la capacitación",
      text: "Esta capacitación no tiene archivos adjuntos.",
      icon: "info",
      confirmButtonColor: "#008837",
      confirmButtonText: "Cerrar"
    });
    return;
  }

  let contenido = `<div class="row g-2" style="max-height:60vh; overflow-y:auto;">`;
  respuesta.forEach((archivo) => {
    const ext = (archivo.extension || "").toLowerCase();
    const iconClass = getFileIconClass(ext);
    contenido += `
      <div class="col-12 col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body p-2 d-flex align-items-center">
            <span class="material-symbols-outlined" style="font-size:40px; color:#6c757d;">${iconClass}</span>
            <div class="ms-2 flex-grow-1 text-start" style="min-width:0;">
              <p class="mb-0 fw-semibold text-truncate" title="${archivo.nombreOriginal}">${truncateFileName(archivo.nombreOriginal, 28)}</p>
              <small class="text-muted">${formatBytes(archivo.pesoBytes)}</small>
            </div>
          </div>
          <div class="card-footer p-1 text-center bg-white border-top-0">
            <a href="Backend/Capacitacion/App.php?op=getArchivoCapacitacion&idArchivo=${archivo.id}&download=1" target="_blank" class="btn btn-outline-primary btn-sm">
              <span class="material-symbols-outlined" style="font-size:16px; vertical-align:middle;">download</span> Descargar
            </a>
          </div>
        </div>
      </div>
    `;
  });
  contenido += `</div>`;

  Swal.fire({
    title: "Archivos de la capacitación",
    html: contenido,
    width: "700px",
    showCloseButton: true,
    confirmButtonColor: "#008837",
    confirmButtonText: "Cerrar",
    customClass: {
      popup: "text-start"
    }
  });
}
