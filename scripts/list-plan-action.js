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
        `<button class="btn-ViewDetail" onclick="getPlanActionPerEmployee(${data[i]["NoEmpleado"]},'${data[i]["Nombre"]}')"><i class="fa-solid fa-list"></i></button>`
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
    table_planAction.fnAddData([
      data[i]["Titulo"],
      data[i]["MsgEstadoPlanA"],
      `<button class="btn-ViewDetail" onclick="window.location.href='plan-action.php?PA=${data[i]["idPlanesAccionEvaluacion"]}'"><i class="fa-solid fa-list"></i></button>`
    ])
  }
  $("#modal_plan_actions").modal("open");
}
