const myKeysValues = window.location.search;

const urlParams = new URLSearchParams(myKeysValues);

const IdCap = urlParams.get("Cap");

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

let ArrayContenidoEmpleados = [];

const ALLOWED_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".mp4"
];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/bmp",
  "video/mp4"
];

const MAX_FILE_SIZE = 500 * 1024 * 1024;

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

$(document).ready(async function() {
  $(".preloader").show();
  
  try {
    await Promise.all([
      getDetalleCapacitacion(),
      getArchivosActualesCapacitacion(),
      getPuestos(),
      getSucursales(),
      getDivisiones(),
      getArchivos(),
      getListadoPersonal()
    ]);
  } catch (error) {
    console.error("Error en la carga inicial:", error);
  } finally {
    setTimeout(() => {
      $(".preloader").fadeOut();
    }, 500);
  }
});

m = $("#modalNuevaCapacitacion");

cierre = $("#cerrarModal");

mo = document.getElementById("modalNuevaCapacitacion");

async function getDetalleCapacitacion() {

  let datos = {

    op: "getDetalleCapacitacion",

    idCapacitacion: IdCap,

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Capacitacion/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (error) {

    console.log(error);

  } finally {

    console.log(respuesta.length + " capacitaciones cargadas.");

    respuesta.map((retorno) => {

      retorno.Empleados.forEach((empleado) => {

        ArrayContenidoEmpleados.push(empleado);

      });

    });

    let DiasActualesRegistrados = [];

    respuesta.forEach((DatasCap) => {

      DatasCap.Detalle.forEach((registros) => {

        $("#tipoCapacitacion").val(registros.Tipo);

        $("#Desc").val(registros.Descripcion);

        $("#fechaInicio").val(registros.FechaInicio);

        $("#HoraInicio").val(registros.HoraInicio);

        $("#fechaFin").val(registros.FechaFin);

        $("#HoraFin").val(registros.HoraFin);

        if (registros.Dias != "") {

          DiasActualesRegistrados = registros.Dias.split(",");

          for (var i = 0; i < DiasActualesRegistrados.length; i++) {

            DiasCalendario.push(Number(DiasActualesRegistrados[i]));

          }

        }

      });

    });

    tipoCap();

    getDiasArray();

    loadEmpleadosSeleccionados();

  }

}

function tipoCap() {

  let val = $("#tipoCapacitacion").val();

  $("#detalleCapacitacion").fadeIn();

  globalTipoCap = val;

  if (val == "PROL") {

    $("#colHoraInicio").fadeOut();

    $("#HoraInicio").removeAttr("required");

    $("#colHoraFin").fadeOut();

    $("#HoraFin").removeAttr("required");

    $("#divContenidoDias").fadeOut();

    $("#contenidoDias").fadeOut();

    $("#divVistaPrevia").fadeIn();

  } else if (val == "DIA") {

    $("#colHoraInicio").fadeIn();

    $("#HoraInicio").prop("required", true);

    $("#colHoraFin").fadeIn();

    $("#HoraFin").prop("required", true);

    $("#divContenidoDias").fadeIn();

    $("#contenidoDias").fadeIn();

    $("#divVistaPrevia").fadeIn();

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

        let nombreDiaEspanol = "";

        const diasTraduccion = {

          "Sunday": "Domingo",

          "Monday": "Lunes",

          "Tuesday": "Martes",

          "Wednesday": "Miércoles",

          "Thursday": "Jueves",

          "Friday": "Viernes",

          "Saturday": "Sábado"

        };

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

          nombreDiaEspanol = diasTraduccion[diasUnicos[i]] || diasUnicos[i];

          $("#contenidoDias").append(`

    <label class="day-selector" for="check${numeroDia}">

      <input class="day-checkbox" type="checkbox" id="check${numeroDia}" onclick="diasSemanaSelected(${numeroDia})">

      <span class="day-label">${nombreDiaEspanol}</span>

    </label>

`);

        }

        DiasCalendario.forEach((DiasActuales) => {

          $("#check" + DiasActuales).prop("checked", true);

        });

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

  console.log(DiasCalendario);

}

function prueba() {

  $("#Desc").val("sss");

  $("#fechaInicio").val("2022-12-12");

  $("#HoraInicio").val("10:20");

  $("#fechaFin").val("2022-12-13");

  $("#HoraFin").val("12:20");

}

function getArchivos() {

  let datos = {

    op: "getArchivosCapacitacion",

  };

  return $.ajax({

    type: "post",

    url: _URL,

    data: datos,

    dataType: "json",

    success: (ajaxResponse) => {

      return;

    },

  });

}

function cancelarCapacitacion(val) {

  Swal.fire({

    title: "¿Desea cancelar la capacitacion?",

    text: "",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    cancelButtonText: "Cancelar",

    confirmButtonText: "Aceptar",

  }).then((result) => {

    if (result.isConfirmed) {

      let datos = {

        op: "cancelarCapacitacion",

        idCapacitacion: val,

      };

      $.ajax({

        type: "post",

        url: "Backend/Capacitacion/App.php",

        data: datos,

        success: function (response) {

          if (response == "1") {

            const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Capacitacion desactivada.</span>

          </div>`;

            showBootstrapAlertSuc(messageContent, "top-right", 5000);

            setTimeout(function () {

              getCapacitaciones();

            }, 1000);

          } else {

            const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Capacitacion desactivada.</span>

          </div>`;

            showBootstrapAlertSuc(messageContent, "top-right", 5000);

          }

        },

        error: function (e) {

          alert(e.responseText);

        },

      });

    } else {

    }

  });

}

function getPuestos() {

  return $.ajax({

    type: "post",

    url: "Backend/Puestos/App.php",

    data: "op=getPuestos",

    success: function (response) {

      response = JSON.parse(response.trim());

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

      /*       response.map((res)=>{

        arrId.push(res.IdDivision);

      });

      globalId = arrId.join(",");

      $("#slctDivision").append(`

       <option value="${globalId}">Todas las Opciones</option>

       `); */

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

      /*       response.map((res)=>{

        arrId.push(res.IdSucursal);

      });

      globalId = arrId.join(",");

      $("#slctSucursal").append(`

       <option value="${globalId}">Todas las Opciones</option>

       `); */

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



async function getListadoPersonal() {

  let puesto = await $("#slctPuestos").val();

  let sucursal = await $("#slctSucursal").val();

  let division = await $("#slctDivision").val();

  let datos = await {

    op: "getPersonal",

    IdPuesto: puesto,

    IdSucursal: sucursal,

    IdDivision: division,

  };

  respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Capacitacion/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (error) {

    console.log(error);

  } finally {

    let tableEmpleados = await $("#tableEmpleados").dataTable({

      destroy: true,

      paging: false,



      columnDefs: [

        { width: "20%", targets: 0 },

        { width: "60%", targets: 1 },

        { width: "20%", targets: 2 },

      ],



      autoWidth: false,

    });

    const dataSet = respuesta.map(personal => [
      personal.NoEmpleado,
      personal.Nombre,
      `<button class="btn-minimal btn-minimal-success btn-sm" role="button" onclick="SeleccionaEmpleado(${personal.NoEmpleado},'${personal.Nombre.replace(/'/g, "\\'")}','${personal.Puesto.replace(/'/g, "\\'")}',
              '${personal.Sucursal.replace(/'/g, "\\'")}','${personal.Email}')" title="Agregar"><span class="material-symbols-outlined">add</span></button>`
    ]);

    tableEmpleados.fnAddData(dataSet);

  }

}



// let ArrayContenidoEmpleados = [];

// async function SeleccionaEmpleado(NoEmpleado, Nombre, Puesto, Sucursal, Email) {

//   let existe = ArrayContenidoEmpleados.some((regArreglo) => {

//     return regArreglo.NoEmpleado === NoEmpleado;

//   });

//   if (existe == true) {

//     alertify.warning("El empleado ya se encuentra seleccionado.");

//   } else {

//     let datos = await {

//       NoEmpleado: NoEmpleado,

//       Nombre: Nombre,

//       Puesto: Puesto,

//       Sucursal: Sucursal,

//     };

//     ArrayContenidoEmpleados.push(datos);

//     loadEmpleadosSeleccionados();

//   }


async function SeleccionaEmpleado(NoEmpleado, Nombre, Puesto, Sucursal, Email) {

  let existe = ArrayContenidoEmpleados.some((regArreglo) => {

    return regArreglo.NoEmpleado === NoEmpleado;

  });



  if (existe) {

    Swal.fire({

      icon: "warning",

      title: "Empleado ya seleccionado",

      text: "El empleado ya se encuentra en la lista.",

      confirmButtonColor: "#ffc407",

    });

  } else {

    let datos = {

      NoEmpleado: NoEmpleado,

      Nombre: Nombre,

      Puesto: Puesto,

      Sucursal: Sucursal,

      Email: Email, // lo dejo porque en tu primer ejemplo sí se incluía

    };

    ArrayContenidoEmpleados.push(datos);

    loadEmpleadosSeleccionados();

  }

}



// async function VerDetalles() {

//   let contenido = "";

//   ArrayContenidoEmpleados.forEach((empleados) => {

//     contenido += `

//             <div class="col s6 l4" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;padding:2vh;border-radius:20px;">

//                 <div class="row">

//                    <div class="col s10 l10">

//                         <div class="row">

//                             <div class="col s12 l12" style="text-align:center">

//                                 <h6><b>Empleado</b></h6>

//                             </div>

//                             <div class="col s12 l12" style="text-align:center">

//                                 <h6 style="font-size:.8em;">${empleados.Nombre}</h6>

//                             </div>

//                             <div class="col s12 l12">

//                                 <div class="row">

//                                     <div class="col s6 l6" style="text-align:center;">

//                                           <h6><b>Puesto</b></h6>

//                                           <h6 style="font-size:.8em;">${empleados.Puesto}</h6>

//                                     </div>

//                                     <div class="col s6 l6" style="text-align:center;">

//                                           <h6><b>Sucursal</b></h6>

//                                           <h6 style="font-size:.8em;">${empleados.Sucursal}</h6>

//                                     </div>

//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                     <div class="col s2 l2">

//                            <button id="selected${empleados.NoEmpleado}" style="border-radius:15px; border:0px" onclick="deleteEmpleadoSelectedDetalle(${empleados.NoEmpleado})"><i class="fa-light fa-trash"></i></button>

//                     </div>

//                 </div>

//             </div>

//         `;

//   });

//   alertify

//     .alert(

//       "Empleados Seleccionados",

//       `

//         <div class="row">

//              ${contenido}

//         </div>

//     `

//     )

//     .maximize();

// }



async function VerDetalles() {

  let contenido = "";



  ArrayContenidoEmpleados.forEach((empleados) => {

    contenido += `

      <div class="col-12 col-md-6 col-lg-4 elementosDetalle mb-3">

        <div class="card shadow-sm h-100">

          <div class="card-body p-2">

            <div class="d-flex justify-content-between align-items-start">

              <div class="flex-grow-1">

                <label class="form-label d-block text-center fw-bold mb-1">Empleado</label>

                <h6 class="text-center mb-2" style="font-size:.85em;">${empleados.Nombre}</h6>

                <div class="row text-center">

                  <div class="col-6">

                    <label class="form-label fw-bold mb-0">Puesto</label>

                    <small class="d-block">${empleados.Puesto}</small>

                  </div>

                  <div class="col-6">

                    <label class="form-label fw-bold mb-0">Sucursal</label>

                    <small class="d-block">${empleados.Sucursal}</small>

                  </div>

                </div>

              </div>

              <div>

                <button 

                  id="selected${empleados.NoEmpleado}" 

                  class="btn btn-sm btn-danger ms-2"

                  onclick="deleteEmpleadoSelectedDetalle(${empleados.NoEmpleado})">

                  <span class="material-symbols-outlined">delete</span>

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    `;

  });



  Swal.fire({

    title: "Empleados Seleccionados",

    html: `

      <div class="container-fluid" style="max-height:60vh; overflow-y:auto; padding-right:5px;">

        <div class="row">${contenido}</div>

      </div>

    `,

    width: "80%",

    customClass: {

      popup: "text-start",

    },

    showCloseButton: true,

    confirmButtonText: "Cerrar",

    confirmButtonColor: "#ffc407",

  });

}



async function loadEmpleadosSeleccionados() {

  $("#contenidoEmpleadosSelected").html("");

  ArrayContenidoEmpleados.forEach((empleados) => {

    $("#contenidoEmpleadosSelected").append(`

    <div class="col-6 elementosSelected mb-2">

        <div class="card bg-transparent border border-secondary text-dark p-2">



            <div class="row">

                <div class="col-12 text-center">

                    <label class="form-label fw-bold">Empleado</label>

                    <label class="form-label mb-0" style="font-size:.8em;">${empleados.Nombre}</label>

                </div>

            </div>

         

            <div class="row mt-2">

                <div class="col-12 text-center">

                    <button id="selected${empleados.NoEmpleado}" class="btn-minimal btn-minimal-danger btn-sm" onclick="deleteEmpleadoSelected(${empleados.NoEmpleado})" title="Quitar">

                        <span class="material-symbols-outlined">delete</span>

                    </button>

                </div>

            </div>

        </div>

    </div>

`);

  });

}



async function deleteEmpleadoSelected(empleado) {

  ArrayContenidoEmpleados = ArrayContenidoEmpleados.filter((elemento) => {

    return elemento.NoEmpleado !== empleado;

  });

  loadEmpleadosSeleccionados();

}



async function deleteEmpleadoSelectedDetalle(empleado) {

  ArrayContenidoEmpleados = ArrayContenidoEmpleados.filter((elemento) => {

    return elemento.NoEmpleado !== empleado;

  });

  VerDetalles();

  loadEmpleadosSeleccionados();

}

$("#NuevoArchivo").click(function () {

  $("#ipn_archivo").val("");

  $("#ipn_archivo").click();

});



function previewFile(event, querySelector) {

  //Recuperamos el input que desencadeno la acci�n

  // console.log("click 2");

  const input = event.target;

  ext = validarFile(input);

  file = input.files[0];



  if (!ext || !file) return;



  div_view_file.html("");

  const rawExt = ext.replace(".", "").toLowerCase();

  const iconClass = getFileIconClass(rawExt);

  div_view_file.append(`

    <div class="text-center p-3">

      <span class="material-symbols-outlined" style="font-size:64px;">${iconClass}</span>

      <h6 class="mt-2">${file.name}</h6>

      <small class="text-muted">${formatBytes(file.size)}</small>

    </div>`);



  //Recuperamos la etiqueta img donde cargaremos la imagen

  $imgPreview = document.querySelector(querySelector);



  // Verificamos si existe una imagen seleccionada

  if (!input.files.length) return;



  //Recuperamos el archivo subido

  file = input.files[0];

  manipularArchivos(file.name, input);

  //Creamos la url

  objectURL = URL.createObjectURL(file);



  //Modificamos el atributo src de la etiqueta img

  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp"].includes(ext)) {

    div_view_file.html(`<img src="${objectURL}" id="filePreview" style="max-width:60%; max-height:300px; object-fit:contain;">

      <h6 class="mt-2">${file.name}</h6>`);

    if ($imgPreview) $imgPreview.src = objectURL;

  }


  console.log("img _ ", _IMG);

}

function validarFile(all) {

  //EXTENSIONES Y TAMANO PERMITIDO.

  var extensiones_permitidas = ALLOWED_EXTENSIONS;

  var tamano = MAX_FILE_SIZE; // 500 MB en bytes.

  var rutayarchivo = all.value;

  var ultimo_punto = all.value.lastIndexOf(".");

  var extension = rutayarchivo.slice(ultimo_punto, rutayarchivo.length).toLowerCase();

  if (extensiones_permitidas.indexOf(extension) == -1) {

    // toastr.info("Extensión de archivo no valida");

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Extensión de archivo no valida.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

    document.getElementById(all.id).value = "";

    return; // Si la extension es no válida ya no chequeo lo de abajo.

  }

  if (all.files[0].size > tamano) {

    alert("El archivo no puede superar los 500 MB");

    document.getElementById(all.id).value = "";

    return;

  }

  return extension;

}



function getFileExtension2(filename) {

  return filename.split(".").pop();

}



$("#btnStandards").click(function (e) {

  $("#standard_filess").click();

});



let arrayFiles = [];



(function () {

  "use strict";

  var dropZone = $("#dropzones")[0];

  var startUpload = function (files) {

    var tipo;

    var tamaño;

    for (var i = 0; i < files.length; i++) {

      tipo = files[i]["type"];

      tamaño = files[i]["size"];

      var ext = "." + (files[i]["name"].split(".").pop() || "").toLowerCase();

      var mimeOk = ALLOWED_MIME_TYPES.indexOf(tipo) !== -1;

      var extOk = ALLOWED_EXTENSIONS.indexOf(ext) !== -1;

      if (tamaño <= MAX_FILE_SIZE) {

        if (mimeOk || extOk) {

          arrayFiles.push(files[i]);

        } else {

          const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">El archivo: ${files[i]["name"]} no puede agregarse, verifique que sea unicamente formato PDF, Word, Excel, PowerPoint, imágenes (PNG, JPG, GIF, WEBP, BMP) o MP4 y que el tamaño sea menor a 500 MB.</span>

        </div>`;

          showBootstrapAlert(messageContent, "top-right", 5000);

        }

      } else {

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">El archivo es demasiado pesado, el tamaño máximo aceptado es: 500 MB.</span>

        </div>`;

        showBootstrapAlert(messageContent, "top-right", 5000);

      }

    }

    ImagenesDrop();

    console.log(arrayFiles);

  };



  var standardUpload = $("#standard_filess");

  standardUpload.change(function (e) {

    var standardFiles = $("#standard_filess").prop("files");

    startUpload(standardFiles);

  });

  dropZone.ondrop = function (e) {

    e.preventDefault();

    this.className = "upload-area p-4";

    startUpload(e.dataTransfer.files);

  };

  dropZone.ondragover = function () {

    this.className = "upload-area p-4 drop-active";

    return false;

  };

  dropZone.ondragleave = function () {

    this.className = "upload-area p-4";

  };

})();



function ver(files, cont) {

  console.log(files);

  var reader = new FileReader();

  let extension = files.name.split(".").pop();

  if (extension == "pdf") {

    reader.onload = function () {

      $("#preview" + cont).attr("src", "assets/images/PDFIcon.png");

    };

  } else if (extension == "ppt") {

    reader.onload = function () {

      $("#preview" + cont).attr("src", "assets/images/PPTicon.png");

    };

  } else {

    reader.onload = function () {

      $("#preview" + cont).attr("src", reader.result);

    };

  }



  reader.readAsDataURL(files);

}



function ImagenesDrop() {

  let mostarchivoss = `<div class="row g-2 justify-content-start">`;

  $.each(arrayFiles, function (index, arrfiles) {

    let extension = (arrfiles.name.split(".").pop() || "").toLowerCase();

    let iconClass = getFileIconClass(extension);
    let safeName = arrfiles.name.replace(/'/g, "\\'");

    mostarchivoss += `

      <div class="col-6 col-md-4 col-lg-3">

        <div class="card h-100 shadow-sm border">

          <div class="card-body p-2 text-center">

            <span class="material-symbols-outlined" style="font-size:40px; color:#6c757d;">${iconClass}</span>

            <p class="mb-1 mt-1 text-dark fw-semibold" style="font-size:12px;" title="${arrfiles.name}">${truncateFileName(arrfiles.name)}</p>

            <small class="text-muted" style="font-size:11px;">${formatBytes(arrfiles.size)}</small>

          </div>

          <div class="card-footer p-1 text-center bg-white border-top-0">

            <button type="button" class="btn btn-outline-danger btn-sm" onclick="RemoverArchivo('${safeName}');" title="Quitar archivo">

              <span class="material-symbols-outlined" style="font-size:18px;">delete</span>

            </button>

          </div>

        </div>

      </div>`;

  });

  mostarchivoss += `</div>`;

  $("#ImagenesDrop").html(mostarchivoss);

}



function RemoverArchivo(archivo) {

  var remover = arrayFiles

    .map(function (item) {

      return item.name;

    })

    .indexOf(archivo);

  arrayFiles.splice(remover, 1);

  ImagenesDrop();

}



// async function getArchivosActualesCapacitacion() {

//   let datos = await {

//     op: "getArchivosActualesCapacitacion",

//     idCapacitacion: IdCap,

//   };

//   let respuesta = [];

//   try {

//     respuesta = await $.ajax({

//       type: "post",

//       url: "Backend/Capacitacion/App.php",

//       data: datos,

//       dataType: "json",

//     });

//   } catch (e) {

//     console.log(e);

//   } finally {

//     $("#divContenidoArchivosActuales").html("");

//     if (respuesta.length < 1) {

//       $("#divContenidoArchivosActuales").append(`

//           <div class="col s12 l12" style="text-align:center">

//               <h5>La capacitación no cuenta con archivos agregados.</h5>

//           </div>

//         `);

//     } else {

//       let Capacitacion = atob(IdCap);

//       let arrArchivos = respuesta[0]["archivo"].split(",");

//       let ContenidoHTMLArchivos = "";

//       arrArchivos.forEach((contenidoArchivos) => {

//         let ext = obtenerExtension(contenidoArchivos);

//         if (ext === "pdf") {

//           ContenidoHTMLArchivos += `<div class="col s6 l4" style="text-align:center;">

//                                       <div class="row">

//                                         <div class="col s12 l12" style="height:15vh">

//                                             <object data="Archivos/Capacitaciones/${Capacitacion}/${contenidoArchivos}" type="application/pdf" id="filePreview" alt="" style="height: 100%; width:100%"></object>

//                                         </div>

//                                         <div class="col s12 l4 offset-l4" style="text-align:center">

//                                           <button class="btnEliminar1" onclick="eliminarArchivoCapacitacionSelected('${contenidoArchivos}')"><span class="text"><i class="fal fa-trash-alt"></i></span></button>

//                                         </div>

//                                       </div>

//                                     </div>`;

//         }

//         if (ext === "mp4") {

//           ContenidoHTMLArchivos += `<div class="col s6 l4" style="">

//           <video id="filePreview" mute="true" controls style="width:30%; border-right: gray 1px solid" allowfullscreen>

//                   <source src="Archivos/Capacitaciones/${Capacitacion}/${contenidoArchivos}"  type="video/mp4" />

//                   </video>

//                   <br><a href="Archivos/Capacitaciones/${Capacitacion}/${contenidoArchivos}" target="_blank" >Abrir Archivo</a>

//           </div>`;

//         }

//         if (ext === "pptx" || ext === "ppt") {

//           ContenidoHTMLArchivos += `<div class="col s6 l4" style="text-align:center;">

//                                       <div class="row">

//                                       <div class="col s12 l12" style="height:15vh; padding:2vh">

//                                         <a href="Archivos/Capacitaciones/${Capacitacion}/${contenidoArchivos}" target="_blank"><img id="filePreview" src="assets/images/PPTicon.png"  style="height: 100%;"></a>

//                                       </div>

//                                       <div class="col s12 l4 offset-l4" style="text-align:center">

//                                         <button class="btnEliminar1" onclick="eliminarArchivoCapacitacionSelected('${contenidoArchivos}')"><span class="text"><i class="fal fa-trash-alt"></i></span></button>

//                                       </div>

//                                     </div>

//                                   </div>`;

//         }

//         if (ext === "png" || ext === "jpg") {

//           ContenidoHTMLArchivos += `<div class="col s6 l4"style="text-align:center;">

//                                       <div class="row">

//                                           <div class="col s12 l12" style="height:15vh; padding:2vh">

//                                               <img id="filePreview" src="Archivos/Capacitaciones/${Capacitacion}/${contenidoArchivos}" style="height: 100%;">

//                                           </div>

//                                           <div class="col s12 l4 offset-l4" style="text-align:center">

//                                                 <button class="btnEliminar1" onclick="eliminarArchivoCapacitacionSelected('${contenidoArchivos}')"><span class="text"><i class="fal fa-trash-alt"></i></span></button>

//                                           </div>

//                                       </div>

//                                     </div>`;

//         }

//       });

//       $("#divContenidoArchivosActuales").append(ContenidoHTMLArchivos);

//     }

//   }

// }



async function getArchivosActualesCapacitacion() {

  let datos = await {

    op: "getArchivosActualesCapacitacion",

    idCapacitacion: IdCap,

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Capacitacion/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (e) {

    console.log(e);

  } finally {

    $("#divContenidoArchivosActuales").html("");

    if (!Array.isArray(respuesta) || respuesta.length < 1) {

      $("#divContenidoArchivosActuales").append(`

        <div class="d-flex justify-content-center align-items-center p-4">

          <div class="text-center">

            <h5 class="fw-semibold mb-0">La capacitación no cuenta con archivos agregados.</h5>

          </div>

        </div>

      `);

    } else {

      let ContenidoHTMLArchivos = `<div class="row">`;

      respuesta.forEach((archivo) => {

        let ext = (archivo.extension || "").toLowerCase();

        let iconClass = getFileIconClass(ext);

        let safeName = (archivo.nombreOriginal || "").replace(/'/g, "\\'");

        let previewHTML = "";

        if (ext === "pdf") {

          previewHTML = `<iframe src="Backend/Capacitacion/App.php?op=getArchivoCapacitacion&idArchivo=${archivo.id}" style="height:160px; width:100%; border:0;"></iframe>`;

        } else if (ext === "mp4") {

          previewHTML = `<video controls muted style="width:100%; height:160px;"><source src="Backend/Capacitacion/App.php?op=getArchivoCapacitacion&idArchivo=${archivo.id}" type="video/mp4"></video>`;

        } else if (["png", "jpg", "jpeg", "gif", "webp", "bmp"].includes(ext)) {

          previewHTML = `<img src="Backend/Capacitacion/App.php?op=getArchivoCapacitacion&idArchivo=${archivo.id}" alt="${safeName}" style="height:160px; width:100%; object-fit:contain;">`;

        } else {

          previewHTML = `<div class="d-flex align-items-center justify-content-center" style="height:160px;"><span class="material-symbols-outlined" style="font-size:64px; color:#6c757d;">${iconClass}</span></div>`;

        }

        ContenidoHTMLArchivos += `

          <div class="col-12 col-md-6 col-lg-4 mb-3">

            <div class="card h-100 shadow-sm text-center">

              <div class="card-body p-2">

                ${previewHTML}

              </div>

              <div class="card-footer text-center">

                <p class="mb-1 small text-dark fw-semibold" title="${archivo.nombreOriginal}">${truncateFileName(archivo.nombreOriginal)}</p>

                <small class="text-muted d-block mb-2">${formatBytes(archivo.pesoBytes)}</small>

                <a href="Backend/Capacitacion/App.php?op=getArchivoCapacitacion&idArchivo=${archivo.id}&download=1" target="_blank" class="btn btn-outline-primary btn-sm mb-1">Descargar</a>

                <button class="btn-minimal btn-minimal-danger btn-sm" onclick="eliminarArchivoCapacitacionSelected(${archivo.id})" title="Eliminar">

                  <span class="material-symbols-outlined">delete</span>

                </button>

              </div>

            </div>

          </div>

        `;

      });

      ContenidoHTMLArchivos += `</div>`;

      $("#divContenidoArchivosActuales").append(ContenidoHTMLArchivos);

    }

  }

}



function obtenerExtension(filename) {

  if (!filename) {

    return;

  }

  return filename.split(".").pop();

}



// async function eliminarArchivoCapacitacionSelected(archivo) {

//   let ext = obtenerExtension(archivo);

//   let contenidoHTML = "";

//   let Capacitacion = atob(IdCap);

//   if (ext === "pdf") {

//     contenidoHTML = `

//      <div class="row">

//        <div class="col s12 l12" >

//           <object data="Archivos/Capacitaciones/${Capacitacion}/${archivo}" type="application/pdf"  alt="" style="width: 100%; height: 70vh;"></object>

//        </div>

//      </div>

//    `;

//   } else if (ext === "mp4") {

//   } else if (ext === "pptx" || ext === "ppt") {

//     contenidoHTML = `

//      <div class="row">

//        <div class="col s12 l12"  style="cursor: pointer">

//         <a href="Archivos/Capacitaciones/${Capacitacion}/${archivo}" target="_blank"><img id="filePreview" src="assets/images/PPTicon.png"  style="height: 100%;"></a>

//        </div>

//      </div>

//    `;

//   } else if (ext === "png" || ext === "jpg") {

//     contenidoHTML = `

//      <div class="row">

//        <div class="col s12 l12">

//             <img  src="Archivos/Capacitaciones/${Capacitacion}/${archivo}" style="width: 100%;padding:1em ;">

//        </div>

//      </div>

//    `;

//   }



//   alertify

//     .confirm(

//       "¿Desea eliminar el siguiente archivo?",

//       contenidoHTML,

//       async function () {

//         let datos = await {

//           op: "eliminarArchivoCapacitacionSelected",

//           idCapacitacion: IdCap,

//           Archivo: archivo,

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

//             alertify.success("Archivo eliminado con éxito.");

//             getArchivosActualesCapacitacion();

//           }

//         }

//       },

//       async function () {

//         alertify.error("Cancelado");

//       }

//     )

//     .set("maximizable", true)

//     .set("labels", { ok: "Eliminar!", cancel: "Cancelar!" });

// }



async function eliminarArchivoCapacitacionSelected(idArchivo) {

  Swal.fire({

    title: "¿Desea eliminar este archivo?",

    text: "Esta acción no se puede deshacer.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    confirmButtonText: "Eliminar",

    cancelButtonText: "Cancelar",

    focusConfirm: false,

  }).then(async (result) => {

    if (result.isConfirmed) {

      let datos = {

        op: "eliminarArchivoCapacitacionSelected",

        idArchivo: idArchivo,

      };

      let respuesta = "";

      try {

        respuesta = await $.ajax({

          type: "post",

          url: "Backend/Capacitacion/App.php",

          data: datos,

        });

      } catch (e) {

        console.log(e);

      } finally {

        if (respuesta == "1") {

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Archivo eliminado con éxito.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          getArchivosActualesCapacitacion();

        }

      }

    } else {

      const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Cancelado.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    }

  });

}



$("#btnAgregar").click(async function () {

  if (document.getElementById("FormCapacitacion").checkValidity()) {

    event.preventDefault();

    $.blockUI({ message: null });

    let NoEmpleados = "";

    if (ArrayContenidoEmpleados.length < 1) {

      // toastr.info("Seleccione al menos un empleado.");

      const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Seleccione al menos un empleado.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

      return false;

    } else {

      ArrayContenidoEmpleados.forEach((empleados) => {

        NoEmpleados = NoEmpleados += `${empleados.NoEmpleado},`;

      });

    }

    if (existeFichero) {

      inputGlobal.type = "text";

      inputGlobal.value = archivoGlobal;

    }

    let form = $("#FormCapacitacion")[0];

    let data = new FormData(form);

    data.append("op", "UpdateCapacitacion");

    data.append("dias", DiasCalendario);

    data.append("tipoCapacitacion", globalTipoCap);

    data.append("NoEmpleado", NoEmpleados);

    data.append("idCapacitacion", IdCap);

    //data.append("tipo",tipo="t.i.p.o");

    data.append("existeFichero", existeFichero);

    for (let index = 0; index < arrayFiles.length; index++) {

      data.append("ArrArchivos[]", arrayFiles[index]);

      console.log(arrayFiles[index]);

    }

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

          // toastr.success("Capacitacion Actualizada");

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Capacitacion actualizada.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          setTimeout(function () {

            window.location.href = `Capacitacion.php`;

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

              <span class="alert-text">Faltan datos por ingresar.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

});

// ============================================================
// Wizard de capacitación (edición)
// ============================================================
let currentStep = 1;
const totalSteps = 3;

function goToStep(step) {
  if (step < 1 || step > totalSteps) return;

  if (step > currentStep && !validateStep(currentStep)) return;

  currentStep = step;

  $(".wizard-step-content").removeClass("active");
  $(`#step-${currentStep}`).addClass("active");

  $(".step").removeClass("active completed");
  $(".step").each(function () {
    const stepNum = parseInt($(this).data("step"));
    if (stepNum < currentStep) {
      $(this).addClass("completed");
    } else if (stepNum === currentStep) {
      $(this).addClass("active");
    }
  });

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  $("#stepperProgress").css("width", progress + "%");

  $("#btnPrev").css("visibility", currentStep === 1 ? "hidden" : "visible");
  if (currentStep === totalSteps) {
    $("#btnNext").hide();
    $("#btnAgregar").show();
  } else {
    $("#btnNext").show();
    $("#btnAgregar").hide();
  }

  $("html, body").animate({ scrollTop: $("#stepper").offset().top - 100 }, 200);
}

function validateStep(step) {
  let valid = true;
  let message = "";

  if (step === 1) {
    const tipo = $("#tipoCapacitacion").val();
    if (!tipo) {
      valid = false;
      message = "Selecciona el tipo de capacitación.";
    } else {
      const desc = $("#Desc").val().trim();
      const fechaInicio = $("#fechaInicio").val();
      const fechaFin = $("#fechaFin").val();

      if (!desc || !fechaInicio || !fechaFin) {
        valid = false;
        message = "Completa la descripción y las fechas.";
      } else if (tipo === "DIA") {
        const horaInicio = $("#HoraInicio").val();
        const horaFin = $("#HoraFin").val();
        if (!horaInicio || !horaFin) {
          valid = false;
          message = "Completa el horario para capacitaciones por días.";
        } else if (DiasCalendario.length === 0) {
          valid = false;
          message = "Selecciona al menos un día de la semana.";
        }
      }
    }
  } else if (step === 2) {
    if (ArrayContenidoEmpleados.length < 1) {
      valid = false;
      message = "Selecciona al menos un empleado.";
    }
  }

  if (!valid) {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Información!</span>
        <span class="alert-text">${message}</span>
      </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }

  return valid;
}

$("#btnNext").click(function () {
  goToStep(currentStep + 1);
});

$("#btnPrev").click(function () {
  goToStep(currentStep - 1);
});

$(".step").click(function () {
  const targetStep = parseInt($(this).data("step"));
  if (targetStep < currentStep || validateStep(currentStep)) {
    goToStep(targetStep);
  }
});

