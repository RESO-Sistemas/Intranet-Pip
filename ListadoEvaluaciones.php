<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php"); ?>

  <!-- Styles neptune -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
  <style>
    .evaluation-panel {
      width: min(1200px, 92vw);
    }

    .evaluation-panel .offcanvas-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e9ecef;
    }

    .evaluation-panel-title {
      font-size: 1.05rem;
      font-weight: 600;
    }

    .evaluation-panel-meta {
      font-size: 0.85rem;
      color: #6c757d;
    }

    .evaluation-panel .nav-tabs .nav-link {
      padding: 0.6rem 1rem;
      font-weight: 600;
    }

    .evaluation-panel .offcanvas-body {
      display: flex !important;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
    }

    .evaluation-panel .tab-content {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .evaluation-panel .tab-pane {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }

    .evaluation-panel iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    @media (max-width: 768px) {
      .evaluation-panel {
        width: 100vw;
      }
    }
  </style>

</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <!-- <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div> -->
    <div id="Menu">
      <?php
      include("menus.php");
      ?>
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
            <!-- EVALUACIONES-->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-end">
                      <a id='btnNewEvaluation' class="btn btn-primary" href="add-evaluation.php"><i
                          class="fas fa-plus"></i>Nueva Evaluación</a>
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
                      data-bs-target="#ev-tab-overview" type="button" role="tab" aria-controls="ev-tab-overview"
                      aria-selected="true">Resumen</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ev-tab-questions-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-questions" type="button" role="tab" aria-controls="ev-tab-questions"
                      aria-selected="false">Preguntas</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ev-tab-evaluados-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-evaluados" type="button" role="tab" aria-controls="ev-tab-evaluados"
                      aria-selected="false">Evaluados</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ev-tab-resultados-btn" data-bs-toggle="tab"
                      data-bs-target="#ev-tab-resultados" type="button" role="tab" aria-controls="ev-tab-resultados"
                      aria-selected="false">Resultados</button>
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

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php"); ?>
  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
    integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

  <!-- Scripts específicos de esta página -->
  <script src="scripts/global.js?v=<?= time() ?>" charset="utf-8"></script>
  <script src="scripts/ListadoEvaluaciones.js?v=<?= time() ?>" charset="utf-8"></script>

</body>

</html>
