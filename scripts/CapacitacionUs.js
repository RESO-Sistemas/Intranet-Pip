getCapacitacionDisponibles();
let globalId;
const _IMG = "../assets/images/previewsFolders/ppt.png";
function getCapacitacionDisponibles() {
  datos = {
    op: "getCapacitacionesUsDisponibles",
  };
  $.ajax({
    type: "post",
    url: "Backend/Capacitacion/App.php",
    data: datos,
    success: function (response) {
      response = JSON.parse(response.trim());
      console.log(response);
      let textoFechaInicio = "";
      let textInicioCapacitacion = "";
      let DiasCapacitacion = "";
      if (response.length > 0) {
        for (var i = 0; i < response.length; i++) {
          let arrArchivos = [];
          if (response[i]["Archivo"] !== null && response[i]["Archivo"] != "") {
            arrArchivos = response[i]["Archivo"].split(",");
          }
          if (response[i]["TipoCapacitacion"] == "PROL") {
            textInicioCapacitacion = `${response[i]["FechaInicio"]}`;
            DiasCapacitacion = "";
          } else {
            textInicioCapacitacion = `${response[i]["FechaInicio"]} de ${response[i]["HoraInicio"]} a ${response[i]["HoraFin"]}`;
            DiasCapacitacion = `Dias de la Capacitacion: ${response[i]["Dias"]}`;
          }
          //let urlFile = `/Archivos/Capacitaciones/${response[i]["Archivo"]}`;
          let ext = obtenerExtension(response[i]["Archivo"]);
          let ContenidoHTMLArchivos = "";
          arrArchivos.forEach((contenidoArchivos) => {
            let ext = obtenerExtension(contenidoArchivos);
            if (ext === "pdf") {
              ContenidoHTMLArchivos += `
  <div class="col-md-6">
    <div class="card h-100">
      <object data="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" type="application/pdf" class="w-100" style="height: 200px;"></object>
      <div class="card-body text-center">
        <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" class="btn btn-outline-primary btn-sm">Descargar PDF</a>
      </div>
    </div>
  </div>
`;
            }
            if (ext === "mp4") {
              ContenidoHTMLArchivos += `
  <div class="col-md-6">
    <div class="card h-100">
      <video controls class="w-100" style="height: 200px;">
        <source src="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" type="video/mp4">
      </video>
      <div class="card-body text-center">
        <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" class="btn btn-outline-primary btn-sm">Ver Video</a>
      </div>
    </div>
  </div>
`;
            }
            if (ext === "pptx" || ext === "ppt") {
              ContenidoHTMLArchivos += `
  <div class="col-md-4 text-center">
    <div class="card h-100">
      <img src="assets/images/PPTicon.png" class="card-img-top p-3" style="height:150px; object-fit:contain;">
      <div class="card-body text-center">
        <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" class="btn btn-outline-primary btn-sm">Descargar PPT</a>
      </div>
    </div>
  </div>
`;
            }
            if (ext === "png" || ext === "jpg") {
              ContenidoHTMLArchivos += `
  <div class="col-md-6">
    <div class="card h-100">
      <img src="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" class="card-img-top" style="object-fit:cover; height: 200px;">
      <div class="card-body text-center">
        <a href="Archivos/Capacitaciones/${response[i]["idCapacitacion"]}/${contenidoArchivos}" target="_blank" class="btn btn-outline-primary btn-sm">Descargar Imagen</a>
      </div>
    </div>
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
  <div class="col-12">
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-titl fw-bold">${descripcion}</h5>
        <p class="mb-1"><strong>Inicio:</strong> ${textInicioCapacitacion}</p>
        <p class="mb-1"><strong>Fin:</strong> ${response[i]["FechaFin"]}</p>
        ${
          DiasCapacitacion
            ? `<p class="mb-3"><strong>Días:</strong> ${response[i]["Dias"]}</p>`
            : ""
        }

        <div class="row g-3">
          ${ContenidoHTMLArchivos}
        </div>
      </div>
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
<div class="row justify-content-center">
  <div class="col-12 text-center">
    <h4 class="fw-bold mb-0">Sin capacitaciones disponibles.</h4>
  </div>
</div>

        `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function renderizarElemento(elemento, extension, objeto, id, respuesta) {
  //hacer for
  console.log("extension->", extension);
}

function obtenerExtension(filename) {
  if (!filename) {
    return;
  }
  return filename.split(".").pop();
}
