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
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet</title>
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

</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">Klyns</p>
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
                  <h1>Inicio</h1>
                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="hoaccountme" aria-selected="true">Novedades</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="security-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="security" aria-selected="false">Agenda</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- INFORMACION PERSONAL/AGENDA/COLABORADORES -->
            <div class="row">
              <div class="col">
                <div class="tab-content" id="myTabContent">
                  <!-- INFORMACION PERSONAL -->
                  <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div class="card">
                      <div class="card-body">
                        <!-- ULTIMAS NOVENDADES -->
                        <div class="row">
                          <div class="col">
                            <div class="tab-content" id="myTabContent">
                              <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">

                                <!-- MODAL -->
                                <div class="d-flex justify-content-end">
                                  <button type="button" class="btn btn-primary m-b-sm" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
                                    <i class="fas fa-plus"></i> Nueva Publicación
                                  </button>
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
                                <!-- MODAL -->
                                <div class="row justify-content-center">
                                  <div class="col-auto">
                                    <label class="card-title mb-0 text-center">Últimas Novedades</label>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col todo-list">
                                    <div class="overflow-y-auto" id="ContenidoFeed" style="height: 700px;">
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <!-- ULTIMAS NOVEDADES -->
                      </div>
                    </div>
                  </div>
                  <!-- AGENDA -->
                  <div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div id="contenidoAgendaEventos" class="contenidoEventos"></div>
                        </div>
                        <div id="calendar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="fullscreen-swiper"></div>
            <div id="fullscreen-swiper-backdrop"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <?php include("scripts.php"); ?>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="plugins/evo-calendar/js/evo-calendar.js"></script>
  <script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
  <script src="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>
  <script src="/plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>
  <script src="/plugins/unitegallery-master/package/unitegallery/themes/slider/ug-theme-slider.js" charset="utf-8"></script>
  
  <!-- Scripts específicos de la página - SIEMPRE AL FINAL -->
  <script src="scripts/index.js"></script>
  <script src="scripts/global.js" charset="utf-8"></script>


</body>

</html>