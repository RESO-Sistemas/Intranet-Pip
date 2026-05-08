
const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Evaluacion = urlParams.get('Ev');

import { ResultadosEv } from "./DataLevels.js";
const dataLevels = new ResultadosEv;

const td_area = document.querySelector('#td_area'),
      td_evaluated = document.querySelector('#td_evaluated'),
      td_position = document.querySelector('#td_position'),
      slc_evaluated_by = document.querySelector('#slc_evaluated_by'),
      td_evaluator = document.querySelector('#td_evaluator'),
      ev_strengths = document.querySelector('#ev_strengths'),
      ev_weaknesses = document.querySelector('#ev_weaknesses'),
      dv_GeneralInfo = document.querySelector('#dv_GeneralInfo'),
      _generalEmployee = document.querySelector("#_generalEmployee"),
      _generalGroup = document.querySelector("#_generalGroup"),
      _generalNoEmployee = document.querySelector("#_generalNoEmployee"),
      _generalQualification = document.querySelector("#_generalQualification"),
      dv_ind_Par = document.querySelector("#dv_ind_Par"),
      dv_ind_Subordinado = document.querySelector("#dv_ind_Subordinado"),
      _generalPosition_employed = document.querySelector("#_generalPosition_employed"),
      _generalLvl_employed = document.querySelector("#_generalLvl_employed"),
      ev_selected = document.querySelector("#ev_selected")
      // table_general_detail = document.querySelector("#table_general_detail")
      ;

let teableResGlobal = $("#teableResGlobal").dataTable({
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

loadAllFunctions();
async function loadAllFunctions(){
  await getDetailEvaluation();
  await getEmpleadosEvaluadosPorEv();
}
async function getDetailEvaluation(){
  let dataSend = {op: "getDetailEvaluation", evaluation: Evaluacion};
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    ev_selected.textContent = dataR.Titulo;
  }
}

async function getEmpleadosEvaluadosPorEv(){
  let dataSend = {
    op: "getEmpleadosEvaluadosPorEv",
    idEvaluaciones: Evaluacion
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printEmpleadosEvaluadosPorEv(dataR);
  }
}
function printEmpleadosEvaluadosPorEv(data){
  teableResGlobal.fnClearTable();
  data.forEach( d => {
    teableResGlobal.fnAddData([
      d.Empleado,
      `<a class="btn-ViewDetail cl-evaluated" data-emp_evaluated="${d.IdEvaluado}"><i class="fa-solid fa-info"></i></a>`,
      `<a class="btn-ViewDetail general-evaluated" data-emp_general="${d.IdEvaluado}"><i class="fa-solid fa-info"></i></a>`
    ])
  });
}

$(document).on("click",".general-evaluated",async function(e){
  let thisEmployee = e.target.dataset.emp_general;
  if (thisEmployee !== undefined) {
    const hd = "";
    let dv = "container-generalDetail";
    await openMMaxNoMinimizable(hd,dv);
    await getGeneralDetailEvaluated(thisEmployee);
  }
});
async function getGeneralDetailEvaluated(employee){
  let dataSend = {
    op: "getGeneralDetailEvaluated",
    employee: employee,
    evaluation: Evaluacion
  }
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if(ajaxResponse !== undefined && ajaxResponse.Siguiente){
    const dataR = ajaxResponse.Data;
    const dataEm = ajaxResponse.DataEmployee;
    console.log(dataEm);
    _generalEmployee.textContent = dataEm.Nombre;
    _generalNoEmployee.textContent = dataEm.NoEmpleado;
    _generalPosition_employed.textContent = dataEm.Puesto;
    _generalLvl_employed.textContent = dataEm.NivelEvaluado;
    _generalGroup.textContent = dataEm.GrupoEvaluado;
    dataLevels.set_currentGroup = dataEm.GrupoEvaluado;
    addObjectGeneralInfo(dataR);
  }
}
function addObjectGeneralInfo(data){
  dataLevels.cleanGeneral();
  let arrAllInfo = [];
  data.forEach( d => {
    let calNumber = 0;
    let typeEv = "";
    if (d.CalificacionEsperado == "A") {
      calNumber = dataLevels.calEsperadoA(d.Calificacion);
    } else if (d.CalificacionEsperado == "B"){
      calNumber = dataLevels.calEsperadoB(d.Calificacion);
    } else if (d.CalificacionEsperado == "C"){
      calNumber = dataLevels.calEsperadoC(d.Calificacion);
    } else if (d.CalificacionEsperado == "D"){
      calNumber = dataLevels.calEsperadoD(d.Calificacion);
    }
    if (d.JefeEvalua == 1 && d.AutoEvalua == 0 && d.ParEvalua == 0 && d.SubordinadoEvalua == 0) {
      dataLevels.addGeneralJefe(d.Competencia,calNumber.Calificacion,typeEv,d.IdCompetencia,
                                d.CalificacionEsperado,d.Calificacion);
    } else if (d.JefeEvalua == 0 && d.AutoEvalua == 1 && d.ParEvalua == 0 && d.SubordinadoEvalua == 0) {
      dataLevels.addGeneralAuto(d.Competencia,calNumber.Calificacion,typeEv,d.IdCompetencia,
                                d.CalificacionEsperado,d.Calificacion);
    } else if (d.JefeEvalua == 0 && d.AutoEvalua == 0 && d.ParEvalua == 1 && d.SubordinadoEvalua == 0) {
      dataLevels.addGeneralPar(d.Competencia,calNumber.Calificacion,3,d.IdCompetencia,
                                d.CalificacionEsperado,d.EvaluacionDetalle,d.Calificacion);
    } else if (d.JefeEvalua == 0 && d.AutoEvalua == 0 && d.ParEvalua == 0 && d.SubordinadoEvalua == 1) {
      dataLevels.addGeneralSub(d.Competencia,calNumber.Calificacion,4,d.IdCompetencia,
                                d.CalificacionEsperado,d.EvaluacionDetalle,d.Calificacion);
    }
    arrAllInfo.push({
      idCompetence: d.IdCompetencia,
      value: calNumber.Calificacion,
      competence: d.Competencia
    });
  });
  dataLevels.AddGeneralInfo(arrAllInfo);
  printGeneralInfo();
  printParIndividual();
  printIndSubordinado();
  printTotalGeneral();
}

function printTotalGeneral(){
  const result = dataLevels.globalGeneral();
  const allGeneral = result.generalInfo;
  const strengths = result.mejores;
  const lessData = result.peores;
  $("#table_areasForImprovement").empty();
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

function printIndSubordinado(){
  dv_ind_Subordinado.innerHTML = "";
  let contenidoHTML = "";
  const result = dataLevels.generalSubordinadoIndividual();
  const resData = result.data;
  if (resData.length > 0) {
    for (var i = 0; i < resData.length; i++) {
      console.log(resData[i]);
      let id = `sub_No${i}`;
      let idgraph = `dv_graphSub${i}`;
      contenidoHTML = `
        <div class="col s12">
          <div class="row">
            <div class="col s12" style="text-align:center">
              <h5>SUBORDINADO: ${ i + 1 }</h5>
              <hr>
            </div>
            <div class="col s4">
              <div id="sub_No${i}"></div>
            </div>
            <div class="col s8">
              <div id="dv_graphSub${i}" style="height:580px;overflow-x:scroll;"></div>
            </div>
          </div>
        </div>
      `;
      $("#dv_ind_Subordinado").append(contenidoHTML);
      generalIndividual(id,resData[i]);
      printChartInd(idgraph,resData[i]);
    }
  } else {
    contenidoHTML = `
      <div class="col s12" style="text-align: center">
        <h5>Sin registros</h5>
      </div>
    `;
    $("#dv_ind_Subordinado").append(contenidoHTML);
  }
}

$(document).on("click","#tab_PyS",function(){
  printParIndividual();
  printIndSubordinado();
});

function printParIndividual(){
  dv_ind_Par.innerHTML = "";
  let contenidoHTML = "";
  const result = dataLevels.generalParIndividual();
  const resData = result.data;
  if (resData.length > 0) {
    for (var i = 0; i < resData.length; i++) {
      let id = `par_No${i}`;
      let idgraph = `dv_graphPar${i}`;
      contenidoHTML = `
        <div class="col s12">
          <div class="row">
            <div class="col s12" style="text-align:center">
              <h5>PAR: ${ i + 1 }</h5>
              <hr>
            </div>
            <div class="col s12 m4">
              <div id="par_No${i}"></div>
            </div>
            <div class="col s12 m8">
              <div id="dv_graphPar${i}" style="height:580px;overflow-x:scroll;"></div>
            </div>
          </div>
        </div>
      `;
      $("#dv_ind_Par").append(contenidoHTML);
      generalIndividual(id,resData[i]);
      printChartInd(idgraph,resData[i]);
    }
  } else {
    contenidoHTML = `
      <div class="col s12" style="text-align: center">
        <h5>Sin registros</h5>
      </div>
    `;
    $("#dv_ind_Par").append(contenidoHTML);
  }
}
function printGeneralInfo(){
  dv_GeneralInfo.innerHTML = "";
  let contHTML = "";
  const resultJefe = dataLevels.resultadoGeneralJefe();
  const resultAuto = dataLevels.resultadoGeneralAuto();
  if (resultJefe.length > 0) {
    let type = "JE";
    let graph = "graphJE";
    let contHTMLJefe = `
      <div class="col s12">
        <div style="">
          <div class="row" style="">
            <div class="col s12" style="">
              <h5 style="color:red;text-align: center">${resultAuto[0].typeEmployee}</h5>
            </div>
            <div class="col s12 m5">
              <div id="dv_TableGenJE"></div>
            </div>
            <div class="col s12 m7">
              <div id="graphJE" style="height:580px;overflow-x:scroll;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    $("#dv_GeneralInfo").append(contHTMLJefe);
    printTableGeneral(type,resultJefe);
    printChartInd(graph,resultJefe);
  }
  if (resultAuto.length > 0) {
    let type = "AU";
    let graph = "graphAU";
    let contHTMLUAuto = `
      <div class="col s12">
        <div style="">
          <div class="row" style="">
            <div class="col s12" style="">
              <h5 style="color:red;text-align: center">${resultAuto[0].typeEmployee}</h5>
            </div>
            <div class="col s12 m5">
              <div id="dv_TableGenAU"></div>
            </div>
            <div class="col s12 m7">
              <div id="graphAU" style="height:580px;overflow-x:scroll;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    $("#dv_GeneralInfo").append(contHTMLUAuto);
    printTableGeneral(type,resultAuto);
    printChartInd(graph,resultAuto);
  }
  const result = dataLevels.infoGeneralCalculado();
  result.forEach( res => {
    contHTML = `
      <div class="col s12">
        <div style="">
          <div class="row" style="">
            <div class="col s12" style="">
              <h5 style="color:#df040a;text-align: center">${res.typeEmployee}</h5>
            </div>
            <div class="col s12 m5">
              <div id="dv_TableGen${res.typeC}"></div>
            </div>
            <div class="col s12 m7">
              <div id="graph${res.typeC}" style="height:580px;overflow-x:scroll;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    $("#dv_GeneralInfo").append(contHTML);
    let graph = `graph${res.typeC}`
    printTableGeneral(res.typeC,res.data);
    printChartInd(graph,res.data);
  });
  _generalQualification.textContent = dataLevels.calificacionFinal();
}

function generalIndividual(id, data){
  console.log(id);
  let tablePar = new Tabulator(`#${id}`,{
    layout:"fitColumns",
    data: data,
    columns: [
      {title: "COMPETENCIA", field: "competence"},
      {title: "ESPERADO", field: "esperado"},
      {title: "REAL", field: "original"},
      {title: "CALIFICACIÓN" , field: "resultado", bottomCalc:"avg"}
    ],
  });
}

function printTableGeneral(type,data){
  console.log(data);
    let tableTabJE = new Tabulator(`#dv_TableGen${type}`,{
      layout:"fitColumns",
      data: data,
      columns: [
        {title: "COMPETENCIA", field: "competence"},
        {title: "ESPERADO", field: "esperado"},
        {title: "REAL", field: "original"},
        {title: "CALIFICACIÓN" , field: "resultado", bottomCalc:"avg"}
      ],
    });
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
$(document).on("click",".cl-evaluated",async function(e){
  let thisEmployee = e.target.dataset.emp_evaluated;
  await viewDetail(thisEmployee);
});
async function viewDetail(employee){
  let dv = "detailContainer";
  let hd = "";
  await openMMaxNoMinimizable(hd,dv);
  await getEvaluatedBy(employee);
  await getPrincipalDetailEvaluated(employee);
  await getEvaluationDetail();
}
async function getEvaluatedBy(employee){
  let dataSend = {
    op: "getEvaluatedBy",
    evaluation: Evaluacion,
    employee: employee
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 0);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printEvaluatedBy(dataR);
  }
}
function printEvaluatedBy(data){
  slc_evaluated_by.innerHTML = "";
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdDetalle;
    newElement.textContent = d.Empleado;
    slc_evaluated_by.appendChild(newElement);
  });
  $("#slc_evaluated_by").formSelect();
}

async function getPrincipalDetailEvaluated(employee){
  let dataSend = {
    op: "getPrincipalDetailEvaluated",
    employee: employee
  };
  const ajaxResponse = await pAjaxAsync(url_m_Empleados, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printPrincipalDetailEvaluated(dataR);
  }
}
function printPrincipalDetailEvaluated(data){
  let dataT = [{
    Area: data[0].Sucursal,
    Evaluado: data[0].Nombre,
    Puesto: data[0].Puesto,
    Evaluador: slc_evaluated_by.options[slc_evaluated_by.selectedIndex].text
  }];
  // table_general_detail.innerHTML = "";
  let tableTab = new Tabulator("#table_general_detail", {
    layout:"fitColumns",
    responsiveLayout:"collapse",
    data: dataT,
    columns:[
      { title: "Área", field: "Area"},
      { title: "Evaluado", field: "Evaluado"},
      { title: "Puesto", field: "Puesto"},
      { title: "Evaluador", field: "Evaluador"}
    ],
  });
}

$(document).on("change","#slc_evaluated_by",async function(){
  const dv = document.querySelector('#table_general_detail');
  const dvtext = document.querySelector('.tabulator-cell[tabulator-field="Evaluador"]');
  dvtext.textContent = slc_evaluated_by.options[slc_evaluated_by.selectedIndex].text;
  await getEvaluationDetail();
});
async function getEvaluationDetail(){
  let graphData = [];
  let dataSend = {
    op: "getEvaluationDetail",
    idEvaluated: slc_evaluated_by.value
  };
  dataLevels.cleanInfoEvaluation();
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    const dataLvl = ajaxResponse.DataLvl;
    dataR.forEach( d => {
      let calNumber;
      if (d.CalificacionEsperado == "A") {
        calNumber = dataLevels.calEsperadoA(d.Calificacion);
      } else if (d.CalificacionEsperado == "B"){
        calNumber = dataLevels.calEsperadoB(d.Calificacion);
      } else if (d.CalificacionEsperado == "C"){
        calNumber = dataLevels.calEsperadoC(d.Calificacion);
      } else if (d.CalificacionEsperado == "D"){
        calNumber = dataLevels.calEsperadoD(d.Calificacion);
      }
      graphData.push({
        x: d.Competencia,
        y: calNumber.Calificacion
      });
      dataLevels.addInfoEvaluation(d.Competencia,calNumber.Calificacion);
    });
    printTableResults(dataR);
    printChart(graphData);
    printStrengthsAndAreasOfOpportunity();
  }
}

function printStrengthsAndAreasOfOpportunity(){
  $("#ev_weaknesses").empty();
  const less = dataLevels.peoresCompetencias();
  const better = dataLevels.mejoresCompetencias();
  if (less.length > 0){
    let tableLessTab = new Tabulator("#ev_weaknesses",{
      layout:"fitColumns",
      data: less,
      columns: [
        {title: "COMPETENCIAS", field: "competence"},
      ],
    });
  } else {
    $("#ev_weaknesses").append("Actualmente, el evaluado no cuenta con áreas con muy baja calificación.");
  }
  let tableBetterTab = new Tabulator("#ev_strengths",{
    layout:"fitColumns",
    data: better,
    columns: [
      {title: "COMPETENCIAS", field: "competence"},
    ],
  });
}
function printTableResults(dataR){
  var table = new Tabulator("#table_qualifications", {
      layout:"fitColumns",
      data: dataR,
      columns:[
      {title:"Competencia", field:"Competencia"},
      {title:"Resultado", field:"Calificacion", formatter:function(cell, formatterParams){
        let thisV = cell.getValue();
        let calEsperado = cell.getData().CalificacionEsperado;
        let competencia = cell.getData().Competencia;
        let calNumber;
        if (calEsperado == "A") {
          calNumber = dataLevels.calEsperadoA(thisV);
        } else if (calEsperado == "B"){
          calNumber = dataLevels.calEsperadoB(thisV);
        } else if (calEsperado == "C"){
          calNumber = dataLevels.calEsperadoC(thisV);
        } else if (calEsperado == "D"){
          calNumber = dataLevels.calEsperadoD(thisV);
        }
        return `${calNumber.Calificacion} - ${thisV}`;
      }}
    ],
  });
}

function printChart(data){
  var chart = new ej.charts.Chart({
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
          xName: 'x', yName: 'y',
          name: 'Resultados',
          // Series type as Polar series
          type: 'Polar',
          // Series draw type as spline
          drawType: 'Line'
      }],
      title: 'Evalución de Desempeño'
  }, '#element');
}


$(document).on("click","#tab_FyA",function(){
  printTotalGeneral();
});

$(document).on("click","#tab_calculo",function(){
  printGeneralInfo();
});
