<?php include("AutorizaPagina.php"); ?>
<?php $embed = isset($_GET['embed']); ?>
<?php if ($embed): ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <style>
    body { padding: 0.75rem; margin: 0; background: #fff; }
    .detail-card { border-left: 4px solid #ffc407; margin-bottom: 1rem; }
    .detail-label { font-weight: 600; color: #6c757d; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.25rem; }
    .detail-value { font-size: 1rem; margin-bottom: 0; }
    .action-btn { min-width: 160px; margin: 0.25rem; }
    .badge-activado, .badge-activo { background-color: #28a745; color: #fff; padding: 0.35em 0.65em; border-radius: 0.25rem; font-size: 0.85rem; }
    .badge-no-activado, .badge-inactivo { background-color: #dc3545; color: #fff; padding: 0.35em 0.65em; border-radius: 0.25rem; font-size: 0.85rem; }
    .badge-dirigido { display: inline-block; padding: 0.45em 0.85em; border-radius: 0.35rem; font-size: 0.95rem; font-weight: 600; }
    .dirigido-empleados { background-color: #e8f5e9; color: #2e7d32; border: 2px solid #2e7d32; }
    .dirigido-postulantes { background-color: #fff3e0; color: #e65100; border: 2px solid #e65100; }
    .section-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e9ecef; }
  </style>
</head>
<body>
  <div id="embedLoader" style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
    <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status"><span class="visually-hidden">Cargando...</span></div>
    <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
  </div>
  <script>window.addEventListener('load',function(){var e=document.getElementById('embedLoader');if(e)e.style.display='none';});</script>

  <div id="loadingDetail" class="text-center py-5">
    <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>
    <p class="mt-2">Cargando información de la evaluación...</p>
  </div>
  <div id="errorDetail" class="d-none">
    <div class="alert alert-danger"><strong>Error:</strong> No se pudo cargar la información de la evaluación.</div>
  </div>
  <div id="detailContent" class="d-none">
    <div class="row"><div class="col-12"><div class="card detail-card"><div class="card-body">
      <h5 class="section-title"><span class="material-symbols-outlined" style="vertical-align:middle;">info</span> Información General</h5>
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-3"><p class="detail-label">Evaluación</p><p class="detail-value" id="detTitulo">-</p></div>
        <div class="col-md-6 col-lg-4 mb-3"><p class="detail-label">Tipo de Evaluación</p><p class="detail-value" id="detTipo">-</p></div>
        <div class="col-md-6 col-lg-4 mb-3"><p class="detail-label">Periodicidad</p><p class="detail-value" id="detPeriodicidad">-</p></div>
        <div class="col-md-6 col-lg-4 mb-3"><p class="detail-label">Dirigido A</p><p class="detail-value" id="detDirigidoA">-</p></div>
        <div class="col-md-6 col-lg-4 mb-3"><p class="detail-label">Status</p><p class="detail-value" id="detStatus">-</p></div>
        <div class="col-md-6 col-lg-4 mb-3"><p class="detail-label">Status Activado</p><p class="detail-value" id="detStatusActivado">-</p></div>
      </div>
    </div></div></div></div>
    <div class="row"><div class="col-12"><div class="card detail-card"><div class="card-body">
      <h5 class="section-title"><span class="material-symbols-outlined" style="vertical-align:middle;">calendar_month</span> Fechas</h5>
      <div class="row">
        <div class="col-md-6 col-lg-3 mb-3"><p class="detail-label">Fecha Inicio</p><p class="detail-value" id="detFechaInicio">-</p></div>
        <div class="col-md-6 col-lg-3 mb-3"><p class="detail-label">Fecha Fin</p><p class="detail-value" id="detFechaFin">-</p></div>
        <div class="col-md-6 col-lg-3 mb-3"><p class="detail-label">Retroalimentación Inicio</p><p class="detail-value" id="detRetroIni">-</p></div>
        <div class="col-md-6 col-lg-3 mb-3"><p class="detail-label">Retroalimentación Fin</p><p class="detail-value" id="detRetroFin">-</p></div>
        <div class="col-md-6 col-lg-3 mb-3"><p class="detail-label">Plan Acción Inicio</p><p class="detail-value" id="detPlanAIni">-</p></div>
        <div class="col-md-6 col-lg-3 mb-3"><p class="detail-label">Plan Acción Fin</p><p class="detail-value" id="detPlanAFin">-</p></div>
      </div>
    </div></div></div></div>
    <div class="row"><div class="col-12"><div class="card detail-card"><div class="card-body">
      <h5 class="section-title"><span class="material-symbols-outlined" style="vertical-align:middle;">monitoring</span> Progreso</h5>
      <div class="row">
        <div class="col-md-4 mb-3"><p class="detail-label">Respondidas</p><p class="detail-value" id="detRespondidas">-</p></div>
        <div class="col-md-4 mb-3"><p class="detail-label">Restantes</p><p class="detail-value" id="detRestantes">-</p></div>
        <div class="col-md-4 mb-3"><p class="detail-label">Preguntas Aceptadas</p><p class="detail-value" id="detPreguntasAceptadas">-</p></div>
      </div>
    </div></div></div></div>
    <div class="row"><div class="col-12"><div class="card detail-card"><div class="card-body">
      <h5 class="section-title"><span class="material-symbols-outlined" style="vertical-align:middle;">settings</span> Acciones</h5>
      <div class="d-flex flex-wrap" id="actionsContainer"></div>
    </div></div></div></div>
  </div>

  <div class="modal fade" id="faltantes" tabindex="-1" aria-hidden="true" style="display:none;">
    <div class="modal-dialog modal-xl"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h4" id="evSelectedF"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"><div class="row"><div id="t_unfinished_employees"></div></div></div>
    </div></div>
  </div>

  <script type="text/x-jsrender" id="t_unfinishedTemplate">${t_unfinishedSF(data)}</script>

  <?php include("neptune_js.php"); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/DetalleEvaluacion/ex.js?v=<?= time() ?>" charset="utf-8"></script>
</body>
</html>
<?php exit; ?>
<?php endif; ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Detalle Evaluación</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>

  <!-- Styles neptune -->

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    .detail-card {
      border-left: 4px solid #ffc407;
      margin-bottom: 1rem;
    }
    .detail-label {
      font-weight: 600;
      color: #6c757d;
      font-size: 0.85rem;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    .detail-value {
      font-size: 1rem;
      margin-bottom: 0;
    }
    .action-btn {
      min-width: 160px;
      margin: 0.25rem;
    }
    .badge-activado {
      background-color: #28a745;
      color: #fff;
      padding: 0.35em 0.65em;
      border-radius: 0.25rem;
      font-size: 0.85rem;
    }
    .badge-no-activado {
      background-color: #dc3545;
      color: #fff;
      padding: 0.35em 0.65em;
      border-radius: 0.25rem;
      font-size: 0.85rem;
    }
    .badge-activo {
      background-color: #28a745;
      color: #fff;
      padding: 0.35em 0.65em;
      border-radius: 0.25rem;
      font-size: 0.85rem;
    }
    .badge-inactivo {
      background-color: #dc3545;
      color: #fff;
      padding: 0.35em 0.65em;
      border-radius: 0.25rem;
      font-size: 0.85rem;
    }
    .btn-back {
      background-color: #ffffff !important;
      border-color: #ffffff !important;
    }
    .btn-back:hover {
      background-color: #EDE9E0 !important;
      border-color: #EDE9E0 !important;
    }
    .badge-dirigido {
      display: inline-block;
      padding: 0.45em 0.85em;
      border-radius: 0.35rem;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    .dirigido-empleados {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 2px solid #2e7d32;
    }
    .dirigido-postulantes {
      background-color: #fff3e0;
      color: #e65100;
      border: 2px solid #e65100;
    }
    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e9ecef;
    }
  </style>
  <?php if ($embed): ?>
  <style>
    html, body { height: auto !important; min-height: unset !important; background: #fff !important; overflow-x: hidden; }
    #main-wrapper { display: block !important; height: auto !important; }
    .app-container { margin-left: 0 !important; width: 100% !important; min-height: unset !important; }
    .app-content { padding-top: 0 !important; min-height: unset !important; }
    .content-wrapper { padding: 0 !important; min-height: unset !important; }
    .container { max-width: 100% !important; padding: 0 0.75rem !important; }
    .page-description, .chat-windows { display: none !important; }
  </style>
  <?php endif; ?>
</head>

<body>
  <?php if ($embed): ?>
  <div id="embedLoader" style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
    <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
    <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
  </div>
  <script>window.addEventListener('load',function(){var e=document.getElementById('embedLoader');if(e)e.style.display='none';});</script>
  <?php endif; ?>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div> -->
    <?php if (!$embed): ?>
    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>
    <?php endif; ?>
    <div class="app-container">
      <?php if (!$embed): include("includes/_Header.php"); endif; ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">
            <?php if (!$embed): ?>
            <div class="row">
              <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                <div class="row">
                  <div class="col s12 l12" style="position: relative;">
                    <div id="contenidoMensajes" style="margin-right:2vh"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="page-description d-flex align-items-center justify-content-between">
              <h1 id="pageTitle" class="mb-0">Detalle de Evaluación</h1>
              <div class="page-description-actions">
                <a href="ListadoEvaluaciones.php" class="btn btn-light btn-rounded btn-back">
                  <i class="material-icons-two-tone" style="vertical-align: middle; font-size: 20px;">arrow_back</i>
                  Volver al Listado
                </a>
              </div>
            </div>
            <?php endif; ?>

            <!-- Loading state -->
            <div id="loadingDetail" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
              <p class="mt-2">Cargando información de la evaluación...</p>
            </div>

            <!-- Error state -->
            <div id="errorDetail" class="d-none">
              <div class="alert alert-danger" role="alert">
                <strong>Error:</strong> No se pudo cargar la información de la evaluación.
                <a href="ListadoEvaluaciones.php" class="alert-link">Volver al listado</a>
              </div>
            </div>

            <!-- Detail content -->
            <div id="detailContent" class="d-none">
              <!-- Información General -->
              <div class="row">
                <div class="col-12">
                  <div class="card detail-card">
                    <div class="card-body">
                      <h5 class="section-title">
                        <span class="material-symbols-outlined" style="vertical-align: middle;">info</span>
                        Información General
                      </h5>
                      <div class="row">
                        <div class="col-md-6 col-lg-4 mb-3">
                          <p class="detail-label">Evaluación</p>
                          <p class="detail-value" id="detTitulo">-</p>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-3">
                          <p class="detail-label">Tipo de Evaluación</p>
                          <p class="detail-value" id="detTipo">-</p>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-3">
                          <p class="detail-label">Periodicidad</p>
                          <p class="detail-value" id="detPeriodicidad">-</p>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-3">
                          <p class="detail-label">Dirigido A</p>
                          <p class="detail-value" id="detDirigidoA">-</p>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-3">
                          <p class="detail-label">Status</p>
                          <p class="detail-value" id="detStatus">-</p>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-3">
                          <p class="detail-label">Status Activado</p>
                          <p class="detail-value" id="detStatusActivado">-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Fechas -->
              <div class="row">
                <div class="col-12">
                  <div class="card detail-card">
                    <div class="card-body">
                      <h5 class="section-title">
                        <span class="material-symbols-outlined" style="vertical-align: middle;">calendar_month</span>
                        Fechas
                      </h5>
                      <div class="row">
                        <div class="col-md-6 col-lg-3 mb-3">
                          <p class="detail-label">Fecha Inicio</p>
                          <p class="detail-value" id="detFechaInicio">-</p>
                        </div>
                        <div class="col-md-6 col-lg-3 mb-3">
                          <p class="detail-label">Fecha Fin</p>
                          <p class="detail-value" id="detFechaFin">-</p>
                        </div>
                        <div class="col-md-6 col-lg-3 mb-3">
                          <p class="detail-label">Retroalimentación Inicio</p>
                          <p class="detail-value" id="detRetroIni">-</p>
                        </div>
                        <div class="col-md-6 col-lg-3 mb-3">
                          <p class="detail-label">Retroalimentación Fin</p>
                          <p class="detail-value" id="detRetroFin">-</p>
                        </div>
                        <div class="col-md-6 col-lg-3 mb-3">
                          <p class="detail-label">Plan Acción Inicio</p>
                          <p class="detail-value" id="detPlanAIni">-</p>
                        </div>
                        <div class="col-md-6 col-lg-3 mb-3">
                          <p class="detail-label">Plan Acción Fin</p>
                          <p class="detail-value" id="detPlanAFin">-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Progreso -->
              <div class="row">
                <div class="col-12">
                  <div class="card detail-card">
                    <div class="card-body">
                      <h5 class="section-title">
                        <span class="material-symbols-outlined" style="vertical-align: middle;">monitoring</span>
                        Progreso
                      </h5>
                      <div class="row">
                        <div class="col-md-4 mb-3">
                          <p class="detail-label">Respondidas</p>
                          <p class="detail-value" id="detRespondidas">-</p>
                        </div>
                        <div class="col-md-4 mb-3">
                          <p class="detail-label">Restantes</p>
                          <p class="detail-value" id="detRestantes">-</p>
                        </div>
                        <div class="col-md-4 mb-3">
                          <p class="detail-label">Preguntas Aceptadas</p>
                          <p class="detail-value" id="detPreguntasAceptadas">-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Acciones -->
              <div class="row">
                <div class="col-12">
                  <div class="card detail-card">
                    <div class="card-body">
                      <h5 class="section-title">
                        <span class="material-symbols-outlined" style="vertical-align: middle;">settings</span>
                        Acciones
                      </h5>
                      <div class="d-flex flex-wrap" id="actionsContainer">
                        <!-- Buttons rendered by JS -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /detailContent -->

          </div>
          <div class="chat-windows"></div>
        </div>

        <!-- Modal Faltantes -->
        <div class="modal fade" id="faltantes" tabindex="-1" aria-labelledby="exampleModalXlLabel" style="display: none;" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title h4" id="evSelectedF"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div id="t_unfinished_employees"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="text/x-jsrender" id="t_unfinishedTemplate">
    ${t_unfinishedSF(data)}
  </script>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->


  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Scripts específicos de esta página -->
  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/DetalleEvaluacion/ex.js?v=<?= time() ?>" charset="utf-8"></script>

</body>

</html>
