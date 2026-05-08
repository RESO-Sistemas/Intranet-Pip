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
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <style>body { padding: 0.75rem; margin: 0; background: #fff; }</style>
</head>
<body>
  <div id="embedLoader" style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
    <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status"><span class="visually-hidden">Cargando...</span></div>
    <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
  </div>
  <script>window.addEventListener('load',function(){var e=document.getElementById('embedLoader');if(e)e.style.display='none';});</script>

  <div class="d-flex justify-content-center pb-3">
    <h6 class="card-title mb-0">Evaluación seleccionada: <b id="tx_title"></b></h6>
  </div>
  <div class="mb-3">
    <label class="form-label text-warning"><b>Nota: </b>Para filtrar los resultados es necesario seleccionar algún puesto o sucursal/departamento donde pertenecen los empleados a buscar.</label>
  </div>
  <div id="table_evaluados"></div>

  <div class="modal fade" id="modal_evaluadores" tabindex="-1" aria-labelledby="modalEvaluadoresLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEvaluadoresLabel">Evaluadores del empleado</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="evaluadoSelected">
        <div class="row">
          <div class="col-12 d-flex justify-content-end mb-3">
            <button class="btn btn-success d-flex align-items-center gap-2" id="btnNuevoEvaluador">
              <span class="material-icons fw-bold fs-5">add</span><span>Agregar</span>
            </button>
          </div>
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-bordered text-center" id="table_evaluadores">
                <thead><tr><th>Evaluadores</th><th>Tipo Evaluador</th><th>Eliminar evaluador</th></tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div></div>
  </div>

  <div class="modal fade" id="modalEvaluadoresBootstrap" tabindex="-1" aria-labelledby="modalEvaluadoresBootstrapLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEvaluadoresBootstrapLabel">Nuevo Evaluador</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <div class="row" id="contNuevoEvaluador"><div class="col-12">
          <div class="mb-3">
            <label for="modal_relacion" class="form-label">Relación entre el empleado</label>
            <select class="form-select" id="modal_relacion">
              <option value="1">JEFE</option><option value="2">PAR</option><option value="3">SUBORDINADO</option>
            </select>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3"><label for="slcPuestosModal" class="form-label">Puestos</label><select id="slcPuestosModal" class="form-select"></select></div>
            <div class="col-md-6 mb-3"><label for="slcDivisionModal" class="form-label">División</label><select id="slcDivisionModal" class="form-select"></select></div>
            <div class="col-12 mb-3"><label for="slcSucursalModal" class="form-label">Sucursal</label><select id="slcSucursalModal" class="form-select"></select></div>
          </div>
          <div class="table-responsive">
            <table id="table_newEvaluadores" class="table table-bordered text-center">
              <thead><tr><th>Empleado</th><th>Seleccionar</th></tr></thead>
              <tbody></tbody>
            </table>
          </div>
        </div></div>
      </div>
    </div></div>
  </div>

  <script type="text/x-jsrender" id="btnListEvaluatorsTemplate">${btnListEvaluatorsSF(data)}</script>

  <?php include("neptune_js.php"); ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/Evaluados.js" charset="utf-8"></script>
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

  <title>PIP by Lugo</title>

  <!-- Styles neptune -->



  <?php include("neptune_styles.php");  ?>

  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">



  <!-- Styles neptune -->



  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->

  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <!-- <link rel="stylesheet" href="plugins/chosen/chosen.min.css"> -->

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

  <?php if ($embed): ?>
  <style>
    html, body { height: auto !important; min-height: unset !important; background: #fff !important; overflow-x: hidden; }
    #main-wrapper { display: block !important; height: auto !important; }
    .app-container { margin-left: 0 !important; width: 100% !important; min-height: unset !important; }
    .app-content { padding-top: 0 !important; min-height: unset !important; }
    .content-wrapper { padding: 0 !important; min-height: unset !important; }
    .container { max-width: 100% !important; padding: 0 0.75rem !important; }
    .page-description, .preloader, .chat-windows { display: none !important; }
  </style>
  <?php endif; ?>

</head>



<body>

  <?php if ($embed): ?>
  <div id="embedLoader" style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
    <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
    <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
  </div>
  <script>window.addEventListener('load',function(){var e=document.getElementById('embedLoader');if(e)e.style.display='none';});</script>
  <?php endif; ?>

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

    <?php if (!$embed): ?>
    <div id="Menu">

      <?php include("menus.php"); ?>

    </div>
    <?php endif; ?>

    <div class="app-container">

      <?php if (!$embed): include("includes/_Header.php"); endif; ?>

      <div class="app-content">

        <div class="content-wrapper">

          <div class="container">

            <?php if (!$embed): ?>
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
            <?php endif; ?>

            <!-- Evaluados-->

            <div class="row">

              <div class="col">

                <div class="card">

                  <div class="card-body">

                    <div class="d-flex justify-content-center pb-4">

                      <h6 class="card-title">Evaluación seleccionada: <b id="tx_title"></b></h6>

                    </div>

                    <div class="d-flex justify-content-start pb-4">

                      <label class="form-label text-warning"><b>Nota: </b>Para filtrar los resultados es necesario seleccionar algún puesto o sucursal/departamento donde pertenecen los empleados a buscar.</label>

                    </div>

                    <div id="table_evaluados"></div>

                  </div>

                </div>

              </div>

            </div>

            <div class="modal fade" id="modal_evaluadores" tabindex="-1" aria-labelledby="modalEvaluadoresLabel" aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                  <div class="modal-header">

                    <h5 class="modal-title" id="modalEvaluadoresLabel">Evaluadores del empleado</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>



                  <div class="modal-body">

                    <!-- Se mantiene el input oculto -->

                    <input type="hidden" id="evaluadoSelected">



                    <div class="row">

                      <div class="col-12 d-flex  justify-content-end mb-3">

                        <!-- Botón personalizado -->

                        <button class="btn btn-success d-flex align-items-center gap-2" id="btnNuevoEvaluador">

                          <span class="material-icons fw-bold fs-5">add</span>



                          <span>Agregar</span>

                        </button>

                      </div>



                      <div class="col-12">

                        <div class="table-responsive">

                          <table class="table table-bordered text-center" id="table_evaluadores">

                            <thead>

                              <tr>

                                <th>Evaluadores</th>

                                <th>Tipo Evaluador</th>

                                <th>Eliminar evaluador</th>

                              </tr>

                            </thead>

                            <tbody>



                            </tbody>

                          </table>

                        </div>

                      </div>

                    </div>

                  </div>



                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                  </div>

                </div>

              </div>

            </div>



            <!-- Modal Bootstrap 5 -->

            <div class="modal fade" id="modalEvaluadoresBootstrap" tabindex="-1" aria-labelledby="modalEvaluadoresBootstrapLabel" aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">

                <div class="modal-content">

                  <div class="modal-header">

                    <h5 class="modal-title" id="modalEvaluadoresBootstrapLabel">Nuevo Evaluador</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>

                  <div class="modal-body">



                    <div class="row" id="contNuevoEvaluador">

                      <div class="col-12">

                        <div class="mb-3">

                          <label for="modal_relacion" class="form-label">Relación entre el empleado</label>

                          <select class="form-select" id="modal_relacion">

                            <option value="1">JEFE</option>

                            <option value="2">PAR</option>

                            <option value="3">SUBORDINADO</option>

                          </select>

                        </div>



                        <div class="row">

                          <div class="col-md-6 mb-3">

                            <label for="slcPuestosModal" class="form-label">Puestos</label>

                            <select id="slcPuestosModal" class="form-select"></select>

                          </div>

                          <div class="col-md-6 mb-3">

                            <label for="slcDivisionModal" class="form-label">División</label>

                            <select id="slcDivisionModal" class="form-select"></select>

                          </div>

                          <div class="col-12 mb-3">

                            <label for="slcSucursalModal" class="form-label">Sucursal</label>

                            <select id="slcSucursalModal" class="form-select"></select>

                          </div>

                        </div>



                        <div class="table-responsive">

                          <table id="table_newEvaluadores" class="table table-bordered text-center">

                            <thead>

                              <tr>

                                <th>Empleado</th>

                                <th>Seleccionar</th>

                              </tr>

                            </thead>

                            <tbody>

                            </tbody>

                          </table>

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

  <script type="text/x-jsrender" id="btnListEvaluatorsTemplate">

    ${btnListEvaluatorsSF(data)}

    </script>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/Evaluados.js" charset="utf-8"></script>

</body>

</html>