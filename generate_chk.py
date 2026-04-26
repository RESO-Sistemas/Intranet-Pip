import re

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/Checklists.js', 'r') as f:
    code = f.read()

# Replace global variable
code = code.replace("let tablaChecklistsInstance = null;", "let gridChecklists = null;")

# Rewrite _renderTablaChecklists
render_fn = """function _renderTablaChecklists(data) {
  if (gridChecklists) {
      gridChecklists.destroy();
  }

  let mappedData = data.map(row => {
      let puestoTexto = getNombrePuestoChk(row.IdPuesto);
      
      let turnosTexto = '—';
      if (row.Turnos) {
          const ids = row.Turnos.split(',').map(id => id.trim());
          turnosTexto = ids.map(id => getNombreTurnoChk(id)).join(', ');
      }
      
      let badgeTipo = row.Tipo === 'Critico' 
          ? '<span class="badge-critico">Crítico</span>' 
          : '<span class="badge-no-critico">No Crítico</span>';
          
      let badgeRespuesta = row.RespuestaEsperada == 1 
          ? '<span class="badge-verdadero">Verdadero</span>' 
          : '<span class="badge-falso">Falso</span>';
          
      let kpiTexto = '<small>' + getNombreKpiChk(row.IdKpi) + '</small>';
      
      let badgeIncidencia = row.AbreIncidencia == 1 
          ? '<span class="badge-incidencia-si">Sí</span>' 
          : '<span class="badge-incidencia-no">No</span>';

      const idEncoded = btoa(row.IdChecklist);

      let btnAcciones = `<div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
            <button class="btn btn-primary btn-accion btn-editar-chk" title="Editar">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn-danger btn-accion btn-delete-chk" title="Eliminar">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>`;

      return {
          ...row,
          PuestoTexto: puestoTexto,
          TurnosTexto: turnosTexto,
          BadgeTipo: badgeTipo,
          BadgeRespuesta: badgeRespuesta,
          KpiTexto: kpiTexto,
          BadgeIncidencia: badgeIncidencia,
          BtnAcciones: btnAcciones,
          idEncoded: idEncoded
      };
  });

  gridChecklists = new ej.grids.Grid({
      dataSource: mappedData,
      toolbar: ["Search"],
      allowPaging: true,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 320px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
          <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
              <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">checklist</span>
          </div>
          <h5 class="text-dark mb-2" style="font-weight: 600;">Sin checklists</h5>
          <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">No hay checklists registrados en el sistema.</p>
        </div>`,
      columns: [
          { field: "Nombre", headerText: "NOMBRE", width: 250 },
          { field: "PuestoTexto", headerText: "PUESTO", width: 150 },
          { field: "TurnosTexto", headerText: "TURNOS", width: 150 },
          { field: "BadgeTipo", headerText: "TIPO", width: 120, disableHtmlEncode: false },
          { field: "BadgeRespuesta", headerText: "RESPUESTA", width: 120, disableHtmlEncode: false },
          { field: "KpiTexto", headerText: "KPI", width: 150, disableHtmlEncode: false },
          { field: "BadgeIncidencia", headerText: "INCIDENCIA", width: 120, disableHtmlEncode: false },
          { field: "BtnAcciones", headerText: "ACCIONES", width: 120, textAlign: "Center", disableHtmlEncode: false }
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
          if (clickedElement.closest(".btn-editar-chk")) {
              editarChecklist(rowData.idEncoded);
          }
          if (clickedElement.closest(".btn-delete-chk")) {
              eliminarChecklist(rowData.idEncoded);
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

  gridChecklists.appendTo("#TableChecklists");
}"""

pattern = re.compile(r'function _renderTablaChecklists\(data\) \{.*?(?=// ─── Mostrar / ocultar formulario ─────────────────────────────────────────────)', re.DOTALL)
code = pattern.sub(render_fn + "\n\n", code)

# Update the editarChecklist line that reads row data
code = code.replace("const row = tablaChecklistsInstance.rows().data().toArray().find(r => btoa(r.IdChecklist) === idEncoded);", "const row = gridChecklists.dataSource.find(r => btoa(r.IdChecklist) === idEncoded);")

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/Checklists.js', 'w') as f:
    f.write(code)

print("Checklists.js updated successfully")
