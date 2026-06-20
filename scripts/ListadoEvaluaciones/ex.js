class DataExcelEvaluators {

  constructor(content) {

    this.content = [];

  }

  addDataEvaluators(data) {

    this.content = data;

  }

  header() {

    return this.content[10];

  }

  rowsEvaluators() {

    return this.content.slice(11, this.content.length);

  }

  firstRow() {

    return this.rowsEvaluators()[0];

  }

  getFinalData() {

    const arrFinalReturn = [];

    const rowsEvaluators = this.rowsEvaluators();

    rowsEvaluators.forEach((row) => {

      arrFinalReturn.push({

        evaluated: row[0],

        evaluator: row[1],

        level_evaluated: row[2],

        type_evaluated: row[3],

      });

    });

    return arrFinalReturn;

  }

  getCantRows() {

    console.log(this.rowsEvaluators().length);

  }

}



const dataExcel = new DataExcelEvaluators();

// let btnDownloadExcel = new ej.buttons.Fab({

//   iconCss:'fas fa-file-excel',

//   content: "Descargar Excel",

// });

// btnDownloadExcel.appendTo('#btnDownloadExcel');

// btnDownloadExcel.element.onclick = function(){

//   window.location.href = "https://klyns.resosistemas.mx/Archivos/Plantillas/PlantillaKlynsEvaluaciones.xlsx";

// }

// btnDownloadExcel.element.setAttribute('download', 'PlantillaKlynsEvaluaciones.xlsx');



let table_Ev,

  t_unfinished_employees,

  loadEvaluators = document.getElementById("uploadFinp");



getListEvaluations();

async function getListEvaluations() {

  const dataSend = {

    op: "getListEvaluations",

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if (ajaxR !== undefined) {

    const dataR = ajaxR.Data;

    printListEvaluations(dataR);

  }

}

function printListEvaluations(data) {
  if ($.fn.DataTable.isDataTable('#table_Ev')) {
    $('#table_Ev').DataTable().clear().destroy();
  }

  $('#table_Ev').DataTable({
    data: data,
    order: [], // Mantiene el orden original por defecto del backend (último creado primero)
    columns: [
      { data: "Titulo" },
      { data: "TxTipoEvaluacion" },
      { data: "TxPeriodicidad" },
      { data: "FechaInicio", width: "10%" },
      { data: "FechaFin", width: "10%" },
      { 
        data: "StatusActivado",
        render: function(data, type, row) {
          return data;
        }
      },
      {
        data: null,
        orderable: false,
        render: function(data, type, row) {
          return `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-accion" title="Ver Detalle"
              onclick="window.location.href='DetalleEvaluacion.php?EV=${encodeURIComponent(row.idEvaluaciones)}'">
              <span class="material-symbols-outlined">visibility</span>
            </button>
          </div>`;
        }
      }
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
    },
    responsive: true,
    pageLength: 10
  });
}



function showStatusHelpModal() {

  // Si ya existe el modal, solo abrirlo

  let existing = document.getElementById("statusHelpModal");

  if (!existing) {

    let modalHTML = `

    <div class="modal fade" id="statusHelpModal" tabindex="-1" aria-labelledby="statusHelpLabel" aria-hidden="true">

      <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

          <div class="modal-header" style="background:#f8f9fa;border-bottom:1px solid #dee2e6;">

            <h5 class="modal-title" id="statusHelpLabel" style="font-weight:600;">

              <span class="material-symbols-outlined" style="vertical-align:middle;margin-right:6px;color:#008837;">info</span>

              ¿Qué significa el Status?

            </h5>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

          </div>

          <div class="modal-body" style="padding:1.5rem;">

            <p style="margin-bottom:1rem;color:#555;">En esta tabla, la columna <strong>Status</strong> indica si la evaluación ha sido <strong>publicada</strong> o no:</p>

            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">

              <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#28a745;"></span>

              <div>

                <strong style="color:#28a745;">Activado</strong>

                <p style="margin:0;font-size:0.9rem;color:#666;">La evaluación ya fue publicada y está disponible para que los evaluadores la contesten.</p>

              </div>

            </div>

            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">

              <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#dc3545;"></span>

              <div>

                <strong style="color:#dc3545;">No Activado</strong>

                <p style="margin:0;font-size:0.9rem;color:#666;">La evaluación aún no ha sido publicada. Debe configurarse y publicarse para que esté disponible.</p>

              </div>

            </div>

            <hr style="margin:1rem 0;">

            <p style="font-size:0.85rem;color:#888;margin:0;">

              <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;margin-right:4px;">lightbulb</span>

              <em>Este status es diferente al de "Activo/Inactivo" que aparece en el detalle, el cual controla si la evaluación está habilitada o deshabilitada en el sistema.</em>

            </p>

          </div>

          <div class="modal-footer" style="border-top:1px solid #dee2e6;">

            <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Entendido</button>

          </div>

        </div>

      </div>

    </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    existing = document.getElementById("statusHelpModal");

  }

  let modal = new bootstrap.Modal(existing);

  modal.show();

}

window.verDetalleSY = function (e) {

  let div = document.createElement("div");

  let btn = document.createElement("a");

  btn.className = "btn btn-sm btn-primary";

  btn.href = "DetalleEvaluacion.php?EV=" + encodeURIComponent(e.idEvaluaciones);

  btn.title = "Ver Detalle";

  let icon = document.createElement("span");

  icon.className = "material-symbols-outlined";

  icon.textContent = "visibility";

  icon.style.verticalAlign = "middle";

  btn.appendChild(icon);

  let text = document.createTextNode(" Detalle");

  btn.appendChild(text);

  div.appendChild(btn);

  return div.outerHTML;

};



window.RemainingSY = function (e) {

  let div = document.createElement("div");

  if (e.Restantes > 0) {

    let btn = document.createElement("button");

    btn.className = "btn btn-outline-dark";

    btn.setAttribute(

      "onclick",

      `viewUnfinishedEmployees('${e.idEvaluaciones}','${e.Titulo}')`

    );

    btn.textContent = e.Restantes;

    div.appendChild(btn);

  } else {

    $(div).append("<span>N/A</span>");

  }

  return div.outerHTML;

};



window.statusDetail = function (e) {

  let div = document.createElement("div");

  let span = document.createElement("span");

  span.textContent = `${e.TxStatus}`;

  if (e.TxStatus === "Activo") {

    span.className = "statustxt e-activecolor";

    div.className = "statustemp e-activecolor";

  } else {

    span.className = "statustxt e-inactivecolor";

    div.className = "statustemp e-inactivecolor";

  }

  div.appendChild(span);

  return div.outerHTML;

};

// window.updateStatusSY = function (e) {

//   let div = document.createElement("div");

//   let btn = document.createElement("button");

//   let iBtn = document.createElement("span");

//   btn.className = "btn btn-outline-info";

//   btn.setAttribute(

//     "onclick",

//     `updateStatusEvaluacion('${e.Status}','${e.idEvaluaciones}')`

//   );

//   iBtn.className = "fas fa-sync-alt";

//   btn.appendChild(iBtn);

//   div.appendChild(btn);

//   return div.outerHTML;

// };

window.updateStatusSY = function (e) {

  let div = document.createElement("div");

  let btn = document.createElement("button");

  let iBtn = document.createElement("span");



  btn.className = "btn btn-outline-info";

  btn.setAttribute(

    "onclick",

    `updateStatusEvaluacion('${e.Status}','${e.idEvaluaciones}')`

  );



  iBtn.className = "material-symbols-outlined";

  iBtn.textContent = "sync"; // ícono que reemplaza a fa-sync-alt



  btn.appendChild(iBtn);

  div.appendChild(btn);

  return div.outerHTML;

};



// window.viewEvSY = function (e) {

//   let div = document.createElement("div");

//   if (e.Activado == 0) {

//     $(div).append('<span class="fas fa-lock"></span>');

//   } else {

//     let btn = document.createElement("button");

//     let iBtn = document.createElement("span");

//     btn.className = "btn btn-primary";

//     btn.setAttribute(

//       "onclick",

//       `window.location.href='Evaluados.php?EV=${e.idEvaluaciones}'`

//     );

//     iBtn.className = "far fa-user-circle";

//     btn.appendChild(iBtn);

//     div.appendChild(btn);

//   }

//   return div.outerHTML;

// };

window.viewEvSY = function (e) {

  let div = document.createElement("div");



  if (e.Activado == 0) {

    $(div).append('<span class="material-symbols-outlined">lock</span>');

  } else {

    let btn = document.createElement("button");

    let iBtn = document.createElement("span");



    btn.className = "btn btn-primary";

    btn.setAttribute(

      "onclick",

      `window.location.href='Evaluados.php?EV=${e.idEvaluaciones}'`

    );



    iBtn.className = "material-symbols-outlined";

    iBtn.textContent = "group"; // ícono de usuarios



    btn.appendChild(iBtn);

    div.appendChild(btn);

  }



  return div.outerHTML;

};



// window.viewResSY = function (e) {

//   let div = document.createElement("div");

//   if (e.Activado == 0) {

//     $(div).append('<span class="fas fa-lock"></span>');

//   } else {

//     let btn = document.createElement("button");

//     let iBtn = document.createElement("span");

//     btn.className = "btn btn-primary";

//     btn.setAttribute(

//       "onclick",

//       `window.location.href='ResultadosEvaluacion.php?Ev=${e.idEvaluaciones}'`

//     );

//     iBtn.className = "fal fa-chart-line";

//     btn.appendChild(iBtn);

//     div.appendChild(btn);

//   }

//   return div.outerHTML;

// };

window.viewResSY = function (e) {

  let div = document.createElement("div");



  if (e.Activado == 0) {

    $(div).append('<span class="material-symbols-outlined">lock</span>');

  } else {

    let btn = document.createElement("button");

    let iBtn = document.createElement("span");



    btn.className = "btn btn-secondary";

    btn.setAttribute(

      "onclick",

      `window.location.href='ResultadosEvaluacion.php?Ev=${e.idEvaluaciones}'`

    );



    iBtn.className = "material-symbols-outlined";

    iBtn.textContent = "donut_large"; // Puedes cambiar a otro icono si prefieres



    btn.appendChild(iBtn);

    div.appendChild(btn);

  }



  return div.outerHTML;

};

window.questsSY = function (e) {

  let div = document.createElement("div");

  if (e.PreguntasAceptadas == 1 || e.Activado == 1) {

    $(div).append('<span class="material-symbols-outlined">lock</span>');

  } else {

    let btn = document.createElement("button");

    let iBtn = document.createElement("span");

    btn.className = "btn btn-outline-warning";

    btn.setAttribute(

      "onclick",

      `window.location.href='questionsEv.php?Ev=${e.idEvaluaciones}'`

    );

    iBtn.className = "material-symbols-outlined";

    iBtn.textContent = "question_mark";

    btn.appendChild(iBtn);

    div.appendChild(btn);

  }

  return div.outerHTML;

};

// window.shareSY = function (e) {

//   let div = document.createElement("div");

//   if (e.ConPreguntas > 0) {

//     let btn = document.createElement("button");

//     if (e.PreguntasAceptadas == 1) {

//       if (e.Activado == 1) {

//         $(div).append('<span class="material-symbols-outlined">lock</span>');

//       } else {

//         let iBtn = document.createElement("span");

//         btn.className = "btn btn-success";

//         // btn.setAttribute("onclick", `window.location.href='publish-evaluation.php'`);

//         btn.setAttribute(

//           "onclick",

//           `openShareEvaluation('${e.idEvaluaciones}')`

//         );

//         iBtn.className = "material-symbols-outlined";

//         iBtn.textContent = "send";

//         btn.appendChild(iBtn);

//         div.appendChild(btn);

//       }

//     } else {

//       btn.className = "btn btn-outline-success";

//       btn.textContent = "check";

//       btn.setAttribute(

//         "onclick",

//         `acceptQuestionsDialog('${e.idEvaluaciones}')`

//       );

//       div.appendChild(btn);

//     }

//   } else {

//     $(div).append("Sin preguntas");

//   }

//   return div.outerHTML;

// };

window.shareSY = function (e) {

  console.log("shareSY - Datos recibidos:", e, "TipoEvaluacion:", e.TipoEvaluacion);

  let div = document.createElement("div");



  if (e.ConPreguntas > 0) {

    let btn = document.createElement("button");



    if (e.PreguntasAceptadas == 1) {

      if (e.Activado == 1) {

        // Icono de candado si ya está activado

        $(div).append('<span class="material-symbols-outlined">lock</span>');

      } else {

        // Botón para compartir evaluación - pasar TipoEvaluacion

        let iBtn = document.createElement("span");

        btn.className = "btn btn-success";

        btn.setAttribute(

          "onclick",

          `openShareEvaluation('${e.idEvaluaciones}', ${e.TipoEvaluacion})`

        );

        iBtn.className = "material-symbols-outlined";

        iBtn.textContent = "send"; // Icono de enviar

        btn.appendChild(iBtn);

        div.appendChild(btn);

      }

    } else {

      // Botón para aceptar preguntas

      let iBtn = document.createElement("span");

      btn.className = "btn btn-outline-success";

      btn.setAttribute(

        "onclick",

        `acceptQuestionsDialog('${e.idEvaluaciones}')`

      );

      iBtn.className = "material-symbols-outlined";

      iBtn.textContent = "check"; // Icono de check

      btn.appendChild(iBtn);

      div.appendChild(btn);

    }

  } else {

    $(div).append("Sin preguntas");

  }



  return div.outerHTML;

};



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

    getListEvaluations();

  }

}



// Función para abrir la configuración de evaluadores o publicar directamente

// tipoEvaluacion: 1 = Evaluación 360°, 2 = Encuesta Normal

async function openShareEvaluation(evaluation, tipoEvaluacion) {

  console.log("openShareEvaluation - evaluation:", evaluation, "tipoEvaluacion:", tipoEvaluacion, "tipo:", typeof tipoEvaluacion);

  

  // Convertir a número para asegurar comparación correcta

  const tipo = parseInt(tipoEvaluacion);

  

  if (tipo === 1) {

    // Evaluación 360° - Ir a la página de configuración de evaluadores

    console.log("Redirigiendo a publish-evaluation.php (360°)");

    window.location.href = `publish-evaluation.php?EV=${evaluation}`;

  } else {

    // Encuesta Normal - Publicar directamente sin configurar evaluadores

    console.log("Publicando directamente (Encuesta Normal)");

    let resultDial = await dialogConfirmSAlert(

      "¿Desea publicar esta encuesta?",

      "Al publicar, la encuesta estará disponible para que los empleados participantes la respondan."

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

      timeout: 60000,

    });

    

    $.unblockUI();

    

    if (respuesta && respuesta.Resultado && respuesta.Siguiente) {

      toastr.success(respuesta.Msg || "Encuesta publicada exitosamente.", "¡Completado!");

      // Recargar la lista de evaluaciones

      getListEvaluations();

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



// async function viewUnfinishedEmployees(ev, t) {

//   evSelectedF.textContent = `Evaluación: ${t}`;

//   const dataSend = {

//     op: "viewUnfinishedEmployees",

//     evaluation: ev,

//   };

//   const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

//   if (ajaxR !== undefined) {

//     $("#faltantes").modal("open");

//     const dataR = ajaxR.Data;

//     if (t_unfinished_employees) {

//       t_unfinished_employees.destroy();

//     }

//     t_unfinished_employees = new ej.grids.Grid({

//       dataSource: dataR,

//       allowFiltering: true,

//       filterSettings: { type: "Menu" },

//       allowPaging: true,

//       pageSettings: { pageSize: 6 },

//       allowTextWrap: true,

//       toolbar: ["Search"],

//       columns: [

//         {

//           field: "NoEmpleado",

//           headerText: "No Empleado",

//           width: 70,

//           textAlign: "Center",

//           filter: { type: "CheckBox" },

//         },

//         {

//           field: "Nombre",

//           headerText: "Empleado",

//           width: 100,

//           textAlign: "Center",

//           filter: { type: "CheckBox" },

//         },

//         {

//           field: "Sucursal",

//           headerText: "Sucursal/Departamento",

//           width: 80,

//           textAlign: "Center",

//           filter: { type: "CheckBox" },

//         },

//         {

//           field: "CantEvaluaciones",

//           headerText: "Cantidad Evaluaciones",

//           width: 80,

//           textAlign: "Center",

//           filter: { type: "CheckBox" },

//         },

//         {

//           field: "CantRespondidas",

//           headerText: "Evaluaciones Respondidas",

//           width: 80,

//           textAlign: "Center",

//           filter: { type: "CheckBox" },

//         },

//         {

//           field: "",

//           headerText: "Avance",

//           width: 80,

//           textAlign: "Center",

//           filter: { type: "CheckBox" },

//           template: "#t_unfinishedTemplate",

//         },

//       ],

//     });

//     t_unfinished_employees.appendTo("#t_unfinished_employees");

//   }

// }

async function viewUnfinishedEmployees(ev, t) {

  evSelectedF.textContent = `Evaluación: ${t}`;

  const dataSend = {

    op: "viewUnfinishedEmployees",

    evaluation: ev,

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    // Mostrar el modal con Bootstrap 5

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

  let content = `

  <div class="row">

    <div class="col s12">

      <ul class="m-t-10">

          <li>

              <div class="d-flex no-block align-items-center">

                  <div>

                      <span class="m-b-0 op-5">Completado</span>

                  </div>

                  <div class="ml-auto">

                      <span class="m-b-0">${porcent}%</span>

                  </div>

              </div>

              <div class="progress m-t-10" style="background-color: rgba(0,0,0,.1);">

                  <div class="determinate" style="width: ${porcent}%"></div>

              </div>

          </li>

      </ul>

    </div>

  </div>`;

  $(div).append(content);

  return div.outerHTML;

};



function updateStatusEvaluacion(accion, evaluacion) {

  let status = "";

  if (accion == 1) {

    status = "0";

  } else {

    status = "1";

  }

  datos = {

    op: "updateStatusEvaluacion",

    Status: status,

    idEvaluaciones: evaluacion,

  };

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

        getListEvaluations();

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

// loadEvaluators element only exists on pages with file upload for evaluators
const loadEvaluatorsEl = document.getElementById('loadEvaluators');
if (loadEvaluatorsEl) {
  loadEvaluatorsEl.addEventListener("change", async function () {
    const contentExcel = await readXlsxFile(loadEvaluatorsEl.files[0]);
    dataExcel.addDataEvaluators(contentExcel);
    console.log(dataExcel);
  });
}

$(document).on("click", "#btnShareEvaluation", async function () {

  if (loadEvaluators.files[0] !== undefined) {

    if (dataExcel.getCantRows() < 1) {

      // toastr.info("El archivo Excel ingresado no cuenta con registros.");

      const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">El archivo Excel ingresado no cuenta con registros..</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    } else {

      alertify.confirm().closeOthers(); //nota: aun no encuentro la funcionalidad.

      const dataSend = {

        op: "shareEvaluation",

        dataEvaluation: JSON.stringify(dataExcel.getFinalData()),

        evaluation: $("#evPerShare").val(),

      };

      const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

      if (ajaxR !== undefined) {

        setTimeout(function () {

          location.reload();

        }, 1500);

      }

      console.log(dataSend);

    }

  } else {

    // toastr.info(

    //   "Ingrese un archivo Excel con los usuarios evaluados y evaluadores para poder continuar"

    // );

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ingrese un archivo Excel con los usuarios evaluados y evaluadores para poder continuar.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

});

