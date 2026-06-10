loadInitialFunctions();

async function loadInitialFunctions() {
  getMyPlansAction();
}

async function getMyPlansAction() {
  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, { op: "getMyPlansAction" });
  if (ajaxR !== undefined) {
    printMyPlansAction(ajaxR.Data);
  }
}

function getStatusBadge(statusPlan, statusAct, pendientes) {
  if (Number(statusPlan) === 1) {
    return `<span class="badge bg-success-subtle text-success fw-bold"><i class="fa-solid fa-circle-check me-1"></i>Finalizado</span>`;
  }
  if (Number(pendientes) > 0) {
    return `<span class="badge bg-info-subtle text-info fw-bold"><i class="fa-regular fa-hourglass-half me-1"></i>${pendientes} avance(s) por revisar</span>`;
  }
  if (Number(statusAct) === 1) {
    return `<span class="badge bg-warning-subtle text-warning fw-bold"><i class="fa-solid fa-spinner me-1"></i>En progreso</span>`;
  }
  return `<span class="badge bg-secondary-subtle text-secondary fw-bold"><i class="fa-regular fa-clock me-1"></i>Pendiente inicio</span>`;
}

function printMyPlansAction(data) {
  const container = document.getElementById('dv_planes');
  const emptyState = document.getElementById('dv_planes_empty');

  if (!data || data.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = '';
    return;
  }

  emptyState.style.display = 'none';
  container.innerHTML = data.map(plan => {
    const progreso = parseFloat(plan["ProgresoGlobal"] || 0).toFixed(1);
    const pendientes = parseInt(plan["CantidadAvancesPendientes"] || 0, 10);
    const statusBadge = getStatusBadge(plan["StatusConfirmaPlanAccion"], plan["StatusConfirmaActividades"], pendientes);
    const barColor = Number(plan["StatusConfirmaPlanAccion"]) === 1 ? '#198754' : '#ffc107';

    return `
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card h-100 shadow-sm border-0" style="border-left: 4px solid ${barColor} !important; border-radius: 12px;">
          <div class="card-body d-flex flex-column gap-3">

            <div class="d-flex justify-content-between align-items-start gap-2">
              <h6 class="card-title fw-bold text-dark mb-0" style="font-size:0.95rem; line-height:1.35;">${plan["Titulo"]}</h6>
              ${statusBadge}
            </div>

            <div>
              <div class="d-flex justify-content-between mb-1">
                <span class="small text-muted fw-semibold text-uppercase" style="font-size:0.7rem; letter-spacing:0.4px;">Avance global</span>
                <span class="small fw-bold text-dark">${progreso}%</span>
              </div>
              <div class="progress" style="height:6px; background:rgba(0,0,0,.07); border-radius:3px;">
                <div class="progress-bar" role="progressbar"
                  style="width:${progreso}%; background-color:${barColor}; border-radius:3px;"
                  aria-valuenow="${progreso}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>

            ${pendientes > 0 ? `
            <p class="small text-info mb-0" style="font-size:0.8rem;">
              <i class="fa-solid fa-circle-info me-1"></i>
              Tienes ${pendientes} avance(s) pendiente(s) de revisión por tu jefe.
            </p>` : ''}

            <div class="mt-auto pt-1">
              <button class="btn btn-minimal btn-minimal-primary w-100"
                onclick="window.location.href='plan-action.php?PA=${plan["idPlanesAccionEvaluacion"]}'">
                <i class="fa-solid fa-arrow-right-to-bracket me-2"></i>Entrar al plan
              </button>
            </div>

          </div>
        </div>
      </div>`;
  }).join('');
}
