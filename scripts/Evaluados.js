$(window).on('load', function() {
  $(".preloader").fadeOut();
});

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Evaluacion = urlParams.get("EV");

const slcPuestosModal  = document.querySelector("#slcPuestosModal");
const slcDivisionModal = document.querySelector("#slcDivisionModal");
const slcSucursalModal = document.querySelector("#slcSucursalModal");
const evaluadoSelected = document.querySelector("#evaluadoSelected");
const tx_title         = document.querySelector("#tx_title");

function initTooltips() {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    bootstrap.Tooltip.getInstance(el)?.dispose();
    new bootstrap.Tooltip(el, { trigger: 'hover' });
  });
}

let _posiblesEvaluadoresData = [];

allFunctions();

$(document).ready(function () {
  $("#modal_relacion").select2({
    width: "100%",
    dropdownParent: $("#modalEvaluadoresBootstrap"),
  });
});

async function allFunctions() {
  await getGeneralInfo();
  await getListDivisiones();
  await getListPuestos();
  await getListSucursales();
  await getListEvaluados();

  $("#slcPuestosModal").select2({
    width: "100%",
    dropdownParent: $("#modalEvaluadoresBootstrap"),
  });

  $("#slcSucursalModal").select2({
    width: "100%",
    dropdownParent: $("#modalEvaluadoresBootstrap"),
  });
}

async function getGeneralInfo() {
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, {
    op: "getGeneralInfoEvaluacion",
    evaluacion: Evaluacion,
  }, 1);

  if (ajaxResponse !== undefined) {
    tx_title.textContent = ajaxResponse.Data.Titulo;
  }
}

async function getListEvaluados() {
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, {
    op: "listEvaluados",
    idEvaluaciones: Evaluacion,
  }, 1);

  if (ajaxResponse !== undefined) {
    printListEvaluados(ajaxResponse.Data);
  }
}

let _evaluadosData = [];

function printListEvaluados(data) {
  _evaluadosData = data;
  renderEvaluadosCards(data);
}

function renderEvaluadosCards(data) {
  const container = document.getElementById('table_evaluados');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `
      <div class="ev-empty-state">
        <span class="material-symbols-outlined">group_off</span>
        <p>Sin evaluados registrados en esta evaluación</p>
      </div>`;
    return;
  }

  container.innerHTML = data.map(d => {
    const initials = d.Nombre.trim().split(/\s+/).slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase();
    return `
      <div class="ev-evaluado-card" data-nombre="${d.Nombre.toLowerCase()}">
        <div class="ev-evaluado-avatar-lg">${initials}</div>
        <div class="ev-evaluado-body">
          <div class="ev-evaluado-nombre">${d.Nombre}</div>
          <div class="ev-evaluado-meta">
            <span class="ev-evaluado-meta-item">
              <span class="material-symbols-outlined">badge</span> #${d.NoEmpleado}
            </span>
            <span class="ev-evaluado-meta-item">
              <span class="material-symbols-outlined">work</span> ${d.Puesto}
            </span>
            <span class="ev-evaluado-meta-item">
              <span class="material-symbols-outlined">signal_cellular_alt</span> Nivel ${d.NivelEvaluado}
            </span>
          </div>
        </div>
        <div class="ev-evaluado-actions">
          <button class="btn-minimal btn-sm"
            onclick="verificaEvaluadores('${d.NoEmpleadoEvaluado}','${d.Nombre}')"
            data-bs-toggle="tooltip" data-bs-placement="left"
            title="Ver y gestionar evaluadores">
            <span class="material-symbols-outlined">group</span>
            Evaluadores
          </button>
        </div>
      </div>`;
  }).join('');

  initTooltips();
}

window.filtrarEvaluados = function() {
  const q = document.getElementById('txtBuscarEvaluado')?.value.toLowerCase() ?? '';
  document.querySelectorAll('#table_evaluados .ev-evaluado-card').forEach(card => {
    card.style.display = card.dataset.nombre.includes(q) ? '' : 'none';
  });
};


async function verificaEvaluadores(noEmpleado, name) {
  evaluadoSelected.value = noEmpleado;

  const titleEl = document.getElementById('offcanvas-evaluado-nombre');
  if (titleEl) titleEl.textContent = name;

  await list_evaluadores();

  const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvas_evaluadores'));
  offcanvas.show();
}

async function list_evaluadores() {
  const container = document.getElementById('ev-evaluadores-list');
  if (container) {
    container.innerHTML = '<div class="text-center py-3"><div class="spinner-border spinner-border-sm" style="color:#F59E0B;"></div></div>';
  }

  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, {
    op: "getlist_evaluadores",
    evaluado: evaluadoSelected.value,
    evaluacion: Evaluacion,
  }, 1);

  if (ajaxResponse !== undefined) {
    printList_evaluadores(ajaxResponse.Data);
  }
}

function printList_evaluadores(data) {
  const container = document.getElementById('ev-evaluadores-list');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-3" style="font-size:0.85rem;">Sin evaluadores asignados</p>';
    return;
  }

  const badgeClass = { 'JEFE': 'amber', 'PAR': 'teal', 'SUBORDINADO': 'blue' };

  // dispose tooltips sobre elementos que van a desaparecer
  container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    bootstrap.Tooltip.getInstance(el)?.dispose();
  });

  container.innerHTML = data.map(d => {
    const initials  = d.Nombre.trim().split(/\s+/).slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase();
    const badge     = badgeClass[d.TipoEvaluador] || 'gray';
    const tipoLabel = { JEFE: 'Evaluador tipo Jefe', PAR: 'Evaluador tipo Par', SUBORDINADO: 'Evaluador tipo Subordinado' }[d.TipoEvaluador] || d.TipoEvaluador;

    const actionBtn = d.StatusEvaluacion == 0
      ? `<span data-bs-toggle="tooltip" data-bs-placement="left"
              title="La evaluación ya fue iniciada, no se puede modificar"
              style="display:inline-flex;">
           <button class="btn-minimal-danger" disabled style="pointer-events:none;">
             <span class="material-symbols-outlined">block</span>
           </button>
         </span>`
      : `<button class="btn-minimal-danger"
           onclick="verificaDeleteEvaluador('${d.idEvaluacionDetalle}','${d.Nombre}')"
           data-bs-toggle="tooltip" data-bs-placement="left"
           title="Cancelar la evaluación de este evaluador">
           <span class="material-symbols-outlined">close</span>
         </button>`;

    return `
      <div class="ev-evaluador-card">
        <div class="ev-evaluador-info">
          <div class="ev-evaluador-avatar"
            data-bs-toggle="tooltip" data-bs-placement="top" title="${tipoLabel}">
            ${initials}
          </div>
          <div>
            <div class="ev-evaluador-name">${d.Nombre}</div>
            <span class="ev-sbadge ${badge}">${d.TipoEvaluador}</span>
          </div>
        </div>
        ${actionBtn}
      </div>`;
  }).join('');

  initTooltips();
}

async function verificaDeleteEvaluador(val, name) {
  const result = await Swal.fire({
    title: `¿Desea cancelar la evaluación del evaluador "${name}"?`,
    html: "Una vez cancelada, los datos no podrán ser recuperados.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cancelar",
    cancelButtonText: "No, mantener",
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#dc3545",
  });

  if (result.isConfirmed) {
    await deleteEvaluador(val);
  }
}

async function deleteEvaluador(val) {
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, {
    op: "deleteEvaluador",
    evaluador: val,
  }, 1);

  if (ajaxResponse !== undefined) {
    await list_evaluadores();
  }
}

$(document).on("click", "#btnNuevoEvaluador", async function () {
  const modal = new bootstrap.Modal(document.getElementById("modalEvaluadoresBootstrap"));
  modal.show();
});

async function getListPuestos() {
  const ajaxResponse = await pAjaxAsync(url_m_puestos, {
    op: "getListPuestosDivision",
    IdDivision: slcDivisionModal.value,
  }, 0);

  if (ajaxResponse.Resultado) {
    printListPuestos(ajaxResponse.Data);
  }
}

function printListPuestos(data) {
  slcPuestosModal.innerHTML = "";
  const first = document.createElement("option");
  first.value = ""; first.textContent = "Listado de Puestos"; first.disabled = true;
  slcPuestosModal.appendChild(first);

  data.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.IdPuesto; opt.textContent = d.Puesto;
    slcPuestosModal.appendChild(opt);
  });

  $("#slcPuestosModal").trigger("change");
}

async function getListDivisiones() {
  const ajaxResponse = await pAjaxAsync(url_m_Divisiones, { op: "getListDivisiones" }, 0);

  if (ajaxResponse.Resultado) {
    printListDivisiones(ajaxResponse.Datos);
  }
}

function printListDivisiones(data) {
  const first = document.createElement("option");
  first.value = ""; first.textContent = "Listado de Divisiones"; first.disabled = true;
  slcDivisionModal.appendChild(first);

  data.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.IdDivision; opt.textContent = d.Division;
    slcDivisionModal.appendChild(opt);
  });

  $("#slcDivisionModal").select2({
    width: "100%",
    dropdownParent: $("#modalEvaluadoresBootstrap"),
  });
}

$(document).on("change", "#slcDivisionModal", async function () {
  await getListPuestos();
  await getListSucursales();
  await getPosiblesEvaluadores();
});

$(document).on("change", "#slcPuestosModal",  async function () { await getPosiblesEvaluadores(); });
$(document).on("change", "#slcSucursalModal", async function () { await getPosiblesEvaluadores(); });

async function getListSucursales() {
  const ajaxResponse = await pAjaxAsync(url_m_Sucursal, {
    op: "getListSucursalPorDivision",
    IdDivision: slcDivisionModal.value,
  }, 0);

  if (ajaxResponse !== undefined) {
    printListSucursales(ajaxResponse.Data);
  }
}

function printListSucursales(data) {
  slcSucursalModal.innerHTML = "";
  const first = document.createElement("option");
  first.value = ""; first.textContent = "Listado de Sucursales"; first.disabled = true;
  slcSucursalModal.appendChild(first);

  data.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.IdSucursal; opt.textContent = d.Sucursal;
    slcSucursalModal.appendChild(opt);
  });

  $("#slcSucursalModal").trigger("change");
}

async function getPosiblesEvaluadores() {
  const ajaxResponse = await pAjaxAsync(url_m_Empleados, {
    op: "getPosiblesEvaluadores",
    IdSucursal: slcSucursalModal.value,
    IdPuesto:   slcPuestosModal.value,
    evaluado:   evaluadoSelected.value,
    evaluacion: Evaluacion,
  }, 1);

  if (ajaxResponse !== undefined) {
    _posiblesEvaluadoresData = ajaxResponse.Data;
    const buscar = document.getElementById('txtBuscarPosibleEvaluador');
    if (buscar) buscar.value = '';
    printPosiblesEvaluadores(_posiblesEvaluadoresData);
  }
}

function printPosiblesEvaluadores(data) {
  const container = document.getElementById('ev-posibles-evaluadores-list');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-3" style="font-size:0.85rem;">Sin empleados disponibles con los filtros seleccionados</p>';
    return;
  }

  container.innerHTML = data.map(d => {
    const initials = d.Empleado.trim().split(/\s+/).slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase();
    return `
      <div class="ev-evaluador-card" data-nombre="${d.Empleado.toLowerCase()}">
        <div class="ev-evaluador-info">
          <div class="ev-evaluador-avatar">${initials}</div>
          <div class="ev-evaluador-name">${d.Empleado}</div>
        </div>
        <button class="btn-minimal btn-sm"
          onclick="addEmpleadoEvaluador('${d.NoEmpleado}','${d.Empleado}')"
          data-bs-toggle="tooltip" data-bs-placement="left"
          title="Registrar como evaluador">
          <span class="material-symbols-outlined" style="font-size:16px;">person_add</span>
        </button>
      </div>`;
  }).join('');

  initTooltips();
}

window.filtrarPosiblesEvaluadores = function() {
  const q = document.getElementById('txtBuscarPosibleEvaluador')?.value.toLowerCase() ?? '';
  document.querySelectorAll('#ev-posibles-evaluadores-list .ev-evaluador-card').forEach(card => {
    card.style.display = card.dataset.nombre.includes(q) ? '' : 'none';
  });
};

async function addEmpleadoEvaluador(val, empleado) {
  const result = await Swal.fire({
    title: "¿Registrar como evaluador?",
    html: `Empleado: <strong>${empleado}</strong>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, registrar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#dc3545",
  });

  if (result.isConfirmed) {
    const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, {
      op:         "addEmpleadoEvaluador",
      evaluador:  val,
      evaluado:   evaluadoSelected.value,
      relacion:   modal_relacion.value,
      evaluacion: Evaluacion,
    }, 1);

    if (ajaxResponse !== undefined) {
      await list_evaluadores();
      await getPosiblesEvaluadores();

      Swal.fire({
        icon: "success",
        title: "Evaluador registrado",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
}
