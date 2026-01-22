// $(document).ready(function() {
//     $('.Slc2').select2();
// });

const SlctDivision = document.getElementById('slctDivision');
const SlctJefes = document.getElementById('slctJefes');
const PSelected = document.getElementById('txtPSelected');
const InpPSelected = document.getElementById('inpPSelected');

let table ;
loadAllFunctions();
async function loadAllFunctions(){
  await loadDivisiones();
  await getListPuestos();
}
async function getListPuestos(){
  datos = {
    op : "getListPuestos"
  }
  let respuesta;
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    table = $('#TablePuestos').DataTable({
      destroy: true,
       language: {
         zeroRecords: "No se encontraron Registros.",
         info: "Página _PAGE_ de _PAGES_",
         infoEmpty: "No se encontro ese Registro.",
         infoFiltered: "",
         search: "Buscar: "
       },
       bSort: false,
       bPaginate: true,
       bFilter: true,
       bInfo: false,
       // dom: '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-tl ui-corner-tr"fr>' +
       //   't' +
       //   '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ip>',
       data: respuesta,
       columns: [
         {
           data: 'Puesto'
         },
         {
           data: 'Division'
         },
         {
           data: 'PuestoJefe'
         },
         {
           data: 'IdPuesto',
           render: function (data, type, row, meta){
             return `<a class="btn" href="Permisos.php?Puesto=${data}" style="max-width:100%;min-width:auto; background-color:white; color:#34495E; border: 1px solid #E53935 ; border-radius:25%;"><i class="fas fa-link"></i></a>`;
           }
         },
         {
           data: null,
           render: function( data, type, row, meta){
             return `<button class="btnUpdate1" href="#" onclick="modalUpdate('${data.IdPuesto}','${data.Puesto}')"><i class="fal fa-edit"></i></button>`;
           }
         },
         {
           data: null,
           render: function( data, type, row, meta){
             return `<button class="btnUpdate5" href="#" onclick="openListJefes('${data.IdPuesto}','${data.Puesto}')"><i class="fal fa-edit" ></i></button>`;
           }
         }
       ],
       order: [
         [1, 'asc']
       ],
     });
     let contHtmlJ;
     contHtmlJ += `<option value="">Sin Jefe asignado</option>`;
     respuesta.forEach(r => {
       let decode = atob(r.IdPuesto);
       contHtmlJ += `
          <option value="${decode}">${r.Puesto}</option>
       `;
     });
     SlctJefes.innerHTML = contHtmlJ;
     // $('.SlcMultiple').select2();
     $("[name='TablePuestos_length']").formSelect();
  }
}

async function openListJefes(idp, name){
  let header = `Puesto seleccionado: ${name}`;
  PSelected.innerHTML = header;
  InpPSelected.value = idp;
  await loadJefesAsigPuesto();
  $("#modalListPuestos").modal('open');
  $('#slctJefes').select2({
     dropdownParent: $('#modalListPuestos .modal-content')
  });
}

async function loadJefesAsigPuesto(){
  let datos = {
    op: "loadJefesAsigPuesto",
    ip: InpPSelected.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_puestos,datos, 0);
  if (ajaxResponse !== undefined) {
    const dataResponse = ajaxResponse.Datos;
    $("#slctJefes").val(dataResponse[0].IdJefesPuesto)
    // $('.Slc2').select2();
  }
}

$(document).on("click","#updateJefes",async function(){
  let arrSelected = $("#slctJefes").val();
  let datos = {
    op: "asignaJefesPuesto",
    j: arrSelected,
    ip: InpPSelected.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_puestos, datos,0);
  if (ajaxResponse !== undefined) {
    await getListPuestos();
    $("#modalListPuestos").modal('close');
  }
});

async function checkedJefe(val){
  let datos = {
    op: "asignaJefePuesto",
    nIdPuesto: val
  };
  await pAjaxAsync('Backend/Puestos/App.php',datos, 0);
}

async function modalUpdate(id,puesto) {
  $("#txtIdPuesto").val(id);
  $("#txtPuestoUpdate").val(puesto);
  let header = `Descripción del puesto actual: ${puesto}`;
  $("#textPuesto").html(header);
  openModalMin('divUpdatePuesto');
}

async function updatePuesto () {
  Puesto = $("#txtPuestoUpdate").val();
  IdPuesto = $("#txtIdPuesto").val();
  if (Puesto == "") {
    toastr.info("Ingrese una descripción.");
    return false;
  }
  let datos = await {
    op: "updateDescPuesto",
    Puesto: Puesto,
    IdPuesto: IdPuesto
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Puestos/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      toastr.success("Puesto Actualizado");
      alertify.ModalMIN().close();
      await getListPuestos();
    } else {
      toastr.info("ERROR!");
    }
  }
}

async function loadDivisiones(){
  let datos = {
    op: "getListDivisiones"
  };
  const ajaxResponse = await pAjaxAsync('Backend/Divisiones/App.php',datos,0);
  if (ajaxResponse !== undefined) {
    const dataResponse = ajaxResponse.Datos;
    let contenidoHTML = "";
    dataResponse.forEach( datos => {
      contenidoHTML += `<option value="${datos.IdDivision}">${datos.Division}</option>`;
    });
    SlctDivision.innerHTML += contenidoHTML;
    $("#slctDivision").formSelect();
  }
}

$(document).on("click","#registraPuesto",async function(){
  let nombrePuesto = $("#txtNameP").val();
  let division = $("#slctDivision").val();
  if (division === undefined || division === null || division == "" || nombrePuesto === undefined || nombrePuesto === null || nombrePuesto == "") {
    toastr.info("Ingrese todos los datos para poder registrar el nuevo puesto.");
  } else {
    let title = "¿Desea confirmar los datos del nuevo puesto?";
    const result = await dialogConfirmSAlert(title);
    if (result) {
      await addPuestos(nombrePuesto,division);
    }
  }
});

async function addPuestos(nombrePuesto,division){
  let datos = {
    op: "addPuestos",
    nPuesto: nombrePuesto,
    nIdDivision: division,
  };
  const ajaxResponse = await pAjaxAsync("Backend/Puestos/App.php", datos, 1);
  if (ajaxResponse !== undefined) {
    await getListPuestos();
    limipiarInputs();
  }
}

function limipiarInputs(){
  $("#txtNameP").val("");
  $("#slctDivision").val("");
  $("#slctDivision").formSelect();
}

async function openModalMin(div){
  if (!alertify.ModalMIN) {
    alertify.ModalMIN || alertify.dialog('ModalMIN',function(){
      return {
          main:function(content){
              this.setContent(content);
          },
          setup:function(){
              return {
                  focus:{
                      element:function(){
                          return this.elements.body.querySelector(this.get('selector'));
                      },
                      select:true
                  },
                  options:{
                      basic: true,
                      maximizable:false,
                      padding:false,
                      startMaximized: false,
                      resizable:false,
                  }
              };
          },
          settings:{
              selector:undefined
          }
      };
    });
    }
    alertify.ModalMIN ($(`#${div}`)[0]);
}
