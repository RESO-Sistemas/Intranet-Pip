// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

getMisSolicitudes();
getMisSolicitudesPorRevisar();
getMisSolicitudesVacacionesEstadoNomina();
getSolicitudesCanceladasJefe();

let ContenidoMisSolicitudes = $("#ContenidoMisSolicitudes").dataTable({
  scrollCollapse: true, // Colapsa el espacio vacío
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
function getMisSolicitudes() {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesVacaciones",
    success: function (response) {
      ContenidoMisSolicitudes.fnClearTable();
      response = JSON.parse(response.trim());
      let stadusSolicitud = "";
      let btnVerSolicitud = "";
      for (var i = 0; i < response.length; i++) {
        if (response[i]["Status"] == "0") {
          stadusSolicitud = "Pendiente";
          btnVerSolicitud = `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]["idSolicitudesVacaciones"]}">Ver Solicitud</a>`;
        } else if (response[i]["Status"] == "1") {
          stadusSolicitud = "Aceptada";
          btnVerSolicitud = `<a class='btn btn-success' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]["idSolicitudesVacaciones"]}">Ver Solicitud</a>`;
        } else if (response[i]["Status"] == "2") {
          stadusSolicitud = "Denegada";
          btnVerSolicitud = "<a class='btn btn-danger'>DENEGADA</a>";
        } else if (response[i]["Status"] == "3") {
          stadusSolicitud = "Solicitud Aceptada por RH";
          btnVerSolicitud = `<a class='btn btn-success' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]["idSolicitudesVacaciones"]}">Ver Solicitud</a>`;
        }
        ContenidoMisSolicitudes.fnAddData([
          response[i]["ComentariosSolicitud"],
          stadusSolicitud,
          response[i]["FechaSolicitud"],
          btnVerSolicitud,
        ]);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

let ContenidoSolicitudesPend = $("#ContenidoSolicitudesPend").dataTable({
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

function getMisSolicitudesPorRevisar() {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesPorRevisar",
    success: function (response) {
      ContenidoSolicitudesPend.fnClearTable();
      response = JSON.parse(response.trim());
      let btnVerSolicitud = "";
      for (var i = 0; i < response.length; i++) {
        btnVerSolicitud = `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]["idSolicitudesVacaciones"]}">Ver Solicitud</a>`;
        ContenidoSolicitudesPend.fnAddData([
          response[i]["Nombre"],
          response[i]["FechaSolicitud"],
          response[i]["FechaInicio"],
          response[i]["FechaFin"],
          response[i]["ComentariosSolicitud"],
          btnVerSolicitud,
          `<div class="row pb-1">
              <div class="col d-flex justify-content-center">  
                <div style="width: 100%;"> 
                   <a class="btn btn-success p-2 d-flex justify-content-center align-items-center" style="width: 100%;" onclick="updateStatusSolicitud(1,${response[i]["idSolicitudesVacaciones"]})">
                      Aceptar
                   </a>
                </div>
              </div>
          </div>
          <div class="row">
            <div class="col d-flex justify-content-center">  
              <div style="width: 100%;"> 
                <a class="btn btn-danger p-2 d-grid place-content-center" style="width:100%;" onclick="updateStatusSolicitud(2,${response[i]["idSolicitudesVacaciones"]})">
                  Denegar
                </a>
              </div>
            </div>
          </div>`,
        ]);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

async function updateStatusSolicitud(Val, Solicitud) {
  let mensaje = "";
  if (Val == "1") {
    mensaje = "aceptar";
  } else if (Val == "2") {
    mensaje = "denegar";
  }
  Swal.fire({
    title: `¿Desea ${mensaje} la solicitud?`,
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
  }).then((result) => {
    if (result.isConfirmed) {
      getDetalleSolicitud(Val, Solicitud);
    } else {
    }
  });
}
async function getDetalleSolicitud(estado, solicitud) {
  let datos = {
    op: "getDetalleSolicitud",
    idSolicitudesVacaciones: solicitud,
  };

  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.error(e);
    return;
  }

  let estadoText = estado == "1" ? "autorizar" : "cancelar";
  let mensaje2 = estado == "1" ? "aceptada" : "denegada";

  let contHTML = `
    <div style="text-align:left">
      <h5 style="text-align:center">Datos del solicitante</h5>
      <p><b>No Empleado:</b> ${respuesta[0]["NoEmpleado"]}</p>
      <p><b>Empleado Solicitante:</b> ${respuesta[0]["NombreSolicitante"]}</p>
      <p><b>Puesto:</b> ${respuesta[0]["PuestoSolicitante"]}</p>
      <p><b>Sucursal / Departamento:</b> ${respuesta[0]["Sucursal"]}</p>
      <hr>
      <h5 style="text-align:center">Datos de la Solicitud</h5>
      <p><b>Fecha de la Solicitud:</b> ${respuesta[0]["FechaRegistroSoli"]}</p>
      <p><b>Fecha Inicio:</b> ${respuesta[0]["FechaInicio"]}</p>
      <p><b>Fecha Fin:</b> ${respuesta[0]["FechaFin"]}</p>
      <p><b>Cantidad de Días de Vacaciones:</b> ${respuesta[0]["TotalDias"]}</p>
    </div>
  `;

  const result = await Swal.fire({
    title: `¿Desea ${estadoText} la solicitud con los siguientes datos?`,
    html: contHTML,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "swal-wide",
    },
  });

  if (result.isConfirmed) {
    $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: {
        op: "updateStatusSolicitud",
        Status: estado,
        idSolicitudesVacaciones: solicitud,
      },
      success: function (response) {
        if (response == "1") {
          Swal.fire("¡Éxito!", `Solicitud ${mensaje2}`, "success");
          getMisSolicitudes();
          getMisSolicitudesPorRevisar();
          getMisSolicitudesVacacionesEstadoNomina();
          getSolicitudesCanceladasJefe();
        } else {
          Swal.fire("Atención", response, "info");
        }
      },
      error: function (e) {
        Swal.fire("Error", e.responseText, "error");
      },
    });
  } else {
    Swal.fire({
      title: "Cancelado",
      text: "No se realizó ninguna acción",
      icon: "info",
      confirmButtonColor: "#ffc407",
      confirmButtonText: "Ok",
    });
  }
}

// async function getDetalleSolicitud(estado, solicitud) {
//   let datos = await {
//     op: "getDetalleSolicitud",
//     idSolicitudesVacaciones: solicitud,
//   };
//   respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     console.log(respuesta);
//     let estadoText = "";
//     let mensaje2 = "";
//     if (estado == "1") {
//       estadoText = "autorizar";
//       mensaje2 = "aceptada";
//     } else {
//       estadoText = "cancelar";
//       mensaje2 = "denegada";
//     }
//     let contHTML = `
//         <div class="row">
//           <div class="col s12 l12">
//             <div class="row">
//               <div class="col s12 l12" style="text-align:center">
//                 <h5>Datos del solicitante.</h5>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>No Empleado:</b> ${respuesta[0]["NoEmpleado"]}</span>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Empleado Solicitante:</b> ${respuesta[0]["NombreSolicitante"]}</span>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Puesto:</b> ${respuesta[0]["PuestoSolicitante"]}</span>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Sucursal / Departamento:</b> ${respuesta[0]["Sucursal"]}</span>
//               </div>
//             </div>
//           </div>
//           <div class="col s12 l12" style="margin-top:3vh">
//             <div class="row">
//               <div class="col s12 l12" style="text-align:center">
//                 <h5>Datos de la Solicitud.</h5>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Fecha de la Solicitud: </b> ${respuesta[0]["FechaRegistroSoli"]}</span>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Fecha Inicio: </b> ${respuesta[0]["FechaInicio"]}</span>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Fecha Fin: </b> ${respuesta[0]["FechaFin"]}</span>
//               </div>
//               <div class="col s12 l12" style="text-align:center">
//                 <span><b>Cantidad de Días de Vacaciones:  </b> ${respuesta[0]["TotalDias"]}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
//     alertify
//       .confirm(
//         `¿Desea ${estadoText} la solicitud con los siguientes datos?`,
//         `${contHTML}`,
//         async function () {
//           $.ajax({
//             type: "post",
//             url: "Backend/Empleados/App.php",
//             data:
//               "op=updateStatusSolicitud" +
//               "&Status=" +
//               estado +
//               "&idSolicitudesVacaciones=" +
//               solicitud,
//             success: function (response) {
//               if (response == "1") {
//                 toastr.success("Solicitud" + " " + `${mensaje2}`);
//                 getMisSolicitudes();
//                 getMisSolicitudesPorRevisar();
//                 getMisSolicitudesVacacionesEstadoNomina();
//                 getSolicitudesCanceladasJefe();
//               } else {
//                 toastr.info(response);
//               }
//             },
//             error: function (e) {
//               alert(e.responseText);
//             },
//           });
//         },
//         async function () {
//           alertify.error("Cancelado");
//         }
//       )
//       .set({ labels: { ok: "Aceptar", cancel: "Cancelar" }, padding: false });
//   }
// }

// function btnVerSolicitud(val){
//   window.location.href=`FormatoVacaciones.php?Solicitud=${val}`;
// }

let ContenidoSolicitudesNomina = $("#ContenidoSolicitudesNomina").dataTable({
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

async function getMisSolicitudesVacacionesEstadoNomina() {
  let datos = await {
    op: "getMisSolicitudesVacacionesEstadoNomina",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(respuesta);
    let btnVerSolicitud = "";
    let btnRegresarStatus = "";
    ContenidoSolicitudesNomina.fnClearTable();
    let textEstatus = "";
    for (var i = 0; i < respuesta.length; i++) {
      if (respuesta[i]["Status"] == "3") {
        textEstatus = "Solicitud aceptada por Nómina.";
        btnVerSolicitud = `<a class='btn btn-success' target="_blank" href="FormatoVacaciones.php?Solicitud=${respuesta[i]["idSolicitudesVacaciones"]}")>Ver Solicitud</a>`;
        btnRegresarStatus = `<button class='btn btn-danger'><span class="material-icons">lock_outline</span></button>`;
      } else if (respuesta[i]["Status"] == "2") {
        textEstatus = "Solicitud denegada por Nómina.";
        btnVerSolicitud = `<a class='btn btn-danger'>Ver Solicitud</a>`;
        btnRegresarStatus = `<button class='btn btn-danger'><span class="material-icons">lock_outline</span></button>`;
      } else if (respuesta[i]["Status"] == "1") {
        textEstatus = "Solicitud pendiente de revisar.";
        btnVerSolicitud = `<a class='btn btn-warning' target="_blank" href="FormatoVacaciones.php?Solicitud=${respuesta[i]["idSolicitudesVacaciones"]}">Ver Solicitud</a>`;
        btnRegresarStatus = `<button class='btn btn-warning' onclick='regresarEstadoSolicitudJefe(${respuesta[i]["idSolicitudesVacaciones"]})'><span class="material-icons">lock_outline</span></button>`;
      }
      ContenidoSolicitudesNomina.fnAddData([
        respuesta[i]["Nombre"],
        respuesta[i]["ComentariosSolicitud"],
        respuesta[i]["FechaSolicitud"],
        textEstatus,
        btnRegresarStatus,
        btnVerSolicitud,
      ]);
    }
  }
}

// async function regresarEstadoSolicitudJefe(val) {
//   alertify
//     .confirm(
//       "Confirmación de acción.",
//       `<div class="row">
//     <div class="col s12 l12" style="text-align:center">
//       ¿Desea regresar el estado de la solicitud a" Solicitud pendiente de revisar"?
//     </div>
//   </div>`,
//       async function () {
//         let datos = await {
//           op: "regresarEstadoSolicitudJefe",
//           idSolicitudesVacaciones: val,
//         };
//         let respuesta = "";
//         try {
//           respuesta = await $.ajax({
//             type: "post",
//             url: "Backend/Empleados/App.php",
//             data: datos,
//           });
//         } catch (e) {
//           console.log(e);
//         } finally {
//           if (respuesta == "1") {
//             alertify.success(
//               'Estado de solicitud regresado a" Solicitud pendiente de revisar".'
//             );
//             await getMisSolicitudesPorRevisar();
//             await getMisSolicitudesVacacionesEstadoNomina();
//             await getSolicitudesCanceladasJefe();
//           } else {
//             alertify.warning("ERROR!");
//           }
//         }
//       },
//       async function () {
//         alertify.error("Cancelado");
//       }
//     )
//     .set({ labels: { ok: "Aceptar", cancel: "Cancelar" }, padding: false });
// }
async function regresarEstadoSolicitudJefe(val) {
  const resultado = await Swal.fire({
    title: "Confirmación de acción",
    html: `
      <div class="row">
        <div class="col s12 l12" style="text-align:center">
          ¿Desea regresar el estado de la solicitud a "Solicitud pendiente de revisar"?
        </div>
      </div>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  });

  if (resultado.isConfirmed) {
    let datos = {
      op: "regresarEstadoSolicitudJefe",
      idSolicitudesVacaciones: val,
    };

    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
      });
    } catch (e) {
      console.error(e);
    }

    if (respuesta == "1") {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: 'Estado de solicitud regresado a "Solicitud pendiente de revisar".',
        showConfirmButton: true,
        confirmButtonColor: "#ffc407",
      });
      await getMisSolicitudesPorRevisar();
      await getMisSolicitudesVacacionesEstadoNomina();
      await getSolicitudesCanceladasJefe();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        timer: 2500,
        text: "No se pudo cambiar el estado.",
      });
    }
  } else {
    Swal.fire({
      icon: "info",
      title: "Cancelado",
      text: "No se realizó ninguna acción.",
      showConfirmButton: true,
      confirmButtonColor: "#ffc407",
      confirmButtonText: "Aceptar",
    });
  }
}

let tableSolicitudesCanceladas = $("#tableSolicitudesCanceladas").dataTable({
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

async function getSolicitudesCanceladasJefe() {
  let datos = await {
    op: "getSolicitudesCanceladasJefe",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(respuesta);
    tableSolicitudesCanceladas.fnClearTable();
    respuesta.forEach((registros) => {
      tableSolicitudesCanceladas.fnAddData([
        registros.Nombre,
        registros.ComentariosSolicitud,
        registros.FechaSolicitud,
        `<button class='btn btn-warning' onclick='regresarEstadoSolicitudJefe(${registros.idSolicitudesVacaciones})'><span class="material-symbols-outlined">edit</span></button>`,
        `<button class='btn btn-warning' href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}">Ver Solicitud</button>`,
      ]);
    });
  }
}
