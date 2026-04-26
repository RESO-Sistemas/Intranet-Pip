import re

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/Kpis.js', 'r') as f:
    original_code = f.read()

# Replace global variable
new_code = original_code.replace("let tableKpis; // referencia a la tabla DataTable", "let gridKpis = null; // referencia al Grid de Syncfusion")

# Rewrite _renderTablaKpis
render_kpis = """function _renderTablaKpis(respuesta) {
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
                  +   'var hidden=document.getElementById(\\\'' + uid + '\\\');'
                  +   'if(hidden.style.display===\\\'none\\\'){'
                  +     'hidden.style.display=\\\'flex\\\';btn.textContent=\\\'− menos\\\';'
                  +   '}else{'
                  +     'hidden.style.display=\\\'none\\\';btn.textContent=\\\'+' + ocultos.length + ' más\\\';'
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
      const puestosData = row.Puestos ? row.Puestos.replace(/'/g, "\\\\'") : 'TODOS';

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
"""

# Find the function boundaries for _renderTablaKpis and remove saveKpisOrder and initDragDrop
pattern = re.compile(r'function _renderTablaKpis\(respuesta\) \{.*?(?=/\*\*\n \* Guardar KPI \(insertar o actualizar\)\n \*/)', re.DOTALL)
new_code = pattern.sub(render_kpis + "\n\n", new_code)

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/Kpis.js', 'w') as f:
    f.write(new_code)

print("Kpis.js updated successfully")
