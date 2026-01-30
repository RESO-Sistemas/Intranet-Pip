$("#btnGuardarOrg").click(function () {
  if (document.getElementById("formInsertaOrg").checkValidity()) {
    event.preventDefault();
    let form = $("#formInsertaOrg")[0];
    let data = new FormData(form);
    $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response != 0) {
          response = JSON.parse(response.trim());
          if (response[0]["Retorno"] == 1) {
            window.location.href = `OrganigramaSv.php?Org=${response[0]["Organigrama"]}`;
          }
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
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
    respuesta.forEach((registros) => {
      if (registros.Status == 1) {
        TextStatus = "Activo";
      } else {
        TextStatus = "Inactivo";
      }
      OrganigramaId = btoa(registros.idOrganigramas);
      tableOrganigramas.fnAddData([
        registros.Titulo,
        TextStatus,
        `<div class="row">
                      <div class="col-12 col-lg-4 offset-lg-4">
                          <a type="button" class="btn btn-warning" href="OrganigramaSv.php?Org=${OrganigramaId}"><span class="material-symbols-outlined">edit</span></a>
                      </div>
                  </div>`,
        `<div class="row">
                  <div class="col-12 col-lg-4 offset-lg-4">
                  <button type="button" class="btn btn-success" onclick="updateStatusOrganigrama('${OrganigramaId}')"><span class="material-symbols-outlined">autorenew</span></button>
              </div>
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
