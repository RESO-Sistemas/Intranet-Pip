// ─── Grids globales ───────────────────────────────────────────────────────────
let gridSucursal = null;
let gridEmTelMap  = {};   // clave: idDirectoriosCorreosTelefonos
let gridExtMap    = {};   // clave: idDirectorioExtensiones
let gridPersonalEmTel  = null;
let gridPersonalExtMap = null;

// ─── Init ─────────────────────────────────────────────────────────────────────
$(document).ready(function () {
  // Select2 dentro de modales
  $("#slctDivisionEm").select2({ dropdownParent: $("#modalAddEmpleadosDirectorioEmTel"), width: "100%", placeholder: "Divisiones", allowClear: true });
  $("#slctPuestoEm").select2({ dropdownParent: $("#modalAddEmpleadosDirectorioEmTel"), width: "100%", placeholder: "Puestos", allowClear: true });
  $("#slctSucursalEm").select2({ dropdownParent: $("#modalAddEmpleadosDirectorioEmTel"), width: "100%", placeholder: "Sucursales", allowClear: true });
  $("#slctDivisionEmExt").select2({ dropdownParent: $("#modalAddEmpleadosDirectorioExtensiones"), width: "100%", placeholder: "Divisiones", allowClear: true });
  $("#slctPuestoEmExt").select2({ dropdownParent: $("#modalAddEmpleadosDirectorioExtensiones"), width: "100%", placeholder: "Puestos", allowClear: true });
  $("#slctSucursalEmExt").select2({ dropdownParent: $("#modalAddEmpleadosDirectorioExtensiones"), width: "100%", placeholder: "Sucursales", allowClear: true });
  $("#slctListadoSucursalesDisp").select2({ dropdownParent: $("#modalAddSucursalesDirectorio"), width: "100%", placeholder: "Sucursales Disponibles", allowClear: true });

  getTiposExtensionesDirectorioExtensiones().catch(e => console.warn(e));
  loadDirecorioEmailTel().catch(e => console.warn(e));
  loadDirectorioExtensiones().catch(e => console.warn(e));
  getDirectorioSucursal().catch(e => console.warn(e));
});

// ─── Helper: Syncfusion grid común ───────────────────────────────────────────
function syncGridOptions(extraOpts) {
  return Object.assign({
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    toolbar: ["Search"],
    dataBound: function () {
      const el  = this.element;
      const tb  = el.querySelector(".e-toolbar");
      const hd  = el.querySelector(".e-gridheader");
      const pg  = el.querySelector(".e-gridpager");
      const gc  = el.querySelector(".e-gridcontent");
      const empty = this.currentViewData.length === 0;
      if (tb) tb.style.display  = empty ? "none" : "";
      if (hd) hd.style.display  = empty ? "none" : "";
      if (pg) pg.style.display  = empty ? "none" : "";
      el.style.border = empty ? "none" : "";
      if (gc) gc.style.border   = empty ? "none" : "";
    },
    created: function () {
      const inp = document.getElementById(this.element.id + "_searchbar");
      if (inp && !inp._bound) {
        inp._bound = true;
        const g = this;
        inp.addEventListener("keyup", e => g.search(e.target.value));
      }
    }
  }, extraOpts);
}

// ─── TAB 1: Correos-Teléfonos ─────────────────────────────────────────────────
function getDirecorioEmailTel() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post", url: "Backend/Directorios/App.php",
      data: { op: "getDirectorioCorreosTelefonos" }, dataType: "json",
      success: resolve, error: reject
    });
  });
}

function loadDirecorioEmailTel() {
  return getDirecorioEmailTel().then(resp => {
    const container = $("#contenidoDirectorioEmailTelefonos").empty();
    if (!resp || !resp.length) { container.html("<p class='text-muted p-3'>Sin datos</p>"); return; }

    const tipos   = resp[0].Tipos  || [];
    const detalle = resp[0].Detalle || [];

    if (!tipos.length) { container.html("<p class='text-muted p-3'>Sin tipos registrados</p>"); return; }

    tipos.forEach(tipo => {
      const id  = tipo.idDirectoriosCorreosTelefonos;
      const gid = "gridEmTel_" + id;
      const rows = detalle.filter(d => d.idDirectoriosCorreosTelefonos == id);

      container.append(`
        <div class="mb-5">
          <div class="d-flex align-items-center justify-content-between mb-2 gap-2">
            <span class="badge bg-primary" style="font-size:.85rem;">${tipo.Tipo}</span>
            <button class="btn btn-success btn-sm" onclick="openModalAddEmpCorreosTelefonos(${id},'${tipo.Tipo}')">
              <span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">add_call</span> Agregar
            </button>
          </div>
          <div id="${gid}"></div>
        </div>`);

      if (gridEmTelMap[id]) { gridEmTelMap[id].destroy(); }

      gridEmTelMap[id] = new ej.grids.Grid(syncGridOptions({
        dataSource: rows,
        emptyRecordTemplate: `<div class="text-center text-muted py-4">Sin registros para <strong>${tipo.Tipo}</strong></div>`,
        columns: [
          { field: "Nombre",  headerText: "NOMBRE",  width: 180 },
          { field: "Puesto",  headerText: "PUESTO",  width: 150 },
          { headerText: "CORREO", width: 175, disableHtmlEncode: false,
            template: r => `<input class="form-control form-control-sm" type="email" id="emailDir${r.idDetalleDirectoriosCorreosTelefonos}" value="${r.Email||''}" style="min-width:145px;">` },
          { headerText: "TELÉFONO", width: 145, disableHtmlEncode: false,
            template: r => `<input class="form-control form-control-sm" type="text" id="movilDir${r.idDetalleDirectoriosCorreosTelefonos}" value="${r.Movil||''}" maxlength="10" onkeypress="return onlynumber(event)" style="min-width:115px;">` },
          { headerText: "MARC.CORTA", width: 130, disableHtmlEncode: false,
            template: r => `<input class="form-control form-control-sm text-center" type="text" id="MCortaDir${r.idDetalleDirectoriosCorreosTelefonos}" value="${r.MarcacionCorta||''}" maxlength="4" onkeypress="return onlynumber(event)" style="width:90px;">` },
          { headerText: "EDITAR", width: 80, textAlign: "Center", disableHtmlEncode: false,
            template: r => `<button class="btn btn-warning btn-accion btn-edit-emtel" data-id="${r.idDetalleDirectoriosCorreosTelefonos}" title="Editar"><span class="material-symbols-outlined" style="font-size:20px;">edit</span></button>` },
          { headerText: "ELIMINAR", width: 90, textAlign: "Center", disableHtmlEncode: false,
            template: r => `<button class="btn btn-danger btn-accion btn-del-emtel" data-id="${r.idDetalleDirectoriosCorreosTelefonos}" title="Eliminar"><span class="material-symbols-outlined" style="font-size:20px;">delete</span></button>` },
        ],
        recordClick: function(args) {
          const el = args.target;
          if (!el || !el.closest) return;
          const btnE = el.closest(".btn-edit-emtel");
          const btnD = el.closest(".btn-del-emtel");
          if (btnE) updateRegistroDirectorioCorreosTelefonos(parseInt(btnE.dataset.id));
          if (btnD) deleteEmpleadosDirectorioCorreosTelefonos(parseInt(btnD.dataset.id));
        }
      }));
      gridEmTelMap[id].appendTo("#" + gid);
    });
  }).catch(e => console.warn("loadDirecorioEmailTel error:", e));
}

// ─── TAB 2: Extensiones ───────────────────────────────────────────────────────
function getTiposExtensionesDirectorioExtensiones() {
  return new Promise((resolve) => {
    $.ajax({
      type: "post", url: "Backend/Directorios/App.php",
      data: { op: "getTiposExtensionesDirectorioExtensiones" }, dataType: "json",
      success: function(resp) {
        if (resp && resp.length) {
          resp.forEach(t => $("#tiposExtension").append(`<option value="${t.idDirectorioExtensiones}">${t.Tipo}</option>`));
        }
        resolve();
      },
      error: function() { resolve(); }
    });
  });
}

function getDirectorioExtensiones() {
  return new Promise((resolve, reject) => {
    const sel = $("#tiposExtension").val();
    $.ajax({
      type: "post", url: "Backend/Directorios/App.php",
      data: { op: "getDirectorioExtensiones", TiposExtSelected: sel || [] }, dataType: "json",
      success: resolve, error: reject
    });
  });
}

function loadDirectorioExtensiones() {
  return getDirectorioExtensiones().then(resp => {
    const container = $("#contenidoDirectorioExtensiones").empty();
    if (!resp || !resp.length) { container.html("<p class='text-muted p-3'>Sin datos</p>"); return; }

    const tipos   = resp[0].Tipos  || [];
    const detalle = resp[0].Detalle || [];

    if (!tipos.length) { container.html("<p class='text-muted p-3'>Sin tipos registrados</p>"); return; }

    tipos.forEach(tipo => {
      const id  = tipo.idDirectorioExtensiones;
      const gid = "gridExt_" + id;
      const rows = detalle.filter(d => d.idDirectorioExtensiones == id);

      container.append(`
        <div class="mb-5">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="badge bg-primary" style="font-size:.85rem;">${tipo.Tipo}</span>
            <button class="btn btn-success btn-sm" onclick="openModalAddEmpExtensiones(${id},'${tipo.Tipo}')">
              <span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">add_call</span> Agregar
            </button>
          </div>
          <div id="${gid}"></div>
        </div>`);

      if (gridExtMap[id]) { gridExtMap[id].destroy(); }

      gridExtMap[id] = new ej.grids.Grid(syncGridOptions({
        dataSource: rows,
        emptyRecordTemplate: `<div class="text-center text-muted py-4">Sin registros para <strong>${tipo.Tipo}</strong></div>`,
        columns: [
          { field: "Nombre", headerText: "NOMBRE", width: 220 },
          { headerText: "EXTENSIÓN", width: 200, disableHtmlEncode: false,
            template: r => `<div class="d-flex align-items-center gap-1">
              <input class="form-control form-control-sm text-center" type="text" id="Extension${r.idDetalleDirectorioExtensiones}" value="${r.Extension||''}" maxlength="4" onkeypress="return onlynumber(event)" style="width:90px;">
              <button class="btn btn-warning btn-sm" onclick="updateExtesionEmp(${r.idDetalleDirectorioExtensiones},${id})">
                <span class="material-symbols-outlined" style="font-size:18px;">edit</span>
              </button>
            </div>` },
          { headerText: "ELIMINAR", width: 100, textAlign: "Center", disableHtmlEncode: false,
            template: r => `<button class="btn btn-danger btn-accion btn-del-ext" data-id="${r.idDetalleDirectorioExtensiones}" title="Eliminar"><span class="material-symbols-outlined" style="font-size:20px;">delete</span></button>` },
        ],
        recordClick: function(args) {
          const el = args.target;
          if (!el || !el.closest) return;
          const btn = el.closest(".btn-del-ext");
          if (btn) deleteEmpleadosDirectorioExtension(parseInt(btn.dataset.id));
        }
      }));
      gridExtMap[id].appendTo("#" + gid);
    });
  }).catch(e => console.warn("loadDirectorioExtensiones error:", e));
}

// ─── TAB 3: Sucursales ────────────────────────────────────────────────────────
function getDirectorioSucursal() {
  return new Promise((resolve) => {
    $.ajax({
      type: "post", url: "Backend/Directorios/App.php",
      data: { op: "getDirectorioSucursal" }, dataType: "json",
      success: function(resp) {
        if (!resp) resp = [];

        // Agrupar por idDirectorioSucursales
        const map = {};
        resp.forEach(r => {
          if (!map[r.idDirectorioSucursales]) {
            map[r.idDirectorioSucursales] = { ...r, _empleados: [] };
          }
          if (r.Nombre) map[r.idDirectorioSucursales]._empleados.push({ Nombre: r.Nombre, Puesto: r.Puesto });
        });
        const rows = Object.values(map);

        if (gridSucursal) { gridSucursal.destroy(); gridSucursal = null; }

        gridSucursal = new ej.grids.Grid(syncGridOptions({
          dataSource: rows,
          emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height:280px;">
            <span class="material-symbols-outlined mb-2" style="font-size:48px;color:#adb5bd;">location_city</span>
            <h6 class="text-muted">Sin sucursales registradas</h6>
          </div>`,
          columns: [
            { field: "Sucursal", headerText: "SUCURSAL", width: 140 },
            { headerText: "DIRECCIÓN", width: 180, disableHtmlEncode: false,
              template: r => `<input class="form-control form-control-sm" type="text" id="DirSucur${r.idDirectorioSucursales}" value="${r.Direccion||''}" style="min-width:150px;">` },
            { headerText: "TELÉFONO", width: 140, disableHtmlEncode: false,
              template: r => `<input class="form-control form-control-sm text-center" type="text" id="TelSucur${r.idDirectorioSucursales}" value="${r.Telefono||''}" maxlength="10" onkeypress="return onlynumber(event)" style="width:120px;">` },
            { headerText: "NUM.RED", width: 110, disableHtmlEncode: false,
              template: r => `<input class="form-control form-control-sm text-center" type="text" id="NumRedSucur${r.idDirectorioSucursales}" value="${r.NumRed||''}" maxlength="10" onkeypress="return onlynumber(event)" style="width:90px;">` },
            { headerText: "EMPLEADO(S)", width: 160, disableHtmlEncode: false,
              template: r => r._empleados.map(e => `<div><strong>${e.Nombre}</strong></div>`).join("") || "—" },
            { headerText: "PUESTO(S)", width: 140, disableHtmlEncode: false,
              template: r => r._empleados.map(e => `<div>${e.Puesto||''}</div>`).join("") || "—" },
            { headerText: "CORREO", width: 170, disableHtmlEncode: false,
              template: r => `<input class="form-control form-control-sm" type="email" id="CorreoSucur${r.idDirectorioSucursales}" value="${r.Correo||''}" style="min-width:140px;">` },
            { field: "FechaApertura", headerText: "APERTURA", width: 110 },
            { field: "años_transcurridos", headerText: "ANTIGÜEDAD", width: 110, textAlign: "Center",
              template: r => r.años_transcurridos != null ? `${r.años_transcurridos} año(s)` : "—" },
            { headerText: "MARC.CORTA", width: 120, disableHtmlEncode: false,
              template: r => `<input class="form-control form-control-sm text-center" type="text" id="MCorta${r.idDirectorioSucursales}" value="${r.MarcacionCorta||''}" maxlength="4" onkeypress="return onlynumber(event)" style="width:90px;">` },
            { headerText: "GUARDAR", width: 90, textAlign: "Center", disableHtmlEncode: false,
              template: r => `<button class="btn btn-warning btn-accion btn-upd-sucursal" data-id="${r.idDirectorioSucursales}" title="Actualizar"><span class="material-symbols-outlined" style="font-size:20px;">edit</span></button>` },
          ],
          recordClick: function(args) {
            const el = args.target;
            if (!el || !el.closest) return;
            const btn = el.closest(".btn-upd-sucursal");
            if (btn) updateRegistroDirectorioSucursal(parseInt(btn.dataset.id));
          }
        }));
        gridSucursal.appendTo("#tableDirectorioSucursal");
        resolve();
      },
      error: function(e) { console.warn("getDirectorioSucursal error:", e); resolve(); }
    });
  });
}

// ─── Modal Correos-Teléfonos ──────────────────────────────────────────────────
async function openModalAddEmpCorreosTelefonos(idTipo, Nombre) {
  $.blockUI({ message: '<h5><i class="fa fa-spinner fa-spin"></i></h5>', css: { border:"none",padding:"15px",backgroundColor:"#000","border-radius":"10px",opacity:0.5,color:"#ffc407" } });
  $("#NameDirectorio").html(`Directorio: ${Nombre}`);
  $("#IdTipoEmTel").val(idTipo);
  $("#slctDivisionEm, #slctPuestoEm, #slctSucursalEm").val("").trigger("change");
  try {
    await Promise.all([getPuestos(), getDivisiones(), getSucursales()]);
    const modal = new bootstrap.Modal(document.getElementById("modalAddEmpleadosDirectorioEmTel"));
    modal.show();
    await getListadoPersonal();
  } catch(e) { console.error(e); } finally { $.unblockUI(); }
}

function getListadoPersonal() {
  return new Promise((resolve, reject) => {
    const datasend = {
      op: "getPersonalDirectorioEmailTel",
      puesto:   $("#slctPuestoEm").val(),
      sucursal: $("#slctSucursalEm").val(),
      division: $("#slctDivisionEm").val(),
      idDirectoriosCorreosTelefonos: Number($("#IdTipoEmTel").val()),
    };
    $.ajax({
      type: "POST", url: "Backend/Empleados/App.php", data: datasend, dataType: "json",
      success: function(resp) {
        if (!Array.isArray(resp)) resp = [];
        const rows = resp.map(r => ({ ...r, _sel: r.NoEmpleado }));
        if (gridPersonalEmTel) { gridPersonalEmTel.destroy(); gridPersonalEmTel = null; }
        gridPersonalEmTel = new ej.grids.Grid({
          dataSource: rows, allowPaging: true, pageSettings: { pageSize: 8 }, toolbar: ["Search"],
          columns: [
            { field: "NoEmpleado", headerText: "NO EMP.", width: 100, textAlign: "Center" },
            { field: "Nombre",     headerText: "NOMBRE",  width: 200 },
            { headerText: "SELEC.", width: 80, textAlign: "Center", disableHtmlEncode: false,
              template: r => `<button class="btn btn-success btn-sm btn-sel-emtel" data-no="${r.NoEmpleado}" data-nombre="${r.Nombre}"><span class="material-symbols-outlined" style="font-size:18px;">add</span></button>` },
          ],
          recordClick: function(args) {
            const el = args.target;
            if (!el || !el.closest) return;
            const btn = el.closest(".btn-sel-emtel");
            if (btn) SeleccionarEmpleadoDirEmTel(btn.dataset.no, btn.dataset.nombre);
          },
          created: function() {
            const inp = document.getElementById(this.element.id + "_searchbar");
            if (inp && !inp._bound) { inp._bound = true; const g = this; inp.addEventListener("keyup", e => g.search(e.target.value)); }
          }
        });
        gridPersonalEmTel.appendTo("#tableEmpleadosEmTel");
        resolve();
      },
      error: reject
    });
  });
}

async function SeleccionarEmpleadoDirEmTel(id, nameEmpleado) {
  $("#EmpleadoSelectedEmTel").val(id);
  $("#EmpleadoSeleccionadoEmTel").html(nameEmpleado);
  $("#txtCorreoEmTel, #txtTelEmTel, #txtMCortaEmTel").val("");
}

async function addEmpleadosDirectorioCorreosTelefonos() {
  const result = await Swal.fire({ title:"Confirmación",text:"¿Confirmar datos ingresados?",icon:"question",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, confirmar",cancelButtonText:"Cancelar" });
  if (!result.isConfirmed) return;
  const Email = $("#txtCorreoEmTel").val();
  if (Email && !validateEmail(Email)) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Formato incorrecto!</span><span class="alert-text">Correo no válido.</span></div>`, "top-right", 5000); return; }
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data: {
      op: "addEmpleadosDirectorioCorreosTelefonos",
      idDirectoriosCorreosTelefonos: Number($("#IdTipoEmTel").val()),
      NoEmpleado: $("#EmpleadoSelectedEmTel").val(),
      Email, Telefono: $("#txtTelEmTel").val(), MarcacionCorta: $("#txtMCortaEmTel").val()
    }});
    if (resp == 1) {
      showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Agregado.</span></div>`, "top-right", 5000);
      loadDirecorioEmailTel();
      $("#EmpleadoSelectedEmTel, #txtCorreoEmTel, #txtTelEmTel, #txtMCortaEmTel").val("");
      $("#EmpleadoSeleccionadoEmTel").html("");
      getListadoPersonal();
    } else {
      showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000);
    }
  } catch(e) { console.error(e); showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
}

async function updateRegistroDirectorioCorreosTelefonos(val) {
  const result = await Swal.fire({ title:"Confirmación",text:"¿Confirmar datos actualizados?",icon:"question",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, confirmar",cancelButtonText:"Cancelar" });
  if (!result.isConfirmed) return;
  const Email = $("#emailDir"+val).val();
  if (Email && !validateEmail(Email)) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Formato incorrecto!</span><span class="alert-text">Correo no válido.</span></div>`, "top-right", 5000); return; }
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data: {
      op:"updateRegistroDirectorioCorreosTelefonos", Email, Telefono:$("#movilDir"+val).val(), Registro:val, MCorta:$("#MCortaDir"+val).val()
    }});
    if (resp == 1) {
      showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Actualizado.</span></div>`, "top-right", 5000);
      loadDirecorioEmailTel();
    } else {
      showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000);
    }
  } catch(e) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
}

async function deleteEmpleadosDirectorioCorreosTelefonos(val) {
  const result = await Swal.fire({ title:"Confirmación",html:"<h6>¿Eliminar empleado del directorio?</h6>",icon:"warning",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar" });
  if (!result.isConfirmed) return;
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{op:"deleteEmpleadosDirectorioCorreosTelefonos",idDetalleDirectoriosCorreosTelefonos:val} });
    if (resp == 1) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Eliminado correctamente.</span></div>`, "top-right", 5000); loadDirecorioEmailTel(); }
    else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">No se pudo eliminar.</span></div>`, "top-right", 5000); }
  } catch(e) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
}

function getPuestos() {
  return new Promise((resolve) => {
    $.ajax({ type:"post", url:"Backend/Puestos/App.php", data:"op=getPuestos",
      success: function(resp) {
        resp = JSON.parse(resp.trim());
        $("#slctPuestoEm").html(`<option value="">Puestos</option>`);
        resp.forEach(r => $("#slctPuestoEm").append(`<option value="${r.IdPuesto}">${r.Puesto}</option>`));
        $("#slctPuestoEm").trigger("change");
        resolve();
      }, error: resolve
    });
  });
}

function getDivisiones() {
  return new Promise((resolve) => {
    $.ajax({ type:"post", url:"Backend/Divisiones/App.php", data:{op:"getDivisiones"},
      success: function(resp) {
        try { resp = JSON.parse(resp.trim()); } catch(e) { resolve(); return; }
        $("#slctDivisionEm").empty().append(`<option value="">Divisiones</option>`);
        resp.forEach(r => $("#slctDivisionEm").append(`<option value="${r.IdDivision}">${r.Division}</option>`));
        $("#slctDivisionEm").trigger("change");
        resolve();
      }, error: resolve
    });
  });
}

function getSucursales() {
  return new Promise((resolve) => {
    $.ajax({ type:"post", url:"Backend/Sucursal/App.php", data:"op=getSucursales",
      success: function(resp) {
        resp = JSON.parse(resp.trim());
        $("#slctSucursalEm").html(`<option value="">Sucursales</option>`);
        resp.forEach(r => $("#slctSucursalEm").append(`<option value="${r.IdSucursal}">${r.Sucursal}</option>`));
        $("#slctSucursalEm").trigger("change");
        resolve();
      }, error: resolve
    });
  });
}

// ─── Modal Extensiones ────────────────────────────────────────────────────────
async function openModalAddEmpExtensiones(idTipo, Nombre) {
  $.blockUI({ message:'<h5><i class="fa fa-spinner fa-spin"></i></h5>', css:{border:"none",padding:"15px",backgroundColor:"#000","border-radius":"10px",opacity:0.5,color:"#ffc407"} });
  $("#NameDirectorioExtension").html(`Directorio: ${Nombre}`);
  $("#IdTipoExtensiones").val(idTipo);
  $("#slctDivisionEmExt, #slctPuestoEmExt, #slctSucursalEmExt").val("").trigger("change");
  $("#txtExtension, #EmpleadoSelectedExtension").val("");
  $("#EmpleadoSeleccionadoDirExt").html("");
  try {
    await Promise.all([getPuestosExtensiones(), getDivisionesExtensiones(), getSucursalesExtensiones()]);
    const modal = new bootstrap.Modal(document.getElementById("modalAddEmpleadosDirectorioExtensiones"));
    modal.show();
    await getListadoPersonalExtensiones();
  } catch(e) { console.error(e); } finally { $.unblockUI(); }
}

function getListadoPersonalExtensiones() {
  return new Promise((resolve, reject) => {
    const datasend = {
      op: "getPersonalDirectorioExtensiones",
      puesto:   $("#slctPuestoEmExt").val(),
      sucursal: $("#slctSucursalEmExt").val(),
      division: $("#slctDivisionEmExt").val(),
      idDirectorioExtensiones: Number($("#IdTipoExtensiones").val()),
    };
    $.ajax({
      type:"POST", url:"Backend/Empleados/App.php", data: datasend, dataType:"json",
      success: function(resp) {
        if (!Array.isArray(resp)) resp = [];
        if (gridPersonalExtMap) { gridPersonalExtMap.destroy(); gridPersonalExtMap = null; }
        gridPersonalExtMap = new ej.grids.Grid({
          dataSource: resp, allowPaging: true, pageSettings:{pageSize:8}, toolbar:["Search"],
          columns: [
            { field:"NoEmpleado", headerText:"NO EMP.", width:100, textAlign:"Center" },
            { field:"Nombre",     headerText:"NOMBRE",  width:200 },
            { headerText:"SELEC.", width:80, textAlign:"Center", disableHtmlEncode:false,
              template: r => `<button class="btn btn-success btn-sm btn-sel-ext" data-no="${r.NoEmpleado}" data-nombre="${r.Nombre}"><span class="material-symbols-outlined" style="font-size:18px;">add</span></button>` },
          ],
          recordClick: function(args) {
            const el = args.target;
            if (!el || !el.closest) return;
            const btn = el.closest(".btn-sel-ext");
            if (btn) SeleccionarEmpleadoExt(btn.dataset.no, btn.dataset.nombre);
          },
          created: function() {
            const inp = document.getElementById(this.element.id + "_searchbar");
            if (inp && !inp._bound) { inp._bound = true; const g = this; inp.addEventListener("keyup", e => g.search(e.target.value)); }
          }
        });
        gridPersonalExtMap.appendTo("#tableEmpleadosExtensiones");
        resolve();
      },
      error: reject
    });
  });
}

async function SeleccionarEmpleadoExt(id, nameEmpleado) {
  $("#EmpleadoSelectedExtension").val(id);
  $("#EmpleadoSeleccionadoDirExt").html(nameEmpleado);
  $("#txtExtension").val("");
}

async function addEmpleadoDirectorioExtensiones() {
  const NoEmpleado = $("#EmpleadoSelectedExtension").val();
  const Extension  = $("#txtExtension").val();
  if (!NoEmpleado) { toastr.info("Seleccione un empleado."); return; }
  if (!Extension)  { toastr.info("Ingrese una extensión."); return; }
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{
      op:"addEmpleadoDirectorioExtensiones", idDirectorioExtensiones:Number($("#IdTipoExtensiones").val()), NoEmpleado, Extension
    }});
    if (resp == 1) {
      toastr.success("Agregado");
      $("#txtExtension, #EmpleadoSelectedExtension").val("");
      $("#EmpleadoSeleccionadoDirExt").html("");
      loadDirectorioExtensiones();
      getListadoPersonalExtensiones();
    } else { toastr.info(resp); }
  } catch(e) { console.error(e); }
}

async function deleteEmpleadosDirectorioExtension(val) {
  const result = await Swal.fire({ title:"Confirmación",text:"¿Eliminar empleado del directorio?",icon:"warning",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar" });
  if (!result.isConfirmed) return;
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{op:"deleteEmpleadosDirectorioExtension",idDetalleDirectorioExtensiones:val} });
    if (resp == 1) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Eliminado correctamente.</span></div>`, "top-right", 5000); loadDirectorioExtensiones(); }
    else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error al eliminar.</span></div>`, "top-right", 5000); }
  } catch(e) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
}

async function updateExtesionEmp(DetalleId, Directorio) {
  const result = await Swal.fire({ title:"Confirmación",text:"¿Actualizar extensión?",icon:"question",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, actualizar",cancelButtonText:"Cancelar" });
  if (!result.isConfirmed) return;
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{
      op:"updateExtensionEmpleado", idDetalleDirectorioExtensiones:DetalleId, Extension:$("#Extension"+DetalleId).val(), Directorio
    }});
    if (resp == 1) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Extensión actualizada.</span></div>`, "top-right", 5000); loadDirectorioExtensiones(); }
    else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000); }
  } catch(e) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
}

function getPuestosExtensiones() {
  return new Promise(resolve => {
    $.ajax({ type:"post", url:"Backend/Puestos/App.php", data:"op=getPuestos",
      success: function(resp) {
        resp = JSON.parse(resp.trim());
        $("#slctPuestoEmExt").html(`<option value="">Puestos</option>`);
        resp.forEach(r => $("#slctPuestoEmExt").append(`<option value="${r.IdPuesto}">${r.Puesto}</option>`));
        $("#slctPuestoEmExt").trigger("change"); resolve();
      }, error: resolve
    });
  });
}

function getDivisionesExtensiones() {
  return new Promise(resolve => {
    $.ajax({ type:"post", url:"Backend/Divisiones/App.php", data:"op=getDivisiones",
      success: function(resp) {
        resp = JSON.parse(resp.trim());
        $("#slctDivisionEmExt").html(`<option value="">Divisiones</option>`);
        resp.forEach(r => $("#slctDivisionEmExt").append(`<option value="${r.IdDivision}">${r.Division}</option>`));
        $("#slctDivisionEmExt").trigger("change"); resolve();
      }, error: resolve
    });
  });
}

function getSucursalesExtensiones() {
  return new Promise(resolve => {
    $.ajax({ type:"post", url:"Backend/Sucursal/App.php", data:"op=getSucursales",
      success: function(resp) {
        resp = JSON.parse(resp.trim());
        $("#slctSucursalEmExt").html(`<option value="">Sucursales</option>`);
        resp.forEach(r => $("#slctSucursalEmExt").append(`<option value="${r.IdSucursal}">${r.Sucursal}</option>`));
        $("#slctSucursalEmExt").trigger("change"); resolve();
      }, error: resolve
    });
  });
}

// ─── Sucursales CRUD ─────────────────────────────────────────────────────────
$(document).ready(function() {
  $("#btnOpenModalSucursal").click(function() {
    getSucursalesDisponiblesDirectorio();
    $("#txtDireccionSucursal, #txtTelefono, #txtNumRed, #txtCorreo, #txtMarcacionCorta, #inpFechaApertura").val("");
    new bootstrap.Modal(document.getElementById("modalAddSucursalesDirectorio")).show();
  });

  $("#btnAgregaSucursalDirectorio").click(async function() {
    const result = await Swal.fire({ title:"Confirmación",text:"¿Confirmar datos ingresados?",icon:"question",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, agregar",cancelButtonText:"Cancelar" });
    if (!result.isConfirmed) return;

    const IdSucursal     = $("#slctListadoSucursalesDisp").val();
    const Direccion      = $("#txtDireccionSucursal").val();
    const Telefono       = $("#txtTelefono").val();
    const Correo         = $("#txtCorreo").val();
    const FechaApertura  = $("#inpFechaApertura").val();
    const MarcacionCorta = $("#txtMarcacionCorta").val();
    const NumRed         = $("#txtNumRed").val();

    if (!IdSucursal || !Direccion || !Telefono || !Correo || !FechaApertura || !MarcacionCorta) {
      showBootstrapAlert(`<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Ingrese todos los datos.</span></div>`, "top-right", 5000);
      return;
    }
    if (!validateEmail(Correo)) {
      showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Formato incorrecto!</span><span class="alert-text">Correo no válido.</span></div>`, "top-right", 5000);
      return;
    }
    try {
      const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{op:"addSucursalesDirectorio",IdSucursal,Direccion,Telefono,NumRed,Correo,FechaApertura,MarcacionCorta} });
      if (resp == "1") {
        showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Sucursal agregada.</span></div>`, "top-right", 5000);
        $("#txtDireccionSucursal, #txtTelefono, #txtNumRed, #txtCorreo, #txtMarcacionCorta, #inpFechaApertura").val("");
        getDirectorioSucursal();
        bootstrap.Modal.getInstance(document.getElementById("modalAddSucursalesDirectorio")).hide();
      } else {
        showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000);
      }
    } catch(e) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
  });
});

async function getSucursalesDisponiblesDirectorio() {
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{op:"getSucursalesDisponiblesDirectorio"}, dataType:"json" });
    $("#slctListadoSucursalesDisp").html(`<option value="" selected disabled>Sucursales Disponibles</option>`);
    (resp||[]).forEach(c => $("#slctListadoSucursalesDisp").append(`<option value="${c.IdSucursal}">${c.Sucursal}</option>`));
  } catch(e) { console.warn(e); }
}

async function updateRegistroDirectorioSucursal(val) {
  const result = await Swal.fire({ title:"Confirmación",text:"¿Confirmar datos ingresados?",icon:"question",showCancelButton:true,confirmButtonColor:"#ffc407",cancelButtonColor:"#d33",confirmButtonText:"Sí, actualizar",cancelButtonText:"Cancelar" });
  if (!result.isConfirmed) return;
  const Correo = $("#CorreoSucur"+val).val();
  if (Correo && !validateEmail(Correo)) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Formato incorrecto!</span><span class="alert-text">Correo no válido.</span></div>`, "top-right", 5000); return; }
  try {
    const resp = await $.ajax({ type:"post", url:"Backend/Directorios/App.php", data:{
      op:"updateRegistroDirectorioSucursal",
      Direccion:$("#DirSucur"+val).val(), Telefono:$("#TelSucur"+val).val(),
      NumRed:$("#NumRedSucur"+val).val(), Correo, MarcacionCorta:$("#MCorta"+val).val(),
      idDirectorioSucursales:val
    }});
    if (resp == 1) { showBootstrapAlertSuc(`<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Registro actualizado.</span></div>`, "top-right", 5000); getDirectorioSucursal(); }
    else { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">${resp}</span></div>`, "top-right", 5000); }
  } catch(e) { showBootstrapAlertWar(`<div class="alert-content"><span class="alert-title">Alerta!</span><span class="alert-text">Error inesperado.</span></div>`, "top-right", 5000); }
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}
