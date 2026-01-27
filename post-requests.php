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

  <!-- <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet"> -->



  <!-- Styles neptune -->



  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

  <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet"> -->

  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->

  <link rel="stylesheet" href="/plugins/unitegallery-master/dist/css/unite-gallery.css">

  <link rel="stylesheet" href="/plugins/unitegallery-master/package/unitegallery/themes/default/ug-theme-default.css">

  <link rel="stylesheet" href="/plugins/unitegallery-master/source/unitegallery/skins/alexis/alexis.css">





</head>



<body>

  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <!-- ============================================================== -->

    <!-- Preloader - style you can find in spinners.css -->

    <!-- ============================================================== -->

    <div class="preloader">

      <div class="loader">

        <div class="loader__figure"></div>

        <!-- <p class="loader__label">Klyns</p> -->

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

                  <h1>Peticiones para el Feed</h1>

                </div>

              </div>

            </div>

            <div class="row">

              <div class="card">

                <div class="card-body">

                  <ul id="contentPost" style="padding-left: 0px !important; margin-bottom: 0px !important;"></ul>

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

  <!-- neptune Javascripts -->



  <?php include("scripts.php"); ?>



  <script src="/plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>

  <script src="/plugins/unitegallery-master/package/unitegallery/themes/default/ug-theme-default.js" charset="utf-8"></script>

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  

  <!-- Scripts específicos de esta página -->

  <script src="scripts/global.js" charset="utf-8"></script>

  <script src="/scripts/post-requests.js" charset="utf-8"></script>

</body>



</html>