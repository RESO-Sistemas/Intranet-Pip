ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=')

loadInitialFunctions();
async function loadInitialFunctions(){
  getPostRequests();
}

async function getPostRequests(){
  let dataSend = {
    op: "getPostRequests"
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend);
  if (ajaxR !== undefined) {
    printPostRequests(ajaxR.Data);
  }
}

function printPostRequests(data){
  console.log(data);
  let cantPost = data.length;
  let contentFinalHtml = "";
  if (cantPost > 0){
    for (var i = 0; i < cantPost; i++) {
      let files = data[i]["Archivo"].split(',');
      let countFiles = files.length;
      let contentHtmlFiles = "";
      if (countFiles > 0) {
        for (var ii = 0; ii < countFiles; ii++) {
          contentHtmlFiles += `
          <img alt="Image 1 Title" src="Archivos/Feed/${atob(data[i]["idFeed"])}/${files[ii]}"
            data-image="Archivos/Feed/${atob(data[i]["idFeed"])}/${files[ii]}"
            data-description="No.${ii + 1}">
          `;
        }
      }
      let contentImg = "";
      contentFinalHtml += `
      <li id="feedLi${atob(data[i]["idFeed"])}">
        <div class="collapsible-header"><i class="material-icons">blur_on</i>
          <b>${data[i]["Empleado"]} </b> - ${data[i]["Registro"]}
        </div>
        <div class="collapsible-body">
          <div class="card-content">
            <div class="row">
              <div class="col s12 m5">
                <div class="clPost" id="post${i}">${contentHtmlFiles}</div>
              </div>
              <div class="col s12 m7">
                <div class="row">
                  <div class=" col s2 m2 offset-m10">
                    <div class="e-btn-group"></div>
                    <button class="btn-actionGreen" onclick="actionPost('${data[i]["idFeed"]}', 1)"><i class="fas fa-check"></i></button>
                    <button class="btn-actionRed" onclick="actionPost('${data[i]["idFeed"]}', 2)"><i class="fas fa-ban"></i></button>
                  </div>
                </div>
                <h4 class="box-title m-t-10">${data[i]["Titulo"]}</h4>
                <p class="m-b-0 m-t-10">${data[i]["Descripcion"]}</p>
                ${!!data[i]["Hipervinculo"] ? `<a href="${data[i]["Hipervinculo"]}" target="_blank">${data[i]["Hipervinculo"]}</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      </li>
      `;
    }
  } else {

  }
  $("#contentPost").append(contentFinalHtml);

  let allFeeds = document.querySelectorAll('.clPost');
  if (allFeeds.length > 0) {
    allFeeds.forEach( f => {
      $(f).unitegallery({
        theme_enable_text_panel: false,
        gallery_skin: "alexis",
        slider_scale_mode: "fit",
        slider_transition: "fade",
        thumb_overlay_color: "#363636",
        strippanel_background_color:"#000c1f",
      });
    });
  }
  $('.collapsible').collapsible();
}

async function actionPost(post, action){
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

async function executeActionPostRequest(post, action){
  let dataSend = {
    op: "executeActionPostRequest",
    post: post,
    action: action
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR !== undefined) {
    let dv = document.getElementById(`feedLi${atob(dataSend.post)}`);
    if (dv) {
      dv.remove();
    }
  }
}
