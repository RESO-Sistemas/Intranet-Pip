  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

let tCommentsRequests, tCommentsAccepted;
document.addEventListener("DOMContentLoaded", function () {
  var tabObj = new ej.navigations.Tab();
  tabObj.appendTo("#tabs");

  loadInitialFunctions();
});

async function loadInitialFunctions() {
  getCommentsRequests();
  getCommentsRequestsAccepted();
}

async function getCommentsRequests() {
  let dataSend = {
    op: "getcommentsRequests",
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend);
  if (ajaxR !== undefined) {
    printCommentsRequests(ajaxR.Data);
  }
}

function printCommentsRequests(data) {
  if (tCommentsRequests) {
    tCommentsRequests.destroy();
  }
  tCommentsRequests = new ej.grids.Grid({
    dataSource: data,
    allowGrouping: true,
    allowPaging: true,
    allowTextWrap: true,
    columns: [
      { type: "checkbox", width: 25 },
      {
        field: "idComentariosFeed",
        headerText: "",
        width: 25,
        visible: false,
        sPrimaryKey: true,
      },
      { field: "Nombre", headerText: "EMPLEADO", width: 25 },
      { field: "Comentario", headerText: "COMENTARIO", width: 50 },
      { field: "Registro", headerText: "FECHA", width: 15 },
    ],
  });
  tCommentsRequests.appendTo("#tCommentsRequests");
}

async function verifyActionComments(action) {
  selectedRowIndexes = tCommentsRequests.getSelectedRowIndexes();
  // console.log(selectedRowIndexes);
  let cant = selectedRowIndexes.length;
  if (cant > 0) {
    let title = "";
    let comm = "";
    if (action == 1) {
      title = "¿Desea autorizar los comentarios seleccionados?";
    } else {
      title = "¿Desea rechazar los comentarios seleccionados?";
    }
    let resultD = await dialogConfirmSAlert(title);
    if (resultD) {
      executeActionComments(selectedRowIndexes, cant, action);
    }
  } else {
    // toastr.info(
    //   "Es necesario seleccionar al menos un comentario para poder continuar con la acción deseada."
    // );
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Es necesario seleccionar al menos un comentario para poder continuar con la acción deseada.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

async function executeActionComments(data, cant, action) {
  let dataSelected = [];
  for (var i = 0; i < cant; i++) {
    dataSelected.push(
      tCommentsRequests.dataSource[data[i]]["idComentariosFeed"]
    );
  }
  let dataSend = {
    op: "executeActionComments",
    data: dataSelected,
    action: action,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR !== undefined) {
    getCommentsRequests();
  }
}

async function getCommentsRequestsAccepted() {
  let dataS = {
    op: "getCommentsRequestsAccepted",
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataS);
  if (ajaxR !== undefined) {
    // console.log(ajaxR.Data);
    printCommentsRequestsAccepted(ajaxR.Data);
  }
}
const printCommentsRequestsAccepted = (data) => {
  if (tCommentsAccepted) {
    tCommentsAccepted.dataSource = data;
    tCommentsAccepted.refresh();
    return;
  }
  console.log(data);
  tCommentsAccepted = new ej.grids.Grid({
    dataSource: data,
    allowGrouping: true,
    allowPaging: true,
    allowTextWrap: true,
    columns: [
      { type: "checkbox", width: 25 },
      {
        field: "idComentariosFeed",
        headerText: "",
        width: 25,
        visible: false,
        sPrimaryKey: true,
      },
      { field: "Nombre", headerText: "EMPLEADO", width: 100 },
      { field: "Comentario", headerText: "COMENTARIO", width: 120 },
      { field: "Registro", headerText: "FECHA COMENTARIO", width: 80 },
      { field: "FechaRevisado", headerText: "FECHA AUTORIZADO", width: 80 },
    ],
  });
  tCommentsAccepted.appendTo("#tCommentsAccepted");
};

const verifyActionCommentsAC = async () => {
  selectedRowIndexes = tCommentsAccepted.getSelectedRowIndexes();
  let cant = selectedRowIndexes.length;
  if (cant > 0) {
    let comm = "";
    let title = "¿Desea rechazar los comentarios seleccionados?";
    let resultD = await dialogConfirmSAlert(title);
    if (resultD) {
      rejectCommentsF(selectedRowIndexes, cant);
    }
  } else {
    // toastr.info("Es necesario seleccionar al menos un comentario para poder continuar con la acción deseada.");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Es necesario seleccionar al menos un comentario para poder continuar con la acción deseada.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
};

const rejectCommentsF = async (data, cant) => {
  let dataSel = [];
  for (var i = 0; i < cant; i++) {
    dataSel.push(tCommentsAccepted.dataSource[data[i]]["idComentariosFeed"]);
  }
  let dataS = {
    op: "rejectCommentsF",
    data: dataSel,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataS, 1);
  if (ajaxR !== undefined) {
    getCommentsRequestsAccepted();
  }
};
