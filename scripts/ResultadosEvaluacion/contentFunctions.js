const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Evaluacion = urlParams.get("Ev");
const slc_evaluated_by = document.getElementById("slc_evaluated_by");
let principalTable,
  table_general_detail,
  table_qualificationsInd,
  charIndv,
  ev_strengths,
  ev_weaknesses,
  finalTableEvaluated,
  table_final,
  best_final,
  worst_final,
  final_graph;

loadAllFunctions();
async function loadAllFunctions() {
  await getDetailEvaluation();
  await getEmpleadosEvaluadosPorEv();
}
async function getDetailEvaluation() {
  let dataSend = { op: "getDetailEvaluation", evaluation: Evaluacion };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    ev_selected.textContent = dataR.Titulo;
  }
}

async function getEmpleadosEvaluadosPorEv() {
  let dataSend = {
    op: "getEmpleadosEvaluadosPorEv",
    idEvaluaciones: Evaluacion,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printEmpleadosEvaluadosPorEv(dataR);
  }
}
function printEmpleadosEvaluadosPorEv(data) {
  const list = document.getElementById('res-evaluados-list');
  const countEl = document.getElementById('res-list-count');
  if (!list) return;

  if (countEl) countEl.textContent = data.length + (data.length === 1 ? ' empleado' : ' empleados');

  if (data.length === 0) {
    list.innerHTML = `<div class="res-empty">
      <span class="ms">person_off</span>
      <p>No hay empleados evaluados para esta evaluación.</p>
    </div>`;
    return;
  }

  // Genera iniciales del nombre
  function initials(name) {
    if (!name) return '?';
    var parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }

  list.innerHTML = data.map(function(emp) {
    var ini = initials(emp.Empleado);
    var isComplete = !(emp.SinCompletar > 0);
    var statusBadge = isComplete
      ? `<span class="res-status-badge complete"><span class="ms ms-sm">check_circle</span> Completado</span>`
      : `<span class="res-status-badge pending"><span class="ms ms-sm">schedule</span> ${emp.Completadas}/${emp.SinCompletar}</span>`;

    var btnDetail = `<button class="res-action-btn detail" title="Ver detalle por evaluador" onclick="viewDetail('${emp.IdEvaluado}')">
      <span class="ms ms-sm">visibility</span>
    </button>`;

    var btnResults = isComplete
      ? `<button class="res-action-btn results" title="Ver resultado final" onclick="viewFinalResults('${emp.IdEvaluado}')">
          <span class="ms ms-sm">monitoring</span>
        </button>`
      : `<button class="res-action-btn results" title="Evaluación incompleta" disabled>
          <span class="ms ms-sm">monitoring</span>
        </button>`;

    return `<div class="res-row">
      <div class="res-row-avatar">${ini}</div>
      <div class="res-row-info">
        <div class="res-row-name">${emp.Empleado}</div>
      </div>
      <div class="res-row-status">${statusBadge}</div>
      <div class="res-row-actions">${btnDetail}${btnResults}</div>
    </div>`;
  }).join('');
}

async function viewDetail(employee) {
  let result = await getConfigQuestionsEvaluated(employee);
  if (result) {
    openDetailPanel();

    await getEvaluatedBy(employee);
    await getPrincipalDetailEvaluated(employee, 1);
    await getEvaluationDetailValues();
  }
}

window.openDetailPanel = function () {
  const panel = document.getElementById('detailContainer');
  const backdrop = document.getElementById('detailContainerBackdrop');
  if (!panel || !backdrop) return;

  panel.classList.add('is-open');
  backdrop.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeDetailPanel = function () {
  const panel = document.getElementById('detailContainer');
  const backdrop = document.getElementById('detailContainerBackdrop');
  if (!panel || !backdrop) return;

  panel.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  const isGeneralOpen = document.getElementById('modalGeneralDetail')?.classList.contains('is-open');
  if (!isGeneralOpen) {
    document.body.style.overflow = '';
  }
};

window.openGeneralPanel = function () {
  const panel = document.getElementById('modalGeneralDetail');
  const backdrop = document.getElementById('modalGeneralDetailBackdrop');
  if (!panel || !backdrop) return;

  panel.classList.add('is-open');
  backdrop.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeGeneralPanel = function () {
  const panel = document.getElementById('modalGeneralDetail');
  const backdrop = document.getElementById('modalGeneralDetailBackdrop');
  if (!panel || !backdrop) return;

  panel.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');

  // No desbloquear scroll si el otro panel sigue abierto
  const isDetailOpen = document.getElementById('detailContainer')?.classList.contains('is-open');
  if (!isDetailOpen) {
    document.body.style.overflow = '';
  }
};

async function getConfigQuestionsEvaluated(employee) {
  const dataSend = {
    op: "getConfigQuestionsEvaluated",
    evaluation: Evaluacion,
    employee: employee,
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    arrAnswersQuestion = dataR.AllAnswersQuestion;
    arrConfig = dataR.ConfigQ;
    lvlEvaluated = dataR.LvlEmp.NivelEvaluado;
    arrAllDetailEvaluated = dataR.allEvaluationDetail;
    return true;
  } else {
    return false;
  }
}

async function getEvaluatedBy(employee) {
  let dataSend = {
    op: "getEvaluatedBy",
    evaluation: Evaluacion,
    employee: employee,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 0);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printEvaluatedBy(dataR);
  }
}
function printEvaluatedBy(data) {
  slc_evaluated_by.innerHTML = "";
  data.forEach((d) => {
    let newElement = document.createElement("option");
    newElement.value = d.IdDetalle;
    newElement.textContent = d.Empleado;
    slc_evaluated_by.appendChild(newElement);
  });
  // dropdownParent apunta al offcanvas en lugar del modal
  $("#slc_evaluated_by").select2({
    dropdownParent: $("#detailContainer"),
    width: '100%'
  });
}

async function getPrincipalDetailEvaluated(employee, type) {
  let dataSend = {
    op: "getPrincipalDetailEvaluated",
    employee: employee,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Empleados, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    if (type == 1) {
      printPrincipalDetailEvaluated(dataR);
    } else {
      let resultEvaluators = await getListEvaluatorsDetail(employee);
      if (resultEvaluators) {
        openGeneralPanel();

        $("#selTypeResult").val("1").trigger("change");

        printFinalGeneralTableEvaluated(dataR);

        $("#gn_calculo").fadeOut();
        $("#gn_par_sub").fadeOut();
        $("#gn_moreInfo").fadeIn();
        printFinalDataEvaluated();
      }
    }
  }
}

async function printFinalDataEvaluated() {
  let data = await getFinalDataEvaluated();
  printFinalTableGraph(data.values, data.group, data.finalResult);
  printTableFinalBestWorst(data.bestOrWorst);
}

function printFinalTableGraph(data, group, resFinal) {
  if (table_final) {
    table_final.destroy();
  }
  table_final = new ej.grids.Grid({
    dataSource: data,
    columns: [
      { headerText: "Competencia", field: "competence", width: 70, textAlign: "Center" },
      { headerText: "Calificación", field: "result",    width: 70, textAlign: "Center" },
    ],
  });
  table_final.appendTo("#total_General");
  setTimeout(function () {
    printFinalGraph(data);

    // ── Actualizar badges del hero ──
    const badgeGroup = document.getElementById('res-hero-badge-group');
    const badgeScore = document.getElementById('res-hero-badge-score');
    if (badgeGroup) badgeGroup.textContent = `Grupo ${group}`;
    if (badgeScore) badgeScore.textContent = `${parseFloat(resFinal).toFixed(1)}/100`;

    // ── Mantener compatibilidad: actualizar tabla Syncfusion oculta ──
    const dv = document.querySelector("#finalTableEvaluated");
    if (dv) {
      const tr = dv.querySelectorAll("tr");
      if (tr.length > 2) {
        const allTd = tr[2].querySelectorAll("td");
        if (allTd.length > 5) {
          allTd[4].textContent = group;
          allTd[5].textContent = resFinal;
        }
      }
    }
  }, 1500);
}

function printTableFinalBestWorst(data) {
  if (best_final) {
    best_final.destroy();
  }
  if (worst_final) {
    worst_final.destroy();
  }
  best_final = new ej.grids.Grid({
    dataSource: data[0].bestCompetences,
    columns: [
      {
        headerText: "Competencia",
        field: "competence",
        width: 70,
        textAlign: "Center",
      },
    ],
  });
  best_final.appendTo("#table_strengths");
  worst_final = new ej.grids.Grid({
    dataSource: data[0].worstCompetences,
    columns: [
      {
        headerText: "Competencia",
        field: "competence",
        width: 70,
        textAlign: "Center",
      },
    ],
  });
  worst_final.appendTo("#table_areasForImprovement");
}

function printFinalGraph(data) {
  if (final_graph) {
    final_graph.destroy();
  }
  final_graph = new ej.charts.Chart(
    {
      isResponsive: true,
      primaryXAxis: {
        title: "Month",
        valueType: "Category",
      },
      primaryYAxis: {
        minimum: 0,
        maximum: 100,
        interval: 10,
        title: "Temperature in Celsius",
        labelFormat: "{value}",
      },
      series: [
        {
          dataSource: data,
          width: 2,
          xName: "competence",
          yName: "result",
          name: "Resultados",
          type: "Polar",
          drawType: "Area",
          fill: "rgba(0, 188, 212, 0.4)",
          opacity: 0.6,
          border: { width: 2, color: "#00BCD4" },
          marker: { visible: true, width: 8, height: 8, shape: "Circle", fill: "#00BCD4" },
        },
      ],
      title: "Evalución de Desempeño",
    },
    "#graph_total_General"
  );
}

async function printCalculationParSub() {
  $("#dv_ind_Par").empty();
  $("#dv_ind_Subordinado").empty();
  let result = await getDataCalculationParSub();
  if (result.dataPar.length > 0) {
    result.dataPar.forEach((dataPar, index) => {
      let contentHTML = `
<div class="col-12">
  <div class="row d-flex justify-content-center">
    <div class="col-12 text-center">
      <label class="form-label text-center">Par (${index + 1})</label>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-md-5">
      <div id="tablePar${index}"></div>
    </div>
  </div>
  <div class="row d-flex justify-content-center mb-4">
    <div class="col-12 col-md-7">
      <div id="ChartPar${index}"></div>
    </div>
  </div>
</div>`;
      $("#dv_ind_Par").append(contentHTML);
      printResultsPerId(`tablePar${index}`, dataPar);
      setTimeout(function () {
        printChartPerId(`ChartPar${index}`, dataPar);
      }, 1000);
    });
  } else {
    $("#dv_ind_Par").append(
      "<label class='form-control' style='text-align: center'> Sin resultados </label>"
    );
  }
  if (result.dataSub.length > 0) {
    result.dataSub.forEach((dataSub, index) => {
      let contentHTML = `
<div class="col-12">
  <div class="row d-flex justify-content-center">
    <div class="col-12 text-center">
      <label class="form-label text-center">Subordinado (${index + 1})</label>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-md-5">
      <div id="tableSub${index}"></div>
    </div>
  </div>
  <div class="row d-flex justify-content-center mb-4">
    <div class="col-12 col-md-7">
      <div id="ChartSub${index}"></div>
    </div>
  </div>
</div>`;
      $("#dv_ind_Subordinado").append(contentHTML);
      printResultsPerId(`tableSub${index}`, dataSub);
      setTimeout(function () {
        printChartPerId(`ChartSub${index}`, dataSub);
      }, 1000);
    });
  } else {
    $("#dv_ind_Subordinado").append(
      "<label class='form-control' style='text-align: center'> Sin resultados </label>"
    );
  }
}

async function printCalculationByTypeOfEvaluator() {
  const data = await getDataCalculationByTypeOfEvaluator();
  $("#dvFisrtPage").empty();
  if (data.dataJe.length > 0) {
    let contentJe = `
<div class="col-12">
  <div class="row d-flex justify-content-center">
    <div class="col-12">
      <label class="form-label text-center" >Calificación del Jefe:</label>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-md-5">
      <div id="tableJeGbl"></div>
    </div>
  </div>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-12 col-md-7">
      <div id="ChartJeGbl"></div>
    </div>
  </div>
</div>
`;
    $("#dvFisrtPage").append(contentJe);
    printResultsPerId("tableJeGbl", data.dataJe);
    setTimeout(function () {
      printChartPerId("ChartJeGbl", data.dataJe);
    }, 1000);
  }
  if (data.dataAuto.length > 0) {
    let contentAu = `
      <div class="col-12">
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <label class="form-label text-center" >Calificación Auto:</label>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-5">
           <div id="tableAuGbl"></div>
          </div>
        </div>
        <div class="row d-flex justify-content-center mt-4">
          <div class="col-12 col-md-7">
              <div id="ChartAuGbl"></div>
          </div>
        </div>
      </div>`;
    $("#dvFisrtPage").append(contentAu);
    printResultsPerId("tableAuGbl", data.dataAuto);
    setTimeout(function () {
      printChartPerId("ChartAuGbl", data.dataAuto);
    }, 1000);
  }
  if (data.dataPar.length > 0) {
    let contentAu = `
<div class="col-12">
  <div class="row d-flex justify-content-center">
    <div class="col-12">
      <label class="form-label text-center">Calificación de los pares:</label>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-md-5">
      <div id="tableParGbl"></div>
    </div>
  </div>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-12 col-md-7">
      <div id="ChartParGbl"></div>
    </div>
  </div>
</div>`;
    $("#dvFisrtPage").append(contentAu);
    printResultsPerId("tableParGbl", data.dataPar);
    setTimeout(function () {
      printChartPerId("ChartParGbl", data.dataPar);
    }, 1000);
  }
  if (data.dataSub.length > 0) {
    let contentAu = `
<div class="col-12">
  <div class="row d-flex justify-content-center">
    <div class="col-12">
      <label class="form-label text-center">Calificación de los subordinados:</label>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-md-5">
      <div id="tableSubGbl"></div>
    </div>
  </div>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-12 col-md-7">
      <div id="ChartSubGbl"></div>
    </div>
  </div>
</div>`;
    $("#dvFisrtPage").append(contentAu);
    printResultsPerId("tableSubGbl", data.dataSub);
    setTimeout(function () {
      printChartPerId("ChartSubGbl", data.dataSub);
    }, 1000);
  }
}

async function getListEvaluatorsDetail(employee) {
  const dataSend = {
    op: "getListEvaluatorsDetail",
    employee: employee,
    evaluation: Evaluacion,
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

function printPrincipalDetailEvaluated(data) {
  const nombre   = data[0].Nombre;
  const area     = data[0].Sucursal;
  const puesto   = data[0].Puesto;
  const evaluador = slc_evaluated_by.options[slc_evaluated_by.selectedIndex].text;

  // ── Hero del modal detailContainer ──
  const heroName = document.getElementById('detailContainerLabel');
  const heroMeta = document.getElementById('res-detail-hero-meta');
  if (heroName) heroName.textContent = nombre;
  if (heroMeta) heroMeta.textContent = puesto;

  // ── Info card bajo el hero ──
  const infoGrid = document.getElementById('res-emp-info-grid-detail');
  if (infoGrid) {
    infoGrid.innerHTML = `
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Área</div>
        <div class="res-emp-info-val" id="res-info-area">${area}</div>
      </div>
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Evaluado</div>
        <div class="res-emp-info-val">${nombre}</div>
      </div>
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Puesto</div>
        <div class="res-emp-info-val">${puesto}</div>
      </div>
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Evaluador</div>
        <div class="res-emp-info-val" id="res-info-evaluador">${evaluador}</div>
      </div>`;
  }

  // ── Grid Syncfusion oculto (necesario para la lógica de cambio de evaluador) ──
  let dataT = [
    { Area: area, Evaluado: nombre, Puesto: puesto, Evaluador: evaluador },
  ];
  if (table_general_detail) {
    table_general_detail.destroy();
  }
  table_general_detail = new ej.grids.Grid({
    dataSource: dataT,
    columns: [
      { headerText: "Área",     field: "Area",     width: 70, textAlign: "Center" },
      { headerText: "Evaluado", field: "Evaluado", width: 70, textAlign: "Center" },
      { headerText: "Puesto",   field: "Puesto",   width: 70, textAlign: "Center" },
      { headerText: "Evaluador",field: "Evaluador",width: 70, textAlign: "Center" },
    ],
  });
  table_general_detail.appendTo("#table_general_detail");
}

async function getEvaluationDetailValues() {
  let result = await getDetailPerEvaluator(slc_evaluated_by.value);
  await printResultsPerEvaluator(result.results);
  printStrengthsAndAreasOfOpportunity(result.bestOrWorst);
}

function printStrengthsAndAreasOfOpportunity(data) {
  if (ev_strengths) {
    ev_strengths.destroy();
  }
  if (ev_weaknesses) {
    ev_weaknesses.destroy();
  }
  ev_strengths = new ej.grids.Grid({
    dataSource: data[0].bestCompetences,
    columns: [
      {
        headerText: "Competencia",
        field: "competence",
        width: 70,
        textAlign: "Center",
      },
    ],
  });
  ev_strengths.appendTo("#ev_strengths");
  ev_weaknesses = new ej.grids.Grid({
    dataSource: data[0].worstCompetences,
    columns: [
      {
        headerText: "Competencia",
        field: "competence",
        width: 70,
        textAlign: "Center",
      },
    ],
  });
  ev_weaknesses.appendTo("#ev_weaknesses");
}

async function printResultsPerEvaluator(data) {
  if (table_qualificationsInd) {
    table_qualificationsInd.destroy();
  }
  table_qualificationsInd = new ej.grids.Grid({
    dataSource: data,
    columns: [
      {
        headerText: "Competencia",
        field: "competence",
        width: 70,
        textAlign: "Center",
      },
      {
        headerText: "Calificación",
        field: "result",
        width: 70,
        textAlign: "Center",
      },
    ],
  });
  table_qualificationsInd.appendTo("#table_qualifications");
  printChart(data);
}

function printResultsPerId(idTable, data) {
  let table = new ej.grids.Grid({
    dataSource: data,
    columns: [
      {
        headerText: "Competencia",
        field: "competence",
        width: 70,
        textAlign: "Center",
      },
      {
        headerText: "Calificación",
        field: "result",
        width: 70,
        textAlign: "Center",
      },
    ],
  });
  table.appendTo(`#${idTable}`);
}

function printChartPerId(id, data) {
  let charIndv = new ej.charts.Chart(
    {
      isResponsive: true,
      primaryXAxis: {
        title: "Month",
        valueType: "Category",
      },
      primaryYAxis: {
        minimum: 0,
        maximum: 100,
        interval: 10,
        title: "Temperature in Celsius",
        labelFormat: "{value}",
      },
      series: [
        {
          dataSource: data,
          width: 2,
          xName: "competence",
          yName: "result",
          name: "Resultados",
          type: "Polar",
          drawType: "Area",
          fill: "rgba(0, 188, 212, 0.4)",
          opacity: 0.6,
          border: { width: 2, color: "#00BCD4" },
          marker: { visible: true, width: 8, height: 8, shape: "Circle", fill: "#00BCD4" },
        },
      ],
      title: "Evalución de Desempeño",
    },
    `#${id}`
  );
}

function printChart(data) {
  if (charIndv) {
    charIndv.destroy();
  }
  charIndv = new ej.charts.Chart(
    {
      isResponsive: true,
      primaryXAxis: {
        title: "Month",
        valueType: "Category",
      },
      primaryYAxis: {
        minimum: 0,
        maximum: 100,
        interval: 10,
        title: "Temperature in Celsius",
        labelFormat: "{value}",
      },
      series: [
        {
          dataSource: data,
          width: 2,
          xName: "competence",
          yName: "result",
          name: "Resultados",
          type: "Polar",
          drawType: "Area",
          fill: "rgba(0, 188, 212, 0.4)",
          opacity: 0.6,
          border: { width: 2, color: "#00BCD4" },
          marker: { visible: true, width: 8, height: 8, shape: "Circle", fill: "#00BCD4" },
        },
      ],
      title: "Evalución de Desempeño",
    },
    "#indvChar"
  );
}

async function viewFinalResults(employee) {
  let result = await getConfigQuestionsEvaluated(employee);
  if (result) {
    await getPrincipalDetailEvaluated(employee, 2);
  }
}

async function printFinalGeneralTableEvaluated(dataEmp) {
  let resultTable = await getDataTableGeneralEvaluated(dataEmp[0]);

  // ── Hero del modalGeneralDetail ──
  const heroName = document.getElementById('modalGeneralDetailLabel');
  const heroMeta = document.getElementById('res-hero-meta-gn');
  const infoGrid = document.getElementById('res-emp-info-grid-gn');
  const infoWrap = document.getElementById('finalTableEvaluated-wrap');
  if (heroName) heroName.textContent = resultTable[0].name;
  if (heroMeta) heroMeta.textContent = `${resultTable[0].job}  ·  No. ${resultTable[0].noEmployee}  ·  Nivel: ${resultTable[0].level}`;
  if (infoGrid) {
    infoGrid.innerHTML = `
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Empleado</div>
        <div class="res-emp-info-val">${resultTable[0].name}</div>
      </div>
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">No. Empleado</div>
        <div class="res-emp-info-val">${resultTable[0].noEmployee}</div>
      </div>
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Puesto</div>
        <div class="res-emp-info-val">${resultTable[0].job}</div>
      </div>
      <div class="res-emp-info-cell">
        <div class="res-emp-info-key">Nivel</div>
        <div class="res-emp-info-val">${resultTable[0].level}</div>
      </div>`;
    if (infoWrap) infoWrap.style.display = '';
  }

  // ── Grid Syncfusion oculto (necesario para que printFinalTableGraph actualice la fila) ──
  if (finalTableEvaluated) {
    finalTableEvaluated.destroy();
  }
  finalTableEvaluated = new ej.grids.Grid({
    dataSource: resultTable,
    columns: [
      { headerText: "Empleado Evaluado", field: "name",       width: 70, textAlign: "Center" },
      { headerText: "No.Empleado",        field: "noEmployee", width: 70, textAlign: "Center" },
      { headerText: "Puesto (Momento cuándo fue creado la evaluación)",             field: "job",        width: 70, textAlign: "Center" },
      { headerText: "Nivel del Evaluado (Momento cuándo fue creado la evaluación)", field: "level",      width: 100, textAlign: "Center" },
      { headerText: "Grupo",               field: "",           width: 70, textAlign: "Center" },
      { headerText: "Calificación General",field: "",           width: 70, textAlign: "Center" },
    ],
  });
  finalTableEvaluated.appendTo("#finalTableEvaluated");
}
