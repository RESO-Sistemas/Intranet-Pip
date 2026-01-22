getEvaluaciones();
let contenidoFuncionesGraficos = "";
function getEstadisticasEvaluacion (valor) {
  datos = {
    op: "getEstadisticasEvaluacion",
    idEvaluaciones: valor
  }
  $.ajax({
    type: "post",
    url: "Backend/Evaluaciones/App.php",
    data: datos,
    success:function(response){
      $("#ContenidoCalificaciones").html("");
      $("#ContenidoGraficos").html("");
      let contenido ="";
      response = JSON.parse(response.trim());
      console.log(response);
      // let Datos = [];
      // const EvaluadosArr = [];
      let Datos = [];
      let InsertaDatosUnicos = [];
      const EvaluadosArr = response.map(Evaluados => {
           return Datos = {
             "NoEmpleadoEvaluado": Evaluados.NoEmpleadoEvaluado,
             "Nombre": Evaluados.Nombre
           };
      });
      console.log(EvaluadosArr);
      // const EvaluadosUnicos = [];
      const EvaluadosUnicos = removeDuplicates(EvaluadosArr, "NoEmpleadoEvaluado");
      console.log(EvaluadosUnicos);
      let contador = "0";
      EvaluadosUnicos.map(EvUnicos=> {
        let lblCompetencia = [];
        let calificaciones = [];
        contenido += `
        <div class="col s12 l12" style=";margin-top:3vh; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; text-align:center; max-height:auto; max:width:100%; min:width:auto; overflow-x:scroll;
        background: rgb(252,252,252);
        background: linear-gradient(90deg, rgba(252,252,252,1) 0%, rgba(255,255,255,1) 100%);">
          <div class="">
          <h6 style="margin-top:3vh">${EvUnicos.Nombre}</h6>
            <div class="table-responsive contenidobox" style="max-height:40vh;">
              <table class="centered" id="table${EvUnicos.NoEmpleadoEvaluado}" name="table${EvUnicos.NoEmpleadoEvaluado}">
                <thead>
                  <tr>
                    <th class="header">Competencia</th>
                    <th class="header">Calificacion</th>
                  </tr>
                </thead>
                  <tbody>
        `;
        $("#ContenidoGraficos").append(`
          <div class="col s12 l12" id="${EvUnicos.NoEmpleadoEvaluado}" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; margin-top:3vh;max-height:auto; max-height:auto; max:width:100%; min:width:auto; overflow-x:scroll;
          background: rgb(252,252,252);
          background: linear-gradient(90deg, rgba(252,252,252,1) 0%, rgba(255,255,255,1) 100%);">
            <canvas id="grafico${EvUnicos.NoEmpleadoEvaluado}" style="width:100%"></canvas>
          </div>
          `);
        contador ++;
          response.map(DatosEvaluado => {
          if (DatosEvaluado.NoEmpleadoEvaluado == EvUnicos.NoEmpleadoEvaluado) {
            lblCompetencia.push(DatosEvaluado.Competencia);
            calificaciones.push(DatosEvaluado.Calificacion);
            contenido += `
            <tr>
              <td>${DatosEvaluado.Competencia}</td>
              <td>${DatosEvaluado.Calificacion}</td>
            </tr>
            `;
          }
        });
        contenido += `
              </tbody>
            </table>
          </div>
        </div>
      </div>
        `;
        loadGraficos(EvUnicos.NoEmpleadoEvaluado,lblCompetencia,calificaciones,EvUnicos.Nombre);

      });
      $("#ContenidoCalificaciones").append(contenido);
    }
  });
}

function getEvaluaciones () {
  datos = {
    op: "getEvaluacionesRespondidas"
  }
  $.ajax({
    type: "post",
    url: "Backend/Evaluaciones/App.php",
    data: datos,
    success:function(response){
      $("#slctEvaluaciones").append(`
        <option value="" selected disabled> Listado de Evaluaciones </option>
        `);      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctEvaluaciones").append(`
          <option value="${response[i]["idEvaluaciones"]}">${response[i]["Titulo"]}</option>
          `);
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

 function loadGraficos(empleado,lbl,calificaciones,nombreEmp){
   const ctx = document.getElementById("grafico"+empleado);

   new Chart(ctx, {
     type: 'line',
     data: {
       labels: lbl,
       datasets: [{
         label: nombreEmp,
         data: calificaciones,
         borderWidth: 1
       }]
     },
     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   });
 }

 function exportReportToExcel(valor) {
   tabla = document.querySelector("#table"+valor);

   let tableExport = new TableExport(tabla, {
       exportButtons: false, // No queremos botones
       filename: "Mi tabla de Excel", //Nombre del archivo de Excel
       sheetname: "Mi tabla de Excel", //Título de la hoja
   });
   let datos = tableExport.getExportData();
   let preferenciasDocumento = datos.tabla.xlsx;
   tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
}
