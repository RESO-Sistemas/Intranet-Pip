<!DOCTYPE html>
<html>

<head>
  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <style media="screen">
      @media (min-width: 992px) {
         .fixed-div {
           position: fixed;
         }
       }
    </style>
</head>

<body>
    <div class="main-wrapper" id="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>
        <div id="Menu">
          <?php
          include("menus-original.php");
           ?>
        </div>
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Configuración de los evaluadores.</h5>
                </div>
            </div>
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
            <div class="container-fluid" style="z-index:5">
              <div class="row">
                <div class="col s12 m9" id="card_principalContent">
                  <div class="row">
                    <div class="col s12" id="card_configBr">
                        <div class="card">
                          <div class="card-content">
                            <div class="row">
                              <h4>Sucursales a participar.</h4>
                            </div>
                            <div class="row">
                              <div class="col s12">
                                <div class="switch">
                                    <label>
                                        Todas las sucursales
                                        <input type="checkbox" id="swTypeOption">
                                        <span class="lever"></span>
                                        Personalizado
                                    </label>
                                </div>
                                <hr>
                              </div>
                            </div>
                            <div class="row" id="card_branch">
                              <div class="col s12 m7">
                                <select class="browser-default" id="listBranch_sel" multiple style="width: 100%;"></select>
                                <hr>
                              </div>
                              <div class="col s12 m5">
                                <select class="browser-default" id="sel_typeSelBranch" style="width: 100%;">
                                  <option value="1">Incluir seleccionados</option>
                                  <option value="2">Excluir seleccionados</option>
                                </select>
                                <hr>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="col s12" id="card_showBranch">
                      <div class="card">
                        <div class="card-content">
                          <h6>Seleccione las sucursales por mostrar.</h6>
                          <div class="row">
                            <div class="col s12">
                              <select class="browser-default" id="selct_AllBranch"  style="width:100%;"></select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col s12" id="card_contentEmployees">
                      <div class="card">
                        <div class="card-content">
                          <div class="row" id="contentAllTables"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12 m3 ">
                  <div class="row "  style="position: fixed;">
                    <div class="col s12">
                      <div class="row">
                        <div class="col s12">
                          <button type="button" class="btn-actionOrange" onclick="window.location.href='ListadoEvaluaciones.php'">Regresar a la página anterior</button>
                          <hr>
                        </div>
                        <div class="col s12">
                          <button type="button" class="btn-actionBlue" id="btn_saveConfig">Guardar la configuración de las sucursales.</button>
                        </div>
                        <div class="col s12">
                          <button type="button" class="btn-actionBlue" id="openNewEv"> + Nuevo Evaluador</button>
                          <hr>
                        </div>
                        <div class="col s12">
                          <button type="button" class="btn-actionGreen" id="publishEvaluation">Publicar evaluación</button>
                        </div>
                      </div>
                      <hr>
                    </div>
                    <div class="col s12 m10 offset-m1" id="card_searchTableBranch">
                      <div class="card ">
                        <div class="card-content">
                          <div class="row">
                            <div class="col s12">
                              <h5>Sucursales:</h5>
                            </div>
                            <div class="col s12 hide-on-small-only">
                              <ul class="section table-of-contents" id="contentSection"></ul>
                            </div>
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
    <!-- <div style="display:none">
      <div id="contentNewEvaluator">
        <div class="row">
          <div class="col s12">
            <h6>Seleccione al evaluado</h6>
            <select class="browser-default" style="width:100%" id="slct_newEvaluated"></select>
            <hr>
          </div>
          <div class="col s12">
            <h6>Seleccione al evaluador</h6>
            <select class="browser-default" style="width:100%" id="slct_newEvaluator"></select>
            <hr>
          </div>
          <div class="col s12">
            <h6>Relación del empleado evaluador</h6>
            <select id="typeNewEvaluator">
              <option value="1">JEFE</option>
              <option value="2">PAR</option>
              <option value="3">SUBORDINADO</option>
            </select>
            <hr>
          </div>
          <div class="col s12 col m6 offset-m3">
            <button type="button" id="saveNewEvaluator" class="btn-actionGreen"> + Guardar nuevo evaluador</button>
          </div>
        </div>
      </div>
    </div> -->
    <div id="contentNewEvaluator" class="modal">
      <div class="modal-content">
        <div class="row">
          <div class="col s12">
            <h4>Agregar nuevo evaluador</h4>
            <hr>
          </div>
          <div class="col s12">
            <h6>Seleccione al evaluado</h6>
            <select class="browser-default" style="width:100%" id="slct_newEvaluated"></select>
            <hr>
          </div>
          <div class="col s12">
            <h6>Seleccione al evaluador</h6>
            <select class="browser-default" style="width:100%" id="slct_newEvaluator"></select>
            <hr>
          </div>
          <div class="col s12">
            <h6>Relación del empleado evaluador</h6>
            <select id="typeNewEvaluator">
              <option value="1">JEFE</option>
              <option value="2">PAR</option>
              <option value="3">SUBORDINADO</option>
            </select>
            <hr>
          </div>
          <div class="col s12 col m6 offset-m3">
            <button type="button" id="saveNewEvaluator" class="btn-actionGreen"> + Guardar nuevo evaluador</button>
          </div>
        </div>
      </div>
    </div>
    <script type="text/x-jsrender" id="typeEvaluatorTemplate">
      ${typeEvaluatorSF(data)}
    </script>
    <script type="text/x-jsrender" id="activeTemplate">
      ${activeSF(data)}
    </script>
    <script type="text/x-jsrender" id="deleteTemplate">
      ${deleteSF(data)}
    </script>
    <?php include("scripts-original.php"); ?>
    <script src="https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/publish-evaluation/data-original.js" charset="utf-8"></script>
    <script src="scripts/publish-evaluation/general-original.js" charset="utf-8"></script>

</body>

</html>
