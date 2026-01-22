<?php
$hoy = date('Y-m-d');
$FechaMenosMes = date("Y-m-d", strtotime($fecha_actual . "- 2 month"));
?>
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

  <!-- Styles neptune -->
  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->

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
                  <h1>Solicitudes de Vacaciones</h1>
                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="hoaccountme" aria-selected="true">Solicitudes en revisión.</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="integrations-tab" data-bs-toggle="tab" data-bs-target="#integrations" type="button" role="tab" aria-controls="integrations" aria-selected="false">Historial de solicitudes en Nómina.</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="tab-content" id="myTabContent">
                  <!-- Solicitudes en revisión -->
                  <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div class="card">
                      <div class="card-body">
                        <div class="table-responsive">
                          <table class="table display text-center" id="TableSolicitudes">
                            <thead class="text-center">
                              <tr>
                                <th>EMPLEADO</th>
                                <th>DEPARTAMENTO</th>
                                <th>FECHA DE LA SOLICITUD</th>
                                <th>FECHA INICIO</th>
                                <th>FECHA FIN</th>
                                <th>TOTAL DE DIAS</th>
                                <th>VER SOLICITUD</th>
                                <th>ACCIONES</th>
                              </tr>
                            </thead>
                            <tbody class="text-center" id="contenidoSolicitudes">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Historial de solicitudes en Nómina -->
                  <div class="tab-pane fade" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">
                    <div class="card ">
                      <div class="card-body">
                        <div class="row mb-4">
                          <div class="col-6">
                            <div class="row">
                              <div class="col-12" style="text-align:center">
                                <h6>Fecha Inicial:</h6>
                              </div>
                              <div class="col-12">
                                <input class="form-control form-control-solid-bordered " type="date" id="FechaIni" value="<?php echo $FechaMenosMes ?>" onchange="getHistoricoSolicitudesNomina()">
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="row">
                              <div class="col-12" style="text-align:center">
                                <h6>Fecha Final:</h6>
                              </div>
                              <div class="col-12">
                                <input class="form-control form-control-solid-bordered " type="date" id="FechaFin" value="<?php echo $hoy ?>" onchange="getHistoricoSolicitudesNomina()">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="table-responsive">
                          <table class="table display text-center" id="tableHistorico">
                            <thead class="text-center">
                              <tr>
                                <th>EMPLEADO</th>
                                <th>ESTADO DE LA SOLICITUD</th>
                                <th>FECHA DE LA SOLICITUD</th>
                                <th>Regresar a pendiente de revisión</th>
                                <th>VER SOLICITUD</th>
                              </tr>
                            </thead>
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
  <?php include("scripts.php"); ?>
  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/SolicitudesVacacionesFinales.js" charset="utf-8"></script>
</body>

</html>