const title_c = document.getElementById('title_c'),
      inpFechaInicio = document.getElementById('inpFechaInicio'),
      inpFechaFin = document.getElementById('inpFechaFin'),
      inpRetroIni = document.getElementById('inpRetroIni'),
      inpRetroFin = document.getElementById('inpRetroFin'),
      inpPlanAIni = document.getElementById('inpPlanAIni'),
      inpPlanAFin = document.getElementById('inpPlanAFin');

// Función para validar fechas
function validateDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche
  
  const maxFutureDate = new Date();
  maxFutureDate.setFullYear(today.getFullYear() + 2); // Máximo 2 años en el futuro
  
  // Obtener valores de fechas
  const fechaInicio = inpFechaInicio.value ? new Date(inpFechaInicio.value + 'T00:00:00') : null;
  const fechaFin = inpFechaFin.value ? new Date(inpFechaFin.value + 'T00:00:00') : null;
  const retroIni = inpRetroIni.value ? new Date(inpRetroIni.value + 'T00:00:00') : null;
  const retroFin = inpRetroFin.value ? new Date(inpRetroFin.value + 'T00:00:00') : null;
  const planAIni = inpPlanAIni.value ? new Date(inpPlanAIni.value + 'T00:00:00') : null;
  const planAFin = inpPlanAFin.value ? new Date(inpPlanAFin.value + 'T00:00:00') : null;
  
  // Validación 1: No permitir fechas pasadas para inicio de evaluación
  if (fechaInicio && fechaInicio < today) {
    toastr.error('La fecha de inicio de la evaluación no puede ser anterior a hoy', 'Error de validación');
    return false;
  }
  
  // Validación 2: No permitir fechas muy futuras (más de 2 años)
  if (fechaInicio && fechaInicio > maxFutureDate) {
    toastr.error('La fecha de inicio no puede ser mayor a 2 años en el futuro', 'Error de validación');
    return false;
  }
  
  if (fechaFin && fechaFin > maxFutureDate) {
    toastr.error('La fecha final no puede ser mayor a 2 años en el futuro', 'Error de validación');
    return false;
  }
  
  // Validación 3: Fecha final debe ser mayor que fecha inicial
  if (fechaInicio && fechaFin && fechaFin <= fechaInicio) {
    toastr.error('La fecha final de la evaluación debe ser posterior a la fecha de inicio', 'Error de validación');
    return false;
  }
  
  // Validación 4: Debe haber al menos 1 día entre inicio y fin de evaluación
  if (fechaInicio && fechaFin) {
    const diffTime = fechaFin - fechaInicio;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    if (diffDays < 1) {
      toastr.error('Debe haber al menos 1 día de diferencia entre el inicio y fin de la evaluación', 'Error de validación');
      return false;
    }
  }
  
  // Validación 5: Retroalimentación debe iniciar después o el mismo día que termine la evaluación
  if (fechaFin && retroIni && retroIni < fechaFin) {
    toastr.error('La retroalimentación debe iniciar después de que termine la evaluación', 'Error de validación');
    return false;
  }
  
  // Validación 6: Fecha final de retroalimentación debe ser mayor que inicial
  if (retroIni && retroFin && retroFin <= retroIni) {
    toastr.error('La fecha final de retroalimentación debe ser posterior a la fecha de inicio', 'Error de validación');
    return false;
  }
  
  // Validación 7: Plan de acción debe iniciar después o el mismo día que termine la retroalimentación
  if (retroFin && planAIni && planAIni < retroFin) {
    toastr.error('El plan de acción debe iniciar después de que termine la retroalimentación', 'Error de validación');
    return false;
  }
  
  // Validación 8: Fecha final del plan de acción debe ser mayor que inicial
  if (planAIni && planAFin && planAFin <= planAIni) {
    toastr.error('La fecha final del plan de acción debe ser posterior a la fecha de inicio', 'Error de validación');
    return false;
  }
  
  // Validación 9: Todo el proceso no debe exceder 6 meses desde el inicio
  if (fechaInicio && planAFin) {
    const diffTime = planAFin - fechaInicio;
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);
    if (diffMonths > 6) {
      toastr.warning('El proceso completo (evaluación + retroalimentación + plan de acción) supera los 6 meses. Verifica que las fechas sean correctas.', 'Advertencia');
    }
  }
  
  return true;
}

$(document).on("click","#btn_SaveData",async function(){
  const resV = await verifyInputs('dv_DataGeneral');
  const resV2 = await verifyInputs('dv_Dates');
  
  // Validar fechas antes de guardar
  if (resV && resV2) {
    if (!validateDates()) {
      return; // Detener si las validaciones de fecha fallan
    }
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
