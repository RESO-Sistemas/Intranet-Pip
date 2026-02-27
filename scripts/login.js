function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

$("#btnLogin").click(async function () {
  let noEmpleado = await $("#NoEmpleado").val();
  let password = await $("#password").val();
  if (noEmpleado == "" || password == "") {
    // toastr.warning('Ingrese todos los campos');
    const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Llena todos los campos</span>
            </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);

    return false;
  }
  let datos = await {
    op: "loginEmpleado",
    noEmpleado: noEmpleado,
    password: password,
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "POST",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      // document.cookie = "logeo=true";
      // await validaLogin();
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Acceso Autorizado!</span>
              <span class="alert-text">Bienvenido.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
    } else {
      // toastr.warning(respuesta);
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">${respuesta}</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  }
});

// async function validaLogin(){
//   let datos = await {
//     op: "validarLogin"
//   };
//   let respuesta;
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     if (respuesta == "1") {
//       setTimeout(function () {
//         window.location.href=`index.php`;
//       }, 1000);
//     }else {
//       toastr.warning(respuesta);
//     }
//   }
// }

$("#password").keypress(function (event) {
  if (event.keyCode === 13) {
    $("#btnLogin").click();
  }
});
$("#NoEmpleado").keypress(function (event) {
  if (event.keyCode === 13) {
    $("#btnLogin").click();
  }
});

$("#to-recover").click(function () {
  // Limpiar el input
  $("#txtEmailRecuperarPass").val("");

  // Crear instancia del modal y mostrarlo
  const modal = new bootstrap.Modal(
    document.getElementById("modalRecuperarPassword")
  );
  modal.show();
});

// $("#idEnviaEmail").click(async function () {
//   $.blockUI({
//     message: '<h5><i class="fa fa-spinner fa-spin"></i>',
//     css: {
//       border: "none",
//       padding: "15px",
//       backgroundColor: "#000",
//       "-webkit-border-radius": "10px",
//       "-moz-border-radius": "10px",
//       opacity: 0.5,
//       color: "#ffc407",
//     },
//   });
//   let email = await $("#txtEmailRecuperarPass").val();
//   let datos = await {
//     op: "recuperarPassword",
//     Email: email,
//   };
//   alertify.closeAll();
//   let respuesta = "";
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//     });
//   } catch (error) {
//     setTimeout($.unblockUI, 1000);
//     console.log(error);
//   } finally {
//     if (respuesta == "1") {
//       setTimeout($.unblockUI, 1000);
//       alertify.success("¡Solicitud Enviada!");
//     } else {
//       setTimeout($.unblockUI, 1000);
//       alertify.warning(respuesta);
//     }
//   }
// });
$("#idEnviaEmail").click(async function () {
  // Bloquear UI
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

  let email = $("#txtEmailRecuperarPass").val();
  let datos = {
    op: "recuperarPassword",
    Email: email,
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
    setTimeout($.unblockUI, 1000);
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Alerta!</span>
        <span class="alert-text">Error en la solicitud, intente de nuevo.</span>
      </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
    return;
  }

  setTimeout($.unblockUI, 1000);

  if (respuesta == "1") {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Completado!</span>
        <span class="alert-text">Solicitud enviada correctamente.</span>
      </div>`;
    showBootstrapAlertSuc(messageContent, "top-right", 5000);

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalRecuperarPassword")
    );
    modal.hide();
  } else {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Alerta!</span>
        <span class="alert-text">${respuesta}</span>
      </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
  }
});

//ALERTAS
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
