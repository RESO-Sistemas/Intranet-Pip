
const inpTitulo = document.querySelector("#inpTitulo");
const inpFechaInicio = document.querySelector("#inpFechaInicio");
const inpFechaFin = document.querySelector("#inpFechaFin");

let gridEvaluaciones = null;
let evDataMap = {};
let _panelCurrentEv = null;

// FEATURE 2 — Estado del wizard en modo edición.
// _evEditId guarda el id (base64) cuando se está editando; null = alta nueva.
let _evEditId = null;
let _evEditPendingParticipants = null;

function shouldHideEvaluationResultTabs(row) {
  if (!row) return false;

  const tipoEvaluacion = String(row.TipoEvaluacion ?? "").trim();
  const dirigidoA = String(row.DirigidoA ?? "").trim();
  const txTipoEvaluacion = String(row.TxTipoEvaluacion ?? "").trim().toLowerCase();
  const txDirigidoA = String(row.TxDirigidoA ?? "").trim().toLowerCase();

  const isEncuestaNormal = tipoEvaluacion === "2" || txTipoEvaluacion.includes("normal");
  const isDirigidaPostulantes = dirigidoA === "2" || txDirigidoA.includes("postulantes");

  return isEncuestaNormal && isDirigidaPostulantes;
}

function setEvaluationPanelTabVisibility(row) {
  const hideResultTabs = shouldHideEvaluationResultTabs(row);
  const tabConfig = [
    {
      buttonId: "ev-tab-evaluados-btn",
      paneId: "ev-tab-evaluados",
      frameId: "evPanelEvaluadosFrame"
    },
    {
      buttonId: "ev-tab-resultados-btn",
      paneId: "ev-tab-resultados",
      frameId: "evPanelResultadosFrame"
    }
  ];

  tabConfig.forEach(({ buttonId, paneId, frameId }) => {
    const button = document.getElementById(buttonId);
    const pane = document.getElementById(paneId);
    const frame = document.getElementById(frameId);
    const tabItem = button ? button.closest("li") : null;

    if (tabItem) {
      tabItem.style.display = hideResultTabs ? "none" : "";
    }

    if (button) {
      button.disabled = hideResultTabs;
      button.setAttribute("aria-hidden", hideResultTabs ? "true" : "false");
    }

    if (pane && hideResultTabs) {
      pane.classList.remove("show", "active");
    }

    if (frame && hideResultTabs) {
      frame.src = "about:blank";
    }
  });

  if (hideResultTabs) {
    const activeHiddenBtn = document.querySelector("#ev-tab-evaluados-btn.active, #ev-tab-resultados-btn.active");
    const overviewBtn = document.getElementById("ev-tab-overview-btn");
    if (activeHiddenBtn && overviewBtn) {
      new bootstrap.Tab(overviewBtn).show();
    }
  }
}

// Lazy-load iframes solo cuando se activa la pestaña
document.addEventListener("DOMContentLoaded", function () {
  const tabMap = {
    "ev-tab-questions-btn":  { frameId: "evPanelQuestionsFrame",  getUrl: ev => `questionsEv.php?Ev=${ev}&embed=1` },
    "ev-tab-evaluados-btn":  { frameId: "evPanelEvaluadosFrame",  getUrl: ev => `Evaluados.php?EV=${ev}&embed=1` },
    "ev-tab-resultados-btn": { frameId: "evPanelResultadosFrame", getUrl: ev => `ResultadosEvaluacion.php?Ev=${ev}&embed=1` },
  };

  Object.entries(tabMap).forEach(([btnId, cfg]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("shown.bs.tab", function () {
      if (!_panelCurrentEv) return;
      const frame = document.getElementById(cfg.frameId);
      const target = cfg.getUrl(_panelCurrentEv);
      if (frame.src !== location.origin + "/" + target && !frame.src.endsWith(target)) {
        frame.src = target;
      }
    });
  });

  // Reset iframes al cerrar el panel
  const panelEl = document.getElementById("evaluationPanel");
  if (panelEl) {
    panelEl.addEventListener("hide.bs.offcanvas", function () {
      ["evPanelOverviewFrame", "evPanelQuestionsFrame", "evPanelEvaluadosFrame", "evPanelResultadosFrame"].forEach(id => {
        const f = document.getElementById(id);
        if (f) f.src = "about:blank";
      });
      _panelCurrentEv = null;
      setEvaluationPanelTabVisibility(null);
      // Volver a pestaña Resumen
      const overviewBtn = document.getElementById("ev-tab-overview-btn");
      if (overviewBtn) new bootstrap.Tab(overviewBtn).show();
    });
  }
});

function openEvaluationPanel(id) {
  const row = evDataMap[id];
  if (!row) return;

  const ev = btoa(row.idEvaluaciones);
  _panelCurrentEv = ev;

  setEvaluationPanelTabVisibility(row);

  document.getElementById("evPanelTitle").textContent = row.Titulo;
  document.getElementById("evPanelMeta").textContent = `ID: ${row.idEvaluaciones}`;

  document.getElementById("evPanelOverviewFrame").src = `DetalleEvaluacion.php?EV=${ev}&embed=1`;

  // Mostrar pestaña Resumen al abrir
  const overviewBtn = document.getElementById("ev-tab-overview-btn");
  if (overviewBtn) new bootstrap.Tab(overviewBtn).show();

  const panelEl = document.getElementById("evaluationPanel");
  const offcanvas = bootstrap.Offcanvas.getInstance(panelEl) || new bootstrap.Offcanvas(panelEl, { backdrop: false, keyboard: true });
  offcanvas.show();
}

getEvaluaciones();

function getEvaluaciones() {
  datos = {
    op: "getEvaluaciones",
  };
  $.ajax({
    type: "POST",
    url: "Backend/Evaluaciones/App.php",
    data: datos,
    dataType: "json",
    success: function (response) {
      if (gridEvaluaciones) {
        gridEvaluaciones.destroy();
      }

      if (typeof response === "string") {
        try {
          response = JSON.parse(response.trim());
        } catch(e) {
          response = [];
        }
      }
      if (!Array.isArray(response)) response = [];

      evDataMap = {};
      let mappedData = response.map(row => {
        evDataMap[row.idEvaluaciones] = row;

        // Badge: Status activo/inactivo
        const badgeStatus = row.Status == 1
          ? `<span class="ev-sbadge green"><span class="material-symbols-outlined">check_circle</span>Activo</span>`
          : `<span class="ev-sbadge red"><span class="material-symbols-outlined">cancel</span>Inactivo</span>`;

        // Badge: Publicada (Activado) o Borrador
        const badgePublicada = row.Activado == 1
          ? `<span class="ev-sbadge blue"><span class="material-symbols-outlined">public</span>Publicada</span>`
          : `<span class="ev-sbadge gray"><span class="material-symbols-outlined">draft</span>Borrador</span>`;

        // Badge: Tipo de evaluación
        const badgeTipo = String(row.TipoEvaluacion) === "1"
          ? `<span class="ev-sbadge purple">360°</span>`
          : `<span class="ev-sbadge gray">Normal</span>`;

        // Badge: Dirigido A
        const badgeDirigido = String(row.DirigidoA) === "1"
          ? `<span class="ev-sbadge emerald"><span class="material-symbols-outlined">badge</span>Empleados</span>`
          : `<span class="ev-sbadge amber"><span class="material-symbols-outlined">person_search</span>Postulantes</span>`;

        // Progreso: respondidas / evaluadores
        const cantEv  = parseInt(row.CantEvaluadores  ?? 0);
        const cantRes = parseInt(row.CantRespondidas   ?? 0);
        const progressCell = `<div class="ev-progress-cell"><span class="material-symbols-outlined">groups</span>${cantRes} / ${cantEv}</div>`;

        const toggleBtn = row.Status == 1
          ? `<button type="button" class="btn-minimal btn-minimal-secondary btn-sm btn-accion btn-toggle-activo" data-status="1" data-id="${row.idEvaluaciones}" title="Desactivar evaluación"><span class="material-symbols-outlined">visibility_off</span></button>`
          : `<button type="button" class="btn-minimal btn-minimal-success btn-sm btn-accion btn-toggle-activo" data-status="0" data-id="${row.idEvaluaciones}" title="Activar evaluación"><span class="material-symbols-outlined">check_circle</span></button>`;

        // Editar: solo habilitado si la evaluación NO está publicada (Activado = 0)
        const editBtn = row.Activado == 1
          ? `<button type="button" class="btn-minimal btn-minimal-secondary btn-sm btn-accion" disabled title="No se puede editar una evaluación publicada"><span class="material-symbols-outlined">edit</span></button>`
          : `<button type="button" class="btn-minimal btn-minimal-warning btn-sm btn-accion btn-editar-ev" data-id="${row.idEvaluaciones}" title="Editar evaluación"><span class="material-symbols-outlined">edit</span></button>`;

        // Configurar evaluadores: solo 360 (tipo 1) en borrador (Activado = 0).
        // Entrada persistente a la matriz, independiente de preguntas/momento de creación.
        const configBtn = (String(row.TipoEvaluacion) === '1' && row.Activado != 1)
          ? `<button type="button" class="btn-minimal btn-minimal-success btn-sm btn-accion btn-config-ev" data-id="${row.idEvaluaciones}" data-titulo="${(row.Titulo || '').replace(/"/g, '&quot;')}" title="Configurar evaluadores"><span class="material-symbols-outlined">groups</span></button>`
          : '';

        let Acciones = `<div class="d-flex justify-content-center gap-2">
            <button type="button" class="btn-minimal btn-minimal-primary btn-sm btn-accion btn-open-panel" data-id="${row.idEvaluaciones}" title="Ver detalle"><span class="material-symbols-outlined">visibility</span></button>
            ${editBtn}
            ${configBtn}
            <button type="button" class="btn-minimal btn-minimal-info btn-sm btn-accion btn-duplicar-ev" data-id="${row.idEvaluaciones}" title="Duplicar evaluación"><span class="material-symbols-outlined">content_copy</span></button>
            ${toggleBtn}
            <button type="button" class="btn-minimal btn-minimal-danger btn-sm btn-accion btn-eliminar-ev" data-id="${row.idEvaluaciones}" title="Eliminar evaluación"><span class="material-symbols-outlined">delete</span></button>
          </div>`;

        return {
          ...row,
          BadgeStatus:    badgeStatus,
          BadgePublicada: badgePublicada,
          BadgeTipo:      badgeTipo,
          BadgeDirigido:  badgeDirigido,
          ProgressCell:   progressCell,
          Acciones:       Acciones
        };
      });

      gridEvaluaciones = new ej.grids.Grid({
        dataSource: mappedData,
        toolbar: ["Search"],
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
            <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
                <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">assignment</span>
            </div>
            <h5 class="text-dark mb-2" style="font-weight: 600;">Sin evaluaciones</h5>
            <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay evaluaciones registradas en el sistema.</p>
          </div>`,
        columns: [
          { field: "Titulo",        headerText: "TÍTULO",      width: 200 },
          { field: "BadgePublicada",headerText: "PUBLICACIÓN", width: 130, textAlign: "Center", disableHtmlEncode: false },
          { field: "BadgeTipo",     headerText: "TIPO",        width: 110, textAlign: "Center", disableHtmlEncode: false },
          { field: "BadgeDirigido", headerText: "DIRIGIDO A",  width: 140, textAlign: "Center", disableHtmlEncode: false },
          { field: "ProgressCell",  headerText: "PROGRESO",    width: 110, textAlign: "Center", disableHtmlEncode: false },
          { field: "BadgeStatus",   headerText: "STATUS",      width: 110, textAlign: "Center", disableHtmlEncode: false },
          { field: "Acciones",      headerText: "ACCIONES",    width: 150, textAlign: "Center", disableHtmlEncode: false }
        ],
        dataBound: function () {
            const gridElement = this.element;
            const toolbar = gridElement.querySelector(".e-toolbar");
            const header = gridElement.querySelector(".e-gridheader");
            const pager = gridElement.querySelector(".e-gridpager");
            const gridContent = gridElement.querySelector(".e-gridcontent");
            if (this.currentViewData.length === 0) {
                if (toolbar) toolbar.style.display = "none";
                if (header) header.style.display = "none";
                if (pager) pager.style.display = "none";
                gridElement.style.border = "none";
                if (gridContent) gridContent.style.border = "none";
            } else {
                if (toolbar) toolbar.style.display = "";
                if (header) header.style.display = "";
                if (pager) pager.style.display = "";
                gridElement.style.border = "";
                if (gridContent) gridContent.style.border = "";
            }
        },
        recordClick: function(args) {
            const clickedElement = args.target;
            if (!clickedElement || typeof clickedElement.closest !== "function") return;

            const btnPanel = clickedElement.closest(".btn-open-panel");
            if (btnPanel) {
                const evId = btnPanel.getAttribute("data-id");
                setTimeout(() => openEvaluationPanel(evId), 0);
                return;
            }

            const btnToggle = clickedElement.closest(".btn-toggle-activo");
            if (btnToggle) {
                const status = btnToggle.getAttribute("data-status");
                const id = btnToggle.getAttribute("data-id");
                const idEncoded = btoa(id);
                updateStatusEvaluacion(status, idEncoded);
                return;
            }

            const btnEliminar = clickedElement.closest(".btn-eliminar-ev");
            if (btnEliminar) {
                const id = btnEliminar.getAttribute("data-id");
                eliminarEvaluacion(btoa(id));
                return;
            }

            const btnDuplicar = clickedElement.closest(".btn-duplicar-ev");
            if (btnDuplicar) {
                const id = btnDuplicar.getAttribute("data-id");
                duplicarEvaluacion(btoa(id));
                return;
            }

            const btnEditar = clickedElement.closest(".btn-editar-ev");
            if (btnEditar) {
                const id = btnEditar.getAttribute("data-id");
                abrirEdicionEvaluacion(btoa(id));
                return;
            }

            const btnConfig = clickedElement.closest(".btn-config-ev");
            if (btnConfig) {
                const id = btnConfig.getAttribute("data-id");
                const titulo = btnConfig.getAttribute("data-titulo") || "";
                if (typeof openPublishWizard === "function") {
                    openPublishWizard(btoa(id), titulo, { canPublish: false });
                }
            }
        },
        created: function () {
            const searchInput = document.getElementById(this.element.id + "_searchbar");
            if (searchInput && !searchInput.hasListener) {
                searchInput.hasListener = true;
                const grid = this;
                searchInput.addEventListener("keyup", function (event) {
                    grid.search(event.target.value);
                });
            }
        }
      });

      gridEvaluaciones.appendTo("#table_Ev");
    }
  });
}

async function eliminarEvaluacion(idEncoded) {
  const result = await Swal.fire({
    title: 'Confirmación de acción',
    html: `<div style="text-align:center">
      <p>Al eliminar la evaluación se perderán todos sus datos.</p>
      <p style="margin-top:15px;"><strong>¿Desea continuar?</strong></p>
    </div>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#008837',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) {
    const msg = `<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La acción fue cancelada.</span></div>`;
    showBootstrapAlert(msg, 'top-right', 5000);
    return;
  }

  try {
    const respuesta = await $.ajax({
      type: 'post',
      url: 'Backend/Evaluaciones/App.php',
      data: { op: 'deleteEvaluacion', idEvaluaciones: idEncoded },
    });

    if (respuesta.trim() === '1') {
      const msg = `<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Evaluación eliminada con éxito.</span></div>`;
      showBootstrapAlertSuc(msg, 'top-right', 5000);
      getEvaluaciones();
    } else {
      const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">No se pudo eliminar: ${respuesta}</span></div>`;
      showBootstrapAlertWar(msg, 'top-right', 5000);
    }
  } catch (e) {
    console.error(e);
    const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">Error al eliminar. Ver consola.</span></div>`;
    showBootstrapAlertWar(msg, 'top-right', 5000);
  }
}

// ============================================================
// FEATURE 1 — Duplicar evaluación
// ============================================================
async function duplicarEvaluacion(idEncoded) {
  const result = await Swal.fire({
    title: 'Duplicar evaluación',
    html: `<div style="text-align:center">
      <p>Se creará una copia como <strong>borrador editable</strong> con sus preguntas y participantes.</p>
      <p style="margin-top:15px;">Podrás ajustar tipo, dirigido a, preguntas y participantes antes de publicarla.</p>
      <p style="margin-top:15px;"><strong>¿Desea continuar?</strong></p>
    </div>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#008837',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Duplicar',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) return;

  const dataSend = {
    op: 'duplicateEvaluation',
    idEvaluaciones: idEncoded,
  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    getEvaluaciones();
    if (ajaxR.NewId) {
      // 360: encadenar a config de evaluadores (la matriz no se clona; se genera
      // fresca desde el organigrama). Encuesta Normal: abrir edición precargada.
      if (String(ajaxR.TipoEvaluacion) === '1' && typeof openPublishWizard === 'function') {
        setTimeout(() => openPublishWizard(ajaxR.NewId, ajaxR.NewTitulo || '', { canPublish: false }), 600);
      } else {
        setTimeout(() => abrirEdicionEvaluacion(ajaxR.NewId), 600);
      }
    }
  }
}

function updateStatusEvaluacion(accion, evaluacion) {
  let Status = "";
  if (accion == 1) {
    Status = "0";
  } else {
    Status = "1";
  }
  datos = {
    op: "updateStatusEvaluacion",
    Status: Status,
    idEvaluaciones: evaluacion,
  };
  console.log(datos);
  $.ajax({
    type: "post",
    url: "Backend/Evaluaciones/App.php",
    data: datos,
    success: function (response) {
      if (response == 1) {
        // toastr.success("Actualizado");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Actualizado.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        setTimeout(function () {
          getEvaluaciones();
        }, 700);
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

$(document).on("click", "#RegistrarDatosEv", async function () {
  const dv = "FormInsertaEvaluacion";
  const resultV = await validateDiv(dv);
  if (resultV) {
    const title =
      "¿Desea generar una nueva evaluación con los datos ingresados?";
    const resultDi = await dialogConfirmSAlert(title);
    if (resultDi) {
      await addEvaluacion();
    }
  }
});

async function addEvaluacion() {
  let dataSend = {
    op: "addEvaluacion",
    inpTitulo: inpTitulo.value,
    inpFechaInicio: inpFechaInicio.value,
    inpFechaFin: inpFechaFin.value,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    getEvaluaciones();
    $("#NuevaEvaluacionModal").modal("close");
  }
}

$(document).on("click", "#btn_open_new", function () {
  const dv = "FormInsertaEvaluacion";
  cleanContenedorInp(dv);
  $("#NuevaEvaluacionModal").modal("open");
});

// ============================================================
// WIZARD NUEVA EVALUACIÓN (MODAL)
// ============================================================

let _evWizardStep = 1;
let _optPostulantesEv = null;

function _evWizardGetSteps() {
  // 360 (tipo 1) y Postulantes no usan el paso de participantes.
  // En 360 la población se define al configurar evaluadores tras crear.
  const sinParticipantes = $('#tipoEvaluacion').val() === '1' || $('#dirigidoA').val() === '2';
  return sinParticipantes ? [1, 3, 4] : [1, 2, 3, 4];
}

function _evWizardGoTo(step) {
  [1, 2, 3, 4].forEach(s => {
    const pane = document.getElementById(`ev-pane-${s}`);
    if (pane) pane.classList.remove('active');

    const node = document.getElementById(`ev-wi-${s}`);
    if (node) {
      node.classList.remove('active', 'completed');
      if (s < step)       node.classList.add('completed');
      else if (s === step) node.classList.add('active');
    }

    const conn = document.getElementById(`ev-wc-${s}`);
    if (conn) conn.classList.toggle('done', s < step);
  });

  const paneEl = document.getElementById(`ev-pane-${step}`);
  if (paneEl) paneEl.classList.add('active');

  _evWizardStep = step;

  if (step === 4) _evWizardPopulateSummary();

  const modalBody = document.querySelector('.ev-modal-body');
  if (modalBody) modalBody.scrollTop = 0;
}

async function evWizardNext() {
  const valid = await _evWizardValidateStep(_evWizardStep);
  if (!valid) return;
  const steps = _evWizardGetSteps();
  const idx = steps.indexOf(_evWizardStep);
  if (idx < steps.length - 1) _evWizardGoTo(steps[idx + 1]);
}

function evWizardPrev() {
  const steps = _evWizardGetSteps();
  const idx = steps.indexOf(_evWizardStep);
  if (idx > 0) _evWizardGoTo(steps[idx - 1]);
}

async function _evWizardValidateStep(step) {
  if (step === 1) {
    if (!$('#tipoEvaluacion').val()) {
      toastr.error('Selecciona un tipo de cuestionario', 'Validación');
      return false;
    }
    if (!$('#dirigidoA').val()) {
      toastr.error('Especifica a quién va dirigido', 'Validación');
      return false;
    }
    if (!$('#title_c').val().trim()) {
      toastr.error('El título del cuestionario es obligatorio', 'Validación');
      return false;
    }
    if ($('#tipoEvaluacion').val() === '2' && !_evIsEvergreen() && !$('#periodicidad').val()) {
      toastr.error('Selecciona una periodicidad para la encuesta normal', 'Validación');
      return false;
    }
    return true;
  }
  if (step === 2) {
    const empleados = $('#slctEmpleados').val();
    if (!empleados || empleados.length === 0) {
      toastr.error('Selecciona al menos un empleado participante', 'Validación');
      return false;
    }
    return true;
  }
  if (step === 3) {
    if (!_evIsEvergreen()) {
      if (!$('#inpFechaInicio').val()) {
        toastr.error('La fecha de inicio es obligatoria', 'Validación');
        return false;
      }
      if (!$('#inpFechaFin').val()) {
        toastr.error('La fecha final es obligatoria', 'Validación');
        return false;
      }
    }
    if ($('#tipoEvaluacion').val() === '1') {
      if (!$('#inpRetroIni').val() || !$('#inpRetroFin').val()) {
        toastr.error('Las fechas de retroalimentación son obligatorias', 'Validación');
        return false;
      }
      if (!$('#inpPlanAIni').val() || !$('#inpPlanAFin').val()) {
        toastr.error('Las fechas del plan de acción son obligatorias', 'Validación');
        return false;
      }
    }
    return _evValidateDates();
  }
  return true;
}

function _evWizardPopulateSummary() {
  const tipo      = $('#tipoEvaluacion option:selected').text();
  const dirigido  = $('#dirigidoA option:selected').text();
  const titulo    = $('#title_c').val() || '—';
  const periText  = $('#periodicidad').val() ? $('#periodicidad option:selected').text() : null;
  const isPost    = $('#dirigidoA').val() === '2';
  const is360     = $('#tipoEvaluacion').val() === '1';
  const evergreen = _evIsEvergreen();

  let empleadosHtml;
  if (is360) {
    empleadosHtml = '<span class="ev-sbadge teal">Se define al configurar evaluadores</span>';
  } else if (isPost) {
    empleadosHtml = '<span class="ev-sbadge teal">Todos los Postulantes</span>';
  } else {
    const sel = $('#slctEmpleados').select2('data');
    const n = sel ? sel.length : 0;
    empleadosHtml = n > 0
      ? `<span class="ev-sbadge" style="background:#D1FAE5;color:#92400E;">${n} empleado${n !== 1 ? 's' : ''} seleccionado${n !== 1 ? 's' : ''}</span>`
      : '<span class="text-muted">—</span>';
  }

  let fechasHtml;
  if (evergreen) {
    fechasHtml = '<span class="ev-sbadge green">Siempre disponible</span>';
  } else {
    const fi = $('#inpFechaInicio').val() || '—';
    const ff = $('#inpFechaFin').val() || '—';
    fechasHtml = `${fi} <i class="fas fa-arrow-right text-muted mx-2" style="font-size:10px"></i> ${ff}`;
  }

  let retroRows = '';
  if (is360) {
    const ri = $('#inpRetroIni').val() || '—', rf = $('#inpRetroFin').val() || '—';
    const pi = $('#inpPlanAIni').val() || '—', pf = $('#inpPlanAFin').val() || '—';
    retroRows = `
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-comments" style="color:#8B5CF6"></i> Retroalimentación</span>
        <span class="ev-summary-value">${ri} <i class="fas fa-arrow-right text-muted mx-1" style="font-size:10px"></i> ${rf}</span>
      </div>
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-tasks" style="color:#008837"></i> Plan de Acción</span>
        <span class="ev-summary-value">${pi} <i class="fas fa-arrow-right text-muted mx-1" style="font-size:10px"></i> ${pf}</span>
      </div>`;
  }

  const periodRow = periText ? `
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-sync-alt" style="color:#008837"></i> Periodicidad</span>
      <span class="ev-summary-value">${periText}</span>
    </div>` : '';

  document.getElementById('ev-summary-content').innerHTML = `
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-clipboard-list" style="color:#4F46E5"></i> Tipo</span>
      <span class="ev-summary-value">${tipo}</span>
    </div>
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-user-tag" style="color:#14B8A6"></i> Dirigido a</span>
      <span class="ev-summary-value">${dirigido}</span>
    </div>
    ${periodRow}
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-tag" style="color:#64748B"></i> Título</span>
      <span class="ev-summary-value fw-semibold">${titulo}</span>
    </div>
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-users" style="color:#10B981"></i> Participantes</span>
      <span class="ev-summary-value">${empleadosHtml}</span>
    </div>
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-calendar" style="color:#EF4444"></i> Evaluación</span>
      <span class="ev-summary-value d-flex align-items-center flex-wrap gap-1">${fechasHtml}</span>
    </div>
    ${retroRows}`;
}

function _evWizardReset() {
  // FEATURE 2 — limpiar estado de edición y restaurar UI de "Nueva Evaluación"
  _evEditId = null;
  _evEditPendingParticipants = null;
  const lbl = document.getElementById('modalNuevaEvLabel');
  if (lbl) lbl.textContent = 'Nueva Evaluación';
  $('#btn_SaveData').html('<i class="fas fa-rocket me-1"></i>Crear Evaluación');

  _evWizardGoTo(1);
  $('#tipoEvaluacion').val('');
  $('#periodicidad').val('');
  $('#dirigidoA').val('');
  $('#title_c').val('');
  $('#inpFechaInicio, #inpFechaFin, #inpRetroIni, #inpRetroFin, #inpPlanAIni, #inpPlanAFin').val('');
  $('#periodicidad').removeAttr('required');
  $('#inpRetroIni, #inpRetroFin, #inpPlanAIni, #inpPlanAFin').removeAttr('required');
  $('#divPeriodicidad').hide();
  $('#seccionRetroYPlan').hide();
  $('#dv_DateFields').show();
  $('#divParticipantes').show();
  $('#dirigidoA').prop('disabled', true);
  $('#periodicidad').prop('disabled', true);
  $('#slctDivision, #slctSucursal, #slctPuesto').val('');
  if ($('#slctEmpleados').hasClass('select2-hidden-accessible')) {
    $('#slctEmpleados').val(null).trigger('change');
  }
  if (_optPostulantesEv && !$('#dirigidoA option[value="2"]').length) {
    $('#dirigidoA').append(_optPostulantesEv);
    _optPostulantesEv = null;
  }
}

// ---- LÓGICA DE FORMULARIO ----

function _evIsEvergreen() {
  return $('#tipoEvaluacion').val() === '2' && $('#dirigidoA').val() === '2';
}

function _evResetParticipants() {
  if ($('#slctEmpleados').hasClass('select2-hidden-accessible')) {
    $('#slctEmpleados').val(null).trigger('change');
  } else {
    $('#slctEmpleados').val([]);
  }
}

function _evResetScheduleFields() {
  $('#periodicidad').val('');
  $('#inpFechaInicio, #inpFechaFin, #inpRetroIni, #inpRetroFin, #inpPlanAIni, #inpPlanAFin').val('');
}

function _evUpdateParticipantVisibility() {
  const ocultar = $('#tipoEvaluacion').val() === '1' || $('#dirigidoA').val() === '2';
  $('#divParticipantes').toggle(!ocultar);
}

function _evUpdateDateVisibility() {
  const tipo = $('#tipoEvaluacion').val();
  const dirigido = $('#dirigidoA').val();

  if (tipo !== '2' || !dirigido) {
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').prop('disabled', true).removeAttr('required');
  } else if (_evIsEvergreen()) {
    $('#dv_DateFields').hide();
    $('#inpFechaInicio, #inpFechaFin').val('').removeAttr('required');
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').prop('disabled', true).removeAttr('required');
  } else if (tipo === '2') {
    $('#dv_DateFields').show();
    $('#inpFechaInicio, #inpFechaFin').attr('required', 'required');
    $('#divPeriodicidad').show();
    $('#periodicidad').prop('disabled', false).attr('required', 'required');
  }

  if (tipo !== '2') {
    $('#dv_DateFields').show();
    $('#inpFechaInicio, #inpFechaFin').attr('required', 'required');
  }
}

function _evValidateDates() {
  const today = new Date(); today.setHours(0,0,0,0);
  const maxDate = new Date(); maxDate.setFullYear(today.getFullYear() + 2);
  const tipo = $('#tipoEvaluacion').val();

  const fi = $('#inpFechaInicio').val() ? new Date($('#inpFechaInicio').val() + 'T00:00:00') : null;
  const ff = $('#inpFechaFin').val()    ? new Date($('#inpFechaFin').val()    + 'T00:00:00') : null;

  if (fi && fi < today) {
    toastr.error('La fecha de inicio no puede ser anterior a hoy', 'Validación');
    return false;
  }
  if ((fi && fi > maxDate) || (ff && ff > maxDate)) {
    toastr.error('Las fechas no pueden superar 2 años en el futuro', 'Validación');
    return false;
  }
  if (fi && ff && ff <= fi) {
    toastr.error('La fecha final debe ser posterior a la fecha de inicio', 'Validación');
    return false;
  }
  if (fi && ff && (ff - fi) / 86400000 < 1) {
    toastr.error('Debe haber al menos 1 día entre inicio y fin de evaluación', 'Validación');
    return false;
  }

  if (tipo === '1') {
    const ri = $('#inpRetroIni').val() ? new Date($('#inpRetroIni').val() + 'T00:00:00') : null;
    const rf = $('#inpRetroFin').val() ? new Date($('#inpRetroFin').val() + 'T00:00:00') : null;
    const pi = $('#inpPlanAIni').val() ? new Date($('#inpPlanAIni').val() + 'T00:00:00') : null;
    const pf = $('#inpPlanAFin').val() ? new Date($('#inpPlanAFin').val() + 'T00:00:00') : null;

    if (ff && ri && ri < ff) {
      toastr.error('La retroalimentación debe iniciar después de que termine la evaluación', 'Validación');
      return false;
    }
    if (ri && rf && rf <= ri) {
      toastr.error('La fecha final de retroalimentación debe ser posterior al inicio', 'Validación');
      return false;
    }
    if (rf && pi && pi < rf) {
      toastr.error('El plan de acción debe iniciar después de que termine la retroalimentación', 'Validación');
      return false;
    }
    if (pi && pf && pf <= pi) {
      toastr.error('La fecha final del plan de acción debe ser posterior al inicio', 'Validación');
      return false;
    }
  }
  return true;
}

// ---- CAMBIOS DE TIPO Y DIRIGIDO ----

$(document).on('change', '#tipoEvaluacion', function () {
  const tipo = $(this).val();
  _evResetScheduleFields();
  _evResetParticipants();

  if (tipo === '1') {
    $('#dirigidoA').prop('disabled', true);
    $('#periodicidad').prop('disabled', true);
    $('#seccionRetroYPlan').show();
    $('#inpRetroIni, #inpRetroFin, #inpPlanAIni, #inpPlanAFin').attr('required', 'required');
    $('#dirigidoA').val('1');
    if ($('#dirigidoA option[value="2"]').length) {
      _optPostulantesEv = $('#dirigidoA option[value="2"]').detach();
    }
  } else if (tipo === '2') {
    $('#dirigidoA').prop('disabled', false).val('');
    $('#periodicidad').prop('disabled', true);
    $('#seccionRetroYPlan').hide();
    $('#inpRetroIni, #inpRetroFin, #inpPlanAIni, #inpPlanAFin').removeAttr('required');
    if (_optPostulantesEv && !$('#dirigidoA option[value="2"]').length) {
      $('#dirigidoA').append(_optPostulantesEv);
      _optPostulantesEv = null;
    }
  } else {
    $('#dirigidoA').prop('disabled', true).val('');
    $('#periodicidad').prop('disabled', true);
    $('#seccionRetroYPlan').hide();
    $('#inpRetroIni, #inpRetroFin, #inpPlanAIni, #inpPlanAFin').removeAttr('required');
    if (_optPostulantesEv && !$('#dirigidoA option[value="2"]').length) {
      $('#dirigidoA').append(_optPostulantesEv);
      _optPostulantesEv = null;
    }
  }

  _evUpdateParticipantVisibility();
  _evUpdateDateVisibility();
});

$(document).on('change', '#dirigidoA', function () {
  const dirigido = $(this).val();
  const tipo = $('#tipoEvaluacion').val();
  if (tipo === '1' && dirigido !== '1') {
    $(this).val('1');
    toastr.info('La Evaluación 360° solo puede ir dirigida a Empleados', 'Información');
    return;
  }

  _evResetScheduleFields();
  _evResetParticipants();
  _evUpdateParticipantVisibility();
  if (tipo === '2') {
    _evUpdateDateVisibility();
  }
});

// ============================================================
// FEATURE 2 — Abrir wizard en MODO EDICIÓN
// ============================================================
async function abrirEdicionEvaluacion(idEncoded) {
  const dataSend = { op: 'getEvaluationForEdit', idEvaluaciones: idEncoded };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR === undefined || !ajaxR.Data) return;

  const header = ajaxR.Data.Header;
  const participants = ajaxR.Data.Participants || [];

  // Bloqueo defensivo en cliente (la validación real es server-side)
  if (String(header.Activado) === '1') {
    toastr.warning('La evaluación ya está publicada y no puede editarse.', 'Aviso');
    return;
  }

  _evEditId = idEncoded;
  _evEditPendingParticipants = participants.map(p => String(p));

  // Ajustar UI del modal a modo edición
  document.getElementById('modalNuevaEvLabel').textContent = 'Editar Evaluación';
  $('#btn_SaveData').html('<i class="fas fa-save me-1"></i>Guardar cambios');

  // Abrir el modal (dispara shown.bs.modal -> inicializa select2 y carga empleados)
  const modalEl = document.getElementById('modalNuevaEvaluacion');
  // El bootstrap.min.js de neptune es < 5.1 y no expone getOrCreateInstance.
  // Patrón del repo: reusar instancia existente o crear una nueva.
  const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  bsModal.show();

  // Precargar campos una vez visible el modal.
  // Se ejecuta DESPUÉS del handler persistente shown.bs.modal (que inicializa
  // select2 y carga empleados), por lo que aquí cambiamos tipo/dirigido (que
  // limpian participantes y fechas) y luego recargamos los participantes
  // guardados y asignamos las fechas.
  $(modalEl).one('shown.bs.modal', function () {
    // Tipo dispara su listener (habilita/deshabilita dirigidoA, fija reglas 360°, etc.)
    $('#tipoEvaluacion').val(String(header.TipoEvaluacion)).trigger('change');
    // dirigidoA puede haber quedado fijado por el listener de tipo; reasignar
    $('#dirigidoA').val(String(header.DirigidoA)).trigger('change');
    $('#title_c').val(header.Titulo || '');

    if (header.Periodicidad !== null && header.Periodicidad !== undefined && String(header.Periodicidad) !== '') {
      $('#periodicidad').val(String(header.Periodicidad));
    }

    // Fechas (pueden venir nulas). Se asignan después de los triggers anteriores
    // porque esos listeners limpian los campos de fecha.
    $('#inpFechaInicio').val(header.FechaInicio || '');
    $('#inpFechaFin').val(header.FechaFin || '');
    $('#inpRetroIni').val(header.RetroFechaIni || '');
    $('#inpRetroFin').val(header.RetroFechaFin || '');
    $('#inpPlanAIni').val(header.PlanAFechaIni || '');
    $('#inpPlanAFin').val(header.PlanAFechaFin || '');

    _evUpdateParticipantVisibility();
    _evUpdateDateVisibility();

    // Recargar participantes guardados (los triggers de tipo/dirigido los limpiaron).
    if (String(header.DirigidoA) !== '2') {
      _evEditPendingParticipants = participants.map(p => String(p));
      getEmpleadosParaEvaluacion();
    }

    _evWizardGoTo(1);
  });
}

// ---- GUARDAR ----

$(document).on('click', '#btn_SaveData', async function () {
  const tipo    = $('#tipoEvaluacion').val();
  const dirigido = $('#dirigidoA').val();
  const titulo  = $('#title_c').val().trim();

  if (!tipo || !dirigido || !titulo) {
    toastr.error('Faltan datos requeridos', 'Error');
    return;
  }
  if (!_evValidateDates()) return;

  const empleados = $('#slctEmpleados').val();
  // 360 (tipo 1) no usa participantes aquí: se definen al configurar evaluadores.
  const requiereParticipantes = dirigido !== '2' && tipo !== '1';
  if (requiereParticipantes && (!empleados || empleados.length === 0)) {
    toastr.error('Debe seleccionar al menos un empleado participante', 'Error');
    return;
  }

  const empleadosCsv = empleados ? empleados.join(',') : '';
  const camposEv = {
    inpTitulo:          quitarEspaciosExtras(titulo),
    tipoEvaluacion:     tipo,
    dirigidoA:          dirigido,
    periodicidad:       tipo === '2' && !_evIsEvergreen() ? $('#periodicidad').val() : null,
    inpFechaInicio:     _evIsEvergreen() ? null : $('#inpFechaInicio').val(),
    inpFechaFin:        _evIsEvergreen() ? null : $('#inpFechaFin').val(),
    inpRetroFechaIni:   tipo === '1' ? $('#inpRetroIni').val() : null,
    inpRetroFechaFin:   tipo === '1' ? $('#inpRetroFin').val() : null,
    inpPlanAFechaIni:   tipo === '1' ? $('#inpPlanAIni').val() : null,
    inpPlanAFechaFin:   tipo === '1' ? $('#inpPlanAFin').val() : null,
  };

  // FEATURE 2 — Modo edición vs alta nueva
  if (_evEditId) {
    // 1) Actualizar encabezado
    const headerR = await pAjaxAsync('Backend/Evaluaciones/App.php', {
      op: 'updateEvaluationHeader',
      idEvaluaciones: _evEditId,
      ...camposEv,
    }, 1);
    if (headerR === undefined) return;

    // 2) Actualizar participantes (solo encuestas normales a empleados;
    //    360 y postulantes no manejan participantes en este paso)
    if (requiereParticipantes) {
      await pAjaxAsync('Backend/Evaluaciones/App.php', {
        op: 'updateEvaluationParticipants',
        idEvaluaciones: _evEditId,
        empleadosParticipantes: empleadosCsv,
      }, 1);
    }

    const modalEl = document.getElementById('modalNuevaEvaluacion');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();
    setTimeout(() => { getEvaluaciones(); _evWizardReset(); }, 400);
    return;
  }

  // Alta nueva
  const dataSend = {
    op: 'saveEvaluationNoE',
    ...camposEv,
    empleadosParticipantes: empleadosCsv,
  };

  const ajaxR = await pAjaxAsync('Backend/Evaluaciones/App.php', dataSend, 1);
  if (ajaxR !== undefined) {
    const modalEl = document.getElementById('modalNuevaEvaluacion');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();

    // 360: encadenar a la configuración de evaluadores. El commit (publicar)
    // sigue gated por preguntas aceptadas y se hace luego desde el detalle.
    if (tipo === '1' && ajaxR.idEvaluaciones && typeof openPublishWizard === 'function') {
      const nuevoId = ajaxR.idEvaluaciones;
      const tituloEv = quitarEspaciosExtras(titulo);
      setTimeout(() => {
        getEvaluaciones();
        _evWizardReset();
        openPublishWizard(nuevoId, tituloEv, { canPublish: false });
      }, 450);
    } else {
      setTimeout(() => { getEvaluaciones(); _evWizardReset(); }, 400);
    }
  }
});

// ---- PARTICIPANTES ----

async function getDivisionesEvaluacion() {
  try {
    const res = await $.ajax({ type: 'POST', url: 'Backend/Evaluaciones/App.php', data: { op: 'getDivisionesEvaluacion' } });
    const r = JSON.parse(res.trim());
    if (r.Resultado && r.Data) {
      $('#slctDivision').html('<option value="">Todas las Divisiones</option>');
      r.Data.forEach(d => $('#slctDivision').append(`<option value="${d.IdDivision}">${d.Division}</option>`));
    }
  } catch(e) { console.error('getDivisionesEvaluacion:', e); }
}

async function getSucursalesXDivisionEvaluacion(IdDivision) {
  try {
    const res = await $.ajax({ type: 'POST', url: 'Backend/Evaluaciones/App.php', data: { op: 'getSucursalesXDivisionEvaluacion', IdDivision } });
    const r = JSON.parse(res.trim());
    if (r.Resultado && r.Data) {
      $('#slctSucursal').html('<option value="">Todas las Sucursales</option>');
      r.Data.forEach(s => $('#slctSucursal').append(`<option value="${s.IdSucursal}">${s.Sucursal}</option>`));
    }
  } catch(e) { console.error('getSucursalesXDivisionEvaluacion:', e); }
}

async function getPuestosEvaluacion() {
  try {
    const res = await $.ajax({ type: 'POST', url: 'Backend/Evaluaciones/App.php', data: { op: 'getPuestosEvaluacion' } });
    const r = JSON.parse(res.trim());
    if (r.Resultado && r.Data) {
      $('#slctPuesto').html('<option value="">Todos los Puestos</option>');
      r.Data.forEach(p => $('#slctPuesto').append(`<option value="${p.IdPuesto}">${p.Puesto}</option>`));
    }
  } catch(e) { console.error('getPuestosEvaluacion:', e); }
}

async function getEmpleadosParaEvaluacion() {
  try {
    const res = await $.ajax({
      type: 'POST', url: 'Backend/Evaluaciones/App.php',
      data: { op: 'getEmpleadosParaEvaluacion', IdDivision: $('#slctDivision').val() || '', IdSucursal: $('#slctSucursal').val() || '', IdPuesto: $('#slctPuesto').val() || '' }
    });
    const r = JSON.parse(res.trim());
    if (r.Resultado && r.Data) {
      // En modo edición, precargar los participantes guardados la primera vez.
      let current = $('#slctEmpleados').val() || [];
      if (_evEditPendingParticipants && _evEditPendingParticipants.length) {
        current = _evEditPendingParticipants;
        _evEditPendingParticipants = null;
      }
      $('#slctEmpleados').html('');
      r.Data.forEach(emp => {
        const sel = current.includes(emp.NoEmpleado.toString()) ? 'selected' : '';
        $('#slctEmpleados').append(`<option value="${emp.NoEmpleado}" ${sel}>${emp.Nombre} - ${emp.Puesto} (${emp.Sucursal})</option>`);
      });
      $('#slctEmpleados').trigger('change');
    }
  } catch(e) { console.error('getEmpleadosParaEvaluacion:', e); }
}

$(document).on('change', '#slctDivision', function () {
  getSucursalesXDivisionEvaluacion($(this).val());
  getEmpleadosParaEvaluacion();
});
$(document).on('change', '#slctSucursal', getEmpleadosParaEvaluacion);
$(document).on('change', '#slctPuesto',   getEmpleadosParaEvaluacion);

// ---- MODAL EVENTS ----

$('#modalNuevaEvaluacion').on('shown.bs.modal', function () {
  if (!$('#slctEmpleados').hasClass('select2-hidden-accessible')) {
    $('#slctEmpleados').select2({
      placeholder: 'Seleccione los empleados participantes',
      allowClear: true,
      width: '100%',
      dropdownParent: $('#modalNuevaEvaluacion')
    });
  }
  getDivisionesEvaluacion();
  getPuestosEvaluacion();
  getEmpleadosParaEvaluacion();
});

$('#modalNuevaEvaluacion').on('hidden.bs.modal', function () {
  _evWizardReset();
});
