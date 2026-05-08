  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

const slc_typeComp = document.getElementById("slc_typeComp"),
  name_Comp = document.getElementById("name_Comp"),
  sig_Comp = document.getElementById("sig_Comp"),
  competenceEdit = document.getElementById("competenceEdit"),
  txActionCompetence = document.getElementById("txActionCompetence"),
  actionCompetence = document.getElementById("actionCompetence");
let tableCompSF;

// let btnOpenNewCompetences = new ej.buttons.Fab({
//     iconCss:'fas fa-plus',
//     content:'Nueva Competencia' });
// btnOpenNewCompetences.appendTo('#btnOpenNewCompetences');
// btnOpenNewCompetences.element.onclick = function(){
//   actionCompetence.value = "add";
//   txActionCompetence.textContent = 'Nueva Competencia';
//   cleanVerifyInputs('modalDetailCompetence');
//   $("#slc_typeComp").select2({
//     dropdownParent: $('#modalDetailCompetence')
//   });
//   $("#modalDetailCompetence").modal('open');
// }

// Obtener el botón HTML
const btnOpenNewCompetences = document.getElementById("btnOpenNewCompetences");

btnOpenNewCompetences.addEventListener("click", function () {
  actionCompetence.value = "add";
  txActionCompetence.textContent = "Nueva Competencia";
  cleanVerifyInputs("modalDetailCompetence");

  $("#slc_typeComp").select2({
    dropdownParent: $("#modalDetailCompetence"),
  });

  // $("#modalDetailCompetence").modal("open");
  var modal = new bootstrap.Modal(
    document.getElementById("modalDetailCompetence")
  );
  modal.show();
});

/////////////////
getListCompetences();
gettypesOfCompetencies();
async function getListCompetences() {
  let dataSend = { op: "getListCompetencias" };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printListCompetences(dataR);
  }
}
function printListCompetences(data) {
  if (tableCompSF) {
    tableCompSF.destroy();
  }
  tableCompSF = new ej.grids.Grid({
    dataSource: data,
    allowFiltering: true,
    filterSettings: { type: "Menu" },
    columns: [
      {
        field: "Competencia",
        headerText: "Competencia",
        width: 70,
        textAlign: "Center",
        allowFiltering: false,
      },
      {
        field: "Tipo",
        headerText: "Tipo de Competencia",
        width: 70,
        textAlign: "Center",
        filter: { type: "CheckBox" },
      },
      {
        field: "StatusCom",
        headerText: "Status",
        width: 70,
        textAlign: "Center",
        filter: { type: "CheckBox" },
        template: "#statusTemplate",
      },
      {
        field: "idCompetencia",
        headerText: "Cambiar Status",
        width: 40,
        textAlign: "Center",
        filter: { type: "CheckBox" },
        template: "#updateStatusTemplate",
      },
      {
        field: "idCompetencia",
        headerText: "Editar competencia",
        width: 40,
        textAlign: "Center",
        filter: { type: "CheckBox" },
        template: "#viewDetailCompetenceTemplate",
      },
    ],
  });
  tableCompSF.appendTo("#content_Competences");
}
async function gettypesOfCompetencies() {
  let dataSend = { op: "gettypesOfCompetencies" };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 0);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printTypesOfCompetencies(dataR);
  }
}
function printTypesOfCompetencies(data) {
  const firstElement = document.createElement("option");
  firstElement.value = "";
  firstElement.textContent = "TIPOS DE COMPETENCIAS";
  firstElement.selected = true;
  const clonefirst = firstElement.cloneNode(true);
  slc_typeComp.appendChild(clonefirst);
  if (data.length > 0) {
    data.forEach((d) => {
      let newElement = document.createElement("option");
      (newElement.value = d.idTipoCompetencias),
        (newElement.textContent = d.Descripcion);
      let clonenew = newElement.cloneNode(true);
      slc_typeComp.appendChild(newElement);
    });
  }
  $("#slc_typeComp").select2({
    dropdownParent: $("#modalDetailCompetence"),
  });
}
// window.statusDetail = function (e) {
//   let div = document.createElement("div");
//   let span = document.createElement("span");
//   span.textContent = `${e.StatusCom}`;
//   if (e.StatusCom === "Activo") {
//     span.className = "statustxt e-activecolor";
//     div.className = "statustemp e-activecolor";
//   } else {
//     span.className = "statustxt e-inactivecolor";
//     div.className = "statustemp e-inactivecolor";
//   }
//   div.appendChild(span);
//   return div.outerHTML;
// };
window.statusDetail = function (e) {
  let span = document.createElement("span");

  if (e.StatusCom === "Activo") {
    span.className = "badge badge-style-light rounded-pill badge-success";
    span.textContent = "Activo";
  } else {
    span.className = "badge badge-style-light rounded-pill badge-danger";
    span.textContent = "Inactivo";
  }

  return span.outerHTML;
};

// window.updateStatusSY = function (e) {
//   let div = document.createElement("div");
//   let btn = document.createElement("button");
//   let iBtn = document.createElement("i");
//   btn.className = "btn-actionBlue1";
//   btn.setAttribute("onclick", `changeStatusCompetence('${e.idCompetencia}')`);
//   iBtn.className = "fas fa-exchange-alt";
//   btn.appendChild(iBtn);
//   div.appendChild(btn);
//   return div.outerHTML;
// };
window.updateStatusSY = function (e) {
  let div = document.createElement("div");
  let btn = document.createElement("button");
  let iBtn = document.createElement("span");
  btn.className = "btn btn-warning";
  btn.setAttribute("onclick", `changeStatusCompetence('${e.idCompetencia}')`);
  iBtn.className = "material-symbols-outlined";
  iBtn.textContent = "autorenew";
  btn.appendChild(iBtn);
  div.appendChild(btn);
  return div.outerHTML;
};

// window.viewDetailCompetenceSF = function (e) {
//   let div = document.createElement("div");
//   let btn = document.createElement("button");
//   let iBtn = document.createElement("i");
//   btn.className = "btn btn-primary";
//   btn.setAttribute("onclick", `viewDetailCompetence('${e.idCompetencia}')`);
//   iBtn.className = "fas fa-info";
//   iBtn.textContent="",
//   btn.appendChild(iBtn);
//   div.appendChild(btn);
//   return div.outerHTML;
// };
window.viewDetailCompetenceSF = function (e) {
  let div = document.createElement("div");
  let btn = document.createElement("button");
  let iBtn = document.createElement("span");

  btn.className = "btn btn-primary";
  btn.setAttribute("onclick", `viewDetailCompetence('${e.idCompetencia}')`);

  iBtn.className = "material-symbols-outlined";
  iBtn.textContent = "info_i";

  btn.appendChild(iBtn);
  div.appendChild(btn);

  return div.outerHTML;
};

async function changeStatusCompetence(competence) {
  const dataSend = {
    op: "changeStatusCompetence",
    competence: competence,
  };
  const ajaxR = pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    getListCompetences();
  }
}

async function viewDetailCompetence(competence) {
  const dataSend = {
    op: "viewDataCompetenceSF",
    competence: competence,
  };
  cleanVerifyInputs("modalDetailCompetence");
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const dataR = ajaxR.Data;
    actionCompetence.value = "upd";
    slc_typeComp.value = dataR.TipoCompetencia;
    name_Comp.value = dataR.Competencia;
    sig_Comp.value = dataR.Significado;
    competenceEdit.value = dataSend.competence;
    txActionCompetence.textContent = "Actualizar competencia";
    // M.textareaAutoResize($("#sig_Comp"));
    $("#slc_typeComp").select2({
      dropdownParent: $("#modalDetailCompetence"),
    });
    // $("#modalDetailCompetence").modal("open");
    var modal = new bootstrap.Modal(
      document.getElementById("modalDetailCompetence")
    );
    modal.show();
  }
}

$(document).on("click", "#acceptCompetence", async function () {
  const resultV = await verifyInputs("modalDetailCompetence");
  if (resultV) {
    await saveDataCompetenceSF();
  }
});

async function saveDataCompetenceSF() {
  const dataSend = {
    op: "saveDataCompetenceSF",
    action: actionCompetence.value,
    typeC: slc_typeComp.value,
    nameC: name_Comp.value,
    signF: quitarEspaciosExtras($("#sig_Comp").val()).trim(),
    selectedC: competenceEdit.value,
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    await getListCompetences();
    // $("#modalDetailCompetence").modal("close");
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("modalDetailCompetence")
    );
    modal.hide();
  }
}
