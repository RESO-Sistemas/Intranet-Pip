let lastDiagram  = null;
let activeOrgId  = null;
const renderedOrgs  = new Set();
const orgDataMap    = {};
const diagramMap    = {};

getDatosOrganigramas();



document.getElementById("btnExportarVista")?.addEventListener("click", () => {
    if (!activeOrgId) {
        showBootstrapAlert('<div class="alert-content"><span class="alert-title">Info</span><span class="alert-text">Selecciona un organigrama primero.</span></div>', "top-right", 4000);
        return;
    }
    const el = document.getElementById(`divOrg${activeOrgId}`);
    if (!el) return;
    const nombre = (document.querySelector(".org-tab.active")?.textContent?.trim() || "organigrama")
        .replace(/[^a-z0-9áéíóúüñA-ZÁÉÍÓÚÜÑ\s\-_]/gi, "").trim();
    const filename = `organigrama-${nombre}.png`;
    html2canvas(el, { backgroundColor: "#fafafa", scale: 2, useCORS: true, logging: false })
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

async function getDatosOrganigramas() {
    const wrap = document.getElementById("contenidoOrganigramas");
    wrap.innerHTML = '<div class="org-loading"><span class="material-symbols-outlined org-spin">autorenew</span><span>Cargando organigramas…</span></div>';

    let respuesta = [];
    try {
        respuesta = await $.ajax({
            type: "post",
            url: "Backend/Organigramas/App.php",
            data: { op: "getDatosOrganigramas" },
            dataType: "json"
        });
    } catch (err) {
        console.error(err);
        wrap.innerHTML = '<div class="org-empty-state"><span class="material-symbols-outlined">error</span><p>Error al cargar los organigramas.</p></div>';
        return;
    }

    const orgs = [];
    respuesta.forEach(datos => {
        datos.Organigrama.forEach(org => {
            const id = org.idOrganigramas;
            const nodes = [];
            datos.RegistrosOrganigrama.forEach(d => {
                if (d.EsDe != id) return;
                const n = {
                    id:         `node_${d.idDetalleOrganigrama}`,
                    name:       d.Nombre   || "",
                    role:       d.Puesto   || "",
                    offsetX:    Number(d.CoordenadaX) || 0,
                    offsetY:    Number(d.CoordenadaY) || 0,
                    Width:      Number(d.Ancho)   || 240,
                    Height:     Number(d.Altura)  || 100,
                    Emp:      d.EMPH     || "",
                    email:    d.Email    || "",
                    tipo:     d.Tipo     || "",
                    nivel:    d.Nivel    || 0,
                    division: d.Division || "",
                    sucursal: d.Sucursal || ""
                };
                if (d.idDetalleOrganigramaPadre != 0)
                    n.manager = `node_${d.idDetalleOrganigramaPadre}`;
                nodes.push(n);
            });
            orgDataMap[id] = nodes;
            orgs.push({ id, titulo: org.Titulo });
        });
    });

    if (!orgs.length) {
        wrap.innerHTML = '<div class="org-empty-state"><span class="material-symbols-outlined">account_tree</span><p>No hay organigramas disponibles.</p></div>';
        return;
    }

    const firstId = orgs[0].id;
    const tabsHtml = orgs.map((o, i) =>
        `<button class="org-tab${i === 0 ? ' active' : ''}" data-org="${o.id}">
            <span class="material-symbols-outlined">account_tree</span>${o.titulo}
         </button>`
    ).join("");
    const panelsHtml = orgs.map((o, i) =>
        `<div class="org-canvas-panel${i === 0 ? ' active' : ''}" id="orgPanel_${o.id}">
            <div id="divOrg${o.id}" class="org-diagram-container"></div>
         </div>`
    ).join("");

    wrap.innerHTML = `
        <div class="org-tabs-bar">${tabsHtml}</div>
        <div class="org-canvas-area">${panelsHtml}</div>
    `;

    document.querySelectorAll(".org-tab").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".org-tab").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".org-canvas-panel").forEach(p => p.classList.remove("active"));
            this.classList.add("active");
            const orgId = this.dataset.org;
            activeOrgId = orgId;
            document.getElementById(`orgPanel_${orgId}`).classList.add("active");
            if (!renderedOrgs.has(orgId)) {
                loadOrganigrama(orgId, orgDataMap[orgId]);
            } else {
                lastDiagram = diagramMap[orgId] || null;
            }
        });
    });

    activeOrgId = firstId;
    loadOrganigrama(firstId, orgDataMap[firstId]);
}

function loadOrganigrama(orgId, datos) {
    if (!datos || !datos.length) return;
    renderedOrgs.add(orgId);

    const items = new ej.data.DataManager(datos);
    const diagram = new ej.diagrams.Diagram({
        width:  "100%",
        height: "100%",
        dataSourceSettings: {
            id:         "id",
            parentId:   "manager",
            dataManager: items,
            doBinding: doBinding
        },
        tool: ej.diagrams.DiagramTools.SingleSelect | ej.diagrams.DiagramTools.ZoomPan,
        getNodeDefaults:      nodeDefaults,
        getConnectorDefaults: connectorDefaults,
        click: eventClick,
        scrollSettings: { minZoom: 0.25, maxZoom: 3 }
    });

    diagram.appendTo(`#divOrg${orgId}`);
    diagramMap[orgId] = diagram;
    lastDiagram = diagram;

    // Mostrar controles de zoom
    const zoomCtrl = document.getElementById("orgZoomControls");
    if (zoomCtrl) zoomCtrl.style.display = "flex";

    const fitOpts = { mode: "Page", region: "Content", margin: { top: 40, left: 40, right: 40, bottom: 40 } };
    const sin = datos.filter(d => !d.offsetX && !d.offsetY).length;
    if (sin > datos.length / 2) {
        applyAutoLayout(diagram);
    } else {
        setTimeout(() => safeFitToPage(diagram), 150);
    }
}

function applyAutoLayout(diagram) {
    diagram.layout = {
        type: "OrganizationalChart",
        horizontalSpacing: 40,
        verticalSpacing: 50,
        getLayoutInfo: (node, options) => {
            options.type = "Center"; options.orientation = "Vertical"; return options;
        }
    };
    diagram.dataBind();
    setTimeout(() => safeFitToPage(diagram), 200);
}

/* Ajusta el diagrama a la pantalla sin bajar de minZoom (0.25) */
function safeFitToPage(diag) {
    const opts = { mode: "Page", region: "Content", margin: { top: 40, left: 40, right: 40, bottom: 40 } };
    diag.fitToPage(opts);
    setTimeout(() => {
        const currentZoom = diag.scrollSettings?.currentZoom ?? 1;
        if (currentZoom < 0.25) {
            diag.zoom(0.25 / currentZoom);
        }
    }, 50);
}

/* Funciones globales usadas por los botones flotantes de zoom */
function orgZoomIn()  { if (lastDiagram) lastDiagram.zoom(1.2); }
function orgZoomOut() { if (lastDiagram) lastDiagram.zoom(1 / 1.2); }
function orgFit()     { if (lastDiagram) safeFitToPage(lastDiagram); }

function doBinding(node, data) {
    node.annotations = [];
    node.style = { fill: "transparent", strokeColor: "transparent" };
    const esc  = s => (s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const name = esc(data.name);
    const role = esc(data.role);
    const initials = (data.name || "?").split(" ").filter(Boolean).slice(0,2)
        .map(w => w.charAt(0).toUpperCase()).join("");
    const tipoMap  = { PRINCIPAL: ["#111","#ffc107","Principal"], EMPLEADO: ["#1e40af","#dbeafe","Empleado"], OTROS: ["#374151","#f3f4f6","Otro"] };
    const [tc, bg, lbl] = tipoMap[data.tipo] || ["#374151","#f3f4f6",""];
    const badge = lbl ? `<span style="display:inline-block;font-size:9px;font-weight:700;padding:1px 6px;border-radius:4px;background:${bg};color:${tc};letter-spacing:.04em;text-transform:uppercase;">${lbl}</span>` : "";
    const avatar = `<span style="display:flex;width:40px;height:40px;border-radius:50%;background:#ffc107;color:#111;font-size:13px;font-weight:800;align-items:center;justify-content:center;flex-shrink:0;">${initials}</span>`;
    node.shape = {
        type: "HTML",
        content:
            `<div style="width:100%;height:100%;background:#fff;border:1.5px solid #e5e7eb;border-top:4px solid #ffc107;border-radius:8px;overflow:hidden;box-sizing:border-box;padding:0 14px;pointer-events:none;">` +
            `<table style="width:100%;height:100%;border-collapse:collapse;table-layout:fixed;"><tr>` +
            `<td style="width:46px;vertical-align:middle;padding:0;">${avatar}</td>` +
            `<td style="vertical-align:middle;padding:0 0 0 12px;overflow:hidden;">` +
            `<div style="font-size:12px;font-weight:700;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px;">${name}</div>` +
            `<div style="font-size:10px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:5px;">${role}</div>` +
            badge +
            `</td></tr></table></div>`
    };
}

function nodeDefaults(node) {
    node.offsetX = node.data.offsetX || 300;
    node.offsetY = node.data.offsetY || 200;
    node.width   = 240;
    node.height  = 100;
    // PointerEvents + InConnect + OutConnect: recibe clicks y permite conectores, sin handles ni arrastre
    node.constraints = ej.diagrams.NodeConstraints.PointerEvents
                     | ej.diagrams.NodeConstraints.InConnect
                     | ej.diagrams.NodeConstraints.OutConnect;
    return node;
}

function connectorDefaults(connector) {
    connector.type = "Orthogonal";
    connector.targetDecorator = { shape: "None" };
    connector.style = { strokeColor: "#94a3b8", strokeWidth: 2 };
    connector.constraints = ej.diagrams.ConnectorConstraints.None;
    return connector;
}

function countDirectReports(nodeId) {
    return Object.values(orgDataMap).flat().filter(n => n.manager === nodeId).length;
}

function eventClick(args) {
    if (args.name !== "click") return;
    const node = args.actualObject;
    if (!node || !node.data || !node.data.name) return;
    const data = node.data;
    const det = (data.Emp || "").replace(/'/g, "");
    if (det === "MA==") {
        showBootstrapAlert('<div class="alert-content"><span class="alert-title">Información</span><span class="alert-text">No es posible obtener la información de este elemento.</span></div>', "top-right", 4000);
        return;
    }

    const initials = (data.name || "?").split(" ").filter(Boolean).slice(0,2)
        .map(w => w.charAt(0).toUpperCase()).join("");
    const tipoMap  = { PRINCIPAL: ["#111","#ffc107","Principal"], EMPLEADO: ["#1e40af","#dbeafe","Empleado"], OTROS: ["#374151","#f3f4f6","Otro"] };
    const [tc, bg, lbl] = tipoMap[data.tipo] || ["#374151","#f3f4f6","—"];
    const esOtros = data.tipo === "OTROS";

    document.getElementById("modalEmpInitials").textContent = initials;
    document.getElementById("modalEmpName").textContent     = data.name || "—";
    document.getElementById("modalEmpPuesto").textContent   = data.role || "—";

    const tipoEl = document.getElementById("modalEmpTipo");
    tipoEl.textContent        = lbl;
    tipoEl.style.background   = bg;
    tipoEl.style.color        = tc;

    const nivelEl = document.getElementById("modalEmpNivel");
    nivelEl.textContent = data.nivel > 0 ? `Nivel ${data.nivel}` : "";

    // Contacto
    const emailOk = data.email && data.email !== "Sin Email";
    document.getElementById("modalEmpEmail").textContent = emailOk ? data.email : "Sin email";
    document.getElementById("modalContactoSection").style.display = esOtros ? "none" : "";

    // Organización
    document.getElementById("modalEmpDivision").textContent = data.division || "—";
    document.getElementById("modalEmpSucursal").textContent = data.sucursal || "—";
    document.getElementById("modalDivisionRow").style.display = (esOtros || !data.division) ? "none" : "";
    document.getElementById("modalSucursalRow").style.display = (esOtros || !data.sucursal) ? "none" : "";
    document.getElementById("modalOrgSection").style.display  = esOtros ? "none" : "";

    // Jerarquía — usar data.id (= "node_123") que coincide con n.manager en orgDataMap
    document.getElementById("modalEmpDirectos").textContent = countDirectReports(data.id);

    new bootstrap.Modal(document.getElementById("modalEmpDetalle")).show();
}
