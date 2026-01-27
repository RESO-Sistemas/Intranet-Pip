<?php include("AutorizaPagina.php"); ?>
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
                  <h1>Eventos</h1>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row text-end mb-4">
                      <div class="col">
                        <a class="btn btn-primary" onclick="TipoAccion(0)">Nuevo Evento</a>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table striped m-b-10 display centered" id="TableEventos">
                        <thead>
                          <tr>
                            <th>TITULO</th>
                            <th>DESCRIPCIÓN</th>
                            <th>FECHA INICIO</th>
                            <th>FECHA FIN</th>
                            <th>STATUS</th>
                            <th>EDITAR</th>
                            <th>EDITAR STATUS</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Bootstrap -->
            <div class="modal fade" id="ModalEvento" tabindex="-1" aria-labelledby="ModalEventoLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="ModalEventoLabel">Nuevo Evento</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                  </div>

                  <div class="modal-body">
                    <form id="FomrInsertaEvento" class="row g-3">

                      <div class="col-12">
                        <label for="txtTitulo" class="form-label fw-bold">Titulo</label>
                        <input id="txtTitulo" type="text" name="txtTitulo" class="form-control" required>
                      </div>

                      <div class="col-12">
                        <label for="txtDescripcion" class="form-label fw-bold">Descripcion</label>
                        <input id="txtDescripcion" type="text" name="txtDescripcion" class="form-control" required>
                      </div>

                      <div class="col-6 col-md-3">
                        <label for="txtFechaInicio" class="form-label fw-bold">Fecha Inicio</label>
                        <input type="date" id="txtFechaInicio" name="txtFechaInicio" class="form-control" required max="2999-09-21">
                      </div>

                      <div class="col-6 col-md-3">
                        <label for="txtFechaFin" class="form-label fw-bold">Fecha Fin</label>
                        <input type="date" id="txtFechaFin" name="txtFechaFin" class="form-control" required max="2999-09-21">
                      </div>

                      <div class="col-6 col-md-3">
                        <label for="txtHoraInicio" class="form-label fw-bold">Hora Inicio</label>
                        <input type="time" id="txtHoraInicio" name="txtHoraInicio" class="form-control" required>
                      </div>

                      <div class="col-6 col-md-3">
                        <label for="txtHoraFin" class="form-label fw-bold">Hora Fin</label>
                        <input type="time" id="txtHoraFin" name="txtHoraFin" class="form-control" required>
                      </div>

                    </form>
                  </div>

                  <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> -->
                    <button type="button" class="btn btn-primary" id="RegistrarEvento" onclick="EventoOnclick()">Agregar evento</button>
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


  <?php include("scripts.php"); ?>


  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>

  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/Eventos.js" charset="utf-8"></script>

</body>

</html>