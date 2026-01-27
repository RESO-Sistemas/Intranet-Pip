<?php include("AutorizaPagina.php"); ?>
<?php
require_once("Backend/Empleados/Empleados.php");
$ins = new Empleados();
$ins->visitIndexEmployee();

require_once("Backend/Configuracion/Configuracion.php");
$Conf = new Configuracion();
$MenuP = $Conf->getMenusPadre();
?>
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
  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
  <!-- Styles neptune -->

  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator_modern.min.css" rel="stylesheet">
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>
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
      <div class="app-header">
        <nav class="navbar navbar-light navbar-expand-lg">
          <div class="container-fluid">
            <div class="navbar-nav" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">first_page</i></a>
                </li>
              </ul>

            </div>
            <div class="d-flex">
              <ul class="navbar-nav">

                <!-- notifications -->
                <li class="nav-item hidden-on-mobile">
                  <!-- nav-notifications-toggle -->
                  <a class="nav-link" id="notificationsDropDown" href="#" data-bs-toggle="dropdown"><i class="material-icons">notifications</i></a>
                  <div class="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">
                    <h6 class="dropdown-header">Notificaciones</h6>
                    <div class="notifications-dropdown-list">
                      <div id="notificacionesPendienteLEtica"></div>
                      <div id="notificacionesMenuLEtica"></div>
                      <div id="notificacionesMenuSVacaciones"></div>
                      <div id="notificacionesMenuSVacacionesNomina"></div>
                      <div id="notificacionesCapacitacion"></div>
                    </div>
                  </div>
                </li>

                <!--  Foto de perfil -->
                <li class="nav-item hidden-on-mobile">
                  <a
                    class="nav-link dropdown-toggle"
                    id="notificationsDropDown"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown">
                    <img
                      id="imgSmallProfile"
                      alt="user"
                      class="rounded-circle"
                      width="30"
                      height="30" />
                  </a>
                  <ul
                    id="user_dropdown"
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="addDropdownLink">
                    <li>
                      <!-- <a class="dropdown-item" href="#">New Workspace</a> -->
                      <div class="dropdown-item " style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                        <div class="u-img" style="padding-bottom: 10px; padding-top:10px; "><img class="rounded-circle " id="profileImg" alt="user" width="60px" height="60px"></div>
                        <div class="u-text">
                          <h4 id="PerfilNombreEmp"></h4>
                          <p id="PerfilCorreoEmp"></p>
                          <!-- <a class="waves-effect waves-light btn-small red white-text" href="index.php">Perfil</a> -->
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="index.php"><i class="material-icons me-2">home</i>Inicio</a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="logout.php"><i class="material-icons me-2">exit_to_app</i>Salir</a>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
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
                  <h1>Empleados Evaluados</h1>
                </div>
              </div>
            </div>
            <!-- EVALUACION FISICA Y DATOS GENERALES -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row d-flex justify-content-center align-items-center text-center mb-4">
                      <div class="col">
                        <label class="card-title">Evaluación seleccionada:</label>
                        <label class="card-title" id="ev_selected"></label>
                      </div>
                    </div>
                    <div id="contenidoResGlobal">
                      <div class="row d-flex justify-content-center align-items-center text-center mb-4">
                        <div class="col">
                          <div id="principalTable"></div>
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
      <!-- Modal Cantidad Evaluados -->
      <div class="modal fade" id="modalGeneralDetail" tabindex="-1" aria-labelledby="modalGeneralDetailLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <label class="modal-title w-100 text-center" id="modalGeneralDetailLabel">Resultado General</label>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" id="container-generalDetail">
              <div class="row d-flex justify-content-center mb-4">
                <div class="col-12">
                  <div id="finalTableEvaluated"></div>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-12 col-md-4 text-center">
                  <label class="form-label">Seleccione algún tipo de resultados para ser mostrados.</label>
                  <select class="form-select" id="selTypeResult" style="width: 100%;">
                    <option value="1">FORTALEZAS Y ÁREAS A MEJORAR</option>
                    <option value="2">CÁLCULO</option>
                    <option value="3">PARES Y SUBORDINADOS</option>
                  </select>
                </div>
              </div>
              <div class="row d-flex justify-content-center mb-4">
                <div class="col-12">
                  <div id="contentAllResultsFinal" class="row"></div>
                </div>
              </div>
              <div class="row d-flex justify-content-center">

                <div class="col-12">
                  <div class="row dv_ContentAllResults">
                    <div id="gn_calculo" class="col-12">
                      <div id="dv_GeneralInfo" class="row"></div>
                      <div class="row">
                        <div class="col-12">
                          <div id="dvFisrtPage" class="row"></div>
                        </div>
                      </div>
                    </div>

                    <div id="gn_par_sub" class="col-12">
                      <div class="row">
                        <div class="col-12">
                          <div class="row justify-content-center">
                            <div class="col-12">
                              <div class="row">
                                <div class="col-12  mt-4 mb-4">
                                  <label class="form-label">Resultados Individuales (Pares)</label>
                                </div>
                                <div class="col-12">
                                  <div id="dv_ind_Par" class="row"></div>
                                </div>
                              </div>
                            </div>

                            <div class="col-12">
                              <div class="row">
                                <div class="col-12  mt-4 mb-4">
                                  <label class="form-label">Resultados Individuales (Subordinados)</label>
                                </div>
                                <div class="col-12">
                                  <div id="dv_ind_Subordinado" class="row"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="gn_moreInfo" class="col-12">
                      <div class="row d-flex justify-content-center">
                        <div class="col-12 text-center">
                          <label class="form-label">Resultado Global</label>
                        </div>
                      </div>

                      <div class="row d-flex justify-content-center mb-4">
                        <div class="col-12">
                          <label class="form-label">Resultados Finales:</label>
                          <div id="total_General"></div>
                        </div>
                      </div>
                      <div class="row d-flex justify-content-center mt-4">
                        <div class="col-12  text-center">
                          <label class="form-label text-center">Fortalezas y Áreas a Mejorar</label>
                          <div class="row d-flex justify-content-center">
                            <div class="col-12 col-md-6 text-center mb-3">
                              <label class="form-label">Fortalezas:</label>
                              <div id="table_strengths"></div>
                            </div>
                            <div class="col-12 col-md-6 text-center">
                              <label class="form-label">Áreas a Mejorar:</label>
                              <div id="table_areasForImprovement"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row d-felx justify-content-center">
                        <!-- Contenedor scroll -->
                        <div class="col-12 mt-4 d-flex justify-content-center">
                          <div id="container">
                            <div class="form-label col-12" id="graph_total_General"></div>
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

      <!-- Modal Detalles -->
      <div class="modal fade" id="detailContainer" tabindex="-1" aria-labelledby="detailContainerLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">

            <!-- Encabezado -->
            <div class="modal-header">
              <h4 class="modal-title w-100 text-center fw-bold" id="detailContainerLabel">Evaluación de Desempeño</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <!-- Cuerpo -->
            <div class="modal-body">

              <!-- Detalle de evaluadores -->
              <div class="text-center mb-3">
                <label class="form-label">Detalle de los Evaluadores:</label>
              </div>

              <div id="table_general_detail" class="mb-4"></div>

              <!-- Listado de Evaluadores -->
              <div class="row justify-content-center align-items-center mb-4" style="min-height: 100px;">
                <div class="col-8 text-center">
                  <label class="form-label">Listado de Evaluadores:</label>
                  <select id="slc_evaluated_by" class="form-select text-center"></select>
                </div>
              </div>

              <div class="row">

                <!-- Calificación por competencia -->
                <div class="row justify-content-center align-items-center">
                  <div class="col-12 col-md-4 mb-4 text-center">
                    <label class="form-label text-center">Calificación por competencia y evaluador:</label>
                    <div id="table_qualifications"></div>
                  </div>
                </div>

              </div>
              <div class="row justify-content-center align-items-center">

                <!-- Fortalezas y Áreas de oportunidad -->
                <div class="col-12 col-md-8 text-center">
                  <label class="form-label text-center">Fortalezas y Áreas de Oportunidad</label>
                  <div class="row p-2">
                    <div class="col-12 col-md-6 text-center mb-3">
                      <label class="form-label">Fortalezas:</label>
                      <div id="ev_strengths"></div>
                      <hr>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <label class="form-label">Áreas a mejorar:</label>
                      <div id="ev_weaknesses"></div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="row w-100 d-felx justify-content-center">
                <!-- Contenedor scroll -->
                <div class="col-12 mt-4 d-flex justify-content-center">
                  <div id="container">
                    <div id="indvChar" style="height:580px;overflow-x:auto;"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  </div>
  <script type="text/x-jsrender" id="viewIndvResultsTemplate">
    ${viewIndvResultsSF(data)}
            </script>
  <script type="text/x-jsrender" id="viewFinalReultsTemplate">
    ${viewFinalReultsSF(data)}
            </script>


  <?php include("scripts.php"); ?>


  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="scripts/global.js" charset="utf-8"></script>
  <!-- <script src="scripts/ResultadosEvaluacion/General.js" charset="utf-8" type="module"></script> -->
  <script src="scripts/ResultadosEvaluacion/data.js" charset="utf-8"></script>
  <script src="scripts/ResultadosEvaluacion/contentFunctions.js" charset="utf-8"></script>
  <script src="scripts/ResultadosEvaluacion/executeFunctions.js" charset="utf-8"></script>


</body>

</html>