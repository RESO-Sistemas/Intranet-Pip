// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});


  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="

);



const myKeysValues = window.location.search;

const urlParams = new URLSearchParams(myKeysValues);

const gblEvaluation = urlParams.get("EV");



const gblConfigEv = {

  branch: document.getElementById("listBranch_sel"),

  switchContainer: document.getElementById("switchContainer"),

  typeOption: document.getElementById("swTypeOption"),

  cardBranch: document.getElementById("card_branch"),

  typeSelBranch: document.getElementById("sel_typeSelBranch"),

  saveConfigInitial: document.getElementById("btn_saveConfig"),

  card_config: document.getElementById("card_configBr"),

};



const contentAfter_SelBranch = {

  // card_principal: document.getElementById('card_principalContent'),

  card_listBranch: document.getElementById("card_showBranch"),

  card_employees: document.getElementById("card_contentEmployees"),

  btn_OpenNewEv: document.getElementById("openNewEv"),

  btn_publishEv: document.getElementById("publishEvaluation"),

  card_searchTBranches: document.getElementById("card_searchTableBranch"),

};

loadInitialFunctions();

async function loadInitialFunctions() {
  getInitialConfigEvaluation();
  getAllActiveEmployees();
  await getListAllBranchEmp();
}

async function getListAllBranchEmp() {

  let dataSend = {

    op: "getListBranchInEvaluation",

    ev: gblEvaluation,

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if (ajaxR !== undefined) {

    allBranch = ajaxR.Data;

    groupBranches(ajaxR.Data);

  }

}



function groupBranches(data) {

  if (data.length > 0) {

    let contador = 0;

    let contentHTML = "";

    let tempBranch = [];

    for (var i = 0; i < data.length; i += 5) {

      var subArray = data.slice(i, i + 5);

      allgroupBranch.push(subArray);

    }

    printListAllBranchEmp();

  } else {

    // toastr.info(

    //   "No se han encontrado sucursales dentro del sistema, inténtelo nuevamente."

    // );

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No se han encontrado sucursales dentro del sistema, inténtelo nuevamente.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

}



function printListAllBranchEmp() {

  let contentHTML = "";

  if (allgroupBranch.length > 0) {

    allgroupBranch.forEach((group, i) => {

      let textHTML = "";

      group.forEach((branch) => {

        textHTML += ` ${branch.Sucursal} -`;

      });

      let finalText = textHTML.slice(0, -1);

      contentHTML += `<option value="${i}">${finalText}</option>`;

    });

  }

  $("#selct_AllBranch").append(contentHTML);
  $("#selct_AllBranch").select2({
    width: '100%'
  });
  checkTemporaryDataEvaluation();

}



// $(document).on("click","#btn_filter", function(){

//   if ($("#selct_AllBranch").val().length > 0) {

//     checkTemporaryDataEvaluation();

//   } else {

//     toastr.info("Es necesario ingresar al menos una sucursal para filtrar los resultados.");

//   }

// });



$(document).on("change", "#selct_AllBranch", function () {

  checkTemporaryDataEvaluation();

});



async function checkTemporaryDataEvaluation() {

  let valueSel = $("#selct_AllBranch").val();

  let branchSel = allgroupBranch[valueSel];

  let arrSendB = [];

  // Si hay un grupo seleccionado en el filtro, usar esas sucursales
  if (branchSel && branchSel.length > 0) {
    branchSel.forEach((b) => {
      arrSendB.push(b.IdSucursal);
    });
  } else {
    // Si no hay filtro seleccionado, usar todas las sucursales conocidas
    allBranch.forEach((b) => {
      arrSendB.push(b.IdSucursal);
    });
  }

  if (arrSendB.length === 0) {
    // No hay sucursales en el sistema, no hacer la petición
    return;
  }

  let dataSend = {

    op: "checkTemporaryDataEvaluation",

    ev: gblEvaluation,

    branch: arrSendB,

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    let dataR = ajaxR.Data;

    allTempData = dataR;

    printAllTablesTempData();

    // Asegurar que el contenedor sea visible si hay datos
    if (dataR && dataR.length > 0) {
      const cardEmployees = document.getElementById("card_contentEmployees");
      if (cardEmployees) {
        cardEmployees.style.display = "";
      }
    }

  }

}



function printAllTablesTempData() {

  let contentSection = "";

  $("#contentAllTables").empty();

  $("#contentSection").empty();

  allBranch.forEach((branch) => {

    let tempBranch = allTempData.filter(

      (data) => data.IdSucursalEvaluado == branch.IdSucursal

    );

    if (tempBranch.length > 0) {

      let tableId = `tableB_${branch.IdSucursal}`;

      let contentHTML = `

        <div class="card mb-4" id="card_${branch.IdSucursal}">

          <div class="card-header d-flex justify-content-between align-items-center">

            <h5 class="mb-0">${branch.Sucursal}</h5>

            <button class="btn btn-sm btn-danger" 

                    onclick="dialogDeleteAllDataPerBranch('${branch.IdSucursal}')">

              <span class="material-symbols-outlined">delete_forever</span>

            </button>

          </div>

          <div class="card-body">

            <div id="${tableId}" class="table-responsive"></div>

          </div>

        </div>

      `;

      contentSection += `

        <li class="list-group-item">

          <a href="#card_${branch.IdSucursal}" class="text-decoration-none text-reset">

            ${branch.Sucursal}

          </a>

        </li>

      `;

      $("#contentAllTables").append(contentHTML);

      printTablePerBranch(tempBranch, tableId);

    }

  });

  $("#contentSection").append(contentSection);

}



async function dialogDeleteAllDataPerBranch(br) {

  let tl = "¿Desea eliminar todos los registros de la sucursal seleccionada?";

  let com = "Los datos seleccionados no podrán ser recuperados.";

  let resultDial = await dialogConfirmSAlert(tl, com);

  if (resultDial) {

    deleteAllDataPerBranch(br);

  }

}



async function deleteAllDataPerBranch(br) {

  let dataSend = {

    op: "deleteAllDetailPerBranch",

    branch: br,

    ev: gblEvaluation,

  };

  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    // toastr.success(ajaxR.Msg);

    const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">${ajaxR.Msg}.</span>

          </div>`;

    showBootstrapAlertSuc(messageContent, "top-right", 5000);

    setTimeout(function () {

      location.reload();

    }, 1500);

  }

}



function printTablePerBranch(data, tableId) {

  let table = new ej.grids.Grid({

    dataSource: data,

    allowSorting: true,

    sortSettings: {

      columns: [{ field: "NoEmpleadoEvaluado", direction: "Ascending" }],

    },

    allowFiltering: true,

    filterSettings: { type: "Menu" },

    columns: [

      {

        field: "NoEmpleadoEvaluado",

        textHeader: "No. Evaluado",

        width: 100,

        textAlign: "Center",

      },

      {

        field: "EmpladoEvaluado",

        textHeader: "Evaluado",

        width: 100,

        textAlign: "Center",

      },

      {

        field: "EmpladoEvaluador",

        textHeader: "Evaluador",

        width: 100,

        textAlign: "Center",

      },

      {

        field: "",

        textHeader: "Tipo",

        template: "#typeEvaluatorTemplate",

        width: 50,

        textAlign: "Center",

      },

      {

        field: "",

        textHeader: "Activado",

        template: "#activeTemplate",

        width: 50,

        textAlign: "Center",

        headerTextAlign: "Center", // Centra también el encabezado

      },

      {

        field: "",

        textHeader: "Eliminar Evaluador",

        template: "#deleteTemplate",

        width: 50,

        textAlign: "Center",

      },

    ],

  });

  table.appendTo(`#${tableId}`);

}



window.deleteSF = function (e) {

  let div = document.createElement("div");

  let btn;

  if (e.AutoEvalua == 1) {

    btn = `<button class="btn btn-outline-danger opacity-50 pe-none" disabled><span class="material-icons">lock</span></button>`;

  } else {

    btn = `<button class="btn btn-outline-danger btn-sm" onclick="deleteEvaluatorDetail('${e.idEvaluacionDetalle}')"><span class="material-icons">delete</span></button>`;

  }

  $(div).append(btn);

  return div.outerHTML;

};



// window.activeSF = function (e) {

//   let div = document.createElement("div");

//   let checked = e.Status == 1 ? "checked" : "";

//   let inp = `

// <div class="form-check form-switch">

//   <input

//     type="checkbox"

//     class="form-check-input updateActiveEv"

//     ${checked}

//     data-detailev="${e.idEvaluacionDetalle}"

//     id="switch_${e.idEvaluacionDetalle}"

//   >

//   <label class="form-check-label" for="switch_${e.idEvaluacionDetalle}"></label>

// </div>`;

//   $(div).append(inp);

//   return div.outerHTML;

// };

window.activeSF = function (e) {

  let div = document.createElement("div");

  div.className = "d-flex justify-content-center align-items-center h-100";



  let checked = e.Status == 1 ? "checked" : "";

  let inp = `

<div class="form-check form-switch m-0"> 

  <input 

    type="checkbox" 

    class="form-check-input updateActiveEv position-static"

    ${checked}

    data-detailev="${e.idEvaluacionDetalle}"

    id="switch_${e.idEvaluacionDetalle}"

    style="width: 2.3em; height: 1.3em;" 

  >

</div>`;



  $(div).append(inp);

  return div.outerHTML;

};



window.typeEvaluatorSF = function (e) {

  let div = document.createElement("div");

  let textT = "";

  if (e.AutoEvalua == 1) {

    textT = "AUTO";

  } else if (e.JefeEvalua == 1) {

    textT = "JEFE";

  } else if (e.ParEvalua == 1) {

    textT = "PAR";

  } else if (e.SubordinadoEvalua) {

    textT = "SUBORDINADO";

  }

  let span = `<span>${textT}</span>`;

  $(div).append(span);

  return div.outerHTML;

};



$(document).on("click", ".updateActiveEv", async function (e) {

  let dataSend = {

    op: "updateStatusTempDetEv",

    newVal: e.target.checked ? 1 : 0,

    detEv: e.target.dataset.detailev,

  };

  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    let posicion = allTempData.findIndex(

      (i) => i.idEvaluacionDetalle == dataSend.detEv

    );

    if (posicion != "-1") {

      allTempData[posicion].Status = dataSend.newVal;

      // let tableId = `tableB_${allTempData[posicion].IdSucursalEvaluado}`;

      // let tempBranch = allTempData.filter( data => data.IdSucursalEvaluado == allTempData[posicion].IdSucursalEvaluado);

      // $(tableId).empty();

      // printTablePerBranch(tempBranch, tableId);

    }

  } else {

    if (dataSend.newVal == 1) {

      e.target.checked = false;

    } else {

      e.target.checked = true;

    }

  }

});



async function getAllActiveEmployees() {

  let dataSend = {

    op: "getAllActiveEmployees",

  };

  let ajaxR = await pAjaxAsync(url_m_Empleados, dataSend);

  if (ajaxR !== undefined) {

    allEmployees = ajaxR.Data;

    printAllActiveEmployees();

  }

}



function printAllActiveEmployees() {

  let contentHTML = "";

  if (allEmployees.length > 0) {

    allEmployees.forEach((i) => {

      contentHTML += `<option value="${i.NoEmpleado}">${i.Descripcion}</option>`;

    });

    $("#slct_newEvaluated").append(contentHTML);

  }

  $("#slct_newEvaluated").select2({
    minimumInputLength: 3,
    language: {
      inputTooShort: function () {
        return "Ingrese mínimo 3 caracteres para poder buscar";
      },
    },
    dropdownParent: $("#contentNewEvaluator"),
    width: "100%",
  });

}



$(document).on("click", "#openNewEv", function () {

  let title = "Nuevo Evaluador";

  // $("#contentNewEvaluator").modal("open");

  // openMMinNoMaximizable(title, 'contentNewEvaluator', false);

  const modal = new bootstrap.Modal(

    document.getElementById("contentNewEvaluator")

  );

  modal.show(); // Abre el modal



  printPossibleEvaluators();

  $("#typeNewEvaluator").select2({
    dropdownParent: $("#contentNewEvaluator"),
    width: "100%",
  });
});



$(document).on("change", "#slct_newEvaluated", async function (e) {

  printPossibleEvaluators();

});



async function printPossibleEvaluators() {

  $("#slct_newEvaluator").empty();

  let res = await getNewPossibleEvaluators($("#slct_newEvaluated").val());

  let contentHTML = "";

  res.forEach((i) => {

    contentHTML += `<option value="${i.NoEmpleado}">${i.Descripcion}</option>`;

  });

  $("#slct_newEvaluator").append(contentHTML);

  $("#slct_newEvaluator").select2({
    minimumInputLength: 3,
    language: {
      inputTooShort: function () {
        return "Ingrese mínimo 3 caracteres para poder buscar";
      },
    },
    dropdownParent: $("#contentNewEvaluator"),
    width: "100%",
  });

}



$(document).on("click", "#saveNewEvaluator", function () {

  if ($("#slct_newEvaluator").val() == $("#slct_newEvaluated").val()) {

    // toastr.info("No es posible ingresar la combinación seleccionada");

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No es posible ingresar la combinación seleccionada.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  } else {

    addEmpleadoEvaluadorTempData();

  }

});



async function addEmpleadoEvaluadorTempData() {

  let dataSend = {

    op: "addEmpleadoEvaluadorTempData",

    ev: gblEvaluation,

    evaluator: $("#slct_newEvaluator").val(),

    evaluated: $("#slct_newEvaluated").val(),

    typeEvaluator: $("#typeNewEvaluator").val(),

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    // Cerrar modal Bootstrap 5
    bootstrap.Modal.getInstance(document.getElementById("contentNewEvaluator"))?.hide();

    // Recargar la página para mostrar el nuevo evaluador en la tabla
    setTimeout(function () {
      location.reload();
    }, 1200);

  }

}



async function deleteEvaluatorDetail(detailEv) {

  let dataSend = {

    op: "deleteEvaluatorDetail",

    evDetail: detailEv,

  };

  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    let posicion = allTempData.findIndex(

      (i) => i.idEvaluacionDetalle == dataSend.evDetail

    );

    let branchSel = allTempData[posicion].IdSucursalEvaluado;

    allTempData.splice(posicion, 1);

    let tempBranch = allTempData.filter(

      (data) => data.IdSucursalEvaluado == branchSel

    );

    let tableId = `tableB_${branchSel}`;

    let table = document.getElementById(`${tableId}`);

    $(table).empty();

    printTablePerBranch(tempBranch, tableId);

  }

}



$(document).on("click", "#publishEvaluation", async function () {

  let resultDial = await dialogConfirmSAlert(

    "¿Desea publicar la evaluación con el detalle de los evaluadores registrados y aceptados?"

  );

  if (resultDial) {

    acceptPublicationOfTheEvaluation();

  }

});



async function acceptPublicationOfTheEvaluation() {

  let dataSend = {
    op: "acceptPublicationOfTheEvaluation",
    ev: gblEvaluation,
  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {
    if (ajaxR.ConMsg) {
      // pAjaxAsync ya muestra el mensaje de éxito
    } else {
      toastr.success("Evaluación publicada exitosamente.", "¡Completado!");
    }
    setTimeout(function () {
      window.location.href = "ListadoEvaluaciones.php";
    }, 1500);
  }

}



async function getInitialConfigEvaluation() {

  let dataS = {

    op: "getInitialConfigEvaluation",

    ev: gblEvaluation,

  };

  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataS, 1);

  if (ajaxR != undefined) {

    console.log(ajaxR.Data);

    if (

      ajaxR.Data.TipoSeleccionaSucursal == null &&

      ajaxR.Data.TipoOpcionConfiguracion == null

    ) {
      $(gblConfigEv.typeSelBranch).select2({
        width: "100%",
      });
      $(gblConfigEv.cardBranch).fadeOut();

      contentAfter_SelBranch.card_listBranch.style.display = "none";

      // card_employees se mostrará en checkTemporaryDataEvaluation si hay datos
      contentAfter_SelBranch.card_employees.style.display = "none";

      // Mostrar botón de nuevo evaluador para poder agregar configuraciones
      contentAfter_SelBranch.btn_OpenNewEv.style.display = "";

      contentAfter_SelBranch.btn_publishEv.style.display = "none";

      document.querySelector("#card_searchTableBranch label").style.display =

        "none";

      contentAfter_SelBranch.card_searchTBranches.style.display = "none";



      getListBranchNewEv();

    } else {

      // gblConfigEv.saveConfigInitial.style.display = 'none';

      // contentAfter_SelBranch.card_principal.style.display ="none";

      gblConfigEv.branch.remove();

      gblConfigEv.switchContainer.remove();

      gblConfigEv.typeOption.remove();

      gblConfigEv.cardBranch.remove();

      gblConfigEv.typeSelBranch.remove();

      gblConfigEv.saveConfigInitial.remove();

      gblConfigEv.card_config.remove();

      await getListAllBranchEmp();

      getAllActiveEmployees();

    }

  }

}



async function getListBranchNewEv() {

  let dataSend = {

    op: "getListBranchNewEv",

  };

  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if (ajaxR != undefined) {

    printBranch(ajaxR.Data);

  }

}



const printBranch = (data) => {

  console.log(data);

  let cHTML = "";

  let cantD = data.length;

  if (cantD > 0) {

    for (var i = 0; i < cantD; i++) {

      cHTML += `<option value="${data[i]["IdSucursal"]}">${data[i]["Sucursal"]}</option>`;

    }

  }

  gblConfigEv.branch.innerHTML = cHTML;

  $(gblConfigEv.branch).select2({
    placeholder: "Listado de sucursales...",
    width: "100%",
  });

};



gblConfigEv.typeOption.addEventListener("change", function () {

  if (this.checked) {

    $(gblConfigEv.cardBranch).fadeIn();

  } else {

    $(gblConfigEv.cardBranch).fadeOut();

  }

});



$(document).on("click", "#btn_saveConfig", function () {

  saveConfigEvaluationBr();

});



const saveConfigEvaluationBr = async () => {

  let dataS = {

    op: "saveConfigEvaluationBr",

    typeOption: gblConfigEv.typeOption.checked ? 1 : 0,

    branchSel: $(gblConfigEv.branch).val(),

    typeSelBranch: $(gblConfigEv.typeSelBranch).val(),

    ev: gblEvaluation,

  };

  console.log(dataS);

  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataS, 1);

  if (ajaxR != undefined) {

    setTimeout(function () {

      location.reload();

    }, 2000);

  }

};

