// ===== PUBLISH WIZARD — Estado global =====
const PW = {
  evId:             null,
  evTitulo:         '',
  step:             1,
  branches:         [],       // { IdSucursal, Sucursal }
  selectedBranches: new Set(),
  tempData:         [],       // pares evaluado→evaluador
  allEmployees:     [],       // para sub-modal agregar
  addEvaluadoId:    null,
  addEvaluadoNombre:'',
  addSucursalId:    null,
  addTipoRel:       1,        // 1=JEFE 2=PAR 3=SUBORDINADO
};

// Inicializa los tooltips de Bootstrap 5 en los elementos dinámicos
function initTooltips() {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    bootstrap.Tooltip.getInstance(el)?.dispose();
    new bootstrap.Tooltip(el, { trigger: 'hover' });
  });
}

// Cambia entre las pestañas de sucursales en el paso 2 de evaluadores
window.pwSwitchTab = function(btn) {
  const nav = btn.parentElement;
  
  // Desactivar todas las pestañas de este bloque
  nav.querySelectorAll('.pw-tab-btn').forEach(b => {
    b.classList.remove('active');
    b.style.backgroundColor = '#f3f4f6';
    b.style.color = '#4b5563';
    b.style.borderColor = '#e5e7eb';
  });

  // Activar la pestaña actual
  btn.classList.add('active');
  btn.style.backgroundColor = '#ffc407';
  btn.style.color = '#1f2937';
  btn.style.borderColor = '#d9a406';

  // Ocultar todos los paneles en el contenedor de evaluadores
  const evaluadoresContent = document.getElementById('pw-evaluadores-content');
  if (evaluadoresContent) {
    evaluadoresContent.querySelectorAll('.pw-tab-panel').forEach(p => {
      p.style.display = 'none';
    });
  }

  // Mostrar el panel de la sucursal seleccionada por ID de forma segura (con fallback trim)
  const targetId = btn.getAttribute('data-target-id');
  let targetPanel = document.getElementById(targetId);
  if (!targetPanel && targetId) {
    // Si no se encuentra, intentamos remover espacios en blanco
    targetPanel = document.getElementById(targetId.trim());
  }
  
  if (targetPanel) {
    targetPanel.style.display = 'block';
  } else {
    console.warn('No se encontró el panel con ID:', targetId);
  }
};

// ===== ABRIR WIZARD =====
window.openPublishWizard = async function(evId, titulo) {
  PW.evId             = evId;
  PW.evTitulo         = titulo || '';
  PW.step             = 1;
  PW.branches         = [];
  PW.selectedBranches = new Set();
  PW.tempData         = [];

  const titEl = document.getElementById('pw-eval-titulo');
  if (titEl) titEl.textContent = PW.evTitulo;

  pwGoToStep(1);
  new bootstrap.Modal(document.getElementById('modalPublishWizard')).show();

  await Promise.all([pwLoadBranches(), pwLoadAllEmployees()]);
};

// ===== NAVEGACIÓN PASOS =====
function pwGoToStep(n) {
  PW.step = n;

  // Panes
  document.querySelectorAll('.pw-pane').forEach((p, i) => {
    p.classList.toggle('active', i + 1 === n);
  });

  // Stepper nodes
  [1, 2, 3].forEach(i => {
    const node = document.getElementById(`pw-wi-${i}`);
    if (!node) return;
    node.classList.remove('active', 'done');
    if (i < n)      node.classList.add('done');
    else if (i === n) node.classList.add('active');
  });

  // Connectors
  [1, 2].forEach(i => {
    const conn = document.getElementById(`pw-conn-${i}`);
    if (conn) conn.classList.toggle('done', i < n);
  });

  // Indicator
  const ind = document.getElementById('pw-step-indicator');
  if (ind) ind.textContent = `Paso ${n} de 3`;

  // Botón anterior
  const prevBtn = document.getElementById('pw-btn-prev');
  if (prevBtn) prevBtn.style.visibility = n === 1 ? 'hidden' : 'visible';

  // Botón siguiente / publicar
  const nextBtn = document.getElementById('pw-btn-next');
  if (nextBtn) {
    if (n === 3) {
      nextBtn.className = 'btn pw-btn-publish';
      nextBtn.innerHTML = '<span class="material-symbols-outlined me-1" style="font-size:16px;vertical-align:middle;">rocket_launch</span> Publicar';
    } else {
      nextBtn.className = 'btn ev-btn-indigo';
      nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right ms-1"></i>';
    }
  }
}

window.pwPrev = function() {
  if (PW.step > 1) pwGoToStep(PW.step - 1);
};

window.pwNext = async function() {
  if (PW.step === 1) {
    if (PW.selectedBranches.size === 0) {
      Swal.fire({ icon: 'warning', title: 'Selecciona al menos una sucursal', timer: 2000, showConfirmButton: false });
      return;
    }
    pwGoToStep(2);
    await pwLoadTempData();
  } else if (PW.step === 2) {
    pwGoToStep(3);
    pwRenderStep3();
  } else if (PW.step === 3) {
    await pwPublish();
  }
};

// ===== PASO 1: SUCURSALES =====
async function pwLoadBranches() {
  const res = await pAjaxAsync(url_m_Evaluaciones, {
    op: 'getListBranchInEvaluation',
    ev: PW.evId,
  }, 1);

  if (res !== undefined && res.Data) {
    PW.branches = res.Data;
    PW.selectedBranches = new Set(res.Data.map(b => String(b.IdSucursal)));
    pwRenderBranches();
  } else if (res !== undefined) {
    PW.branches = [];
    document.getElementById('pw-branches-chips').innerHTML =
      '<p class="text-muted" style="font-size:0.85rem;">Sin sucursales disponibles para esta evaluación</p>';
  }
}

function pwRenderBranches() {
  const container = document.getElementById('pw-branches-chips');
  if (!container) return;

  if (!PW.branches.length) {
    container.innerHTML = '<p class="text-muted" style="font-size:0.85rem;">Sin sucursales disponibles</p>';
    return;
  }

  container.innerHTML = PW.branches.map(b => {
    const id  = String(b.IdSucursal);
    const sel = PW.selectedBranches.has(id);
    return `<button type="button" class="pw-chip ${sel ? 'active' : ''}"
        data-id="${id}" onclick="pwToggleBranch('${id}')"
        data-bs-toggle="tooltip" data-bs-placement="top" title="${sel ? 'Click para deseleccionar' : 'Click para seleccionar'}">
      <span class="material-symbols-outlined">location_on</span>
      ${b.Sucursal}
    </button>`;
  }).join('');

  initTooltips();
}

window.pwToggleBranch = function(id) {
  if (PW.selectedBranches.has(id)) {
    PW.selectedBranches.delete(id);
  } else {
    PW.selectedBranches.add(id);
  }
  const chip = document.querySelector(`.pw-chip[data-id="${id}"]`);
  if (chip) {
    const sel = PW.selectedBranches.has(id);
    chip.classList.toggle('active', sel);
    chip.title = sel ? 'Click para deseleccionar' : 'Click para seleccionar';
    bootstrap.Tooltip.getInstance(chip)?.dispose();
    new bootstrap.Tooltip(chip, { trigger: 'hover' });
  }
};

window.pwSelectAllBranches = function(select) {
  PW.branches.forEach(b => {
    const id = String(b.IdSucursal);
    if (select) PW.selectedBranches.add(id);
    else        PW.selectedBranches.delete(id);
  });
  pwRenderBranches();
};

// ===== PASO 2: EVALUADORES =====
async function pwLoadTempData() {
  const container = document.getElementById('pw-evaluadores-content');
  if (container) container.innerHTML = '<div class="text-center py-4"><div class="spinner-border spinner-border-sm" style="color:#F59E0B;"></div></div>';

  // Enviar IDs originales (integers) filtrando desde PW.branches
  const branchIds = PW.branches
    .filter(b => PW.selectedBranches.has(String(b.IdSucursal)))
    .map(b => b.IdSucursal);

  const res = await pAjaxAsync(url_m_Evaluaciones, {
    op:     'checkTemporaryDataEvaluation',
    ev:     PW.evId,
    branch: branchIds,
  }, 1);

  if (res !== undefined) {
    PW.tempData = res.Data || [];
    pwRenderStep2();
  } else {
    if (container) container.innerHTML = `
      <div class="ev-empty-state py-4">
        <span class="material-symbols-outlined">error_outline</span>
        <p>No se pudieron cargar los datos. Intenta de nuevo.</p>
      </div>`;
  }
}

function pwRenderStep2() {
  const container = document.getElementById('pw-evaluadores-content');
  if (!container) return;

  if (!PW.tempData.length) {
    container.innerHTML = `
      <div class="ev-empty-state py-4">
        <span class="material-symbols-outlined">group_off</span>
        <p>Sin pares evaluado → evaluador configurados para las sucursales seleccionadas</p>
      </div>`;
    return;
  }

  // Agrupar por sucursal → por evaluado
  const sucMap = {};
  PW.branches
    .filter(b => PW.selectedBranches.has(String(b.IdSucursal)))
    .forEach(b => { sucMap[String(b.IdSucursal)] = { name: b.Sucursal, byEvaluado: {} }; });

  PW.tempData.forEach(p => {
    const suc = sucMap[String(p.IdSucursalEvaluado)];
    if (!suc) return;
    if (!suc.byEvaluado[p.NoEmpleadoEvaluado]) {
      suc.byEvaluado[p.NoEmpleadoEvaluado] = { nombre: p.EmpladoEvaluado, no: p.NoEmpleadoEvaluado, pairs: [] };
    }
    suc.byEvaluado[p.NoEmpleadoEvaluado].pairs.push(p);
  });

  const badgeMap = { AUTO: 'gray', JEFE: 'amber', PAR: 'teal', SUBORDINADO: 'blue' };

  let tabsHtml   = '<div class="pw-tabs-nav d-flex gap-2 overflow-auto pb-2 mb-3" style="border-bottom: 1px solid #e5e7eb; scrollbar-width: thin;">';
  let panelsHtml = '<div class="pw-panels-container">';
  let idx        = 0;

  Object.entries(sucMap).forEach(([sucId, suc]) => {
    const evList = Object.values(suc.byEvaluado);
    if (!evList.length) return;

    const pairCount = evList.reduce((s, e) => s + e.pairs.length, 0);
    const isActive  = idx === 0;
    idx++;

    // Generar pestaña de navegación horizontal
    const activeStyle = 'white-space: nowrap; border-radius: 20px; padding: 6px 14px; font-weight: 600; font-size: 13px; transition: all 0.2s; border: 1px solid #d9a406; background-color: #ffc407; color: #1f2937;';
    const inactiveStyle = 'white-space: nowrap; border-radius: 20px; padding: 6px 14px; font-weight: 500; font-size: 13px; transition: all 0.2s; border: 1px solid #e5e7eb; background-color: #f3f4f6; color: #4b5563;';

    tabsHtml += `
      <button type="button" class="pw-tab-btn btn btn-sm d-flex align-items-center gap-1 ${isActive ? 'active' : ''}"
        data-target-id="pw-panel-${sucId}" onclick="pwSwitchTab(this)"
        style="${isActive ? activeStyle : inactiveStyle}">
        <span class="material-symbols-outlined" style="font-size:15px; vertical-align: middle;">location_on</span>
        ${suc.name}
        <span class="badge rounded-pill bg-dark text-white ms-1" style="font-size: 10px; padding: 3px 6px;">${evList.length}</span>
      </button>
    `;

    // Generar panel correspondiente de evaluados
    panelsHtml += `
      <div class="pw-tab-panel" id="pw-panel-${sucId}" style="display: ${isActive ? 'block' : 'none'};">
        <div class="d-flex align-items-center mb-3 text-muted" style="font-size: 0.8rem; font-weight: 500;">
          <span class="material-symbols-outlined me-1" style="font-size: 14px;">info</span>
          Mostrando ${evList.length} evaluado${evList.length !== 1 ? 's' : ''} y ${pairCount} par${pairCount !== 1 ? 'es' : ''} en ${suc.name}
        </div>`;

    evList.forEach(ev => {
      const initials = ev.nombre.trim().split(/\s+/).slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase();
      panelsHtml += `
        <div class="pw-evaluado-block" data-nombre="${ev.nombre.toLowerCase()}">
          <div class="pw-evaluado-header">
            <div class="pw-evaluado-avatar">${initials}</div>
            <div>
              <div class="pw-evaluado-nombre">${ev.nombre}</div>
              <div class="pw-evaluado-meta">#${ev.no} · ${ev.pairs.length} evaluador${ev.pairs.length !== 1 ? 'es' : ''}</div>
            </div>
          </div>
          <div class="pw-evaluador-list">`;

      ev.pairs.forEach(p => {
        const tipo     = pwGetTipo(p);
        const badge    = badgeMap[tipo] || 'gray';
        const isAuto   = p.AutoEvalua == 1;
        const isActive = p.Status == 1;

        const toggleTooltip = isAuto
          ? 'La autoevaluación no puede modificarse'
          : (isActive ? 'Activo — click para desactivar' : 'Inactivo — click para activar');

        const toggleHtml = `
          <span style="display:inline-flex;" data-bs-toggle="tooltip" data-bs-placement="top" title="${toggleTooltip}">
            <div class="form-check form-switch m-0">
              <input class="form-check-input pw-toggle" type="checkbox"
                ${isActive ? 'checked' : ''} ${isAuto ? 'disabled style="pointer-events:none;"' : ''}
                data-detail="${p.idEvaluacionDetalle}" style="width:2em;height:1.1em;cursor:pointer;">
            </div>
          </span>`;

        const deleteHtml = isAuto
          ? `<span style="display:inline-flex;" data-bs-toggle="tooltip" data-bs-placement="left" title="La autoevaluación no puede eliminarse">
               <button class="btn-minimal-danger" disabled style="pointer-events:none;">
                 <span class="material-symbols-outlined">lock</span>
               </button>
             </span>`
          : `<button class="btn-minimal-danger pw-delete-pair"
               data-detail="${p.idEvaluacionDetalle}" data-name="${p.EmpladoEvaluador}"
               data-bs-toggle="tooltip" data-bs-placement="left" title="Eliminar este evaluador">
               <span class="material-symbols-outlined">close</span>
             </button>`;

        panelsHtml += `
          <div class="pw-pair-row" data-detail="${p.idEvaluacionDetalle}">
            <div class="pw-pair-evaluador">
              <span class="pw-pair-nombre">${p.EmpladoEvaluador}</span>
              <span class="ev-sbadge ${badge}">${tipo}</span>
            </div>
            <div class="pw-pair-actions">
              ${toggleHtml}
              ${deleteHtml}
            </div>
          </div>`;
      });

      panelsHtml += `
          </div>
          <button type="button" class="pw-btn-add-ev mt-2 mb-2"
            data-evaluado="${ev.no}" data-nombre="${ev.nombre}" data-sucursal="${sucId}"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar evaluador para ${ev.nombre}">
            <span class="material-symbols-outlined">person_add</span>
            Agregar evaluador
          </button>
        </div>`;
    });

    panelsHtml += `
      </div>`;
  });

  tabsHtml += '</div>';
  panelsHtml += '</div>';

  container.innerHTML = tabsHtml + panelsHtml;
  initTooltips();
  pwBindStep2Events();
}

function pwGetTipo(p) {
  if (p.AutoEvalua == 1)       return 'AUTO';
  if (p.JefeEvalua == 1)       return 'JEFE';
  if (p.ParEvalua == 1)        return 'PAR';
  if (p.SubordinadoEvalua == 1) return 'SUBORDINADO';
  return '—';
}

function pwBindStep2Events() {
  // Toggle activo/inactivo
  document.querySelectorAll('.pw-toggle').forEach(inp => {
    inp.addEventListener('change', async function() {
      const detId  = this.dataset.detail;
      const newVal = this.checked ? 1 : 0;
      const res = await pAjaxAsync(url_m_Evaluaciones, {
        op:     'updateStatusTempDetEv',
        newVal,
        detEv:  detId,
      }, 1);
      if (!res) {
        this.checked = !this.checked; // revertir si falla
      } else {
        const pair = PW.tempData.find(p => p.idEvaluacionDetalle == detId);
        if (pair) pair.Status = newVal;
      }
    });
  });

  // Eliminar par
  document.querySelectorAll('.pw-delete-pair').forEach(btn => {
    btn.addEventListener('click', async function() {
      const detId = this.dataset.detail;
      const name  = this.dataset.name;
      const result = await Swal.fire({
        title: `¿Eliminar evaluador "${name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ffc407',
        cancelButtonColor: '#dc3545',
      });
      if (result.isConfirmed) {
        const res = await pAjaxAsync(url_m_Evaluaciones, {
          op:       'deleteEvaluatorDetail',
          evDetail: detId,
        }, 1);
        if (res) {
          PW.tempData = PW.tempData.filter(p => p.idEvaluacionDetalle != detId);
          pwRenderStep2();
        }
      }
    });
  });

  // Agregar evaluador
  document.querySelectorAll('.pw-btn-add-ev').forEach(btn => {
    btn.addEventListener('click', function() {
      pwOpenAddEvaluador(this.dataset.evaluado, this.dataset.nombre, this.dataset.sucursal);
    });
  });
}

// Filtro búsqueda evaluados en paso 2
window.pwFiltrarEvaluados = function() {
  const q = document.getElementById('pw-search-evaluado')?.value.toLowerCase() ?? '';
  document.querySelectorAll('#pw-evaluadores-content .pw-evaluado-block').forEach(block => {
    block.style.display = block.dataset.nombre.includes(q) ? '' : 'none';
  });
};

// ===== SUB-MODAL: AGREGAR EVALUADOR =====
async function pwLoadAllEmployees() {
  const res = await pAjaxAsync(url_m_Empleados, { op: 'getAllActiveEmployees' });
  if (res && res.Data) {
    PW.allEmployees = res.Data;
  }
}

window.pwOpenAddEvaluador = function(evaluadoId, evaluadoNombre, sucursalId) {
  PW.addEvaluadoId     = evaluadoId;
  PW.addEvaluadoNombre = evaluadoNombre;
  PW.addSucursalId     = sucursalId;
  PW.addTipoRel        = 1;

  const nombreEl = document.getElementById('pw-add-evaluado-nombre');
  if (nombreEl) nombreEl.textContent = `Para: ${evaluadoNombre}`;

  document.getElementById('pw-add-evaluado-id').value  = evaluadoId;
  document.getElementById('pw-add-sucursal-id').value  = sucursalId;
  document.getElementById('pw-add-search').value       = '';

  // Reset tipo buttons
  document.querySelectorAll('.pw-tipo-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.val === '1');
  });

  // Mostrar empleados filtrados (excluir ya asignados a este evaluado)
  pwRenderPosiblesEv('');

  new bootstrap.Modal(document.getElementById('pwModalAddEv')).show();
};

// Tipo relation buttons
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.pw-tipo-btn');
  if (!btn) return;
  PW.addTipoRel = parseInt(btn.dataset.val);
  document.querySelectorAll('.pw-tipo-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

window.pwFiltrarPosiblesEv = function() {
  const q = document.getElementById('pw-add-search')?.value.toLowerCase() ?? '';
  pwRenderPosiblesEv(q);
};

function pwRenderPosiblesEv(q) {
  const container = document.getElementById('pw-posibles-ev-list');
  if (!container) return;

  // Excluir empleados ya asignados como evaluadores de este evaluado
  const yaAsignados = new Set(
    PW.tempData
      .filter(p => p.NoEmpleadoEvaluado == PW.addEvaluadoId)
      .map(p => String(p.NoEmpleadoEvalua))
  );

  const filtrados = PW.allEmployees.filter(emp => {
    if (String(emp.NoEmpleado) === String(PW.addEvaluadoId)) return false; // no puede evaluarse (ya tiene auto)
    if (yaAsignados.has(String(emp.NoEmpleado))) return false;
    if (q && !emp.Descripcion.toLowerCase().includes(q)) return false;
    return true;
  });

  if (!filtrados.length) {
    container.innerHTML = '<p class="text-muted text-center py-2" style="font-size:0.82rem;">Sin resultados</p>';
    return;
  }

  container.innerHTML = filtrados.map(emp => {
    const initials = emp.Descripcion.trim().split(/\s+/).slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase();
    return `
      <div class="ev-evaluador-card" style="padding:8px 10px;">
        <div class="ev-evaluador-info">
          <div class="ev-evaluador-avatar" style="width:32px;height:32px;font-size:0.72rem;">${initials}</div>
          <div class="ev-evaluador-name" style="font-size:0.82rem;">${emp.Descripcion}</div>
        </div>
        <button class="btn-minimal btn-sm pw-add-ev-confirm"
          data-no="${emp.NoEmpleado}" data-nombre="${emp.Descripcion}"
          data-bs-toggle="tooltip" data-bs-placement="left" title="Registrar como evaluador">
          <span class="material-symbols-outlined" style="font-size:15px;">person_add</span>
        </button>
      </div>`;
  }).join('');

  initTooltips();

  // Bind botones
  container.querySelectorAll('.pw-add-ev-confirm').forEach(btn => {
    btn.addEventListener('click', async function() {
      await pwConfirmarAddEvaluador(this.dataset.no, this.dataset.nombre);
    });
  });
}

async function pwConfirmarAddEvaluador(evadorNo, evadorNombre) {
  const result = await Swal.fire({
    title: '¿Registrar evaluador?',
    html: `<strong>${evadorNombre}</strong> evaluará a <strong>${PW.addEvaluadoNombre}</strong>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, registrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ffc407',
    cancelButtonColor: '#dc3545',
  });

  if (!result.isConfirmed) return;

  const res = await pAjaxAsync(url_m_Evaluaciones, {
    op:           'addEmpleadoEvaluadorTempData',
    ev:           PW.evId,
    evaluator:    evadorNo,
    evaluated:    PW.addEvaluadoId,
    typeEvaluator: PW.addTipoRel,
  }, 1);

  if (res) {
    // Cerrar sub-modal
    bootstrap.Modal.getInstance(document.getElementById('pwModalAddEv'))?.hide();

    Swal.fire({ icon: 'success', title: 'Evaluador registrado', timer: 1200, showConfirmButton: false });

    // Recargar datos y re-renderizar paso 2
    await pwLoadTempData();
  }
}

// ===== PASO 3: RESUMEN =====
function pwRenderStep3() {
  const container = document.getElementById('pw-summary-content');
  if (!container) return;

  const totalPairs   = PW.tempData.length;
  const activePairs  = PW.tempData.filter(p => p.Status == 1).length;
  const uniqueEvados = new Set(PW.tempData.map(p => p.NoEmpleadoEvaluado)).size;

  // Detectar evaluados sin evaluadores activos
  const byEvaluado = {};
  PW.tempData.forEach(p => {
    if (!byEvaluado[p.NoEmpleadoEvaluado]) {
      byEvaluado[p.NoEmpleadoEvaluado] = { nombre: p.EmpladoEvaluado, active: 0 };
    }
    if (p.Status == 1) byEvaluado[p.NoEmpleadoEvaluado].active++;
  });
  const warnings = Object.values(byEvaluado).filter(e => e.active === 0);

  container.innerHTML = `
    <div class="pw-summary-kpis">
      <div class="pw-kpi">
        <div class="pw-kpi-number">${PW.selectedBranches.size}</div>
        <div class="pw-kpi-label">Sucursales</div>
      </div>
      <div class="pw-kpi">
        <div class="pw-kpi-number">${uniqueEvados}</div>
        <div class="pw-kpi-label">Evaluados</div>
      </div>
      <div class="pw-kpi">
        <div class="pw-kpi-number" style="color:#10B981;">${activePairs}</div>
        <div class="pw-kpi-label">Pares activos</div>
      </div>
      <div class="pw-kpi" style="opacity:0.55;">
        <div class="pw-kpi-number" style="color:#94A3B8;">${totalPairs - activePairs}</div>
        <div class="pw-kpi-label">Inactivos</div>
      </div>
    </div>

    ${warnings.length ? `
      <div class="pw-warning-box mb-3">
        <span class="material-symbols-outlined">warning</span>
        <div>
          <strong>${warnings.length} evaluado${warnings.length > 1 ? 's' : ''} sin evaluadores activos</strong>
          — sus cuestionarios no se activarán:
          <ul class="mb-0 mt-1 ps-3">
            ${warnings.map(w => `<li style="font-size:0.82rem;">${w.nombre}</li>`).join('')}
          </ul>
        </div>
      </div>` : ''}

    <div class="pw-confirm-box">
      <span class="material-symbols-outlined" style="color:#10B981;font-size:36px;">check_circle</span>
      <p>Al publicar, los cuestionarios se activarán para todos los evaluadores con pares <strong>activos</strong>.<br>
         <span style="color:#DC2626;font-weight:600;">Esta acción no puede deshacerse.</span></p>
    </div>`;
}

// ===== PUBLICAR =====
async function pwPublish() {
  const result = await Swal.fire({
    title: '¿Publicar evaluación?',
    html: `Se activarán los cuestionarios para <strong>${PW.tempData.filter(p => p.Status == 1).length}</strong> pares de evaluadores.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, publicar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#dc3545',
  });

  if (!result.isConfirmed) return;

  const res = await pAjaxAsync(url_m_Evaluaciones, {
    op: 'acceptPublicationOfTheEvaluation',
    ev: PW.evId,
  }, 1);

  if (res) {
    bootstrap.Modal.getInstance(document.getElementById('modalPublishWizard'))?.hide();
    Swal.fire({ icon: 'success', title: '¡Evaluación publicada!', timer: 1800, showConfirmButton: false });
    setTimeout(() => getEvaluaciones(), 1000); // refrescar grid
  }
}

// ===== TIPO BUTTONS STYLING =====
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .pw-tipo-btn {
      flex: 1; padding: 7px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;
      border: 1.5px solid #E2E8F0; background: #F8FAFC; color: #64748B; cursor: pointer;
      transition: all 0.2s ease;
    }
    .pw-tipo-btn:hover { border-color: #F59E0B; background: #FFFBEB; color: #92400E; }
    .pw-tipo-btn.active { border-color: #F59E0B; background: #FEF3C7; color: #78350F; }
  `;
  document.head.appendChild(style);
});
