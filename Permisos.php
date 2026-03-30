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

  <!-- Styles neptune -->

  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <!-- <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" /> -->
  <!-- <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" /> -->
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet"> -->
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
              <div class="col">
                <div class="page-description page-description-tabbed d-flex justify-content-between align-items-center">
                  <h1 class="mb-0">Permisos</h1>
                  <a href="Puestos.php" class="btn d-flex align-items-center gap-1" style="white-space: nowrap; background-color: #6c757d; color: #fff; border-color: #6c757d;">
                    <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>Regresar
                  </a>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div id="ContenedorPermisos" class="row g-4"></div>
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
  <?php include("scripts.php"); ?>
  <!-- neptune Javascripts -->

  <script src="scripts/Permisos.js?v=<?= time() ?>" charset="utf-8"></script>
  <script>
    // Ocultar preloader inmediatamente si el DOM cargó
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() { $(".preloader").fadeOut(200); }, 300);
    });
  </script>

</body>

</html>