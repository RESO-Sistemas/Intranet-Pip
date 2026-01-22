const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Feed = urlParams.get('Feed');
getDetalleFeed();
getArchivosActualesFeed();

async function getDetalleFeed () {
  let datos = await {
      op: "getDetalleFeed",
      idFeed: Feed
    };
    let respuesta = [];
    try {
          respuesta = await $.ajax({
            type: "post",
            url: "Backend/Feed/App.php",
            data: datos,
            dataType: "json",
          });
    } catch (e) {
      console.log(e);
    } finally {
      $("#txtTitulo").val(respuesta["Titulo"]);
      $("#txtDescripcion").val(respuesta["Descripcion"]);
      $("#txtHV").val(respuesta["Hipervinculo"]);
    }
}
async function getArchivosActualesFeed() {
  let datos = await {
    op: "getArchivosActualesFeed",
    idFeed: Feed
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Feed/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(respuesta);
    $("#contenidoArchivos").html("");
    if (respuesta.length < 1) {
      $("#contenidoArchivos").append(`
          <div class="col s12 l12" style="text-align:center">
              <h5>El Feed no cuenta con archivos agregados.</h5>
          </div>
        `);
    } else {
      let IdFeed = atob(Feed);
      let arrArchivos = respuesta[0]["Archivo"].split(',');
      let ContenidoHTMLArchivos = "";
      arrArchivos.forEach(contenidoArchivos => {
        let ext = obtenerExtension(contenidoArchivos);
        if (ext === "pdf") {
          ContenidoHTMLArchivos+= `<div class="col s6 l4" style="text-align:center;">
                                      <div class="row">
                                        <div class="col s12 l12" style="height:15vh">
                                            <object data="Archivos/Feed/${IdFeed}/${contenidoArchivos}" type="application/pdf" id="filePreview" alt="" style="height: 100%; width:100%"></object>
                                        </div>
                                        <div class="col s12 l4 offset-l4" style="text-align:center">
                                          <button class="btnEliminar1" onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')"><span class="text"><i class="fal fa-trash-alt"></i></span></button>
                                        </div>
                                      </div>
                                    </div>`
        }
        if (ext === "mp4") {
          ContenidoHTMLArchivos+= `<div class="col s6 l4" style="">
          <video id="filePreview" mute="true" controls style="width:30%; border-right: gray 1px solid" allowfullscreen>
                  <source src="Archivos/Feed/${IdFeed}/${contenidoArchivos}"  type="video/mp4" />
                  </video>
                  <br><a href="Archivos/Feed/${IdFeed}/${contenidoArchivos}" target="_blank" >Abrir Archivo</a>
          </div>`
        }
        if (ext === "pptx" || ext === "ppt") {
          ContenidoHTMLArchivos+= `<div class="col s6 l4" style="text-align:center;">
                                      <div class="row">
                                        <div class="col s12 l12">
                                          <img id="filePreview" src="Archivos/Feed/${IdFeed}/${contenidoArchivos}" style="width: 50%;">
                                        <div>
                                        <div class="col s12 l4 offset-l4" style="text-align:center">
                                            <button class="btnEliminar1" onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')"><span class="text"><i class="fal fa-trash-alt"></i></span></button>
                                        </div>
                                    </div>`
        }
        if (ext === "png" || ext === "jpg") {
          ContenidoHTMLArchivos+= `<div class="col s6 l4"style="text-align:center;">
                                      <div class="row">
                                          <div class="col s12 l12" style="height:15vh; padding:2vh">
                                              <img id="filePreview" src="Archivos/Feed/${IdFeed}/${contenidoArchivos}" style="height: 100%;">
                                          </div>
                                          <div class="col s4 offset-s4 l4 offset-l4" style="text-align:center">
                                                <button class="btnEliminar1" onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')"><span class="text"><i class="fal fa-trash-alt"></i></span></button>
                                          </div>
                                      </div>
                                    </div>`
        }
      });
      $("#contenidoArchivos").append(ContenidoHTMLArchivos);
    }
  }
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
      if (tamaño <= 5e+6) {
        // if (tipo=="image/png" || tipo=="image/jpg" || tipo=="image/jpeg") {
        if (tipo=="image/png" || tipo=="image/jpg" || tipo=="image/jpeg" || tipo== "application/pdf") {
          arrayFiles.push(files[i]);
        }
        else{
          toastr.info(`El archivo: ${files[i]["name"]} no puede agregarse, verifique que sea unicamente formato PNG, JPG ó JPEG y que el tamaño sea menor a 3MB.`);

        }
      }
      else{
          toastr.info(`El archivo es demasiado pesado, el tamaño maximo aceptado es: 5MB`);
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

function obtenerExtension(filename) {
  if (!filename) {
    return ;
  }
  return filename.split('.').pop();
}

async function eliminarArchivoFeedSelected(archivo) {
  let ext = obtenerExtension(archivo);
  let contenidoHTML = "";
  let IdFeed = atob(Feed);
  if (ext === "pdf") {
    contenidoHTML = `
     <div class="row">
       <div class="col s12 l12" >
          <object data="Archivos/Feed/${IdFeed}/${archivo}" type="application/pdf"  alt="" style="width: 100%; height: 70vh;"></object>
       </div>
     </div>
   `;
  } else if (ext === "mp4") {

  } else if (ext === "pptx" || ext === "ppt") {

  } else if (ext === "png" || ext === "jpg") {
    contenidoHTML = `
     <div class="row">
       <div class="col s12 l12">
            <img  src="Archivos/Feed/${IdFeed}/${archivo}" style="width: 100%;padding:1em ;">
       </div>
     </div>
   `;
  }

  alertify.confirm('¿Desea eliminar el siguiente archivo?', contenidoHTML, async function(){
    let datos = await {
      op: "eliminarArchivoFeedSelected",
      idFeed: Feed,
      Archivo: archivo
    };
    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Feed/App.php",
        data: datos,
      });
    } catch (e) {
      console.log(e);
    } finally {
      if (respuesta == "1") {
        alertify.success('Archivo eliminado con éxito.');
        getArchivosActualesFeed();
      }
    }
  }, async function(){
    alertify.error('Cancelado')
  }).set('maximizable', true).set('labels', {ok:'Eliminar!', cancel:'Cancelar!'});
}





async function eliminarArchivoCapacitacionSelected(archivo) {
  let ext = obtenerExtension(archivo);
  let contenidoHTML = "";
  let Capacitacion = atob(IdCap);
  if (ext === "pdf") {
    contenidoHTML = `
     <div class="row">
       <div class="col s12 l12" >
          <object data="Archivos/Capacitaciones/${Capacitacion}/${archivo}" type="application/pdf"  alt="" style="width: 100%; height: 70vh;"></object>
       </div>
     </div>
   `;
  } else if (ext === "mp4") {

  } else if (ext === "pptx" || ext === "ppt") {

  } else if (ext === "png" || ext === "jpg") {
    contenidoHTML = `
     <div class="row">
       <div class="col s12 l12">
            <img  src="Archivos/Capacitaciones/${Capacitacion}/${archivo}" style="width: 100%;padding:1em ;">
       </div>
     </div>
   `;
  }
  alertify.confirm('¿Desea eliminar el siguiente archivo?', contenidoHTML, async function(){
    let datos = await {
      op: "eliminarArchivoCapacitacionSelected",
      idCapacitacion: IdCap,
      Archivo: archivo
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
        alertify.success('Archivo eliminado con éxito.');
        getArchivosActualesCapacitacion();
      }
    }
  }, async function(){
    alertify.error('Cancelado')
  }).set('maximizable', true).set('labels', {ok:'Eliminar!', cancel:'Cancelar!'});
}




$("#btnUpdateFeed").click(async function () {
  if (document.getElementById("UpdateFeed").checkValidity()) {
    event.preventDefault();
    $.blockUI({ message: null });
    let form = $("#UpdateFeed")[0];
    let data = new FormData(form);
    data.append("op", "UpdateFeed");
    data.append("idFeed", Feed);
    for (let index = 0; index < arrayFiles.length; index++) {
        data.append("ArrArchivos[]",arrayFiles[index]);
        console.log(arrayFiles[index]);
    }
    $.ajax({
      type: "POST",
      url: "Backend/Feed/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        console.log([...data]);
        if (response == "1") {
          toastr.success("Feed Actualizado");

          setTimeout(function () {
            window.location.href = `ListadoFeed.php`;
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
