let table_employees = $("#table-employees").dataTable({
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
let table_planAction = $("#table_planAction").dataTable({
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

const employee_Selected = document.getElementById('employee_Selected');

// Exponer la función para que funcione con onclick inline en los botones dinámicos de DataTable
window.getPlanActionPerEmployee = getPlanActionPerEmployee;

loadInitialFunctions();
async function loadInitialFunctions(){
  getEmployeesWhitPlanAction();
}

async function getEmployeesWhitPlanAction(){
  const dataSend = {
    op: "getEmployeesWhitPlanAction"
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);
  if(ajaxR !== undefined){
    const dataR = ajaxR.Data;
    printEmployeesWhitPlan(dataR);
  }
}

function printEmployeesWhitPlan(data){
  table_employees.fnClearTable();
  if(data.length > 0){
    for (var i = 0; i < data.length; i++) {
      table_employees.fnAddData([
        data[i]["NoEmpleado"],
        data[i]["Nombre"],
        data[i]["Sucursal"],
        data[i]["Puesto"],
        `<button class="btn btn-minimal btn-minimal-primary btn-sm" onclick="getPlanActionPerEmployee(${data[i]["NoEmpleado"]},'${data[i]["Nombre"]}')"><i class="fa-solid fa-list-check me-1"></i> Ver Planes</button>`
      ]);
    }
  }
}

async function getPlanActionPerEmployee(emp,nameEmp){
  const dataSend = {
    op: "getPlanActionPerEmployee",
    employee: emp
  }
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    employee_Selected.textContent = nameEmp;
    printPlanActionPerEmployee(dataR);
  }
}

function printPlanActionPerEmployee(data){
  table_planAction.fnClearTable();
  for (var i = 0; i < data.length; i++) {
    let badgeStatus = "";
    const pendingCount = Number(data[i]["CantidadAvancesPendientes"] || 0);
    if (data[i]["MsgEstadoPlanA"] === 'Plan de acción finalizado') {
      badgeStatus = `<span class="badge bg-success-subtle text-success"><i class="fa-solid fa-circle-check me-1"></i> Finalizado</span>`;
    } else if (pendingCount > 0) {
      badgeStatus = `<span class="badge bg-info-subtle text-info"><i class="fa-solid fa-user-check me-1"></i> ${pendingCount} pendiente(s) de revisión</span>`;
    } else {
      badgeStatus = `<span class="badge bg-warning-subtle text-warning"><i class="fa-solid fa-spinner me-1"></i> En Proceso</span>`;
    }

    table_planAction.fnAddData([
      data[i]["Titulo"],
      badgeStatus,
      `<button class="btn btn-minimal btn-minimal-primary btn-sm" onclick="window.location.href='plan-action.php?PA=${data[i]["idPlanesAccionEvaluacion"]}'"><i class="fa-solid fa-arrow-right-to-bracket me-1"></i> Entrar al Plan</button>`
    ])
  }

  // Abrir modal usando Bootstrap 5
  const modalEl = document.getElementById("modal_plan_actions");
  if (modalEl) {
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
      modal = new bootstrap.Modal(modalEl);
    }
    modal.show();
  }
}
