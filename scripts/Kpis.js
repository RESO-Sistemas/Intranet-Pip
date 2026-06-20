const url_m_Kpis = "Backend/Kpis/App.php";

// Cargar al inicio — ambas peticiones en paralelo
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const [puestos, kpis] = await Promise.all([
      $.ajax({ type: "post", url: url_m_Kpis, data: { op: "getPuestos" }, dataType: "json" }),
      $.ajax({ type: "post", url: url_m_Kpis, data: { op: "getKpis" }, dataType: "json" })
    ]);
    listaPuestos = puestos;
    let options = '<option value="" disabled selected>-- Seleccione un puesto --</option>';
    puestos.forEach(function (p) { options += `<option value="${p.IdPuesto}">${p.Puesto}</option>`; });
    $('#slctPuestos').html(options);
    _renderTablaKpis(kpis);
  } catch (e) {
    console.error("Error al inicializar:", e);
  }
});

// Variables de estado
let editando = false;
let gridKpis = null; // referencia al Grid de Syncfusion
let listaPuestos = []; // cache de puestos para mostrar nombres



/**
 * Mostrar/ocultar el select de puestos
 */
function togglePuestosSelect() {
  if ($('#chkParaTodos').is(':checked')) {
    $('#divPuestos').addClass('d-none');
    $('#slctPuestos').val('');
  } else {
    $('#divPuestos').removeClass('d-none');
  }
}

/**
 * Obtener nombre de puesto por ID
 */
function getNombrePuesto(id) {
  const p = listaPuestos.find(x => x.IdPuesto == id);
  return p ? p.Puesto : id;
}

/**
 * Obtener listado de KPIs y pintar la tabla
 */
async function getKpis() {
  try {
    const respuesta = await $.ajax({
      type: "post",
      url: url_m_Kpis,
      data: { op: "getKpis" },
      dataType: "json",
    });
    _renderTablaKpis(respuesta);
  } catch (e) {
    console.error("Error al obtener KPIs:", e);
  }
}

/**
 * Renderizar la tabla KPIs con datos ya cargados
 */
function _renderTablaKpis(respuesta) {
  // Aplicar orden guardado en localStorage (si existe)
  const ordenGuardado = localStorage.getItem('kpis_custom_order');
  if (ordenGuardado) {
    try {
      const ids = JSON.parse(ordenGuardado);
      const map = {};
      respuesta.forEach(function (r) { map[r.IdKpi] = r; });
      // KPIs nuevos (no están en el orden guardado) van al INICIO
      const nuevos = respuesta.filter(function (r) { return !ids.includes(r.IdKpi); });
      const existentes = ids.filter(function (id) { return map[id]; }).map(function (id) { return map[id]; });
      respuesta = nuevos.concat(existentes);
      // Persistir el orden actualizado (con los nuevos ya al frente)
      localStorage.setItem('kpis_custom_order', JSON.stringify(respuesta.map(function (r) { return r.IdKpi; })));
    } catch (e) { /* si el JSON está corrupto lo ignoramos */ }
  } else {
    // Sin orden guardado: más reciente primero
    respuesta = respuesta.slice().sort(function (a, b) { return b.IdKpi - a.IdKpi; });
  }

  if (gridKpis) {
      gridKpis.destroy();
  }

  let mappedData = respuesta.map(row => {
      let ValorAltaFormat = parseFloat(row.ValorAlta).toFixed(2);
      let ValorMediaFormat = parseFloat(row.ValorMedia).toFixed(2);
      let ValorBajaFormat = parseFloat(row.ValorBaja).toFixed(2);
      
      let htmlPuestos = "";
      if (!row.Puestos || row.Puestos === 'TODOS') {
          htmlPuestos = '<span class="badge bg-info text-white">Todos</span>';
      } else {
          const ids = row.Puestos.split(',').map(function (id) { return id.trim(); });
          const MAX = 2;
          const uid = 'pp_' + row.IdKpi;
          const visibles = ids.slice(0, MAX);
          const ocultos  = ids.slice(MAX);

          htmlPuestos = '<div class="d-flex flex-wrap gap-1 justify-content-center">';
          visibles.forEach(function (id) {
            htmlPuestos += '<span class="badge badge-puesto">' + getNombrePuesto(id) + '</span>';
          });

          if (ocultos.length > 0) {
            htmlPuestos += '<div id="' + uid + '" style="display:none;flex-wrap:wrap;gap:4px;">';
            ocultos.forEach(function (id) {
              htmlPuestos += '<span class="badge badge-puesto">' + getNombrePuesto(id) + '</span>';
            });
            htmlPuestos += '</div>';
            htmlPuestos += '<span class="badge bg-warning text-dark" style="cursor:pointer;" '
                  + 'onclick="(function(el,btn){'
                  +   'var hidden=document.getElementById(\'' + uid + '\');'
                  +   'if(hidden.style.display===\'none\'){'
                  +     'hidden.style.display=\'flex\';btn.textContent=\'− menos\';'
                  +   '}else{'
                  +     'hidden.style.display=\'none\';btn.textContent=\'+' + ocultos.length + ' más\';'
                  +   '}'
                  + '})(this)">'
                  + '+' + ocultos.length + ' más</span>';
          }
          htmlPuestos += '</div>';
      }

      let badgeEstado = row.Activo == 1 ? '<span class="badge-activo">Activo</span>' : '<span class="badge-inactivo">Inactivo</span>';

      const idEncoded = btoa(row.IdKpi);
      const toggleIcon = row.Activo == 1 ? 'toggle_on' : 'toggle_off';
      const toggleColor = row.Activo == 1 ? 'btn-success' : 'btn-danger';
      const toggleTitle = row.Activo == 1 ? 'Desactivar' : 'Activar';
      const nuevoEstado = row.Activo == 1 ? 0 : 1;
      const puestosData = row.Puestos ? row.Puestos.replace(/'/g, "\'") : 'TODOS';

      let btnAcciones = `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-accion btn-editar-kpi" title="Editar">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn ${toggleColor} btn-accion btn-toggle-kpi" title="${toggleTitle}">
              <span class="material-symbols-outlined">${toggleIcon}</span>
            </button>
            <button class="btn btn-danger btn-accion btn-delete-kpi" title="Eliminar">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>`;

      return {
          ...row,
          ValorAltaFormat: ValorAltaFormat,
          ValorMediaFormat: ValorMediaFormat,
          ValorBajaFormat: ValorBajaFormat,
          HtmlPuestos: htmlPuestos,
          BadgeEstado: badgeEstado,
          BtnAcciones: btnAcciones,
          idEncoded: idEncoded,
          nuevoEstado: nuevoEstado,
          puestosData: puestosData
      };
  });

  gridKpis = new ej.grids.Grid({
    dataSource: mappedData,
    toolbar: ["Search"],
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
        <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
            <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">query_stats</span>
        </div>
        <h5 class="text-dark mb-2" style="font-weight: 600;">Sin KPIs</h5>
        <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay KPIs registrados en el sistema.</p>
      </div>`,
    columns: [
        { field: "Nombre", headerText: "NOMBRE", width: 200 },
        { field: "ValorAltaFormat", headerText: "VALOR ALTA", width: 130 },
        { field: "ValorMediaFormat", headerText: "VALOR MEDIA", width: 130 },
        { field: "ValorBajaFormat", headerText: "VALOR BAJA", width: 130 },
        { field: "HtmlPuestos", headerText: "ASIGNADO A", width: 250, disableHtmlEncode: false },
        { field: "BadgeEstado", headerText: "ESTADO", width: 120, disableHtmlEncode: false },
        { field: "BtnAcciones", headerText: "ACCIONES", width: 160, textAlign: "Center", disableHtmlEncode: false }
    ],
    dataBound: function () {
        const gridElement = this.element;
        const toolbar = gridElement.querySelector(".e-toolbar");
        const header = gridElement.querySelector(".e-gridheader");
        const pager = gridElement.querySelector(".e-gridpager");
        const gridContent = gridElement.querySelector(".e-gridcontent");
        if (this.currentViewData.length === 0) {
            if (toolbar) toolbar.style.display = "none";
            if (header) header.style.display = "none";
            if (pager) pager.style.display = "none";
            gridElement.style.border = "none";
            if (gridContent) gridContent.style.border = "none";
        } else {
            if (toolbar) toolbar.style.display = "";
            if (header) header.style.display = "";
            if (pager) pager.style.display = "";
            gridElement.style.border = "";
            if (gridContent) gridContent.style.border = "";
        }
    },
    recordClick: function(args) {
        const clickedElement = args.target;
        if (!clickedElement || typeof clickedElement.closest !== "function") return;
        const rowData = args.rowData;
        if (clickedElement.closest(".btn-editar-kpi")) {
            editarKpi(rowData.idEncoded, rowData.Nombre, rowData.ValorAlta, rowData.ValorMedia, rowData.ValorBaja, rowData.Prioridad, rowData.puestosData);
        }
        if (clickedElement.closest(".btn-toggle-kpi")) {
            toggleKpi(rowData.idEncoded, rowData.nuevoEstado);
        }
        if (clickedElement.closest(".btn-delete-kpi")) {
            eliminarKpi(rowData.idEncoded);
        }
    },
    created: function () {
        const searchInput = document.getElementById(this.element.id + "_searchbar");
        if (searchInput && !searchInput.hasListener) {
        searchInput.hasListener = true;
        const grid = this;
        searchInput.addEventListener("keyup", function (event) {
            grid.search(event.target.value);
        });
        }
    }
  });

  gridKpis.appendTo("#TableKpis");
}


/**
 * Guardar KPI (insertar o actualizar)
 */
async function guardarKpi() {
  const idKpi = $('#txtIdKpi').val();
  const nombre = $('#txtNombreKpi').val().trim();
  const valorAlta = $('#txtValorAlta').val();
  const valorMedia = $('#txtValorMedia').val();
  const valorBaja = $('#txtValorBaja').val();
  const prioridad = $('#slctPrioridad').val();
  const paraTodos = $('#chkParaTodos').is(':checked');
  const puestosSeleccionados = $('#slctPuestos').val();

  // Validaciones
  if (!nombre) {
    toastr.warning("Ingrese el nombre del KPI.");
    return;
  }
  if (!valorAlta || !valorMedia || !valorBaja) {
    toastr.warning("Ingrese los tres valores de rango (Alta, Media, Baja).");
    return;
  }
  if (!prioridad) {
    toastr.warning("Seleccione la prioridad del KPI.");
    return;
  }
  if (!paraTodos && !puestosSeleccionados) {
    toastr.warning("Seleccione un puesto o marque 'Aplica para todos'.");
    return;
  }

  if (parseFloat(valorAlta) <= parseFloat(valorMedia)) {
    toastr.warning("El valor Alta debe ser mayor que el valor Media.");
    return;
  }
  if (parseFloat(valorMedia) <= parseFloat(valorBaja)) {
    toastr.warning("El valor Media debe ser mayor que el valor Baja.");
    return;
  }

  const puestos = paraTodos ? 'TODOS' : puestosSeleccionados;

  const dataSend = {
    op: "insertKpi",
    nombre: nombre,
    valorAlta: valorAlta,
    valorMedia: valorMedia,
    valorBaja: valorBaja,
    prioridad: prioridad,
    puestos: puestos
  };

  const ajaxR = await pAjaxAsync(url_m_Kpis, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    limpiarFormulario();
    getKpis();
  }
}

/**
 * Cargar datos de un KPI en el MODAL para editar
 */
function editarKpi(idEncoded, nombre, valorAlta, valorMedia, valorBaja, prioridad, puestos) {
  // Poblar campos del modal
  $('#modalIdKpi').val(idEncoded);
  $('#modalNombreKpi').val(nombre);
  $('#modalValorAlta').val(parseFloat(valorAlta));
  $('#modalValorMedia').val(parseFloat(valorMedia));
  $('#modalValorBaja').val(parseFloat(valorBaja));

  // Poblar opciones del select de puestos
  let optionsHtml = '<option value="" disabled selected>-- Seleccione un puesto --</option>';
  listaPuestos.forEach(function(p) {
    optionsHtml += `<option value="${p.IdPuesto}">${p.Puesto}</option>`;
  });
  $('#modalSlctPuestos').html(optionsHtml);

  // Guardar datos de puestos y prioridad para aplicar después de que el modal abra
  const puestosData = puestos;
  const prioridadData = prioridad;

  // Destruir Select2 previo de prioridad para reinicializar limpio
  if ($('#modalPrioridad').hasClass('select2-hidden-accessible')) {
    $('#modalPrioridad').select2('destroy');
  }

  // Abrir modal con opciones para que no se cierre por fuera ni con ESC
  const modalEl = document.getElementById('modalEditarKpi');
  const modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });

  // Inicializar Select2 DESPUÉS de que el modal esté completamente visible
  $(modalEl).one('shown.bs.modal', function () {
    $('#modalPrioridad').select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: $('#modalEditarKpi')
    }).val(prioridadData).trigger('change');

    if (!puestosData || puestosData === 'TODOS') {
      $('#modalChkParaTodos').prop('checked', true);
      $('#modalDivPuestos').addClass('d-none');
      $('#modalSlctPuestos').val('');
    } else {
      $('#modalChkParaTodos').prop('checked', false);
      $('#modalDivPuestos').removeClass('d-none');
      $('#modalSlctPuestos').val(puestosData.split(',')[0]);
    }
  });
  modal.show();
}

/**
 * Eliminar un KPI
 */
async function eliminarKpi(idEncoded) {
  Swal.fire({
    title: '¿Eliminar KPI?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataSend = { op: "deleteKpi", idKpi: idEncoded };
      const ajaxR = await pAjaxAsync(url_m_Kpis, dataSend, 1);
      if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
        // Limpiar del orden guardado en localStorage
        const ordenGuardado = localStorage.getItem('kpis_custom_order');
        if (ordenGuardado) {
          try {
            const id = atob(idEncoded);
            const ids = JSON.parse(ordenGuardado).filter(function (x) { return x != id; });
            localStorage.setItem('kpis_custom_order', JSON.stringify(ids));
          } catch (e) {}
        }
        getKpis();
      }
    }
  });
}

/**
 * Activar/Desactivar un KPI
 */
async function toggleKpi(idEncoded, nuevoEstado) {
  const accion = nuevoEstado == 1 ? "activar" : "desactivar";

  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas ${accion} este KPI?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#008837',
    cancelButtonColor: '#6c757d',
    confirmButtonText: `Sí, ${accion}`,
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataSend = {
        op: "toggleKpi",
        idKpi: idEncoded,
        activo: nuevoEstado
      };
      const ajaxR = await pAjaxAsync(url_m_Kpis, dataSend, 1);
      if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
        getKpis();
      }
    }
  });
}

/**
 * Mostrar/ocultar select de puestos en el MODAL
 */
function togglePuestosSelectModal() {
  if ($('#modalChkParaTodos').is(':checked')) {
    $('#modalDivPuestos').addClass('d-none');
    $('#modalSlctPuestos').val('');
  } else {
    $('#modalDivPuestos').removeClass('d-none');
  }
}

/**
 * Guardar edición desde el modal
 */
async function guardarEdicionKpi() {
  const idKpi     = $('#modalIdKpi').val();
  const nombre    = $('#modalNombreKpi').val().trim();
  const valorAlta = $('#modalValorAlta').val();
  const valorMedia= $('#modalValorMedia').val();
  const valorBaja = $('#modalValorBaja').val();
  const prioridad = $('#modalPrioridad').val();
  const paraTodos = $('#modalChkParaTodos').is(':checked');
  const puestosSeleccionados = $('#modalSlctPuestos').val();

  if (!nombre) { toastr.warning("Ingrese el nombre del KPI."); return; }
  if (!valorAlta || !valorMedia || !valorBaja) { toastr.warning("Ingrese los tres valores de rango."); return; }
  if (!prioridad) { toastr.warning("Seleccione la prioridad."); return; }
  if (!paraTodos && !puestosSeleccionados) {
    toastr.warning("Seleccione un puesto o marque 'Aplica para todos'."); return;
  }
  if (parseFloat(valorAlta) <= parseFloat(valorMedia)) { toastr.warning("El valor Alta debe ser mayor que Media."); return; }
  if (parseFloat(valorMedia) <= parseFloat(valorBaja)) { toastr.warning("El valor Media debe ser mayor que Baja."); return; }

  const puestos = paraTodos ? 'TODOS' : puestosSeleccionados;

  const dataSend = {
    op: "updateKpi",
    idKpi: idKpi,
    nombre, valorAlta, valorMedia, valorBaja, prioridad, puestos
  };

  const ajaxR = await pAjaxAsync(url_m_Kpis, dataSend, 1);
  if (ajaxR && ajaxR.Resultado && ajaxR.Siguiente) {
    bootstrap.Modal.getInstance(document.getElementById('modalEditarKpi')).hide();
    getKpis();
  }
}

/**
 * Mostrar / ocultar el formulario de nuevo KPI
 */
function mostrarFormKpi() {
  const sec = document.getElementById('seccionFormKpi');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ocultarFormKpi() {
  document.getElementById('seccionFormKpi').style.display = 'none';
  limpiarFormulario();
}

/**
 * Limpiar formulario
 */
function limpiarFormulario() {
  editando = false;
  $('#txtIdKpi').val('');
  $('#txtNombreKpi').val('');
  $('#txtValorAlta').val('');
  $('#txtValorMedia').val('');
  $('#txtValorBaja').val('');
  $('#slctPrioridad').val('');
  $('#chkParaTodos').prop('checked', true);
  $('#divPuestos').addClass('d-none');
  $('#slctPuestos').val('');

  $('#formTitle').text('Nuevo KPI');
  $('#btnRegistrar').html('<i class="fas fa-plus me-1"></i>Registrar');
  document.getElementById('seccionFormKpi').style.display = 'none';
}
