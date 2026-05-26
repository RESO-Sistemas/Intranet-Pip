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
      t_summ_act = document.getElementById('t_summ_act'),
      t_summ_planA = document.getElementById('t_summ_planA'),
      card_acceptActivities = document.getElementById('card_acceptActivities'),
      card_acceptProgress = document.getElementById('card_acceptProgress'),
      card_rechazo = document.getElementById('card_rechazo'),
      tx_rechazo_motivo = document.getElementById('tx_rechazo_motivo'),
      tx_rechazo_fecha = document.getElementById('tx_rechazo_fecha'),
      t_cant_act = document.getElementById('t_cant_act'),
      t_cant_actF = document.getElementById('t_cant_actF'),
      txt_global_progress = document.getElementById('txt_global_progress'),
      bar_global_progress = document.getElementById('bar_global_progress');

let gblActConfirmada, gblPlanAConfirmada, gblTypeUser;

// Helper para obtener o inicializar la instancia de Modal de Bootstrap 5
function getModalInstance(id) {
  const modalEl = document.getElementById(id);
  if (!modalEl) return null;
  let modal = bootstrap.Modal.getInstance(modalEl);
  if (!modal) {
    modal = new bootstrap.Modal(modalEl);
  }
  return modal;
}

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
  if (!data) {
    console.error("printSummaryPlanAction: No se recibieron datos.");
    return;
  }
  const cantidades = data.Cantidades || { CantidadAct: 0, CantidadActTerminadas: 0 };
  const resumen = data.Resumen || data[0] || {};
  t_cant_act.textContent = cantidades.CantidadAct || 0;
  t_cant_actF.textContent = cantidades.CantidadActTerminadas || 0;
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

  // Mostrar u ocultar el card de rechazo para el empleado
  if (data.TieneRechazo && !resumen.StatusConfirmaPlanAccion) {
    card_rechazo.style.display = "";
    tx_rechazo_motivo.textContent = data.UltimoMotivoRechazo || "Sin motivo registrado";
    tx_rechazo_fecha.textContent = `Rechazado el ${data.UltimaFechaRechazo || ""}` ;
  } else {
    card_rechazo.style.display = "none";
  }

  if (resumen.FechaConfirmaActividades == null || resumen.FechaConfirmaActividades == '' || resumen.FechaConfirmaActividades == 'No registrado') {
    t_summ_act.innerHTML = `<span class="badge bg-warning text-dark fw-bold"><i class="fa-regular fa-clock me-1"></i> Pendiente</span>`;
  } else {
    t_summ_act.innerHTML = `<span class="badge bg-success text-white fw-bold" title="${resumen.FechaConfirmaActividades}"><i class="fa-regular fa-circle-check me-1"></i> Aceptado</span>`;
  }

  if (resumen.FechaConfirmaPlanAccion == null || resumen.FechaConfirmaPlanAccion == '' || resumen.FechaConfirmaPlanAccion == 'No registrado') {
    t_summ_planA.innerHTML = `<span class="badge bg-warning text-dark fw-bold"><i class="fa-regular fa-clock me-1"></i> Pendiente</span>`;
  } else {
    t_summ_planA.innerHTML = `<span class="badge bg-success text-white fw-bold" title="${resumen.FechaConfirmaPlanAccion}"><i class="fa-regular fa-circle-check me-1"></i> Aceptado</span>`;
  }
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
  let principalHTMLF = "";
  
  // Calcular progreso general del plan en base a todas las actividades de todas las competencias
  let totalProgressPct = 0;
  let totalActivitiesCount = 0;

  for (var i = 0; i < data.length; i++) {
    let allActivities = data[i]["Activities"];
    for (var j = 0; j < allActivities.length; j++) {
      totalProgressPct += Number(allActivities[j]["Progreso"]) || 0;
      totalActivitiesCount++;
    }
  }

  let globalProgressVal = totalActivitiesCount > 0 ? (totalProgressPct / totalActivitiesCount) : 0;
  txt_global_progress.textContent = `${globalProgressVal.toFixed(1)}%`;
  bar_global_progress.style.width = `${globalProgressVal.toFixed(1)}%`;

  for (var i = 0; i < data.length; i++) {
    let allActivities = data[i]["Activities"];
    let activitiesHTML = [];

    for (var j = 0; j < allActivities.length; j++) {
      let act = allActivities[j];
      let statusIcon = "";
      let statusBadge = "";

      if (act["Progreso"] == 100) {
        statusIcon = `<div class="checklist-status-icon checklist-status-completed" title="Realizada"><i class="fa-solid fa-check"></i></div>`;
        statusBadge = `<span class="badge bg-success text-white">Realizado</span>`;
      } else {
        if (act["FechaCaduca"] == 1) {
          statusIcon = `<div class="checklist-status-icon checklist-status-delayed" title="Retrasada"><i class="fa-solid fa-triangle-exclamation"></i></div>`;
          statusBadge = `<span class="badge bg-danger text-white">Retrasada</span>`;
        } else {
          statusIcon = `<div class="checklist-status-icon checklist-status-pending" title="Pendiente"><i class="fa-solid fa-spinner"></i></div>`;
          statusBadge = `<span class="badge bg-warning text-dark fw-bold">Pendiente</span>`;
        }
      }

      let actHTML = `
        <div class="checklist-item d-flex align-items-center justify-content-between flex-wrap gap-3 animate__animated animate__fadeIn" id="act_card_${act["idActividadesPlanAccion"]}">
          <div class="d-flex align-items-center gap-3 flex-grow-1" style="min-width: 280px;">
            ${statusIcon}
            <div class="flex-grow-1">
              <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                ${statusBadge}
                <span class="small fw-bold text-dark"><i class="fa-regular fa-calendar text-danger me-1"></i> ${act["FechaInicio"]} - ${act["FechaFin"]}</span>
              </div>
              <h6 class="fw-bold text-dark mb-1" style="font-size: 0.90rem; line-height: 1.3;">${act["Titulo"].toUpperCase()}</h6>
              <div class="mb-2">
                <span class="text-success small d-block fw-bold" style="font-size: 0.72rem; letter-spacing: 0.3px;">Criterios de éxito / Descripción</span>
                <span class="small text-dark d-block" style="font-size: 0.78rem;" title="${act["Descripcion"]}">${act["Descripcion"]}</span>
              </div>
              
              <div class="d-flex align-items-center gap-2" style="max-width: 250px;">
                <div class="progress flex-grow-1" style="height: 6px; background-color: rgba(0,0,0,.08); border-radius: 3px;">
                  <div class="progress-bar bg-success" role="progressbar" style="width: ${act["Progreso"]}%" aria-valuenow="${act["Progreso"]}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <span class="small fw-bold text-dark" style="font-size: 0.75rem;"><b id="advance${act["idActividadesPlanAccion"]}">${act["Progreso"]}</b>%</span>
              </div>
            </div>
          </div>
          <div class="text-end flex-shrink-0">
            ${gblActConfirmada == 0 ? '': act["Progreso"] < 100 ? gblTypeUser == 1 ? `
              <button class="btn btn-minimal btn-minimal-primary btn-sm btn-addProgress" data-desc="${act["Descripcion"]}" data-title="${act["Titulo"]}" data-addprogressd="${act["idActividadesPlanAccion"]}">
                <i class="fa-solid fa-plus me-1"></i> Agregar Avance
              </button>
            ` : '' : `
              <button class="btn btn-minimal btn-minimal-success btn-sm btn-viewProgress" data-desc="${act["Descripcion"]}" data-title="${act["Titulo"]}" data-viewprogress="${act["idActividadesPlanAccion"]}">
                <i class="fa-solid fa-eye me-1"></i> Ver Avance Final
              </button>
            `}
          </div>
        </div>
      `;
      activitiesHTML.push(actHTML);
    }

    let activitiesListHTML = "";
    if (activitiesHTML.length === 0) {
      activitiesListHTML = `
        <div class="text-center py-4 border rounded bg-light" style="border-style: dashed !important;">
          <i class="fa-solid fa-clipboard-check fa-2x text-dark mb-2"></i>
          <h6 class="text-dark fw-bold mb-1">Sin actividades registradas</h6>
          <p class="text-dark small mb-0">No se han definido actividades de mejora para esta competencia.</p>
        </div>
      `;
    } else {
      activitiesListHTML = `
        <div class="checklist-container mb-3">
          ${activitiesHTML.join("")}
        </div>
      `;
    }

    principalHTMLF += `
      <div class="accordion-item mb-3 border rounded shadow-sm">
        <h2 class="accordion-header" id="heading${i}">
          <button class="accordion-button collapsed fw-bold rounded-top text-dark d-flex align-items-center justify-content-between pe-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
            <span class="text-truncate" style="max-width: 65%;"><i class="fa-solid fa-graduation-cap me-2 text-warning"></i>${data[i]["Principal"]["Competencia"]}</span>
            <div class="d-flex align-items-center gap-2 me-3">
              <span class="badge bg-light text-dark border rounded-pill small">${allActivities.length} ${allActivities.length === 1 ? 'Actividad' : 'Actividades'}</span>
              <span class="badge bg-success text-white border border-success rounded-pill small">${Number(data[i]["Principal"]["ProgresoObjetivo"]).toFixed(1)}%</span>
            </div>
          </button>
        </h2>
        <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionPlanAction">
          <div class="accordion-body card-objetive p-3">
             <div class="row">
               <div class="col-12 mb-3 border-bottom pb-2">
                 <div class="d-flex align-items-center justify-content-between">
                   <h6 class="m-0 fw-bold text-dark small text-uppercase">Avance de Competencia</h6>
                   <span class="fw-bold text-success">${Number(data[i]["Principal"]["ProgresoObjetivo"]).toFixed(2)}%</span>
                 </div>
                 <div class="progress mt-2" style="height: 6px; background-color: rgba(0,0,0,.06); border-radius: 3px;">
                   <div class="progress-bar bg-success" role="progressbar" style="width: ${Number(data[i]["Principal"]["ProgresoObjetivo"]).toFixed(2)}%;" aria-valuenow="${Number(data[i]["Principal"]["ProgresoObjetivo"]).toFixed(2)}" aria-valuemin="0" aria-valuemax="100"></div>
                 </div>
               </div>
               <div class="col-12">
                 <div class="d-flex justify-content-between align-items-start mb-2">
                   <h5 id="obj_title_${data[i]["Principal"]["idObjetivosPlanAccion"]}" class="m-0 fw-bold" style="font-size: 0.95rem;">${data[i]["Principal"]["Objetivo"] === null || data[i]["Principal"]["Objetivo"] == "" ? "Objetivo sin definir" : `<span><b>Objetivo: </b>${data[i]["Principal"]["Objetivo"]}</span>`}</h5>
                   <button class="btn btn-minimal btn-minimal-primary btn-sm" data-objetivebtn="${data[i]["Principal"]["idObjetivosPlanAccion"]}"><i class="fa-solid fa-user-pen"></i> Editar</button>
                 </div>
                 <p id="obj_desc_${data[i]["Principal"]["idObjetivosPlanAccion"]}" class="mb-3 text-dark small">${data[i]["Principal"]["DescObjetivo"] === null || data[i]["Principal"]["DescObjetivo"] == "" ? "No se ha especificado una descripción del objetivo" : `<span><b>Descripción: </b>${data[i]["Principal"]["DescObjetivo"]}</span>`}</p>
                 
                 ${activitiesListHTML}
  
                 ${gblTypeUser == 1 ? gblActConfirmada == 0 ? `
                 <div class="text-center mt-3 pt-2 border-top">
                   <button class="btn btn-minimal btn-minimal-primary btn-sm a_addActivity" data-objetive="${data[i]["Principal"]["idObjetivosPlanAccion"]}">
                     <i class="fa-solid fa-plus me-1"></i> Agregar Actividad
                   </button>
                 </div>` : '' : ''}
               </div>
             </div>
          </div>
        </div>
      </div>`;
  }
  $("#accordionPlanAction").append(principalHTMLF);
}

$(document).on("click", ".a_addActivity", async function(element){
  m_add_objetiveSel.value = element.currentTarget.dataset.objetive;
  const dv = "dv_inp_modal";
  cleanVerifyInputs(dv);
  getModalInstance("modal_Activity").show();
});

$(document).on("click", "#btn_m_addActivity", async function(){
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
    getModalInstance("modal_Activity").hide();
    
    // Recargar resúmenes y el progreso global del plan
    await getSummaryPlanAction();
    // Vaciar y volver a pintar el acordeón completo con la nueva actividad en su columna Kanban
    $("#accordionPlanAction").empty();
    await getInitialDetailPlanAction();
  }
}

$(document).on("click", "[data-objetivebtn]", async function(element){
  let thisValue = element.currentTarget.dataset.objetivebtn;
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
    getModalInstance("modal_objetive").show();
  }
}

$(document).on("click", "#btn_m_updObjetive", async function(){
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
    ob_title.innerHTML = `<span><b>Objetivo: </b>${dataSend.objetive}</span>`;
    ob_desc.innerHTML = `<span><b>Descripción: </b>${dataSend.desc}</span>`;
    getModalInstance("modal_objetive").hide();
  }
}

$(document).on("click", ".btn-addProgress", async function(element){
  tx_modal_act_addProgress.textContent = element.currentTarget.dataset.title;
  tx_modal_desc_addProgress.textContent = element.currentTarget.dataset.desc;
  const activityId = element.currentTarget.dataset.addprogressd;

  // Leer el avance actual desde la tarjeta renderizada
  const advanceEl = document.getElementById(`advance${activityId}`);
  const currentProgress = advanceEl ? parseInt(advanceEl.textContent, 10) : 0;

  // Actualizar dinámicamente el mínimo del input de progreso
  inp_num_newProgress.min = currentProgress + 1;
  inp_num_newProgress.max = 100;
  inp_num_newProgress.value = "";
  // Guardar el progreso actual como referencia para la validación posterior
  inp_num_newProgress.dataset.current = currentProgress;

  getGeneralDetailActivityPlan(activityId);
});

async function getGeneralDetailActivityPlan(activity){
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
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="small text-dark fw-bold">Completado</span>
              <span class="small fw-bold">${data[i]["NuevoAvance"]}%</span>
            </div>
            <div class="progress" style="height: 8px; background-color: rgba(0,0,0,.1);">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${data[i]["NuevoAvance"]}%" aria-valuenow="${data[i]["NuevoAvance"]}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>`
      ])
    }
  }
  const dv = "dv_inp_newProgress";
  cleanVerifyInputs(dv);
  getModalInstance("modal-addProgress").show();
}

$(document).on("click", "#btn_m_addProgress", async function(){
  const dv = "dv_inp_newProgress";
  const resultInp = await verifyInputs(dv);
  if (resultInp){
    // Validar que el nuevo avance sea incremental y esté en el rango permitido
    const newVal = parseInt(inp_num_newProgress.value, 10);
    const currentVal = parseInt(inp_num_newProgress.dataset.current ?? "0", 10);
    const minAllowed = currentVal + 1;

    if (isNaN(newVal) || newVal < minAllowed || newVal > 100) {
      Swal.fire({
        icon: "warning",
        title: "Valor de avance inválido",
        html: `El avance debe ser mayor al registrado actualmente (<b>${currentVal}%</b>) y no puede superar <b>100%</b>.<br>Rango permitido: <b>${minAllowed}% – 100%</b>.`,
        confirmButtonColor: "#ffc407",
        confirmButtonText: "Entendido"
      });
      return;
    }

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
    getModalInstance("modal-addProgress").hide();
    
    // Recargar resúmenes y el progreso global del plan
    await getSummaryPlanAction();
    // Vaciar y volver a pintar el acordeón completo con la actividad movida a la columna Kanban correspondiente (si llegó al 100%)
    $("#accordionPlanAction").empty();
    await getInitialDetailPlanAction();
  }
}

$(document).on("click", ".btn-viewProgress", async function(element){
  tx_modal_act_ViewProgress.textContent = element.currentTarget.dataset.title;
  tx_modal_desc_ViewProgress.textContent = element.currentTarget.dataset.desc;
  getGeneralDetailActivityPlanAF(element.currentTarget.dataset.viewprogress);
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
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="small text-dark fw-bold">Completado</span>
              <span class="small fw-bold">${data[i]["NuevoAvance"]}%</span>
            </div>
            <div class="progress" style="height: 8px; background-color: rgba(0,0,0,.1);">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${data[i]["NuevoAvance"]}%" aria-valuenow="${data[i]["NuevoAvance"]}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>`
      ])
    }
  }
  getModalInstance("modal_ViewProgressFinal").show();
}

$(document).on("click", "#acceptActivities", async function(){
  let title = "¿Desea confirmar las actividades del plan de acción actual?";
  let comm = "Una vez sean aceptadas las actividades, ya no podrán agregarse más en un futuro";
  const result = await Swal.fire({
    title: title,
    text: comm,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar"
  });
  if (result.isConfirmed) {
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

$(document).on("click", "#btn_acceptProgress", async function(){
  let title = "¿Desea confirmar los resultados del plan de acción final?";
  let comm = "Una vez sea aceptado el plan de acción, no se podrán hacer más cambios";
  const result = await Swal.fire({
    title: title,
    text: comm,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar"
  });
  if (result.isConfirmed) {
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

// ─── FLUJO DE RECHAZO DEL PLAN DE ACCIÓN ──────────────────────────────────────

$(document).on("click", "#btn_rejectProgress", function(){
  // Limpiar el textarea antes de abrir el modal
  $("#inp_reject_motivo").val("").removeClass("is-invalid");
  getModalInstance("modal_rejectProgress").show();
});

$(document).on("click", "#btn_m_rejectProgress", async function(){
  const motivo = $("#inp_reject_motivo").val().trim();
  // Validar que el motivo no esté vacío
  if (!motivo) {
    $("#inp_reject_motivo").addClass("is-invalid");
    return;
  }
  $("#inp_reject_motivo").removeClass("is-invalid");

  // Confirmación adicional con SweetAlert2
  const result = await Swal.fire({
    title: "¿Confirmar rechazo?",
    html: `El progreso de <strong>todas las actividades</strong> se reiniciará a <strong>0%</strong> y el empleado deberá registrar nuevos avances.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, rechazar",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
    rejectProgressActionPlan(motivo);
  }
});

async function rejectProgressActionPlan(motivo){
  const dataSend = {
    op: "rejectProgressActionPlan",
    planA: _planActionGB,
    motivo: motivo
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    getModalInstance("modal_rejectProgress").hide();
    setTimeout(function () {
      location.reload();
    }, 1500);
  }
}

// ─── HISTORIAL DE RECHAZOS ─────────────────────────────────────────────────────

let table_historialRechazos;

$(document).ready(function(){
  // Inicializar DataTable del historial de rechazos
  table_historialRechazos = $("#table_historialRechazos").DataTable({
    language: { url: "assets/libs/datatables/lang/Spanish.json" },
    ordering: false,
    searching: false,
    paging: false,
    info: false
  });
});

$(document).on("click", "#btn_historialRechazos", async function(){
  await loadHistorialRechazos();
  getModalInstance("modal_historialRechazos").show();
});

async function loadHistorialRechazos(){
  const dataSend = {
    op: "getHistorialRechazos",
    planA: _planActionGB
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const data = ajaxR.Data || [];
    table_historialRechazos.clear();
    if (data.length > 0) {
      data.forEach((row, idx) => {
        table_historialRechazos.row.add([
          idx + 1,
          row["FechaRechazo"],
          `<span class="badge bg-warning text-dark fw-bold">${parseFloat(row["AvanceGlobalAlRechazar"]).toFixed(1)}%</span>`,
          `<span class="text-dark small text-start d-block">${row["MotivoRechazo"]}</span>`
        ]);
      });
    } else {
      table_historialRechazos.row.add([
        `<td colspan="4" class="text-center text-dark">Sin rechazos registrados</td>`,
        "", "", ""
      ]);
    }
    table_historialRechazos.draw();
  }
}
