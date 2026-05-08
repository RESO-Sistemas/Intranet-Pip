// DetalleEvaluacion/ex.js
// Detail view for a single evaluation


let t_unfinished_employees;
let currentEvaluation = null;

// Get EV parameter from URL
function getEVParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("EV");
}

// Load evaluation on page load
(async function () {
  const evId = getEVParam();
  if (!evId) {
    showError();
    return;
  }
  await loadEvaluationDetail(evId);
})();

async function loadEvaluationDetail(evId) {
  try {
    const dataSend = {
      op: "getEvaluationById",
      idEvaluacion: evId,
    };
    const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);
    if (ajaxR !== undefined && ajaxR.Resultado === true) {
      currentEvaluation = ajaxR.Data;
      renderDetail(currentEvaluation);
    } else {
      showError();
    }
  } catch (e) {
    console.error("Error loading evaluation detail:", e);
    showError();
  }
}

function showError() {
  document.getElementById("loadingDetail").classList.add("d-none");
  document.getElementById("errorDetail").classList.remove("d-none");
}

function renderDetail(ev) {
  // Hide loading, show content
  document.getElementById("loadingDetail").classList.add("d-none");
  document.getElementById("detailContent").classList.remove("d-none");

  // Page title
  const pageTitleEl = document.getElementById("pageTitle");
  if (pageTitleEl) pageTitleEl.textContent = ev.Titulo;

  // General info
  document.getElementById("detTitulo").textContent = ev.Titulo || "-";
  document.getElementById("detTipo").textContent = ev.TxTipoEvaluacion || "-";
  document.getElementById("detPeriodicidad").textContent = ev.TxPeriodicidad || "-";

  // Dirigido A - resaltado especial
  const dirigidoEl = document.getElementById("detDirigidoA");
  if (ev.TxDirigidoA === "Empleados") {
    dirigidoEl.innerHTML = '<span class="badge-dirigido dirigido-empleados"><span class="material-symbols-outlined" style="vertical-align:middle;font-size:18px;margin-right:4px;">badge</span>Empleados</span>';
  } else if (ev.TxDirigidoA === "Postulantes") {
    dirigidoEl.innerHTML = '<span class="badge-dirigido dirigido-postulantes"><span class="material-symbols-outlined" style="vertical-align:middle;font-size:18px;margin-right:4px;">person_search</span>Postulantes</span>';
  } else {
    dirigidoEl.textContent = ev.TxDirigidoA || "-";
  }

  // Status badge
  const statusEl = document.getElementById("detStatus");
  if (ev.TxStatus === "Activo") {
    statusEl.innerHTML = '<span class="badge-activo">Activo</span>';
  } else {
    statusEl.innerHTML = '<span class="badge-inactivo">Inactivo</span>';
  }

  // Status Activado badge
  const activadoEl = document.getElementById("detStatusActivado");
  if (ev.Activado == 1) {
    activadoEl.innerHTML = '<span class="badge-activado">Evaluación activada</span>';
  } else {
    activadoEl.innerHTML = '<span class="badge-no-activado">Evaluación no activada</span>';
  }

  // Dates
  document.getElementById("detFechaInicio").textContent = ev.FechaInicio || "-";
  document.getElementById("detFechaFin").textContent = ev.FechaFin || "-";
  document.getElementById("detRetroIni").textContent = ev.RetroFechaIni || "No definida";
  document.getElementById("detRetroFin").textContent = ev.RetroFechaFin || "No definida";
  document.getElementById("detPlanAIni").textContent = ev.PlanAFechaIni || "No definida";
  document.getElementById("detPlanAFin").textContent = ev.PlanAFechaFin || "No definida";

  // Progress
  document.getElementById("detRespondidas").textContent = ev.CantRespondidasM || "0";
  document.getElementById("detRestantes").textContent = ev.Restantes || "0";
  document.getElementById("detPreguntasAceptadas").textContent =
    ev.PreguntasAceptadas == 1 ? "Sí" : "No";

  // Render action buttons
  renderActions(ev);
}

function renderActions(ev) {
  const container = document.getElementById("actionsContainer");
  container.innerHTML = "";

  // 1. Ver Evaluados
  if (ev.TipoEvaluacion == 1) {
    if (ev.Activado == 0) {
      container.appendChild(
        createActionBtn(
          "Ver Evaluados",
          "group",
          "btn-primary",
          null,
          true,
          "Evaluación no activada"
        )
      );
    } else {
      container.appendChild(
        createActionBtn("Ver Evaluados", "group", "btn-primary", function () {
          window.location.href = "Evaluados.php?EV=" + ev.idEvaluaciones;
        })
      );
    }
  }

  // 2. Ver Resultados
  if (ev.TipoEvaluacion == 1) {
    if (ev.Activado == 0) {
      container.appendChild(
        createActionBtn(
          "Ver Resultados",
          "donut_large",
          "btn-secondary",
          null,
          true,
          "Evaluación no activada"
        )
      );
    } else {
      container.appendChild(
        createActionBtn("Ver Resultados", "donut_large", "btn-secondary", function () {
          window.location.href = "ResultadosEvaluacion.php?Ev=" + ev.idEvaluaciones;
        })
      );
    }
  }

  // 3. Publicar
  if (ev.ConPreguntas > 0) {
    if (ev.PreguntasAceptadas == 1) {
      if (ev.Activado == 1) {
        container.appendChild(
          createActionBtn(
            "Publicar",
            "send",
            "btn-success",
            null,
            true,
            "Ya publicada"
          )
        );
      } else {
        container.appendChild(
          createActionBtn("Publicar", "send", "btn-success", function () {
            openShareEvaluation(ev.idEvaluaciones);
          })
        );
      }
    } else {
      container.appendChild(
        createActionBtn(
          "Aceptar Preguntas",
          "check",
          "btn-outline-success",
          function () {
            acceptQuestionsDialog(ev.idEvaluaciones);
          }
        )
      );
    }
  } else {
    container.appendChild(
      createActionBtn(
        "Publicar",
        "send",
        "btn-success",
        null,
        true,
        "Sin preguntas"
      )
    );
  }

  // 4. Ver Restantes (if there are remaining)
  if (ev.TipoEvaluacion == 1 && ev.Restantes > 0) {
    container.appendChild(
      createActionBtn(
        "Restantes (" + ev.Restantes + ")",
        "pending_actions",
        "btn-outline-dark",
        function () {
          viewUnfinishedEmployees(ev.idEvaluaciones, ev.Titulo);
        }
      )
    );
  }
}

/**
 * Creates an action button element
 * @param {string} label - Button text
 * @param {string} icon - Material Symbols icon name
 * @param {string} btnClass - Bootstrap button class
 * @param {Function|null} onClick - Click handler (null if disabled)
 * @param {boolean} disabled - Whether button is disabled
 * @param {string} disabledTooltip - Tooltip text when disabled
 */
function createActionBtn(label, icon, btnClass, onClick, disabled, disabledTooltip) {
  const btn = document.createElement("button");
  btn.className = "btn " + btnClass + " action-btn";
  btn.type = "button";

  const iconEl = document.createElement("span");
  iconEl.className = "material-symbols-outlined";
  iconEl.textContent = icon;
  iconEl.style.verticalAlign = "middle";
  iconEl.style.marginRight = "4px";
  iconEl.style.fontSize = "20px";

  btn.appendChild(iconEl);
  btn.appendChild(document.createTextNode(" " + label));

  if (disabled) {
    btn.disabled = true;
    btn.classList.add("disabled");
    btn.style.opacity = "0.6";
    if (disabledTooltip) {
      btn.title = disabledTooltip;
    }
  } else if (onClick) {
    btn.addEventListener("click", onClick);
  }

  return btn;
}

// ============ Action Functions (same logic from ex.js) ============

async function acceptQuestionsDialog(iEvaluation) {
  let dialogR = await dialogConfirmSAlert(
    "¿Desea aceptar las preguntas ingresadas en la evaluación?",
    "Una vez aceptadas, no se podrán modificar o agregar más preguntas a la evaluación.\n Al aceptar las preguntas, se desbloquea la opción para publicar la evaluación."
  );
  if (dialogR) {
    acceptQuestionsEv(iEvaluation);
  }
}

async function acceptQuestionsEv(iEvaluation) {
  let dataSend = {
    op: "acceptQuestionsEv",
    iEvaluation: iEvaluation,
  };
  let ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    // Reload the detail page
    const evId = getEVParam();
    await loadEvaluationDetail(evId);
  }
}

// Función para publicar - diferencia entre 360° y Encuesta Normal
async function openShareEvaluation(evaluation) {
  // Usar currentEvaluation que tiene los datos de la evaluación actual
  const tipoEvaluacion = currentEvaluation ? currentEvaluation.TipoEvaluacion : null;

  console.log("openShareEvaluation - TipoEvaluacion:", tipoEvaluacion);

  if (tipoEvaluacion == 1) {
    // Evaluación 360° - Ir a la página de configuración de evaluadores
    console.log("Redirigiendo a publish-evaluation.php (360°)");
    window.location.href = "publish-evaluation.php?EV=" + evaluation;
  } else {
    // Encuesta Normal (tipo 2) - Publicar directamente sin configurar evaluadores
    console.log("Publicando directamente (Encuesta Normal)");
    let resultDial = await dialogConfirmSAlert(
      "¿Desea publicar esta encuesta?",
      "Al publicar, la encuesta estará disponible para que los participantes la respondan."
    );
    if (resultDial) {
      await publishNormalSurveyDirectly(evaluation);
    }
  }
}

// Función para publicar directamente una Encuesta Normal
async function publishNormalSurveyDirectly(evaluation) {
  let dataSend = {
    op: "acceptPublicationOfTheEvaluation",
    ev: evaluation,
  };

  // Mostrar loader
  $.blockUI({
    message: '<div class="d-flex justify-content-center align-items-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div><span class="ms-2">Publicando encuesta...</span></div>',
    css: {
      border: 'none',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      opacity: .9
    }
  });

  try {
    let respuesta = await $.ajax({
      type: "post",
      url: url_m_Evaluaciones,
      data: dataSend,
      dataType: "json",
      timeout: 30000,
    });

    $.unblockUI();

    if (respuesta && respuesta.Resultado && respuesta.Siguiente) {
      toastr.success(respuesta.Msg || "Encuesta publicada exitosamente.", "¡Completado!");
      // Recargar la página de detalle para reflejar cambios
      setTimeout(function() {
        const evId = getEVParam();
        loadEvaluationDetail(evId);
      }, 1500);
    } else {
      const msg = respuesta && respuesta.Msg ? respuesta.Msg : "No se pudo publicar la encuesta.";
      toastr.warning(msg, "Alerta");
    }
  } catch (e) {
    $.unblockUI();
    console.error("Error al publicar encuesta:", e);
    toastr.error("No se pudo publicar la encuesta. Inténtelo de nuevo.", "Error");
  }
}

async function viewUnfinishedEmployees(ev, t) {
  document.getElementById("evSelectedF").textContent = "Evaluación: " + t;
  const dataSend = {
    op: "viewUnfinishedEmployees",
    evaluation: ev,
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    const modalFaltantes = new bootstrap.Modal(
      document.getElementById("faltantes")
    );
    modalFaltantes.show();

    const dataR = ajaxR.Data;
    if (t_unfinished_employees) {
      t_unfinished_employees.destroy();
    }
    t_unfinished_employees = new ej.grids.Grid({
      dataSource: dataR,
      allowFiltering: true,
      filterSettings: { type: "Menu" },
      allowPaging: true,
      pageSettings: { pageSize: 6 },
      allowTextWrap: true,
      toolbar: ["Search"],
      columns: [
        {
          field: "NoEmpleado",
          headerText: "No Empleado",
          width: 70,
          textAlign: "Center",
          filter: { type: "CheckBox" },
        },
        {
          field: "Nombre",
          headerText: "Empleado",
          width: 100,
          textAlign: "Center",
          filter: { type: "CheckBox" },
        },
        {
          field: "Sucursal",
          headerText: "Sucursal/Departamento",
          width: 80,
          textAlign: "Center",
          filter: { type: "CheckBox" },
        },
        {
          field: "CantEvaluaciones",
          headerText: "Cantidad Evaluaciones",
          width: 80,
          textAlign: "Center",
          filter: { type: "CheckBox" },
        },
        {
          field: "CantRespondidas",
          headerText: "Evaluaciones Respondidas",
          width: 80,
          textAlign: "Center",
          filter: { type: "CheckBox" },
        },
        {
          field: "",
          headerText: "Avance",
          width: 80,
          textAlign: "Center",
          filter: { type: "CheckBox" },
          template: "#t_unfinishedTemplate",
        },
      ],
    });
    t_unfinished_employees.appendTo("#t_unfinished_employees");
  }
}

window.t_unfinishedSF = function (e) {
  let div = document.createElement("div");
  let porcent = (
    (Number(e.CantRespondidas) * 100) /
    Number(e.CantEvaluaciones)
  ).toFixed(2);
  let content =
    '<div class="row">' +
    '<div class="col s12">' +
    '<ul class="m-t-10">' +
    "<li>" +
    '<div class="d-flex no-block align-items-center">' +
    "<div>" +
    '<span class="m-b-0 op-5">Completado</span>' +
    "</div>" +
    '<div class="ml-auto">' +
    '<span class="m-b-0">' +
    porcent +
    "%</span>" +
    "</div>" +
    "</div>" +
    '<div class="progress m-t-10" style="background-color: rgba(0,0,0,.1);">' +
    '<div class="determinate" style="width: ' +
    porcent +
    '%"></div>' +
    "</div>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>";
  $(div).append(content);
  return div.outerHTML;
};

async function updateStatusEvaluacion(accion, evaluacion) {
  // Determinar el nuevo status
  let newStatus = (accion == 1) ? "0" : "1";
  let newStatusTxt = (newStatus === "1") ? "Activo" : "Inactivo";
  let currentStatusTxt = (accion == 1) ? "Activo" : "Inactivo";

  // Confirmar antes de cambiar
  let confirmR = await dialogConfirmSAlert(
    "¿Cambiar status de la evaluación?",
    "El status actual es: " + currentStatusTxt + ".\nSe cambiará a: " + newStatusTxt + "."
  );
  if (!confirmR) return;

  try {
    const response = await $.ajax({
      type: "post",
      url: "Backend/Evaluaciones/App.php",
      data: {
        op: "updateStatusEvaluacion",
        Status: newStatus,
        idEvaluaciones: evaluacion,
      },
    });

    if (response == 1) {
      // Recargar detalle ANTES de mostrar el mensaje
      const evId = getEVParam();
      await loadEvaluationDetail(evId);
      const messageContent =
        '<div class="alert-content">' +
        '<span class="alert-title">Completado!</span>' +
        '<span class="alert-text">Status cambiado a ' + newStatusTxt + '.</span>' +
        "</div>";
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
    } else {
      const messageContent =
        '<div class="alert-content">' +
        '<span class="alert-title">Información!</span>' +
        '<span class="alert-text">Error al actualizar.</span>' +
        "</div>";
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  } catch (e) {
    console.error("Error en updateStatusEvaluacion:", e);
    const messageContent =
      '<div class="alert-content">' +
      '<span class="alert-title">Error!</span>' +
      '<span class="alert-text">No se pudo actualizar el status.</span>' +
      "</div>";
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}
