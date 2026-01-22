const contentEvaluaciones = document.querySelector('#contentEvaluaciones');
loadAllFunctions();
async function loadAllFunctions(){
  await getEvaluacionesDisponibles();
}

async function getEvaluacionesDisponibles(){
  const dataSend = {
    op: "getEvaluacionesDisponibles"
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend,0);
  const dataR = ajaxResponse.Data;
  printDetalle(dataR);
}
function printDetalle(dataR){
  if (dataR.length > 0) {
    let tableT = new Tabulator("#contentEvaluaciones",{
      height:"50vh",
      data:dataR,
      layout:"fitColumns",
      resizableColumnFit:true,
      responsiveLayout:"collapse",
      columns:[
        {
          title: "VIEW", field: "idEvaluaciones", formatter:function(cell, formatterParams){
            let thisV = cell.getValue();
            return `<a onclick="viewMoreDetails('${thisV}')"><i class="far fa-plus"></i></a>`
          }
        },
        { title: "Evaluación", field: "Evaluacion"},
        { title: "Fecha Inicio", field: "FechaInicio"},
        { title: "Fecha Fin", field: "FechaFin"},
      ],
      rowFormatter:function(row){
        var holderEl = document.createElement("div");
        var tableEl = document.createElement("div");

        if (row.getData().Detalle.length > 0) {
          holderEl.id = `moreDetails${row.getData().Detalle[0].idEvaluaciones}`;
        }
        holderEl.style.boxSizing = "border-box";
        holderEl.style.padding = "10px 30px 10px 10px";
        holderEl.style.borderTop = "1px solid #333";
        holderEl.style.borderBotom = "1px solid #333";
        holderEl.style.display = "none";
        tableEl.style.border = "1px solid #333";
        holderEl.appendChild(tableEl);
        row.getElement().appendChild(holderEl);
        var subTable = new Tabulator(tableEl, {
           layout:"fitColumns",
           data:row.getData().Detalle,
           columns:[
             {title: "Empleado Evaluado", field: "Nombre"},
             {title: "Respuestas", field: "Respondidas"},
             {title: "Tipo Evaluado", field: "RelacionEvaluado"},
             {title: "Estado Evaluación", field: "StatusRealizado", formatter:function(row,formatterParams){
               let thisData = row.getData();
               let thisValue = row.getValue();
               let color = "";
               if (thisData.StatusEvaluado == 1) {
                 color = "success";
               } else {
                 color = "warning";
               }
               return `<span class="label label-${color}">${thisValue}</span>`;
             }},
             {title: "Realizar Evaluación", field: "idEvDetalle", width:220, formatter:function(row,formatterParams){
               let thisval = row.getValue();
               let thisData = row.getData();
               if (thisData.StatusEvaluado == 1) {
                 return '<h6>Evaluación completada</h6>';
               } else {
                 return `<a class="btn-Go" href="Evaluacion.php?EV=${thisval}">
                            <span>Ir a Evaluación</span>
                            <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                                <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                            </svg>
                        </a>`;
               }
             }},
           ]
       })
      }
    });
  } else {

  }
}

function viewMoreDetails(val){
  const element = document.getElementById(`moreDetails${val}`);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
