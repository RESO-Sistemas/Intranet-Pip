<?php include("AutorizaPagina.php"); ?>
<?php
require_once("Backend/Empleados/Empleados.php");
$ins = new Empleados();
$ins->visitIndexEmployee();

require_once("Backend/Configuracion/Configuracion.php");
$Conf = new Configuracion();
$MenuP = $Conf->getMenusPadre();
?>
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>

  <!-- Styles neptune -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.css" />
  <!-- <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.orange-coral.css" /> -->
  <!-- <script src="componentes/PerfilEmpleadoLateral.js" charset="utf-8"></script> -->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="plugins/emoji-picker/css/emoji.css">
  <script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.css">
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <link rel="stylesheet" href="plugins/tingle-master/dist/tingle.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined">
  <link rel="stylesheet" href="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.css">
  <link rel="stylesheet" href="/plugins/unitegallery-master/dist/css/unite-gallery.css">
  <link rel="stylesheet" href="/plugins/unitegallery-master/package/unitegallery/themes/default/ug-theme-default.css">
  <link rel="stylesheet" href="/plugins/unitegallery-master/source/unitegallery/skins/alexis/alexis.css">
  
  <!-- Moment.js necesario para FullCalendar -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>

  <style>
    /* KPI Gauge cards */
    .kpi-gauge-card {
      min-width: 225px;
      max-width: 285px;
      flex: 0 0 auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
      padding: 8px 14px 6px;
      text-align: center;
    }
    .kpi-gauge-card svg { display: block; margin: 0 auto; }
    .kpi-gauge-card .kpi-name {
      font-size: .92rem;
      font-weight: 700;
      color: #333;
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .kpi-gauge-card .kpi-fraction {
      font-size: .78rem;
      color: #888;
      margin-top: 1px;
    }
    /* Evento item */
    .evento-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .evento-item:last-child { border-bottom: none; }
    .evento-date-box {
      min-width: 42px;
      text-align: center;
      background: #6c757d;
      color: #fff;
      border-radius: 6px;
      padding: 4px 6px;
      font-weight: 700;
      line-height: 1.1;
    }
    .evento-date-box .ev-day { font-size: 1.1rem; }
    .evento-date-box .ev-month { font-size: .65rem; text-transform: uppercase; }
    .evento-info .ev-title { font-size: .85rem; font-weight: 600; color: #333; }
    .evento-info .ev-time { font-size: .75rem; color: #888; }
    /* Checklist items */
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      margin-bottom: 6px;
      background: #fffdf3;
      border-left: 3px solid #ffc407;
      border-radius: 6px;
      transition: all .2s ease;
    }
    .checklist-item:hover { background: #fff8dc; box-shadow: 0 1px 4px rgba(255,196,7,.2); }
    .checklist-item .chk-name { font-size: .84rem; color: #333; font-weight: 500; }
    .checklist-item .chk-badge { font-size: .65rem; padding: 3px 8px; border-radius: 10px; white-space: nowrap; }
    .checklist-item.ya-contestado { opacity: .55; border-left-color: #ccc; background: #f9f9f9; }
    .checklist-item.ya-contestado .chk-name { text-decoration: line-through; color: #999 !important; }
    .checklist-item.chk-respondido-si { border-left-color: #28a745; background: #f0faf3; }
    .checklist-item.chk-respondido-no { border-left-color: #dc3545; background: #fef5f5; }
    .chk-btn-group { display: flex; gap: 5px; flex-shrink: 0; align-self: center; }
    .chk-btn-group .btn { width: 22px; height: 22px; padding: 0; border-radius: 4px; transition: all .2s; display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
    .chk-btn-group .btn svg { width: 12px; height: 12px; display: block; }
    .chk-btn-si { background: transparent; border: 1.5px solid #28a745; }
    .chk-btn-si svg { stroke: #28a745; }
    .chk-btn-si:hover { background: rgba(40,167,69,.1); }
    .chk-btn-no { background: transparent; border: 1.5px solid #dc3545; }
    .chk-btn-no svg { stroke: #dc3545; }
    .chk-btn-no:hover { background: rgba(220,53,69,.1); }
    .chk-btn-si.active { background: rgba(40,167,69,.15); pointer-events: none; }
    .chk-btn-no.active { background: rgba(220,53,69,.15); pointer-events: none; }
    .chk-btn-group .btn:disabled { opacity: .4; pointer-events: none; }
    /* Badge de turno */
    .checklist-item .badge.bg-info { font-size: .6rem; padding: 2px 6px; background-color: #17a2b8 !important; }
    /* Título/encabezado del turno */
    .turno-header {
      font-size: 1rem;
      font-weight: 700;
      color: #17a2b8;
      padding: 10px 12px 6px;
      margin-top: 8px;
      margin-bottom: 4px;
      border-bottom: 2px solid #17a2b8;
      display: flex;
      align-items: center;
    }
    .turno-header:first-child { margin-top: 0; }

    body.dark-mode .kpi-gauge-card { background: #1e1e2d; }
    body.dark-mode .kpi-gauge-card .kpi-name { color: #ccc; }
    body.dark-mode .evento-date-box { background: #555; color: #fff; }
    body.dark-mode .evento-info .ev-title { color: #ccc; }
    body.dark-mode .checklist-item { background: #1e1e2d; border-left-color: #ffc407; }
    body.dark-mode .checklist-item:hover { background: #2a2a3d; box-shadow: 0 1px 4px rgba(255,196,7,.15); }
    body.dark-mode .checklist-item .chk-name { color: #ddd; }
    body.dark-mode .checklist-item.ya-contestado { background: #1a1a28; border-left-color: #555; }
    body.dark-mode .checklist-item.chk-respondido-si { border-left-color: #28a745; background: #1a2e1f; }
    body.dark-mode .checklist-item .badge.bg-info { background-color: #138496 !important; }
    body.dark-mode .turno-header { color: #17a2b8; border-bottom-color: #17a2b8; }
    body.dark-mode .checklist-item.chk-respondido-no { border-left-color: #dc3545; background: #2e1a1a; }

    /* Ajustes agresivos para eliminar espacio superior */
    .app-content { padding-top: 0 !important; }
    .content-wrapper { padding-top: 5px !important; }
    .container { padding-top: 0 !important; }
    #kpiCarouselWrapper { margin-top: -5px !important; }

    /* Ajustes para evitar que las imágenes se salgan del feed */
    .galleryImgCl, .ug-gallery-wrapper { 
      max-width: 100% !important; 
      width: 100% !important; 
    }
    .galleryImgCl img {
      max-width: 100% !important;
      height: auto !important;
    }
  </style>

  <!-- Custom styles para KPI Carousel y flechas ahora en neptune/css/custom.css -->

</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div>
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
            <div class="row mb-3">
              <div class="col-12">
                <div class="page-description" style="padding-top: 0px !important; padding-bottom: 5px; margin-top: -15px !important; margin-bottom: 0;">
                  <!-- GRÁFICAS KPIs - Carrusel -->
                  <div id="kpiCarouselWrapper" style="position: relative;">
                    <div id="kpiCarouselContainer" style="display: flex; overflow: hidden; gap: 12px; transition: transform .4s ease;">
                      <!-- Se llena dinámicamente -->
                    </div>
                    <button id="kpiBtnPrev" class="btn btn-sm btn-light" style="position:absolute;left:0;top:50%;transform:translateY(-50%);z-index:2;display:none;border-radius:50%;width:32px;height:32px;padding:0;">
                      <i class="fas fa-chevron-left"></i>
                    </button>
                    <button id="kpiBtnNext" class="btn btn-sm btn-light" style="position:absolute;right:0;top:50%;transform:translateY(-50%);z-index:2;display:none;border-radius:50%;width:32px;height:32px;padding:0;">
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- NOVEDADES + ESPACIO DERECHA -->
            <div class="row g-3">
              <!-- Novedades -->
              <div class="col-12 col-lg-8">
                <div class="card">
                  <div class="card-body">

                                <!-- MODAL -->
                                <div class="row mb-3">
                                  <div class="col-12 d-flex justify-content-center justify-content-md-end">
                                    <button type="button" class="btn btn-primary btn-sm btn-md-lg w-100 w-md-auto" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable" style="max-width: 300px;">
                                      <i class="fas fa-plus"></i> Nueva Publicación
                                    </button>
                                  </div>
                                </div>
                                <div class="modal fade" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true" style="display: none;">
                                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalCenteredScrollableTitle">Proporcionar una solicitud de feed</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                        <form id="formFeed" type="post">
                                          <div class="container py-3">
                                            <div class="mb-3">
                                              <label for="mnf_title" class="form-label fw-bold">* Título</label>
                                              <textarea id="mnf_title" name="mnf_title" class="form-control materialize-textarea" rows="2" required></textarea>
                                              <p for="mnf_title" data-msg="El título es obligatorio." class="text-danger small mb-0"></p>
                                            </div>

                                            <div class="mb-3">
                                              <label for="mnf_desc" class="form-label fw-bold">* Descripción</label>
                                              <textarea id="mnf_desc" name="mnf_desc" class="form-control materialize-textarea" rows="3" required></textarea>
                                              <p for="mnf_desc" data-msg="La descripción es obligatoria." class="text-danger small mb-0"></p>
                                            </div>

                                            <div class="mb-3">
                                              <label for="mnf_url" class="form-label fw-bold">Hipervínculo</label>
                                              <textarea id="mnf_url" name="mnf_url" class="form-control materialize-textarea" rows="2"></textarea>
                                            </div>

                                            <hr class="my-4">

                                            <div class="mb-3">
                                              <label class="form-label fw-bold">Imágenes</label>
                                              <div id="fileUpload" class="file-container border rounded p-3 bg-light"></div>
                                            </div>
                                          </div>
                                        </form>

                                      </div>

                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button id="btn-actionGreen" type="button" class="btn btn-primary">Guardar</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <?php include("components/modalIncidencia.html"); ?>
                                <!-- MODAL -->
                                <div class="row justify-content-center">
                                  <div class="col-auto">
                                    <label class="card-title mb-0 text-center">Últimas Novedades</label>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-12 todo-list">
                                    <div class="overflow-y-auto" id="ContenidoFeed" style="height: 700px;">
                                    </div>
                                  </div>
                                </div>
                </div><!-- /card-body -->
                </div><!-- /card -->
              </div><!-- /col novedades -->

              <!-- ESPACIO DERECHA: Eventos + Checklist -->
              <div class="col-12 col-lg-4">
                <!-- Próximos Eventos -->
                <div class="card mb-3">
                  <div class="card-body">
                    <h6 class="card-title fw-bold mb-3"><i class="fas fa-calendar-alt me-2 text-primary"></i>Próximos Eventos</h6>
                    <div id="listaEventos" style="max-height: 180px; overflow-y: auto;">
                      <p class="text-muted small text-center">Cargando eventos...</p>
                    </div>
                  </div>
                </div>
                <!-- Checklist del día -->
                <div class="card">
                  <div class="card-body">
                    <div id="listaChecklist" style="max-height: 350px; overflow-y: auto;">
                      <p class="text-muted small text-center">Cargando checklist...</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <!-- /NOVEDADES + ESPACIO DERECHA -->
            <div id="fullscreen-swiper"></div>
            <div id="fullscreen-swiper-backdrop"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- neptune Javascripts (incluye jQuery, BlockUI y global.js) -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <?php include("scripts.php"); ?>
  
  <script src="plugins/evo-calendar/js/evo-calendar.js"></script>
  <script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
  <script src="plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>
  <script src="plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>
  <script src="plugins/unitegallery-master/package/unitegallery/themes/slider/ug-theme-slider.js" charset="utf-8"></script>
  
  <!-- Scripts específicos de la página - SIEMPRE AL FINAL -->
  <script src="scripts/index.js" charset="utf-8"></script>
  <script src="scripts/dashboard.js" charset="utf-8"></script>


</body>

</html>