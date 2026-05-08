  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

const title_evaluation = document.getElementById("title_evaluation");
let contentEvaluations = [],
  tableList,
  table_evaluated;

loadAllFunctions();
async function loadAllFunctions() {
  await getEvaluacionesDisponibles();
}

async function getEvaluacionesDisponibles() {
  const dataSend = {
    op: "getEvaluacionesDisponibles",
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printEvaluacionesDisponibles(dataR);
  } else {
    let empty = [];
    printEvaluacionesDisponibles(empty);
  }
}
function printEvaluacionesDisponibles(data) {
  if (tableList) {
    tableList.destroy();
  }
  contentEvaluations = data;
  tableList = new ej.grids.Grid({
    dataSource: data,
    allowFiltering: true,
    filterSettings: { type: "Menu" },
    allowPaging: true,
    // selectionSettings: {type: 'Multiple', enableSimpleMultiRowSelection: true},
    toolbar: ["Search"],
    columns: [
      {
        field: "Evaluacion",
        headerText: "Evaluación",
        width: 50,
        filter: { type: "CheckBox" },
      },
      {
        field: "FechaInicio",
        headerText: "Fecha Inicio",
        width: 50,
        filter: { type: "CheckBox" },
      },
      {
        field: "FechaFin",
        headerText: "Fecha Fin",
        width: 50,
        filter: { type: "CheckBox" },
      },
      {
        field: "",
        headerText: "Avance",
        width: 100,
        template: "#mainAdvanceTemplate",
      },
      {
        field: "idEvaluaciones",
        width: 50,
        headerText: "Ver Detalles",
        template: "#viewEvTemplate",
      },
    ],
  });
  tableList.appendTo("#table_listEvaluations");
}
window.viewEvSY = function (e) {
  let div = document.createElement("div");
  let btn = document.createElement("button");

  // Mantiene tu clase personalizada
  btn.className = "btn btn-warning";
  btn.setAttribute("onclick", `viewEvaluated('${e.idEvaluaciones}')`);

  // Ícono Material Symbols
  let icon = document.createElement("span");
  icon.className = "material-symbols-outlined";
  icon.textContent = "info";

  // Armar estructura
  btn.appendChild(icon);
  div.appendChild(btn);
  return div.outerHTML;
};

// window.viewEvSY = function (e) {
//   let div = document.createElement("div");
//   let btn = document.createElement("button");
//   let iBtn = document.createElement("i");
//   btn.className = "btn-actionBlue1";
//   btn.setAttribute("onclick", `viewEvaluated('${e.idEvaluaciones}')`);
//   iBtn.className = "fas fa-info";
//   btn.appendChild(iBtn);
//   div.appendChild(btn);
//   return div.outerHTML;
// };
window.mainAdvanceSF = function (e) {
  let div = document.createElement("div");
  let suma = Object.values(e.Detalle).reduce(function (acumulador, valor) {
    return acumulador + Number(valor.StatusEvaluado);
  }, 0);
  let cantEvaluated = e.Detalle.length;
  let porcent = (suma * 100) / cantEvaluated;
  let contentHTML = `
 <div class="row">
  <div class="col">
    <ul class="mt-2 list-unstyled">
      <li class="d-flex align-items-center justify-content-between">
        <span class="badge bg-success">Completado</span>
        <span>${porcent}%</span>
      </li>
      <li class="mt-2">
        <div class="progress" style="background-color: rgba(0,0,0,.1);">
          <div class="progress-bar bg-success" role="progressbar" style="width: ${porcent}%;" aria-valuenow="${porcent}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </li>
    </ul>
  </div>
</div>
`;
  $(div).append(contentHTML);
  return div.outerHTML;
};

// function viewEvaluated(index) {
//   const posicion = contentEvaluations.findIndex(
//     (elemento) => elemento.idEvaluaciones == index
//   );
//   const dataSel = contentEvaluations[posicion];
//   title_evaluation.textContent = dataSel.Evaluacion;
//   const content = dataSel.Detalle;
//   console.log(content);
//   // table_evaluated.fnClearTable();
//   if (content.length > 0) {
//     if (table_evaluated) {
//       table_evaluated.destroy();
//     }
//     table_evaluated = new ej.grids.Grid({
//       dataSource: content,
//       allowFiltering: true,
//       filterSettings: { type: "Menu" },
//       allowPaging: true,
//       // selectionSettings: {type: 'Multiple', enableSimpleMultiRowSelection: true},
//       toolbar: ["Search"],
//       columns: [
//         {
//           field: "Nombre",
//           headerText: "Empleado Evaluado",
//           width: 100,
//           filter: { type: "CheckBox" },
//         },
//         {
//           field: "Respondidas",
//           headerText: "Respuestas",
//           width: 40,
//           filter: { type: "CheckBox" },
//         },
//         {
//           field: "RelacionEvaluado",
//           headerText: "Tipo Evaluado",
//           width: 50,
//           filter: { type: "CheckBox" },
//         },
//         {
//           field: "StatusRealizado",
//           headerText: "Estado Evaluación",
//           width: 50,
//           allowFiltering: false,
//         },
//         {
//           field: "idEvDetalle",
//           width: 50,
//           headerText: "Ver Detalles",
//           template: "#btnGoEvaluationTemplate",
//           allowFiltering: false,
//         },
//       ],
//     });
//     table_evaluated.appendTo("#table_evaluated");

//     // let color = "";
//     // let btnRe = "";
//     // for (var i = 0; i < content.length; i++) {
//     //   if (content[i]["StatusEvaluado"] == 1) {
//     //     color = "success";
//     //     btnRe = '<h6>Evaluación completada</h6>';
//     //   } else {
//     //     color = "warning";
//     //     btnRe = `<a class="btn-Go" href="Evaluacion.php?EV=${content[i]["idEvDetalle"]}">
//     //                <span>Ir a Evaluación</span>
//     //                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
//     //                    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
//     //                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
//     //                </svg>
//     //            </a>`;
//     //   }
//     //   table_evaluated.fnAddData([
//     //     content[i]["Nombre"],
//     //     content[i]["Respondidas"],
//     //     content[i]["RelacionEvaluado"],
//     //     `<span class="label label-${color}">${content[i]["StatusRealizado"]}</span>`,
//     //     btnRe
//     //   ])
//     // }
//     $("#modal_Evaluated").modal("open");
//   }
// }

function viewEvaluated(index) {
  const posicion = contentEvaluations.findIndex(
    (elemento) => elemento.idEvaluaciones == index
  );
  const dataSel = contentEvaluations[posicion];
  title_evaluation.textContent = dataSel.Evaluacion;
  const content = dataSel.Detalle;
  console.log(content);

  if (content.length > 0) {
    if (table_evaluated) {
      table_evaluated.destroy();
    }
    table_evaluated = new ej.grids.Grid({
      dataSource: content,
      allowFiltering: true,
      filterSettings: { type: "Menu" },
      allowPaging: true,
      toolbar: ["Search"],
      columns: [
        {
          field: "Nombre",
          headerText: "Empleado Evaluado",
          width: 100,
          filter: { type: "CheckBox" },
        },
        {
          field: "Respondidas",
          headerText: "Respuestas",
          width: 40,
          filter: { type: "CheckBox" },
        },
        {
          field: "RelacionEvaluado",
          headerText: "Tipo Evaluado",
          width: 50,
          filter: { type: "CheckBox" },
        },
        {
          field: "StatusRealizado",
          headerText: "Estado Evaluación",
          width: 50,
          allowFiltering: false,
        },
        {
          field: "idEvDetalle",
          width: 50,
          headerText: "Ver Detalles",
          template: "#btnGoEvaluationTemplate",
          allowFiltering: false,
        },
      ],
    });
    table_evaluated.appendTo("#table_evaluated");

    // Mostrar modal
    const modalElement = document.getElementById("modal_Evaluated");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}

// window.btnGoEvaluationSF = function (e) {
//   console.log(e);
//   let div = document.createElement("div");
//   if (e.StatusEvaluado == 1) {
//     div.append("Evaluación completada");
//   } else {
//     let btn = document.createElement("button");
//     let iBtn = document.createElement("i");
//     btn.className = "btn btn-warning";
//     btn.setAttribute(
//       "onclick",
//       `window.location.href="Evaluacion.php?EV=${e.idEvDetalle}"`
//     );
//     iBtn.className = "fas fa-info";
//     btn.appendChild(iBtn);
//     div.appendChild(btn);
//   }
//   return div.outerHTML;
// };

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-go-eval");
  if (btn) {
    const id = btn.dataset.id;
    window.location.href = `Evaluacion.php?EV=${id}`;
  }
});

window.btnGoEvaluationSF = function (e) {
  let div = document.createElement("div");

  if (e.StatusEvaluado == 1) {
    div.innerHTML = `<span class="badge bg-success">Evaluación completada</span>`;
  } else {
    let btn = document.createElement("button");
    btn.className = "btn btn-warning btn-sm btn-go-eval";
    btn.setAttribute("data-id", e.idEvDetalle);

    let spanIcon = document.createElement("span");
    spanIcon.className = "material-symbols-outlined";
    spanIcon.textContent = "info";

    btn.appendChild(spanIcon);
    div.appendChild(btn);
  }

  return div.outerHTML;
};

// window.btnGoEvaluationSF = function (e) {
//   let div = document.createElement("div");

//   if (e.StatusEvaluado == 1) {
//     div.innerHTML = `<span class="badge bg-success">Evaluación completada</span>`;
//   } else {
//     let btn = document.createElement("button");
//     btn.className = "btn btn-warning btn-sm";
//     btn.setAttribute(
//       "onclick",
//       `window.location.href='Evaluacion.php?EV=${e.idEvDetalle}'`
//     );

//     let spanIcon = document.createElement("span");
//     spanIcon.className = "material-symbols-outlined";
//     spanIcon.textContent = "info"; // Este es el ícono

//     btn.appendChild(spanIcon);
//     div.appendChild(btn);
//   }

//   return div.outerHTML;
// };
