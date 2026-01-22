
const _URL= "Backend/Capacitacion/App.php";
const _IMG = "../assets/images/previewsFolders/ppt.png"
let div_view_file = $("#viewFile");
let contenedorArchivo;
let DiasCalendario = [];
let tipo = "";
let existeFichero = false;
let archivoGlobal;
let inputGlobal;
let newOp;
let modal=false;
let ind;
let globalTipoCap = "";

getCapacitaciones();
m = $("#modalNuevaCapacitacion");
cierre = $("#cerrarModal");
mo = document.getElementById('modalNuevaCapacitacion');
//console.log(",", m);

//$("#statusModal").click(()=>{
//  m.style.display = "inline";
//})


function tipoCap (val) {
    $("#detalleCapacitacion").fadeIn();
    globalTipoCap = val;
    if (val == "PROL") {
        $("#fechaInicio").val("");
        $("#fechaFin").val("");
        $("#HoraInicio").fadeOut();
        $('#HoraInicio').removeAttr("required");
        $("#textHoraInicio").fadeOut();
        $("#textHoraFin").fadeOut();
        $("#HoraInicio").val("");
        $("#HoraFin").fadeOut();
        $('#HoraFin').removeAttr("required");
        $("#HoraFin").val("");
        $("#divContenidoDias").fadeOut();
        $("#contenidoDias").html("");
        $("#divVistaPrevia").fadeIn();
        DiasCalendario = [];
    }else if(val == "DIA"){
        $("#fechaInicio").val("");
        $("#fechaFin").val("");
        $("#HoraInicio").fadeIn();
        $('#HoraInicio').prop("required",true);
        $("#textHoraInicio").fadeIn();
        $("#textHoraFin").fadeIn();
        $("#HoraInicio").val("");
        $("#HoraFin").fadeIn();
        $('#HoraFin').prop("required",true);
        $("#HoraFin").val("");
        $("#divContenidoDias").fadeIn();
        $("#contenidoDias").html("");
        $("#divVistaPrevia").fadeIn();
        DiasCalendario = [];
    }
}

$("#cerrarModal").click(()=>{
  console.log("cierre");
  mo.style.display = "none";
})

function manipularArchivos(archivoRecibido, input_file){
  datos = {
    op: "leerCarpetaArchivos"
  }
  $.ajax({
    type:"post",
    url: _URL,
    data: datos,
    dataType:"json",
    success:(ajaxResponse)=>{
      ficheros = ajaxResponse;
      existeFichero = ficheros.includes(archivoRecibido);
      if (existeFichero) {
        inputGlobal = input_file;
        archivoGlobal = archivoRecibido;
        //input_file.type = "text";
        //input_file.value = archivoRecibido;
        newOp = "addCapacitacionInputText";
      }else{
        newOp = "addCapacitacion";
        existeFichero = false;
      }
    }
  })
}

function getDiasArray(){
  $("#contenidoDias").html("");
  DiasCalendario = [];
  const diasUnicos = [];
  fechaInicio = $("#fechaInicio").val();
  fechaFin = $("#fechaFin").val();
  if (fechaInicio != "" && fechaFin != "") {
    datos = {
      op: "getFechasRango",
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    }
    $.ajax({
      type: "post",
      url: "Backend/Capacitacion/App.php",
      data: datos,
      success:function(response){
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
        }else if (diasUnicos[i] == "Monday") {
           numeroDia = "2";
        }else if (diasUnicos[i] == "Tuesday") {
           numeroDia = "3";
        }else if (diasUnicos[i] == "Wednesday") {
           numeroDia = "4";
        }else if (diasUnicos[i] == "Thursday") {
           numeroDia = "5";
        }else if (diasUnicos[i] == "Friday") {
           numeroDia = "6";
        }else if (diasUnicos[i] == "Saturday") {
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
      },error:function(e){
        alert(e.responseText);
      }
    });
  }
}

function diasSemanaSelected (dia) {
  let indice = "";
  if (DiasCalendario.includes(dia)) {
    indice = DiasCalendario.indexOf(dia);
    DiasCalendario.splice(indice,1);
  }else {
    DiasCalendario.push(dia);
  }
}

function prueba(){
  $("#Desc").val("sss");
  $("#fechaInicio").val("2022-12-12");
  $("#HoraInicio").val("10:20");
  $("#fechaFin").val("2022-12-13");
  $("#HoraFin").val("12:20");
}

$("#btnAgregar").click(function(){

  if (document.getElementById("FormCapacitacion").checkValidity()) {
    event.preventDefault();
    if (existeFichero) {
      inputGlobal.type = "text";
      inputGlobal.value = archivoGlobal;
    }
    let form = $("#FormCapacitacion")[0];
    let data = new FormData(form);
    data.append("op",newOp);
    data.append("dias",DiasCalendario);
    data.append("tipoCapacitacion",globalTipoCap);
    //data.append("tipo",tipo="t.i.p.o");
    data.append("existeFichero", existeFichero);
    $.ajax({
      type:"POST",
      url:"Backend/Capacitacion/App.php",
      data:data,
      processData:false,
      contentType:false,
      cache: false,
      timeout:600000,
      success:function(response){
          console.log([...data]);
        if (response == "1") {
          toastr.success("Capacitacion agregada");
          $.blockUI({ message: null });

          setTimeout(function () {
            location.reload();
          }, 3000);
        }else if (response == "0") {
          toastr.info("Error al guardar");
        }else {
          toastr.info(response);
        }
      },error:function(e){
        alert(e.responseText);
      }
    });
  }else {
    toastr.info("Faltan datos por ingresar");
  }
});

function getArchivos(){
  let datos = {
    op:"getArchivosCapacitacion"
  }
  $.ajax({
    type:"post",
    url: _URL,
    data:datos,
    dataType:"json",
    success:(ajaxResponse)=>{
    //  console.log(ajaxResponse);
      return;
    }
  })
}

function getCapacitaciones () {
  let ArrayCapacitaciones = [];
  let datos = {
    op: "getCapacitacionDisponibles"
  }
  let tableCapacitacion = $('#tableCapacitacion').dataTable({
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Capacitacion/App.php",
      "data":datos,
      "success" : function(response){
        tableCapacitacion.fnClearTable();
        let diasCap = "";
        let horaInicio = "";
        let horaFin = "";
        for (var i = 0; i < response.length; i++) {
            let b64Capacitacion = btoa(response[i]["idCapacitacion"]);
            if (response[i]["Dias"] != "") {
                diasCap = response[i]["Dias"];
            }else {
                diasCap = "Indefinido";
            }
            if (response[i]["HoraInicio"] == "00:00:00" || response[i]["HoraFin"] == "00:00:00") {
                horaInicio = "Indefinido";
                horaFin = "Indefinido";
            }else {
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
            response[i]["Status"],
            `<button onclick="editarCapacitacion('${b64Capacitacion}')" class="btnUpdate3" style=" background-color:#D68910;"><i class="fa-light fa-pen-to-square"></i></button>`,
            `<button onclick="cancelarCapacitacion(${response[i]["idCapacitacion"]})" class="btnUpdate1" style=" background-color:#D68910;"><i class="fas fa-ban"></i></button>`,
            `<button onclick="eliminarCapacitacion(${response[i]["idCapacitacion"]},'${response[i]["Descripcion"]}')" class="btnUpdate2" style=" background-color:#D68910;"><i class="fal fa-trash-alt"></i></button>`
          ]);
        }
      },
      "complete" : function(){
          // $.unblockUI();
        }
    }
  });
}

async function eliminarCapacitacion(cap,desc){
  alertify.confirm(`¿Desea eliminar la capacitación ${desc}?`,`Si elimina la capacitación se eliminarán de forma permanente todos los registros relacionados con la capacitación.`, async function(){
    let datos = await {
      op: "deleteCapacitacion",
      idFeed: cap
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
        alertify.success(`¡Capacitación ${desc} eliminada con éxito!`);
        getCapacitaciones();
      }else {
        alertify.warning(respuesta);
      }
    }
	},async function(){

	}).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
}

async function editarCapacitacion (cap) {
    window.location.href=`UpdateCapacitacion.php?Cap=${cap}`;
}
//Inicio - Cancelar capacotación
function cancelarCapacitacion(val) {
    Swal.fire({
    title: '¿Desea cancelar la capacitacion?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar'
    }).then((result) => {
    if (result.isConfirmed) {
    let datos = {
      op: "cancelarCapacitacion",
      idCapacitacion: val
    }
    $.ajax({
      type: "post",
      url: "Backend/Capacitacion/App.php",
      data: datos,
      success:function(response){
        if (response == "1") {
          toastr.success("Capacitacion desactivada");
          setTimeout(function () {
            getCapacitaciones();
          }, 1000);
        }else {
          toastr.success("Capacitacion desactivada");
        }
      },error:function(e){

        alert(e.responseText);
      }
    });
  }else {
  }
  })
}

//Get info selects -Inicio
function getPuestos(){
  let arrId=[];
  $.ajax({
    type: "post",
    url: "Backend/Puestos/App.php",
    data: "op=getPuestos",
    success:function(response){
      response = JSON.parse(response.trim());
      response.map((res)=>{
        arrId.push(res.IdPuesto);
      });
      globalId = arrId.join(",");
      $("#slctPuestos").append(`
       <option value="${globalId}">Todas las Opciones</option>
       `);
      response.map((res)=>{
        $("#slctPuestos").append(`
          <option value='${res.IdPuesto}'>${res.Puesto}</option>
          `);
      })
    }, error:function(e){
      alert(e.responseText);
    }
  });
}
function getDivisiones(){
  let arrId=[];
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: "op=getDivisiones",
    success:function(response){
      response = JSON.parse(response.trim());
    //  console.log("Response _ ", response);
      response.map((res)=>{
        arrId.push(res.IdDivision);
      });
      globalId = arrId.join(",");
      $("#slctDivision").append(`
       <option value="${globalId}">Todas las Opciones</option>
       `);
      response.map((res)=>{
        $("#slctDivision").append(`
          <option value="${res.IdDivision}">${res.Division}</option>
          `);
      })
    }, error:function(e){
      alert(e.responseText);
    }
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

function getSucursales(){
  let arrId=[];
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: "op=getSucursales",
    success:function(response){
      response = JSON.parse(response.trim());
      response.map((res)=>{
        arrId.push(res.IdSucursal);
      });
      globalId = arrId.join(",");
      $("#slctSucursal").append(`
       <option value="${globalId}">Todas las Opciones</option>
       `);
      response.map((res)=>{
        $("#slctSucursal").append(`
          <option value="${res.IdSucursal}">${res.Sucursal}</option>
          `);
      })
    }, error:function(e){
      alert(e.responseText);
    }
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

  $("#slctPuestos").click(()=>{
  })
  $("#slctDivision").click(()=>{
  })
  $("#slctSucursal").click(()=>{
  })
/*
  async function getListadoPersonal(){
    let puesto = $("#slctPuestos").val();
    let sucursal = $("#slctSucursal").val();
    let division = $("#slctDivision").val();

  } */

  $("#NuevoArchivo").click(function(){
    console.log("click 1");
    $("#ipn_archivo").val("");
      $("#ipn_archivo").click();
    });

  function previewFile(event, querySelector){

    //Recuperamos el input que desencadeno la acción
    // console.log("click 2");
    const input = event.target;
    ext = validarFile(input);
    file = input.files[0];

    if(ext == ".pdf"){
      div_view_file.html("");
      div_view_file.append(`<object data="" type="application/pdf" id="filePreview" alt="" style="width: 40%;background: black"></object>
        <h6>${file.name}</h6>`);
    }
    if(ext === ".mp4"){
      div_view_file.html("");
      div_view_file.html(`<video src="" id="filePreview" mute="true" controls style="width:60%; border-right: gray 1px solid" allowfullscreen>
              <source src="" type="video/mp4" />
              </video>
              <h6>${file.name}</h6>`);
    }
    if(ext === ".pptx" || ext === ".ppt"){
      div_view_file.html("");
      div_view_file.html(`<img id="filePreview" style="width: 50%;padding:1em ; background: #df040ba4">
      <h6>${file.name}</h6>`);
    }
    //Recuperamos la etiqueta img donde cargaremos la imagen
    //$imgPreview = document.querySelector(querySelector);
    $imgPreview = document.querySelector(querySelector);

    // Verificamos si existe una imagen seleccionada
    if(!input.files.length) return

    //Recuperamos el archivo subido
    file = input.files[0];
    manipularArchivos(file.name,input);
    //Creamos la url
    objectURL = URL.createObjectURL(file);

    //Modificamos el atributo src de la etiqueta img
    if(ext === ".pdf"){
        $imgPreview.data = objectURL;
    }
    if(ext === ".mp4"){
        $imgPreview.src = objectURL;
    }
    if(ext === ".pptx" || ext === ".ppt"){
        $imgPreview.src = _IMG;
    }
    console.log("img _ ", _IMG);
  }

function validarFile(all)
{
    //EXTENSIONES Y TAMANO PERMITIDO.
    var extensiones_permitidas = [".pdf", ".mp4", ".pptx", ".ppt"];
    var tamano = 4; // EXPRESADO EN MB.
    var rutayarchivo = all.value;
    var ultimo_punto = all.value.lastIndexOf(".");
    var extension = rutayarchivo.slice(ultimo_punto, rutayarchivo.length);
    if(extensiones_permitidas.indexOf(extension) == -1)
    {
        toastr.info("Extensión de archivo no valida");
        document.getElementById(all.id).value = "";
        return; // Si la extension es no válida ya no chequeo lo de abajo.
    }
    if((all.files[0].size / 200048576) > tamano)
    {
        alert("El archivo no puede superar los "+tamano+"GB");
        document.getElementById(all.id).value = "";
        return;
    }
    return extension;
}

function getFileExtension2(filename) {
  return filename.split('.').pop();
}
