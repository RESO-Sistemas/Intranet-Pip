let aux = "10000";
getEsquemaVacunacion();
// function esquemaCOVID(){
//   aux ++;
//   $("#esquemaEmpleado").append(`
//     <div class="row" id="esquema${aux}">
//       <div class="input-field col s2 l2">
//           <input id="txtNumeroVacuna${aux}" name="txtNumeroVacuna[]" type="text" required onkeypress="return onlynumber(event)">
//           <label for="txtNumeroVacuna${aux}">Numero</label>
//       </div>
//       <div class="input-field col s5 l5">
//           <input id="txtNombreVacuna${aux}" name="txtNombreVacuna[]" type="text" required>
//           <label for="txtNombreVacuna${aux}">Vacuna</label>
//       </div>
//       <div class="input-field col s3 l3">
//           <input id="" name="txtFecha[]" type="date">
//       </div>
//       <div class="col s2 l2">
//         <div class="col s12 l12" style="align-content: center;align-items: center;text-align: center;">
//           <a style="min-width:100%" class="waves-effect waves-light btn red"onclick="removeEsquema(${aux})">Eliminar</a>
//         </div>
//       </div>
//     </div>
//     <hr id="hresquema${aux}">
//     `);
// }
function esquemaCOVID() {
  aux++;
  $("#esquemaEmpleado").append(`
<div class="row mb-3" id="esquema${aux}">
  <div class="col-12 col-md-2">
    <label for="txtNumeroVacuna${aux}" class="form-label">Número</label>
    <input id="txtNumeroVacuna${aux}" name="txtNumeroVacuna[]" type="text" class="form-control form-control-solid-bordered" required onkeypress="return onlynumber(event)">
  </div>
  <div class="col-12 col-md-5">
    <label for="txtNombreVacuna${aux}" class="form-label">Vacuna</label>
    <input id="txtNombreVacuna${aux}" name="txtNombreVacuna[]" type="text" class="form-control form-control-solid-bordered" required>
  </div>
  <div class="col-12 col-md-3">
    <label class="form-label">Fecha</label>
    <input name="txtFecha[]" type="date" class="form-control form-control-solid-bordered">
  </div>
  <div class="col-12 col-md-2 d-flex align-items-end">
    <button type="button" class="btn btn-danger w-100" onclick="removeEsquema(${aux})">Eliminar</button>
  </div>
</div>
<hr id="hresquema${aux}">

    `);
}

function removeEsquema(val) {
  $("#esquema" + val).remove();
  $("#hresquema" + val).remove();
}

function addEsquemaCOVID() {
  if (document.getElementById("formInsertaEsquema").checkValidity()) {
    event.preventDefault();
    var form = $("#formInsertaEsquema")[0];
    var data = new FormData(form);
    $.ajax({
      type: "POST",
      url: "Backend/Empleados/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response == "1") {
          // toastr.success("Actualizado");
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Actualizado</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          $("#esquemaEmpleado").html("");
          getEsquemaVacunacion();
        } else {
          // toastr.info(response);
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${response}</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // toastr.info("Ingrese los campos obligatorios");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese los campos obligatorios.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

$("#guardarNuevos").click(function () {
  addEsquemaCOVID();
});

function getEsquemaVacunacion() {
  $("#getesquemaEmpleado").html("");
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getEsquemaVacunacion",
    success: function (response) {
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#getesquemaEmpleado").append(`
<div class="row align-items-center mb-2" id="esquema${response[i]["idEsquemaVacunacionCOVID"]}">
  <div class="col-2">
    <label class="form-label" for="txtNumeroVacuna${response[i]["idEsquemaVacunacionCOVID"]}">Número</label>
    <input type="text" class="form-control form-control-solid-bordered"
      id="txtNumeroVacuna${response[i]["idEsquemaVacunacionCOVID"]}"
      value="${response[i]["Numero"]}" required
      onkeypress="return onlynumber(event)">
  </div>
  <div class="col-5">
    <label class="form-label" for="txtNombreVacuna${response[i]["idEsquemaVacunacionCOVID"]}">Vacuna</label>
    <input type="text" class="form-control form-control-solid-bordered"
      id="txtNombreVacuna${response[i]["idEsquemaVacunacionCOVID"]}"
      value="${response[i]["Vacuna"]}" required>
  </div>
  <div class="col-3">
    <label class="form-label" for="txtFecha${response[i]["idEsquemaVacunacionCOVID"]}">Fecha de Vacunación</label>
    <input type="date" class="form-control form-control-solid-bordered"
      id="txtFecha${response[i]["idEsquemaVacunacionCOVID"]}"
      value="${response[i]["FechaVacunacion"]}">
  </div>
<div class="col-2 d-flex flex-column justify-content-end gap-2">
  <button type="button" class="btn btn-danger d-flex justify-content-center align-items-center"
    onclick="deleteEsquemaVacunacion(${response[i]["idEsquemaVacunacionCOVID"]})">
    Eliminar
  </button>
  <button type="button" class="btn btn-primary  d-flex justify-content-center align-items-center"
    onclick="updateEsquemaVacunacion(${response[i]["idEsquemaVacunacionCOVID"]})">
    Modificar
  </button>
</div>
</div>
<hr>

          `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function deleteEsquemaVacunacion(Esquema) {
  Swal.fire({
    title: "¿Desea eliminar los datos?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar Datos",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data:
          "op=deleteEsquemaVacunacion" + "&idEsquemaVacunacionCOVID=" + Esquema,
        success: function (response) {
          if (response == "1") {
            // toastr.success("Actualizado");
            const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Actualizado</span>
          </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            setTimeout(function () {
              getEsquemaVacunacion();
            }, 400);
          } else {
            // toastr.info("Error al actualizar");
            const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error al actualizar.</span>
        </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
          }
        },
        error: function (e) {
          alert(e.responseText);
        },
      });
    }
  });
}

function updateEsquemaVacunacion(val) {
  Swal.fire({
    title: "¿Desea actualizar los datos?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Actualizar Datos",
  }).then((result) => {
    if (result.isConfirmed) {
      let numero = $("#txtNumeroVacuna" + val).val();
      let vacuna = $("#txtNombreVacuna" + val).val();
      let fecha = $("#txtFecha" + val).val();
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data:
          "op=updateEsquemaVacunacion" +
          "&Numero=" +
          numero +
          "&Vacuna=" +
          vacuna +
          "&FechaVacunacion=" +
          fecha +
          "&idEsquemaVacunacionCOVID=" +
          val,
        success: function (response) {
          if (response == "1") {
            // toastr.success("Actualizado");
            const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Actualizado</span>
          </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            setTimeout(function () {
              getEsquemaVacunacion();
            }, 400);
          } else {
            // toastr.info("Error al actualizar");
            const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error al actualizar.</span>
        </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
          }
        },
        error: function (e) {
          alert(e.responseText);
        },
      });
    }
  });
}
