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

loadInitialFunctions();
async function loadInitialFunctions(){
  getMyPlansAction();
}

async function getMyPlansAction(){
  const dataSend = {
    op: "getMyPlansAction"
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);
  if (ajaxR !== undefined){
    const dataR = ajaxR.Data;
    printMyPlansAction(dataR);
  }
}
function printMyPlansAction(data){
  table_planAction.fnClearTable();
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      table_planAction.fnAddData([
        data[i]["Titulo"],
        `<button class="btn-ViewDetail" onclick="window.location.href='detail-plan-action.php?PA=${data[i]["idPlanesAccionEvaluacion"]}'"><i class="fa-solid fa-list"></i></button>`
      ]);
    }
  }
}
