$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
});
getTiposExtensionesDirectorioExtensiones();
loadDirecorioEmailTel();
loadDirectorioExtensiones();
async function loadDirecorioEmailTel() {
  const DirEmailTel = await getDirecorioEmailTel();

  let ContenidoDirEmailTel = "";
  DirEmailTel.forEach((ContenidoDirectorio) => {
    let ArrayRegistrosDirectorioTipo = [];
    ContenidoDirectorio.Tipos.map((Registros) => {
      ContenidoDirEmailTel += `
        <div class="table-responsive">
          <table id="${Registros.idDirectoriosCorreosTelefonos}" class="table striped m-b-10 display text-center">
            <thead>
              <tr>
                <th colspan="12">
                  <div class="row">
                    <div class="col-12 text-center">
                      <span class="badge badge-primary">${Registros.Tipo}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col" style="text-align:left">
                      <button type="button" class="btn btn-success" onclick="openModalAddEmpCorreosTelefonos(${Registros.idDirectoriosCorreosTelefonos},'${Registros.Tipo}')">
                        <span class="material-symbols-outlined">add_call</span>
                      </button>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-center">NOMBRE</th>
                <th class="text-center">PUESTO</th>
                <th class="text-center">CORREO</th>
                <th class="text-center">TELEFONO</th>
                <th class="text-center">MARCACION CORTA</th>
                <th class="text-center">ACTUALIZAR</th>
                <th class="text-center">ELIMINAR</th>
              </tr>
            </thead>
            <tbody>`;

      ContenidoDirectorio.Detalle.filter((Detalle) => {
        if (
          Detalle.idDirectoriosCorreosTelefonos ==
          Registros.idDirectoriosCorreosTelefonos
        ) {
          ContenidoDirEmailTel += `
            <tr>
              <td class="text-center align-middle">${Detalle.Nombre}</td>
              <td class="text-center align-middle">${Detalle.Puesto}</td>
              <td class="text-center align-middle">
                <input class="form-control form-control-solid-bordered text-center d-block mx-auto" 
                       type="email" value="${Detalle.Email}" 
                       id="emailDir${Detalle.idDetalleDirectoriosCorreosTelefonos}" 
                       style="width: 120px;">
              </td>
              <td class="text-center align-middle">
                <input class="form-control form-control-solid-bordered text-center d-block mx-auto" 
                       type="text" value="${Detalle.Movil}" 
                       id="movilDir${Detalle.idDetalleDirectoriosCorreosTelefonos}" 
                       style="width: 120px;" onkeypress="return onlynumber(event)" maxlength="10">
              </td>
              <td class="text-center align-middle">
                <input class="form-control form-control-solid-bordered text-center d-block mx-auto" 
                       type="text" value="${Detalle.MarcacionCorta}" 
                       id="MCortaDir${Detalle.idDetalleDirectoriosCorreosTelefonos}" 
                       style="width: 120px;" onkeypress="return onlynumber(event)" maxlength="4">
              </td>
              <td class="text-center align-middle">
                <button class="btn btn-warning d-flex justify-content-center align-items-center mx-auto" 
                        style="width: 50px; height: 40px;" 
                        onclick="updateRegistroDirectorioCorreosTelefonos(${Detalle.idDetalleDirectoriosCorreosTelefonos})">
                  <span class="material-symbols-outlined" style="font-size:20px;">edit</span>
                </button>
              </td>
              <td class="text-center align-middle">
                <button class="btn btn-danger d-flex justify-content-center align-items-center mx-auto" 
                        style="width: 50px; height: 40px;" 
                        onclick="deleteEmpleadosDirectorioCorreosTelefonos(${Detalle.idDetalleDirectoriosCorreosTelefonos})">
                  <span class="material-symbols-outlined" style="font-size:20px;">delete</span>
                </button>
              </td>
            </tr>`;
        }
      });

      ContenidoDirEmailTel += `
            </tbody>
          </table>
        </div>`;
    });
  });

  $("#contenidoDirectorioEmailTelefonos").html(ContenidoDirEmailTel);
}

async function updateRegistroDirectorioCorreosTelefonos(val) {
  const result = await Swal.fire({
    title: "Confirmación de acción",
    text: "¿Desea confirmar los datos actualizados?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      let Email = $("#emailDir" + val).val();
      let Telefono = $("#movilDir" + val).val();
      let MCorta = $("#MCortaDir" + val).val();

      let datos = {
        op: "updateRegistroDirectorioCorreosTelefonos",
        Email: Email,
        Telefono: Telefono,
        Registro: val,
        MCorta: MCorta,
      };

      let respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == "1") {
        // Swal.fire("Actualizado", "Actualizado correctamente.", "success");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Actualizado correctamente.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        loadDirecorioEmailTel();
      } else {
        // Swal.fire("Error", respuesta, "error");
        const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">${respuesta}.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.log(error);
      //   Swal.fire("Error", "Ocurrió un error inesperado.", "error");
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Ocurrió un error inesperado.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else {
    // Swal.fire("Cancelado", "Se canceló la acción.", "info");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Se canceló la acción.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

async function getDirecorioEmailTel() {
  let datos = await {
    op: "getDirectorioCorreosTelefonos",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return respuesta;
  }
}

async function openModalAddEmpCorreosTelefonos(idTipo, Nombre) {
  // Mostrar pantalla de carga
  $.blockUI({
    message: '<h5><i class="fa fa-spinner fa-spin"></i>',
    css: {
      border: "none",
      padding: "15px",
      backgroundColor: "#000",
      "-webkit-border-radius": "10px",
      "-moz-border-radius": "10px",
      opacity: 0.5,
      color: "#ffc407",
    },
  });

  $("#NameDirectorio").html(`Directorio: ${Nombre}`);
  $("#IdTipoEmTel").val(idTipo);
  $("#slctDivisionEm").val("");
  $("#slctPuestoEm").val("");
  $("#slctSucursalEm").val("");

  try {
    await Promise.all([
      getPuestos(),
      getDivisiones(),
      getSucursales(),
      getListadoPersonal(),
    ]);

    var modal = new bootstrap.Modal(
      document.getElementById("modalAddEmpleadosDirectorioEmTel")
    );
    modal.show();
  } catch (err) {
    console.error("Error cargando datos:", err);
  } finally {
    // Quitar pantalla de carga
    $.unblockUI();
  }
}

function getListadoPersonal() {
  return new Promise((resolve, reject) => {
    let puesto = $("#slctPuestoEm").val();
    let sucursal = $("#slctSucursalEm").val();
    let division = $("#slctDivisionEm").val();
    let TipoDirectorio = Number($("#IdTipoEmTel").val());

    let datasend = {
      op: "getPersonalDirectorioEmailTel",
      puesto: puesto,
      sucursal: sucursal,
      division: division,
      idDirectoriosCorreosTelefonos: TipoDirectorio,
    };

    let tableEmpleadosEmTel = $("#tableEmpleadosEmTel").dataTable({
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
        url: "Backend/Empleados/App.php",
        data: datasend,
        success: function (response) {
          tableEmpleadosEmTel.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            tableEmpleadosEmTel.fnAddData([
              response[i]["NoEmpleado"],
              response[i]["Nombre"],
              `<div class="row">
                  <div class="col">
                    <button type="button" class="btn btn-success" onclick="SeleccionarEmpleadoDirEmTel(${response[i]["NoEmpleado"]},'${response[i]["Nombre"]}')"><span class="material-symbols-outlined">add</span></button>
                  </div>
              </div>`,
            ]);
          }
        },
        complete: function () {
          resolve(); // 🔑 aquí le decimos a la Promise que terminó
        },
        error: function (err) {
          reject(err);
        },
      },
    });
  });
}

// function getListadoPersonal() {
//   let puesto = $("#slctPuestoEm").val();
//   let sucursal = $("#slctSucursalEm").val();
//   let division = $("#slctDivisionEm").val();
//   let TipoDirectorio = Number($("#IdTipoEmTel").val());
//   datasend = {
//     op: "getPersonalDirectorioEmailTel",
//     puesto: puesto,
//     sucursal: sucursal,
//     division: division,
//     idDirectoriosCorreosTelefonos: TipoDirectorio,
//   };
//   let tableEmpleadosEmTel = $("#tableEmpleadosEmTel").dataTable({
//     destroy: true,
//     ajax: {
//       type: "POST",
//       url: "Backend/Empleados/App.php",
//       data: datasend,
//       success: function (response) {
//         tableEmpleadosEmTel.fnClearTable();
//         for (var i = 0; i < response.length; i++) {
//           tableEmpleadosEmTel.fnAddData([
//             response[i]["NoEmpleado"],
//             response[i]["Nombre"],
//             `<div class="row">
//                     <div class="col s12 l6 offset-l3">
//                       <button type="button" class="btn btn-success" onclick="SeleccionarEmpleadoDirEmTel(${response[i]["NoEmpleado"]},'${response[i]["Nombre"]}')"><span class="material-symbols-outlined">add</span></button>
//                     </div>
//                 </div>`,
//           ]);
//         }
//       },
//       complete: function () {
//         // $.unblockUI();
//       },
//     },
//   });
// }

async function SeleccionarEmpleadoDirEmTel(id, nameEmpleado) {
  $("#EmpleadoSelectedEmTel").val(id);
  $("#EmpleadoSeleccionadoEmTel").html(nameEmpleado);
  $("#txtCorreoEmTel").val("");
  $("#txtTelEmTel").val("");
  $("#txtMCortaEmTel").val("");
}

async function addEmpleadosDirectorioCorreosTelefonos() {
  const result = await Swal.fire({
    title: "Confirmación de acción",
    text: "¿Desea confirmar los datos ingresados?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    let Em = $("#EmpleadoSelectedEmTel").val();
    let Directorio = Number($("#IdTipoEmTel").val());
    let Email = $("#txtCorreoEmTel").val();
    let Telefono = $("#txtTelEmTel").val();
    let MarcacionCorta = $("#txtMCortaEmTel").val();

    let datos = {
      op: "addEmpleadosDirectorioCorreosTelefonos",
      idDirectoriosCorreosTelefonos: Directorio,
      NoEmpleado: Em,
      Email: Email,
      Telefono: Telefono,
      MarcacionCorta: MarcacionCorta,
    };

    try {
      const respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == 1) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Agregado",
        //   timer: 1500,
        //   showConfirmButton: false,
        // });
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Agregado.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        loadDirecorioEmailTel();
        $("#EmpleadoSelectedEmTel").val("");
        $("#EmpleadoSeleccionadoEmTel").html("");
        $("#txtCorreoEmTel").val("");
        $("#txtTelEmTel").val("");
        $("#txtMCortaEmTel").val("");
        getListadoPersonal();
      } else {
        // Swal.fire({
        //   icon: "info",
        //   title: "Aviso",
        //   text: respuesta,
        // });
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${respuesta}.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.error(error);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Error",
      //     text: "Ocurrió un error al procesar la solicitud",
      //   });
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Ocurrió un error al procesar la solicitud.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Cancelado",
    //   timer: 1200,
    //   showConfirmButton: false,
    // });
    const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Cancelado.</span>
            </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
  }
}

function getPuestos() {
  $.ajax({
    type: "post",
    url: "Backend/Puestos/App.php",
    data: "op=getPuestos",
    success: function (response) {
      $("#slctPuestoEm").html("");
      $("#slctPuestoEm").append(`
            <option value="">Puestos</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctPuestoEm").append(`
          <option value='${response[i]["IdPuesto"]}'>${response[i]["Puesto"]}</option>
          `);
      }
      $("#slctPuestoEm").trigger("change");
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
$(document).ready(function () {
  $("#slctDivisionEm").select2({
    dropdownParent: $("#modalAddEmpleadosDirectorioEmTel"),
    width: "100%",
    placeholder: "Seleccione una división",
    allowClear: true,
  });
  $("#slctPuestoEm").select2({
    dropdownParent: $("#modalAddEmpleadosDirectorioEmTel"),
    width: "100%",
    placeholder: "Seleccione un puesto",
    allowClear: true,
  });
  $("#slctSucursalEm").select2({
    dropdownParent: $("#modalAddEmpleadosDirectorioEmTel"),
    width: "100%",
    placeholder: "Seleccione una sucursal",
    allowClear: true,
  });
});

function getDivisiones() {
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: { op: "getDivisiones" },
    success: function (response) {
      try {
        response = JSON.parse(response.trim());
      } catch (e) {
        console.error("Respuesta no es JSON válido:", response);
        return;
      }

      let $select = $("#slctDivisionEm");
      $select.empty().append(`<option value="">Divisiones</option>`);

      for (let i = 0; i < response.length; i++) {
        $select.append(
          `<option value="${response[i].IdDivision}">${response[i].Division}</option>`
        );
      }

      // 🔥 Refrescar la UI de Select2
      $select.trigger("change");
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function getSucursales() {
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: "op=getSucursales",
    success: function (response) {
      $("#slctSucursalEm").html("");
      $("#slctSucursalEm").append(`
            <option value="">Sucursales</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctSucursalEm").append(`
          <option value="${response[i]["IdSucursal"]}">${response[i]["Sucursal"]}</option>
          `);
      }
      $("#slctSucursalEm").trigger("change");
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

async function deleteEmpleadosDirectorioCorreosTelefonos(val) {
  const result = await Swal.fire({
    title: "Confirmación",
    html: "<h6>¿Desea eliminar al Empleado del Directorio?</h6>",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      let datos = {
        op: "deleteEmpleadosDirectorioCorreosTelefonos",
        idDetalleDirectoriosCorreosTelefonos: val,
      };

      let respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == 1) {
        // Swal.fire("Eliminado", "Empleado eliminado correctamente.", "success");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Empleado eliminado correctamente.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        loadDirecorioEmailTel();
      } else {
        // Swal.fire("Error", "No se pudo eliminar el empleado.", "error");
        const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">No se pudo eliminar el empleado.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.log(error);
      //   Swal.fire("Error", "Ocurrió un error inesperado.", "error");
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Ocurrió un error inesperado.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else {
    // Swal.fire("Cancelado", "Se canceló la acción.", "info");
    const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Se canceló la acción.</span>
            </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
  }
}

async function getTiposExtensionesDirectorioExtensiones() {
  let datos = await {
    op: "getTiposExtensionesDirectorioExtensiones",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(respuesta);
    respuesta.forEach((tipos) => {
      $("#tiposExtension").append(`
                <option value="${tipos.idDirectorioExtensiones}">${tipos.Tipo}</option>
            `);
    });
  }
}

async function getDirectorioExtensiones() {
  let TiposExtSelected = $("#tiposExtension").val();
  let datos = await {
    op: "getDirectorioExtensiones",
    TiposExtSelected: TiposExtSelected,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return respuesta;
  }
}

// async function openModalAddEmpExtensiones(idTipo, Nombre) {
//   getPuestosExtensiones();
//   getDivisionesExtensiones();
//   getSucursalesExtensiones();
//   $("#NameDirectorioExtension").html(`Directorio : ${Nombre}`);
//   $("#IdTipoExtensiones").val(idTipo);
//   $("#slctPuestoEmExt").val("");
//   $("#slctDivisionEmExt").val("");
//   $("#slctSucursalEmExt").val("");
//   $("#txtExtension").val("");
//   $("#EmpleadoSeleccionadoDirExt").html("");
//   $("#EmpleadoSelectedExtension").val("");

//   // Bootstrap 5 modal
//   var modal = new bootstrap.Modal(
//     document.getElementById("modalAddEmpleadosDirectorioExtensiones")
//   );
//   modal.show();

//   getListadoPersonalExtensiones();
// }

// function getListadoPersonalExtensiones() {
//   let puesto = $("#slctPuestoEmExt").val();
//   let sucursal = $("#slctSucursalEmExt").val();
//   let division = $("#slctDivisionEmExt").val();
//   let TipoDirectorio = Number($("#IdTipoEmTel").val());
//   datasend = {
//     op: "getPersonalDirectorioExtensiones",
//     puesto: puesto,
//     sucursal: sucursal,
//     division: division,
//     idDirectorioExtensiones: TipoDirectorio,
//   };
//   let tableEmpleadosExtensiones = $("#tableEmpleadosExtensiones").dataTable({
//     destroy: true,
//     ajax: {
//       type: "POST",
//       url: "Backend/Empleados/App.php",
//       data: datasend,
//       success: function (response) {
//         tableEmpleadosExtensiones.fnClearTable();
//         for (var i = 0; i < response.length; i++) {
//           tableEmpleadosExtensiones.fnAddData([
//             response[i]["NoEmpleado"],
//             response[i]["Nombre"],
//             `<div class="row">
//                       <div class="col s12 l6 offset-l3">
//                         <button type="button" class="btn btn-success" onclick="SeleccionarEmpleadoExt(${response[i]["NoEmpleado"]},'${response[i]["Nombre"]}')"><span class="material-symbols-outlined">add</span></button>
//                       </div>
//                   </div>`,
//           ]);
//         }
//       },
//       complete: function () {
//         // $.unblockUI();
//       },
//     },
//   });
// }

async function openModalAddEmpExtensiones(idTipo, Nombre) {
  // Mostrar pantalla de carga
  $.blockUI({
    message: '<h5><i class="fa fa-spinner fa-spin"></i></h5>',
    css: {
      border: "none",
      padding: "15px",
      backgroundColor: "#000",
      "-webkit-border-radius": "10px",
      "-moz-border-radius": "10px",
      opacity: 0.5,
      color: "#ffc407",
    },
  });

  $("#NameDirectorioExtension").html(`Directorio : ${Nombre}`);
  $("#IdTipoExtensiones").val(idTipo);
  $("#slctPuestoEmExt").val("");
  $("#slctDivisionEmExt").val("");
  $("#slctSucursalEmExt").val("");
  $("#txtExtension").val("");
  $("#EmpleadoSeleccionadoDirExt").html("");
  $("#EmpleadoSelectedExtension").val("");

  try {
    // Esperar a que se carguen todos los datos
    await Promise.all([
      getPuestosExtensiones(),
      getDivisionesExtensiones(),
      getSucursalesExtensiones(),
      getListadoPersonalExtensiones(),
    ]);

    // Mostrar modal
    var modal = new bootstrap.Modal(
      document.getElementById("modalAddEmpleadosDirectorioExtensiones")
    );
    modal.show();
  } catch (err) {
    console.error("Error cargando datos:", err);
  } finally {
    // Quitar pantalla de carga
    $.unblockUI();
  }
}

// Hacemos que la función retorne una Promise
function getListadoPersonalExtensiones() {
  return new Promise((resolve, reject) => {
    let puesto = $("#slctPuestoEmExt").val();
    let sucursal = $("#slctSucursalEmExt").val();
    let division = $("#slctDivisionEmExt").val();
    let TipoDirectorio = Number($("#IdTipoExtensiones").val());

    let datasend = {
      op: "getPersonalDirectorioExtensiones",
      puesto: puesto,
      sucursal: sucursal,
      division: division,
      idDirectorioExtensiones: TipoDirectorio,
    };

    let tableEmpleadosExtensiones = $("#tableEmpleadosExtensiones").dataTable({
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
        url: "Backend/Empleados/App.php",
        data: datasend,
        success: function (response) {
          tableEmpleadosExtensiones.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            tableEmpleadosExtensiones.fnAddData([
              response[i]["NoEmpleado"],
              response[i]["Nombre"],
              `<div class="row">
                  <div class="col">
                    <button type="button" class="btn btn-success" onclick="SeleccionarEmpleadoExt(${response[i]["NoEmpleado"]},'${response[i]["Nombre"]}')">
                      <span class="material-symbols-outlined">add</span>
                    </button>
                  </div>
              </div>`,
            ]);
          }
        },
        complete: function () {
          resolve(); // Avisamos que terminó la Promise
        },
        error: function (err) {
          reject(err);
        },
      },
    });
  });
}

async function addEmpleadoDirectorioExtensiones() {
  let idDirectorioExtensiones = await Number($("#IdTipoExtensiones").val());
  let NoEmpleado = await $("#EmpleadoSelectedExtension").val();
  let Extension = await $("#txtExtension").val();
  if (NoEmpleado == "") {
    toastr.info("Seleccione un empleado.");
    return false;
  } else if (Extension == "") {
    toastr.info("Ingrese una extensión.");
    return false;
  } else {
    let datos = await {
      op: "addEmpleadoDirectorioExtensiones",
      idDirectorioExtensiones: idDirectorioExtensiones,
      NoEmpleado: NoEmpleado,
      Extension: Extension,
    };
    respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });
    } catch (error) {
      console.log(error);
    } finally {
      if (respuesta == 1) {
        toastr.success("Agregado");
        $("#txtExtension").val("");
        $("#EmpleadoSeleccionadoDirExt").html("");
        $("#EmpleadoSelectedExtension").val("");
        loadDirectorioExtensiones();
        getListadoPersonalExtensiones();
      } else {
        toastr.info(respuesta);
      }
    }
  }
}

async function SeleccionarEmpleadoExt(id, nameEmpleado) {
  $("#EmpleadoSelectedExtension").val(id);
  $("#EmpleadoSeleccionadoDirExt").html(nameEmpleado);
  $("#txtExtension").val("");
}

$(document).ready(function () {
  $("#slctDivisionEmExt").select2({
    dropdownParent: $("#modalAddEmpleadosDirectorioExtensiones"),
    width: "100%",
    placeholder: "Seleccione una división",
    allowClear: true,
  });
  $("#slctPuestoEmExt").select2({
    dropdownParent: $("#modalAddEmpleadosDirectorioExtensiones"),
    width: "100%",
    placeholder: "Seleccione un puesto",
    allowClear: true,
  });
  $("#slctSucursalEmExt").select2({
    dropdownParent: $("#modalAddEmpleadosDirectorioExtensiones"),
    width: "100%",
    placeholder: "Seleccione una sucursal",
    allowClear: true,
  });
});

function getPuestosExtensiones() {
  $.ajax({
    type: "post",
    url: "Backend/Puestos/App.php",
    data: "op=getPuestos",
    success: function (response) {
      $("#slctPuestoEmExt").html("");
      $("#slctPuestoEmExt").append(`
            <option value="">Puestos</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctPuestoEmExt").append(`
            <option value='${response[i]["IdPuesto"]}'>${response[i]["Puesto"]}</option>
            `);
      }
      $("#slctPuestoEmExt").trigger("change");
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
function getDivisionesExtensiones() {
  $("#slctDivision").html("");
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: "op=getDivisiones",
    success: function (response) {
      response = JSON.parse(response.trim());
      $("#slctDivisionEmExt").html("");
      $("#slctDivisionEmExt").append(`
            <option value="">Divisiones</option>
        `);
      for (var i = 0; i < response.length; i++) {
        $("#slctDivisionEmExt").append(`
            <option value="${response[i]["IdDivision"]}">${response[i]["Division"]}</option>
            `);
      }
      $("#slctDivisionEmExt").trigger("change");
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function getSucursalesExtensiones() {
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: "op=getSucursales",
    success: function (response) {
      $("#slctSucursalEmExt").html("");
      $("#slctSucursalEmExt").append(`
            <option value="">Sucursales</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctSucursalEmExt").append(`
          <option value="${response[i]["IdSucursal"]}">${response[i]["Sucursal"]}</option>
          `);
      }
      $("#slctSucursalEmExt").trigger("change");
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

async function loadDirectorioExtensiones() {
  const Directorio = await getDirectorioExtensiones();
  let ContenidoDirectorioHTML = "";
  Directorio.forEach((ContenidoDirectorio) => {
    let ArrayRegistrosDirectorioTipo = [];
    ContenidoDirectorio.Tipos.map((Registros) => {
      ContenidoDirectorioHTML += `
                <div class="table-responsive">
                    <table id="${Registros.idDirectorioExtensiones}" class="table striped m-b-10 display text-center">
                        <thead>
                            <tr>
                                <th colspan="12" >
                                <div class="row">
                                    <div class="col text-center">
                                       <span class="badge badge-primary">${Registros.Tipo}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col" style="text-align:left">
                                        <button type="button" class="btn btn-success"  onclick="openModalAddEmpExtensiones(${Registros.idDirectorioExtensiones},'${Registros.Tipo}')"><span class="material-symbols-outlined">add_call</span></button>
                                    </div>
                                </div>
                                </th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>EXTENSION</th>
                                <th>ELIMINAR</th>
                            </tr>
                        </thead>
                        <tbody> `;
      ContenidoDirectorio.Detalle.filter((Detalle) => {
        if (
          Detalle.idDirectorioExtensiones == Registros.idDirectorioExtensiones
        ) {
          ContenidoDirectorioHTML += `
                                    <tr>
                                       
                                        <td>${Detalle.Nombre}</td>
                                        <td>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="row">
                                                            <div class="col-8">
                                                                <input class="form-control form-control-solid-bordered" value="${Detalle.Extension}" style="text-align: center" onkeypress="return onlynumber(event)" maxlength="4" id="Extension${Detalle.idDetalleDirectorioExtensiones}"></input>
                                                            </div>
                                                            <div class="col-4">
                                                                <button class="btn btn-warning" role="button" onclick="updateExtesionEmp(${Detalle.idDetalleDirectorioExtensiones},${Registros.idDirectorioExtensiones})" ><span class="material-symbols-outlined" style="font-size:20px;">edit</span></button>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><button class="btn btn-danger" role="button" onclick="deleteEmpleadosDirectorioExtension(${Detalle.idDetalleDirectorioExtensiones})"> <span class="material-symbols-outlined" style="font-size:20px;">delete</span></button></td>
                                    </tr>
                                `;
        }
      });
      ContenidoDirectorioHTML += `    
                        </tbody>      
                     </table>
                </div>
            `;
    });
  });

  $("#contenidoDirectorioExtensiones").html(ContenidoDirectorioHTML);
}

async function deleteEmpleadosDirectorioExtension(val) {
  const result = await Swal.fire({
    title: "Confirmación",
    text: "¿Desea eliminar al empleado del directorio?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      let datos = {
        op: "deleteEmpleadosDirectorioExtension",
        idDetalleDirectorioExtensiones: val,
      };

      let respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == 1) {
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
             <span class="alert-text">Empleado eliminado correctamente.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        loadDirectorioExtensiones();
      } else {
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Alerta!</span>
             <span class="alert-text">Error al eliminar el empleado.</span>
          </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.log(error);
      const messageContent = `
        <div class="alert-content">
           <span class="alert-title">Alerta!</span>
           <span class="alert-text">Ocurrió un error inesperado.</span>
        </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else {
    const messageContent = `
      <div class="alert-content">
         <span class="alert-title">Información!</span>
         <span class="alert-text">Se canceló la acción.</span>
      </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

async function updateExtesionEmp(DetalleId, Directorio) {
  const result = await Swal.fire({
    title: "Confirmación",
    text: "¿Desea actualizar la extensión?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      let Extension = $("#Extension" + DetalleId).val();

      let datos = {
        op: "updateExtensionEmpleado",
        idDetalleDirectorioExtensiones: DetalleId,
        Extension: Extension,
        Directorio: Directorio,
      };

      let respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == 1) {
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
             <span class="alert-text">Extensión actualizada correctamente.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        loadDirectorioExtensiones();
      } else {
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Alerta!</span>
             <span class="alert-text">${respuesta}</span>
          </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.log(error);
      const messageContent = `
        <div class="alert-content">
           <span class="alert-title">Alerta!</span>
           <span class="alert-text">Ocurrió un error inesperado.</span>
        </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else {
    const messageContent = `
      <div class="alert-content">
         <span class="alert-title">Información!</span>
         <span class="alert-text">Se canceló la acción.</span>
      </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

$("#btnOpenModalSucursal").click(function () {
    // Cargar datos
    getSucursalesDisponiblesDirectorio();

    // Limpiar inputs
    $("#txtDireccionSucursal").val("");
    $("#txtTelefono").val("");
    $("#txtNumRed").val("");
    $("#txtCorreo").val("");
    $("#txtMarcacionCorta").val("");
    $("#inpFechaApertura").val("");

    // Abrir modal con Bootstrap 5
    var modal = new bootstrap.Modal(document.getElementById("modalAddSucursalesDirectorio"));
    modal.show();
});

$(document).ready(function () {
  $("#slctListadoSucursalesDisp").select2({
    dropdownParent: $("#modalAddSucursalesDirectorio"),
    width: "100%",
    placeholder: "Sucursales Disponibles",
    allowClear: true,
  });
});
async function getSucursalesDisponiblesDirectorio() {
  $("#slctListadoSucursalesDisp").html("");
  let datos = await {
    op: "getSucursalesDisponiblesDirectorio",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(respuesta);
    $("#slctListadoSucursalesDisp").append(`
            <option value="" selected disabled> Sucursales Disponibles </option>
        `);
    respuesta.forEach((contenido) => {
      $("#slctListadoSucursalesDisp").append(`
                  <option value="${contenido.IdSucursal}">${contenido.Sucursal}</option>
            `);
    });
  }
}

async function getEmpleadosSucursal(sucursal) {
  $("#slctEmpleadosDisp").html("");
  let datos = await {
    op: "getEmpleadosSucursalSelected",
    IdSucursal: sucursal,
  };
  respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    respuesta.forEach((contenido) => {
      $("#slctEmpleadosDisp").append(`
                <option value="${contenido.NoEmpleado}">${contenido.Nombre}</option>
            `);
    });
  }
}

$("#btnAgregaSucursalDirectorio").click(async function () {
  const result = await Swal.fire({
    title: "Confirmación",
    text: "¿Desea confirmar los datos ingresados?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, agregar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    let IdSucursal = $("#slctListadoSucursalesDisp").val();
    let Direccion = $("#txtDireccionSucursal").val();
    let Telefono = $("#txtTelefono").val();
    let Correo = $("#txtCorreo").val();
    let FechaApertura = $("#inpFechaApertura").val();
    let MarcacionCorta = $("#txtMarcacionCorta").val();
    let NumRed = $("#txtNumRed").val();

    if (
      IdSucursal == "" ||
      Direccion == "" ||
      Telefono == "" ||
      Correo == "" ||
      FechaApertura == "" ||
      MarcacionCorta == ""
    ) {
      const messageContent = `
        <div class="alert-content">
          <span class="alert-title">Información!</span>
          <span class="alert-text">Ingrese todos los datos, por favor.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
      return false;
    }

    let datos = {
      op: "addSucursalesDirectorio",
      IdSucursal: IdSucursal,
      Direccion: Direccion,
      Telefono: Telefono,
      Correo: Correo,
      FechaApertura: FechaApertura,
      MarcacionCorta: MarcacionCorta,
      NumRed: NumRed,
    };

    try {
      let respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == "1") {
        const messageContent = `
          <div class="alert-content">
            <span class="alert-title">Completado!</span>
            <span class="alert-text">Agregado correctamente al directorio.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);

        // Limpiar inputs
        $("#txtDireccionSucursal").val("");
        $("#txtTelefono").val("");
        $("#txtNumRed").val("");
        $("#txtCorreo").val("");
        $("#txtMarcacionCorta").val("");
        $("#inpFechaApertura").val("");

        // Recargar tabla de sucursales
        getDirectorioSucursal();

        // Cerrar modal Bootstrap 5
        var modal = bootstrap.Modal.getInstance(document.getElementById("modalAddSucursalesDirectorio"));
        modal.hide();
      } else {
        const messageContent = `
          <div class="alert-content">
            <span class="alert-title">Alerta!</span>
            <span class="alert-text">${respuesta}</span>
          </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.log(error);
      const messageContent = `
        <div class="alert-content">
          <span class="alert-title">Alerta!</span>
          <span class="alert-text">Ocurrió un error inesperado.</span>
        </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Información!</span>
        <span class="alert-text">Se canceló la acción.</span>
      </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);

    // Limpiar inputs
    $("#txtDireccionSucursal").val("");
    $("#txtTelefono").val("");
    $("#txtNumRed").val("");
    $("#txtCorreo").val("");
    $("#txtMarcacionCorta").val("");
    $("#inpFechaApertura").val("");
  }
});


getDirectorioSucursal();
async function getDirectorioSucursal() {
  let datos = await {
    op: "getDirectorioSucursal",
  };
  let tableDirectorioSucursal = await $("#tableDirectorioSucursal").dataTable({
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
      url: "Backend/Directorios/App.php",
      data: datos,
      success: function (response) {
        tableDirectorioSucursal.fnClearTable();

        let ArrEmpleados = [];
        response.forEach((registrosEmp) => {
          let Datos = {
            idDirectorioSucursales: registrosEmp.idDirectorioSucursales,
            Nombre: registrosEmp.Nombre,
            Puesto: registrosEmp.Puesto,
          };
          ArrEmpleados.push(Datos);
        });
        const Unicos = removeDuplicates(response, "idDirectorioSucursales");

        Unicos.forEach((UnicosV) => {
          let ContenidoEmpleados = "";
          let ContenidoPuestos = "";
          ContenidoEmpleados += `
                    <div class="row">
                `;
          ContenidoPuestos += `
                    <div class="row">
                `;
          ArrEmpleados.map((empleados) => {
            if (
              UnicosV.idDirectorioSucursales == empleados.idDirectorioSucursales
            ) {
              ContenidoEmpleados += `
                            <div class="col-12 col-lg-12">
                                <h6>${empleados.Nombre}</h6>
                            </div>
                        `;
              ContenidoPuestos += `
                            <div class="col-12 col-lg-12">
                                <h6>${empleados.Puesto}</h6>
                            </div>
                        `;
            }
          });
          ContenidoEmpleados += `
                    </div>
                `;
          ContenidoPuestos += `
                    </div>
                `;

          tableDirectorioSucursal.fnAddData([
            UnicosV.Sucursal,
            `<input class="form-control form-control-solid-bordered text-center d-block mx-auto" type="text" id="DirSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.Direccion}" style="width:25vh; text-align:center;"></input>`,
            `<input class="form-control form-control-solid-bordered text-center d-block mx-auto" type="text" id="TelSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.Telefono}" style="width:15vh"; text-align:center; onkeypress="return onlynumber(event)"></input>`,
            `<input class="form-control form-control-solid-bordered text-center d-block mx-auto" type="text" id="NumRedSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.NumRed}" style="width:12vh"; text-align:center; onkeypress="return onlynumber(event)"></input>`,
            ContenidoEmpleados,
            ContenidoPuestos,
            `<input class="form-control form-control-solid-bordered text-center d-block mx-auto" type="email" id="CorreoSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.Correo}" style="width:20vh; text-align:center;"></input>`,
            UnicosV.FechaApertura,
            UnicosV.años_transcurridos,
            `<input class="form-control form-control-solid-bordered text-center d-block mx-auto" type="text" id="MCorta${UnicosV.idDirectorioSucursales}" value="${UnicosV.MarcacionCorta}" onkeypress="return onlynumber(event)" maxlength="4" style="width:12vh; text-align:center;"></input>`,
            `<button class="btn btn-warning" role="button" onclick="updateRegistroDirectorioSucursal(${UnicosV.idDirectorioSucursales})" ><span class="material-symbols-outlined">edit</span></button>`,
          ]);
        });
      },
      complete: function () {
        // $.unblockUI();
      },
    },
  });
}

// async function updateRegistroDirectorioSucursal(val) {
//   alertify.confirm(
//     "Confirmación de acción.",
//     "¿Desea confirmar los datos ingresados?",
//     async function () {
//       let Direccion = await $("#DirSucur" + val).val();
//       let Telefono = await $("#TelSucur" + val).val();
//       let NumRed = await $("#NumRedSucur" + val).val();
//       let Correo = await $("#CorreoSucur" + val).val();
//       let MarcacionCorta = await $("#MCortaDir" + val).val();
//       let datos = await {
//         op: "updateRegistroDirectorioSucursal",
//         Direccion: Direccion,
//         Telefono: Telefono,
//         NumRed: NumRed,
//         Correo: Correo,
//         MarcacionCorta: MarcacionCorta,
//         idDirectorioSucursales: val,
//       };
//       try {
//         respuesta = await $.ajax({
//           type: "post",
//           url: "Backend/Directorios/App.php",
//           data: datos,
//         });
//         b;
//       } catch (error) {
//         console.log(error);
//       } finally {
//         if (respuesta == 1) {
//           toastr.success("Registro Actualizado");
//           getDirectorioSucursal();
//         } else {
//           toastr.info(respuesta);
//         }
//       }
//     },
//     async function () {
//       alertify.error("Cancelado");
//     }
//   );
// }
async function updateRegistroDirectorioSucursal(val) {
  const result = await Swal.fire({
    title: "Confirmación",
    text: "¿Desea confirmar los datos ingresados?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      // Obtener valores de los inputs
      let Direccion = $("#DirSucur" + val).val();
      let Telefono = $("#TelSucur" + val).val();
      let NumRed = $("#NumRedSucur" + val).val();
      let Correo = $("#CorreoSucur" + val).val();
      let MarcacionCorta = $("#MCortaDir" + val).val();

      let datos = {
        op: "updateRegistroDirectorioSucursal",
        Direccion: Direccion,
        Telefono: Telefono,
        NumRed: NumRed,
        Correo: Correo,
        MarcacionCorta: MarcacionCorta,
        idDirectorioSucursales: val,
      };

      let respuesta = await $.ajax({
        type: "post",
        url: "Backend/Directorios/App.php",
        data: datos,
      });

      if (respuesta == 1) {
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
             <span class="alert-text">Registro actualizado correctamente.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        getDirectorioSucursal();
      } else {
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Alerta!</span>
             <span class="alert-text">${respuesta}</span>
          </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    } catch (error) {
      console.log(error);
      const messageContent = `
        <div class="alert-content">
           <span class="alert-title">Alerta!</span>
           <span class="alert-text">Ocurrió un error inesperado.</span>
        </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else {
    const messageContent = `
      <div class="alert-content">
         <span class="alert-title">Información!</span>
         <span class="alert-text">Se canceló la acción.</span>
      </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
