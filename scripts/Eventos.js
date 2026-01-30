let globalEvento = "0";
getEventos();
function getEventos() {
  let division = $("#slctDivision").val();
  datasend = {
    op: "getEventosAdmin",
  };
  var TableEventos = $("#TableEventos").dataTable({
    destroy: true,
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
      info: "PÁGINA _PAGE_ DE _PAGES_",
      infoEmpty: "NO HAY DATOS PARA MOSTRAR",
      infoFiltered: "",
      search: "BUSCAR",
      paginate: {
        previous: "ANTERIOR",
        next: "SIGUIENTE"
      }
    },
    ajax: {
      type: "POST",
      url: "Backend/Eventos/App.php",
      data: datasend,
      success: function (response) {
        let StatusTexto = "";
        TableEventos.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          if (response[i]["Status"] == "1") {
            StatusTexto = "Activo";
          } else {
            StatusTexto = "Inactivo";
          }
          TableEventos.fnAddData([
            response[i]["Titulo"],
            response[i]["Descripcion"],
            response[i]["FechaInicio"],
            response[i]["FechaFin"],
            StatusTexto,
            `<a class="btn btn-warning"  onclick="TipoAccion(${response[i]["idEventos"]})"><span class="material-symbols-outlined">edit</span></a>`,
            `<a class="btn btn-success"  onclick="updateStatus(${response[i]["Status"]},${response[i]["idEventos"]})"><span class="material-symbols-outlined">autorenew</span></a>`,
          ]);
        }
      },
      complete: function () {
        // $.unblockUI();
      },
    },
  });
}

function EventoOnclick() {
  if (document.getElementById("FomrInsertaEvento").checkValidity()) {
    event.preventDefault();
    let form = $("#FomrInsertaEvento")[0];
    let data = new FormData(form);
    if (globalEvento == "0") {
      data.append("op", "addEvento");
    } else {
      data.append("op", "updateEvento");
      data.append("idEventos", globalEvento);
    }
    $.ajax({
      type: "post",
      url: "Backend/Eventos/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response == "1") {
          toastr.success("Datos Guardados");
          const messageContent = `
      <div class="alert-content">
         <span class="alert-title">Completado!</span>
          <span class="alert-text">Datos Guardados.</span>
      </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          // Cerrar el modal de Bootstrap 5
          var modalEl = document.getElementById("ModalEvento");
          var modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalEl);
          }
          modalInstance.hide();

          setTimeout(function () {
            getEventos();
          }, 700);
        } else {
          // toastr.info("Datos no guardados");
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Datos no guardados.</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // toastr.info("Ingrese todos los datos / Fecha no valida");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese todos los datos / Fecha no valida</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

function TipoAccion(valor) {
  globalEvento = valor;

  // Obtener el modal
  var modalEl = document.getElementById("ModalEvento");
  var modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (!modalInstance) {
    modalInstance = new bootstrap.Modal(modalEl);
  }

  if (globalEvento > 0) {
    // Editar evento: traemos los datos
    $.ajax({
      type: "post",
      url: "Backend/Eventos/App.php",
      data: { op: "getDatosEvento", idEventos: valor },
      success: function (response) {
        response = JSON.parse(response.trim());
        $("#RegistrarEvento").html("Actualizar evento");
        $("#txtTitulo").val(response[0]["Titulo"]);
        $("#txtDescripcion").val(response[0]["Descripcion"]);
        $("#txtFechaInicio").val(response[0]["FechaInicio"]);
        $("#txtFechaFin").val(response[0]["FechaFin"]);
        $("#txtHoraInicio").val(response[0]["HoraInicio"]);
        $("#txtHoraFin").val(response[0]["HoraFin"]);

        // Abrir modal después de llenar los datos
        modalInstance.show();
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // Nuevo evento
    $("#RegistrarEvento").html("Agregar evento");
    limpiarInputsModal();

    // Abrir modal directamente
    modalInstance.show();
  }
}

function limpiarInputsModal() {
  $("#txtTitulo").val("");
  $("#txtDescripcion").val("");
  $("#txtFechaInicio").val("");
  $("#txtFechaFin").val("");
  $("#txtHoraInicio").val("");
  $("#txtHoraFin").val("");
}

function updateStatus(accion, evento) {
  let status = "";
  if (accion == 1) {
    status = 0;
  } else {
    status = 1;
  }
  datos = {
    op: "updateStatusEvento",
    Status: status,
    idEventos: evento,
  };
  $.ajax({
    type: "post",
    url: "Backend/Eventos/App.php",
    data: datos,
    success: function (response) {
      if (response == 1) {
        toastr.success("Status actualizado");
        setTimeout(function () {
          getEventos();
        }, 500);
      } else {
        toastr.info("Status no actualizado");
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
