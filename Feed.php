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
                  <h1>Nuevo Feed</h1>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row text-start mb-4">
                      <div class="col">
                        <a href="ListadoFeed.php" class="btn btn-danger">Regresar</a>
                      </div>
                    </div>
                    <div class="row">
                      <form id="InsertaFeed" class="col-12">
                        <!-- Título -->
                        <div class="mb-3">
                          <label for="txtTitulo" class="form-label fw-bold">Título</label>
                          <textarea id="txtTitulo" name="txtTitulo" class="form-control" rows="2"></textarea>
                        </div>

                        <!-- Descripción -->
                        <div class="mb-3">
                          <label for="txtDescripcion" class="form-label fw-bold">Descripción</label>
                          <textarea id="txtDescripcion" name="txtDescripcion" class="form-control" rows="8" required></textarea>
                        </div>

                        <!-- Hipervínculo -->
                        <div class="mb-3">
                          <label for="txtHV" class="form-label fw-bold">Hipervínculo</label>
                          <textarea id="txtHV" name="txtHV" class="form-control" placeholder="Opcional" rows="2"></textarea>
                        </div>
                      </form>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="card border-dark shadow-sm">
                          <div class="card-body">
                            <!-- Título -->
                            <label class="form-label fw-bold">Elementos multimedia</label>

                            <!-- Zona de arrastre -->
                            <div class="upload_drops text-center p-3 border rounded" id="dropzones">
                              <label class="form-label">Arrastre las imágenes para agregarlas</label>
                              <br>

                              <!-- Nota -->
                              <span class="badge badge-style-bordered badge-warning mb-2">
                                Nota: Se aceptan imágenes.
                              </span>
                              <br>

                              <!-- Input oculto -->
                              <input type="file"
                                name="files[]"
                                id="standard_filess"
                                style="display:none;"
                                multiple
                                accept="application/pdf,image/jpeg,image/x-png,application/vnd.ms-powerpoint"
                                required>

                              <!-- Botón -->
                              <button class="btn btn-outline-primary mt-2" type="button" id="btnStandards">
                                <span class="material-symbols-outlined">upload_file</span>
                              </button>

                              <!-- Preview de imágenes -->
                              <div id="ImagenesDrop" class="mt-3"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                    <div class="row text-center">
                      <div class="col">
                       <button id="CrearFeed"  class='btn btn-success'>Crear Feed</button>
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


  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/Feed.js" charset="utf-8"></script>
</body>

</html>