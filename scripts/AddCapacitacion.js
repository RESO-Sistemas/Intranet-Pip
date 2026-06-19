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

let RegistrosFiltro = [];

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

// Ocultar preloader cuando todo esté listo
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

//getPuestos();

//getSucursales();

getDivisiones();

getCapacitaciones();

getArchivos();

getListadoPersonal();

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

    $("#colHoraInicio").fadeOut();

    $("#HoraInicio").removeAttr("required");

    $("#colHoraFin").fadeOut();

    $("#HoraInicio").val("");

    $("#HoraFin").removeAttr("required");

    $("#HoraFin").val("");

    $("#divContenidoDias").fadeOut();

    $("#contenidoDias").html("");

    $("#divVistaPrevia").fadeIn();

    DiasCalendario = [];

  } else if (val == "DIA") {

    $("#fechaInicio").val("");

    $("#fechaFin").val("");

    $("#colHoraInicio").fadeIn();

    $("#HoraInicio").prop("required", true);

    $("#colHoraFin").fadeIn();

    $("#HoraInicio").val("");

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

          // Traducir día al español
          nombreDiaEspanol = diasTraduccion[diasUnicos[i]] || diasUnicos[i];

          // Append de los días con diseño mejorado
          $("#contenidoDias").append(`
            <label class="day-selector" for="check${numeroDia}">
              <input class="day-checkbox" type="checkbox" id="check${numeroDia}" onclick="diasSemanaSelected(${numeroDia})">
              <span class="day-label">${nombreDiaEspanol}</span>
            </label>
          `);

        }

        // Mostrar el div de días si hay elementos
        if (diasUnicos.length > 0) {
          $("#divContenidoDias").fadeIn();
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

  console.log(DiasCalendario);

}



function prueba() {

  $("#Desc").val("sss");

  $("#fechaInicio").val("2022-12-12");

  $("#HoraInicio").val("10:20");

  $("#fechaFin").val("2022-12-13");

  $("#HoraFin").val("12:20");

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

    data.append("op", "addCapacitacion");

    data.append("dias", DiasCalendario);

    data.append("tipoCapacitacion", globalTipoCap);

    data.append("NoEmpleado", NoEmpleados);

    //data.append("tipo",tipo="t.i.p.o");

    data.append("existeFichero", existeFichero);

    if (arrayFiles.length > 0) {

      for (let index = 0; index < arrayFiles.length; index++) {

        data.append("ArrArchivos[]", arrayFiles[index]);

      }

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

        console.log("=== RESPUESTA DEL BACKEND ===");
        console.log("Response:", response);
        console.log("Response type:", typeof response);
        console.log("FormData enviada:", [...data]);

        if (response == "1") {

          // toastr.success("Capacitacion agregada");

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Capacitacion agregada.</span>

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

  let ArrayCapacitaciones = [];

  let datos = {

    op: "getCapacitacionDisponibles",

  };

  let tableCapacitacion = $("#tableCapacitacion").dataTable({

    destroy: true,

    ajax: {

      type: "POST",

      url: "Backend/Capacitacion/App.php",

      data: datos,

      success: function (response) {

        tableCapacitacion.fnClearTable();

        let diasCap = "";

        let horaInicio = "";

        let horaFin = "";

        for (var i = 0; i < response.length; i++) {

          if (response[i]["Dias"] != "") {

            diasCap = response[i]["Dias"];

          } else {

            diasCap = "Indefinido";

          }

          if (

            response[i]["HoraInicio"] == "00:00:00" ||

            response[i]["HoraFin"] == "00:00:00"

          ) {

            horaInicio = "Indefinido";

            horaFin = "Indefinido";

          } else {

            horaInicio = response[i]["HoraInicio"];

            horaFin = response[i]["HoraFin"];

          }

          tableCapacitacion.fnAddData([

            response[i]["Descripcion"],

            diasCap,

            response[i]["FechaInicio"],

            response[i]["FechaFin"],

            horaInicio,

            horaFin,

            `<button onclick="cancelarCapacitacion(${response[i]["idCapacitacion"]})" class="btn" style=" background-color:#D68910;"><i class="fas fa-ban"></i></button>`,

          ]);

        }

      },

      complete: function () {

        // $.unblockUI();

      },

    },

  });

}



//Inicio - Cancelar capacotación

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

            // toastr.success("Capacitacion desactivada");

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

            // toastr.success("Capacitacion desactivada");

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



//Get info selects -Inicio

function getPuestos() {

  $("#slctPuestos").html("");

  let arrId = [];

  let IdDivision = $("#slctDivision").val();

  let datos = {

    op: "getPuestosXDivision",

    IdDivision: IdDivision,

  };

  $.ajax({

    type: "post",

    url: "Backend/Puestos/App.php",

    data: datos,

    success: function (response) {

      response = JSON.parse(response.trim());

      $("#slctPuestos").append(`

      <option value="">Listado de Puestos</option>

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



async function onchangeDivision() {

  getPuestos();

  getSucursales();

  getListadoPersonal();

}

function getDivisiones() {

  let arrId = [];

  $.ajax({

    type: "post",

    url: "Backend/Divisiones/App.php",

    data: "op=getDivisiones",

    success: function (response) {

      response = JSON.parse(response.trim());



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

  let IdDivision = $("#slctDivision").val();

  let datos = {

    op: "getSucursalesXDivision",

    IdDivision: IdDivision,

  };

  $.ajax({

    type: "post",

    url: "Backend/Sucursal/App.php",

    data: datos,

    success: function (response) {

      response = JSON.parse(response.trim());

      $("#slctSucursal").html("");

      $("#slctSucursal").append(`

            <option value="">Listados de Sucursales / Departamentos</option>

      `);

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

  RegistrosFiltro = [];

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

    tableEmpleados.fnClearTable();

    respuesta.forEach((personal) => {

      let datos = {

        NoEmpleado: personal.NoEmpleado,

        Nombre: personal.Nombre,

        Puesto: personal.Puesto,

        Sucursal: personal.Sucursal,

        Email: personal.Email,

      };

      RegistrosFiltro.push(personal);

      tableEmpleados.fnAddData([

        personal.NoEmpleado,

        personal.Nombre,

        `<button class="btn-minimal btn-minimal-success btn-sm" role="button" onclick="SeleccionaEmpleado(${personal.NoEmpleado},'${personal.Nombre}','${personal.Puesto}',

                '${personal.Sucursal}','${personal.Email}')" title="Agregar"><span class="material-symbols-outlined">add</span></button>`,

      ]);

    });

    // console.log(RegistrosFiltro); // Comentado - array muy grande (748 elementos)

  }

}



$("#addAll").click(async function () {

  RegistrosFiltro.forEach((allRegistros) => {

    let existe = ArrayContenidoEmpleados.some((regArreglo) => {

      return regArreglo.NoEmpleado === allRegistros.NoEmpleado;

    });

    if (existe == true) {

    } else {

      let datos = {

        NoEmpleado: allRegistros.NoEmpleado,

        Nombre: allRegistros.Nombre,

        Puesto: allRegistros.Puesto,

        Sucursal: allRegistros.Sucursal,

        Email: allRegistros.Email,

      };

      ArrayContenidoEmpleados.push(datos);

    }

  });

  await loadEmpleadosSeleccionados();

});



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

//       Email: Email,

//     };

//     ArrayContenidoEmpleados.push(datos);

//     loadEmpleadosSeleccionados();

//   }

// }

let ArrayContenidoEmpleados = [];



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

      Email: Email,

    };

    ArrayContenidoEmpleados.push(datos);

    loadEmpleadosSeleccionados();

  }

}



// async function VerDetalles() {

//   let contenido = "";

//   ArrayContenidoEmpleados.forEach((empleados) => {

//     contenido += `

//             <div class="col s6 l4 elementosDetalle" style="">

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

//                                     <div class="col s12 l6" style="text-align:center;">

//                                           <h6><b>Puesto</b></h6>

//                                           <h6 style="font-size:.8em;">${empleados.Puesto}</h6>

//                                     </div>

//                                     <div class="col s12 l6" style="text-align:center;">

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

//         <div class="row" style="">

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

                  class="btn btn-sm btn-outline-danger ms-2"

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

// ============================================================
// Wizard de capacitación
// ============================================================
let currentStep = 1;
const totalSteps = 4;

function goToStep(step) {
  if (step < 1 || step > totalSteps) return;

  // Validar paso actual antes de avanzar
  if (step > currentStep && !validateStep(currentStep)) return;

  currentStep = step;

  // Actualizar pasos visuales
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

  // Actualizar barra de progreso
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  $("#stepperProgress").css("width", progress + "%");

  // Actualizar botones
  $("#btnPrev").css("visibility", currentStep === 1 ? "hidden" : "visible");
  if (currentStep === totalSteps) {
    $("#btnNext").hide();
    $("#btnAgregar").show();
    updateSummary();
  } else {
    $("#btnNext").show();
    $("#btnAgregar").hide();
  }

  // Scroll al inicio
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

function updateSummary() {
  const tipo = $("#tipoCapacitacion").val();
  const tipoText = tipo === "PROL" ? "Capacitación Prolongada" : "Por días";
  const desc = $("#Desc").val().trim();
  const fechaInicio = $("#fechaInicio").val();
  const fechaFin = $("#fechaFin").val();
  const horaInicio = $("#HoraInicio").val();
  const horaFin = $("#HoraFin").val();

  $("#summaryTipo").text(tipoText);
  $("#summaryDescripcion").text(desc || "-");
  $("#summaryPeriodo").text(`${fechaInicio} al ${fechaFin}`);

  if (tipo === "DIA") {
    $("#summaryHorarioItem").show();
    $("#summaryHorario").text(`${horaInicio} a ${horaFin}`);
    $("#summaryDiasItem").show();
    $("#summaryDias").text(DiasCalendario.length > 0 ? DiasCalendario.join(", ") : "-");
  } else {
    $("#summaryHorarioItem").hide();
    $("#summaryDiasItem").hide();
  }

  $("#summaryEmpleados").text(ArrayContenidoEmpleados.length);
  $("#summaryArchivos").text(arrayFiles.length);

  let totalSize = 0;
  arrayFiles.forEach(f => totalSize += f.size);
  $("#summaryTamano").text(formatBytes(totalSize));
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

