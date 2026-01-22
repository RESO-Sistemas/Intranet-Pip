getCapacitacionDisponibles();
let globalId;
const _IMG = "../assets/images/previewsFolders/ppt.png"
function getCapacitacionDisponibles (){
  datos = {
    op: "getCapacitacionesUsDisponibles"
  }
  $.ajax({
    type: "post",
    url: "Backend/Capacitacion/App.php",
    data: datos,
    success:function(response){
      response = JSON.parse(response.trim());
      console.log(response);
      let textoFechaInicio = "";
      let textInicioCapacitacion = "";
      let DiasCapacitacion = "";
      if (response.length > 0) {
        for (var i = 0; i < response.length; i++) {
          let arrArchivos = [];
          if (response[i]["Archivo"] !== null && response[i]["Archivo"] != "") {
             arrArchivos = response[i]["Archivo"].split(',');
          }
            if (response[i]["TipoCapacitacion"] == "PROL") {
                textInicioCapacitacion = `${response[i]["FechaInicio"]}`;
                DiasCapacitacion = "";
            }else {
                textInicioCapacitacion = `${response[i]["FechaInicio"]} de ${response[i]["HoraInicio"]} a ${response[i]["HoraFin"]}`;
                DiasCapacitacion = `Dias de la Capacitacion: ${response[i]["Dias"]}`;
            }
            //let urlFile = `/Archivos/Capacitaciones/${response[i]["Archivo"]}`;
            let ext = obtenerExtension(response[i]["Archivo"]);
            let ContenidoHTMLArchivos = "";
            arrArchivos.forEach(contenidoArchivos => {
              let ext = obtenerExtension(contenidoArchivos);
              if (ext === "pdf") {
                ContenidoHTMLArchivos+= `<div class="col s6 l6" style="text-align:center">
                                            <div class="row">
                                              <div class="col s12 l12">
                                                  <object data="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" type="application/pdf" id="filePreview" alt="" style="width: 100%; height:25vh"></object>
                                              </div>
                                              <div class="col s12 l12">
                                                <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" >Descargar</a>
                                              </div>
                                            </div>
                                          </div>`
              }
              if (ext === "mp4") {
                ContenidoHTMLArchivos+= `<div class="col s6 l4">
                <video id="filePreview" mute="true" controls style="width:30%; border-right: gray 1px solid" allowfullscreen>
                        <source src="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}"  type="video/mp4" />
                        </video>
                        <br><a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" >Abrir Archivo</a>
                </div>`;
              }
              if (ext === "pptx" || ext === "ppt") {
                ContenidoHTMLArchivos+= `<div class="col s6 l2" style="text-align:center">
                                            <div class="row">
                                              <div class="col s12 l12">
                                                  <img id="filePreview" src="assets/images/PPTicon.png"  style="width: 100%;padding:1em ;>
                                              </div>
                                              <div class="col s12 l12">
                                                <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" >Descargar</a>
                                              </div>
                                            </div>
                                          </div>`
              }
              if (ext === "png" || ext === "jpg") {
                ContenidoHTMLArchivos+= `<div class="col s6 l2"style="text-align:center">
                                            <div class="row">
                                                <div class="col s12 l12">
                                                    <img id="filePreview" src="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" style="width: 100%;padding:1em ;">
                                                </div>
                                                <div class="col s12 l12">
                                                      <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" >Descargar</a>
                                                </div>
                                            </div>
                                            <hr>
                                          </div>
                        `;
              }
              // Office.initialize = function () {
              //     var viewer = new Office.WebExtension.PowerPointDocumentViewer();
              //     viewer.host = document.getElementById("myDiv");
              //     viewer.setFileUrl("https://example.com/myfile.pptx");
              //     viewer.load();
              //   }
            });
            let descripcion = response[i]["Descripcion"].toUpperCase();
            let body = `
                <div class="row">
                  <div class="col s12 l12">
                    <p><span style="color:black" class="">${descripcion}</span></p>
                    <p><span>Inicio de Capacitacion: ${textInicioCapacitacion}<span></p>
                    <p><span>Ultimo dia de la capacitacion: ${response[i]["FechaFin"]}</span></p>
                    <p><span>${DiasCapacitacion}</span></p>
                  </div>
                  <div id="contenedor-archivo">
                    <div class="row" style="height:10vh">
                      `
                  body += `${ContenidoHTMLArchivos}
                  </div>
                </div>
              `;
              console.log(body);
            $("#contenidoCapacitaciones").append(body);
              //ele = $("#contenedor-archivo");
              //renderizarElemento(ele,ext,urlFile,id,response);
          }
      } else {
        $("#contenidoCapacitaciones").append(`
            <div class="row">
                <div class="col s12 l12" style="text-align:center">
                    <h4><b>Sin capacitaciones disponibles.</b></h4>
                </div>
            </div>
        `);
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

function renderizarElemento(elemento,extension,objeto,id,respuesta){
  //hacer for
  console.log("extension->", extension);
}

function obtenerExtension(filename) {
  if (!filename) {
    return ;
  }
  return filename.split('.').pop();
}
