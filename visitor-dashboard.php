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

  <!-- <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet"> -->



  <!-- Styles neptune -->



  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

  <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet"> -->

  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->

  <style media="screen">

  </style>





</head>



<body>

  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <!-- ============================================================== -->

    <!-- Preloader - style you can find in spinners.css -->

    <!-- ============================================================== -->

    <div class="preloader">

      <div class="loader">

        <div class="loader__figure"></div>

        <!-- <p class="loader__label">PIP</p> -->

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

                  <h1>Visitas de los empleados al sistema</h1>

                </div>

              </div>

            </div>

            <div class="row">

              <div class="card">

                <div class="card-body">

                  <div class="row text-end">

                    <div class="col">

                      <span class="badge bg-success d-inline-flex align-items-center" style="font-size: 14px;">

                        <span id="tx_totalVisit"></span>

                        <span class="material-symbols-outlined">boy</span>

                      </span>

                    </div>

                  </div>



                  <div class="row text-center">

                    <label class="form-label fw-bold">Rango de Fechas</label>

                  </div>

                  <div class="row">

                    <div class="col-6">

                      <input class="form-control form-control-solid-bordered" type="date" id="date_Ini">

                    </div>

                    <div class="col-6">

                      <input class="form-control form-control-solid-bordered" type="date" id="date_End">

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">

              <li class="nav-item" role="presentation">

                <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Tabla</button>

              </li>

              <li class="nav-item" role="presentation">

                <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Por Sucursal</button>

              </li>

            </ul>

            <div class="row">

              <div class="col">

                <div class="tab-content" id="myTabContent">

                  <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">

                    <div class="card">

                      <div  class="col">

                        <div class="card-body">

                          <div id="t_usersVisit"></div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">

                    <div class="card">

                      <div class="col">

                        <div class="card-body text-center">

                          <div id="graph_PerBranch"></div>

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

  </div>









  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script> -->
  <!-- neptune Javascripts -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <!-- <script src="assets/libs/toastr/build/toastr.min.js"></script> -->
  <!-- <script src="assets/extra-libs/toastr/toastr-init.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js"></script>
  <script src="scripts/Dashboard/visitor-dashboard.js" charset="utf-8"></script>
</body>

</html>