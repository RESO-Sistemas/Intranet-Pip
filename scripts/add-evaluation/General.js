// ========== WIZARD MULTI-PASO ==========

let _evWizardStep = 1;

function _evWizardGetSteps() {
  return $('#dirigidoA').val() === '2' ? [1, 3, 4] : [1, 2, 3, 4];
}

function _evWizardGoTo(step) {
  [1, 2, 3, 4].forEach(s => {
    const pane = document.getElementById(`ev-pane-${s}`);
    if (pane) pane.classList.remove('active');

    const node = document.getElementById(`ev-wi-${s}`);
    if (node) {
      node.classList.remove('active', 'completed');
      if (s < step)      node.classList.add('completed');
      else if (s === step) node.classList.add('active');
    }

    const conn = document.getElementById(`ev-wc-${s}`);
    if (conn) conn.classList.toggle('done', s < step);
  });

  const paneEl = document.getElementById(`ev-pane-${step}`);
  if (paneEl) paneEl.classList.add('active');

  _evWizardStep = step;

  if (step === 4) _evWizardPopulateSummary();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function evWizardNext() {
  const valid = await _evWizardValidateStep(_evWizardStep);
  if (!valid) return;

  const steps = _evWizardGetSteps();
  const idx = steps.indexOf(_evWizardStep);
  if (idx < steps.length - 1) _evWizardGoTo(steps[idx + 1]);
}

function evWizardPrev() {
  const steps = _evWizardGetSteps();
  const idx = steps.indexOf(_evWizardStep);
  if (idx > 0) _evWizardGoTo(steps[idx - 1]);
}

async function _evWizardValidateStep(step) {
  if (step === 1) {
    if (!$('#tipoEvaluacion').val()) {
      toastr.error('Selecciona un tipo de cuestionario', 'Validación');
      return false;
    }
    if (!$('#dirigidoA').val()) {
      toastr.error('Especifica a quién va dirigido', 'Validación');
      return false;
    }
    if (!$('#title_c').val().trim()) {
      toastr.error('El título del cuestionario es obligatorio', 'Validación');
      return false;
    }
    if ($('#tipoEvaluacion').val() === '2' && !isEvergreen() && !$('#periodicidad').val()) {
      toastr.error('Selecciona una periodicidad para la encuesta normal', 'Validación');
      return false;
    }
    return true;
  }

  if (step === 2) {
    const empleados = $('#slctEmpleados').val();
    if (!empleados || empleados.length === 0) {
      toastr.error('Selecciona al menos un empleado participante', 'Validación');
      return false;
    }
    return true;
  }

  if (step === 3) {
    if (!isEvergreen()) {
      if (!$('#inpFechaInicio').val()) {
        toastr.error('La fecha de inicio es obligatoria', 'Validación');
        return false;
      }
      if (!$('#inpFechaFin').val()) {
        toastr.error('La fecha final es obligatoria', 'Validación');
        return false;
      }
    }
    if ($('#tipoEvaluacion').val() === '1') {
      if (!$('#inpRetroIni').val() || !$('#inpRetroFin').val()) {
        toastr.error('Las fechas de retroalimentación son obligatorias', 'Validación');
        return false;
      }
      if (!$('#inpPlanAIni').val() || !$('#inpPlanAFin').val()) {
        toastr.error('Las fechas del plan de acción son obligatorias', 'Validación');
        return false;
      }
    }
    return validateDates();
  }

  return true;
}

function _evWizardPopulateSummary() {
  const tipo       = $('#tipoEvaluacion option:selected').text();
  const dirigido   = $('#dirigidoA option:selected').text();
  const titulo     = $('#title_c').val() || '—';
  const periText   = $('#periodicidad').val() ? $('#periodicidad option:selected').text() : null;
  const isPost     = $('#dirigidoA').val() === '2';
  const is360      = $('#tipoEvaluacion').val() === '1';
  const evergreen  = isEvergreen();

  let empleadosHtml;
  if (isPost) {
    empleadosHtml = '<span class="ev-summary-badge teal">Todos los Postulantes</span>';
  } else {
    const sel = $('#slctEmpleados').select2('data');
    const n = sel ? sel.length : 0;
    empleadosHtml = n > 0
      ? `<span class="ev-summary-badge indigo">${n} empleado${n !== 1 ? 's' : ''} seleccionado${n !== 1 ? 's' : ''}</span>`
      : '<span class="text-muted">—</span>';
  }

  let fechasHtml;
  if (evergreen) {
    fechasHtml = '<span class="ev-summary-badge green">Siempre disponible</span>';
  } else {
    const fi = $('#inpFechaInicio').val() || '—';
    const ff = $('#inpFechaFin').val() || '—';
    fechasHtml = `${fi} <i class="fas fa-arrow-right text-muted mx-2" style="font-size:11px"></i> ${ff}`;
  }

  let retroRows = '';
  if (is360) {
    const ri = $('#inpRetroIni').val() || '—', rf = $('#inpRetroFin').val() || '—';
    const pi = $('#inpPlanAIni').val() || '—', pf = $('#inpPlanAFin').val() || '—';
    retroRows = `
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-comments" style="color:#8B5CF6"></i> Retroalimentación</span>
        <span class="ev-summary-value">${ri} <i class="fas fa-arrow-right text-muted mx-2" style="font-size:11px"></i> ${rf}</span>
      </div>
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-tasks" style="color:#F59E0B"></i> Plan de Acción</span>
        <span class="ev-summary-value">${pi} <i class="fas fa-arrow-right text-muted mx-2" style="font-size:11px"></i> ${pf}</span>
      </div>`;
  }

  const periodRow = periText ? `
    <div class="ev-summary-row">
      <span class="ev-summary-label"><i class="fas fa-sync-alt" style="color:#F59E0B"></i> Periodicidad</span>
      <span class="ev-summary-value">${periText}</span>
    </div>` : '';

  document.getElementById('ev-summary-content').innerHTML = `
    <div class="ev-summary-grid">
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-clipboard-list" style="color:#4F46E5"></i> Tipo</span>
        <span class="ev-summary-value">${tipo}</span>
      </div>
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-user-tag" style="color:#14B8A6"></i> Dirigido a</span>
        <span class="ev-summary-value">${dirigido}</span>
      </div>
      ${periodRow}
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-tag" style="color:#64748B"></i> Título</span>
        <span class="ev-summary-value fw-semibold">${titulo}</span>
      </div>
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-users" style="color:#10B981"></i> Participantes</span>
        <span class="ev-summary-value">${empleadosHtml}</span>
      </div>
      <div class="ev-summary-row">
        <span class="ev-summary-label"><i class="fas fa-calendar" style="color:#EF4444"></i> Evaluación</span>
        <span class="ev-summary-value d-flex align-items-center">${fechasHtml}</span>
      </div>
      ${retroRows}
    </div>`;
}

// ========== FIN WIZARD ==========

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

function isEvergreen() {
  return $('#tipoEvaluacion').val() === '2' && $('#dirigidoA').val() === '2';
}

function _updateDateSectionVisibility() {
  if (isEvergreen()) {
    $('#dv_DateFields').hide();
    $('#inpFechaInicio').val('').removeAttr('required');
    $('#inpFechaFin').val('').removeAttr('required');
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').removeAttr('required');
  } else {
    $('#dv_DateFields').show();
    if ($('#tipoEvaluacion').val() === '2') {
      $('#inpFechaInicio').attr('required', 'required');
      $('#inpFechaFin').attr('required', 'required');
      $('#divPeriodicidad').show();
      $('#periodicidad').attr('required', 'required');
    }
  }
}

// Event listener para cambio de tipo de evaluación usando jQuery
$(document).on('change', '#tipoEvaluacion', function() {
  const tipo = $(this).val();
  console.log('Tipo seleccionado:', tipo);
  
  if (tipo === '1') {
    // Evaluación 360 - NO tiene periodicidad, SÍ tiene retro y plan
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').removeAttr('required');
    // Mostrar sección de retro y plan, hacerlos obligatorios
    $('#seccionRetroYPlan').show();
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
    // Encuesta Normal - SÍ tiene periodicidad, NO tiene retro ni plan
    $('#divPeriodicidad').show();
    $('#periodicidad').attr('required', 'required');
    // Ocultar sección de retro y plan, limpiar valores y quitar required
    $('#seccionRetroYPlan').hide();
    $('#inpRetroIni').val('').removeAttr('required');
    $('#inpRetroFin').val('').removeAttr('required');
    $('#inpPlanAIni').val('').removeAttr('required');
    $('#inpPlanAFin').val('').removeAttr('required');
    // Restaurar opción Postulantes si fue removida (ambos son válidos para normal)
    if (window._optPostulantes && !$('#dirigidoA option[value="2"]').length) {
      $('#dirigidoA').append(window._optPostulantes);
      window._optPostulantes = null;
    }
    // Re-evaluar visibilidad de fechas según dirigidoA actual
    _updateDateSectionVisibility();
  } else {
    // Ninguno seleccionado - resetear todo
    $('#divPeriodicidad').hide();
    $('#periodicidad').val('').removeAttr('required');
    $('#seccionRetroYPlan').hide();
    $('#inpRetroIni').val('').removeAttr('required');
    $('#inpRetroFin').val('').removeAttr('required');
    $('#inpPlanAIni').val('').removeAttr('required');
    $('#inpPlanAFin').val('').removeAttr('required');
    // Restaurar opción Postulantes si fue removida
    if (window._optPostulantes && !$('#dirigidoA option[value="2"]').length) {
      $('#dirigidoA').append(window._optPostulantes);
      window._optPostulantes = null;
    }
    // Asegurar que la sección de fechas sea visible para el estado reset
    $('#dv_Dates').show();
    $('#inpFechaInicio').removeAttr('required');
    $('#inpFechaFin').removeAttr('required');
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

  if (dirigido === '2') {
    $('#divParticipantes').prev('.row').hide();
    $('#divParticipantes').hide();
  } else {
    $('#divParticipantes').prev('.row').show();
    $('#divParticipantes').show();
  }

  // Si es encuesta normal, re-evaluar visibilidad de fechas/periodicidad
  if ($('#tipoEvaluacion').val() === '2') {
    _updateDateSectionVisibility();
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
  
  // Validaciones de retroalimentación y plan de acción (solo para 360)
  if (tipo === '1') {
    const retroIni = inpRetroIni.value ? new Date(inpRetroIni.value + 'T00:00:00') : null;
    const retroFin = inpRetroFin.value ? new Date(inpRetroFin.value + 'T00:00:00') : null;
    const planAIni = inpPlanAIni.value ? new Date(inpPlanAIni.value + 'T00:00:00') : null;
    const planAFin = inpPlanAFin.value ? new Date(inpPlanAFin.value + 'T00:00:00') : null;
    
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
  }
  
  return true;
}

$(document).on("click","#btn_SaveData",async function(){
  // Validar tipo de evaluación
  if (!tipoEvaluacion.value) {
    toastr.error('Debe seleccionar un tipo de cuestionario', 'Error de validación');
    return;
  }
  
  // Validar dirigido a
  if (!dirigidoA.value) {
    toastr.error('Debe especificar a quién va dirigido el cuestionario', 'Error de validación');
    return;
  }
  
  // Validar periodicidad si es encuesta normal (y no es evergreen)
  if (tipoEvaluacion.value === '2' && !isEvergreen() && !periodicidad.value) {
    toastr.error('Debe seleccionar una periodicidad para la encuesta normal', 'Error de validación');
    return;
  }
  
  const resV = await verifyInputs('dv_DataGeneral');
  const resV2 = await verifyInputs('dv_Dates');
  
  // Validar secciones de retro y plan SOLO para 360
  let resV3 = true;
  if (tipoEvaluacion.value === '1') {
    resV3 = await verifyInputs('seccionRetroYPlan');
  }
  
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
  if (dirigidoA.value !== '2') {
    if (!empleadosSeleccionados || empleadosSeleccionados.length === 0) {
      toastr.error('Debe seleccionar al menos un empleado participante', 'Error de validación');
      return;
    }
  }
  
  const dataSend = {
    op: "saveEvaluationNoE",
    inpTitulo: quitarEspaciosExtras(title_c.value).trim(),
    tipoEvaluacion: tipo,
    dirigidoA: dirigidoA.value,
    periodicidad: tipo === '2' && !isEvergreen() ? periodicidad.value : null,
    inpFechaInicio: isEvergreen() ? null : inpFechaInicio.value,
    inpFechaFin: isEvergreen() ? null : inpFechaFin.value,
    inpRetroFechaIni: tipo === '1' ? inpRetroIni.value : null,
    inpRetroFechaFin: tipo === '1' ? inpRetroFin.value : null,
    inpPlanAFechaIni: tipo === '1' ? inpPlanAIni.value : null,
    inpPlanAFechaFin: tipo === '1' ? inpPlanAFin.value : null,
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
