<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>
  <!-- <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet"> -->

  <!-- Styles neptune -->

  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->
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
                  <h1>Puestos</h1>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col text-center">
                        <h5 class="fw-bold">¿Nuevo Puesto?</h5>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Nombre del puesto:</label>
                        <input id="txtNameP" type="text" class="form-control form-control-solid-bordered validate">
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">¿A qué división pertenece el puesto?</label>
                        <select id="slctDivision" class="form-select">
                          <option value="" disabled selected>Listado de divisiones</option>
                        </select>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-12 text-end">
                        <button type="button" class="btn btn-success" id="registraPuesto">Registrar</button>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="table-responsive">
                        <table class="table display text-center" id="TablePuestos">
                          <thead>
                            <tr>
                              <th>PUESTO</th>
                              <th>DIVISION</th>
                              <th>JEFE</th>
                              <th>PERMISOS</th>
                              <th>ACTUALIZAR</th>
                              <th>MODIFICAR JEFE</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal Update Puesto -->
        <div class="modal fade" id="divUpdatePuesto" tabindex="-1" aria-labelledby="divUpdatePuestoLabel" aria-hidden="true">
          <div class="modal-dialog modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="divUpdatePuestoLabel">Actualizar Puesto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" id="txtIdPuesto" value="">

                <div class="container-fluid">
                  <div class="row g-3 justify-content-center">
                    <div class="col-12 text-center">
                      <h6 id="textPuesto"></h6>
                    </div>

                    <div class="col-12 text-center">
                      <h6>Descripción</h6>
                      <input type="text" id="txtPuestoUpdate" class="form-control form-control-solid-bordered text-center" required>
                    </div>

                    <div class="col-12 text-center">
                      <button type="button" class="btn btn-success mt-3" onclick="updatePuesto()">Actualizar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Listar Jefes -->
        <div class="modal fade" id="modalListPuestos" tabindex="-1" aria-labelledby="modalListPuestosLabel" aria-hidden="true" style="overflow: visible !important;">
          <div class="modal-dialog modal-md" style="overflow: visible !important;">
            <div class="modal-content" style="max-height: 80vh; overflow: visible !important;">
              <div class="modal-header">
                <h5 class="modal-title" id="modalListPuestosLabel">Asignar Jefes al Puesto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>

              <div class="modal-body" style="overflow: visible !important;">
                <input type="hidden" id="inpPSelected">

                <div class="container-fluid">
                  <div class="row g-3 justify-content-center">
                    <div class="col-12 text-center">
                      <h4 id="txtPSelected"></h4>
                      <h6>Seleccione los jefes del puesto.</h6>
                      <select id="slctJefes" class="form-select" style="width:100%"></select>
                    </div>

                    <div class="col-12 col-md-6 text-center">
                      <button type="button" class="btn btn-success w-100 mt-3" id="updateJefes">
                        Actualizar
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
  </div>


  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <!-- Scripts específicos de esta página -->
  <script src="scripts/Puestos.js" charset="utf-8"></script>
  <script type="text/javascript">
  </script>

</body>

</html>