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

  <link href="assets/libs/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    .modal-archivo-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      margin-bottom: 6px;
      background: #fafbfc;
    }
  </style>

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

                  <h1>Feeds</h1>

                </div>

              </div>

            </div>



            <div class="row">

              <div class="col">

                <div class="card">

                  <div class="card-body">

                    <div class="row text-end mb-4">

                      <div class="col">

                        <button class="btn btn-primary" onclick="abrirModalCrear()">
                          <span class="material-symbols-outlined" style="vertical-align:middle;font-size:1rem;">add</span>
                          Nueva Publicación
                        </button>

                      </div>

                    </div>



                    <div class="table-responsive">

                      <div id="TableFeeds"></div>

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





  <!-- Modal Crear Feed -->
  <div class="modal fade" id="modalCrearFeed" tabindex="-1" aria-labelledby="modalCrearFeedLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCrearFeedLabel">
            <span class="material-symbols-outlined me-1" style="vertical-align:middle;">add_circle</span>
            Nueva publicación
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="crearTxtTitulo" class="form-label fw-bold">Título <span class="text-danger">*</span></label>
            <textarea id="crearTxtTitulo" class="form-control" rows="2" placeholder="Escribe el título..."></textarea>
          </div>
          <div class="mb-3">
            <label for="crearTxtDescripcion" class="form-label fw-bold">Descripción <span class="text-danger">*</span></label>
            <textarea id="crearTxtDescripcion" class="form-control" rows="5" placeholder="¿Qué quieres comunicar?"></textarea>
          </div>
          <div class="mb-3">
            <label for="crearTxtHV" class="form-label fw-bold">Hipervínculo <span class="text-muted fw-normal" style="font-size:.8rem;">(opcional)</span></label>
            <input type="url" id="crearTxtHV" class="form-control" placeholder="https://...">
          </div>
          <div class="mb-2">
            <label class="form-label fw-bold">Imágenes <span class="text-muted fw-normal" style="font-size:.8rem;">(opcional)</span></label>
            <input type="file" id="crearFileInput" class="form-control" multiple accept="image/jpeg,image/png,image/gif,image/webp">
            <div id="crearPreviewNuevos" class="d-flex flex-wrap gap-1 mt-2"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" id="btnGuardarCrearFeed" onclick="publicarNuevoFeed()">
            <i class="fas fa-paper-plane me-1"></i> Publicar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Editar Feed -->
  <div class="modal fade" id="modalEditarFeed" tabindex="-1" aria-labelledby="modalEditarFeedLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalEditarFeedLabel">
            <span class="material-symbols-outlined me-1" style="vertical-align:middle;">edit</span>
            Editar publicación
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="modalTxtTitulo" class="form-label fw-bold">Título <span class="text-danger">*</span></label>
            <textarea id="modalTxtTitulo" class="form-control" rows="2"></textarea>
          </div>
          <div class="mb-3">
            <label for="modalTxtDescripcion" class="form-label fw-bold">Descripción <span class="text-danger">*</span></label>
            <textarea id="modalTxtDescripcion" class="form-control" rows="5"></textarea>
          </div>
          <div class="mb-3">
            <label for="modalTxtHV" class="form-label fw-bold">Hipervínculo <span class="text-muted fw-normal" style="font-size:.8rem;">(opcional)</span></label>
            <input type="url" id="modalTxtHV" class="form-control" placeholder="https://...">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Archivos actuales</label>
            <div id="modalArchivosActuales"></div>
          </div>
          <div class="mb-2">
            <label class="form-label fw-bold">Agregar imágenes <span class="text-muted fw-normal" style="font-size:.8rem;">(opcional)</span></label>
            <input type="file" id="modalFileInput" class="form-control" multiple accept="image/jpeg,image/png,image/gif,image/webp">
            <div id="modalPreviewNuevos" class="d-flex flex-wrap gap-1 mt-2"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" id="btnGuardarModalFeed" onclick="guardarFeedDesdeModal()">
            <i class="fas fa-save me-1"></i> Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Administrar Comentarios -->
  <div class="modal fade" id="modalAdminComentarios" tabindex="-1" aria-labelledby="modalAdminComentariosLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAdminComentariosLabel">
            <span class="material-symbols-outlined me-1" style="vertical-align:middle;">forum</span>
            Administrar Comentarios
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body" id="modalAdminComentariosBody">
          <!-- Comentarios se cargarán aquí -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- neptune Javascripts -->

  <?php include("neptune_js.php");  ?>

  <!-- neptune Javascripts -->

  <script src="assets/libs/block-ui/jquery.blockUI.js"></script>

  <script src="scripts/ListadoFeed.js?<?= time() ?>" charset="utf-8"></script>



</body>



</html>
