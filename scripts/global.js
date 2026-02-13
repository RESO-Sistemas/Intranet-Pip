const url_m_puestos = "Backend/Puestos/App.php";
const url_m_Organigrama = "Backend/Organigramas/App.php";
const url_m_Empleados = "Backend/Empleados/App.php";
const url_m_LineaE = "Backend/LineaEtica/App.php";
const url_m_Evaluaciones = "Backend/Evaluaciones/App.php";
const url_m_Divisiones = "Backend/Divisiones/App.php";
const url_m_Sucursal = "Backend/Sucursal/App.php";
const url_m_Configuracion = "Backend/Configuracion/App.php";
const url_m_Dashboard = "Backend/Dashboard/App.php";
const url_m_Feed = "Backend/Feed/App.php";

let prof_Name, prof_Email, prof_Img, prof_imgSmall;

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // No ejecutar funciones globales en la página de login
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'login.php') {
    return;
  }
  
  prof_Name = document.getElementById("PerfilNombreEmp");
  prof_Email = document.getElementById("PerfilCorreoEmp");
  prof_Img = document.getElementById("profileImg");
  prof_imgSmall = document.getElementById("imgSmallProfile");
  
  loadAllFunctions();
});

async function loadAllFunctions() {
  await loadGblDataEmployee();
  getMensajeVistoLineaEtica();
  getMsgSolicitudesVacacionesRecibidas();
  getMsgSolicitudesVacacionesRecibidasFinal();
  getMensajeCapacitacionGlobal();
  getCantidadNotificaciones();
  getMsgLineaEtica();
}

class Empleado {
  constructor(name, email, image) {
    this._name = name;
    this._email = email;
    this._image = image;
  }
  printEmpleado() {
    prof_Name.textContent = this._name;
    prof_Email.textContent = this._email;
    prof_Img.src = this._image;
    prof_imgSmall.src = this._image;
  }
}

async function loadGblDataEmployee() {
  let dataSend = {
    op: "loadGblDataEmployee",
  };
  const ajaxResponse = await pAjaxAsync(url_m_Empleados, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Datos;
    const employee = new Empleado(
      dataR[0].NameEmployee,
      dataR[0].EmailEmployee,
      dataR[0].ImgEmployee
    );
    employee.printEmpleado();
  }
}

// function getMensajeVistoLineaEtica() {
//   $("#contenidoMensajes").html("");
//   $("#notificacionesMenuLEtica").html("");

//   let datos = {
//     op: "getMensajeVistoLineaEtica",
//   };
//   $.ajax({
//     type: "post",
//     url: "Backend/LineaEtica/App.php",
//     data: datos,
//     success: function (response) {
//       response = JSON.parse(response.trim());
//       for (var i = 0; i < response.length; i++) {
//         alertify.set("notifier", "position", "top-right").set("delay", 10);
//         alertify.success(`
//                         <div class="row" style="padding:1vh">
//                             <div class="col s12">
//                             <span style="opacity:1;">Tu mensaje de Linea de etica "${response[i]["Mensaje"]}" <b>fue revisado</b>.</span>
//                             </div>
//                         </div>
//           `);
//         $("#notificacionesMenuLEtica").append(`
//             <a href="#" onclick="cerrarMensajeLineaEtica(${response[i]["idLineaEticaMensajes"]})">
//                 <span class="btn-floating btn-large red"><i class="material-icons">link</i></span>
//                 <span class="mail-contnet">
//                     <h5>Línea de Ética.</h5>
//                 <span style="opacity:1;">Tu mensaje de Linea de etica "${response[i]["Mensaje"]}" <b>fue revisado</b>.</span>
//             </a>
//           `);
//       }
//     },
//     error: function (e) {},
//   });
// }

function getMensajeVistoLineaEtica() {
  $("#contenidoMensajes").html("");
  $("#notificacionesMenuLEtica").html("");

  let datos = {
    op: "getMensajeVistoLineaEtica",
  };
  $.ajax({
    type: "post",
    url: "Backend/LineaEtica/App.php",
    data: datos,
    success: function (response) {
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Linea de ética!</span>
              <span class="alert-text">Tu mensaje de Linea de etica "${response[i]["Mensaje"]}" <b>fue revisado</b>.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
        $("#notificacionesMenuLEtica").append(`
            <a href="#">
              <div class="notifications-dropdown-item" onclick="cerrarMensajeLineaEtica(${response[i]["idLineaEticaMensajes"]})">
                <div class="notifications-dropdown-item-image">
                    <span class="notifications-badge bg-info text-white">
                        <i class="material-icons-outlined">campaign</i>
                    </span>
                </div>
                <div class="notifications-dropdown-item-text">
                  <p class="bold-notifications-text">Tu mensaje de Linea de etica "${response[i]["Mensaje"]}" <b>fue revisado</b>.</p>
                </div>
              </div>
            </a>
          `);
      }
    },
    error: function (e) {},
  });
}

function cerrarMensajeLineaEtica(val) {
  datos = {
    op: "VistoMensajeLineaEtica",
    idLineaEticaMensajes: val,
  };
  $.ajax({
    type: "post",
    url: "Backend/LineaEtica/App.php",
    data: datos,
    success: function (response) {
      if (response == "1") {
        $("#LineaEticaMsg" + val).remove();
        getMensajeVistoLineaEtica();
        getMsgSolicitudesVacacionesRecibidas();
        getMsgSolicitudesVacacionesRecibidasFinal();
        getMensajeCapacitacionGlobal();
        getCantidadNotificaciones();
      } else {
        // toastr.info("Intente de nuevo");
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Intente de nuevo.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
      }
    },
    error: function (e) {},
  });
}

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

/*  setInterval(function () {
        getMensajeVistoLineaEtica();
        getMsgSolicitudesVacacionesRecibidas();
        getMsgSolicitudesVacacionesRecibidasFinal();
      }, 60000); */

setInterval(() => {
  if (!navigator.onLine) {
    console.log("offline");
  } else if (navigator.onLine) {
    getMensajeVistoLineaEtica();
    getMsgSolicitudesVacacionesRecibidas();
    getMsgSolicitudesVacacionesRecibidasFinal();
    getMensajeCapacitacionGlobal();
    getCantidadNotificaciones();
    getMsgLineaEtica();
  }
}, 480000);

async function getCantidadNotificaciones() {
  let datos = await {
    op: "getCantidadNotificaciones",
  };

  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#cantidadNotificaciones").html(respuesta[0]);
  }
}

// async function getMsgLineaEtica(){
//   $("#notificacionesPendienteLEtica").empty();
//   let datos = {
//     op: "getNotifiLineaEticaPendientes"
//   };
//   const ajaxResponse = await pAjaxAsync(url_m_LineaE, datos, 0);
//   if (ajaxResponse !== undefined) {
//     alertify.set("notifier", "position", "top-right").set('delay', 10);
//     alertify.success(`
//                     <div class="row" style="padding:1vh">
//                         <div class="col s12">
//                         <span style="opacity:1;">Tienes mensajes de línea de ética pendientes por revisar.</span>
//                         </div>
//                     </div>
//       `);
//     $("#notificacionesPendienteLEtica").append(`
//         <a href="https://klyns.resosistemas.mx/LineaEtica.php">
//             <span class="btn-floating btn-large red"><i class="material-icons">link</i></span>
//             <span class="mail-contnet">
//                 <h5>Línea de Ética.</h5>
//             <span style="opacity:1;">Tienes mensajes de línea de ética pendientes por revisar.</span>
//         </a>
//       `);
//   }
// }

async function getMsgLineaEtica() {
  $("#notificacionesPendienteLEtica").empty();
  let datos = {
    op: "getNotifiLineaEticaPendientes",
  };
  const ajaxResponse = await pAjaxAsync(url_m_LineaE, datos, 0);
  if (ajaxResponse !== undefined) {
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Linea de ética!</span>
              <span class="alert-text">Tienes mensajes de línea de ética pendientes por revisar.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
    $("#notificacionesPendienteLEtica").append(`
        <a href="#" style="cursor:pointer;">
          <div class="notifications-dropdown-item">
              <div class="notifications-dropdown-item-image">
                  <span class="notifications-badge bg-info text-white">
                      <i class="material-icons-outlined">campaign</i>
                  </span>
              </div>
              <div class="notifications-dropdown-item-text">
                <p class="bold-notifications-text">Línea de Ética: Tienes mensajes de línea de ética pendientes por revisar.</p>
              </div>
            </div>
        </a>

      `);
  }
}

// async function getMsgSolicitudesVacacionesRecibidas() {
//   let datos = await {
//     op: "getMsgSolicitudesVacacionesRecibidasJefe",
//   };
//   let respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     $("#contenidoMensajesSolicitudesVJefe").html("");
//     $("#notificacionesMenuSVacaciones").html("");
//     if (respuesta.length > 0) {
//       respuesta.forEach((msg) => {
//         alertify.set("notifier", "position", "top-right").set("delay", 10);
//         alertify.success(`
//                     <div class="col s12">
//                         <div class="col s12 l12">
//                         <span style="opacity:1;color:white"><b>${msg.Msg}</b></span>
//                         </div>
//                     </div>
//           `);
//         $("#notificacionesMenuSVacaciones").append(`
//                  <a  id="msjSolicitudesVacacionesJefe${msg.idSolicitudesVacaciones}" onclick="cerrarMensajeSolicitudesJefe(${msg.idSolicitudesVacaciones})" href="SolicitudVacaciones.php">
//                     <span class="btn-floating btn-large red"><i class="material-icons">link</i></span>
//                     <span class="mail-contnet">
//                     <h5>${msg.Msg}</h5>
//                 </a>
//                 `);
//       });
//     }
//   }
// }

async function getMsgSolicitudesVacacionesRecibidas() {
  let datos = await {
    op: "getMsgSolicitudesVacacionesRecibidasJefe",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#contenidoMensajesSolicitudesVJefe").html("");
    $("#notificacionesMenuSVacaciones").html("");
    if (respuesta.length > 0) {
      respuesta.forEach((msg) => {
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Solicitud de vacaciones!</span>
              <span class="alert-text">${msg.Msg}</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);

        $("#notificacionesMenuSVacaciones").append(`
              <a id="msjSolicitudesVacacionesJefe${msg.idSolicitudesVacaciones}" style="cursor:pointer;" >
                <div class="notifications-dropdown-item" onclick="cerrarMensajeSolicitudesJefe(${msg.idSolicitudesVacaciones})" href="SolicitudVacaciones.php">
                  <div class="notifications-dropdown-item-image">
                    <span class="notifications-badge bg-info text-white">
                        <i class="material-icons-outlined">campaign</i>
                    </span>
                </div>
                <div class="notifications-dropdown-item-text">
                  <p class="bold-notifications-text">${msg.Msg}</p>
                </div>
              </div>
              </a>
          `);
      });
    }
  }
}

async function cerrarMensajeSolicitudesJefe(val) {
  let datos = await {
    op: "updateMsgSolicitudesVacacionesRecibidasJefe",
    idSolicitudesVacaciones: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      $("#" + val).fadeOut();
      $("#msjSolicitudesVacacionesJefe" + val).remove();
      getMensajeVistoLineaEtica();
      getMsgSolicitudesVacacionesRecibidas();
      getMsgSolicitudesVacacionesRecibidasFinal();
      getMensajeCapacitacionGlobal();
      getCantidadNotificaciones();
    } else {
      console.log("ERROR al cerrar el mensaje");
    }
  }
}
// async function getMsgSolicitudesVacacionesRecibidasFinal() {
//   let datos = await {
//     op: "getMsgSolicitudesVacacionesRecibidasFinal",
//   };
//   let respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     $("#notificacionesMenuSVacacionesNomina").html("");
//     if (respuesta[0]["Retorno"] == "Valido") {
//       respuesta.map((retorno) => {
//         retorno.Registros.map((registros) => {
//           alertify.set("notifier", "position", "top-right").set("delay", 10);
//           alertify.success(`
//                                 <div class="col s12">
//                                     <div class="row">
//                                         <div class="col s12 l12">
//                                                 <span style="opacity:1;color:white"><b>${registros.Msg}</b></span>
//                                         </div>
//                                     </div>
//                                 </div>
//                       `);
//           $("#notificacionesMenuSVacacionesNomina").append(`
//                     <a href="#" id="msjSolicitudesVacacionesNomina${registros.idSolicitudesVacaciones}" onclick="cerrarMensajeSolicitudesNomina(${registros.idSolicitudesVacaciones})">
//                         <span class="btn-floating btn-large red"><i class="material-icons">link</i></span>
//                         <span class="mail-contnet">
//                         <h5>${registros.Msg}</h5>
//                     </a>
//                     `);
//         });
//       });
//     }
//   }
// }

async function getMsgSolicitudesVacacionesRecibidasFinal() {
  let datos = await {
    op: "getMsgSolicitudesVacacionesRecibidasFinal",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#notificacionesMenuSVacacionesNomina").html("");
    if (respuesta[0]["Retorno"] == "Valido") {
      respuesta.map((retorno) => {
        retorno.Registros.map((registros) => {
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Vacaciones Nomina!</span>
              <span class="alert-text">$${registros.Msg}</span>
          </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
          $("#notificacionesMenuSVacacionesNomina").append(`
                <a id="msjSolicitudesVacacionesNomina${registros.idSolicitudesVacaciones}" style="cursor:pointer;" >
                  <div class="notifications-dropdown-item" onclick="cerrarMensajeSolicitudesNomina(${registros.idSolicitudesVacaciones})">
                    <div class="notifications-dropdown-item-image">
                      <span class="notifications-badge bg-info text-white">
                        <i class="material-icons-outlined">campaign</i>
                      </span>
                  </div>
                  <div class="notifications-dropdown-item-text">
                    <p class="bold-notifications-text">${registros.Msg}</p>
                  </div>
                  </div>
                </a>
          `);
        });
      });
    }
  }
}

// async function getMensajeCapacitacionGlobal() {
//   let datos = await {
//     op: "getMensajeCapacitacionGlobal",
//   };
//   let respuesta = [];
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
//     $("#notificacionesCapacitacion").html("");
//     if (respuesta.length > 0) {
//       respuesta.forEach((registros) => {
//         alertify.set("notifier", "position", "top-right").set("delay", 10);
//         alertify.success(`
//                     <div class="col s12">
//                         <div class="row">
//                             <div class="col s12 l12">
//                                     <p><span style="opacity:1;color:white"><b>${registros.Descripcion}</b></span></p>
//                                     <p><span style="opacity:1;color:white"><b>${registros.FechaInicio}</b></span></p>
//                             </div>
//                         </div>
//                     </div>
//           `);
//         $("#notificacionesCapacitacion").append(`
//                     <a href="#" id="msjCapacitacion${registros.idCapacitacion}" onclick="cerrarMensajeCapacitacion(${registros.idCapacitacion})">
//                         <span class="btn-floating btn-large red"><i class="material-icons">link</i></span>
//                         <span class="mail-contnet">
//                         <h6 style="font-size:1em">${registros.Descripcion}</h6>
//                     </a>
//                     `);
//       });
//     }
//   }
// }

// FUNCION PARA ALERTAS DE BOOSTRAP

//info
function showBootstrapAlert(message, position = "top-right", delay = 5000) {
  const positionMap = {
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
  };

  const pos = positionMap[position] || positionMap["top-right"];
  const containerId = `alert-container-${position}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    Object.assign(container.style, pos);
    document.body.appendChild(container);
  }

  // Crear alerta personalizada
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-custom alert-indicator-left indicator-info d-flex justify-content-between align-items-start`;
  alertDiv.setAttribute("role", "alert");

  // Estilo compacto
  alertDiv.style.padding = "8px 12px";
  alertDiv.style.fontSize = "14px";
  alertDiv.style.maxWidth = "500px";
  alertDiv.style.cursor = "default";
  alertDiv.style.borderRadius = "6px";
  alertDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  alertDiv.style.transition = "all 0.3s ease";
  alertDiv.style.opacity = "0";
  alertDiv.style.transform = "translateY(-20px)";

  // Contenido de la alerta + botón cerrar
  alertDiv.innerHTML = `
    <div style="flex: 1;">${message}</div>
    <button type="button" class="btn-close ms-2" aria-label="Close"></button>
  `;

  // Cerrar manualmente
  alertDiv.querySelector(".btn-close").addEventListener("click", () => {
    alertDiv.style.opacity = "0";
    alertDiv.style.transform = "translateY(-20px)";
    setTimeout(() => {
      alertDiv.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 300);
  });

  // Insertar y animar
  container.appendChild(alertDiv);
  void alertDiv.offsetWidth;
  alertDiv.style.opacity = "1";
  alertDiv.style.transform = "translateY(0)";

  // Cierre automático
  setTimeout(() => {
    if (alertDiv.isConnected) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translateY(-20px)";
      setTimeout(() => {
        alertDiv.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }
  }, delay);

  return alertDiv;
}

//warning
function showBootstrapAlertWar(message, position = "top-right", delay = 5000) {
  const positionMap = {
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
  };

  const pos = positionMap[position] || positionMap["top-right"];
  const containerId = `alert-container-${position}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    Object.assign(container.style, pos);
    document.body.appendChild(container);
  }

  // Crear alerta personalizada
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-custom alert-indicator-right indicator-warning d-flex justify-content-between align-items-start`;
  alertDiv.setAttribute("role", "alert");

  // Estilo compacto
  alertDiv.style.padding = "8px 12px";
  alertDiv.style.fontSize = "14px";
  alertDiv.style.maxWidth = "500px";
  alertDiv.style.cursor = "default";
  alertDiv.style.borderRadius = "6px";
  alertDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  alertDiv.style.transition = "all 0.3s ease";
  alertDiv.style.opacity = "0";
  alertDiv.style.transform = "translateY(-20px)";

  // Contenido de la alerta + botón cerrar
  alertDiv.innerHTML = `
    <div style="flex: 1;">${message}</div>
    <button type="button" class="btn-close ms-2" aria-label="Close"></button>
  `;

  // Cerrar manualmente
  alertDiv.querySelector(".btn-close").addEventListener("click", () => {
    alertDiv.style.opacity = "0";
    alertDiv.style.transform = "translateY(-20px)";
    setTimeout(() => {
      alertDiv.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 300);
  });

  // Insertar y animar
  container.appendChild(alertDiv);
  void alertDiv.offsetWidth;
  alertDiv.style.opacity = "1";
  alertDiv.style.transform = "translateY(0)";

  // Cierre automático
  setTimeout(() => {
    if (alertDiv.isConnected) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translateY(-20px)";
      setTimeout(() => {
        alertDiv.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }
  }, delay);

  return alertDiv;
}

//success
function showBootstrapAlertSuc(message, position = "top-right", delay = 5000) {
  const positionMap = {
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
  };

  const pos = positionMap[position] || positionMap["top-right"];
  const containerId = `alert-container-${position}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    Object.assign(container.style, pos);
    document.body.appendChild(container);
  }

  // Crear alerta personalizada
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-custom alert-indicator-top indicator-success d-flex justify-content-between align-items-start`;
  alertDiv.setAttribute("role", "alert");

  // Estilo compacto
  alertDiv.style.padding = "8px 12px";
  alertDiv.style.fontSize = "14px";
  alertDiv.style.maxWidth = "500px";
  alertDiv.style.cursor = "default";
  alertDiv.style.borderRadius = "6px";
  alertDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  alertDiv.style.transition = "all 0.3s ease";
  alertDiv.style.opacity = "0";
  alertDiv.style.transform = "translateY(-20px)";

  // Contenido de la alerta + botón cerrar
  alertDiv.innerHTML = `
    <div style="flex: 1;">${message}</div>
    <button type="button" class="btn-close ms-2" aria-label="Close"></button>
  `;

  // Cerrar manualmente
  alertDiv.querySelector(".btn-close").addEventListener("click", () => {
    alertDiv.style.opacity = "0";
    alertDiv.style.transform = "translateY(-20px)";
    setTimeout(() => {
      alertDiv.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 300);
  });

  // Insertar y animar
  container.appendChild(alertDiv);
  void alertDiv.offsetWidth;
  alertDiv.style.opacity = "1";
  alertDiv.style.transform = "translateY(0)";

  // Cierre automático
  setTimeout(() => {
    if (alertDiv.isConnected) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translateY(-20px)";
      setTimeout(() => {
        alertDiv.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }
  }, delay);

  return alertDiv;
}

// FUNCION PARA ALERTAS DE BOOSTRAP

async function getMensajeCapacitacionGlobal() {
  let datos = await {
    op: "getMensajeCapacitacionGlobal",
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
    $("#notificacionesCapacitacion").html("");
    if (respuesta.length > 0) {
      respuesta.forEach((registros) => {
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Capacitacion!</span>
              <span class="alert-text">${registros.Descripcion}<br>${registros.FechaInicio}</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);

        $("#notificacionesCapacitacion").append(`
                <a id="msjCapacitacion${registros.idCapacitacion}" style="cursor:pointer;" >
                  <div class="notifications-dropdown-item" onclick="cerrarMensajeCapacitacion(${registros.idCapacitacion})">
                    <div class="notifications-dropdown-item-image">
                      <span class="notifications-badge bg-success text-white">
                        <i class="material-icons-outlined">alternate_email</i>
                      </span>
                  </div>
                  <div class="notifications-dropdown-item-text">
                    <p class="bold-notifications-text">${registros.Descripcion}</p>
                  </div>
                  </div>
              </a>
         `);
      });
    }
  }
}

async function cerrarMensajeSolicitudesNomina(val) {
  let datos = await {
    op: "updateMsgSolicitudesVacacionesRecibidasNomina",
    idSolicitudesVacaciones: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      $("#" + val).fadeOut();
      $("#msjSolicitudesVacacionesNomina" + val).remove();
      window.location.href = `SolicitudesVacacionesFinales.php`;
    } else {
      console.log("ERROR al cerrar el mensaje");
    }
  }
}

async function cerrarMensajeCapacitacion(val) {
  let datos = {
    op: "cerrarMensajeCapacitacion",
    idCapacitacion: val,
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == 1) {
      $("#msjCapacitacion" + val).remove();
      getMensajeVistoLineaEtica();
      getMsgSolicitudesVacacionesRecibidas();
      getMsgSolicitudesVacacionesRecibidasFinal();
      getMensajeCapacitacionGlobal();
      getCantidadNotificaciones();
    }
  }
}

async function pAjaxAsync(url, datos, pcarga) {
  let respuesta = "";
  if (pcarga == 1) {
    Cargando();
  }
  try {
    respuesta = await $.ajax({
      type: "post",
      url: url,
      data: datos,
      dataType: "json",
    });
    console.log('pAjaxAsync - Respuesta del servidor:', respuesta);
  } catch (e) {
    console.error('pAjaxAsync - Error en la petición:', e);
    console.error('pAjaxAsync - Response Text:', e.responseText);
  } finally {
    if (pcarga == 1) {
      QuitarCargando();
    }
    if (respuesta.Resultado) {
      if (respuesta.Siguiente) {
        if (respuesta.ConMsg) {
          // toastr.success(respuesta.Msg);
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">${respuesta.Msg}.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
        }
        return respuesta;
      } else {
        if (respuesta.ConMsg) {
          // toastr.warning(respuesta.Msg);
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">${respuesta.Msg}</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      }
    } else if (!respuesta.Resultado) {
      // toastr.warning(
      //   "¡Ha ocurrido un error inesperado, inténtelo de nuevo por favor!"
      // );
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">¡Ha ocurrido un error inesperado, inténtelo de nuevo por favor!</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  }
}

// function Cargando() {
//   $.blockUI({
//     message: `
//     <img src="assets/logoK.png" alt="" srcset="" width="150px">
//     <h4> REALIZANDO PETICIÓN, POR FAVOR ESPERE...</h4><br><div class="preloader-wrapper big active">
//     <div class="spinner-layer spinner-blue-only">
//         <div class="circle-clipper left">
//             <div class="circle"></div>
//             </div><div class="gap-patch">
//             <div class="circle"></div>
//             </div><div class="circle-clipper right">
//             <div class="circle"></div>
//         </div>
//     </div>
//     </div>`,
//     css: {
//       backgroundColor: null,
//       color: "#fff",
//       border: null,
//     },
//   });
// }
function Cargando() {
  $.blockUI({
    message: `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; width:100%; height:100%; color:white;">
        <img src="assets/logoK.png" alt="Logo" width="120"  margin-bottom:1rem;">
      </div>
    `,
    css: {
      border: "none",
      backgroundColor: "transparent", // quitamos fondo del bloque
      color: "#fff",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      padding: "0",
      margin: "0"
    },
    overlayCSS: {
      backgroundColor: "rgba(0,0,0,0.6)",
      opacity: 1,
      cursor: "wait"
    }
  });
}


function QuitarCargando() {
  $.unblockUI();
}

async function dialogConfirmSAlert(title, text = "", icon = "warning") {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: `${title}`,
      text: `${text}`,
      icon: `${icon}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function dialogConfirmAlertify(title, text = "") {
  return new Promise((resolve, reject) => {
    alertify
      .confirm(
        `${title}`,
        `${text}`,
        async function () {
          resolve(true);
        },
        async function () {
          resolve(false);
        }
      )
      .set("labels", { ok: "Confirmar", cancel: "Cancelar" });
  });
}

async function openMMinNoMaximizable(header, div, resizable = true) {
  if (!alertify[div]) {
    alertify[div] ||
      alertify.dialog(`${div}`, function () {
        return {
          main: function (content) {
            this.setContent(content);
          },
          build: function () {
            this.setHeader(header);
          },
          setup: function () {
            return {
              focus: {
                element: function () {
                  return this.elements.body.querySelector(this.get("selector"));
                },
                select: true,
              },
              options: {
                resizable: resizable,
                maximizable: false,
                padding: true,
                startMaximized: false,
              },
            };
          },
          settings: {
            selector: undefined,
          },
        };
      });
  }
  alertify[div]($(`#${div}`)[0]);
}

async function openMMinMaximizable(header, div, resizable = true) {
  if (!alertify[div]) {
    alertify[div] ||
      alertify.dialog(`${div}`, function () {
        return {
          main: function (content) {
            this.setContent(content);
          },
          build: function () {
            this.setHeader(header);
          },
          setup: function () {
            return {
              focus: {
                element: function () {
                  return this.elements.body.querySelector(this.get("selector"));
                },
                select: true,
              },
              options: {
                // basic:true,
                resizable: resizable,
                maximizable: true,
                padding: true,
                startMaximized: false,
              },
            };
          },
          settings: {
            selector: undefined,
          },
        };
      });
  }
  alertify[div]($(`#${div}`)[0]);
}

async function openMMaxNoMinimizable(header, div) {
  if (!alertify[div]) {
    alertify[div] ||
      alertify.dialog(`${div}`, function () {
        return {
          main: function (content) {
            this.setContent(content);
          },
          build: function () {
            this.setHeader(header);
          },
          setup: function () {
            return {
              focus: {
                element: function () {
                  return this.elements.body.querySelector(this.get("selector"));
                },
                select: true,
              },
              options: {
                // basic:true,
                maximizable: false,
                padding: true,
                startMaximized: true,
              },
            };
          },
          settings: {
            selector: undefined,
          },
        };
      });
  }
  alertify[div]($(`#${div}`)[0]);
}

async function openMMaxMinimizable(header, div) {
  if (!alertify[div]) {
    alertify[div] ||
      alertify.dialog(`${div}`, function () {
        return {
          main: function (content) {
            this.setContent(content);
          },
          build: function () {
            this.setHeader(header);
          },
          setup: function () {
            return {
              focus: {
                element: function () {
                  return this.elements.body.querySelector(this.get("selector"));
                },
                select: true,
              },
              options: {
                // basic:true,
                maximizable: true,
                padding: true,
                startMaximized: true,
              },
            };
          },
          settings: {
            selector: undefined,
          },
        };
      });
  }
  alertify[div]($(`#${div}`)[0]);
}

async function validateDiv(contenedor) {
  return new Promise((resolve, reject) => {
    const all = document.getElementById(`${contenedor}`);
    const cInp = all.querySelectorAll("input");
    const allSelct = all.querySelectorAll("select");
    const allTxArea = all.querySelectorAll("textarea");
    let inpVacios = [];
    let contador = 0;
    cInp.forEach((i) => {
      let lInp = document.querySelector(`label[for="${i.id}"]`);
      if (i.required) {
        if (i.value === "" || i.value === null) {
          lInp.style.color = "red";
          lInp.classList.add("active");
          contador++;
        } else {
          lInp.style.color = "green";
        }
      }
    });
    if (allSelct.length > 0) {
      allSelct.forEach((i) => {
        let lInp = document.querySelector(`label[for="${i.id}"]`);
        if (i.required) {
          if (i.value === "" || i.value === null) {
            lInp.style.color = "red";
            lInp.classList.add("active");
            contador++;
          } else {
            lInp.style.color = "green";
          }
        }
      });
    }
    if (allTxArea.length > 0) {
      allTxArea.forEach((txa) => {
        let ltxa = document.querySelector(`label[for="${txa.id}"]`);
        if (ltxa !== null) {
          if (txa.required) {
            if (txa.value == "") {
              ltxa.style.color = "red";
              ltxa.classList.add("active");
              contador++;
            } else {
              ltxa.style.color = "green";
            }
          }
        }
      });
    }
    if (contador > 0) {
      // toastr.info("Faltan campos obligatorios por ingresar.");
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Faltan campos obligatorios por ingresar.</span>
            </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
      resolve(false);
    } else {
      resolve(true);
    }
  });
}

function activeLbl(contenedor) {
  const all = document.getElementById(`${contenedor}`);
  const allLbl = all.querySelectorAll("label");
  if (allLbl.length > 0) {
    allLbl.forEach((i) => {
      i.classList.add("active");
    });
  }
}

function cleanContenedorInp(contenedor) {
  const all = document.getElementById(`${contenedor}`);
  const cInp = all.querySelectorAll("input");
  const allSelct = all.querySelectorAll("select");
  const alltxa = all.querySelectorAll("textarea");
  let inpVacios = [];
  let contador = 0;
  if (alltxa.length > 0) {
    alltxa.forEach((txa) => {
      txa.value = "";
      let lInp = document.querySelector(`label[for="${txa.id}"]`);
      if (lInp !== null) {
        lInp.classList.remove("active");
        lInp.style.color = "initial";
      }
    });
  }
  cInp.forEach((i) => {
    i.value = "";
    let lInp = document.querySelector(`label[for="${i.id}"]`);
    if (lInp !== null) {
      lInp.classList.remove("active");
      lInp.style.color = "initial";
    }
  });
  if (allSelct.length > 0) {
    allSelct.forEach((i) => {
      let lInp = document.querySelector(`label[for="${i.id}"]`);
      if (lInp !== null) {
        // lInp.classList.remove('active');
        lInp.style.color = "initial";
      }
    });
  }
}

function activeDescriptionInp(contenedor) {
  const all = document.getElementById(`${contenedor}`);
  const allLbl = all.querySelectorAll("label");
  if (allLbl.length > 0) {
    allLbl.forEach((i) => {
      i.classList.add("active");
    });
  }
}

async function verifyInputs(dv) {
  return new Promise((resolve, reject) => {
    const all = document.querySelectorAll(
      `#${dv} input, #${dv} select, #${dv} textarea`
    );
    let allTrue = true;
    if (all.length > 0) {
      all.forEach((input) => {
        if (input.required) {
          let alertaInp = document.querySelector(`p[for="${input.id}"]`);
          if (!input.value) {
            if (alertaInp) {
              alertaInp.style.display = "";
              alertaInp.style.color = "#CB4335";
              alertaInp.textContent = alertaInp.dataset.msg;
              allTrue = false;
            }
          } else {
            if (alertaInp) {
              alertaInp.textContent = "";
              alertaInp.style.display = "none";
            }
          }
        }
      });
    }
    if (allTrue) {
      resolve(true);
    } else {
      // toastr.info("Faltan campos obligatorios por ingresar.");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Faltan campos obligatorios por ingresar.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
      resolve(false);
    }
  });
}

function cleanVerifyInputs(dv) {
  const all = document.querySelectorAll(
    `#${dv} input, #${dv} select, #${dv} textarea`
  );
  if (all.length > 0) {
    all.forEach((input) => {
      if (!input.hasAttribute("data-noclean")) {
        input.value = "";
      }
      if (input.required) {
        let alertaInp = document.querySelector(`p[for="${input.id}"]`);
        if (alertaInp) {
          alertaInp.textContent = "";
          alertaInp.style.display = "none";
        }
      }
    });
  }
}

function quitarEspaciosExtras(cadena) {
  return cadena.replace(/\s+/g, " ");
}

async function pAjaxAsyncForm(url, formData, pcarga) {
  let respuesta = null;
  if (pcarga == 1) {
    Cargando();
  }
  try {
    respuesta = await $.ajax({
      type: "post",
      url: url,
      data: formData, // Se pasa el objeto FormData del formulario
      processData: false, // Se deshabilita el procesamiento automático de datos
      contentType: false, // Se deshabilita el tipo de contenido por defecto
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
    respuesta = null;
  } finally {
    if (pcarga == 1) {
      QuitarCargando();
    }
    // Verificar que respuesta existe antes de acceder a sus propiedades
    if (respuesta && respuesta.Resultado) {
      if (respuesta.Siguiente) {
        if (respuesta.Msg !== undefined) {
          // toastr.success(respuesta.Msg);
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">${respuesta.Msg}.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
        }
        return respuesta;
      } else {
        if (respuesta.Msg !== undefined) {
          // toastr.info(respuesta.Msg);
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${respuesta.Msg}</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        }
        return respuesta; // También devolver respuesta aquí
      }
    } else if (respuesta && !respuesta.Resultado) {
      // toastr.warning(
      //   "¡Ha ocurrido un error inesperado, inténtelo de nuevo por favor!"
      // );
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">¡Ha ocurrido un error inesperado, inténtelo de nuevo por favor!</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
      return respuesta;
    }
    return respuesta; // Siempre devolver respuesta al final
  }
}

const printOptionsSelect = (data, options) => {
  let cant = data.length;
  let html = "";
  if (!!options.initialOption) {
    html += `<option value=''>${options.initialOption}</option>`;
  }
  for (let i = 0; i < cant; i++) {
    html += `<option value="${data[i].id}">${data[i].description}</option>`;
  }
  $(`#${options.idElement}`).append(html);
};

async function verifyInputsDv(dv) {
  return new Promise((resolve) => {
    const all = document.querySelectorAll(
      `#${dv} input, #${dv} select, #${dv} textarea`
    );
    let allTrue = true;

    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;

    all.forEach((input) => {
      const alertaInp = document.querySelector(`span[for="${input.id}"]`);
      if (alertaInp) {
        alertaInp.textContent = "";
        alertaInp.style.display = "none";
      }

      if (!input.required) return;

      const value = input.value.trim();
      const isNumber = input.type === "number";
      const isText = input.type === "text";

      // Campo vacío
      if (!value) {
        if (alertaInp) {
          alertaInp.style.display = "";
          alertaInp.style.color = "#CB4335";
          alertaInp.textContent =
            alertaInp.dataset.msg || "Este campo es obligatorio.";
        }
        allTrue = false;
        return;
      }

      // Validación numérica con min/max
      if (isNumber) {
        const numValue = parseFloat(value);
        const min = input.hasAttribute("min") ? parseFloat(input.min) : null;
        const max = input.hasAttribute("max") ? parseFloat(input.max) : null;

        if (
          (min !== null && numValue < min) ||
          (max !== null && numValue > max)
        ) {
          if (alertaInp) {
            alertaInp.style.display = "";
            alertaInp.style.color = "#CB4335";
            alertaInp.textContent =
              alertaInp.dataset.msg ||
              `Valor fuera de rango permitido (${min ?? "-∞"} a ${max ?? "∞"})`;
          }
          allTrue = false;
          return;
        }
      }

      // Validación de RFC
      if (isText && input.dataset.typecontent === "RFC") {
        if (!rfcRegex.test(value)) {
          if (alertaInp) {
            alertaInp.style.display = "";
            alertaInp.style.color = "#CB4335";
            alertaInp.textContent =
              alertaInp.dataset.msg || "El RFC ingresado no es válido.";
          }
          allTrue = false;
          return;
        }
      }

      // Validación de EMAIL
      if (input.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          if (alertaInp) {
            alertaInp.style.display = "";
            alertaInp.style.color = "#CB4335";
            alertaInp.textContent =
              alertaInp.dataset.msg || "El correo electrónico no es válido.";
          }
          allTrue = false;
          return;
        }
      }

      // Validación superada
      if (alertaInp) {
        alertaInp.textContent = "";
        alertaInp.style.display = "none";
      }
    });

    if (!allTrue) {
      // toastr.info("Faltan campos obligatorios o hay errores en el contenido.");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Faltan campos obligatorios o hay errores en el contenido.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
    resolve(allTrue);
  });
}
