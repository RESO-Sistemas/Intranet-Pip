<!-- ===== OFFCANVAS: EVALUADORES DEL EVALUADO ===== -->
<div class="offcanvas offcanvas-end ev-evaluadores-panel" tabindex="-1"
  id="offcanvas_evaluadores" aria-labelledby="offcanvasEvaluadoresLabel">

  <div class="offcanvas-header">
    <div>
      <div class="ev-panel-meta">Evaluadores asignados</div>
      <div class="ev-panel-title" id="offcanvas-evaluado-nombre">—</div>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
  </div>

  <div class="offcanvas-body">
    <input type="hidden" id="evaluadoSelected">

    <div id="ev-evaluadores-list">
      <p class="text-muted text-center py-3" style="font-size:0.85rem;">Cargando evaluadores...</p>
    </div>

    <button class="btn-ghost mt-2" id="btnNuevoEvaluador" type="button">
      <span class="material-symbols-outlined" style="font-size:18px;">person_add</span>
      Agregar evaluador
    </button>
  </div>

</div>
