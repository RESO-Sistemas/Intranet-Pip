<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>La Esmeralda</title>
  <?php include("neptune_styles.php"); ?>
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>

    <div class="app-container">
      <?php include("includes/_Header.php"); ?>

      <div class="app-content">
        <div class="content-wrapper">
          <div class="container-fluid">

            <div class="row">
              <div class="col-10 offset-1 col-lg-5 offset-lg-7"
                style="position: fixed; z-index: 9999; right: 20px; top: 80px;">
                <div id="contenidoMensajes" class="mb-2"></div>
                <div id="contenidoMensajesSolicitudesVJefe" class="mb-2"></div>
                <div id="contenidoMensajesSolicitudesNomina" class="mb-2"></div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12">
                <div class="page-description">
                  <h1 class="m-0">Mis planes de acción</h1>
                </div>
              </div>
            </div>

            <div id="dv_planes" class="row g-3">
              <!-- tarjetas renderizadas por JS -->
            </div>
            <div id="dv_planes_empty" class="row" style="display:none;">
              <div class="col-12">
                <div class="card shadow-sm border-0">
                  <div class="card-body text-center py-5">
                    <i class="fa-solid fa-clipboard-list fs-1 text-muted mb-3"></i>
                    <p class="text-muted mb-0">No tienes planes de acción registrados.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <script src="scripts/my-action-plans.js" charset="utf-8"></script>
</body>

</html>
