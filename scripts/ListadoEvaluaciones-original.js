const inpTitulo = document.querySelector('#inpTitulo');
const inpFechaInicio = document.querySelector('#inpFechaInicio');
const inpFechaFin = document.querySelector('#inpFechaFin');

getEvaluaciones();
function getEvaluaciones(){
  datos = {
    op : "getEvaluaciones"
  }
  let TableEvaluaciones = $('#TableEvaluaciones').dataTable({
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Evaluaciones/App.php",
      "data":datos,
      "success" : function(response){
        let TextStatus = "";
        let Evaluacion = "";
        TableEvaluaciones.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          Evaluacion = btoa(response[i]["idEvaluaciones"]);
          if (response[i]["Status"] == 1) {
            TextStatus = "Activo";
          }else {
            TextStatus = "Inactivo";
          }
          TableEvaluaciones.fnAddData([
            response[i]["Titulo"],
            response[i]["FechaInicio"],
            response[i]["FechaFin"],
            TextStatus,
            `<a type="button" class="button-1" href="Evaluados.php?EV=${Evaluacion}"><i class="far fa-user-circle"></i></a>`,
            `<a type="button" class="button-1" href="ResultadosEvaluacion.php?Ev=${Evaluacion}"><i class="fal fa-chart-line"></i></a>`,
            `<button type="button" class="btn" onclick="updateStatusEvaluacion(${response[i]["Status"]},${response[i]["idEvaluaciones"]})"><i class="fas fa-sync-alt"></i></button>`
          ]);
        }
      },
      "complete" : function(){
          // $.unblockUI();
        }
    }
  });
}

function updateStatusEvaluacion (accion,evaluacion) {
  let Status = "";
  if (accion == 1) {
    Status = "0";
  }else {
    Status = "1";
  }
  datos = {
    op: "updateStatusEvaluacion",
    Status: Status,
    idEvaluaciones: evaluacion
  }
  console.log(datos);
  $.ajax({
    type: "post",
    url: "Backend/Evaluaciones/App.php",
    data: datos,
    success:function (response){
      if (response == 1) {
        toastr.success("Actualizado");
        setTimeout(function () {
          getEvaluaciones();
        }, 700);
      }else {
        toastr.info("Error al actualizar");
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

$(document).on("click","#RegistrarDatosEv",async function(){
  const dv = "FormInsertaEvaluacion";
  const resultV = await validateDiv(dv);
  if (resultV) {
    const title = "¿Desea generar una nueva evaluación con los datos ingresados?";
    const resultDi = await dialogConfirmSAlert(title);
    if (resultDi) {
      await addEvaluacion();
    }
  }
});

async function addEvaluacion(){
  let dataSend = {
    op: "addEvaluacion",
    inpTitulo: inpTitulo.value,
    inpFechaInicio: inpFechaInicio.value,
    inpFechaFin: inpFechaFin.value
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    getEvaluaciones();
    $("#NuevaEvaluacionModal").modal('close');
  }
}

$(document).on("click","#btn_open_new",function(){
  const dv = "FormInsertaEvaluacion";
  cleanContenedorInp(dv);
  $("#NuevaEvaluacionModal").modal('open');
});
