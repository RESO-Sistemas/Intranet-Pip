// Sincronizador RH — UI. Consume Backend/Sincronizador/App.php (CRUD/preview) y Stream.php (sync).
const API = "Backend/Sincronizador/App.php";
const STREAM = "Backend/Sincronizador/Stream.php";
const WATCHDOG_MS = 30000; // sin avance => corta el stream y reconecta por polling
const POLL_MS = 1500;

let servidorActual = null;
let servidores = [];
let syncCtrl = null;
let modalServidor;
let modalBitacora;
let syncEnCurso = false;
let servidorEnCurso = null;
let pollTimer = null;

function notify(ok, msg) {
  if (window.toastr) ok ? toastr.success(msg) : toastr.error(msg);
  else console[ok ? "log" : "error"](msg);
}

async function call(op, params = {}) {
  const body = new FormData();
  body.append("op", op);
  Object.entries(params).forEach(([k, v]) => body.append(k, v));
  const res = await fetch(API, { method: "POST", body });
  const txt = await res.text();
  try { return JSON.parse(txt); } catch { throw new Error(txt.slice(0, 300)); }
}

const fmtFecha = (f) => (f ? f.replace("T", " ").slice(0, 16) : "—");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function badgeEstado(estado) {
  if (estado === "nuevo") return `<span class="badge badge-soft-success">Nuevo</span>`;
  if (estado === "actualizar") return `<span class="badge badge-soft-warning">Actualizar</span>`;
  return `<span class="badge badge-soft-muted">Omitir</span>`;
}

// --------------------------------------------------------------- Servidores

function cardServidor(s) {
  const sync = s.ultima_sync ? `Última: ${fmtFecha(s.ultima_sync)}` : "Sin sincronizar";
  const activo = s.activo == 1;
  return `
    <div class="col-12 col-md-6 col-xl-4">
      <div class="sync-server-card h-100 p-3">
        <div class="d-flex align-items-start gap-3">
          <div class="sync-server-ico"><i class="material-icons-outlined">dns</i></div>
          <div class="flex-grow-1 min-w-0">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold">${esc(s.nombre)}</span>
              <span class="badge ${activo ? "badge-soft-success" : "badge-soft-muted"}">${activo ? "Activo" : "Inactivo"}</span>
            </div>
            <div class="text-muted small text-truncate">${esc(s.base_url)}</div>
            <div class="text-muted small mt-1">${sync}</div>
          </div>
          <div class="dropdown">
            <button class="btn btn-minimal btn-minimal-secondary btn-sm px-2" data-bs-toggle="dropdown">
              <i class="material-icons-outlined" style="font-size:18px;">more_vert</i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" data-editar="${esc(s.id_servidor)}">Editar</a></li>
              <li><a class="dropdown-item text-danger" href="#" data-eliminar="${esc(s.id_servidor)}">Eliminar</a></li>
            </ul>
          </div>
        </div>
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-minimal btn-minimal-secondary btn-sm flex-fill" data-probar="${esc(s.id_servidor)}">Probar</button>
          <button class="btn btn-minimal btn-minimal-success btn-sm flex-fill" data-preview="${esc(s.id_servidor)}" ${activo ? "" : "disabled"}>Vista previa</button>
        </div>
      </div>
    </div>`;
}

async function cargarServidores() {
  const grid = document.getElementById("gridServidores");
  try {
    servidores = await call("getServidores");
    grid.innerHTML = servidores.length
      ? servidores.map(cardServidor).join("")
      : `<div class="col-12 text-center text-muted py-4">Sin servidores. Crea uno con «Nuevo servidor».</div>`;
  } catch (e) {
    grid.innerHTML = `<div class="col-12 text-center text-danger py-4">Error: ${esc(e.message)}</div>`;
  }
}

// ------------------------------------------------------------ CRUD servidor

function abrirModalServidor(modo, s = null) {
  document.getElementById("srvModo").value = modo;
  document.getElementById("modalServidorTitulo").textContent = modo === "crear" ? "Nuevo servidor" : "Editar servidor";
  const id = document.getElementById("srvId");
  id.value = s ? s.id_servidor : "";
  id.readOnly = modo === "editar";
  document.getElementById("srvNombre").value = s ? s.nombre : "";
  document.getElementById("srvUrl").value = s ? s.base_url : "";
  document.getElementById("srvActivo").checked = s ? s.activo == 1 : true;
  modalServidor.show();
}

async function guardarServidor() {
  const modo = document.getElementById("srvModo").value;
  const params = {
    id: document.getElementById("srvId").value.trim(),
    nombre: document.getElementById("srvNombre").value.trim(),
    baseUrl: document.getElementById("srvUrl").value.trim(),
    activo: document.getElementById("srvActivo").checked ? 1 : 0,
  };
  try {
    const res = await call(modo === "crear" ? "crearServidor" : "actualizarServidor", params);
    if (res.Resultado) { notify(true, res.Msg); modalServidor.hide(); cargarServidores(); }
    else notify(false, res.Msg);
  } catch (e) { notify(false, e.message); }
}

async function eliminarServidor(id) {
  const s = servidores.find((x) => x.id_servidor == id);
  if (!confirm(`¿Eliminar el servidor «${s ? s.nombre : id}»?\nLos datos ya migrados permanecen en la base.`)) return;
  try {
    const res = await call("eliminarServidor", { id });
    res.Resultado ? notify(true, res.Msg) : notify(false, res.Msg);
    cargarServidores();
  } catch (e) { notify(false, e.message); }
}

// ----------------------------------------------------------------- Preview

function statCard(label, icon, c) {
  return `
    <div class="col-6 col-lg-3">
      <div class="sync-stat p-3 h-100">
        <div class="d-flex align-items-center justify-content-between">
          <span class="text-muted small fw-semibold">${label}</span>
          <i class="material-icons-outlined text-muted" style="font-size:20px;">${icon}</i>
        </div>
        <div class="num mt-2">${c.nuevos + c.actualizar}</div>
        <div class="mt-2 d-flex gap-1 flex-wrap">
          <span class="badge badge-soft-success">${c.nuevos} nuevos</span>
          <span class="badge badge-soft-warning">${c.actualizar} actualizar</span>
          ${c.omitir ? `<span class="badge badge-soft-muted">${c.omitir} omitir</span>` : ""}
        </div>
      </div>
    </div>`;
}

function tabla(headers, rows) {
  if (!rows.length) return `<div class="text-muted small py-3">Sin registros.</div>`;
  return `
    <div class="table-responsive">
      <table class="table sync-table mb-0">
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>`;
}

function badgeNivel(n, desc) {
  if (n === null || n === undefined) return "—";
  return `<span class="badge badge-soft-info">${n} · ${esc(desc)}</span>`;
}

function renderTablas(det) {
  const suc = tabla(["ID origen", "Nombre", "Estado"],
    det.sucursales.map((x) => `<tr><td>${x.id_origen}</td><td>${esc(x.nombre)}</td><td>${badgeEstado(x.estado)}</td></tr>`));
  const are = tabla(["ID origen", "Área", "Sucursal", "Estado"],
    det.areas.map((x) => `<tr><td>${x.id_origen}</td><td>${esc(x.nombre)}</td><td>${esc(x.sucursal)}</td><td>${badgeEstado(x.estado)}</td></tr>`));
  const pue = tabla(["ID origen", "Tipo de puesto", "Área", "Nivel", "Estado"],
    det.puestos.map((x) => `<tr><td>${x.id_origen}</td><td>${esc(x.descripcion)}</td><td>${esc(x.area)}</td><td>${badgeNivel(x.nivel, x.nivel_desc)}</td><td>${badgeEstado(x.estado)}</td></tr>`));
  const emp = tabla(["ID origen", "Nombre", "Puesto", "Sucursal", "Nivel", "Estatus", "Estado"],
    det.empleados.map((x) => `<tr>
        <td>${x.id_origen}</td><td>${esc(x.nombre)}</td><td>${esc(x.puesto)}</td><td>${esc(x.sucursal)}</td>
        <td>${badgeNivel(x.nivel, x.nivel_desc)}</td>
        <td>${x.status == 1 ? `<span class="badge badge-soft-success">Activo</span>` : `<span class="badge badge-soft-muted">Baja</span>`}</td>
        <td>${badgeEstado(x.estado)}</td></tr>`));

  const tabs = [
    ["sucursales", "Sucursales", det.sucursales.length, suc],
    ["areas", "Áreas", det.areas.length, are],
    ["puestos", "Puestos", det.puestos.length, pue],
    ["empleados", "Empleados", det.empleados.length, emp],
  ];
  document.getElementById("previewTabs").innerHTML = tabs
    .map(([id, lbl, n], i) => `
      <li class="nav-item">
        <button class="nav-link ${i === 0 ? "active" : ""}" data-bs-toggle="pill"
          data-bs-target="#tab-${id}" type="button">${lbl} <span class="badge badge-soft-muted ms-1">${n}</span></button>
      </li>`).join("");
  document.getElementById("previewTabContent").innerHTML = tabs
    .map(([id, , , html], i) => `<div class="tab-pane fade ${i === 0 ? "show active" : ""}" id="tab-${id}">${html}</div>`).join("");
}

function renderPreview(data) {
  const panel = document.getElementById("panelPreview");
  panel.classList.remove("d-none");
  document.getElementById("zonaProgreso").classList.add("d-none");
  document.getElementById("zonaDetalle").classList.remove("d-none");
  document.getElementById("previewServidor").textContent = data.Servidor;
  const r = data.Resumen;
  document.getElementById("statCards").innerHTML =
    statCard("Sucursales", "store", r.sucursales) +
    statCard("Áreas", "category", r.areas) +
    statCard("Puestos", "badge", r.puestos) +
    statCard("Empleados", "groups", r.empleados);
  renderTablas(data.Detalle);
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function previsualizar(id) {
  servidorActual = id;
  const tag = document.getElementById("previewTag");
  tag.textContent = "Vista previa";
  tag.className = "badge badge-soft-info";
  streamPreview();
}

// ------------------------------------------------- Sincronización (streaming)

function logPaso(msg) {
  const log = document.getElementById("progLog");
  const t = new Date().toLocaleTimeString();
  log.insertAdjacentHTML("beforeend",
    `<div class="log-row"><span class="log-time">${t}</span> <span class="log-msg">· ${esc(msg)}</span></div>`);
  log.scrollTop = log.scrollHeight;
}

function actualizarProgreso(evt) {
  const pct = Math.max(0, Math.min(100, evt.pct ?? 0));
  document.getElementById("progBar").style.width = pct + "%";
  document.getElementById("progPct").textContent = pct + "%";
  if (evt.msg) {
    document.getElementById("progMsg").textContent = evt.msg;
    logPaso(evt.msg);
  }
}

function abrirProgreso(titulo) {
  document.getElementById("panelPreview").classList.remove("d-none");
  document.getElementById("zonaDetalle").classList.add("d-none");
  document.getElementById("zonaProgreso").classList.remove("d-none");
  document.getElementById("progTitulo").textContent = titulo;
  document.getElementById("progSpinner").classList.remove("d-none");
  document.getElementById("progBar").className = "progress-bar progress-bar-striped progress-bar-animated";
  document.getElementById("progBar").style.width = "0%";
  document.getElementById("progPct").textContent = "0%";
  document.getElementById("progMsg").textContent = "Iniciando…";
  document.getElementById("progLog").innerHTML = "";
  const btnC = document.getElementById("btnCancelarSync");
  btnC.textContent = "Cancelar";
  btnC.className = "btn btn-minimal btn-minimal-danger btn-sm";
  btnC.disabled = false;
  document.getElementById("panelPreview").scrollIntoView({ behavior: "smooth", block: "start" });
}

function progresoError(fin, cancelado) {
  document.getElementById("progSpinner").classList.add("d-none");
  const bar = document.getElementById("progBar");
  bar.classList.remove("progress-bar-animated", "progress-bar-striped");
  bar.classList.add("bg-danger");
  const btn = document.getElementById("btnCancelarSync");
  btn.textContent = "Cerrar";
  btn.className = "btn btn-minimal btn-minimal-secondary btn-sm";
  const msg = (fin && fin.data && fin.data.Msg) || (cancelado ? "Proceso cancelado" : "Error desconocido");
  document.getElementById("progTitulo").textContent = cancelado ? "Proceso cancelado" : "Error";
  document.getElementById("progMsg").textContent = msg;
  logPaso(msg);
  notify(false, msg);
}

function progresoOk(titulo) {
  document.getElementById("progSpinner").classList.add("d-none");
  const bar = document.getElementById("progBar");
  bar.style.width = "100%";
  bar.classList.remove("progress-bar-animated", "progress-bar-striped");
  bar.classList.add("bg-success");
  document.getElementById("progPct").textContent = "100%";
  document.getElementById("progTitulo").textContent = titulo;
  const btn = document.getElementById("btnCancelarSync");
  btn.textContent = "Cerrar";
  btn.className = "btn btn-minimal btn-minimal-secondary btn-sm";
}

/** Lee el cuerpo NDJSON; llama actualizarProgreso por paso; devuelve el evento {fin}. */
async function leerStream(res, onChunk) {
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "", fin = null;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line) continue;
      if (onChunk) onChunk();
      let evt; try { evt = JSON.parse(line); } catch { continue; }
      if (evt.fin) fin = evt; else actualizarProgreso(evt);
    }
  }
  return fin;
}

// ---- Vista previa (read-only; no corre en segundo plano) ----
async function streamPreview() {
  abrirProgreso("Generando vista previa…");
  const ctrl = new AbortController();
  syncCtrl = ctrl;
  let wd;
  const armar = () => { clearTimeout(wd); wd = setTimeout(() => ctrl.abort(), WATCHDOG_MS); };
  armar();
  try {
    const body = new FormData();
    body.append("idServidor", servidorActual);
    body.append("accion", "preview");
    const res = await fetch(STREAM, { method: "POST", body, signal: ctrl.signal });
    if (!res.ok || !res.body) throw new Error("No se pudo iniciar (HTTP " + res.status + ")");
    const fin = await leerStream(res, armar);
    clearTimeout(wd);
    if (fin && fin.ok) renderPreview(fin.data);
    else progresoError(fin, false);
  } catch (e) {
    clearTimeout(wd);
    progresoError({ data: { Msg: e.name === "AbortError" ? "Tiempo de espera agotado" : e.message } }, e.name === "AbortError");
  } finally {
    syncCtrl = null;
  }
}

// ---- Sincronización (segundo plano + reconexión) ----
async function confirmar() {
  if (!servidorActual) return;
  abrirProgreso("Sincronizando…");
  syncEnCurso = true;
  servidorEnCurso = servidorActual;
  const ctrl = new AbortController();
  syncCtrl = ctrl;
  let wd;
  const armar = () => { clearTimeout(wd); wd = setTimeout(() => ctrl.abort(), WATCHDOG_MS); };
  armar();

  let fin = null;
  try {
    const body = new FormData();
    body.append("idServidor", servidorEnCurso);
    body.append("accion", "sync");
    const res = await fetch(STREAM, { method: "POST", body, signal: ctrl.signal });
    if (!res.ok || !res.body) throw new Error("No se pudo iniciar (HTTP " + res.status + ")");
    fin = await leerStream(res, armar);
  } catch (e) {
    // Stream cortado (red/timeout/cierre): el server puede seguir → reconectar por estado.
    clearTimeout(wd); syncCtrl = null;
    reattach(servidorEnCurso);
    return;
  }
  clearTimeout(wd); syncCtrl = null;
  fin ? aplicarFinSync(fin) : reattach(servidorEnCurso);
}

function aplicarFinSync(fin) {
  syncEnCurso = false;
  cargarServidores();
  cargarBitacora();
  if (fin.ok) {
    progresoOk("Sincronización completada");
    notify(true, "Sincronización completada");
    setTimeout(() => previsualizar(servidorEnCurso), 1000);
  } else {
    const cancelado = fin.data && fin.data.Estado === "cancelado";
    progresoError(fin, cancelado);
  }
}

/** Reconecta a una sincronización en curso por polling de SyncEstado. */
function reattach(servidor) {
  servidorActual = servidor;
  servidorEnCurso = servidor;
  syncEnCurso = true;
  abrirProgreso("Sincronización en curso…");
  document.getElementById("progMsg").textContent = "Reconectando…";
  clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    let est;
    try { est = await call("getEstadoSync", { idServidor: servidor }); } catch { return; }
    if (est.estado === "corriendo") {
      actualizarProgreso({ pct: +est.pct, msg: est.msg });
      return;
    }
    clearInterval(pollTimer);
    syncEnCurso = false;
    cargarServidores();
    cargarBitacora();
    if (est.estado === "ok") {
      progresoOk("Sincronización completada");
      notify(true, "Sincronización completada");
      setTimeout(() => previsualizar(servidor), 1000);
    } else {
      progresoError({ data: { Msg: est.msg || est.estado } }, est.estado === "cancelado");
    }
  }, POLL_MS);
}

async function checkEnCurso() {
  for (const s of servidores) {
    try {
      const est = await call("getEstadoSync", { idServidor: s.id_servidor });
      if (est.estado === "corriendo") { reattach(s.id_servidor); break; }
    } catch { /* ignora */ }
  }
}

async function probar(id) {
  try {
    const res = await call("probarConexion", { idServidor: id });
    res.Resultado ? notify(true, `Conexión OK · ${res.Sucursales} sucursal(es)`) : notify(false, res.Msg || "Falló la conexión");
  } catch (e) { notify(false, e.message); }
}

// ------------------------------------------------------------------ Bitácora

let bitDetalle = [];
let bitFiltroEntidad = "";
let bitFiltroAccion = "";

function bitEstadoBadge(estado) {
  const map = {
    ok: ["badge-soft-success", "Completada"],
    error: ["badge-soft-danger", "Error"],
    cancelado: ["badge-soft-muted", "Cancelada"],
    corriendo: ["badge-soft-info", "En curso"],
    muerto: ["badge-soft-danger", "Interrumpida"],
  };
  const [cls, txt] = map[estado] || ["badge-soft-muted", estado];
  return `<span class="badge ${cls}">${txt}</span>`;
}

function bitCount(ins, upd) {
  const i = +ins || 0, u = +upd || 0;
  if (!i && !u) return `<span class="text-muted">—</span>`;
  return `${i ? `<span class="badge badge-soft-success">${i}</span>` : ""} ${u ? `<span class="badge badge-soft-warning">${u}</span>` : ""}`;
}

function fmtDur(s) {
  s = +s || 0;
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function rowBitacora(b) {
  return `
    <tr style="cursor:pointer" data-bitacora="${b.idBitacora}">
      <td class="text-nowrap">${fmtFecha(b.inicio)}</td>
      <td class="fw-semibold">${esc(b.servidor_nombre || b.servidor)}</td>
      <td>${b.accion === "preview"
        ? `<span class="badge badge-soft-info">Vista previa</span>`
        : `<span class="badge badge-soft-success">Sincronización</span>`}</td>
      <td>${esc(b.usuario || "—")}</td>
      <td>${bitEstadoBadge(b.estado)}</td>
      <td>${bitCount(b.suc_ins, b.suc_upd)}</td>
      <td>${bitCount(b.area_ins, b.area_upd)}</td>
      <td>${bitCount(b.pue_ins, b.pue_upd)}</td>
      <td>${bitCount(b.emp_ins, b.emp_upd)}</td>
      <td>${+b.omitidos ? `<span class="badge badge-soft-muted">${b.omitidos}</span>` : `<span class="text-muted">—</span>`}</td>
      <td class="text-nowrap">${b.fin ? fmtDur(b.duracion_seg) : "—"}</td>
    </tr>`;
}

async function cargarBitacora() {
  const tb = document.getElementById("tbodyBitacora");
  try {
    const data = await call("getBitacora", { limit: 50 });
    tb.innerHTML = data.length
      ? data.map(rowBitacora).join("")
      : `<tr><td colspan="11" class="text-center text-muted py-3">Aún no hay corridas.</td></tr>`;
  } catch (e) {
    tb.innerHTML = `<tr><td colspan="11" class="text-center text-danger py-3">Error: ${esc(e.message)}</td></tr>`;
  }
}

function renderBitDetalle() {
  const rows = bitDetalle.filter((d) =>
    (!bitFiltroEntidad || d.entidad === bitFiltroEntidad) &&
    (!bitFiltroAccion || d.accion === bitFiltroAccion));
  const accBadge = (a) => a === "insert"
    ? `<span class="badge badge-soft-success">insert</span>`
    : a === "update" ? `<span class="badge badge-soft-warning">update</span>`
    : `<span class="badge badge-soft-muted">omit</span>`;
  document.getElementById("tbodyBitDetalle").innerHTML = rows.length
    ? rows.map((d) => `<tr>
        <td>${esc(d.entidad)}</td><td>${accBadge(d.accion)}</td>
        <td>${d.id_origen ?? "—"}</td><td>${d.id_local ?? "—"}</td>
        <td>${esc(d.descripcion || "")}</td></tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted py-3">Sin registros para el filtro.</td></tr>`;
}

function renderBitFiltros() {
  const ents = ["", "SUCURSAL", "AREA", "PUESTO", "EMPLEADO", "JERARQUIA"];
  const accs = ["", "insert", "update", "omit"];
  const chip = (val, cur, grupo) => {
    const lbl = val || "Todos";
    const active = val === cur ? "btn-minimal-success" : "btn-minimal-secondary";
    return `<button class="btn btn-minimal ${active} btn-sm" data-fil="${grupo}" data-val="${val}">${lbl}</button>`;
  };
  document.getElementById("bitFiltros").innerHTML =
    `<div class="d-flex gap-1 flex-wrap me-3">${ents.map((e) => chip(e, bitFiltroEntidad, "entidad")).join("")}</div>` +
    `<div class="d-flex gap-1 flex-wrap">${accs.map((a) => chip(a, bitFiltroAccion, "accion")).join("")}</div>`;
}

async function abrirDetalleBitacora(id) {
  bitFiltroEntidad = ""; bitFiltroAccion = "";
  document.getElementById("bitTitulo").textContent = `Detalle de corrida #${id}`;
  document.getElementById("tbodyBitDetalle").innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">Cargando…</td></tr>`;
  renderBitFiltros();
  modalBitacora.show();
  try {
    bitDetalle = await call("getBitacoraDetalle", { idBitacora: id });
    renderBitDetalle();
  } catch (e) {
    document.getElementById("tbodyBitDetalle").innerHTML = `<tr><td colspan="5" class="text-center text-danger py-3">Error: ${esc(e.message)}</td></tr>`;
  }
}

// ------------------------------------------------------------------ Eventos

document.addEventListener("click", (ev) => {
  const a = (attr) => ev.target.closest(`[${attr}]`);
  const preview = a("data-preview"), probarBtn = a("data-probar");
  const editar = a("data-editar"), eliminar = a("data-eliminar");
  const bitRow = a("data-bitacora"), filtro = a("data-fil");
  if (preview) previsualizar(preview.dataset.preview);
  if (probarBtn) probar(probarBtn.dataset.probar);
  if (editar) { ev.preventDefault(); abrirModalServidor("editar", servidores.find((s) => s.id_servidor == editar.dataset.editar)); }
  if (eliminar) { ev.preventDefault(); eliminarServidor(eliminar.dataset.eliminar); }
  if (bitRow) abrirDetalleBitacora(bitRow.dataset.bitacora);
  if (filtro) {
    if (filtro.dataset.fil === "entidad") bitFiltroEntidad = filtro.dataset.val;
    else bitFiltroAccion = filtro.dataset.val;
    renderBitFiltros();
    renderBitDetalle();
  }
});

async function onCancelar() {
  if (syncEnCurso) {
    // Cancelación cooperativa por flag en BD (no aborta el proceso de golpe).
    const btn = document.getElementById("btnCancelarSync");
    btn.textContent = "Cancelando…";
    btn.disabled = true;
    try { await call("cancelarSync", { idServidor: servidorEnCurso }); } catch { /* ignora */ }
    setTimeout(() => { btn.disabled = false; }, 1500);
    return;
  }
  // Estado "Cerrar": ocultar progreso; si no hay detalle, cerrar el panel.
  if (syncCtrl) syncCtrl.abort();
  clearInterval(pollTimer);
  document.getElementById("zonaProgreso").classList.add("d-none");
  if (document.getElementById("zonaDetalle").classList.contains("d-none")) {
    document.getElementById("panelPreview").classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  modalServidor = new bootstrap.Modal("#modalServidor");
  modalBitacora = new bootstrap.Modal("#modalBitacora");

  document.getElementById("btnNuevoServidor").addEventListener("click", () => abrirModalServidor("crear"));
  document.getElementById("btnGuardarServidor").addEventListener("click", guardarServidor);
  document.getElementById("btnConfirmar").addEventListener("click", confirmar);
  document.getElementById("btnCerrarPreview").addEventListener("click", () =>
    document.getElementById("panelPreview").classList.add("d-none"));
  document.getElementById("btnCancelarSync").addEventListener("click", onCancelar);
  document.getElementById("btnRefrescarBitacora").addEventListener("click", cargarBitacora);

  window.addEventListener("beforeunload", (e) => {
    if (syncEnCurso) { e.preventDefault(); e.returnValue = ""; } // la sync sigue en segundo plano
  });

  cargarServidores().then(checkEnCurso);
  cargarBitacora();
});
