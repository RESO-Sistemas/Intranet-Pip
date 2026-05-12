<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo</title>

  <?php include("neptune_styles.php"); ?>

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">

  <style>
    /* ===== PANEL DE DETALLE ===== */
    .evaluation-panel { width: min(1200px, 92vw); }
    .evaluation-panel .offcanvas-header { padding: 1rem 1.5rem; border-bottom: 1px solid #e9ecef; }
    .evaluation-panel-title { font-size: 1.05rem; font-weight: 600; }
    .evaluation-panel-meta { font-size: 0.85rem; color: #6c757d; }
    .evaluation-panel .nav-tabs .nav-link { padding: 0.6rem 1rem; font-weight: 600; }
    .evaluation-panel .offcanvas-body { display: flex !important; flex-direction: column; overflow: hidden; padding: 0; }
    .evaluation-panel .tab-content { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .evaluation-panel .tab-pane { flex: 1; min-height: 0; overflow-y: auto; }
    .evaluation-panel iframe { width: 100%; height: 100%; border: 0; display: block; }
    @media (max-width: 768px) { .evaluation-panel { width: 100vw; } }

    /* ===== MODAL WIZARD NUEVA EVALUACIÓN ===== */
    .ev-modal-dialog { max-width: min(860px, 96vw); }

    .ev-modal-content {
      font-family: 'DM Sans', sans-serif;
      border: none;
      border-radius: 18px !important;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    }

    .ev-modal-header {
      padding: 1.1rem 1.5rem;
      border-bottom: 1px solid #F1F5F9;
      background: #fff;
    }

    .ev-modal-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1E293B;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ev-modal-title i {
      width: 34px;
      height: 34px;
      background: #EEF2FF;
      color: #4F46E5;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      flex-shrink: 0;
    }

    /* --- BARRA DE PROGRESO --- */
    .ev-progress-bar-wrapper {
      padding: 1rem 1.5rem 0.75rem;
      background: #FAFBFF;
      border-bottom: 1px solid #F1F5F9;
    }

    .ev-wizard-track {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .ev-step-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      flex: 0 0 auto;
      position: relative;
      z-index: 2;
    }

    .ev-step-circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border: 2px solid #E2E8F0;
      background: #F8FAFC;
      color: #94A3B8;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ev-step-label {
      font-size: 10px;
      font-weight: 600;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      transition: color 0.3s ease;
    }

    .ev-step-node.active .ev-step-circle {
      background: #F59E0B;
      border-color: #F59E0B;
      color: #fff;
      box-shadow: 0 0 0 4px rgba(245,158,11,0.2);
    }

    .ev-step-node.active .ev-step-label { color: #D97706; }

    .ev-step-node.completed .ev-step-circle {
      background: #10B981;
      border-color: #10B981;
      color: #fff;
    }

    .ev-step-node.completed .ev-step-label { color: #10B981; }

    .ev-step-connector {
      flex: 1;
      height: 2px;
      background: #E2E8F0;
      margin-top: 19px;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    .ev-step-connector::after {
      content: '';
      position: absolute;
      left: 0; top: 0;
      height: 100%;
      width: 0%;
      background: #10B981;
      transition: width 0.4s ease;
    }

    .ev-step-connector.done::after { width: 100%; }

    /* --- PANES --- */
    .ev-modal-body { padding: 0; max-height: 68vh; overflow-y: auto; }

    .ev-wizard-pane { display: none; }
    .ev-wizard-pane.active { display: block; animation: evIn 0.25s ease forwards; }
    @keyframes evIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    /* --- SECTION HEADER --- */
    .ev-section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #F1F5F9;
    }

    .ev-section-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .ev-section-icon.indigo  { background: rgba(245,158,11,0.12); color: #D97706; }
    .ev-section-icon.teal    { background: rgba(20,184,166,0.1);  color: #14B8A6; }
    .ev-section-icon.amber   { background: rgba(245,158,11,0.1);  color: #F59E0B; }
    .ev-section-icon.emerald { background: rgba(16,185,129,0.1);  color: #10B981; }

    .ev-section-title { font-size: 0.9rem; font-weight: 700; color: #1E293B; margin: 0; }
    .ev-section-desc  { font-size: 12px; color: #64748B; margin: 0; }

    .ev-form-area { padding: 1.25rem 1.5rem; }

    /* --- SUB SECTIONS --- */
    .ev-sub-title {
      font-size: 11px;
      font-weight: 700;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ev-sub-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #F1F5F9;
    }

    .ev-sub-section { padding-top: 1rem; border-top: 1px solid #F1F5F9; margin-top: 0.25rem; }

    /* --- NAV FOOTER --- */
    .ev-wizard-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.9rem 1.5rem;
      border-top: 1px solid #F1F5F9;
      background: #FAFBFF;
    }

    .ev-wizard-nav .btn {
      min-width: 120px;
      font-weight: 600;
      font-size: 13px;
      padding: 0.5rem 1.1rem;
      border-radius: 9px;
      transition: all 0.2s ease;
    }

    .ev-btn-indigo { background: #F59E0B !important; border-color: #F59E0B !important; color: #1C1917 !important; font-weight: 700 !important; }
    .ev-btn-indigo:hover { background: #D97706 !important; border-color: #D97706 !important; color: #fff !important; }

    .ev-btn-slate { background: transparent; border: 1.5px solid #CBD5E1; color: #64748B; }
    .ev-btn-slate:hover { background: #F1F5F9; color: #475569; }

    .ev-btn-save {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%) !important;
      border: none !important;
      color: #1C1917 !important;
      font-weight: 700 !important;
      box-shadow: 0 4px 14px rgba(245,158,11,0.35);
    }

    .ev-btn-save:hover {
      background: linear-gradient(135deg, #D97706 0%, #B45309 100%) !important;
      color: #fff !important;
      box-shadow: 0 4px 18px rgba(245,158,11,0.45);
    }

    /* --- RESUMEN --- */
    .ev-summary-row {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 0.7rem 0;
      border-bottom: 1px solid #F8FAFC;
    }

    .ev-summary-row:last-child { border-bottom: none; }

    .ev-summary-label {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 190px;
      font-size: 11.5px;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      flex-shrink: 0;
    }

    .ev-summary-label i { font-size: 12px; width: 16px; text-align: center; }

    .ev-summary-value { font-size: 13.5px; font-weight: 500; color: #1E293B; flex: 1; }

    .ev-sbadge {
      display: inline-flex;
      align-items: center;
      padding: 2px 9px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 600;
    }

    .ev-sbadge.indigo  { background: #FEF3C7; color: #92400E; }
    .ev-sbadge.teal    { background: #F0FDFA; color: #14B8A6; }
    .ev-sbadge.green   { background: #ECFDF5; color: #10B981; }
    .ev-sbadge.red     { background: #FEF2F2; color: #DC2626; }
    .ev-sbadge.blue    { background: #EFF6FF; color: #2563EB; }
    .ev-sbadge.gray    { background: #F1F5F9; color: #64748B; }
    .ev-sbadge.amber   { background: #FFFBEB; color: #92400E; }
    .ev-sbadge.purple  { background: #F5F3FF; color: #7C3AED; }
    .ev-sbadge.emerald { background: #ECFDF5; color: #059669; }

    /* Badge con ícono de material */
    .ev-sbadge .material-symbols-outlined {
      font-size: 13px;
      margin-right: 3px;
      vertical-align: middle;
    }

    /* Columna de progreso */
    .ev-progress-cell {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 500;
      color: #1E293B;
    }
    .ev-progress-cell .material-symbols-outlined {
      font-size: 15px;
      color: #94A3B8;
    }

    /* --- FORM POLISH --- */
    .ev-modal-content .form-label { font-weight: 600; font-size: 12.5px; color: #374151; margin-bottom: 4px; }
    .ev-modal-content .form-control,
    .ev-modal-content .form-select {
      border-radius: 9px;
      border-color: #E2E8F0;
      font-size: 13.5px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .ev-modal-content .form-control:focus,
    .ev-modal-content .form-select:focus {
      border-color: #F59E0B;
      box-shadow: 0 0 0 3px rgba(245,158,11,0.15);
    }

    /* ===== SELECT2 DENTRO DEL MODAL ===== */
    .ev-modal-content .select2-container--default .select2-selection--multiple {
      border: 1.5px solid #E2E8F0 !important;
      border-radius: 9px !important;
      min-height: 42px !important;
      padding: 4px 6px !important;
      background: #fff !important;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .ev-modal-content .select2-container--default.select2-container--focus .select2-selection--multiple {
      border-color: #F59E0B !important;
      box-shadow: 0 0 0 3px rgba(245,158,11,0.15) !important;
      outline: none !important;
    }

    .ev-modal-content .select2-container--default .select2-selection--multiple .select2-selection__choice {
      background: #FEF3C7 !important;
      border: 1px solid #FCD34D !important;
      border-radius: 6px !important;
      color: #78350F !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      padding: 2px 6px 2px 4px !important;
      margin: 2px 3px 2px 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
    }

    .ev-modal-content .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
      color: #B45309 !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      border: none !important;
      background: none !important;
      padding: 0 !important;
      margin: 0 !important;
      order: -1;
    }

    .ev-modal-content .select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {
      color: #92400E !important;
    }

    .ev-modal-content .select2-container--default .select2-selection--multiple .select2-selection__rendered {
      padding: 0 !important;
    }

    /* Dropdown del Select2 */
    .select2-dropdown {
      border: 1.5px solid #E2E8F0 !important;
      border-radius: 10px !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
      overflow: hidden;
    }

    .select2-container--default .select2-results__option--highlighted[aria-selected] {
      background: #FEF3C7 !important;
      color: #78350F !important;
    }

    .select2-container--default .select2-results__option[aria-selected="true"] {
      background: #FEF3C7 !important;
      color: #92400E !important;
    }

    .select2-search--dropdown .select2-search__field {
      border: 1.5px solid #E2E8F0 !important;
      border-radius: 7px !important;
      padding: 6px 10px !important;
      font-size: 13px !important;
    }

    .select2-search--dropdown .select2-search__field:focus {
      border-color: #F59E0B !important;
      outline: none !important;
    }

    @media (max-width: 576px) {
      .ev-step-label { display: none; }
      .ev-modal-body { max-height: 75vh; }
      .ev-summary-label { min-width: 130px; }
    }
  </style>
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>

    <div class="app-container">
      <?php include("includes/_Header.php"); ?>

      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">

            <div class="row app-alerts">
              <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                <div class="row">
                  <div class="col s12 l12" style="position: relative;">
                    <div id="contenidoMensajes" style="margin-right:2vh"></div>
                  </div>
                  <div class="col s12 l12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                  </div>
                  <div class="col s12 l12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="page-description page-description-tabbed">
                  <h1>Evaluaciones</h1>
                </div>
              </div>
            </div>

            <!-- GRID DE EVALUACIONES -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-end">
                      <button type="button" id="btnNewEvaluation" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#modalNuevaEvaluacion">
                        <i class="fas fa-plus me-1"></i>Nueva Evaluación
                      </button>
                    </div>
                    <div class="row">
                      <label class="form-label">Listado de evaluaciones registradas en el sistema.</label>
                    </div>
                    <div class="table-responsive">
                      <div id="table_Ev"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ================================================================ -->
            <!-- MODAL WIZARD: NUEVA EVALUACIÓN                                  -->
            <!-- ================================================================ -->
            <div class="modal fade" id="modalNuevaEvaluacion" tabindex="-1"
              data-bs-backdrop="static" data-bs-keyboard="false"
              aria-labelledby="modalNuevaEvLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ev-modal-dialog">
                <div class="modal-content ev-modal-content">

                  <!-- Header -->
                  <div class="ev-modal-header d-flex align-items-center justify-content-between">
                    <div class="ev-modal-title">
                      <i class="fas fa-clipboard-list"></i>
                      <span id="modalNuevaEvLabel">Nueva Evaluación</span>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                  </div>

                  <!-- Barra de progreso -->
                  <div class="ev-progress-bar-wrapper">
                    <div class="ev-wizard-track">

                      <div class="ev-step-node active" id="ev-wi-1">
                        <div class="ev-step-circle"><i class="fas fa-clipboard-list"></i></div>
                        <span class="ev-step-label">Tipo</span>
                      </div>

                      <div class="ev-step-connector" id="ev-wc-1"></div>

                      <div class="ev-step-node" id="ev-wi-2">
                        <div class="ev-step-circle"><i class="fas fa-users"></i></div>
                        <span class="ev-step-label">Participantes</span>
                      </div>

                      <div class="ev-step-connector" id="ev-wc-2"></div>

                      <div class="ev-step-node" id="ev-wi-3">
                        <div class="ev-step-circle"><i class="fas fa-calendar-alt"></i></div>
                        <span class="ev-step-label">Fechas</span>
                      </div>

                      <div class="ev-step-connector" id="ev-wc-3"></div>

                      <div class="ev-step-node" id="ev-wi-4">
                        <div class="ev-step-circle"><i class="fas fa-check-circle"></i></div>
                        <span class="ev-step-label">Resumen</span>
                      </div>

                    </div>
                  </div>

                  <!-- Body con panes -->
                  <div class="ev-modal-body">

                    <!-- ====== PASO 1: DATOS GENERALES ====== -->
                    <div class="ev-wizard-pane active" id="ev-pane-1">
                      <div class="ev-section-header">
                        <div class="ev-section-icon indigo">
                          <i class="fas fa-clipboard-list"></i>
                        </div>
                        <div>
                          <p class="ev-section-title">Datos Generales</p>
                          <p class="ev-section-desc">Tipo, público objetivo y título del cuestionario</p>
                        </div>
                      </div>
                      <div class="ev-form-area">
                        <div id="dv_DataGeneral">
                          <div class="row mb-3">
                            <div class="col-12 col-sm-6 mb-3 mb-sm-0">
                              <label class="form-label mb-1">* Tipo de Cuestionario:</label>
                              <select class="form-select form-control-solid-bordered" id="tipoEvaluacion" required>
                                <option value="">Seleccione un tipo</option>
                                <option value="1">Evaluación 360°</option>
                                <option value="2">Encuesta Normal</option>
                              </select>
                              <p for="tipoEvaluacion" data-msg="El tipo de cuestionario es obligatorio"></p>
                            </div>
                            <div class="col-12 col-sm-6">
                              <label class="form-label mb-1">* A quién va dirigido:</label>
                              <select class="form-select form-control-solid-bordered" id="dirigidoA" required disabled>
                                <option value="">Seleccione el público objetivo</option>
                                <option value="1">Empleados</option>
                                <option value="2">Postulantes</option>
                              </select>
                              <p for="dirigidoA" data-msg="Debe especificar a quién va dirigido"></p>
                            </div>
                          </div>
                          <div class="row mb-3">
                            <div class="col-12 col-sm-6 mb-3 mb-sm-0" id="divPeriodicidad" style="display: none;">
                              <label class="form-label mb-1">* Periodicidad:</label>
                              <select class="form-select form-control-solid-bordered" id="periodicidad" disabled>
                                <option value="">Seleccione una periodicidad</option>
                                <option value="1">Diario</option>
                                <option value="2">Semanal</option>
                                <option value="3">Mensual</option>
                                <option value="4">Único</option>
                              </select>
                              <p for="periodicidad" data-msg="La periodicidad es obligatoria para encuestas normales"></p>
                            </div>
                            <div class="col-12 col-sm-6">
                              <label class="form-label mb-1">* Título:</label>
                              <input class="form-control form-control-solid-bordered" type="text"
                                id="title_c" placeholder="Título del cuestionario" required>
                              <p for="title_c" data-msg="El título es obligatorio"></p>
                            </div>
                          </div>
                        </div>
                        <div id="seccion360Config" style="display: none;"></div>
                      </div>
                      <div class="ev-wizard-nav">
                        <button type="button" class="btn ev-btn-slate" data-bs-dismiss="modal">
                          <i class="fas fa-times me-1"></i>Cancelar
                        </button>
                        <button type="button" class="btn ev-btn-indigo" onclick="evWizardNext()">
                          Siguiente <i class="fas fa-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>

                    <!-- ====== PASO 2: PARTICIPANTES ====== -->
                    <div class="ev-wizard-pane" id="ev-pane-2">
                      <div class="ev-section-header">
                        <div class="ev-section-icon teal">
                          <i class="fas fa-users"></i>
                        </div>
                        <div>
                          <p class="ev-section-title">Selección de Participantes</p>
                          <p class="ev-section-desc">Filtra y selecciona a los empleados que participarán</p>
                        </div>
                      </div>
                      <div class="ev-form-area">
                        <div id="divParticipantes">
                          <div class="ev-sub-title mb-3">
                            <i class="fas fa-filter"></i> Filtros
                          </div>
                          <div class="row mb-3">
                            <div class="col-12 col-sm-4 mb-3 mb-sm-0">
                              <label class="form-label mb-1">División / Empresa:</label>
                              <select class="form-select form-control-solid-bordered" id="slctDivision">
                                <option value="">Todas las Divisiones</option>
                              </select>
                            </div>
                            <div class="col-12 col-sm-4 mb-3 mb-sm-0">
                              <label class="form-label mb-1">Sucursal / Departamento:</label>
                              <select class="form-select form-control-solid-bordered" id="slctSucursal">
                                <option value="">Todas las Sucursales</option>
                              </select>
                            </div>
                            <div class="col-12 col-sm-4">
                              <label class="form-label mb-1">Puesto:</label>
                              <select class="form-select form-control-solid-bordered" id="slctPuesto">
                                <option value="">Todos los Puestos</option>
                              </select>
                            </div>
                          </div>
                          <div class="ev-sub-title mb-3">
                            <i class="fas fa-user-check"></i> Empleados participantes
                          </div>
                          <div class="col-12">
                            <label class="form-label mb-1">* Empleados Participantes:</label>
                            <select class="form-select form-control-solid-bordered" id="slctEmpleados"
                              multiple="multiple" style="width: 100%;"></select>
                            <p for="slctEmpleados" data-msg="Debe seleccionar al menos un empleado"></p>
                          </div>
                        </div>
                      </div>
                      <div class="ev-wizard-nav">
                        <button type="button" class="btn ev-btn-slate" onclick="evWizardPrev()">
                          <i class="fas fa-arrow-left me-1"></i>Anterior
                        </button>
                        <button type="button" class="btn ev-btn-indigo" onclick="evWizardNext()">
                          Siguiente <i class="fas fa-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>

                    <!-- ====== PASO 3: FECHAS ====== -->
                    <div class="ev-wizard-pane" id="ev-pane-3">
                      <div class="ev-section-header">
                        <div class="ev-section-icon amber">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div>
                          <p class="ev-section-title">Fechas de Evaluación</p>
                          <p class="ev-section-desc">Define los períodos de evaluación y retroalimentación</p>
                        </div>
                      </div>
                      <div class="ev-form-area">
                        <div id="dv_Dates">

                          <div id="dv_DateFields">
                            <div class="ev-sub-title mb-3">
                              <i class="fas fa-calendar-check"></i> Período de evaluación
                            </div>
                            <div class="row mb-3">
                              <div class="col-12 col-sm-6 mb-3 mb-sm-0">
                                <label class="form-label mb-1">* Inicio de la evaluación:</label>
                                <input class="form-control form-control-solid-bordered"
                                  id="inpFechaInicio" name="inpFechaInicio" type="date" required>
                                <p for="inpFechaInicio" data-msg="Dato obligatorio"></p>
                              </div>
                              <div class="col-12 col-sm-6">
                                <label class="form-label mb-1">* Final de la evaluación:</label>
                                <input class="form-control form-control-solid-bordered"
                                  id="inpFechaFin" name="inpFechaFin" type="date" required>
                                <p for="inpFechaFin" data-msg="Dato obligatorio"></p>
                              </div>
                            </div>
                          </div>

                          <!-- Solo para 360° -->
                          <div id="seccionRetroYPlan" style="display: none;">
                            <div class="ev-sub-section">
                              <div class="ev-sub-title mb-3">
                                <i class="fas fa-comments"></i> Retroalimentación
                              </div>
                              <div class="row mb-3">
                                <div class="col-12 col-sm-6 mb-3 mb-sm-0">
                                  <label class="form-label mb-1">* Inicio retroalimentación:</label>
                                  <input class="form-control form-control-solid-bordered"
                                    type="date" id="inpRetroIni" name="inpRetroIni" required>
                                  <p for="inpRetroIni" data-msg="Dato obligatorio"></p>
                                </div>
                                <div class="col-12 col-sm-6">
                                  <label class="form-label mb-1">* Final retroalimentación:</label>
                                  <input class="form-control form-control-solid-bordered"
                                    type="date" id="inpRetroFin" name="inpRetroFin" required>
                                  <p for="inpRetroFin" data-msg="Dato obligatorio"></p>
                                </div>
                              </div>
                            </div>
                            <div class="ev-sub-section">
                              <div class="ev-sub-title mb-3">
                                <i class="fas fa-tasks"></i> Plan de acción
                              </div>
                              <div class="row mb-3">
                                <div class="col-12 col-sm-6 mb-3 mb-sm-0">
                                  <label class="form-label mb-1">* Inicio plan de acción:</label>
                                  <input class="form-control form-control-solid-bordered"
                                    type="date" id="inpPlanAIni" name="inpPlanAIni" required>
                                  <p for="inpPlanAIni" data-msg="Dato obligatorio"></p>
                                </div>
                                <div class="col-12 col-sm-6">
                                  <label class="form-label mb-1">* Final plan de acción:</label>
                                  <input class="form-control form-control-solid-bordered"
                                    type="date" id="inpPlanAFin" name="inpPlanAFin" required>
                                  <p for="inpPlanAFin" data-msg="Dato obligatorio"></p>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="ev-wizard-nav">
                        <button type="button" class="btn ev-btn-slate" onclick="evWizardPrev()">
                          <i class="fas fa-arrow-left me-1"></i>Anterior
                        </button>
                        <button type="button" class="btn ev-btn-indigo" onclick="evWizardNext()">
                          Siguiente <i class="fas fa-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>

                    <!-- ====== PASO 4: RESUMEN ====== -->
                    <div class="ev-wizard-pane" id="ev-pane-4">
                      <div class="ev-section-header">
                        <div class="ev-section-icon emerald">
                          <i class="fas fa-check-circle"></i>
                        </div>
                        <div>
                          <p class="ev-section-title">Resumen de la Evaluación</p>
                          <p class="ev-section-desc">Verifica los datos antes de crear el cuestionario</p>
                        </div>
                      </div>
                      <div class="ev-form-area">
                        <div id="ev-summary-content"></div>
                      </div>
                      <div class="ev-wizard-nav">
                        <button type="button" class="btn ev-btn-slate" onclick="evWizardPrev()">
                          <i class="fas fa-pencil-alt me-1"></i>Editar
                        </button>
                        <button type="button" class="btn ev-btn-save" id="btn_SaveData">
                          <i class="fas fa-rocket me-1"></i>Crear Evaluación
                        </button>
                      </div>
                    </div>

                  </div><!-- /ev-modal-body -->

                </div>
              </div>
            </div>
            <!-- /MODAL NUEVA EVALUACIÓN -->

            <!-- Panel de detalle de evaluación existente -->
            <div class="offcanvas offcanvas-end evaluation-panel" tabindex="-1" id="evaluationPanel"
              aria-labelledby="evaluationPanelLabel">
              <div class="offcanvas-header">
                <div>
                  <div class="evaluation-panel-title" id="evPanelTitle">Detalle de la evaluación</div>
                  <div class="evaluation-panel-meta" id="evPanelMeta"></div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
              </div>
              <div class="offcanvas-body p-0">
                <ul class="nav nav-tabs px-3" id="evaluationPanelTabs" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="ev-tab-overview-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-overview" type="button" role="tab"
                      aria-controls="ev-tab-overview" aria-selected="true">Resumen</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ev-tab-questions-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-questions" type="button" role="tab"
                      aria-controls="ev-tab-questions" aria-selected="false">Preguntas</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ev-tab-evaluados-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-evaluados" type="button" role="tab"
                      aria-controls="ev-tab-evaluados" aria-selected="false">Evaluados</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ev-tab-resultados-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-resultados" type="button" role="tab"
                      aria-controls="ev-tab-resultados" aria-selected="false">Resultados</button>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active p-0" id="ev-tab-overview" role="tabpanel"
                    aria-labelledby="ev-tab-overview-btn">
                    <iframe id="evPanelOverviewFrame" title="Detalle de evaluación" loading="lazy"></iframe>
                  </div>
                  <div class="tab-pane fade" id="ev-tab-questions" role="tabpanel"
                    aria-labelledby="ev-tab-questions-btn">
                    <iframe id="evPanelQuestionsFrame" title="Preguntas de evaluacion" loading="lazy"></iframe>
                  </div>
                  <div class="tab-pane fade" id="ev-tab-evaluados" role="tabpanel"
                    aria-labelledby="ev-tab-evaluados-btn">
                    <iframe id="evPanelEvaluadosFrame" title="Evaluados" loading="lazy"></iframe>
                  </div>
                  <div class="tab-pane fade" id="ev-tab-resultados" role="tabpanel"
                    aria-labelledby="ev-tab-resultados-btn">
                    <iframe id="evPanelResultadosFrame" title="Resultados de evaluacion" loading="lazy"></iframe>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="chat-windows"></div>
        </div>
      </div>
    </div>
  </div>

  <script type="text/x-jsrender" id="verDetalleTemplate">
    ${verDetalleSY(data)}
  </script>

  <?php include("neptune_js.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
    integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

  <script src="scripts/global.js?v=<?= time() ?>" charset="utf-8"></script>
  <script src="scripts/ListadoEvaluaciones.js?v=<?= time() ?>" charset="utf-8"></script>

</body>

</html>
