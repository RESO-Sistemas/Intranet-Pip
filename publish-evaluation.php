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



  <?php include("neptune_styles.php");  ?>

  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">

  <!-- Styles neptune -->



  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css" rel="stylesheet">

  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->

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

                  <h1>Configuracion de los Evaluadores</h1>

                </div>

              </div>

            </div>

            <!-- Evaluados-->

            <div class="row">

              <div class="col" id="card_principalContent">

                <div class="card">

                  <div class="card-body">

                    <!-- BOTONES -->

                    <div class="row w-100 d-flex justify-content-between mb-4">

                      <div class="col-4">

                        <button type="button" class="btn btn-danger" onclick="window.location.href='ListadoEvaluaciones.php'">Regresar</button>

                      </div>

                      <div class="col-4 d-flex flex-column gap-2">

                        <button type="button" class="btn btn-primary" id="btn_saveConfig">Guardar la configuración de las sucursales.</button>

                        <button type="button" class="btn btn-info d-flex justify-content-center align-items-center" id="openNewEv">

                          <span class="material-symbols-outlined me-1">add</span>

                          Nuevo Evaluador

                        </button>

                        <button type="button" class="btn btn-success" id="publishEvaluation">Publicar evaluación</button>

                      </div>

                    </div>

                    <div class="row w-100 text-center">

                      <h5 class="card-body">Sucursales a participar.</h5>

                    </div>

                    <div class="row" id="card_configBr">

                      <div class="col-12 text-center">

                        <div class="row mb-2" id="switchContainer">

                          <div class="col-12">

                            <div class="form-check form-switch ps-0" style="display: inline-flex; align-items: center;">

                              <label style="display: flex; align-items: center;">

                                <span>Todas</span>

                                <input class="form-check-input" type="checkbox" id="swTypeOption" style="margin: 0 10px; cursor: pointer; ">

                                <span class="form-check-label ms-0">Personalizado</span>

                              </label>

                            </div>

                          </div>

                        </div>

                        <div class="row" id="card_branch">

                          <div class="col-6">

                            <select class="form-select" id="listBranch_sel" multiple style="width: 100%;"></select>

                          </div>

                          <div class="col-6">

                            <select class="form-select" id="sel_typeSelBranch" style="width: 100%;">

                              <option value="1">Incluir seleccionados</option>

                              <option value="2">Excluir seleccionados</option>

                            </select>

                          </div>

                        </div>

                      </div>

                    </div>



                    <div class="col-12 mb-4" id="card_showBranch">

                      <h5 class="form-label">Seleccione las sucursales por mostrar.</h5>

                      <div class="row">

                        <div class="col-12">

                          <select class="form-select" id="selct_AllBranch" style="width:100%;"></select>

                        </div>

                      </div>

                    </div>



                    <!-- MENU DE SUCURSALES -->

                    <!-- Solución: Elimina los márgenes negativos -->

                    <div class="row g-0 w-100 mb-4" id="card_searchTableBranch">

                      <div class="col-12">

                        <label class="form-label">Sucursales: </label>

                      </div>

                      <div class="col-12">

                        <ul class="list-group" id="contentSection"></ul>

                      </div>

                    </div>





                    <div class=" col-12" id="card_contentEmployees">



                      <div class="row" id="contentAllTables"></div>



                    </div>



                  </div>

                </div>

              </div>

            </div>



            <!-- Modal Bootstrap 5 adaptado -->

            <div class="modal fade" id="contentNewEvaluator" tabindex="-1" aria-labelledby="modalLabelNewEvaluator" aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-lg">

                <div class="modal-content">



                  <div class="modal-header">

                    <h5 class="modal-title" id="modalLabelNewEvaluator">Agregar nuevo evaluador</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>



                  <div class="modal-body">

                    <div class="row">

                      <!-- Evaluado -->

                      <div class="col-12 mb-3">

                        <label for="slct_newEvaluated" class="form-label">Seleccione al evaluado</label>

                        <select class="form-select" id="slct_newEvaluated" style="width:100%"></select>

                      </div>



                      <!-- Evaluador -->

                      <div class="col-12 mb-3">

                        <label for="slct_newEvaluator" class="form-label">Seleccione al evaluador</label>

                        <select class="form-select" id="slct_newEvaluator" style="width:100%"></select>

                      </div>



                      <!-- Relación -->

                      <div class="col-12 mb-4">

                        <label for="typeNewEvaluator" class="form-label">Relación del empleado evaluador</label>

                        <select class="form-select" id="typeNewEvaluator">

                          <option value="1">JEFE</option>

                          <option value="2">PAR</option>

                          <option value="3">SUBORDINADO</option>

                        </select>

                      </div>



                      <!-- Botón Guardar -->

                      <div class="col-12 d-flex justify-content-center">

                        <button type="button" id="saveNewEvaluator" class="btn btn-success">

                          + Guardar nuevo evaluador

                        </button>

                      </div>

                    </div>

                  </div>



                </div>

              </div>

            </div>



          </div>

        </div>

        <div class="chat-windows"></div>

      </div>

    </div>

  </div>

  <script type="text/x-jsrender" id="typeEvaluatorTemplate">

    ${typeEvaluatorSF(data)}

    </script>

  <script type="text/x-jsrender" id="activeTemplate">

    ${activeSF(data)}

    </script>

  <script type="text/x-jsrender" id="deleteTemplate">

    ${deleteSF(data)}

    </script>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <!-- neptune Javascripts -->

  <script src="https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/publish-evaluation/data.js?v=<?= time() ?>" charset="utf-8"></script>
  <script src="scripts/publish-evaluation/general.js?v=<?= time() ?>" charset="utf-8"></script>

</body>

</html>