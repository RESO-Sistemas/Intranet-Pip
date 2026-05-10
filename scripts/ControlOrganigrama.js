let organigramasData = [];

getOrganigramas();

async function getOrganigramas() {
  try {
    const raw = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: { op: "getOrganigramasControl" }
    });
    const sanitized = (typeof raw === "string") ? raw.trim().replace(/^﻿/, "") : JSON.stringify(raw);
    organigramasData = JSON.parse(sanitized);
    if (!Array.isArray(organigramasData)) organigramasData = [];
  } catch (e) {
    console.error(e);
    organigramasData = [];
  }
  renderCards(organigramasData);
}

function renderCards(data) {
  const container = document.getElementById("orgCardsContainer");
  const emptyState = document.getElementById("orgEmptyState");

  if (!data || data.length === 0) {
    container.innerHTML = "";
    emptyState.style.display = "";
    return;
  }
  emptyState.style.display = "none";

  container.innerHTML = data.map(org => {
    const id = btoa(org.idOrganigramas);
    const isActive = org.Status == 1;
    return `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3 org-card-col" data-title="${(org.Titulo || "").toLowerCase()}">
        <div class="org-card">
          <div class="d-flex align-items-start justify-content-between mb-2">
            <div class="org-card-icon">
              <span class="material-symbols-outlined">account_tree</span>
            </div>
            <span class="badge ${isActive ? "bg-success" : "bg-warning text-dark"}" style="font-size:11px;">
              ${isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div class="org-card-title-wrap">
            <div class="org-card-title" id="title_${id}" title="${escHtml(org.Titulo)}">${escHtml(org.Titulo)}</div>
          </div>
          <div class="org-card-meta">
            <span class="material-symbols-outlined" style="font-size:12px;vertical-align:-2px">calendar_today</span>
            ID #${org.idOrganigramas}
          </div>
          <div class="org-card-actions">
            <a class="org-card-btn" href="OrganigramaSv.php?Org=${id}" title="Editar estructura">
              <span class="material-symbols-outlined">edit</span>
              Editar
            </a>
            <a class="org-card-btn" href="organigrama.php" title="Ver organigrama">
              <span class="material-symbols-outlined">visibility</span>
              Ver
            </a>
          </div>
          <div class="org-card-actions mt-2">
            <button class="org-card-btn" onclick="startRename('${id}')" title="Renombrar">
              <span class="material-symbols-outlined">drive_file_rename_outline</span>
              Renombrar
            </button>
            <button class="org-card-btn" onclick="updateStatusOrganigrama('${id}')" title="Cambiar estado">
              <span class="material-symbols-outlined">autorenew</span>
              Estado
            </button>
            <button class="org-card-btn danger" onclick="deleteOrganigrama('${id}','${escAttr(org.Titulo)}')" title="Eliminar">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function escHtml(str) {
  return (str || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function escAttr(str) {
  return (str || "").replace(/'/g, "\\'");
}

// Filter by title
document.getElementById("orgSearchFilter").addEventListener("input", function() {
  const q = this.value.toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll(".org-card-col").forEach(col => {
    const match = col.dataset.title.includes(q);
    col.style.display = match ? "" : "none";
    if (match) visible++;
  });
  document.getElementById("orgSearchEmptyState").style.display = (q && visible === 0) ? "" : "none";
});

// Create new organigrama
document.getElementById("btnGuardarOrg").addEventListener("click", function() {
  if (!document.getElementById("formInsertaOrg").checkValidity()) {
    const msg = `<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Ingrese el título.</span></div>`;
    showBootstrapAlert(msg, "top-right", 5000);
    return;
  }
  event.preventDefault();
  const data = new FormData(document.getElementById("formInsertaOrg"));
  $.ajax({
    type: "post",
    url: "Backend/Organigramas/App.php",
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    success: function(response) {
      if (response != 0) {
        const parsed = JSON.parse(response.trim());
        if (parsed[0]["Retorno"] == 1) {
          window.location.href = `OrganigramaSv.php?Org=${parsed[0]["Organigrama"]}`;
        } else {
          showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">No se pudo crear el organigrama.</span></div>`, "top-right", 5000);
        }
      } else {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">Error al guardar el organigrama.</span></div>`, "top-right", 5000);
      }
    },
    error: function(e) { console.error(e); }
  });
});

document.getElementById("btnNewOrganigrama").addEventListener("click", function() {
  new bootstrap.Modal(document.getElementById("ModalNewOrganigrama")).show();
});

async function updateStatusOrganigrama(val) {
  try {
    const resp = await $.ajax({ type: "post", url: "Backend/Organigramas/App.php", data: { op: "updateStatusOrganigrama", idOrganigramas: val } });
    if (resp == 1) {
      showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Estado actualizado.</span></div>`, "top-right", 5000);
      getOrganigramas();
    }
  } catch(e) { console.error(e); }
}

function startRename(orgId) {
  const titleEl = document.getElementById(`title_${orgId}`);
  if (!titleEl) return;
  const wrap = titleEl.parentElement;
  if (!wrap || wrap.querySelector("input")) return;
  const current = titleEl.textContent;
  wrap.innerHTML = `
    <div class="org-card-title-wrap" style="position:relative;">
      <input class="org-card-title-input" id="input_${orgId}" value="${escHtml(current)}" maxlength="120">
      <button class="org-card-title-save" onclick="saveRename('${orgId}')" title="Guardar">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>`;
  const inp = document.getElementById(`input_${orgId}`);
  inp.focus();
  inp.select();
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") saveRename(orgId);
    if (e.key === "Escape") getOrganigramas();
  });
}

async function saveRename(orgId) {
  const inp = document.getElementById(`input_${orgId}`);
  const newTitle = inp?.value?.trim();
  if (!newTitle) { inp?.focus(); return; }
  try {
    const resp = await $.ajax({ type: "post", url: "Backend/Organigramas/App.php", data: { op: "updateOrganigramaTitulo", idOrganigramas: orgId, Titulo: newTitle } });
    if (resp == 1) {
      showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Título actualizado.</span></div>`, "top-right", 3000);
      getOrganigramas();
    }
  } catch(e) { console.error(e); }
}

async function deleteOrganigrama(orgId, title) {
  const result = await Swal.fire({
    title: "Eliminar organigrama",
    text: `Se eliminará "${title}" y todos sus elementos. Esta acción no se puede deshacer.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#dc3545"
  });
  if (!result.isConfirmed) return;
  try {
    const resp = await $.ajax({ type: "post", url: "Backend/Organigramas/App.php", data: { op: "deleteOrganigrama", idOrganigramas: orgId } });
    if (resp == 1) {
      showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Organigrama eliminado.</span></div>`, "top-right", 5000);
      getOrganigramas();
    }
  } catch(e) { console.error(e); }
}
