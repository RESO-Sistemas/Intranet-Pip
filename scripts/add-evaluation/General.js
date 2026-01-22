const title_c = document.getElementById('title_c'),
      inpFechaInicio = document.getElementById('inpFechaInicio'),
      inpFechaFin = document.getElementById('inpFechaFin'),
      inpRetroIni = document.getElementById('inpRetroIni'),
      inpRetroFin = document.getElementById('inpRetroFin'),
      inpPlanAIni = document.getElementById('inpPlanAIni'),
      inpPlanAFin = document.getElementById('inpPlanAFin');

$(document).on("click","#btn_SaveData",async function(){
  const resV = await verifyInputs('dv_DataGeneral');
  const resV2 = await verifyInputs('dv_Dates');
  if (resV && resV2) {
    saveEvaluationNoE();
  }
});

async function saveEvaluationNoE(){
  const dataSend = {
    op: "saveEvaluationNoE",
    inpTitulo: quitarEspaciosExtras(title_c.value).trim(),
    inpFechaInicio: inpFechaInicio.value,
    inpFechaFin: inpFechaFin.value,
    inpRetroFechaIni: inpRetroIni.value,
    inpRetroFechaFin: inpRetroFin.value,
    inpPlanAFechaIni: inpPlanAIni.value,
    inpPlanAFechaFin: inpPlanAFin.value,
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    setTimeout(function () {
      window.location.href="ListadoEvaluaciones.php";
    }, 1500);
  }
}
