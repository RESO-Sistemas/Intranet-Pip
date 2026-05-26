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

  <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator_modern.min.css" rel="stylesheet">
  <link href="//cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">

  <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>

  <style>
    body {
      background: linear-gradient(180deg, #f5f8fc 0%, #eef3f9 100%);
    }

    .app-content {
      background: transparent;
    }

    .results-page-header {
      margin-bottom: 1.5rem;
    }

    .results-page-header h1 {
      margin: 0;
      color: #16324f;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .results-page-header p {
      margin: 0.45rem 0 0;
      color: #64748b;
      max-width: 760px;
      line-height: 1.6;
    }

    .results-card,
    .results-summary-card,
    .results-profile-card,
    .results-chart-card {
      border: 1px solid #dbe5f0;
      border-radius: 22px;
      background: #fff;
      box-shadow: 0 18px 40px rgba(15, 34, 58, 0.08);
    }

    .results-card .card-body,
    .results-summary-card,
    .results-profile-card,
    .results-chart-card {
      padding: 1.5rem;
    }

    .results-hero {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .results-hero h2 {
      margin: 0;
      color: #183b56;
      font-size: 1.35rem;
      font-weight: 700;
    }

    .results-hero p {
      margin: 0.45rem 0 0;
      color: #64748b;
      line-height: 1.6;
    }

    .results-pill {
      display: inline-flex;
      align-items: center;
      padding: 0.7rem 1rem;
      border-radius: 999px;
      background: #eef6ff;
      color: #175ea8;
      font-weight: 700;
      white-space: nowrap;
    }



    .results-profile-card {
      position: relative;
      overflow: hidden;
      min-height: 100%;
    }

    .results-profile-banner {
      height: 110px;
      border-radius: 18px;
      background: linear-gradient(135deg, #16324f 0%, #245b88 100%);
      margin-bottom: 72px;
    }

    .results-avatar {
      width: 124px;
      height: 124px;
      border-radius: 50%;
      overflow: hidden;
      border: 6px solid #fff;
      box-shadow: 0 12px 24px rgba(15, 34, 58, 0.18);
      margin: -62px auto 1rem;
      background: #f8fafc;
    }

    .results-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .results-profile-card h3,
    .results-summary-card h3,
    .results-chart-card h3 {
      margin: 0 0 0.75rem;
      color: #16324f;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .results-profile-name {
      text-align: center;
      color: #16324f;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.35rem;
    }

    .results-profile-role {
      text-align: center;
      color: #64748b;
      margin-bottom: 1.25rem;
    }

    .results-meta {
      display: grid;
      gap: 0.85rem;
    }

    .results-meta-item {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.8rem 1rem;
      border-radius: 14px;
      background: #f8fbff;
      border: 1px solid #e7eef7;
    }

    .results-meta-item span {
      color: #64748b;
      font-weight: 600;
    }

    .results-meta-item strong {
      color: #16324f;
      text-align: right;
    }

    /* ── GRID DE TARJETAS ── */
    .results-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 1.5rem;
      padding: 0.5rem 0.25rem;
    }

    .eval-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      box-shadow: 0 12px 32px rgba(15, 34, 58, 0.06);
      padding: 1.6rem 1.5rem 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      position: relative;
      overflow: hidden;
    }

    .eval-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ffc407 0%, #ff9f43 100%);
      border-radius: 4px 4px 0 0;
    }

    .eval-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 40px rgba(15, 34, 58, 0.10);
    }

    .eval-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .eval-card-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #16324f;
      line-height: 1.3;
      margin: 0;
    }

    .eval-card-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .eval-card-badge.type-360 {
      background: #fff3cd;
      color: #856404;
    }

    .eval-card-badge.type-normal {
      background: #e7f1ff;
      color: #1a4a8a;
    }

    .eval-progress {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .eval-progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.88rem;
      color: #64748b;
    }

    .eval-progress-label strong {
      color: #16324f;
    }

    .eval-progress-bar {
      height: 10px;
      background: #eef2f7;
      border-radius: 999px;
      overflow: hidden;
    }

    .eval-progress-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #ffc407 0%, #ff9f43 100%);
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .eval-progress-fill.complete {
      background: linear-gradient(90deg, #059669 0%, #10b981 100%);
    }

    .eval-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.7rem;
    }

    .eval-meta-item {
      background: #f8fbff;
      border: 1px solid #e7eef7;
      border-radius: 14px;
      padding: 0.7rem 0.9rem;
      font-size: 0.85rem;
    }

    .eval-meta-item .label {
      display: block;
      color: #8a9ab0;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 0.25rem;
    }

    .eval-meta-item .value {
      color: #16324f;
      font-weight: 600;
    }

    .eval-card-footer {
      display: flex;
      gap: 0.6rem;
      margin-top: auto;
      padding-top: 0.4rem;
    }

    .eval-card-footer .btn-minimal {
      flex: 1;
      justify-content: center;
    }

    .eval-card-footer .btn-minimal:only-child {
      width: 100%;
    }

    .eval-switch {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.2rem;
    }

    .eval-switch input[type="checkbox"] {
      width: 42px;
      height: 22px;
      -webkit-appearance: none;
      appearance: none;
      background: #cbd5e1;
      border-radius: 999px;
      position: relative;
      cursor: pointer;
      outline: none;
      transition: background 0.2s;
    }

    .eval-switch input[type="checkbox"]:checked {
      background: #ffc407;
    }

    .eval-switch input[type="checkbox"]::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      background: #fff;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }

    .eval-switch input[type="checkbox"]:checked::after {
      transform: translateX(20px);
    }

    @media (max-width: 768px) {
      .results-cards-grid {
        grid-template-columns: 1fr;
      }
    }

    .results-status-list {
      display: grid;
      gap: 0.85rem;
      margin-top: 1rem;
    }

    .results-status-item {
      padding: 0.9rem 1rem;
      border-radius: 14px;
      background: #f8fbff;
      border: 1px solid #e7eef7;
    }

    .results-status-item span {
      display: block;
      color: #64748b;
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 0.35rem;
    }

    .results-status-item strong {
      color: #16324f;
      font-size: 0.96rem;
    }

    .results-summary-card {
      margin-top: 1rem;
    }

    .results-summary-card p {
      margin: 0 0 0.35rem;
      color: #64748b;
      line-height: 1.6;
    }

    .results-alert {
      margin-top: 1rem;
      padding: 1rem 1.1rem;
      border-radius: 16px;
      background: #f8fbff;
      border: 1px solid #e7eef7;
    }

    .results-alert h4 {
      margin: 0 0 0.65rem;
      color: #d03b42;
      font-size: 1rem;
      font-weight: 700;
    }

    .results-chart-card {
      margin-top: 1rem;
    }

    .results-section-title {
      text-align: center;
      color: #d03b42;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .results-graph-shell {
      min-height: 520px;
      padding: 1rem;
      border-radius: 18px;
      border: 1px solid #dbe5f0;
      background: linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
      overflow: auto;
    }

    #table_strengths,
    #table_areasForImprovement,
    #total_General {
      min-height: 120px;
    }

    .results-modal .modal-dialog {
      max-width: 1320px;
    }

    .results-modal .modal-content {
      border: 0;
      border-radius: 24px;
      overflow: hidden;
      background: #f5f8fc;
    }

    .results-modal .modal-header {
      border-bottom: 1px solid #e7eef7;
      background: #fff;
      padding: 1rem 1.5rem;
    }

    .results-modal .modal-body {
      padding: 1.5rem;
    }

    /* ── HEADER COMPACTO PARA EVALUACIONES NORMALES ── */
    .normal-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.2rem;
      background: #fff;
      border-radius: 18px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 16px rgba(15,34,58,0.04);
    }

    .normal-header img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #eef6ff;
      flex-shrink: 0;
    }

    .normal-header-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: #16324f;
      line-height: 1.2;
    }

    .normal-header-role {
      font-size: 0.88rem;
      color: #64748b;
    }

    .normal-header-score {
      margin-left: auto;
      text-align: center;
      padding: 0.5rem 1.1rem;
      background: #f0f9ff;
      border-radius: 14px;
      border: 1px solid #bae6fd;
      flex-shrink: 0;
    }

    .normal-header-score span {
      display: block;
      font-size: 0.72rem;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .normal-header-score strong {
      display: block;
      font-size: 1.35rem;
      color: #16324f;
      font-weight: 800;
      line-height: 1.2;
    }

    /* Radar pequeño para evaluaciones normales */
    .results-graph-shell.normal-size {
      min-height: 280px !important;
      padding: 0.5rem;
    }

    @media (max-width: 992px) {
      .results-hero {
        flex-direction: column;
      }

      .results-pill {
        white-space: normal;
      }
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
            <div class="row">
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
              <div class="col s12">
                <div class="page-description results-page-header">
                  <h1>Mis resultados</h1>
                  <p>Consulta el avance de tus evaluaciones, acepta tu retroalimentación y genera tu plan de acción
                    desde un solo lugar.</p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col s12">
                <div class="card results-card">
                  <div class="card-body">
                    <div class="results-hero">
                      <div>
                        <h2>Resumen de evaluaciones finales</h2>
                        <p>Revisa el estado de tus evaluaciones, la aceptación de retroalimentación y la disponibilidad
                          de tu plan de acción.</p>
                      </div>
                      <span class="results-pill">Evaluación y seguimiento</span>
                    </div>

                    <div id="cards_container" class="results-cards-grid"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-windows"></div>
      </div>
    </div>

    <div class="modal fade results-modal" id="resultsDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable" id="modalDialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Resultados finales</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div id="contentGeneralSelected">
              <div class="container-fluid">
          <div class="row g-4">
            <input type="hidden" id="mg_employee">
            <input type="hidden" id="mg_evaluation">

            <!-- Header compacto: solo evaluaciones normales -->
            <div class="col s12" id="normalCompactHeader" style="display:none;">
              <div class="normal-header">
                <img id="img_EmployeeSelCompact" src="https://dl.dropbox.com/s/u3j25jx9tkaruap/Webp.net-resizeimage.jpg?raw=1" alt="Empleado">
                <div>
                  <div class="normal-header-name" id="_generalEmployeeCompact"></div>
                  <div class="normal-header-role" id="_generalPosition_employedCompact"></div>
                </div>
                <div class="normal-header-score">
                  <span>Calificación final</span>
                  <strong id="_generalQualificationCompact"></strong>
                </div>
              </div>
            </div>

            <div class="col s12 m4 l4" id="modalSidebar360">
              <div class="results-profile-card">
                <div class="results-profile-banner"></div>
                <div class="results-avatar">
                  <img id="img_EmployeeSel"
                    src="https://dl.dropbox.com/s/u3j25jx9tkaruap/Webp.net-resizeimage.jpg?raw=1" alt="Empleado">
                </div>

                <div class="results-profile-name" id="_generalEmployee"></div>
                <div class="results-profile-role" id="_generalPosition_employed"></div>

                <div class="results-meta">
                  <div class="results-meta-item">
                    <span>No. Empleado</span>
                    <strong id="_generalNoEmployee"></strong>
                  </div>
                  <div class="results-meta-item">
                    <span>Nivel durante la evaluación</span>
                    <strong id="_generalLvl_employed"></strong>
                  </div>
                  <div class="results-meta-item">
                    <span>Grupo durante la evaluación</span>
                    <strong id="_generalGroup"></strong>
                  </div>
                  <div class="results-meta-item">
                    <span>Calificación final</span>
                    <strong id="_generalQualification"></strong>
                  </div>
                </div>

                <div class="results-status-list" id="statusListContainer">
                  <div class="results-status-item">
                    <span>Retroalimentación</span>
                    <strong id="_retroStatus">Pendiente</strong>
                  </div>
                  <div class="results-status-item">
                    <span>Plan de acción</span>
                    <strong id="_planStatus">No generado</strong>
                  </div>
                  <div class="results-status-item">
                    <span>Aceptación de actividades</span>
                    <strong id="_activitiesApproval">No registrado</strong>
                  </div>
                  <div class="results-status-item">
                    <span>Aprobación final del plan</span>
                    <strong id="_finalPlanApproval">No registrado</strong>
                  </div>
                </div>
              </div>

              <div class="results-summary-card" id="planDatesContainer">
                <h3>Fechas para la creación del plan de acción</h3>
                <p>Disponibilidad del <b id="b_dateIni_PlanA"></b> al <b id="b_dateEnd_PlanA"></b></p>
              </div>

              <div class="results-summary-card" id="planActionContainer">
                <h3>Estado del plan de acción</h3>
                <a href="#" id="aceptResultsEvaluation" class="btn-minimal btn-minimal-primary tooltipped" data-position="botton"
                  data-delay="50" data-tooltip="Aceptar">Aceptar y configurar plan de acción</a>
                <div class="results-alert">
                  <h4>Seguimiento</h4>
                  <p id="tx_planAction">Plan de acción generada</p>
                  <p id="tx_feedback">Es necesario aceptar la retroalimentación para generar el plan de acción</p>
                </div>
              </div>
            </div>

            <div class="col s12 m8 l8" id="modalMainContent">
              <div class="results-chart-card">
                <h3 class="results-section-title">RESULTADO GLOBAL</h3>

                <div class="row">
                  <div class="col s12 l6" id="colResultsTable">
                    <h3 class="results-section-title">RESULTADOS FINALES</h3>
                    <div id="total_General"></div>
                  </div>

                  <div class="col s12 l6" id="colResultsSecondary">
                    <h3 class="results-section-title">FORTALEZAS Y ÁREAS A MEJORAR</h3>
                    <div class="mb-4">
                      <h4 class="results-section-title" style="font-size:1rem;">FORTALEZAS</h4>
                      <div id="table_strengths"></div>
                    </div>
                    <div>
                      <h4 class="results-section-title" style="font-size:1rem;">ÁREAS A MEJORAR</h4>
                      <div id="table_areasForImprovement"></div>
                    </div>

                    <div id="recommendationsContainer" style="display:none; margin-top:1.5rem;">
                      <h4 class="results-section-title" style="font-size:1rem; color:#2563eb;">RECOMENDACIONES DE MEJORA</h4>
                      <div id="recommendationsList" style="display:flex; flex-direction:column; gap:0.75rem;"></div>
                    </div>
                  </div>
                </div>

                <div class="results-graph-shell mt-4" id="graphShell">
                  <div id="graph_total_General"></div>
                </div>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>

  <?php include("neptune_js.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/my-results/data-results.js" charset="utf-8"></script>
  <script src="scripts/my-results/general.js" charset="utf-8"></script>
</body>

</html>
