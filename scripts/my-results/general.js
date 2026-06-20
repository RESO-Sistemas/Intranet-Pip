const _generalEmployee = document.querySelector("#_generalEmployee"),

      _generalGroup = document.querySelector("#_generalGroup"),

      _generalNoEmployee = document.querySelector("#_generalNoEmployee"),

      _generalQualification = document.querySelector("#_generalQualification"),

      _generalPosition_employed = document.querySelector("#_generalPosition_employed"),

      _generalLvl_employed = document.querySelector("#_generalLvl_employed"),

      mg_evaluation = document.getElementById('mg_evaluation'),

      tx_planAction = document.getElementById('tx_planAction'),

      aceptResultsEvaluation = document.getElementById('aceptResultsEvaluation'),

      img_EmployeeSel = document.getElementById('img_EmployeeSel'),

      tx_feedback = document.getElementById('tx_feedback'),

      b_dateIni_PlanA = document.getElementById('b_dateIni_PlanA'),

      b_dateEnd_PlanA = document.getElementById('b_dateEnd_PlanA'),

mg_employee = document.getElementById('mg_employee');

const retroStatus = document.getElementById('_retroStatus');
const planStatus = document.getElementById('_planStatus');
const activitiesApproval = document.getElementById('_activitiesApproval');
const finalPlanApproval = document.getElementById('_finalPlanApproval');


let table_final, best_final, worst_final, final_graph, resultsDetailModal, currentEvaluationType = 1;
let normalEvaluationsData = {};
let currentCompetenciasDetalle = [];


loadInitial();

function openResultsModal(){

  const modalElement = document.getElementById('resultsDetailModal');

  if (!modalElement || typeof bootstrap === 'undefined') {

    return;

  }

  if (!resultsDetailModal) {

    resultsDetailModal = new bootstrap.Modal(modalElement);

  }

  resultsDetailModal.show();

}

function safeText(value, fallback = 'No disponible'){

  if (value === null || value === undefined || value === '' || value === 'null') {

    return fallback;

  }

  return value;

}

function setSummaryStatuses(retro, planA, dateIni, dateEnd, planActionId = '', evaluationType = 1){

  if (Number(evaluationType) !== 1) {

    if (retroStatus) retroStatus.textContent = 'No aplica para encuesta normal';

    if (planStatus) planStatus.textContent = 'No aplica para encuesta normal';

    if (activitiesApproval) activitiesApproval.textContent = 'No aplica';

    if (finalPlanApproval) finalPlanApproval.textContent = 'No aplica';

    return;

  }

  if (retroStatus) {

    retroStatus.textContent = Number(retro) === 1 ? 'Aceptada' : 'Pendiente de aceptación';

  }

  if (planStatus) {

    planStatus.textContent = Number(planA) === 1 ? 'Generado' : `Disponible del ${safeText(dateIni)} al ${safeText(dateEnd)}`;

  }

  if (activitiesApproval) {

    activitiesApproval.textContent = 'No registrado';

  }

  if (finalPlanApproval) {

    finalPlanApproval.textContent = 'No registrado';

  }

  if (Number(planA) === 1 && planActionId !== '') {

    loadPlanSummary(planActionId);

  }

}

async function loadPlanSummary(planActionId){

  const dataSend = {

    op: 'getSummaryPlanAction',

    evaluation: planActionId

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR === undefined || !ajaxR.Siguiente || !ajaxR.Data || !ajaxR.Data[0]) {

    return;

  }

  const summary = ajaxR.Data[0];

  if (retroStatus && summary.FechaAceptaRetroalimentacion) {

    retroStatus.textContent = `Aceptada el ${safeText(summary.FechaAceptaRetroalimentacion)}`;

  }

  if (activitiesApproval) {

    activitiesApproval.textContent = Number(summary.StatusConfirmaActividades) === 1 ? `Aceptadas el ${safeText(summary.FechaConfirmaActividades)}` : 'Pendiente';

  }

  if (finalPlanApproval) {

    finalPlanApproval.textContent = Number(summary.StatusConfirmaPlanAccion) === 1
      ? `Aprobado el ${safeText(summary.FechaConfirmaPlanAccion)}`
      : Number(summary.CantidadAvancesPendientes || 0) > 0
        ? `${summary.CantidadAvancesPendientes} avance(s) pendiente(s) de revisión`
        : 'Pendiente';

  }

}
async function loadInitial(){

  getAllGeneralDataPerEmployeeFinal();

}



async function getAllGeneralDataPerEmployeeFinal(){

  const dataSend = {

    op: "getAllGeneralDataPerEmployeeFinal"

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  console.log('getAllGeneralDataPerEmployeeFinal response:', ajaxR);

  if (ajaxR !== undefined) {

    const dataR = ajaxR.Data;

    console.log('Data array:', dataR);

    printAllGeneralDataPerEmployeeFinal(dataR);

  }

}

function printAllGeneralDataPerEmployeeFinal(data){

  const container = document.getElementById('cards_container');

  if (!container) return;

  container.innerHTML = '';

  if (!Array.isArray(data) || data.length === 0) {

    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem; color:#8a9ab0;">
        <i class="fas fa-inbox" style="font-size:2.5rem; margin-bottom:0.75rem; display:block;"></i>
        <span>No se encontraron evaluaciones.</span>
      </div>`;

    return;

  }

  data.forEach(e => {

    const porcent = e.CantMisEvaluadores > 0
      ? (((e.CantMisEvaluadoresF || 0) * 100) / e.CantMisEvaluadores).toFixed(2)
      : '0.00';

    const isComplete = Number(porcent) >= 100;

    const is360 = Number(e.TipoEvaluacion) === 1;

    const badgeClass = is360 ? 'type-360' : 'type-normal';

    const badgeText = is360 ? '360°' : 'Evaluación';

    if (!is360 && isComplete && e.CompetenciasDetalle) {
      normalEvaluationsData[e.idEvaluaciones] = e.CompetenciasDetalle;
    }

    // Meta items: distinto layout para 360 vs normal
    let metaItems = '';

    if (is360) {

      // Retroalimentación
      let retroHTML = '';
      if (e.RetroRealizada == 1) {
        retroHTML = '<span class="value" style="color:#059669;"><i class="fas fa-check-circle"></i> Aceptada</span>';
      } else if (e.RetroDisponible == 1) {
        retroHTML = `
          <div class="eval-switch">
            <span style="font-size:0.82rem; color:#475569; font-weight:600;">Aceptar</span>
            <input type="checkbox" data-evaluationretro="${e.idEvaluaciones}" class="checkRetro">
          </div>`;
      } else {
        retroHTML = `<span class="value">${e.MsgRetroDisponible || 'Pendiente'}</span>`;
      }

      // Plan de acción
      let planHTML = '';
      if (e.ConPlanAccion == 1 && e.PlanAction) {
        planHTML = `<a href="plan-action.php?PA=${e.PlanAction}" class="value" style="color:#2563eb; text-decoration:none; font-weight:700;"><i class="fas fa-external-link-alt" style="margin-right:0.3rem;"></i>Ir al plan</a>`;
      } else {
        planHTML = '<span class="value" style="color:#94a3b8;">Sin plan generado</span>';
      }

      const groupHTML = `<span class="value">Grupo ${e.GrupoEvaluado || '-'}</span>`;

      metaItems = `
        <div class="eval-meta-item">
          <span class="label">Retroalimentación</span>
          ${retroHTML}
        </div>
        <div class="eval-meta-item">
          <span class="label">Plan de acción</span>
          ${planHTML}
        </div>
        <div class="eval-meta-item">
          <span class="label">Grupo</span>
          ${groupHTML}
        </div>
        <div class="eval-meta-item">
          <span class="label">Avance</span>
          <span class="value">${porcent}%</span>
        </div>
      `;

    } else {

      // Normal: mostrar calificación, competencias, fortalezas, debilidades
      const hasSummary = isComplete && e.CalificacionFinal !== undefined && e.CalificacionFinal !== null;

      const califHTML = hasSummary
        ? `<span class="value" style="color:#2563eb; font-weight:700; font-size:1.05rem;">${Number(e.CalificacionFinal).toFixed(2)}</span>`
        : '<span class="value" style="color:#94a3b8;">Pendiente</span>';

      const competenciasHTML = hasSummary
        ? `<span class="value">${e.TotalCompetencias || 0}</span>`
        : '<span class="value" style="color:#94a3b8;">-</span>';

      const fortalezasHTML = hasSummary
        ? `<span class="value" style="color:#059669;"><i class="fas fa-arrow-up" style="margin-right:0.25rem;"></i>${e.FortalezasCount || 0}</span>`
        : '<span class="value" style="color:#94a3b8;">-</span>';

      const debilidadesHTML = hasSummary
        ? `<span class="value" style="color:#d03b42;"><i class="fas fa-arrow-down" style="margin-right:0.25rem;"></i>${e.DebilidadesCount || 0}</span>`
        : '<span class="value" style="color:#94a3b8;">-</span>';

      metaItems = `
        <div class="eval-meta-item">
          <span class="label">Calificación final</span>
          ${califHTML}
        </div>
        <div class="eval-meta-item">
          <span class="label">Competencias</span>
          ${competenciasHTML}
        </div>
        <div class="eval-meta-item">
          <span class="label">Fortalezas</span>
          ${fortalezasHTML}
        </div>
        <div class="eval-meta-item">
          <span class="label">Debilidades</span>
          ${debilidadesHTML}
        </div>
      `;

    }

    // Botón ver detalles
    let btnDetail = '';

    if (Number(e.CantMisEvaluadoresF) == Number(e.CantMisEvaluadores)) {

      btnDetail = `<button class="btn-minimal btn-minimal-primary" onclick="viewFinalResults('${e.idEvaluaciones}', '${e.RetroRealizada}', '${e.NoEmpleadoEvaluado}','${e.ConPlanAccion}','${e.PlanAFechaIni || ''}','${e.PlanAFechaFin || ''}','${e.PlanAction || ''}','${e.TipoEvaluacion}')">
          <i class="fas fa-eye"></i> Ver detalles
        </button>`;

    } else {

      btnDetail = `<button class="btn-minimal btn-minimal-warning" disabled title="Evaluación en progreso">
          <i class="fas fa-lock"></i> En progreso
        </button>`;

    }

    const card = document.createElement('div');

    card.className = 'eval-card';

    card.innerHTML = `
      <div class="eval-card-header">
        <h3 class="eval-card-title">${e.NameEvaluacion || 'Evaluación'}</h3>
        <span class="eval-card-badge ${badgeClass}">${badgeText}</span>
      </div>

      <div class="eval-progress">
        <div class="eval-progress-label">
          <span>Evaluadores</span>
          <strong>${e.CantMisEvaluadoresF || 0} / ${e.CantMisEvaluadores || 0}</strong>
        </div>
        <div class="eval-progress-bar">
          <div class="eval-progress-fill ${isComplete ? 'complete' : ''}" style="width: ${porcent}%"></div>
        </div>
      </div>

      <div class="eval-meta-grid">
        ${metaItems}
      </div>

      <div class="eval-card-footer">
        ${btnDetail}
      </div>
    `;

    container.appendChild(card);

  });

  // Rebind evento de checkRetro para switches nuevos
  $('.checkRetro').off('change').on('change', async function(element){

    let title = "¿Desea aceptar retroalimentación?";

    let comen = "Los cambios no podrán ser revertidos";

    const evaluation = element.target.dataset.evaluationretro;

    const resultDial = await dialogConfirmSAlert(title, comen);

    if (resultDial) {

      acceptFeedback(evaluation);

    } else {

      element.target.checked = false;

    }

  });

}

async function acceptFeedback(ev){

  const dataSend = {

    op: "acceptFeedback",

    evaluation: ev

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    setTimeout(function () {

      location.reload();

    }, 1500);

  }

}



async function getConfigQuestionsEvaluated(ev,employee){

  const dataSend = {

    op: "getConfigQuestionsEvaluated",

    evaluation: ev,

    employee: employee

  };

  console.log('getConfigQuestionsEvaluated request:', dataSend);

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  console.log('getConfigQuestionsEvaluated response:', ajaxR);

  if (ajaxR !== undefined) {

    const dataR = ajaxR.Data;

    console.log('Config data:', dataR);

    arrAnswersQuestion = dataR.AllAnswersQuestion;

    arrConfig = dataR.ConfigQ;

    lvlEvaluated = dataR.LvlEmp.NivelEvaluado;

    arrAllDetailEvaluated = dataR.allEvaluationDetail;

    return true;

  } else {

    return false;

  }

}



async function getGeneralDetailEvaluatedUs(ev,em){

  let dataSend = {

    op: "getGeneralDetailEvaluatedUs",

    evaluation: ev

  }

  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if(ajaxResponse !== undefined && ajaxResponse.Siguiente){

    const dv = "contentGeneralSelected";

    openResultsModal();


    const dataR = ajaxResponse.Data;

    const dataEm = ajaxResponse.DataEmployee;

    b_dateIni_PlanA.textContent = dataEm.PlanAFechaIni;

    b_dateEnd_PlanA.textContent = dataEm.PlanAFechaFin;

    mg_employee.value = ev;

    mg_evaluation.value = em;

    img_EmployeeSel.src = dataEm.ImgEmpleado;

    _generalEmployee.textContent = dataEm.Nombre;

    _generalNoEmployee.textContent = dataEm.NoEmpleado;

    _generalPosition_employed.textContent = dataEm.Puesto;

    _generalLvl_employed.textContent = dataEm.NivelEvaluado;

    _generalGroup.textContent = dataEm.GrupoEvaluado;

    dataResults.set_currentGroup = dataEm.GrupoEvaluado;

    // addObjectGeneralInfo(dataR);

  }

}



function addObjectGeneralInfo(data){

  dataResults.cleanGeneral();

  let arrAllInfo = [];

  data.forEach( d => {

    let calNumber = 0;

    let typeEv = "";

    if (d.CalificacionEsperado == "A") {

      calNumber = dataResults.calEsperadoA(d.Calificacion);

    } else if (d.CalificacionEsperado == "B"){

      calNumber = dataResults.calEsperadoB(d.Calificacion);

    } else if (d.CalificacionEsperado == "C"){

      calNumber = dataResults.calEsperadoC(d.Calificacion);

    } else if (d.CalificacionEsperado == "D"){

      calNumber = dataResults.calEsperadoD(d.Calificacion);

    }

    if (d.JefeEvalua == 1 && d.AutoEvalua == 0 && d.ParEvalua == 0 && d.SubordinadoEvalua == 0) {

      dataResults.addGeneralJefe(d.Competencia,calNumber.Calificacion,typeEv,d.IdCompetencia,

                                d.CalificacionEsperado,d.Calificacion);

    } else if (d.JefeEvalua == 0 && d.AutoEvalua == 1 && d.ParEvalua == 0 && d.SubordinadoEvalua == 0) {

      dataResults.addGeneralAuto(d.Competencia,calNumber.Calificacion,typeEv,d.IdCompetencia,

                                d.CalificacionEsperado,d.Calificacion);

    } else if (d.JefeEvalua == 0 && d.AutoEvalua == 0 && d.ParEvalua == 1 && d.SubordinadoEvalua == 0) {

      dataResults.addGeneralPar(d.Competencia,calNumber.Calificacion,3,d.IdCompetencia,

                                d.CalificacionEsperado,d.EvaluacionDetalle,d.Calificacion);

    } else if (d.JefeEvalua == 0 && d.AutoEvalua == 0 && d.ParEvalua == 0 && d.SubordinadoEvalua == 1) {

      dataResults.addGeneralSub(d.Competencia,calNumber.Calificacion,4,d.IdCompetencia,

                                d.CalificacionEsperado,d.EvaluacionDetalle,d.Calificacion);

    }

    arrAllInfo.push({

      idCompetence: d.IdCompetencia,

      value: calNumber.Calificacion,

      competence: d.Competencia

    });

  });

  dataResults.AddGeneralInfo(arrAllInfo);

  _generalQualification.textContent = dataResults.calificacionFinal();

  printTotalGeneral();

}



function viewFinalResults(ev, retro, employee, planA, dateIni, dateEnd, planActionId = '', evaluationType = 1){

  currentEvaluationType = Number(evaluationType);

  const statusListContainer = document.getElementById('statusListContainer');
  const planDatesContainer = document.getElementById('planDatesContainer');
  const planActionContainer = document.getElementById('planActionContainer');

  currentCompetenciasDetalle = [];

  const modalSidebar360 = document.getElementById('modalSidebar360');
  const normalCompactHeader = document.getElementById('normalCompactHeader');
  const modalMainContent = document.getElementById('modalMainContent');
  const modalDialog = document.getElementById('modalDialog');
  const graphShell = document.getElementById('graphShell');
  const colResultsTable = document.getElementById('colResultsTable');
  const colResultsSecondary = document.getElementById('colResultsSecondary');

  if (currentEvaluationType !== 1) {

    aceptResultsEvaluation.style.display = "none";

    tx_planAction.style.display = "none";

    tx_feedback.style.display = "none";

    if (statusListContainer) statusListContainer.style.display = 'none';
    if (planDatesContainer) planDatesContainer.style.display = 'none';
    if (planActionContainer) planActionContainer.style.display = 'none';

    currentCompetenciasDetalle = normalEvaluationsData[ev] || [];

    // Layout compacto para evaluaciones normales
    if (modalSidebar360) modalSidebar360.style.display = 'none';
    if (normalCompactHeader) normalCompactHeader.style.display = '';
    if (modalMainContent) {
      modalMainContent.style.width = '100%';
      modalMainContent.style.maxWidth = '100%';
      modalMainContent.style.flex = '0 0 100%';
      modalMainContent.style.paddingLeft = '0';
      modalMainContent.style.paddingRight = '0';
    }
    if (modalDialog) {
      modalDialog.classList.remove('modal-xl');
      modalDialog.classList.add('modal-lg');
    }
    if (graphShell) graphShell.classList.add('normal-size');

    // Tabla más ancha, secundario más estrecho
    if (colResultsTable) {
      colResultsTable.style.width = '58%';
      colResultsTable.style.flex = '0 0 58%';
    }
    if (colResultsSecondary) {
      colResultsSecondary.style.width = '42%';
      colResultsSecondary.style.flex = '0 0 42%';
    }

  } else {

    if (statusListContainer) statusListContainer.style.display = '';
    if (planDatesContainer) planDatesContainer.style.display = '';
    if (planActionContainer) planActionContainer.style.display = '';

    // Restaurar layout 360
    if (modalSidebar360) modalSidebar360.style.display = '';
    if (normalCompactHeader) normalCompactHeader.style.display = 'none';
    if (modalMainContent) {
      modalMainContent.style.width = '';
      modalMainContent.style.maxWidth = '';
      modalMainContent.style.flex = '';
      modalMainContent.style.paddingLeft = '';
      modalMainContent.style.paddingRight = '';
    }
    if (modalDialog) {
      modalDialog.classList.remove('modal-lg');
      modalDialog.classList.add('modal-xl');
    }
    if (graphShell) graphShell.classList.remove('normal-size');

    if (colResultsTable) {
      colResultsTable.style.width = '';
      colResultsTable.style.flex = '';
    }
    if (colResultsSecondary) {
      colResultsSecondary.style.width = '';
      colResultsSecondary.style.flex = '';
    }

    if (retro == 1){
      if (planA == 1) {

        aceptResultsEvaluation.style.display = "none";

        tx_planAction.style.display = "";

        tx_feedback.style.display = "none";

      } else {

        aceptResultsEvaluation.style.display = "";

        tx_planAction.style.display = "none";

        tx_feedback.style.display = "none";

      }

    } else {

      aceptResultsEvaluation.style.display = "none";

      tx_planAction.style.display = "none";

      tx_feedback.style.display = "";

    }

  }

  b_dateIni_PlanA.textContent = dateIni;

  b_dateEnd_PlanA.textContent = dateEnd;

  setSummaryStatuses(retro, planA, dateIni, dateEnd, planActionId, currentEvaluationType);

  const thisEm = employee;
  const thisEv = ev;

  viewDetail(thisEv,thisEm);

}



async function viewDetail(evaluation,employee){

  let result = await getConfigQuestionsEvaluated(evaluation,employee);

  if (result) {

    await getPrincipalDetailEvaluated(employee, evaluation);

  }

}



async function getPrincipalDetailEvaluated(employee,evaluation){

  let dataSend = {

    op: "getPrincipalDetailEvaluated",

    employee: employee

  };

  const ajaxResponse = await pAjaxAsync(url_m_Empleados, dataSend, 1);

  if (ajaxResponse !== undefined) {

    const dataR = ajaxResponse.Data;

    let resultEvaluators = await getListEvaluatorsDetail(employee, evaluation);

    if (resultEvaluators) {

      mg_evaluation.value = evaluation;

      mg_employee.value = employee;

      const dv = "contentGeneralSelected";

      openResultsModal();
      printPrincipalDataEvaluated(dataR[0]);

      printFinalDataEvaluated();

    }

  }

}



async function getListEvaluatorsDetail(employee, ev){

  const dataSend = {

    op: "getListEvaluatorsDetail",

    employee: employee,

    evaluation: ev

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    const dataR = ajaxR.Data;

    arrListEvaluators = dataR;

    return true;

  } else {

    return false;

  }

}



async function printFinalDataEvaluated(){

  let data = currentEvaluationType === 1 ? await getFinalDataEvaluated() : await getFinalDataEvaluatedNormal();
  printFinalTableGraph(data.values,data.group,data.finalResult);

  printTableFinalBestWorst(data.bestOrWorst);

}



async function getFinalDataEvaluatedNormal(){

  const evaluators = arrListEvaluators.length > 0 ? arrListEvaluators : [{ IdEvDetail: null }];
  const perEvaluatorResults = [];

  for (const evaluator of evaluators) {

    const evaluatorRows = evaluator.IdEvDetail === null
      ? arrAllDetailEvaluated
      : arrAllDetailEvaluated.filter(values => values.IdEvDetail == evaluator.IdEvDetail);

    if (evaluatorRows.length === 0) {
      continue;
    }

    const result = await getDataResultsPerEvaluatorUnique(evaluatorRows);
    perEvaluatorResults.push(...result);

  }

  const grouped = {};

  perEvaluatorResults.forEach(item => {

    if (!grouped[item.idCompetence]) {
      grouped[item.idCompetence] = { competence: item.competence, total: 0, count: 0, idCompetence: item.idCompetence };
    }

    grouped[item.idCompetence].total += Number(item.result);
    grouped[item.idCompetence].count += 1;

  });

  const finalDataValues = Object.values(grouped).map(item => ({
    idCompetence: item.idCompetence,
    competence: item.competence,
    result: Number((item.total / item.count).toFixed(2))
  }));

  const bestOrWorst = await bestAndWorstCompetencesPerEvaluator(finalDataValues);
  const sumResults = finalDataValues.reduce((accumulator, competence) => accumulator + competence.result, 0);
  const finalResult = finalDataValues.length > 0 ? (sumResults / finalDataValues.length).toFixed(2) : '0.00';

  return {
    values: finalDataValues,
    bestOrWorst: bestOrWorst,
    group: 'Encuesta normal',
    finalResult: finalResult
  };

}

function printFinalTableGraph(data,group,resFinal){
  if (table_final) {

    table_final.destroy();

  }

  let gridData = data;
  let gridColumns = [

    { headerText: "Competencia", field: "competence",width: 70, textAlign: 'Center',},

    { headerText: "Calificación", field: "result", width: 70, textAlign: 'Center',},

  ];

  if (currentEvaluationType !== 1 && currentCompetenciasDetalle.length > 0) {

    // Fusionar datos de gap con data
    gridData = data.map(row => {
      const match = currentCompetenciasDetalle.find(c => c.idCompetence === row.idCompetence);
      if (match) {
        return { ...row, expected: match.expected, gap: match.gap };
      }
      return row;
    });

    gridColumns = [
      { headerText: "Competencia", field: "competence", width: 280, textAlign: 'Left' },
      { headerText: "Tu calificación", field: "result", width: 120, textAlign: 'Center' },
      { headerText: "Esperado", field: "expected", width: 100, textAlign: 'Center' },
      { headerText: "Gap", field: "gap", width: 110, textAlign: 'Center',
        template: function(data) {
          const val = Number(data.gap);
          const color = val >= 0 ? '#059669' : '#d03b42';
          const icon = val >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
          return `<span style="color:${color};font-weight:700;"><i class="fas ${icon}" style="margin-right:0.25rem;"></i>${val}</span>`;
        }
      }
    ];

  }

  table_final = new ej.grids.Grid({

    dataSource: gridData,

    columns: gridColumns,



  });

  table_final.appendTo("#total_General");

  _generalGroup.textContent = group;

  _generalQualification.textContent = resFinal;

  const scoreCompact = document.getElementById('_generalQualificationCompact');
  if (scoreCompact) scoreCompact.textContent = resFinal;

  setTimeout(function () {

    printFinalGraph(data);

  }, 1500);

  // Recomendaciones para evaluaciones normales
  if (currentEvaluationType !== 1) {
    printRecommendations();
  } else {
    const recContainer = document.getElementById('recommendationsContainer');
    if (recContainer) recContainer.style.display = 'none';
  }

}



function printFinalGraph(data){

  if (final_graph) {

    final_graph.destroy();

  }

  final_graph = new ej.charts.Chart({

      isResponsive: true,

      primaryXAxis: {

          title: 'Month',

          valueType: 'Category'

      },

      primaryYAxis: {

          minimum: 0, maximum: 100, interval: 10,

          title: 'Temperature in Celsius',

          labelFormat: '{value}'

      },

      series:[{

          dataSource: data, width:2,

          xName: 'competence', yName: 'result',

          name: 'Resultados',

          type: 'Polar',

          drawType: 'Line'

      }],

      title: 'Evalución de Desempeño'

  }, "#graph_total_General");

}



function printTableFinalBestWorst(data){

  if (best_final) {

    best_final.destroy();

  }

  if (worst_final) {

    worst_final.destroy();

  }

  best_final = new ej.grids.Grid({

    dataSource: data[0].bestCompetences,

    columns:[

      { headerText: "Competencia", field: "competence",width: 70, textAlign: 'Center',},

    ],

  });

  best_final.appendTo('#table_strengths');

  worst_final = new ej.grids.Grid({

    dataSource: data[0].worstCompetences,

    columns:[

      { headerText: "Competencia", field: "competence",width: 70, textAlign: 'Center',},

    ],

  });

  worst_final.appendTo('#table_areasForImprovement');

}



function printPrincipalDataEvaluated(data){

  img_EmployeeSel.src = data.ImgEmpleado;

  _generalEmployee.textContent = safeText(data.Nombre);

  _generalNoEmployee.textContent = safeText(data.NoEmpleado);
  _generalPosition_employed.textContent = safeText(data.Puesto);
  _generalLvl_employed.textContent = safeText(lvlEvaluated);

  // Header compacto para evaluaciones normales
  const imgCompact = document.getElementById('img_EmployeeSelCompact');
  const nameCompact = document.getElementById('_generalEmployeeCompact');
  const roleCompact = document.getElementById('_generalPosition_employedCompact');
  const scoreCompact = document.getElementById('_generalQualificationCompact');

  if (imgCompact) imgCompact.src = data.ImgEmpleado;
  if (nameCompact) nameCompact.textContent = safeText(data.Nombre);
  if (roleCompact) roleCompact.textContent = safeText(data.Puesto);
  if (scoreCompact) scoreCompact.textContent = safeText(_generalQualification.textContent, '0.00');
}



function printTotalGeneral(){

  const result = dataResults.globalGeneral();

  const allGeneral = result.generalInfo;

  const strengths = result.mejores;

  const lessData = result.peores;

  let tableTabFinal = new Tabulator(`#total_General`,{

    layout:"fitColumns",

    data: allGeneral,

    columns: [

      {title: "COMPETENCIAS", field: "competence",width:400},

      {title: "RESULTADO GLOBAL", field: "resultado", hozAlign:"center"},

    ],

  });

  let tableTabstrengths = new Tabulator('#table_strengths',{

    layout:"fitColumns",

    data: strengths,

    columns: [

      {title: "COMPETENCIAS", field: "competence"},

    ],

  });

  if (lessData.length > 0) {

    let tableLess = new Tabulator('#table_areasForImprovement',{

      layout:"fitColumns",

      data: lessData,

      columns: [

        {title: "COMPETENCIAS", field: "competence"},

      ],

    });

  } else {

    $("#table_areasForImprovement").append("Actualmente, el evaluado no cuenta con áreas con muy baja calificación.");

  }

  let idGraph = "graph_total_General";

  printChartInd(idGraph,allGeneral);

}

function printChartInd(idElement,data){

  let chart = new ej.charts.Chart({

      primaryXAxis: {

          title: 'Month',

          valueType: 'Category'

      },

      primaryYAxis: {

          minimum: 0, maximum: 100, interval: 10,

          title: 'Temperature in Celsius',

          labelFormat: '{value}'

      },

      series:[{

          dataSource: data, width:2,

          xName: 'competence', yName: 'resultado',

          name: 'Resultados',

          // Series type as Polar series

          type: 'Polar',

          // Series draw type as spline

          drawType: 'Line'

      }],

      title: 'Evalución de Desempeño'

  }, `#${idElement}`);

}

function printRecommendations(){
  const container = document.getElementById('recommendationsContainer');
  const list = document.getElementById('recommendationsList');
  if (!container || !list) return;

  list.innerHTML = '';

  if (!currentCompetenciasDetalle || currentCompetenciasDetalle.length === 0) {
    container.style.display = 'none';
    return;
  }

  const debilidades = currentCompetenciasDetalle.filter(c => c.isWeak || Number(c.result) < 70);

  if (debilidades.length === 0) {
    list.innerHTML = `
      <div style="padding:1rem; border-radius:14px; background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46;">
        <i class="fas fa-check-circle" style="margin-right:0.5rem;"></i>
        ¡Excelente! No se detectaron debilidades significativas en esta evaluación. Sigue fortaleciendo tus competencias actuales.
      </div>`;
    container.style.display = '';
    return;
  }

  const genericRecs = [
    "Solicita retroalimentación específica a tu jefe directo sobre esta área.",
    "Busca capacitación o entrenamiento enfocado en esta competencia.",
    "Identifica a un mentor o colega con fortaleza en esta área y pide consejo.",
    "Establece un plan de acción con objetivos SMART para mejorar en esta competencia.",
    "Practica deliberadamente: aplica esta competencia en proyectos o tareas diarias.",
    "Reflexiona sobre situaciones pasadas donde esta competencia fue clave y analiza qué harías diferente.",
    "Documenta tus avances y celebra pequeñas mejoras para mantener la motivación."
  ];

  debilidades.forEach((comp, index) => {
    const recText = genericRecs[index % genericRecs.length];
    const item = document.createElement('div');
    item.style.cssText = 'padding:1rem; border-radius:14px; background:#fef2f2; border:1px solid #fecaca; color:#991b1b;';
    item.innerHTML = `
      <div style="font-weight:700; margin-bottom:0.4rem;"><i class="fas fa-lightbulb" style="margin-right:0.4rem; color:#008837;"></i>${comp.competence}</div>
      <div style="font-size:0.92rem; line-height:1.5;">${recText}</div>
    `;
    list.appendChild(item);
  });

  container.style.display = '';
}

$(document).on("click","#aceptResultsEvaluation",async function(){

  let title = "";

  let req = 0;

  let comm = "¿Desea continuar?. Una vez aceptado, los cambios no podrán ser revertidos";

  if (worstCompetencesFinal.length > 0) {

    title = "El empleado evaluado cuenta con uno o más competencias con baja calificación, es necesario realizarle un plan de acción";

    req = 1;

  } else {

    title = "El empleado evaluado no cuenta con competencias con baja calificación, por lo tanto, no es necesario crear un plan de acción";

  }

  const results = await dialogConfirmSAlert(title, comm);
  if (results) {

    acceptResultsEvaluation(req, worstCompetencesFinal);

  }

});



async function acceptResultsEvaluation(req, dataCompetences){

  const dataSend = {

    op: "acceptResultsEvaluation",

    evaluation: mg_evaluation.value,

    employee: mg_employee.value,

    required: req,

    dataCompetences: dataCompetences

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    if (ajaxR.GoUrl) {

      const dataR = ajaxR.Data;

      setTimeout(function () {

        window.location.href = `plan-action.php?PA=${dataR}`;

      }, 1500);

    } else {

      setTimeout(function () {

        location.reload();

      }, 1500);

    }

  }

}
