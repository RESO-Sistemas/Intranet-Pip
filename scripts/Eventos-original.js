let globalEvento = "0";
getEventos();
function getEventos(){
  let division = $("#slctDivision").val();
  datasend = {
    op: "getEventosAdmin"
  }
  var TableEventos = $('#TableEventos').dataTable({
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Eventos/App.php",
      "data":datasend,
      "success" : function(response){
        let StatusTexto = "";
        TableEventos.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          if (response[i]["Status"] == "1") {
             StatusTexto = "Activo";
          }else {
             StatusTexto = "Inactivo";
          }
          TableEventos.fnAddData([
            response[i]["Titulo"],
            response[i]["Descripcion"],
            response[i]["FechaInicio"],
            response[i]["FechaFin"],
            StatusTexto,
            `<a class="waves-effect waves-light btn btn-round indigo modal-trigger" href="#ModalEvento"  onclick="TipoAccion(${response[i]["idEventos"]})">Editar Evento</a>`,
            `<a class="waves-effect waves-light btn btn-round indigo"  onclick="updateStatus(${response[i]["Status"]},${response[i]["idEventos"]})">Editar Status</a>`

          ]);
        }
      },
      "complete" : function(){
          // $.unblockUI();
        }
    }
  });
}


function EventoOnclick () {
  if (document.getElementById("FomrInsertaEvento").checkValidity()){
    event.preventDefault();
    let form = $("#FomrInsertaEvento")[0];
    let data = new FormData(form);
    if (globalEvento == "0") {
      data.append("op","addEvento");
    }else {
      data.append("op","updateEvento");
      data.append("idEventos",globalEvento);
    }
    $.ajax({
      type:"post",
      url: "Backend/Eventos/App.php",
      data: data,
      processData:false,
      contentType:false,
      cache: false,
      timeout:600000,
      success:function(response){
        if (response == "1") {
          toastr.success("Datos Guardados");
          $("#ModalClose").click();
          setTimeout(function () {
            getEventos();
          }, 700);
        }else {
          toastr.info("Datos no guardados");
        }
      },error:function(e){
        alert(e.responseText);
      }
    });
  }else {
    toastr.info("Ingrese todos los datos / Fecha no valida");
  }
}

function TipoAccion (valor) {
  globalEvento = valor;
  if (globalEvento > 0) {
    globalEvento = valor;
    datos = {
      op: "getDatosEvento",
      idEventos: valor
    }
    $.ajax({
      type: "post",
      url: "Backend/Eventos/App.php",
      data: datos,
      success:function(response){
        response = JSON.parse(response.trim());
        $("#RegistrarEvento").html("Actualizar evento");
        $("#txtTitulo").val(response[0]["Titulo"]);
        $("#txtDescripcion").val(response[0]["Descripcion"]);
        $("#txtFechaInicio").val(response[0]["FechaInicio"]);
        $("#txtFechaFin").val(response[0]["FechaFin"]);
        $("#txtHoraInicio").val(response[0]["HoraInicio"]);
        $("#txtHoraFin").val(response[0]["HoraFin"]);
      },error:function(e){
        alert(e.responseText);
      }
    });
  }else {
    $("#RegistrarEvento").html("Agregar evento");
    limpiarInputsModal();
  }
}

function limpiarInputsModal () {
  $("#txtTitulo").val("");
  $("#txtDescripcion").val("");
  $("#txtFechaInicio").val("");
  $("#txtFechaFin").val("");
  $("#txtHoraInicio").val("");
  $("#txtHoraFin").val("");
}

function updateStatus (accion,evento) {
  let status = "";
  if (accion == 1) {
    status = 0;
  }else {
    status = 1;
  }
  datos = {
    op:"updateStatusEvento",
    Status: status,
    idEventos: evento
  }
  $.ajax({
    type:"post",
    url:"Backend/Eventos/App.php",
    data: datos,
    success:function (response){
      if (response == 1) {
        toastr.success("Status actualizado");
        setTimeout(function () {
          getEventos();
        }, 500);
      }else {
        toastr.info("Status no actualizado");
      }
    },error:function (e) {
      alert(e.responseText);
    }
  });
}
