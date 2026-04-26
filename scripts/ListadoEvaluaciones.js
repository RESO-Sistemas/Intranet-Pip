const inpTitulo = document.querySelector("#inpTitulo");
const inpFechaInicio = document.querySelector("#inpFechaInicio");
const inpFechaFin = document.querySelector("#inpFechaFin");

let gridEvaluaciones = null;
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

      let mappedData = response.map(row => {
        let TextStatus = row.Status == 1 ? "Activo" : "Inactivo";
        let Evaluacion = btoa(row.idEvaluaciones);
        
        let Acciones = `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <a type="button" class="btn btn-primary" href="Evaluados.php?EV=${Evaluacion}" title="Evaluados"><i class="far fa-user-circle"></i></a>
            <a type="button" class="btn btn-info" href="ResultadosEvaluacion.php?Ev=${Evaluacion}" title="Resultados"><i class="fal fa-chart-line"></i></a>
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
            const btnStatus = clickedElement.closest(".btn-update-status");
            if (btnStatus) {
                const status = btnStatus.getAttribute("data-status");
                const id = btnStatus.getAttribute("data-id");
                updateStatusEvaluacion(status, id);
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
