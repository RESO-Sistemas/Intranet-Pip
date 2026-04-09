$("#btnGuardarOrg").click(function () {
  console.log("=== CLICK EN GUARDAR ORGANIGRAMA ===");
  
  if (document.getElementById("formInsertaOrg").checkValidity()) {
    event.preventDefault();
    
    console.log("Formulario válido, enviando datos...");
    
    let form = $("#formInsertaOrg")[0];
    let data = new FormData(form);
    
    console.log("Datos del formulario:", [...data]);
    
    $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        console.log("=== RESPUESTA DEL BACKEND (Organigrama) ===");
        console.log("Response original:", response);
        console.log("Response type:", typeof response);
        
        if (response != 0) {
          response = JSON.parse(response.trim());
          console.log("Response parseado:", response);
          
          if (response[0]["Retorno"] == 1) {
            console.log("Redireccionando a:", `OrganigramaSv.php?Org=${response[0]["Organigrama"]}`);
            window.location.href = `OrganigramaSv.php?Org=${response[0]["Organigrama"]}`;
          } else {
            console.error("Retorno != 1");
            const messageContent = `
            <div class="alert-content">
                <span class="alert-title">Error!</span>
                <span class="alert-text">No se pudo crear el organigrama.</span>
            </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
          }
        } else {
          console.error("Response == 0");
          const messageContent = `
          <div class="alert-content">
              <span class="alert-title">Error!</span>
              <span class="alert-text">Error al guardar el organigrama.</span>
          </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        console.error("Error en AJAX:", e);
        alert(e.responseText);
      },
    });
  } else {
    console.log("Formulario NO válido");
    // toastr.info("Ingrese el titulo");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese el titulo.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
});
$("#btnNewOrganigrama").click(function () {
  var modalEl = document.getElementById("ModalNewOrganigrama");
  var modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (!modalInstance) {
    modalInstance = new bootstrap.Modal(modalEl);
  }
  modalInstance.show();
});

getOrganigramas();
let tableOrganigramas = $("#tableOrganigramas").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY ORGANIGRAMAS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
    paginate: {
      previous: "ANTERIOR",
      next: "SIGUIENTE"
    }
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

async function getOrganigramas() {
  let datos = await {
    op: "getOrganigramasControl",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    tableOrganigramas.fnClearTable();
    let OrganigramaId = "";
    let TextStatus = "";
    let statusBadge = "";
    respuesta.forEach((registros) => {
      const isActive = registros.Status == 1;
      const statusBadge = isActive 
        ? `<span class="badge bg-success">Activo</span>` 
        : `<span class="badge bg-danger">Inactivo</span>`;
      const statusIcon = isActive ? 'toggle_on' : 'toggle_off';
      const statusColor = isActive ? 'btn-success' : 'btn-danger';
      const statusTitle = isActive ? 'Desactivar' : 'Activar';

      OrganigramaId = btoa(registros.idOrganigramas);
      tableOrganigramas.fnAddData([
        registros.Titulo,
        statusBadge,
        `<div class="d-flex justify-content-center gap-2">
            <a class="btn btn-warning btn-accion" href="OrganigramaSv.php?Org=${OrganigramaId}" title="Editar">
                <span class="material-symbols-outlined">edit</span>
            </a>
            <button type="button" class="btn ${statusColor} btn-accion" onclick="updateStatusOrganigrama('${OrganigramaId}')" title="${statusTitle}">
                <span class="material-symbols-outlined">${statusIcon}</span>
            </button>
        </div>`,
      ]);
    });
  }
}

async function updateStatusOrganigrama(val) {
  let datos = await {
    op: "updateStatusOrganigrama",
    idOrganigramas: val,
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      // toastr.success("Status Actualizado");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Status Actualizado.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      getOrganigramas();
    } else {
      // toastr.info("ERROR");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">ERROR.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
}
