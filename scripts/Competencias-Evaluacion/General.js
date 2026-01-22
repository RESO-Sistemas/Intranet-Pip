import { DataNivelesTemp } from './DataNivelesTemp.js';
const dataNivelesT = new DataNivelesTemp();
console.log(dataNivelesT);

const home_types_comp = document.querySelector('#home_types_comp');
const slc_typeComp = document.querySelector('#slc_typeComp');
const tx_cal_A = document.querySelector('#tx_cal_A');
const tx_cal_B = document.querySelector('#tx_cal_B');
const tx_cal_C = document.querySelector('#tx_cal_C');
const tx_cal_D = document.querySelector('#tx_cal_D');
const tx_cal_E = document.querySelector('#tx_cal_E');
const tx_Competencia = document.querySelector('#tx_Competencia');
const actionModal_Comp = document.querySelector('#actionModal_Comp');
const tx_Significado = document.querySelector('#tx_Significado');
const modal_idCompetence = document.querySelector('#Modal_idCompetence');
const slc_lvlComp = document.querySelector('#slc_lvlComp');

let table_Competencias;
let tableT;
loadAllFunctions();
async function loadAllFunctions(){
  await getListCompetencias();
  await gettypesOfCompetencies();
}

$(document).on("change","#home_types_comp",async function(){
  await getListCompetencias();
});
async function getListCompetencias(){
  let dataSend = {op: "getListCompetencias", typeCompetence: home_types_comp.value};
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if(ajaxResponse !== undefined){
    const dataR = ajaxResponse.Data;
    printListCompetencias(dataR);
  }
}
function printListCompetencias(data){
  table_Competencias = $('#table_Competencias').DataTable({
     language: {
       zeroRecords: "No se encontraron Registros.",
       info: "Página _PAGE_ de _PAGES_",
       infoEmpty: "No se encontro ese Registro.",
       infoFiltered: "",
       search: "Buscar: "
     },
     bDestroy: true,
     searching: true,
     ordering: true,
     data: data,
     columns: [
       {
         data: 'Competencia'
       },
       {
         data: 'Tipo'
       },
       {
         data: 'StatusCom'
       },
       {
         data: null,
         render: function(data, type, row, meta){
           return `<button class="btn-ViewUpdateSm" data-competence="${data.idCompetencia}" href="#"><i class="fal fa-edit" data-competence="${data.idCompetencia}"></i></button>`;
         }
       },
     ],
   });
}

async function gettypesOfCompetencies(){
  let dataSend = {op: "gettypesOfCompetencies"};
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 0);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printTypesOfCompetencies(dataR);
  }
}
function printTypesOfCompetencies(data){
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "TIPOS DE COMPETENCIAS";
  firstElement.selected = true;
  const clonefirst = firstElement.cloneNode(true);
  home_types_comp.appendChild(firstElement);
  slc_typeComp.appendChild(clonefirst);
  if (data.length > 0){
    data.forEach( d => {
      let newElement = document.createElement('option');
      newElement.value = d.idTipoCompetencias,
      newElement.textContent = d.Descripcion;
      let clonenew = newElement.cloneNode(true);
      slc_typeComp.appendChild(newElement);
      home_types_comp.appendChild(clonenew);
    });
  }
  $("#slc_typeComp").formSelect();
  $("#home_types_comp").formSelect();
}

$(document).on("click","#btn_openNew",function(){
  const hd = "Nueva Competencia";
  const dv = "contentCompetencia";
  const content = "contentInpCompetencias";
  actionModal_Comp.value = "create";
  modal_idCompetence.value = "";
  cleanContenedorInp(content);
  $("#slc_typeComp").formSelect();
  openMMaxNoMinimizable(hd,dv);
  dataNivelesT.cleanArr();
  printNivelesTemporal();
  // $("#modal_Competencias").modal('open');
});

$(document).on("click","#btnSaveCompetencia",async function(){
  let dv = "contentInpCompetencias";
  const resultV = await validateDiv(dv);
  if (resultV) {
    let title = "Confirmación de acción.";
    let tx = "¿Deseas registrar/actualizar la competencia?";
    const resultConf = await dialogConfirmAlertify(title,tx);
    if (resultConf) {
      if (dataNivelesT._arrNiveles.length > 0) {
        await saveCompetencies();
      } else {
        toastr.info("Es necesario ingresar al menos un nivel deseado para poder guardar los datos.");
      }
    }
  }
});

async function saveCompetencies(){
  let dataSend = {
    op: "saveCompetencies",
    action: actionModal_Comp.value,
    type: slc_typeComp.value,
    competence: tx_Competencia.value,
    significate: tx_Significado.value,
    val_a: tx_cal_A.value,
    val_b: tx_cal_B.value,
    val_c: tx_cal_C.value,
    val_d: tx_cal_D.value,
    val_e: tx_cal_E.value,
    idCompetence: modal_idCompetence.value,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    if (actionModal_Comp.value == "create") {
      await saveLevels(dataR.NewCompetence);
    } else {
      await saveLevels(modal_idCompetence.value);
    }
  }
}
async function saveLevels(competence){
  let dataSend = {
    op: "saveLevelsCompetence",
    competence: competence,
    allLevels: dataNivelesT._arrNiveles,
    typeAction:actionModal_Comp.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    alertify.alert().closeOthers();
    await getListCompetencias();
  }
}

$(document).on("click","[data-competence]",async function(e){
  let thisVal = e.target.dataset.competence;
  await viewDataCompetence(thisVal);
});

async function viewDataCompetence(competence){
  dataNivelesT.cleanArr();
  let dataSend = {
    op: "viewDataCompetence",
    competence: competence
  }
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    const dataD = ajaxResponse.DataDetail;
    dataD.forEach( d => {
      dataNivelesT.addNivel(d.NivelEmpleado,d.CalificacionEsperado);
    });
    const content = "contentInpCompetencias";
    modal_idCompetence.value = "";
    cleanContenedorInp(content);
    activeDescriptionInp(content);
    viewDataCompetenceSel(dataR);
    printNivelesTemporal();
  }
}
function viewDataCompetenceSel(data){
  const hd = "Actualizar Competencia";
  const dv = "contentCompetencia";
  actionModal_Comp.value = "update";
  modal_idCompetence.value = data.idCompetence;

  slc_typeComp.value = data.TipoCompetencia;
  tx_cal_A.value = data.A;
  tx_cal_B.value = data.B;
  tx_cal_C.value = data.C;
  tx_cal_D.value = data.D;
  tx_cal_E.value = data.E;
  tx_Competencia.value = data.Competencia;
  tx_Significado.value = data.Significado;

  M.textareaAutoResize($('#tx_cal_A'));
  M.textareaAutoResize($('#tx_cal_B'));
  M.textareaAutoResize($('#tx_cal_C'));
  M.textareaAutoResize($('#tx_cal_D'));
  M.textareaAutoResize($('#tx_cal_E'));
  M.textareaAutoResize($('#tx_Significado'));

  $("#slc_typeComp").formSelect();
  openMMaxNoMinimizable(hd,dv);
}

// $(document).on("change","#slc_lvlComp",function(e){
//   console.log($("#slc_lvlComp").val());
// });

$(document).on("click","#btnAddListaLvl",function(){
  const result = dataNivelesT.addNivel(slc_lvlComp.value, slc_calEsperadoComp.value);
  if (result.resultado) {
    printNivelesTemporal();
  } else {
    toastr.info(result.msg);
  }
});

function printNivelesTemporal(){
  tableT = new Tabulator("#dv_niveles_temp",{
    layout:"fitColumns",
    data: dataNivelesT._arrNiveles,
    columns:[
      {title: "Nivel", field: "_nivel"},
      {title: "Valor Esperado", field: "_esperado"},
      {title: "Remover", field: "_nivel", formatter:function(row,formatterParams){
        let thisVal = row.getValue();
        return `<button class="btnUpdate2" data-btn_temporal="${thisVal}"><i class="fas fa-trash-alt" data-btn_temporal="${thisVal}"></i></button>`;
      }},
    ],
  });
}
$(document).on("click","[data-btn_temporal]",function(e){
  const thisVal = e.target.dataset.btn_temporal;
  const result = dataNivelesT.removeSelected(thisVal);
  if (result) {
    printNivelesTemporal();
  }
});
