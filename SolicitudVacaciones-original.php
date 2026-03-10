<!DOCTYPE html>
<html>

<head>
  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP by Lugo</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
    <script src="componentes/detallesEmpleadoLogeado.js"></script>
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
                    <h5 class="font-medium m-b-0">Solicitudes de Vacaciones</h5>
                    <div class="custom-breadcrumb ml-auto">
                        <a href="#!" class="breadcrumb">Home</a>
                        <a href="#!" class="breadcrumb">Inicio</a>
                    </div>
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
                <div class="col s12 l12" style="text-align:center">
                    <div class="container">
                         <detalle-empleado-logeado></detalle-empleado-logeado>
                    </div>
                </div>
              </div>
              <div class="row">
                <div class="card" style="margin: 1vh">
                  <div class="row">
                    <div class="col s4 offset-s8 l2 offset-l10" style="position: absolute;margin-top:2vh;">
                      <a href="SolicitudNueva-original.php" class="waves-effect waves-light btn btn-round blue">Nueva Solicitud</a>
                    </div>
                  </div>
                  <div class="card-content">
                    <p>Solicitudes de Vacaciones.</p>
                  </div>
                  <div class="card-tabs">
                    <ul class="tabs tabs-fixed-width">
                        <li class="tab"><a class="active" href="#misSolicitudes">Mis solicitudes</a></li>
                        <li class="tab"><a href="#solicitudesPendientes">Autorización de vacaciones</a></li>
                        <li class="tab"><a href="#solicitudescanceladas">Solicitudes canceladas por mí</a></li>
                        <li class="tab"><a href="#solicitudesNomina">Estado solicitudes aceptadas por mí, Nómina.</a></li>
                    </ul>
                  </div>
                  <div class=" grey lighten-4">
                    <div id="misSolicitudes">
                      <div class="row">
                        <div class="col s12 l12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="table-responsive">
                                  <table id="ContenidoMisSolicitudes" style="overflow-x:scroll" class="table striped m-b-10 display centered">
                                    <thead>
                                      <tr>
                                        <th>Motivo de Solicitud</th>
                                        <th>Estado de la Solicitud</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Ver Solicitud</th>
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
                    <div id="solicitudesNomina">
                      <div class="row">
                        <div class="col s12 l12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="table-responsive">
                                  <table id="ContenidoSolicitudesNomina" style="overflow-x:scroll" class="table striped m-b-10 display centered">
                                    <thead>
                                      <tr>
                                        <th>Empleado</th>
                                        <th>Motivo de solicitud</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Estatus en nómina</th>
                                        <th>Regresar a pendiente de revisión</th>
                                        <th>Ver solicitud</th>
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
                    <div id="solicitudesPendientes">
                      <div class="row">
                        <div class="col s12 l12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="table-responsive">
                                  <table id="ContenidoSolicitudesPend" style="overflow-x:scroll" class="table striped m-b-10 display centered">
                                    <thead>
                                      <tr>
                                        <th>Empleado</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Fecha de Inicio</th>
                                        <th>Fecha de Fin</th>
                                        <th>Motivo Vacaciones</th>
                                        <th>Ver Solicitud</th>
                                        <th>Op</th>
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
                    <div id="solicitudescanceladas">
                      <div class="row">
                        <div class="col s12 l12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="table-responsive">
                                  <table id="tableSolicitudesCanceladas" style="overflow-x:scroll" class="table striped m-b-10 display centered">
                                    <thead>
                                      <tr>
                                        <th>Empleado</th>
                                        <th>Motivo de Solicitud</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Regresar a pendiente de revisión</th>
                                        <th>Ver Solicitud</th>
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
        </div>


    </div>
    <?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <script src="scripts/SolicitudVacaciones-original.js" charset="utf-8"></script>
    <script src="scripts/detallesEmpleadoLogeado.js"></script>
    <script type="text/javascript">
      function onlynumber(e) {
           tecla = (document.all) ? e.keyCode : e.which;
           if (tecla == 8) {
             return true;
           }
           patron = /[-0-9]/;
           tecla_final = String.fromCharCode(tecla);
           return patron.test(tecla_final);
         }

    </script>
</body>

</html>
