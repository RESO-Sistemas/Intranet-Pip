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
      toastr.info("Ingrese el titulo");
    }
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
                      <div class="col s12 l4 offset-l4">
                          <a type="button" class="button-1" href="OrganigramaSv.php?Org=${OrganigramaId}"><i class="fal fa-edit"></i></a>
                      </div>
                  </div>`,
          `<div class="row">
                  <div class="col s12 l4 offset-l4">
                  <button type="button" class="button-1" onclick="updateStatusOrganigrama('${OrganigramaId}')"><i class="fal fa-random"></i></button>
              </div>
                  </div>`,
        ]);
      });
    }
  }
  
  
  async function updateStatusOrganigrama (val) {
      let datos = await {
          op: "updateStatusOrganigrama",
          idOrganigramas:  val
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
              toastr.success("Status Actualizado");
              getOrganigramas();
          } else {
              toastr.info("ERROR");
          }
      }
  }