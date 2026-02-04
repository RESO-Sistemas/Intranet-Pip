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

  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">



  <!-- Styles neptune -->



  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->

  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <!-- <link rel="stylesheet" href="plugins/chosen/chosen.min.css"> -->

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

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

                  <h1>Lista de Evaluados</h1>

                </div>

              </div>

            </div>

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

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/Evaluados.js" charset="utf-8"></script>

</body>

</html>