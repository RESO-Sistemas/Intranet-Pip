const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Solicitud = urlParams.get("No");
let Empleado = "";
getDatosSolicitudPassword();

async function getDatosSolicitudPassword() {
  let datos = await {
    op: "getDatosSolicitudPassword",
    idSolicitudesRecoveryPass: Solicitud,
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
    console.log("si");
    Empleado = respuesta[0]["NoEmpleado"];
    $("#nameEmpleado").html(respuesta[0]["Nombre"]);
  }
}

$("#idUpdatePassword").click(async function () {
  let Pass1 = $("#txtPass1").val();
  let Pass2 = $("#txtPass2").val();

  if (Pass1 == "" || Pass2 == "") {
    // alertify.warning("Llene todos los campos, por favor.");
    const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Llene todos los campos, por favor.</span>
            </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
  } else {
    if (Pass1 !== Pass2) {
      //   alertify.warning("Las contraseñas no coinciden.");
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Las contraseñas no coinciden.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    } else {
      let b64pass = btoa(Pass1);
      let datos = await {
        op: "recoveryPassword",
        Password: b64pass,
        NoEmpleado: Empleado,
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
        if (respuesta == 1) {
          //   alertify.success("¡Contraseña actualizada con éxito!");
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">¡Contraseña actualizada con éxito!</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          setTimeout(() => {
            window.location.href = "index.php";
          }, 3000);
        } else {
          //   alertify.warning("ERROR!");
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">ERROR</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      }
    }
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
