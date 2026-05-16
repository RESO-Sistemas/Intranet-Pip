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

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    /* ============================================================
       Evaluaciones Pendientes — Dashboard Cards (colores del tema)
    ============================================================ */

    :root {
      --ev-primary: #ffc407;
      --ev-primary-light: #fff9e6;
      --ev-primary-dark: #e6ac00;
      --ev-success: #16a34a;
      --ev-success-bg: #f0fdf4;
      --ev-warning: #f59e0b;
      --ev-danger: #dc2626;
      --ev-muted: #64748b;
      --ev-border: #e2e8f0;
      --ev-card-bg: #ffffff;
      --ev-page-bg: #f8fafc;
      --ev-radius: 12px;
      --ev-shadow: 0 1px 3px rgba(0, 0, 0, .07), 0 2px 8px rgba(0, 0, 0, .05);
      --ev-shadow-hover: 0 4px 16px rgba(255, 196, 7, .2), 0 2px 8px rgba(0, 0, 0, .08);
    }

    /* KPIs */
    .ev-kpi-row {
      display: flex;
      gap: 14px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .ev-kpi {
      flex: 1;
      min-width: 120px;
      background: var(--ev-card-bg);
      border: 1px solid var(--ev-border);
      border-radius: var(--ev-radius);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: var(--ev-shadow);
    }

    .ev-kpi-icon {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .ev-kpi-icon.total {
      background: var(--ev-primary-light);
      color: #92700a;
    }

    .ev-kpi-icon.active {
      background: #fff7ed;
      color: #c2410c;
    }

    .ev-kpi-icon.done {
      background: var(--ev-success-bg);
      color: var(--ev-success);
    }

    .ev-kpi-value {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1;
      color: #1e293b;
    }

    .ev-kpi-label {
      font-size: .72rem;
      color: var(--ev-muted);
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: .5px;
    }

    /* Barra de búsqueda */
    .ev-search-bar {
      background: var(--ev-card-bg);
      border: 1px solid var(--ev-border);
      border-radius: var(--ev-radius);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      box-shadow: var(--ev-shadow);
    }

    .ev-search-bar i {
      color: var(--ev-muted);
    }

    .ev-search-input {
      border: none;
      outline: none;
      background: transparent;
      flex: 1;
      font-family: 'Poppins', sans-serif;
      font-size: .88rem;
      color: #1e293b;
    }

    .ev-search-input::placeholder {
      color: #94a3b8;
    }

    /* Cards de evaluación */
    #ev-cards-container {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .ev-card-wrap {
      margin-bottom: 14px;
    }

    .ev-card {
      background: var(--ev-card-bg);
      border: 1px solid var(--ev-border);
      border-radius: var(--ev-radius);
      padding: 20px 24px;
      box-shadow: var(--ev-shadow);
      display: flex;
      align-items: center;
      gap: 20px;
      transition: box-shadow .18s, border-color .18s;
    }

    .ev-card:hover {
      box-shadow: var(--ev-shadow-hover);
      border-color: #fde68a;
    }

    .ev-card.is-open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-color: var(--ev-border);
    }

    /* Círculo de porcentaje */
    .ev-circle-wrap {
      flex-shrink: 0;
      width: 66px;
      height: 66px;
      position: relative;
    }

    .ev-circle-wrap svg {
      width: 66px;
      height: 66px;
      transform: rotate(-90deg);
    }

    .ev-circle-bg {
      fill: none;
      stroke: #e2e8f0;
      stroke-width: 6;
    }

    .ev-circle-prog {
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      transition: stroke-dashoffset .5s ease;
    }

    .ev-circle-pct {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: .78rem;
      color: #1e293b;
    }

    .ev-card-info {
      flex: 1;
      min-width: 0;
    }

    .ev-card-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: .98rem;
      color: #1e293b;
      margin: 0 0 3px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ev-card-dates {
      font-size: .78rem;
      color: var(--ev-muted);
      margin-bottom: 10px;
    }

    .ev-progress-bar {
      height: 5px;
      background: #e2e8f0;
      border-radius: 99px;
      overflow: hidden;
    }

    .ev-progress-fill {
      height: 100%;
      border-radius: 99px;
      transition: width .5s ease;
    }

    .ev-progress-label {
      font-size: .7rem;
      color: var(--ev-muted);
      margin-top: 4px;
    }

    /* Badge de estado */
    .ev-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px;
      border-radius: 99px;
      font-size: .7rem;
      font-weight: 600;
      letter-spacing: .3px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .ev-badge.active {
      background: var(--ev-primary-light);
      color: #92700a;
      border: 1px solid #fde68a;
    }

    .ev-badge.done {
      background: var(--ev-success-bg);
      color: var(--ev-success);
      border: 1px solid #bbf7d0;
    }

    /* Botón "Ver Detalle" */
    .ev-btn-detail {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 18px;
      background: var(--ev-primary);
      color: #1e293b;
      border: none;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: .82rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .15s, transform .1s;
      white-space: nowrap;
    }

    .ev-btn-detail:hover {
      background: var(--ev-primary-dark);
      transform: scale(1.02);
    }

    .ev-btn-detail i {
      transition: transform .2s;
    }

    .ev-btn-detail.is-open i {
      transform: rotate(180deg);
    }

    /* Panel de detalle expandible */
    .ev-detail-panel {
      background: #fafafa;
      border: 1px solid var(--ev-border);
      border-top: 2px solid var(--ev-primary);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: var(--ev-radius);
      border-bottom-right-radius: var(--ev-radius);
      overflow: hidden;
      max-height: 0;
      transition: max-height .35s ease, padding .25s ease;
      padding: 0 24px;
    }

    .ev-detail-panel.is-open {
      max-height: 1000px;
      padding: 16px 24px 20px;
    }

    /* Búsqueda dentro del panel */
    .ev-panel-search {
      background: #fff;
      border: 1px solid var(--ev-border);
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }

    .ev-panel-search i {
      color: var(--ev-muted);
      font-size: .85rem;
    }

    .ev-panel-search input {
      border: none;
      outline: none;
      background: transparent;
      flex: 1;
      font-family: 'Poppins', sans-serif;
      font-size: .82rem;
    }

    .ev-panel-search input::placeholder {
      color: #94a3b8;
    }

    /* Cards de empleados */
    .ev-employee-card {
      background: #fff;
      border: 1px solid var(--ev-border);
      border-radius: 10px;
      padding: 13px 16px;
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 10px;
      transition: box-shadow .15s;
    }

    .ev-employee-card:last-child {
      margin-bottom: 0;
    }

    .ev-employee-card:hover {
      box-shadow: 0 2px 10px rgba(0, 0, 0, .07);
    }

    .ev-employee-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--ev-primary);
      color: #1e293b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: .88rem;
      flex-shrink: 0;
    }

    .ev-employee-info {
      flex: 1;
      min-width: 0;
    }

    .ev-employee-name {
      font-weight: 600;
      font-size: .88rem;
      color: #1e293b;
      margin-bottom: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ev-employee-meta {
      font-size: .73rem;
      color: var(--ev-muted);
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }

    /* Badge de tipo */
    .ev-type-badge {
      padding: 2px 8px;
      border-radius: 99px;
      font-size: .68rem;
      font-weight: 600;
    }

    .ev-type-badge.par {
      background: #ede9fe;
      color: #6d28d9;
    }

    .ev-type-badge.superior {
      background: #fce7f3;
      color: #9d174d;
    }

    .ev-type-badge.subordinado {
      background: #e0f2fe;
      color: #0369a1;
    }

    .ev-type-badge.auto {
      background: var(--ev-primary-light);
      color: #92700a;
    }

    .ev-type-badge.default {
      background: #f1f5f9;
      color: #475569;
    }

    /* Acción del empleado */
    .ev-btn-go {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 7px 14px;
      background: var(--ev-primary);
      color: #1e293b;
      border: none;
      border-radius: 7px;
      font-size: .78rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background .15s;
    }

    .ev-btn-go:hover {
      background: var(--ev-primary-dark);
      color: #1e293b;
    }

    .ev-done-tag {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 7px 12px;
      background: var(--ev-success-bg);
      color: var(--ev-success);
      border-radius: 7px;
      font-size: .78rem;
      font-weight: 600;
    }

    /* Estado vacío */
    .ev-empty {
      text-align: center;
      padding: 50px 20px;
      color: var(--ev-muted);
    }

    .ev-empty i {
      font-size: 2rem;
      display: block;
      margin-bottom: 10px;
      opacity: .35;
    }

    /* ============================================================
       Offcanvas de evaluación (full-screen con iframe)
    ============================================================ */
    /* ============================================================
       Overlay de evaluación (reemplaza offcanvas — control total)
    ============================================================ */
    #ev-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000000;
      display: none;
      flex-direction: column;
      background: #fff;
    }
    #ev-overlay.is-open {
      display: flex;
    }
    #ev-overlay-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      background: #fff;
      border-bottom: 1px solid var(--ev-border);
      flex-shrink: 0;
    }
    #ev-overlay-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: .95rem;
      color: #1e293b;
    }
    #ev-overlay-close {
      background: none;
      border: none;
      font-size: 1.1rem;
      color: var(--ev-muted);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background .15s;
    }
    #ev-overlay-close:hover { background: #f1f5f9; }
    #ev-iframe {
      flex: 1;
      border: none;
      display: block;
      width: 100%;
      min-height: 0;
    }

    /* Skeleton loader */
    .ev-skeleton {
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 200% 100%;
      animation: ev-shimmer 1.4s infinite;
      border-radius: 8px;
    }

    @keyframes ev-shimmer {
      0% {
        background-position: 200% 0;
      }

      100% {
        background-position: -200% 0;
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

            <!-- Notificaciones flotantes -->
            <div class="row">
              <div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block" style="position: fixed; z-index:99;">
                <div class="row">
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajes" style="margin-right:2vh"></div>
                  </div>
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                  </div>
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Título de página (original) -->
            <div class="row">
              <div class="col-12">
                <div class="page-description page-description-tabbed">
                  <h1>Evaluaciones pendientes</h1>
                </div>
              </div>
            </div>

            <!-- KPIs resumen -->
            <div class="row">
              <div class="col-12">
                <div class="ev-kpi-row" id="ev-kpi-row"></div>
              </div>
            </div>

            <!-- Búsqueda -->
            <div class="row">
              <div class="col-12">
                <div class="ev-search-bar">
                  <i class="fas fa-search"></i>
                  <input type="text" class="ev-search-input" id="ev-search-input"
                    placeholder="Buscar evaluación por nombre..." oninput="filterEvaluations(this.value)" />
                </div>
              </div>
            </div>

            <!-- Cards de evaluaciones -->
            <div class="row">
              <div class="col-12">
                <div id="ev-cards-container">
                  <!-- Skeletons iniciales -->
                  <div class="ev-card-wrap">
                    <div class="ev-card">
                      <div class="ev-circle-wrap">
                        <div class="ev-skeleton" style="width:66px;height:66px;border-radius:50%;"></div>
                      </div>
                      <div class="ev-card-info">
                        <div class="ev-skeleton" style="height:16px;width:38%;margin-bottom:8px;"></div>
                        <div class="ev-skeleton" style="height:11px;width:55%;margin-bottom:12px;"></div>
                        <div class="ev-skeleton" style="height:5px;width:100%;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ev-card-wrap">
                    <div class="ev-card">
                      <div class="ev-circle-wrap">
                        <div class="ev-skeleton" style="width:66px;height:66px;border-radius:50%;"></div>
                      </div>
                      <div class="ev-card-info">
                        <div class="ev-skeleton" style="height:16px;width:50%;margin-bottom:8px;"></div>
                        <div class="ev-skeleton" style="height:11px;width:42%;margin-bottom:12px;"></div>
                        <div class="ev-skeleton" style="height:5px;width:100%;"></div>
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

  </div><!-- /main-wrapper -->

  <!-- ============================================================
       Overlay full-screen — Responder Evaluación
  ============================================================ -->
  <div id="ev-overlay">
    <div id="ev-overlay-header">
      <span id="ev-overlay-title">Evaluación</span>
      <button id="ev-overlay-close" onclick="closeEvaluationCanvas()" title="Cerrar">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <iframe id="ev-iframe" src="" title="Evaluación" allow="same-origin"></iframe>
  </div>
  <!-- /Overlay evaluación -->

  <?php include("neptune_js.php"); ?>
  <script src="scripts/global.js?v=<?php echo time(); ?>" charset="utf-8"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/pending-evaluations.js?v=<?php echo time(); ?>" charset="utf-8"></script>

</body>

</html>
