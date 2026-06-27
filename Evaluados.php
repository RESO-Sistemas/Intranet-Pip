<?php include("AutorizaPagina.php"); ?>
<?php $embed = isset($_GET['embed']); ?>
<?php if ($embed): ?>
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include("neptune_styles.php"); ?>
    <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <style>
      body {
        padding: 0.75rem;
        margin: 0;
        background: #fff;
      }

      <?php include_once('includes/_evaluados_styles.php'); ?>
    </style>
  </head>

  <body>
    <div id="embedLoader"
      style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
      <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status"><span
          class="visually-hidden">Cargando...</span></div>
      <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
    </div>
    <script>window.addEventListener('load', function () { var e = document.getElementById('embedLoader'); if (e) e.style.display = 'none'; });</script>

    <div class="ev-info-header mb-3">
      <div class="ev-info-icon"><i class="fas fa-clipboard-list"></i></div>
      <div>
        <div class="ev-info-title">Evaluación: <span id="tx_title">—</span></div>
      </div>
    </div>

    <div class="ev-nota-alert mb-3">
      <span class="material-symbols-outlined">info</span>
      <span>Para filtrar los resultados, selecciona algún puesto o sucursal/departamento donde pertenecen los empleados a
        buscar.</span>
    </div>

    <div class="ev-search-wrap">
      <div class="input-group input-group-sm">
        <span class="input-group-text border-end-0">
          <span class="material-symbols-outlined text-muted" style="font-size:16px;">search</span>
        </span>
        <input type="text" id="txtBuscarEvaluado" class="form-control border-start-0"
          placeholder="Buscar evaluado por nombre..." oninput="filtrarEvaluados()">
      </div>
    </div>
    <div id="table_evaluados"></div>

    <?php include('includes/_evaluados_offcanvas.php'); ?>
    <?php include('includes/_evaluados_modal_nuevo.php'); ?>


    <?php include("neptune_js.php"); ?>
    <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
    <script src="./neptune/js/pages/select2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
      integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/Evaluados.js?v=<?= time() ?>" charset="utf-8"></script>
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
  <title>La Esmeralda</title>
  <?php include("neptune_styles.php"); ?>
  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <style>
    <?php include_once('includes/_evaluados_styles.php'); ?>
  </style>
</head>

<body>
  <div class="preloader">
    <div class="loader">
      <div class="loader__figure"></div>
      <p class="loader__label">PIP</p>
    </div>
  </div>

  <div id="Menu">
    <?php include("menus.php"); ?>
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
                <h1>Lista de Evaluados</h1>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <div class="ev-info-header mb-3">
                    <div class="ev-info-icon"><i class="fas fa-clipboard-list"></i></div>
                    <div>
                      <div class="ev-info-title">Evaluación: <span id="tx_title">—</span></div>
                    </div>
                  </div>
                  <div class="ev-nota-alert mb-3">
                    <span class="material-symbols-outlined">info</span>
                    <span>Para filtrar los resultados, selecciona algún puesto o sucursal/departamento donde pertenecen
                      los empleados a buscar.</span>
                  </div>
                  <div class="ev-search-wrap">
                    <div class="input-group input-group-sm">
                      <span class="input-group-text border-end-0">
                        <span class="material-symbols-outlined text-muted" style="font-size:16px;">search</span>
                      </span>
                      <input type="text" id="txtBuscarEvaluado" class="form-control border-start-0"
                        placeholder="Buscar evaluado por nombre..." oninput="filtrarEvaluados()">
                    </div>
                  </div>
                  <div id="table_evaluados"></div>
                </div>
              </div>
            </div>
          </div>

          <?php include('includes/_evaluados_offcanvas.php'); ?>
          <?php include('includes/_evaluados_modal_nuevo.php'); ?>

        </div>
        <div class="chat-windows"></div>
      </div>
    </div>
  </div>


  <?php include("neptune_js.php"); ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/Evaluados.js?v=<?= time() ?>" charset="utf-8"></script>
</body>

</html>
