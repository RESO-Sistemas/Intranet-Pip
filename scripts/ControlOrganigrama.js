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
  var modal = new bootstrap.Modal(
    document.getElementById("ModalNewOrganigrama")
  );
  modal.show();
});

getOrganigramas();
let gridOrganigramas = null;

async function getOrganigramas() {
  let datos = {
    op: "getOrganigramasControl",
  };
  
  if (gridOrganigramas) {
    gridOrganigramas.destroy();
  }
  
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
    let mappedData = respuesta.map((registros) => {
      let statusBadge = "";
      if (registros.Status == 1) {
        statusBadge = `<span class="badge bg-success">Activo</span>`;
      } else {
        statusBadge = `<span class="badge bg-warning">Inactivo</span>`;
      }
      let OrganigramaId = btoa(registros.idOrganigramas);
      
      let btnEditar = `<a type="button" class="btn btn-warning btn-accion" href="OrganigramaSv.php?Org=${OrganigramaId}"><span class="material-symbols-outlined">edit</span></a>`;
      let btnStatus = `<button type="button" class="btn btn-success btn-accion btn-status-org" title="Cambiar Status"><span class="material-symbols-outlined">autorenew</span></button>`;
      
      return {
          ...registros,
          StatusBadge: statusBadge,
          BtnEditar: btnEditar,
          BtnStatus: btnStatus,
          OrganigramaIdBase64: OrganigramaId
      };
    });

    gridOrganigramas = new ej.grids.Grid({
        dataSource: mappedData,
        toolbar: ["Search"],
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
            <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
                <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">account_tree</span>
            </div>
            <h5 class="text-dark mb-2" style="font-weight: 600;">Sin organigramas</h5>
            <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay organigramas registrados en el sistema.</p>
          </div>`,
        columns: [
          { field: "Titulo", headerText: "ORGANIGRAMA", width: 250 },
          { field: "StatusBadge", headerText: "STATUS", width: 150, disableHtmlEncode: false },
          { field: "BtnEditar", headerText: "EDITAR", width: 120, textAlign: "Center", disableHtmlEncode: false },
          { field: "BtnStatus", headerText: "CAMBIAR STATUS", width: 150, textAlign: "Center", disableHtmlEncode: false }
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
            if (clickedElement.closest(".btn-status-org")) {
                updateStatusOrganigrama(rowData.OrganigramaIdBase64);
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
    gridOrganigramas.appendTo("#tableOrganigramas");
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
