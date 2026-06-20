// Estado global
let contentEvaluations = [];

// Inicialización
loadAllFunctions();

async function loadAllFunctions() {
  await getEvaluacionesDisponibles();
}

/* ---------------------------------------------------------------
   Obtiene las evaluaciones disponibles del servidor
--------------------------------------------------------------- */
async function getEvaluacionesDisponibles() {
  const dataSend = { op: "getEvaluacionesDisponibles" };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  const data = ajaxResponse?.Data ?? [];
  printEvaluacionesDisponibles(data);
}

/* ---------------------------------------------------------------
   Calcula el porcentaje de avance de una evaluación
--------------------------------------------------------------- */
function calcProgress(evaluation) {
  const total = evaluation.Detalle?.length ?? 0;
  if (total === 0) return 0;

  const done = evaluation.Detalle.reduce(
    (acc, d) => acc + Number(d.StatusEvaluado), 0
  );
  return Math.round((done * 100) / total);
}

/* ---------------------------------------------------------------
   Renderiza los KPIs de resumen
--------------------------------------------------------------- */
function renderKPIs(data) {
  const total  = data.length;
  const done   = data.filter(e => calcProgress(e) === 100).length;
  const active = total - done;

  document.getElementById("ev-kpi-row").innerHTML = `
    <div class="ev-kpi">
      <div class="ev-kpi-icon total"><i class="fas fa-list-alt"></i></div>
      <div>
        <div class="ev-kpi-value">${total}</div>
        <div class="ev-kpi-label">Total</div>
      </div>
    </div>
    <div class="ev-kpi">
      <div class="ev-kpi-icon active"><i class="fas fa-hourglass-half"></i></div>
      <div>
        <div class="ev-kpi-value">${active}</div>
        <div class="ev-kpi-label">En Proceso</div>
      </div>
    </div>
    <div class="ev-kpi">
      <div class="ev-kpi-icon done"><i class="fas fa-check-circle"></i></div>
      <div>
        <div class="ev-kpi-value">${done}</div>
        <div class="ev-kpi-label">Completadas</div>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------------
   Construye el SVG circular de porcentaje
--------------------------------------------------------------- */
function buildCircleSVG(pct) {
  const r     = 26;
  const circ  = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  // Color según avance: usa el amarillo del tema o verde si completado
  const stroke = pct === 100 ? "#16a34a" : "#008837";

  return `
    <div class="ev-circle-wrap">
      <svg viewBox="0 0 66 66">
        <circle class="ev-circle-bg"   cx="33" cy="33" r="${r}"/>
        <circle class="ev-circle-prog" cx="33" cy="33" r="${r}"
          stroke="${stroke}"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${offset}"/>
      </svg>
      <div class="ev-circle-pct">${pct}%</div>
    </div>
  `;
}

/* ---------------------------------------------------------------
   Construye una card de evaluación con su panel expandible
--------------------------------------------------------------- */
function buildEvaluationCard(ev) {
  const pct    = calcProgress(ev);
  const isDone = pct === 100;
  const id     = ev.idEvaluaciones;

  const fillColor = isDone ? "#16a34a" : "#008837";

  const badgeHTML = isDone
    ? `<span class="ev-badge done"><i class="fas fa-check-circle"></i> Completada</span>`
    : `<span class="ev-badge active"><i class="fas fa-clock"></i> En proceso</span>`;

  return `
    <div class="ev-card-wrap" data-name="${(ev.Evaluacion ?? '').toLowerCase()}">
      <div class="ev-card" id="ev-card-${id}">
        ${buildCircleSVG(pct)}
        <div class="ev-card-info">
          <p class="ev-card-title">${ev.Evaluacion ?? '—'}</p>
          <p class="ev-card-dates">
            <i class="fas fa-calendar-alt"></i>
            ${ev.FechaInicio ?? ''} &nbsp;→&nbsp; ${ev.FechaFin ?? ''}
          </p>
          <div>
            <div class="ev-progress-bar">
              <div class="ev-progress-fill" style="width:${pct}%; background:${fillColor};"></div>
            </div>
            <div class="ev-progress-label">${pct}% completado · ${ev.Detalle?.length ?? 0} evaluado(s)</div>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end gap-2">
          ${badgeHTML}
          <button
            class="ev-btn-detail"
            id="ev-btn-${id}"
            onclick="toggleDetail('${id}')"
          >
            <i class="fas fa-chevron-down"></i> Ver Detalle
          </button>
        </div>
      </div>
      <div class="ev-detail-panel" id="ev-panel-${id}">
        <div class="ev-panel-search">
          <i class="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar empleado..."
            oninput="filterPanelEmployees('${id}', this.value)"
          />
        </div>
        <div id="ev-emp-list-${id}">
          ${buildEmployeeList(ev.Detalle ?? [])}
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------------
   Abre / cierra el panel de detalle de una evaluación
--------------------------------------------------------------- */
function toggleDetail(id) {
  const card  = document.getElementById(`ev-card-${id}`);
  const panel = document.getElementById(`ev-panel-${id}`);
  const btn   = document.getElementById(`ev-btn-${id}`);

  const isOpen = panel.classList.contains("is-open");

  // Cierra todos los paneles abiertos primero
  document.querySelectorAll(".ev-detail-panel.is-open").forEach(p => {
    p.classList.remove("is-open");
  });
  document.querySelectorAll(".ev-card.is-open").forEach(c => {
    c.classList.remove("is-open");
  });
  document.querySelectorAll(".ev-btn-detail.is-open").forEach(b => {
    b.classList.remove("is-open");
  });

  // Si estaba cerrado, abre el seleccionado
  if (!isOpen) {
    panel.classList.add("is-open");
    card.classList.add("is-open");
    btn.classList.add("is-open");
  }
}

/* ---------------------------------------------------------------
   Construye el HTML de la lista de empleados de un panel
--------------------------------------------------------------- */
function buildEmployeeList(list) {
  if (list.length === 0) {
    return `<div class="ev-empty"><i class="fas fa-users"></i><p>Sin empleados asignados.</p></div>`;
  }
  return list.map(buildEmployeeCard).join("");
}

/* ---------------------------------------------------------------
   Acción del empleado evaluado
--------------------------------------------------------------- */
function buildEmployeeCard(emp) {
  const isDone    = Number(emp.StatusEvaluado) === 1;
  const typeClass = getTypeBadgeClass(emp.RelacionEvaluado);

  const actionHTML = isDone
    ? `<div class="ev-done-tag"><i class="fas fa-check-circle"></i> Completada</div>`
    : `<button class="ev-btn-go text-dark"
         onclick="openEvaluationCanvas('${emp.idEvDetalle}')">
         <i class="fas fa-arrow-right"></i> Ir
       </button>`;

  return `
    <div class="ev-employee-card" data-empname="${(emp.Nombre ?? '').toLowerCase()}">
      <div class="ev-employee-avatar">${getInitials(emp.Nombre)}</div>
      <div class="ev-employee-info">
        <div class="ev-employee-name">${emp.Nombre ?? '—'}</div>
        <div class="ev-employee-meta">
          <span><i class="fas fa-comment-alt"></i> ${emp.Respondidas ?? 0} resp.</span>
          <span><span class="ev-type-badge ${typeClass}">${emp.RelacionEvaluado ?? 'Sin tipo'}</span></span>
          <span style="color:${isDone ? '#16a34a' : '#047857'};">
            <i class="fas fa-${isDone ? 'check' : 'hourglass-half'}"></i>
            ${emp.StatusRealizado ?? '—'}
          </span>
        </div>
      </div>
      ${actionHTML}
    </div>
  `;
}

/* ---------------------------------------------------------------
   Abre el overlay con el iframe apuntando a la evaluación
--------------------------------------------------------------- */
function openEvaluationCanvas(idEvDetalle) {
  const iframe  = document.getElementById("ev-iframe");
  const overlay = document.getElementById("ev-overlay");

  iframe.src = `Evaluacion.php?EV=${encodeURIComponent(idEvDetalle)}`;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

/* ---------------------------------------------------------------
   Cierra el overlay y limpia el iframe
--------------------------------------------------------------- */
function closeEvaluationCanvas() {
  const iframe  = document.getElementById("ev-iframe");
  const overlay = document.getElementById("ev-overlay");

  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  // Pequeño delay para que no se vea el contenido desaparecer
  setTimeout(() => { iframe.src = ""; }, 300);
}

/* ---------------------------------------------------------------
   Escucha el mensaje del iframe cuando el usuario finaliza
--------------------------------------------------------------- */
window.addEventListener("message", function (event) {
  if (event.data?.type === "ev-title") {
    document.getElementById("ev-overlay-title").textContent = event.data.title;
    return;
  }
  if (event.data?.type !== "ev-finished") return;
  closeEvaluationCanvas();
  getEvaluacionesDisponibles();
});

/* ---------------------------------------------------------------
   Renderiza todas las cards de evaluaciones
--------------------------------------------------------------- */
function printEvaluacionesDisponibles(data) {
  contentEvaluations = data;

  const container = document.getElementById("ev-cards-container");
  container.innerHTML = "";

  renderKPIs(data);

  if (data.length === 0) {
    container.innerHTML = `
      <div class="ev-empty">
        <i class="fas fa-clipboard-check"></i>
        <p>No tienes evaluaciones pendientes.</p>
      </div>`;
    return;
  }

  container.innerHTML = data.map(buildEvaluationCard).join("");
}

/* ---------------------------------------------------------------
   Filtra las cards por texto de búsqueda
--------------------------------------------------------------- */
function filterEvaluations(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll(".ev-card-wrap[data-name]").forEach(wrap => {
    wrap.style.display = (wrap.dataset.name ?? "").includes(q) ? "" : "none";
  });
}

/* ---------------------------------------------------------------
   Filtra empleados dentro del panel de una card
--------------------------------------------------------------- */
function filterPanelEmployees(id, query) {
  const q = query.toLowerCase().trim();
  const list = document.getElementById(`ev-emp-list-${id}`);
  if (!list) return;

  list.querySelectorAll(".ev-employee-card[data-empname]").forEach(card => {
    card.style.display = (card.dataset.empname ?? "").includes(q) ? "" : "none";
  });
}

/* ---------------------------------------------------------------
   Helpers
--------------------------------------------------------------- */
function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getTypeBadgeClass(tipo) {
  if (!tipo) return "default";
  const t = tipo.toLowerCase();
  if (t.includes("par"))         return "par";
  if (t.includes("superior"))    return "superior";
  if (t.includes("subordin"))    return "subordinado";
  if (t.includes("auto"))        return "auto";
  return "default";
}
