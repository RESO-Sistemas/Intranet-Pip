ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=')

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Evaluacion = urlParams.get('EV');

const slcPuestosModal = document.querySelector('#slcPuestosModal');
const slcDivisionModal = document.querySelector('#slcDivisionModal');
const slcSucursalModal = document.querySelector('#slcSucursalModal');
const modalEmpSeleccionado = document.querySelector('#modalEmpSeleccionado');
const modal_NoEvaluado = document.querySelector('#modal_NoEvaluado');
const evaluadoSelected = document.querySelector('#evaluadoSelected');
const tx_title = document.querySelector('#tx_title');
let table_evaluados;

let table_evaluadores = $("#table_evaluadores").dataTable({
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
let table_newEvaluadores = $("#table_newEvaluadores").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "",
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
allFunctions();
async function allFunctions(){
  await getGeneralInfo();
  await getListDivisiones();
  await getListPuestos();
  await getListSucursales();
  // await getListPuestosGeneral();
  // await getListSucursalesGeneral();
  await getListEvaluados();
  $("#slcPuestosModal").chosen({width: "100%"});
  $("#slcSucursalModal").chosen({width: "100%"});
  $("#slcPuestos").chosen({width: "100%"});
  $("#slcSucursal").chosen({width: "100%"});
}

async function getGeneralInfo(){
  let dataSend = {
    op: "getGeneralInfoEvaluacion",
    evaluacion: Evaluacion
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printGeneralInfo(dataR);
  }
}
function printGeneralInfo(data){
  tx_title.textContent = data.Titulo;
}

async function getListEvaluados(){
  let dataSend = {
    op: "listEvaluados",
    idEvaluaciones: Evaluacion,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  const dataR = ajaxResponse.Data;
  printListEvaluados(dataR);
}
function printListEvaluados(data){
  if (table_evaluados) {
    table_evaluados.destroy();
  }
  table_evaluados = new ej.grids.Grid({
    dataSource: data,
    allowFiltering: true,
    filterSettings: { type:'Menu' },
    allowPaging: true,
    toolbar: ['Search'],
    columns: [
      { field: "NoEmpleado", headerText: "No. Empleado", width: 40, textAlign: 'Center', filter: { type : 'CheckBox' }},
      { field: "Nombre", headerText: "Empleado", width: 90, textAlign: 'Center', filter: { type : 'CheckBox' }},
      { field: "NivelEvaluado", headerText: "Nivel Durante la Evaluación", width: 90, textAlign: 'Center', filter: { type : 'CheckBox' }},
      { field: "Puesto", headerText: "Puesto Durante la Evaluación", width: 90, textAlign: 'Center', filter: { type : 'CheckBox' }},
      { field: "", headerText: "Evaluadores", width: 35, textAlign: 'Center', allowFiltering: false , template: "#btnListEvaluatorsTemplate"},
    ],
  });
  table_evaluados.appendTo("#table_evaluados");
  // table_evaluados.fnClearTable();
  // data.forEach( d =>{
  //   table_evaluados.fnAddData([
  //     d.NoEmpleado,
  //     d.Nombre,
  //     d.NivelEvaluado,
  //     d.Puesto,
  //     `<button class="btn-ViewDetail" onclick="verificaEvaluadores('${d.NoEmpleadoEvaluado}','${d.Nombre}')"><i class="far fa-user"></i></button>`
  //   ]);
  // });
}

window.btnListEvaluatorsSF = function(e){
  let div = document.createElement('div');
  let btn = `<button class="btn-actionBlue1" onclick="verificaEvaluadores('${e.NoEmpleadoEvaluado}','${e.Nombre}')"><i class="far fa-user"></i></button>`;
  $(div).append(btn);
  return div.outerHTML;
}

async function verificaEvaluadores(noEmpleado,name){
  evaluadoSelected.value = noEmpleado;
  await list_evaluadores(name);
  let hd = `Listado de Evaluadores para el empleado: ${name}`;
  let dv = "modal_evaluadores";
  openMMinNoMaximizable(hd,dv,false);
}
async function list_evaluadores(name){
  let dataSend = {
    op: "getlist_evaluadores",
    evaluado: evaluadoSelected.value,
    evaluacion: Evaluacion
  };
  table_evaluadores.fnClearTable();
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined ) {
    // modal_NoEvaluado.value = noEmpleado;
    const dataR = ajaxResponse.Data;
    printList_evaluadores(dataR,name);
  }
}
function printList_evaluadores(data){
  data.forEach( d => {
    let btn = "";
    if (d.StatusEvaluacion == 0) {
      btn = `<button class="btn-block" disabled><i class="fas fa-ban"></i></button>`;
    } else {
      btn = `<button class="btn-cancel" onclick="verificaDeleteEvaluador('${d.idEvaluacionDetalle}','${d.Nombre}')"><i class="fas fa-power-off"></i></button>`;
    }
    table_evaluadores.fnAddData([
      d.Nombre,
      d.TipoEvaluador,
      btn
    ]);
  });
  // $("#modal_evaluadores").modal('open');
}

async function verificaDeleteEvaluador(val, name){
  let title = `Desea cancelar la evaluación del evaluador  "${name}"?`;
  let tx = "Una vez sea eliminado la evaluación, los datos no podrán ser recuperados.";
  const result = await dialogConfirmAlertify(title,tx);
  if (result) {
    await deleteEvaluador(val);
  }
}

async function deleteEvaluador(val){
  let dataSend = {
    op: "deleteEvaluador",
    evaluador: val
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    await list_evaluadores();
  }
}

$(document).on('click',"#btnNuevoEvaluador",async function(){
  let hd = "Nuevo Evaluador";
  let dv = "contNuevoEvaluador";
  openMMinNoMaximizable(hd,dv,false);
});

async function getListPuestos(){
  let dataSend = {
    op: "getListPuestosDivision",
    IdDivision: slcDivisionModal.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_puestos, dataSend, 0);
  if (ajaxResponse.Resultado) {
    const dataR = ajaxResponse.Data;
    printListPuestos(dataR);
  }
}
function printListPuestos(data){
  slcPuestosModal.innerHTML = "";
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "Listado de Puestos";
  firstElement.disabled = true;
  slcPuestosModal.appendChild(firstElement);
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdPuesto;
    newElement.textContent = d.Puesto ;
    slcPuestosModal.appendChild(newElement);
  });
  $("#slcPuestosModal").trigger("chosen:updated");
}

async function getListPuestosGeneral(){
  let dataSend = {
    op: "getListPuestosDivision",
    IdDivision: slcDivision.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_puestos, dataSend, 0);
  if (ajaxResponse.Resultado) {
    const dataR = ajaxResponse.Data;
    printListPuestosGeneral(dataR);
  }
}
function printListPuestosGeneral(data){
  slcPuestos.innerHTML = "";
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "Listado de Puestos";
  slcPuestos.appendChild(firstElement);
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdPuesto;
    newElement.textContent = d.Puesto ;
    slcPuestos.appendChild(newElement);
  });
  $("#slcPuestos").trigger("chosen:updated");
}

async function getListDivisiones(){
  let dataSend = {
    op: "getListDivisiones"
  };
  const ajaxResponse = await pAjaxAsync(url_m_Divisiones, dataSend, 0);
  if (ajaxResponse.Resultado) {
    const dataR = ajaxResponse.Datos;
    printListDivisiones(dataR);
    // printListDivisionesGeneral(dataR);
  }
}
function printListDivisiones(data){
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "Listado de Divisiones";
  // firstElement.selected = true;
  firstElement.disabled = true;
  slcDivisionModal.appendChild(firstElement);
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdDivision;
    newElement.textContent = d.Division ;
    slcDivisionModal.appendChild(newElement);
  });
  $("#slcDivisionModal").chosen({width: "100%"});
}
function printListDivisionesGeneral(data){
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "Listado de Divisiones";
  firstElement.disabled = true;
  slcDivision.appendChild(firstElement);
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdDivision;
    newElement.textContent = d.Division ;
    slcDivision.appendChild(newElement);
  });
  $("#slcDivision").chosen({width: "100%"});
}
$(document).on("change","#slcDivisionModal",async function(){
  await getListPuestos();
  await getListSucursales();
  await getPosiblesEvaluadores();
});
$(document).on("change","#slcDivision",async function(){
  await getListPuestosGeneral();
  // await getListSucursalesGeneral();
  await getListEvaluados();
});
$(document).on("change","#slcPuestos",async function(){
  await getListEvaluados();
});
$(document).on("change","#slcSucursal",async function(){
  await getListEvaluados();
});

async function getListSucursales(){
  let dataSend = {
    op: "getListSucursalPorDivision",
    IdDivision: slcDivisionModal.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_Sucursal, dataSend, 0);
  if(ajaxResponse !== undefined){
    const dataR = ajaxResponse.Data;
    printListSucursales(dataR);
  }
}
function printListSucursales(data){
  slcSucursalModal.innerHTML = "";
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "Listado de Sucursales";
  firstElement.disabled = true;
  slcSucursalModal.appendChild(firstElement);
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdSucursal;
    newElement.textContent = d.Sucursal ;
    slcSucursalModal.appendChild(newElement);
  });
  $("#slcSucursalModal").trigger("chosen:updated");
}

async function getListSucursalesGeneral(){
  let dataSend = {
    op: "getListSucursalPorDivision",
    IdDivision: slcDivision.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_Sucursal, dataSend, 0);
  if(ajaxResponse !== undefined){
    const dataR = ajaxResponse.Data;
    printListSucursalesGeneral(dataR);
  }
}
function printListSucursalesGeneral(data){
  slcSucursal.innerHTML = "";
  const firstElement = document.createElement('option');
  firstElement.value = "";
  firstElement.textContent = "Listado de Sucursales";
  slcSucursal.appendChild(firstElement);
  data.forEach( d => {
    let newElement = document.createElement('option');
    newElement.value = d.IdSucursal;
    newElement.textContent = d.Sucursal ;
    slcSucursal.appendChild(newElement);
  });
  $("#slcSucursal").trigger("chosen:updated");
}
async function getPosiblesEvaluadores(){
  let dataSend = {
    op: "getPosiblesEvaluadores",
    IdSucursal: slcSucursalModal.value,
    IdPuesto: slcPuestosModal.value,
    evaluado: evaluadoSelected.value,
    evaluacion: Evaluacion
  };
  const ajaxResponse = await pAjaxAsync(url_m_Empleados, dataSend, 1);
  table_newEvaluadores.fnClearTable();
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printPosiblesEvaluadores(dataR);
  }
}
function printPosiblesEvaluadores(data){
  data.forEach( d => {
    table_newEvaluadores.fnAddData([
      d.Empleado,
      `<button class="btn-change" onclick="addEmpleadoEvaluador('${d.NoEmpleado}','${d.Empleado}')"><i class="fas fa-hand-pointer"></i></button>`
    ]);
  });
}

$(document).on("change","#slcPuestosModal",async function(){
  await getPosiblesEvaluadores();
});
$(document).on("change","#slcSucursalModal",async function(){
  await getPosiblesEvaluadores();
});


async function addEmpleadoEvaluador(val, empleado){
  let title = "¿Desea registrar como evaluador al empleado seleccionado?";
  let tx = `Empleado Seleccionado: ${empleado}`;
  const result = await dialogConfirmAlertify(title,tx);
  if (result) {
    let dataSend = {
      op: "addEmpleadoEvaluador",
      evaluador: val,
      evaluado: evaluadoSelected.value,
      relacion: modal_relacion.value,
      evaluacion: Evaluacion
    };
    const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
    if (ajaxResponse !== undefined) {
      await list_evaluadores();
      await getPosiblesEvaluadores();
    }
  }
}
