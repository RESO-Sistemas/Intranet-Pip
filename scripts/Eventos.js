let globalEvento = "0";
let gridEventos = null;

$(document).ready(function() {
  getEventos();
});

function getEventos() {
  let division = $("#slctDivision").val();
  let datasend = { op: "getEventosAdmin" };
  
  if (gridEventos) {
    gridEventos.destroy();
  }
  
  $.ajax({
      type: "POST",
      url: "Backend/Eventos/App.php",
      data: datasend,
      dataType: "json",
      success: function (response) {
        let mappedData = response.map(item => {
          let StatusTexto = (item.Status == "1") ? "Activo" : "Inactivo";
          
          let btnEditar = `<a class="btn btn-warning btn-accion btn-editar-ev" title="Editar"><span class="material-symbols-outlined">edit</span></a>`;
          let btnStatus = `<a class="btn btn-success btn-accion btn-status-ev" title="Actualizar Estatus"><span class="material-symbols-outlined">autorenew</span></a>`;
          
          return {
              ...item,
              StatusTexto: StatusTexto,
              BtnEditar: btnEditar,
              BtnStatus: btnStatus
          };
        });

        gridEventos = new ej.grids.Grid({
            dataSource: mappedData,
            toolbar: ["Search"],
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
                <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
                    <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">event</span>
                </div>
                <h5 class="text-dark mb-2" style="font-weight: 600;">Sin eventos</h5>
                <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay eventos registrados en el sistema.</p>
              </div>`,
            columns: [
              { field: "Titulo", headerText: "TITULO", width: 200 },
              { field: "Descripcion", headerText: "DESCRIPCIÓN", width: 250 },
              { field: "FechaInicio", headerText: "FECHA INICIO", width: 130 },
              { field: "FechaFin", headerText: "FECHA FIN", width: 130 },
              { field: "StatusTexto", headerText: "STATUS", width: 120 },
              { field: "BtnEditar", headerText: "EDITAR", width: 100, textAlign: "Center", disableHtmlEncode: false },
              { field: "BtnStatus", headerText: "EDITAR STATUS", width: 140, textAlign: "Center", disableHtmlEncode: false }
            ],
            dataBound: function () {
              const gridElement = this.element;
              const toolbar = gridElement.querySelector(".e-toolbar");
              const header = gridElement.querySelector(".e-gridheader");
              const pager = gridElement.querySelector(".e-gridpager");
              const gridContent = gridElement.querySelector(".e-gridcontent");
              if (this.currentViewData.length === 0) {
                if (toolbar) toolbar.style.display = "none";
                if (header) header.style.display = "none";
                if (pager) pager.style.display = "none";
                gridElement.style.border = "none";
                if (gridContent) gridContent.style.border = "none";
              } else {
                if (toolbar) toolbar.style.display = "";
                if (header) header.style.display = "";
                if (pager) pager.style.display = "";
                gridElement.style.border = "";
                if (gridContent) gridContent.style.border = "";
              }
            },
            recordClick: function(args) {
                const clickedElement = args.target;
                if (!clickedElement || typeof clickedElement.closest !== "function") return;
                const rowData = args.rowData;
                if (clickedElement.closest(".btn-editar-ev")) {
                    TipoAccion(rowData.idEventos);
                }
                if (clickedElement.closest(".btn-status-ev")) {
                    updateStatus(rowData.Status, rowData.idEventos);
                }
            },
            created: function () {
              const searchInput = document.getElementById(this.element.id + "_searchbar");
              if (searchInput && !searchInput.hasListener) {
                searchInput.hasListener = true;
                const grid = this;
                searchInput.addEventListener("keyup", function (event) {
                  grid.search(event.target.value);
                });
              }
            }
        });
        gridEventos.appendTo("#TableEventos");
      }
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
