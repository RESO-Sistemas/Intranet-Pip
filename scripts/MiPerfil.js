let modalComments = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ["button", "escape"],
  closeLabel: "Close",
  cssClass: ["custom-class-1", "custom-class-2"],
  onOpen: function () {
    console.log("modal open");
  },
  onClose: function () {
    console.log("modal closed");
  },
  beforeClose: function () {
    return true;
  },
});

function resolveEmployeeAsset(assetValue, fallback = "assets/images/logo-pip.png") {
  if (!assetValue || assetValue === "null") {
    return fallback;
  }

  if (typeof assetValue === "string" && assetValue.startsWith("data:")) {
    return assetValue;
  }

  return `data:image/png;base64,${assetValue}`;
}

function resolveSignatureAsset(signatureValue, employeeNumber) {
  if (!signatureValue || signatureValue === "null") {
    return "";
  }

  const normalized = String(signatureValue).trim();
  if (!normalized) {
    return "";
  }

  const normalizeDataUri = function (value) {
    const parts = value.split(",");
    if (parts.length < 2) {
      return value.replace(/ /g, "+");
    }

    return `${parts[0]},${parts.slice(1).join(",").replace(/ /g, "+")}`;
  };

  if (normalized.startsWith("data:")) {
    return normalizeDataUri(normalized);
  }

  // SVG XML crudo guardado desde la app móvil (formato legacy)
  if (normalized.startsWith("<svg") || normalized.startsWith("<?xml")) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(normalized)}`;
  }

  if (/^(https?:\/\/|\/|Archivos\/)/i.test(normalized)) {
    return normalized;
  }

  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(normalized)) {
    return `Archivos/ImgEmpleados/${employeeNumber}/Firma/${normalized}`;
  }

  return `data:image/png;base64,${normalized.replace(/ /g, "+")}`;
}

function getDisplayValue(value) {
  if (value === null || value === undefined) {
    return "No disponible";
  }

  const normalized = String(value).trim();
  if (!normalized || normalized.toLowerCase() === "null") {
    return "No disponible";
  }

  return normalized;
}

function setFieldValue(selector, value) {
  const element = $(selector);
  const finalValue = getDisplayValue(value);
  element.val(finalValue);
  element.toggleClass("info-input-empty", finalValue === "No disponible");
}

function setDateFieldValue(selector, value) {
  const element = $(selector);
  if (!value || value === "null" || value === "0000-00-00") {
    element.val("");
    element.toggleClass("info-input-empty", true);
    return;
  }
  // Intentar convertir a YYYY-MM-DD para input type="date"
  let dateStr = String(value).trim();
  // Si ya esta en formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    element.val(dateStr);
  } else {
    // Intentar parsear otros formatos comunes (DD/MM/YYYY, MM/DD/YYYY, etc.)
    let parts = dateStr.split(/[\/\-\.]/);
    if (parts.length === 3) {
      // Asumir DD/MM/YYYY si el primer valor > 12, sino MM/DD/YYYY
      let day, month, year;
      if (parseInt(parts[0]) > 12) {
        day = parts[0]; month = parts[1]; year = parts[2];
      } else {
        month = parts[0]; day = parts[1]; year = parts[2];
      }
      if (year.length === 2) year = "20" + year;
      element.val(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    } else {
      element.val(dateStr);
    }
  }
  element.toggleClass("info-input-empty", false);
}

function setStatValue(selector, value) {
  const element = $(selector);
  const finalValue = getDisplayValue(value);

  if (finalValue === "No disponible") {
    element.html('<span class="stat-badge-empty">No disponible</span>');
  } else {
    element.text(finalValue);
  }
}

function setSignatureCardValue(imgSelector, emptySelector, value, employeeNumber) {
  const signatureImg = $(imgSelector);
  const signatureEmpty = $(emptySelector);
  const signatureBox = signatureImg.closest(".signature-box");
  const assetValue = resolveSignatureAsset(value, employeeNumber);

  if (!signatureImg.length || !signatureEmpty.length) {
    return;
  }

  if (assetValue) {
    signatureImg
      .off("load.signature error.signature")
      .on("load.signature", function () {
        signatureImg.show();
        signatureEmpty.hide();
        signatureBox.removeClass("is-empty");
      })
      .on("error.signature", function () {
        signatureImg.attr("src", "").hide();
        signatureEmpty.show();
        signatureBox.addClass("is-empty");
      })
      .attr("src", assetValue);
  } else {
    signatureImg.off("load.signature error.signature").attr("src", "").hide();
    signatureEmpty.show();
    signatureBox.addClass("is-empty");
  }
}

function setSignatureValue(value, employeeNumber) {
  setSignatureCardValue("#imgFirma", "#imgFirmaEmpty", value, employeeNumber);
  setSignatureCardValue("#imgFirmaSalud", "#imgFirmaSaludEmpty", value, employeeNumber);
}

function initializeSignatureModal() {
  const modalElement = document.getElementById("modalActualizarFirmaPerfil");
  if (!modalElement) {
    return;
  }

  const canvas = document.getElementById("draw-canvas-perfil");
  const contentCanvas = document.getElementById("contentCanvasPerfil");
  const clearBtn = document.getElementById("draw-clearBtnPerfil");
  const submitBtn = document.getElementById("draw-submitBtnPerfil");
  const ctx = canvas ? canvas.getContext("2d") : null;

  if (!canvas || !contentCanvas || !clearBtn || !submitBtn || !ctx) {
    return;
  }

  let drawing = false;
  let mousePos = { x: 0, y: 0 };
  let lastPos = { x: 0, y: 0 };
  let canvasListenersAttached = false;

  const resizeCanvas = function () {
    canvas.width = contentCanvas.offsetWidth;
    canvas.height = contentCanvas.offsetHeight;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 2;
  };

  const getMousePos = function (event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const getTouchPos = function (event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
  };

  const clearCanvas = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderCanvas = function () {
    if (!drawing) {
      window.requestAnimationFrame(renderCanvas);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    ctx.closePath();
    lastPos = mousePos;
    window.requestAnimationFrame(renderCanvas);
  };

  $(modalElement).on("shown.bs.modal", function () {
    resizeCanvas();
    clearCanvas();
  });

  if (!canvasListenersAttached) {
    clearBtn.addEventListener("click", clearCanvas);
    submitBtn.addEventListener("click", function () {
      const imageData = canvas.toDataURL("image/png");
      $.ajax({
        type: "POST",
        url: "Backend/Empleados/App.php",
        data: {
          op: "SubirFirma",
          imagen64: imageData,
        },
        success: function (response) {
          if (String(response).trim() === "1") {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
              modalInstance.hide();
            }
            clearCanvas();
            getDatosEmpleado();
            Swal.fire("Actualizado", "La firma se actualizó correctamente.", "success");
          } else {
            Swal.fire("Error", "No se pudo actualizar la firma.", "error");
          }
        },
        error: function () {
          Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
        },
      });
    });

    canvas.addEventListener("mousedown", function (event) {
      drawing = true;
      lastPos = getMousePos(event);
    });
    canvas.addEventListener("mouseup", function () {
      drawing = false;
    });
    canvas.addEventListener("mouseleave", function () {
      drawing = false;
    });
    canvas.addEventListener("mousemove", function (event) {
      mousePos = getMousePos(event);
    });

    canvas.addEventListener(
      "touchstart",
      function (event) {
        event.preventDefault();
        drawing = true;
        mousePos = getTouchPos(event);
        lastPos = mousePos;
      },
      { passive: false }
    );
    canvas.addEventListener(
      "touchmove",
      function (event) {
        event.preventDefault();
        mousePos = getTouchPos(event);
      },
      { passive: false }
    );
    canvas.addEventListener(
      "touchend",
      function (event) {
        event.preventDefault();
        drawing = false;
      },
      { passive: false }
    );

    window.requestAnimationFrame(renderCanvas);
    canvasListenersAttached = true;
  }
}

function toggleProfileLoading(show) {
  const overlay = $("#profileLoadingOverlay");
  if (!overlay.length) {
    return;
  }

  if (show) {
    overlay.removeClass("is-hidden");
  } else {
    overlay.addClass("is-hidden");
  }
}




loadAll();
initializeSignatureModal();
async function loadAll() {
  toggleProfileLoading(true);
  try {
    await getDatosEmpleado();
    await getColaboradores();
    await loadFeeds();
  } finally {
    toggleProfileLoading(false);
  }
}

$("#calendar").on("selectDate", function (event, newDate, oldDate) {
  getEventosDetalle(newDate);
});

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}
// let elem = document.querySelector('.materialboxed');
// let instance = M.Materialbox.init(elem, options);

$("#btnFotoEmp").click(function () {
  $("#fotoEmp").click();
});

async function getDatosEmpleado() {
  let datos = await {
    op: "getDatosEmpleado",
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
    for (var i = 0; i < respuesta.length; i++) {
      let urlImg = resolveEmployeeAsset(respuesta[i]["Imagen"]);
      let textEmail = `Email address: ${getDisplayValue(respuesta[i]["Email"])}`;
      $("#NameEmpleado").html(getDisplayValue(respuesta[i]["Nombre"]));
      $("#textoEmailEmp").text(textEmail);
      $("#textoMovil").text(getDisplayValue(respuesta[i]["Movil"]));
      setFieldValue("#PerfilNombre", respuesta[i]["Nombre"]);
      setFieldValue("#PerfilNoEmp", respuesta[i]["NoEmpleado"]);
      setFieldValue("#PerfilRFC", respuesta[i]["RFC"]);
      setFieldValue("#PerfilCURP", respuesta[i]["CURP"]);
      setFieldValue("#PerfilNOSEGURO", respuesta[i]["NoSeguro"]);
      setDateFieldValue("#PerfilFecNac", respuesta[i]["FNacimiento"]);
      setFieldValue("#PerfilPuesto", respuesta[i]["Puesto"]);
      setFieldValue("#PerfilSucursal", respuesta[i]["Sucursal"]);
      setFieldValue("#PerfilAntiguedad", respuesta[i]["Antiguedad"]);
      setFieldValue("#PerfilCCosto", respuesta[i]["CentrodeCosto"]);
      $("#Perfilpassword").val(respuesta[i]["Password"] || "");
      $("#Perfilemail").val(respuesta[i]["Email"] || "");
      $("#Perfilnumber").val(respuesta[i]["Movil"] || "");
      var divisionName = getDisplayValue(respuesta[i]["Division"]);
      if (divisionName === "No disponible") {
        $("#slctDivisionDisplay").html('<span class="stat-badge-empty">No disponible</span>');
      } else {
        $("#slctDivisionDisplay").text(divisionName);
      }
      $("#ImgEmpleadoPerfil").attr("src", urlImg);
      $("#mensajeBienvenida").html(respuesta[i]["MensajeBienvenida"]);
      $("#displayName").text(getDisplayValue(respuesta[i]["Nombre"]));
      $("#displayPosition").text(getDisplayValue(respuesta[i]["Puesto"]));
      setStatValue("#statFecNac", respuesta[i]["FNacimiento"]);
      setStatValue("#statNoEmp", respuesta[i]["NoEmpleado"]);
      setStatValue("#statPuesto", respuesta[i]["Puesto"]);
      setStatValue("#statSucursal", respuesta[i]["Sucursal"]);
      setStatValue("#statAntiguedad", respuesta[i]["Antiguedad"]);
      setSignatureValue(respuesta[i]["Firma"], respuesta[i]["NoEmpleado"]);

    }
  }
}

function updateDatosEmpleado() {
  let pass = ($("#Perfilpassword").val() || "").trim();
  let email = ($("#Perfilemail").val() || "").trim();
  let movil = ($("#Perfilnumber").val() || "").trim();

  // Validaciones client-side
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    Swal.fire("Correo inválido", "Ingrese un correo electrónico válido", "warning");
    return;
  }
  if (movil && (movil.length < 10 || movil.length > 15)) {
    Swal.fire("Teléfono inválido", "El teléfono debe tener entre 10 y 15 dígitos", "warning");
    return;
  }
  if (pass && pass.length < 4) {
    Swal.fire("Contraseña muy corta", "La contraseña debe tener al menos 4 caracteres", "warning");
    return;
  }

  Swal.fire({
    title: "¿Desea cambiar los datos de este empleado?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Actualizar Datos",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "Backend/Empleados/App.php",
        data: {
          op: "updateDatosEmpleado",
          pass: pass,
          email: email,
          movil: movil,
        },
        success: function (response) {
          response = response.trim();
          if (response == "1") {
            Swal.fire(
              "Actualizado",
              "Los datos de este empleado fueron actualizados",
              "success"
            );
            setTimeout(function () {
              getDatosEmpleado();
            }, 1000);
          } else if (response == "email_invalido") {
            Swal.fire("Correo inválido", "El formato del correo no es válido", "error");
          } else if (response == "movil_invalido") {
            Swal.fire("Teléfono inválido", "El teléfono debe tener entre 10 y 15 dígitos", "error");
          } else if (response == "password_corto") {
            Swal.fire("Contraseña muy corta", "Debe tener al menos 4 caracteres", "error");
          } else {
            Swal.fire("Error", "Algo salió mal, intente de nuevo", "error");
          }
        },
        error: function () {
          Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        },
      });
    }
  });
}

// Campos que el empleado puede editar en su perfil personal
const EDITABLE_FIELDS = ["#PerfilNombre", "#PerfilRFC", "#PerfilCURP", "#PerfilNOSEGURO", "#PerfilFecNac"];

function toggleEditMode() {
  const btn = $("#btnEditarPerfil");
  const divGuardar = $("#divGuardarPerfil");
  const isEditing = btn.hasClass("editing");

  if (isEditing) {
    // Salir de modo edicion — restaurar valores originales
    EDITABLE_FIELDS.forEach(function (sel) {
      $(sel).prop("disabled", true);
    });
    btn.removeClass("editing").html('<i class="fas fa-pen me-1"></i> Editar');
    divGuardar.hide();
    getDatosEmpleado(); // restaurar valores originales
  } else {
    // Entrar a modo edicion
    EDITABLE_FIELDS.forEach(function (sel) {
      $(sel).prop("disabled", false);
    });
    btn.addClass("editing").html('<i class="fas fa-times me-1"></i> Cancelar');
    divGuardar.show();
  }
}

function guardarPerfilPersonal() {
  let nombre = ($("#PerfilNombre").val() || "").trim();
  let rfc = ($("#PerfilRFC").val() || "").trim();
  let curp = ($("#PerfilCURP").val() || "").trim();
  let noSeguro = ($("#PerfilNOSEGURO").val() || "").trim();
  let fNacimiento = ($("#PerfilFecNac").val() || "").trim();

  if (!nombre) {
    Swal.fire("Campo requerido", "El nombre es obligatorio", "warning");
    return;
  }

  Swal.fire({
    title: "¿Guardar cambios?",
    text: "Se actualizarán los datos de tu perfil",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Guardar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "Backend/Empleados/App.php",
        data: {
          op: "updatePerfilPersonalEmpleado",
          Nombre: nombre,
          RFC: rfc,
          CURP: curp,
          NoSeguro: noSeguro,
          FNacimiento: fNacimiento,
        },
        success: function (response) {
          response = response.trim();
          if (response == "1") {
            Swal.fire("Actualizado", "Datos personales actualizados", "success");
            toggleEditMode(); // salir de modo edicion
            getDatosEmpleado(); // recargar datos
          } else if (response == "nombre_requerido") {
            Swal.fire("Campo requerido", "El nombre es obligatorio", "warning");
          } else {
            Swal.fire("Error", "Algo salió mal, intente de nuevo", "error");
          }
        },
        error: function () {
          Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        },
      });
    }
  });
}

function updateFotoEmpleado() {
  if (document.getElementById("FrmFotoEmp").checkValidity()) {
    event.preventDefault();
    var form = $("#FrmFotoEmp")[0];
    var data = new FormData(form);
    $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response == "1") {
          Swal.fire("Actualizado", "Foto Actualizada", "success");
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else {
          // toastr.warning("Algo salio mal, Intente de nuevo");
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salio mal, Intente de nuevo.</span>
        </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      },
        error: function () {
          Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        },
      });
    } else {
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese todos los datos"</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
}

async function getColaboradores() {
  let datos = await {
    op: "getColaboradores",
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
    let contenedorDiv = "";
    let tituloNivel = "";
    let urlPerfilImg = "";
    for (var i = 0; i < respuesta.length; i++) {
      urlPerfilImg = resolveEmployeeAsset(respuesta[i]["Imagen"]);
      if (respuesta[i]["Nivel"] > 0) {
        if (respuesta[i]["Nivel"] == "1") {
          contenedorDiv = "divColaboradoreslvl";
          $("#titulolvl1").html("Dirección General");
        } else if (respuesta[i]["Nivel"] == "2") {
          contenedorDiv = "divColaboradoreslv2";
          $("#titulolvl2").html("Dirección");
        } else if (respuesta[i]["Nivel"] == "3") {
          contenedorDiv = "divColaboradoreslv3";
          $("#titulolvl3").html("Gerencias");
        } else if (respuesta[i]["Nivel"] == "4") {
          contenedorDiv = "divColaboradoreslv4";
          $("#titulolvl4").html("Lider, jefe, coordinador de departamento");
        } else if (respuesta[i]["Nivel"] == "5") {
          contenedorDiv = "divColaboradoreslv5";
          $("#titulolvl5").html("Analistas/funcionales");
        } else if (respuesta[i]["Nivel"] == "6") {
          contenedorDiv = "divColaboradoreslv6";
          $("#titulolvl6").html("Auxiliar/Asistente");
        } else if (respuesta[i]["Nivel"] == "7") {
          contenedorDiv = "divColaboradoreslv7";
          $("#titulolvl7").html("Operativos");
        }
        let nameEmp = respuesta[i]["Nombre"];
        let emailEmp = respuesta[i]["Email"];
        let puestoEmp = respuesta[i]["Puesto"];
        $("#" + contenedorDiv).append(`
<div class="col-md-4 mb-3"> <!-- 3 por fila en desktop -->
  <div class="card h-100">
    <div class="card-body text-center">
      <a href="#"><img src="${urlPerfilImg}" alt="user" class="rounded-circle" style="width:75px; height:75px; object-fit:cover;"></a>
      <h5 class="mt-2 mb-1">${nameEmp}</h5>
      <p class="text-muted small mb-1">${puestoEmp}</p>
      <p class="text-muted small">${emailEmp}</p>
    </div>
  </div>
</div>
          `);
      }
    }
  }
}


let currentFeedPage = 1;
let feedHasMorePages = true;
let feedCommentsData = {};
let feedCommentsLoading = {};

async function loadFeeds(page = 1) {
  let datos = { op: "loadFeeds", lightweight: 1, page: page, limit: 8 };
  let response = [];
  try {
    response = await $.ajax({
      type: "post",
      url: "Backend/Feed/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    response.sort(
      (a, b) => new Date(b.Registro).getTime() - new Date(a.Registro).getTime()
    );
    let contentHtmlFinal = "";
    let urlImgProfile = "";
    console.log(response);

    for (let i = 0; i < response.length; i++) {
      const feed = response[i];
      let colorMg = feed.MeGusta == 1 ? "color:#E91E63;" : "color:black;";
      let colorCong =
        feed.Felicitacion == 1 ? "color:#8E24AA;" : "color:black;";
      let cantComm = feed.ArrayComentarios.length;

      let contentBtnFel = "";
      let contentHtmlImg = "";
      let descriptionFinal = "";
      let arrDescription = [];
      let arrInd = [];
      let contentHtmlMg = "";
      let contentHtmlCongra = "";

      const employesMg = feed.EmpleadosReaccion.filter(
        (i) => i.TipoReaccion == 1
      );
      const employesF = feed.EmpleadosReaccion.filter(
        (i) => i.TipoReaccion == 2
      );
      const cantMg = employesMg.length;
      const cantCongratulations = employesF.length;

      // Generar HTML para Me Gusta
      if (cantMg > 0) {
        for (let j = 0; j < employesMg.length; j++) {
          const data = employesMg[j];
          contentHtmlMg += `<li style="font-size:.8em"> * ${data.EmpleadoReaccion}</li>`;
        }
      } else {
        contentHtmlMg = `<li style="font-size:.8em"> SIN REGISTROS </li>`;
      }

      // Generar HTML para Felicitaciones
      if (cantCongratulations > 0) {
        for (let j = 0; j < employesF.length; j++) {
          const data = employesF[j];
          contentHtmlCongra += `<li style="font-size:.8em"> * ${data.EmpleadoReaccion}</li>`;
        }
      } else {
        contentHtmlCongra = `<li style="font-size:.8em"> SIN REGISTROS </li>`;
      }

      // Construir la descripción y el HTML de las imágenes
      switch (feed.Tipo) {
        case "CMP":
        case "ANY":
          arrDescription = feed.Descripcion.split("<br>");
          arrInd = arrDescription.slice(1);
          if (arrInd.length == 0) {
            const arrSplit = feed.Descripcion.split(". ");
            descriptionFinal += `<h6><b style="font-size:18px;">${
              arrSplit[0] ?? ""
            }</b> ${arrSplit[1] ?? ""}</h6>`;
          } else {
            for (let k = 0; k < arrInd.length; k++) {
              const arrSplit = arrInd[k].split(". ");
              descriptionFinal += `<h6><b style="font-size:18px;">${
                arrSplit[0] ?? ""
              }</b> ${arrSplit[1] ?? ""}</h6>`;
            }
          }
          if (feed.Archivo) {
            const folder =
              feed.Tipo == "CMP" ? "ImagesBirthday" : "ImagesAnniversary";
            contentHtmlImg += `
                            <img alt="${
                              feed.Tipo === "CMP"
                                ? "Image 1 Title"
                                : "Image Anniversary"
                            }"
                                src="Archivos/${folder}/${feed.Archivo}"
                                loading="lazy"
                                data-image="Archivos/${folder}/${feed.Archivo}"
                                data-description="${
                                  feed.Tipo === "CMP"
                                    ? "Image 1 Description"
                                    : "Image Anniversary"
                                }">`;
          }
          break;
        default:
          descriptionFinal = feed.Descripcion;
          if (feed.Archivo) {
            const arrFiles = feed.Archivo.split(",");
            for (let k = 0; k < arrFiles.length; k++) {
              const f = arrFiles[k];
              contentHtmlImg += `
                                <img alt="Image 1 Title" src="Archivos/Feed/${
                                  feed.idFeed
                                }/${f}"
                                    loading="lazy"
                                    data-image="Archivos/Feed/${
                                      feed.idFeed
                                    }/${f}"
                                    data-description="No.${k + 1}">`;
            }
          }
      }

      urlImgProfile = feed.Imagen
        ? `Archivos/ImgEmpleados/${feed.NoEmpleado}/${feed.Imagen}`
        : "assets/logoK.png";

      contentHtmlFinal += `
            <div class="card" >
    <div class="card-body" style="min-height:170px; padding:15px;">
        <ul class="list-unstyled">
            <li class="mb-4">
                <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                        <img src="${urlImgProfile}" alt="user" class="rounded-circle" width="50">
                    </div>
                    <div class="flex-grow-1 border p-3 rounded">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="fw-bold mb-0">${feed.Nombre}</h6>
                            <small class="text-muted">Publicado hace ${
                              feed.DiferenciaRegistro
                            }</small>
                        </div>
                        <p class="mb-2">${feed.Titulo}</p>
                        <div class="text-justify">
                            <hr class="my-2">
                            ${descriptionFinal}
                        </div>

                        ${
                          feed.Hipervinculo
                            ? `<div class="text-center my-2"><a href="${feed.Hipervinculo}" target="_blank">${feed.Hipervinculo}</a></div>`
                            : ""
                        }
                        
                        ${
                          feed.Archivo
                            ? `<div class="text-center"><div id="galleryFeed${feed.idFeed}" class="galleryImgCl m-t-3 mx-auto" style="display:none; max-width: 100%">${contentHtmlImg}</div></div>`
                            : ""
                        }

                        <!-- Ventana Me Gusta -->
                        <div class="position-relative">
                            <div id="WindowMeGusta${
                              feed.idFeed
                            }" class="menuMeGusta row position-absolute d-none" style="z-index:9999; width:50%; background-color:#007B85; bottom:30%; left:30%; border-radius:15px; opacity:0.95; color:white; padding:10px; max-height:45vh;">
                                <div class="col-12">
                                    <h6 class="text-white fw-bold">Personas que reaccionaron</h6>
                                </div>
                                <div class="col-12">
                                    <ul id="ulEmpleadosReaccionanMG${
                                      feed.idFeed
                                    }" class="list-unstyled">
                                        ${contentHtmlMg}
                                    </ul>
                                </div>
                            </div>

                            ${
                              feed.Tipo == "CMP" || feed.Tipo == "ANY"
                                ? `
                            <!-- Ventana Felicitaciones -->
                            <div class="position-relative">
                                <div id="WindowFelicitacion${feed.idFeed}" class="menuFelicitacion row position-absolute d-none" style="z-index:9999; width:50%; background-color:#7F00A7; bottom:30%; left:30%; border-radius:15px; opacity:0.95; color:white; padding:10px; max-height:45vh;">
                                    <div class="col-12">
                                        <h6 class="text-white fw-bold">Personas que reaccionaron</h6>
                                    </div>
                                    <div class="col-12">
                                        <ul id="ulEmpleadosReaccionanFEL${feed.idFeed}" class="list-unstyled">
                                            ${contentHtmlCongra}
                                        </ul>
                                    </div>
                                </div>
                            </div>`
                                : ""
                            }
                        </div>

                        <!-- Botones de interacción -->
                        <div class="row mt-3">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <a href="javascript:void(0)" id="btnEventoMG${
                                  feed.idFeed
                                }" class="text-decoration-none ${
        colorMg ? "" : "text-dark"
      }" onclick="MeGusta(${feed.idFeed},1)">
                                    <i class="fa-solid fa-heart me-1"></i> ${
                                      feed.CantidadMeGusta
                                    } Me gusta
                                </a>
                            </div>
                            
                            ${
                              feed.Tipo == "CMP" || feed.Tipo == "ANY"
                                ? `
                            <div class="col-md-4 mb-2 mb-md-0">
                                <a href="javascript:void(0)" id="btnEventoF${
                                  feed.idFeed
                                }" class="text-decoration-none ${
                                    colorCong ? "" : "text-dark"
                                  }" onclick="MeGusta(${feed.idFeed},2)">
                                    <i class="fas fa-birthday-cake me-1"></i> ${
                                      feed.CantidadFelicitaciones
                                    } Felicitaciones
                                </a>
                            </div>`
                                : ""
                            }
                            
                            <div class="col-md-4">
                                <a href="javascript:void(0)" id="btnComment${
                                  feed.idFeed
                                }" class="text-decoration-none text-dark" onclick="showCommentsMain('${
        feed.idFeed
      }')">
                                    <i class="far fa-comments me-1"></i> ${cantComm} Comentarios
                                </a>
                            </div>
                        </div>

                        <!-- Comentarios -->
                        <div class="row mt-3" id="dv_commentarios${
                          feed.idFeed
                        }" style="display: none;">
                            <div class="col-12" id="dv_contentCommentsFeed${
                              feed.idFeed
                            }"></div>
                            <div class="col-12 mt-2">
                                <div class="input-group">
                                    <textarea class="form-control" placeholder="Escribe tu comentario aquí..." id="f_newComentary${
                                      feed.idFeed
                                    }" rows="2"></textarea>
                                    <button class="btn btn-primary" onclick="checkComment('${
                                      feed.idFeed
                                    }')">Comentar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>`;
    }

    if (page === 1) {
      $("#ContenidoFeed").html(contentHtmlFinal);
    } else {
      $("#ContenidoFeed").append(contentHtmlFinal);
    }

    feedHasMorePages = response.length >= 8;
    const btnLoadMore = document.getElementById("btnLoadMoreFeedPerfil");
    if (btnLoadMore) {
      btnLoadMore.style.display = feedHasMorePages ? "" : "none";
    }

    const newGalleries = document.querySelectorAll(".galleryImgCl:not(.ug-gallery-wrapper)");
    if (newGalleries.length > 0) {
      for (let i = 0; i < newGalleries.length; i++) {
        const f = newGalleries[i];
        $(f).unitegallery({
          gallery_skin: "alexis",
          slider_scale_mode: "fit",
          slider_transition: "fade",
          thumb_overlay_color: "#363636",
          strippanel_background_color: "#000c1f",
          slider_enable_fullscreen_button: true,
          theme_panel_position: "bottom",
          slider_enable_zoom_panel: true,
          slider_zoompanel_skin: "",
          slider_zoompanel_align_hor: "right",
          slider_zoompanel_align_vert: "top",
          slider_zoompanel_offset_hor: 12,
          slider_zoompanel_offset_vert: 10,
          slider_enable_progress_indicator: true,
          slider_enable_play_button: true,
        });
      }
      $(".ug-slider-control.ug-button-play.ug-skin-alexis").click();
      $(".ug-slider-control.ug-button-play.ug-skin-alexis").hide();
    }
  }
}

function loadMoreFeedPerfil() {
  if (!feedHasMorePages) return;
  currentFeedPage += 1;
  loadFeeds(currentFeedPage);
}

$(document).on("mouseenter", ".TooltipHoverMg", function () {
  let btnId = event.target.id;
  let arrid = btnId.split("MG");
  let id = arrid[1];
  $("#WindowMeGusta" + id).fadeIn();
});

$(document).on("mouseleave", ".TooltipHoverMg", function () {
  $(".menuMeGusta").fadeOut();
});

$(document).on("mouseenter", ".TooltipHoverF", function () {
  let btnId = event.target.id;
  let arrid = btnId.split("F");
  let id = arrid[1];
  $("#WindowFelicitacion" + id).fadeIn();
});

$(document).on("mouseleave", ".TooltipHoverF", function () {
  $(".menuFelicitacion").fadeOut();
});

$(document).on("click", ".swiper-slide", function () {
  let slideId = $(this).attr("data-idfeed");
  openFullscreenSwiper(slideId);
});

function openFullscreenSwiper(initialSlideNumber) {
  var mainSwiperMarkup = $("#ContentSwp" + initialSlideNumber).html();
  console.log(mainSwiperMarkup);
  if ($("#fullscreen-swiper").is(":visible")) {
  } else {
    $("#fullscreen-swiper")
      .append(
        mainSwiperMarkup +
          "<div id='fullscreen-swiper-close'><i class='fa-light fa-circle-xmark'></i></div>"
      )
      .fadeIn();
    var fullscreenSwiper = new Swiper("#fullscreen-swiper", {
      initialSlide: 2,
      zoom: true,
      direction: "horizontal",
      loop: true,
      effect: "coverflow",
      speed: 1000,
      spaceBetween: 32,
      loop: true,
      centeredSlides: true,
      roundLengths: true,
      // mousewheel: true,
      grabCursor: false,
      pagination: {
        el: ".swiper-pagination",
        // type: "progressbar",
        // clickable: true,
        hide: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    $("#fullscreen-swiper-backdrop").fadeIn();
    $("body, html").addClass("no-scroll");

    $("#fullscreen-swiper-close").on("click", function () {
      $("#fullscreen-swiper").hide().empty();
      $("#fullscreen-swiper-backdrop").fadeOut();
      $("body, html").removeClass("no-scroll");
    });
  }
}

function insertaComentario(val) {
  let comentario = $("#txtComentario" + val).val();
  if (comentario == "") {
    // toastr.info("Agregue un comentario");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Agregue un comentario.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
    return false;
  }
  datos = {
    op: "addComentariosFeed",
    idFeed: val,
    Comentario: comentario,
  };
  $.ajax({
    type: "post",
    url: "Backend/Feed/App.php",
    data: datos,
    success: function (response) {
      if (response == "1") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comentario registrado",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          loadFeeds();
        });
      } else {
        // toastr.info("Error al agregar el comentario");
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error al agregar el comentario.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function mostrarComentarios(val) {
  if ($("#ComentarioFeed" + val).is(":visible")) {
    $("#ComentarioFeed" + val).fadeOut(); // hide
  } else {
    $("#ComentarioFeed" + val).fadeIn(); // hide
  }
}

function AddComentario(valor) {
  if (event.keyCode === 13) {
    insertaComentario(valor);
  }
}


async function MeGusta(valor, tipo) {
  datos = await {
    op: "MeGustaFeed",
    FeedId: valor,
    idTipoReaccion: tipo,
  };
  let response = [];
  try {
    response = await $.ajax({
      type: "post",
      url: "Backend/Feed/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (response[0]["TipoReaccion"] == "1") {
      $("#ulEmpleadosReaccionanMG" + response[0]["IdFeed"]).html("");
      $("#btnEventoMG" + response[0]["IdFeed"]).html(
        `<i class="fa-solid fa-heart"></i> ${response[0]["CantidadMeGusta"]} Me gusta`
      );
      if (response[0]["MeGusta"] == "1") {
        $("#btnEventoMG" + response[0]["IdFeed"]).css({
          color: "#E91E63",
        });
      } else {
        $("#btnEventoMG" + response[0]["IdFeed"]).css({
          color: "black",
        });
      }
    } else {
      $("#ulEmpleadosReaccionanFEL" + response[0]["IdFeed"]).html("");
      $("#btnEventoF" + response[0]["IdFeed"]).html(
        `<i class="fas fa-birthday-cake"></i> ${response[0]["CantidadFelicitaciones"]} Felicitaciones`
      );
      if (response[0]["Felicitacion"] == "1") {
        $("#btnEventoF" + response[0]["IdFeed"]).css({
          color: "#8E24AA",
        });
      } else {
        $("#btnEventoF" + response[0]["IdFeed"]).css({
          color: "black",
        });
      }
    }
    response.forEach((arr) => {
      let siguiente = 0;
      if (
        (arr.TipoReaccion == "1" && arr.CantidadMeGusta > 0) ||
        (arr.TipoReaccion == "2" && arr.CantidadFelicitaciones > 0)
      ) {
        siguiente++;
      }
      if (siguiente == "1") {
        arr.EmpleadosReaccion.forEach((empReaccion) => {
          if (siguiente == "1") {
            if (empReaccion.idTipoReaccion == arr.TipoReaccion) {
              if (arr.TipoReaccion == "1") {
                $("#ulEmpleadosReaccionanMG" + arr.IdFeed).append(`
                  <li style="font-size:.8em"> * ${empReaccion.Nombre}</li>
                `);
              } else {
                $("#ulEmpleadosReaccionanFEL" + arr.IdFeed).append(`
                  <li style="font-size:.8em"> * ${empReaccion.Nombre}</li>
                `);
              }
            }
          }
        });
      } else {
        if (arr.TipoReaccion == "1") {
          $("#ulEmpleadosReaccionanMG" + arr.IdFeed).append(`
            <li style="font-size:.8em"> SIN REGISTROS </li>
          `);
        } else {
          $("#ulEmpleadosReaccionanFEL" + arr.IdFeed).append(`
            <li style="font-size:.8em"> SIN REGISTROS </li>
          `);
        }
      }
    });
    // if (response == "1") {
    //   loadFeeds();
    // }else {
    //   toastr.info("ERROR");
    // }
  }
}

async function saveInfoFeed() {
  let form = $("#formFeed")[0];
  let dataSend = new FormData(form);
  dataSend.append("op", "addPublicationFromIndex"); // Puedes agregar datos adicionales si es necesario
  let ajaxR = await pAjaxAsyncForm(url_m_Feed, dataSend, 1);
  if (ajaxR.Resultado) {
    setTimeout(function () {
      location.reload();
    }, 1500);
  }
}

function AddComentario(valor) {
  if (event.keyCode === 13) {
    insertaComentario(valor);
  }
}

function insertaComentario(val) {
  let comentario = $("#txtComentario" + val).val();
  if (comentario == "") {
    // toastr.info("Agregue un comentario");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Agregue un comentario.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
    return false;
  }
  datos = {
    op: "addComentariosFeed",
    idFeed: val,
    Comentario: comentario,
  };
  $.ajax({
    type: "post",
    url: "Backend/Feed/App.php",
    data: datos,
    success: function (response) {
      if (response == "1") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comentario registrado",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          loadFeeds();
        });
      } else {
        // toastr.info("Error al agregar el comentario");
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Error al agregar el comentario.</span>
        </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function mostrarComentarios(val) {
  if ($("#ComentarioFeed" + val).is(":visible")) {
    $("#ComentarioFeed" + val).fadeOut(); // hide
  } else {
    $("#ComentarioFeed" + val).fadeIn(); // hide
  }
}

const showCommentsMain = (content) => {
  var dvContent = document.getElementById(`dv_commentarios${content}`);
  if (dvContent) {
    if (dvContent.style.display == "none") {
      dvContent.style.display = "";
      if (!feedCommentsLoading[content]) {
        getCommentsFeedSelected(content);
      }
    } else {
      dvContent.style.display = "none";
    }
  }
};

const renderCommentsFeedInline = (content) => {
  if (!feedCommentsData[content]) return;
  const ajaxR = feedCommentsData[content];
  const cant = ajaxR.Data.length;
  let contentCom = "";
  if (cant > 0) {
    let colorReaction = ajaxR.Data[0].inReaction ? "#ffc407" : "black";
    let employeesRLike = "";
    let cantReactions = ajaxR.Data[0].reactionsC.length;
    if (cantReactions > 0) {
      for (var i = 0; i < cantReactions; i++) {
        employeesRLike += `<li>${ajaxR.Data[0].reactionsC[i]["Nombre"]}</li>`;
      }
    } else {
      employeesRLike = "<li>Sin registros...</li>";
    }
    contentCom = `
      <div class="m-t-10 m-l-10">
        <h6 class="text-comments" onclick="viewAllCommentsFeed('${content}')">Ver todos los comentarios.</h6>
      </div>
      <div class="chat-box scrollable ps ps--theme_default ps--active-y">
        <ul class="chat-list">
          <li style="position: relative;">
            <div class="chat-img"><img src="Archivos/ImgEmpleados/${ajaxR.Data[0].ImagenEmpleado}" alt="user" loading="lazy"></div>
            <div class="chat-content">
              <div class="box bg-light-info" style="position: relative;">
                <h6><b>${ajaxR.Data[0].Nombre}</b></h6>
                <span>${ajaxR.Data[0].Comentario}</span>
                <div class="content-reactionComm hover-actionCmm" onclick="reactsToComment('1', '${ajaxR.Data[0].idComentariosFeed}')" data-comment="${ajaxR.Data[0].idComentariosFeed}">
                  <i id="icon-1-CommentP-${ajaxR.Data[0].idComentariosFeed}" class="fa fa-thumbs-up" style="color: ${colorReaction}; font-size: 20px;"></i>
                  <span id="span-1-CommentP-${ajaxR.Data[0].idComentariosFeed}" style="margin-left: 5px;">${cantReactions}</span>
                </div>
              </div>
              <div class="chat-time">${ajaxR.Data[0].Registro}</div>
            </div>
          </li>
        </ul>
      </div>
      <div style="position: relative;">
        <div id="WindowReactionComm${ajaxR.Data[0].idComentariosFeed}" class="reactionComm row">
          <span><b>Personas que reaccionaron</b></span>
          <ul id="employeesReactionComm-1-${ajaxR.Data[0].idComentariosFeed}">${employeesRLike}</ul>
        </div>
      </div>`;
  }
  const dvContent = document.getElementById(`dv_contentCommentsFeed${content}`);
  if (dvContent) dvContent.innerHTML = `<div class="row">${contentCom}</div>`;
};

const getCommentsFeedSelected = async (content, forceReload = false) => {
  if (feedCommentsLoading[content]) return;
  if (feedCommentsData[content] && !forceReload) {
    renderCommentsFeedInline(content);
    return;
  }
  feedCommentsLoading[content] = true;
  let dataSend = { op: "getCommentsFeedSelected", iFeed: content };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  feedCommentsLoading[content] = false;
  if (ajaxR !== undefined) {
    feedCommentsData[content] = ajaxR;
    let btnComm = document.getElementById(`btnComment${content}`);
    if (btnComm) {
      btnComm.innerHTML = `<i class="far fa-comments"></i> ${ajaxR.Data.length} Comentarios`;
    }
    renderCommentsFeedInline(content);
  }
};

const checkComment = (i_Feed) => {
  let inpText = document.getElementById(`f_newComentary${i_Feed}`);
  if (inpText) {
    if ($(inpText).val() != "") {
      makeComment($(inpText).val(), i_Feed);
    } else {
      // toastr.info("Es necesario ingresar un comentario para continuar.");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Es necesario ingresar un comentario para continuar.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
};
$(document).on("click", "#btn_m_generateComment", function () {
  checkCommentM();
});
const checkCommentM = () => {
  let inp_comm = document.getElementById("comment_m_feed");
  if (inp_comm) {
    if ($(inp_comm).val() != "") {
      let inp_f = document.getElementById("feed_m_selComm");
      if (inp_f) {
        makeCommentM($(inp_comm).val(), inp_f.value);
      }
    } else {
      // toastr.info("Se requiere registrar un comentario para continuar.");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Se requiere registrar un comentario para continuar.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
};
const makeCommentM = async (content, i_Feed) => {
  let dataSend = {
    op: "makeComment",
    commentary: content,
    i_Feed: i_Feed,
  };
  console.log(dataSend);
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR != undefined) {
    let inpText = document.getElementById(`comment_m_feed`);
    console.log(inpText);
    if (inpText) {
      inpText.value = "";
    }
  }
};

const makeComment = async (content, i_Feed) => {
  let dataSend = {
    op: "makeComment",
    commentary: content,
    i_Feed: i_Feed,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR !== undefined) {
    console.log(ajaxR);
    let inpText = document.getElementById(`f_newComentary${i_Feed}`);
    $(inpText).val("");
    let contentCom = "";
    contentCom = `
		<div class="m-t-10">
			<h6 class="text-comments" onclick="viewAllCommentsFeed('${dataSend.i_Feed}')">Ver todos los comentarios.</h6>
		</div>
		<div class="chat-box scrollable ps ps--theme_default ps--active-y" style="min-height:170px;">
				<ul class="chat-list">
						<li>
								<div class="chat-img"><img src="Archivos/ImgEmpleados/${ajaxR.Data.ImagenEmpleado}" alt="user"></div>
								<div class="chat-content">
										<h6 class="font-medium">${ajaxR.Data.Nombre}</h6>
										<div class="box bg-light-info">${ajaxR.Data.Comentario}</div>
								</div>
								<div class="chat-time">${ajaxR.Data.Registro}</div>
						</li>
				</ul>
		</div>`;
    let contentFinal = `
		<div class="row">
			${contentCom}
		</div>`;
    var dvContent = document.getElementById(`dv_contentCommentsFeed${i_Feed}`);
    dvContent.innerHTML = contentFinal;
  }
};

const getDataFeedSelected = async (feed) => {
  let dataSend = {
    op: "getDataFeedSelected",
    feed: feed,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR !== undefined) {
    return ajaxR.Data;
  }
};

const viewAllCommentsFeed = async (feed) => {
  let dataFeed = await getDataFeedSelected(feed);
  let contentImg = "";
  let contentComments = "";
  let cantComments = dataFeed.commentsData.length;
  if (cantComments > 0) {
    setTimeout(function () {
      let inp_f = document.getElementById("feed_m_selComm");
      if (inp_f) {
        inp_f.value = feed;
      }
    }, 2000);
    for (var i = 0; i < cantComments; i++) {
      let colorReaction = "black";
      let cantReactions = dataFeed.commentsData[i].reactionsC.length;
      let employeesRLike = "";
      if (cantReactions > 0) {
        for (var ii = 0; ii < cantReactions; ii++) {
          employeesRLike += `<li>
						${dataFeed.commentsData[i].reactionsC[ii]["Nombre"]}
					</li>`;
        }
      } else {
        employeesRLike = "<li>Sin registros...</li>";
      }
      console.log(dataFeed.commentsData[i].inReaction);
      if (dataFeed.commentsData[i].inReaction) {
        colorReaction = "#ffc407";
      }
      if (dataFeed.commentsData[i].TypeCommentUs == 1) {
        contentComments += `
				<li class="odd">
					<div class="chat-content">
							<div class="box bg-light-inverse" style="border-radius: 10px; position: relative;">
								<h6 class="font-medium" style="color: #FFF">${dataFeed.commentsData[i].Nombre}</h6>
								${dataFeed.commentsData[i].Comentario}
								<div class="content-reactionCommD hover-actionCmmM" data-comment="${dataFeed.commentsData[i].idComentariosFeed}">
										<i id="iconM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}" class="fa fa-thumbs-up" style="color: ${colorReaction}; font-size: 20px;"></i>
										<span id="spanM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}" style="margin-left: 5px;">${cantReactions}</span>
								</div>
							</div>
							<div style="position: relative;">
									<div id="WindowReactionCommM${dataFeed.commentsData[i].idComentariosFeed}" class="reactionCommM row">
													<span><b>Personas que reaccionaron</b></span>
													<ul id="employeesReactionCommM-1-${dataFeed.commentsData[i].idComentariosFeed}">
															${employeesRLike}
													</ul>
									</div>
							</div>
							<div class="chat-time">${dataFeed.commentsData[i].Registro}</div>
							<br>
					</div>
				</li>`;
      } else {
        contentComments += `
				<li>
						<div class="chat-img"><img src="Archivos/ImgEmpleados/${dataFeed.commentsData[i].ImagenEmpleado}" alt="user"></div>
						<div class="chat-content">
								<div class="box bg-light-info"  style="border-radius: 20px; position: relative;">
									<h6 class="font-medium">${dataFeed.commentsData[i].Nombre}</h6>
									${dataFeed.commentsData[i].Comentario}
									<div class="content-reactionComm hover-actionCmmM" onclick="reactsToCommentM('1', '${dataFeed.commentsData[i].idComentariosFeed}')" data-comment="${dataFeed.commentsData[i].idComentariosFeed}">
											<i id="iconM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}" class="fa fa-thumbs-up" style="color: ${colorReaction}; font-size: 20px;"></i>
											<span id="spanM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}" style="margin-left: 5px;">${cantReactions}</span>
									</div>
								</div>
						</div>

						<div style="position: relative;">
								<div id="WindowReactionCommM${dataFeed.commentsData[i].idComentariosFeed}" class="reactionCommM row">
												<span><b>Personas que reaccionaron</b></span>
												<ul id="employeesReactionCommM-1-${dataFeed.commentsData[i].idComentariosFeed}">
														${employeesRLike}
												</ul>
								</div>
						</div>
						<div class="chat-time">${dataFeed.commentsData[i].Registro}</div>
				</li>`;
      }
    }
  } else {
  }
  if (
    dataFeed.generalData.Tipo == "FIN" ||
    dataFeed.generalData.Tipo == "FED"
  ) {
    if (!!dataFeed.filesData) {
      let arrFiles = dataFeed.filesData.Archivo.split(",");
      arrFiles.forEach((i) => {
        contentImg += `
				<img alt="Image 1 Title" src="/Archivos/Feed/${feed}/${i}"
					data-image="Archivos/Feed/${feed}/${i}"
					data-description="Image 1 Description">
				`;
      });
    }
  } else if (dataFeed.generalData.Tipo == "ANY") {
    contentImg += `
			<img alt="Image 1 Title" src="/Archivos/ImagesAnniversary/ImgAnniversary.jpg"
				data-image="/Archivos/ImagesAnniversary/ImgAnniversary.jpg"
				data-description="Image 1 Description">`;
  } else {
    contentImg += `
			<img alt="Image 1 Title" src="/Archivos/ImagesBirthday/ImgBirthday.png"
				data-image="/Archivos/ImagesBirthday/ImgBirthday.png"
				data-description="Image 1 Description">`;
  }
  modalComments.setContent(`
		<input type="hidden" id="feed_m_selComm"/>
		<div class="row">
			<div class="col s12">
				<h4>${dataFeed.generalData.Titulo}</h4>
				<hr>
			</div>
			<div class="col s12">
				<span>${dataFeed.generalData.Descripcion}</span>
			</div>
			<div class="col s12">
				<div id="gallery" style="display:none;">
					${contentImg}
				</div>
				<hr>
			</div>
			<div class="col s12">
				<div class="comment-container">
				 	<textarea class="commentM-textarea" placeholder="Escribe tu comentario aquí..." id="comment_m_feed"></textarea>
				 	<button class="comment-button" id="btn_m_generateComment">Comentar</button>
			 	</div>
			</div>
			<div class="col s12">
				<div class="" style="min-height:170px;">
						<ul class="chat-list">${contentComments}</ul>
				</div>
			</div>
		</div>
	`);
  modalComments.open();
  setTimeout(function () {
    $("#gallery").unitegallery({
      gallery_skin: "alexis",
      slider_scale_mode: "fit",
      slider_transition: "fade",
      thumb_overlay_color: "#363636",
      strippanel_background_color: "#000c1f",
      slider_enable_fullscreen_button: true,
      theme_panel_position: "bottom",
      slider_enable_zoom_panel: true,
      slider_zoompanel_skin: "",
      slider_zoompanel_align_hor: "right",
      slider_zoompanel_align_vert: "top",
      slider_zoompanel_offset_hor: 12,
      slider_zoompanel_offset_vert: 10,
      slider_enable_progress_indicator: true,
      slider_enable_play_button: true,
    });

    $(".ug-slider-control.ug-button-play.ug-skin-alexis").click();
    $(".ug-slider-control.ug-button-play.ug-skin-alexis").hide();
  }, 1500);
};

$(document).on("mouseenter", ".hover-actionCmm", function () {
  let dataComm = event.target.dataset.comment;
  $("#WindowReactionComm" + dataComm).fadeIn();
});

$(document).on("mouseleave", ".hover-actionCmm", function () {
  $(".reactionComm").fadeOut();
});

$(document).on("mouseenter", ".hover-actionCmmM", function () {
  let dataComm = event.target.dataset.comment;
  $("#WindowReactionCommM" + dataComm).fadeIn();
});

$(document).on("mouseleave", ".hover-actionCmmM", function () {
  $(".reactionCommM").fadeOut();
});

const reactsToComment = async (type, comment) => {
  let dataS = {
    op: "reactsToComment",
    type: type,
    comment: comment,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataS, 1);
  if (ajaxR !== undefined) {
    let element = document.getElementById(
      `employeesReactionComm-1-${dataS.comment}`
    );
    if (element) {
      let cantData = ajaxR.Data.content.length;
      let icon = document.getElementById(
        `icon-${dataS.type}-CommentP-${dataS.comment}`
      );
      let spanCant = document.getElementById(
        `span-${dataS.type}-CommentP-${dataS.comment}`
      );
      if (cantData > 0) {
        if (cantData) {
          if (ajaxR.Data.inReaction) {
            icon.style.color = "#ffc407";
          } else {
            icon.style.color = "black";
          }
        }
        let contentHTML = "";
        for (var i = 0; i < cantData; i++) {
          contentHTML += `
						<li>${ajaxR.Data.content[i].Nombre}</li>
					`;
        }
        element.innerHTML = contentHTML;
      } else {
        icon.style.color = "black";
        element.innerHTML = "<li>Sin registros.</li>";
      }
      spanCant.innerHTML = cantData;
    }
  }
};

const reactsToCommentM = async (type, comment) => {
  let dataS = {
    op: "reactsToComment",
    type: type,
    comment: comment,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataS, 1);
  if (ajaxR !== undefined) {
    let element = document.getElementById(
      `employeesReactionCommM-1-${dataS.comment}`
    );
    if (element) {
      let cantData = ajaxR.Data.content.length;
      let icon = document.getElementById(
        `iconM-${dataS.type}-CommentM-${dataS.comment}`
      );
      let spanCant = document.getElementById(
        `spanM-${dataS.type}-CommentM-${dataS.comment}`
      );
      // console.log(icon);
      // console.log(spanCant);
      if (cantData > 0) {
        if (cantData) {
          if (ajaxR.Data.inReaction) {
            icon.style.color = "#ffc407";
          } else {
            icon.style.color = "black";
          }
        }
        let contentHTML = "";
        for (var i = 0; i < cantData; i++) {
          contentHTML += `
						<li>${ajaxR.Data.content[i].Nombre}</li>
					`;
        }
        element.innerHTML = contentHTML;
      } else {
        icon.style.color = "black";
        element.innerHTML = "<li>Sin registros.</li>";
      }
      spanCant.innerHTML = cantData;
    }
  }
};
