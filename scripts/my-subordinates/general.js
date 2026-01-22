const mg_employee = document.getElementById('mg_employee'),
      mg_evaluation = document.getElementById('mg_evaluation'),
      tx_planAction = document.getElementById('tx_planAction'),
      aceptResultsEvaluation = document.getElementById('aceptResultsEvaluation'),
      img_EmployeeSel = document.getElementById('img_EmployeeSel'),
      b_dateIni_PlanA = document.getElementById('b_dateIni_PlanA'),
      b_dateEnd_PlanA = document.getElementById('b_dateEnd_PlanA'),
      tx_feedback = document.getElementById('tx_feedback');

let table_final, best_final, worst_final, final_graph, tableList, table_subordinates;
loadInitial();
async function loadInitial(){
  getMySubordinatesPerEvaluation();
}

async function getMySubordinatesPerEvaluation(){
  const dataSend = {
    op: "getMySubordinatesPerEvaluation"
  };
  const ajaxR = await pAjaxAsync(url_m_Empleados,dataSend);
  if(ajaxR !== undefined){
    const dataR = ajaxR.Data;
    console.log(dataR);
    printMySubordinatesPerEvaluation(dataR);
  }
}
function printMySubordinatesPerEvaluation(data){
  if (table_subordinates) {
    table_subordinates.destroy();
  }
  table_subordinates = new ej.grids.Grid({
    dataSource: data,
    allowFiltering: true,
    filterSettings: { type:'Menu' },
    allowPaging: true,
    selectionSettings: {type: 'Multiple', enableSimpleMultiRowSelection: true},
    columns: [
      { field: "NoEmpleado", headerText: "No Empleado", width: 50, filter: { type : 'CheckBox' },textAlign: 'Center'},
      { field: "Nombre", headerText: "Empleado", width: 100, filter: { type : 'CheckBox' },textAlign: 'Center'},
      { field: "Sucursal", headerText: "Sucursal", width: 50, filter: { type : 'CheckBox' }, textAlign: 'Center'},
      { field: "Puesto", headerText: "Puesto", width: 90, filter: { type : 'CheckBox' }, textAlign: 'Center'},
      { field: "", headerText: "Ver Evaluaciónes", width: 50, allowFiltering: false, template: "#viewEvaluationsTemplate" ,textAlign: 'Center'},
    ],
  });
  table_subordinates.appendTo('#table_subordinates');
  $('.tooltipped').tooltip();
}

window.viewEvaluationsSF = function(e){
  let div = document.createElement('div');
  let btn = `<button class="btn-actionBlue1" onclick="viewListEvaluations('${e.NoEmpleado}')"><i class="fa-solid fa-info"></i></button>`;
  $(div).append(btn);
  return div.outerHTML;
}

function viewListEvaluations(employee){
  evaluationsAboutTheEmployee(employee);
}

async function evaluationsAboutTheEmployee(employee){
  const dataSend = {
    op: "evaluationsAboutTheEmployee",
    employee: employee
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    printevaluationsAboutTheEmployee(dataR);
  }
}
function printevaluationsAboutTheEmployee(data){
 // table_general.fnClearTable();
 if (tableList) {
   tableList.destroy();
 }
 tableList = new ej.grids.Grid({
   dataSource: data,
   allowFiltering: true,
   filterSettings: { type:'Menu' },
   allowPaging: true,
   selectionSettings: {type: 'Multiple', enableSimpleMultiRowSelection: true},
   enableAdaptiveUI: true,
   isResponsive: true,
   columns: [
     { field: "NameEvaluacion", headerText: "Evaluación", width: 200, filter: { type : 'CheckBox' },textAlign: 'Center'},
     { field: "CantMisEvaluadores", headerText: "Mis Evaluadores", width: 170, filter: { type : 'CheckBox' },textAlign: 'Center'},
     { field: "", headerText: "Avance Evaluadores", width: 170,  template: "#mainAdvanceTemplate", allowFiltering: false,textAlign: 'Center'},
     { field: "", headerText: "Retroalimentación", width: 200, template: "#mainRetroTemplate",allowFiltering: false,textAlign: 'Center'},
     { field: "GrupoEvaluado", headerText: "Grupo durante la evaluación", width: 140, filter: { type : 'CheckBox' },textAlign: 'Center'},
     { field: "", headerText: "Plan de acción", width: 140, template:"#whitPlanActionTemplate", allowFiltering: false,textAlign: 'Center'},
     { field: "", headerText: "Resultados", width: 140, template:"#viewDetailTemplate", allowFiltering: false,textAlign: 'Center'},

   ],
 });
 tableList.appendTo('#table_general');
  $('.tooltipped').tooltip();
  $("#modal_evaluations").modal('open');
}

window.viewDetailSF = function(e){
  let div = document.createElement('div');
  let btnDetail ;
  if (Number(e.CantMisEvaluadoresF) == Number(e.CantMisEvaluadores)) {
    btnDetail = `<button class="btn-actionBlue1 tooltipped" data-position="botton" data-delay="50"
                  data-tooltip="Ver Detalles" onclick="viewFinalResults('${e.idEvaluaciones}', '${e.RetroRealizada}', '${e.NoEmpleadoEvaluado}','${e.ConPlanAccion}','${e.PlanAFechaIni}','${e.PlanAFechaFin}')" >
                  <i class="fa-solid fa-info"></i>
                 </button>`;
  } else {
    btnDetail = `<button class="btn-actionOrange tooltipped" data-position="botton" data-delay="50" data-tooltip="No puedes ver el detalle de una evaluación sin terminar de evaluar">
                  <i class="fas fa-lock"></i>
                 </button>`;
  }
  $(div).append(btnDetail);
  return div.outerHTML;
}


window.whitPlanActionSF = function(e){
  let div = document.createElement('div');
  let contentHTML = e.ConPlanAccion == 1 ? `<button class="btn-actionBlue" onclick="window.location.href='plan-action.php?PA=${e.PlanAction}'"><i class="fa-solid fa-list"></i></button>` : "<span>Plan de acción no generado</span>";
  $(div).append(contentHTML);
  return div.outerHTML;
}

window.mainRetroSF = function(e){
  console.log(e);
  let div = document.createElement('div');
  let retroT = '';
  if (e.RetroRealizada == 1){
    retroT = `<span>Retroalimentación aceptada</span>`;
  } else {
    if (e.RetroDisponible == 1){
      retroT = `
      Aceptar retroalignación
      <div class="switch">
        <label>
            <input type="checkbox" data-evaluationretro="${e.idEvaluaciones}" class="checkRetro">
            <span class="lever"></span>
        </label>
      </div>
      `;
    } else {
      retroT = e.MsgRetroDisponible;
    }
  }
  $(div).append(retroT);
  return div.outerHTML;
}

window.mainAdvanceSF = function(e){
  let div = document.createElement('div');
  let porcent = ((((e.CantMisEvaluadoresF) * 100) / e.CantMisEvaluadores) ).toFixed(2);
  let contentHTML = `
    <div class="row">
        <div class="col s12">
          <ul class="m-t-10">
              <li>
                  <div class="d-flex no-block align-items-center">
                      <div>
                          <span class="m-b-0 op-5">Completado</span>
                      </div>
                      <div class="ml-auto">
                          <span class="m-b-0">${porcent}%</span>
                      </div>
                  </div>
                  <div class="progress m-t-10" style="background-color: rgba(0,0,0,.1);">
                      <div class="determinate" style="width: ${porcent}%"></div>
                  </div>
              </li>
          </ul>
        </div>
      </div>`;
  $(div).append(contentHTML);
  return div.outerHTML;
}

$(document).on("click","[data-evaluation]",function(element){
  if (element.target.dataset.whitplanaction == 1) {
    aceptResultsEvaluation.style.display = "none";
    tx_planAction.style.display = "";
  } else {
    aceptResultsEvaluation.style.display = "";
    tx_planAction.style.display = "none";
  }
  const thisEv = element.target.dataset.evaluation;
  const thisEm = element.target.dataset.employee;
  viewDetail(thisEv,thisEm);
});

function viewFinalResults(ev, retro, employee, planA, dateIni, dateEnd){
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
  b_dateIni_PlanA.textContent = dateIni;
  b_dateEnd_PlanA.textContent = dateEnd;
  const thisEm = employee;
  const thisEv = ev;
  viewDetail(thisEv,thisEm);
}

async function viewDetail(evaluation, employee){
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
      openMMaxNoMinimizable('Resultados finales',dv);
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

function printPrincipalDataEvaluated(data){
  img_EmployeeSel.src = data.ImgEmpleado;
  _generalNoEmployee.textContent = data.NoEmpleado;
  _generalPosition_employed.textContent = data.Puesto;
  _generalLvl_employed.textContent = lvlEvaluated;
}

async function printFinalDataEvaluated(){
  let data = await getFinalDataEvaluated();
  printFinalTableGraph(data.values,data.group,data.finalResult);
  printTableFinalBestWorst(data.bestOrWorst);
}

function printFinalTableGraph(data,group,resFinal){
  if (table_final) {
    table_final.destroy();
  }
  table_final = new ej.grids.Grid({
    dataSource: data,
    columns: [
      { headerText: "Competencia", field: "competence",width: 70, textAlign: 'Center',},
      { headerText: "Calificación", field: "result", width: 70, textAlign: 'Center',},
    ],
  });
  table_final.appendTo("#total_General");
  _generalGroup.textContent = group;
  _generalQualification.textContent = resFinal;
  setTimeout(function () {
    printFinalGraph(data);
  }, 1500);
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
async function getConfigQuestionsEvaluated(ev,employee){
  const dataSend = {
    op: "getConfigQuestionsEvaluated",
    evaluation: ev,
    employee: employee
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    console.log(dataR);
    arrAnswersQuestion = dataR.AllAnswersQuestion;
    arrConfig = dataR.ConfigQ;
    lvlEvaluated = dataR.LvlEmp.NivelEvaluado;
    arrAllDetailEvaluated = dataR.allEvaluationDetail;
    return true;
  } else {
    return false;
  }
}

async function getGeneralDetailEvaluatedEmployeeSelected(ev, emp){
  let dataSend = {
    op: "getGeneralDetailEvaluatedEmployeeSelected",
    evaluation: ev,
    employee: emp
  }
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if(ajaxResponse !== undefined && ajaxResponse.Siguiente){
    const dataR = ajaxResponse.Data;
    const dataEm = ajaxResponse.DataEmployee;
    b_dateIni_PlanA.textContent = dataEm.PlanAFechaIni;
    b_dateEnd_PlanA.textContent = dataEm.PlanAFechaFin;
    mg_employee.value = ev;
    mg_evaluation.value = emp;
    img_EmployeeSel.src = dataEm.ImgEmpleado;
    _generalEmployee.textContent = dataEm.Nombre;
    _generalNoEmployee.textContent = dataEm.NoEmpleado;
    _generalPosition_employed.textContent = dataEm.Puesto;
    _generalLvl_employed.textContent = dataEm.NivelEvaluado;
    _generalGroup.textContent = dataEm.GrupoEvaluado;
    dataResults.set_currentGroup = dataEm.GrupoEvaluado;
    addObjectGeneralInfo(dataR);
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

function printTotalGeneral(){
  const result = dataResults.globalGeneral();
  const allGeneral = result.generalInfo;
  const strengths = result.mejores;
  const lessData = result.peores;
  let tableTabFinal = new Tabulator(`#total_General`,{
    layout:"fitColumns",
    data: allGeneral,
    columns: [
      {title: "COMPETENCIAS", field: "competence"},
      {title: "RESULTADO GLOBAL", field: "resultado", hozAlign:"center", width:150},
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
  const results = await dialogConfirmAlertify(title, comm);
  if (results) {
    acceptResultsEvaluation(req, worstCompetencesFinal);
  }
});

async function acceptResultsEvaluation(req, dataCompetences){
  const dataSend = {
    op: "acceptResultsEvaluation",
    evaluation: mg_employee.value,
    employee: mg_evaluation.value,
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
