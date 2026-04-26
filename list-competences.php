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

  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->

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

                  <h1>Competencias</h1>

                </div>

              </div>

            </div>

            <!-- Competencias-->

            <div class="card">

              <div class="card-body">

                <div class="row w-100 d-flex justify-content-end">

                  <div class="col-auto mb-4">

                    <button class="btn btn-primary d-inline-flex align-items-center gap-1" id="btnOpenNewCompetences">

                      <span class="material-symbols-outlined">add</span>

                      Nueva competencia

                    </button>

                  </div>

                </div>

                <div id="content_Competences"></div>

              </div>

            </div>



            <!-- Modal Bootstrap 5 adaptado -->

            <div class="modal fade" id="modalDetailCompetence" tabindex="-1" aria-labelledby="modalLabelCompetence" aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">

                <div class="modal-content">



                  <!-- Encabezado -->

                  <div class="modal-header">

                    <h5 class="modal-title" id="modalLabelCompetence">Detalles de la competencia</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>



                  <!-- Cuerpo -->

                  <div class="modal-body">

                    <div class="text-center mb-3">

                      <h3 id="txActionCompetence"></h3>

                    </div>



                    <input type="hidden" id="competenceEdit">

                    <input type="hidden" id="actionCompetence" data-noclean="true">



                    <div class="row">

                      <!-- Tipo de competencia -->

                      <div class="col-12 col-md-4 mb-3">

                        <label for="slc_typeComp" class="form-label">* Tipo de competencia</label>

                        <select id="slc_typeComp" required class="form-select" style="width: 100%;"></select>

                        <p for="slc_typeComp" data-msg="El tipo de competencia es obligatorio" class="text-danger small"></p>

                      </div>



                      <!-- Nombre de competencia -->

                      <div class="col-12 col-md-8 mb-3">

                        <label for="name_Comp" class="form-label">* Competencia</label>

                        <input type="text" id="name_Comp" class="form-control" required>

                        <p for="name_Comp" data-msg="El nombre de la competencia es obligatorio" class="text-danger small"></p>

                      </div>

                    </div>



                    <!-- Significado -->

                    <div class="mb-3">

                      <label for="sig_Comp" class="form-label">* Significado de la Competencia</label>

                      <textarea id="sig_Comp" class="form-control" placeholder="Significado" required></textarea>

                      <p for="sig_Comp" data-msg="El significado de la competencia es obligatorio" class="text-danger small"></p>

                    </div>

                  </div>



                  <!-- Pie -->

                  <div class="modal-footer">

                    <button type="button" id="acceptCompetence" class="btn btn-success btn-round">

                      Aceptar cambios

                    </button>

                  </div>



                </div>

              </div>

            </div>



          </div>

        </div>



      </div>

    </div>

  </div>

  <script type="text/x-jsrender" id="statusTemplate">

    ${statusDetail(data)}

            </script>

  <script type="text/x-jsrender" id="updateStatusTemplate">

    ${updateStatusSY(data)}

            </script>

  <script type="text/x-jsrender" id="updateCompetenceTemplate">

    ${updateCompetenceSF(data)}

            </script>

  <script type="text/x-jsrender" id="viewDetailCompetenceTemplate">

    ${viewDetailCompetenceSF(data)}

            </script>


  <!-- neptune Javascripts -->

  <?php include("neptune_js.php");  ?>

  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>

  <script src="./neptune/js/pages/select2.js"></script>

  <!-- neptune Javascripts -->

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

  <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="scripts/global.js" charset="utf-8"></script>

  <script src="assets/libs/toastr/build/toastr.min.js"></script>

  <script src="assets/extra-libs/toastr/toastr-init.js"></script>

  <script src="scripts/list-competences.js" charset="utf-8"></script>



</body>



</html>