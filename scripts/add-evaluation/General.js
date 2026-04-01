const title_c = document.getElementById('title_c'),
      inpFechaInicio = document.getElementById('inpFechaInicio'),
      inpFechaFin = document.getElementById('inpFechaFin'),
      inpRetroIni = document.getElementById('inpRetroIni'),
      inpRetroFin = document.getElementById('inpRetroFin'),
      inpPlanAIni = document.getElementById('inpPlanAIni'),
      inpPlanAFin = document.getElementById('inpPlanAFin'),
      tipoEvaluacion = document.getElementById('tipoEvaluacion'),
      periodicidad = document.getElementById('periodicidad'),
      dirigidoA = document.getElementById('dirigidoA'),
      divPeriodicidad = document.getElementById('divPeriodicidad'),
      seccionRetroYPlan = document.getElementById('seccionRetroYPlan');

// Event listener para cambio de tipo de evaluación usando jQuery
$(document).on('change', '#tipoEvaluacion', function() {
  const tipo = $(this).val();
  console.log('Tipo seleccionado:', tipo);
  
  if (tipo === '1') {
    // Evaluación 360 - NO tiene periodicidad
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').removeAttr('required');
    // Hacer campos de retro y plan obligatorios para 360
    $('#inpRetroIni').attr('required', 'required');
    $('#inpRetroFin').attr('required', 'required');
    $('#inpPlanAIni').attr('required', 'required');
    $('#inpPlanAFin').attr('required', 'required');
    // Forzar "Empleados" y quitar la opción Postulantes del DOM
    $('#dirigidoA').val('1');
    if ($('#dirigidoA option[value="2"]').length) {
      window._optPostulantes = $('#dirigidoA option[value="2"]').detach();
    }
  } else if (tipo === '2') {
    // Encuesta Normal - en desarrollo, mostrar modal y resetear
    // Diferir el reset para que el select se limpie visualmente antes del modal
    setTimeout(function() {
      $('#tipoEvaluacion').val('');
    }, 150);
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').removeAttr('required');
    $('#inpRetroIni').removeAttr('required');
    $('#inpRetroFin').removeAttr('required');
    $('#inpPlanAIni').removeAttr('required');
    $('#inpPlanAFin').removeAttr('required');
    // Restaurar opción Postulantes si fue removida
    if (window._optPostulantes && !$('#dirigidoA option[value="2"]').length) {
      $('#dirigidoA').append(window._optPostulantes);
      window._optPostulantes = null;
    }
    // Mostrar modal de en desarrollo
    var modal = new bootstrap.Modal(document.getElementById('modalEnDesarrollo'));
    modal.show();
  } else {
    // Ninguno seleccionado
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').removeAttr('required');
    $('#inpRetroIni').removeAttr('required');
    $('#inpRetroFin').removeAttr('required');
    $('#inpPlanAIni').removeAttr('required');
    $('#inpPlanAFin').removeAttr('required');
    // Restaurar opción Postulantes si fue removida
    if (window._optPostulantes && !$('#dirigidoA option[value="2"]').length) {
      $('#dirigidoA').append(window._optPostulantes);
      window._optPostulantes = null;
    }
  }
});

// Event listener para cambio de "A quien va dirigido"
$(document).on('change', '#dirigidoA', function() {
  const dirigido = $(this).val();
  const tipoActual = $('#tipoEvaluacion').val();
  console.log('Dirigido a:', dirigido);
  
  // Si el tipo es 360, no permitir cambiar a Postulantes
  if (tipoActual === '1' && dirigido !== '1') {
    $('#dirigidoA').val('1');
    toastr.info('La Evaluación 360° solo puede ir dirigida a Empleados', 'Información');
  }
});

// Función para validar fechas
function validateDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche
  
  const maxFutureDate = new Date();
  maxFutureDate.setFullYear(today.getFullYear() + 2); // Máximo 2 años en el futuro
  
  const tipo = tipoEvaluacion.value;
  
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
  
  // Validaciones de retroalimentación y plan de acción (aplican para ambos tipos)
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
  // Validar tipo de evaluación
  if (!tipoEvaluacion.value) {
    toastr.error('Debe seleccionar un tipo de cuestionario', 'Error de validación');
    return;
  }
  
  // Bloquear Encuesta Normal (en desarrollo)
  if (tipoEvaluacion.value === '2') {
    var modal = new bootstrap.Modal(document.getElementById('modalEnDesarrollo'));
    modal.show();
    return;
  }
  
  // Validar dirigido a
  if (!dirigidoA.value) {
    toastr.error('Debe especificar a quién va dirigido el cuestionario', 'Error de validación');
    return;
  }
  
  const resV = await verifyInputs('dv_DataGeneral');
  const resV2 = await verifyInputs('dv_Dates');
  
  // Validar secciones de retro y plan para ambos tipos
  const resV3 = await verifyInputs('seccionRetroYPlan');
  
  // Validar fechas antes de guardar
  if (resV && resV2 && resV3) {
    if (!validateDates()) {
      return; // Detener si las validaciones de fecha fallan
    }
    saveEvaluationNoE();
  }
});

async function saveEvaluationNoE(){
  const tipo = tipoEvaluacion.value;
  
  // Obtener empleados seleccionados
  const empleadosSeleccionados = $('#slctEmpleados').val();
  if (!empleadosSeleccionados || empleadosSeleccionados.length === 0) {
    toastr.error('Debe seleccionar al menos un empleado participante', 'Error de validación');
    return;
  }
  
  const dataSend = {
    op: "saveEvaluationNoE",
    inpTitulo: quitarEspaciosExtras(title_c.value).trim(),
    tipoEvaluacion: tipo,
    dirigidoA: dirigidoA.value,
    periodicidad: tipo === '2' ? periodicidad.value : null,
    inpFechaInicio: inpFechaInicio.value,
    inpFechaFin: inpFechaFin.value,
    inpRetroFechaIni: inpRetroIni.value,
    inpRetroFechaFin: inpRetroFin.value,
    inpPlanAFechaIni: inpPlanAIni.value,
    inpPlanAFechaFin: inpPlanAFin.value,
    empleadosParticipantes: empleadosSeleccionados.join(','),
  };
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxR !== undefined) {
    setTimeout(function () {
      window.location.href="ListadoEvaluaciones.php";
    }, 1500);
  }
}

// ========== SECCIÓN DE SELECCIÓN DE PARTICIPANTES ==========

// Inicializar cuando el documento esté listo
$(document).ready(function() {
  // Mover el modal al body para evitar problemas de stacking context con el framework Neptune
  $('body').append($('#modalEnDesarrollo').detach());

  // Inicializar Select2 para empleados
  $('#slctEmpleados').select2({
    placeholder: 'Seleccione los empleados participantes',
    allowClear: true,
    width: '100%'
  });
  
  // Cargar datos iniciales
  getDivisionesEvaluacion();
  getPuestosEvaluacion();
  getEmpleadosParaEvaluacion();
});

// Cargar divisiones
async function getDivisionesEvaluacion() {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "Backend/Evaluaciones/App.php",
      data: { op: "getDivisionesEvaluacion" }
    });
    
    const result = JSON.parse(response.trim());
    if (result.Resultado && result.Data) {
      $('#slctDivision').html('<option value="">Todas las Divisiones</option>');
      result.Data.forEach(function(div) {
        $('#slctDivision').append(`<option value="${div.IdDivision}">${div.Division}</option>`);
      });
    }
  } catch (error) {
    console.error('Error al cargar divisiones:', error);
  }
}

// Cargar sucursales por división
async function getSucursalesXDivisionEvaluacion(IdDivision) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "Backend/Evaluaciones/App.php",
      data: { 
        op: "getSucursalesXDivisionEvaluacion",
        IdDivision: IdDivision 
      }
    });
    
    const result = JSON.parse(response.trim());
    if (result.Resultado && result.Data) {
      $('#slctSucursal').html('<option value="">Todas las Sucursales</option>');
      result.Data.forEach(function(suc) {
        $('#slctSucursal').append(`<option value="${suc.IdSucursal}">${suc.Sucursal}</option>`);
      });
    }
  } catch (error) {
    console.error('Error al cargar sucursales:', error);
  }
}

// Cargar puestos
async function getPuestosEvaluacion() {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "Backend/Evaluaciones/App.php",
      data: { op: "getPuestosEvaluacion" }
    });
    
    const result = JSON.parse(response.trim());
    if (result.Resultado && result.Data) {
      $('#slctPuesto').html('<option value="">Todos los Puestos</option>');
      result.Data.forEach(function(puesto) {
        $('#slctPuesto').append(`<option value="${puesto.IdPuesto}">${puesto.Puesto}</option>`);
      });
    }
  } catch (error) {
    console.error('Error al cargar puestos:', error);
  }
}

// Cargar empleados filtrados
async function getEmpleadosParaEvaluacion() {
  try {
    const IdDivision = $('#slctDivision').val() || '';
    const IdSucursal = $('#slctSucursal').val() || '';
    const IdPuesto = $('#slctPuesto').val() || '';
    
    const response = await $.ajax({
      type: "POST",
      url: "Backend/Evaluaciones/App.php",
      data: { 
        op: "getEmpleadosParaEvaluacion",
        IdDivision: IdDivision,
        IdSucursal: IdSucursal,
        IdPuesto: IdPuesto
      }
    });
    
    const result = JSON.parse(response.trim());
    if (result.Resultado && result.Data) {
      // Guardar selección actual
      const currentSelection = $('#slctEmpleados').val() || [];
      
      // Limpiar y repoblar
      $('#slctEmpleados').html('');
      result.Data.forEach(function(emp) {
        const selected = currentSelection.includes(emp.NoEmpleado.toString()) ? 'selected' : '';
        $('#slctEmpleados').append(`<option value="${emp.NoEmpleado}" ${selected}>${emp.Nombre} - ${emp.Puesto} (${emp.Sucursal})</option>`);
      });
      
      // Actualizar Select2
      $('#slctEmpleados').trigger('change');
    }
  } catch (error) {
    console.error('Error al cargar empleados:', error);
  }
}

// Event listeners para filtros en cascada
$(document).on('change', '#slctDivision', function() {
  const IdDivision = $(this).val();
  getSucursalesXDivisionEvaluacion(IdDivision);
  getEmpleadosParaEvaluacion();
});

$(document).on('change', '#slctSucursal', function() {
  getEmpleadosParaEvaluacion();
});

$(document).on('change', '#slctPuesto', function() {
  getEmpleadosParaEvaluacion();
});


