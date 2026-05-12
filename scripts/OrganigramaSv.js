/* ================================================================
   OrganigramaSv.js — Editor full-screen de organigramas
   ================================================================ */

const Organigrama = new URLSearchParams(window.location.search).get("Org");

let datosOrg  = [];   // datos formateados para Syncfusion
let rawOrg    = [];   // datos crudos de getDetalleOrganigrama
let diagram   = null;
let selectedNodeRawId = null; // idDetalleOrganigrama del nodo seleccionado

/* ── Init ──────────────────────────────────────────────────── */
(async function init() {
    await loadTitulo();
    await loadOrganigrama();
    printDiagram();
    diagram.appendTo("#element");
    checkEmptyState();
    buildTreePanel();
    initLeftPanelSearch();
    initTipoRadios("add");
    initTipoRadios("edit");
    initTitleEditable();
    bindToolbarButtons();
    bindPropertyPanelButtons();
    bindOffcanvasEvents();

    // Auto-layout cuando los nodos no tienen posición guardada (todos en 0,0)
    if (needsAutoLayout()) {
        setTimeout(() => doAutoLayout(true), 300);
    } else if (datosOrg.length > 0) {
        setTimeout(() => svSafeFitToPage(), 150);
    }
})();

function needsAutoLayout() {
    if (datosOrg.length < 2) return false;
    const noPos = datosOrg.filter(d => !d.offsetX && !d.offsetY).length;
    return noPos > datosOrg.length / 2;
}

/* ── Título organigrama ────────────────────────────────────── */
async function loadTitulo() {
    try {
        const resp = await $.ajax({
            type: "post", url: "Backend/Organigramas/App.php",
            data: { op: "getTituloOrganigrama", idOrganigramas: Organigrama },
            dataType: "json"
        });
        const titulo = resp.Titulo || "Organigrama";
        document.getElementById("orgTitulo").textContent = titulo;
        document.title = titulo + " · PIP";
    } catch(e) { console.error(e); }
}

function initTitleEditable() {
    const el = document.getElementById("orgTitulo");
    const btn = document.getElementById("btnSaveTitle");

    const saveTitle = async () => {
        const val = el.textContent.trim();
        if (!val) { el.textContent = "Sin título"; return; }
        try {
            await $.ajax({
                type: "post", url: "Backend/Organigramas/App.php",
                data: { op: "updateOrganigramaTitulo", idOrganigramas: Organigrama, Titulo: val }
            });
        } catch(e) { console.error(e); }
        el.blur();
    };

    el.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); saveTitle(); } });
    btn.addEventListener("click", saveTitle);
}

/* ── Cargar datos organigrama ──────────────────────────────── */
async function loadOrganigrama() {
    datosOrg = [];
    rawOrg   = [];
    try {
        const respuesta = await $.ajax({
            type: "post", url: "Backend/Organigramas/App.php",
            data: { op: "getDetalleOrganigrama", idOrganigramas: Organigrama },
            dataType: "json"
        });
        (respuesta || []).forEach(d => {
            rawOrg.push(d);
            const base = {
                id:       `node_${d.idDetalleOrganigrama}`,
                name:     d.Nombre,
                role:     d.Puesto,
                offsetY:  Number(d.CoordenadaY),
                offsetX:  Number(d.CoordenadaX),
                imageUrl: d.Imagen,
                Width:    Number(d.Ancho)  || 210,
                Height:   Number(d.Altura) || 72,
                rawId:    d.idDetalleOrganigrama,
                tipo:     d.Tipo,
                noEmp:    d.NoEmpleadoHijo
            };
            if (d.idDetalleOrganigramaPadre != 0) {
                base.manager = `node_${d.idDetalleOrganigramaPadre}`;
            }
            datosOrg.push(base);
        });
    } catch(e) { console.error(e); }
}

/* ── Diagram Syncfusion ────────────────────────────────────── */
function printDiagram() {
    const items = new ej.data.DataManager(datosOrg);
    diagram = new ej.diagrams.Diagram({
        width: "100%",
        height: "100%",
        dataSourceSettings: {
            id: "id",
            parentId: "manager",
            dataManager: items,
            doBinding: function(node, data) {
                node.annotations = [];
                node.style = { fill: "transparent", strokeColor: "transparent" };
                node.shape = {
                    type: "HTML",
                    content: buildNodeHTML(data)
                };
            }
        },
        getNodeDefaults:    nodeDefaults,
        getConnectorDefaults: connectorDefaults,
        positionChange:     onPositionChange,
        sizeChange:         onSizeChange,
        selectionChange:    onSelectionChange,
        scrollSettings:     { minZoom: 0.25, maxZoom: 3 }
    });
}

function buildNodeHTML(data) {
    const esc = s => (s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const name     = esc(data.name || "");
    const role     = esc(data.role || "");
    const initials = (data.name || "?").split(" ").filter(Boolean).slice(0, 2)
        .map(w => w.charAt(0).toUpperCase()).join("");
    const tipoMap  = { PRINCIPAL: ["#111","#ffc107","Principal"], EMPLEADO: ["#1e40af","#dbeafe","Empleado"], OTROS: ["#374151","#f3f4f6","Otro"] };
    const [tc, bg, lbl] = tipoMap[data.tipo] || ["#374151","#f3f4f6","—"];
    const tipoBadge = `<span style="display:inline-block;font-size:9px;font-weight:700;padding:1px 6px;border-radius:4px;background:${bg};color:${tc};letter-spacing:.04em;text-transform:uppercase;">${lbl}</span>`;

    return `<div style="width:100%;height:100%;background:#fff;border:1.5px solid #e5e7eb;border-top:4px solid #ffc107;border-radius:8px;overflow:hidden;box-sizing:border-box;padding:0 14px;pointer-events:none;">
        <table style="width:100%;height:100%;border-collapse:collapse;table-layout:fixed;"><tr>
            <td style="width:46px;vertical-align:middle;padding:0;">
                <span style="display:flex;width:40px;height:40px;border-radius:50%;background:#ffc107;color:#111;font-size:13px;font-weight:800;align-items:center;justify-content:center;letter-spacing:-0.5px;">${initials}</span>
            </td>
            <td style="vertical-align:middle;padding:0 0 0 12px;overflow:hidden;">
                <div style="font-size:12px;font-weight:700;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px;">${name}</div>
                <div style="font-size:10px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:5px;">${role}</div>
                ${tipoBadge}
            </td>
        </tr></table>
    </div>`;
}

function nodeDefaults(node) {
    node.offsetX = node.data.offsetX || 200;
    node.offsetY = node.data.offsetY || 200;
    node.width   = 240;
    node.height  = 100;
    return node;
}

function connectorDefaults(connector) {
    connector.type = "Orthogonal";
    connector.targetDecorator = { shape: "None" };
    connector.style = { strokeColor: "#212121", strokeWidth: 1.5 };
    return connector;
}

/* ── Position / size persistence ──────────────────────────── */
async function onPositionChange(args) {
    if (args.state !== "Completed") return;
    const x = args.newValue.offsetX;
    const y = args.newValue.offsetY;
    const rawId = args.source.data ? args.source.data.rawId
                                   : args.source.nodes?.[0]?.data?.rawId;
    if (!rawId) return;
    await $.ajax({
        type: "post", url: "Backend/Organigramas/App.php",
        data: { op: "changePositionNodeOrganigrama", y, x, do: btoa(Number(rawId)) }
    });
}

async function onSizeChange(args) {
    if (args.state !== "Completed") return;
    const { offsetX: x, offsetY: y, height, width } = args.newValue;
    const rawId = args.source.nodes?.[0]?.data?.rawId;
    if (!rawId) return;
    await $.ajax({
        type: "post", url: "Backend/Organigramas/App.php",
        data: { op: "sizeChangeNodeOrganigrama", y, x, w: width, a: height, do: btoa(Number(rawId)) }
    });
}

/* ── Selection → properties panel ─────────────────────────── */
function onSelectionChange(args) {
    if (args.state !== "Completed") return;
    if (args.newValue && args.newValue.length > 0 && args.newValue[0].data) {
        showPropsPanel(args.newValue[0]);
    } else {
        closePropsPanel();
    }
}

function showPropsPanel(node) {
    const d = node.data;
    selectedNodeRawId = d.rawId;

    document.getElementById("propNodeRawId").value = d.rawId;
    const ini = (d.name || "?").split(" ").filter(Boolean).slice(0,2).map(w=>w.charAt(0).toUpperCase()).join("");
    const iniEl = document.getElementById("propEmpInitials");
    if (iniEl) iniEl.textContent = ini;
    document.getElementById("propEmpName").textContent  = d.name;
    document.getElementById("propEmpRole").textContent  = d.role || "—";

    const tipoEl = document.getElementById("propEmpTipo");
    const tipoMap = { PRINCIPAL: ["principal","Principal"], EMPLEADO: ["empleado","Empleado"], OTROS: ["otros","Otros"] };
    const [cls, lbl] = tipoMap[d.tipo] || ["empleado","—"];
    tipoEl.className = `org-prop-tipo ${cls}`;
    tipoEl.textContent = lbl;

    document.getElementById("orgRightPanel").classList.add("open");
}

function closePropsPanel() {
    document.getElementById("orgRightPanel").classList.remove("open");
    selectedNodeRawId = null;
}

/* ── Refresh diagram (sin page reload) ─────────────────────── */
async function refreshDiagram() {
    await loadOrganigrama();
    if (diagram) {
        diagram.dataSourceSettings.dataManager = new ej.data.DataManager(datosOrg);
        diagram.dataBind();
    }
    checkEmptyState();
    buildTreePanel();
    closePropsPanel();
}

function checkEmptyState() {
    const overlay = document.getElementById("orgEmptyOverlay");
    if (overlay) overlay.style.display = datosOrg.length === 0 ? "flex" : "none";
}

/* ── Tree panel ────────────────────────────────────────────── */
function buildTreePanel() {
    const container = document.getElementById("orgTreeContent");
    if (!rawOrg || rawOrg.length === 0) {
        container.innerHTML = `
            <div style="padding:20px 10px;text-align:center;">
                <span class="material-symbols-outlined" style="font-size:32px;color:#e2e8f0">account_tree</span>
                <div style="font-size:12px;color:#94a3b8;margin-top:6px;">Sin nodos</div>
            </div>`;
        return;
    }

    const map = {};
    const roots = [];
    rawOrg.forEach(d => {
        map[d.idDetalleOrganigrama] = { ...d, children: [] };
    });
    rawOrg.forEach(d => {
        if (d.idDetalleOrganigramaPadre != 0 && map[d.idDetalleOrganigramaPadre]) {
            map[d.idDetalleOrganigramaPadre].children.push(map[d.idDetalleOrganigrama]);
        } else {
            roots.push(map[d.idDetalleOrganigrama]);
        }
    });

    function renderNode(n) {
        const has = n.children.length > 0;
        const tipoClass = { PRINCIPAL: "principal", EMPLEADO: "empleado", OTROS: "otros" }[n.Tipo] || "empleado";
        return `
        <li>
            <div class="org-tree-node" data-rawid="${n.idDetalleOrganigrama}">
                <button class="org-tree-toggle" ${has ? "" : 'style="visibility:hidden"'}>
                    <span class="material-symbols-outlined">${has ? "expand_more" : "remove"}</span>
                </button>
                <span class="tipo-dot ${tipoClass}"></span>
                <img src="${n.Imagen || "assets/images/logo-pip.png"}" alt="" onerror="this.src='assets/images/logo-pip.png'">
                <span class="org-tree-name">${escHtml(n.Nombre)}</span>
                <button class="org-tree-delete" data-rawid="${n.idDetalleOrganigrama}" title="Eliminar">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            ${has ? `<ul class="org-tree-children">${n.children.map(renderNode).join("")}</ul>` : ""}
        </li>`;
    }

    container.innerHTML = `<ul class="org-tree-root">${roots.map(renderNode).join("")}</ul>`;

    container.querySelectorAll(".org-tree-toggle").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const li = btn.closest("li");
            const ul = li.querySelector(".org-tree-children");
            if (!ul) return;
            const collapsed = ul.style.display === "none";
            ul.style.display = collapsed ? "" : "none";
            btn.querySelector(".material-symbols-outlined").textContent = collapsed ? "expand_more" : "chevron_right";
        });
    });

    container.querySelectorAll(".org-tree-node").forEach(node => {
        node.addEventListener("click", e => {
            if (e.target.closest(".org-tree-delete") || e.target.closest(".org-tree-toggle")) return;
            const rawId = node.dataset.rawid;
            highlightNodeInDiagram(rawId);
        });
    });

    container.querySelectorAll(".org-tree-delete").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            confirmarEliminar(btn.dataset.rawid);
        });
    });
}

function highlightNodeInDiagram(rawId) {
    if (!diagram) return;
    const node = diagram.nodes.find(n => String(n.data?.rawId) === String(rawId));
    if (node) {
        diagram.clearSelection();
        diagram.select([node]);
    }
}

/* ── Left panel search ─────────────────────────────────────── */
function initLeftPanelSearch() {
    const input = document.getElementById("orgEmpSearchInput");
    let debounce;
    input.addEventListener("input", function() {
        clearTimeout(debounce);
        const q = this.value.trim();
        if (q.length < 1) {
            document.getElementById("orgSearchResults").innerHTML = "";
            return;
        }
        debounce = setTimeout(() => searchEmployeesPanel(q), 300);
    });
}

async function searchEmployeesPanel(q) {
    const container = document.getElementById("orgSearchResults");
    container.innerHTML = `<div style="padding:8px;font-size:12px;color:#94a3b8;">Buscando…</div>`;
    try {
        const resp = await $.ajax({
            type: "post", url: "Backend/Organigramas/App.php",
            data: { op: "getEmpleadosNoEnOrganigrama", idOrganigramas: Organigrama, q },
            dataType: "json"
        });
        if (!resp || resp.length === 0) {
            container.innerHTML = `<div style="padding:8px;font-size:12px;color:#94a3b8;">Sin resultados</div>`;
            return;
        }
        container.innerHTML = resp.map(emp => `
            <div class="org-search-result">
                <img src="${escAttr(emp.Imagen)}" alt="" onerror="this.src='assets/images/logo-pip.png'">
                <span class="org-search-result-name">${escHtml(emp.Nombre)}</span>
                <button class="org-search-add-btn" data-no="${emp.NoEmpleado}" data-nombre="${escAttr(emp.Nombre)}" title="Agregar">
                    <span class="material-symbols-outlined">add</span>
                </button>
            </div>`).join("");

        container.querySelectorAll(".org-search-add-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                openAddOffcanvas(null, btn.dataset.no, btn.dataset.nombre);
            });
        });
    } catch(e) {
        container.innerHTML = `<div style="padding:8px;font-size:12px;color:#ef4444;">Error al buscar.</div>`;
    }
}

/* ── Tipo radio pills ──────────────────────────────────────── */
function initTipoRadios(prefix) {
    const pillMap = {
        "1": `${prefix}PillPrincipal`,
        "2": `${prefix}PillEmpleado`,
        "3": `${prefix}PillOtros`
    };
    const activeCls = { "1": "active-1", "2": "active-2", "3": "active-3" };

    function updatePills(val) {
        Object.entries(pillMap).forEach(([v, id]) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove("active-1","active-2","active-3");
            if (v === val) el.classList.add(activeCls[v]);
        });
        const isOtros = val === "3";
        const empSec  = document.getElementById(`${prefix}EmpSection`);
        const otrSec  = document.getElementById(`${prefix}OtrosSection`);
        const padSec  = document.getElementById(`${prefix}PadreSection`);
        if (empSec)  empSec.style.display  = isOtros ? "none" : "";
        if (otrSec)  otrSec.style.display  = isOtros ? "" : "none";
        if (padSec)  padSec.style.display  = val === "1" ? "none" : "";
    }

    // Default state
    const defaultVal = prefix === "add" ? "2" : null;
    if (defaultVal) updatePills(defaultVal);

    Object.entries(pillMap).forEach(([val, id]) => {
        const label = document.getElementById(id);
        if (!label) return;
        label.addEventListener("click", () => {
            label.querySelector("input").checked = true;
            updatePills(val);
        });
    });
}

/* ── Add offcanvas ─────────────────────────────────────────── */
async function openAddOffcanvas(parentRawId = null, preselectedNoEmp = null, preselectedNombre = null) {
    // Reset tipo to empleado
    const radioEmpleado = document.querySelector('input[name="tipoEmpAdd"][value="2"]');
    if (radioEmpleado) { radioEmpleado.checked = true; initTipoRadios("add"); }

    document.getElementById("addOtrosInput").value = "";
    document.getElementById("orgEmpSearchInput").value = "";
    document.getElementById("orgSearchResults").innerHTML = "";

    // Cargar padres
    await loadPadreOptions("addPadreSelect", parentRawId);

    // Init Select2 empleados
    initEmpSelect2("addEmpSelect", Organigrama, preselectedNoEmp, preselectedNombre);

    getOrCreateOffcanvas(document.getElementById("offcanvasAgregar")).show();
}

function initEmpSelect2(selectId, orgId, preselectedId, preselectedText) {
    const $sel = $(`#${selectId}`);

    if ($sel.hasClass("select2-hidden-accessible")) {
        $sel.select2("destroy");
    }
    $sel.empty();

    if (preselectedId) {
        $sel.append(new Option(preselectedText || preselectedId, preselectedId, true, true));
    } else {
        $sel.append(new Option("Escriba para buscar…", "", true, false));
    }

    $sel.select2({
        dropdownParent: $sel.closest(".offcanvas"),
        width: "100%",
        minimumInputLength: 0,
        placeholder: "Buscar empleado…",
        language: { noResults: () => "Sin resultados" },
        ajax: {
            url: "Backend/Organigramas/App.php",
            type: "POST",
            dataType: "json",
            delay: 300,
            data: params => ({
                op: "getEmpleadosOrg",
                q: params.term || "",
                IdDivision: "", IdSucursal: "", IdPuesto: "", Nivel: "",
                Organigrama: orgId
            }),
            processResults: data => ({
                results: (data || []).map(e => ({ id: e.NoEmpleado, text: e.Nombre, img: e.Imagen || "" }))
            }),
            cache: true
        },
        templateResult: formatEmpOption,
        templateSelection: r => r.text || r.id
    });

    if (preselectedId) $sel.trigger("change");
}

function formatEmpOption(emp) {
    if (!emp.id) return emp.text;
    return $(`<div class="select2-emp-option">
        <img src="${escAttr(emp.img || "assets/images/logo-pip.png")}" onerror="this.src='assets/images/logo-pip.png'">
        <span>${escHtml(emp.text)}</span>
    </div>`);
}

async function loadPadreOptions(selectId, preselectedRawId = null) {
    const sel = document.getElementById(selectId);
    sel.innerHTML = '<option value="">Sin jefe (nodo raíz)</option>';
    try {
        const resp = await $.ajax({
            type: "post", url: "Backend/Organigramas/App.php",
            data: { op: "getEmpleadosPadreOrganigrama", idOrganigramas: Organigrama },
            dataType: "json"
        });
        (resp || []).forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.idDetalleOrganigrama;
            opt.textContent = p.Nombre;
            if (String(p.idDetalleOrganigrama) === String(preselectedRawId)) opt.selected = true;
            sel.appendChild(opt);
        });
    } catch(e) { console.error(e); }
}

async function loadPadreOptionsExcluding(selectId, excludeRawId, preselectedRawId = null) {
    const sel = document.getElementById(selectId);
    sel.innerHTML = '<option value="">Sin jefe (nodo raíz)</option>';
    try {
        const resp = await $.ajax({
            type: "post", url: "Backend/Organigramas/App.php",
            data: { op: "getEmpleadosSelectedPadreOrganigrama", idOrganigramas: Organigrama, idDetalleOrganigrama: excludeRawId },
            dataType: "json"
        });
        (resp || []).forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.idDetalleOrganigrama;
            opt.textContent = p.Nombre;
            if (String(p.idDetalleOrganigrama) === String(preselectedRawId)) opt.selected = true;
            sel.appendChild(opt);
        });
    } catch(e) { console.error(e); }
}

function bindOffcanvasEvents() {
    document.getElementById("btnConfirmarAdd").addEventListener("click", doAddEmpleado);
    document.getElementById("btnConfirmarEdit").addEventListener("click", doEditEmpleado);
}

async function doAddEmpleado() {
    const tipo   = document.querySelector('input[name="tipoEmpAdd"]:checked')?.value || "";
    const empId  = $("#addEmpSelect").val() || "";
    const padreId = document.getElementById("addPadreSelect").value || "0";
    const otros  = document.getElementById("addOtrosInput").value.trim();

    const resp = await $.ajax({
        type: "post", url: "Backend/Organigramas/App.php",
        data: {
            op: "addEmpleadoOrganigrama",
            idOrganigramas: Organigrama,
            idDetalleOrganigramaPadre: padreId === "" ? "0" : padreId,
            NoEmpleadoHijo: empId || "0",
            Tipo: tipo,
            Otros: otros
        }
    });

    if (resp == "1") {
        bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasAgregar"))?.hide();
        showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Empleado agregado al organigrama.</span></div>`, "top-right", 5000);
        await refreshDiagram();
    } else {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000);
    }
}

/* ── Edit offcanvas ────────────────────────────────────────── */
async function openEditOffcanvas(rawId) {
    const node = rawOrg.find(n => String(n.idDetalleOrganigrama) === String(rawId));
    if (!node) return;

    document.getElementById("editNodeId").value = rawId;

    // Set tipo radio
    const tipoValMap = { PRINCIPAL: "1", EMPLEADO: "2", OTROS: "3" };
    const tipoVal = tipoValMap[node.Tipo] || "2";
    const radio = document.querySelector(`input[name="tipoEmpEdit"][value="${tipoVal}"]`);
    if (radio) {
        radio.checked = true;
        // Trigger pill update
        ["1","2","3"].forEach(v => {
            const id = { "1": "editPillPrincipal", "2": "editPillEmpleado", "3": "editPillOtros" }[v];
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove("active-1","active-2","active-3");
            if (v === tipoVal) el.classList.add(`active-${v}`);
        });
        const isOtros = tipoVal === "3";
        document.getElementById("editEmpSection").style.display   = isOtros ? "none" : "";
        document.getElementById("editOtrosSection").style.display  = isOtros ? "" : "none";
        document.getElementById("editPadreSection").style.display  = tipoVal === "1" ? "none" : "";
    }

    // Set otros input
    document.getElementById("editOtrosInput").value = node.Otros || "";

    // Init Select2 with current employee
    if (node.Tipo !== "OTROS" && node.NoEmpleadoHijo) {
        const nombre = node.Nombre || "";
        initEmpSelect2Edit("editEmpSelect", node.NoEmpleadoHijo, nombre);
    } else {
        const $sel = $("#editEmpSelect");
        if ($sel.hasClass("select2-hidden-accessible")) $sel.select2("destroy");
        $sel.empty().append(new Option("Escriba para buscar…","",true,false));
        initEmpSelect2Edit("editEmpSelect", null, null);
    }

    // Load padres excluding self
    await loadPadreOptionsExcluding("editPadreSelect", rawId, node.idDetalleOrganigramaPadre);

    getOrCreateOffcanvas(document.getElementById("offcanvasEditar")).show();
}

function initEmpSelect2Edit(selectId, currentNoEmp, currentNombre) {
    const $sel = $(`#${selectId}`);
    if ($sel.hasClass("select2-hidden-accessible")) $sel.select2("destroy");
    $sel.empty();

    if (currentNoEmp) {
        $sel.append(new Option(currentNombre || currentNoEmp, currentNoEmp, true, true));
    } else {
        $sel.append(new Option("Escriba para buscar…","",true,false));
    }

    $sel.select2({
        dropdownParent: $sel.closest(".offcanvas"),
        width: "100%",
        minimumInputLength: 0,
        placeholder: "Buscar empleado…",
        language: { noResults: () => "Sin resultados" },
        ajax: {
            url: "Backend/Organigramas/App.php",
            type: "POST",
            dataType: "json",
            delay: 300,
            data: params => ({
                op: "getEmpleadosOrg",
                q: params.term || "",
                IdDivision: "", IdSucursal: "", IdPuesto: "", Nivel: "",
                Organigrama: Organigrama
            }),
            processResults: data => ({
                results: (data || []).map(e => ({ id: e.NoEmpleado, text: e.Nombre, img: e.Imagen || "" }))
            }),
            cache: true
        },
        templateResult: formatEmpOption,
        templateSelection: r => r.text || r.id
    });

    if (currentNoEmp) $sel.trigger("change");
}

async function doEditEmpleado() {
    const tipo    = document.querySelector('input[name="tipoEmpEdit"]:checked')?.value || "";
    const empId   = $("#editEmpSelect").val() || "";
    const padreId = document.getElementById("editPadreSelect").value || "0";
    const otros   = document.getElementById("editOtrosInput").value.trim();
    const nodeId  = document.getElementById("editNodeId").value;

    const resp = await $.ajax({
        type: "post", url: "Backend/Organigramas/App.php",
        data: {
            op: "EditarElementoOrganigrama",
            idDetalleOrganigramaPadre: padreId === "" ? "0" : padreId,
            NoEmpleadoHijo: empId || "0",
            Otros: otros,
            idElementoPorEditar: nodeId,
            Tipo: tipo,
            Organigrama: Organigrama
        }
    });

    if (resp == "1") {
        bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasEditar"))?.hide();
        showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Nodo actualizado.</span></div>`, "top-right", 5000);
        await refreshDiagram();
    } else {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000);
    }
}

/* ── Delete ────────────────────────────────────────────────── */
async function confirmarEliminar(rawId) {
    const result = await Swal.fire({
        title: "Eliminar nodo",
        text: "Se eliminará este nodo del organigrama.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#e11d48"
    });
    if (!result.isConfirmed) return;

    const resp = await $.ajax({
        type: "post", url: "Backend/Organigramas/App.php",
        data: { op: "deleteElementoOrganigrama", idDetalleOrganigrama: rawId }
    });

    if (resp == "1") {
        showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Nodo eliminado.</span></div>`, "top-right", 5000);
        await refreshDiagram();
    } else {
        showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000);
    }
}

/* ── Properties panel buttons ──────────────────────────────── */
function bindPropertyPanelButtons() {
    document.getElementById("btnCloseProps").addEventListener("click", closePropsPanel);

    document.getElementById("propBtnAgregar").addEventListener("click", () => {
        if (!selectedNodeRawId) return;
        openAddOffcanvas(selectedNodeRawId);
    });

    document.getElementById("propBtnEditar").addEventListener("click", () => {
        if (!selectedNodeRawId) return;
        openEditOffcanvas(selectedNodeRawId);
    });

    document.getElementById("propBtnEliminar").addEventListener("click", () => {
        if (!selectedNodeRawId) return;
        confirmarEliminar(selectedNodeRawId);
    });
}

/* ── Toolbar buttons ───────────────────────────────────────── */
function bindToolbarButtons() {
    document.getElementById("btnToggleLeftPanel").addEventListener("click", toggleLeftPanel);
    document.getElementById("btnTogglePanelCanvas").addEventListener("click", toggleLeftPanel);
    document.getElementById("btnAutoLayout").addEventListener("click", doAutoLayout);
    document.getElementById("btnExportar").addEventListener("click", () => {
        const el = document.getElementById("element");
        if (!el) return;
        const nombre = (document.getElementById("orgTitulo")?.textContent?.trim() || "organigrama")
            .replace(/[^a-z0-9áéíóúüñA-ZÁÉÍÓÚÜÑ\s\-_]/gi, "").trim() || "organigrama";
        const filename = `organigrama-${nombre}.png`;
        html2canvas(el, { backgroundColor: "#f0f4f8", scale: 2, useCORS: true, logging: false })
            .then(canvas => {
                const imgSrc = canvas.toDataURL("image/png");
                document.getElementById("previewExportImg").src = imgSrc;
                document.getElementById("btnConfirmarExport").onclick = () => {
                    const a = document.createElement("a");
                    a.download = filename;
                    a.href = imgSrc;
                    a.click();
                };
                new bootstrap.Modal(document.getElementById("modalExportPreview")).show();
            });
    });

    // Botones de agregar (todos pasan por openAddOffcanvas para inicializar Select2)
    document.getElementById("btnAddEmpleadoMain").addEventListener("click", () => openAddOffcanvas());
    const emptyBtn = document.getElementById("btnAddEmpleadoEmpty");
    if (emptyBtn) emptyBtn.addEventListener("click", () => openAddOffcanvas());
}

function toggleLeftPanel() {
    const panel = document.getElementById("orgLeftPanel");
    const icon  = document.getElementById("togglePanelIcon");
    const collapsed = panel.classList.toggle("collapsed");
    if (icon) icon.textContent = collapsed ? "chevron_right" : "chevron_left";
    // Espera que termine la transición CSS (200ms) y fuerza resize del diagrama
    setTimeout(() => { if (diagram) diagram.refresh(); }, 220);
}

async function doAutoLayout(silent = false) {
    if (!diagram || datosOrg.length === 0) return;
    const btn = document.getElementById("btnAutoLayout");
    if (btn) { btn.disabled = true; btn.textContent = "…"; }

    diagram.layout = {
        type: "OrganizationalChart",
        margin: { top: 40, left: 40, right: 40, bottom: 40 },
        horizontalSpacing: 50,
        verticalSpacing: 60,
        orientation: "TopToBottom"
    };
    diagram.dataBind();

    await new Promise(r => setTimeout(r, 400));

    // Save all positions
    const saves = diagram.nodes.map(node => {
        if (!node.data || !node.data.rawId) return null;
        return $.ajax({
            type: "post", url: "Backend/Organigramas/App.php",
            data: { op: "changePositionNodeOrganigrama", y: node.offsetY, x: node.offsetX, do: btoa(Number(node.data.rawId)) }
        });
    }).filter(Boolean);

    await Promise.all(saves);

    diagram.layout = { type: "None" };
    diagram.dataBind();

    if (btn) { btn.disabled = false; btn.innerHTML = '<span class="material-symbols-outlined">auto_awesome_mosaic</span> Auto-layout'; }
    if (!silent) {
        showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Organigrama reorganizado.</span></div>`, "top-right", 4000);
    }
    await refreshDiagram();
    // Centrar vista sobre todos los nodos tras el reordenamiento
    if (diagram) svSafeFitToPage();
}

/* ── Hover "+" button ──────────────────────────────────────── */
// Handled via selection panel instead — simpler and more reliable.
function hideNodeAddBtn() { /* reserved */ }

/* ── Utilities ─────────────────────────────────────────────── */
function getOrCreateOffcanvas(el) {
    return bootstrap.Offcanvas.getInstance(el) || new bootstrap.Offcanvas(el);
}

/* Ajusta el diagrama a la pantalla sin bajar de minZoom (0.25) */
function svSafeFitToPage() {
    if (!diagram) return;
    const opts = { mode: "Page", region: "Content", margin: { top: 40, left: 40, right: 40, bottom: 40 } };
    diagram.fitToPage(opts);
    setTimeout(() => {
        const currentZoom = diagram.scrollSettings?.currentZoom ?? 1;
        if (currentZoom < 0.25) {
            diagram.zoom(0.25 / currentZoom);
        }
    }, 50);
}

/* Funciones globales usadas por los botones flotantes de zoom */
function svZoomIn()  { if (diagram) diagram.zoom(1.2); }
function svZoomOut() { if (diagram) diagram.zoom(1 / 1.2); }
function svFit()     { svSafeFitToPage(); }

function escHtml(s) {
    return (s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function escAttr(s) {
    return (s || "").replace(/"/g,"&quot;");
}
