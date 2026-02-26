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
      toastr.info("Seleccione al menos un empleado.");
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
          data.append("ArrArchivos[]",arrayFiles[index]);
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
        console.log([...data]);
        if (response == "1") {
          toastr.success("Capacitacion agregada");

          setTimeout(function () {
            window.location.href = `Capacitacion.php`;
          }, 3000);
        } else if (response == "0") {
          toastr.info("Error al guardar");
        } else {
          toastr.info(response);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    toastr.info("Faltan datos por ingresar");
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
    confirmButtonColor: "#F7DC6F",
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
            toastr.success("Capacitacion desactivada");
            setTimeout(function () {
              getCapacitaciones();
            }, 1000);
          } else {
            toastr.success("Capacitacion desactivada");
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
    IdDivision: IdDivision
  };
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: datos,
    success: function (response) {
      response = JSON.parse(response.trim());
      $("#slctSucursal").html("")
      $("#slctSucursal").append(`
            <option value="">Listados de Sucursales / Departamentos</option>
      `)
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
      paging: false
    });
    tableEmpleados.fnClearTable();
    respuesta.forEach((personal) => {
      let datos =  {
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
        `<button class="button-1" role="button" onclick="SeleccionaEmpleado(${personal.NoEmpleado},'${personal.Nombre}','${personal.Puesto}',
                '${personal.Sucursal}','${personal.Email}')"><i class="fa-solid fa-arrow-right"></i></button>`,
      ]);
    });
    console.log(RegistrosFiltro);
  }
}

$("#addAll").click(async function (){
  RegistrosFiltro.forEach( allRegistros => {
    let existe = ArrayContenidoEmpleados.some((regArreglo) => {
      return regArreglo.NoEmpleado === allRegistros.NoEmpleado;
    });
    if (existe == true) {
    }else {
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

let ArrayContenidoEmpleados = [];
async function SeleccionaEmpleado(NoEmpleado, Nombre, Puesto, Sucursal, Email) {
  let existe = ArrayContenidoEmpleados.some((regArreglo) => {
    return regArreglo.NoEmpleado === NoEmpleado;
  });
  if (existe == true) {
    alertify.warning("El empleado ya se encuentra seleccionado.");
  } else {
    let datos = await {
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

async function VerDetalles() {
  let contenido = "";
  ArrayContenidoEmpleados.forEach((empleados) => {
    contenido += `
            <div class="col s6 l4 elementosDetalle" style="">
                <div class="row">
                   <div class="col s10 l10">
                        <div class="row">
                            <div class="col s12 l12" style="text-align:center">
                                <h6><b>Empleado</b></h6>
                            </div>
                            <div class="col s12 l12" style="text-align:center">
                                <h6 style="font-size:.8em;">${empleados.Nombre}</h6>
                            </div>
                            <div class="col s12 l12">
                                <div class="row">
                                    <div class="col s12 l6" style="text-align:center;">
                                          <h6><b>Puesto</b></h6>
                                          <h6 style="font-size:.8em;">${empleados.Puesto}</h6>
                                    </div>
                                    <div class="col s12 l6" style="text-align:center;">
                                          <h6><b>Sucursal</b></h6>
                                          <h6 style="font-size:.8em;">${empleados.Sucursal}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s2 l2">
                           <button id="selected${empleados.NoEmpleado}" style="border-radius:15px; border:0px" onclick="deleteEmpleadoSelectedDetalle(${empleados.NoEmpleado})"><i class="fa-light fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
  });
  alertify
    .alert(
      "Empleados Seleccionados",
      `
        <div class="row" style="">
             ${contenido}
        </div>
    `
    )
    .maximize();
}

async function loadEmpleadosSeleccionados() {
  $("#contenidoEmpleadosSelected").html("");
  ArrayContenidoEmpleados.forEach((empleados) => {
    $("#contenidoEmpleadosSelected").append(`
            <div class="col s6 l6 elementosSelected" style="">
                <div class="row">
                   <div class="col s10 l10">
                        <div class="row">
                            <div class="col s12 l12">
                                <h6><b>Empleado</b></h6>
                            </div>
                            <div class="col s12 l12">
                                <h6 style="font-size:.8em;">${empleados.Nombre}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col s2 l2">
                         <button id="selected${empleados.NoEmpleado}" style="border-radius:15px; border:0px" onclick="deleteEmpleadoSelected(${empleados.NoEmpleado})"><i class="fa-light fa-trash"></i></button>
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
    toastr.info("Extensión de archivo no valida");
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



$("#btnStandards").click(function(e){
  $("#standard_filess").click();
});

let arrayFiles = [];

(function(){
  "use strict";
  var dropZone = $('#dropzones')[0];
  var startUpload = function(files){
    var tipo;
    var tamaño;
    for (var i = 0; i < files.length; i++) {
      tipo = files[i]["type"];
      tamaño = files[i]["size"];
      if (tamaño <= 1.5e+7) {
        // if (tipo=="image/png" || tipo=="image/jpg" || tipo=="image/jpeg") {
        if (tipo=="image/png" || tipo=="image/jpg" || tipo=="image/jpeg" || tipo== "application/pdf" || tipo == "application/vnd.ms-powerpoint") {
          arrayFiles.push(files[i]);
        }
        else{
          toastr.info(`El archivo: ${files[i]["name"]} no puede agregarse, verifique que sea unicamente formato PDF, PPT,PNG, JPG ó JPEG y que el tamaño sea menor a 15MB.`);

        }
      }
      else{
          toastr.info(`El archivo es demasiado pesado, el tamaño maximo aceptado es: 15MB`);
      }
    }
    ImagenesDrop();
    console.log(arrayFiles);
  };

  var standardUpload = $("#standard_filess");
  standardUpload.change(function(e){
    var standardFiles = $("#standard_filess").prop('files');
    startUpload(standardFiles);
  });
  dropZone.ondrop = function(e){
    e.preventDefault();
    this.className = 'upload_drops';
    startUpload(e.dataTransfer.files);
  };
  dropZone.ondragover = function(){
    this.className = 'upload_drops drop';
    return false;
  };
  dropZone.ondragleave = function(){
    this.className = 'upload_drops';
  };
}());

function ver(files,cont){
  console.log(files);
  var reader = new FileReader();
  let extension = files.name.split('.').pop();
  if (extension == "pdf") {
    reader.onload = function(){
      $("#preview"+cont).attr("src","assets/images/PDFIcon.png");
    }
  } else if (extension == "ppt") {
    reader.onload = function(){
      $("#preview"+cont).attr("src","assets/images/PPTicon.png");
    }
  } else {
    reader.onload = function(){
      $("#preview"+cont).attr("src",reader.result);
    }
  }

  reader.readAsDataURL(files);
}

function ImagenesDrop(){
  mostarchivoss = '';
  cont=0;
  $.each(arrayFiles,function(index,arrfiles){
    let extension = arrfiles.name.split('.').pop();
    if (extension == "pdf") {
      mostarchivoss+=  `<div class="mostArchivo col-md-4">
                            <img class="im" id="preview${cont}"  width="50" height="50" title = "${arrfiles["name"]}">
                            <br>
                            <h6>${arrfiles['name']}</h6>
                            <a id="btn" class="quitar" onclick="RemoverArchivo('${arrfiles['name']}');" data-toggle="tooltip" title="Quitar archivo">
                                <i class="fal fa-trash-alt"></i>
                            </a>
                        </div><div class="mostt"></div>`;
    } else if (extension == "ppt") {
      mostarchivoss+=  `<div class="mostArchivo col-md-4">
                            <img class="im" id="preview${cont}"  width="50" height="50" title = "${arrfiles["name"]}">
                            <br>
                            <h6>${arrfiles['name']}</h6>
                            <a id="btn" class="quitar" onclick="RemoverArchivo('${arrfiles['name']}');" data-toggle="tooltip" title="Quitar archivo">
                              <i class="fal fa-trash-alt"></i>
                            </a>
                        </div><div class="mostt"></div>`;
    } else {
      mostarchivoss+=  `<div class="mostArchivo col-md-2">
                          <img class="im" id="preview${cont}" width="50" height="50" title = "${arrfiles["name"]}">
                          <br>
                          <a id="btn" class="quitar" onclick="RemoverArchivo('${arrfiles['name']}');" data-toggle="tooltip" title="Quitar archivo">
                              <i class="fal fa-trash-alt"></i>
                          </a>
                       </div><div class="mostt"></div>`;
    }


    ver(arrfiles,cont);
    cont++;
  });
  $("#ImagenesDrop").html(mostarchivoss);
}

function RemoverArchivo(archivo){
  var remover = arrayFiles.map(function(item){
    return item.name;
  }).indexOf(archivo);
  arrayFiles.splice(remover,1);
  ImagenesDrop();
}
