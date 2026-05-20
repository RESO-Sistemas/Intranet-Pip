<!-- ===== MODAL: AGREGAR NUEVO EVALUADOR ===== -->
<div class="modal fade" id="modalEvaluadoresBootstrap" tabindex="-1"
  aria-labelledby="modalEvaluadoresBootstrapLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
    <div class="modal-content" style="border-radius:14px;overflow:hidden;border:none;box-shadow:0 20px 60px rgba(0,0,0,0.15);">

      <!-- Header -->
      <div class="ev-modal-header-styled">
        <div class="ev-modal-title-styled">
          <div class="ev-modal-icon teal">
            <span class="material-symbols-outlined" style="font-size:16px;">person_add</span>
          </div>
          <span id="modalEvaluadoresBootstrapLabel">Agregar Evaluador</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body p-0">

        <!-- Filtros -->
        <div class="ev-filter-section">
          <div class="ev-filter-label">
            <span class="material-symbols-outlined">tune</span> Filtros
          </div>
          <div class="row g-2 mb-2">
            <div class="col-md-3">
              <label class="ev-modal-form-label">Relación</label>
              <select class="form-select form-select-sm" id="modal_relacion">
                <option value="1">JEFE</option>
                <option value="2">PAR</option>
                <option value="3">SUBORDINADO</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="ev-modal-form-label">División</label>
              <select id="slcDivisionModal" class="form-select form-select-sm"></select>
            </div>
            <div class="col-md-3">
              <label class="ev-modal-form-label">Sucursal</label>
              <select id="slcSucursalModal" class="form-select form-select-sm"></select>
            </div>
            <div class="col-md-3">
              <label class="ev-modal-form-label">Puesto</label>
              <select id="slcPuestosModal" class="form-select form-select-sm"></select>
            </div>
          </div>
        </div>

        <!-- Lista de empleados disponibles -->
        <div class="p-3">
          <div class="ev-filter-label">
            <span class="material-symbols-outlined">people</span> Empleados disponibles
          </div>
          <div class="input-group input-group-sm mb-2">
            <span class="input-group-text bg-white border-end-0">
              <span class="material-symbols-outlined text-muted" style="font-size:16px;">search</span>
            </span>
            <input type="text" id="txtBuscarPosibleEvaluador" class="form-control border-start-0"
              placeholder="Buscar empleado..." oninput="filtrarPosiblesEvaluadores()">
          </div>
          <div id="ev-posibles-evaluadores-list"
            style="max-height:320px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;">
            <p class="text-muted text-center py-3" style="font-size:0.85rem;">
              Selecciona un filtro para ver empleados
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
