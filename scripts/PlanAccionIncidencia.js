// ══════════════════════════════════════════════════════════════════════════════
//  PlanAccionIncidencia.js — Lógica para Plan de Acción de Incidencias
// ══════════════════════════════════════════════════════════════════════════════

const API_INC = "Backend/Incidencias/App.php";

$(document).ready(function () {
  cargarInfoIncidencia();
  cargarActividades();
});

// ── Cargar Info General ───────────────────────────────────────────────────────
async function cargarInfoIncidencia() {
  try {
    const data = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "getInfoIncidenciaPlan", id: ID_INCIDENCIA_B64 },
      dataType: "json"
    });

    if (data && data.Resultado && data.Data) {
      const info = data.Data;
      
      $('#lblEmpleado').text(info.NombreEmpleado || 'N/A');
      $('#lblPuesto').text(info.Puesto || 'N/A');
      $('#lblTipo').text(info.TipoIncidencia || 'Sin asignar');
      $('#lblDesc').text(info.Descripcion || 'Sin descripción');
      
      // Fecha
      if (info.FechaRegistro) {
        const d = new Date(info.FechaRegistro);
        $('#lblFecha').text(d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }));
      }
      
      // Badge Estado
      let badgeHtml = '';
      const estado = (info.Estado || 'Abierta').trim();
      if (estado === 'Abierta') badgeHtml = `<span class="badge-estado-abierta"><i class="fas fa-exclamation-circle me-1"></i> Abierta</span>`;
      else if (estado === 'En proceso') badgeHtml = `<span class="badge-estado-proceso"><i class="fas fa-spinner fa-spin me-1"></i> En proceso</span>`;
      else if (estado === 'Resuelta') badgeHtml = `<span class="badge-estado-resuelta"><i class="fas fa-check-circle me-1"></i> Resuelta</span>`;
      else badgeHtml = `<span class="badge-estado-abierta">${estado}</span>`;
      
      $('#badgeEstadoHolder').html(badgeHtml);
      
      // (Opcional) Si está resuelta, bloquear creación de nuevas actividades
      if (estado === 'Resuelta') {
        $('button[onclick="abrirModalNuevaActividad()"]').prop('disabled', true)
          .attr('title', 'La incidencia ya está resuelta.').html('<i class="fas fa-lock me-1"></i> Incidencia Resuelta');
      }
      
    } else {
      toastr.error('No se pudo cargar la información de la incidencia.');
    }
  } catch (e) {
    console.error("Error al cargar info de incidencia:", e);
    toastr.error("Error de conexión al cargar datos.");
  }
}

// ── Cargar Actividades ───────────────────────────────────────────────────────
async function cargarActividades() {
  try {
    const data = await $.ajax({
      type: "POST",
      url: API_INC,
      data: { op: "getActividadesPlanAccion", id: ID_INCIDENCIA_B64 },
      dataType: "json"
    });

    const acts = data.Data || [];
    let html = '';

    if (acts.length === 0) {
      html = `
        <div class="empty-state">
          <i class="fas fa-clipboard"></i>
          <h5>Aún no hay actividades</h5>
          <p>No se ha definido un plan de acción para resolver esta incidencia.</p>
          <button class="btn btn-outline-primary mt-2" onclick="abrirModalNuevaActividad()">
            Crear la primera actividad
          </button>
        </div>
      `;
    } else {
      acts.forEach((act, index) => {
        html += renderActividadCard(act, index);
      });
    }

    $('#contenedorActividades').html(html);

  } catch (e) {
    console.error("Error al cargar actividades:", e);
    $('#contenedorActividades').html('<div class="alert alert-danger">Error al cargar el plan de acción. Intente recargar.</div>');
  }
}

// ── Render Card de Actividad ─────────────────────────────────────────────────
function renderActividadCard(act, index) {
  const progreso = parseInt(act.Progreso) || 0;
  
  // Color barra progreso
  let bgClass = 'bg-primary';
  if (progreso === 100) bgClass = 'bg-success';
  else if (parseInt(act.FechaCaduca) === 1 && progreso < 100) bgClass = 'bg-danger';

  // Fecha Vencimiento
  let txtFecha = "";
  if (act.FechaFin) {
    txtFecha = act.FechaFin.split('-').reverse().join('/');
  }
  
  // Badge caducado
  const badgeCaduca = (parseInt(act.FechaCaduca) === 1 && progreso < 100) 
                      ? `<span class="badge bg-danger ms-2" style="font-size:0.7rem"><i class="fas fa-clock"></i> Vencida</span>` 
                      : '';
                      
  // Btn avance (si está completada, se oculta)
  const btnAvance = (progreso < 100) ? `
    <button class="btn btn-sm btn-outline-success ms-3" onclick="abrirModalAvance(${act.IdPlanAccionInc}, '${escHtml(act.Titulo)}', ${progreso}); event.stopPropagation();">
      <i class="fas fa-plus"></i> Avance
    </button>
  ` : `<span class="badge bg-success ms-3"><i class="fas fa-check-double"></i> Completada</span>`;

  return `
    <div class="activity-card" id="actCard_${act.IdPlanAccionInc}">
      <div class="activity-header" onclick="toggleActivityBody(${act.IdPlanAccionInc})">
        <div class="activity-title">
          <div class="d-flex align-items-center">
            <span class="text-primary me-2 fw-bold">#${index + 1}</span>
            <h5 class="m-0">${escHtml(act.Titulo)} ${badgeCaduca}</h5>
          </div>
          <div class="activity-meta">
            <span><i class="fas fa-user-edit"></i> Por: ${escHtml(act.NombreUsuarioAlta)}</span>
            <span><i class="fas fa-calendar-alt"></i> Vence: <strong>${txtFecha}</strong></span>
          </div>
        </div>
        
        <div class="d-flex align-items-center">
          <div class="progress-wrapper" onclick="event.stopPropagation();">
            <span class="fw-bold" style="min-width:40px; text-align:right;">${progreso}%</span>
            <div class="progress-bar-custom">
              <div class="progress-fill ${bgClass}" style="width: ${progreso}%"></div>
            </div>
          </div>
          ${btnAvance}
          <i class="fas fa-chevron-down ms-3 text-muted act-chevron" id="iconAct_${act.IdPlanAccionInc}"></i>
        </div>
      </div>
      
      <div class="activity-body" id="actBody_${act.IdPlanAccionInc}">
        <h6 class="fw-bold text-muted mb-2 text-uppercase" style="font-size:0.8rem;">Detalle de la Actividad</h6>
        <div class="desc-box">
          ${escHtml(act.Descripcion)}
        </div>
        
        <div class="d-flex justify-content-between align-items-center mb-2 mt-4">
          <h6 class="fw-bold text-muted text-uppercase m-0" style="font-size:0.8rem;">Historial de Avances</h6>
          ${progreso < 100 ? `<button class="btn btn-sm btn-link text-decoration-none p-0" onclick="abrirModalAvance(${act.IdPlanAccionInc}, '${escHtml(act.Titulo)}', ${progreso})"><i class="fas fa-plus-circle"></i> Nuevo</button>` : ''}
        </div>
        
        <div class="table-responsive">
          <table class="table-avances" id="tblAvances_${act.IdPlanAccionInc}">
            <tbody>
              <tr><td colspan="3" class="text-center text-muted"><div class="spinner-grow spinner-grow-sm text-primary"></div> Cargando historial...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ── Toggle Desplegable y Cargar Avances ──────────────────────────────────────
function toggleActivityBody(idAct) {
  const $body = $(`#actBody_${idAct}`);
  const $icon = $(`#iconAct_${idAct}`);
  
  if ($body.is(':visible')) {
    $body.slideUp(200);
    $icon.css('transform', 'rotate(0deg)');
  } else {
    $body.slideDown(200);
    $icon.css('transform', 'rotate(180deg)');
    // Si apenas se abre, cargar los avances de esa actividad
    cargarAvancesTabla(idAct);
  }
}

// ── Cargar tabla de avances por actividad ────────────────────────────────────
async function cargarAvancesTabla(idActividad) {
  try {
    const data = await $.ajax({
      type: "POST", url: API_INC,
      data: { op: "getAvancesActividad", idActividad: idActividad },
      dataType: "json"
    });
    
    const tbody = $(`#tblAvances_${idActividad} tbody`);
    if (data && data.Resultado && data.Data && data.Data.length > 0) {
      let trs = '';
      data.Data.forEach(av => {
        trs += `
          <tr>
            <td style="width: 15%;"><span class="badge bg-light text-dark border"><i class="fas fa-clock text-muted"></i> ${av.FechaRegistro}</span></td>
            <td style="width: 10%;"><span class="fw-bold text-primary">${av.NuevoAvance}%</span></td>
            <td style="width: 75%;">${escHtml(av.DescripcionAvance)}</td>
          </tr>
        `;
      });
      tbody.html(trs);
    } else {
      tbody.html('<tr><td colspan="3" class="text-center text-muted py-3">Aún no hay avances registrados en esta actividad.</td></tr>');
    }
  } catch (e) {
    console.error("Error historial:", e);
    $(`#tblAvances_${idActividad} tbody`).html('<tr><td colspan="3" class="text-danger">Error al cargar historial.</td></tr>');
  }
}

// ── Modal Crear Actividad ────────────────────────────────────────────────────
function abrirModalNuevaActividad() {
  $('#frmActividad')[0].reset();
  
  // Setear fechas default (hoy y mañana)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  $('#txtActFIni').val(today.toISOString().split('T')[0]);
  $('#txtActFFin').val(tomorrow.toISOString().split('T')[0]);
  
  const modal = new bootstrap.Modal(document.getElementById('modalNuevaActividad'), {
    backdrop: 'static',
    keyboard: false
  });
  modal.show();
}

async function guardarActividad() {
  const titulo = $('#txtActTitulo').val().trim();
  const desc = $('#txtActDesc').val().trim();
  const fIni = $('#txtActFIni').val();
  const fFin = $('#txtActFFin').val();
  
  if (!titulo || !desc || !fIni || !fFin) {
    toastr.warning("Por favor completa todos los campos.");
    return;
  }
  
  if (new Date(fFin) < new Date(fIni)) {
    toastr.error("La fecha final no puede ser menor a la fecha de inicio.");
    return;
  }
  
  try {
    const resp = await $.ajax({
      type: "POST", url: API_INC,
      data: { 
        op: "addActividadPlanAccion", 
        id: ID_INCIDENCIA_B64,
        titulo: titulo,
        descripcion: desc,
        fechaIni: fIni,
        fechaFin: fFin
      },
      dataType: "json"
    });
    
    if (resp && resp.Resultado && resp.Siguiente) {
      toastr.success(resp.Msg);
      // Cerrar modal
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('modalNuevaActividad'));
      if (modalInstance) modalInstance.hide();
      
      // Recargar actividades
      cargarActividades();
      cargarInfoIncidencia(); // Para actualizar los contadores si existen
    } else {
      toastr.error(resp.Msg || "Error al guardar actividad.");
    }
  } catch (e) {
    console.error(e);
    toastr.error("Error al guardar actividad.");
  }
}

// ── Modal Registrar Avance ───────────────────────────────────────────────────
function abrirModalAvance(idActividad, titulo, progresoActual) {
  $('#frmAvance')[0].reset();
  $('#avanceIdActividad').val(idActividad);
  $('#lblAvanceActividadTitulo').text(titulo);
  $('#lblAvanceActual').text(progresoActual + '%');
  
  $('#rangeAvance').val(progresoActual);
  $('#numAvance').val(progresoActual);
  $('#rangeAvance').attr('min', progresoActual);
  $('#numAvance').attr('min', progresoActual);
  
  const modal = new bootstrap.Modal(document.getElementById('modalAvance'), {
    backdrop: 'static',
    keyboard: false
  });
  modal.show();
}

async function guardarAvance() {
  const idActividad = $('#avanceIdActividad').val();
  const nuevoAvance = parseInt($('#numAvance').val(), 10);
  const desc = $('#txtAvanceDesc').val().trim();
  const actualStr = $('#lblAvanceActual').text();
  const actual = parseInt(actualStr.replace('%',''), 10);
  
  if (isNaN(nuevoAvance)) return;
  if (!desc) { toastr.warning("Debes describir el trabajo realizado."); return; }
  
  if (nuevoAvance < actual) {
    toastr.error("El nuevo avance no puede ser menor al avance actual.");
    return;
  }
  if (nuevoAvance === actual) {
    toastr.warning("No hay aumento en el % de avance.");
    return;
  }
  
  try {
    const resp = await $.ajax({
      type: "POST", url: API_INC,
      data: { 
        op: "addAvancePlanAccion", 
        idActividad: idActividad,
        nuevoAvance: nuevoAvance,
        descripcion: desc
      },
      dataType: "json"
    });
    
    if (resp && resp.Resultado && resp.Siguiente) {
      toastr.success(resp.Msg);
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('modalAvance'));
      if (modalInstance) modalInstance.hide();
      
      // Recargar UI
      cargarActividades();
    } else {
      toastr.error(resp.Msg || "Error al registrar avance.");
    }
  } catch (e) {
    console.error(e);
    toastr.error("Error de conexión al registrar avance.");
  }
}

// ── Utils ────────────────────────────────────────────────────────────────────
function escHtml(str) {
  if (!str && str !== 0) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
