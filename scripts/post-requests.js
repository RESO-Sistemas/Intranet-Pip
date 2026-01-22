ej.base.registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

loadInitialFunctions();
async function loadInitialFunctions() {
  getPostRequests();
}

async function getPostRequests() {
  let dataSend = {
    op: "getPostRequests",
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend);
  if (ajaxR !== undefined) {
    printPostRequests(ajaxR.Data);
  }
}

function printPostRequests(data) {
  console.log(data);
  let cantPost = data.length;
  let contentFinalHtml = "";

  if (cantPost > 0) {
    for (var i = 0; i < cantPost; i++) {
      let files = data[i]["Archivo"].split(",");
      let countFiles = files.length;
      let contentHtmlFiles = "";

      if (countFiles > 0) {
        for (var ii = 0; ii < countFiles; ii++) {
          contentHtmlFiles += `
            <img alt="Imagen ${ii + 1}" 
                 src="Archivos/Feed/${atob(data[i]["idFeed"])}/${files[ii]}"
                 data-image="Archivos/Feed/${atob(data[i]["idFeed"])}/${
            files[ii]
          }"
                 data-description="No.${ii + 1}" 
                 class="img-fluid rounded mb-2">
          `;
        }
      }

      contentFinalHtml += `
        <div class="accordion-item" id="feedLi${atob(data[i]["idFeed"])}">
          <h2 class="accordion-header" id="heading${i}">
            <button class="accordion-button collapsed" type="button" 
              data-bs-toggle="collapse" data-bs-target="#collapse${i}" 
              aria-expanded="false" aria-controls="collapse${i}">
              <span class="material-symbols-outlined me-2">app_badging</span>
              <b>${data[i]["Empleado"]}</b> - ${data[i]["Registro"]}
            </button>
          </h2>
          <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#contentPost">
            <div class="accordion-body">
              <div class="row">
                <!-- Columna de imágenes -->
                <div class="col-12 col-md-5">
                  <div class="clPost" id="post${i}">
                    ${contentHtmlFiles}
                  </div>
                </div>
                <!-- Columna de contenido -->
                <div class="col-12 col-md-7">
                  <div class="d-flex justify-content-end mb-2">
                    <button class="btn btn-success btn-sm me-1 d-flex align-items-center" 
                            onclick="actionPost('${data[i]["idFeed"]}', 1)">
                      <span class="material-symbols-outlined me-1">check</span>
                    </button>
                    <button class="btn btn-danger btn-sm d-flex align-items-center" 
                            onclick="actionPost('${data[i]["idFeed"]}', 2)">
                      <span class="material-symbols-outlined me-1">block</span>
                    </button>
                  </div>
                  <h4 class="mt-2">${data[i]["Titulo"]}</h4>
                  <p class="mb-2">${data[i]["Descripcion"]}</p>
                  ${
                    !!data[i]["Hipervinculo"]
                      ? `<a href="${data[i]["Hipervinculo"]}" target="_blank">${data[i]["Hipervinculo"]}</a>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Insertar contenido dentro de un acordeón de Bootstrap
  $("#contentPost").append(contentFinalHtml);

  // Reinicializar galerías
  let allFeeds = document.querySelectorAll(".clPost");
  if (allFeeds.length > 0) {
    allFeeds.forEach((f) => {
      $(f).unitegallery({
        theme_enable_text_panel: false,
        gallery_skin: "alexis",
        slider_scale_mode: "fit",
        slider_transition: "fade",
        thumb_overlay_color: "#363636",
        strippanel_background_color: "#000c1f",
      });
    });
  }
}

async function actionPost(post, action) {
  let title = "";
  let com = "";
  if (action == 1) {
    title = "¿Desea aceptar la petición de la publicación? ";
  } else {
    title = "¿Desea cancelar la petición de la publicación? ";
  }
  let resultDial = await dialogConfirmSAlert(title, com);
  if (resultDial) {
    executeActionPostRequest(post, action);
  }
}

async function executeActionPostRequest(post, action) {
  let dataSend = {
    op: "executeActionPostRequest",
    post: post,
    action: action,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR !== undefined) {
    let dv = document.getElementById(`feedLi${atob(dataSend.post)}`);
    if (dv) {
      dv.remove();
    }
  }
}
