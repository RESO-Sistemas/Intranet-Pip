/* ================================================================
   Evaluacion.js — nuevo layout sidebar + contenido
   Sin SmartWizard: navegación propia con estado en memoria
================================================================ */

const myKeysValues = window.location.search;
const urlParams    = new URLSearchParams(myKeysValues);
const Evaluacion   = urlParams.get("EV");

// Estado global de la evaluación
let evData         = [];   // Array de preguntas recibidas del servidor
let evCurrentIndex = 0;    // Índice de la pregunta activa

loadAllFunctions();

async function loadAllFunctions() {
  await getGeneralEvaluacionSel();
  await getDetalleEvaluacionSel();
  hideLoading();
}

/* ---------------------------------------------------------------
   Oculta el spinner y muestra el shell
--------------------------------------------------------------- */
function hideLoading() {
  document.getElementById("ev-loading").style.display  = "none";
  document.getElementById("ev-shell").style.display    = "flex";
}

/* ---------------------------------------------------------------
   Obtiene los datos generales de la evaluación (cabecera)
--------------------------------------------------------------- */
async function getGeneralEvaluacionSel() {
  const dataSend = { op: "getGeneralEvaluacionSel", idEv: Evaluacion };
  const res = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (!res) return;

  const d = res.Data;

  document.getElementById("ev-badge-puesto").innerHTML   = `<i class="fas fa-briefcase"></i> ${d.Puesto ?? "—"}`;
  document.getElementById("ev-badge-empleado").innerHTML = `<i class="fas fa-user"></i> ${d.NombreEmpleado ?? "—"}`;

  // Notifica al padre (pending-evaluations) para actualizar el título del overlay
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "ev-title", title: d.TEvaluacion ?? "Evaluación" }, "*");
  }

  // Guarda la última respuesta para posicionar la primera pregunta sin responder
  window._evUltimaRespuesta = d.UltimaRespuesta ?? null;
  window._evUltimoDec       = d.UltimoDec ?? 0;
}

/* ---------------------------------------------------------------
   Obtiene el detalle de preguntas y renderiza
--------------------------------------------------------------- */
async function getDetalleEvaluacionSel() {
  const dataSend = { op: "getDetalleEvaluacionSel", idEv: Evaluacion };
  const res = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (!res) return;

  evData = res.Data ?? [];

  // Posiciona en la primera pregunta sin responder
  const firstUnanswered = evData.findIndex(q => q.Contestado == 0);
  evCurrentIndex = firstUnanswered >= 0 ? firstUnanswered : 0;

  renderSidebar();
  renderQuestion(evCurrentIndex);
  updateProgress();
  updateNav();
}

/* ---------------------------------------------------------------
   Renderiza el índice lateral de preguntas
--------------------------------------------------------------- */
function renderSidebar() {
  const inner = document.getElementById("ev-sidebar-inner");
  inner.innerHTML = evData.map((q, i) => {
    const isDone   = q.Contestado != 0;
    const isActive = i === evCurrentIndex;

    let cls = "ev-q-item";
    if (isActive) cls += " active";
    else if (isDone) cls += " done";

    const checkIcon = isDone && !isActive
      ? `<i class="fas fa-check ev-q-check"></i>`
      : "";

    // Nombre corto de la competencia para el sidebar
    const label = q.Competencia
      ? (q.Competencia.length > 18 ? q.Competencia.slice(0, 17) + "…" : q.Competencia)
      : `Pregunta ${i + 1}`;

    return `
      <button class="${cls}" onclick="goToQuestion(${i})">
        <span class="ev-q-num">${i + 1}</span>
        <span class="ev-q-label">${label}</span>
        ${checkIcon}
      </button>`;
  }).join("");
}

/* ---------------------------------------------------------------
   Navega a una pregunta específica (guarda antes la actual)
--------------------------------------------------------------- */
async function goToQuestion(index) {
  // Guarda respuesta actual antes de navegar
  if (index !== evCurrentIndex) {
    await saveCurrentQuestion(evCurrentIndex);
  }
  evCurrentIndex = index;
  renderSidebar();
  renderQuestion(index);
  updateProgress();
  updateNav();
  // Scroll al inicio del contenido
  document.getElementById("ev-content").scrollTop = 0;
}

/* ---------------------------------------------------------------
   Renderiza la pregunta activa
--------------------------------------------------------------- */
function renderQuestion(index) {
  const q   = evData[index];
  if (!q) return;

  const container = document.getElementById("ev-q-container");

  let answerHTML = "";

  if (q.idTipoPregunta == 1) {
    // Verdadero / Falso
    const checked = (q.Contestado != 0 && Number(q.RespuestaQ)) ? "checked" : "";
    answerHTML = `
      <div class="ev-switch-wrap">
        <span>Falso</span>
        <div class="form-check form-switch mb-0">
          <input type="checkbox" class="form-check-input trueOrFalse" ${checked} id="ev-inp-tf">
        </div>
        <span>Verdadero</span>
      </div>`;

  } else if (q.idTipoPregunta == 2 || q.idTipoPregunta == 4) {
    // Opciones de selección
    const options = (q.Answers ?? []).map(ans => {
      const checked = (q.Contestado != 0 && Number(q.RespuestaQ) == Number(ans.idPreguntasPosiblesRespuestas))
        ? "checked" : "";
      return `
        <label class="ev-option-label">
          <input type="radio" name="ev-ans-${index}"
            data-answer="${ans.idPreguntasPosiblesRespuestas}" ${checked}>
          <span class="ev-option-pill">${ans.DescripcionRespuesta}</span>
        </label>`;
    }).join("");

    answerHTML = `<div class="ev-options-wrap">${options}</div>`;

  } else if (q.idTipoPregunta == 3) {
    // Rango numérico → slider configurado con los valores de la pregunta (step de 1)
    const ini = Number(q.Config.RangoInicial);
    const fin = Number(q.Config.RangoFinal);
    const val = (q.Contestado != 0 && q.RespuestaQ !== "" && q.RespuestaQ != null)
      ? Number(q.RespuestaQ) : ini;
    answerHTML = `
      <div class="ev-range-wrap">
        <input type="hidden" data-typen="initial" data-range="${ini}" value="${ini}">
        <input type="hidden" data-typen="end" data-ramge="${fin}" value="${fin}">
        <div class="ev-slider-value"><span id="evSliderVal">${val}</span></div>
        <input type="range" class="valueRange ev-slider"
          min="${ini}" max="${fin}" step="1" value="${val}"
          oninput="document.getElementById('evSliderVal').textContent = this.value;">
        <div class="ev-slider-scale">
          <span>${ini}</span>
          <span>${fin}</span>
        </div>
      </div>`;
  }

  container.innerHTML = `
    <div class="ev-q-card" id="contentValues1"
      data-typeq="${q.idTipoPregunta}"
      data-answeres="${q.idRespuestaEvaluaciones}">
      <div class="ev-competencia-badge">
        <i class="fas fa-star"></i> ${q.Competencia ?? "Competencia"}
      </div>
      <p class="ev-q-text">${q.Descripcion ?? ""}</p>
      ${answerHTML}
      <div class="ev-comment-wrap">
        <label><i class="fas fa-comment-alt"></i> Comentarios (opcional)</label>
        <textarea placeholder="Ingresa algún comentario...">${q.Comentarios ?? ""}</textarea>
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   Actualiza la barra de progreso y el contador del sidebar
--------------------------------------------------------------- */
function updateProgress() {
  const total    = evData.length;
  const answered = evData.filter(q => q.Contestado != 0).length;
  const pct      = total > 0 ? Math.round((answered / total) * 100) : 0;

  document.getElementById("ev-hprog-fill").style.width  = pct + "%";
  document.getElementById("ev-hprog-label").textContent = `${answered} / ${total}`;
  document.getElementById("ev-stat-done").textContent   = `${answered} respondidas`;
  document.getElementById("ev-stat-pending").textContent = `${total - answered} pendientes`;

  // Muestra botón Finalizar si todas están contestadas
  const btnFinish = document.getElementById("btn-finish-ev");
  if (answered === total && total > 0 && window._evUltimoDec != 0) {
    btnFinish.style.display = "flex";
  } else {
    btnFinish.style.display = "none";
  }
}

/* ---------------------------------------------------------------
   Actualiza los botones de navegación inferior
--------------------------------------------------------------- */
function updateNav() {
  const total = evData.length;
  document.getElementById("ev-nav-counter").textContent =
    `${evCurrentIndex + 1} / ${total}`;
  document.getElementById("btn-prev").disabled = evCurrentIndex === 0;

  const btnNext = document.getElementById("btn-next");
  if (evCurrentIndex === total - 1) {
    btnNext.innerHTML = `<i class="fas fa-check"></i> Listo`;
  } else {
    btnNext.innerHTML = `Siguiente <i class="fas fa-arrow-right"></i>`;
  }
}

/* ---------------------------------------------------------------
   Navegar: Siguiente
--------------------------------------------------------------- */
async function evNavNext() {
  const valid = await validateAndSave(evCurrentIndex);
  if (!valid) return;

  if (evCurrentIndex < evData.length - 1) {
    evCurrentIndex++;
    renderSidebar();
    renderQuestion(evCurrentIndex);
    updateProgress();
    updateNav();
    document.getElementById("ev-content").scrollTop = 0;
  } else {
    // Última pregunta — finalizar evaluación
    await dialogfinishEvaluationNew();
  }
}

/* ---------------------------------------------------------------
   Navegar: Anterior (sin validación — solo guarda si hay respuesta)
--------------------------------------------------------------- */
async function evNavPrev() {
  await saveCurrentQuestion(evCurrentIndex);
  if (evCurrentIndex > 0) {
    evCurrentIndex--;
    renderSidebar();
    renderQuestion(evCurrentIndex);
    updateProgress();
    updateNav();
    document.getElementById("ev-content").scrollTop = 0;
  }
}

/* ---------------------------------------------------------------
   Valida la pregunta actual y guarda; retorna true si es válida
--------------------------------------------------------------- */
async function validateAndSave(index) {
  const card   = document.querySelector("#ev-q-container [data-typeq]");
  if (!card) return true;

  const typeQ  = card.dataset.typeq;
  const inputs = card.querySelectorAll("input");
  let valid    = false;

  if (typeQ == 1) {
    valid = true; // switch siempre tiene valor
  } else if (typeQ == 2 || typeQ == 4) {
    valid = Array.from(inputs).some(i => i.type === "radio" && i.checked);
  } else if (typeQ == 3) {
    const rangeInputs = card.querySelectorAll("[data-typen]");
    const valueInput  = card.querySelector(".valueRange");
    if (valueInput && rangeInputs.length >= 2) {
      valid = Number(valueInput.value) >= Number(rangeInputs[0].dataset.range ?? rangeInputs[0].value)
           && Number(valueInput.value) <= Number(rangeInputs[1].dataset.ramge ?? rangeInputs[1].value);
    }
  }

  if (!valid) {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Información</span>
        <span class="alert-text">Ingresa una calificación válida para continuar.</span>
      </div>`;
    showBootstrapAlert(messageContent, "top-right", 4000);
    return false;
  }

  await saveCurrentQuestion(index);
  return true;
}

/* ---------------------------------------------------------------
   Guarda la respuesta de la pregunta en el índice dado
--------------------------------------------------------------- */
async function saveCurrentQuestion(index) {
  const card = document.querySelector("#ev-q-container [data-typeq]");
  if (!card) return;

  const typeQ     = card.dataset.typeq;
  const answerRes = card.dataset.answeres;
  const inputs    = card.querySelectorAll("input");
  let value       = "";

  if (typeQ == 1) {
    const cb = card.querySelector(".trueOrFalse");
    value = cb && cb.checked ? 1 : 0;
  } else if (typeQ == 2 || typeQ == 4) {
    for (const inp of inputs) {
      if (inp.checked) { value = inp.dataset.answer; break; }
    }
  } else if (typeQ == 3) {
    const vi = card.querySelector(".valueRange");
    value = vi ? vi.value : "";
  }

  if (value === "" && typeQ != 1) return; // No guardar si no seleccionó nada

  const comment = card.querySelector("textarea")?.value ?? "";

  const dataSend = {
    op:           "saveResultCompetence",
    value:        value,
    response:     answerRes,
    comentarios:  comment,
  };

  return new Promise(resolve => {
    $.ajax({
      type:     "post",
      url:      url_m_Evaluaciones,
      data:     dataSend,
      dataType: "json",
      success:  function (result) {
        // Marca como contestada en memoria
        if (result && evData[index]) {
          evData[index].Contestado  = 1;
          evData[index].RespuestaQ  = value;
          evData[index].Comentarios = comment;
        }
        if (typeof QuitarCargando === "function") QuitarCargando();
        resolve(result);
      },
      error: function (e) {
        if (typeof QuitarCargando === "function") QuitarCargando();
        console.error(e);
        resolve(false);
      },
    });
  });
}

/* ---------------------------------------------------------------
   Diálogo de confirmación y envío final de la evaluación
--------------------------------------------------------------- */
async function dialogfinishEvaluationNew() {
  const valid = await validateAndSave(evCurrentIndex);
  if (!valid) return;

  const confirm = await dialogConfirmSAlert("¿Deseas enviar la evaluación?");
  if (!confirm) return;

  const dataSend = {
    op:         "finishEvaluation",
    value:      "",          // ya guardado paso a paso
    response:   "",
    comentarios:"",
    idResponse: Evaluacion,
  };
  const res = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (res !== undefined) {
    // Notifica al padre (pending-evaluations) para cerrar el offcanvas
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "ev-finished" }, "*");
    } else {
      setTimeout(() => { window.location.href = "pending-evaluations.php"; }, 2000);
    }
  }
}

/* ---------------------------------------------------------------
   Alias para compatibilidad con llamada existente desde el HTML
--------------------------------------------------------------- */
window.dialogfinishEvaluation = dialogfinishEvaluationNew;
