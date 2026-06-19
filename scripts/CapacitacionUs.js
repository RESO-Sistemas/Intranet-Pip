getCapacitacionDisponibles();

const _IMG = "../assets/images/previewsFolders/ppt.png";

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

function obtenerExtension(filename) {
  if (!filename) {
    return;
  }
  return filename.split(".").pop();
}

function getArchivosCapacitacionUs(idCapacitacion) {
  return $.ajax({
    type: "post",
    url: "Backend/Capacitacion/App.php",
    data: {
      op: "getArchivosActualesCapacitacion",
      idCapacitacion: btoa(idCapacitacion)
    },
    dataType: "json"
  });
}

async function getCapacitacionDisponibles() {
  const datos = {
    op: "getCapacitacionesUsDisponibles"
  };

  try {
    const response = await $.ajax({
      type: "post",
      url: "Backend/Capacitacion/App.php",
      data: datos,
      dataType: "json"
    });

    console.log(response);
    $("#contenidoCapacitaciones").html("");

    if (!Array.isArray(response) || response.length === 0) {
      $("#contenidoCapacitaciones").append(`
        <div class="row justify-content-center">
          <div class="col-12 text-center">
            <h4 class="fw-bold mb-0">Sin capacitaciones disponibles.</h4>
          </div>
        </div>
      `);
      return;
    }

    for (const cap of response) {
      let textoFechaInicio = "";
      let DiasCapacitacion = "";

      if (cap["TipoCapacitacion"] == "PROL") {
        textoFechaInicio = `${cap["FechaInicio"]}`;
        DiasCapacitacion = "";
      } else {
        textoFechaInicio = `${cap["FechaInicio"]} de ${cap["HoraInicio"]} a ${cap["HoraFin"]}`;
        DiasCapacitacion = `Días de la Capacitación: ${cap["Dias"]}`;
      }

      let archivos = [];
      try {
        archivos = await getArchivosCapacitacionUs(cap["idCapacitacion"]);
      } catch (e) {
        console.log("Error al obtener archivos de la capacitación", e);
        archivos = [];
      }

      let ContenidoHTMLArchivos = "";
      if (Array.isArray(archivos) && archivos.length > 0) {
        archivos.forEach((archivo) => {
          const ext = (archivo.extension || "").toLowerCase();
          const url = `Backend/Capacitacion/App.php?op=getArchivoCapacitacion&idArchivo=${archivo.id}`;
          const downloadUrl = `${url}&download=1`;

          if (ext === "pdf") {
            ContenidoHTMLArchivos += `
              <div class="col-md-6 mb-3">
                <div class="card h-100">
                  <iframe src="${url}" class="w-100" style="height: 200px; border:0;"></iframe>
                  <div class="card-body text-center">
                    <a href="${downloadUrl}" target="_blank" class="btn btn-outline-primary btn-sm">Descargar PDF</a>
                  </div>
                </div>
              </div>
            `;
          } else if (["png", "jpg", "jpeg", "gif", "webp", "bmp"].includes(ext)) {
            ContenidoHTMLArchivos += `
              <div class="col-md-6 mb-3">
                <div class="card h-100">
                  <img src="${url}" class="card-img-top" style="object-fit:cover; height: 200px;">
                  <div class="card-body text-center">
                    <a href="${downloadUrl}" target="_blank" class="btn btn-outline-primary btn-sm">Descargar Imagen</a>
                  </div>
                </div>
              </div>
            `;
          } else if (ext === "mp4") {
            ContenidoHTMLArchivos += `
              <div class="col-md-6 mb-3">
                <div class="card h-100">
                  <video controls class="w-100" style="height: 200px;">
                    <source src="${url}" type="video/mp4">
                  </video>
                  <div class="card-body text-center">
                    <a href="${downloadUrl}" target="_blank" class="btn btn-outline-primary btn-sm">Ver Video</a>
                  </div>
                </div>
              </div>
            `;
          } else {
            // Office y otros formatos
            ContenidoHTMLArchivos += `
              <div class="col-md-4 mb-3 text-center">
                <div class="card h-100">
                  <div class="card-body d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined" style="font-size:64px; color:#6c757d;">${getFileIconClass(ext)}</span>
                  </div>
                  <div class="card-footer text-center">
                    <a href="${downloadUrl}" target="_blank" class="btn btn-outline-primary btn-sm">Descargar ${ext.toUpperCase()}</a>
                  </div>
                </div>
              </div>
            `;
          }
        });
      } else {
        ContenidoHTMLArchivos = `
          <div class="col-12 text-muted mb-3">Sin archivos adjuntos.</div>
        `;
      }

      let descripcion = cap["Descripcion"].toUpperCase();
      let body = `
        <div class="col-12">
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-bold">${descripcion}</h5>
              <p class="mb-1"><strong>Inicio:</strong> ${textoFechaInicio}</p>
              <p class="mb-1"><strong>Fin:</strong> ${cap["FechaFin"]}</p>
              ${DiasCapacitacion ? `<p class="mb-3"><strong>${DiasCapacitacion}</strong></p>` : ""}
              <div class="row g-3">
                ${ContenidoHTMLArchivos}
              </div>
            </div>
          </div>
        </div>
      `;

      $("#contenidoCapacitaciones").append(body);
    }
  } catch (e) {
    console.error(e);
    alert(e.responseText || "Error al cargar las capacitaciones.");
  }
}

function renderizarElemento(elemento, extension, objeto, id, respuesta) {
  console.log("extension->", extension);
}
