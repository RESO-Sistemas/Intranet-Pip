cargarDatos();
function cargarDatos() {
  getDivisiones();
  getOpcionesLineaEtica();
  $('#division').select2({ placeholder: "Línea de ética" });
  $('#sl_branch').select2({ placeholder: "Seleccione una sucursal" });
  $('#slctLineaEtica').select2({ placeholder: "Selecciona una opción" });
}

$(document).on("change", "#division", () => {
  getListBranches();
  $("#sl_branch").prop("disabled", false);
  // Al cambiar división, reiniciamos el selector de sucursal
  $('#sl_branch').val(null).trigger('change');
});

async function getListBranches() {
  let ajaxR = await pAjaxAsync(
    url_m_Sucursal,
    {
      op: "getAllBranchesPerDiv",
      div: $("#division").val(),
    },
    1
  );
  if (!!ajaxR) {
    $("#sl_branch").empty();
    printOptionsSelect(ajaxR.Data, {
      initialOption: "Seleccione una sucursal",
      idElement: "sl_branch",
    });
    // Forzamos la actualización de Select2 tras cargar los datos
    $('#sl_branch').trigger('change');
  }
}

function getOpcionesLineaEtica() {
  datos = {
    op: "getOpcionesLineaEtica",
  };
  $.ajax({
    type: "post",
    url: "Backend/LineaEtica/App.php",
    data: datos,
    success: function (response) {
      $("#slctLineaEtica").html("");
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctLineaEtica").append(`
          <option value="${response[i]["idCatalogoLineaEtica"]}">${response[i]["Descripcion"]}</option>
          `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

//Inicio - Visualizar divisiones (Departamentos), solo CAS y CEDI.
function getDivisiones() {
  datos = {
    op: "getDivisiones",
  };
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: datos,
    success: (ajaxResponse) => {
      // $("#division").html("");
      ajaxResponse = JSON.parse(ajaxResponse.trim());
      ajaxResponse.map((a) => {
        //(a.IdDivision != 5) ? $("#division").append(`<option value="${a.IdDivision}">${a.Division}</option>`) : console.log("Ta bien");
        $("#division").append(
          `<option value="${a.IdDivision}">${a.Division}</option>`
        );
      });
    },
    error: (e) => {
      alert(e.responseText);
    },
  });
}
//Fin - Visualizar divisiones (Departamentos), solo CAS y CEDI.

$("#EnviarLineaE").click(async function () {
  let v = await verifyInputsDv("formLineaEtica");
  if (v) {
    if (document.getElementById("formLineaEtica").checkValidity()) {
      event.preventDefault();
      let form = $("#formLineaEtica")[0];
      let data = new FormData(form);
      data.append("op", "addMensajeLineaEtica");
      $.ajax({
        type: "POST",
        url: "Backend/LineaEtica/App.php",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {
          if (response == "1") {
            // toastr.success("Mensaje Enviado");
            const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Mensaje Enviado.</span>
          </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            setTimeout(function () {
              window.location.href = `index.php`;
            }, 1000);
          } else if (response == "0") {
            // toastr.info("Mensaje no Enviado");
            const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Mensaje no Enviado.</span>
        </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
          }
        },
        error: function (e) {
          alert(e.responseText);
        },
      });
    } else {
      // toastr.info("Ingrese todos los datos");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese todos los datos.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
});
