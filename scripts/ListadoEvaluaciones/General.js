

ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=')



$(document).on("click","[data-evaluationf]",async function(element){

  viewUnfinishedEmployees(element.target.dataset.evaluationf,element.target.dataset.titulo);

});



$(document).on("click","#RegistrarDatosEv",async function(){

  const dv = "FormInsertaEvaluacion";

  const resultV = await validateDiv(dv);

  if (resultV) {

    const title = "¿Desea generar una nueva evaluación con los datos ingresados?";

    const resultDi = await dialogConfirmSAlert(title);

    if (resultDi) {

      await addEvaluacion();

    }

  }

});

// loadEvaluators element only exists on add-evaluation.php, not on ListadoEvaluaciones.php
const loadEvaluatorsElement = document.getElementById('loadEvaluators');
if (loadEvaluatorsElement) {
  loadEvaluatorsElement.addEventListener("change", async function(){
    const contentExcel = await readXlsxFile(loadEvaluatorsElement.files[0]);
    dataExcel.addDataEvaluators(contentExcel);
  });
}

