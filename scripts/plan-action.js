const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const _planActionGB = urlParams.get('PA');

let table_progressAct = $("#table_progressAct").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
  },
  columnDefs: [
    {
      className: "dt-center",
      targets: "_all",
    },
  ],
  order: [],
  bSort: true,
  bPaginate: true,
  bFilter: true,
  bInfo: true,
});

let table_progressActView = $("#table_progressActView").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
  },
  columnDefs: [
    {
      className: "dt-center",
      targets: "_all",
    },
  ],
  order: [],
  bSort: true,
  bPaginate: true,
  bFilter: true,
  bInfo: true,
});

const dv_content_PlanAction = document.getElementById('dv_content_PlanAction'),
      m_add_objetiveSel = document.getElementById('m_add_objetiveSel'),
      new_Act_DateIni = document.getElementById('new_Act_DateIni'),
      new_Act_DateEnd = document.getElementById('new_Act_DateEnd'),
      upd_Obj_title = document.getElementById('upd_Obj_title'),
      upd_Obj_descriptions = document.getElementById('upd_Obj_descriptions'),
      m_obj_competence = document.getElementById('m_obj_competence'),
      m_obj_objetiveAct = document.getElementById('m_obj_objetiveAct'),
      inp_activity_newProgress = document.getElementById('inp_activity_newProgress'),
      inp_num_newProgress = document.getElementById('inp_num_newProgress'),
      inp_desc_newProgress = document.getElementById('inp_desc_newProgress'),
      tx_modal_act_ViewProgress = document.getElementById('tx_modal_act_ViewProgress'),
      tx_modal_desc_ViewProgress = document.getElementById('tx_modal_desc_ViewProgress'),
      tx_modal_act_addProgress = document.getElementById('tx_modal_act_addProgress'),
      tx_modal_desc_addProgress = document.getElementById('tx_modal_desc_addProgress'),
      // t_summ_retro = document.getElementById('t_summ_retro'),
      t_summ_act = document.getElementById('t_summ_act'),
      t_summ_planA = document.getElementById('t_summ_planA'),
      card_acceptActivities = document.getElementById('card_acceptActivities'),
      card_acceptProgress = document.getElementById('card_acceptProgress'),
      t_cant_act = document.getElementById('t_cant_act'),
      t_cant_actF = document.getElementById('t_cant_actF');

let gblActConfirmada, gblPlanAConfirmada, gblTypeUser;
loadInitialFunctions();
async function loadInitialFunctions(){
  await getSummaryPlanAction();
  await getInitialDetailPlanAction();
}

async function getSummaryPlanAction(){
  const dataSend = {
    op: "getSummaryPlanAction",
    evaluation: _planActionGB
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    printSummaryPlanAction(dataR);
  }
}
function printSummaryPlanAction(data){
  const cantidades = data.Cantidades;
  const resumen = data.Resumen;
  t_cant_act.textContent = cantidades.CantidadAct;
  t_cant_actF.textContent = cantidades.CantidadActTerminadas;
  if (resumen.TipoRealiza) {
      card_acceptActivities.style.display = "none";
      card_acceptProgress.style.display = "none";
  } else {
    if (resumen.StatusConfirmaActividades) {
      card_acceptActivities.style.display = "none";
      card_acceptProgress.style.display = "";
      if (resumen.StatusConfirmaPlanAccion) {
        card_acceptProgress.style.display = "none";
      }
    } else {
      card_acceptActivities.style.display = "";
      card_acceptProgress.style.display = "none";
    }
  }
  gblTypeUser = resumen.TipoRealiza;
  gblActConfirmada = resumen.StatusConfirmaActividades;
  gblPlanAConfirmada = resumen.StatusConfirmaPlanAccion;
  // t_summ_retro.textContent = data.FechaAceptaRetroalimentacion == null || data.FechaAceptaRetroalimentacion == '' ? 'No registrado' : data.FechaAceptaRetroalimentacion;
  t_summ_act.textContent = resumen.FechaConfirmaActividades == null || resumen.FechaConfirmaActividades == '' ? 'No registrado' : resumen.FechaConfirmaActividades;;
  t_summ_planA.textContent = resumen.FechaConfirmaPlanAccion == null || resumen.FechaConfirmaPlanAccion == '' ? 'No registrado' : resumen.FechaConfirmaPlanAccion;;;
}

async function getInitialDetailPlanAction(){
  const dataSend = {
    op: "getInitialDetailPlanAction",
    planAction: _planActionGB
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined){
    const dataR = ajaxR.Data;
    printInitialDetailPlanAction(dataR);
  }
}
function printInitialDetailPlanAction(data){
  let principalHTML = "";
  let principalHTMLF = "";
  for (var i = 0; i < data.length; i++) {
    let allActivities = data[i]["Activities"];
    let contentActivities = "";
    for (var j = 0; j < allActivities.length; j++) {
      let colorStatus = "";
      if (allActivities[j]["Progreso"] == 100) {
        colorStatus = "success";
      } else {
        if (allActivities[j]["FechaCaduca"] == 1) {
          colorStatus = "warning";
        } else {
          colorStatus = "info";
        }
      }
      contentActivities += `
        <div class="col s12 m6 l4" style="padding:1.5vh;">
          <div class="row card-activity">
            <div class="col s12">
              <span class="label label-${colorStatus}" id="s_status${allActivities[j]["idActividadesPlanAccion"]}">${allActivities[j]["Progreso"] == 100 ? "Realizado" : allActivities[j]["FechaCaduca"] == 1 ? 'Actividad retrasada' : "Pendiente"}</span>
              <span>Avance: <b id="advance${allActivities[j]["idActividadesPlanAccion"]}">${allActivities[j]["Progreso"]}</b>%</span>
              <p><i class="fa-regular fa-calendar" style="color:red"></i> ${allActivities[j]["FechaInicio"]} - ${allActivities[j]["FechaFin"]}</p>
              <p><h5>${allActivities[j]["Titulo"].toUpperCase()}</h5></p>
              <p><h6 style="color:#00836F"><b>Criterios de éxito</h6></b><span>${allActivities[j]["Descripcion"]}</span></p>
            </div>
            ${gblActConfirmada == 0 ? '': allActivities[j]["Progreso"] < 100 ? gblTypeUser == 1 ? `<div class="col s12" style="text-align:center">
              <div>
                  <button class="btn-addProgress" data-desc="${allActivities[j]["Descripcion"]}" data-title="${allActivities[j]["Titulo"]}" data-addprogressd="${allActivities[j]["idActividadesPlanAccion"]}"><i class="animation"></i>AGREGAR AVANCE<i class="animation"></i>
                  </button>
              </div>
            </div>` : '' : `
            <div class="col s12" style="text-align:center">
              <div>
                  <button class="btn-viewProgress" data-desc="${allActivities[j]["Descripcion"]}" data-title="${allActivities[j]["Titulo"]}" data-viewprogress="${allActivities[j]["idActividadesPlanAccion"]}"><i class="animation"></i>VER AVANCE FINAL<i class="animation"></i>
                  </button>
              </div>
            </div>`}

          </div>
        </div>
      `;
    }
    // principalHTML += `
    //   <div class="col s12">
    //     <div style="padding:1vh">
    //       <div class="row">
    //         <div class="col s2 offset-s10" style="position:relative;">
    //             <button class="btn-floating cyan right" style="position: absolute;"><i class="fa-solid fa-user-pen" data-objetivebtn="${data[i]["Principal"]["idObjetivosPlanAccion"]}"></i></button>
    //         </div>
    //         <div class="col s12" style="background-color: #05B69B;padding:2vh;">
    //           <div class="row">
    //             <div class="col s12" style="padding:1vh; background-color:#015B4D; color:#FFF;">
    //               ${data[i]["Principal"]["Competencia"]}
    //             </div>
    //             <div class="col s12">
    //               <div class="row" style="padding:1vh">
    //                 <div class="col s12">
    //                   <h4 id="obj_title_${data[i]["Principal"]["idObjetivosPlanAccion"]}" style=" color:#FFF;">${data[i]["Principal"]["Objetivo"] === null || data[i]["Principal"]["Objetivo"] == "" ? "Objetivo sin definir" : data[i]["Principal"]["Objetivo"]}</h4>
    //                 </div>
    //                 <div class="col s12">
    //                   <span id="obj_desc_${data[i]["Principal"]["idObjetivosPlanAccion"]}" style=" color:#FFF;">${data[i]["Principal"]["DescObjetivo"] === null || data[i]["Principal"]["DescObjetivo"] == "" ? "No se ha especificado una descripción del objetivo" : data[i]["Principal"]["DescObjetivo"]}</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div class="col s12" style="background-color:#BAF5EC;">
    //           <div class="row">
    //             <div class="col s12">
    //               <div class="row" id="dv_activities${data[i]["Principal"]["idObjetivosPlanAccion"]}" style="padding:1vh;">${contentActivities}</div>
    //             </div>
    //             <div class="col s12" style="text-align:center;padding:1vh;">
    //               <a style="color:#000;" class="a_addActivity" data-objetive="${data[i]["Principal"]["idObjetivosPlanAccion"]}"> + Agregar Actividad</a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </di
    // `;
    principalHTMLF += `
      <li>
        <div class="collapsible-header" style="background-color: #E54848;color:#fff;">
          <div class="row">
            <div class="col s12">
              <span><b>Competencia -</b>${data[i]["Principal"]["Competencia"]}</span>
            </div>
          </div>
        </div>
        <div class="collapsible-body card-objetive">
          <div class="row" >

            <div class="col s12">
              <ul>
                <li>
                  <div class="d-flex no-block align-items-center">
                      <div>
                          <h5 class="m-b-0">Completado</h5>
                      </div>
                      <div class="ml-auto">
                          <span class="m-b-0">${Number(data[i]["Principal"]["ProgresoObjetivo"]).toFixed(2)}%</span>
                      </div>
                  </div>
                  <div class="progress m-t-10" style="background-color: rgba(0,0,0,.1);">
                      <div class="determinate" style="width: ${Number(data[i]["Principal"]["ProgresoObjetivo"]).toFixed(2)}%"></div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col s12">
              <div class="row">
                <div class="col s1 offset-s11" style="position:relative;">
                     <button class="btn-floating cyan right" style="position: absolute;"><i class="fa-solid fa-user-pen" data-objetivebtn="${data[i]["Principal"]["idObjetivosPlanAccion"]}"></i></button>
                </div>
                <div class="col s12">
                  <h4 id="obj_title_${data[i]["Principal"]["idObjetivosPlanAccion"]}">${data[i]["Principal"]["Objetivo"] === null || data[i]["Principal"]["Objetivo"] == "" ? "Objetivo sin definir" : `<span><b>Objetivo: </b>${data[i]["Principal"]["Objetivo"]}</span>`}</h4>
                </div>
                <div class="col s12">
                  <span id="obj_desc_${data[i]["Principal"]["idObjetivosPlanAccion"]}">${data[i]["Principal"]["DescObjetivo"] === null || data[i]["Principal"]["DescObjetivo"] == "" ? "No se ha especificado una descripción del objetivo" : `<span><b>Descripción: </b>${data[i]["Principal"]["DescObjetivo"]}</span>`}</span>
                </div>
                <div class="col s12">
                  <div class="row" id="dv_activities${data[i]["Principal"]["idObjetivosPlanAccion"]}" style="padding:1vh;">${contentActivities}</div>
                </div>
                ${gblTypeUser == 1 ? gblActConfirmada == 0 ? `<div class="col s12" style="text-align:center;padding:1vh;">
                  <a style="color:#000;" class="a_addActivity" data-objetive="${data[i]["Principal"]["idObjetivosPlanAccion"]}"> + Agregar Actividad</a>
                </div>` : '' : ''}
              </div>
            </div>
          </div>
        </div>
    </li>`;
  }
  $("#dv_content_PlanActionF").append(principalHTMLF);
  // $(dv_content_PlanAction).append(principalHTML);
  $('collapsible').collapsible();
}

$(document).on("click",".a_addActivity",async function(element){
  m_add_objetiveSel.value = element.target.dataset.objetive;
  const dv = "dv_inp_modal";
  cleanVerifyInputs(dv);
  $("#modal_Activity").modal('open');
});

$(document).on("click","#btn_m_addActivity",async function(){
  const dv = "modal_Activity";
  const resultV = await verifyInputs(dv);
  if (resultV) {
    addActivityPerObjetive();
  }
});

async function addActivityPerObjetive(){
  const dataSend = {
    op: "addActivityPerObjetive",
    objetive: m_add_objetiveSel.value,
    title: quitarEspaciosExtras($("#new_Act_title").val()).trim(),
    description: quitarEspaciosExtras($("#new_Act_descriptions").val()).trim(),
    dateIni: new_Act_DateIni.value,
    dateEnd: new_Act_DateEnd.value
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    let contentNewActivity = `
      <div class="col s12 m4 l4" style="padding:1.5vh;">
        <div class="row card-activity">
          <div class="col s12">
            <span class="label label-warning">Pendiente</span>
            <span>Avance: <b id="advance${dataR.IdReturn}">0</b>%</span>
            <p><i class="fa-regular fa-calendar"style="color:red"></i>  ${dataSend.dateIni} - ${dataSend.dateEnd}</p>
            <p><h6>${dataSend.title}</h5></6>
            <p><h6 style="color:#00836F"><b>Criterios de éxito</b></h6><span>${dataSend.description}</span></p>
          </div>
          <div class="col s12" style="text-align:center">
            <div>
                <button class="btn-addProgress" data-desc="${dataSend.description}" data-title="${dataSend.title}" data-addprogressd="${dataR.IdReturn}"><i class="animation"></i>AGREGAR AVANCE<i class="animation"></i>
                </button>
            </div>
          </div>
        </div>
      </div>
    `;
    t_cant_act.textContent = (Number(t_cant_act.textContent) + 1);
    const dvAppend = document.getElementById(`dv_activities${dataSend.objetive}`);
    $(dvAppend).append(contentNewActivity);
    $("#modal_Activity").modal('close');
  }
}

$(document).on("click","[data-objetivebtn]",async function(element){
  let thisValue = element.target.dataset.objetivebtn;
  getDetailObjetivePlanAction(thisValue);
});


async function getDetailObjetivePlanAction(objetive){
  const dataSend = {
    op: "getDetailObjetivePlanAction",
    obj: objetive
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    m_obj_objetiveAct.value = dataSend.obj;
    upd_Obj_title.value = dataR.Objetivo;
    upd_Obj_descriptions.value = dataR.DescObjetivo;
    m_obj_competence.textContent = dataR.Competencia;
    $("#modal_objetive").modal('open');
  }
}

$(document).on("click","#btn_m_updObjetive",async function(){
  const dv = "modal_objetive";
  const resV = await verifyInputs(dv);
  if(resV){
    updateGenObjetivePlanAction();
  }
});

async function updateGenObjetivePlanAction(){
  const dataSend = {
    op: "updateGenObjetivePlanAction",
    objetive_id: m_obj_objetiveAct.value,
    objetive: quitarEspaciosExtras($("#upd_Obj_title").val()).trim(),
    desc: quitarEspaciosExtras($("#upd_Obj_descriptions").val()).trim(),
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const ob_title = document.getElementById(`obj_title_${dataSend.objetive_id}`);
    const ob_desc = document.getElementById(`obj_desc_${dataSend.objetive_id}`);
    ob_title.textContent = dataSend.objetive;
    ob_desc.textContent = dataSend.desc;
    $("#modal_objetive").modal('close');
  }
}

$(document).on("click",".btn-addProgress",async function(element){
  tx_modal_act_addProgress.textContent = element.target.dataset.title;
  tx_modal_desc_addProgress.textContent = element.target.dataset.desc;
  getGeneralDetailActivityPlanA(element.target.dataset.addprogressd);
});

async function getGeneralDetailActivityPlanA(activity){
  const dataSend = {
    op: "getGeneralDetailActivityPlanA",
    activity: activity,
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    inp_activity_newProgress.value = dataSend.activity;
    printGeneralDetailActivityPlan(dataR);
  }
}
function printGeneralDetailActivityPlan(data){
  table_progressAct.fnClearTable();
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      table_progressAct.fnAddData([
        data[i]["DescripcionAvance"],
        data[i]["FechaRegistro"],
        `<div class="row">
          <div class="col s12">
            <ul class="m-t-2">
                <li>
                    <div class="d-flex no-block align-items-center">
                        <div>
                            <span class="m-b-0 op-5">Completado</span>
                        </div>
                        <div class="ml-auto">
                            <span class="m-b-0">${data[i]["NuevoAvance"]}%</span>
                        </div>
                    </div>
                    <div class="progress m-t-10" style="background-color: rgba(0,0,0,.1);">
                        <div class="determinate" style="width: ${data[i]["NuevoAvance"]}%"></div>
                    </div>
                </li>
            </ul>
          </div>
        </div>`
      ])
    }
  }
  const dv = "dv_inp_newProgress";
  cleanVerifyInputs(dv);
  $("#modal-addProgress").modal("open");
}

$(document).on("click","#btn_m_addProgress",async function(){
  const dv = "dv_inp_newProgress";
  const resultInp = await verifyInputs(dv);
  if (resultInp){
    addProgressActivity();
  }
});

async function addProgressActivity(){
  const dataSend = {
    op: "addProgressActivity",
    activity: inp_activity_newProgress.value,
    newProgress: inp_num_newProgress.value,
    description: quitarEspaciosExtras($("#inp_desc_newProgress").val()).trim()
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const elementProg = document.getElementById(`advance${dataSend.activity}`);
    elementProg.textContent = dataSend.newProgress;
    if (dataSend.newProgress == "100") {
        t_cant_actF.textContent = Number(t_cant_actF.textContent + 1);
        const elementChange = document.getElementById(`s_status${dataSend.activity}`);
        elementChange.textContent = "Realizado";
        elementChange.classList.remove("label-warning");
        elementChange.classList.add("label-success");

        const oldBtn = document.querySelector(`.btn-addProgress[data-addprogressd="${dataSend.activity}"]`);
        if (oldBtn) {
          let newBtn = `
          <button class="btn-viewProgress" data-desc="${oldBtn.getAttribute('data-desc')}" data-title="${oldBtn.getAttribute('data-title')}" data-viewprogress="${dataSend.activity}">
            <i class="animation"></i>VER AVANCE FINAL<i class="animation"></i>
          </button>`;
          let newDvBtn = document.createElement('div');
          newDvBtn.innerHTML = newBtn;
          oldBtn.parentNode.replaceChild(newDvBtn, oldBtn);
        }
    }
    $("#modal-addProgress").modal("close");
  }
}

$(document).on("click",".btn-viewProgress",async function(element){
  tx_modal_act_ViewProgress.textContent = element.target.dataset.title;
  tx_modal_desc_ViewProgress.textContent = element.target.dataset.desc;
  getGeneralDetailActivityPlanAF(element.target.dataset.viewprogress);
});

async function getGeneralDetailActivityPlanAF(activity){
  const dataSend = {
    op: "getGeneralDetailActivityPlanA",
    activity: activity,
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    printGeneralDetailActivityPlanF(dataR);
  }
}
function printGeneralDetailActivityPlanF(data){
  table_progressActView.fnClearTable();
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      table_progressActView.fnAddData([
        data[i]["DescripcionAvance"],
        data[i]["FechaRegistro"],
        `<div class="row">
          <div class="col s12">
            <ul class="m-t-2">
                <li>
                    <div class="d-flex no-block align-items-center">
                        <div>
                            <span class="m-b-0 op-5">Completado</span>
                        </div>
                        <div class="ml-auto">
                            <span class="m-b-0">${data[i]["NuevoAvance"]}%</span>
                        </div>
                    </div>
                    <div class="progress m-t-10" style="background-color: rgba(0,0,0,.1);">
                        <div class="determinate" style="width: ${data[i]["NuevoAvance"]}%"></div>
                    </div>
                </li>
            </ul>
          </div>
        </div>`
      ])
    }
  }
  $("#modal_ViewProgressFinal").modal("open");
}

$(document).on("click","#acceptActivities",async function(){
  let title = "¿Desea confirmar las actividades del plan de acción actual?";
  let comm = "Una vez sean aceptadas las actividades, ya no podrán agregarse más en un futuro";
  const resultDial = await dialogConfirmAlertify(title, comm);
  if (resultDial) {
    acceptActivitiesActionPlan();
  }
});

async function acceptActivitiesActionPlan(){
  const dataSend = {
    op: "acceptActivitiesActionPlan",
    planA: _planActionGB
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    setTimeout(function () {
      location.reload();
    }, 1500);
  }
}

$(document).on("click","#btn_acceptProgress",async function(){
  let title = "¿Desea confirmar los resultados del plan de acción final?";
  let comm = "Una vez sea aceptado el plan de acción, no se podrán hacer más cambios";
  const resultDial = await dialogConfirmAlertify(title,comm);
  if (resultDial) {
    acceptProgressActionPlan();
  }
});

async function acceptProgressActionPlan(){
  const dataSend = {
    op: "acceptProgressActionPlan",
    planA: _planActionGB
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    setTimeout(function () {
      location.reload();
    }, 1500);
  }
}
