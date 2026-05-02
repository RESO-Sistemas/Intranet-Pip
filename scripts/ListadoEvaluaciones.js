ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

const inpTitulo = document.querySelector("#inpTitulo");
const inpFechaInicio = document.querySelector("#inpFechaInicio");
const inpFechaFin = document.querySelector("#inpFechaFin");

let gridEvaluaciones = null;
let evDataMap = {};
let _panelCurrentEv = null;

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
        let TextStatus = row.Status == 1 ? "Activo" : "Inactivo";

        let Acciones = `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button type="button" class="btn btn-primary btn-open-panel" data-id="${row.idEvaluaciones}" title="Ver detalle"><i class="fas fa-eye"></i></button>
            <button type="button" class="btn btn-secondary btn-update-status" data-status="${row.Status}" data-id="${row.idEvaluaciones}" title="Actualizar Status"><i class="fas fa-sync-alt"></i></button>
          </div>`;

        return {
          ...row,
          TextStatus: TextStatus,
          Acciones: Acciones
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
          { field: "Titulo", headerText: "TÍTULO", width: 200 },
          { field: "FechaInicio", headerText: "FECHA INICIO", width: 120 },
          { field: "FechaFin", headerText: "FECHA FIN", width: 120 },
          { field: "TxTipoEvaluacion", headerText: "TIPO", width: 100 },
          { field: "TextStatus", headerText: "STATUS", width: 100 },
          { field: "Acciones", headerText: "ACCIONES", width: 150, textAlign: "Center", disableHtmlEncode: false }
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

            const btnStatus = clickedElement.closest(".btn-update-status");
            if (btnStatus) {
                const status = btnStatus.getAttribute("data-status");
                const id = btnStatus.getAttribute("data-id");
                const idEncoded = btoa(id);
                updateStatusEvaluacion(status, idEncoded);
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
